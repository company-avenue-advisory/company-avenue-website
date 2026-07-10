import type { Metadata } from "next";
import { MutualFundCalculator } from "@/components/calculators/MutualFundCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "Mutual Fund Returns Calculator — SIP & Lumpsum | Company Avenue Advisory",
  description: "Free mutual fund returns calculator supporting both SIP and lumpsum. Estimate maturity value and gains with an interactive breakdown.",
  keywords: [
    "mutual fund calculator",
    "mutual fund returns calculator",
    "SIP lumpsum calculator",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="Mutual Fund Returns Calculator"
      breadcrumb="Mutual Fund Calculator"
      intro="Project mutual fund returns for both SIP and lumpsum modes. Compare invested amount against estimated returns over your chosen horizon."
      faqs={[
        { title: "What returns should I assume?", content: "Equity funds have historically returned 10-14% p.a. over the long term, though past performance doesn't guarantee future results." },
        { title: "SIP or lumpsum in mutual funds?", content: "SIPs suit regular income and reduce timing risk; lumpsums suit idle capital deployed when valuations are attractive." },
        { title: "Are mutual fund gains taxed?", content: "Yes — equity LTCG above ₹1.25L/year is taxed at 12.5%; debt fund gains are taxed at your slab rate." },
      ]}
    >
      <MutualFundCalculator />
    </CalcPageShell>
  );
}
