# Dev task board — companyavenueadvisory.com

Ten tickets, sourced from the Aug 29 audit conversation and the follow-up calculator/pricing check, both re-verified live on 31 Aug 2026. Full instructions for each are in `dev-task-instructions.md` — this file is the one to paste into whatever tracker you use.

**Updated 31 Aug — Yug set the execution order and closed out two of the three open decisions.** T5: decided — price the NCLT route and keep marketing it. T7: decided — retire Business Setup Calculator as a separate tool, but fold its job into the good calculator rather than just deleting it (details below). T3 is still open and needs a call before a developer can finish it.

### Execution order (as given by Yug, 31 Aug)

| Order | # | Task | Where |
|---|---|---|---|
| 1 | T2 | Make the CCFS ₹2,500 fee auto-expire on 31 Aug | `/services/company-closure` |
| 2 | T3 | Resolve the ₹20,000 STK-2 bundling conflict — **still needs the bundled-vs-unbundled call** | `/services/company-closure`, `/pricing` |
| 3 | T4 | Add Section 8 to the STK-2 disqualifier list | `/services/company-closure` |
| 4 | T5 | Price the NCLT voluntary-liquidation route — **decided: price it, keep marketing it** | `/services/company-closure`, `/pricing` |
| 5 | T6 | Fix the timeline math and drop the two unsourced stats | `/services/company-closure` |
| 6 | T7 | Retire Business Setup Calculator; rename Registration Cost Calculator to "Business Setup Calculator" and add an add-on-services step to it | `/calculators`, `/calculators/company-registration-cost`, `/calculators/business-setup-calculator` |
| 7 | T10 | Fix the 502 errors on the GST and Company verification tools | `/verify/gst-verification`, `/verify/company-verification` |

### Not resequenced — same priority as before, work in whenever convenient

| # | Task | Priority | Size | Where |
|---|---|---|---|---|
| T1 | Fix footer double-period typo (GSTIN/CIN confirmed correct, no change) | P2 | XS | Sitewide footer component |
| T8 | Carry calculator inputs into `/contact` — now do this for the merged T7 calculator too, including any add-ons picked | P1 | M | All calculator CTAs + `/contact` |
| T9 | Decide whether entity search should isolate results | P2 | S | `/calculators/company-registration-cost` |

**Read `dev-task-instructions.md` first** for a short architectural note before starting T3, T7 or T8 — they share a root cause worth fixing once rather than three times.
