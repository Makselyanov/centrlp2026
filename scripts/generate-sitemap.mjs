import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

// --- CONFIG ---
const envSiteUrl = process.env.SITE_URL || 'https://centrlp.ru';
const SITE_URL = envSiteUrl.replace(/\/$/, '');

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src');
const CONTENT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../content/posts');
const OUTPUT_FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml');
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// --- HELPERS ---

function toGitPath(targetPath) {
    return targetPath.split(path.sep).join('/');
}

function getGitLastmod(targetPath) {
    try {
        const output = execFileSync(
            'git',
            ['log', '-1', '--format=%cs', '--', toGitPath(targetPath)],
            { cwd: ROOT_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
        ).trim();

        if (output) {
            return output;
        }
    } catch {
        // Fall back to filesystem timestamps when git history is unavailable.
    }

    return null;
}

function getStaticRoutes() {
    const appPath = path.join(SRC_DIR, 'App.tsx');
    if (!fs.existsSync(appPath)) {
        console.warn('App.tsx not found, skipping static routes.');
        return [];
    }
    const content = fs.readFileSync(appPath, 'utf8');

    const staticRoutes = [];
    const regex = /path=["'](\/[^"']*)["']/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const route = match[1];
        if (!route.includes(':') && !route.includes('*')) {
            staticRoutes.push(route);
        }
    }

    if (!staticRoutes.includes('/')) {
        staticRoutes.push('/');
    }

    return [...new Set(staticRoutes)].sort();
}

function getBlogRoutes() {
    if (!fs.existsSync(CONTENT_DIR)) {
        console.warn('Content dir not found, skipping blog routes.');
        return [];
    }

    const files = fs.readdirSync(CONTENT_DIR);
    const blogRoutes = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            let slug = file.replace(/\.md$/, '');
            slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
            const filePath = path.join(CONTENT_DIR, file);
            const stat = fs.statSync(filePath);
            const gitLastmod = getGitLastmod(path.relative(ROOT_DIR, filePath));

            return {
                route: `/blog/${slug}`,
                lastmod: gitLastmod || stat.mtime.toISOString().split('T')[0],
            };
        });

    return blogRoutes;
}

// Priority mapping for better SEO
function getPriority(route) {
    if (route === '/') return '1.0';
    if (route === '/services' || route === '/prices' || route === '/projects') return '0.9';
    if (route.startsWith('/services/') || route === '/contacts' || route === '/about') return '0.8';
    if (route.startsWith('/blog/')) return '0.7';
    if (route === '/privacy' || route === '/cookies') return '0.3';
    return '0.7';
}

function getChangefreq(route) {
    if (route === '/' || route === '/blog') return 'daily';
    if (route.startsWith('/blog/')) return 'monthly';
    if (route === '/privacy' || route === '/cookies') return 'yearly';
    return 'weekly';
}

function normalizeRoutes(staticRoutes, blogRoutes) {
    const staticLastmod = getGitLastmod('src/App.tsx') || new Date().toISOString().split('T')[0];
    const normalizedStatic = staticRoutes.map(route => ({
        route,
        lastmod: staticLastmod,
    }));

    return [...normalizedStatic, ...blogRoutes]
        .map(entry => ({
            route: entry.route.startsWith('/') ? entry.route : `/${entry.route}`,
            lastmod: entry.lastmod || staticLastmod,
        }))
        .filter((entry, index, arr) => arr.findIndex(item => item.route === entry.route) === index)
        .sort((a, b) => a.route.localeCompare(b.route));
}

function generateSitemap(entries) {
    const urls = entries.map(({ route, lastmod }) => {
        const safeRoute = route.startsWith('/') ? route : `/${route}`;
        return `  <url>
    <loc>${SITE_URL}${safeRoute}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${getChangefreq(safeRoute)}</changefreq>
    <priority>${getPriority(safeRoute)}</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// --- MAIN ---
try {
    console.log(`Generating sitemap for ${SITE_URL}...`);

    const staticRoutes = getStaticRoutes();
    const blogRoutes = getBlogRoutes();
    const allRoutes = normalizeRoutes(staticRoutes, blogRoutes);

    const xml = generateSitemap(allRoutes);

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');

    console.log(`Sitemap generated with ${allRoutes.length} URLs at ${OUTPUT_FILE}`);
} catch (err) {
    console.error('Error generating sitemap:', err);
    process.exit(1);
}
