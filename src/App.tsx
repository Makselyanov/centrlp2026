import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { AppFallback } from "./components/AppFallback";
import { ScrollToTop } from "./components/ScrollToTop";
import { CookieConsent } from "./components/CookieConsent";
import { trackMetric } from "./lib/metrics";

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const GlobalToasters = lazy(() => import("./components/GlobalToasters"));
const Services = lazy(() => import("./pages/Services"));
const AI = lazy(() => import("./pages/AI"));
const Barter = lazy(() => import("./pages/Barter"));
const BarterFurniture = lazy(() => import("./pages/BarterFurniture"));
if (typeof window !== "undefined" && window.location.hostname === "barter.centrlp.ru") {
  void import("./pages/BarterSTO");
}
const BarterSTO = lazy(() => import("./pages/BarterSTO"));
const BarterCleaning = lazy(() => import("./pages/BarterCleaning"));
const BusinessPlans = lazy(() => import("./pages/BusinessPlans"));
const Cases = lazy(() => import("./pages/Cases"));
const Projects = lazy(() => import("./pages/Projects"));
const Prices = lazy(() => import("./pages/Prices"));
const About = lazy(() => import("./pages/About"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Consent = lazy(() => import("./pages/Consent"));
const Terms = lazy(() => import("./pages/Terms"));
const TikTokStudio = lazy(() => import("./pages/TikTokStudio"));
const MaxJoin = lazy(() => import("./pages/MaxJoin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AiPlanPage = lazy(() => import("./pages/AiPlanPage").then(m => ({ default: m.AiPlanPage })));
const AiTuragent = lazy(() => import("./pages/AiTuragent"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ExpressAuditPage = lazy(() => import("./pages/LandingPages").then((module) => ({ default: module.ExpressAuditPage })));
const WebsiteDevelopmentTyumenPage = lazy(() => import("./pages/LandingPages").then((module) => ({ default: module.WebsiteDevelopmentTyumenPage })));
const LandingTyumenPage = lazy(() => import("./pages/LandingPages").then((module) => ({ default: module.LandingTyumenPage })));
const YandexDirectTyumenPage = lazy(() => import("./pages/LandingPages").then((module) => ({ default: module.YandexDirectTyumenPage })));
const CrmBusinessPage = lazy(() => import("./pages/LandingPages").then((module) => ({ default: module.CrmBusinessPage })));
const AiAutomationPage = lazy(() => import("./pages/LandingPages").then((module) => ({ default: module.AiAutomationPage })));
const LocalSeoTyumenPage = lazy(() => import("./pages/LandingPages").then((module) => ({ default: module.LocalSeoTyumenPage })));

// Lazy-loaded service pages
const WebsiteDevelopment = lazy(() => import("./pages/services/WebsiteDevelopment"));
const DesignPrototyping = lazy(() => import("./pages/services/DesignPrototyping"));
const Branding = lazy(() => import("./pages/services/Branding"));
const NamingOffers = lazy(() => import("./pages/services/NamingOffers"));
const VKDesign = lazy(() => import("./pages/services/VKDesign"));
const ChatbotVK = lazy(() => import("./pages/services/ChatbotVK"));
const AutoResponses = lazy(() => import("./pages/services/AutoResponses"));
const OperatorScripts = lazy(() => import("./pages/services/OperatorScripts"));
const HelpBot = lazy(() => import("./pages/services/HelpBot"));
const VKAds = lazy(() => import("./pages/services/VKAds"));
const AvitoAds = lazy(() => import("./pages/services/AvitoAds"));
const WebAnalytics = lazy(() => import("./pages/services/WebAnalytics"));
const ABTesting = lazy(() => import("./pages/services/ABTesting"));
const MarketingStrategy = lazy(() => import("./pages/services/MarketingStrategy"));
const ContentPlan = lazy(() => import("./pages/services/ContentPlan"));
const CopywritingTexts = lazy(() => import("./pages/services/CopywritingTexts"));
const OfferPackaging = lazy(() => import("./pages/services/OfferPackaging"));
const TelegramMiniApp = lazy(() => import("./pages/services/TelegramMiniApp"));
const AndroidAppDevelopment = lazy(() => import("./pages/services/MobileAppDevelopment").then(m => ({ default: m.AndroidAppDevelopment })));
const IosAppDevelopment = lazy(() => import("./pages/services/MobileAppDevelopment").then(m => ({ default: m.IosAppDevelopment })));
const MaxMessenger = lazy(() => import("./pages/services/MaxMessenger"));
const BrowserExtensions = lazy(() => import("./pages/services/BrowserExtensions"));
const AIAgents = lazy(() => import("./pages/services/AIAgents"));
const AISystems = lazy(() => import("./pages/services/AISystems"));
const CustomCRM = lazy(() => import("./pages/services/CustomCRM"));
const MVPDevelopment = lazy(() => import("./pages/services/MVPDevelopment"));
const OpenClawAI = lazy(() => import("./pages/services/OpenClawAI"));
const N8nAutomation = lazy(() => import("./pages/services/N8nAutomation"));
const TelegramLeadAgent = lazy(() => import("./pages/services/TelegramLeadAgent"));
const TelegramServiceAgent = lazy(() => import("./pages/services/TelegramServiceAgent"));
const Compliance2026 = lazy(() => import("./pages/services/Compliance2026"));

const BARTER_HOST = "barter.centrlp.ru";
const MAIN_SITE_ORIGIN = "https://centrlp.ru";

const isBarterHost = () =>
  typeof window !== "undefined" &&
  (window.location.hostname === BARTER_HOST || import.meta.env.VITE_BARTER_HOST_PREVIEW === "1");

const MainSiteRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    window.location.replace(`${MAIN_SITE_ORIGIN}${location.pathname}${location.search}${location.hash}`);
  }, [location.hash, location.pathname, location.search]);

  return <AppFallback kind="recovering" />;
};

const FirstPartyAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const pageViewKey = `centrlp:page-view:${location.pathname}${location.search}`;
    let shouldTrackPageView = true;

    try {
      shouldTrackPageView = sessionStorage.getItem(pageViewKey) !== "1";
      if (shouldTrackPageView) sessionStorage.setItem(pageViewKey, "1");
    } catch {
      // First-party analytics remains available when session storage is blocked.
    }

    if (shouldTrackPageView) {
      trackMetric("site_page_view", { path: location.pathname });
    }

    const search = new URLSearchParams(location.search);
    if (!search.get("utm_source") && !search.get("utm_campaign")) return;

    const eventKey = `centrlp:utm-view:${location.pathname}${location.search}`;
    try {
      if (sessionStorage.getItem(eventKey)) return;
      sessionStorage.setItem(eventKey, "1");
    } catch {
      // Analytics storage is optional; the page must work when it is unavailable.
    }

    trackMetric("utm_landing_view", { path: location.pathname });
  }, [location.pathname, location.search]);

  return null;
};

const AppRoutes = () => {
  const location = useLocation();
  const barterHost = isBarterHost();

  if (barterHost && location.pathname !== "/") {
    return <MainSiteRedirect />;
  }

  const routeLocation = barterHost
    ? { ...location, pathname: "/barter/sto" }
    : location;

  return (
    <AppErrorBoundary>
      <Suspense fallback={<AppFallback />}>
        <Routes location={routeLocation}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/barter" element={<Barter />} />
            <Route path="/barter/furniture" element={<BarterFurniture />} />
            <Route path="/barter/sto" element={<BarterSTO />} />
            <Route path="/barter/cleaning" element={<BarterCleaning />} />
            <Route path="/business-plans" element={<BusinessPlans />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/tiktok" element={<TikTokStudio />} />
            <Route path="/max" element={<MaxJoin />} />

            {/* Service pages */}
            <Route path="/services/website-development" element={<WebsiteDevelopment />} />
            <Route path="/services/design-prototyping" element={<DesignPrototyping />} />
            <Route path="/services/branding" element={<Branding />} />
            <Route path="/services/naming-offers" element={<NamingOffers />} />
            <Route path="/services/vk-design" element={<VKDesign />} />
            <Route path="/services/chatbot-vk" element={<ChatbotVK />} />
            <Route path="/services/auto-responses" element={<AutoResponses />} />
            <Route path="/services/operator-scripts" element={<OperatorScripts />} />
            <Route path="/services/help-bot" element={<HelpBot />} />
            <Route path="/services/yandex-direct" element={<Navigate to="/nastroyka-yandex-direct-tyumen" replace />} />
            <Route path="/services/vk-ads" element={<VKAds />} />
            <Route path="/services/avito-ads" element={<AvitoAds />} />
            <Route path="/services/web-analytics" element={<WebAnalytics />} />
            <Route path="/services/ab-testing" element={<ABTesting />} />
            <Route path="/services/marketing-strategy" element={<MarketingStrategy />} />
            <Route path="/services/content-plan" element={<ContentPlan />} />
            <Route path="/services/copywriting-texts" element={<CopywritingTexts />} />
            <Route path="/services/offer-packaging" element={<OfferPackaging />} />
            <Route path="/services/telegram-mini-app" element={<TelegramMiniApp />} />
            <Route path="/services/android-app-development" element={<AndroidAppDevelopment />} />
            <Route path="/services/ios-app-development" element={<IosAppDevelopment />} />
            <Route path="/services/max-messenger" element={<MaxMessenger />} />
            <Route path="/services/browser-extensions" element={<BrowserExtensions />} />
            <Route path="/services/ai-agents" element={<AIAgents />} />
            <Route path="/services/ai-systems" element={<AISystems />} />
            <Route path="/services/custom-crm" element={<CustomCRM />} />
            <Route path="/services/mvp-development" element={<MVPDevelopment />} />
            <Route path="/services/openclaw-ai" element={<OpenClawAI />} />
            <Route path="/services/n8n-automation" element={<N8nAutomation />} />
            <Route path="/services/telegram-lead-agent" element={<TelegramLeadAgent />} />
            <Route path="/services/telegram-service-agent" element={<TelegramServiceAgent />} />
            <Route path="/services/compliance-2026" element={<Compliance2026 />} />

            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            <Route path="/proverka-saita-i-zayavok-za-48-chasov" element={<ExpressAuditPage />} />
            <Route path="/razrabotka-sajtov-tyumen" element={<WebsiteDevelopmentTyumenPage />} />
            <Route path="/sozdanie-lendinga-tyumen" element={<LandingTyumenPage />} />
            <Route path="/nastroyka-yandex-direct-tyumen" element={<YandexDirectTyumenPage />} />
            <Route path="/crm-dlya-biznesa" element={<CrmBusinessPage />} />
            <Route path="/ai-avtomatizaciya-biznesa" element={<AiAutomationPage />} />
            <Route path="/lokalnoe-seo-tyumen" element={<LocalSeoTyumenPage />} />

            <Route path="/ai-plan" element={<AiPlanPage />} />
            <Route path="/ai-turagent" element={<AiTuragent />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppErrorBoundary>
  );
};

const App = () => {
  const barterHost = isBarterHost();

  return (
    <>
      {!barterHost ? (
        <Suspense fallback={null}>
          <GlobalToasters />
        </Suspense>
      ) : null}
      <BrowserRouter>
        <FirstPartyAnalytics />
        <ScrollToTop />
        <AppRoutes />
        {!barterHost ? <CookieConsent /> : null}
      </BrowserRouter>
    </>
  );
};

export default App;
