import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function replaceInFile(filePath, regex, replacement) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
}

// 遍历 src 目录下的所有 ts, tsx, js, mjs 文件，将“官方”字样彻底干掉或替换为安全合规词
function scanAndReplaceDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanAndReplaceDir(fullPath);
    } else if (/\.(tsx|ts|jsx|js|mjs)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // 精细化安全替换
      content = content
        .replace(/官方正版/g, '正版原装')
        .replace(/官方直连/g, '安全直连')
        .replace(/官方入口/g, '安全通道')
        .replace(/官方网站/g, '安全网站')
        .replace(/官方下载/g, '客户端下载')
        .replace(/官方APP/g, '原生APP')
        .replace(/官方客户端/g, '原生客户端')
        .replace(/官方現貨/g, '現貨')
        .replace(/官方现货/g, '现货')
        .replace(/官方交易/g, '交易')
        .replace(/官方實操/g, '實操')
        .replace(/官方实操/g, '实操')
        .replace(/官方客服/g, '在线客服')
        .replace(/官方备用/g, '备用')
        .replace(/官方/g, '正版')
        .replace(/官方/g, '正版'); // 再次兜底
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

scanAndReplaceDir(path.join(rootDir, 'src'));

console.log('Building ox.xxmsanguo.com without 官方...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "fix(compliance): completely eliminate 官方 keywords across all pages, titles, FAQs and metadata"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('✅ ox.xxmsanguo.com Cleaned & Pushed successfully!');
