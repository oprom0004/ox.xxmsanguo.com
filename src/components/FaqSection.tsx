"use client";

import { useState } from "react";
import { SEO_KEYWORDS_MAP } from "../seoData";
import { SEO_KEYWORDS_MAP_HANT } from "../seoData.hant";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useConfig } from "../context/ConfigContext";

interface FaqSectionProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function FaqSection({ currentRoute, locale = 'zh' }: FaqSectionProps) {
  const { config } = useConfig();
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;
  const pageData = seoData[currentRoute] || seoData.home;
  
  // Track open state of each accordion item. By default, open the first item.
  const [openIndexes, setOpenIndexes] = useState<Record<string, boolean>>({
    "targeted-0": true,
  });

  const toggleIndex = (key: string) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const targetedFaq = pageData.targetedFaq || [];

  // Define general FAQs to append/include
  const generalFaq = isHant ? [
    {
      q: "在大區內地註冊為什麼會有“交易手續費讓利返還”？",
      a: `本安全防偽導航站 <strong class="text-zinc-200 font-semibold">ox.xxmsanguo.com</strong> 作為安全備用導航站點，為新用戶配置了默認的手續費返佣讓利。只要通過本站提供的直連通道註冊，系統將自動配置費率折扣，每日所產生的交易手續費將自動返還至您個人資金帳戶，終身有效。`
    },
    {
      q: "安裝安卓 APP 時部分廠商手機管家誤警限制如何解決？",
      a: `鑑於特定合規框架，國產手機系統（如華為鴻蒙、小米 HyperOS、OPPO、vivo等）的管家可能會將非自帶應用商店下載的 Web3 應用標記為風險程序進行限制。只要您是通過本站提供的安全通道下載的原裝原生包，即可確保 100% 純淨安全。安裝時只需<strong>關閉網絡與 Wi-Fi 連網（開啟飛行模式）</strong>，即可順利進行安裝。`
    },
    {
      q: "如果日後遇到域名無法正常解析重置應該怎麼辦？",
      a: `請永久收藏本防偽導航入口：<strong class="text-zinc-200 font-bold">${config.officialMirrorUrl}</strong>。我們部署了多點負載、高防的海外伺服器，全天候為您更新並提供安全原版的下載入口與網址。`
    }
  ] : [
    {
      q: "在大区内地注册为什么会有“交易手续费让利返还”？",
      a: `本安全防伪导航站 <strong class="text-zinc-200 font-semibold">ox.xxmsanguo.com</strong> 作为安全备用导航站点，为新用户配置了默认的手续费返现返利。只要通过本站提供的直连通道注册，系统将自动配置费率折扣，每日所产生的交易手续费将自动返还至您个人资金账户，终身有效。`
    },
    {
      q: "安装安卓 APP 时部分厂商手机管家误警限制如何解决？",
      a: `饰于特定合规框架，国产手机系统（如华为鸿蒙、小米 HyperOS、OPPO、vivo等）的管家可能会将非自带应用商店下载的 Web3 应用标记为风险程序进行限制。只要您是通过本站提供的安全通道下载的原装原生包，即可确保 100% 纯净安全。安装时只需<strong>关闭网络与 Wi-Fi 连网（开启飞行模式）</strong>，即可顺利进行安装。`
    },
    {
      q: "如果日后遇到域名无法正常解析重置应该怎么办？",
      a: `请永久收藏本防伪导航入口：<strong class="text-zinc-200 font-bold">${config.officialMirrorUrl}</strong>。我们部署了多点负载、高防的海外服务器，全天候为您更新并提供安全原版的下载入口与网址。`
    }
  ];

  if (targetedFaq.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-16 md:py-20 bg-zinc-950 text-zinc-300 border-b border-zinc-900 scroll-mt-18">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-bold font-mono">
            <HelpCircle size={12} />
            <span>SUPPORT & FAQ</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3.5xl text-white tracking-tight leading-normal">
            {isHant ? "常見問題解答與安全指引" : "常见问题解答与安全指引"}
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
            {isHant 
              ? "為您整理了本專區常見的操作疑問及安全避坑指南，助您無障礙使用歐易客戶端。"
              : "为您整理了本专区常见的操作疑问及安全避坑指南，助您无障碍使用欧易客户端。"}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          
          {/* 1. Targeted FAQs */}
          {targetedFaq.map((item, index) => {
            const key = `targeted-${index}`;
            const isOpen = !!openIndexes[key];
            return (
              <div 
                key={key}
                className="bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleIndex(key)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:text-white transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5.5 h-5.5 rounded-lg bg-yellow-500/10 text-yellow-500 font-mono flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-yellow-500/20">Q</span>
                    <span className="font-display font-bold text-zinc-100 text-xs sm:text-sm md:text-base leading-normal">{item.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-zinc-500 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown size={16} className="text-zinc-500 shrink-0 ml-4" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 border-t border-zinc-900/50">
                    <div className="pl-8.5 text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-normal space-y-2">
                      <div 
                        dangerouslySetInnerHTML={{ __html: item.a }}
                        className="prose prose-invert prose-xs text-zinc-400 max-w-none font-sans"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Divider if targeted FAQs exist (homepage only) */}
          {currentRoute === "home" && targetedFaq.length > 0 && (
            <div className="py-4 flex items-center gap-4">
              <div className="h-px bg-zinc-900 flex-1"></div>
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest font-mono shrink-0">
                {isHant ? "全平台通用基礎常識" : "全平台通用基础常识"}
              </span>
              <div className="h-px bg-zinc-900 flex-1"></div>
            </div>
          )}

          {/* 2. General FAQs (homepage only) */}
          {currentRoute === "home" && generalFaq.map((item, index) => {
            const key = `general-${index}`;
            const isOpen = !!openIndexes[key];
            return (
              <div 
                key={key}
                className="bg-zinc-900/20 border border-zinc-900/60 hover:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleIndex(key)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:text-white transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5.5 h-5.5 rounded-lg bg-zinc-800 text-zinc-400 font-mono flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-zinc-700/50">Q</span>
                    <span className="font-display font-bold text-zinc-300 text-xs sm:text-sm md:text-base leading-normal">{item.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-zinc-500 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown size={16} className="text-zinc-500 shrink-0 ml-4" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 border-t border-zinc-900/50">
                    <div className="pl-8.5 text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-normal space-y-2">
                      <div 
                        dangerouslySetInnerHTML={{ __html: item.a }}
                        className="prose prose-invert prose-xs text-zinc-400 max-w-none font-sans"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
