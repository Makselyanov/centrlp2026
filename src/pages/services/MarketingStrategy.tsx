import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { BentoSection } from "@/components/services/BentoSection";
import { BentoCard } from "@/components/services/BentoCard";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import {
  Map, Rocket, Brain, Globe, Search, Target, BarChart3,
  TrendingUp, CheckCircle2, XCircle, FileText, Zap, Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAutoBreadcrumb, useFaqSchema } from "@/components/SeoSchemas";

const MarketingStrategy = () => {
  const faqItems = [
    { question: "Сколько стоит разработка маркетинговой стратегии?", answer: "Экспресс-стратегия для небольшого бизнеса — от 35 000 ₽. Полная стратегия с глубоким анализом ЦА, конкурентов и юнит-экономикой — от 55 000 ₽. Стратегия с внедрением и сопровождением — от 80 000 ₽. Точная стоимость зависит от ниши и каналов." },
    { question: "Какие сроки разработки маркетинговой стратегии?", answer: "Экспресс-формат — 7–10 рабочих дней. Полная стратегия с медиапланом — 2–3 недели. Стратегия с внедрением первых кампаний — от 3 недель. Результат: готовый документ с пошаговым планом, бюджетами и KPI." },
    { question: "Что входит в маркетинговую стратегию?", answer: "Аудит текущего маркетинга, анализ ЦА и конкурентов с помощью AI, позиционирование и УТП, медиаплан с бюджетами по каналам (VK, Telegram, Яндекс.Директ), юнит-экономика, карта гипотез по креативам и офферам, дорожная карта внедрения." },
  ];
  useFaqSchema(faqItems);
  useAutoBreadcrumb("Маркетинговая стратегия");

  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const tags = [
    { text: "VK-реклама", top: "15%", left: "8%", delay: 0 },
    { text: "Тренды 2026", top: "22%", right: "10%", delay: 1.5 },
    { text: "AI-анализ", bottom: "18%", left: "12%", delay: 1 },
    { text: "Юнит-экономика", bottom: "28%", right: "8%", delay: 2 },
    { text: "Креативы", top: "8%", left: "48%", delay: 0.5 },
  ];

  const audience = [
    { icon: Map, title: "Локальный бизнес", text: "Салоны, медицина, услуги, автосервисы. Реклама есть, но заявок мало или они дорогие — нет понимания, какой канал качать." },
    { icon: Rocket, title: "Онлайн-школы", text: "Инфопродукты, курсы, наставничество. Выгорание аудитории, низкая доходимость до вебинаров, высокая стоимость лида." },
    { icon: Globe, title: "E-commerce", text: "Интернет-магазины и маркетплейсы. Высокая конкуренция, низкая маржа, зависимость от одного источника трафика." },
    { icon: Target, title: "B2B и услуги", text: "Сложные продукты с долгим циклом сделки. Клиенты долго думают, сложно донести ценность, реклама приводит «не тех»." },
  ];

  const painPoints = [
    { title: "Реклама есть, роста нет", text: "Деньги уходят в VK и Instagram*, а касса молчит. Вы кормите рекламные кабинеты, а не свой бизнес." },
    { title: "Каждый «делает по-своему»", text: "Новый таргетолог — новая стратегия. Старые ошибки повторяются, нет накопленного опыта и системы." },
    { title: "Бюджет «по ощущениям»", text: "Нет юнит-экономики и прогноза. Вы не знаете, сколько можете платить за клиента, чтобы быть в плюсе." },
    { title: "Креативы из 2018-го", text: "Реклама выглядит устаревшей. Клиенты пролистывают баннеры, потому что они не цепляют и не вызывают доверия." },
    { title: "Нет аналитики", text: "Вы не знаете, с какого объявления пришёл клиент. Масштабируете убытки вместо того, чтобы качать прибыль." },
  ];

  const process = [
    { step: "01", title: "Аудит и сбор данных", text: "Разбираем текущую аналитику, точки контакта, рекламные кабинеты, сайты и соцсети. Находим дыры, куда утекает бюджет." },
    { step: "02", title: "Анализ ЦА и конкурентов с AI", text: "AI-инструменты для анализа офферов, креативов и посадочных конкурентов. Сегментируем аудиторию, находим неочевидные боли." },
    { step: "03", title: "Стратегия и позиционирование", text: "Формулируем ключевое сообщение, УТП и тональность. Коммуникационная стратегия отдельно для VK, Telegram и других каналов." },
    { step: "04", title: "Медиаплан и юнит-экономика", text: "Расписываем каналы, бюджеты, прогноз по лидам и продажам. Считаем, сколько максимум можно платить за лид и клиента." },
    { step: "05", title: "Гипотезы и дорожная карта", text: "План тестов по креативам, офферам и форматам. Что и когда тестируем, чем считаем результат, что масштабируем." },
  ];

  const trends = [
    "Рост перформанс-креативов под короткие форматы (Reels, VK-клипы)",
    "Уход в first-party данные: CRM, свои базы, ретаргет",
    "Усиление VK как основной соцсети, рост Telegram-каналов",
    "Автоматизация и персонализация с AI: подбор креативов и текстов",
    "Рост конкуренции в e-commerce, необходимость сложных воронок",
    "Связка онлайн и офлайна: сквозная аналитика и трекинг",
  ];

  const deliverables = [
    "Пошаговый план роста на 6–12 месяцев",
    "Стратегия для VK, Telegram и Instagram*",
    "Прогноз по лидам и бюджету по каналам",
    "Карта гипотез по креативам и офферам",
    "Чёткие требования к сайтам, лендингам и аналитике",
  ];

  const pricingTiers = [
    {
      name: "Экспресс",
      price: "от 35 000 ₽",
      description: "Для небольшого бизнеса и точечного запуска",
      features: ["Аудит текущей ситуации", "Подбор 2–3 каналов", "Краткий медиаплан на 3 мес."],
      cta: "Заказать",
      highlighted: false,
    },
    {
      name: "Полная стратегия",
      price: "от 55 000 ₽",
      description: "Глубокая проработка для системного роста",
      features: [
        "Глубокий анализ ЦА и сегментов",
        "Анализ конкурентов (AI)",
        "Позиционирование и УТП",
        "Медиаплан на 6–12 мес.",
        "Юнит-экономика",
      ],
      cta: "Выбрать",
      highlighted: true,
    },
    {
      name: "Стратегия + Внедрение",
      price: "от 80 000 ₽",
      description: "Для тех, кому нужен результат «под ключ»",
      features: [
        "Всё из «Полной стратегии»",
        "Запуск первых кампаний",
        "Настройка аналитики",
        "Сопровождение 2–3 месяца",
      ],
      cta: "Обсудить",
      highlighted: false,
    },
  ];

  return (
    <Layout
      title="Маркетинговая стратегия и медиаплан | CentrLP"
      description="Разработка комплексной маркетинговой стратегии для вашего бизнеса. План развития, бюджетирование, KPI и пошаговый медиаплан."
    >
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#0096D6]/[0.04] to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#0096D6]/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#44B78B]/10 blur-3xl" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {tags.map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -15, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: tag.delay, ease: "easeInOut" }}
              className="absolute px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 text-[#0096D6]/70 text-xs font-medium backdrop-blur-sm hidden sm:block"
              style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
            >
              {tag.text}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[#0096D6] text-xs font-semibold uppercase tracking-wider shadow-sm mb-8">
            <Brain className="w-3.5 h-3.5" />
            <span>Стратегия роста 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Маркетинг, который <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
              перестаёт сливать бюджет
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Разрабатываем стратегию, медиаплан и гипотезы для ВКонтакте, Telegram, Instagram*,
            контекста и других каналов. Опираемся на аналитику и нейросети, а не на интуицию.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button size="lg" onClick={scrollToForm}>
              Разработать стратегию
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToForm}>
              Получить разбор маркетинга
            </Button>
          </div>

          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#44B78B]" />
            Работаем с бизнесом в Тюмени и по России. Усиливаем маркетинг AI-инструментами.
          </p>
        </div>
      </section>

      <ServiceImageBand slug="marketing-strategy" alt="Маркетинговая стратегия — иллюстрация услуги CentrLP" />

      {/* ── Audience ─────────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Кому нужна стратегия"
        title="Если устали от хаотичных тестов"
        description="Мы работаем с теми, кто хочет системный рост, а не разовые всплески."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {audience.map((item) => (
            <BentoCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </BentoSection>

      {/* ── Pain Points ──────────────────────────────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="Проблема"
        title="Почему маркетинг не работает"
        description="Честный взгляд на то, почему бюджеты сливаются впустую."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {painPoints.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">{item.text}</p>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <BentoSection
        tone="tint"
        eyebrow="Процесс"
        title="Как мы создаём стратегию"
        description="Пять шагов от хаоса к системному маркетингу с использованием AI."
      >
        <ProcessTimeline steps={process} />
      </BentoSection>

      {/* ── Trends ───────────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Тренды 2026"
        title="Под что мы строим стратегию"
        description="Мы не просто «делаем посты» — строим систему, которая будет работать завтра."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trends.map((trend) => (
            <div
              key={trend}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-start gap-3"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-[15px] font-medium text-slate-700 leading-relaxed">{trend}</p>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── Deliverables ─────────────────────────────────────────────── */}
      <BentoSection tone="slate" eyebrow="Что получите">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="relative pl-4 border-l-[3px] border-[#0096D6] text-[28px] md:text-[34px] font-bold tracking-tight text-slate-900 mb-5">
              На выходе — рабочий инструмент
            </h2>
            <p className="pl-4 text-lg text-slate-600 leading-relaxed mb-8">
              Не просто презентация, а документ, который становится ежедневным ориентиром собственника и маркетолога.
            </p>
            <ul className="space-y-3">
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10">
                <FileText className="w-7 h-7 text-[#0096D6]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Стратегический документ</h3>
                <p className="text-sm text-slate-500">PDF-презентация + Excel-таблицы</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="h-2.5 rounded-full bg-slate-100 w-3/4" />
              <div className="h-2.5 rounded-full bg-slate-100 w-full" />
              <div className="h-2.5 rounded-full bg-slate-100 w-5/6" />
              <div className="h-2.5 rounded-full bg-slate-100 w-2/3" />
              <div className="h-2.5 rounded-full bg-slate-100 w-4/5" />
            </div>
            <div className="pt-5 border-t border-slate-200 flex justify-between items-center">
              <span className="font-semibold text-slate-700">Результат</span>
              <span className="px-3 py-1 bg-[#44B78B]/10 text-[#44B78B] rounded-full text-sm font-bold">
                Системный рост
              </span>
            </div>
          </div>
        </div>
      </BentoSection>

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Стоимость"
        title="Инвестиция в прогнозируемый маркетинг"
        description="Три формата под разные задачи и стадии бизнеса."
      >
        <div className="grid md:grid-cols-3 gap-5 max-w-6xl">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border shadow-sm p-7 flex flex-col ${
                tier.highlighted
                  ? "border-[#0096D6]/40 bg-gradient-to-br from-white via-[#0096D6]/[0.04] to-[#44B78B]/[0.04] shadow-md md:scale-[1.02]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0096D6] to-[#44B78B] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  Популярно
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold bg-gradient-to-br from-[#0096D6] to-[#44B78B] bg-clip-text text-transparent mb-2">
                {tier.price}
              </div>
              <p className="text-sm text-slate-500 mb-6">{tier.description}</p>
              <ul className="space-y-2.5 mb-7 flex-1">
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
                className="w-full"
                onClick={scrollToForm}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mt-8">
          Цены актуальны для Тюмени и региона. Финальная стоимость зависит от ниши, каналов и объёма работ.
        </p>
      </BentoSection>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="FAQ"
        title="Частые вопросы"
      >
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

      {/* ── SEO Text ─────────────────────────────────────────────────── */}
      <section className="py-12 bg-slate-50/70">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-sm text-slate-500 leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-slate-700">Разработка маркетинговой стратегии в Тюмени</h3>
            <p>
              Грамотная <strong>разработка маркетинговой стратегии</strong> — это фундамент успешного бизнеса. Мы создаём не просто документ, а пошаговый <strong>маркетинговый план продвижения</strong>, который учитывает особенности вашего рынка, конкурентов и целевой аудитории. Наше <strong>агентство маркетинговых стратегий в Тюмени</strong> специализируется на комплексном подходе, объединяя классический маркетинг и современные AI-технологии.
            </p>
            <p>
              Мы предлагаем услуги по созданию <strong>стратегии продвижения в ВКонтакте и Instagram*</strong>, а также в Telegram и Яндекс.Директ. Ключевой этап работы — <strong>разработка медиаплана и юнит-экономики</strong>, что позволяет прогнозировать результаты и эффективно управлять бюджетом. <strong>Маркетинговая стратегия для бизнеса</strong> от CentrLP — это ваш навигатор в мире высокой конкуренции и меняющихся трендов.
            </p>
            <p className="text-xs opacity-70">*Instagram — проект Meta Platforms Inc., деятельность которой в России запрещена.</p>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-14 md:py-20 bg-gradient-to-b from-white via-[#44B78B]/[0.04] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-[28px] md:text-[34px] font-bold tracking-tight text-slate-900 mb-4">
              Готовы к системному росту?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Оставьте заявку на бесплатную консультацию. Обсудим задачи и подберём оптимальный формат стратегии.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default MarketingStrategy;
