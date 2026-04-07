import { Layout } from "@/components/Layout";
import { useAutoBreadcrumb } from "@/components/SeoSchemas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Bot,
  Brain,
  BriefcaseBusiness,
  Chrome,
  Compass,
  FileText,
  Globe,
  LineChart,
  MessageSquare,
  Palette,
  Rocket,
  ScanSearch,
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
};

const productServices: ServiceCard[] = [
  {
    title: "Telegram Mini App",
    description: "Интерфейс продаж, заявок, записи, бронирования и личного кабинета прямо внутри Telegram.",
    href: "/services/telegram-mini-app",
    bullets: ["Заявки и запись", "Кабинет клиента", "Интеграция с CRM"],
    icon: MessageSquare,
  },
  {
    title: "Решения для Max",
    description: "Ранний вход в новый мессенджер с понятной моделью продаж, сервиса и проверки гипотез.",
    href: "/services/max-messenger",
    bullets: ["Новый канал продаж", "Пилоты и сценарии", "Подготовка к росту"],
    icon: Compass,
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
  },
];

const aiServices: ServiceCard[] = [
  {
    title: "AI-агенты",
    description: "Агенты для обработки заявок, ответов, классификации, внутренних действий и помощи команде.",
    href: "/services/ai-agents",
    bullets: ["Входящий поток", "Help-сценарии", "Внутренние действия"],
    icon: Bot,
  },
  {
    title: "AI-системы и нейросети",
    description: "Корпоративные ассистенты, база знаний, генерация контента и видео, внутренние AI-модули.",
    href: "/services/ai-systems",
    bullets: ["База знаний", "Контент и видео", "Поиск и классификация"],
    icon: Brain,
  },
  {
    title: "Чат-бот ВК и сайт",
    description: "Сценарии для консультации, заявок и первичной квалификации клиентов в ваших текущих каналах.",
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

const renderGroup = (title: string, description: string, cards: ServiceCard[]) => (
  <section className="py-20 bg-card" key={title}>
    <div className="container mx-auto px-4">
      <div className="mb-12 max-w-3xl">
        <h2 className="mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {cards.map((item) => (
          <Card key={item.href} className="p-8 shadow-card h-full flex flex-col">
            <item.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-muted-foreground mb-6">{item.description}</p>
            <ul className="space-y-3 mb-8 flex-1">
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
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Services = () => {
  useAutoBreadcrumb("Услуги");

  return (
    <Layout
      title="Услуги CentrLP — Telegram Mini App, AI-агенты, CRM, MVP, сайты и запуск | Тюмень"
      description="Услуги CentrLP: Telegram Mini App, решения для Max, browser extensions, AI-агенты, AI-системы, персональные CRM, MVP, сайты, Яндекс.Директ, аналитика и упаковка."
    >
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Услуги CentrLP</h1>
            <p className="text-xl text-muted-foreground">
              Запускаем современные цифровые продукты для бизнеса: клиентские интерфейсы, AI-системы,
              CRM, внутренние инструменты команды и рост через сайт, трафик и аналитику.
            </p>
          </div>
        </div>
      </section>

      {renderGroup(
        "Современные цифровые продукты",
        "Этот блок для тех, кому нужен не просто сайт, а рабочий цифровой инструмент: Mini App, MVP, CRM, ранний заход в новый канал или внутренний сервис команды.",
        productServices,
      )}

      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4">AI-системы и автоматизация</h2>
            <p className="text-lg text-muted-foreground">
              Отдельные AI-агенты, корпоративные AI-системы, чат-боты, автоответы и внутренние сценарии, которые сокращают рутину и ускоряют работу команды.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {aiServices.map((item) => (
              <Card key={item.href} className="p-8 shadow-card bg-card h-full flex flex-col">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground mb-6">{item.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
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

      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4">Упаковка, дизайн и смысловая часть</h2>
            <p className="text-lg text-muted-foreground">
              Чтобы новый цифровой продукт не выглядел сырым и непонятным, усиливаем его дизайном, неймингом, текстами и продающей упаковкой.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {packagingServices.map((item) => (
              <Card key={item.href} className="p-8 shadow-card bg-card h-full flex flex-col">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground mb-6">{item.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
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
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6">Нужен не набор услуг, а рабочая цифровая система?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Можем собрать связку из Mini App, CRM, AI-агента, сайта, трафика и аналитики под вашу задачу: продажи, сервис, внутренние процессы или новый рынок.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
