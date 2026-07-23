"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  Globe, Layers, Scale, RefreshCcw, Zap, Eye,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { faqs } from "@/lib/faqs/DesignRegistrationPage";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function Eyebrow({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
      <span className="w-6 h-px bg-accent" />{label}<span className="w-6 h-px bg-accent" />
    </span>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
      className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
        <span itemProp="name" className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="overflow-hidden">
            <p itemProp="text" className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const quickFacts = [
  { icon: Clock,       label: "Protection",      value: "15 Years (10+5)" },
  { icon: Globe,       label: "Jurisdiction",    value: "India (Hague for Int&apos;l)" },
  { icon: Clock,       label: "Timeline",        value: "6-12 Months" },
  { icon: DollarSign,  label: "Starting At",     value: "₹4,999" },
  { icon: Landmark,    label: "Authority",       value: "Patent Office, India" },
  { icon: Eye,         label: "What It Covers",  value: "Visual Appearance" },
];

const designTypes = [
  { icon: Eye,         title: "Shape",           desc: "Three-dimensional shape of a product — the contours, curves, and form factor that give a product its distinctive visual appearance." },
  { icon: Layers,      title: "Configuration",   desc: "The arrangement or positioning of elements — how components are spatially organised in a product or article." },
  { icon: FileText,    title: "Pattern",         desc: "Repeated or non-repeated decorative motifs applied to a product surface — textile patterns, wallpaper designs, surface decorations." },
  { icon: Eye,         title: "Ornamentation",   desc: "Decorative elements applied to a product — embossing, etching, surface embellishment — that enhance visual appeal without functional purpose." },
  { icon: Building2,   title: "Composition of Lines or Colours", desc: "Artistic arrangement of lines, shapes, or colour combinations applied to an article to give it a unique visual identity." },
];

const benefits = [
  { icon: ShieldCheck, title: "15-Year Exclusive Monopoly",            desc: "Registration grants a 15-year exclusive right (10 years + 5-year renewal) to use the design commercially and prevent competitors from copying the visual appearance of your product." },
  { icon: DollarSign,  title: "Prevents Cheaper Copies",              desc: "Without design registration, competitors can legally replicate your product&apos;s appearance and undercut you in price. Registration gives you legal recourse including injunctions and damages." },
  { icon: Scale,       title: "Civil and Criminal Enforcement",        desc: "Registered design owners can file a civil suit for infringement and claim ₹50,000 per item per infringement. Criminal proceedings under Section 22 provide an additional deterrent." },
  { icon: TrendingUp,  title: "Competitive Differentiation",           desc: "Protecting your product design ensures customers associate the unique appearance exclusively with your brand, building recognition and loyalty over the 15-year protection period." },
  { icon: Award,       title: "Enhances IP Portfolio Value",           desc: "Registered designs are valuable IP assets that can be licensed, assigned, or used as collateral. They add tangible value to your business for investors and acquisition due diligence." },
  { icon: Globe,       title: "International Protection via Hague",    desc: "Indian design registrations can be used as a basis for international protection through the Hague System (WIPO), enabling protection in 95+ countries with a single filing." },
  { icon: Zap,         title: "Faster than Patent",                    desc: "Design registration is significantly faster and less expensive than utility patent filing. While patents take years, a design registration can provide protection within 6-12 months." },
  { icon: BadgeCheck,  title: "Marketing and Retail Advantage",        desc: "The &ldquo;Registered Design&rdquo; marking on your product acts as a deterrent to copyists and builds consumer trust by signalling innovation and originality in your product category." },
];

const whoNeeds = [
  { icon: Building2,   title: "Consumer Product Companies",            desc: "FMCG, electronics, toys, furniture, and household goods companies should register distinctive product shapes and packaging designs to prevent cheap imitations." },
  { icon: Briefcase,   title: "Fashion and Apparel Designers",         desc: "Clothing patterns, accessories, jewellery designs, and textile motifs can all be registered to prevent fast-fashion imitators from copying signature designs." },
  { icon: Layers,      title: "Packaging and Label Designers",         desc: "Distinctive bottle shapes, carton designs, blister pack configurations, and label layouts are eligible for design protection and should be registered before commercial launch." },
  { icon: Users,       title: "Industrial and Engineering Companies",   desc: "Machine parts, tooling, industrial equipment, and vehicle components with distinctive visual features can be registered to protect design investments." },
  { icon: Eye,         title: "Graphic and Product Designers",         desc: "Freelance and in-house designers who create original product appearances can register designs to protect their work from being copied by competitors of their clients." },
  { icon: TrendingUp,  title: "Startups Launching New Products",       desc: "Before launching a product with a unique form factor or appearance, startups should register the design to establish prior rights and deter imitators from day one." },
];

const processSteps = [
  { n: "01", title: "Design Novelty Check",                 desc: "Search the Design Registry database to verify the proposed design is novel and has not been previously registered or published. A thorough novelty search prevents rejection." },
  { n: "02", title: "Locarno Classification",               desc: "Classify the article in the correct Locarno Class. India uses the Locarno International Classification for industrial designs. Correct classification is critical for proper examination." },
  { n: "03", title: "Prepare Design Drawings",              desc: "Prepare precise representations of the design — typically 6 perspective drawings (front, back, left, right, top, bottom views) plus isometric view showing the complete design from all angles." },
  { n: "04", title: "File Application at Patent Office",    desc: "File the design application at the appropriate Patent Office branch (Mumbai, Delhi, Chennai, or Kolkata) with Form 1, design representations, and prescribed government fee." },
  { n: "05", title: "Examination by Patent Office",         desc: "The Patent Office examines the application for novelty, originality, and compliance with the Designs Act. A First Examination Report (FER) may be issued with objections to be addressed." },
  { n: "06", title: "Respond to Objections (if any)",       desc: "If the Patent Office issues objections — typically about novelty, classification, or representation quality — we draft and submit a comprehensive response within the prescribed deadline." },
  { n: "07", title: "Registration and Publication",         desc: "Upon successful examination, the design is registered and published in the Design Journal (Official Gazette). The registration number and certificate are issued to the applicant." },
  { n: "08", title: "Renewal at 10 Years",                  desc: "Design registration is initially valid for 10 years. It can be renewed for an additional 5 years (total 15 years) by filing the renewal application before the 10-year expiry." },
];

const requiredDocs = [
  { icon: FileText,   label: "Form 1 (Application for Design Registration)" },
  { icon: Eye,        label: "6 Perspective Drawings of the Design" },
  { icon: Layers,     label: "Isometric / 3D Rendering of the Design" },
  { icon: FileText,   label: "Statement of Novelty (what makes it unique)" },
  { icon: Building2,  label: "Disclaimer (for any non-distinctive element)" },
  { icon: FileText,   label: "Priority Document (if claiming Convention priority)" },
  { icon: Users,      label: "Applicant Identity Proof (PAN/Passport)" },
  { icon: DollarSign, label: "Government Fee Payment" },
];


export function DesignRegistrationPage() {
  return (
    <main className="overflow-x-hidden" itemScope itemType="https://schema.org/Service">

      {/* HERO */}
      <section className="relative bg-[#081726] text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom relative z-10">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-heading">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-accent">Design Registration</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="Intellectual Property" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              Design Registration{" "}
              <span className="text-accent">Under Designs Act 2000</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Protect the visual appearance of your products — shape, pattern, configuration, and ornamentation — with a 15-year exclusive monopoly under Indian design law. Stop competitors from copying your product&apos;s look before they enter the market.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Register Design <ArrowRight size={15} />
              </Link>
              <a href="tel:+919953719111" data-track="call"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors">
                <Phone size={15} /> Talk to an Expert
              </a>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white/8 border border-white/10 rounded-2xl px-4 py-4 text-center backdrop-blur-sm">
                  <Icon size={18} className="text-accent mx-auto mb-2" />
                  <p className="text-accent font-heading font-bold text-sm leading-tight">{f.value}</p>
                  <p className="text-slate-400 text-xs mt-1 font-heading">{f.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WHAT IS DESIGN REGISTRATION */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Overview" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">
                What is Design Registration?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                Design registration under the <strong className="text-dark">Designs Act, 2000</strong> protects the aesthetic, visual appearance of a product — its shape, configuration, pattern, or ornamentation — as applied to an article. It does NOT protect functional or technical features.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                A registered design gives the owner a <strong className="text-dark">15-year exclusive monopoly</strong> (10 years + 5-year renewal) to use that design on the specified article. Any person who copies or uses the registered design without permission infringes the registration and is liable to pay <strong className="text-dark">₹25,000 per claim</strong>.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                India uses the <strong className="text-dark">Locarno Classification</strong> for categorising articles. International protection is available through the <strong className="text-dark">Hague System</strong> (WIPO), enabling registration in 95+ countries with a single application.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Aesthetic Features Only", "15-Year Protection", "Locarno Classification", "Hague System for International"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <Eyebrow label="What Design Covers" />
                <p className="font-heading font-bold text-dark text-base mb-5">Types of Design Protection</p>
                <div className="space-y-3">
                  {designTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.title} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                        <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-heading font-semibold text-dark text-xs mb-0.5">{type.title}</p>
                          <p className="text-muted text-xs leading-snug">{type.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle size={13} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    <strong>Not Protected:</strong> Functional features, mechanical devices, methods of construction, and any feature dictated solely by function cannot be registered as a design.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO NEEDS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Applicability" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Should Register a Design?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Any business or individual creating products with distinctive visual features should protect those designs before launch.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whoNeeds.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{w.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Key Benefits" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Benefits of Design Registration</h2>
            <p className="text-muted mt-4">Protect your product&apos;s look and build a valuable IP asset portfolio.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-dark text-sm mb-2">{b.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Our Process" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Design Registration Process - Step by Step</h2>
            <p className="text-muted mt-4">From novelty search to registration certificate — we handle every step.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-slate-200 hidden md:block" aria-hidden="true" />
            <div className="space-y-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="flex gap-5 relative">
                  <div className="w-11 h-11 rounded-full bg-primary text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 z-10 shadow-sm">
                    {step.n}
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl p-4 flex-1 hover:shadow-card hover:border-primary/15 transition-all duration-300">
                    <p className="font-heading font-bold text-dark text-sm mb-1">{step.title}</p>
                    <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required</h2>
              <p className="text-muted leading-relaxed mb-8">
                High-quality design representations are critical. Poor-quality drawings are the most common cause of rejection.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {requiredDocs.map((doc, i) => {
                  const Icon = doc.icon;
                  return (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                      className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-primary" />
                      </div>
                      <span className="text-dark text-xs font-medium">{doc.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <AlertCircle size={18} className="text-amber-600" />
                  <p className="font-heading font-bold text-dark text-sm">Design Registration Timeline</p>
                </div>
                <div className="space-y-3 mb-5">
                  {[
                    { phase: "Novelty Search",         time: "3-5 days" },
                    { phase: "Application Preparation", time: "5-7 days" },
                    { phase: "Filing at Patent Office", time: "1-2 days" },
                    { phase: "Examination (FER)",       time: "3-6 months" },
                    { phase: "Response to Objections", time: "1-2 months (if any)" },
                    { phase: "Registration",           time: "1-2 months" },
                    { phase: "Total (Approx.)",        time: "6-12 months" },
                  ].map((item) => (
                    <div key={item.phase} className="flex items-center justify-between py-1.5 border-b border-amber-100 last:border-0">
                      <span className="text-xs text-muted">{item.phase}</span>
                      <span className="text-xs font-heading font-semibold text-dark">{item.time}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                  <Info size={13} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    Renewal must be filed before the 10-year expiry to extend protection to 15 years. We track and remind you of renewal deadlines.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow label="Pricing" />
            <h2 className="font-heading text-3xl font-bold text-dark">Investment</h2>
          </div>
          <div className="bg-primary rounded-3xl p-8 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Wallet size={18} className="text-accent" />
              <p className="font-heading font-semibold text-base">Starting at ₹4,999</p>
            </div>
            <p className="text-white/60 text-xs mb-6 leading-relaxed">
              All-inclusive fee. Includes novelty search, Locarno classification, design drawings review, application filing, and examination support.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {["Novelty Search", "Locarno Classification", "Design Drawings Review", "Patent Office Filing", "Examination Response", "Registration Certificate", "Renewal Reminder", "Hague System Guidance"].map(pt => (
                <div key={pt} className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-accent shrink-0" />
                  <span className="text-white/80 text-xs">{pt}</span>
                </div>
              ))}
            </div>
            <Link href="/contact"
              className="w-full py-3 bg-accent text-dark text-xs font-heading font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
              Register My Design <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/FAQPage">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Frequently Asked Questions</h2>
            <p className="text-muted mt-4">All you need to know about design registration in India.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}>
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
