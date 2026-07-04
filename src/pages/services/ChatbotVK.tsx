import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  MessageSquare,
  Rocket,
  Settings,
  Target,
  Users,
  Zap
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useFaqSchema, useAutoBreadcrumb } from "@/components/SeoSchemas";

const ChatbotVK = () => {
  const faqItems = [
    {
      question: "Чем ваш чат-бот отличается от обычного автоответчика?",
      answer:
        "Мы делаем не просто последовательность сообщений, а рабочий сценарий продаж: квалификация, сбор данных, маршрутизация, запись, передача в CRM или менеджеру, аналитика и улучшение по реальным диалогам."
    },
    {
      question: "Можно ли начать с простого бота, а потом дорастить до AI-агента?",
      answer:
        "Да. Часто мы начинаем с бота для приёма заявок и FAQ, а затем добавляем AI-логику, расширенные сценарии, поиск по базе знаний и более умную классификацию обращений."
    },
    {
      question: "Бот может работать только во ВКонтакте?",
      answer:
        "Нет. Мы можем собрать общую логику для ВКонтакте, сайта, Telegram и других каналов, чтобы клиент попадал в одну систему, а команда не теряла контекст."
    },
    {
      question: "Насколько это полезно для отдела продаж?",
      answer:
        "Бот снимает рутину: отвечает на частые вопросы, собирает вводные, отсеивает нецелевые запросы и передаёт менеджерам только то, что ближе к продаже."
    },
    {
      question: "Можно ли связать бота с CRM и внутренними таблицами?",
      answer:
        "Да. Мы подключаем бота к CRM, почте, Telegram-уведомлениям, таблицам и внутренним сервисам, если это помогает быстрее обработать заявку."
    },
    {
      question: "Сколько занимает запуск?",
      answer:
        "Базовый сценарий можно запустить за 5-7 дней. Более серьёзные связки с CRM, AI и несколькими каналами обычно занимают 10-21 день в зависимости от логики."
    }
  ];

  useFaqSchema(faqItems);
  useAutoBreadcrumb("Чат-бот ВКонтакте");

  return (
    <Layout
      title="Чат-бот ВКонтакте и AI-ассистент для заявок | CentrLP"
      description="Разработка чат-ботов ВКонтакте для заявок, квалификации, записи, ответов 24/7 и передачи данных в CRM. От базового сценария до AI-ассистента."
    >
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold">
              <Bot className="w-4 h-4" />
              <span>Чат-бот ВКонтакте и AI-ассистент</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Чат-бот как оператор заявок,
              <br />
              записи и продаж 24/7
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Собираем ботов, которые не просто отвечают, а ведут человека по воронке: принимают заявки, уточняют задачу, записывают, квалифицируют, передают в CRM и разгружают команду.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Ответы и сбор данных 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Квалификация до менеджера</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Связка с CRM, сайтом и Telegram</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <a href="#contact">
                  Разработать чат-бота
                  <ArrowRight className="ml-2" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/services/ai-agents">
                  Нужен уже AI-агент
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceImageBand slug="chatbot-vk" alt="chatbot-vk — иллюстрация услуги CentrLP" />

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Что бот может взять на себя
            </h2>
            <p className="text-lg text-muted-foreground">
              Бот становится первым слоем общения: принимает поток, помогает человеку дойти до нужного действия и передаёт команде уже структурированный запрос.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: MessageSquare,
                title: "Приём обращений",
                text: "Отвечает на частые вопросы, принимает заявки и не даёт потерять обращения в нерабочее время."
              },
              {
                icon: Target,
                title: "Квалификация лида",
                text: "Уточняет услугу, бюджет, сроки, город, задачу и передаёт менеджеру уже понятный запрос."
              },
              {
                icon: Settings,
                title: "Интеграции",
                text: "Отправляет данные в CRM, таблицы, Telegram, почту или внутренние сервисы команды."
              },
              {
                icon: Brain,
                title: "AI-логика",
                text: "Помогает классифицировать обращения, подсказывать ответы и расширять сценарии без ручной рутины."
              }
            ].map((item, index) => (
              <div key={index} className="bg-background rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Где это окупается быстрее всего
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "Сервисный бизнес",
                text: "Записи, консультации, приём заявок, ответы по услугам, графику, ценам и статусам."
              },
              {
                icon: Zap,
                title: "Реклама и лидогенерация",
                text: "Когда нужно быстро обработать поток после рекламы и не потерять горячих клиентов в сообщениях."
              },
              {
                icon: Rocket,
                title: "B2B и сложные продажи",
                text: "Когда важно собрать вводные до звонка и передать менеджеру уже квалифицированный запрос."
              }
            ].map((item, index) => (
              <div key={index} className="bg-background rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-lg transition-all">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Как мы строим бота
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Разбираем сценарии бизнеса",
                description:
                  "Смотрим, какие обращения приходят чаще всего, какие данные важны команде и где сейчас теряются заявки."
              },
              {
                step: "02",
                title: "Проектируем логику диалога",
                description:
                  "Собираем ветки, формулировки, точки передачи в менеджеру, уведомления и логику записи или квалификации."
              },
              {
                step: "03",
                title: "Подключаем каналы и системы",
                description:
                  "Связываем ВКонтакте с CRM, сайтом, Telegram, таблицами и другими точками, где дальше живёт заявка."
              },
              {
                step: "04",
                title: "Тестируем и улучшаем",
                description:
                  "После запуска смотрим реальные диалоги, где люди ломаются, и дорабатываем сценарии, чтобы бот продавал лучше."
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Бот работает сильнее в связке с другими услугами
            </h2>
            <p className="text-lg text-muted-foreground">
              Мы часто внедряем чат-бота не отдельно, а как часть воронки: трафик приводит человека, бот квалифицирует, CRM фиксирует, сайт и контент дожимают.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Rocket,
                title: "Сайт и посадочные",
                text: "Когда рекламу нужно вести не только в сообщения, но и на коммерческие страницы с SEO и кейсами.",
                href: "/services/website-development",
                cta: "Нужен сайт"
              },
              {
                icon: Zap,
                title: "Яндекс.Директ",
                text: "Когда после клика важно быстро подхватить поток заявок, чтобы трафик не остывал.",
                href: "/nastroyka-yandex-direct-tyumen",
                cta: "Подключить Директ"
              },
              {
                icon: Settings,
                title: "CRM и внутренние процессы",
                text: "Когда нужно видеть статусы, маршрутизацию, повторные касания и реальную картину по лидам.",
                href: "/services/custom-crm",
                cta: "Собрать CRM"
              },
              {
                icon: Brain,
                title: "AI-агенты",
                text: "Когда обычного сценария уже мало и нужна более умная обработка заявок, ответов и контента.",
                href: "/services/ai-agents",
                cta: "Нужен AI"
              }
            ].map((item, index) => (
              <div key={index} className="bg-background rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{item.text}</p>
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Форматы работы
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Базовый бот",
                price: "от 30 000 ₽",
                period: "Срок: 5-7 дней",
                features: [
                  "FAQ и приём заявок",
                  "До 10 ключевых сценариев",
                  "Уведомления в Telegram или Email",
                  "Базовая аналитика"
                ]
              },
              {
                title: "Продажный бот",
                price: "от 65 000 ₽",
                period: "Срок: 10-14 дней",
                features: [
                  "Квалификация и сегментация",
                  "Интеграция с CRM",
                  "Несколько сценариев и ветвлений",
                  "Аналитика и доработка после запуска",
                  "Месяц поддержки"
                ],
                popular: true
              },
              {
                title: "AI-система под команду",
                price: "по запросу",
                period: "Срок: 14-21 день и больше",
                features: [
                  "AI-подсказки и обработка запросов",
                  "Несколько каналов коммуникации",
                  "Интеграции с внутренними сервисами",
                  "Персональная логика под бизнес"
                ]
              }
            ].map((plan, index) => (
              <div key={index} className={`relative rounded-2xl p-8 ${plan.popular ? "bg-primary text-primary-foreground shadow-2xl scale-105" : "bg-background border border-border/50 shadow-lg"}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                    Популярный
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="text-3xl font-bold mb-2">{plan.price}</div>
                <div className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.period}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex gap-2">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={plan.popular ? "secondary" : "default"} className="w-full">
                  <a href="#contact">
                    Обсудить внедрение
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Частые вопросы
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Получите план внедрения чат-бота под ваш бизнес
            </h2>
            <p className="text-xl text-muted-foreground">
              Покажем, что можно автоматизировать уже сейчас, где бот даст быстрый эффект и как правильно связать его с рекламой, сайтом, CRM и AI-логикой.
            </p>
          </div>
          <ContactForm />
          <div className="max-w-3xl mx-auto mt-8 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50">
              <Clock className="w-4 h-4 text-primary" />
              <span>Быстрый старт от 5 дней</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50">
              <BarChart className="w-4 h-4 text-primary" />
              <span>Прозрачная логика и аналитика</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ChatbotVK;
