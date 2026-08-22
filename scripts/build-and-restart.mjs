import { execSync } from 'node:child_process';

try {
  console.log('Rebuilding ox.xxmsanguo.com...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "fix(nav): update tabLabel for zhongwen page from 中文版设置 to 中文版"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ 100% Updated & Pushed to GitHub!');
} catch (err) {
  console.error('Error:', err.message);
}
