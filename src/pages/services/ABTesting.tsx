import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Zap, BarChart3, CheckCircle, Repeat, Eye, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ABTesting = () => {
  return (
    <Layout
      title="A/B-тесты креативов и посадочных страниц | CentrLP"
      description="Проведение A/B-тестирования для увеличения конверсии сайта и рекламы. Находим лучшие варианты объявлений, дизайна и оффера."
    >
      {/* Hero Block */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              A/B-тесты: находим то, что продает
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Перестаньте гадать — начните тестировать. Проверяем гипотезы, сравниваем варианты 
              и выбираем самые конверсионные решения на основе реальных данных.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Рост конверсии</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Точные данные</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Минимум рисков</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Запустить тесты</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Кому нужны A/B-тесты</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Рекламодатели</h3>
                <p className="text-muted-foreground">
                  Тестировать креативы, заголовки и тексты объявлений, чтобы снизить стоимость клика и повысить CTR рекламы.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Владельцы сайтов</h3>
                <p className="text-muted-foreground">
                  Повысить конверсию посадочных страниц: изменения в заголовках, кнопках, формах и дизайне могут дать +20-50% к заявкам.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                <p className="text-muted-foreground">
                  Оптимизировать карточки товаров, корзину, процесс оформления заказа для увеличения среднего чека и завершенных покупок.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Почему изменения не работают</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-primary" />
                  Решения на интуиции
                </h3>
                <p className="text-muted-foreground">
                  Вы меняете сайт или креативы «на глаз», не проверяя, стало ли лучше. Иногда изменения даже ухудшают конверсию, но вы этого не замечаете.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Repeat className="w-6 h-6 text-primary" />
                  Слишком много изменений сразу
                </h3>
                <p className="text-muted-foreground">
                  Переделываете весь сайт целиком — и не понимаете, что именно повлияло на результат. A/B-тесты изолируют изменения.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  Нет статистической значимости
                </h3>
                <p className="text-muted-foreground">
                  Запустили тест на 50 посетителях и решили, что вариант Б лучше. Но выборка слишком мала — это случайность, а не закономерность.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Solve */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Как мы проводим A/B-тесты</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Анализ текущей ситуации</h3>
                <p className="text-muted-foreground">
                  Изучаем аналитику: где проседает конверсия, какие страницы имеют высокий отказ, какие объявления дорогие. Формируем гипотезы для тестов.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Разработка вариантов</h3>
                <p className="text-muted-foreground">
                  Создаем 2-3 варианта элемента: новый заголовок, кнопка другого цвета, измененная форма, альтернативный креатив. Каждое изменение обосновано гипотезой.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Настройка и запуск теста</h3>
                <p className="text-muted-foreground">
                  Используем инструменты (Google Optimize, VWO, Яндекс Эксперименты) или встроенные функции рекламных кабинетов. Трафик делится поровну между вариантами.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Сбор статистики</h3>
                <p className="text-muted-foreground">
                  Ждем, пока наберется достаточная выборка (от 100-500 конверсий на вариант). Следим за статистической значимостью результата — не менее 95%.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Анализ и внедрение</h3>
                <p className="text-muted-foreground">
                  Определяем победителя, внедряем лучший вариант на постоянной основе. Запускаем следующий тест для дальнейшей оптимизации.
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
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Рост конверсии</h3>
                <p className="text-muted-foreground">
                  Даже небольшие изменения (цвет кнопки, формулировка оффера) могут увеличить конверсию на 15-40%. Вы получаете больше заявок при том же трафике.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Снижение стоимости лида</h3>
                <p className="text-muted-foreground">
                  Лучшие креативы и страницы дают больше конверсий за те же деньги. CPL падает, ROI растет — вы зарабатываете больше на той же рекламе.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Решения на основе данных</h3>
                <p className="text-muted-foreground">
                  Больше никаких споров «мне нравится синяя кнопка». Тесты показывают, что реально работает, а что — нет. Объективные цифры вместо мнений.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Культура экспериментов</h3>
                <p className="text-muted-foreground">
                  Вы научитесь постоянно улучшать сайт и рекламу малыми шагами. Каждый месяц — новый тест, каждый тест — рост эффективности.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Примеры тестов</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Посадочная страница юридической фирмы</h3>
                <p className="text-muted-foreground mb-4">
                  Протестировали 3 варианта заголовка: общий, про результат и про боли клиента. Вариант с болями («Закрыли ИП, а долги остались?») победил с конверсией 8,2% против 4,5% у оригинала.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">+82%</div>
                    <div className="text-muted-foreground">Рост конверсии</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-muted-foreground">Достоверность</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Креативы для таргета ВК (онлайн-курсы)</h3>
                <p className="text-muted-foreground mb-4">
                  Сравнили креатив с фото преподавателя и с примером результата студента. Креатив с результатом дал CTR 2,8% против 1,4%, а CPL снизился с 450₽ до 280₽.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">2x</div>
                    <div className="text-muted-foreground">Рост CTR</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">-38%</div>
                    <div className="text-muted-foreground">Снижение CPL</div>
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
                <h3 className="text-2xl font-bold mb-2">Разовый тест</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 20 000₽</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Анализ и гипотеза</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Разработка 2-3 вариантов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Настройка и запуск</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Отчет с выводами</span>
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
                  Эффективно
                </div>
                <h3 className="text-2xl font-bold mb-2">Серия тестов</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 50 000₽/мес</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">3-5 тестов в месяц</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Приоритизация гипотез</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Дизайн вариантов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Ежемесячный отчет</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a href="#contact">Начать работу</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Программа CRO</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 80 000₽/мес</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Всё из "Серии тестов"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Аудит юзабилити</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Тепловые карты, записи сессий</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Дорожная карта оптимизации</span>
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
                  Сколько времени длится один тест?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Зависит от трафика. При 500+ визитов в день тест займет 1-2 недели. Если трафик меньше, потребуется 3-4 недели для статистически значимого результата.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Что лучше тестировать в первую очередь?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Начинаем с элементов, которые видят все пользователи и которые напрямую влияют на конверсию: заголовок, главный оффер, форма заявки, CTA-кнопка. Это дает максимальный эффект.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Можно ли тестировать несколько элементов одновременно?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Технически можно (мультивариантное тестирование), но нужен очень высокий трафик. Обычно тестируем один элемент за раз, чтобы четко понять, что повлияло на результат.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Что если ни один вариант не победил?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Это тоже результат! Значит, гипотеза не подтвердилась, и мы экономим время на внедрении неэффективных изменений. Формируем новую гипотезу и тестируем дальше.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Нужно ли техническое вмешательство в сайт?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Зависит от инструмента. Google Optimize и аналоги позволяют тестировать через визуальный редактор, без правок кода. Если нужны сложные изменения, подключаем разработчика.
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
              Повысим конверсию на основе данных
            </h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку — проведем аудит, предложим первые гипотезы для тестирования и запустим эксперименты.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default ABTesting;