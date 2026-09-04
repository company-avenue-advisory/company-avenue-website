/* ─────────────────────────────────────────────────────────────────────────────
   CANONICAL NAP RECORD — WS-10.1 of the Digital Presence Master Work Order.

   One record. Every surface that states the firm's Name, Address, Phone,
   hours, registration numbers or social profiles reads from here: the footer,
   the contact page, the city pages, llms.txt, the privacy/terms pages and the
   structured data in src/lib/seo.ts.

   Why this file exists: the order documents a confirmed inconsistency between
   the website address (209, Jaina Tower 1) and a public directory listing
   (320, Vishal Tower), and between the opening hours shown on each. It also
   found the site itself disagreeing with its own schema — constants.ts said
   "District Center, Professor Joginder Singh Marg" while the Organization node
   said "209, Jaina Tower 1, District Center, Janakpuri". NAP consistency is a
   local ranking input, so a single value per field is the fix.

   ── HOW TO USE THE `confirmed` FLAGS ──────────────────────────────────────
   Fields the order flags as unverified carry `confirmed: false`. That flag is
   load-bearing, not decorative:

     · UNCONFIRMED_REGISTRATION values still render (Principal's instruction,
       17 Aug 2026) but are listed in the status report as outstanding.
     · SOCIAL_PROFILES with confirmed:false are excluded from the schema
       `sameAs` array automatically — WS-4 forbids listing a dormant or
       unclaimed profile — and are not rendered as footer profile links.

   When the Principal confirms a value in writing, change it here and flip its
   flag. Nothing else needs editing.
───────────────────────────────────────────────────────────────────────────── */

/** Postal address, split so schema and display strings can never drift. */
export const ADDRESS = {
  suite: "209",
  building: "Jaina Tower 1",
  area: "District Centre",
  street: "Professor Joginder Singh Marg",
  locality: "Janakpuri",
  city: "New Delhi",
  region: "Delhi",
  postalCode: "110058",
  country: "IN",
  countryName: "India",
  /**
   * WS-10.1: BLOCKED — PRINCIPAL. A public directory carries a different
   * building and suite (320, Vishal Tower, District Center Kirti Shikar).
   * The value below is the website's own long-standing address; it governs
   * every surface until the Principal confirms the canonical version in
   * writing. Do not reconcile directory listings against it before then.
   */
  confirmed: false,
} as const;

/** Single display string. Used by the footer, contact page and city pages. */
export const ADDRESS_LINE = `${ADDRESS.suite}, ${ADDRESS.building}, ${ADDRESS.area}, ${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}, ${ADDRESS.countryName}`;

/** Schema.org PostalAddress streetAddress — the pre-locality part only. */
export const STREET_ADDRESS = `${ADDRESS.suite}, ${ADDRESS.building}, ${ADDRESS.area}, ${ADDRESS.street}`;

/**
 * Opening hours. The order records the website stating 9:00 AM against a
 * directory stating 10:00 AM. These 24h values are the source for both the
 * display string and the schema `openingHoursSpecification`.
 */
export const HOURS = {
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as string[],
  opens: "09:00",
  closes: "19:00",
  /** WS-10.1: BLOCKED — PRINCIPAL. Directory listings disagree. */
  confirmed: false,
} as const;

export const HOURS_LINE = "Mon – Sat: 9:00 AM – 7:00 PM";

/** Contact points. Digits-only variants exist because wa.me rejects "+". */
export const CONTACT = {
  phoneDisplay: "+91 99537 19111",
  phoneE164: "+919953719111",
  whatsappDigits: "919953719111",
  email: "info@companyavenueadvisory.com",
  website: "https://companyavenueadvisory.com",
} as const;

/**
 * Statutory registration numbers.
 *
 * GSTIN — REMOVED 4 Sep 2026, not replaced. The previous value,
 * 07AABCC1234D1Z5, fails the GSTIN check-digit algorithm: the computed
 * 15th character is "D", not "5". Two independent implementations agree,
 * so it cannot be a real GSTIN — it embedded AABCC1234D, the specimen PAN
 * from sample documentation. The 31 Aug sign-off recorded in
 * dev-task-instructions.md (T1) was mistaken. Displaying a provably
 * impossible GSTIN is an affirmative false statement by a regulated firm;
 * GST law requires the GSTIN on invoices and at the principal place of
 * business, not in a website footer, so omitting it costs nothing.
 *   · Do NOT substitute 07AAVCS4279H1ZM (from the IndiaMart listing).
 *     Its checksum is valid, but it has not been confirmed as CAA's
 *     registration — adopting it on arithmetic alone repeats the error
 *     that produced this mess.
 *   · When the firm's GST certificate arrives, set `gstin` to the real
 *     value and flip `gstinConfirmed`. Footer.tsx renders the GSTIN line
 *     only when `gstin` is non-null.
 *
 * CIN — kept. Unverified, not disproven: a CIN carries no check digit, and
 * the Companies Act requires it on official publications. It also appears
 * in /privacy and /terms, which are legal documents naming the legal
 * entity, so pulling it creates a problem rather than solving one. But it
 * is suspect: it decodes as Maharashtra ("MH") / 2015 / private company —
 * wrong ROC state for a Delhi firm, and the year conflicts with the firm's
 * own IndiaMart profile (year established 2024). It also shares the
 * discredited 31 Aug sign-off. Verify against the MCA Company/LLP Master
 * Data lookup (mca.gov.in) before relying on it, and flip `cinConfirmed`.
 */
export const REGISTRATIONS = {
  /** null until the firm's GST certificate is supplied — see comment above. */
  gstin: null as string | null,
  cin: "U74999MH2015PTC260940",
  gstinConfirmed: false,
  cinConfirmed: false,
} as const;

/**
 * Year of incorporation.
 *
 * Was "2009" on the About page, which the order contradicts: incorporation in
 * 2015 is [VERIFIED] and independently corroborated. The 15+ years figure
 * used elsewhere on the site refers to the Principal's own years in practice,
 * not the firm's age — see TRUST_CLAIMS below and WS-5.3.
 */
export const INCORPORATED = "2015";

export interface SocialProfile {
  /** Platform key, also used for the icon lookup in the footer. */
  platform: "linkedin" | "facebook" | "instagram" | "youtube" | "x";
  label: string;
  url: string;
  /**
   * True only where the order records a confirmed, actively maintained
   * profile. WS-4 forbids listing an unconfirmed or dormant profile in the
   * schema `sameAs` array, and WS-9.8 requires the footer to show real
   * profile links or nothing at all.
   */
  confirmed: boolean;
  /** Why a profile is unconfirmed — read by the status report, not the UI. */
  note?: string;
}

/**
 * Social profiles.
 *
 * WS-9.1 audit findings, verbatim in effect:
 *   · LinkedIn — company page confirmed at /company/company-avenue-advisory-pvt-ltd.
 *     (seo.ts previously listed a *different* URL without the -pvt-ltd suffix,
 *     so the schema pointed at a page that is not the firm's.)
 *   · Facebook — a page exists but its most recent visible activity dates to
 *     2016 and the URL is unconfirmed. Dormant; ACTIVATE/CLOSE decision
 *     pending under WS-9.2.
 *   · Instagram / YouTube — not identified. [REQUIRES DATA]
 *   · X — no profile exists. The footer icon was a share-intent link.
 *
 * Only `confirmed: true` rows reach the footer and the schema sameAs array.
 */
export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/company-avenue-advisory-pvt-ltd/",
    confirmed: true,
  },
  {
    platform: "facebook",
    label: "Facebook",
    url: "",
    confirmed: false,
    note: "Page exists (categorised Consulting agency, 1 review) but URL unconfirmed and last visible activity dates to 2016. Awaiting the WS-9.2 ACTIVATE / CLOSE decision.",
  },
  {
    platform: "instagram",
    label: "Instagram",
    url: "",
    confirmed: false,
    note: "No profile identified. [REQUIRES DATA]",
  },
  {
    platform: "youtube",
    label: "YouTube",
    url: "",
    confirmed: false,
    note: "No profile identified. [REQUIRES DATA]",
  },
  {
    platform: "x",
    label: "X",
    url: "",
    confirmed: false,
    note: "No profile exists. The former footer icon was an x.com/intent/tweet share link, not a profile.",
  },
];

/** Confirmed profile URLs, in schema `sameAs` order. */
export const CONFIRMED_SOCIAL_URLS = SOCIAL_PROFILES.filter(
  (p) => p.confirmed && p.url
).map((p) => p.url);

/**
 * TRUST CLAIMS REGISTRY — WS-5.3.
 *
 * Every quantified claim the site makes about itself, in one place, so the
 * Principal can confirm or replace each figure with a single edit rather than
 * a site-wide hunt.
 *
 * `experienceLine` is the order's own suggested wording. The bare "15+ Years
 * Experience" phrasing it replaces implied the *firm* had traded 15 years,
 * which conflicts with the [VERIFIED] 2015 incorporation. The 15+ figure is
 * the Principal's time in practice, so the copy now says so.
 */
export const TRUST_CLAIMS = {
  /** Approved replacement for any bare "15+ Years Experience" badge. */
  experienceLine: "Led by a Chartered Accountant with 15+ years in practice",
  /** Shorter variant for tight badges and stat tiles. */
  experienceShort: "CA-led · 15+ yrs in practice",
  /** Years the Principal has been in practice. Confirmed verbally, not in writing. */
  principalYearsInPractice: "15+",
  /** Years the firm has existed. Derived from the [VERIFIED] 2015 incorporation. */
  firmYears: String(new Date().getFullYear() - Number(INCORPORATED)),
  /**
   * Client count shown in the hero, stats band and ~30 service pages.
   * BLOCKED — PRINCIPAL: no substantiating record supplied. Left rendering on
   * the Principal's instruction; change this one string to restate it
   * everywhere it is read from.
   */
  clientsServed: "1000+",
  clientsServedConfirmed: false,
} as const;
