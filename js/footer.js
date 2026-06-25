/* Footer: current year + live local "visit time", bilingual via <html lang>. */
(function () {
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());
  var vt = document.getElementById("visit-time");
  if (!vt) return;
  function tick() {
    var zh = (document.documentElement.lang || "en").indexOf("zh") === 0;
    var s = new Date().toLocaleString(zh ? "zh-CN" : "en-US", { dateStyle: "medium", timeStyle: "medium" });
    vt.textContent = (zh ? "本地访问时间 · " : "Local visit time · ") + s;
  }
  tick();
  setInterval(tick, 1000);
})();
