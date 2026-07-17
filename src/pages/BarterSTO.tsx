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
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { servicePriceByHref } from "@/data/pricing";

type RepairGroup = "Безопасность" | "Техника" | "Детейлинг" | "Мультимедиа";
type RepairFilter = "Все" | RepairGroup;
type RepairStatus = "active" | "scheduled" | "completed";
type PageSection = "problems" | "offer" | "calculator";
type CalculatorSide = "vehicle" | "centrlp" | "parity";

type CaseImage = {
  src: string;
  alt: string;
  caption: string;
  sourceUrl?: string;
};

type RepairJob = {
  id: string;
  group: RepairGroup;
  title: string;
  problem: string;
  result: string;
  price: number;
  priceLabel: string;
  breakdown: string;
  confidence: "Публичный прайс" | "Предварительная оценка" | "Ориентир владельца" | "Согласованная стоимость";
  status: RepairStatus;
  statusLabel: string;
  images: CaseImage[];
  sourceUrl?: string;
  exclusiveGroup?: string;
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

const repairGroups: RepairGroup[] = ["Безопасность", "Техника", "Детейлинг", "Мультимедиа"];

const pageSections: Array<{
  id: PageSection;
  desktopLabel: string;
  mobileLabel: string;
  icon: typeof Wrench;
}> = [
  { id: "problems", desktopLabel: "Проблемы авто", mobileLabel: "Проблемы", icon: Wrench },
  { id: "offer", desktopLabel: "Что мы предлагаем", mobileLabel: "Предложение", icon: Globe2 },
  { id: "calculator", desktopLabel: "Посчитать паритет", mobileLabel: "Паритет", icon: Calculator },
];

const repairJobs: RepairJob[] = [
  {
    id: "brake-discs",
    group: "Безопасность",
    title: "Тормозные диски и колодки",
    problem: "На дисках большая выработка. Это отдельная задача по рабочей тормозной системе, не связанная с ручником.",
    result: "Заменить изношенные диски и колодки по нужным осям, проверить суппорты и направляющие, затем проконтролировать торможение.",
    price: 7_000,
    priceLabel: "работа около 7 000 ₽",
    breakdown: "Запчасти и их стоимость берём из счёта МаслоМаркета владельца. В калькулятор сейчас входит только работа; оси, колодки и ревизия суппортов уточняются по счёту и осмотру.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужен исполнитель",
    images: [
      {
        src: "/images/barter/pajero/wheel-31.webp",
        alt: "Переднее колесо Mitsubishi Pajero перед ремонтом тормозов",
        caption: "Фото колеса автомобиля. Крупный план рабочих поверхностей дисков нужно сделать при разборке.",
      },
    ],
  },
  {
    id: "handbrake",
    group: "Безопасность",
    title: "Неработающий ручник",
    problem: "Стояночный тормоз не удерживает автомобиль. Это отдельный кейс со своими тросами, колодками и механизмом.",
    result: "Проверить ход рычага, тросы, задние механизмы и регулировку. Вернуть уверенную фиксацию автомобиля на уклоне.",
    price: 5_000,
    priceLabel: "около 5 000 ₽ за работу",
    breakdown: "Диагностика и восстановление механизма. Тросы, колодки ручника и закисшие детали считаются отдельно после разборки.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужен исполнитель",
    images: [
      {
        src: "/images/barter/pajero/handbrake-console.webp",
        alt: "Центральная консоль Mitsubishi Pajero с рычагом ручника",
        caption: "Штатный рычаг ручника между передними сиденьями.",
      },
    ],
  },
  {
    id: "steering-play",
    group: "Безопасность",
    title: "Рулевой люфт около 2 см",
    problem: "Колёса реагируют с задержкой, автомобиль может уводить, а в повороте чувствуется пауза между рулём и траекторией.",
    result: "Локализовать люфт от рулевого колеса до редуктора, тяг и наконечников. Устранить причину и проверить автомобиль на дороге.",
    price: 10_000,
    priceLabel: "около 10 000 ₽ за работу",
    breakdown: "Диагностика в Тюмени начинается примерно от 660-850 ₽. Детали и возможная замена рулевого редуктора в сумму не включены.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужен исполнитель",
    images: [
      {
        src: "/images/barter/pajero/steering.webp",
        alt: "Рулевое колесо Mitsubishi Pajero с зафиксированным свободным ходом",
        caption: "Руль и зона старой проводки. Для диагностики добавим короткое видео свободного хода.",
      },
    ],
  },
  {
    id: "matching-tires",
    group: "Безопасность",
    title: "Разные размеры шин",
    problem: "На автомобиле одновременно стоят 31x10.50 R15 LT и 265/70 R15. До выравнивания размера полный привод использовать нельзя.",
    result: "Подобрать одинаковый комплект 265/70 R15 или согласованный эквивалент, выполнить монтаж и проверить давление на всех колёсах.",
    price: 57_800,
    priceLabel: "комплект с монтажом около 57 800 ₽",
    breakdown: "Ориентир на комплект шин 55 000 ₽ плюс около 2 800 ₽ за шиномонтаж R15 для внедорожника.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужен комплект",
    images: [
      {
        src: "/images/barter/pajero/wheel-31.webp",
        alt: "Шина Pajero размера 31x10.50 R15 LT",
        caption: "Фактический размер на одном колесе: 31x10.50 R15 LT.",
      },
      {
        src: "/images/barter/pajero/wheel-265.webp",
        alt: "Шина Pajero размера 265/70 R15",
        caption: "Фактический размер на другом колесе: 265/70 R15.",
      },
    ],
  },
  {
    id: "sunroof",
    group: "Техника",
    title: "Диагностика и ремонт штатного люка",
    problem: "Штатный электролюк не работает. Сам люк и блок POWER SUNROOF физически находятся на месте.",
    result: "Проверить питание, кнопку, привод, тросы, направляющие и дренажи. Вернуть открытие, закрытие и герметичность.",
    price: 15_000,
    priceLabel: "предварительно 15 000 ₽",
    breakdown: "Реалистичный коридор старого механизма 10 000-30 000 ₽. Точная цена только после дефектовки.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужна дефектовка",
    images: [
      {
        src: "/images/barter/pajero/sunroof.webp",
        alt: "Штатный люк Mitsubishi Pajero из салона",
        caption: "Физически люк и блок управления на месте.",
      },
    ],
  },
  {
    id: "ac",
    group: "Техника",
    title: "Диагностика и восстановление кондиционера",
    problem: "Штатное управление и элементы системы установлены, но рабочее состояние и тип хладагента пока не подтверждены.",
    result: "Проверить герметичность, компрессор, муфту, трубки, электрику и температуру на выходе. После этого восстановить систему по смете.",
    price: 25_000,
    priceLabel: "предварительно 25 000 ₽",
    breakdown: "Диагностика 500-1 500 ₽. Мелкий ремонт обычно 5 000-15 000 ₽, крупный с деталями может стоить 20 000-60 000 ₽.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужна диагностика",
    images: [
      {
        src: "/images/barter/pajero/ac-controls.webp",
        alt: "Штатное управление кондиционером Mitsubishi Pajero",
        caption: "На панели есть штатное управление кондиционером.",
      },
    ],
  },
  {
    id: "selector",
    group: "Техника",
    title: "Селектор АКПП: положение D включается не всегда",
    problem: "Положение D иногда не включается с первого перевода рычага, приходится возвращать селектор и повторять.",
    result: "Начать с троса, втулок, регулировки и датчика положения. Не разбирать АКПП до проверки внешнего механизма.",
    price: 5_000,
    priceLabel: "предварительно 5 000 ₽",
    breakdown: "Это оценка диагностики и регулировки селектора, не смета капитального ремонта коробки.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужна диагностика",
    images: [
      {
        src: "/images/barter/pajero/handbrake-console.webp",
        alt: "Селектор автоматической коробки Mitsubishi Pajero",
        caption: "Штатный селектор АКПП и раздаточной коробки.",
      },
    ],
  },
  {
    id: "electrics",
    group: "Техника",
    title: "Поворотники и ревизия старой проводки",
    problem: "Поворотники не всегда автоматически отключаются после возврата руля. Под рулём есть следы старой сигнализации.",
    result: "Проверить механизм автоматического возврата подрулевого переключателя, контактную группу и разъёмы. Затем безопасно разобрать старые подключения и привести проводку в понятное, документированное состояние.",
    price: 6_000,
    priceLabel: "предварительно 6 000 ₽",
    breakdown: "Диагностика автоэлектрики 1 500-2 300 ₽, ремонт проводки и детали считаются после вскрытия.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужен автоэлектрик",
    images: [
      {
        src: "/images/barter/pajero/steering.webp",
        alt: "Зона под рулём Mitsubishi Pajero со старой проводкой",
        caption: "Рулевая колонка и зона, где обнаружены старые подключения.",
      },
      {
        src: "/images/barter/pajero/turn-signal-switch.webp",
        alt: "Подрулевой переключатель поворотников и света Mitsubishi Pajero",
        caption: "Иллюстративное фото блока поворотников и света. Точный номер детали нужно сверить по VIN и снятому узлу.",
        sourceUrl: "https://www.fridayparts.com/headlight-indicator-turn-signal-switch-mr301406-for-mitsubshi-pajero-montero",
      },
    ],
  },
  {
    id: "fuel-door",
    group: "Техника",
    title: "Замок лючка бензобака",
    problem: "Ключ зажигания не открывает личинку лючка. Возможны закисание или ранее заменённый замок.",
    result: "Разобрать и очистить личинку, восстановить её либо подобрать совместимый замок под понятный ключ.",
    price: 4_500,
    priceLabel: "предварительно 4 500 ₽",
    breakdown: "Оценка 3 000-8 000 ₽ в зависимости от сохранности личинки и наличия совместимой детали.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужен мастер",
    images: [
      {
        src: "/images/barter/pajero/fuel-door.webp",
        alt: "Лючок бензобака Mitsubishi Pajero и снятая деталь замка",
        caption: "Фактическое состояние лючка, ключа и снятой детали.",
      },
    ],
  },
  {
    id: "heater",
    group: "Техника",
    title: "Очистка печки и воздуховодов",
    problem: "При включении печки из воздуховодов пошла пыль после долгого простоя автомобиля.",
    result: "Очистить моторчик, короб, воздухозаборник, воздуховоды и доступную часть испарителя без маскировки запаха ароматизатором.",
    price: 5_000,
    priceLabel: "предварительно 5 000 ₽",
    breakdown: "Объём зависит от необходимой разборки панели и состояния испарителя.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужна очистка",
    images: [
      {
        src: "/images/barter/pajero/interior-dashboard-wide.webp",
        alt: "Панель и воздуховоды салона Mitsubishi Pajero",
        caption: "Штатная панель, воздуховоды и зона блока отопителя.",
      },
    ],
  },
  {
    id: "door-card",
    group: "Детейлинг",
    title: "Ремонт трещины на левой дверной карте",
    problem: "На подлокотнике водительской двери есть глубокая трещина и разрыв покрытия. Это дефект салонного пластика, не кузовной металл.",
    result: "Задекорировать повреждение без грубой заплатки: ремонт пластика, восстановление фактуры или локальная перетяжка элемента.",
    price: 4_500,
    priceLabel: "ориентир 4 500 ₽",
    breakdown: "Публичный коридор ремонта дверной карты в Тюмени 2 000-6 500 ₽.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужен мастер салона",
    images: [
      {
        src: "/images/barter/pajero/door-card-crack.webp",
        alt: "Трещина на пластике водительской дверной карты Pajero",
        caption: "Крупный план трещины и разрыва покрытия.",
      },
    ],
  },
  {
    id: "exterior-handles",
    group: "Детейлинг",
    title: "Восстановление наружных дверных ручек",
    problem: "Чёрный пластик наружных ручек выгорел и посерел. На фоне серебристого кузова это сразу делает автомобиль визуально старше.",
    result: "Снимем стойкое загрязнение, проверим состояние пластика и вернём ручкам глубокий ровный чёрный цвет с защитой от ультрафиолета. Никакого жирного силиконового блеска на несколько моек.",
    price: 4_000,
    priceLabel: "ориентир 4 000 ₽ за комплект",
    breakdown: "В открытом прайсе детейлинга очистка пластика начинается от 700 ₽ за деталь. Для четырёх ручек закладываем подготовку, восстановление цвета и защиту; точный метод мастер выбирает после теста материала.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Можно взять отдельным этапом",
    sourceUrl: "https://royaldetailing72.ru/",
    images: [
      {
        src: "/images/barter/pajero/pajero-side.webp",
        alt: "Чёрные наружные ручки на серебристом Mitsubishi Pajero",
        caption: "На реальном автомобиле видны все четыре наружные ручки: этот этап можно выполнить отдельно от остальных пластиковых деталей.",
      },
    ],
  },
  {
    id: "exterior-plastic",
    group: "Детейлинг",
    title: "Восстановление наружного чёрного пластика",
    problem: "Молдинги, накладки, углы бамперов и другой неокрашенный пластик выцветают неравномерно и дробят внешний вид автомобиля.",
    result: "Составим перечень деталей, глубоко очистим пластик, восстановим ровный цвет и нанесём защиту. Результат должен выглядеть заводским, а не замаскированным дешёвым чернителем.",
    price: 8_000,
    priceLabel: "предварительно 8 000 ₽",
    breakdown: "Ориентир рассчитан как отдельная работа по нескольким наружным деталям. Трещины, глубокие царапины, окраска и снятие сложных накладок считаются после осмотра.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужен детейлинг",
    sourceUrl: "https://royaldetailing72.ru/",
    images: [
      {
        src: "/images/barter/pajero/pajero-side.webp",
        alt: "Наружные пластиковые накладки Mitsubishi Pajero до восстановления",
        caption: "Молдинги и наружные накладки считаем отдельно от дверных ручек, чтобы студия могла выбрать реальный объём.",
      },
    ],
  },
  {
    id: "dashboard-relight",
    group: "Детейлинг",
    title: "Пересвет панели приборов и кнопок",
    problem: "Подсветка шкал и органов управления неравномерная, часть зон выглядит тускло.",
    result: "Сделать ровный аккуратный свет приборов, кнопок и селектора, сохранить точность стрелок и не вмешиваться в пробег.",
    price: 6_000,
    priceLabel: "предварительно 6 000 ₽",
    breakdown: "Рыночный коридор пересвета щитка 3 000-8 000 ₽. Расширенный пересвет кнопок и климата оценивается отдельно.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужен автоэлектрик",
    images: [
      {
        src: "/images/barter/pajero/dashboard.webp",
        alt: "Приборная панель Mitsubishi Pajero перед пересветом",
        caption: "Реальная приборная панель до пересвета.",
      },
    ],
  },
  {
    id: "interior-cleaning",
    group: "Детейлинг",
    title: "Полная химчистка салона внедорожника",
    problem: "После долгого простоя салону нужна глубокая очистка, включая трудные зоны трёхрядного внедорожника.",
    result: "Глубоко очистить потолок, ковролин, пластик, ремни, дверные карты, багажную часть и зоны под сиденьями, удалить пыль и запах долгого простоя, затем полностью высушить салон.",
    price: 20_000,
    priceLabel: "ориентир 20 000 ₽",
    breakdown: "Актуальный открытый прайс полной химчистки автомобиля 3-го класса в Тюмени начинается от 20 000 ₽. Съёмные чехлы вынесены в отдельную задачу и не дублируют эту сумму.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужен детейлинг",
    images: [
      {
        src: "/images/barter/pajero/rear-seats.webp",
        alt: "Задние ряды салона Mitsubishi Pajero перед химчисткой",
        caption: "Фактическое состояние второго и третьего рядов.",
      },
      {
        src: "/images/barter/pajero/interior-dashboard-wide.webp",
        alt: "Передняя часть салона Mitsubishi Pajero перед химчисткой",
        caption: "Передняя панель, ковролин и трудные зоны салона.",
      },
    ],
  },
  {
    id: "seat-cover-cleaning",
    group: "Детейлинг",
    title: "Химчистка съёмных чехлов сидений",
    problem: "Чехлы на сиденьях накопили пыль и загрязнения за время простоя. Простая мойка вместе с салоном может оставить влагу, разводы или запах.",
    result: "Снять чехлы, проверить стойкость ткани, глубоко очистить их с двух сторон, полностью высушить и аккуратно установить обратно без перекосов и складок.",
    price: 4_000,
    priceLabel: "предварительно 4 000 ₽",
    breakdown: "Рабочий ориентир 3 000-6 000 ₽ зависит от количества чехлов, ткани, наполнителя и возможности безопасного снятия. Эта строка выбирается отдельно от химчистки самого салона.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Можно взять отдельно",
    images: [
      {
        src: "/images/barter/pajero/rear-seats.webp",
        alt: "Чехлы на сиденьях Mitsubishi Pajero перед химчисткой",
        caption: "Фактические чехлы второго и третьего рядов. Перед работой мастер проверяет, как они снимаются и переносят влажную чистку.",
      },
    ],
  },
  {
    id: "steering-wheel-upholstery",
    group: "Детейлинг",
    title: "Перетяжка руля натуральной кожей",
    problem: "Штатный руль заметно состарился: поверхность выглядит уставшей, а хват уже не даёт ощущения аккуратного и собранного салона.",
    result: "Снять руль, восстановить основу при необходимости и перетянуть его нескользящей натуральной кожей. Согласовать цвет, фактуру и строчку, сохранить штатную геометрию и удобный хват.",
    price: 5_000,
    priceLabel: "публичная цена 5 000 ₽",
    breakdown: "Тюменское автоателье указывает 5 000 ₽ за перетяжку руля натуральной кожей. Дополнительное восстановление основы, изменение анатомии или подогрев считаются отдельно после осмотра.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужно автоателье",
    sourceUrl: "https://peretyazhka72.ru/ceny/",
    images: [
      {
        src: "/images/barter/pajero/steering.webp",
        alt: "Штатный руль Mitsubishi Pajero перед перетяжкой натуральной кожей",
        caption: "Фактическое состояние руля. Материал и рисунок строчки согласуем с мастером до разборки.",
      },
    ],
  },
  {
    id: "eva-mats",
    group: "Детейлинг",
    title: "EVA-коврики по лекалам Pajero",
    problem: "Старому трёхрядному внедорожнику нужен комплект, который повторяет пол, закрывает сложные зоны и удерживает воду и грязь внутри ячеек.",
    result: "Снять точные лекала или подобрать проверенный шаблон Pajero II, изготовить комплект для нужных рядов, выбрать цвет канта и поставить штатные крепления и подпятник.",
    price: 5_000,
    priceLabel: "ориентир 5 000 ₽",
    breakdown: "Базовый комплект EVA в тюменской мастерской стоит 3 300 ₽. Для старого трёхрядного Pajero закладываем индивидуальный расчёт; коврик багажника и дополнительные детали согласуются отдельно.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужен изготовитель ковриков",
    sourceUrl: "https://kovrik72.ru/",
    images: [
      {
        src: "/images/barter/pajero/rear-seats.webp",
        alt: "Пол второго и третьего ряда Mitsubishi Pajero для изготовления EVA-ковриков",
        caption: "Трёхрядный салон требует проверки лекал и количества отдельных ковриков до раскроя.",
      },
    ],
  },
  {
    id: "tint",
    group: "Детейлинг",
    title: "Тонировка автомобиля",
    problem: "Нужна новая аккуратная тонировка с понятной светопропускаемостью и без пузырей старого слоя.",
    result: "Замерить фактическое светопропускание, снять старую плёнку при необходимости и затонировать заднюю полусферу. Передние стёкла делать только в пределах действующих требований и после контрольного замера.",
    price: 9_500,
    priceLabel: "ориентир 9 500 ₽",
    breakdown: "Публичный коридор тонировки в круг в Тюмени 5 300-14 000 ₽. На 17 июля 2026 года лобовое и передние боковые стёкла должны пропускать не менее 70% света; обсуждавшееся смягчение не стало действующим правилом. Поэтому сначала измеряем само стекло, затем подбираем законный вариант.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужен детейлинг",
    sourceUrl: "https://www.consultant.ru/document/cons_doc_LAW_518324/a55e4bdd7cb36a689c21e538b92bec8bf21e5ec7/",
    images: [
      {
        src: "/images/barter/pajero/pajero-side.webp",
        alt: "Mitsubishi Pajero перед обновлением тонировки",
        caption: "Реальный автомобиль и текущая площадь остекления.",
      },
    ],
  },
  {
    id: "headlight-ppf",
    group: "Детейлинг",
    title: "Бронеплёнка на стеклянные фары",
    problem: "Стеклянная оптика Pajero устойчива к помутнению, но получает пескоструй, мелкие сколы и риск трещины от камня. Найти хорошую замену на старую модель становится сложнее.",
    result: "Очистить и подготовить обе фары, при необходимости сделать лёгкую коррекцию поверхности и закрыть стекло прозрачной полиуретановой плёнкой без искажения света.",
    price: 3_000,
    priceLabel: "ориентир 3 000 ₽ за пару",
    breakdown: "Открытая цена бронирования фар в Тюмени начинается от 2 000 ₽. Для крупной стеклянной оптики Pajero оставляем запас на подготовку и индивидуальное построение лекала.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Можно взять отдельным этапом",
    sourceUrl: "https://xenonshop72.ru/services/bronirovanie-far-zashchitnoy-plenkoy-/",
    images: [
      {
        src: "/images/barter/pajero/pajero-front.jpg",
        alt: "Стеклянные передние фары Mitsubishi Pajero второго поколения",
        caption: "Реальная передняя оптика автомобиля. Плёнка на фары считается отдельно от защиты кузова.",
      },
    ],
  },
  {
    id: "vinyl-wrap",
    group: "Детейлинг",
    title: "Полная оклейка декоративной цветной плёнкой",
    problem: "Кузову нужен единый свежий образ без дорогостоящей полной окраски. Рассматриваем как спокойный однотонный вариант, так и заметную декоративную концепцию.",
    result: "Проверить ЛКП, выбрать доступную виниловую плёнку и адаптировать выбранную визуальную идею под реальный кузов. Полностью оклеить автомобиль с аккуратными подворотами и разборкой по технологии студии.",
    price: 120_000,
    priceLabel: "оценка около 120 000 ₽",
    breakdown: "Рабочий оценочный коридор 90 000-165 000 ₽. Локальные студии обычно считают такой Pajero только после осмотра.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужна студия плёнки",
    images: [
      {
        src: "/images/barter/pajero/pajero-side.webp",
        alt: "Кузов Mitsubishi Pajero для полной оклейки виниловой плёнкой",
        caption: "Реальный автомобиль до оклейки.",
      },
      {
        src: "/images/barter/pajero/wrap-concepts/red-flames.webp",
        alt: "Визуализация Mitsubishi Pajero в красной плёнке с огненной графикой",
        caption: "Концепт: красная база и динамичная графика.",
      },
      {
        src: "/images/barter/pajero/wrap-concepts/graffiti.webp",
        alt: "Визуализация Mitsubishi Pajero в яркой плёнке с граффити",
        caption: "Концепт: яркое граффити по всему кузову.",
      },
      {
        src: "/images/barter/pajero/wrap-concepts/neon-blue.webp",
        alt: "Визуализация Mitsubishi Pajero в сине-фиолетовой неоновой плёнке",
        caption: "Концепт: холодный неон и цветовые переливы.",
      },
      {
        src: "/images/barter/pajero/wrap-concepts/black-red.webp",
        alt: "Визуализация Mitsubishi Pajero в чёрно-красной декоративной плёнке",
        caption: "Концепт: чёрная база с красными акцентами.",
      },
      {
        src: "/images/barter/pajero/wrap-concepts/black-teal.webp",
        alt: "Визуализация Mitsubishi Pajero в чёрной плёнке с бирюзовым рисунком",
        caption: "Концепт: тёмная база и технологичная бирюзовая графика.",
      },
      {
        src: "/images/barter/pajero/wrap-concepts/comic.webp",
        alt: "Визуализация Mitsubishi Pajero в цветной плёнке в стиле комикса",
        caption: "Концепт: крупная комикс-графика. Все варианты являются визуализациями, а не обещанием точного совпадения с готовой плёнкой.",
      },
    ],
  },
  {
    id: "ppf-risk",
    group: "Детейлинг",
    title: "Бронеплёнка на зоны риска",
    problem: "Передняя часть и зоны частых касаний нуждаются в защите от сколов и царапин.",
    result: "Закрыть полиуретаном капот, передний бампер, зеркала и согласованные зоны риска. Стеклянные фары вынесены в отдельную задачу, чтобы их можно было выбрать без большого пакета.",
    price: 65_000,
    priceLabel: "ориентир 65 000 ₽",
    breakdown: "Публичный коридор по Тюмени 62 000-70 000 ₽. Это альтернатива полной бронеплёнке, а не дополнительная строка к ней.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужна студия плёнки",
    exclusiveGroup: "ppf",
    images: [
      {
        src: "/images/barter/pajero/pajero-side.webp",
        alt: "Передняя часть Mitsubishi Pajero для оклейки бронеплёнкой",
        caption: "Кузов и передние зоны риска до защиты.",
      },
    ],
  },
  {
    id: "ppf-full",
    group: "Детейлинг",
    title: "Полная бронеплёнка кузова",
    problem: "Максимальный сценарий защиты нужен только при хорошем состоянии и подготовке ЛКП.",
    result: "Оклеить полиуретаном весь кузов без крыши либо согласованный полный набор деталей.",
    price: 180_000,
    priceLabel: "ориентир 180 000 ₽",
    breakdown: "Публичный коридор для внедорожника без крыши 170 000-190 000 ₽. В калькуляторе выбирается вместо зон риска.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужна студия плёнки",
    exclusiveGroup: "ppf",
    images: [
      {
        src: "/images/barter/pajero/pajero-side.webp",
        alt: "Mitsubishi Pajero для полной оклейки полиуретановой плёнкой",
        caption: "Полная площадь кузова оценивается после проверки ЛКП.",
      },
    ],
  },
  {
    id: "polish",
    group: "Детейлинг",
    title: "Восстановительная полировка кузова",
    problem: "ЛКП нужно очистить, измерить и вернуть ему более ровный блеск перед защитой или как самостоятельный этап.",
    result: "Провести тест толщины, согласовать допустимую глубину коррекции, отполировать кузов и защитить поверхность.",
    price: 30_000,
    priceLabel: "ориентир 30 000 ₽",
    breakdown: "Публичный коридор восстановительной полировки в Тюмени 10 000-38 000 ₽.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужен детейлинг",
    images: [
      {
        src: "/images/barter/pajero/pajero-side.webp",
        alt: "Лакокрасочное покрытие Mitsubishi Pajero перед полировкой",
        caption: "Левая сторона кузова для первичной оценки ЛКП.",
      },
    ],
  },
  {
    id: "teyes-unit",
    group: "Мультимедиа",
    title: "TEYES CC4 Pro 12/256 и рамка",
    problem: "Сейчас установлена старая однодиновая Sony. Нужен современный экран с навигацией, связью, камерой и запасом памяти.",
    result: "Подобрать TEYES CC4 Pro 12/256 подходящего размера с совместимой рамкой для панели Pajero II 1991-1999.",
    price: 50_000,
    priceLabel: "ориентир владельца около 50 000 ₽",
    breakdown: "Ориентир владельца на AliExpress около 50 000 ₽. Официальный прайс TEYES на 9-дюймовую версию 12/256 сейчас 66 600 ₽. Совместимость конкретной рамки проверяем до заказа.",
    confidence: "Ориентир владельца",
    status: "active",
    statusLabel: "Можно закрыть оборудованием",
    sourceUrl: "https://teyes.com.ru/product/planshet-teyes-cc4-pro-12-256-9-dyujmov/",
    images: [
      {
        src: "/images/barter/pajero/teyes-cc4-pro.webp",
        alt: "Автомагнитола TEYES CC4 Pro 12/256",
        caption: "TEYES CC4 Pro 12/256, официальный продуктовый рендер.",
        sourceUrl: "https://teyes.com.ru/product/planshet-teyes-cc4-pro-12-256-9-dyujmov/",
      },
      {
        src: "/images/barter/pajero/teyes-installed-reference.webp",
        alt: "Автомагнитола TEYES, установленная на верхней части панели",
        caption: "Реальный референс посадки экрана TEYES на верхней части панели. Это пример установки, не текущий Pajero.",
      },
      {
        src: "/images/barter/pajero/pajero-radio-frame.webp",
        alt: "Переходная рамка 9 дюймов для Mitsubishi Pajero II 1991-1999",
        caption: "Пример рамки 9 дюймов для Pajero II. Геометрию верхней части панели сверяем перед покупкой.",
        sourceUrl: "https://www.smartclub27.ru/collection/pajero-2/product/perehodnaya-ramka-magnitoly-mitsubishi-pajero-ii-1991-1999-9-dyuymov",
      },
    ],
  },
  {
    id: "teyes-install",
    group: "Мультимедиа",
    title: "Монтаж TEYES CC4 Pro в Pajero",
    problem: "Даже если голову покупает владелец, нужен отдельный установочный кейс со старой проводкой и нестандартной рамкой.",
    result: "Снять Sony, установить экран с рамкой на панели, подключить питание, звук, GPS, микрофон и проверить отсутствие паразитного разряда.",
    price: 18_000,
    priceLabel: "монтаж около 18 000 ₽",
    breakdown: "Фирменный минимум за ГУ, переднюю и заднюю камеры начинается примерно от 14 390 ₽. Для Pajero 1991 заложен запас на старую проводку и подгонку рамки.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Можно взять только монтаж",
    sourceUrl: "https://install.teyes72.ru/",
    images: [
      {
        src: "/images/barter/pajero/current-sony-head-unit.webp",
        alt: "Текущая автомагнитола Sony в Mitsubishi Pajero",
        caption: "Текущая однодиновая Sony, которую предстоит заменить.",
      },
      {
        src: "/images/barter/pajero/pajero-radio-frame.webp",
        alt: "Рамка для установки девятидюймовой магнитолы в Pajero II",
        caption: "Пример установочной рамки, точная совместимость проверяется мастером.",
        sourceUrl: "https://www.smartclub27.ru/collection/pajero-2/product/perehodnaya-ramka-magnitoly-mitsubishi-pajero-ii-1991-1999-9-dyuymov",
      },
    ],
  },
  {
    id: "teyes-digital-360",
    group: "Мультимедиа",
    title: "TEYES Digital 360, комплект камер",
    problem: "Большому рамному внедорожнику нужен обзор слепых зон при парковке и манёврах.",
    result: "Поставить четыре цифровые камеры, откалибровать панораму и вывести круговой обзор на CC4 Pro.",
    price: 21_900,
    priceLabel: "оборудование 21 900 ₽",
    breakdown: "Это комплект Digital 360 без отдельной AHD ADAS-камеры. В калькуляторе он является альтернативой расширенному набору 360 + ADAS.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Можно закрыть оборудованием",
    exclusiveGroup: "teyes-360-kit",
    sourceUrl: "https://teyes.com.ru/yakutsk/product/kamery-krugovogo-obzora-teyes-digital-360-dlya-cc4-pro/",
    images: [
      {
        src: "/images/barter/pajero/teyes-digital-360.webp",
        alt: "Комплект цифровых камер TEYES Digital 360",
        caption: "Четыре цифровые камеры кругового обзора для CC4 Pro.",
        sourceUrl: "https://teyes.com.ru/yakutsk/product/kamery-krugovogo-obzora-teyes-digital-360-dlya-cc4-pro/",
      },
    ],
  },
  {
    id: "teyes-360-adas",
    group: "Мультимедиа",
    title: "TEYES 360 + AHD ADAS",
    problem: "Расширенный сценарий добавляет к круговому обзору переднюю ADAS-камеру и видеорегистратор.",
    result: "Установить совместный комплект 360, AHD ADAS и регистратора, выполнить калибровку и проверку всех режимов.",
    price: 34_900,
    priceLabel: "оборудование 34 900 ₽",
    breakdown: "Официальный комплект 360 + AHD ADAS стоит дороже базовых камер за 21 900 ₽. В калькуляторе эти два набора взаимоисключающие.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Расширенный вариант",
    exclusiveGroup: "teyes-360-kit",
    sourceUrl: "https://teyes.com.ru/product/komplekt-krugovogo-obzora-teyes-360-ahd-adas-dlya-cc4-pro/",
    images: [
      {
        src: "/images/barter/pajero/teyes-360-adas.webp",
        alt: "Схема комплекта TEYES 360 с AHD ADAS",
        caption: "Схема цифровых камер 360 и AHD ADAS из официальной карточки TEYES.",
        sourceUrl: "https://teyes.com.ru/product/komplekt-krugovogo-obzora-teyes-360-ahd-adas-dlya-cc4-pro/",
      },
    ],
  },
  {
    id: "teyes-360-install",
    group: "Мультимедиа",
    title: "Монтаж и калибровка кругового обзора",
    problem: "Камеры недостаточно просто закрепить: нужны скрытая проводка, правильные точки установки и геометрическая калибровка.",
    result: "Установить четыре камеры, проложить проводку, откалибровать изображение и проверить обзор вокруг автомобиля.",
    price: 25_000,
    priceLabel: "монтаж от 25 000 ₽",
    breakdown: "Фирменный публичный ориентир TEYES в Тюмени. Нестандартная разборка старого Pajero оценивается мастером отдельно.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Можно взять только монтаж",
    sourceUrl: "https://teyes.com.ru/tyumen/product/cifrovye-kamery-krugovogo-obzora-teyes-digital-360-dlya-cc4-pro-kvadratnye/",
    images: [
      {
        src: "/images/barter/pajero/teyes-digital-360.webp",
        alt: "Камеры TEYES Digital 360 для установки на Pajero",
        caption: "Комплект требует монтажа по четырём сторонам автомобиля и калибровки.",
        sourceUrl: "https://teyes.com.ru/tyumen/product/cifrovye-kamery-krugovogo-obzora-teyes-digital-360-dlya-cc4-pro-kvadratnye/",
      },
    ],
  },
  {
    id: "audio-system",
    group: "Мультимедиа",
    title: "Усилитель и новая акустика",
    problem: "Нужна цельная система, а не случайная замена пары динамиков. В салоне предусмотрено несколько штатных точек.",
    result: "Собрать схему: две точки в торпедо, две в передних дверях, две в задних дверях, две у третьего ряда либо сабвуфер. Установить усилитель, проводку и настроить звук.",
    price: 18_000,
    priceLabel: "монтаж предварительно 18 000 ₽",
    breakdown: "Это оценка работы с проводкой и настройкой. Усилитель, восемь динамиков или сабвуфер подбираются и считаются отдельно.",
    confidence: "Предварительная оценка",
    status: "active",
    statusLabel: "Нужен установочный центр",
    images: [
      {
        src: "/images/barter/pajero/speaker-dashboard.webp",
        alt: "Штатная точка акустики в торпедо Mitsubishi Pajero",
        caption: "Одна из точек акустики в торпедо.",
      },
      {
        src: "/images/barter/pajero/speaker-door.webp",
        alt: "Штатная точка акустики в двери Mitsubishi Pajero",
        caption: "Дверная карта со штатной зоной динамика.",
      },
      {
        src: "/images/barter/pajero/rear-seats.webp",
        alt: "Задние ряды Mitsubishi Pajero для размещения акустики или сабвуфера",
        caption: "Зона второго и третьего рядов для финальной конфигурации.",
      },
    ],
  },
  {
    id: "alarm",
    group: "Мультимедиа",
    title: "StarLine A93 v2 или выше с автозапуском",
    problem: "Под рулём остались неизвестные элементы старой охранной системы. Новую нельзя подключать поверх непонятной проводки.",
    result: "Удалить или безопасно отключить старую систему, установить комплекс не ниже StarLine A93 v2 с интеллектуальным автозапуском и проверить блокировки. Настроить запуск с брелока, по температуре и времени; более современную S96 или E96 можно предложить как улучшение.",
    price: 25_000,
    priceLabel: "ориентир 25 000 ₽ с установкой",
    breakdown: "В фирменном центре Тюмени StarLine A93 v2 ECO стоит 11 800 ₽, версия 2CAN+2LIN ECO — 18 150 ₽. Рекомендованная установка для Тюмени по прайсу StarLine от 29.06.2026 составляет 10 000 ₽; демонтаж старой системы и нестандартные модули считаются после ревизии.",
    confidence: "Публичный прайс",
    status: "active",
    statusLabel: "Нужен автоэлектрик",
    sourceUrl: "https://starline72.ru/",
    images: [
      {
        src: "/images/barter/pajero/steering.webp",
        alt: "Зона старой сигнализации под рулём Mitsubishi Pajero",
        caption: "Перед новой установкой нужна ревизия старых подключений.",
      },
    ],
  },
  {
    id: "underbody-amg",
    group: "Техника",
    title: "Пескоструй днища, антикор и скрытые полости",
    problem: "На раме, подвеске и кронштейнах есть поверхностная коррозия. Нужна полноценная подготовка, а не нанесение состава поверх ржавчины.",
    result: "AMG выполнит пескоструй днища, антикор и обработку скрытых полостей. Работы назначены на 4 августа 2026.",
    price: 100_000,
    priceLabel: "согласованный пакет около 100 000 ₽",
    breakdown: "Стоимость исправлена по фактической договорённости с AMG и включает пескоструй. В новый калькулятор задача не входит.",
    confidence: "Согласованная стоимость",
    status: "scheduled",
    statusLabel: "В работе с AMG",
    images: [
      {
        src: "/images/barter/pajero/underbody.webp",
        alt: "Днище Mitsubishi Pajero до пескоструя и антикора",
        caption: "Состояние днища до работ AMG.",
      },
      {
        src: "/images/barter/pajero/amg-site-preview.webp",
        alt: "Сайт-прототип AMG Antikor 72, подготовленный CentrLP",
        caption: "Встречная работа CentrLP уже показана на сайте 72o.ru.",
        sourceUrl: "https://72o.ru/",
      },
    ],
  },
  {
    id: "exhaust-completed",
    group: "Техника",
    title: "Восстановление задней части выхлопа",
    problem: "Задняя оконечная часть была сгнившей, а конечная труба ранее была снята. На фото виден выхлопной тракт и соединение во время первичного осмотра.",
    result: "По подтверждению владельца задняя часть выхлопа уже восстановлена. Новый исполнитель по этой задаче не нужен.",
    price: 6_000,
    priceLabel: "рыночный ориентир выполненной работы около 6 000 ₽",
    breakdown: "Фото фиксирует состояние до закрытия задачи. После-фото и точный состав сварки или заменённых деталей пока не приложены, поэтому мы не выдумываем технологию ремонта.",
    confidence: "Предварительная оценка",
    status: "completed",
    statusLabel: "Выполнено",
    images: [
      {
        src: "/images/barter/pajero/exhaust-before.webp",
        alt: "Выхлопной тракт Mitsubishi Pajero на подъёмнике до восстановления задней части",
        caption: "Фото до закрытия задачи: участок выхлопа и фланцевое соединение на подъёмнике.",
      },
    ],
  },
];

const getCatalogPrice = (href: string, fallbackAmount: number) => {
  const label = servicePriceByHref[href]?.price || `от ${fallbackAmount.toLocaleString("ru-RU")} ₽`;
  const amountFromCatalog = Number(label.match(/\d[\d\s]*/)?.[0].replace(/\s/g, ""));

  return {
    amount: Number.isFinite(amountFromCatalog) && amountFromCatalog > 0 ? amountFromCatalog : fallbackAmount,
    label,
  };
};

const catalogDigitalPricing = {
  audit: getCatalogPrice("/proverka-saita-i-zayavok-za-48-chasov", 15_000),
  vk: getCatalogPrice("/services/vk-design", 15_000),
  analytics: getCatalogPrice("/services/web-analytics", 15_000),
  answers: getCatalogPrice("/services/auto-responses", 15_000),
  direct: getCatalogPrice("/nastroyka-yandex-direct-tyumen", 20_000),
  scripts: getCatalogPrice("/services/operator-scripts", 20_000),
  offer: getCatalogPrice("/services/offer-packaging", 25_000),
  siteMinimum: getCatalogPrice("/services/website-development", 45_000),
  seoCopy: getCatalogPrice("/services/copywriting-texts", 12_000),
  vkBot: getCatalogPrice("/services/chatbot-vk", 30_000),
};

const digitalServices: DigitalService[] = [
  {
    id: "audit",
    title: "Разбор потерь и новый путь до записи",
    href: "/proverka-saita-i-zayavok-za-48-chasov",
    price: catalogDigitalPricing.audit.amount,
    priceLabel: catalogDigitalPricing.audit.label,
    benefit: "Найдём каждое место, где сервис теряет клиента: в поиске, на сайте, в карточках или переписке. Соберём приоритетный план и новый путь, который доводит человека от интереса до звонка или записи.",
    icon: MonitorCheck,
  },
  {
    id: "vk",
    title: "ВКонтакте как полноценная витрина сервиса",
    href: "/services/vk-design",
    price: catalogDigitalPricing.vk.amount,
    priceLabel: catalogDigitalPricing.vk.label,
    benefit: "Соберём услуги, цены, реальные работы, гарантии и отзывы в убедительную витрину. Клиент сразу поймёт, что вы делаете, почему вам можно доверить автомобиль и как быстро записаться.",
    icon: MessageCircle,
  },
  {
    id: "analytics",
    title: "Веб-аналитика",
    href: "/services/web-analytics",
    price: catalogDigitalPricing.analytics.amount,
    priceLabel: catalogDigitalPricing.analytics.label,
    benefit: "Настроим цели, звонки, формы и понятные отчёты. Вы увидите, откуда пришла каждая заявка, какая услуга приносит деньги и куда больше не стоит сливать бюджет.",
    icon: Gauge,
  },
  {
    id: "answers",
    title: "Система ответа и записи 24/7",
    href: "/services/auto-responses",
    price: catalogDigitalPricing.answers.amount,
    priceLabel: catalogDigitalPricing.answers.label,
    benefit: "Соберём автоматический первый ответ, который не оставит тёплого клиента без внимания вечером или в выходной. Запросим марку, проблему, фото и контакт, чтобы мастер получил уже понятную заявку.",
    icon: MessageCircle,
  },
  {
    id: "direct",
    title: "Настройка Яндекс Директа",
    href: "/nastroyka-yandex-direct-tyumen",
    price: catalogDigitalPricing.direct.amount,
    priceLabel: catalogDigitalPricing.direct.label,
    benefit: "Соберём рекламу под самую маржинальную услугу, отсечём пустые запросы и приведём людей сразу на подготовленное предложение. Вы получите не показы ради отчёта, а управляемый источник обращений.",
    icon: Megaphone,
  },
  {
    id: "scripts",
    title: "Сильные ответы администратора и мастера",
    href: "/services/operator-scripts",
    price: catalogDigitalPricing.scripts.amount,
    priceLabel: catalogDigitalPricing.scripts.label,
    benefit: "Превратим опыт мастера в готовые ответы на вопросы о цене, сроках, гарантии и сложных случаях. Администратор перестанет импровизировать, а клиент будет быстрее понимать ценность работы и соглашаться на запись.",
    icon: Clipboard,
  },
  {
    id: "offer",
    title: "Оффер, который продаёт дорогую услугу",
    href: "/services/offer-packaging",
    price: catalogDigitalPricing.offer.amount,
    priceLabel: catalogDigitalPricing.offer.label,
    benefit: "Разберём вашу сильную услугу и упакуем её так, чтобы клиент видел не цену одной операции, а весь результат и снятый риск. Покажем, чем ваш подход сильнее соседнего сервиса и почему за него разумно платить больше.",
    icon: Sparkles,
  },
  {
    id: "site",
    title: "Сайт и система заявок под ключ",
    href: "/services/website-development",
    price: 80_000,
    priceLabel: `${catalogDigitalPricing.siteMinimum.label.replace(/^от\s+/i, "")} — минимальный формат; 80 000 ₽ — типовой сайт`,
    benefit: "Спроектируем полноценный многостраничный сайт под реальные услуги сервиса: структура, тексты, фото, доверие, SEO, заявки и аналитика. Построим цифрового продавца, который объясняет ценность и приводит клиента к записи.",
    icon: Globe2,
  },
  {
    id: "seo-copy",
    title: "Отдельная страница под прибыльную услугу",
    href: "/services/copywriting-texts",
    price: catalogDigitalPricing.seoCopy.amount,
    priceLabel: catalogDigitalPricing.seoCopy.label,
    benefit: "Соберём отдельную сильную страницу под одну прибыльную услугу: запрос клиента, процесс, цена, доказательства и понятный следующий шаг. Она будет одновременно продавать человеку и давать поиску точную точку входа.",
    icon: Sparkles,
  },
  {
    id: "vk-bot",
    title: "Чат-бот ВКонтакте",
    href: "/services/chatbot-vk",
    price: catalogDigitalPricing.vkBot.amount,
    priceLabel: catalogDigitalPricing.vkBot.label,
    benefit: "Соберём сценарий и запустим бота, который уточнит марку, проблему, фото и удобное время, ответит на типовые вопросы и передаст мастеру готовую карточку обращения. Клиент не потеряется между первым сообщением и записью.",
    icon: MessageCircle,
  },
];

const priceSources = [
  ["АвтоКлимат", "https://carclimate.ru/news/%D1%86%D0%B5%D0%BD%D1%8B-%D0%BD%D0%B0-%D0%B7%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BA%D1%83-%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82-%D0%BE%D0%B1%D1%81%D0%BB%D1%83%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5/"],
  ["А-Бренд", "https://autoservice72.ru/"],
  ["REAKTOR", "https://tyumen.reaktor24.ru/service/repair/repair_electrics/"],
  ["Перетяжка72", "https://peretyazhka72.ru/ceny/"],
  ["Royal Detailing", "https://royaldetailing72.ru/"],
  ["Auberg, бронеплёнка", "https://auberg.pro/kuzov/okleika-antigraviynoi-plenkoi/"],
  ["Xenonshop72, бронеплёнка на фары", "https://xenonshop72.ru/services/bronirovanie-far-zashchitnoy-plenkoy-/"],
  ["ТонировкаПрофи", "https://tonirovka-72.ru/price"],
  ["Действующие требования к тонировке", "https://www.consultant.ru/document/cons_doc_LAW_518324/a55e4bdd7cb36a689c21e538b92bec8bf21e5ec7/"],
  ["Автоковрик, EVA по лекалам", "https://kovrik72.ru/"],
  ["Teyes Тюмень", "https://install.teyes72.ru/"],
  ["TEYES CC4 Pro 12/256", "https://teyes.com.ru/product/planshet-teyes-cc4-pro-12-256-9-dyujmov/"],
  ["TEYES Digital 360", "https://teyes.com.ru/yakutsk/product/kamery-krugovogo-obzora-teyes-digital-360-dlya-cc4-pro/"],
  ["TEYES 360 + ADAS", "https://teyes.com.ru/product/komplekt-krugovogo-obzora-teyes-360-ahd-adas-dlya-cc4-pro/"],
  ["Фирменный центр StarLine в Тюмени", "https://starline72.ru/"],
  ["StarLine, прайс оборудования и установки от 29.06.2026", "https://starline.ru/wp-content/uploads/latest_prices.pdf"],
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
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<RepairFilter>("Все");
  const [calculatorFilter, setCalculatorFilter] = useState<RepairFilter>("Детейлинг");
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const [activeSection, setActiveSection] = useState<PageSection>("problems");
  const [calculatorSide, setCalculatorSide] = useState<CalculatorSide>("vehicle");

  useEffect(() => {
    const previousHtmlOverflowX = document.documentElement.style.overflowX;
    const previousBodyOverflowX = document.body.style.overflowX;
    document.documentElement.style.overflowX = "clip";
    document.body.style.overflowX = "clip";

    const title = "Pajero 1991: ремонт в обмен на сайт и заявки | CentrLP";
    const description =
      "Частное предложение для СТО и детейлинга: реальные задачи Mitsubishi Pajero, фото, рыночные ориентиры и калькулятор равноценного обмена на услуги CentrLP.";
    const canonical = "https://barter.centrlp.ru/";
    const preview = "https://barter.centrlp.ru/images/barter/pajero/pajero-side.webp";

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    const canonicalElement = setMeta('link[rel="canonical"]', "href", canonical);
    canonicalElement.setAttribute("rel", "canonical");
    const favicon32 = setMeta('link[rel="icon"][sizes="32x32"]', "href", "/favicon-32x32.png?v=20260717");
    favicon32.setAttribute("rel", "icon");
    favicon32.setAttribute("type", "image/png");
    favicon32.setAttribute("sizes", "32x32");
    const favicon16 = setMeta('link[rel="icon"][sizes="16x16"]', "href", "/favicon-16x16.png?v=20260717");
    favicon16.setAttribute("rel", "icon");
    favicon16.setAttribute("type", "image/png");
    favicon16.setAttribute("sizes", "16x16");
    const appleIcon = setMeta('link[rel="apple-touch-icon"]', "href", "/apple-touch-icon.png?v=20260717");
    appleIcon.setAttribute("rel", "apple-touch-icon");
    appleIcon.setAttribute("sizes", "180x180");
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

    return () => {
      document.documentElement.style.overflowX = previousHtmlOverflowX;
      document.body.style.overflowX = previousBodyOverflowX;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id as PageSection);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.1, 0.5] },
    );

    pageSections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const activeRepairJobs = useMemo(() => repairJobs.filter((job) => job.status === "active"), []);
  const closedRepairJobs = useMemo(() => repairJobs.filter((job) => job.status !== "active"), []);
  const filteredRepairJobs = useMemo(
    () => activeFilter === "Все" ? activeRepairJobs : activeRepairJobs.filter((job) => job.group === activeFilter),
    [activeFilter, activeRepairJobs],
  );
  const calculatorRepairJobs = useMemo(
    () => calculatorFilter === "Все" ? activeRepairJobs : activeRepairJobs.filter((job) => job.group === calculatorFilter),
    [calculatorFilter, activeRepairJobs],
  );
  const selectedRepairJobs = useMemo(
    () => activeRepairJobs.filter((job) => selectedJobs.includes(job.id)),
    [activeRepairJobs, selectedJobs],
  );

  const repairTotal = useMemo(
    () => selectedRepairJobs.reduce((sum, job) => sum + job.price, 0),
    [selectedRepairJobs],
  );

  const selectedDigitalServices = useMemo(
    () => digitalServices.filter((service) => selectedServiceIds.includes(service.id)),
    [selectedServiceIds],
  );
  const serviceTotal = selectedDigitalServices.reduce((sum, service) => sum + service.price, 0);
  const availableBalance = Math.max(0, repairTotal - serviceTotal);
  const centrlpBonus = Math.max(0, serviceTotal - repairTotal);

  const toggleJob = (id: string) => {
    const selectedJob = activeRepairJobs.find((job) => job.id === id);
    if (!selectedJob) return;

    setSelectedJobs((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);

      const withoutAlternative = selectedJob.exclusiveGroup
        ? current.filter((item) => {
            const other = activeRepairJobs.find((job) => job.id === item);
            return other?.exclusiveGroup !== selectedJob.exclusiveGroup;
          })
        : current;

      return [...withoutAlternative, id];
    });
    setCopyState("idle");
  };

  const toggleService = (id: string) => {
    setSelectedServiceIds((current) => (
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    ));
    setCopyState("idle");
  };

  const selectMaximumPackage = () => {
    if (repairTotal <= 0) return;
    setSelectedServiceIds(buildEquivalentServices(repairTotal).map((service) => service.id));
    setCopyState("idle");
  };

  const showCalculatorSide = (side: CalculatorSide) => {
    setCalculatorSide(side);
    window.requestAnimationFrame(() => {
      document.getElementById("calculator-choice")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const showParitySummary = () => {
    setCalculatorSide("parity");
    window.requestAnimationFrame(() => {
      document.getElementById("calculator-choice")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const copySelection = async () => {
    if (selectedRepairJobs.length === 0 || selectedDigitalServices.length === 0) return;

    setCopyState("copying");
    const summary = [
      "Предварительный вариант взаимозачёта по Pajero 1991",
      "",
      "Автомобильные работы:",
      ...selectedRepairJobs.map((job) => `- ${job.title}: ${job.priceLabel}`),
      `Итого по ориентиру: ${money.format(repairTotal)} ₽`,
      "",
      "Что партнёр выбрал у CentrLP:",
      ...selectedDigitalServices.map((service) => `- ${service.title}: ${service.priceLabel}`),
      `Итого по прайсу CentrLP: ${money.format(serviceTotal)} ₽`,
      `Разница по открытому прайсу: ${money.format(Math.abs(serviceTotal - repairTotal))} ₽ ${serviceTotal >= repairTotal ? "в пользу партнёра" : "доступно для расширения пакета CentrLP"}`,
      "",
      "Доплаты со стороны партнёра не просим: если выбранный пакет CentrLP немного дороже авторабот, берём разницу на себя и фиксируем максимум полезного объёма в первом совместном кейсе.",
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
        <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <a href="https://centrlp.ru/" className="flex items-center gap-3" aria-label="CentrLP, основной сайт">
            <img
              src="/images/brand/centrlp-logo-48.webp"
              alt="CentrLP"
              width={48}
              height={48}
              className="h-11 w-11 shrink-0 rounded-full object-contain"
            />
            <span>
              <strong className="block text-sm tracking-[-0.02em]">CentrLP</strong>
              <span className="hidden text-xs text-[#aeb5b7] sm:block">частное предложение по Pajero</span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="tel:+79058248564"
              className="hidden min-h-11 items-center gap-2 px-3 text-sm font-semibold text-[#d9dddd] transition-colors hover:text-white sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              8-905-824-85-64
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOIJUiQnWdiLFouZRo0yILV-MOKhbvF8RIwhar0TNMO6tUYnxTI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f3a712] px-4 text-sm font-black text-[#111315] transition-transform active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              Написать в MAX
            </a>
          </div>
        </div>

        <nav className="border-t border-white/10" aria-label="Разделы предложения">
          <div className="mx-auto grid max-w-[920px] grid-cols-3 px-2 sm:px-6">
            {pageSections.map(({ id, desktopLabel, mobileLabel, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setActiveSection(id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative flex min-h-12 items-center justify-center gap-2 px-2 text-center text-xs font-black transition-colors sm:text-sm ${
                    isActive ? "text-white" : "text-[#929a9d] hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#ffd36d]" : "text-[#737d80]"}`} />
                  <span className="sm:hidden">{mobileLabel}</span>
                  <span className="hidden sm:inline">{desktopLabel}</span>
                  <span
                    className={`absolute inset-x-2 bottom-0 h-0.5 transition-colors ${isActive ? "bg-[#f3a712]" : "bg-transparent"}`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="mx-auto grid min-h-[calc(100dvh-7rem)] max-w-[1400px] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-14">
            <div className="relative z-10 max-w-2xl">
              <p className="mb-5 max-w-max rounded-full border border-[#f3a712]/35 bg-[#f3a712]/10 px-4 py-2 text-sm font-semibold text-[#ffd36d]">
                Mitsubishi Pajero II, 1991, 3.0 V6
              </p>
              <h1 className="max-w-[18ch] text-balance text-[clamp(2.8rem,4.5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-white">
                Вы закрываете задачу по Pajero. Мы усиливаем ваш сервис
              </h1>
              <p className="mt-6 max-w-[58ch] text-pretty text-lg leading-8 text-[#c9ced0]">
                Отметьте, что можете сделать с автомобилем, и сами выберите, что хотите получить для бизнеса. Мы соберём максимально полный пакет: сайт, заявки, упаковку, рекламу и автоматизацию. Без накрутки и доплаты с вашей стороны.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#calculator"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f3a712] px-6 font-black text-[#111315] transition-transform active:scale-[0.98]"
                >
                  Собрать свой вариант обмена
                  <Calculator className="h-5 w-5" />
                </a>
                <a
                  href="#problems"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6 font-bold text-white transition-colors hover:border-white/50"
                >
                  Выбрать автоработы
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-6 text-[#929a9d]">
                С вашей стороны нужны честная смета и понятный результат по автомобилю. С нашей стороны будет открытый прайс и максимум полезной работы, которую можно реально запустить в вашем бизнесе.
              </p>
            </div>

            <figure className="relative lg:justify-self-end">
              <div className="absolute -inset-8 -z-10 bg-[#f3a712]/10 blur-3xl" aria-hidden="true" />
              <img
                src="/images/barter/pajero/pajero-side.webp"
                alt="Серебристый Mitsubishi Pajero второго поколения, вид сбоку"
                width={1280}
                height={960}
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
              ["Принцип", "Вы выбираете обе стороны обмена. Если наш пакет немного дороже, доплаты не просим"],
              ["Продолжение", "Если кейс сработает, развитие сайта и рекламы уже на платной основе"],
            ].map(([title, text]) => (
              <div key={title} className="border-t border-white/20 pt-4">
                <p className="font-black text-white">{title}</p>
                <p className="mt-2 max-w-[36ch] text-sm leading-6 text-[#aeb5b7]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="problems" className="scroll-mt-28 border-b border-white/10 py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#25332b] px-4 py-2 text-sm font-bold text-[#a8e6bd]">
                <CheckCircle2 className="h-4 w-4" />
                Прогресс уже есть
              </div>
              <h2 className="mt-5 text-balance text-4xl font-black tracking-[-0.035em] text-white sm:text-6xl">
                Закрытые и взятые в работу кейсы
              </h2>
              <p className="mt-5 max-w-[66ch] text-lg leading-8 text-[#b9c0c2]">
                Их не прячем: они показывают, что обмен уже работает. Но повторно выбрать эти задачи в калькуляторе нельзя.
              </p>
            </div>

            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {closedRepairJobs.map((job, index) => (
                <article key={job.id} className="grid gap-8 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className={`grid gap-3 ${job.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
                      {job.images.map((image, imageIndex) => (
                        <figure key={image.src} className={imageIndex === 0 && job.images.length > 2 ? "sm:col-span-2" : ""}>
                          {image.sourceUrl ? (
                            <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="group block">
                              <img
                                src={image.src}
                                alt={image.alt}
                                width={1280}
                                height={960}
                                className="aspect-[4/3] w-full rounded-[14px] object-cover transition-transform group-active:scale-[0.99]"
                                loading="lazy"
                              />
                            </a>
                          ) : (
                            <img
                              src={image.src}
                              alt={image.alt}
                              width={1280}
                              height={960}
                              className="aspect-[4/3] w-full rounded-[14px] object-cover"
                              loading="lazy"
                            />
                          )}
                          <figcaption className="mt-2 text-sm leading-6 text-[#899295]">{image.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
                      <span className="rounded-full bg-[#26342c] px-3 py-1 text-[#9fe2b1]">{job.statusLabel}</span>
                      <span className="text-[#899295]">{job.group}</span>
                    </div>
                    <h3 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#929b96] line-through decoration-[#8bdd9f] decoration-2 sm:text-4xl">
                      {job.title}
                    </h3>
                    <p className="mt-5 leading-7 text-[#aeb5b7]"><strong className="text-white">Было:</strong> {job.problem}</p>
                    <p className="mt-3 leading-7 text-[#c7ceca]"><strong className="text-white">Статус:</strong> {job.result}</p>
                    <p className="mt-5 text-xl font-black text-[#a8e6bd]">{job.priceLabel}</p>
                    <p className="mt-3 rounded-[14px] bg-[#171c1a] p-4 text-sm leading-6 text-[#98a39d]">{job.breakdown}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111415] py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="max-w-[16ch] text-balance text-4xl font-black tracking-[-0.035em] text-white sm:text-6xl">
                  Каждая задача отдельно
                </h2>
                <p className="mt-5 max-w-[68ch] text-lg leading-8 text-[#abb3b5]">
                  Тормоза, ручник, рулевой люфт и шины больше не смешаны. У каждого кейса есть симптом, ожидаемый результат, фото и свой ориентир стоимости.
                </p>
              </div>
              <a
                href="#calculator"
                className="inline-flex min-h-12 w-max items-center gap-2 rounded-full border border-[#f3a712]/45 px-5 font-black text-[#ffd36d] transition-colors hover:border-[#f3a712]"
              >
                Перейти к расчёту
                <Calculator className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-9 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Фильтр задач">
              {(["Все", ...repairGroups] as RepairFilter[]).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-black transition-colors ${
                    activeFilter === filter
                      ? "bg-[#f3a712] text-[#111315]"
                      : "border border-white/15 text-[#c8cdcf] hover:border-white/35"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {filteredRepairJobs.map((job, index) => (
                <article key={job.id} className="grid gap-8 py-10 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:items-start">
                  <div className={`order-2 ${index % 3 === 2 ? "lg:order-2" : "lg:order-1"}`}>
                    {job.id === "vinyl-wrap" ? (
                      <p className="mb-3 text-sm font-black text-[#ffd36d] lg:hidden">Листайте варианты оклейки</p>
                    ) : null}
                    <div
                      className={job.id === "vinyl-wrap"
                        ? "flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0"
                        : `grid gap-3 ${job.images.length > 1 ? "grid-cols-2" : ""}`}
                    >
                      {job.images.map((image, imageIndex) => {
                        const photo = (
                          <img
                            src={image.src}
                            alt={image.alt}
                            width={1280}
                            height={960}
                            className={`w-full rounded-[14px] object-cover ${imageIndex === 0 && job.images.length > 2 ? "aspect-[16/10]" : "aspect-[4/3]"}`}
                            loading="lazy"
                          />
                        );

                        return (
                          <figure
                            key={`${job.id}-${image.src}`}
                            className={`${job.id === "vinyl-wrap" ? "min-w-[86%] snap-start lg:min-w-0" : ""} ${imageIndex === 0 && job.images.length > 2 ? "lg:col-span-2" : ""}`}
                          >
                            {image.sourceUrl ? (
                              <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="block transition-opacity hover:opacity-90">
                                {photo}
                              </a>
                            ) : photo}
                            <figcaption className="mt-2 text-xs leading-5 text-[#818b8e]">{image.caption}</figcaption>
                          </figure>
                        );
                      })}
                    </div>
                  </div>

                  <div className={`order-1 ${index % 3 === 2 ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
                      <span className="rounded-full bg-[#242a2b] px-3 py-1 text-[#d4dadb]">{job.group}</span>
                      <span className="text-[#f3a712]">{job.statusLabel}</span>
                    </div>
                    <h3 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">{job.title}</h3>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#788285]">Что происходит</p>
                        <p className="mt-2 leading-7 text-[#aeb5b7]">{job.problem}</p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#788285]">Какой нужен результат</p>
                        <p className="mt-2 leading-7 text-[#d2d7d8]">{job.result}</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[14px] bg-[#171b1c] p-4">
                      <p className="text-xl font-black text-[#ffd36d]">{job.priceLabel}</p>
                      <p className="mt-2 text-sm leading-6 text-[#929c9e]">{job.breakdown}</p>
                      <p className="mt-2 text-xs font-bold text-[#828c8f]">{job.confidence}</p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => toggleJob(job.id)}
                        className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-black transition-colors ${
                          selectedJobs.includes(job.id)
                            ? "bg-[#f3a712] text-[#111315]"
                            : "border border-white/20 text-white hover:border-[#f3a712]/70"
                        }`}
                      >
                        {selectedJobs.includes(job.id) ? <Check className="h-4 w-4" /> : <CircleDollarSign className="h-4 w-4" />}
                        {selectedJobs.includes(job.id) ? "Добавлено в расчёт" : "Добавить в расчёт"}
                      </button>
                      {job.sourceUrl ? (
                        <a
                          href={job.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-bold text-[#aeb5b7] transition-colors hover:text-[#ffd36d]"
                        >
                          Источник цены
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="offer" className="scroll-mt-28 border-b border-white/10 py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div>
              <h2 className="text-balance text-[clamp(2.25rem,4vw,3.4rem)] font-black leading-[1.02] tracking-[-0.035em] text-white xl:whitespace-nowrap">
                Построим систему, которая приводит к записи
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#abb3b5]">
                Мы сами найдём потери, соберём услуги, упакуем доказательства, настроим путь клиента и запустим нужные каналы. Ниже можно выбрать конкретные результаты, а не абстрактные обещания или набор файлов ради отчёта.
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
                      className="inline-flex min-h-11 items-center gap-2 font-bold text-[#dfe3e4] transition-colors hover:text-[#ffd36d] sm:justify-self-end"
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

        <section id="calculator" className="scroll-mt-28 border-b border-white/10 bg-[#141819] py-20 lg:py-28">
          <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 text-[#ffd36d]">
                <Calculator className="h-7 w-7" />
                <span className="text-lg font-black">Интерактивный выбор обмена</span>
              </div>
              <h2 className="mt-4 text-balance text-4xl font-black tracking-[-0.035em] text-white sm:text-6xl">
                Соберите свой вариант обмена
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#abb3b5]">
                Слева отметьте работы с Pajero. Справа выберите нужный результат для вашего сервиса. Ниже сразу увидите стоимость обеих сторон и разницу.
              </p>
            </div>

            <div id="calculator-choice" className="scroll-mt-28">
              <div className="sticky top-28 z-20 -mx-2 mt-8 bg-[#141819]/95 px-2 py-3 backdrop-blur-md xl:hidden">
                <div className="grid grid-cols-3 rounded-[14px] bg-[#0d1011] p-1" role="tablist" aria-label="Этап расчёта обмена">
                  <button
                    id="vehicle-tab"
                    type="button"
                    role="tab"
                    aria-selected={calculatorSide === "vehicle"}
                    aria-controls="vehicle-panel"
                    data-calculator-side="vehicle"
                    onClick={() => showCalculatorSide("vehicle")}
                    className={`min-h-14 rounded-[10px] px-2 text-sm font-black transition-colors ${
                      calculatorSide === "vehicle" ? "bg-[#f3a712] text-[#111315]" : "text-[#aeb5b7]"
                    }`}
                  >
                    <span className="block">Pajero</span>
                    <span className="mt-0.5 block text-[11px] font-bold opacity-70">{selectedRepairJobs.length} / {money.format(repairTotal)} ₽</span>
                  </button>
                  <button
                    id="centrlp-tab"
                    type="button"
                    role="tab"
                    aria-selected={calculatorSide === "centrlp"}
                    aria-controls="centrlp-panel"
                    data-calculator-side="centrlp"
                    onClick={() => showCalculatorSide("centrlp")}
                    className={`min-h-14 rounded-[10px] px-2 text-sm font-black transition-colors ${
                      calculatorSide === "centrlp" ? "bg-[#f3a712] text-[#111315]" : "text-[#aeb5b7]"
                    }`}
                  >
                    <span className="block">CentrLP</span>
                    <span className="mt-0.5 block text-[11px] font-bold opacity-70">{selectedDigitalServices.length} / {money.format(serviceTotal)} ₽</span>
                  </button>
                  <button
                    id="parity-tab"
                    type="button"
                    role="tab"
                    aria-selected={calculatorSide === "parity"}
                    aria-controls="parity-summary"
                    data-calculator-side="parity"
                    onClick={showParitySummary}
                    className={`min-h-14 rounded-[10px] px-2 text-sm font-black transition-colors ${
                      calculatorSide === "parity" ? "bg-[#f3a712] text-[#111315]" : "text-[#aeb5b7]"
                    }`}
                  >
                    <span className="block">Паритет</span>
                    <span className="mt-0.5 block text-[11px] font-bold opacity-70">Δ {money.format(Math.abs(serviceTotal - repairTotal))} ₽</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 grid min-w-0 items-start gap-6 xl:grid-cols-2">
                <section
                  id="vehicle-panel"
                  role="tabpanel"
                  aria-labelledby="vehicle-tab"
                  className={`${calculatorSide === "vehicle" ? "block" : "hidden"} min-w-0 rounded-[14px] bg-[#0d1011] p-4 sm:p-6 xl:block xl:p-7`}
                >
                  <div className="flex flex-col items-start gap-4 sm:flex-row">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#f3a712]/10 text-[#ffd36d]">
                      <Wrench className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-black text-[#ffd36d]">Работы с автомобилем</p>
                      <h3 className="mt-1 text-2xl font-black tracking-[-0.025em] text-white sm:text-3xl">Что вы готовы сделать для Pajero</h3>
                      <p className="mt-3 max-w-[64ch] leading-7 text-[#aeb5b7]">
                        Выберите свой профиль или отдельные задачи. Каждая работа считается отдельно, выбранные пункты сохраняются при смене категории.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2" aria-label="Профиль работ в калькуляторе">
                    {(["Все", ...repairGroups] as RepairFilter[]).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        data-calculator-filter={filter}
                        aria-pressed={calculatorFilter === filter}
                        onClick={() => setCalculatorFilter(filter)}
                        className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-black transition-colors ${
                          calculatorFilter === filter
                            ? "bg-[#f3a712] text-[#111315]"
                            : "border border-white/15 text-[#c6ccce] hover:border-white/35"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <fieldset className="mt-5 min-w-0">
                    <legend className="mb-4 flex w-full items-center justify-between gap-4 text-xl font-black text-white">
                      <span>{calculatorFilter === "Все" ? "Все работы" : calculatorFilter}</span>
                      <span className="text-sm font-bold text-[#8f989a]">{calculatorRepairJobs.length} позиций</span>
                    </legend>
                    <div className="grid min-w-0 gap-3 2xl:grid-cols-2">
                      {calculatorRepairJobs.map((job) => {
                        const checked = selectedJobs.includes(job.id);
                        return (
                          <label
                            key={job.id}
                            className={`min-w-0 cursor-pointer rounded-[14px] p-4 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#ffd36d] ${
                              checked ? "bg-[#f3a712] text-[#111315]" : "bg-[#202526] text-white hover:bg-[#272d2e]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              data-job-id={job.id}
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
                            <span className={`mt-2 block text-sm leading-6 ${checked ? "text-[#303637]" : "text-[#aeb5b7]"}`}>
                              {job.result}
                            </span>
                            <span className={`mt-3 block text-xs font-bold ${checked ? "text-[#3f4647]" : "text-[#8d9698]"}`}>
                              {job.confidence}{job.exclusiveGroup ? ", альтернативный вариант" : ""}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <button
                    type="button"
                    onClick={() => showCalculatorSide("centrlp")}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f3a712] px-5 font-black text-[#111315] active:scale-[0.98] xl:hidden"
                  >
                    Выбрать результат CentrLP
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </section>

                <section
                  id="centrlp-panel"
                  role="tabpanel"
                  aria-labelledby="centrlp-tab"
                  className={`${calculatorSide === "centrlp" ? "block" : "hidden"} min-w-0 rounded-[14px] bg-[#0d1011] p-4 sm:p-6 xl:block xl:p-7`}
                >
                  <div className="flex flex-col items-start gap-4 sm:flex-row">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#f3a712]/10 text-[#ffd36d]">
                      <Globe2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-black text-[#ffd36d]">Результат для бизнеса</p>
                      <h3 className="mt-1 text-2xl font-black tracking-[-0.025em] text-white sm:text-3xl">Что вы хотите получить от CentrLP</h3>
                      <p className="mt-3 max-w-[64ch] leading-7 text-[#aeb5b7]">
                        Отметьте нужные услуги сами или разрешите калькулятору собрать максимальный пакет по стоимости выбранных авторабот.
                      </p>
                      <p className="mt-3 max-w-[64ch] text-sm leading-6 text-[#8f989a]">
                        Расчёт синхронизирован с{" "}
                        <a
                          href="https://centrlp.ru/prices"
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-[#ffd36d] underline decoration-[#ffd36d]/40 underline-offset-4 hover:decoration-[#ffd36d]"
                        >
                          актуальным прайсом CentrLP
                        </a>
                        . Для сайта в паритете используется типовая стоимость 80 000 ₽; 45 000 ₽ — только минимальный формат.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      data-action="auto-package"
                      onClick={selectMaximumPackage}
                      disabled={repairTotal <= 0}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f3a712] px-5 text-sm font-black text-[#111315] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Подобрать максимум без доплаты
                    </button>
                    <button
                      type="button"
                      data-action="clear-services"
                      onClick={() => {
                        setSelectedServiceIds([]);
                        setCopyState("idle");
                      }}
                      disabled={selectedServiceIds.length === 0}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-bold text-white transition-colors hover:border-white/45 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Сбросить выбор
                    </button>
                  </div>

                  <fieldset className="mt-5 min-w-0">
                    <legend className="mb-4 flex w-full items-center justify-between gap-4 text-xl font-black text-white">
                      <span>Услуги CentrLP</span>
                      <span className="text-sm font-bold text-[#8f989a]">{digitalServices.length} позиций</span>
                    </legend>
                    <div className="grid min-w-0 gap-3 2xl:grid-cols-2">
                      {digitalServices.map((service) => {
                        const checked = selectedServiceIds.includes(service.id);
                        return (
                          <label
                            key={service.id}
                            className={`min-w-0 cursor-pointer rounded-[14px] p-4 transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#ffd36d] ${
                              checked ? "bg-[#f3a712] text-[#111315]" : "bg-[#202526] text-white hover:bg-[#272d2e]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              data-service-id={service.id}
                              checked={checked}
                              onChange={() => toggleService(service.id)}
                              className="sr-only"
                            />
                            <span className="flex items-start justify-between gap-3">
                              <span className="font-black leading-6">{service.title}</span>
                              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${checked ? "border-[#111315] bg-[#111315] text-[#f3a712]" : "border-white/30"}`}>
                                {checked ? <Check className="h-4 w-4" /> : null}
                              </span>
                            </span>
                            <span className={`mt-3 block text-sm font-black ${checked ? "text-[#303637]" : "text-[#ffd36d]"}`}>
                              {service.priceLabel}
                            </span>
                            <span className={`mt-2 block text-sm leading-6 ${checked ? "text-[#303637]" : "text-[#aeb5b7]"}`}>
                              {service.benefit}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <button
                    type="button"
                    onClick={showParitySummary}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f3a712] px-5 font-black text-[#111315] active:scale-[0.98] xl:hidden"
                  >
                    Посчитать паритет
                    <Calculator className="h-5 w-5" />
                  </button>
                </section>
              </div>

              <aside
                id="parity-summary"
                role="tabpanel"
                aria-labelledby="parity-tab"
                className={`${calculatorSide === "parity" ? "block" : "hidden"} mt-6 scroll-mt-52 overflow-hidden rounded-[14px] bg-[#0d1011] xl:block`}
                aria-live="polite"
              >
                <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                  <div className="bg-[#0d1011] p-5 sm:p-6">
                    <p className="text-sm font-bold text-[#9fa8aa]">Работы с Pajero</p>
                    <p className="mt-2 text-3xl font-black tracking-[-0.035em] text-white">{money.format(repairTotal)} ₽</p>
                    <p className="mt-1 text-xs leading-5 text-[#7f898c]">выбрано: {selectedRepairJobs.length}</p>
                  </div>
                  <div className="bg-[#0d1011] p-5 sm:p-6">
                    <p className="text-sm font-bold text-[#9fa8aa]">Результат CentrLP</p>
                    <p className="mt-2 text-3xl font-black tracking-[-0.035em] text-white">{money.format(serviceTotal)} ₽</p>
                    <p className="mt-1 text-xs leading-5 text-[#7f898c]">выбрано: {selectedDigitalServices.length}</p>
                  </div>
                  <div className="bg-[#0d1011] p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-[#9fa8aa]">Разница по прайсу</p>
                        <p className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#ffd36d]">{money.format(Math.abs(serviceTotal - repairTotal))} ₽</p>
                      </div>
                      <CircleDollarSign className="h-8 w-8 text-[#ffd36d]" />
                    </div>
                  </div>
                </div>

                {selectedRepairJobs.length === 0 ? (
                  <div className="p-5 text-sm leading-6 text-[#aeb5b7] sm:p-7">
                    Сначала выберите хотя бы одну работу с Pajero. Стоимость и количество сразу появятся в этом блоке.
                  </div>
                ) : selectedDigitalServices.length === 0 ? (
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                    <p className="max-w-3xl text-sm leading-6 text-[#aeb5b7]">
                      Вы выбрали {selectedRepairJobs.length} автомобильных работ. Теперь отметьте нужные услуги CentrLP или соберите максимальный пакет автоматически.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        selectMaximumPackage();
                        setCalculatorSide("centrlp");
                      }}
                      className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#f3a712] px-5 text-sm font-black text-[#111315] active:scale-[0.98]"
                    >
                      Собрать пакет
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_1fr_0.95fr] lg:gap-8">
                    <div className="min-w-0">
                      <p className="font-black text-white">Вы делаете для Pajero</p>
                      <div className="mt-4 max-h-56 space-y-3 overflow-y-auto pr-2">
                        {selectedRepairJobs.map((job) => (
                          <div key={job.id} className="flex items-start justify-between gap-4 text-sm">
                            <p className="font-bold leading-6 text-[#e6e9ea]">{job.title}</p>
                            <span className="shrink-0 font-black text-[#ffd36d]">{money.format(job.price)} ₽</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="min-w-0 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      <p className="font-black text-white">Мы делаем для вашего сервиса</p>
                      <div className="mt-4 max-h-56 space-y-3 overflow-y-auto pr-2">
                        {selectedDigitalServices.map((service) => (
                          <div key={service.id} className="flex items-start justify-between gap-4 text-sm">
                            <p className="font-bold leading-6 text-[#e6e9ea]">{service.title}</p>
                            <span className="shrink-0 font-black text-[#ffd36d]">{money.format(service.price)} ₽</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      {availableBalance > 0 ? (
                        <p className="rounded-[14px] bg-[#1f2b24] p-4 text-sm leading-6 text-[#b8e4c3]">
                          До паритета остаётся {money.format(availableBalance)} ₽. Добавим ещё полезный этап или соберём индивидуальную работу под ваш сервис.
                        </p>
                      ) : centrlpBonus > 0 ? (
                        <p className="rounded-[14px] bg-[#3a2b14] p-4 text-sm leading-6 text-[#ffe0a3]">
                          Наш пакет выше авторабот на {money.format(centrlpBonus)} ₽. Доплачивать не нужно: эту разницу берём на себя как вклад в первый совместный кейс.
                        </p>
                      ) : (
                        <p className="flex items-start gap-2 text-sm leading-6 text-[#9fd7ae]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                          Получился точный паритет по открытому прайсу. Осталось согласовать сроки и критерии результата.
                        </p>
                      )}
                      <p className="mt-4 text-sm font-bold leading-6 text-white">
                        Без накрутки и встречной доплаты. Даём максимум результата, а не вычитаем полезную работу до последнего рубля.
                      </p>
                      <button
                        type="button"
                        data-action="copy-exchange"
                        onClick={copySelection}
                        disabled={copyState === "copying"}
                        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#f3a712] px-5 text-sm font-black text-[#111315] transition-transform active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
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
                    </div>
                  </div>
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
                  Выберите обмен. Мы не будем торговаться за каждую мелочь
                </h2>
                <p className="mt-5 max-w-[64ch] text-lg leading-8 text-[#303637]">
                  Вы называете реальный объём работ, материалов и срок. Мы фиксируем максимум полезного объёма CentrLP по выбранным вами задачам. Если наш пакет немного выше по прайсу, доплату не просим: нам важнее сделать сильный совместный кейс и затем продолжить работу уже как обычные платные партнёры.
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
