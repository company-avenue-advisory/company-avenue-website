import type { Metadata } from "next";
import { FDCalculator } from "@/components/calculators/FDCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "FD Calculator — Fixed Deposit Maturity & Interest",
  description: "Free fixed deposit (FD) calculator. Compute maturity amount and interest earned with quarterly, monthly or yearly compounding.",
  keywords: [
    "FD calculator",
    "fixed deposit calculator",
    "FD maturity calculator India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="FD Calculator"
      breadcrumb="FD Calculator"
      intro="Calculate the maturity value and interest earned on a Fixed Deposit. Model different rates, tenures and compounding frequencies."
      faqs={[
        { title: "How is FD interest compounded?", content: "Most Indian banks compound FD interest quarterly, though monthly and cumulative options exist depending on the scheme." },
        { title: "Is FD interest taxable?", content: "Yes — FD interest is fully taxable as per your income slab. Banks deduct 10% TDS if annual interest exceeds ₹40,000 (₹50,000 for seniors)." },
        { title: "What is a tax-saver FD?", content: "A 5-year tax-saving FD qualifies for a Sec 80C deduction up to ₹1.5 lakh, but has a lock-in and no premature withdrawal." },
      ]}
    >
      <FDCalculator />
    </CalcPageShell>
  );
}
