// FAQ content for PatentRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What can be patented in India?",
    a: "Under the Patents Act 1970, an invention must meet three tests: (1) Novelty: it must be new and not already disclosed anywhere in the world; (2) Inventive Step: it must not be obvious to an expert in the field; and (3) Industrial Applicability: it must be possible to make or use it in some industry. It must be a product or a process. It must not fall in the excluded categories under Section 3 of the Patents Act."
  },
  {
    q: "What cannot be patented in India?",
    a: "Section 3 of the Patents Act 1970 lists what cannot be patented in India. This includes: abstract ideas or theories; maths or business methods; algorithms or computer programs per se; literary, dramatic, musical or artistic works; simple discoveries of scientific principles or natural events; medical treatment or surgery on humans or animals; plants and animals (other than microorganisms); traditional knowledge; and inventions whose main use goes against natural laws. Note that software can be patented if it has a 'technical effect' beyond the normal working of a program on a computer."
  },
  {
    q: "What is the difference between a provisional and complete patent specification?",
    a: "A provisional specification is an early document. It describes the invention in general terms, without detailed claims. Filing it secures your priority date, the date from which novelty is judged. You then have 12 months to file the complete specification. This helps when the invention is still being developed. A complete specification has the full description, drawings, abstract and, most importantly, the claims. The claims define exactly what is protected. You can also skip the provisional and file a complete specification directly."
  },
  {
    q: "What is a PCT application and how does it help?",
    a: "A Patent Cooperation Treaty (PCT) application is an international filing route run by WIPO. With one application in one language, you can seek protection in over 150 member countries. You file it within 12 months of your Indian priority date. Then you 'enter national phase' in each country you want within 30 months of priority. This gives you time to judge the business case before paying for each country. PCT does not give an 'international patent'. Each country grants its own patent. But PCT makes the process much simpler."
  },
  {
    q: "How long does it take to get a patent grant in India?",
    a: "In India, filing to grant usually takes 3 to 5 years. It depends on the technology, the objections raised and how fast you respond. The application is published automatically 18 months after filing. You must file a Request for Examination (Form 18) within 48 months. A First Examination Report usually comes 1–3 years after that request. Replying to the FER and clearing all objections can take more time. Startups and some other categories can use a faster examination route."
  },
  {
    q: "Are patent maintenance fees required after grant?",
    a: "Yes. Once granted, you must pay a renewal fee every year to keep the patent alive. Fees start from the 3rd year from the application date (not the grant date). They go up each year. You pay using Form 4, and you can pay up to 10 years in advance. If you miss a payment, the patent lapses. You can restore it within 18 months of lapse by paying restoration fees and giving a proper reason. Company Avenue sends renewal reminders in advance."
  },
  {
    q: "What are the remedies for patent infringement in India?",
    a: "In India, you can act against infringement through civil and criminal routes. In a civil suit in the District Court or High Court, the patent holder can ask for: a permanent injunction to stop the infringer; damages or an account of profits; seizure and destruction of infringing goods; and handover of infringing articles. Section 118 of the Patents Act makes it a crime to falsely claim a patent. The patent holder can also send a cease and desist notice before going to court."
  },
  {
    q: "What is the working of patent requirement in India?",
    a: "Under Section 146 of the Patents Act, every patent holder and exclusive licensee must file a statement of working (Form 27) every financial year. It is due within three months of the year's end. It shows whether the invention is being used commercially in India, the rough value, and whether public demand is being met. If a patent is not used in India, the government can grant a compulsory license to others. They can then make and sell the product in the public interest."
  },
  {
    q: "What is patent pooling and cross-licensing?",
    a: "In patent pooling, two or more companies share their patents. They often form a pool that many licensees can use on set terms. Cross-licensing is a deal between two companies to license each other's patents. It is often used to avoid court fights when both hold blocking patents. These deals are common in semiconductors, telecom and pharma. They can earn good revenue and lower the risk of litigation."
  },
  {
    q: "Do individuals and startups get a fee concession for patent filing in India?",
    a: "Yes, by a lot. The Indian Patent Office gives an 80% discount on official fees to individuals, DPIIT-recognised startups and MSMEs. For example, the basic filing fee for a complete specification (up to 30 pages and 10 claims) is ₹8,000 for companies. It is only ₹1,600 for individuals, startups and small entities. The discount covers filing, examination, renewal and most other official fees. To claim it, file a self-declaration or the relevant eligibility certificate."
  },
];
