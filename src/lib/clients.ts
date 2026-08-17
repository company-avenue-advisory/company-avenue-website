/* ─────────────────────────────────────────────────────────────────────────────
   CLIENT LOGO ROSTER

   Source: the `Logos_.pdf` supplied by the Principal on 17 August 2026. All 16
   marks were extracted from that PDF, background-cleaned and normalised into
   /public/images/clients/.

   ── TWO STANDING RULES FOR THIS FILE ──────────────────────────────────────
   1. Every entry must be an organisation the firm has genuinely worked with,
      confirmed by the Principal. This is the same standard the site applies to
      testimonials and ratings: nothing renders that a visitor could not verify.
      Do not add a logo because it looks impressive. Removing one is a
      one-line deletion.
   2. Third-party marks are their owners' trademarks and are shown here as a
      factual record of engagement, nominatively — not as endorsement. If any
      owner objects, delete their row; do not restyle it.

   Ordering below matches the source PDF, which groups the more widely
   recognised marks first. The slider reads this array left to right.
───────────────────────────────────────────────────────────────────────────── */

export interface ClientLogo {
  /** Filename stem in /public/images/clients/ */
  slug: string;
  /** Legal / brand name. Used verbatim as the image alt text. */
  name: string;
  /**
   * True when the supplied artwork is a light-on-dark lockup.
   *
   * Two of the 16 marks (LifeSquare Pharma, Vertex Global Services) exist only
   * as white artwork on a dark panel. Their background CANNOT be made
   * transparent — the logo itself is white, so it would vanish against the
   * page. These render inside a tight dark chip instead, which reads as
   * deliberate rather than as a broken transparency.
   */
  dark?: boolean;
  /** Intrinsic size of the processed PNG, so next/image reserves the box. */
  width: number;
  height: number;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { slug: "tata-cleantech-capital", name: "Tata Cleantech Capital Limited", width: 400, height: 41 },
  { slug: "hafele",                 name: "Häfele",                         width: 400, height: 77 },
  { slug: "acuite-ratings",         name: "Acuité Ratings & Research",      width: 400, height: 144 },
  { slug: "cargo-service-center",   name: "Cargo Service Center",           width: 400, height: 144 },
  { slug: "onestack",               name: "OneStack",                       width: 400, height: 60 },
  { slug: "acfi",                   name: "Air Cargo Forum India (ACFI)",   width: 143, height: 160 },
  { slug: "fortum",                 name: "Fortum",                         width: 400, height: 94 },
  { slug: "vaani",                  name: "Vaani",                          width: 281, height: 160 },
  { slug: "smera",                  name: "SMERA",                          width: 280, height: 160 },
  { slug: "ag",                     name: "AG",                             width: 124, height: 122 },
  { slug: "hans-infomatic",         name: "Hans Infomatic",                 width: 144, height: 160 },
  { slug: "factohr",                name: "factoHR",                        width: 400, height: 100 },
  { slug: "cyolena",                name: "Cyolena",                        width: 302, height: 128 },
  { slug: "esscube",                name: "Esscube",                        width: 320, height: 160 },
  { slug: "lifesquare-pharma",      name: "LifeSquare Pharma Private Limited", dark: true, width: 400, height: 120 },
  { slug: "vertex-global-services", name: "Vertex Global Services",           dark: true, width: 369, height: 160 },
];
