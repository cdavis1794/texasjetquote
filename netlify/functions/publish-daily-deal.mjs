import { getStore } from "@netlify/blobs";
import { fetchVilliersDeals, isTexasPublishingTime, rankDeals, texasDateKey } from "./_lib/deals.mjs";
import {
  dealLandingUrl,
  evergreenLandingUrl,
  evergreenMessage,
  facebookConfiguration,
  liveDealMessage,
  publishFacebookLink
} from "./_lib/facebook.mjs";

export const config = { schedule: "15 15,16 * * *" };

const HISTORY_KEY = "daily-facebook-post-history";
const MAX_HISTORY_DAYS = 60;

function cleanHistory(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { days: {}, dealIds: [] };
  return {
    days: value.days && typeof value.days === "object" && !Array.isArray(value.days) ? value.days : {},
    dealIds: Array.isArray(value.dealIds) ? value.dealIds.filter((id) => typeof id === "string").slice(0, MAX_HISTORY_DAYS) : []
  };
}

function trimHistory(history) {
  const retainedDays = Object.entries(history.days)
    .sort(([left], [right]) => right.localeCompare(left))
    .slice(0, MAX_HISTORY_DAYS);
  return { ...history, days: Object.fromEntries(retainedDays), dealIds: history.dealIds.slice(0, MAX_HISTORY_DAYS) };
}

const asJson = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});

export default async function handler() {
  const now = new Date();
  if (!isTexasPublishingTime(now)) {
    return asJson({ skipped: "Outside the 10:15 AM America/Chicago posting window." });
  }

  if (process.env.FACEBOOK_AUTOPUBLISH_ENABLED !== "true") {
    console.info("Daily Facebook publisher is disabled. Set FACEBOOK_AUTOPUBLISH_ENABLED=true only after a live test.");
    return asJson({ skipped: "Autopublish is disabled." });
  }

  const configuration = facebookConfiguration();
  const store = getStore("texasjetquote-facebook-publishing");
  const day = texasDateKey(now);
  const history = cleanHistory(await store.get(HISTORY_KEY, { type: "json", consistency: "strong" }));

  if (history.days[day]) {
    console.info(`Daily Facebook post already reserved for ${day}.`);
    return asJson({ skipped: "A post was already attempted today.", day });
  }

  const candidates = rankDeals(await fetchVilliersDeals(), {
    now,
    excludedIds: new Set(history.dealIds)
  });
  const deal = candidates[0];
  const post = deal
    ? { type: "live_deal", dealId: deal.id, message: liveDealMessage(deal), link: dealLandingUrl(deal) }
    : { type: "quote_planner", dealId: null, message: evergreenMessage(now), link: evergreenLandingUrl(undefined, now) };

  // Reserve before the network call. If Facebook's response is ambiguous, a retry will not create a duplicate post.
  const reservedHistory = trimHistory({
    ...history,
    days: {
      ...history.days,
      [day]: {
        attemptedAt: now.toISOString(),
        dealId: post.dealId,
        link: post.link,
        status: "attempting",
        type: post.type
      }
    },
    dealIds: deal ? [deal.id, ...history.dealIds.filter((id) => id !== deal.id)] : history.dealIds
  });
  await store.set(HISTORY_KEY, JSON.stringify(reservedHistory));

  try {
    const facebookPostId = await publishFacebookLink({
      configuration,
      message: post.message,
      link: post.link
    });
    reservedHistory.days[day] = { ...reservedHistory.days[day], facebookPostId, postedAt: new Date().toISOString(), status: "posted" };
    await store.set(HISTORY_KEY, JSON.stringify(reservedHistory));
    console.info(`Published ${post.type} to Facebook for ${day}: ${facebookPostId}`);
    return asJson({ day, facebookPostId, published: true, type: post.type });
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 500) : "Unknown publishing error";
    reservedHistory.days[day] = { ...reservedHistory.days[day], failedAt: new Date().toISOString(), status: "unknown", error: message };
    await store.set(HISTORY_KEY, JSON.stringify(reservedHistory));
    console.error(`Facebook publishing result is unknown for ${day}: ${message}`);
    return asJson({ day, published: false, error: "Facebook publishing could not be confirmed; no automatic retry will run." }, 502);
  }
}
