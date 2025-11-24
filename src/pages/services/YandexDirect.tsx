import { useState, useEffect, useRef } from "react";
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
  Zap,
  XCircle,
  Bot,
  MousePointer2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Rocket,
  Layers,
  Sparkles,
  ChevronRight,
  Play,
  Timer
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const YandexDirect = () => {
  // --- State & Refs ---
  const [sliderValue, setSliderValue] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activePainPoint, setActivePainPoint] = useState<number | null>(null);
  const [timer, setTimer] = useState({ hours: 4, minutes: 59, seconds: 0 });

  // --- Timer Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Slider Logic ---
  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderValue(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent | TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderValue(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", () => setIsDragging(false));
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging]);

  // --- Scroll Animations ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Layout
      title="Яндекс.Директ 2026: AI-революция в трафике | CentrLP"
      description="Забудьте про слив бюджета. AI-оптимизация, защита от ботов и гарантия результата. Кейсы 2025 года."
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium backdrop-blur-md mb-6">
              🚀 Технологии маркетинга 2026
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              Яндекс.Директ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                Будущего
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Пока конкуренты сливают бюджет на ботов, мы используем AI для точечных ударов по целевой аудитории.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-600/25 transition-all hover:scale-105" asChild>
              <a href="#contact">
                Получить стратегию
                <Rocket className="ml-2 w-6 h-6" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-12 text-xl rounded-full border-white/10 text-white hover:bg-white/5 backdrop-blur-sm" asChild>
              <a href="#cases">
                Смотреть кейсы
                <Play className="ml-2 w-6 h-6 fill-current" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Before / After Slider */}
      <section id="cases" className="py-24 bg-slate-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Директ: <span className="text-red-500">Ожидание</span> vs <span className="text-green-500">Реальность CentrLP</span>
            </h2>
            <p className="text-slate-400 text-lg">Потяните ползунок, чтобы увидеть разницу</p>
          </div>

          <div
            ref={sliderRef}
            className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-ew-resize shadow-2xl border border-slate-800 select-none"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* Right Side (Good - CentrLP) */}
            <div className="absolute inset-0 bg-slate-950 flex items-center justify-center">
              <div className="w-full h-full p-8 md:p-12 bg-gradient-to-br from-slate-900 to-green-900/20 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-green-400 font-bold text-2xl flex items-center gap-2">
                    <ShieldCheck className="w-8 h-8" />
                    CentrLP Direct
                  </div>
                  <div className="px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">AI-Optimized</div>
                </div>

                {/* Mock Charts Good */}
                <div className="flex-1 grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="text-slate-400 text-sm">Стоимость лида (CPA)</div>
                    <div className="text-5xl font-bold text-white">350 ₽</div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[20%] bg-green-500 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-slate-400 text-sm">Конверсия (CR)</div>
                    <div className="text-5xl font-bold text-white">12.5%</div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-green-500 rounded-full" />
                    </div>
                  </div>
                  <div className="col-span-2 bg-slate-800/50 rounded-xl p-6 border border-green-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
                    <div className="flex justify-between items-end h-32 gap-2">
                      {[40, 55, 45, 70, 65, 85, 95].map((h, i) => (
                        <div key={i} className="w-full bg-green-500/80 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between text-slate-400 text-xs">
                      <span>Пн</span><span>Вс</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Side (Bad - Ordinary) */}
            <div
              className="absolute inset-0 bg-slate-100 overflow-hidden border-r-4 border-white shadow-2xl"
              style={{ width: `${sliderValue}%` }}
            >
              <div className="w-full h-full p-8 md:p-12 bg-gradient-to-br from-slate-50 to-red-50 flex flex-col" style={{ width: sliderRef.current?.offsetWidth }}>
                <div className="flex justify-between items-center mb-8">
                  <div className="text-red-500 font-bold text-2xl flex items-center gap-2">
                    <AlertTriangle className="w-8 h-8" />
                    Обычный Директ
                  </div>
                  <div className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm">Бюджет слит</div>
                </div>

                {/* Mock Charts Bad */}
                <div className="flex-1 grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="text-slate-500 text-sm">Стоимость лида (CPA)</div>
                    <div className="text-5xl font-bold text-slate-800">2 500 ₽</div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-[90%] bg-red-500 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-slate-500 text-sm">Конверсия (CR)</div>
                    <div className="text-5xl font-bold text-slate-800">0.8%</div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-[10%] bg-red-500 rounded-full" />
                    </div>
                  </div>
                  <div className="col-span-2 bg-white rounded-xl p-6 border border-red-200 relative overflow-hidden">
                    <div className="flex justify-between items-end h-32 gap-2">
                      {[80, 20, 15, 10, 5, 2, 0].map((h, i) => (
                        <div key={i} className="w-full bg-red-400 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between text-slate-400 text-xs">
                      <span>Пн</span><span>Вс</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold border border-red-200 rotate-[-12deg]">
                      БОТЫ 60%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderValue}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-slate-900">
                <div className="flex gap-1">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points: Why Campaigns Die */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Почему 87% кампаний <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                умирают в 2026 году?
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Мусор из Мастера Кампаний",
                  desc: "Яндекс подмешивает до 40% нецелевых площадок в автоматических стратегиях, сливая бюджет на мобильные игры.",
                  icon: XCircle,
                  color: "text-red-500"
                },
                {
                  id: 2,
                  title: "Боты и скликивание",
                  desc: "Конкуренты и бот-фермы скликивают до 60% бюджета. Обычная защита Яндекса пропускает их.",
                  icon: Bot,
                  color: "text-orange-500"
                },
                {
                  id: 3,
                  title: "Роботы съедают бюджет",
                  desc: "Автостратегии разгоняются, видят 'конверсии' (которые на самом деле боты) и начинают лить туда все деньги.",
                  icon: TrendingUp,
                  color: "text-yellow-500"
                },
                {
                  id: 4,
                  title: "Менеджер «ведёт» для галочки",
                  desc: "Агентства просто шлют отчёты. Никто не слушает звонки и не меняет офферы под рынок.",
                  icon: MousePointer2,
                  color: "text-blue-500"
                }
              ].map((item) => (
                <motion.div
                  key={item.id}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${activePainPoint === item.id
                      ? "bg-slate-900 text-white border-slate-800 shadow-xl scale-105"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:shadow-md"
                    }`}
                  onMouseEnter={() => setActivePainPoint(item.id)}
                  onClick={() => setActivePainPoint(item.id)}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -50 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${activePainPoint === item.id ? "bg-white/10" : "bg-white shadow-sm"}`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${activePainPoint === item.id ? "text-white" : "text-slate-900"}`}>
                        {item.title}
                      </h3>
                      <AnimatePresence>
                        {activePainPoint === item.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-slate-300 text-sm leading-relaxed"
                          >
                            {item.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual Representation (Right Side) */}
            <div className="relative h-[500px] bg-slate-100 rounded-3xl overflow-hidden flex items-center justify-center border border-slate-200 shadow-inner">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePainPoint || "default"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="text-center p-8"
                >
                  {activePainPoint === 1 && (
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <XCircle className="w-16 h-16 text-red-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Мусорный трафик</h3>
                      <p className="text-slate-500">Сливает до 40% бюджета впустую</p>
                    </div>
                  )}
                  {activePainPoint === 2 && (
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                        <Bot className="w-16 h-16 text-orange-500 animate-bounce" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Атака ботов</h3>
                      <p className="text-slate-500">Искажает статистику и убивает конверсию</p>
                    </div>
                  )}
                  {activePainPoint === 3 && (
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                        <TrendingUp className="w-16 h-16 text-yellow-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Неконтролируемый расход</h3>
                      <p className="text-slate-500">Алгоритмы тратят деньги без результата</p>
                    </div>
                  )}
                  {activePainPoint === 4 && (
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <MousePointer2 className="w-16 h-16 text-blue-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Имитация работы</h3>
                      <p className="text-slate-500">Отчеты есть, продаж нет</p>
                    </div>
                  )}
                  {!activePainPoint && (
                    <div className="text-slate-400">
                      <MousePointer2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Наведите на карточку слева</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features 2026 */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900 to-slate-950 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-purple-400 font-medium tracking-wider uppercase text-sm mb-4 block">AI-Технологии 2026</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Что делает AI, чего не может <br />
              <span className="text-slate-500">обычный директолог?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Авто-чистка мусора",
                desc: "Блокирует 120+ видов ботов и скликивателей в реальном времени.",
                icon: ShieldCheck,
                color: "text-green-400",
                bg: "bg-green-400/10"
              },
              {
                title: "Генерация креативов",
                desc: "Создает 100+ вариантов объявлений и тестирует их за 24 часа.",
                icon: Sparkles,
                color: "text-purple-400",
                bg: "bg-purple-400/10"
              },
              {
                title: "Прогноз CPA 92%",
                desc: "Точно предсказывает стоимость заявки до запуска кампании.",
                icon: Target,
                color: "text-blue-400",
                bg: "bg-blue-400/10"
              },
              {
                title: "Поиск связок",
                desc: "Каждую неделю находит новые ключевые слова, которые упустили конкуренты.",
                icon: Search,
                color: "text-pink-400",
                bg: "bg-pink-400/10"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
              >
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing: 3D Cards */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Инвестиции в результат
            </h2>
            <p className="text-slate-500 text-lg">Честные цены без скрытых комиссий</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
            {[
              {
                title: "Поиск",
                price: "20 000 ₽",
                desc: "Горячий трафик для быстрых продаж",
                features: ["Сбор семантики", "Минус-слова", "Написание объявлений", "Настройка аналитики"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "РСЯ",
                price: "25 000 ₽",
                desc: "Охватная реклама с визуалом",
                features: ["Дизайн баннеров", "Ретаргетинг", "Аудиторные сегменты", "Видео-дополнения"],
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Ведение",
                price: "30 000 ₽",
                period: "/мес",
                desc: "Ежедневная оптимизация и отчеты",
                features: ["Чистка площадок", "Корректировка ставок", "A/B тесты", "Отчетность"],
                color: "from-orange-500 to-red-500"
              },
              {
                title: "Комплекс AI",
                price: "50 000 ₽",
                period: "/мес",
                desc: "Максимальный результат под ключ",
                features: ["Поиск + РСЯ", "AI-оптимизация", "Чат-боты", "Доработка сайта"],
                color: "from-slate-800 to-slate-900",
                highlight: true
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateX: 15, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                <Card className={`h-full relative bg-white border-none shadow-xl overflow-hidden rounded-3xl flex flex-col ${item.highlight ? "ring-2 ring-slate-900" : ""}`}>
                  {item.highlight && (
                    <div className="absolute top-0 right-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                      BEST CHOICE
                    </div>
                  )}
                  <CardContent className="p-8 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{item.price}</span>
                      {item.period && <span className="text-slate-400 text-sm">{item.period}</span>}
                    </div>
                    <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">
                      {item.desc}
                    </p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full rounded-xl py-6 ${item.highlight ? "bg-slate-900 hover:bg-slate-800" : "bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-900"}`} variant={item.highlight ? "default" : "outline"} asChild>
                      <a href="#contact">Выбрать</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trends 2026 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-[3rem] p-8 md:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Тренды 2026: <br />
                  <span className="text-blue-600">Будьте на шаг впереди</span>
                </h2>
                <ul className="space-y-6">
                  {[
                    "AI-планирование бюджета (Zero-Waste)",
                    "Поведенческое программирование объявлений",
                    "Персональные креативы под микро-сегменты",
                    "Динамическая персонализация лендингов"
                  ].map((trend, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-600 font-bold">
                        {i + 1}
                      </div>
                      <span className="text-lg font-medium text-slate-800">{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20" />
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-white/50">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">AI Analysis</div>
                      <div className="text-xs text-slate-500">Real-time processing</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-slate-100 rounded-full w-3/4" />
                    <div className="h-2 bg-slate-100 rounded-full w-full" />
                    <div className="h-2 bg-slate-100 rounded-full w-5/6" />
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-sm text-slate-500">Efficiency</span>
                    <span className="text-xl font-bold text-green-500">+240%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA: Dark Block */}
      <section id="contact" className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Хватит кормить Яндекс. <br />
              <span className="text-blue-400">Пора забирать свои заявки.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Запустим рекламу за 7 дней с гарантией по договору.
            </p>

            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl mb-12">
              <div className="flex items-center gap-2 text-orange-400 font-bold animate-pulse">
                <Timer className="w-5 h-5" />
                <span>Осталось 3 места</span>
              </div>
              <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
              <div className="text-slate-300 text-sm">
                Следующие 5 клиентов получат настройку РСЯ в подарок
              </div>
              <div className="flex gap-1 font-mono text-lg font-bold text-white bg-black/30 px-3 py-1 rounded-lg">
                <span>0{timer.hours}</span>:
                <span>{timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}</span>:
                <span>{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</span>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default YandexDirect;