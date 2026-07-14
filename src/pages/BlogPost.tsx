import { Layout } from "@/components/Layout";
import { getPostBySlug, getRelatedPosts, generateTableOfContents } from "@/lib/blog";
import { useParams, Link } from "react-router-dom";
import { EnhancedMarkdown } from "@/components/EnhancedMarkdown";
import { Calendar, ArrowLeft, Copy, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { trackMetric } from "@/lib/metrics";

// Brand gradient constant (from /prices page)
const BRAND_GRADIENT = "from-[#0096D6] via-[#44B78B] to-[#0096D6]";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const progressBarRef = useRef<HTMLDivElement>(null);
    const scrollRAFRef = useRef<number | null>(null);
    const [toc, setToc] = useState<Array<{ level: number; text: string; id: string }>>([]);
    const [copied, setCopied] = useState(false);

    const post = slug ? getPostBySlug(slug) : undefined;
    const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];
    const metaTitle = post?.seoTitle || post?.title || "";
    const metaDescription = post?.seoDescription || post?.description || "";

    // Генерируем оглавление
    useEffect(() => {
        if (!post) {
            setToc([]);
            return;
        }
        const tableOfContents = generateTableOfContents(post.content);
        setToc(tableOfContents);
    }, [post]);

    // JSON-LD Article + BreadcrumbList schema
    useEffect(() => {
        if (!post) {
            return;
        }
        const articleSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": metaDescription || post.description,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
                "@type": "Organization",
                "name": "CentrLP",
                "url": "https://centrlp.ru"
            },
            "publisher": {
                "@type": "Organization",
                "name": "CentrLP",
                "url": "https://centrlp.ru",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://centrlp.ru/favicon.jpg"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://centrlp.ru/blog/${post.slug}`
            },
            "keywords": post.tags?.join(", ") || "",
            "wordCount": post.content.split(/\s+/).length,
            "inLanguage": "ru"
        };

        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": "https://centrlp.ru/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Блог",
                    "item": "https://centrlp.ru/blog"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": post.title,
                    "item": `https://centrlp.ru/blog/${post.slug}`
                }
            ]
        };

        // Add article schema
        let articleScript = document.getElementById('article-jsonld') as HTMLScriptElement;
        if (!articleScript) {
            articleScript = document.createElement('script');
            articleScript.id = 'article-jsonld';
            articleScript.type = 'application/ld+json';
            document.head.appendChild(articleScript);
        }
        articleScript.textContent = JSON.stringify(articleSchema);

        // Add breadcrumb schema
        let breadcrumbScript = document.getElementById('breadcrumb-jsonld') as HTMLScriptElement;
        if (!breadcrumbScript) {
            breadcrumbScript = document.createElement('script');
            breadcrumbScript.id = 'breadcrumb-jsonld';
            breadcrumbScript.type = 'application/ld+json';
            document.head.appendChild(breadcrumbScript);
        }
        breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);

        return () => {
            document.getElementById('article-jsonld')?.remove();
            document.getElementById('breadcrumb-jsonld')?.remove();
        };
    }, [post]);

    // Optimized scroll logic
    useEffect(() => {
        const handleScroll = () => {
            if (!progressBarRef.current) return;

            if (scrollRAFRef.current !== null) {
                return; // Frame already requested
            }

            scrollRAFRef.current = requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const rawPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;
                // Clamp between 0 and 1
                const clampedScale = Math.min(Math.max(rawPercent, 0), 1);

                if (progressBarRef.current) {
                    progressBarRef.current.style.transform = `scaleX(${clampedScale})`;
                }
                scrollRAFRef.current = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollRAFRef.current !== null) {
                cancelAnimationFrame(scrollRAFRef.current);
            }
        };
    }, []);

    if (!slug) {
        return (
            <Layout>
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 min-h-screen">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#0096D6]/10 blur-[120px]" />
                        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#44B78B]/10 blur-[120px]" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                        <div className="text-center py-20">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">404</h1>
                            <p className="text-2xl font-semibold text-slate-700 mb-3">Статья не найдена</p>
                            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                                К сожалению, статья с таким адресом не существует.
                            </p>
                            <Button asChild size="lg" className="gap-2">
                                <Link to="/blog">
                                    <ArrowLeft className="w-4 h-4" />
                                    Вернуться в блог
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 min-h-screen">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#0096D6]/10 blur-[120px]" />
                        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#44B78B]/10 blur-[120px]" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                        <div className="text-center py-20">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">404</h1>
                            <p className="text-2xl font-semibold text-slate-700 mb-3">Статья не найдена</p>
                            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                                К сожалению, статья с адресом "{slug}" не существует или была удалена.
                            </p>
                            <Button asChild size="lg" className="gap-2">
                                <Link to="/blog">
                                    <ArrowLeft className="w-4 h-4" />
                                    Вернуться в блог
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    const handleCopyLink = async () => {
        const url = `${window.location.origin}/blog/${post.slug}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Ошибка при копировании:', err);
        }
    };

    // Проверяем наличие TOC
    const hasToc = toc && toc.length > 0;

    const coverSrc = post.slug === "ekspress-audit-saita-net-zayavok-48-chasov"
        ? "/og/blog.png"
        : `/og/posts/${post.slug}.png`;
    const ctaTitle = typeof post.ctaTitle === "string" && post.ctaTitle.trim()
        ? post.ctaTitle.trim()
        : "РЎР°Р№С‚ РµСЃС‚СЊ, РЅРѕ Р·Р°СЏРІРѕРє РјР°Р»Рѕ?";
    const ctaText = typeof post.ctaText === "string" && post.ctaText.trim()
        ? post.ctaText.trim()
        : "РџСЂРѕРІРµСЂРёРј РїРµСЂРІС‹Р№ СЌРєСЂР°РЅ, С„РѕСЂРјСѓ, Р±С‹СЃС‚СЂС‹Рµ РєРѕРЅС‚Р°РєС‚С‹, РњРµС‚СЂРёРєСѓ Рё РїСѓС‚СЊ РѕР±СЂР°С‰РµРЅРёСЏ Р·Р° 48 С‡Р°СЃРѕРІ. РќР° РІС‹С…РѕРґРµ Р±СѓРґРµС‚ СЃРїРёСЃРѕРє РїСЂР°РІРѕРє, СЃ РєРѕС‚РѕСЂС‹С… СЃС‚РѕРёС‚ РЅР°С‡РёРЅР°С‚СЊ СЂРѕСЃС‚ Р·Р°СЏРІРѕРє.";
    const primaryCtaLabel = typeof post.primaryCtaLabel === "string" && post.primaryCtaLabel.trim()
        ? post.primaryCtaLabel.trim()
        : "РџРѕР»СѓС‡РёС‚СЊ СЂР°Р·Р±РѕСЂ Р·Р° 48 С‡Р°СЃРѕРІ";
    const primaryCtaHref = typeof post.primaryCtaHref === "string" && post.primaryCtaHref.trim()
        ? post.primaryCtaHref.trim()
        : "/proverka-saita-i-zayavok-za-48-chasov";
    const hasExplicitPrimaryCta = typeof post.primaryCtaHref === "string"
        && post.primaryCtaHref.trim().length > 0
        && typeof post.primaryCtaLabel === "string"
        && post.primaryCtaLabel.trim().length > 0;
    const secondaryCtaLabel = typeof post.secondaryCtaLabel === "string" && post.secondaryCtaLabel.trim()
        ? post.secondaryCtaLabel.trim()
        : "РџРѕР»СѓС‡РёС‚СЊ РєРѕРЅСЃСѓР»СЊС‚Р°С†РёСЋ";
    const secondaryCtaHref = typeof post.secondaryCtaHref === "string" && post.secondaryCtaHref.trim()
        ? post.secondaryCtaHref.trim()
        : "/contacts";

    // Hero Section Component
    const HeroSection = () => (
        <section className="relative pt-12 pb-12 mb-12 bg-gradient-to-r from-slate-50 via-blue-50/20 to-slate-50 border-b border-slate-200/50">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <Button asChild variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
                    <Link to="/blog">
                        <ArrowLeft className="w-4 h-4" />
                        Назад к списку
                    </Link>
                </Button>

                <header className="mb-6">
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {post.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-blue-100/50 text-slate-700">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${BRAND_GRADIENT} text-transparent bg-clip-text mb-6 leading-tight`}>
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-6">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#0096D6]" />
                            {new Date(post.date).toLocaleDateString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        {post.readTime && (
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#0096D6]" />
                                {post.readTime} мин. чтения
                            </span>
                        )}
                    </div>

                    <p className="text-lg text-slate-700 mb-6">
                        {post.description}
                    </p>

                    {hasExplicitPrimaryCta && (
                        <Button
                            asChild
                            size="lg"
                            className={`mb-6 h-auto min-h-12 w-full whitespace-normal bg-gradient-to-r ${BRAND_GRADIENT} px-5 py-3 text-center text-base font-semibold text-white shadow-button transition-opacity hover:opacity-90 sm:w-auto`}
                        >
                            <Link
                                to={primaryCtaHref}
                                onClick={() => trackMetric("blog_hero_primary_cta_click", {
                                    slug: post.slug,
                                    target: primaryCtaHref,
                                })}
                            >
                                {primaryCtaLabel}
                                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                            </Link>
                        </Button>
                    )}

                    <div className="flex gap-3 flex-wrap">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={handleCopyLink}
                        >
                            <Copy className="w-4 h-4" />
                            {copied ? 'Скопировано!' : 'Копировать ссылку'}
                        </Button>
                    </div>
                </header>

                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-[#0096D6]/10 via-white to-[#44B78B]/10 shadow-sm">
                    <img
                        src={coverSrc}
                        alt={`${post.title} — обложка статьи CentrLP`}
                        loading="eager"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>
            </div>
        </section>
    );

    // Layout with TOC Component
    const LayoutWithToc = () => (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <div className="min-w-0">
                <article className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-slate-200/60 shadow-sm">
                    <EnhancedMarkdown content={post.content} />
                </article>
            </div>

            <aside className="hidden lg:block sticky top-24 h-fit">
                <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                        Оглавление
                    </h3>
                    <nav className="space-y-2 text-sm">
                        {toc.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`block transition-colors hover:text-[#0096D6] ${item.level === 2
                                    ? 'text-slate-900 font-medium'
                                    : 'text-slate-600 ml-4'
                                    }`}
                            >
                                {item.text}
                            </a>
                        ))}
                    </nav>
                </div>
            </aside>
        </div>
    );

    // Layout without TOC Component
    const LayoutNoToc = () => (
        <div className="mx-auto w-full max-w-3xl">
            <article className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-slate-200/60 shadow-sm">
                <EnhancedMarkdown content={post.content} />
            </article>
        </div>
    );

    // CTA Block Component
    const CTABlock = () => (
        <div className={`mt-12 p-[1px] bg-gradient-to-r ${BRAND_GRADIENT} rounded-2xl shadow-lg`}>
            <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/40 dark:border-white/10">
                <div className="flex flex-col gap-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                            Сайт есть, но заявок мало?
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                            Проверим первый экран, форму, быстрые контакты, Метрику и путь обращения за 48 часов. На выходе будет список правок, с которых стоит начинать рост заявок.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button asChild className={`flex-1 w-full bg-gradient-to-r ${BRAND_GRADIENT} text-white hover:opacity-90 transition-opacity h-12 text-base font-semibold rounded-lg`}>
                            <Link to="/proverka-saita-i-zayavok-za-48-chasov">
                                Получить разбор за 48 часов
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1 w-full h-12 text-base font-semibold rounded-lg border-2 border-[#0096D6] text-[#0096D6] hover:bg-[#0096D6]/10">
                            <Link to="/contacts">
                                Получить консультацию
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    const BlogCtaBlock = () => (
        <div className={`mt-12 p-[1px] bg-gradient-to-r ${BRAND_GRADIENT} rounded-2xl shadow-lg`}>
            <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/40 dark:border-white/10">
                <div className="flex flex-col gap-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                            {ctaTitle}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                            {ctaText}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button asChild className={`flex-1 w-full bg-gradient-to-r ${BRAND_GRADIENT} text-white hover:opacity-90 transition-opacity h-12 text-base font-semibold rounded-lg`}>
                            <Link to={primaryCtaHref}>
                                {primaryCtaLabel}
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1 w-full h-12 text-base font-semibold rounded-lg border-2 border-[#0096D6] text-[#0096D6] hover:bg-[#0096D6]/10">
                            <Link to={secondaryCtaHref}>
                                {secondaryCtaLabel}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Related Posts Component
    const RelatedPosts = () => {
        if (relatedPosts.length === 0) return null;
        return (
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Читайте также</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((rp) => (
                        <Link key={rp.slug} to={`/blog/${rp.slug}`}>
                            <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200/50 bg-white/60 backdrop-blur-sm hover:border-[#0096D6]/30 group">
                                <CardHeader className="pb-3">
                                    <div className="flex gap-2 flex-wrap mb-2">
                                        {rp.tags?.slice(0, 2).map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-xs bg-blue-100/50 text-blue-700">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <CardTitle className="text-base text-slate-900 group-hover:text-[#0096D6] transition-colors leading-snug">
                                        {rp.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 text-sm line-clamp-2 mb-3">{rp.description}</p>
                                    <span className="text-sm font-medium text-[#0096D6] inline-flex items-center gap-1">
                                        Читать <ArrowRight className="w-3 h-3" />
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Layout
            title={metaTitle}
            description={metaDescription}
        >
            {/* Progress Bar - using ref and scaleX transform */}
            <div
                ref={progressBarRef}
                className={`fixed top-0 left-0 h-1 bg-gradient-to-r ${BRAND_GRADIENT} z-50 origin-left`}
                style={{ transform: 'scaleX(0)' }}
            />

            <article className="pt-20 pb-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <HeroSection />

                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        {hasToc ? <LayoutWithToc /> : <LayoutNoToc />}
                    </div>
                    <div className="mx-auto max-w-3xl">
                        <BlogCtaBlock />
                        <RelatedPosts />
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default BlogPost;
