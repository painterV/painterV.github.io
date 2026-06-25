/* Total-visits counter — Cloudflare Worker + KV (free tier).
   GET /hit  -> increment, returns { count }
   GET /     -> read only, returns { count } */
const ALLOW = new Set([
  "https://painterv.github.io",
  "http://localhost:8123",
  "http://127.0.0.1:8123",
]);

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowOrigin = ALLOW.has(origin) ? origin : "https://painterv.github.io";
    const cors = {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Vary": "Origin",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    const KEY = "total_visits";
    let count = parseInt((await env.VISITS.get(KEY)) || "0", 10) || 0;
    if (new URL(request.url).pathname === "/hit") {
      count += 1;
      await env.VISITS.put(KEY, String(count));
    }
    return new Response(JSON.stringify({ count }), {
      headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  },
};
