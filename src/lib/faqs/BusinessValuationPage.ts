// FAQ content for BusinessValuationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "When is business valuation mandatory under Indian law?",
    a: "Business valuation is mandatory in several situations under Indian law: (1) FDI transactions — Rule 11UA of the Income Tax Rules requires CA-certified valuation for share issuance to non-residents under FEMA; (2) Share transfers under the Companies Act, 2013 require registered valuer certification; (3) ESOP grants require FMV determination under Income Tax Rules; (4) Mergers and demergers under NCLT proceedings require an independent valuation report.",
  },
  {
    q: "Which valuation method is best for startups?",
    a: "For startups, the Discounted Cash Flow (DCF) method is most commonly used — it values the business based on projected future cash flows discounted at an appropriate rate. However, DCF requires reliable financial projections. For early-stage startups with limited history, the Comparable Company Method (market multiples of similar funded startups) or Revenue Multiple approach may supplement DCF. The appropriate method depends on the startup's stage, industry, and the purpose of valuation.",
  },
  {
    q: "Which method is used for asset-heavy companies?",
    a: "The Net Asset Value (NAV) method is most appropriate for asset-heavy businesses such as real estate companies, investment holding companies, manufacturing businesses with significant fixed assets, and financial institutions. NAV computes the fair market value of all assets minus liabilities to derive the business's intrinsic worth. It is also used alongside DCF as a cross-check ('floor value') for most businesses.",
  },
  {
    q: "How is a pre-revenue startup valued?",
    a: "Pre-revenue startups are typically valued using: (1) Revenue multiples — applying industry EV/Revenue multiples to projected revenues; (2) Market approach — comparing with recent funding rounds of similar startups; (3) Scorecard method — benchmarking against funded startups adjusting for team, product, market, and traction; (4) Venture Capital method — working backwards from exit value to present value. A combination of methods is used to present a credible, defensible valuation.",
  },
  {
    q: "How is the valuation determined for ESOP grants?",
    a: "For ESOP grants, the valuation determines the Fair Market Value (FMV) of shares on the grant date, as required under Rule 3(9) of the Income Tax Rules (for listed companies) and per ICAI guidance for unlisted companies. The FMV on the grant date forms the exercise price. If ESOPs are granted below FMV, the difference is treated as a perquisite in the employee's hands at vesting, and TDS must be deducted. A fresh valuation is typically required for each ESOP grant round.",
  },
  {
    q: "What is Rule 11UA and when does it apply?",
    a: "Rule 11UA of the Income Tax Rules, 1962 governs the determination of Fair Market Value (FMV) of unlisted shares for income tax purposes. It applies primarily when a company issues shares to non-residents (FDI) under FEMA, or when shares are sold at a price that may trigger Section 56(2)(viib) (angel tax). Under Rule 11UA, the FMV must be computed using the net asset value method or DCF method, and must be certified by a Merchant Banker or a Chartered Accountant.",
  },
  {
    q: "Can a valuation report be challenged by the Income Tax Department?",
    a: "Yes. The Income Tax Department can scrutinise and challenge a valuation report under Section 56(2)(viib) — the 'angel tax' provision. If a company issues shares to a resident investor at a price higher than the FMV as computed under Rule 11UA, the excess amount is taxed as income in the company's hands. A professionally certified, well-documented valuation report with clear methodology, supportable assumptions, and sensitivity analysis significantly reduces the risk of challenge and creates a strong legal defence.",
  },
  {
    q: "How long is a valuation report valid?",
    a: "A business valuation report is typically valid for 6 months for most regulatory purposes in India (e.g., FDI, FEMA, ROC filings). After 6 months, a fresh valuation is recommended as business performance, market conditions, and financial position may have changed materially. For ESOP purposes, many companies obtain an annual valuation that is used for the entire financial year's grant rounds. The specific validity period depends on the regulatory requirement for which the valuation is being used.",
  },
  {
    q: "What is angel tax and how does proper valuation help?",
    a: "Angel tax refers to the tax imposed under Section 56(2)(viib) of the Income Tax Act on the amount received by a company from a resident investor in excess of the Fair Market Value of shares issued. For example, if a startup issues shares at ₹100 each but the FMV as per Rule 11UA is ₹60, the excess ₹40 per share is taxed as 'income from other sources.' A properly certified valuation at or above the issue price protects the company from this liability and is the strongest defence in case of scrutiny.",
  },
  {
    q: "Is a CA certificate required, and what form is used?",
    a: "Yes, a CA certificate is required for valuation reports used for regulatory purposes. For cross-border transactions (FDI, share transfers to non-residents), Form 3CEB is required under Section 92E of the Income Tax Act. For domestic transactions and ESOP valuations, a certificate from a practicing CA or Merchant Banker on their letterhead is the standard requirement. The specific form depends on the transaction type — our team identifies the correct certification requirement for your situation.",
  },
];
