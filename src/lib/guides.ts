// ─────────────────────────────────────────────────────────────────────────────
// Step-by-step "how to" guides.
//
// Content is written by our CA/CS team and cross-checked against the official
// portals cited in each guide's `sources`. Figures (govt fees, thresholds,
// timelines) are indicative and reviewed on the `updated` date — always confirm
// on the linked government portal before filing.
// ─────────────────────────────────────────────────────────────────────────────

export interface GuideStep {
  title: string;
  detail: string;
}

export interface GuideSource {
  label: string;
  href: string;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  updated: string;
  /** lucide-react icon name */
  icon: string;
  /** tailwind classes for the card icon chip */
  accent: string;
  intro: string;
  /** quick-glance facts rendered as a stat strip */
  keyFacts: { label: string; value: string }[];
  steps: GuideStep[];
  documents?: string[];
  tips?: string[];
  faqs?: { q: string; a: string }[];
  sources: GuideSource[];
  relatedService?: { label: string; href: string };
}

export const GUIDE_CATEGORIES = [
  "Company Registration",
  "GST",
  "Income Tax",
  "Trademark & IP",
  "Startup & MSME",
  "Licenses",
] as const;

export const GUIDES: Guide[] = [
  // ── 1. Pvt Ltd in Delhi ─────────────────────────────────────────────────
  {
    slug: "register-private-limited-company-delhi",
    title: "How to Register a Private Limited Company in Delhi",
    excerpt:
      "The full SPICe+ walkthrough — from DSC and name reservation to Certificate of Incorporation, PAN, TAN and GST — for founders incorporating in Delhi NCR.",
    category: "Company Registration",
    difficulty: "Intermediate",
    readTime: "9 min read",
    updated: "Jul 2026",
    icon: "Building2",
    accent: "bg-blue-50 text-blue-600 border-blue-100",
    intro:
      "A Private Limited Company in Delhi is registered entirely online through the MCA's SPICe+ portal — the same single web form handles name reservation, incorporation, PAN, TAN, EPFO, ESIC, professional tax and a company bank account. Companies with a registered office in Delhi fall under the jurisdiction of the Registrar of Companies (RoC), Delhi & Haryana. Here is exactly how the process runs, what it costs, and where founders most often get stuck.",
    keyFacts: [
      { label: "Timeline", value: "7–12 working days" },
      { label: "Govt filing", value: "SPICe+ (INC-32)" },
      { label: "Min. directors", value: "2 (1 resident)" },
      { label: "Min. capital", value: "No minimum" },
      { label: "RoC jurisdiction", value: "Delhi & Haryana" },
    ],
    steps: [
      {
        title: "Obtain Digital Signature Certificates (DSC)",
        detail:
          "Every proposed director and subscriber signs SPICe+ digitally, so each needs a Class 3 DSC from a licensed Certifying Authority. Turnaround is usually same-day with video KYC. Keep PAN and Aadhaar handy — the name and DOB on the DSC must match MCA records exactly.",
      },
      {
        title: "Reserve the company name (SPICe+ Part A)",
        detail:
          "Propose up to two names with the '...Private Limited' suffix. The name must not be identical or too similar to an existing company or a registered trademark, and must avoid restricted words ('National', 'Bank', 'Stock Exchange', etc.) unless approved. Run a Company Name Search and a trademark check first — a rejected name forfeits the ₹1,000 reservation fee.",
      },
      {
        title: "Prepare MOA, AOA and the registered-office proof",
        detail:
          "Draft the Memorandum (e-MOA / INC-33) and Articles (e-AOA / INC-34) defining your objects and internal rules. For the Delhi registered office you need a recent electricity bill (not older than 2 months) plus a rent agreement and a No-Objection Certificate (NOC) from the property owner.",
      },
      {
        title: "File SPICe+ Part B with linked forms",
        detail:
          "Complete Part B with director/subscriber details, capital structure and registered office, then attach the linked forms: AGILE-PRO-S (GST, EPFO, ESIC, professional tax, bank account), e-MOA and e-AOA. INC-9 (declaration) is auto-generated. Pay MCA fees and stamp duty and submit.",
      },
      {
        title: "Receive the Certificate of Incorporation",
        detail:
          "On approval the RoC issues the Certificate of Incorporation (COI) carrying your CIN, along with company PAN and TAN. DINs are allotted to directors who did not already hold one (max 3 via SPICe+).",
      },
      {
        title: "Complete post-incorporation formalities",
        detail:
          "Open the current account, deposit the subscribed capital and file INC-20A (declaration of commencement of business) within 180 days. Hold the first board meeting within 30 days and appoint an auditor within 30 days.",
      },
    ],
    documents: [
      "PAN & Aadhaar of every director and shareholder",
      "Passport-size photographs",
      "Latest electricity bill of the registered office (Delhi)",
      "Rent agreement + NOC from the property owner",
      "Email ID and mobile number (OTP-verified) for each director",
      "For foreign nationals: notarised & apostilled passport and address proof",
    ],
    tips: [
      "Delhi stamp duty on incorporation is modest, but total MCA fees scale with authorised capital — most founders start at ₹1 lakh authorised capital for practical banking reasons.",
      "Book the registered office NOC before you file — a missing owner NOC is the single most common Delhi rejection reason.",
      "Reserve the name and register the matching trademark in parallel; a company name does not by itself give you brand rights.",
    ],
    faqs: [
      {
        q: "Can I register a Delhi company at my home address?",
        a: "Yes. A residential address is fully acceptable as a registered office provided you have an electricity bill and a signed NOC from the owner. You can shift to a commercial address later via INC-22.",
      },
      {
        q: "Do both directors need to be in Delhi?",
        a: "No. Directors can be anywhere in India (or abroad). Only the registered office must be in Delhi to fall under RoC Delhi & Haryana, and at least one director must be resident in India (182+ days).",
      },
    ],
    sources: [
      { label: "MCA — SPICe+ portal", href: "https://www.mca.gov.in/" },
      { label: "MCA — Company incorporation services", href: "https://www.mca.gov.in/content/mca/global/en/mca/e-filing/company-forms-download.html" },
    ],
    relatedService: { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
  },

  // ── 2. GST for freelancers ──────────────────────────────────────────────
  {
    slug: "gst-registration-for-freelancers",
    title: "GST Registration for Freelancers & Consultants",
    excerpt:
      "When a freelancer must register for GST, when it's optional, how the ₹20 lakh threshold and export (LUT) rules work, and the exact portal steps.",
    category: "GST",
    difficulty: "Beginner",
    readTime: "7 min read",
    updated: "Jul 2026",
    icon: "Receipt",
    accent: "bg-green-50 text-green-600 border-green-100",
    intro:
      "Freelancers, consultants and independent professionals supplying services are treated like any other service provider under GST. Whether you must register depends on your annual turnover, whether you work across state lines, and whether your clients are overseas. Getting this right early avoids penalties and lets you claim input credit — here's the complete picture.",
    keyFacts: [
      { label: "Threshold (services)", value: "₹20 lakh / year" },
      { label: "Special-category states", value: "₹10 lakh / year" },
      { label: "Registration form", value: "GST REG-01" },
      { label: "Govt fee", value: "₹0 (free)" },
      { label: "Time to GSTIN", value: "3–7 working days" },
    ],
    steps: [
      {
        title: "Check whether you actually need to register",
        detail:
          "Registration is mandatory once your aggregate turnover of services in a financial year crosses ₹20 lakh (₹10 lakh in special-category states). It is also mandatory — regardless of turnover — if you make inter-state taxable supplies to businesses, or supply through certain e-commerce operators. Purely intra-state services below the threshold are exempt.",
      },
      {
        title: "Decide if voluntary registration helps you",
        detail:
          "Many freelancers register voluntarily below the threshold to claim input tax credit on software, laptops and subscriptions, and because larger clients prefer GST-registered vendors. The trade-off is monthly/quarterly return filing even in months with no income.",
      },
      {
        title: "Gather your documents",
        detail:
          "You'll need PAN, Aadhaar, a photograph, proof of your place of business (electricity bill + NOC or rent agreement), bank details (cancelled cheque or statement) and, for a proprietor, no separate constitution document is required.",
      },
      {
        title: "File Part A and Part B of GST REG-01",
        detail:
          "On the GST portal, submit Part A (PAN, mobile, email) to get a Temporary Reference Number (TRN), then complete Part B with business details, place of business, bank account and authorised signatory. Authenticate via Aadhaar e-KYC to skip physical verification in most cases.",
      },
      {
        title: "Receive your GSTIN and set up invoicing",
        detail:
          "Once approved you receive a 15-digit GSTIN. Start issuing GST-compliant tax invoices showing your GSTIN, HSN/SAC code (usually 9983/9984/9987 for professional services), and CGST+SGST (intra-state) or IGST (inter-state) at 18%.",
      },
      {
        title: "If you export services, file a LUT",
        detail:
          "Freelancers billing overseas clients in foreign currency are making a 'zero-rated' export of services. File a Letter of Undertaking (LUT) once a year to export without charging IGST, and claim refunds of input credit. Without a LUT you'd have to pay IGST and claim it back.",
      },
    ],
    documents: [
      "PAN and Aadhaar of the proprietor",
      "Passport-size photograph",
      "Proof of place of business (electricity bill + NOC / rent agreement)",
      "Bank account proof (cancelled cheque or statement)",
      "Digital signature or Aadhaar-linked mobile for e-verification",
    ],
    tips: [
      "Most professional services are taxed at 18% GST (SAC 9983/9987). Charge it separately on your invoice rather than absorbing it.",
      "Export of services to overseas clients is zero-rated — file a LUT each financial year so you don't block working capital in IGST.",
      "Once registered, file GSTR-1 and GSTR-3B even for nil months; late filing attracts a per-day late fee plus interest.",
    ],
    faqs: [
      {
        q: "I earn under ₹20 lakh from Indian clients only — do I need GST?",
        a: "No, not if all your clients are in your own state and turnover is below ₹20 lakh. But the moment you invoice a client in another state, registration becomes mandatory regardless of turnover.",
      },
      {
        q: "Are export earnings from foreign clients counted in the ₹20 lakh?",
        a: "Yes, exports count toward aggregate turnover. If foreign billing alone pushes you over ₹20 lakh you must register, then use a LUT to export tax-free.",
      },
    ],
    sources: [
      { label: "GST Portal — Registration", href: "https://www.gst.gov.in/" },
      { label: "CBIC — GST", href: "https://cbic-gst.gov.in/" },
    ],
    relatedService: { label: "GST Registration Service", href: "/services/gst-registration" },
  },

  // ── 3. LLP registration ─────────────────────────────────────────────────
  {
    slug: "register-llp-in-india",
    title: "How to Register an LLP in India",
    excerpt:
      "Register a Limited Liability Partnership through the FiLLiP form — name reservation, DPIN, incorporation and the LLP agreement — with lower compliance than a company.",
    category: "Company Registration",
    difficulty: "Intermediate",
    readTime: "8 min read",
    updated: "Jul 2026",
    icon: "Users",
    accent: "bg-indigo-50 text-indigo-600 border-indigo-100",
    intro:
      "A Limited Liability Partnership gives you the liability protection of a company with a much lighter compliance load — no mandatory audit below ₹40 lakh turnover / ₹25 lakh contribution, no board meetings, and only two annual filings. It's the default choice for professional services firms and partnerships that don't plan to raise equity. Registration runs through the MCA's FiLLiP web form.",
    keyFacts: [
      { label: "Timeline", value: "10–15 working days" },
      { label: "Incorporation form", value: "FiLLiP" },
      { label: "Min. partners", value: "2 designated" },
      { label: "Audit needed above", value: "₹40L turnover" },
      { label: "Annual filings", value: "Form 11 & Form 8" },
    ],
    steps: [
      {
        title: "Get DSC and DPIN for designated partners",
        detail:
          "Each designated partner needs a Class 3 Digital Signature Certificate. A Designated Partner Identification Number (DPIN) can be applied for within the FiLLiP form itself (up to two partners), so a separate DIR-3 is usually unnecessary.",
      },
      {
        title: "Reserve the LLP name (RUN-LLP or via FiLLiP)",
        detail:
          "Reserve a unique name ending in 'LLP'. Check it against existing companies, LLPs and trademarks. You can reserve through RUN-LLP separately or propose the name directly inside FiLLiP.",
      },
      {
        title: "File the FiLLiP incorporation form",
        detail:
          "Submit FiLLiP with partner details, registered office, capital contribution and the subscriber sheet. PAN and TAN are allotted along with incorporation. On approval the RoC issues a Certificate of Incorporation with the LLPIN.",
      },
      {
        title: "Draft and file the LLP Agreement (Form 3)",
        detail:
          "Within 30 days of incorporation, execute the LLP Agreement on stamp paper (stamp duty varies by state and contribution) defining profit-sharing, rights and duties, then file it in Form 3. Missing this deadline triggers a daily penalty.",
      },
      {
        title: "Set up compliance",
        detail:
          "Open a bank account, apply for GST if required, and diarise the two annual filings: Form 11 (Annual Return, due 30 May) and Form 8 (Statement of Account & Solvency, due 30 October).",
      },
    ],
    documents: [
      "PAN & Aadhaar of all partners",
      "Passport-size photographs",
      "Registered office proof (electricity bill + NOC / rent agreement)",
      "Proof of identity/address of partners",
      "Consent of partners and subscriber sheet",
    ],
    tips: [
      "File the LLP Agreement (Form 3) within 30 days — this is the most-missed deadline and the penalty accrues daily.",
      "An LLP cannot issue equity or ESOPs; if you expect to raise VC money in 2–3 years, register a Private Limited Company instead.",
      "Below ₹40 lakh turnover and ₹25 lakh contribution, no statutory audit is required — a major cost saving over a company.",
    ],
    faqs: [
      {
        q: "Can an LLP be converted to a Private Limited Company later?",
        a: "Yes, an LLP can convert to a company, but it adds cost and paperwork. If fundraising is likely, it's cheaper to start as a company.",
      },
    ],
    sources: [
      { label: "MCA — LLP e-filing", href: "https://www.mca.gov.in/content/mca/global/en/mca/llp-e-filing.html" },
    ],
    relatedService: { label: "LLP Registration Service", href: "/services/llp-registration" },
  },

  // ── 4. Trademark ────────────────────────────────────────────────────────
  {
    slug: "trademark-registration-step-by-step",
    title: "Trademark Registration in India: Step by Step",
    excerpt:
      "Search, classify, file TM-A, respond to objections and secure your ™ then ® — the complete brand-protection process under the Trade Marks Act, 1999.",
    category: "Trademark & IP",
    difficulty: "Intermediate",
    readTime: "8 min read",
    updated: "Jul 2026",
    icon: "ShieldCheck",
    accent: "bg-amber-50 text-amber-600 border-amber-100",
    intro:
      "A trademark protects your brand name, logo or slogan and gives you the exclusive right to use it for your goods or services. Registration is handled by the Trade Marks Registry (IP India). You can start using the ™ symbol as soon as you file, and the ® symbol once the mark is registered — a process that takes anywhere from 12 to 24 months if unopposed.",
    keyFacts: [
      { label: "Filing form", value: "TM-A" },
      { label: "Govt fee (individual/startup)", value: "₹4,500 / class" },
      { label: "Govt fee (company)", value: "₹9,000 / class" },
      { label: "Validity", value: "10 years (renewable)" },
      { label: "NICE classes", value: "45 total" },
    ],
    steps: [
      {
        title: "Run a trademark search",
        detail:
          "Before filing, search the IP India public database to confirm no identical or deceptively similar mark already exists in your class. A clean search dramatically reduces the risk of objection or opposition. Use our free Trademark Class Finder to identify the right class first.",
      },
      {
        title: "Identify the correct class(es)",
        detail:
          "Goods and services are grouped into 45 NICE classes. You register in the class(es) that match your business — e.g. Class 9 for software, Class 35 for retail/advertising, Class 42 for IT services. Filing in the wrong class leaves you unprotected where it matters.",
      },
      {
        title: "File the TM-A application",
        detail:
          "Submit TM-A online with the mark (wordmark and/or logo), applicant details, class, and date of first use (or 'proposed to be used'). Startups, individuals and MSMEs pay the concessional ₹4,500 per class; others pay ₹9,000 per class.",
      },
      {
        title: "Examination and the Examination Report",
        detail:
          "The Registry examines the application (usually within a few months) and may raise objections under Sections 9 (descriptive/non-distinctive) or 11 (conflict with earlier marks). You get 30 days to file a written reply, with a hearing if needed.",
      },
      {
        title: "Publication in the Trademark Journal",
        detail:
          "Once objections are cleared, the mark is published in the Trademark Journal for a 4-month opposition window during which third parties can oppose it. If no opposition (or you win it), the mark proceeds to registration.",
      },
      {
        title: "Registration certificate and renewal",
        detail:
          "The Registry issues the Registration Certificate; you may now use ®. Protection lasts 10 years and is renewable indefinitely in 10-year blocks via Form TM-R.",
      },
    ],
    documents: [
      "The wordmark and/or logo (image file)",
      "Applicant identity & address proof",
      "Udyam/MSME or DPIIT certificate (to claim the concessional fee)",
      "Form TM-48 (Power of Attorney) if filing through an agent",
      "Proof of first use, if claiming a prior use date",
    ],
    tips: [
      "File under the individual/startup fee (₹4,500) by attaching your Udyam or DPIIT recognition — half the cost of the company fee.",
      "Register the wordmark and the logo separately for the strongest protection; a combined mark only protects the exact combination.",
      "You can use ™ immediately on filing — you don't have to wait for registration to signal your claim.",
    ],
    faqs: [
      {
        q: "How long before I can use the ® symbol?",
        a: "Only after the mark is fully registered — typically 12–24 months if there are no objections or oppositions. Until then, use ™.",
      },
    ],
    sources: [
      { label: "IP India — Trademarks", href: "https://ipindia.gov.in/trade-marks.htm" },
      { label: "IP India — Public Search", href: "https://tmrsearch.ipindia.gov.in/tmrpublicsearch/" },
    ],
    relatedService: { label: "Trademark Registration Service", href: "/services/trademark-registration" },
  },

  // ── 5. MSME / Udyam ─────────────────────────────────────────────────────
  {
    slug: "udyam-msme-registration",
    title: "MSME (Udyam) Registration: A Complete Guide",
    excerpt:
      "Get your free Udyam certificate in minutes using just Aadhaar and PAN — and unlock priority-sector lending, subsidies and protection against delayed payments.",
    category: "Startup & MSME",
    difficulty: "Beginner",
    readTime: "6 min read",
    updated: "Jul 2026",
    icon: "Award",
    accent: "bg-rose-50 text-rose-600 border-rose-100",
    intro:
      "Udyam Registration is the government's free, Aadhaar-based recognition for Micro, Small and Medium Enterprises. It replaces the old Udyog Aadhaar and self-declares your enterprise's status based on investment and turnover. Benefits include collateral-free bank loans under priority-sector lending, interest and electricity subsidies, tender preferences, and legal protection against delayed buyer payments.",
    keyFacts: [
      { label: "Cost", value: "Free (govt)" },
      { label: "Portal", value: "udyamregistration.gov.in" },
      { label: "Micro", value: "≤₹1cr / ≤₹5cr turnover" },
      { label: "Small", value: "≤₹10cr / ≤₹50cr turnover" },
      { label: "Medium", value: "≤₹50cr / ≤₹250cr turnover" },
    ],
    steps: [
      {
        title: "Confirm your classification",
        detail:
          "MSME status is based on two composite criteria — investment in plant, machinery or equipment, and annual turnover. The higher of the two determines your category (Micro, Small or Medium). Both manufacturing and service enterprises use the same limits.",
      },
      {
        title: "Keep Aadhaar and PAN ready",
        detail:
          "Registration is fully paperless and self-declared. You need the Aadhaar of the proprietor (or a partner/director/karta), the enterprise PAN, and — for the turnover figure — GSTIN where applicable. Data is auto-pulled from PAN and GST databases.",
      },
      {
        title: "File on the Udyam portal",
        detail:
          "On udyamregistration.gov.in, choose 'New Registration', verify Aadhaar via OTP, enter enterprise details (name, type, address, bank, activity NIC code) and submit. No documents need to be uploaded.",
      },
      {
        title: "Download the Udyam certificate",
        detail:
          "You receive a permanent Udyam Registration Number (URN) and an e-certificate with a dynamic QR code. There is no renewal — the registration is lifetime, though details auto-update from linked PAN/GST data each year.",
      },
    ],
    tips: [
      "Udyam registration is completely free on the official government portal — never pay a 'processing fee' to third-party lookalike sites.",
      "Registered MSMEs can invoke the MSME Samadhaan mechanism to recover payments delayed beyond 45 days, with interest.",
      "Attach your Udyam certificate when filing a trademark to claim the concessional ₹4,500-per-class fee.",
    ],
    faqs: [
      {
        q: "Do traders qualify for Udyam?",
        a: "Yes — wholesale and retail traders are now eligible for Udyam registration (for the purpose of priority-sector lending), in addition to manufacturers and service enterprises.",
      },
    ],
    sources: [
      { label: "Udyam Registration Portal", href: "https://udyamregistration.gov.in/" },
      { label: "Ministry of MSME", href: "https://msme.gov.in/" },
    ],
    relatedService: { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
  },

  // ── 6. Startup India DPIIT ──────────────────────────────────────────────
  {
    slug: "startup-india-dpiit-recognition",
    title: "Startup India (DPIIT) Recognition Explained",
    excerpt:
      "Qualify for DPIIT recognition to access the 3-year tax holiday (80-IAC), angel-tax exemption, self-certification and government tenders — here's how to apply.",
    category: "Startup & MSME",
    difficulty: "Intermediate",
    readTime: "7 min read",
    updated: "Jul 2026",
    icon: "Rocket",
    accent: "bg-purple-50 text-purple-600 border-purple-100",
    intro:
      "DPIIT (Department for Promotion of Industry and Internal Trade) recognition is the gateway to the Startup India programme's benefits: a potential 3-year income-tax holiday under Section 80-IAC, exemption from angel tax, self-certification under labour and environment laws, faster IP processing with fee rebates, and easier access to government tenders and funds. Recognition itself is free and granted on the Startup India portal.",
    keyFacts: [
      { label: "Cost", value: "Free" },
      { label: "Portal", value: "startupindia.gov.in" },
      { label: "Age limit", value: "≤10 years old" },
      { label: "Turnover limit", value: "≤₹100 cr / year" },
      { label: "Eligible entities", value: "Pvt Ltd / LLP / Regd. Partnership" },
    ],
    steps: [
      {
        title: "Check eligibility",
        detail:
          "Your entity must be a Private Limited Company, LLP or Registered Partnership, incorporated within the last 10 years, with annual turnover never exceeding ₹100 crore in any year, and working toward innovation, improvement or a scalable business model with employment/wealth-creation potential. It must not be formed by splitting up an existing business.",
      },
      {
        title: "Register your entity first",
        detail:
          "DPIIT recognition sits on top of an incorporated entity — so you must already have a company or LLP. If you haven't incorporated yet, do that first.",
      },
      {
        title: "Create a Startup India profile",
        detail:
          "Sign up on startupindia.gov.in and complete your startup profile with entity details, directors/partners, and a short description of how your business is innovative or scalable.",
      },
      {
        title: "Apply for DPIIT recognition",
        detail:
          "Submit the recognition application with your Certificate of Incorporation, PAN, and a write-up (or pitch deck / website / video) demonstrating innovation and scalability. There is no fee.",
      },
      {
        title: "Receive the recognition certificate",
        detail:
          "On approval you get a DPIIT Recognition Number and certificate. You can then separately apply for the Section 80-IAC tax holiday and angel-tax (Section 56) exemption through the portal, which go to an inter-ministerial board.",
      },
    ],
    tips: [
      "DPIIT recognition and the 80-IAC tax holiday are two separate approvals — recognition is near-automatic; the tax holiday is assessed by a board and is more selective.",
      "Recognised startups get an 80% rebate on patent fees and 50% on trademark fees, plus fast-tracked examination.",
      "Angel-tax exemption (Section 56(2)(viib)) shields eligible share-premium funding from being taxed as income — file the declaration after recognition.",
    ],
    faqs: [
      {
        q: "Does DPIIT recognition automatically give me a tax holiday?",
        a: "No. Recognition unlocks the ability to apply for the Section 80-IAC 3-year tax holiday, but that exemption is granted separately by an inter-ministerial board and is not guaranteed.",
      },
    ],
    sources: [
      { label: "Startup India Portal", href: "https://www.startupindia.gov.in/" },
      { label: "DPIIT", href: "https://dpiit.gov.in/" },
    ],
    relatedService: { label: "Startup India (DPIIT) Service", href: "/services/startup-india" },
  },

  // ── 7. ITR salaried ─────────────────────────────────────────────────────
  {
    slug: "file-income-tax-return-salaried",
    title: "How to File Your Income Tax Return (Salaried)",
    excerpt:
      "Pick the right ITR form, reconcile Form 16 with AIS/26AS, choose old vs new regime, and e-verify — a clean walkthrough of filing your ITR for AY 2026–27.",
    category: "Income Tax",
    difficulty: "Beginner",
    readTime: "7 min read",
    updated: "Jul 2026",
    icon: "IndianRupee",
    accent: "bg-teal-50 text-teal-600 border-teal-100",
    intro:
      "For most salaried individuals, filing an income-tax return is straightforward once your documents reconcile. The key decisions are which ITR form applies, whether the new tax regime (now the default) or the old regime saves you more, and making sure the TDS in your Form 16 matches the AIS and Form 26AS. Filing on time preserves your ability to carry losses forward and avoids late fees under Section 234F.",
    keyFacts: [
      { label: "Usual due date", value: "31 July (non-audit)" },
      { label: "Common form", value: "ITR-1 / ITR-2" },
      { label: "Default regime", value: "New regime" },
      { label: "Std. deduction (new)", value: "₹75,000" },
      { label: "Late fee (234F)", value: "up to ₹5,000" },
    ],
    steps: [
      {
        title: "Collect Form 16, AIS and Form 26AS",
        detail:
          "Get Form 16 from your employer (Parts A & B). Download the Annual Information Statement (AIS) and Form 26AS from the income-tax portal — these show all reported income and TDS. Reconcile the three; mismatches are the top reason returns get flagged.",
      },
      {
        title: "Choose the right ITR form",
        detail:
          "ITR-1 (Sahaj) covers salary, one house property and other income up to ₹50 lakh with no capital gains. If you have capital gains, more than one property, or foreign assets, you'll need ITR-2. Freelance/business income needs ITR-3 or ITR-4.",
      },
      {
        title: "Compare old vs new regime",
        detail:
          "The new regime is the default and offers wider slabs with a ₹75,000 standard deduction and a full rebate up to ₹12 lakh income — but few other deductions. The old regime lets you claim 80C, 80D, HRA and home-loan interest. Run both through our Income Tax Calculator to see which is lower for you.",
      },
      {
        title: "Fill and validate the return",
        detail:
          "Log in to the e-filing portal, select the form and assessment year, and use the pre-filled data (salary, TDS, interest). Add any income not pre-filled, claim eligible deductions, and let the portal compute tax, rebate and any refund or balance due.",
      },
      {
        title: "Pay any balance tax and submit",
        detail:
          "If tax is payable, pay it via the e-Pay Tax facility and enter the challan details. Submit the return.",
      },
      {
        title: "E-verify within 30 days",
        detail:
          "A return is not valid until verified. E-verify instantly via Aadhaar OTP, net banking or a pre-validated bank/demat account within 30 days of filing — otherwise the return is treated as not filed.",
      },
    ],
    documents: [
      "Form 16 from your employer",
      "AIS and Form 26AS (from the e-filing portal)",
      "Bank interest certificates / savings & FD interest",
      "Proofs for 80C, 80D, HRA, home-loan interest (if old regime)",
      "PAN linked with Aadhaar, and a pre-validated bank account for refunds",
    ],
    tips: [
      "Reconcile Form 16 with AIS before filing — claiming TDS that isn't in 26AS delays your refund.",
      "The new regime is now the default; you must actively opt for the old regime if it's more beneficial for you.",
      "E-verification is mandatory within 30 days — set a reminder, because an unverified return counts as not filed.",
    ],
    faqs: [
      {
        q: "Which regime is better for me?",
        a: "It depends on your deductions. If your 80C, 80D, HRA and home-loan claims are large, the old regime often wins; if you claim little, the new regime's wider slabs and ₹75,000 standard deduction usually win. Compare both in our Income Tax Calculator.",
      },
    ],
    sources: [
      { label: "Income Tax e-Filing Portal", href: "https://www.incometax.gov.in/" },
      { label: "Income Tax Department", href: "https://incometaxindia.gov.in/" },
    ],
    relatedService: { label: "Income Tax Return Filing", href: "/services/income-tax-return" },
  },

  // ── 8. IEC ──────────────────────────────────────────────────────────────
  {
    slug: "import-export-code-iec-registration",
    title: "Import Export Code (IEC) Registration",
    excerpt:
      "The one-time 10-digit code every importer and exporter needs — apply on the DGFT portal in a day, and remember the annual update rule.",
    category: "Licenses",
    difficulty: "Beginner",
    readTime: "5 min read",
    updated: "Jul 2026",
    icon: "Plane",
    accent: "bg-cyan-50 text-cyan-600 border-cyan-100",
    intro:
      "An Import Export Code (IEC) is a 10-digit code issued by the Directorate General of Foreign Trade (DGFT) that any business must have to import into or export out of India. It's a one-time registration with lifetime validity — but since 2021 it must be updated (confirmed) on the DGFT portal every year between April and June, or it gets deactivated.",
    keyFacts: [
      { label: "Issuing authority", value: "DGFT" },
      { label: "Govt fee", value: "₹500" },
      { label: "Validity", value: "Lifetime" },
      { label: "Annual update", value: "Apr–Jun (mandatory)" },
      { label: "Time to issue", value: "1–2 working days" },
    ],
    steps: [
      {
        title: "Register on the DGFT portal",
        detail:
          "Create an account on dgft.gov.in using your PAN, mobile and email. The IEC is PAN-based — one IEC per PAN.",
      },
      {
        title: "Complete the IEC application (ANF-2A)",
        detail:
          "Fill in entity details, address, and bank account, and upload the required proofs. Aadhaar/DSC is used to sign the application electronically.",
      },
      {
        title: "Pay the fee and submit",
        detail:
          "Pay the ₹500 government fee online. The IEC is typically auto-generated and issued within a day or two of a clean application.",
      },
      {
        title: "Update the IEC every year",
        detail:
          "Even with no changes, confirm/update your IEC details on the DGFT portal every year between April and June. Failure deactivates the IEC until you update it.",
      },
    ],
    documents: [
      "PAN of the business/proprietor",
      "Proof of establishment/incorporation or registration",
      "Address proof of the business premises",
      "Cancelled cheque / bank certificate of the current account",
      "Aadhaar or DSC of the signatory",
    ],
    tips: [
      "No import or export can clear customs without an IEC — get it before your first shipment.",
      "Diarise the April–June annual update; a deactivated IEC stops your consignments at customs.",
      "Exporters of services claiming benefits under FTP schemes still generally need an IEC even if payments are in foreign exchange.",
    ],
    sources: [
      { label: "DGFT Portal", href: "https://www.dgft.gov.in/" },
    ],
    relatedService: { label: "IEC Registration Service", href: "/services/iec-registration" },
  },

  // ── 9. Proprietorship to Pvt Ltd ────────────────────────────────────────
  {
    slug: "convert-proprietorship-to-private-limited",
    title: "Converting a Proprietorship to a Private Limited Company",
    excerpt:
      "Ready to raise funds or limit liability? Here's how to migrate a sole proprietorship into a Private Limited Company, and the tax and transfer points to watch.",
    category: "Company Registration",
    difficulty: "Advanced",
    readTime: "8 min read",
    updated: "Jul 2026",
    icon: "TrendingUp",
    accent: "bg-orange-50 text-orange-600 border-orange-100",
    intro:
      "As a proprietorship grows, the lack of limited liability and the inability to raise equity start to bite. Converting to a Private Limited Company gives you a separate legal identity, limited liability, perpetual succession and the ability to bring in investors. Technically this isn't a 'conversion' of the same entity — you incorporate a new company and transfer the business into it, taking care to meet the conditions that keep the transfer tax-neutral.",
    keyFacts: [
      { label: "Route", value: "New Pvt Ltd + takeover" },
      { label: "Core form", value: "SPICe+ (INC-32)" },
      { label: "Takeover clause", value: "In the MOA objects" },
      { label: "Tax neutrality", value: "Sec 47(xiv) conditions" },
      { label: "Timeline", value: "2–4 weeks" },
    ],
    steps: [
      {
        title: "Incorporate a new Private Limited Company",
        detail:
          "Register a fresh Pvt Ltd via SPICe+ with the proprietor as a director/shareholder. Critically, include an object clause in the MOA authorising the takeover of the existing proprietorship business.",
      },
      {
        title: "Execute a takeover / slump-sale agreement",
        detail:
          "Sign an agreement transferring all assets and liabilities of the proprietorship to the new company as a going concern, in exchange for shares issued to the proprietor.",
      },
      {
        title: "Meet the Section 47(xiv) tax-neutrality conditions",
        detail:
          "To avoid capital-gains tax on the transfer, all assets and liabilities must pass to the company, the proprietor must hold at least 50% of the shares for 5 years, and the consideration must be solely shares (no cash). Getting any of these wrong can trigger tax.",
      },
      {
        title: "Migrate registrations and licences",
        detail:
          "Apply for fresh GST registration in the company's name, update the bank account, transfer or re-apply for licences (FSSAI, IEC, MSME/Udyam, professional tax), and inform customers and vendors of the new billing entity.",
      },
      {
        title: "Handle transition-period accounting",
        detail:
          "Close the proprietorship's books, file its final ITR and GST returns, and open the company's books from the takeover date. Keep the takeover valuation and agreement on file for both income-tax and MCA records.",
      },
    ],
    documents: [
      "Existing proprietorship's financials and asset list",
      "PAN & Aadhaar of the proprietor (as first director)",
      "Registered office proof for the new company",
      "Takeover / business-transfer agreement",
      "Valuation of assets being transferred",
    ],
    tips: [
      "The 5-year, 50%-shareholding condition under Section 47(xiv) is easy to breach accidentally — don't dilute below 50% too soon after conversion.",
      "GST does not transfer automatically; apply for fresh registration in the company's name and update all invoicing.",
      "Time the conversion at a financial-year boundary where possible to simplify the final proprietorship return and opening company accounts.",
    ],
    sources: [
      { label: "MCA — SPICe+ portal", href: "https://www.mca.gov.in/" },
      { label: "Income Tax — Section 47", href: "https://incometaxindia.gov.in/" },
    ],
    relatedService: { label: "Proprietorship to Pvt Ltd Conversion", href: "/services/proprietorship-to-pvtltd" },
  },
];
