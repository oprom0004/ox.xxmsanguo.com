import { execSync } from 'node:child_process';

try {
  console.log('Building full SSG master version for ox.xxmsanguo.com...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat(seo): upgrade to pure ouyi/okx/yiou/okex semantic slugs, unlock 100% pages to eliminate all 404, semantic related recommendations"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ 100% Successfully Rebuilt and Pushed to GitHub!');
} catch (err) {
  console.error('Error:', err.message);
}
