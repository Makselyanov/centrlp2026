import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calculator,
  Camera,
  CheckCircle2,
  ExternalLink,
  FileText,
  Layers3,
  MessageSquare,
  Mic,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAutoBreadcrumb, useItemListSchema } from "@/components/SeoSchemas";
import { cn } from "@/lib/utils";

type ProjectCategory = "all" | "sites" | "automation" | "support";

interface ProjectScreen {
  src: string;
  video?: string;
  title: string;
  note: string;
  aspect?: "wide" | "tall";
}

interface ProjectStrength {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface Project {
  title: string;
  category: Exclude<ProjectCategory, "all">;
  categoryLabel: string;
  shortTitle: string;
  lead: string;
  summary: string;
  challenge: string;
  work: string;
  result: string;
  url?: string;
  screens: ProjectScreen[];
  stats: Array<{ label: string; value: string }>;
  strengths: ProjectStrength[];
  tags: string[];
}

const brandGradient =
  "bg-[linear-gradient(135deg,#007DB3_0%,#0096D6_38%,#44B78B_100%)] bg-clip-text text-transparent";

const filters: Array<{ id: ProjectCategory; label: string; icon: LucideIcon }> = [
  { id: "all", label: "Все работы", icon: Layers3 },
  { id: "sites", label: "Сайты и каталоги", icon: Search },
  { id: "automation", label: "Системы и заявки", icon: Bot },
  { id: "support", label: "Сопровождение", icon: MessageSquare },
];

const projects: Project[] = [
  {
    title: "Росомаха",
    category: "sites",
    categoryLabel: "Коммерческий каталог",
    shortTitle: "Каталог техники, который ведет к заявке",
    lead: "Сложный товарный сайт для покупателей, дилеров и поисковых страниц.",
    summary:
      "У техники много характеристик, комплектаций, регионов и вопросов. Мы собрали подачу так, чтобы человек мог сравнить модели, понять преимущества, перейти к расчету и не потеряться в деталях.",
    challenge:
      "Покупателю нужно сравнить модели и сценарии применения, а компании важно получать не случайные сообщения, а предметные обращения по технике.",
    work:
      "Собрали структуру каталога, карточки моделей, разделы доверия, переходы к расчету, страницы для дилеров и поисковые точки входа.",
    result:
      "Сайт показывает технику не общей витриной, а понятным маршрутом выбора: модель, характеристики, цена, регион, доставка и обращение.",
    url: "https://xn--80aa8ahaki9a.site",
    screens: [
      {
        src: "/projects/gallery/rosomaha-hero.jpg",
        title: "Первый экран",
        note: "Каталог и расчет видны сразу, без поиска нужной кнопки.",
      },
      {
        src: "/projects/gallery/rosomaha-models.jpg",
        title: "Доверие перед выбором",
        note: "Преимущества помогают объяснить сложную покупку до просмотра моделей.",
      },
      {
        src: "/projects/gallery/rosomaha-dealers.jpg",
        title: "Карточки моделей",
        note: "Покупатель видит фото, комплектацию, наличие, цену и переход к подробностям.",
      },
    ],
    stats: [
      { label: "тип проекта", value: "каталог" },
      { label: "модели и разделы", value: "много" },
      { label: "цель", value: "заявка" },
    ],
    strengths: [
      {
        icon: Search,
        title: "Выбор без путаницы",
        text: "Модели, характеристики и цены разложены так, чтобы покупатель быстрее понял разницу.",
      },
      {
        icon: Shield,
        title: "Доверие до формы",
        text: "Перед обращением человек видит производство, доставку, гарантию и причины выбрать компанию.",
      },
      {
        icon: TrendingUp,
        title: "Страницы под поиск",
        text: "Каталог и информационные разделы дают больше точек входа из поиска.",
      },
    ],
    tags: ["каталог", "техника", "поиск", "заявки"],
  },
  {
    title: "МеталлТех",
    category: "sites",
    categoryLabel: "Производственный сайт",
    shortTitle: "Производственный сайт с нуля",
    lead: "Бренд, структура, каталог продукции и маршрут до расчета.",
    summary:
      "Проект для производственного бизнеса, где важны не громкие обещания, а понятный путь от первого экрана до обращения: что компания делает, какие изделия выпускает, почему ей можно доверить чертеж и как быстро выйти на расчет.",
    challenge:
      "Новое направление нужно было вывести как самостоятельный бренд, а не как случайную страницу внутри старого бизнеса.",
    work:
      "Собрали название, логотип, визуальный стиль, структуру сайта, каталог, страницы услуг, блоки доверия и сценарии обращения.",
    result:
      "Получился сайт, который объясняет производство языком заказчика: изделия, услуги, сертификаты, примеры и понятная заявка.",
    url: "https://xn----7sboc2ad7bd2a.xn--p1ai/",
    screens: [
      {
        src: "/projects/gallery/metallteh-hero.jpg",
        title: "Первый экран",
        note: "Сразу считываются производство, город, мощность и действие для расчета.",
      },
      {
        src: "/projects/gallery/metallteh-catalog.jpg",
        title: "Каталог изделий",
        note: "Категории помогают найти типовую позицию или перейти к нестандартной задаче.",
      },
      {
        src: "/projects/gallery/metallteh-production.jpg",
        title: "Производство",
        note: "Отдельный раздел показывает цех, оборудование и маршрут изготовления.",
      },
    ],
    stats: [
      { label: "категорий продукции", value: "9+" },
      { label: "разделы услуг", value: "много" },
      { label: "бренд", value: "с нуля" },
    ],
    strengths: [
      {
        icon: Sparkles,
        title: "Собранный образ",
        text: "Название, знак, цвет и тон сайта работают как единый производственный бренд.",
      },
      {
        icon: Wrench,
        title: "Структура под расчет",
        text: "Продукция, услуги и производство ведут к понятному обращению по чертежу или задаче.",
      },
      {
        icon: FileText,
        title: "Содержание для поиска",
        text: "Категории и услуги превращены в отдельные страницы, которые можно развивать дальше.",
      },
    ],
    tags: ["производство", "бренд", "каталог", "расчет"],
  },
  {
    title: "CRM CentrLP",
    category: "automation",
    categoryLabel: "Система заявок",
    shortTitle: "Заявки и задачи без потерь",
    lead: "Собственная система учета, где обращение не теряется после формы.",
    summary:
      "Мы используем собственную систему управления заявками, чтобы работа не жила только в переписках и таблицах. В ней видны клиенты, сделки, задачи, статусы, источники обращений и следующий шаг по каждому контакту.",
    challenge:
      "Когда проектов, каналов и обращений становится больше, ручное управление начинает терять заявки, сроки и ответственность.",
    work:
      "Собрали учет клиентов, сделок, задач, отчетов, автоматизаций и связь с сайтами. Закрытые клиентские данные в публичном портфолио не показываем.",
    result:
      "Работа становится прозрачнее: видно, откуда пришел контакт, что с ним происходит и какие действия нужны дальше.",
    url: "https://crm.centrlp.ru/",
    screens: [
      {
        src: "/projects/gallery/crm-hero.jpg",
        video: "/projects/gallery/crm-hero.webm",
        title: "Живая витрина",
        note: "Движение интерфейса показывает, что система реагирует на действия, а не остается плоской картинкой.",
        aspect: "tall",
      },
      {
        src: "/projects/gallery/crm-route.jpg",
        title: "Путь заявки",
        note: "Источник, контекст, задача, сделка и контроль соединены в один процесс.",
      },
      {
        src: "/projects/gallery/crm-modules.jpg",
        title: "Места потерь",
        note: "Показано, где обращения обычно выпадают между людьми и действиями.",
      },
    ],
    stats: [
      { label: "контур", value: "заявки" },
      { label: "контроль", value: "задачи" },
      { label: "данные", value: "бережно" },
    ],
    strengths: [
      {
        icon: BarChart3,
        title: "Видно движение",
        text: "Заявка получает статус, ответственного и следующий шаг, а не остается в переписке.",
      },
      {
        icon: Zap,
        title: "Меньше ручной работы",
        text: "Повторяющиеся действия можно связать с формами, звонками и задачами.",
      },
      {
        icon: Shield,
        title: "Без лишнего раскрытия",
        text: "Публично показываем только безопасные экраны и не выносим настоящие сделки наружу.",
      },
    ],
    tags: ["заявки", "задачи", "отчеты", "автоматизация"],
  },
  {
    title: "SVRQ.ru",
    category: "automation",
    categoryLabel: "Расчет заявок",
    shortTitle: "Расчет сварочных работ по фото, голосу и тексту",
    lead: "Сервис помогает мастеру быстрее понять задачу и подготовить предложение.",
    summary:
      "SVRQ показывает, как нейросеть можно встроить ради конкретной рабочей задачи: быстрее принять вводные, посчитать работу, собрать предложение и вести обращение в понятном процессе.",
    challenge:
      "Мастеру нужно быстро оценивать разные заявки, не теряя время на переписку, ручные расчеты и оформление предложения.",
    work:
      "Собрали прием фото, голоса и текста, разбор задачи, расчет стоимости, подготовку предложения и управление обращениями.",
    result:
      "Заявка проходит путь от описания до готового предложения быстрее, а мастер получает управляемый процесс вместо ручной рутины.",
    url: "https://svrq.ru",
    screens: [
      {
        src: "/projects/gallery/svrq-hero.jpg",
        title: "Первый экран",
        note: "Сразу объяснено, из каких источников приходит заявка и куда она попадает.",
      },
      {
        src: "/projects/gallery/svrq-input.jpg",
        title: "Путь обращения",
        note: "Показан переход от первого запроса к заявке в кабинете.",
      },
      {
        src: "/projects/gallery/svrq-result.jpg",
        title: "Расчет",
        note: "Заявка доводится до стоимости и понятного предложения.",
      },
    ],
    stats: [
      { label: "пробный расчет", value: "<10 сек" },
      { label: "источники", value: "несколько" },
      { label: "цель", value: "расчет" },
    ],
    strengths: [
      {
        icon: Mic,
        title: "Разные вводные",
        text: "Фото, голос и текст помогают принять задачу так, как ее удобно описать клиенту.",
      },
      {
        icon: Calculator,
        title: "Быстрый расчет",
        text: "Сервис помогает быстрее перейти от описания к оценке стоимости.",
      },
      {
        icon: FileText,
        title: "Готовое предложение",
        text: "Результат можно превратить в понятный документ для клиента.",
      },
    ],
    tags: ["расчет", "нейросеть", "заявки", "документы"],
  },
  {
    title: "КЛНГ.РФ",
    category: "automation",
    categoryLabel: "Автоматизация услуг",
    shortTitle: "Уборка: заявка, расчет, предложение",
    lead: "Путь обращения для клининга: от первого сообщения до стоимости.",
    summary:
      "Для клининга важны скорость ответа и точность расчета. Проект собран вокруг простой идеи: клиент описывает задачу, система помогает принять ее, посчитать стоимость и довести до оформленного предложения.",
    challenge:
      "Заявки приходят из разных каналов, а менеджеру приходится вручную уточнять детали, считать стоимость и собирать предложение.",
    work:
      "Подготовили прием обращений, расчет стоимости, формирование предложения, учет заказов и связь с каналами заявок.",
    result:
      "Компания получает более быстрый ответ клиенту и меньше ручной работы на однотипных обращениях.",
    url: "https://xn--c1andi.xn--p1ai",
    screens: [
      {
        src: "/projects/gallery/klng-hero.jpg",
        title: "Первый экран",
        note: "Показывает источники заявок и обещание быстрого расчета.",
      },
      {
        src: "/projects/gallery/klng-calc.jpg",
        title: "Путь заявки",
        note: "Звонок или сообщение превращаются в расчет и дальнейшее действие.",
      },
      {
        src: "/projects/gallery/klng-flow.jpg",
        title: "До оплаты",
        note: "Процесс объяснен шагами: обращение, расчет, предложение, согласование.",
      },
    ],
    stats: [
      { label: "источники", value: "7+" },
      { label: "ответ", value: "24/7" },
      { label: "контур", value: "1" },
    ],
    strengths: [
      {
        icon: Bot,
        title: "Прием обращений",
        text: "Система не зависит от одного канала и помогает не пропускать запросы.",
      },
      {
        icon: Calculator,
        title: "Стоимость быстрее",
        text: "Расчет строится по параметрам услуги, а не только по долгой переписке.",
      },
      {
        icon: MessageSquare,
        title: "Понятный следующий шаг",
        text: "После обращения видно, что нужно уточнить и как довести клиента до решения.",
      },
    ],
    tags: ["клининг", "заявки", "расчет", "процесс"],
  },
  {
    title: "КлинингСервисХМ",
    category: "support",
    categoryLabel: "Долгое сопровождение",
    shortTitle: "Два года единой подачи услуг",
    lead: "Сайт, страницы услуг и ровная подача компании для двух городов.",
    summary:
      "Здесь ценность была не в разовом запуске, а в регулярности. Клининговой компании важно выглядеть спокойно, чисто и надежно каждый день: на сайте, в описании услуг и в первом касании с клиентом.",
    challenge:
      "Компания работала сразу в двух городах, а коммуникация должна была оставаться единой, узнаваемой и не похожей на набор случайных публикаций.",
    work:
      "Выстроили визуальную дисциплину, подачу услуг, страницы с условиями, доверительные блоки и регулярное присутствие.",
    result:
      "Бренд выглядел собранно и стабильно: клиент видел не хаос, а сервис, которому можно доверить квартиру, дом или офис.",
    url: "https://cs-hm.ru/",
    screens: [
      {
        src: "/projects/gallery/cshm-hero.jpg",
        title: "Первый экран",
        note: "Сразу видны услуга, города работы, телефон, кнопки и путь к расчету.",
        aspect: "tall",
      },
      {
        src: "/projects/gallery/cshm-services.jpg",
        title: "Условия и доверие",
        note: "Цены, сроки, рейтинг и опыт собраны рядом, чтобы снизить тревогу клиента.",
      },
      {
        src: "/projects/gallery/cshm-proof.jpg",
        title: "Страницы услуг",
        note: "Сайт объясняет, что входит в уборку и почему компании можно доверять.",
      },
    ],
    stats: [
      { label: "срок работы", value: "2 года" },
      { label: "города", value: "2" },
      { label: "формат", value: "сайт" },
    ],
    strengths: [
      {
        icon: Camera,
        title: "Живая услуга",
        text: "Визуальная подача не спорит с темой чистоты и доверия.",
      },
      {
        icon: Shield,
        title: "Снятие риска",
        text: "Клиент видит рейтинг, опыт, понятные условия и не остается один на один с сомнениями.",
      },
      {
        icon: TrendingUp,
        title: "Ровное присутствие",
        text: "Проект держится не на одном запуске, а на аккуратной подаче услуги во времени.",
      },
    ],
    tags: ["клининг", "сайт", "доверие", "сопровождение"],
  },
];

const proofPoints = [
  {
    icon: Search,
    title: "Сайт ведет к обращению",
    text: "Структура, разделы, формы и доверительные блоки собираются вокруг действия: оставить заявку, запросить расчет или перейти к выбору.",
  },
  {
    icon: FileText,
    title: "Поиск заложен в структуру",
    text: "Модели, услуги, регионы, характеристики и частые вопросы превращаются в отдельные понятные страницы.",
  },
  {
    icon: BarChart3,
    title: "Заявка остается в работе",
    text: "После отправки формы обращение попадает в учет: видно источник, задачу, ответственного и следующий шаг.",
  },
  {
    icon: Calculator,
    title: "Расчет можно ускорить",
    text: "Фото, голос, текст и параметры помогают быстрее собрать исходные данные и подготовить предложение.",
  },
];

const summary = [
  { value: "6", label: "публичных работ" },
  { value: "18", label: "экранов в разборе" },
  { value: "1", label: "система заявок" },
];

const heroReel: Array<{ src: string; video?: string; title: string; text: string }> = [
  {
    src: "/projects/gallery/rosomaha-dealers.jpg",
    title: "Каталог",
    text: "модели, цены и переход к заявке",
  },
  {
    src: "/projects/gallery/metallteh-catalog.jpg",
    title: "Производство",
    text: "категории изделий и расчет",
  },
  {
    src: "/projects/gallery/crm-hero.jpg",
    video: "/projects/gallery/crm-hero.webm",
    title: "CRM",
    text: "заявки, звонки и контроль",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const startPreviewVideo = (video: HTMLVideoElement) => {
  void video.play().catch(() => undefined);
};

const BrowserFrame = ({
  screen,
  featured = false,
  eager = false,
}: {
  screen: ProjectScreen;
  featured?: boolean;
  eager?: boolean;
}) => (
  <figure
    className={cn(
      "overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow duration-300",
      featured ? "shadow-lg shadow-slate-200/75 ring-1 ring-[#0096D6]/10" : "",
    )}
  >
    <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#44B78B]" />
      <span className="ml-2 truncate text-xs font-medium text-slate-500">{screen.title}</span>
    </div>
    <div className={cn("relative bg-slate-950", screen.aspect === "tall" ? "aspect-[3/2]" : "aspect-[2/1]")}>
      {screen.video ? (
        <>
          <video
            className="h-full w-full object-contain object-top"
            poster={screen.src}
            autoPlay
            muted
            loop
            playsInline
            preload={eager ? "auto" : "metadata"}
            onCanPlay={(event) => startPreviewVideo(event.currentTarget)}
            onMouseEnter={(event) => startPreviewVideo(event.currentTarget)}
          >
            <source src={screen.video} type="video/webm" />
          </video>
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#007DB3] shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            видео
          </div>
        </>
      ) : (
        <img
          src={screen.src}
          alt={`${screen.title} проекта CentrLP`}
          className="h-full w-full object-contain object-top"
          loading={eager ? "eager" : "lazy"}
        />
      )}
    </div>
    <figcaption className="border-t border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold text-slate-950">{screen.title}</div>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{screen.note}</p>
    </figcaption>
  </figure>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  useAutoBreadcrumb("Проекты");

  const itemListSchema = useMemo(
    () =>
      projects.map((project) => ({
        name: project.title,
        description: `${project.shortTitle}. ${project.lead}`,
        url: project.url,
        image: `https://centrlp.ru${project.screens[0].src}`,
      })),
    [],
  );

  useItemListSchema(itemListSchema, "https://centrlp.ru/projects", "Проекты CentrLP");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <Layout
      title="Проекты CentrLP — сайты, каталоги, системы заявок и сопровождение"
      description="Портфолио CentrLP: сайты, каталоги, системы заявок и автоматизация. Показываем несколько экранов и задачу, которую закрывает каждый проект."
    >
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-[#0096D6]/[0.035] to-white pt-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.035]" />
        <div className="container relative mx-auto px-4 pb-14 md:pb-18">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/15 bg-white/85 px-4 py-2 text-sm font-semibold text-[#0096D6] shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Работы, которые можно открыть и разобрать
            </div>
            <h1 className={cn("text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl", brandGradient)}>
              Проекты CentrLP: сайты, сервисы и системы, которые доводят до заявки
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Показываем работы не одним обрезанным кадром, а несколькими экранами: первый контакт, структура, доверие, расчет и путь обращения.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mx-auto mt-10 grid max-w-6xl gap-4 lg:grid-cols-[1.05fr_0.9fr_1.05fr] lg:items-start"
          >
            {heroReel.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-200/70",
                  index === 1 && "lg:mt-10",
                )}
              >
                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#44B78B]" />
                  <span className="ml-2 truncate text-xs font-semibold text-slate-500">{item.title}</span>
                </div>
                <div className="relative aspect-[16/10] bg-slate-950 p-2">
                  {item.video ? (
                    <>
                      <video
                        className="h-full w-full rounded-md object-contain object-top"
                        poster={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onCanPlay={(event) => startPreviewVideo(event.currentTarget)}
                        onMouseEnter={(event) => startPreviewVideo(event.currentTarget)}
                      >
                        <source src={item.video} type="video/webm" />
                      </video>
                      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#007DB3] shadow-sm">
                        движение
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={`${item.title} проекта CentrLP`}
                      className="h-full w-full rounded-md object-contain object-top transition-transform duration-500 group-hover:scale-[1.015]"
                      loading="eager"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <div className="text-sm font-bold text-slate-950">{item.title}</div>
                  <div className="text-right text-xs leading-snug text-slate-500">{item.text}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3"
          >
            {summary.map((item) => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-white/90 p-4 text-center shadow-sm">
                <div className={cn("text-3xl font-bold", brandGradient)}>{item.value}</div>
                <div className="mt-1 text-sm leading-snug text-slate-600">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "border-transparent bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)] text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-[#0096D6]/40 hover:bg-[#0096D6]/5",
                  )}
                  aria-pressed={isActive}
                >
                  <Icon className="h-4 w-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50/70 py-14 md:py-18">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0096D6]">
              <span className="h-px w-8 bg-[#0096D6]" />
              Что видно по этим работам
            </div>
            <h2 className="border-l-[3px] border-[#0096D6] pl-4 text-[28px] font-bold tracking-tight text-slate-950 md:text-[34px]">
              Сайт, поиск и учет заявки должны работать вместе
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((point) => {
              const Icon = point.icon;

              return (
                <Card key={point.title} className="rounded-lg border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{point.text}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div layout className="grid gap-10">
            {visibleProjects.map((project, index) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.035, 0.12) }}
              >
                <Card className="overflow-hidden rounded-lg border-slate-200 bg-white shadow-sm">
                  <div className="grid gap-8 p-5 md:p-7 lg:grid-cols-[0.86fr_1.14fr] lg:p-9">
                    <div className="flex flex-col">
                      <div>
                        <div className="mb-4 inline-flex rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-3 py-1.5 text-xs font-semibold text-[#0096D6]">
                          {project.categoryLabel}
                        </div>
                        <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
                          {project.title}
                        </h2>
                        <p className={cn("mt-3 text-xl font-bold leading-snug", brandGradient)}>
                          {project.shortTitle}
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                          {project.summary}
                        </p>
                      </div>

                      <div className="mt-7 grid gap-3 sm:grid-cols-3">
                        {project.stats.map((stat) => (
                          <div key={stat.label} className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
                            <div className={cn("text-2xl font-bold", brandGradient)}>{stat.value}</div>
                            <div className="mt-1 text-xs leading-snug text-slate-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 grid gap-3">
                        {project.strengths.map((strength) => {
                          const Icon = strength.icon;

                          return (
                            <div key={strength.title} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-950">{strength.title}</div>
                                <p className="mt-1 text-sm leading-relaxed text-slate-600">{strength.text}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-7 grid gap-4 border-y border-slate-200 py-6">
                        {[
                          ["Задача", project.challenge],
                          ["Что сделали", project.work],
                          ["Результат", project.result],
                        ].map(([title, text]) => (
                          <div key={title}>
                            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{title}</div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-700">{text}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0096D6]/20 bg-white px-4 py-2 text-sm font-semibold text-[#007DB3] shadow-sm transition-colors hover:bg-[#0096D6]/5"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Открыть проект
                          </a>
                        )}
                        <Link to="/contacts" className="inline-flex">
                          <Button variant="outline" className="gap-2 rounded-lg" data-metric="projects_discuss_similar_click">
                            Обсудить похожую задачу
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="grid content-start gap-4 rounded-lg border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-[#0096D6]/[0.06] p-3 md:p-4">
                      <BrowserFrame screen={project.screens[0]} featured eager={index < 2} />
                      <div className="grid gap-4 md:grid-cols-2">
                        {project.screens.slice(1).map((screen) => (
                          <BrowserFrame key={screen.src} screen={screen} eager={index < 1} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-gradient-to-br from-[#0096D6]/5 via-white to-[#44B78B]/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white shadow-sm">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h2 className={cn("text-3xl font-bold leading-tight md:text-4xl", brandGradient)}>
              Есть задача для сайта, заявок или поиска?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Покажите продукт, услугу и текущий путь обращения. Разберем, какие страницы нужны, что должно попадать в учет и где можно убрать ручную работу.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contacts">
                <Button size="lg" className="gap-2 rounded-lg" data-metric="projects_final_contact_click">
                  Обсудить задачу
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/prices">
                <Button size="lg" variant="outline" className="rounded-lg" data-metric="projects_prices_click">
                  Посмотреть стоимость
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
