import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Target, Zap, CheckCircle, TrendingUp } from "lucide-react";

const OfferPackaging = () => {
  return (
    <Layout
      title="Упаковка офферов под вашу нишу | CentrLP"
      description="Создание сильных торговых предложений (офферов) для вашего бизнеса. Привлекательные условия, от которых клиенты не могут отказаться."
    >
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Оффер, от которого невозможно отказаться</h1>
            <p className="text-xl text-muted-foreground mb-8">Разработаем сильное торговое предложение, которое выделит вас среди конкурентов и увеличит конверсию продаж.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Анализ конкурентов</span></div>
              <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Уникальное УТП</span></div>
              <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Триггеры продаж</span></div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild><a href="#contact">Упаковать оффер</a></Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Что входит в упаковку</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale"><CardContent className="pt-6"><Target className="w-10 h-10 text-primary mb-4" /><h3 className="text-xl font-semibold mb-2">Анализ ниши</h3><p className="text-muted-foreground">Изучаем конкурентов, их предложения, боли аудитории и находим вашу точку отличия.</p></CardContent></Card>
            <Card className="hover-scale"><CardContent className="pt-6"><Gift className="w-10 h-10 text-primary mb-4" /><h3 className="text-xl font-semibold mb-2">Формула оффера</h3><p className="text-muted-foreground">Создаем структуру: основное предложение + бонусы + гарантии + дедлайн = непреодолимый оффер.</p></CardContent></Card>
            <Card className="hover-scale"><CardContent className="pt-6"><Zap className="w-10 h-10 text-primary mb-4" /><h3 className="text-xl font-semibold mb-2">Триггеры</h3><p className="text-muted-foreground">Добавляем психологические триггеры: срочность, эксклюзивность, социальное доказательство.</p></CardContent></Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Стоимость</h2>
          <div className="max-w-md mx-auto">
            <Card className="hover-scale border-primary"><CardContent className="pt-6 text-center"><h3 className="text-2xl font-bold mb-2">Упаковка оффера</h3><p className="text-4xl font-bold text-primary mb-6">от 20 000₽</p><ul className="space-y-3 mb-8 text-left"><li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Анализ конкурентов</span></li><li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">3-5 вариантов офферов</span></li><li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Структура и формулировки</span></li><li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Рекомендации по внедрению</span></li></ul><Button size="lg" className="w-full" asChild><a href="#contact">Заказать</a></Button></CardContent></Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20"><div className="container mx-auto px-4"><div className="max-w-3xl mx-auto text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Создадим оффер, который продает</h2><p className="text-xl text-muted-foreground">Оставьте заявку — проанализируем вашу нишу и упакуем предложение, от которого сложно отказаться.</p></div><ContactForm /></div></section>
    </Layout>
  );
};

export default OfferPackaging;