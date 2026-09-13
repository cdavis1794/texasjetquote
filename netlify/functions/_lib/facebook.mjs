import { texasDateKey } from "./deals.mjs";

function siteUrl(value = process.env.PUBLIC_SITE_URL || "https://texasjetquote.com") {
  const url = new URL(value);
  if (url.protocol !== "https:") throw new Error("PUBLIC_SITE_URL must be an HTTPS URL.");
  return url;
}

function graphVersion(value = process.env.FACEBOOK_GRAPH_VERSION) {
  if (!/^v\d+\.\d+$/.test(value || "")) {
    throw new Error("FACEBOOK_GRAPH_VERSION must be set to a current Graph API version, such as v25.0.");
  }
  return value;
}

export function facebookConfiguration(environment = process.env) {
  const pageId = String(environment.FACEBOOK_PAGE_ID || "").trim();
  const accessToken = String(environment.FACEBOOK_PAGE_ACCESS_TOKEN || "").trim();
  if (!/^\d+$/.test(pageId)) throw new Error("FACEBOOK_PAGE_ID is missing or invalid.");
  if (!accessToken) throw new Error("FACEBOOK_PAGE_ACCESS_TOKEN is missing.");
  return { pageId, accessToken, version: graphVersion(environment.FACEBOOK_GRAPH_VERSION) };
}

export function dealLandingUrl(deal, baseUrl = process.env.PUBLIC_SITE_URL) {
  const url = new URL("/deals/", siteUrl(baseUrl));
  url.searchParams.set("deal", deal.id);
  url.searchParams.set("utm_source", "facebook");
  url.searchParams.set("utm_medium", "organic");
  url.searchParams.set("utm_campaign", "daily_empty_leg");
  url.searchParams.set("utm_content", deal.id);
  return url.toString();
}

export function evergreenLandingUrl(baseUrl = process.env.PUBLIC_SITE_URL, now = new Date()) {
  const url = new URL("/", siteUrl(baseUrl));
  url.searchParams.set("utm_source", "facebook");
  url.searchParams.set("utm_medium", "organic");
  url.searchParams.set("utm_campaign", "daily_quote_planner");
  url.searchParams.set("utm_content", texasDateKey(now));
  return url.toString();
}

export function formatDepartureDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, day)));
}

export function liveDealMessage(deal) {
  const facts = [
    `Live empty-leg opportunity: ${deal.origin.name} → ${deal.destination.name}`,
    `${formatDepartureDate(deal.departureDate)}${deal.departureTime ? ` · ${deal.departureTime}` : ""} · ${deal.aircraft}${deal.seats ? ` · up to ${deal.seats} passengers` : ""}`,
    `Listed from ${deal.price}. Availability, schedule, aircraft, and price can change or be withdrawn.`,
    "Affiliate disclosure: Texas Jet Quote may earn a commission if you book through this link, at no extra cost to you.",
    "Check the current details and request a live quote:"
  ];
  return facts.join("\n\n");
}

const EVERGREEN_MESSAGES = [
  "Flying from Texas soon? Start with your exact route, date, and passenger count to see a transparent planning range before you request live availability.",
  "A better Texas private-flight request starts with the real itinerary. Compare the route, date, passenger count, airport options, and current availability in one place.",
  "Private-jet availability changes by the hour. Build your Texas itinerary first, then request current aircraft options and final operator terms."
];

export function evergreenMessage(now = new Date()) {
  const index = Number(texasDateKey(now).replaceAll("-", "")) % EVERGREEN_MESSAGES.length;
  return [
    EVERGREEN_MESSAGES[index],
    "Affiliate disclosure: Texas Jet Quote may earn a commission if you book through our Villiers referral link, at no extra cost to you.",
    "Plan your route:"
  ].join("\n\n");
}

function safeError(responseText) {
  try {
    const body = JSON.parse(responseText);
    return String(body?.error?.message || body?.error?.error_user_msg || body?.error || "Unknown Facebook error").slice(0, 300);
  } catch {
    return String(responseText || "Unknown Facebook error").replace(/access_token=[^&\s]+/gi, "access_token=[redacted]").slice(0, 300);
  }
}

export async function publishFacebookLink({ fetchImpl = globalThis.fetch, configuration, message, link }) {
  const endpoint = `https://graph.facebook.com/${configuration.version}/${configuration.pageId}/feed`;
  const body = new URLSearchParams({
    access_token: configuration.accessToken,
    message,
    link
  });
  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  const responseText = await response.text();
  if (!response.ok) throw new Error(`Facebook publish failed (${response.status}): ${safeError(responseText)}`);
  try {
    const payload = JSON.parse(responseText);
    if (!payload?.id) throw new Error("Facebook publish response did not include a post ID.");
    return payload.id;
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error("Facebook publish returned an unexpected response.");
    throw error;
  }
}
