import type { Metadata } from "next";
import { ArrowDown, Calculator } from "lucide-react";
import { PrivateLimitedPage } from "@/components/sections/PrivateLimitedPage";
import { CompanyRegistrationCalculator } from "@/components/calculators/CompanyRegistrationCalculator";
import { faqs as serviceFaqs } from "@/lib/faqs/PrivateLimitedPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema, faqSchema, OG_IMAGE } from "@/lib/seo";
import { PRO_FEES, inr } from "@/lib/calc-fees";
import { getServicePricing, pricingOffers } from "@/lib/pricing";

/**
 * PHASE 2 (calculator-first pricing): this is the one page piloting it before
 * the pattern rolls out to the rest of the 18 services. The static price
 * panel + "Free Tools" links-out are replaced by the live calculator itself,
 * pre-set to Private Limited (entity picker hidden — the visitor is already
 * on this service's page) so a visitor configures their own cost and books
 * a consultation without leaving. A one-line "starting from" figure is kept
 * above it for anyone scanning rather than interacting.
 */
function PrivateLimitedPricingSlot() {
  // ServicePricingBlock used to emit this Offer schema next to its static
  // panel. The panel is gone here, but the schema shouldn't silently drop —
  // keep it, sourced the same way, next to the calculator that replaced it.
  const pricing = getServicePricing("private-limited-company");
  const offers = pricingOffers("private-limited-company");

  return (
    <section id="calculator" className="py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-white">
      {pricing && offers && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: pricing.label,
            description: `${pricing.label} by Company Avenue Advisory — professional fee ${inr(pricing.price)}, ${pricing.feeNote}.`,
            brand: { "@type": "Brand", name: "Company Avenue Advisory" },
            offers,
          }}
        />
      )}
      <div className="container-custom">
        <div className="max-w-3xl mb-8">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-3">
            <span className="w-6 h-px bg-accent" />
            Transparent Pricing
          </span>
          <h2 className="heading-lg text-dark mb-3 text-balance">
            Work out your exact registration cost
          </h2>
          <p className="text-muted text-sm md:text-base leading-relaxed">
            Starting from {inr(PRO_FEES["private-limited-company"])} — pick your state, capital
            and directors below for the full breakdown, add GST, MSME or a trademark at our
            bundled rates, then lock it in with a free consultation.
          </p>
        </div>
        <CompanyRegistrationCalculator lockEntity="pvtltd" />
      </div>
    </section>
  );
}

/**
 * Replaces the generic ServiceCalcPill on this page only: that pill links
 * out to /calculators/company-registration-cost, which would send a visitor
 * away from a calculator that is now embedded right here. This jumps to it
 * instead of leaving the page.
 */
function JumpToCalculatorPill() {
  return (
    <div className="mb-7 -mt-1">
      <a
        href="#calculator"
        className="group inline-flex items-center gap-3 pl-2 pr-4 sm:pr-5 py-2 rounded-full bg-white border border-slate-200 ring-1 ring-accent/25 shadow-card hover:shadow-card-hover hover:ring-accent/60 hover:-translate-y-0.5 transition-all duration-300 max-w-full"
      >
        <span className="w-9 h-9 shrink-0 rounded-full bg-accent flex items-center justify-center text-white shadow-sm">
          <Calculator size={17} />
        </span>
        <span className="flex flex-col min-w-0 text-left leading-tight">
          <span className="font-heading font-bold text-[13px] sm:text-sm text-dark truncate">
            Get an idea of what it&apos;ll cost
          </span>
          <span className="text-[11px] text-muted truncate">
            Free calculator, below — instant, no signup
          </span>
        </span>
        <ArrowDown
          size={15}
          className="shrink-0 text-accent group-hover:translate-y-0.5 transition-transform"
        />
      </a>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Private Limited Company Registration in Delhi | Fast",
  description:
    "Register your Pvt Ltd company in Delhi in 7–10 days. CA-led, 100% online, fixed transparent pricing, no hidden fees. Book a free consultation now.",
  alternates: { canonical: "/services/private-limited-company" },
  keywords: [
    "private limited company registration in Delhi",
    "pvt ltd registration cost",
    "company incorporation",
    "pvt ltd company registration online",
    "register pvt ltd company",
    "company registration in india",
  ],
  openGraph: {
    title: "Private Limited Company Registration in Delhi",
    description:
      "Register your Pvt Ltd company in Delhi in 7–10 days. CA-led, 100% online, transparent pricing.",
    type: "website",
    siteName: "Company Avenue Advisory",
    locale: "en_IN",
    images: [OG_IMAGE],
  },
};

export default function PrivateLimitedCompanyPage() {
  return (
    <>
      <JsonLd data={faqSchema(serviceFaqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd
        data={[
          serviceSchema({
            name: "Private Limited Company Registration in Delhi",
            description:
              "CA-led Private Limited Company registration in Delhi in 7–10 days — name approval, MCA incorporation, PAN, TAN and compliance.",
            path: "/services/private-limited-company",
            areaServed: "Delhi",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Private Limited Company Registration", path: "/services/private-limited-company" },
          ]),
        ]}
      />
      <PrivateLimitedPage
        pricingSlot={<PrivateLimitedPricingSlot />}
        calcPill={<JumpToCalculatorPill />}
      />
    </>
  );
}
