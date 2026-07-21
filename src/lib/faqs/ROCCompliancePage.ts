// FAQ content for ROCCompliancePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What are AOC-4 and MGT-7, and why are they mandatory?",
    a: "AOC-4 is the e-form used to file a company's financial statements (Balance Sheet, Profit & Loss Account, and Cash Flow Statement) with the Registrar of Companies (RoC) under Section 137 of the Companies Act, 2013. MGT-7 is the Annual Return form filed under Section 92, disclosing the company's structure, shareholding pattern, director details, and key changes during the year. Both are mandatory for all active private limited companies every financial year.",
  },
  {
    q: "What is the difference between an annual return and financial statements?",
    a: "Financial statements (filed in AOC-4) represent the company's books of accounts — its financial position, profitability, and cash flows for the year. The annual return (filed in MGT-7) is a statutory snapshot of the company's corporate structure — who owns shares, who are the directors, what changes occurred, and other governance details. Both are distinct documents serving different regulatory purposes.",
  },
  {
    q: "Who can sign AOC-4 and MGT-7?",
    a: "AOC-4 must be signed digitally by one director (using DSC) and certified by the company's statutory auditor. MGT-7 must be signed by a director and certified by a Company Secretary (CS) — either an in-house CS or a Practising Company Secretary (PCS) if the company does not have a full-time CS. Companies with paid-up capital of ₹10 crore or more, or turnover of ₹50 crore or more, must mandatorily have a whole-time CS.",
  },
  {
    q: "How is the late filing penalty calculated for AOC-4 and MGT-7?",
    a: "Under the Companies Act, 2013 and the Companies (Registration Offices and Fees) Amendment Rules, an additional fee of ₹100 per day is charged from the day after the due date until the actual filing date. There is no maximum cap — the penalty continues to accumulate indefinitely. For a delay of 6 months, the additional fee alone reaches ₹18,000 on top of the base filing fee.",
  },
  {
    q: "Can I file AOC-4 and MGT-7 after the due date?",
    a: "Yes, late filing is accepted with the daily additional fee. However, very late filing carries additional risks: directors' DINs may be deactivated if the company is flagged as non-compliant, the company may be marked 'Active — Non-Compliant' on the MCA portal, and the company may face difficulty in making other MCA filings until the pending returns are cleared.",
  },
  {
    q: "Is an Annual General Meeting (AGM) mandatory for all companies?",
    a: "Yes. Every company must hold an AGM within 6 months from the close of the financial year (i.e., by 30 September). For newly incorporated companies, the first AGM must be held within 9 months from the close of the first financial year. The RoC can grant an extension of up to 3 months in special circumstances on application before the due date.",
  },
  {
    q: "What if my company is dormant — do I still need to file?",
    a: "Yes, but with a simplified form. Companies that obtain dormant status under Section 455 of the Companies Act must file Form MSC-3 (Return of Dormant Companies) annually with the prescribed fee. This is simpler than the full AOC-4 + MGT-7 filing but is still mandatory every year to maintain dormant status.",
  },
  {
    q: "Are there any relaxations for small companies under the Companies Act?",
    a: "Yes. Small companies (paid-up capital ≤ ₹4 crore and turnover ≤ ₹40 crore) can file MGT-7A (an abridged annual return) instead of the full MGT-7. This is a shorter form with fewer disclosure requirements. They are also exempt from cash flow statement requirements and CARO applicability, reducing the compliance burden significantly.",
  },
  {
    q: "What does the statutory auditor do for annual filing?",
    a: "The statutory auditor examines the company's books of accounts and issues an audit report under Section 143 of the Companies Act. For companies to which it applies, CARO (Companies Auditor's Report Order) must also be issued. The auditor signs the financial statements, certifies AOC-4, and is responsible for reporting any fraud or irregularities discovered during the audit.",
  },
  {
    q: "How can I check my Director Identification Number (DIN) active status?",
    a: "You can check DIN status on the MCA portal at mca.gov.in under 'Find DIN/DPIN' or the 'DIN Services' section. A DIN is deactivated if the director fails to file DIR-3 KYC by 30 September each year. Deactivated DINs must be reactivated by filing DIR-3 KYC with a late fee of ₹5,000 before the director can sign any MCA forms.",
  },
];
