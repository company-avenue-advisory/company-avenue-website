"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { HeroSearch } from "@/components/sections/hero/HeroSearch";

/* ─── floating decorative elements ─── */
const floatingElements = [
  { type: "circle", pos: "top-[15%] left-[8%]", size: 60, delay: 0.5, dur: "4s" },
  { type: "square", pos: "top-[45%] left-[5%]", size: 45, delay: 0.7, dur: "5s" },
  { type: "triangle", pos: "bottom-[20%] left-[12%]", size: 50, delay: 0.9, dur: "4.5s" },
  { type: "circle", pos: "top-[25%] right-[10%]", size: 55, delay: 1.1, dur: "5.5s" },
  { type: "square", pos: "top-[50%] right-[6%]", size: 40, delay: 1.3, dur: "4.8s" },
  { type: "triangle", pos: "bottom-[18%] right-[14%]", size: 48, delay: 1.5, dur: "5.2s" },
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
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/99a2d6b7-7657-484c-aa91-99607b20ff78.png')",
        }}
      />
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#05101f]/90 via-[#091a30]/85 to-[#0a2240]/80" />
      
      {/* ══ BACKGROUND LAYERS ══ */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
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

      {/* Floating decorative elements */}
      {floatingElements.map((el, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 0.6, delay: el.delay, ease: "easeOut" }}
          className={`absolute ${el.pos} hidden lg:block pointer-events-none z-[3]`}
          style={{
            width: el.size,
            height: el.size,
            animation: `elementFloat ${el.dur} ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === "circle" && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(77,166,232,0.6)" strokeWidth="2" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(214,166,79,0.4)" strokeWidth="1.5" />
            </svg>
          )}
          {el.type === "square" && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="5" y="5" width="90" height="90" fill="none" stroke="rgba(214,166,79,0.5)" strokeWidth="2" />
              <rect x="20" y="20" width="60" height="60" fill="none" stroke="rgba(77,166,232,0.4)" strokeWidth="1.5" />
            </svg>
          )}
          {el.type === "triangle" && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,10 90,85 10,85" fill="none" stroke="rgba(77,166,232,0.5)" strokeWidth="2" />
              <polygon points="50,25 75,70 25,70" fill="none" stroke="rgba(214,166,79,0.4)" strokeWidth="1.5" />
            </svg>
          )}
        </motion.div>
      ))}

      {/* ══ CENTERED CONTENT ══ */}
      <motion.div style={{ y: yContent, opacity }} className="container-custom relative z-10 w-full py-38 md:py-44">
        <div className="max-w-4xl mx-auto text-center">

          {/* Rating pill */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-8 border"
            style={{ background: "rgba(214,166,79,0.08)", borderColor: "rgba(214,166,79,0.25)" }}
          >
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </span>
            <span className="text-amber-200/90 text-sm font-heading font-semibold tracking-wide">
              4.9/5 · Trusted by 1000+ Business Owners
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="font-heading font-bold text-[2.6rem] sm:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight mb-7"
            style={{ color: "#f0f6ff" }}
          >
            Start, Run &amp; Grow Your Business -{" "}
            <span style={{ background: "linear-gradient(90deg, #4da6e8 0%, #D6A64F 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Fully Compliant.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto"
          >
            Company registration, GST, trademark, tax filing and ROC compliance —
            handled end-to-end by{" "}
            <span className="inline-flex items-center rounded-full px-3 py-1 text-base font-heading font-semibold align-middle"
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
            className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-300"
          >
            {[
              { k: "15+", v: "Years Experience" },
              { k: "1000+", v: "Happy Clients" },
              { k: "50+", v: "Compliance Services" },
              { k: "4.9★", v: "Google Rating" },
            ].map((s) => (
              <div key={s.v} className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-white text-xl">{s.k}</span>
                <span className="text-sm md:text-base">{s.v}</span>
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
        @keyframes elementFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
}
