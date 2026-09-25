/**
 * Assert-based checks for the GA4 offline-conversion payload shaping in ga4.ts.
 *
 * No framework, no network. Run it:
 *   node src/lib/ga4.test.mjs
 */
import assert from "node:assert/strict";
import { buildDealWonPayload } from "./ga4.ts";

let passed = 0;
const check = (name, fn) => {
  fn();
  passed++;
  console.log(`  ok  ${name}`);
};

check("buildDealWonPayload: maps client_id and event params through", () => {
  const payload = buildDealWonPayload({
    gaClientId: "GA1.2.3.4",
    dealId: "1427152000000999001",
    dealName: "Rao Trademark Filing",
    amount: 15000,
    currency: "INR",
  });
  assert.equal(payload.client_id, "GA1.2.3.4");
  const [event] = payload.events;
  assert.equal(event.name, "deal_won");
  assert.equal(event.params.transaction_id, "1427152000000999001");
  assert.equal(event.params.value, 15000);
  assert.equal(event.params.currency, "INR");
  assert.equal(event.params.deal_name, "Rao Trademark Filing");
});

check("buildDealWonPayload: defaults currency to INR", () => {
  const payload = buildDealWonPayload({ gaClientId: "GA1.2.3.4", dealId: "123" });
  assert.equal(payload.events[0].params.currency, "INR");
});

check("buildDealWonPayload: unset amount/name serialize away rather than sending null", () => {
  const payload = buildDealWonPayload({ gaClientId: "GA1.2.3.4", dealId: "123" });
  const wire = JSON.parse(JSON.stringify(payload));
  assert.equal("value" in wire.events[0].params, false);
  assert.equal("deal_name" in wire.events[0].params, false);
});

console.log(`\n${passed} check(s) passed.`);
