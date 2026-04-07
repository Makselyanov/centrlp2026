/**
 * Heuristic extractor: takes raw markdown content of a blog post and returns
 * a list of infographics to inject between H2 sections.
 *
 * Key rules to avoid the "two flavors of the same content" duplication:
 *   - When an infographic REPLACES content (e.g. pairwise comparison from
 *     ❌/✅ rows), strip those rows from the markdown chunk so the reader
 *     doesn't see the same data rendered twice.
 *   - When the infographic ADDS context that wasn't in the original
 *     (e.g. a stat callout pulled from a sentence), keep the original.
 *   - Cap at 2-3 visuals per post — they're accents, not the main content.
 */
import type { InfographicSpec } from "@/components/blog/BlogInfographic";

export interface ContentChunk {
    /** Markdown source for this chunk (may have lines stripped if replaced by infographic) */
    markdown: string;
    /** Infographic to render *after* this chunk (or null) */
    infographicAfter: InfographicSpec | null;
}

const MAX_INFOGRAPHICS_PER_POST = 3;

// ── Section splitting ──────────────────────────────────────────────────

interface Section {
    title: string;
    body: string;
    raw: string;
}

function splitIntoSections(content: string): { intro: string; sections: Section[] } {
    const parts = content.split(/(?=^## )/m);
    const intro = parts[0]?.trim() || "";
    const sections: Section[] = [];

    for (let i = 1; i < parts.length; i++) {
        const raw = parts[i];
        const titleMatch = raw.match(/^## (.+)$/m);
        const title = titleMatch?.[1]?.trim() || "";
        const body = raw.replace(/^## .+$/m, "").trim();
        sections.push({ title, body, raw });
    }

    return { intro, sections };
}

function rebuildRawWithBody(originalRaw: string, newBody: string): string {
    // Preserve the leading H2 line, replace the rest with newBody
    const titleMatch = originalRaw.match(/^## .+$/m);
    if (!titleMatch) return originalRaw;
    return `${titleMatch[0]}\n\n${newBody.trim()}\n`;
}

// ── Helpers ────────────────────────────────────────────────────────────

function cleanInline(text: string): string {
    return text
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .trim();
}

function extractBulletItems(body: string): string[] {
    const items: string[] = [];
    for (const line of body.split("\n")) {
        const m = line.match(/^[-*]\s+(.+)$/);
        if (m) {
            const text = cleanInline(m[1]);
            if (text.length > 0 && text.length <= 180) items.push(text);
        }
    }
    return items;
}

function extractNumberedItems(body: string): { title: string; desc?: string }[] {
    const items: { title: string; desc?: string }[] = [];
    for (const line of body.split("\n")) {
        const numMatch = line.match(/^\d+[.)]\s+(.+)$/);
        if (numMatch) {
            const text = cleanInline(numMatch[1]);
            const splitMatch = text.match(/^(.+?)(?:\s+[—:]\s+|\s+-\s+)(.+)$/);
            if (splitMatch) {
                items.push({ title: splitMatch[1].trim(), desc: splitMatch[2].trim() });
            } else {
                items.push({ title: text });
            }
        }
    }
    return items;
}

// ── Stat extraction ────────────────────────────────────────────────────

interface StatCandidate {
    value: string;
    label: string;
    score: number;
}

function extractStats(body: string): StatCandidate[] {
    const candidates: StatCandidate[] = [];
    const sentences = body.replace(/\n+/g, " ").split(/(?<=[.!?])\s+/);

    for (const sentence of sentences) {
        if (sentence.length > 220) continue;
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
                const cleaned = cleanInline(sentence);
                const label = cleaned.length > 100 ? cleaned.slice(0, 100).trim() + "…" : cleaned;
                candidates.push({ value: p.format(m[1]), label, score: p.score });
                break;
            }
        }
    }
    candidates.sort((a, b) => b.score - a.score);
    return candidates;
}

// ── Pairwise comparison (❌ ... / ✅ ... pairs) ─────────────────────────

interface PairwiseExtraction {
    pairs: { bad: string; good: string }[];
    /** Lines (verbatim) to strip from the body */
    consumedLines: Set<string>;
}

function extractPairwiseComparison(body: string): PairwiseExtraction | null {
    const lines = body.split("\n");
    const pairs: { bad: string; good: string }[] = [];
    const consumed = new Set<string>();
    let pendingBad: string | null = null;
    let pendingBadLine: string | null = null;

    for (const line of lines) {
        const trimmed = line.trim();
        // Match: ❌ optionally followed by **Label:** then text
        const badMatch = trimmed.match(/^❌\s*(?:\*\*[^*]+\*\*[:.]?\s*)?(.+)$/);
        const goodMatch = trimmed.match(/^✅\s*(?:\*\*[^*]+\*\*[:.]?\s*)?(.+)$/);

        if (badMatch) {
            pendingBad = cleanInline(badMatch[1]);
            pendingBadLine = line;
        } else if (goodMatch && pendingBad && pendingBadLine) {
            pairs.push({
                bad: pendingBad,
                good: cleanInline(goodMatch[1]),
            });
            consumed.add(pendingBadLine);
            consumed.add(line);
            pendingBad = null;
            pendingBadLine = null;
        }
    }

    if (pairs.length >= 2) {
        return { pairs, consumedLines: consumed };
    }
    return null;
}

function stripLinesFromBody(body: string, linesToRemove: Set<string>): string {
    return body
        .split("\n")
        .filter((line) => !linesToRemove.has(line))
        .join("\n")
        // Collapse 3+ blank lines into 2
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

// ── Quote extraction ───────────────────────────────────────────────────

function extractQuote(body: string): { quote: string; consumedLine: string } | null {
    for (const line of body.split("\n")) {
        const m = line.match(/^>\s+(.+)$/);
        if (m) {
            const text = cleanInline(m[1]);
            if (text.length > 20 && text.length < 220) {
                return { quote: text, consumedLine: line };
            }
        }
    }
    return null;
}

// ── Per-section pick (with content stripping) ─────────────────────────

interface ExtractionResult {
    spec: InfographicSpec;
    /** New body for the section (lines stripped if applicable) */
    newBody: string | null;
    score: number;
}

function pickBestExtraction(section: Section, usedVariants: string[]): ExtractionResult | null {
    const candidates: ExtractionResult[] = [];

    // 1. Pairwise comparison — HIGH priority, replaces content
    const pairwise = extractPairwiseComparison(section.body);
    if (pairwise) {
        candidates.push({
            spec: {
                variant: "pairwise-comparison",
                data: {
                    title: section.title.toLowerCase().includes("ошибк")
                        ? "Ошибки и как исправить"
                        : "Сравнение",
                    pairs: pairwise.pairs.slice(0, 6),
                },
            },
            newBody: stripLinesFromBody(section.body, pairwise.consumedLines),
            score: 30,
        });
    }

    // 2. Process steps — only if titles are short, replaces numbered list
    const numbered = extractNumberedItems(section.body);
    const titleLower = section.title.toLowerCase();
    const processHints = ["шаг", "этап", "процесс", "пошаг", "план", "запуск", "внедрен"];
    const isProcessSection = processHints.some((h) => titleLower.includes(h));
    if (numbered.length >= 3 && numbered.length <= 5) {
        const allShort = numbered.every((s) => s.title.length <= 55);
        if (allShort) {
            // Strip the numbered list lines
            const numberedLines = new Set<string>();
            for (const line of section.body.split("\n")) {
                if (/^\d+[.)]\s+/.test(line.trim())) numberedLines.add(line);
            }
            candidates.push({
                spec: {
                    variant: "process-steps",
                    data: {
                        title: isProcessSection ? "Пошагово" : "По порядку",
                        steps: numbered.slice(0, 4),
                    },
                },
                newBody: stripLinesFromBody(section.body, numberedLines),
                score: 22 + (isProcessSection ? 4 : 0),
            });
        }
    }

    // 3. Stat highlight — adds context, doesn't replace
    const stats = extractStats(section.body);
    if (stats.length > 0 && stats[0].score >= 9) {
        candidates.push({
            spec: {
                variant: "stat-highlight",
                data: { value: stats[0].value, label: stats[0].label },
            },
            newBody: null,
            score: 18,
        });
    }

    // 4. Quote — replaces blockquote line
    const quote = extractQuote(section.body);
    if (quote) {
        candidates.push({
            spec: { variant: "quote", data: { quote: quote.quote } },
            newBody: stripLinesFromBody(section.body, new Set([quote.consumedLine])),
            score: 15,
        });
    }

    // 5. Checklist — only if title literally contains "чек"
    if (titleLower.includes("чек")) {
        const bullets = extractBulletItems(section.body);
        if (bullets.length >= 4) {
            // Strip bullet list
            const bulletLines = new Set<string>();
            for (const line of section.body.split("\n")) {
                if (/^[-*]\s+/.test(line.trim())) bulletLines.add(line);
            }
            candidates.push({
                spec: {
                    variant: "checklist",
                    data: { title: section.title, items: bullets.slice(0, 7) },
                },
                newBody: stripLinesFromBody(section.body, bulletLines),
                score: 25,
            });
        }
    }

    if (candidates.length === 0) return null;

    candidates.sort((a, b) => b.score - a.score);
    // Prefer a variant we haven't used yet
    const fresh = candidates.find((c) => !usedVariants.includes(c.spec.variant));
    return fresh || candidates[0];
}

// ── Main API ──────────────────────────────────────────────────────────

export function buildContentChunks(content: string): ContentChunk[] {
    const { intro, sections } = splitIntoSections(content);
    const chunks: ContentChunk[] = [];

    if (intro) {
        chunks.push({ markdown: intro, infographicAfter: null });
    }

    const usedVariants: string[] = [];
    let infographicCount = 0;
    let lastInfographicIndex = -2;

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        let infographicAfter: InfographicSpec | null = null;
        let chunkMarkdown = section.raw;

        const eligible =
            infographicCount < MAX_INFOGRAPHICS_PER_POST &&
            i - lastInfographicIndex >= 2 &&
            i < sections.length - 1;

        if (eligible) {
            const result = pickBestExtraction(section, usedVariants);
            if (result && result.score >= 15) {
                infographicAfter = result.spec;
                usedVariants.push(result.spec.variant);
                infographicCount += 1;
                lastInfographicIndex = i;
                if (result.newBody !== null) {
                    chunkMarkdown = rebuildRawWithBody(section.raw, result.newBody);
                }
            }
        }

        chunks.push({
            markdown: chunkMarkdown,
            infographicAfter,
        });
    }

    return chunks;
}
