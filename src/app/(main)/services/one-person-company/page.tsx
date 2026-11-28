import type { Metadata } from "next";
import { SearchQA } from "@/components/seo/SearchQA";
import { fitTitle } from "@/lib/seo";
import { OPCPage } from "@/components/sections/OPCPage";
import { CalculatorPricingSlot } from "@/components/sections/CalculatorPricingSlot";
import { JumpToCalculatorPill } from "@/components/sections/JumpToCalculatorPill";
import { faqs as serviceFaqs } from "@/lib/faqs/OPCPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/one-person-company" },
  title: fitTitle("OPC Registration Online — One Person Company Fees & Process"),
  description:
    "OPC registration online in India. How to register a one person company, OPC registration fees, documents required and process. Compare OPC vs proprietorship vs Pvt Ltd.",
  keywords: [
    "one person company registration",
    "OPC registration india",
    "register OPC online",
    "one person company",
    "OPC company registration",
    "OPC vs sole proprietorship",
    "OPC vs private limited company",
    "single owner company",
    "business registration india",
    "MCA registration",
    "startup registration",
  ],
  openGraph: {
    title: "OPC Registration Online — One Person Company Fees & Process",
    description:
      "OPC registration online in India. How to register a one person company, OPC registration fees, documents required and process. Compare OPC vs proprietorship vs Pvt Ltd.",
    type: "website",
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

export default function OnePersonCompanyPage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <OPCPage
        pricingSlot={<CalculatorPricingSlot serviceId="one-person-company" lockEntity="opc" />}
        calcPill={<JumpToCalculatorPill />}
      />
      <SearchQA path="/services/one-person-company" />
    </>
  );
}
