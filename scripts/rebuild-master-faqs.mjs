import { execSync } from 'node:child_process';

try {
  console.log('Rebuilding ox.xxmsanguo.com with scenario-tailored FAQs and deduplicated recommendations...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat(faq): inject scenario tailored hardcore Q&A, deduplicate RelatedReadings cards by topic"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ 100% Successfully Rebuilt & Pushed to GitHub!');
} catch (err) {
  console.error('Error:', err.message);
}
