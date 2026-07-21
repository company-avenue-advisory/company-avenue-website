"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { COMPANY } from "@/lib/constants";
import { faqs } from "@/lib/faqs/FAQ";


export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

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
