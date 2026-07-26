import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type CharacterStoryTone = "services" | "projects" | "contacts";

type CharacterStoryCalloutProps = {
  id: string;
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  actionLabel: string;
  actionHref: string;
  tone: CharacterStoryTone;
  imageSide?: "left" | "right";
};

const toneStyles: Record<
  CharacterStoryTone,
  {
    shell: string;
    text: string;
    action: string;
    glow: string;
  }
> = {
  services: {
    shell: "bg-[#071d28] text-white",
    text: "text-sky-100/80",
    action: "bg-[#44B78B] text-[#05231b] hover:bg-[#57c993]",
    glow: "bg-[#0096D6]/35",
  },
  projects: {
    shell: "bg-[#eaf7fb] text-slate-950",
    text: "text-slate-600",
    action: "bg-[#071d28] text-white hover:bg-[#0d3040]",
    glow: "bg-[#e66d19]/20",
  },
  contacts: {
    shell: "bg-[#075368] text-white",
    text: "text-cyan-50/80",
    action: "bg-white text-[#075368] hover:bg-cyan-50",
    glow: "bg-[#44B78B]/35",
  },
};

export const CharacterStoryCallout = ({
  id,
  title,
  text,
  imageSrc,
  imageAlt,
  actionLabel,
  actionHref,
  tone,
  imageSide = "right",
}: CharacterStoryCalloutProps) => {
  const styles = toneStyles[tone];
  const actionClasses = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
    styles.action,
  );
  const actionContent = (
    <>
      {actionLabel}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </>
  );

  return (
    <section className="py-8 sm:py-10" aria-labelledby={`${id}-title`}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "group relative isolate overflow-hidden rounded-2xl px-5 pt-7 sm:px-8 md:px-10 md:pt-0",
            styles.shell,
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute -bottom-32 h-72 w-72 rounded-full blur-3xl",
              imageSide === "left" ? "-left-12" : "-right-12",
              styles.glow,
            )}
            aria-hidden="true"
          />

          <div
            className={cn(
              "relative grid min-w-0 items-end gap-4 md:min-h-[21rem] md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.42fr)] md:gap-8",
              imageSide === "left" &&
                "md:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)]",
            )}
          >
            <div
              className={cn(
                "min-w-0 self-center py-2 md:py-10",
                imageSide === "left" && "md:order-2",
              )}
            >
              <h2
                id={`${id}-title`}
                className="max-w-2xl text-balance text-2xl font-bold leading-tight sm:text-3xl md:text-4xl"
              >
                {title}
              </h2>
              <p className={cn("mt-4 max-w-2xl text-base leading-7 sm:text-lg", styles.text)}>
                {text}
              </p>
              <div className="mt-6">
                {actionHref.startsWith("#") ? (
                  <a
                    href={actionHref}
                    className={actionClasses}
                    data-metric="character-callout-click"
                  >
                    {actionContent}
                  </a>
                ) : (
                  <Link
                    to={actionHref}
                    className={actionClasses}
                    data-metric="character-callout-click"
                  >
                    {actionContent}
                  </Link>
                )}
              </div>
            </div>

            <div
              className={cn(
                "relative flex min-w-0 items-end justify-center",
                imageSide === "left" && "md:order-1",
              )}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                width="941"
                height="1672"
                loading="lazy"
                decoding="async"
                className="h-auto max-h-[17rem] w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transform-none md:max-h-[21rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
