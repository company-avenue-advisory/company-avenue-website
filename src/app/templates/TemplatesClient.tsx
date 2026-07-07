"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail, FileCheck, Lock, FileText, Landmark, UserPlus, CalendarClock,
  Handshake, Briefcase, Users, Receipt, FileSpreadsheet, Search, X,
  Copy, Check, Download, ArrowRight, FileType2, PenLine,
} from "lucide-react";
import { TEMPLATES, TEMPLATE_CATEGORIES, type Template } from "@/lib/templates";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Mail, FileCheck, Lock, FileText, Landmark, UserPlus, CalendarClock,
  Handshake, Briefcase, Users, Receipt, FileSpreadsheet,
};

const FILTERS = ["All", ...TEMPLATE_CATEGORIES];

export function TemplatesClient() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Template | null>(null);

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
              <button
                key={t.slug}
                onClick={() => setOpen(t)}
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
              </button>
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

      <AnimatePresence>
        {open && <TemplatePreview template={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}

/* ── Preview + actions modal ── */
function TemplatePreview({ template, onClose }: { template: Template; onClose: () => void }) {
  const Icon = ICONS[template.icon] ?? FileText;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleDownload = () => {
    // Wrap the plaintext body in a minimal Word-compatible HTML document so it
    // opens cleanly in MS Word / Google Docs as an editable .doc file.
    const html = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${template.title}</title></head><body><pre style="font-family:Calibri,Arial,sans-serif;font-size:11pt;white-space:pre-wrap;">${template.body
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</pre></body></html>`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.slug}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9997] bg-dark/60 backdrop-blur-sm flex items-start md:items-center justify-center p-0 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative bg-background w-full max-w-3xl h-full md:h-auto md:max-h-[90vh] overflow-hidden md:rounded-3xl shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="relative bg-white border-b border-slate-100 p-5 md:p-6 flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${template.accent}`}>
            <Icon size={22} />
          </div>
          <div className="flex-1 min-w-0 pr-8">
            <span className="text-[11px] font-heading font-semibold text-accent uppercase tracking-wider">
              {template.category}
            </span>
            <h2 className="font-heading font-bold text-dark text-lg leading-snug">{template.title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-dark" />
          </button>
        </div>

        {/* Fields to fill */}
        {template.fields.length > 0 && (
          <div className="px-5 md:px-6 py-3 bg-accent/[0.05] border-b border-accent/10">
            <div className="flex items-start gap-2">
              <PenLine size={14} className="text-accent mt-0.5 shrink-0" />
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs text-slate-600 font-medium mr-1">You&rsquo;ll fill:</span>
                {template.fields.map((f) => (
                  <span key={f} className="text-[11px] font-body text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Document preview */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-100/70">
          <pre className="bg-white rounded-xl shadow-card border border-slate-200 p-6 md:p-10 whitespace-pre-wrap font-body text-[13px] leading-relaxed text-slate-700 max-w-2xl mx-auto">
            {template.body}
          </pre>
        </div>

        {/* Actions */}
        <div className="border-t border-slate-100 bg-white p-4 md:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex gap-3 flex-1">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 text-slate-700 text-sm font-heading font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors"
            >
              {copied ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
              {copied ? "Copied!" : "Copy text"}
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-800 text-white text-sm font-heading font-semibold rounded-xl transition-colors"
            >
              <Download size={15} /> Download (.doc)
            </button>
          </div>
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent/10 text-accent-dark hover:bg-accent/20 text-sm font-heading font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            Get it customised by a CA <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
