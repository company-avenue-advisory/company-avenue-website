"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, CornerDownLeft } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

type Item = { label: string; href: string; category: string };

// Flatten the mega-menu into a searchable index of every service & tool.
function buildIndex(): Item[] {
  const out: Item[] = [];
  const seen = new Set<string>();
  for (const link of NAV_LINKS as unknown as {
    label: string;
    children?: { group: string; items: { label: string; href: string }[] }[];
  }[]) {
    if (!link.children) continue;
    for (const group of link.children) {
      for (const it of group.items) {
        if (seen.has(it.href)) continue;
        seen.add(it.href);
        out.push({ label: it.label, href: it.href, category: link.label });
      }
    }
  }
  return out;
}

const ROTATING = [
  "Private Limited Company",
  "GST Registration",
  "Trademark Registration",
  "Income Tax Filing",
  "MSME / Udyam",
  "ROC Annual Filing",
];

const QUICK_CHIPS: { label: string; href: string }[] = [
  { label: "Company Registration", href: "/services/private-limited-company" },
  { label: "GST Registration", href: "/services/gst-registration" },
  { label: "Trademark Registration", href: "/services/trademark-registration" },
  { label: "ITR Filing", href: "/services/income-tax-return" },
  { label: "Talk to an Expert", href: "/contact" },
];

export function HeroSearch() {
  const router = useRouter();
  const index = useMemo(buildIndex, []);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Rotating placeholder
  useEffect(() => {
    if (query) return;
    const t = setInterval(() => setPlaceholderIdx((i) => (i + 1) % ROTATING.length), 2400);
    return () => clearInterval(t);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored = index
      .map((it) => {
        const l = it.label.toLowerCase();
        let score = 0;
        if (l === q) score = 100;
        else if (l.startsWith(q)) score = 80;
        else if (l.includes(q)) score = 60;
        else if (q.split(" ").every((w) => l.includes(w))) score = 40;
        return { it, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7)
      .map((x) => x.it);
    return scored;
  }, [query, index]);

  useEffect(() => setActive(0), [results.length, query]);

  function go(item?: Item) {
    const target = item ?? results[active];
    if (target) router.push(target.href);
    else if (query.trim()) router.push(`/services?q=${encodeURIComponent(query.trim())}`);
    else router.push("/services");
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) setOpen(true);
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(); }
    else if (e.key === "Escape") setOpen(false);
  }

  return (
    <div ref={wrapRef} className="relative w-full max-w-3xl mx-auto">
      {/* Search bar */}
      <div
        className="group relative flex items-center rounded-full transition-all"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: open
            ? "0 0 0 2px rgba(214,166,79,0.55), 0 20px 50px rgba(3,12,28,0.4)"
            : "0 8px 32px rgba(3,12,28,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <Search size={18} className="absolute left-4 sm:left-5 text-white/60" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          aria-label="Search services"
          placeholder={`Search "${ROTATING[placeholderIdx]}"`}
          className="w-full bg-transparent pl-11 sm:pl-14 pr-16 sm:pr-32 py-3 sm:py-4 text-sm sm:text-base md:text-[17px] text-white placeholder:text-white/50 font-body rounded-full focus:outline-none truncate"
        />
        <button
          onClick={() => go()}
          className="absolute right-1.5 sm:right-2 inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-heading font-semibold text-sm text-white transition-all hover:brightness-110"
          style={{ background: "linear-gradient(135deg, #1565a8 0%, #0F2D52 100%)", boxShadow: "0 4px 16px rgba(21,101,168,0.4)" }}
        >
          <Search size={15} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.14 }}
            className="absolute left-0 right-0 mt-2 rounded-2xl bg-white border border-slate-100 shadow-[0_20px_60px_rgba(3,12,28,0.35)] overflow-hidden z-30 text-left"
          >
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((r, i) => (
                  <button
                    key={r.href}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      active === i ? "bg-primary/5" : ""
                    }`}
                  >
                    <span className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <Search size={14} className="text-primary/60" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-heading font-semibold text-dark truncate">{r.label}</span>
                      <span className="block text-[11px] text-muted">{r.category}</span>
                    </span>
                    {active === i && <CornerDownLeft size={13} className="text-accent shrink-0" />}
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-5 text-sm text-muted">
                No match for “{query}”.{" "}
                <Link href="/contact" className="text-primary font-heading font-semibold hover:underline">
                  Ask an expert →
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick chips */}
      <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {QUICK_CHIPS.map((chip) => (
          <Link
            key={chip.label}
            href={chip.href}
            className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-[13px] font-heading font-medium transition-all"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "rgba(226,236,252,0.9)",
            }}
          >
            {chip.label}
            <ArrowRight size={12} className="text-accent opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}
