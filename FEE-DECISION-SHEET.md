# Decision Sheet — for CA Jatin Aggarwal

Company Avenue Advisory · website audit follow-up · updated 4 September 2026

These are the items only the Principal can resolve. Everything that was ours
to do, or that has since been settled, has been removed. Ordered fastest first.
The fee items are designed to be answered in one sitting — ideally with the GST
registration certificate to hand.

A guard test (`npm run test:pricing`) now blocks any new price from being added
to the site without a source. This list can only shrink; it reaches zero when
this sheet is returned.

---

## 1 — GSTIN and CIN — ✅ RESOLVED 5 September 2026

The old GSTIN (`07AABCC1234D1Z5`) failed the check-digit algorithm and was
removed 4 Sep. **Confirmed 5 Sep: the real GSTIN is `07AAVCS4279H1ZM`** — the
value from the IndiaMart listing, now confirmed directly rather than assumed
from checksum validity alone. Live on the site.

**CIN confirmed unchanged:** `U74999MH2015PTC260940`. The Maharashtra/2015-vs-
Delhi-firm-established-2024 discrepancy that flagged it as suspect was raised
and the Principal has confirmed the CIN as correct regardless.

*(The address in `nap.ts` — 209, Jaina Tower 1, District Centre, Janakpuri — is
still flagged unconfirmed because a directory lists a different building. One
line of written confirmation lets us mark it verified too.)*

---

## 2 — Two prices for one service (answer first)

A prospect on these pages sees the contradiction without clicking anything.

| Service | The website currently says | Correct fee / basis |
|---|---|---|
| **Tax audit** | **three** figures — ₹4,999, ₹9,999 and ₹8,000 | ₹ __________ |
| **Nidhi company** | **two** — ₹9,999 in one place, ₹14,999 in another | ₹ __________ |

A range is fine if the basis is stated (turnover slab, entity type, scope).
Unexplained numbers are not.

---

## 3 — Website contradicts the verified workbook

The workbook (`calc-fees.ts`, built from the client workbooks and verified
27 August) is on the left. Confirm which is right.

| Service | Workbook | Website says | Which is correct |
|---|---|---|---|
| **Payroll** | ₹125 per employee | ₹150 per employee | ☐ 125  ☐ 150  ☐ other: ____ |
| **TDS return** | ₹2,499 | ₹1,499 | ☐ 2,499  ☐ 1,499  ☐ other: ____ |

**LLP registration — the workbook disagrees with itself**, not with the site.
`CAA_LLP_Cost_Calculator_v2.xlsx` carries two unreconciled pricing blocks and
flags both, in its own text: *"the second pricing block in that file quoted
₹3,950 — settle which applies"* and, on the franking/notary line, *"the source
calculator carried ₹1,799 in one block and ₹1,950 in the other — settle which
applies."* The website currently uses the lower figure in each case because
that's what `calc-fees.ts` had to pick, not because it was confirmed.

| Line | Block A (site uses this) | Block B | Which applies |
|---|---|---|---|
| LLP professional fee | ₹3,499 | ₹3,950 | ☐ 3,499  ☐ 3,950  ☐ other: ____ |
| Franking / notary | ₹1,799 | ₹1,950 | ☐ 1,799  ☐ 1,950  ☐ other: ____ |

---

## 4 — Priced on the site, no source at all (13 services)

Someone typed these during bulk content authoring; nothing checks them.

**Before the fee: does CAA actually deliver this today?** "On request" (the
figure comes off the page and the enquiry routes to a conversation) and "No"
(the page is retired with a redirect) are both first-class answers.

| Service | Site shows | Do we deliver this? | Correct fee |
|---|---|---|---|
| Advance tax | ₹1,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Branch office setup | ₹19,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Financial statements | ₹4,999/yr | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Gratuity trust | ₹14,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| LMPC certificate | ₹3,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Nidhi company | ₹9,999 / ₹14,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Patent registration | ₹14,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Producer company | ₹9,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| ROC compliance | ₹4,999/yr | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Tax audit | see §2 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| TDS return | see §3 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Trade licence | ₹1,499 | ☐ yes ☐ no ☐ on request | ₹ ______ |
| Transfer pricing | ₹19,999 | ☐ yes ☐ no ☐ on request | ₹ ______ |

Transfer pricing and branch office setup are scope-dependent — "on request" is
likely the honest answer for both.

---

## 5 — Statutory figures and the Tax Year position (needs a CA)

Blocks the statutory-copy cleanup (Pass 3 and Pass 4).

- **~40 unverified figures in site copy** — audit thresholds, TDS rates, penalty
  amounts, statutory due dates. Each needs checking against incometax.gov.in /
  cbic.gov.in / mca.gov.in and logging in the verification register. **Can a
  team CA run this pass?**
- **Tax Year 2026-27** — the income-tax calculator needs your reviewed
  specification sheet (slabs, rates, thresholds). Until it arrives the tool
  stays scoped to FY 2025-26 and shows no current-year figures, deliberately.

---

## 6 — "1,000+ businesses served"

Appears in the hero, the stats band and ~30 service pages. Is there a defensible
basis — a client count from the practice-management system — or does the figure
come down and get replaced with non-numeric wording?

---

## 7 — DPDP data-retention period (a policy decision)

No retention period or deletion mechanism exists anywhere on the site. Every
lead ever submitted is still stored in full, including free-text messages.

- **What retention period do you want?**
- Separately: the WhatsApp lead-alert path sends the full lead record (name,
  phone, service, message) to a free third-party relay. Keep, or replace?

---

## After this is returned

1. The figures go into `calc-fees.ts` — the single source — and every page
   derives from there.
2. `KNOWN_UNSOURCED` in the guard test empties; no future bulk-authoring pass
   can reintroduce an unsourced price.
3. The calculator-linking work is unblocked.
4. Any service marked "no" has its page retired with a redirect.

---

## Yug — self-service (not for Jatin)

- ~~CIN verification~~ — done. Confirmed 5 Sep 2026, `cinConfirmed: true` in
  `nap.ts`. Safe to proceed with the directory-citation push on both GSTIN and
  CIN now.
