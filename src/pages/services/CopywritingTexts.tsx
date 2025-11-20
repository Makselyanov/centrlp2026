import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Target, Zap, CheckCircle, PenTool, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CopywritingTexts = () => {
  return (
    <Layout
      title="Продающие тексты для сайта и рекламы | CentrLP"
      description="Написание продающих текстов для сайтов, объявлений и соцсетей. Копирайтинг, который попадает в боли аудитории и увеличивает конверсию."
    >
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Тексты, которые продают</h1>
            <p className="text-xl text-muted-foreground mb-8">Напишем продающие тексты для сайта, рекламных объявлений и соцсетей. Попадаем в боли клиентов и убеждаем купить.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Сильное УТП</span></div>
              <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Боли и решения</span></div>
              <div className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Призыв к действию</span></div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild><a href="#contact">Заказать тексты</a></Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Что мы пишем</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale"><CardContent className="pt-6"><FileText className="w-10 h-10 text-primary mb-4" /><h3 className="text-xl font-semibold mb-2">Тексты для сайта</h3><p className="text-muted-foreground">Главная страница, о компании, описание услуг — все блоки с ориентацией на конверсию.</p></CardContent></Card>
            <Card className="hover-scale"><CardContent className="pt-6"><Target className="w-10 h-10 text-primary mb-4" /><h3 className="text-xl font-semibold mb-2">Рекламные объявления</h3><p className="text-muted-foreground">Тексты для Яндекс Директ, ВКонтакте, Telegram Ads с цепляющими заголовками и призывами.</p></CardContent></Card>
            <Card className="hover-scale"><CardContent className="pt-6"><PenTool className="w-10 h-10 text-primary mb-4" /><h3 className="text-xl font-semibold mb-2">Посты и статьи</h3><p className="text-muted-foreground">Контент для соцсетей и блога: полезные, продающие и вовлекающие материалы.</p></CardContent></Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Форматы работы</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover-scale border-primary"><CardContent className="pt-6"><h3 className="text-2xl font-bold mb-2">Тексты для сайта</h3><p className="text-3xl font-bold text-primary mb-4">от 15 000₽</p><ul className="space-y-2 mb-6"><li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">До 5 страниц</span></li><li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Структура и заголовки</span></li></ul><Button className="w-full" asChild><a href="#contact">Заказать</a></Button></CardContent></Card>
            <Card className="hover-scale"><CardContent className="pt-6"><h3 className="text-2xl font-bold mb-2">Рекламные тексты</h3><p className="text-3xl font-bold text-primary mb-4">от 10 000₽</p><ul className="space-y-2 mb-6"><li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">10-20 объявлений</span></li><li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-primary mt-0.5" /><span className="text-muted-foreground">Варианты заголовков</span></li></ul><Button variant="outline" className="w-full" asChild><a href="#contact">Обсудить</a></Button></CardContent></Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20"><div className="container mx-auto px-4"><div className="max-w-3xl mx-auto text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Закажите продающие тексты</h2><p className="text-xl text-muted-foreground">Оставьте заявку — обсудим задачи и напишем тексты, которые убеждают и продают.</p></div><ContactForm /></div></section>
    </Layout>
  );
};

export default CopywritingTexts;