import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import {
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createApp } from "../src/app.mjs";
import {
  CENTRLP_TIKTOK_APP_ID,
  configForTests,
  loadConfig,
} from "../src/config.mjs";
import { EncryptedSessionStore } from "../src/crypto-store.mjs";
import { TikTokClient } from "../src/tiktok-client.mjs";

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function cookieFrom(response) {
  const setCookie = response.headers.get("set-cookie");
  assert.ok(setCookie, "response must set an opaque session cookie");
  return setCookie.split(";", 1)[0];
}

async function withService(
  { complianceApproved = true, fetchImpl, clock } = {},
  operation,
) {
  const temporaryDirectory = await mkdtemp(
    path.join(os.tmpdir(), "centrlp-tiktok-test-"),
  );
  const config = configForTests({
    complianceApproved,
    sessionStorePath: path.join(temporaryDirectory, "sessions.enc.json"),
    consentAuditPath: path.join(
      temporaryDirectory,
      "consent-audit.enc.json",
    ),
  });
  const app = await createApp({
    config,
    fetchImpl:
      fetchImpl ||
      (async () => {
        throw new Error("Unexpected provider request");
      }),
    now: clock || (() => Date.now()),
  });
  const server = http.createServer(app);

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;

  try {
    await operation({
      origin,
      config,
      store: app.locals.tiktokStore,
      consentAuditStore: app.locals.tiktokConsentAuditStore,
    });
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await app.locals.closeTikTokService();
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

test("loadConfig requires an explicit environment and isolated credentials", () => {
  const shared = {
    TIKTOK_APP_ID: CENTRLP_TIKTOK_APP_ID,
    TIKTOK_PUBLIC_ORIGIN: "https://centrlp.ru",
    TIKTOK_REDIRECT_URI: "https://centrlp.ru/tiktok/callback",
    TIKTOK_SESSION_MASTER_KEY: randomBytes(32).toString("base64url"),
  };

  assert.throws(
    () => loadConfig(shared),
    /TIKTOK_ENVIRONMENT is required/,
  );
  assert.throws(
    () =>
      loadConfig({
        ...shared,
        TIKTOK_ENVIRONMENT: "production",
        TIKTOK_EXPECTED_OPEN_ID: "production-open-id",
      }),
    /TIKTOK_PRODUCTION_CLIENT_KEY is required/,
  );
  assert.throws(
    () =>
      loadConfig({
        ...shared,
        TIKTOK_ENVIRONMENT: "production",
        TIKTOK_PRODUCTION_CLIENT_KEY: "production-key",
        TIKTOK_PRODUCTION_CLIENT_SECRET: "production-secret",
      }),
    /TIKTOK_EXPECTED_OPEN_ID is required in production/,
  );
  assert.throws(
    () =>
      loadConfig({
        ...shared,
        TIKTOK_ENVIRONMENT: "sandbox",
        TIKTOK_SANDBOX_CLIENT_KEY: "sandbox-key",
        TIKTOK_SANDBOX_CLIENT_SECRET: "sandbox-secret",
        TIKTOK_PRODUCTION_CLIENT_KEY: "production-key",
      }),
    /TIKTOK_PRODUCTION credentials must not be present/,
  );

  const sandbox = loadConfig({
    ...shared,
    TIKTOK_ENVIRONMENT: "sandbox",
    TIKTOK_SANDBOX_CLIENT_KEY: "sandbox-key",
    TIKTOK_SANDBOX_CLIENT_SECRET: "sandbox-secret",
  });
  assert.equal(sandbox.environment, "sandbox");
  assert.equal(sandbox.clientKey, "sandbox-key");
  assert.equal(sandbox.complianceApproved, false);
  assert.equal(sandbox.port, 3023);
});

test("encrypted store keeps tokens out of plaintext and detects tampering", async () => {
  const temporaryDirectory = await mkdtemp(
    path.join(os.tmpdir(), "centrlp-tiktok-store-"),
  );
  const filePath = path.join(temporaryDirectory, "sessions.enc.json");
  const masterKey = randomBytes(32);

  try {
    const store = new EncryptedSessionStore({ filePath, masterKey });
    await store.init();
    await store.set("opaque-session-id", {
      tokens: {
        accessToken: "access-supersecret",
        refreshToken: "refresh-supersecret",
      },
    });

    const raw = await readFile(filePath, "utf8");
    assert.doesNotMatch(raw, /access-supersecret|refresh-supersecret/);
    assert.deepEqual(await store.get("opaque-session-id"), {
      tokens: {
        accessToken: "access-supersecret",
        refreshToken: "refresh-supersecret",
      },
    });
    await store.close();

    const document = JSON.parse(raw);
    const sealed = document.records["opaque-session-id"];
    sealed.ciphertext =
      (sealed.ciphertext[0] === "A" ? "B" : "A") +
      sealed.ciphertext.slice(1);
    await writeFile(filePath, JSON.stringify(document), "utf8");

    const reopened = new EncryptedSessionStore({ filePath, masterKey });
    await reopened.init();
    await assert.rejects(
      reopened.get("opaque-session-id"),
      /authentication failed/,
    );
    await reopened.close();
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

test("encrypted store refuses a second active writer", async () => {
  const temporaryDirectory = await mkdtemp(
    path.join(os.tmpdir(), "centrlp-tiktok-lock-"),
  );
  const filePath = path.join(temporaryDirectory, "sessions.enc.json");
  const masterKey = randomBytes(32);
  const first = new EncryptedSessionStore({ filePath, masterKey });
  const second = new EncryptedSessionStore({ filePath, masterKey });

  try {
    await first.init();
    await assert.rejects(
      second.init(),
      /already has an active writer/,
    );
    await first.close();
    await second.init();
    await second.close();
  } finally {
    await first.close().catch(() => {});
    await second.close().catch(() => {});
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});

test("inbox initialization uses TikTok inbox endpoint without direct-post settings", async () => {
  let requestTarget = "";
  let requestBody;
  const client = new TikTokClient(configForTests(), {
    fetchImpl: async (url, init) => {
      requestTarget = String(url);
      requestBody = JSON.parse(init.body);
      return jsonResponse({
        data: {
          publish_id: "inbox-publish-123",
          upload_url:
            "https://open-upload.tiktokapis.com/video/?upload_token=inbox-only",
        },
        error: { code: "ok", message: "", log_id: "test" },
      });
    },
  });

  const initialized = await client.initializeUpload("access-token", {
    mode: "inbox",
    title: "Не передаётся в inbox init",
    privacyLevel: "",
    disableComment: true,
    disableDuet: true,
    disableStitch: true,
    brandContentToggle: false,
    brandOrganicToggle: true,
    isAigc: true,
    file: {
      name: "reel.m4v",
      size: 1024,
      type: "video/x-m4v",
      durationSeconds: 10,
    },
  });

  assert.ok(
    requestTarget.endsWith("/v2/post/publish/inbox/video/init/"),
  );
  assert.equal(requestBody.post_info, undefined);
  assert.deepEqual(requestBody.source_info, {
    source: "FILE_UPLOAD",
    video_size: 1024,
    chunk_size: 1024,
    total_chunk_count: 1,
  });
  assert.equal(initialized.publishId, "inbox-publish-123");
});

test("compliance gate is fail-closed without any provider transfer", async () => {
  let providerCalls = 0;
  await withService(
    {
      complianceApproved: false,
      fetchImpl: async () => {
        providerCalls += 1;
        throw new Error("Provider must not be called");
      },
    },
    async ({ origin, store }) => {
      const status = await fetch(`${origin}/api/tiktok/status`, {
        redirect: "manual",
      });
      assert.equal(status.status, 200);
      const cookie = cookieFrom(status);
      const body = await status.json();
      assert.equal(body.complianceApproved, false);
      assert.equal(body.connected, false);
      const storedDocument = JSON.parse(
        await readFile(store.filePath, "utf8"),
      );
      assert.equal(Object.keys(storedDocument.records).length, 0);

      const connect = await fetch(`${origin}/api/tiktok/connect`, {
        headers: {
          Cookie: cookie,
          Referer: "https://centrlp.ru/tiktok",
        },
        redirect: "manual",
      });
      assert.equal(connect.status, 451);

      const prepare = await fetch(`${origin}/api/tiktok/prepare`, {
        method: "POST",
        headers: {
          Cookie: cookie,
          Origin: "https://centrlp.ru",
          "X-CSRF-Token": body.csrfToken,
          "Content-Type": "application/json",
        },
        body: "{}",
      });
      assert.equal(prepare.status, 451);

      const disconnect = await fetch(`${origin}/api/tiktok/disconnect`, {
        method: "POST",
        headers: {
          Cookie: cookie,
          Origin: "https://centrlp.ru",
          "X-CSRF-Token": body.csrfToken,
        },
      });
      assert.equal(disconnect.status, 403);

      const sessionId = cookie.split("=", 2)[1];
      await store.set(sessionId, {
        version: 1,
        createdAt: 1_800_000_000_000,
        lastSeenAt: 1_800_000_000_000,
        csrfToken: body.csrfToken,
        oauth: null,
        tokens: {
          accessToken: "encrypted-only-access",
          refreshToken: "encrypted-only-refresh",
          openId: "expected-open-id",
          accessExpiresAt: 1_800_003_600_000,
          refreshExpiresAt: 1_800_086_400_000,
          scopes: [
            "user.info.basic",
            "video.upload",
            "video.publish",
          ],
        },
        creator: {
          avatarUrl: "",
          nickname: "Центр ЛП",
          username: "centrlp",
          privacyOptions: ["SELF_ONLY"],
          commentDisabled: false,
          duetDisabled: false,
          stitchDisabled: false,
          maxVideoDurationSeconds: 600,
        },
        tickets: {},
        publishes: {},
      });
      const persistedDisconnect = await fetch(
        `${origin}/api/tiktok/disconnect`,
        {
        method: "POST",
        headers: {
          Cookie: cookie,
          Origin: "https://centrlp.ru",
          "X-CSRF-Token": body.csrfToken,
        },
        },
      );
      assert.equal(persistedDisconnect.status, 200);
      assert.equal(providerCalls, 0);
    },
  );
});

test("status clears expired authorization and remains reconnectable", async () => {
  let currentTime = 1_800_000_000_000;
  const providerFetch = async (url, init = {}) => {
    const target = String(url);
    if (target.endsWith("/v2/oauth/token/")) {
      const body = new URLSearchParams(init.body);
      if (body.get("grant_type") === "authorization_code") {
        return jsonResponse({
          access_token: "short-access",
          refresh_token: "expired-refresh",
          open_id: "expected-open-id",
          expires_in: 1,
          refresh_expires_in: 3_600,
          scope: "user.info.basic,video.upload,video.publish",
        });
      }
      return jsonResponse(
        {
          error: "invalid_grant",
          error_description: "Refresh token expired",
        },
        400,
      );
    }
    if (target.endsWith("/v2/post/publish/creator_info/query/")) {
      return jsonResponse({
        data: {
          creator_avatar_url: "",
          creator_username: "centrlp",
          creator_nickname: "Центр ЛП",
          privacy_level_options: ["SELF_ONLY"],
          comment_disabled: false,
          duet_disabled: false,
          stitch_disabled: false,
          max_video_post_duration_sec: 600,
        },
        error: { code: "ok", message: "", log_id: "test" },
      });
    }
    throw new Error(`Unexpected mocked provider URL: ${target}`);
  };

  await withService(
    {
      fetchImpl: providerFetch,
      clock: () => currentTime,
    },
    async ({ origin }) => {
      const initial = await fetch(`${origin}/api/tiktok/status`);
      let cookie = cookieFrom(initial);

      const connect = await fetch(`${origin}/api/tiktok/connect`, {
        headers: {
          Cookie: cookie,
          Referer: "https://centrlp.ru/tiktok",
        },
        redirect: "manual",
      });
      cookie = cookieFrom(connect);
      const authorizationUrl = new URL(connect.headers.get("location"));
      const state = authorizationUrl.searchParams.get("state");

      const callback = await fetch(
        `${origin}/tiktok/callback?code=authorization-code&state=${encodeURIComponent(
          state,
        )}`,
        {
          headers: { Cookie: cookie },
          redirect: "manual",
        },
      );
      assert.equal(
        callback.headers.get("location"),
        "https://centrlp.ru/tiktok?status=connected",
      );
      cookie = cookieFrom(callback);
      currentTime += 2_000;

      const expiredStatus = await fetch(`${origin}/api/tiktok/status`, {
        headers: { Cookie: cookie },
      });
      assert.equal(expiredStatus.status, 200);
      const body = await expiredStatus.json();
      assert.equal(body.configured, true);
      assert.equal(body.connected, false);
      assert.match(body.csrfToken, /^[A-Za-z0-9_-]{43}$/);
      assert.equal(body.creator, undefined);
    },
  );
});

test("OAuth, token rotation, direct upload, and status use mocked TikTok only", async () => {
  let currentTime = 1_800_000_000_000;
  const providerCalls = [];
  let uploadedBody = Buffer.alloc(0);

  const providerFetch = async (url, init = {}) => {
    const target = String(url);
    providerCalls.push({
      target,
      method: init.method,
      authorization: init.headers?.Authorization,
    });

    if (target.endsWith("/v2/oauth/token/")) {
      const body = new URLSearchParams(init.body);
      if (body.get("grant_type") === "authorization_code") {
        assert.equal(body.get("client_secret"), "test-client-secret");
        return jsonResponse({
          access_token: "access-one",
          refresh_token: "refresh-one",
          open_id: "expected-open-id",
          expires_in: 3600,
          refresh_expires_in: 31_536_000,
          scope: "user.info.basic,video.upload,video.publish",
        });
      }
      assert.equal(body.get("grant_type"), "refresh_token");
      assert.equal(body.get("refresh_token"), "refresh-one");
      return jsonResponse({
        access_token: "access-two",
        refresh_token: "refresh-two",
        open_id: "expected-open-id",
        expires_in: 86_400,
        refresh_expires_in: 31_536_000,
        scope: "user.info.basic,video.upload,video.publish",
      });
    }

    if (target.endsWith("/v2/post/publish/creator_info/query/")) {
      assert.match(init.headers.Authorization, /^Bearer access-(one|two)$/);
      return jsonResponse({
        data: {
          creator_avatar_url: "https://p16.example/avatar.jpeg",
          creator_username: "centrlp",
          creator_nickname: "Центр ЛП",
          privacy_level_options: ["SELF_ONLY", "PUBLIC_TO_EVERYONE"],
          comment_disabled: false,
          duet_disabled: false,
          stitch_disabled: false,
          max_video_post_duration_sec: 600,
        },
        error: { code: "ok", message: "", log_id: "test" },
      });
    }

    if (target.endsWith("/v2/post/publish/video/init/")) {
      assert.equal(init.headers.Authorization, "Bearer access-two");
      const body = JSON.parse(init.body);
      assert.equal(body.post_info.privacy_level, "SELF_ONLY");
      assert.equal(body.post_info.brand_organic_toggle, true);
      assert.equal(body.post_info.is_aigc, true);
      assert.equal(body.source_info.total_chunk_count, 1);
      return jsonResponse({
        data: {
          publish_id: "publish-123",
          upload_url:
            "https://open-upload.tiktokapis.com/video/?upload_token=never-log",
        },
        error: { code: "ok", message: "", log_id: "test" },
      });
    }

    if (target.startsWith("https://open-upload.tiktokapis.com/video/")) {
      const chunks = [];
      for await (const chunk of init.body) {
        chunks.push(Buffer.from(chunk));
      }
      uploadedBody = Buffer.concat(chunks);
      assert.equal(
        init.headers["Content-Range"],
        `bytes 0-${uploadedBody.length - 1}/${uploadedBody.length}`,
      );
      return new Response("", { status: 201 });
    }

    if (target.endsWith("/v2/post/publish/status/fetch/")) {
      assert.equal(init.headers.Authorization, "Bearer access-two");
      assert.deepEqual(JSON.parse(init.body), {
        publish_id: "publish-123",
      });
      return jsonResponse({
        data: { status: "PUBLISH_COMPLETE" },
        error: { code: "ok", message: "", log_id: "test" },
      });
    }

    throw new Error(`Unexpected mocked provider URL: ${target}`);
  };

  await withService(
    {
      fetchImpl: providerFetch,
      clock: () => currentTime,
    },
    async ({ origin, store, consentAuditStore }) => {
      const initialStatus = await fetch(`${origin}/api/tiktok/status`);
      let cookie = cookieFrom(initialStatus);
      let statusBody = await initialStatus.json();
      assert.equal(statusBody.connected, false);

      const connect = await fetch(`${origin}/api/tiktok/connect`, {
        headers: {
          Cookie: cookie,
          Referer: "https://centrlp.ru/tiktok",
        },
        redirect: "manual",
      });
      assert.equal(connect.status, 302);
      cookie = cookieFrom(connect);
      const authorizationUrl = new URL(connect.headers.get("location"));
      assert.equal(
        authorizationUrl.origin,
        "https://www.tiktok.com",
      );
      assert.equal(
        authorizationUrl.searchParams.get("scope"),
        "user.info.basic,video.upload,video.publish",
      );
      const state = authorizationUrl.searchParams.get("state");
      assert.ok(state);

      const callback = await fetch(
        `${origin}/tiktok/callback?code=authorization-code&state=${encodeURIComponent(
          state,
        )}`,
        {
          headers: { Cookie: cookie },
          redirect: "manual",
        },
      );
      assert.equal(callback.status, 303);
      assert.equal(
        callback.headers.get("location"),
        "https://centrlp.ru/tiktok?status=connected",
      );
      const rotatedCookie = cookieFrom(callback);
      assert.notEqual(rotatedCookie, cookie);
      cookie = rotatedCookie;

      currentTime += 3_590_000;
      const connectedStatus = await fetch(`${origin}/api/tiktok/status`, {
        headers: { Cookie: cookie },
      });
      statusBody = await connectedStatus.json();
      assert.equal(statusBody.connected, true);
      assert.equal(statusBody.creator.username, "centrlp");
      assert.equal(statusBody.environment, "sandbox");
      const csrfToken = statusBody.csrfToken;

      const invalidVideo = Buffer.alloc(24, 0x41);
      const invalidPreparePayload = {
        mode: "direct",
        title: "Invalid container check",
        privacyLevel: "SELF_ONLY",
        disableComment: false,
        disableDuet: false,
        disableStitch: false,
        brandContentToggle: false,
        brandOrganicToggle: true,
        isAigc: true,
        consent: {
          rightsAndMusic: true,
          publish: true,
          dataTransfer: true,
          version: "centrlp-tiktok-2026-07-27-v1",
        },
        file: {
          name: "invalid.mp4",
          size: invalidVideo.length,
          type: "video/mp4",
          durationSeconds: 1,
        },
      };
      const invalidPrepare = await fetch(`${origin}/api/tiktok/prepare`, {
        method: "POST",
        headers: {
          Cookie: cookie,
          Origin: "https://centrlp.ru",
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invalidPreparePayload),
      });
      const invalidTicket = (await invalidPrepare.json()).ticketId;
      const invalidUpload = await fetch(
        `${origin}/api/tiktok/upload/${invalidTicket}`,
        {
          method: "PUT",
          headers: {
            Cookie: cookie,
            Origin: "https://centrlp.ru",
            "X-CSRF-Token": csrfToken,
            "Content-Type": "video/mp4",
          },
          body: invalidVideo,
        },
      );
      assert.equal(invalidUpload.status, 400);
      assert.equal(
        (await invalidUpload.json()).error.code,
        "invalid_video_signature",
      );
      assert.equal(
        providerCalls.filter((call) =>
          call.target.endsWith("/v2/post/publish/video/init/"),
        ).length,
        0,
      );

      const video = Buffer.concat([
        Buffer.from([0x00, 0x00, 0x00, 0x18]),
        Buffer.from("ftypisom", "ascii"),
        Buffer.from("mock-video-payload", "ascii"),
      ]);
      const preparePayload = {
        mode: "direct",
        title: "Проверка публикации",
        privacyLevel: "SELF_ONLY",
        disableComment: false,
        disableDuet: false,
        disableStitch: false,
        brandContentToggle: false,
        brandOrganicToggle: true,
        isAigc: true,
        consent: {
          rightsAndMusic: true,
          publish: true,
          dataTransfer: true,
          version: "centrlp-tiktok-2026-07-27-v1",
        },
        file: {
          name: "reel.mp4",
          size: video.length,
          type: "video/mp4",
          durationSeconds: 12.5,
        },
      };

      const badOrigin = await fetch(`${origin}/api/tiktok/prepare`, {
        method: "POST",
        headers: {
          Cookie: cookie,
          Origin: "https://example.com",
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparePayload),
      });
      assert.equal(badOrigin.status, 403);

      const prepare = await fetch(`${origin}/api/tiktok/prepare`, {
        method: "POST",
        headers: {
          Cookie: cookie,
          Origin: "https://centrlp.ru",
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparePayload),
      });
      assert.equal(prepare.status, 201);
      const { ticketId } = await prepare.json();
      assert.match(ticketId, /^[A-Za-z0-9_-]{32}$/);

      const upload = await fetch(
        `${origin}/api/tiktok/upload/${ticketId}`,
        {
          method: "PUT",
          headers: {
            Cookie: cookie,
            Origin: "https://centrlp.ru",
            "X-CSRF-Token": csrfToken,
            "Content-Type": "video/mp4",
          },
          body: video,
        },
      );
      const uploadText = await upload.text();
      assert.equal(upload.status, 202, uploadText);
      assert.deepEqual(JSON.parse(uploadText), {
        publishId: "publish-123",
        mode: "direct",
      });
      assert.deepEqual(uploadedBody, video);
      const sessionId = cookie.split("=", 2)[1];
      const encryptedSession = await store.get(sessionId);
      const consentAuditId =
        encryptedSession.publishes["publish-123"].consentAuditId;
      assert.match(consentAuditId, /^[A-Za-z0-9_-]{32}$/);
      assert.deepEqual(
        encryptedSession.publishes["publish-123"].consent,
        {
          rightsAndMusic: true,
          publish: true,
          dataTransfer: true,
          version: "centrlp-tiktok-2026-07-27-v1",
          textHash: encryptedSession.publishes["publish-123"].consent.textHash,
          acceptedAt: currentTime,
        },
      );
      assert.match(
        encryptedSession.publishes["publish-123"].consent.textHash,
        /^[A-Za-z0-9_-]{43}$/,
      );
      const consentAudit = await consentAuditStore.get(consentAuditId);
      assert.equal(consentAudit.accountUsername, "centrlp");
      assert.equal(consentAudit.mode, "direct");
      assert.equal(
        consentAudit.consent.version,
        "centrlp-tiktok-2026-07-27-v1",
      );
      assert.equal(
        consentAudit.expiresAt,
        consentAudit.createdAt + 365 * 24 * 60 * 60 * 1000,
      );

      const publishStatus = await fetch(
        `${origin}/api/tiktok/publish-status`,
        {
          method: "POST",
          headers: {
            Cookie: cookie,
            Origin: "https://centrlp.ru",
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publishId: "publish-123" }),
        },
      );
      assert.equal(publishStatus.status, 200);
      assert.deepEqual(await publishStatus.json(), {
        status: "PUBLISH_COMPLETE",
      });

      const disconnect = await fetch(`${origin}/api/tiktok/disconnect`, {
        method: "POST",
        headers: {
          Cookie: cookie,
          Origin: "https://centrlp.ru",
          "X-CSRF-Token": csrfToken,
        },
      });
      assert.equal(disconnect.status, 200);
      assert.ok(await consentAuditStore.get(consentAuditId));

      assert.ok(
        providerCalls.some(
          (call) =>
            call.target.endsWith("/v2/oauth/token/") &&
            call.method === "POST",
        ),
      );
      assert.ok(
        providerCalls.some(
          (call) =>
            call.target.endsWith("/v2/post/publish/video/init/") &&
            call.authorization === "Bearer access-two",
        ),
      );
    },
  );
});
