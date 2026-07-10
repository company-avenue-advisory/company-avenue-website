import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, IndianRupee, FileText, Building2,
  Scale, Lightbulb, ArrowRight, ShieldCheck, FileCheck, Tag, ClipboardCheck, Search,
  Percent, Wallet, Coins, Home, TrendingUp, PiggyBank, Landmark, LineChart, BadgeIndianRupee, Banknote,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Free Business & Tax Calculators | Company Avenue Advisory",
  description:
    "Free online calculators for Indian businesses — GST calculator, income tax calculator (old vs new regime), TDS rate finder, company registration cost estimator, LLP vs Pvt Ltd comparison, and business structure advisor.",
  keywords: [
    "GST calculator India",
    "income tax calculator 2025-26",
    "TDS rate finder",
    "company registration cost calculator",
    "LLP vs pvt ltd comparison",
    "business structure advisor India",
  ],
};

const TOOLS = [
  {
    slug: "gst-calculator",
    icon: Calculator,
    title: "GST Calculator",
    description:
      "Calculate GST amount (inclusive/exclusive) for all slabs — 5%, 12%, 18%, 28%. Get CGST/SGST or IGST split instantly.",
    keywords: ["GST calculator", "CGST SGST IGST", "GST on services India"],
    badge: "Most Used",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    href: "/calculators/gst-calculator",
  },
  {
    slug: "income-tax-calculator",
    icon: IndianRupee,
    title: "Income Tax Calculator",
    description:
      "Compare Old vs New Regime for FY 2025–26. Includes Sec 87A rebate, standard deduction, HRA, 80C, and more.",
    keywords: ["income tax calculator India 2025", "old vs new regime calculator"],
    badge: "Budget 2025",
    color: "bg-green-50 text-green-600 border-green-100",
    href: "/calculators/income-tax-calculator",
  },
  {
    slug: "tds-rate-finder",
    icon: FileText,
    title: "TDS Rate Finder",
    description:
      "Select any payment type and instantly get the applicable TDS section, rate, and threshold limit.",
    keywords: ["TDS on professional fees", "TDS rate India", "section 194J"],
    badge: null,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    href: "/calculators/tds-rate-finder",
  },
  {
    slug: "company-registration-cost",
    icon: Building2,
    title: "Company Registration Cost Calculator",
    description:
      "Estimate registration cost for Pvt Ltd, LLP, OPC, and more. Includes govt fees, stamp duty, DSC, and professional charges by state.",
    keywords: ["company registration cost India", "pvt ltd registration fees 2024"],
    badge: "Popular",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    href: "/calculators/company-registration-cost",
  },
  {
    slug: "llp-vs-pvt-ltd",
    icon: Scale,
    title: "LLP vs Pvt Ltd Comparison",
    description:
      "Answer 5 quick questions to get a personalised recommendation. Plus a full side-by-side comparison table of 14 key parameters.",
    keywords: ["LLP vs pvt ltd", "which company structure India"],
    badge: null,
    color: "bg-slate-50 text-slate-600 border-slate-200",
    href: "/calculators/llp-vs-pvt-ltd",
  },
  {
    slug: "business-structure-advisor",
    icon: Lightbulb,
    title: "Business Structure Advisor",
    description:
      "6-question quiz that recommends the right business structure — Pvt Ltd, LLP, OPC, Partnership, or Sole Proprietorship — with reasoning.",
    keywords: ["what type of company should I register India"],
    badge: "Interactive",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    href: "/calculators/business-structure-advisor",
  },
  {
    slug: "compliance-cost-calculator",
    icon: ClipboardCheck,
    title: "Annual Compliance Cost Calculator",
    description:
      "Pick your entity type, directors/partners, turnover and headcount — get an itemised breakdown of ROC, audit, ITR, GST and payroll compliance costs for the year.",
    keywords: ["annual compliance cost calculator", "LLP compliance cost", "ROC filing fees"],
    badge: "New",
    color: "bg-rose-50 text-rose-600 border-rose-100",
    href: "/calculators/compliance-cost-calculator",
  },
  {
    slug: "tds-calculator",
    icon: FileText,
    title: "TDS Calculator",
    description:
      "Compute the exact TDS to deduct on any payment — professional fees, rent, contracts, commission — including Section 206AA no-PAN rates.",
    keywords: ["TDS calculator", "TDS deduction", "194J 194C"],
    badge: "New",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    href: "/calculators/tds-calculator",
  },
  {
    slug: "hra-calculator",
    icon: Percent,
    title: "HRA Calculator",
    description:
      "Find how much of your House Rent Allowance is tax-exempt under Section 10(13A), based on salary, rent paid and city.",
    keywords: ["HRA exemption calculator", "house rent allowance", "section 10 13A"],
    badge: null,
    color: "bg-green-50 text-green-600 border-green-100",
    href: "/calculators/hra-calculator",
  },
  {
    slug: "salary-calculator",
    icon: Wallet,
    title: "Salary Calculator",
    description:
      "Convert your CTC into monthly in-hand pay. See the split of gross salary, PF, professional tax and income tax deductions.",
    keywords: ["CTC to in-hand", "take home salary calculator"],
    badge: null,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    href: "/calculators/salary-calculator",
  },
  {
    slug: "gratuity-calculator",
    icon: Coins,
    title: "Gratuity Calculator",
    description:
      "Estimate gratuity payable under the Payment of Gratuity Act, 1972, from your last drawn salary and years of service.",
    keywords: ["gratuity calculator", "gratuity formula", "payment of gratuity act"],
    badge: null,
    color: "bg-amber-50 text-amber-600 border-amber-100",
    href: "/calculators/gratuity-calculator",
  },
  {
    slug: "business-setup-calculator",
    icon: Building2,
    title: "Business Setup Calculator",
    description:
      "Estimate the total cost to start a business — registration, government fees, GST and licences — across every popular structure.",
    keywords: ["business setup cost", "company registration cost India"],
    badge: "New",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    href: "/calculators/business-setup-calculator",
  },
];

const FINANCE_TOOLS = [
  {
    slug: "emi-calculator",
    icon: Banknote,
    title: "EMI Calculator",
    description:
      "Calculate monthly EMI, total interest and total payable for any loan on a reducing-balance basis.",
    keywords: ["EMI calculator", "loan EMI"],
    badge: "Popular",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    href: "/calculators/emi-calculator",
  },
  {
    slug: "home-loan-emi-calculator",
    icon: Home,
    title: "Home Loan EMI Calculator",
    description:
      "Estimate your home loan EMI, total interest outgo and repayment for tenures up to 30 years.",
    keywords: ["home loan EMI", "housing loan calculator"],
    badge: null,
    color: "bg-teal-50 text-teal-600 border-teal-100",
    href: "/calculators/home-loan-emi-calculator",
  },
  {
    slug: "sip-calculator",
    icon: TrendingUp,
    title: "SIP Calculator",
    description:
      "See how a monthly SIP grows over time with the maturity value and estimated returns of your investment.",
    keywords: ["SIP calculator", "mutual fund SIP"],
    badge: "Popular",
    color: "bg-green-50 text-green-600 border-green-100",
    href: "/calculators/sip-calculator",
  },
  {
    slug: "lumpsum-calculator",
    icon: Coins,
    title: "Lumpsum Calculator",
    description:
      "Project the future value of a one-time investment from the amount, expected return and horizon.",
    keywords: ["lumpsum calculator", "one time investment"],
    badge: null,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    href: "/calculators/lumpsum-calculator",
  },
  {
    slug: "mutual-fund-calculator",
    icon: LineChart,
    title: "Mutual Fund Returns Calculator",
    description:
      "Project mutual fund returns in both SIP and lumpsum modes with an invested-vs-returns breakdown.",
    keywords: ["mutual fund calculator", "MF returns"],
    badge: null,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    href: "/calculators/mutual-fund-calculator",
  },
  {
    slug: "compound-interest-calculator",
    icon: Percent,
    title: "Compound Interest Calculator",
    description:
      "Calculate simple and compound interest with yearly, half-yearly, quarterly or monthly compounding.",
    keywords: ["compound interest calculator", "simple interest"],
    badge: null,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    href: "/calculators/compound-interest-calculator",
  },
  {
    slug: "fd-calculator",
    icon: Landmark,
    title: "FD Calculator",
    description:
      "Compute the maturity value and interest on a Fixed Deposit across rates, tenures and compounding options.",
    keywords: ["FD calculator", "fixed deposit maturity"],
    badge: null,
    color: "bg-sky-50 text-sky-600 border-sky-100",
    href: "/calculators/fd-calculator",
  },
  {
    slug: "rd-calculator",
    icon: PiggyBank,
    title: "RD Calculator",
    description:
      "Estimate the maturity value of a Recurring Deposit with consistent monthly deposits and quarterly compounding.",
    keywords: ["RD calculator", "recurring deposit"],
    badge: null,
    color: "bg-rose-50 text-rose-600 border-rose-100",
    href: "/calculators/rd-calculator",
  },
  {
    slug: "ppf-calculator",
    icon: ShieldCheck,
    title: "PPF Calculator",
    description:
      "Project your Public Provident Fund maturity, interest and tax-free returns over 15+ years at the current rate.",
    keywords: ["PPF calculator", "public provident fund"],
    badge: null,
    color: "bg-green-50 text-green-600 border-green-100",
    href: "/calculators/ppf-calculator",
  },
  {
    slug: "epf-calculator",
    icon: BadgeIndianRupee,
    title: "EPF Calculator",
    description:
      "Project your Employees' Provident Fund corpus at retirement with salary growth and the current EPF rate.",
    keywords: ["EPF calculator", "provident fund corpus"],
    badge: null,
    color: "bg-amber-50 text-amber-600 border-amber-100",
    href: "/calculators/epf-calculator",
  },
  {
    slug: "nps-calculator",
    icon: Landmark,
    title: "NPS Calculator",
    description:
      "Estimate your National Pension System corpus at 60 plus the lumpsum, annuity split and monthly pension.",
    keywords: ["NPS calculator", "national pension system"],
    badge: null,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    href: "/calculators/nps-calculator",
  },
  {
    slug: "retirement-calculator",
    icon: IndianRupee,
    title: "Retirement Planning Calculator",
    description:
      "Find the inflation-adjusted corpus you need and the monthly SIP required to retire comfortably.",
    keywords: ["retirement calculator", "retirement corpus"],
    badge: "New",
    color: "bg-slate-50 text-slate-600 border-slate-200",
    href: "/calculators/retirement-calculator",
  },
];

const VERIFY_TOOLS = [
  {
    slug: "gst-verification",
    icon: FileCheck,
    title: "GST Verification",
    description:
      "Instantly check if a GSTIN is active, and pull the registered business name, address and registration date straight from GSTN records.",
    badge: "Most Used",
    color: "bg-green-50 text-green-600 border-green-100",
    href: "/verify/gst-verification",
  },
  {
    slug: "pan-verification",
    icon: ShieldCheck,
    title: "PAN Verification",
    description:
      "Verify a PAN number against name and date of birth, and check its Aadhaar-seeding status — with explicit consent at every step.",
    badge: null,
    color: "bg-blue-50 text-blue-600 border-blue-100",
    href: "/verify/pan-verification",
  },
  {
    slug: "company-verification",
    icon: Building2,
    title: "Company & Director Verification",
    description:
      "Look up any company by CIN/LLPIN, or any director by DIN, and pull live incorporation, capital and appointment data from the MCA registry.",
    badge: "MCA Powered",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    href: "/verify/company-verification",
  },
  {
    slug: "trademark-class-finder",
    icon: Tag,
    title: "Trademark Class Finder",
    description:
      "Describe your business and instantly see which of the 45 NICE trademark classes it likely falls under — then check name availability on IP India.",
    badge: "Free",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    href: "/verify/trademark-class-finder",
  },
  {
    slug: "company-name-search",
    icon: Search,
    title: "Company Name Search",
    description:
      "Check if your proposed company name is already registered — searched live against the MCA's Company Master Data across Pvt Ltd, LLP, Limited and OPC suffixes.",
    badge: "New",
    color: "bg-rose-50 text-rose-600 border-rose-100",
    href: "/verify/company-name-search",
  },
];

export default function CalculatorsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary-900 pt-32 pb-20">
        <div className="container-custom text-center">
          <span className="text-accent text-xs font-heading font-semibold tracking-widest uppercase mb-4 block">
            Free Online Tools
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Calculators & Business Tools
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
            Free, instant tools to estimate taxes, compare business structures, find TDS rates,
            and calculate registration costs — no signup required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/30 text-sm">
            <span>✓ 29 Free Tools</span>
            <span>✓ FY 2025–26 Updated</span>
            <span>✓ No Registration</span>
            <span>✓ Mobile Friendly</span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <section className="py-16 bg-background">
        <div className="container-custom">

          {/* Calculators */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                <Calculator size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-dark text-xl">Calculators & Advisors</h2>
                <p className="text-muted text-sm">Estimate taxes, compare structures and find rates.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white ${tool.color}`}>
                        <Icon size={22} />
                      </div>
                      {tool.badge && (
                        <span className="text-[10px] font-heading font-bold text-accent border border-accent/30 bg-accent/5 px-2.5 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                      {tool.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{tool.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tool.keywords.map((kw) => (
                        <span key={kw} className="text-[10px] font-body text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                          {kw}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                      Open Tool
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1 text-accent" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Financial Calculators */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                <TrendingUp size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-dark text-xl">Financial Calculators</h2>
                <p className="text-muted text-sm">Loans, EMIs, SIP, deposits and retirement planning.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FINANCE_TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white ${tool.color}`}>
                        <Icon size={22} />
                      </div>
                      {tool.badge && (
                        <span className="text-[10px] font-heading font-bold text-accent border border-accent/30 bg-accent/5 px-2.5 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                      {tool.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{tool.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tool.keywords.map((kw) => (
                        <span key={kw} className="text-[10px] font-body text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                          {kw}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                      Open Tool
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1 text-accent" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Verification Tools */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-dark text-xl">Verification Tools</h2>
                <p className="text-muted text-sm">Live government-data lookups — GST, PAN, MCA and trademark.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VERIFY_TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="group bg-white border border-slate-100 hover:border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white ${tool.color}`}>
                        <Icon size={22} />
                      </div>
                      {tool.badge && (
                        <span className="text-[10px] font-heading font-bold text-accent border border-accent/30 bg-accent/5 px-2.5 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                      {tool.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{tool.description}</p>
                    <div className="flex items-center gap-1 text-primary text-xs font-heading font-semibold">
                      Open Tool
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1 text-accent" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-5 bg-white rounded-2xl border border-slate-100 shadow-card max-w-3xl mx-auto text-center">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-dark">Disclaimer:</strong> All calculators are for
              indicative/educational purposes only. Tax laws and rates are subject to change.
              Please consult a qualified CA/CS for exact figures applicable to your situation.
              Company Avenue Advisory is not liable for decisions made solely based on these
              tool outputs.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
