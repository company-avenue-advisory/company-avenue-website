import type { Metadata } from "next";
import { SIPCalculator } from "@/components/calculators/SIPCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "SIP Calculator — Systematic Investment Plan Returns | Company Avenue Advisory",
  description: "Free SIP calculator. Estimate the future value and returns of your monthly mutual fund SIP with an interactive investment-vs-returns breakdown.",
  keywords: [
    "SIP calculator",
    "mutual fund SIP calculator",
    "systematic investment plan calculator",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="SIP Calculator"
      breadcrumb="SIP Calculator"
      intro="See how a monthly SIP grows over time. Estimate the maturity value and returns of your systematic investment plan with monthly compounding."
      faqs={[
        { title: "What is a SIP?", content: "A Systematic Investment Plan lets you invest a fixed amount in mutual funds every month, averaging your purchase cost and building wealth over time." },
        { title: "How is SIP maturity calculated?", content: "Using the future-value-of-annuity formula with monthly compounding on your expected annual rate of return." },
        { title: "Are SIP returns guaranteed?", content: "No. SIPs invest in market-linked mutual funds, so returns fluctuate and are not guaranteed." },
      ]}
    >
      <SIPCalculator />
    </CalcPageShell>
  );
}
