import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">CentrLP</h3>
            <p className="text-sm text-muted-foreground mb-4">
              НПД Кузнецов Максим Владимирович
              <br />
              ИНН 720321829472
              <br />
              г. Тюмень, Солнечный проезд, 22
            </p>
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
              <Link to="/barter" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Бартер
              </Link>
              <Link to="/contacts" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Контакты
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
              <div className="flex items-center space-x-3">
                <a
                  href="https://t.me/centrlp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0088cc] text-white hover:opacity-80 transition-opacity"
                  aria-label="Telegram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/79058248564"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-80 transition-opacity"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="https://vk.com/centrlp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077FF] text-white hover:opacity-80 transition-opacity"
                  aria-label="ВКонтакте"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.118-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Документы</h4>
            <div className="space-y-2">
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

      {/* Envybox Integration */}
      <link rel="stylesheet" href="https://cdn.envybox.io/widget/cbk.css" />
      <script
        type="text/javascript"
        src="https://cdn.envybox.io/widget/cbk.js?wcb_code=528a9824dc4bc4c6b0c7a45e8beea4ca"
        charSet="UTF-8"
        async
      ></script>
    </footer>
  );
};
