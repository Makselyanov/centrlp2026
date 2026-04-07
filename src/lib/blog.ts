// @ts-ignore
import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
    tags?: string[];
    source?: string;
    readTime?: number;
    [key: string]: any;
}

// Импортируем все md файлы
const globModules = import.meta.glob<string>('/content/posts/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

/**
 * Парсим два формата frontmatter:
 * A) Нормальный YAML (серые дефисы ---):
 *    ---
 *    title: ...
 *    date: 2025-12-13
 *    ---
 * B) Legacy (без ---, просто ключ: значение в начале):
 *    title: "..."
 *    date: "2025-12-13"
 *    source: ""
 */
const parseMarkdown = (filePath: string, content: string): BlogPost | null => {
    try {
        const fileName = filePath.split('/').pop()?.replace('.md', '') || '';
        
        let frontmatter: any = {};
        let markdownContent = content;
        
        // Пробуем распарсить как YAML frontmatter (---...---)
        try {
            const { data, content: md } = matter(content);
            frontmatter = data || {};
            markdownContent = md.trim();
        } catch {
            // Если YAML не получилось, проверяем legacy формат
            const lines = content.split('\n');
            const legacyLines: string[] = [];
            let contentStartIndex = 0;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                
                // Ищем строки вида key: value
                if (line.includes(':') && !line.startsWith('#') && i < 20) {
                    try {
                        const [key, ...valueParts] = line.split(':');
                        const value = valueParts.join(':').trim();
                        
                        // Парсим значение
                        if (value.startsWith('[') && value.endsWith(']')) {
                            // JSON массив
                            try {
                                frontmatter[key.trim()] = JSON.parse(value);
                            } catch {
                                // Если JSON не получился, берём как строку
                                frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
                            }
                        } else if (value.startsWith('"') && value.endsWith('"')) {
                            // Строка в кавычках
                            frontmatter[key.trim()] = value.slice(1, -1);
                        } else if (value === '') {
                            // Пустое значение
                            frontmatter[key.trim()] = '';
                        } else {
                            // Обычное значение
                            frontmatter[key.trim()] = value;
                        }
                        legacyLines.push(line);
                        contentStartIndex = i + 1;
                    } catch {
                        break;
                    }
                } else if (line === '') {
                    // Пропускаем пустую строку после frontmatter
                    if (Object.keys(frontmatter).length > 0) {
                        contentStartIndex = i + 1;
                        break;
                    }
                } else {
                    // Нашли обычный контент
                    if (Object.keys(frontmatter).length > 0 && !line.startsWith('title:') && !line.startsWith('date:')) {
                        break;
                    }
                }
            }
            
            // Если нашли legacy frontmatter, используем оставшийся контент
            if (Object.keys(frontmatter).length > 0) {
                markdownContent = lines.slice(contentStartIndex).join('\n').trim();
            } else {
                markdownContent = content;
            }
        }

        // ===== SLUG =====
        const slug = frontmatter.slug || 
            fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').toLowerCase() ||
            fileName;

        // ===== DATE =====
        let date = frontmatter.date || '';
        if (!date && fileName.match(/^\d{4}-\d{2}-\d{2}/)) {
            date = fileName.substring(0, 10);
        }
        if (!date) date = new Date().toISOString().split('T')[0];

        // ===== TITLE =====
        let title = frontmatter.title || '';
        if (!title) {
            // Ищем первый H1
            const h1Match = markdownContent.match(/^#\s+(.+)$/m);
            if (h1Match) {
                title = h1Match[1].trim();
            } else {
                // Из имени файла
                title = fileName
                    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
                    .replace(/[-_]/g, ' ')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }
        }

        // ===== DESCRIPTION =====
        let description = frontmatter.description || '';
        if (!description) {
            const lines = markdownContent.split('\n');
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed && 
                    !trimmed.startsWith('#') && 
                    !trimmed.startsWith('-') && 
                    !trimmed.startsWith('*') && 
                    !trimmed.startsWith('>') &&
                    !trimmed.startsWith('|')) {
                    description = trimmed;
                    break;
                }
            }
        }
        if (description.length > 220) {
            description = description.substring(0, 217) + '...';
        }

        // ===== TAGS =====
        let tags: string[] = [];
        if (frontmatter.tags) {
            if (Array.isArray(frontmatter.tags)) {
                tags = frontmatter.tags;
            } else if (typeof frontmatter.tags === 'string') {
                // Пробуем JSON
                try {
                    tags = JSON.parse(frontmatter.tags);
                } catch {
                    // Если не JSON, разбиваем по запятым
                    tags = frontmatter.tags.split(',').map((t: string) => t.trim());
                }
            }
        }

        // ===== SOURCE =====
        const source = frontmatter.source || '';

        // ===== READ TIME =====
        const wordCount = markdownContent.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        return {
            slug,
            title,
            date,
            description,
            content: markdownContent,
            tags,
            source,
            readTime,
            ...frontmatter,
        };
    } catch (err) {
        console.error(`[blog] Ошибка парсинга ${filePath}:`, err);
        return null;
    }
};

export const getAllPosts = (): BlogPost[] => {
    const posts: BlogPost[] = [];

    Object.entries(globModules).forEach(([filePath, fileContent]) => {
        const post = parseMarkdown(filePath, fileContent as string);
        if (post) {
            posts.push(post);
        }
    });

    // Сортируем по дате (новые сверху)
    posts.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });

    if (import.meta.env.DEV) {
        console.log('[blog] Загружено постов:', posts.length);
    }

    return posts;
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return getAllPosts().find(post => post.slug === slug);
};

/**
 * Получает похожие посты по тегам (исключая текущий)
 */
export const getRelatedPosts = (currentSlug: string, limit: number = 3): BlogPost[] => {
    const allPosts = getAllPosts();
    const currentPost = allPosts.find(p => p.slug === currentSlug);
    if (!currentPost) return allPosts.filter(p => p.slug !== currentSlug).slice(0, limit);

    const currentTags = currentPost.tags || [];

    const scored = allPosts
        .filter(p => p.slug !== currentSlug)
        .map(post => {
            const sharedTags = (post.tags || []).filter(t => currentTags.includes(t)).length;
            return { post, score: sharedTags };
        })
        .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map(s => s.post);
};

/**
 * Генерирует оглавление (TOC) из markdown контента
 */
export const generateTableOfContents = (content: string): Array<{ level: number; text: string; id: string }> => {
    const headings: Array<{ level: number; text: string; id: string }> = [];
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
        const match = line.match(/^(#{2,3})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const text = match[2];
            const id = `heading-${index}`;
            headings.push({ level, text, id });
        }
    });
    
    return headings;
};
