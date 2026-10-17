/* ─────────────────────────────────────────────────────────────
   Server-only guard for the paid verification routes.

   Order inside guardVerify():
     1. Cloudflare Turnstile human check (free; skipped until
        TURNSTILE_SECRET_KEY is set, so deploying this before the
        keys exist changes nothing for visitors)
     2. per-visitor hourly cap, then per-tool daily cap
        (limits live in verify-limits.ts)

   Counters and the result cache live in MongoDB with TTL indexes, so
   they clean themselves up. The visitor is stored only as a salted
   SHA-256 of the IP, and only until the hour window closes.
   If MongoDB is down the limiter falls back to in-memory counters
   rather than letting every lookup through.
───────────────────────────────────────────────────────────── */
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import type { Collection } from "mongodb";
import { getDb, isMongoConfigured } from "@/lib/mongodb";
import {
  VERIFY_LIMITS,
  MemoryCounter,
  cacheKey,
  countersFor,
  retryAfterSeconds,
  type VerifyTool,
} from "@/lib/verify-limits";

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY ?? "";
const IP_SALT = process.env.VERIFY_IP_SALT ?? "caa-verify";

const memory = new MemoryCounter();

type CounterDoc = { _id: string; count: number; expiresAt: Date };
type CacheDoc = { _id: string; value: unknown; expiresAt: Date };

let indexesReady: Promise<void> | null = null;

async function collections(): Promise<{ counters: Collection<CounterDoc>; cache: Collection<CacheDoc> }> {
  const db = await getDb();
  const counters = db.collection<CounterDoc>("verify_rate_limits");
  const cache = db.collection<CacheDoc>("verify_cache");
  if (!indexesReady) {
    indexesReady = Promise.all([
      counters.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      cache.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    ])
      .then(() => undefined)
      .catch((err) => {
        indexesReady = null; // try again on the next request
        throw err;
      });
  }
  await indexesReady;
  return { counters, cache };
}

/**
 * Vercel sets x-real-ip to the connecting client; it can't be spoofed by the
 * visitor. Note: if Cloudflare's proxy (orange cloud) is ever switched on in
 * front of Vercel, this becomes a Cloudflare edge IP and visitors would share
 * counters — revisit the header then.
 */
function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}

function visitorId(ip: string): string {
  return createHash("sha256").update(`${IP_SALT}:${ip}`).digest("hex").slice(0, 32);
}

async function hit(key: string, expiresAt: number, now: number): Promise<number> {
  if (isMongoConfigured()) {
    try {
      const { counters } = await collections();
      const doc = await counters.findOneAndUpdate(
        { _id: key },
        { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(expiresAt) } },
        { upsert: true, returnDocument: "after" }
      );
      if (doc) return doc.count;
    } catch (err) {
      console.warn("[verify-guard] counter store unavailable, using memory:", err);
    }
  }
  return memory.hit(key, expiresAt, now);
}

async function passesTurnstile(token: unknown, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true;
  if (typeof token !== "string" || !token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (res.ok && data) return data.success === true;
    // Cloudflare itself erroring is not the visitor's fault; the rate limits
    // below still bound the cost while it is down.
    console.warn("[verify-guard] Turnstile siteverify returned", res.status);
    return true;
  } catch (err) {
    console.warn("[verify-guard] Turnstile siteverify unreachable:", err);
    return true;
  }
}

/**
 * Returns a response to send back if the lookup must be refused, or null if
 * it may proceed. Call it after input validation, so a typo costs nothing.
 */
export async function guardVerify(
  req: NextRequest,
  tool: VerifyTool,
  turnstileToken: unknown
): Promise<NextResponse | null> {
  const ip = clientIp(req);

  if (!(await passesTurnstile(turnstileToken, ip))) {
    return NextResponse.json(
      { error: "Please complete the security check below the form and try again." },
      { status: 403 }
    );
  }

  const now = Date.now();
  for (const c of countersFor(tool, visitorId(ip), now)) {
    const count = await hit(c.key, c.expiresAt, now);
    if (count > c.limit) {
      const error =
        c.scope === "visitor"
          ? "You've run a lot of lookups in a short time. Please try again in a little while."
          : "This tool has reached its limit for today. Please try again tomorrow, or contact us and we'll check it for you.";
      return NextResponse.json(
        { error },
        { status: 429, headers: { "Retry-After": String(retryAfterSeconds(c.expiresAt, now)) } }
      );
    }
  }

  return null;
}

/** A cached result for a public-registry lookup, or null. Never throws. */
export async function readVerifyCache<T>(tool: VerifyTool, id: string): Promise<T | null> {
  if (!VERIFY_LIMITS[tool].cacheHours || !isMongoConfigured()) return null;
  try {
    const { cache } = await collections();
    const doc = await cache.findOne({ _id: cacheKey(tool, id) });
    // TTL deletion runs about once a minute; don't serve a doc it hasn't reached yet.
    if (doc && doc.expiresAt.getTime() > Date.now()) return doc.value as T;
  } catch (err) {
    console.warn("[verify-guard] cache read failed:", err);
  }
  return null;
}

/** Store a successful result. Never throws; a failed write just means no cache. */
export async function writeVerifyCache(tool: VerifyTool, id: string, value: unknown): Promise<void> {
  const hours = VERIFY_LIMITS[tool].cacheHours;
  if (!hours || !isMongoConfigured()) return;
  try {
    const { cache } = await collections();
    await cache.updateOne(
      { _id: cacheKey(tool, id) },
      { $set: { value, expiresAt: new Date(Date.now() + hours * 60 * 60 * 1000) } },
      { upsert: true }
    );
  } catch (err) {
    console.warn("[verify-guard] cache write failed:", err);
  }
}
