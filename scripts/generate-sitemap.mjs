import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIG ---
const SITE_URL = 'https://makselyanov.github.io/centrlp2026';
const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src');
const CONTENT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../content/posts');
const OUTPUT_FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml');

// --- HELPERS ---

// Parse App.tsx to find routes path="..."
function getStaticRoutes() {
    const appPath = path.join(SRC_DIR, 'App.tsx');
    if (!fs.existsSync(appPath)) {
        console.warn('App.tsx not found, skipping static routes.');
        return [];
    }
    const content = fs.readFileSync(appPath, 'utf8');

    // Simple regex to find path="/some/route"
    // It won't be perfect but good enough for simple React Router setup
    const staticRoutes = [];
    const regex = /path=["'](\/[^"']*)["']/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const route = match[1];
        // Filter out dynamic routes (:param) and wildcard (*)
        if (!route.includes(':') && !route.includes('*')) {
            staticRoutes.push(route);
        }
    }

    // Ensure root / exists
    if (!staticRoutes.includes('/')) {
        staticRoutes.push('/');
    }

    return [...new Set(staticRoutes)].sort();
}

// Read markdown files to generate blog routes
function getBlogRoutes() {
    if (!fs.existsSync(CONTENT_DIR)) {
        console.warn('Content dir not found, skipping blog routes.');
        return [];
    }

    const files = fs.readdirSync(CONTENT_DIR);
    const blogRoutes = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            // Remove date prefix (YYYY-MM-DD-) and extension (.md)
            let slug = file.replace(/\.md$/, '');
            slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
            return `/blog/${slug}`;
        });

    return blogRoutes;
}

// Generate XML content
function generateSitemap(routes) {
    const urls = routes.map(route => {
        // Ensure route starts with /
        const safeRoute = route.startsWith('/') ? route : `/${route}`;
        return `  <url>
    <loc>${SITE_URL}${safeRoute}</loc>
    <changefreq>weekly</changefreq>
    <priority>${safeRoute === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// --- MAIN ---
try {
    console.log('Generating sitemap...');

    const staticRoutes = getStaticRoutes();
    const blogRoutes = getBlogRoutes();
    const allRoutes = [...staticRoutes, ...blogRoutes];

    const xml = generateSitemap(allRoutes);

    // Ensure directory exists
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');

    console.log(`Sitemap generated with ${allRoutes.length} URLs at ${OUTPUT_FILE}`);
} catch (err) {
    console.error('Error generating sitemap:', err);
    process.exit(1);
}
