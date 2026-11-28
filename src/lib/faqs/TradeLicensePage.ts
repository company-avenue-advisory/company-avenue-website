// FAQ content for TradeLicensePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is a Trade License and who issues it?",
    a: "A Trade License is a certificate from the local municipal authority. This may be the Municipal Corporation, Municipal Council, Gram Panchayat or a similar Urban Local Body. It gives you legal permission to run a specific trade or business from a specific premises. It also confirms that the business follows local laws, zoning rules, sanitation rules and safety norms. Each state sets its own rules and fees through its Municipal Corporation Acts and Shop and Establishment Acts.",
  },
  {
    q: "Is Trade License mandatory for all types of businesses?",
    a: "The rules differ by state and municipality. In most Indian cities and towns, you must have a Trade License for: shops and stores, restaurants and food businesses, factories, hotels and lodges, cinemas and entertainment venues, warehouses, professional offices (doctors, lawyers) and service businesses. Some municipalities exempt home-based businesses. Check this with your local municipal authority. Running a business without a required Trade License is an offence under municipal law.",
  },
  {
    q: "When must a Trade License be renewed and what is the penalty for late renewal?",
    a: "In most Indian cities, you must renew your Trade License every year by 31 March. File the renewal before the expiry date. Late renewal usually brings a penalty or late fee. It can range from ₹500 to several thousand rupees, based on the municipality and how late you are. An expired Trade License counts as no licence. Inspectors can seal the premises and impose fines. In serious cases, they can recommend criminal prosecution under municipal law.",
  },
  {
    q: "What is the difference between a Trade License and a GST registration?",
    a: "A Trade License is local permission to run a business from a specific place. It is about the location and how it may be used. GST registration is a tax registration. It lets the business collect and pay Goods and Services Tax. The two are separate and serve different purposes. A Trade License covers one premises, while GST covers the whole business. For GST you need address proof, and a Trade License is often used for this. Most businesses need both.",
  },
  {
    q: "Does a Trade License need to be obtained for each branch?",
    a: "Yes. A Trade License covers one premises only. If you run from several shops, offices or warehouses, you need a separate Trade License for each one. The licence names the exact address it covers. You must apply again, or amend the licence, if you add a location, move, or change the type of business at the same place.",
  },
  {
    q: "What is commercial zoning and why does it matter for Trade License?",
    a: "Zoning is how the city's Master Plan or Development Plan classifies land use. A Trade License is issued only for business allowed in your premises' zone. The zones are: Commercial (shops, offices, restaurants), Industrial (factories, godowns), Mixed-Use (a mix of both) and Residential (homes, where business use is usually not allowed). If your premises is in a residential zone, you may not get a Trade License for a commercial business. Always check the zoning before you sign a lease.",
  },
  {
    q: "Is a NOC from the landlord required for Trade License?",
    a: "Yes. In most municipalities, you need a No Objection Certificate (NOC) from the owner if the premises is rented or leased. The NOC shows the owner agrees to the business being run there. Without it, the authority usually will not issue or renew the Trade License. The rent agreement alone is usually not enough. You need a separate NOC, signed by the landlord, on stamp paper or letterhead.",
  },
  {
    q: "Does the business name on the Trade License need to match the GST and company name?",
    a: "Yes. All your registrations should ideally use the same trading name. The name on the Trade License should match your GST registration, PAN and the company, LLP or firm name with MCA or the relevant authority. A mismatch with your GST name can cause trouble in GST audits, bank checks and government tenders. If you used a different name in the past, amend the Trade License to match your current official name.",
  },
];
