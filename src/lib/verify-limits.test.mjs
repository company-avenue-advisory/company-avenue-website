/**
 * Assert-based checks for the verification-tool limits in verify-limits.ts.
 *
 * No framework. Run it:
 *   node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/lib/verify-limits.test.mjs
 * or:  npm run test:verify
 *
 * These exist because every lookup behind /api/verify/* is a billed API
 * call. If a window rolls over wrongly or PAN results start being cached,
 * one of these fails.
 */
import assert from "node:assert/strict";
import {
  VERIFY_LIMITS,
  HOUR_MS,
  DAY_MS,
  windowStart,
  countersFor,
  retryAfterSeconds,
  MemoryCounter,
} from "./verify-limits.ts";

// PAN is personal data: it must never be cached.
assert.equal(VERIFY_LIMITS.pan.cacheHours, 0, "PAN results must never be cached");

// Every tool has a positive cap, and the daily cap is above the hourly one.
for (const [tool, lim] of Object.entries(VERIFY_LIMITS)) {
  assert.ok(lim.perIpPerHour > 0, `${tool}: hourly cap must be > 0`);
  assert.ok(lim.perDay >= lim.perIpPerHour, `${tool}: daily cap must be >= hourly cap`);
}

// Windows align to the clock.
const t = Date.UTC(2026, 9, 17, 10, 42, 13);
assert.equal(windowStart(t, HOUR_MS), Date.UTC(2026, 9, 17, 10, 0, 0));
assert.equal(windowStart(t, DAY_MS), Date.UTC(2026, 9, 17, 0, 0, 0));

// Two counters: visitor first, then the shared daily one.
const [visitor, daily] = countersFor("gst", "abc", t);
assert.equal(visitor.scope, "visitor");
assert.equal(daily.scope, "daily");
assert.equal(visitor.limit, VERIFY_LIMITS.gst.perIpPerHour);
assert.equal(daily.limit, VERIFY_LIMITS.gst.perDay);
assert.equal(visitor.expiresAt, Date.UTC(2026, 9, 17, 11, 0, 0));
assert.ok(!daily.key.includes("abc"), "daily counter must be shared, not per visitor");

// Different visitors and different tools never share a visitor counter.
assert.notEqual(countersFor("gst", "abc", t)[0].key, countersFor("gst", "xyz", t)[0].key);
assert.notEqual(countersFor("gst", "abc", t)[0].key, countersFor("pan", "abc", t)[0].key);

// Next hour is a fresh window.
assert.notEqual(countersFor("gst", "abc", t)[0].key, countersFor("gst", "abc", t + HOUR_MS)[0].key);

// Retry-After is never zero or negative.
assert.equal(retryAfterSeconds(t + 1500, t), 2);
assert.equal(retryAfterSeconds(t - 5000, t), 1);

// In-memory fallback counts up and resets when the window expires.
const m = new MemoryCounter();
assert.equal(m.hit("k", t + 1000, t), 1);
assert.equal(m.hit("k", t + 1000, t), 2);
assert.equal(m.hit("k", t + 2000, t + 1000), 1, "expired window must restart at 1");

console.log("verify-limits: all checks passed");
