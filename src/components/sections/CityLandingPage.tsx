import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { PHONE_E164, waLink, serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export interface CityLandingConfig {
  /** URL path e.g. /services/gst-registration-delhi */
  path: string;
  /** Primary H1 */
  h1: string;
  /** Short service label for CTAs, e.g. "GST registration" */
  serviceLabel: string;
  /** City name, e.g. "Delhi" */
  city: string;
  /** Link to the canonical money page for this service */
  moneyPageHref: string;
  /** WhatsApp prefilled text */
  waText: string;
  /** Unique city-specific intro paragraphs (2–3) */
  intro: string[];
  /** "What's included" bullet points */
  included: string[];
  /** Ordered process steps */
  steps: { title: string; body: string }[];
  /** Documents required */
  documents: string[];
  /** Local, city-specific note paragraph */
  localNote: string;
  /** FAQ pairs (also emitted as FAQPage schema) */
  faqs: { question: string; answer: string }[];
  /** Related internal links */
  related: { label: string; href: string }[];
}

export function CityLandingPage({ config }: { config: CityLandingConfig }) {
  const {
    path, h1, serviceLabel, city, moneyPageHref, waText,
    intro, included, steps, documents, localNote, faqs, related,
  } = config;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: h1,
            description: intro[0],
            path,
            areaServed: city,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: h1, path },
          ]),
          faqSchema(faqs),
        ]}
      />

      {/* Dark hero — matches the site's service-page hero so the fixed navbar
          sits on a dark background and content clears its 72px height. */}
      <section className="relative bg-[#081726] text-white pt-28 md:pt-32 pb-16 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/[0.06] pointer-events-none" />
        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white font-medium">{h1}</li>
            </ol>
          </nav>

          <header className="max-w-3xl">
            <h1 className="heading-lg text-white mb-5">{h1}</h1>
            {intro.map((p, i) => (
              <p key={i} className="text-white/70 text-base md:text-lg mb-4 leading-relaxed">{p}</p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="accent" size="lg">Book Free Consultation</Button>
              <Button
                href={waLink(waText)}
                external
                data-track="whatsapp"
                size="lg"
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Chat on WhatsApp
              </Button>
              <Button
                href={`tel:${PHONE_E164}`}
                data-track="call"
                size="lg"
                className="bg-transparent shadow-none border border-white/25 text-white hover:bg-white/10"
              >
                Call Now
              </Button>
            </div>
          </header>
        </div>
      </section>

      <div className="container-custom pb-16">
        {/* What's included */}
        <section className="mt-14">
          <h2 className="heading-md text-dark mb-6">What&apos;s Included</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {included.map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-black/5 bg-white p-4">
                <span className="mt-0.5 text-primary">✓</span>
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Process */}
        <section className="mt-14">
          <h2 className="heading-md text-dark mb-6">How the Process Works</h2>
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary">{i + 1}</span>
                <div>
                  <h3 className="font-heading font-semibold text-dark">{s.title}</h3>
                  <p className="text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Documents */}
        <section className="mt-14">
          <h2 className="heading-md text-dark mb-6">Documents Required</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {documents.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-muted">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />{d}
              </li>
            ))}
          </ul>
        </section>

        {/* Local block */}
        <section className="mt-14 rounded-2xl border border-black/5 bg-background p-6 md:p-8">
          <h2 className="heading-md text-dark mb-4">Serving Businesses in {city}</h2>
          <p className="text-muted mb-6 leading-relaxed">{localNote}</p>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <p className="font-heading font-semibold text-dark">Office</p>
              <p className="text-muted">{COMPANY.address}</p>
            </div>
            <div>
              <p className="font-heading font-semibold text-dark">Phone</p>
              <a href={`tel:${PHONE_E164}`} data-track="call" className="text-primary">{COMPANY.phone}</a>
            </div>
            <div>
              <p className="font-heading font-semibold text-dark">Hours</p>
              <p className="text-muted">{COMPANY.workingHours}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14 max-w-3xl">
          <h2 className="heading-md text-dark mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map((f, i) => (
              <div key={i}>
                <h3 className="font-heading font-semibold text-dark mb-1">{f.question}</h3>
                <p className="text-muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related links */}
        <section className="mt-14">
          <h2 className="heading-md text-dark mb-4">Related Services</h2>
          <div className="flex flex-wrap gap-3">
            <Link href={moneyPageHref} className="rounded-full border border-primary/30 px-4 py-2 text-sm text-primary hover:bg-primary/5">
              {serviceLabel} (all India)
            </Link>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className="rounded-full border border-black/10 px-4 py-2 text-sm text-muted hover:border-primary/30 hover:text-primary">
                {r.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16 rounded-2xl bg-[#0F2D52] p-8 md:p-12 text-center text-white">
          <h2 className="heading-md mb-3">Ready to get started in {city}?</h2>
          <p className="text-white/70 mb-6">Talk to our CAs today — fixed transparent pricing, no hidden fees.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="accent" size="lg">Book Free Consultation</Button>
            <Button href={waLink(waText)} external data-track="whatsapp" variant="secondary" size="lg">Chat on WhatsApp</Button>
          </div>
        </section>
      </div>
    </>
  );
}
