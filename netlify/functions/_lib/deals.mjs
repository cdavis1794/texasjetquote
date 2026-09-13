export const DEFAULT_VILLIERS_FEED_URL = "https://api.villiers.ai/feeds/empty-legs?id=1673";
export const TEXAS_TIME_ZONE = "America/Chicago";

const DAY_MS = 24 * 60 * 60 * 1000;
const MONTHS = new Map([
  ["january", 1], ["february", 2], ["march", 3], ["april", 4], ["may", 5], ["june", 6],
  ["july", 7], ["august", 8], ["september", 9], ["october", 10], ["november", 11], ["december", 12]
]);

const TEXAS_AIRPORTS = new Set([
  "KAUS", "KDFW", "KDAL", "KIAH", "KHOU", "KSAT", "KADS", "KFTW", "KDWH", "KEDC", "KGTU", "KSGR"
]);

const HIGH_INTENT_DESTINATIONS = new Set([
  "KASE", "KTEB", "KHPN", "KJFK", "KOPF", "KMIA", "KPBI", "KLAS", "KVGT", "KLAX", "KSMO", "KSNA", "KSJD", "MMUN", "MMSD"
]);

const text = (value) => String(value ?? "")
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/<[^>]+>/g, "")
  .replace(/&amp;/gi, "&")
  .replace(/&quot;/gi, "\"")
  .replace(/&#39;/gi, "'")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">")
  .replace(/\s+/g, " ")
  .trim();

function tagValue(xml, tag) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`<${escaped}\\b[^>]*>([\\s\\S]*?)<\\/${escaped}>`, "i").exec(xml);
  return match ? text(match[1]) : "";
}

function airport(value) {
  const name = text(value);
  const match = /^([A-Z0-9]{3,4})\s*[-–—]/.exec(name);
  return {
    code: match?.[1] ?? "",
    name: name.replace(/^[A-Z0-9]{3,4}\s*[-–—]\s*/, "")
  };
}

function departureDate(value) {
  const match = /^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i.exec(text(value));
  if (!match) return "";
  const month = MONTHS.get(match[2].toLowerCase());
  const day = Number(match[1]);
  const year = Number(match[3]);
  if (!month || day < 1 || day > 31 || year < 2020) return "";
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function departureTime(value) {
  const time = text(value);
  return /^([01]?\d|2[0-3]):[0-5]\d$/.test(time) ? time.padStart(5, "0") : "";
}

function price(value) {
  const amount = text(value);
  const match = /^([£$€])\s?([\d,]+(?:\.\d{1,2})?)$/.exec(amount);
  if (!match) return null;
  const numeric = Number(match[2].replace(/,/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return {
    amount,
    currency: { "$": "USD", "£": "GBP", "€": "EUR" }[match[1]],
    numeric
  };
}

function bookingUrl(value) {
  try {
    const url = new URL(text(value));
    const host = url.hostname.toLowerCase();
    if (host !== "villiers.ai" && !host.endsWith(".villiers.ai")) return "";
    if (!url.searchParams.has("id")) url.searchParams.set("id", "1673");
    return url.toString();
  } catch {
    return "";
  }
}

function dealId(url) {
  try {
    const pathname = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
    return pathname.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
  } catch {
    return "";
  }
}

function numericSeats(value) {
  const seats = Number.parseInt(text(value), 10);
  return Number.isInteger(seats) && seats > 0 && seats <= 30 ? seats : null;
}

function normalizedItem(item) {
  const trackingUrl = bookingUrl(tagValue(item, "villiers:trackingLink") || tagValue(item, "link"));
  const origin = airport(tagValue(item, "villiers:originAirport"));
  const destination = airport(tagValue(item, "villiers:destinationAirport"));
  const listedPrice = price(tagValue(item, "villiers:price"));
  const date = departureDate(tagValue(item, "villiers:departureDate"));
  const id = dealId(trackingUrl);

  if (!id || !trackingUrl || !origin.code || !destination.code || !date || !listedPrice) return null;

  return {
    id,
    aircraft: text(tagValue(item, "villiers:aircraftType")) || "Private jet",
    origin,
    destination,
    departureDate: date,
    departureTime: departureTime(tagValue(item, "villiers:departureTime")),
    arrivalTime: departureTime(tagValue(item, "villiers:arrivalTime")),
    flightDuration: text(tagValue(item, "villiers:flightDuration")),
    seats: numericSeats(tagValue(item, "villiers:seatsAvailable")),
    price: listedPrice.amount,
    currency: listedPrice.currency,
    priceNumeric: listedPrice.numeric,
    bookingUrl: trackingUrl,
    publishedAt: text(tagValue(item, "pubDate"))
  };
}

export function parseVilliersFeed(xml) {
  if (typeof xml !== "string" || !xml.includes("<rss")) return [];
  const deals = [];
  for (const match of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)) {
    const deal = normalizedItem(match[1]);
    if (deal) deals.push(deal);
  }
  return deals;
}

function centralParts(date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: TEXAS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });
  return Object.fromEntries(formatter.formatToParts(date)
    .filter(({ type }) => type !== "literal")
    .map(({ type, value }) => [type, value]));
}

export function texasDateKey(now = new Date()) {
  const parts = centralParts(now);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function isTexasPublishingTime(now = new Date()) {
  const parts = centralParts(now);
  return parts.hour === "10" && parts.minute === "15";
}

export function daysUntilDeparture(departure, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(departure)) return null;
  const [year, month, day] = departure.split("-").map(Number);
  const [todayYear, todayMonth, todayDay] = texasDateKey(now).split("-").map(Number);
  return Math.round((Date.UTC(year, month - 1, day) - Date.UTC(todayYear, todayMonth - 1, todayDay)) / DAY_MS);
}

export function scoreDeal(deal, now = new Date()) {
  const daysAway = daysUntilDeparture(deal.departureDate, now);
  if (daysAway === null || daysAway < 1 || daysAway > 14) return -Infinity;

  const originIsTexas = TEXAS_AIRPORTS.has(deal.origin.code);
  const destinationIsTexas = TEXAS_AIRPORTS.has(deal.destination.code);
  if (!originIsTexas && !destinationIsTexas) return -Infinity;

  let score = 35;
  if (originIsTexas) score += 10;
  if (destinationIsTexas) score += 5;
  if (HIGH_INTENT_DESTINATIONS.has(deal.origin.code) || HIGH_INTENT_DESTINATIONS.has(deal.destination.code)) score += 15;
  if (daysAway <= 3) score += 15;
  else if (daysAway <= 7) score += 12;
  else score += 6;
  if (deal.currency === "USD") score += 5;
  if (deal.seats && deal.seats >= 4 && deal.seats <= 14) score += 5;
  if (deal.aircraft && deal.aircraft.toLowerCase() !== "private jet") score += 2;
  return score;
}

export function rankDeals(deals, { now = new Date(), excludedIds = new Set(), limit = 100 } = {}) {
  return deals
    .filter((deal) => !excludedIds.has(deal.id))
    .map((deal) => ({ ...deal, score: scoreDeal(deal, now) }))
    .filter((deal) => deal.score >= 60)
    .sort((left, right) => right.score - left.score || left.departureDate.localeCompare(right.departureDate) || left.priceNumeric - right.priceNumeric)
    .slice(0, limit);
}

export function publicDeal(deal) {
  const { priceNumeric, publishedAt, score, ...safe } = deal;
  return safe;
}

export function feedUrlFrom(environment = process.env) {
  const value = environment.VILLIERS_EMPTY_LEGS_FEED_URL || DEFAULT_VILLIERS_FEED_URL;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "api.villiers.ai") {
    throw new Error("VILLIERS_EMPTY_LEGS_FEED_URL must use https://api.villiers.ai.");
  }
  return url.toString();
}

export async function fetchVilliersDeals({ fetchImpl = globalThis.fetch, url = feedUrlFrom(), timeoutMs = 8000 } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8" },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Villiers feed returned ${response.status}.`);
    return parseVilliersFeed(await response.text());
  } finally {
    clearTimeout(timeout);
  }
}
