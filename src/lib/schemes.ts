// ─────────────────────────────────────────────────────────────────────────────
// Government schemes & initiatives for Indian startups.
//
// Curated from the DPIIT / Startup India "Playbook of Government Schemes and
// Initiatives for Startups" (June 2026) and cross-checked against the nodal
// ministry / implementing-agency portals cited in each scheme's `links`.
//
// PLAIN MODULE — no "use client". Both server pages and client components read
// from here, so this file must never become a client module.
//
// Scheme amounts, windows and eligibility change with every call/notification.
// Every figure below is indicative and must be re-verified on the official
// portal before an application is filed.
// ─────────────────────────────────────────────────────────────────────────────

import { SCHEMES_STARTUP_SPECIFIC } from "./schemes-a";
import { SCHEMES_STARTUP_RELEVANT } from "./schemes-b";
import type { Scheme, SupportType, Stage } from "./schemes-taxonomy";

// Types and the filter vocabularies live in `schemes-taxonomy.ts` — a
// dependency-free module the client bundle can import without dragging the
// whole scheme catalogue along. Re-exported here so existing imports keep
// working and server code has a single entry point.
export type {
  Scheme,
  SchemeSummary,
  SchemeStep,
  SchemeLink,
  SupportType,
  Stage,
  Sector,
  Focus,
} from "./schemes-taxonomy";
export { SUPPORT_TYPES, STAGES, SECTORS, toSummary } from "./schemes-taxonomy";

/** Every scheme in the directory — Part A (startup-specific) then Part B. */
export const SCHEMES: Scheme[] = [
  ...SCHEMES_STARTUP_SPECIFIC,
  ...SCHEMES_STARTUP_RELEVANT,
];

export function getScheme(slug: string): Scheme | undefined {
  return SCHEMES.find((s) => s.slug === slug);
}

/** Resolve an ordered list of slugs to schemes, silently dropping unknown ones. */
export function schemesBySlugs(slugs: string[]): Scheme[] {
  return slugs
    .map((slug) => SCHEMES.find((s) => s.slug === slug))
    .filter((s): s is Scheme => Boolean(s));
}

/**
 * Related schemes: same sector first, then same support type, then same stage.
 * Deduped, excluding the scheme itself.
 */
export function relatedSchemes(scheme: Scheme, limit = 3): Scheme[] {
  const pool = SCHEMES.filter((s) => s.slug !== scheme.slug);
  const score = (s: Scheme) => {
    let n = 0;
    if (s.sectors.some((x) => scheme.sectors.includes(x) && x !== "Sector Agnostic")) n += 3;
    if (s.support === scheme.support) n += 2;
    if (s.stages.some((x) => scheme.stages.includes(x))) n += 1;
    if (s.ministry === scheme.ministry) n += 1;
    return n;
  };
  return [...pool].sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export const SUPPORT_BLURB: Record<SupportType, string> = {
  Grant: "Money you never repay and no equity given up. The cleanest capital a startup can raise.",
  Equity: "Government-backed funds invest for a stake — usually routed through SEBI-registered AIFs.",
  "Loan / Credit": "Repayable debt, or a government guarantee that lets a lender drop the collateral demand.",
  Incubation: "Lab, workspace, testbeds, mentoring and ecosystem access — often with a seed cheque attached.",
  "Market Access": "Routes to sell: public procurement, exports, trade fairs and IP protection.",
  Mixed: "A blend — typically grant plus debt, or funding plus incubation under one scheme.",
};

/** Counts used for the hub hero and directory chips. */
export function schemeStats() {
  const ministries = new Set(SCHEMES.map((s) => s.ministry));
  return {
    total: SCHEMES.length,
    startupSpecific: SCHEMES.filter((s) => s.focus === "Startup-Specific").length,
    ministries: ministries.size,
    grants: SCHEMES.filter((s) => s.support === "Grant").length,
    equity: SCHEMES.filter((s) => s.support === "Equity").length,
    credit: SCHEMES.filter((s) => s.support === "Loan / Credit").length,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// "Find your scheme in 5 questions" — the decision tree from the DPIIT playbook,
// rebuilt as a linear questionnaire the visitor can actually click through.
// ─────────────────────────────────────────────────────────────────────────────

export interface TreeOption {
  label: string;
  hint?: string;
  /** Scheme slugs this branch recommends. */
  schemes: string[];
}

export interface TreeQuestion {
  id: string;
  question: string;
  helper?: string;
  options: TreeOption[];
}

export const DECISION_TREE: TreeQuestion[] = [
  {
    id: "who",
    question: "Where are you today?",
    helper: "Government schemes split hard on whether a legal entity exists yet.",
    options: [
      {
        label: "Just an idea — not incorporated",
        hint: "Student, researcher or aspiring founder",
        schemes: ["nidhi-eir", "e-yuva", "sitare", "atal-tinkering-labs", "nidhi-prayas"],
      },
      {
        label: "Incorporated, no DPIIT recognition yet",
        hint: "Company/LLP registered — recognition is the next unlock",
        schemes: ["startup-india-seed-fund-scheme", "prism", "tide-2", "genesis"],
      },
      {
        label: "DPIIT-recognised startup",
        hint: "You can access the full startup-specific catalogue",
        schemes: [
          "startup-india-seed-fund-scheme",
          "credit-guarantee-scheme-for-startups",
          "sipp",
          "gem-startup-runway",
        ],
      },
    ],
  },
  {
    id: "stage",
    question: "What stage is the product at?",
    options: [
      {
        label: "Idea / proof-of-concept",
        hint: "Nothing built yet, or a rough demo",
        schemes: ["biotechnology-ignition-grant", "nidhi-prayas", "rkvy-agri-entrepreneurship", "sparsh", "great-technical-textiles"],
      },
      {
        label: "Working prototype",
        hint: "Something demonstrable, pre-revenue",
        schemes: ["startup-india-seed-fund-scheme", "nidhi-seed-support-program", "tide-2", "idex", "in-space-seed-fund", "dcis"],
      },
      {
        label: "In market, scaling",
        hint: "Paying customers, looking for growth capital",
        schemes: ["fund-of-funds-for-startups", "startup-india-fund-of-funds-2", "ace-fund", "agrisure", "rdi-scheme"],
      },
    ],
  },
  {
    id: "need",
    question: "What kind of money do you actually need?",
    options: [
      {
        label: "Grant — no repayment, no dilution",
        schemes: ["startup-india-seed-fund-scheme", "biotechnology-ignition-grant", "idex", "aditi", "nidhi-prayas", "dcis", "in-space-seed-fund", "national-quantum-mission"],
      },
      {
        label: "Equity — happy to give a stake",
        schemes: ["fund-of-funds-for-startups", "startup-india-fund-of-funds-2", "ace-fund", "agrisure", "birac-seed-fund", "leap-fund", "samridh", "antariksh-vcf"],
      },
      {
        label: "Loan or credit guarantee",
        schemes: ["credit-guarantee-scheme-for-startups", "cgtmse", "pradhan-mantri-mudra-yojana", "stand-up-india"],
      },
      {
        label: "Not money — lab, mentors or market access",
        schemes: ["sipp", "gem-startup-runway", "nidhi-tbi", "bionest", "atal-incubation-centres", "stpi-ngis"],
      },
    ],
  },
  {
    id: "sector",
    question: "Are you in a strategic or deep-tech sector?",
    helper: "Sector-specific windows are far less crowded than the horizontal ones.",
    options: [
      {
        label: "Defence & aerospace",
        schemes: ["idex", "aditi", "technology-development-fund"],
      },
      {
        label: "Space",
        schemes: ["in-space-seed-fund", "antariksh-vcf", "space-technology-adoption-fund"],
      },
      {
        label: "Biotech, medtech & life sciences",
        schemes: ["biotechnology-ignition-grant", "birac-seed-fund", "leap-fund", "sparsh", "ace-fund", "sbiri", "bionest"],
      },
      {
        label: "Agriculture & food",
        schemes: ["rkvy-agri-entrepreneurship", "agrisure", "bharati", "pmfme", "agriculture-infrastructure-fund"],
      },
      {
        label: "Semiconductor & electronics",
        schemes: ["design-linked-incentive", "chips-to-startup", "genesis"],
      },
      {
        label: "Quantum, AI & advanced computing",
        schemes: ["national-quantum-mission", "nm-icps", "rdi-scheme"],
      },
      {
        label: "None of these — I'm sector agnostic",
        schemes: ["startup-india-seed-fund-scheme", "credit-guarantee-scheme-for-startups", "fund-of-funds-for-startups", "genesis", "samridh"],
      },
    ],
  },
  {
    id: "profile",
    question: "Does any of this describe your promoters or location?",
    helper: "Reserved windows carry far less competition. Pick the one that fits best.",
    options: [
      {
        label: "SC/ST or woman founder",
        schemes: ["stand-up-india", "venture-capital-fund-scheduled-castes", "national-sc-st-hub", "sti-hubs-sc-st"],
      },
      {
        label: "Based in a Tier-II / Tier-III city",
        schemes: ["genesis", "stpi-ngis", "nidhi-i-tbi", "atal-community-innovation-centres"],
      },
      {
        label: "Rural or cooperative enterprise",
        schemes: ["svep", "yuva-sahakar", "national-livestock-mission", "pmfme"],
      },
      {
        label: "None of the above",
        schemes: ["startup-india-seed-fund-scheme", "credit-guarantee-scheme-for-startups", "sipp"],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// "What do you need?" index — the fastest route for a founder who already knows
// what kind of capital they are after.
// ─────────────────────────────────────────────────────────────────────────────

export interface NeedRow {
  need: string;
  icon: string;
  blurb: string;
  specific: string[];
  relevant: string[];
}

export const NEED_INDEX: NeedRow[] = [
  {
    need: "Grant — funding with no repayment",
    icon: "Gift",
    blurb: "Non-dilutive, non-repayable. Milestone-linked and audited, but it is the cheapest capital in existence.",
    specific: [
      "startup-india-seed-fund-scheme",
      "biotechnology-ignition-grant",
      "nidhi-prayas",
      "idex",
      "aditi",
      "dcis",
      "in-space-seed-fund",
      "rkvy-agri-entrepreneurship",
      "sparsh",
      "great-technical-textiles",
      "national-quantum-mission",
    ],
    relevant: ["tide-2", "bipp", "sbiri", "prism", "pace", "e-yuva", "sitare", "nm-icps", "mahir"],
  },
  {
    need: "Equity investment (VC / angel)",
    icon: "TrendingUp",
    blurb: "Government capital routed through SEBI-registered AIFs, which then invest in you on commercial terms.",
    specific: [
      "fund-of-funds-for-startups",
      "startup-india-fund-of-funds-2",
      "ace-fund",
      "agrisure",
      "birac-seed-fund",
      "leap-fund",
      "samridh",
    ],
    relevant: ["antariksh-vcf", "self-reliant-india-fund", "bioangels", "venture-capital-fund-scheduled-castes"],
  },
  {
    need: "Loan or credit support",
    icon: "Landmark",
    blurb: "Collateral-free debt — the government guarantees the lender instead of you pledging assets.",
    specific: ["credit-guarantee-scheme-for-startups"],
    relevant: [
      "cgtmse",
      "pradhan-mantri-mudra-yojana",
      "stand-up-india",
      "pmfme",
      "national-livestock-mission",
      "yuva-sahakar",
      "agriculture-infrastructure-fund",
    ],
  },
  {
    need: "Incubation, lab & mentoring",
    icon: "FlaskConical",
    blurb: "Wet labs, testbeds, cloud credits, workspace and mentors — often the gateway to the seed cheque.",
    specific: ["genesis", "samridh", "stpi-ngis", "chips-to-startup"],
    relevant: [
      "nidhi-tbi",
      "nidhi-i-tbi",
      "bionest",
      "atal-incubation-centres",
      "atal-community-innovation-centres",
      "established-incubation-centres",
      "tide-2",
      "nm-icps",
      "esdp",
    ],
  },
  {
    need: "IP protection (patents, trademarks)",
    icon: "ShieldCheck",
    blurb: "The government pays your IP facilitator and slashes the statutory fee — the single most under-used startup benefit.",
    specific: ["sipp"],
    relevant: ["msme-champions-scheme"],
  },
  {
    need: "Market access & selling to government",
    icon: "Store",
    blurb: "Public procurement without the turnover and prior-experience walls, plus export acceleration.",
    specific: ["gem-startup-runway", "bharati"],
    relevant: ["international-cooperation-scheme", "national-sc-st-hub"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle map — scheme sets by stage of the startup journey.
// ─────────────────────────────────────────────────────────────────────────────

export interface LifecycleRow {
  stage: Stage;
  label: string;
  description: string;
  schemes: string[];
}

export const LIFECYCLE_MAP: LifecycleRow[] = [
  {
    stage: "Ideation",
    label: "Ideation",
    description: "You have an idea but no prototype or product yet.",
    schemes: ["nidhi-eir", "biotechnology-ignition-grant", "nidhi-prayas", "prism", "rkvy-agri-entrepreneurship", "sparsh", "genesis", "e-yuva", "sitare", "atal-tinkering-labs"],
  },
  {
    stage: "Prototype / PoC",
    label: "Prototype / PoC",
    description: "Idea validated — you are building or testing a working prototype.",
    schemes: ["startup-india-seed-fund-scheme", "nidhi-prayas", "idex", "in-space-seed-fund", "dcis", "technology-development-fund", "chips-to-startup", "great-technical-textiles", "st-prism", "tide-2", "sbiri", "bipp", "nm-icps"],
  },
  {
    stage: "Seed / Early Stage",
    label: "Seed / Early Stage",
    description: "Prototype done — entering the market or running a paid pilot.",
    schemes: ["startup-india-seed-fund-scheme", "nidhi-seed-support-program", "leap-fund", "samridh", "agrisure", "aditi", "cgtmse", "pradhan-mantri-mudra-yojana", "bionest", "stpi-ngis"],
  },
  {
    stage: "Growth / Scaling",
    label: "Growth / Scaling",
    description: "Product in market — you are scaling operations, team and capital.",
    schemes: ["fund-of-funds-for-startups", "startup-india-fund-of-funds-2", "ace-fund", "agrisure", "antariksh-vcf", "national-quantum-mission", "rdi-scheme", "credit-guarantee-scheme-for-startups", "self-reliant-india-fund"],
  },
  {
    stage: "Market Access & IP",
    label: "Market Access & IP",
    description: "Ready to sell, export or protect the innovation you have built.",
    schemes: ["gem-startup-runway", "sipp", "bharati", "space-technology-adoption-fund", "msme-champions-scheme", "international-cooperation-scheme"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// How Company Avenue Advisory runs a scheme mandate.
// ─────────────────────────────────────────────────────────────────────────────

export const CAA_PROCESS = [
  {
    step: "01",
    title: "Free eligibility screen",
    desc: "We map your entity age, DPIIT status, turnover, sector and prior government funding against every open window — and tell you honestly which ones you cannot win. No fee for this call.",
  },
  {
    step: "02",
    title: "Get the paperwork right first",
    desc: "Most rejections are structural, not strategic. We fix the entity, DPIIT recognition, Udyam, GST and books before a single application goes out.",
  },
  {
    step: "03",
    title: "Build the application",
    desc: "Innovation and scalability note, CA-certified financial projections, DPR or CMA data, cap table and pitch deck — prepared to the format the evaluating committee actually reads.",
  },
  {
    step: "04",
    title: "File and shortlist",
    desc: "We file on the scheme portal and, where the route runs through incubators or member lending institutions, shortlist three to five that match your sector and stage.",
  },
  {
    step: "05",
    title: "Defend it in the interview",
    desc: "Mock Q&A on the numbers, the moat and the use of funds — plus written responses to committee queries within the reply window.",
  },
  {
    step: "06",
    title: "Survive the post-sanction year",
    desc: "Utilisation certificates, milestone reports, statutory audit and the compliance calendar. Grants get clawed back on reporting failures far more often than on performance.",
  },
];

export const CAA_DIFFERENTIATORS = [
  {
    icon: "FileSearch",
    title: "Honest go / no-go",
    desc: "We decline mandates we do not believe in. A burnt application to the right incubator costs you a year.",
  },
  {
    icon: "Calculator",
    title: "CA-certified numbers",
    desc: "Projections, DPR and CMA data signed with UDIN by a practising Chartered Accountant — every assumption backed by a workpaper.",
  },
  {
    icon: "Landmark",
    title: "Entity-to-grant under one roof",
    desc: "Incorporation, DPIIT, Udyam, GST, IP and the scheme application handled by one team — no hand-offs, no gaps.",
  },
  {
    icon: "CalendarCheck",
    title: "Post-sanction discipline",
    desc: "Utilisation certificates and milestone reporting diarised from day one, so tranche two actually lands.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Section 4 of the playbook — PSU, regulator and state/UT initiatives.
// ─────────────────────────────────────────────────────────────────────────────

export const PSU_INITIATIVES: { org: string; initiative: string; href: string }[] = [
  { org: "ONGC", initiative: "ONGC Startup Fund", href: "https://startup.ongc.co.in/web/ongcstartup" },
  { org: "BHEL", initiative: "SanRachna Platform", href: "https://sanrachna.bhel.in/home" },
  { org: "Bharat Petroleum", initiative: "Project Ankur / Ankur Fund", href: "https://ebiz.bpc.co.in/BPCLStartup/" },
  { org: "Coal India", initiative: "CIL Innovation & Incubation Centre", href: "https://ciicentre.iitism.ac.in/" },
  { org: "GAIL (India)", initiative: "Pankh", href: "https://gailebank.gail.co.in/GSUICBG/frmStartUpGAIL.aspx" },
  { org: "Hindustan Petroleum", initiative: "HP Udgam", href: "https://startup.hpcl.co.in/HPCLStartup/index.jsp" },
  { org: "Indian Oil", initiative: "IndS_UP Startup Scheme", href: "https://iocl.com/pages/r-and-d-centre" },
  { org: "SAIL", initiative: "Startup Connect", href: "https://webapp.sailcorp.in/startup/" },
  { org: "Oil India", initiative: "Start Up Fund", href: "https://www.oil-india.com/start-fund" },
  { org: "Engineers India", initiative: "EngSUI", href: "https://www6.eil.co.in/engsui/Open/Default.aspx" },
  { org: "Bharat Dynamics", initiative: "BDL Start Ups", href: "https://bdl-india.in/en/start-ups" },
  { org: "EXIM Bank", initiative: "Ubharte Sitaare", href: "https://www.sidbiventure.co.in/ubharte_sitaare_fund.html" },
  { org: "Reserve Bank of India", initiative: "Regulatory Sandbox", href: "https://fintech.rbi.org.in/FS_Publications?id=1262" },
  { org: "IRDAI", initiative: "Regulatory Sandbox", href: "https://irdai.gov.in/document-detail?documentId=6541188" },
  { org: "IFSCA", initiative: "Regulatory Sandbox", href: "https://ifsca.gov.in/Legal/Index?MId=IeTjhim8HvY=" },
  { org: "SEBI", initiative: "Regulatory Sandbox", href: "https://www.sebi.gov.in/legal/circulars/jun-2021/revised-framework-for-regulatory-sandbox_50521.html" },
];

export const STATE_PORTALS: { state: string; href: string }[] = [
  { state: "Andhra Pradesh", href: "https://apis.ap.gov.in/home/" },
  { state: "Arunachal Pradesh", href: "https://www.startup.arunachal.gov.in/startup-policy" },
  { state: "Assam", href: "http://startup.assam.gov.in/" },
  { state: "Bihar", href: "https://startup.bihar.gov.in/" },
  { state: "Chhattisgarh", href: "https://invest.cg.gov.in/startup" },
  { state: "Delhi", href: "https://industries.delhi.gov.in/" },
  { state: "Goa", href: "https://www.startup.goa.gov.in/index" },
  { state: "Gujarat", href: "https://startup.gujarat.gov.in/home" },
  { state: "Haryana", href: "https://startupharyana.gov.in/" },
  { state: "Himachal Pradesh", href: "https://emerginghimachal.hp.gov.in/startup/" },
  { state: "Jammu & Kashmir", href: "https://startupjk.com/" },
  { state: "Jharkhand", href: "https://abvil.jharkhand.gov.in/documents/Policy2023.pdf" },
  { state: "Karnataka", href: "https://www.missionstartupkarnataka.org/?en" },
  { state: "Kerala", href: "https://startupmission.kerala.gov.in/" },
  { state: "Ladakh", href: "https://ediiladakh.org/" },
  { state: "Madhya Pradesh", href: "https://startup.mp.gov.in/" },
  { state: "Maharashtra", href: "https://msins.in/" },
  { state: "Manipur", href: "https://startupmanipur.in/" },
  { state: "Meghalaya", href: "https://www.primemeghalaya.com/" },
  { state: "Mizoram", href: "https://startupmizoram.com/" },
  { state: "Nagaland", href: "https://www.startupnagaland.in/" },
  { state: "Odisha", href: "https://startupodisha.gov.in/" },
  { state: "Puducherry", href: "https://industry.py.gov.in/startup-policy-2019" },
  { state: "Punjab", href: "https://pbindustries.gov.in/startup/home" },
  { state: "Rajasthan", href: "https://istart.rajasthan.gov.in/" },
  { state: "Sikkim", href: "https://sikkimentrepreneur.org" },
  { state: "Tamil Nadu", href: "https://startuptn.in/" },
  { state: "Telangana", href: "https://startup.telangana.gov.in/" },
  { state: "Tripura", href: "https://startup.tripura.gov.in/" },
  { state: "Uttar Pradesh", href: "https://startinup.up.gov.in/" },
  { state: "Uttarakhand", href: "https://startuputtarakhand.uk.gov.in/" },
  { state: "West Bengal", href: "https://www.startupbengal.in/" },
];

// ─────────────────────────────────────────────────────────────────────────────

export const SCHEME_FAQS = [
  {
    q: "Do I need DPIIT recognition before applying for government startup funding?",
    a: "For the startup-specific schemes — SISFS, CGSS, SIPP, GeM Startup Runway, RKVY, IN-SPACe Seed Fund and most others in Part A — yes, DPIIT recognition is a hard eligibility gate. It is free, usually issued in 2–10 working days, and also unlocks the 80% patent fee rebate, the 50% trademark rebate and self-certification under labour and environment laws. If you are not recognised yet, that is step one, and it is the cheapest step in the entire journey.",
  },
  {
    q: "Is a government grant really free money?",
    a: "It is non-repayable and non-dilutive, which is as close to free as capital gets. But it is milestone-linked and audited: you draw funds tranche by tranche against agreed deliverables, and you file utilisation certificates. Spend outside the sanctioned heads and the money can be recovered. Treat a grant as a contract with reporting obligations, not as a windfall.",
  },
  {
    q: "How long does it actually take from application to money in the bank?",
    a: "Realistically, three to nine months. Our part — eligibility screen, financials, application and filing — takes 10 to 15 working days. After that you are on the government's clock: DPIIT recognition is 2–10 working days, an incubator evaluation under SISFS runs 4–12 weeks, a bank appraisal under CGSS or a scheme loan runs 3–8 weeks, and IMB scrutiny for the 80-IAC tax holiday runs into months. Anyone promising you a sanction date is guessing.",
  },
  {
    q: "Can one startup apply to more than one scheme?",
    a: "Yes, and most well-advised startups do — a grant for the prototype, a credit guarantee for working capital and SIPP for the IP can all run in parallel. But watch the caps: SISFS requires that you have not taken more than ₹10 lakh of monetary support under any other Central or State scheme, and the IN-SPACe Seed Fund sets that ceiling at ₹50 lakh. Sequencing matters, which is exactly what the eligibility screen is for.",
  },
  {
    q: "Why are most applications rejected?",
    a: "In our experience, rarely because the business is bad. It is a vague innovation note that could describe any company, financial projections with no workpaper behind them, an eligibility breach the founder did not know about, a missed reply window on a committee query, or applying to an incubator whose sector focus does not match. Every one of those is preventable before filing.",
  },
  {
    q: "What does Company Avenue Advisory charge, and do you take a cut of the grant?",
    a: "Fixed professional fees, quoted in writing before we start — DPIIT recognition ₹7,999 (₹6,999 alongside an incorporation), the startup grant readiness pack ₹9,999 in two stages, Section 80-IAC ₹24,999, SISFS advisory from ₹24,999, government scheme loan advisory from ₹7,999. On SISFS we also charge a success fee on the sanctioned amount, disclosed upfront. On government loan schemes we charge no success fee at all. Government fees, where they exist, are billed at actuals.",
  },
  {
    q: "Can you guarantee my application will be sanctioned?",
    a: "No, and you should walk away from anyone who says otherwise. Sanction sits with an incubator committee, a bank credit team or a ministry evaluation panel — never with a consultant. What we commit to is an honest eligibility view, an application built to the evaluator's format, filing inside the window and a documented follow-up cadence. That is stated in bold in every engagement letter we sign.",
  },
  {
    q: "We are a Tier-II city or a first-generation founder. Does that help or hurt?",
    a: "It helps, materially. GENESIS and STPI-NGIS exist specifically for Tier-II/III technology startups, NIDHI i-TBI and ACIC target underserved regions, and Stand-Up India, the National SC-ST Hub and VCF-SC are reserved windows for SC/ST and women founders. These windows are far less crowded than the national ones — and they are the first thing we check on the screening call.",
  },
];
