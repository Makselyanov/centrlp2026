import { Buffer } from "node:buffer";
import path from "node:path";

export const CENTRLP_TIKTOK_APP_ID = "7666838773159905301";
export const REQUIRED_SCOPES = Object.freeze([
  "user.info.basic",
  "video.upload",
  "video.publish",
]);

const DEFAULT_PUBLIC_ORIGIN = "https://centrlp.ru";
const DEFAULT_REDIRECT_URI = `${DEFAULT_PUBLIC_ORIGIN}/tiktok/callback`;
const DEFAULT_STORE_PATH = "/var/lib/centrlp-tiktok/sessions.enc.json";
const DEFAULT_CONSENT_AUDIT_PATH =
  "/var/lib/centrlp-tiktok/consent-audit.enc.json";
const DEFAULT_PORT = 3023;

function requireNonEmpty(value, name) {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (!normalized) {
    throw new Error(`${name} is required`);
  }
  return normalized;
}

function parseExactBoolean(value) {
  return value === "1";
}

function parseInteger(value, fallback, { min, max, name }) {
  const candidate =
    value === undefined || value === null || value === ""
      ? fallback
      : Number.parseInt(String(value), 10);

  if (!Number.isInteger(candidate) || candidate < min || candidate > max) {
    throw new Error(`${name} must be an integer between ${min} and ${max}`);
  }

  return candidate;
}

function parseHttpsOrigin(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("TIKTOK_PUBLIC_ORIGIN must be an HTTPS origin without path, query, or credentials");
  }
  return url.origin;
}

function parseRedirectUri(value, publicOrigin) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.origin !== publicOrigin || url.pathname !== "/tiktok/callback" || url.search || url.hash) {
    throw new Error("TIKTOK_REDIRECT_URI must be the exact HTTPS URL https://centrlp.ru/tiktok/callback");
  }
  return url.toString();
}

function parseMasterKey(value) {
  const input = requireNonEmpty(value, "TIKTOK_SESSION_MASTER_KEY");
  let key;

  if (/^[0-9a-fA-F]{64}$/.test(input)) {
    key = Buffer.from(input, "hex");
  } else {
    try {
      key = Buffer.from(input, "base64url");
    } catch {
      throw new Error("TIKTOK_SESSION_MASTER_KEY must be 32 bytes encoded as base64url or 64 hex characters");
    }
  }

  if (key.length !== 32) {
    throw new Error("TIKTOK_SESSION_MASTER_KEY must decode to exactly 32 bytes");
  }

  return key;
}

export function loadConfig(env = process.env) {
  const environment = requireNonEmpty(
    env.TIKTOK_ENVIRONMENT,
    "TIKTOK_ENVIRONMENT",
  ).toLowerCase();
  if (environment !== "sandbox" && environment !== "production") {
    throw new Error("TIKTOK_ENVIRONMENT must be sandbox or production");
  }

  const appId = requireNonEmpty(env.TIKTOK_APP_ID, "TIKTOK_APP_ID");
  if (appId !== CENTRLP_TIKTOK_APP_ID) {
    throw new Error(`TIKTOK_APP_ID must be the CentrLP app ${CENTRLP_TIKTOK_APP_ID}`);
  }

  const publicOrigin = parseHttpsOrigin(env.TIKTOK_PUBLIC_ORIGIN || DEFAULT_PUBLIC_ORIGIN);
  if (publicOrigin !== DEFAULT_PUBLIC_ORIGIN) {
    throw new Error(`TIKTOK_PUBLIC_ORIGIN must be ${DEFAULT_PUBLIC_ORIGIN}`);
  }

  const expectedUsername = requireNonEmpty(
    env.TIKTOK_EXPECTED_USERNAME || "centrlp",
    "TIKTOK_EXPECTED_USERNAME",
  ).replace(/^@/, "").toLowerCase();
  if (expectedUsername !== "centrlp") {
    throw new Error("TIKTOK_EXPECTED_USERNAME must be centrlp");
  }

  const storePath = path.resolve(
    env.TIKTOK_SESSION_STORE_PATH || DEFAULT_STORE_PATH,
  );
  const consentAuditPath = path.resolve(
    env.TIKTOK_CONSENT_AUDIT_PATH || DEFAULT_CONSENT_AUDIT_PATH,
  );
  if (consentAuditPath === storePath) {
    throw new Error(
      "TIKTOK_CONSENT_AUDIT_PATH must differ from TIKTOK_SESSION_STORE_PATH",
    );
  }
  const credentialPrefix =
    environment === "sandbox" ? "TIKTOK_SANDBOX" : "TIKTOK_PRODUCTION";
  const inactiveCredentialPrefix =
    environment === "sandbox" ? "TIKTOK_PRODUCTION" : "TIKTOK_SANDBOX";
  if (
    String(env[`${inactiveCredentialPrefix}_CLIENT_KEY`] || "").trim() ||
    String(env[`${inactiveCredentialPrefix}_CLIENT_SECRET`] || "").trim()
  ) {
    throw new Error(
      `${inactiveCredentialPrefix} credentials must not be present in the ${environment} service environment`,
    );
  }
  const expectedOpenId = (env.TIKTOK_EXPECTED_OPEN_ID || "").trim() || null;
  if (environment === "production" && !expectedOpenId) {
    throw new Error(
      "TIKTOK_EXPECTED_OPEN_ID is required in production",
    );
  }

  return Object.freeze({
    host: "127.0.0.1",
    port: parseInteger(env.TIKTOK_PORT, DEFAULT_PORT, {
      min: 1024,
      max: 65535,
      name: "TIKTOK_PORT",
    }),
    environment,
    appId,
    clientKey: requireNonEmpty(
      env[`${credentialPrefix}_CLIENT_KEY`],
      `${credentialPrefix}_CLIENT_KEY`,
    ),
    clientSecret: requireNonEmpty(
      env[`${credentialPrefix}_CLIENT_SECRET`],
      `${credentialPrefix}_CLIENT_SECRET`,
    ),
    publicOrigin,
    redirectUri: parseRedirectUri(
      env.TIKTOK_REDIRECT_URI || DEFAULT_REDIRECT_URI,
      publicOrigin,
    ),
    expectedUsername,
    expectedOpenId,
    scopes: REQUIRED_SCOPES,
    complianceApproved: parseExactBoolean(
      env.TIKTOK_CROSS_BORDER_APPROVED,
    ),
    sessionMasterKey: parseMasterKey(env.TIKTOK_SESSION_MASTER_KEY),
    sessionStorePath: storePath,
    consentAuditPath,
    consentAuditRetentionMs:
      parseInteger(env.TIKTOK_CONSENT_AUDIT_RETENTION_DAYS, 365, {
        min: 30,
        max: 1095,
        name: "TIKTOK_CONSENT_AUDIT_RETENTION_DAYS",
      }) *
      24 *
      60 *
      60 *
      1000,
    cookieName: "__Host-centrlp_tiktok",
    sessionMaxAgeMs:
      parseInteger(env.TIKTOK_SESSION_MAX_AGE_DAYS, 365, {
        min: 1,
        max: 365,
        name: "TIKTOK_SESSION_MAX_AGE_DAYS",
      }) *
      24 *
      60 *
      60 *
      1000,
    oauthStateTtlMs: 10 * 60 * 1000,
    uploadTicketTtlMs: 10 * 60 * 1000,
    maintenanceIntervalMs: 60 * 60 * 1000,
    tokenRefreshSkewMs: 5 * 60 * 1000,
    maxUploadBytes: 64 * 1024 * 1024,
    tiktokAuthorizationUrl: "https://www.tiktok.com/v2/auth/authorize/",
    tiktokTokenUrl: "https://open.tiktokapis.com/v2/oauth/token/",
    tiktokApiOrigin: "https://open.tiktokapis.com",
  });
}

export function configForTests(overrides = {}) {
  return Object.freeze({
    host: "127.0.0.1",
    port: 0,
    environment: "sandbox",
    appId: CENTRLP_TIKTOK_APP_ID,
    clientKey: "test-client-key",
    clientSecret: "test-client-secret",
    publicOrigin: DEFAULT_PUBLIC_ORIGIN,
    redirectUri: DEFAULT_REDIRECT_URI,
    expectedUsername: "centrlp",
    expectedOpenId: "expected-open-id",
    scopes: REQUIRED_SCOPES,
    complianceApproved: true,
    sessionMasterKey: Buffer.alloc(32, 7),
    sessionStorePath: path.resolve("sessions.test.enc.json"),
    consentAuditPath: path.resolve("consent-audit.test.enc.json"),
    consentAuditRetentionMs: 365 * 24 * 60 * 60 * 1000,
    cookieName: "__Host-centrlp_tiktok",
    sessionMaxAgeMs: 365 * 24 * 60 * 60 * 1000,
    oauthStateTtlMs: 10 * 60 * 1000,
    uploadTicketTtlMs: 10 * 60 * 1000,
    maintenanceIntervalMs: 60 * 60 * 1000,
    tokenRefreshSkewMs: 5 * 60 * 1000,
    maxUploadBytes: 64 * 1024 * 1024,
    tiktokAuthorizationUrl: "https://www.tiktok.com/v2/auth/authorize/",
    tiktokTokenUrl: "https://open.tiktokapis.com/v2/oauth/token/",
    tiktokApiOrigin: "https://open.tiktokapis.com",
    ...overrides,
  });
}
