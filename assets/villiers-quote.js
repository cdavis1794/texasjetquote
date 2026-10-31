(function () {
  "use strict";
  var byId = function (id) { return document.getElementById(id); };
  var ticket = "";
  var currentTrip = null;
  var submitting = false;
  var providerSubmitted = false;

  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function show(name) {
    ["trip-form", "estimate-result", "contact-form", "complete"].forEach(function (id) { byId(id).hidden = id !== name; });
    byId("quote-status").textContent = "";
  }
  function event(name) {
    if (/^(?:www\.)?texasjetquote\.com$/.test(window.location.hostname) && typeof window.gtag === "function") {
      try { window.gtag("event", name, { page_path: "/request-quote/" }); } catch (error) {}
    }
  }
  function trackQuote(email) {
    // Sandbox and local QA must never create an advertising conversion.
    if (email.trim().toLowerCase() === "sandbox-test@mail.villiers.ai" || !/^(?:www\.)?texasjetquote\.com$/.test(window.location.hostname)) return;
    event("villiers_quote_submitted");
    if (typeof window.gtag === "function") {
      try { window.gtag("event", "conversion", { send_to: "AW-18387073303/Z9O3CP3Yra8dEJfy0b9E" }); } catch (error) {}
    }
  }
  async function call(body) {
    var response = await fetch("/api/villiers-quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), credentials: "same-origin" });
    var data;
    try { data = await response.json(); }
    catch (error) { throw new Error(response.status === 429 ? "Too many requests. Please wait a few minutes and try again." : "The quote service is temporarily unavailable. Please use the Villiers link below."); }
    if (!response.ok) throw new Error(data.error || "The request is temporarily unavailable.");
    return data;
  }
  function money(value, currency) {
    try { return new Intl.NumberFormat("en-US", { style: "currency", currency: currency, maximumFractionDigits: 0 }).format(value); }
    catch (error) { return currency + " " + Number(value).toLocaleString("en-US"); }
  }
  document.addEventListener("DOMContentLoaded", function () {
    var date = byId("departure");
    date.min = today();
    try {
      var raw = sessionStorage.getItem("tjq-villiers-trip-v1");
      sessionStorage.removeItem("tjq-villiers-trip-v1");
      var trip = raw ? JSON.parse(raw) : null;
      if (trip && Date.now() - trip.saved < 30 * 60 * 1000) {
        byId("origin").value = trip.origin || "";
        byId("destination").value = trip.destination || "";
        date.value = trip.departure_date || "";
        byId("passengers").value = trip.passengers || "3";
      }
    } catch (error) {}

    byId("trip-form").addEventListener("submit", async function (e) {
      e.preventDefault();
      if (submitting || !e.currentTarget.reportValidity()) return;
      submitting = true;
      var button = byId("estimate-submit");
      button.disabled = true;
      button.textContent = "Checking Villiers estimate…";
      byId("quote-status").textContent = "";
      currentTrip = { origin: byId("origin").value.trim(), destination: byId("destination").value.trim(), departure_date: date.value, passengers: Number(byId("passengers").value) };
      try {
        var result = await call(Object.assign({ action: "estimate", website: "" }, currentTrip));
        if (!result.ticket || !Array.isArray(result.estimates) || !result.estimates.length) throw new Error("No estimate was available. Please use the Villiers link below.");
        ticket = result.ticket;
        byId("estimate-route").textContent = currentTrip.origin + " → " + currentTrip.destination + " · " + currentTrip.departure_date + " · " + currentTrip.passengers + " passenger" + (currentTrip.passengers === 1 ? "" : "s");
        byId("provider-route").textContent = result.providerRoute ? "Villiers identified: " + result.providerRoute : "";
        var list = byId("estimate-categories");
        list.replaceChildren();
        result.estimates.forEach(function (estimate) {
          var li = document.createElement("li"), category = document.createElement("span"), price = document.createElement("strong");
          category.textContent = estimate.category;
          price.textContent = money(estimate.low, estimate.currency) + "–" + money(estimate.high, estimate.currency);
          li.append(category, price); list.append(li);
        });
        show("estimate-result");
        event("villiers_estimate_viewed");
      } catch (error) { byId("quote-status").textContent = error.message || "The estimate is temporarily unavailable. Please use the Villiers link below."; }
      finally { submitting = false; button.disabled = false; button.textContent = "See Villiers estimate →"; }
    });
    byId("request-options").addEventListener("click", function () { if (ticket) { show("contact-form"); byId("first-name").focus(); } });
    byId("change-trip").addEventListener("click", function () { ticket = ""; show("trip-form"); });
    byId("back-to-estimate").addEventListener("click", function () { show("estimate-result"); });
    byId("contact-form").addEventListener("submit", async function (e) {
      e.preventDefault();
      if (submitting || providerSubmitted || !ticket || !e.currentTarget.reportValidity()) return;
      submitting = true;
      var button = byId("confirm-submit");
      button.disabled = true;
      button.textContent = "Sending to Villiers…";
      byId("quote-status").textContent = "";
      try {
        var result = await call({ action: "confirm", ticket: ticket, first_name: byId("first-name").value, last_name: byId("last-name").value, email: byId("email").value, phone: byId("phone").value, consent: byId("consent").checked, website: byId("website").value });
        if (result.status === "received" || result.status === "sandbox") {
          providerSubmitted = true;
          byId("reference").textContent = result.reference || "";
          if (result.status === "sandbox") {
            byId("complete-title").textContent = "Sandbox test accepted.";
            byId("complete-message").textContent = "This was a test. No operator was contacted and no options email will be sent.";
          }
          show("complete");
          if (result.status === "received") trackQuote(byId("email").value);
        } else {
          providerSubmitted = true;
          byId("quote-status").textContent = result.message || "We cannot yet confirm the request. Please do not submit it again.";
          button.textContent = "Submission status uncertain";
        }
      } catch (error) { byId("quote-status").textContent = error.message || "We could not send the request. Please use the Villiers link below."; }
      finally { submitting = false; if (!providerSubmitted) { button.disabled = false; button.textContent = "Send request to Villiers →"; } }
    });
    show("trip-form");
  });
})();
