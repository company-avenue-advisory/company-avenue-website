import type { Metadata } from "next";
import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "Simple & Compound Interest Calculator",
  description: "Free compound interest calculator with simple-interest mode. Choose yearly, half-yearly, quarterly or monthly compounding.",
  keywords: [
    "compound interest calculator",
    "simple interest calculator",
    "CI calculator India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="Compound Interest Calculator"
      breadcrumb="Compound Interest Calculator"
      intro="Calculate both simple and compound interest. Choose your compounding frequency and see how your money grows over time."
      faqs={[
        { title: "Simple vs compound interest?", content: "Simple interest is charged only on the principal. Compound interest is charged on principal plus accumulated interest, so it grows faster." },
        { title: "What is compounding frequency?", content: "How often interest is added to the balance — monthly compounding grows faster than yearly for the same nominal rate." },
        { title: "What is the compound interest formula?", content: "A = P × (1 + r/n)^(n×t), where n is the number of compounding periods per year and t is the number of years." },
      ]}
    >
      <CompoundInterestCalculator />
    </CalcPageShell>
  );
}
