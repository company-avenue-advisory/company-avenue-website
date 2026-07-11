import type { Metadata } from "next";
import { TrademarkRenewalPage } from "@/components/sections/TrademarkRenewalPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/trademark-renewal" },
  title: "Trademark Renewal — Form TM-R Filing | Company Avenue Advisory",
  description:
    "Renew your trademark registration before the 10-year term expires. File Form TM-R online with the Trade Marks Registry. Govt fee ₹9,000/class (₹4,500 for small entities). Starting ₹2,999.",
};

export default function TrademarkRenewalServicePage() {
  return <TrademarkRenewalPage />;
}
