# CentrLP lead mailer

Небольшой Express-сервис, принимающий POST от формы на `centrlp.ru`
и отправляющий письмо на `1@centrlp.ru` через SMTP Яндекс.

Зачем: раньше форма слала лиды на `formsubmit.co` (США) — это нарушение
ФЗ-242 (локализация ПД). Теперь вся цепочка в РФ.

## Архитектура

```
браузер → POST https://centrlp.ru/api/lead
           ↓ (nginx proxy_pass)
         127.0.0.1:3021 (этот сервис)
           ↓ SMTP TLS
         smtp.yandex.ru:465 → 1@centrlp.ru
```

## Env (читается из `/var/www/centrlp/.env.mailer.local`)

```
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=1@centrlp.ru
SMTP_PASS=<пароль приложения Яндекс, scope=SMTP-only>
LEAD_TO=1@centrlp.ru
LEAD_FROM=1@centrlp.ru
PORT=3021
LEAD_LOG_RETENTION_DAYS=183
```

## Развёртывание

```bash
cd /var/www/centrlp/server/mailer
npm install --omit=dev
sudo cp centrlp-mailer.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now centrlp-mailer
sudo systemctl status centrlp-mailer
```

## nginx

В `/etc/nginx/sites-enabled/centrlp` добавляется блок перед `location /`:

```nginx
location = /api/lead {
    proxy_pass http://127.0.0.1:3021/api/lead;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Защиты

- Rate limit 5 req/min per IP (in-memory).
- Honeypot поле `website` — бот заполнит, человек не увидит.
- Ограничение размера JSON: 16 KB.
- Обрезка длины каждого поля.
- Лог-файл `logs/leads.jsonl` — audit trail с автоматической очисткой старых
  записей по `LEAD_LOG_RETENTION_DAYS` (по умолчанию 183 дня).

## Read-only metrics

`POST /api/lead/event` accepts non-PII funnel events from the browser:

Events with `utm_source=codex_smoke` are retained as synthetic checks but excluded
from real funnel totals. Their count is exposed as `synthetic_events_30d`.
UTM landing views, blog and landing CTA clicks, form submit attempts, successful
submits, errors, messenger clicks, and phone clicks. It stores only normalized event names, page paths,
UTM fields, placement/messenger labels, and referrer host.
Browser session attribution preserves UTM fields after an internal SPA navigation,
so landing and form events remain tied to the article or channel that started the visit.

Every real form submission includes a client-generated `lead_submission_id`. The mailer
returns `accepted=true`, `delivery_status=stored`, and a stable `receipt_id` only after
an atomic receipt is saved on the server. SMTP is a separate notification layer: its
state is returned as `notification_status` and failed notifications are retried. A retry
with the same submission id returns the same receipt and never creates a second lead.
Browser goal `lead_confirmed` is therefore the hard server-receipt signal;
`form_submit_attempt` remains a soft funnel event.
Receipts tagged with `utm_source=codex_smoke` are counted separately as synthetic leads
and never inflate real lead or confirmed-lead totals.

`GET /api/lead/metrics` returns only safe aggregates for route diagnostics:
totals for today, 7/30 days, last lead timestamp, normalized counters by page
path and lead source, plus 30-day event/UTM counters. It never returns raw lead
rows, names, phones, comments, IP addresses, user agents, full URLs, or form
text fields.

Run `npm run test:lead-receipt` from the repository root to verify the receipt,
deduplication, honeypot, and aggregate-metrics contract with an isolated JSON mail transport.

## Наблюдение

```bash
sudo journalctl -u centrlp-mailer -f
tail -f /var/log/centrlp-mailer.log
tail -f /var/www/centrlp/server/mailer/logs/leads.jsonl
```
