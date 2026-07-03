"use client";
import { useState } from "react";
import { Search, ExternalLink, Tag } from "lucide-react";
import { findMatchingClasses, type TrademarkClass } from "@/lib/trademark-classes";

export function TrademarkClassFinder() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<TrademarkClass[] | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMatches(findMatchingClasses(query));
  }

  const ipIndiaSearchUrl = `https://tmrsearch.ipindia.gov.in/tmrpublicsearch/`;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your business — e.g. 'organic skincare brand' or 'food delivery app'"
          className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-heading font-semibold rounded-xl hover:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Search size={16} />
          Find Classes
        </button>
      </form>

      {matches && (
        <div className="mt-6">
          {matches.length === 0 ? (
            <p className="text-muted text-sm">
              No close match found. Try a simpler description (e.g. &ldquo;clothing&rdquo;, &ldquo;software&rdquo;, &ldquo;restaurant&rdquo;),
              or browse the{" "}
              <a href={ipIndiaSearchUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-medium underline">
                full NICE classification
              </a>.
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-[11px] font-heading font-semibold uppercase tracking-wide text-muted">
                Likely Classes for Your Business
              </p>
              {matches.map((cls) => (
                <div key={cls.number} className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:border-primary/20 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-heading font-bold text-sm shrink-0">
                    {cls.number}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-dark text-sm flex items-center gap-2">
                      Class {cls.number} — {cls.title}
                      <span className="text-[10px] font-medium text-muted bg-slate-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Tag size={9} /> {cls.type}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-primary/5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-muted leading-relaxed">
              This is an indicative starting point, not a legal opinion. Before filing, check if
              your exact name is already registered in these classes.
            </p>
            <a
              href={ipIndiaSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
            >
              Check Name on IP India
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
