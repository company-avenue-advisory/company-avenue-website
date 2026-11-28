import {
  ADDRESS_LINE,
  CONTACT,
  HOURS_LINE,
  INCORPORATED,
  REGISTRATIONS,
} from "./nap";

/**
 * Display-facing company facts.
 *
 * Every NAP field here is now a re-export of the canonical record in
 * src/lib/nap.ts (WS-10.1) rather than a literal. Editing an address or a
 * phone number in this file will not work and should not be attempted —
 * change nap.ts, which also feeds the structured data.
 */
export const COMPANY = {
  name: "Company Avenue Advisory",
  fullName: "Company Avenue Advisory Pvt. Ltd.",
  tagline: "Trusted Business Compliance Partner",
  email: CONTACT.email,
  phone: CONTACT.phoneDisplay,
  whatsapp: CONTACT.phoneE164,
  address: ADDRESS_LINE,
  workingHours: HOURS_LINE,
  website: CONTACT.website,
  gstin: REGISTRATIONS.gstin,
  cin: REGISTRATIONS.cin,
  /** Year of incorporation — 2015 per the work order's [VERIFIED] finding. */
  founded: INCORPORATED,
};

export const NAV_LINKS = [
  {
    label: "Start Business",
    href: "/services",
    children: [
      {
        group: "Indian Companies",
        items: [
          { label: "Private Limited Company", href: "/services/private-limited-company" },
          { label: "LLP Registration", href: "/services/llp-registration" },
          { label: "One Person Company (OPC)", href: "/services/one-person-company" },
          { label: "Partnership Firm", href: "/services/partnership-firm" },
          { label: "Sole Proprietorship", href: "/services/sole-proprietorship" },
          { label: "Section 8 (NGO) Company", href: "/services/section-8-company" },
          { label: "Nidhi Company", href: "/services/nidhi-company" },
          { label: "Producer Company", href: "/services/producer-company" },
        ],
      },
      {
        group: "Special Entities",
        items: [
          { label: "Public Limited Company", href: "/services/public-limited-company" },
          { label: "NBFC Registration", href: "/services/nbfc-registration" },
          { label: "Chit Fund Company", href: "/services/chit-fund-company" },
          { label: "Microfinance Company (MFI)", href: "/services/microfinance-company" },
        ],
      },
      {
        group: "Foreign Business in India",
        items: [
          { label: "Indian Subsidiary Company", href: "/services/indian-subsidiary" },
          { label: "Branch / Liaison Office", href: "/services/branch-office" },
        ],
      },
      {
        group: "Quick Picks",
        items: [
          { label: "LLP vs Pvt Ltd Comparison", href: "/calculators/llp-vs-pvt-ltd" },
          { label: "Business Structure Advisor", href: "/calculators/business-structure-advisor" },
          { label: "Registration Cost Calculator", href: "/calculators/company-registration-cost" },
        ],
      },
    ],
  },
  {
    label: "Startup Schemes",
    href: "/startup-schemes",
    children: [
      {
        group: "Most Applied For",
        items: [
          { label: "Startup India Seed Fund (SISFS)", href: "/startup-schemes/startup-india-seed-fund-scheme" },
          { label: "Credit Guarantee for Startups (CGSS)", href: "/startup-schemes/credit-guarantee-scheme-for-startups" },
          { label: "Biotechnology Ignition Grant (BIG)", href: "/startup-schemes/biotechnology-ignition-grant" },
          { label: "NIDHI PRAYAS 2.0 Prototype Grant", href: "/startup-schemes/nidhi-prayas" },
          { label: "iDEX Defence Innovation", href: "/startup-schemes/idex" },
          { label: "IN-SPACe Seed Fund", href: "/startup-schemes/in-space-seed-fund" },
          { label: "Mudra Loan (PMMY)", href: "/startup-schemes/pradhan-mantri-mudra-yojana" },
          { label: "CGTMSE Collateral-Free Credit", href: "/startup-schemes/cgtmse" },
        ],
      },
      {
        group: "Grants — No Repayment",
        items: [
          { label: "All Grant Schemes", href: "/startup-schemes#directory" },
          { label: "PRISM (Individual Innovators)", href: "/startup-schemes/prism" },
          { label: "TIDE 2.0 (ICT Startups)", href: "/startup-schemes/tide-2" },
          { label: "GENESIS (Tier-II/III Cities)", href: "/startup-schemes/genesis" },
          { label: "DCIS (Telecom & ICT)", href: "/startup-schemes/dcis" },
          { label: "SPARSH (Social Health)", href: "/startup-schemes/sparsh" },
          { label: "GREAT (Technical Textiles)", href: "/startup-schemes/great-technical-textiles" },
          { label: "IFSCA Fintech Incentive", href: "/startup-schemes/ifsca-fintech-incentive-scheme" },
        ],
      },
      {
        group: "Equity & VC Funds",
        items: [
          { label: "Fund of Funds for Startups (FFS)", href: "/startup-schemes/fund-of-funds-for-startups" },
          { label: "Startup India Fund of Funds 2.0", href: "/startup-schemes/startup-india-fund-of-funds-2" },
          { label: "AgriSURE Agri Fund", href: "/startup-schemes/agrisure" },
          { label: "BIRAC AcE Fund (Biotech)", href: "/startup-schemes/ace-fund" },
          { label: "SAMRIDH Accelerator Funding", href: "/startup-schemes/samridh" },
          { label: "Antariksh Space VCF", href: "/startup-schemes/antariksh-vcf" },
          { label: "Self-Reliant India Fund", href: "/startup-schemes/self-reliant-india-fund" },
        ],
      },
      {
        group: "Loans & Credit Guarantee",
        items: [
          { label: "Credit Guarantee for Startups (CGSS)", href: "/startup-schemes/credit-guarantee-scheme-for-startups" },
          { label: "CGTMSE (MSME Credit Guarantee)", href: "/startup-schemes/cgtmse" },
          { label: "Pradhan Mantri Mudra Yojana", href: "/startup-schemes/pradhan-mantri-mudra-yojana" },
          { label: "Stand-Up India (SC/ST & Women)", href: "/startup-schemes/stand-up-india" },
          { label: "PMFME (Food Processing)", href: "/startup-schemes/pmfme" },
          { label: "Agriculture Infrastructure Fund", href: "/startup-schemes/agriculture-infrastructure-fund" },
        ],
      },
      {
        group: "By Sector",
        items: [
          { label: "Defence — iDEX, ADITI, TDF", href: "/startup-schemes/idex" },
          { label: "Space — IN-SPACe, TAF, VCF", href: "/startup-schemes/space-technology-adoption-fund" },
          { label: "Biotech — BIG, SEED, LEAP", href: "/startup-schemes/birac-seed-fund" },
          { label: "Agriculture — RKVY, AgriSURE", href: "/startup-schemes/rkvy-agri-entrepreneurship" },
          { label: "Semiconductor — DLI, C2S", href: "/startup-schemes/design-linked-incentive" },
          { label: "Quantum & Deep Tech — NQM, RDI", href: "/startup-schemes/national-quantum-mission" },
        ],
      },
      {
        group: "Get Funded With Us",
        items: [
          { label: "Find My Scheme (5 Questions)", href: "/startup-schemes#scheme-finder" },
          { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
          { label: "CA-Certified Project Report / DPR", href: "/contact" },
          { label: "CMA Data for Bank Funding", href: "/contact" },
          { label: "Pitch Deck & Financial Model", href: "/contact" },
          { label: "Book a Free Eligibility Screen", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "IPR & Registrations",
    href: "/services",
    children: [
      {
        group: "Trademark",
        items: [
          { label: "Trademark Registration", href: "/services/trademark-registration" },
          { label: "Trademark Objection Reply", href: "/services/trademark-objection" },
          { label: "Trademark Renewal", href: "/services/trademark-renewal" },
          { label: "Trademark Watch Service", href: "/services/trademark-watch" },
          { label: "Trademark Assignment", href: "/services/trademark-assignment" },
        ],
      },
      {
        group: "International IP",
        items: [
          { label: "International Trademark (Madrid)", href: "/services/international-trademark" },
          { label: "GI Tag Registration", href: "/services/gi-tag-registration" },
        ],
      },
      {
        group: "Other IP Rights",
        items: [
          { label: "Copyright Registration", href: "/services/copyright-registration" },
          { label: "Patent Registration", href: "/services/patent-registration" },
          { label: "Patent Search & Drafting", href: "/services/patent-search" },
          { label: "Design Registration", href: "/services/design-registration" },
        ],
      },
      {
        group: "Startup & MSME",
        items: [
          { label: "Startup India (DPIIT)", href: "/services/startup-india" },
          { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
          { label: "IEC Registration (Import-Export)", href: "/services/iec-registration" },
          { label: "APEDA Registration", href: "/services/apeda-registration" },
        ],
      },
      {
        group: "Licenses & Registrations",
        items: [
          { label: "FSSAI Food License", href: "/services/fssai-license" },
          { label: "Professional Tax Registration", href: "/services/professional-tax" },
          { label: "Trade License", href: "/services/trade-license" },
          { label: "Drug License", href: "/services/drug-license" },
          { label: "PSARA License", href: "/services/psara-license" },
          { label: "LMPC Registration", href: "/services/lmpc-registration" },
          { label: "AYUSH License", href: "/services/ayush-license" },
        ],
      },
      {
        group: "Industrial & Environment",
        items: [
          { label: "ISO Certification", href: "/services/iso-certification" },
          { label: "BIS Registration", href: "/services/bis-registration" },
          { label: "Environment Clearance (PCB)", href: "/services/environment-clearance" },
          { label: "DOT / Telecom License", href: "/services/dot-telecom-license" },
          { label: "Barcode Registration", href: "/services/barcode-registration" },
          { label: "EPR Registration", href: "/services/epr-registration" },
        ],
      },
    ],
  },
  {
    label: "Tax & Payroll",
    href: "/services",
    children: [
      {
        group: "GST Services",
        items: [
          { label: "GST Registration", href: "/services/gst-registration" },
          { label: "GST Return Filing", href: "/services/gst-filing" },
          { label: "GST Amendment / Cancellation", href: "/services/gst-amendment" },
          { label: "GST LUT Filing", href: "/services/gst-lut-filing" },
        ],
      },
      {
        group: "Income Tax",
        items: [
          { label: "Income Tax Return (ITR)", href: "/services/income-tax-return" },
          { label: "TDS Return Filing", href: "/services/tds-return" },
          { label: "Advance Tax Payment", href: "/services/advance-tax" },
          { label: "Tax Audit (Sec 44AB)", href: "/services/tax-audit" },
          { label: "Transfer Pricing Study", href: "/services/transfer-pricing" },
          { label: "12A & 80G Registration", href: "/services/12a-80g-registration" },
        ],
      },
      {
        group: "Labour Law & HR",
        items: [
          { label: "PF Registration & Filing", href: "/services/pf-registration" },
          { label: "ESIC Registration", href: "/services/esic-registration" },
          { label: "Payroll Management", href: "/services/payroll-management" },
          { label: "Shops & Establishment Registration", href: "/services/shops-establishment" },
          { label: "Labour Law Compliance", href: "/services/labour-law-compliance" },
          { label: "POSH Compliance", href: "/services/posh-compliance" },
          { label: "Factories Act Compliance", href: "/services/factories-act" },
          { label: "Gratuity Trust Registration", href: "/services/gratuity-trust" },
        ],
      },
      {
        group: "Accounting & CFO",
        items: [
          { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
          { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
          { label: "Financial Statements", href: "/services/financial-statements" },
          { label: "Business Valuation", href: "/services/business-valuation" },
        ],
      },
    ],
  },
  {
    label: "Compliance",
    href: "/services",
    children: [
      {
        group: "Annual Compliance",
        items: [
          { label: "ROC Annual Filing (Pvt Ltd)", href: "/services/roc-compliance" },
          { label: "LLP Annual Filing", href: "/services/llp-annual-filing" },
          { label: "Director KYC (DIR-3)", href: "/services/director-kyc" },
          { label: "Post-Incorporation Compliance", href: "/services/post-incorporation-compliance" },
          { label: "XBRL Filing", href: "/services/xbrl-filing" },
          { label: "AGM & Board Meeting Services", href: "/services/agm-services" },
        ],
      },
      {
        group: "Company Changes",
        items: [
          { label: "Change in Directors", href: "/services/change-in-directors" },
          { label: "Increase Authorised Capital", href: "/services/increase-authorised-capital" },
          { label: "Registered Office Change", href: "/services/registered-office-change" },
          { label: "Company Name Change", href: "/services/company-name-change" },
          { label: "Share Transfer & Transmission", href: "/services/share-transfer" },
          { label: "Strike Off / Company Closure", href: "/services/company-closure" },
        ],
      },
      {
        group: "Business Conversion",
        items: [
          { label: "Proprietorship to Pvt Ltd", href: "/services/proprietorship-to-pvtltd" },
          { label: "Partnership to LLP", href: "/services/partnership-to-llp" },
          { label: "LLP to Private Limited Company", href: "/services/llp-to-company" },
        ],
      },
    ],
  },
  {
    // Tools and Resources are merged into a single mega menu — the header can
    // no longer carry them as two separate top-level items.
    label: "Tools & Resources",
    href: "/calculators",
    children: [
      {
        group: "Guides & Resources",
        items: [
          { label: "How-To Guides", href: "/guides" },
          { label: "Document Templates", href: "/templates" },
          { label: "Business Resources & Rates", href: "/resources" },
          { label: "Blog & Industry News", href: "/blog" },
          { label: "Government Startup Schemes", href: "/startup-schemes" },
          { label: "Cost Calculators", href: "/calculators" },
          // WS-5.1: the reviews destination must be reachable from the main
          // navigation, not only the homepage button.
          { label: "Client Reviews", href: "/reviews" },
        ],
      },
      {
        group: "Tax & Business",
        items: [
          { label: "GST Calculator", href: "/calculators/gst-calculator" },
          { label: "Income Tax Calculator", href: "/calculators/income-tax-calculator" },
          { label: "TDS Calculator", href: "/calculators/tds-calculator" },
          { label: "TDS Rate Finder", href: "/calculators/tds-rate-finder" },
          { label: "HRA Calculator", href: "/calculators/hra-calculator" },
          { label: "Salary Calculator", href: "/calculators/salary-calculator" },
          { label: "Gratuity Calculator", href: "/calculators/gratuity-calculator" },
          { label: "Business Setup Calculator", href: "/calculators/company-registration-cost" },
          { label: "Company Registration Cost", href: "/calculators/company-registration-cost" },
          { label: "Compliance Cost Calculator", href: "/calculators/compliance-cost-calculator" },
        ],
      },
      {
        group: "Loan & EMI",
        items: [
          { label: "EMI Calculator", href: "/calculators/emi-calculator" },
          { label: "Home Loan EMI Calculator", href: "/calculators/home-loan-emi-calculator" },
        ],
      },
      {
        group: "Investment & Savings",
        items: [
          { label: "SIP Calculator", href: "/calculators/sip-calculator" },
          { label: "Lumpsum Calculator", href: "/calculators/lumpsum-calculator" },
          { label: "Mutual Fund Returns Calculator", href: "/calculators/mutual-fund-calculator" },
          { label: "Compound Interest Calculator", href: "/calculators/compound-interest-calculator" },
          { label: "FD Calculator", href: "/calculators/fd-calculator" },
          { label: "RD Calculator", href: "/calculators/rd-calculator" },
          { label: "PPF Calculator", href: "/calculators/ppf-calculator" },
          { label: "EPF Calculator", href: "/calculators/epf-calculator" },
          { label: "NPS Calculator", href: "/calculators/nps-calculator" },
          { label: "Retirement Planning Calculator", href: "/calculators/retirement-calculator" },
        ],
      },
      {
        group: "Advisors & Comparisons",
        items: [
          { label: "LLP vs Pvt Ltd Comparison", href: "/calculators/llp-vs-pvt-ltd" },
          { label: "Business Structure Advisor", href: "/calculators/business-structure-advisor" },
        ],
      },
      {
        group: "Verification Tools",
        items: [
          { label: "GST Verification", href: "/verify/gst-verification" },
          { label: "PAN Verification", href: "/verify/pan-verification" },
          { label: "Company & Director Verification", href: "/verify/company-verification" },
          { label: "CIN Number Search", href: "/verify/cin-search" },
          { label: "DIN Number Search", href: "/verify/din-search" },
          { label: "Trademark Class Finder", href: "/verify/trademark-class-finder" },
          { label: "Trademark Search & Status", href: "/verify/trademark-search" },
          { label: "Company Name Search", href: "/verify/company-name-search" },
        ],
      },
    ],
  },
  { label: "Calculators", href: "/calculators" },
  { label: "Get Help", href: "/contact", variant: "gethelp" as const },
];

export const SERVICES = [
  // ── Company Formation ──────────────────────────────────────────────
  {
    id: "private-limited-company",
    title: "Private Limited Company",
    shortDesc: "Register your Pvt. Ltd. company. We handle every step and the government filings, fast.",
    icon: "Building2",
    category: "Company Formation",
    popular: true,
  },
  {
    id: "llp-registration",
    title: "LLP Registration",
    shortDesc: "Register an LLP. It is flexible to run and has fewer yearly filings than a company.",
    icon: "Users",
    category: "Company Formation",
  },
  {
    id: "one-person-company",
    title: "One Person Company",
    shortDesc: "Start a company on your own. You still get full limited liability.",
    icon: "User",
    category: "Company Formation",
  },
  {
    id: "partnership-firm",
    title: "Partnership Firm Registration",
    shortDesc: "Register a partnership firm with a deed. Good for small businesses run by 2–20 partners.",
    icon: "Handshake",
    category: "Company Formation",
  },
  {
    id: "sole-proprietorship",
    title: "Sole Proprietorship",
    shortDesc: "Set up a sole proprietorship with GST, a bank account and a business identity. The simplest way to start.",
    icon: "PersonStanding",
    category: "Company Formation",
  },
  {
    id: "section-8-company",
    title: "Section 8 Company (NGO)",
    shortDesc: "Register a non-profit company under Section 8 for charity, education or social work.",
    icon: "Heart",
    category: "Company Formation",
  },
  {
    id: "nidhi-company",
    title: "Nidhi Company Registration",
    shortDesc: "Register a Nidhi Company, where members save and borrow from each other. RBI-governed.",
    icon: "PiggyBank",
    category: "Company Formation",
  },
  {
    id: "producer-company",
    title: "Producer Company Registration",
    shortDesc: "Register a Producer Company for farmers, artisans and other primary producers.",
    icon: "Sprout",
    category: "Company Formation",
  },
  {
    id: "indian-subsidiary",
    title: "Indian Subsidiary of Foreign Company",
    shortDesc: "Set up a 100% foreign-owned Indian company, under FEMA and the Companies Act.",
    icon: "Globe",
    category: "Company Formation",
  },
  {
    id: "branch-office",
    title: "Branch / Liaison / Project Office",
    shortDesc: "Open a branch, liaison or project office in India for a foreign company.",
    icon: "MapPin",
    category: "Company Formation",
  },
  {
    id: "public-limited-company",
    title: "Public Limited Company",
    shortDesc: "Register a Public Limited Company. Good for large businesses that want public funding or a listing.",
    icon: "Building2",
    category: "Company Formation",
  },
  {
    id: "nbfc-registration",
    title: "NBFC Registration",
    shortDesc: "Register a Non-Banking Financial Company with RBI for lending, investment and finance.",
    icon: "Landmark",
    category: "Company Formation",
  },
  {
    id: "chit-fund-company",
    title: "Chit Fund Company Registration",
    shortDesc: "Register a Chit Fund Company under the Chit Funds Act, 1982, with state approval.",
    icon: "PiggyBank",
    category: "Company Formation",
  },
  {
    id: "microfinance-company",
    title: "Microfinance Company (MFI)",
    shortDesc: "Register a Microfinance Institution as a Section 8 Company or NBFC-MFI to lend to low-income borrowers.",
    icon: "HandCoins",
    category: "Company Formation",
  },

  // ── Tax & GST ──────────────────────────────────────────────────────
  {
    id: "gst-registration",
    title: "GST Registration",
    shortDesc: "Get your GSTIN quickly and stay compliant from day one.",
    icon: "Receipt",
    category: "Tax & GST",
    popular: true,
  },
  {
    id: "gst-filing",
    title: "GST Return Filing",
    shortDesc: "Monthly, quarterly and annual GST returns, filed correctly and on time.",
    icon: "FileText",
    category: "Tax & GST",
  },
  {
    id: "gst-amendment",
    title: "GST Amendment / Cancellation",
    shortDesc: "Change your GST registration details or cancel your GSTIN, with full support.",
    icon: "FilePen",
    category: "Tax & GST",
  },
  {
    id: "income-tax-return",
    title: "Income Tax Return",
    shortDesc: "ITR filing for individuals, firms and companies, done by experts.",
    icon: "IndianRupee",
    category: "Tax & GST",
    popular: true,
  },
  {
    id: "tds-return",
    title: "TDS Return Filing",
    shortDesc: "TDS returns (24Q, 26Q, 27Q) filed on time, with Form 16 / 16A.",
    icon: "ClipboardList",
    category: "Tax & GST",
  },
  {
    id: "advance-tax",
    title: "Advance Tax Calculation & Payment",
    shortDesc: "Work out and pay advance tax in four instalments, to avoid interest under Sec 234B/234C.",
    icon: "CalendarClock",
    category: "Tax & GST",
  },
  {
    id: "tax-audit",
    title: "Tax Audit (Sec 44AB)",
    shortDesc: "Tax audit under Section 44AB by qualified CAs, with the full report.",
    icon: "Search",
    category: "Tax & GST",
  },
  {
    id: "transfer-pricing",
    title: "Transfer Pricing Study",
    shortDesc: "Benchmarking study and Form 3CEB for deals with associated enterprises abroad.",
    icon: "ArrowLeftRight",
    category: "Tax & GST",
  },
  {
    id: "gst-lut-filing",
    title: "GST LUT Filing",
    shortDesc: "File a Letter of Undertaking (LUT) to export goods and services without paying IGST.",
    icon: "FileCheck",
    category: "Tax & GST",
  },
  {
    id: "12a-80g-registration",
    title: "12A & 80G Registration",
    shortDesc: "Register your NGO or trust under Section 12A and 80G. Get tax exemption and tax benefits for donors.",
    icon: "HeartHandshake",
    category: "Tax & GST",
  },
  {
    id: "shops-establishment",
    title: "Shops & Establishment Registration",
    shortDesc: "State registration for shops, offices, restaurants and other businesses.",
    icon: "Store",
    category: "Tax & GST",
  },
  {
    id: "labour-law-compliance",
    title: "Labour Law Compliance",
    shortDesc: "Help with Indian labour laws: Minimum Wages, Contract Labour, Bonus Act and more.",
    icon: "ShieldCheck",
    category: "Tax & GST",
  },
  {
    id: "posh-compliance",
    title: "POSH Compliance",
    shortDesc: "POSH Act compliance: set up the ICC, write the policy and file the yearly report.",
    icon: "Users",
    category: "Tax & GST",
  },
  {
    id: "factories-act",
    title: "Factories Act Compliance",
    shortDesc: "Factory license, annual returns and ongoing compliance under the Factories Act, 1948.",
    icon: "Factory",
    category: "Tax & GST",
  },

  // ── MCA / ROC Compliance ───────────────────────────────────────────
  {
    id: "roc-compliance",
    title: "ROC Annual Filing (Pvt Ltd)",
    shortDesc: "Yearly ROC filings for Private Limited Companies: AOC-4 and MGT-7.",
    icon: "FolderOpen",
    category: "MCA / ROC Compliance",
    popular: true,
  },
  {
    id: "llp-annual-filing",
    title: "LLP Annual Filing",
    shortDesc: "Yearly LLP filings: Form 11 (Annual Return) and Form 8 (Statement of Accounts).",
    icon: "Folder",
    category: "MCA / ROC Compliance",
  },
  {
    id: "director-kyc",
    title: "Director KYC (DIR-3 KYC)",
    shortDesc: "Yearly DIR-3 KYC filing, so your DIN stays active.",
    icon: "IdCard",
    category: "MCA / ROC Compliance",
  },
  {
    id: "change-in-directors",
    title: "Change in Directors / Shareholders",
    shortDesc: "Add, remove or change directors and shareholders, with the right MCA filings and resolutions.",
    icon: "UserCog",
    category: "MCA / ROC Compliance",
  },
  {
    id: "increase-authorised-capital",
    title: "Increase Authorised Capital",
    shortDesc: "Increase your company's authorised capital. We file SH-7 and MGT-14 with MCA.",
    icon: "TrendingUp",
    category: "MCA / ROC Compliance",
  },
  {
    id: "registered-office-change",
    title: "Registered Office Change",
    shortDesc: "Move your company's registered office. We file INC-22 and get ROC approval.",
    icon: "MapPinned",
    category: "MCA / ROC Compliance",
  },
  {
    id: "company-name-change",
    title: "Company Name Change",
    shortDesc: "Change your company name with MCA. We handle INC-1, the EGM resolution and the new COI.",
    icon: "Pencil",
    category: "MCA / ROC Compliance",
  },
  {
    id: "company-closure",
    title: "Strike Off / Company Closure",
    shortDesc: "Close your company through Fast Track Exit (STK-2) or NCLT winding-up.",
    icon: "XCircle",
    category: "MCA / ROC Compliance",
  },
  {
    id: "post-incorporation-compliance",
    title: "Post-Incorporation Compliance",
    shortDesc: "All the filings after incorporation: INC-20A, the first board meeting, share allotment and more.",
    icon: "ClipboardCheck",
    category: "MCA / ROC Compliance",
  },
  {
    id: "xbrl-filing",
    title: "XBRL Filing",
    shortDesc: "XBRL tagging and filing of financial statements, where MCA/SEBI rules require it.",
    icon: "FileCode",
    category: "MCA / ROC Compliance",
  },
  {
    id: "agm-services",
    title: "AGM & Board Meeting Services",
    shortDesc: "AGM and board meetings handled for you: notices, agenda, minutes and compliance.",
    icon: "CalendarCheck",
    category: "MCA / ROC Compliance",
  },
  {
    id: "share-transfer",
    title: "Share Transfer & Transmission",
    shortDesc: "Transfer shares legally: SH-4, stamp duty, board resolution and an updated register of members.",
    icon: "ArrowLeftRight",
    category: "MCA / ROC Compliance",
  },
  {
    id: "proprietorship-to-pvtltd",
    title: "Proprietorship to Pvt Ltd Conversion",
    shortDesc: "Convert your sole proprietorship into a Private Limited Company. We move the business over for you.",
    icon: "TrendingUp",
    category: "MCA / ROC Compliance",
  },
  {
    id: "partnership-to-llp",
    title: "Partnership to LLP Conversion",
    shortDesc: "Convert a partnership firm into an LLP. Keep the business running and gain limited liability.",
    icon: "GitMerge",
    category: "MCA / ROC Compliance",
  },
  {
    id: "llp-to-company",
    title: "LLP to Private Limited Company",
    shortDesc: "Convert your LLP into a Private Limited Company to raise equity and improve governance.",
    icon: "Building2",
    category: "MCA / ROC Compliance",
  },

  // ── Startup & MSME ─────────────────────────────────────────────────
  {
    id: "startup-india",
    title: "Startup India (DPIIT)",
    shortDesc: "DPIIT recognition for tax exemptions, funding and government schemes.",
    icon: "Rocket",
    category: "Startup & MSME",
  },
  {
    id: "msme-registration",
    title: "MSME / Udyam Registration",
    shortDesc: "Get your Udyam certificate and unlock government benefits.",
    icon: "Award",
    category: "Startup & MSME",
  },
  {
    id: "iec-registration",
    title: "IEC Registration",
    shortDesc: "Import Export Code registration for businesses that trade abroad.",
    icon: "Plane",
    category: "Startup & MSME",
  },
  {
    id: "fssai-license",
    title: "FSSAI Food License",
    shortDesc: "Get your FSSAI Basic, State or Central license. Every food business needs one.",
    icon: "UtensilsCrossed",
    category: "Startup & MSME",
    popular: true,
  },
  {
    id: "professional-tax",
    title: "Professional Tax Registration",
    shortDesc: "Register for Professional Tax (PT) in your state. Required for employers and professionals.",
    icon: "Briefcase",
    category: "Startup & MSME",
  },
  {
    id: "trade-license",
    title: "Trade License",
    shortDesc: "Get a Municipal Trade License to run your business legally from a commercial place.",
    icon: "Store",
    category: "Startup & MSME",
  },
  {
    id: "drug-license",
    title: "Drug License",
    shortDesc: "Get a Retail, Wholesale or Manufacturing Drug License from the State Drug Authority.",
    icon: "Pill",
    category: "Startup & MSME",
  },
  {
    id: "psara-license",
    title: "PSARA License",
    shortDesc: "PSARA license for security guard agencies in India.",
    icon: "Shield",
    category: "Startup & MSME",
  },
  {
    id: "lmpc-registration",
    title: "LMPC Registration",
    shortDesc: "LMPC registration for importers and packers of pre-packed goods.",
    icon: "Package",
    category: "Startup & MSME",
  },
  {
    id: "ayush-license",
    title: "AYUSH License",
    shortDesc: "Manufacturing and retail license for Ayurveda, Unani, Siddha and Homeopathy products.",
    icon: "Leaf",
    category: "Startup & MSME",
  },
  {
    id: "iso-certification",
    title: "ISO Certification",
    shortDesc: "ISO 9001, 14001, 22000, 27001 and other certifications for your business.",
    icon: "BadgeCheck",
    category: "Startup & MSME",
  },
  {
    id: "bis-registration",
    title: "BIS Registration (ISI Mark)",
    shortDesc: "BIS registration and the ISI Mark for electronics, toys and other regulated products.",
    icon: "ShieldCheck",
    category: "Startup & MSME",
  },
  {
    id: "environment-clearance",
    title: "Environment Clearance (PCB)",
    shortDesc: "Pollution Control Board clearances: Consent to Establish (CTE) and Consent to Operate (CTO).",
    icon: "TreePine",
    category: "Startup & MSME",
  },
  {
    id: "dot-telecom-license",
    title: "DOT / Telecom License",
    shortDesc: "Telecom licenses from DOT: ISP, OSP, VNO and more.",
    icon: "Radio",
    category: "Startup & MSME",
  },
  {
    id: "apeda-registration",
    title: "APEDA Registration",
    shortDesc: "APEDA registration for exporters of farm and processed food products.",
    icon: "Wheat",
    category: "Startup & MSME",
  },
  {
    id: "barcode-registration",
    title: "Barcode Registration (GS1 India)",
    shortDesc: "GS1 India barcodes for tracking products, retail and e-commerce.",
    icon: "Barcode",
    category: "Startup & MSME",
  },
  {
    id: "epr-registration",
    title: "EPR Registration",
    shortDesc: "EPR registration for makers and importers of plastic, e-waste and batteries.",
    icon: "Recycle",
    category: "Startup & MSME",
  },

  // ── Intellectual Property ──────────────────────────────────────────
  {
    id: "trademark-registration",
    title: "Trademark Registration",
    shortDesc: "Protect your brand with trademark registration and monitoring.",
    icon: "ShieldCheck",
    category: "Intellectual Property",
  },
  {
    id: "trademark-objection",
    title: "Trademark Objection Reply",
    shortDesc: "Expert reply to a trademark objection, to save your application.",
    icon: "MessageSquareWarning",
    category: "Intellectual Property",
  },
  {
    id: "trademark-renewal",
    title: "Trademark Renewal",
    shortDesc: "Renew your trademark every 10 years to keep your brand rights.",
    icon: "RefreshCw",
    category: "Intellectual Property",
  },
  {
    id: "copyright-registration",
    title: "Copyright Registration",
    shortDesc: "Register copyright for writing, art, music, software or films under the Copyright Act.",
    icon: "Copyright",
    category: "Intellectual Property",
  },
  {
    id: "patent-registration",
    title: "Patent Registration",
    shortDesc: "Protect your invention with a patent. We handle filing, examination and grant.",
    icon: "Lightbulb",
    category: "Intellectual Property",
  },
  {
    id: "design-registration",
    title: "Design Registration",
    shortDesc: "Register how your product looks under the Designs Act, 2000.",
    icon: "Palette",
    category: "Intellectual Property",
  },
  {
    id: "trademark-watch",
    title: "Trademark Watch Service",
    shortDesc: "Watch the trademark registry for clashing new filings and protect your brand.",
    icon: "Eye",
    category: "Intellectual Property",
  },
  {
    id: "trademark-assignment",
    title: "Trademark Assignment & Transfer",
    shortDesc: "Transfer a registered trademark to a new owner with TM-P filing and an assignment deed.",
    icon: "ArrowRightLeft",
    category: "Intellectual Property",
  },
  {
    id: "international-trademark",
    title: "International Trademark (Madrid)",
    shortDesc: "File trademarks abroad via the Madrid Protocol and protect your brand in 130+ countries.",
    icon: "Globe",
    category: "Intellectual Property",
  },
  {
    id: "gi-tag-registration",
    title: "GI Tag Registration",
    shortDesc: "Register a GI tag for products known for where they come from.",
    icon: "MapPin",
    category: "Intellectual Property",
  },
  {
    id: "patent-search",
    title: "Patent Search & Drafting",
    shortDesc: "Prior art search, patentability opinion and full patent drafting by technical experts.",
    icon: "Search",
    category: "Intellectual Property",
  },

  // ── Payroll & HR ───────────────────────────────────────────────────
  {
    id: "pf-registration",
    title: "PF Registration & ECR Filing",
    shortDesc: "EPF employer registration and monthly ECR filing with EPFO.",
    icon: "Landmark",
    category: "Payroll & HR",
  },
  {
    id: "esic-registration",
    title: "ESIC Registration & Returns",
    shortDesc: "ESI employer registration, monthly payments and half-yearly returns.",
    icon: "HeartPulse",
    category: "Payroll & HR",
  },
  {
    id: "payroll-management",
    title: "Payroll Management",
    shortDesc: "Payroll from start to finish: salary structure, processing and compliance.",
    icon: "Wallet",
    category: "Payroll & HR",
  },
  {
    id: "gratuity-trust",
    title: "Gratuity Trust Registration",
    shortDesc: "Set up a private gratuity trust to meet your Payment of Gratuity Act duties.",
    icon: "HandHeart",
    category: "Payroll & HR",
  },

  // ── Accounting & Finance ───────────────────────────────────────────
  {
    id: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    shortDesc: "Clean books, financial statements and MIS reports, so you can decide well.",
    icon: "BookOpen",
    category: "Accounting & Finance",
  },
  {
    id: "virtual-cfo",
    title: "Virtual CFO Services",
    shortDesc: "A senior finance head when you need one: budgets, MIS, fundraising and investor relations.",
    icon: "LineChart",
    category: "Accounting & Finance",
  },
  {
    id: "business-valuation",
    title: "Business Valuation",
    shortDesc: "Certified business valuation for funding, M&A, ESOPs or regulatory filings.",
    icon: "BarChart3",
    category: "Accounting & Finance",
  },
  {
    id: "financial-statements",
    title: "Financial Statement Preparation",
    shortDesc: "P&L, Balance Sheet and Cash Flow Statement as per the Companies Act and accounting standards.",
    icon: "FileSpreadsheet",
    category: "Accounting & Finance",
  },
];


/* WS-5.2 / WS-5.3 — two exports were REMOVED from here on 17 Aug 2026:
 *
 *   STATS         duplicated the figures Stats.tsx owns, including a bare
 *                 "Years Experience" label. Two sources for one claim is how
 *                 they drift apart.
 *   TESTIMONIALS  a second copy of the five fabricated personas (Arjun Sharma,
 *                 Priya Mehta, Rohan Kapoor, Neha Singh, Vikram Patel). None
 *                 traced to a real review. Deleting them from Testimonials.tsx
 *                 while leaving an importable copy here just relocated the
 *                 hazard.
 *
 * Neither was referenced anywhere in src/. Testimonials now come only from live
 * Google Places data — see src/components/sections/Testimonials.tsx. Do not
 * reintroduce a hardcoded testimonial array. */


export const TRUST_LOGOS = [
  "Google",
  "Startup India",
  "MSME",
  "DPIIT",
  "MCA",
  "GST Network",
  "Income Tax",
  "ISO Certified",
  "Google Reviews",
  "Xero",
  "Zoho Books",
  "QuickBooks",
  "Tally",
  "Slack",
  "Razorpay",
];

export const WHY_CHOOSE = [
  {
    icon: "UserCheck",
    title: "Experienced Professionals",
    desc: "CAs, CSs, and legal experts with 15+ years handling thousands of compliance cases.",
  },
  {
    icon: "Zap",
    title: "Fast Turnaround",
    desc: "Streamlined processes ensure your filings are completed faster than industry standards.",
  },
  {
    icon: "DollarSign",
    title: "Transparent Pricing",
    desc: "No hidden charges. Fixed pricing with detailed breakdowns before you commit.",
  },
  {
    icon: "Headphones",
    title: "Dedicated Relationship Manager",
    desc: "A single point of contact who knows your business and is always reachable.",
  },
  {
    icon: "CheckCircle",
    title: "End-to-End Compliance",
    desc: "From registration to annual filings — we handle it all so you can focus on growth.",
  },
  {
    icon: "Monitor",
    title: "100% Online Process",
    desc: "Fully digital workflow with secure document sharing, e-signatures, and live tracking.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Discuss your requirements with our expert team. We assess your needs and recommend the right services.",
  },
  {
    step: "02",
    title: "Document Collection",
    desc: "We provide a precise document checklist. Upload securely through our digital portal.",
  },
  {
    step: "03",
    title: "Application Filing",
    desc: "Our experts prepare and file accurate applications with the relevant government authorities.",
  },
  {
    step: "04",
    title: "Government Processing",
    desc: "We track your application status and liaise with authorities for any clarifications required.",
  },
  {
    step: "05",
    title: "Approval & Delivery",
    desc: "Certificates and documents are delivered digitally to your email and dashboard.",
  },
  {
    step: "06",
    title: "Ongoing Support",
    desc: "Your dedicated manager ensures continued compliance with proactive reminders and advisory.",
  },
];

export const INDUSTRIES = [
  { name: "IT & Technology", icon: "Monitor", desc: "Software, SaaS, IT services & digital agencies" },
  { name: "Manufacturing", icon: "Factory", desc: "MSME, large-scale, and export manufacturers" },
  { name: "Healthcare", icon: "Heart", desc: "Clinics, diagnostics, pharma & health startups" },
  { name: "Retail & E-commerce", icon: "ShoppingBag", desc: "Online stores, marketplaces & physical retail" },
  { name: "Import & Export", icon: "Globe", desc: "Trading businesses with IEC & customs needs" },
  { name: "Real Estate", icon: "Building", desc: "Developers, agents, and property businesses" },
  { name: "Education", icon: "GraduationCap", desc: "EdTech, schools, coaching & training institutes" },
  { name: "Hospitality", icon: "Hotel", desc: "Hotels, restaurants, food & beverage businesses" },
  { name: "Finance", icon: "TrendingUp", desc: "NBFCs, brokers, fintechs & financial advisors" },
];

export const BLOG_POSTS = [
  {
    id: "private-limited-company-registration-guide",
    title: "Complete Guide to Private Limited Company Registration in India (2024)",
    excerpt: "Everything you need to know about incorporating a Pvt. Ltd. company — documents, timeline, costs, and compliance requirements.",
    category: "Company Registration",
    readTime: "8 min read",
    date: "Dec 12, 2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  },
  {
    id: "gst-registration-process",
    title: "GST Registration Process: Step-by-Step Guide for New Businesses",
    excerpt: "A clear walkthrough of the GST registration process, eligibility criteria, required documents, and common mistakes to avoid.",
    category: "GST",
    readTime: "6 min read",
    date: "Dec 8, 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    id: "trademark-registration-india",
    title: "Why Trademark Registration is Critical for Your Brand in India",
    excerpt: "Protect your brand identity before someone else does. Understanding trademark classes, filing timelines, and enforcement.",
    category: "Trademark",
    readTime: "5 min read",
    date: "Nov 28, 2024",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  },
];
