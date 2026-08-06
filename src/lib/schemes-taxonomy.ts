// ─────────────────────────────────────────────────────────────────────────────
// Scheme taxonomy — types plus the three small filter vocabularies.
//
// Deliberately dependency-free. The client-side directory and finder import
// their runtime values from HERE rather than from `schemes.ts`, so the bundler
// never pulls the ~69-scheme content graph into the browser bundle. Full scheme
// records are projected to `SchemeSummary` on the server and passed as props.
// ─────────────────────────────────────────────────────────────────────────────

/** What the startup actually receives. */
export type SupportType =
  | "Grant"
  | "Equity"
  | "Loan / Credit"
  | "Incubation"
  | "Market Access"
  | "Mixed";

/** Where the startup is in its journey. */
export type Stage =
  | "Ideation"
  | "Prototype / PoC"
  | "Seed / Early Stage"
  | "Growth / Scaling"
  | "Market Access & IP";

export type Sector =
  | "Sector Agnostic"
  | "Deep Tech"
  | "Biotech & Life Sciences"
  | "Agriculture & Food"
  | "Defence & Aerospace"
  | "Space"
  | "Semiconductor & Electronics"
  | "IT & Software"
  | "Telecom"
  | "Textiles"
  | "Mining & Metals"
  | "Energy & Power"
  | "Fintech"
  | "Rural & Social"
  | "Manufacturing"
  | "Students & Academia";

export type Focus = "Startup-Specific" | "Startup-Relevant";

export interface SchemeStep {
  title: string;
  detail: string;
}

export interface SchemeLink {
  label: string;
  href: string;
}

/**
 * The card-and-filter shape. Everything the directory, the finder and the
 * related-scheme rails need — and nothing else.
 */
export interface SchemeSummary {
  slug: string;
  name: string;
  /** Short form used on cards and chips, e.g. "SISFS". */
  abbr?: string;
  /** Nodal ministry / department. */
  ministry: string;
  focus: Focus;
  support: SupportType;
  stages: Stage[];
  sectors: Sector[];
  /** One-line description used on directory cards. */
  headline: string;
  /** Headline quantum of support. */
  amount: string;
}

/** A full scheme one-pager. */
export interface Scheme extends SchemeSummary {
  /** Implementing agency, where different from the ministry. */
  agency?: string;
  /** Typical end-to-end decision timeline, in plain language. */
  timeline?: string;
  /** 2–3 sentence explainer. */
  whatIsThis: string;
  objectives: string[];
  eligibility: string[];
  benefits: string[];
  documents?: string[];
  howToApply: SchemeStep[];
  /** How Company Avenue Advisory works on this scheme. */
  caaSupport: string[];
  /** Internal links to the CAPL services that feed this scheme. */
  caaServices?: SchemeLink[];
  /** Rejection traps and practical cautions. */
  watchOuts?: string[];
  links: SchemeLink[];
  /** Surfaced on the hub's "most asked about" rail. */
  popular?: boolean;
}

export const SUPPORT_TYPES: SupportType[] = [
  "Grant",
  "Equity",
  "Loan / Credit",
  "Incubation",
  "Market Access",
  "Mixed",
];

export const STAGES: Stage[] = [
  "Ideation",
  "Prototype / PoC",
  "Seed / Early Stage",
  "Growth / Scaling",
  "Market Access & IP",
];

export const SECTORS: Sector[] = [
  "Sector Agnostic",
  "Deep Tech",
  "Biotech & Life Sciences",
  "Agriculture & Food",
  "Defence & Aerospace",
  "Space",
  "Semiconductor & Electronics",
  "IT & Software",
  "Telecom",
  "Textiles",
  "Mining & Metals",
  "Energy & Power",
  "Fintech",
  "Rural & Social",
  "Manufacturing",
  "Students & Academia",
];

/** Project a full scheme down to the shape the client actually renders. */
export function toSummary(s: Scheme): SchemeSummary {
  return {
    slug: s.slug,
    name: s.name,
    abbr: s.abbr,
    ministry: s.ministry,
    focus: s.focus,
    support: s.support,
    stages: s.stages,
    sectors: s.sectors,
    headline: s.headline,
    amount: s.amount,
  };
}
