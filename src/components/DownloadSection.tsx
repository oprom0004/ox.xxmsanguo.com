"use client";

import { useState } from "react";
import { useConfig } from "../context/ConfigContext";
import { Smartphone, Monitor, ChevronRight, Download, HelpCircle, Shield, AlertCircle, Laptop, Apple, List, FileCode, CheckCircle, Wifi, Globe, Languages, Terminal, ShieldCheck, ExternalLink } from "lucide-react";

interface DownloadSectionProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function DownloadSection({ currentRoute, locale = 'zh' }: DownloadSectionProps) {
  const { config } = useConfig();
  const isHant = locale === 'hant';
  const [activeTab, setActiveTab] = useState<"mobile" | "desktop" | "files">("mobile");
  const [copiedCode, setCopiedCode] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(config.invitationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (e) {
      alert(isHant ? `邀請碼已成功複製：${config.invitationCode}` : `邀请码已成功复制：${config.invitationCode}`);
    }
  };

  // ────────────────────────────────────────────────────────────────────────
  // 1. RENDER FOR LOGIN & WEB PORTAL (denglu, wangye)
  // ────────────────────────────────────────────────────────────────────────
  if (currentRoute === "denglu" || currentRoute === "wangye") {
    return (
      <section id="login-section" className="py-16 md:py-24 bg-[#0b0e11] text-zinc-300 border-b border-zinc-900 scroll-mt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-semibold font-mono">
              <Wifi size={12} className="text-yellow-500 animate-pulse" />
              <span>{isHant ? "網頁線上登錄 & CDN 端口直連加速" : "网页在线登录 & CDN 端口直连加速"}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-normal">
              {isHant ? "免異常備用中繼登錄通道" : "免异常备用中继登录通道"}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {isHant
                ? "若在部分網絡環境下遇到連接延遲或解析異常，請選擇以下優質白名單物理服務器節點直接訪問平台網頁版："
                : "若在部分网络环境下遇到连接延迟或解析异常，请选择以下优质白名单物理服务器节点直接访问网页在线版："}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950/60 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-zinc-200">{isHant ? "電信/聯通首選專線" : "电信/联通首选专线"}</div>
                <p className="text-[10px] text-zinc-500 mt-1">{isHant ? "多線路自適應低時延" : "多线路自适应低时延"}</p>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 text-xs font-mono font-bold block">12ms</span>
                <button data-cta="true" className="text-xs text-yellow-500 font-bold hover:underline mt-1.5 block">
                  {isHant ? "一鍵直連 →" : "一键直连 →"}
                </button>
              </div>
            </div>

            <div className="bg-zinc-950/60 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-zinc-200">{isHant ? "移動/廣電分流通道" : "移动/广电分流通道"}</div>
                <p className="text-[10px] text-zinc-500 mt-1">{isHant ? "優化本地網絡數據傳輸" : "优化本地网络数据传输"}</p>
              </div>
              <div className="text-right">
                <span className="text-yellow-400 text-xs font-mono font-bold block">19ms</span>
                <button data-cta="true" className="text-xs text-yellow-500 font-bold hover:underline mt-1.5 block">
                  {isHant ? "一鍵直連 →" : "一键直连 →"}
                </button>
              </div>
            </div>

            <div className="bg-zinc-950/60 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-zinc-200">{isHant ? "全球 BGP 智能尋址" : "全球 BGP 智能寻址"}</div>
                <p className="text-[10px] text-zinc-500 mt-1">{isHant ? "適合配置代理用戶" : "适合配置代理用户"}</p>
              </div>
              <div className="text-right">
                <span className="text-yellow-500 text-xs font-mono font-bold block">32ms</span>
                <button data-cta="true" className="text-xs text-yellow-500 font-bold hover:underline mt-1.5 block">
                  {isHant ? "一鍵直連 →" : "一键直连 →"}
                </button>
              </div>
            </div>
          </div>

          {/* Login Troubleshoot FAQ block */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <HelpCircle size={16} className="text-yellow-500" />
              <span>{isHant ? "網頁端登錄常見連接故障排查" : "网页端登录常见连接故障排查"}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400 leading-relaxed pt-2">
              <div className="space-y-1.5">
                <h4 className="font-bold text-zinc-200">{isHant ? "1. 登錄滑塊驗證加載失敗？" : "1. 登录滑块验证加载失败？"}</h4>
                <p className="text-zinc-500 text-[11px]">
                  {isHant
                    ? "這通常是由於瀏覽器緩存干擾或過期 Cookie 引起。建議您開啟瀏覽器的【無痕隱私窗口】重新登錄，或清除最近一小時的瀏覽數據。"
                    : "这通常由于浏览器缓存干扰或过期 Cookie 引起。建议您开启浏览器的【无痕隐私窗口】重新登录，或清除最近一小时的浏览数据。"}
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-zinc-200">{isHant ? "2. 異地登錄觸發安全限制？" : "2. 异地登录触发安全限制？"}</h4>
                <p className="text-zinc-500 text-[11px]">
                  {isHant
                    ? "若頻繁切換網絡 IP 會觸發平台保護機制。此時可使用手機 APP 掃碼登錄，或更換為穩定的靜態網絡連接重新登錄。"
                    : "若频繁切换网络 IP 会触发平台保护机制。此时可使用手机 APP 扫码登录，或更换为稳定的静态网络连接重新登录。"}
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-zinc-200">{isHant ? "3. 驗證碼發送頻繁？" : "3. 验证码发送频繁？"}</h4>
                <p className="text-zinc-500 text-[11px]">
                  {isHant
                    ? "若因網絡波動導致接收郵件或驗證碼延遲，請勿反覆點擊。建議綁定並使用谷歌驗證器（Google Authenticator）進行本地離線 6 位動態碼登錄。"
                    : "若因网络波动导致接收邮件或验证码延迟，请勿反复点击。建议绑定并使用谷歌验证器（Google Authenticator）进行本地离线 6 位动态码登录。"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // 2. RENDER FOR SIMPLIFIED CHINESE CONFIG GUIDE (zhongwen)
  // ────────────────────────────────────────────────────────────────────────
  if (currentRoute === "zhongwen") {
    return (
      <section id="chinese-config" className="py-16 md:py-24 bg-[#0b0e11] text-zinc-300 border-b border-zinc-900 scroll-mt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-semibold font-mono">
              <Languages size={12} className="text-yellow-500 animate-pulse" />
              <span>{isHant ? "語言配置引導" : "语言配置引导"}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-normal">
              {isHant ? "歐易 OKX 簡體中文與人民幣計價配置指南" : "欧易 OKX 简体中文与人民币计价配置指南"}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {isHant
                ? "部分海外版客戶端預設為英文。請參考以下流程快速配置為中文界面及 CNY 匯率計價："
                : "部分海外版客户端预设为英文。请参考以下流程快速配置为中文界面及 CNY 汇率计价："}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-950/60 rounded-2xl border border-zinc-900 space-y-3">
              <span className="text-[11px] font-bold text-yellow-500 font-mono">STEP 01</span>
              <h4 className="text-white text-sm font-extrabold">{isHant ? "進入系統設置" : "进入系统设置"}</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                {isHant
                  ? "打開應用程序，點擊左上角功能菜單（九個圓點圖標），然後點擊右上角的小齒輪圖標進入系統 Settings。"
                  : "打开应用程序，点击左上角功能菜单（九个圆点图标），然后点击右上角的小齿轮图标进入系统 Settings。"}
              </p>
            </div>
            <div className="p-6 bg-zinc-950/60 rounded-2xl border border-zinc-900 space-y-3">
              <span className="text-[11px] font-bold text-yellow-500 font-mono">STEP 02</span>
              <h4 className="text-white text-sm font-extrabold">{isHant ? "切換至簡體中文" : "切换至简体中文"}</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                {isHant
                  ? "在 Settings 列表中下滑，找到帶有地球圖示的 【Language】 菜單，點擊進入並勾選 【簡體中文 / Simplified Chinese】。"
                  : "在 Settings 列表中下滑，找到带有地球图标的 【Language】 菜单，点击进入并勾选 【简体中文 / Simplified Chinese】。"}
              </p>
            </div>
            <div className="p-6 bg-zinc-950/60 rounded-2xl border border-zinc-900 space-y-3">
              <span className="text-[11px] font-bold text-yellow-500 font-mono">STEP 03</span>
              <h4 className="text-white text-sm font-extrabold">{isHant ? "修改法幣計價" : "修改法币计价"}</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                {isHant
                  ? "返回設置列表，定位至 【Currency】 菜單，將預設的 USD（美元）修改為 【CNY / 人民幣】，K線行情即會轉換為人民幣計價。"
                  : "返回设置列表，定位至 【Currency】 菜单，将默认的 USD（美元）修改为 【CNY / 人民币】，K线行情即会转换为人民币计价。"}
              </p>
            </div>
          </div>

          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 text-center max-w-xl mx-auto space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isHant
                ? "配置完成後，建議前往註冊中心鎖定專屬佣金折扣，永久減免後續交易手續費。"
                : "配置完成后，建议前往注册中心锁定专属佣金折扣，永久减免后续交易手续费。"}
            </p>
            <button data-cta="true" className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs rounded-xl transition active:scale-95 shadow-md shadow-yellow-500/10">
              <span>{isHant ? "前往安全註冊通道" : "前往安全注册通道"}</span>
              <ChevronRight size={14} className="stroke-[3]" />
            </button>
          </div>

        </div>
      </section>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // 3. RENDER FOR CHECKSUM INDEX LIST (anzhuangbao)
  // ────────────────────────────────────────────────────────────────────────
  if (currentRoute === "anzhuangbao") {
    return (
      <section id="files-list" className="py-16 md:py-24 bg-[#0b0e11] text-zinc-300 border-b border-zinc-900 scroll-mt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-purple-400 font-semibold font-mono">
              <FileCode size={12} className="text-purple-400 animate-pulse" />
              <span>{isHant ? "版本校驗與安全索引" : "版本校验与安全索引"}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-normal">
              {isHant ? "歐易 OKX 原廠安裝包安全校驗索引庫" : "欧易 OKX 原厂安装包安全校验索引库"}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {isHant
                ? "為防範任何第三方非法打包篡改，建議您在下載文件後，使用哈希計算工具比對公布的 SHA-256 指紋："
                : "为防范任何第三方非法打包篡改，建议您在下载文件后，使用哈希计算工具比对公布的 SHA-256 指纹："}
            </p>
          </div>

          <div className="overflow-x-auto border border-zinc-900 rounded-2xl bg-zinc-950/20">
            <table className="w-full text-xs text-left text-zinc-400 divide-y divide-zinc-900 min-w-[620px]">
              <thead className="bg-zinc-950 text-[10px] uppercase text-zinc-500 tracking-wider font-mono">
                <tr>
                  <th className="p-4">{isHant ? "檔案名稱" : "文件名"}</th>
                  <th className="p-4">{isHant ? "適用平台" : "适用平台"}</th>
                  <th className="p-4">{isHant ? "檔案大小" : "文件大小"}</th>
                  <th className="p-4">{isHant ? "當前版本" : "当前版本"}</th>
                  <th className="p-4">SHA-256 {isHant ? "安全校驗值" : "安全校验值"}</th>
                  <th className="p-4 text-right">{isHant ? "直接下載" : "直接下载"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60 text-zinc-300">
                <tr className="hover:bg-zinc-900/10">
                  <td className="p-4 font-mono font-medium text-zinc-200">OKX_Android_v6.82.apk</td>
                  <td className="p-4">{isHant ? "安卓手機系統" : "安卓手机系统"}</td>
                  <td className="p-4 font-mono text-[11px]">114.2 MB</td>
                  <td className="p-4 text-yellow-400 font-bold">V6.82.2 (Latest)</td>
                  <td className="p-4 font-mono text-[11px] text-zinc-650">8d929b9cf8cef910a202c89dbf719a0a19...</td>
                  <td className="p-4 text-right">
                    <button data-cta="true" className="text-yellow-500 hover:underline font-bold">{isHant ? "開始下載" : "开始下载"}</button>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-900/10">
                  <td className="p-4 font-mono font-medium text-zinc-200">OKX_Windows_x64.exe</td>
                  <td className="p-4">Windows PC 64位</td>
                  <td className="p-4 font-mono text-[11px]">132.8 MB</td>
                  <td className="p-4 text-zinc-400">V2.41.0</td>
                  <td className="p-4 font-mono text-[11px] text-zinc-650">9c0a182ee0dbb9ca8101a719c0dbdfbb82...</td>
                  <td className="p-4 text-right">
                    <button data-cta="true" className="text-yellow-500 hover:underline font-bold">{isHant ? "開始下載" : "开始下载"}</button>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-900/10">
                  <td className="p-4 font-mono font-medium text-zinc-200">OKX_macOS_Silicon.dmg</td>
                  <td className="p-4">Mac Apple M系列芯片</td>
                  <td className="p-4 font-mono text-[11px]">141.5 MB</td>
                  <td className="p-4 text-yellow-400/80 font-bold">V2.41.0</td>
                  <td className="p-4 font-mono text-[11px] text-zinc-650">e2e3b0c44298fc20299cab004a1c3e3aa81...</td>
                  <td className="p-4 text-right">
                    <button data-cta="true" className="text-yellow-500 hover:underline font-bold">{isHant ? "開始下載" : "开始下载"}</button>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-900/10">
                  <td className="p-4 font-mono font-medium text-zinc-200">OKX_macOS_Intel.dmg</td>
                  <td className="p-4">Mac Intel 经典芯片</td>
                  <td className="p-4 font-mono text-[11px]">138.1 MB</td>
                  <td className="p-4 text-zinc-400">V2.41.0</td>
                  <td className="p-4 font-mono text-[11px] text-zinc-650">f2ca1927e108cdbfe7ca0a1bc91fa3bf91...</td>
                  <td className="p-4 text-right">
                    <button data-cta="true" className="text-yellow-500 hover:underline font-bold">{isHant ? "開始下載" : "开始下载"}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-zinc-950/40 p-6 rounded-2xl border border-zinc-900 flex flex-col md:flex-row items-center gap-4 text-xs">
            <ShieldCheck size={20} className="text-yellow-500 shrink-0" />
            <p className="text-zinc-500 leading-relaxed">
              {isHant
                ? "所有安裝程序均由歐易平台安全發行總線打包輸出，完全保留平台安全證書指紋，絕無任何二次封裝，請安心下載安裝。"
                : "所有安装程序均由欧易平台安全发行总线打包输出，完全保留平台安全证书指纹，绝无任何二次封装，请安心下载安装。"}
            </p>
          </div>

        </div>
      </section>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // 4. RENDER FOR DESKTOP ONLY (diannao)
  // ────────────────────────────────────────────────────────────────────────
  if (currentRoute === "diannao") {
    return (
      <section id="desktop-downloads" className="py-16 md:py-24 bg-[#0b0e11] text-zinc-300 border-b border-zinc-900 scroll-mt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-semibold font-mono">
              <Monitor size={12} className="text-yellow-500 animate-pulse" />
              <span>{isHant ? "電腦桌面端下載專區" : "电脑桌面端下载专区"}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-normal">
              {isHant ? "歐易 OKX 原生桌面行情交易系統" : "欧易 OKX 原生桌面行情交易系统"}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {isHant
                ? "為專業看盤與量化對沖用戶打造，直接調用本機硬體渲染 K 線，超低延遲，運行更流暢。"
                : "为专业看盘与量化对冲用户打造，直接调用本机硬件渲染 K 线，超低延迟，运行更流畅。"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Windows */}
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <Laptop size={24} className="text-blue-400" />
                <h4 className="text-white text-sm font-extrabold">Windows 64-bit</h4>
                <p className="text-zinc-500 text-xs">{isHant ? "適用 Windows 7 / 10 / 11 系統" : "适用 Windows 7 / 10 / 11 系统"}</p>
              </div>
              <button data-cta="true" className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-center font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1">
                <Download size={13} />
                <span>{isHant ? "Windows 立即下載" : "Windows 立即下载"}</span>
              </button>
            </div>

            {/* Mac M-series */}
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <Apple size={24} className="text-yellow-400" />
                <h4 className="text-white text-sm font-extrabold">macOS (Apple Silicon)</h4>
                <p className="text-zinc-500 text-xs">{isHant ? "適用 M1 / M2 / M3 原生晶片" : "适用 M1 / M2 / M3 原生芯片"}</p>
              </div>
              <button data-cta="true" className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white text-center font-extrabold text-xs rounded-xl border border-zinc-800 transition flex items-center justify-center gap-1">
                <Download size={13} />
                <span>{isHant ? "Mac M系列下載" : "Mac M系列下载"}</span>
              </button>
            </div>

            {/* Mac Intel */}
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <Apple size={24} className="text-zinc-400" />
                <h4 className="text-white text-sm font-extrabold">macOS (Intel Core)</h4>
                <p className="text-zinc-500 text-xs">{isHant ? "適用 Intel 經典酷睿處理器" : "适用 Intel 经典酷睿处理器"}</p>
              </div>
              <button data-cta="true" className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white text-center font-extrabold text-xs rounded-xl border border-zinc-800 transition flex items-center justify-center gap-1">
                <Download size={13} />
                <span>{isHant ? "Mac Intel下載" : "Mac Intel下载"}</span>
              </button>
            </div>
          </div>

          {/* Desktop troubleshoot guide */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <Terminal size={16} className="text-yellow-500" />
              <span>{isHant ? "電腦客戶端常見安裝疑難排解" : "电脑客户端常见安装疑难排解"}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-zinc-400 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-zinc-200">{isHant ? "Windows 提示 SmartScreen 阻擋？" : "Windows 提示 SmartScreen 阻挡？"}</h4>
                <p className="text-zinc-550 leading-relaxed">
                  {isHant
                    ? "由於本程序屬於加密貨幣交易終端，在未向微軟申請商業白名單時會被系統提示阻止。安裝時點擊警告彈窗中的【更多資訊】字樣，隨後點擊下方出現的【仍要運行】按鈕即可完成正常安裝。"
                    : "由于本程序属于加密货币交易终端，在未向微软申请商业白名单时会被系统提示阻止。安装时点击警告弹窗中的【更多信息】字样，随后点击下方出现的【仍要运行】按钮即可完成正常安装。"}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-zinc-200">{isHant ? "macOS 提示應用已損壞，應移至廢紙簍？" : "macOS 提示应用已损坏，应移至废纸篓？"}</h4>
                <p className="text-zinc-550 leading-relaxed">
                  {isHant
                    ? "這是 macOS 的 Gatekeeper 安全檢測保護機制。解決方法：在 Mac 打開【終端】(Terminal)，複製並粘貼命令 `sudo xattr -r -d com.apple.quarantine /Applications/OKX.app` 並按回車，輸入 Mac 的鎖屏密碼（輸入時不顯示）回車確認後，即可流暢開啟。"
                    : "这是 macOS 的 Gatekeeper 安全检测保护机制。解决方法：在 Mac 打开【终端】(Terminal)，复制并粘贴命令 `sudo xattr -r -d com.apple.quarantine /Applications/OKX.app` 并按回车，输入 Mac 的锁屏密码（输入时不显示）回车确认后，即可流畅开启。"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // 5. RENDER FOR IOS ONLY (pingguo)
  // ────────────────────────────────────────────────────────────────────────
  if (currentRoute === "pingguo") {
    return (
      <section id="ios-downloads" className="py-16 md:py-24 bg-[#0b0e11] text-zinc-300 border-b border-zinc-900 scroll-mt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-semibold font-mono">
              <Apple size={12} className="text-yellow-500" />
              <span>{isHant ? "蘋果 iOS 下載專區" : "苹果 iOS 下载专区"}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-normal">
              {isHant ? "歐易 iOS 客戶端安全安裝與更新指引" : "欧易 iOS 客户端安全安装与更新指引"}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {isHant
                ? "受 iOS 系統政策限制，國內 App Store 無法直接搜尋下載，需配合海外 Apple ID 完成安裝："
                : "受 iOS 系统政策限制，国内 App Store 无法直接搜索下载，需配合海外 Apple ID 完成安装："}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overseas App Store */}
            <div className="bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
                  <Apple size={24} />
                </div>
                <h4 className="text-white text-base font-extrabold">{isHant ? "App Store 平台下載 (推薦)" : "App Store 平台下载 (推荐)"}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {isHant
                    ? "使用海外（港區、美區等）Apple ID 登入應用商店，直接搜尋「OKX」即可免費下載並隨商店無感自動更新，極度安全穩定。"
                    : "使用海外（港区、美区等）Apple ID 登录应用商店，直接搜索「OKX」即可免费下载并随商店无感自动更新，极度安全稳定。"}
                </p>
              </div>
              <button data-cta="true" className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black text-center font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1">
                <ExternalLink size={13} />
                <span>{isHant ? "訪問 App Store 下載" : "访问 App Store 下载"}</span>
              </button>
            </div>

            {/* TestFlight Option */}
            <div className="bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Smartphone size={24} />
                </div>
                <h4 className="text-white text-base font-extrabold">TestFlight Beta {isHant ? "測試通道" : "测试通道"}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {isHant
                    ? "若沒有海外 Apple ID，可透過蘋果平台 TestFlight 測試員招募管道完成安裝（受招募名額限制，安裝前需查看配額）。"
                    : "若没有海外 Apple ID，可通过苹果平台 TestFlight 测试员招募通道完成安装（受招募名额限制，安装前需查看配额）。"}
                </p>
              </div>
              <button data-cta="true" className="w-full py-3 bg-zinc-900 hover:bg-zinc-850 text-white text-center font-extrabold text-xs rounded-xl border border-zinc-800 transition flex items-center justify-center gap-1">
                <ExternalLink size={13} />
                <span>{isHant ? "獲取 TestFlight 測試名額" : "获取 TestFlight 测试名额"}</span>
              </button>
            </div>
          </div>

          {/* iOS config steps */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <HelpCircle size={16} className="text-yellow-500" />
              <span>{isHant ? "海外 Apple ID 切換登錄步驟" : "海外 Apple ID 切换登录步骤"}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400 leading-relaxed">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-yellow-500 font-mono">STEP 01</span>
                <h4 className="font-bold text-zinc-200">{isHant ? "退出當前 App Store 賬戶" : "退出当前 App Store 账户"}</h4>
                <p className="text-zinc-550 leading-relaxed">
                  {isHant
                    ? "打開 iPhone 自帶的【App Store】，點擊右上角的個人頭像圖標，拉至頁面最底部，點擊【Sign Out】（退出登錄）。"
                    : "打开 iPhone 自带的【App Store】，点击右上角的个人头像图标，拉至页面最底部，点击【Sign Out】（退出登录）。"}
                </p>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-yellow-500 font-mono">STEP 02</span>
                <h4 className="font-bold text-zinc-200">{isHant ? "登錄非限制區海外 ID" : "登录非限制区海外 ID"}</h4>
                <p className="text-zinc-550 leading-relaxed">
                  {isHant
                    ? "在頭像登入框中，輸入您已擁有的海外 Apple ID 和密碼，點擊 Sign In 登入（注意：請勿在 iPhone 系統的【設置】中登入，只在 App Store 登入）。"
                    : "在头像登录框中，输入您已拥有的海外 Apple ID 和密码，点击 Sign In 登录（注意：请勿在 iPhone 系统的【设置】中登录，只在 App Store 登录）。"}
                </p>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-yellow-500 font-mono">STEP 03</span>
                <h4 className="font-bold text-zinc-200">{isHant ? "搜索並直接下載 OKX" : "搜索并直接下载 OKX"}</h4>
                <p className="text-zinc-550 leading-relaxed">
                  {isHant
                    ? "登入成功後，商店界面會自動切換為對應地區語言。直接在搜索框搜索“OKX”，點擊獲取安裝正裝 APP 即可。"
                    : "登录成功后，商店界面会自动切换为对应地区语言。直接在搜索框搜索“OKX”，点击获取安装正装 APP 即可。"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // 6. RENDER FOR ANDROID ONLY (anzhuo)
  // ────────────────────────────────────────────────────────────────────────
  if (currentRoute === "anzhuo") {
    return (
      <section id="android-downloads" className="py-16 md:py-24 bg-[#0b0e11] text-zinc-300 border-b border-zinc-900 scroll-mt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-semibold font-mono">
              <Smartphone size={12} className="text-yellow-500" />
              <span>{isHant ? "安卓 APK 下載專區" : "安卓 APK 下载专区"}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-normal">
              {isHant ? "歐易 Android 安卓平台原裝 APK 安裝包下載" : "欧易 Android 安卓平台原版 APK 安装包下载"}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {isHant
                ? "全天候對接平台發行心跳包，提供 100% 原始原版綠色安裝包，防惡意木馬注入篡改。"
                : "全天候对接平台发行心跳包，提供 100% 原始原版绿色安装包，防恶意木马注入篡改。"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* APK download */}
            <div className="bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-6 text-center md:text-left">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mx-auto md:mx-0">
                  <Download size={24} />
                </div>
                <h4 className="text-white text-base font-extrabold">{isHant ? "安卓 APK 原廠包直接下載" : "安卓 APK 原厂包直接下载"}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {isHant
                    ? "直接從安全分發服務器獲取體積約 114MB 的原版 APK 文件，安裝即可使用，方便快捷。"
                    : "直接从安全分发服务器获取体积约 114MB 的原版 APK 文件，安装即可使用，方便快捷。"}
                </p>
              </div>
              <button data-cta="true" className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black text-center font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-yellow-500/10">
                <Download size={14} className="stroke-[3]" />
                <span>{isHant ? "開始下載指引 (.apk)" : "开始下载指引 (.apk)"}</span>
              </button>
            </div>

            {/* Google Play */}
            <div className="bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-6 text-center md:text-left">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto md:mx-0">
                  <Globe size={24} />
                </div>
                <h4 className="text-white text-base font-extrabold">Google Play {isHant ? "平台商店" : "平台商店"}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {isHant
                    ? "若您的安卓手機內置有完整的 Google 服務框架，推薦直接前往 Play 商店下載正裝軟件。"
                    : "若您的安卓手机内置有完整的 Google 服务框架，推荐直接前往 Play 商店下载正装软件。"}
                </p>
              </div>
              <button data-cta="true" className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-850 text-white text-center font-extrabold text-xs rounded-xl border border-zinc-800 transition flex items-center justify-center gap-1.5">
                <ExternalLink size={14} />
                <span>{isHant ? "訪問 Google Play 商店" : "访问 Google Play 商店"}</span>
              </button>
            </div>
          </div>

          {/* Android risk warnings troubleshoot guide */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-5">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <HelpCircle size={16} className="text-yellow-500" />
              <span>{isHant ? "國產品牌安卓手機安全提示忽略流程" : "国产品牌安卓手机安全提示忽略流程"}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400 leading-relaxed">
              <div className="space-y-1.5">
                <h4 className="font-bold text-zinc-200">{isHant ? "华为手机 (鸿蒙系统)" : "华为手机 (鸿蒙系统)"}</h4>
                <p className="text-zinc-550 leading-relaxed">
                  {isHant
                    ? "部分華為設備在安裝時可能被系統的「純淨模式」限制。解決方法：在安裝提示中點擊【了解風險】，進入【設置-系統和更新】，暫時【關閉純淨模式】，或點擊【信任並允許安裝】即可。"
                    : "部分华为设备在安装时可能被系统的「纯净模式」限制。解决方法：在安装提示中点击【了解风险】，进入【设置-系统和更新】，暂时【关闭纯净模式】，或点击【信任并允许安装】即可。"}
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-zinc-200">{isHant ? "小米手机 (澎湃系统)" : "小米手机 (澎湃系统)"}</h4>
                <p className="text-zinc-550 leading-relaxed">
                  {isHant
                    ? "小米管家若警示“高風險金融理財程序”。請在安裝彈窗時，勾選【我已閱讀並知曉風險】，點擊【忽略警告】或【繼續安裝】以完成安全部署。"
                    : "小米管家若警示“高风险金融理财程序”。请在安装弹窗时，勾选【我已阅读并知晓风险】，点击【忽略警告】或【继续安装】以完成安全部署。"}
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-zinc-200">OPPO & VIVO {isHant ? "手機" : "手机"}</h4>
                <p className="text-zinc-550 leading-relaxed">
                  {isHant
                    ? "若在安裝階段彈出雲端管家警告，請不要點擊一鍵清理。點擊下方的【忽略此預警并繼續安裝】，輸入鎖屏解鎖手勢或密碼即可完成放行。"
                    : "若在安装阶段弹出云端管家警告，请不要点击一键清理。点击下方的【忽略此预警并继续安装】，输入锁屏解锁手势或密码即可完成放行。"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // 7. RENDER FOR MOBILE APP ONLY (app)
  // ────────────────────────────────────────────────────────────────────────
  if (currentRoute === "app") {
    return (
      <section id="app-downloads" className="py-16 md:py-24 bg-[#0b0e11] text-zinc-300 border-b border-zinc-900 scroll-mt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-semibold font-mono">
              <Smartphone size={12} className="text-yellow-500 animate-pulse" />
              <span>{isHant ? "移動 APP 安全通道" : "移动 APP 安全通道"}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-normal">
              {isHant ? "歐易 APP 客戶端下載 (安卓與蘋果雙軌安全通道)" : "欧易 APP 客户端下载 (安卓与苹果双轨安全通道)"}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {isHant
                ? "跳過不受信任的應用商店，安全直達平台原始版本，保障您的資金安全不受篡改包威脅。"
                : "跳过不受信任的应用商店，安全直达平台原始版本，保障您的资金安全不受篡改包威胁。"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Android */}
            <div className="bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M17.525 10.03c-.19 0-.356-.073-.487-.204a.656.656 0 0 1-.205-.487c0-.18.069-.344.205-.48a.656.656 0 0 1 .487-.204c.18 0 .344.068.48.204a.656.656 0 0 1 .204.48c0 .19-.068.356-.204.487a.656.656 0 0 1-.48.205zm-11.05 0c-.19 0-.356-.073-.487-.204a.656.656 0 0 1-.204-.487c0-.18.068-.344.204-.48a.656.656 0 0 1 .487-.204c.18 0 .344.068.48.204a.656.656 0 0 1 .204.48c0 .19-.068.356-.204.487a.656.656 0 0 1-.48.205zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.89 12h-7.78a.4.4 0 0 1-.39-.4c0-.22.17-.4.39-.4h7.78c.22 0 .39.18.39.4 0 .22-.17.4-.39.4zm2.14-3.11c-.02.43-.37.76-.8.76H8.77c-.43 0-.78-.33-.8-.76-.02-.47.35-.89.82-.89h7.32c.47 0 .84.42.82.89z" />
                  </svg>
                </div>
                <h4 className="text-white text-base font-extrabold">{isHant ? "Android 安卓手機" : "Android 安卓手机"}</h4>
                <p className="text-zinc-550 text-xs leading-relaxed">
                  {isHant
                    ? "適用所有國產品牌安卓機型，提供最新版本正裝原版 APK 檔案直接高速下載。"
                    : "适用所有国产品牌安卓机型，提供最新版本正装原版 APK 文件直接高速下载。"}
                </p>
              </div>
              <button data-cta="true" className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black text-center font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1 shadow-md shadow-yellow-500/10">
                <Download size={13} />
                <span>{isHant ? "安卓 APK 下載 (.apk)" : "安卓 APK 下载 (.apk)"}</span>
              </button>
            </div>

            {/* iOS */}
            <div className="bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-450">
                  <Apple size={24} />
                </div>
                <h4 className="text-white text-base font-extrabold">{isHant ? "iOS 蘋果手機" : "iOS 苹果手机"}</h4>
                <p className="text-zinc-550 text-xs leading-relaxed">
                  {isHant
                    ? "引導切換海外 Apple ID 從平台 App Store 下載指引正裝版本，徹底防範閃退。"
                    : "引导切换海外 Apple ID 从平台 App Store 下载指引正装版本，彻底防范闪退。"}
                </p>
              </div>
              <button data-cta="true" className="w-full py-3 bg-zinc-900 hover:bg-zinc-850 text-white text-center font-extrabold text-xs rounded-xl border border-zinc-800 transition flex items-center justify-center gap-1">
                <ExternalLink size={13} />
                <span>{isHant ? "獲取 iOS 蘋果下載指引" : "获取 iOS 苹果下载指引"}</span>
              </button>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // 8. DEFAULT RENDER FOR GENERAL PAGES (home, xiazai, guanwang)
  // ────────────────────────────────────────────────────────────────────────
  return (
    <section id="download" className="py-16 md:py-24 bg-[#0b0e11] text-zinc-300 border-b border-zinc-900 scroll-mt-18 font-normal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Route-based Action/Alert Center */}
        <div className="space-y-6 mb-12">
          <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-zinc-950 border border-yellow-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-yellow-500/2">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-yellow-500/20 uppercase tracking-wider font-mono">
                PROMO OFFERS
              </div>
              <h3 className="text-white font-extrabold text-lg">{isHant ? "歐易長期直連專線：註冊即享 20% 交易手續費扣減" : "欧易长期直连专线：注册即享 20% 交易手续费扣减"}</h3>
              <p className="text-zinc-400 text-xs max-w-2xl leading-relaxed">
                {isHant
                  ? <>通過本渠道註冊並鎖定推薦邀請碼 <span className="text-yellow-500 font-bold font-mono">ACE528829</span>，交易大廳會自動進行交易手續費抵扣，每天夜間結轉返現回您的個人資金帳戶。</>
                  : <>通过本渠道注册并锁定推荐邀请码 <span className="text-yellow-500 font-bold font-mono">ACE528829</span>，交易大厅会自动进行交易手续费抵扣，每天夜间结转返现回您的个人资金账户。</>}
              </p>
            </div>
            <button 
              data-cta="true"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold text-xs shrink-0 select-none cursor-pointer transition active:scale-95 flex items-center gap-1 shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/20"
            >
              <span>{isHant ? "立即開啟歐易註冊專線" : "立即开启欧易注册专线"}</span>
              <ChevronRight size={14} className="stroke-3 animate-pulse" />
            </button>
          </div>
        </div>
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-semibold font-mono">
            DOWNLOAD CENTER
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-normal">
            {isHant ? "多端原生客戶端，一鍵安全高速下載" : "多端原生客户端，一键安全高速下载"}
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            {isHant
              ? "極速直連原廠資源，防密鑰篡改與多重簽名假包，保障您的資產安全。"
              : "极速直连原厂资源，防密钥篡改与多重签名假包，保障您的资产安全。"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-zinc-950 border border-zinc-900 p-1.5 rounded-xl inline-flex gap-2">
            <button
              onClick={() => setActiveTab("mobile")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer select-none ${
                activeTab === "mobile"
                  ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/10"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Smartphone size={16} />
              <span>{isHant ? "行動端下載 (iOS / Android)" : "移动端下载 (iOS / Android)"}</span>
            </button>
            <button
              onClick={() => setActiveTab("desktop")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer select-none ${
                activeTab === "desktop"
                  ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/10"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Monitor size={16} />
              <span>{isHant ? "電腦桌面端 (Windows / macOS)" : "电脑桌面端 (Windows / macOS)"}</span>
            </button>
            <button
              onClick={() => setActiveTab("files")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer select-none ${
                activeTab === "files"
                  ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/10"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <List size={16} />
              <span>{isHant ? "純淨安裝包快照" : "纯净安装包快照"}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Mobile Apps */}
        {activeTab === "mobile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Android Card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 hover:border-zinc-850 transition flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">Android 安卓系统</h3>
                      <p className="text-zinc-500 text-xs">支持最新版 Android 14/15 稳定兼容系统</p>
                    </div>
                  </div>
                </div>
                <ul className="text-xs text-zinc-400 space-y-2.5 list-disc list-inside leading-relaxed pl-1">
                  <li>原生高保真 APK 包，体积 114.2 MB</li>
                  <li>支持国内各大手机品牌（华为、小米、OPPO等）安装校验</li>
                  <li>内嵌平台最新的 SSL 加密协议与高速分发线路</li>
                </ul>
              </div>
              <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row gap-3">
                <button data-cta="true" className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1">
                  <Download size={13} className="stroke-[3]" />
                  <span>直接下载 APK</span>
                </button>
                <button data-cta="true" className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-850 text-white font-semibold text-xs rounded-xl border border-zinc-800 transition flex items-center justify-center gap-1">
                  <ExternalLink size={13} />
                  <span>Google Play 下载</span>
                </button>
              </div>
            </div>

            {/* iOS Card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 hover:border-zinc-850 transition flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-450">
                      <Apple size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">iOS 苹果 App Store</h3>
                      <p className="text-zinc-550 text-xs">支持最新版 iPhone iOS 16/17 系统</p>
                    </div>
                  </div>
                </div>
                <ul className="text-xs text-zinc-400 space-y-2.5 list-disc list-inside leading-relaxed pl-1">
                  <li>通过平台 App Store 安全校验，彻底杜绝闪退问题</li>
                  <li>需使用非限制区域的海外 Apple ID 登录搜索下载</li>
                  <li>支持苹果原生 FaceID 与安全密钥离线解密登入</li>
                </ul>
              </div>
              <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row gap-3">
                <button data-cta="true" className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1">
                  <ExternalLink size={13} />
                  <span>App Store 下载</span>
                </button>
                <button data-cta="true" className="flex-1 py-3 bg-zinc-900 hover:bg-zinc-850 text-white font-semibold text-xs rounded-xl border border-zinc-800 transition flex items-center justify-center gap-1">
                  <ExternalLink size={13} />
                  <span>获取苹果内测证书</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Desktop Apps */}
        {activeTab === "desktop" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Windows */}
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <Laptop size={24} className="text-blue-400" />
                <h4 className="text-white text-sm font-extrabold">Windows 64-bit</h4>
                <p className="text-zinc-555 text-xs">支持 Win 7 / 10 / 11 操作系统</p>
              </div>
              <button data-cta="true" className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-center font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1">
                <Download size={13} />
                <span>Windows 客户端下载</span>
              </button>
            </div>

            {/* Mac M-series */}
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <Apple size={24} className="text-yellow-400" />
                <h4 className="text-white text-sm font-extrabold">macOS (Apple Silicon)</h4>
                <p className="text-zinc-555 text-xs">支持 M1 / M2 / M3 原生芯片系列</p>
              </div>
              <button data-cta="true" className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white text-center font-extrabold text-xs rounded-xl border border-zinc-800 transition flex items-center justify-center gap-1">
                <Download size={13} />
                <span>Mac M系列下载</span>
              </button>
            </div>

            {/* Mac Intel */}
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 hover:border-zinc-850 transition flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <Apple size={24} className="text-zinc-400" />
                <h4 className="text-white text-sm font-extrabold">macOS (Intel Core)</h4>
                <p className="text-zinc-555 text-xs">支持 Intel 经典酷睿系列处理器</p>
              </div>
              <button data-cta="true" className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white text-center font-extrabold text-xs rounded-xl border border-zinc-800 transition flex items-center justify-center gap-1">
                <Download size={13} />
                <span>Mac Intel芯片下载</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Checksum Files */}
        {activeTab === "files" && (
          <div className="overflow-x-auto border border-zinc-900 rounded-2xl bg-zinc-950/20">
            <table className="w-full text-xs text-left text-zinc-400 divide-y divide-zinc-900">
              <thead className="bg-zinc-950 text-[10px] uppercase text-zinc-500 tracking-wider font-mono">
                <tr>
                  <th className="p-4">物理文件名</th>
                  <th className="p-4">适用平台</th>
                  <th className="p-4">文件大小</th>
                  <th className="p-4">公认校验值 (SHA-256)</th>
                  <th className="p-4 text-right">直接下载</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/60 text-zinc-300">
                <tr className="hover:bg-zinc-900/10">
                  <td className="p-4 font-mono text-zinc-200">OKX_Android_v6.82.apk</td>
                  <td className="p-4">安卓 APK 安装包</td>
                  <td className="p-4 font-mono text-[11px]">114.2 MB</td>
                  <td className="p-4 font-mono text-[11px] text-zinc-650">8d929b9cf8cef910a202c89dbf719a0a19...</td>
                  <td className="p-4 text-right">
                    <button data-cta="true" className="text-yellow-500 hover:underline font-bold">下载 APK</button>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-900/10">
                  <td className="p-4 font-mono text-zinc-200">OKX_Windows_x64.exe</td>
                  <td className="p-4">Windows x64 平台</td>
                  <td className="p-4 font-mono text-[11px]">132.8 MB</td>
                  <td className="p-4 font-mono text-[11px] text-zinc-650">9c0a182ee0dbb9ca8101a719c0dbdfbb82...</td>
                  <td className="p-4 text-right">
                    <button data-cta="true" className="text-yellow-500 hover:underline font-bold">下载 exe</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}
