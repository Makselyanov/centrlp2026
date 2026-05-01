import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'posts');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'dzen-rss.xml');
const SITE_URL = (process.env.SITE_URL || 'https://centrlp.ru').replace(/\/$/, '');
const FEED_LIMIT = Number(process.env.DZEN_RSS_LIMIT || 30);

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cdata(value = '') {
  return `<![CDATA[${String(value).replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
}

function slugFromFile(file) {
  return file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function stripMarkdown(markdown = '') {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_~`>#|]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function descriptionFrom(content, frontmatter) {
  const explicit = frontmatter.description || frontmatter.seoDescription;
  if (explicit) return String(explicit).trim();
  const plain = stripMarkdown(content);
  return plain.slice(0, 240).replace(/\s+\S*$/, '').trim();
}

function imageFor(slug) {
  const candidates = [
    { rel: `og/posts/${slug}.png`, type: 'image/png' },
    { rel: `og/posts/${slug}.jpg`, type: 'image/jpeg' },
    { rel: 'og/blog.png', type: 'image/png' },
  ];
  const found = candidates.find(item => fs.existsSync(path.join(PUBLIC_DIR, item.rel))) || candidates.at(-1);
  return { url: `${SITE_URL}/${found.rel}`, type: found.type };
}

function readPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(CONTENT_DIR, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const parsed = matter(raw);
      const slug = parsed.data.slug || slugFromFile(file);
      const date = parsed.data.date || file.slice(0, 10) || fs.statSync(fullPath).mtime.toISOString().slice(0, 10);
      const title = parsed.data.title || parsed.content.match(/^#\s+(.+)$/m)?.[1] || slug.replace(/-/g, ' ');
      const description = descriptionFrom(parsed.content, parsed.data);
      return {
        slug,
        title,
        description,
        date: new Date(`${date}T09:00:00+05:00`),
        url: `${SITE_URL}/blog/${slug}`,
        image: imageFor(slug),
        tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
        fullText: stripMarkdown(parsed.content),
      };
    })
    .filter(post => post.fullText.split(/\s+/).length >= 150)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, FEED_LIMIT);
}

function renderFeed(posts) {
  const lastBuildDate = posts[0]?.date
    ? posts[0].date.toUTCString()
    : new Date('2026-01-01T00:00:00Z').toUTCString();
  const items = posts.map(post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(post.url)}</link>
      <guid isPermaLink="true">${escapeXml(post.url)}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${cdata(post.description)}</description>
      <yandex:full-text>${cdata(post.fullText)}</yandex:full-text>
      <enclosure url="${escapeXml(post.image.url)}" type="${escapeXml(post.image.type)}" />
${post.tags.slice(0, 6).map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:yandex="http://news.yandex.ru"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>CentrLP — статьи о сайтах, маркетинге и автоматизации</title>
    <link>${SITE_URL}/blog</link>
    <description>Экспертные статьи CentrLP: сайты, маркетинг, CRM, Яндекс Директ, AI-автоматизация и контент-завод.</description>
    <language>ru</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

const posts = readPosts();
if (posts.length < 20) {
  console.warn(`Dzen RSS contains only ${posts.length} posts. Dzen moderation may require more fresh materials.`);
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, renderFeed(posts), 'utf8');
console.log(`Dzen RSS generated with ${posts.length} posts at ${OUTPUT_FILE}`);
