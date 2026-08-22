import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. 清理 seoData 中的文本重复（如“客户端客户端” -> “客户端原装”）
function cleanRepetitions(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content
    .replace(/客户端客户端下载/g, '客户端原装下载')
    .replace(/客戶端客戶端下載/g, '客戶端原裝下載')
    .replace(/客户端客户端/g, '客户端')
    .replace(/客戶端客戶端/g, '客戶端');
  fs.writeFileSync(filePath, content, 'utf8');
}
cleanRepetitions(path.join(rootDir, 'src', 'seoData.ts'));
cleanRepetitions(path.join(rootDir, 'src', 'seoData.hant.ts'));

// 2. 升级 TutorialsHub.tsx：去除 12 条截断分页，将所有已解锁文章按时间从新到旧（publishDate 降序）全量平铺
const hubPath = path.join(rootDir, 'src', 'components', 'TutorialsHub.tsx');
const hubCode = `"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import { Calendar, ArrowRight, BookOpen, Layers, Sparkles, Clock, CheckCircle2 } from "lucide-react";

interface TutorialsHubProps {
  locale?: 'zh' | 'hant';
}

const CATEGORY_TABS = [
  { id: "all", zh: "全部已解锁实操", hant: "全部已解鎖實操" },
  { id: "pc", zh: "电脑端与量化", hant: "電腦端與量化" },
  { id: "c2c", zh: "C2C出金防冻", hant: "C2C出金防凍" },
  { id: "trade", zh: "合约与网格风控", hant: "合約與網格風控" },
  { id: "security", zh: "安全验证与2FA", hant: "安全驗證與2FA" },
  { id: "web3", zh: "Web3与链上转账", hant: "Web3與鏈上轉賬" }
];

function getCurrentDateString() {
  const now = new Date();
  const utc8Time = now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8);
  const dateObj = new Date(utc8Time);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return \`\${year}-\${month}-\${day}\`;
}

// 获取场景主题色
function getCardTheme(route: string) {
  if (route.includes("pc") || route.includes("api") || route.includes("dns")) {
    return { badge: "bg-blue-500/10 border-blue-500/30 text-blue-400", hover: "hover:border-blue-500/40" };
  }
  if (route.includes("c2c") || route.includes("chujin") || route.includes("dongka")) {
    return { badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400", hover: "hover:border-emerald-500/40" };
  }
  if (route.includes("heyue") || route.includes("wangge") || route.includes("matinggele") || route.includes("feilv")) {
    return { badge: "bg-amber-500/10 border-amber-500/30 text-amber-400", hover: "hover:border-amber-500/40" };
  }
  if (route.includes("web3") || route.includes("zhujici") || route.includes("tibi") || route.includes("xrp")) {
    return { badge: "bg-purple-500/10 border-purple-500/30 text-purple-400", hover: "hover:border-purple-500/40" };
  }
  return { badge: "bg-rose-500/10 border-rose-500/30 text-rose-400", hover: "hover:border-rose-500/40" };
}

export default function TutorialsHub({ locale = 'zh' }: TutorialsHubProps) {
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;
  const prefix = isHant ? "/hant" : "";
  const currentDate = getCurrentDateString();

  const [activeTab, setActiveTab] = useState("all");

  const CORE_PILLAR_KEYS = new Set([
    "home", "guanwang", "app", "diannao", "wangye", "zhuce", "denglu",
    "anzhuo", "pingguo", "anzhuangbao", "xinshou-jiaocheng", "zhongwen", "xiazai"
  ]);

  // 严格获取所有已解锁文章（publishDate <= currentDate），按发布时间从新到旧（降序）全量排列
  const allUnlockedArticles = useMemo(() => {
    return Object.values(seoData)
      .filter(item => {
        if (CORE_PILLAR_KEYS.has(item.route)) return false;
        if (!item.publishDate || item.publishDate > currentDate) return false;
        return true;
      })
      .sort((a, b) => b.publishDate!.localeCompare(a.publishDate!));
  }, [seoData, currentDate]);

  // 按分类筛选
  const filteredArticles = useMemo(() => {
    if (activeTab === "all") return allUnlockedArticles;
    if (activeTab === "pc") return allUnlockedArticles.filter(a => a.route.includes("pc") || a.route.includes("api") || a.route.includes("dns"));
    if (activeTab === "c2c") return allUnlockedArticles.filter(a => a.route.includes("c2c") || a.route.includes("chujin") || a.route.includes("dongka"));
    if (activeTab === "trade") return allUnlockedArticles.filter(a => a.route.includes("heyue") || a.route.includes("wangge") || a.route.includes("matinggele") || a.route.includes("feilv"));
    if (activeTab === "security") return allUnlockedArticles.filter(a => a.route.includes("2fa") || a.route.includes("passkey") || a.route.includes("fangdiaoyu") || a.route.includes("laoyonghu"));
    if (activeTab === "web3") return allUnlockedArticles.filter(a => a.route.includes("web3") || a.route.includes("zhujici") || a.route.includes("tibi") || a.route.includes("xrp"));
    return allUnlockedArticles;
  }, [allUnlockedArticles, activeTab]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 scroll-mt-20">
      <div className="space-y-10">
        
        {/* Hub Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-900">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-xs text-yellow-500 font-bold font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isHant ? "官方實操與排錯知識庫" : "官方实操与排错知识库"}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              {isHant ? "歐意 OKX 全功能深度實操指南" : "欧意 OKX 全功能深度实操指南"}
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              {isHant 
                ? \`已解鎖上線 \${allUnlockedArticles.length} 篇原創實操教程，按最新發佈時間排列，涵蓋多屏看盤、C2C安全出金、合約風控防爆倉、Web3多鏈防盜等全流程指引。\`
                : \`已解锁上线 \${allUnlockedArticles.length} 篇原创实操教程，按最新发布时间排列，涵盖多屏看盘、C2C安全出金、合约风控防爆仓、Web3多链防盗等全流程指引。 fudge\`.replace(' fudge', '')}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-3 rounded-2xl shrink-0">
            <div className="text-right">
              <span className="block text-[11px] text-zinc-500 uppercase font-mono font-bold">Total Unlocked</span>
              <span className="text-lg font-black text-yellow-500 font-mono">{filteredArticles.length} 篇已按最新排列</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
              <Layers className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={\`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none \${
                  isActive
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                    : "bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }\`}
              >
                {isHant ? tab.hant : tab.zh}
              </button>
            );
          })}
        </div>

        {/* 全量平铺展现所有已解锁文章（从新到旧） */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950/20 border border-zinc-900 rounded-3xl">
            <p className="text-zinc-500 text-sm">
              {isHant ? "暫無已解鎖的教程文章。" : "暂无已解锁的教程文章。"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((page) => {
              const cardTheme = getCardTheme(page.route);
              return (
                <Link
                  key={page.route}
                  href={\`\${prefix}/\${page.route}/\`}
                  className={\`group flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/70 border border-zinc-900 \${cardTheme.hover} transition-all duration-300 shadow-sm space-y-4 cursor-pointer\`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={\`px-2.5 py-0.5 rounded-md border text-[10px] font-bold tracking-wide font-mono \${cardTheme.badge}\`}>
                        {page.tabLabel}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        <span>{page.publishDate}</span>
                      </span>
                    </div>
                    <h3 className="text-zinc-100 group-hover:text-yellow-400 font-bold text-sm leading-snug transition-colors line-clamp-2">
                      {page.title.split("【")[0].trim()}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 font-normal">
                      {page.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-900/80 text-xs font-semibold text-zinc-500 group-hover:text-yellow-400 transition-colors">
                    <span className="flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>{isHant ? "完整實操步驟" : "完整实操步骤"}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
`;
fs.writeFileSync(hubPath, hubCode, 'utf8');

// 3. 升级 Hero.tsx：高端微光流体设计与无文本重复
const heroPath = path.join(rootDir, 'src', 'components', 'Hero.tsx');
const heroCode = `"use client";

import { useState } from "react";
import Link from "next/link";
import { useConfig } from "../context/ConfigContext";
import { SEO_KEYWORDS_MAP } from "../seoData";
import { SEO_KEYWORDS_MAP_HANT } from "../seoData.hant";
import { ArrowRight, ShieldCheck, Zap, Lock, Sparkles, Activity, CheckCircle2 } from "lucide-react";

interface HeroProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function Hero({ currentRoute, locale = 'zh' }: HeroProps) {
  const { config } = useConfig();
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;

  const pageData = seoData[currentRoute] || seoData.home;

  const getSubTitle = (route: string) => {
    if (isHant) {
      switch (route) {
        case "home":
          return "歐意 OKX / 易歐 / 毆易 最新備用網址與 App 下載導航";
        case "zhuce":
          return "歐意帳號註冊與 20% 手續費減免特權";
        case "denglu":
          return "歐意網頁版安全登錄與高可用備用節點";
        case "app":
          return "歐意 App (iOS / Android) 正版原裝下載";
        case "diannao":
          return "歐意電腦客戶端 (Windows / Mac) 專業多屏版下載";
        case "anzhuangbao":
          return "歐意安卓 APK 安裝包與蘋果 iOS 安裝指南";
        case "pingguo":
          return "蘋果 iOS 版 App Store 安裝與 Apple ID 獲取";
        case "wangye":
          return "歐意網頁線上版免安裝極速交易入口";
        case "anzhuo":
          return "歐意安卓 APK 正版原裝直連下載";
        case "guanwang":
          return "歐意最新高可用安全備用網址通道";
        case "zhongwen":
          return "歐意中文介面與人民幣 (CNY) 顯示配置";
        case "xiazai":
          return "歐意 App 與電腦桌面端下載大廳";
        default:
          return "";
      }
    }
    switch (route) {
      case "home":
        return "欧意 OKX / 易欧 / 殴易 最新备用网址与 App 下载导航";
      case "zhuce":
        return "欧意账号注册与 20% 手续费减免特权";
      case "denglu":
        return "欧意网页版安全登录与高可用备用节点";
      case "app":
        return "欧意 App (iOS / Android) 正版原装下载";
      case "diannao":
        return "欧意电脑客户端 (Windows / Mac) 专业多屏版下载";
      case "anzhuangbao":
        return "欧意安卓 APK 安装包与苹果 iOS 安装指南";
      case "pingguo":
        return "苹果 iOS 版 App Store 安装与 Apple ID 获取";
      case "wangye":
        return "欧意网页在线版免安装极速交易入口";
      case "anzhuo":
        return "欧意安卓 APK 正版原装直连下载";
      case "guanwang":
        return "欧意最新高可用安全备用网址通道";
      case "zhongwen":
        return "欧意中文界面与人民币 (CNY) 显示配置";
      case "xiazai":
        return "欧意 App 与电脑桌面端下载大厅";
      default:
        return "";
    }
  };

  return (
    <section id="hero" className="relative min-h-[75vh] flex items-center justify-center py-12 md:py-20 overflow-hidden border-b border-zinc-900 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* 现代微光光晕 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-yellow-500/8 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 左侧主要文案 */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* 状态徽章 */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-yellow-400 font-semibold mx-auto lg:mx-0 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{pageData.heroBadge}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 text-[11px] font-mono">256-bit SSL</span>
            </div>

            {/* 核心大标题 */}
            <div className="space-y-3.5">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15] flex flex-col items-center lg:items-start text-center lg:text-left">
                {pageData.heroTitle.includes("|") ? (
                  pageData.heroTitle.split("|").map((part, idx) => (
                    <span key={idx} className={idx > 0 ? "mt-1 sm:mt-1.5 text-zinc-200" : ""}>
                      {part.trim()}
                    </span>
                  ))
                ) : (
                  <span>{pageData.heroTitle}</span>
                )}
              </h1>
              {getSubTitle(currentRoute) && (
                <p className="text-base sm:text-xl font-bold bg-gradient-to-r from-yellow-400 via-amber-300 to-amber-500 bg-clip-text text-transparent tracking-wide font-sans leading-relaxed">
                  {getSubTitle(currentRoute)}
                </p>
              )}
            </div>

            {/* 核心说明 */}
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              {pageData.heroSub}
            </p>

            {/* 行动按钮与保障 */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                data-cta="true"
                className="w-full sm:w-fit flex items-center justify-center gap-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-yellow-500/15 transition active:scale-95 cursor-pointer"
              >
                <span>{isHant ? "安全直達訪問通道" : "安全直达访问通道"}</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isHant ? "多節點加密線路" : "多节点加密线路"}</span>
              </div>
            </div>
          </div>

          {/* 右侧交互卡片 */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
              
              {/* 卡片顶部装饰 */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-850">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs text-zinc-400 font-mono ml-1 font-bold">Fast Gateway</span>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  REAL-TIME 2026
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">{pageData.customIntroTitle}</h3>
                <p className="text-zinc-400 text-xs mt-1">{pageData.customIntroBody}</p>
              </div>

              {/* 步骤条 */}
              <div className="space-y-3.5">
                {(pageData.detailedSteps || []).map((step, idx) => (
                  <div key={idx} className="flex gap-3.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                    <div className="w-6 h-6 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                      {step.step || idx + 1}
                    </div>
                    <div>
                      <h4 className="text-zinc-100 text-xs font-bold">{step.title}</h4>
                      <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 直达通道底部按钮 */}
              <div className="pt-2">
                <button 
                  data-cta="true"
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 text-xs text-yellow-400 font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>{isHant ? "一鍵進入專屬通道" : "一键进入专属通道"}</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(heroPath, heroCode, 'utf8');

// 4. 构建与推送
console.log('🚀 执行构建与全量平铺教程大厅部署...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "feat(hub): render all unlocked articles in reverse chronological order without pagination, fix text repetitions, upgrade hero UI"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('🎉 教程大厅全量平铺与 Hero UI 升级完成！');
