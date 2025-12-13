import { Layout } from "@/components/Layout";
import { getPostBySlug } from "@/lib/blog";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Calendar, ArrowLeft, ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { motion } from "framer-motion";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const post = slug ? getPostBySlug(slug) : undefined;

    useEffect(() => {
        if (!post) {
            // Можно редиректить или показывать 404
            // navigate('/404');
        }
    }, [post, navigate]);

    if (!post) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
                    <Link to="/blog">
                        <Button>Вернуться в блог</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <article className="pt-32 pb-20 min-h-screen bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link to="/blog" className="inline-block mb-8">
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="w-4 h-4" />
                                Назад к списку
                            </Button>
                        </Link>

                        <header className="mb-10">
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {post.tags?.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 text-muted-foreground text-sm border-b border-border/50 pb-8">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </span>
                                {post.source && (
                                    <a
                                        href={post.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 hover:text-[#0096D6] transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Источник
                                    </a>
                                )}
                            </div>
                        </header>

                        <div className="prose prose-lg prose-slate max-w-none bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/50 shadow-sm">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>

                        {post.source && (
                            <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3 text-sm text-slate-600">
                                <ExternalLink className="w-5 h-5 text-[#0096D6] shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-semibold text-slate-900">Источник:</span>{" "}
                                    <a href={post.source} target="_blank" rel="noopener noreferrer" className="text-[#0096D6] hover:underline break-all">
                                        {post.source}
                                    </a>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </article>
        </Layout>
    );
};

export default BlogPost;
