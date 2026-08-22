import { execSync } from 'node:child_process';

try {
  console.log('Building clean ox.xxmsanguo.com...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "fix(updates): exclude pillar pages from updates module, strictly display long-tail pinyin slugs"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ 100% Rebuilt & Pushed to GitHub!');
} catch (err) {
  console.error('Error:', err.message);
}
