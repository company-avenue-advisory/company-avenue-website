import type { Metadata } from "next";
import { CompanyNameChangePage } from "@/components/sections/CompanyNameChangePage";

export const metadata: Metadata = {
  title: "Company Name Change — INC-24 Filing | Company Avenue Advisory",
  description:
    "Change your company name legally via Special Resolution, MGT-14, and INC-24 filing with ROC. Fresh Certificate of Incorporation issued. Starting ₹3,999.",
};

export default function CompanyNameChangeServicePage() {
  return <CompanyNameChangePage />;
}
