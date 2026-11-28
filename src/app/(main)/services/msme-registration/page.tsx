import type { Metadata } from "next";
import { SearchQA } from "@/components/seo/SearchQA";
import { MSMERegistrationPage } from "@/components/sections/MSMERegistrationPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/MSMERegistrationPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, OG_IMAGE, fitTitle } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/msme-registration" },
  title: fitTitle("Udyam Registration Online — MSME Registration Certificate"),
  description:
    "Udyam registration online for MSMEs. Get your Udyam (MSME) registration certificate with expert help. ₹0 government fee. Benefits, documents and process explained.",
  keywords: [
    "MSME registration",
    "Udyam registration",
    "Udyam certificate",
    "MSME registration online",
    "collateral free loan MSME",
    "CGTMSE scheme",
    "MSME government schemes",
    "Udyog Aadhaar registration",
    "micro small medium enterprise registration",
    "MSME benefits India",
  ],
  openGraph: {
    title: "Udyam Registration Online — MSME Registration Certificate",
    description:
      "Udyam registration online for MSMEs. Get your Udyam (MSME) registration certificate with expert help. ₹0 government fee. Benefits, documents and process explained.",
    type: "website",
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

export default function MSMERegistrationServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <MSMERegistrationPage
        pricingSlot={<ServicePricingBlock serviceId="msme-registration" />}
        calcPill={<ServiceCalcPill serviceId="msme-registration" />}
      />
      <SearchQA path="/services/msme-registration" />
    </>
  );
}
