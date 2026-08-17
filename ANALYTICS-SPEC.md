# Analytics, Events & UTM Convention

**Deliverable for:** WS-3 of the CAA Digital Presence Master Work Order
**Updated:** 17 August 2026
**Audience:** Marketing (UTM convention, §3) · whoever administers GTM (§2)

---

## 1. Base installation — status

| Item | Status |
|---|---|
| GTM container `GTM-KMKTTDKD` | Snippet + `<noscript>` installed site-wide via `src/components/analytics/Analytics.tsx`. Reads `NEXT_PUBLIC_GTM_ID`. |
| GA4 | Fires **inside the container**. `NEXT_PUBLIC_GA_ID` is deliberately blank so pageviews are not double-counted. |
| Search Console | **External — cannot be done in code.** Confirm `www`/non-`www` and `http`/`https` all resolve to one canonical property. |
| Duplicate legacy tags | **External.** Confirm no analytics tags still fire from the WordPress instance; those disappear when WS-2 decommissioning completes. |

**Two things still gate everything below:**
1. `NEXT_PUBLIC_GTM_ID` must be set in Vercel and the deployment redeployed.
2. **The container must be published at least once.** An unpublished container
   loads an empty container and nothing fires, however correct this code is.

---

## 2. Conversion events — all eight, as specified

Every event in WS-3.2 is implemented. `trackEvent` pushes to `window.dataLayer`
and to `gtag` when present (`src/lib/gtag.ts`).

| Event | Parameters | Fires when | Implemented in |
|---|---|---|---|
| `click_to_call` | `page_path`, `link_position` | Click on **any** `tel:` link | `components/analytics/EventTracking.tsx` |
| `whatsapp_click` | `page_path`, `link_position` | Click on **any** `wa.me` link | `components/analytics/EventTracking.tsx` |
| `contact_form_submit` | `page_path`, `service_interest` | Consultation form returns success | `components/sections/ContactPage.tsx` |
| `newsletter_signup` | `page_path` | Subscribe returns success | `components/forms/NewsletterForm.tsx` |
| `calculator_complete` | `calculator_name` | Visitor reaches a **result** | `components/calculators/CalcInteractionTracker.tsx` |
| `verify_tool_use` | `tool_name` | Tool returns a result | `components/tools/*.tsx` (5 tools) |
| `service_page_scroll_75` | `page_path` | 75% scroll depth on `/services/*` | `components/analytics/EventTracking.tsx` |
| `social_referral_landing` | `source`, `campaign`, `landing_page` | Session arrives from a social source | `components/analytics/EventTracking.tsx` |

### Mark these four as key events in GA4
`click_to_call` · `whatsapp_click` · `contact_form_submit` — per the order's
"Key event: Yes" column. (`newsletter_signup` and below are marked No.)

### Implementation notes worth knowing before you debug

**Calls and WhatsApp use one delegated listener, not per-link handlers.**
There are 136 `tel:` links and 50 `wa.me` links in this codebase, and every new
service page adds more. A single capture-phase listener on `document` catches
all of them, including markup added later. Per-link `onClick` handlers would
guarantee that some page eventually ships untracked.

**`link_position` values.** Resolved from the DOM, most explicit first:

| Value | Source |
|---|---|
| any custom string | nearest ancestor with `data-track-position` |
| `sticky` | the mobile sticky Call/WhatsApp bar |
| `floating_fab` | the floating WhatsApp button by the chat widget |
| `header` | inside `<header>` or `<nav>` |
| `footer` | inside `<footer>` |
| `hero` | inside the first section / `[data-hero]` |
| `body` | everywhere else |

**Two events were removed from individual links to prevent double-counting.**
The mobile sticky bar previously fired its own `call_click` / `whatsapp_click`,
and the floating FAB fired its own `whatsapp_click`. Those handlers are gone —
the delegated listener covers them. Do not add them back.

**Legacy event names still fire alongside the new ones.** `consultation_submit`,
`calculator_used` and `verify_used` are retained because the live container and
its historical reports are keyed to them. Once the container is republished
against the names in the table above, the legacy lines can be deleted — they are
commented as such at each call site.

**`calculator_complete` means a result, not a click.** The tracker watches its
own subtree for a `[data-calc-result]` element with text in it, and only after a
first interaction. Several calculators render a result from their default state
on mount; counting that would make the event a second pageview metric reporting
100% completion. All 27 calculators are covered — 16 through the shared
`HeroResult` component, 11 by an explicit attribute on their result panel.

**`social_referral_landing` fires once per session** (`sessionStorage`), on the
landing page only. A `utm_medium=social` tag wins over the referrer header,
because a tagged link is a deliberate claim about the campaign and referrers
are increasingly stripped.

### Acceptance testing
Verify all eight in **GA4 DebugView, on desktop and mobile** — mobile
separately, because the sticky bar is mobile-only and is the highest-intent
call surface on the site. Then produce the 7-day baseline report WS-3.5
requires, **stating the date range on it**.

---

## 3. UTM convention — mandatory for every channel

Every social, email and paid link to the website must carry UTMs in exactly
this format. Inconsistent tagging is the commonest reason channel reporting
becomes unusable, and it cannot be fixed retrospectively.

```
https://companyavenueadvisory.com/services/gst-registration
  ?utm_source=linkedin        (linkedin | instagram | youtube |
                               facebook | gbp | newsletter | whatsapp)
  &utm_medium=social          (social | email | cpc | organic_local)
  &utm_campaign=gstr3b_aug26  (topic_month_year — lowercase, underscores)
  &utm_content=carousel_a     (creative variant, optional)
```

**Rules, all mandatory:**

| Rule | Why |
|---|---|
| Lowercase throughout | GA4 treats `LinkedIn` and `linkedin` as two different sources |
| No spaces, ever | They break the URL and split the campaign |
| Underscores, not hyphens, in `utm_campaign` | One convention; pick this one and never mix |
| `utm_campaign` = `topic_month_year` | e.g. `gstr3b_aug26`, `itr_filing_sep26` |
| Only the `utm_source` values listed above | A new source must be added to this document first |
| Link to the **relevant page**, not the homepage | A GST post should land on the GST service page |
| Owned by Marketing | One person owns the convention, or it decays |

**Do not tag internal links.** A UTM on a link between two pages of this site
restarts the session and destroys the attribution of the original source — the
social visit you paid for gets recorded as coming from yourself.

Only `utm_medium=social` triggers `social_referral_landing`. A social link
tagged `utm_medium=cpc` is correct for paid social and will be attributed as
paid; it will not appear in the organic-social event.

---

## 4. Call tracking — NOT implemented, and why

WS-3.3 specifies four tracked numbers (GBP, organic/direct with dynamic number
insertion, paid search, social). **None is implemented, deliberately.**

The order's own NAP CONFLICT WARNING is the reason: dynamic number insertion
conflicts with the NAP consistency requirement, and the number in structured
data, on the contact page and across every directory listing must remain the
canonical business number. WS-10 is simultaneously trying to reconcile a
confirmed address and hours conflict across listings. Introducing swapped phone
numbers into that, before the canonical record is even confirmed in writing,
would create a second consistency problem while solving an attribution one.

The order requires the approach to be agreed with the Principal first. It has
not been, so nothing was built.

**When it is agreed, the safe shape is:** keep the canonical number in
`src/lib/nap.ts` — which feeds the footer, contact page, city pages, llms.txt
and the `ProfessionalService` schema — and inject tracked numbers **only** into
marketing-surface CTAs, never into the schema or the contact page. The single
source of truth in `nap.ts` is what makes that separation enforceable.

In the meantime, `click_to_call` with `link_position` already answers the
question call tracking was mostly wanted for: which CTA and which page produce
calls. What it cannot do is attribute a call to a paid keyword or measure calls
that connect but are never clicked.

---

## 5. Files

| Concern | File |
|---|---|
| Event helper | `src/lib/gtag.ts` |
| GTM / GA4 install | `src/components/analytics/Analytics.tsx` |
| Delegated + scroll + referral events | `src/components/analytics/EventTracking.tsx` |
| Mounted site-wide | `src/components/layout/SiteChrome.tsx` |
| Form submit event | `src/components/sections/ContactPage.tsx` |
| Newsletter event | `src/components/forms/NewsletterForm.tsx` |
| Calculator completion | `src/components/calculators/CalcInteractionTracker.tsx` |
| Verification tools | `src/components/tools/*.tsx` |
