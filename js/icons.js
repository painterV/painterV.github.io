/* Line-art icon sprite, injected once into <body>. Reference with <svg><use href="#ic-..."/></svg>.
   stroke=currentColor so color is set via CSS. All on a 0 0 48 48 viewBox. */

const ICON_SPRITE = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <g id="ic-helmet" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M11 27a13 13 0 0 1 26 0v4a2.5 2.5 0 0 1-2.5 2.5H27l-3.5 4h-7A2.5 2.5 0 0 1 14 35z"/>
    <path d="M15 27h18"/><path d="M20.5 27a6 5.5 0 0 1 12.5 0"/>
  </g>
  <g id="ic-cat" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 8l6 11M38 8l-6 11"/><circle cx="24" cy="26" r="14"/>
    <path d="M19 24h.01M29 24h.01" stroke-width="3.4"/><path d="M24 30v3"/>
    <path d="M11 27h7M30 27h7M12 31l6-1M36 31l-6-1"/>
  </g>
  <g id="ic-chart" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 42h36"/><path d="M12 42V28M22 42V16M32 42V22M40 42V12"/>
  </g>
  <g id="ic-chip" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="14" width="20" height="20" rx="3"/><rect x="20" y="20" width="8" height="8" rx="1.5"/>
    <path d="M19 14V8M29 14V8M19 40v-6M29 40v-6M14 19H8M14 29H8M40 19h-6M40 29h-6"/>
  </g>
  <g id="ic-code" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 15L7 24l10 9M31 15l10 9-10 9M27 11l-6 26"/>
  </g>
  <g id="ic-db" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="24" cy="11" rx="13" ry="5"/><path d="M11 11v22c0 2.8 5.8 5 13 5s13-2.2 13-5V11"/>
    <path d="M11 22c0 2.8 5.8 5 13 5s13-2.2 13-5"/>
  </g>
  <g id="ic-bolt" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26 6L12 28h11l-3 14 16-22H25z"/>
  </g>
  <g id="ic-paw" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="24" cy="32" rx="9" ry="7"/><circle cx="12" cy="20" r="3.4"/><circle cx="20" cy="13" r="3.4"/>
    <circle cx="28" cy="13" r="3.4"/><circle cx="36" cy="20" r="3.4"/>
  </g>
  <g id="ic-drop" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 7C16 18 12 24 12 30a12 12 0 0 0 24 0c0-6-4-12-12-23z"/>
  </g>

  <!-- data domains -->
  <g id="ic-ad" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 20v7l16 6V14z"/><path d="M24 14v19"/>
    <path d="M29 18c3.5 4 3.5 8 0 12"/><path d="M33.5 14c6 7 6 13 0 20"/>
    <path d="M12 27l2 8h3.5l-1.4-6.5"/>
  </g>
  <g id="ic-music" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="14" cy="32" rx="5" ry="4"/><ellipse cx="32" cy="29" rx="5" ry="4"/>
    <path d="M19 32V12l18-3v20"/>
  </g>
  <g id="ic-basket" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 19h32l-3.2 17a2.5 2.5 0 0 1-2.5 2H13.7a2.5 2.5 0 0 1-2.5-2z"/>
    <path d="M16 19a8 7 0 0 1 16 0"/>
    <path d="M18 24l1 9M24 24v9M30 24l-1 9"/>
  </g>
  <g id="ic-coupon" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 18h34v6.5a3.5 3.5 0 0 0 0 7V38H7v-6.5a3.5 3.5 0 0 0 0-7z"/>
    <circle cx="16" cy="28" r="3.4"/><path d="M14 30.5l4-5"/>
    <path d="M29 21v3M29 26.5v3M29 32v3"/>
  </g>
  <g id="ic-mentor" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="17" cy="15" r="6"/>
    <path d="M6 39v-3c0-5.5 5-9 11-9s11 3.5 11 9v3"/>
    <circle cx="35" cy="18" r="4.5"/>
    <path d="M29 39v-2.5c0-4.6 3.7-7.5 7-7.5s5 1.6 6 3.6"/>
  </g>
  <g id="ic-ship" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 30h30l-4 8.5a1.5 1.5 0 0 1-1.3.8H14.3a1.5 1.5 0 0 1-1.3-.8z"/>
    <path d="M24 6v24"/>
    <path d="M26.5 10l8.5 17h-8.5z"/>
    <path d="M21.5 14l-7 13h7"/>
    <path d="M6 35q3.5 3 7 0t7 0 7 0 7 0"/>
  </g>
</defs></svg>`;

function injectSprite() {
  if (document.getElementById("icon-sprite-host")) return;
  const host = document.createElement("div");
  host.id = "icon-sprite-host";
  host.innerHTML = ICON_SPRITE;
  document.body.prepend(host);
}
