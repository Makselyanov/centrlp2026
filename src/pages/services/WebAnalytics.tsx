import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Target, TrendingUp, Eye, Zap, CheckCircle, Settings, LineChart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const WebAnalytics = () => {
  return (
    <Layout
      title="Настройка веб-аналитики: Метрика, цели, отчёты | CentrLP"
      description="Профессиональная настройка Яндекс Метрики и Google Analytics. Цели, события, отчеты для понимания эффективности рекламы и поведения пользователей."
    >
      {/* Hero Block */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Веб-аналитика: понимайте, откуда приходят деньги
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Настроим Яндекс Метрику и Google Analytics так, чтобы вы точно знали: какая реклама работает, 
              где пользователи уходят и как увеличить конверсию сайта.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Прозрачная аналитика</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Цели и события</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Визуальные отчеты</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Настроить аналитику</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Кому нужна веб-аналитика</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Рекламодатели</h3>
                <p className="text-muted-foreground">
                  Понимать, какие каналы и кампании приносят продажи, а какие сливают бюджет. Оценка ROI по каждому источнику.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Владельцы бизнеса</h3>
                <p className="text-muted-foreground">
                  Принимать решения на основе данных: что улучшить на сайте, куда инвестировать, какие страницы дорабатывать.
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
          <h2 className="text-3xl font-bold mb-12 text-center">Почему аналитика не работает</h2>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Как мы настраиваем аналитику</h2>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Что вы получите</h2>
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

      {/* Cases */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Примеры внедрения</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Сервис онлайн-бронирования</h3>
                <p className="text-muted-foreground mb-4">
                  Настроили цели для каждого шага воронки: просмотр услуги → выбор времени → заполнение формы → оплата. Выявили, что 60% уходят на этапе оплаты. Доработали страницу — конверсия выросла на 40%.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">+40%</div>
                    <div className="text-muted-foreground">Рост конверсии</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-muted-foreground">Прозрачность воронки</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Интернет-магазин техники</h3>
                <p className="text-muted-foreground mb-4">
                  Внедрили электронную торговлю: передаем ID товаров, суммы заказов, категории. Владелец увидел, что 70% выручки дает контекст, а соцсети окупаются слабо. Перераспределили бюджет — ROAS вырос в 2 раза.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">2x</div>
                    <div className="text-muted-foreground">Рост ROAS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">-30%</div>
                    <div className="text-muted-foreground">Снижение CPA</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Форматы работы</h2>
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
                  <a href="#contact">Обсудить проект</a>
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
                  <a href="#contact">Начать работу</a>
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
                  <a href="#contact">Обсудить проект</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Частые вопросы</h2>
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
                  Нет, аналитика работает автоматически. Вы просто заходите в отчеты и смотрите актуальные данные. Мы научим, какие метрики отслеживать и как принимать решения на их основе.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
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