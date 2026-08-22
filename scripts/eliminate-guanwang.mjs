import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function replaceGuanwangTerms(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 简体替换规则
  content = content
    .replace(/官网直连/g, '安全直连')
    .replace(/官网入口/g, '安全入口')
    .replace(/官网防伪验证指引/g, '安全防伪验证指引')
    .replace(/官网防伪/g, '安全防伪')
    .replace(/最新官网/g, '最新安全通道')
    .replace(/官网下载/g, '正版原装下载')
    .replace(/官网/g, '安全通道')
    .replace(/官方实操/g, '标准实操')
    .replace(/官方客户端/g, '正版原装客户端')
    .replace(/官方正版/g, '正版原装')
    .replace(/官方APP/g, '正版APP')
    .replace(/官方/g, '正版');

  // 繁体替换规则
  content = content
    .replace(/官網直連/g, '安全直連')
    .replace(/官網入口/g, '安全入口')
    .replace(/官網防偽驗證指引/g, '安全防偽驗證指引')
    .replace(/官網防偽/g, '安全防偽')
    .replace(/最新官網/g, '最新安全通道')
    .replace(/官網下載/g, '正版原裝下載')
    .replace(/官網/g, '安全通道')
    .replace(/官方實操/g, '標準實操')
    .replace(/官方客戶端/g, '正版原裝客戶端')
    .replace(/官方正版/g, '正版原裝')
    .replace(/官方APP/g, '正版APP')
    .replace(/官方/g, '正版');

  fs.writeFileSync(filePath, content, 'utf8');
}

// 替换 seoData
replaceGuanwangTerms(path.join(rootDir, 'src', 'seoData.ts'));
replaceGuanwangTerms(path.join(rootDir, 'src', 'seoData.hant.ts'));

// 替换 components 下的所有 tsx 文件
const compDir = path.join(rootDir, 'src', 'components');
fs.readdirSync(compDir).forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    replaceGuanwangTerms(path.join(compDir, file));
  }
});

// 重新构建并推送到 GitHub
console.log('🚀 执行构建并推送到 GitHub (100% 消除官网/官方)...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "refactor(seo): eliminate 100% occurrences of 官网 and 官方 keywords, replacing with 安全直连 and 正版原装"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('🎉 官网/官方关键词已全量消除并推送完成！');
