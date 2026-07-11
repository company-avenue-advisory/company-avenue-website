import type { Metadata } from "next";
import { StartupIndiaPage } from "@/components/sections/StartupIndiaPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/startup-india" },
  title: "Startup India Registration | DPIIT Recognition | Company Avenue",
  description:
    "Register your startup under the Startup India initiative with expert DPIIT recognition assistance. Unlock tax exemptions, angel tax relief, funding benefits, patent support, and government incentives with Company Avenue.",
  keywords: [
    "Startup India registration",
    "DPIIT recognition",
    "startup India certificate",
    "DPIIT recognized startup",
    "angel tax exemption startup",
    "startup income tax exemption",
    "startup India benefits",
    "DPIIT registration online",
    "startup India portal registration",
    "startup government schemes India",
  ],
  openGraph: {
    title: "Startup India Registration | DPIIT Recognition | Company Avenue",
    description:
      "Get DPIIT Startup India Recognition in 7–15 days. Unlock 3-year income tax exemption, angel tax relief, 80% patent rebate, and government tender benefits.",
    type: "website",
  },
};

export default function StartupIndiaServicePage() {
  return <StartupIndiaPage />;
}
