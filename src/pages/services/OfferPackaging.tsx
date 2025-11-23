import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Gift, Target, Zap, CheckCircle, TrendingUp, Brain,
  AlertTriangle, XCircle, CheckCircle2, ArrowRight, Sparkles,
  Search, Shield, MousePointerClick, Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";

const OfferPackaging = () => {
  const scrollToForm = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const tags = [
    { text: "УТП", top: "15%", left: "10%", delay: 0 },
    { text: "Конверсия", top: "25%", right: "15%", delay: 1.5 },
    { text: "Смыслы", bottom: "20%", left: "15%", delay: 1 },
    { text: "Гарантия", bottom: "30%", right: "10%", delay: 2 },
    { text: "Выгода", top: "10%", left: "50%", delay: 0.5 },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <Layout
      title="Упаковка оффера и УТП | CentrLP"
      description="Создание сильных торговых предложений (офферов) для вашего бизнеса. Анализ конкурентов, AI-генерация гипотез и формулировка выгод."
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
            <Zap className="w-4 h-4" />
            <span>Оффер решает всё</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight text-foreground"
          >
            Продажи растут не от дизайна, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">
              а от смысла
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Мы формируем предложение, от которого невозможно отказаться.
            Оффер, который выделяет вас среди конкурентов и заставляет клиента сказать «Хочу!».
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:scale-105 transition-all" onClick={scrollToForm}>
              Упаковать оффер
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full border-2 hover:scale-105 transition-all" onClick={scrollToForm}>
              Получить разбор
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground/70 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Работаем с бизнесом в Тюмени и по России. Используем AI для анализа трендов.
          </motion.p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему вы теряете деньги</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Признаки того, что ваш оффер не работает
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Реклама есть, заявок нет",
                desc: "Вы тратите бюджет на трафик, но люди заходят на сайт и уходят. Им не интересно."
              },
              {
                title: "Цены как у всех",
                desc: "Вы ничем не отличаетесь от конкурентов. Клиент выбирает того, кто ближе или дешевле."
              },
              {
                title: "Конкуренты копируют",
                desc: "Вы придумываете акцию, а завтра она у всех. У вас нет уникального ядра."
              },
              {
                title: "Лидов много, продаж нет",
                desc: "Заявки «мусорные». Люди ищут халяву, а не ценность. Оффер привлекает не тех."
              },
              {
                title: "Клиенты «думают»",
                desc: "И уходят думать навсегда. Ваше предложение не создает срочности и желания купить сейчас."
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

      {/* How We Solve */}
      <section className="py-24 bg-[#0A0F1C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Как мы создаем сильный оффер</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Технология превращения «просто услуги» в «непреодолимое предложение»
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Глубокий анализ ниши",
                desc: "Изучаем 100+ предложений конкурентов. Находим их слабые места и шаблоны, чтобы сделать по-другому.",
                icon: Search
              },
              {
                step: "02",
                title: "Снятие инсайтов",
                desc: "Понимаем истинные боли и страхи клиента. Чего он боится? Чего хочет на самом деле? (Не дрель, а дырку в стене).",
                icon: Target
              },
              {
                step: "03",
                title: "Формула оффера",
                desc: "Собираем конструктор: Ядро (суть) + Бонусы (ценность) + Гарантия (снятие риска) + Дедлайн (триггер).",
                icon: Gift
              },
              {
                step: "04",
                title: "AI-анализ трендов",
                desc: "Используем нейросети, чтобы найти свежие формулировки и метафоры, которые еще не замылили глаз.",
                icon: Brain
              },
              {
                step: "05",
                title: "Тестирование вариантов",
                desc: "Не гадаем, а предлагаем 3-5 гипотез. Выбираем ту, которая бьет точно в цель.",
                icon: MousePointerClick
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

      {/* Examples */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Примеры сильных офферов</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Почувствуйте разницу между «мы продаем кухни» и этим:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Кухни на заказ",
                old: "Изготовление кухонь любой сложности. Качественно и недорого.",
                new: "Монтаж кухни за 24 часа под ключ, иначе вернём 15% стоимости. Дизайн-проект в подарок."
              },
              {
                title: "Маркетинговое агентство",
                old: "Настройка контекстной рекламы. Опыт 10 лет.",
                new: "Сайт с заявками с первого дня или ведём рекламу месяц бесплатно. Оплата за результат."
              },
              {
                title: "Автосервис",
                old: "Ремонт автомобилей всех марок. Диагностика ходовой.",
                new: "Диагностика авто с гарантией точности: если ошибёмся и проблема останется — ремонт за наш счёт."
              },
              {
                title: "Клининг",
                old: "Уборка квартир и офисов. Профессиональная химия.",
                new: "Уборка квартиры за 3 часа. Если найдёте пыль после нас — мойка окон в подарок."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-none shadow-lg">
                  <div className="grid grid-rows-2 h-full">
                    <div className="bg-secondary/50 p-6 border-b border-border/50">
                      <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Было (Скучно)</div>
                      <p className="text-muted-foreground italic">"{item.old}"</p>
                    </div>
                    <div className="bg-primary/5 p-6 relative">
                      <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                        Стало (Огонь)
                      </div>
                      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{item.title}</div>
                      <p className="font-bold text-foreground text-lg">"{item.new}"</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Integration */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-1/10 text-accent-1 text-sm font-medium mb-6">
                <Brain className="w-4 h-4 mr-2" />
                AI-технологии
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Как AI делает ваш оффер непобедимым</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Мы не просто креативим, мы используем данные.
              </p>
              <ul className="space-y-4">
                {[
                  "Собираем и анализируем 100+ офферов конкурентов за минуты",
                  "Находим слабые точки и «слепые зоны» в нише",
                  "Генерируем десятки гипотез и формулировок",
                  "Выстраиваем формулы: Боль → Решение → Результат",
                  "Делаем предложение математически выгоднее, чем у других"
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
                  <Lightbulb className="w-10 h-10 text-primary" />
                  <div>
                    <h3 className="font-bold text-xl">Генератор смыслов</h3>
                    <p className="text-sm text-muted-foreground">AI + Эксперт</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-lg rounded-tl-none text-sm">
                    <p className="font-semibold mb-1 text-primary">Задача:</p>
                    <p className="text-muted-foreground">Усилить оффер для студии растяжки. Сейчас: "Пробное занятие бесплатно".</p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg rounded-tr-none text-sm border border-primary/20">
                    <p className="font-semibold mb-1 text-primary">Решение:</p>
                    <p className="text-foreground font-medium">"Сядь на шпагат за 2 месяца или вернем деньги. Первое занятие + диагностика гибкости — 0₽"</p>
                  </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Стоимость упаковки</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Инвестиция, которая окупается с первой продажи
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            <Card className="relative hover:shadow-2xl transition-all duration-300 border-primary shadow-lg bg-background">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                Результат под ключ
              </div>
              <CardHeader className="text-center">
                <h3 className="text-2xl font-bold">Упаковка оффера</h3>
                <div className="text-4xl font-bold text-primary mt-2">от 20 000 ₽</div>
                <p className="text-sm text-muted-foreground mt-2">Полная проработка вашего предложения</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span>Глубокий анализ конкурентов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span>Разработка 3-5 вариантов офферов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span>Формулировка бонусов и гарантий</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span>Рекомендации по внедрению на сайт/в рекламу</span>
                  </li>
                </ul>
                <Button size="lg" className="w-full h-12 text-lg" onClick={scrollToForm}>Заказать упаковку</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Text */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-sm text-muted-foreground leading-relaxed space-y-4">
            <h3 className="text-base font-bold text-foreground">Важность сильного оффера в 2026 году</h3>
            <p>
              В условиях жесткой конкуренции <strong>уникальное торговое предложение (УТП)</strong> становится главным фактором выживания бизнеса. 70% компаний закрываются, потому что не могут объяснить клиенту, почему нужно купить именно у них. Мы предлагаем профессиональную <strong>упаковку оффера</strong>, которая базируется на психологии выбора и рациональных триггерах.
            </p>
            <p>
              Использование <strong>AI в маркетинге</strong> позволяет нам анализировать огромные массивы данных и находить инсайты, недоступные при ручном поиске. Мы создаем офферы, которые бьют точно в цель, используя эмоциональные крючки и логические обоснования. Грамотно упакованное предложение повышает конверсию рекламы и сайта в разы, снижая стоимость привлечения клиента.
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
            <h2 className="text-3xl font-bold mb-4">Готовы продавать больше?</h2>
            <p className="text-muted-foreground text-lg">
              Оставьте заявку — мы улучшим ваше предложение в 4 раза сильнее, чем сейчас.
            </p>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default OfferPackaging;