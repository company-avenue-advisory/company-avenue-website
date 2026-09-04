## Before you start: one root cause behind three of these tickets

T3, T7 and T8 (and, less urgently, the closure-page pricing conflict this whole audit started from) all come back to the same thing: fee numbers are hard-coded independently on every page instead of read from one place. `/pricing` already has the correct, complete, internally-consistent numbers — capital-tiered incorporation fees, a standalone-vs-bundled add-on table, package pricing that foots correctly. Nothing else on the site reads from it; each calculator and service page has its own copy of the numbers, typed in separately, which is exactly how the closure page and the Business Setup Calculator drifted.

If there's room to do one structural thing alongside these tickets, it's turning `/pricing`'s tables into the actual data source (a shared config/CMS entry, however the codebase is set up) that the calculators and service pages import from, instead of a page that happens to agree with them today. Short of that, treat `/pricing` as the source to check against every time a fee changes anywhere else.

---

## T1 — Fix footer typo

**Priority:** P2 · **Size:** XS · **No decision needed**

**Where:** The footer component, sitewide (confirmed present on every page checked: homepage, `/calculators`, `/pricing`, `/services/company-closure`, `/services/msme-registration`, `/services/startup-india`).

**Update:** ~~Yug has since confirmed both are correct as-is — no replacement needed, and don't apply the `07AAVCS4279H1ZM` figure the Aug 29 conversation floated; that one is not correct.~~

**CORRECTION (4 Sep 2026):** the 31 Aug sign-off above was mistaken. `07AABCC1234D1Z5` **fails the GSTIN check-digit algorithm** — the computed 15th character is `D`, not `5` (verified by two independent implementations). It cannot be a real GSTIN; it embeds `AABCC1234D`, the specimen PAN from sample documentation. It has been **removed** from the site (not replaced) — see `src/lib/nap.ts`. `07AAVCS4279H1ZM` (the IndiaMart value) has a *valid* checksum but is **not** confirmed as CAA's registration, so it was not adopted either; the real GSTIN must come from the firm's GST certificate. The CIN was left in place (unverified, not disproven; required on official publications) but is now flagged for MCA Company Master Data verification — it decodes as Maharashtra / 2015 against a Delhi firm whose IndiaMart profile says 2024, and it appears in `/privacy` and `/terms`.

**Current state (live, checked 31 Aug 2026):**
```
© 2026 Company Avenue Advisory Pvt. Ltd.. All rights reserved.
GSTIN: 07AABCC1234D1Z5 | CIN: U74999MH2015PTC260940
```

**Required change:** ~~Just the typo.~~ Typo fixed (WS-9.x). GSTIN removed 4 Sep 2026 per the correction above; footer now renders `CIN: …` alone when `gstin` is null. CIN retained.

**Acceptance criteria:**
- No double period after "Ltd." — done.
- ~~GSTIN and CIN unchanged.~~ GSTIN removed (fails checksum); CIN retained pending MCA verification.
- Footer renders correctly with the GSTIN line absent, mobile and desktop.

---

## T2 — Make the CCFS ₹2,500 fee auto-expire

**Priority:** P0 · **Size:** S–M · **No decision needed**

**Where:** `/services/company-closure`

**Current state (live, checked 31 Aug 2026 — the last day of the concession):** ₹2,500 is hard-coded as the MCA fee on Form STK-2 in five places: the meta description, the OG/Twitter share descriptions, the "What it actually costs" row, the all-in total (≈₹29,640), and the Timeline & Investment block. There is no date logic anywhere — the correct fee reverts to ₹10,000 on 1 September 2026, and nothing on the page will notice.

**Required change:**
1. Introduce a single date constant for the CCFS-2026 end date (2026-08-31). The Aug 29 conversation's prototype did this as `window.CCFS.end = '2026-08-31'` in a standalone HTML mockup — the pattern is right even though that file never shipped; implement the equivalent in whatever the live stack uses (a config value, a CMS field, or a small server-side check if the page is server-rendered).
2. Every one of the five places that currently hard-codes ₹2,500 should instead read from that single value and compute: before the date, show ₹2,500 and the CCFS-derived all-in total; on/after the date, show ₹10,000, the correspondingly higher all-in total, and ideally a line noting the concession has closed rather than silently reverting.
3. Recalculate the all-in figure for the post-expiry state: ₹20,000 + ₹3,000 notarisation (2 directors) + 18% GST (₹4,140) + ₹10,000 MCA fee = **₹37,140** (versus the current ₹29,640) — this number needs to update wherever the ₹29,640 figure currently appears, using the same date logic.

**Acceptance criteria:**
- Changing the date constant (or waiting past it) flips all five instances of the fee and the all-in total consistently — no instance left showing the old figure.
- No manual edit required going forward when the scheme's date changes or a future concession is added.

---

## T3 — Resolve the ₹20,000 STK-2 bundling conflict

**Priority:** P0 · **Size:** M · **Decision needed: bundled or unbundled pricing**

**Where:** `/services/company-closure` (the "What this fee covers" bullets and the "What it actually costs" table), cross-checked against `/pricing`'s Closure & Exit section.

**Current state (live, checked 31 Aug 2026):** The ₹20,000 STK-2 fee's "What this fee covers" list includes the exit diagnostic, MGT-14 board/EGM support, STK-8 certified accounts, and C-PACE resubmissions. The same page's "What it actually costs" table, a few sections down, lists the diagnostic (₹7,500) and STK-8 (₹5,000) again as separate line items. `/pricing`'s own Closure & Exit table lists "Exit diagnostic and route opinion" (₹7,500) and "Strike-off of a company (STK-2), end to end" (₹20,000) as two separate rows — so the live service page disagrees with your own published master price list, not just an internal Excel.

**The decision (needs Yug/Jatin, not a developer call):**
- **Option A — Unbundle (matches current `/pricing` and is what I'd recommend):** Remove the diagnostic, MGT-14 support, STK-8 and C-PACE resubmissions from the "What this fee covers" list under the ₹20,000 line. The ₹20,000 covers STK-2 filing through to the STK-7 dissolution notice, full stop. Recompute the all-in figure as three worked scenarios instead of one number, since the true cost now depends on what's needed: roughly ₹41,000 / ₹57,000 / ₹69,000 depending on scope (these were the Aug 29 conversation's worked figures at the pre-expiry ₹2,500 MCA fee — re-derive precisely once T2 is in place, since the post-expiry ₹10,000 MCA fee changes all three).
- **Option B — Bundle for real:** Keep the current copy, but reprice the ₹20,000 line in `/pricing` to actually include the diagnostic, MGT-14 support and STK-8 — i.e., raise it to reflect what it's actually promising, so the two documents agree.

Either is workable; what isn't workable is the current state, where the public page promises a bundle it doesn't charge for and the public price list prices the pieces separately.

**Required change (once the decision is made):**
- If Option A: edit the "What this fee covers" bullets to remove the four bundled items, update the all-in total logic to the scenario-based figures, and make sure STK-8 and the diagnostic each appear exactly once on the page (currently the diagnostic appears three times with three different framings — as an inclusion, as a ₹7,500 line item, and as "adjustable against the fee" — reduce to one consistent framing).
- If Option B: update `/pricing`'s Closure & Exit table so the ₹20,000 row's description states it includes those items, and remove or merge the separate ₹7,500/₹5,000 rows so the two pages can't be read as double-billing.

**Acceptance criteria:**
- `/services/company-closure` and `/pricing` state the same thing about what the ₹20,000 includes.
- The diagnostic and STK-8 each appear with one consistent price and one consistent inclusion status across both pages.

---

## T4 — Add Section 8 to the STK-2 disqualifier list

**Priority:** P0 · **Size:** S · **No decision needed**

**Where:** `/services/company-closure` — the "STK-2 Disqualifiers" list.

**Current state (live, checked 31 Aug 2026):** The disqualifier list reads: outstanding bank loans/trade liabilities, active GST with pending returns, unfiled income tax returns, pending litigation, pending regulatory inquiry, issued debentures/secured creditors, active bank accounts with balance. Section 8 companies are not on it. The same page's footer links to `/services/section-8-company`.

**Required change:**
1. Add "Company is incorporated under Section 8 of the Companies Act" as a disqualifier — ideally first in the list, since it's a categorical exclusion rather than a financial-state check like the others. Form STK-4 requires a declaration that the company is not incorporated under Section 8, so this isn't a judgment call — it's a hard legal exclusion.
2. While in this component, check whether the same disqualifier list (or an equivalent eligibility list) appears elsewhere on the site — e.g., on `/services/section-8-company` itself, pointing users the other way toward the correct closure route for a Section 8 entity — and add a cross-link if there's a natural place for one. Not required for this ticket to be done, but worth 5 minutes while you're in this file.

**Acceptance criteria:**
- Section 8 companies are told, on the page itself, that STK-2 isn't available to them, before they read pricing.

---

## T5 — Price the NCLT voluntary-liquidation route

**Priority:** P1, execution order 4 · **Size:** M · **Decided by Yug (31 Aug): price it and keep marketing it**

**Where:** `/services/company-closure` (comparison table, benefits card, disqualifier footnote), `/pricing` (Closure & Exit section).

**Current state (live, checked 31 Aug 2026):** NCLT voluntary winding-up is referenced at least three times on the closure page — the STK-2-vs-NCLT comparison table, a "Creditor Protection via NCLT Route" benefits card, and "We can guide you through both routes" under the disqualifier list. It has no price anywhere on the closure page, and `/pricing`'s full Closure & Exit table (11 rows) has no NCLT or Section 59 voluntary-liquidation row either. Every lead this page generates on the NCLT route currently has no fee basis to be quoted against.

**Decision:** keep marketing the NCLT route — don't strip the copy back. Add real pricing for it instead of leaving it as an unpriced comparison.

**Required change:**
1. Get a fee figure for voluntary liquidation under Section 59 from Yug/Jatin — this audit found no source for it anywhere (not the Excel, not `/pricing`), so it needs to come from the business side, not be invented here. If it's genuinely scope-dependent (varies enough by creditor count/asset complexity that a fixed fee isn't honest), use "on enquiry, scoped after a free review" rather than a fabricated number — that's a legitimate pricing model already used elsewhere on `/pricing` (see the LLP → Pvt Ltd Conversion section, which prices individual filings but scopes the conversion itself "on quote").
2. Add the resulting row to `/pricing`'s Closure & Exit table, in the same format as the other ten rows there.
3. On `/services/company-closure`, make sure the comparison table, the "Creditor Protection via NCLT Route" benefits card, and the "we can guide you through both routes" line all point to that same figure (or the same "on enquiry" framing) rather than staying silent on cost.

**Acceptance criteria:**
- `/pricing` has a Closure & Exit row for NCLT voluntary liquidation.
- Every place `/services/company-closure` mentions the NCLT route reflects the same price (or scoping model) as `/pricing`.

---

## T6 — Fix the timeline math and drop the two unsourced stats

**Priority:** P1 · **Size:** S · **No decision needed**

**Where:** `/services/company-closure`

**Current state (live, checked 31 Aug 2026):**
- Hero stat and the STK-2-vs-NCLT comparison table both say "3–6 Months." The process-steps breakdown sums to 5–7 (documents) + 15–30 (pre-filing) + 1–2 (filing) + 30 (public notice) + 30–60 (final order) = 81–129 days, which is roughly 2.7–4.3 months — short of the stated 6-month upper bound.
- Two claims appear with no source anywhere on the site: "Over 3 lakh companies are struck off by the MCA each year" (in the overview section) and "saving ₹25,000–₹50,000 annually" (in the benefits section). Neither is in `/pricing`, the Excel this audit started from, or anywhere else checked.

**Required change:**
1. Recompute the stated timeline range from the actual step breakdown (roughly "3–4.5 months" fits 81–129 days better than "3–6"), or if 6 months reflects real-world delay buffers not captured in the step list, add a line explaining the gap (e.g., "up to 6 months allowing for resubmission delays") rather than leaving two numbers that don't reconcile.
2. Either source the "3 lakh companies" and "₹25,000–₹50,000" claims (a citable MCA statistic, and a reconciliation against the site's own Compliance Cost Calculator for the savings figure — the page links to that calculator right next to the claim) or remove both.

**Acceptance criteria:**
- The stated timeline range is consistent with the process-step breakdown on the same page.
- Both claims are either sourced (with a citation or a link to the calculator that substantiates them) or removed.

---

## T7 — Retire Business Setup Calculator as a separate tool; merge its job into the Registration Cost Calculator under the "Business Setup" name

**Priority:** P1, execution order 6 · **Size:** M–L · **Decided by Yug (31 Aug) — this supersedes the original two-option T7**

**Where:** `/calculators` (tool grid), `/calculators/company-registration-cost` (the surviving calculator), `/calculators/business-setup-calculator` (retired), plus the "Free Business Setup Calculator" cross-links on `/services/msme-registration` and `/services/startup-india`.

**The decision, as given:** don't just delete the vague calculator and point people at the accurate one as-is. Instead:

1. **Retire `/calculators/business-setup-calculator` as an independent tool.** It stays broken in its current form (mismatched capital assumptions between its own two fee lines, three wrong add-on rates) and duplicates the good calculator's job, so it shouldn't keep existing side by side with it.
2. **Rename the Registration Cost Calculator to "Business Setup Calculator."** Reasoning, as given: "Company Registration Cost Calculator" undersells its own scope — the tool already correctly prices Private Limited, OPC, Section 8, LLP, Partnership Firm *and* Sole Proprietorship, but only the first three are technically "companies" under the Companies Act. Calling it a company-registration tool reads as narrower than it is; "Business Setup" covers all six structures without the mismatch. This is a display-name and on-page copy change (H1, meta title, the `/calculators` grid card, breadcrumb label) — see the URL note below for what should and shouldn't move with it.
3. **Add an add-on-services step to this calculator, as a second page/step in its flow** (not crammed onto the same screen as entity type, state and capital) — the thing Business Setup Calculator was trying to offer, rebuilt correctly on top of the calculator that already gets the base numbers right. After the visitor gets their base registration cost, show a step offering the same six add-ons Business Setup Calculator listed, each at its **correct bundled rate** (sourced from `/pricing`'s add-on table and each service's own page — do not reuse Business Setup Calculator's numbers):

| Add-on | Correct bundled rate | Source |
|---|---|---|
| GST Registration | **₹999** | `/pricing` add-on table |
| MSME / Udyam | ₹999 | `/pricing` add-on table + MSME page |
| Trademark Filing (per class) | **₹2,499** | `/pricing` add-on table |
| Startup India (DPIIT) | **₹6,999** | `/pricing` add-on table + Startup India page |
| GST Filing (3 months) | ₹3,750 (₹1,250/mo × 3) | GST Return Filing page |
| Accounting & Bookkeeping (per month) | ₹2,999 | Accounting & Bookkeeping page |

Selecting add-ons should update the running total live, the same way changing entity type or capital already does on the base step. Since this step now produces a full configuration (entity, state, capital, directors, plus whichever add-ons were picked) and a final total, it's the natural input for T8 (carrying the calculator's output into `/contact`) — worth sequencing T8 right after this, using the merged calculator as the first thing it's wired up for.

**One technical call worth flagging rather than deciding here: does the URL move too?** The existing calculator lives at `/calculators/company-registration-cost` and is tagged "Popular" in the `/calculators` grid, which suggests it already has some search ranking and possibly inbound links. My recommendation: keep that URL as the canonical one (just change the on-page title and card label to "Business Setup Calculator"), and 301-redirect the old `/calculators/business-setup-calculator` URL to it — that preserves whatever ranking either URL has built up and avoids a second migration later. Flip this only if there's a specific reason (e.g., Business Setup Calculator's URL already outranks the other one, which would be worth a quick search-console check before deciding either way).

**Acceptance criteria:**
- `/calculators/business-setup-calculator` redirects (not 404s) to the surviving calculator.
- The surviving calculator's title, meta title, and `/calculators` grid card all read "Business Setup Calculator" (or an agreed equivalent), not "Company Registration Cost Calculator."
- The MSME and Startup India pages' "Free Business Setup Calculator" links point at the renamed calculator and land correctly.
- All six entity types still compute correctly by state and capital exactly as the Registration Cost Calculator does today (this work must not regress the tool's existing accuracy).
- The add-on step's six rates match the table above exactly, and picking any combination of add-ons updates the total correctly.
- Only one registration/setup-cost calculator remains in the `/calculators` grid.

---

## T8 — Carry calculator inputs into `/contact`

**Priority:** P1 · **Size:** M · **No decision needed** · Not in Yug's 31 Aug resequencing, but sequence this right after T7 — once the merged Business Setup Calculator (see T7) has an add-on step, its full output (entity, state, capital, directors, add-ons picked, total) is exactly the payload this ticket needs to carry into `/contact`, so building this against the old, simpler Registration Cost Calculator first would mean redoing part of it once T7 lands.

**Where:** Every calculator's primary CTA (confirmed on the Registration Cost Calculator — "Lock this in — book a free consultation"; the GST Registration and Trademark calculators use the same "book a free consultation" pattern and, on the evidence of the one tested, likely have the same gap), plus `/contact` itself.

**Current state (live, checked 31 Aug 2026):** Tested end to end on the Registration Cost Calculator: configured Private Limited, Delhi, ₹1,00,000 authorised capital, 2 directors, computed all-in cost ₹10,352. Clicking "Lock this in — book a free consultation" lands on `/contact` — a blank form (Full Name, Phone Number, Email Address, a "Service Required" dropdown reset to its placeholder "Select a service," and a free-text Message field). None of the entity type, state, capital or computed price carries forward. Whoever receives the inquiry has no more information than if the person had clicked "Contact Us" from the homepage without touching any calculator.

**Required change:**
1. Pre-select the matching option in `/contact`'s "Service Required" dropdown based on which calculator the visitor arrived from (e.g., the Registration Cost Calculator → "Company Registration").
2. Pass the computed configuration into the Message field as pre-filled text (editable, not locked), or as URL query parameters that `/contact` reads on load and either displays to the visitor or forwards silently to whoever picks up the lead. At minimum for the Registration Cost Calculator: entity type, state, authorised capital, number of directors, and the computed all-in total.
3. Apply the same pattern to the other calculators with a "book a free consultation" CTA — GST Registration Cost Calculator (entity type, turnover, computed cost) and Trademark Cost Calculator (applicant type, class count, service tier, computed cost) at minimum; audit the rest of the `/calculators` list for the same CTA pattern while in this code.

**Acceptance criteria:**
- Arriving at `/contact` from a calculator shows the Service Required field pre-set and the visitor's configuration visible somewhere in the form (message field or a summary block), not lost.
- Arriving at `/contact` directly (not from a calculator) still shows the blank form as it does today — this is additive, not a rework of the base contact flow.

---

## T9 — Decide whether entity search should isolate results

**Priority:** P2 · **Size:** S · **Product decision, not a bug fix**

**Where:** `/calculators/company-registration-cost`, arrived at via the homepage search box.

**Current state (live, checked 31 Aug 2026):** Searching "pvt ltd" from the homepage correctly routes to the Registration Cost Calculator with Private Limited pre-selected. All six entity-type cards (Private Limited, OPC, Section 8, LLP, Partnership Firm, Sole Proprietorship) stay visible and selectable — the search narrows the selection, not the option set.

**This is a judgment call, flagged rather than prescribed:** showing all six lets a visitor compare Pvt Ltd against LLP without a second search, which may be the more useful default. If a hard filter is wanted instead — hide the five non-matching cards when the page loads with a search-originated query param — that's a small, well-scoped change. Confirm intent before building it; the current behavior isn't obviously a defect.

**Acceptance criteria (only if the decision is "yes, isolate"):**
- Arriving via a search for a specific entity type shows only that entity's card and cost breakdown; the other five are reachable via a visible "compare other structures" affordance rather than deleted from the page entirely.

---

## T10 — Fix the broken GST and Company verification endpoints (new, found while checking T1)

**Priority:** P0 · **Size:** S–M (depends on cause) · **No decision needed**

**Where:** `/verify/gst-verification` and `/verify/company-verification`, backed by `/api/verify/gst` and `/api/verify/company`.

**Current state (live, checked 31 Aug 2026):** Submitting a GSTIN on `/verify/gst-verification` fires `POST /api/verify/gst`, which returns **502 Bad Gateway**. Submitting a CIN on `/verify/company-verification` fires `POST /api/verify/company`, which also returns **502**. Confirmed via the browser's network log, not just a visual check. In both cases the page shows no error message, no toast, no "verification failed, try again" state — it just silently does nothing, which reads to a user as a slow or unresponsive tool rather than a broken one.

I hit this while trying to independently verify the GSTIN/CIN question in T1 — both of the site's live-lookup verification tools were down at the time, so I couldn't cross-check either number that way. Worth checking whether PAN Verification, Trademark Class Finder and Company Name Search (the other three tools under "Free Verification Tools") share the same backend and are also affected.

**Required change:**
1. Diagnose the 502 — likely the upstream GST Network / MCA API partner integration is down, misconfigured, or the credentials/rate limit have lapsed. A 502 specifically means the app's own server got a bad response from something it's proxying to, so start there rather than in the frontend code.
2. Add a visible error state to both verification pages for when the API call fails — something as simple as "Verification is temporarily unavailable, please try again shortly" — so a failure doesn't look identical to a no-op.
3. Check the other three verification tools for the same issue.

**Acceptance criteria:**
- A real GSTIN and a real CIN both return an actual result on their respective pages.
- A deliberately-broken request (or a monitoring check) shows a visible error state instead of a silent no-op.
