import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { trackMetric } from "@/lib/metrics";

// OG image mapping: exact pathname → image filename (relative to /og/).
// For /blog/<slug> and /services/<slug> we point to per-item generated covers.
const ogImageMap: Record<string, string> = {
  "/": "index.png",
  "/services": "services.png",
  "/prices": "prices.png",
  "/projects": "projects.png",
  "/about": "about.png",
  "/contacts": "contacts.png",
  "/blog": "blog.png",
  "/ai": "ai.png",
  "/ai-turagent": "ai-turagent.png",
  "/metcoin": "metcoin.png",
  "/barter": "barter.png",
  "/cases": "cases.png",
  "/business-plans": "business-plans.png",
};

function getOgImage(pathname: string): string {
  if (ogImageMap[pathname]) return ogImageMap[pathname];
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    if (slug) return `posts/${slug}.png`;
    return "blog.png";
  }
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "").replace(/\/$/, "");
    if (slug) return `services/${slug}.png`;
    return "services.png";
  }
  if (pathname.startsWith("/barter/")) return "barter.png";
  return "index.png";
}

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const Layout = ({ children, title, description }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    const canonicalUrl = `https://centrlp.ru${location.pathname === '/' ? '/' : location.pathname}`;
    const ogImageFile = getOgImage(location.pathname);
    const ogImageUrl = `https://centrlp.ru/og/${ogImageFile}`;
    const metaDescriptionContent = description || "CentrLP — сайты, ВК-упаковка, чат-боты и ИИ-маркетинг под ключ в Тюмени.";
    const metaTitleContent = title || "CentrLP";
    const ogType = location.pathname.startsWith("/blog/") ? "article" : "website";

    if (title) {
      document.title = title;
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', metaDescriptionContent);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Update og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    let ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (!ogTypeMeta) {
      ogTypeMeta = document.createElement('meta');
      ogTypeMeta.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeMeta);
    }
    ogTypeMeta.setAttribute('content', ogType);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', metaTitleContent);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', metaDescriptionContent);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', ogImageUrl);

    let ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (!ogImageAlt) {
      ogImageAlt = document.createElement('meta');
      ogImageAlt.setAttribute('property', 'og:image:alt');
      document.head.appendChild(ogImageAlt);
    }
    ogImageAlt.setAttribute('content', `${metaTitleContent} — превью страницы CentrLP`);

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', metaTitleContent);

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', metaDescriptionContent);

    let twImage = document.querySelector('meta[name="twitter:image"]');
    if (!twImage) {
      twImage = document.createElement('meta');
      twImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twImage);
    }
    twImage.setAttribute('content', ogImageUrl);

    let twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (!twitterUrl) {
      twitterUrl = document.createElement('meta');
      twitterUrl.setAttribute('name', 'twitter:url');
      document.head.appendChild(twitterUrl);
    }
    twitterUrl.setAttribute('content', canonicalUrl);
  }, [title, description, location.pathname]);

  useEffect(() => {
    const handleMetricClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const metricTarget = target?.closest<HTMLElement>("[data-metric]");
      const metricName = metricTarget?.dataset.metric;

      if (!metricName) return;

      trackMetric(metricName, {
        path: location.pathname,
        text: metricTarget.textContent?.trim().slice(0, 120),
      });
    };

    document.addEventListener("click", handleMetricClick);
    return () => document.removeEventListener("click", handleMetricClick);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
