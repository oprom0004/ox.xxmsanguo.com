"use client";

import { useState } from "react";
import Link from "next/link";
import { useConfig } from "../context/ConfigContext";
import { SEO_KEYWORDS_MAP } from "../seoData";
import { SEO_KEYWORDS_MAP_HANT } from "../seoData.hant";
import { Check, Copy, ArrowRight, ShieldCheck, Zap, AlertTriangle } from "lucide-react";

interface HeroProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function Hero({ currentRoute, locale = 'zh' }: HeroProps) {
  const { config } = useConfig();
  const [copied, setCopied] = useState(false);
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;

  const pageData = seoData[currentRoute] || seoData.home;

  const getSubTitle = (route: string) => {
    if (isHant) {
      switch (route) {
        case "home":
          return "歐意 OKX / 易歐 / 毆易 最新備用網址与 App 下載導航";
        case "zhuce":
          return "歐意帳號註冊与 20% 手續費減免";
        case "denglu":
          return "歐意網頁版安全登錄與備用網址";
        case "app":
          return "歐意 App (iOS / Android) 下載";
        case "diannao":
          return "歐意電腦客戶端 (Windows / Mac) 下載";
        case "anzhuangbao":
          return "歐意安卓 APK 安裝包與蘋果 iOS 下載指引";
        case "pingguo":
          return "蘋果 iOS 版 App Store 安裝與 Apple ID 切換";
        case "wangye":
          return "歐意網頁線上版直接訪問入口";
        case "anzhuo":
          return "歐意安卓 APK 原裝下載";
        case "guanwang":
          return "歐意最新安全備用網址入口";
        case "zhongwen":
          return "歐意中文介面與人民幣 (CNY) 顯示設置";
        case "xiazai":
          return "歐意 App 與電腦端下載大廳";
        default:
          return "";
      }
    }
    switch (route) {
      case "home":
        return "欧意 OKX / 易欧 / 殴易 最新备用网址与 App 下载导航";
      case "zhuce":
        return "欧意账号注册与 20% 手续费减免";
      case "denglu":
        return "欧意网页版安全登录与备用网址";
      case "app":
        return "欧意 App (iOS / Android) 下载";
      case "diannao":
        return "欧意电脑客户端 (Windows / Mac) 下载";
      case "anzhuangbao":
        return "欧意安卓 APK 安装包与苹果 iOS 下载指引";
      case "pingguo":
        return "苹果 iOS 版 App Store 安装与 Apple ID 切换";
      case "wangye":
        return "欧意网页在线版直接访问入口";
      case "anzhuo":
        return "欧意安卓 APK 原装下载";
      case "guanwang":
        return "欧意最新安全备用网址入口";
      case "zhongwen":
        return "欧意中文界面与人民币 (CNY) 显示设置";
      case "xiazai":
        return "欧意 App 与电脑端下载大厅";
      default:
        return "";
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(config.invitationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2005);
    } catch (e) {
      alert(isHant ? `邀請碼已成功複製：${config.invitationCode}` : `邀请码已成功复制：${config.invitationCode}`);
    }
  };

  return (
    <section id="hero" className="relative min-h-[82vh] flex items-center justify-center py-12 md:py-20 overflow-hidden border-b border-zinc-900 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogan and Text (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-yellow-500 font-semibold mx-auto lg:mx-0">
              <ShieldCheck size={12} />
              <span>{pageData.heroBadge}</span>
            </div>

            {/* Display Headings */}
            <div className="space-y-3.5">
              <h1 className="font-display font-extrabold text-3xl sm:text-4.5xl md:text-5.5xl text-white tracking-tight leading-tight flex flex-col items-center lg:items-start text-center lg:text-left">
                {pageData.heroTitle.includes("|") ? (
                  pageData.heroTitle.split("|").map((part, idx) => (
                    <span key={idx} className={idx > 0 ? "mt-1 sm:mt-1.5 text-zinc-100" : ""}>
                      {part.trim()}
                    </span>
                  ))
                ) : (
                  <span>{pageData.heroTitle}</span>
                )}
              </h1>
              {getSubTitle(currentRoute) && (
                <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-amber-500 bg-clip-text text-transparent tracking-wide font-sans leading-relaxed">
                  {getSubTitle(currentRoute)}
                </p>
              )}
            </div>

            {/* Paragraph / Description */}
            <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              {pageData.heroSub}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button 
                data-cta="true"
                className="w-fit flex items-center justify-center gap-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-yellow-500/10 transition active:scale-95 cursor-pointer"
              >
                <span>{isHant ? "查看訪問入口" : "查看访问入口"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Quick Registration & Security Guidance (Right 5 Columns) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl space-y-5 relative">
              
              {/* Card Ribbon */}
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                SAFE & REAL-TIME
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-white">{pageData.customIntroTitle}</h3>
                <p className="text-zinc-500 text-xs">{pageData.customIntroBody}</p>
              </div>

              {/* Steps Layout */}
              <div className="space-y-4">
                {pageData.detailedSteps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500 font-mono text-xs font-bold shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-zinc-200 text-xs font-semibold">{step.title}</h4>
                      <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Link button */}
              <div className="pt-3 border-t border-zinc-900 text-center">
                <button 
                  data-cta="true"
                  className="inline-flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-400 font-medium group cursor-pointer"
                >
                  <span>{isHant ? "查看訪問入口" : "查看访问入口"}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
