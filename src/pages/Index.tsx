import { Hero } from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Bot,
  Brain,
  BriefcaseBusiness,
  Chrome,
  Compass,
  Globe,
  Layers3,
  Languages,
  LineChart,
  MessageSquare,
  PhoneCall,
  Rocket,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { trackMetric } from "@/lib/metrics";

const primaryProducts = [
  {
    title: "Telegram Mini App",
    description:
      "Интерфейс продаж, записи, бронирования, оплаты и личного кабинета внутри Telegram без лишних шагов для клиента.",
    href: "/services/telegram-mini-app",
    icon: MessageSquare,
  },
  {
    title: "AI-агенты",
    description:
      "Агенты для обработки заявок, ответов, классификации, поиска информации и внутренних действий команды.",
    href: "/services/ai-agents",
    icon: Bot,
  },
  {
    title: "Персональная CRM",
    description:
      "CRM под вашу модель продаж и сервиса: статусы, задачи, роли, интеграции, прозрачность для руководителя.",
    href: "/services/custom-crm",
    icon: BriefcaseBusiness,
  },
  {
    title: "Browser extensions",
    description:
      "Расширения для Chrome и Яндекс Браузера как рабочие инструменты отделов продаж, маркетинга, HR и операционки.",
    href: "/services/browser-extensions",
    icon: Chrome,
  },
  {
    title: "MVP и быстрый запуск",
    description:
      "Собираем минимальный, но рабочий продукт, чтобы проверить гипотезу, запустить продажи и понять, что масштабировать дальше.",
    href: "/services/mvp-development",
    icon: Rocket,
  },
  {
    title: "AI-системы и нейросети",
    description:
      "Корпоративные ассистенты, база знаний, генерация контента и видео, внутренние AI-инструменты и автоматизация.",
    href: "/services/ai-systems",
    icon: Brain,
  },
];

const digitalBlocks = [
  {
    title: "Современные цифровые продукты",
    description:
      "Создаём клиентские интерфейсы, которые помогают продавать, записывать, бронировать, сопровождать и удерживать клиентов.",
    bullets: [
      "Telegram Mini App и клиентские кабинеты",
      "MVP для новых продуктов и рынков",
      "Персональные CRM и сервисные интерфейсы",
    ],
    href: "/services/mvp-development",
    icon: Layers3,
    image: "/images/home/digital-products.png",
    imageAlt: "3D-иллюстрация смартфона с интерфейсом Telegram Mini App",
  },
  {
    title: "AI-системы для бизнеса",
    description:
      "Подключаем AI не как модную витрину, а как рабочий слой над продажами, контентом, знаниями и внутренними действиями.",
    bullets: [
      "AI-агенты по заявкам и сервису",
      "База знаний и корпоративные ассистенты",
      "Генерация контента, видео и выжимок",
    ],
    href: "/services/ai-systems",
    icon: Brain,
    image: "/images/home/ai-systems.png",
    imageAlt: "Изометрическая иллюстрация AI-мозга и панели управления",
  },
  {
    title: "Инструменты для команды",
    description:
      "Разрабатываем рабочие инструменты для отделов продаж, маркетинга, HR и операционки, чтобы ускорять рутину и снижать потери.",
    bullets: [
      "Browser extensions под рабочие сценарии",
      "Контроль заявок, SLA и этапов",
      "Сбор данных и быстрые внутренние действия",
    ],
    href: "/services/browser-extensions",
    icon: ScanSearch,
    image: "/images/home/team-tools.png",
    imageAlt: "Изометрическая иллюстрация браузерного дашборда для команды",
  },
  {
    title: "Ранний вход в новые каналы",
    description:
      "Помогаем заходить в новые мессенджеры и цифровые ниши раньше конкурентов, но с понятной экономикой и моделью роста.",
    bullets: [
      "Решения для Max как раннего рынка",
      "Пилоты и быстрые проверки гипотез",
      "Подготовка к масштабированию канала",
    ],
    href: "/services/max-messenger",
    icon: Compass,
    image: "/images/home/new-channels.png",
    imageAlt: "Изометрическая иллюстрация компаса с тремя путями в новые каналы",
  },
];

const aiScenarios = [
  {
    title: "AI-агенты на входящем потоке",
    text: "Принимают запрос, уточняют задачу, квалифицируют лида и передают дальше не пустой контакт, а подготовленный кейс.",
  },
  {
    title: "AI-система на вашей базе знаний",
    text: "Собираем корпоративного ассистента на ваших документах, регламентах, FAQ и знаниях команды.",
  },
  {
    title: "Генерация контента и видео",
    text: "Помогаем быстрее собирать тексты, сценарии, ролики, промо и внутренние обучающие материалы.",
  },
  {
    title: "Поиск, классификация и действия",
    text: "AI находит информацию, сортирует обращения, формирует сводки, запускает внутренние задачи и сокращает рутину.",
  },
];

const launchBundles = [
  {
    title: "MVP + Mini App + CRM",
    text: "Быстрый запуск новой цифровой модели: проверяем гипотезу, даём клиенту удобный интерфейс и сразу строим внутреннюю опору для продаж.",
    links: [
      { label: "MVP", href: "/services/mvp-development" },
      { label: "Telegram Mini App", href: "/services/telegram-mini-app" },
      { label: "CRM", href: "/services/custom-crm" },
    ],
  },
  {
    title: "AI-агент + AI-система + CRM",
    text: "Связка для входящего потока, клиентского сервиса и внутренней команды: заявки, знания, статусы и автоматические действия в едином контуре.",
    links: [
      { label: "AI-агенты", href: "/services/ai-agents" },
      { label: "AI-системы", href: "/services/ai-systems" },
      { label: "CRM", href: "/services/custom-crm" },
    ],
  },
  {
    title: "Browser extension + отдел продаж",
    text: "Когда команде нужен внутренний инструмент для контроля заявок, подсказок, сбора данных и ускорения ежедневной работы.",
    links: [
      { label: "Расширения", href: "/services/browser-extensions" },
      { label: "AI-агенты", href: "/services/ai-agents" },
      { label: "Контроль продаж", href: "/services/marketing-strategy" },
    ],
  },
];

const growthServices = [
  {
    title: "Сайт под ключ",
    text: "Если нужен SEO-трафик, коммерческие страницы и сильная основа для роста цифрового продукта.",
    href: "/services/website-development",
    icon: Sparkles,
  },
  {
    title: "Яндекс.Директ",
    text: "Подключаем платный трафик, чтобы быстрее тестировать спрос и запускать новые digital-сценарии.",
    href: "/nastroyka-yandex-direct-tyumen",
    icon: LineChart,
  },
  {
    title: "План маркетинга",
    text: "Формулируем позиционирование, продуктовый контур, офферы и карту гипотез перед запуском.",
    href: "/services/marketing-strategy",
    icon: Target,
  },
  {
    title: "Веб-аналитика",
    text: "Привязываем новые продукты и интерфейсы к данным: заявки, этапы, цели, конверсия и источники.",
    href: "/services/web-analytics",
    icon: Workflow,
  },
];

const processSteps = [
  {
    step: "1",
    title: "Диагностика бизнеса",
    text: "Разбираем, где нужен рост: продажи, сервис, запись, внутренняя рутина или новый рынок.",
  },
  {
    step: "2",
    title: "Архитектура решения",
    text: "Собираем состав продукта: MVP, Mini App, CRM, AI-модуль, расширение или связку нескольких решений.",
  },
  {
    step: "3",
    title: "Сборка и интеграции",
    text: "Подключаем интерфейс, формы, статусы, уведомления, аналитику, CRM и внутренние действия.",
  },
  {
    step: "4",
    title: "Запуск на реальных данных",
    text: "Проверяем путь клиента, скорость команды, качество обработки и быстро докручиваем рабочие связки.",
  },
];

const complianceFocus = [
  {
    title: "Домен и регистратор",
    text: "Проверяем, где живёт домен, кто администратор и что лучше заранее привести в порядок, чтобы рабочий сайт не зависел от хаоса в доступах и продлении.",
    icon: Globe,
  },
  {
    title: "Персональные данные и формы",
    text: "Смотрим, как сайт, формы, CRM, аналитика и мессенджеры собирают данные клиента, и помогаем привести этот маршрут к более чистой и понятной схеме.",
    icon: ShieldCheck,
  },
  {
    title: "Публичные тексты и интерфейсы",
    text: "Проверяем страницы услуг, кнопки, карточки, заголовки и публичные формулировки, чтобы сайт оставался сильным и аккуратным по смыслу и подаче.",
    icon: Languages,
  },
];

const Index = () => {
  return (
    <Layout
      title="CentrLP — центр цифрового консалтинга, сайты, CRM и заявки | Тюмень"
      description="CentrLP — центр цифрового консалтинга в Тюмени: проверка сайта и пути заявки за 48 часов, доработка форм и Метрики, CRM, AI-агенты, сайты и цифровые продукты для бизнеса."
    >
      <Hero />

      <section id="services" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Что мы запускаем для бизнеса сейчас</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Делаем не только сайты и рекламу. Собираем современные цифровые продукты, которые продают, обслуживают клиентов и упрощают внутреннюю работу команды.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {primaryProducts.map((item) => (
              <Card key={item.href} className="p-6 shadow-card hover-scale h-full flex flex-col">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{item.description}</p>
                <Button variant="outline" asChild>
                  <Link to={item.href}>Открыть услугу</Link>
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link to="/services">
                Все услуги и направления <Rocket className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Современные цифровые продукты</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Отдельный продукт, клиентский кабинет, Mini App, CRM или внутренний инструмент команды. Подбираем формат не под хайп, а под задачу бизнеса.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {digitalBlocks.map((item) => (
              <Card key={item.href} className="shadow-card bg-card h-full overflow-hidden flex flex-col">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#0096D6]/10 via-white to-[#44B78B]/10">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{item.description}</p>
                <ul className="space-y-3 mb-8">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start">
                      <Sparkles className="w-4 h-4 text-accent-2 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" asChild>
                  <Link to={item.href}>Подробнее</Link>
                </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">AI-системы и нейросети для бизнеса</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Добавляем AI туда, где он действительно даёт эффект: заявки, ответы, база знаний, контент, видео, поиск информации и внутренние действия.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {aiScenarios.map((item) => (
              <Card key={item.title} className="p-6 shadow-card text-center h-full">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link to="/services/ai-systems">AI-системы</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/services/ai-agents">AI-агенты</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-2 text-sm font-semibold text-[#0096D6]">
              Следим за новыми требованиями и помогаем внедрять правки в сайт
            </div>
            <h2 className="mb-4">CentrLP помогает не только запускать digital-продукты, но и вовремя приводить сайт и процессы в порядок</h2>
            <p className="text-xl text-muted-foreground">
              Это наш дополнительный сильный оффер: проверяем домен, формы, персональные данные,
              публичные тексты и цифровой маршрут заявки, а затем помогаем быстро внести нужные изменения.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {complianceFocus.map((item) => (
              <Card key={item.title} className="p-7 shadow-card h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground flex-1">{item.text}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/services/compliance-2026">Открыть проверку сайта по персональным данным</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">MVP, мини-приложения и CRM как единая связка</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Если нужно быстро запустить новый продукт или перестроить путь клиента, мы собираем не отдельный экран, а рабочую систему из интерфейса, логики и внутренних процессов.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {launchBundles.map((item) => (
              <Card key={item.title} className="p-8 shadow-card bg-card h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{item.text}</p>
                <div className="flex flex-wrap gap-3">
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="rounded-full border border-primary/20 px-3 py-2 text-sm text-primary hover:bg-primary/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Усиливаем запуск маркетингом, планом продвижения и аналитикой</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Новые продукты лучше растут, когда у них есть сильная посадочная, трафик, понятная цена входа, аналитика и план маркетинга с приоритетами.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {growthServices.map((item) => (
              <Card key={item.href} className="p-6 shadow-card h-full flex flex-col">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{item.text}</p>
                <Button variant="outline" asChild>
                  <Link to={item.href}>Подробнее</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Как мы работаем</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Сначала понимаем, какая цифровая система действительно нужна бизнесу, потом собираем её, запускаем и усиливаем по данным.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((item) => (
              <Card key={item.step} className="p-6 shadow-card bg-card text-center h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-2 text-sm font-semibold text-[#0096D6]">
              Быстрый разбор проекта
            </div>
            <h2 className="mb-4">Нужны заявки и понятный цифровой сценарий уже сейчас?</h2>
            <p className="text-xl text-muted-foreground">
              Оставьте контакт, и мы предложим 2-3 рабочих варианта под вашу задачу:
              Telegram, AI, CRM, сайт, реклама или связку из них.
            </p>
          </div>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              Ответ обычно в течение 15 минут
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              Подскажем самый короткий путь к заявкам
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              Без длинных презентаций и абстракции
            </span>
          </div>
          <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://t.me/centrlp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#0096D6]/15 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-[#0096D6]/40 hover:text-[#0096D6]"
              data-metric="messenger-click"
              onClick={() => trackMetric("messenger_click_fastlane", { placement: "home_form", messenger: "telegram" })}
            >
              <MessageSquare className="h-4 w-4" />
              Написать в Telegram
            </a>
            <a
              href="tel:+79058248564"
              className="inline-flex items-center gap-2 rounded-xl border border-[#44B78B]/20 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-[#44B78B]/40 hover:text-[#44B78B]"
              data-metric="phone-click"
              onClick={() => trackMetric("phone_click_fastlane", { placement: "home_form" })}
            >
              <PhoneCall className="h-4 w-4" />
              Позвонить сейчас
            </a>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
