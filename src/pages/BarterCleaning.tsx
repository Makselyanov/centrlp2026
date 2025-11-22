import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, Calculator, Calendar, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const BarterCleaning = () => {
  return (
    <Layout>
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/cleaning-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-20 h-20 text-primary mx-auto mb-6 drop-shadow-lg" />
            <h1 className="mb-6 text-white drop-shadow-md">Бартер-пакет для клининговых компаний</h1>
            <p className="text-xl text-gray-200 mb-8 drop-shadow-md">
              Вы делаете уборку наших помещений, мы делаем для вас сайт с калькулятором,
              ИИ-бот для расчёта и настраиваем ретаргет ВК и РСЯ
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="shadow-lg animate-pulse-gentle bg-primary hover:bg-primary/90 text-white border-none"
                onClick={() => {
                  const element = document.getElementById('form');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Оставить заявку на бартер
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => {
                  const element = document.getElementById('benefits');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Что вы получаете
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="p-6 text-center bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Больше заказов</h3>
                <p className="text-sm text-gray-200">
                  Настроенная реклама и калькулятор на сайте привлекают целевых клиентов
                </p>
              </Card>
              <Card className="p-6 text-center bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Автоматизация</h3>
                <p className="text-sm text-gray-200">
                  ИИ-бот считает площадь, подбирает услуги и принимает заявки круглосуточно
                </p>
              </Card>
              <Card className="p-6 text-center bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Прозрачный обмен</h3>
                <p className="text-sm text-gray-200">
                  Договор, чёткие этапы, взаимозачёт — всё по-честному
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Какие услуги клининга нам нужны */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Какие услуги клининга нам нужны</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ищем регулярную и качественную уборку офисных и жилых помещений
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 shadow-card">
              <Sparkles className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Поддерживающая уборка офиса</h3>
              <p className="text-muted-foreground mb-4">
                Регулярная уборка офисного помещения (1–2 раза в неделю): протирка пыли,
                мытьё полов, уборка санузлов, вынос мусора. Площадь до 50–70 кв.м.
              </p>
              <p className="text-sm text-muted-foreground">
                Предпочтительны фиксированные дни недели для стабильности.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Calculator className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Генеральная уборка квартиры</h3>
              <p className="text-muted-foreground mb-4">
                Комплексная уборка жилого помещения: мытьё окон, уборка всех поверхностей,
                санузлов, кухни. Возможно разовая или несколько раз в год.
              </p>
              <p className="text-sm text-muted-foreground">
                Готовы обсудить периодичность и объём работ.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Calendar className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Уборка после ремонта</h3>
              <p className="text-muted-foreground mb-4">
                При необходимости — уборка помещения после строительных или отделочных работ:
                удаление строительной пыли, очистка поверхностей, мытьё окон.
              </p>
              <p className="text-sm text-muted-foreground">
                Обсуждаем объём и сложность индивидуально.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Дополнительные услуги</h3>
              <p className="text-muted-foreground mb-4">
                Возможны дополнительные услуги: химчистка мебели, мытьё фасадов кухни,
                уход за растениями в офисе. Всё зависит от вашего прайса и возможностей.
              </p>
              <p className="text-sm text-muted-foreground">
                Готовы обсудить комплексный пакет услуг.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Что вы получаете от CentrLP */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Что вы получаете от CentrLP</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Полный комплекс маркетинговых услуг для развития клининговой компании
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Сайт с калькулятором уборки</h3>
              <p className="text-muted-foreground">
                Создам современный лендинг с интерактивным калькулятором: клиент выбирает тип уборки,
                площадь помещения, дополнительные услуги — получает цену и оставляет заявку.
                Это значительно упрощает процесс заказа.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">ИИ-бот для расчёта площади и графика</h3>
              <p className="text-muted-foreground">
                Настрою чат-бота, который задаёт клиенту вопросы (тип помещения, площадь, частота уборки),
                рассчитывает примерную стоимость и записывает на удобное время. Работает 24/7.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Ретаргет ВКонтакте</h3>
              <p className="text-muted-foreground">
                Настрою рекламу ВКонтакте для тех, кто уже заходил на ваш сайт, но не оставил заявку.
                Ретаргетинг возвращает «тёплых» клиентов и увеличивает конверсию.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Реклама в РСЯ (Рекламная сеть Яндекса)</h3>
              <p className="text-muted-foreground">
                Запущу баннерную рекламу в РСЯ с таргетингом на аудиторию, интересующуюся клининговыми услугами.
                Охват шире, чем в поисковой рекламе, стоимость клика ниже.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Яндекс Директ по целевым запросам</h3>
              <p className="text-muted-foreground">
                Настрою поисковую рекламу по запросам вроде «клининг Тюмень», «уборка квартир»,
                «генеральная уборка». Оптимизация под заявки, отслеживание звонков.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Оформление группы ВКонтакте</h3>
              <p className="text-muted-foreground">
                Создам обложку, меню, описание услуг, блоки с ценами и отзывами.
                ВК — важный канал для клининговых компаний, многие клиенты ищут отзывы именно там.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Веб-аналитика и отчёты</h3>
              <p className="text-muted-foreground">
                Подключу Яндекс.Метрику, настрою цели (заявки, звонки, расчёт в калькуляторе).
                Вы будете видеть количество заявок, стоимость привлечения клиента и эффективность каналов.
              </p>
            </Card>
          </div>

          <div className="bg-accent-1/10 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <h3 className="font-bold text-xl mb-4">Рекламный бюджет оплачиваете вы</h3>
            <p className="text-muted-foreground">
              Бартер распространяется только на работу агентства (сайт, боты, настройка рекламы)
              и выполнение клининговых услуг. Бюджет на клики и показы в Яндекс Директ, ВК и РСЯ
              оплачивает клининговая компания отдельно.
            </p>
          </div>
        </div>
      </section>

      {/* Формат сотрудничества */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Формат сотрудничества</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Прозрачные условия и чёткие этапы работы
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-8 shadow-card">
              <h3 className="font-bold text-lg mb-3">Оценка стоимости</h3>
              <p className="text-muted-foreground">
                Считаем стоимость маркетинговых услуг по прайсу (обычно 60 000 – 100 000 ₽)
                и эквивалент в клининговых услугах. Например, за пакет на 80 000 ₽ вы проводите уборки на эту же сумму.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <h3 className="font-bold text-lg mb-3">Договор и график</h3>
              <p className="text-muted-foreground">
                Подписываем договор с перечнем работ, сроками и графиком уборок.
                Работы идут параллельно: я делаю сайт и рекламу, вы — уборку согласно графику.
                После завершения оформляем акт взаимозачёта.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <h3 className="font-bold text-lg mb-3">Регулярность</h3>
              <p className="text-muted-foreground">
                Возможны варианты: разовые генеральные уборки или регулярный график
                (еженедельные/ежемесячные уборки офиса или квартиры). Всё зависит от объёма работ с обеих сторон.
              </p>
            </Card>

            <Card className="p-8 shadow-card bg-accent-2/5">
              <h3 className="font-bold text-lg mb-3">Пример бартерного пакета</h3>
              <p className="text-muted-foreground mb-4">
                За регулярную уборку офиса (2 раза в неделю в течение 6 месяцев)
                стоимостью ~80 000 ₽ вы получаете:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Лендинг с калькулятором стоимости уборки</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>ИИ-бот для расчёта и записи</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Настройку Яндекс Директ и РСЯ</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ретаргет ВКонтакте</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Оформление группы ВКонтакте</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Форма заявки */}
      <section id="form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Оставьте заявку на бартер</h2>
              <p className="text-lg text-muted-foreground">
                Расскажите о своей клининговой компании — обсудим возможность сотрудничества
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BarterCleaning;
