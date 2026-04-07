/**
 * EnhancedMarkdown — wraps MarkdownRenderer and intercalates inline infographics
 * between H2 sections to break up long walls of text in blog posts.
 *
 * Pure client logic, no API calls. Each post deterministically gets up to 4
 * brand-aligned visual blocks based on its actual content.
 */
import { useMemo } from "react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { BlogInfographic } from "@/components/blog/BlogInfographic";
import { buildContentChunks } from "@/lib/extractInfographics";

interface EnhancedMarkdownProps {
    content: string;
}

export const EnhancedMarkdown = ({ content }: EnhancedMarkdownProps) => {
    const chunks = useMemo(() => buildContentChunks(content), [content]);

    return (
        <>
            {chunks.map((chunk, i) => (
                <div key={i}>
                    <MarkdownRenderer content={chunk.markdown} />
                    {chunk.infographicAfter && <BlogInfographic {...chunk.infographicAfter} />}
                </div>
            ))}
        </>
    );
};
