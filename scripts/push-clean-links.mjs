import { execSync } from 'node:child_process';

try {
  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "fix(links): clean all internal links to purely use long-tail pinyin slugs"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ 100% Pushed clean links to GitHub!');
} catch (err) {
  console.error('Error:', err.message);
}
