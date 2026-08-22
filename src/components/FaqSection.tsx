"use client";

import { useState } from "react";
import { SEO_KEYWORDS_MAP } from "../seoData";
import { SEO_KEYWORDS_MAP_HANT } from "../seoData.hant";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FaqSectionProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function FaqSection({ currentRoute, locale = 'zh' }: FaqSectionProps) {
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;
  const pageData = seoData[currentRoute] || seoData.home;
  
  const targetedFaq = pageData.targetedFaq || [];

  const [openIndexes, setOpenIndexes] = useState<Record<string, boolean>>({
    "faq-0": true,
  });

  const toggleIndex = (key: string) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
            {isHant ? "本專題常見問題與實操解答" : "本专题常见问题与实操解答"}
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
            {isHant 
              ? "針對當前業務場景深度整理的實戰排錯與風控規範，助您無障礙安全操作。"
              : "针对当前业务场景深度整理的实战排错与风控规范，助您无障碍安全操作。"}
          </p>
        </div>

        {/* FAQ Accordion List - 100% 专属于当前业务场景 */}
        <div className="space-y-4">
          {targetedFaq.map((item, index) => {
            const key = `faq-${index}`;
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
        </div>

      </div>
    </section>
  );
}
