# CentrLP TikTok service

Separate server-side gateway for TikTok Login Kit and Content Posting API. It
listens only on `127.0.0.1:3023`; the public reverse proxy owns TLS and exposes
the exact `/api/tiktok/*` routes plus `/tiktok/callback`.

The service is deliberately isolated from every other portfolio project. It
accepts only CentrLP app ID `7666838773159905301` and TikTok username
`@centrlp`. Configure `TIKTOK_EXPECTED_OPEN_ID` after the first controlled
authorization to pin the immutable account identifier as well.

## Security model

- Login Kit authorization code exchange and refresh happen only on the server.
- The browser receives an opaque `__Host-centrlp_tiktok` cookie with
  `HttpOnly`, `Secure`, `SameSite=Lax`, and no `Domain` attribute.
- Session payloads and OAuth tokens are encrypted at rest with AES-256-GCM.
  Each record has its own nonce and authenticated session ID.
- A process lock prevents two service instances from writing the same encrypted
  store. A stale lock is removed only when its recorded PID no longer exists.
- The master key comes only from `TIKTOK_SESSION_MASTER_KEY`. It is never
  stored beside the encrypted session file.
- OAuth state expires after 10 minutes and is single-use. Successful login
  rotates both the session ID and CSRF token.
- POST and PUT endpoints require the exact `https://centrlp.ru` Origin and
  `X-CSRF-Token`.
- Upload tickets expire after 10 minutes and are single-use.
- Every accepted upload command stores the server timestamp, consent version,
  and hash of the exact rights, publication, and data-transfer consent text in
  the encrypted session record. A separate encrypted consent-audit record is
  retained independently from OAuth/session deletion for the configured audit
  period (365 days by default). Publish-operation state inside the user session
  is still removed by the hourly sweep after seven days.
- Video bytes stream once from the incoming request to TikTok. They are not
  written to disk. MP4/MOV/M4V and WebM container signatures are checked before
  TikTok upload initialization. The maximum accepted size is 64 MiB.
- Client secret, access token, refresh token, and TikTok upload URL are never
  returned to the browser or intentionally logged.

TikTok access is renewable, not literally permanent. TikTok or the account
owner can revoke authorization, refresh tokens expire, and provider policy can
change. The service rotates refresh tokens when TikTok returns a new token set
and fails closed when refresh authorization is no longer valid.

## Compliance gate

`TIKTOK_CROSS_BORDER_APPROVED` defaults to the fail-closed state. The service
starts and health/status remain available, but connection and every transfer
endpoint return HTTP 451 while the value is not exactly `1`.

Set it to `1` only after the separate Russian personal-data and cross-border
review is complete and every required Roskomnadzor notification or approval is
confirmed. A working draft or an intention to file is not confirmation.

## Sandbox and production

`TIKTOK_ENVIRONMENT` is mandatory and accepts only `sandbox` or `production`.
There is no implicit production default.

- `sandbox` reads `TIKTOK_SANDBOX_CLIENT_KEY` and
  `TIKTOK_SANDBOX_CLIENT_SECRET`.
- `production` reads `TIKTOK_PRODUCTION_CLIENT_KEY` and
  `TIKTOK_PRODUCTION_CLIENT_SECRET`.

Use sandbox for the current TikTok review/demo. Switch the deployed instance to
production credentials only after TikTok approves production access. Never
copy credentials between environments. The process refuses to start if
credentials for the inactive environment are populated. Production also
refuses to start until `TIKTOK_EXPECTED_OPEN_ID` is set.

Required scopes are fixed to:

- `user.info.basic`
- `video.upload`
- `video.publish`

The callback URI is fixed to
`https://centrlp.ru/tiktok/callback`.

## API

All responses use `Cache-Control: no-store`.

### `GET /api/tiktok/status`

Creates or resumes the encrypted session and returns:

```json
{
  "configured": true,
  "environment": "sandbox",
  "complianceApproved": true,
  "connected": true,
  "csrfToken": "opaque-value",
  "creator": {
    "avatarUrl": "https://...",
    "nickname": "Центр ЛП",
    "username": "centrlp",
    "privacyOptions": ["SELF_ONLY"],
    "commentDisabled": false,
    "duetDisabled": false,
    "stitchDisabled": false,
    "maxVideoDurationSeconds": 600
  }
}
```

When the compliance gate is closed, status performs no TikTok API request.

### `GET /api/tiktok/connect`

Must be a navigation from `https://centrlp.ru`. Creates a single-use OAuth state
and redirects to TikTok Login Kit.

### `GET /tiktok/callback`

Exact Login Kit callback. It validates state, exchanges the code server-side,
checks every required scope, verifies `@centrlp`, rotates the session, and
redirects back to `/tiktok` without putting tokens in the URL.

### `POST /api/tiktok/disconnect`

Requires exact Origin and `X-CSRF-Token`. Deletes the authorized server-side
session and returns a fresh anonymous session.

### `POST /api/tiktok/prepare`

Requires exact Origin and `X-CSRF-Token`. It obtains the latest
`creator_info`, validates the current privacy and interaction constraints, and
returns `{ "ticketId": "..." }`.

```json
{
  "mode": "direct",
  "title": "Caption",
  "privacyLevel": "SELF_ONLY",
  "disableComment": false,
  "disableDuet": false,
  "disableStitch": false,
  "brandContentToggle": false,
  "brandOrganicToggle": true,
  "isAigc": true,
  "consent": {
    "rightsAndMusic": true,
    "publish": true,
    "dataTransfer": true,
    "version": "centrlp-tiktok-2026-07-27-v1"
  },
  "file": {
    "name": "reel.mp4",
    "size": 1234567,
    "type": "video/mp4",
    "durationSeconds": 42.5
  }
}
```

### `PUT /api/tiktok/upload/:ticketId`

Requires exact Origin and `X-CSRF-Token`. Send the selected video file itself
as the request body with its video `Content-Type`. Browsers set
`Content-Length` automatically when possible; application JavaScript must not
try to set that forbidden header. The service compares any received length and
the actual streamed byte count with the prepared file size.

The service refreshes creator information again immediately before initializing
the TikTok upload. It calls Inbox Upload for `mode=inbox` or Direct Post for
`mode=direct`, then streams exactly one chunk. Success returns HTTP 202:

```json
{ "publishId": "v_pub_url~...", "mode": "direct" }
```

Inbox Upload still requires the creator to finish editing and posting from the
TikTok inbox. A successful transfer is not a public post.

### `POST /api/tiktok/publish-status`

Requires exact Origin and `X-CSRF-Token`:

```json
{ "publishId": "v_pub_url~..." }
```

Only publish IDs created in the same encrypted session are accepted. Result:

```json
{ "status": "PROCESSING" }
```

Normalized status is one of `PROCESSING`, `PUBLISH_COMPLETE`,
`SEND_TO_USER_INBOX`, or `FAILED`. Failed results may include `failReason`.

### Health

`GET /health` and `GET /api/tiktok/health` return only non-secret service,
environment, and compliance state.

## Install and run

```bash
cd /var/www/centrlp/server/tiktok
npm ci --omit=dev
sudo install -o root -g root -m 0600 /path/to/tiktok.env /etc/centrlp/tiktok.env
sudo install -o root -g root -m 0644 centrlp-tiktok.service /etc/systemd/system/centrlp-tiktok.service
sudo systemctl daemon-reload
sudo systemctl enable --now centrlp-tiktok.service
curl --fail --silent http://127.0.0.1:3023/health
```

The systemd unit creates `/var/lib/centrlp-tiktok` with mode `0700`, runs as an
isolated dynamic system user, and allows writes only to that state directory.

## Verification

Tests use a temporary encrypted store and mocked TikTok responses. They perform
no external mutation:

```bash
npm run check
npm test
```
