import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle,
  Database,
  FileText,
  LineChart,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const heroSignals = [
  "Заявки и диалоги",
  "CRM и база знаний",
  "Контроль качества",
];

const processHighlights = [
  {
    icon: MessageSquare,
    title: "Входящий поток",
    text: "AI принимает обращение, уточняет задачу и не дает заявке потеряться между сайтом, мессенджером и менеджером.",
  },
  {
    icon: Database,
    title: "Контекст бизнеса",
    text: "Система отвечает только на основе вашей базы знаний: услуг, цен, ограничений, регламентов и частых вопросов.",
  },
  {
    icon: Workflow,
    title: "Передача в процесс",
    text: "Заявка уходит в CRM или ответственному человеку уже с темой, приоритетом и кратким резюме диалога.",
  },
  {
    icon: LineChart,
    title: "Улучшения",
    text: "Повторяющиеся вопросы превращаются в гипотезы для сайта, рекламы, скриптов продаж и продуктовых доработок.",
  },
];

const scenarios = [
  {
    icon: Bot,
    title: "AI-ассистент на сайте и в мессенджерах",
    text: "Для компаний, где клиент задает типовые вопросы перед заявкой: стоимость, сроки, состав услуги, запись, документы.",
    points: ["квалифицирует обращение", "передает сложные вопросы человеку", "сохраняет историю и источник заявки"],
  },
  {
    icon: Users,
    title: "Помощник менеджера",
    text: "Для отделов продаж и собственников, которые хотят снизить ручную рутину без замены команды и без потери контроля.",
    points: ["готовит черновик ответа", "напоминает следующий шаг", "подсказывает аргументы по базе знаний"],
  },
  {
    icon: Sparkles,
    title: "AI для маркетинга и контента",
    text: "Для рекламы, лендингов и SEO-страниц, где нужны варианты офферов, структуры, FAQ и быстрые тесты гипотез.",
    points: ["генерирует варианты текстов", "сверяет смысл с нишей", "оставляет финальное решение за специалистом"],
  },
];

const workstreams = [
  {
    icon: Brain,
    title: "Проектирование логики",
    text: "Разбираем путь клиента, точки передачи данных, роли команды и ограничения, которые AI должен соблюдать.",
  },
  {
    icon: FileText,
    title: "База знаний",
    text: "Собираем услуги, цены, ответы на вопросы, правила коммуникации и формулировки, которые можно безопасно использовать.",
  },
  {
    icon: Workflow,
    title: "Интеграции",
    text: "Подключаем сайт, формы, мессенджеры, CRM, почту или таблицы в том объеме, который реально нужен процессу.",
  },
  {
    icon: ShieldCheck,
    title: "Контроль и запуск",
    text: "Проверяем сценарии, спорные ответы, обработку персональных данных и понятный переход к живому сотруднику.",
  },
];

const launchSteps = [
  "Аудит заявок, каналов и текущих документов",
  "Сценарии диалогов, база знаний и правила передачи",
  "Техническая сборка, тесты и настройка аналитики",
  "Запуск, контроль ответов и корректировка по фактическим обращениям",
];

const complianceItems = [
  "не обещаем автоматическую замену юриста, бухгалтера или менеджера",
  "не публикуем персональные данные без отдельного основания",
  "не подключаем рекламные рассылки без отдельного согласия",
  "фиксируем, где хранятся заявки и кто получает доступ",
  "закладываем понятные тексты согласий, политики и уведомлений",
];

const AI = () => {
  const scrollToContact = () => {
    document.getElementById("ai-contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout
      title="AI-системы для заявок, CRM и продаж | CentrLP"
      description="Проектируем и внедряем AI-ассистентов для сайта, мессенджеров, CRM, базы знаний и отдела продаж с учетом процессов бизнеса и требований к персональным данным."
    >
      <section className="relative min-h-[82vh] overflow-hidden bg-slate-950 text-white">
        <img
          src="/images/home/ai-systems.png"
          alt="AI-система для обработки заявок, CRM и аналитики"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.82)_45%,rgba(2,6,23,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative z-10 mx-auto flex min-h-[82vh] items-end px-4 pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur">
              <Brain className="h-4 w-4" />
              AI для реального бизнес-процесса
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              AI-система для заявок, базы знаний и CRM
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
              Внедряем нейросети не как декоративного бота, а как рабочий слой между сайтом,
              мессенджерами, менеджером и аналитикой. Клиент получает быстрый ответ, команда
              получает контекст, собственник видит узкие места.
            </p>

            <div className="mb-10 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-md bg-white px-6 text-slate-950 hover:bg-slate-100"
                onClick={scrollToContact}
              >
                Обсудить AI-сценарий
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-md border-white/30 bg-white/5 px-6 text-white hover:bg-white/15 hover:text-white"
                onClick={scrollToContact}
              >
                Разобрать текущие заявки
              </Button>
            </div>

            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              {heroSignals.map((signal) => (
                <div key={signal} className="rounded-lg border border-white/15 bg-slate-950/35 p-3 text-sm text-slate-100 backdrop-blur">
                  {signal}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 lg:grid-cols-4">
            {processHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Card className="h-full rounded-lg border-slate-200 p-5 shadow-sm">
                  <item.icon className="mb-4 h-6 w-6 text-[#0096D6]" />
                  <h2 className="mb-2 text-lg font-bold text-slate-950">{item.title}</h2>
                  <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div className="mx-auto mb-12 max-w-3xl text-center" {...fadeInUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[#44B78B]/25 bg-white px-3 py-2 text-sm font-medium text-slate-700">
              <Workflow className="h-4 w-4 text-[#44B78B]" />
              Сценарии внедрения
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              AI должен объяснять пользу в вашем контексте
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Мы собираем систему вокруг задач бизнеса: где клиент застревает, где менеджер теряет
              время, какие вопросы повторяются и какие данные должны попасть в следующий этап.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full rounded-lg border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0096D6]/10">
                    <scenario.icon className="h-6 w-6 text-[#0096D6]" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-950">{scenario.title}</h3>
                  <p className="mb-6 leading-7 text-slate-600">{scenario.text}</p>
                  <ul className="space-y-3">
                    {scenario.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700">
                        <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#44B78B]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div {...fadeInUp}>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
                От красивой идеи к управляемому инструменту
              </h2>
              <p className="mb-7 text-lg leading-8 text-slate-600">
                На странице AI теперь важен не образ “магической нейросети”, а понятная связка:
                задача, данные, сценарий, ответственный человек и контроль результата.
              </p>
              <img
                src="/images/home/team-tools.png"
                alt="Команда использует цифровые инструменты для обработки заявок"
                className="w-full rounded-lg border border-slate-200 object-cover shadow-sm"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {workstreams.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <Card className="h-full rounded-lg border-slate-200 p-6 shadow-sm">
                    <item.icon className="mb-4 h-6 w-6 text-[#44B78B]" />
                    <h3 className="mb-3 text-lg font-bold text-slate-950">{item.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="mx-auto mb-12 max-w-3xl text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              Запуск строится вокруг фактических данных
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Не обещаем универсальную кнопку “сделать AI”. Сначала фиксируем, какие данные уже есть,
              куда попадают заявки и где автоматизация действительно снизит ручную работу.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {launchSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-lg border border-white/15 bg-white/5 p-6"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-950">
                  {index + 1}
                </div>
                <p className="leading-7 text-slate-100">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div {...fadeInUp}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#0096D6]/20 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                <ShieldCheck className="h-4 w-4 text-[#0096D6]" />
                Персональные данные и контроль
              </div>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
                AI не должен создавать юридические риски
              </h2>
              <p className="text-lg leading-8 text-slate-600">
                Если система принимает заявки, отвечает клиентам или передает данные в CRM, это
                надо описывать в документах, согласиях, настройках доступа и процессах обработки.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="rounded-lg border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="mb-5 text-xl font-bold text-slate-950">Что проверяем перед запуском</h3>
                <ul className="space-y-4">
                  {complianceItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#44B78B]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="ai-contact" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div className="mx-auto mb-10 max-w-3xl text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              Разберем, где AI действительно нужен
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Пришлите нишу, сайт или текущий процесс заявок. Предложим 2-3 сценария внедрения без
              лишней автоматизации и без рискованных обещаний.
            </p>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default AI;
