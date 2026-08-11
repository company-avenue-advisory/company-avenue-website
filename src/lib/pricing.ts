/**
 * Service pricing + calculator mapping.
 *
 * PLAIN MODULE — no "use client". Server components import this directly; client
 * components must receive the resolved values as props (see
 * project-startup-schemes-build client-bundle rule).
 *
 * Benchmarked against setindiabiz.com published professional fees (scraped
 * 2026-08-11). Our professional fee = their published fee + ₹500 on every tier,
 * including the strike-through "compare at" figure so the discount delta matches.
 * Government fees are never marked up — they are pass-through, shown "at actual".
 */

export type PriceTier = {
  /** Plan name as shown to the user */
  name: string;
  /** Our professional fee in ₹ (their tier + 500) */
  price: number;
  /** Strike-through price in ₹ (their compare-at + 500) */
  compareAt?: number;
  /** One-line positioning for the tier */
  desc?: string;
  /** Everything this tier adds over the previous one */
  includes: string[];
  popular?: boolean;
};

export type FeeRow = {
  label: string;
  /** Pre-formatted value: "₹1,000", "At actual", "NIL" */
  value: string;
  note?: string;
};

export type ServicePricing = {
  /** Heading shown above the band */
  label: string;
  /** Our lowest professional fee in ₹ */
  startingAt: number;
  /** Strike-through against startingAt */
  compareAt?: number;
  /** Suffix after the amount, e.g. "/month", "per class" */
  unit?: string;
  /** Short line under the price, e.g. "+ government fees at actual" */
  feeNote: string;
  tiers: PriceTier[];
  /** Itemised cost table shown beside the price */
  breakdown: FeeRow[];
  /** Bottom line of the breakdown table */
  typicalTotal?: string;
  /** Extra caveat under the table */
  disclaimer?: string;
};

const GST_NOTE = "GST @18% on professional fees is charged extra.";

export const SERVICE_PRICING: Record<string, ServicePricing> = {
  /* ─────────────── Company Formation ─────────────── */

  "private-limited-company": {
    label: "Private Limited Company Registration Cost",
    startingAt: 2999,
    compareAt: 5499,
    feeNote: "+ government fees & DSC at actual",
    tiers: [
      {
        name: "Essential",
        price: 2999,
        compareAt: 5499,
        desc: "Get incorporated — everything you need for a valid Pvt Ltd company.",
        includes: [
          "Digital Signature (DSC) processing for 2 directors",
          "Director Identification Number (DIN)",
          "Company name search & RUN approval",
          "MoA & AoA drafting",
          "Complete SPICe+ filing with MCA",
          "Certificate of Incorporation with CIN",
          "Company PAN & TAN",
        ],
      },
      {
        name: "Growth",
        price: 7999,
        compareAt: 12999,
        desc: "Incorporation plus the registrations you will need in month one.",
        popular: true,
        includes: [
          "Everything in Essential",
          "MSME (Udyam) registration",
          "GST registration with GSTIN",
          "GST return filing for 6 months",
        ],
      },
      {
        name: "Complete",
        price: 15499,
        compareAt: 22999,
        desc: "Your entire first year of compliance, handled.",
        includes: [
          "Everything in Growth",
          "Director's Report drafting",
          "First-year ROC annual returns (AOC-4 & MGT-7)",
          "Company ITR-6 filing",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹2,999" },
      { label: "Name approval (SPICe+ Part A)", value: "₹1,000" },
      { label: "DSC — 2 directors", value: "₹3,000", note: "vendor fee, ₹1,500 each" },
      { label: "MCA incorporation fee", value: "NIL", note: "authorised capital up to ₹15 lakh" },
      { label: "Stamp duty (MoA/AoA)", value: "At actual", note: "varies by state" },
      { label: "PAN & TAN", value: "₹131" },
    ],
    typicalTotal: "≈ ₹7,100 – ₹9,500 all-in for a 2-director company in Delhi",
    disclaimer: GST_NOTE,
  },

  "llp-registration": {
    label: "LLP Registration Cost",
    startingAt: 2999,
    compareAt: 6999,
    feeNote: "+ government fees & DSC at actual",
    tiers: [
      {
        name: "Essential",
        price: 2999,
        compareAt: 6999,
        desc: "Ideal for startups with a resident Indian partner.",
        includes: [
          "Director Identification Number (DIN) for 2 partners",
          "Name search & RUN-LLP approval",
          "FiLLiP incorporation filing",
          "Certificate of Incorporation",
          "LLP PAN & TAN",
          "LLP Agreement drafting",
          "Form 3 filing with ROC",
        ],
      },
      {
        name: "Growth",
        price: 12499,
        compareAt: 14999,
        desc: "Incorporation plus your first-year tax registrations.",
        popular: true,
        includes: [
          "Everything in Essential",
          "GST registration with GSTIN",
          "MSME (Udyam) registration",
          "Shops & Establishment registration",
          "GST return filing — first year free",
        ],
      },
      {
        name: "Complete",
        price: 19499,
        compareAt: 22999,
        desc: "Incorporation plus a full year of ROC and tax compliance.",
        includes: [
          "Everything in Growth",
          "DIN KYC for up to 3 partners",
          "ROC annual returns — Form 11 & Form 8",
          "LLP income tax return filing",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹2,999" },
      { label: "Govt. fee — contribution up to ₹1 lakh", value: "₹4,883" },
      { label: "Govt. fee — ₹1 lakh to ₹5 lakh", value: "₹6,433" },
      { label: "Govt. fee — ₹5 lakh to ₹10 lakh", value: "₹8,483" },
      { label: "Govt. fee — above ₹10 lakh", value: "₹9,533" },
      { label: "DSC — 2 partners", value: "₹3,000", note: "vendor fee" },
    ],
    typicalTotal: "≈ ₹10,900 all-in for an LLP with ₹1 lakh contribution",
    disclaimer: `Government fee shown is the combined FiLLiP + PAN + TAN + Form 3 cost. LLP Agreement stamp duty varies by state. ${GST_NOTE}`,
  },

  "one-person-company": {
    label: "One Person Company (OPC) Registration Cost",
    startingAt: 2999,
    compareAt: 5499,
    feeNote: "+ government fees & DSC at actual",
    tiers: [
      {
        name: "Essential",
        price: 2999,
        compareAt: 5499,
        desc: "Everything required to incorporate your OPC.",
        includes: [
          "Digital Signature (DSC) processing",
          "Director Identification Number (DIN)",
          "Name search & approval",
          "MoA & AoA drafting",
          "Complete SPICe+ filing",
          "Certificate of Incorporation with CIN",
          "Company PAN & TAN",
          "ESI & PF registration",
        ],
      },
      {
        name: "Growth",
        price: 7999,
        compareAt: 12999,
        desc: "Incorporation plus GST and MSME, ready to invoice.",
        popular: true,
        includes: [
          "Everything in Essential",
          "MSME (Udyam) registration",
          "GST registration with GSTIN",
          "GST return filing for 6 months",
        ],
      },
      {
        name: "Complete",
        price: 15499,
        compareAt: 22999,
        desc: "Incorporation plus your first-year ROC filings.",
        includes: [
          "Everything in Growth",
          "Director's Report drafting",
          "First auditor appointment (ADT-1)",
          "First-year ROC annual returns",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹2,999" },
      { label: "Name approval (SPICe+ Part A)", value: "₹1,000" },
      { label: "DSC — 1 director", value: "₹1,500", note: "vendor fee" },
      { label: "MCA incorporation fee", value: "NIL", note: "authorised capital up to ₹15 lakh" },
      { label: "Stamp duty (MoA/AoA)", value: "At actual", note: "varies by state" },
      { label: "PAN & TAN", value: "₹131" },
    ],
    typicalTotal: "≈ ₹5,600 – ₹7,500 all-in in Delhi",
    disclaimer: GST_NOTE,
  },

  "partnership-firm": {
    label: "Partnership Firm Registration Cost",
    startingAt: 5499,
    compareAt: 7999,
    feeNote: "+ government fees & stamp duty at actual",
    tiers: [
      {
        name: "Essential",
        price: 5499,
        compareAt: 7999,
        desc: "A properly drafted deed and the firm's tax identity.",
        includes: [
          "Expert consultation on deed terms",
          "Partnership deed drafting",
          "PAN card for the firm",
          "TAN allotment",
          "Brand name availability search",
        ],
      },
      {
        name: "Growth",
        price: 8999,
        compareAt: 12999,
        desc: "Deed plus the registrations you need to start trading.",
        popular: true,
        includes: [
          "Everything in Essential",
          "GST registration",
          "MSME (Udyam) registration",
          "Dedicated relationship manager",
        ],
      },
      {
        name: "Complete",
        price: 18999,
        compareAt: 25499,
        desc: "Deed, registrations, brand protection and first-year filings.",
        includes: [
          "Everything in Growth",
          "Shops & Establishment registration",
          "Trademark filing — one class",
          "First-year MSME renewal",
          "GST return filing — first year free",
          "ITR preparation — first year free",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹5,499" },
      { label: "Deed stamp paper", value: "At actual", note: "state-specific, typically ₹500 – ₹5,000" },
      { label: "Notarisation", value: "At actual" },
      { label: "Firm PAN & TAN", value: "₹131" },
      { label: "Registrar of Firms fee", value: "At actual", note: "optional but recommended" },
      { label: "Trademark govt. fee", value: "₹4,500", note: "per class, Complete plan only" },
    ],
    typicalTotal: "≈ ₹7,000 – ₹9,000 all-in for a 2-partner firm",
    disclaimer: GST_NOTE,
  },

  "sole-proprietorship": {
    label: "Sole Proprietorship Registration Cost",
    startingAt: 2999,
    feeNote: "+ government fees at actual",
    tiers: [
      {
        name: "Essential",
        price: 2999,
        desc: "The minimum set-up to trade legally under a business name.",
        includes: [
          "30-minute strategy call with a process expert",
          "GST registration under Rule 14A",
          "MSME (Udyam) registration",
        ],
      },
      {
        name: "Growth",
        price: 7999,
        desc: "Registrations plus six months of filings, done for you.",
        popular: true,
        includes: [
          "Everything in Essential",
          "Dedicated relationship manager",
          "GST return filing for 6 months",
          "TAN allotment",
          "Shops & Establishment registration",
        ],
      },
      {
        name: "Complete",
        price: 12999,
        desc: "Adds brand-name due diligence and public notice.",
        includes: [
          "Everything in Growth",
          "Brand name search on the IP India register",
          "Brand adoption affidavit, notarised",
          "Newspaper notice drafting",
          "Newspaper advertisement coordination",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹2,999" },
      { label: "GST registration govt. fee", value: "NIL" },
      { label: "MSME (Udyam) govt. fee", value: "NIL" },
      { label: "Shops & Establishment fee", value: "At actual", note: "state-specific" },
      { label: "Affidavit stamp paper", value: "₹100", note: "Complete plan only" },
    ],
    typicalTotal: "≈ ₹3,000 – ₹4,500 all-in",
    disclaimer: GST_NOTE,
  },

  "section-8-company": {
    label: "Section 8 Company (NGO) Registration Cost",
    startingAt: 7999,
    compareAt: 10499,
    feeNote: "+ ROC fee, stamp duty & DSC at actual",
    tiers: [
      {
        name: "Essential",
        price: 7999,
        compareAt: 10499,
        desc: "Incorporation of your not-for-profit company.",
        includes: [
          "Digital Signature (DSC) service",
          "Director Identification Number (DIN)",
          "Name search & approval",
          "MoA & AoA drafting",
          "Complete SPICe+ filing",
          "Certificate of Incorporation with CIN",
          "Company PAN & TAN",
        ],
      },
      {
        name: "Growth",
        price: 25499,
        compareAt: 32499,
        desc: "Incorporation plus the registrations donors ask for.",
        popular: true,
        includes: [
          "Everything in Essential",
          "INC-20A commencement filing",
          "First auditor appointment (ADT-1)",
          "Shops Act registration",
          "12A provisional registration",
          "80G provisional registration",
          "NITI Aayog Darpan ID",
        ],
      },
      {
        name: "Complete",
        price: 35499,
        compareAt: 43499,
        desc: "Everything above plus a full year of compliance.",
        includes: [
          "Everything in Growth",
          "DIN KYC for up to 3 directors",
          "Director's Report & AGM drafting",
          "ROC annual returns — ADT-1, MGT-7, AOC-4",
          "Company ITR filing",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹7,999" },
      { label: "Name approval", value: "₹1,000" },
      { label: "DSC — 2 directors", value: "₹3,000", note: "vendor fee" },
      { label: "MCA / ROC fee", value: "₹2,000", note: "approx., licence under Section 8" },
      { label: "Stamp duty", value: "At actual", note: "varies by state" },
      { label: "12A & 80G govt. fee", value: "NIL" },
    ],
    typicalTotal: "≈ ₹14,000 – ₹16,000 all-in for a 2-director Section 8 company",
    disclaimer: GST_NOTE,
  },

  "indian-subsidiary": {
    label: "Indian Subsidiary Registration Cost",
    startingAt: 31499,
    feeNote: "+ government fees, stamp duty & taxes at actual",
    tiers: [
      {
        name: "Essential",
        price: 31499,
        desc: "Incorporate the Indian entity for your foreign parent.",
        includes: [
          "Digital Signature for two persons",
          "DIN for two directors",
          "Name search & approval",
          "MoA & AoA drafting",
          "SPICe+ filing with MCA",
          "Certificate of Incorporation",
          "e-PAN & e-TAN",
        ],
      },
      {
        name: "Growth",
        price: 44499,
        desc: "Incorporation plus banking and tax registrations.",
        popular: true,
        includes: [
          "Everything in Essential",
          "Bank account opening assistance",
          "INC-20A commencement filing",
          "GST registration",
          "MSME registration",
          "Dedicated relationship manager",
        ],
      },
      {
        name: "Complete",
        price: 70999,
        desc: "Adds full FDI inward-remittance reporting to the RBI.",
        includes: [
          "Everything in Growth",
          "Capital remittance support",
          "FDI declaration filing",
          "RBI FIRMS portal registration",
          "FDI documentation preparation",
          "FC-GPR filing with the RBI",
          "UIN allotment from the RBI",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹31,499" },
      { label: "Name approval", value: "₹1,000" },
      { label: "DSC — 2 directors", value: "₹3,000", note: "vendor fee" },
      { label: "Apostille / notarisation of parent docs", value: "At actual" },
      { label: "Stamp duty (MoA/AoA)", value: "At actual", note: "varies by state" },
      { label: "Each additional promoter", value: "₹4,999" },
    ],
    typicalTotal: "≈ ₹36,000+ all-in, excluding apostille costs abroad",
    disclaimer: `Benchmarked against a USD-denominated competitor price, converted at ₹88/USD. ${GST_NOTE}`,
  },

  "nbfc-registration": {
    label: "NBFC Registration Cost",
    startingAt: 5499,
    feeNote: "consultation & advisory fee — full quote after scoping",
    tiers: [
      {
        name: "Advisory",
        price: 5499,
        desc: "Structured consultation on licence feasibility and route.",
        includes: [
          "Eligibility and category assessment",
          "Net Owned Fund (NOF) planning",
          "Documentation checklist",
          "Application route recommendation",
        ],
      },
    ],
    breakdown: [
      { label: "Our advisory fee", value: "₹5,499" },
      { label: "Minimum Net Owned Fund", value: "₹2 crore", note: "RBI requirement, not a fee" },
      { label: "RBI application fee", value: "At actual" },
      { label: "Company incorporation", value: "₹2,999+", note: "if not already incorporated" },
      { label: "End-to-end licence support", value: "On quote" },
    ],
    disclaimer: `NBFC licensing is scoped per case. ${GST_NOTE}`,
  },

  "microfinance-company": {
    label: "Microfinance Company Registration Cost",
    startingAt: 5499,
    feeNote: "consultation & advisory fee — full quote after scoping",
    tiers: [
      {
        name: "Advisory",
        price: 5499,
        desc: "Consultation on the Section 8 vs NBFC-MFI route.",
        includes: [
          "Structure recommendation (Section 8 or NBFC-MFI)",
          "Capital requirement planning",
          "Documentation checklist",
          "Regulatory roadmap",
        ],
      },
    ],
    breakdown: [
      { label: "Our advisory fee", value: "₹5,499" },
      { label: "Section 8 route incorporation", value: "₹7,999+" },
      { label: "NBFC-MFI minimum Net Owned Fund", value: "₹5 crore", note: "RBI requirement" },
      { label: "End-to-end licence support", value: "On quote" },
    ],
    disclaimer: `Scoped per case. ${GST_NOTE}`,
  },

  /* ─────────────── Tax & GST ─────────────── */

  "gst-registration": {
    label: "GST Registration Cost",
    startingAt: 999,
    feeNote: "government fee for GST registration is NIL",
    tiers: [
      {
        name: "Registration only",
        price: 999,
        desc: "Get your GSTIN under the Rule 14A simplified route.",
        includes: [
          "Eligibility & category verification",
          "GST REG-01 preparation",
          "Portal application filing",
          "ARN generation and tracking",
          "Query / clarification support",
          "GSTIN & REG-06 certificate",
        ],
      },
      {
        name: "GST + 6 months returns",
        price: 4499,
        desc: "Registration plus half a year of filings.",
        includes: [
          "Everything in Registration only",
          "GSTR-1 filing for 6 months",
          "GSTR-3B filing for 6 months",
          "Monthly data review",
          "Filing reminders",
          "Up to 25 sales + 25 purchase invoices a month",
        ],
      },
      {
        name: "GST + 12 months returns",
        price: 7499,
        desc: "A full year of GST compliance, handled.",
        popular: true,
        includes: [
          "Everything in the 6-month plan",
          "GSTR-1 & GSTR-3B for 12 months",
          "Basic sales / purchase analysis",
          "Priority support",
          "Up to 300 invoices a year",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹999" },
      { label: "GST department fee", value: "NIL" },
      { label: "Digital signature (companies/LLPs)", value: "₹1,500", note: "not needed for proprietors — Aadhaar OTP" },
      { label: "Non-Rule-14A applications", value: "₹4,000", note: "standard route with departmental liaison" },
      { label: "Site visit / physical verification support", value: "At actual" },
    ],
    typicalTotal: "≈ ₹999 for a proprietor, ≈ ₹2,500 for a company",
    disclaimer: GST_NOTE,
  },

  "gst-filing": {
    label: "GST Return Filing Cost",
    startingAt: 1250,
    unit: "/month",
    feeNote: "per month — no government fee for filing on time",
    tiers: [
      {
        name: "GST Returns",
        price: 1250,
        desc: "Your monthly GST filings, done on time.",
        includes: [
          "GSTR-1 / IFF filing",
          "GSTR-3B filing",
          "GST input tax credit analysis",
          "Dedicated tax professional",
          "Accounting not included",
        ],
      },
      {
        name: "GST + TDS",
        price: 1750,
        desc: "Adds your quarterly TDS obligations.",
        popular: true,
        includes: [
          "Everything in GST Returns",
          "TDS computation",
          "TDS payment assistance",
          "Quarterly TDS return filing",
          "Accounting not included",
        ],
      },
      {
        name: "Virtual CFO",
        price: 3000,
        desc: "Full books plus every monthly filing.",
        includes: [
          "Everything in GST + TDS",
          "Bookkeeping",
          "Bank reconciliation",
          "Trial balance",
          "Monthly ledger reports",
          "Monthly P&L and balance sheet",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹1,250", note: "per month" },
      { label: "Government filing fee", value: "NIL" },
      { label: "Late fee — with tax liability", value: "₹50/day", note: "₹25 CGST + ₹25 SGST" },
      { label: "Late fee — nil return", value: "₹20/day", note: "₹10 CGST + ₹10 SGST" },
      { label: "Maximum late fee", value: "₹5,000", note: "per return" },
    ],
    typicalTotal: "≈ ₹15,000 a year for a small business on the GST Returns plan",
    disclaimer: `Excludes tax payment, interest and penalty. ${GST_NOTE}`,
  },

  "gst-amendment": {
    label: "GST Amendment Cost",
    startingAt: 1999,
    feeNote: "government fee for amendment is NIL",
    tiers: [
      {
        name: "Standard amendment",
        price: 1999,
        desc: "Update any core or non-core field on your GST registration.",
        includes: [
          "Review of the change and its category",
          "Core / non-core field determination",
          "Form GST REG-14 preparation",
          "Portal filing and ARN tracking",
          "Response to departmental queries",
          "Amended registration certificate",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹1,999" },
      { label: "GST department fee", value: "NIL" },
      { label: "Non-core amendments", value: "Auto-approved", note: "no officer approval needed" },
      { label: "Core amendments", value: "15 working days", note: "officer approval required" },
    ],
    disclaimer: GST_NOTE,
  },

  "income-tax-return": {
    label: "Income Tax Return Filing Cost",
    startingAt: 1249,
    feeNote: "no government fee for filing your return",
    tiers: [
      {
        name: "Salaried Standard",
        price: 1249,
        desc: "One Form 16, one house property.",
        includes: [
          "ITR-1 preparation and filing",
          "Old vs new regime comparison",
          "Form 26AS / AIS reconciliation",
          "e-verification support",
        ],
      },
      {
        name: "Salaried Plus",
        price: 1999,
        desc: "Multiple Form 16s or more than one house property.",
        includes: [
          "Everything in Salaried Standard",
          "Multiple employers handled",
          "Multiple house properties",
          "Deduction optimisation review",
        ],
      },
      {
        name: "Capital Gains",
        price: 2999,
        desc: "Shares, mutual funds or property sales.",
        popular: true,
        includes: [
          "Everything in Salaried Plus",
          "Capital gains computation",
          "Broker statement reconciliation",
          "Indexation and exemption planning",
        ],
      },
      {
        name: "Business / Trader",
        price: 3999,
        desc: "Business income, presumptive or regular books.",
        includes: [
          "ITR-3 / ITR-4 preparation and filing",
          "Presumptive taxation under 44AD / 44ADA",
          "Balance sheet and P&L schedules",
          "Advance tax review",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee — salaried", value: "₹1,249" },
      { label: "Our professional fee — capital gains", value: "₹2,999" },
      { label: "Our professional fee — business", value: "₹3,999" },
      { label: "Our professional fee — F&O trader", value: "₹6,999" },
      { label: "Our professional fee — NRI", value: "₹7,999" },
      { label: "Income Tax Department fee", value: "NIL" },
      { label: "Late filing fee u/s 234F", value: "₹1,000 – ₹5,000", note: "if filed after the due date" },
    ],
    disclaimer: GST_NOTE,
  },

  /* ─────────────── MCA / ROC Compliance ─────────────── */

  "llp-annual-filing": {
    label: "LLP Annual Filing Cost",
    startingAt: 2499,
    feeNote: "+ ROC filing fee at actual",
    tiers: [
      {
        name: "Form 11 — Annual Return",
        price: 2499,
        desc: "Your ROC annual return. Due 30 May.",
        includes: [
          "Expert consultation",
          "Form 11 preparation",
          "Filing with the ROC",
          "Complete online process",
        ],
      },
      {
        name: "LLP Income Tax Return",
        price: 2999,
        desc: "Mandatory ITR for every LLP. Due 31 July.",
        popular: true,
        includes: [
          "Tax liability computation",
          "ITR-5 preparation",
          "Filing and submission",
          "Complete online process",
        ],
      },
      {
        name: "Form 8 — Statement of Accounts",
        price: 3499,
        desc: "Statement of account and solvency. Due 30 October.",
        includes: [
          "Solvency declaration drafting",
          "Form 8 preparation",
          "Filing with the ROC",
          "Complete online process",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee — Form 11", value: "₹2,499" },
      { label: "ROC fee — contribution up to ₹1 lakh", value: "₹50" },
      { label: "ROC fee — ₹1 lakh to ₹5 lakh", value: "₹100" },
      { label: "ROC fee — ₹5 lakh to ₹10 lakh", value: "₹150" },
      { label: "ROC fee — ₹10 lakh to ₹25 lakh", value: "₹200" },
      { label: "Late filing penalty", value: "₹100/day", note: "per form, no upper cap" },
    ],
    typicalTotal: "≈ ₹9,000 for all three filings for a small LLP",
    disclaimer: `Plans are priced for small LLPs with turnover up to ₹10 lakh. ${GST_NOTE}`,
  },

  "company-closure": {
    label: "Company Closure & Dormant Status Cost",
    startingAt: 7999,
    feeNote: "+ ROC fee at actual",
    tiers: [
      {
        name: "Dormant status / Strike-off",
        price: 7999,
        desc: "Obtain dormant status or strike the company off the register.",
        includes: [
          "Eligibility review",
          "Board resolution drafting",
          "Affidavits and indemnity bonds",
          "Statement of accounts preparation",
          "MSC-1 / STK-2 filing with the ROC",
          "Follow-up until approval",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹7,999" },
      { label: "ROC fee — capital of ₹1 lakh", value: "₹1,300" },
      { label: "STK-2 strike-off fee", value: "₹10,000", note: "if striking off rather than dormant" },
      { label: "Digital signature", value: "₹1,500", note: "if expired" },
      { label: "Pending annual filings", value: "At actual", note: "must be cleared first" },
    ],
    typicalTotal: "≈ ₹9,300 for dormant status on a ₹1 lakh capital company",
    disclaimer: GST_NOTE,
  },

  "agm-services": {
    label: "AGM Compliance Cost",
    startingAt: 6499,
    feeNote: "+ ROC filing fee at actual",
    tiers: [
      {
        name: "AGM compliance",
        price: 6499,
        desc: "Notices, minutes and resolutions done properly.",
        includes: [
          "AGM notice drafting and dispatch",
          "Director's Report preparation",
          "Minutes of the meeting",
          "Board and shareholder resolutions",
          "Statutory register updates",
          "Filing support for MGT-7 and AOC-4",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹6,499" },
      { label: "ROC filing fee", value: "₹200 – ₹600", note: "by authorised capital" },
      { label: "Penalty — AGM not held (s.99)", value: "Up to ₹1,00,000", note: "plus ₹5,000/day continuing" },
      { label: "Late filing fee", value: "₹100/day", note: "per form" },
    ],
    disclaimer: `Complex or contested AGMs are quoted separately, up to ₹25,000. ${GST_NOTE}`,
  },

  /* ─────────────── Startup, MSME & Licences ─────────────── */

  "fssai-license": {
    label: "FSSAI Licence Cost",
    startingAt: 3499,
    feeNote: "+ FSSAI government fee at actual",
    tiers: [
      {
        name: "Basic Registration",
        price: 3499,
        desc: "Turnover under ₹12 lakh, operating within one state.",
        includes: [
          "Eligibility assessment",
          "Online application filing",
          "Document preparation and upload",
          "Application status tracking",
          "Registration certificate",
        ],
      },
      {
        name: "State Licence",
        price: 8999,
        desc: "Turnover above ₹12 lakh, up to ₹20 crore retail / ₹30 crore wholesale.",
        popular: true,
        includes: [
          "Everything in Basic Registration",
          "State licence application",
          "Food safety management plan",
          "Layout and equipment schedule",
          "Departmental query handling",
        ],
      },
      {
        name: "Central Licence",
        price: 12499,
        desc: "Large operations, importers and exporters.",
        includes: [
          "Everything in State Licence",
          "Central licence application",
          "Import / export endorsement",
          "Multi-location handling",
          "Inspection support",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹3,499" },
      { label: "FSSAI Basic Registration fee", value: "₹100/year" },
      { label: "FSSAI State Licence fee", value: "₹2,000 – ₹5,000/year", note: "by capacity" },
      { label: "FSSAI Central Licence fee", value: "₹7,500/year" },
      { label: "Water / food testing report", value: "At actual", note: "where required" },
    ],
    typicalTotal: "≈ ₹3,600 all-in for a one-year Basic Registration",
    disclaimer: GST_NOTE,
  },

  "drug-license": {
    label: "Drug Licence Cost",
    startingAt: 5499,
    feeNote: "+ government fee at actual",
    tiers: [
      {
        name: "Advisory Pack",
        price: 5499,
        desc: "We prepare everything; you file it yourself.",
        includes: [
          "Eligibility and category advisory",
          "Document checklist and drafting",
          "Site layout plan review",
          "Key plan preparation",
          "Notarised affidavits",
        ],
      },
      {
        name: "Filing Pack",
        price: 8499,
        desc: "We prepare and file the application for you.",
        popular: true,
        includes: [
          "Everything in Advisory Pack",
          "Drug licence application filing",
          "Inspection file preparation",
          "Query response drafting",
        ],
      },
      {
        name: "End-to-End Pack",
        price: 25499,
        desc: "Filing plus departmental follow-up until grant.",
        includes: [
          "Everything in Filing Pack",
          "Departmental liaison and follow-up",
          "Inspection coordination",
          "Available in Delhi, Noida, Gurugram, Ghaziabad, Mumbai, Bengaluru and Hyderabad",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹5,499" },
      { label: "Govt. fee — retail or wholesale", value: "₹3,000" },
      { label: "Govt. fee — both licences", value: "₹6,000" },
      { label: "Competent person / pharmacist", value: "At actual" },
      { label: "Premises and cold storage compliance", value: "At actual" },
    ],
    typicalTotal: "≈ ₹8,500 all-in for a single retail licence",
    disclaimer: `Excludes out-of-pocket expenses. ${GST_NOTE}`,
  },

  "psara-license": {
    label: "PSARA Licence Cost",
    startingAt: 25500,
    feeNote: "+ government fee at actual",
    tiers: [
      {
        name: "PSARA Licence",
        price: 25500,
        desc: "End-to-end private security agency licensing.",
        includes: [
          "Eligibility and promoter vetting",
          "Training tie-up documentation",
          "Police verification coordination",
          "Form-I application filing",
          "Controlling authority liaison",
          "Licence grant follow-up",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹25,500" },
      { label: "Govt. fee — single district", value: "₹5,000" },
      { label: "Govt. fee — up to 5 districts", value: "₹10,000" },
      { label: "Govt. fee — entire state", value: "₹25,000" },
      { label: "Police verification charges", value: "At actual" },
      { label: "Security guard training", value: "At actual" },
    ],
    disclaimer: `Government fees vary by state. ${GST_NOTE}`,
  },

  "barcode-registration": {
    label: "Barcode Registration Cost",
    startingAt: 7499,
    feeNote: "+ GS1 India subscription fee at actual",
    tiers: [
      {
        name: "Barcode Registration",
        price: 7499,
        desc: "Get GS1-compliant barcodes for your products.",
        includes: [
          "GS1 India application preparation",
          "Company prefix allotment",
          "Document compilation and submission",
          "Barcode number generation",
          "Artwork-ready barcode images",
          "Follow-up until allotment",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹7,499" },
      { label: "GS1 subscription — up to 100 barcodes", value: "₹18,000", note: "approx., annual" },
      { label: "GS1 subscription — up to 1,000 barcodes", value: "₹30,000", note: "approx., annual" },
      { label: "MSME discount on GS1 fee", value: "Available", note: "with a valid Udyam certificate" },
    ],
    disclaimer: `GS1 India revises its subscription slabs periodically. ${GST_NOTE}`,
  },

  /* ─────────────── Intellectual Property ─────────────── */

  "trademark-registration": {
    label: "Trademark Registration Cost",
    startingAt: 2500,
    compareAt: 3000,
    unit: "per class",
    feeNote: "+ government fee of ₹4,500 or ₹9,000 per class",
    tiers: [
      {
        name: "Filing Only",
        price: 2500,
        compareAt: 3000,
        desc: "We search, classify and file your TM-A.",
        includes: [
          "Trademark basic search",
          "Dedicated trademark advisor",
          "NICE classification selection",
          "User affidavit drafting",
          "TM-A application filing",
        ],
      },
      {
        name: "Filing + Objection Reply",
        price: 7000,
        compareAt: 8500,
        desc: "Covers the examination report reply if one is raised.",
        popular: true,
        includes: [
          "Everything in Filing Only",
          "Priority trademark filing",
          "Status tracking",
          "Reply to examination report",
          "Attorney-assisted pack",
        ],
      },
      {
        name: "End-to-End",
        price: 15500,
        compareAt: 18500,
        desc: "All the way through hearing to registration.",
        includes: [
          "Everything in Filing + Objection Reply",
          "Compiling and filing of evidence",
          "Attending the show-cause hearing",
          "Attorney-assisted representation",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹2,500", note: "per class" },
      { label: "Govt. fee — individual / proprietor", value: "₹4,500", note: "per class" },
      { label: "Govt. fee — MSME / DPIIT startup", value: "₹4,500", note: "per class" },
      { label: "Govt. fee — company / LLP / partnership", value: "₹9,000", note: "per class" },
      { label: "Renewal — every 10 years", value: "₹9,000", note: "per class" },
    ],
    typicalTotal: "≈ ₹7,000 for an MSME filing in one class, ≈ ₹11,500 for a company",
    disclaimer: `A trademark protects one class of goods or services — multi-class filings multiply both fees. ${GST_NOTE}`,
  },

  /* ─────────────── Payroll & Accounting ─────────────── */

  "payroll-management": {
    label: "Payroll Management Cost",
    startingAt: 2000,
    feeNote: "base fee + ₹125 per employee per month",
    tiers: [
      {
        name: "Payroll",
        price: 2000,
        desc: "Payslips, TDS and Form 16 — ₹125 per employee per month.",
        includes: [
          "Monthly payroll processing",
          "Payslip generation and distribution",
          "TDS computation on salaries",
          "Quarterly TDS returns (24Q)",
          "Form 16 issuance",
        ],
      },
      {
        name: "Labour Law Returns",
        price: 2000,
        desc: "PF, ESIC and PT filings — ₹125 per employee per month.",
        includes: [
          "UAN and ESIC number allotment",
          "Monthly PF return filing",
          "Monthly ESIC return filing",
          "Professional tax returns",
          "Labour welfare fund returns",
        ],
      },
      {
        name: "Payroll + Labour Law",
        price: 2000,
        desc: "Both of the above — ₹200 per employee per month.",
        popular: true,
        includes: [
          "Everything in Payroll",
          "Everything in Labour Law Returns",
          "EPFO inspection file preparation",
          "Employee exit and full-and-final processing",
        ],
      },
    ],
    breakdown: [
      { label: "Our base fee", value: "₹2,000", note: "one-time setup" },
      { label: "Payroll — per employee", value: "₹125/month" },
      { label: "Labour law returns — per employee", value: "₹125/month" },
      { label: "Combined — per employee", value: "₹200/month" },
      { label: "PF & ESIC government fee", value: "NIL", note: "contributions are separate" },
    ],
    typicalTotal: "≈ ₹4,000/month for a 20-employee company on the combined plan",
    disclaimer: `Statutory PF and ESIC contributions are paid by the employer directly. ${GST_NOTE}`,
  },

  "accounting-bookkeeping": {
    label: "Accounting & Bookkeeping Cost",
    startingAt: 2999,
    unit: "/month",
    feeNote: "per month — scoped to your transaction volume",
    tiers: [
      {
        name: "GST Returns",
        price: 1250,
        desc: "Filings only, accounting not included.",
        includes: [
          "GSTR-1 / IFF filing",
          "GSTR-3B filing",
          "GST input tax credit analysis",
          "Dedicated tax filer",
        ],
      },
      {
        name: "Standard",
        price: 1750,
        desc: "GST plus TDS compliance.",
        includes: [
          "Everything in GST Returns",
          "TDS computation",
          "TDS payment assistance",
          "Quarterly TDS return filing",
        ],
      },
      {
        name: "Virtual CFO",
        price: 2999,
        desc: "Full books plus monthly management reporting.",
        popular: true,
        includes: [
          "Everything in Standard",
          "Bookkeeping",
          "Bank reconciliation",
          "Trial balance",
          "Monthly ledger reports and MIS",
          "Monthly P&L and balance sheet",
        ],
      },
    ],
    breakdown: [
      { label: "Our professional fee", value: "₹2,999", note: "per month, Virtual CFO" },
      { label: "Filings-only plan", value: "₹1,250/month" },
      { label: "Transaction volume beyond scope", value: "On quote" },
      { label: "Government fee", value: "NIL" },
      { label: "Year-end financial statements", value: "On quote" },
    ],
    typicalTotal: "≈ ₹36,000 a year on the Virtual CFO plan",
    disclaimer: `Excludes tax payment, interest and penalty. ${GST_NOTE}`,
  },
};

/* ══════════════════════════════════════════════════════
   Calculator catalogue + per-service mapping
   ══════════════════════════════════════════════════════ */

export type CalcTool = {
  title: string;
  desc: string;
  href: string;
  /** Button label — phrased for the service it sits on */
  cta: string;
  /** lucide-react icon name, resolved by the component */
  icon: "Building2" | "Scale" | "Lightbulb" | "ClipboardCheck" | "Calculator"
      | "IndianRupee" | "FileText" | "Wallet" | "Receipt" | "Search" | "PiggyBank" | "Percent";
  tone: "navy" | "blue" | "green" | "amber" | "purple" | "rose" | "teal";
};

export const CALC_TOOLS: Record<string, CalcTool> = {
  "company-registration-cost": {
    title: "Registration Cost Calculator",
    desc: "State-wise government fee, stamp duty and DSC for Pvt Ltd, LLP and OPC.",
    href: "/calculators/company-registration-cost",
    cta: "Check your price",
    icon: "Building2",
    tone: "navy",
  },
  "llp-vs-pvt-ltd": {
    title: "LLP vs Pvt Ltd",
    desc: "Compare setup cost, annual compliance and tax side by side.",
    href: "/calculators/llp-vs-pvt-ltd",
    cta: "Compare both",
    icon: "Scale",
    tone: "blue",
  },
  "business-structure-advisor": {
    title: "Business Structure Advisor",
    desc: "Six questions to find the right entity for your business.",
    href: "/calculators/business-structure-advisor",
    cta: "Find my structure",
    icon: "Lightbulb",
    tone: "amber",
  },
  "compliance-cost-calculator": {
    title: "Annual Compliance Cost",
    desc: "Itemised estimate of what you will pay in filings every year.",
    href: "/calculators/compliance-cost-calculator",
    cta: "Estimate annual cost",
    icon: "ClipboardCheck",
    tone: "rose",
  },
  "business-setup-calculator": {
    title: "Business Setup Calculator",
    desc: "Total first-year cost of getting your business off the ground.",
    href: "/calculators/business-setup-calculator",
    cta: "Estimate setup cost",
    icon: "Calculator",
    tone: "teal",
  },
  "gst-calculator": {
    title: "GST Calculator",
    desc: "Add or remove GST and see the CGST / SGST split instantly.",
    href: "/calculators/gst-calculator",
    cta: "Calculate GST",
    icon: "Percent",
    tone: "blue",
  },
  "income-tax-calculator": {
    title: "Income Tax Calculator",
    desc: "Old vs new regime compared for FY 2025–26.",
    href: "/calculators/income-tax-calculator",
    cta: "Calculate my tax",
    icon: "IndianRupee",
    tone: "green",
  },
  "tds-calculator": {
    title: "TDS Calculator",
    desc: "Work out TDS payable on any payment type.",
    href: "/calculators/tds-calculator",
    cta: "Calculate TDS",
    icon: "Receipt",
    tone: "purple",
  },
  "tds-rate-finder": {
    title: "TDS Rate Finder",
    desc: "Look up the section, rate and threshold for any payment.",
    href: "/calculators/tds-rate-finder",
    cta: "Find the rate",
    icon: "Search",
    tone: "purple",
  },
  "salary-calculator": {
    title: "Salary Calculator",
    desc: "CTC to in-hand, with PF, ESI and TDS broken out.",
    href: "/calculators/salary-calculator",
    cta: "Break down a salary",
    icon: "Wallet",
    tone: "green",
  },
  "hra-calculator": {
    title: "HRA Exemption Calculator",
    desc: "How much of your house rent allowance is tax-free.",
    href: "/calculators/hra-calculator",
    cta: "Calculate HRA",
    icon: "IndianRupee",
    tone: "teal",
  },
  "gratuity-calculator": {
    title: "Gratuity Calculator",
    desc: "Statutory gratuity payable on an employee's exit.",
    href: "/calculators/gratuity-calculator",
    cta: "Calculate gratuity",
    icon: "PiggyBank",
    tone: "amber",
  },
  "epf-calculator": {
    title: "EPF Calculator",
    desc: "Project the provident fund corpus at retirement.",
    href: "/calculators/epf-calculator",
    cta: "Project EPF",
    icon: "PiggyBank",
    tone: "green",
  },
  "trademark-class-finder": {
    title: "Trademark Class Finder",
    desc: "Identify the right NICE class before you file.",
    href: "/verify/trademark-class-finder",
    cta: "Find my class",
    icon: "Search",
    tone: "purple",
  },
  "company-name-search": {
    title: "Company Name Search",
    desc: "Check whether your proposed name is already taken at the MCA.",
    href: "/verify/company-name-search",
    cta: "Check a name",
    icon: "Search",
    tone: "navy",
  },
};

const FORMATION_CALCS = [
  "company-registration-cost",
  "business-structure-advisor",
  "compliance-cost-calculator",
  "company-name-search",
];

const LICENCE_CALCS = ["business-setup-calculator", "compliance-cost-calculator", "gst-calculator"];
const ROC_CALCS = ["compliance-cost-calculator", "company-registration-cost", "business-setup-calculator"];

export const SERVICE_CALCULATORS: Record<string, string[]> = {
  /* Company Formation */
  "private-limited-company": ["company-registration-cost", "llp-vs-pvt-ltd", "compliance-cost-calculator", "company-name-search"],
  "llp-registration": ["company-registration-cost", "llp-vs-pvt-ltd", "compliance-cost-calculator", "business-structure-advisor"],
  "one-person-company": ["company-registration-cost", "business-structure-advisor", "compliance-cost-calculator", "llp-vs-pvt-ltd"],
  "partnership-firm": ["business-setup-calculator", "business-structure-advisor", "company-registration-cost", "compliance-cost-calculator"],
  "sole-proprietorship": ["business-setup-calculator", "business-structure-advisor", "gst-calculator", "income-tax-calculator"],
  "section-8-company": FORMATION_CALCS,
  "nidhi-company": FORMATION_CALCS,
  "producer-company": FORMATION_CALCS,
  "public-limited-company": FORMATION_CALCS,
  "nbfc-registration": FORMATION_CALCS,
  "chit-fund-company": FORMATION_CALCS,
  "microfinance-company": FORMATION_CALCS,
  "indian-subsidiary": ["company-registration-cost", "compliance-cost-calculator", "business-setup-calculator", "company-name-search"],
  "branch-office": ["business-setup-calculator", "compliance-cost-calculator", "company-registration-cost"],

  /* Tax & GST */
  "gst-registration": ["gst-calculator", "business-setup-calculator", "compliance-cost-calculator"],
  "gst-filing": ["gst-calculator", "compliance-cost-calculator", "tds-calculator"],
  "gst-amendment": ["gst-calculator", "compliance-cost-calculator"],
  "gst-lut-filing": ["gst-calculator", "compliance-cost-calculator"],
  "income-tax-return": ["income-tax-calculator", "hra-calculator", "salary-calculator", "tds-calculator"],
  "tds-return": ["tds-calculator", "tds-rate-finder", "salary-calculator"],
  "advance-tax": ["income-tax-calculator", "tds-calculator", "compliance-cost-calculator"],
  "tax-audit": ["income-tax-calculator", "compliance-cost-calculator"],
  "transfer-pricing": ["compliance-cost-calculator", "income-tax-calculator"],
  "12a-80g-registration": ["compliance-cost-calculator", "income-tax-calculator"],
  "shops-establishment": ["business-setup-calculator", "compliance-cost-calculator"],
  "labour-law-compliance": ["salary-calculator", "compliance-cost-calculator", "epf-calculator"],
  "posh-compliance": ["compliance-cost-calculator"],
  "factories-act": ["compliance-cost-calculator", "business-setup-calculator"],

  /* MCA / ROC */
  "roc-compliance": ROC_CALCS,
  "llp-annual-filing": ["compliance-cost-calculator", "llp-vs-pvt-ltd", "company-registration-cost"],
  "director-kyc": ["compliance-cost-calculator"],
  "change-in-directors": ["compliance-cost-calculator"],
  "increase-authorised-capital": ["company-registration-cost", "compliance-cost-calculator"],
  "registered-office-change": ["compliance-cost-calculator"],
  "company-name-change": ["company-name-search", "compliance-cost-calculator"],
  "company-closure": ["compliance-cost-calculator", "company-registration-cost"],
  "post-incorporation-compliance": ROC_CALCS,
  "xbrl-filing": ["compliance-cost-calculator"],
  "agm-services": ["compliance-cost-calculator"],
  "share-transfer": ["compliance-cost-calculator"],
  "proprietorship-to-pvtltd": ["llp-vs-pvt-ltd", "business-structure-advisor", "company-registration-cost"],
  "partnership-to-llp": ["llp-vs-pvt-ltd", "business-structure-advisor", "company-registration-cost"],
  "llp-to-company": ["llp-vs-pvt-ltd", "business-structure-advisor", "company-registration-cost"],

  /* Startup, MSME & Licences */
  "startup-india": ["business-structure-advisor", "company-registration-cost", "compliance-cost-calculator"],
  "msme-registration": ["business-setup-calculator", "business-structure-advisor", "compliance-cost-calculator"],
  "iec-registration": LICENCE_CALCS,
  "fssai-license": LICENCE_CALCS,
  "professional-tax": ["salary-calculator", "compliance-cost-calculator"],
  "trade-license": LICENCE_CALCS,
  "drug-license": LICENCE_CALCS,
  "psara-license": LICENCE_CALCS,
  "lmpc-registration": LICENCE_CALCS,
  "ayush-license": LICENCE_CALCS,
  "iso-certification": LICENCE_CALCS,
  "bis-registration": LICENCE_CALCS,
  "environment-clearance": LICENCE_CALCS,
  "dot-telecom-license": LICENCE_CALCS,
  "apeda-registration": LICENCE_CALCS,
  "barcode-registration": LICENCE_CALCS,
  "epr-registration": LICENCE_CALCS,

  /* Intellectual Property */
  "trademark-registration": ["trademark-class-finder", "company-name-search", "business-setup-calculator"],
  "trademark-objection": ["trademark-class-finder", "company-name-search"],
  "trademark-renewal": ["trademark-class-finder", "compliance-cost-calculator"],
  "trademark-watch": ["trademark-class-finder", "company-name-search"],
  "trademark-assignment": ["trademark-class-finder"],
  "international-trademark": ["trademark-class-finder", "business-setup-calculator"],
  "copyright-registration": ["business-setup-calculator"],
  "patent-registration": ["business-setup-calculator"],
  "patent-search": ["business-setup-calculator"],
  "design-registration": ["business-setup-calculator"],
  "gi-tag-registration": ["business-setup-calculator"],

  /* Payroll & HR */
  "pf-registration": ["epf-calculator", "salary-calculator", "compliance-cost-calculator"],
  "esic-registration": ["salary-calculator", "compliance-cost-calculator"],
  "payroll-management": ["salary-calculator", "hra-calculator", "epf-calculator", "gratuity-calculator"],
  "gratuity-trust": ["gratuity-calculator", "salary-calculator"],

  /* Accounting & Finance */
  "accounting-bookkeeping": ["compliance-cost-calculator", "gst-calculator", "income-tax-calculator"],
  "virtual-cfo": ["compliance-cost-calculator", "business-setup-calculator", "gst-calculator"],
  "business-valuation": ["business-setup-calculator", "compliance-cost-calculator"],
  "financial-statements": ["compliance-cost-calculator", "income-tax-calculator"],
};

/* ── accessors ── */

export function getServicePricing(serviceId: string): ServicePricing | null {
  return SERVICE_PRICING[serviceId] ?? null;
}

export function getServiceCalculators(serviceId: string): CalcTool[] {
  return (SERVICE_CALCULATORS[serviceId] ?? [])
    .map((key) => CALC_TOOLS[key])
    .filter(Boolean);
}

export function hasPricing(serviceId: string): boolean {
  return serviceId in SERVICE_PRICING;
}

/** "₹2,999" */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Offer nodes for Product/Service JSON-LD. */
export function pricingOffers(serviceId: string) {
  const p = SERVICE_PRICING[serviceId];
  if (!p) return null;
  return p.tiers.map((t) => ({
    "@type": "Offer",
    name: t.name,
    price: String(t.price),
    priceCurrency: "INR",
    ...(t.desc ? { description: t.desc } : {}),
    availability: "https://schema.org/InStock",
  }));
}
