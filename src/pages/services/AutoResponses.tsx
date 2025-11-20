import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Bell, Zap, CheckCircle, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AutoResponses = () => {
  return (
    <Layout
      title="Автоответы 24/7 и автоматическая запись на услуги | CentrLP"
      description="Настройка системы автоматических ответов и онлайн-записи для вашего бизнеса. Принимайте заявки круглосуточно, не теряйте клиентов."
    >
      {/* Hero Block */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ни одна заявка не останется без ответа
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Автоматические ответы в соцсетях и мессенджерах + система онлайн-записи. 
              Ваши клиенты получают реакцию мгновенно, даже ночью и в выходные.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Ответ в первые секунды</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Работа 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Автоматическая запись</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Настроить автоответы</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Кому это нужно</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Calendar className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Сервисные компании</h3>
                <p className="text-muted-foreground">
                  Салоны красоты, клиники, фитнес-центры, мастера услуг — онлайн-запись без участия администратора.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <MessageCircle className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Онлайн-бизнес</h3>
                <p className="text-muted-foreground">
                  Школы, консультанты, коучи — сбор заявок на консультации и курсы в автоматическом режиме.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Clock className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Малый бизнес</h3>
                <p className="text-muted-foreground">
                  СТО, клининг, доставка — быстрая реакция на заявки, даже когда команда занята или отдыхает.
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
              "Теряете клиентов, которые пишут вечером или в выходные",
              "Администратор не успевает отвечать на все обращения",
              "Клиенты уходят к конкурентам из-за долгого ответа",
              "Нет системы онлайн-записи — всё через звонки",
              "Много времени уходит на рутинные ответы",
              "Пропускаете заявки из рекламы из-за задержки"
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
          <h2 className="text-3xl font-bold mb-12 text-center">Как мы настраиваем систему</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Анализ запросов",
                description: "Изучаем ваши типичные обращения от клиентов: какие вопросы задают, как происходит запись, какие данные нужно собирать."
              },
              {
                step: "02",
                title: "Создание сценариев",
                description: "Прописываем шаблоны автоответов для разных ситуаций и настраиваем логику онлайн-записи с выбором услуги, мастера и времени."
              },
              {
                step: "03",
                title: "Интеграция с календарем",
                description: "Подключаем систему к вашему графику работы: клиенты видят только свободные слоты, бронирование происходит автоматически."
              },
              {
                step: "04",
                title: "Настройка уведомлений",
                description: "Клиенты получают подтверждение записи, напоминания перед визитом. Вы — уведомления о новых записях в удобном формате."
              },
              {
                step: "05",
                title: "Тестирование",
                description: "Проверяем все сценарии: корректность ответов, правильность записи, работу в нерабочее время и в пиковые нагрузки."
              },
              {
                step: "06",
                title: "Запуск и обучение",
                description: "Включаем систему, обучаем вашу команду управлению расписанием и работе с заявками. Даем инструкции и техподдержку."
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
              { icon: Zap, title: "Мгновенная реакция", desc: "Клиенты получают ответ в первые секунды" },
              { icon: Clock, title: "Работа 24/7", desc: "Система не спит, не болеет и не уходит в отпуск" },
              { icon: Calendar, title: "Онлайн-запись", desc: "Клиенты сами выбирают удобное время" },
              { icon: Bell, title: "Умные напоминания", desc: "Автоматические уведомления о предстоящих визитах" },
              { icon: CheckCircle, title: "Меньше рутины", desc: "Команда освобождается от повторяющихся задач" },
              { icon: MessageCircle, title: "Больше заявок", desc: "Ни один клиент не остается без внимания" }
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
          <h2 className="text-3xl font-bold mb-12 text-center">Реальные результаты</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Студия красоты</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Было:</p>
                    <p>Администратор вручную записывал каждого клиента, много пропущенных звонков</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Сделали:</p>
                    <p>Онлайн-запись с выбором услуги, мастера, времени + автоответы в соцсетях</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Результат:</p>
                    <p>+70% записей через систему, 0 пропущенных обращений, -50% нагрузки на ресепшен</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Фитнес-клуб</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Было:</p>
                    <p>Клиенты звонили в неудобное время, долгий процесс записи на тренировки</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Сделали:</p>
                    <p>Система записи на групповые занятия с лимитами мест + автоподтверждение</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Результат:</p>
                    <p>90% клиентов записываются онлайн, +40% посещаемость благодаря напоминаниям</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Клининговая компания</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Было:</p>
                    <p>Много обращений вечером, когда офис закрыт, потеря срочных заказов</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Сделали:</p>
                    <p>Автоответы с расчетом стоимости и сбор заявок круглосуточно</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Результат:</p>
                    <p>+55% заявок в нерабочее время, конверсия в заказ выросла на 30%</p>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Форматы настройки</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Автоответы</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 15 000 ₽</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Настройка автоответов в ВК/мессенджерах</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">До 10 шаблонов сообщений</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Базовый сценарий квалификации</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Уведомления о новых заявках</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Инструкция по использованию</span>
                  </li>
                </ul>
                <p className="text-muted-foreground text-sm">Срок: 3-5 дней</p>
              </CardContent>
            </Card>

            <Card className="hover-scale border-primary shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  ОПТИМАЛЬНЫЙ
                </div>
                <h3 className="text-2xl font-bold mb-2">Запись + Ответы</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 45 000 ₽</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Полная система онлайн-записи</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Интеграция с календарем и расписанием</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Автоматические напоминания клиентам</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Умные автоответы с квалификацией</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Месяц технической поддержки</span>
                  </li>
                </ul>
                <p className="text-muted-foreground text-sm">Срок: 7-10 дней</p>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Под ключ</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 80 000 ₽</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Омниканальная система (VK + сайт + Telegram)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Интеграция с CRM и аналитикой</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Персональная настройка под процессы</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Расширенная аналитика и отчеты</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">3 месяца сопровождения</span>
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
                <h3 className="text-xl font-semibold mb-3">Опыт автоматизации</h3>
                <p className="text-muted-foreground">
                  Настраиваем системы записи и автоответов с 2011 года. Знаем специфику разных ниш: от салонов до B2B.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Не просто бот, а система</h3>
                <p className="text-muted-foreground">
                  Интегрируем запись с сайтом, рекламой, CRM. Вы получаете единую воронку, а не набор отдельных инструментов.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Гибкость решений</h3>
                <p className="text-muted-foreground">
                  Настраиваем под ваши процессы: разные типы услуг, сложные расписания, несколько филиалов — всё учтём.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Бартер возможен</h3>
                <p className="text-muted-foreground">
                  Работаем в обмен на услуги с мебельщиками, клинингом, СТО. Также возможна поэтапная оплата.
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
                <AccordionTrigger>Сколько времени занимает настройка?</AccordionTrigger>
                <AccordionContent>
                  Базовые автоответы — 3-5 дней, система онлайн-записи — 7-10 дней. Комплексные решения обсуждаются индивидуально.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Можно ли настроить запись для разных специалистов?</AccordionTrigger>
                <AccordionContent>
                  Да, система поддерживает несколько мастеров/специалистов с индивидуальными графиками, разными услугами и ценами.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Как клиенты узнают о свободных слотах?</AccordionTrigger>
                <AccordionContent>
                  Система автоматически показывает только свободное время на основе вашего расписания. Вы просто вносите график работы, остальное делает система.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Что делать, если клиент не пришел?</AccordionTrigger>
                <AccordionContent>
                  Автоматические напоминания за сутки и за час до визита снижают количество неявок на 60-70%. Также можно настроить подтверждение записи.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Можно ли изменить расписание вручную?</AccordionTrigger>
                <AccordionContent>
                  Да, у вас будет доступ к админ-панели, где можно заблокировать время, добавить новые слоты или отменить запись.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Нужно ли мне что-то устанавливать?</AccordionTrigger>
                <AccordionContent>
                  Нет, всё работает через браузер или приложения ВКонтакте/Telegram. Вы получаете доступ к панели управления, клиенты записываются через удобный интерфейс.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>Можно ли оплатить поэтапно?</AccordionTrigger>
                <AccordionContent>
                  Да, работаем по этапам: аванс → настройка → тестирование → оплата остатка → запуск. Рассмотрим бартер с некоторыми видами бизнеса.
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
              Перестаньте терять клиентов из-за задержек с ответом
            </h2>
            <p className="text-xl text-muted-foreground">
              Получите консультацию по автоматизации общения и онлайн-записи. Расскажем, как увеличить конверсию и освободить время команды.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default AutoResponses;