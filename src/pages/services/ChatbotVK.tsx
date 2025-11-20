import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Clock, Zap, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ChatbotVK = () => {
  return (
    <Layout
      title="Чат-бот ВКонтакте и виджет на сайт | CentrLP"
      description="Разработка умных чат-ботов для ВКонтакте и виджетов на сайт. Автоматизация общения с клиентами, прием заявок 24/7 и увеличение конверсии."
    >
      {/* Hero Block */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Чат-бот, который работает за вас круглосуточно
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Принимайте заявки, консультируйте клиентов и продавайте услуги даже когда вы спите. 
              Разработаем умного бота для ВКонтакте или виджет прямо на ваш сайт.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Обработка заявок 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Квалификация клиентов</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Интеграция с CRM</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Разработать чат-бота</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Для кого подходит чат-бот</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Сервисный бизнес</h3>
                <p className="text-muted-foreground">
                  Салоны красоты, клиники, автосервисы, студии — прием заявок и запись клиентов автоматически.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <MessageSquare className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                <p className="text-muted-foreground">
                  Интернет-магазины и онлайн-сервисы — консультация покупателей, оформление заказов, ответы на FAQ.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">B2B компании</h3>
                <p className="text-muted-foreground">
                  Квалификация лидов, сбор информации о потребностях, передача горячих заявок менеджерам.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Какие проблемы решает чат-бот</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Клиенты пишут в нерабочее время, а вы теряете заявки",
              "Менеджеры не успевают обработать все обращения",
              "Много однотипных вопросов отнимают время у команды",
              "Нет автоматического сбора данных о клиентах",
              "Теряются лиды из рекламы из-за долгого ответа",
              "Нет системы квалификации заявок до разговора с менеджером"
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
          <h2 className="text-3xl font-bold mb-12 text-center">Как мы разрабатываем бота</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Анализ бизнес-процессов",
                description: "Изучаем ваши задачи, сценарии общения с клиентами и точки контакта. Определяем, какие процессы можно автоматизировать."
              },
              {
                step: "02",
                title: "Проектирование сценариев",
                description: "Прописываем диалоги, логику ветвления, интеграции с CRM и формы сбора данных. Создаем user flow для разных типов клиентов."
              },
              {
                step: "03",
                title: "Разработка и настройка",
                description: "Создаем бота на платформе ВКонтакте или виджет для сайта. Настраиваем интеграции с вашими системами и базами данных."
              },
              {
                step: "04",
                title: "Тестирование",
                description: "Проверяем все сценарии, отрабатываем нестандартные ситуации, тестируем на реальных диалогах."
              },
              {
                step: "05",
                title: "Запуск и обучение",
                description: "Запускаем бота в работу, обучаем вашу команду работе с админ-панелью и передаем управление."
              },
              {
                step: "06",
                title: "Поддержка и улучшение",
                description: "Анализируем статистику диалогов, дорабатываем сценарии, добавляем новые функции по мере роста бизнеса."
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
              { icon: Clock, title: "Работа 24/7", desc: "Бот никогда не спит и не уходит на обед" },
              { icon: Zap, title: "Мгновенный ответ", desc: "Клиенты получают реакцию в первые секунды" },
              { icon: Users, title: "Квалификация лидов", desc: "Бот сам отсеивает нецелевых клиентов" },
              { icon: CheckCircle, title: "Сбор данных", desc: "Автоматическое заполнение базы контактов" },
              { icon: MessageSquare, title: "Разгрузка команды", desc: "Менеджеры работают только с теплыми лидами" },
              { icon: ArrowRight, title: "Рост конверсии", desc: "Больше заявок превращаются в продажи" }
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
          <h2 className="text-3xl font-bold mb-12 text-center">Типовые сценарии</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Салон красоты</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Было:</p>
                    <p>40% звонков пропущено, запись через администратора</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Сделали:</p>
                    <p>Бот с выбором услуги, мастера и времени, оплата онлайн</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Результат:</p>
                    <p>+60% записей в нерабочее время, 0 пропущенных заявок</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Интернет-магазин</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Было:</p>
                    <p>Много однотипных вопросов, медленная обработка</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Сделали:</p>
                    <p>FAQ-бот с поиском товаров и оформлением заказа</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Результат:</p>
                    <p>-70% нагрузки на поддержку, +35% конверсия в заказ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">B2B-компания</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Было:</p>
                    <p>Менеджеры тратили время на холодные лиды</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Сделали:</p>
                    <p>Квалификационный бот с передачей в CRM</p>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">Результат:</p>
                    <p>Только теплые лиды менеджерам, +45% к продажам</p>
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
                <h3 className="text-2xl font-bold mb-2">Базовый бот</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 25 000 ₽</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Линейный сценарий (FAQ, прием заявки)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">До 10 шагов диалога</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Отправка заявок в Telegram/Email</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Базовая аналитика</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Инструкция по управлению</span>
                  </li>
                </ul>
                <p className="text-muted-foreground text-sm">Срок: 5-7 дней</p>
              </CardContent>
            </Card>

            <Card className="hover-scale border-primary shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  ПОПУЛЯРНЫЙ
                </div>
                <h3 className="text-2xl font-bold mb-2">Умный бот</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 60 000 ₽</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Сложные ветвления и сценарии</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Интеграция с CRM-системой</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Квалификация и сегментация лидов</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Расширенная аналитика и отчеты</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Месяц технической поддержки</span>
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
                    <span className="text-sm">AI-интеграции для умных ответов</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Омниканальность (VK + сайт + мессенджеры)</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Интеграция с бизнес-системами</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Персональные доработки</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Сопровождение и доработки</span>
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
                <h3 className="text-xl font-semibold mb-3">Опыт с 2011 года</h3>
                <p className="text-muted-foreground">
                  Работаем с локальным и федеральным бизнесом. Знаем, как построить автоматизацию под реальные задачи.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Комплексный подход</h3>
                <p className="text-muted-foreground">
                  Чат-бот + сайт + реклама + контент. Мы видим всю воронку целиком и делаем систему, а не отдельные элементы.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">AI и автоматизация</h3>
                <p className="text-muted-foreground">
                  Используем современные технологии: нейросети для генерации ответов, машинное обучение для улучшения диалогов.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Бартер и рассрочка</h3>
                <p className="text-muted-foreground">
                  Возможен обмен услугами с мебельщиками, клинингом, СТО. Также работаем поэтапно без больших вложений.
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
                <AccordionTrigger>Сколько времени занимает разработка бота?</AccordionTrigger>
                <AccordionContent>
                  Базовый бот — 5-7 дней, умный бот с интеграциями — 10-14 дней. Корпоративные решения обсуждаются индивидуально.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Можно ли запустить бота на нескольких платформах?</AccordionTrigger>
                <AccordionContent>
                  Да, мы можем создать единого бота для ВКонтакте, сайта, Telegram и других каналов с единой логикой и базой данных.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Нужно ли мне техническое образование для управления ботом?</AccordionTrigger>
                <AccordionContent>
                  Нет, мы создаем удобную админ-панель и обучаем вашу команду. Вы сможете менять тексты, добавлять вопросы и смотреть статистику без программирования.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Какая гарантия, что бот будет работать стабильно?</AccordionTrigger>
                <AccordionContent>
                  Мы тестируем все сценарии перед запуском и даем месяц технической поддержки. Боты размещаются на надежных серверах с мониторингом 24/7.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Можно ли интегрировать бота с нашей CRM?</AccordionTrigger>
                <AccordionContent>
                  Да, мы работаем с популярными CRM (Битрикс24, amoCRM, Мегаплан и другие). Заявки из бота автоматически попадают в вашу систему.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Что нужно от меня для старта?</AccordionTrigger>
                <AccordionContent>
                  Доступ к сообществу ВКонтакте или сайту, описание задач бизнеса и примеры типичных вопросов от клиентов. Остальное мы берем на себя.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>Можно ли оплатить работу поэтапно?</AccordionTrigger>
                <AccordionContent>
                  Да, работаем по этапам: предоплата 50% → разработка → согласование → оплата оставшихся 50% → запуск. Возможен бартер с некоторыми видами бизнеса.
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
              Получите консультацию по автоматизации вашего бизнеса
            </h2>
            <p className="text-xl text-muted-foreground">
              Расскажем, как чат-бот может увеличить продажи и разгрузить вашу команду. Составим план внедрения и рассчитаем стоимость.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default ChatbotVK;