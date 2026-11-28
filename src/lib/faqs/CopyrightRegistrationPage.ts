// FAQ content for CopyrightRegistrationPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "Is copyright automatic or does it require registration in India?",
    a: "Under the Copyright Act, 1957, protection is automatic from the moment you create an original work. You do not have to register. But registration is strongly advised because: (1) it creates a public record of ownership; (2) it is prima facie proof of ownership in a dispute; (3) it makes a civil suit easier; and (4) customs needs it to stop infringing imports at the border. In practice, unregistered works are harder to enforce.",
  },
  {
    q: "What is the Berne Convention and how does it help Indian copyright holders?",
    a: "The Berne Convention for the Protection of Literary and Artistic Works is a treaty with 180+ member countries. Under it, a copyright registered in one member country is protected in all the others. You do not need to register in each one. India has signed the Berne Convention. So a book, software or film copyrighted in India is automatically protected in the USA, UK, EU and 177 other countries. This suits businesses with a global audience.",
  },
  {
    q: "How long does copyright protection last in India?",
    a: "Under the Copyright Act, 1957, protection lasts for the author's life plus 60 years. In detail: literary, dramatic, musical and artistic works get the author's life plus 60 years from the year of death. Films, sound recordings and photographs get 60 years from the year of publication. Works of the government and international organisations get 60 years from publication. Anonymous works: 60 years from publication. After that, the work enters the public domain.",
  },
  {
    q: "What is the mandatory 30-day waiting period in copyright registration?",
    a: "Section 45 of the Copyright Act makes the Copyright Office wait 30 days after filing before examination starts. In that time, anyone who claims the work can file a formal objection (caveat). If someone objects, the Registrar of Copyrights hears both sides. This stops people registering someone else's work. If no one objects in 30 days, registration goes ahead.",
  },
  {
    q: "Can software code be copyrighted?",
    a: "Yes. Computer programs, including source and object code, are literary works under Section 2(o) of the Copyright Act, 1957. Software can be fully registered in India. When you file, you give part of the source code. The Copyright Office accepts a sample portion so your trade secrets stay safe. Registration protects your software against copying, reverse engineering by competitors and distribution without permission.",
  },
  {
    q: "What are the penalties for copyright infringement in India?",
    a: "In India, copyright infringement is both a civil wrong and a crime. Civil remedies include damages (actual or statutory), an account of profits, an injunction (temporary or permanent) and handover of infringing copies. Under Section 63 of the Copyright Act, a first offence can bring 6 months to 3 years in prison and a fine of ₹50,000 to ₹2,00,000. Repeat offences carry higher penalties. Wilful infringement for business purposes can lead to 1 to 3 years in prison.",
  },
  {
    q: "Can a company own a copyright?",
    a: "Yes. In some cases, a company or other legal entity can own copyright as the &ldquo;author&rdquo;. Under the Copyright Act, when an employee creates a work as part of their job, the employer (including a company) is the first owner. This applies unless an agreement says otherwise. The same goes for work under a contract of service or apprenticeship. Companies can also get copyright from individual creators through a proper assignment agreement.",
  },
  {
    q: "What is the difference between copyright and trademark?",
    a: "Copyright protects original creative work, such as books, music, software, films and art. Protection is automatic from creation, and registration makes it easier to enforce. It stops others copying that specific expression. A trademark protects brand signs, such as company names, logos and slogans, that set your goods or services apart. You must register it for full legal protection and renew it every 10 years. One asset can have both. A logo can be protected by copyright (as artistic work) and by trademark (as a brand sign).",
  },
];
