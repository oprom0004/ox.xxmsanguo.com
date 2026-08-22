"use client";

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
              <ChevronDown size={12} className={`text-zinc-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-24 bg-[#111622] border border-zinc-800 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in duration-150">
                <Link
                  href={currentRoute === "home" ? "/" : `/${currentRoute}/`}
                  onClick={() => setIsLangOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2 text-xs transition ${
                    !isHant ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <span>简体中文</span>
                </Link>
                <Link
                  href={currentRoute === "home" ? "/hant/" : `/hant/${currentRoute}/`}
                  onClick={() => setIsLangOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2 text-xs transition ${
                    isHant ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
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
              ? (key === "home" ? "/hant/" : `/hant/${key}/`)
              : (key === "home" ? "/" : `/${key}/`);

            return (
              <Link
                key={key}
                href={targetUrl}
                className={`text-center py-1.5 px-1 rounded-lg text-xs font-semibold transition-all duration-150 select-none truncate ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-zinc-900/60 border border-zinc-800/70 text-zinc-300 hover:text-white hover:bg-zinc-800"
                }`}
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
              ? (key === "home" ? "/hant/" : `/hant/${key}/`)
              : (key === "home" ? "/" : `/${key}/`);

            return (
              <Link
                key={key}
                href={targetUrl}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 select-none ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/80 font-medium"
                }`}
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
