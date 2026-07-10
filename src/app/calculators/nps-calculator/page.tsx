import type { Metadata } from "next";
import { NPSCalculator } from "@/components/calculators/NPSCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "NPS Calculator — National Pension System Corpus & Pension | Company Avenue Advisory",
  description: "Free NPS calculator. Estimate your National Pension System corpus at 60, lumpsum withdrawal, annuity amount and monthly pension.",
  keywords: [
    "NPS calculator",
    "national pension system calculator",
    "NPS pension calculator India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="NPS Calculator"
      breadcrumb="NPS Calculator"
      intro="Project your National Pension System corpus at 60, plus the lumpsum, annuity split and estimated monthly pension."
      faqs={[
        { title: "What is NPS?", content: "The National Pension System is a government-backed, market-linked retirement scheme where you invest until 60 to build a pension corpus." },
        { title: "How much can I withdraw at 60?", content: "You can withdraw up to 60% of the corpus tax-free as a lumpsum; at least 40% must be used to buy an annuity that pays a pension." },
        { title: "What tax benefits does NPS give?", content: "NPS offers Sec 80CCD(1B) deduction up to ₹50,000 over and above the ₹1.5L 80C limit." },
      ]}
    >
      <NPSCalculator />
    </CalcPageShell>
  );
}
