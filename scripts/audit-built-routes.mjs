import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const appPath = path.join(rootDir, "src", "App.tsx");
const postsDir = path.join(rootDir, "content", "posts");
const publicDir = path.join(rootDir, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function routeToHtmlPath(routePath) {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  return path.join(distDir, routePath.replace(/^\//, ""), "index.html");
}

function extractStaticRoutesFromApp() {
  const appSource = readText(appPath);
  const routes = [];

  for (const match of appSource.matchAll(/<Route\s+path="([^"]+)"/g)) {
    const routePath = match[1];

    if (!routePath.startsWith("/") || routePath.includes(":") || routePath.includes("*")) {
      continue;
    }

    routes.push(routePath);
  }

  return routes;
}

function extractBlogRoutes() {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => `/blog/${file.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "")}`);
}

function hasNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}

function extractPublicIndexRoutes() {
  if (!fs.existsSync(publicDir)) {
    return [];
  }

  return fs
    .readdirSync(publicDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const indexPath = path.join(publicDir, entry.name, "index.html");
      if (!fs.existsSync(indexPath)) {
        return null;
      }

      const html = readText(indexPath);
      if (hasNoindex(html)) {
        return null;
      }

      return `/${entry.name}`;
    })
    .filter(Boolean);
}

function extractSitemapRoutes() {
  if (!fs.existsSync(sitemapPath)) {
    return [];
  }

  const sitemap = readText(sitemapPath);
  return Array.from(sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g))
    .map((match) => match[1] || "/")
    .map((routePath) => routePath.replace(/\/$/, "") || "/");
}

function extractAssetRefs(html) {
  const refs = new Set();

  for (const match of html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g)) {
    refs.add(match[1]);
  }

  return [...refs];
}

function collectJsonLdTypes(html) {
  const types = new Set();
  const scripts = html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );

  const collect = (value) => {
    if (!value || typeof value !== "object") return;

    const type = value["@type"];
    if (Array.isArray(type)) {
      type.forEach((item) => types.add(String(item)));
    } else if (type) {
      types.add(String(type));
    }

    if (Array.isArray(value["@graph"])) {
      value["@graph"].forEach(collect);
    }
  };

  for (const match of scripts) {
    const rawJson = match[1].trim();
    if (!rawJson) continue;

    try {
      collect(JSON.parse(rawJson));
    } catch (error) {
      types.add(`INVALID_JSON_LD:${error.message}`);
    }
  }

  return types;
}

function hasRenderableShell(html) {
  const rootMatch = html.match(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>/i);
  const rootContent = rootMatch?.[1]?.trim() || "";
  return rootContent.length > 0 || /<script[^>]+type=["']module["'][^>]+\/assets\//i.test(html);
}

function main() {
  if (!fs.existsSync(distDir)) {
    throw new Error(`dist directory not found: ${distDir}`);
  }

  const routes = [
    ...extractStaticRoutesFromApp(),
    ...extractBlogRoutes(),
    ...extractPublicIndexRoutes(),
    ...extractSitemapRoutes(),
  ];

  const uniqueRoutes = [...new Set(routes)].sort();
  const violations = [];

  for (const routePath of uniqueRoutes) {
    const htmlPath = routeToHtmlPath(routePath);

    if (!fs.existsSync(htmlPath)) {
      violations.push(`${routePath}: missing ${path.relative(rootDir, htmlPath).replace(/\\/g, "/")}`);
      continue;
    }

    const html = readText(htmlPath);

    if (!hasRenderableShell(html)) {
      violations.push(`${routePath}: empty #root without module script`);
    }

    const jsonLdTypes = collectJsonLdTypes(html);
    const invalidJsonLd = [...jsonLdTypes].filter((type) => type.startsWith("INVALID_JSON_LD:"));
    for (const error of invalidJsonLd) {
      violations.push(`${routePath}: ${error}`);
    }

    if (routePath.startsWith("/blog/")) {
      for (const requiredType of ["Article", "BreadcrumbList"]) {
        if (!jsonLdTypes.has(requiredType)) {
          violations.push(`${routePath}: missing static JSON-LD ${requiredType}`);
        }
      }
    }

    if (routePath.startsWith("/services/")) {
      for (const requiredType of ["Service", "BreadcrumbList"]) {
        if (!jsonLdTypes.has(requiredType)) {
          violations.push(`${routePath}: missing static JSON-LD ${requiredType}`);
        }
      }
    }

    for (const assetRef of extractAssetRefs(html)) {
      const assetPath = path.join(distDir, assetRef.replace(/^\//, ""));
      if (!fs.existsSync(assetPath)) {
        violations.push(`${routePath}: missing asset ${assetRef}`);
      }
    }
  }

  if (violations.length > 0) {
    console.error("Built route audit failed:");
    for (const violation of violations) {
      console.error(`- ${violation}`);
    }
    process.exit(1);
  }

  console.log(`Built route audit passed for ${uniqueRoutes.length} routes.`);
}

main();
