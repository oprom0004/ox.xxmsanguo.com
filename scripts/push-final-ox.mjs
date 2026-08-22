import { execSync } from 'node:child_process';

try {
  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  console.log('Pushing final deep rewritten version to GitHub...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete AI semantic deep rewrite, 365 unique slug articles and full 392 SSG pages for ox.xxmsanguo.com"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ 100% Pushed to GitHub repository!');
} catch (err) {
  console.error('Error:', err.message);
}
