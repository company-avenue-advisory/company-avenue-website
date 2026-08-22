import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Analytics, GtmNoScript } from "@/components/analytics/Analytics";
import { SITE_URL } from "@/lib/seo";

/* ─────────────────────────────────────────────────────────────────────────────
   The shared shell for BOTH properties this app serves:

     · companyavenueadvisory.com      → src/app/(main)   (India)
     · us.companyavenueadvisory.com   → src/app/us       (US delivery hub)

   Only what is genuinely common belongs here: <html>/<body>, the fonts, the
   stylesheet, analytics and the anti-FOUC guard. The navbar, footer, floating
   CTAs, Organization schema and India metadata defaults moved to
   (main)/layout.tsx — the US landing page must not inherit any of them, and
   SiteChrome cannot detect the US host on its own (a middleware rewrite leaves
   `usePathname()` reporting the browser path).
───────────────────────────────────────────────────────────────────────────── */

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  // metadataBase stays at the root so every India page keeps resolving its
  // relative OG/canonical URLs against the main domain. The US route overrides
  // it with the us. subdomain.
  metadataBase: new URL(SITE_URL),
  // NOTE: no site-wide `alternates.canonical` — a root canonical would be
  // inherited by every page that doesn't set its own, pointing them all at "/".
  // Each page sets its own canonical; unset pages self-canonicalize to their URL.
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: overflow-x-CLIP, not -hidden. Per the CSS overflow spec, setting
  // `overflow-x: hidden` makes a `visible` overflow-y compute to `auto`, which
  // turns <html>/<body> into a scroll container and silently breaks every
  // `position: sticky` on the site (the service-page sidebars scrolled away
  // instead of pinning). `clip` gives the same horizontal-overflow protection
  // while leaving overflow-y as `visible`. Verified in Chrome.
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} overflow-x-clip`}>
      <head>
        <Analytics />
        {/* Anti-FOUC: hide body until stylesheet is parsed */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { visibility: hidden; }
          body.ready { visibility: visible; }
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function ready() { document.body.classList.add('ready'); }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', ready);
            } else {
              ready();
            }
          })();
        `}} />
      </head>
      <body className="font-body bg-background text-dark antialiased overflow-x-clip w-full max-w-full">
        <GtmNoScript />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
