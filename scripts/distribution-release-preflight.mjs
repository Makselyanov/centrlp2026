import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const defaultManifest = "content/distribution/releases/2026-07-21-web-analytics-access.json";
const manifestPath = path.resolve(root, process.argv.find((arg) => arg.endsWith(".json")) || defaultManifest);
const live = process.argv.includes("--live");
const forbidden = /\b(?:Codex|Claude|TODO|draft|placeholder|handoff|implementation plan)\b|здесь будут|потом добавим|надо придумать|мы обсудили|в диалоге|черновик/iu;
const limits = { telegram: 1000, vk: 1500, max: 1000 };

function fail(message) {
  console.error(`BLOCK: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(manifestPath)) {
  fail(`manifest not found: ${manifestPath}`);
  process.exit();
}

const release = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const seenUrls = new Set();

if (!/^centrlp:\d{4}-\d{2}-\d{2}:[a-z0-9-]+$/.test(release.release_id || "")) fail("invalid release_id");
if (release.status !== "ready_supervised") fail("status must be ready_supervised");
if (!release.canonical_url?.startsWith("https://centrlp.ru/")) fail("canonical_url must belong to centrlp.ru");

for (const [channel, item] of Object.entries(release.channels || {})) {
  if (!(channel in limits)) {
    fail(`unsupported channel: ${channel}`);
    continue;
  }
  if (typeof item.enabled !== "boolean") fail(`${channel}: enabled flag is required`);
  if (item.enabled && !item.target) fail(`${channel}: target is missing`);
  if (!item.text?.trim()) fail(`${channel}: text is missing`);
  if ((item.text || "").length > limits[channel]) fail(`${channel}: ${item.text.length} chars exceeds ${limits[channel]}`);
  if (forbidden.test(item.text || "")) fail(`${channel}: forbidden public marker found`);
  if (!item.url?.startsWith("https://centrlp.ru/")) fail(`${channel}: URL must belong to centrlp.ru`);
  if (!item.text?.includes(item.url || "")) fail(`${channel}: text does not contain its tracked URL`);
  if (seenUrls.has(item.url)) fail(`${channel}: tracked URL is duplicated`);
  seenUrls.add(item.url);
  if (!item.media_path || !fs.existsSync(path.resolve(root, item.media_path))) fail(`${channel}: media file is missing`);
  if (item.receipt !== null) fail(`${channel}: unsent release must have null receipt`);
}

if (live && !process.exitCode) {
  for (const [channel, item] of Object.entries(release.channels)) {
    if (!item.enabled) continue;
    const response = await fetch(item.url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    if (!response.ok) fail(`${channel}: live URL returned HTTP ${response.status}`);
    else console.log(`${channel}: HTTP ${response.status} ${item.url}`);
  }
}

if (!process.exitCode) {
  console.log(`PASS: ${release.release_id}`);
  for (const [channel, item] of Object.entries(release.channels)) {
    console.log(`${channel}: enabled=${item.enabled} target=${item.target} chars=${item.text.length} media=${item.media_path}`);
  }
  console.log("No external publication was performed.");
}
