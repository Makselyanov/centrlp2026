import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";

const Cookies = () => {
  return (
    <Layout
      title="Политика использования cookie | CentrLP"
      description="Политика использования cookie-файлов на сайте centrlp.ru. Перечень cookie, цели, сроки хранения и порядок отказа."
    >
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="mb-2 text-3xl font-bold">Политика использования cookie</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Редакция от 17 апреля 2026 г. · Версия 2.0
          </p>

          <div className="prose max-w-none text-muted-foreground space-y-4">
            <p>
              Настоящая Политика использования cookie (далее — Политика cookie) разработана
              Обществом с ограниченной ответственностью «ААМХ» (ООО «ААМХ»,
              ИНН 7203606424, ОГРН 1267200004818) — оператором, осуществляющим обработку
              персональных данных на сайте https://centrlp.ru (далее — Сайт).
            </p>
            <p>
              Политика cookie является неотъемлемой частью{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Политики в отношении обработки персональных данных
              </Link>{" "}
              и разъясняет, какие cookie-файлы используются на Сайте, с какими целями
              и как Пользователь может отказаться от их использования.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Что такое cookie</h2>
            <p>
              1.1. Cookie — небольшие текстовые файлы, которые сохраняются на устройстве
              Пользователя веб-сайтом, который он посещает. Cookie используются для того,
              чтобы веб-сайты работали более эффективно, а также для предоставления
              Оператору аналитической информации.
            </p>
            <p>
              1.2. В соответствии с разъяснениями Роскомнадзора и судебной практикой,
              идентификаторы, содержащиеся в cookie-файлах, могут быть отнесены
              к персональным данным Пользователя и обрабатываются Оператором с соблюдением
              требований Федерального закона № 152-ФЗ «О персональных данных».
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              2. Категории cookie, используемых на Сайте
            </h2>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">
              2.1. Строго необходимые (технические)
            </h3>
            <p>
              Обеспечивают базовую функциональность Сайта и не могут быть отключены.
              Эти cookie не хранят информацию, позволяющую идентифицировать Пользователя
              как личность.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>cookie-consent</strong> (Оператор) — запоминает факт ознакомления
                и выбор пользователя: принять или отклонить аналитические cookie.
                Срок хранения: до изменения выбора пользователем или очистки браузера.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">
              2.2. Аналитические
            </h3>
            <p>
              Помогают Оператору понять, как Пользователи взаимодействуют с Сайтом,
              какие разделы посещаются чаще, где возникают затруднения. Данные собираются
              в агрегированном и обезличенном виде.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>_ym_uid, _ym_d, _ym_isad, _ym_visorc</strong> (ООО «Яндекс»,
                Яндекс.Метрика) — уникальный идентификатор посетителя, дата первого
                визита, вебвизор. Срок хранения: до 1 года. Политика Яндекс.Метрики:{" "}
                <a
                  href="https://yandex.ru/legal/confidential/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  yandex.ru/legal/confidential
                </a>
                .
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">
              2.3. Виджеты и внешние формы
            </h3>
            <p>
              На сайте нет автоматически загружаемых виджетов обратного звонка или
              сторонних форм, которые собирают телефон без действия пользователя.
              Ссылки на мессенджеры открываются только после клика пользователя.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              3. Цели использования cookie
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>обеспечение корректной работы Сайта;</li>
              <li>запоминание настроек и действий Пользователя для удобства;</li>
              <li>
                сбор обезличенной статистики посещаемости и поведения Пользователей
                для улучшения Сайта;
              </li>
              <li>
                показ рекламных материалов Оператора Пользователям, ранее посещавшим
                Сайт, на сторонних рекламных площадках;
              </li>
              <li>обеспечение безопасности и защиты от мошеннических действий.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              4. Согласие Пользователя
            </h2>
            <p>
              4.1. При первом посещении Сайта Пользователю отображается уведомление
              об использовании cookie с возможностью ознакомиться с настоящей Политикой.
            </p>
            <p>
              4.2. Аналитические cookie Яндекс.Метрики включаются только после нажатия
              кнопки «Принять» в cookie-баннере. Если пользователь нажимает «Отклонить»,
              счётчик Метрики не загружается в браузер.
            </p>
            <p>
              4.3. Пользователь вправе в любой момент отозвать своё согласие путём
              очистки cookie сайта или изменения настроек браузера в соответствии
              с разделом 5 настоящей Политики.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              5. Как отключить cookie
            </h2>
            <p>
              5.1. Пользователь может самостоятельно управлять cookie через настройки
              используемого браузера. В настройках браузера обычно доступны опции
              удаления существующих cookie и блокировки новых.
            </p>
            <p>5.2. Инструкции для популярных браузеров:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://yandex.ru/support/browser-classic/personal-data-protection/cookies.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Яндекс.Браузер
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/ru/kb/udalenie-kukov-dlya-udaleniya-informacii-kotoruyu-veb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/ru-ru/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Apple Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/ru-ru/microsoft-edge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p>
              5.3. Отключение аналитических и рекламных cookie может быть произведено
              дополнительно с помощью специальных средств, предоставляемых соответствующими
              сервисами (например, Yandex Metrica Opt-out).
            </p>
            <p>
              5.4. Отключение cookie может привести к частичной или полной
              неработоспособности отдельных функций Сайта.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
              6. Изменения Политики cookie
            </h2>
            <p>
              6.1. Оператор вправе вносить изменения в настоящую Политику cookie. Новая
              редакция вступает в силу с момента её размещения на Сайте.
            </p>
            <p>
              6.2. Действующая редакция с указанием даты размещения всегда доступна по
              адресу: <strong>https://centrlp.ru/cookies</strong>.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Контакты</h2>
            <p>
              7.1. Вопросы, связанные с использованием cookie и обработкой персональных
              данных, Пользователь вправе направить Оператору:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                по почтовому адресу: 625022, г. Тюмень, проезд Заречный, д. 39А, к. 1,
                кв. 88;
              </li>
              <li>
                по адресу электронной почты: <strong>1@centrlp.ru</strong>;
              </li>
              <li>по телефону: +7 905 824-85-64.</li>
            </ul>

            <div className="mt-12 pt-8 border-t border-border space-y-3">
              <p className="font-semibold text-foreground">Реквизиты Оператора:</p>
              <p>Общество с ограниченной ответственностью «ААМХ»</p>
              <p>ИНН 7203606424 · КПП 720301001 · ОГРН 1267200004818</p>
              <p>625022, г. Тюмень, проезд Заречный, д. 39А, к. 1, кв. 88</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cookies;
