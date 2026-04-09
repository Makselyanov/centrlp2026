import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { useAutoBreadcrumb, useFaqSchema, useServiceSchema } from "@/components/SeoSchemas";
import { BentoSection } from "@/components/services/BentoSection";
import { BentoCard } from "@/components/services/BentoCard";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  bullets?: string[];
};

type UseCaseItem = {
  title: string;
  text: string;
  bullets: string[];
};

type ProcessItem = {
  step: string;
  title: string;
  text: string;
};

type RelatedService = {
  title: string;
  text: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

interface ServicePageTemplateProps {
  title: string;
  description: string;
  slug: string;
  breadcrumbName: string;
  schemaName: string;
  schemaDescription: string;
  badge: string;
  heroTitle: string;
  heroDescription: string;
  heroPoints: string[];
  audienceTitle: string;
  audienceDescription: string;
  audienceItems: FeatureItem[];
  deliverablesTitle: string;
  deliverablesDescription: string;
  deliverables: FeatureItem[];
  useCasesTitle: string;
  useCasesDescription: string;
  useCases: UseCaseItem[];
  process: ProcessItem[];
  relatedServices: RelatedService[];
  faqItems: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
  price?: string;
}

export const ServicePageTemplate = ({
  title,
  description,
  slug,
  breadcrumbName,
  schemaName,
  schemaDescription,
  badge,
  heroTitle,
  heroDescription,
  heroPoints,
  audienceTitle,
  audienceDescription,
  audienceItems,
  deliverablesTitle,
  deliverablesDescription,
  deliverables,
  useCasesTitle,
  useCasesDescription,
  useCases,
  process,
  relatedServices,
  faqItems,
  ctaTitle,
  ctaDescription,
  price,
}: ServicePageTemplateProps) => {
  useAutoBreadcrumb(breadcrumbName);
  useServiceSchema({ name: schemaName, description: schemaDescription, price });
  useFaqSchema(faqItems);

  return (
    <Layout title={title} description={description}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-white via-[#0096D6]/[0.04] to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#0096D6]/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#44B78B]/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[#0096D6] text-xs font-semibold uppercase tracking-wider shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-[#44B78B] animate-pulse" />
              {badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              {heroDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {heroPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm text-slate-700 shadow-sm"
                >
                  {point}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button size="lg" asChild>
                <a href="#contact">
                  Обсудить проект <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">Все услуги</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceImageBand slug={slug} alt={`${title} — иллюстрация услуги CentrLP`} />

      {/* ── Audience — 3-col bento ──────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Для кого"
        title={audienceTitle}
        description={audienceDescription}
      >
        <div className="grid md:grid-cols-3 gap-5">
          {audienceItems.map((item) => (
            <BentoCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </BentoSection>

      {/* ── Deliverables — 2-col feature bento ──────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="Что вы получите"
        title={deliverablesTitle}
        description={deliverablesDescription}
      >
        <div className="grid md:grid-cols-2 gap-5">
          {deliverables.map((item) => (
            <BentoCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
              bullets={item.bullets}
              variant="feature"
            />
          ))}
        </div>
      </BentoSection>

      {/* ── Use cases ───────────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Где работает"
        title={useCasesTitle}
        description={useCasesDescription}
      >
        <div className="grid lg:grid-cols-3 gap-5">
          {useCases.map((item) => (
            <BentoCard
              key={item.title}
              title={item.title}
              text={item.text}
              bullets={item.bullets}
            />
          ))}
        </div>
      </BentoSection>

      {/* ── Process — adaptive timeline ─────────────────────────────── */}
      <BentoSection
        tone="tint"
        eyebrow="Процесс"
        title="Как запускаем решение"
        description="Идём от бизнес-задачи и сценария продаж, а не от набора красивых экранов."
      >
        <ProcessTimeline steps={process} />
      </BentoSection>

      {/* ── Related services ────────────────────────────────────────── */}
      <BentoSection
        tone="white"
        eyebrow="Связанные решения"
        title="Сильнее в связке"
        description="Эти услуги лучше работают вместе и усиливают друг друга по продажам, автоматизации и SEO."
      >
        <div className="grid md:grid-cols-3 gap-5">
          {relatedServices.map((item) => (
            <div
              key={item.href}
              className="h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm transition hover:shadow-md hover:border-slate-300"
            >
              <h3 className="mb-3 text-[20px] font-bold tracking-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mb-5 flex-1 text-slate-600 leading-relaxed">{item.text}</p>
              <Button variant="outline" size="sm" asChild className="self-start">
                <Link to={item.href}>
                  Открыть страницу <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </BentoSection>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <BentoSection
        tone="slate"
        eyebrow="FAQ"
        title="Частые вопросы"
        description="Собрали ответы на вопросы, которые обычно возникают перед запуском цифрового продукта."
      >
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={item.question}>
                <AccordionTrigger className="px-6 text-left text-slate-900 hover:text-[#0096D6]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-slate-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </BentoSection>

      {/* ── Contact CTA ─────────────────────────────────────────────── */}
      <section id="contact" className="py-14 md:py-20 bg-gradient-to-b from-white via-[#44B78B]/[0.04] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="relative inline-block text-[28px] md:text-[34px] font-bold tracking-tight text-slate-900 mb-4">
              {ctaTitle}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">{ctaDescription}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};
