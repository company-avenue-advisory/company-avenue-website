"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2, Receipt, Users, ShieldCheck, Award, Rocket, IndianRupee,
  Plane, TrendingUp, Search, X, ArrowRight, ArrowUpRight, Clock, BarChart3,
  ListChecks, FileText, Lightbulb, ExternalLink, CheckCircle2, HelpCircle,
  BookOpen,
} from "lucide-react";
import { GUIDES, GUIDE_CATEGORIES, type Guide } from "@/lib/guides";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2, Receipt, Users, ShieldCheck, Award, Rocket, IndianRupee, Plane, TrendingUp,
};

const DIFFICULTY_STYLE: Record<Guide["difficulty"], string> = {
  Beginner: "text-green-700 bg-green-50 border-green-100",
  Intermediate: "text-amber-700 bg-amber-50 border-amber-100",
  Advanced: "text-rose-700 bg-rose-50 border-rose-100",
};

const FILTERS = ["All", ...GUIDE_CATEGORIES];

export function GuidesClient() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Guide | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GUIDES.filter((g) => {
      const matchCat = filter === "All" || g.category === filter;
      const matchQ =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [filter, query]);

  const [featured, ...restAll] = GUIDES;
  const showFeatured = filter === "All" && query.trim() === "";
  const cards = showFeatured ? restAll : filtered;

  // Lock scroll while modal open (site uses Lenis — stop it too)
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Featured */}
      {showFeatured && (
        <FeaturedGuide guide={featured} onOpen={() => setOpen(featured)} />
      )}

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
        <div className="flex flex-wrap gap-2 flex-1">
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-heading font-medium transition-colors ${
                filter === cat
                  ? "bg-primary text-white"
                  : "bg-white border border-slate-200 text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative lg:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-dark placeholder-slate-400 focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      {cards.length === 0 ? (
        <p className="text-muted text-sm text-center py-16">
          No guides match your search. Try a different keyword or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((g) => {
            const Icon = ICONS[g.icon] ?? BookOpen;
            return (
              <button
                key={g.slug}
                onClick={() => setOpen(g)}
                className="group text-left bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white ${g.accent}`}>
                    <Icon size={22} />
                  </div>
                  <span className={`text-[10px] font-heading font-bold px-2.5 py-1 rounded-full border ${DIFFICULTY_STYLE[g.difficulty]}`}>
                    {g.difficulty}
                  </span>
                </div>
                <span className="text-[11px] font-heading font-semibold text-accent uppercase tracking-wider mb-1.5">
                  {g.category}
                </span>
                <h3 className="font-heading font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                  {g.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{g.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <span className="flex items-center gap-3 text-muted text-xs">
                    <span className="flex items-center gap-1"><Clock size={11} /> {g.readTime}</span>
                    <span className="flex items-center gap-1"><ListChecks size={11} /> {g.steps.length} steps</span>
                  </span>
                  <span className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                    Read
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1 text-accent" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 p-5 bg-white rounded-2xl border border-slate-100 shadow-card max-w-3xl mx-auto text-center">
        <p className="text-xs text-muted leading-relaxed">
          <strong className="text-dark">Note:</strong> These guides are for general
          informational purposes and reflect rules as reviewed on each guide&rsquo;s update date.
          Government fees, thresholds and procedures change — always confirm on the linked official
          portal before filing, and consult a qualified CA/CS for advice specific to your situation.
        </p>
      </div>

      {/* Reading modal */}
      <AnimatePresence>
        {open && <GuideReader guide={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}

/* ── Featured hero card ── */
function FeaturedGuide({ guide, onOpen }: { guide: Guide; onOpen: () => void }) {
  const Icon = ICONS[guide.icon] ?? BookOpen;
  return (
    <button
      onClick={onOpen}
      className="group relative block w-full text-left rounded-3xl overflow-hidden mb-14 bg-gradient-to-br from-dark to-primary-900 p-8 md:p-12"
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
      />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/[0.08] pointer-events-none" />
      <div className="relative z-10 max-w-3xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-accent">
            <Icon size={20} />
          </div>
          <span className="text-accent text-xs font-heading font-semibold uppercase tracking-widest">
            Featured Guide · {guide.category}
          </span>
        </div>
        <h2 className="font-heading font-bold text-2xl md:text-4xl text-white mb-3 leading-tight">
          {guide.title}
        </h2>
        <p className="text-white/55 text-sm md:text-base max-w-xl mb-6 leading-relaxed">
          {guide.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/40 text-xs mb-6">
          <span className="flex items-center gap-1.5"><Clock size={12} /> {guide.readTime}</span>
          <span className="flex items-center gap-1.5"><ListChecks size={12} /> {guide.steps.length} steps</span>
          <span className="flex items-center gap-1.5"><BarChart3 size={12} /> {guide.difficulty}</span>
        </div>
        <span className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-heading font-semibold rounded-xl group-hover:bg-accent-dark transition-colors">
          Read the guide
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent transition-colors">
        <ArrowUpRight size={18} className="text-white" />
      </div>
    </button>
  );
}

/* ── Full reading modal ── */
function GuideReader({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  const Icon = ICONS[guide.icon] ?? BookOpen;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9997] bg-dark/60 backdrop-blur-sm flex items-start md:items-center justify-center p-0 md:p-8"
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative bg-background w-full max-w-3xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto md:rounded-3xl shadow-2xl"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-dark to-primary-900 p-6 md:p-10 sticky top-0 z-10">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-accent shrink-0">
              <Icon size={20} />
            </div>
            <div>
              <span className="text-accent text-[11px] font-heading font-semibold uppercase tracking-widest block">
                {guide.category}
              </span>
              <div className="flex items-center gap-3 text-white/40 text-xs mt-0.5">
                <span className="flex items-center gap-1"><Clock size={11} /> {guide.readTime}</span>
                <span>·</span>
                <span>{guide.difficulty}</span>
                <span>·</span>
                <span>Updated {guide.updated}</span>
              </div>
            </div>
          </div>
          <h1 className="font-heading font-bold text-xl md:text-3xl text-white leading-tight pr-8">
            {guide.title}
          </h1>
        </div>

        <div className="p-6 md:p-10">
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

          {/* Intro */}
          <p className="text-slate-600 text-[15px] leading-relaxed mb-8">{guide.intro}</p>

          {/* Steps timeline */}
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
                    <p className="font-heading font-semibold text-dark text-sm mb-1.5">{f.q}</p>
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
                onClick={onClose}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white text-sm font-heading font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                {guide.relatedService.label}
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

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
