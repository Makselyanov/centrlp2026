import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const host = "centrlp.ru";
const key = "8785c66d2ffe4cc7b807153f327aed5f";
const endpoint = "https://api.indexnow.org/indexnow";
const keyLocation = `https://${host}/${key}.txt`;
const live = process.argv.includes("--live");
const rawUrls = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));

if (rawUrls.length === 0) {
  console.error("Usage: npm run seo:indexnow -- [--live] https://centrlp.ru/path [more URLs]");
  process.exit(2);
}

if (rawUrls.length > 10) {
  console.error("IndexNow submission is limited to 10 URLs per run.");
  process.exit(2);
}

const urls = [...new Set(rawUrls.map((rawUrl) => {
  const url = new URL(rawUrl);

  if (url.protocol !== "https:" || url.hostname !== host || url.port || url.username || url.password) {
    throw new Error(`Only canonical https://${host}/ URLs are allowed: ${rawUrl}`);
  }

  url.hash = "";
  return url.toString();
}))];

const payload = {
  host,
  key,
  keyLocation,
  urlList: urls,
};

if (!live) {
  console.log(JSON.stringify({ mode: "dry-run", endpoint, ...payload }, null, 2));
  console.log("No IndexNow request was sent. Add --live to submit these URLs.");
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
  signal: AbortSignal.timeout(20000),
});
const responseBody = await response.text();
const receipt = {
  submitted_at: new Date().toISOString(),
  endpoint,
  status: response.status,
  ok: response.status === 200 || response.status === 202,
  key_location: keyLocation,
  urls,
  response_body: responseBody || null,
};

await fs.mkdir(path.resolve("seo-reports"), { recursive: true });
await fs.writeFile(
  path.resolve("seo-reports", "latest-indexnow-receipt.json"),
  `${JSON.stringify(receipt, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(receipt, null, 2));

if (!receipt.ok) {
  process.exitCode = 1;
}
