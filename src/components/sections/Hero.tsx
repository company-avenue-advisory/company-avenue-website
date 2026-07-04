"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle, ArrowRight, Star, Building2, Receipt,
  ShieldCheck, BookOpen, FileText, BadgeCheck,
} from "lucide-react";

/* ─── data (unchanged) ─── */
const floatingBadges = [
  { icon: BadgeCheck, label: "Certificate Issued", color: "text-green-600",  bg: "bg-green-50",  border: "border-green-100/80", delay: 0.55, pos: "-top-5 -left-6",    float: "6px",  dur: "3.2s" },
  { icon: Receipt,    label: "GST Approved",        color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-100/80",  delay: 0.7,  pos: "top-[22%] -left-12", float: "8px",  dur: "3.8s" },
  { icon: ShieldCheck,label: "Trademark Filed",     color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100/80",delay: 0.85, pos: "-bottom-5 left-6",  float: "5px",  dur: "3.5s" },
  { icon: FileText,   label: "ROC Filing Done",     color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100/80",delay: 1.0,  pos: "top-[30%] -right-10",float: "7px",  dur: "4.1s" },
  { icon: BookOpen,   label: "ITR Submitted",       color: "text-teal-600",   bg: "bg-teal-50",   border: "border-teal-100/80",  delay: 1.15, pos: "-top-3 right-10",   float: "6px",  dur: "3.6s" },
];

const services = ["Business Registration", "GST Compliance", "Trademark", "Accounting", "ROC Filing"];

const trustPoints = [
  "15+ Years Experience",
  "1000+ Happy Clients",
  "Expert Chartered Accountants",
  "End-to-End Compliance Support",
];

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yLeft  = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden pt-[72px] pb-20"
      style={{ background: "linear-gradient(160deg, #05101f 0%, #091a30 35%, #0a2240 60%, #0d2a4e 100%)" }}
    >
      {/* ══ BACKGROUND LAYERS ══ */}

      {/* Fine dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Subtle line grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-lines" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#7eb8e8" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-lines)" />
      </svg>

      {/* Large radial glow — top right */}
      <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(26,111,168,0.22) 0%, transparent 65%)" }}
      />

      {/* Secondary glow — bottom left */}
      <div className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(15,45,82,0.55) 0%, transparent 70%)" }}
      />

      {/* Gold accent glow — mid left */}
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(214,166,79,0.07) 0%, transparent 70%)" }}
      />

      {/* Abstract ring — large decorative behind dashboard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute right-[2%] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
        style={{ width: 640, height: 640 }}
      >
        {/* Outer ring */}
        <svg width="640" height="640" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="320" cy="320" r="310" stroke="url(#ring-grad1)" strokeWidth="1.5" strokeDasharray="6 10" />
          <circle cx="320" cy="320" r="256" stroke="url(#ring-grad2)" strokeWidth="1" strokeDasharray="3 14" opacity="0.5" />
          <circle cx="320" cy="320" r="190" stroke="rgba(214,166,79,0.15)" strokeWidth="1" />
          <defs>
            <linearGradient id="ring-grad1" x1="0" y1="0" x2="640" y2="640" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(26,111,168,0.5)" />
              <stop offset="50%" stopColor="rgba(214,166,79,0.3)" />
              <stop offset="100%" stopColor="rgba(26,111,168,0.1)" />
            </linearGradient>
            <linearGradient id="ring-grad2" x1="640" y1="0" x2="0" y2="640" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(214,166,79,0.4)" />
              <stop offset="100%" stopColor="rgba(26,111,168,0.15)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Slow rotation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <svg width="640" height="640" viewBox="0 0 640 640" fill="none">
            <circle cx="320" cy="320" r="310" stroke="rgba(214,166,79,0.12)" strokeWidth="1" strokeDasharray="2 18" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ══ CONTENT ══ */}
      <div className="container-custom relative z-10 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT ── */}
          <motion.div style={{ y: yLeft, opacity }}>

            {/* Star badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border"
              style={{
                background: "rgba(214,166,79,0.08)",
                borderColor: "rgba(214,166,79,0.25)",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
              ))}
              <span className="text-amber-300/90 text-xs font-heading font-semibold tracking-wide">
                Trusted by 1000+ Business Owners
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="font-heading font-bold text-[2.6rem] md:text-5xl lg:text-[3.4rem] leading-[1.12] tracking-tight mb-6"
              style={{ color: "#f0f6ff" }}
            >
              Helping Businesses{" "}
              <span style={{ background: "linear-gradient(90deg, #4da6e8 0%, #D6A64F 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Start, Grow
              </span>
              <br className="hidden md:block" />
              {" "}&amp; Stay Compliant.
            </motion.h1>

            {/* Subheading */}
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="text-slate-400 text-lg leading-relaxed mb-9 max-w-xl"
            >
              Company Avenue Advisory Private Limited is your trusted partner for Company
              Registration, GST, Trademark, Income Tax Filing, Accounting, Payroll,
              ROC Compliance and Business Advisory Services across India.
            </motion.p>

            {/* CTAs */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-heading font-semibold text-sm rounded-xl transition-all"
                  style={{
                    background: "linear-gradient(135deg, #1565a8 0%, #0F2D52 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 24px rgba(21,101,168,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-heading font-semibold text-sm rounded-xl transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(240,246,255,0.9)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>

            <motion.div custom={3.5} variants={fadeUp} initial="hidden" animate="show">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 mt-4 text-white/50 hover:text-white text-xs font-heading font-medium transition-colors underline underline-offset-4 decoration-white/20"
              >
                View Pricing & Packages
                <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Trust points */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="grid grid-cols-2 gap-x-6 gap-y-2.5"
            >
              {trustPoints.map((pt) => (
                <div key={pt} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-accent shrink-0" />
                  <span className="text-slate-400 text-sm">{pt}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Glassmorphism Dashboard ── */}
          <motion.div
            style={{ y: yRight }}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[420px]">

              {/* Main glass card */}
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.12)" }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative rounded-3xl p-6 overflow-hidden"
                style={{
                  background: "rgba(15,30,55,0.75)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Gradient shimmer top edge */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(77,166,232,0.6), rgba(214,166,79,0.4), transparent)" }}
                />

                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #1565a8, #0F2D52)", boxShadow: "0 4px 12px rgba(21,101,168,0.4)" }}
                    >
                      <Building2 size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white text-sm leading-tight">Company Avenue</p>
                      <p className="text-slate-400 text-xs">Compliance Dashboard</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-400 rounded-full px-3 py-1"
                    style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Active
                  </span>
                </div>

                {/* Service pills */}
                <p className="text-xs font-heading font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Our Services
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {services.map((s) => (
                    <motion.span key={s} whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 rounded-lg text-xs font-heading font-medium cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(200,220,255,0.85)",
                      }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3.5 mb-5">
                  {[
                    { label: "Applications Filed", val: 92, from: "#1565a8", to: "#4da6e8" },
                    { label: "On-Time Delivery",   val: 98, from: "#b8892f", to: "#D6A64F" },
                    { label: "Client Satisfaction",val: 98, from: "#16a34a", to: "#4ade80" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-slate-400">{bar.label}</span>
                        <span className="text-xs font-heading font-semibold text-white">{bar.val}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bar.val}%` }}
                          transition={{ duration: 1.3, delay: 0.9, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${bar.from}, ${bar.to})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider + rating */}
                <div className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">4.9 / 5.0</span>
                  </div>
                  <span className="text-xs text-slate-500">200+ Google Reviews</span>
                </div>

                {/* Bottom shimmer */}
                <div className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(214,166,79,0.3), transparent)" }}
                />
              </motion.div>

              {/* Floating notification badges */}
              {floatingBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.75, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: badge.delay, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`absolute ${badge.pos} flex items-center gap-2 rounded-xl px-3 py-2 whitespace-nowrap`}
                    style={{
                      background: "rgba(8,20,42,0.82)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                      animation: `badgeFloat ${badge.dur} ease-in-out infinite`,
                      animationDelay: `${badge.delay}s`,
                    }}
                  >
                    <div className={`w-6 h-6 rounded-lg ${badge.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={12} className={badge.color} />
                    </div>
                    <span className="text-xs font-heading font-semibold text-slate-200">{badge.label}</span>
                  </motion.div>
                );
              })}

              {/* Glow under card */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-20 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(21,101,168,0.35) 0%, transparent 70%)", filter: "blur(16px)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #F8FAFC 100%)" }}
      />

      <style>{`
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
      `}</style>
    </section>
  );
}
