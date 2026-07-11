import type { Metadata } from "next";
import { ESICRegistrationPage } from "@/components/sections/ESICRegistrationPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/esic-registration" },
  title: "ESIC Registration — Employee State Insurance | Company Avenue Advisory",
  description:
    "Register under ESI Act 1948 for health insurance and social security. Mandatory for 10+ employees earning ≤₹21,000/month. IP number, challan filing. Starting ₹1,999.",
};

export default function ESICRegistrationServicePage() {
  return <ESICRegistrationPage />;
}
