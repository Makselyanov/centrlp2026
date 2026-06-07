import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const srcDir = path.join(rootDir, "src");
const appPath = path.join(srcDir, "App.tsx");
const postsDir = path.join(rootDir, "content", "posts");
const baseUrl = "https://centrlp.ru";

const ogImageMap = {
  "/": "index.png",
  "/services": "services.png",
  "/prices": "prices.png",
  "/projects": "projects.png",
  "/about": "about.png",
  "/contacts": "contacts.png",
  "/blog": "blog.png",
  "/ai": "ai.png",
  "/barter": "barter.png",
  "/cases": "cases.png",
  "/business-plans": "business-plans.png",
};

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

function stripInlineMarkdown(value) {
  return String(value)
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function hasUnsafePublicMarker(value) {
  return /SEO-метаданные|Self-review|Target keyword|Финальный status|TODO|draft|placeholder|черновик|здесь будут|потом добавим|надо придумать|implementation plan|handoff|Codex|Claude|CTA|обсуждается|комплаенс/i.test(
    String(value),
  );
}

function markdownToStaticHtml(markdown, title, description) {
  const html = [];
  const lines = String(markdown).split(/\r?\n/);
  let paragraph = [];
  let inFence = false;

  const flushParagraph = () => {
    const text = stripInlineMarkdown(paragraph.join(" "));
    paragraph = [];
    if (text) {
      html.push(`<p>${escapeHtml(text)}</p>`);
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

  return `<main class="seo-static-content" data-prerender="true" style="max-width: 860px; margin: 0 auto; padding: 48px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; line-height: 1.65;">
  ${intro}
  ${body}
</main>`;
}

function getOgImage(pathname) {
  if (ogImageMap[pathname]) return ogImageMap[pathname];
  // For blog posts and services, we generate per-item OG images.
  // If the image doesn't exist at runtime, the layout fallback will catch it.
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    if (slug) return `posts/${slug}.png`;
    return "blog.png";
  }
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "").replace(/\/$/, "");
    if (slug) return `services/${slug}.png`;
    return "services.png";
  }
  if (pathname.startsWith("/barter/")) return "barter.png";
  return "index.png";
}

function ensureTag(html, regex, value, fallback) {
  if (regex.test(html)) {
    return html.replace(regex, value);
  }
  return html.replace("</head>", `${fallback}\n</head>`);
}

function applyMeta(template, meta) {
  const canonical = `${baseUrl}${meta.path === "/" ? "/" : meta.path}`;
  const ogImageUrl = `${baseUrl}/og/${getOgImage(meta.path)}`;
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

      if (!title || !description) return null;

      const staticSource = `${title}\n${description}\n${parsed.content}`;

      return {
        path: `/blog/${slug}`,
        title,
        description,
        staticHtml: hasUnsafePublicMarker(staticSource)
          ? ""
          : markdownToStaticHtml(parsed.content, title, description),
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
  const routes = [...collectStaticRouteMeta(), ...collectBlogPostMeta()];
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
