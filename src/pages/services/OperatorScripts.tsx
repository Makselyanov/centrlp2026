import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, Target, TrendingUp, CheckCircle, Headphones } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const OperatorScripts = () => {
  return (
    <Layout
      title="Скрипты продаж и FAQ для операторов | CentrLP"
      description="Разработка продающих скриптов для отдела продаж и службы поддержки. Увеличьте конверсию звонков и сообщений в сделки."
    >
      {/* Hero Block */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Скрипты, которые продают за вас
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Разработаем продающие скрипты для отдела продаж и готовые ответы на типичные вопросы клиентов. 
              Ваша команда всегда знает, что сказать и как закрыть сделку.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Рост конверсии на 30-50%</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Быстрое обучение новичков</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Единый стандарт общения</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Заказать скрипты</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Кому нужны скрипты</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Headphones className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Отдел продаж</h3>
                <p className="text-muted-foreground">
                  Компании с активными продажами по телефону: обработка входящих заявок, холодные звонки, допродажи.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Служба поддержки</h3>
                <p className="text-muted-foreground">
                  Онлайн-школы, сервисы, интернет-магазины — нужна база готовых ответов на частые вопросы клиентов.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Сервисный бизнес</h3>
                <p className="text-muted-foreground">
                  Салоны, клиники, СТО — стандартизация общения с клиентами на всех этапах воронки.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Какие проблемы решаем</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Менеджеры отвечают по-разному, нет единого стандарта",
              "Новички долго входят в работу, теряют лиды на старте",
              "Низкая конверсия из заявки в продажу",
              "Операторы не знают, как отвечать на возражения",
              "Клиенты не получают нужную информацию и уходят к конкурентам",
              "Много времени уходит на однотипные вопросы"
            ].map((problem, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <p className="text-foreground">{problem}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Solve */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Как мы создаем скрипты</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Анализ текущих продаж",
                description: "Изучаем ваши звонки и переписки, выявляем успешные и проблемные моменты, собираем лучшие практики топовых менеджеров."
              },
              {
                step: "02",
                title: "Сегментация аудитории",
                description: "Определяем типы клиентов, их боли и возражения. Под каждый сегмент создаем отдельный сценарий общения."
              },
              {
                step: "03",
                title: "Написание скриптов",
                description: "Прописываем структуру диалога: приветствие, выявление потребностей, презентация, работа с возражениями, закрытие сделки."
              },
              {
                step: "04",
                title: "FAQ и шаблоны",
                description: "Собираем базу готовых ответов на типичные вопросы: цены, сроки, условия, технические детали и т.д."
              },
              {
                step: "05",
                title: "Тестирование в работе",
                description: "Обучаем команду новым скриптам, проводим тестовые звонки, собираем обратную связь и дорабатываем текст."
              },
              {
                step: "06",
                title: "Финализация и внедрение",
                description: "Создаем финальную версию скриптов в удобном формате, обучаем команду и даем рекомендации по контролю качества."
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Что вы получаете</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: TrendingUp, title: "Рост конверсии", desc: "Больше лидов превращается в сделки" },
              { icon: Users, title: "Быстрое обучение", desc: "Новички выходят на результат за неделю" },
              { icon: Target, title: "Единый стандарт", desc: "Все говорят с клиентами одинаково качественно" },
              { icon: FileText, title: "Готовые ответы", desc: "База FAQ экономит время на повторах" },
              { icon: CheckCircle, title: "Меньше ошибок", desc: "Операторы знают, как реагировать в любой ситуации" },
              { icon: Headphones, title: "Уверенность команды", desc: "Менеджеры чувствуют себя увереннее в диалоге" }
            ].map((item, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="pt-6 text-center">
                  <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Примеры результатов</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Мебельная компания</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Было:</p>
                    <p>Конверсия из заявки в продажу 15%, каждый менеджер работал по-своему</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Сделали:</p>
                    <p>Скрипты под входящие звонки с расчетом и закрытием на замер</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Результат:</p>
                    <p>Конверсия выросла до 38%, время обучения новичков сократилось с месяца до недели</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Онлайн-школа</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Было:</p>
                    <p>Поддержка перегружена однотипными вопросами, долгое время ответа</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Сделали:</p>
                    <p>FAQ-база на 120 вопросов + скрипты продаж курсов для менеджеров</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Результат:</p>
                    <p>-60% нагрузки на поддержку, +25% конверсия в покупку курса</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Салон красоты</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Было:</p>
                    <p>Администраторы не умели допродавать, средний чек застыл</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Сделали:</p>
                    <p>Скрипты с техниками upsell и cross-sell для разных типов визитов</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Результат:</p>
                    <p>Средний чек вырос на 40%, повторные визиты +30%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tariffs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Форматы работы</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Базовые скрипты</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 20 000 ₽</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">1-2 сценария общения (входящие/исходящие)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Базовая работа с возражениями (5-7 блоков)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">FAQ на 20-30 вопросов</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Документ в Word/PDF</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Консультация по внедрению</span>
                  </li>
                </ul>
                <p className="text-muted-foreground text-sm">Срок: 5-7 дней</p>
              </CardContent>
            </Card>

            <Card className="hover-scale border-primary shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  РЕКОМЕНДУЕМ
                </div>
                <h3 className="text-2xl font-bold mb-2">Комплексные скрипты</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 50 000 ₽</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Полный цикл продаж (от первого касания до закрытия)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Сегментация по типам клиентов</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Расширенная работа с возражениями</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">FAQ на 50+ вопросов</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Обучение команды (1 день)</span>
                  </li>
                </ul>
                <p className="text-muted-foreground text-sm">Срок: 10-14 дней</p>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Корпоративный</h3>
                <p className="text-3xl font-bold text-primary mb-4">по запросу</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Скрипты для всех отделов (продажи, поддержка, допродажи)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Интеграция с CRM, чат-ботами</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Система контроля качества и KPI</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Корпоративное обучение команды</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Дальнейшее сопровождение</span>
                  </li>
                </ul>
                <p className="text-muted-foreground text-sm">Срок: индивидуально</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why CentrLP */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Почему CentrLP</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Практический опыт</h3>
                <p className="text-muted-foreground">
                  Пишем скрипты с 2011 года для разных ниш: от локального бизнеса до федеральных компаний. Знаем, что работает.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Анализ реальных звонков</h3>
                <p className="text-muted-foreground">
                  Не пишем "из головы" — изучаем ваши записи разговоров, выявляем закономерности и берем лучшее от топовых менеджеров.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Не шаблоны, а индивидуальность</h3>
                <p className="text-muted-foreground">
                  Учитываем специфику вашей ниши, продукта, ЦА. Скрипты звучат естественно и работают на результат.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Гибкие условия</h3>
                <p className="text-muted-foreground">
                  Возможен бартер с мебельщиками, клинингом, СТО. Также работаем поэтапно без больших вложений.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Частые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Сколько времени нужно на разработку скриптов?</AccordionTrigger>
                <AccordionContent>
                  Базовые скрипты — 5-7 дней, комплексные с сегментацией и обучением — 10-14 дней. Всё зависит от объема и сложности.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Нужно ли вам давать записи звонков?</AccordionTrigger>
                <AccordionContent>
                  Да, это очень помогает. Мы анализируем реальные диалоги, выявляем паттерны и лучшие практики. Если записей нет — проведем интервью с менеджерами.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Можно ли использовать скрипты для чат-ботов?</AccordionTrigger>
                <AccordionContent>
                  Да, мы адаптируем скрипты под любой канал: телефон, переписка в соцсетях, email, чат-боты. Можем сразу интегрировать в бота.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Вы обучаете нашу команду работе со скриптами?</AccordionTrigger>
                <AccordionContent>
                  Да, в комплексном и корпоративном пакете есть обучение. Проводим воркшоп с командой, отрабатываем сложные моменты, даем рекомендации.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Что если скрипты не подойдут?</AccordionTrigger>
                <AccordionContent>
                  Мы делаем до 2 итераций корректировок бесплатно после тестирования. Дорабатываем на основе обратной связи от вашей команды и реальных результатов.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>В каком формате мы получим скрипты?</AccordionTrigger>
                <AccordionContent>
                  Word/PDF — для печати и изучения. По запросу можем сделать интерактивную версию в Notion, Google Docs или интегрировать в вашу CRM.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>Можно ли оплатить поэтапно?</AccordionTrigger>
                <AccordionContent>
                  Да: предоплата 50% → создание скриптов → согласование → оплата 50% → финальная версия и обучение. Рассмотрим бартер.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Увеличьте конверсию продаж с правильными скриптами
            </h2>
            <p className="text-xl text-muted-foreground">
              Получите консультацию по созданию скриптов для вашего отдела продаж. Расскажем, как поднять результаты и стандартизировать работу команды.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default OperatorScripts;