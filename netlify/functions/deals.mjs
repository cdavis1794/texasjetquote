import { fetchVilliersDeals, publicDeal, rankDeals } from "./_lib/deals.mjs";

const json = (body, init = {}) => new Response(JSON.stringify(body), {
  ...init,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    ...(init.headers || {})
  }
});

export default async function handler(request) {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "GET" } });
  }

  try {
    const requestUrl = new URL(request.url);
    const requestedId = (requestUrl.searchParams.get("deal") || "").slice(0, 180);
    const ranked = rankDeals(await fetchVilliersDeals());
    const requested = ranked.find((deal) => deal.id === requestedId);
    const selected = [...(requested ? [requested] : []), ...ranked.filter((deal) => deal.id !== requested?.id)].slice(0, 6);

    return json({
      generatedAt: new Date().toISOString(),
      requestedDealAvailable: Boolean(requested),
      deals: selected.map(publicDeal)
    }, {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=900, stale-while-revalidate=60" }
    });
  } catch (error) {
    console.error("Unable to load live empty-leg inventory:", error instanceof Error ? error.message : "Unknown error");
    return json({ error: "Live availability is temporarily unavailable. Please check again shortly." }, {
      status: 503,
      headers: { "Cache-Control": "no-store" }
    });
  }
}
