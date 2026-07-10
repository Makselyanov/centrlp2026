declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const METRIKA_ID = 50135101;
const SERVER_EVENT_GOALS = new Set([
  "form_submit_attempt",
  "lead_form_submit",
  "lead_form_error",
  "messenger_click_fastlane",
  "phone_click_fastlane",
  "landing_mobile_sticky_form_click",
  "landing_mobile_sticky_phone_click",
  "landing_mobile_sticky_telegram_click",
  "landing_primary_cta_click",
  "landing_secondary_cta_click",
  "form_goal_select",
]);

const getUtmParams = () => {
  const search = new URLSearchParams(window.location.search);
  return {
    utm_source: search.get("utm_source") || "",
    utm_medium: search.get("utm_medium") || "",
    utm_campaign: search.get("utm_campaign") || "",
    utm_content: search.get("utm_content") || "",
    utm_term: search.get("utm_term") || "",
  };
};

const sendServerEvent = (goal: string, params?: Record<string, unknown>) => {
  if (!SERVER_EVENT_GOALS.has(goal)) return;

  try {
    const payload = JSON.stringify({
      event: goal,
      path: String(params?.path || window.location.pathname || "/"),
      page_url: window.location.href,
      referrer: document.referrer || "",
      ...getUtmParams(),
      placement: params?.placement,
      messenger: params?.messenger,
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/lead/event", blob);
      return;
    }

    fetch("/api/lead/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Client-side analytics must never block the lead path.
  }
};

export const trackMetric = (goal: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  try {
    window.dispatchEvent(
      new CustomEvent("centrlp:metric", {
        detail: { goal, params: params ?? {} },
      }),
    );

    if (typeof window.ym === "function") {
      window.ym(METRIKA_ID, "reachGoal", goal, params ?? {});
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "centrlp_goal",
        goal,
        ...params,
      });
    }

    sendServerEvent(goal, params);
  } catch (error) {
    console.warn("Metric tracking failed", error);
  }
};
