# painterV.github.io

Personal professional presentation for **Wenbao Li** — a pure-frontend,
Apple-style single-page site. No framework, no build step; serves directly on
GitHub Pages.

## Structure
- `index.html` — hero · about · experience · project grid · tech stack · contact
- `project.html` — per-project detail page, reads `?slug=<id>`
- `js/data.js` — **all content** (profile, experience, projects, tech). Every text field is `{ en, zh }`.
- `js/site.js` — language toggle (EN/中文), rendering, scroll-reveal
- `css/style.css` — design system
- `img/projects/` — project figures

## Adding / editing content
Edit `js/data.js` only. To add a project: append an object to `PROJECTS`
(unique `slug`), drop a figure in `img/projects/`, and point `figure` at it.
Tech logos load from the [Simple Icons](https://simpleicons.org) CDN by `slug`.

## Run locally
```
python3 -m http.server 8000
# open http://localhost:8000/
```
