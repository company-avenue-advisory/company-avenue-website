"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AvenueAILoader } from "@/components/AvenueAILoader";
import { FloatingCTA } from "./FloatingCTA";

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
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AvenueAILoader />
      <FloatingCTA />
    </>
  );
}
