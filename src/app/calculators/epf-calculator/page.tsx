import type { Metadata } from "next";
import { EPFCalculator } from "@/components/calculators/EPFCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "EPF Calculator — Provident Fund Corpus at Retirement | Company Avenue Advisory",
  description: "Free EPF calculator. Project your Employees' Provident Fund corpus at retirement with salary growth and the current 8.25% interest rate.",
  keywords: [
    "EPF calculator",
    "provident fund calculator",
    "PF maturity calculator India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="EPF Calculator"
      breadcrumb="EPF Calculator"
      intro="Estimate your Employees' Provident Fund corpus at retirement, factoring in salary growth, employer contribution and the current EPF rate."
      faqs={[
        { title: "How much goes into EPF?", content: "You contribute 12% of Basic+DA; the employer adds a matching 12%, of which 8.33% funds the EPS pension and 3.67% goes to EPF." },
        { title: "What is the EPF interest rate?", content: "The EPF rate is 8.25% for FY 2024-25, declared annually by the EPFO and credited to your account each year." },
        { title: "Is EPF withdrawal taxable?", content: "EPF is tax-free if withdrawn after 5 years of continuous service; earlier withdrawals may attract tax and TDS." },
      ]}
    >
      <EPFCalculator />
    </CalcPageShell>
  );
}
