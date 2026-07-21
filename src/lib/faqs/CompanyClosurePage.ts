// FAQ content for CompanyClosurePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is Form STK-2 and who can file it?",
    a: "Form STK-2 is the application form for voluntary strike-off (closure) of a private limited company under Section 248(2) of the Companies Act, 2013. It can be filed by companies that have not commenced business within one year of incorporation, or companies that have not been carrying on any business for the past two financial years and have not applied for dormant status. The company must have nil assets and nil liabilities to be eligible for this Fast Track Exit route.",
  },
  {
    q: "What is the difference between STK-2 Fast Track Exit and NCLT winding-up?",
    a: "STK-2 Fast Track Exit is a voluntary, MCA portal-based administrative process for companies with nil assets and nil liabilities. It is faster (3-6 months), cost-effective, and requires no court or tribunal involvement. NCLT voluntary winding-up under the Insolvency and Bankruptcy Code is used when a company has assets, liabilities, or creditors to settle. It involves appointing a liquidator, settling all claims, distributing remaining assets to shareholders, and obtaining a dissolution order from the NCLT. STK-2 is preferable when the company is truly dormant with zero financial obligations.",
  },
  {
    q: "Can a company with outstanding GST or income tax liabilities apply for STK-2?",
    a: "No. A company must clear all outstanding statutory liabilities including GST (all pending returns must be filed and GST registration cancelled), income tax (all ITRs filed, no pending demands), PF, ESIC, and any other regulatory dues before applying for strike-off via STK-2. The CA-certified statement of accounts must confirm nil liabilities. Any pending liabilities will result in rejection of the application by the Registrar.",
  },
  {
    q: "How long does the STK-2 process take?",
    a: "The STK-2 strike-off process typically takes 3 to 6 months from the date of filing the application. This includes the 30-day public notice period during which any objections can be raised, the review period by the Registrar of Companies, and the time for issuance of the final strike-off order. If objections are raised or documents are deficient, the process may take longer.",
  },
  {
    q: "What happens to directors after the company is struck off?",
    a: "Once the company is struck off, the directors are relieved of all future compliance obligations related to that company. Their directorship in the dissolved company is automatically terminated. The strike-off also removes the risk of disqualification under Section 164(2) for non-filing, and their DIN remains active for use in other companies. The indemnity bonds signed during the process ensure personal liability for any undisclosed liabilities that emerge post-dissolution.",
  },
  {
    q: "Can a struck-off company be restored?",
    a: "Yes. Under Section 252 of the Companies Act, a struck-off company can be restored to the register by an order of the NCLT within 20 years of the date of dissolution. A dissolved company can be revived if it is established that the strike-off was unjustified or if a legal dispute requires the company&apos;s continued existence. However, restoration requires NCLT proceedings and payment of all pending statutory dues along with late fees.",
  },
  {
    q: "What documents must each director sign for STK-2?",
    a: "Each director of the company must individually sign and execute: (1) Form STK-3 — an indemnity bond on stamp paper declaring that all liabilities have been settled and indemnifying against any future claims; and (2) Form STK-4 — a sworn affidavit before a Notary or Magistrate declaring that the information provided is true and the company has ceased operations and has nil assets and liabilities. All directors must sign regardless of their active participation in the company.",
  },
  {
    q: "Is it mandatory to close the bank account before filing STK-2?",
    a: "Yes. All bank accounts of the company must be closed and a bank account closure letter from the bank must be obtained before filing Form STK-2. The company cannot have any active bank accounts at the time of filing. The CA-certified statement of accounts must reflect a nil bank balance and the Registrar verifies the same. An active bank account with even a zero balance can cause rejection of the application.",
  },
];
