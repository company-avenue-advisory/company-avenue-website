# Fee Decision Sheet — for Jatin

Company Avenue Advisory · 4 September 2026
17 fees on the live website have no verified source. This sheet is designed to be answered in one sitting.

---

## What this is

`src/lib/calc-fees.ts` is the site's single source of truth for pricing, built from the client workbooks and verified 27 August. A code sweep found 17 service fees currently displayed on the website that either **contradict** that source or **have no entry in it at all** — someone typed them during bulk content authoring in June–August and nobody checked them since.

They are live now. A prospect can read them, and a lead can arrive expecting them.

A guard test (`npm run test:pricing`) now blocks any new price from being added without a source, so this list can only shrink. It goes to zero when this sheet is filled in.

---

## Section A — Two pages currently show two different prices for the same service

**Answer these first.** A prospect on these pages sees a contradiction without needing to click anything.

| Service | The website currently says | Correct fee |
|---|---|---|
| **Tax audit** | **three** different figures — ₹4,999, ₹9,999 and ₹8,000 | ₹ ________ |
| **Nidhi company** | **two** — ₹9,999 in one place, ₹14,999 in another | ₹ ________ |

If the figures differ legitimately — by turnover slab, by entity type, by scope — say so and give the basis. The site can show a range; it cannot show three unexplained numbers.

---

## Section B — Website contradicts the verified workbook

The workbook value is on the left. Confirm which is right.

| Service | Workbook (`calc-fees.ts`) | Website says | Which is correct |
|---|---|---|---|
| **Payroll** | ₹125 per employee | ₹150 per employee | ☐ 125 ☐ 150 ☐ other: ______ |
| **TDS return** | ₹2,499 | ₹1,499 | ☐ 2,499 ☐ 1,499 ☐ other: ______ |

---

## Section C — Priced on the site, absent from the workbook

These 13 have **no entry in the pricing source at all.** Each needs two answers.

**Before the fee, the more important question: does CAA actually deliver this service today?** A page quoting ₹19,999 for something the firm has never performed generates a lead nobody can fulfil, and that costs more than the missing page would.

| Service | Site shows | Do we deliver this? | Correct fee |
|---|---|---|---|
| Advance tax | ₹1,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Branch office setup | ₹19,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Financial statements | ₹4,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Gratuity trust | ₹14,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| LMPC certificate | ₹3,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Nidhi company | ₹9,999 / ₹14,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Patent registration | ₹14,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Producer company | ₹9,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| ROC compliance | ₹4,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Tax audit | see Section A | ☐ yes ☐ no ☐ on request | ₹ ______ |
| TDS return | see Section B | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Trade licence | ₹1,499 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Transfer pricing | ₹19,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |

**"On request" is a valid answer** and often the right one. Transfer pricing and branch office setup are scope-dependent engagements; a fixed number on the page is a promise you may not want to make. Marking one "on request" removes the figure and routes the enquiry to a conversation — which is a better outcome than a wrong price either way.

**"No" is also a valid answer.** If the firm doesn't do it, the page comes down. Better than a page you can't service.

---

## Section D — Two identifiers, ten minutes, with the certificates in front of you

| | |
|---|---|
| **GSTIN** | The value on the website until this week — `07AABCC1234D1Z5` — **fails the GSTIN check-digit algorithm.** It cannot be a real registration number. It has been removed from the site. We need the real one from the GST registration certificate. |
| **CIN** | `U74999MH2015PTC260940` is still live on the site, in the footer, the privacy policy and the terms. It decodes as **Maharashtra, 2015** — while the firm's own IndiaMart listing states year established 2024. It may be correct; it has never been checked. Confirm against the certificate, or against `mca.gov.in` → Company/LLP Master Data. |

The CIN matters more than it looks: it appears in the DPDP data-fiduciary disclosure and in the terms of service. Both are documents intended to bind, and both currently name an entity nobody has verified.

---

## Why this is worth twenty minutes

A wrong fee on the website isn't only a lost margin. Three costs, in order of size:

**A prospect who arrives quoting ₹1,499 and is told ₹2,499** has been misled by the firm before the engagement starts. That is a hard conversation to recover, and it happens at the exact moment trust is being established.

**A page priced for a service the firm doesn't perform** produces enquiries that waste staff time and end in a decline.

**And the calculators are about to become the front door.** The next phase of the website work wires the service pages to the cost calculators and makes them the primary conversion path. That is the right move — a calculator that gives a founder a real number is the firm's strongest differentiator against competitors who publish nothing. But it only works if every number on the site agrees. **Driving traffic into a pricing tool while the site quotes two figures for the same service multiplies the contradiction rather than the leads**, which is why this sheet blocks that work.

---

## What happens after this is returned

1. The figures go into `calc-fees.ts` — the single source — and every page derives from there.
2. `KNOWN_UNSOURCED` empties. The guard test then prevents any future bulk authoring from adding an unsourced price.
3. The calculator linking work is unblocked.
4. Any service marked "no" has its page retired with a redirect.
