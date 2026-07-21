// FAQ content for CopyrightRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "Is copyright automatic or does it require registration in India?",
    a: "Under the Copyright Act, 1957, copyright protection is automatic from the moment of creation of an original work. You do not need to register copyright to obtain protection. However, registration is strongly recommended because: (1) it creates a public record of ownership; (2) it is prima facie evidence of ownership in legal disputes; (3) it enables you to file a civil suit more effectively; and (4) it is required for customs border protection against infringing imports. Unregistered works are harder to enforce in practice.",
  },
  {
    q: "What is the Berne Convention and how does it help Indian copyright holders?",
    a: "The Berne Convention for the Protection of Literary and Artistic Works is an international treaty with 180+ member countries. Under this convention, a copyright registered in one member country automatically receives protection in all other member countries without the need for separate registration in each country. India is a signatory to the Berne Convention. This means a book, software, or film copyrighted in India is automatically protected in the USA, UK, EU, and 177 other countries, making it ideal for global content businesses.",
  },
  {
    q: "How long does copyright protection last in India?",
    a: "Under the Copyright Act, 1957, copyright protection lasts for the lifetime of the author plus 60 years. Specifically: for literary, dramatic, musical, and artistic works — the author&apos;s life plus 60 years from the year of death; for cinematographic films, sound recordings, and photographs — 60 years from the year of publication; for government and international organisation works — 60 years from publication. Anonymous works: 60 years from publication. After this period, the work enters the public domain.",
  },
  {
    q: "What is the mandatory 30-day waiting period in copyright registration?",
    a: "Section 45 of the Copyright Act requires the Copyright Office to wait 30 days after an application is filed before proceeding to examination. During this period, any third party who believes they have a claim to the work can file a formal objection (caveat). If an objection is received, both parties are given an opportunity of hearing before the Registrar of Copyrights. This objection mechanism prevents fraudulent registration of another person&apos;s work. After 30 days with no objection, the registration proceeds.",
  },
  {
    q: "Can software code be copyrighted?",
    a: "Yes. Computer programs (including source code and object code) are classified as literary works under Section 2(o) of the Copyright Act, 1957. Software is fully eligible for copyright registration in India. When filing, you need to provide a portion of the source code (the Copyright Office allows submission of a representative portion to protect trade secrets). Copyright registration of software provides protection against unauthorised copying, reverse engineering for competitive purposes, and distribution of the software without permission.",
  },
  {
    q: "What are the penalties for copyright infringement in India?",
    a: "Copyright infringement is both a civil wrong and a criminal offence under Indian law. Civil remedies include: damages (actual or statutory), account of profits, injunction (temporary or permanent), and delivery of infringing copies. Criminal penalties under Section 63 of the Copyright Act include imprisonment of 6 months to 3 years and a fine of ₹50,000 to ₹2,00,000 for the first offence. Repeat offences carry higher penalties. Wilful infringement for commercial purposes can lead to imprisonment of 1 to 3 years.",
  },
  {
    q: "Can a company own a copyright?",
    a: "Yes. A company or other legal entity can own copyright as the &ldquo;author&rdquo; in specific circumstances. Under the Copyright Act, when a work is created by an employee in the course of employment, the employer (including a company) is deemed the first owner of the copyright unless there is an agreement to the contrary. For works created under a contract of service or apprenticeship, the employer owns the copyright. Companies can also acquire copyright by assignment from individual creators through properly executed assignment agreements.",
  },
  {
    q: "What is the difference between copyright and trademark?",
    a: "Copyright protects original creative expressions — books, music, software, films, and artistic works — automatically from creation, with registration strengthening enforcement. It prevents copying of the specific expression. Trademark protects brand identifiers — company names, logos, slogans — that distinguish goods and services in the market. It must be registered to get full statutory protection and must be renewed every 10 years. Copyright and trademark can co-exist for the same asset: a logo can be protected by both copyright (as artistic work) and trademark (as brand identifier).",
  },
];
