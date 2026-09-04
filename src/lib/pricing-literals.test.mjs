/**
 * Guard: no hand-typed CAA service fee that contradicts calc-fees.ts.
 *
 * Run:  node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/lib/pricing-literals.test.mjs
 *   or: npm run test:pricing
 *
 * Why this exists: the Avenue AI assistant, and ~15 service pages, were found
 * quoting stale prices that predated calc-fees.ts (the single source of truth).
 * A bulk-authoring pass reintroduces this the moment nobody is looking. This
 * scans every service page's SEO `description` and its hero "Starting ₹…" badge
 * and fails on any figure that (a) contradicts PRO_FEES for that slug, or
 * (b) prices a service that has no source of truth and isn't a known gap.
 *
 * When a KNOWN_UNSOURCED service gets a real fee from the firm: add it to
 * PRO_FEES / SERVICE_PRICING and delete it from the list below.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { PRO_FEES } from "./calc-fees.ts";

const SERVICES_DIR = "src/app/(main)/services";

// Services that legitimately state a fee no constant covers yet — awaiting a
// verified number from the firm. Tracked in PRICING-CONSISTENCY-SWEEP.md.
const KNOWN_UNSOURCED = new Set([
  "advance-tax", "branch-office", "financial-statements", "gratuity-trust",
  "lmpc-registration", "nidhi-company", "patent-registration", "producer-company",
  "roc-compliance", "tax-audit", "tds-return", "trade-license", "transfer-pricing",
]);

// Slugs whose stated fee is deliberately not PRO_FEES[slug] (different basis /
// bundled / per-unit). Each needs a reason.
const INTENTIONAL = new Map([
  ["payroll-management", "per-employee monthly rate, not the setup fee — but the number itself is wrong, see sweep doc"],
]);

const toNum = (s) => Number(String(s).replace(/[^0-9]/g, ""));
const violations = [];
let checked = 0;

for (const slug of readdirSync(SERVICES_DIR)) {
  if (slug.startsWith("[")) continue; // dynamic-route template, not a concrete service
  let txt;
  try { txt = readFileSync(`${SERVICES_DIR}/${slug}/page.tsx`, "utf8"); } catch { continue; }

  const desc = (txt.match(/description:\s*\n?\s*"([^"]+)"/) || [])[1] || "";
  // "starting / from ₹N" price claims, in the description or a hero badge
  const claims = [...txt.matchAll(/(?:Starting(?:\s+from|\s+at)?(?:\s+just)?|from)\s*₹\s?([0-9][0-9,]{2,})/gi)]
    .map((m) => toNum(m[1]));
  if (!desc.match(/₹/) && claims.length === 0) continue;
  checked++;

  const expected = PRO_FEES[slug];

  if (expected != null) {
    for (const c of claims) {
      if (c !== expected && !INTENTIONAL.has(slug)) {
        violations.push(`${slug}: page states "from ₹${c.toLocaleString("en-IN")}" but PRO_FEES["${slug}"] = ₹${expected.toLocaleString("en-IN")}`);
      }
    }
  } else if (claims.length && !KNOWN_UNSOURCED.has(slug)) {
    violations.push(`${slug}: states "from ₹${claims[0].toLocaleString("en-IN")}" but has no PRO_FEES / SERVICE_PRICING entry — add a source or list it in KNOWN_UNSOURCED`);
  }
}

console.log(`Scanned ${checked} service pages with a price claim.`);
if (violations.length) {
  console.error(`\n${violations.length} pricing violation(s):\n` + violations.map((v) => "  - " + v).join("\n"));
}
assert.equal(violations.length, 0, `${violations.length} hand-typed service fee(s) contradict calc-fees.ts`);
console.log("ok  no service page contradicts calc-fees.ts");
