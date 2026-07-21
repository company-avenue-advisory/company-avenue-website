// FAQ content for PFRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "Who must register for PF — what is the 20-employee threshold?",
    a: "Under the Employees&apos; Provident Funds and Miscellaneous Provisions Act, 1952, every establishment with 20 or more employees is mandatorily required to register. All categories of employees are counted — permanent, contract, and probationary. Once the threshold is crossed, registration must be done within 30 days. After registration, the employer continues to be covered even if headcount falls below 20.",
  },
  {
    q: "Can an employer voluntarily register for PF with fewer than 20 employees?",
    a: "Yes. Under Section 1(4) of the EPF Act, an employer and the majority of employees can agree to voluntarily cover the establishment. The employer must apply to the Regional PF Commissioner and once accepted, all provisions of the Act apply as if the establishment was mandatorily covered. This is useful for attracting employees who value retirement benefits.",
  },
  {
    q: "What is the employee and employer PF contribution breakdown?",
    a: "The employee contributes 12% of basic wages + dearness allowance to the EPF account. The employer also contributes 12% — but this is split: 3.67% goes to the EPF account and 8.33% goes to the Employees' Pension Scheme (EPS). Additionally, the employer pays 0.50% towards EDLI (insurance) and 0.85% as administrative charges, making the total employer outgo approximately 13.15% of basic salary.",
  },
  {
    q: "How does PF withdrawal work and what forms are required?",
    a: "Employees can withdraw PF using online claims via the EPFO member portal (using UAN + Aadhaar-seeded account) or physical forms. Form 19 is used for final PF settlement, Form 10C for EPS withdrawal or scheme certificate, and Form 31 for partial advances (house purchase, education, medical emergencies). Online claims are generally settled within 3-5 working days, while physical claims may take 15-20 days.",
  },
  {
    q: "What is UAN and how does it help employees switching jobs?",
    a: "UAN (Universal Account Number) is a 12-digit number allotted by EPFO to each member. It stays constant throughout an employee's career regardless of how many employers they work for. When switching jobs, the employee simply provides the UAN to the new employer who links a new member ID under the same UAN. This allows seamless transfer of PF balance without withdrawal, preserving the continuity of contributions.",
  },
  {
    q: "What is the difference between Form 19 and Form 10C?",
    a: "Form 19 is for settlement of the EPF (Provident Fund) account — the accumulated PF corpus with interest. Form 10C is for claiming the EPS (Pension Scheme) balance — it allows either withdrawal of pension corpus (if service is less than 10 years) or a scheme certificate for employees with 10+ years of service who want to preserve pension benefits. Both can be filed simultaneously for full and final PF settlement.",
  },
  {
    q: "Is PF calculated on total salary or basic salary?",
    a: "PF contributions are calculated on 'basic wages' which includes basic salary and dearness allowance (DA), but typically excludes HRA, conveyance, special allowance, and other non-standard components. The statutory ceiling for contribution calculation is ₹15,000 per month — meaning even if basic salary exceeds ₹15,000, the employer's obligation is capped at 12% of ₹15,000 (₹1,800) unless employer opts to contribute on actual salary.",
  },
  {
    q: "What is the EDLI insurance cover under PF and how much is the maximum?",
    a: "EDLI (Employees' Deposit Linked Insurance) is a life insurance scheme linked to PF membership. In the event of an employee's death during service, the nominee receives a lump sum benefit. The maximum EDLI benefit was enhanced to ₹7 lakh. The employer pays 0.50% of basic wages as EDLI premium — there is no employee contribution. The minimum assurance benefit is ₹2.5 lakh.",
  },
  {
    q: "Is the employer's PF contribution tax-deductible?",
    a: "Yes. The employer's contribution to the EPF is fully deductible as a business expense under Section 36(1)(iv) of the Income Tax Act, 1961. However, the deduction is available only if the contribution is deposited on or before the due date — if deposited late, the deduction is disallowed for that year. Timely payment is therefore critical both for compliance and tax efficiency.",
  },
  {
    q: "What happens during an EPFO inspection — what records must an employer maintain?",
    a: "EPFO officers conduct surprise inspections under Section 13 of the EPF Act. Employers must maintain: Form 3A (member-wise contribution register), Form 6A (annual statement), wages register, attendance register, Form 5 (new employees), Form 10 (employees leaving), ECR challans, and bank payment receipts for the past 5 years. Non-maintenance of records attracts penalties and prosecution. Company Avenue keeps all records updated and inspection-ready.",
  },
];
