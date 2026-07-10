import type { Metadata } from "next";
import { TDSCalculator } from "@/components/calculators/TDSCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "TDS Calculator — Deduct TDS on Payments | Company Avenue Advisory",
  description: "Free TDS calculator for India. Compute TDS amount, rate, section and net payable for professional fees, rent, contracts, commission and more.",
  keywords: [
    "TDS calculator",
    "TDS deduction calculator",
    "TDS amount calculator India",
    "194J 194C TDS",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="TDS Calculator"
      breadcrumb="TDS Calculator"
      intro="Work out the exact TDS to deduct on any payment — professional fees, contracts, rent, commission and more — including 206AA no-PAN rates."
      faqs={[
        { title: "What is TDS?", content: "Tax Deducted at Source (TDS) is tax collected at the point of payment — the payer deducts it and deposits it with the government on the payee's behalf." },
        { title: "What happens without a PAN?", content: "Under Section 206AA, if the payee has no PAN, TDS is deducted at the higher of 20% or the normal applicable rate." },
        { title: "When is TDS not deducted?", content: "TDS is not required if the payment stays below the section's threshold limit (e.g. ₹30,000 for 194J professional fees)." },
      ]}
    >
      <TDSCalculator />
    </CalcPageShell>
  );
}
