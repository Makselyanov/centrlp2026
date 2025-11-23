import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Star, TrendingUp, Shield, Target, BarChart, PenTool, Layout as LayoutIcon, MessageSquare, Search, Briefcase, RefreshCw, HelpCircle, CheckCircle, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Prices = () => {
  const scrollToForm = () => {
    const element = document.getElementById('form');
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

  const packages = [
    {
      id: "start",
      title: "Старт",
      price: "от 60 000 ₽",
      description: "Быстрая упаковка малого бизнеса с фокусом на получении заявок в первые 7–14 дней.",
      features: [
        "Сайт 5–7 страниц (прототип → дизайн → сборка)",
        "Квиз на 5–10 шагов с ИИ-оптимизацией",
        "Подключение Метрики, целей, событий",
        "Базовая SEO-структура",
        "Оформление ВКонтакте (обложка, меню)",
        "5–7 продающих текстовых блоков"
      ],
      solve: "Отсутствие упаковки, низкая конверсия, дорогие заявки.",
      icon: Zap,
      popular: false,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      id: "full",
      title: "Продажи под ключ",
      price: "от 80 000 ₽",
      description: "Полный цикл маркетинга для стабильного потока заявок.",
      features: [
        "Сайт 7–12 страниц + сложный квиз",
        "ИИ-бот 24/7 + автоответы",
        "Настройка рекламы (Яндекс + ВК)",
        "A/B-тестирование с нейросетями",
        "Контент-план (10 единиц) + креативы",
        "Ежедневный контроль и корректировки"
      ],
      solve: "Низкий поток лидов, устаревшие процессы, потеря клиентов.",
      icon: Star,
      popular: true,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/50"
    },
    {
      id: "ads",
      title: "Ведение рекламы",
      price: "от 20 000 ₽/мес",
      description: "Профессиональное сопровождение трафика с прогнозом и аналитикой.",
      features: [
        "Яндекс.Директ — 20 000 ₽/мес",
        "ВКонтакте Ads — 30 000 ₽/мес",
        "Холодные/тёплые сегменты, ретаргетинг",
        "A/B-тесты объявлений на основе ИИ",
        "Еженедельные отчёты и прогнозы"
      ],
      solve: "Дорогая заявка, нестабильный поток, отсутствие аналитики.",
      icon: TrendingUp,
      popular: false,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ];

  const services = [
    { title: "Квиз «Продажа под ключ»", price: "15–35к ₽", desc: "Многошаговый квиз с продуманной логикой и ИИ-оптимизацией.", solve: "Рост конверсии", icon: HelpCircle },
    { title: "ИИ-скрипты продаж", price: "10–25к ₽", desc: "Сценарии обработки возражений, FAQ-модуль, подсказки.", solve: "Порядок в продажах", icon: MessageSquare },
    { title: "Генерация текста и A/B", price: "10–20к ₽", desc: "SEO-тексты, заголовки, офферы, варианты лендинга.", solve: "Сильный оффер", icon: PenTool },
    { title: "Сайт на Tilda (5–10 стр)", price: "45–70к ₽", desc: "Полная сборка с адаптивом, SEO и аналитикой.", solve: "Продающий сайт", icon: LayoutIcon },
    { title: "Оформление ВКонтакте", price: "12–25к ₽", desc: "Обложки, меню, закреп, посты, CTA-блоки.", solve: "Упаковка соцсетей", icon: LayoutIcon },
    { title: "Настройка Яндекс.Директ", price: "от 20к ₽", desc: "Поиск + РСЯ, минус-слова, ИИ-заголовки.", solve: "Целевой трафик", icon: Search },
    { title: "Настройка рекламы ВК", price: "от 18к ₽", desc: "Прогрев, лид-формы, ретаргетинг.", solve: "Заявки из соцсетей", icon: Target },
    { title: "Фирменный стиль + лого", price: "18–40к ₽", desc: "Стиль, логотип, шаблоны, цвета.", solve: "Узнаваемость", icon: PenTool },
    { title: "Контент-план + креативы", price: "от 15к ₽", desc: "Посты, баннеры, сторис, объявления.", solve: "Вовлечение", icon: MessageSquare },
    { title: "Бизнес-план и финмодель", price: "от 25к ₽", desc: "Юнит-экономика, окупаемость, сметы.", solve: "Понимание цифр", icon: BarChart },
    { title: "Маркетинговая стратегия", price: "18–45к ₽", desc: "Позиционирование, медиаплан, гипотезы.", solve: "План действий", icon: Target },
    { title: "Анализ конкурентов", price: "8–18к ₽", desc: "Разбор офферов, цен, структуры сайтов.", solve: "Отстройка", icon: Search },
    { title: "Юнит-экономика", price: "10–20к ₽", desc: "Модель, сценарии «минимум/норма/оптимум».", solve: "Рентабельность", icon: BarChart },
  ];

  const tickerItems = ["Маркетинг", "Разработка", "Дизайн", "Аналитика", "Автоматизация", "AI-Решения", "Трафик", "Упаковка", "Стратегия"];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#0A0F1C] text-white min-h-[80vh] flex flex-col justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/30 blur-[120px] rounded-full pointer-events-none opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent-1/20 blur-[100px] rounded-full pointer-events-none opacity-40" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Прайс-лист 2025</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight"
          >
            Инвестируйте в <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] via-[#44B78B] to-[#0096D6] bg-[length:200%_auto] animate-gradient">
              Рост Бизнеса
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Прозрачные цены. Понятные этапы. <br className="hidden md:block" />
            Гарантия результата по договору.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_30px_-10px_rgba(var(--primary-rgb),0.5)] transition-all hover:scale-105" onClick={scrollToForm}>
              Рассчитать проект
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-105">
              Смотреть пакеты
            </Button>
          </motion.div>
        </div>

        {/* Ticker */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden py-6 bg-white/5 backdrop-blur-sm border-t border-white/5">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="mx-8 text-white/30 font-bold text-xl uppercase tracking-widest flex items-center gap-4">
                {item} <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 relative bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Комплексные пакеты</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Готовые решения для быстрого старта и масштабирования
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                id={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className={`relative p-8 h-full flex flex-col transition-all duration-300 ${pkg.popular ? 'border-primary shadow-2xl scale-105 z-10 bg-card' : 'border-border bg-card/50 hover:border-primary/30 hover:shadow-lg'}`}>
                  {pkg.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent-1 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      Хит продаж
                    </div>
                  )}

                  <div className="mb-8 text-center">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${pkg.bgColor} ${pkg.color} shadow-inner`}>
                      <pkg.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                    <div className={`text-3xl font-bold ${pkg.color}`}>{pkg.price}</div>
                  </div>

                  <p className="text-muted-foreground mb-8 text-center text-sm leading-relaxed">{pkg.description}</p>

                  <div className="space-y-4 mb-8 flex-grow">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start text-sm group">
                        <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 transition-colors ${pkg.popular ? 'text-green-500' : 'text-muted-foreground group-hover:text-green-500'}`} />
                        <span className="text-foreground/90">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`p-4 rounded-xl mb-8 border ${pkg.borderColor} ${pkg.bgColor}`}>
                    <div className={`text-xs font-bold uppercase mb-2 flex items-center gap-2 ${pkg.color}`}>
                      <Target className="w-3 h-3" />
                      Решает проблему:
                    </div>
                    <p className="text-sm italic text-foreground/80">{pkg.solve}</p>
                  </div>

                  <Button
                    variant={pkg.popular ? "default" : "outline"}
                    size="lg"
                    className={`w-full h-12 rounded-xl font-semibold ${pkg.popular ? 'shadow-lg hover:shadow-primary/25' : 'border-2'}`}
                    onClick={scrollToForm}
                  >
                    Заказать пакет
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-32 bg-[#0A0F1C] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
              Точечные решения
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Отдельные услуги</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Усильте конкретные показатели вашего бизнеса с помощью наших специализированных инструментов
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="group relative h-full"
              >
                {/* Glowing Border Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent-1 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur opacity-20" />

                <Card className="relative h-full bg-[#111625] border-white/5 p-6 flex flex-col overflow-hidden group-hover:border-transparent transition-colors">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 text-gray-400">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <div className="flex items-center gap-1 text-white/30 group-hover:text-primary transition-colors">
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">{service.desc}</p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Результат</span>
                      <span className="text-sm text-gray-300 font-medium">{service.solve}</span>
                    </div>
                    <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-colors">
                      <span className="text-white font-bold text-sm group-hover:text-primary">{service.price}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Barter */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1a1f2c] to-[#2d3748] rounded-3xl p-8 md:p-12 border border-primary/20 shadow-2xl relative overflow-hidden text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />

            <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
              <div className="flex-1">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/10 backdrop-blur-sm">
                  <RefreshCw className="w-4 h-4 mr-2 text-green-400" />
                  Специальное предложение
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Бартер-пакеты для бизнеса</h2>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-green-400">Эквивалент 80 000+ ₽</span>
                </div>

                <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                  Идеально для мебельщиков, СТО, детейлинга, клининга и салонов услуг.
                  Мы вам — упаковку и клиентов, вы нам — свои услуги.
                  Взаимозачёт по договору, фиксированная программа работ.
                </p>

                <div className="flex items-center gap-3 text-sm font-medium text-green-400 bg-green-400/10 px-4 py-2 rounded-lg w-fit">
                  <Shield className="w-4 h-4" />
                  Решает проблему отсутствия бюджета на старте
                </div>
              </div>

              <div className="flex-shrink-0 w-full lg:w-auto">
                <Card className="bg-white/5 border-white/10 p-6 backdrop-blur-sm max-w-sm mx-auto lg:mx-0">
                  <h4 className="font-bold mb-4 text-white">Что входит в бартер:</h4>
                  <ul className="space-y-3 text-sm text-gray-300 mb-6">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Сайт + Квиз</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Настройка рекламы</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Оформление соцсетей</li>
                  </ul>
                  <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100 font-bold" onClick={scrollToForm}>
                    Обсудить условия
                  </Button>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="form" className="py-24 bg-secondary/30 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Оставить заявку</h2>
            <p className="text-muted-foreground text-lg">
              Заполните форму, и мы свяжемся с вами для обсуждения деталей проекта
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="pb-20 pt-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-secondary/50 p-8 rounded-2xl max-w-3xl border border-border/50"
          >
            <h4 className="font-bold mb-3 flex items-center justify-center gap-2 text-lg">
              <Briefcase className="w-5 h-5 text-primary" />
              Официально и прозрачно
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Все услуги выполняются официально, по договору НПД, с этапами, ТЗ и прозрачной отчётностью.
              Мы гарантируем качество и соблюдение сроков. Вы всегда знаете, за что платите.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Prices;
