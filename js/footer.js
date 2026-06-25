/* Footer: year + live local visit time + (optional) total-visits counter. */
(function () {
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());

  var vt = document.getElementById("visit-time");
  var vc = document.getElementById("visit-count");
  var total = null;

  // Set COUNTER_URL to your deployed Worker (e.g. https://visit-counter.xxx.workers.dev).
  // Leave blank to disable the counter — the visit clock still works.
  var COUNTER_URL = "";
  if (vc && COUNTER_URL) {
    var path = sessionStorage.getItem("vc_seen") ? "/" : "/hit";  // count once per session
    fetch(COUNTER_URL + path)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        sessionStorage.setItem("vc_seen", "1");
        if (d && typeof d.count === "number") { total = d.count; render(); }
      })
      .catch(function () {});
  }

  function render() {
    var zh = (document.documentElement.lang || "en").indexOf("zh") === 0;
    if (vt) {
      var s = new Date().toLocaleString(zh ? "zh-CN" : "en-US", { dateStyle: "medium", timeStyle: "medium" });
      vt.textContent = (zh ? "本地访问时间 · " : "Local visit time · ") + s;
    }
    if (vc && total != null) {
      vc.textContent = (zh ? " · 总访问 " : " · Total visits ") + total.toLocaleString();
    }
  }
  render();
  setInterval(render, 1000);
})();
