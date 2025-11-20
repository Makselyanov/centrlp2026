import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Shield, Clock, TrendingUp, MessageSquare, FileText, Users, Zap } from "lucide-react";

const AI = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Brain className="w-20 h-20 text-primary mx-auto mb-6" />
            <h1 className="mb-6">ИИ-внедрение для малого бизнеса</h1>
            <p className="text-xl text-muted-foreground">
              Автоматизируем рутину, снижаем нагрузку на персонал и увеличиваем конверсию с помощью
              искусственного интеллекта. Без сложностей и с соблюдением 152-ФЗ.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Почему ИИ нужен вашему бизнесу</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Искусственный интеллект — это не про сложные технологии. Это про реальные деньги,
              которые вы экономите и зарабатываете.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center shadow-card">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Экономия времени</h3>
              <p className="text-sm text-muted-foreground">
                Бот отвечает на 80% типовых вопросов, освобождая время для важных задач
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <TrendingUp className="w-12 h-12 text-accent-1 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Рост конверсии</h3>
              <p className="text-sm text-muted-foreground">
                Мгновенные ответы 24/7 увеличивают вероятность заявки на 40–60%
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <Users className="w-12 h-12 text-accent-2 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Разгрузка персонала</h3>
              <p className="text-sm text-muted-foreground">
                Сотрудники занимаются продажами, а не ответами на одни и те же вопросы
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Безопасность данных</h3>
              <p className="text-sm text-muted-foreground">
                Соблюдаем 152-ФЗ и требования к обработке персональных данных
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Что мы внедряем</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Готовые ИИ-решения, адаптированные под вашу нишу и особенности бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-card bg-card">
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Автоответы 24/7 и help-боты</h3>
              <p className="text-muted-foreground mb-6">
                ИИ-ассистент, который работает круглосуточно: отвечает на вопросы, собирает заявки,
                консультирует по товарам и услугам. Клиент получает ответ мгновенно, даже когда вы
                спите.
              </p>
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold mb-2">Для мебельной мастерской:</p>
                  <p className="text-sm text-muted-foreground">
                    «Сколько стоит кухня 3 на 4 метра?» → Бот задаёт уточняющие вопросы по
                    материалам, фурнитуре и даёт примерный расчёт за 2 минуты.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold mb-2">Для СТО:</p>
                  <p className="text-sm text-muted-foreground">
                    «Сколько стоит полировка фар?» → Бот уточняет марку авто, тип фар, предлагает
                    удобное время записи.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold mb-2">Для клининга:</p>
                  <p className="text-sm text-muted-foreground">
                    «Хочу заказать уборку двушки» → Бот запрашивает площадь, тип уборки, считает
                    стоимость и записывает клиента.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-card bg-card">
              <Brain className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">ИИ-скрипты продаж</h3>
              <p className="text-muted-foreground mb-6">
                Умный ассистент для вашего менеджера или мастера. Подсказывает правильные ответы на
                возражения, напоминает о допродажах, помогает довести клиента до сделки.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Что делает ИИ-ассистент:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Анализирует вопрос клиента и предлагает готовый ответ</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Подсказывает, как закрыть возражение «дорого» или «подумаю»</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Напоминает о допродажах и комплексных пакетах</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Помогает новичкам продавать как опытным менеджерам</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold mb-2">Пример работы:</p>
                  <p className="text-sm text-muted-foreground">
                    Клиент говорит «дорого». ИИ мгновенно подсказывает менеджеру: «Предложите
                    рассрочку 0-0-6 или акцию на комплексный пакет со скидкой 15%».
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-card bg-card">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Генерация текстов и A/B-вариантов</h3>
              <p className="text-muted-foreground mb-6">
                ИИ создаёт тексты для объявлений, постов, страниц сайта. Генерирует 5–10 вариантов
                заголовков и офферов, которые можно сразу тестировать в рекламе.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Что генерирует ИИ:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Заголовки для рекламных объявлений (5–10 вариантов на выбор)</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Тексты для постов ВКонтакте с учётом ЦА</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Описания товаров и услуг на сайт</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Адаптация текстов под разные сегменты аудитории</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-accent-2/10 rounded-lg p-4">
                  <p className="font-semibold mb-2">Важно:</p>
                  <p className="text-sm text-muted-foreground">
                    Все тексты проходят модерацию специалиста, чтобы соответствовать требованиям
                    рекламного законодательства и звучать естественно для вашей ниши.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-card bg-card">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">A/B-тесты на основе ИИ</h3>
              <p className="text-muted-foreground mb-6">
                ИИ генерирует несколько вариантов ключевых блоков сайта или объявлений, запускает
                их в тест и автоматически отключает слабые варианты. Вы получаете проверенные
                рабочие связки.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Как это работает:</p>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>ИИ создаёт 3–5 вариантов заголовка или оффера</li>
                    <li>Запускаем их одновременно в рекламе</li>
                    <li>Через 3–7 дней анализируем данные Метрики</li>
                    <li>Отключаем варианты с высоким CPL</li>
                    <li>Масштабируем лучший вариант</li>
                  </ol>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-semibold mb-2">Результат:</p>
                  <p className="text-sm text-muted-foreground">
                    Снижение стоимости заявки на 20–40% за счёт постоянного тестирования и
                    отключения неэффективных вариантов.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ and Knowledge Base */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">FAQ-бот и база знаний на ИИ</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Создаём базу знаний, которая обучает бота отвечать на вопросы клиентов так, как
              ответили бы вы
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-card">
              <h3 className="text-xl font-bold mb-4">Что входит в базу знаний:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Описание всех товаров и услуг с ценами</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Ответы на 50–100 частых вопросов (сроки, доставка, гарантия)
                  </span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Инструкции для разных ситуаций</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Ваши уникальные фишки и преимущества</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Правила работы с возражениями</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-card">
              <h3 className="text-xl font-bold mb-4">Как бот использует базу знаний:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Понимает вопрос клиента даже в свободной форме</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Находит нужную информацию в базе за доли секунды
                  </span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Формулирует ответ простым языком</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Передаёт сложные вопросы оператору с контекстом диалога
                  </span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Учится на новых вопросах и дополняет базу</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Assistant for Manager */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 shadow-card bg-card">
              <div className="text-center mb-8">
                <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="mb-4">Ассистент для менеджера и скрипты продаж</h2>
                <p className="text-lg text-muted-foreground">
                  ИИ помогает менеджеру в режиме реального времени: подсказывает, что ответить,
                  какую акцию предложить, как закрыть возражение
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-bold mb-3">Сценарий 1: Клиент сомневается в цене</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Клиент:</span> «У конкурентов на 10% дешевле»
                    </p>
                    <p className="text-accent-2">
                      <span className="font-semibold">ИИ подсказывает:</span> «Уточните, учитывали
                      ли они стоимость доставки и установки? Предложите сравнить полный пакет. У
                      нас бесплатная доставка и гарантия 3 года.»
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-bold mb-3">Сценарий 2: Клиент откладывает решение</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Клиент:</span> «Я ещё подумаю»
                    </p>
                    <p className="text-accent-2">
                      <span className="font-semibold">ИИ подсказывает:</span> «Создайте срочность:
                      'Сейчас действует акция −15% до конца недели. Могу зафиксировать цену на 3
                      дня, пока вы думаете.'»
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-bold mb-3">Сценарий 3: Допродажа</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Клиент:</span> Заказывает базовый пакет
                    </p>
                    <p className="text-accent-2">
                      <span className="font-semibold">ИИ подсказывает:</span> «Предложите
                      комплексный пакет: 'Многие клиенты берут сразу с защитным покрытием —
                      выходит на 20% выгоднее, чем по отдельности.'»
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Security and Compliance */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="mb-4">Безопасность и 152-ФЗ</h2>
              <p className="text-lg text-muted-foreground">
                Все ИИ-решения соответствуют требованиям российского законодательства
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 shadow-card">
                <h3 className="font-bold mb-3">Защита персональных данных</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Согласие на обработку данных перед началом диалога</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Шифрование данных при передаче и хранении</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Право клиента на удаление данных по запросу</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 shadow-card">
                <h3 className="font-bold mb-3">Соответствие рекламному праву</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Тексты проверяются на соответствие ФЗ-38 «О рекламе»</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Запрет на недостоверную информацию</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-4 h-4 text-accent-2 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Корректные формулировки без обещаний гарантированного результата</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Готовы автоматизировать бизнес с ИИ?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Проконсультируем, подберём подходящие решения и внедрим за 7–14 дней
          </p>
          <a href="#callbackkiller">
            <Button size="lg" className="animate-pulse-gentle">
              Получить консультацию по ИИ
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default AI;
