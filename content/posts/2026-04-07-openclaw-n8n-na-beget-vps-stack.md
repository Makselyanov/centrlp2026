---
title: "OpenClaw + n8n на Beget VPS: разворачиваем стек автоматизации за 1 день"
date: "2026-04-07"
tags: ["OpenClaw", "n8n", "Beget", "VPS", "автоматизация", "ИИ агент", "контент-завод", "DevOps"]
description: "Готовая инструкция: как поднять связку OpenClaw + n8n + PostgreSQL на VPS Beget за 1 день. Docker Compose, Nginx, SSL, бэкапы. Стек контент-завода под ключ."
---

# OpenClaw + n8n на Beget VPS: разворачиваем стек автоматизации за 1 день

Один OpenClaw — это уже мощно. Но настоящая магия начинается, когда вы соединяете его с **n8n** — open-source платформой для workflow-автоматизации. Получается связка, в которой OpenClaw делает «умную» часть (анализирует, пишет, принимает решения), а n8n — «механическую» (триггеры по расписанию, интеграции с API, отправка в Telegram, запись в CRM).

В **CentrLP** именно эта связка работает в основе нашего **контент-завода**, который ведёт десятки клиентских проектов с одного [VPS Beget](https://beget.com/p7257). В этой статье — детальный гайд, как поднять такой стек у себя за один рабочий день.

> **Что в итоге получите.** Один VPS Beget M (460 ₽/мес.) с Docker Compose, на котором крутятся: OpenClaw, n8n, PostgreSQL, Nginx с SSL, автоматические бэкапы. Полностью изолированная инфраструктура, готовая к боевым задачам.

## Зачем связывать OpenClaw и n8n

Если описать одной фразой:

- **OpenClaw** — мозг, который понимает контекст и принимает решения.
- **n8n** — нервная система, которая слушает события и доставляет команды в нужное место.

Примеры реальных сценариев, которые мы крутим у клиентов:

1. **Утренний контент-план.** В 7:00 n8n запускает workflow → OpenClaw анализирует тренды Wordstat, ВК и Telegram → формирует темы дня → отправляет в Telegram руководителю на утверждение.
2. **Реакция на лид.** Новая заявка с сайта → n8n ловит webhook → передаёт OpenClaw → агент квалифицирует, ищет в базе похожие сделки, готовит ответ → отправляет в CRM и менеджеру.
3. **Мониторинг конкурентов.** Раз в час n8n опрашивает соцсети конкурентов → OpenClaw сравнивает с историей → если есть значимое изменение, шлёт алерт.
4. **Автоответы 24/7.** Сообщение во ВКонтакте → n8n → OpenClaw отвечает с учётом базы знаний клиента → возвращает обратно в ВК через API.

Каждый из этих сценариев работает на одном небольшом VPS.

## Что нам понадобится

- **VPS Beget M** (2 vCPU, 2 ГБ RAM, 40 ГБ NVMe) — 460 ₽/мес. Регистрация по [нашей ссылке Beget](https://beget.com/p7257).
- **Домен** для n8n (можно купить тут же в Beget за ~190 ₽/год).
- **API-ключ выбранной AI-модели**.
- **30 минут на базовую установку** + 4–6 часов на настройку первых workflow.

## Шаг 1. Заказываем VPS и базовая защита

Если ещё не делали — пройдите наш [гайд по установке OpenClaw на Beget](/blog/kak-razvernut-openclaw-na-hostinge-beget) и [чек-лист безопасности](/blog/bezopasnost-openclaw-na-vps-beget). Здесь я буду исходить из того, что у вас:

- Ubuntu 22.04 LTS;
- пользователь `openclaw` с sudo;
- SSH по ключу, root запрещён;
- ufw активен.

## Шаг 2. Установка Docker и Docker Compose

Мы будем разворачивать всё через Docker Compose — это даёт изоляцию, простой откат и удобные бэкапы.

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo usermod -aG docker openclaw
```

Перелогиньтесь, чтобы применить группу. Проверка:

```bash
docker --version
docker compose version
```

## Шаг 3. Структура каталогов

```bash
mkdir -p ~/stack/{openclaw,n8n,postgres,nginx,certbot,backups}
cd ~/stack
```

## Шаг 4. docker-compose.yml

Создайте файл `~/stack/docker-compose.yml`:

```yaml
version: '3.9'

services:
  postgres:
    image: postgres:16-alpine
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: n8n
    volumes:
      - ./postgres:/var/lib/postgresql/data
    networks:
      - stack

  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: always
    environment:
      DB_TYPE: postgresdb
      DB_POSTGRESDB_HOST: postgres
      DB_POSTGRESDB_PORT: 5432
      DB_POSTGRESDB_DATABASE: n8n
      DB_POSTGRESDB_USER: n8n
      DB_POSTGRESDB_PASSWORD: ${POSTGRES_PASSWORD}
      N8N_HOST: ${N8N_HOST}
      N8N_PROTOCOL: https
      WEBHOOK_URL: https://${N8N_HOST}/
      GENERIC_TIMEZONE: Europe/Moscow
      N8N_BASIC_AUTH_ACTIVE: 'true'
      N8N_BASIC_AUTH_USER: ${N8N_USER}
      N8N_BASIC_AUTH_PASSWORD: ${N8N_PASSWORD}
    volumes:
      - ./n8n:/home/node/.n8n
    depends_on:
      - postgres
    networks:
      - stack

  openclaw:
    image: node:20-alpine
    container_name: openclaw
    restart: always
    working_dir: /app
    volumes:
      - ./openclaw:/app
      - ./openclaw-work:/work
    environment:
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
      OPENCLAW_MODEL: provider-model-name
      OPENCLAW_WORKDIR: /work
    command: sh -c "npm install && npm run start"
    networks:
      - stack

  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./certbot/www:/var/www/certbot
      - ./certbot/conf:/etc/letsencrypt
    depends_on:
      - n8n
    networks:
      - stack

networks:
  stack:
    driver: bridge
```

## Шаг 5. Файл `.env`

В том же каталоге `~/stack/` создайте `.env`:

```text
POSTGRES_PASSWORD=сгенерируйте_сложный_пароль
N8N_HOST=n8n.example.ru
N8N_USER=admin
N8N_PASSWORD=ещё_один_сложный_пароль
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
```

Сгенерировать пароли:

```bash
openssl rand -base64 32
```

Закройте файл от посторонних:

```bash
chmod 600 .env
```

## Шаг 6. Конфиг Nginx

Создайте `~/stack/nginx/conf.d/n8n.conf`:

```nginx
server {
    listen 80;
    server_name n8n.example.ru;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name n8n.example.ru;

    ssl_certificate /etc/letsencrypt/live/n8n.example.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/n8n.example.ru/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 50M;

    location / {
        proxy_pass http://n8n:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
}
```

Замените `n8n.example.ru` на ваш реальный поддомен.

## Шаг 7. DNS в панели Beget

Зайдите в панель управления [Beget](https://beget.com/p7257) → раздел **«Домены и поддомены»** → выберите домен → **«DNS-записи»** → добавьте A-запись:

```text
Имя:    n8n
Тип:    A
IP:     <IP вашего VPS>
TTL:    300
```

Подождите 2–5 минут на распространение DNS, проверьте:

```bash
dig n8n.example.ru +short
```

Должен вернуть IP вашего VPS.

## Шаг 8. Получаем SSL Let's Encrypt

Сначала запустите Nginx без SSL — закомментируйте секцию `listen 443` в конфиге, оставьте только `listen 80`. Стартуйте стек:

```bash
cd ~/stack
docker compose up -d nginx
```

Получите сертификат:

```bash
docker run --rm \
  -v ~/stack/certbot/conf:/etc/letsencrypt \
  -v ~/stack/certbot/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot --webroot-path=/var/www/certbot \
  -d n8n.example.ru \
  --email your-email@example.com \
  --agree-tos --no-eff-email
```

После успеха раскомментируйте `listen 443` в конфиге Nginx и перезапустите:

```bash
docker compose restart nginx
```

## Шаг 9. Запуск всего стека

```bash
cd ~/stack
docker compose up -d
docker compose ps
```

Должны увидеть 4 контейнера в статусе `Up`. Откройте `https://n8n.example.ru` — увидите приглашение n8n. Логин — из `.env`.

## Шаг 10. Первый workflow «n8n + OpenClaw»

В n8n создайте новый workflow:

1. **Trigger:** `Manual Trigger` (для теста).
2. **Node:** `HTTP Request` или `Execute Command` → вызывает OpenClaw через CLI или его HTTP API.
3. **Node:** `Telegram` → отправляет результат в чат.

Пример Execute Command, который зовёт OpenClaw из n8n-контейнера:

```bash
docker exec openclaw npm run task -- "Проанализируй файл /work/brief.txt и сформируй контент-план"
```

Результат — текстовый ответ OpenClaw — n8n подхватывает и рассылает дальше.

> **Pro tip.** Для постоянных задач лучше поднять OpenClaw в режиме HTTP-сервера и звать его из n8n через ноду `HTTP Request`. Так быстрее и проще передавать большие промпты.

## Шаг 11. Автоматические бэкапы

Создайте `~/stack/backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%F)
mkdir -p ~/stack/backups

# Дамп Postgres
docker exec postgres pg_dump -U n8n n8n | gzip > ~/stack/backups/n8n-db-$DATE.sql.gz

# Архив n8n workflows и openclaw config
tar czf ~/stack/backups/n8n-data-$DATE.tar.gz ~/stack/n8n
tar czf ~/stack/backups/openclaw-data-$DATE.tar.gz ~/stack/openclaw ~/stack/.env

# Удаление старше 14 дней
find ~/stack/backups -name "*.gz" -mtime +14 -delete
```

В cron:

```bash
crontab -e
```

```text
0 4 * * * /home/openclaw/stack/backup.sh
```

Дополнительно — включите снапшоты в панели [Beget](https://beget.com/p7257) (+20% к стоимости тарифа). Это спасает в случае сбоя файловой системы или ошибки конфигурации.

## Шаг 12. Мониторинг

Минимальный мониторинг — `pm2 monit` для самого OpenClaw и `docker stats` для контейнеров:

```bash
docker stats
```

Раз в неделю смотрите использование RAM. Если стабильно >80% — пора апгрейдить тариф до VPS L. Подробнее — в нашей статье [Beget VPS для OpenClaw: какой тариф выбрать](/blog/beget-vps-dlya-openclaw-kakoj-tarif-vybrat).

## Сколько это стоит в реальности

| Статья | Сумма/мес. |
|---|---|
| [Beget VPS M](https://beget.com/p7257) | 460 ₽ |
| Снапшоты Beget (+20%) | 92 ₽ |
| Домен `.ru` | ~16 ₽ (190 ₽/год) |
| API AI-модели (~100 задач/день) | ~$30 (~2 700 ₽) |
| **Итого** | **~3 270 ₽/мес.** |

Для бизнеса, который раньше тратил 35 000+ ₽ на одного контент-менеджера, окупаемость наступает в первый же месяц.

## Если хочется без рук

В **CentrLP** мы разворачиваем такой стек «под ключ» на сервере клиента. Включает:

- VPS на [Beget](https://beget.com/p7257) с правильным тарифом;
- полный стек OpenClaw + n8n + Postgres + Nginx + Let's Encrypt;
- настроенную безопасность и бэкапы;
- 5 готовых workflow под вашу нишу;
- инструкцию для вашего админа на 20 страниц;
- 1 месяц поддержки.

[Оставьте заявку](/contacts), и мы покажем, как стек выглядит изнутри в боевых проектах.

---

## Читайте также

- [Как развернуть OpenClaw на собственном хостинге Beget](/blog/kak-razvernut-openclaw-na-hostinge-beget)
- [Beget VPS для OpenClaw: какой тариф выбрать в 2026 году](/blog/beget-vps-dlya-openclaw-kakoj-tarif-vybrat)
- [Безопасность OpenClaw на VPS Beget](/blog/bezopasnost-openclaw-na-vps-beget)
- [Контент-завод на n8n: автоматизация контента для бизнеса](/blog/kontent-zavod-n8n-avtomatizacia)
- [OpenClaw для бизнеса: как ИИ-агенты автоматизируют маркетинг](/blog/openclaw-dlya-biznesa-ii-agent)
