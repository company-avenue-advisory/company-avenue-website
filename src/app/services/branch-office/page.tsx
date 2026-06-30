import type { Metadata } from "next";
import { BranchOfficePage } from "@/components/sections/BranchOfficePage";

export const metadata: Metadata = {
  title: "Branch Office / Liaison Office / Project Office in India | Company Avenue Advisory",
  description:
    "Set up a Branch Office, Liaison Office, or Project Office in India with RBI approval under FEMA. Form FNC filing, AD bank coordination, and annual compliance support. Starting ₹19,999.",
};

export default function BranchOfficeServicePage() {
  return <BranchOfficePage />;
}
