// ─────────────────────────────────────────────────────────────────────────────
// Short "quick answers" shown near the foot of a page, one per search phrase
// people use for that page (Semrush keyword gap, 27 Nov 2026). Each question
// uses the searcher's own words. Answers point to what the page offers and
// deliberately carry no statutory figure, date, threshold or rate — those
// live in the reviewed page copy, not here.
// Keyed by the page path. Rendered by <SearchQA path="..." />.
// ─────────────────────────────────────────────────────────────────────────────

export interface SearchQaItem {
  q: string;
  a: string;
  /** Optional internal link shown after the answer. */
  link?: { label: string; href: string };
}

export const SEARCH_QA: Record<string, SearchQaItem[]> = {
  // ── Company formation ───────────────────────────────────────────────────
  "/services/private-limited-company": [
    { q: "How does online company registration work?", a: "Online company registration is done fully on the MCA portal. You share documents with us, we prepare and file the forms, and the certificate of incorporation is issued online — no office visit needed." },
    { q: "What is the pvt ltd company registration cost?", a: "The pvt ltd company registration cost has two parts: government fees and stamp duty (which depend on your state and capital) and our professional fee. The fee section and calculator on this page show the full break-up." },
    { q: "What are the pvt ltd company registration fees for a small company?", a: "Pvt ltd company registration fees are lowest when authorised capital is small. Use the cost calculator on this page to see government fees, stamp duty and our fee for your exact case." },
    { q: "Can I do company registration in India from another state or abroad?", a: "Yes. Company registration in India is fully online, so directors can sign digitally from anywhere. A registered office address in India is needed." },
    { q: "Is pvt ltd company registration the same as company incorporation?", a: "Yes. Pvt ltd company registration and company incorporation mean the same thing: forming a private limited company with the Registrar of Companies." },
  ],
  "/services/private-limited-company-registration-delhi": [
    { q: "How do I get company registration in Delhi?", a: "Company registration in Delhi is done online with the Registrar of Companies for Delhi. Share your documents and a Delhi office address, and we handle the filing end to end." },
    { q: "Is private limited company registration in Delhi different from other states?", a: "The process for private limited company registration in Delhi is the same as elsewhere. Only the stamp duty, which follows Delhi's rates, and the RoC office differ." },
  ],
  "/services/llp-registration": [
    { q: "What are the LLP registration fees?", a: "LLP registration fees include government fees, stamp duty on the LLP agreement and our professional fee. The calculator on this page shows the full break-up for your state and contribution." },
    { q: "Documents required for LLP registration: what are they?", a: "The documents required for LLP registration are listed in the Documents Required section above: ID and address proof of partners, photos, and proof of the registered office." },
    { q: "Is LLP company registration the same as LLP registration?", a: "Yes. People often say LLP company registration, but an LLP is not a company. It is registered as a Limited Liability Partnership with the MCA." },
    { q: "Certificate of incorporation LLP: what is it?", a: "The certificate of incorporation is the document the MCA issues when your LLP is registered. It shows the LLP's name, LLPIN and date of incorporation." },
    { q: "Who is a designated partner in LLP?", a: "A designated partner in an LLP is a partner who is responsible for the LLP's legal compliance and filings. Every LLP needs designated partners with a DPIN." },
  ],
  "/services/one-person-company": [
    { q: "How to register one person company?", a: "To register a one person company, you need a DSC, a name approval and the incorporation forms filed with the MCA. We handle each step online — see the process section above." },
    { q: "What is the OPC registration process?", a: "OPC registration follows the same online MCA process as a private limited company, with one member and a nominee. The steps are shown in the process section on this page." },
    { q: "What are the OPC registration fees?", a: "OPC registration fees cover government fees, stamp duty and our professional fee. The pricing section above shows what is included." },
    { q: "What is an OPC company?", a: "An OPC company (One Person Company) is a company with a single owner that still gives limited liability, like a private limited company." },
    { q: "Is an OPC private limited a private company?", a: "An OPC is registered as an 'OPC Private Limited' company. It is a private company with one member instead of two or more." },
    { q: "Documents required for OPC registration: what are they?", a: "The documents required for OPC registration are ID and address proof of the owner and nominee, photos and registered office proof. See the documents section above." },
  ],
  "/services/partnership-firm": [
    { q: "What is firm registration?", a: "Firm registration means registering a partnership firm with the Registrar of Firms in your state, using a signed partnership deed." },
    { q: "How does partnership deed registration work?", a: "For partnership deed registration, the deed is printed on stamp paper, signed by all partners and filed with the Registrar of Firms along with the registration form." },
    { q: "What are the partnership firm registration fees?", a: "Partnership firm registration fees include stamp duty and registrar fees for your state, plus our fee for drafting and filing. The pricing section above shows the details." },
    { q: "Can you do partnership firm registration in Delhi?", a: "Yes. We handle partnership firm registration in Delhi and other states, from drafting the deed to filing with the Registrar of Firms." },
  ],
  "/services/sole-proprietorship": [
    { q: "How does sole proprietorship registration work?", a: "There is no single sole proprietorship registration. A proprietor proves the business through registrations like Udyam, GST or Shops & Establishment — we help you pick and file the right ones." },
  ],
  "/services/section-8-company": [
    { q: "How do I do NGO registration?", a: "NGO registration can be done as a Section 8 company, a trust or a society. This page covers Section 8 company registration, which is preferred by many funders." },
    { q: "What is section 8 company registration?", a: "Section 8 company registration forms a non-profit company under the Companies Act, 2013, with a licence from the Central Government." },
  ],
  "/services/company-closure": [
    { q: "What does winding up of a company mean?", a: "Winding up of a company means closing it down legally. Small inactive companies often use the simpler strike off route, which this page explains." },
  ],
  "/services/partnership-to-llp": [
    { q: "How does conversion of partnership firm into LLP work?", a: "Conversion of partnership firm into LLP is done by filing the conversion form with the MCA. The firm's assets, liabilities and partners move to the new LLP." },
  ],

  // ── GST ─────────────────────────────────────────────────────────────────
  "/services/gst-registration": [
    { q: "How to apply for GST number?", a: "To apply for a GST number, you file the GST REG-01 application on the GST portal with your PAN, address proof and bank details. We prepare and file it for you." },
    { q: "Can I do GST apply online myself?", a: "Yes, GST apply online is open to anyone on the GST portal. Mistakes in documents cause most rejections, so many businesses let us file it." },
    { q: "How does online GST registration work?", a: "Online GST registration is fully paperless: application on the GST portal, Aadhaar authentication, and the GSTIN certificate issued online." },
    { q: "What are the GST registration documents?", a: "The main GST registration documents are PAN, ID and address proof of the owner or directors, proof of business address and bank details. The full list is in the documents section above." },
  ],
  "/calculators/gst-registration-cost-calculator": [
    { q: "What are the GST registration fees?", a: "The government does not charge GST registration fees on the GST portal. What you pay is a professional fee if you use a consultant — this calculator shows ours." },
    { q: "Are new GST registration fees different from amendment fees?", a: "New GST registration fees and amendment fees are both professional fees; the portal itself is free. Use the calculator to compare." },
    { q: "What are typical GST registration charges?", a: "GST registration charges depend on the business type and how much help you need. The calculator above shows our charges for each case." },
  ],
  "/services/gst-filing": [
    { q: "What are your GST filing charges?", a: "Our GST filing charges depend on how many invoices you have and how often you file. The pricing section above shows the plans." },
    { q: "Which GST filing services do you offer?", a: "Our GST filing services cover GSTR-1, GSTR-3B, reconciliation and the GST annual return." },
    { q: "Do you file the GST annual return?", a: "Yes. We prepare and file the GST annual return and reconcile it with your books before filing." },
  ],

  // ── Trademark ───────────────────────────────────────────────────────────
  "/services/trademark-registration": [
    { q: "How does trademark registration online work?", a: "Trademark registration online is done on the IP India portal. We search your mark, pick the right class and file the application for you." },
    { q: "What are the trademark registration fees?", a: "Trademark registration fees include the government fee per class (lower for individuals, startups and MSMEs) and our professional fee. The pricing section above shows both." },
    { q: "What is a trademark application?", a: "A trademark application is the request you file with the Trade Marks Registry to register your brand name or logo in one or more classes." },
    { q: "What is the trademark registration process?", a: "The trademark registration process is: search, file the application, examination, publication in the journal, and registration. Each step is explained above." },
  ],
  "/services/trademark-registration-delhi": [
    { q: "Do you handle trademark registration in Delhi?", a: "Yes. We handle trademark registration in Delhi from our Janakpuri office, and online for clients anywhere in India." },
  ],

  // ── Licences & registrations ────────────────────────────────────────────
  "/services/fssai-license": [
    { q: "What is food license registration?", a: "Food license registration is the FSSAI registration or licence every food business needs. The type depends on your turnover and activity." },
    { q: "How does FSSAI license registration work?", a: "FSSAI license registration is filed online on the FoSCoS portal. We check which licence you need, prepare documents and file it." },
  ],
  "/services/pf-registration": [
    { q: "What is the PF registration process?", a: "The PF registration process is done online on the EPFO portal. The employer registers the establishment and then adds employees to get their UAN." },
    { q: "Do you help with PF registration?", a: "Yes. We handle PF registration, UAN generation for employees and monthly ECR filing." },
  ],
  "/services/esic-registration": [
    { q: "Do you handle ESI return filing?", a: "Yes. Along with ESIC registration, we handle monthly ESI contributions and ESI return filing." },
  ],
  "/services/msme-registration": [
    { q: "Is Udyam Aadhaar registration the same as Udyam registration?", a: "Yes. Udyam Aadhaar registration is the older name; the current registration is called Udyam registration and gives an MSME certificate." },
  ],
  "/services/startup-india": [
    { q: "How do I get a Startup India certificate?", a: "You get a Startup India certificate by applying for DPIIT recognition on the Startup India portal. We check eligibility and prepare the application." },
    { q: "What is DPIIT startup registration?", a: "DPIIT startup registration is the official recognition of your business as a startup by the Department for Promotion of Industry and Internal Trade." },
    { q: "Are there Startup India registration fees?", a: "The government does not charge Startup India registration fees. You pay only our professional fee if you want help with the application." },
    { q: "What is a startup in India?", a: "A startup in India, for DPIIT purposes, is a young company, LLP or registered partnership working on innovation or a scalable business model. The eligibility section above has the details." },
  ],
  "/services/iec-registration": [
    { q: "How to do IEC code apply?", a: "To apply for an IEC code, you file the application on the DGFT portal with PAN, address proof and bank details. We prepare and file it for you." },
    { q: "Can I do IEC code registration online?", a: "Yes. IEC code registration is fully online on the DGFT portal." },
    { q: "How do I do an IEC code search?", a: "You can do an IEC code search on the DGFT portal using the IEC number. We can also check an IEC for you." },
  ],

  // ── Compliance ──────────────────────────────────────────────────────────
  "/services/roc-compliance": [
    { q: "What is compliance for private limited company?", a: "Compliance for private limited company covers board meetings, the AGM, annual ROC filings, director KYC and accounts. This page lists each filing." },
    { q: "What does annual compliance for private limited company include?", a: "Annual compliance for private limited company includes the financial statements filing, the annual return, the auditor's appointment, the AGM and director KYC." },
    { q: "Do you offer company compliance services?", a: "Yes. Our company compliance services cover every yearly ROC filing and board and AGM paperwork." },
    { q: "What is the annual return of a company?", a: "The annual return is the yearly ROC filing that reports a company's shareholders, directors and other details as at the year end." },
    { q: "When is the ROC annual filing due date?", a: "The ROC annual filing due date depends on your AGM date. See the due dates section above, or ask us to check your company." },
    { q: "Do you handle DPT-3 filing?", a: "Yes. We prepare and file DPT-3 for companies that need to report deposits or outstanding loans." },
  ],
  "/services/llp-annual-filing": [
    { q: "What is the LLP Form 8 due date?", a: "The LLP Form 8 due date is set by the MCA each year and can be extended. The due date section above shows the current one, or ask us to confirm." },
  ],
  "/services/director-kyc": [
    { q: "What is the DIR-3 KYC due date?", a: "The DIR-3 KYC due date is set by the MCA each year. See the due date section above, or ask us to check your DIN status." },
    { q: "How to apply for digital signature certificate online?", a: "You apply for a digital signature certificate online through a licensed certifying authority, with video or Aadhaar verification. We arrange DSCs for directors as part of our filings." },
    { q: "What are digital signature charges?", a: "Digital signature charges depend on the DSC class and validity. We quote them with your filing so there are no surprises." },
  ],
  "/services/income-tax-return": [
    { q: "Do you file the income tax return for LLP?", a: "Yes. We prepare the accounts, the tax audit if needed, and the income tax return for LLP clients." },
    { q: "What is the LLP ITR filing due date?", a: "The LLP ITR filing due date depends on whether the LLP needs a tax audit, and it can be extended. Ask us to confirm the date for your LLP." },
  ],
  "/services/tds-return": [
    { q: "What is the TDS refund process?", a: "The TDS refund process depends on who is claiming it: the person whose tax was deducted claims it in their income tax return. We help with both returns and claims." },
    { q: "How does TDS challan correction work?", a: "TDS challan correction is done online through the bank or the TRACES portal, depending on what needs changing. We check and file corrections for you." },
  ],

  // ── Verification tools ──────────────────────────────────────────────────
  "/verify/company-name-search": [
    { q: "How do I do an MCA company search?", a: "Type the company name in the search box above. This MCA company search checks names against the MCA registry for free." },
    { q: "How does the MCA name check work?", a: "The MCA name check above compares your proposed name with registered companies and LLPs and flags close matches." },
    { q: "Can I check company name availability before applying?", a: "Yes. Use the search above to check company name availability before you file the name application." },
    { q: "Is this a company name check for LLPs too?", a: "Yes. The company name check covers both companies and LLPs." },
    { q: "Is this the same as an MCA company check?", a: "Yes. The MCA company check, ROC company search and MCA portal company search all look up the same MCA registry used here." },
    { q: "Can I do a ROC company search here?", a: "Yes. A ROC company search is the same as an MCA company search. Type the name above." },
    { q: "Is this like the MCA portal company search?", a: "Yes. It searches the same MCA registry as the MCA portal company search, without logging in." },
    { q: "How do I do a company registration check?", a: "For a company registration check, search the name above or use the CIN number check if you have the CIN." , link: { label: "CIN number check", href: "/verify/cin-search" } },
    { q: "Is this an MCA company name check?", a: "Yes. It is a free MCA company name check for new and existing names." },
  ],
  "/verify/cin-search": [
    { q: "How do I do an MCA CIN search?", a: "Enter the CIN in the tool above. This MCA CIN search shows the company's status and details from the MCA registry." },
    { q: "Can I do an MCA company name search by CIN?", a: "Yes. An MCA company name search by CIN shows the registered name for that CIN, along with status and address." },
    { q: "How to check company details by CIN number?", a: "To check company details by CIN number, type the CIN above and press Verify." },
    { q: "How do I check annual filing status?", a: "To check annual filing status, look up the company by CIN here for its status, then ask us to review its MCA filings in detail." },
    { q: "Where can I see MCA annual filing status?", a: "MCA annual filing status is on the company's MCA master data. Start with the CIN check above, and we can review the full filing history for you." },
  ],
  "/verify/din-search": [
    { q: "Can I do a DIN number search by name?", a: "The tool searches by DIN, not by name. For a DIN number search by name, first find the company with our company name search, then use the director's DIN." , link: { label: "Company name search", href: "/verify/company-name-search" } },
    { q: "How does a company director search work?", a: "A company director search here uses the DIN. Enter it above to see the director's companies and LLPs." },
  ],
  "/verify/pan-verification": [
    { q: "How does online PAN verification work?", a: "Online PAN verification checks a PAN against the name and date of birth you enter, with consent. Use the tool above." },
    { q: "How do I verify a PAN number?", a: "To verify a PAN number, enter the PAN, name and date of birth above and press Verify." },
  ],
  "/verify/trademark-search": [
    { q: "Is trademark search free?", a: "Yes. Trademark search on the IP India public search is free. You log in with an OTP sent to your email or mobile." },
    { q: "How do I check trademark status?", a: "To check trademark status, search your application number on the IP India e-register, as shown in the steps above." },
    { q: "How often should I check trademark status?", a: "Check trademark status every few weeks after filing, and soon after any email from the Registry, so you do not miss a reply deadline." },
    { q: "Is a trademark availability check the same as a trademark search?", a: "Yes. A trademark availability check is a trademark search in your class to see if a similar mark is already filed." },
    { q: "Where is the trademark certificate download?", a: "The trademark certificate download is in the documents of your application on the IP India e-register, once the mark is registered." },
  ],
  "/verify/trademark-class-finder": [
    { q: "Where can I see the trademark class list?", a: "The trademark class list has 45 classes: 1 to 34 for goods and 35 to 45 for services. Search your business above to find the right one." },
    { q: "What does trademark class 35 cover?", a: "Trademark class 35 covers business services such as advertising, retail and wholesale services, and business management." },
  ],

  // ── Calculators ─────────────────────────────────────────────────────────
  "/calculators/hra-calculator": [
    { q: "How does this HRA calculation calculator work?", a: "This HRA calculation calculator takes your basic salary, HRA received and rent paid, and shows the exempt and taxable HRA." },
  ],
  "/calculators/salary-calculator": [
    { q: "Is this a salary break up calculator?", a: "Yes. This salary break up calculator splits your CTC into basic, allowances and deductions." },
    { q: "Is this a CTC in hand calculator?", a: "Yes. It works as a CTC in hand calculator, showing your monthly take-home pay from your CTC." },
  ],
  "/calculators/income-tax-calculator": [
    { q: "Do you have an income tax calculator 2024-25?", a: "This calculator covers the current year. For an income tax calculator for 2024-25 or another past year, ask us and we will work it out for you." },
    { q: "Is this the tax calculator 2025-26?", a: "Yes. This is the tax calculator for 2025-26, comparing the old and new regimes." },
  ],
  "/calculators/tds-rate-finder": [
    { q: "Where is the TDS rate chart for FY 2023-24?", a: "This finder shows current TDS rates. For the TDS rate chart for FY 2023-24 or another past year, ask us to confirm the rate for your payment." },
    { q: "What is the TDS slab for FY 2024-25?", a: "TDS works by section and payment type rather than slabs. For the TDS slab for FY 2024-25, search your payment type above or ask us." },
  ],

  // ── Templates ───────────────────────────────────────────────────────────
  "/templates/noc-letter": [
    { q: "What is a no objection certificate format?", a: "A no objection certificate format is a letter in which the owner of a premises confirms they have no objection to a business using it. The template above is ready to copy." },
    { q: "Which NOC format is used for GST registration?", a: "For GST registration, use the NOC format above from the property owner, along with the owner's proof of ownership." },
  ],
  "/templates/gst-tax-invoice": [
    { q: "Is this a simple GST bill format?", a: "Yes. This is a simple GST bill format with all the fields a tax invoice needs. Copy or download it above." },
    { q: "Can I get this GST invoice format PDF?", a: "Yes. Fill in the GST invoice format above and print it or save it as PDF from your browser." },
  ],
  "/templates/salary-slip": [
    { q: "Where can I get a monthly salary slip format free download PDF?", a: "Use the monthly salary slip format above. Fill it in and save it as PDF from your browser — free to download." },
  ],
  "/templates/partnership-deed": [
    { q: "Is there a partnership deed format in Word?", a: "Yes. Copy the partnership deed format above into Word or Google Docs and edit it there." },
  ],
  "/templates/agm-notice": [
    { q: "What is an annual general meeting?", a: "An annual general meeting is the yearly meeting of a company's members to adopt the accounts and decide on the auditor and directors. The notice above is ready to adapt." },
  ],
  "/templates/gift-deed": [
    { q: "What is a gift deed format?", a: "A gift deed format is the written deed used to gift property or money to someone. The template above is ready to adapt; have it reviewed and stamped before signing." },
  ],

  // ── Startup schemes / blog ──────────────────────────────────────────────
  "/startup-schemes": [
    { q: "Startup funding India: what does the government offer?", a: "Startup funding in India from the government includes seed funds, fund of funds, credit guarantees and grants. This directory lists each scheme." },
  ],
  "/blog/llp-registration-process-cost": [
    { q: "What is the LLP registration process?", a: "The LLP registration process is: DSC and DPIN for partners, name reservation, incorporation filing and the LLP agreement. Each step is explained above." , link: { label: "LLP registration service", href: "/services/llp-registration" } },
    { q: "What is the LLP formation process?", a: "The LLP formation process is the same as LLP registration: get DSCs, reserve the name, file incorporation and then the LLP agreement." },
  ],
};
