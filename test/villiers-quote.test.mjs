import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";
import { createQuoteHandler } from "../netlify/functions/_lib/villiers-quote.mjs";

const ORIGIN = "https://texasjetquote.com";
const TOKEN = "test-only-never-a-real-affiliate-token";
const TIME = Date.parse("2026-10-31T12:00:00Z");
const trip = { action: "estimate", origin: "Austin", destination: "Aspen", departure_date: "2026-12-15", passengers: 3 };

function memoryStore() {
  const values = new Map();
  return {
    values,
    async setJSON(key, value, options = {}) {
      if (options.onlyIfNew && values.has(key)) return { modified: false };
      values.set(key, structuredClone(value));
      return { modified: true };
    },
    async get(key) { return values.get(key) || null; }
  };
}

function provider({ failConfirmation = false, delayConfirmation } = {}) {
  const calls = [];
  const fetcher = async (url, options) => {
    assert.equal(url, "https://mcp.villiers.ai/mcp");
    assert.equal(options.headers.Authorization, `Bearer ${TOKEN}`);
    const data = JSON.parse(options.body);
    calls.push({ ...data, session: options.headers["Mcp-Session-Id"] });
    if (data.method === "initialize") return Response.json({ jsonrpc: "2.0", id: 1, result: {} }, { headers: { "Mcp-Session-Id": "private-provider-session" } });
    assert.equal(options.headers["Mcp-Session-Id"], "private-provider-session");
    if (data.params.name === "get_jet_estimate") return Response.json({ result: { structuredContent: { route: "AUS → ASE", estimates: [
      { category: "Light Jet", currency: "USD", price_low: 19000, price_high: 24000 }
    ] } } });
    if (delayConfirmation) await delayConfirmation;
    if (failConfirmation) throw new Error("Simulated uncertain network outcome");
    return Response.json({ result: { structuredContent: { status: "received", trip_id: "provider-trip-id", client_reference: data.params.arguments.client_reference,
      message: data.params.arguments.email === "sandbox-test@mail.villiers.ai" ? "Test request accepted (sandbox mode detected)." : "Request received." } } });
  };
  return { calls, fetcher };
}

function request(body, origin = ORIGIN) {
  return new Request(`${ORIGIN}/api/villiers-quote`, { method: "POST", headers: { "Content-Type": "application/json", Origin: origin }, body: JSON.stringify(body) });
}

async function getEstimate(handler) {
  const response = await handler(request(trip));
  assert.equal(response.status, 200);
  return response.json();
}

function confirmation(ticket, overrides = {}) {
  return { action: "confirm", ticket, first_name: "Test", last_name: "Traveler", email: "traveler@example.invalid", consent: true, ...overrides };
}

test("provider estimate precedes an attributed request with the same itinerary and no contact details in stored state", async () => {
  const store = memoryStore(), api = provider();
  const handler = createQuoteHandler({ store, token: TOKEN, fetcher: api.fetcher, now: () => TIME });
  const estimate = await getEstimate(handler);
  assert.deepEqual(estimate.estimates, [{ category: "Light Jet", currency: "USD", low: 19000, high: 24000 }]);
  assert.equal(estimate.providerRoute, "AUS → ASE");
  assert.doesNotMatch(JSON.stringify(estimate), /Austin|Aspen|private-provider-session|affiliate-token/);
  const response = await handler(request(confirmation(estimate.ticket)));
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.status, "received");
  const calls = api.calls.filter((item) => item.method === "tools/call");
  assert.deepEqual(calls.map((item) => item.params.name), ["get_jet_estimate", "request_jet_confirmation"]);
  assert.equal(calls[1].params.arguments.origin, trip.origin);
  assert.equal(calls[1].params.arguments.destination, trip.destination);
  assert.equal(calls[1].params.arguments.departure_date, trip.departure_date);
  assert.equal(calls[1].params.arguments.passengers, trip.passengers);
  assert.equal(calls[1].params.arguments.client_reference, result.reference);
  assert.doesNotMatch(JSON.stringify([...store.values.values()]), /traveler@example|Austin|Aspen|private-provider-session|affiliate-token/);
});

test("consent, valid contact details, valid encrypted ticket, and the originating site are required", async () => {
  const store = memoryStore(), api = provider();
  const handler = createQuoteHandler({ store, token: TOKEN, fetcher: api.fetcher, now: () => TIME });
  const { ticket } = await getEstimate(handler);
  assert.equal((await handler(request(confirmation(ticket, { consent: false })))).status, 400);
  assert.equal((await handler(request(confirmation(ticket, { email: "bad" })))).status, 400);
  assert.equal((await handler(request(confirmation(ticket.slice(0, -3) + "xyz")))).status, 400);
  assert.equal((await handler(request(confirmation(ticket), "https://unrelated.example"))).status, 403);
  assert.equal(api.calls.filter((item) => item.params?.name === "request_jet_confirmation").length, 0);
});

test("an expired estimate cannot be used for a real confirmation", async () => {
  let clock = TIME;
  const api = provider(), store = memoryStore();
  const handler = createQuoteHandler({ store, token: TOKEN, fetcher: api.fetcher, now: () => clock });
  const { ticket } = await getEstimate(handler);
  clock += 21 * 60 * 1000;
  assert.equal((await handler(request(confirmation(ticket)))).status, 400);
  assert.equal(api.calls.filter((item) => item.params?.name === "request_jet_confirmation").length, 0);
});

test("repeated and overlapping submissions do not send the same provider request twice", async () => {
  let release;
  const wait = new Promise((resolve) => { release = resolve; });
  const api = provider({ delayConfirmation: wait }), store = memoryStore();
  const handler = createQuoteHandler({ store, token: TOKEN, fetcher: api.fetcher, now: () => TIME });
  const { ticket } = await getEstimate(handler);
  const first = handler(request(confirmation(ticket)));
  await new Promise((resolve) => setImmediate(resolve));
  const second = await handler(request(confirmation(ticket)));
  assert.equal(second.status, 202);
  release();
  assert.equal((await first).status, 200);
  assert.equal((await handler(request(confirmation(ticket)))).status, 200);
  assert.equal(api.calls.filter((item) => item.params?.name === "request_jet_confirmation").length, 1);
});

test("a timeout is marked uncertain and is never automatically retried", async () => {
  const api = provider({ failConfirmation: true }), store = memoryStore();
  const handler = createQuoteHandler({ store, token: TOKEN, fetcher: api.fetcher, now: () => TIME });
  const { ticket } = await getEstimate(handler);
  const first = await handler(request(confirmation(ticket)));
  assert.equal(first.status, 202);
  assert.equal((await first.json()).status, "uncertain");
  assert.equal((await handler(request(confirmation(ticket)))).status, 202);
  assert.equal(api.calls.filter((item) => item.params?.name === "request_jet_confirmation").length, 1);
});

test("the provider sandbox is reported as a test and never presented as a real quote", async () => {
  const api = provider(), store = memoryStore();
  const handler = createQuoteHandler({ store, token: TOKEN, fetcher: api.fetcher, now: () => TIME });
  const { ticket } = await getEstimate(handler);
  const body = confirmation(ticket, { email: "sandbox-test@mail.villiers.ai" });
  assert.equal((await (await handler(request(body))).json()).status, "sandbox");
  assert.equal((await (await handler(request(body))).json()).status, "sandbox");
  assert.equal(api.calls.filter((item) => item.params?.name === "request_jet_confirmation").length, 1);
});

test("missing affiliate credentials fail closed, and trip handoffs preserve the normal tracked fallback", async () => {
  const handler = createQuoteHandler({ store: memoryStore(), token: "", fetcher: provider().fetcher, now: () => TIME });
  assert.equal((await handler(request(trip))).status, 503);
  const html = await readFile(new URL("../request-quote/index.html", import.meta.url), "utf8");
  const home = await readFile(new URL("../assets/app.47950ff22bd4a.js", import.meta.url), "utf8");
  assert.match(html, /https:\/\/villiers\.ai\/\?id=1673/);
  assert.equal((home.match(/href:"\/request-quote\/",onClick:\(\)=>window\.TJQQuoteHandoff/g) || []).length, 4);
  const floatingPlanner = home.slice(home.indexOf('children:"TEXASJETQUOTE PLANNER"'));
  const savedPlan = floatingPlanner.slice(floatingPlanner.indexOf('r==="confirmed"'), floatingPlanner.indexOf('children:"New Trip Plan"'));
  assert.match(savedPlan, /href:"\/request-quote\/",onClick:\(\)=>window\.TJQQuoteHandoff\?\.\(\{origin:l\.from,destination:l\.to,departure_date:l\.date,passengers:l\.pax\}\)/);
  assert.doesNotMatch(savedPlan, /target:"_blank"|href:Cn/);
});

test("homepage handoff retains the selected date and clears a date when a new trip leaves it blank", async () => {
  const source = await readFile(new URL("../assets/villiers-handoff.js", import.meta.url), "utf8");
  const listeners = {}, saved = new Map();
  const document = { addEventListener(name, fn) { listeners[name] = fn; } };
  const window = { sessionStorage: { setItem(key, value) { saved.set(key, value); } } };
  vm.runInNewContext(source, { document, window, Date });
  const field = { value: "2026-12-15", matches: () => true };
  listeners.input({ target: field });
  window.TJQQuoteHandoff({ origin: "Dallas", destination: "Miami", passengers: 3 });
  assert.equal(JSON.parse(saved.get("tjq-villiers-trip-v1")).departure_date, "2026-12-15");
  const button = { textContent: "Get Transparent Range", parentElement: { querySelector: () => ({ value: "" }) } };
  listeners.click({ target: { closest: () => button } });
  window.TJQQuoteHandoff({ origin: "Austin", destination: "Aspen", passengers: 2 });
  assert.equal(JSON.parse(saved.get("tjq-villiers-trip-v1")).departure_date, "");
});

test("the Ads conversion fires only for an acknowledged real request, never for sandbox or uncertain responses", async () => {
  const source = await readFile(new URL("../assets/villiers-quote.js", import.meta.url), "utf8");
  async function runCase(email, providerStatus) {
    const elements = new Map(), events = [], listeners = {};
    const element = (id) => {
      if (!elements.has(id)) elements.set(id, {
        value: "", textContent: "", hidden: false, disabled: false, checked: true,
        callbacks: {}, addEventListener(name, fn) { this.callbacks[name] = fn; },
        reportValidity: () => true, focus() {}, replaceChildren() {}, append() {}
      });
      return elements.get(id);
    };
    const document = { getElementById: element, createElement: () => ({ textContent: "", append() {} }), addEventListener(name, fn) { listeners[name] = fn; } };
    const window = { location: { hostname: "texasjetquote.com" }, TJQAcquisition: { values: () => ({ acquisition_source: "referral", acquisition_medium: "referral", acquisition_campaign: "planner_partners", acquisition_content: "event_planners", acquisition_landing_page: "/for-planners/" }) }, gtag(...args) { events.push(args); } };
    const sessionStorage = { getItem: () => null, removeItem() {} };
    const fetcher = async (_url, options) => {
      const body = JSON.parse(options.body);
      return Response.json(body.action === "estimate"
        ? { ticket: "mock", estimates: [{ category: "Light Jet", currency: "USD", low: 10, high: 20 }] }
        : { status: providerStatus, reference: "reference" }, { status: providerStatus === "uncertain" && body.action === "confirm" ? 202 : 200 });
    };
    vm.runInNewContext(source, { document, window, sessionStorage, fetch: fetcher, Date, Intl, Number, String });
    listeners.DOMContentLoaded();
    Object.assign(element("origin"), { value: "Austin" }); Object.assign(element("destination"), { value: "Aspen" });
    Object.assign(element("departure"), { value: "2026-12-15" }); Object.assign(element("passengers"), { value: "3" });
    Object.assign(element("email"), { value: email });
    const submit = (id) => element(id).callbacks.submit({ preventDefault() {}, currentTarget: element(id) });
    await submit("trip-form");
    element("request-options").callbacks.click();
    await submit("contact-form");
    await submit("contact-form");
    return events;
  }
  const real = await runCase("traveler@example.invalid", "received");
  const conversions = real.filter((entry) => entry[1] === "conversion");
  assert.equal(conversions.length, 1);
  assert.equal(conversions[0][2].send_to, "AW-18387073303/Z9O3CP3Yra8dEJfy0b9E");
  const submitted = real.find((entry) => entry[1] === "villiers_quote_submitted");
  assert.equal(submitted[2].acquisition_campaign, "planner_partners");
  assert.equal(submitted[2].acquisition_content, "event_planners");
  assert.doesNotMatch(JSON.stringify(submitted), /traveler@example|Austin|Aspen/);
  assert.equal((await runCase("sandbox-test@mail.villiers.ai", "received")).filter((entry) => entry[1] === "conversion").length, 0);
  assert.equal((await runCase("traveler@example.invalid", "uncertain")).filter((entry) => entry[1] === "conversion").length, 0);
});
