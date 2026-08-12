(function () {
  "use strict";

  var FORM_NAME = "affiliate-click";
  var AFFILIATE_HOST = "villiers.ai";
  var DEFAULT_AFFILIATE_ID = "1673";

  function isVilliersLink(anchor) {
    if (!anchor || !anchor.href) return false;
    try {
      var url = new URL(anchor.href, document.baseURI);
      return url.hostname === AFFILIATE_HOST || url.hostname.endsWith("." + AFFILIATE_HOST);
    } catch (error) {
      return false;
    }
  }

  function eventId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
  }

  function cleanLabel(anchor) {
    var label = anchor.getAttribute("aria-label") || anchor.textContent || "Villiers link";
    return label.replace(/\s+/g, " ").trim().slice(0, 160);
  }

  function payloadFor(anchor) {
    var destination = new URL(anchor.href, document.baseURI);
    return new URLSearchParams({
      "form-name": FORM_NAME,
      event_id: eventId(),
      event_type: "affiliate_click",
      occurred_at: new Date().toISOString(),
      page_path: window.location.pathname,
      partner: "Villiers",
      placement: anchor.getAttribute("data-placement") || (anchor.closest("section,header,footer,aside,article") || {}).id || (anchor.closest("section,header,footer,aside,article") || {}).className || "page",
      button_label: cleanLabel(anchor),
      destination: destination.origin + destination.pathname,
      affiliate_id: destination.searchParams.get("id") || DEFAULT_AFFILIATE_ID
    });
  }

  function record(anchor) {
    if (!isVilliersLink(anchor)) return;
    var body = payloadFor(anchor).toString();
    try {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
        credentials: "same-origin",
        keepalive: true
      }).catch(function () {});
    } catch (error) {
      // Tracking must never prevent the visitor from reaching Villiers.
    }
  }

  document.addEventListener("click", function (event) {
    var anchor = event.target && event.target.closest && event.target.closest("a[href]");
    record(anchor);
  }, true);

  document.addEventListener("auxclick", function (event) {
    if (event.button !== 1) return;
    var anchor = event.target && event.target.closest && event.target.closest("a[href]");
    record(anchor);
  }, true);
})();
