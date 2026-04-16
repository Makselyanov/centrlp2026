import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

type ListType = 'bullet' | 'numbered';

type ListItemProps = React.LiHTMLAttributes<HTMLLIElement> & {
  'data-list'?: ListType;
  'data-index'?: number;
};

type CodeRendererProps = React.HTMLAttributes<HTMLElement> & {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Editorial markdown renderer for blog posts.
 * Single coherent design language across every element — no clashing styles.
 * All visuals follow CentrLP brand: #0096D6 (blue) + #44B78B (mint).
 */
export const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  // Helper: Get text from node recursively
  const getText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getText).join('');
    if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children) {
      return getText(node.props.children);
    }
    return '';
  };

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // ── Headings ────────────────────────────────────────────────
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold mt-10 mb-5 text-slate-900 tracking-tight" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="relative text-[28px] md:text-[32px] font-bold mt-12 mb-5 text-slate-900 tracking-tight pl-4 border-l-[3px] border-[#0096D6]" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-semibold mt-8 mb-3 text-slate-900 tracking-tight" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl font-semibold mt-6 mb-2 text-slate-900" {...props} />
          ),

          // ── Paragraph ───────────────────────────────────────────────
          p: ({ node, children, ...props }) => (
            <p className="text-[17px] leading-[1.8] text-slate-700 my-5" {...props}>
              {children}
            </p>
          ),

          // ── Links ───────────────────────────────────────────────────
          a: ({ node, children, href, ...props }) => {
            const linkText = getText(children);
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
            return (
              <a href={href} className="text-[#0096D6] hover:text-[#0077AA] underline decoration-2 underline-offset-4 decoration-[#0096D6]/30 hover:decoration-[#0096D6] transition-colors font-medium" {...props}>
                {children}
              </a>
            );
          },

          // ── Bullet lists: brand chevron rows ─────────────────────────
          ul: ({ node, children, ...props }) => (
            <ul className="my-6 space-y-2.5" {...props}>
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(child as React.ReactElement<ListItemProps>, { 'data-list': 'bullet' })
                  : child
              )}
            </ul>
          ),

          // ── Ordered lists: brand-numbered rows ───────────────────────
          ol: ({ node, children, ...props }) => {
            // Filter to React elements only and assign sequential indexes
            const items = React.Children.toArray(children).filter(React.isValidElement);
            return (
              <ol className="my-6 space-y-3" {...props}>
                {items.map((child, i) =>
                  React.cloneElement(child as React.ReactElement<ListItemProps>, {
                    'data-list': 'numbered',
                    'data-index': i + 1,
                  })
                )}
              </ol>
            );
          },

          li: ({ node, children, ...props }: ListItemProps) => {
            const listType = props['data-list'];
            const index = props['data-index'];
            // Strip our custom props from rendered element
            const { ['data-list']: _dl, ['data-index']: _di, ...rest } = props;

            if (listType === 'numbered') {
              return (
                <li className="relative pl-12 text-[17px] leading-[1.75] text-slate-700" {...rest}>
                  <span className="absolute left-0 top-[2px] flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0096D6] to-[#44B78B] text-white text-[13px] font-bold shadow-sm">
                    {String(index).padStart(2, '0')}
                  </span>
                  <span className="block">{children}</span>
                </li>
              );
            }

            // Default: bulleted (chevron)
            return (
              <li className="flex items-start gap-3 text-[17px] leading-[1.75] text-slate-700" {...rest}>
                <svg className="mt-[10px] h-3 w-3 flex-shrink-0 text-[#0096D6]" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 1l5 5-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="flex-1">{children}</span>
              </li>
            );
          },

          // ── Blockquote ──────────────────────────────────────────────
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-7 rounded-2xl border border-slate-200 bg-gradient-to-br from-[#0096D6]/5 to-[#44B78B]/5 px-6 py-5 text-[17px] leading-[1.75] text-slate-700 italic"
              {...props}
            />
          ),

          // ── Inline code ─────────────────────────────────────────────
          code: ({ node, className, ...props }: CodeRendererProps) => {
            const isInline = !className?.includes('language-');
            return isInline ? (
              <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.92em] font-mono text-slate-900 border border-slate-200" {...props} />
            ) : (
              <code className="bg-transparent p-0 rounded text-sm font-mono" {...props} />
            );
          },

          // ── Code blocks: ALWAYS editorial light (no dark terminal) ──
          pre: ({ node, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
            <div className="my-7 rounded-2xl border border-slate-200 bg-slate-50/70 shadow-sm">
              <pre className="overflow-x-auto bg-transparent p-5 text-[15px] leading-[1.75] text-slate-800 whitespace-pre-wrap break-words font-mono" {...props}>
                {children}
              </pre>
            </div>
          ),

          // ── Images ──────────────────────────────────────────────────
          img: ({ node, ...props }) => (
            <img className="my-8 rounded-2xl shadow-lg max-w-full h-auto border border-slate-200" {...props} />
          ),

          // ── Tables ──────────────────────────────────────────────────
          table: ({ node, ...props }) => (
            <div className="my-7 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-900" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border-b border-slate-100 px-4 py-3 text-[15px] text-slate-700" {...props} />
          ),

          // ── Horizontal rule ─────────────────────────────────────────
          hr: ({ node, ...props }) => (
            <hr className="my-10 border-0 h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" {...props} />
          ),

          // ── Strong / em ─────────────────────────────────────────────
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-slate-900" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
