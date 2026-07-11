import type { CityLandingConfig } from "@/components/sections/CityLandingPage";

// Shared building blocks reused (with city-specific framing) across pages.
const pvtSteps = [
  { title: "Free consultation & name check", body: "We understand your business, run a name availability check on the MCA portal and reserve your company name via RUN/SPICe+ Part A." },
  { title: "Digital Signatures (DSC) & DIN", body: "We obtain Class-3 DSCs for all directors and apply for Director Identification Numbers as part of the incorporation." },
  { title: "Drafting MOA, AOA & SPICe+ filing", body: "Our CS team drafts your Memorandum and Articles of Association and files the SPICe+ Part B, AGILE-PRO and INC-9 forms with the Registrar of Companies." },
  { title: "PAN, TAN & Certificate of Incorporation", body: "On approval, the MCA issues your Certificate of Incorporation along with company PAN and TAN — usually in 7–10 working days." },
  { title: "Post-registration compliance", body: "We help you open a current account, issue share certificates, and stay on top of the mandatory annual ROC and tax filings." },
];

const gstSteps = [
  { title: "Eligibility & document review", body: "We confirm whether GST registration is mandatory or voluntary for you and collect the required documents." },
  { title: "Application filing (REG-01)", body: "We file your GST REG-01 application on the GST portal with your PAN, business proof and bank details." },
  { title: "ARN & department verification", body: "You receive an Application Reference Number (ARN); we respond to any clarification the GST officer raises." },
  { title: "GSTIN issued", body: "Your 15-digit GSTIN and GST registration certificate are issued, typically within 2–7 working days." },
  { title: "Post-registration setup", body: "We guide you on invoicing, GST rates, input tax credit and your first return filing." },
];

const tmSteps = [
  { title: "Free trademark search", body: "We run a public search across the relevant class to check whether your brand name or logo is available." },
  { title: "Class selection & documentation", body: "We identify the correct Nice classification(s) for your goods/services and prepare the TM-A application." },
  { title: "Filing & TM number", body: "We file with the Trademark Registry and you can start using the ™ symbol immediately." },
  { title: "Examination & objection handling", body: "If the examiner raises an objection, our attorneys draft and file the reply and represent you at hearings." },
  { title: "Publication & registration", body: "After the journal publication and opposition window, your trademark is registered and you can use the ® symbol." },
];

const pvtDocs = [
  "PAN and Aadhaar of all directors/shareholders",
  "Passport-size photographs",
  "Address proof (bank statement / utility bill, latest)",
  "Registered office proof (rent agreement + NOC or ownership proof)",
  "Latest electricity/utility bill of the office premises",
  "Email ID and mobile number of each director",
];

const gstDocs = [
  "PAN of the business or proprietor",
  "Aadhaar of the proprietor/partners/directors",
  "Business registration proof (incorporation/partnership deed)",
  "Address proof of place of business",
  "Bank account statement / cancelled cheque",
  "Passport-size photographs and digital signature (where applicable)",
];

const tmDocs = [
  "Name and address of the applicant",
  "Logo/wordmark in the exact form to be registered",
  "List of goods/services and the trademark class",
  "Udyam/MSME or startup certificate (for reduced fees, if any)",
  "Power of Attorney (TM-48) — we prepare this for you",
  "Proof of prior use, if the mark is already in use",
];

const related = [
  { label: "GST Registration", href: "/services/gst-registration" },
  { label: "Trademark Registration", href: "/services/trademark-registration" },
  { label: "Private Limited Company", href: "/services/private-limited-company" },
  { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
];

export const CITY_PAGES: Record<string, { meta: { title: string; description: string }; config: CityLandingConfig }> = {
  "private-limited-company-registration-delhi": {
    meta: {
      title: "Private Limited Company Registration in Delhi | CA",
      description: "Register a Private Limited company in Delhi in 7–10 days. CA-led, 100% online, fixed transparent pricing. Free consultation — call or WhatsApp today.",
    },
    config: {
      path: "/services/private-limited-company-registration-delhi",
      h1: "Private Limited Company Registration in Delhi",
      serviceLabel: "Private Limited Company registration",
      city: "Delhi",
      moneyPageHref: "/services/private-limited-company",
      waText: "Hi, I want to register a Private Limited company in Delhi.",
      intro: [
        "Looking to register a Private Limited Company in Delhi? Company Avenue Advisory is a CA & CS-led firm based in Janakpuri, West Delhi that has helped hundreds of founders across Delhi NCR incorporate their companies quickly and correctly.",
        "A Private Limited Company is the most popular structure for startups and growing businesses because it offers limited liability, easy fundraising, and strong credibility with banks, investors and clients. We handle the entire MCA process end-to-end so you can focus on your business.",
        "Everything is 100% online with fixed, transparent pricing — no hidden government-fee surprises. Most Delhi incorporations are completed in 7–10 working days.",
      ],
      included: [
        "Company name reservation (SPICe+ Part A)",
        "2 Class-3 Digital Signature Certificates (DSC)",
        "Director Identification Numbers (DIN)",
        "Drafting of MOA & AOA",
        "Certificate of Incorporation, company PAN & TAN",
        "Bank account opening assistance & startup compliance guidance",
      ],
      steps: pvtSteps,
      documents: pvtDocs,
      localNote:
        "Our office at Jaina Tower 1, District Center, Janakpuri makes us easily reachable for founders across West Delhi, Dwarka, Rajouri Garden, Uttam Nagar and the wider Delhi NCR. Whether you're a first-time founder in Janakpuri or scaling a startup in Connaught Place, our team offers in-person or fully online support.",
      faqs: [
        { question: "How long does Private Limited registration take in Delhi?", answer: "For most Delhi clients, incorporation is completed in 7–10 working days once all documents and digital signatures are ready." },
        { question: "How many directors do I need?", answer: "A Private Limited Company needs a minimum of two directors and two shareholders. At least one director must be a resident of India." },
        { question: "Is there a minimum capital requirement?", answer: "No. There is no mandatory minimum paid-up capital — you can start a Private Limited Company with any amount of capital." },
        { question: "Can I register the company at my home address in Delhi?", answer: "Yes. You can use a residential address as the registered office with a utility bill and a No-Objection Certificate from the owner." },
        { question: "What does the fee include?", answer: "Our fixed price covers professional fees, DSCs, DIN, MOA/AOA drafting and filing. Government stamp duty varies by state and authorised capital and is billed at actuals." },
      ],
      related,
    },
  },

  "gst-registration-delhi": {
    meta: {
      title: "GST Registration in Delhi | Get GSTIN Online Fast",
      description: "Get GST registration in Delhi with expert CAs. 100% online, document help, fast GSTIN in 2–7 days, transparent pricing. Free consultation — WhatsApp us.",
    },
    config: {
      path: "/services/gst-registration-delhi",
      h1: "GST Registration in Delhi",
      serviceLabel: "GST registration",
      city: "Delhi",
      moneyPageHref: "/services/gst-registration",
      waText: "Hi, I want GST registration in Delhi.",
      intro: [
        "Need GST registration in Delhi? Company Avenue Advisory helps traders, service providers, e-commerce sellers and startups across Delhi obtain their GSTIN quickly and without paperwork stress.",
        "GST registration is mandatory once your turnover crosses the threshold (₹40 lakh for goods, ₹20 lakh for services in most states), and for e-commerce sellers and inter-state suppliers from day one. Voluntary registration is also popular for claiming input tax credit and looking credible to B2B clients.",
        "Our CAs handle the full application, respond to any officer queries, and get your GSTIN issued — usually in 2–7 working days.",
      ],
      included: [
        "Eligibility assessment (mandatory vs voluntary)",
        "Document preparation & verification",
        "GST REG-01 application filing",
        "ARN tracking & clarification handling",
        "GSTIN & GST certificate delivery",
        "Guidance on invoicing, rates & first return",
      ],
      steps: gstSteps,
      documents: gstDocs,
      localNote:
        "From wholesalers in Chandni Chowk to service startups in Nehru Place and online sellers across Delhi NCR, we make GST registration painless. Our Janakpuri office serves clients across West Delhi, Dwarka and Gurgaon in person or fully online.",
      faqs: [
        { question: "How long does GST registration take in Delhi?", answer: "Typically 2–7 working days after submission, subject to Aadhaar authentication and any clarification the GST officer may request." },
        { question: "Is GST registration mandatory for my Delhi business?", answer: "It is mandatory if your turnover exceeds the threshold, if you sell inter-state, or if you sell through an e-commerce platform. Otherwise you can register voluntarily to claim input tax credit." },
        { question: "What is the government fee for GST registration?", answer: "There is no government fee for GST registration. You only pay our professional service fee." },
        { question: "Do I need a commercial office for GST in Delhi?", answer: "No. You can register from a residential or shared address with valid address proof and a No-Objection Certificate." },
        { question: "What happens after I get my GSTIN?", answer: "You must issue GST-compliant invoices and file periodic returns. We also offer monthly GST return filing so you stay compliant." },
      ],
      related,
    },
  },

  "trademark-registration-delhi": {
    meta: {
      title: "Trademark Registration in Delhi | Protect Brand",
      description: "Trademark registration in Delhi with expert attorneys. Free class search, filing & objection support. CA & CS led, transparent pricing. Free consultation.",
    },
    config: {
      path: "/services/trademark-registration-delhi",
      h1: "Trademark Registration in Delhi",
      serviceLabel: "Trademark registration",
      city: "Delhi",
      moneyPageHref: "/services/trademark-registration",
      waText: "Hi, I want trademark registration in Delhi.",
      intro: [
        "Protect your brand with trademark registration in Delhi through Company Avenue Advisory. A registered trademark gives you exclusive rights to your brand name or logo and the ability to take legal action against copycats.",
        "We handle everything — a free trademark search, correct class selection, filing of the TM-A application, and full objection and opposition support if any issues arise.",
        "You can start using the ™ symbol as soon as we file, and the ® symbol once the mark is registered. Our attorneys keep the process transparent from search to certificate.",
      ],
      included: [
        "Free comprehensive trademark search",
        "Correct Nice class identification",
        "TM-A application drafting & filing",
        "Right to use the ™ symbol immediately",
        "Examination report & objection reply support",
        "Hearing representation & registration certificate",
      ],
      steps: tmSteps,
      documents: tmDocs,
      localNote:
        "Delhi is home to thousands of D2C brands, agencies and manufacturers — and brand imitation is common. Our Janakpuri-based IP team helps businesses across Delhi NCR secure their marks and defend them, in person or entirely online.",
      faqs: [
        { question: "How long does trademark registration take?", answer: "You can use the ™ symbol within days of filing. Full registration typically takes 6–18 months depending on whether objections or oppositions are raised." },
        { question: "How much does a trademark cost in Delhi?", answer: "Government fees are ₹4,500 per class for individuals/startups/MSMEs and ₹9,000 per class otherwise, plus our professional fee. We help startups claim the reduced rate." },
        { question: "What if my trademark gets objected?", answer: "Our attorneys draft and file the objection reply and represent you at the hearing — this is included in our objection-handling support." },
        { question: "Can I register a logo and a name together?", answer: "Yes, you can file them as a combined mark, or separately for stronger protection. We advise the best strategy during your free consultation." },
        { question: "How many classes do I need?", answer: "It depends on the goods and services you offer. We identify the exact class(es) during the free search so you don't overpay or under-protect." },
      ],
      related,
    },
  },

  "company-registration-janakpuri": {
    meta: {
      title: "Company Registration in Janakpuri, West Delhi | CA",
      description: "Company registration in Janakpuri, West Delhi by a local CA firm. Pvt Ltd, LLP, OPC & GST — 100% online, fixed pricing. Visit our Jaina Tower office.",
    },
    config: {
      path: "/services/company-registration-janakpuri",
      h1: "Company Registration in Janakpuri, West Delhi",
      serviceLabel: "Company registration",
      city: "Janakpuri",
      moneyPageHref: "/services/private-limited-company",
      waText: "Hi, I want company registration in Janakpuri.",
      intro: [
        "Company Avenue Advisory is a Chartered Accountant firm located right in Janakpuri, West Delhi — at Jaina Tower 1, District Center. If you're a founder in Janakpuri, Tilak Nagar, Uttam Nagar or Dwarka, we're your local partner for company registration.",
        "We register Private Limited Companies, LLPs, One Person Companies and Partnership firms, and handle GST, trademark and ongoing compliance — all under one roof.",
        "Being local means you can walk into our office for a face-to-face consultation, or get everything done 100% online. Either way, pricing is fixed and transparent.",
      ],
      included: [
        "Choice of structure: Pvt Ltd, LLP, OPC or Partnership",
        "Name reservation & digital signatures",
        "Complete MCA incorporation filing",
        "Certificate of Incorporation, PAN & TAN",
        "GST registration add-on available",
        "Ongoing accounting & ROC compliance",
      ],
      steps: pvtSteps,
      documents: pvtDocs,
      localNote:
        "Our Jaina Tower office is minutes from Janakpuri West and District Centre metro stations, making us the convenient choice for entrepreneurs across West Delhi. We've registered companies for retailers, consultants, D2C brands and IT startups throughout the area.",
      faqs: [
        { question: "Do you have an office in Janakpuri?", answer: "Yes — we're at 209, Jaina Tower 1, District Center, Janakpuri, New Delhi 110058. You're welcome to visit for a free consultation." },
        { question: "Which company type is best for me?", answer: "It depends on your goals. A Private Limited Company suits startups seeking funding; an LLP suits professional firms; an OPC suits solo founders. We advise the right fit during your consultation." },
        { question: "Can everything be done online?", answer: "Yes. While our office is in Janakpuri, the entire registration can be completed online with e-signatures if you prefer." },
        { question: "How long does registration take?", answer: "A Private Limited Company or LLP is typically registered in 7–10 working days once documents are ready." },
        { question: "Do you also handle GST and accounting?", answer: "Yes. We offer GST registration, monthly filing, bookkeeping and annual ROC compliance so you have a single local partner." },
      ],
      related,
    },
  },

  "gst-registration-dwarka": {
    meta: {
      title: "GST Registration in Dwarka, Delhi | Fast GSTIN",
      description: "GST registration in Dwarka, Delhi with expert CAs. 100% online, document help, GSTIN in 2–7 days, transparent pricing. Free consultation — WhatsApp us.",
    },
    config: {
      path: "/services/gst-registration-dwarka",
      h1: "GST Registration in Dwarka",
      serviceLabel: "GST registration",
      city: "Dwarka",
      moneyPageHref: "/services/gst-registration",
      waText: "Hi, I want GST registration in Dwarka.",
      intro: [
        "Company Avenue Advisory provides fast, hassle-free GST registration for businesses in Dwarka and the surrounding sub-city. From shopkeepers and restaurants to online sellers and service providers, we get your GSTIN issued without the paperwork headache.",
        "GST registration is required once you cross the turnover threshold, sell inter-state, or list on e-commerce platforms. Voluntary registration also helps you claim input tax credit and win B2B clients.",
        "Our CAs manage the entire GST REG-01 application, respond to any officer queries, and deliver your GSTIN — usually within 2–7 working days.",
      ],
      included: [
        "Eligibility assessment for your Dwarka business",
        "Document preparation & verification",
        "GST REG-01 application filing",
        "ARN tracking & clarification handling",
        "GSTIN & certificate delivery",
        "Invoicing, rate & first-return guidance",
      ],
      steps: gstSteps,
      documents: gstDocs,
      localNote:
        "Dwarka's fast-growing commercial hubs — from the sector markets to the office complexes near Dwarka Sector 21 — are home to thousands of small businesses that need GST compliance. Our nearby Janakpuri office makes us a convenient partner for Dwarka entrepreneurs, in person or online.",
      faqs: [
        { question: "How fast can I get GST registration in Dwarka?", answer: "Usually 2–7 working days after we submit your application, subject to Aadhaar authentication and any clarification requests." },
        { question: "Is there any government fee?", answer: "No. GST registration has no government fee — you pay only our professional service charge." },
        { question: "Can I register from a shop or home in Dwarka?", answer: "Yes. A residential or commercial address with valid proof and a No-Objection Certificate is acceptable." },
        { question: "Do online sellers in Dwarka need GST?", answer: "Yes. If you sell through Amazon, Flipkart, Meesho or any e-commerce platform, GST registration is mandatory regardless of turnover." },
        { question: "Will you help with monthly returns too?", answer: "Yes. After registration we offer affordable monthly and quarterly GST return filing." },
      ],
      related,
    },
  },

  "company-registration-gurgaon": {
    meta: {
      title: "Company Registration in Gurgaon | Pvt Ltd & LLP",
      description: "Company registration in Gurgaon (Gurugram) by expert CAs. Pvt Ltd, LLP, OPC & GST — 100% online, 7–10 days, transparent pricing. Free consultation today.",
    },
    config: {
      path: "/services/company-registration-gurgaon",
      h1: "Company Registration in Gurgaon",
      serviceLabel: "Company registration",
      city: "Gurgaon",
      moneyPageHref: "/services/private-limited-company",
      waText: "Hi, I want company registration in Gurgaon.",
      intro: [
        "Gurgaon (Gurugram) is one of India's biggest startup and corporate hubs — and Company Avenue Advisory helps founders here register their companies quickly and correctly. Whether you're launching a tech startup in Cyber City or a services firm in Sohna Road, we've got you covered.",
        "We register Private Limited Companies, LLPs and One Person Companies, and handle GST, trademark and compliance so your Gurgaon business is investor-ready from day one.",
        "The entire process is 100% online with fixed, transparent pricing, and most incorporations complete in 7–10 working days.",
      ],
      included: [
        "Structure advice: Pvt Ltd, LLP or OPC",
        "Name reservation & digital signatures",
        "Complete MCA incorporation filing",
        "Certificate of Incorporation, PAN & TAN",
        "GST & startup registration add-ons",
        "Ongoing accounting & ROC compliance",
      ],
      steps: pvtSteps,
      documents: pvtDocs,
      localNote:
        "From DLF Cyber City and Golf Course Road to Manesar's manufacturing belt, Gurgaon's businesses trust experienced CAs for incorporation and compliance. We serve Gurgaon founders entirely online, with document pickup and video consultations for a seamless experience.",
      faqs: [
        { question: "Can you register a company in Gurgaon fully online?", answer: "Yes. The whole process — name approval, DSC, filing and incorporation — is done online, so you never need to visit a government office." },
        { question: "Which is better for a Gurgaon startup, Pvt Ltd or LLP?", answer: "Startups planning to raise VC funding should choose a Private Limited Company. Professional and services firms often prefer an LLP for lower compliance. We advise the right fit during your consultation." },
        { question: "How long does it take?", answer: "Typically 7–10 working days for a Private Limited Company once all documents and signatures are ready." },
        { question: "Do I need a Gurgaon office address to register?", answer: "You need a valid registered office address in Gurgaon (Haryana) with address proof and a No-Objection Certificate. A residential address is acceptable." },
        { question: "Do you handle Haryana state compliance too?", answer: "Yes. We handle professional tax, GST and other Haryana-specific registrations along with your incorporation." },
      ],
      related,
    },
  },

  "company-registration-noida": {
    meta: {
      title: "Company Registration in Noida | Pvt Ltd & LLP",
      description: "Company registration in Noida by expert CAs. Pvt Ltd, LLP, OPC & GST — 100% online, 7–10 days, fixed transparent pricing. Free consultation — call today.",
    },
    config: {
      path: "/services/company-registration-noida",
      h1: "Company Registration in Noida",
      serviceLabel: "Company registration",
      city: "Noida",
      moneyPageHref: "/services/private-limited-company",
      waText: "Hi, I want company registration in Noida.",
      intro: [
        "Company Avenue Advisory helps entrepreneurs across Noida and Greater Noida register their companies with zero hassle. From IT startups in Sector 62 to traders in Noida's industrial sectors, we handle the complete incorporation process.",
        "We register Private Limited Companies, LLPs and One Person Companies, and provide GST, trademark and ongoing compliance so your Noida business starts on the right footing.",
        "Everything is 100% online with fixed pricing and no hidden fees. Most companies are incorporated in 7–10 working days.",
      ],
      included: [
        "Structure advice: Pvt Ltd, LLP or OPC",
        "Name reservation & digital signatures",
        "Complete MCA incorporation filing",
        "Certificate of Incorporation, PAN & TAN",
        "GST & startup registration add-ons",
        "Ongoing accounting & ROC compliance",
      ],
      steps: pvtSteps,
      documents: pvtDocs,
      localNote:
        "Noida and Greater Noida are fast becoming a preferred base for startups and manufacturers thanks to affordable office space and strong infrastructure. We serve Noida founders across all sectors online, with video consultations and doorstep document collection where needed.",
      faqs: [
        { question: "Can I register a Noida company without visiting your office?", answer: "Yes. The entire process is online — name approval, digital signatures, filing and incorporation — so you can register from anywhere in Noida." },
        { question: "How long does company registration take in Noida?", answer: "A Private Limited Company or LLP is typically registered in 7–10 working days once documents are ready." },
        { question: "Do I need a physical office in Noida?", answer: "You need a registered office address in Noida (Uttar Pradesh) with address proof and a No-Objection Certificate. A residential address works too." },
        { question: "Which structure is best for a Noida startup?", answer: "Private Limited is ideal for funding-focused startups; LLP suits services firms; OPC suits solo founders. We recommend the right one in your free consultation." },
        { question: "Do you handle UP state registrations?", answer: "Yes. We handle GST, professional tax and other Uttar Pradesh registrations alongside your incorporation." },
      ],
      related,
    },
  },
};
