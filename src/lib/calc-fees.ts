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
 *  - Professional fees: setindiabiz entry-plan + ₹500 (see lib/pricing.ts header)
 *  - MCA incorporation fee: nil up to ₹15L authorised capital, then slabs
 *    (Companies (Registration Offices and Fees) Rules, 2014)
 *  - LLP government fees: setindiabiz published FiLLiP/PAN/TAN/Form-3 table
 *  - Stamp duty: state Stamp Act schedules (taxguru consolidated table), with
 *    Karnataka and Tamil Nadu on their revised 2024 AOA rates
 *  - Trademark: First Schedule, Trade Marks Rules 2017
 */

/* ══════════════ our professional fees (₹) ══════════════ */

export const PRO_FEES = {
  "private-limited-company": 2999,
  "llp-registration": 2999,
  "one-person-company": 2999,
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

export const DSC_PER_PERSON = 1500;
export const NAME_APPROVAL_COMPANY = 1000; // SPICe+ Part A / RUN
export const NAME_APPROVAL_LLP = 200; // RUN-LLP
export const PAN_TAN = 131;
export const GST_RATE = 0.18;

/* ══════════════ MCA / ROC ══════════════ */

/**
 * SPICe+ incorporation fee by authorised capital.
 * Nil up to ₹15 lakh — the exemption most startups fall under.
 */
export function mcaIncorporationFee(authorisedCapital: number): number {
  if (authorisedCapital <= 15_00_000) return 0;
  if (authorisedCapital <= 25_00_000) return 2_000;
  if (authorisedCapital <= 1_00_00_000) return 4_000;
  return 6_000;
}

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

/* ══════════════ stamp duty ══════════════ */

export type StampRule = {
  name: string;
  /** MOA stamp duty in ₹ */
  moa: number;
  /** AOA stamp duty, computed from authorised capital */
  aoa: (capital: number) => number;
  /** LLP Agreement stamp duty, computed from contribution */
  llp: (contribution: number) => number;
};

const pct = (rate: number, min = 0, max = Infinity) => (c: number) =>
  Math.min(max, Math.max(min, Math.round((c * rate) / 100)));

/** ₹`unit` for every `per` rupees of capital, or part thereof. */
const perSlab = (unit: number, per: number, max = Infinity) => (c: number) =>
  Math.min(max, Math.ceil(Math.max(c, 1) / per) * unit);

/** Common LLP agreement duty: 1% of contribution within a band. */
const llpPct = (rate: number, min: number, max: number) => (c: number) =>
  Math.min(max, Math.max(min, Math.round((c * rate) / 100)));

export const STAMP_DUTY: StampRule[] = [
  { name: "Delhi",             moa: 200,  aoa: pct(0.15, 0, 25_00_000), llp: llpPct(1, 500, 5_000) },
  { name: "Maharashtra",       moa: 200,  aoa: perSlab(1_000, 5_00_000, 50_00_000), llp: llpPct(1, 500, 15_000) },
  { name: "Karnataka",         moa: 1_000, aoa: perSlab(5_000, 10_00_000), llp: llpPct(1, 1_000, 10_000) },
  { name: "Tamil Nadu",        moa: 200,  aoa: perSlab(500, 10_00_000), llp: llpPct(1, 300, 10_000) },
  { name: "Telangana",         moa: 500,  aoa: pct(0.15, 1_000, 5_00_000), llp: llpPct(1, 500, 10_000) },
  { name: "Andhra Pradesh",    moa: 500,  aoa: pct(0.15, 1_000, 5_00_000), llp: llpPct(1, 500, 10_000) },
  { name: "Gujarat",           moa: 100,  aoa: pct(0.5, 0, 5_00_000), llp: llpPct(1, 1_000, 10_000) },
  { name: "Uttar Pradesh",     moa: 500,  aoa: () => 500, llp: llpPct(1, 750, 10_000) },
  { name: "West Bengal",       moa: 60,   aoa: () => 300, llp: llpPct(1, 300, 10_000) },
  { name: "Rajasthan",         moa: 500,  aoa: pct(0.5, 500, 10_00_000), llp: llpPct(1, 4_000, 10_000) },
  { name: "Madhya Pradesh",    moa: 2_500, aoa: pct(0.15, 5_000, 25_00_000), llp: llpPct(1, 2_000, 10_000) },
  { name: "Haryana",           moa: 60,   aoa: (c) => (c <= 1_00_000 ? 60 : 120), llp: llpPct(1, 1_000, 10_000) },
  { name: "Punjab",            moa: 5_000, aoa: (c) => (c <= 1_00_000 ? 5_000 : 10_000), llp: llpPct(1, 1_000, 10_000) },
  { name: "Kerala",            moa: 1_000, aoa: (c) => (c <= 10_00_000 ? 2_000 : c <= 25_00_000 ? 5_000 : Math.round(c * 0.005)), llp: llpPct(1, 5_000, 10_000) },
  { name: "Bihar",             moa: 500,  aoa: pct(0.15, 1_000, 5_00_000), llp: llpPct(1, 2_500, 10_000) },
  { name: "Odisha",            moa: 300,  aoa: () => 300, llp: llpPct(1, 200, 10_000) },
  { name: "Jharkhand",         moa: 63,   aoa: () => 105, llp: llpPct(1, 2_500, 10_000) },
  { name: "Chhattisgarh",      moa: 500,  aoa: pct(0.15, 1_000, 5_00_000), llp: llpPct(1, 2_000, 10_000) },
  { name: "Assam",             moa: 200,  aoa: () => 310, llp: llpPct(1, 100, 10_000) },
  { name: "Himachal Pradesh",  moa: 60,   aoa: () => 60, llp: llpPct(1, 1_000, 10_000) },
  { name: "Uttarakhand",       moa: 500,  aoa: () => 500, llp: llpPct(1, 750, 10_000) },
  { name: "Goa",               moa: 150,  aoa: () => 1_000, llp: llpPct(1, 150, 10_000) },
  { name: "Sikkim",            moa: 0,    aoa: () => 0, llp: () => 0 },
  { name: "Other State / UT",  moa: 200,  aoa: pct(0.15, 200, 5_00_000), llp: llpPct(1, 500, 10_000) },
];

export function getStampRule(state: string): StampRule {
  return STAMP_DUTY.find((s) => s.name === state) ?? STAMP_DUTY[STAMP_DUTY.length - 1];
}

/** Total company incorporation stamp duty (MOA + AOA) for a state. */
export function companyStampDuty(state: string, authorisedCapital: number): number {
  const r = getStampRule(state);
  return r.moa + r.aoa(authorisedCapital);
}

export const STATE_NAMES = STAMP_DUTY.map((s) => s.name);

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
