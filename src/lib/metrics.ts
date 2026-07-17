declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const METRIKA_ID = 50135101;
const UTM_STORAGE_KEY = "centrlp:utm-attribution";
const SERVER_EVENT_GOALS = new Set([
  "form_submit_attempt",
  "lead_form_submit",
  "lead_confirmed",
  "lead_stored",
  "lead_form_error",
  "messenger_click_fastlane",
  "phone_click_fastlane",
  "landing_mobile_sticky_form_click",
  "landing_mobile_sticky_phone_click",
  "landing_mobile_sticky_telegram_click",
  "landing_primary_cta_click",
  "landing_secondary_cta_click",
  "form_goal_select",
  "contextual_form_view",
  "utm_landing_view",
  "blog_hero_primary_cta_click",
  "audit_self_check_select",
]);

export const getAttributionSnapshot = () => {
  const search = new URLSearchParams(window.location.search);
  const current = {
    utm_source: search.get("utm_source") || "",
    utm_medium: search.get("utm_medium") || "",
    utm_campaign: search.get("utm_campaign") || "",
    utm_content: search.get("utm_content") || "",
    utm_term: search.get("utm_term") || "",
  };

  try {
    if (Object.values(current).some(Boolean)) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(current));
      return current;
    }

    const stored = JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || "null");
    if (stored && typeof stored === "object") {
      return {
        utm_source: String(stored.utm_source || ""),
        utm_medium: String(stored.utm_medium || ""),
        utm_campaign: String(stored.utm_campaign || ""),
        utm_content: String(stored.utm_content || ""),
        utm_term: String(stored.utm_term || ""),
      };
    }
  } catch {
    // Attribution storage is optional and never blocks a conversion action.
  }

  return current;
};

const sendServerEvent = (goal: string, params?: Record<string, unknown>) => {
  if (!SERVER_EVENT_GOALS.has(goal)) return;

  try {
    const payload = JSON.stringify({
      event: goal,
      path: String(params?.path || window.location.pathname || "/"),
      page_url: window.location.href,
      referrer: document.referrer || "",
      ...getAttributionSnapshot(),
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
