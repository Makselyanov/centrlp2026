# SEO Onboarding: OAuth Яндекс.Вебмастера + GSC верификация

> Единая инструкция для получения OAuth-токенов Яндекс.Вебмастера и верификации GSC по **всем** проектам Макса.
> Адресовано лично Максу — все шаги нужно выполнить в браузере, я (Claude) не могу получить токены и подтвердить владения сам.

---

## 0. Перед началом

**Аккаунты:**
- Яндекс (личные проекты): `i416597405@yandex.ru`
- Google (личные проекты): `icq416597405@gmail.com`
- Яндекс (чужой проект, rosomaha.site): `rosomaha-rus999@yandex.ru` — **НИКОГДА не использовать с личного аккаунта**. Google для росомахи придёт позже (заказчик даст доступ).

**Проекты под `i416597405@yandex.ru` / `icq416597405@gmail.com`:**

| Проект | Домен | Папка плана | Env файл |
|---|---|---|---|
| centrlp | `centrlp.ru` | `G:\mvp\centrlp\plans\seo-plan.md` | `G:\mvp\centrlp\.env.seo.local` (уже есть) |
| centrlp-landing (crm.centrlp.ru) | `crm.centrlp.ru` | `G:\mvp\centrlp-landing\plans\seo-plan.md` | `G:\mvp\centrlp-landing\.env.seo.local` |
| svrq | `svrq.ru` | `G:\mvp\svrq\plans\seo-plan.md` | `G:\mvp\svrq\.env.seo.local` |
| aamx | `aamx.ru` | `G:\mvp\aamx\plans\seo-plan.md` | `G:\mvp\aamx\landing\.env.seo.local` |
| lapadom | `лападом.рф` | `G:\mvp\lapadom\plans\seo-plan.md` | `G:\mvp\lapadom\.env.seo.local` |
| rivjera | `ривьера72.рф` | `G:\mvp\rivjera\plans\seo-plan.md` | `G:\mvp\rivjera\.env.seo.local` |
| klng | `клнг.рф` | `G:\mvp\klng\plans\seo-plan.md` | `G:\mvp\klng\.env.seo.local` |

**Проект под `rosomaha-rus999@yandex.ru`:**

| Проект | Домен | Папка плана | Env файл |
|---|---|---|---|
| rosomaha | `xn--80aa8ahaki9a.site` (РОСОМАХА.site) | `G:\mvp\rosomaha\plans\seo-plan.md` | `G:\mvp\rosomaha\.env.seo.local` (уже есть) |

---

## 1. Получение OAuth-токена Яндекс.Вебмастера (для `i416597405@yandex.ru`)

Я.Вебмастер API работает через OAuth-токен Яндекс.ID. Один токен даёт доступ ко всем сайтам, подтверждённым в Вебмастере под этим аккаунтом — поэтому достаточно **одного токена** на все личные проекты.

### Шаг 1. Создать OAuth-приложение

1. Зайти в https://oauth.yandex.ru/ под аккаунтом `i416597405@yandex.ru`
2. Кнопка «Зарегистрировать новое приложение»
3. Поля:
   - **Название:** `Claude SEO Report (personal)`
   - **Иконка:** любая / дефолтная
   - **Платформы:** Web-сервисы
   - **Redirect URI:** `https://oauth.yandex.ru/verification_code` (единственное значение)
   - **Права доступа:** найти и отметить галочки:
     - `webmaster:hostinfo` (Получение информации о сайтах)
     - `webmaster:verify` (Подтверждение прав на сайт)
4. Сохранить. Запомнить `ClientID` — он потребуется в Шаге 2.

### Шаг 2. Получить токен через device/code-flow

**Самый простой способ — через авторизационный код в браузере:**

1. Открыть в браузере (заменить `YOUR_CLIENT_ID`):
   ```
   https://oauth.yandex.ru/authorize?response_type=token&client_id=YOUR_CLIENT_ID
   ```
2. Подтвердить доступ
3. Страница редиректит на `https://oauth.yandex.ru/verification_code#access_token=AQAAAAxxxxxxxxxxxxxxxx&token_type=bearer&expires_in=31536000`
4. Скопировать значение `access_token` (после `access_token=` до следующего `&`)
5. `expires_in=31536000` означает, что токен живёт 1 год → ставь `YANDEX_WEBMASTER_TOKEN_EXPIRES_AT` через год от сегодня

### Шаг 3. Вставить токен в все `.env.seo.local`

Скопировать полученный токен в каждый из 7 env-файлов (см. таблицу в разделе 0). Пример:

```env
YANDEX_WEBMASTER_TOKEN=y0_AgAAAAxxxxxxxxxxxxxxxx
YANDEX_WEBMASTER_HOST_URL=https://aamx.ru
YANDEX_WEBMASTER_CHECK_URLS=/,/funkcii/dispetcherskaya,/ceny
YANDEX_WEBMASTER_TOKEN_EXPIRES_AT=2027-04-06
```

> Файл `.env.seo.local.example` в каждой папке уже готов — просто скопируй его:
> ```bash
> cp .env.seo.local.example .env.seo.local
> ```
> и отредактируй.

### Шаг 4. Подтвердить владение в Я.Вебмастере (для каждого домена отдельно)

Для каждого домена из таблицы:

1. Зайти в https://webmaster.yandex.ru/
2. «Добавить сайт» → вставить домен (для кириллических — вставляй punycode, например `xn--j1aef.xn--p1ai` для `клнг.рф`)
3. Выбрать способ верификации: **HTML-файл** (проще всего для статических лендингов) или **meta-тег** (для SPA / Laravel)
4. Положить файл/тег на сайт → deploy → «Подтвердить»
5. После подтверждения Вебмастер начнёт собирать данные (ждать 2–3 дня до появления индексации).

### Шаг 5. Прогнать отчётный скрипт

Из папки каждого проекта:

```bash
cd G:/mvp/aamx/landing
node scripts/yandex-webmaster-report.mjs
```

После первого запуска скрипт допишет в консоль блок:
```env
YANDEX_WEBMASTER_USER_ID=12345678
YANDEX_WEBMASTER_HOST_ID=https:aamx.ru:443
```
— это скопируй обратно в `.env.seo.local`, чтобы следующие запуски были быстрее.

---

## 2. Google Search Console — верификация (✅ выполнено 2026-04-06)

Все 6 личных доменов уже подтверждены в GSC. Детали — в `seo-verification-status-2026-04-06.md`.

| Домен | Тип ресурса | Статус |
|---|---|---|
| `centrlp.ru` | Domain property (покрывает `crm.centrlp.ru`, `design.centrlp.ru`, `rosomaha.centrlp.ru` и др.) | ✅ |
| `svrq.ru` | Domain property | ✅ |
| `aamx.ru` | Domain property (TXT через Beget API) | ✅ |
| `xn--80aamzile.xn--p1ai` (лападом.рф) | Domain property (TXT через Beget API) | ✅ |
| `xn--72-6kchpq9cd0i.xn--p1ai` (ривьера72.рф) | Domain property (TXT через Beget API) | ✅ |
| `xn--c1andi.xn--p1ai` (клнг.рф) | Domain property (TXT через Beget API) | ✅ |

### Если нужно добавить новый домен в GSC

1. Зайти в https://search.google.com/search-console/welcome под `icq416597405@gmail.com`
2. Добавить ресурс → **«Ресурс домена»** (покрывает все поддомены)
   - Для кириллических доменов **используй punycode**: `xn--c1andi.xn--p1ai` и т.д.
3. GSC выдаст TXT-запись вида `google-site-verification=...`
4. **DNS пишется автоматически** через `G:\mvp\mcp` (Beget MCP) — скажи мне домен и TXT, я добавлю через `dns/changeRecords` не трогая существующие A/MX/TXT записи. См. `G:\mvp\mcp\src\add-gsc-txt.js` как референс.
5. Проверить пропагацию: `nslookup -type=TXT xn--c1andi.xn--p1ai 8.8.8.8`
6. Вернуться в GSC → «Подтвердить»

### После подтверждения

- Добавить sitemap.xml в GSC → «Файлы Sitemap» → вставить URL `https://домен/sitemap.xml` → «Отправить»
- GSC начнёт индексировать (2–7 дней до первых данных)

---

## 3. GSC API — OAuth refresh token для отчётного скрипта

Скрипт `scripts/gsc-report.mjs` **уже написан** и склонирован во все 7 проектов (centrlp, svrq, aamx/landing, lapadom, rivjera, centrlp-landing, klng). Запуск: `node scripts/gsc-report.mjs` из папки проекта. Подтягивает search analytics, sitemaps, URL inspection за 28 дней, сохраняет в `seo-reports/latest-gsc-report.{json,md}`.

Для работы нужны **4 переменные** в `.env.seo.local` (одни и те же для всех проектов, кроме `GSC_SITE_URL`):

```env
GSC_CLIENT_ID=
GSC_CLIENT_SECRET=
GSC_REFRESH_TOKEN=
GSC_SITE_URL=sc-domain:aamx.ru
```

### Почему OAuth, а не сервис-аккаунт

- `webmasters.readonly` scope минимален для отчетов, но для External OAuth-приложения в статусе **Testing** Google выдает refresh-токены на 7 дней
- Чтобы `invalid_grant: Token has been expired or revoked` не повторялся каждую неделю, OAuth-приложение должно быть переведено в **Production / In production**
- Один OAuth-клиент + один refresh-токен работают на **все** твои домены, подтверждённые под `icq416597405@gmail.com`
- Не надо вручную добавлять сервис-аккаунт в каждый ресурс GSC (как пришлось бы с SA)
- Паттерн идентичен Яндексу — один `.env.seo.local` содержит обе OAuth пары

### Шаг 1. Создать OAuth-клиент в Google Cloud

1. https://console.cloud.google.com/ под `icq416597405@gmail.com`
2. Создать проект (или выбрать существующий): `claude-seo-report`
3. **API Library** → найти `Google Search Console API` → **Enable**
4. **APIs & Services → OAuth consent screen:**
   - User Type: **External**
   - App name: `Claude SEO Report`
   - User support email: твой
   - Developer contact: твой
   - **Scopes:** не добавляй ничего на этом экране (добавим вручную в URL позже; consent screen scopes для non-sensitive не нужны)
   - **Test users:** добавь `icq416597405@gmail.com`
   - Сохранить и нажать **Publish app**. Для стабильного refresh-токена нужен статус **In production**.
5. **APIs & Services → Credentials → Create credentials → OAuth client ID:**
   - Application type: **Desktop app**
   - Name: `claude-seo-cli`
   - Создать → скопировать `Client ID` и `Client secret`

### Шаг 2. Получить refresh-токен (один раз, через браузер)

1. Построить URL (замени `CLIENT_ID`):
   ```
   https://accounts.google.com/o/oauth2/v2/auth?client_id=CLIENT_ID&redirect_uri=http://localhost&response_type=code&scope=https://www.googleapis.com/auth/webmasters.readonly&access_type=offline&prompt=consent
   ```
2. Открыть в браузере → выбрать `icq416597405@gmail.com` → «Allow»
3. Браузер редиректит на `http://localhost/?code=4/0AX...&scope=...`. Подключения не будет (localhost не слушает) — это ожидаемо. Скопируй значение `code` из URL.
4. Обменять `code` на refresh-токен через curl (заменить CLIENT_ID, CLIENT_SECRET, CODE):
   ```bash
   curl -X POST https://oauth2.googleapis.com/token \
     -d "code=CODE" \
     -d "client_id=CLIENT_ID" \
     -d "client_secret=CLIENT_SECRET" \
     -d "redirect_uri=http://localhost" \
     -d "grant_type=authorization_code"
   ```
5. В ответе будет JSON с `refresh_token` — это то, что нужно. Access_token игнорируем (скрипт обменяет refresh на access сам при каждом запуске).

> **Важно:** `refresh_token` выдаётся только при первом consent. Если случайно потерял — зайди в https://myaccount.google.com/permissions, отозови доступ «Claude SEO Report», и повтори шаг 2 (`prompt=consent` принудительно заново спросит).

### Шаг 3. Вставить в `.env.seo.local` каждого проекта

Один и тот же `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN` во все 7 файлов. Отличается только `GSC_SITE_URL`:

| Проект | GSC_SITE_URL |
|---|---|
| `centrlp` | `sc-domain:centrlp.ru` |
| `centrlp-landing` | `sc-domain:centrlp.ru` (фильтруй отчёт по page если нужен только crm-лендинг) |
| `svrq` | `sc-domain:svrq.ru` |
| `aamx/landing` | `sc-domain:aamx.ru` |
| `lapadom` | `sc-domain:xn--80aamzile.xn--p1ai` |
| `rivjera` | `sc-domain:xn--72-6kchpq9cd0i.xn--p1ai` |
| `klng` | `sc-domain:xn--c1andi.xn--p1ai` |

Готовые `.env.seo.local.example` в каждом проекте уже содержат правильный `GSC_SITE_URL` — просто скопируй в `.env.seo.local` и добавь OAuth триплет.

### Шаг 4. Запустить отчёт

```bash
cd G:/mvp/aamx/landing
node scripts/gsc-report.mjs
```

Или с кастомным окном:
```bash
node scripts/gsc-report.mjs --days 90
```

Сохранит в `seo-reports/latest-gsc-report.{json,md}`. Там же totals, top queries/pages, device/country split, sitemaps, URL inspection по главной, и список Next actions.

---

## 4. Росомаха (отдельный аккаунт)

**Yandex.Вебмастер:**
- Аккаунт: `rosomaha-rus999@yandex.ru` (не личный Макса!)
- Скрипт `G:\mvp\rosomaha\scripts\yandex-webmaster-report.mjs` **уже существует**
- Для получения токена — войти в `rosomaha-rus999@yandex.ru`, создать **ОТДЕЛЬНОЕ** OAuth-приложение (название: `Rosomaha SEO Report`), повторить Шаги 1–3 из раздела 1
- Токен положить в `G:\mvp\rosomaha\.env.seo.local` (НЕ в личные env-файлы!)

**Google Search Console:**
- Ждём доступа от заказчика (аккаунт пока не у Макса)
- После получения — верификация делается под аккаунтом заказчика
- В сервис-аккаунт от личного Google Cloud можно выдать доступ на чтение, но только если заказчик сам его добавит в GSC

**Правило:** никогда не смешивать личные и клиентские Я.Вебмастер аккаунты. При сдаче проекта данные должны остаться у заказчика.

---

## 5. IndexNow (быстрая индексация в Яндексе и Bing)

После того как Я.Вебмастер подтверждён, подключить IndexNow — при каждом обновлении URL он будет уведомлять поисковики.

### Получение ключа

1. https://yandex.com/indexnow/ → «Сгенерировать ключ» (или вручную — любая 32-символьная строка, скажем `uuid v4` без дефисов)
2. Положить файл `<ключ>.txt` в корень каждого сайта, внутри — тот же ключ
3. В `.env.seo.local` добавить:
   ```env
   INDEXNOW_KEY=a1b2c3d4e5f6...
   INDEXNOW_KEY_LOCATION=https://aamx.ru/a1b2c3d4e5f6....txt
   ```
4. В скрипт деплоя добавить: после нового поста/страницы — отправить POST на `https://api.indexnow.org/indexnow` с JSON:
   ```json
   {
     "host": "aamx.ru",
     "key": "a1b2c3d4e5f6...",
     "keyLocation": "https://aamx.ru/a1b2c3d4e5f6....txt",
     "urlList": ["https://aamx.ru/blog/new-post"]
   }
   ```

---

## 6. Метрика и GA4

### Я.Метрика
- Один счётчик на домен (не общий на все!)
- Цели минимум: `demo_click`, `phone_click`, `form_submit`, `register_click` (универсальные) + проектные (см. соответствующие SEO-планы)
- Включить: **вебвизор**, **карты скроллинга**, **электронная коммерция** (если продаёшь тарифы)

### Google Analytics 4
- На RU-проектах GA4 — **вторичный** канал аналитики. Не все клиенты и регионы загружаются.
- Ставить только после того, как Я.Метрика полностью работает и цели проверены
- GA4 дешёвый в поддержке — но не тратить на него время, пока Метрика не даёт всю картину

---

## 7. Чек-лист «первый день проекта»

Когда создаёшь новый проект / подключаешь SEO:

- [ ] Получен OAuth-токен Я.Вебмастера (если ещё нет — см. раздел 1)
- [ ] Скопирован `.env.seo.local.example` → `.env.seo.local`, заполнен токен и CHECK_URLS
- [ ] Подтверждено владение в Я.Вебмастере (HTML-файл или meta-тег)
- [ ] Подтверждено владение в GSC (TXT в DNS или HTML-файл)
- [ ] sitemap.xml отправлен в Я.Вебмастер и GSC
- [ ] robots.txt содержит `Sitemap: https://домен/sitemap.xml` и правильные `Disallow:`
- [ ] Я.Метрика счётчик установлен + 3+ цели настроены
- [ ] IndexNow ключ положен в корень + скрипт пинга в деплое
- [ ] Первый запуск `node scripts/yandex-webmaster-report.mjs` — скопированы `USER_ID` и `HOST_ID` обратно в env

---

## 8. Что я (Claude) могу, а что нет

**Могу:**
- Писать скрипты, генерить `sitemap.xml`, `robots.txt`, meta-теги, schema.org, создавать лендинги, писать контент-планы и тексты статей, редактировать env-файлы
- Запускать `node scripts/yandex-webmaster-report.mjs` и `node scripts/gsc-report.mjs` после того, как креды в `.env.seo.local`
- Анализировать отчёт и ставить задачи
- **Записывать DNS через Beget MCP** (`G:\mvp\mcp`) — TXT, A, MX, CNAME. Сохраняя существующие записи. Используется для GSC-верификации и IndexNow.
- **Управлять Я.Вебмастером через Chrome MCP + API** — добавлять хосты, запрашивать UIN'ы, нажимать «Подтвердить»
- **Управлять GSC через Chrome MCP** — добавлять ресурсы, нажимать «Подтвердить», отправлять sitemaps

**Не могу:**
- Сам получать **первичные** OAuth-токены Яндекса и Google (первый consent должен сделать ты в браузере — у меня нет твоего пароля и я не имею права его сохранять)
- Создавать аккаунты (Яндекс.ID, Google Cloud projects) — это тоже требует твоего участия
- Работать с чужими аккаунтами (например rosomaha-rus999) без явного указания каждый раз

**Как обычно выглядит SEO-онбординг нового проекта:**
1. Ты один раз за свою жизнь получил OAuth Яндекс + OAuth Google (для личных проектов) — эти токены работают на все свои домены
2. Для нового проекта: создаёшь папку с env-файлом, я пишу скрипты, добавляю DNS через Beget MCP, клоню отчётный скрипт, верифицирую в Я.Вебмастере через API и в GSC через Chrome MCP
3. После 5 минут ручной работы (копирование токенов в env) — всё остальное я делаю сам
