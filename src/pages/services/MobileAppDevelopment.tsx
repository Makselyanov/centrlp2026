import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { useAutoBreadcrumb, useFaqSchema, useServiceSchema } from "@/components/SeoSchemas";
import { BentoSection } from "@/components/services/BentoSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  DatabaseZap,
  Gauge,
  Layers3,
  LifeBuoy,
  Link2,
  LockKeyhole,
  MessageSquareText,
  PackageCheck,
  PlugZap,
  Rocket,
  ShieldCheck,
  Smartphone,
  Store,
  TestTubeDiagonal,
  UsersRound,
  WalletCards,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

type CardItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  points?: string[];
};

type ProcessItem = {
  step: string;
  title: string;
  text: string;
};

type PackageItem = {
  title: string;
  price: string;
  text: string;
  features: string[];
  highlighted?: boolean;
};

type RelatedService = {
  title: string;
  text: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type PlatformPage = {
  title: string;
  description: string;
  slug: string;
  breadcrumbName: string;
  schemaName: string;
  schemaDescription: string;
  schemaPrice: string;
  badge: string;
  heroTitle: string;
  heroDescription: string;
  heroPoints: string[];
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  accent: "android" | "ios";
  visual: {
    deviceLabel: string;
    appTitle: string;
    appSubtitle: string;
    status: string;
    primaryAction: string;
    secondaryAction: string;
    systemLabel: string;
    systemNodes: string[];
  };
  fitTitle: string;
  fitDescription: string;
  fitItems: CardItem[];
  scenariosTitle: string;
  scenariosDescription: string;
  scenarios: CardItem[];
  deliverablesTitle: string;
  deliverablesDescription: string;
  deliverables: CardItem[];
  releaseTitle: string;
  releaseDescription: string;
  releaseItems: CardItem[];
  process: ProcessItem[];
  packages: PackageItem[];
  relatedServices: RelatedService[];
  faqItems: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
};

const theme = {
  android: {
    chip: "border-emerald-200 bg-emerald-50 text-emerald-800",
    primary: "from-emerald-500 to-cyan-500",
    text: "text-emerald-700",
    soft: "bg-emerald-50",
    ring: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  ios: {
    chip: "border-sky-200 bg-sky-50 text-sky-800",
    primary: "from-sky-500 to-indigo-500",
    text: "text-sky-700",
    soft: "bg-sky-50",
    ring: "border-sky-200",
    dot: "bg-sky-500",
  },
} as const;

const pages: Record<"android" | "ios", PlatformPage> = {
  android: {
    title: "Разработка Android-приложений под ключ для бизнеса | CentrLP",
    description:
      "Создаем Android-приложения для заявок, записи, доставки, личного кабинета и внутренних процессов: UX, API, CRM, push, аналитика и подготовка к релизу.",
    slug: "android-app-development",
    breadcrumbName: "Android-приложения",
    schemaName: "Разработка Android-приложений",
    schemaDescription:
      "Создание Android-приложений для бизнеса: UX, дизайн, backend/API, CRM, push-уведомления, аналитика, тестирование и подготовка к публикации.",
    schemaPrice: "160000",
    badge: "Android под продажи и операции",
    heroTitle: "Создание Android-приложений под задачи бизнеса",
    heroDescription:
      "Собираем Android-приложение не ради иконки в сторе, а как рабочий контур: клиент оставляет заявку, видит статус, получает уведомления, а команда работает с данными в CRM, админке или внутреннем интерфейсе.",
    heroPoints: ["MVP и личный кабинет", "Backend/API и CRM", "Push, статусы и аналитика", "Google Play, RuStore или корпоративный релиз"],
    primaryCta: "Оценить Android-приложение",
    secondaryCta: "Начать с прототипа",
    secondaryHref: "/services/design-prototyping",
    accent: "android",
    visual: {
      deviceLabel: "Android",
      appTitle: "Заявка на сервис",
      appSubtitle: "клиент выбрал услугу и слот",
      status: "статус: согласование",
      primaryAction: "Подтвердить запись",
      secondaryAction: "Push о статусе",
      systemLabel: "Приложение связано с бизнесом",
      systemNodes: ["API", "CRM", "менеджер", "аналитика"],
    },
    fitTitle: "Когда Android-приложение оправдано",
    fitDescription:
      "Android хорошо подходит, когда нужен массовый мобильный сценарий, приложение для сотрудников или быстрый доступ к сервису на разных устройствах.",
    fitItems: [
      {
        icon: CalendarCheck,
        title: "Запись, заказы и доставка",
        text: "Клиент выбирает услугу, оформляет заказ, видит статус и получает уведомления без длинной переписки.",
      },
      {
        icon: Wrench,
        title: "Полевые команды и сервис",
        text: "Мастера, курьеры или менеджеры получают задачи, статусы, фото, чек-листы и быстрый обмен данными с офисом.",
      },
      {
        icon: UsersRound,
        title: "Клиентский кабинет",
        text: "История заказов, документы, бонусы, повторная покупка и понятный сервис внутри приложения.",
      },
    ],
    scenariosTitle: "Сценарии Android-разработки",
    scenariosDescription:
      "Начинаем с главного бизнес-сценария, чтобы приложение можно было проверить на реальных пользователях и данных.",
    scenarios: [
      {
        icon: MessageSquareText,
        title: "Приложение для заявок",
        text: "Форма, квиз, подбор услуги, быстрый контакт, передача лида в CRM и уведомление ответственному.",
        points: ["источник заявки", "статус обработки", "события аналитики"],
      },
      {
        icon: Store,
        title: "Каталог или сервисный кабинет",
        text: "Карточки услуг, цены, статусы, история обращений и повторное действие для клиента.",
        points: ["каталог", "профиль клиента", "повторные касания"],
      },
      {
        icon: ClipboardList,
        title: "Приложение для сотрудников",
        text: "Задачи, маршруты, чек-листы, фотоотчеты и синхронизация с внутренним контуром компании.",
        points: ["роли", "задачи", "контроль выполнения"],
      },
    ],
    deliverablesTitle: "Что входит в Android-разработку",
    deliverablesDescription:
      "На выходе нужен не набор экранов, а управляемый продукт с понятной логикой, данными и релизным контуром.",
    deliverables: [
      {
        icon: Layers3,
        title: "UX и дизайн экранов",
        text: "Карта сценариев, прототип, дизайн ключевых экранов и состояния интерфейса под Android-паттерны.",
      },
      {
        icon: DatabaseZap,
        title: "Backend, API и данные",
        text: "Связываем приложение с заявками, личным кабинетом, админкой, CRM, платежами или внутренней системой.",
      },
      {
        icon: BellRing,
        title: "Push и статусы",
        text: "Настраиваем уведомления, смену статусов, подтверждения и повторные касания там, где они действительно нужны.",
      },
      {
        icon: BarChart3,
        title: "Аналитика продукта",
        text: "Фиксируем ключевые события: регистрация, заявка, заказ, отказ, повторное действие, ошибка сценария.",
      },
    ],
    releaseTitle: "Готовим Android-релиз без лишних возвратов",
    releaseDescription:
      "Публикация зависит от аккаунта владельца, политики платформ и качества материалов. Поэтому заранее готовим не только сборку, но и данные для проверки.",
    releaseItems: [
      {
        icon: ShieldCheck,
        title: "Разрешения и данные",
        text: "Проверяем, какие данные собирает приложение, зачем нужны разрешения и как это отражено в политике конфиденциальности.",
      },
      {
        icon: TestTubeDiagonal,
        title: "Тестовые сборки",
        text: "Готовим тестовый релиз, проверяем критичные сценарии и поведение на разных размерах экранов.",
      },
      {
        icon: PackageCheck,
        title: "Материалы для публикации",
        text: "Описание, скриншоты, доступы для проверки, возрастные параметры, декларации и релизные заметки.",
      },
    ],
    process: [
      { step: "01", title: "Сценарий и экономика", text: "Фиксируем, какую задачу приложение решает, кто им пользуется и какая метрика покажет результат." },
      { step: "02", title: "Прототип и состав экранов", text: "Собираем маршрут пользователя, состояния, роли, список интеграций и ограничения первого релиза." },
      { step: "03", title: "Разработка и интеграции", text: "Делаем приложение, backend/API, админку, CRM-связку, уведомления и события аналитики." },
      { step: "04", title: "Тесты и релиз", text: "Проверяем сборку, готовим публикацию или корпоративную установку, выпускаем и собираем данные для развития." },
    ],
    packages: [
      {
        title: "Прототип Android-приложения",
        price: "от 35 000 ₽",
        text: "Подходит, когда нужно понять состав экранов, риски, сроки и бюджет до разработки.",
        features: ["карта сценариев", "UX-прототип", "оценка сложности и интеграций"],
      },
      {
        title: "Android MVP",
        price: "от 160 000 ₽",
        text: "Первый рабочий релиз под один главный сценарий: заявка, запись, кабинет или внутренний процесс.",
        features: ["ключевые экраны", "backend/API", "тестовая сборка"],
        highlighted: true,
      },
      {
        title: "Android + CRM",
        price: "от 280 000 ₽",
        text: "Приложение как часть системы продаж и сервиса: роли, статусы, CRM, уведомления и аналитика.",
        features: ["приложение и админка", "CRM/уведомления", "события и отчеты"],
      },
      {
        title: "Сопровождение и развитие",
        price: "от 60 000 ₽/мес",
        text: "Обновления, улучшения UX, разбор аналитики и развитие продукта после первых пользователей.",
        features: ["релизы", "поддержка", "гипотезы роста"],
      },
    ],
    relatedServices: [
      {
        title: "MVP-разработка",
        text: "Если сначала нужно проверить продуктовую гипотезу без полной мобильной системы.",
        href: "/services/mvp-development",
      },
      {
        title: "Telegram Mini App",
        text: "Если задачу дешевле и быстрее решить внутри Telegram до нативного приложения.",
        href: "/services/telegram-mini-app",
      },
      {
        title: "Персональная CRM",
        text: "Если приложение должно быть связано с обработкой заявок, ролями и статусами команды.",
        href: "/services/custom-crm",
      },
    ],
    faqItems: [
      {
        question: "Сколько стоит разработка Android-приложения?",
        answer:
          "Прототип начинается от 35 000 ₽, рабочий Android MVP - от 160 000 ₽. Итоговая стоимость зависит от экранов, backend, CRM, уведомлений, платежей, ролей и публикации.",
      },
      {
        question: "Можно ли начать только с Android, а iOS сделать позже?",
        answer:
          "Да. Если основная аудитория пользуется Android или приложение нужно для сотрудников, часто разумно начать с Android MVP, собрать данные и затем перейти к iOS или кроссплатформенному релизу.",
      },
      {
        question: "Вы публикуете приложение в Google Play или RuStore?",
        answer:
          "Помогаем подготовить сборку, материалы, политику, скриншоты и данные для публикации. Сам релиз зависит от аккаунта владельца, требований платформы и результатов проверки.",
      },
      {
        question: "Что лучше: Android-приложение или Telegram Mini App?",
        answer:
          "Если нужен быстрый запуск внутри мессенджера, часто лучше начать с Mini App. Если важны системные push, работа с устройством, сотрудниками или отдельный клиентский кабинет, Android-приложение сильнее.",
      },
      {
        question: "Код и аккаунты будут принадлежать заказчику?",
        answer:
          "Право владения и доступы фиксируются до старта. Обычно приложение, репозиторий, аккаунты публикации и ключевые интеграции должны быть оформлены на стороне бизнеса.",
      },
    ],
    ctaTitle: "Нужно Android-приложение, которое связано с продажами и сервисом?",
    ctaDescription:
      "Разберем сценарий, оценим первый релиз и предложим, с чего начать: прототип, Android MVP, CRM-связка или более короткий Mini App.",
  },
  ios: {
    title: "Разработка iOS-приложений для iPhone и iPad | CentrLP",
    description:
      "Проектируем и запускаем iOS-приложения для клиентов и команды: UX, дизайн экранов, личный кабинет, API/CRM, push, аналитика, TestFlight и подготовка к App Store.",
    slug: "ios-app-development",
    breadcrumbName: "iOS-приложения",
    schemaName: "Разработка iOS-приложений",
    schemaDescription:
      "Создание iOS-приложений для iPhone и iPad: UX, дизайн, backend/API, CRM-интеграции, push-уведомления, аналитика, TestFlight и подготовка к App Store.",
    schemaPrice: "190000",
    badge: "iOS под сервис и доверие",
    heroTitle: "Создание iOS-приложений для клиентов, сервиса и повторных продаж",
    heroDescription:
      "iOS-приложение должно быть аккуратным продуктом: понятный сценарий, чистый интерфейс, стабильная работа, корректные данные и подготовка к App Store. Проектируем его как часть бизнеса, а не как оболочку сайта.",
    heroPoints: ["iPhone и iPad", "UX и дизайн-система", "API, CRM и push", "TestFlight и App Store readiness"],
    primaryCta: "Разобрать iOS-приложение",
    secondaryCta: "Оценить риски App Store",
    secondaryHref: "/services/design-prototyping",
    accent: "ios",
    visual: {
      deviceLabel: "iOS",
      appTitle: "Кабинет клиента",
      appSubtitle: "статус, документы и повторный заказ",
      status: "готово к TestFlight",
      primaryAction: "Открыть заказ",
      secondaryAction: "Push о готовности",
      systemLabel: "iOS-продукт в контуре сервиса",
      systemNodes: ["API", "CRM", "оплата", "аналитика"],
    },
    fitTitle: "Когда iOS-приложение дает бизнесу больше",
    fitDescription:
      "iOS особенно уместен, когда важны доверие, качество клиентского опыта, платежеспособная аудитория и аккуратный сервис после первой покупки.",
    fitItems: [
      {
        icon: WalletCards,
        title: "Клиенты с высоким чеком",
        text: "Приложение усиливает доверие, повторные продажи, записи, подписки, статусы и персональные предложения.",
      },
      {
        icon: BadgeCheck,
        title: "Сервис с личным кабинетом",
        text: "Документы, история заказов, статусы, напоминания, push и понятная коммуникация внутри одного продукта.",
      },
      {
        icon: Layers3,
        title: "Продукт с сильным UX",
        text: "Когда нельзя ограничиться веб-страницей: нужны плавный сценарий, дизайн-система и стабильная логика приложения.",
      },
    ],
    scenariosTitle: "Сценарии iOS-разработки",
    scenariosDescription:
      "Строим приложение вокруг конкретного действия клиента и заранее учитываем ограничения релиза, приватности и платформенных правил.",
    scenarios: [
      {
        icon: LockKeyhole,
        title: "Личный кабинет клиента",
        text: "Авторизация, профиль, история, документы, статусы, уведомления и повторные действия.",
        points: ["профиль", "история", "статусы"],
      },
      {
        icon: CalendarCheck,
        title: "Запись, сервис или бронирование",
        text: "Выбор услуги, слоты, подтверждение, напоминания, отмена и передача действия в CRM.",
        points: ["календарь", "подтверждение", "напоминания"],
      },
      {
        icon: Store,
        title: "Продажи и подписки",
        text: "Каталог, заказ, оплата, подписочная логика или сервисные сценарии с учетом правил платформы.",
        points: ["каталог", "оплата", "удержание"],
      },
    ],
    deliverablesTitle: "Что входит в iOS-разработку",
    deliverablesDescription:
      "iOS требует не только кода, но и внимательной продуктовой подготовки: от сценария до метаданных и тестовых доступов.",
    deliverables: [
      {
        icon: Smartphone,
        title: "UX под iPhone и iPad",
        text: "Проектируем экраны, состояния, навигацию и дизайн-систему так, чтобы приложение выглядело цельным продуктом.",
      },
      {
        icon: PlugZap,
        title: "Backend, API и CRM",
        text: "Соединяем iOS-приложение с данными бизнеса, заявками, оплатами, ролями, статусами и уведомлениями.",
      },
      {
        icon: BellRing,
        title: "Push и сервисные события",
        text: "Помогаем определить, какие события действительно нужны пользователю, а какие только создадут лишний шум.",
      },
      {
        icon: Gauge,
        title: "Качество и аналитика",
        text: "Проверяем критичные сценарии, ошибки, скорость, регистрацию, заказы, повторные действия и удержание.",
      },
    ],
    releaseTitle: "Готовим не только приложение, но и App Store-релиз",
    releaseDescription:
      "App Store Review проверяет приложение, метаданные, доступы, приватность, платежные сценарии и качество. Поэтому заранее готовим релизный пакет и не обещаем прохождение проверки за фиксированный срок.",
    releaseItems: [
      {
        icon: TestTubeDiagonal,
        title: "TestFlight и проверка сценариев",
        text: "Готовим тестовую сборку, демо-доступ и проверяем ключевые маршруты до отправки на ревью.",
      },
      {
        icon: ShieldCheck,
        title: "Privacy и юридические данные",
        text: "Сверяем сбор данных, политику конфиденциальности, доступы, push и платежные сценарии с требованиями платформы.",
      },
      {
        icon: PackageCheck,
        title: "Метаданные и материалы",
        text: "Готовим описание, скриншоты, иконку, возрастные параметры, релизные заметки и инструкции для проверки.",
      },
    ],
    process: [
      { step: "01", title: "Продуктовая рамка", text: "Определяем аудиторию, главный сценарий, ограничения App Store и критерии успешного релиза." },
      { step: "02", title: "UX, дизайн и прототип", text: "Собираем экраны, переходы, состояния, дизайн-систему и список интеграций." },
      { step: "03", title: "Разработка и тестирование", text: "Делаем iOS-приложение, backend/API, CRM-связки, push и события аналитики." },
      { step: "04", title: "TestFlight и релиз", text: "Проверяем сборку, готовим материалы, отправляем на ревью и определяем следующие версии." },
    ],
    packages: [
      {
        title: "iOS-прототип",
        price: "от 45 000 ₽",
        text: "Подходит, когда нужно оценить UX, состав экранов, стоимость и риски App Store до разработки.",
        features: ["карта сценариев", "дизайн ключевых экранов", "оценка релизных рисков"],
      },
      {
        title: "iOS MVP",
        price: "от 190 000 ₽",
        text: "Первая рабочая версия под один-два ключевых сценария: кабинет, запись, заказ или сервисный продукт.",
        features: ["iPhone-интерфейс", "backend/API", "TestFlight-сборка"],
        highlighted: true,
      },
      {
        title: "iOS + backend + CRM",
        price: "от 320 000 ₽",
        text: "Приложение как часть системы продаж, сервиса и повторных касаний с данными в одном контуре.",
        features: ["приложение", "CRM/API", "push и аналитика"],
      },
      {
        title: "Сопровождение релиза",
        price: "от 70 000 ₽/мес",
        text: "Поддержка версии, разбор аналитики, улучшения интерфейса и подготовка следующих обновлений.",
        features: ["релизы", "поддержка", "улучшения UX"],
      },
    ],
    relatedServices: [
      {
        title: "Дизайн и прототипирование",
        text: "Если перед разработкой нужно точно собрать сценарии, экраны и релизные риски.",
        href: "/services/design-prototyping",
      },
      {
        title: "MVP-разработка",
        text: "Если нужно проверить ценность продукта до полноценного мобильного релиза.",
        href: "/services/mvp-development",
      },
      {
        title: "Персональная CRM",
        text: "Если iOS-приложение должно работать вместе с заявками, командами и статусами.",
        href: "/services/custom-crm",
      },
    ],
    faqItems: [
      {
        question: "Сколько стоит разработка iOS-приложения?",
        answer:
          "iOS-прототип начинается от 45 000 ₽, iOS MVP - от 190 000 ₽. Цена зависит от экранов, backend, CRM, платежей, push, личного кабинета, тестирования и релизной подготовки.",
      },
      {
        question: "Можно ли гарантировать прохождение App Store Review?",
        answer:
          "Гарантировать решение App Store нельзя. Можно снизить риск возвратов: заранее проверить сценарии, метаданные, privacy, демо-доступы, платежи и качество приложения.",
      },
      {
        question: "Нужно ли делать iOS первым?",
        answer:
          "Это зависит от аудитории и экономики. Если основные клиенты пользуются iPhone и важен премиальный сервис, iOS может быть первым релизом. Если нужен массовый тест, иногда лучше начать с Android или Mini App.",
      },
      {
        question: "Вы делаете приложение для iPad?",
        answer:
          "Да, если iPad нужен бизнес-сценарию: менеджерская панель, зал, склад, сервисная команда, обучение или клиентский кабинет. Это учитывается в прототипе и оценке.",
      },
      {
        question: "Что нужно от заказчика для старта?",
        answer:
          "Нужны бизнес-сценарий, аудитория, список функций, текущие данные или CRM, требования к аккаунтам публикации, материалы бренда и понимание, кто будет владельцем доступов.",
      },
    ],
    ctaTitle: "Нужно iOS-приложение, которое выглядит и работает как продукт?",
    ctaDescription:
      "Разберем сценарий, оценим релизные риски и предложим первый безопасный этап: прототип, iOS MVP или связку приложения с backend и CRM.",
  },
};

const AppHeroVisual = ({ page }: { page: PlatformPage }) => {
  const t = theme[page.accent];

  return (
    <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
      <div className="absolute inset-x-8 top-8 h-4/5 rounded-[42px] border border-slate-200 bg-white/70 shadow-[0_24px_90px_-44px_rgba(15,23,42,0.38)]" />
      <div className="relative grid gap-5 sm:grid-cols-[0.86fr_1fr] sm:items-center">
        <div className="relative mx-auto aspect-[9/18] w-[210px] rounded-[34px] bg-slate-950 p-3 shadow-[0_28px_80px_-36px_rgba(15,23,42,0.6)] sm:w-[230px]">
          <div className="h-full rounded-[26px] bg-slate-50 p-4">
            <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-slate-300" />
            <div className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${t.chip}`}>
              {page.visual.deviceLabel}
            </div>
            <h3 className="text-lg font-bold leading-tight text-slate-950">{page.visual.appTitle}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">{page.visual.appSubtitle}</p>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">карточка</span>
                <span className={`h-2.5 w-2.5 rounded-full ${t.dot}`} />
              </div>
              <div className="mb-2 h-2.5 rounded-full bg-slate-200" />
              <div className="mb-4 h-2.5 w-2/3 rounded-full bg-slate-200" />
              <div className={`rounded-xl bg-gradient-to-r ${t.primary} px-3 py-2 text-center text-xs font-semibold text-white`}>
                {page.visual.primaryAction}
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <BellRing className={`h-4 w-4 ${t.text}`} />
                <span>{page.visual.secondaryAction}</span>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600">
              <span>{page.visual.status}</span>
              <CheckCircle2 className={`h-4 w-4 ${t.text}`} />
            </div>
          </div>
        </div>

        <div className="relative rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_-44px_rgba(15,23,42,0.45)]">
          <div className="mb-4 flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${t.primary} text-white`}>
              <Workflow className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">контур</div>
              <div className="font-bold text-slate-950">{page.visual.systemLabel}</div>
            </div>
          </div>
          <div className="space-y-3">
            {page.visual.systemNodes.map((node, index) => (
              <div key={node} className="grid grid-cols-[auto_1fr] items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${t.ring} ${t.soft} text-sm font-bold ${t.text}`}>
                  {index + 1}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                  {node}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <BarChart3 className={`h-4 w-4 ${t.text}`} />
              события для роста
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-slate-600">
              {["заявка", "статус", "повтор"].map((event) => (
                <span key={event} className="rounded-full bg-white px-2 py-1.5 shadow-sm">
                  {event}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IconCard = ({ item }: { item: CardItem }) => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md md:p-7">
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#0096D6]">
      <item.icon className="h-6 w-6" />
    </div>
    <h3 className="mb-3 text-xl font-bold leading-tight text-slate-950">{item.title}</h3>
    <p className="leading-7 text-slate-600">{item.text}</p>
    {item.points && (
      <ul className="mt-5 space-y-2.5">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#44B78B]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const MobileAppServicePage = ({ page }: { page: PlatformPage }) => {
  const t = theme[page.accent];

  useAutoBreadcrumb(page.breadcrumbName);
  useServiceSchema({ name: page.schemaName, description: page.schemaDescription, price: page.schemaPrice });
  useFaqSchema(page.faqItems);

  return (
    <Layout title={page.title} description={page.description}>
      <section className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
            <div className="max-w-3xl">
              <div className={`mb-7 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${t.chip}`}>
                <Smartphone className="h-4 w-4" />
                {page.badge}
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                {page.heroDescription}
              </p>
              <div className="mb-9 flex flex-wrap gap-2.5">
                {page.heroPoints.map((point) => (
                  <span key={point} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                    {point}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className={`border-0 bg-gradient-to-r ${t.primary} text-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] transition-transform duration-300 hover:-translate-y-0.5 hover:opacity-95`}
                >
                  <a href="#contact">
                    {page.primaryCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-slate-300 bg-white">
                  <RouterLink to={page.secondaryHref}>{page.secondaryCta}</RouterLink>
                </Button>
              </div>
            </div>

            <AppHeroVisual page={page} />
          </div>
        </div>
      </section>

      <ServiceImageBand slug={page.slug} alt={`${page.schemaName}: интерфейс приложения, CRM-связка и релизный контур`} />

      <BentoSection tone="white" eyebrow="Когда нужно приложение" title={page.fitTitle} description={page.fitDescription}>
        <div className="grid gap-5 md:grid-cols-3">
          {page.fitItems.map((item) => (
            <IconCard key={item.title} item={item} />
          ))}
        </div>
      </BentoSection>

      <BentoSection tone="slate" eyebrow="Сценарии" title={page.scenariosTitle} description={page.scenariosDescription}>
        <div className="grid gap-5 lg:grid-cols-3">
          {page.scenarios.map((item) => (
            <IconCard key={item.title} item={item} />
          ))}
        </div>
      </BentoSection>

      <BentoSection
        tone="white"
        eyebrow="Состав работ"
        title={page.deliverablesTitle}
        description={page.deliverablesDescription}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {page.deliverables.map((item) => (
            <IconCard key={item.title} item={item} />
          ))}
        </div>
      </BentoSection>

      <BentoSection tone="tint" eyebrow="Релиз" title={page.releaseTitle} description={page.releaseDescription}>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${t.primary} text-white`}>
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-slate-950">Как идем к первому релизу</h3>
            <div className="space-y-4">
              {page.process.map((step) => (
                <div key={step.step} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.soft} text-sm font-bold ${t.text}`}>
                    {step.step}
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-slate-900">{step.title}</h4>
                    <p className="text-sm leading-6 text-slate-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
            {page.releaseItems.map((item) => (
              <IconCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </BentoSection>

      <BentoSection
        tone="white"
        eyebrow="Стоимость"
        title="Форматы старта"
        description="Можно начать с прототипа, MVP или сразу проектировать приложение как часть CRM и сервиса."
      >
        <div className="grid gap-5 xl:grid-cols-4">
          {page.packages.map((item) => (
            <div
              key={item.title}
              className={`flex h-full flex-col rounded-2xl border p-6 shadow-sm ${
                item.highlighted
                  ? `border-slate-200 bg-gradient-to-br ${page.accent === "android" ? "from-emerald-50 via-white to-cyan-50" : "from-sky-50 via-white to-indigo-50"}`
                  : "border-slate-200 bg-white"
              }`}
            >
              {item.highlighted && (
                <div className={`mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${t.chip}`}>
                  основной старт
                </div>
              )}
              <h3 className="mb-3 text-xl font-bold leading-tight text-slate-950">{item.title}</h3>
              <div className={`mb-4 text-2xl font-bold ${t.text}`}>{item.price}</div>
              <p className="mb-5 flex-1 text-sm leading-6 text-slate-600">{item.text}</p>
              <ul className="space-y-2.5">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#44B78B]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </BentoSection>

      <BentoSection
        tone="slate"
        eyebrow="Связанные решения"
        title="Иногда лучше начать не с полного приложения"
        description="Если задача решается быстрее через прототип, MVP, Mini App или CRM, покажем этот путь до разработки."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {page.relatedServices.map((item) => (
            <div key={item.href} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#0096D6]">
                <Link2 className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-950">{item.title}</h3>
              <p className="mb-5 flex-1 leading-7 text-slate-600">{item.text}</p>
              <Button variant="outline" size="sm" asChild className="self-start border-slate-300 bg-white">
                <RouterLink to={item.href}>
                  Открыть страницу
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </RouterLink>
              </Button>
            </div>
          ))}
        </div>
      </BentoSection>

      <BentoSection tone="white" eyebrow="FAQ" title="Частые вопросы">
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <Accordion type="single" collapsible>
            {page.faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={item.question}>
                <AccordionTrigger className="px-6 text-left text-slate-900 hover:text-[#0096D6]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 leading-relaxed text-slate-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </BentoSection>

      <section id="contact" className="bg-gradient-to-b from-white via-slate-50 to-white py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className={`mb-4 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${t.chip}`}>
              оценка проекта
            </div>
            <h2 className="mb-4 text-[28px] font-bold tracking-tight text-slate-950 md:text-[34px]">
              {page.ctaTitle}
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">{page.ctaDescription}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export const AndroidAppDevelopment = () => <MobileAppServicePage page={pages.android} />;

export const IosAppDevelopment = () => <MobileAppServicePage page={pages.ios} />;
