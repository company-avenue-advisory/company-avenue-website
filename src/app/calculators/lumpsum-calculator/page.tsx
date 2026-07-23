import type { Metadata } from "next";
import { LumpsumCalculator } from "@/components/calculators/LumpsumCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "Lumpsum Calculator — One-Time Investment Returns",
  description: "Free lumpsum investment calculator. Estimate the maturity value and returns of a one-time mutual fund or lumpsum investment.",
  keywords: [
    "lumpsum calculator",
    "lumpsum investment calculator",
    "one time investment calculator",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="Lumpsum Calculator"
      breadcrumb="Lumpsum Calculator"
      intro="Project the future value of a one-time investment. Enter the amount, expected return and horizon to see your maturity value and gains."
      faqs={[
        { title: "Lumpsum vs SIP?", content: "A lumpsum invests a large amount at once — better when you have idle capital and markets are favourable. SIPs spread risk across time." },
        { title: "How is it calculated?", content: "Future value = Principal × (1 + r)^n, using annual compounding on your expected rate of return." },
        { title: "Is a lumpsum riskier?", content: "It carries more timing risk than a SIP because the entire amount is exposed to the market from day one." },
      ]}
    >
      <LumpsumCalculator />
    </CalcPageShell>
  );
}
