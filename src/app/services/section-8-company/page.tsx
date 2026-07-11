import type { Metadata } from "next";
import { Section8CompanyPage } from "@/components/sections/Section8CompanyPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/section-8-company" },
  title: "Section 8 Company Registration (NGO) | Company Avenue Advisory",
  description:
    "Register a Section 8 Company (Non-Profit) under Companies Act 2013. Ideal for NGOs, charities, and social enterprises. MCA license, 12A & 80G registration assistance. Starting ₹7,999.",
};

export default function Section8CompanyServicePage() {
  return <Section8CompanyPage />;
}
