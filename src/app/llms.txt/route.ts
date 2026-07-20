import { SITE_URL } from "@/lib/seo";
import { COMPANY, SERVICES } from "@/lib/constants";

// /llms.txt — a curated, plain-text map of the site for AI agents.
// Honest expectation: major AI *citation* engines (GPTBot, PerplexityBot, ClaudeBot)
// mostly ignore this file and crawl the HTML directly, so it is NOT a ranking lever.
// It IS used by IDE/agentic tools and costs nothing to keep accurate.
export const dynamic = "force-static";

const CITY_PAGES = [
  ["Private Limited Company Registration in Delhi", "/services/private-limited-company-registration-delhi"],
  ["GST Registration in Delhi", "/services/gst-registration-delhi"],
  ["Trademark Registration in Delhi", "/services/trademark-registration-delhi"],
  ["Company Registration in Janakpuri, West Delhi", "/services/company-registration-janakpuri"],
  ["GST Registration in Dwarka", "/services/gst-registration-dwarka"],
  ["Company Registration in Gurgaon", "/services/company-registration-gurgaon"],
  ["Company Registration in Noida", "/services/company-registration-noida"],
];

export function GET() {
  const body = `# ${COMPANY.fullName}

> CA & CS-led business registration, tax and compliance firm based in Janakpuri, New Delhi,
> serving startups, MSMEs and growing businesses across Delhi NCR and India. Services include
> Private Limited / LLP / OPC company registration, GST registration and filing, income tax
> return filing, trademark registration, ROC compliance, accounting, payroll and virtual CFO.

## Key facts

- Business name: ${COMPANY.fullName}
- Website: ${SITE_URL}
- Address: ${COMPANY.address}
- Phone: ${COMPANY.phone}
- Email: ${COMPANY.email}
- Working hours: ${COMPANY.workingHours}
- Primary service areas: Delhi, Janakpuri, Dwarka, West Delhi, Gurgaon (Gurugram), Noida, Delhi NCR, PAN India
- Entity type: Chartered Accountant / Company Secretary advisory firm (AccountingService)

## Local service pages

${CITY_PAGES.map(([t, u]) => `- [${t}](${SITE_URL}${u})`).join("\n")}

## Services

${SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services/${s.id})`).join("\n")}

## Tools

- [Free business & tax calculators](${SITE_URL}/calculators)
- [Verification tools (GST, PAN, company name, trademark class)](${SITE_URL}/verify)

## Contact

- [Contact & free consultation](${SITE_URL}/contact)
- [Pricing](${SITE_URL}/pricing)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
