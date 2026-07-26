import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SocialChannelIcon } from "./SocialChannelLinks";
import { SOCIAL_CHANNELS } from "@/data/socialChannels";
import { COOKIE_CONSENT_CHANGE_EVENT, COOKIE_CONSENT_KEY } from "@/lib/cookieConsent";

export const SocialGuide = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasCookieChoice, setHasCookieChoice] = useState(false);
  const [isQuietZoneVisible, setIsQuietZoneVisible] = useState(false);

  useEffect(() => {
    if (window.location.hostname === "barter.centrlp.ru") return;

    const syncCookieChoice = () => {
      const choice = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      setHasCookieChoice(choice === "accepted" || choice === "declined" || choice === "true");
    };

    syncCookieChoice();
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncCookieChoice);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncCookieChoice);
  }, []);

  useEffect(() => {
    if (!hasCookieChoice || window.location.hostname === "barter.centrlp.ru") return;

    const dismissed = window.sessionStorage.getItem("centrlp-social-guide-dismissed") === "1";
    const canAutoOpen =
      window.innerWidth >= 1280 &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    setIsReady(true);
    if (dismissed || !canAutoOpen) return;

    const timer = window.setTimeout(() => setIsOpen(true), 3200);
    return () => window.clearTimeout(timer);
  }, [hasCookieChoice]);

  useEffect(() => {
    if (!isReady || !("IntersectionObserver" in window)) return;

    const quietZones = [
      document.getElementById("site-footer"),
      document.getElementById("contact-form"),
    ].filter((element): element is HTMLElement => Boolean(element));
    if (!quietZones.length) return;

    const visibleZones = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleZones.add(entry.target);
          else visibleZones.delete(entry.target);
        });

        const nextVisible = visibleZones.size > 0;
        setIsQuietZoneVisible(nextVisible);
        if (nextVisible) setIsOpen(false);
      },
      { threshold: 0.05 },
    );

    quietZones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, [isReady, location.pathname]);

  if (!isReady || isQuietZoneVisible || window.location.hostname === "barter.centrlp.ru") return null;

  const close = () => {
    setIsOpen(false);
    window.sessionStorage.setItem("centrlp-social-guide-dismissed", "1");
  };

  return (
    <aside className="social-guide-shell fixed bottom-1 right-1 z-[60] w-14 sm:right-6 sm:w-24 xl:bottom-5 xl:flex xl:w-auto xl:items-end xl:gap-2" aria-label="Каналы CentrLP">
      <div
        id="centrlp-social-channels"
        className={`social-guide-panel fixed bottom-24 left-3 right-3 w-auto overflow-hidden rounded-2xl bg-[#071d28] text-white sm:absolute sm:bottom-[8.5rem] sm:left-auto sm:right-0 sm:w-[19rem] xl:static xl:mb-5 xl:w-[19rem] ${
          isOpen ? "social-guide-panel--open" : ""
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between gap-4 px-4 pb-3 pt-4">
          <div>
            <p className="text-base font-bold">Будем на связи?</p>
            <p className="mt-0.5 text-sm leading-snug text-sky-100">Видео, идеи и рабочие разборы CentrLP</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sky-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46d7a1] xl:h-9 xl:w-9"
            aria-label="Закрыть список каналов"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-px bg-white/10">
          {SOCIAL_CHANNELS.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              data-metric={`social-guide-${channel.id}`}
              tabIndex={isOpen ? 0 : -1}
              className="group flex min-h-[4.5rem] items-center gap-2.5 bg-[#0b2735] px-3 py-3 transition-colors hover:bg-[#0e3446] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#46d7a1]"
            >
              <SocialChannelIcon id={channel.id} className="h-5 w-5 shrink-0 text-[#46d7a1]" />
              <span className="min-w-0">
                <span className="block text-sm font-bold">{channel.label}</span>
                <span className="block truncate text-xs text-sky-100/80">{channel.detail}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`social-guide-character relative ml-auto block h-20 w-14 shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#009ada]/35 sm:h-32 sm:w-24 xl:h-40 xl:w-28 ${
          isOpen ? "social-guide-character--active" : ""
        }`}
        aria-expanded={isOpen}
        aria-controls="centrlp-social-channels"
        aria-label={isOpen ? "Скрыть каналы CentrLP" : "Показать каналы CentrLP"}
        data-metric="social-guide-toggle"
      >
        <img
          src="/images/brand/max-cartoon-social-guide.webp"
          alt=""
          width="470"
          height="836"
          className="relative h-full w-full object-contain drop-shadow-[0_5px_4px_rgba(3,28,40,0.28)]"
        />
        {!isOpen && (
          <span className="absolute -left-20 top-8 hidden whitespace-nowrap rounded-full bg-[#071d28] px-3 py-1.5 text-xs font-bold text-white shadow-sm xl:block">
            Мои каналы
          </span>
        )}
      </button>
    </aside>
  );
};
