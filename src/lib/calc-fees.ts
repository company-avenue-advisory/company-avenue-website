/**
 * Fee constants and government-fee maths shared by the calculators and by
 * `lib/pricing.ts`.
 *
 * SELF-CONTAINED — this module imports nothing, so client calculators can pull
 * it in without dragging the whole pricing content graph into their bundle.
 * `lib/pricing.ts` imports PRO_FEES from here, which makes this file the single
 * numeric source of truth for what we charge.
 *
 * Sources (verified 2026-08-13):
 *  - Company incorporation: CAA_Incorporation_Cost_Calculator_Final.xlsx (boss),
 *    which is the authority for MCA fees, stamp duty, DSC, PAN/TAN and GST scope
 *  - Everything else: setindiabiz entry-plan + ₹500 (see lib/pricing.ts header)
 *  - MCA incorporation fee: nil up to ₹15L authorised capital, then slabs
 *    (Companies (Registration Offices and Fees) Rules, 2014)
 *  - LLP government fees: setindiabiz published FiLLiP/PAN/TAN/Form-3 table
 *  - Stamp duty: state Stamp Act schedules (taxguru consolidated table), with
 *    Karnataka and Tamil Nadu on their revised 2024 AOA rates
 *  - Trademark: First Schedule, Trade Marks Rules 2017
 */

/* ══════════════ our professional fees (₹) ══════════════ */

export const PRO_FEES = {
  // Incorporation fees are set by the workbook (Calculator!C13 = ₹3,499).
  "private-limited-company": 3499,
  "llp-registration": 2999,
  "one-person-company": 3499,
  "partnership-firm": 5499,
  "sole-proprietorship": 2999,
  "section-8-company": 7999,
  "indian-subsidiary": 31499,
  "nbfc-registration": 5499,
  "microfinance-company": 5499,
  "gst-registration": 999,
  "gst-filing": 1250,
  "gst-amendment": 1999,
  "income-tax-return": 1249,
  "llp-annual-filing": 2499,
  "company-closure": 7999,
  "agm-services": 6499,
  "fssai-license": 3499,
  "drug-license": 5499,
  "psara-license": 25500,
  "barcode-registration": 7499,
  "trademark-registration": 2500,
  "payroll-management": 2000,
  "accounting-bookkeeping": 2999,
} as const;

/** Per-filing professional fees used by the compliance calculator. */
export const FILING_FEES = {
  aoc4: 2499,
  mgt7: 2499,
  statutoryAudit: 8000,
  dirKyc: 699,
  secretarial: 4000,
  itr6: 3999,
  llpForm11: 2499,
  llpForm8: 3499,
  itr5: 2999,
  itr34: 1249,
  gstMonthly: 1250,
  gstQuarterly: 1750,
  adt1: 1999,
  gstr9: 3499,
  gstr9c: 5499,
  pfMonthly: 1250,
  esiMonthly: 999,
} as const;

/* ══════════════ fixed pass-through costs (₹) ══════════════ */

export const DSC_PER_PERSON = 2000; // Class 3, two-year validity (workbook C36)
export const NAME_RESERVATION = 1000; // SPICe+ Part A / RUN (workbook C31)
export const NAME_APPROVAL_COMPANY = 1000;
export const NAME_APPROVAL_LLP = 200; // RUN-LLP
export const PAN_TAN = 143; // workbook C30
export const GST_RATE = 0.18;

/* ══════════════ MCA / ROC ══════════════ */

/** Annual ROC filing fee per form (AOC-4, MGT-7, ADT-1) by capital. */
export function rocAnnualFee(capital: number): number {
  if (capital < 1_00_000) return 200;
  if (capital < 5_00_000) return 300;
  if (capital < 25_00_000) return 400;
  if (capital < 1_00_00_000) return 500;
  return 600;
}

/** FiLLiP filing fee by LLP capital contribution. */
export function llpFillipFee(contribution: number): number {
  if (contribution <= 1_00_000) return 500;
  if (contribution < 5_00_000) return 2_000;
  if (contribution < 10_00_000) return 4_000;
  return 5_000;
}

/** LLP Form 3 (agreement) filing fee by contribution. */
export function llpForm3Fee(contribution: number): number {
  if (contribution <= 1_00_000) return 50;
  if (contribution < 5_00_000) return 100;
  if (contribution < 10_00_000) return 150;
  return 200;
}

/** LLP annual return (Form 8 / Form 11) ROC fee by contribution. */
export function llpAnnualRocFee(contribution: number): number {
  if (contribution <= 1_00_000) return 50;
  if (contribution <= 5_00_000) return 100;
  if (contribution <= 10_00_000) return 150;
  if (contribution <= 25_00_000) return 200;
  if (contribution <= 1_00_00_000) return 400;
  return 600;
}

/** SH-7 fee to increase authorised capital, on the increase amount. */
export function increaseCapitalFee(fromCapital: number, toCapital: number): number {
  const slabFee = (capital: number) => {
    if (capital <= 1_00_000) return 5_000;
    if (capital <= 5_00_000) return 5_000 + Math.ceil((capital - 1_00_000) / 10_000) * 400;
    if (capital <= 10_00_000) return 21_000 + Math.ceil((capital - 5_00_000) / 10_000) * 300;
    if (capital <= 50_00_000) return 36_000 + Math.ceil((capital - 10_00_000) / 10_000) * 300;
    return 1_56_000 + Math.ceil((capital - 50_00_000) / 10_000) * 100;
  };
  return Math.max(0, slabFee(toCapital) - slabFee(fromCapital));
}

/* ══════════════ incorporation engine — CAA_Incorporation_Cost_Calculator_Final.xlsx ══════════════

   Ported cell-for-cell from the boss's workbook (3 sheets: Calculator, MCA Fees,
   Stamp Duty). That file is the authority — if it disagrees with anything here,
   the file wins. Verified: the workbook's own default case (₹15,00,000 capital,
   OPC/Small, Haryana, 2 DSC, name reservation, ₹3,499 professional fee) reproduces
   its stated grand total of ₹10,187 exactly.

   The two rules that matter commercially:
     1. MCA fee is NIL up to ₹15,00,000 authorised capital (G.S.R. 380(E)).
     2. GST applies ONLY to DSC + professional fees. MCA fees and stamp duty are
        recovered at actuals as a pure agent under Rule 33 of the CGST Rules, 2017
        and carry no GST.
*/

/** Authorised capital at or below which the MCA charges no incorporation fee. */
export const NIL_FEE_THRESHOLD = 15_00_000;

export type CompanyScale = "general" | "opcSmall";

/**
 * Registration fee on the Memorandum of Association — Rule 12, Table of Fees.
 * The concessional OPC/small-company scale only runs to ₹50,00,000 of nominal
 * capital; above that the general scale governs.
 */
export function moaRegistrationFee(capital: number, scale: CompanyScale): number {
  if (capital <= NIL_FEE_THRESHOLD) return 0;
  const up = (n: number) => Math.ceil(Math.max(0, n) / 10_000);
  if (scale === "opcSmall" && capital <= 50_00_000) {
    return 2_000 + 200 * up(capital - 10_00_000);
  }
  return (
    36_000 +
    Math.min(
      2_50_00_000,
      300 * up(Math.min(capital, 50_00_000) - 10_00_000) +
        100 * up(Math.min(capital, 1_00_00_000) - 50_00_000) +
        75 * up(capital - 1_00_00_000)
    )
  );
}

/** Filing fee for e-Form INC-32 (SPICe+) and the Articles of Association. */
export function incorporationFormFee(capital: number): number {
  if (capital <= NIL_FEE_THRESHOLD) return 0;
  if (capital <= 1_00_000) return 200;
  if (capital < 5_00_000) return 300;
  if (capital < 25_00_000) return 400;
  if (capital < 1_00_00_000) return 500;
  return 600;
}

/* ── state stamp duty (35 States / UTs) ── */

export type AoaRule = "FLAT" | "SLAB1L" | "PCT" | "BLOCK" | "KERALA";

export type StampRule = {
  name: string;
  /** Duty on e-Form INC-32 (₹) — payable even by Section 8 companies */
  eForm: number;
  /** Duty on the Memorandum (₹) */
  moa: number;
  rule: AoaRule;
  /** FLAT amount, or the lower slab for SLAB1L */
  p1?: number;
  /** Upper slab for SLAB1L (capital above ₹1,00,000) */
  p2?: number;
  /** PCT: fraction of authorised capital */
  rate?: number;
  min?: number;
  max?: number;
  /** BLOCK: ₹perBlock for every `block` of capital, or part thereof */
  block?: number;
  perBlock?: number;
  /** NIL = State exempts Section 8 from MOA and AOA duty; SAME = no exemption */
  sec8: "NIL" | "SAME";
  note: string;
};

export const STAMP_DUTY: StampRule[] = [
  { name: "Andaman and Nicobar Islands", eForm: 20, moa: 200, rule: "FLAT", p1: 300, sec8: "NIL", note: "Flat Rs. 300" },
  { name: "Andhra Pradesh", eForm: 20, moa: 500, rule: "PCT", rate: 0.0015, min: 1000, max: 500000, sec8: "SAME", note: "0.15% of authorised capital, min Rs. 1,000, max Rs. 5,00,000" },
  { name: "Arunachal Pradesh", eForm: 10, moa: 200, rule: "FLAT", p1: 500, sec8: "SAME", note: "Flat Rs. 500" },
  { name: "Assam", eForm: 15, moa: 200, rule: "FLAT", p1: 310, sec8: "SAME", note: "Flat Rs. 310" },
  { name: "Bihar", eForm: 20, moa: 500, rule: "PCT", rate: 0.0015, min: 1000, max: 500000, sec8: "NIL", note: "Higher of Rs. 1,000 or 0.15% of authorised capital, max Rs. 5,00,000" },
  { name: "Chandigarh", eForm: 3, moa: 500, rule: "FLAT", p1: 1000, sec8: "NIL", note: "Flat Rs. 1,000" },
  { name: "Chhattisgarh", eForm: 10, moa: 500, rule: "PCT", rate: 0.0015, min: 1000, max: 500000, sec8: "NIL", note: "Higher of Rs. 1,000 or 0.15% of authorised capital, max Rs. 5,00,000" },
  { name: "Dadra and Nagar Haveli", eForm: 1, moa: 15, rule: "FLAT", p1: 25, sec8: "NIL", note: "Flat Rs. 25" },
  { name: "Daman and Diu", eForm: 20, moa: 150, rule: "BLOCK", block: 500000, perBlock: 1000, max: 1000000000, sec8: "NIL", note: "Rs. 1,000 for every Rs. 5,00,000 of authorised capital or part thereof" },
  { name: "Delhi", eForm: 10, moa: 200, rule: "PCT", rate: 0.0015, min: 0, max: 2500000, sec8: "NIL", note: "0.15% of authorised capital, max Rs. 25,00,000" },
  { name: "Goa", eForm: 50, moa: 150, rule: "BLOCK", block: 500000, perBlock: 1000, max: 1000000000, sec8: "NIL", note: "Rs. 1,000 for every Rs. 5,00,000 of authorised capital or part thereof" },
  { name: "Gujarat", eForm: 20, moa: 100, rule: "PCT", rate: 0.005, min: 0, max: 1500000, sec8: "NIL", note: "0.5% of authorised capital, max Rs. 15,00,000 \u2014 cap raised from Rs. 5,00,000 by the Gujarat Stamp (Amendment) Act, 2025, Article 12 of Schedule I" },
  { name: "Haryana", eForm: 15, moa: 60, rule: "SLAB1L", p1: 60, p2: 120, sec8: "NIL", note: "Rs. 60 if authorised capital up to Rs. 1,00,000; Rs. 120 if above" },
  { name: "Himachal Pradesh", eForm: 3, moa: 60, rule: "SLAB1L", p1: 60, p2: 120, sec8: "NIL", note: "Rs. 60 if authorised capital up to Rs. 1,00,000; Rs. 120 if above" },
  { name: "Jammu and Kashmir", eForm: 10, moa: 150, rule: "SLAB1L", p1: 150, p2: 300, sec8: "NIL", note: "Rs. 150 if authorised capital up to Rs. 1,00,000; Rs. 300 if above" },
  { name: "Jharkhand", eForm: 5, moa: 63, rule: "FLAT", p1: 105, sec8: "NIL", note: "Flat Rs. 105" },
  { name: "Karnataka", eForm: 20, moa: 1000, rule: "BLOCK", block: 1000000, perBlock: 500, max: 1000000000, sec8: "NIL", note: "Rs. 500 for every Rs. 10,00,000 of authorised capital or part thereof" },
  { name: "Kerala", eForm: 25, moa: 1000, rule: "KERALA", sec8: "SAME", note: "Up to Rs. 10 lakh: Rs. 2,000; above Rs. 10 lakh up to Rs. 25 lakh: Rs. 5,000; above Rs. 25 lakh: 0.5% of authorised capital" },
  { name: "Lakshadweep", eForm: 25, moa: 500, rule: "FLAT", p1: 1000, sec8: "SAME", note: "Flat Rs. 1,000" },
  { name: "Madhya Pradesh", eForm: 50, moa: 2500, rule: "PCT", rate: 0.0015, min: 5000, max: 2500000, sec8: "SAME", note: "0.15% of authorised capital, min Rs. 5,000, max Rs. 25,00,000" },
  { name: "Maharashtra", eForm: 100, moa: 200, rule: "BLOCK", block: 500000, perBlock: 1000, max: 5000000, sec8: "NIL", note: "Rs. 1,000 for every Rs. 5,00,000 of authorised capital or part thereof, max Rs. 50,00,000" },
  { name: "Manipur", eForm: 10, moa: 100, rule: "FLAT", p1: 150, sec8: "SAME", note: "Flat Rs. 150" },
  { name: "Meghalaya", eForm: 10, moa: 100, rule: "FLAT", p1: 300, sec8: "SAME", note: "Flat Rs. 300" },
  { name: "Mizoram", eForm: 10, moa: 100, rule: "FLAT", p1: 150, sec8: "SAME", note: "Flat Rs. 150" },
  { name: "Nagaland", eForm: 10, moa: 100, rule: "FLAT", p1: 150, sec8: "SAME", note: "Flat Rs. 150" },
  { name: "Odisha", eForm: 10, moa: 300, rule: "FLAT", p1: 300, sec8: "SAME", note: "Flat Rs. 300" },
  { name: "Puducherry", eForm: 10, moa: 200, rule: "FLAT", p1: 300, sec8: "NIL", note: "Flat Rs. 300" },
  { name: "Punjab", eForm: 25, moa: 5000, rule: "SLAB1L", p1: 5000, p2: 10000, sec8: "NIL", note: "Rs. 5,000 if authorised capital up to Rs. 1,00,000; Rs. 10,000 if above" },
  { name: "Rajasthan", eForm: 10, moa: 500, rule: "PCT", rate: 0.005, min: 0, max: 1000000000, sec8: "SAME", note: "0.5% of authorised capital (no statutory cap stated in the source)" },
  { name: "Tamil Nadu", eForm: 20, moa: 200, rule: "FLAT", p1: 300, sec8: "NIL", note: "Flat Rs. 300" },
  { name: "Telangana", eForm: 20, moa: 500, rule: "PCT", rate: 0.0015, min: 1000, max: 500000, sec8: "SAME", note: "0.15% of authorised capital, min Rs. 1,000, max Rs. 5,00,000" },
  { name: "Tripura", eForm: 10, moa: 100, rule: "FLAT", p1: 150, sec8: "SAME", note: "Flat Rs. 150" },
  { name: "Uttar Pradesh", eForm: 10, moa: 500, rule: "FLAT", p1: 500, sec8: "SAME", note: "Flat Rs. 500" },
  { name: "Uttarakhand", eForm: 10, moa: 500, rule: "FLAT", p1: 500, sec8: "SAME", note: "Flat Rs. 500" },
  { name: "West Bengal", eForm: 10, moa: 60, rule: "FLAT", p1: 300, sec8: "NIL", note: "Flat Rs. 300" },
];

export const STATE_NAMES = STAMP_DUTY.map((s) => s.name);

export function getStampRule(state: string): StampRule {
  return STAMP_DUTY.find((s) => s.name === state) ?? STAMP_DUTY.find((s) => s.name === "Delhi")!;
}

/** Stamp duty on the Articles of Association at a given authorised capital. */
export function aoaStampDuty(r: StampRule, capital: number): number {
  switch (r.rule) {
    case "FLAT":
      return r.p1 ?? 0;
    case "SLAB1L":
      return capital <= 1_00_000 ? (r.p1 ?? 0) : (r.p2 ?? 0);
    case "PCT":
      return Math.min(r.max ?? Infinity, Math.max(capital * (r.rate ?? 0), r.min ?? 0));
    case "BLOCK":
      return Math.min(Math.ceil(capital / (r.block ?? 1)) * (r.perBlock ?? 0), r.max ?? Infinity);
    case "KERALA":
      return capital <= 10_00_000 ? 2_000 : capital <= 25_00_000 ? 5_000 : capital * 0.005;
  }
}

/** All three stamp-duty components for a company incorporation. */
export function companyStampDuty(state: string, capital: number, isSection8 = false) {
  const r = getStampRule(state);
  const exempt = isSection8 && r.sec8 === "NIL";
  const moa = exempt ? 0 : r.moa;
  const aoa = exempt ? 0 : Math.round(aoaStampDuty(r, capital));
  return { eForm: r.eForm, moa, aoa, total: r.eForm + moa + aoa, rule: r, exempt };
}

/* ── the full engine, mirroring the workbook's sections A–G ── */

export type IncorpInput = {
  capital: number;
  scale: CompanyScale;
  state: string;
  isSection8?: boolean;
  /** SPICe+ Part A / RUN — ₹1,000, not payable if the name is reserved in Part B */
  nameReservation?: boolean;
  dscCount: number;
  professionalFee: number;
};

export function incorporationCost(i: IncorpInput) {
  const moaFee = moaRegistrationFee(i.capital, i.scale);
  const formFee = incorporationFormFee(i.capital);
  const mcaTotal = moaFee + formFee;

  const sd = companyStampDuty(i.state, i.capital, i.isSection8);

  const nameFee = i.nameReservation === false ? 0 : NAME_RESERVATION;
  const otherTotal = PAN_TAN + nameFee;

  const dscTotal = i.dscCount * DSC_PER_PERSON;
  const taxable = dscTotal + i.professionalFee;
  const gst = Math.round(taxable * GST_RATE);
  const passThrough = mcaTotal + sd.total + otherTotal;

  return {
    moaFee, formFee, mcaTotal,
    stamp: sd,
    panTan: PAN_TAN, nameFee, otherTotal,
    dscTotal, professionalFee: i.professionalFee,
    taxable, gst, passThrough,
    total: passThrough + taxable + gst,
  };
}

/**
 * LLP Agreement stamp duty — INDICATIVE ONLY.
 * The workbook covers companies having share capital; it says nothing about LLPs.
 * Replace this the moment an authoritative LLP schedule arrives.
 */
export function llpAgreementStampDuty(contribution: number): number {
  return Math.min(10_000, Math.max(500, Math.round(contribution * 0.01)));
}

/* ══════════════ trademark ══════════════ */

export type TMApplicant = "individual" | "msme" | "startup" | "company";

/** Government fee per class, e-filing (Form TM-A). */
export function trademarkGovtFee(applicant: TMApplicant): number {
  return applicant === "company" ? 9_000 : 4_500;
}

export const TRADEMARK_FEES = {
  renewal: 9_000,
  lateRenewalSurcharge: 4_500,
  restoration: 9_000,
  oppositionNotice: 2_700,
} as const;

/* ══════════════ FSSAI ══════════════ */

export type FssaiTier = "basic" | "state" | "central";

export const FSSAI = {
  basic: { label: "Basic Registration", govtPerYear: 100, pro: 3_499, limit: "Turnover under ₹12 lakh" },
  state: { label: "State Licence", govtPerYear: 3_000, pro: 8_999, limit: "₹12 lakh to ₹20 crore" },
  central: { label: "Central Licence", govtPerYear: 7_500, pro: 12_499, limit: "Above ₹20 crore, importers & exporters" },
} as const;

/* ══════════════ misc government fees ══════════════ */

export const GOVT_FEES = {
  gstRegistration: 0,
  udyam: 0,
  iec: 500,
  dirKycLate: 5_000,
  strikeOffStk2: 10_000,
  section8Licence: 2_000,
} as const;

/* ══════════════ formatting ══════════════ */

export function inr(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}
