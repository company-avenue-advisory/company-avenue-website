import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/ContactPage";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Us",
  description: "Get in touch with Company Avenue Advisory. Book a free consultation with our CA and CS experts.",
};

export default function Contact() {
  // No Suspense boundary here on purpose: ContactPage keeps its own, scoped to
  // the one child that reads the query string, so the useSearchParams
  // prerender bail-out cannot spread to the form. See CalcHandoff in that file.
  return <ContactPage />;
}
