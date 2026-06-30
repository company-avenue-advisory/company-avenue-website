import type { Metadata } from "next";
import { BusinessValuationPage } from "@/components/sections/BusinessValuationPage";

export const metadata: Metadata = {
  title: "Business Valuation Services in India | Company Avenue Advisory",
  description:
    "SEBI-compliant business valuation for M&A, fundraising, ESOPs, and RBI compliance. DCF, comparable companies, and asset-based approaches. Starting ₹14,999.",
};

export default function BusinessValuationServicePage() {
  return <BusinessValuationPage />;
}
