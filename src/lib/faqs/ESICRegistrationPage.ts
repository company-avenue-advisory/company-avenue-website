// FAQ content for ESICRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is the employee threshold for ESIC registration — how is it different from PF?",
    a: "ESIC registration is mandatory for establishments with 10 or more employees, compared to 20 employees for PF. Both thresholds exist in parallel — an establishment with 10–19 employees must register for ESIC but not PF; once headcount reaches 20, both become mandatory. In some states, the ESIC threshold for shops and establishments is also 10. Once covered, the establishment remains covered even if headcount falls below 10.",
  },
  {
    q: "Which employees are covered under ESIC — what is the wage limit?",
    a: "Employees earning a gross monthly wage of ₹21,000 or less are covered under the ESI Act. For persons with disability, the wage ceiling is ₹25,000/month. Employees earning above ₹21,000 are not covered and no ESIC contribution is deducted for them. Coverage is based on gross wages including all allowances except conveyance and certain specified allowances excluded by notifications.",
  },
  {
    q: "What are the exact ESIC contribution percentages for employer and employee?",
    a: "The employer's contribution is 3.25% of gross wages, and the employee's contribution is 0.75% of gross wages — making total ESIC contribution 4% of gross wages. For example, for an employee earning ₹15,000/month: employer pays ₹487.50 and employee pays ₹112.50. Employees earning less than ₹176/day (daily wage workers) are exempt from the employee contribution but the employer still contributes.",
  },
  {
    q: "How do employees avail medical treatment under ESIC?",
    a: "Insured employees can avail cashless medical treatment at ESIC-run hospitals and dispensaries or ESIC-empanelled panel hospitals across India. For OPD treatment, they visit the nearest ESIC dispensary or panel clinic. For hospitalisation, they can go to any ESIC hospital or empanelled private hospital. The ESIC Pehchan Card serves as the identity document for availing treatment. Dependants (spouse, children, parents) are also entitled to medical benefits.",
  },
  {
    q: "What is the maternity benefit duration under ESIC?",
    a: "Under the ESI Act (enhanced in line with the Maternity Benefit Act, 2017), a woman employee is entitled to 26 weeks of paid maternity leave for the first two children. For the third child onwards, the benefit is 12 weeks. For miscarriage or MTP, 6 weeks of leave is allowed. The employee must have contributed for at least 70 days in the preceding two contribution periods. Maternity benefit is paid at 100% of the employee's average daily wages.",
  },
  {
    q: "What happens if an employee's salary crosses ₹21,000 mid-year?",
    a: "If an insured employee's wages cross ₹21,000 during a contribution period (April–September or October–March), ESIC contributions continue till the end of that contribution period. The employee exits coverage from the start of the next contribution period. This is called 'continuation of coverage' to avoid disruption of benefits mid-period. The employer must update the ESIC portal with the revised wage information.",
  },
  {
    q: "How does the ESIC inspection process work?",
    a: "ESIC inspectors (Social Security Officers) conduct inspections under Section 45 of the ESI Act. They can inspect wage registers, attendance records, ECR challans, muster rolls, and employee lists. Employers must maintain: form 6 (register of employees), contribution challans, wage sheets, and attendance registers for 5 years. Non-maintenance attracts penalty under Section 85. Company Avenue keeps all records updated and inspection-ready.",
  },
  {
    q: "Can an employer register voluntarily under ESIC below 10 employees?",
    a: "Yes. Under Section 1(5) of the ESI Act, an employer with fewer than 10 employees (or below the applicable threshold) can voluntarily opt to cover their establishment. Once voluntary coverage is approved by the regional ESIC office, the employer and employees must maintain contribution payments. Voluntary coverage provides employees all the benefits of the ESI Act — medical, sickness, maternity, and disablement benefits.",
  },
  {
    q: "How do employees access the ESIC panel hospital network?",
    a: "ESIC has a network of 159 hospitals, 42 hospital annexures, 1,500+ dispensaries, and 7,000+ empanelled private hospitals and clinics across India. Insured employees use their Pehchan Card (ESIC health card) and IP number for identification. For specialist treatment or hospitalisation, a referral from the ESIC dispensary or panel doctor is required. In emergencies, employees can directly approach any ESIC hospital without a referral.",
  },
  {
    q: "What is the key difference between ESI coverage and a group mediclaim insurance policy?",
    a: "ESIC provides comprehensive social security including medical, sickness cash benefit, maternity, disablement, and dependent benefits — funded through employer-employee contributions. Mediclaim only covers hospitalisation expenses. Key differences: ESIC covers OPD, whereas most mediclaim policies do not; ESIC sickness benefit pays 70% of wages during illness; ESIC maternity benefit pays full wages for 26 weeks; ESIC covers dependants of employees. However, ESIC only covers employees earning ≤₹21,000/month and is network-bound.",
  },
];
