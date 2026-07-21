// FAQ content for AdvanceTaxPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "Who must pay advance tax?",
    a: "Any taxpayer whose estimated tax liability after TDS exceeds ₹10,000 in a financial year must pay advance tax under Section 208 of the Income Tax Act. This includes salaried individuals with additional income, freelancers, business owners, companies, LLPs, and NRIs with Indian-source income. Senior citizens (60+ years) are exempt only if they do not have income from business or profession."
  },
  {
    q: "How is advance tax calculated?",
    a: "Estimate your total income from all sources for the financial year. Apply the applicable slab rates (or flat rate for companies) to arrive at gross tax. Deduct TDS already deducted / to be deducted. The net figure is your advance tax liability. Divide it into instalments: 15% by 15 Jun, 45% by 15 Sep, 75% by 15 Dec, 100% by 15 Mar (cumulative)."
  },
  {
    q: "What if I pay less than the required amount in each instalment?",
    a: "Under Section 234C, if you pay less than the required percentage in any instalment, simple interest at 1% per month is charged on the shortfall for 3 months (1 month for the March instalment). For example, if you pay only 10% instead of 15% by 15 June, interest accrues on the 5% shortfall for 3 months."
  },
  {
    q: "Can I pay the entire advance tax in a single instalment?",
    a: "Technically, advance tax is structured in four instalments to avoid quarterly shortfall interest under Sec 234C. However, if you pay the full 100% by 15 March, no Sec 234C interest applies (only Sec 234B would apply if you miss March too). It is best practice to pay in proper quarterly instalments to avoid any interest charge."
  },
  {
    q: "What is the difference between Section 234B and Section 234C interest?",
    a: "Section 234B applies when the total advance tax paid by 31 March is less than 90% of assessed tax. Interest is charged at 1% per month from 1 April until actual payment (or assessment). Section 234C applies to quarterly shortfalls—if each quarterly instalment is below the prescribed percentage, interest accrues on that period's shortfall. Both can apply simultaneously."
  },
  {
    q: "Do salaried employees need to pay advance tax?",
    a: "A salaried employee whose entire tax liability is covered by TDS (employer deduction) is not required to pay advance tax separately. However, if TDS falls short—due to capital gains, rental income, interest income, freelance work, or wrong declaration to employer—the employee must pay advance tax on the uncovered portion if it exceeds ₹10,000."
  },
  {
    q: "How do I pay advance tax online via the IT portal?",
    a: "Visit the Income Tax e-filing portal (incometax.gov.in) → e-Pay Tax → New Payment → Advance Tax (Code 100). Fill in PAN, assessment year, and amount. Pay via net banking, debit card, or NEFT/RTGS. Download the Challan 280 receipt, note the BSR code and serial number, and verify in Form 26AS within 3–5 working days."
  },
  {
    q: "What if my income changes significantly mid-year?",
    a: "You can revise your advance tax estimate at any time. Simply recalculate your projected income and tax liability, and adjust the next quarterly payment accordingly. For example, if you sell property in October, revise upward before the 15 December instalment. There is no penalty for revision itself—only for quarterly shortfalls."
  },
  {
    q: "How is advance tax different from TDS?",
    a: "TDS (Tax Deducted at Source) is deducted by the payer (employer, bank, client) at the time of making a payment and deposited to the government on your behalf. Advance tax is self-assessed and self-paid by the taxpayer based on estimated income. Both reduce your final ITR tax liability but are collected through different mechanisms."
  },
  {
    q: "What if I pay more advance tax than my actual liability?",
    a: "If advance tax paid exceeds the final assessed tax, the excess is treated as a refund. You can claim this refund in your ITR. Under Section 244A, the Income Tax Department pays interest at 6% per annum on the refund amount (0.5% per month) from 1 April of the assessment year to the date of refund order."
  },
  {
    q: "Are companies subject to advance tax?",
    a: "Yes. All companies—private limited, public limited, OPC—must pay advance tax irrespective of the amount of tax liability (there is no ₹10,000 threshold for companies). The same quarterly instalment percentages apply: 15% / 45% / 75% / 100% on the same due dates."
  },
  {
    q: "Can advance tax be paid through offline challan?",
    a: "Yes. Advance tax can be paid over the counter at authorised bank branches (e.g., SBI, HDFC, ICICI, BoB) using physical Challan ITNS 280. The bank stamps and returns the counterfoil as proof. However, online payment is recommended for instant receipt, easier record keeping, and immediate 26AS reflection."
  },
];
