(function () {
  "use strict";

  function villiersLink(anchor) {
    if (!anchor || !anchor.href) return false;
    try {
      var host = new URL(anchor.href, document.baseURI).hostname.toLowerCase();
      return host === "villiers.ai" || host.endsWith(".villiers.ai");
    } catch (error) {
      return false;
    }
  }

  function placement(anchor) {
    var container = anchor.closest("[data-placement],section,header,footer,aside,article");
    return String(
      anchor.getAttribute("data-placement") ||
      (container && (container.getAttribute("data-placement") || container.id || container.className)) ||
      "page"
    ).slice(0, 120);
  }

  function record(anchor) {
    if (!villiersLink(anchor) || typeof window.gtag !== "function") return;
    window.gtag("event", "affiliate_outbound", {
      affiliate_partner: "Villiers",
      link_domain: "villiers.ai",
      placement: placement(anchor)
    });
  }

  document.addEventListener("click", function (event) {
    record(event.target && event.target.closest && event.target.closest("a[href]"));
  }, true);

  document.addEventListener("auxclick", function (event) {
    if (event.button !== 1) return;
    record(event.target && event.target.closest && event.target.closest("a[href]"));
  }, true);
})();
