import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Star, TrendingUp, Shield, Target, BarChart, PenTool, Layout as LayoutIcon, MessageSquare, Search, Briefcase, RefreshCw, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const Prices = () => {
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
      popular: false
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
      popular: true
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
      popular: false
    }
  ];

  const services = [
    { title: "Квиз «Продажа под ключ»", price: "15 000–35 000 ₽", desc: "Многошаговый квиз с продуманной логикой и ИИ-оптимизацией.", solve: "Выявление потребностей, рост конверсии.", icon: HelpCircle },
    { title: "ИИ-скрипты продаж", price: "10 000–25 000 ₽", desc: "Сценарии обработки возражений, FAQ-модуль, подсказки.", solve: "Низкая конверсия менеджеров, хаос в диалогах.", icon: MessageSquare },
    { title: "Генерация текста и A/B", price: "10 000–20 000 ₽", desc: "SEO-тексты, заголовки, офферы, варианты лендинга.", solve: "Слабый копирайтинг, отсутствие чёткого оффера.", icon: PenTool },
    { title: "Сайт на Tilda (5–10 стр)", price: "45 000–70 000 ₽", desc: "Полная сборка с адаптивом, SEO и аналитикой.", solve: "Отсутствие продающего сайта.", icon: LayoutIcon },
    { title: "Оформление ВКонтакте", price: "12 000–25 000 ₽", desc: "Обложки, меню, закреп, посты, CTA-блоки.", solve: "Непродающий профиль, низкая вовлечённость.", icon: LayoutIcon },
    { title: "Настройка Яндекс.Директ", price: "от 20 000 ₽", desc: "Поиск + РСЯ, минус-слова, ИИ-заголовки.", solve: "Дорогие клики, слив бюджета.", icon: Search },
    { title: "Настройка рекламы ВК", price: "от 18 000 ₽", desc: "Прогрев, лид-формы, ретаргетинг.", solve: "Мало заявок, низкое качество трафика.", icon: Target },
    { title: "Фирменный стиль + лого", price: "18 000–40 000 ₽", desc: "Стиль, логотип, шаблоны, цвета.", solve: "Отсутствие визуальной айдентики.", icon: PenTool },
    { title: "Контент-план + креативы", price: "от 15 000 ₽", desc: "Посты, баннеры, сторис, объявления.", solve: "Несистемный контент, слабое привлечение.", icon: MessageSquare },
    { title: "Бизнес-план и финмодель", price: "от 25 000 ₽", desc: "Юнит-экономика, окупаемость, сметы.", solve: "Непонимание цифр и рисков.", icon: BarChart },
    { title: "Маркетинговая стратегия", price: "18 000–45 000 ₽", desc: "Позиционирование, медиаплан, гипотезы.", solve: "Хаотичный маркетинг.", icon: Target },
    { title: "Анализ конкурентов", price: "8 000–18 000 ₽", desc: "Разбор офферов, цен, структуры сайтов.", solve: "Слабый УТП, нерелевантные цены.", icon: Search },
    { title: "Юнит-экономика", price: "10 000–20 000 ₽", desc: "Модель, сценарии «минимум/норма/оптимум».", solve: "Непонимание рентабельности.", icon: BarChart },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0096D6] to-[#44B78B]"
          >
            Цены и пакеты услуг
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Прозрачное ценообразование. Работаем официально по договору.
          </motion.p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                id={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative p-8 h-full flex flex-col ${pkg.popular ? 'border-primary shadow-xl scale-105 z-10 bg-card' : 'border-border bg-card/50'}`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Хит продаж
                    </div>
                  )}
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${pkg.popular ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                      <pkg.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                    <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-sm">{pkg.description}</p>

                  <div className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg mb-6">
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Решает проблему:</div>
                    <p className="text-sm italic">{pkg.solve}</p>
                  </div>

                  <a href="#form" className="w-full">
                    <Button variant={pkg.popular ? "default" : "outline"} className="w-full">
                      Заказать
                    </Button>
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Отдельные услуги</h2>
            <p className="text-muted-foreground">Точечные решения для вашего бизнеса</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-border/50 hover:border-primary/50 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg block">{service.price}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>

                  <div className="pt-4 border-t border-border/50">
                    <span className="text-xs font-medium text-muted-foreground">Решает: </span>
                    <span className="text-xs">{service.solve}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Barter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/10 via-accent-1/10 to-accent-2/10 rounded-3xl p-8 md:p-12 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Специальное предложение
                </div>
                <h2 className="mb-4">Бартер-пакеты</h2>
                <p className="text-xl mb-6">Эквивалент 80 000+ ₽</p>
                <p className="text-muted-foreground mb-6">
                  Для мебельщиков, СТО/детейлинга, клининга, салонов услуг.
                  <br />
                  Взаимозачёт по договору, фиксированная программа работ.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Shield className="w-4 h-4" />
                  Решает: отсутствие бюджета на старте
                </div>
              </div>
              <div className="flex-shrink-0">
                <a href="#form">
                  <Button size="lg" className="shadow-lg">Обсудить бартер</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="form" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="mb-4">Оставить заявку</h2>
            <p className="text-muted-foreground">
              Заполните форму, и мы свяжемся с вами для обсуждения деталей
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer Note */}
      <section className="pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-secondary p-6 rounded-xl max-w-3xl">
            <h4 className="font-bold mb-2 flex items-center justify-center gap-2">
              <Briefcase className="w-5 h-5" />
              Официально и прозрачно
            </h4>
            <p className="text-sm text-muted-foreground">
              Все услуги выполняются официально, по договору НПД, с этапами, ТЗ и прозрачной отчётностью.
              Мы гарантируем качество и соблюдение сроков.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Prices;
