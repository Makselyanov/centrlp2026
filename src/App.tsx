import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AI from "./pages/AI";
import Barter from "./pages/Barter";
import BarterFurniture from "./pages/BarterFurniture";
import BarterSTO from "./pages/BarterSTO";
import BarterCleaning from "./pages/BarterCleaning";
import BusinessPlans from "./pages/BusinessPlans";
import Cases from "./pages/Cases";
import Prices from "./pages/Prices";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

// Service pages
import TildaWebsite from "./pages/services/TildaWebsite";
import DesignPrototyping from "./pages/services/DesignPrototyping";
import Branding from "./pages/services/Branding";
import NamingOffers from "./pages/services/NamingOffers";
import VKDesign from "./pages/services/VKDesign";
import ChatbotVK from "./pages/services/ChatbotVK";
import AutoResponses from "./pages/services/AutoResponses";
import OperatorScripts from "./pages/services/OperatorScripts";
import HelpBot from "./pages/services/HelpBot";
import YandexDirect from "./pages/services/YandexDirect";
import VKAds from "./pages/services/VKAds";
import WebAnalytics from "./pages/services/WebAnalytics";
import ABTesting from "./pages/services/ABTesting";
import MarketingStrategy from "./pages/services/MarketingStrategy";
import ContentPlan from "./pages/services/ContentPlan";
import CopywritingTexts from "./pages/services/CopywritingTexts";
import OfferPackaging from "./pages/services/OfferPackaging";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/barter" element={<Barter />} />
          <Route path="/barter/furniture" element={<BarterFurniture />} />
          <Route path="/barter/sto" element={<BarterSTO />} />
          <Route path="/barter/cleaning" element={<BarterCleaning />} />
          <Route path="/business-plans" element={<BusinessPlans />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          
          {/* Service pages */}
          <Route path="/services/tilda-website" element={<TildaWebsite />} />
          <Route path="/services/design-prototyping" element={<DesignPrototyping />} />
          <Route path="/services/branding" element={<Branding />} />
          <Route path="/services/naming-offers" element={<NamingOffers />} />
          <Route path="/services/vk-design" element={<VKDesign />} />
          <Route path="/services/chatbot-vk" element={<ChatbotVK />} />
          <Route path="/services/auto-responses" element={<AutoResponses />} />
          <Route path="/services/operator-scripts" element={<OperatorScripts />} />
          <Route path="/services/help-bot" element={<HelpBot />} />
          <Route path="/services/yandex-direct" element={<YandexDirect />} />
          <Route path="/services/vk-ads" element={<VKAds />} />
          <Route path="/services/web-analytics" element={<WebAnalytics />} />
          <Route path="/services/ab-testing" element={<ABTesting />} />
          <Route path="/services/marketing-strategy" element={<MarketingStrategy />} />
          <Route path="/services/content-plan" element={<ContentPlan />} />
          <Route path="/services/copywriting-texts" element={<CopywritingTexts />} />
          <Route path="/services/offer-packaging" element={<OfferPackaging />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
