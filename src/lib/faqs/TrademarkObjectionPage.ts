// FAQ content for TrademarkObjectionPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is a trademark objection?",
    a: "A trademark objection occurs when the Trade Marks Registry issues an Examination Report raising issues with your trademark application. This report may cite grounds under Section 9 (absolute grounds) or Section 11 (relative grounds) of the Trade Marks Act, 1999. You must respond within 30 days, otherwise your application is deemed abandoned.",
  },
  {
    q: "What are the types of trademark objections?",
    a: "Trademark objections are broadly classified as: (1) Section 9 Absolute Grounds — the mark is descriptive, generic, devoid of distinctive character, deceptive, offensive, or violates public morality; and (2) Section 11 Relative Grounds — the mark is identical or confusingly similar to an already registered or pending trademark for the same or similar goods/services.",
  },
  {
    q: "What is the deadline for filing a trademark objection reply?",
    a: "The statutory deadline to file a reply to the trademark examination report is 30 days from the date of the examination report. An extension can be requested, but timely filing is strongly recommended. If no reply is filed within the deadline, the application is treated as abandoned by the Registry.",
  },
  {
    q: "What happens if I do not file a reply to the examination report?",
    a: "If no reply is filed within the 30-day deadline, the Trade Marks Registry deems your application abandoned. The ₹9,000+ government filing fee is forfeited, and you lose your trademark priority date. You would need to file a fresh application and pay the government fee again, losing valuable time and brand priority.",
  },
  {
    q: "What is a trademark hearing?",
    a: "A trademark hearing is an oral proceeding before the Trade Marks Registrar or a Hearing Officer. If the Registrar is not satisfied with the written reply filed in response to the examination report, they schedule a hearing where both sides can argue their positions. Our experts attend and represent you professionally at these hearings.",
  },
  {
    q: "How can I distinguish my mark from a cited conflicting mark?",
    a: "Distinction can be argued on multiple grounds: (1) phonetic dissimilarity — the marks sound different when spoken; (2) visual dissimilarity — appearance and overall impression differ; (3) conceptual dissimilarity — the marks convey different meanings; and (4) different goods/services — the marks operate in non-competing categories even if the same class. A combination of these arguments is most effective.",
  },
  {
    q: "Can a consent letter from the cited mark owner resolve the objection?",
    a: "Yes. A consent letter (No Objection Certificate) from the registered owner of the cited conflicting mark is a highly effective way to resolve a Section 11 relative grounds objection. The Registrar will typically allow registration if the existing mark owner has provided written consent, as it demonstrates there is no likelihood of confusion in the marketplace.",
  },
  {
    q: "What is honest concurrent use in trademark law?",
    a: "Honest concurrent use under Section 12 of the Trade Marks Act allows registration of a mark even where a similar mark already exists, provided the applicant can prove long and honest prior use of their mark before the registration of the existing mark. An affidavit of concurrent use supported by documentary evidence (invoices, advertisements) is filed as part of the objection reply.",
  },
  {
    q: "How long after filing the reply will a decision be made?",
    a: "After filing the trademark objection reply, the Registry typically takes 6 to 18 months to issue a decision. If a hearing is scheduled, this can extend the timeline further. However, once the Registry accepts the reply, the application proceeds to publication in the Trademark Journal, moving you closer to registration.",
  },
  {
    q: "What happens if the objection is upheld after the hearing?",
    a: "If the Trade Marks Registrar upholds the objection and refuses the trademark application, you have the right to appeal the decision before the Intellectual Property Appellate Board (IPAB) or, in some cases, the High Court under Section 91 of the Trade Marks Act. Our team provides guidance and representation for appeals as well.",
  },
  {
    q: "What is the success rate for trademark objection replies?",
    a: "Professionally drafted trademark objection replies have a success rate of approximately 60–70%. The success rate depends on the nature of the objection (absolute vs relative grounds), the strength of evidence, distinctiveness of the mark, and quality of legal arguments. DIY replies without legal expertise have significantly lower success rates.",
  },
  {
    q: "How much does it cost to file a trademark objection reply?",
    a: "Company Avenue Advisory's trademark objection reply service starts from ₹4,999, which includes analysis of the examination report, drafting the legal counter-statement, evidence compilation guidance, and filing the TM-M form on the trademark portal. Hearing representation is available as an add-on service.",
  },
];
