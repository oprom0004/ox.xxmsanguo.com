"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useConfig } from "../context/ConfigContext";
import { SEO_KEYWORDS_MAP } from "../seoData";
import { SEO_KEYWORDS_MAP_HANT } from "../seoData.hant";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function Header({ currentRoute, locale = 'zh' }: HeaderProps) {
  const { config } = useConfig();
  const [copied, setCopied] = useState(false);
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

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(config.invitationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      alert(isHant ? `邀請碼為：${config.invitationCode}` : `邀请码为：${config.invitationCode}`);
    }
  };

  const keywordKeys = [
    "home",
    "guanwang",
    "app",
    "diannao",
    "wangye",
    "zhuce",
    "denglu",
    "anzhuo",
    "pingguo",
    "anzhuangbao",
    "xinshou-jiaocheng",
    "zhongwen",
    "xiazai"
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0e11] border-b border-zinc-900 shadow-xl">
      {/* Main Branding Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={isHant ? "/hant/" : "/"} className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="relative flex items-center justify-center w-9 h-9 bg-yellow-500 text-black rounded-lg font-black tracking-tight text-xs font-mono shadow-lg shrink-0 select-none">
            <span className="text-[12px]">OKX</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-400 border border-[#0b0e11] rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-extrabold text-base text-white tracking-tight">ox.xxmsanguo.com</span>
              <span className="bg-yellow-500/15 text-yellow-400 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border border-yellow-500/25">
                {isHant ? "指南站" : "指南站"}
              </span>
            </div>
            <p className="text-zinc-500 text-[9px] mt-0.5 italic">
              {isHant ? "歐意 | OKX | 易歐 | 毆易 | 歐易 導航" : "欧意 | OKX | 易欧 | 殴易 | 欧易 导航"}
            </p>
          </div>
        </Link>

        {/* Action Widgets */}
        <div className="flex items-center gap-3">
          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 text-xs px-2.5 py-1.5 rounded-lg transition select-none cursor-pointer"
              title={isHant ? "選擇語言" : "选择语言"}
            >
              <span>{isHant ? "繁體中文" : "简体中文"}</span>
              <ChevronDown size={12} className={`text-zinc-500 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-20 bg-[#161a20]/95 border border-zinc-800 rounded-lg shadow-2xl py-1 z-50 backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-150">
                <Link
                  href={currentRoute === "home" ? "/" : `/${currentRoute}/`}
                  onClick={() => setIsLangOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-xs transition ${
                    !isHant ? 'text-yellow-400 font-bold bg-zinc-900/50' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/30'
                  }`}
                >
                  <span>简体</span>
                  {!isHant && <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>}
                </Link>
                <Link
                  href={currentRoute === "home" ? "/hant/" : `/hant/${currentRoute}/`}
                  onClick={() => setIsLangOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-xs transition ${
                    isHant ? 'text-yellow-400 font-bold bg-zinc-900/50' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/30'
                  }`}
                >
                  <span>繁體</span>
                  {isHant && <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>}
                </Link>
              </div>
            )}
          </div>

          {/* Quick Access Button */}
          <button 
            data-cta="true"
            className="flex items-center gap-1 border border-yellow-500/40 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 font-semibold text-xs px-3.5 py-1.5 rounded-lg transition active:scale-95 cursor-pointer select-none"
          >
            {isHant ? "查看訪問入口" : "查看访问入口"}
          </button>
        </div>
      </div>

      {/* Navigation Link Rail */}
      <div className="bg-zinc-950/90 border-t border-b border-zinc-800/80 py-2 lg:py-1.5 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-start lg:justify-between gap-2.5 lg:gap-6 select-none">
          
          {/* Left Branding Block */}
          <div className="flex items-center justify-between pb-2 lg:pb-0 lg:pr-3 lg:border-r border-zinc-800 select-none shrink-0 w-full lg:w-auto">
            <Link href={isHant ? "/hant/" : "/"} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="font-display font-extrabold text-white text-xs tracking-tight">
                {isHant ? "歐意 OKX" : "欧意 OKX"}
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="grid grid-cols-4 gap-1.5 lg:flex lg:flex-nowrap lg:items-center lg:gap-2.5 py-0.5 select-none w-full lg:w-auto">
            {keywordKeys.map((key) => {
              const item = seoData[key];
              const isActive = currentRoute === key;
              const href = isHant
                ? (key === "home" ? "/hant/" : `/hant/${key}/`)
                : (key === "home" ? "/" : `/${key}/`);
              return (
                <Link
                  key={key}
                  href={href}
                  className={`px-2 py-1.5 rounded-md text-[11px] lg:text-xs font-medium tracking-wide transition text-center flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "bg-yellow-500 text-black shadow-md font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent"
                  }`}
                >
                  {item ? item.tabLabel : key}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
