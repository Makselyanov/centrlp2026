import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Lightbulb, Target, Zap } from "lucide-react";

export default function NamingOffers() {
  return (
    <Layout
      title="Нейминг и продающие офферы для бизнеса | CentrLP Тюмень"
      description="Придумаем название для компании, продукта или услуги. Создадим продающие офферы, которые выделяют на фоне конкурентов и мотивируют к покупке."
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-accent/5 to-primary/10">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/20 rounded-full">
              <span className="text-accent font-semibold">Нейминг и офферы</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Название и оффер, которые продают
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Создаём запоминающиеся названия и упаковываем услуги так, чтобы клиент захотел купить здесь и сейчас.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Нет имени</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Офферы не цепляют</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Конкуренты ярче</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#form">
                <Button size="lg" className="text-lg px-8 animate-pulse-gentle">
                  Заказать разработку <ArrowRight className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Для кого */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Кому нужен нейминг и офферы
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Lightbulb,
                title: "Новый бизнес или продукт",
                text: "Запускаете проект и нужно придумать название, которое запомнится и отразит суть"
              },
              {
                icon: Target,
                title: "Переупаковка услуг",
                text: "Услуги есть, но клиенты не понимают ценность — надо сформулировать иначе"
              },
              {
                icon: Zap,
                title: "Слабая конверсия",
                text: "Трафик идёт, но не покупают — нужны яркие офферы и понятные призывы"
              }
            ].map((item, i) => (
              <div key={i} className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover-scale">
                <item.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Боли */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Типичные проблемы с названиями и офферами
          </h2>
          <div className="space-y-4">
            {[
              "Название ни о чём не говорит — клиенты не понимают, чем вы занимаетесь",
              "Офферы как у всех — «качественно, быстро, недорого» — не выделяетесь",
              "Слишком сложно и длинно — никто не запоминает",
              "Нет УТП — почему выбрать вас, а не конкурентов?",
              "Офферы не попадают в боль клиента — не мотивируют к покупке",
              "Каждый менеджер формулирует услугу по-своему — нет единства"
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <p className="text-lg">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как решаем */}
      <section id="process" className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Как мы работаем над неймингом и офферами
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Анализ бизнеса и аудитории",
                text: "Изучаем вашу нишу, целевую аудиторию, конкурентов. Выявляем боли клиентов и ваши преимущества."
              },
              {
                step: "02",
                title: "Генерация вариантов",
                text: "Предлагаем 5–10 вариантов названий и 3–5 вариантов упаковки офферов. Используем техники нейминга и ИИ для ускорения."
              },
              {
                step: "03",
                title: "Отбор и тестирование",
                text: "Проверяем на уникальность, доступность домена, восприятие. Тестируем на фокус-группе или через опросы."
              },
              {
                step: "04",
                title: "Финальная упаковка",
                text: "Дорабатываем выбранное название и офферы. Формулируем УТП, заголовки, подзаголовки, призывы к действию."
              },
              {
                step: "05",
                title: "Рекомендации по применению",
                text: "Даём гайд, как использовать название и офферы на сайте, в рекламе, в соцсетях, в скриптах продаж."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start hover-scale">
                <div className="flex-shrink-0 w-16 h-16 bg-accent text-accent-foreground rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Результат */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Что вы получите
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              "Запоминающееся название, которое отражает суть бизнеса",
              "Продающие офферы с чёткими УТП и выгодами для клиента",
              "Заголовки и подзаголовки для сайта, рекламы, соцсетей",
              "Гайд по применению — как использовать название и офферы",
              "Проверка на уникальность, домены, восприятие",
              "Увеличение конверсии за счёт понятной упаковки"
            ].map((result, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-lg">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Кейсы */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Примеры работ
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                niche: "Студия кухонь",
                before: "«Кухни на заказ»",
                after: "«Кухня вашей мечты за 21 день»",
                result: "Конверсия квиза +40%"
              },
              {
                niche: "Клининг",
                before: "«Уборка квартир»",
                after: "«Чистота без усилий: уборка за 2 часа»",
                result: "CPL снизилась на 30%"
              },
              {
                niche: "Детейлинг",
                before: "«Мойка и полировка»",
                after: "«Блеск и защита: детейлинг за 1 день»",
                result: "Средний чек +25%"
              }
            ].map((item, i) => (
              <div key={i} className="bg-background p-6 rounded-xl shadow-sm hover:shadow-lg transition-all hover-scale">
                <div className="text-accent font-semibold mb-4">{item.niche}</div>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Было:</div>
                    <div className="text-sm italic">«{item.before}»</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Стало:</div>
                    <div className="text-sm font-semibold">«{item.after}»</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm font-bold text-primary">{item.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Форматы и стоимость
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Нейминг",
                price: "от 15 000 ₽",
                period: "Срок: 3–5 дней",
                features: [
                  "5–10 вариантов названий",
                  "Проверка на уникальность",
                  "Проверка доменов",
                  "Краткое описание каждого"
                ]
              },
              {
                name: "Офферы",
                price: "от 20 000 ₽",
                period: "Срок: 5–7 дней",
                features: [
                  "Анализ аудитории и конкурентов",
                  "3–5 вариантов упаковки",
                  "Заголовки и подзаголовки",
                  "УТП и выгоды",
                  "Примеры применения"
                ],
                popular: true
              },
              {
                name: "Нейминг + Офферы",
                price: "от 30 000 ₽",
                period: "Срок: 7–10 дней",
                features: [
                  "Название (10 вариантов)",
                  "Полная упаковка офферов",
                  "Тестирование вариантов",
                  "Гайд по применению",
                  "Заголовки для рекламы"
                ]
              }
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-2xl ${plan.popular ? 'bg-accent text-accent-foreground shadow-2xl scale-105' : 'bg-background shadow-lg'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">{plan.price}</div>
                  <div className={`text-sm ${plan.popular ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>{plan.period}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-accent-foreground' : 'text-primary'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#form">
                  <Button variant={plan.popular ? "secondary" : "default"} className="w-full">
                    Выбрать
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Частые вопросы
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Как вы придумываете варианты названий?",
                a: "Используем техники нейминга, ассоциации, анализ ниши, ИИ для генерации вариантов. Затем отбираем лучшие вручную."
              },
              {
                q: "Можно ли зарегистрировать название как товарный знак?",
                a: "Мы проверяем на уникальность в поисковиках и базах доменов. Для регистрации ТЗ нужна отдельная юридическая проверка."
              },
              {
                q: "А если ни один вариант не понравится?",
                a: "Делаем ещё один раунд с учётом ваших пожеланий. Обычно из 10 вариантов находится 2–3 подходящих."
              },
              {
                q: "Как быстро растёт конверсия после смены офферов?",
                a: "Зависит от ниши и трафика. В среднем видим рост 20–50% в первые 2 недели после внедрения."
              },
              {
                q: "Можно ли заказать только офферы без нейминга?",
                a: "Да, это отдельный пакет. Если название уже есть, работаем только над упаковкой предложений."
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-background rounded-xl">
                <h3 className="text-lg font-semibold mb-3">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="form" className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container max-w-4xl text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы создать название и офферы, которые продают?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Оставьте заявку — обсудим проект и предложим варианты
          </p>
        </div>
        <div className="container max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
