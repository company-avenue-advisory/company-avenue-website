import type { Metadata } from "next";
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "Retirement Planning Calculator — Corpus & Monthly SIP | Company Avenue Advisory",
  description: "Free retirement planning calculator. Compute the inflation-adjusted corpus you need and the monthly SIP required to retire comfortably.",
  keywords: [
    "retirement calculator",
    "retirement planning calculator",
    "retirement corpus calculator India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="Retirement Planning Calculator"
      breadcrumb="Retirement Calculator"
      intro="Find out how large a retirement corpus you need and the monthly SIP required to build it — adjusted for inflation and expected returns."
      faqs={[
        { title: "How much do I need to retire?", content: "Enough to fund your inflation-adjusted expenses across your retirement years. This tool estimates that corpus from your current spending." },
        { title: "Why adjust for inflation?", content: "At 6% inflation, expenses roughly double every 12 years — so your future costs are far higher than today's, and your corpus must account for that." },
        { title: "What return should I assume?", content: "A common approach is a higher return (10-12%) while accumulating and a conservative return (6-7%) during retirement." },
      ]}
    >
      <RetirementCalculator />
    </CalcPageShell>
  );
}
