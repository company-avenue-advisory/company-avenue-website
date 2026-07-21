// FAQ content for TdsReturnPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is TDS and why must it be deducted?",
    a: "Tax Deducted at Source (TDS) is a mechanism where the payer (deductor) deducts a fixed percentage of tax from payments made to the payee (deductee) and deposits it with the government on their behalf. This ensures continuous tax collection throughout the year rather than a lump sum at year-end. The deductor must hold a Tax Deduction Account Number (TAN) and file quarterly returns. The deductee receives credit for TDS in their 26AS / AIS, which can be claimed as advance tax when filing their ITR.",
  },
  {
    q: "What are the quarterly due dates for TDS return filing?",
    a: "TDS returns must be filed quarterly: Q1 (April–June) by 31st July; Q2 (July–September) by 31st October; Q3 (October–December) by 31st January; and Q4 (January–March) by 31st May. These deadlines apply to Form 24Q (salary), 26Q (non-salary residents), 27Q (non-residents), and 27EQ (TCS). Note that TDS payment itself must be deposited by the 7th of each following month (except March, which is due by 30th April).",
  },
  {
    q: "What happens if TDS is not deducted at all?",
    a: "If TDS is not deducted when legally required, the entire expense may be disallowed under Section 40(a)(ia) — 30% disallowance for non-deduction and 100% for non-deposit in some cases. Additionally, interest @ 1% per month (or part of month) is levied from the date TDS was due until actual deduction under Section 201(1A). The deductor may also be treated as an 'assessee in default' and face penalty proceedings equal to TDS amount under Section 221.",
  },
  {
    q: "What is the difference between Form 16 and Form 16A?",
    a: "Form 16 is the TDS certificate issued for salary income under Section 192. It has two parts: Part A (TDS deducted and deposited, employer details, PAN) generated from TRACES, and Part B (breakup of salary, exemptions, deductions, tax computation) prepared by the employer. Form 16A is the TDS certificate for non-salary payments — applicable to professional fees (194J), rent (194I), interest (194A), contract payments (194C), commission (194H) etc. Both must be issued to deductees annually (Form 16) or quarterly (Form 16A).",
  },
  {
    q: "How does 26AS matching work for TDS credit?",
    a: "Form 26AS is the taxpayer's annual tax statement available on the Income Tax portal. It reflects TDS deducted by all deductors against the taxpayer's PAN, advance tax paid, self-assessment tax, and refunds. When a deductor files their TDS return and the challan is matched on TRACES (Tax Reconciliation, Analysis and Correction Enabling System), the TDS credit automatically appears in the deductee's 26AS. If the deductor uses a wrong PAN, incorrect challan, or doesn't file the return, the credit does not appear and the deductee cannot claim it while filing their ITR.",
  },
  {
    q: "Is filing a NIL TDS return mandatory?",
    a: "Yes. If a deductor has an active TAN but has made no payments attracting TDS during a quarter, they should ideally file a NIL TDS return. While the Income Tax Act does not explicitly mandate a NIL return, TRACES and the department's compliance systems flag TAN holders who do not file returns, potentially triggering notices and demands. Filing a NIL return keeps your TAN compliance status clean and avoids departmental scrutiny.",
  },
  {
    q: "What is the late filing fee under Section 234E?",
    a: "Section 234E levies a mandatory fee of ₹200 per day from the due date of filing until the actual date of filing. This fee accrues daily — for example, a 30-day delay means ₹6,000 in late fees. The total fee cannot exceed the amount of TDS for which the return was required to be filed. Unlike penalties, this is a fee (not a penalty under 271H) and is mandatorily charged by the system without any waiver provisions. Professional filing eliminates this entirely.",
  },
  {
    q: "What is a TDS correction return and when is it needed?",
    a: "A TDS correction return is a revised TDS return filed to correct errors in an originally filed return. Common errors include wrong PAN of deductee, incorrect challan details, wrong TDS amount, wrong section code, or missing deductees. Corrections are made using NSDL's RPU (Return Preparation Utility) on TRACES by submitting Type 1 (challan correction), Type 2/3 (deductee corrections), or Type 4 (PAN migration) corrections. There is no late fee for correction returns, but the original return must have been filed on time.",
  },
  {
    q: "TDS on property purchase above ₹50 lakh — how does it work?",
    a: "Under Section 194IA, any buyer purchasing immovable property (other than agricultural land) worth ₹50 lakh or more must deduct TDS @ 1% of the total sale consideration. This is done via Form 26QB (an online challan-cum-statement) on the IT portal. There is no TAN requirement for the buyer. The certificate issued to the seller is Form 16B, downloadable from TRACES within 15 days of filing 26QB. This applies to each property transaction, not the aggregate of transactions.",
  },
  {
    q: "What are the common TDS threshold limits I should know?",
    a: "Key TDS thresholds: Salary (Sec 192) — varies by regime (₹2.5L old / ₹3L new, or ₹7L with 87A rebate); Bank interest (Sec 194A) — ₹40,000/year (₹50,000 for senior citizens); Contract payments (Sec 194C) — ₹30,000 per contract / ₹1,00,000 aggregate; Professional/technical fees (Sec 194J) — ₹30,000/year; Rent (Sec 194I) — ₹2,40,000/year; Commission/brokerage (Sec 194H) — ₹15,000/year; Dividend (Sec 194) — ₹5,000/year; Property (Sec 194IA) — ₹50 lakh purchase value.",
  },
];
