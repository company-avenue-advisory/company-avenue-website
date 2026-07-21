// FAQ content for TaxAuditPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is a tax audit under Section 44AB?",
    a: "A tax audit under Section 44AB of the Income Tax Act is a mandatory examination of a taxpayer's books of accounts by a practicing Chartered Accountant (CA). The auditor verifies whether the financial statements correctly reflect the taxpayer's income, expenses, assets and liabilities, and whether tax laws have been properly complied with. The CA prepares Form 3CA or 3CB (audit report) and Form 3CD (a detailed 44-clause statement of particulars), which are uploaded on the Income Tax portal. The due date is 30 September for the preceding financial year.",
  },
  {
    q: "Who is covered under Section 44AB?",
    a: "Section 44AB covers: (1) Persons carrying on business with total sales / gross receipts / turnover exceeding ₹1 crore in a financial year. Exception: if 95%+ of receipts and payments are digital, the threshold is ₹10 crore. (2) Persons carrying on a profession (doctors, lawyers, CAs, engineers, architects, etc.) with gross receipts exceeding ₹50 lakh in a financial year. (3) Persons opting out of presumptive taxation under Section 44AD, 44ADA, or 44AE who declare income lower than the presumptive rate and whose income exceeds the basic exemption limit.",
  },
  {
    q: "What is Form 3CD and what does it contain?",
    a: "Form 3CD is a 44-clause statement of particulars that the tax auditor must prepare and submit along with the audit report. It contains extensive disclosures including: details of the business, depreciation claimed, amounts paid to specified persons, loans taken and repaid above ₹20,000 in cash, payments attracting TDS, income on which advance tax was due, amounts deductible under Chapter VIA, capital expenditure, payments under Section 40A(3) (cash payments > ₹10,000), speculative transactions, MSME dues, dividend payments, and disclosures on cryptocurrency and benami transactions. Each clause must be completed accurately based on verified records.",
  },
  {
    q: "What is the difference between Form 3CA and Form 3CB?",
    a: "Form 3CA is the audit report used when the taxpayer's accounts are already mandatorily audited under any other law — such as the Companies Act (for companies audited under Sec 139), Partnership Act, or co-operative societies. In this case, the tax audit report references the already-completed statutory audit. Form 3CB is the audit report used when the taxpayer is not required to get accounts audited under any other law — typically applicable to proprietorships, most partnership firms, and LLPs. Both forms are submitted along with Form 3CD, which is common to both.",
  },
  {
    q: "What is the penalty for not getting a tax audit done?",
    a: "Section 271B of the Income Tax Act imposes a penalty of 0.5% of total sales / turnover / gross receipts, or ₹1,50,000, whichever is lower, for failure to: (a) get accounts audited under Section 44AB, or (b) furnish the tax audit report by the due date (30 September). Additionally, if the associated ITR is not filed within due date due to audit non-completion, the business may lose the right to carry forward losses (excluding unabsorbed depreciation). The assessing officer has discretionary powers to levy the penalty after providing an opportunity of being heard.",
  },
  {
    q: "When can you avoid tax audit under 44AD and 44ADA?",
    a: "Section 44AD allows eligible businesses (individuals, HUFs, partnership firms — not companies or LLPs) with turnover up to ₹2 crore to declare presumptive income of 8% (or 6% for digital receipts) of turnover. If you declare at least this amount, no books or audit required. Section 44ADA covers professionals with gross receipts up to ₹50 lakh — declare 50% as profit and no audit is needed. However, if you opt for these schemes and then declare lower profits, or if your income exceeds the basic exemption, a tax audit under Section 44AB becomes mandatory.",
  },
  {
    q: "What does the auditor verify in Form 3CD?",
    a: "The auditor verifies 44 specific clauses in Form 3CD covering: business nature and principal place; books maintained; method of accounting (cash or mercantile); stocks valuation method; depreciation schedules under Income Tax rules; deduction claims under Chapter VI-A; payments to relatives and associated persons; cash payments and receipts above ₹2 lakh (Sec 269ST); TDS compliance; MSME outstanding payments beyond 45 days; nature of speculation and derivatives trading; capital expenditure; any hundi transactions; and detailed disclosure of income from cryptocurrency / virtual digital assets from FY 2022-23 onwards.",
  },
  {
    q: "What are the audit trail requirements from FY 2023-24?",
    a: "From FY 2023-24 onwards, the Ministry of Corporate Affairs has made it mandatory for companies using accounting software to maintain an edit log or audit trail for every transaction. The audit trail must record the date and time of each change made, the old and new values, and must not be capable of being disabled. The statutory auditor must report whether the audit trail was enabled throughout the year and whether it was tampered with. Tax auditors also look at this during the Section 44AB audit as part of verifying the integrity of the books maintained.",
  },
  {
    q: "How are cryptocurrency and Virtual Digital Assets disclosed in a tax audit?",
    a: "From FY 2022-23, VDA (Virtual Digital Assets) including cryptocurrency, NFTs, etc. are taxable at a flat 30% under Section 115BBH. In Form 3CD, the auditor must disclose VDA transactions in clause 13 covering the method of valuation and any income from VDAs. Gains from VDA are treated as capital gains or business income depending on the nature and frequency of transactions. Losses from VDA cannot be set off against any other income. The auditor verifies exchange statements, wallet records, and blockchain transactions to accurately capture VDA disclosures.",
  },
  {
    q: "What are the digital payment ratio and cash transaction limits relevant to tax audit?",
    a: "Section 269ST prohibits cash receipts of ₹2 lakh or more from a single person in a day, per single transaction, or per single event. Violations attract a penalty equal to the amount received in cash under Section 271DA. Form 3CD Clause 31 requires the auditor to disclose all such instances of cash receipts and payments above specified limits. Additionally, Section 40A(3) disallows expenses where any payment above ₹10,000 is made in cash to a single person in a day. These disclosures are critical and require careful review of all cash transactions during the year.",
  },
];
