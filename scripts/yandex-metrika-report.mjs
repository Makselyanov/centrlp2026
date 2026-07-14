import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENV_PATH = path.join(ROOT_DIR, ".env.seo.local");
const REPORT_DIR = path.join(ROOT_DIR, "seo-reports");
const EXPECTED_HOST = "centrlp.ru";

function parseEnv(content) {
  return Object.fromEntries(content.split(/\r?\n/).flatMap((raw) => {
    const line = raw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) return [];
    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^(['"])(.*)\1$/, "$2");
    return [[key, value]];
  }));
}

function config() {
  const file = fs.existsSync(ENV_PATH) ? parseEnv(fs.readFileSync(ENV_PATH, "utf8")) : {};
  const env = { ...file, ...process.env };
  return {
    token: env.YANDEX_METRIKA_TOKEN || "",
    counterId: env.YANDEX_METRIKA_COUNTER_ID || "50135101",
  };
}

async function api(token, url) {
  const response = await fetch(url, {
    headers: { Authorization: `OAuth ${token}`, Accept: "application/json" },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = body?.errors?.[0]?.message || body?.message || `HTTP ${response.status}`;
    throw new Error(`${message} (${response.status})`);
  }
  return body;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function assertCounter(counter) {
  const hosts = [counter.site, ...(counter.mirrors || [])]
    .filter(Boolean)
    .map((value) => String(value).replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase());
  if (!hosts.includes(EXPECTED_HOST) && !hosts.includes(`www.${EXPECTED_HOST}`)) {
    throw new Error(`Счётчик ${counter.id} относится не к ${EXPECTED_HOST}: ${hosts.join(", ") || "сайт не указан"}`);
  }
}

function markdown(report) {
  const totals = report.traffic.totals;
  return `# Яндекс Метрика: CentrLP\n\n` +
    `Сформирован: ${report.generatedAt}\n\n` +
    `Период: ${report.period.from} — ${report.period.to}\n\n` +
    `- Счётчик: ${report.counter.id} (${report.counter.name})\n` +
    `- Визиты: ${totals.visits}\n` +
    `- Посетители: ${totals.users}\n` +
    `- Отказы: ${totals.bounceRate}%\n` +
    `- Цели: ${report.goals.length}\n\n` +
    `## Источники\n\n` +
    report.traffic.sources.map((row) => `- ${row.source}: ${row.visits} визитов, ${row.users} посетителей`).join("\n") + "\n\n" +
    `## Цели\n\n` +
    (report.goals.length ? report.goals.map((goal) => `- ${goal.id}: ${goal.name} (${goal.type})`).join("\n") : "Цели не настроены.") + "\n";
}

async function main() {
  const { token, counterId } = config();
  if (!token) {
    throw new Error("Нет YANDEX_METRIKA_TOKEN в .env.seo.local. Нужен OAuth-токен с read-only доступом к счётчику CentrLP; токены других проектов использовать нельзя.");
  }

  const counterData = await api(token, `https://api-metrika.yandex.net/management/v1/counter/${encodeURIComponent(counterId)}`);
  const counter = counterData.counter;
  assertCounter(counter);

  const goalsData = await api(token, `https://api-metrika.yandex.net/management/v1/counter/${encodeURIComponent(counterId)}/goals`);
  const to = new Date();
  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - 29);
  const params = new URLSearchParams({
    ids: counterId,
    date1: isoDate(from),
    date2: isoDate(to),
    metrics: "ym:s:visits,ym:s:users,ym:s:bounceRate",
    dimensions: "ym:s:lastTrafficSource",
    sort: "-ym:s:visits",
    limit: "20",
    accuracy: "full",
  });
  const stats = await api(token, `https://api-metrika.yandex.net/stat/v1/data?${params}`);
  const report = {
    generatedAt: new Date().toISOString(),
    period: { from: isoDate(from), to: isoDate(to) },
    counter: { id: counter.id, name: counter.name, site: counter.site, permission: counter.permission },
    traffic: {
      totals: { visits: stats.totals?.[0] || 0, users: stats.totals?.[1] || 0, bounceRate: stats.totals?.[2] || 0 },
      sources: (stats.data || []).map((row) => ({ source: row.dimensions?.[0]?.name || "Не определён", visits: row.metrics?.[0] || 0, users: row.metrics?.[1] || 0, bounceRate: row.metrics?.[2] || 0 })),
    },
    goals: (goalsData.goals || []).map(({ id, name, type }) => ({ id, name, type })),
  };

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(path.join(REPORT_DIR, "latest-metrika.json"), `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(path.join(REPORT_DIR, "latest-metrika.md"), markdown(report));
  console.log(markdown(report));
}

main().catch((error) => {
  console.error(`Metrika report failed: ${error.message}`);
  process.exitCode = 1;
});
