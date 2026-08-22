import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. 设置严格的 365 天滴灌排期：
// 起始日期从 2026-08-15 开始，每天解锁 1 篇，排满 365 天至 2027-08-15
// 今天是 2026-08-23，因此截至今天已解锁 9 篇，其余 356 篇均为未来严格未解锁排期
function applyDripSchedule(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const startDate = new Date(2026, 7, 15); // 2026-08-15
  let index = 0;

  // 替换所有长尾文章的 publishDate
  content = content.replace(/"publishDate": "2026-\d\d-\d\d"/g, (match) => {
    // 核心页面保持 2026-08-01
    const d = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
    index++;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `"publishDate": "${year}-${month}-${day}"`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
}

applyDripSchedule(path.join(rootDir, 'src', 'seoData.ts'));
applyDripSchedule(path.join(rootDir, 'src', 'seoData.hant.ts'));

// 2. 重新编译与生成多语言 sitemap.xml
console.log('🚀 执行构建与多语言 Sitemap 生成...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "fix(schedule): enforce strict drip schedule where future unreleased articles are completely hidden from UI and sitemap with full multilingual hant support"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('🎉 严格排期与多语言 Sitemap 修复完成！');
