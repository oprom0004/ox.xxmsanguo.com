const fs = require('fs');

const files = [
  'src/seoData.ts',
  'src/seoData.hant.ts'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
  // Fix unquoted hyphenated keys like:
  //   c2c-shensu: {  ->  "c2c-shensu": {
  const fixed = content.replace(/^(\s+)([a-z][a-z0-9]*(?:-[a-z0-9]+)+)(\s*:\s*\{)/gm, '$1"$2"$3');
  const diff = (content.match(/^(\s+)([a-z][a-z0-9]*(?:-[a-z0-9]+)+)(\s*:\s*\{)/gm) || []).length;
  fs.writeFileSync(f, fixed, 'utf8');
  console.log(`Fixed ${diff} unquoted keys in: ${f}`);
});
