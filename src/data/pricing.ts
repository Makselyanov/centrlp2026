export type ServicePriceCategory =
  | "product"
  | "ai"
  | "growth"
  | "packaging"
  | "industry"
  | "compliance";

export type ServicePrice = {
  title: string;
  href: string;
  price: string;
  description: string;
  category: ServicePriceCategory;
  note?: string;
  seoPriority?: "high" | "medium" | "support";
};

export type PackagePrice = {
  title: string;
  price: string;
  description: string;
  features: string[];
  result: string;
  highlighted?: boolean;
};

export const pricingUpdatedAt = "июнь 2026";

export const packagePrices: PackagePrice[] = [
  {
    title: "Экспресс-разбор заявок",
    price: "от 15 000 ₽",
    description: "Когда заявок мало или они не доходят до менеджера, а большой проект начинать рискованно.",
    features: [
      "Проверка первого экрана, формы и пути до заявки",
      "5-7 конкретных правок по текстам, кнопкам и структуре",
      "Проверка Метрики, целей и событий заявки",
      "Короткий список внедрения на 2-3 дня",
    ],
    result: "Понятно, где теряются обращения и с каких правок начать без большого бюджета.",
    highlighted: true,
  },
  {
    title: "Стартовая упаковка",
    price: "от 75 000 ₽",
    description: "Когда нужен аккуратный запуск сайта, формы, аналитики и базовой упаковки без лишнего масштаба.",
    features: [
      "Лендинг или сайт 5-7 блоков/страниц",
      "Продающая структура и базовая SEO-разметка",
      "Формы, цели Метрики, события и заявки",
      "Первичная упаковка оффера и CTA",
    ],
    result: "Понятная точка входа для рекламы, SEO и продаж.",
  },
  {
    title: "Продажи под ключ",
    price: "от 140 000 ₽",
    description: "Сайт, аналитика, офферы, трафик и маршрут заявки в одном рабочем контуре.",
    features: [
      "Сайт 7-12 страниц или усиленный лендинг",
      "Яндекс.Директ/ВК-гипотезы и подготовка к запуску",
      "Веб-аналитика, цели, события, маршруты заявки",
      "Контентные блоки, кейсы и посадочные смыслы",
    ],
    result: "Не просто сайт, а система получения и обработки заявок.",
  },
  {
    title: "AI + CRM + автоматизация",
    price: "от 220 000 ₽",
    description: "Для бизнеса, которому нужен AI-агент, мессенджерный интерфейс, CRM и автоматизация действий команды.",
    features: [
      "Telegram/Max/Mini App как точка входа",
      "AI-агент, OpenClaw или help-сценарии",
      "n8n, CRM, статусы, уведомления и роли",
      "Пилот, MVP или полноценная система",
    ],
    result: "Цифровой продукт, который принимает заявки и двигает процессы.",
  },
];

export const servicePrices: ServicePrice[] = [
  {
    title: "Экспресс-разбор заявок и сайта",
    href: "/proverka-saita-i-zayavok-za-48-chasov",
    price: "от 15 000 ₽",
    description: "За 48 часов проверяем сайт, форму, предложение, Метрику и путь обращения, чтобы найти причины потери заявок.",
    category: "growth",
    note: "Подходит как первый шаг перед доработкой сайта, рекламой или внедрением CRM.",
    seoPriority: "high",
  },
  {
    title: "Сайт под ключ",
    href: "/services/website-development",
    price: "от 45 000 ₽",
    description: "Лендинг, многостраничный сайт или интерфейс продаж с формами, SEO-основой и аналитикой.",
    category: "growth",
    seoPriority: "high",
  },
  {
    title: "Дизайн и прототипирование",
    href: "/services/design-prototyping",
    price: "от 25 000 ₽",
    description: "UX-логика, прототипы, структура экранов и дизайн ключевых пользовательских сценариев.",
    category: "packaging",
    seoPriority: "medium",
  },
  {
    title: "Фирменный стиль и брендинг",
    href: "/services/branding",
    price: "от 25 000 ₽",
    description: "Логотип, визуальная система, цвета, носители и правила применения бренда.",
    category: "packaging",
    seoPriority: "medium",
  },
  {
    title: "Нейминг и продающие офферы",
    href: "/services/naming-offers",
    price: "от 20 000 ₽",
    description: "Название, УТП, офферы по сегментам и смысловая упаковка продукта или услуги.",
    category: "packaging",
    seoPriority: "medium",
  },
  {
    title: "Упаковка оффера",
    href: "/services/offer-packaging",
    price: "от 25 000 ₽",
    description: "Формулируем предложение, выгоды, структуру аргументов и коммерческую подачу.",
    category: "packaging",
    seoPriority: "medium",
  },
  {
    title: "Продающие SEO-тексты",
    href: "/services/copywriting-texts",
    price: "от 12 000 ₽",
    description: "Тексты для страниц, статей, услуг, лендингов, рекламных связок и SEO-кластеров.",
    category: "packaging",
    note: "Цена зависит от объема и глубины ресерча.",
    seoPriority: "high",
  },
  {
    title: "Контент-план и SMM-стратегия",
    href: "/services/content-plan",
    price: "от 25 000 ₽/мес",
    description: "Контентная система: темы, рубрики, креативы, посты, SEO-связки и план публикаций.",
    category: "packaging",
    seoPriority: "high",
  },
  {
    title: "Оформление ВКонтакте",
    href: "/services/vk-design",
    price: "от 15 000 ₽",
    description: "Обложка, меню, закреп, карточки услуг, CTA и сценарии входа в диалог.",
    category: "growth",
    seoPriority: "support",
  },
  {
    title: "Чат-бот ВКонтакте",
    href: "/services/chatbot-vk",
    price: "от 30 000 ₽",
    description: "Сценарии заявок, консультаций, FAQ, квалификации и передачи лида менеджеру.",
    category: "ai",
    seoPriority: "medium",
  },
  {
    title: "Автоответы и запись 24/7",
    href: "/services/auto-responses",
    price: "от 15 000 ₽",
    description: "Автоответы, запись, напоминания, FAQ и быстрые сценарии для входящих обращений.",
    category: "ai",
    seoPriority: "medium",
  },
  {
    title: "Help-бот для поддержки",
    href: "/services/help-bot",
    price: "от 35 000 ₽",
    description: "Помощник для поддержки клиентов, повторяющихся вопросов и сервисных сценариев.",
    category: "ai",
    seoPriority: "medium",
  },
  {
    title: "Скрипты продаж и FAQ",
    href: "/services/operator-scripts",
    price: "от 20 000 ₽",
    description: "Скрипты операторов, FAQ, ответы на возражения и сценарии обработки заявок.",
    category: "growth",
    seoPriority: "support",
  },
  {
    title: "Яндекс.Директ",
    href: "/services/yandex-direct",
    price: "от 20 000 ₽",
    description: "Настройка поиска, РСЯ, аналитики, целей, объявлений и первых тестов спроса.",
    category: "growth",
    note: "Ведение и оптимизация - от 30 000 ₽/мес. Рекламный бюджет отдельно.",
    seoPriority: "high",
  },
  {
    title: "Таргет ВКонтакте",
    href: "/services/vk-ads",
    price: "от 30 000 ₽/мес",
    description: "Ведение таргетированной рекламы, ретаргетинг, лид-формы, креативы и отчеты.",
    category: "growth",
    note: "Рекламный бюджет отдельно.",
    seoPriority: "medium",
  },
  {
    title: "Веб-аналитика",
    href: "/services/web-analytics",
    price: "от 15 000 ₽",
    description: "Метрика, цели, события, отчеты, маршруты заявки и проверка конверсий.",
    category: "growth",
    seoPriority: "high",
  },
  {
    title: "A/B-тесты",
    href: "/services/ab-testing",
    price: "от 20 000 ₽",
    description: "Тестирование заголовков, креативов, страниц, офферов и рекламных связок.",
    category: "growth",
    seoPriority: "support",
  },
  {
    title: "Маркетинговая стратегия",
    href: "/services/marketing-strategy",
    price: "от 35 000 ₽",
    description: "Позиционирование, карта гипотез, медиаплан, сегменты, каналы и план роста.",
    category: "growth",
    seoPriority: "high",
  },
  {
    title: "Telegram Mini App",
    href: "/services/telegram-mini-app",
    price: "от 120 000 ₽",
    description: "Клиентский интерфейс в Telegram: заявки, запись, бронирование, кабинет, статусы.",
    category: "product",
    seoPriority: "high",
  },
  {
    title: "Решения для Max",
    href: "/services/max-messenger",
    price: "от 120 000 ₽",
    description: "Пилотный канал продаж и сервиса в Max: сценарии, интерфейс, заявки и связки.",
    category: "product",
    seoPriority: "high",
  },
  {
    title: "Browser extensions",
    href: "/services/browser-extensions",
    price: "от 140 000 ₽",
    description: "Расширения для Chrome и Яндекс Браузера под рабочие задачи команды.",
    category: "product",
    seoPriority: "support",
  },
  {
    title: "MVP-разработка",
    href: "/services/mvp-development",
    price: "от 90 000 ₽",
    description: "Первый рабочий релиз продукта, интерфейса или внутреннего инструмента.",
    category: "product",
    seoPriority: "medium",
  },
  {
    title: "Персональная CRM",
    href: "/services/custom-crm",
    price: "от 180 000 ₽",
    description: "CRM под путь клиента, роли команды, статусы, задачи, уведомления и отчеты.",
    category: "product",
    seoPriority: "high",
  },
  {
    title: "Telegram AI-агент для заявок",
    href: "/services/telegram-lead-agent",
    price: "от 135 000 ₽",
    description: "AI-агент принимает обращения, отвечает, квалифицирует и передает лид в CRM.",
    category: "ai",
    seoPriority: "high",
  },
  {
    title: "Telegram AI-консультант",
    href: "/services/telegram-service-agent",
    price: "от 125 000 ₽",
    description: "AI-сценарии записи, FAQ, сопровождения, напоминаний и сервисных диалогов.",
    category: "ai",
    seoPriority: "high",
  },
  {
    title: "OpenClaw для бизнеса",
    href: "/services/openclaw-ai",
    price: "от 170 000 ₽",
    description: "Self-hosted AI-агент в Telegram, CRM и внутренних процессах компании.",
    category: "ai",
    seoPriority: "high",
  },
  {
    title: "n8n-автоматизация",
    href: "/services/n8n-automation",
    price: "от 120 000 ₽",
    description: "Workflow между заявкой, CRM, Telegram, уведомлениями, AI и командой.",
    category: "ai",
    seoPriority: "high",
  },
  {
    title: "AI-агенты",
    href: "/services/ai-agents",
    price: "от 160 000 ₽",
    description: "Агенты для входящих заявок, поддержки, классификации и внутренних действий.",
    category: "ai",
    seoPriority: "high",
  },
  {
    title: "AI-системы и нейросети",
    href: "/services/ai-systems",
    price: "от 180 000 ₽",
    description: "Корпоративные ассистенты, базы знаний, генерация контента и AI-модули.",
    category: "ai",
    seoPriority: "high",
  },
  {
    title: "Проверка сайта по персональным данным",
    href: "/services/compliance-2026",
    price: "от 45 000 ₽",
    description: "Проверка сайта, домена, форм, cookie, аналитики, персональных данных и маршрута заявки.",
    category: "compliance",
    seoPriority: "high",
  },
  {
    title: "AI-консьерж для турагентов",
    href: "/ai-turagent",
    price: "от 120 000 ₽",
    description: "Отраслевой AI-сценарий для туристов: сопровождение, документы, напоминания и допродажи.",
    category: "industry",
    seoPriority: "high",
  },
  {
    title: "Сборка для мебельщиков",
    href: "/barter/furniture",
    price: "эквивалент от 80 000 ₽",
    description: "Сайт, заявки, каталог, упаковка и рекламные сценарии под мебельный бизнес.",
    category: "industry",
    seoPriority: "medium",
  },
  {
    title: "Сборка для СТО и детейлинга",
    href: "/barter/sto",
    price: "эквивалент от 80 000 ₽",
    description: "Запись, заявки, сервисные ответы, рекламный трафик и маршрут клиента.",
    category: "industry",
    seoPriority: "medium",
  },
  {
    title: "Сборка для клининга",
    href: "/barter/cleaning",
    price: "эквивалент от 80 000 ₽",
    description: "Быстрый отклик, расчет, запись, повторные обращения и сценарии обработки заявок.",
    category: "industry",
    seoPriority: "support",
  },
];

export const servicePriceByHref = servicePrices.reduce<Record<string, ServicePrice>>((acc, item) => {
  acc[item.href] = item;
  return acc;
}, {});

export const pricingGroups: Array<{
  id: ServicePriceCategory;
  title: string;
  description: string;
}> = [
  {
    id: "product",
    title: "Цифровые продукты",
    description: "Mini App, Max, CRM, MVP и внутренние инструменты, где стоимость зависит от сценария и интеграций.",
  },
  {
    id: "ai",
    title: "AI, боты и автоматизация",
    description: "AI-агенты, OpenClaw, n8n, Telegram-сценарии и help-боты для заявок, сервиса и внутренних процессов.",
  },
  {
    id: "growth",
    title: "Сайт, трафик и рост",
    description: "Сайт, реклама, аналитика, стратегия и тесты, которые помогают получать и считать заявки.",
  },
  {
    id: "packaging",
    title: "Упаковка, дизайн и контент",
    description: "Смыслы, визуальная система, тексты, офферы и контентная основа для продаж и SEO.",
  },
  {
    id: "compliance",
    title: "Персональные данные и порядок в цифровом контуре",
    description: "Отдельная линия про сайт, формы, cookie, данные, домен и публичные тексты под требования 2026.",
  },
  {
    id: "industry",
    title: "Нишевые сборки",
    description: "Готовые отраслевые сценарии для турагентов, СТО, мебели, клининга и похожих сервисных ниш.",
  },
];

export const seoFocusPages = [
  {
    title: "Проверка сайта по персональным данным",
    href: "/services/compliance-2026",
    reason: "Свежий спрос вокруг персональных данных, cookie, доменов, форм и проверок РКН.",
  },
  {
    title: "AI-консьерж для турагентов",
    href: "/ai-turagent",
    reason: "Нишевая страница с понятной болью, высоким чеком и возможностью делать кейсы.",
  },
  {
    title: "OpenClaw для бизнеса",
    href: "/services/openclaw-ai",
    reason: "Можно строить кластер статей про self-hosted AI, Telegram, n8n, CRM и приватность.",
  },
  {
    title: "Telegram AI-агент для заявок",
    href: "/services/telegram-lead-agent",
    reason: "Коммерческий запрос ближе к деньгам: заявки, первичная квалификация, CRM.",
  },
  {
    title: "Сайт под ключ в Тюмени",
    href: "/services/website-development",
    reason: "Базовая SEO-страница, которая должна собирать локальный спрос и перелинковывать новые услуги.",
  },
];
