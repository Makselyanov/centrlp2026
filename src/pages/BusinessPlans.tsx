import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/ContactForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Calculator, Target, CheckCircle, Clock, Award, Zap } from "lucide-react";
import { motion } from "framer-motion";

const BusinessPlans = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.h1 className="mb-6 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0096D6] to-[#44B78B]" variants={fadeIn}>
              Бизнес-планы и финансовые модели с AI-аналитикой
            </motion.h1>
            <motion.p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" variants={fadeIn}>
              Разрабатываем профессиональные бизнес-планы для получения грантов, субсидий и привлечения инвестиций. Точные расчеты, глубокий анализ рынка и гарантия качества.
            </motion.p>
            <motion.div variants={fadeIn}>
              <a href="#contact-form">
                <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  Заказать расчет проекта
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас?</h2>
            <p className="text-muted-foreground text-lg">Сочетаем опыт экспертов и мощь искусственного интеллекта</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Скорость", desc: "Благодаря AI мы обрабатываем данные в 3 раза быстрее конкурентов" },
              { icon: Target, title: "Точность", desc: "Детальные финансовые модели с учетом всех рисков и сезонности" },
              { icon: Award, title: "Опыт", desc: "Более 50 успешно защищенных проектов в разных нишах" },
              { icon: CheckCircle, title: "Гарантия", desc: "Сопровождаем до получения результата или одобрения заявки" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-primary/10 bg-background/50 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Наши услуги</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full shadow-card border-l-4 border-l-primary">
                <FileText className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Бизнес-план для соцконтракта и субсидий</h3>
                <p className="text-muted-foreground mb-6">
                  Полный пакет документов для защиты в органах соцзащиты или центре занятости. Включает описание идеи, маркетинговый план, смету расходов и прогноз доходов.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Соответствие стандартам региона</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Помощь в защите проекта</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Корректировки бесплатно</li>
                </ul>
                <div className="text-2xl font-bold text-primary">от 5 000 ₽</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full shadow-card border-l-4 border-l-blue-500">
                <Calculator className="w-12 h-12 text-blue-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Финмодель и инвестиционный план</h3>
                <p className="text-muted-foreground mb-6">
                  Сложные расчеты для инвесторов и банков. Юнит-экономика, P&L, Cash Flow, расчет точки безубыточности и ROI. Понятные графики и презентация.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Анализ чувствительности</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Сценарное планирование</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-500 mr-2" /> Презентация для инвестора</li>
                </ul>
                <div className="text-2xl font-bold text-blue-500">от 15 000 ₽</div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Как мы работаем</h2>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10"></div>
            {[
              { step: "01", title: "Брифинг", desc: "Обсуждаем вашу идею, цели и вводные данные" },
              { step: "02", title: "Анализ", desc: "Изучаем рынок, конкурентов и тренды с помощью AI" },
              { step: "03", title: "Разработка", desc: "Готовим финансовую модель и описательную часть" },
              { step: "04", title: "Результат", desc: "Вы получаете готовый документ и инструкцию по защите" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-background p-6 rounded-xl shadow-sm border relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Form */}
      <section className="py-20 gradient-hero" id="contact-form">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы запустить свой проект?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Оставьте заявку, и мы бесплатно проконсультируем вас по шансам на получение субсидии или инвестиций.
            </p>
          </motion.div>

          <div className="bg-card shadow-xl rounded-2xl p-1">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BusinessPlans;
