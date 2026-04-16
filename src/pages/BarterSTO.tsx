import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRightLeft,
  BadgeCheck,
  Camera,
  Car,
  CheckCircle2,
  Droplet,
  Gauge,
  MessageSquareText,
  Music,
  Shield,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import heroBackground from "@/assets/barter-sto-hero.png";
import vkAnalytics from "@/assets/vk-analytics.png";
import vkMessages from "@/assets/vk-messages.png";

const offerCards = [
  {
    title: "Лендинг под конкретные услуги",
    text: "Не общая визитка, а отдельный оффер под ГБО, плёнку, антикор, автозвук и камеры с нормальной подачей.",
  },
  {
    title: "Квиз и форма под заявки",
    text: "Марка авто, задача, удобный способ связи и быстрый выход на связь без лишних шагов.",
  },
  {
    title: "Запуск рекламы под входящий поток",
    text: "Яндекс Директ и ВК с аналитикой, чтобы считать не клики, а реальные обращения.",
  },
  {
    title: "Оформление и доверие",
    text: "Соцсети, тексты, структура, быстрые ответы и понятная подача для локального рынка.",
  },
];

const serviceNeeds = [
  {
    icon: Wrench,
    title: "ГБО",
    note: "Приоритет №1",
    text: "Нужен надёжный комплект и монтаж без колхозных компромиссов.",
  },
  {
    icon: Droplet,
    title: "Антикор",
    note: "Приоритет №2",
    text: "Особенно актуально для Pajero 2 и тюменских зимних условий.",
  },
  {
    icon: Shield,
    title: "Плёнка и защита",
    note: "Приоритет №3",
    text: "Кузов, фары, пороги или частичная оклейка под практическую задачу.",
  },
  {
    icon: Shield,
    title: "Тонировка",
    note: "Дополнение",
    text: "Аккуратная работа, нормальные материалы и внятный результат.",
  },
  {
    icon: Music,
    title: "Автозвук",
    note: "Дополнение",
    text: "Правильная конфигурация без бессмысленного нагромождения железа.",
  },
  {
    icon: Camera,
    title: "Камеры и парктроники",
    note: "Дополнение",
    text: "Круговой обзор, передняя/задняя камера и удобная парковка.",
  },
];

const fitItems = [
  "У вас есть понятные и востребованные услуги, которые можно нормально оценить по смете.",
  "Вы хотите не просто сайт, а входящий поток заявок и систему приёма обращений.",
  "Вы готовы обсуждать сроки, этапы и эквивалент без хаоса и “давайте как-нибудь”.",
];

const notFitItems = [
  "Нужен только красивый сайт без рекламы, оффера и внятной заявки.",
  "Бартер воспринимается как работа без сроков и без договорённостей.",
  "Вам нужна просто скидка, а не рабочая схема, где обе стороны получают результат.",
];

const caseTasks = [
  "собрали новую матрицу рекламных кампаний под керамику, оклейку, шумку, ремонт и детейлинг;",
  "перезапустили VK Ads под CPL и реальные входящие, а не под “красивую статистику”;",
  "оттестировали офферы и креативы по сегментам, чтобы рынок начал отвечать;",
  "достроили путь клиента от объявления до сообщения и консультации;",
  "вели аналитику и не давали заявкам растворяться в хаосе.",
];

const caseResults = [
  "стабильные ежедневные входящие сообщения;",
  "живые вопросы по керамике, оклейке, шумоизоляции и детейлингу;",
  "записи на осмотр, расчёт стоимости и консультации;",
  "не всплеск на неделю, а рабочий поток 12 месяцев подряд.",
];

const BarterSTO = () => {
  return (
    <Layout
      title="Бартер для автосервиса — маркетинг в обмен на услуги СТО | CentrLP"
      description="Бартер с автосервисом: сайт, квиз, реклама и заявки в обмен на услуги по авто для СТО, детейлинга, ГБО, плёнки, автозвука и антикоррозийных работ."
    >
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat pt-28 pb-20"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(5, 10, 18, 0.94), rgba(5, 17, 30, 0.88)), url(${heroBackground})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(32,181,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(53,211,154,0.14),transparent_24%)]" />
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur">
                <ArrowRightLeft className="h-4 w-4 text-primary" />
                Бартер для СТО, детейлинга, ГБО, плёнки и автозвука
              </div>

              <h1 className="mb-6 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.32)]">
                Вы делаете мой Pajero сильнее. Я делаю вашему автосервису входящий поток заявок.
              </h1>

              <p className="max-w-2xl text-xl leading-9 text-slate-200">
                Это не обмен “услуга на услугу” в воздухе. Это понятная сделка: сайт, квиз, реклама и
                структура заявок для вашей СТО в обмен на конкретные работы по машине с согласованным
                эквивалентом.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-primary">Что получает СТО</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">Сайт, квиз, рекламу и маршрут заявки</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-primary">Что получаю я</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">ГБО, антикор, плёнку, тонировку и доработки</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-primary">Что важно</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">Прозрачная смета, этапы и нормальная договорённость</div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" className="shadow-elegant hover-scale">
                  <a href="#form">Обсудить бартер по СТО</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <a href="#case">Посмотреть кейс по авто-тематике</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(32,181,255,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(53,211,154,0.16),transparent_40%)] blur-2xl" />
              <img
                src="/images/barter/sto-barter-loop.png"
                alt="Схема бартерного обмена между автосервисом и CentrLP"
                className="relative w-full rounded-[2rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/40 bg-card/60 py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-background/90 p-5">
              <div className="text-sm font-semibold text-primary">Формат сделки</div>
              <div className="mt-2 text-base text-foreground">Нормальный бартер с эквивалентом по смете, этапами и понятным составом работ.</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/90 p-5">
              <div className="text-sm font-semibold text-primary">Что получает сервис</div>
              <div className="mt-2 text-base text-foreground">Страницу, квиз, рекламу и более понятный маршрут клиента до обращения и записи.</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/90 p-5">
              <div className="text-sm font-semibold text-primary">Что подтверждает результат</div>
              <div className="mt-2 text-base text-foreground">Живые скрины, конкретный кейс и реальные автомобильные направления без абстракции.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Gauge className="h-4 w-4" />
                Конкретный состав работ и результата
              </div>
              <h2 className="mb-4">Что именно вы получаете взамен бартерной сделки</h2>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Вместо абстрактного набора услуг здесь собран конкретный пакет работ: посадочная
                страница, квиз, реклама, аналитика и маршрут обращения до записи.
              </p>

              <div className="mt-8 grid gap-4">
                {offerCards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
                  >
                    <div className="text-lg font-semibold text-foreground">{item.title}</div>
                    <p className="mt-2 text-base leading-7 text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <img
                src="/images/barter/sto-offer-stack.png"
                alt="Пакет работ, который получает автосервис в рамках бартерной сделки"
                className="w-full rounded-[2rem] border border-border/60 shadow-[0_20px_60px_rgba(7,20,33,0.18)]"
              />
              <div className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-accent-2/10 p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Смысл сделки</div>
                <p className="mt-4 text-lg leading-8 text-foreground">
                  Пакет собирается вокруг простой задачи: привести входящий поток, упростить
                  обращение и помочь сервису быстрее доводить людей до записи.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/images/barter/sto-lead-path.png"
                alt="Маршрут заявки от рекламы до записи в автосервис"
                className="w-full rounded-[2rem] border border-border/60 shadow-[0_20px_60px_rgba(7,20,33,0.16)]"
              />
            </div>

            <div className="order-1 lg:order-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-2/10 px-4 py-2 text-sm font-semibold text-accent-2">
                <MessageSquareText className="h-4 w-4" />
                Понятная логика обращения
              </div>
              <h2 className="mb-4">Как клиент доходит до записи в автосервис</h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Для локального авто-бизнеса важен понятный путь: увидел предложение, оставил заявку,
                написал, получил расчёт и записался на нужную услугу.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <div className="font-semibold text-foreground">Шаг 1. Понять предложение</div>
                  <p className="mt-2 text-muted-foreground">Человек сразу видит, какие услуги продвигаются, что входит в пакет и за счёт чего это приводит к заявке.</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <div className="font-semibold text-foreground">Шаг 2. Оставить заявку без лишних шагов</div>
                  <p className="mt-2 text-muted-foreground">Марка авто, задача, контакт и удобный способ связи собираются в одном простом обращении.</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <div className="font-semibold text-foreground">Шаг 3. Получить расчёт и запись</div>
                  <p className="mt-2 text-muted-foreground">После обращения сервис быстро связывается, согласует детали и переводит интерес в реальную запись.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-4">Какие работы по машине реально интересны в бартере</h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
              Не список “хотелок”, а понятные направления, которые удобно сопоставить с маркетинговым
              пакетом и оценить по смете.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <img
              src="/images/barter/sto-service-grid.png"
              alt="Сетка услуг по автомобилю, которые интересны в рамках бартерной сделки"
              className="w-full rounded-[2rem] border border-border/60 shadow-[0_20px_60px_rgba(7,20,33,0.14)]"
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {serviceNeeds.map((item) => (
                <Card key={item.title} className="h-full rounded-[1.5rem] border-border/60 p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <item.icon className="h-10 w-10 text-primary" />
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {item.note}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <BadgeCheck className="h-4 w-4" />
                Условия спокойной сделки
              </div>
              <h2 className="mb-4">Что помогает бартеру пройти спокойно и по делу</h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Здесь важны не красивые обещания, а готовность обсуждать объём работ, сроки,
                эквивалент и реальную ценность с обеих сторон.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Card className="rounded-[1.5rem] border-border/60 p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-foreground">Что помогает</h3>
                  <ul className="mt-4 space-y-4">
                    {fitItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent-2" />
                        <span className="text-sm leading-7 text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="rounded-[1.5rem] border-border/60 p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-foreground">Что мешает</h3>
                  <ul className="mt-4 space-y-4">
                    {notFitItems.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-rose-500/15 ring-1 ring-rose-500/25" />
                        <span className="text-sm leading-7 text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            <img
              src="/images/barter/sto-fit-check.png"
              alt="Визуальная проверка кому подходит бартер для автосервиса"
              className="w-full rounded-[2rem] border border-border/60 shadow-[0_20px_60px_rgba(7,20,33,0.14)]"
            />
          </div>
        </div>
      </section>

      <section id="case" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <TrendingUp className="mx-auto mb-6 h-16 w-16 text-primary" />
              <h2 className="mb-4">Кейс по авто-тематике: как бартер превратился в стабильный поток заявок</h2>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
                Не “разово что-то настроили”, а год системной работы для авто-направления: реклама,
                офферы, сообщения, структура и постоянная докрутка под живой спрос.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Card className="rounded-[2rem] border-border/60 p-8 md:p-10 shadow-sm">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Что было на старте</h3>
                    <p className="mt-3 text-base leading-8 text-muted-foreground">
                      Запрос был очень земной: “Нужны заявки. Хотим стабильность, а не рывками”.
                      Реклама вроде шла, но система не собиралась в единый маршрут, и часть спроса
                      просто терялась.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Что сделали</h3>
                    <ul className="mt-4 space-y-4">
                      {caseTasks.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent-2" />
                          <span className="text-base leading-7 text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.5rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-accent-2/10 p-6">
                    <h3 className="text-2xl font-bold text-foreground">Что получили на выходе</h3>
                    <ul className="mt-4 space-y-3">
                      {caseResults.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-base leading-7 text-foreground/85">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-lg font-semibold text-foreground">
                      Клиент работал по машине. Мы работали по клиентам.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid gap-6">
                <Card className="overflow-hidden rounded-[2rem] border-border/60 shadow-sm">
                  <div className="border-b border-border/60 bg-primary/5 px-5 py-4">
                    <h4 className="font-semibold">Скрин аналитики рекламной кампании</h4>
                  </div>
                  <img
                    src={vkAnalytics}
                    alt="Статистика рекламной кампании ВКонтакте для авто-тематики"
                    className="w-full"
                  />
                </Card>

                <Card className="overflow-hidden rounded-[2rem] border-border/60 shadow-sm">
                  <div className="border-b border-border/60 bg-primary/5 px-5 py-4">
                    <h4 className="font-semibold">Скрин входящих сообщений от клиентов</h4>
                  </div>
                  <img
                    src={vkMessages}
                    alt="Входящие сообщения клиентов по услугам авто-тематики"
                    className="w-full"
                  />
                </Card>

                <Card className="rounded-[2rem] border-border/60 p-6 shadow-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Почему это дало результат</div>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">
                    Потому что работа шла не вокруг красивых отчётов, а вокруг реального спроса,
                    понятных офферов и постоянной докрутки до входящих заявок.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-accent-2/10 p-8 md:p-10 text-center">
            <Car className="mx-auto h-14 w-14 text-primary" />
            <h2 className="mt-5">Если вы хотите проверить бартер на нормальных условиях, давайте считать сделку по смете</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              Без тумана. Вы присылаете список услуг и пример прайса. Я показываю, какой пакет работ
              по сайту, заявкам и рекламе можно собрать под эквивалент. Если логика совпадает — идём дальше.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="shadow-elegant hover-scale">
                <a href="#form">Оставить заявку на бартер</a>
              </Button>
              <Button variant="outline" size="lg" className="hover-scale">
                <a href="https://centrlp.ru/services" target="_blank" rel="noreferrer">
                  Посмотреть услуги CentrLP
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4">Оставьте заявку на бартер</h2>
              <p className="text-lg text-muted-foreground">
                Напишите, какие услуги есть у вашего автосервиса, в каком городе вы работаете и какой
                формат сотрудничества вам интересен.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BarterSTO;
