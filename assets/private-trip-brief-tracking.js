(function () {
  "use strict";
  document.addEventListener("click", function (event) {
    var checkout = event.target && event.target.closest && event.target.closest("[data-trip-brief-checkout]");
    var link = event.target && event.target.closest && event.target.closest("[data-trip-brief-cta]");
    if ((!link && !checkout) || typeof window.gtag !== "function") return;
    try {
    if (checkout) {
      window.gtag("event", "begin_checkout", Object.assign({
        currency: "USD",
        value: 249,
        items: [{ item_name: "Jet-to-Door Private Trip Brief", price: 249, quantity: 1 }],
        placement: checkout.getAttribute("data-placement") || "trip_brief_page"
      }, window.TJQAcquisition ? window.TJQAcquisition.values() : {}));
      return;
    }
    window.gtag("event", "private_trip_brief_click", Object.assign({
      placement: link.getAttribute("data-placement") || "trip_brief_page",
      tier: link.getAttribute("data-trip-brief-tier") || "arrival_preview"
    }, window.TJQAcquisition ? window.TJQAcquisition.values() : {}));
    } catch (error) {}
  }, true);
})();
