# SEO Configuration

## Сайт

- домен: [https://centrlp.ru/](https://centrlp.ru/)
- сервер: `90.156.168.115`
- локальный проект: `G:\mvp\centrlp`
- продакшн-путь: `/var/www/centrlp`
- nginx root: `/var/www/centrlp/dist`

## Yandex Webmaster

- секреты лежат в: `G:\mvp\centrlp\.env.seo.local`
- шаблон лежит в: `G:\mvp\centrlp\.env.seo.local.example`
- operational reports лежат в: `G:\mvp\centrlp\seo-reports`

## Что уже есть по SEO

- `robots.txt`
- `sitemap.xml`
- `canonical`
- `og:*`
- `twitter:*`
- `LocalBusiness` schema
- `Service`, `FAQPage`, `BreadcrumbList`, `Article` schema
- блоговые статьи в `content/posts`

## Что нужно заполнить вручную

В `.env.seo.local`:

- `YANDEX_WEBMASTER_CLIENT_ID`
- `YANDEX_WEBMASTER_TOKEN`
- `YANDEX_WEBMASTER_HOST_URL=https://centrlp.ru/`

Можно пока оставить пустыми:

- `YANDEX_WEBMASTER_USER_ID`
- `YANDEX_WEBMASTER_HOST_ID`

После первого успешного запуска скрипта эти два значения можно вставить обратно в `.env.seo.local`.

## Команда

```bash
npm run seo:yandex
```

## Выходные файлы

- `seo-reports/latest-yandex-webmaster-report.md`
- `seo-reports/latest-yandex-webmaster-report.json`
- месячные отчёты можно складывать в `seo-reports/monthly/`
