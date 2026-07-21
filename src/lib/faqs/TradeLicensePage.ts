// FAQ content for TradeLicensePage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "What is a Trade License and who issues it?",
    a: "A Trade License is a certificate issued by the local municipal authority (Municipal Corporation, Municipal Council, Gram Panchayat, or equivalent Urban Local Body) that grants legal permission to carry on a specific trade, business, or commercial activity from a specified premises. It certifies that the business being carried out from the premises complies with applicable local laws, zoning regulations, sanitation requirements, and safety norms. Trade License requirements and fees are governed by state-specific Municipal Corporation Acts and Shop and Establishment Acts.",
  },
  {
    q: "Is Trade License mandatory for all types of businesses?",
    a: "Trade License requirements vary by state and municipality. In most Indian cities and towns, a Trade License is mandatory for: retail shops and stores, restaurants and food businesses, factories and manufacturing units, hotels and lodges, cinema halls and entertainment venues, warehouses and storage facilities, professional offices (doctors, lawyers), and service businesses. Home-based businesses may be exempt in some municipalities, but this should be verified with the local municipal authority. Operating without a required Trade License is an offence under the relevant municipal laws.",
  },
  {
    q: "When must a Trade License be renewed and what is the penalty for late renewal?",
    a: "Trade Licenses in most Indian cities must be renewed annually by 31 March of each year. The renewal application must be filed before the expiry date. Late renewal typically attracts a penalty or late fee ranging from ₹500 to several thousand rupees depending on the municipality and the duration of delay. Operating with an expired Trade License is treated as operating without a license. Municipal inspectors can seal the premises, impose fines, and in serious cases, recommend criminal prosecution under the relevant municipal laws.",
  },
  {
    q: "What is the difference between a Trade License and a GST registration?",
    a: "A Trade License is a local authority permission to conduct business from specific premises — it relates to the physical location and permitted use. GST registration is a central/state tax registration that enables the business to collect and pay Goods and Services Tax. Both are separate, required for different purposes. A Trade License is premises-specific while GST is business-wide. GST registration requires a business address proof, for which Trade License is commonly used. Both are necessary for most commercial operations but serve entirely different regulatory purposes.",
  },
  {
    q: "Does a Trade License need to be obtained for each branch?",
    a: "Yes. A Trade License is premises-specific. If your business operates from multiple locations (multiple shops, offices, or warehouses), a separate Trade License must be obtained from the municipal authority for each individual premises. The license specifies the exact address for which permission is granted. Adding a new location, relocating to a new premises, or changing the nature of business activity at the same premises requires a fresh application or amendment of the existing license.",
  },
  {
    q: "What is commercial zoning and why does it matter for Trade License?",
    a: "Commercial zoning refers to the classification of land use under the city&apos;s Master Plan or Development Plan. Municipal bodies issue Trade Licenses only for business activities permitted in the zone where the premises is located: Commercial Zone (for retail, offices, restaurants), Industrial Zone (for manufacturing, godowns), Mixed-Use Zone (for a combination), and Residential Zone (for homes — commercial use generally not permitted). If your premises is in a residential zone, you may not be eligible for a Trade License for commercial business. Always verify zoning before signing a lease.",
  },
  {
    q: "Is a NOC from the landlord required for Trade License?",
    a: "Yes, in most municipalities, a No Objection Certificate (NOC) from the property owner is required when applying for a Trade License for a rented or leased premises. The NOC confirms that the property owner consents to the business being conducted from the premises. Without the landlord&apos;s NOC, the municipal authority typically will not issue or renew the Trade License. The rent agreement alone is generally not sufficient — a separate NOC on stamp paper or letterhead signed by the landlord is required.",
  },
  {
    q: "Does the business name on the Trade License need to match the GST and company name?",
    a: "Yes, ideally all business registrations should carry the same trading name. The name on the Trade License should match the GST registration, income tax PAN, and company/LLP/firm name as registered with MCA or the relevant authority. Discrepancies between the name on the Trade License and GST registration can cause issues during GST audits, bank account verification, and government tender submissions. If you have operated under a different name historically, the Trade License should be amended to match your current official business name.",
  },
];
