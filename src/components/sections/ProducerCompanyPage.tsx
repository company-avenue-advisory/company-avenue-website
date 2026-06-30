"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Users, FileText, Building2, BadgeCheck, ShieldCheck,
  CreditCard, Fingerprint, Hash, Zap, CheckCircle, Plus, Minus,
  ArrowUpRight, Briefcase, DollarSign, Headphones, UserCheck,
  LifeBuoy, MessageCircle, Globe, Award, TrendingUp, PenLine,
  BookOpen, CalendarCheck, Wheat, Tractor, Leaf, Landmark, Phone,
  ArrowRight, Star, HandCoins, BarChart3, PackageCheck,
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

const quickFacts = [
  { icon: Clock,       label: "Timeline",       value: "15–20 Working Days" },
  { icon: Users,       label: "Min. Members",   value: "10 Individuals or 2 Institutions" },
  { icon: Building2,   label: "Authority",      value: "Registrar of Companies (MCA)" },
  { icon: FileText,    label: "Key Forms",      value: "INC-32 (SPICe+), INC-33, INC-34" },
  { icon: BadgeCheck,  label: "Governed By",    value: "Companies Act 2013 – Part IXA" },
  { icon: Globe,       label: "Min. Capital",   value: "No Minimum Prescribed" },
];

const whoShouldRegister = [
  { icon: Wheat,       title: "Farmers & Cultivators",          desc: "Groups of 10+ individual farmers seeking collective bargaining strength." },
  { icon: Tractor,     title: "Agricultural Producer Groups",   desc: "Farming collectives that process and sell agri-commodities." },
  { icon: Leaf,        title: "Horticulture & Floriculture",    desc: "Fruit, vegetable and flower growers operating in cooperative fashion." },
  { icon: HandCoins,   title: "Fishermen Cooperatives",         desc: "Artisan fishing groups seeking formal corporate status and credit access." },
  { icon: Briefcase,   title: "Artisan & Handicraft Groups",    desc: "Weavers, potters and craftspeople commercializing their produce collectively." },
  { icon: PackageCheck,title: "Dairy Farmer Collectives",       desc: "Milk producers seeking formal vehicle for aggregation and sale." },
  { icon: BarChart3,   title: "Producer Institutions",          desc: "Two or more producer institutions forming a larger Producer Company." },
  { icon: Landmark,    title: "Agri-Value Chain Groups",        desc: "Producer groups building integrated supply chains from farm to market." },
];

const benefits = [
  { icon: ShieldCheck,  title: "Limited Liability",              desc: "Members' personal assets are protected — liability limited to unpaid share capital." },
  { icon: HandCoins,    title: "Collective Bargaining Power",    desc: "Negotiate better prices, bulk discounts and market rates as a unified entity." },
  { icon: DollarSign,   title: "Easier Access to Credit",       desc: "Banks and NBFCs extend institutional credit to Producer Companies more readily than to individuals." },
  { icon: TrendingUp,   title: "Profit Sharing Among Members",  desc: "Surplus distributed as patronage bonus, dividend or price differential to member-producers." },
  { icon: BadgeCheck,   title: "MCA-Recognized Legal Entity",   desc: "Recognized corporate entity under Companies Act 2013 — opens institutional doors." },
  { icon: Globe,        title: "Export & Market Access",        desc: "Formal entity enables APEDA registration, export licenses and direct market linkages." },
  { icon: Zap,          title: "Tax Benefits",                  desc: "Section 80P deductions for eligible agricultural income; no mandatory dividend tax in certain cases." },
  { icon: Briefcase,    title: "FPO Benefits & Grants",         desc: "Eligible for NABARD, SFAC and government FPO promotion schemes and equity grants." },
];

const registrationSteps = [
  { n: "01", title: "Eligibility & Consultation",         desc: "Determine if your group qualifies as a Producer Company under Part IXA of the Companies Act 2013." },
  { n: "02", title: "Name Reservation (RUN)",             desc: "Reserve a unique name for the Producer Company via the MCA RUN (Reserve Unique Name) portal." },
  { n: "03", title: "Draft MOA & AOA",                   desc: "Draft Memorandum and Articles of Association specifying producer activities as primary objects (INC-33, INC-34)." },
  { n: "04", title: "Obtain DSC & DIN",                  desc: "Obtain Digital Signature Certificates and Director Identification Numbers for all proposed directors." },
  { n: "05", title: "File SPICe+ (INC-32)",              desc: "Submit SPICe+ integrated form with MOA, AOA, subscriber declaration, office proof and director details." },
  { n: "06", title: "MCA Processing",                    desc: "MCA scrutinizes the application; any queries raised are resolved within the stipulated time." },
  { n: "07", title: "Certificate of Incorporation",      desc: "ROC issues the Certificate of Incorporation with CIN, confirming legal existence of the Producer Company." },
  { n: "08", title: "PAN, TAN & Bank Account",           desc: "Apply for PAN and TAN; open a current bank account in the Producer Company's name." },
];

const timelineStages = [
  { label: "Name Reservation",      time: "Day 1–2" },
  { label: "DSC & DIN",             time: "Day 2–5" },
  { label: "MOA/AOA Drafting",      time: "Day 3–7" },
  { label: "SPICe+ Filing",         time: "Day 7–10" },
  { label: "MCA Processing",        time: "Day 10–17" },
  { label: "COI Issued",            time: "Day 15–20" },
];

const directorDocs = [
  { icon: CreditCard,   label: "PAN Card of all Directors / Promoters" },
  { icon: Fingerprint,  label: "Aadhaar Card of all Directors" },
  { icon: FileText,     label: "Passport-size Photographs" },
  { icon: Hash,         label: "Email ID & Mobile Number" },
  { icon: Building2,    label: "Residential Address Proof (Utility Bill / Bank Statement)" },
  { icon: Globe,        label: "Digital Signature Certificate (Class 3)" },
];

const firmDocs = [
  { icon: PenLine,      label: "MOA with producer activity as primary object (INC-33)" },
  { icon: FileText,     label: "AOA (Articles of Association) — INC-34" },
  { icon: Zap,          label: "Registered Office Address Proof (Rent Agreement + NOC / Own Premises)" },
  { icon: BookOpen,     label: "Producer Declaration by each subscriber-member" },
];

const deliverables = [
  { icon: BadgeCheck,    label: "Certificate of Incorporation (COI)",   color: "text-primary bg-primary/8" },
  { icon: FileText,      label: "MOA & AOA Certified Copies",           color: "text-blue-600 bg-blue-50" },
  { icon: CreditCard,    label: "Company PAN & TAN",                    color: "text-purple-600 bg-purple-50" },
  { icon: Hash,          label: "Corporate Identification Number (CIN)", color: "text-green-600 bg-green-50" },
  { icon: CalendarCheck, label: "Compliance Calendar",                  color: "text-orange-600 bg-orange-50" },
  { icon: BookOpen,      label: "Share Certificate Templates",          color: "text-teal-600 bg-teal-50" },
];

const whyUsPoints = [
  { icon: Award,       label: "15+ Years Incorporation Experience Across All Entity Types" },
  { icon: Building2,   label: "100+ Producer Companies & FPOs Registered Across India" },
  { icon: UserCheck,   label: "Dedicated CA & CS for Part IXA Compliance" },
  { icon: DollarSign,  label: "Fixed Transparent Pricing — Starting ₹9,999" },
  { icon: Zap,         label: "MOA Drafting with Correct Producer Objects" },
  { icon: Briefcase,   label: "FPO Grant Linkage Support (NABARD, SFAC)" },
  { icon: LifeBuoy,    label: "Annual ROC & Income Tax Filing Support" },
  { icon: Headphones,  label: "Post-Registration Compliance Management" },
];

const faqs = [
  { q: "Who qualifies as a 'producer' for a Producer Company?", a: "A 'producer' under the Companies Act 2013 (Part IXA) means any person engaged in an activity connected with or relatable to primary produce. This includes farmers, horticulturists, animal breeders, fishermen, weavers, artisans and cottage industry workers. The key criterion is that their income must derive from primary production activities." },
  { q: "What is the minimum number of members required to form a Producer Company?", a: "A Producer Company can be formed by (a) a minimum of 10 individuals who are producers, or (b) a minimum of 2 Producer Institutions (which are institutions having objectives of producing, harvesting, procuring, grading, pooling, handling, marketing, selling or exporting of primary produce). There is no prescribed maximum number of members." },
  { q: "Can a corporate entity (company or society) be a member of a Producer Company?", a: "Yes. Producer Institutions — which can be cooperative societies, multi-state cooperative societies or other Producer Companies — can be members of a Producer Company. In such a case, only 2 Producer Institutions are required as promoters. However, individual non-producer corporates or private limited companies cannot become members." },
  { q: "What activities is a Producer Company allowed to undertake?", a: "A Producer Company can engage in: production, harvesting, procurement, grading, pooling, handling, marketing, selling, export of primary produce of members; processing including preserving, drying, distilling, brewing, vinting, canning; rendering technical, consultancy or training services; generation, transmission and distribution of power; reviving land and water resources; insurance for producers; financing activities for procurement and production. It cannot engage in any non-primary produce business as a primary object." },
  { q: "What is the difference between a Producer Company and a Cooperative Society?", a: "Both serve similar community purposes but differ fundamentally in regulation and governance. Cooperative Societies are governed by State Cooperative Acts (varying by state) and regulated by the Registrar of Cooperative Societies. Producer Companies are governed by the Companies Act 2013 (central law), regulated by the ROC/MCA, and provide limited liability. Producer Companies also have more corporate governance features including boards, AGMs and audited accounts under Schedule III. They are often easier to form across states." },
  { q: "What is the minimum capital requirement for a Producer Company?", a: "There is no minimum paid-up capital prescribed for Producer Companies under Part IXA of the Companies Act 2013. However, the ROC may informally expect a nominal capital. Practically, Producer Companies are formed with ₹1 lakh to ₹5 lakhs in paid-up share capital. The shares must be held by active producers and are non-transferable to non-producers." },
  { q: "Are Producer Companies eligible for government grants and subsidies?", a: "Yes. Producer Companies (especially those promoted as Farmer Producer Organizations or FPOs) are eligible for substantial government support. The Government of India's FPO scheme offers equity grants of up to ₹15 lakh per FPO through NABARD/SFAC, credit guarantee support and CBBOs (Cluster-Based Business Organizations) to hand-hold operations. NABARD, SFAC, and state agriculture departments run multiple schemes specifically for registered Producer Companies." },
  { q: "What are the key compliance requirements after incorporation?", a: "After incorporating a Producer Company, key annual compliances include: Board Meetings (minimum 4 per year), Annual General Meeting (within 6 months of FY close), Filing of Annual Return (MGT-7), Filing of Financial Statements (AOC-4), Income Tax Return, Director KYC (DIR-3 KYC) annually. Event-based filings include changes in directors, share allotments, and address changes. Statutory audit is mandatory regardless of turnover." },
];

const relatedServices = [
  { id: "private-limited-company",   title: "Private Limited Company",   desc: "Standard incorporation for businesses." },
  { id: "msme-registration",         title: "MSME Registration",         desc: "Udyam registration for government benefits." },
  { id: "gst-registration",          title: "GST Registration",          desc: "GST compliance for your Producer Company." },
  { id: "accounting-bookkeeping",    title: "Accounting Services",       desc: "Books, MIS and financial statements." },
  { id: "income-tax-return",         title: "Income Tax Return",         desc: "Annual ITR filing for companies." },
  { id: "roc-compliance",            title: "ROC Compliance",            desc: "Annual returns and MCA event filings." },
];

export function ProducerCompanyPage() {
  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="pc-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#pc-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Producer Company Registration</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-green-700 text-xs font-heading font-semibold">India's Trusted FPO Registration Experts</span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Producer Company<br /><span className="text-primary">Registration in India</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Register a Producer Company (Farmer Producer Organization) under Part IXA of the Companies Act 2013. We handle MOA drafting with producer objects, SPICe+ filing, and full MCA compliance — empowering India's primary producers.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-heading font-semibold text-sm rounded-xl hover:bg-[#0a2444] transition-colors shadow-sm">
                  Book Free Consultation <ArrowRight size={15} />
                </Link>
                <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-slate-700 font-heading font-semibold text-sm rounded-xl hover:border-primary hover:text-primary transition-all">
                  <Phone size={14} /> Talk to an Expert
                </a>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-x-5 gap-y-2">
                {["15–20 Days Timeline", "Part IXA Compliance", "FPO Grant Support", "Starting ₹9,999"].map(pt => (
                  <div key={pt} className="flex items-center gap-1.5">
                    <CheckCircle size={13} className="text-primary" />
                    <span className="text-slate-500 text-sm">{pt}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative">
              <div className="relative max-w-md mx-auto">
                <div className="bg-white border border-slate-200 rounded-3xl shadow-[0_12px_60px_rgba(15,45,82,0.12)] overflow-hidden">
                  <div className="bg-primary px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"><Wheat size={14} className="text-accent" /></div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Producer Company Certificate</p>
                        <p className="text-white/50 text-[10px]">MCA — Companies Act 2013, Part IXA</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● FPO Eligible</span>
                  </div>
                  <div className="px-5 py-6 space-y-3 bg-slate-50/50">
                    {[
                      { label: "Entity Type", value: "Producer Company (Part IXA)" },
                      { label: "Min. Members", value: "10 Individuals / 2 Institutions" },
                      { label: "Governing Law", value: "Companies Act 2013" },
                      { label: "Registration", value: "Registrar of Companies" },
                      { label: "NABARD FPO Grant", value: "Upto ₹15 Lakh / Company" },
                    ].map(row => (
                      <div key={row.label} className="flex items-center justify-between text-xs border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                        <span className="text-muted font-heading">{row.label}</span>
                        <span className="text-dark font-heading font-semibold">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-white">
                    <div><p className="text-muted text-[10px]">Processing Time</p><p className="font-heading font-bold text-primary text-xs">15–20 Working Days</p></div>
                    <div className="text-right"><p className="text-muted text-[10px]">Starting from</p><p className="font-heading font-bold text-dark text-xs">₹9,999</p></div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Processing Time</p>
                  <p className="font-heading font-bold text-primary text-sm">15–20 Days</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Governing Law</p>
                  <p className="font-heading font-bold text-green-600 text-sm">Part IXA ✓</p>
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
                <motion.div key={f.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
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
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">What is a Producer Company?</h2>
                  <p className="text-slate-500 text-base leading-relaxed mb-5">
                    A Producer Company is a legally recognized corporate entity under <strong>Part IXA of the Companies Act 2013</strong> designed specifically for farmers, fishermen, artisans and other primary producers. It combines the features of a cooperative society with the corporate governance of a private limited company — giving producers collective market power without the complexities of cooperative law.
                  </p>
                  <p className="text-slate-500 text-base leading-relaxed mb-6">
                    Unlike regular companies, a Producer Company can only accept producers as members and must primarily engage in activities related to primary produce — from farming and fishing to weaving and dairy. It is the preferred vehicle for Farmer Producer Organizations (FPOs) supported by NABARD, SFAC and the Government of India.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Governed by Part IXA, Companies Act 2013",
                      "10 individual producers OR 2 producer institutions",
                      "Limited liability protection for all members",
                      "Eligible for NABARD / SFAC FPO grants",
                    ].map(pt => (
                      <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-dark text-xs leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_12px_48px_rgba(15,45,82,0.10)] bg-slate-100 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Wheat size={64} className="text-primary/20 mx-auto mb-4" />
                      <p className="font-heading font-bold text-2xl text-primary">FPO / Producer Company</p>
                      <p className="text-muted text-sm mt-2">Empowering India's Primary Producers</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                    <p className="font-heading font-bold text-2xl">Part IXA</p>
                    <p className="text-white/60 text-xs">Companies Act 2013</p>
                  </div>
                </div>
              </div>
            </section>

            {/* WHO NEEDS IT */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Ideal For" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should Register a Producer Company?</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {whoShouldRegister.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={item.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
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
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Key Benefits of Producer Company</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
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
                  <motion.div key={step.n} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
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
                    For Directors / Promoters
                  </h3>
                  <div className="space-y-3">
                    {directorDocs.map(d => { const Icon = d.icon; return (
                      <div key={d.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <Icon size={15} className="text-primary shrink-0" />
                        <span className="text-dark text-sm">{d.label}</span>
                      </div>
                    ); })}
                  </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-dark text-base mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center"><Building2 size={14} className="text-primary" /></span>
                    For the Company
                  </h3>
                  <div className="space-y-3">
                    {firmDocs.map(d => { const Icon = d.icon; return (
                      <div key={d.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <Icon size={15} className="text-primary shrink-0" />
                        <span className="text-dark text-sm">{d.label}</span>
                      </div>
                    ); })}
                  </div>
                  <div className="mt-5 p-4 bg-green-50 border border-green-100 rounded-xl">
                    <p className="text-green-800 text-xs leading-relaxed">
                      <strong>Tip:</strong> At least 10 subscribers must sign the MOA as producers. Collect their producer declarations (stating they are engaged in primary produce) before filing.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* TIMELINE */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Timeline" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Registration Timeline</h2>
                <p className="text-muted mt-3 text-sm">End-to-end incorporation in 15–20 working days</p>
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
                {deliverables.map((d, i) => { const Icon = d.icon; return (
                  <motion.div key={d.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
                    className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-card transition-all"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${d.color}`}><Icon size={16} /></div>
                    <span className="font-heading font-semibold text-dark text-sm leading-snug">{d.label}</span>
                  </motion.div>
                ); })}
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
                {whyUsPoints.map((pt) => { const Icon = pt.icon; return (
                  <div key={pt.label} className="flex items-center gap-3 bg-white/10 rounded-2xl p-4">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0"><Icon size={16} className="text-accent" /></div>
                    <span className="font-heading font-semibold text-white text-sm leading-snug">{pt.label}</span>
                  </div>
                ); })}
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
                    <Link href={"/services/" + s.id} className="flex items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-card transition-all group">
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
              <p className="font-heading font-bold text-dark text-base mb-1">Register Your Producer Company</p>
              <p className="text-muted text-xs mb-4 leading-relaxed">Expert CA assistance for FPO incorporation under Part IXA of Companies Act.</p>
              <div className="space-y-2 mb-5">
                {["Free Expert Consultation", "MOA with Producer Objects", "SPICe+ Filing", "NABARD FPO Linkage Support"].map(pt => (
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
                {[{ v: "15–20", l: "Days Timeline" }, { v: "100+", l: "FPOs Formed" }, { v: "15+", l: "Years Exp." }, { v: "₹9,999", l: "Starting Price" }].map(s => (
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
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">Empower India's Farmers — Register Your FPO Today</h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Producer Company under Part IXA — the fastest route to collective market power, government grants, and institutional credit for primary producers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors shadow-lg">
                Get Started Today <ArrowRight size={16} />
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
