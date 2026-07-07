"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  IndianRupee, FileText, Receipt, FolderOpen, Coins, Stamp, MapPin,
  CalendarCheck, Search, ExternalLink, X,
} from "lucide-react";
import { RESOURCE_SECTIONS, type ResourceSection, type ResTable } from "@/lib/resources";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  IndianRupee, FileText, Receipt, FolderOpen, Coins, Stamp, MapPin, CalendarCheck,
};

function rowMatches(row: string[], q: string) {
  return row.some((c) => c.toLowerCase().includes(q));
}

export function ResourcesClient() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(RESOURCE_SECTIONS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const q = query.trim().toLowerCase();

  // Build filtered view: keep only sections/tables/rows that match the query.
  const view = useMemo(() => {
    if (!q) return RESOURCE_SECTIONS;
    return RESOURCE_SECTIONS.map((s) => {
      const titleHit = s.title.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q);
      const tables = s.tables
        .map((t) => {
          if (titleHit) return t;
          const rows = t.rows.filter((r) => rowMatches(r, q));
          return rows.length ? { ...t, rows } : null;
        })
        .filter(Boolean) as ResTable[];
      if (titleHit) return s;
      return tables.length ? { ...s, tables, chips: undefined } : null;
    }).filter(Boolean) as ResourceSection[];
  }, [q]);

  // Scrollspy — highlight the nav item for the section in view.
  useEffect(() => {
    if (q) return; // no scrollspy while filtering
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    RESOURCE_SECTIONS.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [q]);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
      {/* ── Sticky side nav ── */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-3 px-3">
            Jump to
          </p>
          <nav className="space-y-1">
            {RESOURCE_SECTIONS.map((s) => {
              const Icon = ICONS[s.icon] ?? FileText;
              const isActive = active === s.id && !q;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-heading font-medium transition-all text-left ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-primary/8 hover:text-primary"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-white" : "text-accent"} />
                  <span className="leading-snug">{s.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ── Content ── */}
      <div className="min-w-0">
        {/* Search */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rates, sections, due dates… e.g. '194J', 'GSTR-3B', 'stamp duty'"
            className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm text-dark placeholder-slate-400 shadow-card focus:outline-none focus:border-primary/40 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X size={14} className="text-slate-500" />
            </button>
          )}
        </div>

        {/* Mobile section chips */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4">
          {RESOURCE_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-heading font-medium bg-white border border-slate-200 text-muted hover:border-primary hover:text-primary transition-colors"
            >
              {s.title}
            </button>
          ))}
        </div>

        {view.length === 0 ? (
          <p className="text-muted text-sm text-center py-16">
            Nothing matched &ldquo;{query}&rdquo;. Try a section name, section code (194J) or form (GSTR-1).
          </p>
        ) : (
          <div className="space-y-14">
            {view.map((s) => (
              <SectionBlock
                key={s.id}
                section={s}
                query={q}
                setRef={(el) => { sectionRefs.current[s.id] = el; }}
              />
            ))}
          </div>
        )}

        {/* Global disclaimer */}
        <div className="mt-14 p-5 bg-white rounded-2xl border border-slate-100 shadow-card">
          <p className="text-xs text-muted leading-relaxed">
            <strong className="text-dark">Disclaimer:</strong> All figures on this page are
            indicative and compiled from official sources on the review dates shown. Tax rates,
            thresholds, government fees and due dates change with each Budget and government
            notification. Always confirm on the linked official portal and consult a qualified
            CA/CS before acting. Company Avenue Advisory is not liable for decisions made solely
            on this reference data.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── One section ── */
function SectionBlock({
  section,
  query,
  setRef,
}: {
  section: ResourceSection;
  query: string;
  setRef: (el: HTMLElement | null) => void;
}) {
  const Icon = ICONS[section.icon] ?? FileText;
  return (
    <section id={section.id} ref={setRef} className="scroll-mt-24">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${section.accent}`}>
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="font-heading font-bold text-dark text-xl">{section.title}</h2>
            <span className="text-[10px] font-heading font-semibold text-muted bg-slate-100 px-2 py-0.5 rounded-full">
              Updated {section.updated}
            </span>
          </div>
          <p className="text-muted text-sm mt-0.5">{section.tagline}</p>
        </div>
        <a
          href={section.source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-heading font-medium text-primary bg-primary/5 border border-primary/10 hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          {section.source.label}
          <ExternalLink size={11} />
        </a>
      </div>

      {section.intro && (
        <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-3xl">{section.intro}</p>
      )}

      {/* Highlight chips */}
      {section.chips && section.chips.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {section.chips.map((c) => (
            <div key={c.label} className="bg-white rounded-2xl border border-slate-100 shadow-card p-4">
              <p className="text-[10px] font-heading font-semibold text-muted uppercase tracking-wide mb-1.5 leading-tight">
                {c.label}
              </p>
              <p className="text-lg font-heading font-bold text-primary leading-none">{c.value}</p>
              {c.sub && <p className="text-[11px] text-muted mt-1">{c.sub}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Tables */}
      <div className="space-y-6">
        {section.tables.map((t, i) => (
          <DataTable key={i} table={t} query={query} />
        ))}
      </div>
    </section>
  );
}

/* ── Styled table ── */
function DataTable({ table, query }: { table: ResTable; query: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
      {table.caption && (
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <h3 className="font-heading font-semibold text-dark text-sm">{table.caption}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-primary/[0.04]">
              {table.columns.map((col, ci) => (
                <th
                  key={ci}
                  className={`text-left font-heading font-semibold text-[11px] uppercase tracking-wide text-muted px-5 py-3 whitespace-nowrap ${
                    ci === table.highlightCol ? "text-primary" : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-t border-slate-50 hover:bg-primary/[0.02] transition-colors"
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-5 py-3 align-top leading-snug ${
                      ci === table.highlightCol
                        ? "font-heading font-bold text-primary whitespace-nowrap"
                        : ci === 0
                        ? "font-medium text-dark"
                        : "text-slate-600"
                    }`}
                  >
                    {query ? <Highlight text={cell} query={query} /> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/40">
          <p className="text-[11px] text-muted leading-relaxed">{table.note}</p>
        </div>
      )}
    </div>
  );
}

/* highlight matched substring in filtered results */
function Highlight({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent/25 text-inherit rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}
