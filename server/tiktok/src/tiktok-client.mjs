const JSON_HEADERS = Object.freeze({
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
});

export class TikTokProviderError extends Error {
  constructor(message, { code = "provider_error", status = 502 } = {}) {
    super(message);
    this.name = "TikTokProviderError";
    this.code = code;
    this.status = status;
  }
}

function bearerHeaders(accessToken) {
  return {
    ...JSON_HEADERS,
    Authorization: `Bearer ${accessToken}`,
  };
}

function toScopeSet(value) {
  if (Array.isArray(value)) {
    return new Set(value.map((item) => String(item).trim()).filter(Boolean));
  }
  return new Set(
    String(value || "")
      .split(/[,\s]+/)
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

function assertRequiredScopes(value, requiredScopes) {
  const granted = toScopeSet(value);
  const missing = requiredScopes.filter((scope) => !granted.has(scope));
  if (missing.length > 0) {
    throw new TikTokProviderError("TikTok did not grant all required scopes", {
      code: "missing_scopes",
      status: 403,
    });
  }
  return [...granted];
}

async function parseJson(response) {
  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new TikTokProviderError("TikTok returned an invalid response", {
      code: "invalid_provider_response",
    });
  }

  if (!response.ok) {
    const providerCode =
      payload?.error?.code || payload?.error || `http_${response.status}`;
    throw new TikTokProviderError("TikTok request was rejected", {
      code: String(providerCode),
      status:
        response.status === 401 || response.status === 403
          ? response.status
          : 502,
    });
  }

  if (payload?.error && payload.error.code && payload.error.code !== "ok") {
    throw new TikTokProviderError("TikTok request was rejected", {
      code: String(payload.error.code),
      status: payload.error.code === "access_token_invalid" ? 401 : 502,
    });
  }

  return payload;
}

function tokenPayload(
  payload,
  requiredScopes,
  issuedAt,
  previousRefreshExpiry = null,
) {
  const accessToken = String(payload?.access_token || "");
  const refreshToken = String(payload?.refresh_token || "");
  const openId = String(payload?.open_id || "");
  const expiresIn = Number(payload?.expires_in);
  const refreshExpiresIn = Number(payload?.refresh_expires_in);

  if (
    !accessToken ||
    !refreshToken ||
    !openId ||
    !Number.isFinite(expiresIn) ||
    expiresIn <= 0
  ) {
    throw new TikTokProviderError("TikTok returned an incomplete token set", {
      code: "incomplete_token_set",
    });
  }

  return {
    accessToken,
    refreshToken,
    openId,
    scopes: assertRequiredScopes(payload.scope, requiredScopes),
    accessExpiresAt: issuedAt + expiresIn * 1000,
    refreshExpiresAt:
      Number.isFinite(refreshExpiresIn) && refreshExpiresIn > 0
        ? issuedAt + refreshExpiresIn * 1000
        : previousRefreshExpiry,
    issuedAt,
  };
}

function validateUploadUrl(uploadUrl) {
  let url;
  try {
    url = new URL(uploadUrl);
  } catch {
    throw new TikTokProviderError("TikTok returned an invalid upload URL", {
      code: "invalid_upload_url",
    });
  }

  const hostname = url.hostname.toLowerCase();
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    !(
      hostname === "open-upload.tiktokapis.com" ||
      hostname.endsWith(".tiktokapis.com")
    )
  ) {
    throw new TikTokProviderError("TikTok returned an untrusted upload URL", {
      code: "untrusted_upload_url",
    });
  }

  return url.toString();
}

export class TikTokClient {
  #config;
  #fetch;
  #now;

  constructor(
    config,
    { fetchImpl = globalThis.fetch, now = () => Date.now() } = {},
  ) {
    if (typeof fetchImpl !== "function") {
      throw new Error("TikTokClient requires fetch");
    }
    this.#config = config;
    this.#fetch = fetchImpl;
    this.#now = now;
  }

  authorizationUrl(state) {
    const url = new URL(this.#config.tiktokAuthorizationUrl);
    url.searchParams.set("client_key", this.#config.clientKey);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", this.#config.scopes.join(","));
    url.searchParams.set("redirect_uri", this.#config.redirectUri);
    url.searchParams.set("state", state);
    return url.toString();
  }

  async exchangeCode(code) {
    const body = new URLSearchParams({
      client_key: this.#config.clientKey,
      client_secret: this.#config.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: this.#config.redirectUri,
    });
    const response = await this.#fetch(this.#config.tiktokTokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      signal: AbortSignal.timeout(20_000),
    });
    return tokenPayload(
      await parseJson(response),
      this.#config.scopes,
      this.#now(),
    );
  }

  async refreshTokens(tokens) {
    if (
      tokens.refreshExpiresAt &&
      tokens.refreshExpiresAt <= this.#now()
    ) {
      throw new TikTokProviderError("TikTok refresh authorization expired", {
        code: "refresh_token_expired",
        status: 401,
      });
    }

    const body = new URLSearchParams({
      client_key: this.#config.clientKey,
      client_secret: this.#config.clientSecret,
      grant_type: "refresh_token",
      refresh_token: tokens.refreshToken,
    });
    const response = await this.#fetch(this.#config.tiktokTokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      signal: AbortSignal.timeout(20_000),
    });
    const payload = await parseJson(response);
    return tokenPayload(
      payload,
      this.#config.scopes,
      this.#now(),
      tokens.refreshExpiresAt,
    );
  }

  async creatorInfo(accessToken) {
    const response = await this.#fetch(
      `${this.#config.tiktokApiOrigin}/v2/post/publish/creator_info/query/`,
      {
        method: "POST",
        headers: bearerHeaders(accessToken),
        body: "{}",
        signal: AbortSignal.timeout(20_000),
      },
    );
    const payload = await parseJson(response);
    const data = payload?.data;

    if (
      !data ||
      typeof data.creator_username !== "string" ||
      !Array.isArray(data.privacy_level_options)
    ) {
      throw new TikTokProviderError("TikTok returned incomplete creator info", {
        code: "incomplete_creator_info",
      });
    }

    return {
      avatarUrl:
        typeof data.creator_avatar_url === "string"
          ? data.creator_avatar_url
          : "",
      nickname:
        typeof data.creator_nickname === "string"
          ? data.creator_nickname
          : "",
      username: data.creator_username.replace(/^@/, ""),
      privacyOptions: data.privacy_level_options.map(String),
      commentDisabled: Boolean(data.comment_disabled),
      duetDisabled: Boolean(data.duet_disabled),
      stitchDisabled: Boolean(data.stitch_disabled),
      maxVideoDurationSeconds: Number(data.max_video_post_duration_sec) || 0,
    };
  }

  async initializeUpload(accessToken, ticket) {
    const sourceInfo = {
      source: "FILE_UPLOAD",
      video_size: ticket.file.size,
      chunk_size: ticket.file.size,
      total_chunk_count: 1,
    };
    const direct = ticket.mode === "direct";
    const endpoint = direct
      ? "/v2/post/publish/video/init/"
      : "/v2/post/publish/inbox/video/init/";
    const body = direct
      ? {
          post_info: {
            title: ticket.title,
            privacy_level: ticket.privacyLevel,
            disable_comment: ticket.disableComment,
            disable_duet: ticket.disableDuet,
            disable_stitch: ticket.disableStitch,
            brand_content_toggle: ticket.brandContentToggle,
            brand_organic_toggle: ticket.brandOrganicToggle,
            is_aigc: ticket.isAigc,
          },
          source_info: sourceInfo,
        }
      : { source_info: sourceInfo };

    const response = await this.#fetch(
      `${this.#config.tiktokApiOrigin}${endpoint}`,
      {
        method: "POST",
        headers: bearerHeaders(accessToken),
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(20_000),
      },
    );
    const payload = await parseJson(response);
    const publishId = String(payload?.data?.publish_id || "");
    const uploadUrl = String(payload?.data?.upload_url || "");

    if (!publishId || !uploadUrl) {
      throw new TikTokProviderError("TikTok did not provide an upload target", {
        code: "missing_upload_target",
      });
    }

    return {
      publishId,
      uploadUrl: validateUploadUrl(uploadUrl),
    };
  }

  async uploadStream({ uploadUrl, stream, size, contentType }) {
    let response;
    try {
      response = await this.#fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
          "Content-Length": String(size),
          "Content-Range": `bytes 0-${size - 1}/${size}`,
        },
        body: stream,
        duplex: "half",
        signal: AbortSignal.timeout(180_000),
      });
    } catch {
      throw new TikTokProviderError("TikTok video transfer failed", {
        code: "upload_transport_error",
      });
    }

    if (!response.ok) {
      await response.body?.cancel().catch(() => {});
      throw new TikTokProviderError("TikTok video transfer failed", {
        code: `upload_http_${response.status}`,
      });
    }

    await response.arrayBuffer();
  }

  async publishStatus(accessToken, publishId) {
    const response = await this.#fetch(
      `${this.#config.tiktokApiOrigin}/v2/post/publish/status/fetch/`,
      {
        method: "POST",
        headers: bearerHeaders(accessToken),
        body: JSON.stringify({ publish_id: publishId }),
        signal: AbortSignal.timeout(20_000),
      },
    );
    const payload = await parseJson(response);
    const providerStatus = String(payload?.data?.status || "");
    const failReason =
      typeof payload?.data?.fail_reason === "string"
        ? payload.data.fail_reason
        : undefined;

    if (providerStatus === "PUBLISH_COMPLETE") {
      return { status: "PUBLISH_COMPLETE" };
    }
    if (providerStatus === "SEND_TO_USER_INBOX") {
      return { status: "SEND_TO_USER_INBOX" };
    }
    if (providerStatus === "FAILED") {
      return {
        status: "FAILED",
        ...(failReason ? { failReason } : {}),
      };
    }
    if (
      providerStatus === "PROCESSING_UPLOAD" ||
      providerStatus === "PROCESSING_DOWNLOAD" ||
      providerStatus === "PROCESSING"
    ) {
      return { status: "PROCESSING" };
    }

    throw new TikTokProviderError("TikTok returned an unknown publish status", {
      code: "unknown_publish_status",
    });
  }
}
