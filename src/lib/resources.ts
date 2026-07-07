// ─────────────────────────────────────────────────────────────────────────────
// Business Resources — reference data (tax rates, TDS, GST, ROC fees, due dates,
// government fees, stamp duty, ROC offices).
//
// Figures are compiled from the official portals cited in each section and are
// INDICATIVE, reviewed on the section's `updated` date. Rates, thresholds and
// fees change with each Budget/notification — always confirm on the official
// source before acting.
// ─────────────────────────────────────────────────────────────────────────────

export interface ResTable {
  caption?: string;
  columns: string[];
  rows: string[][];
  /** column index (0-based) to emphasise, e.g. the rate column */
  highlightCol?: number;
  note?: string;
}

export interface ResChip {
  label: string;
  value: string;
  sub?: string;
}

export interface ResourceSection {
  id: string;
  title: string;
  /** lucide-react icon name */
  icon: string;
  /** tailwind classes for the icon chip */
  accent: string;
  tagline: string;
  updated: string;
  source: { label: string; href: string };
  intro?: string;
  /** optional highlight tiles shown above the tables */
  chips?: ResChip[];
  tables: ResTable[];
}

export const RESOURCE_SECTIONS: ResourceSection[] = [
  // ── Income Tax ──────────────────────────────────────────────────────────
  {
    id: "income-tax",
    title: "Income Tax Slabs",
    icon: "IndianRupee",
    accent: "bg-teal-50 text-teal-600 border-teal-100",
    tagline: "New vs old regime — individual rates for FY 2025–26 (AY 2026–27).",
    updated: "Jul 2026",
    source: { label: "Income Tax Department", href: "https://incometaxindia.gov.in/" },
    intro:
      "The New Regime is the default from FY 2023–24 onward and offers wider slabs with a ₹75,000 standard deduction for salaried taxpayers and a full rebate under Section 87A up to ₹12 lakh of taxable income. The Old Regime retains higher rates but lets you claim deductions like 80C, 80D, HRA and home-loan interest.",
    chips: [
      { label: "New regime — tax-free up to", value: "₹12 lakh", sub: "via 87A rebate" },
      { label: "Std. deduction (new, salaried)", value: "₹75,000" },
      { label: "Health & Education Cess", value: "4%", sub: "on tax + surcharge" },
      { label: "Old regime — 87A rebate up to", value: "₹5 lakh" },
    ],
    tables: [
      {
        caption: "New Tax Regime (default) — FY 2025–26",
        columns: ["Income Slab", "Tax Rate"],
        highlightCol: 1,
        rows: [
          ["Up to ₹4,00,000", "Nil"],
          ["₹4,00,001 – ₹8,00,000", "5%"],
          ["₹8,00,001 – ₹12,00,000", "10%"],
          ["₹12,00,001 – ₹16,00,000", "15%"],
          ["₹16,00,001 – ₹20,00,000", "20%"],
          ["₹20,00,001 – ₹24,00,000", "25%"],
          ["Above ₹24,00,000", "30%"],
        ],
        note: "Rebate u/s 87A makes tax nil for resident individuals with taxable income up to ₹12,00,000 (₹12.75 lakh for salaried after standard deduction).",
      },
      {
        caption: "Old Tax Regime — Individuals below 60 (FY 2025–26)",
        columns: ["Income Slab", "Tax Rate"],
        highlightCol: 1,
        rows: [
          ["Up to ₹2,50,000", "Nil"],
          ["₹2,50,001 – ₹5,00,000", "5%"],
          ["₹5,00,001 – ₹10,00,000", "20%"],
          ["Above ₹10,00,000", "30%"],
        ],
        note: "Standard deduction ₹50,000. Rebate u/s 87A up to ₹5,00,000 taxable income. Senior citizen (60–80) basic exemption ₹3,00,000; super senior (80+) ₹5,00,000.",
      },
      {
        caption: "Surcharge on income tax (both regimes)",
        columns: ["Total Income", "Surcharge"],
        highlightCol: 1,
        rows: [
          ["₹50 lakh – ₹1 crore", "10%"],
          ["₹1 crore – ₹2 crore", "15%"],
          ["₹2 crore – ₹5 crore", "25%"],
          ["Above ₹5 crore", "25% (new) / 37% (old)"],
        ],
        note: "The New Regime caps the highest surcharge at 25%. Marginal relief applies near each threshold.",
      },
    ],
  },

  // ── TDS Rate Chart ──────────────────────────────────────────────────────
  {
    id: "tds",
    title: "TDS Rate Chart",
    icon: "FileText",
    accent: "bg-purple-50 text-purple-600 border-purple-100",
    tagline: "Common TDS sections, rates and threshold limits for FY 2025–26.",
    updated: "Jul 2026",
    source: { label: "Income Tax Department — TDS", href: "https://incometaxindia.gov.in/" },
    intro:
      "Rates below apply where the deductee has furnished a valid PAN. Where PAN is not provided, TDS is deducted at the higher of the specified rate or 20% (Section 206AA). Several thresholds were revised upward with effect from 1 April 2025.",
    tables: [
      {
        caption: "Frequently used TDS sections (FY 2025–26)",
        columns: ["Section", "Nature of Payment", "Rate", "Threshold (p.a.)"],
        highlightCol: 2,
        rows: [
          ["192", "Salary", "Slab rates", "Basic exemption"],
          ["194A", "Interest (banks/post office)", "10%", "₹50,000 (₹1,00,000 sr. citizen)"],
          ["194C", "Contractor — Individual/HUF", "1%", "₹30,000 single / ₹1,00,000 total"],
          ["194C", "Contractor — Others", "2%", "₹30,000 single / ₹1,00,000 total"],
          ["194H", "Commission / Brokerage", "2%", "₹20,000"],
          ["194I", "Rent — Plant & Machinery", "2%", "₹6,00,000"],
          ["194I", "Rent — Land / Building / Furniture", "10%", "₹6,00,000"],
          ["194J", "Professional fees", "10%", "₹50,000"],
          ["194J", "Technical services / call centre", "2%", "₹50,000"],
          ["194", "Dividend", "10%", "₹10,000"],
          ["194Q", "Purchase of goods", "0.1%", "₹50,00,000"],
          ["194O", "E-commerce operator", "0.1%", "₹5,00,000 (individual/HUF)"],
          ["194IA", "Transfer of immovable property", "1%", "₹50,00,000"],
          ["194IB", "Rent by individual/HUF (non-audit)", "2%", "₹50,000 per month"],
        ],
        note: "Indicative. No PAN → 20% (Sec 206AA). 'Non-filers' may attract higher rates u/s 206AB. Always confirm the current-year rate before deducting.",
      },
    ],
  },

  // ── GST ─────────────────────────────────────────────────────────────────
  {
    id: "gst",
    title: "GST Rates & Returns",
    icon: "Receipt",
    accent: "bg-green-50 text-green-600 border-green-100",
    tagline: "The GST rate structure, registration thresholds and return due dates.",
    updated: "Jul 2026",
    source: { label: "GST Portal / CBIC", href: "https://www.gst.gov.in/" },
    intro:
      "GST in India follows a multi-tier rate structure. A compensation cess applies over and above the 28% slab on select luxury and 'sin' goods. Registration is mandatory once turnover crosses the thresholds below, or immediately for inter-state B2B supply and certain e-commerce sellers.",
    chips: [
      { label: "Threshold — Goods", value: "₹40 lakh", sub: "₹20L special-category states" },
      { label: "Threshold — Services", value: "₹20 lakh", sub: "₹10L special-category states" },
      { label: "Composition — Goods", value: "up to ₹1.5 cr" },
      { label: "Registration fee", value: "₹0" },
    ],
    tables: [
      {
        caption: "GST rate slabs (indicative examples)",
        columns: ["Slab", "Typical goods & services"],
        highlightCol: 0,
        rows: [
          ["0% (Exempt)", "Fresh produce, unbranded food grains, books, healthcare, education"],
          ["5%", "Packaged essentials, transport, small restaurants, footwear < ₹1,000"],
          ["12%", "Processed foods, business-class air travel, some apparel"],
          ["18%", "Most services (professional, IT, telecom), industrial goods"],
          ["28%", "Luxury goods, automobiles, aerated drinks, tobacco (+ cess)"],
        ],
        note: "Rate classification depends on the specific HSN/SAC code. Verify your product/service rate on the CBIC rate finder.",
      },
      {
        caption: "GST return due dates",
        columns: ["Return", "Who / Frequency", "Due Date"],
        rows: [
          ["GSTR-1", "Regular — Monthly", "11th of next month"],
          ["GSTR-1 (QRMP)", "Quarterly filers", "13th of month after quarter"],
          ["GSTR-3B", "Regular — Monthly", "20th of next month"],
          ["GSTR-3B (QRMP)", "Quarterly filers", "22nd / 24th (state-wise)"],
          ["CMP-08", "Composition — Quarterly", "18th of month after quarter"],
          ["GSTR-9", "Annual return", "31 December of next FY"],
          ["GSTR-9C", "Reconciliation (turnover > ₹5 cr)", "31 December of next FY"],
        ],
        note: "Late filing attracts a per-day late fee plus 18% p.a. interest on tax paid late.",
      },
    ],
  },

  // ── ROC / MCA ───────────────────────────────────────────────────────────
  {
    id: "roc-mca",
    title: "ROC / MCA Compliance",
    icon: "FolderOpen",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
    tagline: "Annual MCA forms, due dates and normal filing fees by capital.",
    updated: "Jul 2026",
    source: { label: "Ministry of Corporate Affairs", href: "https://www.mca.gov.in/" },
    intro:
      "Every company and LLP must file annual returns with the Registrar of Companies. Missing a due date triggers an additional fee of ₹100 per day, per form, with no upper cap — so these dates matter.",
    tables: [
      {
        caption: "Key annual filings — Companies & LLPs",
        columns: ["Form", "Purpose", "Due Date"],
        rows: [
          ["AOC-4", "Financial statements (company)", "Within 30 days of AGM"],
          ["MGT-7 / MGT-7A", "Annual return (company / small co.)", "Within 60 days of AGM"],
          ["ADT-1", "Auditor appointment", "Within 15 days of AGM"],
          ["DIR-3 KYC", "Director KYC", "30 September"],
          ["INC-20A", "Commencement of business", "Within 180 days of incorporation"],
          ["LLP Form 11", "LLP annual return", "30 May"],
          ["LLP Form 8", "LLP statement of account & solvency", "30 October"],
          ["DPT-3", "Return of deposits", "30 June"],
        ],
        note: "AGM must be held within 6 months of financial year-end (9 months for the first AGM).",
      },
      {
        caption: "MCA normal filing fee (based on nominal share capital)",
        columns: ["Nominal Share Capital", "Fee per Document"],
        highlightCol: 1,
        rows: [
          ["Less than ₹1,00,000", "₹200"],
          ["₹1,00,000 – ₹4,99,999", "₹300"],
          ["₹5,00,000 – ₹24,99,999", "₹400"],
          ["₹25,00,000 – ₹99,99,999", "₹500"],
          ["₹1,00,00,000 or more", "₹600"],
        ],
        note: "Companies without share capital: ₹200 per document. Late filing: additional ₹100/day per form.",
      },
    ],
  },

  // ── Government Fees ─────────────────────────────────────────────────────
  {
    id: "govt-fees",
    title: "Government Fees",
    icon: "Coins",
    accent: "bg-amber-50 text-amber-600 border-amber-100",
    tagline: "Official government fees for common registrations (indicative).",
    updated: "Jul 2026",
    source: { label: "Respective government portals", href: "https://www.india.gov.in/" },
    intro:
      "These are the statutory government fees only — professional/service charges are separate. Many registrations (GST, Udyam, DPIIT) carry no government fee at all; beware of lookalike sites that charge for free services.",
    tables: [
      {
        caption: "Statutory fees for popular registrations",
        columns: ["Registration", "Government Fee", "Authority"],
        highlightCol: 1,
        rows: [
          ["GST Registration", "Free", "GSTN / CBIC"],
          ["Udyam (MSME)", "Free", "Ministry of MSME"],
          ["Startup India (DPIIT)", "Free", "DPIIT"],
          ["Import Export Code (IEC)", "₹500", "DGFT"],
          ["Trademark — Individual/Startup/MSME", "₹4,500 / class", "IP India"],
          ["Trademark — Company/LLP", "₹9,000 / class", "IP India"],
          ["Copyright Registration", "₹500 – ₹5,000", "Copyright Office"],
          ["FSSAI — Basic Registration", "₹100 / year", "FSSAI"],
          ["FSSAI — State Licence", "₹2,000 – ₹5,000 / year", "FSSAI"],
          ["12A & 80G Registration", "Free", "Income Tax Dept"],
          ["Digital Signature (DSC) — Class 3", "₹1,000 – ₹2,000 (approx)", "Certifying Authority"],
        ],
        note: "Indicative. Trademark e-filing is used for the concessional fees shown. Confirm current fees on the respective portal.",
      },
    ],
  },

  // ── Stamp Duty ──────────────────────────────────────────────────────────
  {
    id: "stamp-duty",
    title: "Stamp Duty on Incorporation",
    icon: "Stamp",
    accent: "bg-rose-50 text-rose-600 border-rose-100",
    tagline: "State-wise stamp duty on MOA, AOA & INC-32 (indicative).",
    updated: "Jul 2026",
    source: { label: "MCA — collected via SPICe+", href: "https://www.mca.gov.in/" },
    intro:
      "During incorporation, the MCA collects state stamp duty on the SPICe+ (INC-32) form, the MOA and the AOA on behalf of your state. The amount depends on the state and the authorised capital — figures below are indicative for a Private Limited Company with ₹1 lakh authorised capital and change frequently, so treat them as a guide only.",
    tables: [
      {
        caption: "Indicative incorporation stamp duty — ₹1 lakh authorised capital",
        columns: ["State / UT", "Indicative Stamp Duty", "Notes"],
        highlightCol: 1,
        rows: [
          ["Delhi", "₹360 (approx)", "Relatively low"],
          ["Haryana", "₹135 – ₹1,000 (approx)", "Varies by area"],
          ["Maharashtra", "₹1,000+ (approx)", "Higher; scales with capital"],
          ["Karnataka", "₹1,020+ (approx)", "Scales with capital"],
          ["Tamil Nadu", "₹520 (approx)", "Moderate"],
          ["Gujarat", "₹1,020+ (approx)", "Scales with capital"],
          ["Uttar Pradesh", "₹1,010+ (approx)", "Scales with capital"],
          ["West Bengal", "₹370 (approx)", "Moderate"],
          ["Telangana", "₹1,520+ (approx)", "Higher"],
          ["Kerala", "₹3,000+ (approx)", "Among the higher slabs"],
          ["Punjab", "₹10,000+ (approx)", "Among the highest on AOA"],
          ["Madhya Pradesh", "₹7,500+ (approx)", "Higher"],
        ],
        note: "STRONGLY INDICATIVE — actual duty depends on authorised capital and the latest state Stamp Act. The exact figure is auto-calculated in SPICe+ at filing. Verify before budgeting.",
      },
    ],
  },

  // ── ROC Offices ─────────────────────────────────────────────────────────
  {
    id: "roc-offices",
    title: "ROC Offices & Jurisdiction",
    icon: "MapPin",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100",
    tagline: "Which Registrar of Companies governs your registered office.",
    updated: "Jul 2026",
    source: { label: "MCA — RoC Offices", href: "https://www.mca.gov.in/content/mca/global/en/mca/about-mca/roc-offices.html" },
    intro:
      "Your company's compliance is handled by the Registrar of Companies (RoC) for the state where your registered office is located. Here are the major RoC offices and the regions they cover.",
    tables: [
      {
        caption: "Major Registrar of Companies (RoC) offices",
        columns: ["RoC Office", "Jurisdiction (State / UT)"],
        rows: [
          ["RoC Delhi", "Delhi & Haryana"],
          ["RoC Mumbai", "Maharashtra (excl. Pune region)"],
          ["RoC Pune", "Parts of Maharashtra"],
          ["RoC Bengaluru", "Karnataka"],
          ["RoC Chennai", "Tamil Nadu"],
          ["RoC Coimbatore", "Parts of Tamil Nadu"],
          ["RoC Kolkata", "West Bengal"],
          ["RoC Ahmedabad", "Gujarat"],
          ["RoC Hyderabad", "Telangana"],
          ["RoC Vijayawada", "Andhra Pradesh"],
          ["RoC Jaipur", "Rajasthan"],
          ["RoC Kanpur", "Uttar Pradesh & Uttarakhand"],
          ["RoC Chandigarh", "Punjab, Chandigarh & Himachal Pradesh"],
          ["RoC Ernakulam (Kochi)", "Kerala & Lakshadweep"],
          ["RoC Patna", "Bihar"],
          ["RoC Cuttack", "Odisha"],
          ["RoC Guwahati", "North-Eastern States"],
          ["RoC Gwalior", "Madhya Pradesh & Chhattisgarh"],
        ],
        note: "A few states have more than one RoC by district. Confirm your specific RoC on the MCA portal.",
      },
    ],
  },

  // ── Compliance Calendar ─────────────────────────────────────────────────
  {
    id: "compliance-calendar",
    title: "Compliance Calendar",
    icon: "CalendarCheck",
    accent: "bg-cyan-50 text-cyan-600 border-cyan-100",
    tagline: "Recurring monthly & annual statutory due dates at a glance.",
    updated: "Jul 2026",
    source: { label: "CBIC, Income Tax & MCA", href: "https://www.incometax.gov.in/" },
    intro:
      "The dates below recur every month (or on the stated month). Where a due date falls on a holiday, the effective date is usually the next working day. Set reminders — most penalties here accrue daily.",
    tables: [
      {
        caption: "Recurring monthly due dates",
        columns: ["Date", "Compliance"],
        highlightCol: 0,
        rows: [
          ["7th", "TDS / TCS deposit for the previous month"],
          ["10th", "GSTR-7 (TDS) & GSTR-8 (TCS) under GST"],
          ["11th", "GSTR-1 (monthly filers)"],
          ["13th", "GSTR-1 (QRMP) & GSTR-6 (Input Service Distributor)"],
          ["15th", "PF & ESI payment; TCS return (quarterly)"],
          ["20th", "GSTR-3B (monthly filers)"],
          ["22nd / 24th", "GSTR-3B (QRMP, by state)"],
        ],
      },
      {
        caption: "Key annual & quarterly dates",
        columns: ["Date", "Compliance"],
        highlightCol: 0,
        rows: [
          ["15 Jun / 15 Sep / 15 Dec / 15 Mar", "Advance tax instalments (15% / 45% / 75% / 100%)"],
          ["30 April", "TDS payment for March; LLP contribution data"],
          ["31 May", "TDS return Q4; LLP Form 11"],
          ["31 July", "ITR filing (individuals / non-audit)"],
          ["30 September", "Director KYC (DIR-3); Tax audit report"],
          ["31 October", "ITR (audit cases); LLP Form 8; AOC-4 window"],
          ["30 November", "MGT-7 window; Transfer pricing report"],
          ["31 December", "Belated / revised ITR; GSTR-9 & 9C"],
        ],
        note: "Due dates are frequently extended by CBDT/CBIC notifications — verify each year.",
      },
    ],
  },
];
