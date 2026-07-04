import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const DEFAULT_ENV_PATH = path.join(ROOT_DIR, ".env.seo.local");
const REPORT_DIR = path.join(ROOT_DIR, "seo-reports");
const API_BASE = "https://api.webmaster.yandex.net/v4";
const POSTS_DIR = path.join(ROOT_DIR, "content", "posts");

function parseArgs(argv) {
  const args = { envPath: DEFAULT_ENV_PATH, save: true, help: false };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--no-save") {
      args.save = false;
    } else if (arg === "--env" && argv[i + 1]) {
      args.envPath = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  node scripts/yandex-webmaster-report.mjs
  node scripts/yandex-webmaster-report.mjs --env .env.seo.local
  node scripts/yandex-webmaster-report.mjs --no-save
`);
}

function parseEnvFile(content) {
  const result = {};
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

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
    clientId: merged.YANDEX_WEBMASTER_CLIENT_ID || "",
    token: merged.YANDEX_WEBMASTER_TOKEN || "",
    hostUrl: merged.YANDEX_WEBMASTER_HOST_URL || "",
    userId: merged.YANDEX_WEBMASTER_USER_ID || "",
    hostId: merged.YANDEX_WEBMASTER_HOST_ID || "",
    tokenExpiresAt: merged.YANDEX_WEBMASTER_TOKEN_EXPIRES_AT || "",
  };
}

function normalizeUrl(input) {
  const url = new URL(input);
  url.hash = "";
  url.search = "";
  url.pathname = "/";
  return url.toString();
}

function safeNormalizeUrl(input) {
  if (!input) return "";

  try {
    return normalizeUrl(input);
  } catch {
    return String(input).trim();
  }
}

function getHostCandidates(host) {
  const values = [
    host?.ascii_host_url,
    host?.unicode_host_url,
    host?.main_mirror?.ascii_host_url,
    host?.main_mirror?.unicode_host_url,
  ].filter(Boolean);

  return [...new Set(values.map(safeNormalizeUrl))];
}

function getExactHostCandidates(host) {
  const values = [host?.ascii_host_url, host?.unicode_host_url].filter(Boolean);
  return [...new Set(values.map(safeNormalizeUrl))];
}

function findHost(hosts, hostUrl, explicitHostId) {
  if (explicitHostId) {
    return hosts.find((host) => host.host_id === explicitHostId) || null;
  }

  const normalizedTarget = safeNormalizeUrl(hostUrl);

  const exactMatch = hosts.find((host) =>
    getExactHostCandidates(host).includes(normalizedTarget),
  );
  if (exactMatch) {
    return exactMatch;
  }

  return hosts.find((host) => getHostCandidates(host).includes(normalizedTarget)) || null;
}

function slugFromFileName(fileName) {
  return fileName.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function getLatestArticleSlug() {
  if (!fs.existsSync(POSTS_DIR)) {
    return null;
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();

  if (files.length === 0) {
    return null;
  }

  return slugFromFileName(files[files.length - 1]);
}

function runCurl(args) {
  return execFileSync("curl.exe", args, {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
}

function fetchHtml(url) {
  const raw = runCurl([
    "-sS",
    "-L",
    "-A",
    "Mozilla/5.0 (compatible; Codex SEO Check)",
    "-H",
    "Accept: text/html,application/xhtml+xml",
    "-w",
    "\n__CODEX_STATUS__:%{http_code}",
    url,
  ]);
  const [body, statusLine] = raw.split("\n__CODEX_STATUS__:");

  return {
    url,
    status: Number(statusLine || 0),
    body,
  };
}

function extractHeadSignals(html) {
  const patterns = {
    title: /<title>(.*?)<\/title>/is,
    canonical: /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    description: /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
    ogUrl: /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i,
    ogImage: /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
  };

  return Object.fromEntries(
    Object.entries(patterns).map(([key, regex]) => [
      key,
      html.match(regex)?.[1]?.replace(/\s+/g, " ").trim() || "",
    ]),
  );
}

async function getHeadChecks(baseUrl) {
  const latestArticleSlug = getLatestArticleSlug();
  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/services`,
    `${baseUrl}/blog`,
    `${baseUrl}/nastroyka-yandex-direct-tyumen`,
  ];

  if (latestArticleSlug) {
    urls.push(`${baseUrl}/blog/${latestArticleSlug}`);
  }

  const uniqueUrls = [...new Set(urls)];
  const pages = await Promise.all(uniqueUrls.map((url) => fetchHtml(url)));

  return pages.map((page) => ({
    url: page.url,
    status: page.status,
    ...extractHeadSignals(page.body),
  }));
}

async function apiRequest(token, pathname) {
  const raw = runCurl([
    "-sS",
    "-L",
    "-H",
    `Authorization: OAuth ${token}`,
    "-H",
    "Accept: application/json",
    "-w",
    "\n__CODEX_STATUS__:%{http_code}",
    `${API_BASE}${pathname}`,
  ]);
  const [rawText, statusLine] = raw.split("\n__CODEX_STATUS__:");
  const status = Number(statusLine || 0);
  let data = null;

  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    data = { raw: rawText };
  }

  if (status < 200 || status >= 300) {
    const error = new Error(
      data?.error_message || `Request failed with status ${status}`,
    );
    error.status = status;
    error.payload = data;
    throw error;
  }

  return data;
}

async function safeApiRequest(token, pathname) {
  try {
    const data = await apiRequest(token, pathname);
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

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function buildPopularQueriesPath(userId, hostId, range = {}) {
  const params = new URLSearchParams({
    order_by: "TOTAL_SHOWS",
    query_indicator: "TOTAL_SHOWS",
    limit: "20",
  });

  params.append("query_indicator", "TOTAL_CLICKS");
  params.append("query_indicator", "AVG_SHOW_POSITION");

  if (range.dateFrom) params.set("date_from", range.dateFrom);
  if (range.dateTo) params.set("date_to", range.dateTo);

  return `/user/${userId}/hosts/${encodeURIComponent(hostId)}/search-queries/popular/?${params.toString()}`;
}

async function getPopularQueries(token, userId, hostId) {
  const latest = await safeApiRequest(token, buildPopularQueriesPath(userId, hostId));
  let previous = {
    ok: false,
    error: {
      status: 0,
      message: "skipped until latest popular query range is known",
      payload: null,
    },
  };

  if (latest.ok && latest.data?.date_from && latest.data?.date_to) {
    previous = await safeApiRequest(
      token,
      buildPopularQueriesPath(userId, hostId, {
        dateFrom: addDays(latest.data.date_from, -7),
        dateTo: addDays(latest.data.date_to, -7),
      }),
    );
  }

  return { latest, previous };
}

function getIndicator(query, name) {
  const value = Number(query?.indicators?.[name]);
  return Number.isFinite(value) ? value : null;
}

function formatIndicator(value, digits = 0) {
  return Number.isFinite(value) ? value.toFixed(digits) : "n/a";
}

function comparePopularQueries(popularQueries) {
  const latestRows = popularQueries?.latest?.ok ? popularQueries.latest.data.queries || [] : [];
  const previousRows = popularQueries?.previous?.ok ? popularQueries.previous.data.queries || [] : [];
  const previousByText = new Map(
    previousRows.map((query) => [String(query.query_text || "").toLocaleLowerCase("ru-RU"), query]),
  );

  return latestRows.map((query) => {
    const key = String(query.query_text || "").toLocaleLowerCase("ru-RU");
    const previous = previousByText.get(key) || null;
    const shows = getIndicator(query, "TOTAL_SHOWS");
    const previousShows = getIndicator(previous, "TOTAL_SHOWS");
    const position = getIndicator(query, "AVG_SHOW_POSITION");
    const previousPosition = getIndicator(previous, "AVG_SHOW_POSITION");

    return {
      queryText: query.query_text || "",
      shows,
      clicks: getIndicator(query, "TOTAL_CLICKS"),
      avgShowPosition: position,
      previousShows,
      previousAvgShowPosition: previousPosition,
      showsDelta:
        Number.isFinite(shows) && Number.isFinite(previousShows) ? shows - previousShows : null,
      positionDelta:
        Number.isFinite(position) && Number.isFinite(previousPosition)
          ? position - previousPosition
          : null,
    };
  });
}

function sortProblems(problems) {
  const severityOrder = {
    FATAL: 0,
    CRITICAL: 1,
    POSSIBLE_PROBLEM: 2,
    RECOMMENDATION: 3,
  };

  return problems.sort((a, b) => {
    const left = severityOrder[a.severity] ?? 99;
    const right = severityOrder[b.severity] ?? 99;
    if (left !== right) return left - right;
    return a.code.localeCompare(b.code);
  });
}

function extractActiveDiagnostics(diagnostics) {
  const entries = Object.entries(diagnostics?.problems || {}).map(([code, value]) => ({
    code,
    severity: value?.severity || "UNKNOWN",
    state: value?.state || "UNKNOWN",
    lastStateUpdate: value?.last_state_update || "",
  }));

  return sortProblems(entries.filter((item) => item.state === "PRESENT"));
}

function getTokenHealth(tokenExpiresAt) {
  if (!tokenExpiresAt) {
    return {
      status: "unknown",
      daysLeft: null,
      note: "YANDEX_WEBMASTER_TOKEN_EXPIRES_AT is empty",
    };
  }

  const target = new Date(tokenExpiresAt);
  if (Number.isNaN(target.getTime())) {
    return {
      status: "invalid",
      daysLeft: null,
      note: "YANDEX_WEBMASTER_TOKEN_EXPIRES_AT is invalid",
    };
  }

  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return {
      status: "expired",
      daysLeft,
      note: `token expired ${Math.abs(daysLeft)} day(s) ago`,
    };
  }

  if (daysLeft <= 14) {
    return {
      status: "expiring_soon",
      daysLeft,
      note: `token expires in ${daysLeft} day(s)`,
    };
  }

  return {
    status: "ok",
    daysLeft,
    note: `token expires in ${daysLeft} day(s)`,
  };
}

function buildActions(report) {
  const actions = [];

  if (!report.verification.ok) {
    actions.push("Fix Yandex Webmaster access first: verification endpoint is unavailable.");
    return actions;
  }

  if (report.verification.data.verification_state !== "VERIFIED") {
    actions.push(
      `Confirm site rights in Yandex Webmaster. Current state: ${report.verification.data.verification_state}.`,
    );
  }

  const summaryProblems = report.summary.ok ? report.summary.data.site_problems || {} : {};
  if ((summaryProblems.FATAL || 0) > 0) {
    actions.push("There are FATAL site problems in Yandex Webmaster. Fix them first.");
  }
  if ((summaryProblems.CRITICAL || 0) > 0) {
    actions.push("There are CRITICAL site problems in Yandex Webmaster. Review them this week.");
  }

  const activeDiagnostics = report.diagnostics.ok
    ? extractActiveDiagnostics(report.diagnostics.data)
    : [];

  if (activeDiagnostics.some((item) => item.code === "NO_SITEMAPS")) {
    actions.push("Yandex reports missing Sitemap files. Recheck sitemap submission and accessibility.");
  }

  if (activeDiagnostics.some((item) => item.code === "ERROR_IN_ROBOTS_TXT")) {
    actions.push("Yandex reports an error in robots.txt. Validate robots rules and retest.");
  }

  if (activeDiagnostics.some((item) => item.code === "DOCUMENTS_MISSING_TITLE")) {
    actions.push("Many pages are missing title tags according to Yandex. Recheck route-level SEO metadata.");
  }

  if (activeDiagnostics.some((item) => item.code === "DOCUMENTS_MISSING_DESCRIPTION")) {
    actions.push("Many pages are missing meta descriptions according to Yandex. Recheck route-level SEO metadata.");
  }

  if (report.userAddedSitemaps.ok && (report.userAddedSitemaps.data.count || 0) === 0) {
    actions.push("No user-added sitemap files are registered in Yandex Webmaster.");
  }

  if (report.tokenHealth.status === "expiring_soon" || report.tokenHealth.status === "expired") {
    actions.push(`Refresh OAuth token: ${report.tokenHealth.note}.`);
  }

  if (actions.length === 0) {
    actions.push("No urgent issues were detected by the current Yandex Webmaster snapshot.");
  }

  return actions;
}

function createMarkdownReport(report) {
  const lines = [];
  const summary = report.summary.ok ? report.summary.data : null;
  const verification = report.verification.ok ? report.verification.data : null;
  const activeDiagnostics = report.diagnostics.ok
    ? extractActiveDiagnostics(report.diagnostics.data)
    : [];
  const sitemaps = report.sitemaps.ok
    ? report.sitemaps.data.sitemaps || report.sitemaps.data.user_added_sitemaps || []
    : [];
  const userAddedSitemaps = report.userAddedSitemaps.ok
    ? report.userAddedSitemaps.data.sitemaps || report.userAddedSitemaps.data.user_added_sitemaps || []
    : [];
  const indexingHistory = report.indexingHistory.ok ? report.indexingHistory.data : null;
  const inSearchHistory = report.inSearchHistory.ok ? report.inSearchHistory.data : null;
  const popularQueryRows = comparePopularQueries(report.popularQueries);

  lines.push(`# SEO report for ${report.host.hostUrl}`);
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");

  lines.push("## Summary");
  if (summary) {
    lines.push(`- Searchable pages: ${summary.searchable_pages_count ?? "n/a"}`);
    lines.push(`- Excluded pages: ${summary.excluded_pages_count ?? "n/a"}`);
    lines.push(
      `- Pages in search (latest): ${inSearchHistory?.history?.at?.(-1)?.value ?? "n/a"}`,
    );
    lines.push(
      `- Indexing HTTP 2XX (latest): ${indexingHistory?.indicators?.HTTP_2XX?.at?.(-1)?.value ?? "n/a"}`,
    );
    lines.push(
      `- Indexing HTTP 4XX (latest): ${indexingHistory?.indicators?.HTTP_4XX?.at?.(-1)?.value ?? "n/a"}`,
    );
    lines.push(`- SQI: ${summary.sqi ?? "n/a"}`);
    if (verification) {
      lines.push(`- Verification: ${verification.verification_state}`);
    }
  } else {
    lines.push(`- failed: ${report.summary.error.message}`);
  }
  lines.push("");

  lines.push("## Popular Search Queries");
  if (report.popularQueries?.latest?.ok) {
    const latest = report.popularQueries.latest.data;
    lines.push(`- Latest range: ${latest.date_from}..${latest.date_to}`);
    if (report.popularQueries.previous?.ok) {
      const previous = report.popularQueries.previous.data;
      lines.push(`- Previous range: ${previous.date_from}..${previous.date_to}`);
    }

    if (popularQueryRows.length === 0) {
      lines.push("- no popular query rows returned");
    } else {
      for (const query of popularQueryRows) {
        const showsDelta =
          query.showsDelta === null ? "n/a" : query.showsDelta > 0 ? `+${query.showsDelta}` : `${query.showsDelta}`;
        const positionDelta =
          query.positionDelta === null
            ? "n/a"
            : query.positionDelta < 0
              ? `${query.positionDelta.toFixed(2)} better`
              : query.positionDelta > 0
                ? `+${query.positionDelta.toFixed(2)} worse`
                : "0.00";

        lines.push(
          `- ${query.queryText}: shows=${formatIndicator(query.shows)}, clicks=${formatIndicator(query.clicks)}, avg_position=${formatIndicator(query.avgShowPosition, 2)}, shows_delta=${showsDelta}, position_delta=${positionDelta}`,
        );
      }
    }
  } else {
    lines.push(`- failed: ${report.popularQueries?.latest?.error?.message || "not requested"}`);
  }
  lines.push("");

  lines.push("## Active Diagnostics");
  if (report.diagnostics.ok) {
    if (activeDiagnostics.length === 0) {
      lines.push("- no active PRESENT diagnostics");
    } else {
      for (const item of activeDiagnostics) {
        lines.push(`- [${item.severity}] ${item.code} (${item.lastStateUpdate || "n/a"})`);
      }
    }
  } else {
    lines.push(`- failed: ${report.diagnostics.error.message}`);
  }
  lines.push("");

  lines.push("## Sitemaps");
  if (report.sitemaps.ok) {
    if (sitemaps.length === 0) {
      lines.push("- Crawled sitemaps: none");
    } else {
      for (const item of sitemaps) {
        lines.push(
          `- Crawled: ${item.sitemap_url} | urls=${item.urls_count ?? "n/a"} | errors=${item.errors_count ?? "n/a"}`,
        );
      }
    }
  } else {
    lines.push(`- failed: ${report.sitemaps.error.message}`);
  }
  if (report.userAddedSitemaps.ok) {
    if (userAddedSitemaps.length === 0) {
      lines.push("- User-added sitemaps: none");
    } else {
      for (const item of userAddedSitemaps) {
        lines.push(`- User-added: ${item.sitemap_url}`);
      }
    }
  } else {
    lines.push(`- failed to read user-added sitemaps: ${report.userAddedSitemaps.error.message}`);
  }
  lines.push("");

  lines.push("## Sample route head checks");
  lines.push("");
  for (const item of report.headChecks) {
    lines.push(`### ${item.url}`);
    lines.push(`- Status: ${item.status}`);
    lines.push(`- Title: ${item.title || "(missing)"}`);
    lines.push(`- Canonical: ${item.canonical || "(missing)"}`);
    lines.push(`- Description: ${item.description || "(missing)"}`);
    lines.push(`- OG URL: ${item.ogUrl || "(missing)"}`);
    lines.push(`- OG Image: ${item.ogImage || "(missing)"}`);
    lines.push("");
  }

  lines.push("## Next Actions");
  for (const action of report.actions) {
    lines.push(`- ${action}`);
  }
  lines.push("");

  lines.push("## Paste Back Into .env.seo.local");
  lines.push("```env");
  lines.push(`YANDEX_WEBMASTER_USER_ID=${report.host.userId}`);
  lines.push(`YANDEX_WEBMASTER_HOST_ID=${report.host.hostId}`);
  lines.push("```");
  lines.push("");

  return lines.join("\n");
}

function printMissingEnvHelp(config) {
  console.error("Yandex Webmaster config is incomplete.");
  console.error("");
  console.error(`Expected env file: ${config.envPath}`);
  console.error("Fill these variables first:");
  console.error("- YANDEX_WEBMASTER_TOKEN");
  console.error("- YANDEX_WEBMASTER_HOST_URL");
  console.error("");
  console.error("Template:");
  console.error(`- ${path.join(ROOT_DIR, ".env.seo.local.example")}`);
  console.error("Runbook:");
  console.error(`- ${path.join(ROOT_DIR, "SEO_RUNBOOK.md")}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const config = loadConfig(args.envPath);
  if (!config.token || !config.hostUrl) {
    printMissingEnvHelp(config);
    process.exitCode = 1;
    return;
  }

  const user = await apiRequest(config.token, "/user");
  const userId = config.userId || String(user.user_id);
  const hostsResponse = await apiRequest(config.token, `/user/${userId}/hosts`);
  const hosts = hostsResponse.hosts || [];
  const host = findHost(hosts, config.hostUrl, config.hostId);

  if (!host) {
    const availableHosts = hosts
      .flatMap((item) => getHostCandidates(item).map((url) => `- ${url} -> ${item.host_id}`))
      .join("\n");

    throw new Error(
      [
        `Host was not found in Yandex Webmaster for ${config.hostUrl}.`,
        "Available hosts:",
        availableHosts || "- none",
      ].join("\n"),
    );
  }

  const hostId = host.host_id;
  const [summary, diagnostics, verification, sitemaps, userAddedSitemaps] = await Promise.all([
    safeApiRequest(config.token, `/user/${userId}/hosts/${encodeURIComponent(hostId)}/summary`),
    safeApiRequest(config.token, `/user/${userId}/hosts/${encodeURIComponent(hostId)}/diagnostics`),
    safeApiRequest(config.token, `/user/${userId}/hosts/${encodeURIComponent(hostId)}/verification`),
    safeApiRequest(
      config.token,
      `/user/${userId}/hosts/${encodeURIComponent(hostId)}/sitemaps`,
    ),
    safeApiRequest(
      config.token,
      `/user/${userId}/hosts/${encodeURIComponent(hostId)}/user-added-sitemaps`,
    ),
  ]);
  const [indexingHistory, inSearchHistory, headChecks, popularQueries] = await Promise.all([
    safeApiRequest(config.token, `/user/${userId}/hosts/${encodeURIComponent(hostId)}/indexing/history`),
    safeApiRequest(
      config.token,
      `/user/${userId}/hosts/${encodeURIComponent(hostId)}/search-urls/in-search/history`,
    ),
    getHeadChecks(reportHostUrl(config.hostUrl)),
    getPopularQueries(config.token, userId, hostId),
  ]);

  const report = {
    generatedAt: new Date().toISOString(),
    host: {
      hostUrl: reportHostUrl(config.hostUrl),
      userId,
      hostId,
      asciiHostUrl: host.ascii_host_url || "",
      unicodeHostUrl: host.unicode_host_url || "",
      verified: Boolean(host.verified),
    },
    tokenHealth: getTokenHealth(config.tokenExpiresAt),
    summary,
    diagnostics,
    verification,
    sitemaps,
    userAddedSitemaps,
    indexingHistory,
    inSearchHistory,
    popularQueries,
    headChecks,
  };

  report.actions = buildActions(report);

  const markdown = createMarkdownReport(report);

  console.log(`Host URL: ${report.host.hostUrl}`);
  console.log(`user_id: ${report.host.userId}`);
  console.log(`host_id: ${report.host.hostId}`);
  console.log(`Token health: ${report.tokenHealth.note}`);

  if (report.summary.ok) {
    console.log(
      `Summary: SQI=${report.summary.data.sqi}, searchable=${report.summary.data.searchable_pages_count}, excluded=${report.summary.data.excluded_pages_count}`,
    );
  } else {
    console.log(`Summary request failed: ${report.summary.error.message}`);
  }

  if (report.verification.ok) {
    console.log(`Verification: ${report.verification.data.verification_state}`);
  } else {
    console.log(`Verification request failed: ${report.verification.error.message}`);
  }

  if (report.diagnostics.ok) {
    const activeDiagnostics = extractActiveDiagnostics(report.diagnostics.data);
    console.log(`Active diagnostics: ${activeDiagnostics.length}`);
  } else {
    console.log(`Diagnostics request failed: ${report.diagnostics.error.message}`);
  }

  if (report.popularQueries.latest.ok) {
    console.log(
      `Popular queries: ${report.popularQueries.latest.data.count || 0} (${report.popularQueries.latest.data.date_from}..${report.popularQueries.latest.data.date_to})`,
    );
  } else {
    console.log(`Popular queries request failed: ${report.popularQueries.latest.error.message}`);
  }

  if (args.save) {
    fs.mkdirSync(REPORT_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(REPORT_DIR, "latest-yandex-webmaster-report.json"),
      `${JSON.stringify(report, null, 2)}\n`,
      "utf8",
    );
    fs.writeFileSync(
      path.join(REPORT_DIR, "latest-yandex-webmaster-report.md"),
      `${markdown}\n`,
      "utf8",
    );
    console.log(`Saved reports to ${REPORT_DIR}`);
  }

  console.log("");
  console.log(markdown);
}

function reportHostUrl(input) {
  return safeNormalizeUrl(input).replace(/\/$/, "");
}

main().catch((error) => {
  console.error("Yandex Webmaster report failed.");
  console.error(error.message || error);
  process.exitCode = 1;
});
