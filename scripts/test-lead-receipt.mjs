import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import crypto from "node:crypto";
import http from "node:http";

const port = 34000 + Math.floor(Math.random() * 1000);
const crmPort = port + 1000;
const maxPort = port + 2000;
const logDir = fs.mkdtempSync(path.join(os.tmpdir(), "centrlp-lead-receipt-"));
const serverPath = path.resolve("server/mailer/index.mjs");
const crmCalls = [];
const crmServer = http.createServer((req, res) => {
  let rawBody = "";
  req.on("data", (chunk) => { rawBody += chunk; });
  req.on("end", () => {
    const payload = JSON.parse(rawBody);
    crmCalls.push(payload);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "ok",
      deal_id: 123,
      lead_submission_id: payload.lead_submission_id,
      created: true,
      deduplicated: false,
    }));
  });
});
await new Promise((resolve) => crmServer.listen(crmPort, "127.0.0.1", resolve));
const maxCalls = [];
const maxServer = http.createServer((req, res) => {
  let rawBody = "";
  req.on("data", (chunk) => { rawBody += chunk; });
  req.on("end", () => {
    maxCalls.push({ url: req.url, authorization: req.headers.authorization, payload: JSON.parse(rawBody) });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: { id: "max-test-message" } }));
  });
});
await new Promise((resolve) => maxServer.listen(maxPort, "127.0.0.1", resolve));
const child = spawn(process.execPath, [serverPath], {
  env: {
    ...process.env,
    PORT: String(port),
    SMTP_USER: "test@centrlp.ru",
    SMTP_PASS: "test",
    LEAD_TO: "test@centrlp.ru",
    MAILER_JSON_TRANSPORT: "1",
    LEAD_LOG_DIR: logDir,
    CRM_WEBHOOK_URL: `http://127.0.0.1:${crmPort}/api/webhooks/site-form`,
    MAX_BOT_TOKEN: "test-max-token",
    MAX_RECIPIENT_USER_ID: "6382431",
    MAX_API_BASE: `http://127.0.0.1:${maxPort}`,
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let stderr = "";
child.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});

const baseUrl = `http://127.0.0.1:${port}`;
const waitForHealth = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/api/lead/health`);
      if (response.ok) return;
    } catch {
      // Service is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`mailer did not start: ${stderr}`);
};

const postLead = (body) => fetch(`${baseUrl}/api/lead`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const submissionId = crypto.randomUUID();
const validLead = {
  name: "Интеграционный тест",
  phone: "+7 900 000-00-00",
  privacyAccepted: true,
  cookiesAccepted: false,
  consent_version: "test-consent",
  privacy_version: "test-privacy",
  cookies_version: "test-cookies",
  lead_submission_id: submissionId,
  page_path: "/test",
  lead_source: "integration-test",
  attribution: { utm_source: "integration_test", utm_campaign: "lead_receipt" },
};

try {
  await waitForHealth();

  const missingId = await postLead({ ...validLead, lead_submission_id: "" });
  assert.equal(missingId.status, 400);
  assert.equal((await missingId.json()).error, "missing_lead_submission_id");

  const first = await postLead(validLead);
  assert.equal(first.status, 200);
  const firstReceipt = await first.json();
  assert.equal(firstReceipt.accepted, true);
  assert.equal(firstReceipt.delivery_status, "stored");
  assert.equal(firstReceipt.notification_status, "sent");
  assert.equal(firstReceipt.crm_status, "sent");
  assert.equal(firstReceipt.max_status, "sent");
  assert.equal(firstReceipt.lead_submission_id, submissionId);
  assert.match(firstReceipt.receipt_id, /^[0-9a-f-]{36}$/i);

  const duplicate = await postLead(validLead);
  const duplicateReceipt = await duplicate.json();
  assert.equal(duplicateReceipt.duplicate, true);
  assert.equal(duplicateReceipt.receipt_id, firstReceipt.receipt_id);

  const honeypot = await postLead({ ...validLead, lead_submission_id: crypto.randomUUID(), website: "bot" });
  assert.deepEqual(await honeypot.json(), { ok: true, accepted: false });

  const leadLines = fs.readFileSync(path.join(logDir, "leads.jsonl"), "utf8").trim().split("\n");
  assert.equal(leadLines.length, 1, "duplicate submission must not create a second delivered lead");
  const storedReceipt = JSON.parse(
    fs.readFileSync(path.join(logDir, "receipts", `${submissionId}.json`), "utf8"),
  );
  assert.equal(storedReceipt.receipt_id, firstReceipt.receipt_id);
  assert.equal(storedReceipt.notification_status, "sent");
  assert.equal(storedReceipt.crm_status, "sent");
  assert.equal(storedReceipt.crm_deal_id, 123);
  assert.equal(storedReceipt.max_status, "sent");
  assert.equal(crmCalls.length, 1);
  assert.equal(crmCalls[0].lead_submission_id, submissionId);
  assert.equal(maxCalls.length, 1);
  assert.match(maxCalls[0].url, /user_id=6382431/);
  assert.equal(maxCalls[0].authorization, "test-max-token");
  assert.match(maxCalls[0].payload.text, /Новая заявка CentrLP/);
  assert.match(maxCalls[0].payload.text, /Интеграционный тест/);

  const synthetic = await postLead({
    ...validLead,
    lead_submission_id: crypto.randomUUID(),
    attribution: { utm_source: "codex_smoke", utm_campaign: "lead_receipt" },
  });
  assert.equal((await synthetic.json()).crm_status, "skipped");
  assert.equal(crmCalls.length, 1, "synthetic smoke leads must never enter CRM");
  assert.equal(maxCalls.length, 1, "synthetic smoke leads must never enter MAX");

  const metrics = await (await fetch(`${baseUrl}/api/lead/metrics`)).json();
  assert.equal(metrics.confirmed_leads_30d, 1);
  assert.equal(metrics.crm_confirmed_leads_30d, 1);
  assert.equal(metrics.last_30_days, 1);
  assert.equal(metrics.synthetic_leads_30d, 1);
  assert.equal(metrics.logged_total, 2);

  console.log("Lead receipt integration test passed: durable receipt, notification, deduplication, honeypot.");
} finally {
  child.kill("SIGTERM");
  crmServer.close();
  maxServer.close();
  fs.rmSync(logDir, { recursive: true, force: true });
}
