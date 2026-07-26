import { useEffect, useState } from "react";
import { Instagram, Send, X, Youtube } from "lucide-react";

const channels = [
  {
    label: "YouTube",
    detail: "AI, блин, работает!",
    href: "https://www.youtube.com/channel/UCo6y9tPx6p6n1RCFkGuzZ-A",
    icon: Youtube,
    metric: "social-guide-youtube",
  },
  {
    label: "Instagram",
    detail: "@centrlp",
    href: "https://www.instagram.com/centrlp/",
    icon: Instagram,
    metric: "social-guide-instagram",
  },
  {
    label: "Telegram",
    detail: "Идеи CentrLP",
    href: "https://t.me/centrlp_ideas",
    icon: Send,
    metric: "social-guide-telegram",
  },
] as const;

const VkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
  </svg>
);

export const SocialGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window.location.hostname === "barter.centrlp.ru") return;

    const dismissed = window.sessionStorage.getItem("centrlp-social-guide-dismissed") === "1";
    const canAutoOpen = window.matchMedia("(min-width: 640px)").matches;
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
    <aside className="fixed bottom-4 right-4 z-[60] w-20 sm:bottom-6 sm:right-6 sm:flex sm:w-auto sm:items-end sm:gap-2" aria-label="Каналы CentrLP">
      <div
        id="centrlp-social-channels"
        className={`social-guide-panel absolute bottom-[5.5rem] right-0 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-[#071d28] text-white sm:static sm:mb-3 sm:w-[19rem] ${
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
          {channels.map(({ label, detail, href, icon: Icon, metric }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-metric={metric}
              tabIndex={isOpen ? 0 : -1}
              className="group flex min-h-[4.5rem] items-center gap-2.5 bg-[#0b2735] px-3 py-3 transition-colors hover:bg-[#0e3446] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#46d7a1]"
            >
              <Icon className="h-5 w-5 shrink-0 text-[#46d7a1]" />
              <span className="min-w-0">
                <span className="block text-sm font-bold">{label}</span>
                <span className="block truncate text-xs text-sky-100/80">{detail}</span>
              </span>
            </a>
          ))}
          <a
            href="https://vk.com/centrlp"
            target="_blank"
            rel="noopener noreferrer"
            data-metric="social-guide-vk"
            tabIndex={isOpen ? 0 : -1}
            className="group flex min-h-[4.5rem] items-center gap-2.5 bg-[#0b2735] px-3 py-3 transition-colors hover:bg-[#0e3446] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#46d7a1]"
          >
            <span className="shrink-0 text-[#46d7a1]"><VkIcon /></span>
            <span>
              <span className="block text-sm font-bold">ВКонтакте</span>
              <span className="block text-xs text-sky-100/80">CentrLP</span>
            </span>
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`social-guide-character relative ml-auto block h-20 w-20 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#009ada]/35 sm:h-24 sm:w-24 ${
          isOpen ? "social-guide-character--active" : ""
        }`}
        aria-expanded={isOpen}
        aria-controls="centrlp-social-channels"
        aria-label={isOpen ? "Скрыть каналы CentrLP" : "Показать каналы CentrLP"}
        data-metric="social-guide-toggle"
      >
        <span className="absolute inset-1 rounded-full bg-white shadow-[0_4px_8px_rgba(3,28,40,0.18)]" />
        <img
          src="/images/brand/centrlp-neuro-guide.svg"
          alt=""
          width="360"
          height="360"
          className="relative h-full w-full object-contain"
        />
        {!isOpen && (
          <span className="absolute -left-12 top-0 rounded-full bg-[#071d28] px-3 py-1.5 text-xs font-bold text-white shadow-sm sm:-left-14">
            Я здесь
          </span>
        )}
      </button>
    </aside>
  );
};
