import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import crypto from "node:crypto";

const port = 34000 + Math.floor(Math.random() * 1000);
const logDir = fs.mkdtempSync(path.join(os.tmpdir(), "centrlp-lead-receipt-"));
const serverPath = path.resolve("server/mailer/index.mjs");
const child = spawn(process.execPath, [serverPath], {
  env: {
    ...process.env,
    PORT: String(port),
    SMTP_USER: "test@centrlp.ru",
    SMTP_PASS: "test",
    LEAD_TO: "test@centrlp.ru",
    MAILER_JSON_TRANSPORT: "1",
    LEAD_LOG_DIR: logDir,
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
  attribution: { utm_source: "codex_smoke", utm_campaign: "lead_receipt" },
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

  const metrics = await (await fetch(`${baseUrl}/api/lead/metrics`)).json();
  assert.equal(metrics.confirmed_leads_30d, 0);
  assert.equal(metrics.last_30_days, 0);
  assert.equal(metrics.synthetic_leads_30d, 1);
  assert.equal(metrics.logged_total, 1);

  console.log("Lead receipt integration test passed: durable receipt, notification, deduplication, honeypot.");
} finally {
  child.kill("SIGTERM");
  fs.rmSync(logDir, { recursive: true, force: true });
}
