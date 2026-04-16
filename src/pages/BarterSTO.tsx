import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRightLeft,
  BadgeCheck,
  Camera,
  Car,
  CheckCircle2,
  Droplet,
  Gauge,
  LineChart,
  MessageSquareText,
  Music,
  Shield,
  Sparkles,
  Target,
  Wrench,
  XCircle,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { BentoSection } from "@/components/services/BentoSection";
import { BentoCard } from "@/components/services/BentoCard";
import { StatBand } from "@/components/services/StatBand";
import vkAnalytics from "@/assets/vk-analytics.png";

const offerCards = [
  {
    icon: Target,
    title: "Лендинг под услугу",
    text: "Не общая визитка сервиса, а отдельная страница под ГБО, плёнку, антикор, автозвук или камеры — со структурой, которая работает на заявку.",
  },
  {
    icon: MessageSquareText,
    title: "Квиз и приём заявок",
    text: "Марка авто, задача, удобный способ связи. Клиент оставляет обращение за 40 секунд, вы получаете уже отсортированный запрос.",
  },
  {
    icon: LineChart,
    title: "Реклама под поток",
    text: "Яндекс Директ и VK Ads с прозрачной аналитикой. Мы считаем не клики, а обращения, и докручиваем офферы каждые 1–2 недели.",
  },
  {
    icon: Sparkles,
    title: "Оформление и доверие",
    text: "Соцсети, тексты, пояснения по пакетам, быстрые ответы. Локальный клиент видит нормальный сервис, а не «как повезёт».",
  },
];

const serviceNeeds = [
  {
    icon: Wrench,
    title: "ГБО",
    tag: "Ключевое",
    text: "Надёжный комплект и монтаж без компромиссов. Приоритет сделки.",
  },
  {
    icon: Droplet,
    title: "Антикор",
    tag: "Ключевое",
    text: "Особенно для Pajero 2 и тюменских зим. Полная обработка кузова.",
  },
  {
    icon: Shield,
    title: "Плёнка и защита",
    tag: "Ключевое",
    text: "Кузов, фары, пороги или частичная оклейка под практическую задачу.",
  },
  {
    icon: Shield,
    title: "Тонировка",
    tag: "Дополнительно",
    text: "Аккуратная работа, нормальные материалы, внятный результат.",
  },
  {
    icon: Music,
    title: "Автозвук",
    tag: "Дополнительно",
    text: "Правильная конфигурация без бессмысленного нагромождения железа.",
  },
  {
    icon: Camera,
    title: "Камеры и парктроники",
    tag: "Дополнительно",
    text: "Круговой обзор, передняя/задняя камера и удобная парковка.",
  },
];

const fitItems = [
  "У вас есть понятные и востребованные услуги, которые можно оценить по смете.",
  "Вы хотите не просто сайт, а входящий поток заявок и систему приёма обращений.",
  "Вы готовы обсуждать сроки, этапы и эквивалент без хаоса и «давайте как-нибудь».",
];

const notFitItems = [
  "Нужен только красивый сайт без рекламы, оффера и внятной заявки.",
  "Бартер воспринимается как работа без сроков и без договорённостей.",
  "Вам нужна просто скидка, а не рабочая схема, где обе стороны получают результат.",
];

const leadPath = [
  {
    step: "01",
    title: "Увидел и понял",
    text: "Человек сразу видит, какую услугу продвигаем, что входит и чем вы отличаетесь от соседних сервисов.",
  },
  {
    step: "02",
    title: "Оставил заявку",
    text: "Марка авто, задача, контакт и удобный способ связи — всё собирается в одном простом обращении.",
  },
  {
    step: "03",
    title: "Получил расчёт и запись",
    text: "Сервис быстро связывается, согласует детали и переводит интерес в реальную запись на осмотр или работу.",
  },
];

const caseStats = [
  { value: "15", label: "заявок за неделю теста" },
  { value: "463 ₽", label: "цена за заявку" },
  { value: "14,4%", label: "конверсия в обращение" },
  { value: "12 мес", label: "системной работы" },
];

const caseTasks = [
  "Собрали матрицу рекламных кампаний под керамику, оклейку, шумку, ремонт и детейлинг — без «одна кампания на всё».",
  "Перезапустили VK Ads под CPL и реальные входящие, а не под красивую статистику в кабинете.",
  "Оттестировали офферы и креативы по сегментам, чтобы рынок начал отвечать.",
  "Достроили путь клиента от объявления до сообщения и консультации — никто не теряется в середине.",
  "Вели аналитику и не давали заявкам растворяться в хаосе переписок.",
];

const BarterSTO = () => {
  return (
    <Layout
      title="Бартер для автосервиса Тюмень — маркетинг в обмен на услуги | CentrLP"
      description="Бартер с автосервисом: сайт, квиз, реклама и поток заявок в обмен на услуги по авто — ГБО, плёнка, антикор, автозвук. Считаем сделку по смете."
    >
      {/* HERO — light editorial */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#0096D6]/[0.04] to-white pt-28 pb-16 md:pb-24">
        <div className="pointer-events-none absolute top-16 right-[-8%] h-[420px] w-[420px] rounded-full bg-[#0096D6]/12 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-[-6%] h-[360px] w-[360px] rounded-full bg-[#44B78B]/14 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0096D6] backdrop-blur">
                <ArrowRightLeft className="h-4 w-4" />
                Бартер для СТО, детейлинга, ГБО и автотюнинга
              </div>

              <h1 className="mb-6 text-[34px] md:text-[48px] leading-[1.1] font-bold tracking-tight text-slate-900">
                Автосервис получает маркетинг под ключ.
                <br className="hidden md:block" />
                <span className="bg-gradient-to-br from-[#0096D6] to-[#44B78B] bg-clip-text text-transparent">
                  Я получаю работы по машине.
                </span>
              </h1>

              <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-slate-600">
                Не обмен «услуга на услугу» в воздухе, а понятная сделка: сайт, квиз, реклама
                и структура заявок для вашей СТО в обмен на конкретные работы по моему Pajero.
                С эквивалентом по смете и этапами.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" asChild className="shadow-md hover:shadow-lg transition">
                  <a href="#form">Обсудить бартер</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#case">Смотреть кейс с цифрами</a>
                </Button>
              </div>
            </div>

            {/* Right side: stylized barter loop card */}
            <div className="relative">
              <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-[#0096D6]/20 bg-gradient-to-br from-white to-[#0096D6]/[0.06] p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/15 to-[#0096D6]/5 text-[#0096D6]">
                      <Target className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold text-slate-900">СТО получает</div>
                    <div className="mt-1 text-xs leading-5 text-slate-600">
                      Сайт, квиз, рекламу и поток заявок
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#44B78B]/25 bg-gradient-to-br from-white to-[#44B78B]/[0.07] p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#44B78B]/15 to-[#44B78B]/5 text-[#44B78B]">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold text-slate-900">Я получаю</div>
                    <div className="mt-1 text-xs leading-5 text-slate-600">
                      ГБО, антикор, плёнку, тонировку
                    </div>
                  </div>
                </div>

                <div className="my-5 flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                    <ArrowRightLeft className="h-3.5 w-3.5" />
                    эквивалент по смете
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Что важно
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-700">
                    Прозрачная смета, этапы, нормальная договорённость — без воздуха и «как пойдёт».
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real case numbers band — right after hero */}
      <BentoSection tone="slate">
        <div className="mb-8 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0096D6]">
            <span className="h-px w-8 bg-[#0096D6]" />
            Живая статистика VK Ads
          </div>
          <h2 className="relative pl-4 border-l-[3px] border-[#0096D6] text-[28px] md:text-[34px] font-bold tracking-tight text-slate-900">
            Цифры с реальной авто-кампании
          </h2>
          <p className="mt-4 pl-4 text-lg text-slate-600 leading-relaxed">
            Это не «в среднем по рынку» — это скрин из VK Ads кампании по керамике с бюджетом
            1 000 ₽/день. Ниже — что именно за этим стоит.
          </p>
        </div>
        <StatBand stats={caseStats} />
      </BentoSection>

      {/* What СТО gets */}
      <BentoSection
        tone="white"
        eyebrow="Состав обменного пакета"
        title="Что именно получает автосервис"
        description="Вместо абстрактного набора услуг здесь конкретный пакет: посадочная страница, квиз, реклама, аналитика и маршрут обращения до записи."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {offerCards.map((item) => (
            <BentoCard key={item.title} icon={item.icon} title={item.title} text={item.text} variant="feature" />
          ))}
        </div>
      </BentoSection>

      {/* Customer path */}
      <BentoSection
        tone="tint"
        eyebrow="Путь клиента до записи"
        title="Как человек доходит от рекламы до записи в сервис"
        description="Для локального авто-бизнеса важен понятный маршрут — увидел предложение, оставил заявку, получил расчёт, записался."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {leadPath.map((step) => (
            <div
              key={step.step}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-lg font-bold text-white">
                {step.step}
              </div>
              <h3 className="mb-2 text-[20px] font-bold tracking-tight text-slate-900">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* What I want */}
      <BentoSection
        tone="white"
        eyebrow="Моя сторона сделки"
        title="Какие работы по машине интересны в обмен"
        description="Не «список хотелок», а понятные направления, которые удобно сопоставить с маркетинговым пакетом и оценить по смете."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceNeeds.map((item) => {
            const isKey = item.tag === "Ключевое";
            return (
              <div
                key={item.title}
                className="h-full rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm transition hover:shadow-md hover:border-slate-300"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                      isKey
                        ? "bg-[#0096D6]/12 text-[#0096D6]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="mb-2 text-[20px] font-bold tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </BentoSection>

      {/* Case with screenshot */}
      <BentoSection
        id="case"
        tone="slate"
        eyebrow="Год работы по авто-тематике"
        title="Как бартер превратился в стабильный поток заявок"
        description="Не «разово что-то настроили», а год системной работы: реклама, офферы, сообщения, структура и постоянная докрутка под живой спрос."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 md:p-9 shadow-sm">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0096D6]/10 px-3 py-1.5 text-xs font-semibold text-[#0096D6]">
              <Gauge className="h-3.5 w-3.5" />
              Что сделали
            </div>
            <h3 className="mb-5 text-[22px] font-bold tracking-tight text-slate-900">
              Перестроили систему под входящий поток
            </h3>
            <ul className="space-y-3.5">
              {caseTasks.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#0096D6]/15 to-[#44B78B]/15">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0096D6]" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] leading-[1.65] text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-[#0096D6]/20 bg-gradient-to-br from-white via-[#0096D6]/[0.04] to-[#44B78B]/[0.04] p-6">
              <p className="text-base leading-7 text-slate-700">
                <span className="font-semibold text-slate-900">Результат:</span> стабильные ежедневные
                входящие, записи на осмотр и расчёт, рабочий поток 12 месяцев подряд — а не всплеск
                на неделю после запуска.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Скрин из VK Ads
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  Кампания по керамике — 13–19 ноября
                </div>
              </div>
              <img
                src={vkAnalytics}
                alt="Статистика рекламной кампании ВКонтакте для автосервиса"
                className="block w-full"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0096D6]">
                Почему это работает
              </div>
              <p className="mt-2 text-sm leading-[1.65] text-slate-700">
                Потому что работа шла не вокруг красивых отчётов, а вокруг реального спроса,
                понятных офферов и постоянной докрутки до входящих заявок.
              </p>
            </div>
          </div>
        </div>
      </BentoSection>

      {/* Fit / Not-fit */}
      <BentoSection
        tone="white"
        eyebrow="Формат сделки"
        title="Кому такой бартер подходит, а кому нет"
        description="Чтобы не тратить время друг друга — короткая проверка на совместимость."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-[#44B78B]/25 bg-gradient-to-br from-white to-[#44B78B]/[0.05] p-7 shadow-sm">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#44B78B]/15 px-3 py-1.5 text-xs font-semibold text-[#2D8F6B]">
              <BadgeCheck className="h-3.5 w-3.5" />
              Подходит
            </div>
            <h3 className="mb-4 text-[22px] font-bold tracking-tight text-slate-900">
              Что помогает сделке пройти спокойно
            </h3>
            <ul className="space-y-3.5">
              {fitItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2D8F6B]" />
                  <span className="text-[15px] leading-[1.65] text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-white to-rose-50/50 p-7 shadow-sm">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700">
              <XCircle className="h-3.5 w-3.5" />
              Не подходит
            </div>
            <h3 className="mb-4 text-[22px] font-bold tracking-tight text-slate-900">
              Что точно не сработает
            </h3>
            <ul className="space-y-3.5">
              {notFitItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
                  <span className="text-[15px] leading-[1.65] text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BentoSection>

      {/* Final CTA */}
      <BentoSection tone="tint">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#0096D6]/20 bg-white p-8 md:p-12 text-center shadow-lg">
          <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white">
            <Car className="h-7 w-7" />
          </div>
          <h2 className="text-[26px] md:text-[32px] font-bold tracking-tight text-slate-900">
            Посчитаем бартер по смете — без воздуха и обещаний
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Вы присылаете список услуг и пример прайса. Я показываю, какой пакет по сайту, заявкам
            и рекламе можно собрать под эквивалент. Логика совпадает — идём дальше.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="shadow-md hover:shadow-lg transition">
              <a href="#form">Оставить заявку на бартер</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">Посмотреть услуги CentrLP</Link>
            </Button>
          </div>
        </div>
      </BentoSection>

      {/* Form */}
      <BentoSection id="form" tone="white">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-[28px] md:text-[34px] font-bold tracking-tight text-slate-900">
              Оставьте заявку на бартер
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Напишите, какие услуги есть у вашего автосервиса, в каком городе работаете и какой
              формат сотрудничества вам интересен.
            </p>
          </div>
          <ContactForm />
        </div>
      </BentoSection>
    </Layout>
  );
};

export default BarterSTO;
