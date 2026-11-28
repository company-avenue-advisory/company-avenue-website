import type { Metadata } from "next";
import { IECRegistrationPage } from "@/components/sections/IECRegistrationPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/IECRegistrationPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, OG_IMAGE, fitTitle } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/iec-registration" },
  title: fitTitle("IEC Code Apply Online — Import Export Code Registration"),
  description:
    "Apply for an IEC code online. Import Export Code registration with DGFT: documents, process and expert help for importers, exporters and e-commerce sellers across India.",
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
    title: "IEC Code Apply Online — Import Export Code Registration",
    description:
      "Apply for an IEC code online. Import Export Code registration with DGFT: documents, process and expert help for importers, exporters and e-commerce sellers across India.",
    type: "website",
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

export default function IECRegistrationServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <IECRegistrationPage
        pricingSlot={<ServicePricingBlock serviceId="iec-registration" />}
        calcPill={<ServiceCalcPill serviceId="iec-registration" />}
      />
    </>
  );
}
