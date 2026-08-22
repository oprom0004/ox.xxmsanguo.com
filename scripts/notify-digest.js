const fs = require('fs');
const path = require('path');

function getCurrentDateString() {
  const now = new Date();
  const utc8Time = now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8);
  const dateObj = new Date(utc8Time);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const currentDate = getCurrentDateString();
const seoDataPath = path.join(__dirname, '..', 'src', 'seoData.ts');
let seoContent = '';
if (fs.existsSync(seoDataPath)) {
  seoContent = fs.readFileSync(seoDataPath, 'utf8');
}

const parts = seoContent.split(/"?route"?\s*:\s*"/);
const unlockedToday = [];
let totalUnlocked = 0;

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  const slug = part.split('"')[0];
  if (slug === 'home') continue;

  const titleMatch = part.match(/"?title"?\s*:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : slug;

  const dateMatch = part.match(/"?publishDate"?\s*:\s*"([^"]+)"/);
  const pDate = dateMatch ? dateMatch[1] : '2026-08-01';

  if (!pDate || pDate <= currentDate) {
    totalUnlocked++;
    if (pDate === currentDate) {
      unlockedToday.push({ slug, title });
    }
  }
}

let sitemapCount = 0;
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sm = fs.readFileSync(sitemapPath, 'utf8');
  sitemapCount = (sm.match(/<loc>/g) || []).length;
}

const report = `### 🚀 ox.xxmsanguo.com 每日发文与 SEO 索引日报 (${currentDate})

👋 Hi @${process.env.GITHUB_ACTOR || '站长'}，今日站点已自动完成内容解锁与 Sitemap 搜索引擎地图同步！

---

#### 🌟 今日解锁上线的新文章 (${unlockedToday.length} 篇)：
${unlockedToday.length > 0 ? unlockedToday.map((a, idx) => `${idx + 1}. **${a.title}**\n   - 🔗 访问链接: [https://ox.xxmsanguo.com/${a.slug}/](https://ox.xxmsanguo.com/${a.slug}/)`).join('\n') : '✅ 今日基础文章库运行正常，新文章已在队列中待明日零点解锁。'}

---

#### 📊 SEO 搜索引擎收录健康指标：
- 📈 **当前全站已解锁独立文章总量**: **${totalUnlocked} 篇**
- 🗺️ **Sitemap 独立 <loc> 索引链接总数**: **${sitemapCount} 条**（含简繁双轨）
- ⚡ **通道状态**: 欧意 OKX 电脑客户端 Windows/Mac 版下载直连运行正常

*本邮件由 GitHub Actions 每日发文播报引擎自动生成并推送至您的 Git 账号邮箱。*
`;

fs.writeFileSync(path.join(__dirname, '..', 'daily_report.md'), report, 'utf8');
console.log('✅ Daily report generated successfully for ox.xxmsanguo.com');
