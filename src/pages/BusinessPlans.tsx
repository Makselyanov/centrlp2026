import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
  FileText, TrendingUp, Calculator, Target, CheckCircle,
  Clock, Award, Zap, AlertTriangle, XCircle,
  BarChart3, PieChart, Search, FileCheck, ShieldCheck, ArrowRight
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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>Одобрение заявок — 98%</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Бизнес-планы, которые <br />
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                приносят деньги
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Разрабатываем документы для получения грантов, субсидий и инвестиций.
              Глубокая AI-аналитика, точные финансовые модели и защита проекта «под ключ».
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-primary/25 transition-all w-full sm:w-auto"
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
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
                  <div key={i} className="flex items-center gap-3 bg-background p-4 rounded-xl border shadow-sm">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <div className="bg-background rounded-3xl p-8 border shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-bl-full -mr-10 -mt-10"></div>
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
      <section className="py-20">
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
                className="bg-card p-8 rounded-2xl border hover:border-primary/50 transition-colors group"
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

      {/* 4. Our Approach */}
      <section className="py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4">
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
                className="relative z-10 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground text-primary flex items-center justify-center mb-6 shadow-lg transform transition-transform hover:scale-110">
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
      <section className="py-24 bg-background">
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
                className="group bg-card rounded-2xl p-8 border hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>
                <p className="text-muted-foreground mb-6 flex-grow">{service.desc}</p>
                <div className="pt-6 border-t border-border">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Решает проблему:</span>
                  <p className="text-sm font-medium mt-1">{service.solve}</p>
                </div>
              </motion.div>
            ))}
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
              <div className="p-10 flex flex-col justify-center bg-primary text-primary-foreground">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Получите расчёт вашего проекта за 24 часа
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  Оставьте заявку сейчас, и мы проведем экспресс-аудит вашей идеи бесплатно.
                </p>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span>Свяжемся в течение 15 минут</span>
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
