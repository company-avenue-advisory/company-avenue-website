# US Landing Page — Copy Deck
**Property:** `us.companyavenueadvisory.com` (rewrite of `/us`)
**Division:** Avenue Advisory — US Delivery Hub
**Audience:** CPA firm owners · Enrolled Agents · Fractional CFOs · Small & mid-sized US businesses
**Last revised:** 21 Aug 2026

---

## STATUS — SHIPPED

This page is **built**. The copy below is the editorial source; the live copy
is in `src/lib/us-content.ts`, which the page and the FAQ structured data both
read from. Edit that file, not the JSX.

| Piece | File |
|---|---|
| Copy + data (single source) | `src/lib/us-content.ts` |
| Page | `src/app/us/page.tsx` |
| Shell (no India chrome) | `src/app/us/layout.tsx` |
| Header / footer | `src/components/us/UsChrome.tsx` |
| Discovery-call form | `src/components/us/UsLeadForm.tsx` |
| Host routing | `src/middleware.ts` (step 0) |
| India chrome moved here | `src/app/(main)/layout.tsx` |

The alternate headlines, the SMB subhead variant and the tone rules below did
not all ship — they are held here for A/B tests and future edits.

### Claim-verification flags

The same discipline as `src/lib/nap.ts`: anything a prospect can check in
public, we check first. Three claims in this deck are load-bearing and
externally verifiable. **Do not ship a badge whose flag is still `VERIFY`.**

| Claim | Status | Where a prospect verifies it | If not held — ship this instead |
|---|---|---|---|
| QuickBooks ProAdvisor Certified | `VERIFY` | Intuit's public Find-a-ProAdvisor directory | "QuickBooks Online — daily working proficiency" |
| Xero Partner | `VERIFY` | Xero's public advisor directory | "Xero — daily working proficiency" |
| IRS Section 7216 Compliant | `VERIFY` | Consent-form language in your engagement pack | "Section 7216 consent workflow provided" |
| ~~Established 2016 / 10 years~~ | `CORRECTED` | MCA incorporation record | **2015**, per the [VERIFIED] value in `src/lib/nap.ts`. The page now reads `INCORPORATED` and `TRUST_CLAIMS.firmYears` rather than hardcoding either number, so it cannot drift from the India site or age out on 1 January. |
| SOC 2 / ISO 27001 | `NOT HELD` | Auditor's report | **Never imply it.** Describe the controls, not a certificate. |

A US CPA who catches one unearned badge assumes every other line is inflated.
The controls language in Section 5 is strong enough to win on its own — it
does not need a borrowed certificate.

**As shipped:** the two directory-verifiable badges are gated behind
`CERTIFICATIONS_CONFIRMED` in `src/lib/us-content.ts`, currently `false`, so
they do not render. Flip that one boolean once the firm appears in Intuit's
Find-a-ProAdvisor directory and Xero's advisor directory.

---

# 1 · HERO SECTION

**Component:** `<UsHero />` — above the fold, no scroll required to reach CTA.

### Eyebrow
> A US delivery division of Avenue Advisory · Est. 2016

### H1 — PRIMARY (target ≤ 62 chars for mobile line-breaking)

> ## You can't hire your way out of this. So stop trying.

### H1 — ALTERNATES for A/B

- **B (pain-first):** `The fourth candidate ghosted you. Your pod starts Monday.`
- **C (outcome-first):** `A dedicated accounting pod. Same team every month. Your timezone.`

Run A against B. A names the structural problem — no amount of posting on
Indeed fixes a national shortage — and gives permission to stop. B is
sharper for cold traffic that has just lost a hire.

### Sub-headline (target 180–260 chars)

> Avenue Advisory has run accounting execution for a decade. We build you a
> dedicated offshore pod — a QA Lead plus trained execution staff — fluent in
> QuickBooks Online, Xero, Bill.com and Gusto, working inside your systems,
> under your firm's name. Fully white-label. Your client never sees us.

### Sub-headline — alternate (SMB-facing traffic)

> A decade of accounting execution, built into a dedicated pod for your
> business. QuickBooks Online, Xero, Bill.com and Gusto — reconciled,
> categorised and closed on a fixed monthly date, by the same named team
> every month. Not a rotating queue.

### Primary CTA
> **Book a Discovery Call**

Sub-button microcopy:
> 30 minutes. We'll ask what's in your backlog. No deck, no pitch.

### Secondary CTA (ghost button)
> See pricing side-by-side ↓

### Hero risk-reversal line (directly under buttons, small type)
> Start with a 30-day pilot. No retainer, no long-term contract, no
> termination clause to negotiate later.

### TRUST BAR

Render as a single horizontal strip of badges under the fold-line. Muted,
monochrome, no colour — it reads as institutional, not promotional.

- `IRS Section 7216 Compliant` — *(VERIFY)*
- `QuickBooks ProAdvisor Certified` — *(VERIFY)*
- `Xero Partner` — *(VERIFY)*
- `FTC Safeguards Rule — Written Information Security Program in force`
- `AES-256 encryption · Zero local-download policy`
- `10 Years · Established 2016`

**Trust bar caption (one line, under the badges):**
> Every engagement runs under a signed NDA and a Section 7216 consent
> workflow before a single file is opened.

---

# 2 · THE AGITATION & SOLUTION SECTION

**Component:** `<UsProblemSolution />` — two-column contrast block.

### Section eyebrow
> Why you've already tried outsourcing and hated it

### Section H2
> ## You didn't get a team. You got a queue with a nice logo.

### Agitation body copy

> You've done this before. You signed with a large BPO because the hourly
> rate looked impossible to argue with. Then March arrived.
>
> The person who finally learned how your firm codes owner draws was rotated
> to another account in week six. Nobody told you. The replacement asked the
> same eleven onboarding questions you'd already answered in a recorded call.
> Reconciliations came back with plugged balances, uncleared items parked in
> Ask My Accountant, and a trial balance that didn't tie — and every hour you
> spent finding those errors was an hour you'd already paid for twice.
>
> That isn't offshoring failing. That's a staffing-pool model doing exactly
> what a staffing-pool model does. Your files were a ticket. Whoever was free
> picked it up.
>
> Meanwhile the hiring market gave you nothing. Fewer candidates sat for the
> CPA exam, the ones who did want $70,000 plus benefits plus a hybrid
> schedule, and the good ones took a corporate seat with a 6pm hard stop
> instead of a firm in busy season. You are not failing to recruit. There is
> nothing to recruit.

### Solution transition line
> **So we built the opposite of a queue.**

### Solution body copy

> An Avenue Advisory pod is a named, fixed group of people assigned to your
> firm and nobody else's. A QA Lead who reviews every deliverable before it
> reaches you, and execution staff who do the work. Same names in month
> eleven as in month one.
>
> They learn your chart of accounts, your client quirks, the three vendors
> you always want split, and the way your partner likes the close package
> assembled. That knowledge compounds instead of walking out the door. By
> quarter two they are asking you questions a new hire wouldn't know to ask.
>
> They work your hours. A file you flag at 5pm Eastern is worked overnight
> and back before your morning coffee — the timezone that used to be a
> communication problem becomes the reason your turnaround is 24 hours.
>
> And it is entirely white-label. Your pod works inside your QBO, your Xero,
> your Bill.com, under your firm's email if you want it. Your clients see
> your firm delivering faster. That is the whole story they ever get.

### Side-by-side comparison block

| | Traditional BPO | Avenue Advisory Pod |
|---|---|---|
| **Who does the work** | Whoever is free that day | The same named people, every month |
| **Continuity** | Staff rotated without notice | Fixed pod; changes only with your written sign-off |
| **Review** | You are the reviewer | QA Lead reviews before it reaches you |
| **Onboarding knowledge** | Re-explained every rotation | Compounds; documented in your pod's runbook |
| **Turnaround** | "In the queue" | 24 hours on flagged work |
| **Your role** | Full-time supervisor | Reviewer of finished work |
| **Client-facing** | Their brand, their process | Invisible. Fully white-label. |

### SMB variant of this section (for `/us` SMB traffic split)

> If you run the business rather than an accounting firm, the same failure
> mode has a different shape. You hired a part-time bookkeeper who was
> excellent until they weren't available. Or you signed up for a
> subscription platform, and now your books are technically current but no
> one can tell you why gross margin moved four points last quarter — because
> the person who closed your month has never spoken to you.
>
> A pod fixes both. Named people who know your business, a fixed close date
> every month, and a QA Lead who reviews the numbers before you see them.
> When your CPA asks for year-end workpapers, they're already assembled.

---

# 3 · SOFTWARE & SERVICES GRID

**Component:** `<UsCapabilities />`

### Section eyebrow
> Software-native, not software-trained

### Section H2
> ## We don't need three weeks to learn your stack. We work in it daily.

### Section intro
> There is no ramp-up invoice and no "systems familiarisation" phase. Your
> pod is staffed with people already working in these platforms every day —
> including the parts of them that break.

### Software cards

**QuickBooks Online**
> Full-cycle work in QBO — bank and credit-card feeds, rules, classes and
> locations, undeposited-funds cleanup, A/R and A/P ageing, journal entries
> and month-end close. We fix the things that quietly break too: duplicate
> feed transactions, a reconciliation discrepancy someone forced to zero,
> opening-balance-equity that nobody ever cleared.

**Xero**
> Bank rules and reconciliation, tracking categories, multi-currency,
> repeating invoices and bills, fixed-asset register and depreciation runs,
> and management-report packs built to your template.

**Bill.com**
> AP workflow end to end — inbox capture, coding, routing through your
> approval hierarchy, sync integrity back to the ledger, and vendor-record
> hygiene including W-9 tracking so 1099 season isn't an archaeology
> project. Approval authority never leaves your side.

**Gusto**
> Payroll journal mapping and reconciliation, contractor payments,
> multi-state registration tracking, PTO accruals, and tie-out of payroll
> liability accounts against filed returns.

**Also fluent in:**
> Dext · Hubdoc · Ramp · Expensify · Melio · A2X · Shopify and Stripe
> settlement reconciliation · Karbon and Financial Cents workflow ·
> Drake, Lacerte and UltraTax preparation support

### Services list

**Monthly Reconciliations**
> Every bank, credit card, loan, merchant and payroll-clearing account tied
> to statement, with an exceptions list rather than a plug. Documented
> variances, not silent adjustments.

**Accounts Payable & Receivable**
> Bill capture through scheduled payment run, ageing management, vendor
> statement reconciliation, collections follow-up on your cadence, and cash
> application against open invoices.

**Multi-State Tax Preparation Support**
> Federal and multi-state return preparation to review-ready stage — 1040,
> 1065, 1120, 1120-S — plus apportionment schedules, state nexus tracking,
> K-1 packages and estimate calculations. Signed and filed by your licensed
> professional. We prepare; you review and sign.

**Year-End Close & Workpapers**
> Full close package: tie-out binders, supporting schedules, fixed-asset and
> depreciation rollforward, accrual and prepaid schedules, and 1099-NEC /
> 1099-MISC preparation. Your tax preparer opens one folder and everything
> reconciles.

**Catch-Up & Clean-Up Bookkeeping**
> The engagement most firms and business owners actually need first. Eleven
> months behind, a prior bookkeeper who left mid-year, a chart of accounts
> with four versions of the same expense, an Ask My Accountant balance
> nobody has touched since 2023. We rebuild it to a defensible trial
> balance and hand you a written record of every assumption we made.

**Controller-Level Support** *(for Fractional CFOs)*
> Month-end variance analysis, KPI and dashboard maintenance, cash-flow
> forecasting inputs, board-pack preparation and budget-vs-actual reporting
> — so your billable hours go to advisory instead of assembly.

---

# 4 · RADICAL TRANSPARENCY PRICING

**Component:** `<UsPricingComparison />`

### Section eyebrow
> Radical transparency

### Section H2
> ## Here is what everyone actually charges. Including us.

### Section intro
> Most firms in this category make you sit through a discovery call to learn
> a number. We think that's a tell. Here is the real comparison, with the
> published rates of the platforms you're already evaluating.

### THE TABLE

| | **Hire in the US** | **VC-Backed Platforms** *(Pilot, Bench & similar)* | **Avenue Advisory Pod** |
|---|---|---|---|
| **Cost** | **$70,000+ / year** base salary | **$599 – $3,500+ / month**, scaled to your expenses | **$1,200 / month flat** — pilot rate |
| **True cost** | Add 20–30% in payroll taxes, benefits, PTO, software seats, recruiter fee | Rises automatically as your business grows. Add-ons for tax, CFO support and catch-up work are priced separately | Flat. Your pod's rate does not move because your revenue did |
| **Who you get** | One person — if you can find them | A support queue. The person answering may not have opened your file before | A named QA Lead and named execution staff. Assigned to you |
| **Response time** | Whenever they're at their desk | Support tickets can take days | **24-hour turnaround** on flagged work |
| **Continuity** | High turnover. Replacement takes 3–6 months to hire and train | Reassigned at their discretion | The same team month after month |
| **Capacity** | Fixed at 40 hours. Busy season is your problem | Fixed by plan tier | Scales with your season — add staff to the pod without re-contracting |
| **Commitment** | Employment liability, notice periods, severance | Annual plans; discounts require prepayment | **Zero long-term contract to start.** 30-day pilot |
| **Scope of work** | Whatever one person can do | Bookkeeping-led; specialised work priced as add-ons | Books, AP/AR, payroll support, multi-state tax prep and year-end close in one pod |

### Below-table copy

> The comparison people miss is the third row.
>
> A $599 plan and a $1,200 pod are not the same purchase. One is software
> with a support queue attached. The other is staff — people whose names you
> know, who learn your files, and who you can send a message to at 5pm and
> get an answer from by morning.
>
> And the $70,000 column is the one that actually hurts, because it isn't
> $70,000. Add payroll taxes, benefits, PTO, a software seat and a recruiter
> fee, and the loaded cost of one mid-level US bookkeeper clears $90,000 —
> for one person, with one set of working hours, who might resign in
> November.

### Fine print (must render — do not omit)

> Competitor pricing reflects publicly published rates at the time of
> writing and is included for comparison only. Plans and tiers change; check
> their current pricing directly. Our $1,200 pilot rate covers a defined
> monthly scope agreed in writing before we begin — volume beyond that scope
> is quoted before any work starts, never invoiced after.

### Pricing CTA
> **Book a Discovery Call** — we'll scope your pod on the call and put the
> number in writing the same day.

---

# 5 · SECURITY & COMPLIANCE

**Component:** `<UsSecurityAccordion />` — FAQ accordion. Emit FAQPage JSON-LD.

### Section eyebrow
> Security & regulatory posture

### Section H2
> ## The questions your professional-liability carrier would ask.

### Section intro
> If you're a CPA, taxpayer data leaving your office is a regulatory event
> with your licence attached to it. You should interrogate this section. We
> wrote it assuming you will.

---

**Q1. How do you comply with IRS Section 7216 when taxpayer data goes offshore?**

> Section 7216 makes it a criminal offence for a tax return preparer to
> disclose or use taxpayer information without consent, and the regulations
> treat disclosure to a preparer located outside the United States as a
> specific case requiring its own handling — including the rule that a
> taxpayer's SSN generally may not be disclosed to a preparer outside the US
> unless it is adequately redacted or masked.
>
> How that works in practice on our engagements:
>
> - **Consent first, always.** We supply consent language drafted to the
>   Rev. Proc. 2013-14 format for your engagement pack. It identifies the
>   offshore disclosure explicitly, is signed before we touch a file, and
>   never bundles the offshore consent with unrelated permissions.
> - **You remain the preparer of record.** We prepare to review-ready state.
>   Your licensed professional reviews, signs and files. That relationship
>   is never blurred.
> - **SSN handling.** Where our staff do not require the full identifier, we
>   work from masked or truncated data. Where a workflow genuinely requires
>   it, it stays inside your hosted environment and is never transmitted to
>   or stored on any device we control.
> - **Written records.** Consents, scope and the disclosure log are
>   retained and available to you on request — including in an examination.
>
> We'll walk your compliance lead through the exact consent wording on the
> discovery call. If your firm's counsel prefers their own, we adopt theirs.

---

**Q2. What is your FTC Safeguards Rule position, and do you have a WISP?**

> The amended Safeguards Rule (16 CFR Part 314) makes tax and accounting
> practices financial institutions for its purposes. It requires a written
> information security program, a qualified individual accountable for it,
> written risk assessments, MFA on any system holding customer information,
> encryption of customer information in transit and at rest, service-provider
> oversight, and a documented incident-response plan. IRS Publication 4557
> and Form W-12 make the WISP a practical condition of practice.
>
> - We maintain a **written information security program** covering the
>   delivery floor, with a **named accountable individual** — you get the
>   name and their direct contact at onboarding, not a shared inbox.
> - **MFA is mandatory** on every system that touches client data, with no
>   exception path for senior staff.
> - **Encryption:** AES-256 at rest, TLS 1.2 or higher in transit. No client
>   data ever moves over consumer email, WhatsApp or personal cloud storage —
>   this is a terminable offence in our staff contracts, not a guideline.
> - **Service-provider oversight cuts both ways.** Under the Rule *we* are
>   your service provider, so we contract to the security standard your
>   program requires and will sign your vendor-security addendum. We provide
>   a completed security questionnaire before you sign anything.
> - **Incident response:** documented plan, defined escalation, and a
>   contractual notification commitment to you within 24 hours of any
>   confirmed incident affecting your data — ahead of any external
>   notification obligation.

---

**Q3. Can your staff download, copy, email or remove our client files?**

> No — and the control is architectural, not a promise about behaviour.
>
> - **Zero local-download policy.** Staff work inside a locked virtual
>   desktop environment. Local drive mapping, clipboard redirection to the
>   local machine, USB mass storage and local printing are disabled at the
>   policy layer. There is no "save as" to a personal machine, because the
>   personal machine is not reachable from the session.
> - **Your systems, your keys.** Wherever possible we work directly in your
>   QBO, Xero, Bill.com and Gusto under named user accounts you create and
>   can revoke yourself in seconds — no shared logins, ever, so every action
>   is attributable to a person in your own audit log.
> - **Clean-desk and secure-floor protocol.** No personal mobile phones,
>   cameras or personal storage devices on the delivery floor. No paper, no
>   printers, no writing materials at workstations. Access-controlled entry,
>   CCTV on the floor, and a desk-clear check at every shift end.
> - **Egress controls.** Personal email, consumer file-sharing and messaging
>   platforms are blocked at the network layer on the delivery environment.
> - **Least privilege, and offboarding as a checklist.** Staff receive
>   access only to the clients in their pod's scope. When someone leaves the
>   pod or the firm, access revocation runs the same day against a written
>   checklist, and we send you the confirmation.
> - **Everything is logged.** Session and file-access logs are retained and
>   available to you.

---

**Q4. What are the contractual and confidentiality terms — and who owns the work?**

> - **You own everything.** All workpapers, files, schedules, templates and
>   documentation produced on your engagement are your property. On exit we
>   return them in full, in native format, and delete our copies to a
>   documented schedule with written confirmation. There is no data hostage
>   clause and no export fee.
> - **Confidentiality at two levels.** A firm-level NDA with you, and
>   individual engagement-level confidentiality agreements signed by every
>   named pod member — enforceable against the individual, not just the
>   company.
> - **Background-verified staff.** Every pod member is identity- and
>   employment-verified before onboarding.
> - **Full white-label.** We do not name you as a client, publish your logo,
>   or reference your engagement in any marketing without written
>   permission. Your clients are never contacted by us under our own name.
> - **Insurance.** Our coverage position, including professional indemnity,
>   is disclosed in writing during contracting — ask on the call and we will
>   send the certificate.

---

**Q5. Where is our data physically located, and who else can reach it?**

> Client data is processed inside a controlled delivery environment in
> India, on segregated infrastructure with client-level access separation —
> your pod cannot see another client's files, and no other client's pod can
> see yours. Where your engagement requires data to remain in US-hosted
> systems, we work exclusively inside your own hosted environment and no
> copy is created on our side at all. We will document the exact data-flow
> map for your engagement before you sign, and it becomes an annexure to the
> contract rather than a slide.

---

### Post-accordion trust line
> Send us your vendor-security questionnaire before the discovery call. We
> would rather answer it in writing, in advance, than talk around it.

---

# 6 · ZERO-RISK PILOT — CLOSING CTA

**Component:** `<UsPilotCta />` — full-width closing section.

### Section eyebrow
> The 30-day pilot

### Section H2
> ## Give us the file you've been avoiding.

### Body copy

> Every firm has one. The client eleven months behind. The clean-up where
> the prior bookkeeper left mid-year and the trial balance hasn't tied
> since. The one you keep moving to next week's list because starting it
> costs a full day you don't have.
>
> Send us that one.
>
> Not the tidy account you'd hand a new hire to be nice. The messiest
> backlog on your desk — because a pilot on easy work tells you nothing, and
> we would rather be judged on the file that actually scares you.
>
> **Here's the deal.** Thirty days. $1,200 flat. Your pod is assigned and
> named on day one. If at the end of it you aren't genuinely impressed by
> the reconciliation speed, the accuracy of the workpapers and the quality of
> the questions your QA Lead asked along the way — you don't sign a
> retainer. No notice period, no clawback, no conversation you have to
> steel yourself for. You keep every file, every workpaper and every piece
> of documentation we produced.
>
> We take that risk on purpose. Ten years in, we know the work survives
> contact with a hard file. That's the only argument we actually trust.

### What happens in the 30 days

1. **Day 1 — Discovery call.** 30 minutes. We look at the backlog, agree
   the scope in writing, and name your pod.
2. **Days 2–3 — Secure onboarding.** NDA and Section 7216 consents
   executed. You create named user accounts in your systems. Data-flow map
   documented and signed off.
3. **Days 4–25 — Execution.** Your pod works the backlog. Daily status,
   weekly call, questions batched rather than trickled at you. QA Lead
   reviews everything before it reaches your desk.
4. **Day 30 — You decide.** Delivered work reviewed against the scope. You
   continue on a flat monthly retainer, or you walk with all of it.

### Primary CTA
> **Book Your Discovery Call**

### Under-button microcopy
> 30 minutes, calendar link, no deck. Bring one problem file — that's the
> most useful call we can have.

### Objection-handling strip (three short columns under the CTA)

**"We're mid-season, I can't onboard anything right now."**
> Then this is the right month. Onboarding costs you 30 minutes and the
> time to create user accounts. The backlog moves whether or not you have
> capacity to move it.

**"My partners will need convincing."**
> Send them this page and the security questionnaire. The pilot exists so
> the decision rests on delivered work instead of a meeting.

**"We're a business, not an accounting firm — is this for us?"**
> Yes. Roughly half our US engagements are small and mid-sized businesses
> working with us directly: a fixed monthly close, clean books, and
> year-end workpapers your CPA can open without billing you to reorganise
> them first.

### Final trust footer line
> Avenue Advisory · Established 2016 · Serving US CPA firms, Enrolled
> Agents, Fractional CFOs and growing businesses · Every engagement under
> NDA and Section 7216 consent

---

# SUPPORTING BLOCKS

## Audience strip (place directly under hero)

**H2:** Built for four kinds of overloaded

- **CPA & Accounting Firms** — Take the clients you've been turning away. Your pod scales in busy season and doesn't need a desk.
- **Enrolled Agents** — Preparation support at review-ready stage across multi-state returns, so your time goes to representation and review.
- **Fractional CFOs** — Stop assembling the numbers you're paid to interpret. Your pod handles close and reporting; you handle the boardroom.
- **Small & Mid-Sized Businesses** — A named team that closes your books on a fixed date every month and hands your CPA a year-end file that already reconciles.

## Discovery-call form microcopy

- Form heading: **Book a Discovery Call**
- Sub: *30 minutes. We'll ask what's in your backlog, scope a pod, and send the number in writing the same day.*
- Fields: Name · Work email · Firm or business name · Role *(CPA firm / EA / Fractional CFO / Business owner)* · Software in use *(multi-select: QBO, Xero, Bill.com, Gusto, other)* · What's the messiest thing on your desk right now? *(textarea)*
- Consent line: *We'll only use this to prepare for your call. No sequences, no list.*
- Submit: **Book the call**

## SEO / metadata

- **Title:** `Offshore Accounting Pods for US CPA Firms & Businesses | Avenue Advisory`
- **Description:** `Dedicated white-label accounting pods for US CPA firms, EAs, fractional CFOs and growing businesses. QuickBooks Online, Xero, Bill.com, Gusto. $1,200/month 30-day pilot, no long-term contract.`
- **Canonical:** `https://us.companyavenueadvisory.com` — required. Without it, `companyavenueadvisory.com/us` competes with the subdomain. (Middleware 404s the path form; the canonical is the belt to that braces.)
- **OG image:** needs its own — the India-facing default OG image will be wrong for this audience. Note that Next.js metadata merges shallowly: declaring `openGraph` on this route wipes the parent's, image included.
- **JSON-LD:** `FAQPage` from Section 5, `Service` node for the pod offering. Keep the `Organization` node consistent with `src/lib/nap.ts`.

## Tone rules for any future copy on this page

1. No superlatives without a number attached.
2. Never write "seamless", "cutting-edge", "world-class", "leverage", "solutions" or "partner with us on your journey".
3. Concrete nouns from their actual working day: Ask My Accountant, opening balance equity, undeposited funds, uncleared items, K-1s, apportionment. This is the proof of fluency — more than any badge.
4. Every claim is either verifiable or cut.
5. Address the reader's stress directly and without sympathy theatre. They don't want to be told busy season is hard. They want to be told who is doing the reconciliation.
