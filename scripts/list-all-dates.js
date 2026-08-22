const fs = require('fs');
const c = fs.readFileSync('src/seoData.ts', 'utf8');

const routeMatches = [...c.matchAll(/"?route"?\s*:\s*"([^"]+)"/g)].map(m => m[1]);
const articles = [];

const parts = c.split('"route": "');
for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  const slug = part.split('"')[0];
  const publishDateMatch = part.match(/"?publishDate"?\s*:\s*"([^"]+)"/);
  if (publishDateMatch) {
    articles.push({ slug, publishDate: publishDateMatch[1] });
  }
}

console.log('Routes with publishDate in seoData.ts:', articles.length);
console.log(JSON.stringify(articles, null, 2));
