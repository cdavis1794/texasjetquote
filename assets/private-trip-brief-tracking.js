(function () {
  "use strict";
  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest && event.target.closest("[data-trip-brief-cta]");
    if (!link || typeof window.gtag !== "function") return;
    window.gtag("event", "private_trip_brief_click", {
      placement: link.getAttribute("data-placement") || "trip_brief_page",
      tier: link.getAttribute("data-trip-brief-tier") || "arrival_preview"
    });
  }, true);
})();
