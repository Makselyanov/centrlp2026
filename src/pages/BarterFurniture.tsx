import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Ruler, Palette, Package } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const BarterFurniture = () => {
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
            <source src="/assets/furniture-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Home className="w-20 h-20 text-primary mx-auto mb-6 drop-shadow-lg" />
            <h1 className="mb-6 text-white drop-shadow-md">Бартер-пакет для мебельного производства</h1>
            <p className="text-xl text-gray-200 mb-8 drop-shadow-md">
              Вы делаете мебель для нас, мы делаем для вас сайт-портфолио, квиз «Рассчитать кухню»
              и настраиваем рекламу по запросам «кухня на заказ»
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
                <h3 className="font-bold mb-2">Поток заявок</h3>
                <p className="text-sm text-gray-200">
                  Настроенная реклама приносит целевые заявки на изготовление мебели
                </p>
              </Card>
              <Card className="p-6 text-center bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Продающий сайт</h3>
                <p className="text-sm text-gray-200">
                  Портфолио с вашими работами, калькулятор стоимости и формы приёма заказов
                </p>
              </Card>
              <Card className="p-6 text-center bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Договор и прозрачность</h3>
                <p className="text-sm text-gray-200">
                  Официальное оформление, чёткие этапы, взаимозачёт по акту
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Какую мебель нам нужно */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Какая мебель нам нужна</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ищем качественное изготовление мебели под конкретные задачи
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 shadow-card">
              <Home className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Кухонный гарнитур</h3>
              <p className="text-muted-foreground mb-4">
                Нужна функциональная кухня под размеры помещения: нижние и верхние модули,
                столешница, встроенная техника. Предпочтительны практичные материалы и современный дизайн.
              </p>
              <p className="text-sm text-muted-foreground">
                Готовы обсудить варианты фасадов, фурнитуры и комплектации.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Ruler className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Шкаф-купе или гардеробная</h3>
              <p className="text-muted-foreground mb-4">
                Требуется вместительная система хранения с продуманной внутренней организацией:
                полки, штанги, ящики. Важна надёжность механизмов и качество сборки.
              </p>
              <p className="text-sm text-muted-foreground">
                Можем рассмотреть как встроенный шкаф-купе, так и отдельностоящую конструкцию.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Package className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Рабочий стол и стеллажи</h3>
              <p className="text-muted-foreground mb-4">
                Для офиса нужны удобные рабочие столы и открытые стеллажи для хранения документов и оборудования.
                Предпочтительны простые и надёжные конструкции.
              </p>
              <p className="text-sm text-muted-foreground">
                Готовы обсудить размеры и конфигурацию под планировку помещения.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Palette className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Другие предметы мебели</h3>
              <p className="text-muted-foreground mb-4">
                Возможны варианты: комод, прихожая, детская мебель, мебель для ванной.
                Открыты к предложениям в зависимости от вашей специализации.
              </p>
              <p className="text-sm text-muted-foreground">
                Главное — качество исполнения и соответствие современным стандартам.
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
              Полный комплекс маркетинговых услуг для развития мебельного бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Сайт-портфолио с вашими работами</h3>
              <p className="text-muted-foreground">
                Создам современный сайт с галереей ваших проектов, описаниями услуг и ценами.
                Качественная презентация работ повышает доверие клиентов и помогает принять решение о заказе.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Квиз «Рассчитать кухню/шкаф»</h3>
              <p className="text-muted-foreground">
                Интерактивный калькулятор: клиент выбирает размеры, материалы, фурнитуру —
                получает примерную стоимость и оставляет контакты. Это значительно повышает конверсию сайта.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">ИИ-бот по материалам и срокам</h3>
              <p className="text-muted-foreground">
                Настрою чат-бота, который отвечает на типовые вопросы клиентов о материалах,
                сроках изготовления, доставке. Работает 24/7 и разгружает ваш телефон.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Реклама по целевым запросам</h3>
              <p className="text-muted-foreground">
                Запущу рекламу в Яндекс Директ по запросам вроде «кухня на заказ Тюмень»,
                «шкаф-купе на заказ», «мебель по индивидуальным размерам».
                Оптимизация под заявки, а не просто клики.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Геотаргетинг по районам</h3>
              <p className="text-muted-foreground">
                Настрою показ рекламы по конкретным районам города или региону,
                где работает ваша мебельная компания. Это снижает бюджет и повышает качество трафика.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Оформление группы ВКонтакте</h3>
              <p className="text-muted-foreground">
                Создам обложку, меню, описание, разделы с портфолио и отзывами.
                ВК — важный канал для мебельщиков, так как клиенты ищут примеры работ и читают отзывы.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Веб-аналитика и отчёты</h3>
              <p className="text-muted-foreground">
                Подключу Яндекс.Метрику, настрою цели (заявки, звонки, заполнение квиза).
                Вы будете видеть, сколько заявок приходит, откуда и по какой цене.
              </p>
            </Card>
          </div>

          <div className="bg-accent-1/10 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <h3 className="font-bold text-xl mb-4">Рекламный бюджет оплачиваете вы</h3>
            <p className="text-muted-foreground">
              Бартер распространяется только на работу агентства (сайт, квиз, боты, настройка рекламы)
              и изготовление мебели. Бюджет на клики и показы в Яндекс Директ оплачивает заказчик отдельно.
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
                и эквивалент в виде мебели. Например, за пакет на 80 000 ₽ вы изготавливаете кухню или шкаф на эту же сумму.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <h3 className="font-bold text-lg mb-3">Договор и этапы</h3>
              <p className="text-muted-foreground">
                Подписываем договор с перечнем работ и сроков. Работы идут параллельно:
                я делаю сайт и рекламу, вы — мебель. После завершения оформляем акт взаимозачёта.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <h3 className="font-bold text-lg mb-3">Смешанный формат</h3>
              <p className="text-muted-foreground">
                Возможен вариант частичного бартера: часть работ по бартеру, часть за деньги.
                Это удобно, если объёмы не совпадают или нужны дополнительные услуги.
              </p>
            </Card>

            <Card className="p-8 shadow-card bg-accent-2/5">
              <h3 className="font-bold text-lg mb-3">Пример бартерного пакета</h3>
              <p className="text-muted-foreground mb-4">
                За изготовление <strong>кухонного гарнитура или шкафа-купе</strong> стоимостью ~80 000 ₽
                вы получаете:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Сайт-портфолио с галереей работ</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Квиз «Рассчитать кухню/шкаф»</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>ИИ-бот для ответов на вопросы</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Настройку Яндекс Директ</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Оформление ВКонтакте</span>
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
                Расскажите о своём мебельном производстве — обсудим возможность сотрудничества
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BarterFurniture;
