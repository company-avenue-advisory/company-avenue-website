import type { Metadata } from "next";
import { GratuityTrustPage } from "@/components/sections/GratuityTrustPage";

export const metadata: Metadata = {
  title: "Gratuity Trust Registration — Section 36(1)(v) Approval | Company Avenue Advisory",
  description:
    "Set up an Income Tax-approved Gratuity Trust to make employer contributions tax-deductible. Mandatory for 10+ employee establishments under the Gratuity Act 1972. Starting ₹14,999.",
};

export default function GratuityTrustServicePage() {
  return <GratuityTrustPage />;
}
