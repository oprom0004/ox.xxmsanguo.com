const fs = require('fs');
const content = fs.readFileSync('src/seoData.ts', 'utf8');

// Get all keys by matching keys under SEO_KEYWORDS_MAP
const matches = content.match(/^\s*([a-zA-Z0-9_-]+):\s*{/gm);
console.log("Keys found:", matches.map(m => m.trim().replace(':', '').replace('{', '').trim()));
