import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle, Clock, FileText, ArrowRight, Phone, Star,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";

// Extended service data
const serviceDetails: Record<string, {
  tagline: string;
  benefits: string[];
  requirements: string[];
  documents: string[];
  timeline: string;
  startingPrice: string;
  faqs: { q: string; a: string }[];
}> = {
  "private-limited-company": {
    tagline: "India's most preferred business structure for startups and growth-focused companies.",
    benefits: [
      "Limited liability protection for all shareholders",
      "Separate legal identity from its owners",
      "Easy access to funding and venture capital",
      "Higher credibility with clients and partners",
      "Employee stock option schemes (ESOPs) possible",
      "Perpetual existence — company survives owner changes",
    ],
    requirements: [
      "Minimum 2 directors (max 15)",
      "Minimum 2 shareholders (max 200)",
      "At least one director must be an Indian resident",
      "Registered office address in India",
      "Minimum paid-up capital: No minimum requirement",
    ],
    documents: [
      "PAN Card of all directors and shareholders",
      "Aadhaar Card / Voter ID / Passport",
      "Passport-size photographs",
      "Utility bill (electricity/water) for registered office",
      "No-objection certificate from property owner",
    ],
    timeline: "7–10 business days",
    startingPrice: "₹6,999",
    faqs: [
      {
        q: "Can I convert my proprietorship to a Private Limited Company?",
        a: "Yes. We handle the conversion process including asset transfer and business migration.",
      },
      {
        q: "Do I need a physical office for company registration?",
        a: "You need a registered address in India, which can be your home address initially.",
      },
    ],
  },
  "gst-registration": {
    tagline: "Get your GSTIN quickly and operate with full tax compliance from day one.",
    benefits: [
      "Legal authorization to collect GST from customers",
      "Claim Input Tax Credit (ITC) on purchases",
      "Access to inter-state trade without restrictions",
      "Enhanced credibility with B2B customers",
      "Required for e-commerce selling",
      "Enables government tender participation",
    ],
    requirements: [
      "PAN of the business / proprietor / directors",
      "Aadhaar-linked mobile number",
      "Business address in India",
      "Bank account in business name",
      "Business type and activities description",
    ],
    documents: [
      "PAN Card of business owner / company",
      "Aadhaar Card",
      "Business address proof",
      "Bank statement / cancelled cheque",
      "Photographs of business premises",
    ],
    timeline: "3–5 business days",
    startingPrice: "₹1,499",
    faqs: [
      {
        q: "Who must mandatorily register for GST?",
        a: "Businesses with turnover above ₹40L (goods) or ₹20L (services), all e-commerce sellers, and inter-state suppliers.",
      },
      {
        q: "Can I register voluntarily if my turnover is below the threshold?",
        a: "Yes. Voluntary registration is beneficial if you want to claim ITC or supply to B2B customers who prefer GST-registered vendors.",
      },
    ],
  },
};

// Fallback detail for services without specific data
const defaultDetail = {
  tagline: "Professional compliance service handled by expert CAs and CSs.",
  benefits: [
    "Expert handling by qualified professionals",
    "Fast turnaround within committed timelines",
    "Transparent pricing with no hidden charges",
    "Complete documentation support",
    "Government liaison and follow-up",
    "Post-registration compliance guidance",
  ],
  requirements: [
    "Valid PAN Card",
    "Address proof",
    "Identity proof of all parties",
    "Business-specific documents as applicable",
  ],
  documents: [
    "PAN Card",
    "Aadhaar Card",
    "Address Proof",
    "Passport-size photograph",
    "Bank account details",
  ],
  timeline: "5–7 business days",
  startingPrice: "Contact for pricing",
  faqs: [
    {
      q: "How do I get started?",
      a: "Book a free consultation. Our expert will guide you through the requirements and process.",
    },
    {
      q: "What happens after I submit my documents?",
      a: "We review, prepare, and file your application. You receive real-time updates until completion.",
    },
  ],
};

export async function generateStaticParams() {
  return SERVICES.filter((s) => s.id !== "private-limited-company" && s.id !== "llp-registration").map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDesc,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  const detail = serviceDetails[slug] || defaultDetail;
  const related = SERVICES.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/70">{service.title}</span>
          </div>
          <div className="max-w-2xl">
            <Badge variant="accent" className="mb-4">{service.category}</Badge>
            <h1 className="heading-lg text-white mb-4">{service.title}</h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">{detail.tagline}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="accent" size="lg">
                Get Started — {detail.startingPrice}
              </Button>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Phone size={14} />
                Call Now
              </a>
            </div>
            <div className="flex items-center gap-2 mt-6 text-white/40 text-sm">
              <Clock size={14} />
              <span>Typical timeline: {detail.timeline}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-pad bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Benefits */}
              <div>
                <h2 className="heading-sm text-dark mb-6">Key Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {detail.benefits.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-card border border-slate-100"
                    >
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-dark text-sm leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="heading-sm text-dark mb-6">Eligibility & Requirements</h2>
                <ul className="space-y-3">
                  {detail.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <ArrowRight size={14} className="text-accent shrink-0 mt-1" />
                      <span className="text-slate-700 text-sm">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div>
                <h2 className="heading-sm text-dark mb-6">Documents Required</h2>
                <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {detail.documents.map((doc) => (
                      <div key={doc} className="flex items-center gap-2.5">
                        <FileText size={14} className="text-primary shrink-0" />
                        <span className="text-dark text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="heading-sm text-dark mb-6">Common Questions</h2>
                <div className="space-y-4">
                  {detail.faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="bg-white rounded-xl p-5 shadow-card border border-slate-100"
                    >
                      <p className="font-heading font-semibold text-dark text-sm mb-2">{faq.q}</p>
                      <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 sticky top-24">
                <h3 className="font-heading font-semibold text-dark text-base mb-2">
                  Get Started Today
                </h3>
                <p className="text-muted text-sm mb-5">
                  Free consultation · No commitment required
                </p>
                <div className="flex items-center gap-2 text-dark text-sm mb-5">
                  <Clock size={14} className="text-accent" />
                  <span>Timeline: <strong>{detail.timeline}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-dark text-sm mb-6">
                  <Star size={14} className="text-accent" />
                  <span>Starting at <strong>{detail.startingPrice}</strong></span>
                </div>
                <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                  Book Consultation
                </Button>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 mt-3 text-primary text-sm font-heading font-semibold hover:underline"
                >
                  <Phone size={14} />
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Related services */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="heading-sm text-dark mb-8">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.id}`}
                    className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <h3 className="font-heading font-semibold text-dark text-sm mb-2 group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed mb-3">{s.shortDesc}</p>
                    <div className="flex items-center gap-1 text-accent text-xs font-heading font-semibold">
                      Learn More <ArrowRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
