import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Users, Heart, MessageCircle } from "lucide-react";

export default function VKDesign() {
  return (
    <Layout
      title="Оформление группы ВКонтакте под ключ | CentrLP Тюмень"
      description="Профессиональное оформление сообщества ВК для бизнеса: обложка, меню, виджеты, описание, перенос отзывов. Группа, которая продаёт и вызывает доверие."
    >
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">Оформление ВКонтакте</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Группа ВК, которая вызывает доверие и продаёт
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Оформляем сообщество так, чтобы новые посетители сразу понимали, чем вы занимаетесь, и хотели оставить заявку.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Группа пустая</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Нет заявок из ВК</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Выглядит дёшево</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#form">
                <Button size="lg" className="text-lg px-8 animate-pulse-gentle">
                  Оформить группу <ArrowRight className="ml-2" />
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
            Кому нужно оформление ВК
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "Локальный бизнес",
                text: "Салоны, СТО, клининг, мебель — клиенты ищут вас ВКонтакте, надо выглядеть солидно"
              },
              {
                icon: Heart,
                title: "Услуги и сервисы",
                text: "Курсы, консультации, репетиторство — группа ВК как витрина и площадка для заявок"
              },
              {
                icon: MessageCircle,
                title: "Интернет-магазины",
                text: "Продаёте товары — нужны каталоги, отзывы, удобная навигация по группе"
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
            Типичные проблемы с группой ВК
          </h2>
          <div className="space-y-4">
            {[
              "Группа пустая или заброшенная — посетители сразу уходят",
              "Нет обложки или она не отражает суть бизнеса",
              "Непонятно, чем занимаетесь и как связаться",
              "Отзывы разбросаны или вообще отсутствуют",
              "Нет меню, виджетов, кнопок — посетитель теряется",
              "Реклама ведёт в группу, а там хаос — деньги на ветер"
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
            Что входит в оформление
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Обложка и аватар",
                text: "Рисуем фирменную обложку с акцентом на услуги и контакты. Аватар — логотип или узнаваемый символ."
              },
              {
                step: "02",
                title: "Описание и блоки информации",
                text: "Заполняем «О сообществе», прописываем услуги, адрес, телефоны. Добавляем блоки с удобной навигацией."
              },
              {
                step: "03",
                title: "Меню и кнопки действий",
                text: "Настраиваем главное меню, кнопку «Связаться», «Оставить заявку», ссылки на сайт и мессенджеры."
              },
              {
                step: "04",
                title: "Закреп и виджеты",
                text: "Пост-закреп с основным предложением. Виджеты: телефон, сайт, приложение, форма связи."
              },
              {
                step: "05",
                title: "Перенос отзывов",
                text: "Собираем отзывы с других площадок и размещаем в альбоме или закреплённом обсуждении."
              },
              {
                step: "06",
                title: "Товары / Услуги (если нужно)",
                text: "Создаём карточки товаров или услуг с ценами и описаниями, если это актуально для вашей ниши."
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
              "Профессионально оформленная группа — вызывает доверие с первого взгляда",
              "Понятная структура — посетители легко находят нужную информацию",
              "Удобные кнопки и меню — простой путь к заявке или звонку",
              "Отзывы на виду — социальные доказательства работают на продажи",
              "Готовность к рекламе — можно сразу запускать трафик из ВК",
              "Увеличение конверсии — из посетителей в подписчиков и клиентов"
            ].map((result, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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
                niche: "Салон красоты",
                before: "Группа без обложки, 200 подписчиков",
                after: "Оформленная группа + реклама",
                metric: "2000 подписчиков за 2 месяца"
              },
              {
                niche: "СТО",
                before: "Группа-заглушка, 0 заявок",
                after: "Полное оформление + чат-бот",
                metric: "15–20 заявок/месяц"
              },
              {
                niche: "Мебельная студия",
                before: "Хаотичные посты, без структуры",
                after: "Меню, отзывы, закреп с офером",
                metric: "Конверсия в заявки +60%"
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
            Форматы и стоимость
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Базовое оформление",
                price: "от 10 000 ₽",
                period: "Срок: 3–5 дней",
                features: [
                  "Обложка и аватар",
                  "Описание и контакты",
                  "Меню и кнопки",
                  "Закреп с офером"
                ]
              },
              {
                name: "Полное оформление",
                price: "от 20 000 ₽",
                period: "Срок: 5–7 дней",
                features: [
                  "Всё из базового",
                  "Виджеты и блоки",
                  "Перенос отзывов",
                  "Карточки товаров/услуг",
                  "2 поста-закрепа"
                ],
                popular: true
              },
              {
                name: "Под ключ с контентом",
                price: "от 35 000 ₽",
                period: "Срок: 7–10 дней",
                features: [
                  "Полное оформление",
                  "Контент-план на месяц",
                  "10 готовых постов",
                  "Чат-бот для автоответов",
                  "Настройка рекламы"
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
                q: "Можете ли вы вести группу после оформления?",
                a: "Да, предлагаем услугу ведения: контент-план, посты, общение с подписчиками, модерация. Обсуждается отдельно."
              },
              {
                q: "Нужны ли права администратора?",
                a: "Да, нужны полные права для оформления. После сдачи можете оставить нас админами или убрать."
              },
              {
                q: "Сколько отзывов можно перенести?",
                a: "В базовом пакете — до 10 отзывов. В расширенном — без ограничений."
              },
              {
                q: "Можете ли настроить рекламу сразу?",
                a: "Да, в пакете «Под ключ» входит настройка базовой рекламной кампании ВК. Бюджет оплачиваете отдельно."
              },
              {
                q: "Что если у меня несколько групп?",
                a: "Делаем скидку при оформлении 2+ сообществ. Условия обсуждаем индивидуально."
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
            Готовы оформить группу, которая продаёт?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Оставьте заявку — обсудим проект и подберём формат
          </p>
        </div>
        <div className="container max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
}
