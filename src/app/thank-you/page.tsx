import type { Metadata } from "next";
import { ThankYouClient } from "./ThankYouClient";

export const metadata: Metadata = {
  title: "Thank You | Company Avenue Advisory",
  description: "Thank you for reaching out. Our team will contact you shortly.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
