import { execSync } from 'node:child_process';

try {
  console.log('Building clean monochrome UI...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat(ui): complete clean monochrome OKX design across Header, Nav, Hero and MobileStickyFooter"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ Monochrome UI Deployed successfully!');
} catch (err) {
  console.error('Error:', err.message);
}
