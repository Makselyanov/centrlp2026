// CentrLP lead mailer — Express + nodemailer over Yandex SMTP.
// Data path: browser → this service (RF VPS) → SMTP Яндекс → 1@centrlp.ru.
// No foreign hops → compliant with ФЗ-242 localization.
//
// Env (.env.mailer.local in parent of this dir, or process env on server):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO, LEAD_FROM, PORT

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to load env from a few candidate locations so the service works
// both in dev (local) and in prod (/var/www/centrlp/.env.mailer.local).
for (const candidate of [
  path.join(__dirname, ".env.mailer.local"),
  path.join(__dirname, "..", "..", ".env.mailer.local"),
  "/var/www/centrlp/.env.mailer.local",
]) {
  if (fs.existsSync(candidate)) {
    dotenv.config({ path: candidate });
    break;
  }
}

const {
  SMTP_HOST = "smtp.yandex.ru",
  SMTP_PORT = "465",
  SMTP_USER,
  SMTP_PASS,
  LEAD_TO,
  LEAD_FROM,
  PORT = "3021",
  LEAD_LOG_RETENTION_DAYS = "183",
  LEAD_LOG_DIR = "",
  MAILER_JSON_TRANSPORT = "0",
  SMTP_ENABLED = "1",
  CRM_WEBHOOK_URL = "https://centrlp.centrlp.ru/api/webhooks/site-form",
  CRM_TIMEOUT_MS = "8000",
  MAX_BOT_TOKEN = "",
  MAX_RECIPIENT_USER_ID = "6382431",
  MAX_API_BASE = "https://platform-api.max.ru",
} = process.env;

const smtpEnabled = SMTP_ENABLED !== "0";

if (smtpEnabled && (!SMTP_USER || !SMTP_PASS || !LEAD_TO)) {
  console.error("[mailer] missing SMTP_USER / SMTP_PASS / LEAD_TO in env");
  process.exit(1);
}

let smtpReady = !smtpEnabled || MAILER_JSON_TRANSPORT === "1";
const transporter = smtpEnabled
  ? nodemailer.createTransport(
      MAILER_JSON_TRANSPORT === "1"
        ? { jsonTransport: true }
        : {
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: Number(SMTP_PORT) === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          },
    )
  : null;

// Verify SMTP connection at startup so failures are loud
if (transporter && typeof transporter.verify === "function") {
  transporter.verify((err) => {
    smtpReady = !err;
    if (err) console.error("[mailer] SMTP verify failed:", err.message);
    else console.log("[mailer] SMTP ready (" + SMTP_HOST + ":" + SMTP_PORT + ")");
  });
}

const app = express();
app.set("trust proxy", "loopback"); // we sit behind nginx
app.use(express.json({ limit: "16kb" }));

// Simple in-memory rate limit: max 5 requests per IP per 60s.
// For a small lead form this is enough; proper distributed limits would live in nginx.
const bucket = new Map();
function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const limit = 5;
  const entry = bucket.get(ip) || { count: 0, reset: now + windowMs };
  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + windowMs;
  }
  entry.count += 1;
  bucket.set(ip, entry);
  // Opportunistic cleanup
  if (bucket.size > 5000) bucket.clear();
  return entry.count <= limit;
}

// Log file — JSON lines for audit trail, pruned to match the public retention term.
const LOG_DIR = LEAD_LOG_DIR || path.join(__dirname, "logs");
fs.mkdirSync(LOG_DIR, { recursive: true });
const LOG_FILE = path.join(LOG_DIR, "leads.jsonl");
const EVENT_LOG_FILE = path.join(LOG_DIR, "lead-events.jsonl");
const RECEIPT_DIR = path.join(LOG_DIR, "receipts");
fs.mkdirSync(RECEIPT_DIR, { recursive: true });
const LEAD_LOG_RETENTION_MS =
  Math.max(Number(LEAD_LOG_RETENTION_DAYS) || 183, 1) * 24 * 60 * 60 * 1000;

function logLead(entry) {
  try {
    fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n", "utf8");
    return true;
  } catch (e) {
    console.error("[mailer] log write failed:", e.message);
    return false;
  }
}

function logLeadEvent(entry) {
  try {
    fs.appendFileSync(EVENT_LOG_FILE, JSON.stringify(entry) + "\n", "utf8");
  } catch (e) {
    console.error("[mailer] event log write failed:", e.message);
  }
}

function pruneLeadLog() {
  try {
    const cutoff = Date.now() - LEAD_LOG_RETENTION_MS;
    for (const file of [LOG_FILE, EVENT_LOG_FILE]) {
      if (!fs.existsSync(file)) continue;

      const lines = fs.readFileSync(file, "utf8").split("\n");
      const kept = lines.filter((line) => {
        if (!line.trim()) return false;
        try {
          const entry = JSON.parse(line);
          const receivedAt = new Date(entry.received_at || 0).getTime();
          return Number.isFinite(receivedAt) && receivedAt >= cutoff;
        } catch {
          return true;
        }
      });

      fs.writeFileSync(file, kept.length ? kept.join("\n") + "\n" : "", "utf8");
    }
  } catch (e) {
    console.error("[mailer] log prune failed:", e.message);
  }
}

pruneLeadLog();
setInterval(pruneLeadLog, 24 * 60 * 60 * 1000).unref();

function esc(v) {
  // Minimal HTML escape for values embedded into the email body
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(lead) {
  const rows = [
    ["Имя", lead.name],
    ["Телефон", lead.phone],
    ["Бизнес / ниша", lead.business],
    ["Город", lead.city],
    ["Что важнее сейчас", lead.goal],
    ["Ссылка", lead.link],
    ["Комментарий", lead.comment],
    ["Страница", lead.page_path],
    ["URL", lead.page_url],
    ["Источник", lead.lead_source],
    ["ID отправки", lead.lead_submission_id],
    ["Квитанция", lead.receipt_id],
    ["Статус доставки", lead.delivery_status],
    ["UTM source", lead.utm_source],
    ["UTM medium", lead.utm_medium],
    ["UTM campaign", lead.utm_campaign],
    ["Согласие ПДн", lead.consent_version],
    ["Политика ПДн", lead.privacy_version],
    ["Политика cookie", lead.cookies_version],
    ["IP", lead.ip],
    ["User-Agent", lead.user_agent],
    ["Время (UTC)", lead.received_at],
  ];
  const html =
    "<h2>Новая заявка CentrLP</h2>" +
    "<table cellpadding=6 cellspacing=0 border=0 style=\"border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px\">" +
    rows
      .filter(([, v]) => v != null && String(v).trim() !== "")
      .map(
        ([k, v]) =>
          `<tr><td style="border-bottom:1px solid #eee;color:#666;white-space:nowrap"><b>${esc(
            k,
          )}</b></td><td style="border-bottom:1px solid #eee">${esc(v).replace(
            /\n/g,
            "<br>",
          )}</td></tr>`,
      )
      .join("") +
    "</table>";
  return html;
}

const METRICS_MAX_BYTES = 2 * 1024 * 1024;
const deliveredReceiptCache = new Map();
const pendingDeliveries = new Map();
const pendingNotifications = new Map();
const pendingCrmDeliveries = new Map();
const pendingMaxDeliveries = new Map();
let crmReady = Boolean(CRM_WEBHOOK_URL);
let maxReady = Boolean(MAX_BOT_TOKEN && MAX_RECIPIENT_USER_ID);

function receiptFilePath(leadSubmissionId) {
  return path.join(RECEIPT_DIR, `${leadSubmissionId}.json`);
}

function persistReceipt(lead) {
  const target = receiptFilePath(lead.lead_submission_id);
  const temporary = `${target}.${process.pid}.${crypto.randomUUID()}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(lead) + "\n", "utf8");
  fs.renameSync(temporary, target);
  deliveredReceiptCache.set(lead.lead_submission_id, lead);
  return lead;
}

function toPublicReceipt(lead, duplicate = false) {
  return {
    ok: true,
    accepted: true,
    delivery_status: lead.delivery_status,
    notification_status: lead.notification_status || "sent",
    crm_status: lead.crm_status || "disabled",
    max_status: lead.max_status || "disabled",
    lead_submission_id: lead.lead_submission_id,
    receipt_id: lead.receipt_id,
    received_at: lead.received_at,
    ...(duplicate ? { duplicate: true } : {}),
  };
}

function loadDeliveredReceipts() {
  for (const file of fs.readdirSync(RECEIPT_DIR, { withFileTypes: true })) {
    if (!file.isFile() || !file.name.endsWith(".json")) continue;
    try {
      const lead = JSON.parse(fs.readFileSync(path.join(RECEIPT_DIR, file.name), "utf8"));
      if (lead.lead_submission_id && lead.receipt_id && ["stored", "email_delivered"].includes(lead.delivery_status)) {
        deliveredReceiptCache.set(lead.lead_submission_id, lead);
      }
    } catch {
      console.error(`[mailer] invalid receipt file: ${file.name}`);
    }
  }

  if (!fs.existsSync(LOG_FILE)) return;
  for (const line of fs.readFileSync(LOG_FILE, "utf8").split("\n")) {
    if (!line.trim()) continue;
    try {
      const lead = JSON.parse(line);
      if (
        lead.lead_submission_id &&
        lead.receipt_id &&
        lead.delivery_status === "email_delivered" &&
        !deliveredReceiptCache.has(lead.lead_submission_id)
      ) {
        deliveredReceiptCache.set(lead.lead_submission_id, {
          ...lead,
          notification_status: "sent",
        });
      }
    } catch {
      // Metrics report surfaces malformed rows; startup must remain available.
    }
  }
}

loadDeliveredReceipts();

async function notifyLead(storedLead) {
  if (storedLead.notification_status === "sent") return storedLead;
  if (!smtpEnabled) {
    return persistReceipt({ ...storedLead, notification_status: "disabled" });
  }

  let notification = pendingNotifications.get(storedLead.lead_submission_id);
  if (!notification) {
    notification = (async () => {
      let updatedLead;
      try {
        await transporter.sendMail({
          from: `"CentrLP site" <${LEAD_FROM || SMTP_USER}>`,
          to: LEAD_TO,
          subject: `CentrLP lead: ${storedLead.name} (${storedLead.phone}) - ${storedLead.page_path || "/"}`,
          html: renderEmail(storedLead),
        });
        smtpReady = true;
        updatedLead = {
          ...storedLead,
          notification_status: "sent",
          notified_at: new Date().toISOString(),
        };
      } catch (err) {
        smtpReady = false;
        console.error("[mailer] notification failed:", err.message);
        updatedLead = {
          ...storedLead,
          notification_status: "failed",
          notification_failed_at: new Date().toISOString(),
          notification_error: String(err.code || err.responseCode || "smtp_error").slice(0, 120),
        };
      }
      return persistReceipt(updatedLead);
    })();
    pendingNotifications.set(storedLead.lead_submission_id, notification);
  }

  try {
    return await notification;
  } finally {
    pendingNotifications.delete(storedLead.lead_submission_id);
  }
}

async function deliverLeadToCrm(storedLead) {
  if (["sent", "skipped"].includes(storedLead.crm_status)) return storedLead;
  if (!CRM_WEBHOOK_URL) return persistReceipt({ ...storedLead, crm_status: "disabled" });
  if (storedLead.utm_source === "codex_smoke") {
    return persistReceipt({ ...storedLead, crm_status: "skipped" });
  }

  let delivery = pendingCrmDeliveries.get(storedLead.lead_submission_id);
  if (!delivery) {
    delivery = (async () => {
      let updatedLead;
      try {
        const response = await fetch(CRM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(Math.max(Number(CRM_TIMEOUT_MS) || 8000, 1000)),
          body: JSON.stringify({
            lead_submission_id: storedLead.lead_submission_id,
            name: storedLead.name,
            phone: storedLead.phone,
            comment: storedLead.comment,
            source: storedLead.lead_source || "centrlp.ru",
            page_url: storedLead.page_url,
            city: storedLead.city,
            utm_source: storedLead.utm_source,
            utm_medium: storedLead.utm_medium,
            utm_campaign: storedLead.utm_campaign,
            utm_content: storedLead.utm_content,
            utm_term: storedLead.utm_term,
            privacyAccepted: storedLead.privacy_accepted,
            consent_version: storedLead.consent_version,
            privacy_version: storedLead.privacy_version,
            cookies_version: storedLead.cookies_version,
          }),
        });
        const result = await response.json().catch(() => null);
        if (
          !response.ok ||
          result?.status !== "ok" ||
          result?.lead_submission_id !== storedLead.lead_submission_id ||
          !Number.isInteger(result?.deal_id)
        ) {
          throw new Error(`crm_http_${response.status}`);
        }
        crmReady = true;
        updatedLead = {
          ...storedLead,
          crm_status: "sent",
          crm_deal_id: result.deal_id,
          crm_deduplicated: result.deduplicated === true,
          crm_delivered_at: new Date().toISOString(),
        };
      } catch (err) {
        crmReady = false;
        console.error("[mailer] CRM delivery failed:", err.message);
        updatedLead = {
          ...storedLead,
          crm_status: "failed",
          crm_failed_at: new Date().toISOString(),
          crm_error: String(err.name || err.code || "crm_error").slice(0, 120),
        };
      }
      return persistReceipt(updatedLead);
    })();
    pendingCrmDeliveries.set(storedLead.lead_submission_id, delivery);
  }

  try {
    return await delivery;
  } finally {
    pendingCrmDeliveries.delete(storedLead.lead_submission_id);
  }
}

function renderMaxNotification(lead) {
  return [
    "Новая заявка CentrLP",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    lead.business ? `Бизнес: ${lead.business}` : "",
    lead.city ? `Город: ${lead.city}` : "",
    lead.goal ? `Задача: ${lead.goal}` : "",
    lead.comment ? `Комментарий: ${lead.comment}` : "",
    `Страница: ${lead.page_path || "/"}`,
    `Источник: ${lead.utm_source || "direct"}`,
    `CRM: ${lead.crm_deal_id ? `сделка ${lead.crm_deal_id}` : lead.crm_status}`,
    `Квитанция: ${lead.receipt_id}`,
  ].filter(Boolean).join("\n").slice(0, 3900);
}

async function deliverLeadToMax(storedLead) {
  if (["sent", "skipped", "disabled"].includes(storedLead.max_status)) return storedLead;
  if (!MAX_BOT_TOKEN || !MAX_RECIPIENT_USER_ID) {
    return persistReceipt({ ...storedLead, max_status: "disabled" });
  }
  if (storedLead.utm_source === "codex_smoke") {
    return persistReceipt({ ...storedLead, max_status: "skipped" });
  }

  let delivery = pendingMaxDeliveries.get(storedLead.lead_submission_id);
  if (!delivery) {
    delivery = (async () => {
      let updatedLead;
      try {
        const url = new URL("/messages", MAX_API_BASE);
        url.searchParams.set("user_id", MAX_RECIPIENT_USER_ID);
        url.searchParams.set("disable_link_preview", "true");
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: MAX_BOT_TOKEN,
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(8000),
          body: JSON.stringify({ text: renderMaxNotification(storedLead), notify: true }),
        });
        if (!response.ok) throw new Error(`max_http_${response.status}`);
        maxReady = true;
        updatedLead = {
          ...storedLead,
          max_status: "sent",
          max_delivered_at: new Date().toISOString(),
        };
      } catch (err) {
        maxReady = false;
        console.error("[mailer] MAX delivery failed:", err.message);
        updatedLead = {
          ...storedLead,
          max_status: "failed",
          max_failed_at: new Date().toISOString(),
          max_error: String(err.name || err.code || "max_error").slice(0, 120),
        };
      }
      return persistReceipt(updatedLead);
    })();
    pendingMaxDeliveries.set(storedLead.lead_submission_id, delivery);
  }

  try {
    return await delivery;
  } finally {
    pendingMaxDeliveries.delete(storedLead.lead_submission_id);
  }
}

setInterval(() => {
  for (const lead of deliveredReceiptCache.values()) {
    if (lead.notification_status !== "sent") void notifyLead(lead);
    if (["pending", "failed"].includes(lead.crm_status)) void deliverLeadToCrm(lead);
    if (["pending", "failed"].includes(lead.max_status)) void deliverLeadToMax(lead);
  }
}, 10 * 60 * 1000).unref();

function normalizeMetricValue(value, fallback = "unknown") {
  const normalized = String(value || "")
    .trim()
    .slice(0, 160)
    .replace(/[^a-zA-Z0-9а-яА-ЯёЁ/_:.-]/g, "")
    .replace(/\/{2,}/g, "/");
  return normalized || fallback;
}

function normalizePathMetric(value) {
  const raw = String(value || "").trim();
  try {
    const parsed = raw.startsWith("http") ? new URL(raw) : new URL(raw || "/", "https://centrlp.ru");
    return normalizeMetricValue(parsed.pathname || "/", "/");
  } catch {
    return normalizeMetricValue(raw.split("?")[0] || "/", "/");
  }
}

function summarizeCounts(map, limit = 10, minVisibleCount = 3) {
  const visible = [];
  let other = 0;

  for (const [key, count] of map.entries()) {
    if (count < minVisibleCount) {
      other += count;
    } else {
      visible.push({ value: key, count });
    }
  }

  visible.sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  const result = visible.slice(0, limit);
  if (other > 0) result.push({ value: "other", count: other });
  return result;
}

function readLeadMetrics() {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const totals = {
    ok: true,
    service: "centrlp-mailer",
    retention_days: Math.max(Number(LEAD_LOG_RETENTION_DAYS) || 183, 1),
    log_exists: fs.existsSync(LOG_FILE),
    logged_total: 0,
    total: 0,
    today: 0,
    last_7_days: 0,
    last_30_days: 0,
    last_received_at: null,
    last_received_age_minutes: null,
    by_page_path_30d: [],
    by_lead_source_30d: [],
    events_30d: 0,
    synthetic_events_30d: 0,
    synthetic_leads_30d: 0,
    confirmed_leads_30d: 0,
    crm_confirmed_leads_30d: 0,
    crm_failures_30d: 0,
    max_notifications_30d: 0,
    max_failures_30d: 0,
    notification_failures_30d: 0,
    by_event_30d: [],
    by_event_page_30d: [],
    by_utm_source_30d: [],
    parse_errors: 0,
    event_parse_errors: 0,
    truncated: false,
    events_truncated: false,
  };

  if (!totals.log_exists && !fs.existsSync(EVENT_LOG_FILE)) return totals;

  function readTail(file, truncatedKey) {
    if (!fs.existsSync(file)) return "";
    const stat = fs.statSync(file);
    if (stat.size <= METRICS_MAX_BYTES) return fs.readFileSync(file, "utf8");

    const fd = fs.openSync(file, "r");
    const buffer = Buffer.alloc(METRICS_MAX_BYTES);
    fs.readSync(fd, buffer, 0, METRICS_MAX_BYTES, stat.size - METRICS_MAX_BYTES);
    fs.closeSync(fd);
    totals[truncatedKey] = true;
    const content = buffer.toString("utf8");
    return content.slice(content.indexOf("\n") + 1);
  }

  const content = readTail(LOG_FILE, "truncated");
  const pageCounts = new Map();
  const sourceCounts = new Map();
  const today = new Date().toISOString().slice(0, 10);
  let lastTime = 0;

  for (const line of content.split("\n")) {
    if (!line.trim()) continue;

    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      totals.parse_errors += 1;
      continue;
    }

    const currentEntry = deliveredReceiptCache.get(entry.lead_submission_id) || entry;
    const receivedAt = new Date(currentEntry.received_at || 0).getTime();
    if (!Number.isFinite(receivedAt)) continue;

    totals.logged_total += 1;
    const syntheticLead = normalizeMetricValue(currentEntry.utm_source || "direct", "direct") === "codex_smoke";
    if (syntheticLead) {
      if (now - receivedAt <= 30 * dayMs) totals.synthetic_leads_30d += 1;
      continue;
    }

    totals.total += 1;
    if (receivedAt > lastTime) {
      lastTime = receivedAt;
      totals.last_received_at = new Date(receivedAt).toISOString();
    }

    if (String(currentEntry.received_at || "").slice(0, 10) === today) totals.today += 1;
    if (now - receivedAt <= 7 * dayMs) totals.last_7_days += 1;
    if (now - receivedAt <= 30 * dayMs) {
      totals.last_30_days += 1;
      if (["stored", "email_delivered"].includes(currentEntry.delivery_status) && currentEntry.receipt_id) {
        totals.confirmed_leads_30d += 1;
      }
      if (currentEntry.crm_status === "sent" && currentEntry.crm_deal_id) totals.crm_confirmed_leads_30d += 1;
      if (currentEntry.crm_status === "failed") totals.crm_failures_30d += 1;
      if (currentEntry.max_status === "sent") totals.max_notifications_30d += 1;
      if (currentEntry.max_status === "failed") totals.max_failures_30d += 1;
      if (currentEntry.notification_status === "failed") totals.notification_failures_30d += 1;

      const pagePath = normalizePathMetric(currentEntry.page_path || currentEntry.lead_source || "/");
      pageCounts.set(pagePath, (pageCounts.get(pagePath) || 0) + 1);

      const source = normalizeMetricValue(currentEntry.lead_source || "centrlp.ru", "centrlp.ru");
      sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
    }
  }

  if (lastTime > 0) {
    totals.last_received_age_minutes = Math.max(0, Math.round((now - lastTime) / 60000));
  }

  totals.by_page_path_30d = summarizeCounts(pageCounts);
  totals.by_lead_source_30d = summarizeCounts(sourceCounts);

  const eventCounts = new Map();
  const eventPageCounts = new Map();
  const utmSourceCounts = new Map();
  const eventContent = readTail(EVENT_LOG_FILE, "events_truncated");

  for (const line of eventContent.split("\n")) {
    if (!line.trim()) continue;

    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      totals.event_parse_errors += 1;
      continue;
    }

    const receivedAt = new Date(entry.received_at || 0).getTime();
    if (!Number.isFinite(receivedAt) || now - receivedAt > 30 * dayMs) continue;

    const utmSource = normalizeMetricValue(entry.utm_source || "direct", "direct");
    if (utmSource === "codex_smoke") {
      totals.synthetic_events_30d += 1;
      continue;
    }

    totals.events_30d += 1;

    const event = normalizeMetricValue(entry.event || "unknown", "unknown");
    const pagePath = normalizePathMetric(entry.path || entry.page_url || "/");

    eventCounts.set(event, (eventCounts.get(event) || 0) + 1);
    eventPageCounts.set(`${event}:${pagePath}`, (eventPageCounts.get(`${event}:${pagePath}`) || 0) + 1);
    utmSourceCounts.set(utmSource, (utmSourceCounts.get(utmSource) || 0) + 1);
  }

  totals.by_event_30d = summarizeCounts(eventCounts, 10, 1);
  totals.by_event_page_30d = summarizeCounts(eventPageCounts, 10, 1);
  totals.by_utm_source_30d = summarizeCounts(utmSourceCounts, 10, 1);
  return totals;
}

app.get(["/health", "/api/lead/health"], (_req, res) => {
  res.json({
    ok: true,
    service: "centrlp-mailer",
    port: PORT,
    receipt_storage: "ready",
    notification_status: smtpEnabled ? (smtpReady ? "ready" : "degraded") : "disabled",
    crm_status: CRM_WEBHOOK_URL ? (crmReady ? "ready" : "degraded") : "disabled",
    max_status: MAX_BOT_TOKEN && MAX_RECIPIENT_USER_ID ? (maxReady ? "ready" : "degraded") : "disabled",
  });
});

app.get("/api/lead/metrics", (_req, res) => {
  res.set("Cache-Control", "no-store");
  try {
    res.json(readLeadMetrics());
  } catch (err) {
    console.error("[mailer] metrics failed:", err.message);
    res.status(500).json({ ok: false, error: "metrics_failed" });
  }
});

app.post("/api/lead/event", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
    req.ip ||
    req.socket.remoteAddress ||
    "unknown";

  if (!rateLimit(`event:${ip}`)) {
    return res.status(429).json({ ok: false, error: "too_many_requests" });
  }

  const body = req.body || {};
  const event = normalizeMetricValue(body.event || "", "");

  if (!event) {
    return res.status(400).json({ ok: false, error: "missing_event" });
  }

  const entry = {
    received_at: new Date().toISOString(),
    event,
    path: normalizePathMetric(body.path || body.page_url || "/"),
    utm_source: normalizeMetricValue(body.utm_source || "direct", "direct"),
    utm_medium: normalizeMetricValue(body.utm_medium || "", ""),
    utm_campaign: normalizeMetricValue(body.utm_campaign || "", ""),
    utm_content: normalizeMetricValue(body.utm_content || "", ""),
    utm_term: normalizeMetricValue(body.utm_term || "", ""),
    placement: normalizeMetricValue(body.placement || "", ""),
    messenger: normalizeMetricValue(body.messenger || "", ""),
    referrer_host: (() => {
      try {
        return normalizeMetricValue(new URL(String(body.referrer || "")).hostname, "");
      } catch {
        return "";
      }
    })(),
  };

  logLeadEvent(entry);
  return res.json({ ok: true });
});

app.post("/api/lead", async (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
    req.ip ||
    req.socket.remoteAddress ||
    "unknown";

  if (!rateLimit(ip)) {
    return res.status(429).json({ ok: false, error: "too_many_requests" });
  }

  const body = req.body || {};
  // Honeypot: bots often fill every field including hidden ones.
  if (body.website || body._hp) {
    // Pretend success so bots don't retry
    return res.json({ ok: true, accepted: false });
  }

  const name = String(body.name || "").trim().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 60);

  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: "missing_required_fields" });
  }

  if (body.privacyAccepted !== true) {
    return res.status(400).json({ ok: false, error: "missing_required_consents" });
  }

  const consentVersion = String(body.consent_version || "").trim().slice(0, 120);
  const privacyVersion = String(body.privacy_version || "").trim().slice(0, 120);
  const cookiesVersion = String(body.cookies_version || "").trim().slice(0, 120);
  const leadSubmissionId = String(body.lead_submission_id || "").trim().slice(0, 120);

  if (!consentVersion || !privacyVersion || !cookiesVersion) {
    return res.status(400).json({ ok: false, error: "missing_consent_versions" });
  }

  if (!leadSubmissionId) {
    return res.status(400).json({ ok: false, error: "missing_lead_submission_id" });
  }

  if (!/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|lead-[a-zA-Z0-9-]{12,})$/i.test(leadSubmissionId)) {
    return res.status(400).json({ ok: false, error: "invalid_lead_submission_id" });
  }

  const existingLead = deliveredReceiptCache.get(leadSubmissionId);
  if (existingLead) {
    return res.json(toPublicReceipt(existingLead, true));
  }

  const attribution = body.attribution && typeof body.attribution === "object" ? body.attribution : {};
  const lead = {
    received_at: new Date().toISOString(),
    lead_submission_id: leadSubmissionId,
    name,
    phone,
    business: String(body.business || "").trim().slice(0, 300),
    city: String(body.city || "").trim().slice(0, 120),
    goal: String(body.goal || "").trim().slice(0, 200),
    link: String(body.link || "").trim().slice(0, 500),
    comment: String(body.comment || "").trim().slice(0, 4000),
    page_path: String(body.page_path || "").trim().slice(0, 500),
    page_url: String(body.page_url || "").trim().slice(0, 1000),
    lead_source: String(body.lead_source || "centrlp.ru").trim().slice(0, 120),
    utm_source: normalizeMetricValue(attribution.utm_source || "direct", "direct"),
    utm_medium: normalizeMetricValue(attribution.utm_medium || "", ""),
    utm_campaign: normalizeMetricValue(attribution.utm_campaign || "", ""),
    utm_content: normalizeMetricValue(attribution.utm_content || "", ""),
    utm_term: normalizeMetricValue(attribution.utm_term || "", ""),
    privacy_accepted: Boolean(body.privacyAccepted),
    cookies_accepted: Boolean(body.cookiesAccepted),
    consent_version: consentVersion,
    privacy_version: privacyVersion,
    cookies_version: cookiesVersion,
    ip,
    user_agent: String(req.headers["user-agent"] || "").slice(0, 300),
  };

  try {
    let delivery = pendingDeliveries.get(leadSubmissionId);
    if (!delivery) {
      delivery = (async () => {
        const storedLead = persistReceipt({
          ...lead,
          receipt_id: crypto.randomUUID(),
          delivery_status: "stored",
          notification_status: "pending",
          crm_status: lead.utm_source === "codex_smoke" ? "skipped" : "pending",
          max_status: lead.utm_source === "codex_smoke" ? "skipped" : "pending",
          stored_at: new Date().toISOString(),
        });
        const crmLead = await deliverLeadToCrm(storedLead);
        const maxLead = await deliverLeadToMax(crmLead);
        const notifiedLead = await notifyLead(maxLead);

        if (!logLead(notifiedLead)) {
          throw new Error("lead_receipt_log_failed");
        }
        return notifiedLead;
      })();
      pendingDeliveries.set(leadSubmissionId, delivery);
    }

    const storedLead = await delivery;
    return res.json(toPublicReceipt(storedLead));
  } catch (err) {
    console.error("[mailer] receipt storage failed:", err.message);
    return res.status(503).json({ ok: false, error: "lead_storage_failed" });
  } finally {
    pendingDeliveries.delete(leadSubmissionId);
  }
});

app.listen(Number(PORT), "127.0.0.1", () => {
  console.log(`[mailer] listening on 127.0.0.1:${PORT}`);
});
