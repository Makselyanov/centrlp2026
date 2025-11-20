import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, FileText, Handshake } from "lucide-react";

const Barter = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Handshake className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="mb-6">Бартер-пакеты по нишам</h1>
            <p className="text-xl text-muted-foreground">
              Обмениваем маркетинговые услуги на вашу продукцию или сервис. Работаем по договору,
              прозрачно и с конкретными сроками.
            </p>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Как работает бартер</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Взаимозачёт услуг — это не про «давай как-нибудь». Это полноценный договор с чёткими
              обязательствами с обеих сторон.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Оцениваем</h3>
              <p className="text-sm text-muted-foreground">
                Считаем стоимость наших услуг по прайсу и эквивалент в ваших товарах/услугах
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">Договор</h3>
              <p className="text-sm text-muted-foreground">
                Подписываем договор с перечнем работ, сроками и порядком взаимозачёта
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Работаем</h3>
              <p className="text-sm text-muted-foreground">
                Делаем всё по плану: сайт, ВК, чат-боты, реклама — как обычный коммерческий проект
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">Взаимозачёт</h3>
              <p className="text-sm text-muted-foreground">
                После сдачи работ оформляем акт взаимозачёта — вы поставляете свои товары/услуги
              </p>
            </Card>
          </div>

          <div className="bg-accent-1/10 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex items-start mb-4">
              <AlertCircle className="w-6 h-6 text-accent-1 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Важное условие</h3>
                <p className="text-muted-foreground">
                  Эквивалентная стоимость пакета от 80 000 ₽. Если ваши товары/услуги дешевле —
                  возможна частичная оплата деньгами, частичная бартером. Обсуждается индивидуально.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Готовые пакеты */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Готовые бартер-пакеты по нишам</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Адаптируем стандартный пакет под особенности вашей ниши
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Мебельщики */}
            <Card className="p-8 shadow-card bg-card">
              <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Для мебельщиков</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">80 000 ₽</span>
                <p className="text-sm text-muted-foreground">эквивалент в бартере</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">Что делаем:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Сайт-портфолио на Tilda (7–10 страниц)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Квиз «Рассчитать кухню» с интеграцией в CRM</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>ИИ-бот для консультаций по материалам и срокам</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Оформление ВКонтакте: обложка, меню, каталог, закреп</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Запуск рекламы Директ по запросам «кухня на заказ Тюмень»</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Таргет ВК на районы города (новостройки, частный сектор)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Настройка Метрики, целей, отчётов</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Что получаете вы:</h4>
                <p className="text-sm text-muted-foreground">
                  Кухонный гарнитур или комплект корпусной мебели на эквивалентную сумму 80 000 ₽.
                  Материалы и конфигурацию обсуждаем.
                </p>
              </div>

              <a href="/#form">
                <Button className="w-full">Обсудить бартер</Button>
              </a>
            </Card>

            {/* СТО */}
            <Card className="p-8 shadow-card bg-card">
              <div className="bg-accent-1/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="hsl(var(--accent-1))" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Для СТО и детейлинга</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">80 000 ₽</span>
                <p className="text-sm text-muted-foreground">эквивалент в бартере</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">Что делаем:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Сайт с квизом «записаться / рассчитать стоимость»</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Упаковка ВК: портфолио до/после, отзывы, каталог услуг</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>ИИ-бот с автоответами и записью на услугу</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Чат-бот ВКонтакте для консультаций 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Реклама Директ по маркам авто и видам работ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Таргет ВК на владельцев премиальных авто</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ретаргетинг на посетителей сайта</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Что получаете вы:</h4>
                <p className="text-sm text-muted-foreground">
                  Комплекс услуг детейлинга / полировка кузова / химчистка / керамика на сумму
                  80 000 ₽. Перечень работ обсуждаем.
                </p>
              </div>

              <a href="/#form">
                <Button className="w-full">Обсудить бартер</Button>
              </a>
            </Card>

            {/* Клининг */}
            <Card className="p-8 shadow-card bg-card">
              <div className="bg-accent-2/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="hsl(var(--accent-2))" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Для клининга</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">80 000 ₽</span>
                <p className="text-sm text-muted-foreground">эквивалент в бартере</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">Что делаем:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Сайт с калькулятором стоимости уборки</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>ИИ-бот для расчёта площади и подбора графика</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Автоматическая запись и напоминания</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Оформление ВК с прайсом и отзывами</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Реклама РСЯ по запросам «клининг», «уборка квартир»</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ретаргет ВК на тех, кто заходил на сайт</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Настройка целей и отчётов по заявкам</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Что получаете вы:</h4>
                <p className="text-sm text-muted-foreground">
                  Регулярная уборка офиса / генеральная уборка квартир / химчистка мебели на сумму
                  80 000 ₽. График обсуждаем.
                </p>
              </div>

              <a href="/#form">
                <Button className="w-full">Обсудить бартер</Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Другие ниши */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Бартер для других ниш</h2>
              <p className="text-lg text-muted-foreground">
                Работаем не только с мебельщиками, СТО и клинингом. По аналогии собираем
                бартер-пакеты для других бизнесов.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-card">
                <h3 className="font-bold mb-3">Салоны красоты</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Сайт с онлайн-записью, упаковка ВК, чат-бот, реклама на девушек 25–45 лет.
                  Бартер: услуги парикмахера, маникюра, косметолога на эквивалентную сумму.
                </p>
              </Card>

              <Card className="p-6 shadow-card">
                <h3 className="font-bold mb-3">Турагентства</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Сайт с подбором туров, квиз по направлениям, ИИ-бот для консультаций, реклама.
                  Бартер: туристические путёвки или экскурсионные туры на сумму пакета.
                </p>
              </Card>

              <Card className="p-6 shadow-card">
                <h3 className="font-bold mb-3">Фитнес-клубы</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Сайт с расписанием и онлайн-оплатой, упаковка соцсетей, чат-бот, таргет.
                  Бартер: абонементы в зал, тренировки с тренером на согласованную сумму.
                </p>
              </Card>

              <Card className="p-6 shadow-card">
                <h3 className="font-bold mb-3">Строительные услуги</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Сайт-портфолио, калькулятор стоимости, чат-бот для заявок, реклама по запросам.
                  Бартер: ремонтные работы, отделка, кровельные услуги на сумму пакета.
                </p>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg mb-6">
                Если вашей ниши нет в списке — не проблема. Напишите, и мы обсудим возможность
                бартера.
              </p>
              <a href="/#form">
                <Button size="lg">Предложить свою нишу</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Условия */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 shadow-card bg-card">
              <div className="text-center mb-8">
                <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="mb-4">Условия бартера</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent-2 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Договор</h3>
                    <p className="text-muted-foreground">
                      Подписываем двусторонний договор, в котором прописаны все работы, сроки и
                      порядок взаимозачёта. Акт выполненных работ и акт взаимозачёта оформляем по
                      закону.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent-2 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Эквивалент</h3>
                    <p className="text-muted-foreground">
                      Стоимость наших услуг считается по прайсу (от 80 000 ₽). Эквивалент в ваших
                      товарах/услугах рассчитываем по вашему прайсу или рыночной стоимости.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent-2 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Сроки</h3>
                    <p className="text-muted-foreground">
                      Работы выполняем за 14–30 дней. Поставку ваших товаров/услуг обсуждаем
                      индивидуально — можем растянуть на несколько месяцев, если речь о регулярном
                      сервисе (уборка, ТО авто).
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent-2 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Комбинированная оплата</h3>
                    <p className="text-muted-foreground">
                      Если полный взаимозачёт по каким-то причинам не подходит, возможна
                      комбинация: часть деньгами, часть бартером. Обсуждается индивидуально.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-accent-1 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Важно</h3>
                    <p className="text-muted-foreground">
                      Бартер — это не бесплатно. Это равноценный обмен услугами. Если вы не готовы
                      предоставить товары/услуги на эквивалентную сумму — рассмотрите стандартную
                      оплату по прайсу.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Обсудим бартер для вашей ниши?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Оставьте заявку, расскажите о своём бизнесе — мы предложим варианты взаимозачёта
          </p>
          <a href="/#form">
            <Button size="lg" className="animate-pulse-gentle">
              Обсудить условия бартера
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Barter;
