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

interface Project {
  title: string;
  category: Exclude<ProjectCategory, "all">;
  categoryLabel: string;
  headline: string;
  subtitle: string;
  image: string;
  description: string;
  challenge: string;
  work: string;
  result: string;
  gradient: string;
  bgGradient: string;
  url?: string;
  stats: Array<{ label: string; value: string }>;
  features: Array<{ icon: LucideIcon; text: string }>;
  tags: string[];
}

const filters: Array<{ id: ProjectCategory; label: string; icon: LucideIcon }> = [
  { id: "all", label: "Все работы", icon: Layers3 },
  { id: "sites", label: "Сайты и каталоги", icon: Search },
  { id: "automation", label: "ИИ и заявки", icon: Bot },
  { id: "support", label: "Сопровождение", icon: MessageSquare },
];

const projects: Project[] = [
  {
    title: "МеталлТех",
    category: "sites",
    categoryLabel: "Производственный сайт",
    headline: "С нуля собрали бренд и коммерческую упаковку для нового направления",
    subtitle: "Логотип, структура сайта, каталог продукции и страницы под заявки",
    image: "/projects/metallteh-case.png",
    description:
      "Проект для производственного бизнеса, где важны не красивые обещания, а понятный путь от первого просмотра до обращения: что компания делает, какие есть услуги, почему ей можно доверить чертеж и как быстро выйти на расчет.",
    challenge:
      "Новое направление нужно было вывести как самостоятельный бренд, а не как случайную страницу внутри старого бизнеса.",
    work:
      "Собрали название, логотип, визуальный стиль, структуру сайта, каталог, страницы услуг, блоки доверия и сценарии обращения.",
    result:
      "Получился сайт, который объясняет производство языком заказчика: изделия, услуги, сертификаты, примеры и понятная заявка.",
    gradient: "from-red-500 to-orange-600",
    bgGradient: "from-red-500/5 to-orange-600/5",
    url: "https://xn----7sboc2ad7bd2a.xn--p1ai/",
    stats: [
      { label: "категорий продукции", value: "9" },
      { label: "страницы услуг", value: "4" },
      { label: "бренд", value: "с нуля" },
    ],
    features: [
      { icon: Sparkles, text: "Нейминг, логотип и индустриальная подача" },
      { icon: Wrench, text: "Структура под производственные заявки" },
      { icon: FileText, text: "Каталог, услуги, сертификаты и ответы на вопросы" },
      { icon: Calculator, text: "Путь до расчета без лишних шагов" },
    ],
    tags: ["производство", "бренд", "каталог", "поисковые страницы"],
  },
  {
    title: "КлинингСервисХМ",
    category: "support",
    categoryLabel: "Долгое сопровождение",
    headline: "Два года удерживали бренд в аккуратной коммерческой коммуникации",
    subtitle: "Сайт, соцсети и единая подача услуг для двух городов",
    image: "/projects/cshm-case.png",
    description:
      "Здесь ценность была не в разовом запуске, а в регулярности. Клининговой компании важно выглядеть спокойно, чисто и надежно каждый день: в постах, на сайте, в описании услуг и в первом касании с клиентом.",
    challenge:
      "Компания работала сразу в двух городах, а коммуникация должна была оставаться единой, узнаваемой и не похожей на набор случайных публикаций.",
    work:
      "Выстроили ритм публикаций, визуальную дисциплину, подачу услуг и связали контент с коммерческими страницами.",
    result:
      "Бренд выглядел собранно и стабильно: клиент видел не хаос, а сервис, которому можно доверить квартиру, дом или офис.",
    gradient: "from-cyan-500 to-sky-600",
    bgGradient: "from-cyan-500/5 to-sky-600/5",
    url: "https://cs-hm.ru/",
    stats: [
      { label: "срок работы", value: "2 года" },
      { label: "города", value: "2" },
      { label: "формат", value: "сайт + контент" },
    ],
    features: [
      { icon: Camera, text: "Единый визуальный ритм для услуг" },
      { icon: MessageSquare, text: "Коммуникация вокруг реальных уборок" },
      { icon: Shield, text: "Подача доверия для квартир, домов и офисов" },
      { icon: TrendingUp, text: "Долгое присутствие вместо разовых всплесков" },
    ],
    tags: ["клининг", "соцсети", "сайт", "долгое ведение"],
  },
  {
    title: "SVRQ.ru",
    category: "automation",
    categoryLabel: "ИИ-сервис",
    headline: "Сервис помогает сварщикам быстрее считать заявки и готовить предложения",
    subtitle: "Фото, голос, текст, расчет стоимости и готовое предложение",
    image: "/projects/svrq.jpg",
    description:
      "SVRQ показывает, как искусственный интеллект можно встроить не ради моды, а ради конкретной операционной задачи: быстрее принять вводные, посчитать работу и выдать клиенту понятное предложение.",
    challenge:
      "Мастеру нужно быстро оценивать разные заявки, не теряя время на переписку, ручные расчеты и оформление предложения.",
    work:
      "Собрали прием фото, голоса и текста, анализ задачи, расчет стоимости, создание документа с предложением и систему управления заявками.",
    result:
      "Заявка проходит путь от описания до готового предложения быстрее, а мастер получает управляемый процесс вместо ручной рутины.",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-500/5 to-red-600/5",
    url: "https://svrq.ru",
    stats: [
      { label: "расчет", value: "30 сек" },
      { label: "тестов", value: "158+" },
      { label: "модели ИИ", value: "2" },
    ],
    features: [
      { icon: Mic, text: "Голосовой ввод с распознаванием речи" },
      { icon: Camera, text: "Анализ фото с помощью ИИ" },
      { icon: FileText, text: "Автоматическое предложение в готовый документ" },
      { icon: BarChart3, text: "Управление заявками в одной системе" },
    ],
    tags: ["ИИ", "расчет заявок", "документы", "управление заявками"],
  },
  {
    title: "КЛНГ.РФ",
    category: "automation",
    categoryLabel: "Автоматизация услуг",
    headline: "Платформа для клининга принимает заявки и считает стоимость уборки",
    subtitle: "Бот, расчет, предложение и учет заказов в одном процессе",
    image: "/projects/klng.jpg",
    description:
      "Для клининга важны скорость ответа и точность расчета. Проект собран вокруг простой идеи: клиент описывает задачу, система помогает принять ее, посчитать стоимость и довести до оформленного предложения.",
    challenge:
      "Заявки приходят из разных каналов, а менеджеру приходится вручную уточнять детали, считать стоимость и собирать предложение.",
    work:
      "Подготовили бота, расчет стоимости, формирование предложения, учет заказов и связь с каналами приема заявок.",
    result:
      "Компания получает более быстрый ответ клиенту и меньше ручной работы на однотипных обращениях.",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/5 to-teal-600/5",
    url: "https://xn--c1andi.xn--p1ai",
    stats: [
      { label: "каналы", value: "4" },
      { label: "отклик", value: "< 1 мин" },
      { label: "процесс", value: "заявка -> счет" },
    ],
    features: [
      { icon: Bot, text: "Бот для приема заявок круглосуточно" },
      { icon: Calculator, text: "Автоматический расчет стоимости" },
      { icon: FileText, text: "Создание коммерческого предложения" },
      { icon: TrendingUp, text: "Учет заказов и управленческая аналитика" },
    ],
    tags: ["клининг", "ИИ", "бот", "расчет стоимости"],
  },
  {
    title: "Росомаха",
    category: "sites",
    categoryLabel: "Коммерческий каталог",
    headline: "Каталог снегоболотоходов с моделями, комплектациями и дилерами",
    subtitle: "Структура для покупателей, дилеров и поисковой индексации",
    image: "/projects/rosomaha.jpg",
    description:
      "Проект показывает подход к сложному товарному сайту: у техники много характеристик, комплектаций, регионов и вопросов. Задача сайта — не просто показать фотографии, а помочь человеку разобраться и оставить предметную заявку.",
    challenge:
      "Покупателю нужно сравнить модели, понять комплектации, увидеть дилеров и быстро перейти к обращению.",
    work:
      "Собрали каталог, страницы моделей, характеристики, дилерскую структуру, калькулятор доставки и подготовку страниц к индексации.",
    result:
      "Сайт стал рабочей витриной продукта: модель, характеристики, регион, расчет и обращение собраны в одном маршруте.",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-500/5 to-indigo-600/5",
    url: "https://xn--80aa8ahaki9a.site",
    stats: [
      { label: "страниц", value: "50+" },
      { label: "моделей", value: "6" },
      { label: "регионов", value: "15+" },
    ],
    features: [
      { icon: Calculator, text: "Конфигуратор комплектаций" },
      { icon: FileText, text: "Детальные характеристики моделей" },
      { icon: TrendingUp, text: "Дилерская структура по регионам" },
      { icon: Zap, text: "Подготовка страниц для поиска" },
    ],
    tags: ["каталог", "техника", "дилеры", "заявки"],
  },
  {
    title: "CRM CentrLP",
    category: "automation",
    categoryLabel: "Собственная система",
    headline: "Внутренняя система управления проектами, клиентами и заявками",
    subtitle: "Сделки, задачи, отчеты, автоматизация и контроль каналов",
    image: "/projects/crm.jpg",
    url: "https://crm.centrlp.ru/",
    description:
      "Мы используем собственную систему управления, чтобы не держать работу в переписках и таблицах. В ней видны клиенты, сделки, задачи, статусы, источники заявок и эффективность каналов.",
    challenge:
      "Когда проектов и каналов становится больше, ручное управление начинает терять заявки, сроки и ответственность.",
    work:
      "Собрали учет клиентов, сделок, задач, отчетов, автоматизаций и связь с сайтом.",
    result:
      "Работа становится прозрачнее: видно, откуда пришел контакт, что с ним происходит и какие действия нужны дальше.",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/5 to-purple-600/5",
    stats: [
      { label: "клиентов", value: "50+" },
      { label: "автоматизаций", value: "12" },
      { label: "отчетов", value: "8" },
    ],
    features: [
      { icon: BarChart3, text: "Управление сделками и воронкой" },
      { icon: TrendingUp, text: "Отчеты по каналам и эффективности" },
      { icon: Zap, text: "Автоматизация повторяющихся действий" },
      { icon: MessageSquare, text: "Связь заявок с сайтом" },
    ],
    tags: ["CRM", "заявки", "аналитика", "автоматизация"],
  },
];

const summary = [
  { value: "6", label: "публичных работ" },
  { value: "3", label: "типа задач" },
  { value: "1", label: "собственная CRM" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  useAutoBreadcrumb("Проекты");

  const itemListSchema = useMemo(
    () =>
      projects.map((project) => ({
        name: project.title,
        description: `${project.headline}. ${project.subtitle}`,
        url: project.url,
        image: `https://centrlp.ru${project.image}`,
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
      title="Проекты CentrLP — сайты, ИИ-сервисы и CRM для заявок"
      description="Портфолио CentrLP: сайты, каталоги, ИИ-сервисы, CRM и сопровождение. Показываем задачи, ход работы и результат, который можно проверить."
    >
      <section className="relative overflow-hidden border-b border-border/60 pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--primary)/0.08),transparent_34%,hsl(var(--accent-1)/0.08))]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.035]" />
        <div className="container relative mx-auto px-4 pb-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Проверяемые работы вместо абстрактного портфолио
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Проекты CentrLP: сайты, сервисы и системы, которые доводят до заявки
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Ниже не просто скриншоты. Для каждой работы показано, какую бизнес-задачу закрывали,
                что именно собирали и какой практический результат должен видеть клиент или менеджер.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="rounded-lg border bg-background/85 p-5 shadow-card backdrop-blur"
            >
              <div className="grid grid-cols-3 gap-3">
                {summary.map((item) => (
                  <div key={item.label} className="rounded-md border bg-muted/30 p-4 text-center">
                    <div className="text-3xl font-bold text-foreground">{item.value}</div>
                    <div className="mt-1 text-xs leading-snug text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-md bg-primary/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Акцент сделан на работах, которые можно открыть, обсудить и использовать как основу
                  для похожего проекта: сайта, каталога, системы заявок или автоматизации.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/25 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Выберите тип работ</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Фильтр помогает быстро увидеть близкие по задаче проекты.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:flex">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5",
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
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <motion.div layout className="grid gap-8">
            {visibleProjects.map((project, index) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.035, 0.12) }}
              >
                <Card className={cn("overflow-hidden rounded-lg border shadow-sm transition-shadow duration-300 hover:shadow-md", `bg-gradient-to-br ${project.bgGradient}`)}>
                  <div className={cn("h-1 bg-gradient-to-r", project.gradient)} />
                  <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative min-h-[260px] overflow-hidden bg-background md:min-h-[360px] lg:min-h-full">
                      <img
                        src={project.image}
                        alt={`${project.title} — скриншот проекта CentrLP`}
                        className="h-full min-h-[260px] w-full object-cover object-top transition-transform duration-700 hover:scale-[1.025] md:min-h-[360px]"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                      <div className="absolute left-4 top-4 rounded-md border bg-background/90 px-3 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                        {project.categoryLabel}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 lg:p-10">
                      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className={cn("text-sm font-semibold", `bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`)}>
                            {project.headline}
                          </p>
                          <h2 className="mt-2 text-3xl font-bold leading-tight">{project.title}</h2>
                          <p className="mt-2 text-muted-foreground">{project.subtitle}</p>
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-md bg-gradient-to-r px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90",
                              project.gradient,
                            )}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Открыть проект
                          </a>
                        )}
                      </div>

                      <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
                        {project.description}
                      </p>

                      <div className="mt-7 grid gap-3 sm:grid-cols-3">
                        {project.stats.map((stat) => (
                          <div key={stat.label} className="rounded-md border bg-background/75 p-4">
                            <div className={cn("text-2xl font-bold", `bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`)}>
                              {stat.value}
                            </div>
                            <div className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 grid gap-4 border-y border-border/70 py-6 md:grid-cols-3">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Задача</div>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{project.challenge}</p>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Что сделали</div>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{project.work}</p>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Результат</div>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{project.result}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {project.features.map((feature) => (
                          <div key={feature.text} className="flex items-start gap-3">
                            <div className={cn("mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-white", project.gradient)}>
                              <feature.icon className="h-4 w-4" />
                            </div>
                            <p className="text-sm leading-relaxed text-foreground/80">{feature.text}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-col gap-4 border-t border-border/70 pt-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link to="/contacts" className="inline-flex">
                          <Button variant="outline" className="gap-2" data-metric="projects_discuss_similar_click">
                            Обсудить похожую задачу
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-gradient-to-br from-primary/5 via-background to-accent-1/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold md:text-4xl">Нужен проект, который не просто выглядит, а приводит к обращению?</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Разберу задачу, предложу рабочую структуру и покажу, какой формат лучше подходит:
              сайт, каталог, система заявок, автоматизация или сопровождение.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contacts">
                <Button size="lg" className="gap-2" data-metric="projects_final_contact_click">
                  Обсудить проект
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/prices">
                <Button size="lg" variant="outline" data-metric="projects_prices_click">
                  Смотреть цены
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
