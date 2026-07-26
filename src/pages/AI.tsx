import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Database,
  ExternalLink,
  FileText,
  Headphones,
  MessageSquare,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

type Capability = {
  icon: LucideIcon;
  title: string;
  text: string;
  examples: string[];
};

const heroPoints = [
  "Заявка не теряется между сайтом, мессенджером и менеджером",
  "AI готовит резюме и следующий шаг, человек подтверждает",
  "CRM хранит историю, роли, сроки и результат",
];

const capabilities: Capability[] = [
  {
    icon: MessageSquare,
    title: "Входящие заявки",
    text: "Собираем обращения с сайта, форм, ВКонтакте, телефонии и мессенджеров в один маршрут.",
    examples: ["источник и метка", "карточка клиента", "ответственный"],
  },
  {
    icon: Headphones,
    title: "Звонки и диалоги",
    text: "Нейросеть готовит краткое резюме разговора, фиксирует договорённости и предлагает следующую задачу.",
    examples: ["суть обращения", "возражения", "следующий контакт"],
  },
  {
    icon: FileText,
    title: "Материалы команды",
    text: "AI помогает собрать письмо, КП, ответ клиенту или контентный материал из проверенного контекста CRM.",
    examples: ["варианты ответов", "КП и письма", "Контент Завод"],
  },
  {
    icon: BarChart3,
    title: "Контроль руководителя",
    text: "Видно, где зависла сделка, кто не перезвонил и на каком этапе теряется время или выручка.",
    examples: ["срок реакции", "просрочки", "причины отказов"],
  },
];

const routeSteps = [
  {
    icon: PhoneCall,
    title: "Обращение",
    text: "Сайт, звонок, форма или мессенджер создают единое входящее событие.",
  },
  {
    icon: Database,
    title: "Карточка CRM",
    text: "Контакты, история, источник, сделка и документы собираются в одном месте.",
  },
  {
    icon: Bot,
    title: "Помощь AI",
    text: "Система готовит резюме, подсказку, задачу или материал к проверке.",
  },
  {
    icon: ClipboardCheck,
    title: "Решение человека",
    text: "Менеджер подтверждает действие, отвечает клиенту и двигает сделку дальше.",
  },
];

const controlItems = [
  "AI не отправляет важные обещания клиенту без проверки",
  "доступ к данным ограничивается ролями и конкретной задачей",
  "согласия, версии документов и источник заявки сохраняются",
  "ответы, публикации и КП проходят человеческое подтверждение",
];

const implementationSteps = [
  {
    icon: Workflow,
    title: "Разбираем процесс",
    text: "Находим входящие каналы, ручные переносы, потери контекста и точки контроля.",
  },
  {
    icon: Database,
    title: "Собираем CRM-контур",
    text: "Настраиваем карточки, этапы, роли, задачи, документы и реальные источники заявок.",
  },
  {
    icon: Bot,
    title: "Подключаем AI",
    text: "Добавляем только те резюме, подсказки и сценарии, которые сокращают ручную работу.",
  },
  {
    icon: Rocket,
    title: "Проверяем на сделках",
    text: "Запускаем на реальных обращениях, обучаем команду и уточняем правила по результатам.",
  },
];

const AI = () => {
  const scrollToContact = () => {
    document.getElementById("ai-contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout
      title="AI-внедрение для заявок, CRM и работы команды | CentrLP"
      description="Внедряем AI вокруг CRM и реального маршрута заявки: входящие обращения, звонки, сделки, задачи, документы, подсказки менеджеру, аналитика и контроль человека."
    >
      <section className="bg-white pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
              <Sparkles className="h-4 w-4" />
              CRM + AI + контроль человека
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-slate-950 [text-wrap:balance] md:text-5xl lg:text-6xl">
              AI-внедрение для заявок и ежедневной работы команды
            </h1>

            <p className="mb-7 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
              Связываем сайт, мессенджеры, звонки и CRM. Нейросеть готовит контекст
              и следующий шаг, а решение и ответственность остаются у человека.
            </p>

            <ul className="mb-8 space-y-3">
              {heroPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 rounded-lg px-6" onClick={scrollToContact}>
                Разобрать ваш процесс
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-lg border-slate-300 px-6"
              >
                <a href="https://crm.centrlp.ru/" target="_blank" rel="noreferrer" data-metric="ai-crm-link">
                  Посмотреть CentrLP CRM
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <figure className="overflow-hidden rounded-2xl bg-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.1)]">
            <img
              src="/images/ai/max-ai-workflow-v1.webp"
              alt="Макс связывает обращение, карточку клиента, задачу и человеческое подтверждение"
              width={1536}
              height={1024}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f7fafb]">
        <div className="container mx-auto grid px-4 md:grid-cols-3">
          <div className="border-b border-slate-200 py-6 md:border-b-0 md:border-r md:pr-7">
            <strong className="block text-lg text-slate-950">Заявка → сделка</strong>
            <span className="mt-1 block text-sm leading-6 text-slate-600">
              один маршрут вместо копирования между каналами
            </span>
          </div>
          <div className="border-b border-slate-200 py-6 md:border-b-0 md:border-r md:px-7">
            <strong className="block text-lg text-slate-950">AI → материал</strong>
            <span className="mt-1 block text-sm leading-6 text-slate-600">
              резюме, подсказка или материал к проверке
            </span>
          </div>
          <div className="py-6 md:pl-7">
            <strong className="block text-lg text-slate-950">Человек → решение</strong>
            <span className="mt-1 block text-sm leading-6 text-slate-600">
              важные действия остаются под контролем команды
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src="/images/ai/crm-centrlp-preview.webp"
              alt="Рабочая CentrLP CRM с заявками, сделками, задачами и аналитикой"
              width={1000}
              height={625}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </figure>

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-sky-700">
              <Database className="h-4 w-4" />
              Реальный продукт, а не концепт
            </div>
            <h2 className="mb-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-slate-950 md:text-4xl">
              CRM хранит процесс. AI помогает внутри него
            </h2>
            <p className="mb-6 text-lg leading-8 text-slate-600">
              В собственной CentrLP CRM уже связаны заявки, сделки, задачи, звонки,
              документы, Контент Завод и аналитика. Поэтому нейросеть получает
              проверенный контекст, а не угадывает ситуацию по одному сообщению.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["источник заявки", "история клиента", "следующая задача", "контроль сроков"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Check className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.025em] md:text-4xl">
              Как заявка проходит через систему
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Четыре понятных этапа. AI не становится отдельной коробкой
              и не разрывает привычную работу отдела продаж.
            </p>
          </div>

          <ol className="grid gap-0 overflow-hidden rounded-2xl border border-white/15 md:grid-cols-4">
            {routeSteps.map((step, index) => {
              const StepIcon = step.icon;

              return (
                <li
                  key={step.title}
                  className="border-b border-white/15 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-950">
                      <StepIcon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold text-slate-500">0{index + 1}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-sm leading-6 text-slate-300">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.025em] text-slate-950 md:text-4xl">
              Что AI берёт на себя
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Не всё подряд, а повторяемые участки, где команде нужен быстрый контекст
              и понятный следующий шаг.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-0 md:grid-cols-2">
            {capabilities.map((capability) => {
              const CapabilityIcon = capability.icon;

              return (
                <article key={capability.title} className="border-t border-slate-200 py-7">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                      <CapabilityIcon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold text-slate-950">{capability.title}</h3>
                  </div>
                  <p className="mb-4 leading-7 text-slate-600">{capability.text}</p>
                  <ul className="flex flex-wrap gap-2">
                    {capability.examples.map((example) => (
                      <li key={example} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                        {example}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#eef7f5] py-20 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <figure className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
            <img
              src="/images/ai/max-ai-control-v1.webp"
              alt="Макс проверяет подготовленный материал и управляет доступами к данным"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </figure>

          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <ShieldCheck className="h-4 w-4" />
              Контроль, доступы и 152-ФЗ
            </div>
            <h2 className="mb-5 text-3xl font-bold leading-tight tracking-[-0.025em] text-slate-950 md:text-4xl">
              AI готовит. Человек проверяет и разрешает
            </h2>
            <p className="mb-6 text-lg leading-8 text-slate-600">
              Важные ответы, публикации, КП и юридически значимые действия
              не должны происходить автоматически без понятных правил.
            </p>
            <ul className="space-y-3.5">
              {controlItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="mb-8 text-3xl font-bold tracking-[-0.025em] text-slate-950 md:text-4xl">
              Как проходит внедрение
            </h2>
            <ol className="border-t border-slate-200">
              {implementationSteps.map((step, index) => {
                const StepIcon = step.icon;

                return (
                  <li
                    key={step.title}
                    className="grid gap-4 border-b border-slate-200 py-6 sm:grid-cols-[48px_minmax(0,1fr)]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
                      <StepIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="mb-1 text-xs font-bold text-sky-700">Шаг {index + 1}</div>
                      <h3 className="mb-2 text-lg font-bold text-slate-950">{step.title}</h3>
                      <p className="text-sm leading-6 text-slate-600">{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <aside className="h-fit rounded-2xl bg-slate-950 p-7 text-white md:p-8">
            <h2 className="mb-3 text-2xl font-bold">С какого бюджета начать</h2>
            <p className="mb-7 leading-7 text-slate-300">
              Стоимость зависит от числа каналов, ролей, интеграций и объёма данных.
              Ниже — два понятных ориентира из общего прайса.
            </p>

            <div className="divide-y divide-white/15 border-y border-white/15">
              <div className="py-5">
                <span className="block text-sm text-slate-400">Автоответы и простой сценарий</span>
                <strong className="mt-1 block text-2xl">от 15 000 ₽</strong>
              </div>
              <div className="py-5">
                <span className="block text-sm text-slate-400">AI + CRM + автоматизация</span>
                <strong className="mt-1 block text-2xl">от 220 000 ₽</strong>
              </div>
            </div>

            <Button asChild className="mt-7 w-full rounded-lg bg-white text-slate-950 hover:bg-slate-100">
              <Link to="/prices#price-groups">
                Открыть полный прайс
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </aside>
        </div>
      </section>

      <section id="ai-contact" className="bg-slate-950 py-20 text-white md:py-24">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.025em] md:text-4xl">
              Разберём один реальный процесс
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Пришлите сайт, нишу и путь заявки. Покажем, где нужна CRM,
              где достаточно интеграции и где AI действительно снимет ручную работу.
            </p>
          </div>
          <div className="min-w-0 rounded-2xl bg-white p-1">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AI;
