import type { Metadata } from "next";
import { DirectorKYCPage } from "@/components/sections/DirectorKYCPage";

export const metadata: Metadata = {
  title: "Director KYC (DIR-3 KYC) Filing | Company Avenue Advisory",
  description:
    "File DIR-3 KYC annually to keep your DIN active. Avoid ₹5,000 penalty and DIN deactivation. Quick online filing. Starting ₹499 per director.",
};

export default function DirectorKYCServicePage() {
  return <DirectorKYCPage />;
}
