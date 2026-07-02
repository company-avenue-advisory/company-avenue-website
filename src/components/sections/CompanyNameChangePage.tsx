"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Phone, CheckCircle, Plus, Minus, FileText,
  Building2, Users, Briefcase, Award, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, UserCheck, BadgeCheck, DollarSign,
  Landmark, Info, AlertCircle, ChevronRight, Wallet,
  RefreshCcw, Edit3, Globe, CreditCard, Hash,
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
  { icon: FileText,    label: "MCA Service",   value: "RUN (Reserve Unique Name)" },
  { icon: FileText,    label: "Main Form",     value: "INC-24" },
  { icon: Clock,       label: "Timeline",      value: "15-25 Business Days" },
  { icon: DollarSign,  label: "Starting At",   value: "₹6,999" },
  { icon: Landmark,    label: "Authority",     value: "Registrar of Companies" },
  { icon: BadgeCheck,  label: "Output",        value: "Fresh COI in New Name" },
];

const benefits = [
  { icon: Edit3,       title: "Reflect Rebranding Accurately",            desc: "When your company undergoes a brand overhaul, the legal name must align. A formal name change ensures your MCA, GST, PAN, and bank records all carry the same brand identity." },
  { icon: Globe,       title: "Enter New Markets with the Right Name",    desc: "Companies expanding into new product lines or geographies often need a name that reflects the new direction. A name change signals strategic evolution to customers and partners." },
  { icon: ShieldCheck, title: "Resolve Trademark Conflicts",              desc: "If your current name infringes on a registered trademark or you receive a legal notice, changing the company name proactively is far less costly than defending litigation." },
  { icon: Award,       title: "Post-Merger Identity Alignment",           desc: "After a merger or acquisition, the surviving entity often takes a new consolidated name. The name change process through INC-24 formalises this identity on MCA records." },
  { icon: TrendingUp,  title: "Avoid Confusion with Competitors",         desc: "If a similarly-named competitor has entered your market, changing your company name differentiates your brand legally and commercially, reducing customer confusion." },
  { icon: UserCheck,   title: "Comply with Promoter Name Change",         desc: "When the holding company or parent group changes its name, the Indian subsidiary often follows suit for brand consistency. INC-24 handles this transition smoothly." },
  { icon: Users,       title: "Reinforce Investor Confidence",            desc: "A company name that reflects its actual business increases credibility during fundraising, IPO preparation, and due diligence by institutional investors." },
  { icon: RefreshCcw,  title: "Correct Incorporation Errors",             desc: "Companies sometimes discover the original name does not align with the vision or has spelling issues. A name change corrects this and brings legal precision to the entity." },
];

const whoNeeds = [
  { icon: Building2,   title: "Companies Rebranding",                     desc: "Any company undergoing a brand identity change needs to legally update its name to maintain consistency across all corporate, tax, and banking records." },
  { icon: Users,       title: "Post-Acquisition Name Updates",            desc: "Companies acquired by a new parent group often change their name to align with the acquiring entity&apos;s brand identity and corporate structure." },
  { icon: Briefcase,   title: "Companies Diversifying into New Sectors",  desc: "When a company pivots from one industry to another, the original name may be misleading. A new name accurately represents the changed business activity." },
  { icon: AlertCircle, title: "Companies Facing Trademark Issues",        desc: "If the current name violates an existing trademark, the company must change its name to avoid legal action and protect its business continuity." },
  { icon: Landmark,    title: "MCA-Directed Name Changes",                desc: "The Registrar of Companies can direct a company to change its name if it is identical or too similar to another registered company&apos;s name or a registered trademark." },
  { icon: Hash,        title: "Promoter-Driven Rebranding",               desc: "When the promoter group changes, the new shareholders often want a fresh identity. A company name change formally marks the beginning of the new era of ownership." },
];

const processSteps = [
  { n: "01", title: "Name Availability Check via RUN",         desc: "Search for name availability on the MCA portal using the RUN (Reserve Unique Name) service. Propose up to 2 name options with significance. The name must not be identical to or resemble any existing company name or trademark." },
  { n: "02", title: "Board Resolution for Name Change",        desc: "Hold a Board Meeting and pass a resolution recommending the proposed name change and recommending it to shareholders for approval via Extraordinary General Meeting (EGM)." },
  { n: "03", title: "EGM Notice and Special Resolution",       desc: "Issue a notice to all shareholders for an Extraordinary General Meeting (EGM) with minimum 21 days notice period. At the EGM, pass a Special Resolution (requiring 3/4 majority) approving the new name." },
  { n: "04", title: "File MGT-14 with RoC",                    desc: "File Form MGT-14 on the MCA portal within 30 days of passing the Special Resolution. Attach the certified copy of the EGM notice, minutes, and the Special Resolution." },
  { n: "05", title: "File INC-24 (Application for Name Change)", desc: "File Form INC-24 with the Registrar of Companies requesting approval for the new name. Attach the EGM minutes, Special Resolution, MGT-14 SRN, and the RUN approval receipt." },
  { n: "06", title: "RoC Examination and Approval",            desc: "The Registrar of Companies examines the INC-24 application, verifies compliance, and either approves the new name or raises queries. Respond to any queries within the specified timeframe." },
  { n: "07", title: "Fresh Certificate of Incorporation",      desc: "Once the RoC approves the name change, a fresh Certificate of Incorporation (CoI) is issued in the new company name. This is the primary legal document evidencing the name change." },
  { n: "08", title: "Post-Change Updates",                     desc: "Update the company name on PAN (through NSDL), GST registration, all bank accounts, letterheads, seals, signboards, website, contracts, and obtain amended MOA and AOA in the new name." },
];

const requiredDocs = [
  { icon: FileText,   label: "Board Resolution recommending name change" },
  { icon: FileText,   label: "EGM Notice with 21-day prior notice" },
  { icon: FileText,   label: "EGM Minutes with Special Resolution" },
  { icon: FileText,   label: "MGT-14 SRN (Special Resolution filing receipt)" },
  { icon: FileText,   label: "RUN Approval from MCA portal" },
  { icon: Building2,  label: "Existing Certificate of Incorporation" },
  { icon: FileText,   label: "Altered MOA (Memorandum of Association)" },
  { icon: FileText,   label: "Altered AOA (Articles of Association)" },
  { icon: Hash,       label: "PAN Card of the Company" },
  { icon: CreditCard, label: "DSC of Director filing INC-24" },
];

const faqs = [
  {
    q: "What is the RUN service and why is it needed for a name change?",
    a: "RUN (Reserve Unique Name) is an MCA web service that allows companies to check and reserve a new company name before filing the formal name change application. It is required before filing INC-24 to ensure the proposed new name is not already taken by another registered company or closely resembles an existing trademark. The RUN approval is typically valid for 20 days and must be used within that period to file INC-24.",
  },
  {
    q: "What is Form INC-24 and who must sign it?",
    a: "Form INC-24 is the application form filed with the Registrar of Companies for approval of a company name change under Section 13(2) of the Companies Act, 2013. It must be signed digitally by a director of the company using a valid DSC (Digital Signature Certificate). The form requires attachment of the MGT-14 SRN (proving the Special Resolution was filed), the EGM minutes, RUN approval, and any other documents specified by the RoC.",
  },
  {
    q: "How long does the company name change process take?",
    a: "The company name change process typically takes 15 to 25 business days from the date of EGM, subject to timely filing of MGT-14 and INC-24 and absence of RoC queries. The timeline includes: obtaining RUN approval (3-5 days), conducting the EGM (21-day notice period), filing MGT-14 (within 30 days of EGM), filing INC-24, and RoC processing time (5-10 days). Delays can occur if the RoC raises queries or requires additional documentation.",
  },
  {
    q: "What happens to existing contracts, licenses, and registrations after a name change?",
    a: "After the name change, all existing contracts, licenses, and registrations remain valid under the new company name. However, the company must proactively update its name in all regulatory records including PAN (with NSDL/Income Tax Department), GST registration (via GST portal amendment), bank accounts (all branches), MSME Udyam registration, IEC (Importer Exporter Code), trademark registrations, and any state-specific licenses like Shop Act, FSSAI, and Professional Tax. Updated letterheads, rubber stamps, signboards, and website must also reflect the new name.",
  },
  {
    q: "Can the Registrar reject a proposed company name?",
    a: "Yes. The Registrar of Companies can reject a proposed name if it is: (1) identical or too similar to an existing registered company&apos;s name; (2) identical to a trademark registered under the Trade Marks Act; (3) deemed undesirable under the Companies Act guidelines; (4) contains restricted words like Bank, Insurance, Stock Exchange, Reserve Bank, without appropriate central government approval; or (5) suggests association with the government or foreign government without permission. It is advisable to check name availability thoroughly before filing to avoid rejection.",
  },
  {
    q: "Is a Special Resolution mandatory for changing the company name?",
    a: "Yes. Under Section 13(1) of the Companies Act, 2013, changing a company&apos;s name requires passing a Special Resolution — a resolution that receives at least three-fourths (75%) of the votes cast by members voting in person or by proxy at a duly convened EGM. The resolution and its passing must be notified to the RoC via Form MGT-14 within 30 days. An ordinary resolution is not sufficient for a name change.",
  },
  {
    q: "Does the company&apos;s CIN change after a name change?",
    a: "No. The Corporate Identity Number (CIN) of the company does not change when the company name is changed. The CIN is unique to the company and is retained throughout its existence. What changes is the company name prefix in the CIN. For example, if the company was previously U67100MH2010PTC123456 under the old name, the new CIN will reflect the new name but retain the same numeric code. The fresh Certificate of Incorporation issued shows the updated name with the same CIN.",
  },
  {
    q: "What is the post-name-change compliance checklist?",
    a: "After receiving the fresh Certificate of Incorporation in the new name, the company must: (1) Update PAN with Income Tax Department (file Form 49A/49AA amendment); (2) Amend GST registration on the GST portal; (3) Update all bank accounts with the new name and provide the fresh CoI; (4) Update trademark registrations (file TM-P form); (5) Update IEC certificate; (6) Update MSME Udyam certificate; (7) Reprint letterheads, rubber stamps, and boards; (8) Update all signed contracts (addendum or novation); (9) Inform all customers, vendors, and counterparties; (10) Update the company website and all digital assets.",
  },
  {
    q: "What if the proposed new name is identical to a trademark?",
    a: "If the proposed new company name is identical or deceptively similar to a trademark registered under the Trade Marks Act, the RoC will reject the name during RUN or INC-24 review. Additionally, the trademark owner can file an objection. To avoid this, conduct a thorough trademark search on the IP India portal before proposing a new name. If you are the trademark owner yourself, provide proof of trademark ownership during the INC-24 filing to preempt objections.",
  },
];

export function CompanyNameChangePage() {
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
            <span className="text-accent">Company Name Change</span>
          </nav>
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Eyebrow label="MCA / RoC Filing" />
            </motion.div>
            <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" itemProp="name">
              Company Name Change{" "}
              <span className="text-accent">INC-24 Filing</span>
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl" itemProp="description">
              Legally change your company&apos;s name through MCA with a fresh Certificate of Incorporation. From RUN name availability check and EGM special resolution to INC-24 filing and post-change PAN, GST, and bank updates — we handle everything.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-dark px-7 py-3.5 rounded-xl font-heading font-bold text-sm hover:bg-accent/90 transition-colors">
                Start Name Change <ArrowRight size={15} />
              </Link>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-heading font-semibold text-sm hover:bg-white/10 transition-colors">
                <Phone size={15} /> Talk to a CS
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
                How Does Company Name Change Work?
              </h2>
              <p className="text-muted text-base leading-relaxed mb-5">
                Changing a company&apos;s name in India is a formal legal process governed by <strong className="text-dark">Section 13 of the Companies Act, 2013</strong>. It requires shareholder approval via a Special Resolution at an EGM, followed by RoC approval through <strong className="text-dark">Form INC-24</strong>.
              </p>
              <p className="text-muted text-base leading-relaxed mb-5">
                The process begins with checking name availability on the MCA&apos;s <strong className="text-dark">RUN (Reserve Unique Name)</strong> service. Once the name is approved and reserved, the shareholders must pass a Special Resolution and the company must file Form INC-24 with the Registrar of Companies.
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                Upon RoC approval, a <strong className="text-dark">fresh Certificate of Incorporation</strong> is issued in the new name. The company&apos;s CIN remains unchanged. Post-change updates to PAN, GST, bank accounts, letterheads, and all third-party records are mandatory.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["RUN Name Approval", "EGM Special Resolution", "INC-24 RoC Filing", "Fresh COI Issued"].map(pt => (
                  <div key={pt} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-dark text-xs leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8">
                <Eyebrow label="Post-Change Updates" />
                <p className="font-heading font-bold text-dark text-base mb-5">What Must Be Updated After Name Change</p>
                <div className="space-y-3">
                  {[
                    { icon: FileText,   label: "PAN Card",               note: "NSDL / Income Tax Dept" },
                    { icon: FileText,   label: "GST Registration",        note: "GST portal amendment" },
                    { icon: CreditCard, label: "All Bank Accounts",       note: "All branches / all banks" },
                    { icon: Globe,      label: "Trademark Registrations", note: "IP India portal (Form TM-P)" },
                    { icon: FileText,   label: "IEC Certificate",         note: "DGFT portal" },
                    { icon: Building2,  label: "MSME Udyam Certificate",  note: "Udyam portal update" },
                    { icon: Edit3,      label: "Letterheads and Signage", note: "All stationery and boards" },
                    { icon: Users,      label: "Contracts and Licenses",  note: "Addendum or novation" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                        <div className="flex items-center gap-2">
                          <Icon size={13} className="text-primary" />
                          <span className="text-dark text-xs font-heading font-semibold">{item.label}</span>
                        </div>
                        <span className="text-muted text-xs">{item.note}</span>
                      </div>
                    );
                  })}
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Who Needs a Company Name Change?</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Various business scenarios trigger the need for a formal company name change through the MCA.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Why Change Your Company Name?</h2>
            <p className="text-muted mt-4">A name change is a strategic business decision. Here is why companies choose to do it.</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Company Name Change Process - Step by Step</h2>
            <p className="text-muted mt-4">From name availability to fresh Certificate of Incorporation — we handle the entire process.</p>
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
                Gather these documents before initiating the name change process. We assist in drafting all resolutions and forms.
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
                  <AlertTriangle size={18} className="text-amber-600" />
                  <p className="font-heading font-bold text-dark text-sm">Name Rejection Reasons</p>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-4">The MCA may reject your proposed name if it:</p>
                <div className="space-y-2 mb-5">
                  {[
                    "Is identical to an existing company name",
                    "Closely resembles a registered trademark",
                    "Contains words like Bank, Insurance, or Stock Exchange without approval",
                    "Implies association with the government",
                    "Is deemed undesirable or offensive",
                    "Contains blocked words under MCA guidelines",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertCircle size={12} className="text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-dark text-xs leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                  <Info size={13} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-dark text-xs leading-relaxed">
                    We conduct a thorough name search before filing to minimise rejection risk. We propose backup names as part of our service.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TIMELINE & PRICING */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow label="Timeline &amp; Pricing" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Timeline &amp; Investment</h2>
            <p className="text-muted mt-4">Fixed professional fee with full process support.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Clock size={18} className="text-white" />
                </div>
                <p className="font-heading font-bold text-dark">Timeline</p>
              </div>
              <div className="space-y-3">
                {[
                  { phase: "RUN Name Approval",      time: "3-5 days" },
                  { phase: "EGM Notice Period",       time: "21 days" },
                  { phase: "MGT-14 Filing",           time: "1-2 days" },
                  { phase: "INC-24 Filing",           time: "1-2 days" },
                  { phase: "RoC Processing",          time: "5-10 days" },
                  { phase: "Total (Approx.)",         time: "15-25 business days" },
                ].map((item) => (
                  <div key={item.phase} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <span className="text-xs text-muted">{item.phase}</span>
                    <span className="text-xs font-heading font-semibold text-dark">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary rounded-3xl p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={18} className="text-accent" />
                <p className="font-heading font-semibold text-base">Starting at ₹6,999</p>
              </div>
              <p className="text-white/60 text-xs mb-6 leading-relaxed">
                All-inclusive professional fee. Includes RUN filing, EGM documents, MGT-14, INC-24 filing, and post-change update guidance.
              </p>
              <div className="space-y-2 mb-6">
                {["RUN Name Search and Filing", "Board and EGM Resolutions", "MGT-14 Filing", "INC-24 with RoC", "Fresh Certificate of Incorporation", "Post-Change Update Checklist"].map(pt => (
                  <div key={pt} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-accent shrink-0" />
                    <span className="text-white/80 text-xs">{pt}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact"
                className="w-full py-3 bg-accent text-dark text-xs font-heading font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
                Start Name Change <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/FAQPage">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark">Frequently Asked Questions</h2>
            <p className="text-muted mt-4">All you need to know about changing your company name in India via INC-24.</p>
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
