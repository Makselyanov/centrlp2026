import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Users,
  Zap,
  MessageCircle,
  ShoppingBag,
  Smartphone,
  Bot,
  BarChart,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Play,
  Calculator,
  Ghost,
  RefreshCw,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";

const VKAds = () => {
  // Calculator State
  const [budget, setBudget] = useState([50000]);
  const [churn, setChurn] = useState([70]);
  const [loss, setLoss] = useState(0);

  useEffect(() => {
    // Formula: Budget * 3 months * (churn / 100)
    const calculatedLoss = budget[0] * 3 * (churn[0] / 100);
    setLoss(calculatedLoss);
  }, [budget, churn]);

  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  // Floating Icons Config
  const floatingIcons = [
    { icon: MessageCircle, top: "15%", left: "10%", delay: 0, color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Target, top: "25%", right: "15%", delay: 1.5, color: "text-red-500", bg: "bg-red-500/10" },
    { icon: Bot, bottom: "20%", left: "15%", delay: 1, color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: Smartphone, bottom: "30%", right: "10%", delay: 2, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  // Counter Animation
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < 92 ? prev + 1 : 92));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
      title="Таргет ВКонтакте 2026: AI и комплексный подход | CentrLP"
      description="Реклама в ВК без отговорок: сообщество + виджеты + чат-боты. Кейс: 200% роста через интеграцию AI и бартера."
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
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 text-sm font-medium mb-8 border border-blue-200"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>AI-Targeting 2026</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              Таргет ВКонтакте 2026: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                AI, 0 отговорок и 200% роста
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              75% рекламы в ВК тухнет через 2–3 месяца, когда «ваш» маркетолог уходит.
              Мы создаем автономную систему (сообщество + виджеты + чат-боты + AI-оптимизация),
              которая работает даже без вас. Ваши конкуренты уже используют это в 2026. Вы готовы?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all group" asChild>
                <a href="#how-it-works">
                  Узнать, как это работает
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>{count}% кампаний растут через 6 месяцев</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points: 4 Killers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Почему таргет “умирает” через 2 месяца? <br />
              <span className="text-red-500">4 убийцы вашего бюджета</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Маркетолог-однодневка",
                problem: "Новый специалист не разбирает историю кампаний → таргет «сбивается».",
                solution: "Мы строим систему с документацией и AI-анализом, который передает контекст новым сотрудникам за 1 день.",
                icon: Ghost,
                color: "text-slate-500",
                bg: "bg-slate-100"
              },
              {
                title: "Разные люди = отговорки",
                problem: "Если сообщество ведет один, рекламу — другой, все говорят: «Это не моя зона».",
                solution: "Одна команда для всего: интегрируем сайт в приложение ВК, запускаем чат-боты.",
                icon: Users,
                color: "text-orange-500",
                bg: "bg-orange-50"
              },
              {
                title: "Таргет без AI",
                problem: "Ручная настройка аудиторий не учитывает тренды 2026 (голосовые запросы, VR).",
                solution: "Наш AI-движок анализирует поведение в реальном времени и корректирует ставки каждые 15 минут.",
                icon: Bot,
                color: "text-purple-500",
                bg: "bg-purple-50"
              },
              {
                title: "Нет удержания",
                problem: "90% клиентов уходят после первого клика без покупки.",
                solution: "Виджеты + чат-боты в сообществе возвращают 65% брошенных корзин.",
                icon: RefreshCw,
                color: "text-blue-500",
                bg: "bg-blue-50"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-6`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-red-500 bg-red-50 p-2 rounded-lg">
                        <span className="font-semibold">Проблема:</span> {item.problem}
                      </p>
                      <p className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                        <span className="font-semibold">Решение:</span> {item.solution}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Do It: Complex Approach 2026 */}
      <section id="how-it-works" className="py-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ВКонтакте — это не только реклама. <br />
              Это экосистема, где ваш сайт живет внутри соцсети
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              className="col-span-1 lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white border-none overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Layers className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Сообщество + Реклама</h3>
                      <p className="text-blue-100">
                        Виджеты и чат-боты конвертируют лиды из объявлений в подписчики.
                        Мы не просто льем трафик, а строим базу лояльных клиентов.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                  <CardContent className="p-6">
                    <Smartphone className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Сайт как приложение ВК</h3>
                    <p className="text-slate-600 text-sm">
                      Пользователь не покидает соцсеть, оформляет заказ в 1 клик. Бесшовная интеграция повышает конверсию на 40%.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-md">
                  <CardContent className="p-6">
                    <Bot className="w-10 h-10 text-purple-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">AI-оптимизация</h3>
                    <p className="text-slate-600 text-sm">
                      Движок корректирует таргет под тренды 2026: голосовые запросы ("Нужна обувь для пробежек") и VR-превью.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Тренды 2026
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Голосовой поиск в ВК</h4>
                    <p className="text-sm text-slate-500">AI анализирует фразы и показывает релевантную рекламу.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">VR-превью товаров</h4>
                    <p className="text-sm text-slate-500">Пользователи «примеряют» одежду в 3D через виджет.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Автономные чат-боты</h4>
                    <p className="text-sm text-slate-500">Обрабатывают 80% заявок без человека.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Реальный кейс
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Сеть магазинов “СТО” увеличила продажи на 200% за 6 месяцев
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto bg-slate-50 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-red-500">Проблема:</h3>
                  <p className="text-slate-600">Низкая вовлеченность, брошенные корзины, отсутствие удержания.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-green-600">Наше решение:</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>Интегрировали сайт в приложение ВК</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>Запустили чат-бота для бартерных сделок («Обменяйте старые кроссовки на скидку 30%»)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>AI-анализ показал интерес к бартеру, сместили фокус таргета</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-slate-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">+200%</div>
                      <div className="text-xs text-slate-500">Продажи</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">65%</div>
                      <div className="text-xs text-slate-500">Возврат (Retention)</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">+25%</div>
                      <div className="text-xs text-slate-500">Средний чек</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-200 relative min-h-[300px] flex items-center justify-center">
                {/* Placeholder for video/image */}
                <div className="text-center p-6">
                  <Play className="w-16 h-16 text-slate-400 mx-auto mb-4 opacity-50" />
                  <p className="text-slate-500 font-medium">Видео-кейс (30 сек)</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <a href="https://centrlp.ru/barter/sto" target="_blank" rel="noopener noreferrer">Смотреть кейс</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Сколько вы теряете без комплексного подхода?
              </h2>
              <p className="text-slate-400">
                Посчитайте убытки от смены маркетологов и отсутствия системы удержания
              </p>
            </motion.div>

            <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium mb-4 text-slate-300">
                      Средний бюджет на таргет в месяц: <span className="text-white font-bold text-lg">{budget[0].toLocaleString()} ₽</span>
                    </label>
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={500000}
                      step={5000}
                      className="py-4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-4 text-slate-300">
                      Процент ушедших клиентов (Churn Rate): <span className="text-white font-bold text-lg">{churn[0]}%</span>
                    </label>
                    <Slider
                      value={churn}
                      onValueChange={setChurn}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center text-center bg-slate-900/50 rounded-2xl p-6 border border-slate-700">
                  <Calculator className="w-12 h-12 text-red-500 mb-4" />
                  <div className="text-sm text-slate-400 mb-2">Вы теряете за квартал:</div>
                  <div className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
                    {Math.round(loss).toLocaleString()} ₽
                  </div>
                  <p className="text-sm text-slate-400 mb-6">
                    На смену маркетологов и разрозненные инструменты.
                  </p>
                  <div className="bg-green-500/10 text-green-400 p-4 rounded-xl text-sm w-full">
                    С нами — экономия 90% времени и рост на 150% через 6 месяцев.
                  </div>
                  <Button className="w-full mt-6 bg-white text-slate-900 hover:bg-slate-100" asChild>
                    <a href="#contact">Рассчитать свой кейс</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Formats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ваша реклама не умрет через 3 месяца
            </h2>
            <p className="text-lg text-slate-500">
              Все этапы контролирует одна команда. Никаких “это не моя задача”.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-all border-slate-200">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Ведение</h3>
                    <p className="text-3xl font-bold text-blue-600">30 000 ₽<span className="text-lg text-slate-400 font-normal">/мес</span></p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Оптимизация под тренды 2026: голосовые запросы, VR-превью</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Автоматизация ретаргетинга</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Еженедельные отчеты</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#contact">Выбрать тариф</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all border-purple-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                POPULAR
              </div>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Комплекс</h3>
                    <p className="text-3xl font-bold text-purple-600">50 000 ₽<span className="text-lg text-slate-400 font-normal">/мес</span></p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Всё из тарифа "Ведение"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">AI-анализ и чат-боты</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Виджеты для сообщества</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Интеграция с CRM</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                  <a href="#contact">Выбрать Комплекс</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Хотите, чтобы ваш таргет работал как часы?
            </h2>
            <p className="text-xl text-slate-500">
              Оставьте заявку — через 24 часа вы получите AI-анализ вашей текущей кампании бесплатно.
            </p>
          </div>
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VKAds;