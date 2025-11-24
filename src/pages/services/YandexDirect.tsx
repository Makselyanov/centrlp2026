import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  BarChart,
  AlertTriangle,
  Brain,
  Search,
  MousePointerClick,
  Clock,
  ArrowRight,
  FileText,
  Phone,
  Zap,
  PieChart,
  Layers
} from "lucide-react";
import { motion } from "framer-motion";

const YandexDirect = () => {
  // Animation variants
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

  // Floating icons configuration
  const floatingIcons = [
    { icon: FileText, top: "15%", left: "10%", delay: 0, color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Phone, top: "25%", right: "15%", delay: 1.5, color: "text-green-500", bg: "bg-green-500/10" },
    { icon: TrendingUp, bottom: "20%", left: "15%", delay: 1, color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: Zap, bottom: "30%", right: "10%", delay: 2, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  ];

  return (
    <Layout
      title="Реклама в Яндекс Директ с AI-оптимизацией | CentrLP"
      description="Настройка и ведение рекламы в Яндекс Директ. Разбираем нишу, тестируем офферы, подключаем AI и считаем окупаемость."
    >
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50">
        {/* Background Noise & Glow */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/5 rounded-full blur-[120px] -z-10" />

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {floatingIcons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
              className={`absolute p-3 rounded-2xl ${item.bg} backdrop-blur-sm border border-white/50 shadow-sm hidden sm:block`}
              style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
            >
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 text-sm font-medium mb-8 border border-blue-200"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>AI-Optimized Direct</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
            >
              Яндекс.Директ, который <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                приносит заявки
              </span>, а не сливает бюджет
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Разбираем вашу нишу, тестируем офферы, подключаем AI-оптимизацию и считаем окупаемость по заявкам, а не по кликам. Первые результаты обычно в течение 7–14 дней.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all" asChild>
                <a href="#contact">Запустить рекламу</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Block 1: Pain Points */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Узнаёте свой сценарий?</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Частые ситуации, с которыми к нам приходят клиенты после неудачного опыта
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: AlertTriangle,
                title: "Запустили сами",
                desc: "Трафик идёт, но звонков почти нет. Деньги уходят в никуда, в отчётах красивые цифры, но результата ноль.",
                color: "text-orange-500",
                bg: "bg-orange-50"
              },
              {
                icon: FileText,
                title: "Агентство-отчётники",
                desc: "Менеджер присылает отчёт раз в месяц, но вы не понимаете, что реально делается. Ощущение, что кампании просто брошены.",
                color: "text-blue-500",
                bg: "bg-blue-50"
              },
              {
                icon: TrendingUp,
                title: "Страшно увеличивать бюджет",
                desc: "Заявки есть, но нестабильные. Каждый раз боитесь включить дополнительные кампании, чтобы не слить бюджет.",
                color: "text-red-500",
                bg: "bg-red-50"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                      <item.icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 2: How We Work */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Не “настройка за 2 дня”, а нормальная системная работа
              </h2>
            </motion.div>

            <div className="grid gap-6">
              {[
                {
                  title: "Разбор вашей ниши и конкурентов",
                  desc: "Определяем реальные точки роста, офферы, которые сработают именно у вас.",
                  icon: Search
                },
                {
                  title: "Структура кампаний под воронку",
                  desc: "Поиск, РСЯ, бренд, конкуренты, ретаргетинг. Холодный и тёплый трафик разводим грамотно.",
                  icon: Layers
                },
                {
                  title: "Объявления, которые говорят человеческим языком",
                  desc: "Не канцелярит, а кликабельные фразы, которые вызывают доверие.",
                  icon: MessageSquare
                },
                {
                  title: "Подключение аналитики",
                  desc: "Считаем заявки, звонки, обращения. Не клики.",
                  icon: PieChart
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-6 items-start"
                >
                  <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: AI Enhancements */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/50 text-purple-700 text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              <span>AI-Powered</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Где здесь AI и почему это добавляет эффективности
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Чистка мусорных запросов",
                desc: "AI анализирует поисковые фразы, фильтрует нерелевантный трафик быстрее, чем руками.",
                icon: AlertTriangle
              },
              {
                title: "Поиск новых рабочих связок",
                desc: "AI помогает находить запросы и формулировки, которые приводят дешёвые заявки.",
                icon: Search
              },
              {
                title: "Генерация и тест объявлений",
                desc: "Можно быстро тестировать десятки вариантов без лишней траты бюджета.",
                icon: Zap
              },
              {
                title: "Прогноз CPA и бюджета",
                desc: "На старте формируется реалистичный диапазон стоимости заявки.",
                icon: BarChart
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-slate-200 hover:border-purple-200 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-3 text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 4: Target Audience */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Кому это подходит</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Локальный бизнес",
                desc: "Салоны, автосервисы, клиники, мастерские. Получаете клиентов из своего города.",
                icon: Target
              },
              {
                title: "E-commerce",
                desc: "Интернет-магазины в России. Привлекаем покупателей через поиск и РСЯ.",
                icon: Users
              },
              {
                title: "B2B-сектор",
                desc: "Поставщики, подрядчики, сложные ниши. Получаете лиды по целевым запросам.",
                icon: BarChart
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-none shadow-md">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-600">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5: CTA Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Начните получать клиентов из Яндекса уже через неделю
              </h2>
              <p className="text-xl text-slate-500">
                Оставьте контакты, мы разберём вашу нишу и вышлем честный прогноз по заявкам и бюджету.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-slate-100 p-8 md:p-10"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default YandexDirect;