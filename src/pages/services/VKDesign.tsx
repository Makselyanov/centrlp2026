import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart,
  Bot,
  CheckCircle2,
  FileText,
  Heart,
  MessageCircle,
  MessageSquare,
  Palette,
  Rocket,
  Settings,
  Users
} from "lucide-react";
import { useFaqSchema, useAutoBreadcrumb } from "@/components/SeoSchemas";

export default function VKDesign() {
  const faqItems = [
    {
      question: "Можно ли сделать ВКонтакте не просто красивым, а реально продающим?",
      answer:
        "Да. Мы не ограничиваемся визуалом: перестраиваем оффер, меню, путь к заявке, контент первого касания, блоки доверия и связку с ботом, сайтом или CRM."
    },
    {
      question: "Если у меня уже есть сайт, группа ВК всё равно нужна?",
      answer:
        "Да, если аудитория активно взаимодействует во ВКонтакте. Сообщество может стать быстрым входом в воронку: знакомство, заявки, ретаргетинг, повторные касания, прогрев и поддержка."
    },
    {
      question: "Можно ли сразу подключить чат-бота и рекламу?",
      answer:
        "Да. Мы можем сразу собрать связку: оформление сообщества, закреп, меню, чат-бот, рекламные сценарии и передачу заявок в CRM или Telegram."
    },
    {
      question: "Что делать, если в группе хаос: старые посты, отзывы, товары, меню?",
      answer:
        "Разбираем текущую структуру, очищаем лишнее, переносим важные смыслы, выстраиваем навигацию и оставляем только те элементы, которые помогают продаже и доверию."
    },
    {
      question: "Подходит ли это для локального бизнеса в Тюмени?",
      answer:
        "Да. Для локальных услуг ВКонтакте часто работает как вторая витрина рядом с сайтом: люди смотрят отзывы, фото, переписку, переходят в сообщения и оставляют заявку."
    }
  ];

  useFaqSchema(faqItems);
  useAutoBreadcrumb("Оформление ВКонтакте");

  return (
    <Layout
      title="Оформление ВКонтакте для бизнеса: сообщество, которое продаёт | CentrLP"
      description="Оформление сообщества ВКонтакте под заявки: оффер, меню, закреп, отзывы, контент первого касания, чат-бот и связка с CRM. Не просто красиво, а на продажи."
    >
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold">
              <Palette className="w-4 h-4" />
              <span>Оформление ВКонтакте</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Сообщество ВКонтакте как витрина,
              <br />
              канал продаж и точка входа в CRM
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Оформляем ВК не как набор баннеров, а как понятную воронку: сильный оффер, быстрый путь к заявке, доверие, контент первого касания, чат-бот и связка с сайтом, рекламой и CRM.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Группа выглядит как сервис, а не как хаос</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Появляется путь от визита к заявке</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Можно связать с ботом, сайтом и CRM</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 animate-pulse-gentle">
                <a href="#form">
                  Усилить сообщество <ArrowRight className="ml-2" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/services/chatbot-vk">
                  Сразу добавить чат-бота
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceImageBand slug="vk-design" alt="vk-design — иллюстрация услуги CentrLP" />

      <section className="py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Для кого это особенно полезно
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "Локальные услуги",
                text: "Салоны, клиники, студии, ремонт, мебель, обучение. Когда клиент сначала смотрит ВК, а уже потом решает написать или оставить заявку."
              },
              {
                icon: Heart,
                title: "Экспертные и личные бренды",
                text: "Когда нужно быстро объяснить, кто вы, чем полезны, какие есть кейсы и как удобно зайти в работу без длинных созвонов."
              },
              {
                icon: MessageCircle,
                title: "Бизнес с рекламой во ВКонтакте",
                text: "Если трафик уже идёт или планируется, но сообщество пока не выдерживает рекламный поток и не превращает визиты в обращения."
              }
            ].map((item, i) => (
              <div key={i} className="bg-background p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-all">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Что входит в сильное оформление ВКонтакте
            </h2>
            <p className="text-lg text-muted-foreground">
              Мы собираем не декор, а рабочий интерфейс продаж: чтобы человеку было понятно, почему выбрать вас, что делать дальше и куда нажать.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Palette,
                title: "Упаковка смысла и визуала",
                text: "Обложка, аватар, описание, меню и закреп так, чтобы сразу был понятен оффер и уровень доверия."
              },
              {
                icon: FileText,
                title: "Контент первого касания",
                text: "Тексты, офферы, отзывы, ответы на возражения и материалы, которые помогают принять решение быстрее."
              },
              {
                icon: Bot,
                title: "Заявки и автоматизация",
                text: "Подключаем чат-бота, автоответы, сбор данных и передачу заявок туда, где ваша команда реально работает."
              },
              {
                icon: BarChart,
                title: "Готовность к трафику",
                text: "Сообщество становится точкой входа для рекламы, ретаргетинга, прогрева и повторных касаний."
              }
            ].map((item, i) => (
              <div key={i} className="bg-background rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all">
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

      <section id="process" className="py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">
            Как мы превращаем сообщество в систему заявок
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Разбираем текущую воронку",
                text: "Смотрим, откуда приходят люди, что они видят в первые секунды и где теряются: в описании, меню, сообщениях, контенте или рекламной связке."
              },
              {
                step: "02",
                title: "Собираем оффер и структуру",
                text: "Формулируем понятное предложение, расставляем смыслы по обложке, закрепу, блокам доверия, меню и сценариям связи."
              },
              {
                step: "03",
                title: "Подключаем действия",
                text: "Делаем кнопки, сообщения, сценарии входа, чат-бота, заявки, связку с сайтом или CRM, чтобы сообщество реально вело к продаже."
              },
              {
                step: "04",
                title: "Готовим к росту",
                text: "После упаковки сообщество можно использовать как посадочную точку для рекламы, контента, повторных касаний и расширения в другие каналы."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Самая сильная схема: не только ВК, а связка сервисов
            </h2>
            <p className="text-lg text-muted-foreground">
              ВКонтакте работает лучше, когда он не один. Мы усиливаем сообщество сайтом, ботом, рекламой и CRM, чтобы заявка не терялась между каналами.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Bot,
                title: "Чат-бот ВКонтакте",
                text: "Автоответы, квалификация, записи, сбор данных и догрев без потери диалогов.",
                href: "/services/chatbot-vk",
                cta: "Нужен бот"
              },
              {
                icon: Rocket,
                title: "Реклама ВКонтакте и Яндекс",
                text: "Когда сообщество уже оформлено, на него можно уверенно вести платный трафик.",
                href: "/services/yandex-direct",
                cta: "Подключить трафик"
              },
              {
                icon: MessageSquare,
                title: "Сайт как главный хаб",
                text: "Для SEO, кейсов, услуг, мультилендингов и коммерческих страниц, которых во ВКонтакте не хватает.",
                href: "/services/website-development",
                cta: "Нужен сайт"
              },
              {
                icon: Settings,
                title: "CRM и учёт заявок",
                text: "Когда нужно видеть, кто написал, на каком этапе находится клиент и что приносит продажи.",
                href: "/services/custom-crm",
                cta: "Собрать CRM"
              }
            ].map((item, i) => (
              <div key={i} className="bg-background rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-xl transition-all">
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

      <section className="py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Форматы работы и стоимость
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Оформление основы",
                price: "от 15 000 ₽",
                period: "Срок: 3-5 дней",
                features: [
                  "Обложка, аватар, описание, меню",
                  "Закреп и блоки первого касания",
                  "Сборка структуры и оффера",
                  "Подготовка к рекламе"
                ]
              },
              {
                name: "Продажа через ВК",
                price: "от 30 000 ₽",
                period: "Срок: 5-7 дней",
                features: [
                  "Всё из базового пакета",
                  "Контент и отзывы",
                  "Подключение заявок и сценариев",
                  "Связка с ботом или сайтом",
                  "Рекомендации по трафику"
                ],
                popular: true
              },
              {
                name: "Под ключ с системой",
                price: "от 50 000 ₽",
                period: "Срок: 7-14 дней",
                features: [
                  "Упаковка сообщества",
                  "Чат-бот и автоматизация",
                  "CRM или Telegram-уведомления",
                  "Подготовка рекламной связки",
                  "План развития на 30-60 дней"
                ]
              }
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-2xl ${plan.popular ? "bg-primary text-primary-foreground shadow-2xl scale-105" : "bg-background shadow-lg border border-border/50"}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">{plan.price}</div>
                  <div className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.period}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={plan.popular ? "secondary" : "default"} className="w-full">
                  <a href="#form">
                    Обсудить проект
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Частые вопросы
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className="p-6 bg-background rounded-2xl border border-border/50">
                <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container max-w-4xl text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Готовы превратить ВКонтакте в рабочий канал заявок?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Разберём текущее сообщество, скажем, что мешает продажам, и предложим формат: от сильной упаковки до полной связки с ботом, сайтом и CRM.
          </p>
        </div>
        <div className="container max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
