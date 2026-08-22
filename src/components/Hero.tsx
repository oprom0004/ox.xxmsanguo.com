"use client";

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
    <section id="hero" className="relative min-h-[75vh] flex items-center justify-center py-12 md:py-18 overflow-hidden bg-gradient-to-b from-[#060911] via-[#0b1120] to-[#060911]">
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
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
              
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">{pageData.customIntroTitle}</h3>
                <p className="text-zinc-400 text-xs mt-1">{pageData.customIntroBody}</p>
              </div>

              {/* 步骤列表 (无边框，采用极简自然微底) */}
              <div className="space-y-2.5">
                {(pageData.detailedSteps || []).map((step, idx) => (
                  <div key={idx} className="flex gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/15 text-blue-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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

              {/* 底部按钮 (无生硬边框) */}
              <div className="pt-1">
                <button 
                  data-cta="true"
                  className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-blue-600/20 text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
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
