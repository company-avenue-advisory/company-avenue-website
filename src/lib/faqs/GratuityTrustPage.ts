// FAQ content for GratuityTrustPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is a Private Gratuity Trust and why do companies set it up?",
    a: "A Private Gratuity Trust is set up by an employer under the Payment of Gratuity Act, 1972. It funds and manages the company's gratuity payouts. Once the Commissioner of Income Tax approves it under the Income Tax Act (as an &lsquo;approved gratuity fund&rsquo;), payments into it become tax-deductible under Section 36(1)(v). The trust keeps the money separate from the company, so employee claims are protected. Companies set one up to: get a tax deduction on contributions; keep gratuity liability off the balance sheet; comply with AS 15 / Ind AS 19; and show financial discipline to auditors and investors.",
  },
  {
    q: "What is the gratuity formula and how is it calculated?",
    a: "The formula is: (15/26) x Last Drawn Monthly Salary x Number of Years of Completed Service. The 15/26 factor stands for 15 days' wages for each year of service. Salary here means basic salary plus dearness allowance (not HRA, bonus or commission). Completed service is rounded to the nearest 6 months. For example, 4 years 7 months = 5 years, and 4 years 5 months = 4 years. For government employees, the maximum tax-exempt gratuity under the Payment of Gratuity Act is ₹20 lakh. For others, the tax-exempt limit is also ₹20 lakh under Section 10(10) of the Income Tax Act.",
  },
  {
    q: "What is an actuarial valuation and why is it mandatory?",
    a: "An actuarial valuation estimates a company's future gratuity cost. A Fellow of the Institute of Actuaries of India (FIAI) does it. It uses statistical models to work out the Present Value of Obligation (PVO). That is how much money the company needs today to cover all future gratuity payments. It assumes a rate of salary growth, a discount rate (based on government security yields), a staff turnover rate and Indian mortality tables. AS 15 and Ind AS 19 require a yearly valuation for defined benefit plans, and gratuity is one. Without it, the accounts cannot properly show the gratuity liability.",
  },
  {
    q: "Under which section of the Income Tax Act are contributions deductible?",
    a: "An employer's payments to an approved gratuity fund are a deductible business expense under Section 36(1)(v) of the Income Tax Act, 1961. The fund must be approved by the Commissioner of Income Tax under Part C of the Fourth Schedule to the Income Tax Act. Without that approval, there is no deduction. Unapproved funds, or provisions without a funded trust, are deductible only when the payment is actually made (Section 37 basis).",
  },
  {
    q: "What are the investment norms for a Private Gratuity Trust?",
    a: "The trust must invest as Rule 67 of the Income Tax Rules allows. Approved investments are: (1) central and state government securities; (2) deposits with public sector banks; (3) deposits with development banks (NABARD, NHB, SIDBI); (4) life insurance policies from IRDA-approved insurers; (5) units of UTI and SEBI-regulated mutual funds; (6) bonds of public sector undertakings. The trust cannot buy shares of the sponsoring company or its group. The IT Department checks this at approval and in later assessments.",
  },
  {
    q: "What is the difference between AS 15 and Ind AS 19 for gratuity accounting?",
    a: "AS 15 (Employee Benefits) applies to companies that follow Indian GAAP. These are usually companies below the Ind AS threshold. It requires an actuarial valuation using the Projected Unit Credit method. It also requires disclosure of the gratuity obligation, plan assets and actuarial gain/loss. Ind AS 19 (Employee Benefits) is the IFRS-based standard for listed companies and larger unlisted ones. Under Ind AS 19, actuarial gains and losses go to Other Comprehensive Income (OCI), not the Profit & Loss Account. Under AS 15, they can be amortised through P&L. Both need a yearly valuation by a qualified actuary.",
  },
  {
    q: "What tax returns does the gratuity trust need to file?",
    a: "For tax, an approved gratuity trust is a separate legal entity. It must: (1) get its own PAN (Permanent Account Number); (2) file an Income Tax Return (ITR-7) every year; (3) keep books separate from the company; (4) report investment income, contributions received and gratuity paid in the year; and (5) handle TDS on investment income where needed. Any investment income of the trust may be exempt under Section 10, subject to conditions. The trust deed typically requires a yearly audit by a practising CA.",
  },
  {
    q: "Can an existing ULIP or group gratuity policy replace a Private Gratuity Trust?",
    a: "No. A group gratuity policy from a life insurer (such as the LIC Group Gratuity Scheme) is an alternative, but it is not the same. Under a group policy, the employer pays premiums and the insurer manages the fund. This is simpler but gives less control. The premiums are deductible under Section 36(1)(v) if the insurer is IRDA-approved. A Private Gratuity Trust gives the employer more control over investments and running the fund. It may also earn better returns. Larger companies with strong HR and finance teams tend to prefer it.",
  },
];
