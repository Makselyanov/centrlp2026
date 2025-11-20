import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Map, Users, Rocket, CheckCircle, BarChart3, Lightbulb } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const MarketingStrategy = () => {
  return (
    <Layout
      title="Маркетинговая стратегия и медиаплан | CentrLP"
      description="Разработка комплексной маркетинговой стратегии для вашего бизнеса. План развития, бюджетирование, KPI и пошаговый медиаплан."
    >
      {/* Hero Block */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Маркетинговая стратегия: план роста вашего бизнеса
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Перестаньте тратить бюджет хаотично. Получите четкий план развития с конкретными шагами, 
              каналами, бюджетами и прогнозом результатов на 6-12 месяцев.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Четкий план</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Прогноз KPI</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Медиаплан</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Разработать стратегию</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Кому нужна маркетинговая стратегия</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Rocket className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Стартапы</h3>
                <p className="text-muted-foreground">
                  Выходите на рынок с новым продуктом? Нужен четкий план: где искать клиентов, как позиционироваться, на что тратить первый бюджет.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Растущий бизнес</h3>
                <p className="text-muted-foreground">
                  Есть продажи, но хотите больше? Стратегия покажет, как масштабироваться: новые каналы, автоматизация, увеличение LTV клиента.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Map className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Бизнес в стагнации</h3>
                <p className="text-muted-foreground">
                  Продажи стоят на месте или падают? Аудит покажет проблемы, стратегия даст план восстановления и роста с минимальными рисками.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Почему маркетинг не работает</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Нет системы, только хаотичные действия
                </h3>
                <p className="text-muted-foreground">
                  Запускаете рекламу в разных каналах, пробуете SMM, делаете скидки — но без общего плана. Каждый инструмент сам по себе, результат непредсказуем.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  Непонятно, сколько и куда тратить
                </h3>
                <p className="text-muted-foreground">
                  Бюджет ограничен, но не знаете, какой канал принесет больше клиентов. Деньги уходят туда, где «просто интересно попробовать».
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Не понимаете свою аудиторию
                </h3>
                <p className="text-muted-foreground">
                  Реклама не попадает в боли клиентов, УТП размытое, конкуренты выглядят убедительнее. Нет глубокого понимания целевой аудитории.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Solve */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Как мы создаем стратегию</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Маркетинговый аудит</h3>
                <p className="text-muted-foreground">
                  Анализируем текущую ситуацию: ваш продукт, аудиторию, конкурентов, действующие каналы. Выявляем сильные стороны и узкие места.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Позиционирование и УТП</h3>
                <p className="text-muted-foreground">
                  Формулируем четкое позиционирование: чем вы отличаетесь от конкурентов, почему клиент должен выбрать вас. Создаем сильное УТП.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Выбор каналов и тактик</h3>
                <p className="text-muted-foreground">
                  Определяем, где искать клиентов: контекст, соцсети, SEO, email, блог, партнерства. Под каждый канал — конкретная тактика и гипотезы.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Бюджетирование и KPI</h3>
                <p className="text-muted-foreground">
                  Распределяем бюджет по каналам с учетом приоритетов и ожидаемой эффективности. Прописываем метрики успеха и прогноз по заявкам/продажам.
                </p>
              </div>
            </div>
            <div className="flex gap-4 animate-fade-in">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Медиаплан и дорожная карта</h3>
                <p className="text-muted-foreground">
                  Составляем пошаговый план на 6-12 месяцев: что делать, когда, с каким бюджетом. Вы точно знаете, какие задачи выполнять каждую неделю.
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
                <Map className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Четкий план развития</h3>
                <p className="text-muted-foreground">
                  Документ 30-50 страниц с анализом, стратегией, медиапланом. Вы знаете, что делать на ближайший год для роста бизнеса.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Понимание целевой аудитории</h3>
                <p className="text-muted-foreground">
                  Портреты клиентов с болями, возражениями, мотивацией. Понимаете, как говорить с аудиторией и как продавать.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Прогноз и контроль</h3>
                <p className="text-muted-foreground">
                  KPI по каждому каналу, прогноз лидов и продаж, система отслеживания результатов. Управляете маркетингом на основе цифр.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Lightbulb className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Готовые гипотезы</h3>
                <p className="text-muted-foreground">
                  Идеи для роста: что тестировать, какие офферы пробовать, где искать новых клиентов. План действий на старте и на будущее.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Примеры реализации</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Онлайн-школа программирования</h3>
                <p className="text-muted-foreground mb-4">
                  Разработали стратегию выхода на рынок: позиционирование «курсы для тех, кто хочет работу, а не диплом», связка контента + лидген-воронки + ретаргет. За 6 месяцев — 2500 студентов.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">2500</div>
                    <div className="text-muted-foreground">Новых студентов</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">350%</div>
                    <div className="text-muted-foreground">ROI</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">SaaS-сервис для малого бизнеса</h3>
                <p className="text-muted-foreground mb-4">
                  Создали стратегию масштабирования: от холодного трафика (статьи, гайды) через бесплатный триал к платной подписке. Снизили CAC на 40%, увеличили LTV в 2,5 раза за год.
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-primary">-40%</div>
                    <div className="text-muted-foreground">Снижение CAC</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">2,5x</div>
                    <div className="text-muted-foreground">Рост LTV</div>
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
                <h3 className="text-2xl font-bold mb-2">Экспресс-стратегия</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 50 000₽</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Аудит и анализ конкурентов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Выбор 2-3 приоритетных каналов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Краткий медиаплан на 3 месяца</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Презентация стратегии</span>
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
                  Популярно
                </div>
                <h3 className="text-2xl font-bold mb-2">Полная стратегия</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 120 000₽</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Всё из "Экспресс"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Глубокий анализ ЦА и сегментов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Позиционирование и УТП</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Медиаплан на 12 месяцев</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a href="#contact">Начать работу</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Стратегия + Внедрение</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 200 000₽</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Всё из "Полной стратегии"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Запуск первых кампаний</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Настройка аналитики и дашбордов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-muted-foreground">Сопровождение 3 месяца</span>
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
                  Сколько времени занимает разработка стратегии?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Экспресс-стратегия готовится за 1-2 недели. Полная стратегия с глубоким анализом — 3-4 недели. Это зависит от сложности бизнеса и объема данных.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Нужна ли стратегия, если бизнес маленький?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да! Даже микробизнес выигрывает от четкого плана. Стратегия поможет не слить бюджет на неэффективные каналы и сосредоточиться на том, что работает.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Что делать со стратегией дальше?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Можете реализовывать ее своими силами или нанять подрядчиков/агентство. Мы также предлагаем сопровождение внедрения: помогаем запустить первые кампании и консультируем по ходу.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Как часто нужно обновлять стратегию?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Рекомендуем пересматривать стратегию раз в год или при существенных изменениях: запуск нового продукта, смена рынка, появление сильных конкурентов.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Можно ли заказать только медиаплан без стратегии?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, если у вас уже есть позиционирование и понимание аудитории. Медиаплан — это тактический документ, в котором прописаны каналы, бюджеты и план действий по месяцам.
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
              Разработаем стратегию роста для вашего бизнеса
            </h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку — обсудим задачи, проведем экспресс-аудит и предложим оптимальный формат стратегии.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default MarketingStrategy;