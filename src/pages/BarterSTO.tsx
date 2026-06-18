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
    title: "Лендинг под Movil и антикор рамных авто",
    text: "Не общая визитка, а отдельная страница под днище, раму, арки, скрытые полости, фото до расчёта и понятную запись.",
  },
  {
    title: "Квиз и сценарий первичной оценки",
    text: "Марка авто, проблемные зоны, фото арок/днища/рамы, удобный канал связи и аккуратный маршрут до расчёта.",
  },
  {
    title: "ВК-упаковка с дизайном и быстрыми ответами",
    text: "Обложка, меню, закреп, тексты услуг, маршрут в сообщения и заготовки ответов, чтобы входящие не терялись.",
  },
  {
    title: "Рекламные кампании и аналитика",
    text: "Подготовка Яндекс Директ, РСЯ и ВК Ads под заявки на антикор. Рекламный бюджет оплачивается отдельно.",
  },
];

const valueStack = [
  {
    title: "Сайт/лендинг",
    price: "от 45 000 ₽",
    text: "Посадочная страница под услугу Movil/антикор с оффером, блоком фото, FAQ и формой заявки.",
  },
  {
    title: "ВК-упаковка",
    price: "от 30 000 ₽",
    text: "Дизайн сообщества, обложка, меню, закреп, тексты услуг и путь клиента в сообщения.",
  },
  {
    title: "Чат-бот или автоответы",
    price: "от 30 000 ₽",
    text: "Сбор марки авто, зон обработки, фото, телефона и удобного времени для связи.",
  },
  {
    title: "Яндекс/ВК реклама",
    price: "настройка от 20 000 ₽",
    text: "Семантика, объявления, аудитории, цели и первые кампании под входящие заявки.",
  },
  {
    title: "Аналитика и цели",
    price: "от 15 000 ₽",
    text: "Метрика, цели, события, источники заявок и понятный контроль стоимости обращения.",
  },
  {
    title: "Итоговый пакет",
    price: "эквивалент 80 000–150 000 ₽",
    text: "Состав фиксируется под смету работ: частичный антикор, Movil, пескоструй, арки или рама.",
  },
];

const dealTiers = [
  {
    name: "Стартовый взаимозачёт",
    price: "30 000–35 000 ₽",
    service: "Локальный Movil или отдельные зоны без расширенной подготовки.",
    package:
      "Разбор упаковки, структура услуги, тексты для VK/2ГИС/сайта, FAQ, список фото для расчёта и шаблон первого ответа.",
  },
  {
    name: "Сильный обмен",
    price: "55 000–70 000 ₽",
    service: "Антикор днища, рамы и арок с понятной сметой, материалами и ограничениями.",
    package:
      "Мини-лендинг, квиз, тексты услуги, 5 карточек для VK/2ГИС, закреп/меню VK, структура Яндекс/ВК кампаний и 15–20 объявлений.",
  },
  {
    name: "Полный пакет",
    price: "80 000 ₽+",
    service: "Антикор с пескоструем, подготовкой и несколькими зонами обработки.",
    package:
      "Посадочная страница, VK-упаковка с дизайном, рекламная сборка, аналитика и 1–2 недели докрутки после первых обращений.",
  },
];

const serviceNeeds = [
  {
    icon: Droplet,
    title: "Movil и скрытые полости",
    note: "Фокус сделки",
    text: "Нужна понятная обработка скрытых зон старого рамного внедорожника без лишней имитации.",
  },
  {
    icon: Shield,
    title: "Антикор днища и рамы",
    note: "Основной объём",
    text: "Днище, рама, арки и зоны, где уже видны рыжики после тюменских зим.",
  },
  {
    icon: Wrench,
    title: "Пескоструй и подготовка",
    note: "По смете",
    text: "Если без подготовки состав не ляжет нормально, обсуждаем отдельные зоны и честный объём.",
  },
  {
    icon: Camera,
    title: "Оценка по фото",
    note: "До решения",
    text: "Нужен список точных кадров: арки изнутри, дно кузова, рама, проблемные места.",
  },
  {
    icon: Gauge,
    title: "Смета без сюрпризов",
    note: "Обязательно",
    text: "Сначала фиксируем, что входит: материалы, подготовка, зоны, сроки и гарантийная логика.",
  },
  {
    icon: BadgeCheck,
    title: "Гарантия и контроль",
    note: "Финальный фильтр",
    text: "Важно заранее понимать, что считается нормальным результатом обработки и как проверяется качество.",
  },
];

const fitItems = [
  "Вы делаете Movil, антикор, пескоструй, обработку рамы, арок и скрытых полостей.",
  "У вас есть прайс или понятная смета, где видно, какой объём работ стоит от 30 000 ₽ и выше.",
  "Вам нужен не просто красивый сайт, а упакованная воронка заявок под дорогую услугу.",
];

const notFitItems = [
  "Нужна только разовая скидка без понятного обмена ценностью.",
  "Нет готовности зафиксировать объём работ, материалы, сроки и ограничения.",
  "Хотите получить рекламу, но не готовы быстро отвечать на заявки и фото от клиентов.",
];

const dealInputs = [
  "какие зоны берёте: арки, днище, рама, скрытые полости, крепления и проблемные места;",
  "нужен ли пескоструй, мойка, сушка, демонтаж защиты или отдельная подготовка;",
  "какие материалы входят в смету и где начинается доплата за расходники;",
  "какие фото нужны до расчёта и когда без подъёмника всё равно не обойтись;",
  "что считается принятым результатом и какие гарантийные ограничения честно прописываются.",
];

const clientRequestItems = [
  "марка, год, город и тип кузова;",
  "фото арок изнутри, дна кузова, рамы и рыжиков;",
  "что беспокоит: профилактика, рыжики, скрытые полости, подготовка к зиме;",
  "удобный канал связи и время для ответа;",
  "готовность приехать на осмотр, если по фото нельзя посчитать честно.",
];

const separateCosts = [
  "рекламный бюджет Яндекс/ВК;",
  "расходники, материалы и пескоструй сверх согласованной сметы;",
  "большой многостраничный сайт, CRM и сложные интеграции, если они нужны отдельно;",
  "ведение рекламы после тестового запуска и доработки за пределами согласованного этапа.",
];

const caseTasks = [
  "собрали матрицу рекламных кампаний под дорогие автомобильные услуги, где важны доверие и точная заявка;",
  "перезапустили VK Ads под CPL и реальные входящие, а не под “красивую статистику”;",
  "оттестировали офферы и креативы по сегментам, чтобы рынок начал отвечать;",
  "достроили путь клиента от объявления до сообщения и консультации;",
  "вели аналитику и не давали заявкам растворяться в хаосе.",
];

const caseResults = [
  "стабильные ежедневные входящие сообщения;",
  "живые вопросы по дорогим автоуслугам, где клиенту нужен расчёт, доверие и быстрый ответ;",
  "записи на осмотр, расчёт стоимости и консультации;",
  "не всплеск на неделю, а рабочий канал обращений 12 месяцев подряд.",
];

const BarterSTO = () => {
  return (
    <Layout
      title="Бартер для антикор-центра — сайт, ВК и реклама за Movil | CentrLP"
      description="Бартер под Movil и антикор рамных авто: сайт, квиз, упаковка ВКонтакте, рекламные кампании и аналитика в обмен на работы по днищу, раме и аркам."
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
                Бартер под Movil, антикор днища, рамы и арок
              </div>

              <h1 className="mb-6 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.32)]">
                Вы берёте понятный объём по антикору Pajero. Взамен получаете пакет заявок под вашу дорогую услугу.
              </h1>

              <p className="max-w-2xl text-xl leading-9 text-slate-200">
                Фокус сделки — Movil, антикор днища, рамы и арок. Если ваша работа по смете стоит от
                30 000 ₽ и выше, в обмен можно собрать не “карточку”, а полноценный пакет: сайт, квиз,
                ВК-упаковку, рекламные кампании и аналитику.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-primary">Что получает СТО</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">Сайт, квиз, ВК-дизайн, рекламу и аналитику</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-primary">Что получаю я</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">Movil, антикор днища, рамы и арок по Pajero</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-primary">Эквивалент</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">Пакет CentrLP на 80 000–150 000 ₽ под вашу смету</div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" className="shadow-elegant hover-scale">
                  <a href="#form">Обсудить бартер по Movil</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <a href="#case">Посмотреть авто-кейс</a>
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
              <div className="mt-2 text-base text-foreground">Сначала смета на Movil/антикор, затем пакет маркетинга под сопоставимый эквивалент.</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/90 p-5">
              <div className="text-sm font-semibold text-primary">Что получает сервис</div>
              <div className="mt-2 text-base text-foreground">Страницу, квиз, ВК с дизайном, рекламную связку и маршрут заявки до расчёта.</div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/90 p-5">
              <div className="text-sm font-semibold text-primary">Что не прячем</div>
              <div className="mt-2 text-base text-foreground">Рекламный бюджет и сторонние расходы считаются отдельно, без размывания сделки.</div>
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
                Пакет под дорогую услугу
              </div>
              <h2 className="mb-4">Что именно получает антикор-центр взамен работ по Pajero</h2>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Если Movilka, пескоструй и антикор считаются от 30 000 ₽, пакет с нашей стороны
                должен выглядеть как полноценная упаковка услуги, а не как один текст в карточке.
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
                  Мы собираем для сервиса витрину и воронку именно под антикор: человек видит услугу,
                  понимает, какие фото сделать, оставляет заявку и быстрее доходит до расчёта.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/40 bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-2/10 px-4 py-2 text-sm font-semibold text-accent-2">
                <BadgeCheck className="h-4 w-4" />
                Эквивалент по ценам CentrLP
              </div>
              <h2>Не “карточка за антикор”, а пакет с понятной ценностью</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Стоимость работ фиксируем не на глаз: сайт, ВК, бот, реклама и аналитика имеют отдельные
              цены. Поэтому состав бартера можно собрать под реальную смету Movil/антикора: от
              частичной обработки до пакета с пескоструем.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {valueStack.map((item) => (
              <Card key={item.title} className="h-full rounded-[1.5rem] border-border/60 p-6 shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{item.title}</div>
                <div className="mt-3 text-2xl font-bold text-foreground">{item.price}</div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>

          <div className="mt-14">
            <div className="mb-6 max-w-3xl">
              <h3 className="text-2xl font-bold">Три уровня взаимозачёта по смете</h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Удобнее считать не “сайт за услугу”, а конкретный объём работ с обеих сторон.
                Чем больше зона обработки и подготовки по машине, тем сильнее пакет на стороне CentrLP.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {dealTiers.map((tier) => (
                <Card key={tier.name} className="h-full rounded-[1.5rem] border-border/60 p-6 shadow-sm">
                  <div className="text-sm font-semibold text-primary">{tier.name}</div>
                  <div className="mt-2 text-2xl font-bold text-foreground">{tier.price}</div>
                  <div className="mt-4 text-sm font-semibold text-foreground">Со стороны сервиса</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{tier.service}</p>
                  <div className="mt-4 text-sm font-semibold text-foreground">Со стороны CentrLP</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{tier.package}</p>
                </Card>
              ))}
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
              <h2 className="mb-4">Как клиент доходит до расчёта по антикору</h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Для Movil и антикора важно быстро отделить реальный запрос от пустого вопроса
                “сколько стоит”. Поэтому воронка собирает данные, которые мастеру нужны для первичной оценки.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <div className="font-semibold text-foreground">Шаг 1. Понять предложение</div>
                  <p className="mt-2 text-muted-foreground">Человек видит не абстрактный “антикор”, а обработку днища, рамы, арок и скрытых полостей.</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <div className="font-semibold text-foreground">Шаг 2. Прислать правильные фото</div>
                  <p className="mt-2 text-muted-foreground">Квиз подсказывает, что нужны арки изнутри, дно кузова, рама, рыжики и общий контекст.</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <div className="font-semibold text-foreground">Шаг 3. Получить расчёт и запись</div>
                  <p className="mt-2 text-muted-foreground">Сервис быстрее понимает объём: Movil, подготовка, пескоструй, отдельные зоны или полный пакет.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-4">Какие работы по Pajero интересны в Movilka-бартере</h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
              Не список “хотелок”, а конкретные зоны, которые можно оценить по фото, смете и
              нормальной технологии обработки.
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
          <div className="mb-16">
            <div className="mb-10 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <MessageSquareText className="h-4 w-4" />
                Как считаем сделку
              </div>
              <h2>Сначала смета и входные данные, потом взаимозачёт</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Антикор нельзя честно оценивать по общим словам. Поэтому бартер начинается с состава
                работ, фото, материалов и границ ответственности, а не с красивой фразы “давайте обменяемся”.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="rounded-[1.5rem] border-border/60 p-6 shadow-sm">
                <h3 className="text-xl font-bold">Что нужно от сервиса для сметы</h3>
                <ul className="mt-4 space-y-3">
                  {dealInputs.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-accent-2" />
                      <span className="text-sm leading-7 text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="rounded-[1.5rem] border-border/60 p-6 shadow-sm">
                <h3 className="text-xl font-bold">Как выглядит заявка клиента</h3>
                <ul className="mt-4 space-y-3">
                  {clientRequestItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm leading-7 text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="rounded-[1.5rem] border-border/60 p-6 shadow-sm">
                <h3 className="text-xl font-bold">Что считается отдельно</h3>
                <ul className="mt-4 space-y-3">
                  {separateCosts.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-sm leading-7 text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <BadgeCheck className="h-4 w-4" />
                Условия спокойной сделки
              </div>
              <h2 className="mb-4">Когда такой бартер выгоден обеим сторонам</h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Хороший обмен держится на простой логике: у сервиса есть дорогая понятная услуга,
                а у CentrLP есть сопоставимый пакет, который помогает эту услугу продавать.
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
              <h2 className="mb-4">Кейс по авто-тематике: как упаковка превратилась в стабильный канал обращений</h2>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
                Не “разово что-то настроили”, а системная работа для авто-направления: реклама,
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
              Без тумана. Вы показываете смету на Movil, антикор, пескоструй или отдельные зоны.
              Я показываю пакет сайта, ВК, квиза, рекламы и аналитики под сопоставимый эквивалент.
              Если логика совпадает — фиксируем состав и идём дальше.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="shadow-elegant hover-scale">
                <a href="#form">Оставить заявку на Movilka-бартер</a>
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
                Напишите, какие работы по Movil, антикору, пескострую, раме или аркам вы делаете,
                какой ориентир по смете и какой формат обмена вам интересен.
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
