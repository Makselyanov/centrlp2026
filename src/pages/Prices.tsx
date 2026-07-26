import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { useAutoBreadcrumb } from "@/components/SeoSchemas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Check,
  Layers3,
  LineChart,
  Palette,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  packagePrices,
  pricingGroups,
  pricingUpdatedAt,
  servicePrices,
  type ServicePriceCategory,
} from "@/data/pricing";

type CategoryMeta = {
  icon: LucideIcon;
  from: string;
  short: string;
  accent: string;
};

const categoryMeta: Record<ServicePriceCategory, CategoryMeta> = {
  growth: {
    icon: LineChart,
    from: "от 15 000 ₽",
    short: "Сайты, реклама, аналитика и стратегия",
    accent: "text-sky-700 bg-sky-50",
  },
  packaging: {
    icon: Palette,
    from: "от 12 000 ₽",
    short: "Оффер, дизайн, тексты и контент",
    accent: "text-violet-700 bg-violet-50",
  },
  product: {
    icon: Layers3,
    from: "от 90 000 ₽",
    short: "CRM, приложения, Mini App и MVP",
    accent: "text-blue-700 bg-blue-50",
  },
  ai: {
    icon: Bot,
    from: "от 15 000 ₽",
    short: "AI-агенты, боты и автоматизация",
    accent: "text-emerald-700 bg-emerald-50",
  },
  compliance: {
    icon: ShieldCheck,
    from: "от 45 000 ₽",
    short: "Сайт, формы, cookie и персональные данные",
    accent: "text-amber-800 bg-amber-50",
  },
  industry: {
    icon: BriefcaseBusiness,
    from: "от 80 000 ₽",
    short: "Готовые отраслевые сценарии",
    accent: "text-rose-700 bg-rose-50",
  },
};

const orderedGroupIds: ServicePriceCategory[] = [
  "growth",
  "packaging",
  "product",
  "ai",
  "compliance",
  "industry",
];

const packageStages = [
  {
    label: "Проверить",
    icon: Target,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Запустить",
    icon: Sparkles,
    tone: "bg-sky-50 text-sky-700",
  },
  {
    label: "Выстроить продажи",
    icon: LineChart,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    label: "Автоматизировать",
    icon: Workflow,
    tone: "bg-violet-50 text-violet-700",
  },
];

const formatServicesCount = (count: number) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} услуг`;
  }

  if (lastDigit === 1) {
    return `${count} услуга`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} услуги`;
  }

  return `${count} услуг`;
};

const Prices = () => {
  useAutoBreadcrumb("Цены");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const groupedServices = orderedGroupIds.map((id) => {
    const group = pricingGroups.find((item) => item.id === id);

    if (!group) {
      throw new Error(`Pricing group "${id}" is missing`);
    }

    return {
      group,
      services: servicePrices.filter((service) => service.category === id),
    };
  });

  return (
    <Layout
      title="Цены на сайты, рекламу, AI и CRM | Прайс CentrLP Тюмень"
      description="Прайс CentrLP по понятным группам: разбор заявок от 15 000 ₽, сайт от 45 000 ₽, продвижение от 20 000 ₽, CRM и цифровые продукты от 90 000 ₽, AI-сценарии от 15 000 ₽."
    >
      <section className="bg-[#f7fafb] pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-800">
              <Sparkles className="h-4 w-4" />
              Прайс обновлён: {pricingUpdatedAt}
            </div>

            <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-slate-950 [text-wrap:balance] md:text-5xl lg:text-6xl">
              Сколько стоит сайт, продвижение и AI — по понятным группам
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
              Выберите задачу, сравните стартовую стоимость и откройте только нужную группу.
              Точная смета появляется после короткого разбора объёма и интеграций.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-lg px-6 text-base"
                onClick={() => scrollTo("price-groups")}
              >
                Выбрать группу услуг
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-lg border-slate-300 bg-white px-6 text-base"
                onClick={() => scrollTo("form")}
              >
                Обсудить задачу
              </Button>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-2xl bg-[#fbfaf6] shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
            <img
              src="/images/prices/max-pricing-guide-v1.webp"
              alt="Макс показывает основные ценовые ориентиры CentrLP"
              width={1536}
              height={1024}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full"
            />

            <div className="absolute left-[4%] top-[8%] w-[44%] space-y-2.5 sm:left-[7%] sm:top-[12%] sm:w-[38%] sm:space-y-3">
              <a
                href="#express"
                className="block rounded-xl bg-white px-3 py-2.5 shadow-sm transition-transform hover:-translate-y-0.5 sm:px-4 sm:py-3"
              >
                <span className="block text-[11px] font-medium text-slate-500 sm:text-sm">Разбор заявок</span>
                <strong className="block text-sm text-slate-950 sm:text-lg">от 15 000 ₽</strong>
              </a>
              <a
                href="#price-groups"
                className="block rounded-xl bg-white px-3 py-2.5 shadow-sm transition-transform hover:-translate-y-0.5 sm:px-4 sm:py-3"
              >
                <span className="block text-[11px] font-medium text-slate-500 sm:text-sm">Сайт под ключ</span>
                <strong className="block text-sm text-slate-950 sm:text-lg">от 45 000 ₽</strong>
              </a>
              <a
                href="#automation"
                className="block rounded-xl bg-white px-3 py-2.5 shadow-sm transition-transform hover:-translate-y-0.5 sm:px-4 sm:py-3"
              >
                <span className="block text-[11px] font-medium text-slate-500 sm:text-sm">AI + CRM</span>
                <strong className="block text-sm text-slate-950 sm:text-lg">от 220 000 ₽</strong>
              </a>
            </div>
          </figure>
        </div>
      </section>

      <section id="packages" className="bg-white py-20 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.025em] text-slate-950 md:text-4xl">
              Четыре формата работы
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              От короткой диагностики до полноценной системы продаж и автоматизации.
              Можно начать с малого и не оплачивать лишний масштаб заранее.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            {packagePrices.map((pkg, index) => {
              const stage = packageStages[index];
              const StageIcon = stage.icon;

              return (
                <article
                  key={pkg.title}
                  id={index === 0 ? "express" : index === 3 ? "automation" : undefined}
                  className="grid gap-6 border-b border-slate-200 p-6 last:border-b-0 md:p-8 lg:grid-cols-[0.72fr_1.5fr_auto] lg:items-start"
                >
                  <div>
                    <div className={`mb-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${stage.tone}`}>
                      <StageIcon className="h-4 w-4" />
                      {stage.label}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-950">{pkg.title}</h3>
                    {pkg.highlighted && (
                      <span className="mt-3 inline-block text-sm font-semibold text-emerald-700">
                        Лучший первый шаг
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="mb-5 leading-7 text-slate-600">{pkg.description}</p>
                    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5 text-sm leading-6 text-slate-700">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">
                      <strong className="text-slate-900">Результат:</strong> {pkg.result}
                    </p>
                  </div>

                  <div className="min-w-44 lg:text-right">
                    <div className="mb-4 text-2xl font-bold text-slate-950">{pkg.price}</div>
                    <Button
                      variant="outline"
                      className="w-full rounded-lg border-slate-300 lg:w-auto"
                      onClick={() => scrollTo("form")}
                    >
                      Обсудить
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="price-groups" className="bg-slate-950 py-20 text-white md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-[-0.025em] md:text-4xl">
                Все услуги — по задачам
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                Откройте одну группу: внутри видны услуга, стартовая цена, короткое описание
                и ссылка на подробную страницу.
              </p>
            </div>
            <p className="text-sm leading-6 text-slate-400 lg:text-right">
              Внешние лицензии, рекламный бюджет, платные сервисы и сложный перенос данных
              рассчитываются отдельно.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="growth"
            className="overflow-hidden rounded-2xl border border-white/15 bg-white"
          >
            {groupedServices.map(({ group, services }) => {
              const meta = categoryMeta[group.id];
              const CategoryIcon = meta.icon;

              return (
                <AccordionItem
                  key={group.id}
                  value={group.id}
                  className="border-slate-200 px-4 last:border-b-0 sm:px-6"
                >
                  <AccordionTrigger className="gap-3 py-5 text-left hover:no-underline sm:py-6">
                    <span className="grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${meta.accent}`}>
                        <CategoryIcon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-bold text-slate-950 sm:text-lg">
                          {group.title}
                        </span>
                        <span className="mt-1 hidden text-sm font-normal leading-6 text-slate-500 md:block">
                          {meta.short}
                        </span>
                        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:hidden">
                          <span className="font-bold text-slate-950">{meta.from}</span>
                          <span className="font-normal text-slate-500">
                            {formatServicesCount(services.length)}
                          </span>
                        </span>
                      </span>
                      <span className="hidden text-right sm:block">
                        <span className="block text-sm font-bold text-slate-950">{meta.from}</span>
                        <span className="mt-1 block text-xs font-normal text-slate-500">
                          {formatServicesCount(services.length)}
                        </span>
                      </span>
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-6">
                    <p className="mb-4 max-w-4xl text-sm leading-6 text-slate-600 md:hidden">
                      {group.description}
                    </p>
                    <div className="overflow-hidden rounded-xl bg-slate-50">
                      {services.map((service) => (
                        <article
                          key={service.href}
                          className="grid gap-4 border-b border-slate-200 px-4 py-5 last:border-b-0 sm:px-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                        >
                          <div className="min-w-0">
                            <Link
                              to={service.href}
                              className="text-base font-bold text-slate-950 transition-colors hover:text-sky-700"
                            >
                              {service.title}
                            </Link>
                            <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-600">
                              {service.description}
                            </p>
                            {service.note && (
                              <p className="mt-2 text-xs leading-5 text-slate-500">{service.note}</p>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-4 md:min-w-48 md:justify-end">
                            <strong className="whitespace-nowrap text-base text-slate-950">
                              {service.price}
                            </strong>
                            <Link
                              to={service.href}
                              aria-label={`Подробнее об услуге «${service.title}»`}
                              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sky-700 shadow-sm transition-colors hover:bg-sky-100"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 border-y border-slate-200 py-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <BriefcaseBusiness className="h-4 w-4" />
                Бартер для сервисного бизнеса
              </div>
              <h2 className="mb-2 text-2xl font-bold text-slate-950">
                Обмен услугами с эквивалентом от 80 000 ₽
              </h2>
              <p className="max-w-3xl leading-7 text-slate-600">
                Подходит для СТО, детейлинга, мебели, клининга и салонов услуг.
                Объём работ и взаимозачёт фиксируются в договоре.
              </p>
            </div>
            <Button variant="outline" className="rounded-lg" onClick={() => scrollTo("form")}>
              Обсудить бартер
            </Button>
          </div>
        </div>
      </section>

      <section id="form" className="bg-[#eef7fa] py-20 md:py-24">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.025em] text-slate-950 md:text-4xl">
              Получить точную смету
            </h2>
            <p className="mb-6 text-lg leading-8 text-slate-600">
              Опишите задачу, текущий сайт или процесс. Мы уточним объём,
              отделим обязательное от необязательного и предложим следующий шаг.
            </p>
            <div className="flex gap-3 border-t border-slate-300 pt-5 text-sm leading-6 text-slate-600">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-sky-700" />
              <p>
                Работаем официально по договору с ООО «ААМХ»: этапы, ТЗ,
                сроки и состав работ фиксируются до запуска.
              </p>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl bg-white p-1 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Prices;
