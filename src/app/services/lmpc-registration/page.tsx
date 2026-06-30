import type { Metadata } from "next";
import { LMPCRegistrationPage } from "@/components/sections/LMPCRegistrationPage";

export const metadata: Metadata = {
  title: "LMPC Registration — Legal Metrology Packaged Commodities | Company Avenue Advisory",
  description:
    "Register under Legal Metrology (Packaged Commodities) Rules 2011 — mandatory for manufacturers, packers, and importers of pre-packaged goods in India. Label compliance + registration. Starting ₹3,999.",
};

export default function LMPCRegistrationServicePage() {
  return <LMPCRegistrationPage />;
}
