import type { Metadata } from "next";
import { HRACalculator } from "@/components/calculators/HRACalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "HRA Calculator — House Rent Allowance Exemption",
  description: "Calculate your HRA exemption under Section 10(13A). Enter basic salary, HRA received, rent paid and city to see your taxable and exempt HRA.",
  keywords: [
    "HRA calculator",
    "HRA exemption calculator",
    "house rent allowance exemption",
    "section 10 13A",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="HRA Calculator"
      breadcrumb="HRA Calculator"
      intro="Find out how much of your House Rent Allowance is exempt from tax under Section 10(13A) — based on your salary, rent paid and city."
      faqs={[
        { title: "How is HRA exemption calculated?", content: "It is the least of: actual HRA received, 50%/40% of Basic+DA (metro/non-metro), and rent paid minus 10% of Basic+DA." },
        { title: "Which cities count as metro?", content: "Only Delhi, Mumbai, Kolkata and Chennai are treated as metro cities for the 50% HRA computation." },
        { title: "Can I claim HRA in the New Regime?", content: "No. HRA exemption under Sec 10(13A) is only available if you opt for the Old Tax Regime." },
      ]}
    >
      <HRACalculator />
    </CalcPageShell>
  );
}
