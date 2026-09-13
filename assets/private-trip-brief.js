(function () {
  "use strict";

  var form = document.querySelector(".brief-form");
  var success = document.querySelector(".submission-success");
  var tierInputs = document.querySelectorAll('input[name="request_type"]');
  var submit = document.querySelector("[data-trip-brief-submit]");
  var tierNote = document.querySelector("[data-tier-note]");
  var params = new URLSearchParams(window.location.search);

  function activeTier() {
    var selected = document.querySelector('input[name="request_type"]:checked');
    return selected ? selected.value : "arrival_preview";
  }

  function updateTier() {
    var full = activeTier() === "full_brief";
    if (submit) submit.textContent = full ? "Request my Full Brief — $249" : "Create my free Arrival Preview";
    if (tierNote) tierNote.textContent = full
      ? "We confirm fit and send secure payment instructions before work begins."
      : "The complimentary preview is a planning starting point, not a reservation or quote.";
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

  if (params.get("submitted") === "1" && form && success) {
    form.hidden = true;
    success.hidden = false;
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
