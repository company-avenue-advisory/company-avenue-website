import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   WS-5.5 — breaking the tools silo.

   The verification tools and calculators are the site's highest-traffic pages
   and had no route into a commercial service page: a visitor checked a GSTIN,
   got their answer and left. This block gives every tool a contextual link
   into the service the tool implies plus a clear next step, so the free tool
   becomes the top of a funnel rather than a dead end.

   Each tool passes its OWN service links. A generic "see all services" link
   would defeat the point — the value is in the specificity ("you just looked
   up a GSTIN, here is GST registration and here is GST return filing").
───────────────────────────────────────────────────────────────────────────── */

export interface ToolNextStepProps {
  /** One-line framing of why these services follow from using the tool. */
  intro: string;
  /** Two or three contextual service links. Keep it to the genuinely relevant. */
  services: { label: string; href: string; desc: string }[];
  /** Primary CTA label. Defaults to a consultation. */
  ctaLabel?: string;
  ctaHref?: string;
}

export function ToolNextStep({
  intro,
  services,
  ctaLabel = "Talk to a Chartered Accountant",
  ctaHref = "/contact",
}: ToolNextStepProps) {
  return (
    <section className="mt-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8">
            <Sparkles size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-base font-bold text-dark">
              What to do next
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">{intro}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-xl border border-slate-100 bg-background p-4 transition-all hover:border-primary/25 hover:bg-white hover:shadow-sm"
            >
              <p className="font-heading text-sm font-semibold text-dark">
                {s.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{s.desc}</p>
              <span className="mt-2.5 inline-flex items-center gap-1 font-heading text-xs font-semibold text-primary">
                Learn more
                <ArrowRight
                  size={11}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            {ctaLabel}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
