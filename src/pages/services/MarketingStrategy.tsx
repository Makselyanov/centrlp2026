import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target, TrendingUp, Map, Users, Rocket, CheckCircle, BarChart3,
  Lightbulb, Zap, Brain, Globe, Smartphone, Search, Shield,
  ArrowRight, MessageSquare, Layout as LayoutIcon, FileText,
  AlertTriangle, XCircle, CheckCircle2, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const MarketingStrategy = () => {
  const scrollToForm = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const tags = [
    { text: "VK-реклама", top: "15%", left: "10%", delay: 0 },
    { text: "Тренды 2026", top: "25%", right: "15%", delay: 1.5 },
    { text: "AI-анализ", bottom: "20%", left: "15%", delay: 1 },
    { text: "Юнит-экономика", bottom: "30%", right: "10%", delay: 2 },
    { text: "Креативы", top: "10%", left: "50%", delay: 0.5 },
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
      title="Маркетинговая стратегия и медиаплан | CentrLP"
      description="Разработка комплексной маркетинговой стратегии для вашего бизнеса. План развития, бюджетирование, KPI и пошаговый медиаплан."
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
            <Brain className="w-4 h-4" />
            <span>Стратегия роста 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-foreground"
          >
            Маркетинг, который <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
              перестаёт сливать бюджет
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Разрабатываем стратегию, медиаплан и гипотезы для ВКонтакте, Telegram, Instagram*,
            контекста и других каналов. Опираемся на аналитику и нейросети, а не на интуицию.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:scale-105 transition-all" onClick={scrollToForm}>
              Разработать стратегию
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full border-2 hover:scale-105 transition-all" onClick={scrollToForm}>
              Получить разбор маркетинга
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground/70 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Работаем с бизнесом в Тюмени и по России. Усиливаем маркетинг AI-инструментами.
          </motion.p>
        </div>
      </section>

      {/* Who Needs Strategy */}
      <section className="py-20 bg-card relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Кому нужна стратегия</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Если вы устали от хаотичных тестов и хотите системного роста
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Map,
                title: "Локальный бизнес",
                desc: "Салоны, медицина, услуги, автосервисы.",
                problem: "Реклама есть, но заявок мало или они дорогие. Нет понимания, какой канал качать."
              },
              {
                icon: Rocket,
                title: "Онлайн-школы",
                desc: "Инфопродукты, курсы, наставничество.",
                problem: "Выгорание аудитории, низкая доходимость до вебинаров, высокая стоимость лида."
              },
              {
                icon: Globe,
                title: "E-commerce",
                desc: "Интернет-магазины, маркетплейсы.",
                problem: "Высокая конкуренция, низкая маржа, зависимость от одного источника трафика."
              },
              {
                icon: BriefcaseIcon,
                title: "B2B и услуги",
                desc: "Сложные продукты, долгий цикл сделки.",
                problem: "Клиенты долго думают, сложно донести ценность, реклама приводит «не тех»."
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
                        <AlertTriangle className="w-3 h-3" /> Проблема:
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему маркетинг не работает</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Честный взгляд на то, почему бюджеты сливаются впустую
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Реклама есть, роста нет",
                desc: "Деньги уходят в VK и Instagram*, а касса молчит. Вы кормите рекламные кабинеты, а не свой бизнес."
              },
              {
                title: "Каждый «делает по-своему»",
                desc: "Новый таргетолог — новая стратегия. Старые ошибки повторяются, нет накопленного опыта и системы."
              },
              {
                title: "Бюджет «по ощущениям»",
                desc: "Нет юнит-экономики, нет прогноза. Вы не знаете, сколько можете платить за клиента, чтобы быть в плюсе."
              },
              {
                title: "Креативы из 2018-го",
                desc: "Реклама выглядит устаревшей. Клиенты пролистывают ваши баннеры, потому что они не цепляют и не вызывают доверия."
              },
              {
                title: "Нет аналитики",
                desc: "Вы не знаете, с какого объявления пришел клиент. Масштабируете убытки вместо того, чтобы качать прибыль."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={i === 3 || i === 4 ? "md:col-span-1.5" : ""} // Just a layout trick attempt, might need adjustment or simpler grid
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

      {/* How We Create Strategy */}
      <section className="py-24 bg-[#0A0F1C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Как мы создаем стратегию</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              5 шагов от хаоса к системному маркетингу с использованием AI
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Аудит и сбор данных",
                desc: "Разбираем текущую аналитику, точки контакта, рекламные кабинеты, сайты, соцсети. Находим дыры, куда утекает бюджет.",
                icon: Search
              },
              {
                step: "02",
                title: "Анализ ЦА и конкурентов с AI",
                desc: "Используем AI-инструменты для анализа офферов, креативов, посадочных страниц конкурентов. Сегментируем аудиторию и находим неочевидные боли.",
                icon: Brain
              },
              {
                step: "03",
                title: "Стратегия и позиционирование",
                desc: "Формулируем ключевое сообщение, УТП, тональность. Разрабатываем коммуникационную стратегию отдельно для VK, Telegram и других каналов.",
                icon: Target
              },
              {
                step: "04",
                title: "Медиаплан и юнит-экономика",
                desc: "Расписываем каналы, бюджеты, прогноз по лидам и продажам. Считаем юнит-экономику: сколько максимум можно платить за лид и клиента.",
                icon: BarChart3
              },
              {
                step: "05",
                title: "Гипотезы и дорожная карта",
                desc: "План тестов по креативам, офферам и форматам. Что и когда тестируем, чем считаем результат, что масштабируем. Пошаговый план внедрения.",
                icon: Map
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row gap-6 items-start bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-bold text-2xl border border-primary/20">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {item.title}
                    <item.icon className="w-5 h-5 text-gray-500" />
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Trends 2026 */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-1/10 text-accent-1 text-sm font-medium mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Будущее уже здесь
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Маркетинг 2026: под что мы строим стратегию</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы не просто «делаем посты», мы строим систему, которая будет работать завтра
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Рост перформанс-креативов под короткие форматы (Reels, VK-клипы)",
              "Уход в first-party данные: CRM, свои базы, ретаргет",
              "Усиление VK как основной соцсети, рост Telegram-каналов",
              "Автоматизация и персонализация с AI: подбор креативов и текстов",
              "Рост конкуренции в e-commerce, необходимость сложных воронок",
              "Связка онлайн и офлайна: сквозная аналитика и трекинг"
            ].map((trend, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-secondary/30 p-6 rounded-xl border border-border/50 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <p className="font-medium text-foreground">{trend}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Что вы получите на выходе</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Не просто презентацию, а рабочий инструмент для собственника и маркетолога.
              </p>
              <div className="space-y-4">
                {[
                  "Пошаговый план роста на 6–12 месяцев",
                  "Стратегия для VK, Telegram и Instagram*",
                  "Прогноз по лидам и бюджету (по каналам)",
                  "Карта гипотез по креативам и офферам",
                  "Чёткие требования к сайтам/лендингам и аналитике"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-background rounded-xl border shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
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
                  <FileText className="w-10 h-10 text-primary" />
                  <div>
                    <h3 className="font-bold text-xl">Стратегический документ</h3>
                    <p className="text-sm text-muted-foreground">PDF-презентация + Excel-таблицы</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="h-2 bg-secondary rounded-full w-3/4" />
                  <div className="h-2 bg-secondary rounded-full w-full" />
                  <div className="h-2 bg-secondary rounded-full w-5/6" />
                  <div className="h-2 bg-secondary rounded-full w-2/3" />
                </div>
                <div className="mt-8 pt-6 border-t flex justify-between items-center">
                  <span className="font-bold text-lg">Результат:</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-bold">Системный рост</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Стоимость разработки</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Инвестиция в понятный и прогнозируемый маркетинг
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* Express */}
            <Card className="hover:shadow-xl transition-all duration-300 border-border/50">
              <CardHeader>
                <h3 className="text-2xl font-bold">Экспресс</h3>
                <div className="text-3xl font-bold text-primary mt-2">от 30 000 ₽</div>
                <p className="text-sm text-muted-foreground mt-2">Для небольшого бизнеса и точечного запуска</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Аудит текущей ситуации</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Подбор 2–3 каналов</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Краткий медиаплан на 3 мес.</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={scrollToForm}>Заказать</Button>
              </CardContent>
            </Card>

            {/* Full */}
            <Card className="relative hover:shadow-2xl transition-all duration-300 border-primary shadow-lg scale-105 z-10 bg-background">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                Популярно
              </div>
              <CardHeader>
                <h3 className="text-2xl font-bold">Полная стратегия</h3>
                <div className="text-3xl font-bold text-primary mt-2">от 50 000 ₽</div>
                <p className="text-sm text-muted-foreground mt-2">Глубокая проработка для системного роста</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Глубокий анализ ЦА и сегментов</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Анализ конкурентов (AI)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Позиционирование и УТП</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Медиаплан на 6–12 мес.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Юнит-экономика</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={scrollToForm}>Выбрать</Button>
              </CardContent>
            </Card>

            {/* Implementation */}
            <Card className="hover:shadow-xl transition-all duration-300 border-border/50">
              <CardHeader>
                <h3 className="text-2xl font-bold">Стратегия + Внедрение</h3>
                <div className="text-3xl font-bold text-primary mt-2">от 70 000 ₽</div>
                <p className="text-sm text-muted-foreground mt-2">Для тех, кому нужен результат "под ключ"</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Всё из «Полной стратегии»</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Запуск первых кампаний</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Настройка аналитики</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Сопровождение 2–3 месяца</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={scrollToForm}>Обсудить</Button>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Цены актуальны для Тюмени и региона. Финальная стоимость зависит от ниши, каналов и объёма работ.
          </p>
        </div>
      </section>

      {/* SEO Text */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-sm text-muted-foreground leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-foreground">Разработка маркетинговой стратегии в Тюмени</h3>
            <p>
              Грамотная <strong>разработка маркетинговой стратегии</strong> — это фундамент успешного бизнеса. Мы создаем не просто документ, а пошаговый <strong>маркетинговый план продвижения</strong>, который учитывает особенности вашего рынка, конкурентов и целевой аудитории. Наше <strong>агентство маркетинговых стратегий в Тюмени</strong> специализируется на комплексном подходе, объединяя классический маркетинг и современные AI-технологии.
            </p>
            <p>
              Мы предлагаем услуги по созданию <strong>стратегии продвижения в ВКонтакте и Instagram*</strong>, а также в Telegram и Яндекс.Директ. Ключевой этап нашей работы — <strong>разработка медиаплана и юнит-экономики</strong>, что позволяет прогнозировать результаты и эффективно управлять бюджетом. <strong>Маркетинговая стратегия для бизнеса</strong> от CentrLP — это ваш навигатор в мире высокой конкуренции и постоянно меняющихся трендов.
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
            <h2 className="text-3xl font-bold mb-4">Готовы к системному росту?</h2>
            <p className="text-muted-foreground text-lg">
              Оставьте заявку на бесплатную консультацию. Обсудим ваши задачи и подберем оптимальный формат стратегии.
            </p>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

// Helper icon component
function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

export default MarketingStrategy;