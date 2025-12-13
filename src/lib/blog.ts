import matter from 'gray-matter';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
    tags?: string[];
    source?: string;
    [key: string]: any;
}

// Импортируем все md файлы
const posts = import.meta.glob('/content/posts/*.md', { as: 'raw', eager: true });

export const getAllPosts = (): BlogPost[] => {
    const allPosts = Object.keys(posts).map((filePath) => {
        const fileContent = posts[filePath] as string;
        const { data, content } = matter(fileContent);

        // Извлекаем slug из имени файла: YYYY-MM-DD-filename.md -> filename
        const fileName = filePath.split('/').pop()?.replace('.md', '') || '';
        // Если формат YYYY-MM-DD-name.md, убираем дату (первые 11 символов)
        // Либо можно использовать всё имя файла как slug. 
        // В данном случае пользователь попросил: "slug бери из имени файла: если файл называется 2025-12-13-my-post.md, то slug = my-post"
        // Проверим паттерн даты в начале
        const slug = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)$/)?.[1] || fileName;

        return {
            slug,
            title: data.title || 'No Title',
            date: data.date || '',
            description: data.description || '',
            tags: data.tags || [],
            source: data.source || '',
            content,
            ...data,
        };
    });

    // Сортировка по дате (новые сверху)
    return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    const allPosts = getAllPosts();
    return allPosts.find((post) => post.slug === slug);
};
