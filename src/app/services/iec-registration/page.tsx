import type { Metadata } from "next";
import { IECRegistrationPage } from "@/components/sections/IECRegistrationPage";

export const metadata: Metadata = {
  title: "Import Export Code (IEC) Registration | DGFT Registration | Company Avenue",
  description:
    "Get your Import Export Code (IEC) registration online with Company Avenue. Expert DGFT registration assistance, documentation support, fast processing, and complete guidance for import-export businesses across India.",
  keywords: [
    "IEC registration",
    "import export code",
    "DGFT registration",
    "IEC certificate",
    "IEC code online",
    "import export license India",
    "DGFT IEC application",
    "IEC registration for exporters",
    "import export code for e-commerce",
    "IEC registration fee",
  ],
  openGraph: {
    title: "IEC Registration | DGFT Import Export Code | Company Avenue",
    description:
      "Register your Import Export Code (IEC) with DGFT in 2–5 days. Lifetime validity, ₹0 government fee, and complete expert assistance from Company Avenue.",
    type: "website",
  },
};

export default function IECRegistrationServicePage() {
  return <IECRegistrationPage />;
}
