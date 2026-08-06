// ─────────────────────────────────────────────────────────────────────────────
// PART A — Startup-specific schemes.
//
// Startups (usually DPIIT-recognised ones) are the primary or sole eligible
// beneficiary named in the scheme's eligibility criteria.
//
// Source: DPIIT / Startup India "Playbook of Government Schemes and Initiatives
// for Startups", June 2026, plus the nodal-agency portals cited per scheme.
// Figures are indicative — verify on the official portal before filing.
// ─────────────────────────────────────────────────────────────────────────────

import type { Scheme } from "./schemes-taxonomy";

export const SCHEMES_STARTUP_SPECIFIC: Scheme[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    slug: "startup-india-seed-fund-scheme",
    name: "Startup India Seed Fund Scheme",
    abbr: "SISFS",
    ministry: "DPIIT, Ministry of Commerce & Industry",
    agency: "Approved incubators",
    focus: "Startup-Specific",
    support: "Mixed",
    stages: ["Prototype / PoC", "Seed / Early Stage"],
    sectors: ["Sector Agnostic", "Deep Tech"],
    popular: true,
    headline:
      "India's flagship seed programme — grant for proof-of-concept plus convertible debt for market entry, disbursed through approved incubators.",
    amount: "Up to ₹20 lakh grant + up to ₹50 lakh convertible debt",
    timeline: "Incubator evaluation typically 4–12 weeks after submission",
    whatIsThis:
      "SISFS puts capital into startups at the stage where angel investors and banks will not — before there is a product to show. Money is not paid by DPIIT directly; it is routed through incubators that DPIIT has approved, and each incubator runs its own selection committee. That makes the choice of incubator as important as the quality of the application.",
    objectives: [
      "Fund proof of concept, prototype development, product trials, market entry and commercialisation",
      "Bridge the gap that stops technology-enabled ideas from reaching a demonstrable product",
      "Graduate startups to a level where angels, VCs or commercial banks will back them",
    ],
    eligibility: [
      "DPIIT-recognised startup",
      "Incorporated not more than 2 years ago at the time of application",
      "Technology at the core of the product, service or business model, with market fit and scope for scaling",
      "Must not have received more than ₹10 lakh of monetary support under any other Central or State government scheme",
      "Indian promoters must hold at least 51% shareholding at the time of application",
    ],
    benefits: [
      "Up to ₹20 lakh as a grant for validation of proof of concept, prototype development or product trials",
      "Up to ₹50 lakh for market entry, commercialisation or scaling — through convertible debentures, debt or debt-linked instruments",
      "Incubator mentoring, workspace and investor connects alongside the money",
      "No equity dilution on the grant component",
    ],
    documents: [
      "Certificate of Incorporation and PAN of the entity",
      "DPIIT recognition certificate",
      "Pitch deck and product demo, screenshots or video",
      "Traction evidence — users, pilots, letters of intent, early revenue",
      "Financial statements or provisionals, plus projections",
      "Cap table and details of any prior funding",
      "Founder profiles and shareholding pattern",
    ],
    howToApply: [
      {
        title: "Confirm eligibility before you spend a day on the application",
        detail:
          "Entity under 2 years old, DPIIT-recognised, ₹10 lakh cap on prior central/state funding not breached, 51%+ Indian promoter holding. A breach on any one of these is fatal and is not discovered kindly at committee stage.",
      },
      {
        title: "Shortlist three to five incubators that match your sector",
        detail:
          "The Seed Fund portal lists every approved incubator with its sector focus and remaining corpus. You may apply to up to three. An agritech application sitting with a fintech-heavy incubator dies quietly — sector fit is the single biggest lever on outcome.",
      },
      {
        title: "Build the application pack",
        detail:
          "Problem, solution and why it is technology-led; market size with a defensible source; traction to date; the milestone plan you want funded; and financial projections that a CA will stand behind. Attach the deck and product evidence.",
      },
      {
        title: "Submit on seedfund.startupindia.gov.in",
        detail:
          "Create the startup profile, select your incubators and upload the pack. The application is visible to each selected incubator separately and each evaluates on its own calendar.",
      },
      {
        title: "Clear the incubator's evaluation and interview",
        detail:
          "Expect a screening round, then a pitch to the Incubator Seed Management Committee. Prepare for questions on unit economics, use of funds and why the milestone plan is achievable in the sanctioned period.",
      },
      {
        title: "Sign, draw and report",
        detail:
          "On selection you sign a funding agreement with milestones. Money is released tranche-wise against deliverables, and utilisation certificates are due at each milestone. Reporting failures stall tranche two more often than performance does.",
      },
    ],
    caaSupport: [
      "Free eligibility screen against the 2-year, ₹10 lakh and DPIIT gates before you commit any fee",
      "DPIIT recognition filed first where you do not already hold it — it is the hard gate on this scheme",
      "Incubator shortlisting: three to five approved incubators matched to your sector, stage and geography",
      "Financial projections and application drafting, with a workpaper behind every number",
      "Pitch deck polish and mock committee Q&A before the interview",
      "Post-sanction: milestone calendar, utilisation certificates and the compliance reporting that protects tranche two",
    ],
    caaServices: [
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "SISFS & Govt Scheme Advisory", href: "/pricing#startup-services" },
    ],
    watchOuts: [
      "The ₹10 lakh prior-funding cap counts State schemes too — founders routinely forget a state incubation grant and get disqualified late.",
      "Applying to a fourth incubator is not possible; choose the three carefully rather than spraying.",
      "Projections that show ₹100 crore revenue in year three without a workpaper destroy credibility faster than modest, defensible numbers.",
    ],
    links: [
      { label: "Seed Fund portal", href: "https://seedfund.startupindia.gov.in/" },
      {
        label: "Scheme guidelines (PDF)",
        href: "https://www.startupindia.gov.in/content/dam/invest-india/Templates/public/Guidelines%20for%20Startup%20India%20Seed%20Fund%20Scheme.pdf",
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    slug: "fund-of-funds-for-startups",
    name: "Fund of Funds for Startups",
    abbr: "FFS",
    ministry: "DPIIT, Ministry of Commerce & Industry",
    agency: "SIDBI",
    focus: "Startup-Specific",
    support: "Equity",
    stages: ["Growth / Scaling"],
    sectors: ["Sector Agnostic"],
    headline:
      "A ₹10,000 crore government fund-of-funds that capitalises SEBI-registered AIFs, which in turn invest equity into startups.",
    amount: "₹10,000 crore corpus; your cheque size is set by the AIF",
    timeline: "AIF-driven — a normal VC diligence cycle of 2–6 months",
    whatIsThis:
      "FFS does not invest in startups. It invests in venture funds, which then invest in you. Operationalised by SIDBI, it commits capital to SEBI-registered Alternative Investment Funds on the condition that each deploys at least twice the FFS contribution into startups. For a founder, the practical takeaway is that a large slice of Indian domestic VC money is FFS-backed — and those funds have a mandate to write cheques into DPIIT-recognised startups.",
    objectives: [
      "Catalyse domestic venture capital and reduce reliance on foreign risk capital",
      "Ensure supported AIFs invest at least 2x the FFS contribution into startups across stages",
      "Deepen the pool of capital available to Indian startups at growth stage",
    ],
    eligibility: [
      "SEBI-registered AIFs apply for capital under the scheme",
      "Funding reaches DPIIT-recognised startups through the selected AIFs",
      "Startup-level terms — valuation, instrument, board rights — are negotiated commercially with the AIF",
    ],
    benefits: [
      "Access to a materially larger pool of domestic venture capital",
      "Equity and equity-linked investment on standard commercial terms",
      "Indirect government backing without any government stake on your cap table",
    ],
    howToApply: [
      {
        title: "Understand that you approach the fund, not the government",
        detail:
          "There is no startup-facing FFS application form. SIDBI publishes the list of AIFs it has backed; you raise from those funds exactly as you would from any VC.",
      },
      {
        title: "Get DPIIT recognition in place",
        detail:
          "FFS-supported AIFs must deploy into DPIIT-recognised startups to have the investment count against their obligation. Recognition makes you a cleaner fit for their mandate.",
      },
      {
        title: "Shortlist FFS-backed AIFs by thesis",
        detail:
          "Match on sector, stage and cheque size using the SIDBI Venture Capital list. A seed-stage SaaS company pitching a growth-stage manufacturing fund is wasting both parties' time.",
      },
      {
        title: "Prepare an investment-grade pack",
        detail:
          "Deck, three-statement financial model, cap table, data room and a defensible valuation view. This is a commercial raise — the government origin of the capital changes nothing about the diligence.",
      },
      {
        title: "Run the diligence and close",
        detail:
          "Term sheet, financial and legal due diligence, definitive documents, and the PAS-3 / valuation filings on the Indian side once the money lands.",
      },
    ],
    caaSupport: [
      "DPIIT recognition so you qualify under the AIF's deployment mandate",
      "Three-statement financial model, cap table and investor-ready pitch deck",
      "Due-diligence-ready financials: clean books, reconciled GST and TDS, statutory filings current",
      "Valuation support and the post-round company-law filings — PAS-3, share certificates, register updates",
    ],
    caaServices: [
      { label: "Pitch Deck & Financial Model", href: "/contact" },
      { label: "Business Valuation", href: "/services/business-valuation" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    watchOuts: [
      "Messy books are the most common reason a term sheet dies in diligence — fix them before you start raising, not during.",
      "No AIF is obliged to invest because of FFS. The mandate helps you get read; the business still has to win.",
    ],
    links: [
      { label: "SIDBI Venture Capital — FFS", href: "https://www.sidbivcf.in/en/funds/ffs" },
      {
        label: "DPIIT operational guidelines (PDF)",
        href: "https://www.dpiit.gov.in/static/uploads/2025/07/ccffbf768a90e8445ba78f82d4c42bec.pdf",
      },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    slug: "startup-india-fund-of-funds-2",
    name: "Startup India Fund of Funds 2.0",
    abbr: "FoF 2.0",
    ministry: "DPIIT, Ministry of Commerce & Industry",
    agency: "SIDBI and other implementing agencies",
    focus: "Startup-Specific",
    support: "Equity",
    stages: ["Growth / Scaling"],
    sectors: ["Sector Agnostic", "Deep Tech", "Manufacturing"],
    headline:
      "The follow-on ₹10,000 crore fund-of-funds, weighted towards deep tech, early-growth and innovative manufacturing.",
    amount: "₹10,000 crore corpus; startup-level cheque varies by AIF",
    timeline: "AIF-driven diligence cycle",
    whatIsThis:
      "FoF 2.0 is the next window of the original Fund of Funds, with an explicit tilt towards priority segments: deep tech, early-growth startups backed by smaller AIFs, and technology-driven manufacturing. SIDBI continues as implementing agency, with additional domestic agencies being appointed. For founders in capital-intensive or long-gestation categories, this is the more relevant of the two windows.",
    objectives: [
      "Deepen domestic venture capital for deep tech and innovative manufacturing",
      "Back smaller AIFs that write early-growth cheques the large funds skip",
      "Maintain minimum investment multipliers by segment as defined in the operational guidelines",
    ],
    eligibility: [
      "SEBI-registered Category I and Category II AIFs apply for capital",
      "Funding is deployed into DPIIT-recognised startups by the selected AIFs",
      "Priority segments: deep tech, early-growth-stage, technology-driven manufacturing, and sector/stage-agnostic startups",
    ],
    benefits: [
      "Capital targeted at categories mainstream VC under-serves",
      "Equity and equity-linked instruments through Category I and II AIFs",
      "Better odds for hardware, manufacturing and long-R&D businesses than the generalist funds",
    ],
    howToApply: [
      {
        title: "Position yourself inside a priority segment",
        detail:
          "If you are deep tech or innovative manufacturing, say so explicitly and evidence it — patents filed, technology readiness level, in-house R&D spend. The segment classification is what makes an AIF want your deal for its FoF 2.0 obligation.",
      },
      {
        title: "Secure DPIIT recognition",
        detail: "Non-negotiable for the investment to count under the scheme's deployment requirement.",
      },
      {
        title: "Target the smaller, newer AIFs",
        detail:
          "FoF 2.0 deliberately supports smaller funds serving early-growth startups. They move faster and are less crowded than the marquee names.",
      },
      {
        title: "Build the raise pack and run diligence",
        detail:
          "Model, deck, cap table, IP register and clean statutory history. Deep-tech diligence goes further into technical validation than a typical SaaS round — prepare the technology dossier too.",
      },
    ],
    caaSupport: [
      "Deep-tech and manufacturing positioning: framing the technology story the priority segments are written for",
      "DPIIT recognition and, where relevant, the IP filings that evidence the deep-tech claim",
      "Financial model, cap table and data-room preparation",
      "Post-round compliance — PAS-3, valuation report, share certificates and register of members",
    ],
    caaServices: [
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "Business Valuation", href: "/services/business-valuation" },
    ],
    links: [
      {
        label: "Gazette notification (PDF)",
        href: "https://www.dpiit.gov.in/static/uploads/2026/04/d02f1b35bcc661c31e8cb2229dcd9475.pdf",
      },
      {
        label: "Operational guidelines (PDF)",
        href: "https://www.dpiit.gov.in/static/uploads/2026/04/8949d8e0dabf11cb9291b00ec1d1f727.pdf",
      },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    slug: "credit-guarantee-scheme-for-startups",
    name: "Credit Guarantee Scheme for Startups",
    abbr: "CGSS",
    ministry: "DPIIT, Ministry of Commerce & Industry",
    agency: "National Credit Guarantee Trustee Company (NCGTC)",
    focus: "Startup-Specific",
    support: "Loan / Credit",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Sector Agnostic"],
    popular: true,
    headline:
      "A government guarantee that lets banks, NBFCs and AIFs lend to DPIIT-recognised startups without demanding collateral.",
    amount: "Guarantee cover up to ₹20 crore per eligible borrower",
    timeline: "Bank appraisal typically 3–8 weeks",
    whatIsThis:
      "CGSS does not give you money — it de-risks the lender. NCGTC guarantees a defined share of the loan a member institution extends to a DPIIT-recognised startup, which removes the collateral conversation that kills most startup debt applications. If you have revenue and need working capital or venture debt without pledging a founder's house, this is the instrument.",
    objectives: [
      "Provide credit guarantee against loans extended to DPIIT-recognised startups by member institutions",
      "Enable collateral-free and third-party-guarantee-free lending to startups",
      "Bring scheduled banks, NBFCs and SEBI-registered AIFs into the startup debt market",
    ],
    eligibility: [
      "Borrower must be a DPIIT-recognised startup",
      "Lending is done by Member Institutions: scheduled commercial banks and financial institutions, RBI-registered NBFCs, and SEBI-registered AIFs",
      "Startup should be generating stable revenue, as assessed by the lender from audited statements",
      "The startup must not be in default to any lending or investing institution and not classified as NPA",
    ],
    benefits: [
      "Maximum guarantee of ₹20 crore, or the actual outstanding credit amount, whichever is less",
      "Both transaction-based and umbrella-based cover available",
      "No collateral and no third-party guarantee demanded by the lender",
      "Working capital, term loan and venture debt all become accessible",
    ],
    documents: [
      "DPIIT recognition certificate",
      "Audited financial statements — usually two years",
      "Business plan or project report with fund-use detail",
      "Bank statements and existing sanction letters",
      "KYC of the entity and its promoters",
      "GST returns and ITRs for the assessment period",
    ],
    howToApply: [
      {
        title: "Check you are lendable before you approach anyone",
        detail:
          "CGSS removes the collateral barrier, not the credit assessment. The lender still looks at revenue stability, promoter CIBIL and existing obligations. Pull the credit report at the start, not after a rejection.",
      },
      {
        title: "Identify a Member Institution",
        detail:
          "Only lenders registered with NCGTC under CGSS can extend guaranteed credit. NCGTC publishes the list. Applying to a non-member branch wastes weeks.",
      },
      {
        title: "Build the credit file",
        detail:
          "Project report or CMA data depending on whether you want a term loan or working capital, plus audited financials, GST-turnover reconciliation and a clear statement of what the money funds.",
      },
      {
        title: "Apply through the lender or the Jan Samarth portal",
        detail:
          "Submit to the member institution directly, or route the application through jansamarth.in. The lender appraises, sanctions, and then seeks the guarantee cover from NCGTC.",
      },
      {
        title: "Complete documentation and drawdown",
        detail:
          "Guarantee fee is payable as per the scheme terms. Keep the account standard — a slip into NPA invalidates the cover and turns a guaranteed facility into a personal problem.",
      },
    ],
    caaSupport: [
      "Credit readiness review: CIBIL pull at intake, GST-to-books reconciliation, statutory filings brought current",
      "CA-certified project report or CMA data in the format your bank's credit team actually uses",
      "Member Institution shortlisting and application filing, with a weekly follow-up cadence on the file",
      "Escalation ladder when a branch sits on the file — branch, regional office, then the formal grievance route",
    ],
    caaServices: [
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "CMA Data Preparation", href: "/contact" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    ],
    watchOuts: [
      "A weak promoter CIBIL score sinks the file regardless of the guarantee. Fix it first — that can take three to six months.",
      "The guarantee protects the lender, not you. Default still has consequences for the borrowing entity.",
    ],
    links: [
      {
        label: "NCGTC — CGSS product page",
        href: "https://www.ncgtc.in/en/product-details/CGSS/Credit-Guarantee%20Scheme%20for%20Start-ups%20(CGSS)",
      },
      { label: "Jan Samarth — startup business loan", href: "https://www.jansamarth.in/business-loan-startup-scheme" },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    slug: "sipp",
    name: "Scheme for Facilitating Startups Intellectual Property Protection",
    abbr: "SIPP",
    ministry: "DPIIT / CGPDTM, Ministry of Commerce & Industry",
    focus: "Startup-Specific",
    support: "Market Access",
    stages: ["Ideation", "Prototype / PoC", "Seed / Early Stage", "Growth / Scaling", "Market Access & IP"],
    sectors: ["Sector Agnostic"],
    popular: true,
    headline:
      "The government pays your IP facilitator's professional fee, and DPIIT startups get an 80% rebate on patent fees and 50% on trademarks.",
    amount: "80% rebate on patent statutory fees · 50% on trademark and design fees · facilitator fee paid by government",
    timeline: "Filing in days; grant depends on the registry's own timeline",
    whatIsThis:
      "SIPP is the most under-used benefit in the entire startup toolkit. A panel of IP facilitators empanelled by the Controller General drafts, files and prosecutes your patent, design or trademark application — and CGPDTM pays their professional fee, not you. You bear only the statutory fee, which is itself rebated by 80% for patents and 50% for trademarks and designs.",
    objectives: [
      "Protect and promote the intellectual property of startups",
      "Remove cost as the reason early-stage founders skip IP protection",
      "Provide end-to-end facilitation from drafting through to final disposal of the application",
    ],
    eligibility: [
      "DPIIT-recognised startup",
      "Self-declaration that you have not availed funds under any other government scheme to pay facilitator, patent agent or trademark agent fees for the same IP application",
      "Applies to patents, designs and trademarks filed in India, and to international patent applications in prescribed cases",
    ],
    benefits: [
      "Facilitator's professional fee borne by the office of CGPDTM",
      "80% rebate on patent statutory fees against the fee payable by other companies",
      "50% rebate on trademark and design statutory fees",
      "End-to-end assistance — advisory, drafting, filing, examination replies, hearings, opposition handling and final disposal",
      "Expedited examination available to startups on the patent side",
    ],
    documents: [
      "DPIIT recognition certificate",
      "Details of the invention, mark or design — specification draft, logo files, product drawings",
      "Applicant KYC: PAN, Aadhaar or Certificate of Incorporation",
      "Power of Attorney in favour of the facilitator or agent",
      "User affidavit and earliest-use evidence if claiming prior use of a trademark",
    ],
    howToApply: [
      {
        title: "Get DPIIT recognition first",
        detail: "Without it there is no SIPP, no facilitator and no fee rebate. It is free and usually issued within 2–10 working days.",
      },
      {
        title: "Do the prior-art or trademark search before filing",
        detail:
          "A rebate on a doomed application is worthless. A comprehensive identical-plus-phonetic search on the trademark side, or a prior-art search on the patent side, tells you whether the application is worth making at all.",
      },
      {
        title: "Choose a facilitator from the CGPDTM panel",
        detail:
          "IP India publishes the empanelled facilitator list by region and by IP type. You may select from it; the facilitator's fee is settled by the government directly.",
      },
      {
        title: "File the application with the fee rebate applied",
        detail:
          "Patent, design or trademark application is filed with the startup fee slab. On the trademark side that is ₹4,500 per class instead of ₹9,000; on the patent side the statutory fee drops by 80%.",
      },
      {
        title: "Respond to the examination report inside the window",
        detail:
          "A trademark examination report must be answered within 30 days; a patent First Examination Report has its own timeline. Missing the reply window abandons the application — this is where most self-filed startups lose their IP.",
      },
    ],
    caaSupport: [
      "Comprehensive search with a written risk note before you spend anything — including an honest 'do not file this mark' where that is the answer",
      "DPIIT recognition where you are not already recognised, so the rebate actually applies",
      "Class selection under the NICE classification and specification drafting",
      "Filing, examination-report replies within the statutory window, and status tracking to registration",
      "Renewal register so a 10-year trademark renewal never surprises you",
    ],
    caaServices: [
      { label: "Trademark Registration", href: "/services/trademark-registration" },
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "Copyright Registration", href: "/services/copyright-registration" },
      { label: "Design Registration", href: "/services/design-registration" },
    ],
    watchOuts: [
      "Descriptive or generic marks get objected under Section 9 no matter how cheap the filing was. The search is the value, not the filing.",
      "A rebate does not survive loss of DPIIT recognition mid-prosecution — recognition runs 10 years from incorporation or until ₹100 crore turnover.",
    ],
    links: [
      {
        label: "IP India — SIPP page & facilitator list",
        href: "https://ipindia.gov.in/page-content/startups-intellectual-property-protection-sipp",
      },
      { label: "DPIIT SIPP scheme page", href: "https://www.dpiit.gov.in/offerings/schemes-and-services/details/sipp-gTM1UDNtQWa" },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    slug: "gem-startup-runway",
    name: "GeM Startup Runway",
    ministry: "Department of Commerce",
    agency: "Government e-Marketplace (GeM)",
    focus: "Startup-Specific",
    support: "Market Access",
    stages: ["Seed / Early Stage", "Growth / Scaling", "Market Access & IP"],
    sectors: ["Sector Agnostic"],
    headline:
      "A dedicated window on GeM that lets startups sell innovative products to government buyers — with the turnover, prior-experience and EMD walls removed.",
    amount: "No grant — access to the entire central and state government procurement market",
    timeline: "Listing in days once GeM seller registration is complete",
    whatIsThis:
      "Government procurement is the largest B2B market in India and it is normally closed to young companies by prior-turnover and prior-experience conditions. The Startup Runway removes exactly those conditions for DPIIT-recognised startups, and creates listing categories for innovative products that do not fit any existing GeM catalogue. For a hardware or deep-tech startup, one government order can be a bigger unlock than a seed round.",
    objectives: [
      "Enable startups to sell innovative products and services directly to government buyers",
      "Promote solutions that are unique in concept, design, process or functionality",
      "Improve startup participation in public procurement",
    ],
    eligibility: [
      "DPIIT-recognised startups registered as sellers or service providers on GeM",
      "Products or services in existing GeM categories, or in dedicated startup sectors such as AI, robotics, agritech, cleantech, cybersecurity, edtech, health tech, water tech and assistive tech",
      "Other innovative entities as permitted by GeM",
    ],
    benefits: [
      "Access to buyers across ministries, departments, PSUs and other public entities",
      "Exemption or relaxation from prior turnover, prior experience and Earnest Money Deposit requirements",
      "Dedicated marketplace visibility for startups and innovative products",
      "Ability to list innovative products even where a standard category does not exist",
    ],
    documents: [
      "DPIIT recognition certificate",
      "GeM seller registration with entity PAN, GSTIN and bank details",
      "Aadhaar-linked mobile of the authorised signatory",
      "Product specification sheet, test reports and certifications where applicable",
      "Udyam registration, if claiming MSME benefits in parallel",
    ],
    howToApply: [
      {
        title: "Complete the compliance base",
        detail:
          "GeM seller onboarding needs a live GSTIN, PAN, bank account in the entity's name and Udyam where you want MSME preference. Get these clean first — GeM validates against the source systems.",
      },
      {
        title: "Register as a seller on GeM",
        detail:
          "Create the seller account with the authorised signatory's Aadhaar-linked mobile for OTP, and complete the organisational profile and vendor assessment where required for your category.",
      },
      {
        title: "Claim the Startup Runway benefits",
        detail:
          "Link the DPIIT recognition to the seller profile so the turnover, prior-experience and EMD exemptions apply to bids you participate in.",
      },
      {
        title: "List the product — including under Startup Runway categories",
        detail:
          "Map to an existing category where one fits. Where nothing fits, use the Startup Runway route to list an innovative product without forcing it into the wrong catalogue.",
      },
      {
        title: "Bid, fulfil and build a track record",
        detail:
          "Watch bids in your category, respond within the window and deliver on time. A clean fulfilment history on GeM compounds — it is what wins the second and third order.",
      },
    ],
    caaSupport: [
      "DPIIT recognition, Udyam and GSTIN — the compliance base GeM validates before it lets you sell",
      "GeM seller registration and vendor-assessment preparation",
      "Product listing and category mapping, including Startup Runway listings for products with no standard category",
      "Ongoing GST and invoicing compliance on government orders, where payment cycles and documentation are unforgiving",
    ],
    caaServices: [
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "GST Registration", href: "/services/gst-registration" },
    ],
    links: [
      { label: "GeM Startup Runway", href: "https://gem.gov.in/Startup_Runway" },
      { label: "Startup India — public procurement", href: "https://www.startupindia.gov.in/content/sih/en/public_procurement.html" },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    slug: "nidhi-seed-support-program",
    name: "NIDHI – Seed Support Program",
    abbr: "NIDHI-SSP",
    ministry: "Department of Science & Technology (DST)",
    agency: "NIDHI TBIs and STEPs",
    focus: "Startup-Specific",
    support: "Equity",
    stages: ["Seed / Early Stage"],
    sectors: ["Deep Tech", "Sector Agnostic"],
    headline:
      "Post-incubation seed capital of up to ₹1 crore, deployed by DST-supported Technology Business Incubators into their own incubatees.",
    amount: "Up to ₹1 crore per startup, subject to TBI guidelines",
    timeline: "Depends on the host TBI's Seed Support Management Committee cycle",
    whatIsThis:
      "NIDHI-SSP is a closed loop: only startups already incubated at a DST-supported TBI or STEP can access it, and the incubator's own Seed Support Management Committee decides. The route in, therefore, is to get incubated first. Money comes as debt, equity or convertible instruments depending on the incubator's policy, and funds product development, trials, test marketing and IP.",
    objectives: [
      "Provide seed support to deserving incubatee startups through NIDHI TBIs and STEPs",
      "Bridge the gap between a working prototype and a market-ready product",
      "Keep promising technology startups alive through the pre-revenue valley",
    ],
    eligibility: [
      "DPIIT-recognised startup",
      "Minimum three months of residency at the NIDHI/DST-supported STEP or TBI",
      "Indian promoters must hold at least 51% shareholding in the incubatee startup",
    ],
    benefits: [
      "Seed funding as debt, equity or convertible instruments as per incubator policy",
      "Support for product development, testing and trials, test marketing and IPR costs",
      "Professional consultancy — bringing academic experts in to work with the startup",
      "Mentoring through the incubator's network",
    ],
    howToApply: [
      {
        title: "Get incubated at a NIDHI TBI or STEP first",
        detail:
          "There is no direct route. Identify DST-supported incubators in your domain, apply for incubation and complete at least three months of residency before you are eligible for seed support.",
      },
      {
        title: "Secure DPIIT recognition and check the 51% holding",
        detail:
          "Both are hard eligibility conditions. Foreign-majority cap tables are disqualified regardless of the technology.",
      },
      {
        title: "Prepare the seed support proposal",
        detail:
          "Product development plan, testing and trial costs, test-marketing budget, IPR spend and the milestones each tranche buys. The committee funds a plan, not a wish.",
      },
      {
        title: "Present to the Seed Support Management Committee",
        detail:
          "The incubator's committee evaluates and sanctions. Expect questions on commercialisation route, why the amount is what it is, and what happens if the first milestone slips.",
      },
      {
        title: "Draw against milestones and report",
        detail:
          "Funds release tranche-wise. The instrument may be convertible — read the conversion terms against your future cap table before signing.",
      },
    ],
    caaSupport: [
      "TBI and STEP shortlisting by technology domain, plus the incubation application itself",
      "DPIIT recognition and a shareholding review against the 51% Indian-promoter condition",
      "Costed product-development plan and milestone-linked budget the committee can sanction",
      "Review of the convertible instrument's terms and the cap-table impact before you sign",
    ],
    caaServices: [
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "Business Valuation", href: "/services/business-valuation" },
    ],
    links: [{ label: "NIDHI-SSP", href: "https://nidhi.dst.gov.in/nidhissp/" }],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    slug: "nidhi-prayas",
    name: "NIDHI – PRAYAS 2.0",
    abbr: "PRAYAS",
    ministry: "Department of Science & Technology (DST)",
    agency: "PRAYAS Centres and Advance PRAYAS Centres",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Ideation", "Prototype / PoC"],
    sectors: ["Deep Tech", "Sector Agnostic"],
    popular: true,
    headline:
      "Pure prototyping grant — up to ₹40 lakh to turn a technology idea into working hardware, with no equity taken.",
    amount: "Up to ₹20 lakh via PRAYAS Centres · up to ₹40 lakh via Advance PRAYAS Centres",
    timeline: "Call-driven; centres run their own selection cycles",
    whatIsThis:
      "PRAYAS exists for the stage nobody funds: you have a technology idea and need money to build the first working prototype. It is pre-incubation, implemented through PRAYAS Centres, with Advance PRAYAS Centres specifically for deep-tech innovations at a higher grant ceiling. Individual innovators can apply — you do not need a company yet, though a recognised startup can also apply.",
    objectives: [
      "Bridge the funding gap at the very early idea and proof-of-concept stage",
      "Support both technology-based and deep-tech innovations through dedicated centres",
      "Give innovators makerspace access, mentoring and the money to build",
    ],
    eligibility: [
      "A DPIIT-recognised startup, or an individual innovator",
      "For a recognised startup: incorporated in India, not more than 5 years old, annual turnover not exceeding ₹1 crore in any financial year",
      "The idea must be technology-based with a defined prototype plan",
    ],
    benefits: [
      "Level 1 (PRAYAS Centres): up to ₹20 lakh grant per innovator or startup for prototyping",
      "Level 2 (Advance PRAYAS Centres): up to ₹40 lakh per innovator or startup for deep-tech prototypes",
      "Access to makerspace, fabrication facilities and technical mentoring",
      "No equity dilution — this is grant-in-aid",
    ],
    documents: [
      "Technology brief and prototype development plan with a bill of materials",
      "Proof of concept evidence — drawings, simulations, test data",
      "Innovator CV or founder profiles",
      "DPIIT certificate and financials, where applying as a startup",
    ],
    howToApply: [
      {
        title: "Identify the right PRAYAS Centre",
        detail:
          "Centres are hosted at incubators and differ by technology domain. Advance PRAYAS Centres handle deep tech at the higher ceiling. Pick on domain fit and fabrication capability, not proximity.",
      },
      {
        title: "Prepare the prototype plan and costed bill of materials",
        detail:
          "PRAYAS funds building things. The strongest applications read like an engineering plan — components, fabrication, testing, iteration — with a defensible cost against each line.",
      },
      {
        title: "Apply through the PRAYAS PMU portal",
        detail:
          "Submissions go through nidhi-prayas.org or the NIDHI schemes page. Watch the call window; centres do not accept rolling applications outside it.",
      },
      {
        title: "Present to the selection committee",
        detail:
          "Expect technical scrutiny — feasibility, novelty and whether you personally can build it. This is an engineering review more than a business pitch.",
      },
      {
        title: "Build, report and graduate",
        detail:
          "Funds release against prototyping milestones. A successful PRAYAS prototype is the natural entry ticket to SISFS and to incubation.",
      },
    ],
    caaSupport: [
      "Positioning the technology story so the novelty is legible to a technical committee, not buried in jargon",
      "Costed prototype budget and bill of materials in the format the centre sanctions against",
      "Entity structuring where you are still an individual innovator and incorporation makes the later stages easier",
      "The follow-on path mapped from day one: PRAYAS prototype to SISFS seed to CGSS debt",
    ],
    caaServices: [
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
    ],
    links: [
      { label: "NIDHI PRAYAS portal", href: "https://nidhi-prayas.org/" },
      { label: "PRAYAS 2.0 programme guidelines (PDF)", href: "https://nidhi-prayas.org/documents/dst-nidhi-prayas-2.0-program-guidelines-2026.pdf" },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    slug: "rdi-scheme",
    name: "Research, Development & Innovation Scheme",
    abbr: "RDI",
    ministry: "Department of Science & Technology (DST)",
    agency: "Second Level Fund Managers (AIFs, DFIs, NBFCs, FROs)",
    focus: "Startup-Specific",
    support: "Mixed",
    stages: ["Growth / Scaling"],
    sectors: ["Deep Tech", "Manufacturing", "Sector Agnostic"],
    headline:
      "A ₹1 lakh crore corpus providing long-term, low-cost capital for private-sector R&D in strategic and deep-tech sectors.",
    amount: "₹1 lakh crore scheme corpus; project-level debt or equity at 50% of cost or round size",
    timeline: "Routed through fund managers — expect a full institutional diligence",
    whatIsThis:
      "The RDI Scheme is the largest single pool of capital in the Indian innovation ecosystem, approved by Cabinet in July 2025. It does not lend directly: the fund goes to Second Level Fund Managers — AIFs, development finance institutions, NBFCs and Focused Research Organisations — which then finance private companies, including DPIIT-recognised startups, doing RDI-intensive work. For a deep-tech company past the grant stage, this is the growth-capital route.",
    objectives: [
      "Catalyse private-sector participation in high-impact R&D",
      "Strengthen India's capability in strategic technologies and promote technological self-reliance",
      "Provide long-tenor, low-cost capital that commercial lenders will not offer to R&D-heavy businesses",
    ],
    eligibility: [
      "The RDI Fund is provided to Second Level Fund Managers (SLFMs)",
      "SLFMs then fund private companies, including DPIIT-recognised startups, advancing RDI-intensive technologies",
      "Sector focus on strategic and deep-tech areas",
    ],
    benefits: [
      "Loan — debt funding, or optionally convertible debt, from the SLFM at 50% of project cost",
      "Equity — funding via equity or equity-linked instruments at 50% of the value of each funding round",
      "Long tenor and concessional cost relative to commercial debt",
    ],
    howToApply: [
      {
        title: "Confirm your work is genuinely RDI-intensive",
        detail:
          "This is not a working-capital scheme. You need a defined research and development programme with technology milestones, not incremental product work.",
      },
      {
        title: "Identify the right Second Level Fund Manager",
        detail:
          "Startups apply directly to the SLFMs — the Technology Development Board runs one such window. Match on sector and instrument preference (debt vs equity).",
      },
      {
        title: "Build the project case",
        detail:
          "Technology readiness level today and target, R&D budget by workstream, team credentials, IP position, and the commercialisation route. Financials must show how the 50% counterpart funding is being raised.",
      },
      {
        title: "Submit through the SLFM's registration process",
        detail:
          "Each SLFM runs its own intake — for instance the TDB's RDIF registration portal. Follow that manager's format, not a generic one.",
      },
      {
        title: "Clear diligence and structure the instrument",
        detail:
          "Expect technical, financial and legal diligence. Negotiate the conversion or repayment terms with the same care as a venture round.",
      },
    ],
    caaSupport: [
      "Assessment of whether the R&D programme genuinely qualifies before you invest months in an application",
      "R&D project financials, counterpart-funding plan and CA-certified projections",
      "Diligence readiness — clean books, IP register, statutory filings current, related-party disclosures in order",
      "Instrument review: conversion terms, security, covenants and the cap-table impact",
    ],
    caaServices: [
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
    ],
    links: [
      { label: "RDI Fund — ANRF", href: "https://rdifund.anrf.gov.in/" },
      { label: "Operational guidelines (PDF)", href: "https://rdifund.anrf.gov.in/images/pdf/2026_IG.pdf" },
    ],
  },

  // ── 10 ─────────────────────────────────────────────────────────────────────
  {
    slug: "national-quantum-mission",
    name: "National Quantum Mission – Startup Support",
    abbr: "NQM",
    ministry: "Department of Science & Technology (DST)",
    agency: "Four Thematic Hubs at IISc, IIT Madras, IIT Bombay, IIT Delhi",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Prototype / PoC", "Growth / Scaling"],
    sectors: ["Deep Tech"],
    headline:
      "Rolling grants of up to ₹25 crore for quantum startups, routed through four Thematic Hubs at India's top technical institutes.",
    amount: "Up to ₹25 crore per startup · mission outlay ₹6,003.65 crore (FY2024–FY2031)",
    timeline: "Rolling calls and challenges through the T-Hubs",
    whatIsThis:
      "NQM is India's national push into quantum technology, with four Thematic Hubs set up as Section 8 companies inside premier institutes — one each for quantum computing, communication, sensing and metrology, and materials and devices. Startup support is channelled through those hubs, and the cheque sizes are among the largest available to any Indian deep-tech startup.",
    objectives: [
      "Seed, nurture and scale up scientific and industrial R&D in quantum technology",
      "Build a vibrant quantum innovation ecosystem through the four Thematic Hubs",
      "Create skilled manpower, research infrastructure and industry-academia collaboration",
    ],
    eligibility: [
      "Startups working in quantum technology — preferably DPIIT-recognised and Indian-owned and controlled per the startup support guidelines",
      "Academic institutions, R&D labs and consortia in quantum computing, communication, sensing/metrology and materials/devices",
      "For teaching lab support: government-funded technical institutions and eligible AICTE/UGC-recognised institutions",
    ],
    benefits: [
      "R&D grant funding for quantum prototypes, product development and commercialisation",
      "Seed and scale-up support routed through T-Hubs and TIHs",
      "Access to testbeds, research infrastructure and hub mentoring",
      "Industry-academia collaboration through the hub network",
    ],
    howToApply: [
      {
        title: "Map to the right Thematic Hub",
        detail:
          "Computing (IISc), communication, sensing and metrology, or materials and devices — each hub sits at a different institute with a different vertical. Apply to the one your technology belongs to.",
      },
      {
        title: "Secure DPIIT recognition and confirm Indian ownership",
        detail:
          "The startup support guidelines favour DPIIT-recognised, Indian-owned and Indian-controlled entities. Get this settled before a call opens.",
      },
      {
        title: "Prepare the technical proposal",
        detail:
          "Applications are evaluated on need, feasibility, impact, novelty, team strength and the fund-utilisation plan. Every one of those six is scored — address them explicitly rather than assuming the technology speaks for itself.",
      },
      {
        title: "Apply through the online call or challenge",
        detail:
          "Startups apply against published calls and challenges; other applicants apply through DST/NQM calls or the relevant T-Hub directly.",
      },
      {
        title: "Execute against milestones with hub oversight",
        detail:
          "Large grants come with proportionate reporting. Utilisation certificates, technical milestone reviews and hub governance are part of the deal.",
      },
    ],
    caaSupport: [
      "DPIIT recognition and an ownership-and-control review against the Indian-owned condition",
      "Fund-utilisation plan and budget structured to the six evaluation criteria the committee actually scores",
      "Statutory and financial infrastructure capable of carrying a grant of this size — books, audit, and segregated project accounting",
      "Utilisation certificates and milestone reporting through the multi-year grant period",
    ],
    caaServices: [
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    links: [
      { label: "National Quantum Mission", href: "https://www.psa.gov.in/mission/national-quantum-mission/26" },
      { label: "Startup support guidelines (PDF)", href: "https://dst.gov.in/sites/default/files/Guidelines%20to%20support%20start-ups.pdf" },
    ],
  },

  // ── 11 ─────────────────────────────────────────────────────────────────────
  {
    slug: "prism",
    name: "Promoting Innovations in Individuals, Start-ups and MSMEs",
    abbr: "PRISM",
    ministry: "Department of Scientific & Industrial Research (DSIR)",
    agency: "TePP Outreach cum Cluster Innovation Centres (TOCICs)",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Ideation", "Prototype / PoC"],
    sectors: ["Sector Agnostic", "Manufacturing"],
    headline:
      "Grant-in-aid for individual innovators, startups and MSMEs to build prototypes and move towards patenting and commercialisation.",
    amount: "Phase I: up to ₹2 lakh or ₹20 lakh by category · Phase II: up to ₹50 lakh",
    timeline: "Proposals evaluated by the PRISM Advisory and Screening Committee",
    whatIsThis:
      "PRISM is the scheme for the individual innovator — the person with a working idea and no company. DSIR runs it through TOCICs hosted at universities and national labs, with a central screening committee in Delhi. Phase I funds prototype development at two ceilings; Phase II funds scale-up and commercialisation at up to ₹50 lakh for half the project cost.",
    objectives: [
      "Support individual innovators with finance to build prototypes and develop technologies",
      "Move grassroots innovations towards patenting and commercialisation",
      "Deliver the scheme nationally through TOCICs at universities and national research laboratories",
    ],
    eligibility: [
      "Any Indian citizen with an innovative idea who wishes to translate it into a working prototype, model or process",
      "Public-funded institutions or organisations — autonomous bodies, or societies registered under the Societies Registration Act 1860 or Indian Trusts Act 1882 — engaged in promotion of innovation",
      "Startups and MSMEs with technology or product innovation ideas",
    ],
    benefits: [
      "Phase I Category I: up to ₹2 lakh or 90% of approved project cost",
      "Phase I Category II: up to ₹20 lakh or 90% of approved project cost",
      "Phase II: up to ₹50 lakh or 50% of approved project cost",
      "PRISM R&D proposals: up to ₹50 lakh, limited to 50% of project cost, for technology solutions serving MSME clusters",
      "Mentoring and prototype support through the TOCIC network",
    ],
    howToApply: [
      {
        title: "Find your nearest TOCIC",
        detail:
          "TOCICs are hosted at universities and national labs and act as the intake point. Their technical staff also help shape the proposal before it goes to the screening committee.",
      },
      {
        title: "Choose the right phase and category",
        detail:
          "Phase I Category I for a small proof of concept, Category II for a substantive prototype, Phase II for scale-up. Applying at the wrong ceiling wastes a cycle.",
      },
      {
        title: "Write the technical proposal",
        detail:
          "Problem, technical approach, novelty relative to existing solutions, prototype plan, costed budget and the commercialisation path. Cost sharing applies — 10% in Phase I, 50% in Phase II.",
      },
      {
        title: "Submit via DSIR and face the PASC",
        detail:
          "The PRISM Advisory and Screening Committee evaluates proposals. Be ready to defend novelty and to show you can fund your share.",
      },
      {
        title: "Execute and report",
        detail:
          "Funds release against the sanctioned budget with 10% of grants released to the monitoring agency for project oversight.",
      },
    ],
    caaSupport: [
      "Deciding whether to apply as an individual innovator or incorporate first — and the tax and IP consequences of each",
      "Proposal budgeting including your cost-share, and the funding plan that proves you can meet it",
      "Prototype-to-enterprise path: incorporation, DPIIT recognition and the follow-on schemes once the prototype works",
      "IP strategy so the innovation is protected before it is disclosed in a proposal",
    ],
    caaServices: [
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
      { label: "Patent Registration", href: "/services/patent-registration" },
    ],
    links: [
      {
        label: "DSIR — PRISM",
        href: "https://www.dsir.gov.in/offerings/schemes-and-services/details/promoting-innovations-in-individuals-start-ups-and-msmes-prism-kjMwITMtQWa",
      },
    ],
  },

  // ── 12 ─────────────────────────────────────────────────────────────────────
  {
    slug: "biotechnology-ignition-grant",
    name: "Biotechnology Ignition Grant Scheme",
    abbr: "BIG",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Ideation", "Prototype / PoC"],
    sectors: ["Biotech & Life Sciences"],
    popular: true,
    headline:
      "India's largest early-stage biotech grant — up to ₹50 lakh over 18 months, with no equity dilution.",
    amount: "Grant-in-aid up to ₹50 lakh for up to 18 months",
    timeline: "Calls twice a year, typically 1 January and 1 July, open 30–45 days",
    whatIsThis:
      "BIG is BIRAC's flagship and the single most important funding line for early biotech in India. It backs individual entrepreneurs and young startups taking a scientific idea to proof of concept, and it is a pure grant — no equity, no repayment. The one structural requirement founders miss is that the applicant must be incubated at an incubator, which may or may not be BIRAC-supported.",
    objectives: [
      "Support young startups and entrepreneurial individuals in biotechnology",
      "Translate innovative biotech ideas into demonstrated proof of concept",
      "Build the pipeline that later scholarship, SEED and LEAP funding draws from",
    ],
    eligibility: [
      "Individual entrepreneurs and startups in biotechnology",
      "The applicant must be incubated in an incubator, which may or may not be BIRAC-supported",
      "Focus on commercially promising ideas at the proof-of-concept stage",
    ],
    benefits: [
      "Grant-in-aid of up to ₹50 lakh for a period of up to 18 months",
      "No equity dilution and no repayment",
      "Networking with experts, mentors, industry and investors during the BIG tenure",
      "Specialised training, workshops and platform exposure on merit",
    ],
    documents: [
      "Technical proposal with scientific rationale and preliminary data",
      "Incubation letter or agreement from the host incubator",
      "Team CVs, including the principal investigator's",
      "Budget with justification by head — consumables, equipment, manpower, outsourced testing",
      "Entity documents where applying as a startup: COI, PAN, DPIIT certificate",
    ],
    howToApply: [
      {
        title: "Secure incubation first",
        detail:
          "This is the requirement most applicants discover too late. Identify a bio-incubator — BioNEST centres are the obvious candidates — and get the incubation arrangement in place before the call opens.",
      },
      {
        title: "Watch the call window",
        detail:
          "BIRAC issues a national call at least twice a year, typically on 1 January and 1 July, open for 30 to 45 days. There is no rolling intake.",
      },
      {
        title: "Build the scientific case with preliminary data",
        detail:
          "The reviewers are scientists. Novelty against published literature, a defensible experimental plan, and any preliminary data you have carry more weight than market projections at this stage.",
      },
      {
        title: "Budget realistically by head",
        detail:
          "Consumables, equipment, manpower and outsourced testing, each justified. Over-budgeting on equipment is a common flag; BIG is meant to buy experiments, not build a lab.",
      },
      {
        title: "Submit online through birac.nic.in and defend it",
        detail:
          "Applications are accepted online only. Shortlisted applicants present to a technical expert committee — prepare for a scientific defence, not a business pitch.",
      },
    ],
    caaSupport: [
      "Incubator identification and the incubation arrangement that makes you eligible in the first place",
      "Entity structuring — company or LLP — and DPIIT recognition ahead of the call",
      "Budget construction by head with the justification the technical committee expects",
      "Grant accounting: separate project ledger, utilisation certificates and the 18-month reporting discipline",
      "The follow-on map: BIG to BIRAC SEED to LEAP as the science matures",
    ],
    caaServices: [
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    ],
    watchOuts: [
      "Missing the January or July window costs you six months. Prepare against the calendar, not against inspiration.",
      "Grant funds must be spent on sanctioned heads. Re-appropriation without approval is the classic utilisation-certificate failure.",
    ],
    links: [
      { label: "BIRAC — BIG FAQs", href: "https://birac.nic.in/big.php" },
      { label: "BIG guidelines (PDF)", href: "https://birac.nic.in/webcontent/1761936564_big_new_guidelines_nov_2025.pdf" },
    ],
  },

  // ── 13 ─────────────────────────────────────────────────────────────────────
  {
    slug: "ace-fund",
    name: "Biotechnology Innovation Fund – Accelerating Entrepreneurs",
    abbr: "AcE",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC",
    focus: "Startup-Specific",
    support: "Equity",
    stages: ["Growth / Scaling"],
    sectors: ["Biotech & Life Sciences"],
    headline:
      "BIRAC's equity fund-of-funds for biotech — daughter funds write cheques of up to ₹7 crore, with ₹3.5 crore of follow-on.",
    amount: "Ticket up to ₹7 crore per startup, plus follow-on up to ₹3.5 crore",
    timeline: "Daughter-fund diligence cycle, typically 2–6 months",
    whatIsThis:
      "AcE is the biotech equivalent of the Fund of Funds: BIRAC commits capital to SEBI-registered AIFs, which commit to investing twice BIRAC's contribution into biotech startups. You raise from the daughter fund, not from BIRAC. It is the natural graduation path for a company that has already been through BIG or SEED and now needs institutional venture capital.",
    objectives: [
      "Partner with fund managers and invest in SEBI-registered AIFs focused on biotech",
      "Ensure daughter funds commit 2x BIRAC's contribution into biotech startups",
      "Build a dedicated pool of venture capital for Indian life sciences",
    ],
    eligibility: [
      "AcE invests in and partners with SEBI-registered Category I and II AIFs in the biotech sector",
      "Startups and SMEs in healthcare, life sciences, pharma, biopharma, medtech, diagnostics, industrial biotech, agri-tech and bio-IT services",
    ],
    benefits: [
      "AcE commits up to ₹30 crore, or up to 30% of the fund corpus, in each daughter fund",
      "Ticket size of up to ₹7 crore for an eligible startup",
      "Provision for additional follow-on funding of up to ₹3.5 crore",
      "Access to a fund manager with genuine life-sciences domain depth",
    ],
    howToApply: [
      {
        title: "Reach institutional readiness",
        detail:
          "AcE daughter funds invest in companies with validated science, regulatory pathway clarity and a route to revenue. If you are pre-proof-of-concept, BIG or SEED is the right door.",
      },
      {
        title: "Identify AcE daughter funds",
        detail:
          "BIRAC publishes the fund partners. Approach the funds whose thesis matches your sub-sector — diagnostics, medtech and biopharma have very different investor sets.",
      },
      {
        title: "Prepare the raise pack",
        detail:
          "Deck, three-statement model, regulatory pathway and timeline, IP position, clinical or validation data, and cap table. Life-sciences diligence goes deep on regulatory risk.",
      },
      {
        title: "Run diligence and close",
        detail:
          "Scientific, regulatory, financial and legal diligence, then term sheet and definitive documents, then the Indian company-law filings on allotment.",
      },
    ],
    caaSupport: [
      "Financial model and valuation framing for a long-gestation, regulatory-gated business",
      "Diligence readiness: books, IP register, grant-compliance history from BIG or SEED, statutory filings current",
      "Cap-table management across grant, convertible and equity instruments so the round does not break on legacy terms",
      "Post-round filings — PAS-3, valuation report, share certificates and register updates",
    ],
    caaServices: [
      { label: "Business Valuation", href: "/services/business-valuation" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
      { label: "Pitch Deck & Financial Model", href: "/contact" },
    ],
    links: [
      { label: "BIRAC — AcE Fund", href: "https://birac.nic.in/aceFund.php" },
      { label: "AcE Fund guidelines (PDF)", href: "https://birac.nic.in/webcontent/ace_fund_guidelines.pdf" },
    ],
  },

  // ── 14 ─────────────────────────────────────────────────────────────────────
  {
    slug: "birac-seed-fund",
    name: "BIRAC Incubator SEED Fund",
    abbr: "SEED",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC, through BioNEST incubators",
    focus: "Startup-Specific",
    support: "Equity",
    stages: ["Seed / Early Stage"],
    sectors: ["Biotech & Life Sciences"],
    headline:
      "Equity and equity-linked seed capital of up to ₹30 lakh, disbursed to biotech startups through BioNEST incubators.",
    amount: "Up to ₹30 lakh per startup as equity or equity-linked instruments",
    timeline: "Depends on the host incubator's investment committee cycle",
    whatIsThis:
      "The SEED Fund addresses the financial needs of technology startups in their initial phase of operations, and unlike BIG it is an equity instrument rather than a grant. Disbursement is through the incubator, and the explicit purpose is to make the startup investable — to get it to a point where an angel, a VC or a commercial bank will take it seriously.",
    objectives: [
      "Address the financial support requirements of technology startups in their initial phase",
      "Disburse funding to startups through BIRAC-supported incubators",
      "Enhance the startup's ability to raise angel or venture capital, or to seek commercial bank loans",
    ],
    eligibility: [
      "Biotech, medtech and life-sciences startups",
      "Association with a BIRAC or BioNEST incubator participating in the SEED programme",
    ],
    benefits: [
      "Seed funding as equity and equity-linked instruments up to ₹30 lakh per startup",
      "Incubator infrastructure — wet lab, equipment, regulatory guidance",
      "Positioning for the LEAP Fund, which picks up above the ₹30 lakh threshold",
    ],
    howToApply: [
      {
        title: "Get into a BioNEST or BIRAC-supported incubator",
        detail:
          "The SEED Fund is deployed by incubators to their own incubatees. BIRAC publishes the list of incubators associated with the programme.",
      },
      {
        title: "Confirm the right instrument for your stage",
        detail:
          "Below ₹30 lakh is SEED territory; above it, the LEAP Fund applies. Know which door you are knocking on before you build the case.",
      },
      {
        title: "Prepare the investment case",
        detail:
          "Science, market, regulatory pathway, use of funds and the milestones this cheque buys — plus a cap table that can absorb an equity instrument cleanly.",
      },
      {
        title: "Present to the incubator's investment committee",
        detail:
          "The committee assesses commercial potential alongside the science. Valuation and instrument terms are negotiated here.",
      },
      {
        title: "Close the instrument and report",
        detail:
          "Equity or equity-linked instruments mean company-law filings: board and shareholder resolutions, PAS-3, valuation report and updated register of members.",
      },
    ],
    caaSupport: [
      "Cap-table hygiene before an equity instrument lands — founder vesting, ESOP pool and legacy convertibles cleaned up",
      "Valuation report and the negotiation view on instrument terms",
      "Company-law execution: resolutions, PAS-3, share certificates and register of members",
      "Books and MIS that let the incubator monitor deployment without friction",
    ],
    caaServices: [
      { label: "Business Valuation", href: "/services/business-valuation" },
      { label: "Change in Directors / Shareholders", href: "/services/change-in-directors" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    ],
    links: [
      { label: "BIRAC SEED Fund", href: "https://www.birac.nic.in/seedFundNew.php" },
      { label: "SEED Fund guidelines (PDF)", href: "https://www.birac.nic.in/webcontent/1616486925_seed_fund_Guidelines.pdf" },
    ],
  },

  // ── 15 ─────────────────────────────────────────────────────────────────────
  {
    slug: "leap-fund",
    name: "LEAP Fund – Launching Entrepreneurial Driven Affordable Products",
    abbr: "LEAP",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC, through BioNEST LEAP fund partners",
    focus: "Startup-Specific",
    support: "Equity",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Biotech & Life Sciences"],
    headline:
      "Equity funding of more than ₹30 lakh and up to ₹1 crore for biotech startups ready to pilot or commercialise.",
    amount: "More than ₹30 lakh and up to ₹1 crore per startup",
    timeline: "Fund-partner investment committee cycle",
    whatIsThis:
      "LEAP picks up exactly where the BIRAC SEED Fund stops. It is for biotech startups that have a product and now need capital to pilot it, commercialise it and raise venture capital on the back of that traction. BioNEST bio-incubators act as LEAP fund partners, each holding up to ₹5 crore to invest against equity and equity-linked instruments.",
    objectives: [
      "Assist biotech startups in piloting and commercialising their products and technologies",
      "Enable them to raise venture capital investment on the strength of demonstrated commercial traction",
    ],
    eligibility: [
      "Startups in biotech, medtech and life-sciences sectors",
      "Startups suitable for up to ₹30 lakh are routed to the SEED Fund instead — LEAP is for larger requirements",
      "Association with a BioNEST bio-incubator acting as a LEAP fund partner",
    ],
    benefits: [
      "Funding support of more than ₹30 lakh and up to ₹1 crore per startup",
      "LEAP fund partners hold up to ₹5 crore each for investment against equity and equity-linked instruments",
      "Commercialisation and pilot support alongside the capital",
    ],
    howToApply: [
      {
        title: "Confirm you are past the SEED threshold",
        detail:
          "If your requirement is ₹30 lakh or less it will be considered under SEED, not LEAP. Size the ask against the milestone plan honestly.",
      },
      {
        title: "Identify a LEAP fund partner incubator",
        detail: "BIRAC lists the BioNEST bio-incubators operating as LEAP fund partners. Match on sub-sector and facilities.",
      },
      {
        title: "Build the commercialisation case",
        detail:
          "Manufacturing or scale-up plan, regulatory clearances obtained or pending, pilot customers, unit economics at scale and the funding milestones.",
      },
      {
        title: "Negotiate the instrument and close",
        detail:
          "Equity or equity-linked. Model the dilution and the interaction with any prior SEED instrument before you sign.",
      },
    ],
    caaSupport: [
      "Unit economics and scale-up financial model that survives an investment committee",
      "Valuation and dilution modelling across the SEED-to-LEAP-to-VC path",
      "Company-law execution on the instrument and clean cap-table maintenance",
      "Regulatory and licensing compliance mapping for the commercialisation phase",
    ],
    caaServices: [
      { label: "Business Valuation", href: "/services/business-valuation" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    links: [
      { label: "BIRAC — LEAP Fund", href: "https://birac.nic.in/leapFundNew.php" },
      { label: "LEAP Fund guidelines (PDF)", href: "https://birac.nic.in/webcontent/1616486900_leap_fund_guidelines.pdf" },
    ],
  },

  // ── 16 ─────────────────────────────────────────────────────────────────────
  {
    slug: "sparsh",
    name: "SPARSH – Social Innovation Programme for Products Affordable & Relevant to Social Health",
    abbr: "SPARSH",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Ideation", "Prototype / PoC"],
    sectors: ["Biotech & Life Sciences", "Rural & Social"],
    headline:
      "Grant of up to ₹50 lakh for affordable healthcare and biotech products aimed at underserved communities.",
    amount: "Grant-in-aid up to ₹50 lakh for up to 18 months",
    timeline: "Letter of Intent calls announced twice a year on a thematic area",
    whatIsThis:
      "SPARSH funds biotechnology solving social problems — affordable diagnostics, assistive devices, maternal and child health, sanitation. It runs in two components: Affordable Product Development, and the Social Innovation Immersion Programme. Startups and entrepreneurs apply under Category A of Component I, and the age limit is tight: under three years old.",
    objectives: [
      "Design biotechnological interventions that address critical societal issues",
      "Nurture social innovators within the biotech domain who can identify community needs and gaps",
      "Bring affordable, relevant health products to underserved populations",
    ],
    eligibility: [
      "Indian biotechnology startups less than 3 years old",
      "Limited Liability Partnerships less than 3 years old",
      "Indian academic scientists and researchers",
      "Applications fall under Category A of Component I — Affordable Product Development",
    ],
    benefits: [
      "Grant-in-aid assistance up to ₹50 lakh for a period of up to 18 months",
      "Social innovation immersion and mentoring",
      "Positioning for follow-on BIRAC funding once the product is validated",
    ],
    howToApply: [
      {
        title: "Watch the thematic call",
        detail:
          "SPARSH calls are announced twice a year on a specific theme with high societal impact. Your product must map to the announced theme — a strong application on last cycle's theme scores nothing.",
      },
      {
        title: "Check the 3-year age limit",
        detail:
          "Entities older than three years are ineligible. This catches out founders who incorporated early and started the science later.",
      },
      {
        title: "Submit the Letter of Intent online",
        detail: "The LoI goes through the BIRAC website. Shortlisted LoIs are invited to submit a full proposal.",
      },
      {
        title: "Evidence the affordability and the need",
        detail:
          "SPARSH judges social impact as rigorously as science. Quantify the target population, the current cost of the alternative and the price point you are engineering towards.",
      },
      {
        title: "Deliver against the 18-month plan",
        detail: "Milestone-linked release with utilisation reporting, as with every BIRAC grant.",
      },
    ],
    caaSupport: [
      "Entity-age check against the 3-year gate before you invest time in an LoI",
      "Social-impact framing with defensible numbers on the target population and cost baseline",
      "Costed 18-month development plan and grant budgeting by head",
      "Utilisation certificates and grant accounting through the project period",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
    ],
    links: [
      { label: "BIRAC", href: "https://www.birac.nic.in/" },
      { label: "SPARSH guidelines (PDF)", href: "https://birac.nic.in/webcontent/Sparsh_Guidelines_Ver4.pdf" },
    ],
  },

  // ── 17 ─────────────────────────────────────────────────────────────────────
  {
    slug: "agrisure",
    name: "AgriSURE – Agri Fund for Startups & Rural Enterprises",
    abbr: "AgriSURE",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    agency: "NABVENTURES (NABARD)",
    focus: "Startup-Specific",
    support: "Equity",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Agriculture & Food", "Rural & Social"],
    popular: true,
    headline:
      "A ₹750 crore blended-capital AIF backing agri-tech startups and rural enterprises, with direct equity tickets up to ₹25 crore.",
    amount: "₹750 crore fund · direct equity up to ₹25 crore per startup · around 85 startups targeted",
    timeline: "NABVENTURES diligence cycle",
    whatIsThis:
      "AgriSURE is a SEBI-registered Category II AIF jointly funded by the Government of India (₹250 crore), NABARD (₹250 crore) and private investors (₹250 crore). It invests through two routes: a fund-of-funds window with a ₹450 crore corpus, and a direct scheme with ₹300 crore. It is deliberately built for high-risk, high-impact, technology-driven ventures in agriculture — the category commercial VC has historically avoided.",
    objectives: [
      "Support innovative, technology-driven, high-impact startups in agriculture and allied sectors",
      "Improve the farm produce value chain, including FPO/FPC support, farm mechanisation and IT-based solutions",
      "Attract more investment into the agri and rural startup ecosystem through AIFs and direct investment",
      "Create employment and encourage youth entrepreneurship in agriculture",
    ],
    eligibility: [
      "Startups working in agriculture and rural development sectors",
      "SEBI-registered AIFs — sector-specific, sector-agnostic and debt AIFs — that invest in agri and rural startups",
      "FPO-linked innovations and value-chain ventures in agriculture",
    ],
    benefits: [
      "Investment through two routes: Fund of Funds (₹450 crore corpus) and Direct Scheme (₹300 crore corpus)",
      "Ticket size up to ₹25 crore, subject to investment merit and fund guidelines",
      "Grant-in-aid, incubation and mentoring support to eligible agri startups",
      "Equity, debt or blended capital depending on the business model",
    ],
    howToApply: [
      {
        title: "Decide direct or fund route",
        detail:
          "The direct scheme invests straight into the startup; the fund-of-funds route means raising from an AgriSURE-backed AIF. Larger, later-stage companies usually go direct.",
      },
      {
        title: "Approach NABVENTURES",
        detail:
          "Eligible startups and AIFs approach NABVENTURES through the AgriSURE page. There is a defined intake rather than a public call cycle.",
      },
      {
        title: "Build the agri-specific case",
        detail:
          "Farmer or FPO impact, seasonality in the cash-flow model, working-capital cycle, supply-chain risk and the technology moat. Generic SaaS metrics do not translate here.",
      },
      {
        title: "Clear diligence",
        detail:
          "NABARD-linked diligence looks hard at rural distribution reality and unit economics at farm gate, not just at gross merchandise value.",
      },
      {
        title: "Close and deploy",
        detail: "Equity, debt or blended instrument with the associated company-law filings on the Indian side.",
      },
    ],
    caaSupport: [
      "Agri-specific financial model — seasonality, working-capital cycle and farm-gate unit economics",
      "FPO and value-chain structuring where the model runs through producer organisations",
      "Diligence readiness and clean statutory history",
      "Instrument negotiation support and post-round company-law filings",
    ],
    caaServices: [
      { label: "Producer Company Registration", href: "/services/producer-company" },
      { label: "Pitch Deck & Financial Model", href: "/contact" },
      { label: "Business Valuation", href: "/services/business-valuation" },
    ],
    links: [
      { label: "NABVENTURES — AgriSURE", href: "https://nabventures.in/agrisure.aspx" },
      { label: "NABARD — AgriSURE", href: "https://www.nabard.org/agrisure.aspx" },
    ],
  },

  // ── 18 ─────────────────────────────────────────────────────────────────────
  {
    slug: "rkvy-agri-entrepreneurship",
    name: "Innovation & Agri-Entrepreneurship Program (RKVY)",
    abbr: "RKVY",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    agency: "RKVY-supported Agri-Business Incubators (R-ABIs)",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Ideation", "Seed / Early Stage"],
    sectors: ["Agriculture & Food"],
    headline:
      "Pre-seed and seed grants for agripreneurs — ₹5 lakh and ₹25 lakh respectively — delivered through agri-business incubators.",
    amount: "Up to ₹5 lakh pre-seed · up to ₹25 lakh seed stage",
    timeline: "Cohort-based through R-ABIs; applications through agristartup.gov.in",
    whatIsThis:
      "The RKVY agri-startup programme is the most accessible entry point in Indian agritech. Grants are modest but the bar is proportionate, and the money comes with two months of structured incubation at an R-ABI — usually an agricultural university or ICAR institute. For a first-time agripreneur, the incubation and network are worth as much as the cheque.",
    objectives: [
      "Promote innovation and agripreneurship by providing financial support",
      "Nurture the agri incubation ecosystem through R-ABIs",
      "Strengthen infrastructure in agriculture and allied areas",
    ],
    eligibility: [
      "DPIIT-recognised startups in agriculture and allied sectors",
      "Agripreneurs applying through RKVY-supported agri-business incubators",
    ],
    benefits: [
      "Pre-seed stage support up to ₹5 lakh through R-ABIs",
      "Seed-stage support up to ₹25 lakh through R-ABIs",
      "Structured incubation, mentoring and grant-in-aid",
      "Access to the agricultural university and ICAR network",
    ],
    howToApply: [
      {
        title: "Get DPIIT recognition",
        detail: "It is the stated eligibility condition for the programme.",
      },
      {
        title: "Choose your R-ABI",
        detail:
          "R-ABIs are hosted at agricultural universities and ICAR institutes across states. Pick on crop, commodity or technology fit — and on proximity, because the incubation is partly residential.",
      },
      {
        title: "Apply through agristartup.gov.in",
        detail: "Applications and cohort announcements run through the central agri-startup portal.",
      },
      {
        title: "Complete the incubation programme",
        detail:
          "Selected startups go through a structured programme at the R-ABI before and alongside grant disbursal. Attendance and milestone completion are conditions of release.",
      },
      {
        title: "Draw the grant against milestones and report",
        detail: "Grant-in-aid releases in tranches against the agreed plan, with utilisation reporting to the R-ABI.",
      },
    ],
    caaSupport: [
      "DPIIT recognition and entity setup ahead of the cohort application",
      "R-ABI shortlisting by commodity, crop and technology fit",
      "Application, business plan and costed milestone budget",
      "Grant accounting and utilisation reporting through the incubation period",
    ],
    caaServices: [
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
    ],
    links: [
      { label: "Agri Startup portal", href: "https://agristartup.gov.in/" },
      { label: "RKVY operational guidelines (PDF)", href: "https://agristartup.gov.in/LetterAndCircular/OperationalGuidelineRKVY.pdf" },
    ],
  },

  // ── 19 ─────────────────────────────────────────────────────────────────────
  {
    slug: "samridh",
    name: "SAMRIDH – Startup Accelerators of MeitY for Product Innovation, Development & Growth",
    abbr: "SAMRIDH",
    ministry: "Ministry of Electronics & Information Technology (MeitY)",
    agency: "Selected accelerators",
    focus: "Startup-Specific",
    support: "Equity",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["IT & Software"],
    headline:
      "Up to ₹40 lakh of government investment into software product startups, matched rupee-for-rupee by the accelerator or a co-investor.",
    amount: "Up to ₹40 lakh per startup (avg ₹30 lakh), plus equal matching private investment up to ₹40 lakh",
    timeline: "Accelerator cohort cycles, typically 4–6 months",
    whatIsThis:
      "SAMRIDH funds accelerators, which then select and back IT product startups. The structure is what makes it interesting: MeitY's investment must be matched by an equal private cheque from the accelerator or a co-investor, so a selected startup can see up to ₹80 lakh in total. Alongside the money, the accelerator delivers customer connects, investor connects and internationalisation support.",
    objectives: [
      "Support existing and upcoming accelerators to select and accelerate IT-based startups to scale",
      "Provide customer connect, investor connect and internationalisation services",
      "Fund the startup alongside the acceleration programme",
    ],
    eligibility: [
      "IT-based startups selected through a SAMRIDH-supported accelerator",
      "Accelerators must be Section 8 companies under the Companies Act 2013, or societies registered under the Societies Registration Act (not-for-profit)",
    ],
    benefits: [
      "Investment of up to ₹40 lakh to the beneficiary startup, averaging ₹30 lakh per startup per cohort",
      "Equal matching private investment of up to ₹40 lakh from the accelerator or a co-investor",
      "Customer connect, investor connect, capacity enhancement and product enhancement services",
      "Accelerators receive ₹2 lakh per startup, up to ₹20 lakh per cohort, to fund those services",
    ],
    howToApply: [
      {
        title: "Find the SAMRIDH accelerators",
        detail:
          "MeitY Startup Hub publishes the list of accelerators benefiting from SAMRIDH. Assess them on sector focus, cohort timing and the quality of their corporate network — not on brand.",
      },
      {
        title: "Apply to the accelerator's cohort, not to MeitY",
        detail:
          "There is no direct government application. Each accelerator runs its own intake, selection and cohort calendar.",
      },
      {
        title: "Prepare a product-and-traction pack",
        detail:
          "SAMRIDH is for IT product startups. Show the product, the ARR or usage metrics, the pipeline and where the acceleration budget will move the needle.",
      },
      {
        title: "Clear selection and negotiate the instrument",
        detail:
          "Investment terms are set with the accelerator. Understand the matching structure and what the co-investor is getting before you sign.",
      },
      {
        title: "Run the cohort and use the connects",
        detail:
          "The customer and investor introductions are frequently worth more than the cheque. Treat the cohort as a sales cycle, not a course.",
      },
    ],
    caaSupport: [
      "Accelerator shortlisting by sector, network and cohort timing",
      "Financial model and traction pack built for an accelerator selection committee",
      "Instrument and matching-investment review before signature — valuation, dilution and co-investor rights",
      "Post-investment company-law filings and ongoing books and MIS the accelerator will ask for",
    ],
    caaServices: [
      { label: "Pitch Deck & Financial Model", href: "/contact" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    links: [
      { label: "MeitY Startup Hub — SAMRIDH", href: "https://msh.meity.gov.in/schemes/samridh" },
      { label: "Scheme report (PDF)", href: "https://msh.meity.gov.in/assets/Scheme-Report.pdf" },
    ],
  },

  // ── 20 ─────────────────────────────────────────────────────────────────────
  {
    slug: "genesis",
    name: "GENESIS – Gen-Next Support for Innovative Startups",
    abbr: "GENESIS",
    ministry: "Ministry of Electronics & Information Technology (MeitY)",
    agency: "Implementing Agencies (incubators, accelerators, institutes)",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Ideation", "Prototype / PoC", "Growth / Scaling"],
    sectors: ["IT & Software", "Deep Tech", "Semiconductor & Electronics"],
    headline:
      "A ₹490 crore scheme built specifically for technology startups in Tier-II and Tier-III cities — from ₹10 lakh pilots to ₹1 crore deep-tech cheques.",
    amount: "₹10 lakh for early-stage · up to ₹1 crore for deep-tech startups · ₹490 crore scheme outlay",
    timeline: "Applications accepted throughout the year",
    whatIsThis:
      "GENESIS is the answer to a real structural problem: almost all startup capital concentrates in six cities. It funds roughly 50 Implementing Agencies to discover, support and scale technology startups outside the metros, with money flowing to startups as EiR support, pilot funding, investment and deep-tech funding. Applications are open year-round, which makes it unusually accessible.",
    objectives: [
      "Support eligible Implementing Agencies to fund and mentor technology startups in Tier-II and Tier-III cities",
      "Provide access to innovation infrastructure and ecosystem outside the metro hubs",
      "Build capacity in the Tier-II and Tier-III startup ecosystem",
    ],
    eligibility: [
      "Technology startups and entrepreneurs located in Tier-II and Tier-III cities, including deep-tech ventures",
      "Implementing Agencies: Section 8 entities, incubators, accelerators, and UGC/AICTE-recognised educational institutes or bodies formed under a Central/State Act",
    ],
    benefits: [
      "Investment and pilot funding from ₹10 lakh for early-stage startups to up to ₹1 crore for deep-tech startups",
      "Recurring financial support to approximately 50 Implementing Agencies across the scheme period",
      "Entrepreneur-in-Residence support, pilot funding and ecosystem capacity building",
    ],
    howToApply: [
      {
        title: "Confirm your location qualifies",
        detail:
          "GENESIS is geographically targeted. A registered office in a Tier-II or Tier-III city is the entry condition — and it is worth structuring for if you are genuinely operating there.",
      },
      {
        title: "Identify the Implementing Agency in your region",
        detail:
          "Startups engage through an IA rather than with MeitY directly. MeitY Startup Hub carries the current list.",
      },
      {
        title: "Match your ask to the right component",
        detail:
          "EiR support, pilot funding, investment and deep-tech funding are separate windows with different ceilings. A ₹1 crore ask needs a genuine deep-tech case.",
      },
      {
        title: "Apply online through the GENESIS page",
        detail: "Applications are accepted throughout the year via msh.meity.gov.in — no call window to miss.",
      },
      {
        title: "Deliver the pilot and report",
        detail: "Pilot funding is milestone-based; deep-tech funding carries longer technical review cycles.",
      },
    ],
    caaSupport: [
      "Registered-office and entity structuring where a genuine Tier-II/III presence should be reflected on record",
      "Implementing Agency identification and application preparation",
      "Deep-tech positioning and financial projections for the ₹1 crore window",
      "Pilot milestone budgeting, grant accounting and utilisation reporting",
    ],
    caaServices: [
      { label: "Registered Office Change", href: "/services/registered-office-change" },
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
    ],
    links: [
      { label: "MeitY Startup Hub — GENESIS", href: "https://msh.meity.gov.in/schemes/genesis" },
      { label: "GENESIS brochure (PDF)", href: "https://www.meity.gov.in/static/uploads/2024/02/Brochure_GENESIS.pdf" },
    ],
  },

  // ── 21 ─────────────────────────────────────────────────────────────────────
  {
    slug: "stpi-ngis",
    name: "STPI – Next Generation Incubation Scheme",
    abbr: "NGIS",
    ministry: "Ministry of Electronics & Information Technology (MeitY)",
    agency: "Software Technology Parks of India (STPI)",
    focus: "Startup-Specific",
    support: "Incubation",
    stages: ["Ideation", "Prototype / PoC", "Seed / Early Stage"],
    sectors: ["IT & Software"],
    headline:
      "Incubation plus seed or risk funding of up to ₹25 lakh for software product startups across 12 STPI centres in Tier-II/III cities.",
    amount: "Seed / risk funding up to ₹25 lakh · scheme outlay ₹95.03 crore · 300 startups targeted",
    timeline: "Open calls through the STPI startup portal",
    whatIsThis:
      "NGIS is STPI's software-product incubation scheme, aimed squarely at strengthening the product ecosystem outside the metros. It handholds 300 tech startups across 12 STPI incubation locations, combining physical infrastructure and testing facilities with seed capital, mentoring and market-access support.",
    objectives: [
      "Strengthen India's software product startup ecosystem, especially in Tier-II and Tier-III cities",
      "Handhold 300 tech startups across 12 STPI incubation locations",
      "Provide infrastructure, funding and market access under one roof",
    ],
    eligibility: [
      "Indian startups working on software product development or technology-based solutions",
      "DPIIT-recognised startups are encouraged",
      "Individuals, academicians, researchers, entrepreneurs, LLPs and partnership firms may also participate, but may need to register as a private limited company if selected",
    ],
    benefits: [
      "Seed or risk funding up to ₹25 lakh for promising startups",
      "Access to incubation infrastructure, labs, equipment and testing facilities",
      "Mentoring, startup connect, industry networking and marketing support",
      "Internship and challenge grants for selected startups",
    ],
    howToApply: [
      {
        title: "Pick the STPI centre",
        detail:
          "Twelve NGIS locations, each with a domain focus. Choose on domain and on where you can actually maintain a presence.",
      },
      {
        title: "Prepare for possible incorporation",
        detail:
          "Individuals and firms can apply, but selection may require registering as a private limited company. Plan for that rather than scrambling after selection.",
      },
      {
        title: "Submit the proposal during an open call",
        detail: "Applications go through the STPI/NGIS application portal during call windows.",
      },
      {
        title: "Clear evaluation and enter incubation",
        detail:
          "Selection covers the product, market and team. Seed or risk funding is sanctioned alongside the incubation offer.",
      },
      {
        title: "Use the infrastructure, not just the money",
        detail: "Labs, testing facilities and STPI's industry network are the durable part of the benefit.",
      },
    ],
    caaSupport: [
      "Incorporation as a private limited company where selection requires it — done fast enough not to jeopardise the offer",
      "DPIIT recognition to strengthen the application",
      "Application, product note and financial projections",
      "Post-selection compliance: statutory registrations, books and grant reporting",
    ],
    caaServices: [
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
    ],
    links: [{ label: "STPI Startup Portal", href: "https://startup.stpi.in/" }],
  },

  // ── 22 ─────────────────────────────────────────────────────────────────────
  {
    slug: "chips-to-startup",
    name: "Chips to Startup Programme",
    abbr: "C2S",
    ministry: "Ministry of Electronics & Information Technology (MeitY)",
    focus: "Startup-Specific",
    support: "Incubation",
    stages: ["Prototype / PoC"],
    sectors: ["Semiconductor & Electronics", "Deep Tech"],
    headline:
      "Chip design support — EDA tools, IP cores, MPW fabrication and prototyping — to build India's fabless semiconductor startup ecosystem.",
    amount: "Project-based; support varies under the approved C2S project",
    timeline: "Project proposals evaluated against MeitY's prescribed format",
    whatIsThis:
      "C2S attacks the two things that make chip design impossible for a startup: EDA tool licences that cost more than a seed round, and access to fabrication. The programme provides both, alongside IP repository access, MPW shuttle runs and mentoring, and trains specialised VLSI and embedded-system professionals over a five-year horizon. Startups participate mainly through academia-industry collaborative projects, challenges and RFPs.",
    objectives: [
      "Train specialised professionals in VLSI and embedded system design over five years",
      "Promote design and development of ASICs, SoCs, FPGAs, reusable IP cores and prototypes",
      "Create a strong fabless chip-design startup ecosystem and support indigenous semiconductor innovation",
    ],
    eligibility: [
      "Academic institutions and R&D organisations across India, including IITs, NITs, IIITs, and government or private colleges",
      "Startups and MSMEs, through academia-industry collaborative projects, grand challenges, hackathons, or RFPs for System/SoC/IP core development",
    ],
    benefits: [
      "Financial and technical support for chip-design projects under approved categories",
      "Access to EDA tools, an IP repository, fabrication and MPW support, prototyping and mentoring",
      "Support for manpower training, R&D, hardware IP design, system design, prototype development and deployment",
    ],
    howToApply: [
      {
        title: "Find an academic partner",
        detail:
          "The startup route into C2S runs largely through collaborative projects with an institution, or through challenges and RFPs. Build the academic relationship before the call.",
      },
      {
        title: "Define the silicon deliverable",
        detail:
          "A C2S proposal is judged on the design artefact — SoC, IP core, FPGA prototype or working silicon. Vague 'we will explore' proposals do not survive review.",
      },
      {
        title: "Submit through the C2S portal in MeitY's format",
        detail: "Proposals are submitted online in the prescribed format at c2s.gov.in.",
      },
      {
        title: "Execute the design and tape-out plan",
        detail:
          "MPW shuttle schedules are fixed and unforgiving. Build the project plan backwards from the tape-out window.",
      },
    ],
    caaSupport: [
      "Structuring the academia-industry collaboration — the agreement, IP ownership and revenue-share terms",
      "IP protection strategy before designs are disclosed in a collaborative project",
      "Project budgeting and grant accounting",
      "Entity and compliance base so a fabless startup can hold and licence the IP cleanly",
    ],
    caaServices: [
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "Legal Drafting & Agreements", href: "/contact" },
    ],
    links: [
      { label: "C2S official portal", href: "https://www.c2s.gov.in/" },
      { label: "About C2S", href: "https://www.c2s.gov.in/about_c2s.jsp" },
    ],
  },

  // ── 23 ─────────────────────────────────────────────────────────────────────
  {
    slug: "idex",
    name: "Innovations for Defence Excellence",
    abbr: "iDEX",
    ministry: "Ministry of Defence",
    agency: "Defence Innovation Organisation (DIO)",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Prototype / PoC", "Seed / Early Stage", "Market Access & IP"],
    sectors: ["Defence & Aerospace", "Deep Tech"],
    popular: true,
    headline:
      "Challenge-led defence innovation — grants from ₹1.5 crore to ₹10 crore, with a procurement pathway to the armed forces at the end of it.",
    amount: "SPARK grants up to ₹1.5 crore · iDEX Prime up to ₹10 crore",
    timeline: "Challenge cycles; prototype development typically 12–24 months",
    whatIsThis:
      "iDEX is the most commercially serious government programme on this list, because the grant is not the prize — the procurement order is. The armed forces and defence PSUs publish problem statements; startups compete to solve them; winners get grant funding, a Partner Incubator, user trials with the actual service, and a defined path to a defence contract. That last element is what no private investor can offer.",
    objectives: [
      "Support self-reliance in defence and defence production",
      "Connect startups, MSMEs and individual innovators with the armed forces and defence PSUs",
      "Partner with incubators to give innovators mentoring and access to test infrastructure",
    ],
    eligibility: [
      "DPIIT-recognised startups",
      "Any company incorporated under the Companies Act, primarily an MSME as defined under the MSME Act",
      "Individual innovators may also apply",
    ],
    benefits: [
      "Grants ranging from ₹1.5 crore to ₹10 crore depending on the scheme or challenge",
      "Prototype grant plus user mentoring and access to service test facilities",
      "A defined procurement pathway with the armed forces and defence PSUs",
      "Support from iDEX Partner Incubators through accelerator programmes and challenges",
    ],
    documents: [
      "DPIIT recognition or MSME/Udyam registration",
      "Technical proposal against the specific problem statement",
      "Team credentials and relevant prior work",
      "Financial statements and capability to co-fund the balance project cost",
      "IP declarations and, where applicable, security clearances",
    ],
    howToApply: [
      {
        title: "Track the challenge cycles",
        detail:
          "iDEX runs on published Defence India Startup Challenges. Watch idex.gov.in/challenges — problem statements are specific, and a general defence-tech pitch outside a challenge goes nowhere.",
      },
      {
        title: "Pick a problem statement you can actually deliver",
        detail:
          "Each statement carries technical specifications set by a service or DPSU. Assess honestly whether your team can hit the spec inside the timeline before committing.",
      },
      {
        title: "Prepare the technical and commercial proposal",
        detail:
          "Technical approach against the spec, development plan, milestones, team credentials and costing. Grant covers a share of the product development budget; show how you fund the rest.",
      },
      {
        title: "Clear evaluation and pitch",
        detail:
          "Screening, then a pitch to an evaluation committee including service representatives. They know the domain — over-claiming is quickly exposed.",
      },
      {
        title: "Build with your Partner Incubator and go to user trials",
        detail:
          "Winners are attached to a Partner Incubator, build against milestones, and go into trials with the end user. Trials are where the procurement conversation actually begins.",
      },
    ],
    caaSupport: [
      "DPIIT recognition and MSME/Udyam registration — both routinely relevant to defence eligibility and procurement preference",
      "Costing and financial capability documentation showing you can carry the non-grant share",
      "IP strategy and the ownership terms in the iDEX contracting framework, reviewed before signature",
      "Milestone-linked grant accounting, utilisation certificates and audit readiness through a multi-year build",
      "Post-trial procurement readiness: GeM listing, vendor registrations and the compliance a defence order demands",
    ],
    caaServices: [
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "Patent Registration", href: "/services/patent-registration" },
    ],
    watchOuts: [
      "Defence timelines slip. Build a cash-flow plan that survives a trial cycle running six months late.",
      "IP and data ownership terms in the contracting framework deserve a proper read before you sign, not after.",
    ],
    links: [
      { label: "iDEX challenges", href: "https://idex.gov.in/challenges" },
      { label: "iDEX resources & guidelines", href: "https://idex.gov.in/res" },
    ],
  },

  // ── 24 ─────────────────────────────────────────────────────────────────────
  {
    slug: "aditi",
    name: "ADITI – Acing Development of Innovative Technologies with iDEX",
    abbr: "ADITI",
    ministry: "Ministry of Defence",
    agency: "Defence Innovation Organisation (DIO)",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Prototype / PoC", "Growth / Scaling"],
    sectors: ["Defence & Aerospace", "Deep Tech"],
    headline:
      "The heavyweight iDEX window — grant-in-aid up to ₹25 crore for critical and strategic defence technologies.",
    amount: "Up to 50% of product development budget, capped at ₹25 crore per project",
    timeline: "Challenge and hackathon cycles under the iDEX framework",
    whatIsThis:
      "ADITI is the sub-scheme for defence technologies too large and too strategic for a standard iDEX grant — the kind requiring a product development budget of ₹50 crore or beyond. Challenges are organised around earmarked critical technologies, and winners are incubated by iDEX Partner Incubators. This is the largest single grant a defence startup can access in India.",
    objectives: [
      "Facilitate rapid development of strategically critical and sensitive defence technologies",
      "Organise targeted challenges and hackathons around earmarked technology areas",
      "Incubate challenge winners through iDEX Partner Incubators",
    ],
    eligibility: [
      "DPIIT-recognised startups",
      "Any Indian company incorporated under the Companies Act 1956 or 2013",
      "Individual innovators may also apply",
    ],
    benefits: [
      "Grant of up to 50% of the product development budget, with a maximum of ₹25 crore",
      "Supports a product development budget of around ₹50 crore or beyond",
      "Partner Incubator support, with ₹9 lakh per PI paid on milestone completion",
      "User engagement under the iDEX framework",
    ],
    howToApply: [
      {
        title: "Confirm you can fund the other half",
        detail:
          "The grant caps at 50% of the product development budget. A ₹25 crore grant implies a ₹50 crore programme — the co-funding plan is scrutinised, not assumed.",
      },
      {
        title: "Watch for ADITI challenges in your technology area",
        detail:
          "ADITI runs around earmarked critical technologies. The window opens per challenge; there is no general application.",
      },
      {
        title: "Build a programme-grade proposal",
        detail:
          "At this scale, evaluators want a credible engineering programme: work breakdown, risk register, test plan, manufacturing route and team depth — not a startup deck.",
      },
      {
        title: "Clear evaluation and contract",
        detail:
          "Winners are incubated by Partner Incubators and contract with DIO on milestone terms.",
      },
      {
        title: "Execute with audit-grade discipline",
        detail:
          "A ₹25 crore grant carries proportionate audit, reporting and governance obligations across multiple years.",
      },
    ],
    caaSupport: [
      "Co-funding strategy: the debt, equity or internal accrual plan for the non-grant 50%, documented to survive scrutiny",
      "Programme-scale financial modelling and cost build-up",
      "Governance and controls a ₹25 crore grant requires — segregated project accounting, internal audit, board oversight",
      "Utilisation certificates, statutory audit and milestone reporting across the programme life",
    ],
    caaServices: [
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
      { label: "Audit (Statutory / Tax / Internal)", href: "/services/tax-audit" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
    ],
    links: [
      { label: "iDEX", href: "https://idex.gov.in/" },
      { label: "ADITI scheme document (PDF)", href: "https://idex.gov.in//uploads/page/aditi_scheeme.pdf" },
    ],
  },

  // ── 25 ─────────────────────────────────────────────────────────────────────
  {
    slug: "technology-development-fund",
    name: "Technology Development Fund",
    abbr: "TDF",
    ministry: "Ministry of Defence",
    agency: "DRDO",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Prototype / PoC", "Growth / Scaling"],
    sectors: ["Defence & Aerospace", "Deep Tech", "Manufacturing"],
    headline:
      "DRDO grant funding up to ₹10 crore, covering up to 90% of project cost, to indigenise defence technologies.",
    amount: "Project cost up to ₹10 crore considered, funded up to 90%",
    timeline: "Project-driven; TDF projects typically run 12–24 months",
    whatIsThis:
      "TDF funds Indian industry — especially MSMEs and startups — to develop technologies the Services actually need. DRDO publishes project requirements drawn from Service Headquarters, and eligible companies apply against them. The 90% funding ratio is among the most generous available, and DRDO provides technical mentoring through the development.",
    objectives: [
      "Promote self-reliance in defence technology as part of the Make in India initiative",
      "Convert Service Headquarters' requirements for upgraded and futuristic systems into funded development projects",
      "Build indigenous capability in MSMEs and startups",
    ],
    eligibility: [
      "Public limited company, private limited company, partnership firm, LLP, one-person company or sole proprietorship registered under applicable Indian laws",
      "DPIIT-recognised startups incubated at a Central or State Government assisted incubator",
      "At least 50% of the startup's shares must be owned and controlled by Indian citizens",
    ],
    benefits: [
      "Project cost of up to ₹10 crore considered for funding",
      "Funding of up to 90% of the project cost as grant",
      "DRDO technical mentoring through the development",
      "Financial assistance specifically for prototype development and trials",
    ],
    howToApply: [
      {
        title: "Check the incubation and ownership conditions",
        detail:
          "Startups must be incubated at a Central or State Government assisted incubator, and at least 50% Indian ownership and control is mandatory. Both catch applicants out.",
      },
      {
        title: "Register on the TDF portal and study the open projects",
        detail:
          "The process is fully digitised at tdf.drdo.gov.in. Projects are published with technical requirements from Service Headquarters.",
      },
      {
        title: "Apply against a specific project",
        detail:
          "Technical approach, development plan, test methodology, team credentials, facilities and a costed budget within the ₹10 crore ceiling.",
      },
      {
        title: "Clear technical evaluation",
        detail: "DRDO scientists assess feasibility and your capability to deliver. Facilities and prior work matter.",
      },
      {
        title: "Develop with DRDO mentoring and complete trials",
        detail: "Milestone-based release, DRDO technical oversight and prototype trials at the end.",
      },
    ],
    caaSupport: [
      "Verification of the incubation and 50% Indian ownership conditions, and restructuring where the cap table breaches them",
      "Incubator association where you are not currently incubated",
      "Project costing and the 10% counterpart-funding plan",
      "Grant accounting, utilisation certificates and audit support through the project period",
    ],
    caaServices: [
      { label: "Change in Directors / Shareholders", href: "/services/change-in-directors" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    ],
    links: [{ label: "TDF portal — DRDO", href: "https://tdf.drdo.gov.in/" }],
  },

  // ── 26 ─────────────────────────────────────────────────────────────────────
  {
    slug: "in-space-seed-fund",
    name: "IN-SPACe Seed Fund Scheme",
    ministry: "Department of Space",
    agency: "IN-SPACe",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Prototype / PoC", "Seed / Early Stage"],
    sectors: ["Space", "Deep Tech"],
    popular: true,
    headline:
      "Milestone-based grant of ₹1 crore for early-stage space-tech startups building products and applications.",
    amount: "Grant of up to ₹1 crore per startup or non-government entity, released on milestones",
    timeline: "Announcement-of-opportunity driven",
    whatIsThis:
      "IN-SPACe was created to open the Indian space sector to private players, and its Seed Fund is the entry-level instrument for that ecosystem. It is a pure grant, released against milestones, and comes with mentoring, training and networking through IN-SPACe. The eligibility ceiling is notably generous: you can have taken up to ₹50 lakh of other government support and still qualify.",
    objectives: [
      "Promote, enable, authorise and supervise non-government entities undertaking space activities",
      "Fund early-stage startups using space technology to address challenges in the space sector",
      "Build a private Indian space industry across the value chain",
    ],
    eligibility: [
      "DPIIT-recognised early-stage startups with innovative ideas and projects that use space technology",
      "Startups must not have received more than ₹50 lakh of monetary support under any Central or State government scheme",
    ],
    benefits: [
      "Grant of ₹1 crore provided to selected startups on a milestone basis",
      "Funding, mentorship, training and networking opportunities through IN-SPACe",
      "Pathway to the Antariksh Venture Capital Fund and the Technology Adoption Fund as the company matures",
    ],
    howToApply: [
      {
        title: "Watch the Announcements of Opportunity",
        detail:
          "IN-SPACe publishes announcements from time to time rather than running a permanent window. Track the AO page — the windows are short.",
      },
      {
        title: "Check the ₹50 lakh prior-support ceiling",
        detail:
          "Higher than most schemes, but still a hard cap. Add up every central and state grant you have taken before applying.",
      },
      {
        title: "Build the technical and milestone plan",
        detail:
          "Space applications are judged on technical merit and feasibility. Define milestones tightly — the grant releases against them, not against elapsed time.",
      },
      {
        title: "Apply through the IN-SPACe portal",
        detail: "Submission is against the specific announcement, in the format published with it.",
      },
      {
        title: "Deliver milestones and plan the next raise",
        detail:
          "A completed IN-SPACe Seed Fund project is a strong entry point to the Antariksh VCF and the Technology Adoption Fund.",
      },
    ],
    caaSupport: [
      "DPIIT recognition and a prior-funding audit against the ₹50 lakh ceiling before you apply",
      "Technical-milestone budgeting the grant can actually be released against",
      "Grant accounting, utilisation certificates and audit readiness",
      "Mapping the space funding ladder — Seed Fund, then TAF, then Antariksh VCF — so each round sets up the next",
    ],
    caaServices: [
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    ],
    links: [
      {
        label: "IN-SPACe — announcements of opportunity",
        href: "https://www.inspace.gov.in/inspace?id=announcement_for_opportunities",
      },
    ],
  },

  // ── 27 ─────────────────────────────────────────────────────────────────────
  {
    slug: "dcis",
    name: "Digital Communication Innovation Square",
    abbr: "DCIS",
    ministry: "Department of Telecommunications (DoT)",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Prototype / PoC", "Seed / Early Stage"],
    sectors: ["Telecom", "Deep Tech"],
    headline:
      "Milestone-based grants for indigenous telecom and ICT products — ₹50 lakh for startups, up to ₹10 crore for larger technology products.",
    amount: "Startups up to ₹50 lakh · MSMEs up to ₹2 crore · technology products up to ₹10 crore",
    timeline: "Milestone-based release; applications through the DCIS portal",
    whatIsThis:
      "DCIS funds the complete value chain of telecom product innovation — research, design, development, proof-of-concept testing, IPR creation, pilot project and manufacturing. It is one of the few schemes that scales the cheque with the entity type, so an MSME building a substantial telecom product can access far more than the startup ceiling suggests.",
    objectives: [
      "Promote research, design, development, PoC testing, IPR creation, pilot projects and manufacturing in telecom",
      "Make India a global hub for telecommunication equipment production",
      "Establish India as a centre for digital communication services",
    ],
    eligibility: [
      "DPIIT-recognised startups",
      "Any Indian company incorporated under the Companies Act 1956 or 2013, primarily an MSME as defined in the MSME Act 2006, with over 51% stake held by Indian citizens, NRIs or OCIs and headquarters in India",
      "Individual innovators are encouraged to apply, including through research and academic institutions — but fund release is conditional on meeting startup or MSME eligibility before agreement signing",
    ],
    benefits: [
      "Milestone-based support: startups up to ₹50 lakh",
      "MSMEs up to ₹2 crore",
      "Technology products requiring higher funding up to ₹10 crore",
      "Mentoring and testing support alongside the grant",
    ],
    howToApply: [
      {
        title: "Determine which ceiling you qualify for",
        detail:
          "Startup, MSME or major technology product — the classification drives everything. Udyam registration is what makes the MSME ceiling accessible.",
      },
      {
        title: "Verify the 51% Indian ownership condition",
        detail: "Over 51% must be held by Indian citizens, NRIs or OCIs, with headquarters in India.",
      },
      {
        title: "Build a milestone-structured proposal",
        detail:
          "DCIS releases against milestones. Define technical deliverables, testing gates and IPR outcomes precisely — vague milestones stall disbursement later.",
      },
      {
        title: "Apply on dcis.dot.gov.in",
        detail: "Applications and tracking run through the DoT DCIS portal.",
      },
      {
        title: "Complete testing and IPR milestones",
        detail:
          "Telecom products face certification and testing requirements. Budget time and money for TEC certification where applicable.",
      },
    ],
    caaSupport: [
      "Udyam/MSME registration to unlock the ₹2 crore ceiling instead of the ₹50 lakh one",
      "Shareholding review against the 51% Indian-ownership condition",
      "Milestone-linked budget and application preparation",
      "IPR filings within the project, and grant accounting and utilisation certificates",
    ],
    caaServices: [
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "DOT / Telecom License", href: "/services/dot-telecom-license" },
    ],
    links: [
      { label: "DCIS portal", href: "https://dcis.dot.gov.in/" },
      { label: "DoT — DCIS scheme guidelines", href: "https://www.dot.gov.in/offerings/schemes-and-services/details/dcis-QjNzETMtQWa" },
    ],
  },

  // ── 28 ─────────────────────────────────────────────────────────────────────
  {
    slug: "great-technical-textiles",
    name: "GREAT – Grant for Research & Entrepreneurship across Aspiring Innovators in Technical Textiles",
    abbr: "GREAT",
    ministry: "Ministry of Textiles",
    agency: "National Technical Textiles Mission (NTTM)",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Prototype / PoC", "Market Access & IP"],
    sectors: ["Textiles", "Manufacturing"],
    headline:
      "Grant of up to ₹50 lakh to convert technical-textile prototypes into market-ready products — and the IP stays with you.",
    amount: "Grant-in-aid normally up to ₹50 lakh per proposal for up to 18 months",
    timeline: "Milestone release in 40:40:20 instalments",
    whatIsThis:
      "GREAT sits under the National Technical Textiles Mission and is one of the least-crowded grant windows in the country, simply because few founders know technical textiles is a funded category. It covers agro-textiles, geo-textiles, medical textiles, protective textiles, smart textiles, high-performance fibres, sustainable textiles, composites and indigenous machinery — and critically, the intellectual property generated stays with the innovator.",
    objectives: [
      "Support technical-textile innovators, entrepreneurs and startups",
      "Convert technical-textile prototypes into market-ready products and technologies",
      "Build indigenous capability in high-value technical textile segments",
    ],
    eligibility: [
      "Individual innovators who are Indian citizens aged 21 or above, incubated with an eligible incubator, working on technical-textile innovation",
      "Startup companies incorporated as a private limited company, partnership firm or LLP, with turnover below ₹100 crore, not older than 5 years, and at least 51% Indian resident ownership and control",
      "Projects must relate to agro-textiles, geo-textiles, medical textiles, protective textiles, smart textiles, high-performance fibres, sustainable textiles, composites or indigenous machinery and equipment",
    ],
    benefits: [
      "Grant-in-aid of normally up to ₹50 lakh per approved proposal for up to 18 months",
      "Funding released milestone-wise, generally in 40:40:20 instalments",
      "Associated incubators receive an additional 10% of the sanctioned grant for mentoring and monitoring",
      "IP generated remains with the innovator or startup, or is jointly shared with the incubator per agreement",
    ],
    howToApply: [
      {
        title: "Confirm your product is a technical textile",
        detail:
          "The definition is broader than founders assume — medical devices with textile substrates, protective equipment, filtration media and composites all qualify. Map your product to a listed segment explicitly.",
      },
      {
        title: "Get incubated with an eligible incubator",
        detail: "Incubation with an approved incubator is a condition for both individual innovators and startups.",
      },
      {
        title: "Check the entity conditions",
        detail: "Under 5 years old, turnover below ₹100 crore, at least 51% Indian resident ownership and control.",
      },
      {
        title: "Apply through the NTTM GREAT portal",
        detail: "Registration and submission happen at nttm.texmin.gov.in when applications are invited.",
      },
      {
        title: "Deliver against the 40:40:20 milestones",
        detail:
          "Structure the project so 40% of the work is genuinely complete at each of the first two gates — otherwise the instalments stall.",
      },
    ],
    caaSupport: [
      "Segment mapping — establishing that your product qualifies as a technical textile under a listed category",
      "Incubator association and entity-condition verification (age, turnover, ownership)",
      "Milestone plan built to the 40:40:20 release structure",
      "IP protection so the innovation you retain under the scheme is actually registered",
    ],
    caaServices: [
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "Design Registration", href: "/services/design-registration" },
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
    ],
    links: [
      {
        label: "GREAT application portal",
        href: "https://nttm.texmin.gov.in/StartupRegistration/StartupUserRegistration",
      },
      { label: "GREAT scheme guidelines (PDF)", href: "http://www.nttm.texmin.gov.in/pdf/WhatsNew/Revised%20GREAT%20guidelines.pdf" },
    ],
  },

  // ── 29 ─────────────────────────────────────────────────────────────────────
  {
    slug: "bharati",
    name: "BHARATI – Bharat's Hub for Agritech, Resilience, Advancement & Incubation for Export Innovation",
    abbr: "BHARATI",
    ministry: "Ministry of Commerce & Industry",
    agency: "APEDA",
    focus: "Startup-Specific",
    support: "Market Access",
    stages: ["Growth / Scaling", "Market Access & IP"],
    sectors: ["Agriculture & Food"],
    headline:
      "APEDA's export-readiness accelerator for agri-food and agritech startups targeting global markets.",
    amount: "Pilot cohort supports 100 startups; acceleration and market-access support rather than a fixed grant",
    timeline: "Cohort-based",
    whatIsThis:
      "BHARATI is APEDA's flagship initiative to push Indian agri-food innovation into export markets. It is not a cheque — it is acceleration: product development support, export readiness, regulatory and SPS compliance, and access to APEDA's ecosystem of industry bodies, state agricultural boards, universities and IITs. For a food or agritech company with global ambitions, the compliance and market-access support is the hard part BHARATI solves.",
    objectives: [
      "Strengthen India's agri-food and processed-food export ecosystem through innovation and startup acceleration",
      "Empower agri-food and agri-tech startups and create new export opportunities",
      "Promote innovation in high-value agri-food products, export technologies, packaging, traceability, logistics, sustainability and quality assurance",
    ],
    eligibility: [
      "Agri-food startups developing innovative or high-value products for export",
      "Technology and service startups offering export-enabling solutions across the value chain",
      "Solution providers for SPS challenges, including individual researchers, innovators and self-employed entrepreneurs",
      "APEDA-registered exporters seeking to innovate or expand high-value product portfolios",
      "Farmer Producer Companies developing innovative or high-value agri-food products or SPS-related solutions",
    ],
    benefits: [
      "Acceleration support covering product development, export readiness, regulatory compliance and market access",
      "Access to APEDA's ecosystem — industry bodies, state agricultural boards, universities, IITs/NITs and accelerators",
      "Support for GI-tagged products, organic foods, superfoods, processed Indian foods, livestock products and AYUSH products",
    ],
    howToApply: [
      {
        title: "Get the export base in place",
        detail:
          "IEC registration, APEDA registration and FSSAI licensing at the right tier are prerequisites for meaningful participation, not afterthoughts.",
      },
      {
        title: "Identify your track",
        detail:
          "Product innovation, export-enabling technology, or SPS solution — the application differs by track and so does the support you receive.",
      },
      {
        title: "Apply through the BHARATI portal",
        detail: "Cohort applications are made at apeda.gov.in/bharati.",
      },
      {
        title: "Work the compliance agenda during the cohort",
        detail:
          "Destination-market regulatory requirements, traceability and certification are the actual barriers to export. Use the cohort to clear them.",
      },
    ],
    caaSupport: [
      "IEC, APEDA and FSSAI registrations — the export compliance stack, done before the cohort rather than during it",
      "Export documentation, GST LUT filing and zero-rated supply compliance",
      "FPC and producer-company structuring where the supply chain runs through farmer organisations",
      "Ongoing export-linked GST and accounting compliance",
    ],
    caaServices: [
      { label: "IEC Registration (Import-Export)", href: "/services/iec-registration" },
      { label: "APEDA Registration", href: "/services/apeda-registration" },
      { label: "FSSAI Food License", href: "/services/fssai-license" },
      { label: "GST LUT Filing", href: "/services/gst-lut-filing" },
    ],
    links: [
      { label: "BHARATI official portal", href: "https://apeda.gov.in/bharati/" },
      { label: "Who can apply", href: "https://apeda.gov.in/bharati/Who_Can_Apply.html" },
    ],
  },

  // ── 30 ─────────────────────────────────────────────────────────────────────
  {
    slug: "st-prism",
    name: "S&T-PRISM – Research & Innovation in Mining, Minerals & Recycling",
    abbr: "S&T-PRISM",
    ministry: "Ministry of Mines",
    focus: "Startup-Specific",
    support: "Grant",
    stages: ["Prototype / PoC"],
    sectors: ["Mining & Metals", "Manufacturing", "Deep Tech"],
    headline:
      "Grants of up to ₹2 crore for early-stage startups innovating in mining, mineral processing, metallurgy and recycling.",
    amount: "Up to ₹2 crore per startup on milestone basis · up to ₹10 crore to incubators",
    timeline: "Milestone-based release per the scheme guidelines",
    whatIsThis:
      "S&T-PRISM covers the complete value chain in mining, mineral processing, metallurgy and recycling — research, design, development, PoC testing, IPR creation, pilot project and manufacturing. It is a low-competition window with a serious ceiling, and it has two components: startup funding and the establishment of incubation centres in the sector.",
    objectives: [
      "Promote the ecosystem for research, design, development, PoC testing, IPR creation, pilot projects and manufacturing in mining, mineral processing, metallurgy and recycling",
      "Fund startups capable of producing functional prototypes or productising existing technologies",
      "Establish incubation centres serving the mining and metals sector",
    ],
    eligibility: [
      "Startups operating at early stages in the mining and metal industry",
      "Incubators, under the separate incubation-centre component",
    ],
    benefits: [
      "Grant of up to ₹2 crore to startups on a milestone basis",
      "Grant of up to ₹10 crore to incubators, disbursed on milestones",
      "Technical mentoring alongside the project support",
    ],
    howToApply: [
      {
        title: "Map your technology to the sector value chain",
        detail:
          "Recycling and circular-economy technologies qualify here, which surprises founders who think of this as a mining-only scheme.",
      },
      {
        title: "Read the scheme guidelines before drafting",
        detail:
          "The Ministry of Mines publishes a detailed guidelines document that sets the proposal format and evaluation criteria. Follow it literally.",
      },
      {
        title: "Build a prototype-to-productisation plan",
        detail:
          "The stated test is capability, intent and promise to produce functional prototypes or productise existing technologies. Evidence all three.",
      },
      {
        title: "Submit per the guidelines and defend the milestones",
        detail: "Release is milestone-linked, so the milestone definitions are the commercially important part of the proposal.",
      },
    ],
    caaSupport: [
      "Sector-fit assessment, including for recycling and circular-economy businesses that qualify but do not realise it",
      "Proposal drafting to the published guidelines format, with a costed milestone plan",
      "Environmental and pollution-control compliance mapping, which mining and recycling projects always trigger",
      "Grant accounting, utilisation certificates and milestone reporting",
    ],
    caaServices: [
      { label: "Environment Clearance (PCB)", href: "/services/environment-clearance" },
      { label: "EPR Registration", href: "/services/epr-registration" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
    ],
    links: [
      {
        label: "S&T-PRISM operational guidelines (PDF)",
        href: "https://mines.gov.in/admin/storage/app/uploads/655212bdb9e5b1699877565.pdf",
      },
    ],
  },
];
