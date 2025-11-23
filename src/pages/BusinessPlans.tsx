import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
  FileText, TrendingUp, Calculator, Target, CheckCircle,
  Clock, Award, Zap, AlertTriangle, XCircle,
  BarChart3, PieChart, Search, FileCheck, ShieldCheck, ArrowRight,
  Briefcase, Banknote, Landmark, Percent
} from "lucide-react";
import { motion } from "framer-motion";

const BusinessPlans = () => {
  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

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
      title="Бизнес-планы и финансовые модели | CentrLP"
      description="Разработка бизнес-планов для соцконтракта, грантов и инвесторов. Финансовые модели, AI-аналитика и гарантия качества."
    >
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] text-primary/20"
          >
            <PieChart className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-40 left-[10%] text-accent/20"
          >
            <Calculator className="w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 left-[20%] w-4 h-4 bg-primary/30 rounded-full blur-sm"
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-primary font-semibold text-sm">Бизнес-планирование</span>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden md:flex items-center gap-2 text-muted-foreground text-sm"
              >
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>AI-Аналитика</span>
              </motion.div>
            </div>

            <div className="relative inline-block">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                Бизнес-планы, которые <br />
                <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  приносят деньги
                </span>
              </h1>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-8 -top-4 hidden lg:block"
              >
                <div className="bg-card p-3 rounded-xl shadow-xl border border-border/50 flex flex-col items-center gap-1 rotate-6 hover:rotate-0 transition-transform duration-300">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-xs font-bold">98%</span>
                  <span className="text-[10px] text-muted-foreground">одобрено</span>
                </div>
              </motion.div>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Разрабатываем документы для получения грантов, субсидий и инвестиций.
              Глубокая AI-аналитика, точные финансовые модели и защита проекта «под ключ».
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>По стандартам банков</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>ROI и Юнит-экономика</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Готовность от 3 дней</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-primary/25 transition-all w-full sm:w-auto animate-pulse-gentle"
                onClick={scrollToForm}
              >
                Заказать бизнес-план
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 h-14 rounded-full border-2 hover:bg-muted/50 w-full sm:w-auto"
                onClick={scrollToForm}
              >
                Получить консультацию
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Subsidies & Mistakes */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Деньги от государства — это реально
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                В России действуют десятки программ поддержки предпринимателей.
                Суммы грантов варьируются <span className="text-foreground font-semibold">от 100 000 ₽ до 500 000 ₽</span> и выше.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Социальный контракт (до 350 000 ₽)",
                  "Субсидии ЦЗН на открытие дела",
                  "Гранты для молодых предпринимателей (до 25 лет)",
                  "Региональные гранты и субсидии"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 bg-background p-4 rounded-xl border shadow-sm transition-transform"
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <div className="bg-background rounded-3xl p-8 border shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                  Почему отказывают?
                </h3>
                <p className="text-muted-foreground mb-6">
                  90% отказов происходят из-за слабого бизнес-плана. Комиссия видит ошибки сразу:
                </p>
                <ul className="space-y-4">
                  {[
                    "Расчеты «на коленке» без обоснования",
                    "Отсутствие анализа конкурентов и рынка",
                    "Нет понимания юнит-экономики",
                    "Слабая описательная часть (вода вместо фактов)",
                    "Нереалистичные показатели окупаемости"
                  ].map((error, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base">
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Pain Points */}
      <section className="py-20 relative">
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full -z-10" />
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            {...fadeInUp}
          >
            Знакомые ситуации?
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              "Государство отказало, потому что расчёты сделаны неверно",
              "Требуют доработать показатели, а вы не знаете как",
              "Бизнес-план слишком слабый, не хватает цифр",
              "Заявку отклоняют уже не в первый раз"
            ].map((pain, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-2xl border hover:border-primary/50 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-destructive/20 transition-colors">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <p className="font-medium leading-snug">{pain}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3.5 Programs */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Для каких программ подойдут наши бизнес-планы</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Мы адаптируем документы под требования конкретной программы, будь то соцконтракт или банковский кредит.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Соцконтракт",
                desc: "Поддержка малообеспеченных граждан на открытие и развитие дела.",
                link: "https://www.gosuslugi.ru/",
                linkText: "Портал Госуслуги",
                icon: Briefcase
              },
              {
                title: "Субсидии и гранты от центров занятости",
                desc: "Выплаты на открытие собственного дела для безработных и самозанятых.",
                link: "https://trudvsem.ru/",
                linkText: "Работа России",
                icon: Banknote
              },
              {
                title: "Региональные программы «Мой бизнес»",
                desc: "Гранты, субсидии и льготная поддержка для малого и среднего бизнеса.",
                link: "https://мойбизнес.рф/",
                linkText: "Мой бизнес.рф",
                icon: Landmark
              },
              {
                title: "Гранты для инновационных проектов",
                desc: "Поддержка технологических и инновационных проектов.",
                link: "https://fasie.ru/",
                linkText: "Фонд содействия инновациям",
                icon: Zap
              },
              {
                title: "Банковские программы и инвесторы",
                desc: "Бизнес-планы и финмодели для кредитов и частных инвестиций.",
                link: null,
                linkText: null,
                icon: Percent
              }
            ].map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-background p-6 rounded-xl border shadow-sm flex flex-col hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <prog.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{prog.title}</h3>
                    <p className="text-muted-foreground text-sm">{prog.desc}</p>
                  </div>
                </div>

                {prog.link && (
                  <a
                    href={prog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline inline-flex items-center gap-1 mt-auto ml-12"
                  >
                    {prog.linkText} <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Approach */}
      <section className="py-20 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наш подход к разработке</h2>
            <p className="text-primary-foreground/80 text-lg">Системная работа над каждым проектом</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-primary-foreground/20 -z-0"></div>

            {[
              { icon: FileText, title: "Брифинг", desc: "Сбор вводных данных и целей" },
              { icon: Search, title: "AI-Анализ", desc: "Исследование рынка и конкурентов" },
              { icon: Calculator, title: "Финмодель", desc: "Расчет окупаемости и юнит-экономики" },
              { icon: FileCheck, title: "Упаковка", desc: "Оформление описательной части" },
              { icon: ShieldCheck, title: "Защита", desc: "Пакет документов + инструкция" }
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative z-10 flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground text-primary flex items-center justify-center mb-6 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-primary-foreground/70">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Services */}
      <section className="py-24 bg-background relative">
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-accent/5 blur-3xl rounded-full -z-10" />
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            {...fadeInUp}
          >
            Стоимость услуг
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Бизнес-план и финмодель",
                price: "от 25 000 ₽",
                desc: "Юнит-экономика, окупаемость, сметы.",
                solve: "Непонимание цифр и рисков",
                icon: FileText
              },
              {
                title: "Маркетинговая стратегия",
                price: "18–45 000 ₽",
                desc: "Позиционирование, медиаплан, гипотезы.",
                solve: "Хаотичный маркетинг",
                icon: Target
              },
              {
                title: "Анализ конкурентов",
                price: "8–18 000 ₽",
                desc: "Разбор офферов, цен, структуры сайтов.",
                solve: "Слабый УТП, нерелевантные цены",
                icon: Search
              },
              {
                title: "Юнит-экономика",
                price: "10–20 000 ₽",
                desc: "Модель, сценарии «минимум/норма/оптимум».",
                solve: "Непонимание рентабельности",
                icon: PieChart
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                className="group bg-card rounded-2xl p-8 border hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150" />

                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors relative z-10">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 relative z-10">{service.title}</h3>
                <div className="text-2xl font-bold text-primary mb-4 relative z-10">{service.price}</div>
                <p className="text-muted-foreground mb-6 flex-grow relative z-10">{service.desc}</p>
                <div className="pt-6 border-t border-border relative z-10">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Решает проблему:</span>
                  <p className="text-sm font-medium mt-1">{service.solve}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 Reviews */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            {...fadeInUp}
          >
            Отзывы клиентов
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-background p-8 rounded-2xl shadow-sm border relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-4 -left-4 text-6xl text-primary/10 font-serif">“</div>
              <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    В
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">Владислав Погодин</h3>
                    <div className="flex text-yellow-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "Хочу выразить благодарность за помощь в создании бизнес-плана. Профессионализм, внимание к деталям и конструктивные советы позволили мне чётко понять ключевые аспекты моего проекта. Особенно впечатлили анализ рынка и финансовые прогнозы, которые увеличили мою уверенность перед инвесторами. Рекомендую всем, кто хочет разработать качественный бизнес-план!"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. SEO Text */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="space-y-6 text-muted-foreground text-sm md:text-base leading-relaxed"
            {...fadeInUp}
          >
            <p>
              <strong className="text-foreground">Бизнес-планы для грантов и инвестиций.</strong> Разработка качественного бизнес-плана — это ключевой этап для привлечения финансирования. Будь то социальный контракт, грант от Фонда содействия инновациям или частные инвестиции, требования к документации всегда высоки. Мы создаем документы, которые отвечают стандартам государственных фондов и банков, минимизируя риск отказа. Глубокий анализ рынка и конкурентов позволяет обосновать актуальность проекта и его потенциал.
            </p>
            <p>
              <strong className="text-foreground">Важность финансового моделирования.</strong> Финансовая модель — это сердце любого бизнес-плана. Она демонстрирует жизнеспособность идеи через цифры: окупаемость (ROI), точку безубыточности, движение денежных средств (Cash Flow) и юнит-экономику. Мы прорабатываем несколько сценариев развития событий (пессимистичный, реалистичный, оптимистичный), чтобы вы и инвесторы видели полную картину рисков и возможностей.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-24 relative overflow-hidden" id="contact-form">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-2xl border overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-10 flex flex-col justify-center bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Получите расчёт вашего проекта за 24 часа
                  </h2>
                  <p className="text-primary-foreground/80 text-lg mb-8">
                    Оставьте заявку сейчас, и мы проведем экспресс-аудит вашей идеи бесплатно.
                  </p>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span>Свяжемся в течение 15 минут</span>
                  </div>
                </div>
              </div>
              <div className="p-10 bg-background">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BusinessPlans;
