import type { Metadata } from "next";
import { StartupIndiaPage } from "@/components/sections/StartupIndiaPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/StartupIndiaPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, OG_IMAGE, fitTitle } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/startup-india" },
  title: fitTitle("Startup India Registration & DPIIT Certificate — Apply Online"),
  description:
    "Startup India registration and DPIIT recognition certificate online. Eligibility, documents, Startup India registration fees and process, with expert help end to end.",
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
    title: "Startup India Registration & DPIIT Certificate — Apply Online",
    description:
      "Startup India registration and DPIIT recognition certificate online. Eligibility, documents, Startup India registration fees and process, with expert help end to end.",
    type: "website",
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

export default function StartupIndiaServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <StartupIndiaPage
        pricingSlot={<ServicePricingBlock serviceId="startup-india" />}
        calcPill={<ServiceCalcPill serviceId="startup-india" />}
      />
    </>
  );
}
