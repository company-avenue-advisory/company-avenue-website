"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ArrowRight, Phone, Clock, Users, Building2, BadgeCheck,
  ShieldCheck, FileText, CreditCard, Fingerprint, Hash, Zap,
  CheckCircle, Plus, Minus, ArrowUpRight, Briefcase, Monitor,
  DollarSign, Headphones, UserCheck, LifeBuoy, AlertTriangle,
  Download, MessageCircle, Globe, Scale, Repeat2, Award,
  TrendingUp, Receipt, PenLine, Layers, BookOpen, CalendarCheck,
  Handshake, Store, Stethoscope, ShoppingBag, Package,
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
  { icon: Clock,      label: "Timeline",        value: "7–10 Days" },
  { icon: Users,      label: "Min. Partners",   value: "2 Partners" },
  { icon: Users,      label: "Max. Partners",   value: "20 Partners" },
  { icon: BookOpen,   label: "Governed by",     value: "Partnership Act 1932" },
  { icon: Building2,  label: "Authority",       value: "Registrar of Firms" },
  { icon: BadgeCheck, label: "Validity",        value: "Lifetime (Renewable)" },
];

const whoShouldRegister = [
  { icon: ShoppingBag, title: "Traders & Retailers",      desc: "Wholesale and retail traders seeking a simple business structure." },
  { icon: Stethoscope, title: "Medical Practitioners",    desc: "Clinics and medical groups operating under a shared name." },
  { icon: Scale,       title: "Law Firms",                desc: "Legal practices and advocacy firms with multiple advocates." },
  { icon: BadgeCheck,  title: "CA Firms",                 desc: "Chartered Accountant firms governed by ICAI partnership norms." },
  { icon: Store,       title: "Retail Shops",             desc: "Small and medium retail businesses with co-owners." },
  { icon: Handshake,   title: "Family Businesses",        desc: "Multi-generational family ventures with shared management." },
  { icon: Globe,       title: "Import-Export Businesses", desc: "Trading firms engaged in international commerce." },
  { icon: Briefcase,   title: "Consultants",              desc: "Professional service providers operating in partnership." },
];

const benefits = [
  { icon: Zap,         title: "Simple Registration",            desc: "Straightforward process with fewer formalities than a company — done in days." },
  { icon: DollarSign,  title: "Very Low Cost",                  desc: "Minimal government fees and no mandatory stamp duty for unregistered deeds." },
  { icon: Layers,      title: "Flexible Management",            desc: "Partners manage directly — no board meetings or shareholder resolutions needed." },
  { icon: Receipt,     title: "Flexible Profit Sharing",        desc: "Partners decide profit/loss ratios freely without statutory restrictions." },
  { icon: FileText,    title: "No Mandatory Audit",             desc: "Tax audit only required if turnover exceeds ₹1 Crore (business) or ₹50 Lakh (profession)." },
  { icon: RepeatIcon,  title: "Easy Dissolution",               desc: "Wind up the firm by mutual consent without court intervention." },
  { icon: TrendingUp,  title: "Tax Advantages",                 desc: "Partner salaries and interest are deductible expenses; firm is taxed at 30% flat." },
  { icon: UserCheck,   title: "Partner Autonomy",               desc: "Each partner acts as an agent of the firm — high operational independence." },
];

function RepeatIcon({ size, className }: { size?: number; className?: string }) {
  return <Repeat2 size={size} className={className} />;
}

const registrationSteps = [
  { n: "01", title: "Free Consultation",          desc: "Our CA team reviews your business model and partners' profile to determine the best structure." },
  { n: "02", title: "Choose Firm Name",           desc: "We help you select a unique, compliant firm name that adheres to Partnership Act guidelines." },
  { n: "03", title: "Draft Partnership Deed",     desc: "A comprehensive deed is drafted covering profit sharing, roles, capital and dispute resolution." },
  { n: "04", title: "Notarize the Deed",          desc: "The partnership deed is executed on stamp paper and notarized by a public notary." },
  { n: "05", title: "Apply to Registrar",         desc: "Form 1 along with the deed and supporting documents are filed with the Registrar of Firms." },
  { n: "06", title: "Document Verification",      desc: "The Registrar verifies all submitted documents and partner identity proofs." },
  { n: "07", title: "Registration Certificate",   desc: "Upon approval, the Registrar issues the Certificate of Registration with a unique Firm ID." },
  { n: "08", title: "PAN & Bank Account",         desc: "Apply for the firm's PAN and open a current bank account in the firm's name." },
];

const timelineStages = [
  { label: "Consultation",     time: "Day 1" },
  { label: "Deed Drafted",     time: "Day 2–3" },
  { label: "Notarized",        time: "Day 3–4" },
  { label: "Application Filed",time: "Day 4–5" },
  { label: "Verification",     time: "Day 5–8" },
  { label: "Certificate",      time: "Day 7–10" },
];

const partnerDocs = [
  { icon: CreditCard,  label: "PAN Card of all Partners" },
  { icon: Fingerprint, label: "Aadhaar Card of all Partners" },
  { icon: FileText,    label: "Passport-size Photographs" },
  { icon: Hash,        label: "Email & Mobile Numbers" },
  { icon: Building2,   label: "Residential Address Proof" },
  { icon: Globe,       label: "Bank Statement (latest 3 months)" },
];

const firmDocs = [
  { icon: PenLine,  label: "Draft Partnership Deed" },
  { icon: Zap,      label: "Office Address Proof" },
  { icon: FileText, label: "NOC from Property Owner" },
  { icon: Receipt,  label: "Utility Bill (Electricity/Gas)" },
];

const deliverables = [
  { icon: BadgeCheck, label: "Certificate of Registration",  color: "text-primary bg-primary/8" },
  { icon: PenLine,    label: "Notarized Partnership Deed",   color: "text-blue-600 bg-blue-50" },
  { icon: CreditCard, label: "Firm PAN Card",                color: "text-purple-600 bg-purple-50" },
  { icon: Building2,  label: "Current Bank Account Support", color: "text-green-600 bg-green-50" },
  { icon: Globe,      label: "GST Registration (if needed)", color: "text-orange-600 bg-orange-50" },
  { icon: FileText,   label: "Firm Registration Number",     color: "text-teal-600 bg-teal-50" },
];

const whyUsPoints = [
  { icon: Award,       label: "15+ Years of Industry Experience" },
  { icon: Building2,   label: "2,000+ Partnership Firms Registered" },
  { icon: UserCheck,   label: "Qualified Chartered Accountants & CS" },
  { icon: DollarSign,  label: "Transparent Fixed Pricing — No Surprises" },
  { icon: Zap,         label: "Deed Drafted by Legal Experts" },
  { icon: Monitor,     label: "100% Digital & Paperless Process" },
  { icon: LifeBuoy,    label: "Post-Registration Compliance Support" },
  { icon: Headphones,  label: "Dedicated Relationship Manager" },
];

const faqs = [
  { q: "What is a Partnership Firm?", a: "A Partnership Firm is a business structure where two or more persons agree to share profits and losses of a business carried on by all or any one of them acting for all. It is governed by the Indian Partnership Act, 1932 and is one of the oldest and simplest business forms in India." },
  { q: "What is the difference between a Partnership Firm and an LLP?", a: "A Partnership Firm is governed by the Indian Partnership Act 1932, has no separate legal identity and partners have unlimited personal liability. An LLP, governed by the LLP Act 2008, is a separate legal entity with limited liability for partners. LLPs also have mandatory annual MCA filings, while partnership firms have lighter compliance." },
  { q: "What is the minimum and maximum number of partners?", a: "A minimum of 2 persons are required to form a partnership firm. The maximum is 20 partners for general businesses. For banking businesses, the limit is 10 partners. There is no upper cap for professional firms like CA firms under ICAI guidelines." },
  { q: "Is registration of a Partnership Firm mandatory?", a: "No, registration of a partnership firm is not mandatory under the Indian Partnership Act, 1932. However, an unregistered firm cannot file a suit against third parties to enforce its rights. Registration is strongly recommended for practical reasons including bank account opening, government contracts and dispute resolution." },
  { q: "What are the tax implications for a Partnership Firm?", a: "A registered partnership firm is taxed at a flat rate of 30% on its net profits. Partners can receive salary and interest on capital, which are deductible expenses for the firm. Partners are then taxed on their individual income including salary, interest and profit share. A surcharge of 12% applies if income exceeds ₹1 crore." },
  { q: "What should a Partnership Deed contain?", a: "A Partnership Deed should include: names and addresses of all partners, firm name, nature of business, capital contributions, profit/loss sharing ratio, salary and interest provisions, duties and powers of each partner, procedure for admission and retirement of partners, dispute resolution mechanism and dissolution procedure." },
  { q: "Can a Partnership Firm be dissolved easily?", a: "Yes. A partnership firm can be dissolved at any time by mutual consent of all partners. It can also be dissolved by notice (for partnerships at will), by a court order, or upon happening of certain events like insolvency or death of a partner (if the deed so specifies). Dissolution is significantly simpler than winding up a company." },
  { q: "What is unlimited liability in a Partnership?", a: "In a partnership firm, each partner has unlimited personal liability for the firm's debts and obligations. This means creditors can recover dues from partners' personal assets if the firm's assets are insufficient. This is the primary risk of a partnership as compared to LLPs and companies." },
  { q: "Can a Partnership Firm be converted to an LLP?", a: "Yes. A registered partnership firm can be converted to an LLP under Section 55 and Schedule II of the LLP Act, 2008. The process involves filing Form 17 with MCA, along with the partnership deed, consent of all partners and incorporation documents. All assets, liabilities and contracts transfer to the LLP upon conversion." },
  { q: "Does a Partnership Firm need to renew its registration?", a: "A partnership registration is valid for a lifetime once granted by the Registrar of Firms. However, any changes to the firm (partners, address, name, profit sharing) must be intimated to the Registrar by filing Form III (changes), Form IV (dissolution), or Form I amendments." },
];

const relatedServices = [
  { id: "llp-registration",        title: "LLP Registration",        desc: "Limited liability with flexible management." },
  { id: "private-limited-company", title: "Private Limited Company", desc: "Best for startups seeking investment." },
  { id: "gst-registration",        title: "GST Registration",        desc: "GSTIN for your new firm." },
  { id: "msme-registration",       title: "MSME Registration",       desc: "Udyam certificate & govt benefits." },
  { id: "accounting-bookkeeping",  title: "Accounting Services",     desc: "Books, MIS and financial statements." },
  { id: "roc-compliance",          title: "ROC Compliance",          desc: "Annual returns & event-based filings." },
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

export function PartnershipFirmPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pt-[72px]">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pf-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0F2D52" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pf-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-slate-50 -translate-y-1/3 translate-x-1/3" />
        </div>

        <div className="container-custom relative z-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-xs text-muted mb-8" aria-label="breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-dark">Partnership Firm Registration</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 mb-6"
              >
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                <span className="text-amber-700 text-xs font-heading font-semibold">India&apos;s Most Trusted Business Registration Partner</span>
              </motion.div>

              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading font-bold text-[2.4rem] md:text-5xl leading-[1.15] tracking-tight text-dark mb-5"
              >
                Partnership Firm<br />
                <span className="text-primary">Registration in India</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl"
              >
                Register your Partnership Firm quickly and legally with assistance from experienced Chartered Accountants. We handle deed drafting, notarization, Registrar filing, PAN and current account setup — end to end.
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
                {["7–10 Days Timeline", "Deed by Legal Experts", "Expert CAs", "Starting ₹3,999"].map(pt => (
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
                        <Handshake size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-white text-xs">Partnership Registration Certificate</p>
                        <p className="text-white/50 text-[10px]">Registrar of Firms, India</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-heading font-semibold bg-green-500/20 text-green-300 border border-green-400/30 px-2.5 py-1 rounded-full">● Official</span>
                  </div>
                  <div className="relative w-full aspect-[4/3] bg-slate-50">
                    <Image
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=85"
                      alt="Partnership business professionals shaking hands"
                      fill className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <p className="text-muted text-[10px]">Partners Required</p>
                      <p className="font-heading font-bold text-primary text-xs">Minimum 2</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted text-[10px]">Starting from</p>
                      <p className="font-heading font-bold text-dark text-xs">₹3,999</p>
                    </div>
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -right-5 top-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Timeline</p>
                  <p className="font-heading font-bold text-primary text-sm">7–10 Days</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -left-5 bottom-12 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100"
                >
                  <p className="text-[10px] text-muted font-heading">Deed & PAN</p>
                  <p className="font-heading font-bold text-green-600 text-sm">Included ✓</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUICK FACTS ── */}
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

      {/* ── MAIN CONTENT ── */}
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-12 items-start">
          <div className="space-y-24 min-w-0">

            {/* WHAT IS */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <Eyebrow label="Overview" />
                  <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-5 leading-tight">
                    What is a Partnership Firm?
                  </h2>
                  <p className="text-slate-500 text-base leading-relaxed mb-5">
                    A Partnership Firm is one of India&apos;s oldest and most popular business structures. Governed by the <strong>Indian Partnership Act, 1932</strong>, it is formed when two or more individuals agree to carry on a business together and share its profits and losses as per a mutually agreed ratio.
                  </p>
                  <p className="text-slate-500 text-base leading-relaxed mb-6">
                    Unlike a company, a partnership firm is not a separate legal entity from its partners. The partners are collectively the firm. This makes it simple to start, easy to manage and straightforward to dissolve — making it ideal for traders, professionals, family businesses and small retailers.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Governed by Partnership Act 1932",
                      "Minimum 2, Maximum 20 partners",
                      "Partners have unlimited liability",
                      "Simple, low-cost registration",
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
                    <Image src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=85"
                      alt="Partnership firm business meeting"
                      fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary rounded-2xl px-5 py-4 text-white shadow-lg">
                    <p className="font-heading font-bold text-2xl">Since</p>
                    <p className="text-white/60 text-xs">1932 Act</p>
                  </div>
                </div>
              </div>
            </section>

            {/* WHO SHOULD */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Ideal For" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Who Should Register a Partnership Firm?</h2>
                <p className="text-muted mt-3 text-sm max-w-xl mx-auto">Partnership firms are ideal for businesses that value simplicity and shared ownership without heavy corporate compliance.</p>
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
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Key Benefits of a Partnership Firm</h2>
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

            {/* REGISTRATION PROCESS */}
            <section className="bg-slate-50 rounded-3xl p-10">
              <div className="text-center mb-12">
                <Eyebrow label="Process" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Registration Process</h2>
                <p className="text-muted mt-3 text-sm max-w-xl mx-auto">Our streamlined process ensures error-free registration in the shortest possible time.</p>
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
                    <span className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                      <Users size={14} className="text-primary" />
                    </span>
                    For All Partners
                  </h3>
                  <div className="space-y-3">
                    {partnerDocs.map(d => {
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
                    <span className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                      <Building2 size={14} className="text-primary" />
                    </span>
                    For the Firm
                  </h3>
                  <div className="space-y-3">
                    {firmDocs.map(d => {
                      const Icon = d.icon;
                      return (
                        <div key={d.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <Icon size={15} className="text-primary shrink-0" />
                          <span className="text-dark text-sm">{d.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-amber-800 text-xs leading-relaxed">
                      <strong>Note:</strong> All documents must be self-attested by respective partners. Our team will guide you on stamp paper value based on your state.
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
                <p className="text-muted mt-3 text-sm">From consultation to certificate in 7–10 business days</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-0">
                {timelineStages.map((stage, i) => (
                  <div key={stage.label} className="flex md:flex-col items-center gap-3 md:gap-0 flex-1">
                    <div className="flex flex-col md:flex-row items-center gap-0 flex-1 w-full">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xs shrink-0">
                          {i + 1}
                        </div>
                        <div className="md:hidden w-px h-8 bg-slate-200 mt-2" />
                      </div>
                      {i < timelineStages.length - 1 && (
                        <div className="hidden md:block h-px flex-1 bg-slate-200 mx-2" />
                      )}
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
                <p className="text-muted mt-3 text-sm max-w-lg mx-auto">Complete documentation and credentials delivered digitally to your inbox.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {deliverables.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <motion.div key={d.label} custom={i} variants={fadeUp} initial="hidden"
                      whileInView="show" viewport={{ once: true, margin: "-40px" }}
                      className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-card transition-all"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${d.color}`}>
                        <Icon size={16} />
                      </div>
                      <span className="font-heading font-semibold text-dark text-sm leading-snug">{d.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* WHY COMPANY AVENUE */}
            <section className="bg-primary rounded-3xl p-10 text-white">
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest uppercase text-accent mb-4">
                  <span className="w-6 h-px bg-accent" />Why Choose Us<span className="w-6 h-px bg-accent" />
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-white">Why Company Avenue?</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {whyUsPoints.map((pt, i) => {
                  const Icon = pt.icon;
                  return (
                    <div key={pt.label} className="flex items-center gap-3 bg-white/10 rounded-2xl p-4">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-accent" />
                      </div>
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

            {/* RELATED SERVICES */}
            <section>
              <div className="text-center mb-12">
                <Eyebrow label="Explore More" />
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">Related Services</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedServices.map((s, i) => (
                  <motion.div key={s.id} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="show" viewport={{ once: true, margin: "-40px" }}
                  >
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
              <p className="font-heading font-bold text-dark text-base mb-1">Register Your Partnership Firm</p>
              <p className="text-muted text-xs mb-4 leading-relaxed">Talk to our CAs and get your firm registered in 7–10 days.</p>
              <div className="space-y-2 mb-5">
                {["Free Expert Consultation", "Deed Drafted by Lawyers", "End-to-End Registration", "PAN & Bank Account Support"].map(pt => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-primary shrink-0" />
                    <span className="text-dark text-xs">{pt}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <a href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-xs font-heading font-semibold rounded-xl hover:bg-[#0a2444] transition-colors"
                >
                  <Phone size={13} /> Call Now
                </a>
                <Link href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-2.5 border border-primary text-primary text-xs font-heading font-semibold rounded-xl hover:bg-primary/5 transition-colors"
                >
                  Book Consultation
                </Link>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white text-xs font-heading font-semibold rounded-xl hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {[{ v: "7–10", l: "Day Timeline" }, { v: "2000+", l: "Firms Formed" }, { v: "15+", l: "Years Exp." }, { v: "₹3,999", l: "Starting Price" }].map(s => (
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

      {/* ── CTA ── */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Ready to Register Your Partnership Firm?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Get expert CA assistance, a legally drafted deed and complete registration in 7–10 days. Starting at ₹3,999.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-heading font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
              >
                Get Started Today <ArrowRight size={16} />
              </Link>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-heading font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors"
              >
                <Phone size={15} /> +91 98765 43210
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
