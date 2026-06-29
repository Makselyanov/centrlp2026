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
};

const staticRouteMetaOverrides = {
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
      const level = Math.min(heading[1].length, 3);
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

function landingStaticHtml(title, description) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

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
  <footer style="border-top: 1px solid rgba(15,23,42,.08); background: #0f172a; color: #e2e8f0;">
    <div style="max-width: 1180px; margin: 0 auto; padding: 26px 20px; display: flex; justify-content: space-between; gap: 18px; flex-wrap: wrap; font-size: 14px;">
      <span>CentrLP: сайты, реклама, CRM и автоматизация под рост заявок.</span>
      <span><a href="/contacts" style="color: #7dd3fc; text-decoration: none;">Контакты</a> · <a href="/privacy" style="color: #7dd3fc; text-decoration: none;">Политика</a></span>
    </div>
  </footer>
</main>`;
}

const commercialStaticSections = {
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
      { label: "Настройка Яндекс Директ", href: "/services/yandex-direct" },
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
    lead: "Готовим маркетинговую стратегию и план действий для бизнеса в Тюмени: оффер, каналы, гипотезы, бюджет, приоритеты и контроль заявок.",
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
      { label: "Цены на услуги", href: "/prices" },
      { label: "Веб-аналитика", href: "/services/web-analytics" },
      { label: "Яндекс Директ", href: "/services/yandex-direct" },
    ],
  },
  "/services/custom-crm": {
    lead: "Разрабатываем CRM под отдел продаж и сервис: заявки, статусы, ответственные, источники, уведомления и отчеты по воронке.",
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
    ],
    related: [
      { label: "AI-агенты для заявок", href: "/services/ai-agents" },
      { label: "n8n-автоматизация", href: "/services/n8n-automation" },
      { label: "Сайт как источник заявок", href: "/services/website-development" },
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

function applyMeta(template, meta) {
  const canonical = `${baseUrl}${meta.path === "/" ? "/" : meta.path}`;
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
      staticHtml: landingStaticHtml(route.title, route.description),
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
