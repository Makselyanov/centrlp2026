declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const METRIKA_ID = 50135101;

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
  } catch (error) {
    console.warn("Metric tracking failed", error);
  }
};
