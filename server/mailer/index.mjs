// CentrLP lead mailer — Express + nodemailer over Yandex SMTP.
// Data path: browser → this service (RF VPS) → SMTP Яндекс → 1@centrlp.ru.
// No foreign hops → compliant with ФЗ-242 localization.
//
// Env (.env.mailer.local in parent of this dir, or process env on server):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO, LEAD_FROM, PORT

import fs from "node:fs";
import path from "node:path";
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
} = process.env;

if (!SMTP_USER || !SMTP_PASS || !LEAD_TO) {
  console.error("[mailer] missing SMTP_USER / SMTP_PASS / LEAD_TO in env");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

// Verify SMTP connection at startup so failures are loud
transporter.verify((err) => {
  if (err) console.error("[mailer] SMTP verify failed:", err.message);
  else console.log("[mailer] SMTP ready (" + SMTP_HOST + ":" + SMTP_PORT + ")");
});

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
const LOG_DIR = path.join(__dirname, "logs");
fs.mkdirSync(LOG_DIR, { recursive: true });
const LOG_FILE = path.join(LOG_DIR, "leads.jsonl");
const LEAD_LOG_RETENTION_MS =
  Math.max(Number(LEAD_LOG_RETENTION_DAYS) || 183, 1) * 24 * 60 * 60 * 1000;

function logLead(entry) {
  try {
    fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n", "utf8");
  } catch (e) {
    console.error("[mailer] log write failed:", e.message);
  }
}

function pruneLeadLog() {
  try {
    if (!fs.existsSync(LOG_FILE)) return;

    const cutoff = Date.now() - LEAD_LOG_RETENTION_MS;
    const lines = fs.readFileSync(LOG_FILE, "utf8").split("\n");
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

    fs.writeFileSync(LOG_FILE, kept.length ? kept.join("\n") + "\n" : "", "utf8");
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
    ["Ссылка", lead.link],
    ["Комментарий", lead.comment],
    ["Страница", lead.page_path],
    ["URL", lead.page_url],
    ["Источник", lead.lead_source],
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

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "centrlp-mailer", port: PORT });
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
    return res.json({ ok: true });
  }

  const name = String(body.name || "").trim().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 60);

  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: "missing_required_fields" });
  }

  if (body.privacyAccepted !== true || body.cookiesAccepted !== true) {
    return res.status(400).json({ ok: false, error: "missing_required_consents" });
  }

  const consentVersion = String(body.consent_version || "").trim().slice(0, 120);
  const privacyVersion = String(body.privacy_version || "").trim().slice(0, 120);
  const cookiesVersion = String(body.cookies_version || "").trim().slice(0, 120);

  if (!consentVersion || !privacyVersion || !cookiesVersion) {
    return res.status(400).json({ ok: false, error: "missing_consent_versions" });
  }

  const lead = {
    received_at: new Date().toISOString(),
    name,
    phone,
    business: String(body.business || "").trim().slice(0, 300),
    city: String(body.city || "").trim().slice(0, 120),
    link: String(body.link || "").trim().slice(0, 500),
    comment: String(body.comment || "").trim().slice(0, 4000),
    page_path: String(body.page_path || "").trim().slice(0, 500),
    page_url: String(body.page_url || "").trim().slice(0, 1000),
    lead_source: String(body.lead_source || "centrlp.ru").trim().slice(0, 120),
    privacy_accepted: Boolean(body.privacyAccepted),
    cookies_accepted: Boolean(body.cookiesAccepted),
    consent_version: consentVersion,
    privacy_version: privacyVersion,
    cookies_version: cookiesVersion,
    ip,
    user_agent: String(req.headers["user-agent"] || "").slice(0, 300),
  };

  logLead(lead);

  try {
    await transporter.sendMail({
      from: `"CentrLP сайт" <${LEAD_FROM || SMTP_USER}>`,
      to: LEAD_TO,
      replyTo: lead.phone ? undefined : undefined, // Яндекс не принимает телефон как reply-to
      subject: `Заявка CentrLP: ${lead.name} (${lead.phone}) — ${lead.page_path || "/"}`,
      html: renderEmail(lead),
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("[mailer] send failed:", err.message);
    return res.status(502).json({ ok: false, error: "mail_send_failed" });
  }
});

app.listen(Number(PORT), "127.0.0.1", () => {
  console.log(`[mailer] listening on 127.0.0.1:${PORT}`);
});
