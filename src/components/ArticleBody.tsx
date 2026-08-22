"use client";

import { useState } from "react";
import { useConfig } from "../context/ConfigContext";
import { SEO_KEYWORDS_MAP } from "../seoData";
import { SEO_KEYWORDS_MAP_HANT } from "../seoData.hant";
import { Copy, Check, BookOpen, ArrowRight, ExternalLink } from "lucide-react";

interface ArticleBodyProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function ArticleBody({ currentRoute, locale = 'zh' }: ArticleBodyProps) {
  const { config } = useConfig();
  const [copied, setCopied] = useState(false);
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;
  const pageData = seoData[currentRoute];

  if (!pageData) {
    return null;
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(config.invitationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      alert(isHant ? `邀請碼已複製：${config.invitationCode}` : `邀请码已复制：${config.invitationCode}`);
    }
  };

  // Content constants depending on locale
  const t = {
    introTitle: isHant ? "教程背景與要領说明" : "教程背景与要领说明",
    stepsTitle: isHant ? "詳細步驟圖文指引" : "详细步骤图文指引",
    ctaTitle: isHant ? "新用戶註冊限時福利" : "新用户注册限时福利",
    ctaDesc: isHant 
      ? "使用本站专属邀请码 ACE528829 注册，可立享终身 20% 交易手续费自动返还。系统每日凌晨结转，全自动原路打回您的资金账户。"
      : "使用本站专属邀请码 ACE528829 注册，可立享终身 20% 交易手续费自动返还。系统每日凌晨结转，全自动原路打回您的资金账户。",
    copyBtn: isHant ? "複製邀請碼" : "复制邀请码",
    copiedBtn: isHant ? "複製成功" : "复制成功",
    visitBtn: isHant ? "查看訪問入口" : "查看访问入口",
    stepPrefix: isHant ? "步驟" : "步骤",
    tipTitle: isHant ? "操作提示：" : "操作提示：",
    tips: [
      isHant 
        ? "操作前请确认当前网络环境可靠，不要在本站输入账号、密码、验证码或助记词。"
        : "操作前请确认当前网络环境可靠，不要在本站输入账号、密码、验证码或助记词。",
      isHant
        ? "若安装过程中遇到联网检测卡死，可尝试暂时切换至飞行模式或断网进行离线过检。"
        : "若安装过程中遇到联网检测卡死，可尝试暂时切换至飞行模式或断网进行离线过检。",
      isHant
        ? "注册完成后请在APP安全中心绑定谷歌验证器，开启防钓鱼码，双重加固您的账号安全。"
        : "注册完成后请在APP安全中心绑定谷歌验证器，开启防钓鱼码，双重加固您的账号安全。"
    ]
  };

  return (
    <section className="py-12 md:py-16 bg-[#0b0e11] text-zinc-300 border-b border-zinc-900 scroll-mt-18">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Intro Section */}
        <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 md:p-8 mb-8 space-y-4">
          <div className="flex items-center gap-2 text-yellow-500 font-bold text-sm">
            <BookOpen size={16} />
            <span>{t.introTitle}</span>
          </div>
          <h3 className="text-white font-extrabold text-lg md:text-xl">
            {pageData.customIntroTitle}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {pageData.customIntroBody}
          </p>
          <div className="text-[11px] text-zinc-500 leading-relaxed pt-2 border-t border-zinc-900/60">
            {pageData.description}
          </div>
        </div>

        {/* Steps Section */}
        <div className="space-y-6 mb-8">
          <h3 className="text-white font-extrabold text-base md:text-lg mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-yellow-500 rounded-full"></span>
            {t.stepsTitle}
          </h3>

          <div className="relative border-l border-zinc-900 ml-3.5 pl-6 space-y-8">
            {pageData.detailedSteps.map((step, idx) => (
              <div key={step.step} className="relative">
                {/* Dot marker */}
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 border border-yellow-500/50 text-[10px] font-mono text-yellow-500 font-bold">
                  {step.step}
                </span>

                <div className="bg-zinc-950 border border-zinc-900 hover:border-zinc-800/80 rounded-xl p-5 transition-all duration-300">
                  <h4 className="text-white text-sm md:text-base font-bold mb-2">
                    {t.stepPrefix} {step.step}：{step.title}
                  </h4>
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-3">
                    {step.desc}
                  </p>
                  <div className="bg-zinc-900/35 border border-zinc-900/50 rounded-lg p-3 text-[11px] text-zinc-500">
                    <strong className="text-yellow-500/90">{t.tipTitle}</strong>
                    {t.tips[idx] || t.tips[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA invitation box */}
        <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-white font-extrabold text-base md:text-lg">{t.ctaTitle}</h4>
            <p className="text-zinc-400 text-xs max-w-md leading-relaxed">
              {t.ctaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            {/* Copy code input/button block */}
            <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 justify-between gap-3 w-full sm:w-auto select-none">
              <div className="text-left">
                <span className="block text-[8px] text-zinc-500 uppercase">Code</span>
                <span className="block text-zinc-200 font-mono font-bold text-xs">{config.invitationCode}</span>
              </div>
              <button
                onClick={copyCode}
                className="py-1.5 px-3 bg-yellow-500 hover:bg-yellow-400 text-black text-[10px] font-bold rounded-lg transition flex items-center gap-1 select-none shrink-0 cursor-pointer"
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                <span>{copied ? t.copiedBtn : t.copyBtn}</span>
              </button>
            </div>

            <button
              data-cta="true"
              className="w-full sm:w-auto py-3.5 px-5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition select-none cursor-pointer"
            >
              <span>{t.visitBtn}</span>
              <ExternalLink size={12} className="text-zinc-500" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
