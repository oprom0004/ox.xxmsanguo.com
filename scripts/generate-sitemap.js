const fs = require('fs');
const path = require('path');

function getCurrentDateString() {
  const now = new Date();
  const utc8Time = now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8);
  const dateObj = new Date(utc8Time);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function extractKeywordsFromTs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const SEO_KEYWORDS_MAP(?:_HANT)?: Record<string, SeoPageData> = ({[\s\S]*?});/);
  if (!match) return {};
  try {
    return JSON.parse(match[1]);
  } catch (e) {
    return {};
  }
}

const zhPath = path.join(__dirname, '../src/seoData.ts');
const hantPath = path.join(__dirname, '../src/seoData.hant.ts');

const seoZh = extractKeywordsFromTs(zhPath);
const seoHant = extractKeywordsFromTs(hantPath);

const baseUrl = 'https://ox.xxmsanguo.com';
const currentDate = getCurrentDateString();

// 核心柱子单页
const coreKeys = [
  'guanwang', 'app', 'diannao', 'wangye', 'zhuce',
  'denglu', 'anzhuo', 'pingguo', 'anzhuangbao',
  'xinshou-jiaocheng', 'zhongwen', 'xiazai'
];

let urls = [];

// 1. 首页
urls.push({
  loc: `${baseUrl}/`,
  lastmod: currentDate,
  changefreq: 'daily',
  priority: '1.0'
});
urls.push({
  loc: `${baseUrl}/hant/`,
  lastmod: currentDate,
  changefreq: 'daily',
  priority: '1.0'
});

// 2. 核心功能页
coreKeys.forEach(k => {
  urls.push({
    loc: `${baseUrl}/${k}/`,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.9'
  });
  urls.push({
    loc: `${baseUrl}/hant/${k}/`,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.9'
  });
});

// 3. 严格只收录已解锁的长尾实操文章（publishDate <= currentDate）
Object.values(seoZh).forEach(item => {
  if (item.route === 'home' || coreKeys.includes(item.route)) return;
  if (item.publishDate && item.publishDate <= currentDate) {
    urls.push({
      loc: `${baseUrl}/${item.route}/`,
      lastmod: item.publishDate,
      changefreq: 'weekly',
      priority: '0.8'
    });
  }
});

Object.values(seoHant).forEach(item => {
  if (item.route === 'home' || coreKeys.includes(item.route)) return;
  if (item.publishDate && item.publishDate <= currentDate) {
    urls.push({
      loc: `${baseUrl}/hant/${item.route}/`,
      lastmod: item.publishDate,
      changefreq: 'weekly',
      priority: '0.8'
    });
  }
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const publicDir = path.join(__dirname, '../public');
const outDir = path.join(__dirname, '../out');

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
if (fs.existsSync(outDir)) {
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapXml, 'utf8');
}

console.log(`✅ sitemap.xml 严格按已解锁日期生成，共计收录 ${urls.length} 个合法 URL (未解锁文章 0 收录)`);
