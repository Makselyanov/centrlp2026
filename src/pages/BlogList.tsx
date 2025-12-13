import { Layout } from "@/components/Layout";
import { getAllPosts } from "@/lib/blog";
import { Link } from "react-router-dom";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BlogList = () => {
    const posts = getAllPosts();

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
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/50 backdrop-blur-md border border-[#0096D6]/20 text-[#0096D6] font-semibold text-sm tracking-wide shadow-sm">
                            Блог | CentrLP
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                            Инсайты и <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0096D6] to-[#44B78B]">Статьи</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Полезные материалы о маркетинге, автоматизации, ИИ и разработке.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link to={`/blog/${post.slug}`}>
                                    <Card className="h-full hover:shadow-lg transition-shadow border-border/50 bg-white/60 backdrop-blur-sm flex flex-col">
                                        <CardHeader>
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex gap-2 flex-wrap">
                                                    {post.tags?.map(tag => (
                                                        <Badge key={tag} variant="secondary" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                                                    <Calendar className="w-3 h-3" />
                                                    {post.date}
                                                </span>
                                            </div>
                                            <CardTitle className="text-xl text-slate-900 group-hover:text-[#0096D6] transition-colors">
                                                {post.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-muted-foreground text-sm line-clamp-3">
                                                {post.description}
                                            </p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="ghost" className="p-0 h-auto font-medium text-[#0096D6] hover:text-[#007bb0] hover:bg-transparent group">
                                                Читать статью
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center text-muted-foreground py-20">
                            Пока нет статей. Заходите позже!
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default BlogList;
