import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

const scripts = Object.fromEntries(await Promise.all(["acquisition-context", "tjq.8b31c2", "ga4-events", "austin-quote-planner", "private-trip-brief", "private-trip-brief-tracking"].map(async name => [name, await readFile(new URL(`../assets/${name}.js`, import.meta.url), "utf8")])));
function environment(search = "", stored = new Map()) {
  const listeners = {};
  const document = { baseURI: "https://texasjetquote.com/", referrer: "", documentElement: { setAttribute() {} }, addEventListener(name, callback) { (listeners[name] ||= []).push(callback); }, querySelectorAll() { return []; }, querySelector() { return null; }, getElementById() { return null; } };
  const window = { location: { search, pathname: "/austin-private-jet-charter.html", hostname: "texasjetquote.com" }, sessionStorage: { getItem: key => stored.get(key) || null, setItem: (key, value) => stored.set(key, value) } };
  const context = vm.createContext({ window, document, URL, URLSearchParams, Date, Math, fetch: async () => ({ ok: true }) });
  return { window, document, listeners, context, run(name) { vm.runInContext(scripts[name], context); } };
}
test("campaign context retains only bounded slugs and known page paths across this tab", () => {
  const storage = new Map();
  const first = environment("?utm_source=YouTube&utm_medium=organic_social&utm_campaign=organic_launch_30d&utm_content=TJQ02&email=jane@example.com&gclid=secret&utm_term=Jane%20Doe", storage);
  first.document.referrer = "https://google.com/search?email=jane@example.com";
  first.run("acquisition-context");
  const next = environment("", storage);
  next.window.location.pathname = "/private-trip-brief/";
  next.run("acquisition-context");
  assert.equal(next.window.TJQAcquisition.values().acquisition_source, "youtube");
  assert.equal(next.window.TJQAcquisition.values().acquisition_medium, "organic_social");
  assert.equal(next.window.TJQAcquisition.values().acquisition_campaign, "organic_launch_30d");
  assert.equal(next.window.TJQAcquisition.values().acquisition_content, "tjq02");
  assert.equal(next.window.TJQAcquisition.values().acquisition_landing_page, "/austin-private-jet-charter.html");
  assert.doesNotMatch(JSON.stringify([...storage.values()]), /Jane|jane|secret|google|term|email/);
});
test("personal URLs and malformed campaign labels never enter context; denied storage is harmless", () => {
  const env = environment("?utm_source=jane%40example.com&utm_medium=https%3A%2F%2Fx.com&utm_campaign=call-2125551234&utm_content=Jane%20Doe");
  env.window.location.pathname = "/customers/jane@example.com";
  env.document.referrer = "https://unknown.example/private/jane?email=x";
  Object.defineProperty(env.window, "sessionStorage", { get() { throw Error("blocked"); } });
  env.run("acquisition-context");
  assert.deepEqual(JSON.parse(JSON.stringify(env.window.TJQAcquisition.values())), { acquisition_source: "referral", acquisition_medium: "referral", acquisition_campaign: "other", acquisition_content: "other", acquisition_landing_page: "other" });
  const hidden = { type: "hidden", value: "" }, visible = { type: "text", value: "untouched" };
  env.window.TJQAcquisition.populate({ elements: { namedItem: name => name === "acquisition_source" ? hidden : visible } });
  assert.equal(hidden.value, "referral");
  assert.equal(visible.value, "untouched");
});
function briefEnvironment({ ok = true, throws = false, analyticsThrows = false } = {}) {
  const env = environment("?submitted=1&tier=full_brief");
  const handlers = {}, events = [];
  const form = { hidden: false, action: "", reportValidity: () => true, elements: {}, setAttribute() {}, removeAttribute() {}, addEventListener(name, handler) { handlers[name] = handler; } };
  const success = { hidden: true }, button = { disabled: false }, status = { textContent: "" };
  const selected = { value: "full_brief", checked: true };
  const nodes = { ".brief-form": form, ".submission-success": success, "[data-trip-brief-submit]": button, "[data-trip-brief-status]": status, 'input[name="request_type"]:checked': selected, 'input[name="request_type"][value="full_brief"]': selected };
  env.document.querySelector = selector => nodes[selector] || null;
  env.context.FormData = class extends Map { constructor() { super([["request_type", "full_brief"]]); } };
  env.context.fetch = async () => { if (throws) throw Error("offline"); return { ok }; };
  env.window.gtag = (...args) => { events.push(args); if (analyticsThrows) throw Error("analytics failure"); };
  env.run("private-trip-brief");
  return { ...env, form, success, button, status, events, submit: () => handlers.submit({ preventDefault() {} }) };
}
test("a success query alone cannot report a saved lead", () => {
  const env = briefEnvironment();
  assert.equal(env.form.hidden, false);
  assert.equal(env.success.hidden, true);
  assert.equal(env.events.length, 0);
});
test("only an accepted brief POST produces one lead event and success", async () => {
  const env = briefEnvironment({ analyticsThrows: true });
  await env.submit();
  assert.equal(env.success.hidden, false);
  assert.equal(env.events.length, 1);
  assert.equal(env.events[0][1], "generate_lead");
  assert.equal(env.status.textContent, "Preferences saved.");
});
test("rejected and offline form saves remain retryable without conversions", async () => {
  for (const options of [{ ok: false }, { throws: true }]) {
    const env = briefEnvironment(options);
    await env.submit();
    assert.equal(env.success.hidden, true);
    assert.equal(env.form.hidden, false);
    assert.equal(env.button.disabled, false);
    assert.equal(env.events.length, 0);
    assert.match(env.status.textContent, /try again/);
  }
});
test("affiliate click is distinct from a lead and keeps the approved destination intact", () => {
  const env = environment("?utm_source=youtube&utm_content=TJQ02&email=secret");
  const posts = [], events = [];
  env.context.fetch = (url, options) => { posts.push(options); return Promise.resolve({ ok: true }); };
  env.window.gtag = (...args) => { events.push(args); throw Error("blocked"); };
  const anchor = { href: "https://villiers.ai/?id=1673", textContent: "See current quotes", getAttribute: name => name === "data-placement" ? "hero" : null, closest: () => null };
  env.run("acquisition-context"); env.run("tjq.8b31c2"); env.run("ga4-events");
  for (const handler of env.listeners.click) handler({ target: { closest: () => anchor } });
  assert.equal(anchor.href, "https://villiers.ai/?id=1673");
  assert.equal(posts.length, 1);
  const body = new URLSearchParams(posts[0].body);
  assert.equal(body.get("event_type"), "affiliate_click");
  assert.equal(body.get("acquisition_content"), "tjq02");
  assert.equal(body.get("affiliate_id"), "1673");
  assert.doesNotMatch(posts[0].body, /secret|email|generate_lead|conversion/);
  assert.equal(events[0][1], "affiliate_outbound");
});
test("unknown and name slugs cannot enter saved campaign context; sitemap routes remain useful", () => {
  const storage = new Map();
  const env = environment("?utm_source=facebook&utm_medium=organic&utm_campaign=jane-doe&utm_content=customer-john", storage);
  env.window.location.pathname = "/blog/austin-to-dallas-private-jet-cost";
  env.run("acquisition-context");
  assert.equal(env.window.TJQAcquisition.values().acquisition_campaign, "other");
  assert.equal(env.window.TJQAcquisition.values().acquisition_content, "other");
  assert.equal(env.window.TJQAcquisition.values().acquisition_landing_page, "/blog/austin-to-dallas-private-jet-cost");
  assert.doesNotMatch(JSON.stringify([...storage.values()]), /jane|john|customer/);
  const planned = environment("?utm_campaign=organic_launch_30d&utm_content=TJQ03");
  planned.window.location.pathname = "/austin-private-jet-charter";
  planned.run("acquisition-context");
  assert.equal(planned.window.TJQAcquisition.values().acquisition_content, "tjq03");
  assert.equal(planned.window.TJQAcquisition.page(), "/austin-private-jet-charter");
  const deal = environment("?utm_campaign=daily_empty_leg&utm_content=empty-legs-khou-klas-cessna-citation-v-2026-09-22-72194246");
  deal.run("acquisition-context");
  assert.equal(deal.window.TJQAcquisition.values().acquisition_content, "empty-legs-khou-klas-cessna-citation-v-2026-09-22-72194246");
});
test("Austin keeps its existing Ads conversion once, only after an accepted save", async () => {
  for (const ok of [true, false]) {
    const env = environment("?utm_source=youtube&utm_campaign=fall-2026");
    const nodes = new Map(), events = [];
    env.document.getElementById = id => {
      if (!nodes.has(id)) nodes.set(id, { value: "", hidden: false, disabled: false, textContent: "", handlers: {}, elements: {}, setAttribute() {}, removeAttribute() {}, reset() {}, focus() {}, reportValidity: () => true, addEventListener(name, handler) { this.handlers[name] = handler; } });
      return nodes.get(id);
    };
    env.context.FormData = class extends Map { constructor() { super(); } };
    env.context.fetch = async () => ({ ok });
    env.window.dataLayer = [];
    env.window.gtag = (...args) => { events.push(args); throw Error("analytics blocked"); };
    env.run("acquisition-context"); env.run("austin-quote-planner");
    for (const callback of env.listeners.DOMContentLoaded) callback();
    const submit = () => nodes.get("lead-form").handlers.submit({ preventDefault() {} });
    await Promise.all([submit(), submit()]);
    assert.equal(events.filter(event => event[1] === "conversion").length, ok ? 1 : 0);
    assert.equal(events.filter(event => event[1] === "generate_lead").length, ok ? 1 : 0);
    if (ok) {
      assert.equal(nodes.get("planner-success").hidden, false);
      assert.equal(events.find(event => event[1] === "conversion")[2].send_to, "AW-18387073303/uwaLCPKBrOMcEJfy0b9E");
      await submit();
      assert.equal(events.filter(event => event[1] === "conversion").length, 1);
      nodes.get("new-request").handlers.click();
      assert.equal(nodes.get("save-request").disabled, false);
      assert.equal(nodes.get("save-request").textContent, "Save quote request");
      await submit();
      assert.equal(events.filter(event => event[1] === "generate_lead").length, 2);
      assert.equal(events.filter(event => event[1] === "conversion").length, 2);
    } else assert.match(nodes.get("lead-status").textContent, /try again/);
  }
});
