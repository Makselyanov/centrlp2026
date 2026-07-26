import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { MessengerLinks } from "./MessengerLinks";
import { SocialChannelLinks } from "./SocialChannelLinks";

export const Footer = () => {
  return (
    <footer id="site-footer" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">CentrLP</h3>
            <p className="text-sm text-muted-foreground mb-4">
              ООО «ААМХ»
              <br />
              ИНН 7203606424 · КПП 720301001
              <br />
              ОГРН 1267200004818
              <br />
              Офис и встречи: 625022, г. Тюмень, проезд Солнечный, 22
            </p>
            <details className="text-sm text-muted-foreground">
              <summary className="cursor-pointer hover:text-primary transition-colors mb-2">
                Банковские реквизиты и юр. адрес
              </summary>
              <div className="space-y-0.5 text-xs">
                <p>Юридический адрес: 625022, г. Тюмень, проезд Заречный, д. 39А, к. 1, кв. 88</p>
                <p>Расчётный счёт: 40702810810002084362</p>
                <p>Банк: АО «ТБанк», г. Москва</p>
                <p>БИК: 044525974</p>
                <p>ИНН Банка: 7710140679</p>
                <p>Корр. счёт: 30101810145250000974</p>
                <p>Адрес банка: 127287, г. Москва, ул. Хуторская 2-я, д. 38А, стр. 26</p>
              </div>
            </details>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Навигация</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Услуги
              </Link>
              <Link to="/business-plans" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Бизнес-планы
              </Link>
              <Link to="/projects" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Проекты
              </Link>
              <Link to="/barter" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Бартер
              </Link>
              <Link to="/contacts" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Контакты
              </Link>
            </div>
            <div className="mt-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Услуги в Тюмени
              </p>
              <Link to="/proverka-saita-i-zayavok-za-48-chasov" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Проверка сайта и заявок
              </Link>
              <Link to="/razrabotka-sajtov-tyumen" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Разработка сайтов
              </Link>
              <Link to="/sozdanie-lendinga-tyumen" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Создание лендинга
              </Link>
              <Link to="/crm-dlya-biznesa" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Внедрение CRM
              </Link>
              <Link to="/nastroyka-yandex-direct-tyumen" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Настройка Яндекс Директа
              </Link>
              <Link to="/services/marketing-strategy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                План маркетинга
              </Link>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Контакты</h4>
            <div className="space-y-3">
              <a
                href="tel:+79058248564"
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                data-metric="phone-click"
              >
                <Phone className="w-4 h-4 mr-2" />
                8-905-824-85-64
              </a>
              <div>
                <p className="mb-2 text-xs font-semibold text-muted-foreground">Написать напрямую</p>
                <MessengerLinks variant="footer" only={["max", "whatsapp"]} />
              </div>
              <div className="pt-2">
                <p className="mb-2 text-xs font-semibold text-muted-foreground">Каналы CentrLP</p>
                <SocialChannelLinks variant="footer" />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Документы</h4>
            <div className="space-y-2">
              <Link
                to="/terms"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Условия использования
              </Link>
              <Link
                to="/privacy"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Политика обработки персональных данных
              </Link>
              <Link
                to="/cookies"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Политика использования cookie
              </Link>
              <Link
                to="/consent"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Согласие на обработку персональных данных
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Коммуникация ведётся в соответствии с требованиями российского законодательства и
            нормами рекламного права.
          </p>
        </div>
      </div>
    </footer>
  );
};
