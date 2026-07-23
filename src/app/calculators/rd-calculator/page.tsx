import type { Metadata } from "next";
import { RDCalculator } from "@/components/calculators/RDCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "RD Calculator — Recurring Deposit Maturity",
  description: "Free recurring deposit (RD) calculator. Compute maturity value and interest on monthly deposits with quarterly compounding.",
  keywords: [
    "RD calculator",
    "recurring deposit calculator",
    "RD maturity calculator India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="RD Calculator"
      breadcrumb="RD Calculator"
      intro="Estimate the maturity value of a Recurring Deposit. See how consistent monthly deposits grow with quarterly compounding."
      faqs={[
        { title: "What is a recurring deposit?", content: "An RD lets you deposit a fixed amount every month for a set tenure, earning interest compounded quarterly until maturity." },
        { title: "How is RD maturity calculated?", content: "Each monthly deposit earns interest for its remaining tenure, with quarterly compounding, then all are summed at maturity." },
        { title: "Is RD interest taxed?", content: "Yes — RD interest is taxable at your slab rate, and TDS applies if total interest across deposits exceeds the bank's threshold." },
      ]}
    >
      <RDCalculator />
    </CalcPageShell>
  );
}
