// FAQ content for OPCPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  { q: "What is a One Person Company (OPC)?", a: "An OPC is a company incorporated under the Companies Act, 2013 with only one member who is also typically the director. It combines the benefits of a Private Limited Company — such as limited liability and separate legal identity — with the simplicity of sole ownership." },
  { q: "Who can register an OPC?", a: "Only Indian citizens who are residents of India (stayed ≥182 days in India in the preceding calendar year) can incorporate an OPC. Foreign nationals and NRIs are not eligible." },
  { q: "Can NRIs register an OPC?", a: "No. NRIs and foreign nationals are not eligible to incorporate an OPC. If you are an NRI, a Private Limited Company would be the appropriate structure." },
  { q: "Can an OPC have employees?", a: "Yes. An OPC can hire employees. The single member owns the company, but the company can employ any number of staff under proper employment contracts." },
  { q: "Is GST mandatory for an OPC?", a: "GST registration is required only if annual turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services), or if you supply goods/services inter-state. We advise based on your specific business plan." },
  { q: "Can an OPC raise funding?", a: "An OPC cannot issue equity shares to investors. If you plan to raise angel or VC funding, conversion to a Private Limited Company is required before seeking investment." },
  { q: "Can an OPC convert into a Private Limited Company?", a: "Yes. An OPC can be converted into a Private Limited Company voluntarily or mandatorily (when paid-up capital exceeds ₹50 lakhs or average annual turnover exceeds ₹2 crore for 3 consecutive years). We handle the full conversion process." },
  { q: "What is the role of a nominee in an OPC?", a: "A nominee is an Indian citizen and resident named in the MOA. In the event of the member's death or incapacity, the nominee takes over the OPC, ensuring business continuity. The nominee must give written consent at the time of incorporation." },
  { q: "How many directors are required for an OPC?", a: "A minimum of 1 director is required. The sole member can also be the sole director. A maximum of 15 directors can be appointed." },
  { q: "Can an OPC own property?", a: "Yes. As a separate legal entity, an OPC can own movable and immovable property in its own name, independent of the member." },
  { q: "What are the annual compliance requirements?", a: "OPCs must file AOC-4 (financial statements), MGT-7A (annual return), Income Tax Return, and maintain books of accounts. A statutory audit by a CA is mandatory. Board meetings must be held at least twice a year." },
  { q: "Can OPC have turnover above ₹2 crore?", a: "If an OPC's average annual turnover exceeds ₹2 crore for 3 consecutive financial years, or paid-up capital exceeds ₹50 lakhs, it must mandatorily convert to a Private Limited Company." },
  { q: "How much does OPC registration cost?", a: "Our OPC registration package starts from ₹4,999 inclusive of government fees, DSC, DIN, name filing, incorporation and PAN/TAN. The final quote depends on your state of registration. We provide a full cost breakdown upfront." },
  { q: "How long does OPC registration take?", a: "Typically 7–10 working days from the time all documents are submitted and verified. DSC issuance, name approval and MCA processing are the key steps determining the timeline." },
  { q: "Can I register an OPC completely online?", a: "Yes, 100% online. Document collection, DSC, DIN, name reservation, SPICe+ filing, and certificate delivery are all handled digitally through our secure platform. No government office visit is required." },
];
