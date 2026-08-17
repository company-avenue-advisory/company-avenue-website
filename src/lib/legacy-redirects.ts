/* ─────────────────────────────────────────────────────────────────────────────
   LEGACY SITE DECOMMISSIONING MAP — WS-2 / WS-1.3 of the Master Work Order.

   The migration to this Next.js build reached ~80%. The previous WordPress
   installation was never decommissioned and is still serving live, indexed
   pages. This file is the single source for what happens to each legacy URL:

     · REDIRECTS  → server-side 301
     · GONE       → 410 Gone

   Both are served by src/middleware.ts. Adding a row here is the whole change,
   apart from one line in that file's static `matcher`.

   ── WHY MIDDLEWARE AND NOT next.config redirects() ────────────────────────
   redirects() was the obvious home for these and is where they started. Two
   measured problems moved them:

     1. `permanent: true` emits HTTP 308, not 301. Google treats the two the
        same, but WS-2.2 says "Implement server-side 301 redirects" and the
        approval spreadsheet has a 301 column — a crawler report showing 308
        on every row fails that review on a technicality. Next's redirects()
        cannot emit 301; it only offers 307/308.

     2. Every legacy WordPress URL ends in a trailing slash, and this build
        sets `trailingSlash: false`. Next's own normalisation redirect runs
        BEFORE redirects() and middleware, so /books-keeping-outsourcing/
        returned 308 → /books-keeping-outsourcing → 308 → destination. That is
        a two-hop chain on EVERY legacy URL, against a WS-2.4 acceptance
        criterion of "every legacy URL reaches its destination in one hop, no
        chains, verified with a crawler". Verified by curl before the change.

   `skipTrailingSlashRedirect: true` in next.config.ts hands that
   normalisation to middleware, which lets one handler match both slash forms
   and answer with a single 301 straight to the destination. Middleware then
   owns trailing-slash normalisation for the rest of the site too — see the
   note in src/middleware.ts.

   ── WHY 410 AND NOT 301 FOR TWO OF THEM ──────────────────────────────────
   WS-1.3 identifies two legacy pages carrying incorrect statements of law:

     /sole-proprietorship-to-private-limited-company/
        claimed a private limited company requires share capital of at least
        ₹1 lakh. That requirement was removed by the Companies (Amendment)
        Act, 2015. [VERIFIED]

     /shares-transfer/
        claimed a shareholder must hold an approved DIN to transfer shares.
        DIN is allotted to directors under s.153 and is not a precondition of
        transfer; transfer is governed by s.56 and Form SH-4. [VERIFIED]

   The order's instruction is "410 Gone, or 301 … Do not rewrite." 410 is the
   choice implemented here: it tells Google the content is intentionally gone
   rather than moved, so the incorrect page drops out of the index instead of
   passing its accumulated signals — and any ranking it holds — to a live
   commercial page. A 301 would keep the wrong page's equity alive under a new
   URL. The order permits either; 410 is the one that actually retires the
   statement. Both are also listed as REDIRECT fallbacks in the CSV handed to
   the Principal, so the decision is reversible with one edit.

   ── WHAT IS STILL OUTSTANDING ────────────────────────────────────────────
   This map covers the URLs the order lists as publicly visible. It is NOT the
   complete inventory, and WS-2.2 is explicit that the full map must be built
   from four sources and approved before deployment:

     1. the legacy wp_posts table
     2. the legacy sitemap
     3. Search Console → Pages report, 16-month window
     4. a crawl of the live legacy instance (Screaming Frog)

   Legacy blog posts in particular used a different slug structure and must be
   mapped individually — a blanket /blog/* rule discards the authority of
   every post, so no such rule exists here. See LEGACY-REDIRECT-MAP.csv for
   the deliverable spreadsheet and the outstanding-work notes.
───────────────────────────────────────────────────────────────────────────── */

export interface LegacyRedirect {
  /** Legacy path, without trailing slash. Next matches both forms. */
  from: string;
  /** Current destination path on this site. */
  to: string;
  /**
   * Verified = the destination was confirmed to exist and to be the closest
   * equivalent. Unverified rows still redirect (a 301 to a category index
   * beats a 404) but are flagged in the CSV for the Principal to confirm.
   */
  verified: boolean;
  note?: string;
}

/**
 * 301 map. Rules:
 *   · Never redirect to the homepage — Google treats a mass-redirect to "/"
 *     as a soft 404. Where no close equivalent exists, the destination is the
 *     relevant category index instead.
 *   · One hop only. No destination below may itself be a `from` above.
 */
export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  {
    from: "/books-keeping-outsourcing",
    to: "/services/accounting-bookkeeping",
    verified: true,
  },
  {
    from: "/private-limited-compliance",
    // The order's starter map says /services/annual-filing. That route does
    // not exist on this build — the equivalent is roc-compliance, which covers
    // AOC-4/MGT-7 annual filing for companies. /services/llp-annual-filing is
    // the LLP counterpart and would be the wrong entity type here.
    to: "/services/roc-compliance",
    verified: true,
    note: "Order specified /services/annual-filing, which does not exist on this build. Retargeted to the ROC compliance page (AOC-4 / MGT-7 annual filing).",
  },
  {
    from: "/home/private-limited-company-incorporation",
    to: "/services/private-limited-company",
    verified: true,
  },
  { from: "/contact-us", to: "/contact", verified: true },
  {
    from: "/reviews",
    to: "/reviews",
    verified: true,
    note: "Legacy reviews page was orphaned from this build. /reviews now exists (WS-5.1), so this is a same-path takeover rather than a redirect — no rule is emitted for it.",
  },
  {
    from: "/advisor/company-avenue-advisory",
    to: "/about",
    verified: true,
    note: "Returned a hard 404 with no redirect at the time of the audit.",
  },
  {
    from: "/authority-hearing-attend",
    to: "/services/trademark-objection",
    verified: false,
    note: "Order suggests /services/trademark-registration. Objection/hearing representation is the closer match and exists. Confirm with the Principal which the legacy page actually covered.",
  },
  {
    from: "/import-export-code-renewal",
    to: "/services/iec-registration",
    verified: false,
    note: "IEC renewal is handled within the IEC registration service page. Confirm.",
  },
  {
    from: "/automation",
    to: "/services",
    verified: false,
    note: "Legacy page content unknown. Category index, not homepage.",
  },
];

/**
 * 410 Gone. Content that must not survive — see the WS-1.3 note above.
 * Served by middleware because Next's redirects() cannot return a 410.
 */
export const LEGACY_GONE: { path: string; reason: string }[] = [
  {
    path: "/sole-proprietorship-to-private-limited-company",
    reason:
      "WS-1.3: stated a private limited company requires share capital of at least ₹1 lakh — removed by the Companies (Amendment) Act, 2015.",
  },
  {
    path: "/shares-transfer",
    reason:
      "WS-1.3: stated a shareholder must hold an approved DIN to transfer shares — DIN is allotted to directors under s.153 and is not a precondition; transfer is governed by s.56 and Form SH-4.",
  },
];

/**
 * Strip trailing slashes so "/foo/" and "/foo" are the same key. Every legacy
 * WordPress URL carries a trailing slash, so this is the normal case, not an
 * edge case.
 */
export function normalisePath(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

/** WS-1.3 paths, normalised, for an O(1) middleware lookup. */
const GONE_SET = new Set(LEGACY_GONE.map((g) => normalisePath(g.path)));

export function isGonePath(pathname: string): boolean {
  return GONE_SET.has(normalisePath(pathname));
}

/**
 * Legacy path → destination, normalised. Same-path rows are excluded: /reviews
 * is a same-path takeover (the new page lives at the same URL), and emitting a
 * rule for it would be a redirect loop.
 */
const REDIRECT_MAP = new Map(
  LEGACY_REDIRECTS.filter((r) => normalisePath(r.from) !== normalisePath(r.to)).map(
    (r) => [normalisePath(r.from), r.to] as const
  )
);

/** Destination for a legacy path, or null if it is not a legacy URL. */
export function legacyDestination(pathname: string): string | null {
  return REDIRECT_MAP.get(normalisePath(pathname)) ?? null;
}
