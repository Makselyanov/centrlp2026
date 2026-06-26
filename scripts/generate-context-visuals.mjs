import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require("G:/mvp/skills/playwright-cli-browser/node_modules/playwright"));
}

const WIDTH = 1200;
const HEIGHT = 630;
const HOME_WIDTH = 1200;
const HOME_HEIGHT = 675;
const SERVICE_OVERVIEW_WIDTH = 1200;
const SERVICE_OVERVIEW_HEIGHT = 900;

const colors = {
  ink: "#0f172a",
  muted: "#64748b",
  line: "#dbeafe",
  blue: "#0096D6",
  green: "#44B78B",
  dark: "#0C1626",
  surface: "#ffffff",
  softBlue: "#e0f2fe",
  softGreen: "#dcfce7",
};

const logoFiles = {
  telegram: "public/assets/brand-logos/telegram.svg",
  vk: "public/assets/brand-logos/vk.svg",
  avito: "public/assets/brand-logos/avito.svg",
  yandexDirect: "public/assets/brand-logos/yandex-direct.svg",
  max: "public/assets/messengers/max-mark.svg",
};

const logoCache = new Map();

const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function logoDataUri(key) {
  if (!key || !logoFiles[key]) return "";
  if (logoCache.has(key)) return logoCache.get(key);
  const abs = path.join(ROOT, logoFiles[key]);
  if (!fs.existsSync(abs)) return "";
  const svg = fs.readFileSync(abs);
  const uri = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  logoCache.set(key, uri);
  return uri;
}

function background(width, height) {
  const rows = [];
  for (let x = 0; x <= width; x += 60) {
    rows.push(`<path d="M ${x} 0 L ${x} ${height}" stroke="#e2e8f0" stroke-width="1" opacity="0.38" />`);
  }
  for (let y = 0; y <= height; y += 60) {
    rows.push(`<path d="M 0 ${y} L ${width} ${y}" stroke="#e2e8f0" stroke-width="1" opacity="0.38" />`);
  }
  return `
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f8fbff" />
        <stop offset="52%" stop-color="#ffffff" />
        <stop offset="100%" stop-color="#edfdf5" />
      </linearGradient>
      <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors.blue}" />
        <stop offset="100%" stop-color="${colors.green}" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="24" stdDeviation="26" flood-color="#0f172a" flood-opacity="0.12"/>
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    ${rows.join("")}
    <circle cx="${width - 58}" cy="78" r="142" fill="${colors.softBlue}" opacity="0.7" />
    <circle cx="${width - 34}" cy="${height - 46}" r="118" fill="${colors.softGreen}" opacity="0.72" />
    <circle cx="54" cy="${height - 48}" r="132" fill="#e0f2fe" opacity="0.52" />`;
}

function renderServiceSvg(item) {
  const slug = item.slug || "";
  const logos = (item.brands || [])
    .filter((brand) => brand.logo)
    .slice(0, 3)
    .map((brand, index) => logoDisc(brand.logo, 96 + index * 102, 104 + (index % 2) * 34, 76))
    .join("");

  const channelLogos = logos || `
    <circle cx="134" cy="142" r="38" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
    <circle cx="234" cy="176" r="38" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
    <circle cx="334" cy="142" r="38" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
  `;

  let scene = "";

  if (slug.includes("yandex")) {
    scene = `
      ${logoDisc("yandexDirect", 118, 112, 92)}
      ${browserPanel(150, 286, 286, 190, "blue")}
      ${arrowLine(446, 380, 548, 380, "green")}
      ${growthPanel(562, 118, 286, 178)}
      ${crmBoard(790, 332, 280, 218)}
      ${arrowLine(706, 296, 790, 386)}
    `;
  } else if (slug.includes("telegram") || slug.includes("max") || slug.includes("chatbot") || slug.includes("auto")) {
    scene = `
      ${channelLogos}
      ${phonePanel(184, 250, 150, 244)}
      ${arrowLine(356, 374, 486, 374, "green")}
      ${aiOrb(592, 374, 92)}
      ${arrowLine(688, 374, 792, 374)}
      ${crmBoard(812, 254, 276, 228)}
    `;
  } else if (slug.includes("website") || slug.includes("design") || slug.includes("copy") || slug.includes("offer") || slug.includes("branding")) {
    scene = `
      ${browserPanel(116, 168, 330, 228, "blue")}
      ${phonePanel(498, 238, 138, 224)}
      ${arrowLine(654, 348, 760, 348, "green")}
      ${crmBoard(782, 198, 278, 230)}
      ${growthPanel(778, 464, 282, 126)}
    `;
  } else if (slug.includes("analytics") || slug.includes("ab-testing") || slug.includes("marketing")) {
    scene = `
      ${browserPanel(112, 182, 296, 196, "green")}
      ${growthPanel(456, 116, 300, 198)}
      ${arrowLine(610, 314, 702, 402, "green")}
      ${crmBoard(736, 348, 304, 214)}
      <path d="M190 512 C314 462 404 552 526 492" fill="none" stroke="url(#brand)" stroke-width="10" stroke-linecap="round" opacity="0.28" />
    `;
  } else if (slug.includes("crm") || slug.includes("n8n") || slug.includes("openclaw") || slug.includes("ai")) {
    scene = `
      ${browserPanel(112, 292, 244, 158, "blue")}
      ${arrowLine(370, 372, 498, 372, "green")}
      ${aiOrb(610, 372, 104)}
      ${arrowLine(718, 372, 812, 372)}
      ${crmBoard(832, 236, 284, 246)}
    `;
  } else if (slug.includes("avito") || slug.includes("vk")) {
    scene = `
      ${channelLogos}
      ${browserPanel(156, 266, 276, 188, "green")}
      ${arrowLine(444, 360, 548, 360, "green")}
      ${phonePanel(578, 238, 136, 224)}
      ${arrowLine(732, 360, 822, 360)}
      ${crmBoard(842, 250, 250, 218)}
    `;
  } else {
    scene = `
      ${channelLogos}
      ${browserPanel(118, 286, 254, 168, "blue")}
      ${arrowLine(388, 370, 500, 370, "green")}
      ${aiOrb(608, 370, 94)}
      ${arrowLine(708, 370, 812, 370)}
      ${crmBoard(832, 242, 276, 236)}
    `;
  }

  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${background(WIDTH, HEIGHT)}
    <rect x="54" y="54" width="1092" height="522" rx="42" fill="#ffffff" opacity="0.86" filter="url(#shadow)" />
    <rect x="54" y="54" width="1092" height="522" rx="42" fill="none" stroke="#dbeafe" />
    ${scene}
    <path d="M102 532 C254 474 382 560 528 514 C684 466 774 510 944 532" fill="none" stroke="url(#brand)" stroke-width="10" stroke-linecap="round" opacity="0.25" />
  </svg>
  </body></html>`;
}

function renderBlogSvg(post) {
  const brands = detectBrands(`${post.title} ${post.description} ${(post.tags || []).join(" ")}`);
  const brandMarkup = brands
    .filter((brand) => brand.logo)
    .slice(0, 3)
    .map((brand, index) => logoDisc(brand.logo, 116 + index * 94, 112 + (index % 2) * 30, 72))
    .join("");
  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${background(WIDTH, HEIGHT)}
    <rect x="54" y="54" width="1092" height="522" rx="42" fill="#ffffff" opacity="0.88" filter="url(#shadow)" />
    <rect x="54" y="54" width="1092" height="522" rx="42" fill="none" stroke="#dbeafe" />
    ${brandMarkup}
    ${browserPanel(116, 236, 294, 202, "blue")}
    ${phonePanel(466, 192, 142, 232)}
    ${arrowLine(622, 312, 730, 312, "green")}
    ${aiOrb(822, 312, 92)}
    ${crmBoard(790, 420, 294, 120)}
    <path d="M190 512 C330 454 472 550 624 500 C742 462 846 500 1014 464" fill="none" stroke="url(#brand)" stroke-width="10" stroke-linecap="round" opacity="0.28" />
  </svg>
  </body></html>`;
}

function renderHomeSvg(item) {
  const width = HOME_WIDTH;
  const height = HOME_HEIGHT;
  const key = path.basename(item.out, ".png");
  const brandDiscs = (item.brands || [])
    .filter((brand) => brand.logo)
    .slice(0, 3)
    .map((brand, index) => logoDisc(brand.logo, 92 + index * 96, 92 + (index % 2) * 26, 76))
    .join("");

  let scene = "";

  if (key === "digital-products") {
    scene = `
      ${brandDiscs}
      ${phonePanel(172, 250, 146, 240)}
      ${browserPanel(376, 178, 300, 210, "green")}
      ${arrowLine(684, 292, 798, 292, "green")}
      ${crmBoard(820, 206, 286, 228)}
    `;
  } else if (key === "ai-systems") {
    scene = `
      ${browserPanel(116, 278, 272, 178, "blue")}
      ${arrowLine(402, 364, 508, 364, "green")}
      ${aiOrb(624, 364, 110)}
      ${arrowLine(738, 364, 838, 364)}
      ${crmBoard(858, 244, 264, 230)}
    `;
  } else if (key === "team-tools") {
    scene = `
      ${browserPanel(116, 164, 326, 220, "blue")}
      ${stageCluster(498, 178, 0.84, "green")}
      ${arrowLine(704, 324, 812, 324, "green")}
      ${crmBoard(834, 224, 266, 232)}
    `;
  } else {
    scene = `
      ${brandDiscs}
      ${phonePanel(198, 250, 142, 232)}
      ${arrowLine(360, 364, 500, 364, "green")}
      ${browserPanel(528, 206, 274, 192, "blue")}
      ${arrowLine(814, 304, 906, 304)}
      ${crmBoard(920, 210, 226, 210)}
    `;
  }

  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${background(width, height)}
    <rect x="52" y="52" width="1096" height="571" rx="44" fill="#ffffff" opacity="0.86" filter="url(#shadow)" />
    <rect x="52" y="52" width="1096" height="571" rx="44" fill="none" stroke="#dbeafe" />
    ${scene}
    <path d="M116 560 C280 502 424 590 586 532 C744 476 852 538 1058 502" fill="none" stroke="url(#brand)" stroke-width="11" stroke-linecap="round" opacity="0.24" />
  </svg>
  </body></html>`;
}

function arrowLine(x1, y1, x2, y2, tone = "blue") {
  const accent = tone === "green" ? colors.green : colors.blue;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 14;
  const p1 = `${x2},${y2}`;
  const p2 = `${x2 - size * Math.cos(angle - 0.45)},${y2 - size * Math.sin(angle - 0.45)}`;
  const p3 = `${x2 - size * Math.cos(angle + 0.45)},${y2 - size * Math.sin(angle + 0.45)}`;
  return `
    <g>
      <path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round" opacity="0.72" />
      <polygon points="${p1} ${p2} ${p3}" fill="${accent}" opacity="0.72" />
    </g>`;
}

function logoDisc(key, x, y, size = 78) {
  const icon = logoDataUri(key);
  const radius = size / 2;
  return `
    <g>
      <circle cx="${x + radius}" cy="${y + radius}" r="${radius}" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
      ${icon ? `<image href="${icon}" x="${x + size * 0.21}" y="${y + size * 0.21}" width="${size * 0.58}" height="${size * 0.58}" preserveAspectRatio="xMidYMid meet" />` : ""}
    </g>`;
}

function browserPanel(x, y, w = 252, h = 178, tone = "blue") {
  const accent = tone === "green" ? colors.green : colors.blue;
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
      <rect x="${x}" y="${y}" width="${w}" height="42" rx="28" fill="#eff6ff" />
      <circle cx="${x + 28}" cy="${y + 21}" r="6" fill="${colors.blue}" opacity="0.72" />
      <circle cx="${x + 50}" cy="${y + 21}" r="6" fill="${colors.green}" opacity="0.72" />
      <rect x="${x + 26}" y="${y + 66}" width="${w - 52}" height="18" rx="9" fill="${accent}" opacity="0.7" />
      <rect x="${x + 26}" y="${y + 102}" width="${w - 96}" height="12" rx="6" fill="#cbd5e1" />
      <rect x="${x + 26}" y="${y + 132}" width="${w - 132}" height="20" rx="10" fill="${colors.green}" opacity="0.78" />
    </g>`;
}

function phonePanel(x, y, w = 138, h = 238) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="#0f172a" filter="url(#shadow)" />
      <rect x="${x + 12}" y="${y + 18}" width="${w - 24}" height="${h - 36}" rx="24" fill="#f8fafc" />
      <rect x="${x + 34}" y="${y + 48}" width="${w - 68}" height="16" rx="8" fill="${colors.blue}" opacity="0.78" />
      <rect x="${x + 28}" y="${y + 88}" width="${w - 56}" height="48" rx="18" fill="#dbeafe" />
      <rect x="${x + 28}" y="${y + 152}" width="${w - 56}" height="48" rx="18" fill="#dcfce7" />
    </g>`;
}

function aiOrb(x, y, r = 86) {
  return `
    <g>
      <circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
      <circle cx="${x}" cy="${y}" r="${r * 0.54}" fill="url(#brand)" opacity="0.88" />
      <circle cx="${x - 34}" cy="${y - 28}" r="13" fill="#ffffff" opacity="0.95" />
      <circle cx="${x + 38}" cy="${y - 18}" r="12" fill="#ffffff" opacity="0.95" />
      <circle cx="${x + 8}" cy="${y + 42}" r="12" fill="#ffffff" opacity="0.95" />
      <path d="M${x - 34} ${y - 28} L${x + 38} ${y - 18} L${x + 8} ${y + 42} L${x - 34} ${y - 28}" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.74" />
    </g>`;
}

function crmBoard(x, y, w = 284, h = 244) {
  const colW = (w - 64) / 3;
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="32" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
      ${[0, 1, 2].map((col) => `
        <rect x="${x + 24 + col * (colW + 8)}" y="${y + 32}" width="${colW}" height="${h - 64}" rx="18" fill="${col % 2 ? "#ecfdf5" : "#eff6ff"}" />
        <rect x="${x + 36 + col * (colW + 8)}" y="${y + 58}" width="${colW - 24}" height="28" rx="12" fill="#ffffff" stroke="#dbeafe" />
        <rect x="${x + 36 + col * (colW + 8)}" y="${y + 104}" width="${colW - 24}" height="42" rx="14" fill="#ffffff" stroke="#dbeafe" />
        <rect x="${x + 36 + col * (colW + 8)}" y="${y + 162}" width="${colW - 24}" height="28" rx="12" fill="${col % 2 ? colors.green : colors.blue}" opacity="0.62" />
      `).join("")}
    </g>`;
}

function growthPanel(x, y, w = 262, h = 186) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="30" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
      <path d="M${x + 38} ${y + 132} L${x + 82} ${y + 96} L${x + 126} ${y + 112} L${x + 174} ${y + 64} L${x + 224} ${y + 78}" fill="none" stroke="url(#brand)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="${x + 224}" cy="${y + 78}" r="16" fill="${colors.green}" />
      <rect x="${x + 40}" y="${y + 42}" width="54" height="14" rx="7" fill="${colors.blue}" opacity="0.56" />
      <rect x="${x + 112}" y="${y + 42}" width="92" height="14" rx="7" fill="#cbd5e1" />
    </g>`;
}

function stageCluster(x, y, scale = 1, tone = "blue") {
  const accent = tone === "green" ? colors.green : colors.blue;
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <rect x="0" y="0" width="254" height="292" rx="34" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
      <circle cx="68" cy="70" r="34" fill="${accent}" opacity="0.16" />
      <path d="M54 72 L66 84 L88 54" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="36" y="126" width="182" height="32" rx="16" fill="#eff6ff" />
      <rect x="36" y="178" width="132" height="24" rx="12" fill="#dcfce7" />
      <rect x="36" y="226" width="168" height="24" rx="12" fill="#e2e8f0" />
    </g>`;
}

function rocketIcon(x, y, scale = 1) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M78 10 C122 24 146 70 132 124 L92 84 L52 124 C38 70 52 24 78 10Z" fill="url(#brand)" opacity="0.9" />
      <circle cx="86" cy="58" r="18" fill="#ffffff" opacity="0.92" />
      <path d="M58 128 C46 152 42 172 44 196 C66 186 82 172 94 148Z" fill="${colors.blue}" opacity="0.64" />
      <path d="M122 128 C150 144 166 160 176 182 C146 184 124 176 104 148Z" fill="${colors.green}" opacity="0.64" />
      <path d="M86 154 C70 184 72 210 86 238 C102 210 104 184 86 154Z" fill="#f59e0b" opacity="0.86" />
    </g>`;
}

function industryIcon(type, x, y, tone = "blue") {
  const accent = tone === "green" ? colors.green : colors.blue;
  const common = `<rect x="${x}" y="${y}" width="132" height="132" rx="32" fill="#ffffff" stroke="#dbeafe" />`;
  const icons = {
    wrench: `<path d="M${x + 38} ${y + 90} L${x + 86} ${y + 42}" stroke="${accent}" stroke-width="12" stroke-linecap="round" /><circle cx="${x + 92}" cy="${y + 36}" r="18" fill="none" stroke="${accent}" stroke-width="10" />`,
    travel: `<rect x="${x + 36}" y="${y + 54}" width="60" height="48" rx="12" fill="${accent}" opacity="0.78" /><path d="M${x + 52} ${y + 54} V${y + 42} H${x + 80} V${y + 54}" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round" />`,
    furniture: `<path d="M${x + 34} ${y + 78} H${x + 98} V${y + 104} H${x + 34} Z" fill="${accent}" opacity="0.78" /><path d="M${x + 42} ${y + 78} V${y + 48} H${x + 90} V${y + 78}" fill="none" stroke="${accent}" stroke-width="11" stroke-linejoin="round" />`,
    cleaning: `<path d="M${x + 60} ${y + 34} H${x + 86} L${x + 96} ${y + 100} H${x + 48} Z" fill="${accent}" opacity="0.72" /><circle cx="${x + 40}" cy="${y + 54}" r="8" fill="${colors.green}" /><circle cx="${x + 30}" cy="${y + 78}" r="6" fill="${colors.blue}" />`,
    b2b: `<rect x="${x + 34}" y="${y + 50}" width="64" height="54" rx="8" fill="${accent}" opacity="0.76" /><path d="M${x + 44} ${y + 50} V${y + 34} H${x + 88} V${y + 50}" fill="none" stroke="${accent}" stroke-width="9" stroke-linejoin="round" /><path d="M${x + 48} ${y + 66} H${x + 84} M${x + 48} ${y + 82} H${x + 84}" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />`,
    study: `<path d="M${x + 24} ${y + 58} L${x + 66} ${y + 36} L${x + 108} ${y + 58} L${x + 66} ${y + 80} Z" fill="${accent}" opacity="0.78" /><path d="M${x + 44} ${y + 76} V${y + 98} C${x + 58} ${y + 108} ${x + 76} ${y + 108} ${x + 90} ${y + 98} V${y + 76}" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round" />`,
  };
  return `<g>${common}${icons[type] ?? icons.b2b}</g>`;
}

function renderServiceOverviewSvg(item) {
  const width = SERVICE_OVERVIEW_WIDTH;
  const height = SERVICE_OVERVIEW_HEIGHT;
  const header = `
    <rect x="52" y="52" width="1096" height="796" rx="46" fill="#ffffff" opacity="0.9" filter="url(#shadow)" />
    <rect x="52" y="52" width="1096" height="796" rx="46" fill="none" stroke="#dbeafe" />
    <circle cx="1100" cy="96" r="118" fill="${colors.softBlue}" opacity="0.82" />
    <circle cx="100" cy="804" r="128" fill="${colors.softGreen}" opacity="0.68" />
  `;

  let body = "";

  if (item.variant === "product-stack") {
    body = `
      <g transform="translate(100 142)">
        ${logoDisc("telegram", 0, 34, 88)}
        ${logoDisc("max", 110, 0, 88)}
        ${browserPanel(0, 158, 238, 164, "green")}
        ${phonePanel(276, 92, 132, 226)}
      </g>
      ${arrowLine(470, 392, 560, 392, "green")}
      ${aiOrb(642, 392, 94)}
      ${arrowLine(736, 392, 820, 392)}
      ${crmBoard(836, 270, 260, 236)}
      ${growthPanel(820, 554, 276, 184)}
      <path d="M924 506 C902 536 888 552 872 568" fill="none" stroke="${colors.green}" stroke-width="7" stroke-linecap="round" opacity="0.55" />
      <path d="M174 724 C302 660 408 766 540 704 C642 656 696 676 800 724" fill="none" stroke="url(#brand)" stroke-width="12" stroke-linecap="round" opacity="0.28" />
    `;
  }

  if (item.variant === "launch-bundles") {
    body = `
      <g transform="translate(92 230)">
        ${stageCluster(0, 74, 0.86, "blue")}
        <circle cx="114" cy="44" r="36" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
        <path d="M96 44 H132 M114 26 V62" stroke="${colors.blue}" stroke-width="12" stroke-linecap="round" opacity="0.72" />
      </g>
      ${arrowLine(342, 456, 430, 456, "green")}
      <g transform="translate(430 168)">
        ${stageCluster(0, 104, 1.03, "green")}
        ${rocketIcon(62, 0, 0.78)}
      </g>
      ${arrowLine(704, 456, 804, 456)}
      <g transform="translate(804 128)">
        <rect x="0" y="118" width="286" height="384" rx="38" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)" />
        ${logoDisc("yandexDirect", 26, 28, 74)}
        ${logoDisc("vk", 112, 0, 74)}
        ${logoDisc("telegram", 198, 28, 74)}
        ${crmBoard(30, 158, 226, 194)}
        ${growthPanel(30, 378, 226, 104)}
      </g>
    `;
  }

  if (item.variant === "industry-map") {
    body = `
      <g>
        <rect x="98" y="146" width="604" height="604" rx="48" fill="#f8fafc" stroke="#dbeafe" />
        ${Array.from({ length: 7 }, (_, index) => `<path d="M${140 + index * 78} 166 L${220 + index * 78} 730" stroke="#dbeafe" stroke-width="4" opacity="0.72" />`).join("")}
        ${Array.from({ length: 6 }, (_, index) => `<path d="M122 ${220 + index * 86} L676 ${178 + index * 86}" stroke="#dbeafe" stroke-width="4" opacity="0.72" />`).join("")}
        ${industryIcon("wrench", 156, 204, "blue")}
        ${industryIcon("travel", 370, 168, "green")}
        ${industryIcon("furniture", 512, 336, "blue")}
        ${industryIcon("cleaning", 188, 474, "green")}
        ${industryIcon("b2b", 386, 548, "blue")}
        ${industryIcon("study", 536, 600, "green")}
        <path d="M458 448 C520 392 576 392 636 434" fill="none" stroke="url(#brand)" stroke-width="12" stroke-linecap="round" opacity="0.38" />
        <circle cx="458" cy="448" r="16" fill="${colors.blue}" />
        <circle cx="636" cy="434" r="16" fill="${colors.green}" />
      </g>
      ${arrowLine(704, 448, 786, 448, "green")}
      <g transform="translate(786 196)">
        ${browserPanel(0, 0, 286, 196, "blue")}
        ${crmBoard(0, 236, 286, 236)}
        ${growthPanel(0, 514, 286, 144)}
      </g>
    `;
  }

  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${background(width, height)}
    ${header}
    ${body}
  </svg>
  </body></html>`;
}

function carVisual(x, y, scale = 1, color = colors.blue) {
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M54 118 C78 70 120 50 178 56 L244 82 C286 80 330 94 360 126 L384 168 H34 Z" fill="none" stroke="${color}" stroke-width="14" stroke-linejoin="round" />
      <circle cx="122" cy="168" r="34" fill="none" stroke="${colors.green}" stroke-width="13" />
      <circle cx="300" cy="168" r="34" fill="none" stroke="${colors.green}" stroke-width="13" />
      <path d="M172 60 L192 116 M236 80 L224 124" stroke="${color}" stroke-width="10" stroke-linecap="round" opacity="0.7" />
    </g>`;
}

function crossMark(x, y, size = 74) {
  return `
    <g>
      <circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size / 2}" fill="#fee2e2" stroke="#fecaca" />
      <path d="M${x + 24} ${y + 24} L${x + size - 24} ${y + size - 24} M${x + size - 24} ${y + 24} L${x + 24} ${y + size - 24}" stroke="#ef4444" stroke-width="9" stroke-linecap="round" />
    </g>`;
}

function renderSquareSvg(item) {
  const width = 1024;
  const height = 1024;
  const file = path.basename(item.out);
  let scene = "";

  if (file.includes("barter-loop")) {
    scene = `
      ${carVisual(116, 174, 1.28)}
      ${arrowLine(484, 406, 604, 406, "green")}
      ${browserPanel(624, 236, 270, 184, "green")}
      ${crmBoard(626, 482, 268, 218)}
      <path d="M274 728 C394 676 478 742 590 704 C694 668 760 692 878 650" fill="none" stroke="url(#brand)" stroke-width="12" stroke-linecap="round" opacity="0.3" />
    `;
  } else if (file.includes("offer-stack")) {
    scene = `
      ${browserPanel(116, 166, 320, 216, "blue")}
      ${phonePanel(484, 206, 142, 232)}
      ${logoDisc("vk", 674, 142, 84)}
      ${logoDisc("yandexDirect", 778, 182, 84)}
      ${arrowLine(612, 438, 704, 512, "green")}
      ${crmBoard(636, 548, 278, 224)}
    `;
  } else if (file.includes("lead-path")) {
    scene = `
      ${logoDisc("yandexDirect", 126, 142, 86)}
      ${logoDisc("vk", 238, 112, 86)}
      ${browserPanel(124, 304, 294, 198, "blue")}
      ${arrowLine(430, 400, 532, 400, "green")}
      ${phonePanel(558, 274, 146, 240)}
      ${arrowLine(724, 400, 814, 400)}
      ${crmBoard(644, 582, 286, 218)}
    `;
  } else if (file.includes("service-grid")) {
    scene = `
      ${carVisual(272, 94, 1.06)}
      ${industryIcon("wrench", 132, 468, "blue")}
      ${industryIcon("cleaning", 328, 506, "green")}
      ${industryIcon("b2b", 524, 468, "blue")}
      ${industryIcon("furniture", 720, 506, "green")}
      <path d="M204 424 C338 374 496 438 634 390 C720 362 778 374 860 342" fill="none" stroke="url(#brand)" stroke-width="11" stroke-linecap="round" opacity="0.3" />
    `;
  } else {
    scene = `
      ${carVisual(122, 128, 1.04)}
      <g transform="translate(130 520)">
        <circle cx="78" cy="78" r="78" fill="#dcfce7" stroke="#bbf7d0" />
        <path d="M42 82 L70 110 L118 50" fill="none" stroke="${colors.green}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <g transform="translate(378 520)">
        <circle cx="78" cy="78" r="78" fill="#dcfce7" stroke="#bbf7d0" />
        <path d="M42 82 L70 110 L118 50" fill="none" stroke="${colors.green}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      ${crossMark(648, 520, 156)}
      ${crmBoard(640, 190, 282, 228)}
    `;
  }

  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${background(width, height)}
    <rect x="52" y="52" width="920" height="920" rx="54" fill="#ffffff" opacity="0.88" filter="url(#shadow)" />
    <rect x="52" y="52" width="920" height="920" rx="54" fill="none" stroke="#dbeafe" />
    ${scene}
    <path d="M118 884 C260 834 452 912 892 820" fill="none" stroke="url(#brand)" stroke-width="12" stroke-linecap="round" opacity="0.28" />
    <circle cx="118" cy="884" r="16" fill="${colors.blue}" />
    <circle cx="892" cy="820" r="16" fill="${colors.green}" />
  </svg>
  </body></html>`;
}

function renderBarterHeroSvg() {
  const width = 1536;
  const height = 1024;
  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="darkbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#06111f" />
        <stop offset="58%" stop-color="#0b2034" />
        <stop offset="100%" stop-color="#0f3b46" />
      </linearGradient>
      <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors.blue}" />
        <stop offset="100%" stop-color="${colors.green}" />
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="9" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#darkbg)" />
    <g opacity="0.18">
      ${Array.from({ length: 18 }, (_, i) => `<path d="M ${i * 96} 0 L ${i * 96 - 360} ${height}" stroke="#8bd9ff" stroke-width="1" />`).join("")}
      ${Array.from({ length: 12 }, (_, i) => `<path d="M 0 ${i * 96} L ${width} ${i * 96}" stroke="#8bd9ff" stroke-width="1" />`).join("")}
    </g>
    <path d="M188 620 C286 486 440 430 646 454 L790 504 C912 482 1068 512 1186 610 L1252 724 L292 724 Z" fill="none" stroke="#58d5ff" stroke-width="14" stroke-linejoin="round" opacity="0.78" filter="url(#glow)" />
    <circle cx="448" cy="724" r="86" fill="none" stroke="#44B78B" stroke-width="14" opacity="0.86" />
    <circle cx="448" cy="724" r="34" fill="#44B78B" opacity="0.8" />
    <circle cx="1018" cy="724" r="86" fill="none" stroke="#44B78B" stroke-width="14" opacity="0.86" />
    <circle cx="1018" cy="724" r="34" fill="#44B78B" opacity="0.8" />
    <g transform="translate(182 126)">
      <rect x="0" y="0" width="300" height="190" rx="34" fill="#ffffff" opacity="0.12" stroke="#6ee7b7" />
      <path d="M54 82 H236 M54 124 H188" stroke="#b6d5e6" stroke-width="18" stroke-linecap="round" />
      <path d="M76 48 H184" stroke="#58d5ff" stroke-width="18" stroke-linecap="round" />
      <circle cx="228" cy="132" r="24" fill="#44B78B" opacity="0.82" />
    </g>
    <g transform="translate(626 84)">
      <rect x="0" y="0" width="292" height="230" rx="36" fill="#ffffff" opacity="0.13" stroke="#38bdf8" />
      <rect x="42" y="44" width="208" height="48" rx="18" fill="#58d5ff" opacity="0.5" />
      <rect x="42" y="116" width="156" height="34" rx="17" fill="#6ee7b7" opacity="0.55" />
      <rect x="42" y="172" width="190" height="24" rx="12" fill="#b6d5e6" opacity="0.48" />
    </g>
    <g transform="translate(1056 130)">
      <rect x="0" y="0" width="286" height="188" rx="34" fill="#ffffff" opacity="0.12" stroke="#6ee7b7" />
      <path d="M52 132 L98 92 L146 118 L202 58 L236 76" fill="none" stroke="#58d5ff" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="236" cy="76" r="20" fill="#44B78B" opacity="0.92" />
    </g>
    <path d="M482 214 C538 174 570 172 626 178" fill="none" stroke="url(#brand)" stroke-width="10" stroke-linecap="round" />
    <path d="M918 178 C982 170 1024 186 1056 214" fill="none" stroke="url(#brand)" stroke-width="10" stroke-linecap="round" />
  </svg>
  </body></html>`;
}

function detectBrands(text) {
  const source = text.toLowerCase();
  const found = [];
  if (source.includes("telegram")) found.push({ label: "Telegram", logo: "telegram", width: 150 });
  if (source.includes("вконтакте") || /\bvk\b/.test(source) || source.includes("вк ")) found.push({ label: "VK", logo: "vk", width: 128 });
  if (source.includes("max")) found.push({ label: "MAX", logo: "max", width: 128 });
  if (source.includes("авито") || source.includes("avito")) found.push({ label: "Авито", logo: "avito", width: 140 });
  if (source.includes("яндекс") || source.includes("direct")) found.push({ label: "Директ", logo: "yandexDirect", width: 140 });
  return found;
}

function classifyTopic(post) {
  const source = `${post.title} ${post.description} ${(post.tags || []).join(" ")}`.toLowerCase();
  if (source.includes("152") || source.includes("ркн") || source.includes("роскомнадзор") || source.includes("персональн")) {
    return {
      geo: "РФ",
      kicker: "152-ФЗ и проверка сайта",
      primary: "152-ФЗ",
      diagram: "сайт → проверка",
      metric: "чек-лист",
      steps: [
        ["Форма", "согласие, политика, цель"],
        ["Cookie", "баннер, Метрика, документы"],
      ],
    };
  }
  if (source.includes("экспресс-аудит") || source.includes("нет заявок") || source.includes("не приносит заявки")) {
    return {
      geo: "Тюмень / РФ",
      kicker: "аудит сайта за 48 часов",
      primary: "аудит",
      diagram: "экран → ошибка",
      metric: "разбор",
      steps: [
        ["Экран", "оффер, форма, скорость"],
        ["Метрика", "цели, заявки, источники"],
      ],
    };
  }
  if (source.includes("beget") || source.includes("vps") || source.includes("docker") || source.includes("nginx")) {
    return {
      geo: "РФ",
      kicker: "архитектура без кубов",
      primary: "VPS",
      diagram: "сервер → сервис",
      metric: "схема",
      steps: [
        ["Стек", "OpenClaw, n8n, PostgreSQL"],
        ["Контроль", "backup, SSL, логи"],
      ],
    };
  }
  if (source.includes("тюм")) {
    return {
      geo: "Тюмень",
      kicker: "локальный спрос и заявки",
      primary: "локальное SEO",
      diagram: "поиск → заявка",
      metric: "чек-лист",
      steps: [
        ["Запрос", "гео и намерение"],
        ["Страница", "оффер, форма, метрика"],
      ],
    };
  }
  if (source.includes("яндекс") || source.includes("директ")) {
    return {
      geo: "Тюмень / РФ",
      kicker: "реклама без слива бюджета",
      primary: "Яндекс",
      diagram: "клик → лид",
      metric: "аудит",
      steps: [
        ["Кампания", "семантика, минусы, ставки"],
        ["Посадочная", "цели, форма, CRM"],
      ],
    };
  }
  if (source.includes("vk") || source.includes("вконтакте") || source.includes("вк ")) {
    return {
      geo: "Тюмень / РФ",
      kicker: "соцсети как канал заявок",
      primary: "VK",
      diagram: "сообщество → диалог",
      metric: "чек-лист",
      steps: [
        ["Оформление", "обложка, меню, закреп"],
        ["Диалог", "бот, лид-форма, CRM"],
      ],
    };
  }
  if (source.includes("openclaw") || source.includes("n8n") || source.includes("автоматиза")) {
    return {
      geo: "Тюмень / РФ",
      kicker: "автоматизация без хаоса",
      primary: "AI stack",
      diagram: "событие → действие",
      metric: "схема",
      steps: [
        ["Триггер", "заявка, пост, задача"],
        ["Workflow", "n8n, AI, контроль"],
      ],
    };
  }
  return {
    geo: "Тюмень / РФ",
    kicker: "практика для малого бизнеса",
    primary: "маркетинг",
    diagram: "задача → рост",
    metric: "разбор",
    steps: [
      ["Контекст", "ниша, оффер, спрос"],
      ["Система", "сайт, CRM, аналитика"],
    ],
  };
}

const serviceVisuals = [
  {
    slug: "ab-testing",
    kicker: "конверсия и гипотезы",
    title: "A/B-тесты креативов и посадочных страниц",
    subtitle: "Показываем не абстрактный экран, а понятную связку: гипотеза, два варианта, цель Метрики и решение по данным.",
    brands: [{ label: "A/B", width: 116 }, { label: "Метрика", logo: "yandexDirect", width: 142 }],
    diagramTitle: "гипотеза → решение",
    flow: [["Вариант A/B", "оффер, форма, CTA"], ["События", "клики, заявки, звонки"], ["Срез", "конверсия и CPL"], ["Вывод", "что оставляем"]],
    metricValue: "A/B",
    metricLabel: "тест",
    result: "рост",
    geo: "Тюмень",
    visualPrompt: "Четкая редакционная схема A/B-теста для локального бизнеса: два варианта посадочной, события Метрики, заявка и вывод по конверсии.",
  },
  {
    slug: "ai-agents",
    kicker: "AI-агент под процесс",
    title: "AI-агенты для заявок, ответов и действий",
    subtitle: "Смысл картинки: агент не просто светится, а принимает входящий запрос, уточняет контекст и передает действие в CRM.",
    brands: [{ label: "AI", width: 104 }, { label: "CRM", width: 118 }, { label: "n8n", width: 110 }],
    diagramTitle: "заявка → действие",
    flow: [["Запрос", "сайт или мессенджер"], ["Контекст", "классификация"], ["Действие", "ответ или задача"], ["Контроль", "человек подтверждает"]],
    metricValue: "24/7",
    result: "ответ",
    geo: "Тюмень",
    visualPrompt: "AI-агент как рабочий маршрут заявки: канал, карточка CRM, база знаний и контролируемое действие без фантазийного персонажа.",
  },
  {
    slug: "ai-systems",
    kicker: "AI-система для бизнеса",
    title: "AI-системы: база знаний, контент и внутренние ассистенты",
    subtitle: "Визуал собирает систему из базы знаний, CRM, контента и управленческого контроля вместо абстрактного мозга.",
    brands: [{ label: "AI", width: 104 }, { label: "База знаний", width: 172 }, { label: "CRM", width: 118 }],
    diagramTitle: "знания → результат",
    flow: [["Данные", "FAQ, документы, звонки"], ["AI-модуль", "выжимки и подсказки"], ["Материалы", "ответы, посты, КП"], ["Проверка", "роль человека"]],
    metricValue: "AI",
    result: "система",
    geo: "Тюмень",
    visualPrompt: "Структурная схема AI-системы для бизнеса: база знаний, CRM, контент-завод, отчеты и человек на точке решения.",
  },
  {
    slug: "auto-responses",
    kicker: "ответы без потери лида",
    title: "Автоответы 24/7 и автоматическая запись",
    subtitle: "Вместо милой иконки — путь обращения: вопрос клиента, быстрый ответ, запись, уведомление и контроль статуса.",
    brands: [{ label: "Telegram", logo: "telegram", width: 150 }, { label: "VK", logo: "vk", width: 128 }],
    diagramTitle: "диалог → запись",
    flow: [["Сообщение", "вопрос клиента"], ["Ответ", "FAQ и уточнения"], ["Запись", "дата и услуга"], ["CRM", "статус и задача"]],
    metricValue: "24/7",
    result: "запись",
    geo: "Тюмень",
    visualPrompt: "Автоответы как понятная сервисная схема: мессенджер, FAQ, запись на услугу, CRM-статус и уведомление менеджеру.",
  },
  {
    slug: "avito-ads",
    kicker: "Авито как канал заявок",
    title: "Реклама на Авито для услуг и локального бизнеса",
    subtitle: "Показываем профиль, объявления, ответы, продвижение и связку с сайтом/CRM для локального спроса.",
    brands: [{ label: "Авито", logo: "avito", width: 148 }, { label: "CRM", width: 118 }],
    diagramTitle: "объявление → лид",
    flow: [["Профиль", "доверие и услуги"], ["Объявления", "оффер и гео"], ["Ответы", "скорость реакции"], ["CRM", "источник и статус"]],
    metricValue: "CPL",
    result: "лиды",
    geo: "Тюмень",
    visualPrompt: "Локальная схема Avito Ads: профиль, объявления, продвижение, сообщения и CRM без выдуманных маркетплейс-иконок.",
  },
  {
    slug: "branding",
    kicker: "бренд как система",
    title: "Фирменный стиль и брендинг для бизнеса",
    subtitle: "Визуал показывает не случайный знак, а набор: позиционирование, палитра, типографика, носители и правила.",
    brands: [{ label: "бренд", width: 124 }, { label: "гайд", width: 112 }],
    diagramTitle: "смысл → стиль",
    flow: [["Позиция", "рынок и отличие"], ["Оффер", "что обещаем"], ["Визуал", "цвет, шрифт, знак"], ["Носители", "сайт, VK, печать"]],
    metricValue: "гайд",
    result: "узнаваемость",
    geo: "Тюмень",
    visualPrompt: "Редакционная схема брендинга: позиционирование, оффер, дизайн-система и носители для локального бизнеса.",
  },
  {
    slug: "browser-extensions",
    kicker: "инструменты команды",
    title: "Расширения для Chrome и Яндекс Браузера",
    subtitle: "Схема показывает рабочий инструмент: вкладка, действие сотрудника, сбор данных, контроль и выгрузку в CRM.",
    brands: [{ label: "Chrome", width: 132 }, { label: "Яндекс Браузер", width: 192 }],
    diagramTitle: "браузер → CRM",
    flow: [["Вкладка", "рабочий сайт"], ["Кнопка", "действие в 1 клик"], ["Данные", "сбор без ручного ввода"], ["CRM", "задача или запись"]],
    metricValue: "1 клик",
    result: "рутина ↓",
    geo: "Тюмень",
    visualPrompt: "Рабочая схема browser extension: браузерная панель, кнопка действия, сбор данных и передача в CRM.",
  },
  {
    slug: "chatbot-vk",
    kicker: "VK-бот для заявок",
    title: "Чат-бот ВКонтакте и AI-ассистент",
    subtitle: "Здесь нужен реальный VK-контекст: сообщество, диалог, квалификация и передача лида менеджеру.",
    brands: [{ label: "VK", logo: "vk", width: 128 }, { label: "CRM", width: 118 }],
    diagramTitle: "VK → заявка",
    flow: [["Сообщество", "клиент пишет"], ["Бот", "сценарий и FAQ"], ["Лид", "телефон и задача"], ["CRM", "статус и ответственный"]],
    metricValue: "24/7",
    result: "диалоги",
    geo: "Тюмень",
    visualPrompt: "VK-бот для бизнеса: реальный логотип VK, сообщество, диалог, квалификация лида и CRM-маршрут.",
  },
  {
    slug: "compliance-2026",
    kicker: "152-ФЗ, РКН, cookie",
    title: "Проверка сайта по 152-ФЗ и РКН",
    subtitle: "Картинка должна говорить о формах, согласиях, cookie, Метрике и маршруте заявки, а не о юридической абстракции.",
    brands: [{ label: "152-ФЗ", width: 124 }, { label: "РКН", width: 112 }, { label: "Метрика", logo: "yandexDirect", width: 142 }],
    diagramTitle: "форма → согласие",
    flow: [["Форма", "какие данные"], ["Согласие", "текст и чекбокс"], ["Cookie", "баннер и Метрика"], ["След", "дата, версия, источник"]],
    metricValue: "152-ФЗ",
    result: "порядок",
    geo: "Тюмень",
    visualPrompt: "Юридически аккуратная схема проверки сайта: форма, согласие, cookie, Яндекс.Метрика и доказуемый маршрут заявки.",
  },
  {
    slug: "content-plan",
    kicker: "контент без хаоса",
    title: "Контент-план и SMM-стратегия",
    subtitle: "Нужны каналы и календарь: VK, Telegram, Reels, темы из продаж, публикации и аналитика.",
    brands: [{ label: "VK", logo: "vk", width: 128 }, { label: "Telegram", logo: "telegram", width: 150 }, { label: "Reels", width: 118 }],
    diagramTitle: "вопросы → контент",
    flow: [["Вопросы", "из продаж и поиска"], ["Рубрики", "темы и форматы"], ["Календарь", "публикации"], ["Аналитика", "что заходит"]],
    metricValue: "30 дней",
    result: "план",
    geo: "Тюмень",
    visualPrompt: "Контент-план как календарь каналов: VK, Telegram, Reels, темы из вопросов клиентов и аналитика публикаций.",
  },
  {
    slug: "copywriting-texts",
    kicker: "SEO-тексты под заявку",
    title: "Продающие SEO-тексты и копирайтинг",
    subtitle: "Смысл: поисковый запрос, структура страницы, оффер, блоки доверия и форма заявки.",
    brands: [{ label: "SEO", width: 104 }, { label: "оффер", width: 124 }],
    diagramTitle: "запрос → текст",
    flow: [["Семантика", "что ищут"], ["Структура", "H1, блоки, FAQ"], ["Оффер", "выгода и цена"], ["Конверсия", "форма и CTA"]],
    metricValue: "SEO",
    result: "заявки",
    geo: "Тюмень",
    visualPrompt: "SEO-копирайтинг как структура продающей страницы: запрос, оффер, блоки доверия, FAQ и форма заявки.",
  },
  {
    slug: "custom-crm",
    kicker: "CRM под модель бизнеса",
    title: "Персональная CRM-система для бизнеса",
    subtitle: "Визуал показывает не “дашборд вообще”, а карточку клиента, этапы, задачи, роли и источники заявок.",
    brands: [{ label: "CRM", width: 118 }, { label: "SLA", width: 104 }],
    diagramTitle: "лид → сделка",
    flow: [["Источник", "сайт, VK, звонок"], ["Карточка", "клиент и история"], ["Этап", "задачи и сроки"], ["Отчет", "причины и деньги"]],
    metricValue: "CRM",
    result: "контроль",
    geo: "Тюмень",
    visualPrompt: "Персональная CRM как маршрут лида: источник, карточка клиента, этапы сделки, задачи менеджера и отчет руководителя.",
  },
  {
    slug: "design-prototyping",
    kicker: "UX под конверсию",
    title: "UI/UX-дизайн и прототипирование",
    subtitle: "Картинка фиксирует путь пользователя: экран, действие, форма, проверка гипотезы и дизайн-система.",
    brands: [{ label: "UX", width: 104 }, { label: "прототип", width: 140 }],
    diagramTitle: "экран → действие",
    flow: [["Сценарий", "что делает клиент"], ["Прототип", "экраны и логика"], ["Тест", "гипотезы и возражения"], ["UI", "готовая система"]],
    metricValue: "UX",
    result: "конверсия",
    geo: "Тюмень",
    visualPrompt: "UI/UX-прототипирование как цепочка пользовательского сценария: экран, действие, форма, тест и итоговая дизайн-система.",
  },
  {
    slug: "help-bot",
    kicker: "поддержка без очереди",
    title: "Help-бот для поддержки клиентов",
    subtitle: "Визуал: вопрос клиента, база знаний, быстрый ответ, эскалация человеку и статистика повторов.",
    brands: [{ label: "FAQ", width: 108 }, { label: "бот", width: 104 }, { label: "CRM", width: 118 }],
    diagramTitle: "вопрос → ответ",
    flow: [["Запрос", "типовая проблема"], ["База", "FAQ и регламенты"], ["Ответ", "ссылка или инструкция"], ["Эскалация", "если нужен человек"]],
    metricValue: "70%",
    result: "нагрузка ↓",
    geo: "Тюмень",
    visualPrompt: "Help-бот как сервисная схема: обращение, база знаний, автоматический ответ, эскалация и метрики поддержки.",
  },
  {
    slug: "marketing-strategy",
    kicker: "маркетинг как система",
    title: "План маркетинга в Тюмени",
    subtitle: "Показываем карту каналов, бюджет, приоритеты, оффер и первые действия вместо декоративных шахмат.",
    brands: [{ label: "Тюмень", width: 132 }, { label: "медиаплан", width: 156 }],
    diagramTitle: "ниша → план",
    flow: [["Диагностика", "рынок и спрос"], ["Оффер", "что продаем"], ["Каналы", "SEO, VK, Директ"], ["План", "бюджет и шаги"]],
    metricValue: "35k",
    result: "план",
    geo: "Тюмень",
    visualPrompt: "Маркетинговая стратегия для Тюмени: карта спроса, каналы, бюджет, оффер и последовательность запуска.",
  },
  {
    slug: "max-messenger",
    kicker: "MAX как ранний рынок",
    title: "Решения для Max: продажи, сервис и CRM",
    subtitle: "Платформа должна быть показана через реальный MAX-ассет, ранний канал, диалог, CRM и сервисные сценарии.",
    brands: [{ label: "MAX", logo: "max", width: 128 }, { label: "CRM", width: 118 }],
    diagramTitle: "MAX → сервис",
    flow: [["Канал", "ранний вход"], ["Диалог", "заявка или сервис"], ["Сценарий", "FAQ, запись, статус"], ["CRM", "контроль и задачи"]],
    metricValue: "early",
    result: "канал",
    geo: "РФ",
    visualPrompt: "MAX как новый канал: реальный локальный логотип MAX, диалог клиента, сервисный сценарий и CRM-маршрут.",
  },
  {
    slug: "mvp-development",
    kicker: "MVP без лишнего масштаба",
    title: "Разработка MVP для проверки рынка",
    subtitle: "Визуал показывает гипотезу, быстрый интерфейс, первые заявки, обратную связь и решение о развитии.",
    brands: [{ label: "MVP", width: 112 }, { label: "Mini App", width: 132 }, { label: "CRM", width: 118 }],
    diagramTitle: "идея → проверка",
    flow: [["Гипотеза", "что проверяем"], ["Интерфейс", "минимальный продукт"], ["Заявки", "первые пользователи"], ["Решение", "докрутить или менять"]],
    metricValue: "MVP",
    result: "проверка",
    geo: "Тюмень",
    visualPrompt: "MVP как рабочая проверка рынка: гипотеза, интерфейс, заявки, обратная связь и решение по развитию продукта.",
  },
  {
    slug: "n8n-automation",
    kicker: "workflow между системами",
    title: "n8n-автоматизация заявок, CRM и AI-сценариев",
    subtitle: "Показываем связку событий: заявка, n8n-маршрут, Telegram-уведомление, CRM-задача и AI-проверка.",
    brands: [{ label: "n8n", width: 110 }, { label: "Telegram", logo: "telegram", width: 150 }, { label: "CRM", width: 118 }],
    diagramTitle: "триггер → маршрут",
    flow: [["Триггер", "форма или чат"], ["Workflow", "условия и роли"], ["Уведомление", "Telegram/почта"], ["CRM", "статус и задача"]],
    metricValue: "n8n",
    result: "авто",
    geo: "Тюмень",
    visualPrompt: "n8n-автоматизация как схема workflow: триггер, условия, уведомления, AI-сценарий и CRM-задача.",
  },
  {
    slug: "naming-offers",
    kicker: "название и оффер",
    title: "Нейминг и продающие офферы",
    subtitle: "Смысловая схема: аудит ниши, варианты названия, проверка восприятия, УТП и итоговый пакет формулировок.",
    brands: [{ label: "нейминг", width: 140 }, { label: "УТП", width: 106 }],
    diagramTitle: "ниша → смысл",
    flow: [["Аудит", "рынок и конкуренты"], ["Варианты", "названия и идеи"], ["Проверка", "ассоциации и риски"], ["Оффер", "что обещаем"]],
    metricValue: "УТП",
    result: "смысл",
    geo: "Тюмень",
    visualPrompt: "Нейминг и оффер как процесс: конкурентная среда, варианты названия, проверка ассоциаций и итоговая формула УТП.",
  },
  {
    slug: "offer-packaging",
    kicker: "упаковка предложения",
    title: "Упаковка оффера и УТП",
    subtitle: "Не документ с пером, а разбор: аудит клиента, ценность, доказательства, пакет и CTA для заявки.",
    brands: [{ label: "оффер", width: 124 }, { label: "CTA", width: 104 }],
    diagramTitle: "ценность → заявка",
    flow: [["Боль", "что мешает купить"], ["Ценность", "что получает клиент"], ["Доказательства", "кейсы и цифры"], ["CTA", "следующий шаг"]],
    metricValue: "УТП",
    result: "заявки",
    geo: "Тюмень",
    visualPrompt: "Упаковка оффера как схема конверсии: боль клиента, ценность, доказательства, пакет и понятный следующий шаг.",
  },
  {
    slug: "openclaw-ai",
    kicker: "self-hosted AI-контур",
    title: "OpenClaw для бизнеса: AI в Telegram и CRM",
    subtitle: "Показываем серверный контур, Telegram-диалог, n8n-маршрут, CRM и контроль доступа.",
    brands: [{ label: "OpenClaw", width: 150 }, { label: "Telegram", logo: "telegram", width: 150 }, { label: "n8n", width: 110 }],
    diagramTitle: "AI → инфраструктура",
    flow: [["Telegram", "диалог и команда"], ["OpenClaw", "AI-действие"], ["n8n", "маршрут и роли"], ["CRM", "лог и контроль"]],
    metricValue: "self-host",
    result: "контур",
    geo: "РФ",
    visualPrompt: "OpenClaw как self-hosted AI-контур: Telegram-диалог, сервер, n8n workflow, CRM-лог и контроль доступа.",
  },
  {
    slug: "operator-scripts",
    kicker: "скрипт помогает продавать",
    title: "Скрипты продаж и FAQ для операторов",
    subtitle: "Картинка показывает разговор: входящий вопрос, ветка уточнений, возражение, ответ и фиксация результата.",
    brands: [{ label: "FAQ", width: 108 }, { label: "оператор", width: 136 }],
    diagramTitle: "вопрос → сделка",
    flow: [["Входящий", "звонок или чат"], ["Уточнение", "сценарий вопросов"], ["Возражение", "готовый ответ"], ["Итог", "заявка или задача"]],
    metricValue: "FAQ",
    result: "конверсия",
    geo: "Тюмень",
    visualPrompt: "Скрипт оператора как ветвящийся диалог: вопрос клиента, уточнение, возражение, ответ и фиксация результата.",
  },
  {
    slug: "telegram-lead-agent",
    kicker: "Telegram + AI + CRM",
    title: "Telegram AI-агент для заявок",
    subtitle: "Нужен настоящий Telegram-контекст: логотип, диалог, квалификация лида, n8n и CRM.",
    brands: [{ label: "Telegram", logo: "telegram", width: 150 }, { label: "AI", width: 104 }, { label: "CRM", width: 118 }],
    diagramTitle: "Telegram → лид",
    flow: [["Сообщение", "первый вопрос"], ["AI", "квалификация"], ["n8n", "маршрут"], ["CRM", "лид и задача"]],
    metricValue: "24/7",
    result: "лиды",
    geo: "Тюмень",
    visualPrompt: "Telegram AI-агент для заявок: официальный знак Telegram, чат, квалификация, n8n-маршрут и CRM-карточка.",
  },
  {
    slug: "telegram-mini-app",
    kicker: "Mini App как интерфейс продаж",
    title: "Telegram Mini App для бизнеса",
    subtitle: "Показываем интерфейс внутри Telegram: каталог/запись/кабинет, оплата или заявка и CRM.",
    brands: [{ label: "Telegram", logo: "telegram", width: 150 }, { label: "Mini App", width: 132 }, { label: "CRM", width: 118 }],
    diagramTitle: "Mini App → продажа",
    flow: [["Вход", "внутри Telegram"], ["Экран", "каталог или запись"], ["Заявка", "данные клиента"], ["CRM", "статус и оплата"]],
    metricValue: "Mini App",
    result: "продажи",
    geo: "Тюмень",
    visualPrompt: "Telegram Mini App как рабочий интерфейс продаж: официальный Telegram, экран каталога/записи, заявка и CRM.",
  },
  {
    slug: "telegram-service-agent",
    kicker: "Telegram-сервис 24/7",
    title: "Telegram AI-консультант для записи и сервиса",
    subtitle: "Схема: FAQ, запись, напоминания, статусы и передача живому менеджеру.",
    brands: [{ label: "Telegram", logo: "telegram", width: 150 }, { label: "FAQ", width: 108 }, { label: "CRM", width: 118 }],
    diagramTitle: "сервис → статус",
    flow: [["Вопрос", "FAQ и условия"], ["Запись", "дата и услуга"], ["Напоминание", "статус клиенту"], ["Человек", "сложный случай"]],
    metricValue: "24/7",
    result: "сервис",
    geo: "Тюмень",
    visualPrompt: "Telegram AI-консультант: официальный знак Telegram, сервисный диалог, запись, напоминания и эскалация человеку.",
  },
  {
    slug: "vk-ads",
    kicker: "VK Ads с маршрутом заявки",
    title: "Реклама ВКонтакте: лиды, ретаргет и заявки",
    subtitle: "Используем реальный VK-логотип и показываем не красивый телефон, а цепочку: аудитория, креатив, лид-форма, CRM.",
    brands: [{ label: "VK", logo: "vk", width: 128 }, { label: "Ads", width: 104 }, { label: "CRM", width: 118 }],
    diagramTitle: "креатив → лид",
    flow: [["Аудитория", "гео и интерес"], ["Креатив", "оффер и формат"], ["Лид-форма", "контакт"], ["CRM", "статус и ретаргет"]],
    metricValue: "CPL",
    result: "лиды",
    geo: "Тюмень",
    visualPrompt: "VK Ads для заявок: реальный знак VK, аудитория, креатив, лид-форма, ретаргет и CRM.",
  },
  {
    slug: "vk-design",
    kicker: "VK-сообщество продает",
    title: "Оформление ВКонтакте для бизнеса",
    subtitle: "Визуал: обложка, меню, закреп, отзывы, сообщения и путь к заявке, с реальным VK-логотипом.",
    brands: [{ label: "VK", logo: "vk", width: 128 }, { label: "сообщество", width: 156 }],
    diagramTitle: "обложка → диалог",
    flow: [["Обложка", "оффер и доверие"], ["Меню", "услуги и цены"], ["Закреп", "первый сценарий"], ["Сообщения", "заявка в CRM"]],
    metricValue: "VK",
    result: "диалоги",
    geo: "Тюмень",
    visualPrompt: "Оформление VK-сообщества: реальный знак VK, обложка, меню, закреп, отзывы и путь в сообщения.",
  },
  {
    slug: "web-analytics",
    kicker: "Метрика и цели",
    title: "Настройка веб-аналитики: цели, события, отчеты",
    subtitle: "Картинка должна объяснять: сайт, цели Метрики, события, UTM, источники и отчет для руководителя.",
    brands: [{ label: "Метрика", logo: "yandexDirect", width: 142 }, { label: "UTM", width: 108 }, { label: "CRM", width: 118 }],
    diagramTitle: "событие → отчет",
    flow: [["Сайт", "форма, звонок, клик"], ["Цель", "Метрика и событие"], ["Источник", "UTM и канал"], ["Отчет", "что окупается"]],
    metricValue: "цели",
    result: "данные",
    geo: "Тюмень",
    visualPrompt: "Веб-аналитика как схема данных: сайт, цели Яндекс.Метрики, события, UTM-источники и отчет руководителя.",
  },
  {
    slug: "website-development",
    kicker: "сайт как основа заявок",
    title: "Создание сайта, MVP и интерфейса продаж",
    subtitle: "Показываем структуру посадочной: оффер, блоки доверия, форма, аналитика, CRM и SEO-гео.",
    brands: [{ label: "сайт", width: 104 }, { label: "SEO", width: 104 }, { label: "CRM", width: 118 }],
    diagramTitle: "страница → заявка",
    flow: [["Оффер", "что и для кого"], ["Доверие", "кейсы, цены, FAQ"], ["Форма", "заявка и согласие"], ["CRM", "источник и статус"]],
    metricValue: "SEO",
    result: "заявки",
    geo: "Тюмень",
    visualPrompt: "Разработка сайта для Тюмени: структура страницы, оффер, доверие, форма заявки, аналитика и CRM-маршрут.",
  },
  {
    slug: "yandex-direct",
    kicker: "Директ без слива бюджета",
    title: "Яндекс.Директ: заявки в сайт, Mini App и CRM",
    subtitle: "Используем реальный знак Яндекс.Директа и показываем путь: семантика, объявление, посадочная, цель и CRM.",
    brands: [{ label: "Директ", logo: "yandexDirect", width: 140 }, { label: "Метрика", logo: "yandexDirect", width: 142 }, { label: "CRM", width: 118 }],
    diagramTitle: "запрос → заявка",
    flow: [["Семантика", "ключи и минусы"], ["Объявление", "оффер и гео"], ["Посадочная", "форма и доказательства"], ["Метрика", "цель и CRM"]],
    metricValue: "CPL",
    result: "заявки",
    geo: "Тюмень",
    visualPrompt: "Яндекс.Директ для локального бизнеса: реальный знак Директа, семантика, объявление, посадочная, Метрика и CRM.",
  },
];

const homeVisuals = [
  {
    out: "public/images/home/digital-products.png",
    title: "Mini App + CRM",
    subtitle: "Клиентский интерфейс, заявки, запись и внутренняя CRM без лишних переходов.",
    brands: [{ label: "Telegram", logo: "telegram", width: 150 }, { label: "Mini App", width: 132 }, { label: "CRM", width: 118 }],
  },
  {
    out: "public/images/home/ai-systems.png",
    title: "AI-система бизнеса",
    subtitle: "База знаний, CRM, подсказки и контроль вместо абстрактного AI-рендера.",
    brands: [{ label: "AI", width: 104 }, { label: "база знаний", width: 160 }, { label: "контроль", width: 132 }],
  },
  {
    out: "public/images/home/team-tools.png",
    title: "Инструменты команды",
    subtitle: "Расширения, внутренние интерфейсы и быстрые действия прямо в рабочем процессе.",
    brands: [{ label: "Browser", width: 132 }, { label: "SLA", width: 104 }, { label: "CRM", width: 118 }],
  },
  {
    out: "public/images/home/new-channels.png",
    title: "Новые каналы",
    subtitle: "MAX, Telegram, VK и сайт собираются в управляемый маршрут заявки.",
    brands: [{ label: "MAX", logo: "max", width: 128 }, { label: "Telegram", logo: "telegram", width: 150 }, { label: "VK", logo: "vk", width: 128 }],
  },
];

const serviceOverviewVisuals = [
  {
    out: "public/images/services/services-product-stack.png",
    variant: "product-stack",
    kicker: "CentrLP · продуктовая связка",
    title: "Канал → AI → CRM → рост",
    subtitle: "Клиент проходит понятный путь от мессенджера или сайта до результата, статуса и следующего действия.",
  },
  {
    out: "public/images/services/services-launch-bundles.png",
    variant: "launch-bundles",
    kicker: "CentrLP · пакеты запуска",
    title: "Пилот → MVP → система",
    subtitle: "Три формата старта: короткий тест, рабочий MVP и масштабируемая система под заявки.",
  },
  {
    out: "public/images/services/services-industry-map.png",
    variant: "industry-map",
    kicker: "CentrLP · SEO-гео",
    title: "SEO-гео + маршрут",
    subtitle: "Для каждой ниши собирается свой путь от поискового запроса до заявки в CRM.",
  },
];

const topLevelVisuals = [
  {
    out: "public/og/cases.png",
    kicker: "кейсы и доказательства",
    title: "Кейсы CentrLP: реальные скрины, заявки и рост",
    subtitle: "Превью ведет не в абстрактный рендер, а к портфолио с локальными и отраслевыми доказательствами.",
    brands: [{ label: "кейсы", width: 118 }, { label: "Тюмень", width: 132 }],
    diagramTitle: "задача → результат",
    flow: [["Было", "сайт или канал"], ["Сделали", "упаковка и система"], ["Запустили", "реклама и CRM"], ["Итог", "заявки и контроль"]],
    metricValue: "case",
    result: "доверие",
    geo: "Тюмень",
    visualPrompt: "Top-level OG для страницы кейсов: реальные проекты, локальное доверие, схема задача-действие-результат.",
  },
  {
    out: "public/og/business-plans.png",
    kicker: "бизнес-план без воды",
    title: "Бизнес-планы: цифры, каналы, расходы и запуск",
    subtitle: "Показываем структуру: рынок, экономика, маркетинг, команда и первые действия.",
    brands: [{ label: "финмодель", width: 152 }, { label: "маркетинг", width: 152 }],
    diagramTitle: "идея → план",
    flow: [["Рынок", "спрос и конкуренты"], ["Деньги", "расходы и маржа"], ["Каналы", "сайт, VK, Директ"], ["Шаги", "что запускать"]],
    metricValue: "план",
    result: "решение",
    geo: "Тюмень",
    visualPrompt: "Top-level OG для бизнес-планов: рынок, финмодель, маркетинговые каналы и план действий без абстрактной 3D-папки.",
  },
  {
    out: "public/og/ai-turagent.png",
    kicker: "AI-консьерж для турагента",
    title: "AI для турагентства: заявки, документы и допродажи",
    subtitle: "Превью показывает путь туриста: вопрос, документы, напоминания, допродажа и живой менеджер.",
    brands: [{ label: "Telegram", logo: "telegram", width: 150 }, { label: "VK", logo: "vk", width: 128 }, { label: "MAX", logo: "max", width: 128 }],
    diagramTitle: "турист → сервис",
    flow: [["Лид", "куда, даты, бюджет"], ["Документы", "ваучер и памятка"], ["Напоминания", "вылет и чек-лист"], ["Менеджер", "сложный случай"]],
    metricValue: "24/7",
    result: "сервис",
    geo: "РФ",
    visualPrompt: "Top-level OG для AI-турагента: Telegram/VK/MAX, путь туриста, документы, напоминания и допродажи.",
  },
  {
    out: "public/og/metcoin.png",
    kicker: "промышленный кейс",
    title: "Metcoin: производство, каталог и digital-витрина",
    subtitle: "Заменяет темную AI-фабрику на структурное превью промышленного проекта.",
    brands: [{ label: "производство", width: 168 }, { label: "каталог", width: 126 }],
    diagramTitle: "цех → заявка",
    flow: [["Продукт", "что производят"], ["Каталог", "позиции и характеристики"], ["Спрос", "заявка или звонок"], ["CRM", "контроль обработки"]],
    metricValue: "B2B",
    result: "заявки",
    geo: "Тюмень",
    visualPrompt: "Top-level OG для промышленного проекта: производство, каталог, B2B-заявка и CRM без фотореалистичной AI-фабрики.",
  },
];

const barterVisuals = [
  {
    out: "public/images/barter/sto-barter-loop.png",
    kicker: "бартер без тумана",
    title: "Как сходится бартер со СТО",
    subtitle: "Сначала фиксируется смета авторабот, затем пакет CentrLP, потом маршрут заявок и контроль результата.",
    diagramTitle: "смета → заявки",
    steps: [["Смета", "работы и сроки"], ["Пакет", "лендинг + VK"], ["Запуск", "квиз и реклама"], ["Контроль", "заявки и статусы"]],
    chips: ["антикор", "электрика", "кузов", "VK", "Директ", "CRM"],
  },
  {
    out: "public/images/barter/sto-offer-stack.png",
    kicker: "состав пакета",
    title: "Что получает автосервис",
    subtitle: "Не красивый макет ради макета, а набор продающих материалов под конкретную автоуслугу.",
    diagramTitle: "пакет CentrLP",
    steps: [["Лендинг", "оффер и форма"], ["VK", "обложка и меню"], ["Квиз", "симптомы и фото"], ["Реклама", "структура кампаний"]],
    chips: ["лендинг", "квиз", "VK", "объявления", "Метрика", "FAQ"],
  },
  {
    out: "public/images/barter/sto-lead-path.png",
    kicker: "маршрут клиента",
    title: "Как идет заявка на автоуслугу",
    subtitle: "Клиент приходит из поиска, VK или рекламы, оставляет данные и попадает в понятную обработку.",
    diagramTitle: "клик → запись",
    steps: [["Канал", "поиск или VK"], ["Страница", "оффер и доверие"], ["Квиз", "данные и фото"], ["Запись", "осмотр или смета"]],
    chips: ["Яндекс", "VK", "форма", "фото", "смета", "запись"],
  },
  {
    out: "public/images/barter/sto-service-grid.png",
    kicker: "какие услуги подходят",
    title: "Автоуслуги с понятной сметой",
    subtitle: "Лучше всего работает там, где можно описать состав работ, входные данные и критерии результата.",
    diagramTitle: "услуги",
    steps: [["Диагностика", "симптомы"], ["Защита", "антикор, пленка"], ["Ремонт", "кузов, электрика"], ["Сервис", "запись и повтор"]],
    chips: ["антикор", "ГБО", "пленка", "электрика", "детейлинг", "кузов"],
  },
  {
    out: "public/images/barter/sto-fit-check.png",
    kicker: "fit-check",
    title: "Кому подходит такой обмен",
    subtitle: "Подходит сервисам с чеком от 30 000 ₽, прозрачной сметой и готовностью быстро отвечать на заявки.",
    diagramTitle: "подходит / нет",
    steps: [["Да", "смета и прайс"], ["Да", "есть фото работ"], ["Нет", "нет сроков"], ["Нет", "нет ответственного"]],
    chips: ["чек 30k+", "смета", "фото", "сроки", "прайс", "ответ"],
  },
];

function readBlogPosts() {
  const dir = path.join(ROOT, "content", "posts");
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
  return files.map((file) => {
    const abs = path.join(dir, file);
    const raw = fs.readFileSync(abs, "utf8");
    const parsed = matter(raw);
    const slug = parsed.data.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
    const title = parsed.data.title || raw.match(/^#\s+(.+)$/m)?.[1] || slug;
    const description = parsed.data.description || parsed.data.seoDescription || "";
    const tags = Array.isArray(parsed.data.tags) ? parsed.data.tags : [];
    return { slug, title, description, tags };
  });
}

async function renderHtml(browser, html, out, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width, height }, omitBackground: false });
  await page.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const item of serviceVisuals) {
      const out = path.join(ROOT, "public", "og", "services", `${item.slug}.png`);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await renderHtml(browser, renderServiceSvg(item), out, WIDTH, HEIGHT);
      console.log(`[context-visuals] service ${item.slug}`);
    }

    for (const post of readBlogPosts()) {
      const out = path.join(ROOT, "public", "og", "posts", `${post.slug}.png`);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await renderHtml(browser, renderBlogSvg(post), out, WIDTH, HEIGHT);
      console.log(`[context-visuals] post ${post.slug}`);
    }

    for (const item of homeVisuals) {
      const out = path.join(ROOT, item.out);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await renderHtml(browser, renderHomeSvg(item), out, HOME_WIDTH, HOME_HEIGHT);
      console.log(`[context-visuals] home ${path.relative(ROOT, out)}`);
    }

    for (const item of serviceOverviewVisuals) {
      const out = path.join(ROOT, item.out);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await renderHtml(browser, renderServiceOverviewSvg(item), out, SERVICE_OVERVIEW_WIDTH, SERVICE_OVERVIEW_HEIGHT);
      console.log(`[context-visuals] services ${path.relative(ROOT, out)}`);
    }

    for (const item of topLevelVisuals) {
      const out = path.join(ROOT, item.out);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await renderHtml(browser, renderServiceSvg(item), out, WIDTH, HEIGHT);
      console.log(`[context-visuals] top ${path.relative(ROOT, out)}`);
    }

    for (const item of barterVisuals) {
      const out = path.join(ROOT, item.out);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await renderHtml(browser, renderSquareSvg(item), out, 1024, 1024);
      console.log(`[context-visuals] barter ${path.relative(ROOT, out)}`);
    }

    await renderHtml(browser, renderBarterHeroSvg(), path.join(ROOT, "src", "assets", "barter-sto-hero.png"), 1536, 1024);
    console.log("[context-visuals] barter src\\assets\\barter-sto-hero.png");
  } finally {
    await browser.close();
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
