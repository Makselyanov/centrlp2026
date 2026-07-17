import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Calculator,
  Camera,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clipboard,
  Gauge,
  Globe2,
  Megaphone,
  MessageCircle,
  MonitorCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { servicePriceByHref } from "@/data/pricing";

type RepairGroup = "Безопасность" | "Техника" | "Салон" | "Рестомод";

type RepairJob = {
  id: string;
  group: RepairGroup;
  title: string;
  price: number;
  priceLabel: string;
  note: string;
  confidence: "Публичный прайс" | "Предварительная оценка" | "Товар и работа";
};

type DigitalService = {
  id: string;
  title: string;
  href: string;
  price: number;
  priceLabel: string;
  benefit: string;
  icon: typeof Globe2;
};

const money = new Intl.NumberFormat("ru-RU");

const repairJobs: RepairJob[] = [
  {
    id: "brakes",
    group: "Безопасность",
    title: "Тормоза, ручник и ревизия суппортов",
    price: 18_000,
    priceLabel: "около 18 000 ₽ за работу",
    note: "Диски, колодки, тросы и другие детали считаются отдельно после осмотра.",
    confidence: "Предварительная оценка",
  },
  {
    id: "steering",
    group: "Безопасность",
    title: "Диагностика и устранение люфта руля",
    price: 10_000,
    priceLabel: "около 10 000 ₽ за работу",
    note: "Сначала локализовать люфт. Рулевой редуктор и детали в сумму не включены.",
    confidence: "Предварительная оценка",
  },
  {
    id: "tires",
    group: "Безопасность",
    title: "Одинаковый комплект шин 265/70 R15",
    price: 55_000,
    priceLabel: "ориентир 55 000 ₽",
    note: "Сейчас на автомобиле зафиксированы разные размеры. Цена зависит от бренда и состояния шин.",
    confidence: "Товар и работа",
  },
  {
    id: "sunroof",
    group: "Техника",
    title: "Диагностика и ремонт штатного люка",
    price: 15_000,
    priceLabel: "предварительно 15 000 ₽",
    note: "Точная цена только после дефектовки привода, тросов, направляющих и электрики.",
    confidence: "Предварительная оценка",
  },
  {
    id: "ac",
    group: "Техника",
    title: "Диагностика и восстановление кондиционера",
    price: 25_000,
    priceLabel: "предварительно 25 000 ₽",
    note: "Система установлена. Нужно проверить герметичность, компрессор, муфту, трубки и тип хладагента.",
    confidence: "Предварительная оценка",
  },
  {
    id: "selector",
    group: "Техника",
    title: "Селектор АКПП: положение D включается не всегда",
    price: 5_000,
    priceLabel: "предварительно 5 000 ₽",
    note: "Начать с троса, втулок, регулировки и датчика положения. Это не смета на ремонт АКПП.",
    confidence: "Предварительная оценка",
  },
  {
    id: "electrics",
    group: "Техника",
    title: "Поворотники и ревизия старой проводки",
    price: 6_000,
    priceLabel: "предварительно 6 000 ₽",
    note: "Поворотники не всегда отключаются. Под рулём также есть следы старой сигнализации.",
    confidence: "Предварительная оценка",
  },
  {
    id: "exhaust",
    group: "Техника",
    title: "Восстановление задней части выхлопа",
    price: 6_000,
    priceLabel: "ориентир 6 000 ₽",
    note: "Сгнившая конечная труба уже снята. Нужно проверить фланец следующей секции.",
    confidence: "Публичный прайс",
  },
  {
    id: "fuel-door",
    group: "Техника",
    title: "Замок лючка бензобака",
    price: 4_500,
    priceLabel: "предварительно 4 500 ₽",
    note: "Ключ зажигания не открывает личинку. Нужны очистка, ремонт или подбор замка.",
    confidence: "Предварительная оценка",
  },
  {
    id: "heater",
    group: "Техника",
    title: "Очистка печки и воздуховодов",
    price: 5_000,
    priceLabel: "предварительно 5 000 ₽",
    note: "При включении печки из воздуховодов пошла пыль. Нужна разборка и очистка контура.",
    confidence: "Предварительная оценка",
  },
  {
    id: "door-card",
    group: "Салон",
    title: "Ремонт трещины на левой дверной карте",
    price: 4_500,
    priceLabel: "ориентир 4 500 ₽",
    note: "Это дефект пластика и покрытия в салоне. Нужен аккуратный ремонт или перетяжка элемента.",
    confidence: "Публичный прайс",
  },
  {
    id: "dashboard",
    group: "Салон",
    title: "Ровная подсветка приборов и кнопок",
    price: 6_000,
    priceLabel: "предварительно 6 000 ₽",
    note: "Сохранить точность стрелок, выровнять подсветку шкал и органов управления.",
    confidence: "Предварительная оценка",
  },
  {
    id: "detailing",
    group: "Салон",
    title: "Полная химчистка салона внедорожника",
    price: 15_000,
    priceLabel: "ориентир 15 000 ₽",
    note: "Глубокая очистка сидений, пластика, ковролина, потолка и трудных зон.",
    confidence: "Публичный прайс",
  },
  {
    id: "multimedia",
    group: "Рестомод",
    title: "Teyes, две камеры и шесть динамиков",
    price: 27_000,
    priceLabel: "около 27 000 ₽ за монтаж",
    note: "Оборудование и нестандартная доработка старой проводки считаются отдельно.",
    confidence: "Предварительная оценка",
  },
  {
    id: "alarm",
    group: "Рестомод",
    title: "Сигнализация с автозапуском",
    price: 22_000,
    priceLabel: "ориентир 22 000 ₽",
    note: "Комплект и монтаж. Сначала удалить или безопасно отключить старую систему.",
    confidence: "Публичный прайс",
  },
  {
    id: "tint",
    group: "Рестомод",
    title: "Новая тонировка",
    price: 9_500,
    priceLabel: "ориентир 9 500 ₽",
    note: "Стоимость зависит от плёнки, количества стёкол и демонтажа старого слоя.",
    confidence: "Публичный прайс",
  },
  {
    id: "polish",
    group: "Рестомод",
    title: "Восстановительная полировка кузова",
    price: 30_000,
    priceLabel: "ориентир 30 000 ₽",
    note: "Финальная стоимость после осмотра ЛКП и теста толщины покрытия.",
    confidence: "Публичный прайс",
  },
];

const digitalServices: DigitalService[] = [
  {
    id: "audit",
    title: "Разбор сайта и пути заявки",
    href: "/proverka-saita-i-zayavok-za-48-chasov",
    price: 15_000,
    priceLabel: servicePriceByHref["/proverka-saita-i-zayavok-za-48-chasov"]?.price || "от 15 000 ₽",
    benefit: "Покажет, где сервис теряет обращения и какие правки быстрее всего превращаются в записи.",
    icon: MonitorCheck,
  },
  {
    id: "vk",
    title: "Упаковка ВКонтакте",
    href: "/services/vk-design",
    price: 15_000,
    priceLabel: servicePriceByHref["/services/vk-design"]?.price || "от 15 000 ₽",
    benefit: "Соберёт услуги, цены, доказательства и быстрый вход в диалог в одном понятном профиле.",
    icon: MessageCircle,
  },
  {
    id: "analytics",
    title: "Веб-аналитика",
    href: "/services/web-analytics",
    price: 15_000,
    priceLabel: servicePriceByHref["/services/web-analytics"]?.price || "от 15 000 ₽",
    benefit: "Покажет источник каждой заявки и отделит работающий трафик от красивых, но пустых цифр.",
    icon: Gauge,
  },
  {
    id: "answers",
    title: "Автоответы и запись 24/7",
    href: "/services/auto-responses",
    price: 15_000,
    priceLabel: servicePriceByHref["/services/auto-responses"]?.price || "от 15 000 ₽",
    benefit: "Соберёт марку, проблему, фото и контакт до разговора с мастером, чтобы не терять тёплых клиентов.",
    icon: MessageCircle,
  },
  {
    id: "direct",
    title: "Настройка Яндекс Директа",
    href: "/nastroyka-yandex-direct-tyumen",
    price: 20_000,
    priceLabel: servicePriceByHref["/nastroyka-yandex-direct-tyumen"]?.price || "от 20 000 ₽",
    benefit: "Быстро проверит спрос на одну дорогую услугу и приведёт людей на подготовленную посадочную страницу.",
    icon: Megaphone,
  },
  {
    id: "scripts",
    title: "Скрипты продаж и FAQ",
    href: "/services/operator-scripts",
    price: 20_000,
    priceLabel: servicePriceByHref["/services/operator-scripts"]?.price || "от 20 000 ₽",
    benefit: "Поможет отвечать по цене, срокам и гарантии одинаково уверенно, без долгой импровизации в каждом чате.",
    icon: Clipboard,
  },
  {
    id: "offer",
    title: "Упаковка оффера",
    href: "/services/offer-packaging",
    price: 25_000,
    priceLabel: servicePriceByHref["/services/offer-packaging"]?.price || "от 25 000 ₽",
    benefit: "Объяснит, за что клиент платит, почему услуга стоит своих денег и чем ваш подход отличается от соседнего сервиса.",
    icon: Sparkles,
  },
  {
    id: "site",
    title: "Сайт под ключ",
    href: "/services/website-development",
    price: 45_000,
    priceLabel: servicePriceByHref["/services/website-development"]?.price || "от 45 000 ₽",
    benefit: "Превратит перечень работ в убедительную витрину с фото, этапами, сметой и заявкой с нужными данными.",
    icon: Globe2,
  },
];

const problemStories = [
  {
    title: "Неработающий штатный люк",
    text: "Нужна дефектовка привода, направляющих и электрики. Физически люк и блок управления на месте.",
    image: "/images/barter/pajero/sunroof.webp",
    alt: "Штатный люк Mitsubishi Pajero из салона",
    price: "10 000-30 000 ₽ после дефектовки",
  },
  {
    title: "Трещина на левой дверной карте",
    text: "Глубокая трещина и разрыв покрытия на подлокотнике. Нужен ремонт пластика или локальная перетяжка.",
    image: "/images/barter/pajero/door-card-crack.webp",
    alt: "Трещина на пластике водительской дверной карты Pajero",
    price: "2 000-6 500 ₽",
  },
  {
    title: "Кондиционер установлен, состояние неизвестно",
    text: "На панели есть штатное управление. До сметы нужны проверка герметичности, компрессора, муфты, трубок и хладагента.",
    image: "/images/barter/pajero/ac-controls.webp",
    alt: "Штатное управление кондиционером Mitsubishi Pajero",
    price: "диагностика 500-1 500 ₽, ремонт по результату",
  },
  {
    title: "Подсветка приборов и кнопок",
    text: "Задача не в декоративной ленте. Нужны ровный свет, аккуратная шкала и сохранение точности стрелок.",
    image: "/images/barter/pajero/dashboard.webp",
    alt: "Приборная панель Mitsubishi Pajero перед пересветом",
    price: "3 000-8 000 ₽",
  },
  {
    title: "Замок лючка бензобака",
    text: "Ключ зажигания не открывает личинку. Возможны закисание, замена замка или подбор совместимой детали.",
    image: "/images/barter/pajero/fuel-door.webp",
    alt: "Открытый лючок бензобака Pajero и снятая пластиковая деталь",
    price: "предварительно 3 000-8 000 ₽",
  },
];

const priceSources = [
  ["Антикор ЛАБ Тюмень", "https://tjumen.antikorlab.ru/"],
  ["Антикор 72", "https://antikor72.ru/"],
  ["АвтоКлимат", "https://carclimate.ru/news/%D1%86%D0%B5%D0%BD%D1%8B-%D0%BD%D0%B0-%D0%B7%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D1%83-%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82-%D0%BE%D0%B1%D1%81%D0%BB%D1%83%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5/"],
  ["А-Бренд", "https://autoservice72.ru/"],
  ["REAKTOR", "https://tyumen.reaktor24.ru/service/repair/repair_electrics/"],
  ["Перетяжка72", "https://peretyazhka72.ru/ceny/"],
  ["Royal Detailing", "https://royaldetailing72.ru/"],
  ["Teyes Тюмень", "https://install.teyes72.ru/"],
] as const;

function buildEquivalentServices(target: number) {
  if (target <= 0) return [];

  let best: DigitalService[] = [];
  let bestTotal = Number.POSITIVE_INFINITY;

  for (let mask = 1; mask < 1 << digitalServices.length; mask += 1) {
    const candidate = digitalServices.filter((_, index) => (mask & (1 << index)) !== 0);
    const total = candidate.reduce((sum, item) => sum + item.price, 0);

    if (total >= target && total < bestTotal) {
      best = candidate;
      bestTotal = total;
    }
  }

  return best.length > 0 ? best : digitalServices;
}

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement(selector.startsWith("link") ? "link" : "meta");
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
  return element;
}

const BarterSTO = () => {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "error">("idle");

  useEffect(() => {
    const title = "Pajero 1991: ремонт в обмен на сайт и заявки | CentrLP";
    const description =
      "Частное предложение для СТО и детейлинга: реальные задачи Mitsubishi Pajero, фото, рыночные ориентиры и калькулятор равноценного обмена на услуги CentrLP.";
    const canonical = "https://barter.centrlp.ru/";
    const preview = "https://barter.centrlp.ru/images/barter/pajero/pajero-side.webp";

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    const canonicalElement = setMeta('link[rel="canonical"]', "href", canonical);
    canonicalElement.setAttribute("rel", "canonical");
    const robots = setMeta('meta[name="robots"]', "content", "noindex, nofollow, noarchive, nosnippet");
    robots.setAttribute("name", "robots");

    const socialMeta = [
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["property", "og:url", canonical],
      ["property", "og:image", preview],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
      ["name", "twitter:image", preview],
      ["name", "twitter:url", canonical],
    ] as const;

    socialMeta.forEach(([kind, key, content]) => {
      const element = setMeta(`meta[${kind}="${key}"]`, "content", content);
      element.setAttribute(kind, key);
    });
  }, []);

  const selectedRepairJobs = useMemo(
    () => repairJobs.filter((job) => selectedJobs.includes(job.id)),
    [selectedJobs],
  );

  const repairTotal = useMemo(
    () => selectedRepairJobs.reduce((sum, job) => sum + job.price, 0),
    [selectedRepairJobs],
  );

  const recommendedServices = useMemo(() => buildEquivalentServices(repairTotal), [repairTotal]);
  const serviceTotal = recommendedServices.reduce((sum, service) => sum + service.price, 0);
  const uncovered = Math.max(0, repairTotal - serviceTotal);

  const toggleJob = (id: string) => {
    setSelectedJobs((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setCopyState("idle");
  };

  const copySelection = async () => {
    if (selectedRepairJobs.length === 0) return;

    setCopyState("copying");
    const summary = [
      "Предварительный вариант взаимозачёта по Pajero 1991",
      "",
      "Автомобильные работы:",
      ...selectedRepairJobs.map((job) => `- ${job.title}: ${job.priceLabel}`),
      `Итого по ориентиру: ${money.format(repairTotal)} ₽`,
      "",
      "Эквивалент CentrLP:",
      ...recommendedServices.map((service) => `- ${service.title}: ${service.priceLabel}`),
      `Итого по прайсу CentrLP: ${money.format(serviceTotal)} ₽`,
      "",
      "Точная смета, материалы, сроки и критерии приёмки фиксируются после осмотра.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0d1011] text-[#f2f2ed] selection:bg-[#f3a712] selection:text-[#111315]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0d1011]/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <a href="https://centrlp.ru/" className="flex items-center gap-3" aria-label="CentrLP, основной сайт">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f3a712]/50 text-sm font-black text-[#f3a712]">
              CL
            </span>
            <span>
              <strong className="block text-sm tracking-[-0.02em]">CentrLP</strong>
              <span className="hidden text-xs text-[#aeb5b7] sm:block">частное предложение по Pajero</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="tel:+79058248564"
              className="hidden min-h-10 items-center gap-2 px-3 text-sm font-semibold text-[#d9dddd] transition-colors hover:text-white sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              8-905-824-85-64
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOIJUiQnWdiLFouZRo0yILV-MOKhbvF8RIwhar0TNMO6tUYnxTI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#f3a712] px-4 text-sm font-black text-[#111315] transition-transform active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              Написать в MAX
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[1400px] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-14">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-5 max-w-max rounded-full border border-[#f3a712]/35 bg-[#f3a712]/10 px-4 py-2 text-sm font-semibold text-[#ffd36d]">
                Mitsubishi Pajero II, 1991, 3.0 V6
              </p>
              <h1 className="max-w-[12ch] text-balance text-[clamp(2.8rem,6.4vw,5.8rem)] font-black leading-[0.95] tracking-[-0.04em] text-white">
                Ремонт в обмен на рост автосервиса
              </h1>
              <p className="mt-6 max-w-[58ch] text-pretty text-lg leading-8 text-[#c9ced0]">
                Вы закрываете реальные задачи по автомобилю. CentrLP взамен строит сайт и канал заявок под вашу дорогую услугу.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#calculator"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f3a712] px-6 font-black text-[#111315] transition-transform active:scale-[0.98]"
                >
                  Собрать обмен
                  <Calculator className="h-5 w-5" />
                </a>
                <a
                  href="#problems"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6 font-bold text-white transition-colors hover:border-white/50"
                >
                  Смотреть задачи
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-6 text-[#929a9d]">
                Не абстрактная просьба о скидке. На странице есть фото, симптомы, рыночные ориентиры и прозрачный эквивалент услуг CentrLP.
              </p>
            </div>

            <figure className="relative lg:justify-self-end">
              <div className="absolute -inset-8 -z-10 bg-[#f3a712]/10 blur-3xl" aria-hidden="true" />
              <img
                src="/images/barter/pajero/pajero-side.webp"
                alt="Серебристый Mitsubishi Pajero второго поколения, вид сбоку"
                width={1280}
                height={960}
                fetchPriority="high"
                className="aspect-[4/3] w-full max-w-[760px] rounded-[14px] object-cover object-center"
              />
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-[#9da5a8]">
                <span>Живой автомобиль, не стоковая фотография</span>
                <span>Тюмень, июль 2026</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#141819]">
          <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-10">
            {[
              ["Автомобиль", "Pajero II V43W, 6G72, АКПП, Super Select"],
              ["Принцип", "Работы и материалы по смете. Цифровой пакет по тому же прайсу"],
              ["Продолжение", "Если кейс сработает, развитие сайта и рекламы уже на платной основе"],
            ].map(([title, text]) => (
              <div key={title} className="border-t border-white/20 pt-4">
                <p className="font-black text-white">{title}</p>
                <p className="mt-2 max-w-[36ch] text-sm leading-6 text-[#aeb5b7]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-white/10 py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#25332b] px-4 py-2 text-sm font-bold text-[#a8e6bd]">
                  <CheckCircle2 className="h-4 w-4" />
                  Исполнитель найден
                </div>
                <h2 className="mt-5 text-balance text-4xl font-black tracking-[-0.035em] text-white sm:text-5xl">
                  Поиск по мовилю закрыт
                </h2>
                <p className="mt-5 max-w-[52ch] text-lg leading-8 text-[#b9c0c2]">
                  С AMG уже встретились. Пескоструй днища, антикор и обработка скрытых полостей записаны на 4 августа 2026.
                </p>
                <div className="mt-7 rounded-[14px] bg-[#1a201d] p-5">
                  <p className="line-through decoration-[#a8e6bd] decoration-2 text-lg font-bold text-[#89928d]">
                    Найти партнёра на пескоструй, антикор и скрытые полости
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#c6cdca]">
                    Согласовано, но ещё не завершено. На странице останется весь путь, а после работ добавим фото результата.
                  </p>
                  <p className="mt-4 font-black text-[#a8e6bd]">Рыночный ориентир пакета: 48 900-55 000 ₽</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <figure>
                  <img
                    src="/images/barter/pajero/underbody.webp"
                    alt="Коррозия на днище и элементах рамы Pajero перед обработкой"
                    width={960}
                    height={1280}
                    className="aspect-[4/5] w-full rounded-[14px] object-cover"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm leading-6 text-[#929a9d]">
                    Видимая поверхностная коррозия. Явные силовые дыры по фото не подтверждены.
                  </figcaption>
                </figure>
                <figure className="sm:pt-20">
                  <a href="https://72o.ru/" target="_blank" rel="noreferrer" className="block group">
                    <img
                      src="/images/barter/pajero/amg-site-preview.webp"
                      alt="Первый экран сайта AMG Antikor 72, подготовленного CentrLP"
                      width={1440}
                      height={850}
                      className="aspect-[16/10] w-full rounded-[14px] object-cover object-top transition-transform group-active:scale-[0.99]"
                      loading="lazy"
                    />
                  </a>
                  <figcaption className="mt-3 text-sm leading-6 text-[#c6cdca]">
                    Встречная работа уже показана делом: CentrLP подготовил сайт-прототип для AMG на{" "}
                    <a className="font-bold text-[#ffd36d] underline decoration-[#ffd36d]/40 underline-offset-4" href="https://72o.ru/" target="_blank" rel="noreferrer">
                      72o.ru
                    </a>.
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section id="problems" className="border-b border-white/10 bg-[#111415] py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <h2 className="max-w-[16ch] text-balance text-4xl font-black tracking-[-0.035em] text-white sm:text-6xl">
              Что ещё нужно сделать
            </h2>
            <p className="mt-5 max-w-[66ch] text-lg leading-8 text-[#abb3b5]">
              Ниже не список желаний из каталога. Это зафиксированные симптомы и видимые дефекты. Точная смета появляется только после профильной диагностики.
            </p>

            <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
              {problemStories.map((problem, index) => (
                <article
                  key={problem.title}
                  className={index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"}
                >
                  <img
                    src={problem.image}
                    alt={problem.alt}
                    width={1280}
                    height={960}
                    className={`w-full rounded-[14px] object-cover ${index === 0 || index === 3 ? "aspect-[16/10]" : "aspect-[4/3]"}`}
                    loading="lazy"
                  />
                  <div className="mt-5 max-w-2xl">
                    <h3 className="text-2xl font-black tracking-[-0.025em] text-white">{problem.title}</h3>
                    <p className="mt-3 leading-7 text-[#aeb5b7]">{problem.text}</p>
                    <p className="mt-3 font-bold text-[#ffd36d]">{problem.price}</p>
                  </div>
                </article>
              ))}

              <article className="lg:col-span-12">
                <div className="grid gap-5 rounded-[14px] bg-[#1b2021] p-5 sm:grid-cols-2 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
                  <div>
                    <div className="flex items-center gap-2 text-[#ffd36d]">
                      <ShieldCheck className="h-5 w-5" />
                      <span className="font-black">Приоритет безопасности</span>
                    </div>
                    <h3 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white">Тормоза, ручник, рулевой люфт и разные шины</h3>
                    <p className="mt-4 max-w-[50ch] leading-7 text-[#aeb5b7]">
                      Большая выработка тормозных дисков, неработающий ручник, задержка реакции руля и два размера шин. До выравнивания колёс полный привод использовать нельзя.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <figure>
                      <img
                        src="/images/barter/pajero/wheel-31.webp"
                        alt="Шина Pajero размера 31 на переднем колесе"
                        width={1280}
                        height={960}
                        className="aspect-square w-full rounded-[14px] object-cover"
                        loading="lazy"
                      />
                      <figcaption className="mt-2 text-sm text-[#929a9d]">31x10.50 R15 LT</figcaption>
                    </figure>
                    <figure>
                      <img
                        src="/images/barter/pajero/wheel-265.webp"
                        alt="Шина Pajero размера 265/70 R15 на другом колесе"
                        width={1280}
                        height={960}
                        className="aspect-square w-full rounded-[14px] object-cover"
                        loading="lazy"
                      />
                      <figcaption className="mt-2 text-sm text-[#929a9d]">265/70 R15</figcaption>
                    </figure>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <h2 className="text-balance text-4xl font-black tracking-[-0.035em] text-white sm:text-6xl">
                Что получает партнёр взамен
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#abb3b5]">
                Каждая услуга CentrLP привязана к бизнес-результату и совпадает с прайсом основного сайта. Это не набор красивых файлов ради отчёта.
              </p>
            </div>

            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {digitalServices.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.id} className="grid gap-4 py-7 sm:grid-cols-[56px_1fr_auto] sm:items-center sm:gap-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#f3a712]/10 text-[#ffd36d]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-xl font-black text-white">{service.title}</h3>
                        <span className="font-bold text-[#ffd36d]">{service.priceLabel}</span>
                      </div>
                      <p className="mt-2 max-w-[78ch] leading-7 text-[#aeb5b7]">{service.benefit}</p>
                    </div>
                    <a
                      href={`https://centrlp.ru${service.href}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 font-bold text-[#dfe3e4] transition-colors hover:text-[#ffd36d] sm:justify-self-end"
                      aria-label={`Подробнее: ${service.title}`}
                    >
                      <span className="sm:hidden">Подробнее</span>
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="calculator" className="border-b border-white/10 bg-[#141819] py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-[#ffd36d]">
                <Calculator className="h-7 w-7" />
                <span className="text-lg font-black">Калькулятор паритета</span>
              </div>
              <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.035em] text-white sm:text-6xl">
                Выберите работы, которые можете закрыть
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#abb3b5]">
                Калькулятор соберёт ближайший по стоимости набор услуг CentrLP. Это основа для разговора, не публичная оферта и не замена осмотру.
              </p>
            </div>

            <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.55fr)]">
              <div className="space-y-9">
                <div className="rounded-[14px] border border-[#6abf86]/30 bg-[#193023]/40 p-5">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#8bdd9f]" />
                    <div>
                      <p className="line-through decoration-[#8bdd9f] decoration-2 font-black text-[#98a69c]">
                        Пескоструй, антикор и скрытые полости
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#b9c9bd]">
                        Уже в работе с AMG. Дата записи: 4 августа 2026. Рыночный ориентир 52 000 ₽ не участвует в новом расчёте.
                      </p>
                    </div>
                  </div>
                </div>

                {(["Безопасность", "Техника", "Салон", "Рестомод"] as RepairGroup[]).map((group) => (
                  <fieldset key={group}>
                    <legend className="mb-4 text-2xl font-black text-white">{group}</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {repairJobs.filter((job) => job.group === group).map((job) => {
                        const checked = selectedJobs.includes(job.id);
                        return (
                          <label
                            key={job.id}
                            className={`cursor-pointer rounded-[14px] p-4 transition-colors ${
                              checked ? "bg-[#f3a712] text-[#111315]" : "bg-[#202526] text-white hover:bg-[#272d2e]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleJob(job.id)}
                              className="sr-only"
                            />
                            <span className="flex items-start justify-between gap-3">
                              <span className="font-black leading-6">{job.title}</span>
                              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${checked ? "border-[#111315] bg-[#111315] text-[#f3a712]" : "border-white/30"}`}>
                                {checked ? <Check className="h-4 w-4" /> : null}
                              </span>
                            </span>
                            <span className={`mt-3 block text-sm font-bold ${checked ? "text-[#303637]" : "text-[#ffd36d]"}`}>
                              {job.priceLabel}
                            </span>
                            <span className={`mt-2 block text-sm leading-6 ${checked ? "text-[#303637]" : "text-[#9fa8aa]"}`}>
                              {job.note}
                            </span>
                            <span className={`mt-3 block text-xs font-bold ${checked ? "text-[#3f4647]" : "text-[#7f898c]"}`}>
                              {job.confidence}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>

              <aside className="rounded-[14px] bg-[#0d1011] p-5 lg:sticky lg:top-24 lg:p-7" aria-live="polite">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#9fa8aa]">Автоработы по ориентиру</p>
                    <p className="mt-1 text-4xl font-black tracking-[-0.04em] text-white">{money.format(repairTotal)} ₽</p>
                  </div>
                  <CircleDollarSign className="h-8 w-8 text-[#ffd36d]" />
                </div>

                {selectedRepairJobs.length === 0 ? (
                  <div className="mt-7 rounded-[14px] bg-[#1a1f20] p-5 text-sm leading-6 text-[#aeb5b7]">
                    Отметьте одну или несколько работ. Здесь появится сопоставимый пакет CentrLP.
                  </div>
                ) : (
                  <>
                    <div className="mt-7 border-t border-white/10 pt-6">
                      <p className="font-black text-white">Предлагаемый эквивалент</p>
                      <div className="mt-4 space-y-4">
                        {recommendedServices.map((service) => (
                          <div key={service.id} className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-bold text-[#e6e9ea]">{service.title}</p>
                              <p className="mt-1 text-xs leading-5 text-[#8e989a]">{service.benefit}</p>
                            </div>
                            <span className="shrink-0 text-sm font-black text-[#ffd36d]">{money.format(service.price)} ₽</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-bold text-[#aeb5b7]">Пакет CentrLP по прайсу</span>
                        <span className="text-xl font-black text-white">{money.format(serviceTotal)} ₽</span>
                      </div>
                      {uncovered > 0 ? (
                        <p className="mt-3 rounded-[14px] bg-[#3a2414] p-3 text-sm leading-6 text-[#ffd39a]">
                          Выбранный объём выше стандартного набора на {money.format(uncovered)} ₽. Нужен индивидуальный цифровой этап или денежная доплата.
                        </p>
                      ) : (
                        <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#9fd7ae]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                          Пакет закрывает ориентир авторабот. Финальный состав фиксируем после сметы.
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={copySelection}
                      disabled={copyState === "copying"}
                      className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f3a712] px-5 font-black text-[#111315] transition-transform active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
                    >
                      {copyState === "copied" ? <Check className="h-5 w-5" /> : <Clipboard className="h-5 w-5" />}
                      {copyState === "copying" ? "Копируем..." : copyState === "copied" ? "Вариант скопирован" : "Скопировать вариант"}
                    </button>
                    {copyState === "error" ? (
                      <p className="mt-3 flex items-start gap-2 text-sm text-[#ffb4a9]">
                        <X className="mt-0.5 h-4 w-4 shrink-0" />
                        Браузер не дал скопировать текст. Можно сделать скриншот этого блока.
                      </p>
                    ) : null}
                  </>
                )}
              </aside>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
            <div>
              <Camera className="h-8 w-8 text-[#ffd36d]" />
              <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] text-white">Как считаем ориентиры</h2>
              <p className="mt-5 max-w-[46ch] leading-7 text-[#aeb5b7]">
                Цены собраны по открытым прайсам Тюмени 17 июля 2026. Значение в калькуляторе показывает рыночный коридор, но не заменяет смету на старый Pajero.
              </p>
              <p className="mt-4 max-w-[46ch] text-sm leading-6 text-[#7f898c]">
                Запчасти, оборудование, скрытая коррозия, сварка и нестандартный демонтаж всегда считаются отдельно.
              </p>
            </div>
            <div className="flex flex-wrap content-start gap-3">
              {priceSources.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-[#d9dddd] transition-colors hover:border-[#f3a712]/60 hover:text-[#ffd36d]"
                >
                  {label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 rounded-[14px] bg-[#f3a712] p-6 text-[#111315] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
              <div>
                <Wrench className="h-9 w-9" />
                <h2 className="mt-5 max-w-[15ch] text-balance text-4xl font-black tracking-[-0.04em] sm:text-6xl">
                  Начнём с одного честного этапа
                </h2>
                <p className="mt-5 max-w-[64ch] text-lg leading-8 text-[#303637]">
                  Сначала фиксируем диагностику, смету, материалы, сроки и критерий результата. Затем подписываем состав встречных работ CentrLP. Если обе стороны довольны, продолжаем уже как обычные платные партнёры.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="https://max.ru/u/f9LHodD0cOIJUiQnWdiLFouZRo0yILV-MOKhbvF8RIwhar0TNMO6tUYnxTI"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#111315] px-6 font-black text-white transition-transform active:scale-[0.98]"
                >
                  Обсудить в MAX
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://centrlp.ru/services"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#111315]/35 px-6 font-black transition-colors hover:border-[#111315]"
                >
                  Все услуги CentrLP
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 text-sm text-[#838d8f] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>CentrLP, ООО «ААМХ», Тюмень</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="hover:text-white" href="https://centrlp.ru/privacy" target="_blank" rel="noreferrer">Политика данных</a>
            <a className="hover:text-white" href="https://centrlp.ru/cookies" target="_blank" rel="noreferrer">Cookie</a>
            <a className="hover:text-white" href="https://centrlp.ru/" target="_blank" rel="noreferrer">centrlp.ru</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BarterSTO;
