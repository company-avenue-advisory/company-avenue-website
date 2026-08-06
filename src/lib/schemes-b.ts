// ─────────────────────────────────────────────────────────────────────────────
// PART B — Startup-relevant schemes.
//
// Eligibility here is broader (MSMEs, companies, institutions, individuals) but
// startups regularly benefit from and access these windows. Several of them —
// CGTMSE, PMMY, Stand-Up India, TIDE 2.0 — are in practice the most-used
// government funding routes for early Indian businesses.
//
// Source: DPIIT / Startup India "Playbook of Government Schemes and Initiatives
// for Startups", June 2026, plus the nodal-agency portals cited per scheme.
// ─────────────────────────────────────────────────────────────────────────────

import type { Scheme } from "./schemes-taxonomy";

export const SCHEMES_STARTUP_RELEVANT: Scheme[] = [
  // ── DST / NIDHI ───────────────────────────────────────────────────────────
  {
    slug: "nidhi-eir",
    name: "NIDHI – Entrepreneur in Residence",
    abbr: "NIDHI-EIR",
    ministry: "Department of Science & Technology (DST)",
    agency: "NIDHI Technology Business Incubators",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Ideation"],
    sectors: ["Deep Tech", "Students & Academia"],
    headline:
      "A fellowship that pays you to work full-time on a technology business idea before you incorporate anything.",
    amount: "₹10,000 to ₹30,000 per month for 12 months, extendable to 18",
    timeline: "Announced locally by the host TBI",
    whatIsThis:
      "NIDHI-EIR removes the opportunity cost of entrepreneurship. Selected fellows get a monthly stipend, co-working space at a NIDHI TBI and mentoring from experienced founders — while they are still validating the idea. For a graduating engineer or a researcher leaving a job, it is the difference between trying and not trying.",
    objectives: [
      "Encourage graduating students and professionals to take up entrepreneurship",
      "Support promising technology business ideas before incorporation",
      "Provide fellowship, workspace and mentoring through NIDHI TBIs acting as Programme Executing Partners",
    ],
    eligibility: [
      "Indian citizen",
      "Completed a minimum of 4 years of full-time undergraduate or postgraduate education, or a 3-year degree or diploma programme with 2 years of full-time work experience after it",
      "Pursuing a promising technology business idea",
    ],
    benefits: [
      "Grant of ₹10,000 to ₹30,000 per month for 12 months, extendable up to 18 months",
      "Co-working space at the host TBI to develop the idea into a marketable product",
      "Mentoring from experienced entrepreneurs on business concept, strategy and market insight",
      "The selected NIDHI-TBI receives ₹39.6 lakh per year, of which ₹36 lakh flows to the EIRs",
    ],
    howToApply: [
      {
        title: "Find the NIDHI TBIs running EIR",
        detail:
          "The programme is announced locally by each TBI rather than centrally. Identify the TBIs in your domain and track their announcements.",
      },
      {
        title: "Check the education and experience gate",
        detail: "Four years of full-time UG/PG, or a 3-year degree/diploma plus two years of full-time work experience.",
      },
      {
        title: "Prepare the idea note",
        detail:
          "Technology, problem, why now and what you will validate in 12 months. TBIs select on the founder as much as on the idea at this stage.",
      },
      {
        title: "Apply in the TBI's prescribed format and interview",
        detail: "Selection is by the host TBI's committee.",
      },
      {
        title: "Use the fellowship to reach incorporation",
        detail:
          "The strongest outcome is exiting the fellowship with a validated idea, an incorporated entity and a PRAYAS or SISFS application ready to file.",
      },
    ],
    caaSupport: [
      "Incorporation timed to the fellowship — structure, founder agreement and cap table set up right the first time",
      "DPIIT recognition as soon as the entity exists, unlocking the next tier of schemes",
      "Founders' agreement and ESOP planning before co-founders join",
      "A funding roadmap from EIR to PRAYAS to SISFS mapped against your 12-month plan",
    ],
    caaServices: [
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
    ],
    links: [
      { label: "NIDHI portal", href: "https://nidhi.dst.gov.in/" },
      { label: "NIDHI-EIR guidelines", href: "https://nidhi.dst.gov.in/nidhieir/" },
    ],
  },
  {
    slug: "nm-icps",
    name: "NM-ICPS – Technology Innovation Hubs",
    abbr: "NM-ICPS",
    ministry: "Department of Science & Technology (DST)",
    agency: "25 Technology Innovation Hubs",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Prototype / PoC", "Growth / Scaling"],
    sectors: ["Deep Tech", "IT & Software"],
    headline:
      "25 Technology Innovation Hubs across India funding and incubating deep-tech startups in AI, IoT, robotics, cybersecurity and autonomous systems.",
    amount: "Mission outlay ₹3,660 crore; startup support varies by hub and call",
    timeline: "Hubs release calls for proposals periodically",
    whatIsThis:
      "The National Mission on Interdisciplinary Cyber-Physical Systems established 25 Technology Innovation Hubs, each hosted at a major institute and each owning a technology vertical. They fund R&D, translational research, product development and startup incubation — and because each hub runs its own calls, a founder who tracks the right hub finds windows that never appear on any central portal.",
    objectives: [
      "Develop technology platforms for R&D, translational research and product development in cyber-physical systems",
      "Incubate and support startups through the 25 Technology Innovation Hubs",
      "Work with ministries to identify technology needs and develop solutions",
    ],
    eligibility: [
      "Individuals and entities including startups, students, entrepreneurs and researchers",
      "Applications are made against the specific call published by a Technology Innovation Hub",
    ],
    benefits: [
      "Financial and non-financial support for research and development",
      "Incubation, seed support, testbeds and mentoring via the TIHs",
      "Market connects through the hub's industry network",
    ],
    howToApply: [
      {
        title: "Identify the TIH that owns your technology",
        detail:
          "Each of the 25 hubs has a vertical — AI, IoT, robotics, cybersecurity, autonomous systems and more. Applying to the wrong hub is an automatic no.",
      },
      {
        title: "Track the hub's calls for proposals",
        detail: "Calls are published periodically on nmicps.in and on individual hub websites. There is no single rolling window.",
      },
      {
        title: "Prepare the technical proposal",
        detail: "Technology readiness, research plan, team and deliverables, in the format the specific call requires.",
      },
      {
        title: "Deliver and use the testbeds",
        detail: "Hub testbeds and validation facilities are often the more valuable half of the support.",
      },
    ],
    caaSupport: [
      "Hub identification and call tracking across the 25 TIHs so you do not miss the window that fits",
      "Proposal budgeting and entity readiness ahead of a call",
      "IP protection before disclosure in a collaborative hub project",
      "Grant accounting and utilisation reporting",
    ],
    caaServices: [
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
    ],
    links: [{ label: "NM-ICPS", href: "https://nmicps.in/" }],
  },
  {
    slug: "nidhi-tbi",
    name: "NIDHI – Technology Business Incubator",
    abbr: "NIDHI-TBI",
    ministry: "Department of Science & Technology (DST)",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Ideation", "Prototype / PoC", "Seed / Early Stage"],
    sectors: ["Deep Tech", "Sector Agnostic"],
    headline:
      "DST funding to institutions that set up and run Technology Business Incubators — the network startups then get incubated into.",
    amount: "Incubator-level support; generally multi-crore per DST approval",
    timeline: "Proposals in the prescribed proforma at nidhi.dst.gov.in",
    whatIsThis:
      "NIDHI-TBI funds the incubator, not the startup — but it matters enormously to founders because the TBI network it created is the gateway to NIDHI-SSP seed capital, PRAYAS prototyping grants and the EIR fellowship. Knowing which TBIs are DST-supported, and getting incubated at one, is the practical entry point to a whole family of schemes.",
    objectives: [
      "Convert technology-based innovations into startups by supporting institutions setting up TBIs",
      "Support both non-recurring and recurring expenses of Technology Business Incubators",
    ],
    eligibility: [
      "Host institutes — academic, technical or R&D institutions with a proven track record in promoting technology-based entrepreneurship",
      "A legal entity registered in India with the clear purpose of promoting research, innovation and the entrepreneurial ecosystem — a not-for-profit society, trust or Section 8 company",
    ],
    benefits: [
      "Non-recurring capital support: 100% for publicly funded institutes on renovation and furnishing; a defined share for other institutes",
      "Recurring expenditure support on actual expenses, per DST's funding mode",
      "For startups: incubation services, and access to NIDHI-SSP, PRAYAS and EIR through the incubator",
    ],
    howToApply: [
      {
        title: "For startups: find and join a NIDHI TBI",
        detail:
          "The DST portal lists supported TBIs. Incubation at one is what makes you eligible for NIDHI-SSP seed funding and other NIDHI components.",
      },
      {
        title: "For institutions: submit the proposal in the prescribed proforma",
        detail: "Available at nidhi.dst.gov.in, with the infrastructure, team and pipeline commitments DST expects.",
      },
      {
        title: "Structure the incubator entity correctly",
        detail:
          "A not-for-profit society, trust or Section 8 company is required for a non-academic applicant. Get the structure right before applying.",
      },
    ],
    caaSupport: [
      "For founders: TBI shortlisting and the incubation application that unlocks NIDHI-SSP and PRAYAS",
      "For institutions: Section 8 company incorporation and the governance framework DST requires",
      "12A/80G registration and grant accounting for incubator entities",
      "Ongoing compliance for the incubator — ROC, ITR-7 and utilisation reporting",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "12A & 80G Registration", href: "/services/12a-80g-registration" },
    ],
    links: [{ label: "NIDHI-TBI guidelines", href: "https://nidhi.dst.gov.in/nidhitbi/" }],
  },
  {
    slug: "nidhi-i-tbi",
    name: "NIDHI – Inclusive Technology Business Incubator",
    abbr: "i-TBI",
    ministry: "Department of Science & Technology (DST)",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Ideation", "Prototype / PoC"],
    sectors: ["Sector Agnostic"],
    headline:
      "Up to ₹5 crore to build technology incubators in regions where the startup ecosystem barely exists.",
    amount: "Up to ₹5 crore over 3 years to the incubator",
    timeline: "Applications through the NIDHI online portal",
    whatIsThis:
      "i-TBI targets the geography gap. It funds institutions in underserved regions to build an incubator capable of hosting at least 30 ventures, with an ignition grant for prototype and product development. For founders outside the metros, an i-TBI in your city changes what is locally possible.",
    objectives: [
      "Support institutions in regions where the innovation and startup incubation ecosystem is nascent",
      "Normalise resources and value creation across the country",
      "Create a culture of innovation and entrepreneurship in the host institute and nearby geographies",
    ],
    eligibility: [
      "Host institute must provide up to 10,000 sq ft (minimum 7,000 sq ft) of built-up campus space",
      "Host institute must establish a separate Section 8 company to manage the i-TBI, with a 10-year-plus lease at no or minimal cost",
      "The i-TBI must be capable of accommodating at least 30 innovative ventures or startups",
    ],
    benefits: [
      "Maximum funding of ₹5 crore over 3 years",
      "Non-recurring expenditure shared 50:50 with private institutions and 75:25 with public institutions",
      "Ignition grant for prototype and product development, available to incubated startups",
    ],
    howToApply: [
      {
        title: "For founders: locate the i-TBI nearest to you",
        detail: "The ignition grant and incubation are accessed by joining the i-TBI, not by applying to DST.",
      },
      {
        title: "For institutions: prepare the space and entity commitments",
        detail:
          "The Section 8 company and the lease undertaking are the conditions applicants most often fail to meet at proposal stage.",
      },
      {
        title: "Apply through nidhi.dst.gov.in",
        detail: "Submission is in the prescribed format on the NIDHI portal.",
      },
    ],
    caaSupport: [
      "Section 8 company incorporation for the incubator entity, with the objects clause DST will accept",
      "Lease and governance documentation between host institute and the new entity",
      "12A/80G registration and grant compliance for the incubator",
      "For founders: i-TBI identification and incubation applications",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "12A & 80G Registration", href: "/services/12a-80g-registration" },
    ],
    links: [{ label: "NIDHI i-TBI", href: "https://nidhi.dst.gov.in/nidhiitbi/" }],
  },
  {
    slug: "nidhi-accelerator",
    name: "NIDHI – Accelerator",
    ministry: "Department of Science & Technology (DST)",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Deep Tech", "Sector Agnostic"],
    headline:
      "Short, intensive accelerator cohorts run by established TBIs — with a ₹10 lakh demo-day award pool for the top startups.",
    amount: "Up to ₹40 lakh per cohort — ₹30 lakh programme cost, ₹10 lakh demo-day awards",
    timeline: "Cohort-based, run by the host TBI",
    whatIsThis:
      "NIDHI-Accelerator is a post-incubation instrument: DST funds experienced TBIs to run structured acceleration cohorts with rigorous mentoring, investor connects and a demo day. The top three to five startups in each batch share a ₹10 lakh award pool based on performance during the programme.",
    objectives: [
      "Fast-track the growth of potential startups through rigorous mentoring and networking",
      "Encourage existing TBIs to adopt and evolve the accelerator mode",
      "Supplement the scaling-up end of the startup value chain",
    ],
    eligibility: [
      "TBIs previously or currently funded by DST or another Central or State government body",
      "The TBI must have a minimum of 3 years in existence and have incubated at least 20 startups across multiple domains",
      "Startups participate by selection into the accelerator cohort",
    ],
    benefits: [
      "Accelerator programme budget of up to ₹30 lakh per cohort covering mentoring, training, logistics and infrastructure",
      "Demo Day Award pool of up to ₹10 lakh for the top 3 to 5 startups of the batch",
      "Structured acceleration, investor connects and demo days",
    ],
    howToApply: [
      {
        title: "Track accelerator cohorts at DST-supported TBIs",
        detail: "Cohorts are announced by individual TBIs. Watch the incubators in your domain.",
      },
      {
        title: "Apply to the cohort with traction evidence",
        detail: "Acceleration is post-incubation — selection favours startups with a product and early market signal.",
      },
      {
        title: "Compete on demo day",
        detail: "The award is performance-based across the programme, not a pitch-day lottery. Show movement on metrics.",
      },
    ],
    caaSupport: [
      "Cohort application and traction pack preparation",
      "Financial model and metrics dashboard the accelerator will track you against",
      "Investor-readiness: clean books, cap table and data room before demo day",
    ],
    caaServices: [
      { label: "Pitch Deck & Financial Model", href: "/contact" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    links: [{ label: "NIDHI Accelerator guidelines", href: "https://nidhi.dst.gov.in/schemes-programmes/nidhiaccelerator/" }],
  },
  {
    slug: "nidhi-coe",
    name: "NIDHI – Centres of Excellence",
    abbr: "NIDHI-CoE",
    ministry: "Department of Science & Technology (DST)",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Growth / Scaling"],
    sectors: ["Deep Tech", "Sector Agnostic"],
    headline:
      "Up to ₹50 crore over five years for mature incubators to become world-class centres — with facilities for 100 startups and an in-house accelerator.",
    amount: "Maximum ₹50 crore over 5 years to the incubator",
    timeline: "Proposals received throughout the year",
    whatIsThis:
      "NIDHI-CoE is the top of the DST incubation pyramid. It takes incubators with at least five years of track record and funds them to build design and prototype development centres, validation labs, patent facilitation centres and TBI facilities for a minimum of 100 startups, plus an accelerator for 10 high-potential ones. For founders, a CoE is simply the best-equipped incubator you can get into.",
    objectives: [
      "Empower mature incubators to create an enabling environment for technology startups",
      "Strengthen existing STEP/TBI capacity to transfer innovations into marketable products and high-growth companies",
      "Concentrate resources in DST's identified priority areas",
    ],
    eligibility: [
      "Existing incubator with at least 5 years of incubation experience",
      "Non-academic applicants must be a legal entity registered in India promoting research, innovation and entrepreneurship",
      "Financial support is extended to a not-for-profit society, trust or Section 8 company",
      "The host institution should have been in existence for at least 8 years, except for entities created by Central or State governments",
    ],
    benefits: [
      "Enhanced support of a maximum of ₹50 crore over 5 years",
      "Public-funded institutions eligible for 100% support including building",
      "Private institutions eligible for recurring support of ₹20 crore and up to ₹1 crore for equipment",
      "Design and prototype development, validation centres, patent facilitation centres, TBI facilities for 100+ startups and an accelerator for 10 high-potential startups",
    ],
    howToApply: [
      {
        title: "For founders: target CoE incubators",
        detail:
          "A NIDHI-CoE has validation labs, patent facilitation and an in-house accelerator. If one exists in your domain, it is the incubator to get into.",
      },
      {
        title: "For institutions: verify the 5-year and 8-year conditions",
        detail: "Five years of incubation experience and an 8-year-old host institution are hard gates.",
      },
      {
        title: "Submit at nidhi.dst.gov.in",
        detail: "Proposals are received throughout the year in the format on the portal.",
      },
    ],
    caaSupport: [
      "Section 8 entity structuring and governance framework for CoE applicants",
      "Financial systems capable of administering a ₹50 crore multi-year grant",
      "12A/80G registration, ITR-7 and annual grant compliance",
      "For founders: identifying and getting into CoE-grade incubators",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    links: [{ label: "NIDHI-CoE guidelines", href: "https://nidhi.dst.gov.in/nidhicoe/" }],
  },

  // ── DBT / BIRAC ───────────────────────────────────────────────────────────
  {
    slug: "bioangels",
    name: "BioAngels",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC and Indian Angel Network",
    focus: "Startup-Relevant",
    support: "Equity",
    stages: ["Seed / Early Stage"],
    sectors: ["Biotech & Life Sciences"],
    headline:
      "A BIRAC–IAN platform connecting life-sciences startups to angel investors with genuine domain expertise.",
    amount: "Varies by angel round and investor decision",
    timeline: "Angel syndication cycle, typically 2–4 months",
    whatIsThis:
      "BioAngels is a partnership between BIRAC and the Indian Angel Network built for one purpose: getting biotech, medtech, healthtech, pharma, agritech and cleantech startups in front of angels who understand the science. The value is as much in the diligence-grade feedback and the domain mentoring as in the cheque.",
    objectives: [
      "Support life-sciences startups to raise angel rounds from investors with deep domain expertise",
      "Connect founders with HNIs, angel investors, family offices, strategic investors, corporates and VCs",
      "Bring operational rigour, frameworks and governance into early life-sciences companies",
    ],
    eligibility: [
      "Startups and entrepreneurs in biotech, medtech, healthtech, pharma, cleantech and agritech",
    ],
    benefits: [
      "Financial incentives, mentoring and market access",
      "Access to a curated pool of domain-expert investors",
      "Investor-readiness support and governance frameworks",
    ],
    howToApply: [
      {
        title: "Apply through bioangels.vc",
        detail: "Applications are made on the BioAngels platform.",
      },
      {
        title: "Prepare an angel-grade pack",
        detail: "Deck, science summary, regulatory pathway, cap table and a clear ask with use of funds.",
      },
      {
        title: "Survive syndication",
        detail:
          "Angel rounds are syndicated — several investors must independently say yes. Clean cap table and clean books materially raise your odds.",
      },
    ],
    caaSupport: [
      "Cap-table clean-up and founder/ESOP structuring before angels look at it",
      "Valuation view and term-sheet review",
      "Company-law execution on the round and the post-allotment filings",
      "Investor MIS and reporting set up from the first cheque",
    ],
    caaServices: [
      { label: "Business Valuation", href: "/services/business-valuation" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    links: [{ label: "BioAngels", href: "https://bioangels.vc/about-us/" }],
  },
  {
    slug: "bionest",
    name: "BioNEST Programme",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Ideation", "Prototype / PoC", "Seed / Early Stage"],
    sectors: ["Biotech & Life Sciences"],
    headline:
      "India's national network of bio-incubators — wet labs, high-end equipment and regulatory guidance for biotech startups.",
    amount: "Incubator-level grant varies by call; startup benefit is infrastructure and services",
    timeline: "Applications through BIRAC",
    whatIsThis:
      "BioNEST creates the physical infrastructure biotech startups cannot afford to build: wet labs, specialised equipment, and the mentoring, IP, legal and regulatory guidance that comes with a serious bio-incubator. For founders, BioNEST centres are also the gateway to BIG, the BIRAC SEED Fund and LEAP — those schemes route through incubators, and BioNEST is the network they route through.",
    objectives: [
      "Create globally competent bio-incubation facilities across the country",
      "Provide entrepreneurs with incubation space and shared access to high-end infrastructure and advanced equipment",
      "Provide business mentorship, IP, legal and regulatory guidance and networking",
    ],
    eligibility: [
      "Incorporated Indian legal entities: educational institutions, business incubators, biotech parks, state government science and technology bodies, biotech state councils and research hospitals",
      "Startups access BioNEST by being incubated at a supported centre",
    ],
    benefits: [
      "Grant-in-aid to the incubator based on need and scope, as assessed by the BioNEST committee",
      "Funding for refurbishment, equipment, furniture and operational cost",
      "For startups: wet lab access, equipment, mentoring and the route into BIG, SEED and LEAP",
    ],
    howToApply: [
      {
        title: "For founders: get into a BioNEST bio-incubator",
        detail:
          "This is the single most useful move an early biotech founder can make, because incubation is a precondition for BIG and the deployment channel for SEED and LEAP.",
      },
      {
        title: "For institutions: apply online via BIRAC",
        detail: "Applications are submitted through the BioNEST page on the BIRAC portal.",
      },
      {
        title: "Plan the lab and service model",
        detail: "The proposal is assessed on infrastructure plan, service capability and the startup pipeline you can attract.",
      },
    ],
    caaSupport: [
      "Bio-incubator shortlisting and incubation applications for founders",
      "Entity structuring and Section 8 incorporation for institutions setting up a bio-incubator",
      "Grant accounting and utilisation compliance",
      "The BIG-SEED-LEAP funding roadmap sequenced around your science",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
    ],
    links: [
      { label: "BIRAC — BioNEST", href: "https://www.birac.nic.in/desc_new.php?id=1120" },
      { label: "BioNEST guidelines (PDF)", href: "https://www.birac.nic.in/webcontent/1707480045_BioNEST_Guidelines.pdf" },
    ],
  },
  {
    slug: "bipp",
    name: "Biotechnology Industry Partnership Programme",
    abbr: "BIPP",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Prototype / PoC", "Growth / Scaling"],
    sectors: ["Biotech & Life Sciences"],
    headline:
      "Cost-shared grant for high-risk, high-impact industry-led biotech research — with IP ownership retained by Indian industry.",
    amount: "One-time grant-in-aid up to ₹50 lakh for first-time BIRAC grantees; cost-sharing thereafter",
    timeline: "Calls twice a year — 1 April to 15 May and 1 September to 15 October",
    whatIsThis:
      "BIPP is a government partnership with industry on a cost-sharing basis for research in frontier and futuristic technology areas. The defining feature is that IP ownership is retained by Indian industry — and where relevant shared with collaborating scientists. It suits companies attempting genuinely difficult science with commercial intent.",
    objectives: [
      "Support high-risk, high-impact industry-led biotech innovation on a cost-sharing basis",
      "Focus on IP creation with ownership retained by Indian industry",
      "Enable industry-academia consortia on frontier technology areas",
    ],
    eligibility: [
      "A single company or a consortium of companies incorporated under the Companies Act 2013, or an LLP under the LLP Act 2008",
      "Optionally jointly with public or private universities and colleges in India, national research laboratories, or not-for-profit private research labs, societies, foundations or NGOs",
    ],
    benefits: [
      "One-time grant-in-aid up to ₹50 lakh for startups that have not previously received a BIRAC grant",
      "For repeat BIRAC grantees, BIRAC contribution is capped at 70% of the entity's project budget, with at least 30% from the company",
      "Grant, soft loan or cost-sharing support depending on the project",
    ],
    howToApply: [
      {
        title: "Watch the two annual call windows",
        detail: "1 April to 15 May, and 1 September to 15 October. Proposals are submitted online only.",
      },
      {
        title: "Decide on the consortium",
        detail:
          "Academic or national-lab partners strengthen the science but complicate the IP. Settle ownership in writing before submitting.",
      },
      {
        title: "Structure the cost share",
        detail:
          "If you have taken a BIRAC grant before, you fund at least 30%. Evidence the source of that contribution in the proposal.",
      },
      {
        title: "Submit through birac.nic.in and defend the science",
        detail: "Evaluation is technical, with commercial viability assessed alongside.",
      },
    ],
    caaSupport: [
      "Consortium and IP-ownership agreements drafted before the proposal goes in",
      "Cost-share funding plan and the CA-certified financial capability evidence",
      "Project budgeting and grant accounting across multiple entities",
      "Utilisation certificates and audit support",
    ],
    caaServices: [
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    ],
    links: [
      { label: "BIRAC — call for proposals", href: "https://birac.nic.in/cfp.php" },
      { label: "BIPP guidelines (PDF)", href: "https://birac.nic.in/webcontent/1745298172_BIPP_scheme_guidelines_16_04_2025.pdf" },
    ],
  },
  {
    slug: "e-yuva",
    name: "E-YUVA – Empowering Youth for Value Added Innovative Translational Research",
    abbr: "E-YUVA",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC, through E-YUVA Centres",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Ideation"],
    sectors: ["Biotech & Life Sciences", "Students & Academia"],
    headline:
      "Fellowship of ₹30,000–₹50,000 a month plus a research grant, for students and young researchers pursuing translational biotech innovation.",
    amount: "Monthly fellowship ₹30,000–₹50,000 · annual research grant ₹3 lakh to ₹5 lakh",
    timeline: "Two calls for applications each year",
    whatIsThis:
      "E-YUVA funds young people to do applied, need-oriented biotech research at E-YUVA Centres hosted inside universities and mentored by BioNEST bio-incubators. It runs two tracks — Innovation Fellows for postgraduates and above, and E-YUVA Fellows for undergraduates. For a student with a genuine idea, it is a paid runway into entrepreneurship.",
    objectives: [
      "Promote a culture of applied research and need-oriented entrepreneurial innovation among young students and researchers",
      "Deliver the programme through E-YUVA Centres housed in universities and mentored by BioNEST bio-incubators",
    ],
    eligibility: [
      "Innovation Fellows: an Indian student who has completed a Masters or PhD in any discipline",
      "E-YUVA Fellows: Indian students pursuing undergraduate study in any domain",
    ],
    benefits: [
      "Monthly fellowship grant between ₹30,000 and ₹50,000",
      "Annual research grant between ₹3 lakh and ₹5 lakh",
      "Technical and business mentoring, exposure to the bio-incubation model and orientation to entrepreneurial culture",
    ],
    howToApply: [
      {
        title: "Find your nearest E-YUVA Centre",
        detail: "EYCs are hosted within universities and institutes. Applications are anchored to a centre.",
      },
      {
        title: "Apply online during one of the two annual calls",
        detail: "Submissions go through birac.nic.in.",
      },
      {
        title: "Present to the Technical Expert Committee",
        detail: "Shortlisted applicants and teams present at their respective EYC with a BIRAC nominee present.",
      },
      {
        title: "Convert the fellowship into a company",
        detail:
          "The strongest E-YUVA outcomes end with an incorporated startup and a BIG application. Plan for that from month one.",
      },
    ],
    caaSupport: [
      "Incorporation and founder structuring when the fellowship converts into a company",
      "IP protection on work done during the fellowship, including the institution's rights",
      "DPIIT recognition and the path into BIG and SEED once the entity exists",
    ],
    caaServices: [
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
      { label: "Patent Registration", href: "/services/patent-registration" },
    ],
    links: [
      { label: "BIRAC — E-YUVA", href: "https://birac.nic.in/e_yuva.php" },
      { label: "E-YUVA guidelines (PDF)", href: "https://birac.nic.in/webcontent/1658838527_EYUVA_Guideline_Version_1.1.pdf" },
    ],
  },
  {
    slug: "sitare",
    name: "SITARE – Students Innovations for Translation & Advancement of Research Explorations",
    abbr: "SITARE",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Ideation", "Prototype / PoC"],
    sectors: ["Biotech & Life Sciences", "Students & Academia"],
    headline:
      "Up to ₹15 lakh for student biotech projects with commercial potential — explicitly aimed at creating startups.",
    amount: "SITARE-GYTI up to ₹15 lakh · SITARE Appreciation Grant up to ₹1 lakh",
    timeline: "GYTI call opens once a year, August–September, for 45–60 days",
    whatIsThis:
      "SITARE funds student innovation in biotechnology through two components: the Gandhian Young Technological Innovation Award grant of up to ₹15 lakh for projects with commercial potential, and an appreciation grant of up to ₹1 lakh tied to the Biotech Innovation Ignition School. The stated goal is the creation of biotech startups, not just good projects.",
    objectives: [
      "Promote and support innovative student projects in biotechnology",
      "Translate student research into commercial ventures and biotech startups",
    ],
    eligibility: [
      "SITARE-GYTI: an Indian student pursuing a PhD or Masters in any discipline",
      "SITARE Appreciation Grant: students pursuing an undergraduate programme in any discipline, preferably from Tier-II/III cities and aspirational districts",
    ],
    benefits: [
      "SITARE-GYTI: funding support of up to ₹15 lakh each for projects with commercial potential leading to biotech startups",
      "SITARE Appreciation Grant: up to ₹1 lakh each, plus training and mentoring at the Biotech Innovation Ignition School",
    ],
    howToApply: [
      {
        title: "Apply in the annual GYTI window",
        detail: "The call opens once a year in August or September for 45 to 60 days. Proposals are submitted online only.",
      },
      {
        title: "Frame the project commercially, not just academically",
        detail:
          "The selection criterion is commercial potential leading to a startup. A brilliant thesis with no route to market scores poorly.",
      },
      {
        title: "Register and submit at birac.nic.in",
        detail: "Login as a registered user and submit against the open call.",
      },
    ],
    caaSupport: [
      "Commercial framing of the student project — market, route to revenue and IP position",
      "Incorporation and founder-equity structuring when the project becomes a company",
      "IP ownership negotiation with the host institution before disclosure",
      "The path into BIG and the wider BIRAC funding ladder",
    ],
    caaServices: [
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
      { label: "Patent Registration", href: "/services/patent-registration" },
    ],
    links: [
      { label: "BIRAC", href: "https://www.birac.nic.in/" },
      { label: "SITARE guidelines (PDF)", href: "https://birac.nic.in/webcontent/1584008982_SITARE_Scheme_Guidelines.pdf" },
    ],
  },
  {
    slug: "pace",
    name: "PACE – Promoting Academic Research Conversion to Enterprise",
    abbr: "PACE",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Prototype / PoC"],
    sectors: ["Biotech & Life Sciences", "Students & Academia"],
    headline:
      "Funds academia to take biotech research to proof of concept, then funds industry to validate it — up to 100% of project cost.",
    amount: "AIR component up to ₹50 lakh · CRS component has no stated funding ceiling",
    timeline: "Calls twice a year — 1 April to 15 May and 1 September to 15 October",
    whatIsThis:
      "PACE has two arms. Academic Innovation Research funds an institution to develop a technology of societal or national importance up to proof of concept. Contract Research Scheme then funds its validation by an industry partner. For a startup, the CRS arm is a route to funded validation work with an academic partner — and there is no stated ceiling on it.",
    objectives: [
      "Encourage academia to develop technology or products of societal and national importance up to proof-of-concept stage",
      "Enable subsequent validation by an industrial partner under the Contract Research Scheme",
    ],
    eligibility: [
      "AIR: academia — public or private institute, university, NGO or research foundation — as primary applicant; industry or LLP collaboration is optional",
      "CRS: mandatory collaboration with industry or an LLP; the industry collaborator must have a minimum of 51% shares held by Indian citizens holding Indian passports",
    ],
    benefits: [
      "BIRAC contribution of up to 100% of project cost",
      "AIR: total project cost must not exceed ₹50 lakh, with non-recurring cost capped at 10% of total",
      "CRS: grant funding to both academic and industrial partners, with no ceiling stated",
    ],
    howToApply: [
      {
        title: "Choose AIR or CRS",
        detail:
          "AIR is academia-led; CRS requires an industry partner and is where a startup participates directly.",
      },
      {
        title: "Verify the 51% Indian-shareholding condition for CRS",
        detail: "The industry collaborator must meet it. Check the cap table before committing.",
      },
      {
        title: "Apply in one of the two annual windows",
        detail:
          "1 April to 15 May, and 1 September to 15 October. BIRAC may also announce need-based additional calls under separate RFPs.",
      },
      {
        title: "Settle IP and publication rights in advance",
        detail:
          "Academia-industry projects fail commercially when IP and publication terms are left to the end. Fix them in the collaboration agreement.",
      },
    ],
    caaSupport: [
      "Academia-industry collaboration agreements including IP, publication and commercialisation rights",
      "Shareholding review against the 51% Indian condition for CRS",
      "Project budgeting across partners and grant accounting",
      "Technology-transfer and licensing structure once the PoC works",
    ],
    caaServices: [
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "Legal Drafting & Agreements", href: "/contact" },
    ],
    links: [
      { label: "BIRAC — PACE", href: "https://birac.nic.in/desc_new.php?id=286" },
      { label: "PACE scheme document (PDF)", href: "https://birac.nic.in/webcontent/1613355528_PACE_scheme_document_15_02_2021.pdf" },
    ],
  },
  {
    slug: "sbiri",
    name: "SBIRI – Small Business Innovation Research Initiative",
    abbr: "SBIRI",
    ministry: "Department of Biotechnology (DBT)",
    agency: "BIRAC",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Prototype / PoC", "Seed / Early Stage"],
    sectors: ["Biotech & Life Sciences"],
    headline:
      "100% grant funding up to ₹50 lakh of project cost, and 70% of everything above it, for biotech product and process development.",
    amount: "Up to ₹50 lakh at 100% · above that, ₹50 lakh plus 70% of the excess",
    timeline: "Calls twice a year — 1 April to 15 May and 1 September to 15 October",
    whatIsThis:
      "SBIRI is BIRAC's public-private partnership instrument for early and late-stage biotech product development. The funding structure is unusually generous: the first ₹50 lakh of project cost is fully funded, and 70% of anything beyond that. It supports startups working alone or in consortia with universities, research institutions or not-for-profits.",
    objectives: [
      "Boost an innovation-focused public-private partnership approach in biotechnology",
      "Create an enabling platform for product and process development and commercialisation",
      "Enable collaboration between startups, industry, public institutions and government",
    ],
    eligibility: [
      "Biotechnology startups, with or without partnerships",
      "Partners may be public or private universities, public or private research institutions, or societies, foundations and NGOs",
    ],
    benefits: [
      "For project cost up to ₹50 lakh: 100% BIRAC grant-in-aid to the applicant and collaborating company, if any",
      "For project cost above ₹50 lakh: ₹50 lakh plus 70% of the cost above ₹50 lakh, with the remainder borne by the applicant",
      "Grant-in-aid, soft loan or cost-sharing support depending on the project",
    ],
    howToApply: [
      {
        title: "Size the project against the funding structure",
        detail:
          "A ₹50 lakh project is fully funded; a ₹1 crore project attracts ₹85 lakh. Understand your contribution before you scope.",
      },
      {
        title: "Apply in one of the two annual windows",
        detail: "1 April to 15 May, and 1 September to 15 October, with occasional additional need-based calls.",
      },
      {
        title: "Build the product-development case",
        detail: "Technical plan, regulatory pathway, market and commercialisation route, with a costed budget by head.",
      },
      {
        title: "Execute and report",
        detail: "Milestone release with utilisation certificates and technical progress reporting.",
      },
    ],
    caaSupport: [
      "Project scoping against the funding structure so you fund the minimum out of pocket",
      "Consortium agreements where partners are involved",
      "Budget construction and CA-certified financial capability documentation",
      "Grant accounting, utilisation certificates and audit support",
    ],
    caaServices: [
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
    ],
    links: [
      { label: "BIRAC — SBIRI", href: "https://birac.nic.in/desc_new.php?id=217" },
      { label: "SBIRI guidelines (PDF)", href: "https://www.birac.nic.in/webcontent/1745298212_SBIRI_scheme_guidelines_16_04_2025.pdf" },
    ],
  },

  // ── MeitY ─────────────────────────────────────────────────────────────────
  {
    slug: "tide-2",
    name: "TIDE 2.0 – Technology Incubation & Development of Entrepreneurs",
    abbr: "TIDE 2.0",
    ministry: "Ministry of Electronics & Information Technology (MeitY)",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Ideation", "Prototype / PoC", "Seed / Early Stage"],
    sectors: ["IT & Software", "Deep Tech"],
    popular: true,
    headline:
      "A staged ladder for ICT startups — ₹4 lakh for idea to PoC, ₹7 lakh for prototype, and up to ₹40 lakh for product and market.",
    amount: "₹4 lakh idea-to-PoC · ₹7 lakh prototype grant · up to ₹40 lakh product and market investment",
    timeline: "Through TIDE incubators; cohort-based",
    whatIsThis:
      "TIDE 2.0 is one of the most practical schemes for an early ICT startup because the ladder matches how products actually get built. Small money to prove the concept, a larger grant to build the prototype, and a substantial investment once there is something to take to market. It is delivered through incubators listed on the MeitY Startup Hub, and it targets emerging technologies applied to societal challenges.",
    objectives: [
      "Create a holistic ecosystem for technology startups through financial and technical support",
      "Support ICT startups using emerging technologies for societal challenges",
      "Provide fellowship and grant support to entrepreneurs-in-residence at incubators",
    ],
    eligibility: [
      "Information Technology based, DPIIT-recognised startups",
      "Working in emerging technologies — AI, IoT, blockchain, robotics and similar areas",
      "Engagement is through a TIDE 2.0 supported incubator",
    ],
    benefits: [
      "Up to ₹4 lakh for idea to proof of concept",
      "Up to ₹7 lakh grant for prototype development",
      "Up to ₹40 lakh investment for product development and market outreach",
      "Incubation and technical mentoring through TIDE centres",
    ],
    howToApply: [
      {
        title: "Secure DPIIT recognition",
        detail: "It is an explicit eligibility condition for TIDE 2.0.",
      },
      {
        title: "Choose a TIDE incubator",
        detail:
          "MeitY Startup Hub lists incubators benefiting from TIDE 2.0. Assess them on domain focus and cohort timing.",
      },
      {
        title: "Enter at the right rung",
        detail:
          "Applying for ₹40 lakh with only an idea will fail. Enter at the stage you can evidence and climb the ladder.",
      },
      {
        title: "Apply to the incubator's cohort",
        detail: "Selection, funding and mentoring all run through the incubator, not MeitY.",
      },
      {
        title: "Deliver each stage to unlock the next",
        detail:
          "The ladder is sequential in practice — a delivered prototype is what makes the ₹40 lakh conversation credible.",
      },
    ],
    caaSupport: [
      "DPIIT recognition, filed and tracked before the cohort application",
      "Incubator shortlisting and stage-appropriate application preparation",
      "Financial projections for the ₹40 lakh product-and-market stage",
      "Grant accounting and reporting across the staged releases",
    ],
    caaServices: [
      { label: "Startup India / DPIIT Recognition", href: "/services/startup-india" },
      { label: "Pitch Deck & Financial Model", href: "/contact" },
    ],
    links: [
      { label: "MeitY Startup Hub — TIDE", href: "https://msh.meity.gov.in/schemes/tide" },
      {
        label: "MeitY — TIDE 2.0 guidelines",
        href: "https://www.meity.gov.in/offerings/schemes-and-services/details/technology-incubation-and-development-of-entrepreneurs-QMwEjNtQWa",
      },
    ],
  },
  {
    slug: "design-linked-incentive",
    name: "Design Linked Incentive Scheme",
    abbr: "DLI",
    ministry: "Ministry of Electronics & Information Technology (MeitY)",
    agency: "C-DAC / India Semiconductor Mission",
    focus: "Startup-Relevant",
    support: "Mixed",
    stages: ["Prototype / PoC", "Growth / Scaling", "Market Access & IP"],
    sectors: ["Semiconductor & Electronics", "Deep Tech"],
    headline:
      "Reimburses up to 50% of chip-design spend (capped at ₹15 crore) and then pays 4–6% of net sales for five years.",
    amount: "Product design incentive up to 50% of eligible expenditure, capped ₹15 crore · deployment incentive 6%–4% of net sales, capped ₹30 crore",
    timeline: "Applications and approvals through the DLI portal",
    whatIsThis:
      "DLI is the most commercially valuable semiconductor scheme available to an Indian startup because it pays twice — once on the design spend, and again on the revenue that design generates. Alongside the money it provides access to EDA tools, IP cores, MPW prototyping and post-silicon validation, which are individually beyond most startup budgets.",
    objectives: [
      "Catalyse a strong, self-reliant chip design ecosystem under the Semicon India Programme",
      "Provide financial incentives and access to advanced design infrastructure for domestic startups and MSMEs",
    ],
    eligibility: [
      "Domestic companies, startups and MSMEs engaged in semiconductor design or semiconductor-linked design",
      "Target areas include ICs, chipsets, SoCs, systems, IP cores and semiconductor-linked designs",
      "Applicants claiming incentives must retain domestic status — more than 50% beneficial ownership by resident Indian citizens or Indian companies ultimately owned and controlled by resident Indians — for 3 years after claiming",
    ],
    benefits: [
      "Chip Design Infrastructure Support: access to EDA tools, IP cores, MPW prototyping and post-silicon validation",
      "Product Design Linked Incentive: reimbursement of up to 50% of eligible expenditure, capped at ₹15 crore per application",
      "Deployment Linked Incentive: 6% to 4% of net sales turnover over 5 years, capped at ₹30 crore per application",
    ],
    howToApply: [
      {
        title: "Confirm and protect domestic status",
        detail:
          "More than 50% beneficial ownership by resident Indians must hold for three years after you claim. A foreign-led funding round inside that window can cost you the incentive — model this before you raise.",
      },
      {
        title: "Register on the DLI portal",
        detail: "Application, tracking and electronic approvals all run through chips-dli.gov.in.",
      },
      {
        title: "Document eligible expenditure rigorously",
        detail:
          "Reimbursement depends on a clean, auditable expenditure trail against defined eligible heads. Build the accounting for this from day one, not at claim time.",
      },
      {
        title: "Claim the deployment incentive on net sales",
        detail: "Once the product sells, the deployment-linked incentive runs for five years on certified net sales.",
      },
    ],
    caaSupport: [
      "Ownership-structure planning so a funding round does not breach the 3-year domestic-status condition",
      "Expenditure accounting and audit trail built to survive a reimbursement claim",
      "Net-sales certification and claim documentation for the deployment-linked incentive",
      "IP protection on the designs the incentive is funding",
    ],
    caaServices: [
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    ],
    links: [
      { label: "Official DLI portal", href: "http://chips-dli.gov.in/" },
      { label: "India Semiconductor Mission — DLI", href: "https://ism.gov.in/design-linked-incentive" },
    ],
  },

  // ── Department of Space ───────────────────────────────────────────────────
  {
    slug: "antariksh-vcf",
    name: "Antariksh Venture Capital Fund",
    abbr: "Space VCF",
    ministry: "Department of Space",
    agency: "IN-SPACe / SIDBI Venture Capital",
    focus: "Startup-Relevant",
    support: "Equity",
    stages: ["Growth / Scaling"],
    sectors: ["Space", "Deep Tech"],
    headline:
      "A SEBI-registered AIF with a ₹1,005 crore first close, investing equity into unlisted Indian space companies.",
    amount: "Target corpus around ₹1,600 crore; first close ₹1,005 crore; ticket varies by company",
    timeline: "Standard venture diligence cycle",
    whatIsThis:
      "Antariksh VCF is the dedicated venture fund for Indian space technology, with IN-SPACe as the key investor. It received SEBI registration in October 2025 and invests through privately negotiated equity and convertible instruments in unlisted Indian space companies at Technology Readiness Level 4 and above — meaning you need a validated technology, not a concept.",
    objectives: [
      "Provide capital to companies in the space sector at various stages of development",
      "Support scaling of operations and commercialisation of new technologies",
      "Enable Indian companies to contribute to India's broader space ambitions",
    ],
    eligibility: [
      "Indian companies operating in the space sector",
      "Technology Readiness Level (TRL) of 4 and above",
    ],
    benefits: [
      "Investment through privately negotiated equity, convertible instruments and other permissible instruments",
      "Access to a fund with genuine space-sector domain depth",
      "Positioning alongside IN-SPACe's regulatory and authorisation ecosystem",
    ],
    howToApply: [
      {
        title: "Establish your TRL honestly",
        detail:
          "TRL 4 means technology validated in a lab environment. Claiming a TRL you cannot evidence is caught immediately in a space-sector diligence.",
      },
      {
        title: "Apply through SIDBI Venture Capital",
        detail: "Interested companies apply on the Antariksh Venture Capital Fund page and application form.",
      },
      {
        title: "Prepare for space-specific diligence",
        detail:
          "IN-SPACe authorisations, ITAR and export-control exposure, launch or ground-segment dependencies, and long revenue cycles all get examined.",
      },
      {
        title: "Close and file",
        detail: "Definitive documents, then PAS-3, valuation report and register updates on the Indian side.",
      },
    ],
    caaSupport: [
      "Financial model built for long-gestation space revenue cycles",
      "Diligence readiness — books, authorisations, contracts and IP register",
      "Valuation, instrument review and post-round company-law filings",
      "The ladder mapped: IN-SPACe Seed Fund, then TAF, then Antariksh VCF",
    ],
    caaServices: [
      { label: "Business Valuation", href: "/services/business-valuation" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    links: [
      { label: "Antariksh VCF — SIDBI Venture", href: "https://www.sidbiventure.co.in/antariksh_venture_capital_fund.html" },
    ],
  },
  {
    slug: "space-technology-adoption-fund",
    name: "Space Technology Adoption Fund",
    abbr: "TAF",
    ministry: "Department of Space",
    agency: "IN-SPACe",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Prototype / PoC", "Growth / Scaling"],
    sectors: ["Space", "Deep Tech"],
    headline:
      "Up to ₹25 crore per project — funding 60% of cost for startups and MSMEs — to take space technology from TRL 3/4 to a commercial product.",
    amount: "₹500 crore fund · up to 60% of project cost for startups and MSMEs · capped ₹25 crore per project",
    timeline: "Register and apply on the IN-SPACe TAF portal",
    whatIsThis:
      "TAF exists to close the gap between a validated space technology and a saleable product. It funds up to 60% of project cost for startups and MSMEs (40% for large industry), moving technologies from TRL 3/4 to TRL 8/9. At ₹25 crore per project it is the largest non-equity instrument available in the Indian space sector.",
    objectives: [
      "Promote Indian non-government entities to develop space products and scale productionisation",
      "Drive commercialisation of cutting-edge technologies in the space sector",
      "Meet global and domestic space-sector demand from Indian supply",
    ],
    eligibility: [
      "Indian non-government entities including startups, MSMEs and large industry",
      "Projects moving early-stage technologies at TRL 3/4 towards commercially viable products at TRL 8/9",
    ],
    benefits: [
      "Funding up to 60% of project cost for startups and MSMEs; 40% for large industry",
      "Maximum funding per project capped at ₹25 crore",
      "Total fund corpus of ₹500 crore",
    ],
    howToApply: [
      {
        title: "Establish the TRL journey",
        detail:
          "The proposal is structured around moving from a stated starting TRL to a stated target TRL. Both must be evidenced.",
      },
      {
        title: "Confirm you can fund the 40%",
        detail:
          "TAF funds 60% for startups and MSMEs. A ₹25 crore grant implies a project of roughly ₹42 crore — the balance funding plan is scrutinised.",
      },
      {
        title: "Register and apply on the IN-SPACe TAF portal",
        detail: "Applications are made at inspace.gov.in under the TAF section.",
      },
      {
        title: "Execute against productionisation milestones",
        detail: "Release is milestone-linked and oriented towards manufacturing readiness, not just technical success.",
      },
    ],
    caaSupport: [
      "Counterpart-funding plan for the 40% share — debt, equity or internal accrual, documented",
      "Udyam/MSME registration to secure the higher 60% funding ratio",
      "Project costing, CA-certified financials and milestone budgeting",
      "Grant accounting, utilisation certificates and audit through a multi-year project",
    ],
    caaServices: [
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    links: [{ label: "IN-SPACe — TAF", href: "https://www.inspace.gov.in/inspace?id=inspace_taf" }],
  },

  // ── MSME ──────────────────────────────────────────────────────────────────
  {
    slug: "cgtmse",
    name: "Credit Guarantee Trust Fund for Micro & Small Enterprises",
    abbr: "CGTMSE",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    agency: "CGTMSE (Ministry of MSME and SIDBI)",
    focus: "Startup-Relevant",
    support: "Loan / Credit",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Sector Agnostic", "Manufacturing"],
    popular: true,
    headline:
      "The workhorse of Indian small-business credit — collateral-free term loans and working capital, guaranteed up to ₹10 crore.",
    amount: "Guarantee coverage ceiling up to ₹10 crore per borrower; guarantee percentage varies",
    timeline: "Bank appraisal typically 3–6 weeks",
    whatIsThis:
      "CGTMSE is the oldest and most widely used credit guarantee scheme in India, jointly established by the Ministry of MSME and SIDBI. It guarantees a share of the loan a member lending institution extends to a micro or small enterprise, which removes the collateral requirement. For a startup that is Udyam-registered but not chasing venture capital, this is usually the most realistic route to serious working capital.",
    objectives: [
      "Enable collateral-free credit to micro and small enterprises through member lending institutions",
      "Share the credit risk of the lender through a trust fund contributed by the Government of India and SIDBI",
    ],
    eligibility: [
      "Loans sanctioned to micro and small enterprise units as defined by the Ministry of MSME",
      "All eligible activities, including trading activity",
      "The borrower applies through a Member Lending Institution — banks, NBFCs or financial institutions registered with CGTMSE",
    ],
    benefits: [
      "Collateral-free loan available on payment of a guarantee fee by the enterprise",
      "Guarantee coverage ceiling of ₹10 crore per borrower, with incremental facilities available",
      "Modified, more favourable guarantee cover for women entrepreneurs and units in the North-East Region",
    ],
    documents: [
      "Udyam registration certificate",
      "Entity KYC and promoter KYC",
      "Audited or provisional financial statements",
      "Project report for a term loan, or CMA data for working capital",
      "GST returns and bank statements",
      "Quotations for machinery or assets being financed",
    ],
    howToApply: [
      {
        title: "Get Udyam registration first",
        detail:
          "MSE classification is what makes you eligible. Udyam is free and same-day — there is no reason not to have it.",
      },
      {
        title: "Pull the promoter credit report before applying",
        detail: "A weak CIBIL score sinks the file regardless of the guarantee. Find out at the start, not after a rejection.",
      },
      {
        title: "Prepare the credit file properly",
        detail:
          "A project report for a term loan, CMA data for working capital, plus reconciled financials. Banks reject on incoherent numbers more often than on weak business.",
      },
      {
        title: "Apply through a CGTMSE member lending institution",
        detail: "Only MLIs registered with CGTMSE can extend guaranteed credit. The list is published on cgtmse.in.",
      },
      {
        title: "Pay the guarantee fee and keep the account standard",
        detail: "The guarantee fee is payable by the enterprise. Slipping into NPA invalidates the cover.",
      },
    ],
    caaSupport: [
      "Udyam registration with correct NIC codes — the classification drives eligibility and subsidy access",
      "CIBIL pull at intake and a written go/no-go before you spend anything",
      "CA-certified project report or CMA data in the bank's own format",
      "MLI shortlisting, filing and a weekly follow-up cadence, plus the escalation ladder when a branch sits on a file",
    ],
    caaServices: [
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "CMA Data Preparation", href: "/contact" },
    ],
    links: [{ label: "CGTMSE", href: "https://www.cgtmse.in/" }],
  },
  {
    slug: "self-reliant-india-fund",
    name: "Self-Reliant India Fund",
    abbr: "SRI Fund",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    agency: "NSIC Venture Capital Fund Limited (NVCFL)",
    focus: "Startup-Relevant",
    support: "Equity",
    stages: ["Growth / Scaling"],
    sectors: ["Manufacturing", "Sector Agnostic"],
    headline:
      "A ₹50,000 crore equity provision for growth-stage MSMEs, deployed through daughter funds as equity or quasi-equity.",
    amount: "₹10,000 crore from Government of India plus ₹40,000 crore from PE/VC — ₹50,000 crore total provision",
    timeline: "Daughter-fund diligence cycle",
    whatIsThis:
      "The SRI Fund is a fund-of-funds for MSMEs rather than for startups specifically, implemented by NVCFL as a SEBI-registered Category II AIF. It channels growth capital as equity or quasi-equity through empanelled daughter funds. For a manufacturing or services MSME with genuine scale potential, it is a far more realistic equity route than conventional venture capital.",
    objectives: [
      "Create a ₹50,000 crore provision of equity support to MSMEs with the potential and viability to grow",
      "Provide growth capital as equity or quasi-equity through daughter funds",
    ],
    eligibility: ["MSMEs as defined under the MSMED Act, as amended from time to time"],
    benefits: [
      "Growth capital in the form of equity or quasi-equity through daughter funds",
      "Access to a published list of empanelled daughter funds with sector focus and contact details",
    ],
    howToApply: [
      {
        title: "Register interest with NVCFL",
        detail: "MSMEs can fill the interest form at nvcfl.co.in to enter the pipeline.",
      },
      {
        title: "Approach the empanelled daughter funds directly",
        detail:
          "NVCFL publishes the list with fund names, investment managers, sector focus and contacts. Approach the funds aligned to your sector and stage — this is faster than waiting to be matched.",
      },
      {
        title: "Prepare an equity-grade pack",
        detail: "Audited financials, growth plan, management depth, governance and a cap table that can take an institutional investor.",
      },
      {
        title: "Close and comply",
        detail: "Definitive documents, allotment filings and the governance obligations that come with institutional equity.",
      },
    ],
    caaSupport: [
      "Udyam registration and MSME classification review",
      "Corporatisation where the business is still a firm or proprietorship — institutional equity needs a company",
      "Audited financials, valuation and the investment pack",
      "Post-investment governance: board processes, statutory registers and investor reporting",
    ],
    caaServices: [
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "Proprietorship to Pvt Ltd Conversion", href: "/services/proprietorship-to-pvtltd" },
      { label: "Business Valuation", href: "/services/business-valuation" },
    ],
    links: [
      { label: "NVCFL — express interest", href: "https://nvcfl.co.in/Home/InterestAsMSME" },
      { label: "Empanelled daughter funds", href: "https://nvcfl.co.in/Corporate/EmpanelledDaughterFunds" },
    ],
  },
  {
    slug: "msme-champions-scheme",
    name: "MSME Champions Scheme",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    focus: "Startup-Relevant",
    support: "Market Access",
    stages: ["Growth / Scaling", "Market Access & IP"],
    sectors: ["Manufacturing", "Sector Agnostic"],
    headline:
      "Subsidy and handholding across three components — ZED certification, Lean manufacturing, and Innovation covering incubation, IPR and design.",
    amount: "Component-wise; varies under ZED, Lean and Innovative guidelines",
    timeline: "Rolling, through the Champions portal",
    whatIsThis:
      "MSME Champions merged the six components of the erstwhile Credit Linked Capital Subsidy and Technology Upgradation Scheme into three: MSME-Sustainable (ZED), MSME-Competitive (Lean) and MSME-Innovative (incubation, IPR and design). The IPR and design sub-components are the ones startups most often miss — they subsidise exactly the costs young product companies struggle with.",
    objectives: [
      "Promote competitiveness among MSMEs through quality, lean manufacturing, design and IPR support",
      "Reduce wastage through lean manufacturing and improve quality through ZED certification",
      "Promote adoption of latest technologies and knowledge-based innovation through incubation",
    ],
    eligibility: ["MSMEs registered under Udyam"],
    benefits: [
      "Subsidy on the cost of ZED certification",
      "Financial assistance in testing, quality and product development",
      "Handholding support and support for technology upgradation",
      "Incubation, IPR and design support under the MSME-Innovative component",
    ],
    howToApply: [
      {
        title: "Get Udyam registered",
        detail: "Every component runs off MSME classification.",
      },
      {
        title: "Pick the component that matches your problem",
        detail:
          "ZED for quality certification, Lean for process waste, Innovative for incubation, IPR and design. They are separate applications.",
      },
      {
        title: "Apply on champions.gov.in",
        detail: "Applications and grievance tracking run through the Champions portal.",
      },
      {
        title: "Complete certification or the design engagement",
        detail: "Subsidy is typically reimbursed against certified completion, so keep the documentation clean.",
      },
    ],
    caaSupport: [
      "Udyam registration and correct NIC classification",
      "ZED and ISO certification coordination",
      "IPR filings under the MSME-Innovative component, claimed alongside SIPP where eligible",
      "Reimbursement claim documentation",
    ],
    caaServices: [
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "ISO Certification", href: "/services/iso-certification" },
      { label: "Trademark Registration", href: "/services/trademark-registration" },
    ],
    links: [
      {
        label: "MSME Champions portal",
        href: "https://champions.gov.in/Government-India/Ministry-MSME-Portal-handholding/msme-problem-complaint-welcome.htm",
      },
    ],
  },
  {
    slug: "international-cooperation-scheme",
    name: "International Cooperation Scheme",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    focus: "Startup-Relevant",
    support: "Market Access",
    stages: ["Growth / Scaling", "Market Access & IP"],
    sectors: ["Sector Agnostic", "Manufacturing"],
    headline:
      "Reimburses the cost of taking your product to international trade fairs, exhibitions and buyer-seller meets.",
    amount: "Assistance varies by event category and guidelines",
    timeline: "Event-linked; apply ahead of the event",
    whatIsThis:
      "The International Cooperation Scheme pays back a share of what it costs an MSME to appear at an overseas trade fair — travel, stall, registration and event costs. It also has a Capacity Building of First Time Exporters component that reimburses new exporters for defined export-related expenditure. For a hardware or consumer product startup, one well-chosen international fair can produce a year of pipeline.",
    objectives: [
      "Support MSMEs in entering international markets through exhibitions, fairs and buyer-seller meets abroad",
      "Help MSMEs keep pace with technology change, demand shifts and emerging markets",
      "Build capacity in first-time exporters",
    ],
    eligibility: [
      "MSMEs, State and Central government organisations and institutions, and registered industry or enterprise associations",
    ],
    benefits: [
      "Financial assistance on reimbursement basis for travel, stall, registration and event costs",
      "Market Development Assistance component",
      "Capacity Building of First Time Exporters (CBFTE) — reimbursement to new micro and small exporters for defined export costs",
      "Framework for International Market Intelligence Dissemination",
    ],
    howToApply: [
      {
        title: "Get the export base in place",
        detail: "Udyam and IEC registration are prerequisites for meaningful participation.",
      },
      {
        title: "Choose the event and apply before it, not after",
        detail: "Assistance is event-linked and approval is needed in advance. Retrospective claims fail.",
      },
      {
        title: "Apply through the IC portal",
        detail: "Applications are made at ic.msme.gov.in.",
      },
      {
        title: "Keep every receipt",
        detail: "This is a reimbursement scheme. Missing documentation is the most common reason claims are cut.",
      },
    ],
    caaSupport: [
      "Udyam and IEC registration — the export compliance base",
      "Event selection and application timing so the claim is actually admissible",
      "Reimbursement claim documentation and follow-up",
      "Export GST compliance including LUT filing and zero-rated supply treatment",
    ],
    caaServices: [
      { label: "IEC Registration (Import-Export)", href: "/services/iec-registration" },
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "GST LUT Filing", href: "/services/gst-lut-filing" },
    ],
    links: [{ label: "IC Scheme portal", href: "https://ic.msme.gov.in/IC_APP/IC_Welcome.aspx" }],
  },
  {
    slug: "national-sc-st-hub",
    name: "National SC-ST Hub Scheme",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    focus: "Startup-Relevant",
    support: "Market Access",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Sector Agnostic", "Manufacturing"],
    headline:
      "25% subsidy on plant and machinery up to ₹25 lakh, plus procurement linkages and fee reimbursements for SC/ST entrepreneurs.",
    amount: "25% subsidy on plant and machinery or ₹25 lakh, whichever is less",
    timeline: "Rolling, through the NSSH portal",
    whatIsThis:
      "The National SC-ST Hub exists to help SC and ST entrepreneurs meet — and benefit from — the 4% public procurement reservation under the Public Procurement Policy for MSEs. Beyond capital subsidy on machinery, it reimburses bank loan processing fees, testing charges, Export Promotion Council membership and e-commerce portal registration, all of which are real cash costs for a young business.",
    objectives: [
      "Provide professional support to SC and ST entrepreneurs to fulfil obligations under the Public Procurement Policy for MSEs Order 2012",
      "Help SC/ST entrepreneurs adopt applicable business practices and leverage Stand-Up India",
      "Build capacity and create market linkages",
    ],
    eligibility: ["Existing and aspiring SC/ST entrepreneurs"],
    benefits: [
      "Special Credit Linked Capital Subsidy for technology enablement",
      "25% subsidy on purchase of plant and machinery or equipment, or ₹25 lakh, whichever is less",
      "Marketing, mentoring, skills training and trade-specific tool kits",
      "Reimbursement of bank loan processing fees, testing services, Export Promotion Council membership, government e-commerce portal membership and NSIC Single Point Registration",
    ],
    howToApply: [
      {
        title: "Register on the NSSH portal",
        detail: "The scheme is implemented online at scsthub.in.",
      },
      {
        title: "Get Udyam registered and claim MSE procurement benefits",
        detail: "The procurement reservation and the subsidy both flow off MSE status.",
      },
      {
        title: "Apply component by component",
        detail: "Capital subsidy, fee reimbursements and capacity building are separate claims with their own documentation.",
      },
      {
        title: "Register on GeM and NSIC to convert the procurement policy into orders",
        detail: "The reservation only helps if you are listed where government buyers actually buy.",
      },
    ],
    caaSupport: [
      "Udyam registration and NSIC Single Point Registration",
      "Capital subsidy claim documentation on plant and machinery",
      "GeM seller registration to convert procurement preference into actual orders",
      "Coordination with a Stand-Up India loan application where machinery is being debt-funded",
    ],
    caaServices: [
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "Govt Scheme Loan Advisory", href: "/pricing#startup-services" },
    ],
    links: [
      { label: "National SC-ST Hub", href: "https://www.scsthub.in/" },
      { label: "NSSH guidelines (PDF)", href: "https://www.scsthub.in/sites/default/files/training/NSSH_Guidelines.pdf" },
    ],
  },
  {
    slug: "esdp",
    name: "Entrepreneurship and Skill Development Programme",
    abbr: "ESDP",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Ideation"],
    sectors: ["Sector Agnostic"],
    headline:
      "Free and subsidised entrepreneurship, skill and management training for prospective and existing entrepreneurs.",
    amount: "No direct startup funding; training cost supported per programme norms",
    timeline: "Rolling programmes through MSME-DFOs and technology centres",
    whatIsThis:
      "ESDP delivers three training modules — Entrepreneurship Awareness, Entrepreneurship-cum-Skill Development, and Management Development — across domains including e-commerce, software, biotech, modern agriculture and genomics. It is not funding, but for a first-time founder it is a structured, subsidised way to acquire the operating knowledge that grant committees later test you on.",
    objectives: [
      "Motivate people from different sections of society to consider entrepreneurship as a career",
      "Provide entrepreneurship training across modern technology and business domains",
      "Support establishment of new MSMEs and growth of existing ones",
    ],
    eligibility: [
      "Existing or aspiring entrepreneurs",
      "40% of beneficiaries must be from weaker sections of society including SC, ST, women and persons with disabilities",
    ],
    benefits: [
      "Training under three modules — Entrepreneurship Awareness, Entrepreneurship-cum-Skill Development and Management Development",
      "Hands-on practice and demonstration to upgrade skills",
      "Training cost supported per programme norms",
    ],
    howToApply: [
      {
        title: "Find your MSME-DFO or technology centre",
        detail: "Programmes run through MSME Development and Facilitation Offices, MSME technology centres and other implementing agencies.",
      },
      {
        title: "Apply for the relevant module",
        detail: "Awareness programmes are short; skill development and management development run longer.",
      },
      {
        title: "Use it as the on-ramp, not the destination",
        detail: "Pair the training with Udyam registration and a funding roadmap so it converts into an actual business.",
      },
    ],
    caaSupport: [
      "Business structure advisory — company, LLP or proprietorship — for first-time founders coming out of training",
      "Udyam and GST registration to make the business operational",
      "A 12-month compliance calendar so a new entrepreneur does not accumulate penalties in year one",
    ],
    caaServices: [
      { label: "Business Structure Advisor", href: "/calculators/business-structure-advisor" },
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
    ],
    links: [{ label: "MSME-DI — ESDP", href: "https://msmedi.dcmsme.gov.in/" }],
  },

  // ── Atal Innovation Mission ───────────────────────────────────────────────
  {
    slug: "atal-tinkering-labs",
    name: "Atal Tinkering Labs",
    abbr: "ATL",
    ministry: "NITI Aayog",
    agency: "Atal Innovation Mission",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Ideation"],
    sectors: ["Students & Academia"],
    headline:
      "₹20 lakh per school to build an innovation workspace where students learn design thinking and build prototypes.",
    amount: "₹20 lakh grant-in-aid per selected school over five years",
    timeline: "Applications through the AIM portal",
    whatIsThis:
      "Atal Tinkering Labs are workspaces in schools where students work with tools, electronics and rapid-prototyping equipment. It is a pipeline programme rather than a startup funding scheme — but for edtech companies, equipment suppliers and STEM content businesses, ATL is a large and identifiable market, and for school trusts it is straightforward grant capital.",
    objectives: [
      "Foster curiosity, creativity and imagination in young minds",
      "Inculcate design mindset, computational thinking, adaptive learning and physical computing skills",
      "Give students hands-on exposure to STEM concepts",
    ],
    eligibility: [
      "Schools in India with at least Grade VI to X, managed by State, Union Territory or Central Government, a local body, a private trust or society, or a tribal or social welfare department",
    ],
    benefits: [
      "Grant-in-aid of ₹20 lakh per school — ₹10 lakh capital and ₹10 lakh operational and maintenance over five years",
      "Equipment, mentoring and participation in national innovation challenges",
    ],
    howToApply: [
      {
        title: "For schools: apply on aim.gov.in",
        detail: "Applications are submitted online to the Atal Innovation Mission at NITI Aayog.",
      },
      {
        title: "For startups: treat ATL as a market, not a scheme",
        detail:
          "Thousands of labs need equipment, curriculum, training and content. Getting empanelled as a supplier is the commercial opportunity here.",
      },
    ],
    caaSupport: [
      "Section 8 or trust structuring and compliance for school and education entities",
      "12A/80G registration and grant accounting for the recipient entity",
      "For suppliers: GeM registration and the compliance base to sell into ATL schools",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "12A & 80G Registration", href: "/services/12a-80g-registration" },
    ],
    links: [
      { label: "AIM — ATL overview", href: "https://aim.gov.in/atl-overview.php" },
      { label: "ATL guidebook (PDF)", href: "https://aim.gov.in/pdf/ATL-Guidebook.pdf" },
    ],
  },
  {
    slug: "atal-incubation-centres",
    name: "Atal Incubation Centres",
    abbr: "AIC",
    ministry: "NITI Aayog",
    agency: "Atal Innovation Mission",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Ideation", "Prototype / PoC", "Seed / Early Stage"],
    sectors: ["Sector Agnostic"],
    headline:
      "Grants of up to ₹10 crore to build world-class sector-specific incubators — and one of the widest incubator networks a startup can access.",
    amount: "Up to ₹5 crore without lab facilities · up to ₹10 crore with sector-specific labs",
    timeline: "Application windows announced on the AIM portal",
    whatIsThis:
      "AICs are the Atal Innovation Mission's incubator network — sector-specific centres offering physical infrastructure, mentoring, business planning support, seed capital access and industry partnerships. For founders, an AIC is often the most accessible high-quality incubator in a given city, and many run their own seed funds on top of the AIM grant.",
    objectives: [
      "Promote and establish world-class, sector-specific incubation centres",
      "Provide startups with physical infrastructure, sectoral mentoring and business planning support",
      "Give startups access to seed capital, industry partners and capacity building",
    ],
    eligibility: [
      "Academic institutions such as higher educational institutes and R&D institutes",
      "Non-academic institutions including corporate sector enterprises and SEBI-registered alternative investment funds",
      "Business accelerators, groups of individuals and individuals",
    ],
    benefits: [
      "Grants-in-aid over 5 years covering capital and operational expenditure",
      "Up to ₹5 crore where no lab facilities are established; up to ₹10 crore where sector-specific labs are",
      "No matching contribution required from government applicants; 25% to 100% matching for non-government applicants",
    ],
    howToApply: [
      {
        title: "For founders: apply for incubation at an AIC",
        detail: "AICs run their own intake. Choose on sector alignment, facilities and the strength of their corporate network.",
      },
      {
        title: "For institutions: check the matching contribution",
        detail:
          "Non-government applicants must match 25% to 100% of the grant depending on applicant type. Establish that funding before applying.",
      },
      {
        title: "Apply through aim.gov.in",
        detail: "Proposals are submitted online and assessed by a screening and selection committee.",
      },
    ],
    caaSupport: [
      "AIC identification and incubation applications for founders",
      "Section 8 entity structuring and matching-fund planning for institutions",
      "12A/80G registration, grant accounting and annual compliance for the incubator entity",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "12A & 80G Registration", href: "/services/12a-80g-registration" },
    ],
    links: [
      { label: "AIM — AIC overview", href: "https://aim.gov.in/aic-overview.php" },
      { label: "AIC guidelines (PDF)", href: "https://aim.gov.in/pdf/AIC-Guidelines-Final_24Nov-2023.pdf" },
    ],
  },
  {
    slug: "atal-community-innovation-centres",
    name: "Atal Community Innovation Centres",
    abbr: "ACIC",
    ministry: "NITI Aayog",
    agency: "Atal Innovation Mission",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Ideation", "Prototype / PoC"],
    sectors: ["Rural & Social", "Sector Agnostic"],
    headline:
      "Up to ₹2.5 crore to build innovation centres in aspirational and underserved regions, with AIM covering half the project cost.",
    amount: "Up to ₹2.5 crore in tranches; AIM funds 50% of the total project",
    timeline: "Applications through aim.gov.in, assessed by a screening committee",
    whatIsThis:
      "ACICs bring incubation infrastructure and capacity building to regions the mainstream startup ecosystem has not reached. AIM funds half the project and the applicant matches the rest through PPP or private contribution. For founders in aspirational districts, an ACIC may be the only local incubation available.",
    objectives: [
      "Offer infrastructure facilities and capacity building to potential entrepreneurs in aspiring regions",
      "Extend the innovation ecosystem into underserved geographies",
    ],
    eligibility: [
      "Academic applicants: UGC and AICTE affiliated universities and colleges, ITIs and other technical diploma colleges",
      "Non-academic applicants: voluntary and other organisations with strong experience in promotion of science and technology",
      "Minimum 3 years of existence for all applicants",
    ],
    benefits: [
      "Support of up to ₹2.5 crore in multiple tranches based on the approved budget",
      "AIM funding covers 50% of the total project cost",
      "Applicant matches the remainder through PPP or private contribution",
    ],
    howToApply: [
      {
        title: "For founders: find the ACIC in your district",
        detail: "ACICs are concentrated in aspirational and underserved regions. Local access is the entire point of the programme.",
      },
      {
        title: "For institutions: arrange the 50% match first",
        detail: "The matching contribution through PPP or private funding must be credible at application stage.",
      },
      {
        title: "Apply online and face the selection committee",
        detail: "Applications are submitted via aim.gov.in and evaluated by a screening and selection committee.",
      },
    ],
    caaSupport: [
      "Entity structuring and Section 8 incorporation for ACIC applicants",
      "Matching-contribution structuring including CSR and PPP routes",
      "Grant accounting and utilisation compliance",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "12A & 80G Registration", href: "/services/12a-80g-registration" },
    ],
    links: [
      { label: "AIM", href: "https://aim.gov.in/" },
      { label: "ACIC guidelines (PDF)", href: "https://aim.gov.in/pdf/Flag-O_Revised_ACIC_Guidelines_June-2022.pdf" },
    ],
  },
  {
    slug: "established-incubation-centres",
    name: "Scheme for Scale-up Support to Established Incubation Centres",
    abbr: "EIC",
    ministry: "NITI Aayog",
    agency: "Atal Innovation Mission",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Sector Agnostic"],
    headline:
      "Up to ₹10 crore for existing incubators to expand space, services, seed funding capacity and infrastructure.",
    amount: "Grant-in-aid up to ₹10 crore, available up to three times",
    timeline: "Announced through the AIM portal",
    whatIsThis:
      "The EIC scheme scales up incubators that already work. Funding covers refurbished space, expanded teams, tools and equipment, services, seed funding support, outreach and training programmes. Because an EIC-supported incubator has more seed capital to deploy, founders benefit indirectly and immediately.",
    objectives: [
      "Enhance the incubation capacity of existing incubators supported by AIM",
      "Refurbish incubation space and expand capability, team, infrastructure, tools and services",
      "Strengthen seed funding support, outreach and training programmes",
    ],
    eligibility: [
      "Established Incubation Centres registered in India as a legal entity in public, private or public-private partnership mode",
      "Operational for a minimum of three years as of 1 August 2017",
    ],
    benefits: [
      "Grant-in-aid support of up to ₹10 crore",
      "Eligible to apply and avail grant-in-aid under the scheme up to three times",
      "Balanced utilisation of funds per the suggestive activity-wise breakup",
    ],
    howToApply: [
      {
        title: "For founders: target EIC-supported incubators",
        detail: "They have deeper seed-funding capacity than an unsupported incubator of the same size.",
      },
      {
        title: "For incubators: evidence the track record",
        detail: "Three years of operation and a demonstrable portfolio are the entry conditions.",
      },
      {
        title: "Apply via aim.gov.in",
        detail: "Details are published on the Atal Incubation Centres pages.",
      },
    ],
    caaSupport: [
      "Incubator entity compliance and governance framework",
      "Grant accounting and activity-wise utilisation reporting",
      "Annual statutory compliance for incubator entities — ROC, ITR and audit",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "ROC Annual Filing", href: "/services/roc-compliance" },
    ],
    links: [
      { label: "AIM — incubation centres", href: "https://aim.gov.in/atal-incubation-centres.php" },
      { label: "EIC guidelines (PDF)", href: "https://aim.gov.in/pdf/EIC_guidelines_2019.pdf" },
    ],
  },

  // ── Agriculture, Food, Rural ──────────────────────────────────────────────
  {
    slug: "agriculture-infrastructure-fund",
    name: "Agriculture Infrastructure Financing Facility",
    abbr: "AIF",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    focus: "Startup-Relevant",
    support: "Loan / Credit",
    stages: ["Growth / Scaling"],
    sectors: ["Agriculture & Food", "Rural & Social"],
    headline:
      "3% interest subvention on loans up to ₹2 crore for post-harvest infrastructure and community farming assets.",
    amount: "3% per annum interest subvention on loans up to ₹2 crore, for up to 7 years · scheme corpus ₹1 lakh crore",
    timeline: "Applications open round the year",
    whatIsThis:
      "The AIF is a ₹1 lakh crore medium-to-long-term debt facility for post-harvest management infrastructure — cold chains, warehouses, grading and sorting units, primary processing — and community farming assets. Agri-entrepreneurs and startups are explicitly eligible, and the 3% interest subvention plus credit guarantee support makes it materially cheaper than commercial debt.",
    objectives: [
      "Mobilise medium and long-term debt financing for post-harvest management infrastructure",
      "Support viable projects for community farming assets through incentives and financial support",
    ],
    eligibility: [
      "Primary Agricultural Credit Societies, marketing cooperative societies, FPOs, self-help groups, farmers, joint liability groups and multipurpose cooperative societies",
      "Agri-entrepreneurs and startups",
      "Central or State agency or local body sponsored PPP projects, state agencies, APMCs, and national and state federations of cooperatives, FPOs and SHGs",
    ],
    benefits: [
      "Interest subvention of 3% per annum on loans up to ₹2 crore",
      "Subvention available for a maximum period of 7 years",
      "Credit guarantee support on eligible loans",
    ],
    howToApply: [
      {
        title: "Register as a beneficiary on the AIF portal",
        detail: "Applications are open round the year at agriinfra.dac.gov.in.",
      },
      {
        title: "Prepare a bankable project report",
        detail:
          "The subvention is on a bank loan, so the loan must be sanctioned first. That means a proper DPR with capacity, costing, and repayment capability.",
      },
      {
        title: "Get the loan sanctioned by a participating lender",
        detail: "The bank appraises and sanctions; the subvention is then claimed against the sanctioned facility.",
      },
      {
        title: "Stack with other schemes where eligible",
        detail: "AIF can often be combined with PMFME or state horticulture subsidies. Check convergence before finalising the funding plan.",
      },
    ],
    caaSupport: [
      "CA-certified project report and DPR to the lender's format",
      "CMA data where working capital is part of the facility",
      "Scheme convergence analysis so you do not leave a second subsidy unclaimed",
      "Application filing, bank follow-up cadence and post-sanction subsidy claim tracking",
    ],
    caaServices: [
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "Govt Scheme Loan Advisory", href: "/pricing#startup-services" },
      { label: "Producer Company Registration", href: "/services/producer-company" },
    ],
    links: [
      { label: "AIF beneficiary registration", href: "https://agriinfra.dac.gov.in/Home/BeneficiaryRegistration" },
      { label: "AIF scheme guidelines (PDF)", href: "https://agriinfra.dac.gov.in/Content/DocAttachment/FINALSchemeGuidelinesAIF.pdf" },
    ],
  },
  {
    slug: "pmfme",
    name: "PM Formalisation of Micro Food Processing Enterprises",
    abbr: "PMFME",
    ministry: "Ministry of Food Processing Industries",
    focus: "Startup-Relevant",
    support: "Loan / Credit",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Agriculture & Food", "Rural & Social", "Manufacturing"],
    headline:
      "35% credit-linked capital subsidy up to ₹10 lakh per unit for micro food-processing enterprises, under One District One Product.",
    amount: "35% credit-linked capital subsidy up to ₹10 lakh per unit · SHG seed capital ₹40,000 per member",
    timeline: "Rolling, through the PMFME portal and state nodal agencies",
    whatIsThis:
      "PMFME formalises India's unorganised micro food-processing sector around the One District One Product framework. For a small food brand or processing unit, it is the most accessible capital subsidy in the country: 35% of project cost up to ₹10 lakh, credit-linked, with branding and marketing support and incubation centre access on top.",
    objectives: [
      "Promote formalisation of unorganised microenterprises in the food processing sector",
      "Establish and utilise incubation centres based on One District One Product",
      "Provide training and capacity building to micro entrepreneurs, SHGs, FPOs and cooperatives",
    ],
    eligibility: [
      "Existing individual microentrepreneurs and micro units",
      "Self-help groups, FPOs, producer cooperatives and individuals",
      "Food startups and micro-enterprises",
    ],
    benefits: [
      "Credit-linked capital subsidy at 35% of project cost, capped at ₹10 lakh per unit",
      "FPOs and producer cooperatives receive a 35% grant with credit linkage",
      "SHGs receive seed capital of ₹40,000 per member for working capital and small tools",
      "Branding, marketing and incubation centre support",
    ],
    howToApply: [
      {
        title: "Identify your district's ODOP product",
        detail: "Alignment to the district's One District One Product improves prioritisation materially.",
      },
      {
        title: "Get FSSAI licensing at the right tier",
        detail:
          "Food businesses cannot formalise without it, and the licence tier depends on turnover and activity. Getting this wrong causes rework.",
      },
      {
        title: "Register and apply on the PMFME portal",
        detail: "Applications are made at pmfme.mofpi.gov.in and routed through the state nodal agency and a lender.",
      },
      {
        title: "Get the loan sanctioned — the subsidy is credit-linked",
        detail: "No bank loan, no subsidy. The DPR must satisfy the lender before the subsidy conversation begins.",
      },
      {
        title: "Claim the subsidy post-disbursement",
        detail: "Subsidy is released after disbursement against documented deployment.",
      },
    ],
    caaSupport: [
      "FSSAI licensing at the correct tier — Basic, State or Central — before the application",
      "Udyam registration and entity formalisation",
      "DPR and bank application, with follow-up until sanction",
      "Subsidy claim documentation and post-sanction compliance",
    ],
    caaServices: [
      { label: "FSSAI Food License", href: "/services/fssai-license" },
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
    ],
    links: [{ label: "PMFME portal", href: "https://pmfme.mofpi.gov.in/pmfme/#/Login" }],
  },
  {
    slug: "national-livestock-mission",
    name: "National Livestock Mission",
    abbr: "NLM",
    ministry: "Department of Animal Husbandry & Dairying",
    focus: "Startup-Relevant",
    support: "Loan / Credit",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Agriculture & Food", "Rural & Social"],
    headline:
      "50% capital subsidy up to ₹50 lakh for entrepreneurs in poultry, sheep, goat, piggery and fodder.",
    amount: "50% capital subsidy up to ₹50 lakh depending on project category",
    timeline: "Rolling, through the NLM Udyamimitra portal",
    whatIsThis:
      "NLM develops entrepreneurship in animal husbandry by subsidising half the capital cost of a project, up to ₹50 lakh, across poultry, sheep and goat, piggery and fodder. It also runs a Startup Grand Challenge for innovation in the sector, and funds extension, R&D and innovation activities at 100% central assistance.",
    objectives: [
      "Develop entrepreneurs in animal husbandry",
      "Create forward and backward linkages between the unorganised and organised sectors",
      "Incentivise startups solving problems in sheep, goat, poultry, pig, feed and fodder",
    ],
    eligibility: [
      "Individuals, FPOs, SHGs, JLGs, Section 8 companies and entrepreneurs in livestock",
      "ICAR institutes, central institutes, state government university farms and other credible institutions for the R&D component",
    ],
    benefits: [
      "50% capital subsidy up to ₹50 lakh depending on project category",
      "Capital subsidy routed with loan or project finance",
      "100% central assistance for extension, R&D and innovation activities",
      "Startup Grand Challenge Programme for sector innovation",
    ],
    howToApply: [
      {
        title: "Confirm your project category and the applicable subsidy ceiling",
        detail: "Poultry, sheep and goat, piggery and fodder each have distinct project norms.",
      },
      {
        title: "Prepare a bankable DPR",
        detail: "The subsidy is credit-linked, so the project report must first satisfy a lender.",
      },
      {
        title: "Apply on the NLM Udyamimitra portal",
        detail: "Applications are filed at nlm.udyamimitra.in and routed to a bank and the state department.",
      },
      {
        title: "Complete the loan sanction and claim the subsidy",
        detail: "Subsidy is released against disbursement and verified project implementation.",
      },
    ],
    caaSupport: [
      "Project categorisation and subsidy-ceiling assessment before you commit to a plan",
      "CA-certified DPR and bank application, with follow-up until sanction",
      "Entity structuring — FPO, SHG-linked entity, Section 8 or company — for the applicable component",
      "Subsidy claim documentation and post-sanction compliance",
    ],
    caaServices: [
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "Govt Scheme Loan Advisory", href: "/pricing#startup-services" },
      { label: "Producer Company Registration", href: "/services/producer-company" },
    ],
    links: [
      { label: "NLM portal", href: "https://nlm.udyamimitra.in/" },
      { label: "NLM operational guidelines", href: "https://nlm.udyamimitra.in/Home/OperationalGuidelines" },
    ],
  },
  {
    slug: "svep",
    name: "Start-up Village Entrepreneurship Programme",
    abbr: "SVEP",
    ministry: "Ministry of Rural Development",
    agency: "DAY-NRLM",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Ideation", "Seed / Early Stage"],
    sectors: ["Rural & Social"],
    headline:
      "Capital, training and local business support for rural non-farm enterprises started by SHG members and their families.",
    amount: "Support varies by block and enterprise plan; up to ₹6.5 crore per block overall",
    timeline: "Block-level implementation selected by States and UTs",
    whatIsThis:
      "SVEP is a sub-scheme of DAY-NRLM that helps rural households set up small non-farm enterprises. It builds a local cadre of Community Resource Persons who provide business support on the ground, and funds enterprises through a dedicated Community Enterprise Fund. It is not a startup scheme in the technology sense, but for rural micro-enterprise it is the most substantive support available.",
    objectives: [
      "Support SHG members and their families to set up small enterprises in the non-farm sector",
      "Build a cadre of Community Resource Persons — Enterprise Promotion to provide local business support",
    ],
    eligibility: [
      "Rural entrepreneurs from the SHG and NRLM ecosystem",
      "States and UTs select blocks for implementation against criteria in the guidelines",
      "Early-stage rural enterprises are the beneficiaries",
    ],
    benefits: [
      "Community Enterprise Fund providing capital for enterprises",
      "Training, mentoring and ongoing business support services",
      "Local CRP-EP support embedded in the block",
    ],
    howToApply: [
      {
        title: "Check whether your block is under SVEP",
        detail: "Implementation is block-selected. If your block is not covered, the scheme is not accessible.",
      },
      {
        title: "Engage through the SHG and NRLM structure",
        detail: "Access runs through the community institutions, not through a direct government application.",
      },
      {
        title: "Apply via svep.nrlm.gov.in",
        detail: "The portal carries the programme details and application route.",
      },
    ],
    caaSupport: [
      "Entity structuring for rural enterprises — proprietorship, partnership or producer company",
      "Udyam registration and basic tax compliance set up correctly from the start",
      "Convergence advice with PMFME, PMMY and state schemes so the enterprise is not under-funded",
    ],
    caaServices: [
      { label: "Sole Proprietorship", href: "/services/sole-proprietorship" },
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
    ],
    links: [{ label: "SVEP portal", href: "https://svep.nrlm.gov.in/landing" }],
  },
  {
    slug: "yuva-sahakar",
    name: "Yuva Sahakar – Cooperative Enterprise Support and Innovation Scheme",
    ministry: "Ministry of Cooperation",
    agency: "National Cooperative Development Corporation (NCDC)",
    focus: "Startup-Relevant",
    support: "Loan / Credit",
    stages: ["Seed / Early Stage"],
    sectors: ["Rural & Social", "Agriculture & Food"],
    headline:
      "Long-term loans with a 2% interest concession for newly formed cooperative societies with innovative business ideas.",
    amount: "Loan per project norms, commonly referenced up to ₹3 crore project cost · 2% interest subvention",
    timeline: "Through NCDC's project appraisal process",
    whatIsThis:
      "Yuva Sahakar is linked to a dedicated Cooperative Startup and Innovation Fund and supports newly formed cooperative societies with innovative, value-chain-enhancing ideas. It gives special encouragement to cooperatives in the North-Eastern Region and aspirational districts, and to those led by women, SC/ST and persons with disabilities.",
    objectives: [
      "Support newly formed cooperative societies with innovative and value-chain-enhancing ideas",
      "Encourage young entrepreneurs to establish and manage cooperative enterprises",
      "Strengthen the cooperative ecosystem through sustainable and scalable projects",
    ],
    eligibility: [
      "Newly formed cooperative societies",
      "Societies in operation for the minimum period prescribed by the scheme",
      "Youth-led and new cooperatives, with special encouragement for North-Eastern Region, aspirational districts, and women, SC/ST and PwD led societies",
    ],
    benefits: [
      "Long-term financial support to cooperative startups",
      "2% interest concession on term loans",
      "Convergence permitted with other government subsidies",
    ],
    howToApply: [
      {
        title: "Form or identify the cooperative society",
        detail: "The borrower must be a registered cooperative society meeting the minimum operational period.",
      },
      {
        title: "Prepare the project proposal for NCDC",
        detail: "NCDC appraises the project on viability, innovation and the value-chain contribution.",
      },
      {
        title: "Route through the state cooperative department where required",
        detail: "State government recommendation is part of the NCDC process for many categories.",
      },
      {
        title: "Plan the convergence",
        detail: "Yuva Sahakar allows convergence with other subsidies — map them into the funding plan upfront.",
      },
    ],
    caaSupport: [
      "Cooperative society formation and the governance framework NCDC expects",
      "Project report and financial projections for NCDC appraisal",
      "Convergence planning with other central and state subsidies",
      "Ongoing accounting, audit and statutory compliance for the society",
    ],
    caaServices: [
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    ],
    links: [{ label: "NCDC — Yuva Sahakar (PDF)", href: "https://www.ncdc.in/documents/other/3908071119Yuva.pdf" }],
  },

  // ── Finance & inclusion ───────────────────────────────────────────────────
  {
    slug: "pradhan-mantri-mudra-yojana",
    name: "Pradhan Mantri Mudra Yojana",
    abbr: "PMMY",
    ministry: "Ministry of Finance",
    agency: "Department of Financial Services / MUDRA",
    focus: "Startup-Relevant",
    support: "Loan / Credit",
    stages: ["Ideation", "Seed / Early Stage"],
    sectors: ["Sector Agnostic", "Rural & Social"],
    popular: true,
    headline:
      "Collateral-free loans up to ₹20 lakh for micro and small business — the most widely accessed credit scheme in India.",
    amount: "Shishu up to ₹50,000 · Kishor ₹50,000–₹5 lakh · Tarun ₹5–10 lakh · Tarun Plus ₹10–20 lakh",
    timeline: "Bank processing typically 2–6 weeks",
    whatIsThis:
      "MUDRA is a refinancing institution, and PMMY is the scheme through which banks, NBFCs and MFIs lend to non-corporate, non-farm micro and small enterprises. It is collateral-free, available at every bank branch in the country, and covers trading, manufacturing, services and activities allied to agriculture. For most first-time founders, this is the realistic first credit line.",
    objectives: [
      "Provide loans up to ₹20 lakh to income-generating micro and small business entities",
      "Cover trading, manufacturing, services and activities allied to agriculture, poultry and farming",
    ],
    eligibility: [
      "Individuals, proprietary concerns, partnership firms, private limited companies, public companies and other legal forms",
      "Non-corporate, non-farm micro and small enterprises, including early-stage businesses and startups",
    ],
    benefits: [
      "Term loan, overdraft, working capital or composite loan for acquiring assets",
      "Shishu: up to ₹50,000 · Kishor: ₹50,000 to ₹5 lakh · Tarun: ₹5 lakh to ₹10 lakh · Tarun Plus: ₹10 lakh to ₹20 lakh",
      "No collateral requirement",
    ],
    documents: [
      "KYC of the applicant — PAN, Aadhaar, photographs",
      "Proof of business — Udyam, GST, shop licence as applicable",
      "Bank statements, typically 6 to 12 months",
      "Quotations for machinery or assets being financed",
      "Project report with cost, own contribution and repayment plan",
    ],
    howToApply: [
      {
        title: "Pick the right category",
        detail:
          "Shishu, Kishor, Tarun and Tarun Plus differ in documentation intensity as well as amount. Asking for ₹9 lakh when ₹4 lakh is defensible slows the file down.",
      },
      {
        title: "Pull your credit report first",
        detail:
          "PMMY is collateral-free, not assessment-free. A defaulted credit card from five years ago will surface — deal with it before applying.",
      },
      {
        title: "Prepare the project report",
        detail: "Cost, own contribution, revenue plan and repayment capacity. Even a ₹5 lakh application benefits from a proper one.",
      },
      {
        title: "Apply at a bank branch, through Jan Samarth or Udyamimitra",
        detail: "MUDRA loans are available at all bank branches and through NBFCs and MFIs, or online via the portals.",
      },
      {
        title: "Follow up — persistently",
        detail:
          "The single biggest reason a MUDRA file stalls is that nobody chased it. A weekly, documented follow-up cadence changes outcomes.",
      },
    ],
    caaSupport: [
      "CIBIL pull at intake and an honest written go/no-go before you spend a rupee",
      "Udyam registration and business-proof documentation",
      "Project report at scheme-appropriate depth, plus the full application file",
      "Weekly follow-up cadence and the escalation ladder — branch, then regional office, then the formal grievance route",
    ],
    caaServices: [
      { label: "Govt Scheme Loan Advisory", href: "/pricing#startup-services" },
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
    ],
    links: [
      { label: "MUDRA", href: "https://www.mudra.org.in/" },
      { label: "Jan Samarth — Mudra", href: "https://www.jansamarth.in/business-loan-pradhan-mantri-mudra-yojana-scheme" },
    ],
  },
  {
    slug: "stand-up-india",
    name: "Stand-Up India",
    ministry: "Ministry of Finance",
    agency: "Department of Financial Services",
    focus: "Startup-Relevant",
    support: "Loan / Credit",
    stages: ["Seed / Early Stage"],
    sectors: ["Sector Agnostic", "Manufacturing"],
    headline:
      "Composite bank loans of ₹10 lakh to ₹1 crore for greenfield enterprises promoted by SC/ST and women entrepreneurs.",
    amount: "₹10 lakh to ₹1 crore composite loan, repayable in 7 years with up to 18 months moratorium",
    timeline: "Bank appraisal typically 4–8 weeks",
    whatIsThis:
      "Stand-Up India requires every bank branch to lend to at least one SC or ST borrower and at least one woman borrower for a greenfield enterprise. Because it is a branch-level obligation rather than a competitive pool, a well-prepared file has unusually good odds. It finances manufacturing, services, trading and agri-allied activities.",
    objectives: [
      "Finance SC/ST and women entrepreneurs setting up greenfield enterprises",
      "Facilitate at least one SC or ST and one woman borrower per bank branch",
    ],
    eligibility: [
      "Applicant must be from the SC/ST category or a woman, above 18 years of age",
      "Finance is provided only for greenfield enterprises — a first-time venture in manufacturing, services, trading or agri-allied activities",
    ],
    benefits: [
      "Composite loan, inclusive of term loan and working capital, above ₹10 lakh and up to ₹1 crore",
      "Repayable in 7 years with a maximum moratorium period of 18 months",
      "Handholding support through the Stand-Up India portal ecosystem",
    ],
    howToApply: [
      {
        title: "Confirm the greenfield condition",
        detail:
          "This must be a first venture in that activity for the borrower. An existing business expanding is not eligible — that is a different scheme.",
      },
      {
        title: "Assemble category and identity documentation",
        detail: "Caste certificate for SC/ST applicants, or the woman-promoter shareholding and control evidence.",
      },
      {
        title: "Build the project report and working-capital assessment",
        detail: "A composite loan means both term and working capital have to be justified in one file.",
      },
      {
        title: "Apply through the branch or the Stand-Up India portal",
        detail:
          "The branch-level obligation is your leverage. Ask directly how many Stand-Up India accounts the branch has opened this year.",
      },
      {
        title: "Follow through to disbursement",
        detail: "Sanction is not disbursement. Documentation, security creation and first drawdown all need chasing.",
      },
    ],
    caaSupport: [
      "Eligibility screen on the greenfield condition and promoter category before anything is filed",
      "CIBIL pull and remediation advice where the score will not carry the file",
      "Composite project report covering both term loan and working capital",
      "Branch selection, filing and a documented weekly follow-up cadence through to disbursement",
    ],
    caaServices: [
      { label: "Govt Scheme Loan Advisory", href: "/pricing#startup-services" },
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "MSME / Udyam Registration", href: "/services/msme-registration" },
    ],
    links: [
      {
        label: "Scheme details (PDF)",
        href: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2022/apr/doc20224535701.pdf",
      },
    ],
  },
  {
    slug: "venture-capital-fund-scheduled-castes",
    name: "Venture Capital Fund for Scheduled Castes",
    abbr: "VCF-SC",
    ministry: "Ministry of Social Justice & Empowerment",
    agency: "IFCI Venture Capital Funds Ltd",
    focus: "Startup-Relevant",
    support: "Equity",
    stages: ["Seed / Early Stage", "Growth / Scaling"],
    sectors: ["Sector Agnostic", "Manufacturing"],
    headline:
      "Concessional finance of ₹10 lakh to ₹15 crore at a 4% coupon for companies promoted by Scheduled Caste entrepreneurs.",
    amount: "₹10 lakh to ₹15 crore at 4% coupon · up to 75% of project cost below ₹5 crore, 50% above",
    timeline: "IFCI Venture appraisal cycle",
    whatIsThis:
      "A ₹750 crore social-sector venture fund managed by IFCI Venture Capital Funds, providing concessional finance to SC entrepreneurs. The 4% coupon makes it dramatically cheaper than any commercial alternative, and startups and units incubated in technology business incubators are explicitly within scope.",
    objectives: [
      "Provide concessional finance to Scheduled Caste entrepreneurs",
      "Create wealth and value for society while promoting profitable businesses",
    ],
    eligibility: [
      "Projects and units in manufacturing, services and allied sectors, including startups and units incubated in technology business incubators, with asset creation from the funds deployed",
      "For assistance up to ₹50 lakh: at least 51% shareholding by SC entrepreneurs for the past 6 months with management control",
      "For assistance above ₹50 lakh: at least 51% shareholding by SC entrepreneurs for the past 12 months with management control",
    ],
    benefits: [
      "Loans from ₹10 lakh to ₹15 crore at a 4% coupon rate",
      "Up to 75% of project cost funded for assistance up to ₹5 crore",
      "Up to 50% of project cost funded for assistance above ₹5 crore",
    ],
    howToApply: [
      {
        title: "Verify the shareholding-duration condition",
        detail:
          "51% SC shareholding must have been held for 6 or 12 months depending on ticket size. A recent restructuring resets that clock — plan ahead.",
      },
      {
        title: "Prepare a project report with asset creation demonstrated",
        detail: "The fund requires asset creation from deployed funds, so the project must be capital-forming, not purely operational.",
      },
      {
        title: "Apply online at vcfsc.in",
        detail: "Applications go to IFCI Venture Capital Funds through the VCF-SC portal.",
      },
      {
        title: "Arrange the balance funding",
        detail: "You fund 25% or 50% depending on ticket size. Document how.",
      },
    ],
    caaSupport: [
      "Shareholding and management-control review against the 6/12-month conditions, with restructuring planned in time",
      "CA-certified project report with the asset-creation case documented",
      "Balance-funding plan and financial projections",
      "Application filing, follow-up and post-sanction compliance",
    ],
    caaServices: [
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "Change in Directors / Shareholders", href: "/services/change-in-directors" },
    ],
    links: [
      { label: "VCF-SC", href: "https://vcfsc.in/index.html" },
      { label: "Apply online", href: "https://vcfsc.in/apply-online.html" },
    ],
  },
  {
    slug: "sti-hubs-sc-st",
    name: "STI Hubs for SC/ST Communities",
    abbr: "SC-STI",
    ministry: "Department of Science & Technology (DST)",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Ideation", "Seed / Early Stage"],
    sectors: ["Rural & Social", "Students & Academia"],
    headline:
      "Project grants to institutions and NGOs using science and technology to build livelihoods and enterprises in SC/ST communities.",
    amount: "Project-based; amount varies by sanctioned STI hub",
    timeline: "Against DST calls for proposals",
    whatIsThis:
      "STI Hubs fund local institutions, R&D labs and science-based voluntary organisations to intervene technologically in the livelihood systems of SC and ST communities — and to document, validate and conserve indigenous knowledge systems. It is a social-innovation instrument rather than a startup fund, but it finances enterprise development on the ground.",
    objectives: [
      "Capture the weakest linkages in the predominant livelihood systems of SC and ST communities and improve them through science and technology",
      "Harness, document, research, validate and conserve indigenous knowledge systems, skills and practices",
    ],
    eligibility: [
      "Local academic or S&T institutions, R&D labs, and S&T-based voluntary organisations and NGOs",
      "Applicant must have a majority SC or ST population in its catchment area",
    ],
    benefits: [
      "Financial support to establish an STI hub",
      "Support usable for equipment purchase, small infrastructure and common facility centres as per DST norms",
      "Technology deployment, training and enterprise support in the community",
    ],
    howToApply: [
      {
        title: "Establish the catchment condition",
        detail: "A majority SC or ST population in the catchment area is a stated eligibility requirement.",
      },
      {
        title: "Watch the DST calls for proposals",
        detail: "Applications are made against published calls on the DST website.",
      },
      {
        title: "Design the livelihood intervention",
        detail: "Proposals succeed when the technology intervention is specific to a documented livelihood gap, not generic.",
      },
    ],
    caaSupport: [
      "Section 8 or trust structuring and compliance for implementing organisations",
      "12A/80G registration and FCRA advisory where foreign contribution is involved",
      "Grant accounting, utilisation certificates and ITR-7 compliance",
      "Enterprise formalisation for the community businesses the hub creates",
    ],
    caaServices: [
      { label: "Section 8 Company (NGO)", href: "/services/section-8-company" },
      { label: "12A & 80G Registration", href: "/services/12a-80g-registration" },
    ],
    links: [
      {
        label: "DST — STI Hubs call for proposals",
        href: "https://dst.gov.in/callforproposals/science-technology-and-innovation-sti-hubs-development-scheduled-caste-sc-and",
      },
    ],
  },

  // ── Other regulators and departments ──────────────────────────────────────
  {
    slug: "ifsca-fintech-incentive-scheme",
    name: "IFSCA Fintech Incentive Scheme",
    ministry: "International Financial Services Centres Authority (IFSCA)",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Prototype / PoC", "Seed / Early Stage"],
    sectors: ["Fintech"],
    headline:
      "Grants of up to ₹75 lakh for fintechs building at GIFT IFSC — sandbox, PoC, listing, accelerator and green fintech windows.",
    amount: "Startup grant up to ₹15 lakh · PoC up to ₹50 lakh · sandbox up to ₹30 lakh · green fintech up to ₹75 lakh",
    timeline: "Rolling, per IFSCA's application process",
    whatIsThis:
      "IFSCA's Fintech Incentive Scheme is built to make GIFT City a genuine fintech hub, and it is unusually generous for a regulator-run programme. Five separate grant categories cover the fintech journey from idea to market — and the Green FinTech Grant at ₹75 lakh is the largest single fintech grant available in India.",
    objectives: [
      "Promote establishment of a world-class FinTech hub at GIFT International Financial Services Centre",
      "Provide financial support to eligible fintech entities",
      "Enable startups with a novel fintech idea to convert it into a minimum viable product and go to market",
    ],
    eligibility: [
      "FinTech startups with a novel FinTech idea or solution, focused on converting that idea into a minimum viable product",
      "Indian and foreign fintech entities, startups and accelerators operating in or engaging with GIFT IFSC",
    ],
    benefits: [
      "FinTech Startup Grant of up to ₹15 lakh",
      "Proof of Concept grant of up to ₹50 lakh",
      "Sandbox grant of up to ₹30 lakh",
      "Green FinTech Grant of up to ₹75 lakh",
      "Accelerator Grant of up to ₹10 lakh for accelerators",
    ],
    howToApply: [
      {
        title: "Decide your relationship with GIFT IFSC",
        detail:
          "The scheme supports both entities operating in the IFSC and those engaging with it. The route you choose has regulatory and tax consequences — settle it before applying.",
      },
      {
        title: "Map to the right grant category",
        detail:
          "Startup grant, PoC, sandbox, green fintech or accelerator. They are separate applications with different evidentiary requirements.",
      },
      {
        title: "Prepare the regulatory case",
        detail:
          "Fintech applications are assessed by a financial-services regulator. Compliance architecture, data handling and consumer-protection design carry real weight.",
      },
      {
        title: "Apply per IFSCA's published process",
        detail: "Details are at ifsca.gov.in under How To Apply.",
      },
    ],
    caaSupport: [
      "IFSC entity structuring and the tax and regulatory analysis of operating at GIFT City",
      "Grant category mapping and application preparation",
      "Regulatory compliance architecture — the part fintech applications are actually judged on",
      "Grant accounting, utilisation reporting and ongoing statutory compliance",
    ],
    caaServices: [
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
      { label: "Virtual CFO Services", href: "/services/virtual-cfo" },
    ],
    links: [
      { label: "IFSCA — FinTech", href: "https://ifsca.gov.in/Pages/Contents/FinTech" },
      {
        label: "Fintech Incentive Scheme (PDF)",
        href: "https://ifsca.gov.in/Document/Developments/29-ifsca-fintech-incentive-scheme-202225042022010125.pdf",
      },
    ],
  },
  {
    slug: "dae-technology-incubation-centres",
    name: "Technology Development-cum-Incubation Centres",
    ministry: "Department of Atomic Energy",
    focus: "Startup-Relevant",
    support: "Incubation",
    stages: ["Prototype / PoC", "Seed / Early Stage"],
    sectors: ["Deep Tech", "Manufacturing", "Energy & Power"],
    headline:
      "Access to DAE research facilities, spin-off technologies and scientist mentoring to turn nuclear-sector know-how into products.",
    amount: "No standard grant; support is incubation and technology-access based",
    timeline: "Through calls for proposals at individual centres",
    whatIsThis:
      "DAE has technology it cannot commercialise itself, and startups have the commercial capability it lacks. These centres bridge that — offering prototyping facilities, test beds, pilot implementation and scientist mentoring, plus licensing of DAE spin-off technologies. For a hard-tech startup, access to national-lab instrumentation is worth more than a modest grant.",
    objectives: [
      "Link India's startup ecosystem to the nuclear sector",
      "Foster synergy between research facilities and tech entrepreneurs",
      "Foster nucleation, incubation and growth of startups based on DAE technologies and available know-how",
    ],
    eligibility: [
      "Startups, MSMEs and industries with robust proposals based on sound original ideas",
    ],
    benefits: [
      "Infrastructure and value-added services — prototyping facilities, test beds and pilot implementation",
      "A network of mentors providing sector-specific knowledge and real-world guidance",
      "Access to DAE spin-off technologies for licensing and commercialisation",
    ],
    howToApply: [
      {
        title: "Identify the nearest DAE incubation centre",
        detail:
          "Centres operate at DAE units such as IGCAR. Each publishes its own calls for proposals and benefits.",
      },
      {
        title: "Submit a proposal with an expression of interest",
        detail:
          "At IGCAR, for instance, applicants submit their proposal and EoI for incubation of the technology to the Head of the Incubation Centre.",
      },
      {
        title: "Negotiate the technology transfer terms",
        detail: "Where you are licensing a DAE technology, the licence terms and royalty structure are the commercial core of the deal.",
      },
    ],
    caaSupport: [
      "Technology transfer and licensing agreement review — royalty, field of use, exclusivity and territory",
      "Entity structuring capable of holding and sub-licensing the technology",
      "IP strategy on improvements you create on top of the licensed technology",
      "Compliance base for a hard-tech manufacturing business",
    ],
    caaServices: [
      { label: "Patent Registration", href: "/services/patent-registration" },
      { label: "Private Limited Company Registration", href: "/services/private-limited-company" },
    ],
    links: [
      { label: "IGCAR incubation", href: "https://www.igcar.gov.in/incubation.html" },
      { label: "DAE — technology development-cum-incubation centres", href: "https://dae.gov.in/video/dae-launches-technology-development-cum-incubation-centres/" },
    ],
  },
  {
    slug: "mahir",
    name: "Mission on Advanced and High-Impact Research",
    abbr: "MAHIR",
    ministry: "Ministry of Power & Ministry of New and Renewable Energy",
    agency: "Central Power Research Institute",
    focus: "Startup-Relevant",
    support: "Grant",
    stages: ["Prototype / PoC", "Growth / Scaling"],
    sectors: ["Energy & Power", "Deep Tech"],
    headline:
      "R&D funding and pilot support for emerging power-sector technologies — carbon capture, green hydrogen, geothermal and next-generation storage.",
    amount: "Project-based; funded through pooled MoP, MNRE and CPSE resources",
    timeline: "Against published calls for proposals",
    whatIsThis:
      "MAHIR is a joint national mission of the Ministry of Power and MNRE to identify emerging power-sector technologies and fund their indigenous research, development and demonstration at scale. It names its focus areas explicitly, which makes fit easy to assess: carbon capture and utilisation, green hydrogen for mobility, AI and automation in the power ecosystem, geothermal energy, and alternatives to lithium-ion storage.",
    objectives: [
      "Identify emerging technologies in the power sector",
      "Facilitate indigenous research, development and demonstration of those technologies at scale",
      "Enable deployment within and outside India",
    ],
    eligibility: [
      "Academia, industry, startups and R&D institutions",
      "Working in carbon capture and utilisation, green hydrogen for mobility including high-efficiency fuel cells, automation and artificial intelligence in the power ecosystem, geothermal energy, or alternatives to lithium-ion storage batteries",
    ],
    benefits: [
      "Financial support determined by project nature, budget requirement, infrastructure needs and research area",
      "R&D project funding, pilot support and commercialisation facilitation",
      "Access to the CPRI and power-sector CPSE ecosystem for demonstration",
    ],
    howToApply: [
      {
        title: "Match to one of the five named technology areas",
        detail: "MAHIR's focus list is specific. Work outside it will not be considered, however good.",
      },
      {
        title: "Track the CPRI calls for proposals",
        detail: "Calls are published by the Central Power Research Institute.",
      },
      {
        title: "Structure the demonstration plan",
        detail:
          "MAHIR emphasises demonstration at scale. A proposal that ends at lab validation is weaker than one with a utility or CPSE demonstration partner lined up.",
      },
      {
        title: "Deliver against project milestones",
        detail: "Milestone-based release with technical review.",
      },
    ],
    caaSupport: [
      "Fit assessment against the five named technology areas before you invest in a proposal",
      "Project budgeting, financial projections and the counterpart-funding case",
      "Demonstration-partner agreements with utilities and CPSEs",
      "Grant accounting, utilisation certificates and project audit",
    ],
    caaServices: [
      { label: "CA-Certified Project Report / DPR", href: "/contact" },
      { label: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    ],
    links: [
      { label: "CPRI — MAHIR", href: "https://cpri.res.in/en/content/mahir" },
      {
        label: "MAHIR call for proposals (PDF)",
        href: "https://cpri.res.in/sites/default/files/MAHIR_Call%20for%20proposals.pdf",
      },
    ],
  },
];
