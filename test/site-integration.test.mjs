import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const hiddenNames = ["source", "medium", "campaign", "content", "landing_page"];
const pages = ["index.html", "austin-private-jet-charter.html", "private-trip-brief/index.html"];
test("every Netlify lead declaration contains all limited acquisition fields", async () => {
  for (const page of pages) {
    const html = await readFile(join(root, page), "utf8");
    const forms = [...html.matchAll(/<form\b[^>]*\bname="(?:texas-private-jet-quote|affiliate-click|private-trip-brief)"[^>]*>[\s\S]*?<\/form>/g)];
    assert.ok(forms.length, page);
    for (const [form] of forms) for (const name of hiddenNames) {
      assert.match(form, new RegExp(`type="hidden" name="acquisition_${name}"`), `${page}: ${name}`);
    }
  }
});

test("shared attribution is declared exactly once before each consumer", async () => {
  async function scan(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if ([".git", "dist", "node_modules", "test", "netlify", "scripts", "docs"].includes(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) { await scan(path); continue; }
      if (!entry.name.endsWith(".html")) continue;
      const html = await readFile(path, "utf8");
      const consumers = [...html.matchAll(/src="\/assets\/(?:tjq\.|ga4-events|austin-quote-planner|private-trip-brief(?:-tracking)?\.js)/g)];
      if (!consumers.length) continue;
      assert.equal((html.match(/src="\/assets\/acquisition-context\.js"/g) || []).length, 1, path);
      assert.equal((html.match(/src="\/assets\/tjq\.8b31c2\.js"/g) || []).length, 1, `One first-party click collector: ${path}`);
      assert.ok(html.indexOf('src="/assets/acquisition-context.js"') < consumers[0].index, path);
    }
  }
  await scan(root);
});

test("handoffs distinguish saved plans, provider availability, and payment", async () => {
  const austin = await readFile(join(root, "austin-private-jet-charter.html"), "utf8");
  const brief = await readFile(join(root, "private-trip-brief/index.html"), "utf8");
  assert.match(austin, /No charter quote has been requested and no aircraft is held/);
  assert.match(austin, /class="planner-primary villiers-link"[^>]*>Request current availability/);
  assert.match(brief, /data-trip-brief-status role="status" aria-live="polite"/);
  assert.match(brief, /This page does not verify payment/);
  assert.match(brief, /href="#brief-intake"[^>]*data-placement="brief-full-card"/);
});

test("editorial and partner contact uses the selected inbox without taking over booking support", async () => {
  const contact = await readFile(join(root, "contact/index.html"), "utf8");
  assert.match(contact, /href="mailto:wellplayedtravel@gmail\.com">wellplayedtravel@gmail\.com/);
  assert.match(contact, /For editorial corrections or partnership inquiries/);
  assert.match(contact, /This inbox does not handle charter quotes, bookings, payments, trip changes, cancellations or refunds/);
  assert.match(contact, /Do not send card numbers, passport scans/);
  assert.match(contact, /href="https:\/\/villiers\.ai\/\?id=1673" rel="sponsored nofollow noopener"/);
  assert.match(contact, /href="https:\/\/texasjetquote\.com\/contact\/"/);
  assert.doesNotMatch(contact, /If no direct editorial channel is displayed/);
});
