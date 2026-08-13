import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";
import { GSTRegistrationCostCalculator } from "@/components/calculators/GSTRegistrationCostCalculator";

const FAQS = [
  { title: "Is there a government fee for GST registration?", content: "No. The GST department charges nothing to register. The only unavoidable outside cost is a Digital Signature Certificate, and even that is only needed for companies, LLPs and partnerships \u2014 a proprietor can verify with an Aadhaar OTP." },
  { title: "When does GST registration become mandatory?", content: "Above \u20b940 lakh turnover for goods or \u20b920 lakh for services. It becomes compulsory from the first rupee if you supply inter-state or sell through an e-commerce platform, whatever your turnover." },
  { title: "Should I register voluntarily?", content: "Often yes. Voluntary registration lets you claim input tax credit on purchases, and most GST-registered buyers prefer suppliers who can give them a tax invoice." },
];

export const metadata: Metadata = {
  alternates: { canonical: "/calculators/gst-registration-cost-calculator" },
  title: "GST Registration Cost Calculator India 2026",
  description:
    "Find out whether GST registration is mandatory for you and what it costs. No government fee, DSC only where required, and our fixed professional fee. Free tool.",
  keywords: ["gst registration cost", "gst registration fees india", "is gst registration mandatory", "gst threshold 40 lakh 20 lakh", "gst registration calculator"],
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculators" },
            { name: "GST Registration Cost", path: "/calculators/gst-registration-cost-calculator" },
          ]),
          faqSchema(FAQS.map((f) => ({ question: f.title, answer: f.content }))),
        ]}
      />
      <CalcPageShell
        title="GST Registration Cost Calculator"
        breadcrumb="GST Registration Cost"
        intro="Tell us about your business and we will tell you whether GST registration is compulsory, and exactly what it will cost you to get your GSTIN."
        faqs={FAQS}
      >
        <GSTRegistrationCostCalculator />
      </CalcPageShell>
    </>
  );
}
