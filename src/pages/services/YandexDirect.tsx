import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Users, CheckCircle, BarChart, AlertTriangle, Brain, Search, MousePointerClick, Clock, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const YandexDirect = () => {
  return (
    <Layout
      title="Реклама в Яндекс Директ с AI-оптимизацией | CentrLP"
      description="Настройка и ведение рекламы в Яндекс Директ с использованием искусственного интеллекта. Эффективный расход бюджета, чистый трафик и рост заявок."
    >
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Реклама в Яндекс Директ, <br />
              <span className="text-primary">которая не сливает бюджет</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Запускаем кампании под ваш бизнес: от локальной услуги в Тюмени до e-commerce по России. Подключаем AI-анализ, чтобы каждый рубль в Директе работал, а не «крутился где-то в поиске».
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button size="lg" className="text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-primary/25 transition-all" asChild>
                <a href="#contact">Запустить рекламу</a>
              </Button>
              <p className="text-sm text-muted-foreground">
                Первые заявки обычно приходят в течение 3–7 дней после старта.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3 sticky top-24">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Что чаще всего <br />
                <span className="text-destructive">болит в Яндекс.Директ</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Большинство приходят ко мне не «за рекламой», а с усталостью. Деньги тратятся, отчёты красивые, а в CRM тишина. Узнаёте что-то своё?
              </p>
            </div>
            <div className="lg:w-2/3 grid gap-6">
              <Card className="border-l-4 border-l-destructive/50">
                <CardContent className="pt-6 flex gap-4">
                  <div className="bg-destructive/10 p-3 rounded-full h-fit">
                    <MousePointerClick className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Клики есть, заявок нет</h3>
                    <p className="text-muted-foreground">
                      Платите за переходы, а форму никто не заполняет. Значит, объявления подтягивают не тех людей, не в то время и не на тот оффер.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive/50">
                <CardContent className="pt-6 flex gap-4">
                  <div className="bg-destructive/10 p-3 rounded-full h-fit">
                    <TrendingUp className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Резко выросла цена заявки</h3>
                    <p className="text-muted-foreground">
                      Вчера было 400–600 ₽, сегодня 1500+, а менеджер говорит «конкуренты активизировались». На деле чаще всего кампании просто никто не пересобирает и не чистит.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive/50">
                <CardContent className="pt-6 flex gap-4">
                  <div className="bg-destructive/10 p-3 rounded-full h-fit">
                    <BarChart className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Утонули в отчётах</h3>
                    <p className="text-muted-foreground">
                      В статистике кучи цифр, в жизни один вопрос: «Мы вообще окупаемся или нет?» Без нормальной связки с заявками и продажами это гадание на кликах.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive/50">
                <CardContent className="pt-6 flex gap-4">
                  <div className="bg-destructive/10 p-3 rounded-full h-fit">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Заявки, с которыми невозможно работать</h3>
                    <p className="text-muted-foreground">
                      Люди звонят «просто спросить» или вообще не берут трубку. Значит, креативы и посадочная не отсекают мусорный трафик.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-destructive/50">
                <CardContent className="pt-6 flex gap-4">
                  <div className="bg-destructive/10 p-3 rounded-full h-fit">
                    <Clock className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Никто не думает наперёд</h3>
                    <p className="text-muted-foreground">
                      Кампании сделали «как у всех», и всё. Стратегии по сезонам, тестов офферов и гипотез нет, всё живёт на уровне «запустили и не трогаем».
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solution */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Как мы включаем <span className="text-primary">AI в Яндекс.Директ</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Не просто жмём «умные стратегии», а реально используем ИИ-инструменты в связке «реклама → сайт → заявки».
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-анализ поисковых запросов</h3>
                <p className="text-muted-foreground">
                  Подгружаем реальные запросы пользователей, чистим мусор и расширяем семантику с помощью ИИ. В итоге объявления показываются людям, которые действительно готовы купить.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Генерация и тест офферов</h3>
                <p className="text-muted-foreground">
                  Вместо одного шаблонного объявления запускаем несколько вариантов текста и УТП. AI помогает быстро собрать гипотезы, но отбор делаем по реальным заявкам, а не по CTR.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <MousePointerClick className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-тепловая карта посадочной</h3>
                <p className="text-muted-foreground">
                  Прогоняем посадочную через AI-анализ поведения пользователя: что непонятно, где он «спотыкается», почему не оставляет заявку. На основе этого переписываем блоки, а не «красим кнопки».
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <BarChart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Прогноз по бюджету и заявкам</h3>
                <p className="text-muted-foreground">
                  На старте вы получаете не «ну попробуем», а понятный диапазон: сколько заявок и по какой цене можно ожидать при выбранном бюджете. На основе исторических данных + AI-модели.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Что у вас меняется в первые <br className="hidden md:block" />
            <span className="text-primary">7–14 дней работы</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-background shadow-sm border">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Живые заявки</h3>
              <p className="text-muted-foreground">
                Вы видите конкретных людей, которые оставили номер, а не просто графики показов.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-background shadow-sm border">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Понимание расходов</h3>
              <p className="text-muted-foreground">
                Понятный отчёт: бюджет → клики → заявки → стоимость лида. Без магических терминов.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-background shadow-sm border">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">План на 1–3 месяца</h3>
              <p className="text-muted-foreground">
                Чёткий список, что тестируем дальше: офферы, лендинги, регионы. Не работа «из дня в день», а стратегия.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Как мы работаем</h2>
              <p className="text-xl text-muted-foreground">
                Схема проста. Без десяти созвонов и километровых ТЗ.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Заявка и короткое интервью",
                  desc: "Разбираем ваш продукт, гео, средний чек, текущие каналы. Фиксируем цели: заявки, звонки, лиды в мессенджере."
                },
                {
                  step: "02",
                  title: "Аудит или старт с нуля",
                  desc: "Если реклама уже есть, делаем аудит: что тратит бюджет впустую, что можно сохранить. Если нет, собираем кампании с нуля."
                },
                {
                  step: "03",
                  title: "Сбор семантики и AI-проработка",
                  desc: "Генерируем и фильтруем ключи и минус-слова, готовим несколько пакетов объявлений под разные сегменты."
                },
                {
                  step: "04",
                  title: "Запуск + первые корректировки",
                  desc: "В течение первой недели смотрим реальные запросы и поведение, режем мусор, усиливаем связки, где уже пошли заявки."
                },
                {
                  step: "05",
                  title: "Поддержка и развитие",
                  desc: "Еженедельный контроль ставок, поисковых запросов, офферов. Допиливаем объявления, страницы и расширения."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start p-6 rounded-2xl hover:bg-card transition-colors border border-transparent hover:border-border">
                  <div className="text-4xl font-bold text-primary/20 leading-none">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Кому наш подход подходит лучше всего</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale border-primary/10">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Локальный бизнес</h3>
                <p className="text-muted-foreground">
                  Салоны, клининг, автосервисы, ремонт. Нужно, чтобы звонили из вашего города, а не из соседнего региона.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale border-primary/10">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                <p className="text-muted-foreground">
                  Интернет-магазины с доставкой по России. Важно вытаскивать людей из поиска и РСЯ с понятной ценой заказа.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale border-primary/10">
              <CardContent className="pt-6">
                <BarChart className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">B2B-сектор</h3>
                <p className="text-muted-foreground">
                  Оборудование, подрядчики, сложные услуги. Нужны не «просчитайте КП на всякий случай», а реальные закупщики и ЛПР.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Начните получать клиентов из Яндекса уже через неделю
              </h2>
              <p className="text-xl text-muted-foreground">
                Оставьте контакты, вышлю вам предварительный расчёт бюджета и стоимости заявки под ваш бизнес.
              </p>
            </div>
            <div className="bg-card p-8 rounded-3xl shadow-lg border">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default YandexDirect;