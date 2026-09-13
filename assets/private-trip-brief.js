(function () {
  "use strict";

  var form = document.querySelector(".brief-form");
  var success = document.querySelector(".submission-success");
  var tierInputs = document.querySelectorAll('input[name="request_type"]');
  var submit = document.querySelector("[data-trip-brief-submit]");
  var tierNote = document.querySelector("[data-tier-note]");
  var checkoutNotice = document.querySelector("[data-checkout-return]");
  var submissionMessage = document.querySelector("[data-submission-message]");
  var submissionCheckout = document.querySelector("[data-submission-checkout]");
  var params = new URLSearchParams(window.location.search);
  var checkoutReturn = params.get("checkout") === "complete";

  function activeTier() {
    var selected = document.querySelector('input[name="request_type"]:checked');
    return selected ? selected.value : "arrival_preview";
  }

  function updateTier() {
    var full = activeTier() === "full_brief";
    if (submit) submit.textContent = full ? "Save my Full Brief preferences" : "Create my free Arrival Preview";
    if (tierNote) tierNote.textContent = full
      ? "After saving your preferences, continue to secure Stripe checkout to commission the Full Brief."
      : "The complimentary preview is a planning starting point, not a reservation or quote.";
    if (form) {
      var returnQuery = full && checkoutReturn ? "&checkout=complete" : "";
      form.action = "/private-trip-brief/?submitted=1&tier=" + (full ? "full_brief" : "arrival_preview") + returnQuery;
    }
  }

  function selectTier(value) {
    var input = document.querySelector('input[name="request_type"][value="' + value + '"]');
    if (input) {
      input.checked = true;
      updateTier();
    }
  }

  document.querySelectorAll("[data-trip-brief-tier]").forEach(function (control) {
    control.addEventListener("click", function () {
      selectTier(control.getAttribute("data-trip-brief-tier"));
    });
  });

  tierInputs.forEach(function (input) { input.addEventListener("change", updateTier); });
  if (params.get("tier") === "full_brief") selectTier("full_brief");
  updateTier();

  if (checkoutReturn && checkoutNotice) checkoutNotice.hidden = false;

  if (params.get("submitted") === "1" && form && success) {
    form.hidden = true;
    success.hidden = false;
    var submittedFullBrief = params.get("tier") === "full_brief";
    if (submittedFullBrief && checkoutReturn) {
      if (submissionMessage) submissionMessage.textContent = "Your trip preferences are recorded. We will match them to the secure checkout details before beginning the Full Brief. This is planning only; no supplier reservation has been made or held.";
    } else if (submittedFullBrief) {
      if (submissionMessage) submissionMessage.textContent = "Your trip preferences are recorded. Continue to secure checkout to commission the Full Brief. Payment covers the planning brief only; no supplier reservation has been made or held.";
      if (submissionCheckout) submissionCheckout.hidden = false;
    }
    document.getElementById("brief-intake").scrollIntoView({ block: "start" });
  }

  if (form) {
    form.addEventListener("submit", function () {
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          lead_type: activeTier(),
          destination_present: Boolean(form.elements.destination && form.elements.destination.value.trim())
        });
      }
    });
  }
})();
