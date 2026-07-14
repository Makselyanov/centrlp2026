import { Layout } from "@/components/Layout";
import { ServiceImageBand } from "@/components/ServiceImageBand";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAutoBreadcrumb, useFaqSchema, useServiceSchema } from "@/components/SeoSchemas";
import { ArrowRight, BarChart3, CheckCircle2, FileSearch, Megaphone, MessageSquare, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const VKAds = () => {
  const faqItems = [
    {
      question: "Сколько стоит продвижение ВКонтакте в Тюмени?",
      answer: "Ведение контента сообщества начинается от 15 000 ₽ в месяц. Ведение рекламы VK Ads — от 30 000 ₽ в месяц. Рекламный бюджет оплачивается отдельно. До старта фиксируем состав работ и способ учёта заявок.",
    },
    {
      question: "Что входит в ведение VK Ads?",
      answer: "Аудит сообщества и точки заявки, структура кампаний, аудитории, объявления и креативы, UTM-разметка, запуск, проверка событий, оптимизация и отчёт по расходам, обращениям и качеству лидов.",
    },
    {
      question: "Можно продвигать только сообщество, без сайта?",
      answer: "Да, если сообщение сообщества или лид-форма закрывают путь заявки. Если услугу нужно подробно объяснить, сравнить варианты или измерить действия на странице, подключаем сайт или отдельный лендинг.",
    },
    {
      question: "Вы гарантируете количество заявок?",
      answer: "Нет. До запуска нельзя честно гарантировать объём или стоимость заявок. Мы можем гарантировать согласованный объём работ, корректную разметку, контроль отправки обращения и прозрачный отчёт по фактическим данным.",
    },
    {
      question: "Как понять, что заявка действительно пришла из VK?",
      answer: "Для сайта используем UTM-метки и события аналитики, для лид-форм и сообщений — данные рекламного кабинета и учёт обращений. Итог сверяем с CRM или журналом лидов, потому что отправка формы ещё не означает квалифицированную заявку.",
    },
  ];

  useFaqSchema(faqItems);
  useAutoBreadcrumb("Продвижение ВКонтакте");
  useServiceSchema({
    name: "Комплексное продвижение ВКонтакте в Тюмени",
    description: "Продвижение бизнеса ВКонтакте: сообщество, контент, VK Ads, UTM, аналитика и контроль заявок.",
    price: "15000",
  });

  const stages = [
    { icon: FileSearch, title: "Аудит", text: "Проверяем оффер, сообщество, посадочную, форму, сообщения и текущую аналитику." },
    { icon: Target, title: "Сценарий заявки", text: "Выбираем действие: сообщение, лид-форма, звонок или заявка на сайте." },
    { icon: Megaphone, title: "Запуск", text: "Собираем кампании, аудитории, объявления, креативы и UTM-разметку." },
    { icon: BarChart3, title: "Контроль", text: "Сверяем расходы, обращения, квалификацию и следующие решения по кампании." },
  ];

  return (
    <Layout
      title="Продвижение ВКонтакте в Тюмени от 15 000 ₽ | CentrLP"
      description="Комплексное продвижение бизнеса ВКонтакте в Тюмени: оформление сообщества, контент, VK Ads, UTM, аналитика и контроль заявок. От 15 000 ₽."
    >
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold">
              <Users className="w-4 h-4" />
              <span>Сообщество → реклама → заявка</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Комплексное продвижение ВКонтакте в Тюмени
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Собираем связку из сообщества, контента, VK Ads и аналитики. Цель — не отчёт по охватам,
              а понятный маршрут обращения: от объявления до сообщения, формы, звонка или заявки в CRM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Контент — от 15 000 ₽/мес</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> VK Ads — от 30 000 ₽/мес</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg"><Link to="?intent=vk-complex#contact">Обсудить продвижение <ArrowRight className="ml-2" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/blog/prodvizhenie-biznesa-vkontakte">Что входит в комплекс</Link></Button>
            </div>
            <p className="text-sm text-muted-foreground mt-5">Рекламный бюджет оплачивается отдельно. Объём работ фиксируется до старта.</p>
          </div>
        </div>
      </section>

      <ServiceImageBand slug="vk-ads" alt="Продвижение ВКонтакте: сообщество, реклама, аналитика и заявки" />

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Что входит в комплексное продвижение</h2>
            <p className="text-lg text-muted-foreground">Набор каналов зависит от задачи. Не подключаем контент, рекламу или бота только ради количества работ.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stages.map(({ icon: Icon, title, text }) => (
              <Card key={title}><CardContent className="p-6"><Icon className="w-9 h-9 text-primary mb-4" /><h3 className="font-bold text-xl mb-2">{title}</h3><p className="text-muted-foreground">{text}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-10">Два формата работы</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><CardContent className="p-7"><MessageSquare className="w-9 h-9 text-primary mb-4" /><h3 className="text-2xl font-bold mb-3">Контент и сообщество</h3><p className="text-3xl font-bold mb-4">от 15 000 ₽/мес</p><ul className="space-y-2 text-muted-foreground"><li>Оффер и точки входа</li><li>Контент-план и публикации</li><li>Переходы в сообщения или на сайт</li><li>Единая UTM-разметка ссылок</li></ul><Button asChild className="mt-6 w-full"><Link to="?intent=vk-content#contact">Обсудить ведение сообщества</Link></Button></CardContent></Card>
            <Card><CardContent className="p-7"><Megaphone className="w-9 h-9 text-primary mb-4" /><h3 className="text-2xl font-bold mb-3">Ведение VK Ads</h3><p className="text-3xl font-bold mb-4">от 30 000 ₽/мес</p><ul className="space-y-2 text-muted-foreground"><li>Структура кампаний и аудиторий</li><li>Объявления и креативные гипотезы</li><li>UTM, события и контрольная заявка</li><li>Оптимизация по фактическим данным</li></ul><p className="text-sm text-muted-foreground mt-4">Медиабюджет не входит в стоимость ведения.</p><Button asChild className="mt-6 w-full"><Link to="?intent=vk-ads#contact">Обсудить ведение VK Ads</Link></Button></CardContent></Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Как принимается работа</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "У каждого объявления понятна аудитория и целевое действие",
              "Ссылки размечены UTM и открывают нужную страницу",
              "Форма, сообщение или звонок проверены контрольным обращением",
              "Отчёт отделяет клики и отправки от квалифицированных заявок",
              "Рекламный расход и стоимость обращения считаются по одному периоду",
              "Следующие решения опираются на данные, а не на обещанный результат",
            ].map((item) => <div key={item} className="flex gap-3 bg-background rounded-lg p-4"><CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span>{item}</span></div>)}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Частые вопросы</h2>
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => <AccordionItem key={item.question} value={`item-${index}`}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent>{item.answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-3">Разобрать продвижение ВКонтакте</h2><p className="text-muted-foreground">Укажите нишу, регион, текущую площадку и куда должна приходить заявка. Предложим формат без гарантии недоказуемых цифр.</p></div>
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default VKAds;
