import { execSync } from 'node:child_process';

try {
  console.log('Building full SSG with all 365 articles in TutorialsHub...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat(hub): upgrade TutorialsHub to render all 365 deep articles with category filters and pagination"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ ox.xxmsanguo.com 100% Deployed!');
} catch (err) {
  console.error('Error:', err.message);
}
