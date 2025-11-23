import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar, Zap, Users, TrendingUp, CheckCircle, MessageSquare, Target,
  Brain, Smartphone, Video, Image as ImageIcon, BarChart3, Clock,
  AlertTriangle, XCircle, CheckCircle2, ArrowRight, Sparkles,
  Layout as LayoutIcon, FileText, Search, Map
} from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ContentPlan = () => {
  const scrollToForm = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const tags = [
    { text: "VK", top: "15%", left: "10%", delay: 0 },
    { text: "Telegram", top: "25%", right: "15%", delay: 1.5 },
    { text: "Instagram*", bottom: "20%", left: "15%", delay: 1 },
    { text: "AI-креативы", bottom: "30%", right: "10%", delay: 2 },
    { text: "Reels", top: "10%", left: "50%", delay: 0.5 },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout
      title="Контент-план и SMM-стратегия | CentrLP"
      description="Разработка контент-плана для соцсетей. Посты, сторис, Reels, сценарии и визуал. Продвижение ВКонтакте, Telegram и Instagram*."
    >
      {/* Hero Block */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 min-h-[80vh] flex flex-col justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08),transparent_70%)]" />

        {/* Floating Tags */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {tags.map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: tag.delay,
                ease: "easeInOut"
              }}
              className="absolute px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/5 border border-primary/10 text-primary/50 text-xs md:text-sm font-medium backdrop-blur-sm hidden sm:block"
              style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
            >
              {tag.text}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Контент, который продаёт</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-foreground"
          >
            Не просто «33 поста», а <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
              система продаж
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Разрабатываем контент-планы для VK, Telegram и Instagram*.
            Используем AI для анализа трендов, но смыслы и воронки прописываем вручную.
            Ваш контент будет приносить заявки, а не только лайки.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:scale-105 transition-all" onClick={scrollToForm}>
              Заказать контент-план
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full border-2 hover:scale-105 transition-all" onClick={scrollToForm}>
              Разобрать мои соцсети
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground/70 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Работаем с бизнесом в Тюмени и по России. Контент-планы на основе аналитики и нейросетей.
          </motion.p>
        </div>
      </section>

      {/* Who Needs Content Plan */}
      <section className="py-20 bg-card relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Кому нужен системный контент</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Если вы устали вымучивать посты и хотите, чтобы соцсети работали на бизнес
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Малый бизнес",
                desc: "Салоны, клиники, СТО.",
                problem: "Нет времени и системы. Постите от случая к случаю, клиенты забывают о вас."
              },
              {
                icon: Target,
                title: "Эксперты",
                desc: "Коучи, психологи, юристы.",
                problem: "Сложно держать регулярность. Не хватает идей, как связать пользу с продажей услуг."
              },
              {
                icon: MessageSquare,
                title: "Онлайн-магазины",
                desc: "Маркетплейсы, шоурумы.",
                problem: "Нужно постоянно показывать товар, делать обзоры, собирать отзывы и прогревать к акциям."
              },
              {
                icon: Map,
                title: "Локальные бренды",
                desc: "Кафе, фитнес, офлайн-точки.",
                problem: "Живёте за счёт «сарафана», но хотите управляемый поток новых гостей из соцсетей."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-destructive/5 p-3 rounded-lg border border-destructive/10">
                      <p className="text-xs font-bold text-destructive mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Боль:
                      </p>
                      <p className="text-sm text-muted-foreground leading-snug">{item.problem}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему контент не работает</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Типичные ошибки, которые убивают охваты и продажи
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Посты «как получится»",
                desc: "Нет единой логики, рубрик и смыслов. Сегодня котики, завтра акция, послезавтра тишина. Аудитория не понимает, о чем вы."
              },
              {
                title: "Лайки есть, денег нет",
                desc: "Вы делаете красивый контент, но он не ведет к продукту. Люди смотрят, ставят лайки, но покупают у конкурентов."
              },
              {
                title: "План в голове",
                desc: "Или в заметках. Команда не понимает, что делать. Если вы заболели или уехали — соцсети встали."
              },
              {
                title: "Устаревшие форматы",
                desc: "Только фото и текст. Нет Reels, клипов, сторис, интерактивов. Алгоритмы соцсетей пессимизируют такой аккаунт."
              },
              {
                title: "Нет аналитики",
                desc: "Вы не знаете, какая рубрика приносит заявки, а какая — только отписки. Бьёте вслепую."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={i === 3 || i === 4 ? "md:col-span-1.5" : ""}
              >
                <Card className="h-full border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-all">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-destructive" />
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-[#0A0F1C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Что входит в контент-план</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Не просто список тем, а полноценная стратегия коммуникации
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Контент-матрица",
                desc: "Рубрикатор под цели бизнеса: прогрев, продажи, доверие, репутация, вовлечение.",
                icon: LayoutIcon
              },
              {
                title: "Календарь публикаций",
                desc: "Четкое расписание: даты, время, частота. Баланс форматов (пост, сторис, клип, статья).",
                icon: Calendar
              },
              {
                title: "Примеры креативов",
                desc: "Референсы для дизайнера или готовые шаблоны. ТЗ для фото/видео съемки.",
                icon: ImageIcon
              },
              {
                title: "Структура постов",
                desc: "Заголовки, хуки (крючки внимания), офферы, призывы к действию (CTA).",
                icon: FileText
              },
              {
                title: "AI-усиление",
                desc: "Генерация вариантов заголовков и идей с помощью нейросетей для максимального охвата.",
                icon: Brain
              },
              {
                title: "Рекомендации по аналитике",
                desc: "Какие метрики отслеживать, как понимать, что «зашло», как корректировать план.",
                icon: BarChart3
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 transition-colors text-white">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4 border border-primary/20">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Block */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Brain className="w-4 h-4 mr-2" />
                Технологии
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Как мы используем AI в работе</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Нейросети — это мощный ускоритель, но руль всегда в руках эксперта.
              </p>
              <div className="space-y-4">
                {[
                  "Сбор и анализ идей в вашей нише за минуты",
                  "Поиск трендов и вирусных форматов 2026 года",
                  "Генерация десятков вариантов заголовков и офферов",
                  "Адаптация контента под разные площадки (VK, TG, Inst*)",
                  "Финальная редактура и смыслы — только вручную"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-1/20 blur-3xl rounded-full" />
              <Card className="relative p-8 border-2 border-primary/10 shadow-2xl bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Sparkles className="w-10 h-10 text-primary" />
                  <div>
                    <h3 className="font-bold text-xl">AI-Ассистент</h3>
                    <p className="text-sm text-muted-foreground">Генерация идей</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-lg rounded-tl-none text-sm">
                    <p className="font-semibold mb-1 text-primary">Запрос:</p>
                    <p className="text-muted-foreground">Придумай 5 идей для Reels для студии дизайна интерьера, чтобы привлечь заявки на ремонт.</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg rounded-tr-none text-sm border border-primary/20">
                    <p className="font-semibold mb-1 text-primary">AI:</p>
                    <ul className="list-disc list-inside space-y-1 text-foreground/80">
                      <li>"Топ-3 ошибки в планировке кухни, которые стоят дорого"</li>
                      <li>До/После: трансформация "бабушкиной" квартиры за 1 млн</li>
                      <li>Как сэкономить на материалах, но не на виде (лайфхаки)</li>
                      <li>...</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trends 2026 */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Контент-план под тренды 2026</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Что будет работать в соцсетях в ближайший год
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Короткие вертикальные видео (Reels, Клипы) — основной канал охвата",
              "Персонализация и сериальность: люди покупают у людей",
              "UGC и реальные истории вместо «вылизанных» макетов",
              "Нативная продажа через пользу, а не «купи в лоб»",
              "Связка с автоворонками: чат-боты, квизы, лид-формы",
              "Использование AI для скорости, но не вместо стратегии"
            ].map((trend, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-6 rounded-xl border border-border/50 flex items-start gap-4 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-accent-1/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-accent-1" />
                </div>
                <p className="font-medium text-foreground">{trend}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Форматы работы</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Прозрачные цены для Тюмени и региона
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* Plan */}
            <Card className="hover:shadow-xl transition-all duration-300 border-border/50">
              <CardHeader>
                <h3 className="text-2xl font-bold">Контент-план</h3>
                <div className="text-3xl font-bold text-primary mt-2">от 10 000 ₽/мес</div>
                <p className="text-sm text-muted-foreground mt-2">База для самостоятельного ведения</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>20–30 тем и форматов</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Рубрикатор и матрица</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Календарь публикаций</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Рекомендации по визуалу</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={scrollToForm}>Заказать</Button>
              </CardContent>
            </Card>

            {/* Plan + Management */}
            <Card className="relative hover:shadow-2xl transition-all duration-300 border-primary shadow-lg scale-105 z-10 bg-background">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                Популярно
              </div>
              <CardHeader>
                <h3 className="text-2xl font-bold">План + Ведение</h3>
                <div className="text-3xl font-bold text-primary mt-2">от 20 000 ₽/мес</div>
                <p className="text-sm text-muted-foreground mt-2">Мы пишем и публикуем за вас</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Всё из тарифа «Контент-план»</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Написание текстов</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Публикация (постинг)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Базовые ответы на комменты</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Ежемесячный отчет</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={scrollToForm}>Выбрать</Button>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="hover:shadow-xl transition-all duration-300 border-border/50">
              <CardHeader>
                <h3 className="text-2xl font-bold">Контент + Реклама</h3>
                <div className="text-3xl font-bold text-primary mt-2">от 30 000 ₽/мес</div>
                <p className="text-sm text-muted-foreground mt-2">Комплексный подход к продажам</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Контент-план и ведение</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Создание рекламных креативов</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Связка постов с таргетом</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Аналитика воронки</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={scrollToForm}>Обсудить</Button>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Цены ориентированы на Тюмень и регион, финальная стоимость зависит от объёма работ и площадок.
          </p>
        </div>
      </section>

      {/* SEO Text */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-sm text-muted-foreground leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-foreground">Разработка контент-плана для соцсетей в Тюмени</h3>
            <p>
              Качественный <strong>контент-план для соцсетей</strong> — это не просто расписание постов, а стратегия коммуникации с вашей аудиторией. Мы предлагаем профессиональную <strong>разработку контент-плана под ключ</strong>, который превращает подписчиков в клиентов. Наш подход включает анализ ниши, создание рубрикатора и использование современных форматов: Reels, клипы, сторис.
            </p>
            <p>
              Мы создаем эффективный <strong>контент-план для ВКонтакте</strong>, Telegram и Instagram*, учитывая специфику каждой площадки. Для <strong>бизнеса в Тюмени</strong> мы предлагаем решения, адаптированные под локальный рынок. Грамотная <strong>контент-стратегия и контент-маркетинг</strong> помогут вам выделиться среди конкурентов, повысить охваты и увеличить продажи без раздувания рекламного бюджета.
            </p>
            <p className="text-xs opacity-70">*Instagram — проект Meta Platforms Inc., деятельность которой в России запрещена.</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Нужен контент, который продаёт?</h2>
            <p className="text-muted-foreground text-lg">
              Оставьте заявку. Мы проанализируем ваши соцсети и предложим стратегию контента.
            </p>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default ContentPlan;