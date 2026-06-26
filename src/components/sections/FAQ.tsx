"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COMPANY } from "@/lib/constants";

const faqs = [
  {
    q: "How long does Company Registration take?",
    a: "A Private Limited Company is typically incorporated in 7–10 business days after all documents are submitted. This includes DIN/DSC issuance, name approval and Certificate of Incorporation from the MCA.",
  },
  {
    q: "Which business structure should I choose?",
    a: "It depends on your business goals. A Pvt. Ltd. is ideal for startups seeking investment. An LLP works well for professional firms and service businesses. A Sole Proprietorship suits solo operators with lower compliance needs. We guide you through this during your free consultation.",
  },
  {
    q: "Is GST registration mandatory?",
    a: "GST is mandatory if your annual turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services). Inter-state suppliers and all e-commerce sellers must register regardless of turnover. Voluntary registration is also available and often beneficial.",
  },
  {
    q: "How much does Trademark Registration cost?",
    a: "Government fees start at ₹4,500 per class for individuals, startups and MSMEs and ₹9,000 per class for others. Our professional fees are transparent and provided upfront. We handle end-to-end filing, examination response and follow-up.",
  },
  {
    q: "Can the complete registration process be done online?",
    a: "Yes, 100%. Our process is fully digital — document collection, verification, application filing and certificate delivery are all done online. You never need to visit any government office or our office.",
  },
  {
    q: "Do you provide annual compliance services after registration?",
    a: "Absolutely. We offer annual compliance packages covering ROC filings, ITR, GST returns, TDS returns and more. Your dedicated relationship manager proactively reminds you of all statutory deadlines.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Left — 2 cols */}
          <div className="lg:col-span-2">
            <SectionHeader
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              subtitle="Quick, clear answers to the most common questions about our services and process."
              align="left"
              className="mb-8"
            />

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle size={18} className="text-primary" />
              </div>
              <p className="font-heading font-semibold text-dark text-sm mb-2">
                Still have questions?
              </p>
              <p className="text-muted text-sm leading-relaxed mb-5">
                Our experts are available Mon–Sat, 9 AM – 7 PM for a free 30-minute consultation.
              </p>
              <div className="space-y-2">
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-heading font-semibold text-primary hover:underline"
                >
                  Chat on WhatsApp →
                </a>
                <a
                  href="/contact"
                  className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
                >
                  Book a free consultation →
                </a>
              </div>
            </div>
          </div>

          {/* Right — 3 cols */}
          <div className="lg:col-span-3">
            {/* Schema-ready itemscope */}
            <div itemScope itemType="https://schema.org/FAQPage" className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-2xl"
                  >
                    <span
                      itemProp="name"
                      className="font-heading font-semibold text-dark text-sm leading-snug"
                    >
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
                      {open === i ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p
                          itemProp="text"
                          className="px-5 pb-4 text-muted text-sm leading-relaxed"
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
