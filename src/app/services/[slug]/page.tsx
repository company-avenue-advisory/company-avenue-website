import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle, Clock, FileText, ArrowRight, Phone, Star,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";

// Full service details for every service
const serviceDetails: Record<string, {
  tagline: string;
  benefits: string[];
  requirements: string[];
  documents: string[];
  timeline: string;
  startingPrice: string;
  faqs: { q: string; a: string }[];
}> = {
  "private-limited-company": {
    tagline: "India's most preferred business structure for startups and growth-focused companies.",
    benefits: [
      "Limited liability protection for all shareholders",
      "Separate legal identity from its owners",
      "Easy access to funding and venture capital",
      "Higher credibility with clients and partners",
      "Employee stock option schemes (ESOPs) possible",
      "Perpetual existence — company survives owner changes",
    ],
    requirements: [
      "Minimum 2 directors (max 15)",
      "Minimum 2 shareholders (max 200)",
      "At least one director must be an Indian resident",
      "Registered office address in India",
    ],
    documents: [
      "PAN Card of all directors and shareholders",
      "Aadhaar Card / Voter ID / Passport",
      "Passport-size photographs",
      "Utility bill (electricity/water) for registered office",
      "No-objection certificate from property owner",
    ],
    timeline: "7–10 business days",
    startingPrice: "₹6,999",
    faqs: [
      { q: "Can I convert my proprietorship to a Private Limited Company?", a: "Yes. We handle the conversion process including asset transfer and business migration." },
      { q: "Do I need a physical office for company registration?", a: "You need a registered address in India, which can be your home address initially." },
    ],
  },
  "gst-registration": {
    tagline: "Get your GSTIN quickly and operate with full tax compliance from day one.",
    benefits: [
      "Legal authorization to collect GST from customers",
      "Claim Input Tax Credit (ITC) on purchases",
      "Access to inter-state trade without restrictions",
      "Enhanced credibility with B2B customers",
      "Required for e-commerce selling",
      "Enables government tender participation",
    ],
    requirements: [
      "PAN of the business / proprietor / directors",
      "Aadhaar-linked mobile number",
      "Business address in India",
      "Bank account in business name",
    ],
    documents: [
      "PAN Card of business owner / company",
      "Aadhaar Card",
      "Business address proof",
      "Bank statement / cancelled cheque",
      "Photographs of business premises",
    ],
    timeline: "3–5 business days",
    startingPrice: "₹1,499",
    faqs: [
      { q: "Who must mandatorily register for GST?", a: "Businesses with turnover above ₹40L (goods) or ₹20L (services), all e-commerce sellers, and inter-state suppliers." },
      { q: "Can I register voluntarily if my turnover is below the threshold?", a: "Yes. Voluntary registration is beneficial if you want to claim ITC or supply to B2B customers who prefer GST-registered vendors." },
    ],
  },
  "partnership-firm": {
    tagline: "Register a traditional partnership firm — the simplest multi-owner business structure in India.",
    benefits: [
      "Simple and low-cost registration process",
      "Flexible profit-sharing arrangements",
      "Easy dissolution and reconstitution",
      "No mandatory audit below ₹1 crore turnover",
      "Tax advantages — income taxed in hands of partners",
      "Flexible management structure",
    ],
    requirements: [
      "Minimum 2 partners, maximum 20 partners",
      "Partnership deed (written, signed by all partners)",
      "All partners must be competent to contract (18+)",
      "Registered office address in India",
    ],
    documents: [
      "PAN Card of all partners",
      "Aadhaar Card of all partners",
      "Passport-size photographs",
      "Partnership deed (notarized)",
      "Office address proof (utility bill + NOC)",
    ],
    timeline: "7–10 business days",
    startingPrice: "₹3,999",
    faqs: [
      { q: "Is registration of partnership firm mandatory?", a: "No, registration is optional but strongly recommended as unregistered firms cannot sue third parties or partners in court." },
      { q: "What is the maximum number of partners?", a: "For general partnerships: 20 partners maximum (10 for banking). For professional firms (CA, advocates): no limit under respective professional acts." },
    ],
  },
  "sole-proprietorship": {
    tagline: "The simplest business form — own, operate, and control your entire business as a single owner.",
    benefits: [
      "Zero separate registration fees for the entity itself",
      "Complete ownership and decision-making control",
      "Simple ITR filing (ITR-3 or ITR-4 Sugam)",
      "No mandatory audit below ₹1 crore turnover",
      "Easy bank current account opening",
      "Maximum privacy — no public disclosure",
    ],
    requirements: [
      "PAN Card of the proprietor",
      "Business address (own or rented)",
      "GST registration if turnover exceeds threshold",
      "Trade license / FSSAI if applicable to your trade",
    ],
    documents: [
      "PAN Card",
      "Aadhaar Card",
      "Business address proof",
      "Bank statement / cancelled cheque",
      "Utility bill for business address",
    ],
    timeline: "3–7 business days",
    startingPrice: "₹1,999",
    faqs: [
      { q: "Does a sole proprietorship need separate registration?", a: "There is no single registration for a proprietorship. It is established through a combination of GST, Udyam (MSME), trade license, and a current bank account." },
      { q: "What are the tax obligations?", a: "Income is reported in your personal ITR (ITR-3 or ITR-4). Tax slabs apply as per individual income tax rates." },
    ],
  },
  "section-8-company": {
    tagline: "Incorporate a non-profit company for charitable, educational, or social objectives under Section 8 of Companies Act, 2013.",
    benefits: [
      "Tax exemption under Section 12A and 80G",
      "No minimum paid-up capital requirement",
      "Higher credibility than trusts or societies",
      "Eligible for government grants and CSR funding",
      "Perpetual succession — continues independent of members",
      "FCRA registration eligible for foreign donations",
    ],
    requirements: [
      "Minimum 2 directors (Indian resident)",
      "Minimum 2 shareholders",
      "Objects must be charitable/educational/social",
      "No profit distribution to members",
    ],
    documents: [
      "PAN and Aadhaar of all directors",
      "Memorandum of Association (objects clause)",
      "Articles of Association",
      "Declaration by directors",
      "CA certificate of estimated income/expenditure",
    ],
    timeline: "15–20 business days",
    startingPrice: "₹9,999",
    faqs: [
      { q: "Can directors of Section 8 company receive salary?", a: "Yes, directors can receive reasonable remuneration for services rendered, approved by the board. However, they cannot receive dividends or profit-sharing." },
      { q: "What is the difference between Section 8 company, trust, and society?", a: "Section 8 company is incorporated under Companies Act (regulated by MCA) with higher credibility. Trusts are governed by the Indian Trusts Act and societies by the Societies Registration Act. Section 8 has better governance structure and is preferred for accessing CSR funds." },
    ],
  },
  "nidhi-company": {
    tagline: "Register a Nidhi Company to cultivate savings habits and facilitate lending among members.",
    benefits: [
      "Accepts deposits from members (unlike regular companies)",
      "Lends money to members at reasonable interest rates",
      "Exempt from most RBI regulations (non-banking category)",
      "Community trust and mutual benefit focus",
      "Government recognition under Companies Act",
      "Tax advantages similar to companies",
    ],
    requirements: [
      "Minimum 7 members at incorporation (200 within 1 year)",
      "Minimum 3 directors",
      "Net Owned Funds of at least ₹10 lakhs within 1 year",
      "Objects exclusively for Nidhi activities",
    ],
    documents: [
      "PAN and Aadhaar of all directors and members",
      "MOA with Nidhi objects",
      "AOA",
      "Office address proof",
    ],
    timeline: "30–45 business days (including 1-year Nidhi status)",
    startingPrice: "₹14,999",
    faqs: [
      { q: "What is the 200-member requirement?", a: "Within 1 year of incorporation, a Nidhi Company must have at least 200 members. This is a mandatory post-incorporation requirement and failure to comply attracts penalties." },
      { q: "Can Nidhi Company operate like a bank?", a: "No. Nidhi companies can only accept deposits and lend to their own members. They cannot accept deposits from or lend to the public at large." },
    ],
  },
  "producer-company": {
    tagline: "Incorporate a Producer Company for farmers, artisans, and primary producers with cooperative advantages.",
    benefits: [
      "Tax exemption on mutual business activities",
      "Direct market access — sell without intermediaries",
      "Collective bargaining power for input prices",
      "Access to institutional credit (NABARD, banks)",
      "Eligible for FPO government support and grants",
      "Limited liability for all producer-members",
    ],
    requirements: [
      "Minimum 10 individual producers OR 2 producer institutions",
      "Minimum 5 directors",
      "All members must be primary producers",
      "Objects must be for production, harvesting, procurement, or selling of primary produce",
    ],
    documents: [
      "PAN and Aadhaar of all members and directors",
      "MOA with producer company objects",
      "Proof of occupation as primary producer",
      "Office address proof",
    ],
    timeline: "20–30 business days",
    startingPrice: "₹12,999",
    faqs: [
      { q: "What is an FPO and how is it related to Producer Company?", a: "FPO (Farmer Producer Organisation) is a term used by the government for producer companies formed by farmers. Registered producer companies are eligible for FPO support, including grants up to ₹15 lakh from the government scheme." },
      { q: "Can non-farmers become members?", a: "No. Membership is restricted to primary producers (farmers, fishermen, artisans, etc.) and producer institutions. Non-producers cannot be members." },
    ],
  },
  "indian-subsidiary": {
    tagline: "Establish your international business presence in India with a 100% foreign-owned subsidiary company.",
    benefits: [
      "Up to 100% FDI allowed under automatic route in most sectors",
      "Operate under Indian law with full business capability",
      "Hire Indian employees, own property, open bank accounts",
      "Repatriation of profits allowed under FEMA",
      "Access to government schemes for companies",
      "Separate legal liability from the foreign parent",
    ],
    requirements: [
      "Minimum 2 directors (at least 1 Indian resident director)",
      "Minimum 2 shareholders",
      "FDI route approval (automatic or government) as applicable",
      "FEMA compliance for share allotment and investment reporting",
    ],
    documents: [
      "Apostilled/notarized ID proof of foreign directors",
      "Passport copies of all foreign directors",
      "Certificate of incorporation of parent foreign company (apostilled)",
      "Board resolution of parent company",
      "India registered office proof",
    ],
    timeline: "15–25 business days",
    startingPrice: "₹24,999",
    faqs: [
      { q: "Which sectors require government approval for FDI?", a: "Sectors requiring government approval include: defence (above 74%), broadcasting, print media, multi-brand retail, satellites, and a few others. Most sectors allow 100% FDI under automatic route." },
      { q: "What is FEMA FC-GPR and when must it be filed?", a: "FC-GPR (Foreign Currency — Gross Provisional Return) must be filed with RBI within 30 days of allotting shares to foreign investors, reporting the foreign investment received." },
    ],
  },
  "branch-office": {
    tagline: "Establish a Branch, Liaison, or Project Office in India as a recognised foreign company presence.",
    benefits: [
      "No equity infusion required — just RBI approval",
      "Simpler structure than setting up a subsidiary",
      "Liaison office can promote parent company and explore market",
      "Branch office can undertake limited commercial activities",
      "Project office for specific contract execution",
      "Recognized foreign entity presence in India",
    ],
    requirements: [
      "Foreign company must have a profitable 5-year track record",
      "RBI approval via AD Category-I Bank",
      "Indian registered address required",
      "Business plan / purpose document",
    ],
    documents: [
      "Parent company registration certificate (apostilled)",
      "MOA/AOA of parent company (apostilled)",
      "3 years audited financial statements of parent",
      "Board resolution to open India office",
      "Indian address proof",
    ],
    timeline: "30–45 business days",
    startingPrice: "₹29,999",
    faqs: [
      { q: "What activities can a Liaison Office undertake?", a: "Liaison Offices can only promote the parent company, exchange information, and act as a communication channel. They cannot earn revenue or undertake commercial activities in India." },
      { q: "Can a Branch Office convert to a subsidiary?", a: "Yes. A Branch Office can be converted into an Indian subsidiary (Private Limited Company) after obtaining necessary approvals from MCA, RBI, and fulfilling FEMA requirements." },
    ],
  },
  "gst-filing": {
    tagline: "Timely and accurate GST return filing to stay compliant and claim maximum Input Tax Credit.",
    benefits: [
      "Avoid late fees (₹50/day) and interest (18% p.a.)",
      "Maximize Input Tax Credit claims",
      "Maintain GSTIN active status",
      "Enable e-way bill generation",
      "Clean GST compliance rating",
      "Accurate GSTR-2A/2B reconciliation",
    ],
    requirements: [
      "Active GSTIN",
      "Monthly sales invoices and purchase invoices",
      "Bank statements for reconciliation",
      "Credit/debit notes if applicable",
    ],
    documents: [
      "GST login credentials",
      "Sales register (invoice-wise)",
      "Purchase register (invoice-wise)",
      "Bank statements",
      "TDS / TCS certificates (if applicable)",
    ],
    timeline: "2–3 business days per return",
    startingPrice: "₹1,499/month",
    faqs: [
      { q: "What GST returns need to be filed?", a: "Regular taxpayers file GSTR-1 (outward supplies), GSTR-3B (tax payment), GSTR-9 (annual return) and GSTR-9C (reconciliation if turnover > ₹5 crore)." },
      { q: "What is the GSTR-2A reconciliation?", a: "GSTR-2A/2B is the auto-populated record of purchases (ITC available). Reconciling with your own purchase register ensures you claim the exact ITC you're entitled to, preventing excess claims and notices." },
    ],
  },
  "gst-amendment": {
    tagline: "Amend your GST registration details or voluntarily cancel your GSTIN with expert compliance support.",
    benefits: [
      "Maintain accurate GST records — avoid mismatches",
      "Avoid notices for incorrect business details",
      "Proper legal address and trade name on GSTIN",
      "Eliminate unnecessary compliance burden (cancellation)",
      "Clean GSTIN status on GST portal",
      "Avoid prosecution for cancelled GSTINs",
    ],
    requirements: [
      "Active GSTIN (for amendment) or valid reason (for cancellation)",
      "Supporting documents for the change",
      "All pending returns must be filed (for cancellation)",
      "Nil tax liability (for cancellation)",
    ],
    documents: [
      "Proof of change (new address / name change docs)",
      "REG-14 form for amendments",
      "REG-16 form for cancellation",
      "Final return data (GSTR-10) for cancellation",
    ],
    timeline: "7–15 business days",
    startingPrice: "₹1,499",
    faqs: [
      { q: "What details can be amended in GST registration?", a: "You can amend business name, address, contact details, bank account, business partners, and authorized signatories. PAN-linked data (like legal name from PAN) cannot be amended — it requires a fresh registration." },
      { q: "What is GSTR-10 (Final Return)?", a: "GSTR-10 is a final return filed after cancellation of GST registration. It captures the stock on hand at the time of cancellation and determines the ITC that must be reversed." },
    ],
  },
  "income-tax-return": {
    tagline: "Expert Income Tax Return filing for individuals, firms, and companies — maximum refunds, zero errors.",
    benefits: [
      "Expert CA preparation ensures maximum deductions claimed",
      "Avoid ₹5,000 late filing fee (after 31 July)",
      "Carry forward capital losses for 8 years",
      "Refund processed faster with correct filing",
      "Required for loan applications and visa applications",
      "Form 16 reconciliation and 26AS matching",
    ],
    requirements: [
      "PAN Card",
      "Bank statement (April to March)",
      "Form 16 (for salaried)",
      "Investment proofs (80C, 80D etc.)",
    ],
    documents: [
      "PAN Card",
      "Aadhaar Card",
      "Form 16 from employer",
      "Bank statements (all accounts)",
      "Investment proofs (LIC, ELSS, PPF, etc.)",
      "Capital gains statements (if any)",
    ],
    timeline: "2–3 business days",
    startingPrice: "₹999",
    faqs: [
      { q: "What is the due date for ITR filing?", a: "For individuals and non-audit cases: 31 July. For businesses requiring tax audit: 31 October. For transfer pricing cases: 30 November." },
      { q: "Can I file ITR after the due date?", a: "Yes, you can file a belated return by 31 December of the assessment year with a late filing fee of ₹5,000 (₹1,000 if income below ₹5 lakh)." },
    ],
  },
  "tds-return": {
    tagline: "Accurate and timely TDS return filing with Form 16/16A generation for all deductors.",
    benefits: [
      "Avoid ₹200/day penalty under Sec 234E",
      "Generate Form 16 for employees and Form 16A for vendors",
      "Prevent 30-40% disallowance of business expenses",
      "Clean 26AS record for all deductees",
      "Avoid prosecution for TDS defaults",
      "Correct TDS credit for deductees",
    ],
    requirements: [
      "Valid TAN (Tax Deduction Account Number)",
      "TDS challan payment receipts",
      "List of all payments with PAN of deductees",
      "Amount of TDS deducted per payment",
    ],
    documents: [
      "TAN certificate",
      "Challan 281 payment receipts",
      "Deductee PAN list with payment details",
      "Salary details (for 24Q)",
      "Vendor payment details (for 26Q)",
    ],
    timeline: "2–3 business days per quarter",
    startingPrice: "₹2,499/quarter",
    faqs: [
      { q: "What are the quarterly due dates for TDS returns?", a: "Q1 (Apr–Jun): 31 July | Q2 (Jul–Sep): 31 October | Q3 (Oct–Dec): 31 January | Q4 (Jan–Mar): 31 May. Late filing fee is ₹200/day under Sec 234E." },
      { q: "What is the difference between Form 24Q and 26Q?", a: "Form 24Q is for TDS on salary payments. Form 26Q is for TDS on non-salary payments (professional fees, rent, commission, interest, contract payments, etc.). Form 27Q is for TDS on payments to non-residents." },
    ],
  },
  "advance-tax": {
    tagline: "Plan and pay advance tax in four instalments — avoid 1% monthly interest under Sec 234B and 234C.",
    benefits: [
      "Avoid 1% per month interest under Sec 234B (shortfall) and 234C (deferment)",
      "Better financial planning and cash flow management",
      "Avoid surprise tax demands at year-end",
      "Maintain clean tax compliance record",
      "Required for correct tax planning for large income earners",
      "Reduces audit risk with proactive compliance",
    ],
    requirements: [
      "Estimated income for the financial year",
      "Previous year ITR for reference",
      "Current year TDS data from 26AS",
      "Challan 280 for payment",
    ],
    documents: [
      "Estimated income computation",
      "Current TDS certificates (Form 26AS)",
      "Previous year ITR",
      "P&L account (if business income)",
    ],
    timeline: "Same-day calculation and payment",
    startingPrice: "₹1,999",
    faqs: [
      { q: "Who is exempt from advance tax?", a: "Senior citizens (60+) with no business income are exempt from advance tax. For all others with tax liability exceeding ₹10,000, advance tax is mandatory." },
      { q: "What are the four advance tax due dates?", a: "15% by 15 June | 45% by 15 September | 75% by 15 December | 100% by 15 March. Interest at 1% per month applies on shortfalls in each instalment." },
    ],
  },
  "tax-audit": {
    tagline: "Mandatory tax audit under Section 44AB — conducted by qualified CAs with full Form 3CD preparation.",
    benefits: [
      "Mandatory statutory compliance — avoid 0.5% of turnover penalty (max ₹1.5 lakh)",
      "Enables carry-forward of business losses",
      "Lends credibility to financial statements",
      "Supports bank loan and credit applications",
      "Required for advance pricing agreements",
      "Ensures correct income disclosure",
    ],
    requirements: [
      "Business turnover exceeding ₹1 crore (or ₹10 crore if 95% cashless transactions)",
      "Professional receipts exceeding ₹50 lakh",
      "Opting out of 44AD/44ADA presumptive scheme with lower income",
      "Books of accounts maintained as per Sec 44AA",
    ],
    documents: [
      "Audited books of accounts",
      "Bank statements (all accounts)",
      "Purchase/sales invoices",
      "Fixed asset register",
      "Salary register",
      "Loan documentation",
    ],
    timeline: "5–10 business days",
    startingPrice: "₹9,999",
    faqs: [
      { q: "What is Form 3CD?", a: "Form 3CD is the statement of particulars required under Sec 44AB. It has 44 clauses covering details of income, expenditure, assets, liabilities, transactions with related parties, TDS compliance, and more. It is signed by the auditing CA." },
      { q: "What is the penalty for not getting tax audit done?", a: "Penalty under Sec 271B is 0.5% of gross turnover or gross receipts, subject to a maximum of ₹1,50,000. The CA's penalty for non-compliance is separate under the CA Act." },
    ],
  },
  "transfer-pricing": {
    tagline: "Arm's length price benchmarking and Form 3CEB certification for international related-party transactions.",
    benefits: [
      "Comply with OECD Transfer Pricing Guidelines",
      "Avoid 2% penalty on TP adjustments",
      "Documented defence against ITAT/CIT(A) scrutiny",
      "Reduce double taxation risk",
      "Support Advance Pricing Agreement (APA) applications",
      "Country-by-Country (CbCR) reporting support",
    ],
    requirements: [
      "International transactions with associated enterprises exceeding ₹1 crore",
      "Domestic specified transactions exceeding ₹20 crore",
      "CA in practice to certify Form 3CEB",
      "Filing with Income Tax Return by 30 November",
    ],
    documents: [
      "Details of all international transactions with associated enterprises",
      "Agreements / contracts with associated enterprises",
      "Financial statements of Indian entity",
      "Functional profile (functions, assets, risks)",
      "Comparable data / industry benchmarks",
    ],
    timeline: "10–15 business days",
    startingPrice: "₹29,999",
    faqs: [
      { q: "What is Form 3CEB?", a: "Form 3CEB is the accountant's report under Sec 92E that certifies the transfer pricing study. It must be filed by a CA in practice and must accompany the ITR when filed." },
      { q: "What is Safe Harbour in Transfer Pricing?", a: "Safe Harbour Rules (CBDT notification) allow certain taxpayers to accept predetermined TP margins without benchmarking. Applicable to IT/ITES, contract R&D, and intra-group loans in specific circumstances." },
    ],
  },
  "roc-compliance": {
    tagline: "Annual ROC compliance for Private Limited companies — AOC-4 and MGT-7 filed before deadlines.",
    benefits: [
      "Avoid ₹100/day late filing penalty on both forms",
      "Maintain active company status with MCA",
      "Enable bank borrowings and government tenders",
      "Prevent director DIN deactivation",
      "Avoid prosecution of directors under Companies Act",
      "Clean ROC record for investor due diligence",
    ],
    requirements: [
      "Audited financial statements (by CA)",
      "Annual General Meeting (AGM) held within 6 months of FY end",
      "Board meeting minutes and resolutions",
      "DIR-3 KYC filed for all directors",
    ],
    documents: [
      "Audited P&L and Balance Sheet",
      "Board meeting minutes",
      "AGM minutes",
      "Auditor's report",
      "List of directors and shareholders",
    ],
    timeline: "3–5 business days",
    startingPrice: "₹4,999/year",
    faqs: [
      { q: "What are the due dates for AOC-4 and MGT-7?", a: "AOC-4 (Financial Statements): within 30 days of AGM (i.e., by 30 October for FY ending March 31). MGT-7 (Annual Return): within 60 days of AGM (i.e., by 29 November). Late fee: ₹100 per day per form." },
      { q: "Does an OPC need to hold an AGM?", a: "No, OPCs are exempt from holding AGMs. The annual return is adopted by the sole member and financial statements are filed within 180 days of financial year end." },
    ],
  },
  "llp-annual-filing": {
    tagline: "Annual LLP compliance — Form 11 (Annual Return) and Form 8 (Statement of Accounts) filed on time.",
    benefits: [
      "Avoid ₹100/day penalty on both LLP forms",
      "Maintain active LLP status with MCA",
      "Keep all Designated Partner Identification Numbers (DPIN) active",
      "Enable bank borrowings",
      "Clean compliance record for partners",
      "Required for income tax audit (if applicable)",
    ],
    requirements: [
      "LLP Agreement",
      "Books of accounts (maintained mandatorily)",
      "Audit required if turnover > ₹40 lakhs or contribution > ₹25 lakhs",
      "All partners' DPIN active (DIR-3 KYC filed)",
    ],
    documents: [
      "LLP Agreement",
      "Annual accounts (P&L + Balance Sheet)",
      "Partners' details and contribution",
      "DPIN of all designated partners",
    ],
    timeline: "3–5 business days",
    startingPrice: "₹3,999/year",
    faqs: [
      { q: "What are Form 11 and Form 8 for LLP?", a: "Form 11 is the Annual Return of an LLP — it contains information about partners, business activities, and annual accounts summary. Form 8 is the Statement of Accounts and Solvency. Both must be filed with MCA every year." },
      { q: "What if an LLP has NIL turnover — must it still file?", a: "Yes. All active LLPs must file Form 11 and Form 8 regardless of turnover or activity. Even dormant LLPs must comply. Non-filing attracts ₹100/day penalty and eventually marks LLP as non-compliant." },
    ],
  },
  "director-kyc": {
    tagline: "Annual DIR-3 KYC filing to keep your Director Identification Number active and compliant.",
    benefits: [
      "Keep DIN status active — prevents DIN deactivation",
      "Avoid ₹5,000 penalty for non-filing",
      "Maintain directorship eligibility",
      "Prevent company's filings from being rejected",
      "Required for all designated partners (DPIN) of LLPs",
      "Enables ongoing banking and business operations",
    ],
    requirements: [
      "Active DIN (or DPIN for LLP partners)",
      "Aadhaar linked to active mobile number (for OTP)",
      "Personal email address",
      "Personal mobile number",
    ],
    documents: [
      "PAN Card",
      "Aadhaar Card (Aadhaar-linked mobile for OTP)",
      "Personal mobile number",
      "Personal email address",
      "Passport (for foreign nationals)",
    ],
    timeline: "Same day",
    startingPrice: "₹699/director",
    faqs: [
      { q: "What is the difference between DIR-3 KYC form and DIR-3 KYC-Web?", a: "For the first-time KYC, a director must file the full DIR-3 KYC form (with digital signature). In subsequent years, if mobile and email are unchanged, a simpler web-based KYC (OTP verification only) can be done. If contact details have changed, a fresh form is needed." },
      { q: "What happens if I miss the 30 September deadline?", a: "After 30 September, DIN is marked DEACTIVATED on MCA. It can be reactivated by filing DIR-3 KYC with a fee of ₹5,000. Until reactivation, any company filing where you are a director will be rejected." },
    ],
  },
  "change-in-directors": {
    tagline: "Add, remove or change directors and shareholders with proper MCA filings and board resolutions.",
    benefits: [
      "Legal transfer of ownership and management",
      "Accurate cap table reflected at MCA",
      "Enable new investment round documentation",
      "Remove resigned/disqualified directors cleanly",
      "ESOP allotment done correctly",
      "Investor confidence from transparent shareholding",
    ],
    requirements: [
      "Board resolution approving the change",
      "New director's consent (DIR-2) and DIN",
      "EGM resolution for share changes (if applicable)",
      "Stamp duty on share transfer deed",
    ],
    documents: [
      "Board/EGM resolution",
      "New director: PAN, Aadhaar, DIN, consent letter",
      "Share transfer: SH-4 form + stamp duty",
      "Share allotment: PAS-3 (return of allotment)",
      "Resignation letter (if removing director)",
    ],
    timeline: "7–10 business days",
    startingPrice: "₹4,999",
    faqs: [
      { q: "How soon must DIR-12 be filed after a director appointment/resignation?", a: "DIR-12 must be filed within 30 days of the date of appointment or resignation. Late filing attracts additional fees and potential penalties." },
      { q: "Can a private limited company have only one director?", a: "No. A Private Limited Company must have a minimum of 2 directors at all times. If one director resigns and the remaining count falls below 2, a new director must be appointed before or simultaneously with the resignation taking effect." },
    ],
  },
  "increase-authorised-capital": {
    tagline: "Increase your company's authorised share capital by filing SH-7 and MGT-14 with MCA.",
    benefits: [
      "Enable share allotment beyond current authorised limit",
      "Facilitate investment/funding rounds",
      "Create ESOP pool for employees",
      "Enable debt-to-equity conversion",
      "Signal growth capacity to investors",
      "Regulatory compliance before allotment",
    ],
    requirements: [
      "EGM with special resolution (or board resolution for OPC)",
      "Altered MOA showing new authorized capital",
      "ROC fee payment based on increased capital slab",
      "MGT-14 filing within 30 days of resolution",
    ],
    documents: [
      "EGM notice and minutes",
      "Board resolution",
      "Altered MOA",
      "Current authorized and paid-up capital details",
      "ROC fee challan",
    ],
    timeline: "7–10 business days",
    startingPrice: "₹4,999",
    faqs: [
      { q: "What ROC fees are applicable for increasing authorised capital?", a: "ROC fees are slab-based depending on the new total authorized capital. For example, additional fees range from ₹500 for capital up to ₹1 lakh, up to ₹56,000 for capital above ₹10 crores. Stamp duty on altered MOA also applies." },
      { q: "Is EGM mandatory for increasing authorized capital?", a: "Yes, for Private Limited Companies, an EGM with an ordinary or special resolution (as per AOA) is required. For OPCs, a board resolution is sufficient since there is only one member." },
    ],
  },
  "registered-office-change": {
    tagline: "Change your company's registered office address legally with INC-22 filing and ROC approval.",
    benefits: [
      "Maintain accurate MCA records",
      "Enable correct address on all official documents",
      "Prevent important notices going to old address",
      "Sync with GST address for ITC matching",
      "Required when moving offices or cities",
      "Avoid penalties for wrong address on record",
    ],
    requirements: [
      "Board resolution approving address change",
      "New utility bill (not older than 2 months)",
      "NOC from property owner",
      "INC-22 must be filed within 30 days of board resolution",
    ],
    documents: [
      "Board resolution",
      "Utility bill of new address (electricity/water — within 2 months)",
      "NOC from property owner",
      "Rent agreement (if rented)",
    ],
    timeline: "7–15 business days",
    startingPrice: "₹3,999",
    faqs: [
      { q: "What if I'm changing the registered office to a different state?", a: "Changing to a different ROC jurisdiction within a state requires Form INC-22. Changing to a completely different state requires NCLT approval via Form INC-23, which is a more complex process taking 2–3 months." },
      { q: "Do I need to update GST separately after changing registered office?", a: "Yes. GST registration change (REG-14) must be filed separately on the GST portal after the ROC address change is approved. The GST and ROC/MCA records must both be updated independently." },
    ],
  },
  "company-name-change": {
    tagline: "Change your company name legally through MCA — with fresh Certificate of Incorporation in new name.",
    benefits: [
      "Align company name with brand or business direction",
      "Fresh Certificate of Incorporation issued",
      "Resolve trademark or naming conflicts",
      "Post-acquisition rebrand execution",
      "Better market positioning",
      "Legal name protection with new identity",
    ],
    requirements: [
      "EGM with special resolution (75% majority)",
      "Name availability check on MCA (RUN service)",
      "New name must comply with MCA naming guidelines",
      "Central Government approval via INC-24",
    ],
    documents: [
      "Board and EGM resolutions",
      "MGT-14 (special resolution filing)",
      "INC-24 application form",
      "Amended MOA and AOA with new name",
    ],
    timeline: "15–25 business days",
    startingPrice: "₹6,999",
    faqs: [
      { q: "How do I know if the new name is available?", a: "You can check MCA's RUN (Reserve Unique Name) service. The name must not be identical to or closely resembling any existing company. Trademark clearance is also strongly recommended before filing." },
      { q: "What needs to be updated after the company name change?", a: "After MCA approval: PAN (new PAN card), TAN, GST registration, bank account name, letterhead, website, contracts, and any licenses. Your COI will have both old and new name until updates are complete." },
    ],
  },
  "company-closure": {
    tagline: "Voluntarily close your company through Fast Track Strike Off (STK-2) — eliminating compliance costs.",
    benefits: [
      "Eliminate annual ROC filing costs (₹5,000–₹15,000/year)",
      "Remove directors' compliance obligations",
      "Clean exit from a non-operational business",
      "Protect directors' personal assets from future liabilities",
      "MCA removes company from active register",
      "DIN of directors remains active after closure",
    ],
    requirements: [
      "Company must have no pending legal proceedings",
      "NIL liabilities (no creditors, no loans)",
      "All pending returns filed (ITR, ROC, GST)",
      "Board and EGM special resolution",
    ],
    documents: [
      "Board and EGM special resolutions",
      "Affidavit — NIL liabilities (by directors)",
      "Latest audited financial statements",
      "All ITR acknowledgments filed",
      "Form STK-2",
    ],
    timeline: "3–6 months (ROC process)",
    startingPrice: "₹9,999",
    faqs: [
      { q: "What is the difference between STK-2 Fast Track Exit and NCLT winding up?", a: "STK-2 (Fast Track) is suitable for companies with NIL liabilities and no operations — it's simpler, cheaper, and faster (3–6 months). NCLT winding up is for companies with assets/liabilities requiring a liquidator, which is more complex and expensive." },
      { q: "Can a struck-off company be revived?", a: "Yes. An application to NCLT under Sec 252 can be made within 20 years of strike-off to restore the company. Restoration is allowed if the company had a legitimate purpose for revival." },
    ],
  },
  "startup-india": {
    tagline: "DPIIT recognition for tax exemptions, funding access, and government schemes for startups.",
    benefits: [
      "3-year income tax exemption (Sec 80-IAC)",
      "Exemption from Angel Tax (Sec 56(2)(viib))",
      "Access to SIDBI Startup Fund (₹10,000 crore corpus)",
      "Fast-track patent examination (80% fee reduction)",
      "Self-certification for 9 labour and environmental laws",
      "Priority in government procurement (no EMD/PBG)",
    ],
    requirements: [
      "Entity must be a Pvt Ltd, LLP, or Partnership Firm",
      "Incorporated/registered less than 10 years ago",
      "Annual turnover not exceeding ₹100 crore in any year",
      "Working towards innovation or improvement of existing solutions",
    ],
    documents: [
      "Certificate of Incorporation / Registration Certificate",
      "Directors/Partners PAN",
      "Entity PAN",
      "GST certificate (if applicable)",
      "Brief description of innovation and business model",
    ],
    timeline: "5–10 business days",
    startingPrice: "₹3,999",
    faqs: [
      { q: "What is the angel tax exemption?", a: "Sec 80-IAC provides 3 consecutive years of 100% income tax holiday on profits for DPIIT-recognized startups within the first 10 years of incorporation." },
      { q: "Does DPIIT recognition guarantee funding?", a: "No, recognition doesn't guarantee funding. But it provides access to government schemes (Startup India Fund, SIDBI), mentorship platforms, and adds credibility with private investors." },
    ],
  },
  "msme-registration": {
    tagline: "Get your Udyam Registration Certificate and unlock priority lending, tender preferences, and government benefits.",
    benefits: [
      "Priority lending at lower interest rates (collateral-free up to ₹10 crore)",
      "Government tender preference and exemption from EMD",
      "Protection against delayed payments (Sec 43B(h) — 45-day payment rule)",
      "Subsidies on ISO certification, technology upgradation, and electricity",
      "Easy access to CGTMSE credit guarantee scheme",
      "1% rebate on patent filing fees",
    ],
    requirements: [
      "Plant and Machinery investment: Micro ≤ ₹1 Cr, Small ≤ ₹10 Cr, Medium ≤ ₹50 Cr",
      "Turnover: Micro ≤ ₹5 Cr, Small ≤ ₹50 Cr, Medium ≤ ₹250 Cr",
      "Self-declaration basis (no documents required for registration)",
      "Aadhaar of proprietor/partner/director for authentication",
    ],
    documents: [
      "PAN Card (mandatory from April 2021)",
      "Aadhaar Card (linked to mobile for OTP)",
      "GSTIN (mandatory if applicable)",
      "Business details (NIC code, investments, turnover)",
    ],
    timeline: "1–2 business days",
    startingPrice: "₹1,499",
    faqs: [
      { q: "Can a Private Limited Company register as MSME?", a: "Yes. Any business entity — proprietorship, partnership, LLP, private limited, public limited, cooperative, trust, or government undertaking — can register as MSME/Udyam if within the investment and turnover thresholds." },
      { q: "What is the Sec 43B(h) delayed payment protection?", a: "From FY 2024–25, buyers who delay payment to MSMEs beyond 45 days cannot claim that payment as a business expense until actually paid. This is a powerful protection mechanism for MSME receivables." },
    ],
  },
  "iec-registration": {
    tagline: "Import Export Code (IEC) registration — mandatory for any business engaged in international trade.",
    benefits: [
      "Legally mandatory for import/export transactions",
      "Required for customs clearance at ports",
      "Enables foreign currency transactions under FEMA",
      "Required for DGFT scheme benefits (MEIS, SEIS, RoDTEP)",
      "Enables collection of foreign remittances",
      "No renewal required — lifetime validity",
    ],
    requirements: [
      "PAN of the business/applicant",
      "Bank account in business name",
      "Business registration proof",
      "Current address proof",
      "Digital signature (for company/LLP applications)",
    ],
    documents: [
      "PAN Card",
      "Aadhaar / Passport",
      "Bank certificate / cancelled cheque",
      "Business registration certificate",
      "Office address proof",
    ],
    timeline: "3–5 business days",
    startingPrice: "₹2,499",
    faqs: [
      { q: "Is IEC mandatory for all importers and exporters?", a: "Yes, except for personal imports/exports for personal use and government departments. All commercial imports and exports require a valid IEC from DGFT." },
      { q: "Can IEC be used for multiple businesses?", a: "Each IEC is linked to a PAN. A single proprietor can have only one IEC (tied to their PAN). Different businesses (company, LLP) with different PANs need separate IECs." },
    ],
  },
  "fssai-license": {
    tagline: "FSSAI Basic, State or Central food license — mandatory for any food business in India.",
    benefits: [
      "Legal authorization to manufacture, store, distribute or sell food",
      "Mandatory for listing on Zomato, Swiggy, Amazon Food",
      "Consumer trust through FSSAI logo display",
      "Avoid penalty upto ₹10 lakh and imprisonment",
      "Enable food export (required by importing countries)",
      "Attract institutional and bulk buyers",
    ],
    requirements: [
      "Basic: Turnover < ₹12 lakhs",
      "State: Turnover ₹12 lakh – ₹20 crore",
      "Central: Turnover > ₹20 crore or multi-state operations",
      "Premises address for inspection (State/Central)",
    ],
    documents: [
      "Business registration proof",
      "PAN and Aadhaar of proprietor/partners/directors",
      "Photographs of food premises",
      "Water test report (for manufacturing)",
      "List of food products",
    ],
    timeline: "5–15 business days (type-dependent)",
    startingPrice: "₹1,999 (Basic)",
    faqs: [
      { q: "What is FOSCOS and how does FSSAI licensing work?", a: "FOSCOS (Food Safety Compliance System) is FSSAI's online portal for applying, renewing, and managing food licenses. Applications are submitted online, fee paid, and subject to inspection (State/Central) before approval." },
      { q: "Do home bakers and cloud kitchens need FSSAI?", a: "Yes. Anyone selling food commercially — including home bakers selling online, cloud kitchens, and tiffin services — requires at minimum a Basic FSSAI registration. There is no exemption for home-based food businesses that sell commercially." },
    ],
  },
  "professional-tax": {
    tagline: "Professional Tax registration for employers and professionals — mandatory in 21 Indian states.",
    benefits: [
      "Legal employer compliance in applicable states",
      "Deductible from income tax under Sec 16(iii)",
      "Required for some states' GST registration",
      "Required for trade license in certain states",
      "Avoid state penalties (10% per month surcharge)",
      "Clean payroll compliance records",
    ],
    requirements: [
      "Applicable only in states with PT law (Maharashtra, Karnataka, West Bengal, Gujarat, etc.)",
      "Generally triggered when salary exceeds ₹15,000/month (varies by state)",
      "Both employer registration and employee enrolment required",
    ],
    documents: [
      "Business registration certificate",
      "PAN of business",
      "List of employees with salary",
      "Bank details",
      "Business address proof",
    ],
    timeline: "3–7 business days",
    startingPrice: "₹1,999",
    faqs: [
      { q: "In which states is professional tax applicable?", a: "Professional Tax is levied in: Maharashtra, Karnataka, West Bengal, Andhra Pradesh, Telangana, Gujarat, Tamil Nadu, Sikkim, Meghalaya, Assam, Kerala, Tripura, Odisha, and Madhya Pradesh. It is NOT applicable in Delhi, UP, Haryana, and several other states." },
      { q: "What is the maximum PT per employee?", a: "The constitutional maximum is ₹2,500 per year per person. This is non-negotiable across all states. The actual amount varies by state and income slab." },
    ],
  },
  "trade-license": {
    tagline: "Municipal Trade License — legal authorization to operate your business from a commercial premises.",
    benefits: [
      "Legal authorization to conduct business from premises",
      "Avoid municipal sealing of business premises",
      "Required for GST registration address verification",
      "Required for bank current account in some states",
      "Customer and landlord confidence",
      "Enable commercial signboard display",
    ],
    requirements: [
      "Commercial or mixed-use premises (residential-only may not qualify)",
      "Business use permitted under zoning regulations",
      "NOC from property owner",
      "Business registration proof",
    ],
    documents: [
      "Premises ownership or rental proof",
      "Owner/proprietor PAN and Aadhaar",
      "Business registration certificate",
      "NOC from landlord (if rented)",
      "Site plan / floor plan",
    ],
    timeline: "7–15 business days",
    startingPrice: "₹1,999",
    faqs: [
      { q: "Who issues trade licenses in India?", a: "Trade Licenses are issued by local municipal bodies — Municipal Corporation (in cities), Municipal Council (in towns), or Gram Panchayat (in villages). The issuing authority varies by location." },
      { q: "Does a trade license need annual renewal?", a: "Yes. Trade licenses must be renewed annually, typically before 31 March of each year. Failure to renew can result in penalties, cancellation, or sealing of premises by the municipal authority." },
    ],
  },
  "drug-license": {
    tagline: "Retail, Wholesale, or Manufacturing Drug License from the State Drug Authority — mandatory for all pharma businesses.",
    benefits: [
      "Legal authorization to sell, distribute, or manufacture drugs",
      "Required for pharmaceutical company dealerships",
      "Enable sale of Schedule H and H1 prescription drugs",
      "Required for online pharmacy operation",
      "Avoid criminal prosecution (up to 5 years imprisonment)",
      "Enable import of drugs under CDSCO approval",
    ],
    requirements: [
      "Qualified pharmacist (B.Pharm/D.Pharm) for retail license",
      "Premises meeting State Drug Control requirements",
      "Cold storage facility for certain drugs (e.g., vaccines)",
      "Separate wholesaler approval for Schedule X drugs",
    ],
    documents: [
      "Pharmacist registration certificate",
      "Educational certificates of pharmacist",
      "Premises ownership/rent proof",
      "Site plan with measurements",
      "PAN and Aadhaar of owner",
      "Cold storage certificate (if applicable)",
    ],
    timeline: "15–30 business days",
    startingPrice: "₹6,999",
    faqs: [
      { q: "What is the difference between Form 20 and Form 21?", a: "Form 20 is the Drug License for retail sale of drugs. Form 21 is for sale of Schedule C and C1 drugs (biological products, blood, vaccines). Most pharmacies require both Form 20 and Form 21." },
      { q: "Can a drug license be used for Ayurvedic/Homeopathic medicines?", a: "Ayurvedic and Unani medicines are governed by the Drugs and Cosmetics Act but under a separate category. A standard allopathic drug license does not cover Ayurvedic drugs — a separate Ayurvedic drug license under state rules is required." },
    ],
  },
  "psara-license": {
    tagline: "PSARA License for private security agencies — mandatory under the Private Security Agencies Regulation Act, 2005.",
    benefits: [
      "Legal authorization to operate private security services",
      "Avoid ₹25,000 penalty and 1-year imprisonment for unlicensed operations",
      "Required by clients (corporates, banks, malls) for contract",
      "Enhances credibility and business opportunities",
      "Access to armed guard deployment",
      "State government recognition",
    ],
    requirements: [
      "Applicant must be an Indian citizen (not foreign national)",
      "No criminal record for promoters",
      "Physical premises for security agency",
      "Training infrastructure (or tie-up with approved institute)",
    ],
    documents: [
      "Business registration certificate",
      "PAN and Aadhaar of promoters",
      "No criminal record certificate (police verification)",
      "Training institute tie-up letter",
      "Bank account proof",
      "Premises address proof",
    ],
    timeline: "30–60 business days",
    startingPrice: "₹9,999",
    faqs: [
      { q: "Is PSARA license state-specific?", a: "Yes. Each state issues its own PSARA license under state rules. A security agency operating in multiple states needs PSARA licenses from each state's District Licensing Authority." },
      { q: "What are the training requirements for security guards?", a: "Guards must complete a 100-hour training from NSDC-recognized or state-approved institutes. Supervisors need 160 hours. Training must cover physical fitness, law, communication, and first aid." },
    ],
  },
  "lmpc-registration": {
    tagline: "LMPC Registration under Legal Metrology Act 2009 — mandatory for importers and re-packers of pre-packaged goods.",
    benefits: [
      "Legal authorization to import and re-pack consumer goods",
      "Required for customs clearance of pre-packaged imports",
      "Avoid seizure of goods and penalties",
      "Enable labelling and re-labelling of imported goods",
      "Required for Amazon / Flipkart vendor compliance",
      "Legal weight and measurement compliance",
    ],
    requirements: [
      "Mandatory for all importers of pre-packaged commodities",
      "Mandatory for re-packers and manufacturers of pre-packaged goods",
      "Physical premises for storage/re-packing",
      "Compliance with LMPC packaging rules",
    ],
    documents: [
      "Business registration certificate",
      "IEC (Import Export Code)",
      "PAN and Aadhaar",
      "Premises address proof",
      "GST certificate",
      "Product list and packaging details",
    ],
    timeline: "15–25 business days",
    startingPrice: "₹4,999",
    faqs: [
      { q: "What is LMPC?", a: "LMPC stands for Legal Metrology Packaged Commodities. The Legal Metrology Act 2009 regulates weights, measures, and pre-packaged commodity rules including MRP declaration, net quantity, expiry date, and manufacturer information on packages." },
      { q: "Is LMPC registration required for e-commerce sellers?", a: "Yes. All e-commerce sellers importing pre-packaged goods or dealing in packaged commodities must comply with LMPC rules. Amazon and Flipkart require LMPC compliance from importers as part of their vendor onboarding." },
    ],
  },
  "trademark-registration": {
    tagline: "Protect your brand name, logo, and identity with trademark registration under the Trade Marks Act, 1999.",
    benefits: [
      "Exclusive ® right to use your brand name/logo in registered classes",
      "Legal protection against infringement and copying",
      "10-year protection (renewable indefinitely)",
      "Enables brand licensing and franchising",
      "Increases business valuation",
      "Required for Amazon Brand Registry and e-commerce brand protection",
    ],
    requirements: [
      "Unique mark (name, logo, or combination) not similar to existing registered marks",
      "Clear identification of goods/services (class selection)",
      "Valid applicant (individual, company, LLP, etc.)",
      "Use in trade or intent to use",
    ],
    documents: [
      "Brand name / logo (TM-A application)",
      "PAN of applicant",
      "Aadhaar / business registration proof",
      "Power of attorney (if filed through agent)",
      "User affidavit (for prior use claims)",
    ],
    timeline: "18–24 months for registration (TM applied status immediate)",
    startingPrice: "₹6,999",
    faqs: [
      { q: "Can I use ™ symbol before registration is complete?", a: "Yes. You can use ™ (Unregistered Trademark) immediately after filing your application. The ® symbol (Registered Trademark) can only be used after the trademark is fully registered." },
      { q: "What are the 45 trademark classes?", a: "Classes 1–34 cover goods (e.g., chemicals, clothing, beverages, etc.) and classes 35–45 cover services (e.g., advertising, education, insurance, software). Most businesses need 1–3 classes. Multi-class discounts are available for startup applicants." },
    ],
  },
  "trademark-objection": {
    tagline: "Expert reply to Trademark Examination Report objections — save your ™ application from being abandoned.",
    benefits: [
      "Save ₹9,000+ filing fee from being wasted",
      "Expert legal arguments for Sec 9 and Sec 11 objections",
      "Prevent trademark from being treated as abandoned",
      "Professional hearing representation",
      "Higher approval probability with expert reply",
      "Citation clearance and consent letter strategy",
    ],
    requirements: [
      "Examination Report must have been received (within ~3–6 months of filing)",
      "Reply must be filed within 30 days of exam report date",
      "Evidence of use / prior use if claiming concurrent use",
    ],
    documents: [
      "Examination Report copy",
      "Invoices / sales records showing trademark use",
      "Packaging samples",
      "Advertising materials",
      "Affidavit of use (if claiming prior use)",
    ],
    timeline: "7–10 business days (from instruction to filing)",
    startingPrice: "₹4,999",
    faqs: [
      { q: "What is Section 9 vs Section 11 objection?", a: "Section 9 (Absolute Grounds): Mark is descriptive, common to the trade, or non-distinctive. Section 11 (Relative Grounds): Mark conflicts with an existing registered or applied-for mark. Each requires different arguments and evidence." },
      { q: "What is a consent letter / No Objection Certificate?", a: "If your mark is cited as conflicting with an earlier registered mark, you can approach the owner of that mark for a consent letter allowing coexistence. Our team can help negotiate and obtain such consent letters where possible." },
    ],
  },
  "trademark-renewal": {
    tagline: "Renew your trademark registration every 10 years to maintain your exclusive brand rights indefinitely.",
    benefits: [
      "Maintain trademark registration for another 10 years",
      "Preserve ® status and exclusive rights",
      "Block new conflicting trademark applications",
      "Continue infringement enforcement rights",
      "Avoid removal from trademark register",
      "Continuous IP portfolio management",
    ],
    requirements: [
      "Trademark must be registered (not just applied)",
      "File TM-R within 6 months before expiry or within 6 months after expiry (with surcharge)",
      "Payment of renewal fee",
    ],
    documents: [
      "Original Trademark Registration Certificate",
      "TM-R application form",
      "Renewal fee payment",
      "Power of attorney (if filed through agent)",
    ],
    timeline: "15–30 business days",
    startingPrice: "₹3,999",
    faqs: [
      { q: "What happens if trademark expires without renewal?", a: "After the 6-month grace period, the trademark is removed from the register. After removal, anyone can apply for the same mark. Restoration is possible within 1 year of expiry by applying to the Registrar with late fees." },
      { q: "Can a trademark be renewed indefinitely?", a: "Yes. Trademarks can be renewed every 10 years indefinitely, as long as the mark is in use. There is no maximum duration — a trademark maintained in use can last forever (unlike patents which expire after 20 years)." },
    ],
  },
  "copyright-registration": {
    tagline: "Register copyright for literary, artistic, musical, or software works — create legal evidence of authorship.",
    benefits: [
      "Creates prima facie legal evidence of ownership and authorship",
      "Enables infringement lawsuits (damages + injunction)",
      "Published in the Copyright Journal — public record",
      "International protection under Berne Convention (180+ countries)",
      "Enables royalty licensing agreements",
      "Protects against plagiarism and digital piracy",
    ],
    requirements: [
      "Work must be original (independent creation with some creativity)",
      "Work must be fixed in tangible form (written, recorded, coded)",
      "Author (or employer, in case of work-for-hire) files",
      "Application via Copyright Office India",
    ],
    documents: [
      "Two copies of the work",
      "Author PAN and Aadhaar",
      "Statement of particulars (Form XIV)",
      "Power of attorney (if filing through agent)",
      "Publisher NOC (if published work)",
    ],
    timeline: "30–60 business days (including objection period)",
    startingPrice: "₹3,999",
    faqs: [
      { q: "Does copyright exist automatically in India?", a: "Yes. Copyright in India arises automatically upon creation of an original work — no registration is required. Registration however creates a public record and prima facie evidence of ownership, making legal enforcement much stronger." },
      { q: "What is the duration of copyright in India?", a: "For literary, artistic, musical works: lifetime of author + 60 years. For cinematographic films and sound recordings: 60 years from publication. For photographs: 60 years from publication." },
    ],
  },
  "patent-registration": {
    tagline: "Protect your invention with an Indian Patent — 20 years of exclusive rights over your innovation.",
    benefits: [
      "20-year exclusive right to manufacture, use, and sell the invention",
      "Licensing income from technology transfer",
      "Block competitors from copying your invention",
      "Increases company valuation and investor attractiveness",
      "International protection via PCT route",
      "80% fee concession for MSME applicants",
    ],
    requirements: [
      "Invention must be Novel (first in the world)",
      "Must have Inventive Step (not obvious to a skilled person)",
      "Must have Industrial Application",
      "Not fall in excluded categories (abstract ideas, medical treatment, plant varieties, etc.)",
    ],
    documents: [
      "Detailed description of invention",
      "Claims (defining scope of protection)",
      "Abstract",
      "Drawings (if applicable)",
      "Power of attorney (if filed through agent)",
    ],
    timeline: "3–5 years for grant (application filing: 2–4 weeks)",
    startingPrice: "₹24,999",
    faqs: [
      { q: "What is a Provisional Patent Application?", a: "A Provisional Application establishes a priority date (important for 'first to file' rule) and gives you 12 months to file the Complete Specification. It's useful when the invention isn't fully developed yet. Filing fee: ₹1,600 for individuals, ₹4,000 for small entities, ₹8,000 for large entities." },
      { q: "Can software be patented in India?", a: "Pure software algorithms or business methods are not patentable in India. However, software with a technical effect (improving a technical process, hardware performance) can be patented. The application must emphasize the technical contribution." },
    ],
  },
  "design-registration": {
    tagline: "Register the visual appearance of your product design — protect shape, pattern, configuration and ornamentation.",
    benefits: [
      "15-year exclusive right over product's visual appearance (10+5 years)",
      "Block copycats and look-alike products legally",
      "Licensing income from design rights",
      "Higher product valuation and brand differentiation",
      "Legal enforcement rights in Indian courts",
      "Hague System available for international protection",
    ],
    requirements: [
      "Design must be new and original (not previously published)",
      "Must be applied to an article (product) by industrial process",
      "Must be a visual feature — functional features NOT protected",
      "Application within 6 months of first publication (for priority)",
    ],
    documents: [
      "Representations/drawings of the design (6 views — front, back, top, bottom, left, right)",
      "Statement of novelty",
      "Locarno classification code",
      "Disclaimer (if any excluded features)",
    ],
    timeline: "6–12 months for registration",
    startingPrice: "₹4,999",
    faqs: [
      { q: "What is the difference between design registration and trademark?", a: "Design registration protects the visual appearance (shape, pattern, colour) of a product for 15 years. Trademark protects a brand identifier (name, logo) for 10 years (renewable). A product can have both design registration (its unique shape) and trademark (its brand name)." },
      { q: "Can I register the same design in different colours separately?", a: "Yes. Different colour combinations of the same design can be registered as separate design registrations. Each colour variant gets its own registration number and protection." },
    ],
  },
  "pf-registration": {
    tagline: "EPF employer registration and monthly ECR filing — mandatory for all businesses with 20+ employees.",
    benefits: [
      "Legal compliance — avoid ₹5,000/day penalty + 12% interest",
      "Employee retirement security and loyalty",
      "UAN portability for employees across employers",
      "EDLI life insurance cover (up to ₹7 lakh) for employees",
      "EPS pension benefit for employees",
      "Tax deduction for employer's PF contribution",
    ],
    requirements: [
      "Registration mandatory once 20 or more employees employed",
      "Voluntary registration available below 20 employees",
      "Aadhaar-linked UAN for all employees",
      "Monthly ECR must be filed by 15th of next month",
    ],
    documents: [
      "Company PAN and registration certificate",
      "Employee list with Aadhaar, PAN, and bank details",
      "Bank account proof of company",
      "Digital signature of authorized signatory",
    ],
    timeline: "3–5 business days (registration)",
    startingPrice: "₹2,999 (registration) + ₹1,499/month (ECR)",
    faqs: [
      { q: "What is the PF contribution breakdown?", a: "Employee contributes 12% of basic+DA to PF. Employer contributes 12% total — split as 3.67% to PF (EPF) and 8.33% to EPS (pension). Employer also pays 0.5% to EDLI (insurance) and 0.5% as admin charges. Total employer cost: ~13%." },
      { q: "What is the UAN and why does it matter?", a: "UAN (Universal Account Number) is a 12-digit number allotted by EPFO for each employee. It remains the same across employers — employees can transfer PF online, check balance, and withdraw using their UAN. Seeding Aadhaar and bank account with UAN is mandatory." },
    ],
  },
  "esic-registration": {
    tagline: "ESI employer registration and monthly contribution filing — providing medical and insurance cover to employees.",
    benefits: [
      "Avoid ₹5,000/day penalty for non-registration",
      "Cashless medical treatment at ESIC hospitals for employees",
      "26-week fully paid maternity leave under ESI",
      "Sickness benefit (70% of wages for 91 days)",
      "Disablement benefit (permanent disability coverage)",
      "Employer doesn't need to pay separate medical insurance",
    ],
    requirements: [
      "Mandatory for factories with 10+ employees",
      "Mandatory for shops/establishments with 10+ employees (as per state notification)",
      "Applicable only for employees earning ≤ ₹21,000/month",
      "Monthly contribution by 15th of following month",
    ],
    documents: [
      "Business registration certificate",
      "Employee list with salary and Aadhaar",
      "PAN of company",
      "Bank account details",
    ],
    timeline: "3–7 business days",
    startingPrice: "₹2,999 (registration) + ₹1,499/month",
    faqs: [
      { q: "What is the ESI contribution rate?", a: "Employer: 3.25% of employee's wages. Employee: 0.75% of wages. Total: 4% of gross salary. Employees earning ≤ ₹176/day are exempt from employee contribution (employer still contributes). The wage limit for coverage is ₹21,000/month." },
      { q: "What is the pehchan card and how does it work?", a: "The Pehchan Card (ESIC Smart Card) is issued to insured employees and their dependants. It is used for cashless medical treatment at ESIC hospitals and panel hospitals across India. Treatment is available at 1,500+ ESIC hospitals nationwide." },
    ],
  },
  "payroll-management": {
    tagline: "Complete payroll processing — salary computation, payslips, TDS, PF, ESIC and statutory compliance.",
    benefits: [
      "Accurate salary calculation with all deductions",
      "Automated payslip generation for every employee",
      "TDS on salary (Form 24Q) handled correctly",
      "PF and ESIC challan payment and filing",
      "Professional Tax deduction by state",
      "Full Form 16 generation at year-end",
    ],
    requirements: [
      "Employee master data (CTC, bank account, Aadhaar, PAN)",
      "Monthly attendance data",
      "Investment declarations from employees (for TDS)",
      "Applicable statutory registrations (PF, ESIC, PT)",
    ],
    documents: [
      "Employee master list",
      "Salary structure/CTC breakdowns",
      "Monthly attendance report",
      "Investment proofs (Form 12BB)",
      "Bank account details",
    ],
    timeline: "2–3 business days per payroll cycle",
    startingPrice: "₹2,999/month",
    faqs: [
      { q: "What is included in monthly payroll processing?", a: "Gross salary calculation, deductions (PF, ESIC, PT, TDS, LOP), net salary computation, payslip generation, PF challan, ESIC challan, PT payment, salary bank transfer file, and monthly TDS reconciliation." },
      { q: "How is TDS on salary calculated?", a: "TDS is calculated on estimated annual salary after standard deduction (₹75,000), Chapter VI-A deductions (80C, 80D, HRA, etc.), and divided into monthly deductions. Form 24Q is filed quarterly and Form 16 is issued annually." },
    ],
  },
  "gratuity-trust": {
    tagline: "Set up a private gratuity trust to fund future gratuity liability and claim immediate tax deduction.",
    benefits: [
      "Immediate income tax deduction on annual contribution (Sec 36(1)(v))",
      "Off-balance-sheet management of gratuity liability",
      "Employee confidence in gratuity payment",
      "Annual actuarial valuation for accurate provisioning",
      "AS 15 compliant accounting treatment",
      "Better alternative to unfunded pay-as-you-go approach",
    ],
    requirements: [
      "Company with significant employee base planning long-term",
      "Actuarial valuation of gratuity liability",
      "Trust deed registration",
      "IT approval for Sec 36(1)(v) tax deduction",
    ],
    documents: [
      "Trust deed (with prescribed provisions)",
      "List and details of all trustees",
      "Company registration certificate",
      "Employee list with service dates and salary",
      "Actuarial valuation report",
    ],
    timeline: "30–45 business days",
    startingPrice: "₹14,999",
    faqs: [
      { q: "What is Sec 36(1)(v) deduction?", a: "Under Sec 36(1)(v), an employer can claim income tax deduction for contributions made to an approved gratuity fund. The deduction is for the actuarially calculated contribution needed to meet future gratuity obligations — not the actual gratuity paid." },
      { q: "What is the maximum gratuity amount?", a: "As per the Payment of Gratuity Act, the maximum tax-exempt gratuity is ₹20 lakhs (revised from ₹10 lakhs in 2019). Gratuity beyond ₹20 lakhs is taxable in the employee's hands." },
    ],
  },
  "accounting-bookkeeping": {
    tagline: "Accurate monthly bookkeeping, financial statements, and MIS reports for growth-focused businesses.",
    benefits: [
      "GAAP/Ind AS compliant financial statements",
      "Monthly P&L, Balance Sheet, and Cash Flow",
      "GST reconciliation with books",
      "TDS reconciliation with 26AS",
      "Bank reconciliation statements",
      "Management Information System (MIS) reports",
    ],
    requirements: [
      "All bank statements (monthly)",
      "Sales invoices (GST and non-GST)",
      "Purchase invoices and bills",
      "Expense vouchers",
      "Payroll data",
    ],
    documents: [
      "Bank statements (all accounts)",
      "Sales register",
      "Purchase register",
      "Expense bills",
      "Credit card statements",
    ],
    timeline: "3–5 business days per month",
    startingPrice: "₹4,999/month",
    faqs: [
      { q: "What accounting software do you use?", a: "We work with Tally Prime, Zoho Books, QuickBooks Online, and Xero. We can adapt to your existing software or recommend the best option for your business size and complexity." },
      { q: "What is included in monthly MIS?", a: "Monthly MIS includes P&L vs budget, revenue trend analysis, top customers/expenses, receivables and payables aging, cash flow forecast, and any compliance alerts for the month." },
    ],
  },
  "virtual-cfo": {
    tagline: "Senior financial leadership on demand — CFO-level expertise at a fraction of the cost.",
    benefits: [
      "CA-qualified senior finance expertise",
      "Monthly MIS and management accounts",
      "Fundraising support — financial model, investor deck",
      "Board and investor reporting",
      "Budget vs actuals analysis",
      "Tax planning strategy (not just compliance)",
    ],
    requirements: [
      "Typically for startups with ₹1 crore+ revenue or VC-funded",
      "Existing bookkeeping (we can provide this too)",
      "Access to financial data",
      "Monthly engagement call",
    ],
    documents: [
      "Bank statements",
      "Existing financial statements",
      "Cap table and investor agreements",
      "Business plan (if available)",
    ],
    timeline: "Onboarding: 5–7 business days",
    startingPrice: "₹9,999/month",
    faqs: [
      { q: "What does a Virtual CFO do differently from an accountant?", a: "An accountant records and reports what happened. A Virtual CFO tells you why it happened and what to do next — financial modelling, fundraising strategy, burn rate management, investor communications, tax planning, and strategic financial decision making." },
      { q: "Can a Virtual CFO help with VC fundraising?", a: "Yes. Our Virtual CFO service includes financial model building (5-year projections), investor narrative on financials, due diligence preparation, cap table modelling, and coordination with investors on financial queries." },
    ],
  },
  "business-valuation": {
    tagline: "CA-certified business valuation report — for funding rounds, M&A, ESOPs, or regulatory compliance.",
    benefits: [
      "Certified valuation by CA under ICAI guidelines",
      "Required for FDI investments under Rule 11UA (FEMA)",
      "ESOP grant at Fair Market Value (FMV)",
      "Independent benchmark for negotiation",
      "Supports corporate governance and board decisions",
      "Required for share buyback pricing",
    ],
    requirements: [
      "Audited financial statements (3 years preferred)",
      "Business plan or financial projections",
      "Industry benchmarks for comparable companies",
      "Purpose of valuation clearly stated",
    ],
    documents: [
      "Audited financial statements (3 years)",
      "Management accounts / projections",
      "Cap table",
      "Customer and revenue data",
      "Key contracts and agreements",
    ],
    timeline: "5–10 business days",
    startingPrice: "₹14,999",
    faqs: [
      { q: "Which valuation method is best for a startup?", a: "For pre-revenue startups: Risk-Adjusted NPV or Berkus method. For revenue-stage startups: DCF (Discounted Cash Flow) or Revenue multiples. For asset-heavy businesses: Net Asset Value (NAV) is preferred. We recommend the appropriate method based on business stage." },
      { q: "What is Rule 11UA and why does it matter for FDI?", a: "Under Rule 11UA of IT Rules and FEMA, shares issued to foreign investors must be at Fair Market Value determined by a CA. The issue price cannot be below this FMV, ensuring the company does not undervalue shares issued to foreign investors (prevents round-tripping)." },
    ],
  },
  "financial-statements": {
    tagline: "Prepare P&L, Balance Sheet and Cash Flow Statement as per Companies Act and Indian accounting standards.",
    benefits: [
      "Mandatory for Companies Act compliance (AOC-4 filing)",
      "Required for bank loan applications",
      "Required for income tax audit (Form 3CB/3CA)",
      "Required for GST annual reconciliation (GSTR-9C)",
      "Investor due diligence requirement",
      "Management decision-making tool",
    ],
    requirements: [
      "Books of accounts maintained throughout the year",
      "Bank reconciliation statements",
      "Stock valuation (if manufacturing or trading)",
      "Fixed asset register",
    ],
    documents: [
      "Tally/ERP data export",
      "Bank statements (all accounts)",
      "Purchase and sales invoices",
      "Fixed asset details",
      "Loan agreements",
    ],
    timeline: "3–7 business days",
    startingPrice: "₹4,999/year",
    faqs: [
      { q: "What is Schedule III of Companies Act?", a: "Schedule III prescribes the format for financial statements of companies — including P&L, Balance Sheet, and Cash Flow. It was revised in 2021 to align with Ind AS, requiring additional disclosures on auditor's fees, CSR, related party transactions, and more." },
      { q: "What is the difference between Ind AS and AS?", a: "Ind AS (Indian Accounting Standards) are converged with IFRS and apply to listed companies and companies with net worth > ₹250 crore. AS (Accounting Standards) by ICAI apply to smaller non-listed companies. We prepare statements under the applicable standard for your company." },
    ],
  },
};

const defaultDetail = {
  tagline: "Professional compliance service handled by expert CAs and CSs.",
  benefits: [
    "Expert handling by qualified professionals",
    "Fast turnaround within committed timelines",
    "Transparent pricing with no hidden charges",
    "Complete documentation support",
    "Government liaison and follow-up",
    "Post-registration compliance guidance",
  ],
  requirements: [
    "Valid PAN Card",
    "Address proof",
    "Identity proof of all parties",
    "Business-specific documents as applicable",
  ],
  documents: [
    "PAN Card",
    "Aadhaar Card",
    "Address Proof",
    "Passport-size photograph",
    "Bank account details",
  ],
  timeline: "5–7 business days",
  startingPrice: "Contact for pricing",
  faqs: [
    { q: "How do I get started?", a: "Book a free consultation. Our expert will guide you through the requirements and process specific to your needs." },
    { q: "What happens after I submit my documents?", a: "We review, prepare, and file your application. You receive real-time updates until completion." },
  ],
};

export async function generateStaticParams() {
  // Return services that don't have dedicated page routes
  const dedicatedPages = [
    "private-limited-company", "llp-registration", "one-person-company",
    "gst-registration", "gst-filing", "income-tax-return", "trademark-registration",
    "accounting-bookkeeping", "payroll-management", "msme-registration",
    "startup-india", "iec-registration",
    // Company formation
    "partnership-firm", "sole-proprietorship", "section-8-company", "nidhi-company",
    "producer-company", "indian-subsidiary", "branch-office",
    // Tax & GST
    "gst-amendment", "tds-return", "advance-tax", "tax-audit", "transfer-pricing",
    // MCA
    "roc-compliance", "llp-annual-filing", "director-kyc", "change-in-directors",
    "increase-authorised-capital", "registered-office-change", "company-name-change", "company-closure",
    // Startup & MSME
    "fssai-license", "professional-tax", "trade-license", "drug-license", "psara-license", "lmpc-registration",
    // IP
    "trademark-objection", "trademark-renewal", "copyright-registration", "patent-registration", "design-registration",
    // HR
    "pf-registration", "esic-registration", "gratuity-trust",
    // Finance
    "virtual-cfo", "business-valuation", "financial-statements",
  ];
  return SERVICES
    .filter((s) => !dedicatedPages.includes(s.id))
    .map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) return {};
  const detail = serviceDetails[slug] || defaultDetail;
  return {
    title: `${service.title} | Company Avenue Advisory`,
    description: detail.tagline,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  const detail = serviceDetails[slug] || defaultDetail;
  const related = SERVICES.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/70">{service.title}</span>
          </div>
          <div className="max-w-2xl">
            <Badge variant="accent" className="mb-4">{service.category}</Badge>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">{service.title}</h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">{detail.tagline}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="accent" size="lg">
                Get Started — {detail.startingPrice}
              </Button>
              <a href="tel:+919876543210" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                <Phone size={14} />
                Talk to an Expert
              </a>
            </div>
            <div className="flex items-center gap-2 mt-6 text-white/40 text-sm">
              <Clock size={14} />
              <span>Typical timeline: {detail.timeline}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Benefits */}
              <div>
                <h2 className="font-heading font-bold text-2xl text-dark mb-6">Key Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {detail.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-card border border-slate-100">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-dark text-sm leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="font-heading font-bold text-2xl text-dark mb-6">Eligibility & Requirements</h2>
                <ul className="space-y-3">
                  {detail.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <ArrowRight size={14} className="text-accent shrink-0 mt-1" />
                      <span className="text-slate-700 text-sm">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div>
                <h2 className="font-heading font-bold text-2xl text-dark mb-6">Documents Required</h2>
                <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {detail.documents.map((doc) => (
                      <div key={doc} className="flex items-center gap-2.5">
                        <FileText size={14} className="text-primary shrink-0" />
                        <span className="text-dark text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="font-heading font-bold text-2xl text-dark mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {detail.faqs.map((faq) => (
                    <div key={faq.q} className="bg-white rounded-xl p-5 shadow-card border border-slate-100">
                      <p className="font-heading font-semibold text-dark text-sm mb-2">{faq.q}</p>
                      <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 sticky top-24">
                <h3 className="font-heading font-semibold text-dark text-base mb-2">Get Started Today</h3>
                <p className="text-muted text-sm mb-5">Free consultation · No commitment required</p>
                <div className="flex items-center gap-2 text-dark text-sm mb-3">
                  <Clock size={14} className="text-accent" />
                  <span>Timeline: <strong>{detail.timeline}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-dark text-sm mb-6">
                  <Star size={14} className="text-accent" />
                  <span>Starting at <strong>{detail.startingPrice}</strong></span>
                </div>
                <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                  Book Consultation
                </Button>
                <a href="tel:+919876543210" className="flex items-center justify-center gap-2 mt-3 text-primary text-sm font-heading font-semibold hover:underline">
                  <Phone size={14} />
                  Call Now
                </a>
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                  {["Expert CAs & CSs", "100% Online Process", "Transparent Pricing", "Dedicated Manager"].map((pt) => (
                    <div key={pt} className="flex items-center gap-2">
                      <CheckCircle size={13} className="text-green-500 shrink-0" />
                      <span className="text-xs text-muted">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related services */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-heading font-bold text-2xl text-dark mb-8">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((s) => (
                  <Link key={s.id} href={`/services/${s.id}`}
                    className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    <h3 className="font-heading font-semibold text-dark text-sm mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-muted text-xs leading-relaxed mb-3">{s.shortDesc}</p>
                    <div className="flex items-center gap-1 text-accent text-xs font-heading font-semibold">
                      Learn More <ArrowRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
