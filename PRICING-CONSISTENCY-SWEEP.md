# Pricing consistency sweep (Fix 0, Step 3)

**Date:** 4 September 2026 · **Trigger:** the Avenue AI cleanup found the assistant
quoting Private Limited "from ₹6,999" while `calc-fees.ts` `PRO_FEES` has it at
₹3,499. `calc-fees.ts` is the single numeric source of truth (client workbooks,
verified 27 Aug 2026); every other number on the site is derived from it or is a bug.

Scope of this sweep: every `src/app/(main)/services/<slug>/page.tsx` — its SEO
`description` and its hero "Starting ₹…" claims — cross-checked against
`PRO_FEES[<slug>]` and `SERVICE_PRICING[<slug>]`. Guarded going forward by
`src/lib/pricing-literals.test.mjs` (`npm run test:pricing`).

---

## Bucket 1 — MISMATCH (page contradicts the source of truth)

| Service | Page states | Source of truth | Fix |
|---|---|---|---|
| `avenue-ai` `route.ts` "starting fees" | Pvt Ltd ₹6,999 · OPC/LLP ₹4,999 · GST ₹999 · TM ₹4,999 · ITR ₹499 | `PRO_FEES`: 3499 / 3499 / 2999 (999 bundled) / 3499 / 1249 | ✅ **DONE** — bot now reads `PRO_FEES` + `addonBundled()`, quotes standalone with the bundled figure alongside |
| `partnership-firm` `page.tsx:13` (meta description) | "starting ₹1,499" | `PRO_FEES["partnership-firm"] = 4999` — and the page body says ₹4,999 in 4 places | ✅ **DONE** — meta description corrected to ₹4,999 (the outlier was the meta, not the body) |
| `payroll-management` `page.tsx:29` (meta description) | "from ₹150/employee/month" | `SERVICE_PRICING` feeNote: "one-time setup + **₹125** per employee per month" | ⏳ **needs the firm to confirm** which per-employee rate is current — ₹125 or ₹150 — then align both. Listed in the guard's `INTENTIONAL` map with this note so the build stays green meanwhile. |
| `tax-audit` | meta "₹4,999" · body "Starting at ₹9,999" (×2) | `FILING_FEES.statutoryAudit = 8000` | ⏳ **three different numbers on one service.** No `SERVICE_PRICING` entry. Needs a decision: is the audit fee ₹8,000 (the constant), and are ₹4,999 / ₹9,999 stale? |
| `tds-return` | meta "₹1,499/quarter" · body "Starting at ₹2,499/quarter" (×3) | no constant | ⏳ meta and body disagree; no source. |
| `/pricing` DPIIT (`page.tsx:54, 287`) | hardcoded `"₹7,999"` string literals | `STARTUP_INDIA.dpiitOnly = 7999` / `ADDON_SERVICES` dpiit standalone 7999, bundled 6999 | 🟡 **value is correct**, and `pricing.ts:835` already derives it and shows both ("₹7,999 · ₹6,999 bundled"). Only the two `/pricing` hero literals don't derive. Low priority — no user-facing contradiction. |

---

## Bucket 2 — NO SOURCE (a price with no constant behind it — someone typed it)

These 13 services state a fee in the page copy with **no entry in `PRO_FEES` or
`SERVICE_PRICING`**. They are worse than mismatches: there is nothing to check
them against. **Each needs a real number from the firm before it is touched.**
Likely all trace to the bulk-authoring commits (`d1a9e2c`, `95a0ced`,
`c35c79b` — same author, same pattern as the fabricated tax sections).

| Service | States (meta / hero) | Notes |
|---|---|---|
| `advance-tax` | ₹1,999 | |
| `branch-office` | ₹19,999 | |
| `financial-statements` | ₹4,999/year | |
| `gratuity-trust` | ₹14,999 | |
| `lmpc-registration` | ₹3,999 | |
| `nidhi-company` | ₹14,999 (hero) / ₹9,999 (meta) | also internally inconsistent |
| `patent-registration` | ₹14,999 | |
| `producer-company` | ₹9,999 | |
| `roc-compliance` | ₹4,999/year | `FILING_FEES` has aoc4 2499 + mgt7 2499 = 4998, close but not wired |
| `tax-audit` | ₹4,999 / ₹9,999 | see Bucket 1 |
| `tds-return` | ₹1,499 / ₹2,499 | see Bucket 1 |
| `trade-license` | ₹1,499 | |
| `transfer-pricing` | ₹19,999 | |

**Recommended:** ask the firm for these 13 fees, add them to `PRO_FEES` (or a
`SERVICE_PRICING` entry where the service has a proper breakdown), then remove
each slug from `KNOWN_UNSOURCED` in `pricing-literals.test.mjs`. The list going
to zero is the definition of done.

---

## Bucket 3 — MATCH (page price agrees with `PRO_FEES`), recorded for audit

Correct values, but stated as **hardcoded literals** in `metadata.description`
and hero badges rather than derived. Not wrong today; the guard test pins them
so a future edit can't drift them silently.

`accounting-bookkeeping` ₹2,999 · `business-valuation` ₹4,999 ·
`change-in-directors` ₹1,999 · `company-name-change` ₹9,999 ·
`copyright-registration` ₹7,999 · `design-registration` ₹9,999 ·
`director-kyc` ₹499 · `drug-license` ₹5,499 · `esic-registration` ₹2,999 ·
`fssai-license` ₹3,999 · `gst-amendment` ₹1,499 ·
`increase-authorised-capital` ₹4,999 · `indian-subsidiary` ₹31,499 ·
`llp-annual-filing` ₹2,499 · `pf-registration` ₹2,999 ·
`professional-tax` ₹2,999 · `psara-license` ₹25,500 ·
`registered-office-change` ₹2,999 · `section-8-company` ₹7,999 ·
`sole-proprietorship` ₹2,999 · `trademark-objection` ₹7,999 ·
`trademark-renewal` ₹4,999 · `virtual-cfo` ₹24,999

(Where a service has `ServicePricingBlock` mounted — most do — the on-page
pricing *table* already derives from `calc-fees.ts` correctly. The hardcoded
literals are the hero badge and the SEO description, which sit outside that
component.)

---

## The Fix 1 groundwork already exists

While validating `pricing.ts:1338`: there is a full `SERVICE_CALCULATORS`
mapping (~80 services → calculator slugs), a `CALC_TOOLS` registry with `href`
/ `title` / `cta` / `icon` per tool, and accessors `getServiceCalculators()` /
`getPrimaryCalculator()`. Components `ServiceCalcPill.tsx` and
`ServicePricingBlock.tsx` consume them and are **imported by ~50 service page
route files**. So Fix 1 (bidirectional linking) is largely built and wired —
the handoff's "exactly one file links to /calculators/" is stale.

**Slug validation:** every slug in `SERVICE_CALCULATORS` that resolves through
`CALC_TOOLS` points to a real route — 15 `/calculators/*` (all exist) plus
`company-name-search` and `trademark-class-finder`, which correctly point to
`/verify/*` (not `/calculators/*`). Slugs absent from `CALC_TOOLS` are
`.filter(Boolean)`'d out — no 404s. **The mapping is safe to extend.**

Fix 1's real task is therefore: confirm `ServiceCalcPill` / `ServicePricingBlock`
actually *render* on the pages that import them (not just import), and fill the
gaps — not build the system.
