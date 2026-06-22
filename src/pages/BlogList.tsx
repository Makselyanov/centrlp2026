import { Layout } from "@/components/Layout";
import { getAllPosts } from "@/lib/blog";
import { Link } from "react-router-dom";
import { Calendar, Tag, ArrowRight, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

const BlogList = () => {
    const posts = getAllPosts();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Получаем уникальные теги, отсортированные по частоте использования.
    // Дубликаты с разным регистром схлопываем (берём первый встретившийся вариант).
    const allTags = useMemo(() => {
        const counts = new Map<string, { display: string; count: number }>();
        posts.forEach(post => {
            post.tags?.forEach(tag => {
                const key = tag.trim().toLowerCase();
                const existing = counts.get(key);
                if (existing) {
                    existing.count += 1;
                } else {
                    counts.set(key, { display: tag.trim(), count: 1 });
                }
            });
        });
        return Array.from(counts.values())
            .sort((a, b) => b.count - a.count || a.display.localeCompare(b.display, 'ru'))
            .map(t => t.display);
    }, [posts]);

    const [showAllTags, setShowAllTags] = useState(false);
    const VISIBLE_TAGS = 12;
    const visibleTags = showAllTags ? allTags : allTags.slice(0, VISIBLE_TAGS);
    const hiddenCount = allTags.length - VISIBLE_TAGS;

    // Фильтруем посты
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTags = selectedTags.length === 0 ||
                selectedTags.some(tag => post.tags?.includes(tag));

            return matchesSearch && matchesTags;
        });
    }, [posts, searchQuery, selectedTags]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    if (!posts || posts.length === 0) {
        return (
            <Layout>
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 min-h-screen">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#0096D6]/10 blur-[120px]" />
                        <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#44B78B]/10 blur-[120px]" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-block p-[1px] mb-6 rounded-full bg-gradient-to-r from-[#0096D6] via-[#44B78B] to-[#0096D6]">
                                <div className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B] font-semibold text-sm tracking-wide shadow-lg shadow-[#0096D6]/10">
                                    Блог | CentrLP
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] via-[#44B78B] to-[#0096D6] bg-[length:200%_auto] animate-gradient">
                                    Инсайты и Статьи
                                </span>
                            </h1>
                        </motion.div>

                        <div className="text-center py-24">
                            <div className="inline-block px-6 py-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-border/50">
                                <h2 className="text-2xl font-semibold text-slate-900 mb-3">Пока нет инсайтов</h2>
                                <p className="text-muted-foreground mb-4 max-w-sm">
                                    Раздел находится в разработке. Добавьте markdown-файл в папку <code className="bg-slate-100 px-2 py-1 rounded text-sm">content/posts/</code>
                                </p>
                                <p className="text-sm text-slate-500">
                                    Пример имени файла: <code className="bg-slate-100 px-2 py-1 rounded">2025-12-13-test-post.md</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout
            title="Блог CentrLP — статьи о маркетинге, ИИ и продвижении бизнеса"
            description="Полезные статьи о маркетинге, ВКонтакте, Яндекс.Директ, искусственном интеллекте, создании сайтов и автоматизации бизнеса. Экспертный блог студии CentrLP."
        >
            <section className="relative pt-20 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white min-h-screen">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#0096D6]/10 blur-[120px]" />
                    <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#44B78B]/10 blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/50 backdrop-blur-md border border-[#0096D6]/20 text-[#0096D6] font-semibold text-sm tracking-wide shadow-sm">
                            Блог | CentrLP
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] via-[#44B78B] to-[#0096D6] bg-[length:200%_auto] animate-gradient">
                                Инсайты и Статьи
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Полезные материалы о маркетинге, автоматизации, ИИ и разработке.
                        </p>
                    </motion.div>

                    {/* Search and Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-12 space-y-6"
                    >
                        {/* Search Input */}
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Поиск по названию или описанию..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 py-3 text-base rounded-full border-slate-200/50 bg-white/60 backdrop-blur-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Tags Filter — compact: top tags by frequency, expandable */}
                        {allTags.length > 0 && (
                            <div className="max-w-3xl mx-auto">
                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                                        <Tag className="h-3.5 w-3.5" />
                                        Теги
                                    </p>
                                    {selectedTags.length > 0 && (
                                        <button
                                            onClick={() => setSelectedTags([])}
                                            className="text-xs font-medium text-slate-500 hover:text-[#0096D6] transition-colors"
                                        >
                                            Сбросить ({selectedTags.length})
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-1.5 justify-center">
                                    {visibleTags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedTags.includes(tag)
                                                ? 'bg-[#0096D6] text-white shadow-sm'
                                                : 'bg-white/70 text-slate-600 border border-slate-200 hover:border-[#0096D6]/50 hover:text-[#0096D6]'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                    {hiddenCount > 0 && (
                                        <button
                                            onClick={() => setShowAllTags(prev => !prev)}
                                            className="px-3 py-1 rounded-full text-xs font-medium text-[#0096D6] border border-dashed border-[#0096D6]/40 hover:bg-[#0096D6]/5 transition-colors"
                                        >
                                            {showAllTags ? 'Свернуть' : `Ещё ${hiddenCount}`}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Results Count */}
                        {(searchQuery || selectedTags.length > 0) && (
                            <div className="text-center text-sm text-slate-600">
                                {filteredPosts.length === 0
                                    ? 'Статьи не найдены'
                                    : `Найдено ${filteredPosts.length} статей${filteredPosts.length % 10 === 1 && filteredPosts.length !== 11 ? 'а' : ''}`
                                }
                            </div>
                        )}
                    </motion.div>

                    {/* Posts Grid */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                >
                                    <Link to={`/blog/${post.slug}`}>
                                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200/50 bg-white/60 backdrop-blur-sm flex flex-col hover:border-[#0096D6]/30 group overflow-hidden">
                                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#0096D6]/10 via-white to-[#44B78B]/10">
                                                <img
                                                    src={`/og/posts/${post.slug}.png`}
                                                    alt={`${post.title} — обложка`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = "/og/blog.png";
                                                    }}
                                                />
                                            </div>
                                            <CardHeader className="pb-3">
                                                <div className="flex justify-between items-start mb-3 gap-2">
                                                    <div className="flex gap-2 flex-wrap">
                                                        {post.tags?.slice(0, 2).map(tag => (
                                                            <Badge
                                                                key={tag}
                                                                variant="secondary"
                                                                className="text-xs bg-blue-100/50 text-blue-700 hover:bg-blue-100"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0 whitespace-nowrap">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.date).toLocaleDateString('ru-RU', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <CardTitle className="text-lg text-slate-900 group-hover:text-[#0096D6] transition-colors leading-snug">
                                                    {post.title}
                                                </CardTitle>
                                            </CardHeader>

                                            <CardContent className="flex-grow pb-4">
                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                                                    {post.description}
                                                </p>
                                            </CardContent>

                                            <CardFooter className="flex justify-between items-center pt-4 border-t border-slate-100/50">
                                                <div className="text-xs text-slate-500">
                                                    {post.readTime && `${post.readTime} мин.`}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-0 h-auto font-medium text-[#0096D6] hover:text-[#007bb0] hover:bg-transparent group/btn"
                                                >
                                                    Читать
                                                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16"
                        >
                            <p className="text-lg text-slate-600">
                                {searchQuery
                                    ? 'Статьи по вашему запросу не найдены'
                                    : 'Статьи по выбранным фильтрам не найдены'
                                }
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default BlogList;
