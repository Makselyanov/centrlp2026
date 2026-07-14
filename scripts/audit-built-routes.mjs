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

    for (const nestedValue of Object.values(value)) {
      if (Array.isArray(nestedValue)) {
        nestedValue.forEach(collect);
      } else if (nestedValue && typeof nestedValue === "object") {
        collect(nestedValue);
      }
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

function countJsonLdType(html, expectedType) {
  let count = 0;
  const scripts = html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );

  const collect = (value) => {
    if (!value || typeof value !== "object") return;

    const type = value["@type"];
    if (Array.isArray(type) && type.map(String).includes(expectedType)) {
      count += 1;
    } else if (String(type) === expectedType) {
      count += 1;
    }

    for (const nestedValue of Object.values(value)) {
      if (Array.isArray(nestedValue)) {
        nestedValue.forEach(collect);
      } else if (nestedValue && typeof nestedValue === "object") {
        collect(nestedValue);
      }
    }
  };

  for (const match of scripts) {
    const rawJson = match[1].trim();
    if (!rawJson) continue;

    try {
      collect(JSON.parse(rawJson));
    } catch {
      // Invalid JSON-LD is reported by collectJsonLdTypes.
    }
  }

  return count;
}

function hasRenderableShell(html) {
  const rootMatch = html.match(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>/i);
  const rootContent = rootMatch?.[1]?.trim() || "";
  return rootContent.length > 0 || /<script[^>]+type=["']module["'][^>]+\/assets\//i.test(html);
}

function countPrerenderHeadings(html, level) {
  const root = html.match(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>\s*<noscript/i)?.[1] || "";
  return (root.match(new RegExp(`<h${level}(?:\\s|>)`, "gi")) || []).length;
}

function countDocumentHeadings(html, level) {
  return (html.match(new RegExp(`<h${level}(?:\\s|>)`, "gi")) || []).length;
}

function extractPrerenderH1(html) {
  const root = html.match(/<div\s+id=["']root["'][^>]*>([\s\S]*?)<\/div>\s*<noscript/i)?.[1] || "";
  return root.match(/<h1(?:\s[^>]*)?>([^<]+)<\/h1>/i)?.[1]?.trim() || "";
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
  const redirectRoutes = new Set([
    "/services/yandex-direct",
  ]);
  const routesRequiringFaq = new Set([
    "/proverka-saita-i-zayavok-za-48-chasov",
    "/razrabotka-sajtov-tyumen",
    "/sozdanie-lendinga-tyumen",
    "/nastroyka-yandex-direct-tyumen",
    "/crm-dlya-biznesa",
    "/ai-avtomatizaciya-biznesa",
    "/lokalnoe-seo-tyumen",
  ]);

  for (const routePath of uniqueRoutes) {
    if (redirectRoutes.has(routePath)) {
      continue;
    }

    const htmlPath = routeToHtmlPath(routePath);

    if (!fs.existsSync(htmlPath)) {
      violations.push(`${routePath}: missing ${path.relative(rootDir, htmlPath).replace(/\\/g, "/")}`);
      continue;
    }

    const html = readText(htmlPath);
    const prerenderH1 = extractPrerenderH1(html);

    if (!hasRenderableShell(html)) {
      violations.push(`${routePath}: empty #root without module script`);
    }

    if (/\|\s*CentrLP(?:\s+Тюмень)?$/i.test(prerenderH1)) {
      violations.push(`${routePath}: prerendered H1 must not include the title brand suffix`);
    }

    if (countDocumentHeadings(html, 1) !== 1) {
      violations.push(`${routePath}: built document must contain exactly one H1`);
    }

    const jsonLdTypes = collectJsonLdTypes(html);
    const invalidJsonLd = [...jsonLdTypes].filter((type) => type.startsWith("INVALID_JSON_LD:"));
    for (const error of invalidJsonLd) {
      violations.push(`${routePath}: ${error}`);
    }

    if (routePath.startsWith("/blog/")) {
      if (countPrerenderHeadings(html, 1) !== 1) {
        violations.push(`${routePath}: prerendered article must keep one primary heading outside noscript`);
      }

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

    if (routesRequiringFaq.has(routePath)) {
      for (const requiredType of ["Service", "BreadcrumbList", "FAQPage"]) {
        if (!jsonLdTypes.has(requiredType)) {
          violations.push(`${routePath}: missing static JSON-LD ${requiredType}`);
        }
      }

      if (countJsonLdType(html, "Question") < 2) {
        violations.push(`${routePath}: static FAQPage must include at least 2 Question items`);
      }
    }

    if (routePath === "/projects") {
      for (const requiredType of ["CollectionPage", "ItemList", "BreadcrumbList"]) {
        if (!jsonLdTypes.has(requiredType)) {
          violations.push(`${routePath}: missing static JSON-LD ${requiredType}`);
        }
      }

      if (countJsonLdType(html, "ListItem") < 2) {
        violations.push(`${routePath}: static ItemList must include at least 2 ListItem entries`);
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
