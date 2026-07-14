import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Target, TrendingUp, Eye, Zap, CheckCircle, Settings, LineChart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useFaqSchema, useAutoBreadcrumb, useServiceSchema } from "@/components/SeoSchemas";

const WebAnalytics = () => {
  const faqItems = [
    { question: "Чем отличается Метрика от Google Analytics?", answer: "Метрика лучше работает с российским трафиком и рекламой в РФ: Яндекс Директ, карты, ВК и локальные источники. GA4 удобнее для международных проектов. Для бизнеса в Тюмени обычно начинаем с Метрики, целей и UTM, а GA4 подключаем как дополнительный слой данных." },
    { question: "Зачем нужны цели, если счетчик уже стоит?", answer: "Без целей вы видите только посещаемость. Цели показывают, сколько пользователей совершили важные действия: отправили заявку, кликнули по телефону, открыли мессенджер, дошли до формы или получили ошибку. Это основа для оценки эффективности рекламы." },
    { question: "Как быстро будет готова аналитика?", answer: "Базовую настройку делаем за 3-5 дней. Расширенная с электронной торговлей и интеграциями — 1-2 недели в зависимости от сложности сайта и количества целей." },
    { question: "Нужно ли что-то делать после настройки?", answer: "Да, после запуска важно смотреть не только визиты, а путь заявки: источник, страница, CTA, форма, звонок, мессенджер, отправка и обработка. Мы показываем, какие отчеты открывать и какие решения принимать по данным." },
    { question: "Можно ли связать аналитику с CRM?", answer: "Да, можно связать форму, UTM, страницу входа и источник обращения с CRM или таблицей лидов. Тогда видно не только клики, но и реальные заявки, скорость ответа и результат обработки." },
    { question: "Что делать, если сайт получает трафик, но заявок нет?", answer: "Начинаем с проверки целей и событий: видит ли Метрика открытие формы, отправку, ошибки, клики по телефону и мессенджерам. После этого становится понятно, проблема в трафике, посадочной странице, форме или обработке заявки." },
  ];
  useFaqSchema(faqItems);
  useAutoBreadcrumb("Веб-аналитика");
  useServiceSchema({
    name: "Настройка веб-аналитики, Метрики и целей в Тюмени",
    description: "Настройка Яндекс Метрики, целей, событий, UTM, отчетов и связи заявки с CRM для бизнеса в Тюмени.",
    price: "15000",
  });

  return (
    <Layout
      title="Настройка веб-аналитики и Метрики в Тюмени от 15 000 ₽ | CentrLP"
      description="Настроим Яндекс Метрику, цели, события, UTM и отчеты для сайта, рекламы и CRM: видно, откуда приходят заявки и где теряется клиент."
    >
      {/* Hero Block */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Настройка веб-аналитики, Метрики и целей в Тюмени
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Свяжем сайт, Яндекс Директ, UTM, формы, звонки, мессенджеры и CRM, чтобы было видно не только посещения,
              а реальный путь заявки: от источника трафика до обработки менеджером.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Метрика и цели</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>UTM и источники</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Заявки и CRM</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="?intent=web-analytics#contact">Получить расчёт от 15 000 ₽</a>
            </Button>
          </div>
        </div>
      </section>

      <ServiceImageBand slug="web-analytics" alt="web-analytics — иллюстрация услуги CentrLP" />

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Что настраиваем, чтобы видеть заявки</h2>
              <p className="text-lg text-muted-foreground">
                Счетчик сам по себе не отвечает на главный вопрос бизнеса: какой канал дает обращения. Поэтому собираем не набор графиков, а понятную связку рекламы, сайта и обработки лида.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Цели Метрики",
                  text: "Отправка формы, клик по телефону, переход в Telegram, открытие мессенджера, ошибка формы и ключевые CTA на посадочных страницах.",
                },
                {
                  title: "UTM и рекламные источники",
                  text: "Структура меток для Яндекс Директа, VK, Telegram, Дзен и ручных публикаций, чтобы не смешивать каналы в отчетах.",
                },
                {
                  title: "Маршрут заявки",
                  text: "Связка формы, уведомлений, CRM или таблицы лидов: видно, куда попадает обращение и как быстро оно обрабатывается.",
                },
              ].map((item) => (
                <Card key={item.title} className="h-full">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline">
                <a href="/blog/nastrojka-veb-analitiki-metrika-zayavki-tyumen">Что входит и как принять работу</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/blog/skvoznaya-analitika-malyj-biznes-tyumen">Когда нужна сквозная аналитика</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/proverka-saita-i-zayavok-za-48-chasov">Проверить путь заявки</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/nastroyka-yandex-direct-tyumen">Связать с Яндекс Директом</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/crm-dlya-biznesa">Передавать заявки в CRM</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Кому нужна веб-аналитика</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Рекламодатели</h3>
                <p className="text-muted-foreground">
                  Понимать, какие каналы и кампании приносят заявки, а какие сливают бюджет. Оценка источников по обращениям, а не только по кликам.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Владельцы бизнеса</h3>
                <p className="text-muted-foreground">
                  Принимать решения на основе данных: что улучшить на сайте, куда инвестировать, какие страницы и формы дорабатывать.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Eye className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                <p className="text-muted-foreground">
                  Отслеживать полный путь клиента: от первого клика до покупки. Электронная торговля, корзины, средний чек.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Почему аналитика не работает</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-primary" />
                  Счетчик установлен, но не настроен
                </h3>
                <p className="text-muted-foreground">
                  Код Метрики или Analytics есть на сайте, но без целей и событий вы не понимаете, какие действия важны и откуда приходят конверсии.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  Непонятные данные
                </h3>
                <p className="text-muted-foreground">
                  Цифры есть, но вы не знаете, как их интерпретировать. Отчеты перегружены метриками, которые не влияют на бизнес-решения.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <LineChart className="w-6 h-6 text-primary" />
                  Невозможно посчитать ROI
                </h3>
                <p className="text-muted-foreground">
                  Вы тратите деньги на рекламу, но не знаете точно, сколько заработали с каждого канала. Нет связи между расходами и доходами.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Solve */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Как мы настраиваем аналитику</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Установка счетчиков</h3>
                <p className="text-muted-foreground">
                  Корректно интегрируем Яндекс Метрику и Google Analytics (GA4) на все страницы сайта. Проверяем работоспособность через отладчик.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Настройка целей и событий</h3>
                <p className="text-muted-foreground">
                  Создаем цели под ключевые действия: отправка формы, звонок, покупка, скачивание файла. Настраиваем события для кнопок и взаимодействий.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Электронная торговля</h3>
                <p className="text-muted-foreground">
                  Для интернет-магазинов настраиваем передачу данных о товарах, заказах, средних чеках и доходах. Видите выручку в разрезе источников.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Связка с рекламными кабинетами</h3>
                <p className="text-muted-foreground">
                  Интегрируем аналитику с Яндекс Директ, ВКонтакте и другими рекламными системами. Передаем конверсии для оптимизации кампаний.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Создание отчетов и дашбордов</h3>
                <p className="text-muted-foreground">
                  Настраиваем понятные дашборды с ключевыми метриками. Обучаем работе с аналитикой и интерпретации данных.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Что вы получите</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Eye className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Полная прозрачность</h3>
                <p className="text-muted-foreground">
                  Видите в реальном времени, сколько людей на сайте, откуда они пришли и что делают. Никаких догадок — только факты.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Точный ROI рекламы</h3>
                <p className="text-muted-foreground">
                  Знаете, сколько стоит клиент с каждого канала и сколько он приносит денег. Инвестируете туда, где максимальная отдача.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Быстрые решения</h3>
                <p className="text-muted-foreground">
                  Обнаруживаете проблемы (например, высокий отказ на странице) и оперативно их устраняете. Растет конверсия сайта.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Управление данными</h3>
                <p className="text-muted-foreground">
                  Умеете работать с отчетами, строить сегменты и воронки. Понимаете, где терять клиентов и как увеличить продажи.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Acceptance checks */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Как проверяем настройку перед сдачей</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-muted-foreground">
            Не выдаём наличие счётчика за готовую аналитику. Выполняем контрольные сценарии и отделяем события сайта от подтверждённых обращений.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Форма и быстрые контакты</h3>
                <p className="text-muted-foreground">
                  Проверяем успешную отправку, ошибку валидации, клики по телефону и мессенджерам. Успешная форма должна фиксироваться отдельно от нажатия кнопки и ошибки.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Источник и доставка заявки</h3>
                <p className="text-muted-foreground">
                  Открываем страницу с тестовыми UTM, отправляем контрольное обращение и сверяем источник, страницу, уведомление и запись в CRM или журнале заявок.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <a href="/blog/nastrojka-veb-analitiki-metrika-zayavki-tyumen">Посмотреть критерии приёмки аналитики</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Форматы работы</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Базовая настройка</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 15 000₽</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Установка Метрики и GA4</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Настройка до 5 целей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Проверка корректности работы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Инструкция по работе</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <a href="?intent=web-analytics-basic#contact">Заказать базовую настройку</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-scale border-primary">
              <CardContent className="pt-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-2">
                  Оптимально
                </div>
                <h3 className="text-2xl font-bold mb-2">Расширенная</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 30 000₽</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Всё из базового тарифа</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Электронная торговля</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Настройка дашбордов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Связка с рекламой</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a href="?intent=web-analytics-advanced#contact">Заказать расширенную настройку</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Под ключ</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 50 000₽</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Всё из расширенного</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Сквозная аналитика</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Обучение команды</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Поддержка 1 месяц</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <a href="?intent=web-analytics-full#contact">Обсудить связку под ключ</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Частые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Чем отличается Метрика от Google Analytics?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Метрика лучше работает с российским трафиком и рекламой (Директ, ВК). GA4 удобнее для международных проектов и интеграции с Google Ads. Мы рекомендуем ставить обе системы для полноты данных.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Зачем нужны цели, если счетчик уже стоит?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Без целей вы видите только посещаемость. Цели показывают, сколько пользователей совершили важные действия (заявка, покупка, звонок) — то есть стали клиентами. Это основа для оценки эффективности.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Как быстро будет готова аналитика?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Базовую настройку делаем за 3-5 дней. Расширенная с электронной торговлей и интеграциями — 1-2 недели в зависимости от сложности сайта и количества целей.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Нужно ли что-то делать после настройки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Сбор событий работает автоматически, но данные нужно регулярно проверять: формы и сайт меняются, рекламные ссылки могут потерять метки, а цели — перестать соответствовать маршруту заявки. Мы показываем, какие отчёты смотреть и как выполнять контрольную отправку.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Можно ли связать аналитику с CRM?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, можно интегрировать с AmoCRM, Битрикс24 и другими системами. Тогда вы будете видеть полный путь клиента: от первого клика до закрытой сделки и выручки.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Настроим аналитику под ваш бизнес
            </h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку — обсудим задачи, подберем оптимальный пакет настройки и запустим прозрачную систему отчетности.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default WebAnalytics;
