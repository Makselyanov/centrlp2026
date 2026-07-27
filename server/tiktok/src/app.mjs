import {
  createHash,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { Transform } from "node:stream";
import express from "express";
import { EncryptedSessionStore } from "./crypto-store.mjs";
import {
  TikTokClient,
  TikTokProviderError,
} from "./tiktok-client.mjs";

const SESSION_ID_BYTES = 32;
const CSRF_TOKEN_BYTES = 32;
const OAUTH_STATE_BYTES = 32;
const TICKET_ID_BYTES = 24;
const MAX_JSON_BYTES = "32kb";
const ALLOWED_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-m4v",
]);
const ALLOWED_VIDEO_EXTENSIONS = new Set([
  ".mp4",
  ".mov",
  ".webm",
  ".m4v",
]);
const PUBLISH_RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
const TIKTOK_CONSENT_VERSION = "centrlp-tiktok-2026-07-27-v1";
const TIKTOK_CONSENT_TEXT = Object.freeze({
  rightsAndMusic:
    "У меня есть права на видео, звук и музыку, и их использование не нарушает права третьих лиц.",
  publish:
    "Я явно разрешаю отправить или опубликовать это видео в TikTok в соответствии с выбранным действием.",
  dataTransfer:
    "Я согласен на передачу в TikTok данных подключённого аккаунта, выбранного видео, подписи и настроек для выполнения выбранного действия.",
});
const TIKTOK_CONSENT_TEXT_HASH = hashValue(
  JSON.stringify(TIKTOK_CONSENT_TEXT),
);

class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

function opaqueToken(bytes) {
  return randomBytes(bytes).toString("base64url");
}

function hashValue(value) {
  return createHash("sha256").update(value, "utf8").digest("base64url");
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left), "utf8");
  const rightBuffer = Buffer.from(String(right), "utf8");
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function parseCookies(header) {
  const result = new Map();
  for (const pair of String(header || "").split(";")) {
    const separator = pair.indexOf("=");
    if (separator <= 0) {
      continue;
    }
    const name = pair.slice(0, separator).trim();
    const value = pair.slice(separator + 1).trim();
    if (!result.has(name)) {
      result.set(name, value);
    }
  }
  return result;
}

function serializeSessionCookie(config, sessionId) {
  return [
    `${config.cookieName}=${sessionId}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${Math.floor(config.sessionMaxAgeMs / 1000)}`,
  ].join("; ");
}

function emptySession(now) {
  return {
    version: 1,
    createdAt: now,
    lastSeenAt: now,
    csrfToken: opaqueToken(CSRF_TOKEN_BYTES),
    oauth: null,
    tokens: null,
    creator: null,
    tickets: {},
    publishes: {},
  };
}

function pruneSessionArtifacts(session, now) {
  let changed = false;
  for (const [ticketId, ticket] of Object.entries(session.tickets || {})) {
    if (
      ticket.consumed ||
      !Number.isFinite(ticket.expiresAt) ||
      ticket.expiresAt <= now
    ) {
      delete session.tickets[ticketId];
      changed = true;
    }
  }
  for (const [publishId, publish] of Object.entries(session.publishes || {})) {
    if (
      !Number.isFinite(publish.createdAt) ||
      publish.createdAt + PUBLISH_RETENTION_MS <= now
    ) {
      delete session.publishes[publishId];
      changed = true;
    }
  }
  return changed;
}

function trustedOrigin(req, config) {
  const origin = req.get("origin");
  if (origin) {
    try {
      return new URL(origin).origin === config.publicOrigin;
    } catch {
      return false;
    }
  }
  return false;
}

function trustedNavigation(req, config) {
  const origin = req.get("origin");
  if (origin) {
    try {
      return new URL(origin).origin === config.publicOrigin;
    } catch {
      return false;
    }
  }

  const referer = req.get("referer");
  if (!referer) {
    return false;
  }
  try {
    return new URL(referer).origin === config.publicOrigin;
  } catch {
    return false;
  }
}

function requireCompliance(config) {
  if (!config.complianceApproved) {
    throw new ApiError(
      451,
      "compliance_not_approved",
      "TikTok connection is disabled pending compliance approval",
    );
  }
}

function requireCsrf(req) {
  const provided = req.get("x-csrf-token");
  if (
    !provided ||
    !safeEqual(provided, req.tiktokSession.csrfToken)
  ) {
    throw new ApiError(403, "csrf_failed", "CSRF validation failed");
  }
}

function requireMutationGuards(req, config) {
  requireCompliance(config);
  requireOriginAndCsrf(req, config);
}

function requireOriginAndCsrf(req, config) {
  if (!trustedOrigin(req, config)) {
    throw new ApiError(403, "origin_rejected", "Request origin is not allowed");
  }
  requireCsrf(req);
}

function createFixedWindowLimiter({ limit, windowMs, now }) {
  const clients = new Map();
  return (req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const currentTime = now();
    const existing = clients.get(key);
    const bucket =
      existing && existing.resetAt > currentTime
        ? existing
        : { count: 0, resetAt: currentTime + windowMs };
    bucket.count += 1;
    clients.set(key, bucket);

    if (bucket.count > limit) {
      res.setHeader(
        "Retry-After",
        String(Math.max(1, Math.ceil((bucket.resetAt - currentTime) / 1000))),
      );
      next(new ApiError(429, "rate_limited", "Too many requests"));
      return;
    }

    if (clients.size > 10_000) {
      for (const [clientKey, clientBucket] of clients) {
        if (clientBucket.resetAt <= currentTime) clients.delete(clientKey);
      }
    }
    next();
  };
}

function normalizeContentType(value) {
  return String(value || "")
    .split(";", 1)[0]
    .trim()
    .toLowerCase();
}

function extensionOf(name) {
  const match = String(name).toLowerCase().match(/(\.[a-z0-9]+)$/);
  return match ? match[1] : "";
}

function requireBoolean(value, field) {
  if (typeof value !== "boolean") {
    throw new ApiError(400, "invalid_prepare", `${field} must be boolean`);
  }
  return value;
}

function validatePrepareBody(
  body,
  config,
  creator,
  acceptedAt = body?.consent?.acceptedAt,
) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ApiError(400, "invalid_prepare", "A JSON object is required");
  }

  const mode = body.mode;
  if (mode !== "inbox" && mode !== "direct") {
    throw new ApiError(
      400,
      "invalid_prepare",
      "mode must be inbox or direct",
    );
  }

  const title = typeof body.title === "string" ? body.title : "";
  if (title.length > 2200 || title.includes("\u0000")) {
    throw new ApiError(
      400,
      "invalid_prepare",
      "title exceeds TikTok limits",
    );
  }

  const privacyLevel =
    typeof body.privacyLevel === "string" ? body.privacyLevel : "";
  if (
    mode === "direct" &&
    !creator.privacyOptions.includes(privacyLevel)
  ) {
    throw new ApiError(
      400,
      "invalid_privacy",
      "privacyLevel is not available for this creator",
    );
  }

  const disableComment = requireBoolean(
    body.disableComment,
    "disableComment",
  );
  const disableDuet = requireBoolean(body.disableDuet, "disableDuet");
  const disableStitch = requireBoolean(body.disableStitch, "disableStitch");
  const brandContentToggle = requireBoolean(
    body.brandContentToggle,
    "brandContentToggle",
  );
  const brandOrganicToggle = requireBoolean(
    body.brandOrganicToggle,
    "brandOrganicToggle",
  );
  const isAigc = requireBoolean(body.isAigc, "isAigc");

  if (creator.commentDisabled && !disableComment) {
    throw new ApiError(
      400,
      "creator_setting_conflict",
      "Comments must remain disabled for this creator",
    );
  }
  if (creator.duetDisabled && !disableDuet) {
    throw new ApiError(
      400,
      "creator_setting_conflict",
      "Duet must remain disabled for this creator",
    );
  }
  if (creator.stitchDisabled && !disableStitch) {
    throw new ApiError(
      400,
      "creator_setting_conflict",
      "Stitch must remain disabled for this creator",
    );
  }
  if (
    mode === "direct" &&
    privacyLevel === "SELF_ONLY" &&
    brandContentToggle
  ) {
    throw new ApiError(
      400,
      "commercial_content_conflict",
      "Paid branded content cannot use SELF_ONLY privacy",
    );
  }

  if (
    body.consent?.rightsAndMusic !== true ||
    body.consent?.publish !== true ||
    body.consent?.dataTransfer !== true ||
    body.consent?.version !== TIKTOK_CONSENT_VERSION
  ) {
    throw new ApiError(
      400,
      "consent_required",
      "The current rights, publishing, and data-transfer consent is required",
    );
  }
  if (!Number.isFinite(acceptedAt) || acceptedAt <= 0) {
    throw new ApiError(
      400,
      "consent_required",
      "Consent evidence timestamp is required",
    );
  }

  const file = body.file;
  if (!file || typeof file !== "object" || Array.isArray(file)) {
    throw new ApiError(400, "invalid_file", "file metadata is required");
  }
  const fileName =
    typeof file.name === "string" ? file.name.trim() : "";
  const fileType = normalizeContentType(file.type);
  const fileSize = Number(file.size);
  const durationSeconds = Number(file.durationSeconds);

  if (
    !fileName ||
    fileName.length > 255 ||
    fileName.includes("/") ||
    fileName.includes("\\") ||
    !ALLOWED_VIDEO_EXTENSIONS.has(extensionOf(fileName))
  ) {
    throw new ApiError(400, "invalid_file", "Unsupported video file name");
  }
  if (!ALLOWED_VIDEO_TYPES.has(fileType)) {
    throw new ApiError(400, "invalid_file", "Unsupported video MIME type");
  }
  if (
    !Number.isSafeInteger(fileSize) ||
    fileSize <= 0 ||
    fileSize > config.maxUploadBytes
  ) {
    throw new ApiError(
      413,
      "invalid_file_size",
      "Video must be no larger than 64 MiB",
    );
  }
  if (
    !Number.isFinite(durationSeconds) ||
    durationSeconds <= 0 ||
    !Number.isFinite(creator.maxVideoDurationSeconds) ||
    creator.maxVideoDurationSeconds <= 0 ||
    durationSeconds > creator.maxVideoDurationSeconds
  ) {
    throw new ApiError(
      400,
      "invalid_duration",
      "Video duration exceeds creator limits",
    );
  }

  return {
    mode,
    title,
    privacyLevel,
    disableComment,
    disableDuet,
    disableStitch,
    brandContentToggle,
    brandOrganicToggle,
    isAigc,
    consent: {
      rightsAndMusic: true,
      publish: true,
      dataTransfer: true,
      version: TIKTOK_CONSENT_VERSION,
      textHash: TIKTOK_CONSENT_TEXT_HASH,
      acceptedAt,
    },
    file: {
      name: fileName,
      type: fileType,
      size: fileSize,
      durationSeconds,
    },
  };
}

function assertCreator(config, tokens, creator) {
  if (
    config.expectedOpenId &&
    tokens.openId !== config.expectedOpenId
  ) {
    throw new ApiError(
      403,
      "wrong_tiktok_account",
      "Connected TikTok account is not the CentrLP account",
    );
  }
  if (
    creator.username.replace(/^@/, "").toLowerCase() !==
    config.expectedUsername
  ) {
    throw new ApiError(
      403,
      "wrong_tiktok_account",
      "Connected TikTok account is not @centrlp",
    );
  }
}

function hasExpectedVideoSignature(prefix, contentType) {
  if (contentType === "video/webm") {
    return (
      prefix.length >= 4 &&
      prefix[0] === 0x1a &&
      prefix[1] === 0x45 &&
      prefix[2] === 0xdf &&
      prefix[3] === 0xa3
    );
  }

  return (
    prefix.length >= 8 &&
    prefix.subarray(4, 8).toString("ascii") === "ftyp"
  );
}

function createInspectedStream(expectedBytes, contentType) {
  let receivedBytes = 0;
  let prefix = Buffer.alloc(0);
  let inspectionSettled = false;
  let streamError = null;
  let resolveInspection;
  let rejectInspection;
  const inspection = new Promise((resolve, reject) => {
    resolveInspection = resolve;
    rejectInspection = reject;
  });

  function settleInspection(error = null) {
    if (inspectionSettled) {
      return;
    }
    inspectionSettled = true;
    if (error) {
      streamError = error;
      rejectInspection(error);
    } else {
      resolveInspection();
    }
  }

  function inspectPrefix() {
    const requiredBytes = contentType === "video/webm" ? 4 : 8;
    if (prefix.length < requiredBytes) {
      return false;
    }
    if (!hasExpectedVideoSignature(prefix, contentType)) {
      settleInspection(
        new ApiError(
          400,
          "invalid_video_signature",
          "Video bytes do not match the declared container",
        ),
      );
      return true;
    }
    settleInspection();
    return true;
  }

  const transform = new Transform({
    transform(chunk, _encoding, callback) {
      receivedBytes += chunk.length;
      if (receivedBytes > expectedBytes) {
        const error = new ApiError(
          400,
          "size_mismatch",
          "Video body is too large",
        );
        settleInspection(error);
        streamError = error;
        callback(error);
        return;
      }

      if (!inspectionSettled) {
        const remaining = 16 - prefix.length;
        if (remaining > 0) {
          prefix = Buffer.concat([
            prefix,
            chunk.subarray(0, remaining),
          ]);
        }
        if (inspectPrefix() && streamError) {
          callback(streamError);
          return;
        }
      }
      callback(null, chunk);
    },
    flush(callback) {
      if (!inspectionSettled) {
        inspectPrefix();
      }
      if (!inspectionSettled) {
        settleInspection(
          new ApiError(
            400,
            "invalid_video_signature",
            "Video body is too short to identify",
          ),
        );
      }
      callback(streamError);
    },
  });
  transform.on("error", (error) => {
    streamError = streamError || error;
    settleInspection(streamError);
  });

  return {
    stream: transform,
    inspection,
    bytesReceived: () => receivedBytes,
    error: () => streamError,
  };
}

function createSessionQueue() {
  const pending = new Map();
  return async function withSessionLock(sessionId, operation) {
    const previous = pending.get(sessionId) || Promise.resolve();
    const current = previous.catch(() => {}).then(operation);
    pending.set(sessionId, current);
    current.then(
      () => {
        if (pending.get(sessionId) === current) {
          pending.delete(sessionId);
        }
      },
      () => {
        if (pending.get(sessionId) === current) {
          pending.delete(sessionId);
        }
      },
    );
    return current;
  };
}

function safeRedirect(config, status) {
  const url = new URL("/tiktok", config.publicOrigin);
  url.searchParams.set("status", status);
  return url.toString();
}

export async function createApp({
  config,
  store = new EncryptedSessionStore({
    filePath: config.sessionStorePath,
    masterKey: config.sessionMasterKey,
  }),
  consentAuditStore = new EncryptedSessionStore({
    filePath: config.consentAuditPath,
    masterKey: config.sessionMasterKey,
  }),
  fetchImpl = globalThis.fetch,
  now = () => Date.now(),
} = {}) {
  if (!config) {
    throw new Error("createApp requires validated config");
  }

  await store.init();
  try {
    await consentAuditStore.init();
  } catch (error) {
    await store.close().catch(() => {});
    throw error;
  }
  const sweepSessions = async () => {
    const currentTime = now();
    await store.mutateAll((session) => {
      if (
        !Number.isFinite(session.lastSeenAt) ||
        session.lastSeenAt + config.sessionMaxAgeMs <= currentTime
      ) {
        return null;
      }
      return pruneSessionArtifacts(session, currentTime)
        ? session
        : undefined;
    });
  };
  await sweepSessions();
  const sweepConsentAudit = async () => {
    const currentTime = now();
    await consentAuditStore.prune(
      (record) =>
        !Number.isFinite(record.expiresAt) ||
        record.expiresAt <= currentTime,
    );
  };
  await sweepConsentAudit();

  const tiktok = new TikTokClient(config, { fetchImpl, now });
  const withSessionLock = createSessionQueue();
  const app = express();
  app.locals.tiktokStore = store;
  app.locals.tiktokConsentAuditStore = consentAuditStore;
  const maintenanceTimer = setInterval(() => {
    Promise.all([sweepSessions(), sweepConsentAudit()]).catch(() => {
      // Avoid leaking session, audit, or token details through maintenance logs.
      console.error("[centrlp-tiktok] encrypted store maintenance failed");
    });
  }, config.maintenanceIntervalMs);
  maintenanceTimer.unref();
  app.locals.closeTikTokService = async () => {
    clearInterval(maintenanceTimer);
    await Promise.all([
      store.close(),
      consentAuditStore.close(),
    ]);
  };
  app.disable("x-powered-by");
  app.set("trust proxy", "loopback");

  app.use((req, res, next) => {
    res.set({
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      "Referrer-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    });
    next();
  });

  const health = (_req, res) => {
    res.json({
      ok: true,
      configured: true,
      environment: config.environment,
      complianceApproved: config.complianceApproved,
    });
  };
  app.get("/health", health);
  app.get("/api/tiktok/health", health);

  const statusLimiter = createFixedWindowLimiter({
    limit: 60,
    windowMs: 60 * 1000,
    now,
  });
  const oauthLimiter = createFixedWindowLimiter({
    limit: 20,
    windowMs: 10 * 60 * 1000,
    now,
  });
  app.use("/api/tiktok/status", statusLimiter);
  app.use("/api/tiktok/connect", oauthLimiter);
  app.use("/tiktok/callback", oauthLimiter);

  app.use(
    ["/api/tiktok", "/tiktok/callback"],
    async (req, res, next) => {
      try {
        const candidate = parseCookies(req.get("cookie")).get(
          config.cookieName,
        );
        let sessionId =
          candidate && /^[A-Za-z0-9_-]{43}$/.test(candidate)
            ? candidate
            : null;
        const currentTime = now();
        let session = sessionId
          ? await withSessionLock(sessionId, async () => {
              const stored = await store.get(sessionId);
              if (
                stored &&
                (!Number.isFinite(stored.lastSeenAt) ||
                  stored.lastSeenAt + config.sessionMaxAgeMs <= currentTime)
              ) {
                await store.delete(sessionId);
                return null;
              }
              return stored;
            })
          : null;
        if (!session) {
          sessionId = null;
        }

        const sessionWasPersisted = Boolean(session);
        if (!session) {
          sessionId = opaqueToken(SESSION_ID_BYTES);
          session = emptySession(currentTime);
        }

        res.setHeader(
          "Set-Cookie",
          serializeSessionCookie(config, sessionId),
        );
        req.tiktokSessionId = sessionId;
        req.tiktokSession = session;
        req.tiktokSessionPersisted = sessionWasPersisted;
        next();
      } catch (error) {
        next(error);
      }
    },
  );

  async function loadFreshSession(sessionId) {
    const session = await store.get(sessionId);
    if (!session) {
      throw new ApiError(401, "session_expired", "Session expired");
    }
    const currentTime = now();
    session.lastSeenAt = currentTime;
    pruneSessionArtifacts(session, currentTime);
    await store.set(sessionId, session);
    return session;
  }

  async function clearAuthorization(sessionId, session) {
    session.tokens = null;
    session.creator = null;
    session.tickets = {};
    session.publishes = {};
    await store.set(sessionId, session);
  }

  function isTerminalAuthorizationError(error) {
    return (
      (error instanceof TikTokProviderError &&
        (error.status === 401 ||
          error.code === "invalid_grant" ||
          error.code === "refresh_token_expired")) ||
      (error instanceof ApiError &&
        error.code === "authorization_expired")
    );
  }

  async function rotateTokens(sessionId, session) {
    try {
      const previousOpenId = session.tokens?.openId;
      const rotated = await tiktok.refreshTokens(session.tokens);
      if (
        (previousOpenId && rotated.openId !== previousOpenId) ||
        (config.expectedOpenId &&
          rotated.openId !== config.expectedOpenId)
      ) {
        await clearAuthorization(sessionId, session);
        throw new ApiError(
          403,
          "wrong_tiktok_account",
          "Refreshed authorization belongs to another TikTok account",
        );
      }
      session.tokens = rotated;
      await store.set(sessionId, session);
      return rotated;
    } catch (error) {
      if (isTerminalAuthorizationError(error)) {
        await clearAuthorization(sessionId, session);
        throw new ApiError(
          401,
          "authorization_expired",
          "TikTok authorization expired",
        );
      }
      throw error;
    }
  }

  async function ensureFreshTokens(sessionId, session) {
    if (!session.tokens) {
      throw new ApiError(401, "not_connected", "TikTok is not connected");
    }
    if (
      session.tokens.accessExpiresAt >
      now() + config.tokenRefreshSkewMs
    ) {
      return session.tokens;
    }

    return rotateTokens(sessionId, session);
  }

  async function latestCreator(sessionId, session) {
    let tokens = await ensureFreshTokens(sessionId, session);
    let creator;
    try {
      creator = await tiktok.creatorInfo(tokens.accessToken);
    } catch (error) {
      if (!(error instanceof TikTokProviderError) || error.status !== 401) {
        throw error;
      }
      tokens = await rotateTokens(sessionId, session);
      try {
        creator = await tiktok.creatorInfo(tokens.accessToken);
      } catch (retryError) {
        if (
          retryError instanceof TikTokProviderError &&
          retryError.status === 401
        ) {
          await clearAuthorization(sessionId, session);
          throw new ApiError(
            401,
            "authorization_expired",
            "TikTok authorization expired",
          );
        }
        throw retryError;
      }
    }
    try {
      assertCreator(config, tokens, creator);
    } catch (error) {
      if (
        error instanceof ApiError &&
        error.code === "wrong_tiktok_account"
      ) {
        await clearAuthorization(sessionId, session);
      }
      throw error;
    }
    session.creator = creator;
    await store.set(sessionId, session);
    return creator;
  }

  app.get("/api/tiktok/status", async (req, res, next) => {
    try {
      const payload = await withSessionLock(
        req.tiktokSessionId,
        async () => {
          const session = req.tiktokSessionPersisted
            ? await loadFreshSession(req.tiktokSessionId)
            : structuredClone(req.tiktokSession);
          const base = {
            configured: true,
            environment: config.environment,
            complianceApproved: config.complianceApproved,
            connected: Boolean(session.tokens),
            csrfToken: session.csrfToken,
            consentVersion: TIKTOK_CONSENT_VERSION,
          };

          if (!session.tokens || !config.complianceApproved) {
            return {
              ...base,
              ...(session.tokens && session.creator
                ? { creator: session.creator }
                : {}),
            };
          }

          try {
            const creator = await latestCreator(
              req.tiktokSessionId,
              session,
            );
            return { ...base, connected: true, creator };
          } catch (error) {
            if (
              error instanceof ApiError &&
              (error.code === "authorization_expired" ||
                error.code === "wrong_tiktok_account")
            ) {
              return {
                ...base,
                connected: false,
              };
            }
            throw error;
          }
        },
      );
      res.json(payload);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/tiktok/connect", async (req, res, next) => {
    try {
      requireCompliance(config);
      if (!trustedNavigation(req, config)) {
        throw new ApiError(
          403,
          "origin_rejected",
          "Connection must start from centrlp.ru",
        );
      }

      const authorizationUrl = await withSessionLock(
        req.tiktokSessionId,
        async () => {
          const session = req.tiktokSessionPersisted
            ? await loadFreshSession(req.tiktokSessionId)
            : structuredClone(req.tiktokSession);
          const state = opaqueToken(OAUTH_STATE_BYTES);
          session.oauth = {
            stateHash: hashValue(state),
            expiresAt: now() + config.oauthStateTtlMs,
          };
          await store.set(req.tiktokSessionId, session);
          return tiktok.authorizationUrl(state);
        },
      );
      res.redirect(302, authorizationUrl);
    } catch (error) {
      next(error);
    }
  });

  app.get("/tiktok/callback", async (req, res, next) => {
    try {
      requireCompliance(config);
      const state =
        typeof req.query.state === "string" ? req.query.state : "";
      if (!state || state.length > 256) {
        throw new ApiError(400, "invalid_oauth_state", "OAuth state is invalid");
      }

      const result = await withSessionLock(
        req.tiktokSessionId,
        async () => {
          const session = await loadFreshSession(req.tiktokSessionId);
          const oauth = session.oauth;
          session.oauth = null;
          await store.set(req.tiktokSessionId, session);

          if (
            !oauth ||
            oauth.expiresAt <= now() ||
            !safeEqual(oauth.stateHash, hashValue(state))
          ) {
            throw new ApiError(
              400,
              "invalid_oauth_state",
              "OAuth state is invalid or expired",
            );
          }

          if (typeof req.query.error === "string") {
            return { status: "cancelled" };
          }

          const code =
            typeof req.query.code === "string" ? req.query.code : "";
          if (!code || code.length > 4096) {
            throw new ApiError(
              400,
              "missing_oauth_code",
              "TikTok did not return an authorization code",
            );
          }

          const tokens = await tiktok.exchangeCode(code);
          const creator = await tiktok.creatorInfo(tokens.accessToken);
          assertCreator(config, tokens, creator);

          const rotatedId = opaqueToken(SESSION_ID_BYTES);
          const rotatedSession = {
            ...session,
            lastSeenAt: now(),
            csrfToken: opaqueToken(CSRF_TOKEN_BYTES),
            tokens,
            creator,
            tickets: {},
            publishes: {},
          };
          await store.rotate(
            req.tiktokSessionId,
            rotatedId,
            rotatedSession,
          );
          return {
            status: "connected",
            rotatedId,
          };
        },
      );

      if (result.rotatedId) {
        res.setHeader(
          "Set-Cookie",
          serializeSessionCookie(config, result.rotatedId),
        );
      }
      res.redirect(303, safeRedirect(config, result.status));
    } catch (error) {
      if (error instanceof ApiError) {
        res.redirect(303, safeRedirect(config, error.code));
        return;
      }
      next(error);
    }
  });

  app.put("/api/tiktok/upload/:ticketId", async (req, res, next) => {
    let inspected;
    try {
      requireMutationGuards(req, config);
      const ticketId = String(req.params.ticketId || "");
      if (!/^[A-Za-z0-9_-]{32}$/.test(ticketId)) {
        throw new ApiError(404, "ticket_not_found", "Upload ticket not found");
      }

      const ticketInput = await withSessionLock(
        req.tiktokSessionId,
        async () => {
          const session = await loadFreshSession(req.tiktokSessionId);
          const ticket = session.tickets?.[ticketId];
          if (
            !ticket ||
            ticket.consumed ||
            ticket.expiresAt <= now()
          ) {
            throw new ApiError(
              404,
              "ticket_not_found",
              "Upload ticket not found or expired",
            );
          }
          ticket.consumed = true;
          delete session.tickets[ticketId];
          await store.set(req.tiktokSessionId, session);
          return ticket.input;
        },
      );

      const contentType = normalizeContentType(req.get("content-type"));
      if (contentType !== ticketInput.file.type) {
        throw new ApiError(
          400,
          "content_type_mismatch",
          "Video Content-Type does not match the prepared file",
        );
      }
      const declaredLength = req.get("content-length");
      if (
        declaredLength &&
        Number.parseInt(declaredLength, 10) !== ticketInput.file.size
      ) {
        throw new ApiError(
          400,
          "size_mismatch",
          "Video body size does not match the prepared file",
        );
      }

      inspected = createInspectedStream(
        ticketInput.file.size,
        ticketInput.file.type,
      );
      req.once("error", (error) => inspected.stream.destroy(error));
      req.pipe(inspected.stream);
      await inspected.inspection;

      const prepared = await withSessionLock(
        req.tiktokSessionId,
        async () => {
          const session = await loadFreshSession(req.tiktokSessionId);
          const creator = await latestCreator(
            req.tiktokSessionId,
            session,
          );
          const revalidated = validatePrepareBody(
            ticketInput,
            config,
            creator,
          );
          if (
            typeof ticketInput.consentAuditId !== "string" ||
            !/^[A-Za-z0-9_-]{32}$/.test(ticketInput.consentAuditId)
          ) {
            throw new ApiError(
              500,
              "consent_audit_missing",
              "Consent audit evidence is unavailable",
            );
          }
          revalidated.consentAuditId = ticketInput.consentAuditId;
          const contentType = normalizeContentType(req.get("content-type"));
          if (contentType !== revalidated.file.type) {
            throw new ApiError(
              400,
              "content_type_mismatch",
              "Video Content-Type does not match the prepared file",
            );
          }
          const declaredLength = req.get("content-length");
          if (
            declaredLength &&
            Number.parseInt(declaredLength, 10) !== revalidated.file.size
          ) {
            throw new ApiError(
              400,
              "size_mismatch",
              "Video body size does not match the prepared file",
            );
          }

          const tokens = await ensureFreshTokens(
            req.tiktokSessionId,
            session,
          );
          const initialized = await tiktok.initializeUpload(
            tokens.accessToken,
            revalidated,
          );
          session.publishes[initialized.publishId] = {
            mode: revalidated.mode,
            createdAt: now(),
            consent: revalidated.consent,
            consentAuditId: revalidated.consentAuditId,
          };
          await store.set(req.tiktokSessionId, session);
          return {
            ...initialized,
            ticket: revalidated,
          };
        },
      );

      await tiktok.uploadStream({
        uploadUrl: prepared.uploadUrl,
        stream: inspected.stream,
        size: prepared.ticket.file.size,
        contentType: prepared.ticket.file.type,
      });
      if (inspected.bytesReceived() !== prepared.ticket.file.size) {
        throw new ApiError(
          400,
          "size_mismatch",
          "Received video size does not match the prepared file",
        );
      }
      res.status(202).json({
        publishId: prepared.publishId,
        mode: prepared.ticket.mode,
      });
    } catch (error) {
      const effectiveError = inspected?.error() || error;
      if (!req.readableEnded) {
        req.resume();
      }
      inspected?.stream.destroy();
      next(effectiveError);
    }
  });

  app.use(express.json({ limit: MAX_JSON_BYTES, strict: true }));

  app.post("/api/tiktok/disconnect", async (req, res, next) => {
    try {
      requireOriginAndCsrf(req, config);
      const replacement = emptySession(now());
      const replacementId = opaqueToken(SESSION_ID_BYTES);
      await withSessionLock(req.tiktokSessionId, async () => {
        if (req.tiktokSessionPersisted) {
          await store.rotate(
            req.tiktokSessionId,
            replacementId,
            replacement,
          );
        }
      });
      res.setHeader(
        "Set-Cookie",
        serializeSessionCookie(config, replacementId),
      );
      res.json({
        connected: false,
        csrfToken: replacement.csrfToken,
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/tiktok/prepare", async (req, res, next) => {
    try {
      requireMutationGuards(req, config);
      const ticketId = await withSessionLock(
        req.tiktokSessionId,
        async () => {
          const session = await loadFreshSession(req.tiktokSessionId);
          const creator = await latestCreator(
            req.tiktokSessionId,
            session,
          );
          const input = validatePrepareBody(
            req.body,
            config,
            creator,
            now(),
          );
          const consentAuditId = opaqueToken(TICKET_ID_BYTES);
          const consentAuditRecord = {
            version: 1,
            createdAt: input.consent.acceptedAt,
            expiresAt:
              input.consent.acceptedAt +
              config.consentAuditRetentionMs,
            accountOpenIdHash: hashValue(session.tokens.openId),
            accountUsername: creator.username,
            mode: input.mode,
            titleHash: hashValue(input.title),
            privacyLevel: input.privacyLevel,
            fileNameHash: hashValue(input.file.name),
            fileSize: input.file.size,
            fileType: input.file.type,
            durationSeconds: input.file.durationSeconds,
            consent: input.consent,
          };
          await consentAuditStore.set(
            consentAuditId,
            consentAuditRecord,
          );
          input.consentAuditId = consentAuditId;
          const id = opaqueToken(TICKET_ID_BYTES);
          session.tickets[id] = {
            input,
            createdAt: now(),
            expiresAt: now() + config.uploadTicketTtlMs,
            consumed: false,
          };
          await store.set(req.tiktokSessionId, session);
          return id;
        },
      );
      res.status(201).json({ ticketId });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/tiktok/publish-status", async (req, res, next) => {
    try {
      requireMutationGuards(req, config);
      const publishId =
        typeof req.body?.publishId === "string"
          ? req.body.publishId
          : "";
      if (!publishId || publishId.length > 512) {
        throw new ApiError(
          400,
          "invalid_publish_id",
          "publishId is required",
        );
      }

      const normalized = await withSessionLock(
        req.tiktokSessionId,
        async () => {
          const session = await loadFreshSession(req.tiktokSessionId);
          if (!session.publishes?.[publishId]) {
            throw new ApiError(
              404,
              "publish_not_found",
              "Publish operation was not found in this session",
            );
          }
          const tokens = await ensureFreshTokens(
            req.tiktokSessionId,
            session,
          );
          return tiktok.publishStatus(tokens.accessToken, publishId);
        },
      );
      res.json(normalized);
    } catch (error) {
      next(error);
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      error: {
        code: "not_found",
        message: "Endpoint not found",
      },
    });
  });

  app.use((error, _req, res, _next) => {
    if (res.headersSent) {
      return;
    }

    if (error instanceof SyntaxError && error.status === 400) {
      res.status(400).json({
        error: {
          code: "invalid_json",
          message: "Request body is not valid JSON",
        },
      });
      return;
    }

    if (error?.type === "entity.too.large" || error?.status === 413) {
      res.status(413).json({
        error: {
          code: "request_too_large",
          message: "Request body is too large",
        },
      });
      return;
    }

    if (error instanceof ApiError) {
      res.status(error.status).json({
        error: {
          code: error.code,
          message: error.message,
        },
      });
      return;
    }

    if (error instanceof TikTokProviderError) {
      res.status(error.status).json({
        error: {
          code: error.code,
          message: error.message,
        },
      });
      return;
    }

    console.error("[centrlp-tiktok] request failed", {
      name: error?.name || "Error",
      code: error?.code || "unexpected_error",
    });
    res.status(500).json({
      error: {
        code: "internal_error",
        message: "Internal service error",
      },
    });
  });

  return app;
}
