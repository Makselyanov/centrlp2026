import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const REPORT_DIR = path.join(ROOT_DIR, "seo-reports");

const DEFAULT_SITEMAP_URL = "https://centrlp.ru/sitemap.xml";
const CONCURRENCY = 6;

function parseArgs(argv) {
  const args = {
    sitemapUrl: DEFAULT_SITEMAP_URL,
    save: true,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--no-save") {
      args.save = false;
    } else if (arg === "--sitemap" && argv[i + 1]) {
      args.sitemapUrl = argv[i + 1];
      i += 1;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  node scripts/seo-site-audit.mjs
  node scripts/seo-site-audit.mjs --sitemap https://centrlp.ru/sitemap.xml
  node scripts/seo-site-audit.mjs --no-save
`);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function extractAll(regex, input) {
  const results = [];
  let match = regex.exec(input);
  while (match) {
    results.push(match[1]);
    match = regex.exec(input);
  }
  return results;
}

function normalizeSpace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function pathFromUrl(url) {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Codex SEO Audit/1.0 (+https://centrlp.ru)",
      Accept: "text/html,application/xhtml+xml,text/xml",
    },
    redirect: "follow",
  });

  const text = await res.text();

  return {
    url,
    status: res.status,
    finalUrl: res.url,
    text,
  };
}

async function fetchSitemapUrls(sitemapUrl) {
  const { status, text } = await fetchText(sitemapUrl);
  if (status < 200 || status >= 300) {
    throw new Error(`Sitemap fetch failed with status ${status}`);
  }

  const urls = extractAll(/<loc>(.*?)<\/loc>/gims, text).map((value) => value.trim());
  return [...new Set(urls)];
}

function extractHeadSignals(html) {
  const title = normalizeSpace(html.match(/<title>(.*?)<\/title>/is)?.[1] || "");
  const description = normalizeSpace(
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] || "",
  );
  const canonical = normalizeSpace(
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] || "",
  );
  const ogImage = normalizeSpace(
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] || "",
  );
  const robots = normalizeSpace(
    html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] || "",
  );

  return { title, description, canonical, ogImage, robots };
}

function buildIssues(entry) {
  const issues = [];
  if (entry.status !== 200) issues.push(`HTTP ${entry.status}`);
  if (!entry.title) issues.push("missing title");
  if (!entry.description) issues.push("missing description");
  if (!entry.canonical) issues.push("missing canonical");
  if (!entry.ogImage) issues.push("missing og:image");
  if (entry.robots && /noindex/i.test(entry.robots)) issues.push(`robots=${entry.robots}`);

  if (entry.canonical && entry.expectedCanonical && entry.canonical !== entry.expectedCanonical) {
    issues.push(`canonical mismatch -> ${entry.canonical}`);
  }

  if (entry.title && entry.title.length > 72) issues.push(`long title (${entry.title.length})`);
  if (entry.description && entry.description.length > 170) issues.push(`long description (${entry.description.length})`);
  if (entry.description && entry.description.length < 90) issues.push(`short description (${entry.description.length})`);

  return issues;
}

async function mapLimit(items, limit, iteratee) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await iteratee(items[current], current);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

function collectDuplicates(entries, field) {
  const map = new Map();
  for (const entry of entries) {
    const value = normalizeSpace(entry[field] || "");
    if (!value) continue;
    const list = map.get(value) || [];
    list.push(entry.path);
    map.set(value, list);
  }

  return [...map.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([value, paths]) => ({ value, paths }));
}

function buildMarkdown(report) {
  const lines = [];
  lines.push(`# SEO site audit for ${report.sitemapUrl}`);
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Summary");
  lines.push(`- URLs in sitemap: ${report.summary.total}`);
  lines.push(`- URLs with HTTP 200: ${report.summary.ok}`);
  lines.push(`- URLs with issues: ${report.summary.withIssues}`);
  lines.push(`- Duplicate titles: ${report.duplicates.titles.length}`);
  lines.push(`- Duplicate descriptions: ${report.duplicates.descriptions.length}`);
  lines.push("");

  lines.push("## Priority issues");
  if (report.priority.length === 0) {
    lines.push("- none");
  } else {
    for (const item of report.priority) {
      lines.push(`- ${item.path}: ${item.issues.join("; ")}`);
    }
  }
  lines.push("");

  lines.push("## Duplicate titles");
  if (report.duplicates.titles.length === 0) {
    lines.push("- none");
  } else {
    for (const item of report.duplicates.titles) {
      lines.push(`- ${item.value}`);
      for (const page of item.paths) {
        lines.push(`  - ${page}`);
      }
    }
  }
  lines.push("");

  lines.push("## Duplicate descriptions");
  if (report.duplicates.descriptions.length === 0) {
    lines.push("- none");
  } else {
    for (const item of report.duplicates.descriptions) {
      lines.push(`- ${item.value}`);
      for (const page of item.paths) {
        lines.push(`  - ${page}`);
      }
    }
  }
  lines.push("");

  lines.push("## URL checks");
  for (const entry of report.entries) {
    lines.push(`- ${entry.path} | ${entry.status} | title=${entry.title.length} | description=${entry.description.length} | issues=${entry.issues.join(", ") || "none"}`);
  }

  lines.push("");
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const urls = await fetchSitemapUrls(args.sitemapUrl);
  const entries = await mapLimit(urls, CONCURRENCY, async (url) => {
    const page = await fetchText(url);
    const head = extractHeadSignals(page.text);
    const expectedCanonical = url;
    const entry = {
      url,
      path: pathFromUrl(url),
      status: page.status,
      finalUrl: page.finalUrl,
      expectedCanonical,
      ...head,
    };
    entry.issues = buildIssues(entry);
    return entry;
  });

  const duplicates = {
    titles: collectDuplicates(entries, "title"),
    descriptions: collectDuplicates(entries, "description"),
  };

  const priority = entries
    .filter((entry) => entry.issues.length > 0)
    .sort((a, b) => b.issues.length - a.issues.length || a.path.localeCompare(b.path));

  const report = {
    sitemapUrl: args.sitemapUrl,
    generatedAt: new Date().toISOString(),
    summary: {
      total: entries.length,
      ok: entries.filter((entry) => entry.status === 200).length,
      withIssues: priority.length,
    },
    duplicates,
    priority,
    entries,
  };

  const markdown = buildMarkdown(report);

  if (args.save) {
    ensureDir(REPORT_DIR);
    fs.writeFileSync(path.join(REPORT_DIR, "latest-site-audit.json"), JSON.stringify(report, null, 2));
    fs.writeFileSync(path.join(REPORT_DIR, "latest-site-audit.md"), markdown);
  }

  console.log(markdown);
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});
