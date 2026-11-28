// FAQ content for FinancialStatementsPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is Schedule III of the Companies Act and why does it matter?",
    a: "Schedule III to the Companies Act, 2013 sets the format for every company's financial statements. It fixes the format of the Balance Sheet (assets and liabilities) and the Statement of Profit and Loss (revenue and expenses). It also sets the minimum disclosures in the Notes to Accounts. If you do not follow Schedule III, the auditor may qualify the report. The RoC may also reject your AOC-4 filing. Schedule III was revised in 2021. New disclosures include CSR spending, crypto assets and trade payable ageing.",
  },
  {
    q: "What is the difference between Ind AS and AS (Accounting Standards)?",
    a: "The ICAI issues Accounting Standards (AS). They have applied in India since the 1980s, to companies below the Ind AS threshold. Indian Accounting Standards (Ind AS) are aligned with International Financial Reporting Standards (IFRS). Ind AS applies to: (1) all listed companies; (2) unlisted companies with paid-up capital of ₹250 crore or more; (3) companies with net worth of ₹500 crore or more; and (4) insurance and banking companies from set dates. The main differences are fair value, leases (Ind AS 116), financial instruments (Ind AS 109) and revenue (Ind AS 115). Once a company moves to Ind AS, it cannot go back to AS.",
  },
  {
    q: "Is the Cash Flow Statement mandatory for all companies?",
    a: "Under Schedule III of the Companies Act, every company needs a Cash Flow Statement, prepared by the indirect method under AS 3 / Ind AS 7. The exceptions are: (1) One Person Companies (OPCs); and (2) Small Companies with paid-up capital up to ₹4 crore and turnover up to ₹40 crore. For all other private and public companies, it is a required part of the annual accounts. It must be filed in AOC-4 with the RoC.",
  },
  {
    q: "What are Related Party Transaction (RPT) disclosures and why are they important?",
    a: "Related Party Transactions (RPTs) are deals between a company and its directors, key managerial personnel (KMPs), holding company, subsidiaries, associates or any entity they control. Schedule III and AS 18 / Ind AS 24 require full disclosure of all RPTs in the Notes to Accounts. This covers the relationship, what the deal was, the amounts and the balances due. Wrong or hidden RPTs lead to audit qualifications and regulatory scrutiny. Listed companies can also face SEBI action.",
  },
  {
    q: "Can financial statements be revised or restated after they are filed?",
    a: "Under the Companies Act, 2013, a company can revise its accounts after Board approval but before the AGM and RoC filing. It needs Board approval and a revised auditor's report. After filing with the RoC, a revision needs an NCLT order. Under SEBI rules, listed companies must report material restatements to the stock exchanges and tell shareholders. The revised accounts must be filed with the RoC by the set procedure, with any extra fees.",
  },
  {
    q: "What disclosures were added to Schedule III in the 2021 amendment?",
    a: "In 2021, the MCA added several new disclosures to Schedule III: (1) ageing of trade receivables and payables (0-90 days, 90-180 days, 180-360 days, 360 days+); (2) CSR spending and unspent CSR amounts; (3) ratios such as current ratio, debt-equity ratio and return on equity (8 mandatory ratios with YoY comparison); (4) crypto or virtual digital assets held; (5) benami property; (6) undisclosed income; (7) security given over assets; and (8) loans to related parties and investments made.",
  },
  {
    q: "What is the link between financial statements and GST reconciliation?",
    a: "The turnover in your accounts must match the turnover in your GST returns, especially the GSTR-9 Annual Return. GST officers compare the two in a GST audit. Any gap must be shown and explained. Common reasons are exempt supplies, zero-rated exports or timing of invoices. The accounts must also show GST balances: input tax credit, GST payable and RCM liabilities. Properly prepared accounts keep this reconciliation documented and ready for audit.",
  },
  {
    q: "How long does it take to prepare financial statements?",
    a: "Preparing financial statements typically takes 3 to 7 business days. It depends on the size of the business, how well the books are kept and whether documents are ready. For companies with several locations, complex stock or many related party deals, it may take 2-3 weeks. Our team closes accounts on time for ROC deadlines and tax audits. Start early (April-June for a March year-end) to avoid last-minute pressure.",
  },
];
