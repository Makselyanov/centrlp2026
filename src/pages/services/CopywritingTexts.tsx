import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText, Target, Zap, CheckCircle, PenTool, TrendingUp,
  Brain, Search, Shield, ArrowRight, Sparkles, MessageSquare,
  Layout as LayoutIcon, AlertTriangle, XCircle, CheckCircle2,
  Globe, Smartphone, BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CopywritingTexts = () => {
  const scrollToForm = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const tags = [
    { text: "SEO", top: "15%", left: "10%", delay: 0 },
    { text: "AI-усиление", top: "25%", right: "15%", delay: 1.5 },
    { text: "Структура", bottom: "20%", left: "15%", delay: 1 },
    { text: "Оффер", bottom: "30%", right: "10%", delay: 2 },
    { text: "LTV", top: "10%", left: "50%", delay: 0.5 },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <Layout
      title="Продающие SEO-тексты и копирайтинг | CentrLP"
      description="Написание продающих текстов для сайтов, рекламы и соцсетей. SEO-оптимизация, AI-анализ и структура, которая повышает конверсию."
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
            <PenTool className="w-4 h-4" />
            <span>Смыслы, которые продают</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-foreground"
          >
            Продающие тексты, которые <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
              попадают в боли
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Пишем для сайтов, рекламы и соцсетей. Усиливаем AI-анализом ниши и клиентов.
            Тексты, завязанные на SEO, структуру и коммерцию — без воды и шаблонов.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:scale-105 transition-all" onClick={scrollToForm}>
              Заказать тексты
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full border-2 hover:scale-105 transition-all" onClick={scrollToForm}>
              Разобрать мой сайт
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground/70 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Пишем тексты для бизнеса в Тюмени и по России. Усиливаем AI и аналитикой.
          </motion.p>
        </div>
      </section>

      {/* Why Strong Texts Matter in 2026 */}
      <section className="py-20 bg-card relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Зачем бизнесу сильные тексты в 2026</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              В эпоху информационного шума выигрывает тот, кто говорит ясно и по делу
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "SEO — это структура",
                desc: "Не просто «забить ключи», а создать логичный скелет, который нравится и людям, и роботам.",
                icon: Search
              },
              {
                title: "Текст = Диагностика",
                desc: "Хороший текст работает как врач: находит боль, объясняет причину и предлагает лекарство (оффер).",
                icon: Target
              },
              {
                title: "Реклама без заголовков мертва",
                desc: "Даже с идеальным таргетингом вы сольете бюджет, если заголовок не цепляет за 0.5 секунды.",
                icon: Zap
              },
              {
                title: "Краткость — новая валюта",
                desc: "Клиенты не читают «простыни». Они сканируют заголовки и буллиты. Мы пишем под сканеров.",
                icon: Smartphone
              },
              {
                title: "AI + Человек",
                desc: "Нейросети ускоряют процесс, но стратегию и эмпатию добавляет эксперт. Мы делаем гибрид.",
                icon: Brain
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Какие проблемы решают наши тексты</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Исправляем ошибки, из-за которых вы теряете клиентов
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Сайт есть, заявок нет",
                desc: "Текст красивый, но не ведет к конверсии. Нет призывов, нет логики убеждения.",
                solution: "Перепишем офферы и добавим CTA."
              },
              {
                title: "Трафик есть, продаж нет",
                desc: "Люди приходят, но не понимают, зачем им это нужно. Слабое УТП.",
                solution: "Сформулируем четкую ценность."
              },
              {
                title: "SEO есть, позиций нет",
                desc: "Тексты переспамлены или не отвечают на интент (намерение) пользователя.",
                solution: "Сделаем LSI-оптимизацию."
              },
              {
                title: "Объявления выгорают",
                desc: "Заголовки слабые, кликабельность (CTR) падает, цена клика растет.",
                solution: "Напишем 10+ вариантов заголовков."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-all">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-3 text-foreground flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-destructive" />
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.desc}
                    </p>
                    <div className="bg-green-500/10 p-2 rounded text-xs font-medium text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.solution}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Write */}
      <section className="py-24 bg-[#0A0F1C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Как мы пишем тексты</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              От аналитики до финальной точки: 5 шагов к сильному контенту
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Аналитика",
                desc: "Изучаем нишу, спрос, конкурентов. Разбираем структуру лучших сайтов в топе выдачи.",
                icon: BarChart3
              },
              {
                step: "02",
                title: "Боли ЦА",
                desc: "Собираем реальные триггеры и возражения клиентов. Формируем смысловое ядро текста.",
                icon: Target
              },
              {
                step: "03",
                title: "AI-усиление",
                desc: "Генерируем варианты заголовков, проверяем тональность, сравниваем с лучшими практиками.",
                icon: Brain
              },
              {
                step: "04",
                title: "Структура и SEO",
                desc: "Строим логический скелет (H1-H3). Распределяем ключевые слова и LSI-фразы без переспама.",
                icon: LayoutIcon
              },
              {
                step: "05",
                title: "Редактура под человека",
                desc: "Убираем воду, штампы и канцелярит. Оставляем только полезные смыслы, которые продают.",
                icon: FileText
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

      {/* SEO Texts That Rank */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-1/10 text-accent-1 text-sm font-medium mb-6">
                <Search className="w-4 h-4 mr-2" />
                SEO-продвижение
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">SEO-тексты, которые продвигают</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Мы пишем не для роботов, а для людей, но так, чтобы роботы это любили.
              </p>
              <ul className="space-y-4">
                {[
                  "Правильная иерархия заголовков H1–H3",
                  "Распределение ключей без переспама и «воды»",
                  "AI помогает собирать LSI и семантическую сетку",
                  "Тексты влияют на поведенческие факторы и ранжирование",
                  "Пишем «коммерчески полезные» тексты, а не простыни"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
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
                  <TrendingUp className="w-10 h-10 text-primary" />
                  <div>
                    <h3 className="font-bold text-xl">Рост позиций</h3>
                    <p className="text-sm text-muted-foreground">Результат правильного SEO</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Видимость в поиске</span>
                    <span className="text-green-500 font-bold">+145%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%]" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Конверсия страницы</span>
                    <span className="text-green-500 font-bold">+3.2%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent-1 w-[65%]" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Write (Updated) */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что мы пишем</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Любые форматы текстов для вашего бизнеса
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "SEO-тексты для сайта", desc: "Оптимизированные статьи и описания, которые выводят сайт в топ." },
              { title: "Коммерческие страницы", desc: "«Услуги», «О компании», кейсы — тексты, которые вызывают доверие." },
              { title: "Тексты для лендингов", desc: "Продающая структура: Оффер → Выгоды → Боли → CTA." },
              { title: "Рекламные объявления", desc: "Короткие и емкие тексты для Яндекс, VK Ads, Telegram Ads." },
              { title: "Контентные статьи", desc: "Экспертные материалы для блога, VC, Дзен для прогрева аудитории." },
              { title: "Посты для соцсетей", desc: "Продающие, развлекательные и полезные посты для SMM." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Website Bundle Offer */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent-1/10 to-primary/10 border-y border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-block p-3 bg-background rounded-full shadow-sm mb-6">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Заказываете сайт в CentrLP?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Вам не нужно платить за тексты отдельно. <br />
              <span className="text-foreground font-bold">Все продающие тексты, офферы и SEO-структура уже включены</span> в стоимость разработки сайта.
            </p>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
              <a href="/services/tilda-website">Узнать про сайты</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Стоимость текстов</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Прозрачные цены за результат, а не за знаки
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* SEO Texts */}
            <Card className="hover:shadow-xl transition-all duration-300 border-border/50">
              <CardHeader>
                <h3 className="text-2xl font-bold">SEO-тексты</h3>
                <div className="text-3xl font-bold text-primary mt-2">от 15 000 ₽</div>
                <p className="text-sm text-muted-foreground mt-2">Для продвижения в поиске</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>До 5 страниц</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Смысловая структура</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Сбор ключей и семантики</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>AI-анализ топов выдачи</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={scrollToForm}>Заказать</Button>
              </CardContent>
            </Card>

            {/* Selling Texts */}
            <Card className="relative hover:shadow-2xl transition-all duration-300 border-primary shadow-lg scale-105 z-10 bg-background">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                Хит продаж
              </div>
              <CardHeader>
                <h3 className="text-2xl font-bold">Продающие тексты</h3>
                <div className="text-3xl font-bold text-primary mt-2">от 25 000 ₽</div>
                <p className="text-sm text-muted-foreground mt-2">Для сайтов и лендингов</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Офферы, боли, решения</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Продающая логика</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Нейросетевое усиление</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>До 3 итераций правок</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={scrollToForm}>Выбрать</Button>
              </CardContent>
            </Card>

            {/* Ads Texts */}
            <Card className="hover:shadow-xl transition-all duration-300 border-border/50">
              <CardHeader>
                <h3 className="text-2xl font-bold">Рекламные тексты</h3>
                <div className="text-3xl font-bold text-primary mt-2">от 10 000 ₽</div>
                <p className="text-sm text-muted-foreground mt-2">Для Яндекс, VK, Telegram</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Пакет 15–20 объявлений</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Тестируемые заголовки</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Разные форматы (пост, тизер)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                    <span>Адаптация под площадки</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={scrollToForm}>Обсудить</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Text */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-sm text-muted-foreground leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-foreground">Продающие тексты и копирайтинг в Тюмени</h3>
            <p>
              Качественные <strong>SEO-тексты под ключ</strong> — это основа видимости вашего сайта в поисковых системах. Мы создаем контент, который не только нравится алгоритмам Яндекса и Google, но и реально продает. Наши <strong>продающие тексты для сайта</strong> строятся на глубоком анализе психологии покупателя, болей и потребностей целевой аудитории.
            </p>
            <p>
              Если вы ищете профессиональный <strong>копирайтинг в Тюмени</strong>, команда CentrLP готова предложить комплексные решения. Мы пишем <strong>тексты, которые повышают конверсию</strong>, превращая посетителей в лидов. Будь то <strong>тексты для рекламы и соцсетей</strong> или экспертные статьи для блога — мы гарантируем грамотность, уникальность и коммерческую эффективность каждого слова.
            </p>
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
            <h2 className="text-3xl font-bold mb-4">Нужны тексты, которые работают?</h2>
            <p className="text-muted-foreground text-lg">
              Оставьте заявку. Мы изучим вашу нишу и напишем контент, который принесет деньги.
            </p>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default CopywritingTexts;