"use client";

import { useState } from "react";
import { useConfig } from "../context/ConfigContext";
import { ChevronRight, Award } from "lucide-react";

interface TutorialSectionProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function TutorialSection({ currentRoute, locale = 'zh' }: TutorialSectionProps) {
  const { config } = useConfig();
  const [copiedCode, setCopiedCode] = useState(false);
  const isHant = locale === 'hant';

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(config.invitationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (e) {
      alert(isHant ? `邀請碼已成功複製：${config.invitationCode}` : `邀请码已成功复制：${config.invitationCode}`);
    }
  };

  return (
    <section id="tutorial" className="py-16 md:py-24 bg-[#0f1216]/50 text-zinc-300 border-b border-zinc-900 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-semibold font-mono">
            <Award size={13} className="text-yellow-500 animate-pulse" />
            <span>{isHant ? "合規新手防騙註冊指南" : "合规新手防骗注册指南"}</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3.5xl text-white tracking-tight leading-normal">
            {isHant ? "正確註冊歐易帳戶詳細圖文教程" : "正确注册欧易账户详细图文教程"}
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
            {isHant 
              ? "為了防範網絡解析异常、短信驗證碼延遲以及虛假釣魚軟件，請仔細閱讀以下三個合規註冊與安全步驟。"
              : "为了防范网络解析异常、短信验证码延迟以及虚假钓鱼软件，请仔细阅读以下三个合规注册与安全步骤。"}
          </p>
        </div>

        {/* 3 Step Bento Cards layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Channel selection */}
          <div className="bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-5 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">STEP 01</span>
                <span className="text-[11px] font-mono text-zinc-600">PREPARATION</span>
              </div>
              <h3 className="font-display font-extrabold text-white text-base">
                {isHant ? "安全連接與註冊通道開啟" : "安全连接与注册通道开启"}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                {isHant 
                  ? "點擊頁面頂部的“查看訪問入口”按鈕，可查看本站整理的第三方訪問入口。"
                  : "点击页面顶部的“查看访问入口”按钮，可查看本站整理的第三方访问入口。"}
              </p>
              <ul className="text-[11px] text-zinc-500 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                <li>{isHant ? "支持全球智能線路分發" : "支持全球智能线路分发"}</li>
                <li>{isHant ? "自動適配當前最佳延遲核心線路" : "自动适配当前最佳延迟核心线路"}</li>
                <li>{isHant ? "採用256位端到端SSL通信證書保護" : "采用256位端到端SSL通信证书保护"}</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-zinc-900/60">
              <button 
                data-cta="true"
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 select-none cursor-pointer"
              >
                <span>{isHant ? "查看訪問入口" : "查看访问入口"}</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Card 2: Fill Form & fee discounts */}
          <div className="bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-3.5 right-0 bg-yellow-500 text-black font-mono font-bold text-[8px] px-3.5 py-0.5 rotate-45 translate-x-3 translate-y-0.5 select-none shadow">
              20% RAKEBACK
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">STEP 02</span>
                <span className="text-[11px] font-mono text-zinc-650">VERIFICATION</span>
              </div>
              <h3 className="font-display font-extrabold text-white text-base">
                {isHant ? "選擇郵箱註冊與確認費率折扣" : "选择邮箱注册与确认费率折扣"}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                {isHant 
                  ? <>切換至<strong>“郵箱註冊”</strong>（推薦使用QQ、網易或Outlook/Gmail，接收驗證碼成功率最高）。輸入郵箱並設置密碼。</>
                  : <>切换至<strong>“邮箱注册”</strong>（推荐使用QQ、网易或Outlook/Gmail，接收验证码成功率最高）。输入邮箱并设置密码。</>}
              </p>
              <ul className="text-[11px] text-zinc-500 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                <li>{isHant ? "註冊推薦碼位置將自動綁定費率優惠" : "注册推荐码位置将自动绑定费率优惠"}</li>
                <li>{isHant ? "享受終身20%交易手續費全自動返現" : "享受终身20%交易手续费全自动返现"}</li>
                <li>{isHant ? "每日凌晨結轉，以USDT原路退回" : "每日凌晨结转，以USDT原路打回"}</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-zinc-900/60 flex items-center justify-between gap-3">
              <div className="text-left shrink-0">
                <span className="block text-[9px] text-zinc-500 font-semibold uppercase">{isHant ? "推薦優惠代碼" : "推荐优惠代码"}</span>
                <span className="block text-zinc-200 font-mono font-bold text-xs">{config.invitationCode}</span>
              </div>
              <button 
                onClick={copyCode}
                className="py-2.5 px-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl text-[11px] font-bold transition flex items-center gap-1 select-none shrink-0 cursor-pointer"
              >
                <span>{copiedCode ? (isHant ? "已複製" : "已复制") : (isHant ? "複製驗證" : "复制验证")}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Final KYC Security verification */}
          <div className="bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-6 md:p-8 space-y-5 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">STEP 03</span>
                <span className="text-[11px] font-mono text-zinc-650">COMPLIANCE</span>
              </div>
              <h3 className="font-display font-extrabold text-white text-base">
                {isHant ? "完成基礎身份核驗及兩步防盜" : "完成基础身份核验及两步防盗"}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                {isHant 
                  ? "註冊成功後，請根據合規安全規定，優先使用身份證進行極速人臉防偽校驗。"
                  : "注册成功后，请根据合规安全规定，优先使用身份证进行极速人脸防伪校验。"}
              </p>
              <ul className="text-[11px] text-zinc-500 space-y-1.5 list-disc list-inside leading-relaxed pl-1">
                <li>{isHant ? "Lv.1基礎核驗僅需填寫個人基本身份" : "Lv.1基础核验仅需填写个人基本身份"}</li>
                <li>{isHant ? "Lv.2高級人臉掃描，徹底加固資金防盜" : "Lv.2高级人脸扫描，彻底加固资金防盗"}</li>
                <li>{isHant ? "設置獨特的【防釣魚碼】並開啟谷歌驗證器" : "设置独特的【防钓鱼码】并开启谷歌验证器"}</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
