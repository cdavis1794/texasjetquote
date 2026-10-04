import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const app = fs.readFileSync(new URL("../assets/app.47950ff22bd4a.js", import.meta.url), "utf8");

test("homepage separates saved planning requests from provider quotes", () => {
  assert.ok(app.includes("Save Trip Plan (Optional)"));
  assert.ok(app.includes("Request current availability"));
  assert.ok(app.includes("Trip plan saved. Continue to Villiers"));
  assert.ok(app.includes("Planning range • Confirm fees and inclusions with the provider"));
  for (const claim of ["No repositioning hidden", "Catering credit included", "Hold via AI", "Was ~$", "All-In Investment", "Get Confirmed Aircraft", "Save Trip & Request Current Options", "AI QUOTE AGENT", "Saving your quote request…"]) {
    assert.ok(!app.includes(claim), `Unsupported or ambiguous claim: ${claim}`);
  }
});

test("homepage avoids unsupported operator and service guarantees", () => {
  for (const claim of ["FAA Part 135 only", "FAA Part 135 Only", "FAA Certified Operators", "24/7 Human Broker Backup", "24/7 Broker", "9,000+ tails", "AIRCRAFT NETWORK", "Most Requested Texas Routes", "MOST REQUESTED", "Are your operators FAA certified?", "How fast can you confirm aircraft in Texas?", "What is included in your quote?"]) {
    assert.ok(!app.includes(claim), `Unsupported guarantee: ${claim}`);
  }
  assert.ok(app.includes("does not operate aircraft or issue charter quotes"));
  assert.ok(app.includes("not a live aircraft quote, hold, or promise of availability"));
  assert.ok(app.includes("Illustrative price • Provider confirmation required"));
});

test("homepage preserves tracked Villiers referral and disclosures", () => {
  assert.ok(app.includes('Cn="https://villiers.ai/?id=1673"'));
  assert.ok(app.includes("Independent referral site • Villiers affiliate id=1673"));
  assert.ok(app.includes("Affiliate Disclosure"));
  assert.ok(app.includes("Planning ranges are editorial estimates"));
  assert.ok(app.includes('rel:"sponsored nofollow noopener"'));
});

test("FAQ resource chips navigate to useful guides and disclosures", () => {
  for (const [label, href] of [
    ["Austin Planning Guide", "/austin-private-jet-charter"],
    ["Houston Planning Guide", "/houston-private-jet-charter"],
    ["Dallas Planning Guide", "/dallas-private-jet-charter"],
    ["Affiliate Disclosure", "/affiliate-disclosure/"],
    ["Current Deal Listings", "/deals/"],
    ["Contact TexasJetQuote", "/contact/"]
  ]) {
    assert.ok(app.includes(`href:"${href}",className:"px-3 py-1.5 rounded-full bg-[#0F172A]/5",children:"${label}"`));
  }
  assert.ok(!app.includes('children:"private jet Austin"'));
});

test("the estimate result offers a provider quote before optional saving", () => {
  const start = app.indexOf('r==="showing_estimate"&&a("div"');
  const end = app.indexOf('r==="collecting_lead"&&a("div"', start);
  const result = app.slice(start, end);
  assert.ok(result.indexOf("Request current availability") >= 0);
  assert.ok(result.indexOf("Request current availability") < result.indexOf("Save Trip Plan (Optional)"));
  assert.ok(app.includes("Saving your trip plan here is optional."));
  assert.ok(app.includes("TEXAS ROUTE PLANNING"));
  assert.ok(app.includes("Texas Routes to Plan"));
  assert.ok(app.includes("ROUTE IDEA"));
});
