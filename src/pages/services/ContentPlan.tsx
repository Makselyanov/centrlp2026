import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { BentoSection } from "@/components/services/BentoSection";
import { BentoCard } from "@/components/services/BentoCard";
import {
  Calendar, Users, TrendingUp, CheckCircle2, MessageSquare, Target,
  Brain, Image as ImageIcon, BarChart3, XCircle, Sparkles,
  Layout as LayoutIcon, FileText, Map,
} from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAutoBreadcrumb, useFaqSchema } from "@/components/SeoSchemas";

const ContentPlan = () => {
  const faqItems = [
    { question: "Сколько стоит контент-план для соцсетей в Тюмени?", answer: "Контент-план стоит от 10 000 ₽/мес. Ведение соцсетей (план + написание текстов + публикация) — от 20 000 ₽/мес. Комплекс «контент + реклама» — от 30 000 ₽/мес. Финальная цена зависит от количества площадок и объёма работ." },
    { question: "Какие сроки разработки контент-плана?", answer: "Первый контент-план готов за 5–7 рабочих дней. В него входит рубрикатор, календарь публикаций, примеры креативов и рекомендации по визуалу. Далее план обновляется ежемесячно." },
    { question: "Что входит в контент-план?", answer: "В контент-план входят: рубрикатор под цели бизнеса, календарь с датами и форматами публикаций (посты, сторис, Reels), структура текстов с заголовками и CTA, референсы для визуала и рекомендации по аналитике." },
  ];
  useFaqSchema(faqItems);
  useAutoBreadcrumb("Контент-план");

  const scrollToForm = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const tags = [
    { text: "VK", top: "15%", left: "10%", delay: 0 },
    { text: "Telegram", top: "25%", right: "15%", delay: 1.5 },
    { text: "Instagram*", bottom: "20%", left: "15%", delay: 1 },
    { text: "AI-креативы", bottom: "30%", right: "10%", delay: 2 },
    { text: "Reels", top: "10%", left: "50%", delay: 0.5 },
  ];

  const audience = [
    { icon: Users, title: "Малый бизнес", text: "Салоны, клиники, СТО. Нет времени и системы — постите от случая к случаю, клиенты забывают о вас." },
    { icon: Target, title: "Эксперты", text: "Коучи, психологи, юристы. Сложно держать регулярность, не хватает идей, как связать пользу с продажей услуг." },
    { icon: MessageSquare, title: "Онлайн-магазины", text: "Маркетплейсы и шоурумы. Нужно постоянно показывать товар, собирать отзывы и прогревать к акциям." },
    { icon: Map, title: "Локальные бренды", text: "Кафе, фитнес, офлайн-точки. Живёте за счёт «сарафана», но хотите управляемый поток новых гостей." },
  ];

  const painPoints = [
    { title: "Посты «как получится»", text: "Нет единой логики, рубрик и смыслов. Сегодня котики, завтра акция, послезавтра тишина. Аудитория не понимает, о чём вы." },
    { title: "Лайки есть, денег нет", text: "Вы делаете красивый контент, но он не ведёт к продукту. Люди смотрят, ставят лайки, но покупают у конкурентов." },
    { title: "План в голове", text: "Или в заметках. Команда не понимает, что делать. Если вы заболели — соцсети встали." },
    { title: "Устаревшие форматы", text: "Только фото и текст. Нет Reels, клипов, сторис. Алгоритмы пессимизируют такой аккаунт." },
    { title: "Нет аналитики", text: "Вы не знаете, какая рубрика приносит заявки, а какая — только отписки. Бьёте вслепую." },
  ];

  const included = [
    { icon: LayoutIcon, title: "Контент-матрица", text: "Рубрикатор под цели бизнеса: прогрев, продажи, доверие, репутация, вовлечение." },
    { icon: Calendar, title: "Календарь публикаций", text: "Расписание: даты, время, частота. Баланс форматов — пост, сторис, клип, статья." },
    { icon: ImageIcon, title: "Примеры креативов", text: "Референсы для дизайнера или готовые шаблоны. ТЗ для фото и видеосъёмки." },
    { icon: FileText, title: "Структура постов", text: "Заголовки, хуки (крючки внимания), офферы, призывы к действию." },
    { icon: Brain, title: "AI-усиление", text: "Генерация вариантов заголовков и идей с помощью нейросетей для максимального охвата." },
    { icon: BarChart3, title: "Аналитика", text: "Какие метрики отслеживать, как понимать, что зашло, как корректировать план." },
  ];

  const aiSteps = [
    "Сбор и анализ идей в вашей нише за минуты",
    "Поиск трендов и вирусных форматов 2026 года",
    "Генерация десятков вариантов заголовков и офферов",
    "Адаптация контента под VK, Telegram и Instagram*",
    "Финальная редактура и смыслы — только вручную",
  ];

  const trends = [
    "Короткие вертикальные видео (Reels, Клипы) — основной канал охвата",
    "Персонализация и сериальность: люди покупают у людей",
    "UGC и реальные истории вместо «вылизанных» макетов",
    "Нативная продажа через пользу, а не «купи в лоб»",
    "Связка с автоворонками: чат-боты, квизы, лид-формы",
    "AI для скорости, но не вместо стратегии",
  ];

  const pricingTiers = [
    {
      name: "Контент-план", price: "от 10 000 ₽/мес", desc: "База для самостоятельного ведения",
      features: ["20–30 тем и форматов", "Рубрикатор и матрица", "Календарь публикаций", "Рекомендации по визуалу"],
      highlighted: false,
    },
    {
      name: "План + Ведение", price: "от 20 000 ₽/мес", desc: "Мы пишем и публикуем за вас",
      features: ["Всё из «Контент-плана»", "Написание текстов", "Публикация (постинг)", "Ответы на комментарии", "Ежемесячный отчёт"],
      highlighted: true,
    },
    {
      name: "Контент + Реклама", price: "от 30 000 ₽/мес", desc: "Комплексный подход к продажам",
      features: ["Контент-план и ведение", "Создание рекламных креативов", "Связка постов с таргетом", "Аналитика воронки"],
      highlighted: false,
    },
  ];

  return (
    <Layout
      title="Контент-план и SMM-стратегия | CentrLP"
      description="Разработка контент-плана для соцсетей. Посты, сторис, Reels, сценарии и визуал. Продвижение ВКонтакте, Telegram и Instagram*."
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Контент, который продаёт</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Не просто «33 поста», а <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
              система продаж
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Разрабатываем контент-планы для VK, Telegram и Instagram*. AI помогает анализировать тренды, а смыслы и воронки прописываем вручную. Ваш контент будет приносить заявки, а не только лайки.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button size="lg" onClick={scrollToForm}>
              Заказать контент-план
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToForm}>
              Разобрать мои соцсети
            </Button>
          </div>

          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#44B78B]" />
            Работаем с бизнесом в Тюмени и по России. Контент-планы на основе аналитики и нейросетей.
          </p>
        </div>
      </section>

      <ServiceImageBand slug="content-plan" alt="Контент-план — иллюстрация услуги CentrLP" />

      {/* ── Audience ─────────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Кому нужен"
        title="Кому нужен системный контент"
        description="Если вы устали вымучивать посты и хотите, чтобы соцсети работали на бизнес."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {audience.map((item) => (
            <BentoCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
          ))}
        </div>
      </BentoSection>

      {/* ── Pain Points ──────────────────────────────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="Проблема"
        title="Почему контент не работает"
        description="Типичные ошибки, которые убивают охваты и продажи."
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
              <h3 className="mb-2 text-lg font-bold text-slate-900 tracking-tight">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">{item.text}</p>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── What's Included ──────────────────────────────────────────── */}
      <BentoSection
        tone="tint"
        eyebrow="Состав работ"
        title="Что входит в контент-план"
        description="Не просто список тем, а полноценная стратегия коммуникации."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {included.map((item) => (
            <BentoCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
          ))}
        </div>
      </BentoSection>

      {/* ── AI Block ─────────────────────────────────────────────────── */}
      <BentoSection tone="white" eyebrow="Технологии">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="relative pl-4 border-l-[3px] border-[#0096D6] text-[28px] md:text-[34px] font-bold tracking-tight text-slate-900 mb-5">
              Как мы используем AI в работе
            </h2>
            <p className="pl-4 text-lg text-slate-600 leading-relaxed mb-8">
              Нейросети — это мощный ускоритель, но руль всегда в руках эксперта.
            </p>
            <ul className="space-y-3">
              {aiSteps.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-800 text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10">
                <Sparkles className="w-6 h-6 text-[#0096D6]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">AI-ассистент</h3>
                <p className="text-sm text-slate-500">Генерация идей</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl rounded-tl-none bg-slate-50 border border-slate-200 p-4 text-sm">
                <p className="font-semibold mb-1 text-[#0096D6]">Запрос</p>
                <p className="text-slate-600 leading-relaxed">
                  Придумай 5 идей для Reels для студии дизайна интерьера, чтобы привлечь заявки на ремонт.
                </p>
              </div>
              <div className="rounded-xl rounded-tr-none bg-gradient-to-br from-[#0096D6]/[0.04] to-[#44B78B]/[0.05] border border-[#0096D6]/20 p-4 text-sm">
                <p className="font-semibold mb-2 text-[#0096D6]">AI</p>
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex gap-2"><span className="text-[#44B78B]">•</span>«Топ-3 ошибки в планировке кухни, которые стоят дорого»</li>
                  <li className="flex gap-2"><span className="text-[#44B78B]">•</span>До/После: трансформация «бабушкиной» квартиры за 1 млн</li>
                  <li className="flex gap-2"><span className="text-[#44B78B]">•</span>Как сэкономить на материалах, но не на виде</li>
                  <li className="flex gap-2"><span className="text-[#44B78B]">•</span>…</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </BentoSection>

      {/* ── Trends ───────────────────────────────────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="Тренды 2026"
        title="Контент-план под тренды 2026"
        description="Что будет работать в соцсетях в ближайший год."
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

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Стоимость"
        title="Форматы работы"
        description="Прозрачные цены для Тюмени и региона."
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
              <div className="text-2xl font-bold bg-gradient-to-br from-[#0096D6] to-[#44B78B] bg-clip-text text-transparent mb-2">
                {tier.price}
              </div>
              <p className="text-sm text-slate-500 mb-6">{tier.desc}</p>
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
                {tier.highlighted ? "Выбрать" : "Заказать"}
              </Button>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mt-8">
          Цены ориентированы на Тюмень и регион. Финальная стоимость зависит от объёма работ и площадок.
        </p>
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

      {/* ── SEO Text ─────────────────────────────────────────────────── */}
      <section className="py-12 bg-slate-50/70">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-sm text-slate-500 leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-slate-700">Разработка контент-плана для соцсетей в Тюмени</h3>
            <p>
              Качественный <strong>контент-план для соцсетей</strong> — это не просто расписание постов, а стратегия коммуникации с вашей аудиторией. Мы предлагаем профессиональную <strong>разработку контент-плана под ключ</strong>, который превращает подписчиков в клиентов. Наш подход включает анализ ниши, создание рубрикатора и использование современных форматов: Reels, клипы, сторис.
            </p>
            <p>
              Мы создаём эффективный <strong>контент-план для ВКонтакте</strong>, Telegram и Instagram*, учитывая специфику каждой площадки. Для <strong>бизнеса в Тюмени</strong> мы предлагаем решения, адаптированные под локальный рынок. Грамотная <strong>контент-стратегия</strong> помогает выделиться среди конкурентов, повысить охваты и увеличить продажи без раздувания рекламного бюджета.
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
              Нужен контент, который продаёт?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Оставьте заявку. Мы проанализируем ваши соцсети и предложим стратегию контента.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default ContentPlan;
