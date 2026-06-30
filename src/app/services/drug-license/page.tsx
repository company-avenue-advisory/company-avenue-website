import type { Metadata } from "next";
import { DrugLicensePage } from "@/components/sections/DrugLicensePage";

export const metadata: Metadata = {
  title: "Drug License Registration — Retail & Wholesale | Company Avenue Advisory",
  description:
    "Obtain Drug License under the Drugs & Cosmetics Act 1940. Retail, wholesale, and manufacturing licenses. Pharmacies, distributors, importers. Starting ₹3,999.",
};

export default function DrugLicenseServicePage() {
  return <DrugLicensePage />;
}
