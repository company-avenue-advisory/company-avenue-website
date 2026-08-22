"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Mail, FileCheck, Lock, FileText, Landmark, UserPlus, CalendarClock,
  Handshake, Briefcase, Users, Receipt, FileSpreadsheet, Search,
  ArrowRight, FileType2,
} from "lucide-react";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/templates";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Mail, FileCheck, Lock, FileText, Landmark, UserPlus, CalendarClock,
  Handshake, Briefcase, Users, Receipt, FileSpreadsheet,
};

const FILTERS = ["All", ...TEMPLATE_CATEGORIES];

export function TemplatesClient() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      const matchCat = filter === "All" || t.category === filter;
      const matchQ =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [filter, query]);

  return (
    <>
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
            placeholder="Search templates…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-dark placeholder-slate-400 focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-muted text-sm text-center py-16">
          No templates match your search. Try a different keyword or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => {
            const Icon = ICONS[t.icon] ?? FileText;
            return (
              <Link
                key={t.slug}
                href={`/templates/${t.slug}`}
                className="group text-left bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white ${t.accent}`}>
                    <Icon size={22} />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-heading font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                    <FileType2 size={11} /> {t.format}
                  </span>
                </div>
                <span className="text-[11px] font-heading font-semibold text-accent uppercase tracking-wider mb-1.5">
                  {t.category}
                </span>
                <h3 className="font-heading font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                  {t.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{t.description}</p>
                <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold pt-3 border-t border-slate-50">
                  Preview &amp; download
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1 text-accent" />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 p-5 bg-white rounded-2xl border border-slate-100 shadow-card max-w-3xl mx-auto text-center">
        <p className="text-xs text-muted leading-relaxed">
          <strong className="text-dark">Disclaimer:</strong> These templates are general drafts
          provided for convenience and do not constitute legal advice. Replace all
          [BRACKETED] placeholders and have important contracts reviewed by a qualified
          CA/CS or lawyer before signing. Company Avenue Advisory accepts no liability for
          their use as-is.
        </p>
      </div>

    </>
  );
}

