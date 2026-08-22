const fs = require('fs');
const c = fs.readFileSync('src/seoData.ts', 'utf8');

// Extract routes and their publish dates
const parts = c.split('"route": "');
const articles = [];

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  const slug = part.split('"')[0];
  if (slug === 'home') continue;
  const publishDateMatch = part.match(/"publishDate":\s*"([^"]+)"/);
  if (publishDateMatch) {
    const titleMatch = part.match(/"title":\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1].split(' - ')[0] : '';
    articles.push({ slug, publishDate: publishDateMatch[1], title });
  }
}

articles.sort((a,b) => a.publishDate.localeCompare(b.publishDate));
console.log('排期文章总数:', articles.length);
console.log('');
articles.forEach((a, i) => {
  console.log(`${i+1}. [${a.publishDate}] ${a.slug}`);
  console.log(`   ${a.title}`);
});

const today = new Date();
const utc8 = new Date(today.getTime() + today.getTimezoneOffset()*60000 + 3600000*8);
const todayStr = utc8.toISOString().split('T')[0];
const active = articles.filter(a => a.publishDate <= todayStr);
const future = articles.filter(a => a.publishDate > todayStr);
console.log('');
console.log('今日日期(UTC+8):', todayStr);
console.log('已解锁文章:', active.length, '篇');
console.log('未来排期文章:', future.length, '篇');
