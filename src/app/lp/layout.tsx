import type { Metadata } from "next";
import { EventTracking } from "@/components/analytics/EventTracking";

/* ─────────────────────────────────────────────────────────────────────────────
   Paid-traffic landing pages (Google/Meta Ads), separate from the organic
   (main) site: own bespoke header/footer per page, no shared Navbar/Footer,
   no Organization schema. noindex — these are ad-campaign destinations, not
   pages that should compete with the /services/* pages in search.

   Sits outside (main) on purpose (same reasoning as app/us/layout.tsx), so it
   still inherits fonts/analytics from the root layout but none of the India
   site chrome. EventTracking is mounted explicitly here since it normally
   only runs inside SiteChrome.
───────────────────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LandingPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EventTracking />
      {children}
    </>
  );
}
