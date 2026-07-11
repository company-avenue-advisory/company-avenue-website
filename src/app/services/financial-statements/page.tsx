import type { Metadata } from "next";
import { FinancialStatementsPage } from "@/components/sections/FinancialStatementsPage";

export const metadata: Metadata = {
  alternates: { canonical: "/services/financial-statements" },
  title: "Financial Statements Preparation & Filing | Company Avenue Advisory",
  description:
    "Statutory financial statements — Balance Sheet, P&L, Cash Flow, Director's Report — prepared in Schedule III format under Companies Act 2013. Audit-ready and AOC-4 filing. Starting ₹4,999/year.",
};

export default function FinancialStatementsServicePage() {
  return <FinancialStatementsPage />;
}
