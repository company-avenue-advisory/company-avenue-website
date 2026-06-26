"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle, ArrowRight, Star, Building2, Receipt,
  ShieldCheck, BookOpen, FileText, BadgeCheck,
} from "lucide-react";

const floatingBadges = [
  { icon: BadgeCheck, label: "Certificate Issued", color: "text-green-600", bg: "bg-green-50", delay: 0.6 },
  { icon: Receipt, label: "GST Approved", color: "text-blue-600", bg: "bg-blue-50", delay: 0.75 },
  { icon: ShieldCheck, label: "Trademark Filed", color: "text-purple-600", bg: "bg-purple-50", delay: 0.9 },
  { icon: FileText, label: "ROC Filing Done", color: "text-orange-600", bg: "bg-orange-50", delay: 1.05 },
  { icon: BookOpen, label: "ITR Submitted", color: "text-teal-600", bg: "bg-teal-50", delay: 1.2 },
];

const services = [
  "Business Registration",
  "GST Compliance",
  "Trademark",
  "Accounting",
  "ROC Filing",
];

const trustPoints = [
  "15+ Years Experience",
  "1000+ Happy Clients",
  "Expert Chartered Accountants",
  "End-to-End Compliance Support",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center overflow-hidden pt-[72px]">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-slate-50/60 translate-y-1/3 -translate-x-1/4" />
        {/* Thin grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#0F2D52" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left ── */}
          <div>
            {/* Star badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-7"
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
              ))}
              <span className="text-amber-700 text-xs font-heading font-semibold tracking-wide">
                Trusted by 1000+ Business Owners
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="font-heading font-bold text-[2.6rem] md:text-5xl lg:text-[3.2rem] leading-[1.15] tracking-tight text-dark mb-6"
            >
              Helping Businesses{" "}
              <span className="text-primary">Start, Grow</span>
              <br className="hidden md:block" />
              {" "}&amp; Stay Compliant.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-slate-500 text-lg leading-relaxed mb-9 max-w-xl"
            >
              Company Avenue Advisory Private Limited is your trusted partner for Company
              Registration, GST, Trademark, Income Tax Filing, Accounting, Payroll,
              ROC Compliance and Business Advisory Services across India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-primary-800 transition-colors shadow-sm hover:shadow-md"
              >
                Book Free Consultation
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Trust points */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-x-6 gap-y-2.5"
            >
              {trustPoints.map((pt) => (
                <div key={pt} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-primary shrink-0" />
                  <span className="text-slate-500 text-sm font-body">{pt}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right — Dashboard card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main card */}
            <div className="relative w-full max-w-md">
              <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_8px_48px_rgba(15,45,82,0.10)] p-6">
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                      <Building2 size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-dark text-sm leading-tight">
                        Company Avenue
                      </p>
                      <p className="text-muted text-xs">Compliance Dashboard</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Active
                  </span>
                </div>

                {/* Service pills */}
                <p className="text-xs font-heading font-semibold text-muted uppercase tracking-widest mb-3">
                  Our Services
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {services.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-heading font-medium text-slate-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3 mb-5">
                  {[
                    { label: "Applications Filed", val: 92, color: "bg-primary" },
                    { label: "On-Time Delivery", val: 98, color: "bg-accent" },
                    { label: "Client Satisfaction", val: 98, color: "bg-green-500" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-muted">{bar.label}</span>
                        <span className="text-xs font-heading font-semibold text-dark">{bar.val}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.val}%` }}
                          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${bar.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs text-muted ml-1">4.9 / 5.0</span>
                  </div>
                  <span className="text-xs text-muted">200+ Google Reviews</span>
                </div>
              </div>

              {/* Floating notification badges */}
              {floatingBadges.map((badge, i) => {
                const Icon = badge.icon;
                const positions = [
                  "-top-4 -left-8",
                  "top-1/4 -left-10",
                  "-bottom-4 left-4",
                  "top-1/3 -right-8",
                  "-top-2 right-8",
                ];
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: badge.delay }}
                    style={{
                      animation: `float-${i} ${3 + i * 0.4}s ease-in-out infinite`,
                    }}
                    className={`absolute ${positions[i]} flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.08)] whitespace-nowrap`}
                  >
                    <div className={`w-6 h-6 rounded-lg ${badge.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={12} className={badge.color} />
                    </div>
                    <span className="text-xs font-heading font-semibold text-dark">{badge.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating badge animation keyframes via inline style */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
