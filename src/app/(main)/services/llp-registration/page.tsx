import type { Metadata } from "next";
import { SearchQA } from "@/components/seo/SearchQA";
import { LLPPage } from "@/components/sections/LLPPage";
import { CalculatorPricingSlot } from "@/components/sections/CalculatorPricingSlot";
import { JumpToCalculatorPill } from "@/components/sections/JumpToCalculatorPill";
import { faqs as serviceFaqs } from "@/lib/faqs/LLPPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, OG_IMAGE, fitTitle } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/llp-registration" },
  title: fitTitle("LLP Registration Online in India — Fees, Documents & Process"),
  description:
    "LLP registration online in India. LLP registration fees, documents required, process and certificate of incorporation, handled by experts. 7–10 working days, 100% online.",
  keywords: [
    "LLP registration",
    "limited liability partnership registration",
    "LLP registration in india",
    "register LLP online",
    "LLP incorporation",
    "LLP company registration",
    "how to register LLP in india",
    "documents for LLP registration",
    "LLP registration process",
    "benefits of LLP registration",
  ],
  openGraph: {
    title: "LLP Registration Online in India — Fees, Documents & Process",
    description:
      "LLP registration online in India. LLP registration fees, documents required, process and certificate of incorporation, handled by experts. 7–10 working days, 100% online.",
    type: "website",
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

export default function LLPRegistrationPage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <LLPPage
        pricingSlot={<CalculatorPricingSlot serviceId="llp-registration" lockEntity="llp" />}
        calcPill={<JumpToCalculatorPill />}
      />
      <SearchQA path="/services/llp-registration" />
    </>
  );
}
