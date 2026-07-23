import type { Metadata } from "next";
import { BusinessSetupCalculator } from "@/components/calculators/BusinessSetupCalculator";
import { CalcPageShell } from "@/components/calculators/CalcPageShell";

export const metadata: Metadata = {
  title: "Business Setup Calculator — Cost to Start a Company",
  description: "Free business setup calculator. Estimate the cost to register a Pvt Ltd, LLP, OPC, Partnership or Proprietorship, plus GST, MSME and trademark add-ons.",
  keywords: [
    "business setup calculator",
    "company registration cost calculator",
    "cost to start a business India",
  ],
};

export default function Page() {
  return (
    <CalcPageShell
      title="Business Setup Calculator"
      breadcrumb="Business Setup Calculator"
      intro="Estimate the total cost to start your business — registration, government fees, GST and licences — across every popular structure."
      faqs={[
        { title: "What affects setup cost?", content: "The entity type, state stamp duty, authorised capital, DSC/DIN charges and the professional fees for filing all influence the total." },
        { title: "Which structure is cheapest?", content: "A sole proprietorship is the cheapest to start, but a Private Limited or LLP offers limited liability and better funding access." },
        { title: "Are these fees final?", content: "These are indicative estimates. Get a precise quote from our team based on your state, capital and specific requirements." },
      ]}
    >
      <BusinessSetupCalculator />
    </CalcPageShell>
  );
}
