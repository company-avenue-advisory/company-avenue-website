import type { Metadata } from "next";
import { IncreaseAuthorisedCapitalPage } from "@/components/sections/IncreaseAuthorisedCapitalPage";

export const metadata: Metadata = {
  title: "Increase Authorised Share Capital — Form SH-7 | Company Avenue Advisory",
  description:
    "Increase your company's authorised share capital via Ordinary Resolution and Form SH-7 filing with ROC. Required before fresh share allotment, FDI, or ESOPs. Starting ₹2,999.",
};

export default function IncreaseAuthorisedCapitalServicePage() {
  return <IncreaseAuthorisedCapitalPage />;
}
