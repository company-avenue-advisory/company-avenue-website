"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, Users, Building2, BadgeCheck,
  ShieldCheck, FileText, CreditCard, Fingerprint, Hash, Zap,
  CheckCircle, Plus, Minus, ArrowUpRight, Briefcase, Monitor,
  DollarSign, Headphones, UserCheck, LifeBuoy,
  MessageCircle, Globe, Award,
  TrendingUp, Receipt, PenLine, BookOpen, CalendarCheck,
  Heart, Leaf, FlaskConical, Music, GraduationCap,
} from "lucide-react";

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

const quickFacts = [
  { icon: Clock,      label: "Timeline",       value: "15–20 Days" },
  { icon: Users,      label: "Min. Directors", value: "2 Directors" },
  { icon: Users,      label: "Min. Members",   value: "2 Members" },
  { icon: BookOpen,   label: "Governed by",    value: "Companies Act 2013" },
  { icon: Building2,  label: "Authority",      value: "MCA (Central Govt.)" },
  { icon: BadgeCheck, label: "Tax Status",     value: "Exempt u/s 12A & 80G" },
];

const whoShouldRegister = [
  { icon: Heart,         title: "Charitable Organizations",   desc: "NGOs and trusts working for social welfare and poverty alleviation." },
  { icon: GraduationCap, title: "Educational Institutions",  desc: "Schools, colleges and vocational training institutes." },
  { icon: FlaskConical,  title: "Research Bodies",           desc: "Scientific and academic research organizations." },
  { icon: BookOpen,      title: "Religious Trusts",          desc: "Organizations promoting religion, spirituality and interfaith harmony." },
  { icon: Heart,         title: "Health NGOs",               desc: "Organizations providing free or subsidized healthcare services." },
  { icon: Leaf,          title: "Environmental Groups",      desc: "Bodies working on environmental conservation and climate action." },
  { icon: Music,         title: "Art & Culture Orgs",        desc: "Organizations promoting Indian culture, art, music and heritage." },
  { icon: Award,         title: "Sports Promotion Bodies",   desc: "Entities promoting sports at grassroots and national level." },
];

const benefits = [
  { icon: BadgeCheck,  title: "Tax Exemption (12A & 80G)",   desc: "Organization's income exempt under 12A; donors get 50% deduction under 80G." },
  { icon: DollarSign,  title: "No Minimum Capital",          desc: "No minimum paid-up capital requirement — start with any amount." },
  { icon: ShieldCheck, title: "No Dividend Distribution",    desc: "Profits must be used for charitable objects only — no personal gain." },
  { icon: Globe,        title: "Government Grants Eligible", desc: "Can apply for central and state government grants and CSR funds." },
  { icon: Award,        title: "Higher Credibility",         desc: "Section 8 status signals seriousness and transparency to donors and stakeholders." },
  { icon: TrendingUp,   title: "Perpetual Succession",       desc: "Continues to exist independent of membership changes." },
  { icon: Globe,        title: "FCRA Eligible",              desc: "Can apply for FCRA registration to receive foreign contributions." },
  { icon: Building2,    title: "CSR Fund Recipient",         desc: "Companies can direct their mandatory CSR funds to Section 8 companies." },
];

const registrationSteps = [
  { n: "01", title: "Free Consultation",          desc: "Understand your NGO's objectives and advise the best charitable structure." },
  { n: "02", title: "Name Reservation (RUN)",     desc: "Reserve a unique name reflecting charitable objects via MCA's RUN form." },
  { n: "03", title: "MOA/AOA Drafting",           desc: "Draft Memorandum with specific charitable objects and Articles of Association." },
  { n: "04", title: "INC-12 Application",         desc: "File INC-12 for licence under Section 8 with all supporting documents." },
  { n: "05", title: "Central Government Review",  desc: "MCA/ROC reviews application, objects clause and compliance documents." },
  { n: "06", title: "MCA SPICe+ Filing",          desc: "File incorporation documents through SPICe+ form after licence approval." },
  { n: "07", title: "Certificate of Incorporation",desc: "Receive COI with CIN — your Section 8 company is now legally incorporated." },
  { n: "08", title: "12A & 80G Registration",     desc: "Apply for 12A (income exemption) and 80G (donor deduction) with the Income Tax Department." },
];

const timelineStages = [
  { label: "Consultation",   time: "Day 1" },
  { label: "Documents",      time: "Day 2–3" },
  { label: "INC-12 Filed",   time: "Day 3–5" },
  { label: "Govt. Review",   time: "Day 7–12" },
  { label: "COI Issued",     time: "Day 12–17" },
  { label: "12A & 80G",      time: "Day 20–60" },
];

const directorDocs = [
  { icon: CreditCard,  label: "PAN Card of all Directors" },
  { icon: Fingerprint, label: "Aadhaar Card of all Directors" },
  { icon: FileText,    label: "Passport-size Photographs" },
  { icon: Hash,        label: "Email & Mobile Numbers" },
  { icon: Building2,   label: "Residential Address Proof" },
  { icon: Globe,       label: "Digital Signature Certificate (DSC)" },
];

const orgDocs = [
  { icon: PenLine,  label: "Draft MOA with charitable objects" },
  { icon: FileText, label: "Draft AOA" },
  { icon: Zap,      label: "Office Address Proof" },
  { icon: Receipt,  label: "Declaration by Directors (INC-14)" },
  { icon: Award,    label: "CA Certificate (INC-15)" },
  { icon: BookOpen, label: "Statement of Work/Activities" },
];

const deliverables = [
  { icon: BadgeCheck, label: "Certificate of Incorporation",  color: "text-primary bg-primary/8" },
  { icon: FileText,   label: "MOA & AOA",                     color: "text-blue-600 bg-blue-50" },
  { icon: CreditCard, label: "Company PAN & TAN",             color: "text-purple-600 bg-purple-50" },
  { icon: Award,      label: "12A Certificate",               color: "text-green-600 bg-green-50" },
  { icon: Heart,      label: "80G Certificate",               color: "text-orange-600 bg-orange-50" },
  { icon: Globe,      label: "Niti Aayog DARPAN Registration",color: "text-teal-600 bg-teal-50" },
];

const whyUsPoints = [
  { icon: Award,       label: "15+ Years of Experience with NGO Registrations" },
  { icon: Building2,   label: "500+ Section 8 Companies Successfully Registered" },
  { icon: UserCheck,   label: "Expert CA & CS Team for Charitable Entities" },
  { icon: DollarSign,  label: "Fixed Transparent Pricing — Starting ₹9,999" },
  { icon: Zap,         label: "End-to-End MOA Drafting with Objects Clause" },
  { icon: Monitor,     label: "100% Online Process via MCA Portal" },
  { icon: LifeBuoy,    label: "12A, 80G, FCRA & CSR Eligibility Support" },
  { icon: Headphones,  label: "Dedicated CA Relationship Manager" },
];

const faqs = [
  { q: "What is a Section 8 Company?", a: "A Section 8 Company is a non-profit organization registered under the Companies Act, 2013. It is formed for charitable, educational, scientific, religious, social welfare or environmental purposes. Unlike regular companies, it cannot distribute profits to its members — all surplus must be applied toward its stated objectives." },
  { q: "What is the difference between a Section 8 Company, a Trust and a Society?", a: "A Section 8 Company is governed by MCA under the Companies Act 2013 — it has higher credibility, stricter governance and is preferred for CSR funding and FCRA registration. A Trust is governed by the Indian Trusts Act 1882 and is simpler to form. A Society is governed by the Societies Registration Act 1860 at the state level. Section 8 companies are generally preferred for their transparency and accountability." },
  { q: "Can directors of a Section 8 Company draw a salary?", a: "Yes. Directors and employees of a Section 8 Company can receive reasonable remuneration for services rendered. However, they cannot receive any dividend or profit share. Salaries must be commensurate with the role and disclosed in financial statements. Excessive compensation can be questioned by authorities." },
  { q: "What are the benefits of 12A and 80G registration?", a: "12A registration grants income tax exemption to the Section 8 company — its income used for charitable purposes is not taxed. 80G registration allows donors to claim a deduction of 50% of their donation amount from their taxable income. These two registrations together make the organization highly attractive to individual and corporate donors." },
  { q: "Can a Section 8 Company receive foreign funding?", a: "Yes, but only after obtaining FCRA (Foreign Contribution Regulation Act) registration. FCRA registration is granted by the Ministry of Home Affairs and allows the organization to receive donations, grants and contributions from foreign citizens and organizations. FCRA registration requires the organization to have at least 3 years of existence." },
  { q: "Is a Section 8 Company eligible to receive CSR funds?", a: "Yes. Companies with mandatory CSR obligations under the Companies Act can direct funds to registered Section 8 companies if they are included in Schedule VII activities. The Section 8 company must have a valid 12A and 80G certificate and conduct activities specified in Schedule VII." },
  { q: "What is the minimum number of members required?", a: "A Section 8 Company requires a minimum of 2 directors and 2 members for private (non-public) status. There is no maximum member limit. A single person cannot incorporate a Section 8 company — it requires at least two individuals committed to the charitable cause." },
  { q: "Can a Section 8 Company distribute profits?", a: "No. Distribution of profits, dividends or surplus to members or directors is strictly prohibited for Section 8 companies. Any profits or surplus generated must be used exclusively for the promotion of the charitable objects stated in the MOA. Violation of this provision can result in revocation of the licence and penalties." },
  { q: "Can a Section 8 Company be wound up?", a: "Yes. A Section 8 Company can be wound up voluntarily or compulsorily. However, upon winding up, the assets cannot be distributed among members. The remaining assets must be transferred to another Section 8 company with similar objects or to the government. This ensures the charitable mission continues." },
  { q: "What are the annual compliance requirements?", a: "A Section 8 Company must file annual returns (MGT-7), financial statements (AOC-4) and income tax returns each year. If 12A and 80G registered, it must also file Form 10B (audit report) with the Income Tax Department. Directors must comply with DIN KYC annually. Board meetings must be held at least twice a year." },
];

const relatedServices = [
  { id: "startup-india",           title: "Startup India Recognition", desc: "DPIIT recognition for eligible entities." },
  { id: "msme-registration",       title: "MSME Registration",         desc: "Udyam certificate for eligible NGOs." },
  { id: "accounting-bookkeeping",  title: "Accounting Services",       desc: "Books, MIS and compliance statements." },
  { id: "income-tax-return",       title: "Income Tax Return",         desc: "ITR filing for Section 8 entities." },
  { id: "trademark-registration",  title: "Trademark Registration",    desc: "Protect your NGO's brand and name." },
  { id: "gst-registration",        title: "GST Registration",          desc: "GST compliance for NGO operations." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        <span className="font-heading font-semibold text-dark text-sm leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <p className="px-5 pb-4 text-muted text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Section8CompanyPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="s8-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#s8-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Section 8 Company Registration</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">Trusted NGO Registration Experts</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Section 8 Company<br />
                <span className="text-primary">Registration (NGO) in India</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Register your NGO as a Section 8 Company with full support for MOA drafting, MCA filing, 12A and 80G registration, FCRA eligibility and CSR fund receipt. A credible structure for lasting social impact.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm"
                >
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <a href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all"
                >
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["15–20 Days Timeline", "12A & 80G Support", "Expert CAs", "Starting ₹9,999"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }} className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <Heart size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Section 8 Company — NGO</p>
                        <p className="text-white/50 text-[10px]">Ministry of Corporate Affairs</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● Tax Exempt</span>
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image
                      src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=85"
                      alt="NGO charitable work and social impact"
                      fill className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="text-muted text-[10px]">Tax Exemption</p>
                      <p className="font-heading font-bold text-primary text-xs">u/s 12A & 80G</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted text-[10px]">Starting from</p>
                      <p className="font-heading font-bold text-dark text-xs">₹9,999</p>
                    </div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Processing Time</p>
                  <p className="font-heading font-bold text-primary text-sm">15–20 Days</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">CSR Eligible</p>
                  <p className="font-heading font-bold text-green-600 text-sm">Yes ✓</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.label} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  className="bg-white border border-slate-100 rounded-2xl p-4 text-center hover:shadow-card hover:border-primary/10 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mx-auto mb-3 transition-colors duration-300">
                    <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-[10px] font-heading font-semibold text-muted uppercase tracking-wider mb-1">{f.label}</p>
                  <p className="font-heading font-bold text-dark text-sm leading-snug">{f.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* WHAT IS */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <Eyebrow label="Overview" />
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                    What is a Section 8 Company?
                  </h2>
                  <p className="text-slate-500 text-base leading-relaxed mb-5">
                    A Section 8 Company is a special category of company under the <strong>Companies Act, 2013</strong> formed for promoting commerce, art, science, sports, education, research, social welfare, religion, charity, protection of environment or any other such useful object. It is the corporate equivalent of an NGO.
                  </p>
                  <p className="text-slate-500 text-base leading-relaxed mb-6">
                    Unlike a Trust or Society, a Section 8 Company is regulated by MCA and provides the highest level of governance, transparency and credibility. It is the preferred structure for organizations seeking FCRA registration, CSR funding and 12A/80G tax exemptions.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Companies Act 2013, Section 8",
                      "Governed by MCA",
                      "12A & 80G tax exemption eligible",
                      "CSR & FCRA fund eligible",
                    ].map(pt => (
                      <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-dark text-xs leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)]">
                    <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=85"
                      alt="Section 8 company NGO work"
                      fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                    <p className="font-heading font-bold text-2xl">Section</p>
                    <p className="text-white/60 text-xs">8, Companies Act</p>
                  </div>
                </div>
              </div>
            </section>

            {/* WHO SHOULD */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Ideal For" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should Register a Section 8 Company?</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {whoShouldRegister.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors duration-300">
                        <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <p className="font-heading font-semibold text-dark text-sm mb-1">{item.title}</p>
                      <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* BENEFITS */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Advantages" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Key Benefits of Section 8 Company</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-card hover:border-primary/10 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                        <Icon size={18} className="text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-heading font-semibold text-dark text-sm mb-2">{b.title}</h3>
                      <p className="text-muted text-xs leading-relaxed">{b.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* PROCESS */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Registration Process</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {registrationSteps.map((step, i) => (
                  <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-white text-xs">{step.n}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-dark text-sm mb-1">{step.title}</h3>
                      <p className="text-muted text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* DOCUMENTS */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Checklist" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Documents Required</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-dark text-base mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center"><Users size={14} className="text-primary" /></span>
                    For Directors & Members
                  </h3>
                  <div className="space-y-3">
                    {directorDocs.map(d => {
                      const Icon = d.icon;
                      return (
                        <div key={d.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <Icon size={15} className="text-primary shrink-0" />
                          <span className="text-dark text-sm">{d.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-dark text-base mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center"><Building2 size={14} className="text-primary" /></span>
                    For the Organization
                  </h3>
                  <div className="space-y-3">
                    {orgDocs.map(d => {
                      const Icon = d.icon;
                      return (
                        <div key={d.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <Icon size={15} className="text-primary shrink-0" />
                          <span className="text-dark text-sm">{d.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Timeline" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Registration Timeline</h2>
                <p className="text-muted mt-3 text-sm">Certificate of Incorporation in 15–20 days; 12A & 80G follow within 30–60 days</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-0">
                {timelineStages.map((stage, i) => (
                  <div key={stage.label} className="flex md:flex-col items-center gap-3 md:gap-0 flex-1">
                    <div className="flex flex-col md:flex-row items-center gap-0 flex-1 w-full">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">{i + 1}</div>
                        <div className="md:hidden w-px h-8 bg-slate-200 mt-2" />
                      </div>
                      {i < timelineStages.length - 1 && <div className="hidden md:block h-px flex-1 bg-slate-200 mx-2" />}
                    </div>
                    <div className="text-center md:mt-3 pb-4 md:pb-0">
                      <p className="font-heading font-semibold text-dark text-xs">{stage.label}</p>
                      <p className="text-muted text-[10px] mt-0.5">{stage.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DELIVERABLES */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Deliverables" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">What You Receive</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {deliverables.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <motion.div key={d.label} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-card transition-all"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${d.color}`}><Icon size={16} /></div>
                      <span className="font-heading font-semibold text-dark text-sm leading-snug">{d.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* WHY US */}
            <section className="bg-primary rounded-3xl p-10 text-white">
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
                  <span className="w-6 h-px bg-accent" />Why Choose Us<span className="w-6 h-px bg-accent" />
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-white">Why Company Avenue?</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {whyUsPoints.map((pt) => {
                  const Icon = pt.icon;
                  return (
                    <div key={pt.label} className="flex items-center gap-3 bg-white/10 rounded-2xl p-4">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0"><Icon size={16} className="text-accent" /></div>
                      <span className="font-heading font-semibold text-white text-sm leading-snug">{pt.label}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="FAQ" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3 max-w-3xl mx-auto">
                {faqs.map(faq => <FaqItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </section>

            {/* RELATED */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Explore More" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Related Services</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedServices.map((s, i) => (
                  <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
                    <Link href={"/services/" + s.id}
                      className="flex items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all group"
                    >
                      <div>
                        <p className="font-heading font-semibold text-dark text-sm mb-1">{s.title}</p>
                        <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
                      </div>
                      <ArrowUpRight size={16} className="text-muted group-hover:text-primary shrink-0 transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="hidden xl:block sticky top-24 space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
              <p className="font-heading font-bold text-dark text-base mb-1">Register Your NGO Today</p>
              <p className="text-muted text-xs mb-4 leading-relaxed">Get Section 8 incorporation with 12A, 80G and DARPAN registration support.</p>
              <div className="space-y-2 mb-5">
                {["Free Expert Consultation", "MOA Drafting Support", "12A & 80G Registration", "FCRA Eligibility Guidance"].map(pt => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-primary shrink-0" />
                    <span className="text-dark text-xs">{pt}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <a href="tel:+919876543210" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors">
                  <Phone size={13} /> Call Now
                </a>
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors">
                  Book Consultation
                </Link>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors">
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {[{ v: "15–20", l: "Days Timeline" }, { v: "500+", l: "NGOs Formed" }, { v: "15+", l: "Years Exp." }, { v: "₹9,999", l: "Starting Price" }].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="font-heading font-bold text-primary text-lg leading-none">{s.v}</p>
                    <p className="text-muted text-[10px] mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">Start Your NGO with the Right Legal Structure</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Section 8 Company — India's most credible NGO structure. 12A, 80G, CSR and FCRA support. Starting at ₹9,999.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors shadow-lg">
                Register Your NGO <ArrowRight size={16} />
              </Link>
              <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors">
                <Phone size={15} /> +91 98765 43210
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
