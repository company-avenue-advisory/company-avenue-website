import type { Metadata } from "next";
import { PrivateLimitedPage } from "@/components/sections/PrivateLimitedPage";

export const metadata: Metadata = {
  title: "Private Limited Company Registration in India | Company Avenue Advisory",
  description:
    "Register your Private Limited Company in India with expert CAs. Complete assistance with name approval, MCA incorporation, PAN, TAN and post-registration compliance. 7–10 working days. 100% online.",
  keywords: [
    "private limited company registration",
    "register pvt ltd company",
    "company registration in india",
    "company incorporation",
    "MCA company registration",
    "private limited registration india",
    "how to register private limited company india",
    "documents for private limited company registration",
  ],
  openGraph: {
    title: "Private Limited Company Registration in India",
    description:
      "Start your Private Limited Company with experienced Chartered Accountants. 7–10 working days, 100% online, transparent pricing.",
    type: "website",
  },
};

export default function PrivateLimitedCompanyPage() {
  return <PrivateLimitedPage />;
}
