import type { Metadata } from "next";
import { CompanyClosurePage } from "@/components/sections/CompanyClosurePage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/company-closure" },
  title: "Company Closure — Strike Off & Winding Up | Company Avenue Advisory",
  description:
    "Close your company legally via STK-2 strike off under Section 248 or voluntary winding up via NCLT. Clear pending filings, cancel GST, and achieve clean dissolution. Starting ₹7,999.",
};

export default function CompanyClosureServicePage() {
  return <CompanyClosurePage />;
}
