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
    title: "Сайт или лендинг под конкретную автоуслугу",
    text: "Отдельная страница под услугу, где понятно, что входит, как считается цена, какие фото или данные нужны до расчёта и как оставить заявку.",
  },
  {
    title: "Квиз и сценарий первичной оценки",
    text: "Марка авто, тип услуги, симптомы или зоны работ, фото при необходимости, удобный канал связи и аккуратный маршрут до расчёта.",
  },
  {
    title: "ВК-упаковка с дизайном и быстрыми ответами",
    text: "Обложка, меню, закреп, тексты услуг, маршрут в сообщения и заготовки ответов, чтобы входящие не терялись.",
  },
  {
    title: "Рекламные кампании и аналитика",
    text: "Подготовка Яндекс Директ, РСЯ и ВК Ads под заявки на выбранные автоуслуги. Рекламный бюджет оплачивается отдельно.",
  },
];

const valueStack = [
  {
    title: "Сайт/лендинг",
    price: "от 45 000 ₽",
    text: "Посадочная страница под автоуслугу: антикор, электрику, сигнализации, автозвук, плёнку, ГБО, ремонт или детейлинг.",
  },
  {
    title: "ВК-упаковка",
    price: "от 30 000 ₽",
    text: "Дизайн сообщества, обложка, меню, закреп, тексты услуг и путь клиента в сообщения.",
  },
  {
    title: "Чат-бот или автоответы",
    price: "от 30 000 ₽",
    text: "Сбор марки авто, задачи, фото или симптомов, телефона и удобного времени для связи.",
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
    price: "с запасом к смете сервиса",
    text: "Состав фиксируется так, чтобы пакет CentrLP был шире и дороже согласованной автоработы.",
  },
];

const dealTiers = [
  {
    name: "Стартовый взаимозачёт",
    price: "малый пакет с запасом",
    service: "Одна понятная услуга или часть работ: диагностика, локальный объём, подбор, базовая установка или обработка.",
    package:
      "Экспресс-упаковка оффера, структура услуги, тексты для VK/2ГИС/сайта, FAQ, список данных до расчёта, квиз-скелет и шаблоны первых ответов.",
  },
  {
    name: "Сильный обмен",
    price: "усиленный пакет с запасом",
    service: "Понятный объём работ: антикор, автоэлектрика, сигнализация, автозвук, плёнка, тонировка, ГБО или ремонтный пакет.",
    package:
      "Мини-лендинг, квиз, упаковка VK, 5–7 материалов для публикаций, рекламная структура для Яндекс/VK, 15–25 объявлений, Метрика, цели и маршрут заявки.",
  },
  {
    name: "Партнёрский пакет",
    price: "расширенный пакет по договорённости",
    service: "Комплексная дорогая услуга или пакет работ с понятной сметой, материалами, сроками и границами ответственности.",
    package:
      "Полноценная посадочная страница под направление, VK/2ГИС-упаковка, квиз, рекламная сборка, аналитика, сценарии обработки заявок и 2–3 недели докрутки.",
  },
];

const serviceNeeds = [
  {
    icon: Droplet,
    title: "Антикор и защита кузова",
    note: "Частый запрос",
    text: "Днище, арки, скрытые полости, подготовка, материалы и фото до расчёта.",
  },
  {
    icon: Gauge,
    title: "Автоэлектрика и диагностика",
    note: "Точная заявка",
    text: "Симптомы, ошибки, комплектация, сценарий записи и понятные условия первичной проверки.",
  },
  {
    icon: Shield,
    title: "Сигнализации и защита",
    note: "Доверие",
    text: "Подбор системы, состав установки, ограничения по авто и маршрут заявки без лишней переписки.",
  },
  {
    icon: Music,
    title: "Автозвук и мультимедиа",
    note: "Подбор",
    text: "Акустика, магнитолы, камеры, шумоизоляция, комплекты и первичный расчёт по задаче клиента.",
  },
  {
    icon: Camera,
    title: "Плёнка, тонировка, детейлинг",
    note: "Визуальный спрос",
    text: "Фото-примеры, понятные пакеты, запись на осмотр и заявки с ожиданиями по результату.",
  },
  {
    icon: Wrench,
    title: "ГБО, ремонт и сервисные работы",
    note: "По смете",
    text: "Пакеты работ, расходники, сроки, исключения и понятная логика записи на сервис.",
  },
  {
    icon: Car,
    title: "Кузовной ремонт и окраска",
    note: "Фото и сроки",
    text: "Первичный осмотр, фото повреждений, ограничения по срокам, материалам и гарантии.",
  },
  {
    icon: Gauge,
    title: "Шиномонтаж, диски, сход-развал",
    note: "Сезонный спрос",
    text: "Пакеты работ, запись по времени, допуслуги и понятные условия для повторных обращений.",
  },
  {
    icon: BadgeCheck,
    title: "Стёкла, свет, кондиционеры",
    note: "Узкие услуги",
    text: "Услуги с понятным симптомом, подбором комплектующих, сроками и записью на установку.",
  },
];

const fitItems = [
  "Вы делаете автоуслуги с понятной сметой, где объём работ можно оценить от 30 000 ₽ и выше.",
  "У вас есть прайс, примеры работ или понятный состав услуги, который можно упаковать для заявок.",
  "Вам нужен не просто красивый сайт, а упакованная воронка заявок под дорогую услугу.",
];

const notFitItems = [
  "Нужна только разовая скидка без понятного обмена ценностью.",
  "Нет готовности зафиксировать объём работ, материалы, сроки и ограничения.",
  "Хотите получить рекламу, но не готовы быстро отвечать на заявки и фото от клиентов.",
];

const dealInputs = [
  "какое направление услуги рассматривается и какой объём работ можно закрыть взаимозачётом;",
  "что входит в смету: работа, материалы, расходники, подготовка, диагностика или демонтаж;",
  "какие ограничения, доплаты и сроки нужно показать клиенту заранее;",
  "какие фото, симптомы или данные нужны от клиента до первичного расчёта;",
  "что считается принятым результатом и какие гарантийные ограничения честно прописываются.",
];

const clientRequestItems = [
  "марка, год, город и тип кузова;",
  "какая услуга нужна и что уже известно по задаче;",
  "фото, симптомы, комплектация или параметры, если без них нельзя посчитать честно;",
  "удобный канал связи и время для ответа;",
  "готовность приехать на осмотр, если по фото нельзя посчитать честно.",
];

const separateCosts = [
  "рекламный бюджет Яндекс/ВК;",
  "расходники, материалы и работы сверх согласованной сметы;",
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
  "регулярные входящие сообщения по выбранным автоуслугам;",
  "живые вопросы по дорогим автоуслугам, где клиенту нужен расчёт, доверие и быстрый ответ;",
  "записи на осмотр, расчёт стоимости и консультации;",
  "понятный канал обращений, который можно контролировать по аналитике и сообщениям.",
];

const BarterSTO = () => {
  return (
    <Layout
      title="Бартер для СТО и автоуслуг — сайт, ВК и реклама за работы сервиса | CentrLP"
      description="Взаимозачёт для автосервиса: сайт, квиз, упаковка ВКонтакте, рекламные кампании и аналитика в обмен на работы по авто. Антикор, автоэлектрика, сигнализации, автозвук, плёнка, ГБО, ремонт и детейлинг."
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
                Бартер для СТО, детейлинга, установочных центров и автоателье
              </div>

              <h1 className="mb-6 text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.32)]">
                Автоработы по смете в обмен на сайт, квиз, ВК, рекламу и аналитику.
              </h1>

              <p className="max-w-2xl text-xl leading-9 text-slate-200">
                CentrLP собирает рабочий канал заявок для автосервиса, детейлинга, ГБО,
                кузовного ремонта, автоэлектрики, плёнки, сигнализаций, автозвука и других
                автоуслуг. В бартере закладываем запас в пользу сервиса: делаем больше по составу
                и стоимости работ, чем согласованная автоуслуга. Рекламный бюджет считается отдельно.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-primary">Автосервис</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">Работы по авто, материалы, сроки и результат по смете</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-primary">CentrLP</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">Сайт или лендинг, квиз, ВК, реклама и аналитика</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="text-sm font-semibold text-primary">Запас ценности</div>
                  <div className="mt-2 text-sm leading-6 text-slate-200">CentrLP делает больше, чем стоит согласованная авторабота</div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" className="shadow-elegant hover-scale">
                  <a href="#form">Предложить автоработы</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <a href="#package">Что входит в пакет</a>
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
              <div className="mt-2 text-base text-foreground">Сначала смета и запуск пакета CentrLP, затем сервис закрывает согласованные автоработы.</div>
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

      <section id="package" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Gauge className="h-4 w-4" />
                Пакет под дорогую услугу
              </div>
              <h2 className="mb-4">Что получает автосервис взамен согласованных работ</h2>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Не просим скидку и не размываем условия. Сервис показывает автоработы по смете,
                а CentrLP собирает пакет шире этой сметы, чтобы обмен был выгоден партнёру.
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
                  Мы собираем для сервиса витрину и маршрут заявки под выбранное направление:
                  человек понимает услугу, оставляет нужные данные и быстрее доходит до расчёта или записи.
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
                Пакет с запасом CentrLP
              </div>
              <h2>Не скидка, а пакет с запасом по ценности</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Цены CentrLP нужны не для сухого торга, а чтобы показать масштаб работ. В бартере
              пакет собирается с запасом: сервис получает больше маркетинговых работ, чем отдаёт
              автоработами по согласованной смете.
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
                Точные цифры не ставим выше договорённости. Смотрим смету сервиса, подбираем
                пакет CentrLP с запасом, фиксируем сроки, результат, отдельные расходы и критерии приёмки.
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
              <h2 className="mb-4">Как клиент доходит до расчёта или записи</h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Для дорогих автоуслуг важны доверие, понятный состав работ и быстрый первичный ответ.
                Поэтому воронка собирает данные, которые мастеру нужны для оценки и записи.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <div className="font-semibold text-foreground">Шаг 1. Понять предложение</div>
                  <p className="mt-2 text-muted-foreground">Человек видит не общую вывеску, а конкретную услугу, состав работ, ограничения и следующий шаг.</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <div className="font-semibold text-foreground">Шаг 2. Передать нужные данные</div>
                  <p className="mt-2 text-muted-foreground">Квиз подсказывает, какие фото, симптомы, параметры или ссылки нужны для первичной оценки.</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background p-5">
                  <div className="font-semibold text-foreground">Шаг 3. Получить расчёт и запись</div>
                  <p className="mt-2 text-muted-foreground">Сервис быстрее понимает объём, отвечает по делу и доводит заявку до осмотра, расчёта или записи.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-4">Какие автоработы особенно подходят для бартера</h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground">
              Лучше всего работает понятная услуга с чеком от 30 000 ₽, где можно заранее описать
              состав работ, сроки, ограничения и критерии результата.
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
                Бартер начинается не с общей договорённости, а с состава работ, данных для расчёта,
                материалов, сроков и границ ответственности. Так обе стороны понимают, что именно принимают.
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
                а CentrLP даёт больше по составу работ, чтобы эту услугу было легче продавать.
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
              <h2 className="mb-4">Кейс по авто-тематике: как упаковка превратилась в рабочий канал обращений</h2>
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
                      Сервис работал по авто. CentrLP работал по маршруту заявок.
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
            <h2 className="mt-5">Состав сделки фиксируется до старта: автоработы, маркетинговый пакет, сроки и отдельные расходы</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              Сервис показывает направление, смету и условия работ. CentrLP показывает состав сайта,
              квиза, ВК, рекламы и аналитики с запасом к этой смете. Сначала запускаем маркетинговую
              часть CentrLP, затем сервис закрывает согласованные автоработы по зафиксированным этапам.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="shadow-elegant hover-scale">
                <a href="#form">Обсудить бартер для автоуслуг</a>
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
                Напишите направление сервиса, город, что предлагаете по бартеру, ориентир стоимости,
                ссылку на сайт, ВК или 2ГИС и удобный контакт.
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
