/**
 * Unified section wrapper for service pages. Reduces vertical padding vs
 * the old py-20 gradient-hero alternating pattern, supports subtle background
 * variants, and provides a consistent heading with brand left-bar.
 */
import type { ReactNode } from "react";

type Tone = "white" | "slate" | "tint";

interface BentoSectionProps {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  white: "bg-white",
  slate: "bg-slate-50/70",
  tint: "bg-gradient-to-b from-white via-[#0096D6]/[0.025] to-white",
};

export const BentoSection = ({
  id,
  tone = "white",
  eyebrow,
  title,
  description,
  children,
  className = "",
}: BentoSectionProps) => (
  <section id={id} className={`py-14 md:py-20 ${toneClasses[tone]} ${className}`}>
    <div className="container mx-auto px-4">
      {(eyebrow || title || description) && (
        <div className="mb-10 md:mb-12 max-w-3xl">
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0096D6]">
              <span className="h-px w-8 bg-[#0096D6]" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="relative pl-4 border-l-[3px] border-[#0096D6] text-[28px] md:text-[34px] font-bold tracking-tight text-slate-900">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 pl-4 text-lg text-slate-600 leading-relaxed">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);
