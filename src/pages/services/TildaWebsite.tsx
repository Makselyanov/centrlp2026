import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Zap, Users, TrendingUp, Layout as LayoutIcon, Palette, FileText, Settings, Rocket, BarChart, Clock, CreditCard, HelpCircle, MessageSquare, MapPin, Briefcase, Search, Target, Smartphone, MousePointer, Eye, Globe, ShieldCheck, Award, PieChart, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function TildaWebsite() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <Layout
      title="Создание сайта на Tilda: разработка под ключ в Тюмени | CentrLP"
      description="Разработка продающего сайта на Tilda за 14-21 день. Дизайн, тексты, формы заявок, интеграция с CRM. Сайт, который приносит клиентов вашему бизнесу."
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,141,210,0.1),transparent_50%)]" />

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] text-primary/20"
          >
            <LayoutIcon className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-40 left-[10%] text-accent/20"
          >
            <BarChart className="w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 left-[20%] w-4 h-4 bg-primary/30 rounded-full blur-sm"
          />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold">Сайты на Tilda</span>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden md:flex items-center gap-2 text-muted-foreground text-sm"
              >
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>AI-ускорение</span>
              </motion.div>
            </div>

            <div className="relative inline-block">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent relative z-10">
                Сайт, который генерирует прибыль, а не просто «висит» в сети
              </h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-12 -top-8 hidden lg:block"
              >
                <div className="bg-card p-3 rounded-xl shadow-lg border border-border/50 flex flex-col items-center gap-1">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <span className="text-xs font-bold">+150%</span>
                  <span className="text-[10px] text-muted-foreground">конверсия</span>
                </div>
              </motion.div>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Разрабатываем инструменты продаж с помощью AI-аналитики: глубокий анализ ниши, A/B-тесты офферов и структура, которая закрывает боли клиентов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Нет заявок с сайта</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Устаревший дизайн</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Сайт не работает</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 animate-pulse-gentle hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/25"
                onClick={() => scrollToSection('form')}
              >
                Оставить заявку <ArrowRight className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 hover:bg-secondary/50 transition-colors"
                onClick={() => scrollToSection('process')}
              >
                Как мы работаем
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Для кого */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Для кого эта услуга
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icons: [Users, MapPin, Briefcase],
                title: "Локальный бизнес",
                text: "Боль: «Клиенты уходят к конкурентам, потому что нас не находят». Решение: SEO-оптимизированная структура под гео-запросы."
              },
              {
                icons: [Rocket, TrendingUp, Target],
                title: "Стартапы и новые ниши",
                text: "Боль: «Нужно протестировать гипотезу быстро и дешево». Решение: MVP-сайт за 7 дней с готовыми офферами от AI."
              },
              {
                icons: [Zap, Settings, BarChart],
                title: "Действующий бизнес",
                text: "Боль: «Заявки слишком дорогие, сайт не конвертит». Решение: Пересборка смыслов и внедрение квизов/лид-магнитов."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-border/50"
              >
                <div className="flex gap-3 mb-6">
                  {item.icons.map((Icon, j) => (
                    <div key={j} className={`w-12 h-12 rounded-xl flex items-center justify-center ${j === 0 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'} group-hover:scale-110 transition-transform duration-300 delay-${j * 100}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Боли */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Типичные проблемы, которые мы решаем
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "Заявки выходят слишком дорогими (CPL > 1000₽) — бюджет сливается впустую", icon: CreditCard },
              { text: "Нет сквозной аналитики — непонятно, какой канал приносит деньги, а какой убытки", icon: PieChart },
              { text: "Сайт сделан «на глаз» — без анализа конкурентов и понимания болей аудитории", icon: Eye },
              { text: "Низкая конверсия (< 1%) — посетители заходят, но не оставляют контакты", icon: MousePointer },
              { text: "Нет автоматизации — менеджеры теряют заявки или перезванивают слишком поздно", icon: Clock },
              { text: "Сложно масштабироваться — текущая платформа не позволяет быстро внедрять новые воронки", icon: Rocket }
            ].map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-muted/30 rounded-xl hover:bg-muted transition-all duration-300 group border border-transparent hover:border-border/50"
              >
                <div className="p-3 bg-background rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <pain.icon className="w-6 h-6 text-destructive" />
                </div>
                <p className="text-lg font-medium pt-1">{pain.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Как решаем */}
      <section id="process" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Как мы создаём сайт на Tilda
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "AI-аналитика ниши",
                text: "Нейросети анализируют 50+ сайтов конкурентов, выделяют их слабые места и формируют список болей вашей ЦА.",
                icon: BarChart
              },
              {
                step: "02",
                title: "Проектирование смыслов",
                text: "Создаем структуру не «для красоты», а для продаж. Каждый блок закрывает конкретное возражение клиента.",
                icon: LayoutIcon
              },
              {
                step: "03",
                title: "Дизайн и сборка",
                text: "Используем современные UI-паттерны, привычные пользователям. Адаптив под мобильные — приоритет №1.",
                icon: Palette
              },
              {
                step: "04",
                title: "Продающий контент",
                text: "Пишем тексты с помощью AI и редакторов. Заголовки по 4U, офферы, которые бьют точно в цель.",
                icon: FileText
              },
              {
                step: "05",
                title: "Техническая настройка",
                text: "Подключаем CRM, аналитику, пиксели соцсетей. Настраиваем цели, чтобы видеть стоимость каждой заявки.",
                icon: Settings
              },
              {
                step: "06",
                title: "Тесты и запуск",
                text: "Проверяем скорость загрузки, работу форм и сценарии поведения. Запускаем трафик только на готовый продукт.",
                icon: Rocket
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-6 items-start group"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <item.icon className="w-8 h-8 absolute opacity-20 group-hover:opacity-40 transition-opacity duration-300 scale-150" />
                  <span className="relative z-10">{item.step}</span>
                </motion.div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold mb-2 flex items-center gap-3">
                    {item.title}
                    <item.icon className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </h3>
                  <p className="text-muted-foreground text-lg">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Результат */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Что вы получите в результате
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { text: "Прогнозируемый поток заявок", sub: "Понятная стоимость лида (CPL)" },
              { text: "Полная прозрачность", sub: "Дашборды с метриками, а не «ощущения»" },
              { text: "Рост конверсии в 1.5-2 раза", sub: "За счет точечной работы со смыслами" },
              { text: "Автоматизация рутины", sub: "Заявки сразу попадают в CRM" },
              { text: "Готовность к масштабированию", sub: "Легко добавлять новые страницы и офферы" },
              { text: "Независимость от разработчиков", sub: "Вы сами можете менять цены и тексты" }
            ].map((result, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--accent) / 0.15)" }}
                className="flex items-start gap-4 p-4 bg-accent/10 rounded-lg transition-colors duration-300"
              >
                <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold">{result.text}</h3>
                  <p className="text-muted-foreground text-sm">{result.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* Detailed Case Study */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4">
              <Zap className="w-4 h-4" />
              <span>Мини-кейс: редизайн + маркетинговая система для клининга</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Было / Стало: как мы превратили «визитку»<br />в работающую систему заявок
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Column 1: Source Data */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 h-full"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Исходные данные
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-sm">Клиент</span>
                    <span className="text-muted-foreground text-sm">Клининговая компания, 2 филиала: Тюмень и Ханты-Мансийск.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <LayoutIcon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-sm">Ситуация</span>
                    <span className="text-muted-foreground text-sm">Старый сайт на конструкторе, сделанный «для галочки».</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Users className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-sm">Каналы продаж</span>
                    <span className="text-muted-foreground text-sm">Сарафанка, немного соцсетей, случайные заявки с сайта.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Target className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-sm">Задача</span>
                    <span className="text-muted-foreground text-sm">Увеличить кол-во заявок, разделить потоки по городам, упаковать как сервис, обеспечить защиту ПД (Роскомнадзор).</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Column 2: What was wrong */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-red-50/50 p-8 rounded-2xl shadow-sm border border-red-100 h-full"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-700">
                <HelpCircle className="w-5 h-5" />
                Что было не так
              </h3>
              <ul className="space-y-4">
                {[
                  { text: "Нет выбора филиала. Клиенты путались в телефонах и ценах.", icon: MapPin },
                  { text: "Услуги перемешаны. Нет разделения по зонам (кухня, спальня).", icon: LayoutIcon },
                  { text: "Текст «про компанию», а не про боли клиента.", icon: FileText },
                  { text: "Нет живой команды. Выглядит как фирма-однодневка.", icon: Users },
                  { text: "Цены непрозрачные. Нужно звонить и уточнять.", icon: CreditCard },
                  { text: "Нет квизов. Все заявки сваливались в одну кучу.", icon: MessageSquare },
                  { text: "Риски штрафов. Нет согласия на ПД и HTTPS.", icon: ShieldCheck },
                  { text: "Слабая SEO-основа под запросы «уборка Тюмень».", icon: Search }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="mt-1 min-w-[20px]">
                      <item.icon className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: What we did */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-green-50/50 p-8 rounded-2xl shadow-sm border border-green-100 h-full"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-5 h-5" />
                Что сделали мы
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-2 text-sm uppercase tracking-wider">Упаковка сайта</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Селектор города (Тюмень / Ханты-Мансийск) с подменой контактов.
                    </li>
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Интерактивный выбор услуг по комнатам (Спальня, Кухня, Санузел).
                    </li>
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Блок «Наша команда» с живыми фото и FAQ по страхам.
                    </li>
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Юридическая защита: HTTPS, Политика, Чекбоксы согласия.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2 text-sm uppercase tracking-wider">Маркетинг</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      2 квиза: на уборку и на мойку окон (AI-вопросы).
                    </li>
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Контент-стратегия для соцсетей + Реклама ВК.
                    </li>
                    <li className="text-sm text-muted-foreground flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      Упаковка Яндекс Бизнес и 2ГИС.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Before / After Visual */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-border shadow-lg">
                <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-bold backdrop-blur-md">
                  До: Информационная визитка
                </div>
                <img
                  src="/assets/cases/redesign-before.jpg"
                  alt="Старый сайт клининга"
                  className="w-full h-auto object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="p-4 bg-background border-t border-border">
                  <p className="text-sm text-muted-foreground">Без структуры, без юридической защиты, без сегментации.</p>
                </div>
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-primary/30 shadow-2xl ring-4 ring-primary/5">
                <div className="absolute top-4 right-4 z-10 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg">
                  После: Система продаж
                </div>
                <img
                  src="/assets/cases/redesign-after.jpg"
                  alt="Новый сайт клининга"
                  className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="p-4 bg-background border-t border-border">
                  <p className="text-sm text-primary font-medium">Продающий сайт + Квизы + Комплексный маркетинг.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="max-w-4xl mx-auto bg-primary/5 rounded-2xl p-8 text-center mb-12 border border-primary/10">
            <h3 className="text-2xl font-bold mb-4">Результат для клиента</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Появился понятный путь клиента: выбрал город → посмотрел услуги по комнатам → прошёл квиз → оставил заявку.
              Компания выглядит как сервис с командой и лицами. Сайт полностью соответствует требованиям Роскомнадзора.
              Удобно вести рекламу и аналитику по отдельным воронкам.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <span className="bg-background px-3 py-1 rounded-full border border-border text-muted-foreground">Рост конверсии</span>
              <span className="bg-background px-3 py-1 rounded-full border border-border text-muted-foreground">Защита от штрафов</span>
              <span className="bg-background px-3 py-1 rounded-full border border-border text-muted-foreground">Прозрачная аналитика</span>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="text-lg px-8 h-14 shadow-xl hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
              onClick={() => scrollToSection('form')}
            >
              Хочу такой же результат <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Форматы сотрудничества
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {[
              {
                name: "Базовый",
                price: "от 45 000 ₽",
                period: "Срок: 10–14 дней",
                features: [
                  { text: "Сайт на 5 блоков", icon: LayoutIcon },
                  { text: "Анализ 10 конкурентов", icon: BarChart },
                  { text: "Базовая SEO-оптимизация", icon: TrendingUp },
                  { text: "Подключение метрики", icon: Settings },
                  { text: "Срок: 7-10 дней", icon: Clock }
                ]
              },
              {
                name: "Бизнес",
                price: "от 70 000 ₽",
                period: "Срок: 14–21 день",
                features: [
                  { text: "Глубокий AI-анализ ниши", icon: Zap },
                  { text: "Проработка воронок продаж", icon: TrendingUp },
                  { text: "Квиз + Лид-магнит", icon: MessageSquare },
                  { text: "Интеграция с CRM", icon: Settings },
                  { text: "Копирайтинг (AI + редактор)", icon: FileText },
                  { text: "A/B тесты офферов", icon: Rocket }
                ],
                popular: true
              },
              {
                name: "Экосистема",
                price: "от 100 000 ₽",
                period: "Срок: 21–30 дней",
                features: [
                  { text: "Многостраничный сайт", icon: LayoutIcon },
                  { text: "Сложные интеграции (API)", icon: Settings },
                  { text: "Чат-бот автоворонка", icon: MessageSquare },
                  { text: "Сквозная аналитика", icon: BarChart },
                  { text: "Настройка рекламы (тест)", icon: Rocket },
                  { text: "Сопровождение 1 месяц", icon: Users },
                  { text: "Персональная стратегия", icon: FileText }
                ]
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-2xl transition-all duration-500 ${plan.popular ? 'bg-primary text-primary-foreground shadow-2xl scale-105 z-10 ring-4 ring-primary/20' : 'bg-background shadow-lg hover:shadow-xl'}`}
              >
                {plan.popular && (
                  <>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-semibold shadow-lg">
                      Популярный
                    </div>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-2xl ring-2 ring-primary-foreground/30 pointer-events-none"
                    />
                  </>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">{plan.price}</div>
                  <div className={`text-sm ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{plan.period}</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className={`p-1 rounded-full ${plan.popular ? 'bg-primary-foreground/20' : 'bg-primary/10'}`}>
                        <feature.icon className={`w-4 h-4 ${plan.popular ? 'text-primary-foreground' : 'text-primary'}`} />
                      </div>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "secondary" : "default"}
                  className={`w-full text-lg h-12 shadow-lg ${plan.popular ? 'hover:bg-white hover:text-primary' : 'hover:bg-primary/90'} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  onClick={() => scrollToSection('form')}
                >
                  Выбрать пакет
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Почему мы */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Почему CentrLP
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "Фокус на LTV и ROI, а не на «красивые картинки»", icon: Briefcase },
              { text: "AI-технологии снижают стоимость разработки на 30%", icon: Zap },
              { text: "Знаем специфику рынка Тюмени и регионов", icon: MapPin },
              { text: "Строим единую систему: Сайт + CRM + Реклама", icon: Settings },
              { text: "Юридическая гарантия сроков и результата", icon: FileText },
              { text: "Гибкие условия оплаты и бартер", icon: CreditCard }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-background rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Частые вопросы
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Почему вы используете AI, это не ухудшает качество?",
                a: "Наоборот. AI позволяет нам проанализировать объемы данных, на которые у человека ушли бы недели (конкуренты, отзывы, тренды). Мы тратим время на стратегию, а не на рутину.",
                icon: Zap
              },
              {
                q: "Как быстро окупятся вложения в сайт?",
                a: "При запуске рекламы первые заявки идут уже на 3-5 день. Средняя окупаемость наших проектов — 1-2 месяца.",
                icon: TrendingUp
              },
              {
                q: "Что если сайт не будет приносить заявки?",
                a: "Мы работаем по KPI. Если конверсия ниже плановой, мы бесплатно докручиваем офферы и структуру, пока не выйдем на целевые показатели.",
                icon: HelpCircle
              },
              {
                q: "Нужно ли мне разбираться в программировании?",
                a: "Нет. Мы сдаем полностью готовый инструмент. Вы сможете менять цены и тексты через простую админку, как в Word.",
                icon: Settings
              },
              {
                q: "Вы настраиваете рекламу?",
                a: "Да, мы агентство полного цикла. Сайт без трафика бесполезен, поэтому мы предлагаем комплексное продвижение (Яндекс, ВК, Telegram).",
                icon: Rocket
              },
              {
                q: "Можно ли оплатить в рассрочку?",
                a: "Да, для юрлиц есть рассрочка от банка-партнера или поэтапная оплата (30/40/30).",
                icon: CreditCard
              },
              {
                q: "Работаете ли вы по бартеру?",
                a: "Да, мы открыты к сотрудничеству. Если у вас качественный продукт/услуга, мы готовы обсудить частичный или полный бартер.",
                icon: Users
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={false}
                className="border border-border/50 rounded-xl overflow-hidden bg-card"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="flex items-center justify-between w-full p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-lg">{item.q}</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-muted-foreground border-t border-border/50">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="form" className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

        <div className="container max-w-4xl text-center mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-xl mx-auto mb-6 relative">
              <MessageSquare className="w-10 h-10 text-primary" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs text-white font-bold animate-bounce">1</div>
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы запустить сайт, который работает?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Оставьте заявку — разберём ваш проект, предложим решение и рассчитаем стоимость
          </p>
        </div>
        <div className="container max-w-2xl relative z-10">
          <div className="bg-card shadow-2xl rounded-2xl p-1 border border-border/50">
            <ContactForm />
          </div>
        </div>
        <div className="container max-w-2xl mt-12 text-center relative z-10">
          <p className="text-muted-foreground mb-4">Или напишите напрямую:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacts">
              <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                Контакты и мессенджеры
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
