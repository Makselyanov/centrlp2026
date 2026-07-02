import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const defaultEnvPath = path.join(rootDir, ".env.seo.local");
const tokenUrl = "https://oauth2.googleapis.com/token";
const scope = "https://www.googleapis.com/auth/webmasters.readonly";

function parseArgs(argv) {
  const args = {
    envPath: defaultEnvPath,
    port: 8765,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--env" && argv[i + 1]) {
      args.envPath = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
    } else if (arg === "--port" && argv[i + 1]) {
      const port = Number(argv[i + 1]);
      if (Number.isInteger(port) && port > 0) {
        args.port = port;
      }
      i += 1;
    }
  }

  return args;
}

function parseEnv(content) {
  const values = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;

    const eq = line.indexOf("=");
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

function setEnvValue(content, key, value) {
  const escaped = String(value).replace(/\r?\n/g, "");
  const line = `${key}=${escaped}`;
  const regex = new RegExp(`^${key}=.*$`, "m");

  if (regex.test(content)) {
    return content.replace(regex, line);
  }

  return `${content.trimEnd()}\n${line}\n`;
}

async function exchangeCode({ code, clientId, clientSecret, redirectUri }) {
  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.error_description || data.error || `HTTP ${res.status}`;
    throw new Error(`OAuth code exchange failed: ${message}`);
  }

  if (!data.refresh_token) {
    throw new Error("Google did not return refresh_token. Revoke old app access and run the flow again with prompt=consent.");
  }

  return data.refresh_token;
}

async function waitForCode(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const requestUrl = new URL(req.url || "/", `http://localhost:${port}`);
        const code = requestUrl.searchParams.get("code");
        const error = requestUrl.searchParams.get("error");

        if (error) {
          res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(`Google OAuth error: ${error}`);
          server.close();
          reject(new Error(`Google OAuth error: ${error}`));
          return;
        }

        if (!code) {
          res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("Waiting for Google OAuth callback.");
          return;
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<!doctype html><title>GSC OAuth</title><h1>Google Search Console token received</h1><p>You can close this tab.</p>");
        server.close();
        resolve(code);
      } catch (error) {
        server.close();
        reject(error);
      }
    });

    server.on("error", reject);
    server.listen(port, "127.0.0.1");
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const envContent = fs.existsSync(args.envPath) ? fs.readFileSync(args.envPath, "utf8") : "";
  const env = parseEnv(envContent);

  if (!env.GSC_CLIENT_ID || !env.GSC_CLIENT_SECRET) {
    throw new Error(`Fill GSC_CLIENT_ID and GSC_CLIENT_SECRET in ${args.envPath} first.`);
  }

  const redirectUri = `http://localhost:${args.port}/`;
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", env.GSC_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", scope);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  console.log("Open this URL in the authorized Google browser session:");
  console.log(authUrl.toString());
  console.log("");
  console.log(`Waiting for callback on ${redirectUri}`);

  const code = await waitForCode(args.port);
  const refreshToken = await exchangeCode({
    code,
    clientId: env.GSC_CLIENT_ID,
    clientSecret: env.GSC_CLIENT_SECRET,
    redirectUri,
  });

  let nextEnv = setEnvValue(envContent, "GSC_REFRESH_TOKEN", refreshToken);
  nextEnv = setEnvValue(nextEnv, "GSC_REFRESH_TOKEN_ISSUED_AT", new Date().toISOString());
  fs.writeFileSync(args.envPath, nextEnv, "utf8");

  console.log("Updated local GSC_REFRESH_TOKEN in .env.seo.local.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
