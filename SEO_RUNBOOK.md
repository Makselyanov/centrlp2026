# SEO Runbook: Yandex Webmaster for centrlp.ru

This file stores the operating rules for Yandex Webmaster access without secrets.

## Files

- Secret file: `G:\mvp\centrlp\.env.seo.local`
- Template: `G:\mvp\centrlp\.env.seo.local.example`
- Runbook: `G:\mvp\centrlp\SEO_RUNBOOK.md`
- SEO config: `G:\mvp\centrlp\SEO_CONFIGURATION.md`
- Report script: `G:\mvp\centrlp\scripts\yandex-webmaster-report.mjs`
- Reports folder: `G:\mvp\centrlp\seo-reports`

## What goes into `.env.seo.local`

```env
YANDEX_WEBMASTER_CLIENT_ID=your_client_id
YANDEX_WEBMASTER_TOKEN=your_oauth_token
YANDEX_WEBMASTER_HOST_URL=https://centrlp.ru/
YANDEX_WEBMASTER_USER_ID=
YANDEX_WEBMASTER_HOST_ID=
YANDEX_WEBMASTER_TOKEN_EXPIRES_AT=2026-09-26
```

Notes:

- `YANDEX_WEBMASTER_TOKEN` is a secret. Keep it only in `.env.seo.local`.
- `YANDEX_WEBMASTER_HOST_URL` for this project should be `https://centrlp.ru/`.
- `YANDEX_WEBMASTER_USER_ID` and `YANDEX_WEBMASTER_HOST_ID` may be left blank initially.
- The script will discover `user_id` and `host_id` after the first successful API call.

## How to get access

1. In the Yandex account that already owns `https://centrlp.ru/`, create an OAuth application.
2. Platform: web services.
3. Redirect URI: `https://oauth.yandex.ru/verification_code`
4. Scopes: `webmaster:hostinfo` and `webmaster:verify`
5. Build the authorization URL:

```text
https://oauth.yandex.ru/authorize?response_type=token&client_id=<client_id>
```

6. Open the URL, authorize, and copy the token.
7. Put the values into `.env.seo.local`.

## Commands

Run the Yandex Webmaster report:

```bash
npm run seo:yandex
```

Optional custom env path:

```bash
node scripts/yandex-webmaster-report.mjs --env G:\path\to\.env.seo.local
```

The script writes local reports to:

- `seo-reports/latest-yandex-webmaster-report.json`
- `seo-reports/latest-yandex-webmaster-report.md`
- `seo-reports/monthly/`

These reports are ignored by git.

## What the script checks

- user ID
- host ID
- site verification state
- summary of indexed/excluded pages and SQI
- active diagnostics from Yandex Webmaster
- user-added sitemap files
- token expiry warning

## Weekly workflow

1. Run `npm run seo:yandex`.
2. Check verification state and that the correct host is selected.
3. Check `FATAL` and `CRITICAL` diagnostics first.
4. Check indexed vs excluded pages.
5. Check that sitemap files are present and current.
6. Compare the output with recent deploys and new content.
7. If there are new problems, fix the code/config and rerun.

## What to do on errors

### 401 Unauthorized

- Token is missing, invalid, or expired.
- Generate a new token and update `.env.seo.local`.

### 403 INVALID_USER_ID

- `YANDEX_WEBMASTER_USER_ID` is wrong for the current token.
- Remove it or replace it with the value discovered by the script.

### 404 HOST_NOT_FOUND

- The site is missing in that Yandex Webmaster account.
- Confirm you used the correct Yandex account and host URL.

### 404 HOST_NOT_VERIFIED

- The site exists in Webmaster but rights are not confirmed.
- Recheck verification from the same account that owns `centrlp.ru`.

## Current project values

- Domain: `https://centrlp.ru/`
- Verified in HTML: the site already contains a Yandex verification meta tag in `index.html`
- Local project root: `G:\mvp\centrlp`

## After you give me the token

After the token is in `.env.seo.local`, I can:

- discover and lock `user_id` and `host_id`
- run regular Yandex Webmaster audits
- prioritize SEO fixes using actual Webmaster data
- track indexation, diagnostics, sitemap health, and visibility blockers
