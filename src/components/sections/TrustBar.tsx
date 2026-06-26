"use client";
import { motion } from "framer-motion";

const logos = [
  "Startup India", "MSME / Udyam", "MCA", "Income Tax Dept.",
  "GST Network", "Digital India", "IEC / DGFT", "ROC", "Google Reviews",
];

export function TrustBar() {
  const doubled = [...logos, ...logos];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-heading font-semibold text-muted tracking-widest uppercase mb-8"
        >
          Trusted by Startups, MSMEs &amp; Growing Businesses Across India
        </motion.p>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee w-max">
            {doubled.map((logo, i) => (
              <div
                key={i}
                className="mx-8 shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:border-primary/20 hover:bg-white transition-all duration-200"
              >
                <div className="w-2 h-2 rounded-full bg-primary/30" />
                <span className="text-xs font-heading font-semibold text-slate-500 whitespace-nowrap">
                  {logo}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
