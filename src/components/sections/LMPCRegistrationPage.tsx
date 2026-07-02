"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  Globe, Package, Scale, Tag, BarChart3, Zap,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

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
  { icon: Landmark,    label: "Act",           value: "Legal Metrology Act 2009" },
  { icon: Globe,       label: "Who Needs",     value: "Importers & Re-Packers" },
  { icon: Clock,       label: "Timeline",      value: "15-25 Business Days" },
  { icon: DollarSign,  label: "Starting At",   value: "₹4,999" },
  { icon: AlertCircle, label: "Penalty",       value: "Up to ₹25,000" },
  { icon: Package,     label: "Required For",  value: "Amazon / Flipkart Import Vendors" },
];

const benefits = [
  { icon: ShieldCheck, title: "Legal Compliance with Legal Metrology Act",  desc: "LMPC registration ensures full compliance with the Legal Metrology (Packaged Commodities) Rules, 2011. Operating without registration exposes importers and re-packers to seizure and penalties." },
  { icon: Globe,       title: "Mandatory for Amazon and Flipkart Sellers",  desc: "Amazon India and Flipkart both require LMPC registration proof for import vendors. Without it, your import vendor account will be suspended and you cannot list imported products." },
  { icon: Package,     title: "MRP Declaration Compliance",                  desc: "LMPC registration enables proper MRP declaration on imported/re-packed goods — ensuring the retail price includes all taxes and is clearly printed on the label as required." },
  { icon: Tag,         title: "Labelling Requirement Compliance",            desc: "Registered entities can legally print mandatory label information (net quantity, expiry date, country of origin, manufacturer/packer details, customer care number) on packaging." },
  { icon: Award,       title: "Avoid Product Seizure and Business Disruption", desc: "Legal Metrology officers can seize non-compliant products at the port of entry or from retail shelves. LMPC registration ensures your products pass inspection without disruption." },
  { icon: TrendingUp,  title: "Build Consumer and Marketplace Trust",        desc: "LMPC-compliant products with proper MRP labels, net quantity, and expiry date build consumer trust and meet the listing requirements of all major Indian e-commerce platforms." },
  { icon: Zap,         title: "Fast Registration Process",                   desc: "LMPC registration is processed by the state Legal Metrology Controller and typically takes 15-25 business days — one of the faster regulatory registrations for import businesses." },
  { icon: BadgeCheck,  title: "Enables Customs Clearance of Imported Goods", desc: "Customs authorities and Legal Metrology inspection at ports verify LMPC compliance. A registered importer with compliant labels faces smoother customs clearance." },
];

const whoNeeds = [
  { icon: Globe,       title: "Importers of Pre-Packaged Goods",            desc: "Any person importing packaged commodities into India for sale must have LMPC registration. This covers importers of electronics, food, cosmetics, toys, and all consumer goods." },
  { icon: Package,     title: "Re-Packers and Re-Labellers",                desc: "Companies that buy goods in bulk and re-pack them into smaller consumer units must register as packers under the Legal Metrology Act before selling re-packed goods." },
  { icon: Globe,       title: "Amazon and Flipkart Import Vendors",          desc: "E-commerce import vendors on Amazon, Flipkart, Meesho, and Snapdeal are mandated to provide LMPC registration number to continue selling imported products on these platforms." },
  { icon: Building2,   title: "Brand Owners Importing Products",             desc: "Indian brand owners who have products manufactured outside India and import them under their brand must have LMPC registration as the importer/packer." },
  { icon: Briefcase,   title: "Wholesale Distributors of Imported Goods",   desc: "Distributors handling imported packaged commodities in bulk must ensure all products carry compliant labels under the Legal Metrology Rules." },
  { icon: AlertCircle, title: "Companies Receiving Legal Metrology Notices", desc: "Businesses that have received compliance notices from Legal Metrology authorities should immediately obtain LMPC registration and rectify labelling to avoid penalties." },
];

const processSteps = [
  { n: "01", title: "Applicant Type Identification",             desc: "Determine whether you are registering as an importer (for imported goods), packer (for goods packed in India), or both. The application category determines the documents and officer jurisdiction." },
  { n: "02", title: "State vs Central Registration",             desc: "LMPC registration is obtained from the state Legal Metrology Controller in the state where the principal place of business is registered. For pan-India operations, the state of registered office is typically used." },
  { n: "03", title: "Application Form Preparation",             desc: "Complete the LMPC application form with details of the business, nature of commodities, premises details, and declaration of compliance with labelling requirements under the Packaged Commodities Rules." },
  { n: "04", title: "Document Compilation",                     desc: "Compile all required documents: identity proof, address proof, GST certificate, import export code (IEC), rent agreement or property documents, and list of commodities to be imported/packed." },
  { n: "05", title: "Online Application Filing",                desc: "File the application online on the state Legal Metrology Department&apos;s portal (or physically submit at the district or state office as applicable). Pay the government fee." },
  { n: "06", title: "Premises Inspection (if required)",        desc: "The Legal Metrology officer may conduct a physical inspection of the premises (warehouse, packing facility) to verify the details provided in the application. Ensure premises are in order." },
  { n: "07", title: "Query Response",                           desc: "Respond to any queries raised by the Legal Metrology officer regarding commodities, labelling specifications, or additional documentation within the stipulated timeframe." },
  { n: "08", title: "Certificate Issuance",                     desc: "Once satisfied, the Controller of Legal Metrology issues the LMPC registration certificate. This certificate is required for Amazon/Flipkart vendor accounts and customs clearance." },
];

const requiredDocs = [
  { icon: FileText,   label: "PAN Card of proprietor / company" },
  { icon: Building2,  label: "GST Registration Certificate" },
  { icon: Globe,      label: "Import Export Code (IEC) Certificate" },
  { icon: FileText,   label: "Certificate of Incorporation (for companies)" },
  { icon: FileText,   label: "Address Proof of Registered Office" },
  { icon: FileText,   label: "Rent Agreement / Property Document" },
  { icon: Package,    label: "List of Commodities to be imported/packed" },
  { icon: Tag,        label: "Sample Label Design showing MRP, net qty etc." },
  { icon: Users,      label: "Identity Proof of Proprietor / Director" },
  { icon: BarChart3,  label: "Bank Statement of the business" },
];

const faqs = [
  {
    q: "What is LMPC registration and which law governs it?",
    a: "LMPC stands for Legal Metrology Packaged Commodities. It is a registration/license issued under the Legal Metrology Act, 2009 and the Legal Metrology (Packaged Commodities) Rules, 2011. The registration is mandatory for any person who imports pre-packaged commodities into India or who re-packs commodities into smaller packages for retail sale. The purpose is to ensure that all packaged goods sold in India carry mandatory label declarations including net quantity, MRP (inclusive of all taxes), manufacturing / expiry date, manufacturer / packer name and address, and country of origin.",
  },
  {
    q: "Who is mandated to obtain LMPC registration?",
    a: "Under Rule 27 of the Legal Metrology (Packaged Commodities) Rules, 2011, the following must obtain LMPC registration: (1) every importer of pre-packaged commodities — this includes anyone importing goods for sale under their brand name or as a distributor; (2) every packer who packs commodities in packages for retail sale; (3) every re-packer who repacks bulk commodities into smaller consumer packages. Manufacturers who pack their own goods at their own factory are generally not required to separately register under LMPC (they are covered by production-related rules) unless they also import.",
  },
  {
    q: "What mandatory information must appear on every imported product&apos;s label?",
    a: "Under the Legal Metrology (Packaged Commodities) Rules, every retail package of an imported commodity must display: (1) Name and address of the importer in India; (2) Common name or generic name of the commodity; (3) Net quantity in standard units (grams, kg, liters, ml, meters); (4) Month and year of import / manufacture / expiry (as applicable); (5) Maximum Retail Price (MRP) inclusive of all taxes; (6) Country of origin; (7) Name and address of the original manufacturer abroad; (8) Customer care number or email. Labels must be in English or Hindi. Non-compliance attracts penalties under Section 36 of the Legal Metrology Act.",
  },
  {
    q: "Why is LMPC registration required for Amazon and Flipkart?",
    a: "Amazon India and Flipkart require import vendors to submit their LMPC registration certificate as part of their vendor compliance requirements. This is because the e-commerce platforms are themselves subject to enforcement under the Legal Metrology Act if they facilitate sale of products that do not comply with mandatory labelling requirements. Both platforms have built LMPC verification into their vendor onboarding and periodic compliance checks. Import vendors without a valid LMPC registration certificate face account suspension and cannot list imported products on these marketplaces.",
  },
  {
    q: "What are the penalties for not having LMPC registration?",
    a: "Section 36 of the Legal Metrology Act, 2009 prescribes penalties for importing or packing commodities without registration. The penalty for the first offence is a fine which may extend to ₹25,000. For a subsequent offence, the penalty can extend to ₹50,000 or imprisonment up to one year, or both. Additionally, Legal Metrology officers can seize and confiscate non-compliant goods at ports, warehouses, or retail locations. For e-commerce sellers, non-compliance also results in marketplace account suspension, which is a significant business disruption.",
  },
  {
    q: "How long is the LMPC registration valid and does it need renewal?",
    a: "LMPC registration is typically valid for 5 years from the date of issuance and must be renewed before expiry. The renewal application must be filed with the Controller of Legal Metrology in the respective state before the expiry date. Some states issue registrations valid for 1-3 years depending on their state-specific rules. It is important to track the expiry date and renew in time as selling with an expired LMPC registration is equivalent to selling without registration and attracts the same penalties.",
  },
  {
    q: "Does LMPC registration need to be obtained separately for each state?",
    a: "The need for state-wise LMPC registration depends on where the import/packing activities are conducted. Typically, the LMPC registration is obtained in the state where the principal place of business or import clearance facility is registered. If you have packing operations in multiple states, you may need separate registrations in each state. For e-commerce sellers who import goods centrally from one location and sell pan-India through marketplaces, a single state registration (where the warehouse / clearance is done) typically suffices, though this should be confirmed with the respective Legal Metrology authority.",
  },
  {
    q: "Can MRP be declared on products after import or must it be pre-printed?",
    a: "The MRP and other mandatory label information can be declared through a sticker affixed on the product after import but before sale. This is specifically allowed for imported goods where the original foreign packaging may not contain India-specific information. The sticker must contain all mandatory information as per the Legal Metrology Rules and must be firmly affixed in a manner that it cannot be easily removed. LMPC-registered importers can carry out this stickering/relabelling at their Indian warehouse. The sticker must not cover any mandatory information already on the original packaging.",
  },
];

export function LMPCRegistrationPage() {
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
            <span className="text-accent">LMPC Registration</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="Legal Metrology Compliance" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              LMPC Registration{" "}
              <span className="text-accent">for Importers</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Mandatory registration under the Legal Metrology Act 2009 for all importers and re-packers of pre-packaged goods. Required by Amazon, Flipkart, and customs for MRP declaration, net quantity compliance, and label information requirements on all imported products sold in India.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Get LMPC Registration <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210"
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
                What is LMPC Registration?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                LMPC (Legal Metrology Packaged Commodities) registration is a mandatory compliance requirement under the <strong className="text-dark">Legal Metrology Act, 2009</strong> and the Legal Metrology (Packaged Commodities) Rules, 2011. It is required for any person who imports pre-packaged goods into India or re-packs commodities for retail sale.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                The registration ensures that every packaged product sold in India carries mandatory label information including <strong className="text-dark">Maximum Retail Price (MRP inclusive of all taxes), net quantity, expiry date, manufacturer information, country of origin, and customer care contact</strong>.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                Without LMPC registration, importers face penalties of up to <strong className="text-dark">₹25,000 per offence</strong>, product seizure, and suspension of Amazon/Flipkart vendor accounts. Registration is obtained from the <strong className="text-dark">State Legal Metrology Controller</strong> and is valid for 5 years.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Mandatory for Importers", "MRP Label Compliance", "Amazon/Flipkart Required", "5-Year Validity"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <Eyebrow label="Mandatory Label Information" />
                <p className="font-heading font-bold text-dark text-base mb-5">What Must Be on Every Import Label</p>
                <div className="space-y-2">
                  {[
                    { no: "01", info: "Name and address of Indian importer" },
                    { no: "02", info: "Generic/common name of the commodity" },
                    { no: "03", info: "Net quantity in standard units (g, kg, ml, L)" },
                    { no: "04", info: "Month and year of manufacture or import" },
                    { no: "05", info: "Expiry date or best before date (where applicable)" },
                    { no: "06", info: "MRP inclusive of all taxes (in rupees)" },
                    { no: "07", info: "Country of origin" },
                    { no: "08", info: "Name and address of original foreign manufacturer" },
                    { no: "09", info: "Customer care number or email" },
                    { no: "10", info: "LMPC registration number of the importer" },
                  ].map((item) => (
                    <div key={item.no} className="flex items-start gap-3 py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-xs font-heading font-bold text-primary w-5 shrink-0">{item.no}</span>
                      <span className="text-dark text-xs leading-snug">{item.info}</span>
                    </div>
                  ))}
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Needs LMPC Registration?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              LMPC registration is mandatory for anyone importing or re-packing goods for retail sale in India.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Why Get LMPC Registration?</h2>
            <p className="text-muted mt-4">Compliance, marketplace access, and business protection in one registration.</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">LMPC Registration Process - Step by Step</h2>
            <p className="text-muted mt-4">From application to certificate — we manage the entire process with the Legal Metrology Department.</p>
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
                Documents required may vary slightly by state. We advise on state-specific requirements after reviewing your business profile.
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
                  <p className="font-heading font-semibold text-base">Starting at ₹4,999</p>
                </div>
                <p className="text-white/60 text-xs mb-5 leading-relaxed">
                  All-inclusive professional fee. Includes application preparation, state Legal Metrology filing, follow-up, and registration certificate.
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    "Applicant Category Assessment",
                    "Application Form Preparation",
                    "Document Compilation",
                    "State LM Department Filing",
                    "Premises Inspection Support",
                    "Query Response",
                    "LMPC Certificate",
                    "Label Compliance Guidance",
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
                      { phase: "Document Preparation",   time: "2-3 days" },
                      { phase: "Application Filing",     time: "1 day" },
                      { phase: "LM Dept Processing",     time: "10-20 days" },
                      { phase: "Certificate Issuance",   time: "1-2 days" },
                      { phase: "Total",                  time: "15-25 business days" },
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
                  Get LMPC Registration <ArrowRight size={13} />
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
            <p className="text-muted mt-4">Everything about LMPC registration, label compliance, and Legal Metrology Act requirements.</p>
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
