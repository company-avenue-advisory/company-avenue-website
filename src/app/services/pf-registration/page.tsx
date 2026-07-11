import type { Metadata } from "next";
import { PFRegistrationPage } from "@/components/sections/PFRegistrationPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/pf-registration" },
  title: "PF Registration — Provident Fund (EPFO) | Company Avenue Advisory",
  description:
    "Register your establishment under the Employees' Provident Funds Act 1952. Mandatory for 20+ employees. ECR filing, UAN generation. Starting ₹1,999.",
};

export default function PFRegistrationServicePage() {
  return <PFRegistrationPage />;
}
