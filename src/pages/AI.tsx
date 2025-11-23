import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Shield, Clock, TrendingUp, MessageSquare, FileText, Users, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const AI = () => {
  const tags = [
    { text: "Аналитика", top: "15%", left: "10%", delay: 0 },
    { text: "Нейросети", top: "25%", right: "15%", delay: 1.5 },
    { text: "Автоматизация", bottom: "20%", left: "15%", delay: 1 },
    { text: "Реклама", bottom: "30%", right: "10%", delay: 2 },
    { text: "Воронки", top: "10%", left: "50%", delay: 0.5 },
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
    <Layout>
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
            >
              <Brain className="w-4 h-4" />
              <span>AI-Integration 2.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
            >
              Маркетинг на <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
                скоростях AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Внедряем искусственный интеллект в продажи, аналитику и рутину.
              Гипотезы проверяются за часы, а не недели.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <a href="#callbackkiller" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 text-lg px-8 rounded-full shadow-lg hover:shadow-primary/25 transition-all">
                  Хочу AI в маркетинге
                </Button>
              </a>
              <a href="#callbackkiller" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-14 text-lg px-8 rounded-full border-2">
                  Разобрать мой проект
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground/70"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Работаем с реальными проектами: сайты, реклама, аналитика</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему ИИ нужен вашему бизнесу</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Искусственный интеллект — это не про сложные технологии. Это про реальные деньги,
              которые вы экономите и зарабатываете.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { icon: Clock, title: "Экономия времени", desc: "Бот отвечает на 80% типовых вопросов, освобождая время для важных задач", color: "text-primary" },
              { icon: TrendingUp, title: "Рост конверсии", desc: "Мгновенные ответы 24/7 увеличивают вероятность заявки на 40–60%", color: "text-accent-1" },
              { icon: Users, title: "Разгрузка персонала", desc: "Сотрудники занимаются продажами, а не ответами на одни и те же вопросы", color: "text-accent-2" },
              { icon: Shield, title: "Безопасность данных", desc: "Соблюдаем 152-ФЗ и требования к обработке персональных данных", color: "text-primary" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 text-center shadow-card hover:shadow-lg transition-all duration-300 border-primary/5 h-full flex flex-col items-center justify-center group">
                  <div className={`w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="font-bold mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 bg-background relative">
        <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full -z-10" />
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что мы внедряем</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Готовые ИИ-решения, адаптированные под вашу нишу и особенности бизнеса
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 shadow-card bg-card h-full border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Автоответы 24/7 и help-боты</h3>
                </div>
                <p className="text-muted-foreground mb-8 text-lg">
                  ИИ-ассистент, который работает круглосуточно: отвечает на вопросы, собирает заявки,
                  консультирует по товарам и услугам. Клиент получает ответ мгновенно, даже когда вы
                  спите.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "Для мебельной мастерской:", text: "«Сколько стоит кухня 3 на 4 метра?» → Бот задаёт уточняющие вопросы по материалам, фурнитуре и даёт примерный расчёт за 2 минуты." },
                    { title: "Для СТО:", text: "«Сколько стоит полировка фар?» → Бот уточняет марку авто, тип фар, предлагает удобное время записи." },
                    { title: "Для клининга:", text: "«Хочу заказать уборку двушки» → Бот запрашивает площадь, тип уборки, считает стоимость и записывает клиента." }
                  ].map((example, i) => (
                    <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border/50">
                      <p className="font-semibold mb-2 text-primary">{example.title}</p>
                      <p className="text-sm text-muted-foreground">{example.text}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 shadow-card bg-card h-full border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">ИИ-скрипты продаж</h3>
                </div>
                <p className="text-muted-foreground mb-8 text-lg">
                  Умный ассистент для вашего менеджера или мастера. Подсказывает правильные ответы на
                  возражения, напоминает о допродажах, помогает довести клиента до сделки.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      Что делает ИИ-ассистент:
                    </p>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {[
                        "Анализирует вопрос клиента и предлагает готовый ответ",
                        "Подсказывает, как закрыть возражение «дорого» или «подумаю»",
                        "Напоминает о допродажах и комплексных пакетах",
                        "Помогает новичкам продавать как опытным менеджерам"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start bg-background p-3 rounded-lg border shadow-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                    <p className="font-semibold mb-2 text-primary">Пример работы:</p>
                    <p className="text-sm text-muted-foreground italic">
                      "Клиент говорит «дорого». ИИ мгновенно подсказывает менеджеру: «Предложите
                      рассрочку 0-0-6 или акцию на комплексный пакет со скидкой 15%»."
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 shadow-card bg-card h-full border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Генерация текстов и A/B-вариантов</h3>
                </div>
                <p className="text-muted-foreground mb-8 text-lg">
                  ИИ создаёт тексты для объявлений, постов, страниц сайта. Генерирует 5–10 вариантов
                  заголовков и офферов, которые можно сразу тестировать в рекламе.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold mb-4">Что генерирует ИИ:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Заголовки для рекламы",
                        "Тексты для постов",
                        "Описания товаров",
                        "Адаптация под сегменты"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg text-sm">
                          <Zap className="w-4 h-4 text-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                    <p className="font-semibold mb-2 text-yellow-600 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Важно:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Все тексты проходят модерацию специалиста, чтобы соответствовать требованиям
                      рекламного законодательства и звучать естественно для вашей ниши.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 shadow-card bg-card h-full border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">A/B-тесты на основе ИИ</h3>
                </div>
                <p className="text-muted-foreground mb-8 text-lg">
                  ИИ генерирует несколько вариантов ключевых блоков сайта или объявлений, запускает
                  их в тест и автоматически отключает слабые варианты. Вы получаете проверенные
                  рабочие связки.
                </p>
                <div className="space-y-6">
                  <div className="bg-background rounded-xl p-6 shadow-inner border">
                    <p className="font-semibold mb-4">Алгоритм работы:</p>
                    <ol className="space-y-3 text-sm text-muted-foreground">
                      {[
                        "ИИ создаёт 3–5 вариантов заголовка или оффера",
                        "Запускаем их одновременно в рекламе",
                        "Через 3–7 дней анализируем данные Метрики",
                        "Отключаем варианты с высоким CPL",
                        "Масштабируем лучший вариант"
                      ].map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                    <p className="font-semibold mb-2 text-green-600">Результат:</p>
                    <p className="text-sm text-muted-foreground">
                      Снижение стоимости заявки на 20–40% за счёт постоянного тестирования и
                      отключения неэффективных вариантов.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ and Knowledge Base */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQ-бот и база знаний на ИИ</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Создаём базу знаний, которая обучает бота отвечать на вопросы клиентов так, как
              ответили бы вы
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 shadow-card h-full">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  Что входит в базу знаний:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Описание всех товаров и услуг с ценами",
                    "Ответы на 50–100 частых вопросов (сроки, доставка, гарантия)",
                    "Инструкции для разных ситуаций",
                    "Ваши уникальные фишки и преимущества",
                    "Правила работы с возражениями"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 bg-muted/20 p-3 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 shadow-card h-full bg-primary text-primary-foreground">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-white rounded-full" />
                  Как бот использует базу знаний:
                </h3>
                <ul className="space-y-4">
                  {[
                    "Понимает вопрос клиента даже в свободной форме",
                    "Находит нужную информацию в базе за доли секунды",
                    "Формулирует ответ простым языком",
                    "Передаёт сложные вопросы оператору с контекстом диалога",
                    "Учится на новых вопросах и дополняет базу"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                      <Zap className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Assistant for Manager */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ассистент для менеджера</h2>
              <p className="text-lg text-muted-foreground">
                ИИ помогает менеджеру в режиме реального времени: подсказывает, что ответить,
                какую акцию предложить, как закрыть возражение
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  title: "Сценарий 1: Клиент сомневается в цене",
                  client: "«У конкурентов на 10% дешевле»",
                  ai: "«Уточните, учитывали ли они стоимость доставки и установки? Предложите сравнить полный пакет. У нас бесплатная доставка и гарантия 3 года.»"
                },
                {
                  title: "Сценарий 2: Клиент откладывает решение",
                  client: "«Я ещё подумаю»",
                  ai: "«Создайте срочность: 'Сейчас действует акция −15% до конца недели. Могу зафиксировать цену на 3 дня, пока вы думаете.'»"
                },
                {
                  title: "Сценарий 3: Допродажа",
                  client: "Заказывает базовый пакет",
                  ai: "«Предложите комплексный пакет: 'Многие клиенты берут сразу с защитным покрытием — выходит на 20% выгоднее, чем по отдельности.'»"
                }
              ].map((scenario, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-card border rounded-2xl p-6 shadow-sm"
                >
                  <h3 className="font-bold mb-6 text-center text-muted-foreground uppercase tracking-wider text-sm">{scenario.title}</h3>
                  <div className="flex flex-col gap-4">
                    <div className="self-start max-w-[80%] bg-muted rounded-2xl rounded-tl-none p-4">
                      <p className="text-xs font-bold text-muted-foreground mb-1">Клиент</p>
                      <p className="text-sm md:text-base">{scenario.client}</p>
                    </div>
                    <div className="self-end max-w-[80%] bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-none p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-3 h-3 text-primary" />
                        <p className="text-xs font-bold text-primary">ИИ-Подсказка</p>
                      </div>
                      <p className="text-sm md:text-base text-foreground/90">{scenario.ai}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security and Compliance */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Безопасность и 152-ФЗ</h2>
              <p className="text-lg text-muted-foreground">
                Все ИИ-решения соответствуют требованиям российского законодательства
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 shadow-card h-full border-l-4 border-l-primary">
                  <h3 className="font-bold mb-6 text-xl">Защита персональных данных</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    {[
                      "Согласие на обработку данных перед началом диалога",
                      "Шифрование данных при передаче и хранении",
                      "Право клиента на удаление данных по запросу"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-full"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 shadow-card h-full border-l-4 border-l-accent-2">
                  <h3 className="font-bold mb-6 text-xl">Соответствие рекламному праву</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    {[
                      "Тексты проверяются на соответствие ФЗ-38 «О рекламе»",
                      "Запрет на недостоверную информацию",
                      "Корректные формулировки без обещаний гарантированного результата"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent-1 opacity-90" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Готовы автоматизировать бизнес с ИИ?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Проконсультируем, подберём подходящие решения и внедрим за 7–14 дней
            </p>
            <a href="#callbackkiller">
              <Button size="lg" className="h-16 px-10 text-lg bg-white text-primary hover:bg-white/90 shadow-2xl animate-pulse-gentle rounded-full">
                Получить консультацию по ИИ
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AI;
