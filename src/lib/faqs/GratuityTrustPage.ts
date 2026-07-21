// FAQ content for GratuityTrustPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is a Private Gratuity Trust and why do companies set it up?",
    a: "A Private Gratuity Trust is a trust created by an employer under the Payment of Gratuity Act, 1972 to manage and fund the gratuity obligations of the company. When approved by the Commissioner of Income Tax under the Income Tax Act (as an &lsquo;approved gratuity fund&rsquo;), contributions made to this trust become tax-deductible under Section 36(1)(v). The trust holds the funds separately from the company, ensuring employee gratuity claims are protected. Companies set it up to: get income tax deduction on contributions, manage their gratuity liability off-balance sheet, comply with AS 15 / Ind AS 19, and demonstrate financial discipline to auditors and investors.",
  },
  {
    q: "What is the gratuity formula and how is it calculated?",
    a: "Gratuity is calculated using the formula: (15/26) x Last Drawn Monthly Salary x Number of Years of Completed Service. The 15/26 factor represents 15 days&apos; wages per year of service. Here, salary includes basic salary and dearness allowance (not HRA, bonus, or commissions). Completed service means service rounded to the nearest 6 months (e.g., 4 years 7 months = 5 years; 4 years 5 months = 4 years). The maximum tax-exempt gratuity under the Payment of Gratuity Act for government employees is ₹20 lakh. For non-government employees, the tax-exempt limit is also ₹20 lakh under Section 10(10) of the Income Tax Act.",
  },
  {
    q: "What is an actuarial valuation and why is it mandatory?",
    a: "An actuarial valuation is a scientific assessment of a company&apos;s future gratuity obligation conducted by a Fellow of the Institute of Actuaries of India (FIAI). It uses statistical models to estimate the Present Value of Obligation (PVO) — i.e., how much money the company needs today to meet all future gratuity payments. The valuation uses assumptions including: salary escalation rate, discount rate (based on government security yields), attrition rate, and Indian mortality tables. AS 15 and Ind AS 19 mandate annual actuarial valuation for defined benefit plans (of which gratuity is one). Without actuarial valuation, the financial statements cannot properly disclose gratuity liability.",
  },
  {
    q: "Under which section of the Income Tax Act are contributions deductible?",
    a: "Contributions made by an employer to an approved gratuity fund (approved by the Commissioner of Income Tax under Part C of the Fourth Schedule to the Income Tax Act) are deductible as a business expense under Section 36(1)(v) of the Income Tax Act, 1961. The deduction is allowed only if the trust has obtained the required approval from the Income Tax Commissioner. Unapproved gratuity funds or provisions without a funded trust do not get this deduction — they are only deductible when the actual payment is made (Section 37 basis).",
  },
  {
    q: "What are the investment norms for a Private Gratuity Trust?",
    a: "Trust investments must comply with Rule 67 of the Income Tax Rules, which specifies approved investment avenues. The approved investments include: (1) Government securities (central and state government); (2) Deposits with public sector banks; (3) Deposits with development banks (NABARD, NHB, SIDBI); (4) Life insurance policies from IRDA-approved insurers; (5) Units of UTI and SEBI-regulated mutual funds; (6) Bonds of public sector undertakings. The trust cannot invest in shares of the sponsoring company or its group entities. Compliance with investment norms is verified by the IT Department during approval and subsequent assessments.",
  },
  {
    q: "What is the difference between AS 15 and Ind AS 19 for gratuity accounting?",
    a: "AS 15 (Employee Benefits) is applicable to companies that follow Indian GAAP (generally companies below the Ind AS threshold). It requires actuarial valuation using the Projected Unit Credit method and disclosure of the gratuity obligation, plan assets, and actuarial gain/loss. Ind AS 19 (Employee Benefits) is the IFRS-converged standard applicable to listed companies and larger unlisted companies. Under Ind AS 19, actuarial gains and losses must be recognised in Other Comprehensive Income (OCI) rather than the Profit & Loss Account — a key difference from AS 15 where actuarial gains/losses can be amortised through P&L. Both standards require annual actuarial valuation by a qualified actuary.",
  },
  {
    q: "What tax returns does the gratuity trust need to file?",
    a: "An approved gratuity trust is a separate legal entity for tax purposes. It must: (1) Obtain a PAN (Permanent Account Number) for the trust; (2) File an Income Tax Return (ITR-7) annually; (3) Maintain books of accounts separately from the company; (4) Report investment income, contributions received, and gratuity paid during the year; (5) Ensure TDS compliance on investment income where applicable. The trust&apos;s income (if any) from investments may be exempt under Section 10 subject to conditions. An annual audit of trust accounts by a practising CA is typically required by the trust deed.",
  },
  {
    q: "Can an existing ULIP or group gratuity policy replace a Private Gratuity Trust?",
    a: "No. A group gratuity policy from a life insurance company (like LIC Group Gratuity Scheme) is an alternative to a Private Gratuity Trust but is not the same. Under a group policy, the employer pays premiums to the insurance company which manages the fund. This is simpler but provides less control and flexibility. The Premium payments are deductible under Section 36(1)(v) if the policy is from an IRDA-approved insurer. A Private Gratuity Trust provides the employer with more control over investments and administration, potentially better investment returns, and is preferred by larger companies with sophisticated HR and finance teams.",
  },
];
