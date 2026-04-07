import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { useAutoBreadcrumb, useFaqSchema, useServiceSchema } from "@/components/SeoSchemas";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-2 animate-pulse" />
              {badge}
            </div>
            <h1 className="mb-6">{heroTitle}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              {heroDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {heroPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-foreground shadow-sm"
                >
                  {point}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="mb-4">{audienceTitle}</h2>
            <p className="text-lg text-muted-foreground">{audienceDescription}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {audienceItems.map((item) => (
              <Card key={item.title} className="p-8 shadow-card h-full">
                <item.icon className="w-12 h-12 text-primary mb-5" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="mb-4">{deliverablesTitle}</h2>
            <p className="text-lg text-muted-foreground">{deliverablesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {deliverables.map((item) => (
              <Card key={item.title} className="p-8 shadow-card bg-card h-full">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{item.text}</p>
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="space-y-3">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-accent-2 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="mb-4">{useCasesTitle}</h2>
            <p className="text-lg text-muted-foreground">{useCasesDescription}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {useCases.map((item) => (
              <Card key={item.title} className="p-8 shadow-card h-full">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground mb-6">{item.text}</p>
                <ul className="space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Как запускаем решение</h2>
            <p className="text-lg text-muted-foreground">
              Идём от бизнес-задачи и сценария продаж, а не от набора красивых экранов.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item) => (
              <Card key={item.step} className="p-6 shadow-card bg-card h-full">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="mb-4">Связанные решения</h2>
            <p className="text-lg text-muted-foreground">
              Эти услуги лучше работают в связке и усиливают друг друга по продажам, автоматизации и SEO.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((item) => (
              <Card key={item.href} className="p-8 shadow-card h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{item.text}</p>
                <Button variant="outline" asChild>
                  <Link to={item.href}>Открыть страницу</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Частые вопросы</h2>
              <p className="text-lg text-muted-foreground">
                Собрали ответы на вопросы, которые обычно возникают перед запуском цифрового продукта.
              </p>
            </div>
            <Card className="p-2 shadow-card bg-card">
              <Accordion type="single" collapsible>
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={item.question}>
                    <AccordionTrigger className="px-6 text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="px-6 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="mb-4">{ctaTitle}</h2>
            <p className="text-xl text-muted-foreground">{ctaDescription}</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};
