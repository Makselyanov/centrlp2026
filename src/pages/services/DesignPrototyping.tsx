import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Palette, Layout as LayoutIcon, Smartphone } from "lucide-react";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
};

return (
  <Layout
    title="UI/UX-дизайн и прототипирование, которые повышают конверсию | CentrLP"
    description="Разработка интерфейсов с упором на аналитику и поведенческие факторы. Создаем дизайн, который ведет пользователя к покупке, а не просто выглядит красиво. AI-тесты гипотез."
  >
    {/* Hero */}
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/20 rounded-full">
              <span className="text-accent font-semibold">UI/UX дизайн</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Проектируем интерфейсы, которые <span className="text-primary">конвертируют</span> трафик в деньги
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Исследуем аудиторию, строим CJM и проверяем гипотезы через AI. Создаем дизайн, который снижает стоимость заявки и увеличивает продажи.
            </p>

            <div className="flex flex-col gap-3 mb-8 max-w-md mx-auto lg:mx-0">
              {[
                "Низкая конверсия в заявку",
                "Дорогие лиды с рекламы",
                "Клиенты уходят к конкурентам"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-muted-foreground bg-background/50 p-2 rounded-lg border border-transparent hover:border-accent/20 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-lg px-8 animate-pulse-gentle shadow-lg hover:shadow-primary/20"
                onClick={() => scrollToSection('form')}
              >
                Заказать дизайн <ArrowRight className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 hover:bg-accent/10"
                onClick={() => scrollToSection('process')}
              >
                Этапы работы
              </Button>
            </div>
          </div>

          {/* Abstract Visual */}
          <div className="relative hidden lg:block h-[500px] w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-3xl border border-border/50 overflow-hidden">
              {/* Abstract UI Elements */}
              <div className="absolute top-10 left-10 w-64 h-40 bg-background rounded-xl shadow-xl border border-border p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-4 bg-muted rounded mb-3" />
                <div className="flex gap-2 mb-3">
                  <div className="w-1/3 h-20 bg-accent/10 rounded" />
                  <div className="w-2/3 space-y-2">
                    <div className="w-full h-2 bg-muted rounded" />
                    <div className="w-3/4 h-2 bg-muted rounded" />
                    <div className="w-1/2 h-2 bg-muted rounded" />
                  </div>
                </div>
                <div className="w-24 h-8 bg-primary rounded ml-auto" />
              </div>

              <div className="absolute bottom-20 right-10 w-56 h-64 bg-background rounded-xl shadow-xl border border-border p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-accent rounded-full" />
                  <div className="w-20 h-2 bg-muted rounded" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 border border-muted rounded" />
                      <div className="w-full h-2 bg-muted/50 rounded" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 w-full h-24 bg-primary/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">+125%</div>
                    <div className="text-xs text-muted-foreground">Growth</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" />
              <Smartphone className="absolute top-20 right-20 w-12 h-12 text-muted-foreground/20 rotate-12" />
              <LayoutIcon className="absolute bottom-10 left-20 w-16 h-16 text-primary/20 -rotate-12" />

              {/* Cursor */}
              <div className="absolute top-1/3 right-1/3 pointer-events-none animate-bounce">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="currentColor" className="text-primary" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Для кого */}
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Кому нужен профессиональный UI/UX дизайн
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
          Какие проблемы бизнеса решает продуманный интерфейс
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
          Как мы работаем: от аналитики до макетов
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
              text: "Готовые макеты в Figma + UI-kit со всеми элементами. Полная готовность к верстке на любом стеке (React, Tilda, Bitrix)."
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
          Что вы получаете: больше, чем просто картинки
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
          Форматы и стоимость разработки
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
          Частые вопросы о дизайне и прототипировании
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
