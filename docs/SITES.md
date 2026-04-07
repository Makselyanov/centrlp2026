# Карта сайтов CentrLP

Документ нужен, чтобы не смешивать основной сайт, CRM и отдельные лендинги.

## 1. Основной сайт

- Домен: `https://centrlp.ru`
- Локально: `G:\mvp\centrlp`
- На сервере: `/var/www/centrlp`
- Nginx root: `/var/www/centrlp/dist`
- Git remote: `git@github.com:Makselyanov/centrlp2026.git`
- Назначение: основной маркетинговый сайт, услуги, блог, проекты, контакты

## 2. CRM-лендинг

- Домен: `https://crm.centrlp.ru`
- Локально: `G:\mvp\centrlp-landing`
- На сервере: `/var/www/centrlp-landing`
- Git remote: не настроен
- Назначение: отдельный лендинг CRM-продукта

## 3. Redirect/legacy

- `app.centrlp.ru` редиректится на `crm.centrlp.ru`

## 4. CRM-платформа

- Домен(ы): `https://centrlp.centrlp.ru`, `https://rosomaha.centrlp.ru` и tenant-поддомены
- Локально: `G:\mvp\crm`
- На сервере: `/var/www/crm`
- Git remote: личный git на `90.156.168.115`
- Назначение: multi-tenant CRM-платформа

## Вывод

На текущий момент экосистема разбита минимум на три разных проекта:

- `centrlp.ru` — основной сайт
- `crm.centrlp.ru` — CRM-лендинг
- `G:\mvp\crm` — сама CRM

Если цель — единая и понятная публикация через личный git на сервере, то в первую очередь нужно привести к одному стандарту именно `G:\mvp\centrlp`.
