/**
 * Inline infographics for blog posts. Five variants, all on-brand
 * (#0096D6 sky blue + #44B78B mint green), responsive, and rendered with
 * Tailwind/HTML+inline-SVG decorations. No external API calls, free forever.
 *
 * Used by EnhancedMarkdown.tsx to break up long walls of text in articles.
 */
import { Check, X, ArrowRight, Lightbulb, ListChecks, TrendingUp, Quote, Sparkles } from "lucide-react";

const BRAND_BLUE = "#0096D6";
const BRAND_MINT = "#44B78B";

// ──────────────────────────────────────────────────────────────────────────
// 1. Key Takeaways — gradient card with numbered bullets
// ──────────────────────────────────────────────────────────────────────────
export interface KeyTakeawaysData {
    title?: string;
    items: string[];
}

export const KeyTakeawaysCard = ({ title = "Главное из этого раздела", items }: KeyTakeawaysData) => (
    <div className="not-prose my-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0096D6] via-[#37a3c9] to-[#44B78B] p-[1px] shadow-xl shadow-[#0096D6]/20">
            <div className="relative rounded-[calc(1.5rem-1px)] bg-white p-8 dark:bg-slate-900">
                {/* Decorative blob */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 blur-3xl" />
                <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] shadow-md">
                            <Lightbulb className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h4>
                    </div>
                    <ul className="space-y-3">
                        {items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6]/15 to-[#44B78B]/15 text-sm font-bold text-[#0096D6]">
                                    {i + 1}
                                </div>
                                <span className="text-base leading-7 text-slate-700 dark:text-slate-200">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

// ──────────────────────────────────────────────────────────────────────────
// 2. Process Steps — horizontal flow with circles + arrows
// ──────────────────────────────────────────────────────────────────────────
export interface ProcessStepsData {
    title?: string;
    steps: { title: string; desc?: string }[];
}

export const ProcessStepsCard = ({ title = "Как это работает", steps }: ProcessStepsData) => (
    <div className="not-prose my-10">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-8 shadow-lg dark:border-slate-700 dark:from-slate-900 dark:to-slate-900/50">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#44B78B] to-[#0096D6] shadow-md">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h4>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, i) => (
                    <div key={i} className="relative">
                        <div className="group relative h-full rounded-2xl border border-slate-200/70 bg-white p-5 transition-all hover:border-[#0096D6]/40 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-base font-bold text-white shadow-md">
                                {String(i + 1).padStart(2, "0")}
                            </div>
                            <h5 className="mb-1.5 text-base font-semibold text-slate-900 dark:text-white">{step.title}</h5>
                            {step.desc && <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{step.desc}</p>}
                        </div>
                        {i < steps.length - 1 && (
                            <ArrowRight className="absolute top-1/2 -right-3 hidden h-5 w-5 -translate-y-1/2 text-[#0096D6]/40 lg:block" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ──────────────────────────────────────────────────────────────────────────
// 3. Stat Highlight — big number + label
// ──────────────────────────────────────────────────────────────────────────
export interface StatHighlightData {
    value: string;
    label: string;
    context?: string;
}

export const StatHighlightCard = ({ value, label, context }: StatHighlightData) => (
    <div className="not-prose my-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-900 md:p-10">
            {/* Decorative wave SVG */}
            <svg
                className="absolute -bottom-10 -right-10 h-64 w-64 opacity-[0.07]"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="statGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={BRAND_BLUE} />
                        <stop offset="100%" stopColor={BRAND_MINT} />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#statGrad)"
                    d="M44.7,-77.3C58.8,-69.6,71.6,-58.7,79.2,-45.1C86.7,-31.5,89,-15.7,87.5,-0.9C86,13.9,80.7,27.9,73.4,41.1C66.1,54.4,56.8,66.9,44.5,73.6C32.3,80.4,17,81.4,1.7,78.5C-13.6,75.7,-27.2,69,-40.5,61.7C-53.8,54.4,-66.7,46.5,-75.1,34.6C-83.5,22.7,-87.4,6.9,-85.4,-7.7C-83.4,-22.3,-75.5,-35.7,-65.1,-46.4C-54.7,-57,-41.7,-65,-28.2,-72.7C-14.7,-80.5,-0.9,-87.9,12.6,-87.9C26.1,-87.9,30.7,-85.1,44.7,-77.3Z"
                    transform="translate(100 100)"
                />
            </svg>
            <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] shadow-lg">
                    <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                    <div className="bg-gradient-to-r from-[#0096D6] to-[#44B78B] bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-6xl">
                        {value}
                    </div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">{label}</div>
                    {context && <div className="text-sm text-slate-600 dark:text-slate-400">{context}</div>}
                </div>
            </div>
        </div>
    </div>
);

// ──────────────────────────────────────────────────────────────────────────
// 4. Comparison — two columns (bad vs good)
// ──────────────────────────────────────────────────────────────────────────
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
    <div className="not-prose my-10">
        <div className="grid gap-4 md:grid-cols-2">
            {/* Left — bad */}
            <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/40 p-6 dark:border-rose-900/50 dark:bg-rose-950/20">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-rose-400 to-rose-300" />
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/40">
                        <X className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h5 className="text-lg font-bold text-slate-900 dark:text-white">{leftTitle}</h5>
                </div>
                <ul className="space-y-2.5">
                    {leftItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Right — good */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#0096D6] to-[#44B78B]" />
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/15 to-[#44B78B]/15">
                        <Check className="h-5 w-5 text-[#44B78B]" />
                    </div>
                    <h5 className="text-lg font-bold text-slate-900 dark:text-white">{rightTitle}</h5>
                </div>
                <ul className="space-y-2.5">
                    {rightItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#44B78B]" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

// ──────────────────────────────────────────────────────────────────────────
// 5. Checklist — items with checkbox icons
// ──────────────────────────────────────────────────────────────────────────
export interface ChecklistData {
    title?: string;
    items: string[];
}

export const ChecklistCard = ({ title = "Чек-лист", items }: ChecklistData) => (
    <div className="not-prose my-10">
        <div className="rounded-3xl border-2 border-dashed border-[#0096D6]/30 bg-white p-8 shadow-sm dark:bg-slate-900">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6] to-[#44B78B] shadow-md">
                    <ListChecks className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h4>
            </div>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50/50 to-transparent p-3 transition-colors hover:border-[#0096D6]/30 dark:border-slate-800 dark:from-slate-800/50">
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 border-[#0096D6]/40 bg-white dark:bg-slate-900">
                            <Check className="h-3.5 w-3.5 text-[#44B78B]" />
                        </div>
                        <span className="text-base leading-7 text-slate-700 dark:text-slate-200">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// ──────────────────────────────────────────────────────────────────────────
// 6. Quote Highlight — pull quote with brand bar
// ──────────────────────────────────────────────────────────────────────────
export interface QuoteHighlightData {
    quote: string;
    author?: string;
}

export const QuoteHighlightCard = ({ quote, author }: QuoteHighlightData) => (
    <div className="not-prose my-10">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0096D6]/5 via-white to-[#44B78B]/5 p-8 md:p-10 dark:from-[#0096D6]/10 dark:via-slate-900 dark:to-[#44B78B]/10">
            <div className="absolute top-0 left-8 h-1 w-24 rounded-b bg-gradient-to-r from-[#0096D6] to-[#44B78B]" />
            <Quote className="mb-4 h-10 w-10 text-[#0096D6]/30" />
            <blockquote className="text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-100 md:text-2xl">
                {quote}
            </blockquote>
            {author && <div className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">— {author}</div>}
        </div>
    </div>
);

// ──────────────────────────────────────────────────────────────────────────
// Discriminated union dispatcher
// ──────────────────────────────────────────────────────────────────────────
export type InfographicSpec =
    | { variant: "key-takeaways"; data: KeyTakeawaysData }
    | { variant: "process-steps"; data: ProcessStepsData }
    | { variant: "stat-highlight"; data: StatHighlightData }
    | { variant: "comparison"; data: ComparisonData }
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
        case "checklist":
            return <ChecklistCard {...spec.data} />;
        case "quote":
            return <QuoteHighlightCard {...spec.data} />;
    }
};
