import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, MessageSquare, Zap, Users, CheckCircle, Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpBot = () => {
  return (
    <Layout
      title="Help-бот для поддержки клиентов | CentrLP"
      description="Создание help-бота для автоматизации технической поддержки и помощи клиентам. Сократите нагрузку на поддержку на 70%."
    >
      {/* Hero Block */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Help-бот, который разгружает вашу поддержку
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Автоматизируйте 70% запросов в техподдержку с помощью умного бота. 
              Клиенты получают мгновенные ответы, ваша команда работает только со сложными задачами.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Ответы за секунды</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>База знаний</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Передача оператору</span>
              </div>
            </div>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Создать help-бота</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Для кого подходит help-бот</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <MessageSquare className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">SaaS и онлайн-сервисы</h3>
                <p className="text-muted-foreground">
                  Помощь пользователям в работе с платформой, решение технических вопросов, онбординг новичков.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                <p className="text-muted-foreground">
                  Ответы на вопросы о заказах, доставке, возвратах. Отслеживание статусов, решение проблем.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <HelpCircle className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Онлайн-школы</h3>
                <p className="text-muted-foreground">
                  Помощь студентам по техническим вопросам, доступу к материалам, навигация по платформе.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Автоматизируйте техподдержку с help-ботом
            </h2>
            <p className="text-xl text-muted-foreground">
              Разгрузите команду от рутинных вопросов и ускорьте решение проблем клиентов.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default HelpBot;