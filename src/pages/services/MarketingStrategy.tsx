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
import { useAutoBreadcrumb, useFaqSchema, useServiceSchema } from "@/components/SeoSchemas";

const MarketingStrategy = () => {
  const faqItems = [
    { question: "Сколько стоит разработка маркетинговой стратегии?", answer: "Экспресс-стратегия для небольшого бизнеса — от 35 000 ₽. Полная стратегия с глубоким анализом ЦА, конкурентов и юнит-экономикой — от 55 000 ₽. Стратегия с внедрением и сопровождением — от 80 000 ₽. Точная стоимость зависит от ниши и каналов." },
    { question: "Какие сроки разработки маркетинговой стратегии?", answer: "Экспресс-формат — 7–10 рабочих дней. Полная стратегия с медиапланом — 2–3 недели. Стратегия с внедрением первых кампаний — от 3 недель. Результат: готовый документ с пошаговым планом, бюджетами и KPI." },
    { question: "Что входит в маркетинговую стратегию?", answer: "Аудит текущего маркетинга, анализ ЦА и конкурентов с помощью AI, позиционирование и УТП, медиаплан с бюджетами по каналам (VK, Telegram, Яндекс.Директ), юнит-экономика, карта гипотез по креативам и офферам, дорожная карта внедрения." },
    { question: "Можно ли заказать маркетинговый план без рекламного бюджета?", answer: "Да. Часто начинаем именно со стратегии, медиаплана и прогноза по каналам без немедленного запуска рекламы. Это помогает понять, какие шаги реально дадут заявки, прежде чем вкладывать деньги в трафик." },
    { question: "Что входит в маркетинговый план за 35 000 ₽?", answer: "В экспресс-формат входит разбор текущей ситуации, выбор 2–3 приоритетных каналов, оффер, медиаплан на 3 месяца, ориентиры по бюджету и список первых действий для сайта, рекламы и обработки заявок." },
    { question: "Чем маркетинговый план отличается от обычного контент-плана?", answer: "Контент-план отвечает за темы публикаций, а маркетинговый план связывает оффер, посадочную страницу, рекламу, аналитику, CRM и обработку заявок. Поэтому в работе фиксируем не только что публиковать, но и куда вести клиента, какие цели считать и кто отвечает за лид." },
    { question: "Можно ли начать с одной услуги или одного направления?", answer: "Да. Для быстрого роста заявок часто выбираем 1–2 приоритетные услуги, усиливаем страницы, настраиваем аналитику и тестируем каналы на коротком цикле. Это дешевле и практичнее, чем сразу расписывать широкий документ без внедрения." },
  ];
  useFaqSchema(faqItems);
  useAutoBreadcrumb("Маркетинговая стратегия");
  useServiceSchema({
    name: "Маркетинговый план на заказ в Тюмени",
    description: "Маркетинговый план на заказ в Тюмени: анализ рынка и аудитории, позиционирование, экономика, медиаплан, воронка, аналитика и дорожная карта внедрения.",
    price: "35000",
  });

  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
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

  const planIncludes = [
    {
      title: "Каналы и приоритеты",
      text: "Показываем, где начинать продвижение: Яндекс.Директ, SEO, VK, Telegram, карточки и повторные касания. Для каждого канала фиксируем роль, бюджет и первый тест.",
    },
    {
      title: "Оффер и посадочная",
      text: "Проверяем, что обещать клиенту на первом экране, какую страницу усиливать и какие блоки нужны до запуска трафика.",
    },
    {
      title: "Бюджет и экономика",
      text: "Считаем допустимую цену лида, минимальный тестовый бюджет и условия, при которых канал стоит масштабировать.",
    },
    {
      title: "Первые действия",
      text: "Формируем последовательность на 2–4 недели: что исправить на сайте, какие кампании собрать, какие события в аналитике проверить.",
    },
  ];

  const formatComparison = [
    {
      name: "Экспресс-план",
      price: "от 35 000 ₽",
      goodFor: "когда нужно быстро выбрать каналы и первые действия",
      result: "медиаплан на 30–90 дней, оффер, бюджет, список правок сайта и аналитики",
    },
    {
      name: "Полная стратегия",
      price: "от 55 000 ₽",
      goodFor: "когда важно перестроить маркетинг, сегменты и воронку",
      result: "позиционирование, конкуренты, юнит-экономика, каналы, KPI и дорожная карта",
    },
    {
      name: "Стратегия с внедрением",
      price: "от 80 000 ₽",
      goodFor: "когда нужен не только документ, но и запуск первых гипотез",
      result: "приоритетные кампании, аналитика, посадочные правки и контроль первых заявок",
    },
  ];

  const leadRoute = [
    {
      title: "1. Выбираем денежную услугу",
      text: "Фиксируем, какие услуги сейчас должны приносить заявки: сайт, Яндекс Директ, CRM, аудит, аналитика или другой приоритет.",
      href: "/services",
    },
    {
      title: "2. Усиливаем посадочную",
      text: "Проверяем цену входа, оффер, FAQ, доказательства, CTA, форму и внутренние ссылки до запуска трафика.",
      href: "/proverka-saita-i-zayavok-za-48-chasov",
    },
    {
      title: "3. Считаем заявки и источники",
      text: "Настраиваем цели, события, UTM, отчеты и связь с CRM, чтобы видеть не визиты, а путь от клика до обращения.",
      href: "/services/web-analytics",
    },
    {
      title: "4. Запускаем короткий цикл тестов",
      text: "Первые 2–4 недели нужны для проверки гипотез: какие запросы, объявления, страницы и сообщения дают живые обращения.",
      href: "/nastroyka-yandex-direct-tyumen",
    },
  ];

  const decisionSignals = [
    {
      title: "Реклама идет, заявок мало",
      text: "Проверяем оффер, посадочную, цену входа, формы, Метрику и CRM. В плане фиксируем, что исправить до увеличения бюджета.",
      href: "/proverka-saita-i-zayavok-za-48-chasov",
    },
    {
      title: "Нужно выбрать первый канал",
      text: "Сравниваем Яндекс Директ, SEO, карты, VK, Telegram и повторные касания. Канал выбирается по спросу, экономике и скорости проверки.",
      href: "/nastroyka-yandex-direct-tyumen",
    },
    {
      title: "Есть заявки, но нет управляемости",
      text: "Связываем сайт, рекламу, UTM, цели и CRM, чтобы собственник видел источник обращения, ответственного и следующий шаг.",
      href: "/services/web-analytics",
    },
  ];

  const pricingTiers = [
    {
      name: "Экспресс",
      price: "от 35 000 ₽",
      description: "Для небольшого бизнеса и точечного запуска",
      features: [
        "Аудит сайта, формы и текущих каналов",
        "Подбор 2–3 каналов под заявки",
        "Краткий медиаплан на 30–90 дней",
        "Список правок посадочной и аналитики",
      ],
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
        "Маршрут заявки: сайт, реклама, CRM",
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
        "Проверка заявок и источников",
        "Сопровождение 2–3 месяца",
      ],
      cta: "Обсудить",
      highlighted: false,
    },
  ];

  return (
    <Layout
      title="Заказать план маркетинга в Тюмени от 35 000 ₽ | CentrLP"
      description="Закажите план маркетинга в Тюмени от 35 000 ₽: аудит, оффер, каналы, медиаплан, бюджет, аналитика и маршрут заявки. Срок экспресс-формата — 7–10 рабочих дней."
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
            <span>Маркетинговая стратегия для бизнеса</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            План маркетинга на заказ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
              от анализа до внедрения
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Разрабатываем стратегию для бизнеса в Тюмени: анализируем рынок и аудиторию,
            уточняем позиционирование, считаем экономику, выбираем каналы и собираем дорожную карту внедрения.
            Экспресс-план доступен как отдельный стартовый формат от 35 000 ₽.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button size="lg" onClick={scrollToForm}>
              Заказать план от 35 000 ₽
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToPricing}>
              Смотреть состав и цены
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

      <BentoSection
        tone="white"
        eyebrow="Маркетинговый план на заказ"
        title="Что входит в работу за 35 000 ₽"
        description="Экспресс-формат нужен, когда бизнесу важно быстро понять, какие каналы запускать, сколько денег закладывать и что исправить до рекламы."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {planIncludes.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-900">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </BentoSection>

      <BentoSection
        tone="slate"
        eyebrow="Какой формат выбрать"
        title="Цена зависит от глубины и внедрения"
        description="Чтобы заявка была проще, показываем не абстрактную стратегию, а понятный объем работ и ближайший результат."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {formatComparison.map((item) => (
            <div key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0096D6]">{item.price}</div>
              <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">{item.name}</h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">{item.goodFor}</p>
              <div className="rounded-xl bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-700">
                {item.result}
              </div>
            </div>
          ))}
        </div>
      </BentoSection>

      <BentoSection
        tone="white"
        eyebrow="Когда заказывать"
        title="План нужен, когда следующий шаг влияет на деньги"
        description="Не растягиваем работу в общий документ. Сначала выбираем ситуацию, где план быстрее всего превращается в заявку, тест или экономию бюджета."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {decisionSignals.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0096D6]/40 hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#0096D6]">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-600">{item.text}</p>
            </a>
          ))}
        </div>
      </BentoSection>

      <BentoSection
        tone="white"
        eyebrow="Маршрут к заявке"
        title="План должен доводить клиента до обращения"
        description="Связываем стратегию с конкретными страницами, аналитикой и обработкой лидов, чтобы работа не осталась презентацией."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {leadRoute.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0096D6]/40 hover:shadow-md"
            >
              <h3 className="mb-3 text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#0096D6]">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-600">{item.text}</p>
            </a>
          ))}
        </div>
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
        id="pricing"
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
            <h3 className="text-base font-bold text-slate-700">Разработка маркетинговой стратегии в Тюмени: цена и структура работы</h3>
            <p>
              Грамотная <strong>разработка маркетинговой стратегии</strong> — это фундамент успешного бизнеса. Мы создаём не просто документ, а пошаговый <strong>маркетинговый план продвижения</strong>, который учитывает особенности вашего рынка, конкурентов и целевой аудитории. Наше <strong>агентство маркетинговых стратегий в Тюмени</strong> специализируется на комплексном подходе, объединяя классический маркетинг и современные AI-технологии.
            </p>
            <p>
              Мы предлагаем услуги по созданию <strong>стратегии продвижения в ВКонтакте и Instagram*</strong>, а также в Telegram и Яндекс.Директ. Ключевой этап работы — <strong>разработка медиаплана и юнит-экономики</strong>, что позволяет прогнозировать результаты и эффективно управлять бюджетом. <strong>Маркетинговая стратегия для бизнеса</strong> от CentrLP — это ваш навигатор в мире высокой конкуренции и меняющихся трендов.
            </p>
            <p>
              Если вам нужно понять, <strong>сколько стоит маркетинговый план</strong>, можно начать с экспресс-формата от 35 000 ₽. Он подходит, когда нужен короткий и прикладной документ: какие каналы тестировать, какой оффер усиливать, какой бюджет закладывать и как считать результат по лидам, а не по ощущениям.
            </p>
            <p>
              Если вы сравниваете варианты и хотите сначала разобраться в составе работ, прочитайте материал <a className="text-[#0096D6] underline underline-offset-4" href="/blog/plan-marketinga-cena-zakazat-tyumen">про цену и состав маркетингового плана</a>. Если сайт уже получает трафик, но не дает обращений, начните с <a className="text-[#0096D6] underline underline-offset-4" href="/proverka-saita-i-zayavok-za-48-chasov">проверки сайта и пути заявки</a> и настройки <a className="text-[#0096D6] underline underline-offset-4" href="/services/web-analytics">веб-аналитики</a>.
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
              Нужен маркетинговый план с понятной ценой и сроками?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Оставьте заявку, и мы предложим формат стратегии под вашу нишу, сроки и ближайшие цели по лидам.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default MarketingStrategy;
