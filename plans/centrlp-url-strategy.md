---
project: centrlp
domain: centrlp.ru
plan_date: 2026-04-27
status: draft (awaiting Макс approval)
phase: 9
auditor: claude
---

# centrlp.ru — URL strategy

## Зачем нужен этот план

Phase 7 деплой 5 SEO-страниц положил их в **корень** домена (`/razrabotka-sajtov-tyumen/`, `/sozdanie-lendinga-tyumen/` и т.д.) без интеграции с существующей React Router архитектурой. Это создало:

1. Дубли смыслов с `/services/{english-slug}` (29 услуг)
2. Страницы-сироты без записи в `Routes` (доступны через статику nginx, но не из SPA)
3. SEO-канибализацию между русскими и английскими версиями одной услуги

Этот документ — стратегия как привести URL в порядок без массовой миграции и без поломки `/blog/`.

## Текущая структура centrlp.ru

### Что точно НЕ ломаем

- `/blog/` (BlogList) и `/blog/{slug}` (BlogPost) — 50+ статей
- 29 услуг в `/services/{english-slug}` — registered в App.tsx Routes, есть в sitemap, имеют органический трафик

### Текущая разноголосица

| URL pattern | Где | Smoke | Доступ |
|---|---|---|---|
| `/services` | `Services.tsx` | 200 | в Routes |
| `/services/{english-slug}` × 29 | `pages/services/*.tsx` | 200 | в Routes, в sitemap |
| `/blog` | `BlogList.tsx` | 200 | в Routes |
| `/blog/{slug}` | `BlogPost.tsx` | 200 | в Routes |
| `/{russian-slug}` × 5 (Phase 7) | `dist/<slug>/index.html` (статика) | 200 | НЕ в Routes; в sitemap (Phase 8) |

5 русских slugs:
- `/razrabotka-sajtov-tyumen` — дублирует `/services/website-development`
- `/sozdanie-lendinga-tyumen` — дублирует `/services/website-development`
- `/nastroyka-yandex-direct-tyumen` — дублирует `/services/yandex-direct`
- `/crm-dlya-biznesa` — дублирует `/services/custom-crm`
- `/ai-avtomatizaciya-biznesa` — дублирует `/services/n8n-automation` или `/services/ai-systems`

## Принципы стратегии

1. **Не ломать индексацию `/services/{english-slug}` — там органика.** Любая миграция = с 301 redirect.
2. **Не ломать `/blog/`.** Блог продолжает жить отдельно.
3. **Понять смысл каждой страницы**, прежде чем переносить:
   - Услуга = краткое описание оффера, прайсинг, CTA на форму. Идёт в `/services/{slug}`.
   - Статья = развёрнутое объяснение, кейсы, методология. Идёт в `/blog/{slug}`.
4. **5 моих Phase 7 страниц** (~1000-1300 слов, описательные) — ближе к **статьям**, чем к услугам.
5. **Городовая привязка («в Тюмени»)** — это фишка которую стоит сохранить. Английские slug в /services/ её теряют.

## Решение

### Вариант A: 5 Phase 7 страниц → /blog/ + 301 redirect (РЕКОМЕНДУЕМЫЙ)

Перенести 5 страниц в `/blog/{slug}` как полноценные blog-посты:

```
/razrabotka-sajtov-tyumen        →  /blog/razrabotka-sajtov-tyumen      (301)
/sozdanie-lendinga-tyumen        →  /blog/sozdanie-lendinga-tyumen      (301)
/nastroyka-yandex-direct-tyumen  →  /blog/nastroyka-yandex-direct-tyumen (301)
/crm-dlya-biznesa                →  /blog/crm-dlya-biznesa              (301)
/ai-avtomatizaciya-biznesa       →  /blog/ai-avtomatizaciya-biznesa     (301)
```

**Что делаем внутри статей:**
- В каждой `/blog/{slug}` — секция «Если хотите услугу» с CTA на каноничный `/services/{english-slug}`
- На `/services/{english-slug}` — секция «См. подробнее» с ссылкой на blog-пост (опционально)

**Преимущества:**
- Не дублируем услуги
- Использует существующую архитектуру `/blog/`
- Городовая привязка («в Тюмени») сохраняется в title/h1 blog-поста
- 301 сохраняет ссылочный вес из Phase 7 sitemap submit (если был) и внешних ссылок

**Что нужно проверить перед миграцией:**
- Как BlogList/BlogPost загружают контент — MDX, JSON, БД, API?
- Есть ли в `/blog/` категории/теги? Можно создать категорию «Услуги в Тюмени»
- Есть ли image/cover требования

### Вариант B: 5 страниц → /services/{russian-slug} с переименованием 29 английских

Перевести всю систему `/services/` на русские slugs:
- `/services/website-development` → `/services/razrabotka-sajtov-tyumen` (301)
- 29 редиректов + 29 переименований .tsx файлов

**Не делаем в Phase 9-10:** слишком инвазивно, ломает 29 уже проиндексированных URL, требует sync GSC + Yandex Webmaster.

### Вариант C: оставить 5 в корне как «промо-страницы»

Зарегистрировать 5 в Routes как лендинги без редиректа. Но это сохраняет дубли смыслов.

**Не рекомендую.**

## План реализации Варианта A

### Phase 9 (план)
1. Прочитать `BlogList.tsx`, `BlogPost.tsx` — понять как загружается контент
2. Идентифицировать формат blog-постов (MDX? JSON? markdown frontmatter?)
3. Подготовить 5 blog-постов в нужном формате (исходники в `G:\mvp\HUB\projects\centrlp\seo-pages-ready/`)

### Phase 10 (миграция)
1. Создать 5 blog-постов в системе блога
2. Локально build → smoke → deploy
3. На сервере: 301 redirect `/{russian-slug}` → `/blog/{russian-slug}` через nginx (rewrite в `nginx-centrlp.conf`)
4. Удалить статику `/var/www/centrlp/dist/{russian-slug}/`
5. Обновить sitemap: убрать `/{russian-slug}`, добавить `/blog/{russian-slug}`
6. `node bin/hub.mjs smoke-pages --slug=centrlp` — проверить

### Phase 11 (clean-up)
1. После того как Yandex/Google переиндексируют (4-6 недель) — мониторить позиции
2. Если 301 проблема — рассмотреть keep both с canonical

## Что точно НЕ делаем

- НЕ переименовываем 29 английских slug в `/services/` (Phase 11+ если когда-нибудь)
- НЕ удаляем 5 dist/{russian-slug}/index.html до пока 301 не работает (постепенный переход)
- НЕ submit'им IndexNow до полной интеграции в `/blog/` + 301
- НЕ ломаем canonical существующих /services/{english-slug} ссылаясь на /blog/{russian-slug} вместо них

## Открытые вопросы

1. **Формат blog-постов:** какой? (Нужно прочитать BlogList/BlogPost кода)
2. **Городовая привязка:** оставить в title/h1 «в Тюмени»? Или Тюмень убрать и сохранить в content + JSON-LD?
3. **Структура /blog/:** есть ли категории? Если да — куда положить 5 «услугоподобных» постов?
4. **GSC + Yandex Webmaster:** кто пере-submit'ит после миграции? Я могу через `scripts/yandex-webmaster-report.mjs` или Макс вручную?
5. **Стратегия для других «городовых» страниц** в будущем — `/uslugi-v-tyumeni/{slug}`?

## Связанные документы

- `seo-master-plan.md`
- `seo-onboarding-oauth-gsc.md`
- `G:\mvp\HUB\reports\site-structure-audit\centrlp-structure-audit.md`
- `G:\mvp\HUB\reports\smoke-pages\centrlp-smoke-2026-04-26.md`
