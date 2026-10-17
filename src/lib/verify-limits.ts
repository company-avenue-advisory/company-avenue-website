/* ─────────────────────────────────────────────────────────────
   Limits for the paid verification tools (/api/verify/*).

   Every GST, PAN and MCA lookup is a billed Sandbox call, and a
   company-name search fans out into ~20 Data.gov.in lookups plus a
   Sandbox call per hit. These caps bound what a bot (or one curious
   visitor) can cost us.

   Two counters per lookup:
     · per visitor (hashed IP) per clock hour — stops one source
     · per tool per UTC day, across all visitors — stops a bot that
       rotates IPs. Resets 00:00 UTC (05:30 IST).

   PAN results are never cached: they are personal data and the
   inputs include name and date of birth. GST and MCA results are
   public registry records and are cached for a day so a repeat
   lookup costs nothing.

   Imports nothing, so the assert checks in verify-limits.test.mjs can
   run under plain node.
───────────────────────────────────────────────────────────── */

export type VerifyTool = "gst" | "pan" | "company" | "company-name";

export interface ToolLimit {
  perIpPerHour: number;
  perDay: number;
  /** 0 = never cache. */
  cacheHours: number;
}

export const VERIFY_LIMITS: Record<VerifyTool, ToolLimit> = {
  gst: { perIpPerHour: 20, perDay: 500, cacheHours: 24 },
  company: { perIpPerHour: 20, perDay: 300, cacheHours: 24 },
  "company-name": { perIpPerHour: 10, perDay: 200, cacheHours: 24 },
  pan: { perIpPerHour: 5, perDay: 100, cacheHours: 0 },
};

export const HOUR_MS = 60 * 60 * 1000;
export const DAY_MS = 24 * HOUR_MS;

export function windowStart(now: number, windowMs: number): number {
  return now - (now % windowMs);
}

export interface Counter {
  key: string;
  limit: number;
  /** Epoch ms when this window closes and the counter can be dropped. */
  expiresAt: number;
  scope: "visitor" | "daily";
}

/** The two counters a lookup increments, checked in this order. */
export function countersFor(tool: VerifyTool, visitor: string, now: number): Counter[] {
  const lim = VERIFY_LIMITS[tool];
  const hour = windowStart(now, HOUR_MS);
  const day = windowStart(now, DAY_MS);
  return [
    { key: `ip:${tool}:${visitor}:${hour}`, limit: lim.perIpPerHour, expiresAt: hour + HOUR_MS, scope: "visitor" },
    { key: `day:${tool}:${day}`, limit: lim.perDay, expiresAt: day + DAY_MS, scope: "daily" },
  ];
}

export function retryAfterSeconds(expiresAt: number, now: number): number {
  return Math.max(1, Math.ceil((expiresAt - now) / 1000));
}

export function cacheKey(tool: VerifyTool, id: string): string {
  return `${tool}:${id}`;
}

/**
 * In-process fallback when MongoDB is not configured or unreachable.
 * Serverless instances don't share memory, so this only limits per warm
 * instance — weaker than the database counter, but never zero.
 */
export class MemoryCounter {
  private counts = new Map<string, { count: number; expiresAt: number }>();

  hit(key: string, expiresAt: number, now: number): number {
    if (this.counts.size > 5000) {
      this.counts.forEach((v, k) => {
        if (v.expiresAt <= now) this.counts.delete(k);
      });
    }
    const rec = this.counts.get(key);
    if (!rec || rec.expiresAt <= now) {
      this.counts.set(key, { count: 1, expiresAt });
      return 1;
    }
    rec.count += 1;
    return rec.count;
  }
}
