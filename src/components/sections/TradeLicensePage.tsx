"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  Scale, RefreshCcw, Zap, Globe, Store, MapPin,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { faqs } from "@/lib/faqs/TradeLicensePage";

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
  { icon: Landmark,    label: "Issuing Body",   value: "Municipal Corporation / ULB" },
  { icon: RefreshCcw,  label: "Annual Renewal", value: "By 31 March Each Year" },
  { icon: Clock,       label: "Timeline",       value: "7-15 Business Days" },
  { icon: DollarSign,  label: "Starting At",    value: "₹1,999" },
  { icon: AlertCircle, label: "Penalty",        value: "Fine + Business Shutdown" },
  { icon: MapPin,      label: "Scope",          value: "Premises-Specific" },
];

const benefits = [
  { icon: ShieldCheck, title: "Legal Permission to Operate Business Premises", desc: "A Trade License is the formal municipal permission to conduct business from specific premises. Operating a commercial establishment without it constitutes an illegal business activity." },
  { icon: Globe,       title: "GST Address Verification",                      desc: "GST registration requires proof of business address. Trade License issued for the premises is one of the most widely accepted address proof documents for GST principal place of business." },
  { icon: Landmark,    title: "Required for Bank Account Opening",             desc: "Banks and NBFCs require Trade License as one of the business address proof documents when opening current accounts for proprietorships, partnerships, and small businesses." },
  { icon: Scale,       title: "Commercial Zoning Compliance",                 desc: "Trade License ensures your business activity is permitted in the commercial zone where your premises are located. Operating in a residential area without permission attracts enforcement action." },
  { icon: Award,       title: "Enables Food Business License",                desc: "FSSAI food business registration/license and state pollution control permits require a valid Trade License as a supporting document confirming the premises&apos; legal business status." },
  { icon: TrendingUp,  title: "Required for Government and PSU Tenders",      desc: "Many government procurement tenders and PSU vendor registrations require a valid Trade License as proof of establishment. Without it, you cannot qualify for government supply contracts." },
  { icon: Zap,         title: "Quick Annual Renewal Process",                 desc: "Trade License renewal is a relatively straightforward annual process. With our assistance, the renewal can be completed well before the 31 March deadline, avoiding penalties." },
  { icon: BadgeCheck,  title: "Protects Business Against Municipal Raids",    desc: "Operating without a Trade License exposes businesses to municipal raids, temporary shutdown orders, and fines. A valid license provides legal protection against such actions." },
];

const whoNeeds = [
  { icon: Store,       title: "Retail Shops and Showrooms",                  desc: "Every retail shop, store, boutique, and showroom operating from a commercial or semi-commercial premises requires a Trade License from the local municipal body." },
  { icon: Building2,   title: "Restaurants, Cafes, and Food Establishments", desc: "Food service businesses require a Trade License before applying for FSSAI license and other food business permits. It confirms the premises is legally authorised for food operations." },
  { icon: Briefcase,   title: "Professional Offices and Clinics",            desc: "Doctor clinics, law offices, CA practices, consulting firms, and other professional service offices require Trade License to establish their legal business address." },
  { icon: Users,       title: "Manufacturing Units and Workshops",            desc: "Small manufacturing units, workshops, and artisan enterprises need Trade License from the Municipality or Industrial Development Corporation as part of their operating clearances." },
  { icon: Globe,       title: "E-Commerce Businesses with Warehouses",       desc: "Online sellers with physical warehouses or fulfilment centres need Trade License for those premises as part of their GST address compliance and marketplace seller verification." },
  { icon: Landmark,    title: "Service Centres and Repair Shops",            desc: "Auto repair workshops, electronic service centres, tailoring shops, and other service businesses require Trade License to legally operate from commercial premises." },
];

const processSteps = [
  { n: "01", title: "Identify the Issuing Authority",          desc: "Determine the correct issuing authority based on location: Municipal Corporation (for urban areas), Municipal Council (for smaller towns), Gram Panchayat (for rural areas), or Industrial Area Development Authority." },
  { n: "02", title: "Check Zone and Land Use",                 desc: "Verify that the premises is in a zone that permits the proposed business activity. Commercial zoning is required for most business activities. Industrial zoning for manufacturing. Residential zone typically restricts commercial use." },
  { n: "03", title: "Document Preparation",                    desc: "Prepare all required documents including proof of premises ownership or lease/rent agreement, NOC from landlord, proof of business identity, PAN of the business owner, and photographs of the premises." },
  { n: "04", title: "Online or Physical Application",          desc: "Most municipal corporations now offer online Trade License applications through their portals. File the application with correct business category selection, premises details, and upload all required documents." },
  { n: "05", title: "Pay Government Fee",                      desc: "Pay the Trade License fee as applicable. The fee varies by municipality, business type, floor area, and number of employees. Fees typically range from ₹500 to ₹10,000 for small businesses." },
  { n: "06", title: "Premises Inspection",                     desc: "A municipal inspector may visit the premises to verify the details provided in the application — actual business activity, premises area, number of employees, fire safety measures, and sanitation." },
  { n: "07", title: "NOC from Fire Department (if required)", desc: "For restaurants, hotels, large retail stores, and certain other businesses, a No Objection Certificate from the Fire Department is required before the Trade License is issued." },
  { n: "08", title: "Trade License Certificate",               desc: "Upon successful verification, the municipality issues the Trade License certificate. It must be displayed prominently at the business premises and renewed annually by 31 March." },
];

const requiredDocs = [
  { icon: FileText,   label: "Trade License Application Form" },
  { icon: Building2,  label: "Property Ownership Document or Rent Agreement" },
  { icon: Users,      label: "NOC from Landlord (if rented premises)" },
  { icon: FileText,   label: "PAN Card of Business Owner / Company" },
  { icon: FileText,   label: "Aadhaar / Identity Proof of Applicant" },
  { icon: Globe,      label: "GST Registration Certificate" },
  { icon: MapPin,     label: "Site Plan / Floor Plan of Premises" },
  { icon: FileText,   label: "Certificate of Incorporation (for companies)" },
  { icon: AlertCircle,label: "NOC from Fire Department (if applicable)" },
  { icon: DollarSign, label: "Fee Payment Receipt" },
];


export function TradeLicensePage() {
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
            <span className="text-accent">Trade License</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="Municipal Compliance" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              Trade License{" "}
              <span className="text-accent">Registration</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Obtain your municipal Trade License from the local Municipal Corporation, Council, or Gram Panchayat for legal business operation from your premises. Annual renewal by 31 March required. Essential for GST address proof, bank accounts, and government tenders.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Get Trade License <ArrowRight size={15} />
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

      {/* WHAT IS */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Eyebrow label="Overview" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">
                What is a Trade License?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                A Trade License is a certificate issued by the <strong className="text-dark">local Municipal Corporation, Municipal Council, or Gram Panchayat</strong> granting legal permission to carry on a specific trade, business, or profession from a particular premises. It confirms compliance with local zoning laws, safety norms, and sanitation requirements.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                Trade Licenses are <strong className="text-dark">premises-specific</strong> — each business location requires its own license. The license must be <strong className="text-dark">renewed annually by 31 March</strong>. Failure to renew attracts late fees, and operating with an expired license is equivalent to operating without a license.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                Trade License is required as address proof for <strong className="text-dark">GST registration, bank account opening, FSSAI license, and government tender eligibility</strong>. Commercial zoning compliance of the premises is verified before license issuance.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Premises-Specific License", "Annual Renewal by 31 March", "Commercial Zone Required", "GST Address Proof"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <Eyebrow label="Issuing Authorities" />
                <p className="font-heading font-bold text-dark text-base mb-5">Who Issues Your Trade License</p>
                <div className="space-y-3">
                  {[
                    { auth: "Municipal Corporation",          scope: "Metropolitan cities — Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune" },
                    { auth: "Municipal Council",               scope: "Tier-2 and Tier-3 cities and towns across all states" },
                    { auth: "Gram Panchayat",                 scope: "Rural areas, villages, and peri-urban settlements" },
                    { auth: "Cantonment Board",               scope: "Areas within defence cantonment boundaries" },
                    { auth: "MIDC / SIDCO / GIDC",            scope: "Industrial estates and development authority areas" },
                    { auth: "Town Planning Authority",         scope: "Special planning areas and new development zones" },
                  ].map((item) => (
                    <div key={item.auth} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                      <Building2 size={13} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-heading font-semibold text-dark text-xs">{item.auth}</p>
                        <p className="text-muted text-xs">{item.scope}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                  <Info size={13} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    The fee and process vary significantly by municipality. We confirm the correct authority and process for your specific location.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Needs a Trade License?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Any business operating from a physical premises in India&apos;s urban or semi-urban areas needs a Trade License.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Benefits of Trade License Registration</h2>
            <p className="text-muted mt-4">Legal compliance, credibility, and access to government services — all from one municipal registration.</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Trade License Process - Step by Step</h2>
            <p className="text-muted mt-4">From authority identification to license certificate — we manage the complete process.</p>
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

      {/* DOCUMENTS & PRICING */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow label="Documentation" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-5">Documents Required</h2>
              <p className="text-muted leading-relaxed mb-8">
                Document requirements vary by municipality and business type. We provide a customised checklist for your specific city and business category.
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
              <div className="bg-primary rounded-3xl p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet size={18} className="text-accent" />
                  <p className="font-heading font-semibold text-base">Starting at ₹1,999</p>
                </div>
                <p className="text-white/60 text-xs mb-5 leading-relaxed">
                  All-inclusive professional fee. Includes application preparation, municipal filing, inspection coordination, and license certificate. Government fee at actuals.
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    "Authority and Zone Identification",
                    "Application Form Preparation",
                    "Document Compilation",
                    "Municipal Portal Filing",
                    "Inspection Coordination",
                    "Query Response",
                    "Trade License Certificate",
                    "Annual Renewal Reminder",
                  ].map(pt => (
                    <div key={pt} className="flex items-center gap-2">
                      <CheckCircle size={12} className="text-accent shrink-0" />
                      <span className="text-white/80 text-xs">{pt}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 mb-5">
                  <p className="text-white/60 text-xs mb-2">Timeline:</p>
                  <div className="space-y-1">
                    {[
                      { phase: "Document Preparation", time: "1-2 days" },
                      { phase: "Application Filing",   time: "1 day" },
                      { phase: "Inspection",           time: "3-7 days" },
                      { phase: "Certificate",          time: "2-5 days" },
                      { phase: "Total",                time: "7-15 business days" },
                    ].map(item => (
                      <div key={item.phase} className="flex justify-between text-xs">
                        <span className="text-white/60">{item.phase}</span>
                        <span className="text-white font-heading font-semibold">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/contact"
                  className="w-full py-3 bg-accent text-dark text-xs font-heading font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
                  Get Trade License <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50" itemScope itemType="https://schema.org/FAQPage">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Frequently Asked Questions</h2>
            <p className="text-muted mt-4">All you need to know about Trade License registration and annual renewal.</p>
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
