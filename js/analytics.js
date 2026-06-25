/* Google Analytics 4 — privacy-light, opt-in by ID.
   Set MEASUREMENT_ID to your GA4 property ("G-XXXXXXXXXX") to enable.
   While the placeholder is in place this file makes ZERO network calls. */
(function () {
  var MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: paste your GA4 Measurement ID here
  if (!MEASUREMENT_ID || MEASUREMENT_ID.indexOf("XXXX") !== -1) return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, { anonymize_ip: true });
})();
