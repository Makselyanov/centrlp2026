import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { COOKIE_CONSENT_CHANGE_EVENT, COOKIE_CONSENT_KEY } from "@/lib/cookieConsent";

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
    webvisor: false,
  });
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (stored === "true" || stored === "accepted") {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
      loadYandexMetrika();
      return;
    }

    if (stored !== "declined") {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    loadYandexMetrika();
    setVisible(false);
    window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT));
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
    window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT));
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent-shell pointer-events-none fixed bottom-0 left-0 right-0 z-50 animate-fade-in p-2 sm:p-4">
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col items-stretch gap-3 rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:p-4 md:p-5">
        <p className="flex-1 text-[13px] leading-5 text-muted-foreground sm:text-sm">
          Мы используем технические cookie для работы сайта. Аналитические cookie
          Яндекс.Метрики включаются только после согласия и помогают понять, какие
          страницы и формы работают лучше. Подробнее — в{" "}
          <Link to="/cookies" className="text-primary underline hover:text-primary/80">
            политике cookie
          </Link>.
        </p>
        <div className="grid w-full shrink-0 grid-cols-2 gap-2 sm:flex sm:w-auto">
          <button
            onClick={decline}
            className="min-h-11 w-full rounded-full border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary sm:w-auto sm:px-5"
          >
            Отклонить
          </button>
          <button
            onClick={accept}
            className="min-h-11 w-full rounded-full bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:w-auto sm:px-5"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
};
