// FAQ content for DesignRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is design registration and what does it protect?",
    a: "Design registration under the Designs Act, 2000 protects the visual appearance of a product — its shape, configuration, pattern, ornamentation, or composition of lines and colours. It protects only the aesthetic, non-functional aspects of a product. It does NOT protect: (1) functional or technical features of a product; (2) trade marks or copyright (those require separate registration); (3) any part of a product that is not visible during normal use. The registered owner gets an exclusive right to use the design on the registered article for 10 years, renewable for 5 more years.",
  },
  {
    q: "What is the difference between design registration and trademark?",
    a: "Design registration protects the visual appearance (shape, pattern, ornament) of a specific article or product for 15 years. It is article-specific — you register a chair design, a bottle shape, or a textile pattern for specific goods. Trademark protects a brand identifier (name, logo, slogan, colour combination) that distinguishes your goods or services in the marketplace — it can be renewed indefinitely. Both can co-exist: a distinctive bottle shape may be registered both as a design (for 15 years of monopoly protection) and as a trademark (for indefinite brand protection).",
  },
  {
    q: "What is the Locarno Classification used in design registration?",
    a: "The Locarno Classification is an international classification system for industrial designs established by the Locarno Agreement (1968). India uses this classification system in its design registration process. The Locarno system organises all articles into 32 classes and numerous subclasses based on their function and use (e.g., Class 6 for furniture, Class 11 for articles of adornment, Class 26 for lighting apparatus). Correct classification of the article is mandatory when filing a design application — incorrect classification can lead to examination issues.",
  },
  {
    q: "What is the novelty requirement for design registration?",
    a: "Under the Designs Act, 2000, a design must be &ldquo;new or original&rdquo; to be registrable. This means: (1) the design must not have been previously registered in India for the same or any other article; (2) the design must not have been previously published in India or any other country before the date of application; (3) the design must not be functional — it must be applied to an article purely for aesthetic purposes. A design that is a mere mechanical device, a method or principle of construction, or contrary to public order or morality is not registrable.",
  },
  {
    q: "How long does design registration take in India?",
    a: "Design registration in India typically takes 6 to 12 months from the date of application. This includes: preliminary examination (1-3 months), First Examination Report if queries are raised (additional 2-3 months), response to objections if any, and final registration and publication in the Designs Journal. If no objections are raised and the application is complete in all respects, the timeline can be as short as 6 months. Incomplete representations or incorrect classification are the most common causes of delays.",
  },
  {
    q: "What are the penalties for design infringement in India?",
    a: "Under Section 22 of the Designs Act, 2000, any person who: (1) applies a registered design to any article without the consent of the registered proprietor; or (2) imports or sells any article on which a registered design has been applied without consent — is liable to pay a sum not exceeding ₹25,000 per claim to the registered proprietor. This is recoverable as a contract debt through civil proceedings. The registered proprietor can also file a suit for injunction and recovery of damages in a District Court or High Court.",
  },
  {
    q: "Can I register a design that has already been commercially used?",
    a: "This depends on when the commercial use began. If the design was published or commercially disclosed in India before filing the design application, it may lose its novelty and become non-registrable. However, India provides a grace period of some protection through the convention priority system: if you first filed in a Paris Convention country (like the USA or EU), you can claim convention priority and file in India within 6 months, backdating the Indian filing to the original foreign filing date. This protects the application even if there was disclosure between the two filings.",
  },
  {
    q: "What is the Hague System for international design protection?",
    a: "The Hague System, administered by WIPO (World Intellectual Property Organization), is an international registration system that allows a design owner to seek protection in multiple countries through a single international application. India is a member of the Hague Agreement. By filing one application in WIPO, you can designate up to 95+ member countries for design protection, paying a single set of fees rather than separate fees for each country. This is highly cost-effective for companies seeking global protection for their product designs.",
  },
];
