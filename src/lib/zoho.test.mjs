/**
 * Assert-based checks for the Zoho lead payload shaping in zoho.ts.
 *
 * No framework, no network. Run it:
 *   node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/lib/zoho.test.mjs
 *
 * These exist because a wrong picklist value or field name is silently
 * rejected by Zoho rather than throwing — the only way to catch a mapping
 * mistake is to assert the shape before it ever reaches the network call.
 */
import assert from "node:assert/strict";
import { buildZohoLeadPayload, mapServiceToZoho } from "./zoho.ts";

let passed = 0;
const check = (name, fn) => {
  fn();
  passed++;
  console.log(`  ok  ${name}`);
};

check("buildZohoLeadPayload: maps every field through", () => {
  const payload = buildZohoLeadPayload({
    firstName: "Asha",
    lastName: "Rao",
    email: "asha@example.com",
    phone: "9876543210",
    serviceRequired: "GST Registration & Filing",
    city: "New Delhi",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "gst-delhi",
    gclid: "abc123",
    gaClientId: "GA1.2.3.4",
  });
  const [lead] = payload.data;
  assert.equal(lead.Last_Name, "Rao");
  assert.equal(lead.First_Name, "Asha");
  assert.equal(lead.Service_Required, "GST Registration & Filing");
  assert.equal(lead.Lead_Source, "Website");
  assert.equal(lead.UTM_Source, "google");
  assert.equal(lead.Google_Click_ID, "abc123");
  assert.equal(lead.GA_Client_ID, "GA1.2.3.4");
});

check("buildZohoLeadPayload: falls back when name/company are missing", () => {
  const [lead] = buildZohoLeadPayload({ lastName: "" }).data;
  assert.equal(lead.Last_Name, "Website Lead");
  assert.equal(lead.Company, "Not Provided");
});

check("buildZohoLeadPayload: unset optional fields serialize away rather than sending null", () => {
  const [lead] = buildZohoLeadPayload({ lastName: "Rao" }).data;
  // undefined values are dropped by JSON.stringify (what actually goes over
  // the wire to Zoho) even though the keys exist on the JS object here.
  const wire = JSON.parse(JSON.stringify(lead));
  assert.equal("Email" in wire, false);
  assert.equal("City" in wire, false);
  assert.equal("UTM_Source" in wire, false);
});

check("mapServiceToZoho: known site services map to exact Zoho picklist values", () => {
  assert.equal(mapServiceToZoho("Company Registration"), "Company Registration/Incorporation");
  assert.equal(mapServiceToZoho("GST Registration / Filing"), "GST Registration & Filing");
  assert.equal(mapServiceToZoho("Accounting & Bookkeeping"), "Accounting & Bookkeeping");
  assert.equal(mapServiceToZoho("ROC Compliance"), "ROC/ESOP Compliance");
});

check("mapServiceToZoho: unknown or missing service falls back safely", () => {
  assert.equal(mapServiceToZoho("Something New"), "Other Compliance");
  assert.equal(mapServiceToZoho(undefined), undefined);
});

console.log(`\n${passed} check(s) passed.`);
