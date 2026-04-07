---
title: "Как развернуть OpenClaw на собственном хостинге Beget: пошаговая инструкция 2026"
date: "2026-04-04"
tags: ["OpenClaw", "Beget", "VPS", "хостинг", "инструкция", "ИИ агент", "DevOps", "self-hosted"]
description: "Пошаговое руководство по установке OpenClaw на VPS Beget: выбор тарифа, настройка Ubuntu, Node.js, ключей API и автозапуска. Готовое решение за 30 минут."
---

# Как развернуть OpenClaw на собственном хостинге Beget: пошаговая инструкция 2026

**OpenClaw** — open-source ИИ-агент, который превращает Claude, GPT-4 и DeepSeek в полноценного сотрудника: он управляет файлами, запускает команды, ходит в API и выполняет задачи автономно. Запускать OpenClaw в облаке OpenAI или Anthropic дорого и небезопасно — гораздо разумнее развернуть его на собственном VPS, где вы контролируете и данные, и расходы.

В этой статье я покажу, как поднять OpenClaw на хостинге [Beget](https://beget.com/p7257) с нуля — от регистрации до автозапуска. У нас в **CentrLP** именно так выглядит боевая конфигурация контент-завода: всё крутится на одном VPS за 230 ₽ в месяц.

> **TL;DR.** Регистрируемся на [Beget](https://beget.com/p7257), берём VPS Tariff S (Ubuntu 22.04, 1 vCPU, 1 ГБ RAM, 20 ГБ SSD), ставим Node.js 20, клонируем OpenClaw, прописываем API-ключ Claude, запускаем через `pm2`. Всё. Время на установку — 30 минут.

## Почему именно Beget для OpenClaw

За последние два года мы перепробовали Hetzner, Selectel, Reg.ru и Timeweb. Для российского бизнеса в 2026 году [Beget](https://beget.com/p7257) выигрывает по совокупности факторов:

- **Оплата российскими картами Visa, Mastercard, Мир** — без танцев с криптой и зарубежными платежами.
- **Дата-центры в РФ** — данные клиентов не уезжают за границу, что важно для 152-ФЗ.
- **Цена входа** — VPS Tariff S от **230 ₽/мес.**, чего достаточно для одного агента OpenClaw + n8n + лёгкой PostgreSQL.
- **NVMe SSD на всех тарифах** — холодный старт OpenClaw занимает 1–2 секунды против 10 секунд на HDD.
- **Поддержка на русском 24/7** — отвечают в чате за пару минут, а не через тикет на сутки.
- **Бесплатные SSL Let's Encrypt** — пригодится, если вешаете на агента веб-интерфейс.

Если хотите сразу зарегистрироваться, переходите по [нашей партнёрской ссылке Beget](https://beget.com/p7257) — на неё начисляется бонус на первый платёж.

## Шаг 1. Регистрация и выбор тарифа

1. Перейдите на [beget.com/p7257](https://beget.com/p7257) и нажмите **«Регистрация»**.
2. Подтвердите email — на почту придёт ссылка активации.
3. В личном кабинете откройте раздел **VPS** → **«Заказать VPS»**.
4. Выберите тариф:

| Тариф | vCPU | RAM | SSD | Цена | Для чего |
|---|---|---|---|---|---|
| **VPS S** | 1 | 1 ГБ | 20 ГБ | 230 ₽/мес. | 1 агент OpenClaw, лёгкие задачи |
| **VPS M** | 2 | 2 ГБ | 40 ГБ | 460 ₽/мес. | OpenClaw + n8n + PostgreSQL |
| **VPS L** | 2 | 4 ГБ | 60 ₽ | 880 ₽/мес. | Несколько агентов, прод-нагрузка |

Для большинства задач я рекомендую **VPS M** — 2 ГБ RAM спасают от OOM-killer, когда OpenClaw разгоняется на сложной задаче.

5. ОС — **Ubuntu 22.04 LTS** (64-bit).
6. Дата-центр — Москва (минимальная задержка из РФ).
7. Подтвердите заказ.

Через 2–3 минуты на email придёт письмо с IP, root-паролем и инструкцией по SSH.

## Шаг 2. Первое подключение и базовая безопасность

Откройте терминал (Windows: `Win+R` → `cmd` → `ssh root@<IP>`; Mac/Linux: просто `ssh`).

```bash
ssh root@123.45.67.89
```

Введите пароль из письма Beget. После входа сразу обновите систему:

```bash
apt update && apt upgrade -y
```

Создайте отдельного пользователя — работать под `root` это очень плохая практика:

```bash
adduser openclaw
usermod -aG sudo openclaw
```

Скопируйте свой SSH-ключ на сервер (с локальной машины):

```bash
ssh-copy-id openclaw@123.45.67.89
```

Запретите вход root по SSH в `/etc/ssh/sshd_config`:

```text
PermitRootLogin no
PasswordAuthentication no
```

Перезапустите SSH:

```bash
systemctl restart sshd
```

Включите файрвол:

```bash
ufw allow OpenSSH
ufw enable
```

## Шаг 3. Установка Node.js 20 и зависимостей

OpenClaw написан на TypeScript и требует Node.js 20+. Поставим официальную сборку через NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git build-essential
```

Проверьте версии:

```bash
node -v   # v20.x.x
npm -v    # 10.x.x
git --version
```

Поставьте `pm2` — менеджер процессов, который перезапустит OpenClaw при падении и автостарте сервера:

```bash
sudo npm install -g pm2
```

## Шаг 4. Клонирование и установка OpenClaw

Войдите под пользователем `openclaw` и клонируйте репозиторий:

```bash
su - openclaw
cd ~
git clone https://github.com/steipete/openclaw.git
cd openclaw
npm install
```

Сборка занимает 1–3 минуты в зависимости от тарифа. На VPS S будьте готовы к ~3 минутам.

## Шаг 5. Настройка API-ключей

OpenClaw поддерживает несколько провайдеров. Создайте файл `.env`:

```bash
nano .env
```

Минимальная конфигурация для Claude:

```text
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
OPENCLAW_MODEL=claude-opus-4-6
OPENCLAW_WORKDIR=/home/openclaw/work
OPENCLAW_LOG_LEVEL=info
```

Получить ключ Claude можно на [console.anthropic.com](https://console.anthropic.com). Стоимость — около $15 за миллион входных токенов на Opus 4.6, что хватает на сотни задач в день для среднего бизнеса.

Если работаете с GPT, добавьте:

```text
OPENAI_API_KEY=sk-xxxxxxxxxxxx
```

Создайте рабочий каталог:

```bash
mkdir -p /home/openclaw/work
```

## Шаг 6. Первый запуск

Тестовый запуск в интерактивном режиме:

```bash
npm run start
```

Если всё прошло гладко, вы увидите приглашение OpenClaw и сможете отдать первую команду:

```text
> Привет, проанализируй файлы в текущем каталоге
```

Выходим: `Ctrl+C`.

## Шаг 7. Автозапуск через pm2

Чтобы агент стартовал автоматически после перезагрузки сервера:

```bash
pm2 start npm --name openclaw -- run start
pm2 save
pm2 startup systemd -u openclaw --hp /home/openclaw
```

Скопируйте и выполните команду, которую `pm2` вам напечатает (она требует sudo). После этого:

```bash
pm2 status
```

Должны увидеть строку `openclaw │ online`. Логи в реальном времени:

```bash
pm2 logs openclaw
```

## Шаг 8. (Опционально) Веб-интерфейс и SSL

Если нужен доступ к OpenClaw через браузер, добавьте Nginx + Let's Encrypt:

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

Создайте конфиг `/etc/nginx/sites-available/openclaw`:

```nginx
server {
    listen 80;
    server_name openclaw.example.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте:

```bash
sudo ln -s /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d openclaw.example.ru
```

В DNS-панели Beget добавьте A-запись для поддомена на IP вашего VPS. Через 2–3 минуты сертификат будет выпущен автоматически.

## Сколько это стоит в месяц

Для типового сценария «один агент OpenClaw + n8n + контент-задачи» расклад такой:

| Статья | Стоимость |
|---|---|
| [VPS Beget M](https://beget.com/p7257) (2 vCPU, 2 ГБ) | 460 ₽/мес. |
| Домен `.ru` | ~190 ₽/год (~16 ₽/мес.) |
| API Claude (~50 задач/день) | $20–40/мес. |
| **Итого** | **~3 000–5 000 ₽/мес.** |

Сравните с зарплатой младшего контент-менеджера в Тюмени (от 35 000 ₽/мес.) — окупаемость наступает в первый же месяц.

## Частые проблемы и решения

**Ошибка `EACCES: permission denied`.** Не запускайте `npm install` под `root`. Работайте под пользователем `openclaw`.

**OpenClaw падает с OOM.** Возьмите тариф VPS M (2 ГБ RAM) или включите swap:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

**`pm2` не стартует после перезагрузки.** Проверьте, что вы выполнили `pm2 startup` именно от пользователя `openclaw` и не забыли скопировать sudo-команду.

**API-ключ невалидный.** Убедитесь, что в `.env` нет лишних кавычек и пробелов. Перечитайте файл: `cat .env`.

## Что дальше

Базовый OpenClaw поднят. Следующие шаги:

- **Подключите n8n** для автоматизации сценариев — у нас есть отдельный гайд: [Контент-завод на n8n](/blog/kontent-zavod-n8n-avtomatizacia).
- **Настройте безопасность** — детальный разбор файрвола, fail2ban и изоляции в статье [Безопасность OpenClaw на VPS Beget](/blog/bezopasnost-openclaw-na-vps-beget).
- **Подключите PostgreSQL** для хранения истории и состояния агента.
- **Интегрируйте с CRM или мессенджерами** — Telegram-бот или WhatsApp Business API.

Если хотите, чтобы мы подняли OpenClaw под ваш бизнес «под ключ» — с интеграциями в CRM, контент-завод и мессенджеры — [оставьте заявку](/contacts). У нас уже есть готовая боевая инфраструктура, и мы переносим её на сервер клиента за 1–2 дня.

---

## Читайте также

- [Beget VPS для OpenClaw: какой тариф выбрать в 2026 году](/blog/beget-vps-dlya-openclaw-kakoj-tarif-vybrat)
- [Безопасность OpenClaw на VPS Beget: firewall, SSH, изоляция](/blog/bezopasnost-openclaw-na-vps-beget)
- [OpenClaw + n8n на Beget VPS: разворачиваем стек автоматизации за 1 день](/blog/openclaw-n8n-na-beget-vps-stack)
- [OpenClaw для бизнеса: как ИИ-агенты автоматизируют маркетинг](/blog/openclaw-dlya-biznesa-ii-agent)
- [Контент-завод на n8n: автоматизация контента для бизнеса](/blog/kontent-zavod-n8n-avtomatizacia)
