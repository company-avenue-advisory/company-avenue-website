import type { Metadata } from "next";
import { SalaryCalculator } from "@/components/calculators/SalaryCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "Salary Calculator — CTC to In-Hand Take-Home | Company Avenue Advisory",
  description: "Free salary calculator to convert CTC into monthly in-hand salary. See PF, professional tax and income tax deductions for FY 2025-26.",
  keywords: [
    "salary calculator",
    "CTC to in-hand calculator",
    "take home salary calculator India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="Salary Calculator"
      breadcrumb="Salary Calculator"
      intro="Convert your CTC into monthly take-home pay. See the split of gross salary, PF, professional tax and income tax deductions."
      faqs={[
        { title: "What is CTC?", content: "Cost to Company (CTC) is the total annual spend on you, including gross salary, employer PF, gratuity and benefits — not your take-home pay." },
        { title: "Why is take-home less than CTC?", content: "CTC includes employer PF and benefits that aren't paid in cash, plus deductions like employee PF, professional tax and TDS reduce your net pay." },
        { title: "How accurate is this estimate?", content: "It assumes Basic = 50% of gross and New Regime tax. Your actual figures depend on your specific salary structure and declarations." },
      ]}
    >
      <SalaryCalculator />
    </CalcPageShell>
  );
}
