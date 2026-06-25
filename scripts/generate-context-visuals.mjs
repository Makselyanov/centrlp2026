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

function wrapWords(text, maxChars, maxLines = 4) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length <= maxChars || !current) {
      current = test;
      continue;
    }
    lines.push(current);
    current = word;
    if (lines.length === maxLines - 1) break;
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

function textBlock(lines, x, y, size, weight = 700, fill = colors.ink, lineHeight = size * 1.18) {
  return lines
    .map((line, index) => {
      const escaped = escapeXml(line);
      return `<text x="${x}" y="${y + index * lineHeight}" fill="${fill}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}">${escaped}</text>`;
    })
    .join("");
}

function pill(label, x, y, options = {}) {
  const width = options.width ?? Math.max(118, label.length * 8.5 + 34);
  const fill = options.fill ?? "#ffffff";
  const stroke = options.stroke ?? "#cbd5e1";
  const textFill = options.textFill ?? colors.ink;
  const iconKey = options.logo;
  const icon = logoDataUri(iconKey);
  const hasIcon = Boolean(icon);
  const wideLogo = iconKey === "vk" || iconKey === "avito";
  const iconWidth = wideLogo ? 58 : 28;
  const iconHeight = wideLogo ? 22 : 28;
  const iconMarkup = hasIcon
    ? `<image href="${icon}" x="${x + 13}" y="${y + (50 - iconHeight) / 2}" width="${iconWidth}" height="${iconHeight}" preserveAspectRatio="xMidYMid meet" />`
    : "";
  const textX = hasIcon ? x + (wideLogo ? 82 : 50) : x + 18;
  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="50" rx="18" fill="${fill}" stroke="${stroke}" />
      ${iconMarkup}
      <text x="${textX}" y="${y + 31}" fill="${textFill}" font-family="Arial, sans-serif" font-size="17" font-weight="700">${escapeXml(label)}</text>
    </g>`;
}

function smallMetric(label, value, x, y, tone = "blue") {
  const fill = tone === "green" ? colors.softGreen : colors.softBlue;
  const accent = tone === "green" ? "#168a61" : "#0878ad";
  return `
    <g>
      <rect x="${x}" y="${y}" width="158" height="86" rx="22" fill="${fill}" stroke="#bfdbfe" />
      <text x="${x + 20}" y="${y + 32}" fill="${accent}" font-family="Arial, sans-serif" font-size="24" font-weight="800">${escapeXml(value)}</text>
      <text x="${x + 20}" y="${y + 58}" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="14" font-weight="600">${escapeXml(label)}</text>
    </g>`;
}

function flowCard(title, subtitle, x, y, index, tone = "blue") {
  const accent = tone === "green" ? colors.green : colors.blue;
  return `
    <g>
      <rect x="${x}" y="${y}" width="366" height="78" rx="22" fill="#ffffff" stroke="#dbeafe" />
      <circle cx="${x + 38}" cy="${y + 39}" r="21" fill="${accent}" />
      <text x="${x + 32}" y="${y + 47}" fill="#ffffff" font-family="Arial, sans-serif" font-size="20" font-weight="800">${index}</text>
      <text x="${x + 72}" y="${y + 32}" fill="${colors.ink}" font-family="Arial, sans-serif" font-size="18" font-weight="800">${escapeXml(title)}</text>
      <text x="${x + 72}" y="${y + 56}" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="14" font-weight="600">${escapeXml(subtitle)}</text>
    </g>`;
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

function conciseSubtitle(item) {
  if (item.shortSubtitle) return item.shortSubtitle;
  const steps = (item.flow || [])
    .slice(0, 3)
    .map((step) => step[0])
    .join(", ");
  return `Маршрут: ${steps}.`;
}

function compactGeo(geo) {
  if (!geo) return "Тюмень";
  if (geo.includes("Тюмень")) return "Тюмень";
  if (geo.includes("РФ")) return "РФ";
  return geo;
}

function renderServiceSvg(item) {
  const titleLines = wrapWords(item.title, 18, 3);
  const subtitleLines = wrapWords(conciseSubtitle(item), 38, 3);
  const brandPills = item.brands
    .map((brand, index) => pill(brand.label, 660 + index * 162, 94, { logo: brand.logo, width: brand.width ?? 146, stroke: brand.stroke ?? "#cbd5e1" }))
    .join("");
  const flows = item.flow
    .slice(0, 4)
    .map((step, index) => flowCard(step[0], step[1], 668, 208 + index * 92, index + 1, index % 2 ? "green" : "blue"))
    .join("");

  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${background(WIDTH, HEIGHT)}
    <rect x="54" y="54" width="1092" height="522" rx="42" fill="#ffffff" opacity="0.86" filter="url(#shadow)" />
    <rect x="54" y="54" width="1092" height="522" rx="42" fill="none" stroke="#dbeafe" />
    <rect x="86" y="88" width="124" height="34" rx="17" fill="#eff6ff" />
    <text x="104" y="111" fill="${colors.blue}" font-family="Arial, sans-serif" font-size="15" font-weight="800">CentrLP · Тюмень</text>
    <text x="86" y="166" fill="${colors.green}" font-family="Arial, sans-serif" font-size="19" font-weight="800">${escapeXml(item.kicker)}</text>
    ${textBlock(titleLines, 86, 224, 40, 800, colors.ink, 46)}
    ${textBlock(subtitleLines, 88, 224 + titleLines.length * 46 + 24, 20, 600, colors.muted, 29)}
    <g transform="translate(86 470)">
      ${smallMetric(item.metricLabel ?? "маршрут", item.metricValue ?? "заявка", 0, 0, "blue")}
      ${smallMetric("гео", compactGeo(item.geo ?? "Тюмень"), 176, 0, "green")}
      ${smallMetric("результат", item.result ?? "лиды", 352, 0, "blue")}
    </g>
    <rect x="636" y="64" width="484" height="498" rx="34" fill="#f8fafc" stroke="#e2e8f0" />
    ${brandPills}
    <text x="668" y="178" fill="${colors.ink}" font-family="Arial, sans-serif" font-size="25" font-weight="800">${escapeXml(item.diagramTitle)}</text>
    ${flows}
    <g opacity="0.9">
      <path d="M668 564 C770 520 860 604 1086 540" fill="none" stroke="url(#brand)" stroke-width="8" stroke-linecap="round" opacity="0.35" />
      <circle cx="1086" cy="540" r="12" fill="${colors.green}" />
      <circle cx="668" cy="564" r="12" fill="${colors.blue}" />
    </g>
  </svg>
  </body></html>`;
}

function renderBlogSvg(post) {
  const titleLines = wrapWords(post.title, 22, 4);
  const brands = detectBrands(`${post.title} ${post.description} ${(post.tags || []).join(" ")}`);
  const brandMarkup = brands
    .slice(0, 3)
    .map((brand, index) => pill(brand.label, 714 + index * 142, 126, { logo: brand.logo, width: brand.width ?? 128 }))
    .join("");
  const topic = classifyTopic(post);
  const descLines = wrapWords(`Маршрут: ${topic.steps[0][0]}, ${topic.steps[1][0]}.`, 58, 2);
  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${background(WIDTH, HEIGHT)}
    <rect x="54" y="54" width="1092" height="522" rx="42" fill="#ffffff" opacity="0.88" filter="url(#shadow)" />
    <rect x="54" y="54" width="1092" height="522" rx="42" fill="none" stroke="#dbeafe" />
    <text x="86" y="112" fill="${colors.blue}" font-family="Arial, sans-serif" font-size="18" font-weight="800">Блог CentrLP · ${escapeXml(topic.geo)}</text>
    <text x="86" y="166" fill="${colors.green}" font-family="Arial, sans-serif" font-size="19" font-weight="800">${escapeXml(topic.kicker)}</text>
    ${textBlock(titleLines, 86, 226, 38, 800, colors.ink, 44)}
    ${textBlock(descLines, 88, 226 + titleLines.length * 44 + 22, 20, 600, colors.muted, 28)}
    <rect x="688" y="86" width="420" height="408" rx="34" fill="#f8fafc" stroke="#e2e8f0" />
    ${brandMarkup || pill(topic.primary, 714, 126, { width: 176, fill: "#eff6ff", stroke: "#bfdbfe", textFill: "#0878ad" })}
    <text x="714" y="234" fill="${colors.ink}" font-family="Arial, sans-serif" font-size="26" font-weight="800">${escapeXml(topic.diagram)}</text>
    ${flowCard(topic.steps[0][0], topic.steps[0][1], 714, 270, 1, "blue")}
    ${flowCard(topic.steps[1][0], topic.steps[1][1], 714, 362, 2, "green")}
    ${smallMetric("читателю", topic.metric, 86, 470, "blue")}
    ${smallMetric("гео", compactGeo(topic.geo), 264, 470, "green")}
    ${smallMetric("формат", "гайд", 442, 470, "blue")}
    <path d="M714 486 C792 454 906 522 1086 470" fill="none" stroke="url(#brand)" stroke-width="8" stroke-linecap="round" opacity="0.32" />
  </svg>
  </body></html>`;
}

function renderHomeSvg(item) {
  const width = HOME_WIDTH;
  const height = HOME_HEIGHT;
  const titleLines = wrapWords(item.title, 18, 3);
  const descLines = wrapWords(item.subtitle, 40, 3);
  const brandPills = item.brands
    .map((brand, index) => pill(brand.label, 72 + index * 166, 500, { logo: brand.logo, width: brand.width ?? 146 }))
    .join("");
  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${background(width, height)}
    <rect x="52" y="52" width="1096" height="571" rx="44" fill="#ffffff" opacity="0.86" filter="url(#shadow)" />
    <rect x="52" y="52" width="1096" height="571" rx="44" fill="none" stroke="#dbeafe" />
    <text x="72" y="112" fill="${colors.blue}" font-family="Arial, sans-serif" font-size="18" font-weight="800">${escapeXml(item.kicker ?? "CentrLP · цифровые продукты")}</text>
    ${textBlock(titleLines, 72, 182, 46, 800, colors.ink, 54)}
    ${textBlock(descLines, 74, 182 + titleLines.length * 54 + 28, 23, 600, colors.muted, 32)}
    ${brandPills}
    <g transform="translate(720 118)">
      <rect x="0" y="0" width="396" height="390" rx="34" fill="#f8fafc" stroke="#dbeafe" />
      <rect x="36" y="38" width="324" height="74" rx="24" fill="#ffffff" stroke="#dbeafe" />
      <rect x="60" y="62" width="90" height="14" rx="7" fill="${colors.blue}" opacity="0.72" />
      <rect x="60" y="86" width="226" height="10" rx="5" fill="#cbd5e1" />
      <rect x="36" y="142" width="324" height="74" rx="24" fill="#ffffff" stroke="#dbeafe" />
      <rect x="60" y="166" width="124" height="14" rx="7" fill="${colors.green}" opacity="0.72" />
      <rect x="60" y="190" width="250" height="10" rx="5" fill="#cbd5e1" />
      <rect x="36" y="246" width="324" height="98" rx="24" fill="#ffffff" stroke="#dbeafe" />
      <path d="M74 304 L126 278 L178 300 L230 250 L306 288" fill="none" stroke="url(#brand)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="306" cy="288" r="14" fill="${colors.green}" />
    </g>
  </svg>
  </body></html>`;
}

const squareCopyOverrides = new Map([
  ["sto-barter-loop.png", {
    title: "Бартер со СТО",
    subtitle: "Смета авторабот, пакет CentrLP, запуск и контроль заявок.",
  }],
  ["sto-offer-stack.png", {
    title: "Пакет для СТО",
    subtitle: "Лендинг, VK, квиз, реклама, Метрика и FAQ под автоуслугу.",
  }],
  ["sto-lead-path.png", {
    title: "Маршрут заявки",
    subtitle: "Поиск или VK ведут на страницу, форму, фото и запись.",
  }],
  ["sto-service-grid.png", {
    title: "Подходящие автоуслуги",
    subtitle: "Работает там, где есть смета, сроки и фото результата.",
  }],
  ["sto-fit-check.png", {
    title: "Fit-check",
    subtitle: "Чек от 30 000 ₽, прозрачная смета и быстрый ответ.",
  }],
]);

function renderSquareSvg(item) {
  const width = 1024;
  const height = 1024;
  const copy = squareCopyOverrides.get(path.basename(item.out)) ?? item;
  const titleLines = wrapWords(copy.title, 18, 2);
  const descLines = wrapWords(copy.subtitle, 31, 3);
  const chips = item.chips
    .slice(0, 6)
    .map((chip, index) => {
      const x = 82 + (index % 2) * 420;
      const y = 646 + Math.floor(index / 2) * 92;
      return pill(chip, x, y, { width: 340, fill: index % 2 ? colors.softGreen : colors.softBlue, stroke: "#bfdbfe" });
    })
    .join("");
  const steps = item.steps
    .slice(0, 4)
    .map((step, index) => flowCard(step[0], step[1], 552, 174 + index * 104, index + 1, index % 2 ? "green" : "blue"))
    .join("");
  return `<!doctype html>
  <html><head><meta charset="utf-8"><style>body{margin:0}</style></head>
  <body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${background(width, height)}
    <rect x="52" y="52" width="920" height="920" rx="54" fill="#ffffff" opacity="0.88" filter="url(#shadow)" />
    <rect x="52" y="52" width="920" height="920" rx="54" fill="none" stroke="#dbeafe" />
    <text x="82" y="122" fill="${colors.blue}" font-family="Arial, sans-serif" font-size="22" font-weight="800">CentrLP · бартер для СТО</text>
    <text x="82" y="184" fill="${colors.green}" font-family="Arial, sans-serif" font-size="24" font-weight="800">${escapeXml(item.kicker)}</text>
    ${textBlock(titleLines, 82, 254, 48, 800, colors.ink, 56)}
    ${textBlock(descLines, 84, 254 + titleLines.length * 56 + 28, 24, 600, colors.muted, 34)}
    <rect x="526" y="116" width="392" height="500" rx="40" fill="#f8fafc" stroke="#dbeafe" />
    <text x="552" y="154" fill="${colors.ink}" font-family="Arial, sans-serif" font-size="25" font-weight="800">${escapeXml(item.diagramTitle)}</text>
    ${steps}
    ${chips}
    <path d="M118 922 C260 872 452 950 892 858" fill="none" stroke="url(#brand)" stroke-width="12" stroke-linecap="round" opacity="0.34" />
    <circle cx="118" cy="922" r="16" fill="${colors.blue}" />
    <circle cx="892" cy="858" r="16" fill="${colors.green}" />
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
    <g transform="translate(180 146)">
      <rect x="0" y="0" width="302" height="116" rx="28" fill="#ffffff" opacity="0.12" stroke="#6ee7b7" />
      <text x="28" y="44" fill="#ffffff" font-family="Arial, sans-serif" font-size="25" font-weight="800">смета СТО</text>
      <text x="28" y="80" fill="#b6d5e6" font-family="Arial, sans-serif" font-size="20" font-weight="700">работы, сроки, фото</text>
    </g>
    <g transform="translate(614 106)">
      <rect x="0" y="0" width="330" height="132" rx="30" fill="#ffffff" opacity="0.13" stroke="#38bdf8" />
      <text x="28" y="50" fill="#ffffff" font-family="Arial, sans-serif" font-size="26" font-weight="800">пакет CentrLP</text>
      <text x="28" y="88" fill="#b6d5e6" font-family="Arial, sans-serif" font-size="20" font-weight="700">лендинг, VK, квиз, реклама</text>
    </g>
    <g transform="translate(1052 152)">
      <rect x="0" y="0" width="298" height="116" rx="28" fill="#ffffff" opacity="0.12" stroke="#6ee7b7" />
      <text x="28" y="44" fill="#ffffff" font-family="Arial, sans-serif" font-size="25" font-weight="800">заявки</text>
      <text x="28" y="80" fill="#b6d5e6" font-family="Arial, sans-serif" font-size="20" font-weight="700">маршрут и контроль</text>
    </g>
    <path d="M482 206 C538 174 560 174 614 178" fill="none" stroke="url(#brand)" stroke-width="10" stroke-linecap="round" />
    <path d="M944 178 C996 174 1024 190 1052 214" fill="none" stroke="url(#brand)" stroke-width="10" stroke-linecap="round" />
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
    kicker: "CentrLP · продуктовая связка",
    title: "Продуктовый стек",
    subtitle: "Сайт, Mini App, CRM, аналитика и автоматизация складываются в один маршрут заявки.",
    brands: [{ label: "Telegram", logo: "telegram", width: 150 }, { label: "MAX", logo: "max", width: 128 }, { label: "CRM", width: 118 }],
  },
  {
    out: "public/images/services/services-launch-bundles.png",
    kicker: "CentrLP · пакеты запуска",
    title: "Сборки запуска",
    subtitle: "Страница, квиз, реклама, чат и CRM запускаются как один понятный комплект.",
    brands: [{ label: "Директ", logo: "yandexDirect", width: 140 }, { label: "VK", logo: "vk", width: 128 }, { label: "заявки", width: 118 }],
  },
  {
    out: "public/images/services/services-industry-map.png",
    kicker: "CentrLP · SEO-гео",
    title: "Нишевые маршруты",
    subtitle: "Тюмень, туризм, СТО, клининг, мебель и B2B получают разные сценарии заявки.",
    brands: [{ label: "Тюмень", width: 132 }, { label: "B2B", width: 104 }, { label: "CRM", width: 118 }],
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
    const prompt = `Редакционная SEO-обложка: ${title}. Контекст: ${description || tags.join(", ")}. Без AI-рендера, с гео и маршрутом действия.`;
    return { slug, title, description, tags, prompt };
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
      await renderHtml(browser, renderHomeSvg(item), out, HOME_WIDTH, HOME_HEIGHT);
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
