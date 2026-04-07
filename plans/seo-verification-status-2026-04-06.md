# SEO Верификация: статус + чек-лист деплоя
Дата: 2026-04-06

## Что сделано автоматически

1. **Единый OAuth-токен `i416597405@yandex.ru`** — взят из `G:\mvp\centrlp\.env.seo.local` (`y0__xCJnIWRARj...` валиден до 2026-09-26)
2. **Создан `.env.seo.local` в 6 проектах** с тем же токеном и корректным punycode
3. **Через Я.Вебмастер API добавлены 6 новых хостов** к аккаунту `i416597405`:
   - `https://svrq.ru`
   - `https://aamx.ru`
   - `https://crm.centrlp.ru`
   - `https://xn--80aamzile.xn--p1ai` (лападом.рф)
   - `https://xn--72-6kchpq9cd0i.xn--p1ai` (ривьера72.рф)
   - `https://xn--c1andi.xn--p1ai` (клнг.рф)
4. **Запрошены verification UIN'ы** (тип HTML_FILE) для всех 6 — они в таблице ниже
5. **Созданы HTML-файлы верификации** в корне каждого проекта
6. **Вставлен meta-тег `yandex-verification`** в `index.html`/`welcome.blade.php`/layout каждого проекта — это работает как запасной канал для SPA/fallback-серверов, которые отдают `index.html` на любой путь

---

## Карта UIN'ов

| Проект | Домен | UIN | Файл (создан) | Meta-тег (вставлен) |
|---|---|---|---|---|
| svrq | `svrq.ru` | `567a1b87f1a590f1` | `G:\mvp\svrq\public\yandex_567a1b87f1a590f1.html` | `G:\mvp\svrq\resources\views\welcome.blade.php` |
| aamx | `aamx.ru` | `6938492bd3e00611` | `G:\mvp\aamx\landing\yandex_6938492bd3e00611.html` | `G:\mvp\aamx\landing\index.html` |
| centrlp-landing (лендинг для crm.centrlp.ru) | `crm.centrlp.ru` | `d9421d4df906f679` | `G:\mvp\centrlp-landing\yandex_d9421d4df906f679.html` | `G:\mvp\centrlp-landing\index.html` |
| lapadom | `лападом.рф` | `164cf2a41f6da5a1` | `G:\mvp\lapadom\public\yandex_164cf2a41f6da5a1.html` | `G:\mvp\lapadom\resources\views\layouts\app.blade.php` |
| rivjera | `ривьера72.рф` | `b28302b4fc7f61e4` | `G:\mvp\rivjera\yandex_b28302b4fc7f61e4.html` | `G:\mvp\rivjera\index.html` |
| klng | `клнг.рф` | `e4612eef6e0cb6ea` | `G:\mvp\klng\yandex_e4612eef6e0cb6ea.html` | **нет кода лендинга** — сделаем, когда появится |

---

## Я.Вебмастер верификация — ✅ ВСЕ 5 ДОМЕНОВ ПОДТВЕРЖДЕНЫ (2026-04-07)

После деплоя HTML-файлов и meta-тегов на прод (см. ниже) Claude вызвал API верификации для всех 5 хостов и поллил статус. Все 5 перешли в `VERIFIED`:

| Проект | Домен | UIN | Статус | Время верификации |
|---|---|---|---|---|
| svrq | `svrq.ru` | `567a1b87f1a590f1` | ✅ VERIFIED | 2026-04-07 00:21:48 MSK |
| lapadom | `лападом.рф` | `164cf2a41f6da5a1` | ✅ VERIFIED | 2026-04-07 00:21:50 MSK |
| aamx | `aamx.ru` | `6938492bd3e00611` | ✅ VERIFIED | 2026-04-07 00:21:52 MSK |
| centrlp-landing | `crm.centrlp.ru` | `d9421d4df906f679` | ✅ VERIFIED | 2026-04-07 00:21:54 MSK |
| rivjera | `ривьера72.рф` | `b28302b4fc7f61e4` | ✅ VERIFIED | 2026-04-07 00:21:56 MSK |
| klng | `клнг.рф` | `e4612eef6e0cb6ea` | ⏳ ждёт лендинга | — |

`HOST_ID` для всех 5 проектов записан в `.env.seo.local`. Запущен `yandex-webmaster-report.mjs` — снят первый snapshot в `seo-reports/latest-yandex-webmaster-report.{json,md}` в каждом проекте. Я.Вебмастер показывает "Host is not loaded yet" — это нормально, данные подтянутся в течение нескольких часов / дней. Через ~24ч можно перезапустить отчёт.

---

## Что нужно от тебя

### 1. Задеплоить на сервер (обычным `git push` / деплой-скриптом)

По каждому проекту вернуться в репу, закоммитить изменения и задеплоить как обычно. Файлы минимальны:

**svrq:**
- `public/yandex_567a1b87f1a590f1.html`
- `resources/views/welcome.blade.php` (вставлена одна строка meta)
- `.env.seo.local` — **не коммитить**, добавить в `.gitignore` если ещё нет

**aamx:**
- `landing/yandex_6938492bd3e00611.html`
- `landing/index.html` (вставлена одна строка meta)
- `landing/.env.seo.local` — не коммитить

**centrlp-landing (деплоится на crm.centrlp.ru):**
- `yandex_d9421d4df906f679.html`
- `index.html` (вставлена одна строка meta)

**lapadom:**
- `public/yandex_164cf2a41f6da5a1.html`
- `resources/views/layouts/app.blade.php` (вставлена одна строка meta)
- `.env.seo.local` — не коммитить

**rivjera:**
- `yandex_b28302b4fc7f61e4.html`
- `index.html` (вставлена одна строка meta)

**klng:** деплоить пока нечего — лендинга нет.

### 2. После деплоя — нажать «Проверить» в Вебмастере

Можно либо через UI `https://webmaster.yandex.ru/`, либо через API (я сделаю сам, когда скажешь «проверяй»). API вызов:
```bash
POST /v4/user/304172553/hosts/{host_id}/verification?verification_type=HTML_FILE
```

### 3. Что я сделаю после подтверждения

- Запущу `node scripts/yandex-webmaster-report.mjs` в каждом проекте — получу `HOST_ID`, SQI, диагностику, индексацию
- Занесу `HOST_ID` обратно в `.env.seo.local`
- Сформирую первый отчёт по проекту с TODO-списком SEO-исправлений

---

## Про GSC (Google Search Console) — выполнено через Chrome MCP

### Состояние GSC на 2026-04-06

**Уже подтверждены (domain-property):**
- `centrlp.ru` — покрывает все поддомены (`crm.centrlp.ru`, `design.centrlp.ru`, `rosomaha.centrlp.ru` и т.д.)
- `svrq.ru` — domain property

**Созданы новые domain-property (ожидают TXT в DNS):**

| Проект | Домен | TXT-запись для DNS |
|---|---|---|
| aamx | `aamx.ru` | `google-site-verification=KBLuX75GUyPKEAw_bOPvckFCDEVtG8oaG5QXAVEY0EY` |
| lapadom | `лападом.рф` (xn--80aamzile.xn--p1ai) | `google-site-verification=GHYScg5R-rHoif3Lzf5anvgxyy4zTahI2IF9xrRNrHY` |
| rivjera | `ривьера72.рф` (xn--72-6kchpq9cd0i.xn--p1ai) | `google-site-verification=ramscbV1wZmrMQcbc377zlT2zhCmOQHVu0ko9KlbQ1E` |
| klng | `клнг.рф` (xn--c1andi.xn--p1ai) | `google-site-verification=pRC3fZDr3-AHyrFpsFC7m2y-CtcYXlxKX9HxAUfLf5s` |

### DNS TXT-записи — добавлены автоматически через Beget API

Макс дал credentials к своему Beget MCP (`G:\mvp\mcp`, API login `icq416`). Скрипт `G:\mvp\mcp\src\add-gsc-txt.js` безопасно добавил все 4 TXT-записи через `dns/changeRecords`, сохранив существующие A/MX/TXT (SPF, DKIM, mailru-domain).

Все 4 записи подтверждены через публичный резолвер (8.8.8.8) — DNS пропагнулся.

### GSC верификация — ✅ ВСЕ 4 ДОМЕНА ПОДТВЕРЖДЕНЫ (2026-04-06)

Через Chrome MCP открыл «Завершить процедуру подтверждения...» → выбрал каждый отложенный ресурс → Google автоматически нашёл TXT и выдал «Право собственности подтверждено автоматически»:

- ✅ `aamx.ru`
- ✅ `лападом.рф` (xn--80aamzile.xn--p1ai)
- ✅ `ривьера72.рф` (xn--72-6kchpq9cd0i.xn--p1ai)
- ✅ `клнг.рф` (xn--c1andi.xn--p1ai)

Итого по GSC: `centrlp.ru` (включая поддомены) и `svrq.ru` уже были подтверждены ранее, теперь добавились ещё 4. Все 6 проектов покрыты GSC.

### Альтернатива

Если какой-то домен уже верифицирован Яндекс.Метрикой или Google Tag Manager на сайте, GSC может подхватить верификацию автоматически через код счётчика. Для новых доменов (`aamx.ru`, `лападом.рф`, `ривьера72.рф`) это не сработает — там нет установленной Метрики/GTM. Для `клнг.рф` сайта пока вообще нет.

### Ресурсы в GSC со статусом «отложено» (черновики)

Все 4 ресурса созданы в GSC с пометкой «отложено» — они видны в списке, просто ждут TXT в DNS. UIN'ы Яндекса и TXT Google переиспользуются при повторном нажатии «Подтвердить» — ничего не пересоздаём.

---

## Реестр UIN'ов для истории (чтобы не терять, если Я.Вебмастер UI покажет «просрочено»)

```
svrq.ru            UIN=567a1b87f1a590f1
aamx.ru            UIN=6938492bd3e00611
crm.centrlp.ru     UIN=d9421d4df906f679
лападом.рф         UIN=164cf2a41f6da5a1
ривьера72.рф       UIN=b28302b4fc7f61e4
клнг.рф            UIN=e4612eef6e0cb6ea
```

Если верификация сбросится — эти UIN'ы переиспользуются, просто перезапускай процесс верификации через API.
