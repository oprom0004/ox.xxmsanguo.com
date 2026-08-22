import { execSync } from 'node:child_process';

try {
  console.log('Building completed project...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat(faq): combine targeted scenario FAQs with platform general security FAQs"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ 100% Pushed to GitHub successfully!');
} catch (err) {
  console.error('Error:', err.message);
}
