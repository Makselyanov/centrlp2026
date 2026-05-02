import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "cookie-consent";
const METRIKA_ID = 50135101;

const loadYandexMetrika = () => {
  if (typeof window === "undefined") return;

  const w = window as typeof window & {
    ym?: (...args: unknown[]) => void;
    __centrlpMetrikaLoaded?: boolean;
  };

  if (w.__centrlpMetrikaLoaded) return;
  w.__centrlpMetrikaLoaded = true;

  w.ym =
    w.ym ||
    function (...args: unknown[]) {
      ((w.ym as typeof w.ym & { a?: unknown[] }).a =
        (w.ym as typeof w.ym & { a?: unknown[] }).a || []).push(args);
    };
  (w.ym as typeof w.ym & { l?: number }).l = Date.now();

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src="https://mc.yandex.ru/metrika/tag.js"]',
  );
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(script);
  }

  w.ym(METRIKA_ID, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);

    if (stored === "true" || stored === "accepted") {
      localStorage.setItem(CONSENT_KEY, "accepted");
      loadYandexMetrika();
      return;
    }

    if (stored !== "declined") {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    loadYandexMetrika();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Мы используем технические cookie для работы сайта. Аналитические cookie
          Яндекс.Метрики включаются только после согласия и помогают понять, какие
          страницы и формы работают лучше. Подробнее — в{" "}
          <Link to="/cookies" className="text-primary underline hover:text-primary/80">
            политике cookie
          </Link>.
        </p>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            onClick={decline}
            className="rounded-full border border-border px-6 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Отклонить
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
};
