# centrlp.ru — расследование падения с 33 до 19 страниц в поиске

**Дата:** 2026-04-17
**Период падения:** 2026-04-14 (33 стр) → 2026-04-16 (19 стр) = **-42%**

---

## TL;DR

**Это НЕ реальная потеря трафика.** Яндекс схлопнул дубли (URL с `/` и без `/` считались разными страницами, canonical указывал на версию без `/`). Canonical-страницы остались в индексе, просто дубли-копии выкинуты как NOT_CANONICAL.

**Действие выполнено:** добавлен 301-редирект `/page/` → `/page` в nginx, 9 canonical URL'ов отправлены на recrawl.

---

## Диагноз: 54 события REMOVED_FROM_SEARCH за месяц

| Причина | Количество |
|---|---|
| NOT_CANONICAL (дубли с trailing slash) | 9 |
| LOW_QUALITY (слабый контент) | 7 |
| REDIRECT_NOTSEARCHABLE | 1 |
| HTTP_ERROR | 1 |
| (без причины — старые события) | 36 |

**14 событий за 2026-04-16 (день падения):** 9 NOT_CANONICAL + 5 LOW_QUALITY.

---

## Root cause: trailing slash дублирование

До фикса:
- `GET /blog/post` → HTTP 200 (отдаёт `/blog/post/index.html`)
- `GET /blog/post/` → HTTP 200 (отдаёт `/blog/post/index.html`)

Canonical на странице = `/blog/post` (без `/`). Sitemap тоже без `/`. Но оба URL возвращали 200 → Яндекс индексировал оба → потом схлопнул дубль.

### Фикс в `/etc/nginx/sites-enabled/centrlp` (2026-04-16 20:26)

```nginx
# Normalize trailing slash (Yandex canonical is without slash, sitemap без slash)
location ~ ^/(.+)/$ {
    return 301 /$1;
}
```

Добавлен перед `# Redirects from old URLs`. Бэкап оригинала: `/home/deploy/centrlp.nginx.bak-2026-04-17`.

### Проверка после fix

| URL | HTTP |
|---|---|
| `/blog/audit-saita-pered-zapuskom-reklamy-v-yandekse/` | 301 → без `/` |
| `/blog/audit-saita-pered-zapuskom-reklamy-v-yandekse` | 200 ✅ |
| `/` (root) | 200 ✅ (правило не матчится: требует `.+` перед `/`) |
| `/.well-known/acme-challenge/test` | 404 (не редиректит — нет trailing slash) ✅ |

---

## Recrawl отправлен (2026-04-16 20:27 MSK)

9 canonical URL'ов добавлены в очередь обхода:

| # | URL | task_id |
|---|---|---|
| 1 | `/blog/audit-saita-pered-zapuskom-reklamy-v-yandekse` | b7b2f4b0 |
| 2 | `/blog/oformlenie-gruppy-vk-dlya-biznesa-checklist` | b91f2ee0 |
| 3 | `/blog/pochemu-sait-ne-prinosit-zayavki-v-tyumeni` | bb2b0470 |
| 4 | `/blog/skolko-stoit-sozdanie-saita-tyumen-2026` | c0fc1f60 |
| 5 | `/blog/skolko-stoit-yandeks-direkt-v-tyumeni` | c506ab20 |
| 6 | `/blog/sozdanie-landinga-rukovodstvo` | c892b810 |
| 7 | `/services/ai-agents` | cb7a47a0 |
| 8 | `/services/ai-systems` | ccf7e6f0 |
| 9 | `/services/chatbot-vk` | d3a83e50 |

Квота: 141/150 осталось.

---

## LOW_QUALITY (отдельная проблема) — 5 статей

Эти 5 статей Яндекс счёл низкокачественными и выкинул из индекса:

| URL | Last access |
|---|---|
| `/blog/kak-vybrat-marketingovoe-agentstvo` | 2026-03-22 |
| `/blog/kak-vybrat-marketingovoe-agentstvo-tyumen/` | 2026-03-26 |
| `/blog/lokalnoe-seo-dlya-biznesa-v-tyumeni/` | 2026-03-26 |
| `/blog/sait-ili-vk-chto-vybrat-dlya-biznesa-v-tyumeni/` | 2026-03-26 |
| `/blog/yandex-direct-dlya-malogo-biznesa-oshibki` | 2026-03-10 |

**Действие:** это контент-задача, не техническая. Варианты:
1. Расширить статьи до 3000+ знаков с уникальным экспертным контентом
2. Объединить похожие (агентство / тюмень-версия) в одну статью, вторую → 301
3. Принять как «отсечённый длинный хвост»

---

## Ожидаемый результат через 7–14 дней

После того как Яндекс увидит 301 и обойдёт canonical URL'ы:
- Страниц в поиске должно подняться обратно к ~30+ (canonical версии перестанут быть «дублированными»)
- Активных диагностик типа NOT_CANONICAL должно стать меньше
- Позиции и трафик НЕ должны измениться (canonical не менялся)

---

## Что НЕ трогал

- LOW_QUALITY статьи — требует контент-работы (отдельная задача)
- sitemap.xml — уже корректный, все 77 URL без trailing slash
- robots.txt — не проверял, но существующие 301 правила (metcoin → svrq.store) работают

---

## Next check

**2026-04-24** (через 7 дней) — снять новый snapshot `yandex-webmaster-report.mjs`, сверить:
- Стало ли страниц в поиске ≥ 27
- Стало ли событий REMOVED_FROM_SEARCH за неделю < 5
- Закрылась ли NOT_CANONICAL как активная диагностика
