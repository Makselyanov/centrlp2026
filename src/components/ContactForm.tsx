import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { trackMetric } from "@/lib/metrics";
import { MessengerLinks } from "./MessengerLinks";

const goalOptions = [
  "Экспресс-разбор заявок",
  "Проверка сайта по персональным данным",
  "Маркетинговая стратегия и медиаплан",
  "Сайт или лендинг под заявки",
  "Яндекс Директ и заявки",
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
  const defaultGoal = getDefaultGoal(location.pathname);
  const formIntent = new URLSearchParams(location.search).get("intent") || "";
  const isSiteBriefIntent = formIntent === "site-brief";
  const isAuditIntent = formIntent === "site-audit";
  const isWebAnalyticsIntent = formIntent === "web-analytics";
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
    : isMarketingStrategyPage
    ? "Можно начать с короткого запроса на план маркетинга и медиаплан."
    : isWebsiteDevelopmentPage
      ? "Можно начать с короткого запроса на сайт или лендинг под заявки."
      : isYandexDirectPage
        ? "Можно начать с короткого расчета запуска или проверки действующей рекламы."
        : isWebAnalyticsPage
          ? "Можно начать с проверки Метрики, целей и маршрута заявки."
    : "Можно начать с короткого разбора сайта, формы и маршрута заявки.";
  const introDescription = isSiteBriefIntent
    ? "Укажите имя и телефон, затем вставьте ответы на 12 вопросов в поле комментария. Этого достаточно, чтобы оценить формат, сроки и бюджет первого запуска."
    : isAuditIntent
      ? "Для первого ответа достаточно имени, телефона и ссылки на сайт. Уточним, есть ли трафик, как работает мобильная форма, Метрика и передача обращения менеджеру."
    : isMarketingStrategyPage
    ? "Для первого контакта достаточно имени, телефона и пары слов о задаче. Нишу, город, текущие каналы и ссылку на проект можно уточнить уже после первого ответа."
    : isWebsiteDevelopmentPage
      ? "Для первого контакта достаточно имени, телефона и пары слов о задаче: новая страница, сайт услуг, доработка старого сайта или связка с CRM. Детали можно уточнить после первого ответа."
      : isYandexDirectPage
        ? "Для первого ответа достаточно контакта и пары слов о нише. Если реклама уже идет, добавьте ссылку на сайт и укажите, что важнее сейчас: снизить стоимость заявки, проверить Поиск или РСЯ, настроить цели либо пересобрать кампании."
        : isWebAnalyticsPage
          ? "Для первого ответа достаточно имени, телефона и ссылки на сайт. Уточните, какие формы и рекламные каналы нужно связать с заявками; доступы можно безопасно предоставить после согласования работ."
    : "Оставьте контакт и выберите ближайшую задачу. Если заявок мало, начнем с проверки формы, первого экрана, Метрики и скорости ответа.";
  const commentPlaceholder = isSiteBriefIntent
    ? "Вставьте сюда ответы на 12 вопросов из брифа. Можно отвечать коротко и пропускать то, что пока неизвестно."
    : isAuditIntent
      ? "Добавьте ссылку на сайт и коротко опишите: откуда приходит трафик, сколько обращений сейчас и что уже пробовали менять."
    : isMarketingStrategyPage
    ? "Например: нужен план маркетинга с ценой и сроками; собрать медиаплан; понять, какие каналы тестировать в ближайшие 30-60 дней"
    : isWebsiteDevelopmentPage
      ? "Например: нужен лендинг под услугу; сайт услуг в Тюмени; переделать старый сайт, чтобы заявки не терялись; связать форму с CRM"
      : isYandexDirectPage
        ? "Например: запустить Поиск и РСЯ с нуля; проверить действующие кампании; настроить цели Метрики; снизить стоимость заявки; подготовить посадочную под рекламу"
        : isWebAnalyticsPage
          ? "Например: настроить Метрику и цели; проверить отправку формы и ошибки; сохранить UTM; связать обращения с CRM; подготовить отчёт по источникам заявок"
    : "Например: понять, почему сайт не дает заявок; проверить форму и Метрику; связать обращения с CRM";

  const [taskDetailsOpen, setTaskDetailsOpen] = useState(isSiteBriefIntent || isAuditIntent || isWebAnalyticsIntent);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    business: "",
    city: "",
    link: "",
    goal: defaultGoal as (typeof goalOptions)[number],
    comment: "",
    privacyAccepted: false,
    cookiesAccepted: false,
  });

  useEffect(() => {
    if (!formIntent) return;

    trackMetric("contextual_form_view", {
      path: location.pathname,
      placement: formIntent,
    });
  }, [formIntent, location.pathname]);

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

      const pagePath = location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "");

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
          lead_source: `centrlp.ru${pagePath}`,
          consent_version: "consent-v1.0-2026-05-02",
          privacy_version: "privacy-v2.0-2026-04-17",
          cookies_version: "cookies-v2.0-2026-04-17",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      trackMetric("lead_form_submit", { path: location.pathname });

      toast({
        title: "Заявка отправлена",
        description: (
          <div>
            <p className="mb-3">
              Спасибо. Свяжемся с вами в ближайшее время. Если удобнее, можно сразу продолжить диалог в мессенджере.
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
            <Label htmlFor="name">Имя *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-2"
            />
          </div>

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
            />
          </div>
        </div>

        <p className="-mt-2 text-xs leading-5 text-slate-500">
          Для первого ответа достаточно имени и телефона. Остальные детали можно добавить ниже, если удобно.
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
