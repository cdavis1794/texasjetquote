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
  var status = document.querySelector("[data-trip-brief-status]");
  var saving = false;
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

  function showAccepted(acceptedTier) {
    if (!form || !success) return;
    form.hidden = true;
    success.hidden = false;
    var submittedFullBrief = acceptedTier === "full_brief";
    if (submittedFullBrief && checkoutReturn) {
      if (submissionMessage) submissionMessage.textContent = "Your trip preferences are recorded. We will match them to the secure checkout details before beginning the Full Brief. This is planning only; no supplier reservation has been made or held.";
    } else if (submittedFullBrief) {
      if (submissionMessage) submissionMessage.textContent = "Your trip preferences are recorded. Continue to secure checkout to commission the Full Brief. Payment covers the planning brief only; no supplier reservation has been made or held.";
      if (submissionCheckout) submissionCheckout.hidden = false;
    }
    var intake = document.getElementById("brief-intake");
    if (intake) intake.scrollIntoView({ block: "start" });
  }

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (saving || !form.reportValidity()) return;
      saving = true;
      var acceptedTier = activeTier();
      if (submit) submit.disabled = true;
      if (status) status.textContent = "Saving your preferences…";
      form.setAttribute("aria-busy", "true");
      try {
        if (window.TJQAcquisition) window.TJQAcquisition.populate(form);
        var data = new FormData(form);
        data.set("form-name", "private-trip-brief");
        var response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
          credentials: "same-origin"
        });
        if (!response.ok) throw new Error("Preferences were not accepted");
        showAccepted(acceptedTier);
        if (status) status.textContent = "Preferences saved.";
        try {
          if (typeof window.gtag === "function") window.gtag("event", "generate_lead", Object.assign({
            lead_source: "private_trip_brief",
            lead_type: acceptedTier
          }, window.TJQAcquisition ? window.TJQAcquisition.values() : {}));
        } catch (error) {}
      } catch (error) {
        if (status) status.textContent = "We could not save your preferences. Please try again.";
      } finally {
        saving = false;
        if (submit) submit.disabled = false;
        form.removeAttribute("aria-busy");
      }
    });
  }
})();
