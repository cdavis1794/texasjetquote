import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";

const ENDPOINT = "https://mcp.villiers.ai/mcp";
const MAX_BODY = 8192;
const VALID_FOR_MS = 20 * 60 * 1000;
const ALLOWED_ORIGINS = new Set(["https://texasjetquote.com", "https://www.texasjetquote.com"]);

const respond = (status, data) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }
});

function text(value, max) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, max) : "";
}

function validDate(value, currentTime) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) return false;
  const todayTexas = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(currentTime));
  return value >= todayTexas && date.getTime() <= currentTime + 2 * 366 * 24 * 60 * 60 * 1000;
}

function itinerary(input, currentTime) {
  const origin = text(input.origin, 100);
  const destination = text(input.destination, 100);
  const departure_date = text(input.departure_date, 10);
  const passengers = Number(input.passengers);
  if (origin.length < 2 || destination.length < 2 || !validDate(departure_date, currentTime) ||
      !Number.isInteger(passengers) || passengers < 1 || passengers > 19) return null;
  return { origin, destination, departure_date, passengers, round_trip: false };
}

// The browser gets an encrypted, authenticated, short-lived envelope; the provider
// session and itinerary never appear in the URL, analytics, or server-side logs.
function secretKey(token) {
  return createHash("sha256").update("TexasJetQuote Villiers quote envelope v1\0").update(token).digest();
}

function seal(payload, token) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", secretKey(token), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), encrypted].map((part) => part.toString("base64url")).join(".");
}

function unseal(value, token) {
  if (typeof value !== "string" || value.length > 3000) throw new Error("Invalid envelope");
  const parts = value.split(".");
  if (parts.length !== 3 || parts.some((part) => !/^[A-Za-z0-9_-]+$/.test(part))) throw new Error("Invalid envelope");
  const [iv, tag, encrypted] = parts.map((part) => Buffer.from(part, "base64url"));
  if (iv.length !== 12 || tag.length !== 16) throw new Error("Invalid envelope");
  const decipher = createDecipheriv("aes-256-gcm", secretKey(token), iv);
  decipher.setAuthTag(tag);
  return JSON.parse(Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8"));
}

async function rpc(fetcher, token, method, params, sessionId) {
  const headers = { Accept: "application/json, text/event-stream", "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  if (sessionId) headers["Mcp-Session-Id"] = sessionId;
  const response = await fetcher(ENDPOINT, {
    method: "POST", headers, redirect: "error", signal: AbortSignal.timeout(9000),
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
  });
  if (!response.ok) throw new Error("Provider unavailable");
  const body = await response.text();
  let message;
  try {
    const data = response.headers.get("content-type")?.includes("text/event-stream")
      ? body.split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trim()).filter(Boolean).at(-1)
      : body;
    message = JSON.parse(data);
  } catch { throw new Error("Provider returned an unreadable response"); }
  if (message.error) throw new Error("Provider rejected request");
  return { result: message.result, sessionId: response.headers.get("mcp-session-id") };
}

async function initialize(fetcher, token) {
  const initialized = await rpc(fetcher, token, "initialize", {
    protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "TexasJetQuote", version: "1.0" }
  });
  if (!initialized.sessionId || initialized.sessionId.length > 250) throw new Error("Provider session unavailable");
  return initialized.sessionId;
}

function publicEstimates(result) {
  if (result?.isError || result?.structuredContent?.indicative_pricing_available === false || !Array.isArray(result?.structuredContent?.estimates)) return null;
  const values = result.structuredContent.estimates.filter((item) =>
    typeof item.category === "string" && /^[A-Z]{3}$/.test(item.currency) &&
    Number.isFinite(item.price_low) && Number.isFinite(item.price_high) && item.price_low > 0 && item.price_high >= item.price_low
  ).slice(0, 8).map((item) => ({ category: text(item.category, 80), currency: item.currency, low: item.price_low, high: item.price_high }));
  return values.length ? values : null;
}

/** store is a strongly consistent Netlify Blob store; injected for offline tests. */
export function createQuoteHandler({ store, token, fetcher = fetch, now = Date.now, origins = ALLOWED_ORIGINS }) {
  return async function handler(request) {
    if (request.method !== "POST") return respond(405, { error: "Method not allowed." });
    const origin = request.headers.get("origin");
    if (!origin || !origins.has(origin) || origin !== new URL(request.url).origin) return respond(403, { error: "Request origin not allowed." });
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return respond(415, { error: "JSON required." });
    if (!token || !store) return respond(503, { error: "Online quote requests are temporarily unavailable. You can continue through the Villiers link." });

    let input;
    try {
      const raw = await request.text();
      if (Buffer.byteLength(raw, "utf8") > MAX_BODY) return respond(413, { error: "Request is too large." });
      input = JSON.parse(raw);
    } catch { return respond(400, { error: "Invalid request." }); }
    if (!input || typeof input !== "object" || Array.isArray(input) || input.website) return respond(400, { error: "Invalid request." });

    if (input.action === "estimate") {
      const trip = itinerary(input, now());
      if (!trip) return respond(400, { error: "Please enter a valid route, departure date, and passenger count." });
      try {
        const session = await initialize(fetcher, token);
        const estimate = await rpc(fetcher, token, "tools/call", {
          name: "get_jet_estimate", arguments: { origin: trip.origin, destination: trip.destination, passengers: trip.passengers, round_trip: false }
        }, session);
        const estimates = publicEstimates(estimate.result);
        if (!estimates) return respond(422, { error: "Villiers could not provide a planning range for this route. Please use the Villiers link for help." });
        const quoteId = randomUUID();
        const ticket = seal({ session, trip, quoteId, expires: now() + VALID_FOR_MS }, token);
        return respond(200, { ticket, estimates, providerRoute: text(estimate.result?.structuredContent?.route, 200), disclaimer: "Indicative estimates only. Villiers will confirm current aircraft, pricing and terms." });
      } catch {
        return respond(503, { error: "The provider estimate is temporarily unavailable. You can continue through the Villiers link." });
      }
    }

    if (input.action === "confirm") {
      let ticket;
      try { ticket = unseal(input.ticket, token); } catch { return respond(400, { error: "Please request a new estimate." }); }
      const email = text(input.email, 254);
      const sandbox = email.toLowerCase() === "sandbox-test@mail.villiers.ai";
      const firstName = text(input.first_name, 80);
      const lastName = text(input.last_name, 80);
      const phone = text(input.phone, 40);
      if (!ticket || typeof ticket.session !== "string" || !/^[0-9a-f-]{36}$/i.test(ticket.quoteId) ||
          !Number.isFinite(ticket.expires) || ticket.expires < now() || !itinerary(ticket.trip || {}, now())) {
        return respond(400, { error: "The estimate has expired. Please request a new one." });
      }
      if (input.consent !== true || !firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return respond(400, { error: "Enter your name and a valid email, and confirm that Villiers may contact you." });
      }

      const reference = `tjq-${ticket.quoteId}`;
      const key = `quote/${ticket.quoteId}`;
      try {
        const claim = await store.setJSON(key, { state: "submitting", reference, created: now() }, { onlyIfNew: true });
        if (!claim.modified) {
          const previous = await store.get(key, { type: "json", consistency: "strong" });
          if (previous?.state === "received") return respond(200, { status: "received", reference });
          if (previous?.state === "sandbox") return respond(200, { status: "sandbox", reference });
          if (previous?.state === "rejected") return respond(422, { error: "This request was not accepted. Please get a new estimate or use the Villiers link." });
          return respond(202, { status: "uncertain", reference, message: "We cannot yet confirm whether the request was received. Please do not submit it again; use the Villiers link if you need help." });
        }
      } catch { return respond(503, { error: "We could not safely submit this request. Please try again later or use the Villiers link." }); }

      try {
        const sent = await rpc(fetcher, token, "tools/call", {
          name: "request_jet_confirmation",
          arguments: { ...ticket.trip, email: sandbox ? "sandbox-test@mail.villiers.ai" : email, first_name: firstName, last_name: lastName, ...(phone ? { phone } : {}), client_reference: reference }
        }, ticket.session);
        if (sent.result?.isError) {
          await store.setJSON(key, { state: "rejected", reference, created: now() });
          return respond(422, { error: "Villiers could not accept this request. Please get a new estimate or use the Villiers link." });
        }
        const result = sent.result?.structuredContent;
        if (result?.status !== "received" || !result.trip_id || result.client_reference !== reference) throw new Error("Unconfirmed provider response");
        if (sandbox) {
          if (!/sandbox mode detected/i.test(result.message || "")) throw new Error("Unconfirmed sandbox response");
          await store.setJSON(key, { state: "sandbox", reference, created: now() });
          return respond(200, { status: "sandbox", reference });
        }
        await store.setJSON(key, { state: "received", reference, tripId: String(result.trip_id).slice(0, 120), created: now() });
        return respond(200, { status: "received", reference });
      } catch {
        // A timeout can happen after the provider receives a request. Never retry automatically.
        try { await store.setJSON(key, { state: "uncertain", reference, created: now() }); } catch {}
        return respond(202, { status: "uncertain", reference, message: "We cannot yet confirm whether the request was received. Please do not submit it again; use the Villiers link if you need help." });
      }
    }

    return respond(400, { error: "Unknown request." });
  };
}
