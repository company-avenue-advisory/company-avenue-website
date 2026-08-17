"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AvenueAILoader } from "@/components/AvenueAILoader";
import { FloatingCTA } from "./FloatingCTA";
import { EventTracking } from "@/components/analytics/EventTracking";

// Renders the public marketing chrome (navbar, footer, AI widget) around
// the page — except on internal routes like /admin, which stand alone.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = pathname?.startsWith("/admin");

  if (isBare) {
    return <main>{children}</main>;
  }

  return (
    <>
      {/* WS-3.2: one delegated listener covers every tel:/wa.me link on the
          site, plus scroll depth and social-referral attribution. */}
      <EventTracking />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AvenueAILoader />
      <FloatingCTA />
    </>
  );
}
