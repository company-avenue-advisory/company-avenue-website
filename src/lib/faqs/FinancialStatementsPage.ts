// FAQ content for FinancialStatementsPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is Schedule III of the Companies Act and why does it matter?",
    a: "Schedule III to the Companies Act, 2013 prescribes the format in which the financial statements of all companies registered under the Act must be prepared. It specifies the exact format for the Balance Sheet (assets and liabilities), Statement of Profit and Loss (revenues and expenses), and the minimum disclosure requirements in Notes to Accounts. Companies that do not prepare their financial statements in the prescribed Schedule III format will face qualifications in the statutory audit report and potential rejection by the RoC during AOC-4 filing. Schedule III was significantly revised in 2021 to add new disclosures including CSR spending, crypto assets, and trade payable ageing.",
  },
  {
    q: "What is the difference between Ind AS and AS (Accounting Standards)?",
    a: "Accounting Standards (AS) are issued by the ICAI and have been applicable in India since the 1980s. They are applicable to companies below the Ind AS threshold. Indian Accounting Standards (Ind AS) are converged with International Financial Reporting Standards (IFRS) and are applicable to: (1) all listed companies; (2) unlisted companies with paid-up capital of ₹250 crore or more; (3) companies with net worth of ₹500 crore or more; and (4) insurance/banking companies from designated dates. Key differences include fair value measurement, lease accounting (Ind AS 116), financial instruments (Ind AS 109), and revenue recognition (Ind AS 115). Once a company moves to Ind AS, it cannot revert to AS.",
  },
  {
    q: "Is the Cash Flow Statement mandatory for all companies?",
    a: "Under Schedule III of the Companies Act, the Cash Flow Statement (prepared using the indirect method under AS 3 / Ind AS 7) is mandatory for all companies except: (1) One Person Companies (OPCs); and (2) Small Companies with paid-up capital not exceeding ₹4 crore and turnover not exceeding ₹40 crore. For all other private and public companies, the Cash Flow Statement is a mandatory component of the annual financial statements and must be filed in AOC-4 with the RoC.",
  },
  {
    q: "What are Related Party Transaction (RPT) disclosures and why are they important?",
    a: "Related Party Transactions (RPTs) are transactions between a company and its directors, key managerial personnel (KMPs), holding companies, subsidiaries, associates, or any entity controlled by these persons. Schedule III and AS 18 / Ind AS 24 require detailed disclosure of all RPTs in the Notes to Accounts — including the nature of the relationship, description of transactions, amounts involved, and outstanding balances. Improper or undisclosed RPTs attract adverse audit qualifications, regulatory scrutiny, and in the case of listed companies, SEBI enforcement action.",
  },
  {
    q: "Can financial statements be revised or restated after they are filed?",
    a: "Under the Companies Act, 2013, a company can revise its financial statements after they have been approved by the Board of Directors but before they are laid at the AGM and filed with the RoC — with Board approval and a revised auditor&apos;s report. After filing with the RoC, revision requires an NCLT order. Under SEBI regulations for listed companies, material restatements must be disclosed to stock exchanges and communicated to shareholders. The revised statements must be filed with the RoC as per the prescribed procedure with applicable additional fees.",
  },
  {
    q: "What disclosures were added to Schedule III in the 2021 amendment?",
    a: "The MCA significantly amended Schedule III in 2021 to add several new disclosure requirements including: (1) Ageing schedule of trade receivables and trade payables (0-90 days, 90-180 days, 180-360 days, 360 days+); (2) CSR spending details and unspent CSR amounts; (3) Ratios — current ratio, debt-equity ratio, return on equity, etc. (8 mandatory ratios with YoY comparison); (4) Details of cryptocurrency/virtual digital assets held; (5) Benami property disclosures; (6) Undisclosed income details; (7) Security given over assets; and (8) Disclosures on loans granted to related parties and investments made by companies.",
  },
  {
    q: "What is the link between financial statements and GST reconciliation?",
    a: "The turnover declared in financial statements must reconcile with the turnover reported in GST returns (particularly GSTR-9 Annual Return). GST officers compare the two during GST audit. Unexplained differences — whether due to exempted supplies, zero-rated exports, or timing differences in invoice recognition — must be properly disclosed and explained. Financial statements must also disclose GST-related balances: input tax credit on balance sheet, GST payables, and RCM liabilities. A professionally prepared set of financial statements will ensure this reconciliation is documented and auditable.",
  },
  {
    q: "How long does it take to prepare financial statements?",
    a: "Professional preparation of financial statements typically takes 3 to 7 business days depending on the size of the entity, the quality of books maintained, and the availability of supporting documents. For companies with multiple locations, complex inventories, or significant related party transactions, the timeline may extend to 2-3 weeks. Our team works efficiently to close accounts on time for both ROC filing deadlines and tax audit requirements. Early engagement (April-June for the March financial year) is strongly recommended to avoid last-minute pressure.",
  },
];
