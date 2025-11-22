import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Sparkles, Palette, FileText, Zap,
  Brain, Target, Fingerprint, Layers, MousePointer2,
  Cpu, Search, Eye, PenTool, Box, ShieldCheck,
  Ghost, Crown, Lightbulb, Heart, ChevronDown, ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Branding() {
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const [isSeoOpen, setIsSeoOpen] = useState(false);

  const archetypes = [
    { name: "Герой", icon: Crown, desc: "Сила, мастерство, победа" },
    { name: "Мудрец", icon: Brain, desc: "Знание, истина, экспертность" },
    { name: "Творец", icon: PenTool, desc: "Инновации, креатив, видение" },
    { name: "Заботливый", icon: Heart, desc: "Служение, защита, тепло" },
  ];

  return (
    <Layout
      title="Разработка фирменного стиля и брендинг | CentrLP"
      description="Создаем бренды, которые врезаются в память. Психология цвета, AI-аналитика и дизайн-системы, работающие на ваш бизнес."
    >
      {/* 1. Hero: Убить одинаковость */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-20">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 60% 40%, rgba(var(--accent-rgb), 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(var(--primary-rgb), 0.15) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
          />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-gray-300">NO MORE BORING BRANDS</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
              Если ваш бренд <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                не запоминают
              </span>
              <br />
              его не существует
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Фирменный стиль — это не логотип. Это оружие массового поражения в битве за внимание клиента.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="h-16 px-10 text-xl rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Создать бренд-код
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Pain Points: Боль и правда рынка */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                90% логотипов — <span className="text-red-600">мусор</span>, созданный в Canva за 5 минут
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Рынок переполнен визуальным шумом. Клиенты игнорируют пресные, шаблонные решения. Если вы выглядите "как все", вы продаете "как все".
              </p>
              <div className="space-y-6">
                {[
                  "Ваш логотип не вызывает эмоций — его пролистывают.",
                  "Клиенты не понимают, кто вы и чем лучше других.",
                  "Каждый макет — в своём стиле. Бренд разваливается.",
                  "Дизайнеры делают «красиво», а не «продающе»."
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Zap className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-lg font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative p-8">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg w-fit rotate-[-6deg]">
                    <span className="text-sm font-bold text-red-600">ОШИБКА #1</span>
                    <p className="text-xs font-medium">Отсутствие метафоры</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg w-fit self-end rotate-[3deg]">
                    <span className="text-sm font-bold text-red-600">ОШИБКА #2</span>
                    <p className="text-xs font-medium">Слепое копирование</p>
                  </div>
                  <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg w-fit rotate-[-3deg]">
                    <span className="text-sm font-bold text-red-600">ОШИБКА #3</span>
                    <p className="text-xs font-medium">Нет системы</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution: AI + Analytics */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Мы не «рисуем картинки».<br />Мы проектируем смыслы.
            </h2>
            <p className="text-xl text-muted-foreground">
              Используем поведенческую психологию и AI-аналитику, чтобы найти визуальный код, который взломает баннерную слепоту вашей ЦА.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "AI-Кластеризация",
                desc: "Нейросети анализируют 100+ конкурентов и находят свободные визуальные ниши."
              },
              {
                icon: Fingerprint,
                title: "Brand DNA",
                desc: "Определяем архетип и характер бренда. Вы будете звучать и выглядеть цельно."
              },
              {
                icon: Eye,
                title: "Нейро-тесты",
                desc: "Проверяем запоминаемость логотипа на фокус-группе и через AI-симуляцию зрения."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-black text-white rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Cases */}
      <section className="py-24 bg-black text-white overflow-hidden">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
            Визуальный язык, который говорит сам за себя
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                onHoverStart={() => setActiveCase(item)}
                onHoverEnd={() => setActiveCase(null)}
                className="group relative aspect-[4/3] bg-gray-900 rounded-3xl overflow-hidden border border-white/10 cursor-pointer"
              >
                {/* Placeholder Content for Case */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-500 group-hover:opacity-0">
                  <div className={`w-32 h-32 rounded-full ${item === 1 ? 'bg-gradient-to-tr from-purple-500 to-blue-500' : 'bg-gradient-to-br from-orange-400 to-red-600'} blur-2xl opacity-50 mb-4`} />
                  <h3 className="text-3xl font-bold relative z-10">{item === 1 ? 'NeoTech' : 'OrganicFood'}</h3>
                  <p className="text-gray-400 relative z-10">Rebranding 2024</p>
                </div>

                {/* Hover Reveal Content */}
                <div className="absolute inset-0 bg-white text-black p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{item === 1 ? 'NeoTech' : 'OrganicFood'}</h3>
                      <p className="text-gray-600">Финтех стартап</p>
                    </div>
                    <ArrowRight className="w-8 h-8 -rotate-45" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest">Logo</span>
                    </div>
                    <div className="h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest">Colors</span>
                    </div>
                    <div className="h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest">Font</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI Tech Block */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
                <Cpu className="w-4 h-4" />
                AI-POWERED BRANDING
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Нейросети ускоряют поиск идеала в 10 раз
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Мы используем генеративный дизайн для создания сотен метафор и паттернов, чтобы выбрать один — гениальный.
              </p>
              <ul className="space-y-4">
                {[
                  "Генерация 50+ мудбордов за 1 час",
                  "AI-подбор шрифтовых пар",
                  "Автоматическая проверка контрастности",
                  "Симуляция восприятия дальтониками"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100">
                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-400 ml-auto">AI Generation Process</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Psychology & Archetypes */}
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Психология бренда: 12 Архетипов
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {archetypes.map((arch, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <arch.icon className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-xl font-bold mb-2">{arch.name}</h3>
                <p className="text-sm text-muted-foreground">{arch.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8">
            ...и еще 8 архетипов, которые мы подбираем индивидуально под ваш бизнес.
          </p>
        </div>
      </section>

      {/* 6. Process Timeline */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Как мы создаем легенды</h2>
          <div className="relative border-l border-white/20 ml-4 md:ml-12 space-y-12">
            {[
              { title: "Исследование", desc: "Глубинное интервью, анализ рынка, CJM." },
              { title: "Стратегия", desc: "Выбор архетипа, метафоры и позиционирования." },
              { title: "Визуализация", desc: "Эскизы, поиск формы, шрифты, цвета." },
              { title: "Систематизация", desc: "Создание дизайн-системы и гайдлайнов." }
            ].map((step, i) => (
              <div key={i} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-black" />
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Packages */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Инвестиции в ваш бренд
          </h2>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Логотип",
                price: "20 000 ₽",
                desc: "Для быстрого старта",
                features: ["3 варианта логотипа", "Базовая палитра", "Файлы для печати/web"]
              },
              {
                name: "Фирменный стиль",
                price: "50 000 ₽",
                desc: "Золотой стандарт",
                features: ["5 вариантов логотипа", "Паттерны и графика", "Визитки и бланки", "Гайдлайн (Mini-book)"],
                popular: true
              },
              {
                name: "Бренд-система",
                price: "80 000 ₽",
                desc: "Полное погружение",
                features: ["Всё из пакета «Стиль»", "Стратегия бренда", "Макеты соцсетей", "Полный Brandbook"]
              }
            ].map((pkg, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-3xl ${pkg.popular ? 'bg-black text-white shadow-2xl ring-4 ring-black/5' : 'bg-white text-black shadow-lg'}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    POPULAR CHOICE
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold mb-2">{pkg.price}</div>
                <p className={`text-sm mb-8 ${pkg.popular ? 'text-gray-400' : 'text-gray-500'}`}>{pkg.desc}</p>

                <div className="space-y-4 mb-8">
                  {pkg.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${pkg.popular ? 'bg-white/20' : 'bg-black/5'}`}>
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full h-12 text-lg rounded-xl ${pkg.popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                  onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Выбрать
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SEO Block (Hidden) */}
      <section className="py-12 container max-w-4xl">
        <button
          onClick={() => setIsSeoOpen(!isSeoOpen)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mx-auto"
        >
          <span className="font-medium">Подробнее о разработке (SEO)</span>
          {isSeoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {isSeoOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 text-muted-foreground space-y-4 text-sm leading-relaxed">
                <p>
                  Разработка фирменного стиля в Тюмени — это комплексный процесс создания визуального образа компании.
                  Мы не просто рисуем логотипы, мы создаем бренд-платформу, которая включает в себя айдентику,
                  цветовую схему, типографику и правила использования всех элементов (гайдлайн или брендбук).
                </p>
                <p>
                  Качественный брендинг повышает узнаваемость, формирует лояльность аудитории и позволяет продавать
                  товары или услуги дороже. В работе мы используем современные инструменты, включая нейросети (AI),
                  для анализа конкурентов и генерации уникальных визуальных метафор.
                </p>
                <p>
                  Наши услуги включают: редизайн логотипа, создание фирменного стиля с нуля, разработку брендбука,
                  оформление социальных сетей и носителей (визитки, бланки, мерч). Мы работаем с бизнесом любого масштаба:
                  от стартапов до крупных корпораций.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 10. Final CTA */}
      <section id="form" className="py-24 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10 text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ваш бренд должен выделяться.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            Если вы готовы стать заметным, мы создадим стиль, который не забывают.
          </p>
        </div>
        <div className="container max-w-2xl relative z-10">
          <div className="bg-white rounded-3xl p-2 shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
