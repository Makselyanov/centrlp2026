import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, Brain, Target, MessageSquare, LineChart, Sparkles, Check, Rocket, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "react-router-dom";
import vkAnalyticsImage from "@/assets/vk-analytics.png";
import vkMessagesImage from "@/assets/vk-messages.png";
import { Hero } from "@/components/Hero";

const Index = () => {
  return (
    <Layout>
      <Hero />

      {/* Services Section */}
      <section id="services" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Что мы делаем</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Полный цикл запуска продаж в интернете: от стратегии до первых заявок
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 hover-scale shadow-card">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Маркетинговая стратегия</h3>
              <p className="text-muted-foreground">
                Анализ ниши, сегментирование аудитории, разработка УТП и карты гипотез.
                Составление медиаплана с понятными этапами и KPI.
              </p>
            </Card>

            <Card className="p-6 hover-scale shadow-card">
              <Sparkles className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Сайт на Тильде (5–10 страниц)</h3>
              <p className="text-muted-foreground">
                Прототип → дизайн → сборка на Тильде. Формы заявок, квизы, интеграция с
                Метрикой и настройка целей. Адаптив под все устройства.
              </p>
            </Card>

            <Card className="p-6 hover-scale shadow-card">
              <svg className="w-10 h-10 mb-4" fill="hsl(var(--primary))" viewBox="0 0 24 24">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.118-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
              </svg>
              <h3 className="text-xl font-bold mb-3">Оформление ВКонтакте</h3>
              <p className="text-muted-foreground">
                Обложка, меню с кнопками, закреп с предложением, перенос отзывов. Настройка
                товаров и каталога для вашей ниши.
              </p>
            </Card>

            <Card className="p-6 hover-scale shadow-card">
              <Bot className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Чат-боты (ВК и сайт)</h3>
              <p className="text-muted-foreground">
                Автоматическая запись на услуги, автоответы 24/7, напоминания о визите. Сценарии
                через промт-инжиниринг под вашу нишу.
              </p>
            </Card>

            <Card className="p-6 hover-scale shadow-card">
              <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              <h3 className="text-xl font-bold mb-3">Фирменный стиль и нейминг</h3>
              <p className="text-muted-foreground">
                Логотип, фирменная палитра, шрифты, шаблоны документов. Разработка 3–5 вариантов
                названий компании и продающих предложений.
              </p>
            </Card>

            <Card className="p-6 hover-scale shadow-card">
              <LineChart className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Реклама Яндекс.Директ и ВК</h3>
              <p className="text-muted-foreground">
                Стартовые кампании по ключевым запросам, ретаргетинг, быстрые A/B-тесты
                креативов. Отчёты по CPL и конверсиям с первой недели.
              </p>
            </Card>
          </div>

          <div className="bg-accent-2/10 rounded-2xl p-8 text-center">
            <Brain className="w-12 h-12 text-accent-2 mx-auto mb-4" />
            <p className="text-lg text-foreground max-w-3xl mx-auto">
              Используем ИИ для поиска работающих формул, генерации креативов и ускоренных
              A/B-тестов, чтобы быстрее выйти на рабочие связки.
            </p>
          </div>
        </div>
      </section>

      {/* AI Integration Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">ИИ-внедрение для вашего бизнеса</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Автоматизация коммуникаций, снижение нагрузки на персонал, увеличение конверсии
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center shadow-card">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3">ИИ-автоответы 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Бот отвечает на типовые вопросы, собирает заявки и разгружает телефон даже ночью и
                в выходные.
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-16 h-16 rounded-full bg-accent-1/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-accent-1" />
              </div>
              <h3 className="text-lg font-bold mb-3">ИИ-скрипты продаж</h3>
              <p className="text-sm text-muted-foreground">
                Подсказки для оператора или мастера по ходу диалога: возражения, допродажи,
                ответы на частые вопросы.
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-16 h-16 rounded-full bg-accent-2/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-accent-2" />
              </div>
              <h3 className="text-lg font-bold mb-3">ИИ-тексты и заголовки</h3>
              <p className="text-sm text-muted-foreground">
                Генерация и автоподбор вариантов под нишу: грамотный русский без лишних
                англицизмов, адаптация под ЦА.
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <LineChart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3">A/B-тесты на основе ИИ</h3>
              <p className="text-sm text-muted-foreground">
                Быстрая генерация версий блоков лендинга, отключаем слабые варианты по данным
                Метрики за 3–7 дней.
              </p>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Соблюдаем 152-ФЗ и требования к содержанию рекламы.
          </p>
        </div>
      </section>

      {/* Barter Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Бартер-пакеты по нишам</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Обмениваем маркетинговые услуги на вашу продукцию или сервис. Работаем по договору.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="p-8 shadow-card hover-scale">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Для мебельщиков</h3>
              <p className="text-muted-foreground mb-4">
                Сайт-портфолио с квизом «Рассчитать кухню», ИИ-бот по материалам и срокам.
                Оформление ВК. Реклама по запросам «кухня на заказ» и локальным районам.
              </p>
              <Link to="/barter">
                <Button variant="outline" className="w-full">
                  Подробнее
                </Button>
              </Link>
            </Card>

            <Card className="p-8 shadow-card hover-scale">
              <div className="bg-accent-1/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="hsl(var(--accent-1))" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Для СТО и детейлинга</h3>
              <p className="text-muted-foreground mb-4">
                Сайт с квизом «записаться/рассчитать», упаковка ВК, автоответы бота. Реклама по
                маркам авто и видам работ: полировка, химчистка, ремонт.
              </p>
              <Link to="/barter">
                <Button variant="outline" className="w-full">
                  Подробнее
                </Button>
              </Link>
            </Card>

            <Card className="p-8 shadow-card hover-scale">
              <div className="bg-accent-2/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="hsl(var(--accent-2))" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Для клининга</h3>
              <p className="text-muted-foreground mb-4">
                Сайт с калькулятором уборки, ИИ-бот для расчёта площади и графика. Ретаргет ВК и
                РСЯ на тех, кто уже заходил на сайт.
              </p>
              <Link to="/barter">
                <Button variant="outline" className="w-full">
                  Подробнее
                </Button>
              </Link>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-lg text-foreground mb-4">
              Эквивалентный пакет от 80 000 ₽. По бартеру — взаимозачёт, оформляем договор.
            </p>
            <p className="text-muted-foreground mb-6">
              По аналогии собираем бартер-пакеты для салонов красоты, турагентств и других ниш.
            </p>
            <Link to="/barter">
              <Button size="lg">Узнать условия бартера</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Процесс работы</h2>
            <p className="text-xl text-muted-foreground">
              Прозрачная система с четкими этапами и отчётностью
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-12">
            {[
              { step: "1", title: "Бриф и аудит", desc: "Изучаем нишу, конкурентов, ЦА" },
              { step: "2", title: "Прототип и стратегия", desc: "Карта гипотез, медиаплан" },
              { step: "3", title: "Дизайн и сборка", desc: "Сайт + оформление ВК" },
              { step: "4", title: "Настройка Метрики", desc: "Цели, чат-боты, формы" },
              { step: "5", title: "Запуск рекламы", desc: "Отчёт по лидам через 7 дней" },
            ].map((item) => (
              <Card key={item.step} className="p-6 text-center shadow-card">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <a href="#form">
              <Button size="lg">Запросить план работ</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Прозрачные цены</h2>
            <p className="text-xl text-muted-foreground">
              Работаем по договору. Оплата по этапам 50/50.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="p-8 shadow-card">
              <h3 className="text-2xl font-bold mb-4">Старт</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">от 60 000 ₽</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Сайт 5–7 страниц на Tilda</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Базовое оформление ВК</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Яндекс.Метрика и цели</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Формы заявок</span>
                </li>
              </ul>
              <Link to="/prices">
                <Button variant="outline" className="w-full">
                  Подробнее
                </Button>
              </Link>
            </Card>

            <Card className="p-8 shadow-card border-2 border-primary">
              <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                ПОПУЛЯРНЫЙ
              </div>
              <h3 className="text-2xl font-bold mb-4">Под ключ</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">от 80 000 ₽</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Всё из пакета «Старт»</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Чат-боты ВК и сайт</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">ИИ-скрипты и автоответы</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Запуск рекламы (2 канала)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Первый отчёт через 7 дней</span>
                </li>
              </ul>
              <Link to="/prices">
                <Button className="w-full">Выбрать пакет</Button>
              </Link>
            </Card>

            <Card className="p-8 shadow-card">
              <h3 className="text-2xl font-bold mb-4">Ведение рекламы</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">30 000 ₽</span>
                <span className="text-muted-foreground">/мес</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Ведение кампаний Директ и ВК</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">A/B-тесты креативов</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Еженедельные отчёты</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">+ рекламный бюджет</span>
                </li>
              </ul>
              <Link to="/prices">
                <Button variant="outline" className="w-full">
                  Подробнее
                </Button>
              </Link>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Бартер — взаимозачёт услуг по согласованному договору.
            </p>
          </div>
        </div>
      </section>

      {/* Business Plans Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Бизнес-планы и расчёты с ИИ</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Помогаем владельцам малого бизнеса посчитать экономику проекта: бизнес-план,
                сметы, прайсы и базовую юнит-экономику.
              </p>
              <p className="text-muted-foreground mb-8">
                Используем ИИ для ускорения расчётов и проверки гипотез. Подготовим документы для
                получения субсидий, грантов или просто для понимания окупаемости вашей идеи.
              </p>
              <Link to="/business-plans">
                <Button size="lg">Подробнее о бизнес-планах</Button>
              </Link>
            </div>
            <Card className="p-8 shadow-card">
              <h3 className="text-xl font-bold mb-6">Что входит:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Бизнес-план под субсидии и гранты</span>
                    <span className="text-sm text-muted-foreground">
                      Структурированный документ с финансовыми расчётами
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Финмодель и юнит-экономика</span>
                    <span className="text-sm text-muted-foreground">
                      Прогноз доходов, расходов, точка безубыточности
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Сметы и прайсы с ИИ</span>
                    <span className="text-sm text-muted-foreground">
                      Анализ конкурентов, подбор оптимальных цен
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Разбор текущей экономики</span>
                    <span className="text-sm text-muted-foreground">
                      Аудит рентабельности существующего бизнеса
                    </span>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Реальные кейсы</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Как мы строим стабильный поток клиентов для малого бизнеса
            </p>
          </div>

          {/* Case 1: СТО и детейлинг */}
          <Card className="mb-12 p-8 lg:p-12 shadow-card animate-fade-in">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-3">
                Кейс: как мы за год превратили СТО в магнит для заявок из VK Рекламы
              </h3>
              <p className="text-lg text-muted-foreground">
                Работа по бартеру. Клиент — детейлинг-центр, полный цикл работ: керамика, оклейка, шумка, ремонт, кузовщина.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <Target className="w-6 h-6 text-primary mr-2" />
                  Задача клиента
                </h4>
                <p className="text-foreground mb-4">
                  «Нужны заявки. Хотим стабильность, а не рывками».
                </p>
                <p className="text-muted-foreground">
                  Точка входа была такая: реклама как будто есть, но система не работает.
                  Заявки хаотичные, неструктурированные, льётся мимо.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 text-accent-1 mr-2" />
                  Что сделали
                </h4>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Создали новую матрицу рекламных кампаний по направлениям (2–4 слоя керамики, оклейка, кузовной ремонт, детейлинг, шумка)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Настроили и вели VK Ads под CPL, фактически перезапустили всю рекламу</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Оттестировали связки офферов и креативов</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Сделали автоворонки в сообщениях</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Написали тексты, оформили структуру сообщений, добавили быстрые ответы</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Проводили аналитику по каждому сегменту и корректировали кампании</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 mb-8">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <LineChart className="w-6 h-6 text-primary mr-2" />
                Результат
              </h4>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Длительность работы</p>
                  <p className="text-2xl font-bold text-primary">12 месяцев</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Стабильность</p>
                  <p className="text-2xl font-bold text-accent-2">Ежедневно</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Качество</p>
                  <p className="text-2xl font-bold text-accent-1">Готовые клиенты</p>
                </div>
              </div>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Стабильные ежедневные заявки</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Живые вопросы по керамике 2–4 слоя, оклейке, шумоизоляции, детейлингу</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Записи на осмотр, консультации, расчёт стоимости</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Диалоги, где клиент уже готов ехать</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4 italic">
                Это не всплески. Это постоянство. 12 месяцев подряд.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl overflow-hidden hover-scale">
                <img
                  src={vkAnalyticsImage}
                  alt="Аналитика рекламной кампании VK Ads для детейлинг-центра"
                  className="w-full h-auto"
                />
                <p className="p-4 text-sm text-muted-foreground">
                  Аналитика рекламной кампании: стабильный поток результатов
                </p>
              </div>
              <div className="bg-background rounded-xl overflow-hidden hover-scale">
                <img
                  src={vkMessagesImage}
                  alt="Примеры входящих сообщений от клиентов детейлинг-центра"
                  className="w-full h-auto"
                />
                <p className="p-4 text-sm text-muted-foreground">
                  Входящие сообщения: качественные заявки каждый день
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-lg font-bold mb-3">Почему получилось</h4>
              <p className="text-foreground">
                Потому что мы не занимаемся «красивыми словами» о маркетинге.
                Мы копаем до живого оффера, строим систему и доводим её до результата.
                Работа строилась как полноценное ведение, а не разовая настройка.
              </p>
            </div>
          </Card>

          {/* Case 2: Напольное покрытие */}
          <Card className="mb-12 p-8 lg:p-12 shadow-card animate-fade-in">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-3">
                Кейс: продающая система для напольного покрытия
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <Target className="w-6 h-6 text-primary mr-2" />
                  Проблема
                </h4>
                <p className="text-foreground">
                  У клиента были разрозненные попытки рекламы, которые не давали стабильного потока обращений.
                  Не было структуры, оффера, понятной логики сегментации и нормальной обработки входящих.
                  Из-за этого реклама работала непредсказуемо и не давала нужного объёма обращений.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 text-accent-1 mr-2" />
                  Решение
                </h4>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Перезапустили рекламные кампании с правильным разделением по типам помещений</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Сформировали понятный и конкретный оффер</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Выстроили обработку сообщений и настроили автоматизацию</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Привели в порядок коммуникации с клиентами</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Подключили аналитику, чистили всё лишнее, усиливали рабочие связки</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Корректировали подход под реальный спрос</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-accent-1/5 rounded-xl p-6 mb-6">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <LineChart className="w-6 h-6 text-accent-1 mr-2" />
                Результат
              </h4>
              <p className="text-foreground mb-4">
                У клиента появилась стабильная, ровная работа рекламного канала — без провалов,
                скачков и непредсказуемости.
              </p>
              <p className="text-foreground font-semibold">
                Теперь рекламный трафик превращается в постоянный поток обращений, а продажи
                опираются на понятную, управляемую систему, которая работает каждый день и не
                зависит от удачи.
              </p>
            </div>

            <div className="bg-primary/5 rounded-xl p-6">
              <p className="text-foreground">
                <strong>Для кого это актуально:</strong> Если вы продаёте покрытия, оборудование,
                материалы или работаете с коммерческими помещениями — вы можете получить такой же
                структурный, стабильный и управляемый поток клиентов. Реклама наконец начнёт работать
                так, как должна.
              </p>
            </div>
          </Card>

          <div className="text-center">
            <Link to="/cases">
              <Button size="lg" variant="outline" className="mr-4">
                Смотреть все кейсы
              </Button>
            </Link>
            <a href="#form">
              <Button size="lg">
                Получить такой же результат
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="form" className="py-20 gradient-hero">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="mb-4">Оставьте заявку</h2>
            <p className="text-lg text-muted-foreground">
              Ответим в течение часа. Консультация бесплатна.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A644fd3fd8f74799009f60c932487dc7ef6b4d7208f53ac7e5e596cb6eec650ac&source=constructor"
          width="100%"
          height="400"
          frameBorder="0"
          title="Карта"
        ></iframe>
      </section>
    </Layout>
  );
};

export default Index;
