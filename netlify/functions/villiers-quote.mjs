import { getStore } from "@netlify/blobs";
import { createQuoteHandler } from "./_lib/villiers-quote.mjs";

export default async function handler(request) {
  let store;
  try { store = getStore({ name: "texasjetquote-villiers-requests", consistency: "strong" }); } catch {}
  return createQuoteHandler({ store, token: process.env.VILLIERS_AFFILIATE_TOKEN })(request);
}

// All plans support one per-IP rule for this endpoint. Confirm it appears in the deploy log.
export const config = {
  path: "/api/villiers-quote",
  rateLimit: { windowLimit: 12, windowSize: 180, aggregateBy: ["ip", "domain"] }
};
