declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const trackMetric = (goal: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  try {
    window.dispatchEvent(
      new CustomEvent("centrlp:metric", {
        detail: { goal, params: params ?? {} },
      }),
    );

    if (typeof window.ym === "function") {
      window.ym("reachGoal", goal, params ?? {});
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

