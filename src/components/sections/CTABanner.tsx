"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[#0F2D52] py-14 md:py-24">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />
      {/* Geometric accent */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/[0.03] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/[0.08] pointer-events-none" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-white/50 text-xs font-heading font-medium tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available Mon–Sat, 9 AM – 7 PM IST
          </span>

          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-5 max-w-2xl mx-auto">
            Ready to Start Your<br className="hidden md:block" /> Business Journey?
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Let our Chartered Accountants handle your registrations, taxation and compliance
            while you focus on building your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-accent hover:bg-accent-dark text-white font-heading font-semibold text-sm rounded-xl transition-colors shadow-sm"
            >
              Book Consultation
              <ArrowRight size={15} />
            </Link>
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 px-7 py-4 border border-white/15 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/8 transition-colors"
            >
              <Phone size={15} />
              Talk to an Expert
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-white/25 text-xs font-body">
            <span>✓ Free 30-min consultation</span>
            <span>✓ No hidden fees</span>
            <span>✓ Expert CAs &amp; CSs</span>
            <span>✓ 100% digital process</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
