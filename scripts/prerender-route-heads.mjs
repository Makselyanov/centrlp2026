import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { landingRouteMeta } from "../src/data/landingPageMeta.mjs";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const srcDir = path.join(rootDir, "src");
const appPath = path.join(srcDir, "App.tsx");
const postsDir = path.join(rootDir, "content", "posts");
const baseUrl = "https://centrlp.ru";

const ogImageMap = {
  "/": "index.png",
  "/services": "services.png",
  "/prices": "prices.png",
  "/projects": "projects.png",
  "/about": "about.png",
  "/contacts": "contacts.png",
  "/blog": "blog.png",
  "/ai": "ai.png",
  "/barter": "barter.png",
  "/cases": "cases.png",
  "/business-plans": "business-plans.png",
  "/blog/ekspress-audit-saita-net-zayavok-48-chasov": "blog.png",
  "/proverka-saita-i-zayavok-za-48-chasov": "website-development.png",
  "/razrabotka-sajtov-tyumen": "website-development.png",
  "/sozdanie-lendinga-tyumen": "website-development.png",
  "/nastroyka-yandex-direct-tyumen": "yandex-direct.png",
  "/crm-dlya-biznesa": "services/custom-crm.png",
  "/ai-avtomatizaciya-biznesa": "services/ai-systems.png",
  "/lokalnoe-seo-tyumen": "services/web-analytics.png",
};

const canonicalUrlByRoute = {
  "/services/website-development": "/razrabotka-sajtov-tyumen",
  "/services/yandex-direct": "/nastroyka-yandex-direct-tyumen",
};

const staticRouteMetaOverrides = {
  "/services/vk-ads": {
    title: "Продвижение ВКонтакте в Тюмени от 15 000 ₽ | CentrLP",
    description:
      "Комплексное продвижение бизнеса ВКонтакте в Тюмени: оформление сообщества, контент, VK Ads, UTM, аналитика и контроль заявок. От 15 000 ₽.",
  },
  "/services/custom-crm": {
    title: "Персональная CRM для бизнеса в Тюмени — от 180 000 ₽ | CentrLP",
    description:
      "Разработка персональной CRM для малого бизнеса в Тюмени от 180 000 ₽: заявки, воронка, роли, интеграции, аналитика и автоматизация под ваши процессы.",
  },
  "/services/android-app-development": {
    title: "Разработка Android-приложений под ключ для бизнеса | CentrLP",
    description:
      "Создаем Android-приложения для заявок, записи, доставки, личного кабинета и внутренних процессов: UX, API, CRM, push, аналитика и подготовка к релизу.",
  },
  "/services/ios-app-development": {
    title: "Разработка iOS-приложений для iPhone и iPad | CentrLP",
    description:
      "Проектируем и запускаем iOS-приложения для клиентов и команды: UX, дизайн экранов, личный кабинет, API/CRM, push, аналитика, TestFlight и подготовка к App Store.",
  },
};

const faqSchemaByRoute = {
  "/proverka-saita-i-zayavok-za-48-chasov": [
    {
      question: "Почему аудит нужен перед рекламой?",
      answer:
        "Реклама приводит трафик, но заявки появляются только если посадочная страница быстро объясняет предложение, вызывает доверие и удобно доводит до контакта. Аудит снижает риск тратить бюджет на страницу, которая теряет людей.",
    },
    {
      question: "Можно ли сделать только одну правку, если причина очевидна?",
      answer:
        "Да. Если проблема простая и безопасная, ее можно вынести в отдельную короткую доработку. Но сначала важно убедиться, что это действительно узкое место, а не симптом другой ошибки.",
    },
    {
      question: "Что прислать для старта?",
      answer:
        "Ссылку на сайт или карточку, город, нишу, текущие источники трафика и коротко: где вы видите потерю заявок.",
    },
    {
      question: "Что проверяется на мобильной версии?",
      answer:
        "Смотрим первый экран, читаемость, скорость, заметность кнопок, телефон, мессенджеры, форму, сообщение после отправки и отсутствие лишних шагов до контакта. В GSC мобильная видимость часто слабее десктопной, поэтому мобильный путь заявки проверяется отдельно.",
    },
    {
      question: "Можно ли после аудита сразу запустить Директ?",
      answer:
        "Да, если страница, форма и цели готовы к трафику. Если аудит показывает разрывы, сначала исправляем их, чтобы бюджет не уходил на клики без понятной заявки.",
    },
  ],
  "/razrabotka-sajtov-tyumen": [
    {
      question: "Можно ли начать с лендинга?",
      answer:
        "Да, если нужно быстро проверить одну услугу, акцию или рекламную гипотезу. Для нескольких направлений лучше проектировать сайт с разделами.",
    },
    {
      question: "Почему цена начинается от 45 000 ₽?",
      answer:
        "В стоимость входит не только верстка, но и структура, тексты первого уровня, форма, адаптив, базовая аналитика и подготовка к заявкам.",
    },
    {
      question: "Что делать после запуска?",
      answer:
        "Смотреть фактическое поведение посетителей, рекламу и заявки. Обычно сайт дорабатывается после первых данных, чтобы повышать конверсию.",
    },
  ],
  "/sozdanie-lendinga-tyumen": [
    {
      question: "Можно ли сделать лендинг быстро?",
      answer:
        "Да, если услуга и материалы уже понятны. Но даже быстрый лендинг должен пройти проверку формы, мобильной версии и аналитики.",
    },
    {
      question: "Почему лендинг нужно дорабатывать после рекламы?",
      answer:
        "До запуска есть только гипотеза. После рекламы видно, какие запросы приходят, где люди уходят и какие блоки мешают заявке.",
    },
    {
      question: "Что лучше: лендинг или многостраничный сайт?",
      answer:
        "Для одной услуги и быстрых тестов - лендинг. Для нескольких направлений, SEO и доверия на длинной дистанции - сайт.",
    },
  ],
  "/nastroyka-yandex-direct-tyumen": [
    {
      question: "Сколько стоит настройка Яндекс Директ в Тюмени?",
      answer:
        "Базовая настройка начинается от 20 000 ₽. Ведение и регулярная оптимизация начинаются от 30 000 ₽ в месяц. Рекламный бюджет оплачивается отдельно и считается после проверки посадочной, ниши и допустимой стоимости заявки.",
    },
    {
      question: "Можно ли запустить Директ без сайта?",
      answer:
        "Иногда можно вести на квиз, карточку или мессенджер, но чаще нужна посадочная страница, которая объясняет услугу, показывает цену входа и фиксирует заявки.",
    },
    {
      question: "Когда перед Директом нужен отдельный аудит сайта?",
      answer:
        "Если сайт уже получает трафик, но заявок мало, лучше сначала проверить первый экран, форму, Метрику, мобильную версию и маршрут обращения. Так рекламный бюджет не уходит на страницу, которая пока не готова к платному трафику.",
    },
  ],
  "/services/web-analytics": [
    {
      question: "Что именно нужно настроить в Метрике для заявок?",
      answer:
        "Минимум: отправку формы, клики по телефону, переходы в мессенджеры, открытие формы, ошибки отправки и ключевые CTA. Тогда видно не только посещения, но и путь до обращения.",
    },
    {
      question: "Можно ли связать аналитику с CRM?",
      answer:
        "Да. В заявку можно передавать UTM, страницу входа, источник, форму и канал обращения. Это помогает оценивать рекламу по реальным лидам, а не только по кликам.",
    },
    {
      question: "Когда настройка аналитики нужна перед рекламой?",
      answer:
        "Перед запуском Яндекс Директа или VK-рекламы, если сайт еще не показывает, какие каналы дают заявки, где ломается форма и как быстро обращение доходит до менеджера.",
    },
  ],
  "/crm-dlya-biznesa": [
    {
      question: "Нужна ли CRM, если заявок пока мало?",
      answer:
        "Если заявок мало, сначала полезно проверить сайт, рекламу и аналитику. CRM нужна, когда обращения уже есть, теряются между каналами или нужно подготовить обработку к росту трафика.",
    },
    {
      question: "Сколько стоит внедрение CRM?",
      answer:
        "Простая настройка готовой CRM с базовой связкой заявок начинается от 45 000 ₽. Персональная CRM с формами, уведомлениями, ролями, отчетами и нестандартной логикой начинается от 180 000 ₽.",
    },
    {
      question: "Можно ли связать CRM с Метрикой и рекламой?",
      answer:
        "Да. Для этого фиксируем UTM-метки, страницу входа, форму или мессенджер, статус заявки и результат обработки. Тогда сайт и реклама оцениваются не только по кликам, а по обращениям и качеству обработки.",
    },
    {
      question: "Можно ли начать с таблицы?",
      answer:
        "Да, если процесс простой. Но когда каналов несколько и важны сроки ответа, таблица быстро перестает быть управляемой.",
    },
  ],
  "/ai-avtomatizaciya-biznesa": [
    {
      question: "Можно ли внедрить AI без CRM?",
      answer:
        "Можно, если сценарий простой. Но для заявок и продаж CRM или хотя бы понятный журнал действий сильно повышают пользу и контроль.",
    },
    {
      question: "AI будет отвечать клиентам сам?",
      answer:
        "Только там, где ответы безопасны и понятны. В продажах и нестандартных ситуациях лучше использовать AI как помощника для команды.",
    },
    {
      question: "С чего начать?",
      answer:
        "С одного сценария: типовые вопросы, первичная квалификация, резюме заявки или помощник менеджера. После пилота видно, стоит ли расширяться.",
    },
  ],
  "/lokalnoe-seo-tyumen": [
    {
      question: "Сколько стоит локальное SEO в Тюмени?",
      answer:
        "Проверка локального маршрута начинается от 15 000 ₽. После аудита отдельно оцениваются обновление карточек, создание или усиление страниц услуг, аналитика и регулярная работа.",
    },
    {
      question: "Вы гарантируете позиции в Яндексе?",
      answer:
        "Нет. Позиции зависят от спроса, конкурентов, качества сайта, карточек и алгоритмов поиска. Результат оценивается по индексации, видимости, переходам, событиям и заявкам.",
    },
    {
      question: "Можно продвигаться только через Яндекс Бизнес и 2ГИС?",
      answer:
        "Карточки полезны как локальная точка входа, но для нескольких услуг обычно нужны отдельные страницы сайта, аналитика и понятная обработка обращений.",
    },
    {
      question: "Что нужно дать для старта?",
      answer:
        "Ссылки на сайт и карточки, основной телефон, перечень услуг, географию работы и доступ к обезличенным отчетам Метрики, если он есть. Пароли передавать не нужно.",
    },
    {
      question: "Когда можно оценивать результат?",
      answer:
        "Исправность ссылок, формы и событий проверяется сразу после внедрения. Изменения в карточках проходят модерацию, а поисковую динамику оценивают после переобхода и накопления данных.",
    },
  ],
};

const projectsSchemaItems = [
  {
    name: "Росомаха",
    description: "Каталог техники, который ведет к заявке.",
    url: "https://xn--80aa8ahaki9a.site",
    image: `${baseUrl}/projects/gallery/rosomaha-hero.jpg`,
  },
  {
    name: "МеталлТех",
    description: "Производственный сайт с нуля.",
    url: "https://xn----7sboc2ad7bd2a.xn--p1ai/",
    image: `${baseUrl}/projects/gallery/metallteh-hero.jpg`,
  },
  {
    name: "CRM CentrLP",
    description: "Заявки и задачи без потерь.",
    url: "https://crm.centrlp.ru/",
    image: `${baseUrl}/projects/gallery/crm-hero.jpg`,
  },
  {
    name: "SVRQ.ru",
    description: "Расчет сварочных работ по фото, голосу и тексту.",
    url: "https://svrq.ru",
    image: `${baseUrl}/projects/gallery/svrq-hero.jpg`,
  },
  {
    name: "КЛНГ.РФ",
    description: "Уборка: заявка, расчет, предложение.",
    url: "https://xn--c1andi.xn--p1ai",
    image: `${baseUrl}/projects/gallery/klng-hero.jpg`,
  },
  {
    name: "КлинингСервисХМ",
    description: "Два года единой подачи услуг.",
    url: "https://cs-hm.ru/",
    image: `${baseUrl}/projects/gallery/cshm-hero.jpg`,
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function stripMarkdownMarks(value, { trim = true } = {}) {
  const text = String(value)
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ");

  return trim ? text.trim() : text;
}

function stripInlineMarkdown(value) {
  return stripMarkdownMarks(
    String(value)
      .replace(/!\[[^\]]*]\([^)]+\)/g, "")
      .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1"),
  );
}

function renderInlineMarkdown(value) {
  const source = String(value);
  const html = [];
  const linkRegex = /(!?)\[([^\]]*)]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let lastIndex = 0;

  for (const match of source.matchAll(linkRegex)) {
    html.push(escapeHtml(stripMarkdownMarks(source.slice(lastIndex, match.index), { trim: false })));

    const isImage = match[1] === "!";
    const label = stripMarkdownMarks(match[2]);
    const href = match[3];

    if (isImage) {
      if (label) html.push(escapeHtml(label));
    } else if (/^(https?:\/\/|\/|mailto:|tel:)/i.test(href)) {
      html.push(`<a href="${escapeHtml(href)}">${escapeHtml(label || href)}</a>`);
    } else {
      html.push(escapeHtml(label || href));
    }

    lastIndex = match.index + match[0].length;
  }

  html.push(escapeHtml(stripMarkdownMarks(source.slice(lastIndex), { trim: false })));
  return html.join("");
}

function hasUnsafePublicMarker(value) {
  return /SEO-метаданные|Self-review|Target keyword|Финальный status|TODO|draft|placeholder|черновик|здесь будут|потом добавим|надо придумать|implementation plan|handoff|Codex|Claude|обсуждается/i.test(
    String(value),
  );
}

function markdownToStaticHtml(markdown, title, description, cta = {}) {
  const html = [];
  const lines = String(markdown).split(/\r?\n/);
  let paragraph = [];
  let inFence = false;
  let skippedPrimaryHeading = false;

  const flushParagraph = () => {
    const text = renderInlineMarkdown(paragraph.join(" "));
    paragraph = [];
    if (text) {
      html.push(`<p>${text}</p>`);
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      inFence = !inFence;
      flushParagraph();
      continue;
    }

    if (inFence) continue;

    if (!line) {
      flushParagraph();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      if (heading[1].length === 1 && !skippedPrimaryHeading) {
        skippedPrimaryHeading = true;
        continue;
      }
      const level = Math.max(2, Math.min(heading[1].length, 3));
      html.push(`<h${level}>${escapeHtml(stripInlineMarkdown(heading[2]))}</h${level}>`);
      continue;
    }

    if (/^\|/.test(line) || /^[-:| ]+$/.test(line)) {
      flushParagraph();
      continue;
    }

    paragraph.push(line.replace(/^>\s?/, "").replace(/^[-*]\s+/, ""));
  }

  flushParagraph();

  const intro = [
    `<h1>${escapeHtml(title)}</h1>`,
    description ? `<p>${escapeHtml(description)}</p>` : "",
  ].join("");

  const body = html.join("\n");
  const ctaTitle = cta.title || "Сайт есть, но заявок мало?";
  const ctaText = cta.text || "Проверим первый экран, форму, быстрые контакты, Метрику и путь обращения за 48 часов. На выходе будет список правок, с которых стоит начинать рост заявок.";
  const primaryCtaLabel = cta.primaryLabel || "Получить разбор за 48 часов";
  const primaryCtaHref = cta.primaryHref || "/proverka-saita-i-zayavok-za-48-chasov";
  const secondaryCtaLabel = cta.secondaryLabel || "Связаться";
  const secondaryCtaHref = cta.secondaryHref || "/contacts";
  const ctaHtml = `<section style="margin-top: 32px; padding: 22px; border: 1px solid #bae6fd; border-radius: 16px; background: #f0f9ff;">
  <h2 style="margin-top: 0;">${escapeHtml(ctaTitle)}</h2>
  <p>${escapeHtml(ctaText)}</p>
  <p><a href="${escapeHtml(primaryCtaHref)}">${escapeHtml(primaryCtaLabel)}</a> · <a href="${escapeHtml(secondaryCtaHref)}">${escapeHtml(secondaryCtaLabel)}</a></p>
</section>`;

  return `<main class="seo-static-content" data-prerender="true" style="max-width: 860px; margin: 0 auto; padding: 48px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; line-height: 1.65;">
  ${intro}
  ${body}
  ${ctaHtml}
</main>`;
}

const landingStaticSections = {
  "/proverka-saita-i-zayavok-za-48-chasov": `
  <section style="max-width: 1180px; margin: 0 auto; padding: 0 20px 70px;">
    <article style="border: 1px solid rgba(0,150,214,.16); border-radius: 20px; background: #fff; padding: 22px; box-shadow: 0 16px 42px rgba(15,23,42,.06);">
      <p style="margin: 0 0 8px; color: #008dd2; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em;">Самодиагностика за минуту</p>
      <h2 style="margin: 0 0 12px; font-size: 26px; line-height: 1.2;">Где, вероятнее всего, теряется заявка?</h2>
      <ul style="margin: 0; color: #475569;">
        <li><strong>На сайт почти не заходят:</strong> проверяем источники трафика, поисковую видимость, карточки и готовность страницы к рекламе.</li>
        <li><strong>Посетители есть, но не обращаются:</strong> проверяем первый экран, CTA, быстрые контакты, форму и мобильный путь.</li>
        <li><strong>Обращения теряются после отправки:</strong> проверяем цели, UTM, уведомления, CRM и скорость ответа.</li>
      </ul>
      <p style="margin: 16px 0 0;"><a href="/proverka-saita-i-zayavok-za-48-chasov?intent=site-audit#contact-form">Передать фокус в аудит</a></p>
    </article>
  </section>`,
  "/razrabotka-sajtov-tyumen": `
  <section style="max-width: 1180px; margin: 0 auto; padding: 0 20px 70px;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; align-items: stretch;">
      <article style="border: 1px solid rgba(0,150,214,.16); border-radius: 20px; background: #fff; padding: 22px; box-shadow: 0 16px 42px rgba(15,23,42,.06);">
        <p style="margin: 0 0 8px; color: #008dd2; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em;">Мобильный путь заявки</p>
        <h2 style="margin: 0 0 12px; font-size: 26px; line-height: 1.2;">С телефона должно быть понятно, какой сайт заказать и куда нажать</h2>
        <p style="margin: 0; color: #475569;">Проектируем короткий маршрут: выбор формата, действие, фиксация источника и передача обращения.</p>
      </article>
      <article style="border: 1px solid #e2e8f0; border-radius: 20px; background: #f8fafc; padding: 22px;">
        <h3 style="margin: 0 0 10px;">Лендинг под одну услугу</h3>
        <p style="margin: 0; color: #475569;">Быстрый запуск от 45 000 ₽: оффер, форма, телефон, мессенджеры, Метрика и готовность к рекламе. Сначала изучите <a href="/blog/sajt-pod-klyuch-chto-vhodit-tyumen">состав сайта под ключ</a> и <a href="/blog/srok-razrabotki-saita-tyumen">календарь разработки</a>, затем заполните <a href="/blog/brif-na-sozdanie-saita-tyumen">бриф на создание сайта</a>.</p>
      </article>
      <article style="border: 1px solid #e2e8f0; border-radius: 20px; background: #f8fafc; padding: 22px;">
        <h3 style="margin: 0 0 10px;">Сайт услуг для Тюмени</h3>
        <p style="margin: 0; color: #475569;">Несколько направлений, локальные запросы, доверие, контакты, FAQ и внутренняя перелинковка.</p>
      </article>
      <article style="border: 1px solid #e2e8f0; border-radius: 20px; background: #f8fafc; padding: 22px;">
        <h3 style="margin: 0 0 10px;">Сайт + CRM для заявок</h3>
        <p style="margin: 0; color: #475569;">Чтобы обращение сразу попадало менеджеру без потери источника и контекста. <a href="/blog/sajt-s-crm-zayavki-tyumen">Что передавать с сайта в CRM</a>.</p>
      </article>
    </div>
  </section>`,
  "/sozdanie-lendinga-tyumen": `
  <section style="max-width: 1180px; margin: 0 auto; padding: 0 20px 70px;">
    <article style="border: 1px solid rgba(0,150,214,.16); border-radius: 20px; background: #fff; padding: 22px; box-shadow: 0 16px 42px rgba(15,23,42,.06);">
      <p style="margin: 0 0 8px; color: #008dd2; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em;">Выбор формата</p>
      <h2 style="margin: 0 0 12px; font-size: 26px; line-height: 1.2;">Одна услуга — лендинг, несколько направлений — сайт</h2>
      <p style="margin: 0; color: #475569;">Сравните задачи, рекламу, SEO, аналитику и развитие после запуска: <a href="/blog/lending-ili-mnogostranichnyj-sajt-tyumen">лендинг или многостраничный сайт</a>. Перед покупкой трафика проверьте, <a href="/blog/sozdanie-landinga-rukovodstvo">как подготовить лендинг под Яндекс Директ</a>.</p>
    </article>
  </section>`,
  "/crm-dlya-biznesa": `
  <section style="max-width: 1180px; margin: 0 auto; padding: 0 20px 70px;">
    <article style="border: 1px solid rgba(0,150,214,.16); border-radius: 20px; background: #fff; padding: 22px; box-shadow: 0 16px 42px rgba(15,23,42,.06);">
      <p style="margin: 0 0 8px; color: #008dd2; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: .08em;">Связка с сайтом</p>
      <h2 style="margin: 0 0 12px; font-size: 26px; line-height: 1.2;">Передавайте в CRM не только контакт, но и контекст заявки</h2>
      <p style="margin: 0; color: #475569;">Страница, услуга, UTM-источник, ответственный и следующий шаг помогают не терять обращения после формы. <a href="/blog/sajt-s-crm-zayavki-tyumen">Как спроектировать сайт с передачей заявок в CRM</a>. Посмотрите <a href="/blog/stoimost-vnedreniya-crm-tyumen">состав и стоимость внедрения CRM</a>, затем сравните <a href="/blog/gotovaya-ili-personalnaya-crm-tyumen">готовую и персональную CRM</a>.</p>
    </article>
  </section>`,
};

function landingStaticHtml(title, description, routePath = "") {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const extraSection = landingStaticSections[routePath] || "";
  const commercial = commercialStaticSections[routePath];
  const commercialSection = commercial
    ? `<section style="max-width: 1180px; margin: 0 auto; padding: 10px 20px 70px;">
    <p style="font-size: 18px; color: #334155;">${escapeHtml(commercial.lead)}</p>
    ${commercial.sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2><ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`).join("")}
    <p><a href="/contacts#contact-form">Оставить заявку</a> · ${commercial.related.map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join(" · ")}</p>
  </section>`
    : "";

  return `<main class="seo-static-content" data-prerender="true" style="min-height: 100vh; margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; background: linear-gradient(135deg, #f8fcff 0%, #ffffff 46%, #e7f7ff 100%);">
  <header style="border-bottom: 1px solid rgba(15,23,42,.08); background: rgba(255,255,255,.88);">
    <div style="max-width: 1180px; margin: 0 auto; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap;">
      <a href="/" style="display: inline-flex; align-items: center; gap: 10px; color: #0f172a; font-size: 20px; font-weight: 900; text-decoration: none;">
        <span style="display: inline-flex; width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg,#0096D6,#44B78B);"></span>
        CentrLP
      </a>
      <nav style="display: flex; align-items: center; gap: 18px; flex-wrap: wrap; font-size: 14px; font-weight: 700;">
        <a href="/services" style="color: #334155; text-decoration: none;">Услуги</a>
        <a href="/prices" style="color: #334155; text-decoration: none;">Цены</a>
        <a href="/projects" style="color: #334155; text-decoration: none;">Проекты</a>
        <a href="/contacts" style="color: #008dd2; text-decoration: none;">+7 905 824-85-64</a>
      </nav>
    </div>
  </header>
  <section style="max-width: 1180px; margin: 0 auto; padding: 86px 20px 70px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 36px; align-items: center;">
    <div>
      <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 22px; padding: 9px 14px; border: 1px solid rgba(0,150,214,.22); border-radius: 999px; background: rgba(255,255,255,.86); color: #008dd2; font-size: 14px; font-weight: 800;">CentrLP для заявок и трафика</div>
      <h1 style="margin: 0 0 22px; font-size: clamp(2.2rem, 6vw, 4.6rem); line-height: .98; letter-spacing: 0; background: linear-gradient(90deg, #0096D6, #00B8FF, #0077AA); -webkit-background-clip: text; background-clip: text; color: transparent;">${safeTitle}</h1>
      <p style="max-width: 760px; margin: 0 0 30px; font-size: 20px; line-height: 1.65; color: #475569;">${safeDescription}</p>
      <p style="display: flex; flex-wrap: wrap; gap: 12px; margin: 0;">
        <a href="/contacts#contact-form" style="display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 22px; border-radius: 999px; background: #008dd2; color: #fff; font-weight: 900; text-decoration: none;">Оставить заявку</a>
        <a href="/services" style="display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 22px; border-radius: 999px; border: 1px solid rgba(0,141,210,.25); background: #fff; color: #0f172a; font-weight: 900; text-decoration: none;">Услуги CentrLP</a>
      </p>
    </div>
    <aside style="border: 1px solid rgba(0,150,214,.16); border-radius: 24px; background: rgba(255,255,255,.9); box-shadow: 0 20px 55px rgba(15,23,42,.08); padding: 26px;">
      <div style="font-size: 13px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; color: #008dd2;">Что проверяем</div>
      <ul style="margin: 18px 0 0; padding: 0; list-style: none; display: grid; gap: 12px; color: #334155; line-height: 1.55;">
        <li>Первый экран, оффер и понятность услуги.</li>
        <li>Форму, быстрые контакты и путь заявки.</li>
        <li>Метрику, события и готовность к рекламе.</li>
        <li>SEO-основу, индексацию и внутренние ссылки.</li>
      </ul>
    </aside>
  </section>
  ${extraSection}
  ${commercialSection}
  <footer style="border-top: 1px solid rgba(15,23,42,.08); background: #0f172a; color: #e2e8f0;">
    <div style="max-width: 1180px; margin: 0 auto; padding: 26px 20px; display: flex; justify-content: space-between; gap: 18px; flex-wrap: wrap; font-size: 14px;">
      <span>CentrLP: сайты, реклама, CRM и автоматизация под рост заявок.</span>
      <span><a href="/contacts" style="color: #7dd3fc; text-decoration: none;">Контакты</a> · <a href="/privacy" style="color: #7dd3fc; text-decoration: none;">Политика</a></span>
    </div>
  </footer>
</main>`;
}

const commercialStaticSections = {
  "/services/vk-ads": {
    lead: "Собираем продвижение ВКонтакте как измеримый маршрут: сообщество или сайт, контент, VK Ads, UTM и получение заявки ответственным.",
    sections: [
      {
        title: "Форматы работы",
        items: [
          "контент и ведение сообщества — от 15 000 ₽ в месяц",
          "ведение VK Ads — от 30 000 ₽ в месяц",
          "рекламный бюджет оплачивается отдельно",
        ],
      },
      {
        title: "Как проверяется результат",
        items: [
          "объявления ведут на согласованное сообщение, лид-форму или страницу",
          "ссылки размечены UTM, а целевое действие проверено контрольным обращением",
          "отчёт отделяет клики и отправки от квалифицированных заявок",
          "следующие решения принимаются по расходам, обращениям и качеству лидов",
        ],
      },
    ],
    related: [
      { label: "Цена и состав продвижения ВКонтакте", href: "/blog/prodvizhenie-biznesa-vkontakte" },
      { label: "Оформление сообщества", href: "/services/vk-design" },
      { label: "Чат-бот ВКонтакте", href: "/services/chatbot-vk" },
      { label: "Проверка пути заявки", href: "/proverka-saita-i-zayavok-za-48-chasov" },
    ],
  },
  "/nastroyka-yandex-direct-tyumen": {
    lead: "Настраиваем Яндекс Директ в Тюмени от 20 000 ₽: реклама, посадочная страница, Метрика и маршрут заявки в одной связке.",
    sections: [
      {
        title: "Что проверяем до запуска",
        items: [
          "посадочную страницу, мобильную форму, быстрые контакты и оффер",
          "категорию услуги, требования модерации и необходимые документы",
          "цели Метрики, UTM и доставку обращения ответственному",
          "структуру поиска, РСЯ, географию и минус-слова",
        ],
      },
      {
        title: "Стоимость работ",
        items: [
          "настройка Яндекс Директ — от 20 000 ₽",
          "ведение и оптимизация — от 30 000 ₽ в месяц",
          "рекламный бюджет оплачивается отдельно",
        ],
      },
    ],
    related: [
      { label: "Яндекс Директ для психолога", href: "/blog/yandex-direct-dlya-psihologa-tyumen" },
      { label: "Цена настройки Директа", href: "/blog/skolko-stoit-yandeks-direkt-v-tyumeni" },
      { label: "Проверка сайта перед рекламой", href: "/proverka-saita-i-zayavok-za-48-chasov" },
    ],
  },
  "/services/android-app-development": {
    lead: "Разрабатываем Android-приложения для бизнеса как рабочий мобильный контур: клиент оставляет заявку, видит статус, получает уведомления, а команда обрабатывает данные в CRM или админке.",
    sections: [
      {
        title: "Что входит в Android-разработку",
        items: [
          "карта сценариев, UX-прототип и дизайн ключевых экранов",
          "backend, API, админка, CRM-интеграции и роли пользователей",
          "push-уведомления, статусы, события аналитики и тестовые сборки",
          "подготовка материалов для Google Play, RuStore или корпоративного релиза",
        ],
      },
      {
        title: "Форматы старта",
        items: [
          "прототип Android-приложения - от 35 000 ₽",
          "Android MVP под главный сценарий - от 160 000 ₽",
          "Android-приложение с CRM, уведомлениями и аналитикой - от 280 000 ₽",
        ],
      },
      {
        title: "Когда Android подходит лучше",
        items: [
          "нужно приложение для массовой аудитории или сотрудников",
          "важны push, статусы, задачи, фотоотчеты или работа на разных устройствах",
          "приложение должно быть связано с CRM, сервисом и повторными обращениями",
        ],
      },
    ],
    related: [
      { label: "MVP-разработка", href: "/services/mvp-development" },
      { label: "Telegram Mini App", href: "/services/telegram-mini-app" },
      { label: "Персональная CRM", href: "/services/custom-crm" },
    ],
  },
  "/services/ios-app-development": {
    lead: "Создаем iOS-приложения для iPhone и iPad с фокусом на аккуратный UX, личный кабинет, сервисные сценарии, интеграции с CRM и подготовку к App Store.",
    sections: [
      {
        title: "Что входит в iOS-разработку",
        items: [
          "UX под iPhone и iPad, дизайн-система и ключевые состояния интерфейса",
          "backend, API, CRM-связки, push-уведомления и продуктовая аналитика",
          "TestFlight-сборка, демо-доступы, материалы, privacy и метаданные",
          "проверка критичных сценариев перед отправкой на App Store Review",
        ],
      },
      {
        title: "Форматы старта",
        items: [
          "iOS-прототип с оценкой релизных рисков - от 45 000 ₽",
          "iOS MVP под один-два ключевых сценария - от 190 000 ₽",
          "iOS-приложение с backend, CRM и аналитикой - от 320 000 ₽",
        ],
      },
      {
        title: "Когда iOS дает больше",
        items: [
          "основная аудитория пользуется iPhone и ожидает высокого качества сервиса",
          "нужен личный кабинет, документы, статусы, записи, платежи или подписочная логика",
          "важны доверие, повторные продажи и аккуратный путь клиента после первой покупки",
        ],
      },
    ],
    related: [
      { label: "Дизайн и прототипирование", href: "/services/design-prototyping" },
      { label: "MVP-разработка", href: "/services/mvp-development" },
      { label: "Персональная CRM", href: "/services/custom-crm" },
    ],
  },
  "/services/website-development": {
    lead: "Создаем сайт под ключ в Тюмени: от лендинга под одну услугу до сайта услуг с CRM, аналитикой, SEO-основой и подготовкой к рекламе.",
    sections: [
      {
        title: "Что входит в запуск сайта",
        items: [
          "структура страницы или сайта под конкретную услугу и сегмент клиентов",
          "тексты, первый экран, оффер, быстрые контакты и форма заявки",
          "базовая SEO-подготовка: title, description, canonical, sitemap и внутренняя перелинковка",
          "подключение Яндекс.Метрики, целей, событий и проверки пути заявки",
          "интеграция с CRM или подготовка маршрута заявки для отдела продаж",
        ],
      },
      {
        title: "Форматы работ",
        items: [
          "лендинг под рекламу или проверку спроса — от 45 000 ₽",
          "сайт услуг для локального бизнеса в Тюмени — от 70 000 ₽",
          "сайт с CRM, аналитикой и заявками без потерь — от 100 000 ₽",
        ],
      },
      {
        title: "Когда стоит начинать с аудита",
        items: [
          "сайт уже есть, но заявки дорогие или не приходят",
          "непонятно, где ломается путь от клика до обращения",
          "перед запуском Директа нужно проверить форму, аналитику и оффер",
        ],
      },
    ],
    related: [
      { label: "Проверка сайта и заявок за 48 часов", href: "/proverka-saita-i-zayavok-za-48-chasov" },
      { label: "Настройка Яндекс Директ", href: "/nastroyka-yandex-direct-tyumen" },
      { label: "Персональная CRM", href: "/services/custom-crm" },
    ],
  },
  "/services/yandex-direct": {
    lead: "Настраиваем и ведем Яндекс Директ для бизнеса в Тюмени так, чтобы трафик вел на готовую посадочную страницу, форму, аналитику и CRM.",
    sections: [
      {
        title: "Что проверяем до запуска рекламы",
        items: [
          "посадочную страницу, первый экран, форму и быстрые контакты",
          "цели Метрики, события формы, клики по телефону и мессенджерам",
          "семантику поиска, минус-слова, сегменты РСЯ и географию показов",
          "офферы, цены и обещания, которые видит человек после клика",
        ],
      },
      {
        title: "Форматы Директа",
        items: [
          "настройка поиска — от 20 000 ₽",
          "РСЯ и ретаргетинг — от 25 000 ₽",
          "ведение и оптимизация — от 30 000 ₽ в месяц",
        ],
      },
      {
        title: "Когда реклама не окупается",
        items: [
          "заявки уходят в общую почту или теряются без CRM",
          "нет сквозной аналитики и цели заявки в Метрике",
          "страница не отвечает на запрос пользователя и не объясняет следующий шаг",
        ],
      },
    ],
    related: [
      { label: "Аудит сайта перед рекламой", href: "/blog/audit-saita-pered-zapuskom-reklamy-v-yandekse" },
      { label: "Сколько стоит Яндекс Директ", href: "/blog/skolko-stoit-yandeks-direkt-v-tyumeni" },
      { label: "Проверить сайт перед запуском", href: "/proverka-saita-i-zayavok-za-48-chasov" },
    ],
  },
  "/services/marketing-strategy": {
    lead: "Готовим план маркетинга для бизнеса в Тюмени от 35 000 ₽: оффер, каналы, гипотезы, бюджет, приоритеты и контроль заявок.",
    sections: [
      {
        title: "Что входит в маркетинговый план",
        items: [
          "разбор продукта, сегментов клиентов и конкурентов",
          "карта каналов: сайт, Директ, ВК, Telegram, карты и повторные касания",
          "приоритеты гипотез, бюджет, сроки и ответственные точки контроля",
          "связка рекламы, сайта, CRM и аналитики для оценки заявок",
        ],
      },
      {
        title: "Когда нужен план",
        items: [
          "реклама уже идет, но непонятно, что масштабировать",
          "есть сайт и соцсети, но нет единого маршрута заявки",
          "нужно решить, куда вкладывать бюджет в ближайшие 30-90 дней",
        ],
      },
    ],
    related: [
      { label: "Цена и состав плана маркетинга", href: "/blog/plan-marketinga-cena-zakazat-tyumen" },
      { label: "Цены на услуги", href: "/prices" },
      { label: "Веб-аналитика", href: "/services/web-analytics" },
      { label: "Яндекс Директ", href: "/nastroyka-yandex-direct-tyumen" },
    ],
  },
  "/services/web-analytics": {
    lead: "Настраиваем Яндекс Метрику, цели, UTM, события формы и отчеты так, чтобы бизнес видел путь заявки от источника трафика до обработки в CRM.",
    sections: [
      {
        title: "Что входит в настройку аналитики",
        items: [
          "цели Метрики для формы, телефона, мессенджеров, CTA и ошибок отправки",
          "структура UTM для Яндекс Директа, VK, Telegram, Дзен и ручных публикаций",
          "проверка маршрута заявки: форма, уведомления, CRM или таблица лидов",
          "отчеты по источникам, страницам входа и действиям, которые ближе всего к заявке",
        ],
      },
      {
        title: "Когда аналитика нужна срочно",
        items: [
          "сайт получает трафик, но непонятно, почему мало обращений",
          "реклама уже идет, но кампании оптимизируются по кликам, а не по заявкам",
          "заявки приходят из разных каналов и теряются без единого источника данных",
        ],
      },
      {
        title: "Форматы работ",
        items: [
          "базовая настройка Метрики и целей — от 15 000 ₽",
          "расширенная аналитика с UTM, событиями и отчетами — от 30 000 ₽",
          "сквозная связка сайт, реклама и CRM — от 50 000 ₽",
        ],
      },
      {
        title: "Как проверяем настройку перед сдачей",
        items: [
          "успешная отправка формы фиксируется отдельно от ошибки и нажатия кнопки",
          "клики по телефону и мессенджерам передаются как отдельные события",
          "тестовая ссылка с UTM открывается без потери параметров",
          "контрольная заявка доходит до ответственного, CRM или журнала обращений",
        ],
      },
    ],
    related: [
      { label: "Что входит в настройку аналитики", href: "/blog/nastrojka-veb-analitiki-metrika-zayavki-tyumen" },
      { label: "Когда нужна сквозная аналитика", href: "/blog/skvoznaya-analitika-malyj-biznes-tyumen" },
      { label: "Проверка сайта и заявок", href: "/proverka-saita-i-zayavok-za-48-chasov" },
      { label: "Яндекс Директ", href: "/nastroyka-yandex-direct-tyumen" },
      { label: "CRM для бизнеса", href: "/crm-dlya-biznesa" },
    ],
  },
  "/services/custom-crm": {
    lead: "Разрабатываем персональную CRM для малого бизнеса в Тюмени от 180 000 ₽: заявки, статусы, ответственные, источники, уведомления и отчеты по воронке.",
    sections: [
      {
        title: "Какие задачи закрывает CRM",
        items: [
          "сбор заявок с сайта, форм, мессенджеров и рекламы в одном месте",
          "статусы лидов, ответственные менеджеры и контроль скорости ответа",
          "интеграции с Telegram, телефонией, почтой, n8n и внутренними сервисами",
          "отчеты для руководителя по источникам, потерям и повторным касаниям",
        ],
      },
      {
        title: "Когда нужна своя CRM",
        items: [
          "типовая CRM не повторяет реальный процесс продаж",
          "заявки теряются между каналами, чатами и менеджерами",
          "нужен личный кабинет, статусы заказов или внутренняя операционная система",
        ],
      },
      {
        title: "Персональная или готовая CRM",
        items: [
          "готовая CRM подходит для стандартной воронки и быстрого запуска",
          "персональная CRM нужна для своих ролей, сервисных этапов, документов и расчетов",
          "разработка персональной CRM начинается от 180 000 ₽ после разбора процесса и интеграций",
        ],
      },
    ],
    related: [
      { label: "CRM для малого бизнеса", href: "/crm-dlya-biznesa" },
      { label: "Готовая или персональная CRM", href: "/blog/gotovaya-ili-personalnaya-crm-tyumen" },
      { label: "Сайт с передачей заявок в CRM", href: "/razrabotka-sajtov-tyumen" },
      { label: "Веб-аналитика и цели", href: "/services/web-analytics" },
      { label: "AI-агенты для заявок", href: "/services/ai-agents" },
      { label: "n8n-автоматизация", href: "/services/n8n-automation" },
    ],
  },
  "/services/ai-agents": {
    lead: "Внедряем AI-агентов для обработки обращений, первичной квалификации, ответов клиентам и передачи подготовленных заявок в CRM.",
    sections: [
      {
        title: "Что делает AI-агент",
        items: [
          "отвечает на типовые вопросы по базе знаний и услугам",
          "собирает вводные, уточняет потребность и контактные данные",
          "классифицирует обращение и передает его менеджеру или в CRM",
          "помогает не терять заявки вечером, в выходные и при высокой нагрузке",
        ],
      },
      {
        title: "Безопасный запуск",
        items: [
          "начинаем с узкого сценария и понятных правил эскалации человеку",
          "используем вашу фактуру: услуги, FAQ, регламенты, шаблоны ответов",
          "подключаем аналитику, чтобы видеть качество диалогов и заявок",
        ],
      },
    ],
    related: [
      { label: "CRM для заявок", href: "/services/custom-crm" },
      { label: "Telegram AI-агент", href: "/services/telegram-lead-agent" },
      { label: "AI-системы", href: "/services/ai-systems" },
    ],
  },
  "/lokalnoe-seo-tyumen": {
    lead: "Проверяем локальное SEO и маршрут заявки в Тюмени от 15 000 ₽: карточки, страницы услуг, UTM, Метрика, форма и получение обращения менеджером.",
    sections: [
      {
        title: "Что входит в стартовую проверку",
        items: [
          "сверка названия, телефона, адреса, режима, услуг и сайта в Яндекс Бизнесе и 2ГИС",
          "проверка коммерческих страниц, мобильных CTA, телефона, мессенджеров и формы",
          "UTM для локальных источников, события Метрики и контрольная отправка",
          "приоритет исправлений без обещаний гарантированных позиций",
        ],
      },
      {
        title: "Что получает бизнес",
        items: [
          "карту локальных точек входа и расхождений в данных компании",
          "список страниц услуг и схему ссылок из карточек",
          "перечень событий и результат проверки пути до ответственного",
          "оценку отдельных работ по карточкам, сайту, аналитике и CRM",
        ],
      },
    ],
    related: [
      { label: "Цена и состав локального SEO", href: "/blog/lokalnoe-seo-dlya-biznesa-v-tyumeni" },
      { label: "Яндекс Бизнес, 2ГИС и сайт", href: "/blog/yandex-biznes-2gis-sait-metrika-zayavki-tyumen" },
      { label: "Отзывы в Яндекс Картах и 2ГИС", href: "/blog/otzyvy-yandex-karty-2gis-biznes-tyumen" },
      { label: "GEO-продвижение в Тюмени", href: "/blog/geo-prodvizhenie-tyumen-nejroseti-poisk" },
      { label: "Проверка сайта за 48 часов", href: "/proverka-saita-i-zayavok-za-48-chasov" },
    ],
  },
  "/services/compliance-2026": {
    lead: "Проверяем сайт, формы, cookie, Метрику и документы под требования 152-ФЗ, Роскомнадзора и безопасной обработки заявок.",
    sections: [
      {
        title: "Что входит в проверку",
        items: [
          "формы заявок, чекбоксы согласия и тексты под кнопками",
          "политика конфиденциальности, согласие на обработку и cookie-уведомления",
          "Яндекс.Метрика, пиксели, цели и сторонние сервисы на сайте",
          "маршрут заявки: куда попадают персональные данные и кто их обрабатывает",
        ],
      },
      {
        title: "Когда нужна проверка",
        items: [
          "перед запуском рекламы и ростом трафика на сайт",
          "если формы уже собирают имя, телефон, email или комментарии",
          "если сайт использует Метрику, пиксели, CRM, чаты и внешние виджеты",
        ],
      },
    ],
    related: [
      { label: "Стоимость проверки 152-ФЗ", href: "/blog/skolko-stoit-proverka-saita-152fz-rkn-2026" },
      { label: "Политика конфиденциальности", href: "/privacy" },
      { label: "Проверка сайта за 48 часов", href: "/proverka-saita-i-zayavok-za-48-chasov" },
    ],
  },
};

function routeStaticHtml(title, description, routePath) {
  const commercial = commercialStaticSections[routePath];
  if (!commercial) {
    return `<main class="seo-static-content" data-prerender="true" style="max-width: 860px; margin: 0 auto; padding: 48px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; line-height: 1.65;"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></main>`;
  }

  const sections = commercial.sections
    .map((section) => `<section>
  <h2>${escapeHtml(section.title)}</h2>
  <ul>
    ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n    ")}
  </ul>
</section>`)
    .join("\n");

  const related = commercial.related
    .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
    .join(" · ");

  return `<main class="seo-static-content" data-prerender="true" style="max-width: 920px; margin: 0 auto; padding: 48px 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; line-height: 1.65;">
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
  <p>${escapeHtml(commercial.lead)}</p>
  ${sections}
  <section style="margin-top: 32px; padding: 22px; border: 1px solid #bae6fd; border-radius: 16px; background: #f0f9ff;">
    <h2 style="margin-top: 0;">Следующий шаг</h2>
    <p>Оставьте заявку, и мы разберем сайт, рекламу, CRM или маршрут обращения под вашу задачу.</p>
    <p><a href="/contacts#contact-form">Оставить заявку</a> · ${related}</p>
  </section>
</main>`;
}

function getOgImage(pathname) {
  if (ogImageMap[pathname]) return ogImageMap[pathname];
  // For blog posts and services, we generate per-item OG images.
  // If the image doesn't exist at runtime, the layout fallback will catch it.
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    if (slug) return `posts/${slug}.png`;
    return "blog.png";
  }
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "").replace(/\/$/, "");
    if (slug) return `services/${slug}.png`;
    return "services.png";
  }
  if (pathname.startsWith("/barter/")) return "barter.png";
  return "index.png";
}

function ensureTag(html, regex, value, fallback) {
  if (regex.test(html)) {
    return html.replace(regex, value);
  }
  return html.replace("</head>", `${fallback}\n</head>`);
}

function routeUrl(routePath) {
  const canonicalPath = canonicalUrlByRoute[routePath] || routePath;
  return `${baseUrl}${canonicalPath === "/" ? "/" : canonicalPath}`;
}

function cleanSchemaName(title) {
  return String(title)
    .replace(/\s*\|\s*CentrLP\s*$/i, "")
    .replace(/\s+-\s*CentrLP\s*$/i, "")
    .trim();
}

function jsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function renderJsonLdScripts(schemas) {
  return schemas
    .filter(Boolean)
    .map(
      (schema, index) =>
        `<script type="application/ld+json" data-prerender-schema="${index}">${jsonForHtml(schema)}</script>`,
    )
    .join("\n");
}

function buildBreadcrumbSchema(meta) {
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: `${baseUrl}/`,
    },
  ];

  if (meta.path.startsWith("/blog/")) {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: "Блог",
      item: `${baseUrl}/blog`,
    });
  } else if (meta.path.startsWith("/services/")) {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: "Услуги",
      item: `${baseUrl}/services`,
    });
  }

  itemListElement.push({
    "@type": "ListItem",
    position: itemListElement.length + 1,
    name: cleanSchemaName(meta.title),
    item: routeUrl(meta.path),
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

function buildOrganizationSchema() {
  return {
    "@type": "LocalBusiness",
    name: "CentrLP",
    alternateName: [
      "CentrLP, агентство развития бизнеса",
      "Центр цифрового консалтинга CentrLP",
    ],
    legalName: "ООО «ААМХ»",
    taxID: "7203606424",
    vatID: "7203606424",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ОГРН",
      value: "1267200004818",
    },
    url: baseUrl,
    telephone: "+7-905-824-85-64",
    email: "1@centrlp.ru",
    priceRange: "от 15 000 ₽",
    sameAs: [
      "https://vk.com/centrlp",
      "https://t.me/centrlp",
      "https://t.me/centrlp_ideas",
      "https://2gis.ru/tyumen/firm/70000001033718655",
      "https://go.2gis.com/hUyea",
      "https://yandex.ru/maps/-/CLSbvKjF",
      "https://tyumen.flamp.ru/firm/centrlp_agentstvo_razvitiya_biznesa-70000001033718655",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "проезд Солнечный, 22",
      addressLocality: "Тюмень",
      postalCode: "625022",
      addressCountry: "RU",
    },
    founder: {
      "@type": "Person",
      name: "Кузнецов Максим Владимирович",
    },
  };
}

function buildArticleSchema(meta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cleanSchemaName(meta.title),
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    author: {
      "@type": "Organization",
      name: "CentrLP",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "CentrLP",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/favicon.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": routeUrl(meta.path),
    },
    inLanguage: "ru",
  };
}

function buildServiceSchema(meta) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: cleanSchemaName(meta.title),
    description: meta.description,
    provider: buildOrganizationSchema(),
    areaServed: [
      { "@type": "City", name: "Тюмень" },
      { "@type": "AdministrativeArea", name: "Тюменская область" },
      { "@type": "Country", name: "Россия" },
    ],
    url: routeUrl(meta.path),
    serviceType: cleanSchemaName(meta.title),
  };
}

function buildFaqSchema(meta) {
  const faqItems = faqSchemaByRoute[meta.path];
  if (!faqItems) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildProjectsCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Проекты CentrLP",
    url: `${baseUrl}/projects`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projectsSchemaItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: item.name,
          description: item.description,
          url: item.url,
          image: item.image,
        },
      })),
    },
  };
}

function buildJsonLdSchemas(meta) {
  if (meta.path.startsWith("/blog/")) {
    return [buildArticleSchema(meta), buildBreadcrumbSchema(meta)];
  }

  if (meta.path === "/projects") {
    return [buildProjectsCollectionSchema(), buildBreadcrumbSchema(meta)];
  }

  const faqSchema = buildFaqSchema(meta);

  if (meta.path.startsWith("/services/")) {
    return [buildServiceSchema(meta), buildBreadcrumbSchema(meta), faqSchema].filter(Boolean);
  }

  if (faqSchema) {
    return [buildServiceSchema(meta), buildBreadcrumbSchema(meta), faqSchema];
  }

  return [];
}

function applyMeta(template, meta) {
  const canonicalPath = canonicalUrlByRoute[meta.path] || meta.path;
  const canonical = `${baseUrl}${canonicalPath === "/" ? "/" : canonicalPath}`;
  const ogImageUrl = `${baseUrl}/og/${getOgImage(meta.path)}`;
  const ogType = meta.path.startsWith("/blog/") ? "article" : "website";
  let html = template;

  html = html.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(meta.title)}</title>`);
  html = ensureTag(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );
  html = ensureTag(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["'][^"']*["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="canonical" href="${canonical}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:title["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:description["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:url["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:image["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:image" content="${ogImageUrl}" />`,
    `<meta property="og:image" content="${ogImageUrl}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+property=["']og:type["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:type" content="${ogType}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+name=["']twitter:title["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+name=["']twitter:description["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="twitter:image" content="${ogImageUrl}" />`,
    `<meta name="twitter:image" content="${ogImageUrl}" />`,
  );
  html = ensureTag(
    html,
    /<meta[^>]+name=["']twitter:url["'][^>]+content=["'][^"']*["'][^>]*>/i,
    `<meta name="twitter:url" content="${canonical}" />`,
    `<meta name="twitter:url" content="${canonical}" />`,
  );

  const jsonLd = renderJsonLdScripts(buildJsonLdSchemas(meta));
  if (jsonLd) {
    html = html.replace("</head>", `${jsonLd}\n</head>`);
  }

  if (meta.staticHtml) {
    html = html.replace(
      /<div\s+id=["']root["']\s*>\s*<\/div>/i,
      `<div id="root">${meta.staticHtml}</div>`,
    );
  }

  return html;
}

function writeRouteHtml(routePath, html) {
  if (routePath === "/") {
    fs.writeFileSync(path.join(distDir, "index.html"), html, "utf8");
    return;
  }

  const outputDir = path.join(distDir, routePath.replace(/^\//, ""));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "index.html"), html, "utf8");
}

function extractImports(appSource) {
  const componentToFile = new Map();

  for (const match of appSource.matchAll(/import\s+([A-Za-z0-9_]+)\s+from\s+"([^"]+)"/g)) {
    componentToFile.set(match[1], match[2]);
  }

  for (const match of appSource.matchAll(/const\s+([A-Za-z0-9_]+)\s*=\s*lazy\(\(\)\s*=>\s*import\("([^"]+)"/g)) {
    componentToFile.set(match[1], match[2]);
  }

  return componentToFile;
}

function extractStaticRoutes(appSource) {
  const routes = [];

  for (const match of appSource.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)/g)) {
    const routePath = match[1];
    const componentName = match[2];

    if (routePath.includes(":") || routePath.includes("*")) {
      continue;
    }

    routes.push({ path: routePath, componentName });
  }

  return routes;
}

function resolveComponentFile(importPathValue) {
  const normalized = importPathValue.replace(/^\.\//, "");
  return path.join(srcDir, `${normalized}.tsx`);
}

function extractLayoutValue(fileContent, key) {
  const regex = new RegExp(`${key}\\s*=\\s*"([^"]+)"`, "s");
  return fileContent.match(regex)?.[1] || "";
}

function collectStaticRouteMeta() {
  const appSource = readText(appPath);
  const imports = extractImports(appSource);
  const routes = extractStaticRoutes(appSource);

  return routes
    .map((route) => {
      const override = staticRouteMetaOverrides[route.path];
      if (override) {
        const staticHtmlSource = `${override.title}\n${override.description}\n${commercialStaticSections[route.path]?.lead || ""}`;

        return {
          path: route.path,
          title: override.title,
          description: override.description,
          staticHtml: hasUnsafePublicMarker(staticHtmlSource)
            ? ""
            : routeStaticHtml(override.title, override.description, route.path),
        };
      }

      const importPathValue = imports.get(route.componentName);
      if (!importPathValue) return null;

      const filePath = resolveComponentFile(importPathValue);
      if (!fs.existsSync(filePath)) return null;

      const fileContent = readText(filePath);
      const title = extractLayoutValue(fileContent, "title");
      const description = extractLayoutValue(fileContent, "description");

      if (!title || !description) return null;

      const staticHtmlSource = `${title}\n${description}\n${commercialStaticSections[route.path]?.lead || ""}`;

      return {
        path: route.path,
        title,
        description,
        staticHtml: hasUnsafePublicMarker(staticHtmlSource)
          ? ""
          : routeStaticHtml(title, description, route.path),
      };
    })
    .filter(Boolean);
}

function collectBlogPostMeta() {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const raw = readText(filePath);
      const parsed = matter(raw);
      const data = parsed.data || {};
      const slug = data.slug || file.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const title = data.seoTitle || data.title || slug;
      const description = data.seoDescription || data.description || "";
      const cta = {
        title: data.ctaTitle,
        text: data.ctaText,
        primaryLabel: data.primaryCtaLabel,
        primaryHref: data.primaryCtaHref,
        secondaryLabel: data.secondaryCtaLabel,
        secondaryHref: data.secondaryCtaHref,
      };

      if (!title || !description) return null;

      const staticSource = `${title}\n${description}\n${parsed.content}`;

      return {
        path: `/blog/${slug}`,
        title,
        description,
        date: data.date || file.slice(0, 10),
        staticHtml: hasUnsafePublicMarker(staticSource)
          ? ""
          : markdownToStaticHtml(parsed.content, title, description, cta),
      };
    })
    .filter(Boolean);
}

function main() {
  const templatePath = path.join(distDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html not found: ${templatePath}`);
  }

  const template = readText(templatePath);
  const routes = [
    ...collectStaticRouteMeta(),
    ...landingRouteMeta.map((route) => ({
      ...route,
      staticHtml: landingStaticHtml(route.title, route.description, route.path),
    })),
    ...collectBlogPostMeta(),
  ];
  const staticBodyCount = routes.filter((route) => route.staticHtml).length;

  for (const route of routes) {
    const html = applyMeta(template, route);
    writeRouteHtml(route.path, html);
  }

  const rootMeta = routes.find((route) => route.path === "/");
  if (rootMeta) {
    const html = applyMeta(template, rootMeta);
    fs.writeFileSync(path.join(distDir, "404.html"), html, "utf8");
  }

  console.log(`Prerendered route heads for ${routes.length} routes; static bodies for ${staticBodyCount} routes`);
}

main();
