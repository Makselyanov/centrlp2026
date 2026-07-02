import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { BentoSection } from "@/components/services/BentoSection";
import { BentoCard } from "@/components/services/BentoCard";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CheckCircle2, ArrowRight, Zap, Users, TrendingUp, Layout as LayoutIcon, Palette,
  FileText, Settings, Rocket, BarChart, Clock, CreditCard, MessageSquare, MapPin,
  Briefcase, Search, Target, Smartphone, MousePointer, Eye, ShieldCheck, PieChart,
  XCircle, Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFaqSchema, useAutoBreadcrumb } from "@/components/SeoSchemas";

export default function WebsiteDevelopment() {
  const faqItems = [
    { question: "Сколько стоит сайт под ключ в Тюмени?", answer: "Первый запуск начинается от 45 000 ₽. В эту стоимость входит структура страницы, тексты, базовая SEO-подготовка, форма заявки, подключение Метрики и проверка перед публикацией. Итоговая цена зависит от количества страниц, интеграций, личного кабинета, CRM и рекламной подготовки." },
    { question: "Что лучше выбрать: лендинг или многостраничный сайт?", answer: "Лендинг подходит для одной услуги, акции или быстрого запуска рекламы. Многостраничный сайт лучше, если у компании несколько направлений, нужны отдельные страницы под услуги, SEO и доверие перед первым обращением." },
    { question: "Почему вы используете AI, это не ухудшает качество?", answer: "Наоборот. AI позволяет нам проанализировать объемы данных, на которые у человека ушли бы недели (конкуренты, отзывы, тренды). Мы тратим время на стратегию, а не на рутину." },
    { question: "Как быстро окупятся вложения в сайт?", answer: "При запуске рекламы первые заявки идут уже на 3-5 день. Средняя окупаемость наших проектов — 1-2 месяца." },
    { question: "Что если сайт не будет приносить заявки?", answer: "Мы работаем по KPI. Если конверсия ниже плановой, мы бесплатно докручиваем офферы и структуру, пока не выйдем на целевые показатели." },
    { question: "Нужно ли мне разбираться в программировании?", answer: "Нет. Мы сдаем полностью готовый инструмент. Вы сможете менять цены и тексты через простую админку, как в Word." },
    { question: "Вы настраиваете рекламу?", answer: "Да, мы агентство полного цикла. Сайт без трафика бесполезен, поэтому мы предлагаем комплексное продвижение (Яндекс, ВК, Telegram)." },
    { question: "Можно ли оплатить в рассрочку?", answer: "Да, для юрлиц есть рассрочка от банка-партнера или поэтапная оплата (30/40/30)." },
    { question: "Работаете ли вы по бартеру?", answer: "Да, мы открыты к сотрудничеству. Если у вас качественный продукт/услуга, мы готовы обсудить частичный или полный бартер." },
  ];
  useFaqSchema(faqItems);
  useAutoBreadcrumb("Разработка сайта");

  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const audience = [
    { icon: MapPin, title: "Локальный бизнес", text: "Клиенты уходят к конкурентам, потому что вас не находят. Решение: SEO-оптимизированная структура под гео-запросы." },
    { icon: Rocket, title: "Стартапы и новые ниши", text: "Нужно протестировать гипотезу быстро и дешево. Решение: MVP-сайт за 7 дней с готовыми офферами от AI." },
    { icon: Zap, title: "Действующий бизнес", text: "Заявки дорогие, сайт не конвертит. Решение: пересборка смыслов и внедрение квизов и лид-магнитов." },
  ];

  const localBuyingSignals = [
    {
      title: "Лендинг под услугу",
      price: "от 45 000 ₽",
      text: "Одна посадочная страница для рекламы, сезонного спроса или проверки нового оффера.",
      points: ["первый экран и CTA", "форма заявки", "Метрика и цели"],
    },
    {
      title: "Сайт услуг",
      price: "от 70 000 ₽",
      text: "Структура под несколько направлений, локальные запросы и доверие перед обращением.",
      points: ["страницы услуг", "SEO-основа", "контакты и NAP"],
    },
    {
      title: "Сайт + CRM",
      price: "от 100 000 ₽",
      text: "Когда заявки нужно не только получать, но и передавать в отдел продаж без потерь.",
      points: ["CRM-интеграция", "статусы лидов", "сквозная аналитика"],
    },
  ];

  const painPoints = [
    { text: "Заявки слишком дорогие (CPL > 1000₽) — бюджет сливается впустую", icon: CreditCard },
    { text: "Нет сквозной аналитики — непонятно, какой канал приносит деньги", icon: PieChart },
    { text: "Сайт сделан «на глаз» — без анализа конкурентов и болей аудитории", icon: Eye },
    { text: "Низкая конверсия (< 1%) — посетители заходят, но не оставляют контакты", icon: MousePointer },
    { text: "Нет автоматизации — менеджеры теряют заявки или перезванивают поздно", icon: Clock },
    { text: "Сложно масштабироваться — платформа не позволяет быстро внедрять воронки", icon: Rocket },
  ];

  const process = [
    { step: "01", title: "AI-аналитика ниши", text: "Нейросети анализируют 50+ сайтов конкурентов, выделяют их слабые места и формируют список болей вашей ЦА." },
    { step: "02", title: "Проектирование смыслов", text: "Создаём структуру не «для красоты», а для продаж. Каждый блок закрывает конкретное возражение клиента." },
    { step: "03", title: "Дизайн и сборка", text: "Используем современные UI-паттерны, привычные пользователям. Адаптив под мобильные — приоритет №1." },
    { step: "04", title: "Продающий контент", text: "Пишем тексты с помощью AI и редакторов. Заголовки по 4U, офферы, которые бьют точно в цель." },
    { step: "05", title: "Техническая настройка", text: "Подключаем CRM, аналитику, пиксели соцсетей. Настраиваем цели, чтобы видеть стоимость каждой заявки." },
    { step: "06", title: "Тесты и запуск", text: "Проверяем скорость загрузки, работу форм и сценарии поведения. Запускаем трафик только на готовый продукт." },
  ];

  const ecosystem = [
    { icon: Rocket, title: "MVP для проверки ниши", text: "Быстро выйти на рынок, собрать первые заявки и проверить гипотезу без тяжёлой разработки.", href: "/services/mvp-development", cta: "Запустить MVP" },
    { icon: Smartphone, title: "Telegram Mini App", text: "Когда сайту нужен более удобный сценарий: запись, бронирование, кабинет клиента в мессенджере.", href: "/services/telegram-mini-app", cta: "Смотреть Mini App" },
    { icon: Settings, title: "CRM и кабинет", text: "Когда заявок много и нужен свой интерфейс для менеджеров, контроля статусов и повторных продаж.", href: "/services/custom-crm", cta: "Нужна CRM" },
    { icon: MessageSquare, title: "AI-агент для заявок", text: "Автоматически отвечать, квалифицировать лидов, собирать данные и разгружать отдел продаж.", href: "/services/ai-agents", cta: "Подключить AI" },
  ];

  const results = [
    { title: "Прогнозируемый поток заявок", text: "Понятная стоимость лида (CPL)" },
    { title: "Полная прозрачность", text: "Дашборды с метриками, а не «ощущения»" },
    { title: "Рост конверсии в 1.5–2 раза", text: "За счёт точечной работы со смыслами" },
    { title: "Автоматизация рутины", text: "Заявки сразу попадают в CRM" },
    { title: "Готовность к масштабированию", text: "Легко добавлять новые страницы и офферы" },
    { title: "Независимость от разработчиков", text: "Вы сами можете менять цены и тексты" },
  ];

  const pricingTiers = [
    {
      name: "Базовый", price: "от 45 000 ₽", period: "10–14 дней",
      features: ["Сайт на 5 блоков", "Анализ 10 конкурентов", "Базовая SEO-оптимизация", "Подключение метрики"],
      highlighted: false,
    },
    {
      name: "Бизнес", price: "от 70 000 ₽", period: "14–21 день",
      features: ["Глубокий AI-анализ ниши", "Проработка воронок продаж", "Квиз + лид-магнит", "Интеграция с CRM", "Копирайтинг (AI + редактор)", "A/B тесты офферов"],
      highlighted: true,
    },
    {
      name: "Экосистема", price: "от 100 000 ₽", period: "21–30 дней",
      features: ["Многостраничный сайт", "Сложные интеграции (API)", "Чат-бот автоворонка", "Сквозная аналитика", "Настройка рекламы (тест)", "Сопровождение 1 месяц"],
      highlighted: false,
    },
  ];

  const whyUs = [
    { icon: Briefcase, title: "Фокус на LTV и ROI", text: "Не «красивые картинки», а понятная экономика проекта." },
    { icon: Zap, title: "AI снижает стоимость", text: "Технологии уменьшают стоимость разработки на 30%." },
    { icon: MapPin, title: "Знаем Тюмень", text: "Специфика регионального рынка и локальных запросов." },
    { icon: Settings, title: "Единая система", text: "Сайт + CRM + реклама работают в связке." },
    { icon: FileText, title: "Гарантия сроков", text: "Юридическая гарантия соблюдения сроков и результата." },
    { icon: CreditCard, title: "Гибкая оплата", text: "Рассрочка, поэтапная оплата и бартер." },
  ];

  return (
    <Layout
      title="Создание сайта под ключ в Тюмени — лендинг, сайт услуг, CRM | CentrLP"
      description="Создание сайта под ключ в Тюмени: лендинг, сайт услуг, MVP или интерфейс продаж. Дизайн, тексты, формы заявок, CRM, аналитика, SEO-основа и запуск."
    >
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#0096D6]/[0.04] to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#0096D6]/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#44B78B]/10 blur-3xl" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-24 right-[8%] text-[#0096D6]/20 hidden md:block"
          >
            <LayoutIcon className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-36 left-[8%] text-[#44B78B]/20 hidden md:block"
          >
            <BarChart className="w-12 h-12" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[#0096D6] text-xs font-semibold uppercase tracking-wider shadow-sm mb-8">
              <Zap className="w-3.5 h-3.5 text-[#44B78B]" />
              <span>Сайты, MVP и digital-продукты</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Сайт как <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">интерфейс продаж</span>,<br />а не просто страница
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Проектируем продающие сайты, MVP и клиентские интерфейсы: с формами заявок, квизами, CRM, аналитикой и возможностью расширить проект до Telegram Mini App, AI-агента или внутреннего сервиса.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {["Нет заявок и воронки", "Нужно быстро протестировать продукт", "Заявки теряются без CRM"].map((point) => (
                <div key={point} className="rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm text-slate-700 shadow-sm">
                  {point}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={scrollToForm}>
                Оставить заявку <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
                Как мы работаем
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceImageBand slug="website-development" alt="Разработка сайта — иллюстрация услуги CentrLP" />

      {/* ── Audience ─────────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Для кого"
        title="Для кого эта услуга"
        description="Три типовых сценария, когда сайт становится точкой роста бизнеса."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {audience.map((item) => (
            <BentoCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
          ))}
        </div>
      </BentoSection>

      <BentoSection
        tone="slate"
        eyebrow="Что заказать"
        title="Создание сайта в Тюмени под разные сценарии"
        description="Помогаем выбрать формат без лишней разработки: от быстрой посадочной страницы до сайта с CRM и аналитикой."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {localBuyingSignals.map((item) => (
            <div key={item.title} className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0096D6]">{item.price}</div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mb-5 text-[15px] leading-relaxed text-slate-600">{item.text}</p>
              <ul className="space-y-2.5">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#44B78B]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── Pain Points ──────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Проблема"
        title="Типичные проблемы, которые мы решаем"
        description="Что на практике мешает сайту приносить прогнозируемые заявки."
      >
        <div className="grid md:grid-cols-2 gap-5">
          {painPoints.map((pain) => (
            <div
              key={pain.text}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <pain.icon className="w-5 h-5" />
              </div>
              <p className="text-[15px] text-slate-700 leading-relaxed pt-1">{pain.text}</p>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <BentoSection
        id="process"
        tone="tint"
        eyebrow="Процесс"
        title="Как мы создаём сайт"
        description="Шесть этапов от AI-аналитики ниши до запуска трафика на готовый продукт."
      >
        <ProcessTimeline steps={process} />
      </BentoSection>

      {/* ── Ecosystem ────────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Экосистема"
        title="Когда нужен не просто сайт, а продуктовая система"
        description="Сильный сайт часто становится первым слоем. Дальше мы разворачиваем MVP, мини-приложение, CRM или AI-агента, чтобы путь от клика до сделки был короче."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {ecosystem.map((item) => (
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

      {/* ── Results ──────────────────────────────────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="Результат"
        title="Что вы получите в итоге"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((result) => (
            <div
              key={result.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10">
                <CheckCircle2 className="w-5 h-5 text-[#44B78B]" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-slate-900">{result.title}</h3>
              <p className="text-sm text-slate-600">{result.text}</p>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── Case Study ───────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Мини-кейс"
        title="Было / Стало: клининг в Тюмени"
        description="Как мы превратили «визитку» в работающую систему заявок — сайт + CRM + квизы + реклама."
      >
        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Briefcase className="w-5 h-5 text-[#0096D6]" />
              Исходные данные
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Клиент", value: "Клининговая компания, 2 филиала: Тюмень и Ханты-Мансийск." },
                { label: "Ситуация", value: "Старый сайт на конструкторе, сделанный «для галочки»." },
                { label: "Каналы продаж", value: "Сарафанка, немного соцсетей, случайные заявки с сайта." },
                { label: "Задача", value: "Увеличить кол-во заявок, разделить по городам, упаковать как сервис, защита ПД." },
              ].map((item) => (
                <li key={item.label}>
                  <span className="block text-sm font-semibold text-slate-800">{item.label}</span>
                  <span className="block text-sm text-slate-600 leading-relaxed">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-white to-red-50/40 p-7 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
              <XCircle className="w-5 h-5 text-red-500" />
              Что было не так
            </h3>
            <ul className="space-y-3">
              {[
                "Нет выбора филиала. Клиенты путались в телефонах и ценах.",
                "Услуги перемешаны. Нет разделения по зонам (кухня, спальня).",
                "Текст «про компанию», а не про боли клиента.",
                "Нет живой команды. Выглядит как фирма-однодневка.",
                "Цены непрозрачные. Нужно звонить и уточнять.",
                "Нет квизов — заявки сваливались в одну кучу.",
                "Риски штрафов: нет согласия на ПД и HTTPS.",
                "Слабая SEO-основа под запросы «уборка Тюмень».",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#44B78B]/30 bg-gradient-to-br from-white to-[#44B78B]/[0.06] p-7 shadow-sm">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
              <CheckCircle2 className="w-5 h-5 text-[#44B78B]" />
              Что сделали мы
            </h3>
            <div className="space-y-5">
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0096D6]">Упаковка сайта</h4>
                <ul className="space-y-2">
                  {[
                    "Селектор города с подменой контактов.",
                    "Интерактивный выбор услуг по комнатам.",
                    "Блок «Наша команда» с фото и FAQ.",
                    "HTTPS, политика, чекбоксы согласия.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 text-[#44B78B]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0096D6]">Маркетинг</h4>
                <ul className="space-y-2">
                  {[
                    "2 квиза: на уборку и мойку окон.",
                    "Контент-стратегия + реклама ВК.",
                    "Упаковка Яндекс Бизнес и 2ГИС.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 text-[#44B78B]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-[#0096D6]/[0.03] to-[#44B78B]/[0.04] p-8 text-center shadow-sm">
          <h3 className="mb-3 text-xl font-bold text-slate-900">Результат для клиента</h3>
          <p className="mx-auto max-w-3xl text-slate-600 leading-relaxed mb-6">
            Появился понятный путь клиента: выбрал город → посмотрел услуги по комнатам → прошёл квиз → оставил заявку. Компания выглядит как сервис с командой и лицами. Сайт полностью соответствует требованиям Роскомнадзора.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {["Рост конверсии", "Защита от штрафов", "Прозрачная аналитика"].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </BentoSection>

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="Стоимость"
        title="Форматы сотрудничества"
        description="Три тарифа под разные задачи — от лендинга до продуктовой экосистемы."
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
                  Популярный
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold bg-gradient-to-br from-[#0096D6] to-[#44B78B] bg-clip-text text-transparent mb-1">
                {tier.price}
              </div>
              <p className="text-sm text-slate-500 mb-6">Срок: {tier.period}</p>
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
                Выбрать пакет
              </Button>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── Why Us ───────────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Почему CentrLP"
        title="Шесть причин работать с нами"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map((item) => (
            <BentoCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
          ))}
        </div>
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

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="form" className="py-14 md:py-20 bg-gradient-to-b from-white via-[#44B78B]/[0.04] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-[28px] md:text-[34px] font-bold tracking-tight text-slate-900 mb-4">
              Готовы запустить сайт, который работает?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Оставьте заявку — разберём ваш проект, предложим решение и рассчитаем стоимость.
            </p>
          </div>
          <ContactForm />
          <div className="text-center mt-10">
            <p className="text-slate-500 text-sm mb-3">Или напишите напрямую</p>
            <Button asChild variant="outline">
              <Link to="/contacts">
                Контакты и мессенджеры <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
