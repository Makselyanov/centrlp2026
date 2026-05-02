import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { MessengerLinks } from "./MessengerLinks";

const projectChannels = [
  {
    label: "Блог",
    href: "/blog",
    type: "blog",
    hint: "статьи CentrLP",
  },
  {
    label: "Telegram",
    href: "https://t.me/centrlp_ideas",
    type: "telegram",
    hint: "канал проекта",
  },
  {
    label: "ВКонтакте",
    href: "https://vk.com/centrlp",
    type: "vk",
    hint: "страница проекта",
  },
] as const;

type ChannelType = (typeof projectChannels)[number]["type"];

const ChannelIcon = ({ type }: { type: ChannelType }) => {
  if (type === "telegram") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.31 14.617l-2.965-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.511.969z" />
      </svg>
    );
  }

  if (type === "vk") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.5 5.5h13v13h-13z" stroke="currentColor" strokeWidth="1.7" rx="2" />
      <path d="M8.4 9h7.2M8.4 12h7.2M8.4 15h4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
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
              625022, г. Тюмень, проезд Заречный, д. 39А, к. 1, кв. 88
            </p>
            <details className="text-sm text-muted-foreground">
              <summary className="cursor-pointer hover:text-primary transition-colors mb-2">
                Банковские реквизиты
              </summary>
              <div className="space-y-0.5 text-xs">
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
              <MessengerLinks variant="footer" />
              <div className="pt-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Каналы проекта
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectChannels.map((channel) => (
                    <a
                      key={channel.type}
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      aria-label={`${channel.label}: ${channel.hint}`}
                      title={channel.hint}
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ChannelIcon type={channel.type} />
                      </span>
                      <span>{channel.label}</span>
                    </a>
                  ))}
                </div>
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
