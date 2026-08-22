import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. 重构 Header.tsx：科技蓝主色 + 移动端自适应平铺网格（全部展示所有菜单）
const headerPath = path.join(rootDir, 'src', 'components', 'Header.tsx');
const headerCode = `"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "../seoData";
import { SEO_KEYWORDS_MAP_HANT } from "../seoData.hant";
import { ChevronDown, Globe } from "lucide-react";

interface HeaderProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function Header({ currentRoute, locale = 'zh' }: HeaderProps) {
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;

  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const keywordKeys = [
    "home", "guanwang", "app", "diannao", "wangye", "zhuce",
    "denglu", "anzhuo", "pingguo", "anzhuangbao", "xinshou-jiaocheng", "zhongwen", "xiazai"
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#080b11]/95 backdrop-blur-md border-b border-zinc-800 shadow-2xl">
      {/* 顶部主 Branding 栏 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* 左侧 OKX 品牌 */}
        <Link href={isHant ? "/hant/" : "/"} className="flex items-center gap-2.5 group cursor-pointer select-none">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-lg font-black tracking-tight text-xs font-mono shrink-0 shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <span>OKX</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-base text-white tracking-tight">
              {isHant ? "歐意 OKX" : "欧意 OKX"}
            </span>
            <span className="hidden sm:inline-block text-[11px] text-zinc-500 font-mono">
              ox.xxmsanguo.com
            </span>
          </div>
        </Link>

        {/* 右侧功能区 */}
        <div className="flex items-center gap-2.5">
          
          {/* 语言切换 */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs px-2.5 py-1.5 rounded-lg transition select-none cursor-pointer"
            >
              <Globe size={12} className="text-zinc-400" />
              <span>{isHant ? "繁體" : "简体"}</span>
              <ChevronDown size={12} className={\`text-zinc-400 transition-transform duration-200 \${isLangOpen ? 'rotate-180' : ''}\`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-24 bg-[#111622] border border-zinc-800 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in duration-150">
                <Link
                  href={currentRoute === "home" ? "/" : \`/\${currentRoute}/\`}
                  onClick={() => setIsLangOpen(false)}
                  className={\`flex items-center justify-between px-3.5 py-2 text-xs transition \${
                    !isHant ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }\`}
                >
                  <span>简体中文</span>
                </Link>
                <Link
                  href={currentRoute === "home" ? "/hant/" : \`/hant/\${currentRoute}/\`}
                  onClick={() => setIsLangOpen(false)}
                  className={\`flex items-center justify-between px-3.5 py-2 text-xs transition \${
                    isHant ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }\`}
                >
                  <span>繁體中文</span>
                </Link>
              </div>
            )}
          </div>

          {/* 科技蓝直达按钮 */}
          <button 
            data-cta="true"
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-lg shadow-md shadow-blue-600/25 transition active:scale-95 cursor-pointer select-none"
          >
            <span>{isHant ? "安全直達" : "安全直达"}</span>
          </button>
        </div>
      </div>

      {/* 手机端平铺网格 + PC 端平滑导航栏 (100% 全部展现，杜绝截断) */}
      <div className="bg-[#05070a] border-t border-zinc-850 p-2 sm:px-4">
        {/* 移动端平铺网格 (4列网格一目了然) */}
        <div className="grid grid-cols-4 gap-1.5 md:hidden">
          {keywordKeys.map((key) => {
            const page = seoData[key];
            if (!page) return null;
            const isActive = currentRoute === key;
            const targetUrl = isHant
              ? (key === "home" ? "/hant/" : \`/hant/\${key}/\`)
              : (key === "home" ? "/" : \`/\${key}/\`);

            return (
              <Link
                key={key}
                href={targetUrl}
                className={\`text-center py-1.5 px-1 rounded-lg text-xs font-semibold transition-all duration-150 select-none truncate \${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-zinc-900/60 border border-zinc-800/70 text-zinc-300 hover:text-white hover:bg-zinc-800"
                }\`}
              >
                {page.tabLabel}
              </Link>
            );
          })}
        </div>

        {/* PC 端横向整洁排列 */}
        <div className="hidden md:flex items-center justify-center gap-1.5 py-0.5">
          {keywordKeys.map((key) => {
            const page = seoData[key];
            if (!page) return null;
            const isActive = currentRoute === key;
            const targetUrl = isHant
              ? (key === "home" ? "/hant/" : \`/hant/\${key}/\`)
              : (key === "home" ? "/" : \`/\${key}/\`);

            return (
              <Link
                key={key}
                href={targetUrl}
                className={\`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 select-none \${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/80 font-medium"
                }\`}
              >
                {page.tabLabel}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
`;
fs.writeFileSync(headerPath, headerCode, 'utf8');

// 2. 重构 Hero.tsx：科技深蓝主题（Electric Tech Blue）
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
    <section id="hero" className="relative min-h-[75vh] flex items-center justify-center py-12 md:py-18 overflow-hidden border-b border-zinc-850 bg-gradient-to-b from-[#060911] via-[#0b1120] to-[#060911]">
      {/* 科技电光蓝光晕 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* 左侧主要文案 */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* 科技蓝 Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs text-blue-400 font-semibold mx-auto lg:mx-0 shadow-sm shadow-blue-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{pageData.heroBadge}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 font-mono text-[11px]">加密直连</span>
            </div>

            {/* 核心大标题 */}
            <div className="space-y-3">
              <h1 className="font-display font-black text-3xl sm:text-4.5xl md:text-5.5xl text-white tracking-tight leading-[1.14] flex flex-col items-center lg:items-start text-center lg:text-left">
                {pageData.heroTitle.includes("|") ? (
                  pageData.heroTitle.split("|").map((part, idx) => (
                    <span key={idx} className={idx > 0 ? "mt-1 text-zinc-200" : ""}>
                      {part.trim()}
                    </span>
                  ))
                ) : (
                  <span>{pageData.heroTitle}</span>
                )}
              </h1>
              {getSubTitle(currentRoute) && (
                <p className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400 bg-clip-text text-transparent tracking-wide font-sans leading-relaxed">
                  {getSubTitle(currentRoute)}
                </p>
              )}
            </div>

            {/* 说明 */}
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              {pageData.heroSub}
            </p>

            {/* 行动按钮 */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                data-cta="true"
                className="w-full sm:w-fit flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-xl shadow-blue-600/30 transition-all duration-200 active:scale-95 cursor-pointer"
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

          {/* 右侧：科技控制面板 */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#0b101c]/90 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
              
              <div className="pb-3 border-b border-zinc-800/80">
                <h3 className="font-display font-bold text-base sm:text-lg text-white">{pageData.customIntroTitle}</h3>
                <p className="text-zinc-400 text-xs mt-0.5">{pageData.customIntroBody}</p>
              </div>

              {/* 步骤列表 */}
              <div className="space-y-3">
                {(pageData.detailedSteps || []).map((step, idx) => (
                  <div key={idx} className="flex gap-3.5 p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/70 hover:border-blue-500/30 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/25 text-blue-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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

              {/* 底部按钮 */}
              <div className="pt-1">
                <button 
                  data-cta="true"
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-750 hover:border-blue-500/40 text-xs text-blue-400 font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
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

// 3. 重构 TutorialsHub.tsx：主色全面调为科技蓝
const hubPath = path.join(rootDir, 'src', 'components', 'TutorialsHub.tsx');
let hubContent = fs.readFileSync(hubPath, 'utf8');
hubContent = hubContent
  .replace(/bg-yellow-500/g, 'bg-blue-600')
  .replace(/text-yellow-400/g, 'text-blue-400')
  .replace(/text-yellow-500/g, 'text-blue-400')
  .replace(/border-yellow-500/g, 'border-blue-500')
  .replace(/hover:text-yellow-400/g, 'hover:text-blue-400');
fs.writeFileSync(hubPath, hubContent, 'utf8');

// 4. 重构 ClientLayout.tsx：吸底按钮调为科技蓝
const layoutPath = path.join(rootDir, 'src', 'components', 'ClientLayout.tsx');
let layoutCode = fs.readFileSync(layoutPath, 'utf8');
layoutCode = layoutCode.replace(
  /className="w-full bg-[^"]* text-black font-extrabold/g,
  'className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold'
);
fs.writeFileSync(layoutPath, layoutCode, 'utf8');

// 5. 构建与推送
console.log('🚀 构建科技蓝配色与全展开手机端菜单 UI 并推送到 GitHub...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "feat(ui): implement Electric Tech Blue palette and full unclipped mobile grid navigation layout"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('🎉 科技蓝全平铺菜单 UI 重构完成并已推送到 GitHub！');
