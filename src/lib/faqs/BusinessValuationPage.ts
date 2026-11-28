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
    a: "For startups, the Discounted Cash Flow (DCF) method is the most common. It values the business on expected future cash flows, discounted at a suitable rate. But DCF needs reliable projections. Early-stage startups have little history. For them, the Comparable Company Method (multiples of similar funded startups) or a Revenue Multiple may be used alongside DCF. The right method depends on the startup's stage, industry and why it needs the valuation.",
  },
  {
    q: "Which method is used for asset-heavy companies?",
    a: "The Net Asset Value (NAV) method suits asset-heavy businesses. Examples are real estate companies, investment holding companies, factories with large fixed assets and financial institutions. NAV takes the fair market value of all assets and subtracts liabilities. That gives the business's underlying worth. For most businesses, it is also used next to DCF as a cross-check ('floor value').",
  },
  {
    q: "How is a pre-revenue startup valued?",
    a: "Pre-revenue startups are usually valued with: (1) Revenue multiples: industry EV/Revenue multiples applied to expected revenue; (2) Market approach: comparing with recent funding rounds of similar startups; (3) Scorecard method: comparing with funded startups and adjusting for team, product, market and traction; (4) Venture Capital method: working back from the exit value to today. Several methods are combined to give a credible value you can defend.",
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
    a: "For most regulatory uses in India (such as FDI, FEMA and ROC filings), a valuation report is typically valid for 6 months. After 6 months, get a fresh one. Performance, markets and the financial position may have changed a lot. For ESOP purposes, many companies get one valuation a year and use it for all grants in that financial year. The exact validity depends on the rule the valuation is used for.",
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
