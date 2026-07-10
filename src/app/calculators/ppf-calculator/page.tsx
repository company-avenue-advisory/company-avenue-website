import type { Metadata } from "next";
import { PPFCalculator } from "@/components/calculators/PPFCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "PPF Calculator — Public Provident Fund Maturity | Company Avenue Advisory",
  description: "Free PPF calculator. Estimate your Public Provident Fund maturity value, interest and 80C tax savings over 15+ years at the current 7.1% rate.",
  keywords: [
    "PPF calculator",
    "public provident fund calculator",
    "PPF maturity calculator India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="PPF Calculator"
      breadcrumb="PPF Calculator"
      intro="Project your Public Provident Fund maturity over 15 years or more. See total invested, interest earned and tax-free maturity value."
      faqs={[
        { title: "What is the PPF interest rate?", content: "PPF currently earns 7.1% p.a., compounded annually and reviewed by the government every quarter." },
        { title: "What is the PPF lock-in?", content: "PPF has a 15-year lock-in from account opening, after which it can be extended in blocks of 5 years." },
        { title: "How is PPF taxed?", content: "PPF enjoys EEE status — contributions qualify for Sec 80C, and both interest and maturity proceeds are fully tax-free." },
      ]}
    >
      <PPFCalculator />
    </CalcPageShell>
  );
}
