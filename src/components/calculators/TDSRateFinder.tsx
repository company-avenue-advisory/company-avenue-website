"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

interface TDSEntry {
  type: string;
  category: string;
  section: string;
  rateIndividual: string;
  rateOthers: string;
  threshold: string;
  notes: string;
}

const TDS_DATA: TDSEntry[] = [
  { type: "Professional / Technical Fees", category: "Professional", section: "194J", rateIndividual: "10%", rateOthers: "10%", threshold: "₹30,000 p.a.", notes: "2% for technical services (non-professional); 10% for professional services." },
  { type: "Call Centre / Technical Services", category: "Professional", section: "194J", rateIndividual: "2%", rateOthers: "2%", threshold: "₹30,000 p.a.", notes: "2% rate for call centre and technical services only." },
  { type: "Salary", category: "Salary", section: "192", rateIndividual: "As per slab", rateOthers: "N/A", threshold: "Basic exemption limit", notes: "TDS is deducted at the applicable income tax slab rate. Form 16 issued by employer." },
  { type: "Contract Payment — Individual/HUF", category: "Contract", section: "194C", rateIndividual: "1%", rateOthers: "2%", threshold: "₹30,000 single / ₹1,00,000 aggregate", notes: "1% for Individual/HUF; 2% for Companies, firms, LLPs." },
  { type: "Rent — Land / Building / Furniture", category: "Rent", section: "194I(b)", rateIndividual: "10%", rateOthers: "10%", threshold: "₹2,40,000 p.a.", notes: "10% TDS on rent for land, building, or furniture." },
  { type: "Rent — Plant / Machinery / Equipment", category: "Rent", section: "194I(a)", rateIndividual: "2%", rateOthers: "2%", threshold: "₹2,40,000 p.a.", notes: "2% TDS on rent for plant, machinery, or equipment." },
  { type: "Commission / Brokerage", category: "Commission", section: "194H", rateIndividual: "5%", rateOthers: "5%", threshold: "₹15,000 p.a.", notes: "Includes commission on business transactions. Does not apply to insurance agents (194D)." },
  { type: "Interest — Bank / Co-op Society", category: "Interest", section: "194A", rateIndividual: "10%", rateOthers: "10%", threshold: "₹40,000 (₹50,000 for senior citizens)", notes: "10% on interest from banks/co-operative societies. Higher threshold for senior citizens." },
  { type: "Interest — Others (NBFCs, etc.)", category: "Interest", section: "194A", rateIndividual: "10%", rateOthers: "10%", threshold: "₹5,000 p.a.", notes: "10% on interest from non-banking sources." },
  { type: "Dividends", category: "Dividend", section: "194", rateIndividual: "10%", rateOthers: "10%", threshold: "₹5,000 p.a.", notes: "TDS applies on dividends paid by domestic companies to resident shareholders." },
  { type: "Lottery / Crossword / Game Winnings", category: "Winnings", section: "194B", rateIndividual: "30%", rateOthers: "30%", threshold: "₹10,000 per prize", notes: "Flat 30% TDS on winnings from lotteries, crosswords, races and games." },
  { type: "Insurance Commission", category: "Insurance", section: "194D", rateIndividual: "5%", rateOthers: "10%", threshold: "₹15,000 p.a.", notes: "5% for individuals; 10% for companies (domestic)." },
  { type: "Purchase of Immovable Property", category: "Property", section: "194IA", rateIndividual: "1%", rateOthers: "1%", threshold: "₹50,00,000", notes: "Buyer deducts 1% TDS while purchasing property exceeding ₹50 lakhs." },
  { type: "Purchase of Goods", category: "Purchase", section: "194Q", rateIndividual: "0.1%", rateOthers: "0.1%", threshold: "₹50,00,000 p.a. per seller", notes: "Applies when total purchases from a seller exceed ₹50L in a year. Buyer to deduct 0.1%." },
  { type: "E-Commerce Participants", category: "E-Commerce", section: "194O", rateIndividual: "1%", rateOthers: "1%", threshold: "₹5,00,000 p.a.", notes: "E-commerce operators deduct 1% from payment to participants." },
  { type: "Payment to Non-Resident (DTAA applicable)", category: "Non-Resident", section: "195", rateIndividual: "As per treaty / 20%", rateOthers: "As per treaty / 20%", threshold: "No threshold", notes: "Varies by nature of payment and DTAA. Certificate from CA (Form 15CA/CB) usually required." },
  { type: "Winnings from Online Games", category: "Winnings", section: "194BA", rateIndividual: "30%", rateOthers: "30%", threshold: "Net winnings", notes: "30% TDS on net winnings from online gaming platforms (w.e.f. April 2023)." },
  { type: "TDS on Rent (>₹50K/month, Individual)", category: "Rent", section: "194IB", rateIndividual: "5%", rateOthers: "N/A", threshold: "₹50,000 per month", notes: "Applicable to individuals / HUFs not subject to audit paying rent above ₹50,000/month." },
];

const CATEGORIES = ["All", ...Array.from(new Set(TDS_DATA.map((d) => d.category)))];

export function TDSRateFinder() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<TDSEntry | null>(null);

  const filtered = TDS_DATA.filter((d) => {
    const matchCat = category === "All" || d.category === category;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      d.type.toLowerCase().includes(q) ||
      d.section.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Search & Filter Panel */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search payment type or section..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-dark transition-all"
            />
          </div>

          {/* Category filter */}
          <div>
            <p className="text-[10px] font-heading font-bold text-muted uppercase tracking-widest mb-2">
              Filter by Category
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold transition-all ${
                    category === cat
                      ? "bg-primary text-white"
                      : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
          <div className="p-3 border-b border-slate-100">
            <p className="text-xs text-muted font-body">
              {filtered.length} payment type{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-muted text-sm">No results found</div>
            ) : (
              filtered.map((entry) => (
                <button
                  key={entry.section + entry.type}
                  onClick={() => setSelected(entry)}
                  className={`w-full text-left px-4 py-3 transition-colors hover:bg-primary/5 ${
                    selected?.type === entry.type && selected?.section === entry.section
                      ? "bg-primary/8 border-l-2 border-primary"
                      : ""
                  }`}
                >
                  <p className="text-sm font-heading font-semibold text-dark leading-snug">
                    {entry.type}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-heading font-bold text-primary bg-primary/8 px-2 py-0.5 rounded-md">
                      Sec {entry.section}
                    </span>
                    <span className="text-xs text-muted font-body">{entry.rateIndividual}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="lg:col-span-3">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-card p-8 flex flex-col items-center justify-center text-center min-h-[400px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/6 flex items-center justify-center mb-4">
                <FileText size={28} className="text-primary/30" />
              </div>
              <p className="text-slate-500 font-heading font-medium text-sm">
                Select a payment type from the list
              </p>
              <p className="text-slate-400 text-xs mt-1">TDS rates and details will appear here</p>
            </motion.div>
          ) : (
            <motion.div
              key={selected.type}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5"
            >
              <div>
                <span className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest">
                  {selected.category}
                </span>
                <h3 className="font-heading font-bold text-dark text-xl mt-1 leading-snug">
                  {selected.type}
                </h3>
              </div>

              {/* Rate cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary rounded-2xl p-4 text-center">
                  <p className="text-white/60 text-xs font-heading font-medium mb-1">
                    Individual / HUF
                  </p>
                  <p className="text-white font-heading font-bold text-3xl">
                    {selected.rateIndividual}
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <p className="text-muted text-xs font-heading font-medium mb-1">
                    Company / Others
                  </p>
                  <p className="text-dark font-heading font-bold text-3xl">
                    {selected.rateOthers}
                  </p>
                </div>
              </div>

              {/* Details grid */}
              <div className="space-y-3">
                <DetailRow label="Section" value={`Section ${selected.section}`} />
                <DetailRow label="Threshold Limit" value={selected.threshold} />
              </div>

              {/* Notes */}
              <div className="flex gap-2.5 p-4 bg-accent/6 rounded-xl border border-accent/10">
                <Info size={14} className="text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 leading-relaxed">{selected.notes}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-muted leading-relaxed">
                  <strong className="text-dark">Rate at lower slab / no PAN:</strong> If deductee
                  does not furnish PAN, TDS is deducted at 20% or the applicable rate, whichever
                  is higher.
                </p>
              </div>

              <Link
                href="/services/tds-return"
                className="flex items-center justify-between w-full px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors group"
              >
                <span className="text-sm font-heading font-semibold text-primary">
                  File TDS Returns with our experts
                </span>
                <ArrowRight
                  size={14}
                  className="text-accent group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-slate-100">
      <span className="text-sm text-muted font-body shrink-0">{label}</span>
      <span className="text-sm font-heading font-semibold text-dark text-right">{value}</span>
    </div>
  );
}
