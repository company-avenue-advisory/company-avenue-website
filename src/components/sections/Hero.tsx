"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Star, Receipt, ShieldCheck, BookOpen, FileText, BadgeCheck, Building2,
} from "lucide-react";
import { HeroSearch } from "@/components/sections/hero/HeroSearch";

/* ─── floating compliance badges, spread around the centered content ─── */
const floatingBadges = [
  { icon: BadgeCheck,  label: "Certificate Issued", color: "text-green-600",  bg: "bg-green-50",  delay: 0.55, pos: "top-[20%] left-[4%]",   dur: "3.2s" },
  { icon: Receipt,     label: "GST Approved",       color: "text-blue-600",   bg: "bg-blue-50",   delay: 0.7,  pos: "top-[46%] left-[7%]",   dur: "3.8s" },
  { icon: ShieldCheck, label: "Trademark Filed",    color: "text-purple-600", bg: "bg-purple-50", delay: 0.85, pos: "bottom-[16%] left-[11%]", dur: "3.5s" },
  { icon: FileText,    label: "ROC Filing Done",    color: "text-orange-600", bg: "bg-orange-50", delay: 1.0,  pos: "top-[22%] right-[5%]",  dur: "4.1s" },
  { icon: BookOpen,    label: "ITR Submitted",      color: "text-teal-600",   bg: "bg-teal-50",   delay: 1.15, pos: "top-[48%] right-[8%]",  dur: "3.6s" },
  { icon: Building2,   label: "Company Registered", color: "text-sky-600",    bg: "bg-sky-50",    delay: 1.3,  pos: "bottom-[15%] right-[10%]", dur: "3.9s" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden pt-[72px]"
      style={{ background: "linear-gradient(160deg, #05101f 0%, #091a30 35%, #0a2240 60%, #0d2a4e 100%)" }}
    >
      {/* ══ BACKGROUND LAYERS ══ */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-lines" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#7eb8e8" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-lines)" />
      </svg>

      {/* Radial glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(26,111,168,0.20) 0%, transparent 62%)" }}
      />
      <div className="absolute -bottom-60 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(15,45,82,0.5) 0%, transparent 70%)" }}
      />
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(214,166,79,0.07) 0%, transparent 70%)" }}
      />

      {/* Centered decorative rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
        style={{ width: 820, height: 820 }}
      >
        <svg width="820" height="820" viewBox="0 0 820 820" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="410" cy="410" r="400" stroke="url(#ring-grad1)" strokeWidth="1.5" strokeDasharray="6 12" />
          <circle cx="410" cy="410" r="320" stroke="url(#ring-grad2)" strokeWidth="1" strokeDasharray="3 16" opacity="0.5" />
          <circle cx="410" cy="410" r="240" stroke="rgba(214,166,79,0.12)" strokeWidth="1" />
          <defs>
            <linearGradient id="ring-grad1" x1="0" y1="0" x2="820" y2="820" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(26,111,168,0.45)" />
              <stop offset="50%" stopColor="rgba(214,166,79,0.28)" />
              <stop offset="100%" stopColor="rgba(26,111,168,0.08)" />
            </linearGradient>
            <linearGradient id="ring-grad2" x1="820" y1="0" x2="0" y2="820" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(214,166,79,0.35)" />
              <stop offset="100%" stopColor="rgba(26,111,168,0.12)" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
          <svg width="820" height="820" viewBox="0 0 820 820" fill="none">
            <circle cx="410" cy="410" r="400" stroke="rgba(214,166,79,0.1)" strokeWidth="1" strokeDasharray="2 20" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating badges */}
      {floatingBadges.map((badge) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.75, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: badge.delay, ease: [0.25, 0.1, 0.25, 1] }}
            className={`absolute ${badge.pos} hidden lg:flex items-center gap-2 rounded-xl px-3 py-2 whitespace-nowrap z-[5]`}
            style={{
              background: "rgba(8,20,42,0.8)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.1)",
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

      {/* ══ CENTERED CONTENT ══ */}
      <motion.div style={{ y: yContent, opacity }} className="container-custom relative z-10 py-24 md:py-28">
        <div className="max-w-3xl mx-auto text-center">

          {/* Rating pill */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-8 border"
            style={{ background: "rgba(214,166,79,0.08)", borderColor: "rgba(214,166,79,0.25)" }}
          >
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
              ))}
            </span>
            <span className="text-amber-200/90 text-xs font-heading font-semibold tracking-wide">
              4.9/5 · Trusted by 1000+ Business Owners
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="font-heading font-bold text-[2.4rem] sm:text-5xl lg:text-[3.6rem] leading-[1.1] tracking-tight mb-6"
            style={{ color: "#f0f6ff" }}
          >
            Start, Run &amp; Grow Your Business —{" "}
            <span style={{ background: "linear-gradient(90deg, #4da6e8 0%, #D6A64F 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Fully Compliant.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="text-slate-400 text-base md:text-lg leading-relaxed mb-9 max-w-2xl mx-auto"
          >
            Company registration, GST, trademark, tax filing and ROC compliance —
            handled end-to-end by{" "}
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-heading font-semibold align-middle"
              style={{ background: "rgba(77,166,232,0.14)", border: "1px solid rgba(77,166,232,0.3)", color: "#9fcbf0" }}
            >
              expert CAs &amp; CS
            </span>
            . 100% online, across India.
          </motion.p>

          {/* Search */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
            <HeroSearch />
          </motion.div>

          {/* Trust strip */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show"
            className="mt-11 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-slate-400"
          >
            {[
              { k: "15+", v: "Years Experience" },
              { k: "1000+", v: "Happy Clients" },
              { k: "50+", v: "Compliance Services" },
              { k: "4.9★", v: "Google Rating" },
            ].map((s) => (
              <div key={s.v} className="flex items-baseline gap-1.5">
                <span className="font-heading font-bold text-white text-lg">{s.k}</span>
                <span className="text-xs md:text-sm">{s.v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-[6]"
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
