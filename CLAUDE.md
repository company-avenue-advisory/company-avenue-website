# Company Avenue Advisory — website

Marketing and lead-generation site for Company Avenue Advisory Private
Limited, a chartered accountancy and company secretarial firm at Jaina
Tower 1, District Centre, Janakpuri, New Delhi.

Next.js 15 App Router, React 19, Tailwind 3, TypeScript strict. MongoDB
driver, no ORM. Deployed on Vercel; DNS on Cloudflare.

## Who reads it

Founders and small-business owners in Delhi NCR deciding who will handle
their statutory filings. They are choosing on trust. Everything here is a
representation by a regulated professional firm.

## THE RULE THAT OVERRIDES EVERYTHING

A wrong statutory statement is the most damaging defect this codebase can
ship. Worse than a broken build. A broken page loses a visit; a wrong due
date or threshold loses a client and can expose the firm.

When a change touches a legal claim, a statutory due date, a threshold, a
rate, a penalty, or an eligibility rule: show the diff and stop for human
approval. Never infer a figure. Never carry a number over from training
data. If a number is needed and not supplied, say so and wait.

## Statutory context

The Income-tax Act, 2025 came into force on 1 April 2026, repealing the
Income-tax Act, 1961. The Income-tax Rules, 2026 took effect the same
day. Verified against incometax.gov.in.

- "Previous Year" and "Assessment Year" are discontinued. The term is
  "Tax Year". Any reference to an Assessment Year for a period from
  1 April 2026 onward is technically incorrect.
- Section numbering differs throughout the 2025 Act. The official
  1961→2025 concordance has NOT been verified for this project.
- FY 2025-26 and earlier remain governed by the 1961 Act. The old law
  governs the old year.

## Income-tax section numbers — the rule, and its boundary

Do not cite a section number of the Income-tax Act, 2025 anywhere. The
concordance is unverified and a wrong new number is worse than no number.

This rule is INCOME-TAX SPECIFIC. It does not extend to:

- **The Companies Act, 2013**, which is not repealed. "Section 8 company"
  is the legal name of an entity type and appears in the firm's own
  service list. Section 164(2), Section 59 and similar are correct and
  stay.
- **The CGST Act and rules**, FEMA, the MSMED Act, the EPF and ESI Acts.
  Same reasoning — not repealed.
- **A 1961 Act section cited in copy that is explicitly about FY 2025-26
  or an earlier year.** In that context the citation is correct, because
  that Act governs that year. It needs a dated scope line, not deletion.

What is prohibited is citing a 1961 Act section as if it states the
current law, in evergreen copy with no year attached.

## Section numbers as proper nouns

A section number used as the established NAME of a scheme, registration,
or service is a proper noun, not a claim about current law. It stays:
"80-IAC exemption", "12A registration", "80G certificate", "80C
deduction". These are what clients ask for by name and what the
administering portals call them.

A section number used to STATE WHAT THE LAW REQUIRES is a claim. It goes.

Test: could you replace the number with a description without the reader
losing the referent? "The profit-linked exemption for recognised
startups" — nobody searches that, and DPIIT doesn't call it that. Keep
the number. "Late filing attracts a fee under section X" — the reader
only needs to know a fee exists. Drop the number.

## Other editorial rules

From CAA's verification register, which tiers every statutory assertion
A (official government portal), B (reputable secondary) or C
(unverified). Nothing publishes until it reads Verified or Deliberately
omitted.

1. No PF, ESI or POSH headcount thresholds or contribution rates. ESI
   varies by state. Deliberately unpublished rather than published wrong.
2. No GST return frequencies, turnover thresholds, or annual-return
   applicability limits without verification. These have changed
   repeatedly.
3. No statistic without a named source. Includes years of experience,
   client counts, satisfaction percentages, team size. `TRUST_CLAIMS` in
   nap.ts carries `confirmed` flags — respect them.
4. Where a due date genuinely varies — with an AGM date, entity type, or
   a year's extensions — say that it varies rather than printing a
   representative date.

## Where things live

- `src/lib/nap.ts` — CANONICAL NAP RECORD. Address, hours, phone, email,
  GSTIN, CIN, socials, TRUST_CLAIMS. Single source. `constants.ts`
  re-exports from it. Never add a competing literal.
- `src/lib/calc-fees.ts` — single numeric source of truth for all
  pricing. Imports nothing. `PRO_FEES`, `INCORP_FEE_CARD`,
  `ADDON_SERVICES`, `CLOSURE_HEADLINE`, `closureAllIn()`, `ccfsStatus()`,
  `NCLT_LIQUIDATION`. Sourced from client workbooks, verified 27 Aug 2026.
- `src/lib/seo.ts` — all structured data. Rendered server-side via
  `<JsonLd>` in `(main)/layout.tsx`.
- `src/lib/legacy-redirects.ts` — 301s, applied in middleware.
- `src/components/sections/*Page.tsx` — page copy, hardcoded.
- `src/lib/faqs/` — per-page FAQ data.
- Status history: `WORK-ORDER-STATUS.md`,
  `MASTER-WORK-ORDER-STATUS.md`, `dev-task-board.md`,
  `dev-task-instructions.md`. Read these before assuming something is
  undone.

## Engineering rules

- Smallest working diff. Reuse before writing.
- No new dependencies without asking.
- No abstraction with a single implementation.
- One source of truth for pricing and for identity. If you find a
  second, consolidate — don't sync.
- Anything touching money, eligibility logic, or a legal claim leaves one
  runnable assert-based check behind. Plain asserts, no framework.
  Currently unmet across the money paths — `calc-fees.ts`,
  `closureAllIn()`, `ccfsStatus()` have no checks at all.

## Open, as of 4 Sep 2026

- Income-tax section numbers and "Assessment Year" across ~35 files.
- Per-service stat tiles carrying invented figures on ~25 pages.
- Hours (9 PM vs 7 PM) and GSTIN `confirmed: false` in nap.ts, awaiting
  the Principal.
- No test coverage on the money paths.
