/**
 * Service pricing + calculator mapping.
 *
 * PLAIN MODULE — no "use client". Server components import this directly; client
 * components must receive the resolved values as props (see
 * project-startup-schemes-build client-bundle rule).
 *
 * Benchmarked against setindiabiz.com published professional fees (scraped
 * 2026-08-11). Our professional fee = their entry-level plan + ₹500, and the
 * strike-through "compare at" gets the same +₹500 so the discount delta matches.
 * ONE price per service — no packages or tiers. Government fees are never marked
 * up; they are pass-through, shown "at actual".
 */
import { PRO_FEES, inr } from "@/lib/calc-fees";

export type FeeRow = {
  label: string;
  /** Pre-formatted value: "₹1,000", "At actual", "NIL" */
  value: string;
  note?: string;
};

export type ServicePricing = {
  /** Heading shown above the band */
  label: string;
  /** Our professional fee in ₹ — one price, no packages */
  price: number;
  /** Strike-through price in ₹ */
  compareAt?: number;
  /** Suffix after the amount, e.g. "/month", "per class" */
  unit?: string;
  /** Short line under the price, e.g. "+ government fees at actual" */
  feeNote: string;
  /** Exactly what this fee covers */
  includes: string[];
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
    price: PRO_FEES["private-limited-company"],
    compareAt: 5499,
    feeNote: "+ government fees & DSC at actual",
    includes: [
      "Digital Signature (DSC) processing for 2 directors",
      "Director Identification Number (DIN)",
      "Company name search & RUN approval",
      "MoA & AoA drafting",
      "Complete SPICe+ filing with MCA",
      "Certificate of Incorporation with CIN",
      "Company PAN & TAN",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["private-limited-company"]) },
      { label: "Name approval (SPICe+ Part A)", value: "₹1,000" },
      { label: "DSC — 2 directors", value: "₹3,000", note: "vendor fee, ₹1,500 each" },
      { label: "MCA incorporation fee", value: "NIL", note: "authorised capital up to ₹15 lakh" },
      { label: "Stamp duty (MoA/AoA)", value: "At actual", note: "varies by state" },
      { label: "PAN & TAN", value: "₹131" },
    ],
    typicalTotal: "≈ ₹8,020 all-in (incl. GST) — 2 directors, ₹1 lakh capital, Delhi",
    disclaimer: GST_NOTE,
  },

  "llp-registration": {
    label: "LLP Registration Cost",
    price: PRO_FEES["llp-registration"],
    compareAt: 6999,
    feeNote: "+ government fees & DSC at actual",
    includes: [
      "Director Identification Number (DIN) for 2 partners",
      "Name search & RUN-LLP approval",
      "FiLLiP incorporation filing",
      "Certificate of Incorporation",
      "LLP PAN & TAN",
      "LLP Agreement drafting",
      "Form 3 filing with ROC",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["llp-registration"]) },
      { label: "DSC — 2 partners", value: "₹3,000", note: "vendor fee, ₹1,500 each" },
      { label: "Name approval (RUN-LLP)", value: "₹200" },
      { label: "FiLLiP incorporation fee", value: "₹500 – ₹5,000", note: "by capital contribution slab" },
      { label: "Form 3 filing fee", value: "₹50 – ₹200", note: "by capital contribution slab" },
      { label: "LLP Agreement stamp duty", value: "At actual", note: "varies by state, ~1% of contribution" },
      { label: "PAN & TAN", value: "₹131" },
    ],
    typicalTotal: "≈ ₹8,420 all-in (incl. GST) — 2 partners, ₹1 lakh contribution, Delhi",
    disclaimer: `Government fee shown is the combined FiLLiP + PAN + TAN + Form 3 cost. LLP Agreement stamp duty varies by state. ${GST_NOTE}`,
  },

  "one-person-company": {
    label: "One Person Company (OPC) Registration Cost",
    price: PRO_FEES["one-person-company"],
    compareAt: 5499,
    feeNote: "+ government fees & DSC at actual",
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
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["one-person-company"]) },
      { label: "Name approval (SPICe+ Part A)", value: "₹1,000" },
      { label: "DSC — 1 director", value: "₹1,500", note: "vendor fee" },
      { label: "MCA incorporation fee", value: "NIL", note: "authorised capital up to ₹15 lakh" },
      { label: "Stamp duty (MoA/AoA)", value: "At actual", note: "varies by state" },
      { label: "PAN & TAN", value: "₹131" },
    ],
    typicalTotal: "≈ ₹6,520 all-in (incl. GST) — ₹1 lakh capital, Delhi",
    disclaimer: GST_NOTE,
  },

  "partnership-firm": {
    label: "Partnership Firm Registration Cost",
    price: PRO_FEES["partnership-firm"],
    compareAt: 7999,
    feeNote: "+ government fees & stamp duty at actual",
    includes: [
      "Expert consultation on deed terms",
      "Partnership deed drafting",
      "PAN card for the firm",
      "TAN allotment",
      "Brand name availability search",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["partnership-firm"]) },
      { label: "Deed stamp paper", value: "At actual", note: "state-specific, typically ₹500 – ₹5,000" },
      { label: "Notarisation", value: "At actual" },
      { label: "Firm PAN & TAN", value: "₹131" },
      { label: "Registrar of Firms fee", value: "At actual", note: "optional but recommended" },
      { label: "Trademark filing (optional add-on)", value: "₹4,500", note: "government fee, per class" },
    ],
    typicalTotal: "≈ ₹8,320 all-in (incl. GST) — 2 partners, Delhi",
    disclaimer: GST_NOTE,
  },

  "sole-proprietorship": {
    label: "Sole Proprietorship Registration Cost",
    price: PRO_FEES["sole-proprietorship"],
    feeNote: "+ government fees at actual",
    includes: [
      "30-minute strategy call with a process expert",
      "GST registration under Rule 14A",
      "MSME (Udyam) registration",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["sole-proprietorship"]) },
      { label: "GST registration govt. fee", value: "NIL" },
      { label: "MSME (Udyam) govt. fee", value: "NIL" },
      { label: "Shops & Establishment fee", value: "At actual", note: "state-specific" },
      { label: "Affidavit stamp paper", value: "₹100", note: "if adopting a brand name" },
    ],
    typicalTotal: "≈ ₹3,540 all-in (incl. GST) — there is no government fee to pay",
    disclaimer: GST_NOTE,
  },

  "section-8-company": {
    label: "Section 8 Company (NGO) Registration Cost",
    price: PRO_FEES["section-8-company"],
    compareAt: 10499,
    feeNote: "+ ROC fee, stamp duty & DSC at actual",
    includes: [
      "Digital Signature (DSC) service",
      "Director Identification Number (DIN)",
      "Name search & approval",
      "MoA & AoA drafting",
      "Complete SPICe+ filing",
      "Certificate of Incorporation with CIN",
      "Company PAN & TAN",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["section-8-company"]) },
      { label: "Name approval", value: "₹1,000" },
      { label: "DSC — 2 directors", value: "₹3,000", note: "vendor fee" },
      { label: "MCA / ROC fee", value: "₹2,000", note: "approx., licence under Section 8" },
      { label: "Stamp duty", value: "At actual", note: "varies by state" },
      { label: "12A & 80G govt. fee", value: "NIL" },
    ],
    typicalTotal: "≈ ₹15,920 all-in (incl. GST) — 2 directors, Delhi",
    disclaimer: GST_NOTE,
  },

  "indian-subsidiary": {
    label: "Indian Subsidiary Registration Cost",
    price: PRO_FEES["indian-subsidiary"],
    feeNote: "+ government fees, stamp duty & taxes at actual",
    includes: [
      "Digital Signature for two persons",
      "DIN for two directors",
      "Name search & approval",
      "MoA & AoA drafting",
      "SPICe+ filing with MCA",
      "Certificate of Incorporation",
      "e-PAN & e-TAN",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["indian-subsidiary"]) },
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
    price: PRO_FEES["nbfc-registration"],
    feeNote: "consultation & advisory fee — full quote after scoping",
    includes: [
      "Eligibility and category assessment",
      "Net Owned Fund (NOF) planning",
      "Documentation checklist",
      "Application route recommendation",
    ],
    breakdown: [
      { label: "Our advisory fee", value: inr(PRO_FEES["nbfc-registration"]) },
      { label: "Minimum Net Owned Fund", value: "₹2 crore", note: "RBI requirement, not a fee" },
      { label: "RBI application fee", value: "At actual" },
      { label: "Company incorporation", value: "₹2,999+", note: "if not already incorporated" },
      { label: "End-to-end licence support", value: "On quote" },
    ],
    disclaimer: `NBFC licensing is scoped per case. ${GST_NOTE}`,
  },

  "microfinance-company": {
    label: "Microfinance Company Registration Cost",
    price: PRO_FEES["microfinance-company"],
    feeNote: "consultation & advisory fee — full quote after scoping",
    includes: [
      "Structure recommendation (Section 8 or NBFC-MFI)",
      "Capital requirement planning",
      "Documentation checklist",
      "Regulatory roadmap",
    ],
    breakdown: [
      { label: "Our advisory fee", value: inr(PRO_FEES["microfinance-company"]) },
      { label: "Section 8 route incorporation", value: "₹7,999+" },
      { label: "NBFC-MFI minimum Net Owned Fund", value: "₹5 crore", note: "RBI requirement" },
      { label: "End-to-end licence support", value: "On quote" },
    ],
    disclaimer: `Scoped per case. ${GST_NOTE}`,
  },

  /* ─────────────── Tax & GST ─────────────── */

  "gst-registration": {
    label: "GST Registration Cost",
    price: PRO_FEES["gst-registration"],
    feeNote: "government fee for GST registration is NIL",
    includes: [
      "Eligibility & category verification",
      "GST REG-01 preparation",
      "Portal application filing",
      "ARN generation and tracking",
      "Query / clarification support",
      "GSTIN & REG-06 certificate",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["gst-registration"]) },
      { label: "GST department fee", value: "NIL" },
      { label: "Digital signature (companies/LLPs)", value: "₹1,500", note: "not needed for proprietors — Aadhaar OTP" },
      { label: "Non-Rule-14A applications", value: "₹4,000", note: "standard route with departmental liaison" },
      { label: "Site visit / physical verification support", value: "At actual" },
    ],
    typicalTotal: "≈ ₹1,180 for a proprietor, ≈ ₹2,680 for a company (incl. GST and DSC)",
    disclaimer: GST_NOTE,
  },

  "gst-filing": {
    label: "GST Return Filing Cost",
    price: PRO_FEES["gst-filing"],
    unit: "/month",
    feeNote: "per month — no government fee for filing on time",
    includes: [
      "GSTR-1 / IFF filing",
      "GSTR-3B filing",
      "GST input tax credit analysis",
      "Dedicated tax professional",
      "Accounting not included",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["gst-filing"]), note: "per month" },
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
    price: PRO_FEES["gst-amendment"],
    feeNote: "government fee for amendment is NIL",
    includes: [
      "Review of the change and its category",
      "Core / non-core field determination",
      "Form GST REG-14 preparation",
      "Portal filing and ARN tracking",
      "Response to departmental queries",
      "Amended registration certificate",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["gst-amendment"]) },
      { label: "GST department fee", value: "NIL" },
      { label: "Non-core amendments", value: "Auto-approved", note: "no officer approval needed" },
      { label: "Core amendments", value: "15 working days", note: "officer approval required" },
    ],
    disclaimer: GST_NOTE,
  },

  "income-tax-return": {
    label: "Income Tax Return Filing Cost",
    price: PRO_FEES["income-tax-return"],
    feeNote: "for a salaried return — no government fee for filing",
    includes: [
      "ITR-1 preparation and filing",
      "Old vs new regime comparison",
      "Form 26AS / AIS reconciliation",
      "e-verification support",
    ],
    breakdown: [
      { label: "Our professional fee — salaried", value: inr(PRO_FEES["income-tax-return"]) },
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
    price: PRO_FEES["llp-annual-filing"],
    unit: "per form",
    feeNote: "Form 11 from ₹2,499 · ITR ₹2,999 · Form 8 ₹3,499 — + ROC fee at actual",
    includes: [
      "Expert consultation",
      "Form 11 preparation",
      "Filing with the ROC",
      "Complete online process",
    ],
    breakdown: [
      { label: "Our fee — Form 11 (annual return)", value: inr(PRO_FEES["llp-annual-filing"]) },
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
    price: PRO_FEES["company-closure"],
    feeNote: "+ ROC fee at actual",
    includes: [
      "Eligibility review",
      "Board resolution drafting",
      "Affidavits and indemnity bonds",
      "Statement of accounts preparation",
      "MSC-1 / STK-2 filing with the ROC",
      "Follow-up until approval",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["company-closure"]) },
      { label: "ROC fee — capital of ₹1 lakh", value: "₹1,300" },
      { label: "STK-2 strike-off fee", value: "₹10,000", note: "if striking off rather than dormant" },
      { label: "Digital signature", value: "₹1,500", note: "if expired" },
      { label: "Pending annual filings", value: "At actual", note: "must be cleared first" },
    ],
    typicalTotal: "≈ ₹10,740 all-in (incl. GST) for dormant status on a ₹1 lakh capital company",
    disclaimer: GST_NOTE,
  },

  "agm-services": {
    label: "AGM Compliance Cost",
    price: PRO_FEES["agm-services"],
    feeNote: "+ ROC filing fee at actual",
    includes: [
      "AGM notice drafting and dispatch",
      "Director's Report preparation",
      "Minutes of the meeting",
      "Board and shareholder resolutions",
      "Statutory register updates",
      "Filing support for MGT-7 and AOC-4",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["agm-services"]) },
      { label: "ROC filing fee", value: "₹200 – ₹600", note: "by authorised capital" },
      { label: "Penalty — AGM not held (s.99)", value: "Up to ₹1,00,000", note: "plus ₹5,000/day continuing" },
      { label: "Late filing fee", value: "₹100/day", note: "per form" },
    ],
    disclaimer: `Complex or contested AGMs are quoted separately, up to ₹25,000. ${GST_NOTE}`,
  },

  /* ─────────────── Startup, MSME & Licences ─────────────── */

  "fssai-license": {
    label: "FSSAI Licence Cost",
    price: PRO_FEES["fssai-license"],
    feeNote: "+ FSSAI government fee at actual",
    includes: [
      "Eligibility assessment",
      "Online application filing",
      "Document preparation and upload",
      "Application status tracking",
      "Registration certificate",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["fssai-license"]) },
      { label: "FSSAI Basic Registration fee", value: "₹100/year" },
      { label: "FSSAI State Licence fee", value: "₹2,000 – ₹5,000/year", note: "by capacity" },
      { label: "FSSAI Central Licence fee", value: "₹7,500/year" },
      { label: "Water / food testing report", value: "At actual", note: "where required" },
    ],
    typicalTotal: "≈ ₹4,230 all-in (incl. GST) for a one-year Basic Registration",
    disclaimer: GST_NOTE,
  },

  "drug-license": {
    label: "Drug Licence Cost",
    price: PRO_FEES["drug-license"],
    feeNote: "+ government fee at actual",
    includes: [
      "Eligibility and category advisory",
      "Document checklist and drafting",
      "Site layout plan review",
      "Key plan preparation",
      "Notarised affidavits",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["drug-license"]) },
      { label: "Govt. fee — retail or wholesale", value: "₹3,000" },
      { label: "Govt. fee — both licences", value: "₹6,000" },
      { label: "Competent person / pharmacist", value: "At actual" },
      { label: "Premises and cold storage compliance", value: "At actual" },
    ],
    typicalTotal: "≈ ₹9,490 all-in (incl. GST) for a single retail licence",
    disclaimer: `Excludes out-of-pocket expenses. ${GST_NOTE}`,
  },

  "psara-license": {
    label: "PSARA Licence Cost",
    price: PRO_FEES["psara-license"],
    feeNote: "+ government fee at actual",
    includes: [
      "Eligibility and promoter vetting",
      "Training tie-up documentation",
      "Police verification coordination",
      "Form-I application filing",
      "Controlling authority liaison",
      "Licence grant follow-up",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["psara-license"]) },
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
    price: PRO_FEES["barcode-registration"],
    feeNote: "+ GS1 India subscription fee at actual",
    includes: [
      "GS1 India application preparation",
      "Company prefix allotment",
      "Document compilation and submission",
      "Barcode number generation",
      "Artwork-ready barcode images",
      "Follow-up until allotment",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["barcode-registration"]) },
      { label: "GS1 subscription — up to 100 barcodes", value: "₹18,000", note: "approx., annual" },
      { label: "GS1 subscription — up to 1,000 barcodes", value: "₹30,000", note: "approx., annual" },
      { label: "MSME discount on GS1 fee", value: "Available", note: "with a valid Udyam certificate" },
    ],
    disclaimer: `GS1 India revises its subscription slabs periodically. ${GST_NOTE}`,
  },

  /* ─────────────── Intellectual Property ─────────────── */

  "trademark-registration": {
    label: "Trademark Registration Cost",
    price: PRO_FEES["trademark-registration"],
    compareAt: 3000,
    unit: "per class",
    feeNote: "+ government fee of ₹4,500 or ₹9,000 per class",
    includes: [
      "Trademark basic search",
      "Dedicated trademark advisor",
      "NICE classification selection",
      "User affidavit drafting",
      "TM-A application filing",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["trademark-registration"]), note: "per class" },
      { label: "Govt. fee — individual / proprietor", value: "₹4,500", note: "per class" },
      { label: "Govt. fee — MSME / DPIIT startup", value: "₹4,500", note: "per class" },
      { label: "Govt. fee — company / LLP / partnership", value: "₹9,000", note: "per class" },
      { label: "Renewal — every 10 years", value: "₹9,000", note: "per class" },
    ],
    typicalTotal: "≈ ₹7,450 for an MSME in one class, ≈ ₹11,950 for a company (incl. GST)",
    disclaimer: `A trademark protects one class of goods or services — multi-class filings multiply both fees. ${GST_NOTE}`,
  },

  /* ─────────────── Payroll & Accounting ─────────────── */

  "payroll-management": {
    label: "Payroll Management Cost",
    price: PRO_FEES["payroll-management"],
    feeNote: "one-time setup + ₹125 per employee per month",
    includes: [
      "Monthly payroll processing",
      "Payslip generation and distribution",
      "TDS computation on salaries",
      "Quarterly TDS returns (24Q)",
      "Form 16 issuance",
    ],
    breakdown: [
      { label: "Our base fee", value: inr(PRO_FEES["payroll-management"]), note: "one-time setup" },
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
    // Their entry plan is filings-only and states "accounting not included" — the
    // cheapest plan that actually does bookkeeping is the one quoted here.
    price: PRO_FEES["accounting-bookkeeping"],
    unit: "/month",
    feeNote: "per month — scoped to your transaction volume",
    includes: [
      "Bookkeeping and ledger maintenance",
      "Bank reconciliation",
      "Trial balance preparation",
      "Monthly ledger reports and MIS",
      "Monthly P&L and balance sheet",
      "GSTR-1, GSTR-3B and TDS filings",
      "Dedicated accountant",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["accounting-bookkeeping"]), note: "per month" },
      { label: "GST & TDS filings only", value: "₹1,250/month", note: "no bookkeeping" },
      { label: "Transaction volume beyond scope", value: "On quote" },
      { label: "Government fee", value: "NIL" },
      { label: "Year-end financial statements", value: "On quote" },
    ],
    typicalTotal: "≈ ₹36,000 a year with full books and monthly reporting",
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
  "trademark-cost-calculator": {
    title: "Trademark Cost Calculator",
    desc: "Government fee per class, MSME and startup concessions, and our filing fee.",
    href: "/calculators/trademark-cost-calculator",
    cta: "Price my trademark",
    icon: "Percent",
    tone: "purple",
  },
  "gst-registration-cost-calculator": {
    title: "GST Registration Cost",
    desc: "Whether GST is mandatory for you, and what the GSTIN will cost.",
    href: "/calculators/gst-registration-cost-calculator",
    cta: "Check my cost",
    icon: "Receipt",
    tone: "blue",
  },
  "fssai-license-cost-calculator": {
    title: "FSSAI Licence Cost",
    desc: "The right FSSAI category for your turnover, priced per year.",
    href: "/calculators/fssai-license-cost-calculator",
    cta: "Price my licence",
    icon: "ClipboardCheck",
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
  "sole-proprietorship": ["business-setup-calculator", "business-structure-advisor", "gst-registration-cost-calculator", "income-tax-calculator"],
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
  "gst-registration": ["gst-registration-cost-calculator", "gst-calculator", "business-setup-calculator", "compliance-cost-calculator"],
  "gst-filing": ["gst-calculator", "gst-registration-cost-calculator", "compliance-cost-calculator", "tds-calculator"],
  "gst-amendment": ["gst-registration-cost-calculator", "gst-calculator", "compliance-cost-calculator"],
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
  "fssai-license": ["fssai-license-cost-calculator", "business-setup-calculator", "compliance-cost-calculator"],
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
  "trademark-registration": ["trademark-cost-calculator", "trademark-class-finder", "company-name-search", "business-setup-calculator"],
  "trademark-objection": ["trademark-cost-calculator", "trademark-class-finder", "company-name-search"],
  "trademark-renewal": ["trademark-cost-calculator", "trademark-class-finder", "compliance-cost-calculator"],
  "trademark-watch": ["trademark-class-finder", "company-name-search"],
  "trademark-assignment": ["trademark-cost-calculator", "trademark-class-finder"],
  "international-trademark": ["trademark-cost-calculator", "trademark-class-finder", "business-setup-calculator"],
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

/** The one calculator worth putting a button next to the page title. */
export function getPrimaryCalculator(serviceId: string): CalcTool | null {
  return getServiceCalculators(serviceId)[0] ?? null;
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
  return {
    "@type": "Offer",
    name: p.label,
    price: String(p.price),
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
  };
}
