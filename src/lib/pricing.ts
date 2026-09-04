/**
 * Service pricing + calculator mapping.
 *
 * PLAIN MODULE — no "use client". Server components import this directly; client
 * components must receive the resolved values as props (see
 * project-startup-schemes-build client-bundle rule).
 *
 * ONE price per service — no packages or tiers.
 *
 * Prices come from three client workbooks (27 Aug 2026) via lib/calc-fees.ts:
 *   CAA_Incorporation_Cost_Calculator_v2 (2).xlsx  — incorporation fee card, MCA
 *     scale, State stamp duty, add-ons, the standalone fee schedule, Section 8
 *     services and the two-stage Startup India engagement
 *   CAA_LLP_Cost_Calculator_v2.xlsx                — LLP fee bands, DPIN,
 *     franking and State-wise LLP agreement stamp duty
 *   Company_Closure_Exit (1).xlsx                  — the closure and exit card
 * Those files are the authority. Where the closure workbook and the incorporation
 * workbook's "Other Services Standalone" sheet disagree, the closure workbook wins.
 *
 * Anything not covered by a workbook keeps its previous benchmark (setindiabiz
 * entry-level plan + ₹500, scraped 2026-08-11). Government fees are never marked
 * up; they are pass-through, shown "at actual".
 */
import {
  PRO_FEES, inr, INCORP_FEE_CARD, CLOSURE_HEADLINE,
  SECTION8_SERVICES, STARTUP_INDIA, ADDON_SERVICES, STANDALONE_FEES,
  closureAllIn, ccfsStatus, STK2_BUNDLE, STK_NOTARISATION_PER_DIRECTOR, NCLT_LIQUIDATION,
} from "@/lib/calc-fees";

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

/** Our incorporation fee moves with authorised capital — this is the card. */
const FEE_CARD_NOTE = `Our fee follows authorised capital: ${INCORP_FEE_CARD
  .map((r) => `up to ${inr(r.upTo)} → ${inr(r.withName)}`)
  .join(", ")}. Above ${inr(INCORP_FEE_CARD[INCORP_FEE_CARD.length - 1].upTo)} we quote separately.`;

/** Companies: MCA fees and stamp duty are pure-agent recoveries — no GST on them. */
const PURE_AGENT_NOTE =
  "GST @18% applies to the Digital Signatures and our professional fee only. MCA fees and stamp duty are recovered at actuals as a pure agent under Rule 33 of the CGST Rules, 2017.";

/**
 * Closure pricing, built fresh on every read.
 *
 * This is the one service entry that moves on its own: the MCA fee on Form STK-2
 * and the all-in total both flip the day CCFS-2026 expires. Building it per call
 * — rather than freezing it into SERVICE_PRICING at module load — means a
 * long-running server picks the change up on the day instead of at the next
 * deploy. Every figure here comes from lib/calc-fees; nothing is typed twice.
 *
 * What the ₹20,000 covers is STK2_BUNDLE, quoted verbatim so this page and
 * /pricing's Closure & Exit row cannot drift apart again.
 */
function closurePricing(now?: Date): ServicePricing {
  const c = closureAllIn({ directors: 2, now });

  return {
    label: "Company Closure & Exit Cost",
    price: PRO_FEES["company-closure"],
    feeNote: "+ MCA fee at actual — strike-off in Form STK-2, end to end",
    includes: [
      "Form STK-2 filed and carried through to the dissolution notice in STK-7",
      "Statement of accounts in Form STK-8, certified by a Chartered Accountant",
      "Board meeting, EGM and special resolution support, including Form MGT-14",
      "Indemnity bond (STK-3) and affidavit (STK-4) drafted for every director",
      "The first written response to a C-PACE query",
    ],
    breakdown: [
      { label: "Strike-off in Form STK-2 — end to end", value: inr(CLOSURE_HEADLINE.strikeOffStk2), note: "covers everything in the list opposite" },
      {
        label: "MCA fee on Form STK-2",
        value: inr(c.ccfs.stk2Fee),
        note: c.ccfs.live
          ? `normally ${inr(c.ccfs.stk2Standard)} — concessional to ${c.ccfs.deadline} under CCFS-2026`
          : `CCFS-2026 closed on ${c.ccfs.deadline}; the normal fee applies again`,
      },
      { label: "Notarisation & stamping of STK-3 / STK-4", value: inr(STK_NOTARISATION_PER_DIRECTOR), note: "per director" },
      { label: "Exit diagnostic & route opinion", value: inr(CLOSURE_HEADLINE.diagnostic), note: "separate engagement — credited back in full when the closure proceeds" },
      { label: "Overdue AOC-4 and MGT-7 / MGT-7A", value: inr(CLOSURE_HEADLINE.overdueAnnualFilingPerFy), note: "per financial year — must be cleared first" },
      { label: "Second C-PACE resubmission", value: "₹5,000", note: "only if needed — the first response is included above" },
      { label: "GST cancellation (REG-16) & final GSTR-10", value: inr(CLOSURE_HEADLINE.gstCancellation) },
      { label: "EPFO & ESIC closure intimation", value: inr(CLOSURE_HEADLINE.epfEsicClosure), note: "where registered" },
      { label: "Voluntary liquidation (Section 59, NCLT)", value: NCLT_LIQUIDATION.fee, note: "where the company owes or holds anything — scoped after a free review" },
      { label: "Dormant status instead — Form MSC-1", value: inr(CLOSURE_HEADLINE.dormantMsc1), note: "defer rather than close; MSC-3 ₹4,000/year" },
      { label: "LLP strike-off — Form 24", value: inr(CLOSURE_HEADLINE.llpForm24), note: "overdue Form 8 / Form 11 ₹4,500 per FY" },
    ],
    typicalTotal: `≈ ${inr(c.total)} all-in — clean strike-off, ${c.directors} directors, filings up to date, incl. GST and the ${
      c.ccfs.live ? `concessional ${inr(c.ccfs.stk2Fee)}` : inr(c.ccfs.stk2Fee)
    } MCA fee${c.ccfs.live ? "" : " now that CCFS-2026 has closed"}`,
    disclaimer: `Closure is not a discharge — under Section 250 the liability of every director, officer and member survives dissolution, and the NCLT may restore the company under Section 252 within twenty years. ${GST_NOTE}`,
  };
}

export const SERVICE_PRICING: Record<string, ServicePricing> = {
  /* ─────────────── Company Formation ─────────────── */

  "private-limited-company": {
    label: "Private Limited Company Registration Cost",
    price: PRO_FEES["private-limited-company"],
    compareAt: 5999,
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
      { label: "Our professional fee", value: inr(PRO_FEES["private-limited-company"]), note: "at ₹1 lakh authorised capital — rises with the slab" },
      { label: "MCA registration fee", value: "NIL", note: "authorised capital up to ₹15 lakh is exempt" },
      { label: "Stamp duty (e-Form + MoA + AoA)", value: "₹360", note: "Delhi at ₹1 lakh capital — varies by state" },
      { label: "Name reservation (SPICe+ Part A)", value: "₹1,000" },
      { label: "PAN & TAN", value: "₹143" },
      { label: "DSC — 2 directors", value: "₹4,000", note: "₹2,000 each, Class 3 two-year" },
      { label: "GST @18% on DSC + our fee", value: "₹1,350" },
    ],
    typicalTotal: "≈ ₹10,352 all-in — 2 directors, ₹1 lakh capital, Delhi",
    disclaimer: `${FEE_CARD_NOTE} ${PURE_AGENT_NOTE}`,
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
      { label: "Our professional fee", value: inr(PRO_FEES["llp-registration"]), note: "incorporation, LLP Agreement drafting and Form 3" },
      { label: "Name approval (RUN-LLP)", value: "₹200" },
      { label: "FiLLiP incorporation fee", value: "₹500 – ₹5,000", note: "by capital contribution slab" },
      { label: "Form 3 filing fee", value: "₹50 – ₹200", note: "by capital contribution slab" },
      { label: "DPIN / DIN allotment", value: "₹500", note: "per partner without an existing DIN" },
      { label: "LLP Agreement stamp duty", value: "₹1,000", note: "Delhi — 1% of contribution, min ₹200, max ₹5,000; varies by state" },
      { label: "PAN & TAN", value: "₹143" },
      { label: "DSC — 2 partners", value: "₹4,000", note: "₹2,000 each, Class 3 two-year" },
      { label: "Franking, stamp paper & notarisation", value: "₹1,799" },
      { label: "GST @18% on DSC, franking + our fee", value: "₹1,674" },
    ],
    typicalTotal: "≈ ₹12,865 all-in — 2 partners, ₹1 lakh contribution, Delhi",
    disclaimer: `Unlike a company, the LLP Agreement is a physical instrument executed on stamp paper, so the duty is a real cost and franking sits on top of it. Duty varies by state — run the calculator for yours. ${GST_NOTE}`,
  },

  "one-person-company": {
    label: "One Person Company (OPC) Registration Cost",
    price: PRO_FEES["one-person-company"],
    compareAt: 5999,
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
      { label: "Our professional fee", value: inr(PRO_FEES["one-person-company"]), note: "at ₹1 lakh authorised capital — rises with the slab" },
      { label: "MCA registration fee", value: "NIL", note: "authorised capital up to ₹15 lakh is exempt" },
      { label: "Stamp duty (e-Form + MoA + AoA)", value: "₹360", note: "Delhi at ₹1 lakh capital — varies by state" },
      { label: "Name reservation (SPICe+ Part A)", value: "₹1,000" },
      { label: "PAN & TAN", value: "₹143" },
      { label: "DSC — 1 director", value: "₹2,000", note: "Class 3, two-year validity" },
      { label: "GST @18% on DSC + our fee", value: "₹990" },
    ],
    typicalTotal: "≈ ₹7,992 all-in — ₹1 lakh capital, Delhi",
    disclaimer: `${FEE_CARD_NOTE} ${PURE_AGENT_NOTE}`,
  },

  "partnership-firm": {
    label: "Partnership Firm Registration Cost",
    price: PRO_FEES["partnership-firm"],
    compareAt: 6999,
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
      { label: "Firm PAN & TAN", value: "₹143" },
      { label: "Registrar of Firms fee", value: "At actual", note: "optional but recommended" },
      { label: "Trademark filing (optional add-on)", value: "₹4,500", note: "government fee, per class" },
    ],
    typicalTotal: "≈ ₹6,042 all-in (incl. GST) plus deed stamp paper at actual — 2 partners, Delhi",
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
      { label: "MCA registration fee", value: "NIL", note: "authorised capital up to ₹15 lakh is exempt" },
      { label: "Stamp duty", value: "₹10", note: "Delhi exempts Section 8 from MoA & AoA duty" },
      { label: "Name reservation (SPICe+ Part A)", value: "₹1,000" },
      { label: "PAN & TAN", value: "₹143" },
      { label: "DSC — 2 directors", value: "₹4,000", note: "₹2,000 each, Class 3 two-year" },
      { label: "GST @18% on DSC + our fee", value: "₹2,160" },
      { label: "12A + 80G registration (provisional)", value: inr(SECTION8_SERVICES[0].pro), note: "optional — valid 3 years, filed right after incorporation" },
      { label: "NGO Darpan (NITI Aayog ID)", value: inr(SECTION8_SERVICES[1].pro), note: "optional" },
      { label: "CSR-1 registration", value: inr(SECTION8_SERVICES[2].pro), note: "optional — ₹12,500 on the three-year activity record" },
      { label: "Regular 12A + 80G registration", value: "₹22,000 – ₹52,000", note: "optional — slab by gross receipts" },
      { label: "FCRA registration", value: "₹45,000", note: "optional — prior permission ₹30,000" },
    ],
    typicalTotal: "≈ ₹15,312 all-in — 2 directors, ₹15 lakh capital, Delhi",
    disclaimer: `Incorporation follows the same capital-slab fee card as a private limited company. ${PURE_AGENT_NOTE}`,
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
      { label: "Our professional fee", value: inr(PRO_FEES["gst-registration"]), note: "standalone" },
      { label: "Bundled with an incorporation", value: "₹999", note: "when bought alongside company or LLP registration" },
      { label: "GST department fee", value: "NIL" },
      { label: "Digital signature (companies/LLPs)", value: "₹2,000", note: "not needed for proprietors — Aadhaar OTP" },
      { label: "Amendment to registration particulars", value: inr(PRO_FEES["gst-amendment"]), note: "per amendment, later" },
      { label: "Letter of Undertaking (LUT) filing", value: inr(PRO_FEES["gst-lut-filing"]), note: "per year, exporters" },
      { label: "Site visit / physical verification support", value: "At actual" },
    ],
    typicalTotal: "≈ ₹3,539 for a proprietor, ≈ ₹5,899 for a company (incl. GST and DSC)",
    disclaimer: `The ₹999 bundled rate applies only where GST registration is bought with an incorporation. ${GST_NOTE}`,
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

  "company-closure": closurePricing(),

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
      { label: "Our professional fee", value: inr(PRO_FEES["fssai-license"]), note: "₹3,499 bundled with an incorporation" },
      { label: "FSSAI Basic Registration fee", value: "₹100/year" },
      { label: "FSSAI State Licence fee", value: "₹2,000 – ₹5,000/year", note: "by capacity" },
      { label: "FSSAI Central Licence fee", value: "₹7,500/year" },
      { label: "Water / food testing report", value: "At actual", note: "where required" },
    ],
    typicalTotal: "≈ ₹4,819 all-in (incl. GST) for a one-year Basic Registration",
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
      { label: "Our professional fee", value: inr(PRO_FEES["trademark-registration"]), note: "per class — ₹2,499 bundled with an incorporation" },
      { label: "Govt. fee — individual / proprietor", value: "₹4,500", note: "per class" },
      { label: "Govt. fee — MSME / DPIIT startup", value: "₹4,500", note: "per class" },
      { label: "Govt. fee — company / LLP / partnership", value: "₹9,000", note: "per class" },
      { label: "Search & written opinion", value: "₹1,499", note: "per mark, before you file" },
      { label: "Reply to examination report", value: inr(PRO_FEES["trademark-objection"]), note: "per reply" },
      { label: "Show cause hearing attendance", value: "₹9,999", note: "per hearing" },
      { label: "Renewal — every 10 years", value: inr(PRO_FEES["trademark-renewal"]), note: "per class, plus ₹9,000 govt. fee" },
    ],
    typicalTotal: "≈ ₹8,629 for an MSME in one class, ≈ ₹13,129 for a company (incl. GST)",
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

  /* ═══════════════════════════════════════════════════════════════════════
     Priced from the client workbooks, 27 Aug 2026. Every fee below is quoted
     in one of the three files; nothing here is benchmarked or inferred.
     ═══════════════════════════════════════════════════════════════════════ */

  /* ─────────────── ROC event filings ─────────────── */

  "change-in-directors": {
    label: "Change in Directors Cost",
    price: PRO_FEES["change-in-directors"],
    feeNote: "+ MCA filing fee at actual",
    includes: [
      "Board resolution and consent letters (DIR-2)",
      "Declaration of non-disqualification (DIR-8)",
      "DIR-12 prepared and filed inside the 30-day window",
      "Statutory registers updated",
      "Resignation letter and DIR-11 support where applicable",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["change-in-directors"]), note: "per DIR-12 filing" },
      { label: "MCA filing fee", value: "₹200 – ₹600", note: "on the authorised capital slab" },
      { label: "Director KYC (DIR-3 KYC)", value: inr(PRO_FEES["director-kyc"]), note: "per director, if not already done" },
      { label: "DSC for a new director", value: "₹2,000", note: "Class 3, two-year validity" },
      { label: "Board resolution drafting", value: "₹999", note: "per resolution, if standalone" },
    ],
    typicalTotal: "≈ ₹2,559 all-in (incl. GST) for one appointment on a ₹1 lakh capital company",
    disclaimer: GST_NOTE,
  },

  "director-kyc": {
    label: "Director KYC (DIR-3 KYC) Cost",
    price: PRO_FEES["director-kyc"],
    unit: "per director",
    feeNote: "no government fee if filed by 30 September",
    includes: [
      "DIN status check",
      "Mobile and email OTP verification",
      "DIR-3 KYC / KYC-WEB filed and certified",
      "Filing acknowledgement delivered",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["director-kyc"]), note: "per director" },
      { label: "MCA fee — filed on time", value: "NIL", note: "due 30 September each year" },
      { label: "MCA fee — filed late", value: "₹5,000", note: "per director, DIN is deactivated until paid" },
      { label: "DSC, if lapsed", value: "₹2,000", note: "Class 3, two-year validity" },
    ],
    typicalTotal: "≈ ₹589 per director (incl. GST) when filed on time",
    disclaimer: `Miss 30 September and the DIN is deactivated — reactivation costs ₹5,000 per director in government fee alone. ${GST_NOTE}`,
  },

  "increase-authorised-capital": {
    label: "Increase in Authorised Capital Cost",
    price: PRO_FEES["increase-authorised-capital"],
    feeNote: "+ MCA fee & stamp duty on the increase at actual",
    includes: [
      "Board and EGM notices, with the special resolution drafted",
      "Altered capital clause of the Memorandum",
      "Form SH-7 filed inside 30 days",
      "MGT-14 filed where the Articles are also altered",
      "Statutory registers and MOA updated",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["increase-authorised-capital"]), note: "per SH-7 filing" },
      { label: "MCA fee on the increase", value: "At actual", note: "Rule 12 slab — scales with the new capital" },
      { label: "Stamp duty on the increase", value: "At actual", note: "state rate on the increased capital" },
      { label: "MGT-14 for the special resolution", value: "₹1,999", note: "where the Articles change too" },
      { label: "Board / shareholder resolution", value: "₹999", note: "per resolution, if standalone" },
    ],
    typicalTotal: "≈ ₹5,899 in professional fees (incl. GST), plus the MCA slab and stamp duty",
    disclaimer: `The MCA fee and stamp duty both scale with the amount of the increase — run the calculator before you decide the new figure. ${GST_NOTE}`,
  },

  "share-transfer": {
    label: "Share Transfer Cost",
    price: PRO_FEES["share-transfer"],
    unit: "per transfer",
    feeNote: "+ share transfer stamp duty at 0.015%",
    includes: [
      "Form SH-4 prepared and executed",
      "Stamping guidance and duty computation",
      "Board resolution approving the transfer",
      "Share certificate endorsement",
      "Register of Members updated",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["share-transfer"]), note: "per transfer" },
      { label: "Transfer stamp duty", value: "0.015%", note: "of the consideration, on SH-4" },
      { label: "Fresh share certificates", value: "₹499", note: "per certificate, printed and stamped" },
      { label: "Allotment of new shares (PAS-3)", value: "₹4,999", note: "if issuing rather than transferring" },
      { label: "FC-TRS, non-resident transferee", value: "₹14,999", note: "per filing, RBI reporting" },
    ],
    typicalTotal: "≈ ₹4,129 per transfer (incl. GST), plus 0.015% duty on the consideration",
    disclaimer: GST_NOTE,
  },

  "registered-office-change": {
    label: "Registered Office Change Cost",
    price: PRO_FEES["registered-office-change"],
    feeNote: "+ MCA filing fee at actual",
    includes: [
      "Board resolution and INC-22 filing",
      "Fresh registered office proofs — utility bill and NOC",
      "Special resolution and MGT-14 where the change crosses a city",
      "Statutory registers and letterheads updated",
      "Confirmation of the new address on the MCA master data",
    ],
    breakdown: [
      { label: "Same city, town or village", value: inr(PRO_FEES["registered-office-change"]) },
      { label: "Same State, new ROC jurisdiction", value: "₹9,999", note: "Regional Director approval required" },
      { label: "State to State", value: "On quote", note: "RD approval, 2–4 months" },
      { label: "MCA filing fee", value: "₹200 – ₹600", note: "on the authorised capital slab" },
      { label: "Leased / virtual office proofs", value: "₹1,499", note: "where we assemble the proof pack" },
    ],
    typicalTotal: "≈ ₹3,539 all-in (incl. GST) for a same-city change",
    disclaimer: `A State-to-State shift needs Regional Director approval and is quoted after a review — it is not a form-filing job. ${GST_NOTE}`,
  },

  "company-name-change": {
    label: "Company Name Change Cost",
    price: PRO_FEES["company-name-change"],
    feeNote: "+ name reservation & MCA fee at actual",
    includes: [
      "Name availability search and RUN application",
      "Board and EGM notices with the special resolution",
      "MGT-14 filed inside 30 days",
      "Form INC-24 filed for Central Government approval",
      "Fresh certificate of incorporation and updated MOA/AOA",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["company-name-change"]) },
      { label: "Name reservation (RUN)", value: "₹1,000", note: "per application" },
      { label: "MCA fee — INC-24 and MGT-14", value: "₹200 – ₹600", note: "each, on the capital slab" },
      { label: "Fresh name attempt if both lapse", value: "₹999", note: "per attempt, plus government fee" },
      { label: "Adoption of a new set of Articles", value: "₹4,999", note: "if the Articles are replaced too" },
    ],
    typicalTotal: "≈ ₹12,799 all-in (incl. GST) including name reservation and MCA fees",
    disclaimer: `Every licence, registration, bank account and PAN-linked record has to be updated after approval — we hand over a checklist. ${GST_NOTE}`,
  },


  "post-incorporation-compliance": {
    label: "Post-Incorporation Compliance Cost",
    price: PRO_FEES["post-incorporation-compliance"],
    feeNote: "+ MCA filing fee at actual",
    includes: [
      "Declaration of commencement of business (INC-20A)",
      "Appointment of the first auditor (ADT-1)",
      "Share certificates issued, printed and stamped",
      "First board minutes and statutory registers opened",
      "A 12-month compliance calendar",
    ],
    breakdown: [
      { label: "Commencement of business (INC-20A)", value: "₹1,999", note: "₹1,499 bundled with incorporation" },
      { label: "First auditor appointment (ADT-1)", value: "₹1,999", note: "₹1,499 bundled with incorporation" },
      { label: "Share certificates", value: "₹499", note: "per certificate, printed and stamped" },
      { label: "Board resolutions", value: "₹999", note: "per resolution" },
      { label: "MCA filing fee", value: "₹200 – ₹600", note: "per form, on the capital slab" },
    ],
    typicalTotal: "≈ ₹4,718 all-in (incl. GST) for INC-20A and ADT-1 together",
    disclaimer: `INC-20A is due within 180 days of incorporation — without it the company cannot legally begin business or borrow. ${GST_NOTE}`,
  },

  /* ─────────────── Startup & registrations ─────────────── */

  "startup-india": {
    label: "Startup India / DPIIT Recognition Cost",
    price: PRO_FEES["startup-india"],
    feeNote: "no government fee for DPIIT recognition",
    includes: [
      "Eligibility check — under 10 years, under ₹100 Cr turnover, and the innovation test",
      "Innovation and scalability note drafted by us",
      "Startup India portal profile and DPIIT application filed",
      "Query handling through to the recognition certificate",
      "Benefits handover sheet mapping the schemes you become eligible for",
    ],
    breakdown: [
      { label: "DPIIT recognition — our fee", value: inr(STARTUP_INDIA.dpiitOnly), note: "₹6,999 bundled with an incorporation" },
      { label: "DPIIT government fee", value: "NIL" },
      { label: "Grant readiness pack — Stage 1", value: inr(STARTUP_INDIA.stage1.fee), note: "eligibility and probability check, charged first to begin work" },
      { label: "Grant readiness pack — Stage 2", value: inr(STARTUP_INDIA.stage2.fee), note: "readiness report, pitch deck and grant filing" },
      { label: "Grant readiness pack — total", value: inr(STARTUP_INDIA.packageValue), note: "₹9,599 bundled with an incorporation" },
      { label: "Section 80-IAC exemption application", value: inr(STARTUP_INDIA.section80IAC), note: "₹22,999 bundled" },
      { label: "NITI Aayog Darpan ID", value: "₹1,999", note: "₹1,499 bundled" },
    ],
    typicalTotal: "≈ ₹9,439 all-in (incl. GST) for DPIIT recognition",
    disclaimer: `The grant readiness pack is billed in two stages — Stage 2 only if Stage 1 confirms eligibility and you elect to proceed. ${GST_NOTE}`,
  },

  "msme-registration": {
    label: "Udyam (MSME) Registration Cost",
    price: PRO_FEES["msme-registration"],
    feeNote: "government fee for Udyam registration is NIL",
    includes: [
      "Correct NIC code selection — the classification drives scheme eligibility later",
      "Aadhaar and PAN validation on the Udyam portal",
      "Investment and turnover classification",
      "Udyam Registration Certificate with the URN",
      "Guidance on the benefits the certificate unlocks",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["msme-registration"]), note: "₹999 bundled with an incorporation" },
      { label: "Udyam government fee", value: "NIL", note: "registration is free on the portal" },
      { label: "GST registration, if not held", value: inr(PRO_FEES["gst-registration"]), note: "₹999 bundled" },
      { label: "NITI Aayog Darpan ID", value: "₹1,999", note: "for not-for-profits" },
    ],
    typicalTotal: "≈ ₹2,359 all-in (incl. GST) — there is no government fee to pay",
    disclaimer: `Udyam is free on the government portal. Our fee is for getting the NIC codes and the investment/turnover classification right, which is what scheme eligibility later turns on. ${GST_NOTE}`,
  },

  "iec-registration": {
    label: "Import Export Code (IEC) Cost",
    price: PRO_FEES["iec-registration"],
    feeNote: "+ ₹500 DGFT government fee",
    includes: [
      "DGFT portal registration and profile setup",
      "Digital signature or Aadhaar-based authentication",
      "ANF-2A application prepared and filed",
      "Bank certificate and document coordination",
      "IEC certificate delivered, with the annual-update reminder",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["iec-registration"]), note: "₹1,499 bundled with an incorporation" },
      { label: "DGFT government fee", value: "₹500" },
      { label: "Digital signature, if required", value: "₹2,000", note: "Class 3, two-year validity" },
      { label: "Letter of Undertaking (LUT) filing", value: inr(PRO_FEES["gst-lut-filing"]), note: "per year — exports without paying IGST" },
    ],
    typicalTotal: "≈ ₹2,859 all-in (incl. GST and the DGFT fee)",
    disclaimer: `An IEC must be updated on the DGFT portal every year between April and June even if nothing has changed, or it is deactivated. ${GST_NOTE}`,
  },

  "professional-tax": {
    label: "Professional Tax Registration Cost",
    price: PRO_FEES["professional-tax"],
    feeNote: "+ state government fee at actual",
    includes: [
      "Applicability check for your State",
      "PTEC and PTRC registration as required",
      "Portal application filed with supporting documents",
      "Registration certificate delivered",
      "Deduction and return-filing calendar",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["professional-tax"]), note: "₹2,499 bundled with an incorporation" },
      { label: "State government fee", value: "At actual", note: "varies by State" },
      { label: "Shops & Establishment registration", value: inr(PRO_FEES["shops-establishment"]), note: "Delhi — ₹2,999 bundled" },
      { label: "Surrender on closure", value: "₹3,500", note: "per State registration" },
    ],
    typicalTotal: "≈ ₹3,539 all-in (incl. GST) for one State registration",
    disclaimer: `Professional tax is a State levy — it does not apply in every State, and we tell you before you pay if yours is one of them. ${GST_NOTE}`,
  },

  "shops-establishment": {
    label: "Shops & Establishment Registration Cost",
    price: PRO_FEES["shops-establishment"],
    feeNote: "+ state government fee at actual",
    includes: [
      "Establishment category and applicability check",
      "Labour department portal application",
      "Employer and employee particulars filed",
      "Registration certificate delivered",
      "Display and record-keeping obligations explained",
    ],
    breakdown: [
      { label: "Our professional fee — Delhi", value: inr(PRO_FEES["shops-establishment"]), note: "₹2,999 bundled with an incorporation" },
      { label: "State government fee", value: "At actual", note: "varies by State and headcount" },
      { label: "Professional tax registration", value: inr(PRO_FEES["professional-tax"]), note: "applicable States only" },
      { label: "Surrender on closure", value: "₹3,500", note: "per State registration" },
    ],
    typicalTotal: "≈ ₹4,719 all-in (incl. GST) for a Delhi registration",
    disclaimer: GST_NOTE,
  },

  "12a-80g-registration": {
    label: "12A & 80G Registration Cost",
    price: PRO_FEES["12a-80g-registration"],
    feeNote: "no government fee — provisional registration and approval",
    includes: [
      "Eligibility and objects review",
      "Provisional 12A registration and 80G approval filed",
      "Trust deed / MOA and activity documentation assembled",
      "Departmental query handling",
      "Registration and approval orders delivered",
    ],
    breakdown: [
      { label: "Provisional 12A + 80G registration", value: inr(SECTION8_SERVICES[0].pro), note: "₹8,999 bundled; valid three years" },
      { label: "Regular 12A + 80G registration, receipts below ₹25 lakh", value: inr(SECTION8_SERVICES[3].pro), note: "valid five years" },
      { label: "Regular 12A + 80G registration, ₹25 lakh to ₹2 crore", value: inr(SECTION8_SERVICES[4].pro) },
      { label: "Regular 12A + 80G registration, above ₹2 crore", value: inr(SECTION8_SERVICES[5].pro) },
      { label: "Reply to a departmental query", value: inr(SECTION8_SERVICES[6].pro), note: "second and subsequent" },
      { label: "Hearing before the Commissioner (Exemptions)", value: inr(SECTION8_SERVICES[7].pro), note: "per appearance" },
      { label: "NGO Darpan (NITI Aayog ID)", value: inr(SECTION8_SERVICES[1].pro) },
      { label: "CSR-1 registration", value: inr(SECTION8_SERVICES[2].pro), note: "₹12,500 on the three-year activity record" },
    ],
    typicalTotal: "≈ ₹11,799 all-in (incl. GST) for provisional 12A and 80G",
    disclaimer: `Provisional registration runs three years; the regular registration is priced on a slab set by gross receipts in the latest audited year. ${GST_NOTE}`,
  },


  "gst-lut-filing": {
    label: "GST LUT Filing Cost",
    price: PRO_FEES["gst-lut-filing"],
    unit: "per year",
    feeNote: "no government fee — filed on the GST portal",
    includes: [
      "Eligibility check against the LUT conditions",
      "Form GST RFD-11 prepared with witness particulars",
      "Filing on the GST portal and ARN tracking",
      "Acknowledgement (ARN) delivered for your export records",
      "Renewal reminder before the next financial year",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["gst-lut-filing"]), note: "per financial year" },
      { label: "GST department fee", value: "NIL" },
      { label: "Import Export Code (IEC)", value: inr(PRO_FEES["iec-registration"]), note: "if not already held" },
      { label: "Amendment to registration particulars", value: inr(PRO_FEES["gst-amendment"]), note: "per amendment" },
    ],
    typicalTotal: "≈ ₹1,179 per year (incl. GST) — there is no government fee",
    disclaimer: `An LUT lets you export without paying IGST and claiming a refund. It has to be filed fresh for every financial year. ${GST_NOTE}`,
  },

  /* ─────────────── Intellectual property ─────────────── */

  "trademark-objection": {
    label: "Trademark Objection Reply Cost",
    price: PRO_FEES["trademark-objection"],
    unit: "per reply",
    feeNote: "no government fee for an examination reply",
    includes: [
      "Examination report analysed against the cited marks",
      "Grounds of objection addressed section by section",
      "Evidence of use and affidavit assembled",
      "Reply drafted and filed inside the 30-day window",
      "Status tracked through to acceptance or hearing",
    ],
    breakdown: [
      { label: "Reply to examination report", value: inr(PRO_FEES["trademark-objection"]), note: "per reply" },
      { label: "Show cause hearing attendance", value: "₹9,999", note: "per hearing" },
      { label: "Search & written opinion", value: "₹1,499", note: "per mark, before you file" },
      { label: "Government fee on the reply", value: "NIL" },
      { label: "Opposition notice", value: "₹2,700", note: "government fee, if the mark is opposed after advertisement" },
    ],
    typicalTotal: "≈ ₹9,439 per reply (incl. GST)",
    disclaimer: `An examination report must be answered within 30 days or the application is treated as abandoned. ${GST_NOTE}`,
  },

  "trademark-renewal": {
    label: "Trademark Renewal Cost",
    price: PRO_FEES["trademark-renewal"],
    unit: "per class",
    feeNote: "+ ₹9,000 government fee per class",
    includes: [
      "Renewal due-date check against the registry record",
      "Form TM-R prepared and filed",
      "Surcharge computation where the mark is in the grace period",
      "Restoration application where the mark has lapsed",
      "Renewal certificate delivered",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["trademark-renewal"]), note: "per class" },
      { label: "Government renewal fee", value: "₹9,000", note: "per class, every 10 years" },
      { label: "Late renewal surcharge", value: "₹4,500", note: "per class, within the grace period" },
      { label: "Restoration of a lapsed mark", value: "₹9,000", note: "government fee, per class" },
    ],
    typicalTotal: "≈ ₹14,899 per class (incl. GST and the government fee)",
    disclaimer: `A trademark runs 10 years from the date of application. Miss the renewal and the mark can be removed from the register — restoration is possible but costs more. ${GST_NOTE}`,
  },

  "copyright-registration": {
    label: "Copyright Registration Cost",
    price: PRO_FEES["copyright-registration"],
    unit: "per work",
    feeNote: "+ government fee at actual by work category",
    includes: [
      "Work category determination and Form XIV preparation",
      "Statement of particulars and statement of further particulars",
      "NOC from the author or publisher where required",
      "Filing with the Copyright Office and diary number tracking",
      "Objection handling through to the registration certificate",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["copyright-registration"]), note: "per work" },
      { label: "Government fee", value: "At actual", note: "by work category — literary, artistic, software, cinematograph" },
      { label: "Design registration instead", value: inr(PRO_FEES["design-registration"]), note: "per design, where the work is an article's shape or ornament" },
      { label: "Assignment or licence deed", value: "₹7,999", note: "per agreement" },
    ],
    typicalTotal: "≈ ₹9,439 in professional fees (incl. GST), plus the government fee at actual",
    disclaimer: `Copyright subsists automatically on creation — registration is evidence of ownership, which is what matters in an infringement action. ${GST_NOTE}`,
  },

  "design-registration": {
    label: "Design Registration Cost",
    price: PRO_FEES["design-registration"],
    unit: "per design",
    feeNote: "+ government fee at actual by applicant category",
    includes: [
      "Novelty check against the designs register",
      "Locarno classification selection",
      "Representation sheets and statement of novelty prepared",
      "Form 1 filed with the Designs Office",
      "Objection handling through to registration",
    ],
    breakdown: [
      { label: "Our professional fee", value: inr(PRO_FEES["design-registration"]), note: "per design" },
      { label: "Government fee", value: "At actual", note: "reduced for individuals, startups and small entities" },
      { label: "Copyright registration instead", value: inr(PRO_FEES["copyright-registration"]), note: "per work, for artistic works" },
      { label: "Trademark search & opinion", value: "₹1,499", note: "where the shape also functions as a mark" },
    ],
    typicalTotal: "≈ ₹11,799 in professional fees (incl. GST), plus the government fee at actual",
    disclaimer: `A design must be new and unpublished when you apply — publishing it first destroys novelty. ${GST_NOTE}`,
  },

  /* ─────────────── HR & payroll ─────────────── */

  "pf-registration": {
    label: "Provident Fund Registration Cost",
    price: PRO_FEES["pf-registration"],
    feeNote: "no government fee — PF and ESIC activated together",
    includes: [
      "Applicability check against the headcount threshold",
      "Shram Suvidha / EPFO portal registration",
      "Establishment code and ESIC code activation",
      "Employee UAN generation and KYC seeding",
      "First ECR filed and the monthly calendar handed over",
    ],
    breakdown: [
      { label: "PF and ESIC activation", value: inr(PRO_FEES["pf-registration"]), note: "₹2,499 bundled with an incorporation" },
      { label: "EPFO / ESIC government fee", value: "NIL", note: "contributions are separate and paid by the employer" },
      { label: "Monthly PF return (ECR)", value: "₹1,250/month" },
      { label: "Monthly ESI return", value: "₹999/month" },
      { label: "Closure intimation on winding up", value: "₹5,000", note: "EPFO and ESIC together" },
    ],
    typicalTotal: "≈ ₹3,539 all-in (incl. GST) for PF and ESIC activation together",
    disclaimer: `PF and ESIC are activated in one Shram Suvidha registration, so the fee covers both. Statutory contributions are paid by the employer directly. ${GST_NOTE}`,
  },

  "esic-registration": {
    label: "ESIC Registration Cost",
    price: PRO_FEES["esic-registration"],
    feeNote: "no government fee — PF and ESIC activated together",
    includes: [
      "Applicability check against the headcount and wage threshold",
      "Shram Suvidha / ESIC portal registration",
      "Establishment code activation",
      "Employee insurance number generation",
      "First return filed and the monthly calendar handed over",
    ],
    breakdown: [
      { label: "PF and ESIC activation", value: inr(PRO_FEES["esic-registration"]), note: "₹2,499 bundled with an incorporation" },
      { label: "ESIC government fee", value: "NIL", note: "contributions are separate and paid by the employer" },
      { label: "Monthly ESI return", value: "₹999/month" },
      { label: "Monthly PF return (ECR)", value: "₹1,250/month" },
      { label: "Closure intimation on winding up", value: "₹5,000", note: "EPFO and ESIC together" },
    ],
    typicalTotal: "≈ ₹3,539 all-in (incl. GST) for PF and ESIC activation together",
    disclaimer: `One Shram Suvidha registration activates both PF and ESIC, so this fee is not charged twice if you take both. ${GST_NOTE}`,
  },

  /* ─────────────── Finance & advisory ─────────────── */

  "virtual-cfo": {
    label: "Virtual CFO Cost",
    price: PRO_FEES["virtual-cfo"],
    unit: "/month",
    feeNote: "from — per month, scoped after a discovery call",
    includes: [
      "Monthly MIS and management reporting",
      "Cash-flow forecasting and runway tracking",
      "Budget versus actual review with the founders",
      "Investor-ready financials and data-room upkeep",
      "Tax structuring and board-pack preparation",
    ],
    breakdown: [
      { label: "Virtual CFO retainer", value: inr(PRO_FEES["virtual-cfo"]), note: "per month, ₹24,999 onwards" },
      { label: "Financial & secretarial due diligence", value: "₹99,999", note: "per engagement, onwards" },
      { label: "Written structuring or tax position note", value: "₹24,999", note: "per note, onwards" },
      { label: "Business structuring consultation", value: "₹4,999", note: "60 minutes" },
      { label: "Internal process & compliance health check", value: "₹34,999", note: "per engagement" },
      { label: "Valuer / merchant banker report coordination", value: inr(PRO_FEES["business-valuation"]), note: "per report, plus the valuer's fee at actual" },
    ],
    typicalTotal: "≈ ₹29,499/month (incl. GST) at the entry scope",
    disclaimer: `Scoped after a discovery call — the retainer moves with transaction volume, entity count and reporting cadence. ${GST_NOTE}`,
  },

  "business-valuation": {
    label: "Business Valuation Cost",
    price: PRO_FEES["business-valuation"],
    unit: "per report",
    feeNote: "+ the Registered Valuer's own fee at actual",
    includes: [
      "Valuation purpose and standard determined — FEMA, Companies Act or income tax",
      "Registered Valuer or merchant banker engaged and briefed",
      "Financial information pack assembled for the valuer",
      "Draft report reviewed against the regulatory requirement",
      "Final report delivered with the filing it supports",
    ],
    breakdown: [
      { label: "Valuer / merchant banker coordination", value: inr(PRO_FEES["business-valuation"]), note: "per report" },
      { label: "Registered Valuer's fee", value: "At actual", note: "billed by the valuer directly" },
      { label: "FC-GPR reporting of a share issue", value: "₹14,999", note: "per filing, where the valuation supports FDI" },
      { label: "FC-TRS reporting of a share transfer", value: "₹14,999", note: "per filing" },
      { label: "Financial & secretarial due diligence", value: "₹99,999", note: "per engagement, onwards" },
      { label: "Written structuring or tax position note", value: "₹24,999", note: "per note, onwards" },
    ],
    typicalTotal: "≈ ₹5,899 in coordination fees (incl. GST), plus the valuer's own fee",
    disclaimer: `A valuation for FEMA, a share issue or an income-tax position must be signed by a Registered Valuer or a merchant banker — that fee is theirs and is billed at actual. ${GST_NOTE}`,
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
    // Renamed from "Company Registration Cost Calculator": the tool prices all
    // six structures, but only three of them are companies under the Act, so
    // the old name read narrower than the tool actually is. URL unchanged on
    // purpose — see RETIRED_ROUTES in lib/legacy-redirects.
    title: "Business Setup Calculator",
    desc: "Setup cost for any structure, by State and capital — plus GST, MSME and trademark add-ons.",
    href: "/calculators/company-registration-cost",
    cta: "Estimate setup cost",
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
  // Both deep-link into the Business Setup Calculator's add-on step with the
  // relevant certificate pre-checked (?addon=... , read by the calculator
  // route page) rather than being separate tools — the pricing already lives
  // in ADDON_SERVICES / SETUP_ADDONS, one source, not a second one.
  "dpiit-cost-calculator": {
    title: "DPIIT (Startup India) Certificate Cost",
    desc: "What Startup India / DPIIT recognition actually costs — with any registration you're setting up.",
    href: "/calculators/company-registration-cost?addon=dpiit",
    cta: "See DPIIT cost",
    icon: "Lightbulb",
    tone: "amber",
  },
  "msme-cost-calculator": {
    title: "MSME (Udyam) Certificate Cost",
    desc: "What MSME / Udyam registration actually costs — with any registration you're setting up.",
    href: "/calculators/company-registration-cost?addon=udyam",
    cta: "See MSME cost",
    icon: "ClipboardCheck",
    tone: "green",
  },
};

const FORMATION_CALCS = [
  "company-registration-cost",
  "business-structure-advisor",
  "compliance-cost-calculator",
  "company-name-search",
];

const LICENCE_CALCS = ["company-registration-cost", "compliance-cost-calculator", "gst-calculator"];
const ROC_CALCS = ["compliance-cost-calculator", "company-registration-cost"];

export const SERVICE_CALCULATORS: Record<string, string[]> = {
  /* Company Formation */
  "private-limited-company": ["company-registration-cost", "llp-vs-pvt-ltd", "compliance-cost-calculator", "company-name-search"],
  "llp-registration": ["company-registration-cost", "llp-vs-pvt-ltd", "compliance-cost-calculator", "business-structure-advisor"],
  "one-person-company": ["company-registration-cost", "business-structure-advisor", "compliance-cost-calculator", "llp-vs-pvt-ltd"],
  "partnership-firm": ["company-registration-cost", "business-structure-advisor", "compliance-cost-calculator"],
  "sole-proprietorship": ["company-registration-cost", "business-structure-advisor", "gst-registration-cost-calculator", "income-tax-calculator"],
  "section-8-company": FORMATION_CALCS,
  "nidhi-company": FORMATION_CALCS,
  "producer-company": FORMATION_CALCS,
  "public-limited-company": FORMATION_CALCS,
  "nbfc-registration": FORMATION_CALCS,
  "chit-fund-company": FORMATION_CALCS,
  "microfinance-company": FORMATION_CALCS,
  "indian-subsidiary": ["company-registration-cost", "compliance-cost-calculator", "company-name-search"],
  "branch-office": ["company-registration-cost", "compliance-cost-calculator"],

  /* Tax & GST */
  "gst-registration": ["gst-registration-cost-calculator", "gst-calculator", "company-registration-cost", "compliance-cost-calculator"],
  "gst-filing": ["gst-calculator", "gst-registration-cost-calculator", "compliance-cost-calculator", "tds-calculator"],
  "gst-amendment": ["gst-registration-cost-calculator", "gst-calculator", "compliance-cost-calculator"],
  "gst-lut-filing": ["gst-calculator", "compliance-cost-calculator"],
  "income-tax-return": ["income-tax-calculator", "hra-calculator", "salary-calculator", "tds-calculator"],
  "tds-return": ["tds-calculator", "tds-rate-finder", "salary-calculator"],
  "advance-tax": ["income-tax-calculator", "tds-calculator", "compliance-cost-calculator"],
  "tax-audit": ["income-tax-calculator", "compliance-cost-calculator"],
  "transfer-pricing": ["compliance-cost-calculator", "income-tax-calculator"],
  "12a-80g-registration": ["compliance-cost-calculator", "income-tax-calculator"],
  "shops-establishment": ["company-registration-cost", "compliance-cost-calculator"],
  "labour-law-compliance": ["salary-calculator", "compliance-cost-calculator", "epf-calculator"],
  "posh-compliance": ["compliance-cost-calculator"],
  "factories-act": ["compliance-cost-calculator", "company-registration-cost"],

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
  "startup-india": ["dpiit-cost-calculator", "business-structure-advisor", "company-registration-cost", "compliance-cost-calculator"],
  "msme-registration": ["msme-cost-calculator", "company-registration-cost", "business-structure-advisor", "compliance-cost-calculator"],
  "iec-registration": LICENCE_CALCS,
  "fssai-license": ["fssai-license-cost-calculator", "company-registration-cost", "compliance-cost-calculator"],
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
  "trademark-registration": ["trademark-cost-calculator", "trademark-class-finder", "company-name-search", "company-registration-cost"],
  "trademark-objection": ["trademark-cost-calculator", "trademark-class-finder", "company-name-search"],
  "trademark-renewal": ["trademark-cost-calculator", "trademark-class-finder", "compliance-cost-calculator"],
  "trademark-watch": ["trademark-class-finder", "company-name-search"],
  "trademark-assignment": ["trademark-cost-calculator", "trademark-class-finder"],
  "international-trademark": ["trademark-cost-calculator", "trademark-class-finder", "company-registration-cost"],
  "copyright-registration": ["company-registration-cost"],
  "patent-registration": ["company-registration-cost"],
  "patent-search": ["company-registration-cost"],
  "design-registration": ["company-registration-cost"],
  "gi-tag-registration": ["company-registration-cost"],

  /* Payroll & HR */
  "pf-registration": ["epf-calculator", "salary-calculator", "compliance-cost-calculator"],
  "esic-registration": ["salary-calculator", "compliance-cost-calculator"],
  "payroll-management": ["salary-calculator", "hra-calculator", "epf-calculator", "gratuity-calculator"],
  "gratuity-trust": ["gratuity-calculator", "salary-calculator"],

  /* Accounting & Finance */
  "accounting-bookkeeping": ["compliance-cost-calculator", "gst-calculator", "income-tax-calculator"],
  "virtual-cfo": ["compliance-cost-calculator", "company-registration-cost", "gst-calculator"],
  "business-valuation": ["company-registration-cost", "compliance-cost-calculator"],
  "financial-statements": ["compliance-cost-calculator", "income-tax-calculator"],
};

/* ── accessors ── */

export function getServicePricing(serviceId: string, now?: Date): ServicePricing | null {
  // Closure is date-sensitive (CCFS-2026) — rebuild it rather than serving the
  // snapshot SERVICE_PRICING took when the module first loaded.
  if (serviceId === "company-closure") return closurePricing(now);
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

/* ══════════════════════════════════════════════════════
   À-la-carte fee schedule — rendered on /pricing
   ══════════════════════════════════════════════════════ */

export type FeeScheduleRow = {
  service: string;
  basis: string;
  /** Pre-formatted: "₹4,999", "₹24,999 onwards", "On quote" */
  fee: string;
  note?: string;
};

export type FeeScheduleGroup = { category: string; rows: FeeScheduleRow[] };

function fmtFee(fee: number | null, onwards?: boolean): string {
  if (fee === null) return "On quote";
  return onwards ? `${inr(fee)} onwards` : inr(fee);
}

/**
 * The full standalone schedule, grouped for display. Categories are ordered the
 * way the workbook lists them; the closure group is spliced in from the closure
 * workbook, which supersedes the incorporation workbook's Closure & Exit rows.
 */
export const FEE_SCHEDULE: FeeScheduleGroup[] = (() => {
  const groups: FeeScheduleGroup[] = [];
  for (const f of STANDALONE_FEES) {
    let g = groups.find((x) => x.category === f.category);
    if (!g) groups.push((g = { category: f.category, rows: [] }));
    g.rows.push({ service: f.service, basis: f.basis, fee: fmtFee(f.fee, f.onwards), note: f.note });
  }
  const ccfs = ccfsStatus();
  groups.push({
    category: "Closure & Exit",
    rows: [
      { service: "Exit diagnostic and route opinion", basis: "Per engagement", fee: inr(CLOSURE_HEADLINE.diagnostic), note: "Credited back in full when the closure proceeds" },
      {
        // The inclusion list is STK2_BUNDLE verbatim — the same list
        // /services/company-closure renders. Neither page can drift from it.
        service: `Strike-off of a company (STK-2), end to end — includes ${STK2_BUNDLE.join("; ")}`,
        basis: "Per engagement",
        fee: inr(CLOSURE_HEADLINE.strikeOffStk2),
        note: ccfs.live
          ? `MCA fee ${inr(ccfs.stk2Fee)} to ${ccfs.deadline} under CCFS-2026, then ${inr(ccfs.stk2Standard)}`
          : `MCA fee ${inr(ccfs.stk2Fee)} — CCFS-2026 closed on ${ccfs.deadline}`,
      },
      { service: "Notarisation and stamping of STK-3 / STK-4", basis: "Per director", fee: inr(STK_NOTARISATION_PER_DIRECTOR) },
      { service: "Second and subsequent C-PACE resubmission", basis: "Per resubmission", fee: "₹5,000", note: "The first response is covered by the strike-off fee above" },
      { service: "Voluntary liquidation under Section 59 of the IBC (NCLT route)", basis: NCLT_LIQUIDATION.basis, fee: NCLT_LIQUIDATION.fee, note: NCLT_LIQUIDATION.note },
      { service: "Strike-off of an LLP (Form 24), end to end", basis: "Per engagement", fee: inr(CLOSURE_HEADLINE.llpForm24) },
      { service: "Application for dormant status (MSC-1)", basis: "Per engagement", fee: inr(CLOSURE_HEADLINE.dormantMsc1) },
      { service: "Annual return of a dormant company (MSC-3)", basis: "Per year", fee: inr(CLOSURE_HEADLINE.dormantMsc3) },
      { service: "Application for active status (MSC-4)", basis: "Per engagement", fee: inr(CLOSURE_HEADLINE.revivalMsc4) },
      { service: "Overdue AOC-4 and MGT-7 / MGT-7A", basis: "Per financial year", fee: inr(CLOSURE_HEADLINE.overdueAnnualFilingPerFy) },
      { service: "Overdue LLP Form 8 and Form 11", basis: "Per financial year", fee: inr(CLOSURE_HEADLINE.overdueLlpFilingPerFy) },
      { service: "GST cancellation (REG-16) and final GSTR-10", basis: "Per engagement", fee: inr(CLOSURE_HEADLINE.gstCancellation) },
      { service: "EPFO and ESIC closure intimation", basis: "Per engagement", fee: inr(CLOSURE_HEADLINE.epfEsicClosure) },
      { service: "Professional tax / Shops & Establishment surrender", basis: "Per State registration", fee: inr(CLOSURE_HEADLINE.ptShopsSurrender) },
    ],
  });
  groups.push({
    category: "Section 8 & Not-for-Profit",
    rows: SECTION8_SERVICES.map((x) => ({
      service: x.service,
      basis: x.timeline,
      fee: inr(x.pro),
      note: x.note,
    })),
  });
  return groups;
})();

/** Add-on services, with the lower rate that applies alongside an incorporation. */
export const ADDON_SCHEDULE = ADDON_SERVICES.map((a) => ({
  label: a.label,
  standalone: a.standalone === null ? "On quote" : inr(a.standalone),
  bundled: a.bundled === null ? "—" : inr(a.bundled),
  saving: a.standalone !== null && a.bundled !== null ? inr(a.standalone - a.bundled) : null,
}));

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
