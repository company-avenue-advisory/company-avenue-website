import type { Metadata } from "next";
import { SoleProprietorshipPage } from "@/components/sections/SoleProprietorshipPage";

export const metadata: Metadata = {
  title: "Sole Proprietorship Registration | Company Avenue Advisory",
  description:
    "Start your sole proprietorship business in India with Udyam/MSME, GST, shop act registrations. Simplest business form for individual entrepreneurs. Starting ₹999.",
};

export default function SoleProprietorshipServicePage() {
  return <SoleProprietorshipPage />;
}
