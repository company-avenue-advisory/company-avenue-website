import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo";
import { PFRegistrationPage } from "@/components/sections/PFRegistrationPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/PFRegistrationPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/pf-registration" },
  title: fitTitle("PF Registration Online — EPF Registration for Employers"),
  description:
    "PF registration online for employers. EPF (EPFO) establishment registration, PF registration process, documents, UAN generation and monthly ECR filing support.",
};

export default function PFRegistrationServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <PFRegistrationPage
        pricingSlot={<ServicePricingBlock serviceId="pf-registration" />}
        calcPill={<ServiceCalcPill serviceId="pf-registration" />}
      />
    </>
  );
}
