import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CheckCircle,
  ClipboardList,
  Database,
  ExternalLink,
  FileText,
  Headphones,
  LineChart,
  Megaphone,
  MessageSquare,
  Rocket,
  Settings2,
  ShieldCheck,
  Sparkles,
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
  "crm.centrlp.ru как рабочее ядро",
  "звонки, сделки и задачи в одном маршруте",
  "нейросеть помогает, человек подтверждает",
];

const crmCapabilities = [
  {
    icon: MessageSquare,
    title: "Входящие заявки",
    text: "CRM принимает обращения с сайта, ВКонтакте, форм, опросников, телефонии и рекламы. В карточке остаются источник, метка, город, повторное обращение и ответственный.",
  },
  {
    icon: Database,
    title: "Клиенты, сделки и задачи",
    text: "В одной карточке видны контакты, этапы, суммы, комплектации, файлы, комментарии, звонки, согласия и следующий шаг менеджера.",
  },
  {
    icon: Headphones,
    title: "Звонки с разбором",
    text: "Телефония связывает разговор со сделкой, а нейросеть готовит резюме: потребность, возражение, договоренность, риск и задачу на следующий контакт.",
  },
  {
    icon: Megaphone,
    title: "Контент Завод",
    text: "Вопросы клиентов и возражения из продаж превращаются в темы, статьи, посты для ВКонтакте и Telegram, визуальные идеи и план публикаций.",
  },
  {
    icon: BarChart3,
    title: "Аналитика руководителя",
    text: "Руководитель видит не только активность, а причины: где застряла сделка, кто не перезвонил, какой канал дает заявки и где проседает конверсия.",
  },
  {
    icon: ShieldCheck,
    title: "152-ФЗ и доступы",
    text: "В процессе фиксируются согласия, версии документов, адрес формы, дата, IP, данные браузера, роли пользователей и юридически важные события.",
  },
];

const aiModules = [
  {
    icon: Brain,
    title: "Контекст заявки",
    text: "AI собирает суть обращения, отделяет новый лид от повторного клиента, подсвечивает тему и помогает менеджеру быстрее понять ситуацию.",
  },
  {
    icon: ClipboardList,
    title: "Следующее действие",
    text: "Система предлагает задачу, срок реакции, риск и короткую подсказку по карточке. Менеджер проверяет и применяет только то, что подходит.",
  },
  {
    icon: FileText,
    title: "Тексты и документы",
    text: "Нейросеть помогает подготовить КП, письмо, структуру статьи, пост или отчет, используя данные клиента и правила компании.",
  },
  {
    icon: LineChart,
    title: "Управленческие сводки",
    text: "AI переводит разрозненные сделки, звонки и публикации в понятные выводы: что требует внимания, где задержка, какие гипотезы проверить.",
  },
];

const routeSteps = [
  {
    step: "01",
    title: "Источник",
    text: "Сайт, реклама, ВКонтакте, звонок или мессенджер фиксируются как начало маршрута.",
  },
  {
    step: "02",
    title: "Карточка",
    text: "CRM собирает контакт, историю, согласие, сделку, файлы и контекст общения.",
  },
  {
    step: "03",
    title: "Нейросеть",
    text: "AI кратко описывает ситуацию, подсказывает следующий шаг, готовит материал к проверке и отмечает риск.",
  },
  {
    step: "04",
    title: "Человек",
    text: "Менеджер подтверждает действия, отвечает клиенту и ведет сделку дальше.",
  },
  {
    step: "05",
    title: "Контроль",
    text: "Руководитель видит сроки, деньги, отказы, просрочки, источники и результаты.",
  },
];

const implementationSteps = [
  {
    icon: Workflow,
    title: "Разбираем путь клиента",
    text: "Смотрим, откуда приходят заявки, где теряется контекст, кто отвечает за следующий шаг и какие данные нужны команде.",
  },
  {
    icon: Settings2,
    title: "Собираем CRM-контур",
    text: "Настраиваем поля, этапы, карточки, роли, формы, ВКонтакте, телефонию, задачи, документы и управленческие срезы.",
  },
  {
    icon: Bot,
    title: "Встраиваем нейросети",
    text: "Подключаем разбор звонков, резюме карточки, подсказки менеджеру, отчеты, Контент Завод и подготовку рабочих материалов.",
  },
  {
    icon: Rocket,
    title: "Запускаем на реальных сделках",
    text: "Обучаем команду, проверяем юридический след, донастраиваем сценарии по первым заявкам и не оставляем бизнес с пустой коробкой.",
  },
];

const useCases = [
  {
    title: "Отдел продаж",
    text: "Чтобы заявки не зависали между сайтом, звонком, мессенджером и личной памятью менеджера.",
    points: ["очередь входящих", "срок реакции", "резюме звонка", "контроль просрочек"],
  },
  {
    title: "Маркетинг и контент",
    text: "Чтобы темы появлялись из реальных вопросов клиентов, а не из пустого календаря публикаций.",
    points: ["контент-планы", "SEO-структуры", "посты ВК и Telegram", "аналитика материалов"],
  },
  {
    title: "Руководитель",
    text: "Чтобы видеть не отчеты ради отчетов, а причины потерь: источник, этап, менеджер, скорость, отказ.",
    points: ["воронка", "выручка", "причины отказов", "риски по сделкам"],
  },
];

const complianceItems = [
  "AI не принимает важные решения без проверки человека",
  "заявки и звонки привязаны к ролям доступа и истории действий",
  "согласия, версии документов и источник формы фиксируются в процессе",
  "нейросеть получает только тот контекст, который нужен для конкретной задачи",
  "публикации, КП и ответы клиентам проходят человеческое утверждение",
];

const AI = () => {
  const scrollToContact = () => {
    document.getElementById("ai-contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout
      title="AI-системы и CentrLP CRM для заявок, звонков и продаж | CentrLP"
      description="Внедряем AI вокруг собственной CRM crm.centrlp.ru: заявки, звонки, сделки, задачи, Контент Завод, аналитика руководителя и юридический след по 152-ФЗ."
    >
      <section className="relative min-h-[88vh] overflow-hidden bg-slate-950 text-white">
        <img
          src="/images/ai/crm-centrlp-preview.png"
          alt="CentrLP CRM с маршрутом заявки, сделками, задачами и нейросетью"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.84)_46%,rgba(2,6,23,0.24)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative z-10 mx-auto flex min-h-[88vh] items-end px-4 pb-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur">
              <Sparkles className="h-4 w-4" />
              AI внедряется не отдельно, а внутри CRM-контура
            </div>

            <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              AI-системы CentrLP вокруг собственной CRM
            </h1>

            <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
              У нас есть рабочая CRM на <a href="https://crm.centrlp.ru/" className="font-semibold text-white underline decoration-white/40 underline-offset-4">crm.centrlp.ru</a>: заявки, звонки, сделки,
              задачи, документы, Контент Завод и аналитика. Нейросети встроены туда, где они реально
              помогают: собрать контекст, разобрать звонок, подсказать следующий шаг и подготовить
              материал для проверки человеком.
            </p>

            <div className="mb-10 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-md bg-white px-6 text-slate-950 hover:bg-slate-100"
                onClick={scrollToContact}
              >
                Разобрать ваш CRM-контур
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-md border-white/30 bg-white/5 px-6 text-white hover:bg-white/15 hover:text-white"
              >
                <a href="https://crm.centrlp.ru/" target="_blank" rel="noreferrer" data-metric="ai-crm-link">
                  Смотреть CentrLP CRM
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid max-w-4xl gap-3 md:grid-cols-3">
              {heroSignals.map((signal) => (
                <div key={signal} className="rounded-lg border border-white/15 bg-slate-950/40 p-3 text-sm leading-6 text-slate-100 backdrop-blur">
                  {signal}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl font-bold text-slate-950">1</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">рабочий маршрут заявки: источник, клиент, сделка, задача, звонок, документ</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl font-bold text-slate-950">6+</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">потоков в CRM: сайт, ВКонтакте, телефония, сделки, Контент Завод, аналитика</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl font-bold text-slate-950">152-ФЗ</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">согласия, версии документов, роли доступа и юридический след в процессе</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div {...fadeInUp}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#0096D6]/20 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                <Database className="h-4 w-4 text-[#0096D6]" />
                CentrLP CRM
              </div>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
                CRM становится ядром, а AI - рабочим помощником внутри процесса
              </h2>
              <p className="text-lg leading-8 text-slate-600">
                Мы не продаем абстрактную нейросеть, которая “что-нибудь отвечает”. Сначала строится
                маршрут заявки: от источника до сделки, звонка, задачи, КП, публикации и отчета.
                После этого нейросеть получает понятные границы и начинает помогать там, где команда
                обычно теряет время и контекст.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <img
                src="/images/ai/crm-centrlp-preview.png"
                alt="Превью CentrLP CRM для заявок, звонков, сделок и внедрения нейросети"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div className="mx-auto mb-12 max-w-3xl text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              Что умеет наша CRM и где в ней работают нейросети
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Это не набор экранов ради красивой презентации. Система закрывает ежедневную работу
              отдела продаж и маркетинга: принять обращение, понять клиента, довести сделку,
              подготовить материалы и показать руководителю, где процесс буксует.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {crmCapabilities.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <Card className="h-full rounded-lg border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0096D6]/10">
                    <item.icon className="h-6 w-6 text-[#0096D6]" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <motion.div {...fadeInUp}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white">
                <Workflow className="h-4 w-4 text-[#44B78B]" />
                Маршрут заявки
              </div>
              <h2 className="mb-5 text-3xl font-bold leading-tight md:text-4xl">
                Нейросеть полезна только там, где процесс уже понятен
              </h2>
              <p className="text-lg leading-8 text-slate-300">
                Поэтому мы не начинаем с промптов. Мы сначала связываем каналы, людей, документы,
                роли доступа и контроль руководителя. AI включается в этот маршрут как помощник,
                который ускоряет работу, но не забирает у команды ответственность.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {routeSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="grid gap-4 rounded-lg border border-white/15 bg-white/[0.06] p-5 md:grid-cols-[72px_1fr]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-950">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm leading-6 text-slate-300">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div className="mx-auto mb-12 max-w-3xl text-center" {...fadeInUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-[#44B78B]/25 bg-white px-3 py-2 text-sm font-medium text-slate-700">
              <Brain className="h-4 w-4 text-[#44B78B]" />
              AI-модули
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              Нейросети работают не вместо команды, а рядом с ней
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Важные обещания клиенту, публикации, КП и юридически значимые действия остаются за
              человеком. AI готовит контекст и материал к проверке, чтобы менеджер быстрее принимал решение.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {aiModules.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Card className="h-full rounded-lg border-slate-200 p-6 shadow-sm">
                  <item.icon className="mb-5 h-7 w-7 text-[#0096D6]" />
                  <h3 className="mb-3 text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div {...fadeInUp}>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
                Как мы внедряем CRM и AI без “разбирайтесь сами”
              </h2>
              <p className="text-lg leading-8 text-slate-600">
                Самая частая ошибка - подключить нейросеть к хаосу. Мы идем наоборот: сначала
                собираем рабочий контур, потом добавляем подсказки, резюме, отчеты и Контент Завод.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {implementationSteps.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <Card className="h-full rounded-lg border-slate-200 bg-white p-6 shadow-sm">
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

      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <motion.div className="mx-auto mb-12 max-w-3xl text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
              Для каких задач это особенно подходит
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              CentrLP CRM раскрывается там, где у бизнеса уже есть поток обращений, повторные
              касания, звонки, документы, контент и необходимость контроля без ручной сводки.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {useCases.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full rounded-lg border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="mb-3 text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mb-6 leading-7 text-slate-600">{item.text}</p>
                  <ul className="space-y-3">
                    {item.points.map((point) => (
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
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div {...fadeInUp}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#0096D6]/20 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <ShieldCheck className="h-4 w-4 text-[#0096D6]" />
                Контроль, данные и ответственность
              </div>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
                AI не должен создавать юридические и управленческие риски
              </h2>
              <p className="text-lg leading-8 text-slate-600">
                Если система принимает заявки, разбирает звонки, готовит ответы или передает данные
                в CRM, это должно быть отражено в ролях, документах, согласиях и фактической логике
                обработки. Мы учитываем это при проектировании, а не после запуска.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="rounded-lg border-slate-200 bg-slate-50 p-7 shadow-sm">
                <h3 className="mb-5 text-xl font-bold text-slate-950">Что закладываем в запуск</h3>
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

      <section id="ai-contact" className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="mx-auto mb-10 max-w-3xl text-center" {...fadeInUp}>
            <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              Разберем, как CRM и нейросети могут работать в вашем процессе
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Пришлите сайт, нишу и текущий путь заявки. Покажем, где нужна CRM, где достаточно
              интеграции, а где нейросеть действительно снимет ручную работу.
            </p>
          </motion.div>
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-1">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AI;
