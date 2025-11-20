import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import logoImage from "@/assets/centrlp-logo.jpg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isBarterOpen, setIsBarterOpen] = useState(false);
  
  // Mobile submenu states
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBarterOpen, setMobileBarterOpen] = useState(false);
  
  const location = useLocation();
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const barterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileBarterOpen(false);
  }, [location]);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const handleBarterMouseEnter = () => {
    if (barterTimeoutRef.current) {
      clearTimeout(barterTimeoutRef.current);
      barterTimeoutRef.current = null;
    }
    setIsBarterOpen(true);
  };

  const handleBarterMouseLeave = () => {
    barterTimeoutRef.current = setTimeout(() => {
      setIsBarterOpen(false);
    }, 200);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card shadow-card" : "bg-card/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="CentrLP Logo" 
              className="h-12 w-12 object-contain rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">CentrLP</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Агентство развития бизнеса</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <Link
                to="/services"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Услуги
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-[800px] bg-card shadow-elegant rounded-xl p-6 grid grid-cols-4 gap-6 border border-border z-50">
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-primary">Сайты и упаковка</h4>
                      <ul className="space-y-2 text-sm">
                        <li><Link to="/services/tilda-website" className="text-muted-foreground hover:text-primary transition-colors">Сайт на Tilda (5–10 страниц)</Link></li>
                        <li><Link to="/services/design-prototyping" className="text-muted-foreground hover:text-primary transition-colors">Дизайн и прототипирование</Link></li>
                        <li><Link to="/services/branding" className="text-muted-foreground hover:text-primary transition-colors">Фирменный стиль и логотип</Link></li>
                        <li><Link to="/services/naming-offers" className="text-muted-foreground hover:text-primary transition-colors">Нейминг и продающие офферы</Link></li>
                        <li><Link to="/services/vk-design" className="text-muted-foreground hover:text-primary transition-colors">Оформление ВКонтакте</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-primary">Чат-боты и коммуникации</h4>
                      <ul className="space-y-2 text-sm">
                        <li><Link to="/services/chatbot-vk" className="text-muted-foreground hover:text-primary transition-colors">Чат-бот ВКонтакте / виджет на сайт</Link></li>
                        <li><Link to="/services/auto-responses" className="text-muted-foreground hover:text-primary transition-colors">Автоответы 24/7 и запись на услугу</Link></li>
                        <li><Link to="/services/operator-scripts" className="text-muted-foreground hover:text-primary transition-colors">Скрипты / FAQ для оператора</Link></li>
                        <li><Link to="/services/help-bot" className="text-muted-foreground hover:text-primary transition-colors">Help-бот поддержки клиентов</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-primary">Реклама и аналитика</h4>
                      <ul className="space-y-2 text-sm">
                        <li><Link to="/services/yandex-direct" className="text-muted-foreground hover:text-primary transition-colors">Яндекс Директ (поиск + РСЯ)</Link></li>
                        <li><Link to="/services/vk-ads" className="text-muted-foreground hover:text-primary transition-colors">Реклама ВКонтакте (лиды, ретаргет)</Link></li>
                        <li><Link to="/services/web-analytics" className="text-muted-foreground hover:text-primary transition-colors">Веб-аналитика: Метрика, цели, отчёты</Link></li>
                        <li><Link to="/services/ab-testing" className="text-muted-foreground hover:text-primary transition-colors">A/B-тесты креативов и посадочных</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-primary">Стратегия и контент</h4>
                      <ul className="space-y-2 text-sm">
                        <li><Link to="/services/marketing-strategy" className="text-muted-foreground hover:text-primary transition-colors">Маркетинговая стратегия и медиаплан</Link></li>
                        <li><Link to="/services/content-plan" className="text-muted-foreground hover:text-primary transition-colors">Контент-план ВК, креативы, посты</Link></li>
                        <li><Link to="/services/copywriting-texts" className="text-muted-foreground hover:text-primary transition-colors">Тексты для сайта и объявлений</Link></li>
                        <li><Link to="/services/offer-packaging" className="text-muted-foreground hover:text-primary transition-colors">Упаковка офферов под нишу</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/ai"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              ИИ-внедрение
            </Link>
            <Link
              to="/business-plans"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Бизнес-планы и расчёты
            </Link>

            {/* Barter Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleBarterMouseEnter}
              onMouseLeave={handleBarterMouseLeave}
            >
              <Link
                to="/barter"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Бартер
                <ChevronDown className={`w-4 h-4 transition-transform ${isBarterOpen ? 'rotate-180' : ''}`} />
              </Link>
              {isBarterOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-64 bg-card shadow-elegant rounded-xl p-4 border border-border z-50">
                    <ul className="space-y-3">
                      <li>
                        <Link
                          to="/barter/furniture"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                        >
                          Для мебельщиков
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/barter/sto"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                        >
                          Для СТО и детейлинга
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/barter/cleaning"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                        >
                          Для клининга
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/prices"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Цены
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              О нас
            </Link>
            <Link
              to="/contacts"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Контакты
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+79058248564"
              className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors"
              data-metric="phone-click"
            >
              <Phone className="w-4 h-4 mr-2" />
              8-905-824-85-64
            </a>
            <div className="flex items-center space-x-2">
              <a
                href="https://t.me/centrlp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0088cc] text-white hover:opacity-80 transition-opacity"
                data-metric="messenger-click"
                aria-label="Telegram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
              </a>
              <a
                href="https://wa.me/79058248564"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-80 transition-opacity"
                data-metric="messenger-click"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://vk.com/centrlp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077FF] text-white hover:opacity-80 transition-opacity"
                data-metric="messenger-click"
                aria-label="ВКонтакте"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.118-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                </svg>
              </a>
            </div>
            <a href="#form">
              <Button className="animate-gentle-pulse shadow-button">Оставить заявку</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Меню"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {/* Services Mobile */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between"
                >
                  Услуги
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="ml-4 mt-2 space-y-3 bg-accent/50 rounded-lg p-3">
                    <div>
                      <div className="text-xs font-semibold text-primary mb-2">Сайты и упаковка</div>
                      <div className="text-xs space-y-1 ml-2">
                        <Link to="/services/tilda-website" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Сайт на Tilda</Link>
                        <Link to="/services/design-prototyping" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Дизайн и прототипирование</Link>
                        <Link to="/services/branding" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Фирменный стиль и логотип</Link>
                        <Link to="/services/naming-offers" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Нейминг и офферы</Link>
                        <Link to="/services/vk-design" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Оформление ВКонтакте</Link>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-primary mb-2">Чат-боты и коммуникации</div>
                      <div className="text-xs space-y-1 ml-2">
                        <Link to="/services/chatbot-vk" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Чат-бот ВКонтакте</Link>
                        <Link to="/services/auto-responses" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Автоответы 24/7</Link>
                        <Link to="/services/operator-scripts" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Скрипты для оператора</Link>
                        <Link to="/services/help-bot" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Help-бот поддержки</Link>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-primary mb-2">Реклама и аналитика</div>
                      <div className="text-xs space-y-1 ml-2">
                        <Link to="/services/yandex-direct" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Яндекс Директ</Link>
                        <Link to="/services/vk-ads" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Реклама ВКонтакте</Link>
                        <Link to="/services/web-analytics" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Веб-аналитика</Link>
                        <Link to="/services/ab-testing" className="block text-muted-foreground hover:text-primary transition-colors py-1">• A/B-тесты</Link>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-primary mb-2">Стратегия и контент</div>
                      <div className="text-xs space-y-1 ml-2">
                        <Link to="/services/marketing-strategy" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Маркетинговая стратегия</Link>
                        <Link to="/services/content-plan" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Контент-план ВК</Link>
                        <Link to="/services/copywriting-texts" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Тексты для сайта</Link>
                        <Link to="/services/offer-packaging" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Упаковка офферов</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/ai"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                ИИ-внедрение
              </Link>
              <Link
                to="/business-plans"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                Бизнес-планы и расчёты
              </Link>

              {/* Barter Mobile */}
              <div>
                <button
                  onClick={() => setMobileBarterOpen(!mobileBarterOpen)}
                  className="w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between"
                >
                  Бартер
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileBarterOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileBarterOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/barter/furniture"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors block py-1"
                    >
                      Для мебельщиков
                    </Link>
                    <Link
                      to="/barter/sto"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors block py-1"
                    >
                      Для СТО и детейлинга
                    </Link>
                    <Link
                      to="/barter/cleaning"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors block py-1"
                    >
                      Для клининга
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/prices"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                Цены
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                О нас
              </Link>
              <Link
                to="/contacts"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                Контакты
              </Link>

              <div className="pt-4 border-t border-border">
                <a
                  href="tel:+79058248564"
                  className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                  data-metric="phone-click"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  8-905-824-85-64
                </a>
                <div className="flex items-center space-x-3 mt-3">
                  <a
                    href="https://t.me/centrlp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0088cc] text-white"
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
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366] text-white"
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
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0077FF] text-white"
                    aria-label="ВКонтакте"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.118-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                    </svg>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
