import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SocialChannelIcon } from "./SocialChannelLinks";
import { SOCIAL_CHANNELS } from "@/data/socialChannels";

export const SocialGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window.location.hostname === "barter.centrlp.ru") return;

    const dismissed = window.sessionStorage.getItem("centrlp-social-guide-dismissed") === "1";
    const canAutoOpen = window.matchMedia("(min-width: 1280px)").matches;
    setIsReady(true);
    if (dismissed || !canAutoOpen) return;

    const timer = window.setTimeout(() => setIsOpen(true), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!isReady || window.location.hostname === "barter.centrlp.ru") return null;

  const close = () => {
    setIsOpen(false);
    window.sessionStorage.setItem("centrlp-social-guide-dismissed", "1");
  };

  return (
    <aside className="fixed bottom-3 right-3 z-[60] w-24 sm:bottom-5 sm:right-6 xl:flex xl:w-auto xl:items-end xl:gap-2" aria-label="Каналы CentrLP">
      <div
        id="centrlp-social-channels"
        className={`social-guide-panel absolute bottom-[8.5rem] right-0 w-[min(19rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl bg-[#071d28] text-white xl:static xl:mb-5 xl:w-[19rem] ${
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
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sky-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46d7a1]"
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
        className={`social-guide-character relative ml-auto block h-32 w-24 shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#009ada]/35 sm:h-40 sm:w-28 ${
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
          <span className="absolute -left-16 top-5 whitespace-nowrap rounded-full bg-[#071d28] px-3 py-1.5 text-xs font-bold text-white shadow-sm sm:-left-20 sm:top-8">
            Мои каналы
          </span>
        )}
      </button>
    </aside>
  );
};
