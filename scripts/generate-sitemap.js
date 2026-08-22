const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');
const domain = 'https://ox.xxmsanguo.com';
const seoDataPath = path.join(__dirname, '..', 'src', 'seoData.ts');

function getCurrentDateString() {
    const now = new Date();
    const utc8Time = now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8);
    const dateObj = new Date(utc8Time);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getActiveRoutes() {
    const content = fs.readFileSync(seoDataPath, 'utf8');
    
    // Split by route definition (supporting both quoted and unquoted key format)
    const parts = content.split(/"?route"?\s*:\s*"/);
    const routesWithDates = [];
    
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        const slug = part.split('"')[0];
        if (slug === 'home') continue;
        
        // Find if there is a publishDate field in this object block (supporting both quoted and unquoted key format)
        const publishDateMatch = part.match(/"?publishDate"?\s*:\s*"([^"]+)"/);
        const publishDate = publishDateMatch ? publishDateMatch[1] : null;
        
        routesWithDates.push({ slug, publishDate });
    }
    
    const currentDate = getCurrentDateString();
    
    // Filter out future-dated routes
    const activeSlugs = routesWithDates
        .filter(r => !r.publishDate || r.publishDate <= currentDate)
        .map(r => r.slug);
        
    // Unique list
    return Array.from(new Set(activeSlugs));
}

function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];
    const activeSlugs = getActiveRoutes();
    const urls = [];

    // 1. Add Homepage (root)
    urls.push(`  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);

  urls.push(`  <url>
    <loc>${domain}/hant/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);

    // 2. Add other active routes
    for (const route of activeSlugs) {
        const urlPath = `${route}/`;
        urls.push(`  <url>
    <loc>${domain}/${urlPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);

        const hantPath = `hant/${route}/`;
        urls.push(`  <url>
    <loc>${domain}/${hantPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

const content = generateSitemap();
const outPath = path.join(OUT_DIR, 'sitemap.xml');
fs.writeFileSync(outPath, content, 'utf8');
console.log(`✅ sitemap.xml 已生成：${outPath}`);

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}
const publicPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(publicPath, content, 'utf8');

const xslPath = path.join(publicDir, 'sitemap.xsl');
if (fs.existsSync(xslPath)) {
    fs.copyFileSync(xslPath, path.join(OUT_DIR, 'sitemap.xsl'));
}
console.log(`✅ public/sitemap.xml & sitemap.xsl 已同步更新`);
