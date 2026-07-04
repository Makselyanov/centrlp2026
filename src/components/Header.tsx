import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { MessengerLinks } from "./MessengerLinks";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-card shadow-card" : "bg-card/95 backdrop-blur-sm"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid h-20 grid-cols-[minmax(56px,72px),minmax(0,1fr),auto] items-center gap-x-4 xl:gap-x-6">
          {/* Logo */}
          <Link to="/" className="flex min-w-0 items-center">
            <img
              src={logoImage}
              alt="CentrLP"
              className="h-12 w-12 shrink-0 rounded-full object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex justify-center">
            <div className="flex items-center gap-2.5 xl:gap-3 whitespace-nowrap">
              {/* Services Dropdown */}
              <div
                className="relative shrink-0"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <Link
                  to="/services"
                  className="text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  Услуги
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </Link>
                {isServicesOpen && (
                <div className="absolute top-full left-0 pt-3">
                    <div className="w-[800px] bg-card shadow-elegant rounded-xl p-6 grid grid-cols-4 gap-6 border border-border z-50 whitespace-normal">
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-primary">Сайты и упаковка</h4>
                        <ul className="space-y-2 text-sm">
                          <li><Link to="/services/website-development" className="text-muted-foreground hover:text-primary transition-colors">Разработка сайта (5–10 страниц)</Link></li>
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
                          <li><Link to="/nastroyka-yandex-direct-tyumen" className="text-muted-foreground hover:text-primary transition-colors">Яндекс Директ (поиск + РСЯ)</Link></li>
                          <li><Link to="/services/vk-ads" className="text-muted-foreground hover:text-primary transition-colors">Реклама ВКонтакте (лиды, ретаргет)</Link></li>
                          <li><Link to="/services/avito-ads" className="text-muted-foreground hover:text-primary transition-colors">Реклама на Авито (объявления, заявки)</Link></li>
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
                className="text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
              >
                ИИ-внедрение
              </Link>
              <Link
                to="/business-plans"
                className="text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
              >
                Бизнес-планы и расчёты
              </Link>

              {/* Barter Dropdown */}
              <div
                className="relative shrink-0"
                onMouseEnter={handleBarterMouseEnter}
                onMouseLeave={handleBarterMouseLeave}
              >
                <Link
                  to="/barter"
                  className="text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  Бартер
                  <ChevronDown className={`w-4 h-4 transition-transform ${isBarterOpen ? 'rotate-180' : ''}`} />
                </Link>
                {isBarterOpen && (
                <div className="absolute top-full left-0 pt-3">
                    <div className="w-64 bg-card shadow-elegant rounded-xl p-4 border border-border z-50 whitespace-normal">
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
                to="/blog"
                className="text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
              >
                Инсайты
              </Link>
              <Link
                to="/projects"
                className="text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
              >
                Проекты
              </Link>
              <Link
                to="/prices"
                className="text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
              >
                Цены
              </Link>
              <Link
                to="/about"
                className="text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
              >
                О нас
              </Link>
              <Link
                to="/contacts"
                className="text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
              >
                Контакты
              </Link>
            </div>
          </nav>

          {/* Contact Info */}
          <div className="hidden xl:flex items-center gap-2.5 border-l border-border/60 pl-4 ml-2 xl:gap-3 xl:pl-5 xl:ml-3 whitespace-nowrap shrink-0">
            <MessengerLinks variant="header" className="pr-1" />
            <a
              href="tel:+79058248564"
              className="inline-flex items-center gap-1.5 text-xs xl:text-[13px] font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
              data-metric="phone-click"
            >
              <Phone className="w-4 h-4" />
              8&#8209;905&#8209;824&#8209;85&#8209;64
            </a>
            <Button asChild className="animate-gentle-pulse px-4 text-xs xl:text-sm shadow-button">
              <Link to="/contacts#contact-form">Оставить заявку</Link>
            </Button>
          </div>

          <div className="hidden items-center gap-2 lg:flex xl:hidden">
            <MessengerLinks variant="header" only={["max"]} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="РњРµРЅСЋ"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
          <div className="xl:hidden pb-4 animate-fade-in">
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
                        <Link to="/services/website-development" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Разработка сайта</Link>
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
                        <Link to="/nastroyka-yandex-direct-tyumen" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Яндекс Директ</Link>
                        <Link to="/services/vk-ads" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Реклама ВКонтакте</Link>
                        <Link to="/services/avito-ads" className="block text-muted-foreground hover:text-primary transition-colors py-1">• Реклама на Авито</Link>
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
                to="/blog"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                Инсайты
              </Link>
              <Link
                to="/projects"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                Проекты
              </Link>
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
                <div className="mt-3">
                  <MessengerLinks variant="mobile" />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
