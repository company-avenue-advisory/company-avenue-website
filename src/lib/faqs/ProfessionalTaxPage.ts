// FAQ content for ProfessionalTaxPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "Which states have Professional Tax in India?",
    a: "Professional Tax is levied in 21 states including Maharashtra, Karnataka, West Bengal, Tamil Nadu, Andhra Pradesh, Telangana, Gujarat, Madhya Pradesh, Assam, Bihar, Jharkhand, Kerala, Meghalaya, Odisha, Puducherry, Sikkim, Tripura, and a few others. States like Delhi, Rajasthan, Haryana, Punjab, and Uttar Pradesh do not levy PT. The slab rates and thresholds vary significantly from state to state.",
  },
  {
    q: "Is Professional Tax applicable on Directors' remuneration?",
    a: "Yes. Directors who draw remuneration from a company are treated as employees for PT purposes in most states. The company must deduct PT from director remuneration as it would from any other employee's salary and deposit it with the state PT authority within the prescribed due dates.",
  },
  {
    q: "What is the difference between Enrollment Certificate (EC) and Registration Certificate (RC)?",
    a: "The Enrollment Certificate (EC) is for self-employed professionals — CAs, Doctors, Lawyers, Architects — who pay PT directly on their own account. The Registration Certificate (RC) is for employers who deduct PT from employees' salaries and deposit it with the state authority. Employers often need both if they are also professionals.",
  },
  {
    q: "What is the maximum Professional Tax amount?",
    a: "The Constitution of India caps Professional Tax at ₹2,500 per person per year. Each state determines its own slabs within this constitutional ceiling. Karnataka levies ₹2,400/year on higher salary brackets, Maharashtra charges up to ₹2,500/year, and other states have their own slabs — always below ₹2,500.",
  },
  {
    q: "Can I claim deduction for Professional Tax under Income Tax?",
    a: "Yes. Under Section 16(iii) of the Income Tax Act, the amount of Professional Tax actually paid during the financial year is allowed as a deduction from your gross salary income. This deduction is available to both employed individuals (on PT deducted by employer) and self-employed professionals (on PT paid directly).",
  },
  {
    q: "When is Professional Tax due — what are the due dates?",
    a: "Due dates for PT deposit and return filing vary by state. In Maharashtra, salary PT returns are filed half-yearly (31st March and 30th September). In Karnataka, it is monthly by the 20th. In West Bengal, returns are annual. You must check the specific state's PT rules for accurate due dates applicable to your business.",
  },
  {
    q: "What are the penalties for non-payment of Professional Tax?",
    a: "Penalties for PT non-compliance vary by state but are typically severe. Maharashtra, for example, levies a penalty of 1.25% per month on unpaid PT plus interest. Karnataka imposes 1.25% per month. Many states also impose a lump sum penalty for late registration. Timely registration and deposit are critical to avoid these charges.",
  },
  {
    q: "Does Professional Tax apply to LLPs?",
    a: "Yes. LLPs operating in PT-applicable states are required to register under PT as employers. Partners drawing remuneration from the LLP may also be liable to PT as self-employed persons depending on the state's rules. The LLP must deduct PT from employee salaries and deposit with the state authority.",
  },
  {
    q: "How do I register for Professional Tax in multiple states?",
    a: "If your business operates in multiple PT states, you need separate PT registrations in each applicable state — there is no central or unified PT registration. Company Avenue Advisory handles multi-state PT registrations simultaneously, giving each state's application the correct local treatment and ensuring timely returns in all states.",
  },
  {
    q: "Is Professional Tax applicable on part-time employees?",
    a: "PT applicability on part-time employees depends on the state. Most states determine PT liability based on the monthly gross salary earned, not employment type. If a part-time employee earns above the state's threshold in a month, PT is deductible. Some states explicitly exempt part-time employees — our team will advise based on your state's rules.",
  },
  {
    q: "What happens if a new employee joins mid-year?",
    a: "When a new employee joins, you must begin deducting PT from the first salary payment if their salary crosses the PT threshold. The employer deposits the deducted amount and includes the new employee in the periodic return filing. The employee does not need a separate PT registration — the employer's RC covers all employees.",
  },
  {
    q: "Is PT registration required before starting operations?",
    a: "PT registration timelines vary by state. In Maharashtra, you must register within 30 days of employing any person. Karnataka requires registration before you start deducting. It is best practice to obtain PT Registration Certificate (RC) before making your first salary payment to avoid penalties for delayed registration.",
  },
];
