import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { getAttributionSnapshot, trackMetric } from "@/lib/metrics";
import { createLeadSubmissionId, readLeadReceipt } from "@/lib/leadReceipt";
import { MessengerLinks } from "./MessengerLinks";

const goalOptions = [
  "Экспресс-разбор заявок",
  "Проверка сайта по персональным данным",
  "Маркетинговая стратегия и медиаплан",
  "Сайт или лендинг под заявки",
  "Яндекс Директ и заявки",
  "Продвижение ВКонтакте и заявки",
  "Веб-аналитика и цели",
  "CRM и учет заявок",
  "Бот или автоматизация",
] as const;

const submitLabelByGoal: Record<(typeof goalOptions)[number], string> = {
  "Экспресс-разбор заявок": "Получить экспресс-разбор",
  "Проверка сайта по персональным данным": "Получить проверку сайта",
  "Маркетинговая стратегия и медиаплан": "Получить расчет стратегии",
  "Сайт или лендинг под заявки": "Обсудить сайт под заявки",
  "Яндекс Директ и заявки": "Обсудить Директ под заявки",
  "Продвижение ВКонтакте и заявки": "Обсудить продвижение ВКонтакте",
  "Веб-аналитика и цели": "Получить расчёт аналитики",
  "CRM и учет заявок": "Обсудить CRM для заявок",
  "Бот или автоматизация": "Обсудить автоматизацию",
};

const goalMetricPlacements = [
  "goal_express_audit",
  "goal_compliance",
  "goal_marketing_strategy",
  "goal_website_landing",
  "goal_yandex_direct",
  "goal_vk_promotion",
  "goal_web_analytics",
  "goal_crm",
  "goal_bot_automation",
] as const;

const getGoalMetricPlacement = (goal: (typeof goalOptions)[number]) =>
  goalMetricPlacements[goalOptions.indexOf(goal)] || "goal_unknown";

const getDefaultGoal = (pathname: string): (typeof goalOptions)[number] => {
  if (pathname === "/services/compliance-2026") {
    return "Проверка сайта по персональным данным";
  }

  if (pathname === "/services/marketing-strategy") {
    return "Маркетинговая стратегия и медиаплан";
  }

  if (pathname === "/services/website-development" || pathname === "/razrabotka-sajtov-tyumen") {
    return "Сайт или лендинг под заявки";
  }

  if (pathname === "/services/yandex-direct" || pathname === "/nastroyka-yandex-direct-tyumen") {
    return "Яндекс Директ и заявки";
  }

  if (pathname === "/services/vk-ads") {
    return "Продвижение ВКонтакте и заявки";
  }

  if (pathname === "/services/web-analytics") {
    return "Веб-аналитика и цели";
  }

  if (pathname === "/services/custom-crm" || pathname === "/crm-dlya-biznesa") {
    return "CRM и учет заявок";
  }

  if (
    pathname === "/services/telegram-lead-agent" ||
    pathname === "/services/n8n-automation" ||
    pathname === "/services/ai-agents" ||
    pathname === "/ai-avtomatizaciya-biznesa"
  ) {
    return "Бот или автоматизация";
  }

  return "Экспресс-разбор заявок";
};

export const ContactForm = () => {
  const { toast } = useToast();
  const location = useLocation();
  const leadSubmissionIdRef = useRef<string | null>(null);
  const defaultGoal = getDefaultGoal(location.pathname);
  const formIntent = new URLSearchParams(location.search).get("intent") || "";
  const auditFocus = new URLSearchParams(location.search).get("audit_focus") || "";
  const auditFocusComment = auditFocus === "traffic"
    ? "Фокус аудита: на сайт почти не заходят; нужно отделить проблему трафика от проблемы страницы."
    : auditFocus === "conversion"
      ? "Фокус аудита: посетители есть, но не обращаются; проверить оффер, CTA, мобильные контакты и форму."
      : auditFocus === "delivery"
        ? "Фокус аудита: обращения могут теряться после отправки; проверить цели, уведомления, CRM и скорость ответа."
        : auditFocus === "mobile"
          ? "Фокус аудита: с телефона обращаются заметно реже; проверить первый экран, CTA, поля, клавиатуру, ошибки и подтверждение отправки."
        : "";
  const isSiteBriefIntent = formIntent === "site-brief";
  const isAuditIntent = formIntent === "site-audit";
  const isWebAnalyticsIntent = formIntent === "web-analytics";
  const isWebAnalyticsBasicIntent = formIntent === "web-analytics-basic";
  const isWebAnalyticsAdvancedIntent = formIntent === "web-analytics-advanced";
  const isWebAnalyticsFullIntent = formIntent === "web-analytics-full";
  const isDirectLaunchIntent = formIntent === "direct-launch";
  const isDirectManagementIntent = formIntent === "direct-management";
  const isDirectAuditIntent = formIntent === "direct-audit";
  const isVkContentIntent = formIntent === "vk-content";
  const isVkAdsIntent = formIntent === "vk-ads";
  const isVkComplexIntent = formIntent === "vk-complex";
  const isMarketingExpressIntent = formIntent === "marketing-express";
  const isMarketingFullIntent = formIntent === "marketing-full";
  const isMarketingImplementationIntent = formIntent === "marketing-implementation";
  const isCustomCrmIntent = formIntent === "custom-crm";
  const isCrmStartIntent = formIntent === "crm-start";
  const isMarketingStrategyPage = location.pathname === "/services/marketing-strategy";
  const isWebsiteDevelopmentPage =
    location.pathname === "/services/website-development" || location.pathname === "/razrabotka-sajtov-tyumen";
  const isYandexDirectPage =
    location.pathname === "/services/yandex-direct" || location.pathname === "/nastroyka-yandex-direct-tyumen";
  const isWebAnalyticsPage = location.pathname === "/services/web-analytics";
  const introTitle = isSiteBriefIntent
    ? "Готовый бриф можно сразу отправить на расчёт сайта."
    : isAuditIntent
      ? "Отправьте сайт на экспресс-аудит за 48 часов."
    : isMarketingExpressIntent
      ? "Заказать экспресс-план маркетинга от 35 000 ₽."
      : isMarketingFullIntent
        ? "Обсудить полную маркетинговую стратегию от 55 000 ₽."
        : isMarketingImplementationIntent
          ? "Обсудить стратегию с внедрением от 80 000 ₽."
    : isCustomCrmIntent
      ? "Опишите процесс — подготовим первый контур персональной CRM."
    : isCrmStartIntent
      ? "Соберём стартовый CRM-контур от 45 000 ₽."
    : isWebAnalyticsBasicIntent
      ? "Настроим базовую Метрику и цели от 15 000 ₽."
    : isWebAnalyticsAdvancedIntent
      ? "Соберём расширенную аналитику от 30 000 ₽."
    : isWebAnalyticsFullIntent
      ? "Свяжем сайт, рекламу и CRM от 50 000 ₽."
    : isMarketingStrategyPage
    ? "Можно начать с короткого запроса на план маркетинга и медиаплан."
    : isWebsiteDevelopmentPage
      ? "Можно начать с короткого запроса на сайт или лендинг под заявки."
      : isDirectLaunchIntent
        ? "Рассчитаем запуск Яндекс Директа под одну приоритетную услугу."
        : isDirectManagementIntent
          ? "Разберём ведение и оптимизацию действующих кампаний."
          : isDirectAuditIntent
            ? "Проверим, где действующая реклама теряет бюджет и заявки."
          : isVkContentIntent
            ? "Обсудим ведение сообщества и контент от 15 000 ₽ в месяц."
          : isVkAdsIntent
            ? "Рассчитаем ведение VK Ads от 30 000 ₽ в месяц."
          : isVkComplexIntent
            ? "Соберём комплексный маршрут ВКонтакте до измеримой заявки."
      : isYandexDirectPage
        ? "Можно начать с короткого расчета запуска или проверки действующей рекламы."
        : isWebAnalyticsPage
          ? "Можно начать с проверки Метрики, целей и маршрута заявки."
    : "Можно начать с короткого разбора сайта, формы и маршрута заявки.";
  const introDescription = isSiteBriefIntent
    ? "Укажите имя и телефон, затем вставьте ответы на 12 вопросов в поле комментария. Этого достаточно, чтобы оценить формат, сроки и бюджет первого запуска."
    : isAuditIntent
      ? "Для первого ответа достаточно имени, телефона и ссылки на сайт. Уточним, есть ли трафик, как работает мобильная форма, Метрика и передача обращения менеджеру."
    : isMarketingExpressIntent
      ? "За 7–10 рабочих дней подготовим приоритетные каналы, оффер, медиаплан на 30–90 дней, ориентиры по бюджету и список первых правок."
      : isMarketingFullIntent
        ? "Разберём сегменты, конкурентов, позиционирование, экономику, каналы, KPI и дорожную карту. Срок и точный состав уточним по нише и доступным данным."
        : isMarketingImplementationIntent
          ? "Кроме стратегии оценим запуск первых кампаний, аналитику, посадочные правки и контроль обращений. Итоговый объём зависит от каналов и текущей инфраструктуры."
    : isCustomCrmIntent
      ? "Для первого расчёта достаточно описать, откуда приходят заявки, кто с ними работает, какие этапы, документы и отчёты нужны. Разработка персональной CRM начинается от 180 000 ₽; состав и этапы фиксируем после разбора процесса."
    : isCrmStartIntent
      ? "Укажите источники заявок, число пользователей, основные этапы и текущий способ учёта. Проверим, достаточно ли настройки готовой CRM или нужен другой формат. Лицензии и внешние сервисы считаются отдельно."
    : isWebAnalyticsBasicIntent
      ? "Укажите сайт, основные формы и действия, которые нужно считать обращениями. В базовый формат входят Метрика, до пяти целей, проверка событий и инструкция по отчётам."
    : isWebAnalyticsAdvancedIntent
      ? "Укажите сайт, рекламные каналы, формы и нужные отчёты. Состав дополнительных событий, электронной торговли и источников фиксируем до начала работ."
    : isWebAnalyticsFullIntent
      ? "Укажите сайт, рекламные системы, CRM или журнал заявок и ответственных сотрудников. Сначала составим карту интеграций и границы сквозной связки."
    : isMarketingStrategyPage
    ? "Для первого контакта достаточно имени, телефона и пары слов о задаче. Нишу, город, текущие каналы и ссылку на проект можно уточнить уже после первого ответа."
    : isWebsiteDevelopmentPage
      ? "Для первого контакта достаточно имени, телефона и пары слов о задаче: новая страница, сайт услуг, доработка старого сайта или связка с CRM. Детали можно уточнить после первого ответа."
      : isDirectLaunchIntent
        ? "Укажите нишу, город, приоритетную услугу и ссылку на посадочную. Для запуска отдельно считаются настройка от 20 000 ₽ и рекламный бюджет в Яндексе."
        : isDirectManagementIntent
          ? "Добавьте ссылку на сайт и кратко укажите, какие кампании уже работают, какой расход и какие обращения бизнес считает целевыми. Ведение начинается от 30 000 ₽ в месяц."
          : isDirectAuditIntent
            ? "Добавьте ссылку на сайт и опишите текущую рекламу: Поиск или РСЯ, период работы, расход, цели Метрики и полученные обращения. Стоимость аудита определим после состава кабинета и задачи."
          : isVkContentIntent
            ? "Укажите ссылку на сообщество, нишу, регион, частоту публикаций и целевое действие: сообщение, звонок или переход на сайт."
          : isVkAdsIntent
            ? "Укажите ссылку на сообщество или сайт, регион, рекламный бюджет и какое обращение бизнес считает целевым. Медиабюджет оплачивается отдельно."
          : isVkComplexIntent
            ? "Укажите текущую площадку, услугу и маршрут обращения. Проверим, нужны ли контент, VK Ads, лид-форма, сайт, аналитика или CRM."
      : isYandexDirectPage
        ? "Для первого ответа достаточно контакта и пары слов о нише. Если реклама уже идет, добавьте ссылку на сайт и укажите, что важнее сейчас: снизить стоимость заявки, проверить Поиск или РСЯ, настроить цели либо пересобрать кампании."
        : isWebAnalyticsPage
          ? "Для первого ответа достаточно имени, телефона и ссылки на сайт. Уточните, какие формы и рекламные каналы нужно связать с заявками; доступы можно безопасно предоставить после согласования работ."
    : "Оставьте контакт и выберите ближайшую задачу. Если заявок мало, начнем с проверки формы, первого экрана, Метрики и скорости ответа.";
  const commentPlaceholder = isSiteBriefIntent
    ? "Вставьте сюда ответы на 12 вопросов из брифа. Можно отвечать коротко и пропускать то, что пока неизвестно."
    : isAuditIntent
      ? "Добавьте ссылку на сайт и коротко опишите: откуда приходит трафик, сколько обращений сейчас и что уже пробовали менять."
    : isMarketingExpressIntent
      ? "Например: нужен экспресс-план для одной услуги в Тюмени; текущие каналы; ориентир рекламного бюджета; что должно измениться за 30–90 дней"
      : isMarketingFullIntent
        ? "Например: нужна полная стратегия; основные услуги и сегменты; текущие каналы и продажи; какие решения должен дать документ"
        : isMarketingImplementationIntent
          ? "Например: нужна стратегия и запуск; какие каналы уже есть; что требуется внедрить на сайте, в аналитике, рекламе и CRM"
    : isCustomCrmIntent
      ? "Например: заявки приходят с сайта и из мессенджеров; три роли; семь этапов сделки; нужны документы, напоминания и отчёт руководителя"
    : isCrmStartIntent
      ? "Например: сайт, телефон и Telegram; два менеджера; сейчас ведём таблицу; нужны ответственные, задачи, UTM и отчёт по статусам"
    : isWebAnalyticsBasicIntent
      ? "Например: одна форма, клики по телефону и Telegram, до пяти целей, отчёт по источникам"
    : isWebAnalyticsAdvancedIntent
      ? "Например: несколько форм и рекламных каналов, UTM, дополнительные события, электронная торговля и отчёты"
    : isWebAnalyticsFullIntent
      ? "Например: связать сайт, Директ, VK, формы и CRM; сохранить источник заявки и статус обработки"
    : isMarketingStrategyPage
    ? "Например: нужен план маркетинга с ценой и сроками; собрать медиаплан; понять, какие каналы тестировать в ближайшие 30-60 дней"
    : isWebsiteDevelopmentPage
      ? "Например: нужен лендинг под услугу; сайт услуг в Тюмени; переделать старый сайт, чтобы заявки не терялись; связать форму с CRM"
      : isDirectLaunchIntent
        ? "Например: запустить Поиск для одной услуги в Тюмени; подготовить РСЯ; проверить посадочную и цели перед стартом"
        : isDirectManagementIntent
          ? "Например: снизить долю нецелевых запросов; очистить площадки РСЯ; связать расходы с полученными заявками; настроить регулярный отчёт"
          : isDirectAuditIntent
            ? "Например: проверить поисковые фразы, площадки РСЯ, цели Метрики, UTM, посадочную и доставку заявки менеджеру"
          : isVkContentIntent
            ? "Например: сообщество услуг в Тюмени; нужен контент-план и публикации; заявки должны приходить в сообщения"
          : isVkAdsIntent
            ? "Например: запустить VK Ads на одну услугу; бюджет; ссылка на посадочную; целевая заявка; способ учёта обращений"
          : isVkComplexIntent
            ? "Например: привести в порядок сообщество, запустить рекламу, разметить ссылки UTM и передавать заявки менеджеру"
      : isYandexDirectPage
        ? "Например: запустить Поиск и РСЯ с нуля; проверить действующие кампании; настроить цели Метрики; снизить стоимость заявки; подготовить посадочную под рекламу"
        : isWebAnalyticsPage
          ? "Например: настроить Метрику и цели; проверить отправку формы и ошибки; сохранить UTM; связать обращения с CRM; подготовить отчёт по источникам заявок"
    : "Например: понять, почему сайт не дает заявок; проверить форму и Метрику; связать обращения с CRM";

  const [taskDetailsOpen, setTaskDetailsOpen] = useState(
    isSiteBriefIntent ||
      isAuditIntent ||
      isWebAnalyticsIntent ||
      isWebAnalyticsBasicIntent ||
      isWebAnalyticsAdvancedIntent ||
      isWebAnalyticsFullIntent ||
      isDirectLaunchIntent ||
      isDirectManagementIntent ||
      isDirectAuditIntent ||
      isVkContentIntent ||
      isVkAdsIntent ||
      isVkComplexIntent ||
      isMarketingExpressIntent ||
      isMarketingFullIntent ||
      isMarketingImplementationIntent ||
      isCustomCrmIntent ||
      isCrmStartIntent,
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    business: "",
    city: "",
    link: "",
    goal: defaultGoal as (typeof goalOptions)[number],
    comment: auditFocusComment,
    privacyAccepted: false,
    cookiesAccepted: false,
  });

  useEffect(() => {
    if (formIntent) setTaskDetailsOpen(true);
  }, [formIntent]);

  useEffect(() => {
    if (!auditFocusComment) return;
    setFormData((current) => current.comment ? current : { ...current, comment: auditFocusComment });
  }, [auditFocusComment]);

  useEffect(() => {
    if (!formIntent) return;

    trackMetric("contextual_form_view", {
      path: location.pathname,
      placement: auditFocus ? `${formIntent}:${auditFocus}` : formIntent,
    });
  }, [auditFocus, formIntent, location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAccepted) {
      toast({
        title: "Ошибка",
        description: "Нужно согласие на обработку персональных данных.",
        variant: "destructive",
      });
      return;
    }

    try {
      trackMetric("form_submit_attempt", { path: location.pathname });
      const leadSubmissionId = leadSubmissionIdRef.current || createLeadSubmissionId();
      leadSubmissionIdRef.current = leadSubmissionId;

      const pagePath = location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "");
      const leadHost =
        typeof window !== "undefined" &&
        (window.location.hostname === "barter.centrlp.ru" || import.meta.env.VITE_BARTER_HOST_PREVIEW === "1")
          ? "barter.centrlp.ru"
          : "centrlp.ru";

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          page_path: location.pathname,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          lead_source: `${leadHost}${pagePath}`,
          lead_submission_id: leadSubmissionId,
          attribution: getAttributionSnapshot(),
          consent_version: "consent-v1.0-2026-05-02",
          privacy_version: "privacy-v2.0-2026-04-17",
          cookies_version: "cookies-v2.0-2026-04-17",
        }),
      });

      const receipt = await readLeadReceipt(response);
      leadSubmissionIdRef.current = null;

      trackMetric("lead_form_submit", { path: location.pathname });
      trackMetric("lead_stored", { path: location.pathname, placement: receipt.receipt_id });
      if (receipt.crm_status === "sent") {
        trackMetric("lead_confirmed", { path: location.pathname, placement: receipt.receipt_id });
      }

      toast({
        title: "Заявка отправлена",
        description: (
          <div>
            <p className="mb-3">
              Спасибо. Заявка принята, номер подтверждения {receipt.receipt_id.slice(0, 8)}. Свяжемся с вами в ближайшее время. Если удобнее, можно сразу продолжить диалог в мессенджере.
            </p>
            <MessengerLinks variant="toast" />
          </div>
        ),
      });

      setFormData({
        name: "",
        phone: "",
        business: "",
        city: "",
        link: "",
        goal: defaultGoal,
        comment: "",
        privacyAccepted: false,
        cookiesAccepted: false,
      });
    } catch {
      trackMetric("lead_form_error", { path: location.pathname });
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или напишите нам сразу в MAX, Telegram, WhatsApp или VK.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-8"
      data-metric="form-submit"
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#0096D6]/15 bg-gradient-to-br from-[#0096D6]/[0.06] via-white to-[#44B78B]/[0.05] p-5">
          <div className="mb-2 inline-flex items-center rounded-full border border-[#0096D6]/15 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0096D6]">
            Быстрый старт
          </div>
          <h3 className="text-lg font-bold text-slate-900">{introTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{introDescription}</p>

          <div className="mt-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Главный канал связи
            </div>
            <MessengerLinks
              variant="fastlane"
              onMessengerClick={(messenger) =>
                trackMetric("messenger_click_fastlane", {
                  path: location.pathname,
                  messenger,
                })
              }
            />
          </div>

          <div className="mt-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Дополнительно
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:+79058248564"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-[#44B78B]/40 hover:text-[#44B78B]"
                data-metric="phone-click"
                onClick={() =>
                  trackMetric("phone_click_fastlane", {
                    path: location.pathname,
                  })
                }
              >
                <PhoneCall className="h-4 w-4" />
                Быстрый звонок
              </a>
              <div className="text-xs leading-5 text-slate-500">
                Telegram, WhatsApp и VK тоже доступны, если так удобнее.
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="mt-2"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>

          <div>
            <Label htmlFor="name">Имя <span className="font-normal text-slate-500">(необязательно)</span></Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2"
              autoComplete="name"
            />
          </div>
        </div>

        <p className="-mt-2 text-xs leading-5 text-slate-500">
          Для первого ответа достаточно телефона и согласия на обработку данных. Имя и детали задачи можно добавить, если удобно.
        </p>

        <details
          className="rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4"
          open={taskDetailsOpen}
          onToggle={(event) => setTaskDetailsOpen(event.currentTarget.open)}
        >
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-700">
            {isSiteBriefIntent
              ? "Вставить ответы из брифа"
              : isAuditIntent
                ? "Добавить ссылку и контекст аудита"
                : "Добавить задачу и комментарий"}
            <span className="ml-2 text-xs font-normal text-slate-500">(необязательно)</span>
          </summary>
          <div className="mt-4 space-y-6">
            <div>
              <Label>Что важнее сейчас</Label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {goalOptions.map((goal) => {
                  const active = formData.goal === goal;

                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, goal });
                        trackMetric("form_goal_select", {
                          path: location.pathname,
                          placement: getGoalMetricPlacement(goal),
                        });
                      }}
                      className={`rounded-xl border bg-white px-4 py-3 text-left text-sm font-medium transition-colors ${
                        active
                          ? "border-[#0096D6] bg-[#0096D6]/10 text-slate-950"
                          : "border-slate-200 text-slate-600 hover:border-[#44B78B]/40 hover:text-slate-900"
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Что хотите получить</Label>
              <Textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="mt-2 bg-white"
                rows={4}
                placeholder={commentPlaceholder}
              />
            </div>
          </div>
        </details>

        <details className="rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-700">
            Уточнить нишу, город и ссылку на сайт
            <span className="ml-2 text-xs font-normal text-slate-500">(необязательно)</span>
          </summary>
          <div className="mt-4 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="business">Бизнес / ниша</Label>
                <Input
                  id="business"
                  name="business"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="mt-2 bg-white"
                  placeholder="Например: услуги, клиника, студия, e-commerce"
                />
              </div>

              <div>
                <Label htmlFor="city">Город</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-2 bg-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="link">Ссылка на сайт / соцсеть</Label>
              <Input
                id="link"
                name="link"
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="mt-2 bg-white"
                placeholder="https://"
              />
            </div>
          </div>
        </details>

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={formData.privacyAccepted}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, privacyAccepted: checked as boolean })
              }
              required
            />
            <Label htmlFor="privacy" className="cursor-pointer text-sm leading-relaxed">
              Даю{" "}
              <Link to="/consent" className="text-primary hover:underline">
                согласие на обработку персональных данных
              </Link>{" "}
              и ознакомлен(а) с{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                политикой обработки персональных данных
              </Link>
              .
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="cookies"
              checked={formData.cookiesAccepted}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, cookiesAccepted: checked as boolean })
              }
            />
            <Label htmlFor="cookies" className="cursor-pointer text-sm leading-relaxed">
              Разрешаю аналитические cookie и ознакомлен(а) с{" "}
              <Link to="/cookies" className="text-primary hover:underline">
                политикой cookie
              </Link>
              . Это не обязательно для отправки заявки.
            </Label>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          {submitLabelByGoal[formData.goal]}
        </Button>

        <p className="text-center text-xs leading-5 text-slate-500">
          Обычно отвечаем в течение 15 минут в рабочее время. Если удобнее, можно сразу написать в MAX, Telegram,
          WhatsApp или VK.
        </p>
      </div>
    </form>
  );
};
