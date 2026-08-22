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
    <header className="sticky top-0 z-40 bg-[#080b11]/95 backdrop-blur-md border-b border-zinc-850 shadow-xl">
      {/* 顶部主 Branding 栏 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* 左侧 OKX 品牌 */}
        <Link href={isHant ? "/hant/" : "/"} className="flex items-center gap-2.5 group cursor-pointer select-none">
          <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 text-black rounded-lg font-black tracking-tight text-xs font-mono shrink-0 shadow-md group-hover:scale-105 transition-transform">
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
                    !isHant ? 'text-yellow-400 font-bold bg-yellow-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <span>简体中文</span>
                </Link>
                <Link
                  href={currentRoute === "home" ? "/hant/" : `/hant/${currentRoute}/`}
                  onClick={() => setIsLangOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2 text-xs transition ${
                    isHant ? 'text-yellow-400 font-bold bg-yellow-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <span>繁體中文</span>
                </Link>
              </div>
            )}
          </div>

          {/* 直达按钮 */}
          <button 
            data-cta="true"
            className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs px-3.5 py-1.5 rounded-lg shadow-sm shadow-yellow-500/20 transition active:scale-95 cursor-pointer select-none"
          >
            <span>{isHant ? "安全直達" : "安全直达"}</span>
          </button>
        </div>
      </div>

      {/* 极简自然流动的横向滑动导航条 */}
      <div className="bg-[#05070a] border-t border-zinc-850 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
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
                className={`relative px-3 py-1.5 text-xs whitespace-nowrap transition-all duration-150 select-none flex items-center shrink-0 ${
                  isActive
                    ? "text-yellow-400 font-bold"
                    : "text-zinc-400 hover:text-zinc-200 font-medium"
                }`}
              >
                <span>{page.tabLabel}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-yellow-500 rounded-full shadow-sm shadow-yellow-500/50"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
