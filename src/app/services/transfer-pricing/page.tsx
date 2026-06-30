import type { Metadata } from "next";
import { TransferPricingPage } from "@/components/sections/TransferPricingPage";

export const metadata: Metadata = {
  title: "Transfer Pricing Compliance & Documentation | Company Avenue Advisory",
  description:
    "Transfer pricing study report, Form 3CEB filing, and APA advisory for international transactions with associated enterprises. Arm's length price documentation. Starting ₹19,999.",
};

export default function TransferPricingServicePage() {
  return <TransferPricingPage />;
}
