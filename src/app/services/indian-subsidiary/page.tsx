import type { Metadata } from "next";
import { IndianSubsidiaryPage } from "@/components/sections/IndianSubsidiaryPage";

export const metadata: Metadata = {
  title: "Indian Subsidiary Registration for Foreign Companies | Company Avenue Advisory",
  description:
    "Incorporate a wholly-owned Indian subsidiary (Private Limited Company) with full FEMA/RBI compliance. FCGPR filing, FDI advisory, and ongoing ROC support. Starting ₹14,999.",
};

export default function IndianSubsidiaryServicePage() {
  return <IndianSubsidiaryPage />;
}
