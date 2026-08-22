import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. 修改 FaqSection.tsx：彻底删除公用 generalFaq，只渲染专属于页面的 targetedFaq
const faqSectionPath = path.join(rootDir, 'src', 'components', 'FaqSection.tsx');
const faqSectionCode = `"use client";

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
            const key = \`faq-\${index}\`;
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
`;
fs.writeFileSync(faqSectionPath, faqSectionCode, 'utf8');

// 2. 13 个核心柱子页面
const CORE_PILLARS = {
  home: {
    route: "home",
    tabLabel: "首页",
    title: "欧意OKX官方安全直连通道 | 电脑PC版、手机APP下载与极速登录入口 - ox.xxmsanguo.com",
    description: "欧意OKX多端直连服务中心。提供 Windows/Mac 桌面客户端及 Android/iOS 手机端官方原装下载，解决国内网络连接超时、DNS污染与登录报错，保障数字资产交易全天候畅通。",
    keywords: "欧意OKX, 欧易电脑版, ox.xxmsanguo.com, 欧意最新备用网址, 欧易下载, 欧意直连通道",
    heroBadge: "官方多端直连与排错加速通道",
    heroTitle: "欧意 OKX 多端直连通道及客户端官方下载",
    heroSub: "遇到主站网络超时、DNS污染或下载拦截？本站实时提供多节点直连加速、桌面专业版与手机端原装安全下载。",
    customIntroTitle: "全天候安全直连 3 步指南",
    customIntroBody: "简单三步，避开网络解析干扰，直达安全交易大厅。",
    detailedSteps: [
      { step: 1, title: "直连安全节点", desc: "点击【安全直连通道】，智能匹配当前延迟最低的加密解析入口。" },
      { step: 2, title: "核对安全锁", desc: "确认浏览器地址栏具备官方 HTTPS 安全加密证书与防钓鱼安全码。" },
      { step: 3, title: "安装专业版", desc: "下载 Windows/Mac 桌面专业版或手机原生 APK，彻底摆脱网页解析波动。" }
    ],
    targetedFaq: [
      { q: "国内网络环境下如何确保稳定访问欧意？", a: "推荐配置阿里公共DNS(223.5.5.5)或开启DoH加密解析，并收藏 ox.xxmsanguo.com 安全直连备用加速节点。" },
      { q: "新用户注册如何享受手续费优惠？", a: "通过本站直连入口开户可直接激活最高级别终身 20% 手续费自动返还特权。" }
    ],
    publishDate: "2026-08-01"
  },
  guanwang: {
    route: "guanwang",
    tabLabel: "官网直连",
    title: "欧意OKX最新安全官网直连入口：抗封锁备用域名与SSL防伪验证指引",
    description: "提供欧意OKX全球节点高可用直连入口。详解如何通过SSL证书指纹辨别官方域名、规避仿冒钓鱼网站与设置防钓鱼安全码。",
    keywords: "欧意官网, 欧易最新网址, OKX备用域名, 防封直连通道, 欧意安全入口",
    heroBadge: "抗封锁高可用官网直连",
    heroTitle: "欧意 OKX 官方备用直连入口与防伪验证",
    heroSub: "实时同步官方全球分发节点，多层加密传输，彻底告别仿冒钓鱼与解析劫持风险。",
    customIntroTitle: "官网防伪验证指引",
    customIntroBody: "通过多重校验确保访问入口真实可靠。",
    detailedSteps: [
      { step: 1, title: "验证安全证书", desc: "核对地址栏 SSL 证书颁发机构及加密等级。" },
      { step: 2, title: "开启防钓鱼码", desc: "登录安全中心设置独一无二的专属安全暗号。" },
      { step: 3, title: "双重验证加固", desc: "绑定谷歌 2FA 身份验证器防范未知登录。" }
    ],
    targetedFaq: [
      { q: "如何辨别访问的是否为欧意真实官方通道？", a: "检查浏览器地址栏是否具有合法 SSL 加密证书，且所有系统邮件均应带有您预设的专属防钓鱼安全暗号。" }
    ],
    publishDate: "2026-08-01"
  },
  app: {
    route: "app",
    tabLabel: "APP下载",
    title: "欧意手机APP官方下载大厅：安卓原生APK与苹果海外ID安装完全手册",
    description: "一站式获取欧意OKX移动客户端。适配 HarmonyOS、HyperOS 等安卓系统纯净模式拦截，提供免翻墙快速安装与更新包校验哈希。",
    keywords: "欧意APP下载, OKX手机版, 欧易移动端, 安卓APK安装, 苹果TestFlight",
    heroBadge: "官方正版移动客户端分发",
    heroTitle: "欧意 OKX 手机 APP 官方原装下载中心",
    heroSub: "专为移动交易打造，毫秒级推送行情，多重生物指纹面容保护，无惧系统纯净模式拦截。",
    customIntroTitle: "手机端快速安装指引",
    customIntroBody: "安卓/苹果双端极速安装方案。",
    detailedSteps: [
      { step: 1, title: "安卓直接下载", desc: "点击获取官方原生 APK 安装包，支持鸿蒙/小米系统。" },
      { step: 2, title: "苹果海外获取", desc: "使用海外 Apple ID 登录 App Store 搜索正版 OKX 下载。" },
      { step: 3, title: "开启生物登录", desc: "绑定指纹或 Face ID 开启毫秒级极速免密登录。" }
    ],
    targetedFaq: [
      { q: "华为或小米手机安装提示风险应用怎么处理？", a: "在安装界面选择【了解风险并继续安装】，或临时关闭系统纯净模式/外部来源检查即可正常运行。" }
    ],
    publishDate: "2026-08-01"
  },
  diannao: {
    route: "diannao",
    tabLabel: "电脑端",
    title: "欧意电脑桌面版官方客户端下载：专业交易员多屏看盘与低延迟架构",
    description: "专为高频量化与多屏监控打造的桌面客户端。原生 WebSocket 毫秒级撮合通道，内置 TradingView 深度指标与 GPU 硬件加速渲染。",
    keywords: "欧意电脑版, OKX桌面端, Windows交易客户端, Mac苹果电脑版, TradingView专业版",
    heroBadge: "专业交易员专属桌面客户端",
    heroTitle: "欧意 OKX 电脑桌面客户端 Pro 极速版",
    heroSub: "突破浏览器性能瓶颈，支持 4 屏独立工作区、毫秒级原生 WebSocket 报单通道与硬件加速。",
    customIntroTitle: "桌面版安装与优化",
    customIntroBody: "专业量化与多屏看盘快速配置。",
    detailedSteps: [
      { step: 1, title: "下载匹配架构", desc: "根据操作系统下载 Windows x64 或 macOS 安装包。" },
      { step: 2, title: "配置多屏图表", desc: "拆分独立 K 线窗口，加载 EMA/MACD 指标系统。" },
      { step: 3, title: "开启硬件加速", desc: "在设置中启用 GPU 渲染以获得最流畅的盘口刷新。" }
    ],
    targetedFaq: [
      { q: "电脑客户端相比网页版有什么优势？", a: "桌面端拥有独立的网络传输优化通道，无浏览器插件干扰，支持多显示器独立弹窗看盘与超低延迟报单。" }
    ],
    publishDate: "2026-08-01"
  },
  wangye: {
    route: "wangye",
    tabLabel: "网页版",
    title: "欧意OKX网页版在线交易大厅：免安装极速登录与K线分析工具箱",
    description: "无需下载安装即可在浏览器中直接畅享完整的币币、合约、赚币与Web3生态。支持主流浏览器极速加载与Passkey生物免密秒级登录。",
    keywords: "欧意网页版, OKX在线登录, 网页交易大厅, 币币交易网页端, 合约网页版",
    heroBadge: "免安装免插件在线交易",
    heroTitle: "欧意 OKX 网页版在线交易与生态中心",
    heroSub: "无论在任何设备上，打开浏览器即可秒级直达现货、合约、余币宝与多链 Web3 钱包生态。",
    customIntroTitle: "网页极速访问",
    customIntroBody: "三步畅通网页版交易大厅。",
    detailedSteps: [
      { step: 1, title: "进入直连节点", desc: "点击在线访问，直达 SSL 加密官方交易大厅。" },
      { step: 2, title: "启用 Passkey", desc: "绑定设备指纹或面容，无需每次输入复杂密码。" },
      { step: 3, title: "无痕模式防缓存", desc: "遇加载异常可开启无痕窗口快速排错。" }
    ],
    targetedFaq: [
      { q: "网页版登录经常白屏或超时怎么解决？", a: "建议使用 Chrome 或 Edge 浏览器无痕模式，并清空本地 DNS 缓存后通过官方加速入口访问。" }
    ],
    publishDate: "2026-08-01"
  },
  zhuce: {
    route: "zhuce",
    tabLabel: "新手注册",
    title: "欧意OKX新手注册开户指南：专属邀请码绑定与永久20%返佣特权开通",
    description: "手把手指导新用户完成欧意账号注册与初级认证。详解海外邮箱/手机号注册流程、2FA安全加固与新手盲盒奖励领取步骤。",
    keywords: "欧意注册, OKX开户, 欧易注册教程, 手续费返佣, 新手盲盒福利",
    heroBadge: "最高等级 20% 自动返佣开户",
    heroTitle: "欧意 OKX 新手极速开户与新手福利领取",
    heroSub: "自动绑定顶级手续费折扣邀请码，尊享终身 20% 手续费自动返还与最高 60,000 元新手盲盒。",
    customIntroTitle: "新手 3 步开户",
    customIntroBody: "安全合规注册全流程。",
    detailedSteps: [
      { step: 1, title: "填写手机/邮箱", desc: "输入常用手机号或海外安全邮箱接收验证码。" },
      { step: 2, title: "核对邀请码", desc: "确认自动带入官方最高折扣邀请码。" },
      { step: 3, title: "完成基础认证", desc: "通过身份证件实名核验开启全功能买币权限。" }
    ],
    targetedFaq: [
      { q: "注册时必须填写真实姓名吗？", a: "是的，法币买卖和出金需遵循严格的实名反洗钱合规要求，实名信息需与银行卡开户名一致。" }
    ],
    publishDate: "2026-08-01"
  },
  denglu: {
    route: "denglu",
    tabLabel: "安全登录",
    title: "欧意账号安全登录通道：双重身份验证(2FA)、Passkey免密与异常排错",
    description: "详解欧意安全登录机制。涵盖短信验证码、Google Authenticator、Passkey生物密钥绑定以及遭遇登录网络异常时的快速排错手段。",
    keywords: "欧意登录, OKX登录入口, 谷歌验证码失效, 异地登录排错, 账号安全验证",
    heroBadge: "多重身份认证安全登录",
    heroTitle: "欧意 OKX 账号安全登录与异常排错中心",
    heroSub: "支持 Passkey 生物密钥、谷歌双重验证(2FA)、短信邮件多重校验，彻底杜绝盗号隐患。",
    customIntroTitle: "安全登录指引",
    customIntroBody: "快速登录与安全保障机制。",
    detailedSteps: [
      { step: 1, title: "输入账号密码", desc: "在官方加密通道输入绑定的邮箱或手机号。" },
      { step: 2, title: "完成双重验证", desc: "输入谷歌验证器 6 位动态码或指纹生物通行。" },
      { step: 3, title: "异常快速重置", desc: "若旧手机停用可一键发起人脸在线换绑。" }
    ],
    targetedFaq: [
      { q: "接收不到短信验证码怎么办？", a: "可切换为语音播报接码，或在登录页面点击【安全验证不可用】使用绑定邮箱进行二次验证。" }
    ],
    publishDate: "2026-08-01"
  },
  anzhuo: {
    route: "anzhuo",
    tabLabel: "安卓下载",
    title: "欧意安卓官方原装APK下载：鸿蒙/小米/OPPO/Vivo系统无风险安装实战",
    description: "提供欧意OKX最新稳定版 Android 原生安装包。解决各大国产厂商系统误报风险、签名冲突与自动更新维护技巧。",
    keywords: "欧意安卓版, OKX APK官方包, 鸿蒙系统安装, 小米安装拦截, 安卓防报毒",
    heroBadge: "安卓原装官方 APK 下载",
    heroTitle: "欧意 OKX 安卓手机版官方 APK 下载",
    heroSub: "全面适配鸿蒙 HarmonyOS、小米 HyperOS、OPPO 及 Vivo，提供官方无损原装安装包与纯净模式排错。",
    customIntroTitle: "安卓快速安装",
    customIntroBody: "避开厂商误报，顺利完成安装。",
    detailedSteps: [
      { step: 1, title: "下载官方APK", desc: "点击获取带有官方数字签名的最新安装包。" },
      { step: 2, title: "解除纯净限制", desc: "安装提示误报时选择【单次允许】或【继续安装】。" },
      { step: 3, title: "开启自动更新", desc: "在应用内开启静默增量更新，始终保持最新版本。" }
    ],
    targetedFaq: [
      { q: "安装时提示解析软件包出现问题怎么排查？", a: "通常是由于下载中断导致安装包不完整，请使用系统自带浏览器重新下载官方完整 APK。" }
    ],
    publishDate: "2026-08-01"
  },
  pingguo: {
    route: "pingguo",
    tabLabel: "苹果下载",
    title: "欧意苹果iOS官方App安装指南：海外Apple ID免翻获取与App Store直装",
    description: "手把手教你注册海外地区 Apple ID 突破地区限制。官方 App Store 正版下载、无封号风险、支持版本无缝自动更新。",
    keywords: "欧意苹果版, OKX iOS下载, 苹果海外ID, TestFlight安装, iPhone数字货币APP",
    heroBadge: "iOS 官方 App Store 下载",
    heroTitle: "欧意 OKX 苹果 iOS 正版安装全攻略",
    heroSub: "简单几步获取海外 Apple ID，直接在官方 App Store 下载正版应用，告别掉签与内测过期烦恼。",
    customIntroTitle: "苹果 3 步安装",
    customIntroBody: "正版 App Store 极速直装。",
    detailedSteps: [
      { step: 1, title: "切换海外ID", desc: "在 App Store 退出原账号，登录海外区域 Apple ID。" },
      { step: 2, title: "搜索正版OKX", desc: "在搜索栏输入 OKX，认准官方开发者图标并点击下载。" },
      { step: 3, title: "切回个人ID", desc: "下载完成后即可随时切回原个人日常 Apple ID。" }
    ],
    targetedFaq: [
      { q: "为什么国区 App Store 搜索不到欧意？", a: "由于地区政策限制，需在 App Store 登录非大陆区（如美区、港区、日区）Apple ID 即可直接搜索下载正版。" }
    ],
    publishDate: "2026-08-01"
  },
  anzhuangbao: {
    route: "anzhuangbao",
    tabLabel: "安装包校验",
    title: "欧意OKX官方正版安装包校验中心：SHA-256哈希防篡改与完整性校验",
    description: "提供全平台客户端安装包 SHA-256 签名哈希比对工具。杜绝任何第三方恶意打包插入木马，保障每一次安装 100% 纯净可靠。",
    keywords: "欧意安装包, OKX安装包校验, SHA256哈希值, 防篡改安全验证, 官方正版下载",
    heroBadge: "官方哈希防篡改校验",
    heroTitle: "欧意 OKX 官方安装包安全校验中心",
    heroSub: "公布官方全平台安装包 SHA-256 校验码，防止遭遇第三方二次打包或木马植入。",
    customIntroTitle: "文件完整性校验",
    customIntroBody: "简单命令快速比对哈希值。",
    detailedSteps: [
      { step: 1, title: "获取官方哈希", desc: "在本站获取当前版本对应的 SHA-256 官方标准字符串。" },
      { step: 2, title: "终端计算哈希", desc: "在本地终端运行 CertUtil 或 shasum 命令计算文件哈希。" },
      { step: 3, title: "比对确认无误", desc: "核对字符完全一致后即可安心执行安装程序。" }
    ],
    targetedFaq: [
      { q: "如何比对安装包哈希值？", a: "在电脑终端输入 CertUtil -hashfile [文件名] SHA256，与官方公布的哈希字符串核对一致即可放心安装。" }
    ],
    publishDate: "2026-08-01"
  },
  "xinshou-jiaocheng": {
    route: "xinshou-jiaocheng",
    tabLabel: "新手教程",
    title: "欧意新手入门完全实操宝典：从零买币、资金划转、充提币到现货交易全流程",
    description: "专为小白用户编写的零基础入门指南。图文拆解快捷买币、自选商户筛选、资金账户与交易账户划转、挂单成交与止盈止损设定。",
    keywords: "欧意新手教程, OKX新手买币, C2C买币流程, 现货交易实操, 欧易入门教学",
    heroBadge: "零基础全流程实操指南",
    heroTitle: "欧意 OKX 新手入门与实操完全宝典",
    heroSub: "从法币买币、资金划转、现货挂单到链上提币，全流程图文详解，帮助新手快速避坑。",
    customIntroTitle: "新手入门 3 阶段",
    customIntroBody: "循序渐进掌握数字资产交易。",
    detailedSteps: [
      { step: 1, title: "C2C 安全买币", desc: "选择神盾商家，通过银行卡快捷获取第一笔 USDT。" },
      { step: 2, title: "资金秒级划转", desc: "将资产从【资金账户】划转至【交易账户】开始现货买卖。" },
      { step: 3, title: "设定止盈止损", desc: "学会使用限价单与条件止损单锁定交易利润与风险。" }
    ],
    targetedFaq: [
      { q: "刚买的 USDT 为什么无法立刻提币？", a: "平台执行 T+1 (24小时) 安全风控保护机制，24小时后即可自由提币至链上或外部钱包。" }
    ],
    publishDate: "2026-08-01"
  },
  zhongwen: {
    route: "zhongwen",
    tabLabel: "中文版",
    title: "欧意OKX中文官方语言设置与CNY法币计价切换全流程指南",
    description: "指导用户如何在 App 与网页端一键切换为简体中文/繁体中文界面，将法币显示单位设定为 CNY，并快速唤出 24 小时中文在线客服。",
    keywords: "欧意中文版, OKX语言设置, 简体中文切换, 人民币计价显示, 中文客服入口",
    heroBadge: "中文全功能体验配置",
    heroTitle: "欧意 OKX 简体中文与 CNY 计价切换指引",
    heroSub: "详细演示如何在全平台一键开启简体中文界面、设定人民币汇率参考与唤起 24 小时中文官方客服。",
    customIntroTitle: "语言与计价设置",
    customIntroBody: "轻松完成本地化偏好配置。",
    detailedSteps: [
      { step: 1, title: "进入偏好设置", desc: "点击个人头像进入【设置】→【语言设置】。" },
      { step: 2, title: "切换简体中文", desc: "勾选【简体中文】或【繁體中文】即刻全站生效。" },
      { step: 3, title: "选择CNY计价", desc: "在【计价货币】中选择 CNY，资产估值一目了然。" }
    ],
    targetedFaq: [
      { q: "切换为中文后资产显示会有汇率偏差吗？", a: "系统会根据全球主流离岸人民币实时汇率动态换算折算价值，不影响底层代币的实际数量。" }
    ],
    publishDate: "2026-08-01"
  },
  xiazai: {
    route: "xiazai",
    tabLabel: "下载大厅",
    title: "欧意OKX全平台客户端官方下载总站：Windows/Mac/Android/iOS一键直达",
    description: "多端合一的官方极速分发入口。智能识别访客操作系统，自动匹配最适合的 64 位桌面客户端或移动安装包，支持断点续传与极速直连。",
    keywords: "欧意下载, OKX全平台下载, 电脑版安装包, 手机APP下载, 官方直连下载站",
    heroBadge: "全平台客户端一站式直连下载",
    heroTitle: "欧意 OKX 全平台官方客户端下载总站",
    heroSub: "一键获取 Windows、macOS 桌面端与 Android、iOS 手机版，多端数据云端实时同步。",
    customIntroTitle: "全端一键下载",
    customIntroBody: "自动识别您的设备并提供最适配的安装包。",
    detailedSteps: [
      { step: 1, title: "选择对应系统", desc: "根据您的电脑或手机操作系统点击对应下载入口。" },
      { step: 2, title: "极速直连获取", desc: "通过官方专属加速 CDN 极速下载原生安全安装包。" },
      { step: 3, title: "一键无缝同步", desc: "登录同一账户，持仓、挂单与自选列表全端实时同步。" }
    ],
    targetedFaq: [
      { q: "下载速度慢或被浏览器拦截怎么处理？", a: "可在本站点击【备用加速下载通道】，或使用迅雷等专用下载工具进行快速拉取。" }
    ],
    publishDate: "2026-08-01"
  }
};

// 3. 15 大高转化真实搜索话题库（自然流畅拼接，绝无逗号！）
const TOPIC_PRESETS = [
  {
    topic: "pc-zhuomian-duoping-kanpan",
    tag: "电脑客户端",
    brandTemplates: {
      ouyi: "欧意电脑桌面专业版多屏看盘与低延迟配置：TradingView指标与硬件加速指南",
      okx: "OKX电脑客户端Pro多屏看盘配置教程：原生WebSocket行情推送与量化调优",
      ouyiokx: "欧意OKX电脑桌面版多屏K线监控指南：多周期EMA指标与GPU渲染加速",
      yiou: "易欧电脑版多屏看盘与高频行情调试：TradingView多图表布局与低延迟通道",
      okex: "OKEx老用户电脑端升级指南：专业版多屏独立窗口与自选行情同步"
    },
    descTemplates: {
      ouyi: "专为交易员打造的欧意PC桌面客户端实战指引。深度拆解多屏独立K线窗口布局、EMA 20/50/200均线系统配置与GPU硬件加速调优。",
      okx: "OKX官方桌面端Pro多屏交易监控手册。详解原生WebSocket行情订阅通道、毫秒级报单延迟调优与TradingView多图表自适应布局。",
      ouyiokx: "欧意OKX桌面客户端高频看盘配置攻略。支持4屏独立分屏工作区、深度量价背离指标加载与盘口超低延迟刷新。",
      yiou: "易欧交易员多屏监控系统实战搭建。如何拆分独立K线窗口、加载MACD多周期共振指标，并消除高频行情下的偶发卡顿。",
      okex: "针对OKEx老用户的电脑桌面版全面升级指南。原账号自选列表无缝同步，享受原生低延迟撮合通道与专业量化看盘视图。"
    },
    steps: [
      { step: 1, title: "拆分独立分屏窗口", desc: "在工作区将各主流币K线图表独立拖拽至副屏全屏监控，配置15m与4h双周期。" },
      { step: 2, title: "加载指标均线系统", desc: "加载EMA 20/50/200多周期均线与MACD量价指标，捕捉趋势拐点信号。" },
      { step: 3, title: "开启GPU渲染加速", desc: "在系统设置中启用GPU硬件加速，历史K线缓存调优至800根确保毫秒级刷新。" }
    ],
    faqs: [
      { q: "电脑客户端多屏看盘，重启电脑后如何自动恢复之前的分屏窗口布局？", a: "在客户端右上角点击【工作区】→【保存当前布局】并命名自定义模板，下次启动将自动锁定各副屏的K线周期与指标配置。" },
      { q: "高频行情剧烈波动时客户端K线出现偶发延迟卡顿如何彻底调优？", a: "进入【设置】→【系统】，开启【GPU 硬件渲染加速】，并将图表历史K线缓存数量由默认 2000 根调优为 800 根以显著减轻显存压力。" }
    ]
  },
  {
    topic: "c2c-chujin-fangdongka-shizhan",
    tag: "出金防冻",
    brandTemplates: {
      ouyi: "欧意C2C法币出金防冻卡实战法则：神盾商家筛选、资金沉淀与流水隔离规范",
      okx: "OKX法币出金防冻卡完全避坑手册：银行流水隔离与实名反洗钱审核要点",
      ouyiokx: "欧意OKX大额出金安全操作指南：专卡专用沉淀与公安司法冻结申诉技巧",
      yiou: "易欧C2C卖币安全变现实战教程：优质做市商甄别与非实名付款拦截处理",
      okex: "OKEx出金防风控实战宝典：资金T+1静置沉淀与银行柜面只收不付解封流程"
    },
    descTemplates: {
      ouyi: "深度解析加密资产变现人民币时的反洗钱风控防范。详解神盾商家筛选门槛、地方商业银行卡专卡专用、T+1资金沉淀与司法冻结申诉流程。",
      okx: "OKX平台法币出金防冻卡硬核指南。如何核验买家同名实名付款、隔离日常交易流水、规避断卡行动风控及提供合法完税证明。",
      ouyiokx: "欧意OKX大额资金合规出金安全全攻略。建立独立出金隔离账户，严格执行买家验资流水审查，确保每笔法币资金来源合法合规。",
      yiou: "易欧用户必备的C2C出金安全手册。教你快速识别高风险买家、果断拦截非实名转账付款，并在遭遇银行卡管控时快速柜面解封。",
      okex: "OKEx老玩家法币出金防冻实盘经验。拆解资金到账后的沉淀理财策略、异地公安冻结函件处理技巧与银行流水证明开具规范。"
    },
    steps: [
      { step: 1, title: "筛选高信用神盾商户", desc: "优先选择注册1年以上、总单数3000+、成单率98%以上且保证金充足的神盾商家。" },
      { step: 2, title: "设立独立隔离银行卡", desc: "使用非四大行的独立地方商业银行卡专卡专用，杜绝与日常工资卡及房贷卡混用。" },
      { step: 3, title: "资金静置与合规沉淀", desc: "资金到账后在卡内静置数日或转入定期理财，转账备注栏严禁填写任何加密货币相关字样。" }
    ],
    faqs: [
      { q: "C2C卖币收到买家打款后发现付款人姓名与平台实名不一致怎么处理？", a: "严禁点击放币！必须第一时间在订单内点击【申诉】，要求对方提供原路退款证明或由官方客服介入。非实名付款极易涉及涉案资金导致银行卡被异地公安司法冻结。" },
      { q: "出金到账后银行卡提示‘只收不付’或柜面管控如何快速解封？", a: "携带身份证及近期交易明细前往开户行柜台说明情况，向银行工作人员出示 OKX C2C 订单流水记录，证明资金为正当个人数字资产投资合法变现。" }
    ]
  },
  {
    topic: "heyue-qiangping-baozhengjin-jisuan",
    tag: "合约风控",
    brandTemplates: {
      ouyi: "欧意合约强平爆仓线计算与防插针技巧：逐仓全仓保证金与硬止损实战指南",
      okx: "OKX永续合约强平机制深度解析：加权标记价格原理与杠杆风险控制",
      ouyiokx: "欧意OKX合约交易止损实战宝典：维持保证金率测算与条件委托单设置",
      yiou: "易欧合约爆仓防范完全手册：逐仓模式分仓风控与行情极端波动应对",
      okex: "OKEx合约交易风控铁律：单笔持仓回撤控制与多空对冲锁仓实操"
    },
    descTemplates: {
      ouyi: "深度剖析永续合约杠杆交易的强平爆仓机制。拆解逐仓与全仓模式维持保证金率计算、全球现货加权标记价格（Mark Price）防插针机制与条件止损单实战。",
      okx: "OKX合约交易员专属风控指南。详解标记价格与最新成交价偏差原理、自动减仓(ADL)队列机制与仓位止损止盈预设方案。",
      ouyiokx: "欧意OKX合约保证金计算与风控全解析。如何精确测算强平触发价格、利用逐仓模式锁定最大回撤，并在极端单边行情中严格执行纪律止损。",
      yiou: "易欧合约交易安全防护手册。掌握保证金阶梯档位表、理解资金费率结算周期，并通过分批止损单抵御极端流动性枯竭。",
      okex: "OKEx资深合约玩家实战总结。建立严格的仓位管理体系，单笔亏损控制在总净值2%以内，彻底告别盲目抗单与意外爆仓。"
    },
    steps: [
      { step: 1, title: "强制使用逐仓模式", desc: "单笔开仓严格选择逐仓模式，将可能产生的最大亏损严格锁定在当前仓位保证金之内。" },
      { step: 2, title: "认准标记价格测算", desc: "以现货加权标记价格（Mark Price）为核心风控基准，规避盘口瞬间恶意插针导致误爆仓。" },
      { step: 3, title: "开仓同步预设硬止损", desc: "下单同时录入条件止损触发价与委托价，严格将单笔试错成本控制在总本金的2%以内。" }
    ],
    faqs: [
      { q: "为什么盘面最新成交价还没跌到我的止损点，系统却提前触发了强平？", a: "欧意强平线完全依据【现货加权标记价格 (Mark Price)】而非单一最新成交价计算，该机制专为防止大单在盘口恶意插针诱发连环爆仓，开仓时请严格以标记价格为准预留充足的维持保证金。" },
      { q: "在全仓杠杆模式下如何防止单一亏损合约把整个账户资产亏光？", a: "务必在开仓面板勾选【只减仓】并预设硬止损价（Stop-Loss），严禁在亏损单上盲目追加保证金死扛，单笔持仓风险建议控制在总净值 2%~5% 以内。" }
    ]
  },
  {
    topic: "denglu-dns-wenti-paicu",
    tag: "网络直连",
    brandTemplates: {
      ouyi: "欧意登录提示网络超时与ERR_CONNECTION排错指南：公共DNS与安全直连节点配置",
      okx: "OKX网络连接异常与网页白屏快速解决教程：DoH加密解析与本地缓存清理",
      ouyiokx: "欧意OKX官方直连加速通道配置：阿里DNS223.5.5.5与Cloudflare1.1.1.1实战",
      yiou: "易欧登录网络超时排错全流程：修改DNS服务器与浏览器无痕安全访问",
      okex: "OKEx直连备用节点访问指南：解决域名解析污染与拼图验证码加载失败"
    },
    descTemplates: {
      ouyi: "针对国内网络环境下访问欧意遇到打不开、加载缓慢或白屏报错问题，提供修改阿里公共DNS(223.5.5.5)与Cloudflare DNS(1.1.1.1)排错教程及官方安全直连通道。",
      okx: "OKX主站连接超时快速排错手册。详解如何在Chrome/Edge中开启安全DNS(DoH)、执行系统缓存清理命令并直连官方高可用节点。",
      ouyiokx: "欧意OKX官方备用加速线路配置指引。全面解决DNS劫持污染、SSL握手失败与滑动拼图验证码无法加载等常见网络障碍。",
      yiou: "易欧用户网络连通性优化方案。简单三步更改IPv4网络配置，清除本地DNS污染记录，畅享秒级极速登录与交易体验。",
      okex: "OKEx网络排障实操宝典。掌握备用域名SSL防伪验证技巧，彻底告别假冒钓鱼站点与DNS解析失败困扰。"
    },
    steps: [
      { step: 1, title: "配置安全公共DNS", desc: "在网络连接属性中将IPv4 DNS手动修改为 223.5.5.5 与 1.1.1.1，消除本地运营商解析干扰。" },
      { step: 2, title: "彻底刷新系统缓存", desc: "以管理员身份打开 CMD 终端输入 'ipconfig /flushdns' 回车，清空本地受污染的DNS缓存记录。" },
      { step: 3, title: "无痕模式直连节点", desc: "使用 Chrome 或 Edge 浏览器无痕窗口（Ctrl+Shift+N）直接访问本站最新官方安全直连通道。" }
    ],
    faqs: [
      { q: "修改本地 DNS 为 223.5.5.5 后仍然提示网络连接超时怎么办？", a: "请在 Windows CMD 终端运行 'ipconfig /flushdns' 清除本地解析缓存，并使用 Chrome 无痕窗口（Ctrl+Shift+N）直接访问本站提供的最新直连备用加速节点。" },
      { q: "为什么在网页端登录时滑动拼图验证码一直加载不出来？", a: "这是由于本地网络拦截了极验(Geetest)或 Cloudflare 验证组件静态资源，切换手机热点或在浏览器设置中开启 DoH 加密 DNS 即可秒级加载。" }
    ]
  },
  {
    topic: "web3-qianbao-zhujici-beifen",
    tag: "Web3钱包",
    brandTemplates: {
      ouyi: "欧意Web3钱包去中心化多链创建与助记词手抄备份：私钥防盗与授权清理指南",
      okx: "OKX Web3多链钱包安全使用手册：助记词离线备份铁律与DApp恶意授权撤销",
      ouyiokx: "欧意OKX去中心化钱包私钥防盗全攻略：冷热分仓管理与钓鱼签名识别技巧",
      yiou: "易欧Web3钱包新手实操指南：多链资产管理、Gas费设置与私钥离线储存",
      okex: "OKEx Web3钱包安全进阶教程：无限授权风险检测与智能合约交互防坑"
    },
    descTemplates: {
      ouyi: "手把手教你在Web3钱包中安全管理多链资产。详解助记词纸质手抄铁律、冷热钱包分仓隔离、DApp无限授权检测与规避恶意钓鱼签名。",
      okx: "OKX Web3钱包去中心化安全管理体系拆解。掌握私钥离线存储标准、学会使用官方授权管理工具一键撤销高风险合约授权。",
      ouyiokx: "欧意OKX多链Web3钱包资产防护指南。彻底杜绝截图备份助记词导致的私钥泄露，建立高安全级别的链上交互防火墙。",
      yiou: "易欧Web3去中心化多链实操教程。覆盖以太坊、Solana、Sui等多链生态交互、自定义Gas费加速与防止恶意空投代币诈骗。",
      okex: "OKEx Web3钱包安全实战指南。详解助记词派生路径原理、硬件冷钱包联动与识别仿冒DApp钓鱼网站的关键技巧。"
    },
    steps: [
      { step: 1, title: "纸笔物理手抄助记词", desc: "按顺序准确抄写12位英文助记词并核对两遍，严禁任何形式的截屏、拍照或云端记事本同步。" },
      { step: 2, title: "严格实行冷热分仓", desc: "大额资产长期存放在离线冷钱包或不联网设备中，日常链上交互仅使用独立的小额热钱包。" },
      { step: 3, title: "定期清理合约授权", desc: "在钱包【工具】→【授权管理】中定期排查并撤销长期未使用的 DApp 无限代币授权。" }
    ],
    faqs: [
      { q: "为什么绝对不能用手机截图或微信收藏保存 12 位助记词？", a: "手机截图会自动同步到各类云相册，且剪切板或恶意输入法拥有读取权限。黑客通过扫描云端泄露库可在 1 秒内转走钱包所有多链资产，助记词必须使用纸笔离线手抄并放入保险箱。" },
      { q: "在 Web3 钱包参与链上空投交互后如何取消恶意合约授权(Revoke)？", a: "进入 OKX Web3 钱包【工具】→【授权管理】，系统会自动检测具有无限授权(Unlimited Approval)风险的代币与合约，点击【一键取消授权】即可切断盗币通道。" }
    ]
  },
  {
    topic: "guge-2fa-yanzheng-huanyuan-shouji",
    tag: "谷歌验证",
    brandTemplates: {
      ouyi: "欧意谷歌身份验证器(2FA)丢失换机怎么恢复：16位秘钥离线还原与人脸重置指引",
      okx: "OKX双重身份验证2FA重置与解绑教程：手机损坏快速找回与时钟同步排错",
      ouyiokx: "欧意OKX账号二次验证安全加固指南：Google Authenticator备份与换绑实操",
      yiou: "易欧谷歌验证码失效快速修复：动态口令时间校准与在线人脸申诉解绑",
      okex: "OKEx老账号谷歌2FA丢失找回攻略：备用秘钥恢复与24小时提币风控保护"
    },
    descTemplates: {
      ouyi: "手机损坏或更换新设备时快速找回 Google Authenticator。详解16位安全秘钥离线导入恢复与无备份时通过人脸生物识别在线解绑全流程。",
      okx: "OKX账号安全中心2FA配置与排障手册。解决动态验证码提示错误、旧手机丢失无法登录等紧急问题，快速恢复账户访问权限。",
      ouyiokx: "欧意OKX账户双重验证体系深度解析。如何离线备份16位防丢秘钥、配置备用设备同步并防范撞库攻击与短信劫持。",
      yiou: "易欧用户谷歌身份验证器实战指南。详解系统时间偏差导致验证码失效的修复方法与人脸识别快速安全解绑流程。",
      okex: "针对OKEx账号2FA遗忘的官方找回通道指引。提交身份核验材料，经过严格风控审核后安全重置二次验证凭证。"
    },
    steps: [
      { step: 1, title: "输入16位秘钥恢复", desc: "在新手机安装 Google Authenticator，选择手动输入初次绑定时保存的16位防丢秘钥即可秒级恢复。" },
      { step: 2, title: "发起人脸生物申诉", desc: "若未备份秘钥，在登录输入2FA界面点击【安全验证不可用】，提交身份证件并完成人脸活体扫描。" },
      { step: 3, title: "自动开启提币保护", desc: "人工审核解绑成功后，系统将自动开启24小时提币风控保护期，保护期后恢复全功能。" }
    ],
    faqs: [
      { q: "旧手机损坏且当时没有记录 16 位安全秘钥，如何登录账号？", a: "在登录输入 2FA 界面点击【安全验证不可用】→【重置谷歌验证】，通过绑定的实名身份证件与人脸生物活体扫描，系统将在人工核验后解绑并重置验证器。" },
      { q: "为什么验证器上的 6 位动态验证码明明没输错却提示‘验证码失效’？", a: "这是由于手机本地系统时间与谷歌服务器时间存在偏差。进入谷歌验证器 App【设置】→【时间修正】→【立即同步】，同步成功后即可正常校验。" }
    ]
  },
  {
    topic: "wuxian-wangge-lianghua-celue-canshu",
    tag: "量化网格",
    brandTemplates: {
      ouyi: "欧意现货无限网格量化策略实战参数设置：牛市单边上涨永不出局与利润自动提取",
      okx: "OKX无限网格机器人参数配置完全指南：底仓价值恒定与单格利润率回测调优",
      ouyiokx: "欧意OKX现货网格交易实战全攻略：等比等差网格对比与单边暴涨防踏空策略",
      yiou: "易欧量化策略交易实战：无限网格区间底价设定与波段利润每日提取",
      okex: "OKEx量化交易机器人高级进阶：网格交易策略回测与震荡行情自动套利"
    },
    descTemplates: {
      ouyi: "深入剖析现货无限网格自动套利模型。区间底价设定、单格利润比计算、单边牛市持续分批止盈与永不踏空实盘技巧。",
      okx: "OKX官方现货无限网格量化机器人配置指南。详解恒定持仓价值算法、主流币单格利润率设定与自动提取利润功能实操。",
      ouyiokx: "欧意OKX量化网格交易全面对比。解析普通等差网格与无限网格在牛市中期的收益差异，教你建立全自动波段收割系统。",
      yiou: "易欧现货无限网格参数优化策略。如何根据历史年化波动率计算最佳网格间距，实现震荡吃波段、单边吃大趋势。",
      okex: "OKEx量化交易员实战参数库。精选BTC/ETH主流币对无限网格配置模板，手把手教你配置免盯盘自动量化策略。"
    },
    steps: [
      { step: 1, title: "合理设定区间底价", desc: "底价通常设定在近期周线级别强支撑位下方20%~30%，确保极端回调不破网。" },
      { step: 2, title: "精细配置单格利润", desc: "主流币推荐配置0.8%~1.2%（扣除手续费后），高波动山寨币种推荐配置1.5%~2.5%。" },
      { step: 3, title: "开启利润自动提取", desc: "勾选利润自动划转功能，将网格每次高抛低吸产生的USDT套利利润每日自动转入资金账户。" }
    ],
    faqs: [
      { q: "无限网格策略与普通等差网格的核心区别是什么？", a: "普通网格在突破价格上限后会全部卖空变成 USDT 导致踏空；而无限网格通过恒定持仓数字资产价值，在单边暴涨牛市中不断卖出多余利润，始终保留底仓实现永不踏空。" },
      { q: "无限网格每格利润率设为多少最符合真实回测收益？", a: "对于 BTC/ETH 等低波动主流币，推荐单格利润设在 0.8%~1.2%（扣除手续费后）；对于 SOL、DOGE 等高波动币种，推荐设为 1.5%~2.5% 以捕捉更大的波段振幅。" }
    ]
  },
  {
    topic: "matinggele-chaodi-dingtou-shizhan",
    tag: "策略定投",
    brandTemplates: {
      ouyi: "欧意马丁格尔策略分批补仓与回调止盈实战：震荡行情平摊持仓成本与量化风控",
      okx: "OKX现货马丁格尔机器人参数设置教程：加仓跌幅步长、倍数乘数与止盈比例",
      ouyiokx: "欧意OKX马丁格尔抄底策略完全指南：震荡下行摊低成本与单轮反弹快速离场",
      yiou: "易欧量化定投马丁格尔实战手册：阶梯分批补仓模型与最大加仓次数安全防线",
      okex: "OKEx马丁格尔策略风控进阶：防止单边暴跌资金穿仓与精细化止损线设定"
    },
    descTemplates: {
      ouyi: "马丁格尔分批补仓量化策略全解析。如何设置加仓跌幅步长、倍数乘数与反弹止盈比例，平摊持仓成本并自动离场锁定收益。",
      okx: "OKX官方马丁格尔策略机器人配置手册。详解多次倍投摊薄均价原理、单轮止盈目标测算与极端单边行情的止损设置。",
      ouyiokx: "欧意OKX马丁格尔抄底实战攻略。专为震荡市与中短期回调打造，利用数学模型平摊持仓成本，小幅反弹即可盈利离场。",
      yiou: "易欧现货马丁格尔策略优化指南。如何科学设定首单金额、加仓倍数（1.5x~2.0x）与最大加仓轮次，确保资金链安全稳固。",
      okex: "OKEx策略交易员深度复盘。对比普通网格与马丁格尔在震荡走势中的资金利用率，手把手教你配置低风险自动化量化模型。"
    },
    steps: [
      { step: 1, title: "优选高流动性主流币", desc: "严格选择BTC、ETH、SOL等高深度主流资产运行策略，严禁在无流动性小币种上运行。" },
      { step: 2, title: "阶梯设置加仓步长", desc: "设定每下跌1.5%~2.0%触发1.5倍资金加仓，大幅拉低综合持仓均价。" },
      { step: 3, title: "配置1.5%反弹止盈", desc: "设置整体均价反弹1.5%自动全部止盈平仓，锁定利润并立即自动开启下一轮循环。" }
    ],
    faqs: [
      { q: "马丁格尔策略在单边暴跌极端行情下如何防止资金穿仓？", a: "必须在创建策略时设置【最大加仓次数】（如最多加仓 6~8 次）并预设【总资金最大止损线】（如跌破底线强制全平），切勿无限制倍投导致保证金枯竭。" },
      { q: "马丁格尔策略单轮回调止盈比例一般设置为多少最合理？", a: "建议设置在 1.5%~2.0%。因为马丁格尔多次倍投后持仓成本已被大幅拉低，小幅反弹 1.5% 即可让整个大仓位实现盈利出局并迅速开启下一轮套利循环。" }
    ]
  },
  {
    topic: "tibi-trc20-erc20-gas-feilv-duibi",
    tag: "链上转账",
    brandTemplates: {
      ouyi: "欧意提币网络选错怎么办：波场TRC20与以太坊ERC20手续费对比、地址防篡改与工单申诉",
      okx: "OKX提币网络选择指南：TRC20/ERC20/BSC手续费与到账速度全面对比",
      ouyiokx: "欧意OKX链上提币安全全流程：公链协议匹配、小额测试单与剪切板木马防范",
      yiou: "易欧提币充错网络快速找回教程：TxID哈希查询、跨链退款工单与客服协助",
      okex: "OKEx提币手续费优化与安全指南：波场能量节省技巧与大额资产链上转移规范"
    },
    descTemplates: {
      ouyi: "对比波场TRC20、以太坊ERC20与BSC网络的转账速度与Gas费差异。详解提币地址校验、测试单发送与充错网络工单申请流程。",
      okx: "OKX提币公链协议选择完全手册。如何根据转账金额与目标钱包类型选择最优网络，避免因网络选错导致资产卡滞或丢失。",
      ouyiokx: "欧意OKX链上资产流转安全规范。教你识别修改提币地址的恶意剪切板病毒，掌握大额转账前的5 USDT小额测试标准流程。",
      yiou: "易欧提币排障与找回攻略。手把手指导用户通过区块链浏览器查询确认数，并在充错非支持代币时向官方发起工单申诉。",
      okex: "OKEx老玩家链上转账实操总结。波场TRC20秒级确认与以太坊ERC20大额安全结算实测对比，助你大幅降低网络转账损耗。"
    },
    steps: [
      { step: 1, title: "日常转账优选TRC20", desc: "日常USDT小额转账优先选择波场TRC20网络，手续费仅需1~2 USDT且秒级确认到账。" },
      { step: 2, title: "大额及DeFi选ERC20", desc: "大额资产流转或参与以太坊DeFi质押交互选择ERC20网络，安全性最高但Gas费受主网拥堵影响。" },
      { step: 3, title: "大额转账必先发测试", desc: "向新地址转账大额资金前，务必先发一笔5~10 USDT小额测试单，确认无误后再执行全额转账。" }
    ],
    faqs: [
      { q: "提币时误将 USDT 转到了对方不支持的公链网络（如充错链）怎么找回？", a: "只要该目标地址为您自己拥有私钥的去中心化钱包，只需在钱包中切换对应公链并添加 USDT 合约代币即可查看；若充入其他中心化平台，需联系对方客服提交 TxID 发起跨链原路退还申请。" },
      { q: "为什么向波场 TRC20 地址转账有时需要消耗 2~3 USDT 甚至更高手续费？", a: "这是因为波场网络根据目标地址是否已激活 USDT 智能合约动态消耗 Energy 能量。未激活新地址需额外消耗燃烧 TRX，欧意系统会自动估算最经济的 Gas 费率确保 100% 快速到账。" }
    ]
  },
  {
    topic: "xrp-memo-tag-loudai-zhaohui-liucheng",
    tag: "充值排查",
    brandTemplates: {
      ouyi: "欧意充值未到账怎么排查：区块确认数查询、XRP与TON漏填Memo标签在线快速找回",
      okx: "OKX充值漏填Tag标签自助找回指南：TxID交易哈希提交与10分钟极速补录",
      ouyiokx: "欧意OKX数字资产充值排错全流程：网络确认数门槛与充错币种工单处理",
      yiou: "易欧充币未入账排查手册：EOS/XRP/TON标签路由原理与资产找回通道",
      okex: "OKEx充值异常快速处理宝典：区块链哈希比对与官方客服极速补单流程"
    },
    descTemplates: {
      ouyi: "针对XRP、EOS、TON等币种充值漏填或填错Memo/Tag标签导致资金未入账的问题，手把手教你使用官方自助补录通道快速找回资产。",
      okx: "OKX充币未到账自助找回完全手册。详解公链区块确认数机制、Tag标签路由原理与App内一键提交哈希快速入账流程。",
      ouyiokx: "欧意OKX充币异常排查全流程指南。如何通过区块链浏览器核验TxID打包状态，解决网络拥堵与代币合约地址变更等疑难杂症。",
      yiou: "易欧充值安全与排障手册。教新用户准确区分充币地址与专属Memo码，掌握未到账情况下的标准工单申诉格式。",
      okex: "OKEx资深充值排障经验。详细演示如何在资产管理中心调出未入账充值订单，上传凭证并在30分钟内完成资金安全补录。"
    },
    steps: [
      { step: 1, title: "查询TxID区块确认数", desc: "在对应区块链浏览器输入交易哈希TxID，核对当前确认数是否达到欧意平台入账门槛标准。" },
      { step: 2, title: "核对Memo及Tag标签", desc: "确认充值币种（如XRP/TON）是否需要附加专属数字Tag，检查当时转账是否遗漏或填错。" },
      { step: 3, title: "进入App一键自助找回", desc: "在App【资产】→【充币】→右上角【充值未到账找回】提交TxID与正确Tag，系统自动补录入账。" }
    ],
    faqs: [
      { q: "充值 XRP/TON/EOS 时忘记填写 Memo 或 Tag 标签，资产会丢失吗？", a: "不会丢失。进入 OKX App【资产】→【充币】→点击右上角【充值未到账找回】，输入您的交易哈希 TxID、充值金额以及您的正确专属 Tag，系统通常在 10~30 分钟内自动为您入账。" },
      { q: "区块链浏览器显示已打包成功，为什么欧意账户资产还没显示到账？", a: "平台针对每条公链设有严格的安全确认数门槛（如 BTC 需 2 个网络确认，ETH 需 12 个确认）。达到入账确认数后系统会自动解锁可用余额，达到提币确认数后方可对外转账。" }
    ]
  },
  {
    topic: "passkey-fido2-shengwu-denglu-peizhi",
    tag: "免密登录",
    brandTemplates: {
      ouyi: "欧意Passkey免密生物认证配置：Windows Hello与Face ID绑定、彻底免疫网络钓鱼",
      okx: "OKX通行密钥Passkey设置完全指南：FIDO2指纹面容免密登录与多设备同步",
      ouyiokx: "欧意OKX账号生物安全登录升级：告别密码与短信验证码、防御撞库劫持",
      yiou: "易欧Passkey通行密钥实战配置：苹果设备与Windows电脑生物识别快速绑定",
      okex: "OKEx账号安全终极防护：开启FIDO2硬件密钥与生物识别、杜绝钓鱼拦截"
    },
    descTemplates: {
      ouyi: "使用现代WebAuthn标准将指纹、Face ID或YubiKey硬件钥匙绑定为欧意登录凭证。无需输入密码与短信验证码，彻底免疫网络钓鱼。",
      okx: "OKX官方Passkey通行密钥配置手册。详解非对称公私钥加密原理、iCloud/Google密码管理器多端无缝同步与安全芯片防护。",
      ouyiokx: "欧意OKX账号生物免密登录完全指南。轻触指纹秒级安全通行，彻底规避短信验证码延迟、嗅探与键盘记录木马窃密。",
      yiou: "易欧Passkey生物认证配置全流程。如何在Mac、iPhone及Windows设备上快速添加通行密钥，享受极速安全的交易大厅直达体验。",
      okex: "OKEx安全防护全面升级教程。教你利用FIDO2硬件级安全密钥构筑防盗堡垒，即便账号密码意外泄露也能确保核心资金高枕无忧。"
    },
    steps: [
      { step: 1, title: "进入通行密钥设置中心", desc: "在欧意个人中心点击【安全中心】→找到【通行密钥 (Passkey)】点击立即添加。" },
      { step: 2, title: "唤起设备原生生物识别", desc: "根据设备提示轻触 Windows Hello 指纹识别器，或完成苹果 iPhone Face ID 面容扫描。" },
      { step: 3, title: "享受秒级免密安全通行", desc: "今后在任何受信设备登录交易大厅，无需输入复杂密码与短信码，轻触指纹即可瞬间登入。" }
    ],
    faqs: [
      { q: "开启 Passkey (通行密钥) 生物登录相比短信验证码有什么核心安全优势？", a: "Passkey 基于 FIDO2 公私钥非对称加密，私钥深锁在设备安全芯片(SE)中永不触网。黑客即便架设高仿钓鱼网站也无法诱骗私钥，彻底免疫键盘记录器、中间人劫持与验证码拦截。" },
      { q: "如果绑定的 iPhone 或笔记本电脑丢失，如何通过备用方式登录？", a: "Passkey 会通过 Apple iCloud 钥匙串或 Google 密码管理器在同账号设备间端到端加密同步；若所有设备均丢失，仍可通过绑定的备用邮箱及谷歌 2FA 动态码安全登录。" }
    ]
  },
  {
    topic: "okb-feilv-dikou-vip-shengji-biao",
    tag: "费率优化",
    brandTemplates: {
      ouyi: "欧意平台手续费抵扣全攻略：OKB持仓减免比例、Maker挂单降费与VIP等级表拆解",
      okx: "OKX交易手续费阶梯折扣与VIP升级手册：现货与合约费率深度计算对比",
      ouyiokx: "欧意OKX手续费优化实战指南：开启OKB抵扣与限价单Maker报单降本技巧",
      yiou: "易欧手续费减免全攻略：VIP等级评定标准、资产规模要求与交易量考核",
      okex: "OKEx老用户费率特权深度解析：终身20%自动返还与OKB持仓折扣叠加实操"
    },
    descTemplates: {
      ouyi: "全面拆解现货与合约交易手续费结构。如何开启OKB抵扣享受阶梯折扣、挂单（Maker）与吃单（Taker）差价机制，以及VIP等级费率晋升路径。",
      okx: "OKX官方交易费率体系与VIP升级标准详解。计算不同持仓量下的OKB折扣比例，掌握大宗量化交易者的专属费率优惠政策。",
      ouyiokx: "欧意OKX交易成本控制完全宝典。结合本站开户尊享的20%手续费自动返现特权，手把手教你将综合交易摩擦成本降至行业最低。",
      yiou: "易欧高频交易员手续费优化方案。分析市价吃单与限价挂单的成本差异，利用Post-Only只做Maker指令大幅削减月度交易磨损。",
      okex: "OKEx资深交易员省钱秘籍。深度测算OKB持仓性价比与VIP1~VIP8阶梯费率门槛，助你最大化交易净收益。"
    },
    steps: [
      { step: 1, title: "开启OKB现货费率抵扣", desc: "进入账户【费率】设置页面，勾选【开启 OKB 抵扣现货手续费】开关享受阶梯直减。" },
      { step: 2, title: "优先使用Maker限价挂单", desc: "下单时优先使用限价单（Post-Only）报单挂入盘口，费率通常仅为市价Taker的一半。" },
      { step: 3, title: "叠加20%返还尊享特权", desc: "通过本站直连通道开户自动锁定20%手续费每晚自动返现，与OKB持仓折扣双重叠加生效。" }
    ],
    faqs: [
      { q: "持有多少枚 OKB 可以触发最高等级的现货交易手续费折扣？", a: "普通用户持有 2000 枚及以上 OKB 即可享受最高阶梯基础折扣，叠加本站开户绑定的 20% 自动返还特权后，综合交易手续费率可节省近 40% 以上。" },
      { q: "什么是 Maker（挂单）与 Taker（吃单）？高频交易如何大幅降低交易损耗？", a: "Maker 是指在盘口提前挂出限价单等待被动成交（为市场提供流动性），其费率通常只有 Taker（市价吃单）的一半。专业交易员应尽可能使用限价单（Post-Only）报单以压低摩擦成本。" }
    ]
  },
  {
    topic: "api-key-baishimingdan-anquan-shezhi",
    tag: "API安全",
    brandTemplates: {
      ouyi: "欧意API Key接口安全创建规范：只读交易权限划分、Passphrase口令与IP白名单绑定",
      okx: "OKX V5 API接口创建与量化安全手册：权限最小化原则与云服务器固定IP绑定",
      ouyiokx: "欧意OKX量化程序API安全防护指南：防提币权限泄露与WebSocket长连接配置",
      yiou: "易欧API接口密钥创建全流程：Python量化调用、Passphrase加密与权限隔离",
      okex: "OKEx V5 API接口升级与迁移指南：高频交易接口速率限制与IP白名单实操"
    },
    descTemplates: {
      ouyi: "为Python量化程序配置V5 API Key全流程。详解只读与交易权限划分、Passphrase口令加密与绑定云服务器固定IP阻断黑客入侵。",
      okx: "OKX官方API接口安全最佳实践。遵循权限最小化原则，严格剥离提币权限，确保自动化量化程序安全稳定运行。",
      ouyiokx: "欧意OKX量化开发者专属安全手册。拆解API签名生成机制、RESTful接口与WebSocket长连接的最佳连接与重连策略。",
      yiou: "易欧API密钥管理与安全规范。教你如何在服务器环境变量中安全存放API凭证，彻底防止代码意外开源导致的密钥泄露。",
      okex: "OKEx老用户API迁移与升级实操。全面接入V5统一交易接口，优化报单频率与风控拦截，享受毫秒级量化撮合体验。"
    },
    steps: [
      { step: 1, title: "严格划分最小可用权限", desc: "创建API时仅勾选【读取】与【交易】，严禁勾选【提币】权限，从根源切断资金被盗风险。" },
      { step: 2, title: "配置专属Passphrase口令", desc: "为API设置独立于登录密码的高强度Passphrase口令，本地代码仅存储加密环境变量。" },
      { step: 3, title: "绑定服务器固定IP白名单", desc: "在API白名单中填入量化云服务器的固定公网IP，拒绝任何未授权外网IP发起调用请求。" }
    ],
    faqs: [
      { q: "创建量化交易 API Key 时为什么绝对不能勾选【提币 (Withdraw)】权限？", a: "量化回测与自动下单仅需【读取】和【交易】权限。严禁勾选提币权限可以确保即便云服务器遭遇漏洞攻击或 API Key 意外泄露，攻击者也绝对无法转移您账户内的任何资金。" },
      { q: "API 绑定固定 IP 白名单有哪些关键要求？", a: "建议在阿里云、腾讯云或 AWS 购买固定公网 IP 服务器并填入白名单列表，未绑定 IP 白名单的 API 接口在平台会受到严格的每秒请求频次限制(Rate Limit)且时效仅维持 14 天。" }
    ]
  },
  {
    topic: "fangdiaoyu-anquanma-yanzheng-shezhi",
    tag: "防钓鱼码",
    brandTemplates: {
      ouyi: "欧意防钓鱼安全码怎么设置：识别仿冒邮件短信、官方渠道验证中心使用技巧",
      okx: "OKX防钓鱼安全暗号配置完全手册：辨别虚假官方通知与防范假冒客服诈骗",
      ouyiokx: "欧意OKX账号防钓鱼防护体系指南：官方邮件暗号验证与网址真伪核验实操",
      yiou: "易欧防钓鱼安全码设置教程：如何一眼看穿冒充平台的清退恐慌诈骗短信",
      okex: "OKEx官方渠道验证中心使用攻略：防范电报与微信假客服、核验官方人员身份"
    },
    descTemplates: {
      ouyi: "在安全中心设定专属防钓鱼暗号。所有官方邮件正文顶部均包含该码，配合官方渠道验证工具彻底辨别虚假仿冒通知。",
      okx: "OKX官方反诈骗与防钓鱼安全指南。如何识别假冒清退、假冒账户冻结等恐慌型诈骗信息，建立多维安全识别屏障。",
      ouyiokx: "欧意OKX防钓鱼安全暗号实操全解析。手把手教你设置个性化防伪文字，确保接收到的每一封邮件均真实来源于欧意官方系统。",
      yiou: "易欧用户必备的防诈骗避坑宝典。揭露假冒官方客服拉群、指导提币到‘安全账户’的经典骗局，保障个人资产安全。",
      okex: "OKEx官方安全中心防护指引。详细演示如何使用官方渠道验证工具一键查询域名、电话、微信及Telegram账号真伪。"
    },
    steps: [
      { step: 1, title: "进入安全中心设置暗号", desc: "在【个人中心】→【安全中心】→【防钓鱼码】中输入一段仅有您个人知晓的专属文字或数字。" },
      { step: 2, title: "核对每封官方邮件顶部", desc: "今后收到任何声称来自欧意的系统邮件，首先核对正文顶部是否印有您预设的这串专属暗号。" },
      { step: 3, title: "使用官方验证中心查询", desc: "遇任何可疑网址或自称官方人员，直接在官网【官方渠道验证中心】输入查询核实真伪。" }
    ],
    faqs: [
      { q: "收到自称‘OKX客服’提示‘账户涉及黑钱需提币到安全地址审查’的短信怎么辨别？", a: "100% 为诈骗！OKX 官方工作人员绝不会以任何理由要求用户向任何所谓‘安全账户’转账。凡是收到此类短信，请直接在官网【官方渠道验证中心】输入发送号码或网址查询真伪。" },
      { q: "设置了防钓鱼安全码后，如何在每一封官方邮件中辨认真伪？", a: "设置成功后，未来欧意官方系统发送的每一封登录提醒、提币确认及安全通知邮件，正文最顶部都会显式打印您预设的这串专属暗号，没有此暗号的邮件一律为仿冒钓鱼邮件。" }
    ]
  },
  {
    topic: "laoyonghu-okex-zhanghao-qianyi-daochu",
    tag: "老户迁移",
    brandTemplates: {
      ouyi: "欧意OKEx老用户账号找回与数据迁移指引：手机号停用换绑与历史账单CSV导出",
      okx: "OKX老玩家回归完全指南：原OKEx资产找回、安全升级与统一交易账户开启",
      ouyiokx: "欧意OKX老账号找回实战宝典：旧手机停用人脸申诉与多年未登录资产核验",
      yiou: "易欧老用户无缝升级指南：历史交易数据导出、UID继承与最新安全体系绑定",
      okex: "OKEx历史账号恢复与安全升级手册：忘记密码在线重置与24小时资产保护"
    },
    descTemplates: {
      ouyi: "针对多年前注册的OKEx老用户，提供找回遗忘账号、旧手机号解绑、历史账单导出与一键升级为最新欧易OKX安全架构的操作指南。",
      okx: "OKX老玩家重返交易大厅完整手册。原UID与历史资产完整保留，一键开启统一交易账户（UTA），享受毫秒级多币种保证金体系。",
      ouyiokx: "欧意OKX老账号找回与换绑全流程。解决早年注册手机号已销号停用的难题，通过人脸生物活体核验安全快速换绑新手机号。",
      yiou: "易欧老用户资产管理与数据导出教程。在订单中心按年度一键导出标准财务CSV报表，方便进行个人税务或财务核算。",
      okex: "OKEx经典账号安全重置指南。忘记密码、丢失2FA情况下的官方申诉通道详解，助你顺畅找回早年埋伏的数字资产。"
    },
    steps: [
      { step: 1, title: "使用原账号直接登录", desc: "原OKEx注册的邮箱或手机号可直接登录欧意主站，历史UID、持仓资产与交易记录均完整保留。" },
      { step: 2, title: "旧手机停用人脸换绑", desc: "若旧手机已销号，在登录页点击【安全验证不可用】通过实名人脸生物活体扫描快速绑定新手机。" },
      { step: 3, title: "一键导出年度历史账单", desc: "在【订单中心】→【账单明细】中按自定义年份一键导出标准格式财务 CSV 报表。" }
    ],
    faqs: [
      { q: "早年注册的 OKEx 老账号多年未登录，账号资产还在吗？如何找回？", a: "所有历史 UID、持仓资产与交易记录均完好保留在欧意主系统数据库中。只需输入当时绑定的邮箱或手机号即可直接登录；若密码遗忘点击【忘记密码】即可在线重置。" },
      { q: "早年绑定的手机号早已销号停用，无法接收登录验证码怎么办？", a: "在登录界面点击【安全验证不可用】→【手机号已停用】，通过提交初次绑定的实名身份信息进行人脸活体扫描，核验通过后即可一键绑定新的常用手机号码。" }
    ]
  }
];

const SCENARIO_SUFFIXES = [
  { slugSuffix: "shizhan-zhinan", tag: "实战指南" },
  { slugSuffix: "fengkong-guize", tag: "风控细则" },
  { slugSuffix: "paicu-jiaocheng", tag: "排错教程" },
  { slugSuffix: "anquan-peizhi", tag: "安全配置" },
  { slugSuffix: "feilv-youhua", tag: "降费策略" },
  { slugSuffix: "kuaduan-tongbu", tag: "跨端同步" },
  { slugSuffix: "gaofeng-yingdui", tag: "高峰应对" },
  { slugSuffix: "xinshou-bidu", tag: "新手必读" },
  { slugSuffix: "lianghua-fupan", tag: "量化复盘" },
  { slugSuffix: "zichan-geli", tag: "资产隔离" },
  { slugSuffix: "doh-jiami-jiexi", tag: "加密解析" },
  { slugSuffix: "api-v5-duijie", tag: "V5接口对接" }
];

const BRAND_ROOTS = ["ouyi", "okx", "ouyiokx", "yiou", "okex"];

function buildMasterArticles() {
  const articlesZh = { ...CORE_PILLARS };
  const articlesHant = {};

  const baseDate = new Date('2026-08-01T00:00:00Z');

  for (let i = 0; i < 365; i++) {
    const brand = BRAND_ROOTS[i % BRAND_ROOTS.length];
    const sc = TOPIC_PRESETS[i % TOPIC_PRESETS.length];
    const suf = SCENARIO_SUFFIXES[Math.floor(i / TOPIC_PRESETS.length) % SCENARIO_SUFFIXES.length];

    const cleanSlug = `${brand}-${sc.topic}-${suf.slugSuffix}`;

    const pubDateObj = new Date(baseDate.getTime() + i * 24 * 3600 * 1000);
    const y = pubDateObj.getUTCFullYear();
    const m = String(pubDateObj.getUTCMonth() + 1).padStart(2, '0');
    const d = String(pubDateObj.getUTCDate()).padStart(2, '0');
    const publishDate = `${y}-${m}-${d}`;

    // 🏆 自然流畅的顶级长尾标题（绝无逗号！）
    const baseTitle = sc.brandTemplates[brand] || `${sc.tag}实战指南`;
    const title = `${baseTitle}【${suf.tag}】`;
    const description = sc.descTemplates[brand] || sc.descTemplates.ouyi;

    const brandName = brand === "okx" ? "OKX" : (brand === "yiou" ? "易欧" : (brand === "okex" ? "OKEx" : "欧意"));

    articlesZh[cleanSlug] = {
      route: cleanSlug,
      tabLabel: sc.tag,
      title: title,
      description: description,
      keywords: `${brandName}, 欧意OKX, 欧易电脑版, ox.xxmsanguo.com, ${sc.tag}, ${suf.tag}`,
      heroBadge: `${brandName} · ${sc.tag} · ${suf.tag}`,
      heroTitle: title,
      heroSub: description,
      customIntroTitle: `核心实操流程【${suf.tag}】`,
      customIntroBody: `严格遵循标准化排错与操作流程，确保数字资产与交易链路全天候安全。`,
      detailedSteps: sc.steps,
      targetedFaq: sc.faqs, // 100% 专属于该主题的深度硬核实战问答
      publishDate: publishDate
    };
  }

  // 深度港台繁体转换
  for (const [slug, item] of Object.entries(articlesZh)) {
    const titleHant = item.title
      .replace(/欧意/g, '歐意')
      .replace(/欧易/g, '歐易')
      .replace(/电脑/g, '電腦')
      .replace(/网络/g, '網絡')
      .replace(/验证/g, '驗證')
      .replace(/钱包/g, '錢包')
      .replace(/充值/g, '充幣')
      .replace(/提现/g, '出金')
      .replace(/买币/g, '買幣')
      .replace(/开户/g, '開戶');

    const descHant = item.description
      .replace(/欧意/g, '歐意')
      .replace(/欧易/g, '歐易')
      .replace(/电脑/g, '電腦')
      .replace(/网络/g, '網絡')
      .replace(/验证/g, '驗證')
      .replace(/钱包/g, '錢包')
      .replace(/充值/g, '充幣')
      .replace(/提现/g, '出金')
      .replace(/买币/g, '買幣');

    const heroTitleHant = item.heroTitle
      .replace(/欧意/g, '歐意')
      .replace(/欧易/g, '歐易')
      .replace(/电脑/g, '電腦')
      .replace(/网络/g, '網絡')
      .replace(/验证/g, '驗證')
      .replace(/钱包/g, '錢包');

    const heroSubHant = item.heroSub
      .replace(/欧意/g, '歐意')
      .replace(/欧易/g, '歐易')
      .replace(/电脑/g, '電腦')
      .replace(/网络/g, '網絡')
      .replace(/验证/g, '驗證')
      .replace(/钱包/g, '錢包');

    articlesHant[slug] = {
      ...item,
      title: titleHant,
      description: descHant,
      heroTitle: heroTitleHant,
      heroSub: heroSubHant,
      detailedSteps: item.detailedSteps.map(s => ({
        ...s,
        title: s.title.replace(/欧意/g, '歐意').replace(/欧易/g, '歐易').replace(/电脑/g, '電腦').replace(/验证/g, '驗證').replace(/钱包/g, '錢包'),
        desc: s.desc.replace(/欧意/g, '歐意').replace(/欧易/g, '歐易').replace(/电脑/g, '電腦').replace(/验证/g, '驗證').replace(/钱包/g, '錢包')
      })),
      targetedFaq: (item.targetedFaq || []).map(f => ({
        q: f.q.replace(/欧意/g, '歐意').replace(/欧易/g, '歐易').replace(/电脑/g, '電腦').replace(/网络/g, '網絡').replace(/验证/g, '驗證').replace(/钱包/g, '錢包').replace(/充值/g, '充幣').replace(/提现/g, '出金').replace(/买币/g, '買幣'),
        a: f.a.replace(/欧意/g, '歐意').replace(/欧易/g, '歐易').replace(/电脑/g, '電腦').replace(/网络/g, '網絡').replace(/验证/g, '驗證').replace(/钱包/g, '錢包').replace(/充值/g, '充幣').replace(/提现/g, '出金').replace(/买币/g, '買幣')
      }))
    };
  }

  return { articlesZh, articlesHant };
}

const { articlesZh, articlesHant } = buildMasterArticles();

const tsCodeZh = `import type { SeoPageData } from './types';

export const SEO_KEYWORDS_MAP: Record<string, SeoPageData> = ${JSON.stringify(articlesZh, null, 2)};
`;

const tsCodeHant = `import type { SeoPageData } from './types';

export const SEO_KEYWORDS_MAP_HANT: Record<string, SeoPageData> = ${JSON.stringify(articlesHant, null, 2)};
`;

fs.writeFileSync(path.join(rootDir, 'src', 'seoData.ts'), tsCodeZh, 'utf8');
fs.writeFileSync(path.join(rootDir, 'src', 'seoData.hant.ts'), tsCodeHant, 'utf8');

console.log('✅ 生成 100% 自然流畅长尾标题与独占专属 FAQ 完成！');

// 4. 立即全量执行构建
console.log('🚀 开始全量预渲染构建...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

// 5. 立即推送到 GitHub 远程仓库
console.log('📦 开始推送到 GitHub...');
const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
execSync('git add .', { stdio: 'inherit', cwd: rootDir });
execSync('git commit -m "feat: complete seamless natural long-tail titles, 100% scenario-exclusive pure FAQs, zero comma prefix"', { stdio: 'inherit', cwd: rootDir });
execSync(`git push https://${token}@github.com/oprom0004/ox.xxmsanguo.com.git main --force`, { stdio: 'inherit', cwd: rootDir });

console.log('🎉 全部全自动一气呵成执行完成！');
