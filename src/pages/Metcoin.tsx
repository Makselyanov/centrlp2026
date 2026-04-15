import { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFaqSchema } from "@/components/SeoSchemas";
import { motion } from "framer-motion";
import {
  Anchor,
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  FileCheck2,
  Gauge,
  HardHat,
  Hexagon,
  Layers,
  Loader2,
  MapPin,
  Package,
  Phone,
  Rocket,
  Ruler,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  Truck,
  Wrench,
} from "lucide-react";

// ============================================================================
// Брендовая палитра МеталлТех (Trust & Authority + Conversion)
// Navy #1E3A8A primary + Amber #B45309 CTA only. Light BG #F8FAFC. WCAG AAA.
// ============================================================================

const BRAND = {
  primary: "#1E3A8A",
  primaryDark: "#0F172A",
  primaryMid: "#1E40AF",
  primarySoft: "#EEF2FF",
  accent: "#B45309",
  accentLight: "#D97706",
  accentSoft: "#FEF3C7",
  bg: "#F8FAFC",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  borderStrong: "#CBD5E1",
  text: "#0F172A",
  textMuted: "#475569",
  textDim: "#64748B",
};

const FONT_HEAD = "'Lexend', 'Inter', system-ui, -apple-system, sans-serif";
const FONT_BODY = "'Source Sans 3', 'Inter', system-ui, -apple-system, sans-serif";

// ============================================================================
// Данные
// ============================================================================

const trustMetrics = [
  { value: "12+", label: "лет на рынке", hint: "Работаем с 2013 года" },
  { value: "2 400", label: "тонн металла в год", hint: "Собственный цех 1 800 м²" },
  { value: "340+", label: "выполненных проектов", hint: "От разовых партий до серийных поставок" },
  { value: "87", label: "городов доставки", hint: "РФ, Казахстан, Беларусь" },
];

const products = [
  {
    icon: Anchor,
    title: "Закладные изделия",
    gost: "ГОСТ 25997-83, серия 1.400-15",
    desc: "МН-1…МН-23, стеновые, колонные, фундаментные. С анкерными стержнями, сертификатом качества.",
    price: "от 420 ₽ / шт",
    tag: "Хит",
  },
  {
    icon: Target,
    title: "Деформационные марки",
    gost: "ГОСТ 24846-2019",
    desc: "Для наблюдения за осадками и смещениями зданий и сооружений. Круглые, прямоугольные, уголковые.",
    price: "от 310 ₽ / шт",
  },
  {
    icon: Compass,
    title: "Нивелирные реперы",
    gost: "ГОСТ 10528-90, ГОСТ 24846-2019",
    desc: "Стенные, грунтовые, скальные, временные. Нержавеющая сталь или оцинковка по требованию.",
    price: "от 580 ₽ / шт",
  },
  {
    icon: MapPin,
    title: "Грунтовые реперы",
    gost: "ГОСТ 24846-2019, РСН 42-83",
    desc: "С защитной трубой и колпаком, глубина заложения до 3,5 м. С паспортом на каждый репер.",
    price: "от 1 850 ₽ / шт",
  },
  {
    icon: Hexagon,
    title: "Сальники, гильзы",
    gost: "ТП 1.494.2-25 / СН 550-82",
    desc: "Для пропуска трубопроводов через стены и перекрытия. Любой DN, любая толщина стены.",
    price: "от 680 ₽ / шт",
  },
  {
    icon: Ruler,
    title: "Опоры под трубопровод",
    gost: "ГОСТ 16037-80, серия 4.903-10",
    desc: "Скользящие, неподвижные, хомутовые. DN 50–1400, включая антикор и покраску.",
    price: "от 940 ₽ / шт",
  },
  {
    icon: Building2,
    title: "Металлоэлементы фундаментов",
    gost: "СП 63.13330, ГОСТ 23279",
    desc: "Закладные для монолитных работ, анкерные группы, пластины распределения нагрузки.",
    price: "по чертежу",
  },
  {
    icon: Layers,
    title: "Металлоконструкции для ПЗПП",
    gost: "ГОСТ 23118-2019",
    desc: "Опорные и разгрузочные конструкции для промышленных трубопроводов и ёмкостей.",
    price: "по ТЗ",
  },
  {
    icon: Trash2,
    title: "Контейнеры для ТБО",
    gost: "ГОСТ 21220-75, 0,75 / 1,1 м³",
    desc: "Оцинкованные и окрашенные, с колёсами и без. Нестандартные размеры — по проекту.",
    price: "от 9 400 ₽ / шт",
  },
];

const advantages = [
  {
    icon: ShieldCheck,
    title: "Только по ГОСТ",
    text: "Каждая партия — с паспортом качества, сертификатом на сталь и актом входного контроля. Работаем на объектах Газпрома, Лукойла и Новатэка.",
  },
  {
    icon: Clock,
    title: "Срок — в договоре",
    text: "Типовые позиции — 3–7 дней, серийные партии — 14 дней. Штраф за срыв прописан в договоре: вы не рискуете графиком стройки.",
  },
  {
    icon: Truck,
    title: "Доставка по всей РФ",
    text: "Свой автопарк в радиусе 500 км, транспортные компании — по всей стране. Отгружаем с нулевым простоем машины: паллеты, обвязка, документы.",
  },
  {
    icon: HardHat,
    title: "Расчёт по вашему чертежу",
    text: "Пришлите DWG, PDF или эскиз от руки — в течение 1 рабочего дня дадим точный расчёт, марку стали, массу и срок. Без «звоните, потом обсудим».",
  },
  {
    icon: FileCheck2,
    title: "Полный комплект документов",
    text: "Паспорт качества, сертификат на сталь, чертёж КМД, акт скрытых работ, счёт-фактура, УПД. Любой формат — бумага, ЭДО, СБИС.",
  },
  {
    icon: Wrench,
    title: "Нестандарт без наценки-страха",
    text: "Ваш инженер прислал «нестандарт» в пятницу вечером? Мы не повышаем цену за каждый изгиб. Цена считается честно — по металлу, трудозатратам и покраске.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Заявка",
    text: "Чертёж, ТЗ или короткое описание. Реагируем в течение рабочего часа.",
  },
  {
    num: "02",
    title: "Расчёт",
    text: "1 рабочий день — спецификация, масса, цена, срок, КМД-эскиз.",
  },
  {
    num: "03",
    title: "Договор",
    text: "Подписание по ЭДО или курьером. Предоплата по согласованию.",
  },
  {
    num: "04",
    title: "Производство",
    text: "Собственный цех 1 800 м². Резка, сварка, антикор. Входной контроль стали.",
  },
  {
    num: "05",
    title: "Отгрузка",
    text: "Маркировка, паллетирование, полный комплект документов. Доставка по РФ.",
  },
];

const cases = [
  {
    title: "ЖК «Преображенский», Тюмень",
    scope: "340 закладных МН-1/МН-4",
    tons: "12,8 т",
    period: "март 2025",
    client: "Подрядчик: ГК «Стройтехнология»",
    note: "Сдали на 4 дня раньше срока, чтобы не сдвигать сроки монолитных работ.",
  },
  {
    title: "Магистральный газопровод, Ямал",
    scope: "Опоры под трубопровод DN-720, 84 шт",
    tons: "46,2 т",
    period: "октябрь 2024",
    client: "Субподряд для «СТГ-Инжиниринг»",
    note: "Антикор СЦ-1, усиленные анкерные группы под сейсмику 8 баллов.",
  },
  {
    title: "Мост через р. Пышма, Свердловская обл.",
    scope: "Деформационные марки + грунтовые реперы, 124 позиции",
    tons: "3,1 т",
    period: "июнь 2024",
    client: "ФАУ «РОСДОРНИИ»",
    note: "Сертификация каждого репера, индивидуальный паспорт с геодезическими координатами.",
  },
];

const reviews = [
  {
    company: "ООО «СтройТехнология-72»",
    person: "Сергей Арефьев, начальник ПТО",
    text: "Работаем с МеталлТех третий год. Из всех тюменских поставщиков — единственные, кто не срывал ни одного срока. Закладные приходят чистые, в размерах, с полным пакетом документов по ЭДО — не нужно дёргать снабженца за каждой бумажкой.",
  },
  {
    company: "ГК «Сибнефтестрой»",
    person: "Марат Исмагилов, главный инженер",
    text: "Заказывали нестандартные опоры под магистральный трубопровод. За 2 дня сделали расчёт, на 9-й день были на площадке. Что особо ценно — прислали образцы сварных швов и фото отливки ещё до отгрузки. В нашей отрасли это редкость.",
  },
  {
    company: "ООО «Тюменьдорсервис»",
    person: "Елена Кравченко, руководитель снабжения",
    text: "Объём у нас неровный — то 400 реперов в месяц, то 20. МеталлТех подстраивается без нервов и без пересчётов. Когда в августе подвёл другой поставщик, они за 3 дня закрыли чужую позицию без наценки «за срочность».",
  },
];

const faqItems = [
  {
    question: "Какой минимальный заказ?",
    answer:
      "Минимального порога нет — отгружаем от 1 штуки. Для объёмов до 10 позиций удобнее объединять с другими заказчиками, мы сами предложим варианты. Для серий от 100 штук даём опт-скидку 8–15%.",
  },
  {
    question: "Работаете ли с НДС? Можно ли по ЭДО?",
    answer:
      "Работаем на ОСНО, даём УПД с НДС 20%. Подключены к СБИС, Диадок, Контур.Диадок — обмен документами полностью электронный. Также работаем по бумаге, если этого требует ваш процесс.",
  },
  {
    question: "Какие гарантии по срокам?",
    answer:
      "Срок фиксируется в договоре. В типовом договоре — штраф 0,1% от суммы просроченной партии за каждый день (на практике применяем крайне редко — за 12 лет сорвали срок меньше 1% заказов). Если сдвиг неизбежен — предупреждаем минимум за 3 рабочих дня.",
  },
  {
    question: "Можно ли сделать изделие по моему чертежу?",
    answer:
      "Да, это наша базовая работа. Принимаем чертежи в DWG, DXF, PDF, JPG, иногда — фотографию эскиза от руки. Наш конструктор переводит в рабочий КМД, согласовываем с вами, запускаем в производство. Если нужно — делаем 3D-модель.",
  },
  {
    question: "Как считается цена? Прайс-лист есть?",
    answer:
      "Публикуем ориентировочные цены на типовые позиции. Финальная цена считается по трём пунктам: металл (по текущему биржевому курсу), трудозатраты (сварка, покраска, антикор) и логистика. Для постоянных клиентов фиксируем цену на квартал.",
  },
  {
    question: "Какие марки стали используете?",
    answer:
      "По умолчанию — Ст3сп/пс ГОСТ 380-2005 для закладных и реперов. Для нагруженных конструкций — 09Г2С ГОСТ 19281-2014. Нержавейка AISI 304/316 — под заказ. На каждую партию — сертификат от металлобазы или своего входного контроля.",
  },
  {
    question: "Делаете ли антикоррозийную обработку?",
    answer:
      "Да: грунт-эмаль ЭП-0199, Tikkurila, горячее цинкование (передаём партнёру в Екатеринбург), полимерная окраска. Цвет — по RAL или по образцу. На весь антикор даём гарантию 5 лет при правильной эксплуатации.",
  },
  {
    question: "Доставка — как устроена?",
    answer:
      "По Тюмени и области — своим транспортом (манипуляторы 3–10 т, бортовые до 20 т). По РФ — через ПЭК, Деловые Линии, ЖелДорЭкспедицию, КИТ. Упаковка в деревянную обрешётку или паллеты по запросу. Страховка груза включена в стоимость.",
  },
];

// ============================================================================
// Вспомогательные компоненты
// ============================================================================

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em]"
    style={{
      background: BRAND.primarySoft,
      color: BRAND.primary,
      fontFamily: FONT_HEAD,
      letterSpacing: "0.15em",
    }}
  >
    <span
      className="inline-block w-1.5 h-1.5 rounded-full"
      style={{ background: BRAND.accent }}
    />
    {children}
  </div>
);

const SectionH2 = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
    style={{ fontFamily: FONT_HEAD, color: BRAND.text, letterSpacing: "-0.02em" }}
  >
    {children}
  </h2>
);

// ============================================================================
// Header
// ============================================================================

const MetcoinHeader = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "#products", label: "Продукция" },
    { href: "#how", label: "Как работаем" },
    { href: "#cases", label: "Проекты" },
    { href: "#calc", label: "Расчёт" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Контакты" },
  ];

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)",
        backdropFilter: "saturate(180%) blur(14px)",
        WebkitBackdropFilter: "saturate(180%) blur(14px)",
        borderBottom: scrolled ? `1px solid ${BRAND.border}` : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-3 group">
          <div
            className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-xl font-black text-white text-lg shadow-lg transition-transform group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
              fontFamily: FONT_HEAD,
              boxShadow: "0 8px 24px -8px rgba(30, 58, 138, 0.45)",
            }}
          >
            МТ
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="font-extrabold text-[15px] md:text-base tracking-wide"
              style={{ fontFamily: FONT_HEAD, color: BRAND.text }}
            >
              МЕТАЛЛТЕХ
            </span>
            <span
              className="text-[10px] md:text-[11px] uppercase tracking-[0.15em]"
              style={{ color: BRAND.textDim, fontFamily: FONT_BODY }}
            >
              производство · Тюмень
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-[color:var(--hov)] cursor-pointer"
              style={
                {
                  color: BRAND.textMuted,
                  fontFamily: FONT_BODY,
                  ["--hov" as string]: BRAND.primary,
                } as React.CSSProperties
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="tel:+73452397004"
            className="hidden md:flex items-center gap-2 text-sm font-semibold"
            style={{ color: BRAND.text, fontFamily: FONT_BODY }}
          >
            <Phone className="w-4 h-4" style={{ color: BRAND.primary }} />
            +7 (3452) 39-70-04
          </a>
          <button
            type="button"
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
            style={{
              background: `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.accentLight} 100%)`,
              fontFamily: FONT_HEAD,
              boxShadow: "0 6px 20px -6px rgba(180, 83, 9, 0.55)",
            }}
          >
            Рассчитать
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer"
            style={{ background: BRAND.primarySoft, color: BRAND.primary }}
          >
            <ChevronDown
              className="w-5 h-5 transition-transform"
              style={{ transform: open ? "rotate(180deg)" : "none" }}
            />
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="lg:hidden border-t px-4 py-4 flex flex-col gap-2"
          style={{ borderColor: BRAND.border, background: "#fff" }}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium"
              style={{ color: BRAND.text, fontFamily: FONT_BODY }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

// ============================================================================
// Hero
// ============================================================================

const Hero = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <section
    id="top"
    className="relative overflow-hidden"
    style={{
      background: `linear-gradient(180deg, ${BRAND.bg} 0%, ${BRAND.surface} 100%)`,
    }}
  >
    {/* фон — тонкая гравюра */}
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(${BRAND.primary} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
    <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-10 md:pt-16 lg:pt-20 pb-16 md:pb-24 grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_1fr] items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] mb-6"
          style={{
            background: BRAND.primarySoft,
            color: BRAND.primary,
            fontFamily: FONT_HEAD,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Собственное производство · Тюмень · с 2013
        </div>

        <h1
          className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-[1.05] tracking-tight"
          style={{
            fontFamily: FONT_HEAD,
            color: BRAND.text,
            letterSpacing: "-0.025em",
          }}
        >
          Производство
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryMid} 60%, ${BRAND.accent} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            металлоконструкций
          </span>
          <br />
          любой сложности
        </h1>

        <p
          className="mt-6 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl"
          style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
        >
          Закладные изделия, реперы, опоры под трубопровод, контейнеры ТБО и нестандарт
          по чертежам. Собственный цех 1 800 м², только ГОСТ, сроки в договоре — работаем
          с подрядчиками Газпрома, Лукойла и Новатэка.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-white font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.accentLight} 100%)`,
              fontFamily: FONT_HEAD,
              boxShadow: "0 10px 30px -8px rgba(180, 83, 9, 0.55)",
            }}
          >
            Рассчитать проект за 1 день
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: BRAND.surface,
              color: BRAND.primary,
              border: `1.5px solid ${BRAND.borderStrong}`,
              fontFamily: FONT_HEAD,
            }}
          >
            Смотреть продукцию
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
          {[
            { icon: ShieldCheck, label: "Паспорт качества на каждую партию" },
            { icon: FileCheck2, label: "ЭДО: СБИС / Диадок" },
            { icon: Truck, label: "Доставка по РФ, КЗ, РБ" },
          ].map((x) => (
            <div key={x.label} className="flex items-center gap-2">
              <x.icon className="w-4 h-4" style={{ color: BRAND.accent }} />
              <span style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}>{x.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative"
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            boxShadow: "0 30px 80px -30px rgba(15, 23, 42, 0.55)",
          }}
        >
          <img
            src="/images/verticals/metcoin-hero.png"
            alt="Производственный цех металлоконструкций МеталлТех в Тюмени"
            className="w-full h-auto block"
            loading="eager"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.55) 100%)",
            }}
          />
          <div className="absolute left-4 md:left-6 bottom-4 md:bottom-6 right-4 md:right-6 flex items-end justify-between gap-4">
            <div>
              <div
                className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/80"
                style={{ fontFamily: FONT_HEAD }}
              >
                Наш цех
              </div>
              <div
                className="text-white text-lg md:text-xl font-bold mt-1"
                style={{ fontFamily: FONT_HEAD }}
              >
                г. Тюмень, ул. Новаторов, 12 к3
              </div>
            </div>
            <div
              className="hidden md:flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm backdrop-blur"
              style={{ background: "rgba(255,255,255,0.12)", fontFamily: FONT_BODY }}
            >
              <span className="relative flex w-2 h-2">
                <span
                  className="animate-ping absolute inline-flex w-full h-full rounded-full opacity-75"
                  style={{ background: "#34D399" }}
                />
                <span
                  className="relative inline-flex w-2 h-2 rounded-full"
                  style={{ background: "#34D399" }}
                />
              </span>
              Производство работает
            </div>
          </div>
        </div>

        {/* плавающие бейджи */}
        <div
          className="hidden md:flex absolute -left-6 -top-6 items-center gap-3 rounded-2xl p-4 shadow-xl"
          style={{
            background: BRAND.surface,
            border: `1px solid ${BRAND.border}`,
            boxShadow: "0 20px 50px -20px rgba(15, 23, 42, 0.25)",
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: BRAND.primarySoft }}
          >
            <Award className="w-5 h-5" style={{ color: BRAND.primary }} />
          </div>
          <div>
            <div
              className="text-[11px] uppercase tracking-[0.18em]"
              style={{ color: BRAND.textDim, fontFamily: FONT_HEAD }}
            >
              ИСО
            </div>
            <div
              className="text-sm font-bold"
              style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
            >
              9001 : 2015
            </div>
          </div>
        </div>

        <div
          className="hidden md:flex absolute -right-4 top-1/3 items-center gap-3 rounded-2xl p-4 shadow-xl"
          style={{
            background: BRAND.surface,
            border: `1px solid ${BRAND.border}`,
            boxShadow: "0 20px 50px -20px rgba(15, 23, 42, 0.25)",
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: BRAND.accentSoft }}
          >
            <Rocket className="w-5 h-5" style={{ color: BRAND.accent }} />
          </div>
          <div>
            <div
              className="text-[11px] uppercase tracking-[0.18em]"
              style={{ color: BRAND.textDim, fontFamily: FONT_HEAD }}
            >
              Средний срок
            </div>
            <div
              className="text-sm font-bold"
              style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
            >
              7 рабочих дней
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ============================================================================
// Trust bar
// ============================================================================

const TrustBar = () => (
  <section
    className="relative"
    style={{
      background: `linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 100%)`,
    }}
  >
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {trustMetrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="text-center lg:text-left"
        >
          <div
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-none"
            style={{ fontFamily: FONT_HEAD, letterSpacing: "-0.03em" }}
          >
            {m.value}
          </div>
          <div
            className="mt-3 text-sm md:text-base font-semibold"
            style={{ color: "#E0E7FF", fontFamily: FONT_BODY }}
          >
            {m.label}
          </div>
          <div
            className="mt-1 text-xs"
            style={{ color: "rgba(224,231,255,0.65)", fontFamily: FONT_BODY }}
          >
            {m.hint}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// ============================================================================
// Products
// ============================================================================

const Products = () => (
  <section
    id="products"
    className="py-20 md:py-28"
    style={{ background: BRAND.bg }}
  >
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl">
        <SectionEyebrow>Продукция</SectionEyebrow>
        <SectionH2>
          <span className="block mt-4">
            9 категорий — от закладных МН-1
            <br className="hidden md:inline" />
            до нестандартных опор по чертежу
          </span>
        </SectionH2>
        <p
          className="mt-5 text-base md:text-lg"
          style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
        >
          Типовые позиции — на складе, серийные партии — 14 дней, нестандарт — по ТЗ с
          расчётом за 1 рабочий день. На каждое изделие — паспорт и сертификат на сталь.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            className="group relative rounded-2xl p-6 md:p-7 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden"
            style={{
              background: BRAND.surface,
              border: `1px solid ${BRAND.border}`,
              boxShadow: "0 2px 8px -2px rgba(15,23,42,0.04)",
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
                  boxShadow: "0 8px 24px -10px rgba(30, 58, 138, 0.5)",
                }}
              >
                <p.icon className="w-7 h-7 text-white" strokeWidth={1.6} />
              </div>
              {p.tag && (
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: BRAND.accentSoft,
                    color: BRAND.accent,
                    fontFamily: FONT_HEAD,
                  }}
                >
                  {p.tag}
                </span>
              )}
            </div>

            <h3
              className="text-xl md:text-[22px] font-bold leading-tight"
              style={{ fontFamily: FONT_HEAD, color: BRAND.text }}
            >
              {p.title}
            </h3>
            <div
              className="mt-1 text-[11px] uppercase tracking-[0.12em] font-semibold"
              style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
            >
              {p.gost}
            </div>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
            >
              {p.desc}
            </p>

            <div
              className="mt-5 pt-4 flex items-center justify-between"
              style={{ borderTop: `1px dashed ${BRAND.border}` }}
            >
              <div
                className="font-bold text-base"
                style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
              >
                {p.price}
              </div>
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                style={{ color: BRAND.accent, fontFamily: FONT_HEAD }}
              >
                Заявка
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// How we work
// ============================================================================

const HowWeWork = () => (
  <section id="how" className="py-20 md:py-28" style={{ background: BRAND.surface }}>
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <SectionEyebrow>Как работаем</SectionEyebrow>
        <SectionH2>
          <span className="block mt-4">От чертежа до отгрузки — 5 шагов без сюрпризов</span>
        </SectionH2>
      </div>

      <div className="relative grid gap-6 lg:gap-0 lg:grid-cols-5">
        {/* линия */}
        <div
          aria-hidden
          className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px"
          style={{
            background: `repeating-linear-gradient(90deg, ${BRAND.borderStrong} 0 8px, transparent 8px 16px)`,
          }}
        />
        {processSteps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative flex flex-col items-start lg:items-center text-left lg:text-center px-0 lg:px-4"
          >
            <div
              className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-2xl font-black text-white mb-4"
              style={{
                background:
                  i === processSteps.length - 1
                    ? `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.accentLight} 100%)`
                    : `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
                fontFamily: FONT_HEAD,
                boxShadow: "0 14px 30px -10px rgba(15, 23, 42, 0.35)",
              }}
            >
              {s.num}
            </div>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: FONT_HEAD, color: BRAND.text }}
            >
              {s.title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed max-w-[220px]"
              style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
            >
              {s.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// Production visuals
// ============================================================================

const Production = () => (
  <section
    className="py-20 md:py-28"
    style={{ background: BRAND.bg }}
  >
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <SectionEyebrow>Наше производство</SectionEyebrow>
        <SectionH2>
          <span className="block mt-4">1 800 м² цеха, 12 рабочих постов, входной контроль стали</span>
        </SectionH2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 30px 60px -25px rgba(15,23,42,0.35)" }}
        >
          <img
            src="/images/verticals/metcoin-factory-welding.png"
            alt="Сварка металлоконструкций в цехе МеталлТех"
            className="w-full h-auto block"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.7) 100%)",
            }}
          />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div
              className="text-[11px] uppercase tracking-[0.2em] opacity-80 mb-1"
              style={{ fontFamily: FONT_HEAD }}
            >
              Сварочный пост №4
            </div>
            <div className="text-lg md:text-xl font-bold" style={{ fontFamily: FONT_HEAD }}>
              Ручная дуговая и полуавтоматическая сварка · сертифицированные сварщики НАКС
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 30px 60px -25px rgba(15,23,42,0.35)" }}
        >
          <img
            src="/images/verticals/metcoin-factory-rack.png"
            alt="Склад готовой продукции — стеллажи с закладными изделиями"
            className="w-full h-full object-cover block"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.7) 100%)",
            }}
          />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div
              className="text-[11px] uppercase tracking-[0.2em] opacity-80 mb-1"
              style={{ fontFamily: FONT_HEAD }}
            >
              Участок готовой продукции
            </div>
            <div className="text-lg md:text-xl font-bold" style={{ fontFamily: FONT_HEAD }}>
              Маркировка, паллетирование, отгрузка в тот же день
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ============================================================================
// Advantages
// ============================================================================

const Advantages = () => (
  <section className="py-20 md:py-28" style={{ background: BRAND.surface }}>
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <SectionEyebrow>Почему МеталлТех</SectionEyebrow>
        <SectionH2>
          <span className="block mt-4">6 причин выбрать нас — не про «качество», а про процесс</span>
        </SectionH2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {advantages.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="rounded-2xl p-7 transition-all hover:-translate-y-1"
            style={{
              background: BRAND.bg,
              border: `1px solid ${BRAND.border}`,
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: BRAND.primarySoft,
                color: BRAND.primary,
              }}
            >
              <a.icon className="w-6 h-6" strokeWidth={1.8} />
            </div>
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: FONT_HEAD, color: BRAND.text }}
            >
              {a.title}
            </h3>
            <p
              className="mt-2.5 text-sm leading-relaxed"
              style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
            >
              {a.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// Cases
// ============================================================================

const Cases = () => (
  <section id="cases" className="py-20 md:py-28" style={{ background: BRAND.bg }}>
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <SectionEyebrow>Выполненные проекты</SectionEyebrow>
        <SectionH2>
          <span className="block mt-4">
            От жилых комплексов Тюмени до магистральных трубопроводов Ямала
          </span>
        </SectionH2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {cases.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-2xl p-7 flex flex-col h-full"
            style={{
              background: BRAND.surface,
              border: `1px solid ${BRAND.border}`,
              boxShadow: "0 2px 8px -2px rgba(15,23,42,0.04)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: BRAND.accent, fontFamily: FONT_HEAD }}
              >
                Проект #{String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-xs"
                style={{ color: BRAND.textDim, fontFamily: FONT_BODY }}
              >
                · {c.period}
              </span>
            </div>
            <h3
              className="text-xl font-bold leading-tight"
              style={{ fontFamily: FONT_HEAD, color: BRAND.text }}
            >
              {c.title}
            </h3>
            <div
              className="mt-4 space-y-2 text-sm"
              style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
            >
              <div className="flex items-start gap-2">
                <Package className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BRAND.primary }} />
                <span>{c.scope}</span>
              </div>
              <div className="flex items-start gap-2">
                <Gauge className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BRAND.primary }} />
                <span>
                  Объём: <strong style={{ color: BRAND.text }}>{c.tons}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BRAND.primary }} />
                <span>{c.client}</span>
              </div>
            </div>
            <p
              className="mt-4 pt-4 text-sm leading-relaxed flex-1"
              style={{
                color: BRAND.textMuted,
                fontFamily: FONT_BODY,
                borderTop: `1px dashed ${BRAND.border}`,
              }}
            >
              {c.note}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// Calculator
// ============================================================================

const formatRub = (v: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(v)) + " ₽";

const embedTypes = [
  { id: "MN-1", label: "МН-1 (стеновая)", baseKg: 1.8, pricePerKg: 165 },
  { id: "MN-4", label: "МН-4 (колонная)", baseKg: 3.2, pricePerKg: 170 },
  { id: "MN-9", label: "МН-9 (фундаментная)", baseKg: 4.5, pricePerKg: 175 },
  { id: "custom", label: "Нестандарт по чертежу", baseKg: 2.8, pricePerKg: 195 },
];

const steelOptions = [
  { id: "st3", label: "Ст3сп (ГОСТ 380)", mult: 1 },
  { id: "09g2s", label: "09Г2С (ГОСТ 19281)", mult: 1.18 },
  { id: "aisi304", label: "Нержавейка AISI 304", mult: 3.4 },
];

const coatingOptions = [
  { id: "none", label: "Без покрытия", add: 0 },
  { id: "primer", label: "Грунт-эмаль", add: 28 },
  { id: "galv", label: "Горячее цинкование", add: 62 },
];

const Calculator = ({ onSubmit }: { onSubmit: (summary: string) => void }) => {
  const [type, setType] = useState(embedTypes[0].id);
  const [steel, setSteel] = useState(steelOptions[0].id);
  const [coating, setCoating] = useState(coatingOptions[0].id);
  const [qty, setQty] = useState(50);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { unit, total, mass, discount } = useMemo(() => {
    const t = embedTypes.find((x) => x.id === type)!;
    const s = steelOptions.find((x) => x.id === steel)!;
    const c = coatingOptions.find((x) => x.id === coating)!;
    const base = t.baseKg * t.pricePerKg * s.mult;
    const withCoating = base + c.add * t.baseKg;
    let disc = 0;
    if (qty >= 500) disc = 0.15;
    else if (qty >= 200) disc = 0.1;
    else if (qty >= 50) disc = 0.05;
    const u = withCoating * (1 - disc);
    return {
      unit: u,
      total: u * qty,
      mass: t.baseKg * qty,
      discount: disc,
    };
  }, [type, steel, coating, qty]);

  const handleCta = () => {
    setLoading(true);
    setTimeout(() => {
      const summary = `Тип: ${embedTypes.find((x) => x.id === type)?.label}, сталь: ${
        steelOptions.find((x) => x.id === steel)?.label
      }, покрытие: ${coatingOptions.find((x) => x.id === coating)?.label}, кол-во: ${qty} шт. Ориентир: ${formatRub(
        total,
      )}`;
      setLoading(false);
      setSent(true);
      onSubmit(summary);
    }, 900);
  };

  return (
    <section
      id="calc"
      className="py-20 md:py-28"
      style={{
        background: `linear-gradient(180deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em]"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#FEF3C7",
              fontFamily: FONT_HEAD,
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: BRAND.accentLight }}
            />
            Калькулятор
          </div>
          <h2
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: FONT_HEAD, letterSpacing: "-0.02em" }}
          >
            Ориентировочная цена — за 10 секунд
          </h2>
          <p
            className="mt-4 text-base md:text-lg"
            style={{ color: "rgba(224,231,255,0.8)", fontFamily: FONT_BODY }}
          >
            Выберите тип изделия, марку стали, покрытие и количество — посчитаем в
            реальном времени. Финальный расчёт — по вашему чертежу, в течение 1 рабочего
            дня.
          </p>
        </div>

        <div
          className="rounded-3xl overflow-hidden grid lg:grid-cols-[1.15fr_1fr]"
          style={{
            background: BRAND.surface,
            boxShadow: "0 40px 80px -30px rgba(0,0,0,0.45)",
          }}
        >
          {/* inputs */}
          <div className="p-7 md:p-10 space-y-7">
            <div>
              <label
                className="text-xs font-bold uppercase tracking-[0.15em] mb-3 block"
                style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
              >
                1. Тип изделия
              </label>
              <div className="grid grid-cols-2 gap-2">
                {embedTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all cursor-pointer"
                    style={{
                      background: type === t.id ? BRAND.primary : BRAND.bg,
                      color: type === t.id ? "#fff" : BRAND.text,
                      border:
                        type === t.id
                          ? `1px solid ${BRAND.primary}`
                          : `1px solid ${BRAND.border}`,
                      fontFamily: FONT_HEAD,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="text-xs font-bold uppercase tracking-[0.15em] mb-3 block"
                style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
              >
                2. Марка стали
              </label>
              <div className="flex flex-wrap gap-2">
                {steelOptions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSteel(s.id)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                    style={{
                      background: steel === s.id ? BRAND.primary : BRAND.bg,
                      color: steel === s.id ? "#fff" : BRAND.text,
                      border:
                        steel === s.id
                          ? `1px solid ${BRAND.primary}`
                          : `1px solid ${BRAND.border}`,
                      fontFamily: FONT_HEAD,
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="text-xs font-bold uppercase tracking-[0.15em] mb-3 block"
                style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
              >
                3. Антикор
              </label>
              <div className="flex flex-wrap gap-2">
                {coatingOptions.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCoating(c.id)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                    style={{
                      background: coating === c.id ? BRAND.primary : BRAND.bg,
                      color: coating === c.id ? "#fff" : BRAND.text,
                      border:
                        coating === c.id
                          ? `1px solid ${BRAND.primary}`
                          : `1px solid ${BRAND.border}`,
                      fontFamily: FONT_HEAD,
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  className="text-xs font-bold uppercase tracking-[0.15em]"
                  style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
                >
                  4. Количество
                </label>
                <span
                  className="text-sm font-bold"
                  style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
                >
                  {qty} шт
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={1000}
                step={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full accent-current cursor-pointer"
                style={{ accentColor: BRAND.primary }}
              />
              <div
                className="flex justify-between mt-2 text-[11px]"
                style={{ color: BRAND.textDim, fontFamily: FONT_BODY }}
              >
                <span>1</span>
                <span>50 — от 5%</span>
                <span>200 — от 10%</span>
                <span>500+ — 15%</span>
              </div>
            </div>
          </div>

          {/* result */}
          <div
            className="p-7 md:p-10 flex flex-col"
            style={{
              background: `linear-gradient(180deg, ${BRAND.bg} 0%, ${BRAND.primarySoft} 100%)`,
            }}
          >
            <div>
              <div
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
              >
                Ориентировочная стоимость
              </div>
              <div
                className="mt-3 text-4xl md:text-5xl font-extrabold leading-none"
                style={{ color: BRAND.text, fontFamily: FONT_HEAD, letterSpacing: "-0.02em" }}
              >
                {formatRub(total)}
              </div>
              <div
                className="mt-2 text-sm"
                style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
              >
                Без НДС, с учётом скидки
              </div>
              {discount > 0 && (
                <div
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: BRAND.accentSoft,
                    color: BRAND.accent,
                    fontFamily: FONT_HEAD,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Опт-скидка {Math.round(discount * 100)}%
                </div>
              )}
            </div>

            <div
              className="mt-6 grid grid-cols-2 gap-3"
              style={{ fontFamily: FONT_BODY }}
            >
              <div
                className="rounded-xl p-4"
                style={{ background: BRAND.surface, border: `1px solid ${BRAND.border}` }}
              >
                <div
                  className="text-[11px] uppercase tracking-[0.15em]"
                  style={{ color: BRAND.textDim, fontFamily: FONT_HEAD }}
                >
                  За штуку
                </div>
                <div
                  className="mt-1 text-lg font-bold"
                  style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
                >
                  {formatRub(unit)}
                </div>
              </div>
              <div
                className="rounded-xl p-4"
                style={{ background: BRAND.surface, border: `1px solid ${BRAND.border}` }}
              >
                <div
                  className="text-[11px] uppercase tracking-[0.15em]"
                  style={{ color: BRAND.textDim, fontFamily: FONT_HEAD }}
                >
                  Масса партии
                </div>
                <div
                  className="mt-1 text-lg font-bold"
                  style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
                >
                  {mass.toFixed(1)} кг
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={loading || sent}
              onClick={handleCta}
              className="mt-7 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              style={{
                background: sent
                  ? `linear-gradient(135deg, #059669 0%, #10B981 100%)`
                  : `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.accentLight} 100%)`,
                fontFamily: FONT_HEAD,
                boxShadow: "0 12px 28px -10px rgba(180, 83, 9, 0.55)",
              }}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {sent && <CheckCircle2 className="w-5 h-5" />}
              {!loading && !sent && <ArrowRight className="w-5 h-5" />}
              {sent
                ? "Запрос отправлен — перезвоним в течение часа"
                : loading
                  ? "Отправляем..."
                  : "Отправить на точный расчёт"}
            </button>

            <p
              className="mt-4 text-xs leading-relaxed"
              style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
            >
              Расчёт — ориентир по типовым позициям. Точная цена зависит от чертежа,
              актуального курса металла на бирже и логистики. Финальный расчёт —
              бесплатно, в течение 1 рабочего дня.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// Reviews
// ============================================================================

const Reviews = () => (
  <section id="reviews" className="py-20 md:py-28" style={{ background: BRAND.surface }}>
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mb-14">
        <SectionEyebrow>Отзывы заказчиков</SectionEyebrow>
        <SectionH2>
          <span className="block mt-4">Что говорят те, кто работает с нами не первый год</span>
        </SectionH2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.article
            key={r.company}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-2xl p-7 flex flex-col"
            style={{
              background: BRAND.bg,
              border: `1px solid ${BRAND.border}`,
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-black mb-5"
              style={{
                background: BRAND.primary,
                color: "#fff",
                fontFamily: FONT_HEAD,
              }}
            >
              "
            </div>
            <p
              className="text-[15px] leading-relaxed flex-1"
              style={{ color: BRAND.text, fontFamily: FONT_BODY }}
            >
              {r.text}
            </p>
            <div
              className="mt-6 pt-5"
              style={{ borderTop: `1px solid ${BRAND.border}` }}
            >
              <div
                className="text-sm font-bold"
                style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
              >
                {r.company}
              </div>
              <div
                className="mt-0.5 text-xs"
                style={{ color: BRAND.textDim, fontFamily: FONT_BODY }}
              >
                {r.person}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// Certificates — without image, but solid section
// ============================================================================

const Certificates = () => {
  const items = [
    { title: "ISO 9001:2015", subtitle: "Система менеджмента качества" },
    { title: "СРО-С-260-27122010", subtitle: "Свидетельство саморегулируемой организации" },
    { title: "ГОСТ 23118-2019", subtitle: "Соответствие стальных конструкций" },
    { title: "ГОСТ 24846-2019", subtitle: "Геодезические наблюдения" },
    { title: "НАКС-I-СТ", subtitle: "Аттестация сварщиков" },
    { title: "Паспорт качества", subtitle: "На каждую партию продукции" },
  ];

  return (
    <section className="py-20 md:py-28" style={{ background: BRAND.bg }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <SectionEyebrow>Сертификаты и допуски</SectionEyebrow>
          <SectionH2>
            <span className="block mt-4">Подтверждаем качество — документами, а не словами</span>
          </SectionH2>
          <p
            className="mt-5 text-base"
            style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
          >
            На запрос пришлём сканы актуальных сертификатов, паспортов качества, СРО и
            декларации соответствия. По желанию — оригиналы курьером или через ЭДО.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="rounded-xl p-5 flex items-center gap-4"
              style={{
                background: BRAND.surface,
                border: `1px solid ${BRAND.border}`,
              }}
            >
              <div
                className="w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
                }}
              >
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div
                  className="font-bold"
                  style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
                >
                  {it.title}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: BRAND.textDim, fontFamily: FONT_BODY }}
                >
                  {it.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FAQ
// ============================================================================

const Faq = () => {
  useFaqSchema(faqItems);
  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: BRAND.surface }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <SectionH2>
            <span className="block mt-4">Частые вопросы</span>
          </SectionH2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((q, i) => (
            <AccordionItem
              key={q.question}
              value={`item-${i}`}
              className="rounded-2xl px-6 border-0"
              style={{
                background: BRAND.bg,
                border: `1px solid ${BRAND.border}`,
              }}
            >
              <AccordionTrigger
                className="text-left font-bold hover:no-underline cursor-pointer"
                style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
              >
                {q.question}
              </AccordionTrigger>
              <AccordionContent
                className="text-[15px] leading-relaxed pb-5"
                style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
              >
                {q.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

// ============================================================================
// Contact
// ============================================================================

const Contact = ({ presetComment }: { presetComment?: string }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    comment: presetComment || "",
  });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (presetComment) {
      setForm((f) => ({ ...f, comment: presetComment }));
    }
  }, [presetComment]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/1@centrlp.ru", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          page_path: "/metcoin",
          lead_source: "metcoin preview (centrlp.ru/metcoin)",
          _subject: "Заявка: МеталлТех — металлоконструкции",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("fail");
      setState("sent");
      setForm({ name: "", phone: "", email: "", comment: "" });
    } catch {
      setState("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{
        background: `linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em]"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#FEF3C7",
              fontFamily: FONT_HEAD,
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: BRAND.accentLight }}
            />
            Контакты
          </div>
          <h2
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: FONT_HEAD, letterSpacing: "-0.02em" }}
          >
            Оставьте заявку —
            <br />
            перезвоним в течение часа
          </h2>
          <p
            className="mt-5 text-base md:text-lg max-w-xl"
            style={{ color: "rgba(224,231,255,0.82)", fontFamily: FONT_BODY }}
          >
            Чертежи, ТЗ или просто описание задачи — пришлите как удобно. Конструктор
            переведёт в рабочий проект, расчёт выйдет в течение 1 рабочего дня.
          </p>

          <div className="mt-10 space-y-5" style={{ fontFamily: FONT_BODY }}>
            <a
              href="tel:+73452397004"
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div
                  className="text-[11px] uppercase tracking-[0.2em] text-white/60"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  Отдел продаж
                </div>
                <div
                  className="text-lg md:text-xl font-bold text-white"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  +7 (3452) 39-70-04
                </div>
              </div>
            </a>

            <a
              href="mailto:metallteh72@yandex.ru"
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <FileCheck2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div
                  className="text-[11px] uppercase tracking-[0.2em] text-white/60"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  E-mail
                </div>
                <div
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  metallteh72@yandex.ru
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div
                  className="text-[11px] uppercase tracking-[0.2em] text-white/60"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  Адрес производства
                </div>
                <div
                  className="text-base font-semibold text-white leading-snug"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  625019, г. Тюмень,
                  <br />
                  ул. Новаторов, 12, корп. 3
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div
                  className="text-[11px] uppercase tracking-[0.2em] text-white/60"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  График работы
                </div>
                <div
                  className="text-base font-semibold text-white"
                  style={{ fontFamily: FONT_HEAD }}
                >
                  Пн–Пт 08:00–18:00 · Сб по согласованию
                </div>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl p-7 md:p-9 space-y-4"
          style={{
            background: BRAND.surface,
            boxShadow: "0 40px 80px -30px rgba(0,0,0,0.45)",
          }}
        >
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-[0.15em] mb-2"
              style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
            >
              Как вас зовут
            </label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Имя или название компании"
              className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all"
              style={{
                background: BRAND.bg,
                border: `1.5px solid ${BRAND.border}`,
                color: BRAND.text,
                fontFamily: FONT_BODY,
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-[0.15em] mb-2"
                style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
              >
                Телефон *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+7 ___ ___ __ __"
                className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all"
                style={{
                  background: BRAND.bg,
                  border: `1.5px solid ${BRAND.border}`,
                  color: BRAND.text,
                  fontFamily: FONT_BODY,
                }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-[0.15em] mb-2"
                style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
              >
                E-mail
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.ru"
                className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all"
                style={{
                  background: BRAND.bg,
                  border: `1.5px solid ${BRAND.border}`,
                  color: BRAND.text,
                  fontFamily: FONT_BODY,
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-bold uppercase tracking-[0.15em] mb-2"
              style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
            >
              Задача или чертёж
            </label>
            <textarea
              rows={4}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              placeholder="Опишите задачу или приложите ссылку на чертёж. Если уже считали в калькуляторе — оставьте как есть."
              className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all resize-none"
              style={{
                background: BRAND.bg,
                border: `1.5px solid ${BRAND.border}`,
                color: BRAND.text,
                fontFamily: FONT_BODY,
              }}
            />
          </div>

          <button
            type="submit"
            disabled={state === "sending" || state === "sent"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background:
                state === "sent"
                  ? `linear-gradient(135deg, #059669 0%, #10B981 100%)`
                  : `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.accentLight} 100%)`,
              fontFamily: FONT_HEAD,
              boxShadow: "0 12px 28px -10px rgba(180, 83, 9, 0.55)",
            }}
          >
            {state === "sending" && <Loader2 className="w-5 h-5 animate-spin" />}
            {state === "sent" && <CheckCircle2 className="w-5 h-5" />}
            {state !== "sending" && state !== "sent" && <ArrowRight className="w-5 h-5" />}
            {state === "sent"
              ? "Отправлено — перезвоним в течение часа"
              : state === "sending"
                ? "Отправляем..."
                : "Отправить заявку"}
          </button>

          {state === "error" && (
            <p
              className="text-sm"
              style={{ color: BRAND.accent, fontFamily: FONT_BODY }}
            >
              Не удалось отправить форму. Позвоните нам напрямую: +7 (3452) 39-70-04
            </p>
          )}

          <p
            className="text-xs leading-relaxed"
            style={{ color: BRAND.textDim, fontFamily: FONT_BODY }}
          >
            Отправляя форму, вы соглашаетесь с обработкой персональных данных в
            соответствии с 152-ФЗ. Никакого спама — только ответ по вашей заявке.
          </p>
        </form>
      </div>
    </section>
  );
};

// ============================================================================
// Footer
// ============================================================================

const MetcoinFooter = () => (
  <footer
    className="py-12 md:py-14"
    style={{ background: BRAND.primaryDark, color: "#CBD5E1" }}
  >
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr] pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl font-black text-white text-lg"
              style={{
                background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryMid} 100%)`,
                fontFamily: FONT_HEAD,
              }}
            >
              МТ
            </div>
            <div>
              <div
                className="font-extrabold text-white"
                style={{ fontFamily: FONT_HEAD }}
              >
                МЕТАЛЛТЕХ
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.15em] text-white/50"
                style={{ fontFamily: FONT_HEAD }}
              >
                производство · Тюмень · с 2013
              </div>
            </div>
          </div>
          <p
            className="text-sm leading-relaxed max-w-md"
            style={{ fontFamily: FONT_BODY, color: "rgba(203,213,225,0.75)" }}
          >
            Собственный цех в Тюмени. Производим закладные, реперы, опоры,
            контейнеры и нестандартные металлоконструкции по чертежам заказчика.
            Работаем с подрядчиками крупнейших нефтегазовых и строительных компаний.
          </p>
        </div>

        <div>
          <div
            className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4"
            style={{ fontFamily: FONT_HEAD }}
          >
            Навигация
          </div>
          <ul className="space-y-2.5 text-sm" style={{ fontFamily: FONT_BODY }}>
            <li><a href="#products" className="hover:text-white transition-colors">Продукция</a></li>
            <li><a href="#how" className="hover:text-white transition-colors">Как работаем</a></li>
            <li><a href="#cases" className="hover:text-white transition-colors">Проекты</a></li>
            <li><a href="#calc" className="hover:text-white transition-colors">Калькулятор</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#contact" className="hover:text-white transition-colors">Контакты</a></li>
          </ul>
        </div>

        <div>
          <div
            className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4"
            style={{ fontFamily: FONT_HEAD }}
          >
            Связаться
          </div>
          <ul className="space-y-2.5 text-sm" style={{ fontFamily: FONT_BODY }}>
            <li>
              <a href="tel:+73452397004" className="hover:text-white font-semibold transition-colors">
                +7 (3452) 39-70-04
              </a>
            </li>
            <li>
              <a href="mailto:metallteh72@yandex.ru" className="hover:text-white transition-colors">
                metallteh72@yandex.ru
              </a>
            </li>
            <li style={{ color: "rgba(203,213,225,0.6)" }}>
              625019, г. Тюмень,
              <br />
              ул. Новаторов, 12, корп. 3
            </li>
            <li style={{ color: "rgba(203,213,225,0.6)" }}>
              Пн–Пт 08:00–18:00
            </li>
          </ul>
        </div>
      </div>

      <div
        className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
        style={{ color: "rgba(203,213,225,0.5)", fontFamily: FONT_BODY }}
      >
        <div>© 2013–2026 ООО «Компания МеталлТех». Все права защищены.</div>
        <div className="flex flex-wrap gap-4">
          <a href="/privacy" className="hover:text-white transition-colors">
            Политика конфиденциальности
          </a>
          <a href="/cookies" className="hover:text-white transition-colors">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================================================
// Root page
// ============================================================================

const Metcoin = () => {
  const [prefilledComment, setPrefilledComment] = useState("");

  // SEO head — полностью самостоятельная (не Layout)
  useEffect(() => {
    const title =
      "Металлоконструкции в Тюмени — производство закладных, реперов, опор | МеталлТех";
    const description =
      "Производство металлоконструкций в Тюмени: закладные изделия, деформационные и нивелирные реперы, опоры под трубопровод, контейнеры ТБО. Собственный цех, ГОСТ, доставка по РФ и СНГ. Расчёт по чертежам за 1 день.";
    const canonical = "https://centrlp.ru/metcoin";
    const ogImage = "https://centrlp.ru/og/metcoin.png";

    document.title = title;

    const upsertMeta = (selector: string, attr: "name" | "property", attrVal: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    upsertMeta('meta[name="description"]', "name", "description", description);
    // preview-режим: не индексируем, не переходим по ссылкам
    upsertMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");

    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", canonical);

    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonical);
    upsertMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt", "МеталлТех — производство металлоконструкций в Тюмени");
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);

    // LocalBusiness + Organization + Product JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://centrlp.ru/metcoin#org",
          name: "МеталлТех",
          legalName: "ООО «Компания МеталлТех»",
          url: "https://centrlp.ru/metcoin",
          logo: ogImage,
          description,
          foundingDate: "2013-01-01",
          address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Новаторов, 12, корп. 3",
            addressLocality: "Тюмень",
            postalCode: "625019",
            addressCountry: "RU",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+7-3452-39-70-04",
            contactType: "sales",
            email: "metallteh72@yandex.ru",
            availableLanguage: "ru",
          },
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://centrlp.ru/metcoin#biz",
          name: "МеталлТех — производство металлоконструкций",
          url: "https://centrlp.ru/metcoin",
          telephone: "+7-3452-39-70-04",
          email: "metallteh72@yandex.ru",
          priceRange: "₽₽₽",
          image: ogImage,
          address: {
            "@type": "PostalAddress",
            streetAddress: "ул. Новаторов, 12, корп. 3",
            addressLocality: "Тюмень",
            postalCode: "625019",
            addressCountry: "RU",
          },
          areaServed: [
            { "@type": "Country", name: "Россия" },
            { "@type": "Country", name: "Казахстан" },
            { "@type": "Country", name: "Беларусь" },
          ],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "08:00",
              closes: "18:00",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "67",
          },
        },
      ],
    };

    let ld = document.getElementById("metcoin-org-jsonld") as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.id = "metcoin-org-jsonld";
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(jsonLd);

    return () => {
      // при уходе со страницы возвращаем обычный robots, чтобы не загадить другие страницы centrlp
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.setAttribute("content", "index, follow");
      document.getElementById("metcoin-org-jsonld")?.remove();
    };
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        background: BRAND.bg,
        color: BRAND.text,
        fontFamily: FONT_BODY,
      }}
    >
      <MetcoinHeader onCtaClick={scrollToContact} />
      <Hero onCtaClick={scrollToContact} />
      <TrustBar />
      <Products />
      <HowWeWork />
      <Production />
      <Advantages />
      <Cases />
      <Certificates />
      <Calculator onSubmit={setPrefilledComment} />
      <Reviews />
      <Faq />
      <Contact presetComment={prefilledComment} />
      <MetcoinFooter />
    </div>
  );
};

export default Metcoin;
