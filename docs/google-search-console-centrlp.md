# Google Search Console и SEO: CentrLP

Дата проверки: 2026-07-02.

Этот файл фиксирует текущий статус SEO-интеграций по `https://centrlp.ru/` и безопасный порядок донастройки Google Search Console без публикации OAuth-секретов в git.

## Текущий статус

| Зона | Статус |
|---|---|
| Production URL | `https://centrlp.ru/` |
| Sitemap | `https://centrlp.ru/sitemap.xml` |
| Google DNS verification | TXT-запись опубликована: `google-site-verification=am5LufriFd_UQR-trs6xqqRnxaDft9tydM1XyCSqHpA` |
| Рекомендуемый GSC property | `sc-domain:centrlp.ru` |
| GSC API env | `.env.seo.local` заполнен локально; старый `GSC_REFRESH_TOKEN` был отозван или истек из-за OAuth app в статусе Testing |
| Локальный GSC-скрипт | `node scripts/gsc-report.mjs` |
| NPM-скрипт | `npm run seo:gsc` |
| Яндекс.Вебмастер | Подтвержден, активных диагностик нет |

## Что проверить в Google Search Console после входа

1. Открыть `https://search.google.com/search-console/`.
2. Выбрать property `sc-domain:centrlp.ru`.
3. Проверить раздел **Settings → Ownership verification**: метод DNS TXT должен быть активен.
4. Проверить раздел **Sitemaps**: должен быть отправлен `https://centrlp.ru/sitemap.xml`.
5. Если sitemap отсутствует, отправить его вручную.
6. В **URL Inspection** проверить:
   - `https://centrlp.ru/`
   - `https://centrlp.ru/blog`
   - `https://centrlp.ru/blog/proverka-roskomnadzora-sait-personalnye-dannye-cookie-metrika`
   - `https://centrlp.ru/services`
   - `https://centrlp.ru/ai-plan`
7. Для важных новых или обновленных страниц нажать **Request indexing**.
8. Через 2-7 дней после отправки sitemap смотреть первые данные в **Pages**, **Sitemaps** и **Performance**.

## Доступ через API

Секреты нельзя коммитить. Для запуска отчета нужно заполнить локальный `.env.seo.local`:

```env
GSC_CLIENT_ID=
GSC_CLIENT_SECRET=
GSC_REFRESH_TOKEN=
GSC_SITE_URL=sc-domain:centrlp.ru
```

После заполнения:

```bash
npm run seo:gsc
```

Скрипт сохраняет отчет в `seo-reports/latest-gsc-report.{json,md}`. Если отчет нужен только в консоль без записи файлов:

```bash
node scripts/gsc-report.mjs --no-save
```

Если Google возвращает `invalid_grant: Token has been expired or revoked`, сначала перевести OAuth-приложение в Google Auth Platform из **Testing** в **In production**, затем выпустить новый refresh-токен:

```bash
npm run seo:gsc:reauth
```

Открыть выведенный URL в авторизованном браузере Google и дождаться локального callback. Скрипт обновляет только `.env.seo.local`; секреты не коммитятся.

## Свежий снимок Яндекс.Вебмастера

Команда:

```bash
node scripts/yandex-webmaster-report.mjs --no-save
```

Результат на 2026-07-02:

- `https://centrlp.ru` подтвержден в Яндекс.Вебмастере.
- Активных диагностик нет.
- Sitemap `https://centrlp.ru/sitemap.xml` подключен, ошибок по sitemap нет.
- В поиске: 42 страницы.
- Исключено: 3 страницы.
- SQI: 10.
- `/`, `/services`, `/blog`, `/services/yandex-direct` и свежая статья `/blog/crm-dlya-malogo-biznesa-tyumen-zayavki` отвечают `200` и имеют title/canonical/description/og-разметку.

## Источники

- Google Search Console Help, подтверждение права собственности: `https://support.google.com/webmasters/answer/9008080`
- Google Search Console: `https://search.google.com/search-console/`
- Яндекс.Вебмастер API: `https://api.webmaster.yandex.net/v4`
