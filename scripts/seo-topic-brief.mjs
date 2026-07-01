import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT_DIR, "content", "posts");
const REPORT_DIR = path.join(ROOT_DIR, "seo-reports");

const OUTPUT_JSON = path.join(REPORT_DIR, "latest-content-topic-brief.json");
const OUTPUT_MD = path.join(REPORT_DIR, "latest-content-topic-brief.md");

const COMMERCIAL_TOPICS = [
  {
    id: "crm-lead-routing-tyumen",
    priority: 96,
    kind: "commercial-support-article",
    title: "CRM для малого бизнеса в Тюмени: как не терять заявки с сайта и рекламы",
    slug: "crm-dlya-malogo-biznesa-tyumen-zayavki",
    moneyPage: "/crm-dlya-biznesa",
    secondaryPages: [
      "/services/custom-crm",
      "/services/web-analytics",
      "/proverka-saita-i-zayavok-za-48-chasov",
    ],
    targetQueries: [
      "crm для малого бизнеса тюмень",
      "внедрение crm тюмень",
      "автоматизация заявок тюмень",
      "crm для заявок с сайта",
      "как не терять заявки с рекламы",
    ],
    trendTriggers: ["персональная crm", "автоматизация", "заявки", "сайт"],
    dedupeStrong: ["crm для малого бизнеса", "внедрение crm тюмень"],
    dedupeWeak: ["crm", "заявки", "автоматизация"],
    why: [
      "Запрос ближе к заявке, чем обзорные AI-новости: у пользователя уже есть проблема с лидами и управлением продажами.",
      "На сайте есть коммерческие посадочные под CRM и аудит заявок, но нужен информационный мост из поиска.",
      "Тема поддерживает Тюмень, область и дальнейшее расширение на Россию без локального переспама.",
    ],
    outline: [
      "Почему заявки теряются между сайтом, рекламой, мессенджерами и менеджером.",
      "Какие признаки показывают, что бизнесу уже нужна CRM, а не еще одна таблица.",
      "Что должно попадать в карточку заявки: источник, страница, город, согласие, ответственный, следующий шаг.",
      "Как связать сайт, Метрику, рекламу и систему учета без тяжелого внедрения.",
      "Сколько стоит стартовый CRM-контур и с чего начать безопасно.",
    ],
  },
  {
    id: "geo-ai-search-tyumen",
    priority: 90,
    kind: "geo-llmo-article",
    title: "GEO-продвижение в Тюмени: как бизнесу попадать в ответы нейросетей и поиск",
    slug: "geo-prodvizhenie-tyumen-nejroseti-poisk",
    moneyPage: "/services/copywriting-texts",
    secondaryPages: ["/services/marketing-strategy", "/services/web-analytics", "/services/ai-systems"],
    targetQueries: [
      "geo продвижение тюмень",
      "продвижение в нейросетях",
      "как попасть в ответы нейросетей",
      "seo для нейросетей",
      "ai search optimization россия",
    ],
    trendTriggers: ["geo", "нейросети", "ai", "поиск", "seo"],
    dedupeStrong: ["geo продвижение", "ответы нейросетей", "ai search"],
    dedupeWeak: ["geo", "нейросети", "seo"],
    why: [
      "Тема растущая и хорошо связывает SEO, контент и коммерческую услугу текстов/стратегии.",
      "На сайте уже появились сигналы по GEO, но нет отдельного материала под локальный спрос.",
      "Материал можно сделать без рискованных обещаний: через структуру сайта, FAQ, сущности, цитируемость и локальные профили.",
    ],
    outline: [
      "Чем GEO отличается от обычного SEO и почему это не замена индексации.",
      "Какие страницы должны быть понятны Яндексу, Google и нейросетевым ответам.",
      "Роль локальных сигналов: город, услуги, цены, отзывы, справочники, NAP.",
      "Как писать экспертные блоки, FAQ и кейсы, чтобы их было удобно цитировать.",
      "Что проверять через Вебмастер, GSC, выдачу и живые страницы.",
    ],
  },
  {
    id: "site-crm-ai-funnel-tyumen",
    priority: 88,
    kind: "commercial-support-article",
    title: "Сайт, CRM и автоматизация заявок: что нужно бизнесу в Тюмени в 2026 году",
    slug: "sajt-crm-avtomatizaciya-zayavok-tyumen-2026",
    moneyPage: "/razrabotka-sajtov-tyumen",
    secondaryPages: ["/crm-dlya-biznesa", "/services/website-development", "/services/ai-systems"],
    targetQueries: [
      "сайт с crm тюмень",
      "сайт для заявок тюмень",
      "автоматизация продаж тюмень",
      "разработка сайта с crm",
      "сайт под ключ тюмень crm",
    ],
    trendTriggers: ["сайт", "crm", "автоматизация", "заявки"],
    dedupeStrong: ["сайт с crm", "разработка сайта с crm", "сайт crm автоматизация"],
    dedupeWeak: ["сайт", "crm", "заявки"],
    why: [
      "Коммерческий мост между разработкой сайтов и дорогими внедрениями.",
      "Помогает не повторять старую статью про цену сайта, а показать следующий уровень решения.",
      "Поддерживает внутреннюю перелинковку на сайт, CRM и AI-системы.",
    ],
    outline: [
      "Когда обычного лендинга достаточно, а когда нужен учет заявок.",
      "Какие данные должны передаваться с формы в систему продаж.",
      "Как понять, что проблема не в рекламе, а в маршруте заявки.",
      "Минимальный состав проекта: сайт, аналитика, CRM, уведомления, роли.",
      "Как запускать поэтапно, чтобы не переплатить за лишнюю разработку.",
    ],
  },
  {
    id: "local-seo-profiles-reviews-tyumen",
    priority: 82,
    kind: "local-seo-article",
    title: "Локальное SEO в Тюмени: Яндекс Бизнес, 2ГИС, отзывы и единые контакты",
    slug: "lokalnoe-seo-yandex-biznes-2gis-otzyvy-tyumen",
    moneyPage: "/services/marketing-strategy",
    secondaryPages: ["/services/copywriting-texts", "/services/web-analytics"],
    targetQueries: [
      "локальное seo тюмень",
      "яндекс бизнес продвижение тюмень",
      "2гис продвижение тюмень",
      "отзывы для продвижения бизнеса",
      "nap данные сайта",
    ],
    trendTriggers: ["локальное", "яндекс бизнес", "2гис", "отзывы", "nap"],
    dedupeStrong: ["яндекс бизнес 2гис", "nap", "отзывы локальное seo"],
    dedupeWeak: ["локальное seo", "2гис", "отзывы"],
    why: [
      "Локальные профили усиливают гео-сигналы для Тюмени и области.",
      "Материал закрывает не только статьи, но и внешний контур продвижения.",
      "Тема полезна для малого бизнеса с понятной заявочной болью.",
    ],
    outline: [
      "Почему поисковик сверяет сайт с карточками компании и справочниками.",
      "Какие данные должны совпадать: название, телефон, адрес, сайт, режим работы.",
      "Как отзывы помогают конверсии и локальному ранжированию.",
      "Что проверить в Яндекс Бизнес, 2ГИС и Google Business Profile.",
      "Как связать карточки с посадочными страницами и аналитикой.",
    ],
  },
  {
    id: "fresh-ai-release-business-automation",
    priority: 70,
    kind: "trend-article-requires-source",
    title: "Новый AI-релиз для бизнеса: практический разбор для автоматизации заявок",
    slug: "novyj-ai-reliz-avtomatizaciya-zayavok-biznes",
    moneyPage: "/services/ai-systems",
    secondaryPages: ["/services/n8n-automation", "/services/custom-crm", "/services/web-analytics"],
    targetQueries: [
      "новые нейросети для бизнеса",
      "ai автоматизация бизнеса",
      "нейросеть для обработки заявок",
      "автоматизация процессов нейросетью",
    ],
    trendTriggers: ["ai", "нейросеть", "релиз", "автоматизация", "json"],
    dedupeStrong: ["новый ai релиз", "релиз нейросети автоматизация"],
    dedupeWeak: ["ai", "нейросеть", "автоматизация"],
    requiresFreshSource: true,
    why: [
      "Хайповые темы дают быстрый инфоповод, но должны вести к услуге и быть подтверждены первоисточником.",
      "Такую тему нельзя публиковать только по пересказу из канала: нужен официальный блог, документация или надежная публикация.",
      "Если источник не подтвержден, лучше выбрать коммерческий CRM/GEO-материал.",
    ],
    outline: [
      "Что реально изменилось в релизе и где официальный источник.",
      "Какие бизнес-процессы выигрывают: структурированные ответы, разбор заявок, CRM, n8n.",
      "Где остаются риски: бюджет, ошибки, контроль результата, юридический след.",
      "Как внедрять безопасно: пилот, метрики, человек в контуре, логирование.",
      "Какая услуга CentrLP закрывает этот сценарий.",
    ],
  },
];

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return { __readError: error.message };
  }
}

function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const parsed = matter(raw);
      const slug = file.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const searchable = [
        slug,
        parsed.data.title || "",
        parsed.data.description || "",
        Array.isArray(parsed.data.tags) ? parsed.data.tags.join(" ") : "",
      ]
        .join(" ")
        .toLocaleLowerCase("ru-RU");

      return {
        file,
        slug,
        title: parsed.data.title || slug,
        date: parsed.data.date || file.slice(0, 10),
        searchable,
      };
    });
}

function isFresh(iso, maxAgeHours) {
  if (!iso) return false;
  const generated = Date.parse(iso);
  if (!Number.isFinite(generated)) return false;
  return Date.now() - generated <= maxAgeHours * 60 * 60 * 1000;
}

function extractActiveDiagnostics(report) {
  const problems = report?.diagnostics?.data?.problems || {};
  return Object.entries(problems)
    .filter(([, problem]) => problem?.state === "PRESENT")
    .map(([code, problem]) => ({
      code,
      severity: problem.severity || "",
      state: problem.state || "",
    }));
}

function summarizeYandex(report) {
  if (!report) {
    return {
      available: false,
      note: "latest-yandex-webmaster-report.json not found",
    };
  }

  if (report.__readError) {
    return {
      available: false,
      note: `Yandex report read failed: ${report.__readError}`,
    };
  }

  const activeDiagnostics = extractActiveDiagnostics(report);
  const summary = report.summary?.ok ? report.summary.data : null;

  return {
    available: true,
    fresh: isFresh(report.generatedAt, 36),
    generatedAt: report.generatedAt || "",
    host: report.host?.hostUrl || "",
    sqi: summary?.sqi ?? null,
    searchablePages: summary?.searchable_pages_count ?? null,
    excludedPages: summary?.excluded_pages_count ?? null,
    activeDiagnostics,
    tokenHealth: report.tokenHealth?.note || "",
    headChecks: Array.isArray(report.headChecks) ? report.headChecks : [],
  };
}

function extractGscRows(section) {
  if (!section?.ok) return [];
  return (section.data?.rows || []).map((row) => ({
    query: Array.isArray(row.keys) ? row.keys.join(" / ") : "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));
}

function summarizeGsc(report) {
  if (!report) {
    return {
      available: false,
      note: "latest-gsc-report.json not found",
    };
  }

  if (report.__readError) {
    return {
      available: false,
      note: `GSC report read failed: ${report.__readError}`,
    };
  }

  const total = report.totals?.ok ? report.totals.data?.rows?.[0] || null : null;

  return {
    available: true,
    fresh: isFresh(report.generatedAt, 36),
    generatedAt: report.generatedAt || "",
    siteUrl: report.siteUrl || "",
    dateRange: report.dateRange || null,
    totals: total
      ? {
          clicks: total.clicks ?? 0,
          impressions: total.impressions ?? 0,
          ctr: total.ctr ?? 0,
          position: total.position ?? 0,
        }
      : null,
    topQueries: extractGscRows(report.byQuery),
    topPages: extractGscRows(report.byPage),
    actions: Array.isArray(report.actions) ? report.actions : [],
  };
}

function normalizeText(value) {
  return String(value || "")
    .toLocaleLowerCase("ru-RU")
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findCoverage(topic, posts) {
  const strongPatterns = topic.dedupeStrong.map(normalizeText);
  const weakPatterns = topic.dedupeWeak.map(normalizeText);

  return posts
    .map((post) => {
      const haystack = normalizeText(post.searchable);
      const strongHits = strongPatterns.filter((pattern) => pattern && haystack.includes(pattern));
      const weakHits = weakPatterns.filter((pattern) => pattern && haystack.includes(pattern));
      const isCovered = strongHits.length > 0 || weakHits.length >= Math.min(2, weakPatterns.length);
      const strength = strongHits.length > 0 ? "strong" : "weak";

      return isCovered
        ? {
            file: post.file,
            slug: post.slug,
            title: post.title,
            strength,
            strongHits,
            weakHits,
          }
        : null;
    })
    .filter(Boolean);
}

function getObservedQueryText(gscSummary) {
  return normalizeText(
    (gscSummary.topQueries || [])
      .map((row) => row.query)
      .join(" "),
  );
}

function scoreTopic(topic, posts, gscSummary) {
  const coverage = findCoverage(topic, posts);
  const observedQueries = getObservedQueryText(gscSummary);
  const triggerHits = topic.trendTriggers.filter((trigger) =>
    observedQueries.includes(normalizeText(trigger)),
  );
  const strongCoverage = coverage.filter((item) => item.strength === "strong").length;
  const weakCoverage = coverage.length - strongCoverage;

  let score = topic.priority;
  score += triggerHits.length * 5;
  score -= strongCoverage * 28;
  score -= weakCoverage * 8;

  if (topic.requiresFreshSource) {
    score -= 18;
  }

  return {
    ...topic,
    score,
    triggerHits,
    coverage,
    status: strongCoverage > 0 ? "covered" : coverage.length > 0 ? "partly-covered" : "open",
  };
}

function pickTopic(topics) {
  return [...topics].sort((a, b) => b.score - a.score || b.priority - a.priority)[0];
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return "n/a";
  return `${(value * 100).toFixed(2)}%`;
}

function createMarkdown(brief) {
  const { generatedAt, selectedTopic, yandex, gsc, postsCount, candidates } = brief;
  const lines = [];

  lines.push("# Daily SEO Content Topic Brief");
  lines.push("");
  lines.push(`Generated: ${generatedAt}`);
  lines.push(`Published posts checked: ${postsCount}`);
  lines.push("");
  lines.push("## Fresh Data Used");
  lines.push("");

  if (yandex.available) {
    lines.push(`- Yandex.Webmaster: ${yandex.generatedAt} (${yandex.fresh ? "fresh" : "stale"})`);
    lines.push(`- SQI: ${yandex.sqi ?? "n/a"}`);
    lines.push(`- Searchable pages: ${yandex.searchablePages ?? "n/a"}`);
    lines.push(`- Excluded pages: ${yandex.excludedPages ?? "n/a"}`);
    lines.push(`- Active diagnostics: ${yandex.activeDiagnostics.length}`);
  } else {
    lines.push(`- Yandex.Webmaster: unavailable (${yandex.note})`);
  }

  if (gsc.available) {
    const totals = gsc.totals;
    const range = gsc.dateRange ? `${gsc.dateRange.startDate}..${gsc.dateRange.endDate}` : "n/a";
    lines.push(`- Google Search Console: ${gsc.generatedAt} (${gsc.fresh ? "fresh" : "stale"}), range ${range}`);
    if (totals) {
      lines.push(
        `- GSC totals: clicks ${totals.clicks}, impressions ${totals.impressions}, CTR ${formatPercent(totals.ctr)}, avg position ${totals.position.toFixed(2)}`,
      );
    }
  } else {
    lines.push(`- Google Search Console: unavailable (${gsc.note})`);
  }

  lines.push("");
  lines.push("## Selected Topic");
  lines.push("");
  lines.push(`Title: ${selectedTopic.title}`);
  lines.push(`Slug: ${selectedTopic.slug}`);
  lines.push(`Score: ${selectedTopic.score}`);
  lines.push(`Type: ${selectedTopic.kind}`);
  lines.push(`Primary CTA: ${selectedTopic.moneyPage}`);
  lines.push(`Secondary links: ${selectedTopic.secondaryPages.join(", ")}`);
  lines.push("");
  lines.push("### Target Queries");
  for (const query of selectedTopic.targetQueries) {
    lines.push(`- ${query}`);
  }
  lines.push("");
  lines.push("### Why This Topic");
  for (const reason of selectedTopic.why) {
    lines.push(`- ${reason}`);
  }
  if (selectedTopic.triggerHits.length > 0) {
    lines.push(`- Search data overlap: ${selectedTopic.triggerHits.join(", ")}`);
  }
  if (selectedTopic.coverage.length > 0) {
    lines.push("- Existing partial coverage to avoid repeating:");
    for (const item of selectedTopic.coverage.slice(0, 5)) {
      lines.push(`  - ${item.file}: ${item.title}`);
    }
  }
  lines.push("");
  lines.push("### Article Structure");
  for (const item of selectedTopic.outline) {
    lines.push(`- ${item}`);
  }
  lines.push("");
  lines.push("### Publication Guardrails");
  lines.push("- Use live Yandex/GSC/sitemap/robots/page checks before publishing.");
  lines.push("- For trend topics, verify the original source before writing.");
  lines.push("- Public copy must be client-ready and must not include internal workflow notes.");
  lines.push("- Prefer one strong commercial CTA and 2-4 natural internal links.");
  lines.push("");
  lines.push("## Candidate Queue");
  for (const topic of candidates) {
    lines.push(`- ${topic.score}: ${topic.title} (${topic.status})`);
  }
  lines.push("");

  return lines.join("\n");
}

function main() {
  const yandexReport = readJsonIfExists(path.join(REPORT_DIR, "latest-yandex-webmaster-report.json"));
  const gscReport = readJsonIfExists(path.join(REPORT_DIR, "latest-gsc-report.json"));
  const posts = readPosts();

  const yandex = summarizeYandex(yandexReport);
  const gsc = summarizeGsc(gscReport);
  const scoredTopics = COMMERCIAL_TOPICS.map((topic) => scoreTopic(topic, posts, gsc));
  const selectedTopic = pickTopic(scoredTopics);

  const brief = {
    generatedAt: new Date().toISOString(),
    selectedTopic,
    candidates: [...scoredTopics].sort((a, b) => b.score - a.score),
    yandex,
    gsc,
    postsCount: posts.length,
    latestPosts: posts.slice(-8).reverse().map((post) => ({
      file: post.file,
      title: post.title,
      date: post.date,
    })),
  };

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(brief, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUTPUT_MD, `${createMarkdown(brief)}\n`, "utf8");

  console.log(`Selected topic: ${selectedTopic.title}`);
  console.log(`Score: ${selectedTopic.score}`);
  console.log(`Primary CTA: ${selectedTopic.moneyPage}`);
  console.log(`Saved: ${OUTPUT_MD}`);
}

main();
