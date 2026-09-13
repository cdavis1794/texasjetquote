import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../private-trip-brief/index.html", import.meta.url), "utf8");
const behavior = await readFile(new URL("../assets/private-trip-brief.js", import.meta.url), "utf8");
const terms = await readFile(new URL("../terms/index.html", import.meta.url), "utf8");

test("the private-trip brief offers a Netlify intake without a misleading checkout", () => {
  assert.match(page, /name="private-trip-brief"/);
  assert.match(page, /data-netlify="true"/);
  assert.match(page, /name="request_type"/);
  assert.match(page, /Founding Full Brief — \$249/);
  assert.match(page, /https:\/\/buy\.stripe\.com\/14A14n4u8dtw4O6bBM9IQ07/);
  assert.match(page, /Secure checkout is processed by Well Played Travel through Stripe/);
  assert.match(behavior, /checkout.*complete/);
  assert.match(page, /Nothing is booked, held, or purchased through this page/);
});

test("the private-trip brief excludes sensitive-data fields and preserves its planning-only boundary", () => {
  assert.doesNotMatch(page, /name="(?:passport|government_id|payment|card|medical|password|address)"/);
  assert.match(page, /Do not send passports, government IDs, payment-card information, medical records, account passwords/);
  assert.match(terms, /does not purchase, reserve, hold, or manage flights/);
});
