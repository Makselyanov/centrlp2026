import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { MessengerLinks, TELEGRAM_URL } from "@/components/MessengerLinks";
import { useAutoBreadcrumb, useFaqSchema, useServiceSchema } from "@/components/SeoSchemas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { landingPages, type LandingPage, type LandingPageKey } from "@/data/landingPages";
import { trackMetric } from "@/lib/metrics";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  ExternalLink,
  FileSearch,
  Gauge,
  MapPin,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  MonitorSmartphone,
  MousePointerClick,
  Phone,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const heroIcons = [Clock3, Target, BarChart3, ShieldCheck];
const checklistIcons = [SearchCheck, MousePointerClick, BarChart3, MessageCircle];

const YandexDirectIntentSection = () => {
  const options = [
    {
      title: "Запуск рекламы",
      price: "от 20 000 ₽",
      text: "Поиск или РСЯ, объявления, UTM, цели Метрики и контрольная заявка перед включением трафика.",
      href: "?intent=direct-launch#contact-form",
      cta: "Рассчитать запуск",
    },
    {
      title: "Ведение кампаний",
      price: "от 30 000 ₽/мес",
      text: "Поисковые фразы, площадки РСЯ, ставки, объявления и отчёт по расходам и качеству обращений.",
      href: "?intent=direct-management#contact-form",
      cta: "Обсудить ведение",
    },
    {
      title: "Аудит Директа",
      price: "после оценки кабинета",
      text: "Проверка запросов, площадок, целей, посадочной и маршрута заявки без обязательного перехода на ведение.",
      href: "?intent=direct-audit#contact-form",
      cta: "Отправить на аудит",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#0096D6]">Выберите задачу</div>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-4xl">Запуск, ведение или аудит действующей рекламы</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">Форма сохранит выбранный сценарий, чтобы первый ответ был по нужному составу работ.</p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {options.map((option) => (
            <Card key={option.title} className="flex h-full flex-col border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">{option.title}</h3>
              <div className="mt-3 text-lg font-semibold text-[#0096D6]">{option.price}</div>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{option.text}</p>
              <Button asChild className="mt-6 w-full">
                <Link to={option.href}>{option.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const auditFocusOptions = [
  {
    id: "traffic",
    title: "На сайт почти не заходят",
    text: "Сначала отделим проблему спроса и каналов от качества самой страницы.",
    result: "Фокус проверки: источники трафика, поисковая видимость, карточки и готовность страницы к рекламе.",
  },
  {
    id: "conversion",
    title: "Посетители есть, но не обращаются",
    text: "Проверим оффер, цену входа, доверие, мобильные действия и длину формы.",
    result: "Фокус проверки: первый экран, CTA, быстрые контакты, форма и мобильный путь до обращения.",
  },
  {
    id: "delivery",
    title: "Заявки могут теряться после отправки",
    text: "Проследим событие от формы и мессенджера до менеджера, аналитики и CRM.",
    result: "Фокус проверки: цели, UTM, доставка уведомления, фиксация источника и скорость ответа.",
  },
  {
    id: "mobile",
    title: "С телефона обращаются заметно реже",
    text: "Пройдём мобильный путь от первого экрана до звонка, мессенджера и успешной отправки формы.",
    result: "Фокус проверки: мобильный оффер, CTA, читаемость, поля формы, клавиатура, ошибки и подтверждение отправки.",
  },
] as const;

const AuditSelfCheckSection = () => {
  const [focus, setFocus] = useState<(typeof auditFocusOptions)[number]["id"] | "">("");
  const selected = auditFocusOptions.find((option) => option.id === focus);
  const href = selected
    ? `?intent=site-audit&audit_focus=${selected.id}#contact-form`
    : "#audit-self-check";

  return (
    <section id="audit-self-check" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="max-w-3xl">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0096D6]">Самодиагностика за минуту</div>
            <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-4xl">Где, вероятнее всего, теряется заявка?</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Выберите ситуацию, которая ближе всего. Ответ не заменяет проверку по данным, но сразу задаёт правильный фокус аудита.</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {auditFocusOptions.map((option) => {
              const active = option.id === focus;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFocus(option.id);
                    trackMetric("audit_self_check_select", { path: "/proverka-saita-i-zayavok-za-48-chasov", placement: option.id });
                  }}
                  className={`rounded-2xl border p-5 text-left transition-all ${active ? "border-[#0096D6] bg-[#0096D6]/[0.06] shadow-md" : "border-slate-200 bg-white hover:border-[#0096D6]/40"}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${active ? "border-[#0096D6] bg-[#0096D6] shadow-[inset_0_0_0_3px_white]" : "border-slate-300"}`} />
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">{option.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{option.text}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-[#44B78B]/20 bg-[#44B78B]/[0.07] p-5" aria-live="polite">
            <p className="text-sm font-semibold leading-6 text-slate-800">
              {selected ? selected.result : "Выберите один вариант — форма сохранит этот контекст, и не придётся объяснять проблему с нуля."}
            </p>
            <Button asChild={Boolean(selected)} disabled={!selected} className="mt-4 w-full sm:w-auto">
              {selected ? <Link to={href}>Передать фокус в аудит</Link> : <span>Сначала выбрать ситуацию</span>}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const localTrustLinks = [
  { label: "2ГИС", href: "https://go.2gis.com/hUyea", detail: "карточка и отзывы" },
  { label: "Яндекс Карты", href: "https://yandex.ru/maps/-/CLSbvKjF", detail: "локальная карточка" },
  { label: "ВКонтакте", href: "https://vk.com/reviews-9137191", detail: "отзывы клиентов" },
] as const;

const localTrustFacts = [
  { icon: Building2, label: "ООО «ААМХ»", detail: "ИНН 7203606424, официальный договор и закрывающие документы" },
  { icon: MapPin, label: "Тюмень", detail: "офис и встречи: 625022, г. Тюмень, проезд Солнечный, 22" },
  { icon: Star, label: "5.0 и 52 отзыва", detail: "сводно по 2ГИС, Flamp и Яндекс Картам" },
] as const;

type LandingVisual = {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  flow: Array<{
    icon: LucideIcon;
    label: string;
    detail: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
};

const landingVisuals: Record<LandingPageKey, LandingVisual> = {
  expressAudit: {
    imageSrc: "/og/services/web-analytics.png",
    imageAlt: "Визуализация проверки воронки сайта, аналитики и пути заявки",
    eyebrow: "Карта проверки",
    title: "Смотрим путь заявки целиком",
    text: "Разбор не упирается в один экран. Мы связываем источник трафика, первый экран, быстрые действия, форму, аналитику и скорость ответа.",
    flow: [
      { icon: Megaphone, label: "Трафик", detail: "откуда приходит человек" },
      { icon: MonitorSmartphone, label: "Первый экран", detail: "понятен ли оффер" },
      { icon: MousePointerClick, label: "Действие", detail: "клик, звонок или чат" },
      { icon: Route, label: "Заявка", detail: "форма, CRM и ответ" },
    ],
    stats: [
      { value: "48 ч", label: "на первичный вывод" },
      { value: "5-7", label: "приоритетных правок" },
      { value: "4", label: "точки потери заявки" },
    ],
  },
  websiteDevelopmentTyumen: {
    imageSrc: "/images/services/website-development.webp",
    imageAlt: "Фирменная иллюстрация разработки сайта как интерфейса продаж",
    eyebrow: "Сайт как система",
    title: "Собираем не страницу, а маршрут к обращению",
    text: "Визуальная часть, структура, быстрые контакты, форма, аналитика и SEO-основа работают вместе, чтобы сайт выдерживал рекламный трафик.",
    flow: [
      { icon: FileSearch, label: "Смысл", detail: "услуга и сегмент" },
      { icon: MonitorSmartphone, label: "Экран", detail: "структура и доверие" },
      { icon: MousePointerClick, label: "CTA", detail: "один понятный шаг" },
      { icon: BarChart3, label: "Данные", detail: "цели и события" },
    ],
    stats: [
      { value: "от 45к", label: "первый запуск" },
      { value: "4", label: "слоя проверки" },
      { value: "SEO", label: "база с первого дня" },
    ],
  },
  landingTyumen: {
    imageSrc: "/images/services/website-development.webp",
    imageAlt: "Иллюстрация посадочной страницы с оффером, формой и CTA",
    eyebrow: "Лендинг под гипотезу",
    title: "Один оффер, один сценарий, один главный шаг",
    text: "Посадочная страница нужна, когда важно быстро проверить спрос рекламой и увидеть, где человек теряет интерес.",
    flow: [
      { icon: Target, label: "Гипотеза", detail: "кому и что предлагаем" },
      { icon: MonitorSmartphone, label: "Оффер", detail: "первый экран" },
      { icon: MousePointerClick, label: "Клик", detail: "кнопка или мессенджер" },
      { icon: Gauge, label: "Вывод", detail: "что усиливать" },
    ],
    stats: [
      { value: "1", label: "главный оффер" },
      { value: "1", label: "целевое действие" },
      { value: "45к+", label: "запуск под рекламу" },
    ],
  },
  yandexDirectTyumen: {
    imageSrc: "/og/services/yandex-direct.png",
    imageAlt: "Фирменная иллюстрация связки Яндекс Директ, посадочной страницы и заявки",
    eyebrow: "Реклама без пустоты",
    title: "Связываем запрос, объявление, страницу и заявку",
    text: "Директ работает лучше, когда посадочная страница и цели Метрики готовы до старта, а первые клики сразу дают данные для правок.",
    flow: [
      { icon: SearchCheck, label: "Запрос", detail: "намерение клиента" },
      { icon: Megaphone, label: "Объявление", detail: "обещание и сегмент" },
      { icon: MonitorSmartphone, label: "Страница", detail: "оффер и доверие" },
      { icon: BarChart3, label: "Цель", detail: "заявка в Метрике" },
    ],
    stats: [
      { value: "20к+", label: "настройка" },
      { value: "РСЯ", label: "и поиск отдельно" },
      { value: "цели", label: "до запуска" },
    ],
  },
  crmBusiness: {
    imageSrc: "/images/ai/crm-centrlp-preview.png",
    imageAlt: "Пример интерфейса CentrLP CRM для контроля заявок, звонков и сделок",
    eyebrow: "Заявка под контролем",
    title: "После сайта обращение не должно теряться",
    text: "CRM показывает источник заявки, ответственного, статус, следующий шаг и скорость реакции команды.",
    flow: [
      { icon: MessagesSquare, label: "Каналы", detail: "сайт, звонки, чаты" },
      { icon: DatabaseZap, label: "CRM", detail: "карточка обращения" },
      { icon: Route, label: "Статус", detail: "этап и задача" },
      { icon: BarChart3, label: "Контроль", detail: "видно руководителю" },
    ],
    stats: [
      { value: "все", label: "каналы в одном месте" },
      { value: "статус", label: "у каждой заявки" },
      { value: "отчет", label: "для руководителя" },
    ],
  },
  aiAutomation: {
    imageSrc: "/images/ai/ai-hero-command-center.svg",
    imageAlt: "Иллюстрация AI-командного центра для заявок, ответов и автоматизации",
    eyebrow: "AI внутри процесса",
    title: "Автоматизация работает только там, где понятен маршрут",
    text: "AI помогает отвечать быстрее, собирать вводные и передавать человеку уже подготовленное обращение.",
    flow: [
      { icon: MessagesSquare, label: "Вопрос", detail: "человек пишет" },
      { icon: FileSearch, label: "Знания", detail: "правила и база" },
      { icon: Bot, label: "AI", detail: "ответ и уточнения" },
      { icon: DatabaseZap, label: "CRM", detail: "фиксация результата" },
    ],
    stats: [
      { value: "пилот", label: "с узкого сценария" },
      { value: "24/7", label: "первичный ответ" },
      { value: "CRM", label: "без потери контекста" },
    ],
  },
  localSeoTyumen: {
    imageSrc: "/og/services/web-analytics.png",
    imageAlt: "Схема локального маршрута из карт на сайт, в аналитику и заявку",
    eyebrow: "Локальный маршрут",
    title: "Связываем карты, сайт и измерение обращения",
    text: "Карточка дает точку входа, посадочная объясняет услугу, аналитика фиксирует действие, а менеджер получает обращение вместе с источником.",
    flow: [
      { icon: MapPin, label: "Карточка", detail: "Яндекс Бизнес или 2ГИС" },
      { icon: MonitorSmartphone, label: "Страница", detail: "услуга и быстрый CTA" },
      { icon: BarChart3, label: "Событие", detail: "UTM, звонок или форма" },
      { icon: Route, label: "Заявка", detail: "ответственный и результат" },
    ],
    stats: [
      { value: "2", label: "ключевые локальные карточки" },
      { value: "4", label: "слоя проверки" },
      { value: "48 ч", label: "на первичный вывод" },
    ],
  },
};

const scrollToForm = () => {
  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const MetricCard = ({ label, index }: { label: string; index: number }) => {
  const Icon = heroIcons[index % heroIcons.length];

  return (
    <Card className="group border-[#0096D6]/15 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0096D6]/35 hover:shadow-[0_18px_60px_-36px_rgba(0,150,214,0.6)]">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6]/15 to-[#44B78B]/15 text-[#0096D6] transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm font-semibold leading-6 text-slate-800">{label}</div>
    </Card>
  );
};

const ChecklistCard = ({
  item,
  index,
}: {
  item: LandingPage["checklist"][number];
  index: number;
}) => {
  const Icon = checklistIcons[index % checklistIcons.length];

  return (
    <Card className="h-full border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0096D6]/30 hover:shadow-lg">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0096D6]/10 text-[#0096D6]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-3 text-xl font-bold leading-tight text-slate-900">{item.title}</h3>
      <p className="text-sm leading-7 text-slate-600">{item.text}</p>
    </Card>
  );
};

const ProcessStep = ({
  item,
  index,
}: {
  item: LandingPage["process"][number];
  index: number;
}) => (
  <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-sm font-bold text-white">
      {index + 1}
    </div>
    <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
    <p className="text-sm leading-7 text-slate-600">{item.text}</p>
  </div>
);

const MobileStickyLeadBar = ({ page }: { page: LandingPage }) => (
  <div
    className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 pt-2 shadow-[0_-18px_42px_-28px_rgba(15,23,42,0.55)] backdrop-blur md:hidden"
    style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
  >
    <div className="mx-auto grid max-w-md grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
      <button
        type="button"
        className="inline-flex h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-[#0096D6] px-4 text-sm font-bold text-white shadow-button transition active:scale-[0.98]"
        onClick={() => {
          trackMetric("landing_mobile_sticky_form_click", { path: page.path });
          scrollToForm();
        }}
      >
        <ArrowRight className="h-4 w-4 shrink-0" />
        <span className="truncate">Заявка</span>
      </button>
      <a
        href="tel:+79058248564"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition active:scale-[0.98]"
        data-metric="phone-click"
        onClick={() => trackMetric("landing_mobile_sticky_phone_click", { path: page.path })}
      >
        <Phone className="h-5 w-5" />
        <span className="sr-only">Позвонить</span>
      </a>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#0096D6]/25 bg-[#0096D6]/10 text-[#0096D6] shadow-sm transition active:scale-[0.98]"
        onClick={() => trackMetric("landing_mobile_sticky_telegram_click", { path: page.path })}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="sr-only">Telegram</span>
      </a>
    </div>
  </div>
);

const websiteMobileStartOptions = [
  {
    title: "Лендинг под одну услугу",
    text: "Быстрый запуск от 45 000 ₽: оффер, форма, телефон, мессенджеры, Метрика и готовность к рекламе.",
  },
  {
    title: "Сайт услуг для Тюмени",
    text: "Несколько направлений, локальные запросы, доверие, контакты, FAQ и внутренняя перелинковка.",
  },
  {
    title: "Сайт + CRM для заявок",
    text: "Когда нужно не только получить обращение, но и передать его менеджеру без потери источника и контекста.",
  },
];

const WebsiteMobileStartSection = () => (
  <section className="bg-white py-14 md:py-18">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0096D6]">
            <span className="h-px w-8 bg-[#0096D6]" />
            Мобильный путь заявки
          </div>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
            С телефона должно быть понятно, какой сайт заказать и куда нажать
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Для заявок с мобильного первый экран, цена входа, кнопка, телефон и мессенджер должны работать без поиска по странице. Поэтому проектируем не только дизайн, а короткий маршрут: выбор формата, действие, фиксация источника и передача обращения.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="button" className="rounded-full" onClick={scrollToForm}>
              Обсудить сайт
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href="tel:+79058248564">
                <Phone className="h-4 w-4" />
                Позвонить
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {websiteMobileStartOptions.map((option, index) => (
            <div key={option.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-sm font-bold text-white">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold leading-tight text-slate-900">{option.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{option.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const LandingHeroImage = ({ visual }: { visual: LandingVisual }) => (
  <img
    src={visual.imageSrc}
    alt={visual.imageAlt}
    loading="eager"
    decoding="async"
    className="h-full w-full object-cover"
  />
);

const LandingFlowSection = ({ visual }: { visual: LandingVisual }) => (
  <section className="bg-white py-14 md:py-20">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="relative overflow-hidden rounded-3xl border border-[#0096D6]/15 bg-gradient-to-br from-[#0096D6]/10 via-white to-[#44B78B]/10 p-5 shadow-[0_24px_90px_-54px_rgba(0,150,214,0.75)] md:p-6">
          <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-[#0096D6]/12 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-8 h-56 w-56 rounded-full bg-[#44B78B]/14 blur-3xl" />
          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0096D6]/20 bg-white/85 px-4 py-2 text-sm font-semibold text-[#0096D6] shadow-sm">
                <Route className="h-4 w-4" />
                Маршрут заявки
              </div>
              <div className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                01-04
              </div>
            </div>

            <div className="relative grid gap-3 md:grid-cols-4">
              <span className="pointer-events-none absolute left-8 right-8 top-[2.15rem] hidden h-px bg-gradient-to-r from-[#0096D6]/20 via-[#0096D6]/50 to-[#44B78B]/30 md:block" />
              {visual.flow.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.label}
                    className="group relative z-10 rounded-2xl border border-white/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0096D6]/30 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm font-bold text-[#0096D6]/55">{String(index + 1).padStart(2, "0")}</div>
                    </div>
                    <div className="text-base font-bold text-slate-900">{step.label}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{step.detail}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-white/80 bg-white/75 p-4 text-sm leading-7 text-slate-700 shadow-sm">
              Так видно, где ломается путь от клика до ответа, и какие правки быстрее влияют на заявки.
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0096D6]">
            <span className="h-px w-8 bg-[#0096D6]" />
            {visual.eyebrow}
          </div>
          <h2 className="mb-4 break-words border-l-[3px] border-[#0096D6] pl-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px] md:text-[34px]">
            {visual.title}
          </h2>
          <p className="mb-8 pl-4 text-lg leading-relaxed text-slate-600">{visual.text}</p>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {visual.stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="rounded-2xl border border-[#0096D6]/10 bg-gradient-to-br from-white via-[#0096D6]/[0.035] to-[#44B78B]/[0.055] p-4 text-center shadow-sm"
              >
                <div className="mb-1 bg-gradient-to-r from-[#0096D6] to-[#44B78B] bg-clip-text text-2xl font-bold text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const LocalTrustSection = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0096D6]">
            <span className="h-px w-8 bg-[#0096D6]" />
            Локальное доверие
          </div>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-slate-950 md:text-4xl">
            Проверяемые контакты и отзывы рядом с заявкой
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Для локального SEO и конверсии важно, чтобы сайт, карточки, телефон, адрес и отзывы говорили одно и то же. Поэтому рядом с коммерческими страницами оставляем не общие обещания, а проверяемые сигналы доверия.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {localTrustFacts.map((fact) => {
            const Icon = fact.icon;

            return (
              <div key={fact.label} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0096D6]/10 text-[#0096D6]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-base font-bold text-slate-900">{fact.label}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{fact.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {localTrustLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0096D6]/35 hover:text-[#0096D6]"
          >
            <span>{link.label}</span>
            <span className="hidden text-slate-500 sm:inline">{link.detail}</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

const LandingPageView = ({ pageKey }: { pageKey: LandingPageKey }) => {
  const page = landingPages[pageKey];
  const visual = landingVisuals[pageKey];
  const location = useLocation();
  useAutoBreadcrumb(page.schemaName);
  useFaqSchema(page.faq);
  useServiceSchema({
    name: page.schemaName,
    description: page.description,
    price: page.schemaPrice,
  });

  useEffect(() => {
    if (location.hash !== "#contact-form") return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById("contact-form")?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <Layout title={page.title} description={page.description}>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-white to-[#0096D6]/10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.035]" />
        <div className="absolute left-0 top-28 h-72 w-72 rounded-full bg-[#0096D6]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#44B78B]/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0096D6] shadow-sm">
                <Sparkles className="h-4 w-4" />
                {page.badge}
              </div>

              <h1 className="mb-6 max-w-5xl break-words text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-brand-gradient">{page.h1}</span>
              </h1>

              <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
                {page.lead}
              </p>

              <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  className="h-14 w-full rounded-full px-6 text-base shadow-button transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto sm:px-8"
                  onClick={() => {
                    trackMetric("landing_primary_cta_click", { path: page.path });
                    scrollToForm();
                  }}
                >
                  {page.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 w-full rounded-full border-[#0096D6]/30 px-6 text-base transition-all duration-300 hover:-translate-y-0.5 hover:border-[#44B78B]/40 hover:bg-[#44B78B]/10 sm:w-auto sm:px-8"
                >
                  <a
                    href={pageKey === "aiAutomation" ? "/ai-plan" : pageKey === "expressAudit" ? TELEGRAM_URL : page.related[0]?.href || "/contacts"}
                    target={pageKey === "expressAudit" ? "_blank" : undefined}
                    rel={pageKey === "expressAudit" ? "noopener noreferrer" : undefined}
                    onClick={() => trackMetric("landing_secondary_cta_click", { path: page.path })}
                  >
                    {page.secondaryCta}
                  </a>
                </Button>
              </div>

              <div className="flex min-w-0 flex-wrap items-center gap-3 text-sm text-slate-600">
                <a
                  href="tel:+79058248564"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0096D6]/35 hover:text-[#0096D6]"
                  data-metric="phone-click"
                >
                  <Phone className="h-4 w-4" />
                  8-905-824-85-64
                </a>
                <MessengerLinks variant="fastlane" className="min-w-0 max-w-full" />
              </div>
            </div>

            <div className="relative">
              <Card className="relative overflow-hidden border-[#0096D6]/15 bg-white/85 p-6 shadow-[0_28px_90px_-42px_rgba(0,150,214,0.65)] backdrop-blur">
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[4rem] bg-gradient-to-br from-[#0096D6]/18 to-[#44B78B]/18" />
                <div className="relative">
                  <div className="mb-6 overflow-hidden rounded-2xl border border-[#0096D6]/10 bg-gradient-to-br from-[#0096D6]/10 via-white to-[#44B78B]/10 p-2 shadow-sm">
                    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-white">
                      <LandingHeroImage visual={visual} />
                    </div>
                  </div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0096D6]">
                    Стоимость входа
                  </div>
                  <div className="text-4xl font-bold text-slate-950">{page.price}</div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{page.priceNote}</p>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {page.heroFacts.map((fact, index) => (
                    <MetricCard key={fact} label={fact} index={index} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {pageKey === "websiteDevelopmentTyumen" && <WebsiteMobileStartSection />}

      <LandingFlowSection visual={visual} />

      {pageKey === "expressAudit" && <AuditSelfCheckSection />}

      {pageKey === "yandexDirectTyumen" && <YandexDirectIntentSection />}

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#44B78B]/10 px-4 py-2 text-sm font-semibold text-[#348d68]">
              <TrendingUp className="h-4 w-4" />
              Рост заявок начинается с связки
            </div>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">{page.painTitle}</h2>
            <p className="text-lg leading-8 text-slate-600">{page.painText}</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">{page.checklistTitle}</h2>
            <p className="text-base leading-7 text-slate-600">
              Проверяем не абстрактную красоту страницы, а то, что влияет на заявку, рекламу и дальнейшие решения.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {page.checklist.map((item, index) => (
              <ChecklistCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">{page.processTitle}</h2>
              <p className="text-base leading-7 text-slate-600">
                Работа идет от фактов к действиям: сначала проверяем путь клиента, потом решаем, что исправлять и во что вкладываться.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {page.process.map((item, index) => (
                <ProcessStep key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-hero py-20 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-[#0096D6]/15 bg-white/85 p-8 shadow-[0_26px_90px_-44px_rgba(0,150,214,0.7)] md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">{page.resultTitle}</h2>
                <p className="text-base leading-7 text-slate-600">
                  На выходе нужен не отчет ради отчета, а понятный следующий шаг: что чинить сейчас, что проверять рекламой, а что не трогать без данных.
                </p>
              </div>
              <div className="grid gap-4">
                {page.results.map((result) => (
                  <div key={result} className="flex gap-3 rounded-2xl border border-white/80 bg-white p-4 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#44B78B]" />
                    <p className="text-sm leading-7 text-slate-700">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="contact-form" className="scroll-mt-28 bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">Оставить заявку</h2>
            <p className="text-base leading-7 text-slate-600">
              Опишите сайт, нишу или задачу. Если ссылки пока нет, оставьте контакт и коротко напишите, что нужно проверить.
            </p>
          </div>
          <div className="scroll-mt-28">
            <ContactForm />
          </div>
        </div>
      </section>

      <LocalTrustSection />

      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">Частые вопросы</h2>
              <p className="text-base leading-7 text-slate-600">
                Коротко о том, как принимать решение без лишнего бюджета и затяжного запуска.
              </p>
            </div>
            <div className="space-y-4">
              {page.faq.map((item) => (
                <details key={item.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-bold text-slate-900">
                    {item.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-5 rounded-3xl border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0096D6]">Связанные услуги</div>
              <div className="flex flex-wrap gap-3">
                {page.related.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0096D6]/35 hover:text-[#0096D6]"
                  >
                    {item.title}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
            <Button type="button" size="lg" className="rounded-full" onClick={scrollToForm}>
              Получить расчет
            </Button>
          </div>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden="true" />
      <MobileStickyLeadBar page={page} />
    </Layout>
  );
};

export const ExpressAuditPage = () => <LandingPageView pageKey="expressAudit" />;
export const WebsiteDevelopmentTyumenPage = () => <LandingPageView pageKey="websiteDevelopmentTyumen" />;
export const LandingTyumenPage = () => <LandingPageView pageKey="landingTyumen" />;
export const YandexDirectTyumenPage = () => <LandingPageView pageKey="yandexDirectTyumen" />;
export const CrmBusinessPage = () => <LandingPageView pageKey="crmBusiness" />;
export const AiAutomationPage = () => <LandingPageView pageKey="aiAutomation" />;
export const LocalSeoTyumenPage = () => <LandingPageView pageKey="localSeoTyumen" />;
