/* ─────────────────────────────────────────────────────────────────────────────
   Copy and data for the US landing page (us.companyavenueadvisory.com → /us).

   All prose lives here rather than inline in the page for two reasons:

     1. The security FAQs are rendered twice — once as the visible accordion
        and once as FAQPage structured data. Deriving both from this one array
        is the only way they cannot drift apart.
     2. Marketing copy gets edited by people who should not have to open JSX,
        and strings here need no entity-escaping.

   ── COPY DISCIPLINE ────────────────────────────────────────────────────────
   This page is ONE screenful-at-a-time landing page, not a brochure. The US
   buyer arrives from a paid click and skims. Every entry below is written to a
   hard budget:

       headline    ≤  9 words
       card body   ≤ 20 words, one sentence
       table cell  ≤  7 words

   If a line needs a second sentence to make sense, it belongs on the discovery
   call, not on the page. Resist re-expanding these — the previous version of
   this page lost on length, not on argument.

   ── CLAIMS DISCIPLINE ──────────────────────────────────────────────────────
   Same rule as src/lib/nap.ts: nothing renders that a prospect can check and
   find false. A US CPA who catches one unearned certification badge discounts
   every other line on the page.

   CERTIFICATIONS_CONFIRMED gates the two badges that are publicly verifiable
   in Intuit's and Xero's own advisor directories. Leave it false until the
   firm actually appears in both; flip the one boolean when it does.
───────────────────────────────────────────────────────────────────────────── */

import { INCORPORATED, TRUST_CLAIMS } from "./nap";

/** Flip to true ONLY once the firm is listed in Intuit's Find-a-ProAdvisor
 *  directory and Xero's advisor directory. Both are public and take a
 *  prospect about 90 seconds to check. */
export const CERTIFICATIONS_CONFIRMED = false;

export const US_SITE_URL = "https://us.companyavenueadvisory.com";

/* Firm age is NOT hardcoded here. The brief for this page said "Est. 2016 /
   10 years"; nap.ts carries a [VERIFIED] 2015 incorporation, which makes both
   figures wrong. These read from the canonical record, so the page cannot
   drift from the India site or age out on 1 January. */
export const FIRM_FOUNDED = INCORPORATED;
export const FIRM_YEARS = TRUST_CLAIMS.firmYears;

/** Flat monthly pilot fee, in whole dollars. Single source — the hero, the
 *  pricing cards and the closing CTA all read it. */
export const PILOT_FEE = 1200;

/** Pre-formatted for display. Written once so no call site can render a
 *  differently-formatted version of the same number. */
export const PILOT_FEE_USD = `$${PILOT_FEE.toLocaleString("en-US")}`;

/* ── hero ──────────────────────────────────────────────────────────────────── */

/** The four-up band under the hero. `value` is display-sized, so it stays
 *  short enough not to wrap on a phone. */
export const STATS = [
  { value: "24 hrs", label: "Turnaround on flagged work" },
  { value: PILOT_FEE_USD, label: "Flat monthly pilot" },
  { value: `${FIRM_YEARS} yrs`, label: "Running accounting execution" },
  { value: "0", label: "Long-term contract to start" },
];

export const TRUST_BADGES: { label: string; gated?: boolean }[] = [
  { label: "IRS §7216 workflow" },
  { label: "FTC Safeguards · WISP in force" },
  { label: "AES-256 · Zero-download policy" },
  { label: `Est. ${INCORPORATED}` },
  { label: "QuickBooks ProAdvisor Certified", gated: true },
  { label: "Xero Partner", gated: true },
];

/* ── the software marquee ──────────────────────────────────────────────────── */

/** The four platforms a pod works in daily — rendered as the emphasis row. */
export const STACK_PRIMARY = ["QuickBooks Online", "Xero", "Bill.com", "Gusto"];

/** Everything else, rendered as a scrolling marquee. This replaced four
 *  paragraph-length platform write-ups: a US buyer scans for their own tool
 *  and stops reading the moment they find it. */
export const STACK_ALSO = [
  "Dext", "Hubdoc", "Ramp", "Expensify", "Melio", "A2X",
  "Shopify", "Stripe", "Karbon", "Financial Cents",
  "Drake", "Lacerte", "UltraTax",
];

/* ── audience ──────────────────────────────────────────────────────────────── */

export const AUDIENCES = [
  {
    title: "CPA & Accounting Firms",
    body: "Take the clients you have been turning away, without adding headcount.",
  },
  {
    title: "Enrolled Agents",
    body: "Multi-state returns prepared to review-ready. You review and sign.",
  },
  {
    title: "Fractional CFOs",
    body: "We assemble the numbers. You keep the boardroom.",
  },
  {
    title: "Growing Businesses",
    body: "A fixed close date, and a year-end file your CPA can open.",
  },
];

/* ── the pod model ─────────────────────────────────────────────────────────── */

export const BPO_VS_POD = [
  { dimension: "Who does the work", bpo: "Whoever is free that day", pod: "The same named people" },
  { dimension: "Continuity", bpo: "Rotated without notice", pod: "Fixed, unless you sign off" },
  { dimension: "Review", bpo: "You are the reviewer", pod: "A QA Lead reviews first" },
  { dimension: "Turnaround", bpo: "In the queue", pod: "24 hours on flagged work" },
  { dimension: "Your role", bpo: "Full-time supervisor", pod: "Reviewer of finished work" },
  { dimension: "Your client sees", bpo: "Their brand and process", pod: "Nothing. Fully white-label" },
];

/* ── services ──────────────────────────────────────────────────────────────── */

export const SERVICES = [
  {
    name: "Monthly Reconciliations",
    body: "Every account tied to statement, with an exceptions list instead of a plug.",
  },
  {
    name: "Accounts Payable & Receivable",
    body: "Bill capture through payment run, ageing, collections and cash application.",
  },
  {
    name: "Multi-State Tax Prep",
    body: "1040, 1065, 1120 and 1120-S to review-ready, with apportionment and K-1s.",
  },
  {
    name: "Year-End Close",
    body: "Tie-out binders, depreciation rollforward and 1099s. One folder, everything reconciles.",
  },
  {
    name: "Catch-Up & Clean-Up",
    body: "Eleven months behind, a bookkeeper who left mid-year. Rebuilt to a defensible TB.",
  },
  {
    name: "Controller Support",
    body: "Variance analysis, KPI dashboards, cash-flow inputs and board-pack prep.",
  },
];

/* ── pricing ───────────────────────────────────────────────────────────────── */

/** Three-way anchor, rendered as cards rather than the old eight-row table.
 *  `highlight` marks our column. Competitor figures are publicly published
 *  rates at the time of writing — see PRICING_NOTE, which renders beneath. */
export const PRICING_CARDS = [
  {
    key: "hire",
    label: "Hire in the US",
    sub: "One full-time bookkeeper",
    price: "$70,000",
    unit: "/ year, base salary",
    points: [
      "Add 20–30% for taxes, benefits and PTO",
      "One person, one set of working hours",
      "3–6 months to replace when they leave",
      "Employment liability and notice periods",
    ],
  },
  {
    key: "saas",
    label: "VC-Backed Platforms",
    sub: "Pilot, Bench and similar",
    price: "$599–3,500",
    unit: "/ month, scaled to spend",
    points: [
      "Price rises automatically as you grow",
      "A support queue, not a named team",
      "Tax and catch-up work priced separately",
      "Annual plans; discounts need prepayment",
    ],
  },
  {
    key: "pod",
    label: "Company Avenue Advisory",
    sub: "Dedicated offshore team",
    price: PILOT_FEE_USD,
    unit: "/ month flat, pilot rate",
    highlight: true,
    points: [
      "Named QA Lead and named execution staff",
      "Flat rate — it does not move when revenue does",
      "Books, AP/AR, payroll, tax prep and close in one pod",
      "Add staff for your season without re-contracting",
    ],
  },
];

export const PRICING_NOTE =
  "Competitor pricing reflects publicly published rates at the time of writing, shown for comparison only. Our pilot rate covers a monthly scope agreed in writing before we begin; anything beyond it is quoted before work starts, never invoiced after.";

/* ── the pilot ─────────────────────────────────────────────────────────────── */

export const PILOT_STEPS = [
  {
    day: "Day 1",
    title: "Discovery call",
    body: "Thirty minutes. We look at the backlog, agree scope in writing, and name your pod.",
  },
  {
    day: "Day 2–3",
    title: "Secure onboarding",
    body: "NDA and §7216 consents signed. You create named user accounts in your systems.",
  },
  {
    day: "Day 4–25",
    title: "Execution",
    body: "Your pod works the backlog. Daily status, weekly call, QA Lead reviews everything.",
  },
  {
    day: "Day 30",
    title: "You decide",
    body: "Continue on a flat retainer, or walk with every file and workpaper we produced.",
  },
];

/* ── security ──────────────────────────────────────────────────────────────── */

/** Rendered as the visible accordion AND as FAQPage structured data, so the
 *  schema can never say something the page does not.
 *
 *  Trimmed from five long answers to four short ones: this section exists to
 *  clear a compliance objection, not to teach the regulation to a CPA who
 *  already knows it. Detail that used to live here now goes out in the
 *  vendor-security questionnaire, which converts better anyway. */
export const SECURITY_FAQS = [
  {
    question: "How do you handle IRS §7216 when taxpayer data goes offshore?",
    paragraphs: [
      "Consent first, always — signed before we open a file, never bundled with unrelated permissions.",
    ],
    bullets: [
      "We supply consent language drafted to the Rev. Proc. 2013-14 format for your engagement pack, naming the offshore disclosure explicitly.",
      "You remain the preparer of record. We prepare to review-ready state; your licensed professional reviews, signs and files.",
      "Where our staff do not need a full SSN we work from masked data. Where a workflow requires it, it never leaves your hosted environment.",
    ],
    closing: "If your counsel prefers their own consent wording, we adopt theirs.",
  },
  {
    question: "What is your FTC Safeguards Rule position?",
    paragraphs: [
      "We maintain a written information security program with a named accountable individual — you get their name and direct contact at onboarding.",
    ],
    bullets: [
      "MFA is mandatory on every system touching client data, with no exception path for senior staff.",
      "AES-256 at rest, TLS 1.2+ in transit. Consumer email, messaging and personal cloud storage are a terminable offence, not a guideline.",
      "Under the Rule we are your service provider: we will sign your vendor-security addendum and complete your questionnaire before you sign anything.",
      "Documented incident-response plan, with a contractual commitment to notify you within 24 hours of any confirmed incident.",
    ],
  },
  {
    question: "Can your staff download, copy or email our client files?",
    paragraphs: [
      "No — and the control is architectural rather than a promise about behaviour.",
    ],
    bullets: [
      "Staff work inside a locked virtual desktop. Local drives, clipboard redirection, USB storage and local printing are disabled at the policy layer.",
      "We work in your QBO, Xero, Bill.com and Gusto under named accounts you create and can revoke in seconds. No shared logins, ever.",
      "Secure floor: no personal phones, cameras, paper or storage devices. Access-controlled entry, CCTV, and a desk-clear check each shift.",
      "Least privilege, same-day offboarding against a written checklist, and session logs retained and available to you.",
    ],
  },
  {
    question: "What are the terms, and who owns the work?",
    paragraphs: [],
    bullets: [
      "You own everything. On exit we return all files in native format and delete our copies to a documented schedule. No data-hostage clause, no export fee.",
      "A firm-level NDA with you, plus individual confidentiality agreements signed by every named pod member — enforceable against the person, not just the company.",
      "Every pod member is identity- and employment-verified before onboarding.",
      "Full white-label. We never name you as a client or contact your clients under our own name.",
    ],
  },
];

/* ── form ──────────────────────────────────────────────────────────────────── */

/** Roles offered in the form. Feeds the lead `service` string so the existing
 *  admin console can tell a US pod enquiry from an India one at a glance. */
export const US_ROLES = [
  "CPA / Accounting firm",
  "Enrolled Agent",
  "Fractional CFO",
  "Small or mid-sized business",
  "Other",
];

export const US_SOFTWARE_OPTIONS = [
  "QuickBooks Online",
  "Xero",
  "Bill.com",
  "Gusto",
  "Something else",
];
