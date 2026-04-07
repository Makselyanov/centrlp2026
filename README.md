# CentrLP.ru

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

- Локальный `origin` у этого проекта сейчас указывает на `git@github.com:Makselyanov/centrlp2026.git`.
- Это означает, что `centrlp.ru` сейчас не соответствует цели "всё деплоится через личный git на сервере".
- На сервере в `/var/www/centrlp` лежит рабочее дерево с большим количеством незакоммиченных изменений.
- В `.github/workflows/static.yml` есть workflow под GitHub Pages, но продакшн фактически раздаётся через nginx с сервера `90.156.168.115`.

Иными словами: текущая схема публикации у основного сайта смешанная и требует приведения к одному источнику правды.

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
