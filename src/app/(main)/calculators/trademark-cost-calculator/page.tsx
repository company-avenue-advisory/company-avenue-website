import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";
import { TrademarkCostCalculator } from "@/components/calculators/TrademarkCostCalculator";

const FAQS = [
  { title: "How much does a trademark cost in India?", content: "The government fee is \u20b94,500 per class for an individual, proprietor, MSME or DPIIT-recognised startup, and \u20b99,000 per class for everyone else. Our professional fee starts at \u20b92,500 per class, so a single-class MSME filing comes to roughly \u20b97,450 including GST." },
  { title: "What is a trademark class?", content: "The NICE classification splits goods and services into 45 classes. Your trademark is only protected in the classes you file in, so a business selling both a product and a service often needs two." },
  { title: "Do I have to pay again later?", content: "A registration lasts 10 years. Renewal costs \u20b99,000 per class in government fees. Miss the date and there is a \u20b94,500 surcharge, then a \u20b99,000 restoration fee once it has expired." },
];

export const metadata: Metadata = {
  alternates: { canonical: "/calculators/trademark-cost-calculator" },
  title: "Trademark Registration Cost Calculator India 2026",
  description:
    "Work out exactly what a trademark costs in India — government fee per class, MSME and startup concessions, and our professional fee. Free, instant.",
  keywords: ["trademark registration cost india", "trademark government fee per class", "trademark fee msme startup 4500", "tm-a filing fee", "trademark cost calculator"],
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculators" },
            { name: "Trademark Cost", path: "/calculators/trademark-cost-calculator" },
          ]),
          faqSchema(FAQS.map((f) => ({ question: f.title, answer: f.content }))),
        ]}
      />
      <CalcPageShell
        title="Trademark Cost Calculator"
        breadcrumb="Trademark Cost"
        intro="Pick who is applying and how many classes you need. We show the government fee per class, the concession you qualify for, and what we charge — with nothing hidden."
        faqs={FAQS}
      >
        <TrademarkCostCalculator />
      </CalcPageShell>
    </>
  );
}
