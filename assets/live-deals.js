(function () {
  "use strict";

  var list = document.getElementById("deal-list");
  var status = document.getElementById("deal-status");
  var updated = document.getElementById("last-updated");
  var parameters = new URLSearchParams(window.location.search);
  var requestedDeal = parameters.get("deal") || "";

  function appendText(parent, tag, value, className) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = value;
    parent.appendChild(element);
    return element;
  }

  function dateLabel(value) {
    var date = new Date(value + "T12:00:00Z");
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
  }

  function fact(listElement, label, value) {
    if (!value) return;
    var item = document.createElement("li");
    var strong = document.createElement("strong");
    strong.textContent = label + ": ";
    item.appendChild(strong);
    item.appendChild(document.createTextNode(value));
    listElement.appendChild(item);
  }

  function card(deal) {
    var article = document.createElement("article");
    article.className = "deal-card";
    var header = document.createElement("div");
    appendText(header, "p", "Live empty-leg opportunity", "deal-card__tag");
    appendText(header, "h3", deal.origin.name + " → " + deal.destination.name, "deal-card__route");
    appendText(header, "p", deal.origin.code + " → " + deal.destination.code, "deal-card__codes");
    article.appendChild(header);

    var facts = document.createElement("ul");
    facts.className = "deal-card__facts";
    fact(facts, "Departure", dateLabel(deal.departureDate) + (deal.departureTime ? " at " + deal.departureTime : ""));
    fact(facts, "Aircraft", deal.aircraft);
    fact(facts, "Seats", deal.seats ? "Up to " + deal.seats + " passengers" : "");
    fact(facts, "Flight time", deal.flightDuration);
    article.appendChild(facts);

    var price = appendText(article, "p", "Listed from " + deal.price, "deal-card__price");
    appendText(price, "span", " — subject to availability");

    var link = document.createElement("a");
    link.className = "button";
    link.href = deal.bookingUrl;
    link.target = "_blank";
    link.rel = "sponsored nofollow noopener noreferrer";
    link.dataset.placement = "live-empty-leg-" + deal.id;
    link.textContent = "Check current details on Villiers";
    article.appendChild(link);
    return article;
  }

  function emptyState(message) {
    var container = document.createElement("div");
    container.className = "empty-state";
    appendText(container, "strong", "No current Texas-connected empty-leg opportunity is listed right now. ");
    container.appendChild(document.createTextNode(message + " "));
    var link = document.createElement("a");
    link.href = "https://villiers.ai/?id=1673";
    link.target = "_blank";
    link.rel = "sponsored nofollow noopener noreferrer";
    link.dataset.placement = "live-deals-empty-state";
    link.textContent = "Request current aircraft options through Villiers.";
    container.appendChild(link);
    list.appendChild(container);
  }

  function render(payload) {
    list.replaceChildren();
    list.setAttribute("aria-busy", "false");
    if (!payload.deals.length) {
      emptyState("Availability changes rapidly and we only show entries with a listed date and price.");
      status.textContent = "No qualifying live inventory is currently available.";
      return;
    }

    payload.deals.forEach(function (deal) { list.appendChild(card(deal)); });
    status.textContent = payload.requestedDealAvailable === false && requestedDeal
      ? "That specific opportunity is no longer listed. Here are the current Texas-connected options."
      : "Current Texas-connected opportunities.";
    if (payload.generatedAt) {
      updated.textContent = "Feed checked " + new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(payload.generatedAt));
    }
  }

  async function load() {
    var endpoint = new URL("/.netlify/functions/deals", window.location.origin);
    if (requestedDeal) endpoint.searchParams.set("deal", requestedDeal);
    try {
      var response = await fetch(endpoint.toString(), { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Inventory service returned " + response.status);
      render(await response.json());
    } catch (error) {
      list.replaceChildren();
      list.setAttribute("aria-busy", "false");
      emptyState("The live inventory service is temporarily unavailable.");
      status.dataset.state = "notice";
      status.textContent = "We could not load current inventory. Please try again shortly.";
    }
  }

  load();
})();
