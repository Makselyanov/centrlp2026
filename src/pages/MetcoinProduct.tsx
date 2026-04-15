import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileCheck2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import NotFound from "./NotFound";
import {
  getMetcoinProduct,
  metcoinProducts,
  type MetcoinProduct as ProductType,
} from "@/data/metcoinProducts";

// ============================================================================
// Брендовая палитра МеталлТех (копия из Metcoin.tsx для изоляции страницы)
// ============================================================================

const BRAND = {
  primary: "#1E3A8A",
  primaryDark: "#0F172A",
  primaryMid: "#1E40AF",
  primarySoft: "#EEF2FF",
  accent: "#B45309",
  accentLight: "#D97706",
  accentSoft: "#FEF3C7",
  bg: "#F8FAFC",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  borderStrong: "#CBD5E1",
  text: "#0F172A",
  textMuted: "#475569",
  textDim: "#64748B",
};
const FONT_HEAD = "'Lexend', 'Inter', system-ui, -apple-system, sans-serif";
const FONT_BODY = "'Source Sans 3', 'Inter', system-ui, -apple-system, sans-serif";

// ============================================================================
// SEO helper: sets/restores meta tags for this page
// ============================================================================

const useProductSeo = (product: ProductType) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = product.seoTitle;

    const path = `/metcoin/${product.slug}`;
    const canonicalUrl = `https://centrlp.ru${path}`;

    const setMeta = (selector: string, attr: string, attrValue: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', "name", "description", product.seoDescription);
    setMeta('meta[property="og:title"]', "property", "og:title", product.seoTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", product.seoDescription);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:type"]', "property", "og:type", "product");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", product.seoTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", product.seoDescription);

    // noindex для preview, чтобы не индексировалось до релиза
    setMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");

    // canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    return () => {
      document.title = prevTitle;
      setMeta('meta[name="robots"]', "name", "robots", "index, follow");
    };
  }, [product]);
};

// ============================================================================
// Header & Footer — дубликат из Metcoin.tsx (замыкание брендинга)
// ============================================================================

const Header = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "/metcoin#products", label: "Продукция" },
    { href: "/metcoin#how", label: "Как работаем" },
    { href: "/metcoin#cases", label: "Проекты" },
    { href: "/metcoin#faq", label: "FAQ" },
    { href: "/metcoin#contact", label: "Контакты" },
  ];

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)",
        backdropFilter: "saturate(180%) blur(14px)",
        WebkitBackdropFilter: "saturate(180%) blur(14px)",
        borderBottom: scrolled ? `1px solid ${BRAND.border}` : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <Link to="/metcoin" className="flex items-center gap-3 group">
          <div
            className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-xl font-black text-white text-lg shadow-lg transition-transform group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
              fontFamily: FONT_HEAD,
              boxShadow: "0 8px 24px -8px rgba(30, 58, 138, 0.45)",
            }}
          >
            МТ
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="font-extrabold text-[15px] md:text-base tracking-wide"
              style={{ fontFamily: FONT_HEAD, color: BRAND.text }}
            >
              МЕТАЛЛТЕХ
            </span>
            <span
              className="text-[10px] md:text-[11px] uppercase tracking-[0.15em]"
              style={{ color: BRAND.textDim, fontFamily: FONT_BODY }}
            >
              производство · Тюмень
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors cursor-pointer"
              style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="tel:+73452397004"
            className="hidden md:flex items-center gap-2 text-sm font-semibold"
            style={{ color: BRAND.text, fontFamily: FONT_BODY }}
          >
            <Phone className="w-4 h-4" style={{ color: BRAND.primary }} />
            +7 (3452) 39-70-04
          </a>
          <button
            type="button"
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
            style={{
              background: `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.accentLight} 100%)`,
              fontFamily: FONT_HEAD,
              boxShadow: "0 6px 20px -6px rgba(180, 83, 9, 0.55)",
            }}
          >
            Рассчитать
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer"
            style={{ background: BRAND.primarySoft, color: BRAND.primary }}
          >
            <ChevronDown
              className="w-5 h-5 transition-transform"
              style={{ transform: open ? "rotate(180deg)" : "none" }}
            />
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="lg:hidden border-t px-4 py-4 flex flex-col gap-2"
          style={{ borderColor: BRAND.border, background: "#fff" }}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium"
              style={{ color: BRAND.text, fontFamily: FONT_BODY }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="py-12 md:py-14" style={{ background: BRAND.primaryDark, color: "#CBD5E1" }}>
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div
        className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr] pb-10 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl font-black text-white text-lg"
              style={{
                background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryMid} 100%)`,
                fontFamily: FONT_HEAD,
              }}
            >
              МТ
            </div>
            <div>
              <div className="font-extrabold text-white" style={{ fontFamily: FONT_HEAD }}>
                МЕТАЛЛТЕХ
              </div>
              <div
                className="text-[11px] uppercase tracking-[0.15em] text-white/50"
                style={{ fontFamily: FONT_HEAD }}
              >
                производство · Тюмень · с 2013
              </div>
            </div>
          </div>
          <p
            className="text-sm leading-relaxed max-w-md"
            style={{ fontFamily: FONT_BODY, color: "rgba(203,213,225,0.75)" }}
          >
            Собственный цех в Тюмени. Производим закладные, реперы, опоры,
            контейнеры и нестандартные металлоконструкции по чертежам заказчика.
          </p>
        </div>
        <div>
          <div
            className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4"
            style={{ fontFamily: FONT_HEAD }}
          >
            Продукция
          </div>
          <ul className="space-y-2.5 text-sm" style={{ fontFamily: FONT_BODY }}>
            {metcoinProducts.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/metcoin/${p.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {p.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-4"
            style={{ fontFamily: FONT_HEAD }}
          >
            Связаться
          </div>
          <ul className="space-y-2.5 text-sm" style={{ fontFamily: FONT_BODY }}>
            <li>
              <a
                href="tel:+73452397004"
                className="hover:text-white font-semibold transition-colors"
              >
                +7 (3452) 39-70-04
              </a>
            </li>
            <li>
              <a
                href="mailto:metallteh72@yandex.ru"
                className="hover:text-white transition-colors"
              >
                metallteh72@yandex.ru
              </a>
            </li>
            <li style={{ color: "rgba(203,213,225,0.6)" }}>
              625019, г. Тюмень,
              <br />
              ул. Новаторов, 12, корп. 3
            </li>
          </ul>
        </div>
      </div>
      <div
        className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
        style={{ color: "rgba(203,213,225,0.5)", fontFamily: FONT_BODY }}
      >
        <div>© 2013–2026 ООО «Компания МеталлТех». Все права защищены.</div>
      </div>
    </div>
  </footer>
);

// ============================================================================
// Inline contact form (dual email: metallteh72@yandex.ru + 1@centrlp.ru)
// ============================================================================

const InlineContact = ({ product }: { product: ProductType }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    comment: `Интересует: ${product.title} (${product.gost}). Опишите задачу и объём.`,
  });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const payload = {
      ...form,
      page_path: `/metcoin/${product.slug}`,
      product: product.title,
      gost: product.gost,
      lead_source: `metcoin product page: ${product.slug}`,
      _subject: `Заявка: ${product.title} — МеталлТех`,
      _template: "table",
      _captcha: "false",
    };
    const recipients = ["metallteh72@yandex.ru", "1@centrlp.ru"];
    try {
      const results = await Promise.allSettled(
        recipients.map((to) =>
          fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          }).then((r) => {
            if (!r.ok) throw new Error("fail " + to);
            return r;
          })
        )
      );
      if (!results.some((r) => r.status === "fulfilled")) throw new Error("all failed");
      setState("sent");
      setForm({
        name: "",
        phone: "",
        email: "",
        comment: `Интересует: ${product.title} (${product.gost}). Опишите задачу и объём.`,
      });
    } catch {
      setState("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28"
      style={{
        background: `linear-gradient(135deg, ${BRAND.primaryDark} 0%, ${BRAND.primary} 100%)`,
      }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em]"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#FEF3C7",
              fontFamily: FONT_HEAD,
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: BRAND.accentLight }}
            />
            Заявка на расчёт
          </div>
          <h2
            className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: FONT_HEAD, letterSpacing: "-0.02em" }}
          >
            Рассчитать {product.shortTitle.toLowerCase()}
          </h2>
          <p
            className="mt-5 text-base md:text-lg max-w-xl"
            style={{ color: "rgba(224,231,255,0.82)", fontFamily: FONT_BODY }}
          >
            Пришлите чертёж, ТЗ или опишите задачу — дадим точный расчёт
            и срок в течение 1 рабочего дня. Работаем по договору, ЭДО СБИС/Диадок.
          </p>
          <div className="mt-8 space-y-4" style={{ fontFamily: FONT_BODY }}>
            <a
              href="tel:+73452397004"
              className="flex items-center gap-3 text-white hover:text-[#FDE68A] transition-colors"
            >
              <Phone className="w-5 h-5" style={{ color: "#FDE68A" }} />
              <span className="text-lg font-semibold">+7 (3452) 39-70-04</span>
            </a>
            <a
              href="mailto:metallteh72@yandex.ru"
              className="flex items-center gap-3 text-white hover:text-[#FDE68A] transition-colors"
            >
              <Mail className="w-5 h-5" style={{ color: "#FDE68A" }} />
              <span>metallteh72@yandex.ru</span>
            </a>
            <div className="flex items-start gap-3" style={{ color: "rgba(224,231,255,0.75)" }}>
              <MapPin className="w-5 h-5 mt-0.5" style={{ color: "#FDE68A" }} />
              <span>
                625019, г. Тюмень,
                <br />
                ул. Новаторов, 12, корп. 3
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl p-6 md:p-8 backdrop-blur"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div className="space-y-4">
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Как к вам обращаться"
              className="w-full px-4 py-3.5 rounded-xl text-white placeholder:text-white/40 outline-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: FONT_BODY,
              }}
            />
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="Телефон"
              className="w-full px-4 py-3.5 rounded-xl text-white placeholder:text-white/40 outline-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: FONT_BODY,
              }}
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="E-mail (необязательно)"
              className="w-full px-4 py-3.5 rounded-xl text-white placeholder:text-white/40 outline-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: FONT_BODY,
              }}
            />
            <textarea
              rows={4}
              value={form.comment}
              onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
              placeholder="Опишите задачу, объём, сроки"
              className="w-full px-4 py-3.5 rounded-xl text-white placeholder:text-white/40 outline-none resize-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontFamily: FONT_BODY,
              }}
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
              style={{
                background: `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.accentLight} 100%)`,
                fontFamily: FONT_HEAD,
                boxShadow: "0 10px 30px -8px rgba(180, 83, 9, 0.55)",
              }}
            >
              {state === "sending" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Отправляем…
                </>
              ) : state === "sent" ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Заявка принята
                </>
              ) : (
                <>
                  Отправить заявку
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            {state === "sent" && (
              <div
                className="text-sm text-center"
                style={{ color: "rgba(224,231,255,0.75)", fontFamily: FONT_BODY }}
              >
                Спасибо. Свяжемся в течение рабочего часа.
              </div>
            )}
            {state === "error" && (
              <div
                className="text-sm text-center"
                style={{ color: "#FCA5A5", fontFamily: FONT_BODY }}
              >
                Не удалось отправить. Позвоните +7 (3452) 39-70-04.
              </div>
            )}
            <p
              className="text-[11px] text-center"
              style={{ color: "rgba(224,231,255,0.5)", fontFamily: FONT_BODY }}
            >
              Нажимая «Отправить», вы соглашаетесь с{" "}
              <a href="/privacy" className="underline hover:text-white">
                политикой обработки персональных данных
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

// ============================================================================
// Page body sections
// ============================================================================

const Breadcrumb = ({ product }: { product: ProductType }) => (
  <div
    className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 flex items-center gap-2 text-sm"
    style={{ fontFamily: FONT_BODY, color: BRAND.textDim }}
  >
    <Link to="/metcoin" className="hover:text-[color:var(--h)]" style={{ ["--h" as string]: BRAND.primary } as React.CSSProperties}>
      МеталлТех
    </Link>
    <ChevronRight className="w-3.5 h-3.5" />
    <Link
      to="/metcoin#products"
      className="hover:text-[color:var(--h)]"
      style={{ ["--h" as string]: BRAND.primary } as React.CSSProperties}
    >
      Продукция
    </Link>
    <ChevronRight className="w-3.5 h-3.5" />
    <span style={{ color: BRAND.text, fontWeight: 600 }}>{product.shortTitle}</span>
  </div>
);

const ProductHero = ({
  product,
  onCtaClick,
}: {
  product: ProductType;
  onCtaClick: () => void;
}) => {
  const Icon = product.icon;
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${BRAND.bg} 0%, ${BRAND.surface} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${BRAND.primary} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-10 pb-14 md:pt-14 md:pb-20 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
        <div>
          {product.tag && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-5"
              style={{
                background: BRAND.accentSoft,
                color: BRAND.accent,
                fontFamily: FONT_HEAD,
              }}
            >
              {product.tag}
            </div>
          )}
          <h1
            className="text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: FONT_HEAD, color: BRAND.text, letterSpacing: "-0.025em" }}
          >
            {product.title}
          </h1>
          <div
            className="mt-4 text-sm md:text-base font-semibold uppercase tracking-[0.12em]"
            style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
          >
            {product.gost}
          </div>
          <p
            className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
          >
            {product.desc}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-white font-semibold transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${BRAND.accent} 0%, ${BRAND.accentLight} 100%)`,
                fontFamily: FONT_HEAD,
                boxShadow: "0 10px 30px -8px rgba(180, 83, 9, 0.55)",
              }}
            >
              Рассчитать за 1 день
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:+73452397004"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
              style={{
                background: BRAND.surface,
                color: BRAND.primary,
                border: `1.5px solid ${BRAND.borderStrong}`,
                fontFamily: FONT_HEAD,
              }}
            >
              <Phone className="w-4 h-4" />
              +7 (3452) 39-70-04
            </a>
          </div>

          <div
            className="mt-8 inline-flex items-center gap-4 rounded-2xl px-5 py-4"
            style={{
              background: BRAND.primarySoft,
              border: `1px solid ${BRAND.border}`,
            }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.18em] font-semibold"
              style={{ color: BRAND.textDim, fontFamily: FONT_HEAD }}
            >
              Цена
            </div>
            <div
              className="text-xl md:text-2xl font-extrabold"
              style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
            >
              {product.price}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="relative w-full aspect-square max-w-sm rounded-3xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
              boxShadow: "0 30px 80px -30px rgba(30,58,138,0.55)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <Icon className="relative w-32 h-32 md:w-40 md:h-40 text-white" strokeWidth={1.3} />
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur"
              style={{
                background: "rgba(15,23,42,0.85)",
                color: "#E0E7FF",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: FONT_HEAD,
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: BRAND.accentLight }} />
              {product.gost.split(",")[0]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Description = ({ product }: { product: ProductType }) => (
  <section className="py-16 md:py-20" style={{ background: BRAND.surface }}>
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
      <div
        className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
        style={{ color: BRAND.accent, fontFamily: FONT_HEAD }}
      >
        О продукте
      </div>
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
        style={{ fontFamily: FONT_HEAD, color: BRAND.text, letterSpacing: "-0.02em" }}
      >
        Что это такое и когда применяется
      </h2>
      <p
        className="mt-6 text-base md:text-lg leading-relaxed"
        style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
      >
        {product.longDescription}
      </p>
    </div>
  </section>
);

const SpecsTable = ({ product }: { product: ProductType }) => (
  <section className="py-16 md:py-20" style={{ background: BRAND.bg }}>
    <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
      <div
        className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
        style={{ color: BRAND.accent, fontFamily: FONT_HEAD }}
      >
        Характеристики
      </div>
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-8"
        style={{ fontFamily: FONT_HEAD, color: BRAND.text, letterSpacing: "-0.02em" }}
      >
        Техника и стандарты
      </h2>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: BRAND.surface, border: `1px solid ${BRAND.border}` }}
      >
        {product.specs.map((spec, i) => (
          <div
            key={spec.label}
            className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-2 md:gap-6 px-5 md:px-8 py-4 md:py-5"
            style={{
              borderTop: i === 0 ? "none" : `1px solid ${BRAND.border}`,
            }}
          >
            <div
              className="text-xs md:text-sm uppercase tracking-[0.12em] font-semibold"
              style={{ color: BRAND.textDim, fontFamily: FONT_HEAD }}
            >
              {spec.label}
            </div>
            <div
              className="text-base md:text-lg font-medium"
              style={{ color: BRAND.text, fontFamily: FONT_BODY }}
            >
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const VariantsGrid = ({ product }: { product: ProductType }) => (
  <section className="py-16 md:py-20" style={{ background: BRAND.surface }}>
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
      <div
        className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
        style={{ color: BRAND.accent, fontFamily: FONT_HEAD }}
      >
        Исполнения
      </div>
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
        style={{ fontFamily: FONT_HEAD, color: BRAND.text, letterSpacing: "-0.02em" }}
      >
        Варианты исполнения
      </h2>
      <p
        className="mt-3 text-base md:text-lg max-w-2xl"
        style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
      >
        Выберите базовое исполнение или пришлите ТЗ — рассчитаем нестандарт по чертежу.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {product.variants.map((v, i) => (
          <div
            key={v.title}
            className="rounded-2xl p-6 md:p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: BRAND.bg,
              border: `1px solid ${BRAND.border}`,
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div
                className="text-[11px] uppercase tracking-[0.18em] font-bold"
                style={{ color: BRAND.textDim, fontFamily: FONT_HEAD }}
              >
                Вариант {String(i + 1).padStart(2, "0")}
              </div>
              {v.price && (
                <div
                  className="text-sm font-bold whitespace-nowrap"
                  style={{ color: BRAND.accent, fontFamily: FONT_HEAD }}
                >
                  {v.price}
                </div>
              )}
            </div>
            <div
              className="text-xl md:text-2xl font-bold mb-3"
              style={{ color: BRAND.text, fontFamily: FONT_HEAD, letterSpacing: "-0.01em" }}
            >
              {v.title}
            </div>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
            >
              {v.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MaterialsCoatings = ({ product }: { product: ProductType }) => (
  <section className="py-16 md:py-20" style={{ background: BRAND.bg }}>
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-3">
        {[
          { title: "Области применения", icon: Wrench, items: product.applications, tint: BRAND.primary },
          { title: "Материалы", icon: ShieldCheck, items: product.materials, tint: BRAND.primaryMid },
          { title: "Покрытия и антикор", icon: FileCheck2, items: product.coatings, tint: BRAND.accent },
        ].map((block) => (
          <div
            key={block.title}
            className="rounded-2xl p-6 md:p-7"
            style={{
              background: BRAND.surface,
              border: `1px solid ${BRAND.border}`,
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: BRAND.primarySoft, color: block.tint }}
            >
              <block.icon className="w-5 h-5" />
            </div>
            <div
              className="text-lg font-bold mb-4"
              style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
            >
              {block.title}
            </div>
            <ul className="space-y-2.5">
              {block.items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-2.5 text-sm leading-relaxed"
                  style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: block.tint }}
                  />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Warranties = () => (
  <section className="py-16 md:py-20" style={{ background: BRAND.surface }}>
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-4">
        {[
          {
            icon: ShieldCheck,
            label: "Паспорт качества",
            text: "На каждую партию с указанием стали, массы, чертежа.",
          },
          {
            icon: FileCheck2,
            label: "Сертификат на сталь",
            text: "Металлургический сертификат от завода-поставщика.",
          },
          {
            icon: Truck,
            label: "Доставка",
            text: "Свой автопарк в радиусе 500 км, ТК — по всей РФ.",
          },
          {
            icon: CheckCircle2,
            label: "Срок в договоре",
            text: "Фиксированные сроки со штрафом за срыв.",
          },
        ].map((g) => (
          <div
            key={g.label}
            className="rounded-2xl p-5"
            style={{ background: BRAND.bg, border: `1px solid ${BRAND.border}` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ background: BRAND.primarySoft, color: BRAND.primary }}
            >
              <g.icon className="w-5 h-5" />
            </div>
            <div
              className="text-sm font-bold mb-1.5"
              style={{ color: BRAND.text, fontFamily: FONT_HEAD }}
            >
              {g.label}
            </div>
            <div
              className="text-xs md:text-sm leading-relaxed"
              style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
            >
              {g.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RelatedProducts = ({ product }: { product: ProductType }) => {
  const rel = useMemo(
    () =>
      (product.related.length
        ? product.related
        : metcoinProducts
            .filter((p) => p.slug !== product.slug)
            .slice(0, 3)
            .map((p) => p.slug)
      )
        .map((slug) => getMetcoinProduct(slug))
        .filter(Boolean) as ProductType[],
    [product]
  );

  if (!rel.length) return null;

  return (
    <section className="py-16 md:py-20" style={{ background: BRAND.bg }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
          style={{ color: BRAND.accent, fontFamily: FONT_HEAD }}
        >
          Смежная продукция
        </div>
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-10"
          style={{ fontFamily: FONT_HEAD, color: BRAND.text, letterSpacing: "-0.02em" }}
        >
          Что ещё обычно заказывают
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {rel.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.slug}
                to={`/metcoin/${p.slug}`}
                className="group block rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: BRAND.surface,
                  border: `1px solid ${BRAND.border}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
                  }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className="text-lg font-bold mb-2 group-hover:text-[color:var(--h)] transition-colors"
                  style={
                    {
                      color: BRAND.text,
                      fontFamily: FONT_HEAD,
                      ["--h" as string]: BRAND.primary,
                    } as React.CSSProperties
                  }
                >
                  {p.title}
                </div>
                <div
                  className="text-xs uppercase tracking-[0.1em] font-semibold mb-2"
                  style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
                >
                  {p.gost.split(",")[0]}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: BRAND.textMuted, fontFamily: FONT_BODY }}
                >
                  {p.desc}
                </p>
                <div
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: BRAND.primary, fontFamily: FONT_HEAD }}
                >
                  Подробнее
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// JSON-LD structured data
// ============================================================================

const ProductJsonLd = ({ product }: { product: ProductType }) => {
  useEffect(() => {
    const scriptId = `jsonld-product-${product.slug}`;
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const payload = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          name: product.title,
          description: product.seoDescription,
          category: "Металлоконструкции",
          brand: { "@type": "Brand", name: "МеталлТех" },
          manufacturer: {
            "@type": "Organization",
            name: "ООО «Компания МеталлТех»",
            address: {
              "@type": "PostalAddress",
              streetAddress: "ул. Новаторов, 12, корп. 3",
              addressLocality: "Тюмень",
              postalCode: "625019",
              addressCountry: "RU",
            },
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "RUB",
            price: (product.price.match(/\d[\d\s]*/)?.[0] || "").replace(/\s/g, ""),
            availability: "https://schema.org/InStock",
            url: `https://centrlp.ru/metcoin/${product.slug}`,
          },
          gtin: undefined,
          additionalProperty: product.specs.map((s) => ({
            "@type": "PropertyValue",
            name: s.label,
            value: s.value,
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "МеталлТех",
              item: "https://centrlp.ru/metcoin",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Продукция",
              item: "https://centrlp.ru/metcoin#products",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: product.shortTitle,
              item: `https://centrlp.ru/metcoin/${product.slug}`,
            },
          ],
        },
      ],
    };

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = scriptId;
    s.textContent = JSON.stringify(payload);
    document.head.appendChild(s);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [product]);

  return null;
};

// ============================================================================
// Page body (always has a resolved product)
// ============================================================================

const MetcoinProductBody = ({ product }: { product: ProductType }) => {
  useProductSeo(product);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: BRAND.bg, color: BRAND.text, fontFamily: FONT_BODY }}>
      <Header onCtaClick={scrollToContact} />
      <ProductJsonLd product={product} />
      <Breadcrumb product={product} />
      <ProductHero product={product} onCtaClick={scrollToContact} />
      <Description product={product} />
      <SpecsTable product={product} />
      <VariantsGrid product={product} />
      <MaterialsCoatings product={product} />
      <Warranties />
      <InlineContact product={product} />
      <RelatedProducts product={product} />
      <Footer />
    </div>
  );
};

// ============================================================================
// Page wrapper — resolves :slug → product, or 404
// ============================================================================

const MetcoinProduct = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getMetcoinProduct(slug) : undefined;
  if (!product) return <NotFound />;
  return <MetcoinProductBody product={product} />;
};

export default MetcoinProduct;
