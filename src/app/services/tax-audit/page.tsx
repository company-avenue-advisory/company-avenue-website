import type { Metadata } from "next";
import { TaxAuditPage } from "@/components/sections/TaxAuditPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/tax-audit" },
  title: "Tax Audit under Section 44AB | Company Avenue Advisory",
  description:
    "Mandatory tax audit by a Chartered Accountant under Section 44AB. For businesses with turnover above ₹1 crore (₹10 crore for digital transactions) and professionals above ₹50 lakh. Starting ₹4,999.",
};

export default function TaxAuditServicePage() {
  return <TaxAuditPage />;
}
