import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { landingRouteMeta } from "../src/data/landingPageMeta.mjs";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const srcDir = path.join(rootDir, "src");
const appPath = path.join(srcDir, "App.tsx");
const postsDir = path.join(rootDir, "content", "posts");
const baseUrl = "https://centrlp.ru";

const BRAND_OG_IMAGE = "brand.jpg";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function stripMarkdownMarks(value, { trim = true } = {}) {
  const text = String(value)
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ");

  return trim ? text.trim() : text;
}

function stripInlineMarkdown(value) {
  return stripMarkdownMarks(
    String(value)
      .replace(/!\[[^\]]*]\([^)]+\)/g, "")
      .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1"),
  );
}

function renderInlineMarkdown(value) {
  const source = String(value);
  const html = [];
  const linkRegex = /(!?)\[([^\]]*)]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let lastIndex = 0;

  for (const match of source.matchAll(linkRegex)) {
    html.push(escapeHtml(stripMarkdownMarks(source.slice(lastIndex, match.index), { trim: false })));

    const isImage = match[1] === "!";
    const label = stripMarkdownMarks(match[2]);
    const href = match[3];

    if (isImage) {
      if (label) html.push(escapeHtml(label));
    } else if (/^(https?:\/\/|\/|mailto:|tel:)/i.test(href)) {
      html.push(`<a href="${escapeHtml(href)}">${escapeHtml(label || href)}</a>`);
    } else {
      html.push(escapeHtml(label || href));
    }

    lastIndex = match.index + match[0].length;
  }

  html.push(escapeHtml(stripMarkdownMarks(source.slice(lastIndex), { trim: false })));
  return html.join("");
}

function hasUnsafePublicMarker(value) {
  return /SEO-метаданные|Self-review|Target keyword|Финальный status|TODO|draft|placeholder|черновик|здесь будут|потом добавим|надо придумать|implementation plan|handoff|Codex|Claude|обсуждается/i.test(
    String(value),
  );
}

function markdownToStaticHtml(markdown, title, description, cta = {}) {
  const html = [];
  const lines = String(markdown).split(/\r?\n/);
  let paragraph = [];
  let inFence = false;

  const flushParagraph = () => {
    const text = renderInlineMarkdown(paragraph.join(" "));
    paragraph = [];
    if (text) {
      html.push(`<p>${text}</p>`);
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      inFence = !inFence;
      flushParagraph();
      continue;
    }

    if (inFence) continue;

    if (!line) {
      flushParagraph();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      const level = Math.min(heading[1].length, 3);
      html.push(`<h${level}>${escapeHtml(stripInlineMarkdown(heading[2]))}</h${level}>`);
      continue;
    }

    if (/^\|/.test(line) || /^[-:| ]+$/.test(line)) {
      flushParagraph();
      continue;
    }

    paragraph.push(line.replace(/^>\s?/, "").replace(/^[-*]\s+/, ""));
  }

  flushParagraph();

  const intro = [
    `<h1>${escapeHtml(title)}</h1>`,
    description ? `<p>${escapeHtml(description)}</p>` : "",
  ].join("");

  const body = html.join("\n");
  const ctaTitle = cta.title || "Сайт есть, но заявок мало?";
  const ctaText = cta.text || "Проверим первый экран, форму, быстрые контакты, Метрику и путь обращения за 48 часов. На выходе будет список правок, с которых стоит начинать рост заявок.";
  const primaryCtaLabel = cta.primaryLabel || "Получить разбор за 48 часов";
  const primaryCtaHref = cta.primaryHref || "/proverka-saita-i-zayavok-za-48-chasov";
  const secondaryCtaLabel = cta.secondaryLabel || "Связаться";
  const secondaryCtaHref = cta.secondaryHref || "/contacts";
  const ctaHtml = `<section style="margin-top: 32px; padding: 22px; border: 1px solid #bae6fd; border-radius: 16px; background: #f0f9ff;">
  <h2 style="margin-top: 0;">${escapeHtml(ctaTitle)}</h2>
  <p>${escapeHtml(ctaText)}</p>
  <p><a href="${escapeHtml(primaryCtaHref)}">${escapeHtml(primaryCtaLabel)}</a> · <a href="${escapeHtml(secondaryCtaHref)}">${escapeHtml(secondaryCtaLabel)}</a></p>
</section>`;

  return `<main class="seo-static-content" data-prerender="true" style="max-width: 860px; margin: 0 auto; padding: 48px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; line-height: 1.65;">
  ${intro}
  ${body}
  ${ctaHtml}
</main>`;
}

function landingStaticHtml(title, description) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  return `<main class="seo-static-content" data-prerender="true" style="min-height: 100vh; margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; background: linear-gradient(135deg, #f8fcff 0%, #ffffff 46%, #e7f7ff 100%);">
  <header style="border-bottom: 1px solid rgba(15,23,42,.08); background: rgba(255,255,255,.88);">
    <div style="max-width: 1180px; margin: 0 auto; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap;">
      <a href="/" style="display: inline-flex; align-items: center; gap: 10px; color: #0f172a; font-size: 20px; font-weight: 900; text-decoration: none;">
        <span style="display: inline-flex; width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg,#0096D6,#44B78B);"></span>
        CentrLP
      </a>
      <nav style="display: flex; align-items: center; gap: 18px; flex-wrap: wrap; font-size: 14px; font-weight: 700;">
        <a href="/services" style="color: #334155; text-decoration: none;">Услуги</a>
        <a href="/prices" style="color: #334155; text-decoration: none;">Цены</a>
        <a href="/projects" style="color: #334155; text-decoration: none;">Проекты</a>
        <a href="/contacts" style="color: #008dd2; text-decoration: none;">+7 905 824-85-64</a>
      </nav>
    </div>
  </header>
  <section style="max-width: 1180px; margin: 0 auto; padding: 86px 20px 70px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 36px; align-items: center;">
    <div>
      <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 22px; padding: 9px 14px; border: 1px solid rgba(0,150,214,.22); border-radius: 999px; background: rgba(255,255,255,.86); color: #008dd2; font-size: 14px; font-weight: 800;">CentrLP для заявок и трафика</div>
      <h1 style="margin: 0 0 22px; font-size: clamp(2.2rem, 6vw, 4.6rem); line-height: .98; letter-spacing: 0; background: linear-gradient(90deg, #0096D6, #00B8FF, #0077AA); -webkit-background-clip: text; background-clip: text; color: transparent;">${safeTitle}</h1>
      <p style="max-width: 760px; margin: 0 0 30px; font-size: 20px; line-height: 1.65; color: #475569;">${safeDescription}</p>
      <p style="display: flex; flex-wrap: wrap; gap: 12px; margin: 0;">
        <a href="/contacts#contact-form" style="display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 22px; border-radius: 999px; background: #008dd2; color: #fff; font-weight: 900; text-decoration: none;">Оставить заявку</a>
        <a href="/services" style="display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 22px; border-radius: 999px; border: 1px solid rgba(0,141,210,.25); background: #fff; color: #0f172a; font-weight: 900; text-decoration: none;">Услуги CentrLP</a>
      </p>
    </div>
    <aside style="border: 1px solid rgba(0,150,214,.16); border-radius: 24px; background: rgba(255,255,255,.9); box-shadow: 0 20px 55px rgba(15,23,42,.08); padding: 26px;">
      <div style="font-size: 13px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; color: #008dd2;">Что проверяем</div>
      <ul style="margin: 18px 0 0; padding: 0; list-style: none; display: grid; gap: 12px; color: #334155; line-height: 1.55;">
        <li>Первый экран, оффер и понятность услуги.</li>
        <li>Форму, быстрые контакты и путь заявки.</li>
        <li>Метрику, события и готовность к рекламе.</li>
        <li>SEO-основу, индексацию и внутренние ссылки.</li>
      </ul>
    </aside>
  </section>
  <footer style="border-top: 1px solid rgba(15,23,42,.08); background: #0f172a; color: #e2e8f0;">
    <div style="max-width: 1180px; margin: 0 auto; padding: 26px 20px; display: flex; justify-content: space-between; gap: 18px; flex-wrap: wrap; font-size: 14px;">
      <span>CentrLP: сайты, реклама, CRM и автоматизация под рост заявок.</span>
      <span><a href="/contacts" style="color: #7dd3fc; text-decoration: none;">Контакты</a> · <a href="/privacy" style="color: #7dd3fc; text-decoration: none;">Политика</a></span>
    </div>
  </footer>
</main>`;
}

function getOgImage() {
  return BRAND_OG_IMAGE;
}

function ensureTag(html, regex, value, fallback) {
  if (regex.test(html)) {
    return html.replace(regex, value);
  }
  return html.replace("</head>", `${fallback}\n</head>`);
}

function applyMeta(template, meta) {
  const canonical = `${baseUrl}${meta.path === "/" ? "/" : meta.path}`;
  const ogImageUrl = `${baseUrl}/og/${getOgImage()}`;
  const ogType = meta.path.startsWith("/blog/") ? "article" : "website";
  let html = template;

  html = html.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(meta.title)}</title>`);
  html = ensureTag(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );
  html = ensureTag(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["'][^"']*["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:title["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:description["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:url["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:image["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:image" content="${ogImageUrl}" />`,
    `<meta property="og:image" content="${ogImageUrl}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:type["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:type" content="${ogType}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+name=["']twitter:title["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+name=["']twitter:description["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="twitter:image" content="${ogImageUrl}" />`,
    `<meta name="twitter:image" content="${ogImageUrl}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+name=["']twitter:url["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="twitter:url" content="${canonical}" />`,
    `<meta name="twitter:url" content="${canonical}" />`,
  );

  if (meta.staticHtml) {
    html = html.replace(
      /<div\s+id=["']root["']\s*>\s*<\/div>/i,
      `<div id="root">${meta.staticHtml}</div>`,
    );
  }

  return html;
}

function writeRouteHtml(routePath, html) {
  if (routePath === "/") {
    fs.writeFileSync(path.join(distDir, "index.html"), html, "utf8");
    return;
  }

  const outputDir = path.join(distDir, routePath.replace(/^\//, ""));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), html, "utf8");
}

function extractImports(appSource) {
  const componentToFile = new Map();

  for (const match of appSource.matchAll(/import\s+([A-Za-z0-9_]+)\s+from\s+"([^"]+)"/g)) {
    componentToFile.set(match[1], match[2]);
  }

  for (const match of appSource.matchAll(/const\s+([A-Za-z0-9_]+)\s*=\s*lazy\(\(\)\s*=>\s*import\("([^"]+)"/g)) {
    componentToFile.set(match[1], match[2]);
  }

  return componentToFile;
}

function extractStaticRoutes(appSource) {
  const routes = [];

  for (const match of appSource.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)/g)) {
    const routePath = match[1];
    const componentName = match[2];

    if (routePath.includes(":") || routePath.includes("*")) {
      continue;
    }

    routes.push({ path: routePath, componentName });
  }

  return routes;
}

function resolveComponentFile(importPathValue) {
  const normalized = importPathValue.replace(/^\.\//, "");
  return path.join(srcDir, `${normalized}.tsx`);
}

function extractLayoutValue(fileContent, key) {
  const regex = new RegExp(`${key}\\s*=\\s*"([^"]+)"`, "s");
  return fileContent.match(regex)?.[1] || "";
}

function collectStaticRouteMeta() {
  const appSource = readText(appPath);
  const imports = extractImports(appSource);
  const routes = extractStaticRoutes(appSource);

  return routes
    .map((route) => {
      const importPathValue = imports.get(route.componentName);
      if (!importPathValue) return null;

      const filePath = resolveComponentFile(importPathValue);
      if (!fs.existsSync(filePath)) return null;

      const fileContent = readText(filePath);
      const title = extractLayoutValue(fileContent, "title");
      const description = extractLayoutValue(fileContent, "description");

      if (!title || !description) return null;

      const staticHtmlSource = `${title}\n${description}`;

      return {
        path: route.path,
        title,
        description,
        staticHtml: hasUnsafePublicMarker(staticHtmlSource)
          ? ""
          : `<main class="seo-static-content" data-prerender="true" style="max-width: 860px; margin: 0 auto; padding: 48px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; line-height: 1.65;"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></main>`,
      };
    })
    .filter(Boolean);
}

function collectBlogPostMeta() {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const raw = readText(filePath);
      const parsed = matter(raw);
      const data = parsed.data || {};
      const slug = data.slug || file.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const title = data.seoTitle || data.title || slug;
      const description = data.seoDescription || data.description || "";
      const cta = {
        title: data.ctaTitle,
        text: data.ctaText,
        primaryLabel: data.primaryCtaLabel,
        primaryHref: data.primaryCtaHref,
        secondaryLabel: data.secondaryCtaLabel,
        secondaryHref: data.secondaryCtaHref,
      };

      if (!title || !description) return null;

      const staticSource = `${title}\n${description}\n${parsed.content}`;

      return {
        path: `/blog/${slug}`,
        title,
        description,
        staticHtml: hasUnsafePublicMarker(staticSource)
          ? ""
          : markdownToStaticHtml(parsed.content, title, description, cta),
      };
    })
    .filter(Boolean);
}

function main() {
  const templatePath = path.join(distDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html not found: ${templatePath}`);
  }

  const template = readText(templatePath);
  const routes = [
    ...collectStaticRouteMeta(),
    ...landingRouteMeta.map((route) => ({
      ...route,
      staticHtml: landingStaticHtml(route.title, route.description),
    })),
    ...collectBlogPostMeta(),
  ];
  const staticBodyCount = routes.filter((route) => route.staticHtml).length;

  for (const route of routes) {
    const html = applyMeta(template, route);
    writeRouteHtml(route.path, html);
  }

  const rootMeta = routes.find((route) => route.path === "/");
  if (rootMeta) {
    const html = applyMeta(template, rootMeta);
    fs.writeFileSync(path.join(distDir, "404.html"), html, "utf8");
  }

  console.log(`Prerendered route heads for ${routes.length} routes; static bodies for ${staticBodyCount} routes`);
}

main();
