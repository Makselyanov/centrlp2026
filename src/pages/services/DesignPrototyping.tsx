import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Palette, Layout as LayoutIcon, Smartphone } from "lucide-react";

export default function DesignPrototyping() {
  return (
    <Layout
      title="Дизайн и прототипирование сайта: UI/UX разработка | CentrLP"
      description="Дизайн сайта и прототипирование интерфейсов. Создаём удобные и красивые сайты, которые конвертируют посетителей в клиентов. Адаптивный дизайн под все устройства."
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/20 rounded-full">
              <span className="text-accent font-semibold">UI/UX дизайн</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Дизайн, который продаёт и выделяет среди конкурентов
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Прототипируем структуру, рисуем интерфейс, адаптируем под мобильные. Всё для того, чтобы клиент остался на сайте и оставил заявку.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Дизайн устарел</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Неудобная навигация</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>На мобильных не работает</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#form">
                <Button size="lg" className="text-lg px-8 animate-pulse-gentle">
                  Заказать дизайн <ArrowRight className="ml-2" />
                </Button>
              </a>
              <a href="#process">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Этапы работы
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
            Кому нужен профессиональный дизайн
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Palette,
                title: "Запуск нового проекта",
                text: "Стартуете с нуля и хотите выделиться на фоне конкурентов с первого дня"
              },
              {
                icon: LayoutIcon,
                title: "Редизайн старого сайта",
                text: "Сайт есть, но дизайн морально устарел и не работает на продажи"
              },
              {
                icon: Smartphone,
                title: "Нужна мобильная версия",
                text: "Половина трафика с телефонов, но сайт не адаптирован — клиенты уходят"
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
            Проблемы, которые решает хороший дизайн
          </h2>
          <div className="space-y-4">
            {[
              "Посетители заходят и сразу уходят — не понимают, куда нажать",
              "Дизайн выглядит дешёво и несерьёзно — подрывает доверие",
              "Неудобная навигация — клиенты не могут найти нужную информацию",
              "На мобильном всё едет и не кликается — теряете 50% аудитории",
              "Нет фирменного стиля — сайт похож на тысячи других",
              "Формы и кнопки незаметны — клиенты не оставляют контакты"
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
            Как мы создаём дизайн
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Исследование и анализ",
                text: "Изучаем вашу нишу, конкурентов, целевую аудиторию. Собираем референсы и формируем концепцию."
              },
              {
                step: "02",
                title: "Прототип структуры",
                text: "Рисуем схему страниц, блоков, элементов. Продумываем логику переходов и взаимодействия пользователя."
              },
              {
                step: "03",
                title: "Дизайн-концепция",
                text: "Создаём 2–3 варианта главной страницы в разных стилях. Выбираете лучший и дорабатываем детали."
              },
              {
                step: "04",
                title: "Дизайн всех страниц",
                text: "Отрисовываем все страницы в едином стиле: цвета, шрифты, иконки, кнопки, формы, изображения."
              },
              {
                step: "05",
                title: "Адаптация под мобильные",
                text: "Делаем версии для планшетов и телефонов. Всё должно работать и выглядеть идеально на любом экране."
              },
              {
                step: "06",
                title: "Передача макетов",
                text: "Готовые макеты в Figma + UI-kit со всеми элементами. Можно сразу передавать в вёрстку или на Tilda."
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
              "Современный дизайн, который выделяется на фоне конкурентов",
              "Понятная структура и навигация — посетители не теряются",
              "Адаптация под все устройства — идеально на десктопе, планшете, смартфоне",
              "Фирменный стиль и UI-kit — всё в единой цветовой гамме и типографике",
              "Прототип с продуманной логикой — перед дизайном согласовываем структуру",
              "Готовые макеты в Figma — легко передать в разработку или на Tilda"
            ].map((result, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
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
                name: "Прототип",
                price: "от 15 000 ₽",
                period: "Срок: 3–5 дней",
                features: [
                  "Схема структуры страниц",
                  "Блоки и элементы",
                  "Логика навигации",
                  "Без визуала, только структура"
                ]
              },
              {
                name: "Дизайн сайта",
                price: "от 40 000 ₽",
                period: "Срок: 7–14 дней",
                features: [
                  "Прототип + дизайн",
                  "Все страницы (до 10)",
                  "Адаптив под мобильные",
                  "UI-kit и исходники Figma",
                  "2 правки концепции"
                ],
                popular: true
              },
              {
                name: "Дизайн + Вёрстка",
                price: "от 70 000 ₽",
                period: "Срок: 14–21 день",
                features: [
                  "Полный дизайн проект",
                  "Сборка на Tilda",
                  "Интерактивные элементы",
                  "Анимации и эффекты",
                  "Все интеграции",
                  "Готовый работающий сайт"
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
                q: "Можно ли сначала только прототип?",
                a: "Да, можно заказать отдельно прототип, согласовать структуру, а потом уже заказать дизайн."
              },
              {
                q: "Сколько правок входит?",
                a: "2 правки концепции главной страницы и 1 правка остальных страниц. Дополнительные правки — отдельно."
              },
              {
                q: "В каком формате будут макеты?",
                a: "Figma — это стандарт. Можно экспортировать в любые форматы, если нужно."
              },
              {
                q: "Нужны ли мне исходники?",
                a: "Да, передаём полный доступ к проекту в Figma + UI-kit. Сможете дорабатывать сами или через других дизайнеров."
              },
              {
                q: "Можете ли вы свёрстать дизайн?",
                a: "Да, можем собрать на Tilda или передать макеты для вёрстки на коде. Обсуждается отдельно."
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
            Готовы создать дизайн, который продаёт?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Оставьте заявку — обсудим проект и предложим решение
          </p>
        </div>
        <div className="container max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
