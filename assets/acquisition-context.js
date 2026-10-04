(function () {
  "use strict";
  // Tab-scoped campaign labels only. Never retain raw URLs, click IDs or visitor IDs.
  var KEY = "tjq_campaign_context_v1";
  var fields = ["source", "medium", "campaign", "content"];
  var knownSources = ["youtube", "google", "bing", "duckduckgo", "yahoo", "facebook", "instagram", "linkedin", "x", "twitter", "tiktok", "newsletter", "email", "wellplayed", "direct", "social", "search", "referral", "other"];
  var knownMedia = ["organic", "organic_social", "cpc", "ppc", "paid_social", "paid-social", "social", "email", "video", "referral", "none", "display", "affiliate", "sponsored", "newsletter", "other"];
  // Explicit public campaign tokens from the launch queue, planned short-03 brief,
  // published-post log and first-party evergreen generator. Unknown labels never retain visitor text.
  var knownCampaigns = ["organic_launch_30d", "daily_empty_leg", "daily_quote_planner"];
  var knownContents = ["tjq02", "tjq03", "quote_planner", "empty-legs-khou-klas-cessna-citation-v-2026-09-19-c1604968", "empty-legs-khou-klas-cessna-citation-v-2026-09-22-72194246"];
  var pages = ["/", "/index.html", "/austin-private-jet-charter.html", "/dallas-private-jet-charter.html", "/houston-private-jet-charter.html", "/san-antonio-private-jet-charter.html", "/private-trip-brief/", "/deals/", "/blog/", "/blog/private-jet-charter-safety-checklist-texas.html", "/blog/private-jet-airports-texas.html", "/blog/how-much-private-jet-texas-costs-2026.html", "/blog/austin-to-houston-private-jet-cost.html", "/blog/austin-to-dallas-private-jet-cost.html", "/contact/", "/about/", "/privacy/", "/terms/", "/affiliate-disclosure/", "/booking-refund-policy/"];
  // The sitemap's city and article URLs omit .html; accept both public versions.
  pages = pages.concat(pages.filter(function (path) { return path !== "/index.html" && path.endsWith(".html"); }).map(function (path) { return path.slice(0, -5); }));
  function knownToken(value, allowed) {
    if (typeof value !== "string" || !value) return "";
    return value.length <= 64 && allowed.indexOf(value.toLowerCase()) >= 0 ? value.toLowerCase() : "other";
  }
  function label(value) {
    if (typeof value !== "string" || value.length > 64) return "";
    // Source and medium must be bounded slugs before classification.
    return /^[a-z][a-z0-9_-]{0,63}$/i.test(value) && !/\d{7}/.test(value) ? value.toLowerCase() : "";
  }
  function page() { return pages.indexOf(window.location.pathname) >= 0 ? window.location.pathname : "other"; }
  function clean(value) {
    var result = {};
    fields.forEach(function (field) { result[field] = label(value && value[field]); });
    result.campaign = knownToken(value && value.campaign, knownCampaigns);
    result.content = knownToken(value && value.content, knownContents);
    if (result.source && knownSources.indexOf(result.source) < 0) result.source = "other";
    if (result.medium && knownMedia.indexOf(result.medium) < 0) result.medium = "other";
    result.landing_page = value && pages.indexOf(value.landing_page) >= 0 ? value.landing_page : "other";
    return result;
  }
  var current = clean(null);
  try { current = clean(JSON.parse(window.sessionStorage.getItem(KEY))); } catch (error) {}
  try {
    var params = new URLSearchParams(window.location.search);
    var incoming = {};
    fields.forEach(function (field) { incoming[field] = field === "campaign" || field === "content" ? params.get("utm_" + field) : label(params.get("utm_" + field)); });
    if (fields.some(function (field) { return incoming[field]; }) || !current.source) {
      incoming.landing_page = page();
      if (!incoming.source) {
        var host = "";
        try { host = new URL(document.referrer).hostname.toLowerCase(); } catch (error) {}
        var search = /(^|\.)(google\.com|bing\.com|duckduckgo\.com|yahoo\.com)$/.test(host);
        var social = /(^|\.)(facebook\.com|instagram\.com|linkedin\.com|t\.co|youtube\.com)$/.test(host);
        incoming.source = !host || host === window.location.hostname ? "direct" : search ? "search" : social ? "social" : "referral";
        incoming.medium = incoming.medium || (incoming.source === "direct" ? "none" : incoming.source === "search" ? "organic" : "referral");
      }
      current = clean(incoming);
      try { window.sessionStorage.setItem(KEY, JSON.stringify(current)); } catch (error) {}
    }
  } catch (error) {}
  function values() {
    var result = {};
    fields.forEach(function (field) { result["acquisition_" + field] = current[field]; });
    result.acquisition_landing_page = current.landing_page;
    return result;
  }
  function populate(form) {
    if (!form || !form.elements) return;
    var context = values();
    Object.keys(context).forEach(function (name) {
      var field = form.elements.namedItem ? form.elements.namedItem(name) : form.elements[name];
      if (field && field.type === "hidden") field.value = context[name];
    });
  }
  window.TJQAcquisition = { values: values, populate: populate, page: page, label: label };
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('form[data-netlify="true"]').forEach(populate);
  });
})();
