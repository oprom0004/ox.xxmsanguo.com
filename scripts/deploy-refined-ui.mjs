import { execSync } from 'node:child_process';

try {
  console.log('Building refined UI without white blocks and with clean underline tabs...');
  execSync('npm run build', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat(ui): eliminate ugly white blocks, refine mobile header with smooth underline tabs and restore premium crypto gold aesthetic"', { stdio: 'inherit' });
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ Refined UI Deployed successfully!');
} catch (err) {
  console.error('Error:', err.message);
}
