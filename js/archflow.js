/* Interactive reference-architecture flow.
   Renders an inline SVG pipeline and drives request "packets" with rAF so a
   visitor can crank up traffic and inject per-node failures — showing load
   handling and graceful degradation (each downed stage is served from cache).
   Node labels are configurable per project via mount(host, {nodes}); a generic
   placeholder pipeline is used when a project hasn't supplied its own.
   ponytail: latency/QPS numbers are illustrative, not real telemetry. */
(function () {
  // generic placeholder pipeline — projects override via opts.nodes (5 stages)
  const DEFAULT_NODES = [
    { id: "client",  label: "CLIENT",  t1: "Request in", t2: "user / upstream" },
    { id: "gateway", label: "GATEWAY", t1: "Routing",    t2: "auth & dispatch" },
    { id: "service", label: "SERVICE", t1: "Core logic", t2: "business processing" },
    { id: "store",   label: "STORE",   t1: "Data layer", t2: "primary store" },
    { id: "serving", label: "SERVING", t1: "Response",   t2: "result → client" },
  ];
  const BW = 150, BH = 78, CY = 160;             // box width/height, top-row center-y
  const X = (i) => 70 + i * 160;                 // x of stage i
  const CXI = (i) => X(i) + BW / 2;
  const CACHE = { x: 390, y: 280, w: 310, h: 54, cy: 307 };  // wide cache row under stages 2–3
  const FAIL_IDX = [2, 3];                        // middle stages can fail over to cache

  const P99 = { 1: 28, 10: 55, 50: 140 };        // ms by traffic multiplier (healthy)
  const REPLICAS = { 1: 1, 10: 3, 50: 5 };       // entry + cache scale out with traffic
  const SPEED = 330;                              // px / sec along the route
  const MAX_PACKETS = 240;

  const L = (lang) => lang === "zh" ? {
    hint: "拉高流量,再让某个节点宕机 —— 看请求如何下沉到缓存兜底。(占位演示,数据为示意)",
    play: "暂停", playOff: "播放", traffic: "流量", reset: "重置", failSuffix: "故障",
    healthy: "正常", degraded: "降级 — 由缓存兜底", rps: "请求/秒", down: "故障", cacheNote: "任一阶段宕机时的兜底缓存",
  } : {
    hint: "Turn up the traffic, then take a node down — watch requests fall back to cache. (placeholder demo, illustrative numbers)",
    play: "Pause", playOff: "Play", traffic: "Traffic", reset: "Reset", failSuffix: "down",
    healthy: "Healthy", degraded: "Degraded — serving from cache", rps: "req/s", down: "DOWN", cacheNote: "stale fallback for any downed stage",
  };

  function dist(a, b) { return Math.hypot(b[0] - a[0], b[1] - a[1]); }
  function routeLen(r) { let s = 0; for (let i = 1; i < r.length; i++) s += dist(r[i - 1], r[i]); return s; }
  function pointAt(r, d) {
    for (let i = 1; i < r.length; i++) {
      const seg = dist(r[i - 1], r[i]);
      if (d <= seg) { const t = seg ? d / seg : 0; return [r[i - 1][0] + (r[i][0] - r[i - 1][0]) * t, r[i - 1][1] + (r[i][1] - r[i - 1][1]) * t]; }
      d -= seg;
    }
    return r[r.length - 1];
  }

  function nodeSvg(n, i) {
    const isServe = i === 4, isClient = i === 0;
    const stroke = isServe ? "#15b86c" : isClient ? "#86868b" : "#0071e3";
    const fill = isServe ? "#eafaf1" : "#fff";
    const sx = X(i);
    return `<g id="af-${n.id}">
      <rect x="${sx}" y="${CY - BH / 2}" width="${BW}" height="${BH}" rx="13" fill="${fill}" stroke="${stroke}" stroke-width="1.8" data-base="${stroke}"/>
      <text x="${sx + 16}" y="${CY - BH / 2 + 22}" class="af-stage" fill="${isServe ? "#15803d" : isClient ? "#86868b" : "#0071e3"}">${n.label}</text>
      <text x="${sx + 16}" y="${CY - BH / 2 + 44}" class="af-t1">${n.t1}</text>
      <text x="${sx + 16}" y="${CY - BH / 2 + 62}" class="af-t2">${n.t2}</text>
      <text x="${sx + BW - 14}" y="${CY - BH / 2 + 20}" class="af-badge" id="af-badge-${n.id}" text-anchor="end" fill="#d82c20"></text>
    </g>`;
  }

  function mount(root, opts) {
    opts = opts || {};
    const lang = opts.lang === "zh" ? "zh" : "en";
    const tx = L(lang);
    const NODES = (opts.nodes && opts.nodes.length === 5) ? opts.nodes : DEFAULT_NODES;
    const FAILABLE = FAIL_IDX.map((i) => NODES[i].id);
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // a downed stage dips to the cache row at its own x, then rejoins the pipeline
    const buildRoute = (down) => NODES.map((n, i) => [CXI(i), down[n.id] ? CACHE.cy : CY]);

    const arrows = [];
    for (let i = 1; i < NODES.length; i++) {
      arrows.push(`<line x1="${X(i - 1) + BW + 2}" y1="${CY}" x2="${X(i) - 6}" y2="${CY}" stroke="#c7c7cc" stroke-width="2" marker-end="url(#af-ah)"/>`);
    }
    FAIL_IDX.forEach((i) => {
      arrows.push(`<line x1="${CXI(i)}" y1="${CY + BH / 2}" x2="${CXI(i)}" y2="${CACHE.y}" stroke="#e2c0bd" stroke-width="2" stroke-dasharray="4 4"/>`);
    });

    root.innerHTML = `
      <div class="af-wrap">
        <div class="af-controls">
          <button class="af-btn af-play" data-act="play">▮▮ ${tx.play}</button>
          <span class="af-seg" role="group">
            <span class="af-lab">${tx.traffic}</span>
            <button class="af-btn af-tr" data-mult="1">×1</button>
            <button class="af-btn af-tr" data-mult="10">×10</button>
            <button class="af-btn af-tr" data-mult="50">×50</button>
          </span>
          ${FAILABLE.map((id) => `<button class="af-btn af-fail" data-node="${id}">⚡ ${NODES.find((n) => n.id === id).label} ${tx.failSuffix}</button>`).join("")}
          <button class="af-btn" data-act="reset">↺ ${tx.reset}</button>
        </div>
        <div class="af-stats">
          <span class="af-dot" id="af-status-dot"></span>
          <span id="af-status">${tx.healthy}</span>
          <span class="af-sep">·</span><span id="af-qps">1.8k</span> ${tx.rps}
          <span class="af-sep">·</span>p99 <span id="af-p99">28</span>ms
        </div>
        <svg viewBox="0 0 900 360" class="af-svg" role="img" aria-label="Interactive request-flow architecture">
          <defs>
            <marker id="af-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 Z" fill="#a1a1aa"/></marker>
            <filter id="af-glow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <style>
              .af-stage{font:700 10px -apple-system,Segoe UI,sans-serif;letter-spacing:1px}
              .af-t1{font:700 14px -apple-system,Segoe UI,sans-serif;fill:#1d1d1f}
              .af-t2{font:11px -apple-system,Segoe UI,sans-serif;fill:#86868b}
              .af-badge{font:700 9px -apple-system,Segoe UI,sans-serif;letter-spacing:.5px}
              .af-rep{font:700 11px -apple-system,Segoe UI,sans-serif}
            </style>
          </defs>
          ${arrows.join("")}
          <g id="af-replicas"></g>
          ${NODES.map(nodeSvg).join("")}
          <g id="af-cache">
            <rect x="${CACHE.x}" y="${CACHE.y}" width="${CACHE.w}" height="${CACHE.h}" rx="11" fill="#fff" stroke="#d82c20" stroke-width="1.6"/>
            <text x="${CACHE.x + 16}" y="${CACHE.y + 24}" class="af-t1" font-size="13">KV cache</text>
            <text x="${CACHE.x + 16}" y="${CACHE.y + 42}" class="af-t2">${tx.cacheNote}</text>
          </g>
          <g id="af-packets" filter="url(#af-glow)"></g>
        </svg>
        <p class="af-hint">${tx.hint}</p>
      </div>`;

    const gPackets = root.querySelector("#af-packets");
    const NS = "http://www.w3.org/2000/svg";
    const elStatus = root.querySelector("#af-status");
    const elDot = root.querySelector("#af-status-dot");
    const elQps = root.querySelector("#af-qps");
    const elP99 = root.querySelector("#af-p99");

    const down0 = () => { const o = {}; FAILABLE.forEach((id) => (o[id] = false)); return o; };
    const state = { mult: 10, down: down0(), running: !reduce, packets: [], spawnAcc: 0, last: 0 };
    const anyDown = () => FAILABLE.some((id) => state.down[id]);

    const gReplicas = root.querySelector("#af-replicas");
    function scaledBox(x, y, w, h, rx, n, color) {
      let s = "";
      for (let i = n - 1; i >= 1; i--) {            // faint stacked instances behind the node
        const o = i * 4;
        s += `<rect x="${x + o}" y="${y - o}" width="${w}" height="${h}" rx="${rx}" fill="#fff" stroke="${color}" stroke-width="1.4" opacity="${Math.max(0.2, 0.6 - (i - 1) * 0.12).toFixed(2)}"/>`;
      }
      if (n > 1) s += `<text x="${x + w / 2}" y="${y - (n - 1) * 4 - 7}" text-anchor="middle" class="af-rep" fill="${color}">×${n}</text>`;
      return s;
    }
    function renderReplicas() {
      const n = REPLICAS[state.mult] || 1;
      gReplicas.innerHTML = scaledBox(X(1), CY - BH / 2, BW, BH, 13, n, "#0071e3")       // entry (gateway)
                          + scaledBox(CACHE.x, CACHE.y, CACHE.w, CACHE.h, 11, n, "#d82c20"); // cache
    }
    function setTrafficUI() {
      root.querySelectorAll(".af-tr").forEach((b) => b.classList.toggle("on", +b.dataset.mult === state.mult));
      renderReplicas();
    }
    function setStats() {
      const q = state.mult * 1.8;
      elQps.textContent = q >= 10 ? Math.round(q) + "k" : q.toFixed(1) + "k";
      elP99.textContent = anyDown() ? 12 : (P99[state.mult] || 28);
      elStatus.textContent = anyDown() ? tx.degraded : tx.healthy;
      elDot.className = "af-dot " + (anyDown() ? "warn" : "ok");
    }
    function setFailUI() {
      FAILABLE.forEach((id) => {
        const r = root.querySelector("#af-" + id + " rect");
        const dn = state.down[id];
        r.setAttribute("stroke", dn ? "#d82c20" : r.dataset.base);
        r.setAttribute("stroke-dasharray", dn ? "5 4" : "");
        root.querySelector("#af-badge-" + id).textContent = dn ? tx.down : "";
      });
      root.querySelectorAll(".af-fail").forEach((b) => b.classList.toggle("on", state.down[b.dataset.node]));
      setStats();
    }
    function setPlayUI() {
      root.querySelector(".af-play").textContent = state.running ? "▮▮ " + tx.play : "▶ " + tx.playOff;
    }

    function spawn() {
      if (state.packets.length >= MAX_PACKETS) return;
      const failing = anyDown();
      const route = buildRoute(state.down);
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "5");
      c.setAttribute("fill", failing ? "#ff6b35" : "#0a84ff");
      gPackets.appendChild(c);
      state.packets.push({ el: c, route: route, len: routeLen(route), d: 0, failover: failing });
    }

    function flashNode(id) {
      if (state.down[id]) return;                  // don't light up a dead node
      const r = root.querySelector("#af-" + id + " rect");
      if (!r) return;
      r.setAttribute("stroke-width", "3.4");
      r._hot = performance.now();
    }

    function frame(ts) {
      if (!root.isConnected) return;                 // remounted/navigated away → stop
      if (!state.last) state.last = ts;
      const dt = Math.min(0.05, (ts - state.last) / 1000);
      state.last = ts;

      if (state.running) {
        state.spawnAcc += dt * state.mult * 2;
        while (state.spawnAcc >= 1) { spawn(); state.spawnAcc -= 1; }
        for (let i = state.packets.length - 1; i >= 0; i--) {
          const p = state.packets[i];
          p.d += SPEED * dt;
          if (p.d >= p.len) {
            flashNode(NODES[4].id);
            p.el.remove(); state.packets.splice(i, 1); continue;
          }
          const pt = pointAt(p.route, p.d);
          p.el.setAttribute("cx", pt[0]); p.el.setAttribute("cy", pt[1]);
          if (!p.failover) { const idx = Math.min(NODES.length - 1, Math.floor((p.d / p.len) * NODES.length)); flashNode(NODES[idx].id); }
        }
      }
      NODES.forEach((n) => {
        const r = root.querySelector("#af-" + n.id + " rect");
        if (r && r._hot && ts - r._hot > 110) { r.setAttribute("stroke-width", "1.8"); r._hot = 0; }
      });
      requestAnimationFrame(frame);
    }

    root.querySelector(".af-controls").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.mult) { state.mult = +b.dataset.mult; setTrafficUI(); setStats(); }
      else if (b.dataset.node) { state.down[b.dataset.node] = !state.down[b.dataset.node]; setFailUI(); }
      else if (b.dataset.act === "play") { state.running = !state.running; state.last = 0; setPlayUI(); }
      else if (b.dataset.act === "reset") {
        state.down = down0(); state.mult = 10; state.running = true; state.last = 0;
        state.packets.forEach((p) => p.el.remove()); state.packets = [];
        setFailUI(); setTrafficUI(); setStats(); setPlayUI();
      }
    });

    setTrafficUI(); setFailUI(); setStats(); setPlayUI();
    requestAnimationFrame(frame);
  }

  window.ArchFlow = { mount };
})();
