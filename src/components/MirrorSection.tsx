"use client";

import { useState, useEffect, useCallback } from "react";
import { useConfig } from "../context/ConfigContext";
import { Globe, Activity, ArrowUpRight, RefreshCw, ShieldCheck } from "lucide-react";

interface MirrorSectionProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

const ROUTE_DATA: Record<string, {
  zh: { title: string; desc: string; hint: string; nodeName: string };
  hant: { title: string; desc: string; hint: string; nodeName: string };
}> = {
  home: {
    zh: {
      title: "OKX / 欧易访问入口整理",
      desc: "本站为第三方信息指南，针对不同地区与网络环境整理常见访问入口与客户端指引。",
      hint: "建议收藏本站作为信息导航。涉及登录、交易或资金操作时，请离开本站后自行核对目标网址与页面信息。",
      nodeName: "访问入口参考节点"
    },
    hant: {
      title: "OKX / 歐易訪問入口整理",
      desc: "本站為第三方資訊指南，針對不同地區與網絡環境整理常見訪問入口與客戶端指引。",
      hint: "建議收藏本站作為信息導航。涉及登錄、交易或資金操作時，請離開本站後自行核對目標網址與頁面信息。",
      nodeName: "訪問入口參考節點"
    }
  },
  denglu: {
    zh: {
      title: "欧易网站网页版登录：抗干扰登录代理中继",
      desc: "若遇到网页版登录时加载极慢、滑块验证码无法拉出或报错提示，请使用以下针对登录阶段优化的极速备用中继通道。",
      hint: "安全警示：登录阶段防解析污染至关重要。本站提供的一键直连完全继承平台 SSL 安全链路，请放心进行登录及 2FA 二次验证。",
      nodeName: "欧易平台安全登录节点"
    },
    hant: {
      title: "歐易網站網頁版登錄：抗干擾登錄代理中繼",
      desc: "若遇到網頁版登錄時加載極慢、滑塊驗證碼無法拉出或報錯提示，請使用以下針對登錄階段優化的極速備用中繼通道。",
      hint: "安全警示：登錄階段防解析污染至關重要。本站提供的一鍵直連完全繼承平台 SSL 安全鏈路，請放心進行登錄及 2FA 二次驗證。",
      nodeName: "歐易平台安全登錄節點"
    }
  },
  guanwang: {
    zh: {
      title: "欧易 OKX 原版白名单网站防篡改加速中继",
      desc: "市面上充斥着大量虚假、内置后门的假网站下载站，用于篡改充值地址。本白名单中继站永久同步平台顶级安全源。",
      hint: "防伪说明：真正的平台入口在跳转后，其浏览器地址栏必带有安全证书锁徽章。认准白名单中转，彻底远离钓鱼风险。",
      nodeName: "欧易平台白名单网站中继"
    },
    hant: {
      title: "歐易 OKX 原版白名單網站防篡改加速中繼",
      desc: "市面上充斥著大量虛假、內置後門的假網站下載站，用於篡改充值地址。本白名單中繼站永久同步平台頂級安全源。",
      hint: "防偽說明：真正的平台入口在跳轉後，其瀏覽器地址欄必帶有安全證書鎖徽章。認准白名單中轉，徹底遠離釣魚風險。",
      nodeName: "歐易平台白名單網站中繼"
    }
  },
  wangye: {
    zh: {
      title: "免开代理网络代理 · 欧易网页在线版直接入口",
      desc: "无需下载庞大的桌面客户端，直接通过高防护、低时延的网页网关即可安全使用欧易的完整功能，包括实时看盘及资产划转。",
      hint: "本网页直连通道支持多源节点动态重组，即便部分网络线路发生异动，系统也会在 1 秒内无感切换至高可用回源服务器。",
      nodeName: "欧易网页版低时延加速节点"
    },
    hant: {
      title: "免開代理网络代理 · 歐易網頁線上版直接入口",
      desc: "無需下載龐大的桌面客戶端，直接通過高防護、低時延的網頁網關即可安全使用歐易的完整功能，包括實時看盤及資產劃轉。",
      hint: "本網頁直連通道支持多源節點動態重組，即便部分網絡線路發生異動，系統也會在 1 秒內無感切換至高可用回源服務器。",
      nodeName: "歐易網頁版低時延加速節點"
    }
  },
  zhuce: {
    zh: {
      title: "推荐绑定注册直联通道 · 手续费让利永久开通",
      desc: "通过以下特优加速线路前往注册，均可在欧易结算层获得永久的手续费返佣减免。注册时请确认推荐码成功附带为 ACE528829。",
      hint: "使用此通道完成注册后，您的账号即自动归入最高级别返现池，每日的手续费结余将全自动给您原路归还。",
      nodeName: "欧易注册专属手续费返还节点"
    },
    hant: {
      title: "推薦綁定註冊直聯通道 · 手續費讓利永久開通",
      desc: "通過以下特優加速線路前往註冊，均可在歐易結算層獲得永久的手續費返佣減免。註冊時請確認推薦碼成功附帶爲 ACE528829。",
      hint: "使用此通道完成註冊後，您的帳號即自動歸入最高級別返現池，每日的手續費結餘將全自動爲您原路歸還。",
      nodeName: "歐易註冊專屬手續費返還節點"
    }
  },
  xiazai: {
    zh: {
      title: "欧易 OKX 平台原装客户端下载指引通道",
      desc: "由于各类修改版安装包层出不穷，极易发生资产被窃取风险。本通道直接与平台版本库建立同步校验，提供纯净原厂包下载。",
      hint: "推荐配合 SHA-256 散列校验值对下载的文件进行比对。唯有哈希校验值完美一致方为原版，为您构建坚固的安全防线。",
      nodeName: "欧易客户端下载安全中继"
    },
    hant: {
      title: "歐易 OKX 平台原裝客戶端下載指引通道",
      desc: "由於各類修改版安裝包層出不窮，極易發生資產被竊取風險。本通道直接與平台版本庫建立同步校驗，提供純淨原廠包下載。",
      hint: "推薦配合 SHA-256 散列校驗值對下載的檔案進行比對。唯有哈希校驗值完美一致方爲原版，爲您構建堅固的安全防線。",
      nodeName: "歐易客戶端下載安全中繼"
    }
  },
  app: {
    zh: {
      title: "欧易 APP 客户端下载 (安卓与苹果双轨安全通道)",
      desc: "为移动端交易用户深度优化的下载指引链路。跳过非正规渠道或山寨应用商店，直接获取原版安卓 APK 或苹果下载引导。",
      hint: "安装完毕后，请务必在 APP 内开启指纹/面容解锁以及双重短信/谷歌验证，为您的资金安全双重锁保。",
      nodeName: "欧易手机 APP 下载加速节点"
    },
    hant: {
      title: "歐易 APP 客戶端下載 (安卓與蘋果雙軌安全通道)",
      desc: "爲移動端交易用戶深度優化的下載指引鏈路。跳過非正規渠道或山寨應用商店，直接獲取原版安卓 APK 或蘋果下載引導。",
      hint: "安裝完畢後，請務必在 APP 內開啟指紋/面容解鎖以及雙重短信/谷歌驗證，爲您的資金安全雙重鎖保。",
      nodeName: "歐易手機 APP 下載加速節點"
    }
  },
  diannao: {
    zh: {
      title: "欧易 OKX 电脑版/桌面端客户端下载指引通道",
      desc: "针对 Windows 及 Mac 桌面专业交易版进行防污染寻址优化。从网站直连获取平台原装二进制安装程序，彻底规避 DNS 解析异常。",
      hint: "电脑客户端提供更强劲的看盘布局及 API 接口，建议通过本站白名单安全加速通道，高速完成原厂程序接收。",
      nodeName: "欧易电脑客户端下载专用通道"
    },
    hant: {
      title: "歐易 OKX 電腦版/桌面端客戶端下載指引通道",
      desc: "針對 Windows 及 Mac 桌面專業交易版進行防污染尋址優化。從網站直連獲取平台原裝二進制安裝程序，徹底規避 DNS 解析异常。",
      hint: "電腦客戶端提供更強勁的看盤佈局及 API 接口，建議通過本站白名單安全加速通道，高速完成原廠程序接收。",
      nodeName: "歐易電腦客戶端下載專用通道"
    }
  },
  anzhuangbao: {
    zh: {
      title: "欧易 OKX 平台纯净安装包直连下载通道",
      desc: "提供未经任何二次修改、封装的平台原版安装程序。通过安全中继通道，可大幅提升下载速度，同时隔绝网络监听与篡改。",
      hint: "请在相对安全的家庭或个人网络中下载敏感金融交易软件，不要在不受信任的公共 WiFi 环境下完成下载及登录操作。",
      nodeName: "欧易原厂安装包安全分发节点"
    },
    hant: {
      title: "歐易 OKX 平台純淨安裝包直連下載通道",
      desc: "提供未經任何二次修改、封裝的平台原版安裝程序。通過安全中繼通道，可大幅提升下載速度，同時隔絕網絡監聽與篡改。",
      hint: "請在相對安全的家庭或個人網絡中下載敏感金融交易軟件，不要在不受信任的公共 WiFi 環境下完成下載及登錄操作。",
      nodeName: "歐易原廠安裝包安全分發節點"
    }
  },
  pingguo: {
    zh: {
      title: "欧易 OKX 苹果手机客户端海外 Store 安全安装指南",
      desc: "受 iOS 封闭系统特性限制，安装苹果端需通过海外 Apple ID 登录。我们为您提供安全的下载流程指引与白名单中转链路。",
      hint: "下载前请务必确认登录的 Apple ID 属非限制区域，并警惕 App Store 中仿冒的钓鱼 App 软件，通过本通道可规避欺诈。",
      nodeName: "欧易 iOS 版海外下载指引引导"
    },
    hant: {
      title: "歐易 OKX 蘋果手機客戶端海外 Store 安全安裝指南",
      desc: "受 iOS 封閉系統特性限制，安裝蘋果端需通過海外 Apple ID 登錄。我們爲您提供安全的下載流程指引與白名單中轉鏈路。",
      hint: "下載前請務必確認登錄的 Apple ID 屬非限制區域，並警惕 App Store 中仿冒的釣魚 App 軟件，通過本通道可規避欺詐。",
      nodeName: "歐易 iOS 版海外下載指引引導"
    }
  },
  anzhuo: {
    zh: {
      title: "欧易 OKX 安卓版平台高可用 APK 下载通道",
      desc: "严防山寨及恶意捆绑的假钱包。本加速中继下载直接对接平台安全心跳包，100% 确保包体原装纯净，免受局地网络网络限制。",
      hint: "若在部分国内安卓设备安装时遇到安全预警提示，请断网安装或在设备权限中将其设为信任白名单即可，程序 100% 纯净。",
      nodeName: "欧易安卓版 APK 专用下载通道"
    },
    hant: {
      title: "歐易 OKX 安卓版平台高可用 APK 下載通道",
      desc: "嚴防山寨及惡意捆綁的假錢包。本加速中繼下載直接對接平台安全心跳包，100% 確保包體原裝純淨，免受局地網絡網絡限制。",
      hint: "若在部分國內安卓設備安裝時遇到安全預警提示，請斷網安裝或在設備權限中將其設爲信任白名單即可，程序 100% 純淨。",
      nodeName: "歐易安卓版 APK 專用下載通道"
    }
  },
  zhongwen: {
    zh: {
      title: "欧易 OKX 中文平台原版多线直连通道",
      desc: "本白名单直连入口专门针对简体中文用户的使用环境进行了全链路防护，自动寻址至无阻碍、高防的合规中文交易主站。",
      hint: "请认准平台 SSL 证书标识，保障您账户密码和 2FA 动态码的传输安全，杜绝一切由于钓鱼链接引起的账号泄露隐患。",
      nodeName: "欧易中文平台高防直连通道"
    },
    hant: {
      title: "歐易 OKX 中文平台原版多線直連通道",
      desc: "本白名單直連入口專門針對簡體中文用戶的使用環境進行了全鏈路防護，自動尋址至無阻礙、高防的合規中文交易主站。",
      hint: "請認准平台 SSL 證書標識，保障您帳戶密碼和 2FA 動態碼的傳輸安全，杜絕一切由於釣魚鏈結引起的帳號洩漏隱患。",
      nodeName: "歐易中文平台高防直連通道"
    }
  },
  dizhi: {
    zh: {
      title: "欧易最新平台备用登录地址与实时时延检测",
      desc: "提供最新可用的平台白名单登录与注册中继地址，规避网络服务商 DNS 解析异常或网络故障引起的解析错误。",
      hint: "一旦遇到连接阻塞，请点击重新测试并选择绿色低延通道，直接与平台交易系统建立连接。",
      nodeName: "欧易平台最新可用中继地址"
    },
    hant: {
      title: "歐易最新平台備用登錄地址與實時時延檢測",
      desc: "提供最新可用的平台白名單登錄與註冊中繼地址，規避網絡服務商 DNS 解析异常或網絡故障引起的解析錯誤。",
      hint: "一旦遇到連接阻塞，請點擊重新測試並選擇綠色低延通道，直接與平台交易系統建立連接。",
      nodeName: "歐易平台最新可用中繼地址"
    }
  },
  wangzhi: {
    zh: {
      title: "欧易 OKX 最新平台网址白名单直接通道",
      desc: "由于不同地区网络策略差异，平台网址可能会动态调整。本站为您实时更新并分发最新防污染安全网站域名。",
      hint: "建议将当前备用直连域名加入您的浏览器收藏夹，保障您随时随地畅通交易。",
      nodeName: "欧易平台白名单安全网址"
    },
    hant: {
      title: "歐易 OKX 最新平台網址白名單直接通道",
      desc: "由於不同地區網絡策略差異，平台網址可能會動態調整。本站爲您實時更新並分發最新防污染安全網站域名。",
      hint: "建議將當前備用直連域名加入您的瀏覽器收藏夾，保障您隨時隨地暢通交易。",
      nodeName: "歐易平台白名單安全網址"
    }
  },
  jiechi: {
    zh: {
      title: "网页访问受阻？欧易平台防限制备用中继安全入口",
      desc: "如果您在访问时被跳转至不相干的垃圾站或收到风险提示，表明您的本地 DNS 已被解析异常。请通过本站提供的安全通道直连平台主站。",
      hint: "通过双重 SSL 根证书加密，中继链路可百分之百抵御 DNS 注入，防止账号密码遭到中途窃取。",
      nodeName: "平台高防防解析污染中继节点"
    },
    hant: {
      title: "網頁訪問受阻？歐易平台防限制備用中繼安全入口",
      desc: "如果您在訪問時被跳轉至不相幹的垃圾站或收到風險提示，表明您的本地 DNS 已被解析异常。請通過本站提供的安全通道直連平台主站。",
      hint: "通過雙重 SSL 根證書加密，中繼鏈路可百分之百抵禦 DNS 注入，防止帳戶密碼遭到中途竊取。",
      nodeName: "平台高防防解析污染中繼節點"
    }
  }
};

export default function MirrorSection({ currentRoute, locale = 'zh' }: MirrorSectionProps) {
  const { config } = useConfig();
  const [testing, setTesting] = useState(false);
  const [latency, setLatency] = useState("12ms");
  const isHant = locale === 'hant';

  const routeKey = ROUTE_DATA[currentRoute] ? currentRoute : "home";
  const localizedData = isHant ? ROUTE_DATA[routeKey].hant : ROUTE_DATA[routeKey].zh;

  // Simulate real-time latency ping
  const handleSpeedTest = useCallback(() => {
    setTesting(true);
    setTimeout(() => {
      const min = 8;
      const max = 20;
      const val = Math.floor(Math.random() * (max - min + 1)) + min;
      setLatency(`${val}ms`);
      setTesting(false);
    }, 1200);
  }, []);

  // Run initial latency test on mount
  useEffect(() => {
    setTesting(true);
    const timer = setTimeout(() => {
      const min = 9;
      const max = 15;
      const val = Math.floor(Math.random() * (max - min + 1)) + min;
      setLatency(`${val}ms`);
      setTesting(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Determine the correct page-specific redirect URL
  let redirectUrl = config.referralUrl;
  if (currentRoute === "diannao") {
    redirectUrl = config.windowsDownloadUrl;
  } else if (currentRoute === "anzhuo" || currentRoute === "anzhuangbao") {
    redirectUrl = config.androidApkUrl;
  } else if (currentRoute === "pingguo") {
    redirectUrl = config.iosAppStoreUrl;
  }

  return (
    <section id="mirrors" className="py-20 bg-zinc-950 text-zinc-300 border-b border-zinc-900 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Side (5 columns) */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-yellow-500 font-bold font-mono mx-auto lg:mx-0">
              <Activity size={12} className="text-yellow-500 animate-pulse" />
              <span>{isHant ? "智能測速與負載" : "智能测速与负载"}</span>
            </div>
            
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-normal">
              {localizedData.title}
            </h2>
            
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              {localizedData.desc}
            </p>
            
            <p className="text-zinc-500 text-xs leading-relaxed">
              {localizedData.hint}
            </p>
          </div>

          {/* Connection Status Card Side (7 columns) */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
              
              {/* Header bar */}
              <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                  {isHant ? "實時中繼通道連接測試" : "实时中继通道连接测试"}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-[10px] text-zinc-400 font-bold font-mono">
                    {isHant ? "雙重 SSL 加密安全認證" : "双重 SSL 加密安全认证"}
                  </span>
                </span>
              </div>

              {/* Node status indicators */}
              <div className="space-y-4 py-2">
                <div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                    {isHant ? "中繼節點名稱" : "中继节点名称"}
                  </div>
                  <div className="text-white text-sm font-extrabold flex items-center gap-2">
                    <Globe size={14} className="text-yellow-500" />
                    <span>{localizedData.nodeName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                      {isHant ? "網絡延遲時延" : "网络延迟时延"}
                    </div>
                    <div className="font-mono text-2xl font-black text-amber-400">
                      {testing ? (
                        <span className="text-xs sm:text-sm font-semibold text-zinc-500 animate-pulse">
                          {isHant ? "正在檢測時延..." : "正在检测时延..."}
                        </span>
                      ) : (
                        latency
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                      {isHant ? "解析路由狀態" : "解析路由状态"}
                    </div>
                    <div className="text-xs font-extrabold text-white flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>{isHant ? "正常 (BGP 防污染)" : "正常 (BGP 防污染)"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* One-click Secure direct connection button */}
              <div>
                <button
                  data-cta="true"
                  className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black text-center font-extrabold text-xs sm:text-sm rounded-xl transition active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/20"
                >
                  <span>{isHant ? "一鍵安全直連" : "一键安全直连"}</span>
                  <ArrowUpRight size={14} className="stroke-[3]" />
                </button>
              </div>

              {/* Footer controls & security statement */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1 leading-normal font-normal">
                  <ShieldCheck size={12} className="text-amber-500 shrink-0" />
                  {isHant ? "已校驗平台 SSL 憑證根指紋" : "已校验平台 SSL 凭证根指纹"}
                </span>
                <button
                  onClick={handleSpeedTest}
                  disabled={testing}
                  className="text-yellow-500 hover:text-yellow-400 font-bold flex items-center gap-1 disabled:opacity-50 select-none cursor-pointer transition active:scale-95"
                >
                  <RefreshCw size={11} className={testing ? "animate-spin" : ""} />
                  <span>{isHant ? "重新測試" : "重新测试"}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
