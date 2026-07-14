import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface FaqItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ItemListEntry {
  name: string;
  description: string;
  url?: string;
  image?: string;
}

export const useFaqSchema = (faqItems: FaqItem[]) => {
  useEffect(() => {
    if (faqItems.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    let script = document.getElementById('faq-jsonld') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'faq-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById('faq-jsonld')?.remove();
    };
  }, [faqItems]);
};

export const useBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  useEffect(() => {
    if (items.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };

    let script = document.getElementById('breadcrumb-jsonld') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'breadcrumb-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById('breadcrumb-jsonld')?.remove();
    };
  }, [items]);
};

export const useItemListSchema = (items: ItemListEntry[], pageUrl: string, pageName: string) => {
  useEffect(() => {
    if (items.length === 0) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageName,
      "url": pageUrl,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "CreativeWork",
            "name": item.name,
            "description": item.description,
            "url": item.url || pageUrl,
            ...(item.image && { "image": item.image }),
          },
        })),
      },
    };

    let script = document.getElementById('itemlist-jsonld') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'itemlist-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById('itemlist-jsonld')?.remove();
    };
  }, [items, pageUrl, pageName]);
};

/**
 * Auto breadcrumb based on current path
 * E.g. /services/chatbot-vk → Главная > Услуги > Чат-бот ВК
 */
export const useAutoBreadcrumb = (pageName: string) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", url: "https://centrlp.ru/" }
  ];

  const segmentNames: Record<string, string> = {
    services: "Услуги",
    blog: "Блог",
    barter: "Бартер",
    projects: "Проекты",
    prices: "Цены",
    contacts: "Контакты",
    about: "О нас",
    cases: "Кейсы",
  };

  let currentPath = "";
  for (let i = 0; i < pathSegments.length - 1; i++) {
    currentPath += `/${pathSegments[i]}`;
    breadcrumbs.push({
      name: segmentNames[pathSegments[i]] || pathSegments[i],
      url: `https://centrlp.ru${currentPath}`
    });
  }

  breadcrumbs.push({
    name: pageName,
    url: `https://centrlp.ru${location.pathname}`
  });

  useBreadcrumbSchema(breadcrumbs);
};

interface ServiceSchemaProps {
  name: string;
  description: string;
  price?: string;
}

/**
 * Service JSON-LD schema for service pages
 */
export const useServiceSchema = ({ name, description, price }: ServiceSchemaProps) => {
  const location = useLocation();

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": name,
      "description": description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "CentrLP",
        "alternateName": [
          "CentrLP, агентство развития бизнеса",
          "Центр цифрового консалтинга CentrLP"
        ],
        "legalName": "ООО «ААМХ»",
        "taxID": "7203606424",
        "vatID": "7203606424",
        "identifier": {
          "@type": "PropertyValue",
          "propertyID": "ОГРН",
          "value": "1267200004818"
        },
        "url": "https://centrlp.ru",
        "telephone": "+7-905-824-85-64",
        "email": "1@centrlp.ru",
        "priceRange": "от 15 000 ₽",
        "sameAs": [
          "https://vk.com/centrlp",
          "https://t.me/centrlp",
          "https://t.me/centrlp_ideas",
          "https://2gis.ru/tyumen/firm/70000001033718655",
          "https://go.2gis.com/hUyea",
          "https://yandex.ru/maps/-/CLSbvKjF",
          "https://tyumen.flamp.ru/firm/centrlp_agentstvo_razvitiya_biznesa-70000001033718655"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "проезд Солнечный, 22",
          "addressLocality": "Тюмень",
          "postalCode": "625022",
          "addressCountry": "RU"
        },
        "founder": {
          "@type": "Person",
          "name": "Кузнецов Максим Владимирович"
        }
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Тюмень"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Тюменская область"
        },
        {
          "@type": "Country",
          "name": "Россия"
        }
      ],
      "url": `https://centrlp.ru${location.pathname}`,
      ...(price && {
        "offers": {
          "@type": "Offer",
          "price": price,
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock"
        }
      })
    };

    let script = document.getElementById('service-jsonld') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'service-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById('service-jsonld')?.remove();
    };
  }, [name, description, price, location.pathname]);
};
