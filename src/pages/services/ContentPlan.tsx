import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Zap, Users, TrendingUp, CheckCircle, MessageSquare, Target } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ContentPlan = () => {
  return (
    <Layout
      title="Контент-план ВК, креативы, посты | CentrLP"
      description="Разработка контент-плана для ВКонтакте, создание постов и креативов. Вовлечение аудитории, продвижение сообщества и рост продаж."
    >
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Контент, который продает и вовлекает
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Прекратите придумывать, что постить. Получите готовый контент-план с креативами, текстами и расписанием публикаций для вашего сообщества ВКонтакте.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Готовые посты</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Креативы</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>План на месяц</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Заказать контент-план</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Кому нужен контент-план</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Малый бизнес</h3>
                <p className="text-muted-foreground">Нет времени вести соцсети? Готовый план освободит время, а регулярные публикации удержат подписчиков.</p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Эксперты и инфобизнес</h3>
                <p className="text-muted-foreground">Прогревайте аудиторию полезным контентом, повышайте доверие и подводите к покупке курсов или консультаций.</p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <MessageSquare className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Онлайн-магазины</h3>
                <p className="text-muted-foreground">Презентуйте товары через контент: обзоры, лайфхаки, отзывы. Увеличивайте продажи без навязчивой рекламы.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Что входит в контент-план</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Календарь публикаций
                </h3>
                <p className="text-muted-foreground">Расписание на месяц: какие посты, в какие дни, в какое время. Учитываем активность вашей аудитории.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  Готовые тексты постов
                </h3>
                <p className="text-muted-foreground">Полезный, продающий и развлекательный контент. Все тексты адаптированы под вашу нишу и тон голоса бренда.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Креативы и визуалы
                </h3>
                <p className="text-muted-foreground">Картинки, карусели, инфографика. Каждый пост сопровождается готовым визуалом для максимального вовлечения.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Форматы работы</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-scale border-primary">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Контент-план</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 25 000₽/мес</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">20-30 постов в месяц</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Тексты и креативы</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Календарь публикаций</span></li>
                </ul>
                <Button className="w-full" asChild><a href="#contact">Начать работу</a></Button>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Ведение сообщества</h3>
                <p className="text-3xl font-bold text-primary mb-4">от 40 000₽/мес</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Всё из контент-плана</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Публикация постов</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Ответы на комментарии</span></li>
                </ul>
                <Button variant="outline" className="w-full" asChild><a href="#contact">Обсудить проект</a></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Частые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">Можно ли корректировать контент-план?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Да, вы получаете план заранее и можете запросить правки. Мы адаптируем посты под ваши пожелания.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">Откуда берете идеи для постов?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">Изучаем вашу нишу, конкурентов, запросы аудитории. Используем проверенные форматы: кейсы, советы, истории, продающие посты.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Закажите контент-план под ключ</h2>
            <p className="text-xl text-muted-foreground">Оставьте заявку — обсудим вашу нишу и создадим план контента, который работает.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default ContentPlan;