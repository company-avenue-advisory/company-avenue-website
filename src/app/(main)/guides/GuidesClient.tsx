"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2, Receipt, Users, ShieldCheck, Award, Rocket, IndianRupee,
  Plane, TrendingUp, Search, ArrowRight, ArrowUpRight, Clock, BarChart3,
  ListChecks, BookOpen,
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

  return (
    <>
      {/* Featured */}
      {showFeatured && (
        <FeaturedGuide guide={featured} />
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
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
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
              </Link>
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

    </>
  );
}

/* ── Featured hero card ── */
function FeaturedGuide({ guide }: { guide: Guide }) {
  const Icon = ICONS[guide.icon] ?? BookOpen;
  return (
    <Link
      href={`/guides/${guide.slug}`}
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
    </Link>
  );
}
