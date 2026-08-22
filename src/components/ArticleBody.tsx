"use client";

import { useMemo } from "react";
import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import { 
  Clock, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, 
  Sparkles, ArrowRight, BookOpen, Layers, Terminal, Lock, Wallet, TrendingUp
} from "lucide-react";

interface ArticleBodyProps {
  currentRoute?: string;
  locale?: 'zh' | 'hant';
}

// 场景主题色与视觉识别映射
function getSceneTheme(route: string) {
  if (route.includes("pc") || route.includes("api") || route.includes("dns")) {
    return {
      category: "电脑端与量化",
      categoryHant: "電腦端與量化",
      colorName: "blue",
      badgeClass: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      accentBg: "from-blue-500/10 via-zinc-950 to-zinc-950",
      borderGlow: "border-blue-500/30",
      icon: Terminal,
      readTime: "4 分钟",
      level: "进阶实战",
      levelHant: "進階實戰"
    };
  }
  if (route.includes("c2c") || route.includes("chujin") || route.includes("dongka")) {
    return {
      category: "C2C出金防冻",
      categoryHant: "C2C出金防凍",
      colorName: "emerald",
      badgeClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      accentBg: "from-emerald-500/10 via-zinc-950 to-zinc-950",
      borderGlow: "border-emerald-500/30",
      icon: Lock,
      readTime: "5 分钟",
      level: "资金风控",
      levelHant: "資金風控"
    };
  }
  if (route.includes("heyue") || route.includes("wangge") || route.includes("matinggele") || route.includes("feilv")) {
    return {
      category: "合约与量化风控",
      categoryHant: "合約與量化風控",
      colorName: "amber",
      badgeClass: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      accentBg: "from-amber-500/10 via-zinc-950 to-zinc-950",
      borderGlow: "border-amber-500/30",
      icon: TrendingUp,
      readTime: "6 分钟",
      level: "交易技术",
      levelHant: "交易技術"
    };
  }
  if (route.includes("web3") || route.includes("zhujici") || route.includes("tibi") || route.includes("xrp")) {
    return {
      category: "Web3与链上转账",
      categoryHant: "Web3與鏈上轉賬",
      colorName: "purple",
      badgeClass: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      accentBg: "from-purple-500/10 via-zinc-950 to-zinc-950",
      borderGlow: "border-purple-500/30",
      icon: Wallet,
      readTime: "5 分钟",
      level: "链上安全",
      levelHant: "鏈上安全"
    };
  }
  // 默认安全防护与认证
  return {
    category: "账号安全与验证",
    categoryHant: "賬號安全與驗證",
    colorName: "rose",
    badgeClass: "bg-rose-500/10 border-rose-500/30 text-rose-400",
    accentBg: "from-rose-500/10 via-zinc-950 to-zinc-950",
    borderGlow: "border-rose-500/30",
    icon: ShieldAlert,
    readTime: "3 分钟",
    level: "必备技能",
    levelHant: "必備技能"
  };
}

export default function ArticleBody({ currentRoute = "guanwang", locale = 'zh' }: ArticleBodyProps) {
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;
  const pageData = seoData[currentRoute] || seoData["guanwang"];
  const prefix = isHant ? "/hant" : "";

  const theme = useMemo(() => getSceneTheme(currentRoute), [currentRoute]);
  const SceneIcon = theme.icon;

  const mistakes = useMemo(() => {
    if (currentRoute.includes("c2c") || currentRoute.includes("dongka") || currentRoute.includes("chujin")) {
      return [
        { wrong: "为贪图高汇率选择低信誉小商户", correct: "认准神盾商户（注册1年+/成单3000+/成单率98%+）" },
        { wrong: "使用房贷卡、工资卡等核心银行卡收款", correct: "使用独立专门银行卡，收到款项后静置沉淀或购买理财" },
        { wrong: "接受买家非实名或他人代付转账", correct: "严格核对付款人姓名与平台实名一致，发现代付立即原路退回" }
      ];
    }
    if (currentRoute.includes("heyue") || currentRoute.includes("wangge") || currentRoute.includes("feilv")) {
      return [
        { wrong: "满仓高杠杆全仓开仓，无视单边暴跌风险", correct: "严格采用逐仓模式，单笔最大试错亏损锁定在本金2%以内" },
        { wrong: "以盘口最新撮合成交价作为爆仓判定依据", correct: "以各大交易所现货加权标记价格（Mark Price）为强平基准" },
        { wrong: "开仓后不设止损，幻想抗单直至被动强平", correct: "下单同步录入条件止损触发价与委托价，严格执行纪律止损" }
      ];
    }
    if (currentRoute.includes("pc") || currentRoute.includes("api") || currentRoute.includes("dns")) {
      return [
        { wrong: "在第三方不可信下载站获取来历不明的安装包", correct: "认准本站原装直连通道，下载后校验 SHA256 哈希值" },
        { wrong: "为程序 API 赋予提币权限并硬编码在公开代码库中", correct: "仅开放读取与交易权限，开启 IP 白名单绑定并使用环境变量存储" },
        { wrong: "多屏窗口布局每次重启后丢失需要重新排布", correct: "在客户端顶部菜单开启【多窗口布局记忆】与 GPU 硬件加速" }
      ];
    }
    if (currentRoute.includes("web3") || currentRoute.includes("zhujici") || currentRoute.includes("tibi")) {
      return [
        { wrong: "将 12 位助记词截屏保存在手机相册或云盘中", correct: "使用纸笔实体手抄并离线分片保管，绝不联网输入" },
        { wrong: "向未经审计的不知名 DApp 盲目签署无限额度授权", correct: "定期使用 Revoke 工具检查并撤销闲置的智能合约代币授权" },
        { wrong: "充值 XRP/TON/EOS 等代币时漏填 Memo/Tag 标签", correct: "严格完整填写充值地址与数字 Memo 标签，先小额试充再大额转账" }
      ];
    }
    return [
      { wrong: "开启 2FA 谷歌验证器时未手抄备份 16 位秘钥", correct: "离线物理备份 16 位初始秘钥，手机丢失时可秒级直接还原" },
      { wrong: "轻信陌生短信通知关于‘账户清退/提币至安全账户’", correct: "核对账户安全中心设置的防钓鱼码，非同名正版短信直接拉黑" },
      { wrong: "在公共不安全 Wi-Fi 下直接明文输入密码与验证码", correct: "绑定 Passkey FIDO2 生物硬件认证，彻底免疫任何钓鱼劫持" }
    ];
  }, [currentRoute]);

  const steps = pageData.detailedSteps || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. 文档头部元信息 (Doc Metadata Header) */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${theme.accentBg} border ${theme.borderGlow} shadow-2xl relative overflow-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold font-mono ${theme.badgeClass}`}>
              <SceneIcon className="w-3.5 h-3.5" />
              <span>{isHant ? theme.categoryHant : theme.category}</span>
            </span>
            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>{isHant ? `預計閱讀 ${theme.readTime}` : `预计阅读 ${theme.readTime}`}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
              {isHant ? theme.levelHant : theme.level}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
              2026 最新版
            </span>
          </div>
        </div>

        {/* 核心导读摘要 */}
        <div className="pt-6 space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-zinc-400" />
            <span>{isHant ? "實操核心要點概覽" : "实操核心要点概览"}</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {pageData.description}
          </p>
        </div>
      </div>

      {/* 2. 避坑对照表 (❌ 常见误区 vs ✅ 规范操作) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-bold text-white">
            {isHant ? "常見操作踩坑對比與避險守則" : "常见操作踩坑对比与避险守则"}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {mistakes.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-red-300/90 bg-red-950/20 border border-red-900/30 p-3 rounded-xl">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-red-400 block mb-0.5">{isHant ? "高危誤區" : "高危误区"}：</span>
                  <span>{item.wrong}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-300/90 bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-400 block mb-0.5">{isHant ? "標準規範" : "标准规范"}：</span>
                  <span>{item.correct}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 垂直实操流程时间轴 (Step-by-Step Vertical Timeline) */}
      {steps.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-zinc-400" />
            <h3 className="text-lg font-bold text-white">
              {isHant ? "標準化實戰排錯與操作流程" : "标准化实战排错与操作流程"}
            </h3>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-zinc-800">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 p-5 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-900 transition-colors">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-200 font-mono font-bold text-xs flex items-center justify-center shrink-0 z-10">
                  {step.step || idx + 1}
                </div>
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm sm:text-base font-bold text-zinc-100">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 20% 返佣新手注册福利 Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold font-mono">
            <Sparkles className="w-4 h-4" />
            <span>{isHant ? "專屬交易費率特權" : "专属交易费率特权"}</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {isHant ? "使用邀請碼 ACE528829 開戶享 20% 手續費終身返還" : "使用邀请码 ACE528829 开户享 20% 手续费终身返还"}
          </h4>
          <p className="text-xs text-zinc-400">
            {isHant ? "每日自動原路結算至資金賬戶，現貨與合約交易均可持續抵扣。" : "每日自动原路结算至资金账户，现货与合约交易均可持续抵扣。"}
          </p>
        </div>

        <Link
          href={`${prefix}/zhuce/`}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
        >
          <span>{isHant ? "立即開通返傭賬戶" : "立即开通返佣账户"}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
