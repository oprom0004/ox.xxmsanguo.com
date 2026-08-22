const fs = require('fs');

const content = fs.readFileSync('src/seoData.ts', 'utf8');

// Match route keys (both unquoted and quoted)
const routeMatches = [...content.matchAll(/["']?route["']?\s*:\s*["']([^"']+)["']/g)];
const routes = routeMatches.map(m => m[1]);

// Match publishDates
const dateMatches = [...content.matchAll(/["']?publishDate["']?\s*:\s*["']([^"']+)["']/g)];
const dates = dateMatches.map(m => m[1]);

console.log("Total routes configured:", routes.length);
console.log("Unique routes:", new Set(routes).size);
console.log("PublishDates count:", dates.length);
if (dates.length > 0) {
  const sortedDates = [...dates].sort();
  console.log("Min date:", sortedDates[0]);
  console.log("Max date:", sortedDates[sortedDates.length - 1]);
}
