import fs from "node:fs";
import path from "node:path";

const publicDir = path.resolve(process.cwd(), "public");

function readHtml(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function hasNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
    || /<meta[^>]+http-equiv=["']X-Robots-Tag["'][^>]+content=["'][^"']*noindex/i.test(html);
}

function hasAppShell(html) {
  return /<div\s+id=["']root["']\s*>\s*<\/div>/i.test(html)
    || /\/assets\/index-[^"']+\.js/i.test(html);
}

function getIndexFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...getIndexFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name === "index.html") {
      found.push(entryPath);
    }
  }

  return found;
}

const violations = getIndexFiles(publicDir)
  .map((filePath) => {
    const html = readHtml(filePath);
    return { filePath, html };
  })
  .filter(({ html }) => !hasNoindex(html) && !hasAppShell(html))
  .map(({ filePath }) => path.relative(process.cwd(), filePath).replace(/\\/g, "/"));

if (violations.length > 0) {
  console.error("Found indexable standalone HTML pages in public/. Move them into React routes or mark them noindex:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Public page audit passed.");

