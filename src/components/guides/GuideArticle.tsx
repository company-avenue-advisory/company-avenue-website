import Link from "next/link";
import {
  Building2, Receipt, Users, ShieldCheck, Award, Rocket, IndianRupee,
  Plane, TrendingUp, ArrowRight, Clock, BarChart3, ListChecks, FileText,
  Lightbulb, ExternalLink, CheckCircle2, HelpCircle, BookOpen,
} from "lucide-react";
import type { Guide } from "@/lib/guides";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2, Receipt, Users, ShieldCheck, Award, Rocket, IndianRupee, Plane, TrendingUp,
};

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-8 h-8 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </span>
      <h2 className="font-heading font-bold text-dark text-base">{title}</h2>
    </div>
  );
}

/**
 * Server-rendered guide body. Shared shape with the old modal reader, minus the
 * overlay chrome — this is what makes guide content crawlable at /guides/{slug}.
 */
export function GuideArticle({ guide }: { guide: Guide }) {
  const Icon = ICONS[guide.icon] ?? BookOpen;

  return (
    <article>
      {/* Header */}
      <header className="relative bg-gradient-to-br from-dark to-primary-900 pt-32 pb-12">
        <div className="container-custom max-w-3xl">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent text-xs font-heading font-semibold mb-6 transition-colors"
          >
            ← All Guides
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-accent shrink-0">
              <Icon size={20} />
            </div>
            <div>
              <span className="text-accent text-[11px] font-heading font-semibold uppercase tracking-widest block">
                {guide.category}
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/40 text-xs mt-0.5">
                <span className="flex items-center gap-1"><Clock size={11} /> {guide.readTime}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><BarChart3 size={11} /> {guide.difficulty}</span>
                <span>·</span>
                <span>Updated {guide.updated}</span>
              </div>
            </div>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-4xl text-white leading-tight mb-3">
            {guide.title}
          </h1>
          <p className="text-white/55 text-sm md:text-base leading-relaxed">{guide.excerpt}</p>
        </div>
      </header>

      <div className="py-12 bg-background">
        <div className="container-custom max-w-3xl">
          {/* Key facts strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {guide.keyFacts.map((f) => (
              <div key={f.label} className="bg-white rounded-xl border border-slate-100 p-3.5 shadow-card">
                <p className="text-[10px] font-heading font-semibold text-muted uppercase tracking-wide mb-1">
                  {f.label}
                </p>
                <p className="text-sm font-heading font-bold text-dark leading-snug">{f.value}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-600 text-[15px] leading-relaxed mb-8">{guide.intro}</p>

          {/* Steps */}
          <SectionTitle icon={<ListChecks size={15} />} title="Step-by-step process" />
          <ol className="relative border-l-2 border-slate-200 ml-3 mb-8 space-y-6">
            {guide.steps.map((s, i) => (
              <li key={i} className="relative pl-7">
                <span className="absolute -left-[15px] top-0 w-7 h-7 rounded-full bg-primary text-white text-xs font-heading font-bold flex items-center justify-center shadow-sm">
                  {i + 1}
                </span>
                <h3 className="font-heading font-semibold text-dark text-[15px] mb-1 leading-snug">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.detail}</p>
              </li>
            ))}
          </ol>

          {/* Documents */}
          {guide.documents && guide.documents.length > 0 && (
            <div className="mb-8">
              <SectionTitle icon={<FileText size={15} />} title="Documents required" />
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {guide.documents.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600 leading-snug">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {guide.tips && guide.tips.length > 0 && (
            <div className="mb-8">
              <SectionTitle icon={<Lightbulb size={15} />} title="Expert tips" />
              <div className="space-y-2.5">
                {guide.tips.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 bg-accent/[0.06] border border-accent/15 rounded-xl p-3.5">
                    <Lightbulb size={16} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {guide.faqs && guide.faqs.length > 0 && (
            <div className="mb-8">
              <SectionTitle icon={<HelpCircle size={15} />} title="Frequently asked" />
              <div className="space-y-3">
                {guide.faqs.map((f, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-card p-4">
                    <h3 className="font-heading font-semibold text-dark text-sm mb-1.5">{f.q}</h3>
                    <p className="text-muted text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          <div className="mb-8">
            <SectionTitle icon={<ExternalLink size={15} />} title="Official sources" />
            <div className="flex flex-wrap gap-2">
              {guide.sources.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-medium text-primary bg-primary/5 border border-primary/10 hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors"
                >
                  {s.label}
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          </div>

          {/* Related service CTA */}
          {guide.relatedService && (
            <div className="rounded-2xl bg-gradient-to-br from-dark to-primary-900 p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <p className="text-white font-heading font-bold text-base mb-1">
                  Want us to handle it for you?
                </p>
                <p className="text-white/50 text-sm">
                  Our CA/CS team can complete this end-to-end — accurately and on time.
                </p>
              </div>
              <Link
                href={guide.relatedService.href}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white text-sm font-heading font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                {guide.relatedService.label}
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
