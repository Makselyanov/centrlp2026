/**
 * Unified card for service pages. Matches the blog BlogInfographic CardShell
 * so the whole site speaks one visual language: white card, slate border,
 * subtle shadow, brand gradient icon square, rounded-2xl corners.
 *
 * Variants:
 * - default: standard card with icon + title + text + optional bullets
 * - accent: same chrome but with a subtle brand tint background
 * - feature: larger padding, used for 2-col grids
 */
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "default" | "accent" | "feature";

interface BentoCardProps {
  icon?: LucideIcon;
  title: string;
  text?: string;
  bullets?: string[];
  variant?: Variant;
  children?: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  default: "p-6 md:p-7",
  accent: "p-6 md:p-7 bg-gradient-to-br from-white via-[#0096D6]/[0.03] to-[#44B78B]/[0.04]",
  feature: "p-7 md:p-9",
};

export const BentoCard = ({
  icon: Icon,
  title,
  text,
  bullets,
  variant = "default",
  children,
  className = "",
}: BentoCardProps) => (
  <div
    className={`h-full rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:border-slate-300 ${variantClasses[variant]} ${className}`}
  >
    {Icon && (
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0096D6]/10 to-[#44B78B]/10 text-[#0096D6]">
        <Icon className="h-6 w-6" />
      </div>
    )}
    <h3 className="mb-3 text-[20px] md:text-[22px] font-bold tracking-tight text-slate-900">
      {title}
    </h3>
    {text && <p className="text-slate-600 leading-relaxed">{text}</p>}
    {bullets && bullets.length > 0 && (
      <ul className="mt-5 space-y-2.5">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5">
            <div className="mt-[3px] flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#0096D6]/15 to-[#44B78B]/15">
              <Check className="h-3 w-3 text-[#0096D6]" strokeWidth={3} />
            </div>
            <span className="text-[15px] leading-[1.65] text-slate-700">{bullet}</span>
          </li>
        ))}
      </ul>
    )}
    {children}
  </div>
);
