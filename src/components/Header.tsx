"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "../seoData";
import { SEO_KEYWORDS_MAP_HANT } from "../seoData.hant";
import { ChevronDown, Globe, ShieldCheck } from "lucide-react";

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
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-zinc-850">
      {/* 极简高级主顶栏 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* 左侧 OKX 极简黑白品牌 LOGO */}
        <Link href={isHant ? "/hant/" : "/"} className="flex items-center gap-2.5 group cursor-pointer">
          <div className="flex items-center justify-center w-8 h-8 bg-white text-black rounded-lg font-black tracking-tight text-xs font-mono shrink-0 select-none shadow-sm group-hover:scale-105 transition-transform">
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

        {/* 右侧功能操作区 */}
        <div className="flex items-center gap-3">
          
          {/* 极简语言选择器 */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs px-3 py-1.5 rounded-lg transition select-none cursor-pointer"
            >
              <Globe size={13} className="text-zinc-400" />
              <span>{isHant ? "繁體" : "简体"}</span>
              <ChevronDown size={12} className={`text-zinc-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-24 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in duration-150">
                <Link
                  href={currentRoute === "home" ? "/" : `/${currentRoute}/`}
                  onClick={() => setIsLangOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2 text-xs transition ${
                    !isHant ? 'text-white font-bold bg-zinc-800' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <span>简体中文</span>
                </Link>
                <Link
                  href={currentRoute === "home" ? "/hant/" : `/hant/${currentRoute}/`}
                  onClick={() => setIsLangOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2 text-xs transition ${
                    isHant ? 'text-white font-bold bg-zinc-800' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <span>繁體中文</span>
                </Link>
              </div>
            )}
          </div>

          {/* 纯白高质感直达按钮 */}
          <button 
            data-cta="true"
            className="flex items-center gap-1.5 bg-white hover:bg-zinc-200 text-black font-bold text-xs px-4 py-1.5 rounded-lg shadow-sm transition active:scale-95 cursor-pointer select-none"
          >
            <span>{isHant ? "安全直達" : "安全直达"}</span>
          </button>
        </div>
      </div>

      {/* 极简横向导航栏 (Navigation Rail) */}
      <div className="bg-zinc-950 border-t border-zinc-900 py-1.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
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
                className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-all duration-150 select-none ${
                  isActive
                    ? "bg-white text-black font-extrabold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900 font-medium"
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
