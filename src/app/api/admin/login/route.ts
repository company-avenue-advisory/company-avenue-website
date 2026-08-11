import { NextRequest, NextResponse } from "next/server";
import {
  verifyCredentials,
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
  homeFor,
} from "@/lib/auth";

/* ── Brute-force throttle ────────────────────────────────────────────────
   Per-IP failed-attempt counter. Serverless instances don't share memory,
   so this resets on cold start — it blunts scripted guessing against a warm
   instance but is not a substitute for strong passwords. Back it with
   Upstash/Vercel KV if you ever need a hard guarantee.                     */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 10;
const fails = new Map<string, { count: number; first: number }>();

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(ip: string): boolean {
  const rec = fails.get(ip);
  if (!rec) return false;
  if (Date.now() - rec.first > WINDOW_MS) {
    fails.delete(ip);
    return false;
  }
  return rec.count >= MAX_FAILS;
}

function recordFail(ip: string): void {
  const rec = fails.get(ip);
  if (!rec || Date.now() - rec.first > WINDOW_MS) {
    fails.set(ip, { count: 1, first: Date.now() });
  } else {
    rec.count += 1;
  }
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many failed attempts. Please try again in 15 minutes." },
      { status: 429, headers: { "Retry-After": "900" } }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = (body.username ?? "").trim();
  const password = body.password ?? "";
  if (!username || !password) {
    return NextResponse.json({ error: "Enter your username and password." }, { status: 400 });
  }

  const user = verifyCredentials(username, password);
  if (!user) {
    recordFail(ip);
    // Deliberately vague — never reveal which half was wrong.
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  fails.delete(ip);

  const res = NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, role: user.role },
    redirect: homeFor(user.role),
  });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(user), sessionCookieOptions);
  return res;
}
