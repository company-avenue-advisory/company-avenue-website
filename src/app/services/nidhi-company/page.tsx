import type { Metadata } from "next";
import { NidhiCompanyPage } from "@/components/sections/NidhiCompanyPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/nidhi-company" },
  title: "Nidhi Company Registration | Company Avenue Advisory",
  description:
    "Register a Nidhi Company in India — a mutual benefit society under Section 406 of Companies Act 2013. Member deposits, loans, and savings. Starting ₹9,999.",
};

export default function NidhiCompanyServicePage() {
  return <NidhiCompanyPage />;
}
