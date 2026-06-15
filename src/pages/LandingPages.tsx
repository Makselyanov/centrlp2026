import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { MessengerLinks, TELEGRAM_URL } from "@/components/MessengerLinks";
import { useAutoBreadcrumb, useFaqSchema, useServiceSchema } from "@/components/SeoSchemas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { landingPages, type LandingPage, type LandingPageKey } from "@/data/landingPages";
import { trackMetric } from "@/lib/metrics";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  MessageCircle,
  MousePointerClick,
  Phone,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const heroIcons = [Clock3, Target, BarChart3, ShieldCheck];
const checklistIcons = [SearchCheck, MousePointerClick, BarChart3, MessageCircle];

const scrollToForm = () => {
  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const MetricCard = ({ label, index }: { label: string; index: number }) => {
  const Icon = heroIcons[index % heroIcons.length];

  return (
    <Card className="group border-[#0096D6]/15 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0096D6]/35 hover:shadow-[0_18px_60px_-36px_rgba(0,150,214,0.6)]">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0096D6]/15 to-[#44B78B]/15 text-[#0096D6] transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm font-semibold leading-6 text-slate-800">{label}</div>
    </Card>
  );
};

const ChecklistCard = ({
  item,
  index,
}: {
  item: LandingPage["checklist"][number];
  index: number;
}) => {
  const Icon = checklistIcons[index % checklistIcons.length];

  return (
    <Card className="h-full border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0096D6]/30 hover:shadow-lg">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0096D6]/10 text-[#0096D6]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-3 text-xl font-bold leading-tight text-slate-900">{item.title}</h3>
      <p className="text-sm leading-7 text-slate-600">{item.text}</p>
    </Card>
  );
};

const ProcessStep = ({
  item,
  index,
}: {
  item: LandingPage["process"][number];
  index: number;
}) => (
  <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-sm font-bold text-white">
      {index + 1}
    </div>
    <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
    <p className="text-sm leading-7 text-slate-600">{item.text}</p>
  </div>
);

const LandingPageView = ({ pageKey }: { pageKey: LandingPageKey }) => {
  const page = landingPages[pageKey];
  useAutoBreadcrumb(page.schemaName);
  useFaqSchema(page.faq);
  useServiceSchema({
    name: page.schemaName,
    description: page.description,
    price: page.schemaPrice,
  });

  return (
    <Layout title={page.title} description={page.description}>
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-white to-[#0096D6]/10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.035]" />
        <div className="absolute left-0 top-28 h-72 w-72 rounded-full bg-[#0096D6]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#44B78B]/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0096D6]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0096D6] shadow-sm">
                <Sparkles className="h-4 w-4" />
                {page.badge}
              </div>

              <h1 className="mb-6 max-w-5xl break-words text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="text-brand-gradient">{page.h1}</span>
              </h1>

              <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
                {page.lead}
              </p>

              <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  className="h-14 w-full rounded-full px-6 text-base shadow-button transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto sm:px-8"
                  onClick={() => {
                    trackMetric("landing_primary_cta_click", { path: page.path });
                    scrollToForm();
                  }}
                >
                  {page.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 w-full rounded-full border-[#0096D6]/30 px-6 text-base transition-all duration-300 hover:-translate-y-0.5 hover:border-[#44B78B]/40 hover:bg-[#44B78B]/10 sm:w-auto sm:px-8"
                >
                  <a
                    href={pageKey === "aiAutomation" ? "/ai-plan" : pageKey === "expressAudit" ? TELEGRAM_URL : page.related[0]?.href || "/contacts"}
                    target={pageKey === "expressAudit" ? "_blank" : undefined}
                    rel={pageKey === "expressAudit" ? "noopener noreferrer" : undefined}
                    onClick={() => trackMetric("landing_secondary_cta_click", { path: page.path })}
                  >
                    {page.secondaryCta}
                  </a>
                </Button>
              </div>

              <div className="flex min-w-0 flex-wrap items-center gap-3 text-sm text-slate-600">
                <a
                  href="tel:+79058248564"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0096D6]/35 hover:text-[#0096D6]"
                  data-metric="phone-click"
                >
                  <Phone className="h-4 w-4" />
                  8-905-824-85-64
                </a>
                <MessengerLinks variant="fastlane" className="min-w-0 max-w-full" />
              </div>
            </div>

            <div className="relative">
              <Card className="relative overflow-hidden border-[#0096D6]/15 bg-white/85 p-6 shadow-[0_28px_90px_-42px_rgba(0,150,214,0.65)] backdrop-blur">
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[4rem] bg-gradient-to-br from-[#0096D6]/18 to-[#44B78B]/18" />
                <div className="relative">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0096D6]">
                    Стоимость входа
                  </div>
                  <div className="text-4xl font-bold text-slate-950">{page.price}</div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{page.priceNote}</p>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {page.heroFacts.map((fact, index) => (
                    <MetricCard key={fact} label={fact} index={index} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#44B78B]/10 px-4 py-2 text-sm font-semibold text-[#348d68]">
              <TrendingUp className="h-4 w-4" />
              Рост заявок начинается с связки
            </div>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">{page.painTitle}</h2>
            <p className="text-lg leading-8 text-slate-600">{page.painText}</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">{page.checklistTitle}</h2>
            <p className="text-base leading-7 text-slate-600">
              Проверяем не абстрактную красоту страницы, а то, что влияет на заявку, рекламу и дальнейшие решения.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {page.checklist.map((item, index) => (
              <ChecklistCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">{page.processTitle}</h2>
              <p className="text-base leading-7 text-slate-600">
                Работа идет от фактов к действиям: сначала проверяем путь клиента, потом решаем, что исправлять и во что вкладываться.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {page.process.map((item, index) => (
                <ProcessStep key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-hero py-20 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-[#0096D6]/15 bg-white/85 p-8 shadow-[0_26px_90px_-44px_rgba(0,150,214,0.7)] md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">{page.resultTitle}</h2>
                <p className="text-base leading-7 text-slate-600">
                  На выходе нужен не отчет ради отчета, а понятный следующий шаг: что чинить сейчас, что проверять рекламой, а что не трогать без данных.
                </p>
              </div>
              <div className="grid gap-4">
                {page.results.map((result) => (
                  <div key={result} className="flex gap-3 rounded-2xl border border-white/80 bg-white p-4 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#44B78B]" />
                    <p className="text-sm leading-7 text-slate-700">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="contact-form" className="scroll-mt-28 bg-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">Оставить заявку</h2>
            <p className="text-base leading-7 text-slate-600">
              Опишите сайт, нишу или задачу. Если ссылки пока нет, оставьте контакт и коротко напишите, что нужно проверить.
            </p>
          </div>
          <div className="scroll-mt-28">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="mb-4 text-3xl font-bold leading-tight text-slate-950 md:text-4xl">Частые вопросы</h2>
              <p className="text-base leading-7 text-slate-600">
                Коротко о том, как принимать решение без лишнего бюджета и затяжного запуска.
              </p>
            </div>
            <div className="space-y-4">
              {page.faq.map((item) => (
                <details key={item.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-bold text-slate-900">
                    {item.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-5 rounded-3xl border border-[#0096D6]/15 bg-gradient-to-r from-[#0096D6]/[0.07] to-[#44B78B]/[0.07] p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0096D6]">Связанные услуги</div>
              <div className="flex flex-wrap gap-3">
                {page.related.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0096D6]/35 hover:text-[#0096D6]"
                  >
                    {item.title}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>
            <Button type="button" size="lg" className="rounded-full" onClick={scrollToForm}>
              Получить расчет
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const ExpressAuditPage = () => <LandingPageView pageKey="expressAudit" />;
export const WebsiteDevelopmentTyumenPage = () => <LandingPageView pageKey="websiteDevelopmentTyumen" />;
export const LandingTyumenPage = () => <LandingPageView pageKey="landingTyumen" />;
export const YandexDirectTyumenPage = () => <LandingPageView pageKey="yandexDirectTyumen" />;
export const CrmBusinessPage = () => <LandingPageView pageKey="crmBusiness" />;
export const AiAutomationPage = () => <LandingPageView pageKey="aiAutomation" />;
