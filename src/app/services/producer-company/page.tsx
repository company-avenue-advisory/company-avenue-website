import type { Metadata } from "next";
import { ProducerCompanyPage } from "@/components/sections/ProducerCompanyPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/producer-company" },
  title: "Producer Company Registration — Farmers & Artisans | Company Avenue Advisory",
  description:
    "Register a Producer Company under Companies Act 2013 for farmers, fishermen and artisans. Collective bargaining, easier credit access, limited liability. Starting ₹9,999.",
};

export default function ProducerCompanyServicePage() {
  return <ProducerCompanyPage />;
}
