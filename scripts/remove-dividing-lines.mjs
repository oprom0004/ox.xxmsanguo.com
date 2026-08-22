import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. 清理 Header.tsx 贯穿横线
const headerPath = path.join(rootDir, 'src', 'components', 'Header.tsx');
let headerContent = fs.readFileSync(headerPath, 'utf8');
headerContent = headerContent
  .replace('border-b border-zinc-800 shadow-2xl', 'shadow-2xl')
  .replace('border-t border-zinc-850 p-2 sm:px-4', 'p-2 sm:px-4');
fs.writeFileSync(headerPath, headerContent, 'utf8');

// 2. 清理 Hero.tsx 贯穿底线
const heroPath = path.join(rootDir, 'src', 'components', 'Hero.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');
heroContent = heroContent.replace('border-b border-zinc-850 bg-gradient-to-b', 'bg-gradient-to-b');
fs.writeFileSync(heroPath, heroContent, 'utf8');

// 3. 构建并推送
console.log('🚀 彻底移除贯穿破线条并推送到 GitHub...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "style: remove harsh dividing border lines on header, nav and hero for seamless modern layout"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('🎉 贯穿线条已彻底移除并推送完成！');
