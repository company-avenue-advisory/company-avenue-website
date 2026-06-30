import type { Metadata } from "next";
import { PSARALicensePage } from "@/components/sections/PSARALicensePage";

export const metadata: Metadata = {
  title: "PSARA License for Private Security Agencies | Company Avenue Advisory",
  description:
    "Get your PSARA 2005 license from the State Controlling Authority. Mandatory for all private security agencies in India. Security deposit, police verification, and training compliance. Starting ₹9,999.",
};

export default function PSARALicenseServicePage() {
  return <PSARALicensePage />;
}
