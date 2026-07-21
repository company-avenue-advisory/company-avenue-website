// FAQ content for FSSAILicensePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What are the three types of FSSAI license?",
    a: "FSSAI has three types of registrations/licenses based on the scale of your food business: (1) Basic Registration — for food businesses with annual turnover below ₹12 lakhs; (2) State License — for businesses with turnover between ₹12 lakhs and ₹20 crores operating in one state; (3) Central License — for businesses with turnover above ₹20 crores, multi-state operations, importers, exporters, and large-scale manufacturers.",
  },
  {
    q: "What is the turnover threshold for each FSSAI license type?",
    a: "Basic Registration applies when annual turnover is below ₹12 lakhs. State License is required when turnover is between ₹12 lakhs and ₹20 crores. Central License is mandatory when turnover exceeds ₹20 crores, or when the business operates across multiple states, or is engaged in import/export of food products.",
  },
  {
    q: "Is FSSAI mandatory for home-based food businesses?",
    a: "Yes. Even home-based food businesses require FSSAI registration if they are selling food commercially. If your annual turnover is below ₹12 lakhs, you need Basic Registration. Above ₹12 lakhs, a State License is required. Home cooks selling on Zomato, Swiggy, or Instagram must obtain the appropriate FSSAI registration before going live on these platforms.",
  },
  {
    q: "What is the FOSCOS portal?",
    a: "FOSCOS stands for Food Safety Compliance System. It is the official online platform operated by FSSAI (fssai.gov.in) for submitting FSSAI license and registration applications, uploading documents, tracking application status, paying fees, and managing renewals. All FSSAI applications in India are processed through this portal.",
  },
  {
    q: "How long does FSSAI license take?",
    a: "Processing timelines vary by license type: Basic Registration typically takes 7 working days. State License takes 30–60 working days including document scrutiny and inspection. Central License takes 60–90 working days due to more stringent review and inspection requirements. Our team follows up proactively to help expedite the process.",
  },
  {
    q: "Which food categories require a Central FSSAI license?",
    a: "The following categories require a Central FSSAI license: dairy and dairy products, meat and meat products, food importers and exporters, food businesses operating in more than one state, large manufacturers with turnover above ₹20 crores, food businesses at ports and airports, and certain high-risk food categories specified by FSSAI regulations.",
  },
  {
    q: "When should I renew my FSSAI license?",
    a: "FSSAI license renewal must be applied at least 30 days before the expiry date to avoid any lapse. You can choose a validity of 1 to 5 years at the time of initial application or renewal. Operating with an expired FSSAI license is treated as operating without a license and attracts the same penalties — up to ₹10 lakhs. We send proactive renewal reminders to our clients.",
  },
  {
    q: "What is an FBO (Food Business Operator)?",
    a: "An FBO (Food Business Operator) is defined under the Food Safety and Standards Act, 2006, as any person or entity that is responsible for ensuring that the food under their control meets the requirements of food law. This includes manufacturers, processors, distributors, retailers, importers, exporters, caterers, and anyone else engaged in any stage of food production, processing, or distribution.",
  },
  {
    q: "What is the penalty for operating without an FSSAI license?",
    a: "Under Section 63 of the Food Safety and Standards Act, 2006, operating a food business without a valid FSSAI license or registration is a punishable offence. Penalties include a fine of up to ₹5 lakhs for basic registration violations and up to ₹10 lakhs for operating without a State or Central license. Repeated violations can lead to business closure and criminal prosecution.",
  },
  {
    q: "Is it mandatory to display the FSSAI license at my premises?",
    a: "Yes. Under the FSS Act 2006 and FSSAI regulations, all Food Business Operators are legally required to prominently display their FSSAI license/registration certificate at their business premises. Additionally, the 14-digit FSSAI number must appear on all food labels, packaging, and online food delivery platform listings as mandated by food labelling regulations.",
  },
  {
    q: "Can I apply for FSSAI license before registering my business?",
    a: "Yes, in some cases. Sole proprietors and individuals can apply for FSSAI license in their personal name before forming a formal business entity. However, for partnerships, companies, and LLPs, the business registration document is a mandatory requirement for the FSSAI application. Our team guides you on the best approach based on your situation.",
  },
];
