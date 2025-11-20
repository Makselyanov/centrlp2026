import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, TrendingUp, Store, Smartphone, GraduationCap, CheckCircle, Target, Eye } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const VKAds = () => {
  return (
    <Layout
      title="Таргетированная реклама ВКонтакте (лиды, ретаргет) | CentrLP"
      description="Настройка эффективной таргетированной рекламы в ВК. Лидогенерация, охватные кампании, ретаргетинг и продвижение сообществ."
    >
      {/* Hero Block */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Таргет ВКонтакте: точный выстрел в вашу аудиторию
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Найдем и привлечем ваших клиентов среди 75 миллионов активных пользователей ВК. 
              Лиды, продажи и узнаваемость бренда — всё через самую популярную соцсеть России.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Точный таргетинг</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Лидогенерация</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Ретаргетинг</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Запустить таргет</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Для кого работает реклама ВК</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Store className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                <p className="text-muted-foreground">
                  Одежда, косметика, аксессуары — прямые продажи через динамические товарные объявления и каталоги.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Smartphone className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Локальный бизнес</h3>
                <p className="text-muted-foreground">
                  Салоны, кафе, студии — геотаргетинг на жителей вашего города с возможностью сбора заявок прямо в ВК.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <GraduationCap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Инфобизнес и услуги</h3>
                <p className="text-muted-foreground">
                  Онлайн-школы, консультанты, эксперты — прогрев аудитории и сбор заявок на бесплатные вебинары и курсы.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Почему таргет не приносит результат</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Неправильная аудитория
                </h3>
                <p className="text-muted-foreground">
                  Широкие настройки таргетинга или выбор нерелевантных интересов приводят к низкому CTR и дорогим кликам.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-primary" />
                  Слабые креативы
                </h3>
                <p className="text-muted-foreground">
                  Скучные картинки и заезженные тексты не останавливают внимание в ленте. Объявления пролистывают мимо.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Нет ретаргетинга
                </h3>
                <p className="text-muted-foreground">
                  Большинство пользователей не покупает с первого касания. Без возврата аудитории теряется до 90% потенциальных клиентов.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Solve */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Как мы настраиваем таргет ВК</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Анализ целевой аудитории</h3>
                <p className="text-muted-foreground">
                  Изучаем ваших клиентов: возраст, интересы, поведение. Находим сообщества конкурентов и парсим активных подписчиков.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Создание цепляющих креативов</h3>
                <p className="text-muted-foreground">
                  Разрабатываем яркие баннеры и пишем продающие тексты с четким УТП. Готовим несколько вариантов для тестирования.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Настройка точного таргетинга</h3>
                <p className="text-muted-foreground">
                  Используем все возможности: интересы, сообщества, look-alike аудитории, геотаргетинг. Разделяем по воронке продаж.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Запуск и A/B-тестирование</h3>
                <p className="text-muted-foreground">
                  Тестируем разные связки аудиторий, креативов и офферов. Находим самые эффективные комбинации и масштабируем их.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ретаргетинг и оптимизация</h3>
                <p className="text-muted-foreground">
                  Возвращаем посетителей сайта и тех, кто взаимодействовал с рекламой. Постоянно улучшаем показатели кампаний.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Что вы получите</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Поток целевых лидов</h3>
                <p className="text-muted-foreground">
                  Заявки от людей, которым действительно интересен ваш продукт. Не случайные клики, а заинтересованная аудитория.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Рост продаж</h3>
                <p className="text-muted-foreground">
                  Увеличение конверсии за счет ретаргетинга и прогрева аудитории через контент и сторис.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Heart className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Узнаваемость бренда</h3>
                <p className="text-muted-foreground">
                  Охватные кампании для повышения знания о вашем продукте среди целевой аудитории.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <CheckCircle className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Предсказуемый результат</h3>
                <p className="text-muted-foreground">
                  Точные данные по стоимости заявки, конверсии и ROI. Масштабируем то, что работает.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Примеры кампаний</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Онлайн-школа маркетинга</h3>
                <p className="text-muted-foreground mb-4">
                  Настроили воронку через лид-форму на бесплатный вебинар. Прогрели аудиторию контентом, затем запустили ретаргетинг на платный курс. CPL снизили в 2 раза.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">450+</div>
                    <div className="text-muted-foreground">Заявок на вебинар</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">280₽</div>
                    <div className="text-muted-foreground">Стоимость лида</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Магазин одежды</h3>
                <p className="text-muted-foreground mb-4">
                  Запустили динамический ретаргетинг на посетителей сайта и товарные кампании с каталогом. Вернули 35% брошенных корзин, увеличили средний чек на 20%.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">520%</div>
                    <div className="text-muted-foreground">ROAS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">+35%</div>
                    <div className="text-muted-foreground">Возврат корзин</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Форматы работы</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Настройка</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 20 000₽</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Анализ ЦА и конкурентов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Создание 3-5 креативов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Настройка до 10 объявлений</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Установка пикселя ВК</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#contact">Обсудить проект</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-scale border-primary">
              <CardContent className="pt-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-2">
                  Рекомендуем
                </div>
                <h3 className="text-2xl font-bold mb-2">Ведение</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 30 000₽/мес</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Всё из тарифа "Настройка"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Оптимизация кампаний</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Ретаргетинг на теплую базу</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Отчеты 2 раза в месяц</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a href="#contact">Начать работу</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Комплекс</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 50 000₽/мес</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Всё из тарифа "Ведение"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Креативы каждую неделю</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Контент-план для сообщества</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Связка с Директом</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#contact">Обсудить проект</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Частые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Какой бюджет нужен для эффективной рекламы?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Рекомендуем стартовать от 20 000₽ на рекламу. Этого хватит для тестирования аудиторий и креативов. Чем больше бюджет, тем быстрее получим статистику и оптимизируем кампании.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Сколько времени нужно для оценки результатов?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Первые заявки могут прийти в первые дни. Но для объективной оценки нужно 2-3 недели: за это время накапливается статистика и мы оптимизируем таргетинги и креативы.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Вы создаете креативы или нужны свои?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Мы разрабатываем креативы сами: дизайн, тексты, форматы. Если у вас есть свои наработки — используем их для тестов. Главное — найти то, что конвертит лучше всего.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Что такое ретаргетинг и зачем он нужен?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Ретаргетинг — это показ рекламы тем, кто уже был на вашем сайте или взаимодействовал с объявлениями. Это самая конверсионная аудитория, потому что люди уже знают о вас.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Можно ли запустить рекламу без сайта?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да! ВКонтакте позволяет собирать заявки через лид-формы прямо в соцсети. Также можно вести пользователей в сообщество или на мини-приложение.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Привлечем клиентов из ВКонтакте
            </h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку — проанализируем вашу нишу и предложим стратегию запуска таргетированной рекламы.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default VKAds;