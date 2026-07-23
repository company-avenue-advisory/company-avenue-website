import type { Metadata } from "next";
import { EMICalculator } from "@/components/calculators/EMICalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "EMI Calculator — Loan EMI, Interest & Total Payable",
  description: "Free online EMI calculator for personal, business & car loans. Calculate monthly EMI, total interest and total payment with an interactive breakdown.",
  keywords: [
    "EMI calculator",
    "loan EMI calculator India",
    "monthly EMI calculator",
    "reducing balance EMI",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="EMI Calculator"
      breadcrumb="EMI Calculator"
      intro="Calculate your monthly EMI, total interest and total payable for any loan on a reducing-balance basis. Adjust amount, rate and tenure instantly."
      faqs={[
        { title: "What is EMI?", content: "An Equated Monthly Instalment (EMI) is the fixed amount you pay a lender each month, covering both principal and interest, until the loan is fully repaid." },
        { title: "How is EMI calculated?", content: "EMI = [P × r × (1+r)^n] / [(1+r)^n − 1], where P is principal, r is the monthly interest rate and n is the number of months." },
        { title: "Does prepayment reduce EMI?", content: "Prepayment usually reduces either your tenure or your outstanding principal (and hence total interest), depending on your loan agreement." },
      ]}
    >
      <EMICalculator />
    </CalcPageShell>
  );
}
