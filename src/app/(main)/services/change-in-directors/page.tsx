import type { Metadata } from "next";
import { ChangeInDirectorsPage } from "@/components/sections/ChangeInDirectorsPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/ChangeInDirectorsPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/change-in-directors" },
  title: "Change in Directors — Appointment & Resignation",
  description:
    "Appoint new directors or process resignations via Form DIR-12 on MCA portal. Board resolution, DIR-2 consent, e-filing. Compliant with Companies Act 2013. Starting ₹1,999.",
};

export default function ChangeInDirectorsServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <ChangeInDirectorsPage
        pricingSlot={<ServicePricingBlock serviceId="change-in-directors" />}
        calcPill={<ServiceCalcPill serviceId="change-in-directors" />}
      />
    </>
  );
}
