import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Palette,
  MessageSquare,
  BarChart3,
  FileText,
  Target,
  Users,
  CheckCircle2,
} from "lucide-react";

const Services = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Услуги агентства CentrLP</h1>
            <p className="text-xl text-muted-foreground">
              Полный комплекс маркетинговых услуг для малого бизнеса: от стратегии до конкретных
              заявок
            </p>
          </div>
        </div>
      </section>

      {/* Сайты и упаковка */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="mb-4">Сайты и упаковка</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Создаём сайты, которые продают. Разрабатываем фирменный стиль и упаковку для
              социальных сетей.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-card">
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Сайт на Tilda (5–10 страниц)</h3>
              <p className="text-muted-foreground mb-6">
                Разработка продающего многостраничного сайта на конструкторе Tilda. От
                прототипирования до запуска с настроенной аналитикой.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Анализ конкурентов и целевой аудитории</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Прототип структуры и блоков</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Дизайн в фирменном стиле</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Адаптив под все устройства</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Формы заявок и квизы для сегментации</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Интеграция с CRM и мессенджерами</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Настройка Яндекс.Метрики и целей</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Базовая SEO-оптимизация</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card">
              <Palette className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Дизайн и прототипирование</h3>
              <p className="text-muted-foreground mb-6">
                Продуманная структура сайта и визуальное оформление, которое решает бизнес-задачи и
                конвертирует посетителей в клиентов.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Исследование целевой аудитории</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Проработка Customer Journey Map</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Прототипы ключевых страниц</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">UI/UX дизайн с учётом конверсии</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Мокапы для согласования</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Фирменный стиль и логотип</h3>
              <p className="text-muted-foreground mb-6">
                Разработка визуальной идентичности бренда: от логотипа до полного брендбука с
                правилами использования.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">3–5 концепций логотипа</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Фирменная цветовая палитра</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Подбор шрифтов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Шаблоны визиток, бланков, презентаций</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Гайдлайн по использованию</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Нейминг и продающие офферы</h3>
              <p className="text-muted-foreground mb-6">
                Создание запоминающегося названия компании и разработка продающих предложений,
                которые выделяют вас среди конкурентов.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Анализ ниши и конкурентов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">3–5 вариантов названий с обоснованием</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Проверка доменов и товарных знаков</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Разработка УТП (уникальных торговых предложений)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Варианты офферов для разных сегментов ЦА</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card col-span-full">
              <svg className="w-12 h-12 mb-4" fill="hsl(var(--primary))" viewBox="0 0 24 24">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.118-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
              </svg>
              <h3 className="text-2xl font-bold mb-4">Оформление ВКонтакте</h3>
              <p className="text-muted-foreground mb-6">
                Профессиональное оформление сообщества ВКонтакте для привлечения и удержания
                клиентов. Превращаем группу в эффективный инструмент продаж.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Дизайн обложки и аватара</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Настройка меню с кнопками действий</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Закреп с продающим предложением</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Оформление альбомов и подборок</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Перенос отзывов клиентов</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Настройка товаров и каталога</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Виджеты и приложения для вовлечения</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Автоматизация приветствий</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Чат-боты и коммуникации */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="mb-4">Чат-боты и коммуникации</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Автоматизируем общение с клиентами. Боты работают круглосуточно и не теряют заявки.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-card bg-card">
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Чат-бот ВКонтакте / виджет на сайт</h3>
              <p className="text-muted-foreground mb-6">
                Умный бот, который консультирует клиентов, собирает заявки и интегрируется с вашей
                CRM.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Ответы на частые вопросы</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Квалификация лидов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Интеграция с CRM и Google Таблицами</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Уведомления менеджерам о новых заявках</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card bg-card">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Автоответы 24/7 и запись на услугу</h3>
              <p className="text-muted-foreground mb-6">
                Клиенты получают ответы мгновенно в любое время суток. Бот записывает на удобное
                время и напоминает о визите.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Календарь свободных слотов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Автоматические напоминания за день и час</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Сбор обратной связи после визита</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Синхронизация с календарём мастера</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card bg-card">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Скрипты / FAQ для оператора</h3>
              <p className="text-muted-foreground mb-6">
                Готовая база знаний для ваших операторов: ответы на возражения, инструкции по
                работе с разными типами клиентов.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Скрипты для холодных и тёплых звонков</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Работа с возражениями</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Допродажи и кросс-продажи</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Чек-листы для контроля качества</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card bg-card">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Help-бот поддержки клиентов</h3>
              <p className="text-muted-foreground mb-6">
                Бот-консультант решает типовые вопросы клиентов, экономя время вашей команды на
                рутинных задачах.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">База знаний по продуктам и услугам</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Помощь в выборе товара или услуги</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Передача сложных вопросов оператору</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Аналитика частых проблем</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Реклама и аналитика */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="mb-4">Реклама и аналитика</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Запускаем рекламу, которая окупается. Настраиваем аналитику и контролируем каждый
              рубль бюджета.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-card">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Яндекс Директ (поиск + РСЯ)</h3>
              <p className="text-muted-foreground mb-6">
                Настройка контекстной рекламы для привлечения клиентов, которые уже ищут ваши
                товары или услуги.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Сбор семантического ядра</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Настройка кампаний поиска и РСЯ</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Ретаргетинг и динамический ремаркетинг</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Еженедельная оптимизация ставок</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Подробные отчёты по заявкам</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card">
              <svg className="w-12 h-12 mb-4" fill="hsl(var(--primary))" viewBox="0 0 24 24">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.118-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
              </svg>
              <h3 className="text-2xl font-bold mb-4">Реклама ВКонтакте (лиды, ретаргет)</h3>
              <p className="text-muted-foreground mb-6">
                Таргетированная реклама для точного попадания в вашу целевую аудиторию в социальной
                сети.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Настройка таргетинга по интересам и поведению</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Лид-формы для сбора заявок</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Ретаргетинг на посетителей сайта</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Lookalike-аудитории</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Видеореклама и сторис</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Веб-аналитика: Метрика, цели, отчёты</h3>
              <p className="text-muted-foreground mb-6">
                Полная прозрачность: видите источники заявок, стоимость привлечения и поведение
                пользователей на сайте.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Настройка Яндекс.Метрики и целей</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Отслеживание звонков и заявок</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Карты кликов и вебвизор</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Дашборды с ключевыми метриками</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Еженедельные отчёты по email</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">A/B-тесты креативов и посадочных</h3>
              <p className="text-muted-foreground mb-6">
                Тестируем гипотезы и находим лучшие варианты для снижения стоимости заявки и роста
                конверсии.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Тестирование заголовков и офферов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Сплит-тесты креативов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Оптимизация форм заявок</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Быстрое отключение неэффективных вариантов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Масштабирование лучших связок</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Стратегия и контент */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="mb-4">Стратегия и контент</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Разрабатываем маркетинговую стратегию и создаём контент, который продаёт.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-card bg-card">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Маркетинговая стратегия и медиаплан</h3>
              <p className="text-muted-foreground mb-6">
                Комплексный план продвижения с конкретными действиями, сроками и прогнозом
                результатов.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Анализ ниши и конкурентов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Сегментация целевой аудитории</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Разработка УТП и позиционирования</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Карта гипотез для тестирования</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Медиаплан на 3–6 месяцев</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card bg-card">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Контент-план ВК, креативы, посты</h3>
              <p className="text-muted-foreground mb-6">
                Регулярные публикации для поддержания активности сообщества и вовлечения
                аудитории.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Контент-план на месяц</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Дизайн креативов в фирменном стиле</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Написание продающих и вовлекающих постов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Отложенный постинг</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Аналитика охватов и вовлечённости</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card bg-card">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Тексты для сайта и объявлений</h3>
              <p className="text-muted-foreground mb-6">
                Продающие тексты, которые закрывают возражения и мотивируют к действию.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Заголовки и подзаголовки для лендинга</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Описание товаров и услуг</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Тексты объявлений для Директа и ВК</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Работа с возражениями</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Призывы к действию (CTA)</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card bg-card">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Упаковка офферов под нишу</h3>
              <p className="text-muted-foreground mb-6">
                Адаптируем предложения под особенности вашей ниши и боли целевой аудитории.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Исследование болей ЦА</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">3–5 вариантов офферов</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Тестирование на фокус-группе</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Упаковка в виде лид-магнита</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Пакетирование услуг</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Готовы запустить продажи?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Оставьте заявку, и мы составим индивидуальный план работ под вашу нишу
          </p>
          <a href="/#form">
            <Button size="lg" className="animate-pulse-gentle">
              Получить консультацию
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
