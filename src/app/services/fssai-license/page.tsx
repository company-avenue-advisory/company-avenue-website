import type { Metadata } from "next";
import { FSSAILicensePage } from "@/components/sections/FSSAILicensePage";

export const metadata: Metadata = {
  title: "FSSAI License Registration for Food Business | Company Avenue Advisory",
  description:
    "Get FSSAI Basic Registration, State License, or Central License for your food business. Restaurants, manufacturers, importers. Starting ₹1,999.",
};

export default function FSSAILicenseServicePage() {
  return <FSSAILicensePage />;
}
