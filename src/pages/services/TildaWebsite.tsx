import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Zap, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function TildaWebsite() {
  return (
    <Layout
      title="Создание сайта на Tilda: разработка под ключ в Тюмени | CentrLP"
      description="Разработка продающего сайта на Tilda за 14-21 день. Дизайн, тексты, формы заявок, интеграция с CRM. Сайт, который приносит клиентов вашему бизнесу."
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,141,210,0.1),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">Сайты на Tilda</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Сайт, который продаёт с первого дня
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Создаём продающие сайты на Tilda за 14–21 день. Дизайн, тексты, формы и аналитика — всё включено.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Нет заявок с сайта</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Устаревший дизайн</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>Сайт не работает</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#form">
                <Button size="lg" className="text-lg px-8 animate-pulse-gentle">
                  Оставить заявку <ArrowRight className="ml-2" />
                </Button>
              </a>
              <a href="#process">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Как мы работаем
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Для кого */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Для кого эта услуга
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "Локальный бизнес",
                text: "Салоны красоты, СТО, мебельные мастерские, клининг — всем, кто работает с клиентами в своём городе"
              },
              {
                icon: TrendingUp,
                title: "Стартапы и новые ниши",
                text: "Запускаете новую услугу или открываете точку — нужен сайт быстро и с конверсией"
              },
              {
                icon: Zap,
                title: "Действующий бизнес",
                text: "Есть клиенты, но сайт устарел или не приносит заявок — пора обновить упаковку"
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
      <section className="py-20">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Типичные проблемы, которые мы решаем
          </h2>
          <div className="space-y-4">
            {[
              "Сайт есть, но заявок нет — посетители уходят, не оставив контактов",
              "Устаревший дизайн и структура — стыдно показать клиентам",
              "Нет мобильной версии — половина трафика сливается",
              "Формы не работают или не настроены — теряете каждую заявку",
              "Нет связки с рекламой — непонятно, откуда клиенты и что окупается",
              "Долго грузится, глючит, не адаптируется — клиенты не ждут"
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <CheckCircle2 className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <p className="text-lg">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как решаем */}
      <section id="process" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Как мы создаём сайт на Tilda
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Бриф и анализ конкурентов",
                text: "Изучаем вашу нишу, целевую аудиторию и что предлагают конкуренты. Выявляем УТП и формируем оффер."
              },
              {
                step: "02",
                title: "Прототип и структура",
                text: "Рисуем схему страниц, блоков и элементов. Согласовываем логику и переходы между разделами."
              },
              {
                step: "03",
                title: "Дизайн и вёрстка на Tilda",
                text: "Создаём визуал в фирменных цветах, адаптируем под мобильные, собираем на платформе Tilda."
              },
              {
                step: "04",
                title: "Тексты и контент",
                text: "Пишем продающие заголовки, описания услуг, призывы к действию. Без воды, по сути."
              },
              {
                step: "05",
                title: "Формы, квизы, интеграции",
                text: "Настраиваем приём заявок, подключаем CRM, Telegram, email-уведомления. Всё работает."
              },
              {
                step: "06",
                title: "Метрика, цели, запуск",
                text: "Ставим счётчики, настраиваем цели, проверяем скорость загрузки. Запускаем сайт в работу."
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
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Что вы получите в результате
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              "Сайт, который продаёт — понятная структура, яркие CTA, удобные формы",
              "Полная адаптивность — идеально выглядит на всех устройствах",
              "Прозрачная аналитика — видите источники заявок и поведение клиентов",
              "Быстрая загрузка — клиенты не уходят, Google и Яндекс любят",
              "Интеграция с CRM и мессенджерами — заявки приходят туда, куда нужно",
              "Возможность самостоятельно редактировать — без программистов"
            ].map((result, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg">
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
            Примеры результатов
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                niche: "Мебельная мастерская",
                before: "Старый сайт, 2–3 заявки в месяц",
                after: "Новый сайт + квиз, 15–20 заявок в месяц",
                metric: "Рост заявок ×6"
              },
              {
                niche: "Клининговая компания",
                before: "Только группа ВК, без сайта",
                after: "Сайт с калькулятором + реклама",
                metric: "30+ заявок в первый месяц"
              },
              {
                niche: "Детейлинг-центр",
                before: "Лендинг на конструкторе, 0 заявок",
                after: "Сайт на Tilda + формы + чат-бот",
                metric: "CPL снизилась с 800₽ до 350₽"
              }
            ].map((item, i) => (
              <div key={i} className="bg-background p-6 rounded-xl shadow-sm hover:shadow-lg transition-all hover-scale">
                <div className="text-primary font-semibold mb-4">{item.niche}</div>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Было:</div>
                    <div className="text-sm">{item.before}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Стало:</div>
                    <div className="text-sm">{item.after}</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-lg font-bold text-accent">{item.metric}</div>
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
            Форматы сотрудничества
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Базовый",
                price: "от 45 000 ₽",
                period: "Срок: 10–14 дней",
                features: [
                  "Сайт на 5 страниц",
                  "Адаптивный дизайн",
                  "Базовые формы заявок",
                  "Подключение Метрики",
                  "1 правка после сдачи"
                ]
              },
              {
                name: "Оптимальный",
                price: "от 70 000 ₽",
                period: "Срок: 14–21 день",
                features: [
                  "Сайт на 7–10 страниц",
                  "Уникальный дизайн",
                  "Квиз или калькулятор",
                  "Интеграция с CRM",
                  "SEO-оптимизация",
                  "2 правки после сдачи"
                ],
                popular: true
              },
              {
                name: "Продвинутый",
                price: "от 100 000 ₽",
                period: "Срок: 21–30 дней",
                features: [
                  "Сайт на 10+ страниц",
                  "Премиум-дизайн",
                  "Квиз + чат-бот",
                  "Полная интеграция",
                  "Копирайтинг и контент",
                  "Настройка рекламы",
                  "3 правки + поддержка"
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
                    Выбрать пакет
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Почему мы */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Почему CentrLP
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Опыт работы с малым бизнесом с 2011 года",
              "Знаем специфику локального рынка Тюмени",
              "Используем ИИ для ускорения разработки и тестов",
              "Связываем сайт с рекламой, ВК, чат-ботами в единую систему",
              "Работаем по договору с прозрачными этапами",
              "Возможны бартерные пакеты по согласованию"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Частые вопросы
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Сколько времени занимает разработка?",
                a: "От 10 до 30 дней в зависимости от пакета. Базовый сайт — 10–14 дней, оптимальный — 14–21 день, продвинутый — 21–30 дней."
              },
              {
                q: "Можно ли оплачивать по этапам?",
                a: "Да, стандартная схема — 50% предоплата, 50% после сдачи. Возможна разбивка на 3 платежа для крупных проектов."
              },
              {
                q: "Что нужно от меня для старта?",
                a: "Заполнить бриф, предоставить логотип (если есть), описать услуги и целевую аудиторию. Остальное берём на себя."
              },
              {
                q: "Будет ли сайт продавать сразу?",
                a: "Сайт — это инструмент. Для продаж нужна связка: трафик (реклама) + сайт + обработка заявок. Мы настраиваем всю цепочку."
              },
              {
                q: "Можно ли потом самому редактировать сайт?",
                a: "Да, Tilda — это визуальный конструктор. После сдачи обучим базовым правкам или будем вносить изменения за вас."
              },
              {
                q: "Входит ли продвижение в стоимость?",
                a: "Настройка базовой SEO и Метрики входит. Реклама и контент-маркетинг — отдельные услуги, можем обсудить комплекс."
              },
              {
                q: "Возможен бартер?",
                a: "Да, если вы предлагаете услуги, которые нам интересны (например, для СТО, клининга, мебели). Обсуждаем индивидуально."
              }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-muted/50 rounded-xl">
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
            Готовы запустить сайт, который работает?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Оставьте заявку — разберём ваш проект, предложим решение и рассчитаем стоимость
          </p>
        </div>
        <div className="container max-w-2xl">
          <ContactForm />
        </div>
        <div className="container max-w-2xl mt-12 text-center">
          <p className="text-muted-foreground mb-4">Или напишите напрямую:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacts">
              <Button variant="outline" size="lg">
                Контакты и мессенджеры
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
