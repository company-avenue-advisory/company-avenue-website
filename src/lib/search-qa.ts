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
    { q: "What is company registration?", a: "Company registration is forming a company with the Registrar of Companies on the MCA portal. This page covers private limited companies." },
    { q: "What is a pvt ltd company?", a: "A pvt ltd company is a private limited company: a separate legal entity owned by shareholders with limited liability." },
    { q: "How do I register a company?", a: "To register a company, you need DSCs, a name approval and the SPICe+ incorporation forms on the MCA portal. We do it all online." },
    { q: "Is private company registration the same as pvt ltd registration?", a: "Yes. Private company registration, pvt company registration and pvt ltd registration all mean registering a private limited company." },
    { q: "What is pvt company registration?", a: "Pvt company registration means forming a private limited company with the MCA." },
    { q: "What is a pvt company?", a: "A pvt company is a private limited company, owned by its shareholders with limited liability." },
    { q: "How does pvt ltd registration work?", a: "Pvt ltd registration is done online with the MCA through the SPICe+ form, after name approval and DSCs." },
    { q: "What is MCA company registration?", a: "MCA company registration is registering your company with the Ministry of Corporate Affairs through its portal." },
    { q: "Is a pvt ltd company in India good for startups?", a: "A pvt ltd company in India is the most common choice for startups that plan to raise investment." },
    { q: "What are the pvt ltd company registration govt fees?", a: "Pvt ltd company registration govt fees depend on your capital and state. The calculator on this page shows them." },
    { q: "What is an Inc company in India?", a: "In India, 'Inc' is not used. The equivalent of an Inc company in India is a private limited company." },
    { q: "How does business registration in India work?", a: "Business registration in India depends on the structure: company, LLP, partnership or proprietorship. This page covers companies." },
    { q: "Can I register business online?", a: "Yes. You can register business online in India; company registration is fully online with the MCA." },
    { q: "Can you do company registration in Bangalore?", a: "Yes. Company registration in Bangalore is online with the RoC for Karnataka, and we handle it from Delhi end to end." },
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
    { q: "What is a designated partner meaning in LLP law?", a: "The designated partner meaning: a partner responsible for the LLP's filings and legal compliance." },
    { q: "How do I choose an LLP company name?", a: "Your LLP company name must be unique and end with 'LLP'. Check it on our name search before applying.", link: { label: "Name search", href: "/verify/company-name-search" } },
    { q: "What is the LLP incorporation procedure?", a: "The LLP incorporation procedure is: DSCs, name reservation, the FiLLiP incorporation form and then the LLP agreement." },
    { q: "What are the LLP registration fees?", a: "LLP registration fees include government fees, stamp duty on the LLP agreement and our professional fee. The calculator on this page shows the full break-up for your state and contribution." },
    { q: "Documents required for LLP registration: what are they?", a: "The documents required for LLP registration are listed in the Documents Required section above: ID and address proof of partners, photos, and proof of the registered office." },
    { q: "Is LLP company registration the same as LLP registration?", a: "Yes. People often say LLP company registration, but an LLP is not a company. It is registered as a Limited Liability Partnership with the MCA." },
    { q: "Certificate of incorporation LLP: what is it?", a: "The certificate of incorporation is the document the MCA issues when your LLP is registered. It shows the LLP's name, LLPIN and date of incorporation." },
    { q: "Who is a designated partner in LLP?", a: "A designated partner in an LLP is a partner who is responsible for the LLP's legal compliance and filings. Every LLP needs designated partners with a DPIN." },
  ],
  "/services/one-person-company": [
    { q: "Is OPC pvt ltd the same as OPC private limited?", a: "Yes. OPC pvt ltd and OPC private limited are the same: a one person company." },
    { q: "How to register one person company?", a: "To register a one person company, you need a DSC, a name approval and the incorporation forms filed with the MCA. We handle each step online — see the process section above." },
    { q: "What is the OPC registration process?", a: "OPC registration follows the same online MCA process as a private limited company, with one member and a nominee. The steps are shown in the process section on this page." },
    { q: "What are the OPC registration fees?", a: "OPC registration fees cover government fees, stamp duty and our professional fee. The pricing section above shows what is included." },
    { q: "What is an OPC company?", a: "An OPC company (One Person Company) is a company with a single owner that still gives limited liability, like a private limited company." },
    { q: "Is an OPC private limited a private company?", a: "An OPC is registered as an 'OPC Private Limited' company. It is a private company with one member instead of two or more." },
    { q: "Documents required for OPC registration: what are they?", a: "The documents required for OPC registration are ID and address proof of the owner and nominee, photos and registered office proof. See the documents section above." },
  ],
  "/services/partnership-firm": [
    { q: "How does partnership registration work?", a: "Partnership registration is filing the signed partnership deed with the Registrar of Firms in your state." },
    { q: "What is a partnership registration certificate?", a: "The partnership registration certificate is issued by the Registrar of Firms when the firm is registered." },
    { q: "What is the firm registration procedure?", a: "The firm registration procedure is: draft the deed, sign it on stamp paper and file it with the Registrar of Firms." },
    { q: "What is firm registration?", a: "Firm registration means registering a partnership firm with the Registrar of Firms in your state, using a signed partnership deed." },
    { q: "How does partnership deed registration work?", a: "For partnership deed registration, the deed is printed on stamp paper, signed by all partners and filed with the Registrar of Firms along with the registration form.", link: { label: "Free partnership deed format", href: "/templates/partnership-deed" } },
    { q: "What are the partnership firm registration fees?", a: "Partnership firm registration fees include stamp duty and registrar fees for your state, plus our fee for drafting and filing. The pricing section above shows the details." },
    { q: "Can you do partnership firm registration in Delhi?", a: "Yes. We handle partnership firm registration in Delhi and other states, from drafting the deed to filing with the Registrar of Firms." },
  ],
  "/services/sole-proprietorship": [
    { q: "What is a proprietor company?", a: "A 'proprietor company' usually means a sole proprietorship: a business owned by one person, not a company." },
    { q: "How does proprietorship registration work?", a: "Proprietorship registration is done through Udyam, GST or Shops & Establishment registration in the owner's name." },
    { q: "How does sole proprietorship registration work?", a: "There is no single sole proprietorship registration. A proprietor proves the business through registrations like Udyam, GST or Shops & Establishment — we help you pick and file the right ones." },
  ],
  "/services/section-8-company": [
    { q: "How does NGO registration online work?", a: "NGO registration online as a Section 8 company is done on the MCA portal. We file it for you." },
    { q: "What is section 8 of companies act?", a: "Section 8 of the Companies Act, 2013 lets a company be formed for charity, education, social welfare and similar purposes, without paying profits to members." },
    { q: "What is DARPAN ID verification?", a: "DARPAN ID verification is the NGO Darpan registration on NITI Aayog's portal, often needed for government grants. We help NGOs register." },
    { q: "What is the trust registration process?", a: "The trust registration process is registering a trust deed with the local sub-registrar. Many NGOs choose a Section 8 company instead; we can advise." },
    { q: "How do I do NGO registration?", a: "NGO registration can be done as a Section 8 company, a trust or a society. This page covers Section 8 company registration, which is preferred by many funders." },
    { q: "What is section 8 company registration?", a: "Section 8 company registration forms a non-profit company under the Companies Act, 2013, with a licence from the Central Government." },
  ],
  "/services/company-closure": [
    { q: "What is strike off?", a: "Strike off is removing a company's name from the register of companies, which closes it. It suits companies that are no longer running." },
    { q: "How does strike off company work?", a: "To strike off company records, the company files STK-2 with the MCA after clearing its dues. We handle the whole process." },
    { q: "What does winding up of a company mean?", a: "Winding up of a company means closing it down legally. Small inactive companies often use the simpler strike off route, which this page explains." },
  ],
  "/services/partnership-to-llp": [
    { q: "How does conversion of partnership firm into LLP work?", a: "Conversion of partnership firm into LLP is done by filing the conversion form with the MCA. The firm's assets, liabilities and partners move to the new LLP." },
  ],

  // ── GST ─────────────────────────────────────────────────────────────────
  "/services/gst-registration": [
    { q: "What is the list of documents for GST registration?", a: "The list of documents for GST registration is PAN, ID and address proof of owners, business address proof and bank details. See the documents section above." },
    { q: "What are the GST apply documents?", a: "GST apply documents are the same as the GST registration documents listed above." },
    { q: "Which GST document do I get after registration?", a: "After registration you get the GST document called the GST registration certificate (REG-06) with your GSTIN." },
    { q: "How does GST registration India-wide work?", a: "GST registration in India is done state-wise on the GST portal. A business needs one GSTIN per state it operates in." },
    { q: "How to apply for GST number?", a: "To apply for a GST number, you file the GST REG-01 application on the GST portal with your PAN, address proof and bank details. We prepare and file it for you." },
    { q: "Can I do GST apply online myself?", a: "Yes, GST apply online is open to anyone on the GST portal. Mistakes in documents cause most rejections, so many businesses let us file it." },
    { q: "How does online GST registration work?", a: "Online GST registration is fully paperless: application on the GST portal, Aadhaar authentication, and the GSTIN certificate issued online." },
    { q: "What are the GST registration documents?", a: "The main GST registration documents are PAN, ID and address proof of the owner or directors, proof of business address and bank details. The full list is in the documents section above." },
  ],
  "/calculators/gst-registration-cost-calculator": [
    { q: "What is the GST registration cost?", a: "The GST registration cost is only the professional fee; the GST portal charges no government fee. The calculator shows ours." },
    { q: "What are GST registration fees by CA?", a: "GST registration fees by a CA or consultant are a professional fee. The calculator above shows ours." },
    { q: "What are the GST apply fees?", a: "There are no government GST apply fees on the GST portal. You pay only if you use a professional." },
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
    { q: "What is trademark registration?", a: "Trademark registration gives you the legal right to use your brand name or logo for your goods or services in India, and to stop others copying it." },
    { q: "How do I apply for trademark?", a: "To apply for trademark protection, we search your mark, pick the class and file the application on the IP India portal for you." },
    { q: "Is trade mark registration the same as trademark registration?", a: "Yes. Trade mark registration and trademark registration are the same thing, written two ways." },
    { q: "How does trademark filing work?", a: "Trademark filing is done online on the IP India portal with the mark, class, owner details and the government fee." },
    { q: "What is TM registration?", a: "TM registration is short for trademark registration. You can use the TM symbol while your application is pending." },
    { q: "Can I check my TM register details?", a: "Yes. Once filed, your mark appears in the TM register on IP India. Search it by application number on our trademark search page.", link: { label: "Trademark search & status", href: "/verify/trademark-search" } },
    { q: "How does brand name registration work?", a: "Brand name registration is done as a word trademark. We check the name is free and file it in the right class." },
    { q: "Can I do brand name registration in India online?", a: "Yes. Brand name registration in India is fully online on the IP India portal." },
    { q: "Can I do brand registration India-wide with one application?", a: "Yes. One brand registration in India covers the whole country for the classes you file in." },
    { q: "How does logo registration work?", a: "Logo registration is done as a device trademark. We file the logo image in the right class." },
    { q: "What is logo trade mark registration?", a: "Logo trade mark registration protects the design of your logo. It is filed as a device mark." },
    { q: "Is logo trademark registration different from name registration?", a: "Yes. Logo trademark registration protects the image; name registration protects the words. Many businesses file both." },
    { q: "What are the trademark fees?", a: "Trademark fees are the government fee per class plus our professional fee. The pricing section above shows both." },
    { q: "What are the government fees for trademark registration?", a: "Government fees for trademark registration depend on the applicant: individuals, startups and small businesses pay less than other companies. See the pricing section above." },
    { q: "What are trademark registration govt fees?", a: "Trademark registration govt fees are charged per class on the IP India portal. The pricing section above shows the current amount." },
    { q: "What is the trademark cost in India?", a: "The trademark cost in India is the government fee per class plus our professional fee. See the pricing section above." },
    { q: "Can I do trademark registration online govt of India portal myself?", a: "Yes, trademark registration online on the govt of India portal is open to anyone. Most people use a professional to avoid objections." },
    { q: "Is there an official trade mark registration website?", a: "Yes. The official trade mark registration website is the IP India portal. We file on it for you." },
    { q: "What is a trademark registration certificate?", a: "The trademark registration certificate is issued once your mark is registered. It proves your ownership." },
    { q: "What is a trademark certificate?", a: "A trademark certificate is the registration certificate for your mark. You can download it from the IP India e-register." },
    { q: "What is a trade name?", a: "A trade name is the name your business trades under. Registering it as a trademark protects it." },
    { q: "Can I get trade name registration?", a: "Trade name registration is done as a trademark for the name. We check it is free and file it." },
    { q: "How do I do a trade name check?", a: "For a trade name check, search the IP India register in your class before you file.", link: { label: "Trademark search", href: "/verify/trademark-search" } },
    { q: "How does trademark name registration work?", a: "Trademark name registration protects the words of your brand. We search, file and track it to registration." },
    { q: "Is new trademark registration different from renewal?", a: "Yes. New trademark registration is for a mark not yet filed; renewal keeps a registered mark alive." },
    { q: "What is a registered trade mark?", a: "A registered trade mark is one the Trade Marks Registry has registered. You can use the ® symbol with it." },
    { q: "Can I register a trademark company name?", a: "Yes. You can register your company name as a trademark to protect it as a brand." },
    { q: "What is a trade mark licence?", a: "A trade mark licence lets someone else use your registered mark on agreed terms. We draft licence agreements too." },
    { q: "Is the trademark registry Delhi office used for my application?", a: "Applications are filed online and handled by the IP India office that covers your address. Delhi applicants come under the trademark registry Delhi office." },
    { q: "How do I check if my trademark is registered in trade mark India records?", a: "Search the trade mark India register on IP India by name or application number, as shown on our trademark search page.", link: { label: "Trademark search", href: "/verify/trademark-search" } },
    { q: "What are IP rights India covers?", a: "IP rights in India include trademarks, copyright, patents and designs. We register all four." },
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
    { q: "What are the FSSAI renewal fees?", a: "FSSAI renewal fees match the licence type and number of years. Ask us for the current amount for your licence." },
    { q: "What are the FSSAI central license fees?", a: "FSSAI central license fees are set by FSSAI per year. We confirm the current amount when we file." },
    { q: "What is food license registration?", a: "Food license registration is the FSSAI registration or licence every food business needs. The type depends on your turnover and activity." },
    { q: "How does FSSAI license registration work?", a: "FSSAI license registration is filed online on the FoSCoS portal. We check which licence you need, prepare documents and file it." },
  ],
  "/services/pf-registration": [
    { q: "What is the PF registration process?", a: "The PF registration process is done online on the EPFO portal. The employer registers the establishment and then adds employees to get their UAN." },
    { q: "Do you help with PF registration?", a: "Yes. We handle PF registration, UAN generation for employees and monthly ECR filing.", link: { label: "Free salary slip format", href: "/templates/salary-slip" } },
  ],
  "/services/esic-registration": [
    { q: "Do you handle ESI return filing?", a: "Yes. Along with ESIC registration, we handle monthly ESI contributions and ESI return filing." },
  ],
  "/services/msme-registration": [
    { q: "Is Udyam Aadhaar registration the same as Udyam registration?", a: "Yes. Udyam Aadhaar registration is the older name; the current registration is called Udyam registration and gives an MSME certificate." },
  ],
  "/services/startup-india": [
    { q: "How to get Startup India certificate?", a: "To get the Startup India certificate, apply for DPIIT recognition on the Startup India portal. We prepare and file it." },
    { q: "How do I get a Startup India certificate?", a: "You get a Startup India certificate by applying for DPIIT recognition on the Startup India portal. We check eligibility and prepare the application." },
    { q: "What is DPIIT startup registration?", a: "DPIIT startup registration is the official recognition of your business as a startup by the Department for Promotion of Industry and Internal Trade." },
    { q: "Are there Startup India registration fees?", a: "The government does not charge Startup India registration fees. You pay only our professional fee if you want help with the application." },
    { q: "What is a startup in India?", a: "A startup in India, for DPIIT purposes, is a young company, LLP or registered partnership working on innovation or a scalable business model. The eligibility section above has the details." },
  ],
  "/services/iec-registration": [
    { q: "What is IEC registration?", a: "IEC registration gives you the Import Export Code from DGFT that every importer and exporter needs." },
    { q: "What is an import export certificate?", a: "The import export certificate is the IEC issued by DGFT. It is needed to import or export." },
    { q: "How do I check IEC online?", a: "Check IEC online on the DGFT portal using the IEC number." },
    { q: "What are the IEC code charges?", a: "IEC code charges are the DGFT government fee plus our professional fee. The pricing section above shows them." },
    { q: "Can I do IEC code apply online?", a: "Yes. IEC code apply online is done on the DGFT portal. We file it for you." },
    { q: "How does IEC registration online work?", a: "IEC registration online is done on the DGFT portal with PAN, address proof and bank details." },
    { q: "How to do IEC code apply?", a: "To apply for an IEC code, you file the application on the DGFT portal with PAN, address proof and bank details. We prepare and file it for you." },
    { q: "Can I do IEC code registration online?", a: "Yes. IEC code registration is fully online on the DGFT portal." },
    { q: "How do I do an IEC code search?", a: "You can do an IEC code search on the DGFT portal using the IEC number. We can also check an IEC for you." },
  ],

  // ── Compliance ──────────────────────────────────────────────────────────
  "/services/roc-compliance": [
    { q: "What is DPT 3 form?", a: "DPT 3 form is the return companies file with the MCA to report deposits and loans that are not deposits." },
    { q: "What is the DPT 3 full form?", a: "DPT 3 full form is Return of Deposits, form DPT-3 under the Companies Act rules." },
    { q: "Do you offer secretarial audit?", a: "We help companies prepare for secretarial audit with their records, minutes and filings in order. The audit itself is signed by a practising company secretary." },
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
    { q: "What is DSC registration?", a: "DSC registration is getting a Digital Signature Certificate from a licensed certifying authority.", link: { label: "Digital Signature Certificate", href: "/services/digital-signature-certificate" } },
    { q: "What is the DIR-3 KYC due date?", a: "The DIR-3 KYC due date is set by the MCA each year. See the due date section above, or ask us to check your DIN status." },
    { q: "How to apply for a DSC as a director?", a: "Directors apply for a DSC online through a licensed certifying authority, with video or Aadhaar verification. We arrange it as part of our filings.", link: { label: "Digital Signature Certificate", href: "/services/digital-signature-certificate" } },
    { q: "What are digital signature charges?", a: "Digital signature charges depend on the DSC class and validity. We quote them with your filing so there are no surprises." },
  ],
  "/services/income-tax-return": [
    { q: "What are the types of income tax return?", a: "The types of income tax return (ITR forms) depend on who you are and your income: salaried, business, firm, LLP, company or trust. We pick the right one." },
    { q: "Do you file the income tax return for LLP?", a: "Yes. We prepare the accounts, the tax audit if needed, and the income tax return for LLP clients." },
    { q: "What is the LLP ITR filing due date?", a: "The LLP ITR filing due date depends on whether the LLP needs a tax audit, and it can be extended. Ask us to confirm the date for your LLP." },
  ],
  "/services/tds-return": [
    { q: "What is the TDS refund process?", a: "The TDS refund process depends on who is claiming it: the person whose tax was deducted claims it in their income tax return. We help with both returns and claims." },
    { q: "How does TDS challan correction work?", a: "TDS challan correction is done online through the bank or the TRACES portal, depending on what needs changing. We check and file corrections for you." },
  ],

  // ── Verification tools ──────────────────────────────────────────────────
  "/verify/company-name-search": [
    { q: "How do I do a company name search India-wide?", a: "Type the name above. This company name search covers companies across India from MCA data." },
    { q: "How to check company registration?", a: "To check company registration, search the name above or use the CIN number check.", link: { label: "CIN number check", href: "/verify/cin-search" } },
    { q: "Is this an MCA registered company search?", a: "Yes. It searches every MCA registered company and LLP by name." },
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
    { q: "What is a company registration number?", a: "A company registration number is part of the company's CIN. Search the CIN above to see the company's details." },
    { q: "How do I see MCA company details?", a: "Enter the CIN above to see MCA company details: status, RoC, capital and address." },
    { q: "How do I find pvt ltd company details?", a: "Enter the company's CIN above to see the pvt ltd company details from MCA." },
    { q: "How do I do an MCA CIN search?", a: "Enter the CIN in the tool above. This MCA CIN search shows the company's status and details from the MCA registry." },
    { q: "Can I do an MCA company name search by CIN?", a: "Yes. An MCA company name search by CIN shows the registered name for that CIN, along with status and address." },
    { q: "How to check company details by CIN number?", a: "To check company details by CIN number, type the CIN above and press Verify." },
    { q: "How do I check annual filing status?", a: "To check annual filing status, look up the company by CIN here for its status, then ask us to review its MCA filings in detail." },
    { q: "Where can I see MCA annual filing status?", a: "MCA annual filing status is on the company's MCA master data. Start with the CIN check above, and we can review the full filing history for you." },
  ],
  "/verify/din-search": [
    { q: "What is a DIN number?", a: "A DIN number is the Director Identification Number, a unique ID every company director must have." },
    { q: "What is a director identification number?", a: "A director identification number (DIN) is the unique ID the MCA gives every company director." },
    { q: "Can I do a DIN number search by name?", a: "The tool searches by DIN, not by name. For a DIN number search by name, first find the company with our company name search, then use the director's DIN." , link: { label: "Company name search", href: "/verify/company-name-search" } },
    { q: "How does a company director search work?", a: "A company director search here uses the DIN. Enter it above to see the director's companies and LLPs." },
  ],
  "/verify/pan-verification": [
    { q: "How does online PAN verification work?", a: "Online PAN verification checks a PAN against the name and date of birth you enter, with consent. Use the tool above." },
    { q: "How do I verify a PAN number?", a: "To verify a PAN number, enter the PAN, name and date of birth above and press Verify." },
  ],
  "/verify/trademark-search": [
    { q: "How do I check trademark application status?", a: "Check trademark application status on the IP India e-register by application number, as shown above." },
    { q: "How to check trademark availability?", a: "To check trademark availability, search the IP India public search in your class, as shown in the steps above." },
    { q: "How to check trademark availability in India?", a: "Use the IP India public search, as shown above, to check trademark availability in India for your class." },
    { q: "How to search trademark names?", a: "To search trademark names, use word mark search on IP India with starts-with and contains options, as shown above." },
    { q: "What is the trademark status search?", a: "Trademark status search is the e-register lookup by application number. The steps are above." },
    { q: "How do I do a TM status check?", a: "For a TM status check, enter your application number on the IP India e-register." },
    { q: "What is the trademark application status?", a: "Trademark application status shows where your application is: examination, objection, journal, opposition or registered." },
    { q: "How do I do a trademark application search?", a: "A trademark application search on IP India can be done by number, name or applicant." },
    { q: "Where is the IPIndia public search trademark tool?", a: "The IPIndia public search trademark tool is linked in the steps above. It needs an OTP login." },
    { q: "How do I check IPIndia trademark status?", a: "Check IPIndia trademark status on the e-register linked above, using your application number." },
    { q: "How do I check the trademark registration status?", a: "Trademark registration status is shown on the IP India e-register for your application number." },
    { q: "How do I download trademark certificate?", a: "Download trademark certificate from the documents of your application on the IP India e-register." },
    { q: "How does IP search trademark work?", a: "IP search trademark means searching the IP India register for marks like yours, as shown above." },
    { q: "What is the trademark e register main page?", a: "The e register main page is the IP India trademark e-register, linked in the steps above." },
    { q: "Can I do a brand name check here?", a: "Yes. Follow the steps above to do a brand name check on IP India before you file." },
    { q: "How do I do a brand name search India-wide?", a: "A brand name search in India is done on the IP India public search, linked above." },
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

  // ── Keyword gap round 2 (Nov 2026) ──
  "/services/digital-signature-certificate": [
    { q: "What is DSC registration?", a: "DSC registration means getting a Digital Signature Certificate issued in your name by a licensed certifying authority." },
    { q: "How to apply for DSC?", a: "To apply for DSC, share your PAN, mobile and photo with us, complete the online verification, and receive the token. The steps are above." },
    { q: "Can I apply for DSC online?", a: "Yes. You can apply for DSC fully online with video or OTP verification." },
    { q: "What do I need for a DSC application?", a: "For a DSC application you need your PAN, Aadhaar-linked mobile number, email and a photo." },
    { q: "What are DSC charges?", a: "DSC charges are listed in the table above, per certificate, with GST extra." },
    { q: "What are digital signature charges for a company?", a: "Digital signature charges for a company or organisation DSC are in the table above." },
    { q: "How to apply for digital signature certificate online?", a: "Apply for digital signature certificate online through us: share your details, complete video or OTP verification, and get the token." },
  ],
  "/services/trademark-renewal": [
    { q: "What are the trademark renewal fees?", a: "Trademark renewal fees are the government fee per class plus our professional fee. The pricing section above shows them." },
  ],
  "/services/shops-establishment": [
    { q: "What is shop establishment registration?", a: "Shop establishment registration is the state licence that shops, offices and other commercial places need to operate." },
    { q: "What is shop act registration?", a: "Shop act registration is the registration under your state's Shops and Establishments Act. We file it for you." },
    { q: "Who needs registration under shop and establishment law?", a: "Under shop and establishment law, most shops, offices, restaurants and commercial places in a state must register." },
    { q: "What is a shop registration certificate?", a: "A shop registration certificate is issued once your shop or office is registered under the state Shops and Establishments Act." },
  ],
  "/services/professional-tax": [
    { q: "How does professional tax Karnataka registration work?", a: "For professional tax Karnataka registration, employers and professionals register on the Karnataka commercial taxes portal. We file it for you." },
    { q: "Who must pay Karnataka professional tax?", a: "Karnataka professional tax applies to employers, employees and professionals in Karnataka. We check if it applies to you." },
    { q: "Can you handle professional tax registration Karnataka?", a: "Yes. We handle professional tax registration Karnataka and monthly or yearly returns." },
  ],
  "/services/trade-license": [
    { q: "How does trade license Karnataka work?", a: "Trade license Karnataka is issued by the local body, such as the BBMP in Bengaluru. We prepare and file the application." },
  ],
  "/services/apeda-registration": [
    { q: "What is an APEDA certificate?", a: "The APEDA certificate is the Registration-cum-Membership Certificate exporters of scheduled food products need." },
    { q: "What are the APEDA registration fees?", a: "APEDA registration fees are the government fee plus our professional fee. Ask us for the current amount." },
  ],
  "/services/12a-80g-registration": [
    { q: "What is 12A 80G registration?", a: "12A 80G registration gives an NGO income tax exemption (12A) and lets donors claim a deduction (80G)." },
  ],
  "/services/patent-registration": [
    { q: "What is a provisional application?", a: "A provisional application is an early patent filing that secures your priority date before the full specification is ready." },
    { q: "Do you offer a patent registration service?", a: "Yes. Our patent registration service covers search, drafting, filing, examination replies and grant." },
  ],
  "/services/psara-license": [
    { q: "What is a security agency license?", a: "A security agency license is the PSARA licence every private security agency needs to operate in a state." },
  ],
  "/services/increase-authorised-capital": [
    { q: "How does increase of authorised share capital work?", a: "Increase of authorised share capital needs a shareholder resolution and SH-7 filed with the MCA. We handle both." },
  ],
};
