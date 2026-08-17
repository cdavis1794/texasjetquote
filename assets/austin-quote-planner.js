(function () {
  "use strict";

  var AFFILIATE_URL = "https://villiers.ai/?id=1673";

  function byId(id) {
    return document.getElementById(id);
  }

  function localDateString(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function includesAny(value, terms) {
    return terms.some(function (term) { return value.indexOf(term) !== -1; });
  }

  function isAustin(value) {
    return includesAny(value, ["austin", "aus", "edc"]);
  }

  function isTexasHub(value) {
    return includesAny(value, ["austin", "aus", "edc", "houston", "hou", "iah", "dallas", "dal", "dfw"]);
  }

  function estimateRoute(origin, destination, passengers) {
    var from = origin.toLowerCase();
    var to = destination.toLowerCase();
    var route;

    if (isTexasHub(from) && isTexasHub(to)) {
      route = {
        low: 8000,
        high: 14000,
        aircraft: "Light jet: Phenom 300, CJ4, or similar",
        duration: "45m–1h 10m",
        note: "Short Texas missions can still include positioning and minimum operating costs."
      };
    } else if ((isAustin(from) && includesAny(to, ["miami", "fort lauderdale", "palm beach", "mia", "fll", "opf"])) || (isAustin(to) && includesAny(from, ["miami", "fort lauderdale", "palm beach", "mia", "fll", "opf"]))) {
      route = {
        low: 18000,
        high: 32000,
        aircraft: "Midsize jet: Citation XLS, Phenom 300, or similar",
        duration: "2h 10m–2h 40m",
        note: "Baggage and passenger count can move this mission between light and midsize categories."
      };
    } else if ((isAustin(from) && includesAny(to, ["new york", "nyc", "teterboro", "teb", "white plains", "hpn"])) || (isAustin(to) && includesAny(from, ["new york", "nyc", "teterboro", "teb", "white plains", "hpn"]))) {
      route = {
        low: 28000,
        high: 48000,
        aircraft: "Super-mid or heavy jet: Challenger 350, Gulfstream G200, or similar",
        duration: "3h 15m–3h 40m",
        note: "Nonstop capability, cabin needs, and New York-area airport availability can materially affect the result."
      };
    } else if ((isAustin(from) && includesAny(to, ["aspen", "ase"])) || (isAustin(to) && includesAny(from, ["aspen", "ase"]))) {
      route = {
        low: 22000,
        high: 38000,
        aircraft: "Midsize or super-mid jet with suitable mountain-airport performance",
        duration: "2h 15m–2h 40m",
        note: "Aspen missions require aircraft and crews suited to the airport and current operating conditions."
      };
    } else if ((isAustin(from) && includesAny(to, ["cabo", "san jose del cabo", "sjd"])) || (isAustin(to) && includesAny(from, ["cabo", "san jose del cabo", "sjd"]))) {
      route = {
        low: 35000,
        high: 55000,
        aircraft: "Super-mid or heavy jet: Challenger 350, Gulfstream G280, or similar",
        duration: "3h–3h 30m",
        note: "International handling, customs, and overwater requirements must be confirmed for the itinerary."
      };
    } else if ((isAustin(from) && includesAny(to, ["las vegas", "vegas", "las"])) || (isAustin(to) && includesAny(from, ["las vegas", "vegas", "las"]))) {
      route = {
        low: 24000,
        high: 40000,
        aircraft: "Midsize or super-mid jet: Citation Sovereign, Hawker 800, or similar",
        duration: "2h 55m–3h 15m",
        note: "Weekend demand and aircraft positioning can widen the current quote range."
      };
    } else {
      route = {
        low: 19000,
        high: 36000,
        aircraft: "Midsize, super-mid, or heavy options depending on distance",
        duration: "Route-dependent",
        note: "This broad planning range is a starting point. Current aircraft position and exact distance may change it substantially."
      };
    }

    if (Number(passengers) >= 9) {
      route.low = Math.round(route.low * 1.25 / 1000) * 1000;
      route.high = Math.round(route.high * 1.25 / 1000) * 1000;
      route.aircraft = "Super-mid or heavy cabin suitable for " + passengers + " passengers";
      route.note += " The passenger count may require a larger cabin than the base route estimate.";
    }

    return route;
  }

  function money(value) {
    return "$" + Number(value).toLocaleString("en-US");
  }

  function event(name, detail) {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({event: name, page_path: window.location.pathname}, detail || {}));
    }
  }

  function recordSavedQuoteConversion() {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-18387073303/uwaLCPKBrOMcEJfy0b9E"
      });
    }
  }

  function setView(view) {
    var planner = byId("quote-planner");
    var result = byId("planning-result");
    var lead = byId("lead-form");
    var success = byId("planner-success");
    var step = byId("planner-step");

    planner.hidden = view !== "planner";
    result.hidden = view !== "result";
    lead.hidden = view !== "lead";
    success.hidden = view !== "success";

    if (view === "planner") step.textContent = "Step 1 of 2";
    if (view === "result") step.textContent = "Range ready";
    if (view === "lead") step.textContent = "Step 2 of 2";
    if (view === "success") step.textContent = "Saved";
  }

  function populateLeadFields(route) {
    byId("lead-origin").value = byId("planner-origin").value.trim();
    byId("lead-destination").value = byId("planner-destination").value.trim();
    byId("lead-passengers").value = byId("planner-passengers").value;
    byId("lead-date").value = byId("planner-date").value;
    byId("lead-estimate-low").value = money(route.low);
    byId("lead-estimate-high").value = money(route.high);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var plannerForm = byId("quote-planner");
    var leadForm = byId("lead-form");
    var dateInput = byId("planner-date");
    var destinationInput = byId("planner-destination");
    var currentRoute = null;

    if (!plannerForm || !leadForm || !dateInput) return;

    dateInput.min = localDateString(new Date());
    if (!dateInput.value) {
      var suggested = new Date();
      suggested.setDate(suggested.getDate() + 7);
      dateInput.value = localDateString(suggested);
    }

    try {
      var queryDestination = new URL(window.location.href).searchParams.get("to");
      if (queryDestination) destinationInput.value = queryDestination.slice(0, 100);
    } catch (error) {}

    plannerForm.addEventListener("submit", function (submitEvent) {
      submitEvent.preventDefault();
      if (!plannerForm.reportValidity()) return;

      var origin = byId("planner-origin").value.trim();
      var destination = destinationInput.value.trim();
      var passengers = byId("planner-passengers").value;
      currentRoute = estimateRoute(origin, destination, passengers);

      byId("estimate-low").textContent = money(currentRoute.low);
      byId("estimate-high").textContent = money(currentRoute.high);
      byId("estimate-route").textContent = origin + " → " + destination + " · " + passengers + " passenger" + (passengers === "1" ? "" : "s");
      byId("estimate-aircraft").textContent = currentRoute.aircraft;
      byId("estimate-duration").textContent = currentRoute.duration;
      byId("estimate-note").textContent = currentRoute.note;
      populateLeadFields(currentRoute);
      setView("result");
      event("austin_planning_range", {destination: destination.toLowerCase(), passengers: passengers});
    });

    byId("show-lead-form").addEventListener("click", function () {
      if (!currentRoute) return;
      setView("lead");
      byId("lead-name").focus();
      event("austin_lead_form_opened");
    });

    byId("back-to-result").addEventListener("click", function () {
      setView("result");
    });

    byId("start-over").addEventListener("click", function () {
      setView("planner");
      destinationInput.focus();
    });

    byId("new-request").addEventListener("click", function () {
      plannerForm.reset();
      leadForm.reset();
      byId("planner-origin").value = "Austin, TX (AUS / EDC)";
      var suggested = new Date();
      suggested.setDate(suggested.getDate() + 7);
      dateInput.value = localDateString(suggested);
      byId("lead-status").textContent = "";
      currentRoute = null;
      setView("planner");
      destinationInput.focus();
    });

    leadForm.addEventListener("submit", async function (submitEvent) {
      submitEvent.preventDefault();
      if (!leadForm.reportValidity()) return;

      var button = byId("save-request");
      var status = byId("lead-status");
      button.disabled = true;
      button.textContent = "Saving request…";
      status.textContent = "";
      leadForm.setAttribute("aria-busy", "true");

      try {
        var formData = new FormData(leadForm);
        formData.set("form-name", "texas-private-jet-quote");
        formData.set("affiliate_url", AFFILIATE_URL);
        var response = await fetch("/", {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: new URLSearchParams(formData).toString(),
          credentials: "same-origin"
        });
        if (!response.ok) throw new Error("Request could not be saved");
        setView("success");
        event("austin_quote_request_saved");
        recordSavedQuoteConversion();
      } catch (error) {
        status.textContent = "We could not save the request. Please try again or continue to Villiers for current options.";
        button.disabled = false;
        button.textContent = "Save quote request";
      } finally {
        leadForm.removeAttribute("aria-busy");
      }
    });

    document.querySelectorAll("a.villiers-link").forEach(function (link) {
      link.addEventListener("click", function () {
        event("austin_villiers_click", {button_label: link.textContent.trim().slice(0, 80)});
      });
    });

    setView("planner");
  });
})();
