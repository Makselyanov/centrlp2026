import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DEFAULT_ENV_PATH = path.join(ROOT_DIR, ".env.seo.local");
const REPORT_DIR = path.join(ROOT_DIR, "seo-reports");

const OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const SEARCH_CONSOLE_BASE = "https://searchconsole.googleapis.com";

function parseArgs(argv) {
  const args = {
    envPath: DEFAULT_ENV_PATH,
    save: true,
    help: false,
    days: 28,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--no-save") {
      args.save = false;
    } else if (arg === "--env" && argv[i + 1]) {
      args.envPath = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
    } else if (arg === "--days" && argv[i + 1]) {
      const n = Number(argv[i + 1]);
      if (Number.isFinite(n) && n > 0) args.days = Math.floor(n);
      i += 1;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  node scripts/gsc-report.mjs
  node scripts/gsc-report.mjs --env .env.seo.local
  node scripts/gsc-report.mjs --no-save
  node scripts/gsc-report.mjs --days 28

Reads GSC credentials from .env.seo.local:
  GSC_CLIENT_ID
  GSC_CLIENT_SECRET
  GSC_REFRESH_TOKEN
  GSC_SITE_URL     e.g. "sc-domain:example.com" or "https://example.com/"

OAuth onboarding: see G:/mvp/centrlp/plans/seo-onboarding-oauth-gsc.md
`);
}

function parseEnvFile(content) {
  const result = {};
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function loadConfig(envPath) {
  const fileVars = fs.existsSync(envPath)
    ? parseEnvFile(fs.readFileSync(envPath, "utf8"))
    : {};

  const merged = { ...fileVars, ...process.env };

  return {
    envPath,
    clientId: merged.GSC_CLIENT_ID || "",
    clientSecret: merged.GSC_CLIENT_SECRET || "",
    refreshToken: merged.GSC_REFRESH_TOKEN || "",
    siteUrl: merged.GSC_SITE_URL || "",
  };
}

async function exchangeRefreshToken({ clientId, clientSecret, refreshToken }) {
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const res = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.error_description || data.error || `HTTP ${res.status}`;
    const err = new Error(`OAuth token exchange failed: ${msg}`);
    err.payload = data;
    throw err;
  }

  return data.access_token;
}

async function gscRequest(accessToken, method, pathname, body) {
  const res = await fetch(`${SEARCH_CONSOLE_BASE}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const msg = data?.error?.message || `Request failed with status ${res.status}`;
    const error = new Error(msg);
    error.status = res.status;
    error.payload = data;
    throw error;
  }

  return data;
}

async function safeGscRequest(accessToken, method, pathname, body) {
  try {
    const data = await gscRequest(accessToken, method, pathname, body);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: {
        status: error.status || 0,
        message: error.message || "Unknown error",
        payload: error.payload || null,
      },
    };
  }
}

function formatDate(d) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getDateRange(days) {
  // GSC data has a 2–3 day lag, so end 3 days ago to avoid empty buckets.
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return { startDate: formatDate(start), endDate: formatDate(end) };
}

function deriveInspectionUrl(siteUrl) {
  if (!siteUrl) return "";
  if (siteUrl.startsWith("sc-domain:")) {
    const host = siteUrl.slice("sc-domain:".length).trim();
    return host ? `https://${host}/` : "";
  }
  try {
    const u = new URL(siteUrl);
    u.search = "";
    u.hash = "";
    if (!u.pathname || u.pathname === "") u.pathname = "/";
    return u.toString();
  } catch {
    return siteUrl;
  }
}

async function querySearchAnalytics(token, siteUrl, body) {
  const encoded = encodeURIComponent(siteUrl);
  return safeGscRequest(
    token,
    "POST",
    `/webmasters/v3/sites/${encoded}/searchAnalytics/query`,
    body,
  );
}

function extractTotals(totals) {
  if (!totals.ok) return null;
  const row = totals.data.rows?.[0];
  if (!row) {
    return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  }
  return {
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  };
}

function buildActions(report) {
  const actions = [];

  if (!report.totals.ok) {
    actions.push(`searchAnalytics.query failed: ${report.totals.error.message}. Check GSC_SITE_URL format and that the OAuth account has access to this property.`);
    return actions;
  }

  const totals = extractTotals(report.totals);

  if (totals.impressions === 0) {
    actions.push("Zero impressions in the reporting window — site likely has no Google visibility yet. Check indexing coverage, sitemap submission, and robots.txt.");
  } else if (totals.clicks === 0) {
    actions.push("Impressions but zero clicks — review titles, meta descriptions, and SERP snippets for relevance.");
  }

  if (totals.impressions > 0 && totals.position > 20) {
    actions.push(`Avg. position is ${totals.position.toFixed(1)} — content/SEO work needed to enter top 20.`);
  }

  if (report.sitemaps.ok) {
    const feeds = report.sitemaps.data.sitemap || [];
    if (feeds.length === 0) {
      actions.push("No sitemaps registered in GSC. Submit sitemap.xml via GSC UI or the Sitemaps API.");
    } else {
      for (const feed of feeds) {
        if (Number(feed.errors) > 0) {
          actions.push(`Sitemap ${feed.path} has ${feed.errors} errors — review and re-submit.`);
        }
        if (Number(feed.warnings) > 0) {
          actions.push(`Sitemap ${feed.path} has ${feed.warnings} warnings.`);
        }
      }
    }
  } else {
    actions.push(`sitemaps.list failed: ${report.sitemaps.error.message}`);
  }

  if (report.inspection.ok) {
    const result = report.inspection.data.inspectionResult || {};
    const idx = result.indexStatusResult || {};
    const coverage = idx.coverageState || "";
    const verdict = idx.verdict || "";
    if (verdict && verdict !== "PASS" && verdict !== "NEUTRAL") {
      actions.push(`Homepage index verdict: ${verdict} (${coverage || "no coverage state"}) — investigate.`);
    }
    const mobile = result.mobileUsabilityResult?.verdict || "";
    if (mobile === "FAIL") {
      actions.push(`Mobile usability verdict: ${mobile} — fix mobile issues.`);
    } else if (mobile === "VERDICT_UNSPECIFIED") {
      actions.push("Homepage mobile usability data is unavailable in URL Inspection; do not infer a technical mobile error from this field.");
    }
  }

  if (actions.length === 0) {
    actions.push("No urgent issues were detected in the current GSC snapshot.");
  }

  return actions;
}

function createMarkdownReport(report, days) {
  const lines = [];

  lines.push(`# GSC report for ${report.siteUrl}`);
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(
    `Date range: ${report.dateRange.startDate} → ${report.dateRange.endDate} (${days} days)`,
  );
  lines.push("");

  lines.push("## Totals");
  const totals = extractTotals(report.totals);
  if (totals) {
    lines.push(`- Clicks: ${totals.clicks}`);
    lines.push(`- Impressions: ${totals.impressions}`);
    lines.push(`- CTR: ${(totals.ctr * 100).toFixed(2)}%`);
    lines.push(`- Avg. position: ${totals.position.toFixed(2)}`);
  } else {
    lines.push(`- failed: ${report.totals.error?.message || "unknown"}`);
  }
  lines.push("");

  lines.push("## Top queries");
  if (report.byQuery.ok) {
    const rows = report.byQuery.data.rows || [];
    if (rows.length === 0) {
      lines.push("- (no query data)");
    } else {
      lines.push("| # | Query | Clicks | Impressions | CTR | Position |");
      lines.push("|---|---|---:|---:|---:|---:|");
      rows.forEach((r, i) => {
        lines.push(
          `| ${i + 1} | ${r.keys[0]} | ${r.clicks} | ${r.impressions} | ${(r.ctr * 100).toFixed(2)}% | ${r.position.toFixed(1)} |`,
        );
      });
    }
  } else {
    lines.push(`- failed: ${report.byQuery.error.message}`);
  }
  lines.push("");

  lines.push("## Top pages");
  if (report.byPage.ok) {
    const rows = report.byPage.data.rows || [];
    if (rows.length === 0) {
      lines.push("- (no page data)");
    } else {
      lines.push("| # | Page | Clicks | Impressions | CTR | Position |");
      lines.push("|---|---|---:|---:|---:|---:|");
      rows.forEach((r, i) => {
        lines.push(
          `| ${i + 1} | ${r.keys[0]} | ${r.clicks} | ${r.impressions} | ${(r.ctr * 100).toFixed(2)}% | ${r.position.toFixed(1)} |`,
        );
      });
    }
  } else {
    lines.push(`- failed: ${report.byPage.error.message}`);
  }
  lines.push("");

  lines.push("## By device");
  if (report.byDevice.ok) {
    const rows = report.byDevice.data.rows || [];
    if (rows.length === 0) {
      lines.push("- (no device data)");
    } else {
      for (const r of rows) {
        lines.push(
          `- ${r.keys[0]}: clicks=${r.clicks}, impressions=${r.impressions}, pos=${r.position.toFixed(1)}`,
        );
      }
    }
  } else {
    lines.push(`- failed: ${report.byDevice.error.message}`);
  }
  lines.push("");

  lines.push("## Top pages by device");
  if (report.byPageDevice.ok) {
    const rows = report.byPageDevice.data.rows || [];
    if (rows.length === 0) {
      lines.push("- (no page/device data)");
    } else {
      lines.push("| # | Page | Device | Clicks | Impressions | CTR | Position |");
      lines.push("|---|---|---|---:|---:|---:|---:|");
      rows.forEach((r, i) => {
        lines.push(
          `| ${i + 1} | ${r.keys[0]} | ${r.keys[1]} | ${r.clicks} | ${r.impressions} | ${(r.ctr * 100).toFixed(2)}% | ${r.position.toFixed(1)} |`,
        );
      });
    }
  } else {
    lines.push(`- failed: ${report.byPageDevice.error.message}`);
  }
  lines.push("");

  lines.push("## By country");
  if (report.byCountry.ok) {
    const rows = report.byCountry.data.rows || [];
    if (rows.length === 0) {
      lines.push("- (no country data)");
    } else {
      for (const r of rows) {
        lines.push(
          `- ${r.keys[0]}: clicks=${r.clicks}, impressions=${r.impressions}`,
        );
      }
    }
  } else {
    lines.push(`- failed: ${report.byCountry.error.message}`);
  }
  lines.push("");

  lines.push("## Sitemaps");
  if (report.sitemaps.ok) {
    const feeds = report.sitemaps.data.sitemap || [];
    if (feeds.length === 0) {
      lines.push("- (none registered)");
    } else {
      for (const f of feeds) {
        lines.push(
          `- ${f.path} | type=${f.type || "?"} | lastSubmitted=${f.lastSubmitted || "n/a"} | errors=${f.errors || 0} | warnings=${f.warnings || 0}`,
        );
      }
    }
  } else {
    lines.push(`- failed: ${report.sitemaps.error.message}`);
  }
  lines.push("");

  lines.push("## URL inspection (homepage)");
  if (report.inspection.ok) {
    const r = report.inspection.data.inspectionResult || {};
    const idx = r.indexStatusResult || {};
    lines.push(`- Verdict: ${idx.verdict || "n/a"}`);
    lines.push(`- Coverage state: ${idx.coverageState || "n/a"}`);
    lines.push(`- Last crawled: ${idx.lastCrawlTime || "n/a"}`);
    lines.push(`- Indexing state: ${idx.indexingState || "n/a"}`);
    lines.push(`- Robots.txt state: ${idx.robotsTxtState || "n/a"}`);
    if (r.mobileUsabilityResult) {
      lines.push(`- Mobile usability: ${r.mobileUsabilityResult.verdict || "n/a"}`);
    }
  } else {
    lines.push(`- failed: ${report.inspection.error?.message || "skipped"}`);
  }
  lines.push("");

  lines.push("## Next actions");
  for (const action of report.actions) {
    lines.push(`- ${action}`);
  }
  lines.push("");

  return lines.join("\n");
}

function printMissingEnvHelp(config) {
  console.error("GSC config is incomplete.");
  console.error("");
  console.error(`Expected env file: ${config.envPath}`);
  console.error("Fill these variables first:");
  console.error("- GSC_CLIENT_ID");
  console.error("- GSC_CLIENT_SECRET");
  console.error("- GSC_REFRESH_TOKEN");
  console.error("- GSC_SITE_URL  (e.g. sc-domain:example.com or https://example.com/)");
  console.error("");
  console.error("OAuth onboarding: G:/mvp/centrlp/plans/seo-onboarding-oauth-gsc.md");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const config = loadConfig(args.envPath);
  if (
    !config.clientId ||
    !config.clientSecret ||
    !config.refreshToken ||
    !config.siteUrl
  ) {
    printMissingEnvHelp(config);
    process.exitCode = 1;
    return;
  }

  const accessToken = await exchangeRefreshToken(config);
  const { startDate, endDate } = getDateRange(args.days);

  const encodedSite = encodeURIComponent(config.siteUrl);

  const sitesList = await safeGscRequest(
    accessToken,
    "GET",
    "/webmasters/v3/sites",
  );

  const baseQuery = { startDate, endDate };

  const [totals, byQuery, byPage, byQueryPage, byCountry, byDevice, byPageDevice, sitemaps] = await Promise.all([
    querySearchAnalytics(accessToken, config.siteUrl, {
      ...baseQuery,
      dimensions: [],
      rowLimit: 1,
    }),
    querySearchAnalytics(accessToken, config.siteUrl, {
      ...baseQuery,
      dimensions: ["query"],
      rowLimit: 15,
    }),
    querySearchAnalytics(accessToken, config.siteUrl, {
      ...baseQuery,
      dimensions: ["page"],
      rowLimit: 15,
    }),
    querySearchAnalytics(accessToken, config.siteUrl, {
      ...baseQuery,
      dimensions: ["query", "page"],
      rowLimit: 250,
    }),
    querySearchAnalytics(accessToken, config.siteUrl, {
      ...baseQuery,
      dimensions: ["country"],
      rowLimit: 10,
    }),
    querySearchAnalytics(accessToken, config.siteUrl, {
      ...baseQuery,
      dimensions: ["device"],
      rowLimit: 3,
    }),
    querySearchAnalytics(accessToken, config.siteUrl, {
      ...baseQuery,
      dimensions: ["page", "device"],
      rowLimit: 250,
    }),
    safeGscRequest(
      accessToken,
      "GET",
      `/webmasters/v3/sites/${encodedSite}/sitemaps`,
    ),
  ]);

  let inspection = {
    ok: false,
    error: { status: 0, message: "skipped (no inspection URL)", payload: null },
  };
  const inspectionUrl = deriveInspectionUrl(config.siteUrl);
  if (inspectionUrl) {
    inspection = await safeGscRequest(
      accessToken,
      "POST",
      "/v1/urlInspection/index:inspect",
      {
        inspectionUrl,
        siteUrl: config.siteUrl,
      },
    );
  }

  const report = {
    generatedAt: new Date().toISOString(),
    siteUrl: config.siteUrl,
    dateRange: { startDate, endDate },
    sitesList,
    totals,
    byQuery,
    byPage,
    byQueryPage,
    byCountry,
    byDevice,
    byPageDevice,
    sitemaps,
    inspection,
  };

  report.actions = buildActions(report);

  const markdown = createMarkdownReport(report, args.days);

  console.log(`Site URL: ${report.siteUrl}`);
  console.log(`Date range: ${startDate} → ${endDate}`);

  const t = extractTotals(report.totals);
  if (t) {
    console.log(
      `Totals: clicks=${t.clicks}, impressions=${t.impressions}, CTR=${(t.ctr * 100).toFixed(2)}%, position=${t.position.toFixed(2)}`,
    );
  } else {
    console.log(`Totals request failed: ${report.totals.error?.message}`);
  }

  if (report.sitemaps.ok) {
    const feeds = report.sitemaps.data.sitemap || [];
    console.log(`Sitemaps registered: ${feeds.length}`);
  } else {
    console.log(`Sitemaps request failed: ${report.sitemaps.error.message}`);
  }

  if (report.inspection.ok) {
    const idx = report.inspection.data.inspectionResult?.indexStatusResult || {};
    console.log(`Homepage verdict: ${idx.verdict || "n/a"} (${idx.coverageState || "n/a"})`);
  }

  if (args.save) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(REPORT_DIR, "latest-gsc-report.json"),
      `${JSON.stringify(report, null, 2)}\n`,
      "utf8",
    );
    fs.writeFileSync(
      path.join(REPORT_DIR, "latest-gsc-report.md"),
      `${markdown}\n`,
      "utf8",
    );
    console.log(`Saved reports to ${REPORT_DIR}`);
  }

  console.log("");
  console.log(markdown);
}

main().catch((error) => {
  console.error("GSC report failed.");
  console.error(error.message || error);
  if (error.payload) {
    console.error(JSON.stringify(error.payload, null, 2));
  }
  process.exitCode = 1;
});
