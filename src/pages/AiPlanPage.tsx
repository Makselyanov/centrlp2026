import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Calculator,
  Send,
  Briefcase,
  Target,
  Zap,
  DollarSign,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// === EmailJS constants (твоя учётка) ===
const EMAILJS_SERVICE_ID = "service_ep2g9me";
const EMAILJS_TEMPLATE_ID = "template_b0xrz8b";
const EMAILJS_PUBLIC_KEY = "yzCN-4Aotl3kVqWlT";

// --- Types & Data ---

type ServiceId =
  | "site_tilda"
  | "design_prototype"
  | "branding"
  | "naming"
  | "vk_design"
  | "ai_audit"
  | "ai_site_bot"
  | "ai_messenger_bot"
  | "ai_integration"
  | "bp_basic"
  | "bp_extended"
  | "fin_model"
  | "ads_yandex_setup"
  | "ads_yandex_manage"
  | "ads_vk_setup"
  | "ads_vk_manage"
  | "ads_combo"
  | "support_mini"
  | "support_std"
  | "support_max"
  | "barter_furniture"
  | "barter_sto"
  | "barter_cleaning"
  | "barter_beauty"
  | "barter_travel";

type Service = {
  id: ServiceId;
  group:
    | "Сайты и упаковка"
    | "ИИ-внедрение"
    | "Бизнес-планы и расчёты"
    | "Реклама и трафик"
    | "Сопровождение"
    | "Бартер-пакеты";
  title: string;
  description: string;
  basePrice: number; // в рублях
  type: "one_time" | "monthly" | "barter";
};

const SERVICES: Service[] = [
  // Сайты и упаковка
  {
    id: "site_tilda",
    group: "Сайты и упаковка",
    title: "Сайт на Tilda (5–10 страниц)",
    description:
      "Продающий сайт под нишу, структура, дизайн, тексты, формы заявок, подключение аналитики.",
    basePrice: 95000,
    type: "one_time",
  },
  {
    id: "design_prototype",
    group: "Сайты и упаковка",
    title: "Дизайн и прототипирование",
    description:
      "Прототип и дизайн экранов без разработки — подходит, если у вас уже есть разработчики.",
    basePrice: 55000,
    type: "one_time",
  },
  {
    id: "branding",
    group: "Сайты и упаковка",
    title: "Фирменный стиль и логотип",
    description:
      "Логотип, базовый гайд по стилю, цвета, шрифты, примеры использования.",
    basePrice: 45000,
    type: "one_time",
  },
  {
    id: "naming",
    group: "Сайты и упаковка",
    title: "Нейминг и продающие офферы",
    description:
      "Помощь с названием, позиционированием и формулировкой основных офферов.",
    basePrice: 25000,
    type: "one_time",
  },
  {
    id: "vk_design",
    group: "Сайты и упаковка",
    title: "Оформление ВКонтакте",
    description:
      "Обложка, аватар, меню, блоки, структура контента под вашу нишу.",
    basePrice: 20000,
    type: "one_time",
  },

  // ИИ-внедрение
  {
    id: "ai_audit",
    group: "ИИ-внедрение",
    title: "Аудит и roadmap по AI",
    description:
      "Разберём процессы, предложим, куда логично внедрять AI, что отдавать боту, что — человеку.",
    basePrice: 30000,
    type: "one_time",
  },
  {
    id: "ai_site_bot",
    group: "ИИ-внедрение",
    title: "AI-чатбот на сайт",
    description:
      "Бот на сайте, который отвечает на вопросы, собирает заявки и помогает дожимать клиентов.",
    basePrice: 40000,
    type: "one_time",
  },
  {
    id: "ai_messenger_bot",
    group: "ИИ-внедрение",
    title: "AI-бот для VK / Telegram",
    description:
      "Бот в мессенджере, который ведёт диалог по скриптам и фиксирует заявки.",
    basePrice: 35000,
    type: "one_time",
  },
  {
    id: "ai_integration",
    group: "ИИ-внедрение",
    title: "Интеграции AI с CRM и сервисами",
    description:
      "Интеграции с CRM, таблицами, 1С, триггерами. Настройка связок под ваши процессы.",
    basePrice: 30000,
    type: "one_time",
  },

  // Бизнес-планы и расчёты
  {
    id: "bp_basic",
    group: "Бизнес-планы и расчёты",
    title: "Базовый бизнес-план",
    description:
      "Структурированный бизнес-план для малого бизнеса: концепция, рынок, базовые цифры.",
    basePrice: 45000,
    type: "one_time",
  },
  {
    id: "bp_extended",
    group: "Бизнес-планы и расчёты",
    title: "Расширенный бизнес-план с фин.моделью",
    description:
      "Подробный бизнес-план с финансовой моделью, сценариями и сроками окупаемости.",
    basePrice: 70000,
    type: "one_time",
  },
  {
    id: "fin_model",
    group: "Бизнес-планы и расчёты",
    title: "Финансовая модель и юнит-экономика",
    description:
      "Отдельная финмодель: юнит-экономика, точки безубыточности, что будет, если масштабироваться.",
    basePrice: 40000,
    type: "one_time",
  },

  // Реклама и трафик
  {
    id: "ads_yandex_setup",
    group: "Реклама и трафик",
    title: "Настройка рекламы в Яндекс",
    description:
      "Подбор запросов, структура кампаний, объявления, базовая аналитика.",
    basePrice: 30000,
    type: "one_time",
  },
  {
    id: "ads_yandex_manage",
    group: "Реклама и трафик",
    title: "Ведение Яндекс (месяц)",
    description:
      "Оптимизация, тест гипотез, отчётность по заявкам и цене лида.",
    basePrice: 20000,
    type: "monthly",
  },
  {
    id: "ads_vk_setup",
    group: "Реклама и трафик",
    title: "Настройка VK Ads",
    description:
      "Аудитории, креативы, связка с сайтом/сообществом, пиксели.",
    basePrice: 25000,
    type: "one_time",
  },
  {
    id: "ads_vk_manage",
    group: "Реклама и трафик",
    title: "Ведение VK Ads (месяц)",
    description: "Оптимизация, новые связки, отчётность.",
    basePrice: 18000,
    type: "monthly",
  },
  {
    id: "ads_combo",
    group: "Реклама и трафик",
    title: "Пакет: Яндекс + VK (настройка)",
    description:
      "Комплексная стартовая настройка Яндекс и VK Ads под одну воронку.",
    basePrice: 50000,
    type: "one_time",
  },

  // Сопровождение
  {
    id: "support_mini",
    group: "Сопровождение",
    title: "Сопровождение «Минимум» (месяц)",
    description:
      "Контроль воронок, базовая аналитика, 1–2 созвона в месяц.",
    basePrice: 25000,
    type: "monthly",
  },
  {
    id: "support_std",
    group: "Сопровождение",
    title: "Сопровождение «Стандарт» (месяц)",
    description:
      "Глубокий разбор, регулярные улучшения, отчёты, созвоны каждую неделю.",
    basePrice: 45000,
    type: "monthly",
  },
  {
    id: "support_max",
    group: "Сопровождение",
    title: "Сопровождение «Максимум» (месяц)",
    description:
      "Максимальное вовлечение, стратегические сессии, приоритетная поддержка.",
    basePrice: 80000,
    type: "monthly",
  },

  // Бартер-пакеты
  {
    id: "barter_furniture",
    group: "Бартер-пакеты",
    title: "Бартер для мебельщиков",
    description:
      "Работаем за мебель, встроенные решения, шоу-румные проекты. Считаем по обычным ставкам, но оплата работой/продуктом.",
    basePrice: 60000,
    type: "barter",
  },
  {
    id: "barter_sto",
    group: "Бартер-пакеты",
    title: "Бартер для СТО / детейлинга",
    description:
      "Реклама и упаковка в обмен на обслуживание авто: оклейка, детейлинг, ГБО и т.п.",
    basePrice: 60000,
    type: "barter",
  },
  {
    id: "barter_cleaning",
    group: "Бартер-пакеты",
    title: "Бартер для клининга",
    description:
      "Сайт, реклама, упаковка в обмен на клининг офисов/помещений.",
    basePrice: 50000,
    type: "barter",
  },
  {
    id: "barter_beauty",
    group: "Бартер-пакеты",
    title: "Бартер для бьюти-сфера",
    description:
      "Маркетинг в обмен на услуги салона, студий красоты.",
    basePrice: 40000,
    type: "barter",
  },
  {
    id: "barter_travel",
    group: "Бартер-пакеты",
    title: "Бартер для турагентств",
    description:
      "Маркетинг и AI-процессы в обмен на туры/услуги турагентства.",
    basePrice: 50000,
    type: "barter",
  },
];

// --- Component ---

export function AiPlanPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    niche: "",
    businessFormat: "",
    currentSituation: "",
    goals: "",
    selectedServices: [] as ServiceId[],
    budget: "",
    name: "",
    phone: "",
    messenger: "",
    consentPersonalData: false,
    consentMarketing: false,
  });
  const [errors, setErrors] = useState<{
    consentPersonalData?: string;
    name?: string;
    phone?: string;
    messenger?: string;
  }>({});
  const [selectedPackage, setSelectedPackage] = useState<
    "none" | "start" | "full" | "ads"
  >("none");

  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleService = (id: ServiceId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedServices.includes(id);
      if (isSelected) {
        return {
          ...prev,
          selectedServices: prev.selectedServices.filter((s) => s !== id),
        };
      } else {
        return {
          ...prev,
          selectedServices: [...prev.selectedServices, id],
        };
      }
    });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const calculateTotal = () => {
    let oneTime = 0;
    let monthly = 0;
    let barter = 0;

    formData.selectedServices.forEach((id) => {
      const service = SERVICES.find((s) => s.id === id);
      if (!service) return;

      if (service.type === "one_time") oneTime += service.basePrice;
      if (service.type === "monthly") monthly += service.basePrice;
      if (service.type === "barter") barter += service.basePrice;
    });

    return { oneTime, monthly, barter };
  };

  const totals = calculateTotal();

  const handleSubmit = async () => {
    const newErrors: typeof errors = {};
    if (!formData.name) newErrors.name = "Введите имя";
    if (!formData.phone) newErrors.phone = "Введите телефон";
    if (!formData.messenger) newErrors.messenger = "Выберите мессенджер";
    if (!formData.consentPersonalData) {
      newErrors.consentPersonalData =
        "Нужно согласиться с обработкой персональных данных";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }
    setErrors({});

    try {
      const templateParams = {
        ...formData,
        selectedServices: formData.selectedServices.join(", "),
        selectedPackage,
        totalOneTime: totals.oneTime,
        totalMonthly: totals.monthly,
        totalBarter: totals.barter,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в течение 24 часов.",
      });

      // Сбрасываем только контакты и согласие, выбор услуг оставляем
      setFormData((prev) => ({
        ...prev,
        name: "",
        phone: "",
        messenger: "",
        consentPersonalData: false,
      }));
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Ошибка отправки",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 pt-24 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-12 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Zap className="w-3 h-3 mr-1" />
            Конструктор внедрения
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Персональный план внедрения AI и маркетинга
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ответьте на вопросы и выберите нужные услуги — мы соберём для вас по
            шагам план внедрения с примерной стоимостью и сроками.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-slate-500">
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-1 text-green-500" /> Без оплаты
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-1 text-green-500" /> Без
              обязательств
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-1 text-green-500" /> 5–7 минут
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Stepper */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-500 -z-10"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-4",
                    step >= num
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-slate-400 border-slate-200"
                  )}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500 px-1">
              <span>Ниша</span>
              <span>Точка А</span>
              <span>Услуги</span>
              <span>Бюджет</span>
              <span>Итог</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 max-w-6xl mx-auto">
            {/* Left Column: Form Steps */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 md:p-8 shadow-lg border-slate-100">
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                            <Briefcase className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">
                              Ниша и формат бизнеса
                            </h2>
                            <p className="text-slate-500">
                              Расскажите немного о своем проекте
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="niche">
                              Ваша ниша / сфера деятельности
                            </Label>
                            <Input
                              id="niche"
                              placeholder="Например: Производство мебели, Салон красоты, СТО..."
                              value={formData.niche}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  niche: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Формат работы</Label>
                            <RadioGroup
                              value={formData.businessFormat}
                              onValueChange={(val) =>
                                setFormData({
                                  ...formData,
                                  businessFormat: val,
                                })
                              }
                              className="grid sm:grid-cols-2 gap-4"
                            >
                              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                <RadioGroupItem value="offline" id="offline" />
                                <Label
                                  htmlFor="offline"
                                  className="cursor-pointer w-full"
                                >
                                  Офлайн (офис, точка, производство)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                <RadioGroupItem value="online" id="online" />
                                <Label
                                  htmlFor="online"
                                  className="cursor-pointer w-full"
                                >
                                  Онлайн (удаленно, интернет-магазин)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                <RadioGroupItem value="hybrid" id="hybrid" />
                                <Label
                                  htmlFor="hybrid"
                                  className="cursor-pointer w-full"
                                >
                                  Гибридный формат
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                <RadioGroupItem value="startup" id="startup" />
                                <Label
                                  htmlFor="startup"
                                  className="cursor-pointer w-full"
                                >
                                  Только запускаюсь (стартап)
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                            <Target className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">
                              Текущая точка А
                            </h2>
                            <p className="text-slate-500">
                              Что есть сейчас и к чему хотите прийти
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="situation">
                              Опишите текущую ситуацию
                            </Label>
                            <Textarea
                              id="situation"
                              placeholder="Есть сайт, но нет заявок. Или: работаем по сарафану, хотим масштабироваться..."
                              className="h-32"
                              value={formData.currentSituation}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  currentSituation: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="goals">
                              Главная цель на ближайшие 3 месяца
                            </Label>
                            <Input
                              id="goals"
                              placeholder="Например: Получить 50 заявок в месяц, Внедрить CRM..."
                              value={formData.goals}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  goals: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                            <Zap className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">Выбор услуг</h2>
                            <p className="text-slate-500">
                              Отметьте, что вам необходимо внедрить
                            </p>
                          </div>
                        </div>

                        <div className="space-y-8">
                          {[
                            "Бизнес-планы и расчёты",
                            "Сайты и упаковка",
                            "ИИ-внедрение",
                            "Реклама и трафик",
                            "Сопровождение",
                            "Бартер-пакеты",
                          ].map((group) => (
                            <div key={group}>
                              <h3 className="font-semibold text-lg mb-4 text-slate-800 flex items-center">
                                {group}
                                <span className="ml-2 h-px flex-1 bg-slate-200" />
                              </h3>
                              <div className="grid gap-4">
                                {SERVICES.filter(
                                  (s) => s.group === group
                                ).map((service) => (
                                  <div
                                    key={service.id}
                                    className={cn(
                                      "relative flex items-start p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md",
                                      formData.selectedServices.includes(
                                        service.id
                                      )
                                        ? "border-primary bg-primary/5"
                                        : "border-slate-100 bg-white hover:border-slate-200"
                                    )}
                                    onClick={() => toggleService(service.id)}
                                  >
                                    <div className="flex items-center h-5 mt-1 mr-4">
                                      <Checkbox
                                        checked={formData.selectedServices.includes(
                                          service.id
                                        )}
                                        onCheckedChange={() =>
                                          toggleService(service.id)
                                        }
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-900">
                                          {service.title}
                                        </h4>
                                        <span className="text-sm font-semibold text-primary whitespace-nowrap ml-2">
                                          {service.basePrice.toLocaleString()} ₽
                                          {service.type === "monthly" &&
                                            "/мес"}
                                        </span>
                                      </div>
                                      <p className="text-sm text-slate-500 leading-relaxed">
                                        {service.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                            <DollarSign className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">
                              Бюджет и сроки
                            </h2>
                            <p className="text-slate-500">
                              Ориентиры для старта работ
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label>
                              Комфортный бюджет на запуск (единоразово)
                            </Label>
                            <RadioGroup
                              value={formData.budget}
                              onValueChange={(val) =>
                                setFormData({ ...formData, budget: val })
                              }
                              className="grid sm:grid-cols-2 gap-4"
                            >
                              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <RadioGroupItem value="up_to_50k" id="b1" />
                                <Label
                                  htmlFor="b1"
                                  className="cursor-pointer w-full"
                                >
                                  До 50 000 ₽
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <RadioGroupItem value="50k_100k" id="b2" />
                                <Label
                                  htmlFor="b2"
                                  className="cursor-pointer w-full"
                                >
                                  50 000 — 100 000 ₽
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <RadioGroupItem value="100k_200k" id="b3" />
                                <Label
                                  htmlFor="b3"
                                  className="cursor-pointer w-full"
                                >
                                  100 000 — 200 000 ₽
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <RadioGroupItem value="200k_plus" id="b4" />
                                <Label
                                  htmlFor="b4"
                                  className="cursor-pointer w-full"
                                >
                                  От 200 000 ₽
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex gap-3">
                            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-800">
                              Мы всегда стараемся подобрать решение под бюджет.
                              Если выбранные услуги выходят за рамки, мы
                              предложим поэтапное внедрение или альтернативы.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                            <Send className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">
                              Итог и контакты
                            </h2>
                            <p className="text-slate-500">
                              Куда отправить готовый план внедрения?
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4 max-w-md mx-auto">
                          <div className="space-y-2">
                            <Label htmlFor="name">Ваше имя</Label>
                            <Input
                              id="name"
                              placeholder="Иван Иванов"
                              value={formData.name}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                });
                                if (errors.name)
                                  setErrors({ ...errors, name: undefined });
                              }}
                              className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.name}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Телефон / WhatsApp</Label>
                            <Input
                              id="phone"
                              placeholder="+7 (999) 000-00-00"
                              value={formData.phone}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                });
                                if (errors.phone)
                                  setErrors({ ...errors, phone: undefined });
                              }}
                              className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.phone}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="messenger">
                              Удобный мессенджер
                            </Label>
                            <RadioGroup
                              value={formData.messenger}
                              onValueChange={(val) => {
                                setFormData({
                                  ...formData,
                                  messenger: val,
                                });
                                if (errors.messenger)
                                  setErrors({
                                    ...errors,
                                    messenger: undefined,
                                  });
                              }}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="telegram" id="tg" />
                                <Label htmlFor="tg">Telegram</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="whatsapp" id="wa" />
                                <Label htmlFor="wa">WhatsApp</Label>
                              </div>
                            </RadioGroup>
                            {errors.messenger && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.messenger}
                              </p>
                            )}
                          </div>

                          <div className="pt-4 space-y-4">
                            <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                              <div className="flex items-start space-x-3">
                                <Checkbox
                                  id="consentPersonalData"
                                  checked={formData.consentPersonalData}
                                  onCheckedChange={(checked) => {
                                    const v = checked as boolean;
                                    setFormData({
                                      ...formData,
                                      consentPersonalData: v,
                                    });
                                    if (v)
                                      setErrors({
                                        ...errors,
                                        consentPersonalData: undefined,
                                      });
                                  }}
                                />
                                <div className="grid gap-1.5 leading-none">
                                  <Label
                                    htmlFor="consentPersonalData"
                                    className="text-sm font-medium leading-snug cursor-pointer"
                                  >
                                    Я согласен(а) на обработку персональных
                                    данных и принимаю условия политики
                                    конфиденциальности.
                                  </Label>
                                  {errors.consentPersonalData && (
                                    <p className="text-xs text-red-500 font-medium">
                                      {errors.consentPersonalData}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-start space-x-3">
                                <Checkbox
                                  id="consentMarketing"
                                  checked={formData.consentMarketing}
                                  onCheckedChange={(checked) =>
                                    setFormData({
                                      ...formData,
                                      consentMarketing: checked as boolean,
                                    })
                                  }
                                />
                                <Label
                                  htmlFor="consentMarketing"
                                  className="text-sm font-medium leading-snug cursor-pointer text-slate-600"
                                >
                                  Хочу получать от CentrLP полезные разборы,
                                  кейсы и новости об AI-внедрении.
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl mt-8">
                          <h3 className="font-bold mb-4">
                            Что произойдет дальше?
                          </h3>
                          <ul className="space-y-3 text-sm text-slate-600">
                            <li className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                                1
                              </div>
                              Я проанализирую ваши ответы и выбранные услуги.
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                                2
                              </div>
                              Составлю пошаговый план внедрения (Roadmap) с
                              точными сроками.
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                                3
                              </div>
                              Свяжусь с вами в течение 24 часов, чтобы
                              презентовать план.
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={step === 1}
                      className="px-8"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Назад
                    </Button>

                    {step < 5 ? (
                      <Button
                        onClick={nextStep}
                        className="px-8 bg-primary hover:bg-primary/90 text-white"
                      >
                        Дальше
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        className="px-8 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                      >
                        Получить план
                        <Send className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Summary Panel */}
            <div className="lg:block">
              <div className="sticky top-24 space-y-6">
                <Card className="p-6 shadow-xl border-t-4 border-t-primary bg-white/90 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4 text-primary font-bold uppercase tracking-wider text-xs">
                    <Calculator className="w-4 h-4" />
                    Ваш план
                  </div>

                  {formData.selectedServices.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">
                      Выберите услуги на 3-м шаге, чтобы увидеть расчёт
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {formData.selectedServices.map((id) => {
                          const s = SERVICES.find((serv) => serv.id === id);
                          if (!s) return null;
                          return (
                            <div
                              key={id}
                              className="flex justify-between text-sm group"
                            >
                              <span className="text-slate-700 group-hover:text-primary transition-colors">
                                {s.title}
                              </span>
                              <span className="font-semibold whitespace-nowrap ml-2">
                                {s.basePrice.toLocaleString()} ₽
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="h-px bg-slate-200 my-4" />

                      <div className="space-y-2">
                        {totals.oneTime > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-sm">
                              Разово:
                            </span>
                            <span className="font-bold text-lg">
                              {totals.oneTime.toLocaleString()} ₽
                            </span>
                          </div>
                        )}
                        {totals.monthly > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-sm">
                              Ежемесячно:
                            </span>
                            <span className="font-bold text-lg">
                              {totals.monthly.toLocaleString()} ₽/мес
                            </span>
                          </div>
                        )}
                        {totals.barter > 0 && (
                          <div className="flex justify-between items-center text-green-600">
                            <span className="text-sm font-medium">
                              Бартер (услугами):
                            </span>
                            <span className="font-bold text-lg">
                              ~{totals.barter.toLocaleString()} ₽
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-800 leading-relaxed">
                  <span className="font-bold block mb-1">⚡️ Важно:</span>
                  Это предварительный расчёт. Итоговая стоимость может
                  измениться после детального обсуждения ТЗ. Мы всегда
                  фиксируем цену в договоре.
                </div>

                {/* Ready Packages Block */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Или выберите готовый пакет
                    </h3>
                    <p className="text-xs text-slate-500">
                      Если не хотите разбираться в деталях — можно просто начать
                      с одного из типовых пакетов.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Package Start */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-800">Старт</span>
                        <span className="text-sm font-semibold text-primary">
                          от 60 000 ₽
                        </span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 mb-3">
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" /> Сайт
                          5–7 страниц на Tilda
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          Базовое оформление VK
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          Яндекс.Метрика и цели
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          Формы заявок
                        </li>
                      </ul>
                      <button
                        type="button"
                        onClick={() => navigate("/prices#start")}
                        className="w-full py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        Подробнее
                      </button>
                    </div>

                    {/* Package Turnkey */}
                    <div
                      className={cn(
                        "bg-white rounded-2xl border-2 p-4 shadow-md relative overflow-hidden transition-all",
                        selectedPackage === "full"
                          ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                          : "border-sky-400"
                      )}
                    >
                      <div className="absolute top-0 right-0 bg-sky-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                        Популярный
                      </div>
                      <div className="flex justify-between items-start mb-2 mt-1">
                        <span className="font-bold text-slate-800">
                          Под ключ
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          от 80 000 ₽
                        </span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 mb-3">
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" /> Всё
                          из пакета «Старт»
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          Чат-боты VK и сайт
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          ИИ-скрипты и автоответы
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          Запуск рекламы (2 канала)
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          Первый отчёт через 7 дней
                        </li>
                      </ul>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPackage("full");
                          setStep(5);
                        }}
                        className="w-full py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-sm"
                      >
                        Выбрать пакет
                      </button>
                    </div>

                    {/* Package Ads */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-800">
                          Ведение рекламы
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          30 000 ₽/мес
                        </span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 mb-3">
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          Ведение кампаний Яндекс и VK
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          A/B-тесты креативов
                        </li>
                        <li className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-500" />{" "}
                          Еженедельные отчёты
                        </li>
                        <li className="flex items-center text-slate-400 italic">
                          + рекламный бюджет
                        </li>
                      </ul>
                      <button
                        type="button"
                        onClick={() => navigate("/prices#ads")}
                        className="w-full py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
