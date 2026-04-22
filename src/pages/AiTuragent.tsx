import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  useAutoBreadcrumb,
  useFaqSchema,
} from "@/components/SeoSchemas";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BellRing,
  Bot,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck2,
  Globe,
  MessageCircle,
  PackageCheck,
  Palmtree,
  Plane,
  PlaneTakeoff,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Контент страницы собран так, чтобы её можно было отправлять турагенту
// одной ссылкой и показывать как основу коммерческого предложения.
// ---------------------------------------------------------------------------

const painPoints = [
  {
    icon: Clock,
    title: "«Уже третий раз объясняю, когда трансфер»",
    text: "Каждый клиент спрашивает одно и то же: где ваучер, когда выезд, что с багажом, нужна ли виза. Менеджер тратит на это 2–3 часа в день вместо подбора и продаж.",
  },
  {
    icon: MessageCircle,
    title: "Переписка расползлась по 5 каналам",
    text: "ВК, Telegram, WhatsApp, почта, иногда звонок. Клиент теряется, менеджер забывает, кто где и что просил. История коммуникации не собирается в одно место.",
  },
  {
    icon: Wallet,
    title: "Страховка и трансфер продаются «если вспомнили»",
    text: "Страховку дожимают в половине случаев, трансфер — в трети, экскурсии — в десятке. А это живые деньги турагента, которые протекают мимо кассы.",
  },
  {
    icon: BellRing,
    title: "Забытые напоминания = нервный клиент",
    text: "За 7 дней напомнить про документы, за 24 часа — про регистрацию, после прилёта — спросить, всё ли ок. Когда клиентов 10+ — это уже не держится в голове.",
  },
  {
    icon: FileCheck2,
    title: "Ваучеры и памятки отправляются вручную",
    text: "Скачать из кабинета, переименовать, отправить в мессенджер, продублировать на почту. На 30 туров в месяц это полноценный рабочий день впустую.",
  },
];

const demoMessages: Array<{
  from: "bot" | "client";
  text: string;
  delay: number;
}> = [
  {
    from: "bot",
    text: "Здравствуйте, Анна! Я помощник Наташи из «Го Туда Сюда». Ваш тур в Анталию 12–22 мая подтверждён ✈️",
    delay: 0.1,
  },
  {
    from: "bot",
    text: "Прикрепляю ваучер и страховку. Всё в одном месте, чтобы не искать перед вылетом.",
    delay: 0.35,
  },
  {
    from: "client",
    text: "Спасибо! А сколько багажа можно с собой?",
    delay: 0.7,
  },
  {
    from: "bot",
    text: "На Pegasus по вашему тарифу: 20 кг в багаж + 8 кг ручная кладь. Если нужно больше — могу оформить допбагаж за 2 400 ₽. Добавить?",
    delay: 1.05,
  },
  {
    from: "client",
    text: "Да, добавьте 10 кг ещё",
    delay: 1.45,
  },
  {
    from: "bot",
    text: "Готово ✅ Списал с вашего кошелька, квитанция придёт на почту. За 24 часа до вылета пришлю чек-лист «что взять» и напомню про онлайн-регистрацию.",
    delay: 1.85,
  },
];

const channels = [
  {
    icon: Users,
    name: "ВКонтакте",
    text: "Сообщения сообщества, автоответы в комментариях, переход в диалог без потери контекста.",
    color: "from-[#0077FF]/15 to-[#0077FF]/5",
    accent: "text-[#0077FF]",
  },
  {
    icon: Send,
    name: "Telegram",
    text: "Бот сообщества или личный бот агента с меню, кнопками и FAQ. Работает там, где клиент.",
    color: "from-[#229ED9]/15 to-[#229ED9]/5",
    accent: "text-[#229ED9]",
  },
  {
    icon: MessageCircle,
    name: "MAX",
    text: "Российский мессенджер — ранний рынок. Подключаем как только партнёрский статус будет активен.",
    color: "from-[#FF3B30]/15 to-[#FF3B30]/5",
    accent: "text-[#E63946]",
  },
  {
    icon: Globe,
    name: "Чат на сайте",
    text: "Виджет на турагентском сайте для первого касания из поиска и рекламы.",
    color: "from-[#44B78B]/15 to-[#44B78B]/5",
    accent: "text-[#44B78B]",
  },
];

const features = [
  {
    icon: Briefcase,
    title: "Карточка клиента и тура",
    text: "Страна, даты, отель, рейс, состав туристов, оплата. Всё в одном месте, а не в переписке и в голове менеджера.",
  },
  {
    icon: BellRing,
    title: "Умные напоминания",
    text: "После брони, за 7 дней до вылета, за 24 часа, в день возвращения. Клиент не забывает про документы, агент — про клиента.",
  },
  {
    icon: Wallet,
    title: "Автодопродажи без давления",
    text: "Страховка, трансфер, ранний заезд, экскурсии. Бот предлагает в нужный момент диалога, а не сверху письмом.",
  },
  {
    icon: FileCheck2,
    title: "Документы в один клик",
    text: "Ваучер, страховка, памятка, чек-лист. Агент прикладывает один раз — бот отправляет клиенту автоматически.",
  },
  {
    icon: Sparkles,
    title: "Ответы на FAQ базой знаний",
    text: "Виза, багаж, питание, валюта, розетки, тарифы. Наполняется один раз, дальше закрывает 70% типовых вопросов.",
  },
  {
    icon: Bot,
    title: "Живой менеджер одним нажатием",
    text: "Команда «нужен человек» — и диалог уходит агенту с полной историей. Без потерянных клиентов и «кто это вообще».",
  },
];

const processSteps = [
  {
    step: "1",
    title: "Знакомство и аудит",
    text: "Смотрим текущий поток заявок, каналы, средний чек, узкие места. Без этого любой бот — игрушка.",
  },
  {
    step: "2",
    title: "Наполнение базы знаний",
    text: "Переносим FAQ, шаблоны сообщений, памятки, чек-листы. Это делаем вместе с агентом — 2-3 созвона.",
  },
  {
    step: "3",
    title: "Настройка каналов",
    text: "Подключаем ВК-сообщество и/или Telegram, тестируем на реальных диалогах с согласия клиентов.",
  },
  {
    step: "4",
    title: "Обучение команды",
    text: "Показываем админку, передаём базу знаний, даём шпаргалку. Агент и менеджер управляют всем сами.",
  },
  {
    step: "5",
    title: "Сопровождение 30 дней",
    text: "Настраиваем шаблоны под реальные сценарии, правим формулировки, дополняем FAQ по живым запросам клиентов.",
  },
];

const packages = [
  {
    name: "Старт",
    price: "29 000 ₽",
    monthly: "3 900 ₽/мес",
    description:
      "Для частного турагента или небольшой компании с 5–15 туров в месяц. Самое нужное без переплаты.",
    points: [
      "ВК-сообщество или Telegram — один канал",
      "База знаний и FAQ до 30 вопросов",
      "Автоматические напоминания по поездке",
      "Отправка ваучера и страховки",
      "Карточка клиента и тура",
      "Обучение команды + 14 дней поддержки",
    ],
    cta: "Начать со старта",
    highlight: false,
  },
  {
    name: "Рост",
    price: "59 000 ₽",
    monthly: "7 500 ₽/мес",
    description:
      "Для агентства с 20–50 туров в месяц и живым потоком заявок. Подключаем два канала и допродажи.",
    points: [
      "ВК + Telegram одновременно",
      "База знаний без лимита на вопросы",
      "Сценарии автодопродаж: страховка, трансфер, экскурсии",
      "Кабинет менеджера: диалоги, статусы, метки",
      "Эскалация на живого менеджера",
      "Обучение + 30 дней поддержки и докрутки",
    ],
    cta: "Выбрать пакет «Рост»",
    highlight: true,
  },
  {
    name: "Премиум",
    price: "от 120 000 ₽",
    monthly: "15 000 ₽/мес",
    description:
      "Для агентств с премиум-сегментом и турами от 500 000 ₽. Здесь автоматизация окупается за 2-3 продажи.",
    points: [
      "Все каналы + интеграция с сайтом агента",
      "Индивидуальный сценарий под ваш стиль работы",
      "Персональные голосовые и текстовые шаблоны",
      "Подключение MAX по мере готовности платформы",
      "Выделенный чат поддержки с командой CentrLP",
      "60 дней сопровождения + ежемесячные улучшения",
    ],
    cta: "Обсудить премиум",
    highlight: false,
  },
];

const faqItems = [
  {
    question: "Это заменит менеджера?",
    answer:
      "Нет. Бот снимает рутину — отправку документов, напоминания, типовые вопросы, допродажи по шаблону. Сложные случаи, подбор, продажу закрывает менеджер. Обычно это 20–30% времени, которое агент тратит на разговоры с клиентом, а остальное — мелкая рутина, которую как раз закрывает бот.",
  },
  {
    question: "Можно ли подключить ВК и MAX вместе?",
    answer:
      "ВК — сразу. MAX — по мере получения партнёрского статуса. Платформа MAX для бизнеса пока молодая, API ограничен, нужна верификация юрлица/ИП. Мы подключим его, как только доступ откроется, без доплат. В архитектуре это уже заложено.",
  },
  {
    question: "Сколько занимает внедрение?",
    answer:
      "Пакет «Старт» — 5–7 рабочих дней от оплаты до первого живого диалога. «Рост» — 10–14 дней. «Премиум» — 3–4 недели из-за персональных сценариев и интеграций. Всё это время вы не работаете в одиночку: есть созвоны, шаблоны, обратная связь.",
  },
  {
    question: "Подходит ли это частному турагенту на фрилансе?",
    answer:
      "Да, если у вас есть стабильный поток 5+ туров в месяц. На меньшем потоке автоматизация пока не окупается — руками быстрее. Мы честно скажем на диагностике, если видим, что пока рано.",
  },
  {
    question: "А если клиент захочет говорить с живым человеком?",
    answer:
      "В любой момент — команда «нужен человек» или нажатие кнопки. Диалог уходит менеджеру с полной историей: что спросил, что ответил бот, какие документы отправлены. Менеджер не начинает с нуля и не теряет контекст.",
  },
  {
    question: "Что с персональными данными клиентов?",
    answer:
      "Работаем в рамках 152-ФЗ. Собираем только то, что нужно для сопровождения тура: имя, телефон, даты, рейс, документы. Согласие клиента — на первом экране. Хранение — на сервере в РФ. Готовим агенту шаблон политики конфиденциальности под его бизнес.",
  },
  {
    question: "А если мне нужен ещё и подборщик тура?",
    answer:
      "Это следующий шаг после консьержа. Подборщик — квиз на сайте или в мессенджере, который сначала уточняет бюджет, состав, даты, а потом передаёт тёплого лида менеджеру. Добавляем как отдельный модуль к пакету «Рост» или «Премиум».",
  },
  {
    question: "Как вы докажете, что бот работает?",
    answer:
      "На демо покажем живую переписку из пилотного агентства. После внедрения — метрики: сколько времени сэкономили менеджеру, сколько допродаж сделал бот, сколько вопросов закрыл без человека. Смотрим цифры, а не ощущения.",
  },
];

const relatedServices = [
  {
    title: "Чат-бот ВКонтакте",
    text: "Если на старте нужна только автоматизация диалогов в ВК без полного консьержа и CRM-логики.",
    href: "/services/chatbot-vk",
  },
  {
    title: "Telegram AI-консультант",
    text: "Похожий сервисный агент, но для Telegram: запись, вопросы, сопровождение клиента.",
    href: "/services/telegram-service-agent",
  },
  {
    title: "Сайт для турфирмы",
    text: "Посадочная под поиск и рекламу с формой подбора тура, отзывами и страницами направлений.",
    href: "/services/website-development",
  },
];

const journeyMoments = [
  {
    icon: MessageCircle,
    eyebrow: "1. Входящий лид",
    title: "Бот принимает первую заявку",
    text: "Сразу собирает направление, даты и бюджет, чтобы менеджер не начинал диалог с нуля.",
    chips: ["Направление", "Даты", "Бюджет"],
    tone: "from-[#0096D6]/16 via-white to-[#44B78B]/10",
    iconTone: "bg-[#0096D6]/12 text-[#0096D6]",
  },
  {
    icon: Plane,
    eyebrow: "2. Квалификация",
    title: "Уточняет формат поездки",
    text: "Сценарий отделяет горячие запросы от просто интереса и не даёт лиду потеряться.",
    chips: ["Семья", "4*", "Срочно"],
    tone: "from-[#44B78B]/14 via-white to-[#0096D6]/6",
    iconTone: "bg-[#44B78B]/12 text-[#348d68]",
  },
  {
    icon: FileCheck2,
    eyebrow: "3. Документы",
    title: "Отправляет ваучер и страховку",
    text: "Клиент получает важные файлы и памятку вовремя, а не после ручного пинга менеджеру.",
    chips: ["Ваучер", "PDF", "Памятка"],
    tone: "from-slate-100 via-white to-[#0096D6]/10",
    iconTone: "bg-[#0C1626] text-white",
  },
  {
    icon: BellRing,
    eyebrow: "4. Тайминг",
    title: "Напоминает про вылет",
    text: "За 7 дней и за 24 часа консьерж закрывает всё, о чём туристы обычно спрашивают вручную.",
    chips: ["Вылет", "Регистрация", "Чек-лист"],
    tone: "from-[#44B78B]/10 via-white to-[#44B78B]/4",
    iconTone: "bg-[#44B78B]/12 text-[#44B78B]",
  },
  {
    icon: ShieldCheck,
    eyebrow: "5. Допродажа",
    title: "Страховка и защита",
    text: "Предлагает полезные допуслуги в контексте поездки, а не отдельной рассылкой без момента.",
    chips: ["Страховка", "Защита", "Доплата"],
    tone: "from-[#0096D6]/12 via-white to-[#44B78B]/12",
    iconTone: "bg-[#0096D6]/12 text-[#0096D6]",
  },
  {
    icon: Wallet,
    eyebrow: "6. Маржа",
    title: "Трансфер и экскурсии",
    text: "Помогает агентству зарабатывать на сервисе, а не только на базовой продаже тура.",
    chips: ["Трансфер", "Экскурсия", "Апсейл"],
    tone: "from-[#44B78B]/10 via-white to-[#0096D6]/8",
    iconTone: "bg-[#0C1626] text-white",
  },
  {
    icon: Sun,
    eyebrow: "7. Во время тура",
    title: "Отвечает 24/7",
    text: "Клиент знает, куда писать во время поездки, и не остаётся без опоры, если у команды ночь.",
    chips: ["FAQ", "24/7", "Поддержка"],
    tone: "from-[#F9C74F]/18 via-white to-[#44B78B]/6",
    iconTone: "bg-[#F9C74F]/20 text-[#c08a0b]",
  },
  {
    icon: PackageCheck,
    eyebrow: "8. Сложный кейс",
    title: "Передаёт человеку",
    text: "Когда нужен живой агент, диалог переходит менеджеру уже с полным контекстом и историей.",
    chips: ["История", "Статус", "Эскалация"],
    tone: "from-slate-100 via-white to-[#44B78B]/8",
    iconTone: "bg-slate-900 text-white",
  },
  {
    icon: Star,
    eyebrow: "9. После поездки",
    title: "Собирает отзыв",
    text: "Отзывы не выпрашиваются вручную: система возвращается к клиенту в правильный момент.",
    chips: ["Оценка", "Отзыв", "Бонус"],
    tone: "from-[#44B78B]/12 via-white to-[#0096D6]/8",
    iconTone: "bg-[#44B78B]/12 text-[#348d68]",
  },
  {
    icon: Rocket,
    eyebrow: "10. Повторная продажа",
    title: "Возвращает клиента в цикл",
    text: "Следующая поездка, сезонное предложение и персональное касание запускаются системно, а не по памяти.",
    chips: ["CRM", "Сезон", "Повтор"],
    tone: "from-[#0096D6]/12 via-white to-[#44B78B]/14",
    iconTone: "bg-[#0096D6]/12 text-[#0096D6]",
  },
];
const formatRub = (value: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
    Math.round(value),
  ) + " ₽";

const RoiCalculator = () => {
  const [toursPerMonth, setToursPerMonth] = useState(20);
  const [avgCheck, setAvgCheck] = useState(180000);
  const [commission, setCommission] = useState(9);
  const [upsellLift, setUpsellLift] = useState(15);

  const { monthlyRevenue, extraFromUpsell, hoursSaved } = useMemo(() => {
    const baseCommission = (toursPerMonth * avgCheck * commission) / 100;
    const extra = baseCommission * (upsellLift / 100);
    // грубая оценка: 25 минут ручной рутины на тур уходят в бота
    const hours = (toursPerMonth * 25) / 60;
    return {
      monthlyRevenue: baseCommission,
      extraFromUpsell: extra,
      hoursSaved: hours,
    };
  }, [toursPerMonth, avgCheck, commission, upsellLift]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <Card className="p-6 md:p-8 shadow-card">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0096D6]/10">
            <TrendingUp className="h-5 w-5 text-[#0096D6]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Посчитайте свою выгоду
            </h3>
            <p className="text-sm text-slate-500">
              Подставьте свои цифры — считаем в реальном времени
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <RangeRow
            label="Туров в месяц"
            value={toursPerMonth}
            onChange={setToursPerMonth}
            min={3}
            max={80}
            suffix={` тур/мес`}
          />
          <RangeRow
            label="Средний чек тура"
            value={avgCheck}
            onChange={setAvgCheck}
            min={40000}
            max={1200000}
            step={5000}
            suffix=" ₽"
            formatValue={(v) => formatRub(v)}
          />
          <RangeRow
            label="Ваша комиссия агента"
            value={commission}
            onChange={setCommission}
            min={4}
            max={15}
            suffix="%"
          />
          <RangeRow
            label="Прирост допродаж после бота"
            value={upsellLift}
            onChange={setUpsellLift}
            min={5}
            max={35}
            suffix="%"
            hint="Страховка, трансфер, экскурсии, ранний заезд"
          />
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <Card className="p-6 shadow-card bg-gradient-to-br from-[#0096D6]/5 to-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Комиссия сейчас
              </div>
              <div className="mt-1 text-3xl font-bold text-slate-900">
                {formatRub(monthlyRevenue)}
              </div>
              <div className="text-sm text-slate-500">в месяц</div>
            </div>
            <Wallet className="h-8 w-8 text-[#0096D6]" />
          </div>
        </Card>

        <Card className="p-6 shadow-card bg-gradient-to-br from-[#44B78B]/10 to-white border-[#44B78B]/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#348d68]">
                Ожидаемый прирост
              </div>
              <div className="mt-1 text-3xl font-bold text-slate-900">
                +{formatRub(extraFromUpsell)}
              </div>
              <div className="text-sm text-slate-500">
                в месяц за счёт допродаж бота
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-[#44B78B]" />
          </div>
        </Card>

        <Card className="p-6 shadow-card bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Высвобождённое время
              </div>
              <div className="mt-1 text-3xl font-bold text-slate-900">
                ~{hoursSaved.toFixed(1)} ч
              </div>
              <div className="text-sm text-slate-500">
                в месяц на ручной рутине
              </div>
            </div>
            <Clock className="h-8 w-8 text-slate-500" />
          </div>
        </Card>

        <div className="text-xs text-slate-500 leading-relaxed">
          Расчёт — ориентир, не гарантия. Фактические цифры зависят от ниши,
          среднего чека, качества трафика и команды. На диагностике делаем
          расчёт уже по вашим данным, а не по ползункам.
        </div>
      </div>
    </div>
  );
};

interface RangeRowProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  hint?: string;
  formatValue?: (value: number) => string;
}

const RangeRow = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "",
  hint,
  formatValue,
}: RangeRowProps) => {
  const display = formatValue ? formatValue(value) : `${value}${suffix}`;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-base font-semibold text-[#0096D6]">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#0096D6]"
      />
      {hint && (
        <div className="mt-1 text-xs text-slate-500">{hint}</div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Демо-чат. Имитирует реальную переписку AI-консьержа с клиентом,
// чтобы турагент сразу увидел, как это выглядит на его стороне.
// ---------------------------------------------------------------------------

const DemoChat = () => {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#0096D6]/10 blur-3xl" />
      <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-[#44B78B]/15 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(0,150,214,0.5)]">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-[#0096D6]/5 to-[#44B78B]/5 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white">
            <Plane className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Помощник турагента
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#44B78B]/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#44B78B]" />
              </span>
              в сети
            </div>
          </div>
        </div>

        {/* body */}
        <div className="space-y-3 bg-slate-50/50 px-5 py-6 min-h-[420px]">
          {demoMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: msg.delay, duration: 0.4 }}
              className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.from === "bot"
                    ? "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
                    : "bg-gradient-to-br from-[#0096D6] to-[#0b7cb0] text-white rounded-br-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-4 py-3">
          <div className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-400">
            Сообщение…
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white">
            <Send className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="h-4 w-4 text-[#44B78B]" />
        Реальный сценарий: подтверждение тура → документы → допбагаж → оплата
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Сама страница
// ---------------------------------------------------------------------------

export default function AiTuragent() {
  useAutoBreadcrumb("AI-консьерж для турагентов");
  useFaqSchema(faqItems);

  return (
    <Layout
      title="AI-консьерж для турагентов — ВК, Telegram, MAX | CentrLP"
      description="AI-консьерж для турагентства: ваучеры, напоминания, допродажи, ответы на вопросы и сопровождение туристов во ВКонтакте, Telegram и Max."
    >
      {/* =====================================================================
          HERO
         ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#0096D6]/[0.05] to-white pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 right-[8%] h-80 w-80 rounded-full bg-[#0096D6]/15 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-[10%] h-96 w-96 rounded-full bg-[#44B78B]/15 blur-3xl"
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0096D6]/35 to-transparent" />
        </div>

        {/* travel-specific floating decorations */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[6%] top-28 text-[#0096D6]/20"
          >
            <PlaneTakeoff className="h-14 w-14" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 16, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[8%] top-32 text-[#44B78B]/20"
          >
            <Sun className="h-12 w-12" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-28 left-[12%] text-[#0b7cb0]/15"
          >
            <Palmtree className="h-12 w-12" />
          </motion.div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0096D6] shadow-sm"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#44B78B]/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#44B78B]" />
                </span>
                Для турагентов и турфирм
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mb-6 bg-[linear-gradient(135deg,#007DB3_0%,#0096D6_40%,#44B78B_100%)] bg-clip-text text-4xl font-bold leading-[1.05] tracking-tight text-transparent md:text-5xl lg:text-6xl"
              >
                AI-консьерж, который ведёт туристов от оплаты до возвращения
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl"
              >
                Отвечает на вопросы, отправляет ваучеры и страховку, напоминает про вылет, дожимает допродажи. А менеджер занимается подбором и продажами, а не «ещё раз пришлите, пожалуйста, памятку».
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 flex flex-wrap gap-2.5"
              >
                {[
                  "ВКонтакте + Telegram + MAX",
                  "Старт — 29 000 ₽",
                  "Внедрение 5–7 дней",
                  "Без замены менеджера",
                ].map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-slate-200 bg-white/85 px-4 py-1.5 text-sm text-slate-700 shadow-sm"
                  >
                    {point}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  size="lg"
                  asChild
                  className="border-0 bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)] text-white shadow-[0_18px_50px_-24px_rgba(0,150,214,0.7)] transition-transform hover:-translate-y-0.5 hover:opacity-95"
                >
                  <a href="#contact">
                    Получить демо по моей нише
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-slate-300 bg-white/80"
                >
                  <a href="#packages">Пакеты и цены</a>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <DemoChat />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PAIN POINTS
         ===================================================================== */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-2 text-sm font-semibold text-[#0096D6]">
              Пять болей, которые знает любой турагент
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Сначала понимаем, где уходят деньги и время, а потом автоматизируем
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Не «поставим бота — станет хорошо». Сначала смотрим, где у турагента реально течёт выручка и сгорает время, и закрываем именно эти места.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((pain, idx) => (
              <Card
                key={pain.title}
                className="group relative h-full overflow-hidden p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lg md:p-7"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                    <pain.icon className="h-6 w-6" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Боль {idx + 1}
                  </div>
                </div>
                <h3 className="mb-3 text-lg font-bold leading-snug text-slate-900">
                  {pain.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {pain.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FEATURES
         ===================================================================== */}
      <section className="bg-gradient-to-b from-white via-[#0096D6]/[0.03] to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#44B78B]/20 bg-white px-4 py-2 text-sm font-semibold text-[#348d68]">
              Что делает AI-консьерж
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Шесть вещей, которые он закрывает вместо менеджера
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Это не «чатбот с кнопками». Это рабочий помощник, который понимает контекст поездки клиента и действует по сценарию агентства.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group h-full p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white shadow-lg shadow-[#0096D6]/20">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {feature.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-2 text-sm font-semibold text-[#0096D6]">
              Как это выглядит в живой работе
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Не картинки ради картинок, а три понятные продуктовые сцены
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Здесь уже видно, за что агентство платит: как заявка собирается, как клиент обслуживается в поездке и как команда всё это контролирует.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8">
            <Card className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_70px_-38px_rgba(0,150,214,0.26)]">
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#0096D6]/10 via-white to-[#44B78B]/10 p-8 md:p-10">
                  <div className="mb-6 inline-flex rounded-full border border-[#0096D6]/15 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0096D6]">
                    Входящая заявка
                  </div>
                  <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-[28px] border border-slate-200 bg-[#0C1626] p-4 shadow-xl shadow-[#0096D6]/15">
                      <div className="mb-4 flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                        <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      </div>
                      <div className="space-y-3">
                        <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-[#0096D6] px-4 py-3 text-sm text-white">
                          Нужен тур в Турцию в июне на двоих
                        </div>
                        <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm text-slate-100">
                          Подскажите даты, бюджет и нужен ли семейный формат
                        </div>
                        <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-[#44B78B] px-4 py-3 text-sm text-white">
                          Бюджет до 350, с ребёнком, вылет из Екб
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-[26px] border border-white/70 bg-white/90 p-5 shadow-lg shadow-[#0096D6]/10">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0096D6]/10 text-[#0096D6]">
                            <MessageCircle className="h-5 w-5" />
                          </div>
                          <div className="text-sm font-semibold text-slate-900">Заявка собрана автоматически</div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {["Турция", "Июнь", "2 взрослых + ребёнок", "До 350 тыс."].map((label) => (
                            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                              {label}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-[26px] border border-[#44B78B]/20 bg-white/90 p-5 shadow-lg shadow-[#44B78B]/10">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#44B78B]/10 text-[#44B78B]">
                            <Briefcase className="h-5 w-5" />
                          </div>
                          <div className="text-sm font-semibold text-slate-900">Менеджер получает не хаос, а тёплый лид</div>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-200 px-4 py-3">
                          <span className="text-sm text-slate-600">Передача в работу</span>
                          <ArrowRight className="h-4 w-4 text-[#0096D6]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">
                    Бот не просто отвечает, а квалифицирует и подготавливает продажу
                  </h3>
                  <p className="mb-6 text-sm leading-7 text-slate-600">
                    Это уже не «напишите нам в мессенджер». Клиент проходит короткий умный сценарий, а менеджер получает готовую основу для закрытия сделки.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Сразу собираются даты, бюджет, состав поездки и срочность",
                      "Заявка не теряется между ВК, Telegram и сайтом",
                      "Команда тратит время на продажу, а не на повторные уточнения",
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#44B78B]" />
                        <span className="text-sm leading-6 text-slate-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_22px_60px_-40px_rgba(0,150,214,0.24)]">
                <div className="bg-gradient-to-br from-[#0096D6]/10 via-white to-[#44B78B]/10 p-8">
                  <div className="mb-5 inline-flex rounded-full border border-[#0096D6]/15 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0096D6]">
                    Сервис в поездке
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_0.95fr]">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-lg shadow-[#0096D6]/10">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0096D6]/10 text-[#0096D6]">
                          <PlaneTakeoff className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">Поездка ведётся по таймингу</div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { icon: Calendar, text: "Напоминание за 7 дней" },
                          { icon: ShieldCheck, text: "Ваучер и страховка в один клик" },
                          { icon: Wallet, text: "Трансфер и багаж в нужный момент" },
                        ].map((item) => (
                          <div key={item.text} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                            <item.icon className="h-4 w-4 text-[#44B78B]" />
                            <span className="text-sm text-slate-700">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[28px] border border-slate-200 bg-[#0C1626] p-5 shadow-xl shadow-[#0096D6]/15">
                      <div className="space-y-3">
                        <div className="max-w-[86%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm text-slate-100">
                          Вот ваши документы и памятка по вылету
                        </div>
                        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#0096D6] px-4 py-3 text-sm text-white">
                          Нужен ещё трансфер до отеля
                        </div>
                        <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm text-slate-100">
                          Добавили. Ещё можно оформить ранний заезд и экскурсии
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">
                    Клиент получает сервис, а агентство — дополнительную маржу
                  </h3>
                  <p className="text-sm leading-7 text-slate-600">
                    Здесь и раскрывается сила услуги: бот снимает рутину с команды и одновременно помогает агентству не терять деньги на страховках, трансферах и прочих допродажах.
                  </p>
                </div>
              </Card>

              <Card className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_22px_60px_-40px_rgba(0,150,214,0.24)]">
                <div className="bg-gradient-to-br from-[#44B78B]/10 via-white to-[#0096D6]/10 p-8">
                  <div className="mb-5 inline-flex rounded-full border border-[#44B78B]/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#348d68]">
                    Контроль и возврат клиента
                  </div>
                  <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-lg shadow-[#44B78B]/10">
                    <div className="mb-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0096D6]/10 text-[#0096D6]">
                          <Users className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">Диалоги</div>
                        <div className="mt-2 h-2 rounded-full bg-[#0096D6]/20" />
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#44B78B]/10 text-[#44B78B]">
                          <BellRing className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">Напоминания</div>
                        <div className="mt-2 h-2 rounded-full bg-[#44B78B]/20" />
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0096D6]/10 text-[#0096D6]">
                          <Star className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-semibold text-slate-900">Отзывы</div>
                        <div className="mt-2 h-2 rounded-full bg-[#0096D6]/20" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 text-sm font-semibold text-slate-900">Панель менеджера</div>
                        <div className="space-y-3">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3">
                              <div className="h-10 w-10 rounded-full bg-[#0096D6]/10" />
                              <div className="flex-1">
                                <div className="h-2 rounded-full bg-slate-200" />
                                <div className="mt-2 h-2 w-2/3 rounded-full bg-slate-100" />
                              </div>
                              <div className="h-3 w-3 rounded-full bg-[#44B78B]" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-dashed border-[#44B78B]/30 bg-white p-4">
                        <div className="mb-3 text-sm font-semibold text-slate-900">После поездки</div>
                        <div className="space-y-3">
                          {["Отзыв", "Бонус", "Следующая поездка"].map((item) => (
                            <div key={item} className="rounded-2xl bg-[#44B78B]/8 px-4 py-3 text-sm font-medium text-slate-700">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">
                    Команда видит, что происходит, а клиент не исчезает после тура
                  </h3>
                  <p className="text-sm leading-7 text-slate-600">
                    Это уже уровень системы: переписки не расползаются, менеджер подхватывает сложные кейсы вовремя, а после поездки запускается повторный контакт и следующая продажа.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-[#0096D6]/[0.03] to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0096D6]">
              10 продуктовых моментов
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Не одна абстрактная картинка, а весь путь туриста по системе
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Ниже не просто иконки ради декора. Это 10 отдельных точек, где AI-консьерж реально снимает рутину, усиливает сервис и добавляет деньги агентству.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-5">
            {journeyMoments.map((moment) => (
              <Card
                key={moment.title}
                className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-42px_rgba(15,23,42,0.28)]"
              >
                <div className={`bg-gradient-to-br ${moment.tone} p-5`}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${moment.iconTone}`}>
                      <moment.icon className="h-5 w-5" />
                    </div>
                    <div className="rounded-full border border-white/70 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {moment.eyebrow}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/80 bg-white/88 p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#44B78B]" />
                      <div className="h-2 w-20 rounded-full bg-slate-200" />
                    </div>
                    <div className="space-y-2">
                      {moment.chips.map((chip, index) => (
                        <div key={chip} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
                          <div className={`h-7 w-7 rounded-xl ${index % 2 === 0 ? "bg-[#0096D6]/10" : "bg-[#44B78B]/10"}`} />
                          <div className="h-2 w-full rounded-full bg-slate-200" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-900">{moment.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{moment.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {moment.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHANNELS
         ===================================================================== */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-2 text-sm font-semibold text-[#0096D6]">
              Где работает
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Каналы, где клиент вам пишет — там и отвечает консьерж
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Начинаем с ВКонтакте и Telegram как с самых живых каналов для российского турагента. MAX — по мере готовности платформы для бизнеса.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel) => (
              <Card
                key={channel.name}
                className={`h-full p-6 shadow-card bg-gradient-to-b ${channel.color} border-slate-200`}
              >
                <channel.icon className={`mb-4 h-8 w-8 ${channel.accent}`} />
                <div className={`mb-2 text-lg font-bold ${channel.accent}`}>
                  {channel.name}
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  {channel.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          ROI CALCULATOR
         ===================================================================== */}
      <section className="bg-gradient-to-b from-white via-[#44B78B]/[0.04] to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#44B78B]/20 bg-white px-4 py-2 text-sm font-semibold text-[#348d68]">
              Калькулятор выгоды
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Сколько денег теряется на забытых допродажах — прямо сейчас
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Подвигайте ползунки под свои цифры. Мы специально не спрашиваем контакты, чтобы посмотреть сумму — это не ваучер на скидку, а реальная оценка для себя.
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <RoiCalculator />
          </div>
        </div>
      </section>

      {/* =====================================================================
          PROCESS
         ===================================================================== */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-2 text-sm font-semibold text-[#0096D6]">
              Процесс внедрения
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Пять шагов от первого созвона до работающего консьержа
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Мы не бросаем бота «на проде» через неделю и не исчезаем. 30 дней после запуска — сопровождение и докрутка по живым диалогам.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <Card
                key={step.step}
                className="relative h-full p-6 shadow-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-xl font-bold text-white shadow-lg shadow-[#0096D6]/25">
                  {step.step}
                </div>
                <h3 className="mb-2 font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {step.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          PACKAGES
         ===================================================================== */}
      <section
        id="packages"
        className="bg-gradient-to-b from-white via-[#0096D6]/[0.04] to-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-2 text-sm font-semibold text-[#0096D6]">
              Пакеты
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Три пакета под разный масштаб агентства
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              От частного турагента на фрилансе до агентства с премиум-сегментом. Ежемесячная стоимость — это сопровождение, не подписка за бота.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`relative h-full overflow-hidden p-8 shadow-card flex flex-col ${
                  pkg.highlight
                    ? "border-2 border-[#0096D6] shadow-[0_30px_60px_-30px_rgba(0,150,214,0.4)] lg:scale-[1.02]"
                    : ""
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-[#0096D6] to-[#44B78B] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Чаще берут
                  </div>
                )}
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                  Пакет
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900">
                  {pkg.name}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">
                  {pkg.description}
                </p>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {pkg.price}
                    </span>
                    <span className="text-sm text-slate-500">внедрение</span>
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    + {pkg.monthly} сопровождение
                  </div>
                </div>
                <ul className="mb-8 space-y-3 flex-1">
                  {pkg.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#44B78B]" />
                      <span className="text-sm leading-relaxed text-slate-700">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  asChild
                  className={
                    pkg.highlight
                      ? "border-0 bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)] text-white hover:opacity-95"
                      : ""
                  }
                  variant={pkg.highlight ? "default" : "outline"}
                >
                  <a href="#contact">{pkg.cta}</a>
                </Button>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-[#0096D6]">
              <Star className="h-4 w-4" />
              Для агентств с премиум-сегментом
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              Если средний чек в агентстве 500 000 ₽ и выше, при комиссии 8–10% одна дожатая допродажа уже окупает месяц сопровождения. На туре за миллион комиссия 100 000 ₽ — и бот, который добавил 15% к этому через страховку и трансфер, приносит больше, чем стоит весь пакет.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          RELATED
         ===================================================================== */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-2 text-sm font-semibold text-[#0096D6]">
              Связанные решения
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Работает сильнее в связке
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {relatedServices.map((item) => (
              <div
                key={item.href}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md md:p-7"
              >
                <h3 className="mb-3 text-[20px] font-bold tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mb-5 flex-1 leading-relaxed text-slate-600">
                  {item.text}
                </p>
                <Button variant="outline" size="sm" asChild className="self-start">
                  <Link to={item.href}>
                    Открыть страницу <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FAQ
         ===================================================================== */}
      <section className="bg-gradient-to-b from-white via-[#0096D6]/[0.04] to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] px-4 py-2 text-sm font-semibold text-[#0096D6]">
              FAQ
            </div>
            <h2 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-slate-900 md:text-[36px]">
              Частые вопросы турагентов
            </h2>
          </div>

          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={item.question}>
                  <AccordionTrigger className="px-6 text-left text-slate-900 hover:text-[#0096D6]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 leading-relaxed text-slate-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CTA
         ===================================================================== */}
      <section
        id="contact"
        className="bg-gradient-to-b from-white via-[#44B78B]/[0.05] to-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#44B78B]/20 bg-white px-4 py-2 text-sm font-semibold text-[#348d68]">
              <Rocket className="mr-2 h-4 w-4" />
              Давайте покажем на вашей нише
            </div>
            <h2 className="mb-4 text-[30px] font-bold leading-tight tracking-tight text-slate-900 md:text-[40px]">
              Покажем живое демо на примере вашего агентства
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Оставьте контакт — соберём демо под ваши туры и поток заявок, посчитаем экономику и покажем на реальной переписке, как это будет выглядеть для ваших клиентов.
            </p>
          </div>

          <div className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-3">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              <PackageCheck className="mr-1.5 -mt-0.5 inline-block h-4 w-4 text-[#44B78B]" />
              Ответ за 2 рабочих часа
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              <Calendar className="mr-1.5 -mt-0.5 inline-block h-4 w-4 text-[#0096D6]" />
              Диагностика бесплатно
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
              <Zap className="mr-1.5 -mt-0.5 inline-block h-4 w-4 text-[#0096D6]" />
              От демо до запуска — 2 недели
            </span>
          </div>

          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}


