import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ExternalLink,
  Bot,
  BarChart3,
  Car,
  Wrench,
  Sparkles,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Mic,
  Camera,
  FileText,
  Calculator,
  MessageSquare,
  PawPrint,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAutoBreadcrumb } from "@/components/SeoSchemas";

const projects = [
  {
    title: "МеталлТех",
    headline: "С нуля собрали бренд и сайт для нового производственного направления",
    subtitle: "Логотип, B2B-подача и промышленная структура под заявки",
    image: "/projects/metallteh-case.png",
    description:
      "Это продолжение долгой работы с тем же заказчиком, но уже на новом уровне. Раньше мы делали ему проекты в кровельной теме, а теперь помогли запустить отдельное производственное направление как самостоятельный B2B-бренд. С нуля собрали имя, логотип, индустриальную визуальную систему, структуру сайта и коммерческую подачу завода как подрядчика, которому можно отправить чертёж и получить понятный результат. В итоге вышел не формальный сайт, а рабочая цифровая упаковка производства: каталог продукции, отдельные SEO-страницы услуг, блоки доверия, кейсы, сертификаты и заявочная логика под входящий поток.",
    gradient: "from-red-500 to-orange-600",
    bgGradient: "from-red-500/5 to-orange-600/5",
    url: "https://xn----7sboc2ad7bd2a.xn--p1ai/",
    stats: [
      { label: "Категорий продукции", value: "9" },
      { label: "SEO-страниц услуг", value: "4" },
      { label: "Новый бренд", value: "с нуля" },
    ],
    features: [
      { icon: Sparkles, text: "Нейминг, логотип и новый индустриальный стиль с нуля" },
      { icon: Wrench, text: "Упаковка производственного бизнеса под B2B-заказчика" },
      { icon: FileText, text: "Каталог продукции, кейсы, сертификаты и FAQ в одной структуре" },
      { icon: TrendingUp, text: "Отдельные SEO-страницы под сварку, плазму, гибку и покраску" },
      { icon: Calculator, text: "Калькулятор и сильная заявочная логика вместо пустой витрины" },
      { icon: Shield, text: "Преемственность клиента: от кровельной темы к новому заводу и новому позиционированию" },
    ],
    tags: ["B2B", "Брендинг", "Логотип", "SEO-структура", "Производство"],
  },
  {
    title: "КлинингСервисХМ",
    headline: "Два года держали бренд в живой коммерческой коммуникации",
    subtitle: "SMM, подача услуг и доверие для клининговой компании в двух городах",
    image: "/projects/cshm-case.png",
    description:
      "Этот кейс не про разовую упаковку, а про длинную системную работу с сервисным бизнесом. Около двух лет мы вели Instagram как полноценный канал доверия и присутствия бренда: собирали контент-план, выстраивали ритм публикаций, держали визуальную дисциплину и помогали компании выглядеть как собранный сервис, а не как набор случайных постов. Параллельно бренд развивался сразу в Тюмени и Ханты-Мансийске, поэтому задача была шире обычного SMM: поддерживать единый образ сильной клининговой команды, которой спокойно доверяют квартиру, дом, офис и регулярное обслуживание. В этом проекте хорошо видно, что мы умеем не только запускать сайты, но и долго удерживать бизнес в аккуратной, коммерчески понятной коммуникации.",
    gradient: "from-cyan-500 to-sky-600",
    bgGradient: "from-cyan-500/5 to-sky-600/5",
    url: "https://cs-hm.ru/",
    stats: [
      { label: "Срок работы", value: "2 года" },
      { label: "Города", value: "2" },
      { label: "Формат", value: "SMM + сайт" },
    ],
    features: [
      { icon: Camera, text: "Около двух лет ведения Instagram как канала доверия и постоянного присутствия бренда" },
      { icon: Sparkles, text: "Визуальная упаковка без хаоса: единый ритм, чистая подача и узнаваемость" },
      { icon: MessageSquare, text: "Контент вокруг реальных услуг: квартиры, дома, офисы, окна и химчистка" },
      { icon: TrendingUp, text: "Не разовые акции, а системная коммуникация, которая удерживает образ компании" },
      { icon: Shield, text: "Позиционирование сразу под два рынка: Тюмень и Ханты-Мансийск" },
      { icon: FileText, text: "Связка контента, сайта и коммерческой подачи в одну понятную систему" },
    ],
    tags: ["SMM", "Instagram", "Контент", "Клининг", "Долгое сопровождение"],
  },
  {
    title: "SVRQ.ru",
    headline: "ИИ-агент для сварщиков",
    subtitle: "Федеральный SaaS-сервис",
    image: "/projects/svrq.jpg",
    description:
      "Первая в России платформа для мастеров-сварщиков с искусственным интеллектом. Мастер отправляет фото, голосовое или текст — ИИ анализирует задачу, считает стоимость и генерирует коммерческое предложение в PDF за 30 секунд.",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-500/5 to-red-600/5",
    url: "https://svrq.ru",
    stats: [
      { label: "Время расчёта", value: "30 сек" },
      { label: "Тестов пройдено", value: "158+" },
      { label: "Моделей ИИ", value: "2" },
    ],
    features: [
      { icon: Mic, text: "Голосовой ввод с распознаванием речи" },
      { icon: Camera, text: "Анализ фото с помощью ИИ" },
      { icon: FileText, text: "Автогенерация PDF-предложений" },
      { icon: Calculator, text: "Публичный калькулятор для клиентов" },
      { icon: BarChart3, text: "CRM для управления заявками" },
      { icon: MessageSquare, text: "Интеграция с Avito" },
    ],
    tags: ["SaaS", "ИИ", "Laravel", "CRM", "STT"],
  },
  {
    title: "КЛНГ.РФ",
    headline: "ИИ-платформа для клининга",
    subtitle: "SaaS для клининговых компаний",
    image: "/projects/klng.jpg",
    description:
      "Умная платформа для клининговых компаний. ИИ-бот принимает заявки через Avito, Telegram и сайт, автоматически рассчитывает стоимость уборки и формирует коммерческое предложение. Полная автоматизация от заявки до счёта.",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-500/5 to-teal-600/5",
    url: "https://xn--c1andi.xn--p1ai",
    stats: [
      { label: "Автоматизация", value: "90%" },
      { label: "Каналов приёма", value: "4" },
      { label: "Время отклика", value: "< 1 мин" },
    ],
    features: [
      { icon: Bot, text: "ИИ-бот для приёма заявок 24/7" },
      { icon: Calculator, text: "Автоматический расчёт стоимости" },
      { icon: MessageSquare, text: "Telegram-бот для клиентов" },
      { icon: FileText, text: "Генерация КП в PDF" },
      { icon: TrendingUp, text: "Аналитика и учёт заказов" },
      { icon: Shield, text: "Интеграция с Avito API" },
    ],
    tags: ["SaaS", "ИИ", "Laravel", "Telegram", "Avito"],
  },
  {
    title: "Росомаха",
    headline: "Каталог снегоболотоходов",
    subtitle: "Коммерческий сайт-каталог",
    image: "/projects/rosomaha.jpg",
    description:
      "Полноценный интернет-каталог для производителя вездеходов. Интерактивный конфигуратор комплектаций, детальные характеристики, дилерская сеть по всей России. Пререндеринг всех страниц для идеальной SEO-индексации.",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-500/5 to-indigo-600/5",
    url: "https://xn--80aa8ahaki9a.site",
    stats: [
      { label: "Страниц", value: "50+" },
      { label: "Моделей", value: "6" },
      { label: "Регионов", value: "15+" },
    ],
    features: [
      { icon: Calculator, text: "Конфигуратор комплектаций" },
      { icon: FileText, text: "Детальные характеристики моделей" },
      { icon: TrendingUp, text: "Дилерская сеть по регионам" },
      { icon: Zap, text: "Пререндеринг для SEO" },
      { icon: Shield, text: "Калькулятор доставки" },
    ],
    tags: ["React", "Каталог", "SEO", "Пререндеринг"],
  },
  {
    title: "CRM CentrLP",
    headline: "Внутренняя CRM-система",
    subtitle: "Управление бизнесом",
    image: "/projects/crm.jpg",
    url: "https://crm.centrlp.ru/",
    description:
      "Собственная CRM для управления всеми проектами и клиентами агентства. Ведение сделок от первого контакта до закрытия, автоматизация рутинных задач, аналитика эффективности по каждому каналу.",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/5 to-purple-600/5",
    stats: [
      { label: "Клиентов", value: "50+" },
      { label: "Автоматизаций", value: "12" },
      { label: "Отчётов", value: "8" },
    ],
    features: [
      { icon: BarChart3, text: "Управление сделками и воронкой" },
      { icon: TrendingUp, text: "Аналитика и дашборды" },
      { icon: Zap, text: "Автоматизация процессов" },
      { icon: MessageSquare, text: "Интеграция с сайтом" },
    ],
    tags: ["CRM", "Laravel", "Аналитика"],
  },
  {
    title: "ЛапаДом",
    headline: "Сервис, где передержка питомцев выглядит спокойно и современно",
    subtitle: "Платформа для поиска ситтеров и домашней передержки",
    image: "/projects/lapadom-case.png",
    description:
      "ЛапаДом мы задумывали не как очередной каталог объявлений, а как аккуратный цифровой сервис, где владелец питомца быстро понимает, кому можно доверить кошку или собаку на время поездки. Здесь важны не только поиск и карточки, но и общее ощущение спокойствия: домашняя передержка без клеток, понятные анкеты ситтеров, условия ухода, отзывы и простой путь до выбора человека. Поэтому в проекте мы делали упор не на перегруженный маркетплейс, а на лёгкую и дружелюбную продуктовую подачу, где сервис выглядит современно, чисто и вызывает доверие уже с первого экрана.",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/5 to-orange-600/5",
    url: "https://xn--80aamzile.xn--p1ai",
    stats: [
      { label: "Категорий", value: "8" },
      { label: "Поиск", value: "Гео" },
      { label: "Запись", value: "Онлайн" },
    ],
    features: [
      { icon: PawPrint, text: "Каталог услуг для питомцев" },
      { icon: Calculator, text: "Онлайн-запись к специалистам" },
      { icon: Shield, text: "Рейтинги и отзывы" },
      { icon: Zap, text: "Поиск по геолокации" },
    ],
    tags: ["Маркетплейс", "Laravel", "Геолокация"],
  },
];

const Projects = () => {
  useAutoBreadcrumb("Проекты");
  return (
    <Layout
      title="Наши проекты — CentrLP | Разработка SaaS, сайтов и CRM в Тюмени"
      description="Портфолио студии CentrLP: SaaS-платформы с ИИ, каталоги, CRM-системы. Реальные проекты — от идеи до работающего продукта."
    >
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent-1/5" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {projects.length} проектов в портфолио
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Проекты, которые
            <br />
            <span className="bg-gradient-to-r from-primary to-accent-1 bg-clip-text text-transparent">
              приносят результат
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            От SaaS-платформ с искусственным интеллектом до продающих каталогов.
            Каждый проект — работающий бизнес-инструмент.
          </motion.p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className={`overflow-hidden border-0 shadow-elegant bg-gradient-to-br ${project.bgGradient}`}>
                  {/* Header bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

                  <div className="p-8 lg:p-12">
                    {/* Title row */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}>
                            <Zap className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold">{project.title}</h2>
                            <p className="text-muted-foreground">{project.subtitle}</p>
                          </div>
                        </div>
                        <p className={`text-lg font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                          {project.headline}
                        </p>
                      </div>

                      {/* Stats */}
                      {project.stats && (
                        <div className="flex gap-6 lg:gap-8">
                          {project.stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                              <div className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                                {stat.value}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Screenshot */}
                    {project.image && (
                      <motion.div
                        className="mb-8 rounded-2xl overflow-hidden shadow-2xl border border-border/30 group/img"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative aspect-[16/9] overflow-hidden bg-background">
                          <img
                            src={project.image}
                            alt={`${project.title} — скриншот проекта`}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover/img:opacity-10 transition-opacity duration-500`} />
                        </div>
                      </motion.div>
                    )}

                    {/* Description */}
                    <p className="text-foreground text-lg leading-relaxed mb-8 max-w-4xl">
                      {project.description}
                    </p>

                    {/* Features grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {project.features.map((feature) => (
                        <div
                          key={feature.text}
                          className="flex items-center gap-3 p-3 rounded-xl bg-background/60 backdrop-blur-sm"
                        >
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center flex-shrink-0`}>
                            <feature.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer: tags + link */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-background/80 text-foreground/70 text-xs font-medium border border-border/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${project.gradient} text-white font-medium hover:opacity-90 transition-opacity shadow-lg`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Открыть сайт
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent-1/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Хотите такой же проект?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Расскажите о вашей задаче — мы предложим решение и рассчитаем стоимость.
              Консультация бесплатна.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacts">
                <Button size="lg" className="animate-gentle-pulse gap-2">
                  Обсудить проект
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/prices">
                <Button size="lg" variant="outline">
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
