"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/gtag";
import { PHONE_E164, waLink } from "@/lib/seo";

const POPULAR = [
  { label: "Private Limited Registration", href: "/services/private-limited-company" },
  { label: "GST Registration", href: "/services/gst-registration" },
  { label: "Trademark Registration", href: "/services/trademark-registration" },
  { label: "Income Tax Filing", href: "/services/income-tax-return" },
];

export function ThankYouClient() {
  // Fire the primary lead conversion event once, on load. (Section J.)
  useEffect(() => {
    trackEvent("generate_lead", { page_path: "/thank-you" });
  }, []);

  return (
    <div className="container-custom flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">✓</div>
      <h1 className="heading-lg text-dark mb-3">Thank you — we&apos;ve got your request!</h1>
      <p className="max-w-xl text-muted text-base md:text-lg mb-8">
        Our team will reach out within business hours (Mon–Sat, 9 AM–7 PM). Prefer to talk now?
        Call us or message us on WhatsApp for an instant response.
      </p>
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        <Button href={`tel:${PHONE_E164}`} variant="primary" size="lg">Call Now</Button>
        <Button href={waLink("Hi, I just submitted an enquiry on your website.")} external variant="accent" size="lg">
          Chat on WhatsApp
        </Button>
      </div>

      <div className="w-full max-w-2xl">
        <p className="mb-4 font-heading font-semibold text-dark">Popular services</p>
        <div className="flex flex-wrap justify-center gap-3">
          {POPULAR.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-full border border-black/10 px-4 py-2 text-sm text-muted hover:border-primary/30 hover:text-primary"
            >
              {s.label}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/" variant="ghost" size="md">Back to Home</Button>
        </div>
      </div>
    </div>
  );
}
