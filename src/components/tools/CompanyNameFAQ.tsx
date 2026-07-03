"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS: [string, string][] = [
  [
    "Is this company name search free?",
    "Yes. This tool is completely free to use, with no signup required, and queries real Ministry of Corporate Affairs (MCA) data via the government's own Open Government Data platform.",
  ],
  [
    "Does this check LLP names too?",
    "Yes — the tool automatically checks your proposed name against Private Limited, Limited, LLP and OPC Private Limited suffixes in a single search.",
  ],
  [
    "Is this the same as the official MCA name check?",
    "It uses the same underlying government dataset, but the official MCA RUN (Reserve Unique Name) service also checks phonetic similarity and trademark databases — something this free tool does not do. Always confirm with the official MCA check before filing.",
  ],
  [
    "Why does it check multiple name variants?",
    "Company names in India are registered with their full legal suffix (e.g. \"XYZ Private Limited\", not just \"XYZ\"). Since the government database only supports exact-match lookups, we automatically check the common suffix variants a founder would realistically register under.",
  ],
  [
    "What if my exact name isn't found?",
    "If none of the checked variants match an existing company, your name is likely available for MCA name reservation — but this doesn't guarantee approval, since MCA's Rule 8 also rejects names that are phonetically similar to existing companies or trademarks.",
  ],
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CompanyNameFAQ() {
  return (
    <div itemScope itemType="https://schema.org/FAQPage" className="space-y-3">
      <h2 className="font-heading font-bold text-dark text-2xl mb-4">Frequently Asked Questions</h2>
      {FAQS.map(([q, a]) => (
        <FAQItem key={q} q={q} a={a} />
      ))}
    </div>
  );
}
