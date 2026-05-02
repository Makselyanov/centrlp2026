import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { useAutoBreadcrumb, useFaqSchema, useServiceSchema } from "@/components/SeoSchemas";
import { BentoSection } from "@/components/services/BentoSection";
import { BentoCard } from "@/components/services/BentoCard";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Bot, Orbit, Sparkles, Workflow } from "lucide-react";
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

const floatingIcons = [
  { icon: Sparkles, className: "top-24 left-[8%]", color: "text-[#0096D6]/18", duration: 6.5, y: -18, rotate: 5 },
  { icon: Orbit, className: "top-20 right-[10%]", color: "text-[#44B78B]/18", duration: 7.5, y: 20, rotate: -6 },
  { icon: Workflow, className: "bottom-24 left-[12%]", color: "text-[#0b7cb0]/15", duration: 8.5, y: -14, rotate: 4 },
  { icon: Bot, className: "bottom-20 right-[12%]", color: "text-[#44B78B]/14", duration: 7, y: 16, rotate: -4 },
];

const formatServicePrice = (price?: string) => {
  if (!price) {
    return null;
  }

  const value = Number(price);
  if (!Number.isFinite(value)) {
    return price;
  }

  return `${value.toLocaleString("ru-RU")} ₽`;
};

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

  const formattedPrice = formatServicePrice(price);

  return (
    <Layout title={title} description={description}>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#0096D6]/[0.045] to-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 right-10 h-72 w-72 rounded-full bg-[#0096D6]/12 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-[#44B78B]/12 blur-3xl"
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0096D6]/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#44B78B]/35 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
          {floatingIcons.map(({ icon: Icon, className, color, duration, y, rotate }, index) => (
            <motion.div
              key={className}
              animate={{ y: [0, y, 0], rotate: [0, rotate, 0] }}
              transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
              className={`absolute ${className} ${color}`}
            >
              <Icon className="h-12 w-12 lg:h-14 lg:w-14" />
            </motion.div>
          ))}
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0096D6] shadow-sm backdrop-blur-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#44B78B]/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#44B78B]" />
              </span>
              {badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
              className="mb-6 bg-[linear-gradient(135deg,#007DB3_0%,#0096D6_38%,#44B78B_100%)] bg-clip-text text-4xl font-bold leading-[1.04] tracking-tight text-transparent md:text-5xl lg:text-6xl"
            >
              {heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
              className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl"
            >
              {heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.24 }}
              className="mb-8 flex flex-wrap justify-center gap-2.5"
            >
              {heroPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.28 + index * 0.06 }}
                  className="rounded-full border border-slate-200 bg-white/85 px-4 py-1.5 text-sm text-slate-700 shadow-sm backdrop-blur-sm"
                >
                  {point}
                </motion.div>
              ))}
            </motion.div>

            {formattedPrice && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.28 }}
                className="mx-auto mb-10 grid max-w-2xl gap-3 rounded-[28px] border border-[#0096D6]/15 bg-white/88 p-4 text-left shadow-[0_18px_70px_-38px_rgba(0,150,214,0.42)] backdrop-blur-sm sm:grid-cols-[1fr_auto] sm:items-center sm:p-5"
              >
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0b7cb0]">
                    Ориентир стоимости
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-slate-950">от {formattedPrice}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Точная смета зависит от сценария, интеграций, контента и объёма внедрения.
                  </p>
                </div>
                <Button variant="outline" asChild className="border-slate-300 bg-white">
                  <Link to="/prices">
                    Весь прайс <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                asChild
                className="border-0 bg-[linear-gradient(135deg,#0096D6_0%,#44B78B_100%)] text-white shadow-[0_18px_50px_-24px_rgba(0,150,214,0.7)] transition-transform duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                <a href="#contact">
                  Обсудить проект <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-slate-300 bg-white/80 backdrop-blur-sm">
                <Link to="/services">Все услуги</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <ServiceImageBand slug={slug} alt={`${title} — иллюстрация услуги CentrLP`} />

      <BentoSection tone="white" eyebrow="Для кого" title={audienceTitle} description={audienceDescription}>
        <div className="grid gap-5 md:grid-cols-3">
          {audienceItems.map((item) => (
            <BentoCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
          ))}
        </div>
      </BentoSection>

      <BentoSection
        tone="slate"
        eyebrow="Что вы получите"
        title={deliverablesTitle}
        description={deliverablesDescription}
      >
        <div className="grid gap-5 md:grid-cols-2">
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

      <BentoSection tone="white" eyebrow="Где работает" title={useCasesTitle} description={useCasesDescription}>
        <div className="grid gap-5 lg:grid-cols-3">
          {useCases.map((item) => (
            <BentoCard key={item.title} title={item.title} text={item.text} bullets={item.bullets} />
          ))}
        </div>
      </BentoSection>

      <BentoSection
        tone="tint"
        eyebrow="Процесс"
        title="Как запускаем решение"
        description="Идём от бизнес-задачи и сценария продаж, а не от набора красивых экранов."
      >
        <ProcessTimeline steps={process} />
      </BentoSection>

      <BentoSection
        tone="white"
        eyebrow="Связанные решения"
        title="Сильнее в связке"
        description="Эти услуги лучше работают вместе и усиливают друг друга по продажам, автоматизации и SEO."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {relatedServices.map((item) => (
            <div
              key={item.href}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md md:p-7"
            >
              <h3 className="mb-3 text-[20px] font-bold tracking-tight text-slate-900">
                {item.title}
              </h3>
              <p className="mb-5 flex-1 leading-relaxed text-slate-600">{item.text}</p>
              <Button variant="outline" size="sm" asChild className="self-start">
                <Link to={item.href}>
                  Открыть страницу <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </BentoSection>

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
                <AccordionContent className="px-6 leading-relaxed text-slate-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </BentoSection>

      <section id="contact" className="bg-gradient-to-b from-white via-[#44B78B]/[0.04] to-white py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="relative mb-4 inline-block text-[28px] font-bold tracking-tight text-slate-900 md:text-[34px]">
              {ctaTitle}
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">{ctaDescription}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};
