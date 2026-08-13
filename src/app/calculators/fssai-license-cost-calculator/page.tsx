import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";
import { FSSAICostCalculator } from "@/components/calculators/FSSAICostCalculator";

const FAQS = [
  { title: "Which FSSAI licence do I need?", content: "Basic Registration covers turnover up to \u20b912 lakh within one state. State Licence covers \u20b912 lakh up to \u20b920 crore. Central Licence is for larger operations, importers, exporters and anyone operating across more than one state." },
  { title: "How much is the FSSAI government fee?", content: "Basic Registration is \u20b9100 a year. A State Licence is typically \u20b92,000 to \u20b95,000 a year depending on capacity. A Central Licence is \u20b97,500 a year. You can take a licence for one to five years." },
  { title: "What happens if I operate without one?", content: "Running a food business without a valid FSSAI licence can attract a penalty of up to \u20b910 lakh, and in serious cases imprisonment. It is one of the cheapest compliances to get right." },
];

export const metadata: Metadata = {
  alternates: { canonical: "/calculators/fssai-license-cost-calculator" },
  title: "FSSAI Licence Cost Calculator India 2026",
  description:
    "Work out which FSSAI licence your food business needs — Basic, State or Central — and exactly what it costs per year, including our professional fee. Free tool.",
  keywords: ["fssai license cost", "fssai registration fee", "fssai basic state central license fee", "food license cost india", "fssai calculator"],
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculators" },
            { name: "FSSAI Licence Cost", path: "/calculators/fssai-license-cost-calculator" },
          ]),
          faqSchema(FAQS.map((f) => ({ question: f.title, answer: f.content }))),
        ]}
      />
      <CalcPageShell
        title="FSSAI Licence Cost Calculator"
        breadcrumb="FSSAI Licence Cost"
        intro="Enter your turnover and we will point you to the right FSSAI category, then break down the government fee per year and what we charge to get you licensed."
        faqs={FAQS}
      >
        <FSSAICostCalculator />
      </CalcPageShell>
    </>
  );
}
