/**
 * Pricing band + calculator shortcuts for a service page.
 *
 * SERVER COMPONENT ON PURPOSE — it reads `@/lib/pricing` directly so none of the
 * pricing data reaches the browser bundle. The service page components are
 * `"use client"`, so a server `page.tsx` must pass this in as a slot prop:
 *
 *   <PrivateLimitedPage pricingSlot={<ServicePricingBlock serviceId="…" />} />
 *
 * Renders as section 3 of a service page — right after the quick-facts strip.
 */
import Link from "next/link";
import {
  Building2, Scale, Lightbulb, ClipboardCheck, Calculator, IndianRupee,
  FileText, Wallet, Receipt, Search, PiggyBank, Percent,
  Check, ArrowRight, ArrowUpRight, Phone, ShieldCheck, Info,
} from "lucide-react";
import {
  getServicePricing, getServiceCalculators, formatINR, pricingOffers, type CalcTool,
} from "@/lib/pricing";
import { JsonLd } from "@/components/seo/JsonLd";

const ICONS = {
  Building2, Scale, Lightbulb, ClipboardCheck, Calculator,
  IndianRupee, FileText, Wallet, Receipt, Search, PiggyBank, Percent,
} as const;

const TONES: Record<CalcTool["tone"], string> = {
  navy: "text-primary bg-primary/8 group-hover:bg-primary",
  blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-600",
  green: "text-green-600 bg-green-50 group-hover:bg-green-600",
  amber: "text-amber-600 bg-amber-50 group-hover:bg-amber-600",
  purple: "text-purple-600 bg-purple-50 group-hover:bg-purple-600",
  rose: "text-rose-600 bg-rose-50 group-hover:bg-rose-600",
  teal: "text-teal-600 bg-teal-50 group-hover:bg-teal-600",
};

export function ServicePricingBlock({ serviceId }: { serviceId: string }) {
  const pricing = getServicePricing(serviceId);
  const tools = getServiceCalculators(serviceId);

  if (!pricing && tools.length === 0) return null;

  const offers = pricingOffers(serviceId);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-white">
      {/* Emitted here, next to the rendered prices, so schema can never drift. */}
      {pricing && offers && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: pricing.label,
            description: `${pricing.label} by Company Avenue Advisory — professional fee ${formatINR(pricing.price)}, ${pricing.feeNote}.`,
            brand: { "@type": "Brand", name: "Company Avenue Advisory" },
            offers,
          }}
        />
      )}
      <div className="container-custom">
        {pricing && (
          <>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-3">
                <span className="w-6 h-px bg-accent" />
                Transparent Pricing
              </span>
              <h2 className="heading-lg text-dark mb-3 text-balance">{pricing.label}</h2>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                Fixed professional fees, published up front. Government fees are passed
                through at actual — we never mark them up.
              </p>
            </div>

            <div className="mt-8 md:mt-10 grid lg:grid-cols-5 gap-5 lg:gap-6 items-start">
              {/* ── Price panel ── */}
              <div className="lg:col-span-3 relative overflow-hidden rounded-3xl bg-[#0F2D52] text-white shadow-card">
                <div
                  className="absolute inset-0 opacity-[0.07] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                    <div>
                      <p className="text-[11px] font-heading font-semibold tracking-widest uppercase text-accent mb-2">
                        Our professional fee
                      </p>
                      <div className="flex items-end gap-3">
                        <span className="font-heading font-extrabold leading-none text-5xl sm:text-6xl tracking-tight">
                          {formatINR(pricing.price)}
                        </span>
                        {pricing.unit && (
                          <span className="text-base sm:text-lg text-white/70 font-heading font-semibold pb-1">
                            {pricing.unit}
                          </span>
                        )}
                      </div>
                    </div>
                    {pricing.compareAt && (
                      <div className="pb-2 flex items-center gap-2">
                        <span className="text-lg text-white/50 line-through font-heading">
                          {formatINR(pricing.compareAt)}
                        </span>
                        <span className="text-[11px] font-heading font-bold px-2 py-1 rounded-md bg-accent text-white">
                          Save {formatINR(pricing.compareAt - pricing.price)}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-white/70">{pricing.feeNote}</p>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs font-heading font-bold uppercase tracking-wider text-white/50 mb-4">
                      What this fee covers
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {pricing.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check size={15} className="text-accent shrink-0 mt-[3px]" />
                          <span className="text-sm text-white/90 leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-white text-sm font-heading font-bold hover:bg-accent-dark transition-colors shadow-sm"
                    >
                      Get Started at {formatINR(pricing.price)}
                      <ArrowRight size={15} />
                    </Link>
                    <a
                      href="tel:+919953719111"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/25 text-white text-sm font-heading font-semibold hover:bg-white/10 transition-colors"
                    >
                      <Phone size={15} />
                      Talk to a CA
                    </a>
                  </div>

                  <p className="mt-4 flex items-center gap-2 text-xs text-white/50">
                    <ShieldCheck size={13} className="shrink-0" />
                    One fee, no packages — every government fee is itemised before you pay.
                  </p>
                </div>
              </div>

              {/* ── Cost breakdown ── */}
              <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white shadow-card overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
                  <h3 className="font-heading font-bold text-dark text-sm">
                    What it actually costs
                  </h3>
                </div>
                <dl className="divide-y divide-slate-100">
                  {pricing.breakdown.map((row) => (
                    <div key={row.label} className="px-6 py-3 flex items-start justify-between gap-4">
                      <dt className="text-[13px] text-muted leading-snug">
                        {row.label}
                        {row.note && (
                          <span className="block text-[11px] text-slate-400 mt-0.5">{row.note}</span>
                        )}
                      </dt>
                      <dd className="text-[13px] font-heading font-bold text-dark whitespace-nowrap shrink-0">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                {pricing.typicalTotal && (
                  <div className="px-6 py-4 bg-primary/5 border-t border-slate-100">
                    <p className="text-[13px] font-heading font-semibold text-primary leading-snug">
                      {pricing.typicalTotal}
                    </p>
                  </div>
                )}
                {pricing.disclaimer && (
                  <p className="px-6 py-3 text-[11px] text-slate-400 leading-relaxed border-t border-slate-100 flex gap-2">
                    <Info size={12} className="shrink-0 mt-0.5" />
                    <span>{pricing.disclaimer}</span>
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── Calculator shortcuts ── */}
        {tools.length > 0 && (
          <div className={pricing ? "mt-10 md:mt-14" : ""}>
            <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[11px] font-heading font-semibold tracking-widest uppercase text-accent mb-2">
                  <span className="w-6 h-px bg-accent" />
                  Free Tools
                </span>
                <h3 className="font-heading font-bold text-dark text-xl sm:text-2xl mb-1.5">
                  {pricing
                    ? "Check your price before you commit"
                    : "Plan your costs before you start"}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Your exact cost depends on your state, capital and structure. Run the
                  numbers yourself — free, instant, no signup.
                </p>
              </div>
              <Link
                href="/calculators"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-primary hover:text-accent transition-colors"
              >
                All calculators <ArrowRight size={14} />
              </Link>
            </div>

            {/* Column count tracks the card count so a short row never leaves a gap. */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${
                tools.length >= 4
                  ? "lg:grid-cols-4"
                  : tools.length === 3
                    ? "lg:grid-cols-3"
                    : "lg:grid-cols-2"
              }`}
            >
              {tools.map((tool) => {
                const Icon = ICONS[tool.icon];
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 hover:border-primary/25 shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 transition-colors duration-300 group-hover:text-white ${TONES[tool.tone]}`}
                    >
                      <Icon size={19} />
                    </div>
                    <p className="font-heading font-bold text-sm text-dark mb-1.5 leading-snug group-hover:text-primary transition-colors">
                      {tool.title}
                    </p>
                    <p className="text-xs text-muted leading-relaxed flex-1">{tool.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-heading font-bold text-primary group-hover:gap-2.5 transition-all">
                      {tool.cta}
                      <ArrowUpRight size={13} />
                    </span>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/calculators"
              className="sm:hidden mt-4 inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-primary"
            >
              All calculators <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
