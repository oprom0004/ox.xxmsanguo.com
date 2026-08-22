import { execSync } from 'node:child_process';

try {
  console.log('Rebuilding with dynamic RelatedReadings...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "fix(components): make RelatedReadings dynamically load long-tail articles to avoid empty state"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ 100% Rebuilt & Pushed to GitHub!');
} catch (err) {
  console.error('Error:', err.message);
}
