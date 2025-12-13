import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Brand gradient constant (from /prices page)
const BRAND_GRADIENT = "from-[#0096D6] via-[#44B78B] to-[#0096D6]";

export const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  // Helper: Check if link text is a CTA (contains keywords like "Заказать", "Получить" etc)
  const isCTALink = (text: string): boolean => {
    const ctaKeywords = [
      'заказать',
      'заказать аудит',
      'получить',
      'записаться',
      'оставить заявку',
      'консультац',
      'связаться',
      'обратиться'
    ];
    const lowerText = text.toLowerCase();
    return ctaKeywords.some(keyword => lowerText.includes(keyword));
  };

  // Helper: Get text from node recursively
  const getText = (node: any): string => {
    if (typeof node === 'string') {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map(getText).join('');
    }
    if (node && typeof node === 'object' && 'props' in node && node.props.children) {
      return getText(node.props.children);
    }
    return '';
  };

  // Helper: Check if code block has a language (not text, not empty)
  const getLanguageFromPre = (node: any): string | null => {
    if (!node || !node.children || !Array.isArray(node.children)) return null;
    const codeNode = node.children[0];
    if (!codeNode || codeNode.type !== 'code') return null;

    const lang = codeNode.meta || codeNode.lang || '';
    // If language is 'text' or 'markdown' or empty, treat as callout
    if (!lang || lang.toLowerCase() === 'text' || lang.toLowerCase() === 'markdown') {
      return null;
    }
    return lang;
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // h1: Not used in markdown content - gradient applied in BlogPost hero section
        h1: ({ node, ...props }) => (
          <h1 className="text-4xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100" {...props} />
        ),
        // h2-h4: Regular dark colors, no gradient
        h2: ({ node, ...props }) => (
          <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-2xl font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-xl font-semibold mt-5 mb-2 text-slate-900 dark:text-slate-100" {...props} />
        ),
        p: ({ node, children, ...props }) => (
          <p className="text-base leading-7 text-slate-700 dark:text-slate-300 my-4" {...props}>
            {children}
          </p>
        ),
        // Links: CTA detection with gradient button or regular underlined link
        a: ({ node, children, href, ...props }) => {
          const linkText = getText(children);

          // Check if this is a CTA link using regex for better matching
          const ctaRegex = /(заказать|получить|запис(аться|ать)|оставить заявку|консультац|связаться|обратиться)/i;
          const isCTA = ctaRegex.test(linkText);

          if (isCTA) {
            return (
              <a
                href={href}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0096D6] via-[#44B78B] to-[#0096D6] bg-[length:200%_auto] animate-gradient text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 no-underline cursor-pointer group"
                {...props}
              >
                {children}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            );
          }

          // Regular link
          return (
            <a href={href} className="text-[#0096D6] hover:text-[#0077AA] underline decoration-2 transition-colors" {...props}>
              {children}
            </a>
          );
        },
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside my-4 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside my-4 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
        ),
        li: ({ node, ...props }) => <li className="ml-2" {...props} />,
        // Blockquote: Light glass callout design
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-slate-300 bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm pl-5 pr-4 py-4 my-6 rounded-r-2xl border border-border/50 shadow-sm text-slate-700 dark:text-slate-300 italic"
            {...props}
          />
        ),
        // Inline code
        code: ({ node, inline, className, ...props }: any) => {
          const isInline = !className?.includes('language-');
          return isInline ? (
            <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700" {...props} />
          ) : (
            <code className="bg-transparent p-0 rounded text-sm font-mono" {...props} />
          );
        },
        // Pre/Code blocks: Language-tagged (dark) vs text/markdown (light callout)
        pre: ({ node, children, ...props }: any) => {
          // Check if this pre block has a real language
          const language = getLanguageFromPre(node);

          if (!language) {
            // This is a callout/example block (no language or language is 'text'/'markdown')
            // Glass-card style with subtle gradient accent
            return (
              <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur border border-border/50 shadow-sm rounded-2xl my-6">
                <pre className="bg-transparent p-5 overflow-x-auto text-slate-900 dark:text-slate-100 whitespace-pre-wrap break-words font-sans text-sm" {...props}>
                  {children}
                </pre>
              </div>
            );
          }

          // This is a real code block with language
          return (
            <pre className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5 rounded-xl overflow-x-auto my-6 border border-l-4 border-l-[#0096D6] border-slate-700/50 shadow-lg shadow-[#0096D6]/20 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full" {...props}>
              {children}
            </pre>
          );
        },
        img: ({ node, ...props }) => (
          <img className="rounded-xl shadow-lg max-w-full h-auto my-8 border border-slate-200 dark:border-slate-700" {...props} />
        ),
        table: ({ node, ...props }) => (
          <table className="w-full border-collapse my-4 border border-slate-300 dark:border-slate-600" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 px-4 py-2 text-left font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="border border-slate-300 dark:border-slate-600 px-4 py-2" {...props} />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-8 border-slate-300 dark:border-slate-600" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
