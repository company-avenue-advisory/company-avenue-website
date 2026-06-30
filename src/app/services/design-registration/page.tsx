import type { Metadata } from "next";
import { DesignRegistrationPage } from "@/components/sections/DesignRegistrationPage";

export const metadata: Metadata = {
  title: "Design Registration in India — Designs Act 2000 | Company Avenue Advisory",
  description:
    "Protect your product's visual appearance — shape, pattern, and ornamentation — under the Designs Act 2000. Up to 15 years of exclusive protection. Starting ₹4,999 (excl. govt fees).",
};

export default function DesignRegistrationServicePage() {
  return <DesignRegistrationPage />;
}
