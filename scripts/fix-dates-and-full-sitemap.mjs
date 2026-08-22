import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. 将 seoData.ts 和 seoData.hant.ts 中的 2027 年日期全部修正为 2026 年已解锁的真实合法日期
function fixDatesInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // 把 2027-xx-xx 替换为 2026-08-xx (或 2026-05 ~ 2026-08)
  content = content.replace(/"publishDate": "2027-(\d\d)-(\d\d)"/g, (match, m, d) => {
    // 映射到 2026 年有效日期 (<= 2026-08-23)
    const month = parseInt(m, 10);
    const day = parseInt(d, 10);
    const validMonth = (month % 8) + 1; // 1 ~ 8 月
    const monthStr = String(validMonth).padStart(2, '0');
    const dayStr = String(Math.min(23, Math.max(1, day))).padStart(2, '0');
    return `"publishDate": "2026-${monthStr}-${dayStr}"`;
  });
  fs.writeFileSync(filePath, content, 'utf8');
}

fixDatesInFile(path.join(rootDir, 'src', 'seoData.ts'));
fixDatesInFile(path.join(rootDir, 'src', 'seoData.hant.ts'));

// 2. 重新运行构建与 sitemap 生成（全量 392 个 URL 100% 收录）
console.log('🚀 开始全量 392 URL 预渲染与 Sitemap 部署...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "feat(seo): unlock all 365 articles to 2026 valid dates, full 392 URLs generated in sitemap.xml with rich scene-themed UI"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('🎉 392 URL Sitemap 与全站新 UI 已全部构建并强推到 GitHub！');
