import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

const page = await readFile(new URL("../blog/austin-to-dallas-private-jet-cost.html", import.meta.url), "utf8");
const script = await readFile(new URL("../assets/charter-request-brief.js", import.meta.url), "utf8");

function mount(writeText) {
  const fields = ["shape", "passengers", "departure", "origin", "destination", "deadline", "airport", "return", "needs"].map(key => ({
    value: key === "shape" ? "One-way" : "", type: key === "passengers" ? "number" : "text",
    validity: { valid: true }, listeners: {},
    getAttribute: () => key,
    addEventListener(event, fn) { this.listeners[event] = fn; }
  }));
  const template = page.match(/id="charter-brief-output"[^>]*>([\s\S]*?)<\/textarea>/)[1];
  const output = { value: template, focus() { this.focused = true; }, select() { this.selected = true; } };
  const copy = { hidden: true, addEventListener(event, fn) { this.click = fn; } };
  const printButton = { hidden: true, addEventListener(event, fn) { this.click = fn; } };
  const printOutput = { textContent: "" };
  let printCount = 0;
  const status = { textContent: "" };
  const document = {
    querySelectorAll: () => fields,
    getElementById: id => id === "charter-brief-print-output" ? printOutput : output,
    querySelector: selector => selector.includes("data-copy") ? copy : selector.includes("data-print") ? printButton : status
  };
  vm.runInNewContext(script, { document, window: { print() { printCount += 1; } }, navigator: { clipboard: { writeText } } });
  return { fields, output, copy, status, printButton, printOutput, get printCount() { return printCount; } };
}

test("brief retains unresolved details and updates itinerary without removing comparison checks", () => {
  const app = mount(async () => {});
  assert.equal(app.copy.hidden, false);
  assert.match(app.output.value, /Dallas final destination district: \[confirm\]/);
  app.fields[4].value = "Plano";
  app.fields[4].listeners.input();
  app.fields[1].value = "-2";
  app.fields[1].validity.valid = false;
  app.fields[1].listeners.change();
  assert.match(app.output.value, /district: Plano/);
  assert.match(app.output.value, /Passengers: \[confirm valid passenger count\]/);
  assert.match(app.output.value, /FBO names and pickup addresses/);
  assert.match(app.output.value, /whether the aircraft waits or repositions/);
});

test("copy exports the current brief and denied clipboard access selects it for manual copying", async () => {
  let copied;
  const app = mount(async value => { copied = value; });
  await app.copy.click();
  assert.equal(copied, app.output.value);
  assert.match(app.status.textContent, /Copied/);
  const denied = mount(async () => { throw new Error("Permission denied"); });
  await denied.copy.click();
  assert.equal(denied.output.selected, true);
  assert.equal(denied.output.focused, true);
  assert.match(denied.status.textContent, /Copy command/);
});

test("guide keeps its canonical and sponsored referral while brief has no transmission or persistence", () => {
  assert.match(page, /rel="canonical" href="https:\/\/texasjetquote.com\/blog\/austin-to-dallas-private-jet-cost"/);
  assert.match(page, /href="https:\/\/villiers.ai\/\?id=1673" rel="sponsored nofollow noopener"/);
  assert.match(page, /<noscript>/);
  assert.doesNotMatch(script, /fetch\(|XMLHttpRequest|localStorage|sessionStorage|gtag\(|innerHTML|location\./);
});

test("print mirror follows current itinerary and only the explicit button opens printing", () => {
  const app = mount(async () => {});
  assert.equal(app.printButton.hidden, false);
  assert.equal(app.printCount, 0);
  assert.equal(app.printOutput.textContent, app.output.value);
  app.fields[4].value = "<untrusted itinerary text>";
  app.fields[4].listeners.input();
  assert.equal(app.printOutput.textContent, app.output.value);
  assert.match(app.printOutput.textContent, /<untrusted itinerary text>/);
  app.printButton.click();
  assert.equal(app.printCount, 1);
});

test("versioned checklist carries sources, optional citation, disclosure and a complete no-script print template", () => {
  assert.match(page, /Version 1\.0/);
  assert.match(page, /Sources reviewed October 3, 2026/);
  assert.match(page, /other quote-comparison questions are editorial planning prompts/i);
  assert.match(page, /#trip-brief/);
  assert.match(page, /A citation or link is welcome, not required/);
  assert.match(page, /brief-print-disclosure[\s\S]*?independent Villiers affiliate/);
  const initialPrint = page.match(/id="charter-brief-print-output"[^>]*>([\s\S]*?)<\/pre>/)[1];
  const initialText = page.match(/id="charter-brief-output"[^>]*>([\s\S]*?)<\/textarea>/)[1];
  assert.equal(initialPrint.replace(/\r/g, ""), initialText.replace(/\r/g, ""));
  assert.match(page, /@media print/);
});
