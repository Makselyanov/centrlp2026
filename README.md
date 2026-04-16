# CentrLP.ru

## AI Context

- Shared handoff for Claude/Codex: `plans/AI_HANDOFF.md`
- This file is not updated automatically from chat history.
- After major project changes, update `plans/AI_HANDOFF.md` in the same commit.

Основной маркетинговый сайт `centrlp.ru`.

По состоянию на `2026-03-26` этот проект был восстановлен локально из живого server working tree, потому что в `G:\mvp` локальной копии не было.

## Где что лежит

- Локальный путь: `G:\mvp\centrlp`
- Продакшн-путь на сервере: `/var/www/centrlp`
- Публичный домен: `https://centrlp.ru`
- Nginx root: `/var/www/centrlp/dist`

## Что это за проект

Сайт сделан на:

- React 18
- Vite 5
- TypeScript
- Tailwind CSS
- React Router
- Markdown-блоге из `content/posts`

Сайт содержит:

- главную страницу и маркетинговые страницы услуг
- блог под SEO-трафик
- страницы `prices`, `projects`, `about`, `contacts`
- служебные страницы `privacy` и `cookies`

## Быстрый старт

```bash
npm install
npm run build
npm run preview
```

Во время сборки дополнительно генерируется `public/sitemap.xml`.

## Структура проекта

```text
.
├── content/                 # SEO-статьи и контент
├── public/                  # robots, sitemap, favicon, OG assets
├── scripts/                 # генераторы sitemap/SEO-артефактов
├── src/
│   ├── components/          # layout, header, footer, SEO helpers
│   ├── lib/                 # утилиты, в т.ч. блог
│   └── pages/               # страницы сайта
├── nginx-centrlp.conf       # nginx-конфиг для продакшна
└── .github/workflows/       # GitHub Actions
```

## Текущее состояние, которое важно знать

- Основной `origin` у проекта уже указывает на личный git на сервере: `ssh://root@90.156.168.115/home/deploy/git/centrlp.git`.
- GitHub оставлен как дополнительный remote `github`, но не является основным продакшн-источником.
- Продакшн продолжает раздаваться через nginx с сервера `90.156.168.115` из `/var/www/centrlp/dist`.
- В `.github/workflows/static.yml` до сих пор лежит старый workflow под GitHub Pages, и он уже не отражает основную схему публикации.

Иными словами: основная git-схема уже переведена на личный серверный remote, но документацию и остатки старой GitHub Pages-схемы ещё нужно держать в актуальном состоянии.

## Документация

- [Карта сайтов](docs/SITES.md)
- [Деплой и эксплуатация](docs/DEPLOYMENT.md)
- [SEO и Яндекс Вебмастер](docs/SEO.md)

## Связанный проект

CRM-лендинг живёт отдельно:

- локально: `G:\mvp\centrlp-landing`
- на сервере: `/var/www/centrlp-landing`
- домен: `https://crm.centrlp.ru`

Это не тот же самый проект, что `centrlp.ru`.
