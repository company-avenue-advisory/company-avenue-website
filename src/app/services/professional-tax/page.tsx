import type { Metadata } from "next";
import { ProfessionalTaxPage } from "@/components/sections/ProfessionalTaxPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/professional-tax" },
  title: "Professional Tax Registration & Returns | Company Avenue Advisory",
  description:
    "Register for Professional Tax (PT) and file monthly/annual returns. Mandatory for employers in Maharashtra, Karnataka, West Bengal, and more. Starting ₹999.",
};

export default function ProfessionalTaxServicePage() {
  return <ProfessionalTaxPage />;
}
