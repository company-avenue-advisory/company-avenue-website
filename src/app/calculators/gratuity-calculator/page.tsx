import type { Metadata } from "next";
import { GratuityCalculator } from "@/components/calculators/GratuityCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "Gratuity Calculator — Payment of Gratuity Act | Company Avenue Advisory",
  description: "Free gratuity calculator as per the Payment of Gratuity Act, 1972. Compute gratuity from last drawn salary and years of service, up to the ₹20 lakh cap.",
  keywords: [
    "gratuity calculator",
    "gratuity calculation formula",
    "payment of gratuity act calculator",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="Gratuity Calculator"
      breadcrumb="Gratuity Calculator"
      intro="Estimate the gratuity payable on leaving a job under the Payment of Gratuity Act, 1972 — based on your last salary and years of service."
      faqs={[
        { title: "Who is eligible for gratuity?", content: "Employees who complete at least 5 years of continuous service with an employer covered under the Payment of Gratuity Act." },
        { title: "What is the gratuity formula?", content: "For covered employees: (15 / 26) × last drawn Basic+DA × years of service, with part-years above 6 months rounded up." },
        { title: "Is gratuity taxable?", content: "Gratuity up to ₹20 lakh is exempt for private employees. Any amount above the cap is taxable as per your income slab." },
      ]}
    >
      <GratuityCalculator />
    </CalcPageShell>
  );
}
