(function () {
  "use strict";
  var lastDate = "";
  function rememberDate(event) {
    var field = event.target;
    if (field && field.matches && field.matches('input[type="date"]')) lastDate = field.value;
  }
  document.addEventListener("input", rememberDate, true);
  document.addEventListener("change", rememberDate, true);
  document.addEventListener("click", function (event) {
    var button = event.target && event.target.closest && event.target.closest("button");
    if (!button || !/Get Transparent Range/i.test(button.textContent || "")) return;
    var dateField = button.parentElement && button.parentElement.querySelector('input[type="date"]');
    if (dateField) lastDate = dateField.value;
  }, true);
  // Same-tab session storage avoids placing a visitor's itinerary in a URL.
  window.TJQQuoteHandoff = function (trip) {
    try {
      window.sessionStorage.setItem("tjq-villiers-trip-v1", JSON.stringify({
        origin: String(trip.origin || "").slice(0, 100),
        destination: String(trip.destination || "").slice(0, 100),
        departure_date: String(trip.departure_date || lastDate || "").slice(0, 10),
        passengers: String(trip.passengers || "").slice(0, 2),
        saved: Date.now()
      }));
    } catch (error) {
      // The next page remains usable if storage is disabled.
    }
  };
})();
