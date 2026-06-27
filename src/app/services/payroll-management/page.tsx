import type { Metadata } from "next";
import { PayrollManagementPage } from "@/components/sections/PayrollManagementPage";

export const metadata: Metadata = {
  title: "Payroll Management Services | PF, ESIC, TDS & Form 16 | Company Avenue",
  description:
    "End-to-end payroll outsourcing for Indian businesses. Salary computation, payslips, PF ECR, ESIC, Professional Tax, TDS on salary, Form 16, and full statutory compliance. CA-managed, on-time, every month.",
  keywords: [
    "payroll management services India",
    "outsourced payroll",
    "PF ESIC compliance",
    "TDS on salary",
    "Form 16 issuance",
    "payroll outsourcing",
    "salary processing",
    "payslip generation",
    "statutory compliance payroll",
    "payroll services for startups",
  ],
  openGraph: {
    title: "Payroll Management Services | Company Avenue",
    description:
      "CA-managed payroll outsourcing — salary, payslips, PF, ESIC, TDS, Form 16 and full compliance. Start from ₹150/employee/month.",
    type: "website",
  },
};

export default function PayrollManagementServicePage() {
  return <PayrollManagementPage />;
}
