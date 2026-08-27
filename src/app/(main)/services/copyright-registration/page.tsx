import type { Metadata } from "next";
import { CopyrightRegistrationPage } from "@/components/sections/CopyrightRegistrationPage";
import { ServicePricingBlock } from "@/components/sections/ServicePricingBlock";
import { ServiceCalcPill } from "@/components/sections/ServiceCalcPill";
import { faqs as serviceFaqs } from "@/lib/faqs/CopyrightRegistrationPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/copyright-registration" },
  title: "Copyright Registration in India — Books, Software, Music, Films",
  description:
    "Register copyright for literary works, software, music, films, and artwork under the Copyright Act 1957. Protection for life + 60 years across 170+ Berne Convention countries. Starting ₹7,999.",
};

export default function CopyrightRegistrationServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <CopyrightRegistrationPage
        pricingSlot={<ServicePricingBlock serviceId="copyright-registration" />}
        calcPill={<ServiceCalcPill serviceId="copyright-registration" />}
      />
    </>
  );
}
