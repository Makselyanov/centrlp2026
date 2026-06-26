import {
  BarChart3,
  Bot,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Database,
  FileSearch,
  GraduationCap,
  Gauge,
  Globe,
  Layers3,
  MapPin,
  Megaphone,
  MessageSquare,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  Rocket,
  Route,
  SearchCheck,
  ShieldCheck,
  Store,
  Target,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ContextVisualVariant =
  | "product-stack"
  | "launch-bundles"
  | "industry-map"
  | "digital-products"
  | "ai-systems"
  | "team-tools"
  | "new-channels"
  | "service-band"
  | "landing-flow";

type ContextVisualProps = {
  variant: ContextVisualVariant;
  label?: string;
  className?: string;
  icons?: LucideIcon[];
  slug?: string;
};

const brandLogos = {
  telegram: "/assets/brand-logos/telegram.svg",
  max: "/assets/messengers/max-mark.svg",
  vk: "/assets/brand-logos/vk.svg",
  yandex: "/assets/brand-logos/yandex-direct.svg",
  avito: "/assets/brand-logos/avito.svg",
};

const serviceIconMap: Record<string, LucideIcon[]> = {
  "telegram-mini-app": [MessageSquare, MonitorSmartphone, Database, Route],
  "telegram-lead-agent": [MessageSquare, Bot, ClipboardCheck, Database],
  "telegram-service-agent": [MessageSquare, Bot, CheckCircle2, Route],
  "max-messenger": [Compass, MessageSquare, Route, BarChart3],
  "custom-crm": [Database, ClipboardCheck, Route, BarChart3],
  "n8n-automation": [Route, Database, MessageSquare, CheckCircle2],
  "openclaw-ai": [Brain, Bot, Database, ShieldCheck],
  "ai-systems": [Brain, Database, SearchCheck, ShieldCheck],
  "ai-agents": [Bot, MessageSquare, ClipboardCheck, Route],
  "website-development": [Globe, MonitorSmartphone, MousePointerClick, BarChart3],
  "yandex-direct": [SearchCheck, Megaphone, MousePointerClick, BarChart3],
  "web-analytics": [FileSearch, MousePointerClick, Gauge, BarChart3],
  "avito-ads": [Store, Megaphone, MessageSquare, BarChart3],
  "branding": [Palette, Target, MonitorSmartphone, CheckCircle2],
  "design-prototyping": [MonitorSmartphone, MousePointerClick, Route, CheckCircle2],
  "content-plan": [ClipboardCheck, Route, MessageSquare, BarChart3],
  "copywriting-texts": [FileSearch, Target, CheckCircle2, Route],
  "marketing-strategy": [Compass, Target, Route, BarChart3],
  "compliance-2026": [ShieldCheck, FileSearch, Globe, ClipboardCheck],
};

const defaultIcons = [MessageSquare, Route, Database, BarChart3];

const IconTile = ({ Icon, muted = false }: { Icon: LucideIcon; muted?: boolean }) => (
  <div
    className={cn(
      "flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm",
      muted ? "text-slate-400" : "text-[#0096D6]",
    )}
  >
    <Icon className="h-5 w-5" aria-hidden="true" />
  </div>
);

const LogoBubble = ({ src }: { src: string }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
    <img src={src} alt="" aria-hidden="true" className="h-6 w-6 object-contain" loading="lazy" decoding="async" />
  </div>
);

const Connector = () => <span className="hidden h-px flex-1 bg-gradient-to-r from-[#0096D6]/25 to-[#44B78B]/45 md:block" />;

export const ContextVisual = ({ variant, label, className, icons, slug }: ContextVisualProps) => {
  const serviceIcons = icons ?? (slug ? serviceIconMap[slug] : undefined) ?? defaultIcons;

  if (variant === "service-band") {
    return (
      <div
        role="img"
        aria-label={label}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-[#0096D6]/15 bg-white p-6 shadow-sm",
          className,
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,150,214,0.06),rgba(68,183,139,0.08))]" />
        <div className="relative flex items-center justify-center gap-3 md:gap-5">
          {serviceIcons.map((Icon, index) => (
            <div key={`${slug ?? "service"}-${index}`} className="flex items-center gap-3 md:gap-5">
              <IconTile Icon={Icon} />
              {index < serviceIcons.length - 1 && <Connector />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "landing-flow") {
    return (
      <div role="img" aria-label={label} className={cn("relative h-full min-h-[220px] overflow-hidden rounded-xl bg-white p-5", className)}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,150,214,0.05),rgba(68,183,139,0.07))]" />
        <div className="relative grid h-full grid-cols-2 gap-4 md:grid-cols-4 md:items-center">
          {serviceIcons.map((Icon, index) => (
            <div key={`flow-${index}`} className="flex h-full min-h-24 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Icon className="h-8 w-8 text-[#0096D6]" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative min-h-[230px] overflow-hidden rounded-t-[28px] border-b border-slate-100 bg-white p-5",
        className,
      )}
      >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,150,214,0.05),rgba(68,183,139,0.08))]" />

      {variant === "product-stack" && (
        <div className="relative grid h-full gap-4 md:grid-cols-[0.9fr_auto_0.7fr_auto_1fr] md:items-center">
          <div className="space-y-3">
            <div className="flex gap-2">
              <LogoBubble src={brandLogos.telegram} />
              <LogoBubble src={brandLogos.max} />
              <LogoBubble src={brandLogos.vk} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <IconTile Icon={MessageSquare} muted />
              <IconTile Icon={Route} muted />
            </div>
          </div>
          <Connector />
          <IconTile Icon={Bot} />
          <Connector />
          <div className="grid grid-cols-2 gap-3">
            <IconTile Icon={Database} />
            <IconTile Icon={ClipboardCheck} />
            <IconTile Icon={BarChart3} />
            <IconTile Icon={CheckCircle2} />
          </div>
        </div>
      )}

      {variant === "launch-bundles" && (
        <div className="relative grid h-full gap-4 md:grid-cols-3 md:items-center">
          {[ClipboardCheck, Rocket, BriefcaseBusiness].map((Icon, index) => (
            <div key={index} className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-9 w-9 text-[#0096D6]" aria-hidden="true" />
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0096D6]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#44B78B]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              </div>
            </div>
          ))}
        </div>
      )}

      {variant === "industry-map" && (
        <div className="relative grid h-full gap-4 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div className="grid grid-cols-2 gap-3">
            {[Wrench, Globe, Store, GraduationCap].map((Icon, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="h-8 w-8 text-[#0096D6]" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="relative flex min-h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <MapPin className="h-10 w-10 text-[#0096D6]" aria-hidden="true" />
            <span className="absolute left-6 top-6 h-3 w-3 rounded-full bg-[#44B78B]" />
            <span className="absolute bottom-7 left-12 h-3 w-3 rounded-full bg-[#0096D6]" />
            <span className="absolute right-10 top-10 h-3 w-3 rounded-full bg-[#44B78B]" />
          </div>
        </div>
      )}

      {variant === "digital-products" && (
        <div className="relative grid h-full gap-4 md:grid-cols-[0.7fr_1fr] md:items-center">
          <div className="mx-auto flex h-44 w-28 items-center justify-center rounded-[2rem] border-8 border-slate-900 bg-white shadow-sm">
            <MonitorSmartphone className="h-10 w-10 text-[#0096D6]" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <div className="flex gap-2">
              <LogoBubble src={brandLogos.telegram} />
              <LogoBubble src={brandLogos.max} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <IconTile Icon={Route} />
              <IconTile Icon={Database} />
              <IconTile Icon={CheckCircle2} />
            </div>
          </div>
        </div>
      )}

      {variant === "ai-systems" && (
        <div className="relative flex h-full items-center justify-center gap-5">
          <IconTile Icon={MessageSquare} />
          <Connector />
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#0096D6]/20 bg-white shadow-sm">
            <Brain className="h-12 w-12 text-[#0096D6]" aria-hidden="true" />
          </div>
          <Connector />
          <IconTile Icon={Database} />
        </div>
      )}

      {variant === "team-tools" && (
        <div className="relative grid h-full gap-4 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div className="grid grid-cols-2 gap-3">
            <IconTile Icon={MessageSquare} muted />
            <IconTile Icon={Route} muted />
            <IconTile Icon={Database} muted />
            <IconTile Icon={Target} muted />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <IconTile Icon={SearchCheck} />
            <IconTile Icon={Gauge} />
            <IconTile Icon={ClipboardCheck} />
            <IconTile Icon={BarChart3} />
          </div>
        </div>
      )}

      {variant === "new-channels" && (
        <div className="relative flex h-full items-center justify-center gap-4">
          <LogoBubble src={brandLogos.telegram} />
          <LogoBubble src={brandLogos.max} />
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
            <Compass className="h-10 w-10 text-[#0096D6]" aria-hidden="true" />
          </div>
          <LogoBubble src={brandLogos.vk} />
          <LogoBubble src={brandLogos.avito} />
        </div>
      )}
    </div>
  );
};
