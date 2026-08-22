import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. 重构 Hero.tsx：彻底抛弃刺眼纯黄，转向 OKX 官方原生的纯黑白极简高级风，干掉所有无意义假洋文
const heroPath = path.join(rootDir, 'src', 'components', 'Hero.tsx');
const heroCode = `"use client";

import { useConfig } from "../context/ConfigContext";
import { SEO_KEYWORDS_MAP } from "../seoData";
import { SEO_KEYWORDS_MAP_HANT } from "../seoData.hant";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

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
    <section id="hero" className="relative min-h-[72vh] flex items-center justify-center py-12 md:py-20 overflow-hidden border-b border-zinc-900 bg-black">
      {/* 极简深邃背景与微弱银白氛围光 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-zinc-800/20 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* 左侧主要文案 */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* 极简状态 Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 font-medium mx-auto lg:mx-0 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{pageData.heroBadge}</span>
              <span className="text-zinc-700">•</span>
              <span className="text-zinc-400 font-mono text-[11px]">加密直连</span>
            </div>

            {/* 核心大标题 */}
            <div className="space-y-3">
              <h1 className="font-display font-black text-3xl sm:text-4.5xl md:text-5.5xl text-white tracking-tight leading-[1.12] flex flex-col items-center lg:items-start text-center lg:text-left">
                {pageData.heroTitle.includes("|") ? (
                  pageData.heroTitle.split("|").map((part, idx) => (
                    <span key={idx} className={idx > 0 ? "mt-1 text-zinc-300" : ""}>
                      {part.trim()}
                    </span>
                  ))
                ) : (
                  <span>{pageData.heroTitle}</span>
                )}
              </h1>
              {getSubTitle(currentRoute) && (
                <p className="text-base sm:text-lg font-semibold text-zinc-400 tracking-wide font-sans leading-relaxed">
                  {getSubTitle(currentRoute)}
                </p>
              )}
            </div>

            {/* 说明 */}
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              {pageData.heroSub}
            </p>

            {/* 行动按钮（OKX 经典纯白高质感按键） */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                data-cta="true"
                className="w-full sm:w-fit flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-white/5 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>{isHant ? "立即安全訪問" : "立即安全访问"}</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span>{isHant ? "端到端 256 位加密" : "端到端 256 位加密"}</span>
              </div>
            </div>
          </div>

          {/* 右侧：极简干净的 3 步排错与直达面板 */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
              
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">{pageData.customIntroTitle}</h3>
                <p className="text-zinc-500 text-xs mt-1">{pageData.customIntroBody}</p>
              </div>

              {/* 步骤列表 */}
              <div className="space-y-3">
                {(pageData.detailedSteps || []).map((step, idx) => (
                  <div key={idx} className="flex gap-3.5 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.step || idx + 1}
                    </div>
                    <div>
                      <h4 className="text-zinc-200 text-xs font-bold">{step.title}</h4>
                      <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部极简按钮 */}
              <div className="pt-2">
                <button 
                  data-cta="true"
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs text-zinc-200 hover:text-white font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>{isHant ? "進入專屬直連通道" : "进入专属直连通道"}</span>
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

// 2. 优化 Navbar.tsx：将当前激活 tab 改为极简白底黑字或深灰白字，去除生硬黄色高亮
const navPath = path.join(rootDir, 'src', 'components', 'Navbar.tsx');
if (fs.existsSync(navPath)) {
  let navContent = fs.readFileSync(navPath, 'utf8');
  navContent = navContent
    .replace(/bg-yellow-500 text-black/g, 'bg-white text-black font-bold')
    .replace(/text-yellow-500/g, 'text-white')
    .replace(/border-yellow-500/g, 'border-white');
  fs.writeFileSync(navPath, navContent, 'utf8');
}

// 3. 构建并推送
console.log('🚀 构建 OKX 经典极简黑白高级质感 UI 并推送到 GitHub...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "feat(ui): redesign Hero and Nav to OKX native minimalist black-and-white theme, remove redundant fake tags and improve contrast"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('🎉 极简高级风重构完成并已推送到 GitHub！');
