import type { Metadata } from "next";
import { EMICalculator } from "@/components/calculators/EMICalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "Home Loan EMI Calculator — Monthly EMI & Interest | Company Avenue Advisory",
  description: "Free home loan EMI calculator. Calculate your monthly home loan EMI, total interest and repayment for tenures up to 30 years.",
  keywords: [
    "home loan EMI calculator",
    "housing loan EMI",
    "home loan interest calculator India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="Home Loan EMI Calculator"
      breadcrumb="Home Loan EMI Calculator"
      intro="Estimate your home loan EMI, total interest outgo and total repayment. Model tenures up to 30 years and see the principal-vs-interest split."
      faqs={[
        { title: "What tenure should I choose?", content: "A longer tenure lowers your EMI but increases total interest paid. Choose the shortest tenure whose EMI comfortably fits your budget." },
        { title: "What is a good home loan rate?", content: "Home loan rates in India typically range from 8.3% to 9.5% p.a., linked to the repo rate and your credit score." },
        { title: "Are home loans tax-deductible?", content: "Yes — principal repayment qualifies under Sec 80C (up to ₹1.5L) and interest under Sec 24(b) (up to ₹2L for self-occupied property)." },
      ]}
    >
      <EMICalculator variant="home" />
    </CalcPageShell>
  );
}
