import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Мы используем cookie для аналитики (Яндекс.Метрика) и улучшения работы сайта.
          Продолжая использовать сайт, вы соглашаетесь с{" "}
          <Link to="/cookies" className="text-primary underline hover:text-primary/80">
            политикой cookie
          </Link>.
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-6 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
        >
          Принять
        </button>
      </div>
    </div>
  );
};
