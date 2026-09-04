/**
 * Assert-based checks for the money paths in calc-fees.ts.
 *
 * No framework. Run it:
 *   node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/lib/calc-fees.test.mjs
 * or:  npm run test:calc
 *
 * These exist because calc-fees.ts is the single source of truth for every
 * fee the site quotes, and closureAllIn() is the number a client reads before
 * deciding to close their company. If a rate or the CCFS expiry logic breaks,
 * one of these fails.
 */
import assert from "node:assert/strict";
import {
  ccfsStatus,
  closureAllIn,
  CCFS_2026,
  CLOSURE_HEADLINE,
  STK_NOTARISATION_PER_DIRECTOR,
  GST_RATE,
  inr,
} from "./calc-fees.ts";

let passed = 0;
const check = (name, fn) => {
  fn();
  passed++;
  console.log(`  ok  ${name}`);
};

// A date comfortably inside the CCFS-2026 window, and one comfortably outside.
const DURING = new Date("2026-06-15T10:00:00+05:30");
const AFTER = new Date("2026-10-01T10:00:00+05:30");
// The scheme runs to the END of its last day, IST. These straddle that instant.
const LAST_DAY_NOON = new Date(`${CCFS_2026.end}T12:00:00+05:30`);
const NEXT_DAY_START = new Date("2026-09-01T00:00:01+05:30");

check("ccfsStatus: inside the window is live at the concessional fee", () => {
  const s = ccfsStatus(DURING);
  assert.equal(s.live, true);
  assert.equal(s.stk2Fee, CCFS_2026.stk2Concessional); // ₹2,500
  assert.ok(s.daysLeft > 0);
});

check("ccfsStatus: after the window has reverted to the standard fee", () => {
  const s = ccfsStatus(AFTER);
  assert.equal(s.live, false);
  assert.equal(s.stk2Fee, CCFS_2026.stk2Standard); // ₹10,000
  assert.equal(s.daysLeft, 0);
  assert.match(s.note, /closed/i);
});

check("ccfsStatus: the boundary — last day is still in, the next instant is out", () => {
  assert.equal(ccfsStatus(LAST_DAY_NOON).live, true);
  assert.equal(ccfsStatus(NEXT_DAY_START).live, false);
});

check("closureAllIn: pre-expiry, 2 directors → ₹29,640 all-in", () => {
  const r = closureAllIn({ directors: 2, now: DURING });
  assert.equal(r.professional, CLOSURE_HEADLINE.strikeOffStk2);        // 20,000
  assert.equal(r.notarisation, 2 * STK_NOTARISATION_PER_DIRECTOR);      // 3,000
  assert.equal(r.gst, Math.round((20000 + 3000) * GST_RATE));           // 4,140
  assert.equal(r.mcaFee, 2500);
  assert.equal(r.total, 20000 + 3000 + 4140 + 2500);                    // 29,640
});

check("closureAllIn: post-expiry, 2 directors → ₹37,140 all-in (MCA fee reverts, GST does not move)", () => {
  const r = closureAllIn({ directors: 2, now: AFTER });
  assert.equal(r.mcaFee, 10000);
  assert.equal(r.gst, 4140); // GST is on our fee + notarisation only, not the MCA fee
  assert.equal(r.total, 20000 + 3000 + 4140 + 10000);                   // 37,140
});

check("closureAllIn: director count floors at 1 and defaults to 2", () => {
  assert.equal(closureAllIn({ directors: 0, now: DURING }).directors, 1);
  assert.equal(closureAllIn({ now: DURING }).directors, 2);
});

check("inr: Indian-format grouping, rupee prefix, rounded", () => {
  assert.equal(inr(2500), "₹2,500");
  assert.equal(inr(29371.4), "₹29,371"); // rounds
  assert.equal(inr(100000), "₹1,00,000");
});

console.log(`\n${passed} checks passed.`);
