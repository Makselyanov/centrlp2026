import { Layout } from "@/components/Layout";
import { useAutoBreadcrumb } from "@/components/SeoSchemas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { servicePriceByHref } from "@/data/pricing";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  BriefcaseBusiness,
  Chrome,
  Compass,
  Cpu,
  FileText,
  Globe,
  Languages,
  LineChart,
  Megaphone,
  MessageSquare,
  Palette,
  Rocket,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

type ServiceCard = {
  title: string;
  description: string;
  href: string;
  bullets: string[];
  icon: LucideIcon;
  featured?: boolean;
  badge?: string;
};

const PriceBadge = ({ href }: { href: string }) => {
  const price = servicePriceByHref[href];

  if (!price) {
    return null;
  }

  return (
    <div className="mb-5 rounded-2xl border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-3">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b7cb0]">
        Ориентир стоимости
      </div>
      <div className="text-lg font-bold text-slate-900">{price.price}</div>
      {price.note && <div className="mt-1 text-xs leading-5 text-slate-500">{price.note}</div>}
    </div>
  );
};

const productServices: ServiceCard[] = [
  {
    title: "Telegram Mini App",
    description: "Интерфейс продаж, заявок, записи, бронирования и личного кабинета прямо внутри Telegram.",
    href: "/services/telegram-mini-app",
    bullets: ["Заявки и запись", "Кабинет клиента", "Интеграция с CRM"],
    icon: MessageSquare,
    featured: true,
    badge: "Ядро направления",
  },
  {
    title: "Решения для Max",
    description: "Ранний вход в новый мессенджер с понятной моделью продаж, сервиса и проверки гипотез.",
    href: "/services/max-messenger",
    bullets: ["Новый канал продаж", "Пилоты и сценарии", "Подготовка к росту"],
    icon: Compass,
    featured: true,
    badge: "Ранний рынок",
  },
  {
    title: "Browser extensions",
    description: "Расширения для Chrome и Яндекс Браузера как рабочие инструменты команд продаж, маркетинга и HR.",
    href: "/services/browser-extensions",
    bullets: ["Контроль заявок", "Подсказки и чек-листы", "Сбор данных"],
    icon: Chrome,
  },
  {
    title: "MVP-разработка",
    description: "Быстрый запуск продукта, интерфейса или нового сценария продаж без лишнего масштаба.",
    href: "/services/mvp-development",
    bullets: ["Проверка гипотез", "Первый рабочий релиз", "Основа для роста"],
    icon: Rocket,
  },
  {
    title: "Персональная CRM",
    description: "CRM под ваш путь клиента, роли команды, внутренние этапы и автоматизацию.",
    href: "/services/custom-crm",
    bullets: ["Статусы и задачи", "Внутренние роли", "Прозрачность руководителю"],
    icon: BriefcaseBusiness,
    featured: true,
    badge: "Система данных",
  },
];

const aiServices: ServiceCard[] = [
  {
    title: "Telegram AI-агент для заявок",
    description: "AI-агент в Telegram, который принимает обращения, отвечает, квалифицирует лиды и передаёт их в CRM и сценарии команды.",
    href: "/services/telegram-lead-agent",
    bullets: ["Ответы 24/7", "Квалификация лида", "CRM + n8n + OpenClaw"],
    icon: MessageSquare,
    featured: true,
    badge: "Приоритет",
  },
  {
    title: "Telegram AI-консультант",
    description: "Telegram-консультант для записи, FAQ, сопровождения клиента, напоминаний и сервисных сценариев без ручной перегрузки команды.",
    href: "/services/telegram-service-agent",
    bullets: ["Запись и сопровождение", "FAQ и статусы", "CRM + n8n + OpenClaw"],
    icon: MessageSquare,
    featured: true,
    badge: "Сервис и удержание",
  },
  {
    title: "OpenClaw для бизнеса",
    description: "Self-hosted AI-агент в Telegram, CRM и внутренних процессах как собственный контур автоматизации.",
    href: "/services/openclaw-ai",
    bullets: ["Telegram и заявки", "OpenClaw + n8n", "Своя инфраструктура"],
    icon: Cpu,
    featured: true,
    badge: "Self-hosted AI",
  },
  {
    title: "n8n-автоматизация",
    description: "Связка заявок, CRM, Telegram, уведомлений и AI-сценариев в одной системе действий без ручной рутины.",
    href: "/services/n8n-automation",
    bullets: ["Workflow и маршруты", "CRM + Telegram", "OpenClaw + AI"],
    icon: Workflow,
    featured: true,
    badge: "Связующий слой",
  },
  {
    title: "AI-агенты",
    description: "Агенты для обработки заявок, ответов, классификации, внутренних действий и self-hosted сценариев на базе OpenClaw.",
    href: "/services/ai-agents",
    bullets: ["Входящий поток", "OpenClaw и self-hosted AI", "Внутренние действия"],
    icon: Bot,
  },
  {
    title: "AI-системы и нейросети",
    description: "Корпоративные ассистенты, база знаний, OpenClaw-стек, генерация контента и внутренние AI-модули.",
    href: "/services/ai-systems",
    bullets: ["База знаний", "OpenClaw + n8n", "Поиск и классификация"],
    icon: Brain,
    featured: true,
    badge: "AI-ядро",
  },
  {
    title: "Чат-бот ВК и сайт",
    description: "Сценарии для консультации, заявок и первичной квалификации клиентов в текущих каналах бизнеса.",
    href: "/services/chatbot-vk",
    bullets: ["Квалификация", "Ответы 24/7", "Передача лида"],
    icon: MessageSquare,
  },
  {
    title: "Автоответы и help-сценарии",
    description: "Ускоряем ответы клиентам и снимаем нагрузку с команды в повторяющихся сценариях.",
    href: "/services/auto-responses",
    bullets: ["FAQ", "Запись и напоминания", "Разгрузка команды"],
    icon: Workflow,
  },
];

const growthServices: ServiceCard[] = [
  {
    title: "Экспресс-разбор заявок",
    description: "За 48 часов проверяем сайт, форму, предложение, Метрику и путь обращения, чтобы найти причины потери заявок.",
    href: "/proverka-saita-i-zayavok-za-48-chasov",
    bullets: ["Первый экран и кнопки", "Форма и маршрут заявки", "5-7 быстрых правок"],
    icon: ScanSearch,
    featured: true,
    badge: "Быстрый вход",
  },
  {
    title: "Сайт под ключ",
    description: "Многостраничный сайт для продаж, SEO и вывода цифрового продукта в нормальный коммерческий контур.",
    href: "/services/website-development",
    bullets: ["Структура под конверсию", "SEO-основа", "Формы и аналитика"],
    icon: Globe,
  },
  {
    title: "Яндекс.Директ",
    description: "Быстрый запуск трафика, тесты спроса и усиление новых продуктовых сценариев за счёт платного канала.",
    href: "/services/yandex-direct",
    bullets: ["Поиск и РСЯ", "Тесты спроса", "Оптимизация CPL"],
    icon: LineChart,
  },
  {
    title: "Реклама на Авито",
    description: "Запуск Авито как канала заявок: профиль, объявления, платное продвижение, ответы и аналитика.",
    href: "/services/avito-ads",
    bullets: ["Профиль и объявления", "Платное продвижение", "Контроль обращений"],
    icon: Megaphone,
    featured: true,
    badge: "Новая услуга",
  },
  {
    title: "Маркетинговая стратегия",
    description: "Позиционирование, офферы, карта гипотез и понимание, как digital-продукт должен зарабатывать.",
    href: "/services/marketing-strategy",
    bullets: ["Позиционирование", "Сегменты и офферы", "Гипотезы роста"],
    icon: Target,
  },
  {
    title: "Веб-аналитика",
    description: "Связываем заявки, этапы, статусы и каналы в прозрачную аналитику для продукта и команды.",
    href: "/services/web-analytics",
    bullets: ["Цели и события", "Сквозная логика", "Управленческие метрики"],
    icon: ScanSearch,
  },
  {
    title: "Проверка сайта по персональным данным",
    description: "Проверяем сайт, домен, формы, публичные тексты и цифровой контур под новые требования 2026 и помогаем быстро внедрить правки без хаоса.",
    href: "/services/compliance-2026",
    bullets: ["Домен и регистратор", "Персональные данные", "Публичные тексты и интерфейсы"],
    icon: ShieldCheck,
    featured: true,
    badge: "Новая услуга",
  },
];

const packagingServices: ServiceCard[] = [
  {
    title: "Дизайн и прототипирование",
    description: "Продумываем экранную логику и интерфейс под бизнес-задачу, а не только под визуальный эффект.",
    href: "/services/design-prototyping",
    bullets: ["UX-логика", "Прототипы", "Сценарии пользователя"],
    icon: Palette,
  },
  {
    title: "Фирменный стиль и брендинг",
    description: "Собираем визуальную систему бренда для сайта, продукта, мессенджеров и материалов команды.",
    href: "/services/branding",
    bullets: ["Логотип", "Цвет и типографика", "Гайдлайн"],
    icon: Sparkles,
  },
  {
    title: "Нейминг и офферы",
    description: "Помогаем назвать продукт, сформулировать предложение и усилить продажу на уровне смыслов.",
    href: "/services/naming-offers",
    bullets: ["Нейминг", "УТП", "Офферы по сегментам"],
    icon: FileText,
  },
  {
    title: "Контент и упаковка",
    description: "Тексты, сценарии, контент-план и продающие материалы для запуска нового продукта или сервиса.",
    href: "/services/copywriting-texts",
    bullets: ["Тексты страниц", "Контент-опоры", "Запусковые материалы"],
    icon: Workflow,
  },
];

const industrySolutions: ServiceCard[] = [
  {
    title: "AI-консьерж для турагентов",
    description: "Сопровождение туриста, документы, напоминания, допродажи и ответы в VK, Telegram и MAX как готовый отраслевой сценарий, а не просто бот ради галочки.",
    href: "/ai-turagent",
    bullets: ["Туристический сервис 24/7", "Документы и напоминания", "Допродажи и маршрут клиента"],
    icon: Compass,
    featured: true,
    badge: "Нишевая сборка",
  },
  {
    title: "Для мебельщиков",
    description: "Отраслевой контур вокруг сайта, заявок, каталогов, визуальной упаковки и бартерного формата для мебельного бизнеса.",
    href: "/barter/furniture",
    bullets: ["Упаковка и лиды", "Каталог и заявки", "Сценарии под мебельный бизнес"],
    icon: Palette,
  },
  {
    title: "Для СТО и детейлинга",
    description: "Заявки, запись, сервисные ответы, рекламный трафик и маршруты клиента под сервисный автомобильный бизнес.",
    href: "/barter/sto",
    bullets: ["Запись и заявки", "Сервисные сценарии", "Рост через сайт и рекламу"],
    icon: Target,
  },
  {
    title: "Для клининга",
    description: "Быстрая обработка обращений, расчёт, ответы и маршрут заявки для услуг, где важны скорость и понятный сервис.",
    href: "/barter/cleaning",
    bullets: ["Отклик без задержки", "Сценарии расчёта", "Повторные обращения и удержание"],
    icon: Workflow,
  },
];

const renderGroup = (title: string, description: string, cards: ServiceCard[]) => (
  <section className="bg-card py-20" key={title}>
    <div className="container mx-auto px-4">
      <div className="mb-12 max-w-3xl">
        <h2 className="mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {cards.map((item) => (
          <Card
            key={item.href}
            className={`group relative flex h-full flex-col overflow-hidden p-8 transition-all duration-300 ${
              item.featured
                ? "border-[#0096D6]/20 bg-gradient-to-br from-white via-[#0096D6]/[0.045] to-[#44B78B]/[0.035] shadow-[0_22px_80px_-38px_rgba(0,150,214,0.42)]"
                : "bg-white shadow-card"
            }`}
          >
            {item.featured && (
              <>
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#0096D6]/60 to-transparent" />
                {item.badge && (
                  <div className="mb-5 inline-flex w-fit rounded-full border border-[#0096D6]/15 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0096D6] shadow-sm">
                    {item.badge}
                  </div>
                )}
              </>
            )}
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
                item.featured ? "bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)] text-white shadow-sm" : "text-primary"
              }`}
            >
              <item.icon className="h-12 w-12" />
            </div>
            <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
            <p className="mb-6 text-muted-foreground">{item.description}</p>
            <PriceBadge href={item.href} />
            <ul className="mb-8 flex-1 space-y-3">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start">
                  <Sparkles className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-accent-2" />
                  <span className="text-sm">{bullet}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" asChild>
              <Link to={item.href}>Подробнее</Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const heroHighlights = [
  "Mini App и личные кабинеты",
  "OpenClaw, n8n и AI-агенты",
  "CRM, сайты и аналитика",
];

const visualSystemCards = [
  {
    title: "Продуктовый стек",
    image: "/images/services/services-product-stack.svg",
    alt: "Архитектура цифрового продукта: канал, AI, CRM, аналитика и автоматизация",
    text: "Показываем не набор отдельных услуг, а рабочую связку: точка входа клиента, AI-логика, CRM, аналитика и автоматизация действий команды.",
    points: ["Telegram, Max, сайт или Mini App", "AI-агент и сценарии", "CRM, n8n и аналитика"],
  },
  {
    title: "Готовые сборки запуска",
    image: "/images/services/services-launch-bundles.svg",
    alt: "Три формата запуска цифровой системы: пилот, MVP и полноценная система",
    text: "Можно начать с маленького пилота, собрать MVP под одну задачу или сразу строить полноценную систему под входящие заявки и сервис.",
    points: ["пилот на 1 гипотезу", "MVP под задачу бизнеса", "масштабируемая система"],
  },
  {
    title: "Нишевые сценарии",
    image: "/images/services/services-industry-map.svg",
    alt: "Карта нишевых сценариев для турагентств, СТО, мебели, клининга и сервисных компаний",
    text: "Для разных ниш нужны разные маршруты клиента. Поэтому мы собираем не универсальный шаблон, а сценарий под конкретный рынок и тип заявки.",
    points: ["турагентства", "СТО и сервис", "мебель, клининг, обучение"],
  },
];

const systemBlueprint = [
  {
    title: "Канал и интерфейс",
    text: "Клиент заходит через Telegram, Max, Mini App или другой мессенджерный сценарий и получает понятную точку входа без лишних переходов.",
    points: ["Telegram Mini App", "Max как ранний рынок", "Кабинет, запись, заявки"],
    href: "/services/telegram-mini-app",
    icon: MessageSquare,
  },
  {
    title: "AI на первом касании",
    text: "AI-агент или AI-консультант принимает обращение, отвечает, квалифицирует запрос и держит сервисный диалог в рабочем тоне.",
    points: ["Лиды и первичный intake", "FAQ и сопровождение", "Эскалация человеку"],
    href: "/services/telegram-lead-agent",
    icon: Bot,
  },
  {
    title: "Оркестрация действий",
    text: "После сообщения не просто уходит уведомление, а запускается реальный маршрут: CRM, напоминания, задачи, follow-up и внутренние действия команды.",
    points: ["n8n-маршруты", "Статусы и уведомления", "Связка каналов и ролей"],
    href: "/services/n8n-automation",
    icon: Workflow,
  },
  {
    title: "Своя AI-логика",
    text: "Если нужен self-hosted контур, OpenClaw становится AI-ядром, которое помогает отвечать, искать, принимать промежуточные решения и действовать внутри системы.",
    points: ["OpenClaw", "Self-hosted сценарии", "База знаний и действия"],
    href: "/services/openclaw-ai",
    icon: Cpu,
  },
  {
    title: "CRM и рост",
    text: "Всё это связывается с CRM, аналитикой, сайтом и рекламой, чтобы система не жила отдельно, а приводила к заявкам, сервису и управляемому росту.",
    points: ["Персональная CRM", "Сайт и аналитика", "Яндекс.Директ и рост"],
    href: "/services/custom-crm",
    icon: BriefcaseBusiness,
  },
];

const solutionStacks = [
  {
    title: "Заявки и первая квалификация",
    subtitle: "Telegram + AI + CRM",
    text: "Когда бизнесу нужно быстро принимать входящие обращения, отвечать без пауз и не терять лиды между мессенджером и отделом продаж.",
    steps: ["Telegram или Max как точка входа", "AI-агент квалифицирует и задаёт вопросы", "CRM получает лида, статус и следующее действие"],
    links: [
      { label: "Telegram AI-агент для заявок", href: "/services/telegram-lead-agent" },
      { label: "Персональная CRM", href: "/services/custom-crm" },
    ],
  },
  {
    title: "Запись, сопровождение и сервис",
    subtitle: "Telegram + Max + n8n",
    text: "Когда важно не просто продать, а дальше вести клиента: запись, напоминания, статусы, ответы на частые вопросы и передача сложных кейсов в команду.",
    steps: ["Клиент общается в Telegram или Max", "n8n запускает маршруты уведомлений и действий", "AI-консультант держит сервисный диалог и разгружает команду"],
    links: [
      { label: "Telegram AI-консультант", href: "/services/telegram-service-agent" },
      { label: "n8n-автоматизация", href: "/services/n8n-automation" },
    ],
  },
  {
    title: "Свой AI-контур под процессы бизнеса",
    subtitle: "OpenClaw + n8n + CRM",
    text: "Когда нужен не внешний чат-бот, а собственный self-hosted слой, который помогает внутри компании, управляет знаниями и участвует в рабочих действиях.",
    steps: ["OpenClaw становится AI-ядром", "n8n связывает сценарии и роли команды", "CRM, заявки и внутренние сервисы работают как одна система"],
    links: [
      { label: "OpenClaw для бизнеса", href: "/services/openclaw-ai" },
      { label: "AI-системы и нейросети", href: "/services/ai-systems" },
    ],
  },
];

const businessProfiles = [
  {
    eyebrow: "Сервис и услуги",
    title: "Клиент пишет, записывается и получает сопровождение без ручного хаоса",
    text: "Подходит студиям, агентствам, клиникам, салонам, сервисным компаниям и любому бизнесу, где много входящих обращений, запись, статусы и повторные касания.",
    bullets: ["Telegram или Max как точка входа", "AI-консультант для записи и FAQ", "CRM + n8n для маршрутов и уведомлений"],
    links: [
      { label: "Telegram AI-консультант", href: "/services/telegram-service-agent" },
      { label: "n8n-автоматизация", href: "/services/n8n-automation" },
    ],
  },
  {
    eyebrow: "Обучение и экспертный бизнес",
    title: "Воронка в мессенджере, кабинет, заявки и прогрев в одном контуре",
    text: "Подходит курсам, наставникам, клубам, образовательным продуктам и экспертным командам, которым нужен путь от первого касания до оплаты, доступа и удержания.",
    bullets: ["Mini App или мессенджерный кабинет", "AI-агент принимает заявки и отвечает", "CRM фиксирует этапы, оплаты и вовлечение"],
    links: [
      { label: "Telegram Mini App", href: "/services/telegram-mini-app" },
      { label: "Telegram AI-агент для заявок", href: "/services/telegram-lead-agent" },
    ],
  },
  {
    eyebrow: "Внутренний контур компании",
    title: "Своя AI-логика для команды, базы знаний и рабочих действий",
    text: "Подходит компаниям, где нужен не только внешний канал, но и внутренний AI-слой: помощь менеджерам, маршруты задач, классификация, доступ к знаниям и self-hosted контроль.",
    bullets: ["OpenClaw как своё AI-ядро", "n8n связывает роли, задачи и уведомления", "CRM и внутренние процессы живут в одной системе"],
    links: [
      { label: "OpenClaw для бизнеса", href: "/services/openclaw-ai" },
      { label: "AI-системы и нейросети", href: "/services/ai-systems" },
    ],
  },
];

const launchFormats = [
  {
    eyebrow: "Пилот",
    title: "Быстрый тест одной гипотезы",
    text: "Если нужно не строить всё сразу, а быстро проверить рабочий сценарий: входящий поток, запись, сервисный диалог или новый канал вроде Max.",
    bullets: ["1 задача и 1 сценарий", "Минимум интерфейса, максимум проверки пользы", "Понятная метрика результата за короткий цикл"],
  },
  {
    eyebrow: "MVP",
    title: "Первый рабочий продукт под рынок",
    text: "Когда уже нужен не просто тест, а реальный рабочий контур: мессенджер, кабинет, CRM-логика, AI, маршруты и первые регулярные процессы команды.",
    bullets: ["Клиентский путь от входа до целевого действия", "Связка Mini App, AI, CRM и автоматизации", "Основа для дальнейшего роста без переписывания с нуля"],
  },
  {
    eyebrow: "Система",
    title: "Полноценная цифровая связка бизнеса",
    text: "Когда вы уже понимаете ценность сценария и хотите собрать устойчивую систему: внешний канал, self-hosted AI, роли команды, аналитика, реклама и управляемый рост.",
    bullets: ["Несколько каналов и ролей в одном контуре", "OpenClaw, n8n, CRM, сайт и аналитика", "Архитектура не под хайп, а под долгую работу бизнеса"],
  },
];

const complianceSignals = [
  {
    title: "Домен и административный контур",
    text: "Проверяем регистратора, администратора домена, доступы и порядок действий, чтобы рабочий сайт не становился заложником хаоса в последний момент.",
    icon: Globe,
  },
  {
    title: "Персональные данные и маршрут заявки",
    text: "Смотрим, где сайт, формы, CRM, аналитика и мессенджеры собирают данные клиента, и помогаем привести цифровой маршрут в более чистую и понятную схему.",
    icon: ShieldCheck,
  },
  {
    title: "Публичные тексты и интерфейсы",
    text: "Проверяем карточки услуг, заголовки, CTA, страницы и интерфейсные формулировки, чтобы сайт выглядел сильнее и аккуратнее с точки зрения новых требований.",
    icon: Languages,
  },
];

const Services = () => {
  useAutoBreadcrumb("Услуги");

  return (
    <Layout
      title="Услуги CentrLP — Mini App, AI, CRM, сайты и запуск | Тюмень"
      description="Услуги CentrLP: Telegram Mini App, AI-агенты, OpenClaw, n8n, CRM, сайты, Яндекс.Директ, аналитика и упаковка цифровых продуктов для бизнеса."
    >
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#0096D6]/[0.06] to-white pb-20 pt-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-12 top-16 h-48 w-48 rounded-full bg-[#0096D6]/15 blur-3xl"
            animate={{ x: [0, 24, 0], y: [0, 12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 top-10 h-64 w-64 rounded-full bg-[#44B78B]/12 blur-3xl"
            animate={{ x: [0, -28, 0], y: [0, 18, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#0096D6]/8 blur-3xl"
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/15 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Sparkles className="h-4 w-4 text-[#0096D6]" />
              Цифровые продукты, AI и рост в одном контуре
            </motion.div>
            <motion.h1
              className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
            >
              <span className="bg-[linear-gradient(135deg,#007DB3_0%,#0096D6_38%,#44B78B_100%)] bg-clip-text text-transparent">
              Услуги CentrLP
              </span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-3xl text-lg leading-8 text-slate-600 md:text-xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              Запускаем современные цифровые продукты для бизнеса: клиентские интерфейсы,
              AI-системы, CRM, внутренние инструменты команды и рост через сайт, трафик и аналитику.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              {heroHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-10 h-52 w-52 rounded-full bg-[#0096D6]/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#44B78B]/10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/15 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
              <Workflow className="h-4 w-4 text-[#0096D6]" />
              Услуги как собираемая архитектура бизнеса
            </div>
            <h2 className="mb-4 bg-[linear-gradient(135deg,#007DB3_0%,#0096D6_38%,#44B78B_100%)] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              Не просто список работ, а система: канал, AI, CRM, автоматизация и рост
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
              Так быстрее понять, что именно заказывать: отдельную страницу, AI-оператора, Mini App, CRM или связку,
              где каждый блок усиливает следующий.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {visualSystemCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Card className="h-full overflow-hidden rounded-[30px] border border-white/70 bg-white/90 shadow-[0_22px_80px_-38px_rgba(0,150,214,0.34)]">
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-100 bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                    <p className="mb-5 text-base leading-7 text-slate-600">{item.text}</p>
                    <div className="space-y-3">
                      {item.points.map((point) => (
                        <div key={point} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                          <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#44B78B]" />
                          <span className="text-sm leading-6 text-slate-700">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4">Готовые сборки под задачу бизнеса</h2>
            <p className="text-lg text-muted-foreground">
              Если смотреть не на технологии по отдельности, а на результат для бизнеса, то обычно мы собираем не “чат-бот” или
              “CRM”, а готовый рабочий контур под конкретную задачу.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {solutionStacks.map((stack) => (
              <Card key={stack.title} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-4 inline-flex w-fit rounded-full border border-[#0096D6]/15 bg-[#0096D6]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0096D6]">
                  {stack.subtitle}
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">{stack.title}</h3>
                <p className="mb-6 text-muted-foreground">{stack.text}</p>
                <div className="mb-6 space-y-3">
                  {stack.steps.map((step, index) => (
                    <div key={step} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)] text-sm font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm leading-6 text-slate-700">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {stack.links.map((link) => (
                    <Button key={link.href} variant="outline" asChild className="rounded-full border-slate-300 bg-white">
                      <Link to={link.href}>{link.label}</Link>
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#0096D6]/[0.03] to-white py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-10 h-40 w-40 rounded-full bg-[#0096D6]/10 blur-3xl" />
          <div className="absolute right-0 top-24 h-52 w-52 rounded-full bg-[#44B78B]/10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/15 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#0096D6]" />
              Не по технологии, а по реальной модели бизнеса
            </div>
            <h2 className="mb-4 bg-[linear-gradient(135deg,#007DB3_0%,#0096D6_38%,#44B78B_100%)] bg-clip-text text-transparent">
              Для каких типов бизнеса этот кластер особенно сильный
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Ниже не абстрактные услуги, а узнаваемые бизнес-сценарии. Так проще понять, какая связка действительно нужна именно вам.
            </p>
          </div>
          <div className="grid gap-8 xl:grid-cols-3">
            {businessProfiles.map((profile) => (
              <Card key={profile.title} className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/90 p-8 shadow-[0_20px_70px_-34px_rgba(0,150,214,0.32)] backdrop-blur">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#0096D6]/55 to-transparent" />
                <div className="mb-4 inline-flex w-fit rounded-full border border-[#44B78B]/20 bg-[#44B78B]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#0b7cb0]">
                  {profile.eyebrow}
                </div>
                <h3 className="mb-4 text-[28px] font-bold leading-[1.15] tracking-tight text-slate-900">{profile.title}</h3>
                <p className="mb-6 text-base leading-7 text-slate-600">{profile.text}</p>
                <div className="mb-6 space-y-3">
                  {profile.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/75 px-4 py-3">
                      <div className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)]" />
                      <p className="text-sm leading-6 text-slate-700">{bullet}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {profile.links.map((link) => (
                    <Button key={link.href} variant="outline" asChild className="rounded-full border-slate-300 bg-white">
                      <Link to={link.href}>{link.label}</Link>
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/15 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-[#0096D6]" />
              Не обязательно заходить сразу в “большую систему”
            </div>
            <h2 className="mb-4 bg-[linear-gradient(135deg,#007DB3_0%,#0096D6_38%,#44B78B_100%)] bg-clip-text text-transparent">
              Как можно начать проект с CentrLP
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Мы можем зайти в задачу с разной глубиной. Кому-то нужен быстрый пилот, кому-то уже MVP, а кому-то сразу полноценная система.
            </p>
          </div>
          <div className="grid gap-8 xl:grid-cols-3">
            {launchFormats.map((format, index) => (
              <Card
                key={format.title}
                className={`relative flex h-full flex-col rounded-[30px] border p-8 shadow-sm ${
                  index === 1
                    ? "border-[#0096D6]/25 bg-gradient-to-br from-white via-[#0096D6]/[0.05] to-[#44B78B]/[0.04] shadow-[0_22px_80px_-36px_rgba(0,150,214,0.42)]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="mb-4 inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#0096D6]">
                  {format.eyebrow}
                </div>
                <h3 className="mb-4 text-[30px] font-bold leading-[1.08] tracking-tight text-slate-900">{format.title}</h3>
                <p className="mb-6 text-base leading-7 text-slate-600">{format.text}</p>
                <div className="space-y-3">
                  {format.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white/80 px-4 py-3">
                      <div className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)]" />
                      <p className="text-sm leading-6 text-slate-700">{bullet}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/contacts">Обсудить формат старта</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services/openclaw-ai">Посмотреть self-hosted направление</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#44B78B]/[0.03] to-white py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-8 h-40 w-40 rounded-full bg-[#0096D6]/10 blur-3xl" />
          <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-[#44B78B]/10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/15 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-[#0096D6]" />
              Следим за новыми требованиями и помогаем внедрять правки в digital-контур
            </div>
            <h2 className="mb-4">Помогаем бизнесу не только запускать продукты, но и вовремя приводить сайт и процессы в порядок</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Это отдельная компетенция CentrLP: проверяем домен, формы, персональные данные, публичные тексты,
              страницы услуг и маршрут заявки, а затем помогаем внедрить нужные изменения в сайт и цифровые процессы.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {complianceSignals.map((item) => (
              <Card key={item.title} className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/90 p-8 shadow-[0_20px_70px_-34px_rgba(0,150,214,0.24)] backdrop-blur">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#0096D6]/50 to-transparent" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)] text-white shadow-sm">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{item.text}</p>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild className="border-0 bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)] text-white shadow-[0_18px_50px_-24px_rgba(0,150,214,0.7)]">
              <Link to="/services/compliance-2026">Открыть проверку сайта по персональным данным</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] via-white to-[#44B78B]/[0.06] p-8 shadow-[0_24px_80px_-42px_rgba(0,150,214,0.42)]">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/15 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0096D6]">
                  <ScanSearch className="h-4 w-4" />
                  Короткий старт без большого проекта
                </div>
                <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                  Если сайт уже есть, но заявок мало, начните не с переделки всего сайта, а с короткого разбора.
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  За 48 часов проверяем первый экран, форму, быстрые контакты, путь обращения и Метрику.
                  После этого понятно, что исправить сразу, а что уже требует сайта, CRM, трафика или автоматизации.
                </p>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0096D6]">
                    Подходит, когда
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    <li>обращения есть, но сайт не доводит до заявки</li>
                    <li>неясно, работает ли форма и что видит менеджер после отправки</li>
                    <li>нужно быстро понять, куда вложить следующий рубль и час</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="sm:flex-1">
                    <Link to="/proverka-saita-i-zayavok-za-48-chasov">Открыть экспресс-разбор</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="sm:flex-1">
                    <Link to="/contacts">Сразу оставить заявку</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {renderGroup(
        "Современные цифровые продукты",
        "Этот блок для тех, кому нужен не просто сайт, а рабочий цифровой инструмент: Mini App, MVP, CRM, ранний заход в новый канал или внутренний сервис команды.",
        productServices,
      )}

      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4">AI-системы и автоматизация</h2>
            <p className="text-lg text-muted-foreground">
              Отдельные AI-агенты, корпоративные AI-системы, чат-боты, n8n-сценарии и self-hosted решения,
              которые сокращают рутину и ускоряют работу команды.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {aiServices.map((item) => (
              <Card key={item.href} className="flex h-full flex-col bg-card p-8 shadow-card">
                <item.icon className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                <p className="mb-6 text-muted-foreground">{item.description}</p>
                <PriceBadge href={item.href} />
                <ul className="mb-8 flex-1 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start">
                      <Sparkles className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-accent-2" />
                      <span className="text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" asChild>
                  <Link to={item.href}>Подробнее</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#44B78B]/[0.05] to-white py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-8 h-40 w-40 rounded-full bg-[#0096D6]/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-44 w-44 rounded-full bg-[#44B78B]/10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/15 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#0096D6]" />
              Современная цифровая система, а не набор разрозненных услуг
            </div>
            <h2 className="mb-4 bg-[linear-gradient(135deg,#007DB3_0%,#0096D6_38%,#44B78B_100%)] bg-clip-text text-transparent">
              Как это собирается в один рабочий контур бизнеса
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Мы можем собрать для вас не одну страницу или одного бота, а систему, где канал,
              интерфейс, AI, маршруты действий, CRM и рост работают вместе. Отдельный интересный
              кейс здесь — Max как ранний рынок, куда можно заходить раньше конкурентов.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-6">
            {systemBlueprint.map((item, index) => (
              <Card
                key={item.title}
                className={`flex h-full flex-col border-white/70 bg-white/90 p-7 shadow-[0_18px_60px_-28px_rgba(0,150,214,0.28)] backdrop-blur ${
                  index === 0 || index === 4 ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)] text-white shadow-sm">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0096D6]">
                      Слой {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                  </div>
                </div>
                <p className="mb-6 text-muted-foreground">{item.text}</p>
                <ul className="mb-8 flex-1 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" asChild>
                  <Link to={item.href}>Открыть слой</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {renderGroup(
        "Сайты, запуск и рост",
        "Новые продукты сильнее продаются, когда у них есть посадочная, трафик, аналитика и понятное позиционирование. Этот блок усиливает основной продуктовый слой.",
        growthServices,
      )}

      {renderGroup(
        "Решения по нишам и типам бизнеса",
        "Здесь собраны не технологии сами по себе, а готовые отраслевые направления. Так проще увидеть, как одинаковая продуктовая логика превращается в работающую систему для конкретного бизнеса: турагентство, мебель, СТО, клининг и дальше по аналогии для других ниш.",
        industrySolutions,
      )}

      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4">Упаковка, дизайн и смысловая часть</h2>
            <p className="text-lg text-muted-foreground">
              Чтобы новый цифровой продукт не выглядел сырым и непонятным, усиливаем его дизайном,
              неймингом, текстами и продающей упаковкой.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {packagingServices.map((item) => (
              <Card key={item.href} className="flex h-full flex-col bg-card p-8 shadow-card">
                <item.icon className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                <p className="mb-6 text-muted-foreground">{item.description}</p>
                <PriceBadge href={item.href} />
                <ul className="mb-8 flex-1 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start">
                      <Sparkles className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-accent-2" />
                      <span className="text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" asChild>
                  <Link to={item.href}>Подробнее</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6">Нужен не набор услуг, а рабочая цифровая система?</h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Можем собрать связку из Mini App, CRM, AI-агента, сайта, трафика и аналитики под вашу задачу:
              продажи, сервис, внутренние процессы или новый рынок.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/contacts">Обсудить проект</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">На главную</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
