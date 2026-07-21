// FAQ content for TrademarkRenewalPage.
// Kept in a plain (non-"use client") module so both the client component that
// renders it and the server page that emits FAQPage JSON-LD can import it —
// values can't cross the client/server boundary out of a "use client" file.

export const faqs = [
  {
    q: "Under which section of the Trade Marks Act is trademark renewal governed?",
    a: "Trademark renewal in India is governed by Section 25 of the Trade Marks Act, 1999. Under Section 25(1), a registered trademark can be renewed for a period of 10 years from the date of the original registration or from the date of the last renewal. Section 25(2) provides a grace period of 6 months after expiry, during which the mark can still be renewed with an additional surcharge. Section 25(3) allows restoration of a trademark that has been removed from the register due to non-payment of renewal fees, subject to an application to the Registrar within one year of removal.",
  },
  {
    q: "What is Form TM-R and when must it be filed?",
    a: "Form TM-R is the application form for renewal of a registered trademark under the Trade Marks Act, 1999. It must be filed with the Trademarks Registry, IP India, within 6 months before the expiry of the current registration period (i.e., up to 6 months before the 10-year expiry date) to renew without surcharge. If filed during the grace period (within 6 months after expiry), a surcharge of 50% of the renewal fee is levied. After the grace period expires, the trademark is removed from the register, and restoration must be applied for under Section 25(3).",
  },
  {
    q: "What is the government fee for trademark renewal in India?",
    a: "The current government fee for trademark renewal (per class) via e-filing on the IP India portal is: ₹9,000 per class for individuals, startups, and small enterprises; ₹10,000 per class for others (companies, large enterprises). If the renewal is filed during the 6-month grace period after expiry, an additional surcharge of 50% of the renewal fee is payable (₹4,500 or ₹5,000 additional per class respectively). Trademarks covering multiple classes require payment for each class separately. Our professional fee is charged additionally over the government fee.",
  },
  {
    q: "What happens if a trademark is not renewed and the grace period lapses?",
    a: "If a trademark is not renewed within the 10-year registration period or during the 6-month grace period, the Trademarks Registry removes the trademark from the register and publishes the removal in the Trademarks Journal. Once removed: (1) the mark no longer has statutory trademark protection; (2) third parties can immediately apply to register the same or similar mark; (3) you cannot file infringement suits based on the removed registration (though common law passing-off rights may continue); and (4) customs protection is lost. Restoration is possible within 1 year of removal but requires an application to the Registrar and payment of both the renewal fee and surcharge.",
  },
  {
    q: "What is trademark restoration and how does it differ from renewal?",
    a: "Trademark restoration under Section 25(3) of the Trade Marks Act applies when a trademark has already been removed from the register due to non-renewal. Restoration must be applied for within one year of the date of removal by filing an application to the Registrar explaining the reasons for non-renewal and paying the full renewal fee plus applicable surcharge. The Registrar has discretion to restore the mark if satisfied that there was sufficient cause for the omission. Restoration is more expensive and uncertain than timely renewal — a restored mark may have gaps in protection during the period it was removed.",
  },
  {
    q: "Can a trademark be renewed in perpetuity?",
    a: "Yes. Under Indian trademark law, there is no limit on the number of times a trademark can be renewed. A trademark can theoretically last forever as long as it is renewed every 10 years and is not cancelled for non-use, genericness, or other grounds. This is one of the key advantages of trademark protection over other forms of IP (patents expire in 20 years, design registration in 15 years, copyright in life+60 years). Famous brands like Coca-Cola, Tata, and Amul have maintained trademark registrations for over 100 years through continuous renewal.",
  },
  {
    q: "Who is eligible to file the TM-R renewal application?",
    a: "The renewal application (TM-R) can be filed by: (1) the registered proprietor of the trademark (the person or entity named in the registration certificate); (2) a licensed trademark agent or attorney on behalf of the registered proprietor under a Power of Attorney; (3) in the case of a deceased proprietor, the legal heirs or successors in title. If the trademark has been assigned or transferred since the original registration, the assignee must first record the assignment with the Trademarks Registry before filing the renewal application as the new proprietor.",
  },
  {
    q: "Can a trademark be renewed in some classes but not others?",
    a: "Yes. If a trademark is registered in multiple classes, the renewal application (TM-R) can be filed for all classes or selectively for some classes. It is common for businesses to renew only those classes in which they are currently active and allow classes for discontinued product lines to lapse. However, selective class non-renewal should be a deliberate strategic decision after reviewing the IP portfolio, as allowing a class registration to lapse may later create difficulties if you re-enter that product category. Each class requires a separate renewal fee payment.",
  },
];
