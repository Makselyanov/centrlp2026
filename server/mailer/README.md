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
- Лог-файл `logs/leads.jsonl` (append-only JSONL) — audit trail.

## Наблюдение

```bash
sudo journalctl -u centrlp-mailer -f
tail -f /var/log/centrlp-mailer.log
tail -f /var/www/centrlp/server/mailer/logs/leads.jsonl
```
