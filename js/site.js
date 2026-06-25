/* Renders content from data.js in the active language. No framework. */

const ICON = (slug) => `https://cdn.simpleicons.org/${slug}`;
// marks Simple Icons dropped (self-hosted) + aliases for generic slugs
const ICON_LOCAL = { azure: "img/tech/azure.svg", aws: "img/tech/aws.svg", dbt: "img/tech/dbt.svg", openai: "img/tech/openai.svg" };
const ICON_ALIAS = { sql: "sqlite" };
const iconSrc = (slug) => ICON_LOCAL[slug] || ICON(ICON_ALIAS[slug] || slug);
// a project-stack slug -> its tech tag-page id (or null if no tech page exists)
const techIdForSlug = (slug) => {
  const items = DATA.TECH.flatMap((g) => g.items);
  const exact = items.find((it) => it.id === slug || it.slug === slug);  // prefer a direct match
  if (exact) return exact.id;
  const viaMatch = items.find((it) => (it.match || []).includes(slug));
  return viaMatch ? viaMatch.id : null;
};
const techSrc = (it) => it.src || ICON(it.slug);
const allTech = () => DATA.TECH.flatMap((g) => g.items);
const findTech = (id) => allTech().find((t) => t.id === id);
const projectsForTech = (t) => {
  const slugs = t.match || [t.id];
  if (t.slug) slugs.push(t.slug);
  return DATA.PROJECTS.filter((p) =>
    (p.stack || []).some((s) => slugs.includes(typeof s === "string" ? s : (s.slug || s.id || ""))));
};

/* Static UI labels (chrome that isn't in data.js). */
const UI = {
  nav_about:   T("About", "关于"),
  nav_exp:     T("Experience", "经历"),
  nav_edu:     T("Education", "教育"),
  nav_work:    T("Work", "项目"),
  nav_side:    T("Side", "随手"),
  nav_tech:    T("Stack", "技术栈"),
  nav_certs:   T("Certificates", "证书"),
  nav_contact: T("Contact", "联系"),
  cta_work:    T("View work", "查看项目"),
  cta_contact: T("Get in touch", "联系我"),
  h_about:     T("About", "关于"),
  h_exp:       T("Experience", "职业经历"),
  h_exp_sub:   T("Where I've shipped.", "我交付过的地方。"),
  current:     T("Current", "在职"),
  co_journey:  T("View journey ›", "查看历程 ›"),
  co_focus:    T("Focus", "专注方向"),
  co_path:     T("Journey", "成长历程"),
  co_dept:     T("Dept", "部门"),
  co_projects: T("Projects here", "这段时期的项目"),
  h_edu:       T("Education", "教育背景"),
  h_edu_sub:   T("Where I studied.", "我读书的地方。"),
  edu_courses: T("View courses ›", "查看课程 ›"),
  edu_gpa:     T("GPA", "GPA"),
  edu_courses_h: T("Courses", "课程"),
  h_work:      T("Selected Work", "精选项目"),
  h_work_sub:  T("Projects I've designed, built, and shipped.", "我设计、构建并上线的项目。"),
  h_side:      T("Side Projects", "随手项目"),
  h_side_sub:  T("Things I vibe-coded for fun — open source on GitHub.", "我随手 vibe-code 的小东西 —— GitHub 上开源。"),
  side_view:   T("GitHub", "GitHub"),
  side_demo:   T("Live demo", "在线体验"),
  h_tech:      T("Tech Stack", "技术栈"),
  h_tech_sub:  T("Tools I reach for.", "我常用的工具。"),
  h_certs:     T("Certificates", "证书"),
  h_certs_sub: T("Credentials I've earned.", "我取得的认证。"),
  cert_view:   T("View credential ›", "查看证书 ›"),
  cert_pending: T("Credential link coming soon", "证书链接待补充"),
  h_contact:   T("Let's talk", "联系我"),
  h_contact_sub: T("Open to interesting problems.", "欢迎有趣的问题与合作。"),
  more:        T("Learn more", "了解更多"),
  back:        T("Back to home", "返回首页"),
  role:        T("Role", "角色"),
  timeline:    T("Timeline", "时间"),
  stack:       T("Stack", "技术栈"),
  highlights:  T("Highlights", "亮点"),
  skills_set:  T("Skill set", "能力项"),
  shots:       T("Product screens", "产品截图"),
  hero_hint:   T("move your mouse · the glowing toys are explorable", "移动鼠标 · 发光的玩具可点击探索"),
  tech_since:  T("Using since", "开始使用"),
  tech_level:  T("Proficiency", "熟练度"),
  tech_projects: T("Main projects", "主要项目"),
  tech_none:   T("Project write-ups coming soon.", "相关项目介绍即将补充。"),
  notfound:    T("Not found.", "未找到。"),
};

let LANG = localStorage.getItem("lang") || "en";

const tr = (field) => (field ? field[LANG] : "");
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function setLang(l) {
  LANG = l;
  localStorage.setItem("lang", l);
  document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  document.body.className = "lang-" + l;
  const btn = document.getElementById("lang-toggle");
  if (btn) btn.textContent = l === "en" ? "中文" : "EN";
  render();
}

/* ----- renderers ----- */
function renderHome() {
  const P = DATA.PROFILE;
  document.title = tr(P.name) + " — " + tr(P.title);

  // hero
  set("#hero-name", tr(P.name));
  set("#hero-title", tr(P.title));
  set("#hero-tagline", tr(P.tagline));
  set("#cta-work", tr(UI.cta_work));
  set("#cta-contact", tr(UI.cta_contact));

  // nav labels
  set("#nav-about", tr(UI.nav_about));
  set("#nav-exp", tr(UI.nav_exp));
  set("#nav-edu", tr(UI.nav_edu));
  set("#nav-work", tr(UI.nav_work));
  set("#nav-side", tr(UI.nav_side));
  set("#nav-tech", tr(UI.nav_tech));
  set("#nav-certs", tr(UI.nav_certs));
  set("#nav-contact", tr(UI.nav_contact));

  // about
  set("#about-h", tr(UI.h_about));
  set("#about-text", tr(P.blurb));

  // experience
  set("#exp-h", tr(UI.h_exp));
  set("#exp-sub", tr(UI.h_exp_sub));
  const tl = document.getElementById("timeline");
  tl.innerHTML = "";
  DATA.EXPERIENCE.forEach((e) => {
    const item = el("div", "tl-item reveal" + (e.current ? " current" : ""));
    if (e.color) item.style.setProperty("--co", e.color);
    const ship = e.current
      ? `<span class="tl-ship"><svg viewBox="0 0 48 48"><use href="#ic-ship"/></svg></span>` : "";
    const curBadge = e.current
      ? `<span class="current-badge"><i></i>${esc(tr(UI.current))}</span>` : "";
    const logo = e.logo ? `<img class="co-logo" src="${esc(e.logo)}" alt="" loading="lazy">` : "";
    const coName = `${logo}<span>${esc(tr(e.company))}${e.url ? " ↗" : ""}</span>`;
    const domains = (e.domains || []).map((d) =>
      `<span class="domain-chip"><svg viewBox="0 0 48 48"><use href="#${d.icon}"/></svg>${esc(tr(d.label))}</span>`
    ).join("");
    item.innerHTML =
      ship +
      curBadge +
      `<div class="tl-date">${esc(e.date)}</div>` +
      `<div class="tl-role">${esc(tr(e.role))}</div>` +
      `<div class="tl-company">` +
        (e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${coName}</a>` : coName) +
      `</div>` +
      `<div class="tl-summary">${esc(tr(e.summary))}</div>` +
      (domains ? `<div class="domain-chips">${domains}</div>` : "") +
      (e.slug ? `<div class="tl-cta"><a class="tl-link" href="company.html?c=${esc(e.slug)}">${esc(tr(UI.co_journey))}</a></div>` : "");
    tl.appendChild(item);
  });

  // education
  set("#edu-h", tr(UI.h_edu));
  set("#edu-sub", tr(UI.h_edu_sub));
  const edu = document.getElementById("education-list");
  edu.innerHTML = "";
  (DATA.EDUCATION || []).forEach((e) => {
    const item = el("div", "tl-item reveal");
    item.innerHTML =
      `<div class="tl-date">${esc(e.date)}</div>` +
      `<div><div class="tl-role">${esc(tr(e.degree))}</div>` +
      `<div class="tl-company">${esc(tr(e.school))}</div>` +
      `<div class="tl-summary">${esc(tr(e.note))}` +
        (e.lab ? ` <a class="tl-link" href="${esc(e.lab.url)}" target="_blank" rel="noopener">${esc(tr(e.lab.name))} ↗</a>` : "") +
        (e.slug ? ` <a class="tl-link" href="edu.html?d=${esc(e.slug)}">${esc(tr(UI.edu_courses))}</a>` : "") +
      `</div></div>`;
    edu.appendChild(item);
  });

  // work
  set("#work-h", tr(UI.h_work));
  set("#work-sub", tr(UI.h_work_sub));
  const grid = document.getElementById("proj-grid");
  grid.innerHTML = "";
  DATA.PROJECTS.forEach((p) => {
    const a = el("a", "proj-card reveal");
    a.href = "project.html?slug=" + encodeURIComponent(p.slug);
    a.innerHTML =
      `<div class="proj-figure"><img src="${esc(p.thumb || p.figure)}" alt="${esc(tr(p.name))}" loading="lazy"></div>` +
      `<div class="proj-body"><h3>${esc(tr(p.name))}</h3>` +
      `<p class="one">${esc(tr(p.oneLiner))}</p>` +
      `<span class="proj-more">${esc(tr(UI.more))} ›</span></div>`;
    grid.appendChild(a);
  });

  // side projects (vibe-coded) — link out to GitHub
  set("#side-h", tr(UI.h_side));
  set("#side-sub", tr(UI.h_side_sub));
  const sideGrid = document.getElementById("side-grid");
  sideGrid.innerHTML = "";
  (DATA.SIDE || []).forEach((s) => {
    const card = el("div", "proj-card side-card reveal");
    const primary = s.demo || s.repo;
    const links =
      (s.demo ? `<a class="proj-more" href="${esc(s.demo)}" target="_blank" rel="noopener">${esc(tr(UI.side_demo))} ↗</a>` : "") +
      `<a class="side-repo" href="${esc(s.repo)}" target="_blank" rel="noopener">${esc(tr(UI.side_view))} ↗</a>`;
    card.innerHTML =
      `<a class="proj-figure" href="${esc(primary)}" target="_blank" rel="noopener"><img src="${esc(s.figure)}" alt="${esc(tr(s.name))}" loading="lazy"></a>` +
      `<div class="proj-body"><h3>${esc(tr(s.name))}</h3>` +
      `<p class="one">${esc(tr(s.oneLiner))}</p>` +
      (s.tech ? `<p class="proj-tech">${esc(s.tech)}</p>` : "") +
      `<div class="side-links">${links}</div></div>`;
    sideGrid.appendChild(card);
  });

  // tech
  set("#tech-h", tr(UI.h_tech));
  set("#tech-sub", tr(UI.h_tech_sub));
  const tech = document.getElementById("tech-grid");
  tech.innerHTML = "";
  DATA.TECH.forEach((g) => {
    const grp = el("div", "tech-group reveal");
    let rows = `<h4>${esc(tr(g.group))}</h4><div class="tech-row">`;
    g.items.forEach((it) => {
      rows += `<a class="tech-chip" href="tech.html?s=${encodeURIComponent(it.id)}"><img src="${techSrc(it)}" alt="${esc(it.label)}" loading="lazy" onerror="this.closest('.tech-chip').classList.add('no-ic');this.remove()"><span>${esc(it.label)}</span></a>`;
    });
    grp.innerHTML = rows + "</div>";
    tech.appendChild(grp);
  });

  // certificates
  set("#certs-h", tr(UI.h_certs));
  set("#certs-sub", tr(UI.h_certs_sub));
  const certs = document.getElementById("cert-grid");
  certs.innerHTML = "";
  (DATA.CERTS || []).forEach((c) => {
    const card = el(c.url ? "a" : "div", "cert-card reveal");
    if (c.url) { card.href = c.url; card.target = "_blank"; card.rel = "noopener"; }
    const src = c.icon ? (c.icon.src || ICON(c.icon.slug)) : "";
    card.innerHTML =
      `<div class="cert-ic">${src ? `<img src="${esc(src)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</div>` +
      `<div class="cert-info">` +
        `<h3>${esc(tr(c.name))}</h3>` +
        `<p class="cert-meta">${esc(typeof c.issuer === "string" ? c.issuer : tr(c.issuer))} · ${esc(c.date)}</p>` +
        (c.url ? `<span class="cert-link">${esc(tr(UI.cert_view))}</span>`
               : `<span class="cert-pending">${esc(tr(UI.cert_pending))}</span>`) +
      `</div>`;
    certs.appendChild(card);
  });

  // contact
  set("#contact-h", tr(UI.h_contact));
  set("#contact-sub", tr(UI.h_contact_sub));
  const links = document.getElementById("contact-links");
  links.innerHTML =
    `<a class="btn btn-primary" href="mailto:${esc(P.email)}">${esc(P.email)}</a>` +
    `<a class="btn btn-ghost" href="${esc(P.links.github)}" target="_blank" rel="noopener">GitHub</a>` +
    `<a class="btn btn-ghost" href="${esc(P.links.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`;

  // hero: hint + localized portal-toy labels
  set("#hero-hint", tr(UI.hero_hint));
  document.querySelectorAll(".hero-toys a.toy[data-portal]").forEach((a) => {
    const tp = DATA.TOPICS.find((x) => x.slug === a.dataset.portal);
    const lab = a.querySelector(".label");
    if (tp && lab) lab.textContent = tr(tp.label);
  });

  observeReveal();
}

/* ----- topic (interest) detail page ----- */
function renderTopic() {
  const slug = new URLSearchParams(location.search).get("t");
  const tp = DATA.TOPICS.find((x) => x.slug === slug);
  const root = document.getElementById("topic-root");
  set("#nav-back", tr(UI.back));

  if (!tp) {
    document.title = tr(UI.notfound);
    root.innerHTML = `<div class="wrap" style="padding:120px 0;text-align:center"><h1>${esc(tr(UI.notfound))}</h1><p style="margin-top:16px"><a href="index.html">${esc(tr(UI.back))} →</a></p></div>`;
    return;
  }
  document.title = tr(tp.name) + " — " + tr(DATA.PROFILE.name);
  root.innerHTML =
    `<div class="detail-hero"><div class="wrap">` +
      `<a class="detail-back" href="index.html">‹ ${esc(tr(UI.back))}</a>` +
      `<h1><span class="topic-ic"><svg viewBox="0 0 48 48"><use href="#${esc(tp.icon)}"/></svg></span>${esc(tr(tp.name))}</h1>` +
      `<p class="one">${esc(tr(tp.intro))}</p>` +
    `</div></div>` +
    `<div class="wrap"><div class="detail-figure"><img src="${esc(tp.figure)}" alt="${esc(tr(tp.name))}"></div></div>` +
    `<div class="wrap"><div class="detail-body"><p>${esc(tr(tp.body))}</p></div></div>`;
  observeReveal();
}

/* ----- company / journey page ----- */
function renderCompany() {
  const slug = new URLSearchParams(location.search).get("c");
  const e = (DATA.EXPERIENCE || []).find((x) => x.slug === slug);
  const root = document.getElementById("company-root");
  set("#nav-back", tr(UI.back));
  if (!e) {
    document.title = tr(UI.notfound);
    root.innerHTML = `<div class="wrap" style="padding:120px 0;text-align:center"><h1>${esc(tr(UI.notfound))}</h1><p style="margin-top:16px"><a href="index.html#experience">${esc(tr(UI.back))} →</a></p></div>`;
    return;
  }
  document.title = tr(e.company) + " — " + tr(DATA.PROFILE.name);
  const logo = e.logo ? `<img class="co-logo-lg" src="${esc(e.logo)}" alt="">` : "";
  const domains = (e.domains || []).map((d) =>
    `<span class="domain-chip"><svg viewBox="0 0 48 48"><use href="#${d.icon}"/></svg>${esc(tr(d.label))}</span>`).join("");
  let mentText = "";
  if (e.mentored) {
    mentText = LANG === "zh"
      ? `带教工程师${e.mentoredOngoing ? "(至今)" : ""}`
      : `Mentored engineers${e.mentoredOngoing ? " so far" : ""}`;
  }
  const mentStat = mentText
    ? `<div class="ment-stat"><svg viewBox="0 0 48 48"><use href="#ic-mentor"/></svg>${esc(mentText)}</div>` : "";

  const journey = (e.journey || []).map((m) =>
    `<div class="jrny-item"><div class="jrny-date">${esc(typeof m.date === "string" ? m.date : tr(m.date))}</div>` +
    `<div><div class="jrny-title">` +
      (m.level ? `<span class="jrny-level">${esc(typeof m.level === "string" ? m.level : tr(m.level))}</span>` : "") +
      `${esc(tr(m.title))}</div>` +
    `<div class="jrny-note">${esc(tr(m.note))}</div></div></div>`).join("");

  const projItems = (e.projects || [])
    .map((s) => DATA.PROJECTS.find((p) => p.slug === s)).filter(Boolean)
    .map((p) =>
      `<a class="tech-proj" href="project.html?slug=${encodeURIComponent(p.slug)}">` +
        `<img src="${esc(p.figure)}" alt="" loading="lazy">` +
        `<div><h4>${esc(tr(p.name))}</h4><p>${esc(tr(p.oneLiner))}</p></div></a>`).join("");

  root.innerHTML =
    `<div class="detail-hero" style="--co:${esc(e.color || "#0071e3")}"><div class="wrap">` +
      `<a class="detail-back" href="index.html#experience">‹ ${esc(tr(UI.back))}</a>` +
      `<h1>${esc(tr(e.role))}</h1>` +
      `<div class="co-line">${logo}` +
        (e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(tr(e.company))} ↗</a>` : `<span>${esc(tr(e.company))}</span>`) +
        (e.current ? `<span class="current-badge"><i></i>${esc(tr(UI.current))}</span>` : "") +
      `</div>` +
      `<div class="detail-meta"><span>${esc(e.date)}</span>` +
        (e.location ? `<span>${esc(tr(e.location))}</span>` : "") +
        (e.dept ? `<span><b>${esc(tr(UI.co_dept))}:</b> ${esc(tr(e.dept))}</span>` : "") +
      `</div>` +
      (domains ? `<div class="detail-stack">${domains}</div>` : "") +
      mentStat +
    `</div></div>` +
    `<div class="wrap"><div class="detail-body">` +
      (e.focus ? `<h3>${esc(tr(UI.co_focus))}</h3><p>${esc(tr(e.focus))}</p>` : "") +
      (journey ? `<h3>${esc(tr(UI.co_path))}</h3><div class="jrny">${journey}</div>` : "") +
    `</div></div>` +
    (projItems ? `<div class="wrap"><div class="detail-body"><h3>${esc(tr(UI.co_projects))}</h3><div class="tech-projs">${projItems}</div></div></div>` : "");
  observeReveal();
}

/* ----- education / transcript page ----- */
function renderEdu() {
  const slug = new URLSearchParams(location.search).get("d");
  const e = (DATA.EDUCATION || []).find((x) => x.slug === slug);
  const root = document.getElementById("edu-root");
  set("#nav-back", tr(UI.back));
  if (!e) {
    document.title = tr(UI.notfound);
    root.innerHTML = `<div class="wrap" style="padding:120px 0;text-align:center"><h1>${esc(tr(UI.notfound))}</h1><p style="margin-top:16px"><a href="index.html#education">${esc(tr(UI.back))} →</a></p></div>`;
    return;
  }
  document.title = tr(e.degree) + " — " + tr(DATA.PROFILE.name);
  const groups = (e.courseGroups || []).map((g) =>
    `<h3>${esc(tr(g.group))}</h3><div class="course-grid">` +
    g.courses.map((c) =>
      `<div class="course"><span class="course-name">${esc(tr(c.name))}</span><span class="course-score">${esc(c.score)}</span></div>`
    ).join("") + `</div>`
  ).join("");

  root.innerHTML =
    `<div class="detail-hero"><div class="wrap">` +
      `<a class="detail-back" href="index.html#education">‹ ${esc(tr(UI.back))}</a>` +
      `<h1>${esc(tr(e.degree))}</h1>` +
      `<p class="one">${esc(tr(e.school))}</p>` +
      `<div class="detail-meta">` +
        `<span>${esc(e.date)}</span>` +
        (e.gpa ? `<span><b>${esc(tr(UI.edu_gpa))}:</b> ${esc(e.gpa)}</span>` : "") +
        (e.lab ? `<span><a href="${esc(e.lab.url)}" target="_blank" rel="noopener">${esc(tr(e.lab.name))} ↗</a></span>` : "") +
      `</div>` +
    `</div></div>` +
    `<div class="wrap"><div class="detail-body edu-body">${groups}</div></div>`;
  observeReveal();
}

/* ----- tech tag page ----- */
function renderTech() {
  const id = new URLSearchParams(location.search).get("s");
  const t = findTech(id);
  const root = document.getElementById("tech-root");
  set("#nav-back", tr(UI.back));
  if (!t) {
    document.title = tr(UI.notfound);
    root.innerHTML = `<div class="wrap" style="padding:120px 0;text-align:center"><h1>${esc(tr(UI.notfound))}</h1><p style="margin-top:16px"><a href="index.html#tech">${esc(tr(UI.back))} →</a></p></div>`;
    return;
  }
  document.title = t.label + " — " + tr(DATA.PROFILE.name);
  const projs = projectsForTech(t);
  const projHtml = projs.length
    ? projs.map((p) =>
        `<a class="tech-proj" href="project.html?slug=${encodeURIComponent(p.slug)}">` +
          `<img src="${esc(p.figure)}" alt="" loading="lazy">` +
          `<div><h4>${esc(tr(p.name))}</h4><p>${esc(tr(p.oneLiner))}</p></div></a>`
      ).join("")
    : `<p class="muted">${esc(tr(UI.tech_none))}</p>`;

  root.innerHTML =
    `<div class="detail-hero"><div class="wrap">` +
      `<a class="detail-back" href="index.html#tech">‹ ${esc(tr(UI.back))}</a>` +
      `<h1><span class="tech-bigic"><img src="${techSrc(t)}" alt="" onerror="this.style.display='none'"></span>${esc(t.label)}</h1>` +
      `<div class="detail-meta">` +
        `<span><b>${esc(tr(UI.tech_since))}:</b> ${esc(t.since)}</span>` +
        `<span><b>${esc(tr(UI.tech_level))}:</b> ${esc(tr(t.level.label))}</span>` +
      `</div>` +
      `<div class="level-bar"><span style="width:${t.level.pct}%"></span></div>` +
    `</div></div>` +
    `<div class="wrap"><div class="detail-body">` +
      `<h3>${esc(tr(UI.tech_projects))}</h3>` +
      `<div class="tech-projs">${projHtml}</div>` +
    `</div></div>`;
  observeReveal();
}

/* ----- interactive hero: toys, droplets, parallax, scroll, nav state ----- */
function initHeroFX() {
  const hero = document.getElementById("hero");
  const layer = document.getElementById("hero-toys");
  const dropHost = document.getElementById("hero-drops");
  const content = document.getElementById("hero-content");
  const nav = document.querySelector(".nav");
  if (!hero || !layer) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const toys = [];
  (DATA.HERO_TOYS || []).forEach((spec, i) => {
    const isPortal = !!spec.portal;
    const el = document.createElement(isPortal ? "a" : "div");
    el.className = "toy";
    el.style.width = el.style.height = spec.size + "px";
    el.style.opacity = isPortal ? 0.95 : 0.4 + (i % 4) * 0.12;
    el.innerHTML = `<svg viewBox="0 0 48 48"><use href="#${spec.icon}"/></svg>`;
    if (isPortal) {
      el.href = "topic.html?t=" + encodeURIComponent(spec.portal);
      el.dataset.portal = spec.portal;
      el.insertAdjacentHTML("beforeend", `<span class="ring"></span><span class="label"></span>`);
    }
    const ang = (i / DATA.HERO_TOYS.length) * Math.PI * 2 + 0.5;
    const rx = 22 + (i * 53 % 24), ry = 20 + (i * 71 % 26);
    el.style.left = (50 + Math.cos(ang) * rx) + "%";
    el.style.top = (50 + Math.sin(ang) * ry) + "%";
    layer.appendChild(el);
    toys.push({ el, depth: isPortal ? 0.7 : 0.25 + (i % 5) * 0.16,
                phase: i * 1.7, amp: 6 + (i % 4) * 4, rx: 0, ry: 0 });
  });

  for (let i = 0; i < 16; i++) {
    const d = document.createElement("span");
    d.className = "drop";
    const s = 5 + (i * 13 % 12);
    d.style.width = s + "px"; d.style.height = (s * 1.3) + "px";
    d.style.left = (i * 61 % 100) + "%";
    d.style.animationDuration = (7 + (i * 17 % 9)) + "s";
    d.style.animationDelay = (-(i * 23 % 12)) + "s";
    d.style.opacity = 0.25 + (i % 4) * 0.12;
    dropHost.appendChild(d);
  }

  const blobs = [...hero.querySelectorAll(".blob")].map((el) => ({ el, depth: +el.dataset.depth }));

  // nav: transparent over hero, solid past it
  const navH = 48;
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("over-hero", (window.scrollY || 0) < hero.offsetHeight - navH);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  let mx = 0, my = 0, haveMouse = false;
  const cursor = { x: -1e4, y: -1e4 };
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    mx = e.clientX - (r.left + r.width / 2);
    my = e.clientY - (r.top + r.height / 2);
    cursor.x = e.clientX - r.left; cursor.y = e.clientY - r.top;
    haveMouse = true;
  });
  hero.addEventListener("pointerleave", () => { haveMouse = false; mx = my = 0; });

  const R = 130, PUSH = 90, start = performance.now();
  function frame(now) {
    const t = (now - start) / 1000;
    const sc = window.scrollY || 0;
    const heroH = hero.offsetHeight;
    if (content) {
      content.style.opacity = Math.max(0, 1 - sc / (heroH * 0.7));
      content.style.transform = `translateY(${sc * 0.25}px)`;
    }
    layer.style.opacity = Math.max(0, 1 - sc / (heroH * 0.9));
    blobs.forEach((b) => b.el.style.transform =
      `translate(${-mx * b.depth}px, ${-my * b.depth + sc * b.depth * 2}px)`);

    const hr = hero.getBoundingClientRect();
    toys.forEach((o) => {
      const px = -mx * o.depth * 0.5;
      const py = -my * o.depth * 0.5 - sc * o.depth * 0.6;
      const bob = Math.sin(t * 0.8 + o.phase) * o.amp;
      let tx = 0, ty = 0;
      if (haveMouse) {
        const tr2 = o.el.getBoundingClientRect();
        const cx = tr2.left + tr2.width / 2 - hr.left, cy = tr2.top + tr2.height / 2 - hr.top;
        const dx = cx - cursor.x, dy = cy - cursor.y, d = Math.hypot(dx, dy);
        if (d < R && d > 0.01) { const f = (1 - d / R) * PUSH; tx = dx / d * f; ty = dy / d * f; }
      }
      o.rx += (tx - o.rx) * 0.12; o.ry += (ty - o.ry) * 0.12;
      o.el.style.transform = `translate(${px + o.rx}px, ${py + bob + o.ry}px)`;
    });
    requestAnimationFrame(frame);
  }
  if (reduce) { layer.querySelectorAll(".toy").forEach((e) => e.style.transform = "none"); }
  else requestAnimationFrame(frame);
}

function renderProject() {
  const slug = new URLSearchParams(location.search).get("slug");
  const p = DATA.PROJECTS.find((x) => x.slug === slug);
  const root = document.getElementById("project-root");
  set("#nav-back", tr(UI.back));

  if (!p) {
    document.title = tr(UI.notfound);
    root.innerHTML = `<div class="wrap" style="padding:120px 0;text-align:center"><h1>${esc(tr(UI.notfound))}</h1><p style="margin-top:16px"><a href="index.html">${esc(tr(UI.back))} →</a></p></div>`;
    return;
  }

  document.title = tr(p.name) + " — " + tr(DATA.PROFILE.name);
  const stack = (p.stack || []).map((s) => {
    if (typeof s === "string") {
      const img = `<img src="${iconSrc(s)}" alt="${esc(s)}" title="${esc(s)}" loading="lazy" onerror="this.remove()">`;
      const tid = techIdForSlug(s);
      return tid ? `<a class="stack-logo" href="tech.html?s=${encodeURIComponent(tid)}" title="${esc(s)}">${img}</a>` : img;
    }
    const logo = s.slug ? `<img src="${iconSrc(s.slug)}" alt="" loading="lazy" onerror="this.remove()">`
               : s.src ? `<img src="${esc(s.src)}" alt="" loading="lazy" onerror="this.remove()">` : "";
    const title = s.note ? ` title="${esc(s.note)}"` : "";
    const inner = `${logo}<span>${esc(s.label)}</span>`;
    return s.url
      ? `<a class="stack-chip" href="${esc(s.url)}" target="_blank" rel="noopener"${title}>${inner} ↗</a>`
      : `<span class="stack-chip"${title}>${inner}</span>`;
  }).join("");
  const highlights = (p.highlights || []).map((h) => `<li>${esc(tr(h))}</li>`).join("");

  root.innerHTML =
    `<div class="detail-hero"><div class="wrap">` +
      `<a class="detail-back" href="index.html">‹ ${esc(tr(UI.back))}</a>` +
      `<h1>${esc(tr(p.name))}</h1>` +
      `<p class="one">${esc(tr(p.oneLiner))}</p>` +
      `<div class="detail-meta">` +
        `<span><b>${esc(tr(UI.role))}:</b> ${esc(tr(p.role))}</span>` +
        `<span><b>${esc(tr(UI.timeline))}:</b> ${esc(p.date)}</span>` +
      `</div>` +
      `<div class="detail-stack">${stack}</div>` +
    `</div></div>` +
    `<div class="wrap"><div class="detail-figure"><img src="${esc(p.figure)}" alt="${esc(tr(p.name))}"></div></div>` +
    `<div class="wrap"><div class="detail-body">` +
      `<p>${esc(tr(p.description))}</p>` +
      (highlights ? `<h3>${esc(tr(UI.highlights))}</h3><ul>${highlights}</ul>` : "") +
      (p.skills && p.skills.length ? `<h3>${esc(tr(UI.skills_set))}</h3><div class="skill-chips">${p.skills.map((s) => `<span class="skill-chip">${esc(tr(s))}</span>`).join("")}</div>` : "") +
    `</div></div>` +
    (p.gallery && p.gallery.length
      ? `<div class="wrap"><div class="detail-body"><h3>${esc(tr(UI.shots))}</h3></div>` +
        `<div class="proj-gallery">` +
        p.gallery.map((g) =>
          `<figure class="shot reveal"><img src="${esc(g.src)}" alt="${esc(tr(g.caption))}" loading="lazy">` +
          `<figcaption>${esc(tr(g.caption))}</figcaption></figure>`
        ).join("") + `</div></div>`
      : "");

  observeReveal();
}

/* ----- helpers ----- */
function set(sel, text) { const n = document.querySelector(sel); if (n) n.textContent = text; }

let io;
function observeReveal() {
  if (!io) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
  }
  document.querySelectorAll(".reveal:not(.in)").forEach((n) => io.observe(n));
}

function render() {
  if (document.getElementById("hero-name")) renderHome();
  else if (document.getElementById("project-root")) renderProject();
  else if (document.getElementById("topic-root")) renderTopic();
  else if (document.getElementById("tech-root")) renderTech();
  else if (document.getElementById("edu-root")) renderEdu();
  else if (document.getElementById("company-root")) renderCompany();
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof injectSprite === "function") injectSprite();
  initHeroFX();                 // builds toys once (no-op off the home page)
  const btn = document.getElementById("lang-toggle");
  if (btn) btn.addEventListener("click", () => setLang(LANG === "en" ? "zh" : "en"));
  setLang(LANG);                // renders + sets localized labels on the toys
});
