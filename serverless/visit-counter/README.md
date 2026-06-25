# Visit counter — Cloudflare Worker + KV

Free, persistent total-visits counter for the static site (no backend server to run).

## Deploy (≈5 min)
1. `npm i -g wrangler`  (or prefix the commands below with `npx`)
2. `wrangler login`
3. `wrangler kv namespace create VISITS`
   → copy the printed `id` into `wrangler.toml` (replace `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`).
4. `wrangler deploy`
   → note the URL, e.g. `https://visit-counter.<your-subdomain>.workers.dev`
5. In `../../js/footer.js`, set `COUNTER_URL` to that URL. Commit & push.

## Endpoints
- `GET /hit` → increment total, returns `{ "count": N }`
- `GET /`    → read total without incrementing, returns `{ "count": N }`

## Notes
- CORS is restricted to `painterv.github.io` (+ localhost for testing). Edit `ALLOW` in `worker.js` to change.
- The frontend increments **once per browser session** (sessionStorage), so refreshes don't inflate the count.
- KV increments are read-modify-write (not strictly atomic) — fine for a personal site. For exact concurrency-safe counts, use a Durable Object (Workers Paid plan).
