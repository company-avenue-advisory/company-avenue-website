// FAQ content for PrivateLimitedPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  { q: "What is a Private Limited Company?", a: "A Private Limited Company is a separate legal entity incorporated under the Companies Act, 2013. It has limited liability, continuous existence and can raise equity capital. It is one of the most preferred business structures in India." },
  { q: "How many directors are required?", a: "A minimum of 2 directors are required. A maximum of 15 directors can be appointed. At least one director must be a resident of India (stayed in India for 182 days in the previous calendar year)." },
  { q: "How long does company registration take?", a: "Typically 7–10 working days from the time all documents are submitted. The exact timeline depends on MCA processing speed and document completeness." },
  { q: "Can NRIs register a Private Limited Company?", a: "Yes. NRIs and foreign nationals can be directors and shareholders. Additional documents such as apostilled passports and OCI/PIO cards may be required." },
  { q: "Is physical presence required?", a: "No. The entire process is 100% online. Documents are uploaded digitally and DSC is done electronically. No visit to any government office is required." },
  { q: "Can registration be completed online?", a: "Yes, completely. From document submission to incorporation certificate — everything is handled digitally through the MCA portal and our secure client platform." },
  { q: "What documents are required?", a: "For directors: PAN, Aadhaar, photograph, bank statement. For the registered office: electricity bill or property tax receipt and NOC from the property owner." },
  { q: "What is the minimum capital requirement?", a: "There is no minimum paid-up capital requirement as per the Companies Amendment Act. You can start with as little as ₹1 as authorised capital, though ₹1 lakh is commonly used." },
  { q: "Do I need GST immediately after incorporation?", a: "Not necessarily. GST registration is mandatory only if your annual turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services), or if you supply inter-state. We advise based on your specific business plan." },
  { q: "What happens after incorporation?", a: "After incorporation you need to open a business bank account, appoint an auditor, set up accounting, and register for GST if applicable. Our team handles all post-incorporation compliance." },
  { q: "What is ROC compliance?", a: "ROC (Registrar of Companies) compliance includes filing annual returns (MGT-7), financial statements (AOC-4), holding board meetings, and maintaining statutory registers. Non-compliance attracts heavy penalties." },
  { q: "Can I convert my LLP into a Private Limited Company?", a: "Yes. LLPs can be converted into Private Limited Companies. The process involves approval from RoC and fulfilling certain conditions. We handle the entire conversion process." },
  { q: "What are annual compliance requirements?", a: "Filing of MGT-7 (Annual Return), AOC-4 (Financial Statements), Income Tax Return, DIR-3 KYC, holding 4 board meetings, maintaining statutory registers and books of accounts." },
  { q: "How much does registration cost?", a: "Our fees start from ₹6,999 inclusive of government fees, DSC charges and professional fees. Final pricing depends on authorised capital and state of incorporation. We provide a detailed breakdown upfront." },
  { q: "Why should I choose Company Avenue?", a: "We combine 15+ years of CA expertise with a fully digital process. Every client gets a dedicated relationship manager, transparent pricing, and end-to-end support from registration through annual compliance." },
];
