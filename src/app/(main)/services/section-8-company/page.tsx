import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo";
import { Section8CompanyPage } from "@/components/sections/Section8CompanyPage";
import { CalculatorPricingSlot } from "@/components/sections/CalculatorPricingSlot";
import { JumpToCalculatorPill } from "@/components/sections/JumpToCalculatorPill";
import { faqs as serviceFaqs } from "@/lib/faqs/Section8CompanyPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/section-8-company" },
  title: fitTitle("Section 8 Company Registration — NGO Registration Online"),
  description:
    "Section 8 company registration and NGO registration online. Register a non-profit under the Companies Act 2013, with 12A and 80G registration help. Fees, documents and process.",
};

export default function Section8CompanyServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <Section8CompanyPage
        pricingSlot={<CalculatorPricingSlot serviceId="section-8-company" lockEntity="section8" />}
        calcPill={<JumpToCalculatorPill />}
      />
    </>
  );
}
