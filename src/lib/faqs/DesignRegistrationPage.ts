// FAQ content for DesignRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is design registration and what does it protect?",
    a: "Design registration under the Designs Act, 2000 protects how a product looks. This covers its shape, configuration, pattern, ornament, or mix of lines and colours. It protects only the look, not how the product works. It does NOT protect: (1) functional or technical features; (2) trade marks or copyright (these need separate registration); (3) any part not visible in normal use. The owner gets the sole right to use the design on the registered article for 10 years. This can be renewed for 5 more years.",
  },
  {
    q: "What is the difference between design registration and trademark?",
    a: "Design registration protects the look (shape, pattern, ornament) of a specific article for 15 years. It is tied to the article. You register a chair design, a bottle shape or a textile pattern for specific goods. A trademark protects a brand sign (name, logo, slogan, colour mix) that sets your goods or services apart. It can be renewed indefinitely. You can have both. A distinctive bottle shape can be a design (15 years of exclusive protection) and a trademark (brand protection with no end date).",
  },
  {
    q: "What is the Locarno Classification used in design registration?",
    a: "The Locarno Classification is an international system for grouping industrial designs. It comes from the Locarno Agreement (1968). India uses it for design registration. It sorts all articles into 32 classes and many subclasses, by function and use. For example, Class 6 is furniture, Class 11 is articles of adornment and Class 26 is lighting. You must choose the right class when you file. The wrong class can cause problems in examination.",
  },
  {
    q: "What is the novelty requirement for design registration?",
    a: "Under the Designs Act, 2000, a design must be &ldquo;new or original&rdquo;. This means: (1) it must not already be registered in India, for the same or any other article; (2) it must not have been published in India or abroad before you apply; (3) it must not be functional, and must be applied to the article only for its look. You cannot register a design that is just a mechanical device, a building method or principle, or against public order or morality.",
  },
  {
    q: "How long does design registration take in India?",
    a: "In India, design registration typically takes 6 to 12 months from the application date. The steps are: first examination (1-3 months); a First Examination Report if there are queries (another 2-3 months); your reply to any objections; and final registration and publication in the Designs Journal. With no objections and a complete application, it can take just 6 months. Incomplete drawings and the wrong class are the most common causes of delay.",
  },
  {
    q: "What are the penalties for design infringement in India?",
    a: "Section 22 of the Designs Act, 2000 covers anyone who: (1) uses a registered design on an article without the owner's consent; or (2) imports or sells such an article without consent. They must pay the owner up to ₹25,000 per claim. The owner can recover this as a contract debt in a civil case. The owner can also sue for an injunction and damages in a District Court or High Court.",
  },
  {
    q: "Can I register a design that has already been commercially used?",
    a: "It depends on when you started using it. If the design was published or disclosed for business in India before you filed, it may no longer be new. Then it cannot be registered. But convention priority gives some protection. If you first filed in a Paris Convention country (such as the USA or EU), you can claim priority and file in India within 6 months. Your Indian filing then counts from the foreign filing date. This protects you even if the design was disclosed between the two filings.",
  },
  {
    q: "What is the Hague System for international design protection?",
    a: "The Hague System, administered by WIPO (World Intellectual Property Organization), is an international registration system that allows a design owner to seek protection in multiple countries through a single international application. India is a member of the Hague Agreement. By filing one application in WIPO, you can designate up to 95+ member countries for design protection, paying a single set of fees rather than separate fees for each country. This is highly cost-effective for companies seeking global protection for their product designs.",
  },
];
