import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Zap, Users, CheckCircle, BarChart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const YandexDirect = () => {
  return (
    <Layout
      title="Настройка рекламы Яндекс Директ (поиск + РСЯ) | CentrLP"
      description="Профессиональная настройка и ведение рекламы в Яндекс Директ. Поиск, РСЯ, ретаргетинг. Платите только за целевых клиентов."
    >
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Реклама в Яндекс Директ, которая окупается
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Настроим рекламу под ваш бизнес: поиск, РСЯ, ретаргетинг. Привлечём клиентов из Тюмени и других регионов с минимальной стоимостью заявки.
            </p>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#contact">Запустить рекламу</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Кому подходит Яндекс Директ</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Локальный бизнес</h3>
                <p className="text-muted-foreground">
                  Услуги в Тюмени: салоны, СТО, клининг, ремонт. Получайте клиентов из своего города.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
                <p className="text-muted-foreground">
                  Интернет-магазины с доставкой по России. Привлекаем покупателей через поиск и РСЯ.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="pt-6">
                <BarChart className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">B2B сектор</h3>
                <p className="text-muted-foreground">
                  Услуги для бизнеса: подрядчики, консалтинг, оборудование. Горячие лиды по целевым запросам.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Начните получать клиентов из Яндекса уже через неделю
            </h2>
          </div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default YandexDirect;