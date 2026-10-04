import assert from "node:assert/strict";
import test from "node:test";
import {
  daysUntilDeparture,
  isTexasPublishingTime,
  parseVilliersFeed,
  rankDeals,
  texasDateKey
} from "../netlify/functions/_lib/deals.mjs";
import { dealLandingUrl, evergreenMessage, formatDepartureDate, liveDealMessage } from "../netlify/functions/_lib/facebook.mjs";

const FEED = `<?xml version="1.0"?><rss xmlns:villiers="https://villiers.ai/schema"><channel>
  <item>
    <title>Pilatus PC-12 NG | William P. Hobby Airport → Destin Executive Airport | $4,730</title>
    <link>https://villiers.ai/empty-legs/khou-kdts-pilatus-pc-12-ng-2026-09-13-00e9bcf8?id=1673</link>
    <villiers:aircraftType>Pilatus PC-12 NG</villiers:aircraftType>
    <villiers:originAirport>KHOU - William P. Hobby Airport</villiers:originAirport>
    <villiers:destinationAirport>KDTS - Destin Executive Airport</villiers:destinationAirport>
    <villiers:departureDate>13 September 2026</villiers:departureDate>
    <villiers:departureTime>12:00</villiers:departureTime>
    <villiers:price>$4,730</villiers:price>
    <villiers:seatsAvailable>7</villiers:seatsAvailable>
    <villiers:flightDuration>1h 29m</villiers:flightDuration>
    <villiers:trackingLink>https://villiers.ai/empty-legs/khou-kdts-pilatus-pc-12-ng-2026-09-13-00e9bcf8?id=1673</villiers:trackingLink>
  </item>
  <item>
    <title>Farnborough to Sion</title>
    <link>https://villiers.ai/empty-legs/eglf-lsgs-2026-09-13-cbdbce82?id=1673</link>
    <villiers:aircraftType>Private Jet</villiers:aircraftType>
    <villiers:originAirport>EGLF - Farnborough Airport</villiers:originAirport>
    <villiers:destinationAirport>LSGS - Sion Airport</villiers:destinationAirport>
    <villiers:departureDate>13 September 2026</villiers:departureDate>
    <villiers:price>£8,493</villiers:price>
    <villiers:trackingLink>https://villiers.ai/empty-legs/eglf-lsgs-2026-09-13-cbdbce82?id=1673</villiers:trackingLink>
  </item>
  <item>
    <title>Expired Texas listing</title>
    <link>https://villiers.ai/empty-legs/kaus-kase-2026-09-01-old?id=1673</link>
    <villiers:aircraftType>Citation XLS</villiers:aircraftType>
    <villiers:originAirport>KAUS - Austin Executive Airport</villiers:originAirport>
    <villiers:destinationAirport>KASE - Aspen/Pitkin County Airport</villiers:destinationAirport>
    <villiers:departureDate>1 September 2026</villiers:departureDate>
    <villiers:price>$12,500</villiers:price>
    <villiers:trackingLink>https://villiers.ai/empty-legs/kaus-kase-2026-09-01-old?id=1673</villiers:trackingLink>
  </item>
</channel></rss>`;

const NOW = new Date("2026-09-10T15:15:00.000Z");

test("parses the public Villiers fields and keeps the tracked booking URL", () => {
  const deals = parseVilliersFeed(FEED);
  assert.equal(deals.length, 3);
  assert.equal(deals[0].origin.code, "KHOU");
  assert.equal(deals[0].destination.name, "Destin Executive Airport");
  assert.equal(deals[0].price, "$4,730");
  assert.equal(new URL(deals[0].bookingUrl).searchParams.get("id"), "1673");
});

function feedWithTrackingUrl(url, { tracking = true } = {}) {
  const item = /<item\b[^>]*>[\s\S]*?<\/item>/.exec(FEED)[0];
  const encoded = url.replaceAll("&", "&amp;");
  const replaced = tracking
    ? item.replace(/(<villiers:trackingLink>)[\s\S]*?(<\/villiers:trackingLink>)/, `$1${encoded}$2`)
    : item.replace(/<villiers:trackingLink>[\s\S]*?<\/villiers:trackingLink>/, "").replace(/(<link>)[\s\S]*?(<\/link>)/, `$1${encoded}$2`);
  return `<rss><channel>${replaced}</channel></rss>`;
}

test("preserves a provider-supplied canonical 1673 URL without query or path rewriting", () => {
  const raw = "https://villiers.ai/empty-legs/Example%2DRoute?provider_ref=Public%2FListing&id=1673&sort=price+asc";
  for (const tracking of [true, false]) {
    const deals = parseVilliersFeed(feedWithTrackingUrl(raw, { tracking }));
    assert.equal(deals.length, 1);
    assert.equal(deals[0].bookingUrl, raw);
  }
});

test("rejects wrong, absent or ambiguous affiliate IDs instead of repairing or falling back", () => {
  const base = "https://villiers.ai/empty-legs/example";
  for (const query of ["?id=9999", "", "?id=", "?id=1673&id=9999", "?id=1673&id=1673", "?id=1673&ID=9999", "?ID=1673", "?i%64=1673", "?id=%31%36%37%33", "?id=1673%20", "?id=1673;id=9999"]) {
    // A valid ordinary <link> cannot override an invalid explicit trackingLink.
    assert.deepEqual(parseVilliersFeed(feedWithTrackingUrl(base + query)), [], query);
  }
});

test("rejects unverified hosts, schemes, credentials and malformed or fragment destinations", () => {
  for (const url of [
    "http://villiers.ai/empty-legs/example?id=1673",
    "javascript:alert(1)",
    "/empty-legs/example?id=1673",
    "https://partner.villiers.ai/empty-legs/example?id=1673",
    "https://villiers.ai.evil.example/empty-legs/example?id=1673",
    "https://user:password@villiers.ai/empty-legs/example?id=1673",
    "https://villiers.ai:8443/empty-legs/example?id=1673",
    "https:////villiers.ai/empty-legs/example?id=1673",
    "https://villiers.ai/empty-legs/example?id=1673#id=9999",
    "https://villiers.ai/empty-legs/example?id=1673#",
    "https://villiers.ai/empty legs/example?id=1673",
    "https://villiers.ai/empty-legs/example%zz?id=1673",
    "https://villiers.ai\\evil.example/empty-legs/example?id=1673"
  ]) assert.deepEqual(parseVilliersFeed(feedWithTrackingUrl(url)), [], url);
});

test("ranks a Texas-connected, upcoming listing and rejects global and expired inventory", () => {
  const ranked = rankDeals(parseVilliersFeed(FEED), { now: NOW });
  assert.equal(ranked.length, 1);
  assert.equal(ranked[0].origin.code, "KHOU");
  assert.equal(ranked[0].departureDate, "2026-09-13");
  assert.equal(daysUntilDeparture(ranked[0].departureDate, NOW), 3);
});

test("excludes an already-published listing", () => {
  const ranked = rankDeals(parseVilliersFeed(FEED), {
    now: NOW,
    excludedIds: new Set(["empty-legs-khou-kdts-pilatus-pc-12-ng-2026-09-13-00e9bcf8"])
  });
  assert.equal(ranked.length, 0);
});

test("keeps the schedule at 10:15 AM Central through daylight saving time", () => {
  assert.equal(texasDateKey(NOW), "2026-09-10");
  assert.equal(isTexasPublishingTime(new Date("2026-07-01T15:15:00.000Z")), true);
  assert.equal(isTexasPublishingTime(new Date("2026-01-01T16:15:00.000Z")), true);
  assert.equal(isTexasPublishingTime(new Date("2026-07-01T16:15:00.000Z")), false);
});

test("builds truthful, tracked Facebook copy and a first-party landing URL", () => {
  const deal = rankDeals(parseVilliersFeed(FEED), { now: NOW })[0];
  const message = liveDealMessage(deal);
  const landing = new URL(dealLandingUrl(deal, "https://texasjetquote.com"));
  assert.match(message, /Listed from \$4,730/);
  assert.match(message, /Affiliate disclosure/);
  assert.equal(landing.pathname, "/deals/");
  assert.equal(landing.searchParams.get("deal"), deal.id);
  assert.match(evergreenMessage(NOW), /Affiliate disclosure/);
  assert.equal(formatDepartureDate("2026-09-13"), "Sep 13, 2026");
});
