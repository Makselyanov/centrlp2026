/**
 * Heuristic extractor: takes raw markdown content of a blog post and returns
 * a list of infographics to inject between H2 sections.
 *
 * Strategy:
 *   1. Split content at H2 boundaries.
 *   2. For each H2 section, score candidate variants based on its body.
 *   3. Pick the highest-scoring variant per section, but cap at ~3 per post
 *      and skip adjacent sections so the page has visual rhythm, not noise.
 *
 * No external API. Pure logic. Deterministic per post.
 */
import type { InfographicSpec } from "@/components/blog/BlogInfographic";

export interface ContentChunk {
    /** Markdown source for this chunk (includes its leading H2 if applicable) */
    markdown: string;
    /** Infographic to render *after* this chunk (or null) */
    infographicAfter: InfographicSpec | null;
}

// Max infographics per post — beyond this it starts feeling spammy.
const MAX_INFOGRAPHICS_PER_POST = 4;

// ---- Section splitting ----

interface Section {
    title: string;
    body: string;
    raw: string;
}

function splitIntoSections(content: string): { intro: string; sections: Section[] } {
    // Split keeping H2 markers — first chunk is intro before any H2.
    const parts = content.split(/(?=^## )/m);
    const intro = parts[0]?.trim() || "";
    const sections: Section[] = [];

    for (let i = 1; i < parts.length; i++) {
        const raw = parts[i];
        const titleMatch = raw.match(/^## (.+)$/m);
        const title = titleMatch?.[1]?.trim() || "";
        // Strip the H2 line for body analysis
        const body = raw.replace(/^## .+$/m, "").trim();
        sections.push({ title, body, raw });
    }

    return { intro, sections };
}

// ---- List extraction ----

function extractBulletItems(body: string): string[] {
    // Match lines starting with `- ` or `* `, capture text. Stop at blank line + non-list.
    const items: string[] = [];
    const lines = body.split("\n");
    for (const line of lines) {
        const m = line.match(/^[-*]\s+(.+)$/);
        if (m) {
            // Strip markdown bold/italic markers, keep clean text
            const text = m[1]
                .replace(/\*\*(.+?)\*\*/g, "$1")
                .replace(/\*(.+?)\*/g, "$1")
                .replace(/`([^`]+)`/g, "$1")
                .trim();
            // Skip overly long items (>180 chars) — they're paragraphs in disguise
            if (text.length > 0 && text.length <= 180) {
                items.push(text);
            }
        }
    }
    return items;
}

function extractNumberedItems(body: string): { title: string; desc?: string }[] {
    // Match lines like `1. ...` or `1) ...` or `**Шаг 1:** ...`
    const items: { title: string; desc?: string }[] = [];
    const lines = body.split("\n");
    for (const line of lines) {
        const numMatch = line.match(/^\d+[.)]\s+(.+)$/);
        if (numMatch) {
            const text = numMatch[1].replace(/\*\*(.+?)\*\*/g, "$1").trim();
            // If text contains " — " or ": " split into title + desc
            const splitMatch = text.match(/^(.+?)(?:\s+[—:]\s+|\s+-\s+)(.+)$/);
            if (splitMatch) {
                items.push({ title: splitMatch[1].trim(), desc: splitMatch[2].trim() });
            } else {
                items.push({ title: text });
            }
        }
        // Also match `**Шаг N:**` style
        const stepMatch = line.match(/^\*\*Шаг\s+\d+:?\*\*\s*(.+)$/i);
        if (stepMatch) {
            items.push({ title: stepMatch[1].trim() });
        }
    }
    return items;
}

// ---- Stat extraction ----

interface StatCandidate {
    value: string;
    label: string;
    context: string;
    score: number;
}

function extractStats(body: string): StatCandidate[] {
    const candidates: StatCandidate[] = [];
    // Look at each sentence
    const sentences = body
        .replace(/\n+/g, " ")
        .split(/(?<=[.!?])\s+/);

    for (const sentence of sentences) {
        if (sentence.length > 220) continue; // skip walls of text
        // Patterns: "80%", "в 3 раза", "за 7 дней", "в 5 раз больше", "на 40%"
        const patterns = [
            { re: /(\d+)\s*%/, format: (n: string) => `${n}%`, score: 10 },
            { re: /в\s+(\d+)\s+раза?/i, format: (n: string) => `×${n}`, score: 9 },
            { re: /за\s+(\d+)\s+дн[еяй]/i, format: (n: string) => `${n} дн.`, score: 7 },
            { re: /(\d+)\s*(тыс|тысяч)/i, format: (n: string) => `${n}k`, score: 6 },
            { re: /(\d+)\s*(млн|миллион)/i, format: (n: string) => `${n} млн`, score: 6 },
        ];
        for (const p of patterns) {
            const m = sentence.match(p.re);
            if (m) {
                const cleaned = sentence
                    .replace(/\*\*(.+?)\*\*/g, "$1")
                    .replace(/`([^`]+)`/g, "$1")
                    .trim();
                // Take ~60 chars around the stat as label
                const label = cleaned.length > 80 ? cleaned.slice(0, 80).trim() + "…" : cleaned;
                candidates.push({
                    value: p.format(m[1]),
                    label,
                    context: "",
                    score: p.score,
                });
                break; // one stat per sentence
            }
        }
    }
    // Sort by score
    candidates.sort((a, b) => b.score - a.score);
    return candidates;
}

// ---- Comparison detection ----

function tryExtractComparison(body: string): { leftItems: string[]; rightItems: string[]; leftTitle?: string; rightTitle?: string } | null {
    // Look for explicit comparison markers
    const lower = body.toLowerCase();
    const hasComparisonMarkers =
        (lower.includes("плохо") && lower.includes("хорошо")) ||
        (lower.includes("неправильно") && lower.includes("правильно")) ||
        (lower.includes("раньше") && lower.includes("сейчас")) ||
        (lower.includes("без") && lower.includes("с ") && body.includes("**"));

    if (!hasComparisonMarkers) return null;

    // Try to find two adjacent bold-headed lists
    // **Плохо:** ... - item - item ... **Хорошо:** ... - item - item ...
    const blocks = body.split(/(?=\*\*[^*]+:?\*\*)/);
    if (blocks.length < 2) return null;

    const leftBlock = blocks.find((b) => /\*\*(плохо|неправильно|раньше|без)/i.test(b));
    const rightBlock = blocks.find((b) => /\*\*(хорошо|правильно|сейчас|с\b)/i.test(b));
    if (!leftBlock || !rightBlock) return null;

    const leftItems = extractBulletItems(leftBlock).slice(0, 4);
    const rightItems = extractBulletItems(rightBlock).slice(0, 4);
    if (leftItems.length === 0 || rightItems.length === 0) return null;

    const leftTitleMatch = leftBlock.match(/\*\*([^*]+)\*\*/);
    const rightTitleMatch = rightBlock.match(/\*\*([^*]+)\*\*/);

    return {
        leftItems,
        rightItems,
        leftTitle: leftTitleMatch?.[1]?.replace(":", "").trim(),
        rightTitle: rightTitleMatch?.[1]?.replace(":", "").trim(),
    };
}

// ---- Quote extraction ----

function extractQuote(body: string): string | null {
    // Look for blockquote `> ...`
    const lines = body.split("\n");
    for (const line of lines) {
        const m = line.match(/^>\s+(.+)$/);
        if (m) {
            const text = m[1].replace(/\*\*(.+?)\*\*/g, "$1").trim();
            if (text.length > 20 && text.length < 220) return text;
        }
    }
    // Or a strong sentence with **bold** wrapping the whole thing
    const boldStandalone = body.match(/^\*\*([^*\n]{30,200})\*\*$/m);
    if (boldStandalone) return boldStandalone[1].trim();
    return null;
}

// ---- Per-section scoring ----

interface ScoredCandidate {
    spec: InfographicSpec;
    score: number;
}

function scoreCandidates(section: Section): ScoredCandidate[] {
    const out: ScoredCandidate[] = [];
    const bullets = extractBulletItems(section.body);
    const numbered = extractNumberedItems(section.body);
    const stats = extractStats(section.body);

    // 1. Comparison — high priority if detected
    const comparison = tryExtractComparison(section.body);
    if (comparison) {
        out.push({
            spec: { variant: "comparison", data: comparison },
            score: 25,
        });
    }

    // 2. Process steps — if section title hints at process or numbered list ≥3
    const titleLower = section.title.toLowerCase();
    const processHints = ["шаг", "этап", "процесс", "как", "пошаг", "план", "запуск", "внедрен"];
    const isProcessSection = processHints.some((h) => titleLower.includes(h));
    if (numbered.length >= 3) {
        out.push({
            spec: {
                variant: "process-steps",
                data: {
                    title: isProcessSection ? section.title.replace(/^Шаг\s*\d+[:.]?\s*/i, "") : "Пошагово",
                    steps: numbered.slice(0, 4),
                },
            },
            score: 20 + (isProcessSection ? 5 : 0),
        });
    }

    // 3. Stat highlight — if a strong number is found
    if (stats.length > 0 && stats[0].score >= 9) {
        out.push({
            spec: {
                variant: "stat-highlight",
                data: {
                    value: stats[0].value,
                    label: stats[0].label,
                },
            },
            score: 15,
        });
    }

    // 4. Checklist — section title contains "чек" or has many short action bullets
    const isChecklistSection = titleLower.includes("чек") || titleLower.includes("проверь");
    const looksLikeChecklist =
        bullets.length >= 4 && bullets.every((b) => b.length < 100);
    if (isChecklistSection || looksLikeChecklist) {
        out.push({
            spec: {
                variant: "checklist",
                data: {
                    title: isChecklistSection ? section.title : "Что важно сделать",
                    items: bullets.slice(0, 6),
                },
            },
            score: 14 + (isChecklistSection ? 8 : 0),
        });
    }

    // 5. Key takeaways — generic fallback if 3+ bullets
    if (bullets.length >= 3) {
        out.push({
            spec: {
                variant: "key-takeaways",
                data: {
                    title: "Главное",
                    items: bullets.slice(0, 4),
                },
            },
            score: 10,
        });
    }

    // 6. Quote — if a strong pull quote exists
    const quote = extractQuote(section.body);
    if (quote) {
        out.push({
            spec: { variant: "quote", data: { quote } },
            score: 12,
        });
    }

    out.sort((a, b) => b.score - a.score);
    return out;
}

// ---- Main API ----

export function buildContentChunks(content: string): ContentChunk[] {
    const { intro, sections } = splitIntoSections(content);
    const chunks: ContentChunk[] = [];

    // Intro chunk (if exists) — usually no infographic immediately after
    if (intro) {
        chunks.push({ markdown: intro, infographicAfter: null });
    }

    // Track which variants have been used to avoid repeating the same one back-to-back
    const usedVariants: string[] = [];
    let infographicCount = 0;
    let lastInfographicIndex = -2; // ensure first section can be eligible

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        let infographicAfter: InfographicSpec | null = null;

        // Eligibility: not adjacent to previous infographic AND under cap
        const eligible =
            infographicCount < MAX_INFOGRAPHICS_PER_POST &&
            i - lastInfographicIndex >= 2 &&
            i < sections.length - 1; // never put one after the very last section

        if (eligible) {
            const candidates = scoreCandidates(section);
            // Prefer a variant we haven't used yet, falling back to the top-scored
            let chosen = candidates.find((c) => !usedVariants.includes(c.spec.variant));
            if (!chosen && candidates.length > 0) {
                chosen = candidates[0];
            }
            if (chosen && chosen.score >= 10) {
                infographicAfter = chosen.spec;
                usedVariants.push(chosen.spec.variant);
                infographicCount += 1;
                lastInfographicIndex = i;
            }
        }

        chunks.push({
            markdown: section.raw,
            infographicAfter,
        });
    }

    return chunks;
}
