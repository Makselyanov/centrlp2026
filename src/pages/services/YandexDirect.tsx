import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { BentoSection } from "@/components/services/BentoSection";
import { BentoCard } from "@/components/services/BentoCard";
import { Link } from "react-router-dom";
import {
  Target, TrendingUp, CheckCircle2, Brain, Search, Zap, XCircle, Bot,
  MousePointer2, ArrowRight, ShieldCheck, Rocket, Layers, Sparkles, BarChart,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAutoBreadcrumb, useFaqSchema } from "@/components/SeoSchemas";

const YandexDirect = () => {
  const faqItems = [
    { question: "Сколько стоит настройка Яндекс.Директ в Тюмени?", answer: "Настройка поисковой рекламы — от 20 000 ₽. РСЯ (рекламная сеть Яндекса) — от 25 000 ₽. Ведение и ежедневная оптимизация — от 30 000 ₽/мес. Комплекс AI (поиск + РСЯ + чат-боты + доработка сайта) — от 50 000 ₽/мес. Рекламный бюджет оплачивается отдельно." },
    { question: "Какие сроки запуска рекламы в Яндекс.Директ?", answer: "Сбор семантики, написание объявлений и настройка аналитики — 5–7 рабочих дней. Первые клики и заявки — в день запуска. Оптимизация и выход на целевую стоимость лида — 2–4 недели." },
    { question: "Что входит в ведение Яндекс.Директ?", answer: "Ежедневная чистка мусорных площадок, корректировка ставок, A/B-тесты объявлений, защита от ботов и скликивания, AI-оптимизация кампаний, ретаргетинг, регулярные отчёты с аналитикой по лидам и продажам." },
  ];
  useFaqSchema(faqItems);
  useAutoBreadcrumb("Яндекс.Директ");

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const painPoints = [
    { icon: XCircle, title: "Мусор из Мастера Кампаний", text: "Яндекс подмешивает до 40% нецелевых площадок в автоматических стратегиях, сливая бюджет на мобильные игры." },
    { icon: Bot, title: "Боты и скликивание", text: "Конкуренты и бот-фермы скликивают до 60% бюджета. Обычная защита Яндекса пропускает их." },
    { icon: TrendingUp, title: "Роботы съедают бюджет", text: "Автостратегии разгоняются, видят «конверсии» (которые на самом деле боты) и начинают лить туда все деньги." },
    { icon: MousePointer2, title: "Менеджер «ведёт» для галочки", text: "Агентства просто шлют отчёты. Никто не слушает звонки и не меняет офферы под рынок." },
  ];

  const aiFeatures = [
    { icon: ShieldCheck, title: "Авто-чистка мусора", text: "Блокирует 120+ видов ботов и скликивателей в реальном времени." },
    { icon: Sparkles, title: "Генерация креативов", text: "Создаёт 100+ вариантов объявлений и тестирует их за 24 часа." },
    { icon: Target, title: "Прогноз CPA 92%", text: "Точно предсказывает стоимость заявки до запуска кампании." },
    { icon: Search, title: "Поиск связок", text: "Каждую неделю находит новые ключевые слова, которые упустили конкуренты." },
  ];

  const destinations = [
    { icon: Layers, title: "Продающий сайт", text: "Для услуг, B2B и локального бизнеса — сильный оффер, SEO-слой и удобная форма заявки.", href: "/services/website-development", cta: "Нужен сайт" },
    { icon: Rocket, title: "Telegram Mini App", text: "Для бронирования, записи, личного кабинета и повторных касаний в мессенджере.", href: "/services/telegram-mini-app", cta: "В Mini App" },
    { icon: BarChart, title: "CRM и воронка", text: "Для отделов продаж: маршрутизация лидов, статусы, сегментация и контроль потерь.", href: "/services/custom-crm", cta: "Собрать CRM" },
    { icon: Bot, title: "AI-агент", text: "Для квалификации заявок, быстрых ответов, обработки однотипных запросов и догрева до менеджера.", href: "/services/ai-agents", cta: "Подключить AI" },
  ];

  const pricingTiers = [
    { name: "Поиск", price: "от 20 000 ₽", desc: "Горячий трафик для быстрых продаж", features: ["Сбор семантики", "Минус-слова", "Написание объявлений", "Настройка аналитики"], highlighted: false },
    { name: "РСЯ", price: "от 25 000 ₽", desc: "Охватная реклама с визуалом", features: ["Дизайн баннеров", "Ретаргетинг", "Аудиторные сегменты", "Видео-дополнения"], highlighted: false },
    { name: "Ведение", price: "от 30 000 ₽/мес", desc: "Ежедневная оптимизация и отчёты", features: ["Чистка площадок", "Корректировка ставок", "A/B тесты", "Отчётность"], highlighted: false },
    { name: "Комплекс AI", price: "от 50 000 ₽/мес", desc: "Максимальный результат под ключ", features: ["Поиск + РСЯ", "AI-оптимизация", "Чат-боты", "Доработка сайта"], highlighted: true },
  ];

  const trends = [
    "AI-планирование бюджета (Zero-Waste)",
    "Поведенческое программирование объявлений",
    "Персональные креативы под микро-сегменты",
    "Динамическая персонализация лендингов",
  ];

  return (
    <Layout
      title="Яндекс.Директ 2026: заявки в сайт, Mini App и CRM | CentrLP"
      description="Настройка и ведение Яндекс.Директ с AI-оптимизацией. Ведем трафик не в пустые страницы, а в продающие сайты, мини-приложения и CRM-воронки."
    >
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#0096D6]/[0.04] to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#0096D6]/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#44B78B]/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[#0096D6] text-xs font-semibold uppercase tracking-wider shadow-sm mb-8">
            <Rocket className="w-3.5 h-3.5" />
            <span>Технологии маркетинга 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Яндекс.Директ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
              как система заявок
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Проектируем трафик под продающие страницы, Telegram Mini App, ботов и CRM-сценарии. AI помогает быстрее найти рабочие связки, а мы собираем всю воронку до продажи.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={scrollToContact}>
              Получить стратегию <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#comparison">Смотреть сравнение</a>
            </Button>
          </div>
        </div>
      </section>

      <ServiceImageBand slug="yandex-direct" alt="Яндекс.Директ — иллюстрация услуги CentrLP" />

      {/* ── Comparison ───────────────────────────────────────────────── */}
      <BentoSection
        id="comparison"
        tone="white"
        eyebrow="Ожидание vs реальность"
        title="Обычный Директ против CentrLP"
        description="Две картины по одной и той же нише — с типичной настройкой и с AI-оптимизацией."
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-white to-red-50/40 p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-2 text-red-500 font-bold">
              <XCircle className="w-5 h-5" />
              Обычный Директ
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <div className="text-xs text-slate-500 mb-1">Стоимость лида (CPA)</div>
                <div className="text-3xl font-bold text-slate-900">2 500 ₽</div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-red-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Конверсия (CR)</div>
                <div className="text-3xl font-bold text-slate-900">0.8%</div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[10%] bg-red-400 rounded-full" />
                </div>
              </div>
            </div>
            <ul className="space-y-2">
              {["Мусорные площадки и боты", "Автостратегии тратят деньги впустую", "Креативы «из коробки»"].map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#44B78B]/30 bg-gradient-to-br from-white to-[#44B78B]/[0.06] p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-2 text-[#44B78B] font-bold">
              <ShieldCheck className="w-5 h-5" />
              CentrLP Direct
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <div className="text-xs text-slate-500 mb-1">Стоимость лида (CPA)</div>
                <div className="text-3xl font-bold text-slate-900">350 ₽</div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[20%] bg-[#44B78B] rounded-full" />
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Конверсия (CR)</div>
                <div className="text-3xl font-bold text-slate-900">12.5%</div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-[#44B78B] rounded-full" />
                </div>
              </div>
            </div>
            <ul className="space-y-2">
              {["AI-чистка ботов и мусора в реальном времени", "100+ креативов за 24 часа", "Трафик ведём в продающий сайт/бот"].map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#44B78B]" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BentoSection>

      {/* ── Pain Points ──────────────────────────────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="Проблема"
        title="Почему 87% кампаний умирают"
        description="Четыре системные причины, из-за которых бюджет уходит без заявок."
      >
        <div className="grid md:grid-cols-2 gap-5">
          {painPoints.map((pain) => (
            <div
              key={pain.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <pain.icon className="w-5 h-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 tracking-tight">{pain.title}</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">{pain.text}</p>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── AI Features ──────────────────────────────────────────────── */}
      <BentoSection
        tone="tint"
        eyebrow="AI-технологии 2026"
        title="Что делает AI, чего не может обычный директолог"
        description="Четыре функции, которые мы считаем обязательными для Директа в 2026 году."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {aiFeatures.map((item) => (
            <BentoCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
          ))}
        </div>
      </BentoSection>

      {/* ── Destinations ─────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Куда ведём трафик"
        title="Чтобы Директ окупался"
        description="Сильный Директ в 2026-м упирается не в ключи и ставки, а в то, какой путь проходит человек после клика."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {destinations.map((item) => (
            <div
              key={item.href}
              className="h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-slate-300"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold tracking-tight text-slate-900">{item.title}</h3>
              <p className="mb-5 flex-1 text-slate-600 leading-relaxed text-[15px]">{item.text}</p>
              <Link
                to={item.href}
                className="inline-flex items-center gap-1.5 text-[#0096D6] font-semibold text-sm hover:gap-2.5 transition-all"
              >
                {item.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="Стоимость"
        title="Инвестиции в результат"
        description="Честные цены без скрытых комиссий. Рекламный бюджет оплачивается отдельно."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border shadow-sm p-6 flex flex-col ${
                tier.highlighted
                  ? "border-[#0096D6]/40 bg-gradient-to-br from-white via-[#0096D6]/[0.04] to-[#44B78B]/[0.04] shadow-md"
                  : "border-slate-200 bg-white"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0096D6] to-[#44B78B] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  Лучший выбор
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
              <div className="text-2xl font-bold bg-gradient-to-br from-[#0096D6] to-[#44B78B] bg-clip-text text-transparent mb-2">
                {tier.price}
              </div>
              <p className="text-sm text-slate-500 mb-5">{tier.desc}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <div className="mt-[3px] flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#0096D6]/15 to-[#44B78B]/15">
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#0096D6]" strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.highlighted ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={scrollToContact}
              >
                Выбрать
              </Button>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── Trends 2026 ──────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Тренды 2026"
        title="Будьте на шаг впереди"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <ul className="space-y-4">
            {trends.map((trend, i) => (
              <li
                key={trend}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white font-bold text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <span className="text-[15px] font-medium text-slate-700">{trend}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10">
                <Brain className="w-6 h-6 text-[#0096D6]" />
              </div>
              <div>
                <div className="font-bold text-slate-900">AI Analysis</div>
                <div className="text-xs text-slate-500">Real-time processing</div>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="h-2 rounded-full bg-slate-100 w-3/4" />
              <div className="h-2 rounded-full bg-slate-100 w-full" />
              <div className="h-2 rounded-full bg-slate-100 w-5/6" />
              <div className="h-2 rounded-full bg-slate-100 w-4/5" />
            </div>
            <div className="pt-5 border-t border-slate-200 flex justify-between items-center">
              <span className="text-sm text-slate-500">Эффективность</span>
              <span className="text-xl font-bold text-[#44B78B]">+240%</span>
            </div>
          </div>
        </div>
      </BentoSection>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <BentoSection tone="slate" eyebrow="FAQ" title="Частые вопросы">
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 text-left text-slate-900 hover:text-[#0096D6]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-slate-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </BentoSection>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-14 md:py-20 bg-gradient-to-b from-white via-[#44B78B]/[0.04] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-[28px] md:text-[34px] font-bold tracking-tight text-slate-900 mb-4">
              Хватит кормить Яндекс. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
                Пора забирать свои заявки.
              </span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Запустим рекламу за 7 дней с гарантией по договору. Оставьте заявку — вернёмся с расчётом стоимости и стратегией.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default YandexDirect;
