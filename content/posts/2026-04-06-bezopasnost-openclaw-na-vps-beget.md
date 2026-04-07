---
title: "Безопасность OpenClaw на VPS Beget: firewall, SSH, изоляция в 2026"
date: "2026-04-06"
tags: ["OpenClaw", "Beget", "безопасность", "VPS", "firewall", "SSH", "DevOps", "ИИ агент"]
description: "Чек-лист безопасности OpenClaw на Beget VPS: SSH-ключи, ufw, fail2ban, изоляция через systemd, ограничение API-команд. Защищаемся за 1 час."
---

# Безопасность OpenClaw на VPS Beget: firewall, SSH, изоляция в 2026

OpenClaw — это автономный ИИ-агент, который может **выполнять команды на вашем сервере**. И это одновременно его сила и его главная угроза. Если злоумышленник получит доступ к серверу с OpenClaw — он получит автоматизированного помощника, который сделает за него половину работы по компрометации инфраструктуры.

В этой статье — практический чек-лист безопасности, который мы применяем в **CentrLP** на боевых серверах [Beget](https://beget.com/p7257). Никаких теоретических рассуждений — только конкретные команды, которые можно выполнить за час и забыть про большинство угроз.

> **Дисклеймер.** Эта статья — стартовый минимум. Для критичной инфраструктуры (финансы, медицина, госсектор) дополнительно понадобятся аудиты, SIEM и регулярный пентест. Но 95% малого и среднего бизнеса защищаются именно теми приёмами, что описаны ниже.

## Базовый принцип: модель угроз для OpenClaw

Прежде чем настраивать защиту, сформулируйте, от кого защищаетесь. Для типичного OpenClaw на VPS Beget угроз четыре:

1. **Брутфорс SSH.** Боты сканируют интернет круглосуточно и пытаются подобрать пароли.
2. **Утечка API-ключа Claude/GPT.** Если ключ попадёт в публичный git, кто-то выкатит счёт на $5 000 за ночь.
3. **Сам агент действует во вред.** Кривой промпт может заставить OpenClaw `rm -rf` важные файлы.
4. **Уязвимости в зависимостях Node.js.** npm-пакеты регулярно компрометируют через supply chain.

Под каждую угрозу — свой набор контрмер.

## Шаг 1. SSH: ключи вместо паролей, нестандартный порт

Это **самая важная** мера. По нашей статистике на свежем VPS Beget боты начинают перебирать SSH через 5–10 минут после первого запуска.

### 1.1. Сгенерируйте SSH-ключ на локальной машине

Если ещё не делали:

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Пароль для ключа — обязательно (это вторая линия защиты, если ключ украдут с диска).

### 1.2. Скопируйте ключ на сервер

```bash
ssh-copy-id openclaw@123.45.67.89
```

### 1.3. Запретите вход root и пароли

Откройте `/etc/ssh/sshd_config`:

```bash
sudo nano /etc/ssh/sshd_config
```

Найдите и измените (раскомментируйте, если нужно):

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
PermitEmptyPasswords no
```

### 1.4. Смените порт SSH

Стандартный порт 22 — главная цель ботов. Поставьте что-то в диапазоне 49152–65535:

```text
Port 52431
```

Перезапустите SSH:

```bash
sudo systemctl restart sshd
```

**Важно:** не закрывайте текущую SSH-сессию, пока не убедитесь, что подключаетесь по новому порту:

```bash
ssh -p 52431 openclaw@123.45.67.89
```

## Шаг 2. Файрвол ufw — закрываем всё лишнее

Ubuntu 22.04 на [Beget VPS](https://beget.com/p7257) идёт без активного файрвола. Включите его сразу:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 52431/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP for Lets Encrypt'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw enable
```

Проверьте:

```bash
sudo ufw status verbose
```

OpenClaw сам по себе **не должен слушать публичные порты**. Если у вас есть веб-интерфейс, прокидывайте его через Nginx на 443, а сам OpenClaw держите на `127.0.0.1:3000`.

## Шаг 3. fail2ban — автоматическая защита от брутфорса

Даже с ключами SSH-сканирование съедает CPU и засоряет логи. Поставьте `fail2ban`:

```bash
sudo apt install -y fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

Откройте `/etc/fail2ban/jail.local` и в секции `[sshd]`:

```ini
[sshd]
enabled = true
port = 52431
maxretry = 3
findtime = 600
bantime = 86400
```

Перезапустите:

```bash
sudo systemctl restart fail2ban
sudo fail2ban-client status sshd
```

Через сутки проверьте `sudo fail2ban-client status sshd` — увидите десятки забаненных IP. Это нормально.

## Шаг 4. Защита API-ключей Claude и GPT

Утечка API-ключа — самая дорогая ошибка, которую можно сделать с OpenClaw.

### 4.1. Никогда не коммитьте `.env`

В корне репозитория OpenClaw создайте `.gitignore` (если нет):

```text
.env
.env.*
*.key
*.pem
node_modules/
logs/
```

### 4.2. Права на файл — только для владельца

```bash
chmod 600 /home/openclaw/openclaw/.env
chown openclaw:openclaw /home/openclaw/openclaw/.env
```

### 4.3. Установите лимиты в кабинете провайдера

В [console.anthropic.com](https://console.anthropic.com) задайте **monthly spending limit**, например $100. Даже если ключ утечёт, ущерб ограничится этой суммой.

### 4.4. Ротация ключей раз в квартал

Раз в 3 месяца:

1. Создайте новый ключ в консоли провайдера.
2. Обновите `.env` на сервере.
3. Перезапустите OpenClaw: `pm2 restart openclaw`.
4. Удалите старый ключ.

## Шаг 5. Изоляция OpenClaw через systemd / pm2

OpenClaw не должен бегать под root. Если вы следовали [нашей инструкции по установке OpenClaw на Beget](/blog/kak-razvernut-openclaw-na-hostinge-beget), то уже создали отдельного пользователя `openclaw`. Усильте изоляцию через systemd-юнит:

Создайте `/etc/systemd/system/openclaw.service`:

```ini
[Unit]
Description=OpenClaw AI Agent
After=network.target

[Service]
Type=simple
User=openclaw
Group=openclaw
WorkingDirectory=/home/openclaw/openclaw
ExecStart=/usr/bin/npm run start
Restart=on-failure
RestartSec=10

# Безопасность
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=read-only
ReadWritePaths=/home/openclaw/openclaw /home/openclaw/work
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true
RestrictNamespaces=true
RestrictRealtime=true
LockPersonality=true
MemoryDenyWriteExecute=false

# Лимиты ресурсов
MemoryMax=1500M
CPUQuota=80%

[Install]
WantedBy=multi-user.target
```

Активируйте:

```bash
sudo systemctl daemon-reload
sudo systemctl enable openclaw
sudo systemctl start openclaw
sudo systemctl status openclaw
```

Эти параметры:

- запрещают агенту получать новые привилегии (`NoNewPrivileges`);
- изолируют `/tmp` (`PrivateTmp`);
- запрещают писать в систему вне разрешённых путей (`ProtectSystem=strict` + `ReadWritePaths`);
- ограничивают RAM 1.5 ГБ и CPU 80% (важно для VPS S/M).

## Шаг 6. Ограничьте набор команд агента

OpenClaw умеет выполнять shell-команды. Это удобно — но опасно. В конфиге OpenClaw (`config.yaml` или через переменные окружения) задайте белый список:

```yaml
allowed_commands:
  - git
  - node
  - npm
  - curl
  - cat
  - ls
  - grep
  - find
denied_commands:
  - rm
  - mv
  - dd
  - mkfs
  - shutdown
  - reboot
  - chmod 777
```

Альтернатива — запускать команды через `firejail` или контейнер. Для большинства задач белого списка достаточно.

## Шаг 7. Автоматические обновления безопасности

Ubuntu 22.04 умеет ставить security-патчи без вашего участия:

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

Проверьте `/etc/apt/apt.conf.d/50unattended-upgrades` — секция `Unattended-Upgrade::Allowed-Origins` должна включать `${distro_id}:${distro_codename}-security`.

## Шаг 8. Бэкапы — последний рубеж

Ничто не защищает так, как актуальный бэкап. На [Beget VPS](https://beget.com/p7257) включите автоматические снапшоты в панели управления (+20% к стоимости тарифа).

Дополнительно — ежедневный дамп критичного:

```bash
#!/bin/bash
# /home/openclaw/backup.sh
DATE=$(date +%F)
mkdir -p /home/openclaw/backups
tar czf /home/openclaw/backups/openclaw-$DATE.tar.gz \
  /home/openclaw/openclaw/.env \
  /home/openclaw/openclaw/config \
  /home/openclaw/work
# Удаляем бэкапы старше 30 дней
find /home/openclaw/backups -name "openclaw-*.tar.gz" -mtime +30 -delete
```

В cron:

```bash
crontab -e
```

```text
0 3 * * * /home/openclaw/backup.sh
```

## Чек-лист «развернул и забыл»

Распечатайте и пройдитесь по каждому пункту перед запуском в прод:

- [ ] SSH работает только по ключам, root запрещён
- [ ] SSH перенесён на нестандартный порт
- [ ] ufw включён, открыты только нужные порты
- [ ] fail2ban установлен и активен
- [ ] `.env` имеет права 600 и в `.gitignore`
- [ ] У API-ключа Claude/GPT задан monthly limit
- [ ] OpenClaw запускается под отдельным пользователем
- [ ] systemd-юнит с `ProtectSystem=strict` и лимитами RAM
- [ ] Белый список команд для агента
- [ ] `unattended-upgrades` установлен
- [ ] Ежедневные бэкапы + снапшоты Beget включены

Если все галочки стоят — вы защищены лучше, чем 90% продакшен-серверов в рунете.

## Что делать, если уже взломали

1. **Не паникуйте.** Снимите снапшот сервера в текущем состоянии — пригодится для расследования.
2. **Откатитесь** на предыдущий снапшот через панель Beget.
3. **Сразу ротируйте все ключи**: SSH, API Claude/GPT, Telegram-токены, пароли БД.
4. **Изучите логи** в снятом снапшоте: `journalctl`, `/var/log/auth.log`, `pm2 logs`.
5. **Пройдите этот чек-лист заново** на восстановленном сервере.

## Нужна помощь — обращайтесь

Если эта статья кажется слишком технической — это нормально. Мы в **CentrLP** разворачиваем OpenClaw с полным набором безопасности «под ключ»: настраиваем сервер, изоляцию, бэкапы, мониторинг, и передаём вам готовую инфраструктуру с инструкцией для админа.

[Оставьте заявку](/contacts), и мы поднимем безопасный OpenClaw на вашем [VPS Beget](https://beget.com/p7257) за 1–2 дня.

---

## Читайте также

- [Как развернуть OpenClaw на собственном хостинге Beget](/blog/kak-razvernut-openclaw-na-hostinge-beget)
- [Beget VPS для OpenClaw: какой тариф выбрать](/blog/beget-vps-dlya-openclaw-kakoj-tarif-vybrat)
- [OpenClaw + n8n на Beget VPS: стек автоматизации за 1 день](/blog/openclaw-n8n-na-beget-vps-stack)
- [OpenClaw для бизнеса: как ИИ-агенты автоматизируют маркетинг](/blog/openclaw-dlya-biznesa-ii-agent)
