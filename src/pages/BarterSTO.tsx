import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Car, Shield, Music, Camera, Droplet, Wrench, TrendingUp } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import heroBackground from "@/assets/barter-sto-hero.png";
import vkAnalytics from "@/assets/vk-analytics.png";
import vkMessages from "@/assets/vk-messages.png";

const BarterSTO = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${heroBackground})`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <Car className="w-20 h-20 text-primary mx-auto mb-6 animate-scale-in" />
              <h1 className="mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Продвижение вашего автосервиса в обмен на услуги по моему авто
              </h1>
              <p className="text-xl text-gray-100 mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Вы прокачиваете мою машину (ГБО, тонировка, плёнка, автозвук, камеры, антикор), 
                я прокачиваю ваш автосервис (сайт, реклама, заявки)
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="shadow-elegant hover-scale">
                  <a href="#form">Оставить заявку на бартер</a>
                </Button>
                <Button variant="outline" size="lg" className="hover-scale bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <a href="#benefits">Что вы получаете</a>
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center shadow-card hover-scale animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CheckCircle2 className="w-12 h-12 text-accent-2 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Больше клиентов</h3>
                <p className="text-sm text-muted-foreground">
                  Настроенная реклама приносит целевые заявки на ваши услуги
                </p>
              </Card>
              <Card className="p-6 text-center shadow-card hover-scale animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CheckCircle2 className="w-12 h-12 text-accent-2 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Сильный сайт и реклама</h3>
                <p className="text-sm text-muted-foreground">
                  Продающий лендинг с квизом и грамотной структурой под поисковые запросы
                </p>
              </Card>
              <Card className="p-6 text-center shadow-card hover-scale animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CheckCircle2 className="w-12 h-12 text-accent-2 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Прозрачные условия</h3>
                <p className="text-sm text-muted-foreground">
                  Договор, чёткие этапы и взаимозачёт без лишней бюрократии
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Как работает бартер */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Как работает бартер</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Простая и понятная схема сотрудничества — от заявки до получения результата
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2 text-sm">Заявка</h3>
              <p className="text-xs text-muted-foreground">
                Вы оставляете заявку и описываете свои услуги: ГБО, тонировка, плёнка, автозвук, камеры, антикор
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2 text-sm">Оценка</h3>
              <p className="text-xs text-muted-foreground">
                Я оцениваю объём работ по вашей СТО: сайт, квиз, реклама, оформление ВК
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2 text-sm">Согласование</h3>
              <p className="text-xs text-muted-foreground">
                Согласовываем эквивалент по стоимости работ с обеих сторон
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2 text-sm">Договор</h3>
              <p className="text-xs text-muted-foreground">
                Подписываем договор и поэтапно выполняем работы
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                5
              </div>
              <h3 className="font-bold mb-2 text-sm">Результат</h3>
              <p className="text-xs text-muted-foreground">
                Вы получаете клиентов, я получаю прокачанную машину
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Какие услуги СТО мне интересны */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Какие услуги СТО мне интересны</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Владею Mitsubishi Pajero 2 и хочу установить следующие системы и улучшения
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 shadow-card">
              <Wrench className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Установка ГБО в Тюмени</h3>
              <p className="text-muted-foreground mb-4">
                Нужна установка газобаллонного оборудования для экономии на топливе. 
                Интересует надёжная система 4-го поколения с гарантией и качественным монтажом.
              </p>
              <p className="text-sm text-muted-foreground">
                Готов обсуждать выбор конкретного оборудования и дополнительные работы в рамках бартерной сделки.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Тонировка стёкол</h3>
              <p className="text-muted-foreground mb-4">
                Качественная тонировка задних и боковых стёкол в соответствии с ГОСТом. 
                Важна аккуратность работы и использование проверенных материалов.
              </p>
              <p className="text-sm text-muted-foreground">
                Можем обсудить различные варианты плёнок и степень затемнения.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Оклейка защитной/декоративной плёнкой</h3>
              <p className="text-muted-foreground mb-4">
                Защитная плёнка на капот, фары, пороги или полная оклейка кузова. 
                Интересуют долговечные материалы и качественная установка.
              </p>
              <p className="text-sm text-muted-foreground">
                Возможны варианты как защиты отдельных элементов, так и изменения цвета кузова.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Music className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Установка автозвука</h3>
              <p className="text-muted-foreground mb-4">
                Нужна установка качественной аудиосистемы: магнитола, динамики, возможно усилитель и сабвуфер. 
                Важен хороший звук без искажений.
              </p>
              <p className="text-sm text-muted-foreground">
                Готов обсудить конфигурацию системы и бюджет на комплектующие.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Camera className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Камеры кругового обзора и парктроники</h3>
              <p className="text-muted-foreground mb-4">
                Установка системы кругового обзора (360°) или отдельных камер переднего/заднего вида. 
                Парковочные датчики для безопасной парковки.
              </p>
              <p className="text-sm text-muted-foreground">
                Интересуют системы с выводом на штатный или дополнительный экран.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <Droplet className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-bold text-xl mb-3">Антикоррозийная обработка</h3>
              <p className="text-muted-foreground mb-4">
                Обработка кузова и днища антикором для защиты от коррозии. 
                Особенно актуально для Pajero 2 с учётом зимних условий эксплуатации в Тюмени.
              </p>
              <p className="text-sm text-muted-foreground">
                Готов обсудить различные типы покрытий и комплексную обработку скрытых полостей.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Что вы получаете от CentrLP */}
      <section id="benefits" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Что вы получаете от CentrLP</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Полный комплекс маркетинговых услуг для развития вашего автосервиса — от создания сайта до привлечения клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Продающий сайт или лендинг</h3>
              <p className="text-muted-foreground">
                Создам сайт под ваши реальные услуги: ГБО, тонировка, плёнка, автозвук, антикор. 
                С правильной структурой, убедительными текстами и призывами к действию. 
                Сайт будет заточен под конверсию посетителей в заявки.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Грамотное семантическое ядро и SEO</h3>
              <p className="text-muted-foreground">
                Подберу ключевые запросы, по которым ищут ваши услуги в Тюмени и области. 
                Структурирую сайт так, чтобы Яндекс понимал, за что вас показывать. 
                Базовая SEO-оптимизация для органического трафика.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Настройка Яндекс Директ</h3>
              <p className="text-muted-foreground">
                Запущу рекламные кампании с оптимизацией под заявки, а не просто клики. 
                Подберу эффективные связки ключей и объявлений. 
                Настрою отслеживание конверсий и буду улучшать показатели.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Квиз и формы под ваши сценарии</h3>
              <p className="text-muted-foreground">
                Создам интерактивный квиз для приёма заявок: выбор услуги, марка авто, контакты. 
                Это повышает конверсию и помогает клиенту быстро оставить заявку на нужную услугу.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Адаптация под мобильный трафик</h3>
              <p className="text-muted-foreground">
                Большинство клиентов СТО ищут услуги со смартфонов. 
                Сайт будет корректно работать на всех устройствах, с удобными кнопками звонка и форм.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Оформление группы ВКонтакте</h3>
              <p className="text-muted-foreground">
                Создам обложку, настрою меню и кнопки, оформлю описание и разделы. 
                ВК — важный канал для локального бизнеса, клиенты часто ищут отзывы именно там.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <CheckCircle2 className="w-10 h-10 text-accent-2 mb-4" />
              <h3 className="font-bold text-xl mb-3">Базовая воронка и отчёты</h3>
              <p className="text-muted-foreground">
                Настрою путь: реклама → сайт/квиз → заявки → отчёты. 
                Подключу Яндекс.Метрику, цели, чтобы видеть, сколько заявок приходит и откуда. 
                Вы будете понимать эффективность каждого канала.
              </p>
            </Card>
          </div>

          <div className="bg-accent-1/10 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <h3 className="font-bold text-xl mb-4">Рекламный бюджет оплачиваете вы</h3>
            <p className="text-muted-foreground">
              Бартер распространяется только на работы агентства (создание сайта, настройка рекламы, оформление ВК) 
              и работы СТО (установка ГБО, тонировка, плёнка и т.д.). 
              Деньги на клики и показы в Яндекс Директ и других рекламных системах оплачивает автосервис отдельно — 
              это стандартная практика, как и в обычных коммерческих проектах.
            </p>
          </div>
        </div>
      </section>

      {/* Формат сотрудничества */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Формат сотрудничества и ограничения</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Простые и понятные условия для честного бартера
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-8 shadow-card">
              <h3 className="font-bold text-lg mb-3">Регион работы</h3>
              <p className="text-muted-foreground">
                Приоритетно работаю с автосервисами в Тюмени и ближайших городах. 
                Для удалённых регионов возможен бартер, но потребуется обсудить логистику работ по автомобилю.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <h3 className="font-bold text-lg mb-3">Сопоставимая стоимость работ</h3>
              <p className="text-muted-foreground">
                Бартер возможен при примерно равной стоимости услуг с обеих сторон. 
                Например, за пакет «сайт + квиз + настройка Директа» стоимостью 80 000 ₽ 
                вы выполняете работы по моему авто на эквивалентную сумму.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <h3 className="font-bold text-lg mb-3">Смешанный формат</h3>
              <p className="text-muted-foreground">
                Возможен вариант, когда часть работ идёт по бартеру, а часть — за деньги. 
                Это удобно, если объёмы не совпадают идеально или нужны дополнительные услуги.
              </p>
            </Card>

            <Card className="p-8 shadow-card">
              <h3 className="font-bold text-lg mb-3">Согласование работ по авто</h3>
              <p className="text-muted-foreground">
                Все работы по машине (выбор оборудования, материалов, сроки) обсуждаются и согласуются заранее поэтапно. 
                Я не требую сделать всё сразу — можем растянуть на несколько этапов в зависимости от готовности проекта с моей стороны.
              </p>
            </Card>

            <Card className="p-8 shadow-card bg-accent-2/5">
              <h3 className="font-bold text-lg mb-3">Пример бартерного пакета</h3>
              <p className="text-muted-foreground mb-4">
                За комплекс работ <strong>«ГБО + антикор + тонировка»</strong> стоимостью ~80 000 ₽ 
                вы получаете от меня:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Продающий лендинг для СТО (5–7 страниц)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Квиз для приёма заявок онлайн</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Настройку Яндекс Директ (первичный запуск)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Оформление группы ВКонтакте</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Базовую веб-аналитику (Метрика, цели)</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Результаты и опыт */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Результаты и опыт</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Работаю с локальным бизнесом с 2011 года. Есть реальные кейсы роста, часть под NDA
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="p-8 shadow-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">14+ лет</div>
              <p className="text-muted-foreground">
                Работаю с бизнесом с 2011 года. Прошёл путь от фрилансера до собственного агентства.
              </p>
            </Card>

            <Card className="p-8 shadow-card text-center">
              <div className="text-4xl font-bold text-primary mb-2">Локальный маркетинг</div>
              <p className="text-muted-foreground">
                Специализация на локальном бизнесе: сайты + реклама под региональные запросы
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 shadow-card">
              <h3 className="font-bold mb-3">Кейс 1: Рост заявок ×2</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Мебельная компания, Тюмень. После запуска нового сайта и рекламы количество заявок выросло в 2 раза за 2 месяца.
              </p>
              <div className="text-xs text-muted-foreground">
                Детали кейса под NDA
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="font-bold mb-3">Кейс 2: Снижение CPL на 40%</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Клининговая компания. Оптимизация семантики и объявлений снизила стоимость заявки с 850 до 510 рублей.
              </p>
              <div className="text-xs text-muted-foreground">
                Детали кейса под NDA
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="font-bold mb-3">Кейс 3: Запуск с нуля</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Салон красоты. Создали сайт, ВК, запустили рекламу — первые 15 записей пришли в первую неделю.
              </p>
              <div className="text-xs text-muted-foreground">
                Детали кейса под NDA
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Детальный кейс: детейлинг-центр */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="mb-4">Кейс: как мы за год превратили СТО в магнит для заявок из VK Рекламы</h2>
              <p className="text-lg text-muted-foreground">
                Работа по бартеру. Клиент — детейлинг-центр, полный цикл работ: керамика, оклейка, шумка, ремонт, кузовщина.
              </p>
            </div>

            <Card className="p-8 md:p-12 shadow-card mb-8">
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-bold text-xl text-foreground mb-3">Задача клиента</h3>
                  <p>
                    Клиент пришёл с нормальным, живым запросом: <strong>«Нужны заявки. Хотим стабильность, а не рывками»</strong>.
                  </p>
                  <p className="mt-2">
                    Точка входа была такая: реклама как будто есть, но система не работает. 
                    Заявки хаотичные, неструктурированные, льётся мимо.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-foreground mb-3">Что сделали</h3>
                  <p className="mb-4">За год мы закрыли весь digital под ключ:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-3 flex-shrink-0 mt-0.5" />
                      <span>создали новую матрицу рекламных кампаний по направлениям (2–4 слоя керамики, оклейка, кузовной ремонт, детейлинг, шумка);</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-3 flex-shrink-0 mt-0.5" />
                      <span>настроили и вели VK Ads под CPL, фактически перезапустили всю рекламу;</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-3 flex-shrink-0 mt-0.5" />
                      <span>оттестировали связки офферов и креативов, чтобы рынок наконец начал реагировать;</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-3 flex-shrink-0 mt-0.5" />
                      <span>сделали автоворонки в сообщениях, чтобы ни один входящий не уходил «в пустоту»;</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-3 flex-shrink-0 mt-0.5" />
                      <span>написали тексты, оформили структуру сообщений, добавили быстрые ответы;</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-3 flex-shrink-0 mt-0.5" />
                      <span>проводили аналитику по каждому сегменту и корректировали кампании под живой спрос.</span>
                    </li>
                  </ul>
                  <p className="mt-4 font-medium text-foreground">
                    Клиент работал по машине.<br />
                    Мы работали по клиентам.
                  </p>
                </div>

                <div className="bg-accent-2/5 rounded-xl p-6">
                  <h3 className="font-bold text-xl text-foreground mb-4">📌 Результат</h3>
                  <p className="mb-3">
                    Скриншоты показывают только крошечную часть входящих. Фактически это:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                      <span>стабильные ежедневные заявки;</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                      <span>живые вопросы по керамике 2–4 слоя;</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                      <span>запросы по оклейке, шумоизоляции, детейлингу;</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                      <span>записи на осмотр, консультации, расчёт стоимости;</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent-2 mr-2 flex-shrink-0 mt-0.5" />
                      <span>диалоги, где клиент уже готов ехать.</span>
                    </li>
                  </ul>
                  <p className="mt-4 font-bold text-foreground text-lg">
                    Это не всплески. Это постоянство.<br />
                    12 месяцев подряд.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-foreground mb-3">📌 Почему получилось</h3>
                  <p>
                    Потому что мы не занимаемся «красивыми словами» о маркетинге. 
                    Мы копаем до живого оффера, строим систему и доводим её до результата.
                  </p>
                </div>
              </div>
            </Card>

            {/* Скриншоты результатов */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="overflow-hidden shadow-card hover-scale">
                <div className="p-4 bg-accent-1/10">
                  <h4 className="font-semibold text-center">Аналитика кампании VK Рекламы</h4>
                </div>
                <img 
                  src={vkAnalytics} 
                  alt="Статистика VK Рекламы - 15 конверсий, 104 клика, CTR 0.24%" 
                  className="w-full"
                />
              </Card>

              <Card className="overflow-hidden shadow-card hover-scale">
                <div className="p-4 bg-accent-1/10">
                  <h4 className="font-semibold text-center">Входящие сообщения от клиентов</h4>
                </div>
                <img 
                  src={vkMessages} 
                  alt="Скриншот входящих сообщений ВКонтакте с запросами на керамику, оклейку и детейлинг" 
                  className="w-full"
                />
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-6">
                Хотите такие же стабильные результаты для вашего автосервиса?
              </p>
              <Button size="lg" className="shadow-elegant hover-scale">
                <a href="#form">Обсудить бартер</a>
              </Button>
            </div>
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
                Расскажите о своём автосервисе и услугах — обсудим возможность сотрудничества
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BarterSTO;
