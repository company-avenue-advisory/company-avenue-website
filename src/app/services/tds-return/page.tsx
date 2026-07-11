import type { Metadata } from "next";
import { TdsReturnPage } from "@/components/sections/TdsReturnPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/tds-return" },
  title: "TDS Return Filing — Form 24Q, 26Q, 27Q | Company Avenue Advisory",
  description:
    "Quarterly TDS return filing for salary (24Q), non-salary (26Q), and NRI payments (27Q). Avoid ₹200/day late fee under Section 234E. Expert CA filing. Starting ₹1,499/quarter.",
};

export default function TDSReturnServicePage() {
  return <TdsReturnPage />;
}
