# Деплой и эксплуатация

## Текущее продакшн-окружение

- Сервер: `90.156.168.115`
- Продакшн-путь: `/var/www/centrlp`
- Каталог раздачи nginx: `/var/www/centrlp/dist`
- Nginx-конфиг в репозитории: `nginx-centrlp.conf`
- Закрытая бартерная витрина: `https://barter.centrlp.ru/`
- Nginx-конфиг бартерной витрины: `nginx-barter-centrlp.conf`

## Актуальное состояние на 2026-04-13

### Git

- основной remote проекта уже переведён на личный серверный git:
  - `origin = ssh://root@90.156.168.115/home/deploy/git/centrlp.git`
- GitHub сохранён как дополнительный remote:
  - `github = git@github.com:Makselyanov/centrlp2026.git`
- схема "личный git на сервере" для `centrlp.ru` уже внедрена

### Состояние сервера

- продакшн working tree живёт в `/var/www/centrlp`
- nginx раздаёт статическую сборку из `/var/www/centrlp/dist`
- после ручных live-фиксов сервер всё ещё стоит перепроверять как фактическое состояние публикации

### Автоматизация

- в репозитории есть `.github/workflows/static.yml`
- workflow ориентирован на GitHub Pages
- фактический продакшн при этом обслуживается nginx с вашего VPS
- этот workflow считается историческим хвостом и не должен восприниматься как основной deploy-процесс

Итог: основная схема публикации уже серверная, но документация и остаточные GitHub Pages-артефакты ещё нужно держать согласованными с реальностью.

## Как сайт раздаётся сейчас

`nginx` использует:

- `root /var/www/centrlp/dist`
- `try_files $uri $uri/index.html $uri/ @centrlp_not_found`
- неизвестные маршруты получают настоящий `404`

Это strict prerender-схема:

1. проект собирается в `dist`
2. `scripts/prerender-route-heads.mjs` создаёт `dist/<route>/index.html`
3. nginx отдаёт только физически собранные маршруты
4. прямой заход на новый URL работает только после `npm run build`

## Бартерная витрина на отдельном host

`barter.centrlp.ru` использует ту же production-сборку, но отдельный nginx virtual host:

- `/` отдаёт собранный файл `/var/www/centrlp/dist/barter/sto/index.html`;
- основной URL `https://centrlp.ru/barter/sto` отвечает `410 Gone`;
- страница имеет self-canonical `https://barter.centrlp.ru/`, `noindex, nofollow, noarchive` в HTML и `X-Robots-Tag` в HTTP;
- поддомен не публикует sitemap, а `robots.txt` не блокирует получение HTML, чтобы робот мог увидеть `noindex`;
- формы и first-party события проксируются в существующий mailer на `127.0.0.1:3021`.

DNS `A` для `barter.centrlp.ru` указывает на `90.156.168.115`. До первого включения HTTPS сертификат можно получить через уже доступный ACME webroot:

```bash
certbot certonly --webroot -w /var/www/crm/public -d barter.centrlp.ru
cp /var/www/centrlp/nginx-barter-centrlp.conf /etc/nginx/sites-available/barter.centrlp.ru
ln -sfn /etc/nginx/sites-available/barter.centrlp.ru /etc/nginx/sites-enabled/barter.centrlp.ru
nginx -t
systemctl reload nginx
```

Локальный preview корневой страницы поддомена в PowerShell:

```powershell
$env:VITE_BARTER_HOST_PREVIEW = "1"
npm run dev
```

## Что считать текущим источником правды

Практически важные источники правды сейчас такие:

- git remote `origin` на сервере: `/home/deploy/git/centrlp.git`
- production working tree: `/var/www/centrlp`
- локальная рабочая копия: `G:\mvp\centrlp`

Если есть расхождение между документами и live-сайтом, сначала проверять серверный working tree и текущий `origin`.

## Риски текущей схемы

- можно потерять изменения, если на сервере что-то правилось вручную вне git-потока
- GitHub remote не гарантирует совпадение с продом, потому что он вторичный
- невозможно уверенно откатиться
- непонятно, какой именно коммит реально опубликован
- сложно автоматизировать SEO- и контент-процессы

## Рабочий deploy-процесс

Текущий безопасный минимум для публикации:

1. Работать в локальной копии `G:\mvp\centrlp`.
2. Проверять `git status`, `npm run lint`, `npm run build`.
3. Публиковать изменения в серверный git `origin`.
4. Обновлять production working tree до того же коммита: `git pull --ff-only origin main`.
5. На production запускать `npm ci` при изменении зависимостей и `npm run build` для обновления `dist`.
6. Отдельно контролировать, что рабочее дерево `/var/www/centrlp` и собранный `dist` действительно обновлены.
7. После важных релизов перепроверять live-страницы и SEO-артефакты (`sitemap.xml`, `robots.txt`, prerendered heads).

## TikTok Content Studio

Маршрут `/tiktok` зависит от отдельного loopback-сервиса:

- каталог: `/var/www/centrlp/server/tiktok`;
- systemd unit: `centrlp-tiktok.service`;
- адрес: только `127.0.0.1:3023`;
- закрытый env-файл: `/etc/centrlp/tiktok.env`, владелец `root:root`,
  режим `0600`;
- зашифрованное состояние: `/var/lib/centrlp-tiktok`;
- `3022` не использовать: он принадлежит другому проекту.

При релизе, который меняет `server/tiktok`, `nginx-centrlp.conf` или маршрут
`/tiktok`, обязательны все шаги:

```bash
cd /var/www/centrlp
git pull --ff-only origin main
npm ci
npm run build

cd /var/www/centrlp/server/tiktok
npm ci --omit=dev
npm run check
npm test

install -o root -g root -m 0644 centrlp-tiktok.service \
  /etc/systemd/system/centrlp-tiktok.service
systemctl daemon-reload
systemctl enable --now centrlp-tiktok.service
systemctl is-active centrlp-tiktok.service
curl --fail --silent http://127.0.0.1:3023/health

install -o root -g root -m 0644 /var/www/centrlp/nginx-centrlp.conf \
  /etc/nginx/sites-available/centrlp
install -o root -g root -m 0644 /var/www/centrlp/nginx-centrlp.conf \
  /etc/nginx/sites-enabled/centrlp
nginx -t
systemctl reload nginx
curl --fail --silent https://centrlp.ru/api/tiktok/health
curl --fail --silent https://centrlp.ru/tiktok
```

До отдельного подтверждения процедуры трансграничной передачи в env обязаны
оставаться `TIKTOK_ENVIRONMENT=sandbox` и
`TIKTOK_CROSS_BORDER_APPROVED=0`. При таком режиме health и интерфейс
недоступности работают, а подключение, приём видео и публикация возвращают
fail-closed ответ без обращения к TikTok. Отключение уже сохранённой
авторизации остаётся доступным.

Перед reload нужно сохранить предыдущие версии systemd unit и nginx-конфига.
Откат выполняется на предыдущий git-коммит, предыдущий unit и предыдущий
nginx-конфиг с обязательными `nginx -t`, перезапуском сервиса и повторными
health-check. Нельзя оставлять опубликованный маршрут с прокси на
неустановленный или неактивный сервис.

## Что ещё осталось улучшить в эксплуатации

- либо окончательно убрать/архивировать `.github/workflows/static.yml`
- задокументировать точный серверный шаг после `git push`, если он выполняется не полностью автоматически
- по возможности убрать ручные правки напрямую в `/var/www/centrlp`
