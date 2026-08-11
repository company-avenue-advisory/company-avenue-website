import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/ContactPage";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Us",
  description: "Get in touch with Company Avenue Advisory. Book a free consultation with our CA and CS experts.",
};

export default function Contact() {
  return <ContactPage />;
}
