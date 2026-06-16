#!/usr/bin/env node
/**
 * Reads content/posts/*.md and src/pages/services/*.tsx, derives a subject and
 * style for each, and writes batch JSON files for generate-image.mjs.
 *
 * Output:
 *   scripts/image-batch-blog.json     -> public/og/posts/<slug>.png    (1200x675-ish, 16:9)
 *   scripts/image-batch-services.json -> public/og/services/<slug>.png (1200x675-ish, 16:9)
 *   scripts/image-batch-toplevel.json -> public/og/{cases,business-plans}.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const POSTS_DIR = path.join(ROOT, "content", "posts");
const SERVICES_DIR = path.join(ROOT, "src", "pages", "services");
const PAGES_DIR = path.join(ROOT, "src", "pages");

// Brand-locked base style — same look as the home cards we already shipped.
const BASE_STYLE =
    "Modern minimalist 3D isometric illustration, soft pastel gradient background blending sky blue (#0096D6) into mint green (#44B78B), premium product render style, clean composition, soft shadows, subtle rim light, no text, no watermarks, no logos, wide 16:9 composition.";

// Topical keyword -> visual subject. Specificity-scored: best (most + longest matched keys) wins.
// Each subject reads well after "Subject: ".
const SUBJECT_RULES = [
    { keys: ["openclaw"], subject: "an abstract glowing humanoid AI agent figure made of polygonal facets, holding floating data cards, surrounded by orbiting tool icons (terminal, file, gear)" },
    { keys: ["ии-агент", "ии агент", "ai agent", "ai-agent", "ai-агент", "ai agents"], subject: "an abstract glowing humanoid AI agent figure made of polygonal facets, holding floating data cards, surrounded by orbiting tool icons (terminal, file, gear)" },
    { keys: ["beget", "vps", "хостинг", "self-hosted", "selfhost", "hosting", "ubuntu", "devops"], subject: "a translucent server rack tower with glowing status LEDs, floating cloud icons above, gentle motion lines suggesting uptime" },
    { keys: ["docker", "контейнер", "stack", "compose"], subject: "stacked translucent containers (Docker-style) connected by glowing pipelines, small workflow nodes floating above" },
    { keys: ["безопасност", "security", " ssl ", "защит"], subject: "a glowing translucent shield emblem hovering over a server, with subtle padlock motifs and protective light arcs" },
    { keys: ["yandex.direct", "yandex direct", "яндекс.директ", "яндекс директ", "директ", "контекстная реклам"], subject: "an isometric ad-campaign dashboard floating above a target with crosshair, with rising bar charts and click-cursor icons" },
    { keys: ["реклама вк", "vk ads", "vk-ads", "vkads", "таргет вк", "таргетированная реклама"], subject: "a stylized smartphone with a VK ad creative mockup, floating audience-segment chips and a small target icon" },
    { keys: ["авито", "avito", "avito-ads", "реклама на авито", "продвижение на авито"], subject: "an isometric local marketplace listing board with product-service cards, message bubbles, map pin, small analytics chart and promotion arrows" },
    { keys: ["оформление группы", "оформление вк", "сообществ", "vkontakte community", "группа вк", "vk community"], subject: "a stylized smartphone showing a clean VK community feed mockup, with floating like, comment and message bubbles around it" },
    { keys: ["вконтакте", "вк-маркетинг", "vk marketing", "продвижение вк", "продвижение в вк", "продвижение во вконтакте"], subject: "a stylized smartphone showing a clean VK community feed mockup, with floating like, comment and message bubbles around it" },
    { keys: ["чат-бот", "чатбот", "chatbot", "chat bot", "vk-бот", "telegram-бот"], subject: "a friendly polygonal chatbot character emerging from a chat bubble, with smaller chat bubbles floating around as a conversation flow" },
    { keys: ["help bot", "helpbot", "помощник для сайта", "support bot"], subject: "a friendly polygonal robot head next to a chat bubble with FAQ list, gentle question-mark motif" },
    { keys: ["автоответ", "auto response", "auto-response", "автоматические ответы"], subject: "an isometric translucent inbox with floating quick-reply chips and a small lightning bolt icon" },
    { keys: ["n8n"], subject: "an isometric workflow canvas with connected nodes and animated arrows, glowing gears in the corners" },
    { keys: ["автоматизац", "automation", "автоматизация бизнеса"], subject: "an isometric workflow canvas with connected nodes and animated arrows, glowing gears in the corners" },
    { keys: ["контент-завод", "контент завод", "kontent-zavod", "content factory"], subject: "an isometric production line of floating documents, articles and social posts, with small gears and a content-calendar grid in the background" },
    { keys: ["контент-план", "контент план", "content plan", "контент-маркетинг"], subject: "an isometric production line of floating documents, articles and social posts, with small gears and a content-calendar grid in the background" },
    { keys: ["crm"], subject: "an isometric CRM kanban board with glowing deal cards moving between columns, small contact-card icons floating above" },
    { keys: ["воронк", "лидов", "продаж"], subject: "an isometric CRM kanban board with glowing deal cards moving between columns, small contact-card icons floating above" },
    { keys: ["сайт", "landing", "лендинг", "разработка сайта", "веб-сайт", "создание сайта", "интернет-магазин", "сайта"], subject: "an isometric translucent laptop showing a landing-page wireframe with hero, form and CTA blocks, floating UI components around it" },
    { keys: ["mvp", "стартап", "startup", "минимально жизнеспособный"], subject: "an isometric translucent rocket lifting off from a laptop, leaving a trail of UI components and code blocks" },
    { keys: ["telegram mini app", "mini app", "мини-приложение", "мини приложение", "telegram-mini"], subject: "a stylized smartphone with a Telegram-style mini-app interface, floating tab and button cards around it" },
    { keys: ["max messenger", "max-messenger", "мессенджер max", "макс мессендж"], subject: "a friendly stylized smartphone with a clean Russian messenger UI, abstract dialogue bubbles floating around" },
    { keys: ["browser extension", "browser-extension", "расширения для браузер", "расширение браузер"], subject: "a translucent browser window with a small puzzle-piece extension icon, floating tool cards around it" },
    { keys: ["ии в маркетинге", "ai marketing", "ии-маркетинг", "ии маркетинг", "ai-маркетинг", "искусственный интеллект в маркетинге", "нейросет"], subject: "a glowing polygonal AI brain hovering above a marketing dashboard with floating chart and audience-segment cards" },
    { keys: ["ai system", "ai-system", "ии-систем", "ии систем", "ai систем"], subject: "a glowing polygonal AI brain hovering above a marketing dashboard with floating chart and audience-segment cards" },
    { keys: ["маркетинговая стратегия", "маркетинг-стратегия", "стратегия маркетинга", "marketing strategy"], subject: "an isometric chess board with glowing strategic pieces and a translucent flight-plan arrow rising upward" },
    { keys: ["стратегия", "strategy", "позиционирован"], subject: "an isometric chess board with glowing strategic pieces and a translucent flight-plan arrow rising upward" },
    { keys: ["аудит", "audit", "проверка сайта", "checklist"], subject: "an isometric magnifying glass over a translucent dashboard with checklists and small warning/check icons" },
    { keys: ["seo", "поисковая оптимизация", "поисковое продвижение"], subject: "an isometric stylized city map with glowing location pins, a small magnifying glass and search-result cards floating above" },
    { keys: ["агентств", "agency", "студи"], subject: "an isometric collaborative workspace with floating user avatars connected by light beams and small project cards" },
    { keys: ["бартер", "barter"], subject: "two stylized translucent hands exchanging glowing geometric tokens above a clean platform, with subtle handshake motif" },
    { keys: ["бизнес-план", "бизнес план", "business plan", "финансовая модель", "грант", "соцконтракт"], subject: "an isometric translucent document folder with floating financial charts, calculator and a small upward trend graph" },
    { keys: ["веб-аналитик", "web analytics", "веб аналитик"], subject: "an isometric analytics dashboard with multiple translucent chart panels, funnels and small device-icons (mobile/desktop)" },
    { keys: ["a/b", "ab-тест", "ab test", "ab testing", "сплит-тест"], subject: "two side-by-side isometric translucent landing-page mockups labeled A and B, with a small comparison arrow between them" },
    { keys: ["копирайт", "copywriting"], subject: "an isometric translucent document with glowing highlighted lines and a small quill/pen icon, floating word cards around" },
    { keys: ["офферы", "оффер", "нейминг", "naming"], subject: "an isometric translucent document with glowing highlighted lines and a small quill/pen icon, floating word cards around" },
    { keys: ["брендинг", "branding", "айдентика", "фирменный стиль"], subject: "an isometric translucent brand-mark hexagon with floating colour swatches, font samples and a small abstract logo shape" },
    { keys: ["дизайн", "прототип", "design", "ui ", "ux", "интерфейс"], subject: "an isometric translucent design canvas with stacked UI cards, floating component panels and a small magic-wand icon" },
    { keys: ["скрипт продаж", "operator script", "оператор", "скрипт оператор"], subject: "an isometric translucent script document with branching dialogue paths and small headset and call-icons floating above" },
    { keys: ["локальное seo", "тюмень", "тюмен"], subject: "an isometric stylized city map of a Russian city with glowing location pins, a small magnifying glass and search-result cards floating above" },
    { keys: ["кейс", "результаты"], subject: "an isometric trophy podium with floating result cards (charts, metrics, gold star) and a small upward arrow" },
];

const FALLBACK_SUBJECT =
    "an abstract glowing isometric digital workspace with floating UI cards, light beams and small geometric tool icons";

function pickSubject(text) {
    const haystack = ` ${text.toLowerCase()} `;
    let best = null;
    let bestScore = 0;
    let bestSpecificity = 0;
    for (const rule of SUBJECT_RULES) {
        let matched = 0;
        let specificity = 0;
        for (const k of rule.keys) {
            if (haystack.includes(k)) {
                matched += 1;
                if (k.length > specificity) specificity = k.length;
            }
        }
        if (matched === 0) continue;
        if (
            matched > bestScore ||
            (matched === bestScore && specificity > bestSpecificity)
        ) {
            best = rule.subject;
            bestScore = matched;
            bestSpecificity = specificity;
        }
    }
    return best || FALLBACK_SUBJECT;
}

function buildPrompt(subject) {
    return `${BASE_STYLE} Subject: ${subject}.`;
}

function readBlogPosts() {
    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
    const items = [];
    for (const file of files) {
        const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
        const parsed = matter(raw);
        const data = parsed.data || {};
        const slug = (data.slug || file.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "")).toLowerCase();
        const title = data.title || slug;
        const description = data.description || "";
        const tags = Array.isArray(data.tags) ? data.tags : [];
        const haystack = [title, description, tags.join(" ")].join(" ");
        const subject = pickSubject(haystack);
        items.push({
            out: `public/og/posts/${slug}.png`,
            skipIfExists: true,
            prompt: buildPrompt(subject),
        });
    }
    return items;
}

function extractLayoutValue(content, key) {
    const regex = new RegExp(`${key}\\s*=\\s*"([^"]+)"`, "s");
    return content.match(regex)?.[1] || "";
}

// Convert "ServicePage.tsx" file path -> kebab-case slug used in routing.
function fileToSlug(filename) {
    const base = filename.replace(/\.tsx$/i, "");
    // Component PascalCase -> kebab-case
    return base
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .toLowerCase();
}

// Manual override map for service slugs that don't match the file name kebab-cased version.
const SERVICE_SLUG_OVERRIDES = {
    "ab-testing": "ab-testing",
    "telegram-mini-app": "telegram-mini-app",
    "max-messenger": "max-messenger",
    "browser-extensions": "browser-extensions",
    "ai-agents": "ai-agents",
    "ai-systems": "ai-systems",
    "custom-crm": "custom-crm",
    "mvp-development": "mvp-development",
};

function readServices() {
    const files = fs.readdirSync(SERVICES_DIR).filter((f) => f.endsWith(".tsx"));
    const items = [];
    for (const file of files) {
        const raw = fs.readFileSync(path.join(SERVICES_DIR, file), "utf8");
        const title = extractLayoutValue(raw, "title");
        const description = extractLayoutValue(raw, "description");
        let slug = fileToSlug(file);
        if (SERVICE_SLUG_OVERRIDES[slug]) slug = SERVICE_SLUG_OVERRIDES[slug];
        const haystack = [title, description, slug].join(" ");
        const subject = pickSubject(haystack);
        items.push({
            out: `public/og/services/${slug}.png`,
            skipIfExists: true,
            prompt: buildPrompt(subject),
        });
    }
    return items;
}

function readTopLevel() {
    const targets = [
        { file: "Cases.tsx", slug: "cases" },
        { file: "BusinessPlans.tsx", slug: "business-plans" },
    ];
    const items = [];
    for (const t of targets) {
        const filePath = path.join(PAGES_DIR, t.file);
        if (!fs.existsSync(filePath)) continue;
        const raw = fs.readFileSync(filePath, "utf8");
        const title = extractLayoutValue(raw, "title");
        const description = extractLayoutValue(raw, "description");
        const subject = pickSubject([title, description, t.slug].join(" "));
        items.push({
            out: `public/og/${t.slug}.png`,
            skipIfExists: true,
            prompt: buildPrompt(subject),
        });
    }
    return items;
}

function writeBatch(name, items) {
    const out = path.join(ROOT, "scripts", name);
    fs.writeFileSync(out, JSON.stringify(items, null, 2));
    console.log(`[build-image-batches] wrote ${name} (${items.length} items)`);
}

function main() {
    writeBatch("image-batch-blog.json", readBlogPosts());
    writeBatch("image-batch-services.json", readServices());
    writeBatch("image-batch-toplevel.json", readTopLevel());
}

main();
