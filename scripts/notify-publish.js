const fs = require('fs');
const path = require('path');
const https = require('https');

const seoDataPath = path.join(__dirname, '..', 'src', 'seoData.ts');

// Thresholds for low-stock warnings
const WARNING_THRESHOLD_DAYS = 14;  // ⚠️ yellow alert: ≤14 days of articles left
const CRITICAL_THRESHOLD_DAYS = 6; // 🚨 red alert: ≤6 days of articles left

function getCurrentDateString() {
    const now = new Date();
    const utc8Time = now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8);
    const dateObj = new Date(utc8Time);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getAllScheduledArticles() {
    const content = fs.readFileSync(seoDataPath, 'utf8');
    const parts = content.split('"route": "');
    const today = getCurrentDateString();
    const todayArticles = [];
    const futureArticles = [];

    for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        const slug = part.split('"')[0];
        if (slug === 'home') continue;

        const publishDateMatch = part.match(/"publishDate":\s*"([^"]+)"/);
        const publishDate = publishDateMatch ? publishDateMatch[1] : null;
        if (!publishDate) continue;

        const titleMatch = part.match(/"title":\s*"([^"]+)"/);
        const title = titleMatch ? titleMatch[1].split(' - ')[0] : '';

        if (publishDate === today) {
            todayArticles.push({ slug, title, publishDate });
        } else if (publishDate > today) {
            futureArticles.push({ slug, title, publishDate });
        }
    }

    // Sort future articles by date ascending
    futureArticles.sort((a, b) => a.publishDate.localeCompare(b.publishDate));

    return { todayArticles, futureArticles };
}

function getDaysUntilLastArticle(futureArticles, todayStr) {
    if (futureArticles.length === 0) return 0;
    const lastDate = futureArticles[futureArticles.length - 1].publishDate;
    const today = new Date(todayStr);
    const last = new Date(lastDate);
    return Math.round((last - today) / (1000 * 60 * 60 * 24));
}

async function postGithubComment(commentBody) {
    const repo = process.env.GITHUB_REPOSITORY;
    const token = process.env.GITHUB_TOKEN;

    if (!repo || !token) {
        console.log('⚠️ GITHUB_REPOSITORY or GITHUB_TOKEN not found, skipping notification.');
        console.log('--- Comment Preview ---');
        console.log(commentBody);
        return;
    }

    const postData = JSON.stringify({ body: commentBody });
    const options = {
        hostname: 'api.github.com',
        path: `/repos/${repo}/issues/1/comments`,
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'NodeJS-HTTP-Client',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode === 201) {
                    console.log('✅ Success: Posted comment to Issue #1.');
                    resolve(JSON.parse(data));
                } else {
                    console.error(`❌ Failed: Status code ${res.statusCode}. Output: ${data}`);
                    reject(new Error(`Status ${res.statusCode}`));
                }
            });
        });

        req.on('error', (e) => {
            console.error('❌ Request error:', e);
            reject(e);
        });

        req.write(postData);
        req.end();
    });
}

async function run() {
    const todayStr = getCurrentDateString();
    const { todayArticles, futureArticles } = getAllScheduledArticles();
    const daysLeft = getDaysUntilLastArticle(futureArticles, todayStr);

    const isCritical = daysLeft <= CRITICAL_THRESHOLD_DAYS;
    const isWarning = daysLeft <= WARNING_THRESHOLD_DAYS;
    const hasPublishToday = todayArticles.length > 0;

    // Only skip entirely if: no publish today AND stock is healthy
    if (!hasPublishToday && !isCritical) {
        console.log(`📅 No article published today. Queue healthy (${futureArticles.length} articles, ${daysLeft} days left). Skipping.`);
        return;
    }

    let commentBody = '';

    // === Section 1: Today's publish report ===
    if (hasPublishToday) {
        commentBody += `### 📢 OKX 专题文章定时发布报告 (${todayStr})\n\n`;
        commentBody += `今天有 **${todayArticles.length}** 篇新文章成功解锁并上线！\n\n`;
        commentBody += `#### 🚀 已解锁上线文章：\n`;
        todayArticles.forEach((art, index) => {
            commentBody += `${index + 1}. **[${art.slug}]** ${art.title}\n`;
            commentBody += `   - **简体链接**: https://ox.xxmsanguo.com/${art.slug}/\n`;
            commentBody += `   - **繁体链接**: https://ox.xxmsanguo.com/hant/${art.slug}/\n`;
            commentBody += `   - 已同步首页「近期更新专栏」并更新 \`sitemap.xml\`\n\n`;
        });
    }

    // === Section 2: Queue status ===
    if (hasPublishToday) {
        commentBody += `---\n\n`;
        commentBody += `#### 📦 文章库存状态\n`;
        commentBody += `- 剩余排期文章：**${futureArticles.length} 篇**\n`;
        commentBody += `- 排期截止日：**${futureArticles.length > 0 ? futureArticles[futureArticles.length-1].publishDate : '无'}**\n`;
        commentBody += `- 距排期结束：**${daysLeft} 天**\n\n`;
    }

    // === Section 3: Low-stock alert ===
    if (isCritical) {
        if (!hasPublishToday) {
            commentBody += `### 🚨 文章库存紧急预警 (${todayStr})\n\n`;
        }
        commentBody += `> 🚨 **[紧急] 文章库存严重不足！**\n`;
        commentBody += `> \n`;
        commentBody += `> 当前仅剩 **${futureArticles.length} 篇**文章在排期队列中，**${daysLeft} 天后** 将耗尽所有内容！\n`;
        commentBody += `> \n`;
        commentBody += `> **请立即补充新文章**，否则网站将在 ${futureArticles.length > 0 ? futureArticles[futureArticles.length-1].publishDate : '即日'} 后停止自动更新。\n\n`;

        if (futureArticles.length > 0) {
            commentBody += `##### 当前剩余排期：\n`;
            futureArticles.forEach((art, i) => {
                commentBody += `${i+1}. \`${art.publishDate}\` → **${art.slug}** ${art.title}\n`;
            });
            commentBody += `\n`;
        }

    } else if (isWarning && hasPublishToday) {
        commentBody += `> ⚠️ **[提醒] 文章库存偏低** — 剩余 ${futureArticles.length} 篇，约 ${daysLeft} 天后更新完毕，建议近期提前补充新内容。\n\n`;
    }

    commentBody += `---\n*此通知由 GitHub Actions 定时自动发布，每天 08:00 CST 执行。*`;

    console.log('📝 Comment Preview:\n', commentBody);
    await postGithubComment(commentBody);
}

run().catch(err => {
    console.error('❌ Error executing notify-publish:', err);
    process.exit(1);
});
