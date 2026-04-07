/**
 * Inline infographics for blog posts. Single coherent visual language —
 * white card, soft slate border, subtle shadow, brand-color icon header,
 * rounded-2xl corners. Differences are content-layout only, not chrome.
 *
 * Used by EnhancedMarkdown.tsx to break up long walls of text in articles.
 */
import { Check, X, ArrowRight, Lightbulb, ListChecks, TrendingUp, Quote, Sparkles } from "lucide-react";

// ── Shared shell so every infographic looks like the same family ──────
interface CardShellProps {
    icon: React.ReactNode;
    title?: string;
    children: React.ReactNode;
}

const CardShell = ({ icon, title, children }: CardShellProps) => (
    <div className="not-prose my-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        {title && (
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                    {icon}
                </div>
                <h4 className="text-lg font-semibold text-slate-900 tracking-tight">{title}</h4>
            </div>
        )}
        {children}
    </div>
);

// ──────────────────────────────────────────────────────────────────────
// 1. Key Takeaways
// ──────────────────────────────────────────────────────────────────────
export interface KeyTakeawaysData {
    title?: string;
    items: string[];
}

export const KeyTakeawaysCard = ({ title = "Главное", items }: KeyTakeawaysData) => (
    <CardShell icon={<Lightbulb className="h-4 w-4" />} title={title}>
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-[12px] font-bold text-white">
                        {i + 1}
                    </div>
                    <span className="text-[16px] leading-[1.7] text-slate-700">{item}</span>
                </li>
            ))}
        </ul>
    </CardShell>
);

// ──────────────────────────────────────────────────────────────────────
// 2. Process Steps — adapts to content length
// ──────────────────────────────────────────────────────────────────────
export interface ProcessStepsData {
    title?: string;
    steps: { title: string; desc?: string }[];
}

export const ProcessStepsCard = ({ title = "Как это работает", steps }: ProcessStepsData) => {
    // If any step title is long, render vertical timeline. Otherwise grid.
    const longContent = steps.some((s) => s.title.length > 55);

    if (longContent) {
        return (
            <CardShell icon={<Sparkles className="h-4 w-4" />} title={title}>
                <ol className="relative space-y-5 pl-8 before:absolute before:left-[14px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#0096D6] before:to-[#44B78B]">
                    {steps.map((step, i) => (
                        <li key={i} className="relative">
                            <div className="absolute -left-8 top-0 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-[13px] font-bold text-white shadow-sm">
                                {String(i + 1).padStart(2, "0")}
                            </div>
                            <div className="text-[16px] leading-[1.65] text-slate-800 font-medium">{step.title}</div>
                            {step.desc && <p className="mt-1 text-[14px] leading-[1.6] text-slate-600">{step.desc}</p>}
                        </li>
                    ))}
                </ol>
            </CardShell>
        );
    }

    return (
        <CardShell icon={<Sparkles className="h-4 w-4" />} title={title}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, i) => (
                    <div key={i} className="relative rounded-xl border border-slate-100 bg-slate-50/40 p-4">
                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-[13px] font-bold text-white shadow-sm">
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <h5 className="text-[15px] font-semibold text-slate-900 leading-snug">{step.title}</h5>
                        {step.desc && <p className="mt-1 text-[13px] leading-[1.55] text-slate-600">{step.desc}</p>}
                        {i < steps.length - 1 && (
                            <ArrowRight className="absolute top-1/2 -right-2.5 hidden h-4 w-4 -translate-y-1/2 text-[#0096D6]/30 lg:block" />
                        )}
                    </div>
                ))}
            </div>
        </CardShell>
    );
};

// ──────────────────────────────────────────────────────────────────────
// 3. Stat Highlight
// ──────────────────────────────────────────────────────────────────────
export interface StatHighlightData {
    value: string;
    label: string;
    context?: string;
}

export const StatHighlightCard = ({ value, label, context }: StatHighlightData) => (
    <div className="not-prose my-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-7">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
                <TrendingUp className="h-5 w-5" />
            </div>
            <div className="flex-1">
                <div className="bg-gradient-to-r from-[#0096D6] to-[#44B78B] bg-clip-text text-[44px] font-black leading-none tracking-tight text-transparent md:text-[52px]">
                    {value}
                </div>
                <div className="mt-2 text-[16px] leading-[1.55] text-slate-700">{label}</div>
                {context && <div className="mt-1 text-[13px] text-slate-500">{context}</div>}
            </div>
        </div>
    </div>
);

// ──────────────────────────────────────────────────────────────────────
// 4. Comparison — independent left/right columns
// ──────────────────────────────────────────────────────────────────────
export interface ComparisonData {
    leftTitle?: string;
    leftItems: string[];
    rightTitle?: string;
    rightItems: string[];
}

export const ComparisonCard = ({
    leftTitle = "Как делают многие",
    leftItems,
    rightTitle = "Как стоит делать",
    rightItems,
}: ComparisonData) => (
    <div className="not-prose my-10 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                    <X className="h-4 w-4" />
                </div>
                <h5 className="text-[15px] font-semibold text-slate-900">{leftTitle}</h5>
            </div>
            <ul className="space-y-2.5">
                {leftItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[15px] leading-[1.65] text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#44B78B]">
                    <Check className="h-4 w-4" />
                </div>
                <h5 className="text-[15px] font-semibold text-slate-900">{rightTitle}</h5>
            </div>
            <ul className="space-y-2.5">
                {rightItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[15px] leading-[1.65] text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#44B78B]" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// ──────────────────────────────────────────────────────────────────────
// 5. Pairwise Comparison — error → fix rows (table-like)
// ──────────────────────────────────────────────────────────────────────
export interface PairwiseComparisonData {
    title?: string;
    pairs: { bad: string; good: string }[];
}

export const PairwiseComparisonCard = ({ title = "Ошибки и как исправить", pairs }: PairwiseComparisonData) => (
    <CardShell icon={<ArrowRight className="h-4 w-4" />} title={title}>
        <div className="divide-y divide-slate-100">
            {pairs.map((pair, i) => (
                <div key={i} className="grid gap-3 py-4 md:grid-cols-2 md:gap-6 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500">
                            <X className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[15px] leading-[1.65] text-slate-700">{pair.bad}</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                            <Check className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[15px] leading-[1.65] text-slate-700">{pair.good}</span>
                    </div>
                </div>
            ))}
        </div>
    </CardShell>
);

// ──────────────────────────────────────────────────────────────────────
// 6. Checklist
// ──────────────────────────────────────────────────────────────────────
export interface ChecklistData {
    title?: string;
    items: string[];
}

export const ChecklistCard = ({ title = "Чек-лист", items }: ChecklistData) => (
    <CardShell icon={<ListChecks className="h-4 w-4" />} title={title}>
        <ul className="space-y-2.5">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-[1.5px] border-[#0096D6]/40 bg-white">
                        <Check className="h-3 w-3 text-[#44B78B]" />
                    </div>
                    <span className="text-[16px] leading-[1.7] text-slate-700">{item}</span>
                </li>
            ))}
        </ul>
    </CardShell>
);

// ──────────────────────────────────────────────────────────────────────
// 7. Quote Highlight
// ──────────────────────────────────────────────────────────────────────
export interface QuoteHighlightData {
    quote: string;
    author?: string;
}

export const QuoteHighlightCard = ({ quote, author }: QuoteHighlightData) => (
    <div className="not-prose my-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <Quote className="mb-3 h-7 w-7 text-[#0096D6]/30" />
        <blockquote className="text-[19px] font-medium leading-[1.55] text-slate-800 md:text-[21px]">
            {quote}
        </blockquote>
        {author && <div className="mt-3 text-sm font-medium text-slate-500">— {author}</div>}
    </div>
);

// ──────────────────────────────────────────────────────────────────────
// Discriminated union dispatcher
// ──────────────────────────────────────────────────────────────────────
export type InfographicSpec =
    | { variant: "key-takeaways"; data: KeyTakeawaysData }
    | { variant: "process-steps"; data: ProcessStepsData }
    | { variant: "stat-highlight"; data: StatHighlightData }
    | { variant: "comparison"; data: ComparisonData }
    | { variant: "pairwise-comparison"; data: PairwiseComparisonData }
    | { variant: "checklist"; data: ChecklistData }
    | { variant: "quote"; data: QuoteHighlightData };

export const BlogInfographic = (spec: InfographicSpec) => {
    switch (spec.variant) {
        case "key-takeaways":
            return <KeyTakeawaysCard {...spec.data} />;
        case "process-steps":
            return <ProcessStepsCard {...spec.data} />;
        case "stat-highlight":
            return <StatHighlightCard {...spec.data} />;
        case "comparison":
            return <ComparisonCard {...spec.data} />;
        case "pairwise-comparison":
            return <PairwiseComparisonCard {...spec.data} />;
        case "checklist":
            return <ChecklistCard {...spec.data} />;
        case "quote":
            return <QuoteHighlightCard {...spec.data} />;
    }
};
