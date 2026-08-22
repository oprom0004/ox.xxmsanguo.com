import { execSync } from 'node:child_process';

try {
  console.log('Building ox.xxmsanguo.com with scene-themed UI deduplication...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat(ui): complete high-end scene-themed UI deduplication with mistake vs standard cards and document layout"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ ox.xxmsanguo.com UI Dedup Deployed successfully!');
} catch (err) {
  console.error('Error:', err.message);
}
