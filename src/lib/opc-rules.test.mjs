/**
 * Guard: no pre-2021 OPC rules on the site.
 *
 * Run:  node src/lib/opc-rules.test.mjs
 *
 * The Companies (Incorporation) Second Amendment Rules, 2021 (w.e.f. 1 April
 * 2021) removed the paid-up capital / turnover limits that forced an OPC to
 * convert, and allowed NRIs who are Indian citizens to form an OPC.
 * Source: MCA press release, PIB, 3 Feb 2021 (PRID 1694828). Re-verified
 * 28 Nov 2026: the April 2026 draft Incorporation Amendment Rules were not
 * notified and do not bring the limits back.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f)) files.push(p);
  }
})("src");

const BANNED = [
  /NRIs?( and foreign nationals)? (are|is) not eligible/i,
  /OPC[^."]{0,120}(must|mandator\w*|automatic\w*)[^."]{0,80}convert/i,
  /convert[^."]{0,80}(mandator\w*|automatic\w*)[^."]{0,80}(₹\s?2 crore|₹\s?50 lakh)/i,
  /Conversion is mandatory when paid-up capital/i,
];

for (const f of files) {
  const text = readFileSync(f, "utf8");
  if (!/\bOPC\b|One Person Compan/i.test(text)) continue;
  for (const re of BANNED) {
    assert.ok(!re.test(text), `${f}: outdated OPC rule matches ${re}`);
  }
}
console.log(`opc-rules: ${files.length} files clean`);
