/**
 * Fee constants and government-fee maths shared by the calculators and by
 * `lib/pricing.ts`.
 *
 * SELF-CONTAINED — this module imports nothing, so client calculators can pull
 * it in without dragging the whole pricing content graph into their bundle.
 * `lib/pricing.ts` imports PRO_FEES from here, which makes this file the single
 * numeric source of truth for what we charge.
 *
 * Sources (verified 2026-08-27 against the three workbooks below):
 *  - CAA_Incorporation_Cost_Calculator_v2 (2).xlsx — the authority for MCA fees,
 *    state stamp duty, DSC, PAN/TAN, GST scope, the capital-slab professional fee
 *    card, add-on rates, the standalone fee schedule, Section 8 optional services
 *    and the two-stage Startup India engagement
 *  - CAA_LLP_Cost_Calculator_v2.xlsx — LLP MCA fee bands, DPIN, franking/notary
 *    and the State-wise LLP agreement stamp duty table
 *  - Company_Closure_Exit (1).xlsx — the closure and exit fee card. Where it and
 *    the incorporation workbook's "Other Services Standalone" sheet disagree on a
 *    closure line, THIS FILE WINS (client direction, 27 Aug 2026).
 *  - MCA incorporation fee: nil up to ₹15L authorised capital, then slabs
 *    (Companies (Registration Offices and Fees) Rules, 2014)
 *  - LLP government fees: setindiabiz published FiLLiP/PAN/TAN/Form-3 table
 *  - Stamp duty: state Stamp Act schedules (taxguru consolidated table), with
 *    Karnataka and Tamil Nadu on their revised 2024 AOA rates
 *  - Trademark: First Schedule, Trade Marks Rules 2017
 */

/* ══════════════ our professional fees (₹) ══════════════ */

export const PRO_FEES = {
  /* ── entity formation ── */
  // Incorporation is priced off INCORP_FEE_CARD below; these are the headline
  // figures at the lowest slab (authorised capital up to ₹1,00,000) WITH name
  // approval, which is what the workbook's own default quote uses.
  "private-limited-company": 3499,
  "llp-registration": 3499, // LLP workbook, Calculator!C12
  "one-person-company": 3499,
  "partnership-firm": 4999, // PFIRM — registered firm incl. deed
  "sole-proprietorship": 2999, // PROP — Udyam + GST + bank file
  "section-8-company": 7999,
  "indian-subsidiary": 31499,
  "nbfc-registration": 5499,
  "microfinance-company": 5499,

  /* ── tax & GST ── */
  "gst-registration": 2999, // standalone; ₹999 when bundled with incorporation
  "gst-filing": 1250,
  "gst-amendment": 1499, // GST-AMD
  "gst-lut-filing": 999, // GST-LUT, per year
  "income-tax-return": 1249,
  "llp-annual-filing": 2499,
  "agm-services": 6499,

  /* ── ROC event filings ── */
  "change-in-directors": 1999, // DIR12
  "director-kyc": 499, // DIR3KYC, per director
  "increase-authorised-capital": 4999, // SH7
  "share-transfer": 3499, // SH4
  "registered-office-change": 2999, // RO-CITY (same city)
  "company-name-change": 9999, // INC24
  "post-incorporation-compliance": 1999, // INC-20A / ADT-1 event filings

  /* ── closure & exit — Company_Closure_Exit workbook ── */
  "company-closure": 20000, // STK-2 end to end

  /* ── licences & registrations ── */
  "fssai-license": 3999,
  "drug-license": 5499,
  "psara-license": 25500,
  "barcode-registration": 7499,
  "msme-registration": 1999, // Udyam
  "iec-registration": 1999,
  "startup-india": 7999, // DPIIT recognition
  "professional-tax": 2999,
  "shops-establishment": 3999, // Delhi
  "12a-80g-registration": 9999, // Form 104 — provisional 12A + 80G

  /* ── intellectual property ── */
  "trademark-registration": 3499, // per class, standalone
  "trademark-objection": 7999, // TM-OBJ
  "trademark-renewal": 4999, // TM-REN, per class
  "copyright-registration": 7999, // COPY
  "design-registration": 9999, // DESIGN

  /* ── HR & payroll ── */
  "pf-registration": 2999, // PF + ESIC activation
  "esic-registration": 2999,
  "payroll-management": 2000,

  /* ── accounting & advisory ── */
  "accounting-bookkeeping": 2999,
  "virtual-cfo": 24999, // VCFO, per month
  "business-valuation": 4999, // VALCO — valuer report coordination
} as const;

/* ══════════════ incorporation professional fee card ══════════════

   'Professional Fees Calculator' tab of CAA_Incorporation_Cost_Calculator_v2.
   The header reads "Authorised Capital up to (Rs.)", so each row is a CEILING:
   the fee applies to capital at or below that figure. Capital under the lowest
   slab takes the lowest slab; capital over ₹50,00,000 is off the card and is
   quoted separately — we return the top slab and flag it.
*/

export type IncorpFeeSlab = {
  /** Authorised capital at or below which this fee applies (₹) */
  upTo: number;
  /** Fee where the client already holds an approved name */
  without: number;
  /** Fee including SPICe+ Part A / RUN name approval */
  withName: number;
};

export const INCORP_FEE_CARD: IncorpFeeSlab[] = [
  { upTo: 1_00_000, without: 2999, withName: 3499 },
  { upTo: 5_00_000, without: 3499, withName: 3999 },
  { upTo: 10_00_000, without: 3999, withName: 4499 },
  { upTo: 15_00_000, without: 4499, withName: 4999 },
  { upTo: 25_00_000, without: 4999, withName: 5499 },
  { upTo: 50_00_000, without: 5499, withName: 5999 },
];

/** Capital above this is not covered by the fee card — quote separately. */
export const FEE_CARD_CEILING = 50_00_000;

/** Our incorporation professional fee for a given authorised capital. */
export function incorporationProfessionalFee(capital: number, nameApproval = true) {
  const slab =
    INCORP_FEE_CARD.find((r) => capital <= r.upTo) ?? INCORP_FEE_CARD[INCORP_FEE_CARD.length - 1];
  return {
    fee: nameApproval ? slab.withName : slab.without,
    slab,
    /** true = capital is off the card and the fee shown is the top slab */
    onQuotation: capital > FEE_CARD_CEILING,
  };
}

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

/* LLP fee bands — 'MCA Fees LLP' tab of CAA_LLP_Cost_Calculator_v2. The tab's
   band lower bounds are 0 / 1,00,001 / 5,00,001 / 10,00,001, so each band is
   INCLUSIVE of its upper figure. The old `< 5_00_000` / `< 10_00_000` tests
   overcharged at exactly ₹5,00,000 and ₹10,00,000 — corrected to `<=`. */

/** FiLLiP filing fee by LLP capital contribution. */
export function llpFillipFee(contribution: number): number {
  if (contribution <= 1_00_000) return 500;
  if (contribution <= 5_00_000) return 2_000;
  if (contribution <= 10_00_000) return 4_000;
  return 5_000;
}

/** LLP Form 3 (agreement) filing fee by contribution. */
export function llpForm3Fee(contribution: number): number {
  if (contribution <= 1_00_000) return 50;
  if (contribution <= 5_00_000) return 100;
  if (contribution <= 10_00_000) return 150;
  return 200;
}

/** DPIN / DIN allotment, per designated partner who does not already hold one. */
export const LLP_DPIN_FEE = 500;

/** Franking, stamp-paper procurement and notarisation of the LLP agreement. */
export const LLP_FRANKING_NOTARY = 1799;

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

/* ══════════════ LLP agreement stamp duty ══════════════

   'LLP Stamp Duty' tab of CAA_LLP_Cost_Calculator_v2. Unlike a company, the LLP
   agreement is a physical instrument executed on stamp paper — this is a real
   stamp-paper cost, and LLP_FRANKING_NOTARY sits on top of it.

   Thirteen States and UTs carry NO figure in the source (the workbook groups the
   north-eastern States and several UTs together without an amount). Those are
   coded "VERIFY" and the engine returns null rather than inventing a number.
*/

export type LlpStampBasis = "FLAT" | "PERCENT" | "SLAB-KA" | "VERIFY";

export type LlpStampRule = {
  name: string;
  basis: LlpStampBasis;
  /** FLAT: the amount. PERCENT: the fraction. SLAB-KA: the base amount. */
  amount: number;
  min?: number;
  /** 0 / undefined = no statutory cap stated in the source */
  max?: number;
  note: string;
};

export const LLP_STAMP_DUTY: LlpStampRule[] = [
  { name: "Andaman and Nicobar Islands", basis: "VERIFY", amount: 0, note: "Not separately stated in the source" },
  { name: "Andhra Pradesh", basis: "FLAT", amount: 500, note: "Flat ₹500 for any capital amount" },
  { name: "Arunachal Pradesh", basis: "VERIFY", amount: 0, note: "Grouped under 'all other NE States and UTs' with no figure" },
  { name: "Assam", basis: "FLAT", amount: 100, note: "Flat ₹100 for any capital amount" },
  { name: "Bihar", basis: "FLAT", amount: 5000, note: "Flat ₹5,000 for any capital amount" },
  { name: "Chandigarh", basis: "VERIFY", amount: 0, note: "Grouped under 'all other States and UTs' with no figure" },
  { name: "Chhattisgarh", basis: "FLAT", amount: 100, note: "Flat ₹100 for any capital amount" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", basis: "VERIFY", amount: 0, note: "Not separately stated in the source" },
  { name: "Delhi", basis: "PERCENT", amount: 0.01, min: 200, max: 5000, note: "1% of capital contribution, minimum ₹200, maximum ₹5,000" },
  { name: "Goa", basis: "FLAT", amount: 150, note: "Flat ₹150 for any capital amount" },
  { name: "Gujarat", basis: "PERCENT", amount: 0.01, min: 1000, max: 10000, note: "1% of capital contribution, minimum ₹1,000, maximum ₹10,000" },
  { name: "Haryana", basis: "FLAT", amount: 1000, note: "Flat ₹1,000 for any capital amount" },
  { name: "Himachal Pradesh", basis: "FLAT", amount: 100, note: "Flat ₹100 for any capital amount" },
  { name: "Jammu and Kashmir", basis: "FLAT", amount: 100, note: "Flat ₹100 for any capital amount" },
  { name: "Jharkhand", basis: "FLAT", amount: 100, note: "Flat ₹100 for any capital amount" },
  { name: "Karnataka", basis: "SLAB-KA", amount: 5000, note: "₹5,000 up to ₹10 lakh, then ₹5,000 plus ₹1,000 for every additional ₹5 lakh" },
  { name: "Kerala", basis: "FLAT", amount: 5000, note: "Flat ₹5,000 for any capital amount" },
  { name: "Ladakh", basis: "VERIFY", amount: 0, note: "Not separately stated in the source" },
  { name: "Lakshadweep", basis: "VERIFY", amount: 0, note: "Not separately stated in the source" },
  { name: "Madhya Pradesh", basis: "PERCENT", amount: 0.02, min: 2000, max: 10000, note: "2% of capital contribution, minimum ₹2,000, maximum ₹10,000" },
  { name: "Maharashtra", basis: "PERCENT", amount: 0.01, min: 500, max: 15000, note: "1% of capital contribution, minimum ₹500, maximum ₹15,000" },
  { name: "Manipur", basis: "VERIFY", amount: 0, note: "Grouped under 'all other NE States and UTs' with no figure" },
  { name: "Meghalaya", basis: "VERIFY", amount: 0, note: "Grouped under 'all other NE States and UTs' with no figure" },
  { name: "Mizoram", basis: "VERIFY", amount: 0, note: "Grouped under 'all other NE States and UTs' with no figure" },
  { name: "Nagaland", basis: "VERIFY", amount: 0, note: "Grouped under 'all other NE States and UTs' with no figure" },
  { name: "Odisha", basis: "FLAT", amount: 100, note: "Flat ₹100 for any capital amount" },
  { name: "Puducherry", basis: "VERIFY", amount: 0, note: "Grouped under 'all other States and UTs' with no figure" },
  { name: "Punjab", basis: "FLAT", amount: 1000, note: "Flat ₹1,000 for any capital amount" },
  { name: "Rajasthan", basis: "PERCENT", amount: 0.01, min: 2000, max: 10000, note: "Approximately 0.5% to 1% on capital slabs, minimum ₹2,000, maximum ₹10,000 — the higher 1% is applied" },
  { name: "Sikkim", basis: "VERIFY", amount: 0, note: "Grouped under 'all other NE States and UTs' with no figure" },
  { name: "Tamil Nadu", basis: "FLAT", amount: 300, note: "Flat ₹300 for any capital amount" },
  { name: "Telangana", basis: "FLAT", amount: 300, note: "₹100 to ₹300 depending on local notary and slabs — the higher ₹300 is applied" },
  { name: "Tripura", basis: "VERIFY", amount: 0, note: "Grouped under 'all other NE States and UTs' with no figure" },
  { name: "Uttar Pradesh", basis: "FLAT", amount: 750, note: "Flat ₹750 for any capital amount" },
  { name: "Uttarakhand", basis: "FLAT", amount: 100, note: "Flat ₹100 for any capital amount" },
  { name: "West Bengal", basis: "FLAT", amount: 150, note: "Flat ₹150 for any capital amount" },
];

/* The company stamp-duty table lists Dadra and Nagar Haveli and Daman and Diu
   separately; the LLP table carries the merged UT. Map the old names across so a
   single State dropdown drives both engines. */
const LLP_STATE_ALIASES: Record<string, string> = {
  "Dadra and Nagar Haveli": "Dadra and Nagar Haveli and Daman and Diu",
  "Daman and Diu": "Dadra and Nagar Haveli and Daman and Diu",
};

export const LLP_STATE_NAMES = LLP_STAMP_DUTY.map((s) => s.name);

export function getLlpStampRule(state: string): LlpStampRule | null {
  const name = LLP_STATE_ALIASES[state] ?? state;
  return LLP_STAMP_DUTY.find((s) => s.name === name) ?? null;
}

/**
 * Stamp duty on the LLP agreement at a given total capital contribution.
 * Returns `null` where the source carries no figure for the State — the caller
 * must show "verify" rather than a number.
 */
export function llpAgreementStampDuty(contribution: number, state = "Delhi"): number | null {
  const r = getLlpStampRule(state);
  if (!r || r.basis === "VERIFY") return null;
  switch (r.basis) {
    case "FLAT":
      return r.amount;
    case "PERCENT": {
      const cap = r.max && r.max > 0 ? r.max : Infinity;
      return Math.round(Math.min(cap, Math.max(contribution * r.amount, r.min ?? 0)));
    }
    case "SLAB-KA":
      return r.amount + 1_000 * Math.ceil(Math.max(0, contribution - 10_00_000) / 5_00_000);
  }
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
  basic: { label: "Basic Registration", govtPerYear: 100, pro: 3_999, limit: "Turnover under ₹12 lakh" },
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

/* ══════════════ add-on services ══════════════

   'Add on cost' tab of CAA_Incorporation_Cost_Calculator_v2. Two rates per line:
   the standalone fee, and the lower fee that applies when the service is bought
   alongside an incorporation. Government fees, where payable, are extra.
*/

export type AddOnService = {
  id: string;
  label: string;
  /** Fee when bought on its own (₹), or null where it is priced on quotation */
  standalone: number | null;
  /** Fee when bundled with an incorporation (₹) */
  bundled: number | null;
};

export const ADDON_SERVICES: AddOnService[] = [
  { id: "gst-registration", label: "GST registration (online — no physical visit included)", standalone: 2999, bundled: 999 },
  { id: "inc-20a", label: "Declaration of commencement of business (INC-20A)", standalone: 1999, bundled: 1499 },
  { id: "adt-1", label: "Appointment of first auditor (ADT-1)", standalone: 1999, bundled: 1499 },
  { id: "udyam", label: "Udyam / MSME registration", standalone: 1999, bundled: 999 },
  { id: "iec", label: "Import Export Code (IEC)", standalone: 1999, bundled: 1499 },
  { id: "shops-establishment", label: "Shops and Establishment registration, Delhi", standalone: 3999, bundled: 2999 },
  { id: "pf-esic", label: "Provident Fund and ESIC activation", standalone: 2999, bundled: 2499 },
  { id: "professional-tax", label: "Professional Tax registration (applicable States only)", standalone: 2999, bundled: 2499 },
  { id: "dpiit", label: "Startup India / DPIIT recognition", standalone: 7999, bundled: 6999 },
  { id: "grant-pack", label: "Startup grant readiness pack — readiness report, pitch deck and grant application filing", standalone: 9999, bundled: 9599 },
  { id: "80iac", label: "Section 80-IAC exemption application", standalone: 24999, bundled: 22999 },
  { id: "darpan", label: "NITI Aayog Darpan ID", standalone: 1999, bundled: 1499 },
  { id: "12a-provisional", label: "Income tax registration under section 12A (provisional)", standalone: 9999, bundled: 8999 },
  { id: "trademark", label: "Trademark application (per class)", standalone: 3499, bundled: 2499 },
  { id: "fssai", label: "FSSAI registration or licence", standalone: 3999, bundled: 3499 },
  { id: "fcra", label: "FCRA registration", standalone: null, bundled: null },
];

/* ══════════════ standalone fee schedule ══════════════

   'Other Services Standalone' tab of CAA_Incorporation_Cost_Calculator_v2.
   Professional fees exclusive of GST at 18%. Government fees, where payable, are
   additional and recovered at actuals.

   NOTE: the five Closure & Exit rows on that tab are superseded by CLOSURE_FEES
   below, which comes from the dedicated Company_Closure_Exit workbook.
*/

export type StandaloneFee = {
  code: string;
  category: string;
  service: string;
  /** "Per engagement", "Per filing", "Per director", … */
  basis: string;
  /** ₹, or null where the line is priced on quotation */
  fee: number | null;
  /** true = the figure is a floor ("₹24,999 onwards") */
  onwards?: boolean;
  note?: string;
};

export const STANDALONE_FEES: StandaloneFee[] = [
  { code: "PFIRM", category: "Entity Formation", service: "Registered Partnership Firm incl. deed", basis: "Per engagement", fee: 4999 },
  { code: "PROP", category: "Entity Formation", service: "Sole Proprietorship setup pack", basis: "Per engagement", fee: 2999, note: "Udyam + GST + bank file" },

  { code: "ADD-DIR", category: "Adders", service: "Each director or subscriber beyond two", basis: "Per person", fee: 1499 },
  { code: "ADD-NRI", category: "Adders", service: "Non-resident director document handling", basis: "Per person", fee: 4999, note: "Apostille / notarisation coordination" },
  { code: "ADD-BC", category: "Adders", service: "Body corporate as subscriber", basis: "Per subscriber", fee: 3499 },
  { code: "ADD-REG", category: "Adders", service: "Regulated or restricted objects wording", basis: "Per engagement", fee: 4999 },
  { code: "ADD-NAME", category: "Adders", service: "Fresh name reservation after both attempts lapse", basis: "Per attempt", fee: 999, note: "Plus government fee at actuals" },
  { code: "ADD-RO", category: "Adders", service: "Leased / virtual registered office proofs", basis: "Per engagement", fee: 1499 },

  { code: "DSC-IND", category: "Digital Signature", service: "Class 3 DSC — individual, 2 year, with token", basis: "Per certificate", fee: 2000 },
  { code: "DSC-ORG", category: "Digital Signature", service: "Class 3 DSC — organisation / encryption", basis: "Per certificate", fee: 2499 },
  { code: "DSC-RE", category: "Digital Signature", service: "DSC re-issue on loss or revocation", basis: "Per certificate", fee: 2000 },

  { code: "DIR12", category: "ROC Event Filings", service: "Appointment or resignation of director (DIR-12)", basis: "Per filing", fee: 1999 },
  { code: "DIR3KYC", category: "ROC Event Filings", service: "Director KYC (DIR-3 KYC)", basis: "Per director", fee: 499 },
  { code: "SH7", category: "ROC Event Filings", service: "Increase in authorised share capital (SH-7)", basis: "Per filing", fee: 4999 },
  { code: "PAS3", category: "ROC Event Filings", service: "Allotment of shares (PAS-3)", basis: "Per filing", fee: 4999 },
  { code: "SH4", category: "ROC Event Filings", service: "Transfer of shares (SH-4)", basis: "Per transfer", fee: 3499, note: "Incl. stamping guidance" },
  { code: "MGT14", category: "ROC Event Filings", service: "Filing of special resolution (MGT-14)", basis: "Per filing", fee: 1999 },
  { code: "CHG1", category: "ROC Event Filings", service: "Creation or modification of charge (CHG-1)", basis: "Per filing", fee: 3499 },
  { code: "CHG4", category: "ROC Event Filings", service: "Satisfaction of charge (CHG-4)", basis: "Per filing", fee: 3499 },
  { code: "RO-CITY", category: "ROC Event Filings", service: "Change of registered office — same city", basis: "Per engagement", fee: 2999 },
  { code: "RO-ROC", category: "ROC Event Filings", service: "Change of registered office — same State, new ROC", basis: "Per engagement", fee: 9999 },
  { code: "RO-STATE", category: "ROC Event Filings", service: "Change of registered office — State to State", basis: "Per engagement", fee: null },
  { code: "INC24", category: "ROC Event Filings", service: "Change of company name (INC-24)", basis: "Per engagement", fee: 9999 },
  { code: "OBJ-ALT", category: "ROC Event Filings", service: "Alteration of objects clause", basis: "Per engagement", fee: 7999 },
  { code: "AOA-NEW", category: "ROC Event Filings", service: "Adoption of new set of Articles", basis: "Per engagement", fee: 4999 },

  { code: "GST-AMD", category: "GST", service: "Amendment to registration particulars", basis: "Per amendment", fee: 1499 },
  { code: "GST-LUT", category: "GST", service: "Letter of Undertaking filing", basis: "Per year", fee: 999 },

  { code: "FCGPR", category: "FEMA & Cross-Border", service: "FC-GPR reporting of share issue to non-resident", basis: "Per filing", fee: 14999 },
  { code: "FCTRS", category: "FEMA & Cross-Border", service: "FC-TRS reporting of share transfer", basis: "Per filing", fee: 14999 },
  { code: "FLA", category: "FEMA & Cross-Border", service: "Annual Return on Foreign Liabilities and Assets", basis: "Per year", fee: 7999 },
  { code: "ODI", category: "FEMA & Cross-Border", service: "Overseas Direct Investment reporting", basis: "Per filing", fee: 24999 },
  { code: "ECB", category: "FEMA & Cross-Border", service: "External Commercial Borrowing reporting", basis: "Per filing", fee: 19999 },
  { code: "FIRMS", category: "FEMA & Cross-Border", service: "Entity Master and Business User registration", basis: "Per entity", fee: 4999 },
  { code: "VALCO", category: "FEMA & Cross-Border", service: "Valuer / merchant banker report coordination", basis: "Per report", fee: 4999, note: "Plus valuer fee at actuals" },

  { code: "TM-SRCH", category: "Intellectual Property", service: "Trademark search and written opinion", basis: "Per mark", fee: 1499 },
  { code: "TM-OBJ", category: "Intellectual Property", service: "Reply to examination report or objection", basis: "Per reply", fee: 7999 },
  { code: "TM-HEAR", category: "Intellectual Property", service: "Attendance at show cause hearing", basis: "Per hearing", fee: 9999 },
  { code: "TM-REN", category: "Intellectual Property", service: "Trademark renewal", basis: "Per class", fee: 4999 },
  { code: "COPY", category: "Intellectual Property", service: "Copyright registration", basis: "Per work", fee: 7999 },
  { code: "DESIGN", category: "Intellectual Property", service: "Design registration", basis: "Per design", fee: 9999 },

  { code: "FA", category: "Drafting", service: "Founders' or shareholders' agreement", basis: "Per agreement", fee: 14999, note: "Incl. 1 revision round; further rounds ₹4,999 each" },
  { code: "ESOP", category: "Drafting", service: "ESOP scheme, grant letters and trust deed", basis: "Per scheme", fee: 49999 },
  { code: "NDA", category: "Drafting", service: "Non-disclosure agreement", basis: "Per agreement", fee: 2999 },
  { code: "EMP", category: "Drafting", service: "Employment agreement set", basis: "Per set", fee: 7999 },
  { code: "VEND", category: "Drafting", service: "Vendor, service or consultancy agreement", basis: "Per agreement", fee: 7999 },
  { code: "HRPOL", category: "Drafting", service: "HR policy handbook", basis: "Per handbook", fee: 14999 },
  { code: "WEBPOL", category: "Drafting", service: "Website privacy, terms and refund policy", basis: "Per set", fee: 4999 },
  { code: "RESOL", category: "Drafting", service: "Board or shareholder resolution", basis: "Per resolution", fee: 999 },
  { code: "SHCERT", category: "Drafting", service: "Share certificates, printed and stamped", basis: "Per certificate", fee: 499 },

  { code: "ADV-CALL", category: "Advisory", service: "Business structuring consultation, 60 minutes", basis: "Per call", fee: 4999 },
  { code: "ADV-NOTE", category: "Advisory", service: "Written structuring or tax position note", basis: "Per note", fee: 24999, onwards: true },
  { code: "DD", category: "Advisory", service: "Financial and secretarial due diligence", basis: "Per engagement", fee: 99999, onwards: true },
  { code: "VCFO", category: "Advisory", service: "Virtual CFO retainer", basis: "Per month", fee: 24999, onwards: true },
  { code: "HEALTH", category: "Advisory", service: "Internal process and compliance health check", basis: "Per engagement", fee: 34999 },
];

export function standaloneFee(code: string): StandaloneFee | null {
  return STANDALONE_FEES.find((f) => f.code === code) ?? null;
}

/* ══════════════ closure and exit ══════════════

   Company_Closure_Exit (1).xlsx — the authority for every closure line, ahead of
   the 'Other Services Standalone' Closure & Exit rows.

   Government fees are at actuals as levied on MCA V3. For reference: STK-2 is a
   flat ₹10,000, reduced to ₹2,500 for applications filed on or before 31 August
   2026 under CCFS-2026; LLP Form 24 is ₹500 for a small LLP and ₹1,000 otherwise;
   DIR-5 is ₹1,000; MGT-14 / INC-18 / INC-20 / INC-27 / MSC-1 / MSC-3 / MSC-4 run
   on the authorised-capital slab, ordinarily ₹200–₹600 per form, with the MSC-1
   fee halved under CCFS-2026. Additional fee on a delayed annual filing is ₹100
   per day per form with no upper limit, reduced to 10% of that under CCFS-2026.
*/

export type ClosureLine = {
  service: string;
  /** ₹, or null where the line is charged at actuals / cross-referenced */
  pro: number | null;
  /** "Nil" | "At actuals" | "See Table B" */
  govt: string;
  timeline: string;
  /** true = the professional fee itself is at actuals (third-party cost) */
  proAtActuals?: boolean;
};

export type ClosureTable = { key: string; title: string; lines: ClosureLine[] };

export const CLOSURE_FEES: ClosureTable[] = [
  {
    key: "cleanup",
    title: "Pre-closure compliance clean-up — applies to every exit route",
    lines: [
      { service: "Exit diagnostic and route opinion (adjusted against fees if the engagement proceeds)", pro: 7500, govt: "Nil", timeline: "5–7 working days" },
      { service: "Overdue annual filings — AOC-4 and MGT-7 / MGT-7A (per financial year)", pro: 5000, govt: "At actuals", timeline: "7–10 working days per FY" },
      { service: "Reconstruction of accounts and statutory audit for a defaulting year, nil or low activity (per financial year)", pro: 12000, govt: "Nil", timeline: "2–3 weeks per FY" },
      { service: "Board meeting, EGM and special resolution support, including Form MGT-14", pro: 5000, govt: "At actuals", timeline: "30 days from resolution" },
      { service: "Statement of accounts in Form STK-8 certified by a Chartered Accountant", pro: 5000, govt: "Nil", timeline: "3–5 working days" },
      { service: "Final income-tax return and closure of the income-tax file", pro: 6000, govt: "Nil", timeline: "15–20 working days" },
      { service: "GST cancellation in Form REG-16 and final return in GSTR-10", pro: 5000, govt: "Nil", timeline: "30–45 days" },
      { service: "EPFO and ESIC closure intimation, where registered", pro: 5000, govt: "Nil", timeline: "15–30 days" },
      { service: "Professional tax / Shops and Establishment surrender (per State registration)", pro: 3500, govt: "At actuals", timeline: "15–30 days" },
      { service: "Bank account closure co-ordination and banker's closure certificate", pro: 2500, govt: "Nil", timeline: "7–15 days" },
      { service: "Digital signature renewal, where a director's DSC has lapsed (per director)", pro: 1000, govt: "At actuals", timeline: "1–3 working days" },
      { service: "DIN surrender in Form DIR-5 (per director, optional)", pro: 3000, govt: "At actuals", timeline: "30–60 days" },
    ],
  },
  {
    key: "strike-off",
    title: "Route 1 — Voluntary strike-off — Private Limited, OPC, unlisted Public",
    lines: [
      { service: "Application in Form STK-2 with indemnity bond (STK-3), affidavits (STK-4) and statement of accounts (STK-8) — end to end, to the dissolution notice in Form STK-7", pro: 20000, govt: "At actuals", timeline: "90–150 days from filing" },
      { service: "Notarisation and stamping of STK-3 / STK-4 (per director)", pro: 1500, govt: "At actuals", timeline: "2–3 working days" },
      { service: "Written response to a C-PACE query or resubmission (second and subsequent)", pro: 5000, govt: "Nil", timeline: "7 working days from receipt" },
    ],
  },
  {
    key: "dormant",
    title: "Route 2 — Dormant status under Section 455 — defer rather than close",
    lines: [
      { service: "Application for dormant status in Form MSC-1", pro: 12000, govt: "At actuals", timeline: "15–30 days" },
      { service: "Annual return of a dormant company in Form MSC-3 (per year)", pro: 4000, govt: "At actuals", timeline: "3–5 working days" },
      { service: "Application for active status in Form MSC-4 (on revival)", pro: 10000, govt: "At actuals", timeline: "15–30 days" },
    ],
  },
  {
    key: "section8",
    title: "Route 3 — Closure of a Section 8 company — conversion first, then strike-off",
    lines: [
      { service: "Conversion opinion and exit-tax exposure computation — accreted income on dissolution or conversion", pro: 30000, govt: "Nil", timeline: "10–12 working days" },
      { service: "Valuation report of assets by a Registered Valuer, required for the Regional Director's determination", pro: null, govt: "Nil", timeline: "2–4 weeks", proAtActuals: true },
      { service: "Special resolution for conversion and alteration of MOA / AOA, with Form MGT-14", pro: 5000, govt: "At actuals", timeline: "30 days from resolution" },
      { service: "Application to the Regional Director in Form INC-18, including service of notice on every authority prescribed by Rule 22(2)", pro: 45000, govt: "At actuals", timeline: "90–150 days" },
      { service: "Newspaper publication of the conversion notice (one English and one vernacular) and Form INC-19", pro: 5000, govt: "At actuals", timeline: "Within 7 days of INC-18" },
      { service: "Hearing before the Regional Director (per appearance)", pro: 12000, govt: "Nil", timeline: "As listed" },
      { service: "Transfer of accumulated profit or unutilised income to the IEPF under Rule 22(9)(c) and 22(10)", pro: 15000, govt: "At actuals", timeline: "Within 30 days of RD approval" },
      { service: "Form INC-20 (revocation of the Section 8 licence) and Form INC-27, to a fresh certificate of incorporation", pro: 15000, govt: "At actuals", timeline: "15–30 days" },
      { service: "Surrender of income-tax registration and approval, accreted-income return and payment of exit tax", pro: 25000, govt: "Nil", timeline: "30–45 days" },
      { service: "Deactivation of CSR-1 registration and NGO Darpan unique ID", pro: 8000, govt: "Nil", timeline: "15–30 days" },
      { service: "FCRA surrender or intimation of closure, where the company holds FCRA registration or prior permission", pro: 20000, govt: "At actuals", timeline: "90–120 working days" },
      { service: "Post-conversion strike-off in Form STK-2 — as per Route 1 above", pro: null, govt: "See Route 1", timeline: "90–150 days" },
    ],
  },
  {
    key: "llp",
    title: "Route 4 — Closure of an LLP in Form 24",
    lines: [
      { service: "LLP strike-off in Form 24, end to end — partners' consent, affidavits, indemnity and CA-certified statement of accounts", pro: 12000, govt: "At actuals", timeline: "60–120 days" },
      { service: "Overdue Form 8 and Form 11 up to the financial year of cessation (per financial year)", pro: 4500, govt: "At actuals", timeline: "7–10 working days per FY" },
    ],
  },
];

/** Headline closure fees, for pricing tables and service copy. */
export const CLOSURE_HEADLINE = {
  diagnostic: 7500,
  strikeOffStk2: 20000,
  dormantMsc1: 12000,
  dormantMsc3: 4000,
  revivalMsc4: 10000,
  llpForm24: 12000,
  gstCancellation: 5000,
  epfEsicClosure: 5000,
  ptShopsSurrender: 3500,
  overdueAnnualFilingPerFy: 5000,
  overdueLlpFilingPerFy: 4500,
} as const;

/** CCFS-2026 concessional STK-2 government fee, to 31 August 2026. */
export const CCFS_2026 = {
  stk2Standard: 10_000,
  stk2Concessional: 2_500,
  deadline: "31 August 2026",
  circular:
    "MCA General Circular No. 01/2026 dated 24 February 2026, in force from 15 April 2026 and extended to 31 August 2026 by General Circular No. 03/2026 dated 8 July 2026",
} as const;

/* ══════════════ Section 8 optional services ══════════════
   'Section 8' tab of CAA_Incorporation_Cost_Calculator_v2. Section 8 incorporation
   itself mirrors the Private Limited fee card above. */

export type Section8Service = {
  service: string;
  pro: number;
  govt: string;
  timeline: string;
  note?: string;
};

export const SECTION8_SERVICES: Section8Service[] = [
  { service: "Income-tax registration + 80G (Form 104)", pro: 9999, govt: "Nil", timeline: "30–45 days", note: "Provisional registration under Section 332 and provisional approval under Section 354(2) (formerly 12A and 80G). Valid three years. Filed immediately after incorporation." },
  { service: "NGO Darpan (NITI Aayog Unique ID)", pro: 1999, govt: "Nil", timeline: "7–30 days" },
  { service: "CSR-1 registration", pro: 6500, govt: "Nil", timeline: "3–7 days", note: "Available once Form 104 registration and 80G approval are in place. Where eligibility rests on the three-year activity record, the fee is ₹12,500." },
  { service: "Form 105 — regular registration, income below ₹25 lakh", pro: 22000, govt: "Nil", timeline: "3–6 months" },
  { service: "Form 105 — regular registration, ₹25 lakh to ₹2 crore", pro: 34000, govt: "Nil", timeline: "3–6 months" },
  { service: "Form 105 — regular registration, above ₹2 crore", pro: 52000, govt: "Nil", timeline: "3–6 months" },
  { service: "Written response to a departmental query (second and subsequent)", pro: 8000, govt: "Nil", timeline: "7 working days from receipt" },
  { service: "Hearing before the Commissioner (Exemptions), per appearance", pro: 12000, govt: "Nil", timeline: "As listed" },
  { service: "CSR structuring opinion", pro: 25000, govt: "Nil", timeline: "7–10 working days" },
  { service: "CSR implementation agreement review (per agreement)", pro: 15000, govt: "Nil", timeline: "5 working days" },
  { service: "FCRA prior permission", pro: 30000, govt: "On request", timeline: "90–120 working days" },
  { service: "FCRA registration", pro: 45000, govt: "On request", timeline: "90–120 working days" },
];

/** CSR-1 fee where eligibility rests on the three-year activity record. */
export const CSR1_THREE_YEAR_FEE = 12500;

/* ══════════════ Startup India — two-stage engagement ══════════════
   'Startup India' tab. Stage 2 is billed only if Stage 1 confirms eligibility and
   the client elects to proceed; the two instalments reconcile to the package. */

export const STARTUP_INDIA = {
  packageValue: 9999,
  stage1: {
    fee: 499,
    label: "Stage 1 — eligibility and probability check",
    scope:
      "Assessment of which government grant schemes the startup qualifies for, and of the likelihood of approval. Charged first, to begin work.",
  },
  stage2: {
    fee: 9500,
    label: "Stage 2 — application, filing and readiness support",
    scope:
      "Startup Readiness Report, pitch deck preparation, grant application filing and end-to-end guidance through to the DPIIT outcome.",
  },
  /** DPIIT recognition on its own, without the grant readiness pack. */
  dpiitOnly: 7999,
  section80IAC: 24999,
} as const;

/* ══════════════ formatting ══════════════ */

export function inr(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}
