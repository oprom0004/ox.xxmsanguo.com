import { execSync } from 'node:child_process';

try {
  console.log('Initializing git repository...');
  execSync('git init', { stdio: 'inherit' });
  execSync('git branch -M main', { stdio: 'inherit' });

  const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
  
  // 检查/创建 GitHub 远程仓库
  try {
    console.log('Creating GitHub remote repository oprom0004/ox.xxmsanguo.com if not exists...');
    execSync('gh repo create oprom0004/ox.xxmsanguo.com --public --source=. --remote=origin', { stdio: 'inherit' });
  } catch (e) {
    console.log('Repo might already exist or remote set, configuring origin...');
    try {
      execSync('git remote remove origin', { stdio: 'ignore' });
    } catch (_) {}
    execSync(`git remote add origin https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git`, { stdio: 'inherit' });
  }

  console.log('Committing files...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: initial commit for ox.xxmsanguo.com with 365-day SEO drip articles, dark sitemap and SSG pre-rendered pages"', { stdio: 'inherit' });

  console.log('Pushing to GitHub...');
  execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit' });
  console.log('✅ Successfully created and pushed to https://github.com/oprom0004/ox.xxmsanguo.com');
} catch (err) {
  console.error('Error during init-push:', err.message);
}
