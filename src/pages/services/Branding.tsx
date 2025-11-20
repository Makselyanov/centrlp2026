import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Sparkles, Palette, FileText } from "lucide-react";

export default function Branding() {
  return (
    <Layout
      title="Разработка фирменного стиля и логотипа в Тюмени | CentrLP"
      description="Создание логотипа, фирменного стиля и брендбука для вашего бизнеса. Уникальный дизайн, который отражает суть компании и запоминается клиентам."
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">Фирменный стиль</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Логотип и стиль, которые выделяют ваш бизнес
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Разрабатываем запоминающийся логотип, фирменные цвета, шрифты и носители. Всё, чтобы клиенты узнавали вас с первого взгляда.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Нет логотипа</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Всё разношёрстно</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Не отличаетесь</span>
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
            Кому нужен фирменный стиль
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "Новый бизнес",
                text: "Только стартуете и хотите сразу выглядеть профессионально и узнаваемо"
              },
              {
                icon: Palette,
                title: "Ребрендинг",
                text: "Компания выросла, старый логотип устарел — нужно обновить образ"
              },
              {
                icon: FileText,
                title: "Нет единства",
                text: "Каждый макет, визитка, объявление — в своём стиле. Нужен порядок."
              }
            ].map((item, i) => (
              <div key={i} className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover-scale">
                <item.icon className="w-12 h-12 text-primary mb-4" />
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
            Проблемы без фирменного стиля
          </h2>
          <div className="space-y-4">
            {[
              "Нет логотипа или он сделан «на коленке» — стыдно показать партнёрам",
              "Каждый макет, визитка, баннер — в своём стиле и цветах",
              "Клиенты не узнают вас в соцсетях и рекламе — нет единого образа",
              "Конкуренты выглядят солиднее, хотя услуги хуже",
              "Нет понимания, какие цвета и шрифты использовать на сайте и в рекламе",
              "Тратите время на объяснения дизайнерам, как должно выглядеть"
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
            Этапы разработки фирменного стиля
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Бриф и анализ",
                text: "Изучаем ваш бизнес, ценности, аудиторию, конкурентов. Собираем референсы и формируем концепцию."
              },
              {
                step: "02",
                title: "Разработка логотипа",
                text: "Рисуем 3–5 вариантов логотипа в разных стилях. Выбираете один, дорабатываем до идеала."
              },
              {
                step: "03",
                title: "Фирменные цвета и шрифты",
                text: "Подбираем палитру (основной, акценты, фоны) и шрифтовую пару для заголовков и текста."
              },
              {
                step: "04",
                title: "Дополнительные элементы",
                text: "Иконки, паттерны, формы, стили кнопок — всё, что создаёт узнаваемый визуальный язык."
              },
              {
                step: "05",
                title: "Носители стиля",
                text: "Визитки, бланки, презентации, соцсети — примеры применения фирменного стиля."
              },
              {
                step: "06",
                title: "Брендбук",
                text: "Документ с правилами использования: размеры, отступы, допустимые цвета, примеры макетов."
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start hover-scale">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
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
              "Уникальный логотип, который отражает суть вашего бизнеса",
              "Фирменная палитра и шрифты — готовые для сайта, соцсетей, рекламы",
              "Брендбук с правилами — любой дизайнер сможет работать по стандартам",
              "Файлы логотипа во всех форматах (PNG, SVG, PDF, AI)",
              "Макеты визиток, бланков, презентаций в фирменном стиле",
              "Узнаваемость и профессиональный образ компании"
            ].map((result, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">{result}</p>
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
                name: "Логотип",
                price: "от 20 000 ₽",
                period: "Срок: 5–7 дней",
                features: [
                  "3 варианта логотипа",
                  "2 правки выбранного",
                  "Файлы в 5 форматах",
                  "Чёрно-белая версия"
                ]
              },
              {
                name: "Фирменный стиль",
                price: "от 50 000 ₽",
                period: "Срок: 10–14 дней",
                features: [
                  "Логотип (5 вариантов)",
                  "Цветовая палитра",
                  "Шрифтовая пара",
                  "Доп. элементы (иконки, паттерны)",
                  "Визитки и бланки",
                  "Базовый брендбук"
                ],
                popular: true
              },
              {
                name: "Полный брендинг",
                price: "от 80 000 ₽",
                period: "Срок: 14–21 день",
                features: [
                  "Всё из пакета «Стиль»",
                  "Развёрнутый брендбук",
                  "Презентация компании",
                  "Шаблоны для соцсетей",
                  "Макеты сувенирки",
                  "Гайд по применению"
                ]
              }
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-2xl ${plan.popular ? 'bg-primary text-primary-foreground shadow-2xl scale-105' : 'bg-background shadow-lg'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-1">{plan.price}</div>
                  <div className={`text-sm ${plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{plan.period}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-primary-foreground' : 'text-accent'}`} />
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
                q: "Сколько вариантов логотипа вы предложите?",
                a: "В базовом пакете — 3 варианта, в расширенном — 5. После выбора дорабатываем один до идеала."
              },
              {
                q: "Можно ли заказать только логотип без стиля?",
                a: "Да, это отдельный пакет. Но фирменный стиль даст больше пользы — не придётся каждый раз думать, как оформить макет."
              },
              {
                q: "Что такое брендбук и зачем он нужен?",
                a: "Это документ с правилами: как использовать логотип, цвета, шрифты, отступы. Чтобы любой дизайнер мог сделать макет в вашем стиле."
              },
              {
                q: "В каких форматах будет логотип?",
                a: "PNG (прозрачный фон), SVG (векторный), PDF, AI (исходник для дизайнеров), JPG. Всё, что нужно для печати и веба."
              },
              {
                q: "Сколько правок можно сделать?",
                a: "2 правки в процессе разработки вариантов + 1 правка финального логотипа. Дополнительные правки — за отдельную плату."
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
            Готовы создать запоминающийся образ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Оставьте заявку — обсудим ваш проект и предложим концепцию
          </p>
        </div>
        <div className="container max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
