# Карта сайтов CentrLP

Документ нужен, чтобы не смешивать основной сайт, CRM и отдельные лендинги.

## 1. Основной сайт

- Домен: `https://centrlp.ru`
- Локально: `G:\mvp\centrlp`
- На сервере: `/var/www/centrlp`
- Nginx root: `/var/www/centrlp/dist`
- Git remote: `ssh://root@90.156.168.115/home/deploy/git/centrlp.git`
- Назначение: основной маркетинговый сайт, услуги, блог, проекты, контакты

## 2. Закрытая бартерная витрина автомобиля

- Домен: `https://barter.centrlp.ru`
- Локально: `G:\mvp\centrlp`
- На сервере: `/var/www/centrlp`
- HTML: `/var/www/centrlp/dist/barter/sto/index.html`
- Nginx-конфиг: `nginx-barter-centrlp.conf`
- Назначение: непоисковая страница для адресной отправки потенциальным бартерным партнёрам
- Индексация: `noindex, nofollow, noarchive`, без sitemap

## 3. CRM-лендинг

- Домен: `https://crm.centrlp.ru`
- Локально: `G:\mvp\centrlp-landing`
- На сервере: `/var/www/centrlp-landing`
- Git remote: не настроен
- Назначение: отдельный лендинг CRM-продукта

## 4. Redirect/legacy

- `app.centrlp.ru` редиректится на `crm.centrlp.ru`

## 5. CRM-платформа

- Домен(ы): `https://centrlp.centrlp.ru`, `https://rosomaha.centrlp.ru` и tenant-поддомены
- Локально: `G:\mvp\crm`
- На сервере: `/var/www/crm`
- Git remote: личный git на `90.156.168.115`
- Назначение: multi-tenant CRM-платформа

## Вывод

На текущий момент экосистема разделена на основной сайт, отдельную бартерную витрину, CRM-лендинг и CRM-платформу:

- `centrlp.ru` — основной сайт
- `barter.centrlp.ru` — закрытая от индексации бартерная витрина
- `crm.centrlp.ru` — CRM-лендинг
- `G:\mvp\crm` — сама CRM

Если цель — единая и понятная публикация через личный git на сервере, то в первую очередь нужно привести к одному стандарту именно `G:\mvp\centrlp`.
