import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import { Calendar, ArrowRight, UserCheck, Download, ExternalLink } from "lucide-react";

interface TutorialsHubProps {
  locale?: 'zh' | 'hant';
}

const coreRoutes = [
  "zhuce", "denglu", "app", "diannao", "anzhuangbao",
  "pingguo", "wangye", "anzhuo", "guanwang", "zhongwen", "xiazai"
];

function getCurrentDateString() {
  const now = new Date();
  const utc8Time = now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8);
  const dateObj = new Date(utc8Time);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function TutorialsHub({ locale = 'zh' }: TutorialsHubProps) {
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;
  const prefix = isHant ? "/hant" : "";
  const currentDate = getCurrentDateString();

  // Get all active published tutorial articles (exclude home, hub page, core landing pages, and future-dated scheduled articles)
  const allArticles = Object.values(seoData)
    .filter(item => {
      if (item.route === "home" || item.route === "xinshou-jiaocheng") return false;
      if (coreRoutes.includes(item.route)) return false;
      if (item.publishDate && item.publishDate > currentDate) return false;
      return true;
    })
    .sort((a, b) => {
      // Sort by publishDate descending (for scheduled articles), and original stable pages follow
      const dateA = a.publishDate || "2026-05-20";
      const dateB = b.publishDate || "2026-05-20";
      if (dateA !== dateB) {
        return dateB.localeCompare(dateA);
      }
      return a.route.localeCompare(b.route);
    });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 scroll-mt-20">
      <div className="space-y-16">
        
        {/* Unified Card Grid for All Published Articles */}
        {allArticles.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950/20 border border-zinc-900 rounded-3xl">
            <p className="text-zinc-500 text-sm">
              {isHant ? "暫無已發佈的教程文章，請稍後再來。" : "暂无已发布的教程文章，请稍后再来。"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.map((article) => {
              // Clean up title (remove OKX suffixes for clean UI display)
              const cleanTitle = article.title
                .replace(" - 欧意OKEX", "")
                .replace(" - 歐意OKEX", "")
                .replace(" - ox.xxmsanguo.com", "");

              return (
                <Link
                  key={article.route}
                  href={`${prefix}/${article.route}/`}
                  className="group flex flex-col justify-between p-6 rounded-3xl bg-zinc-950/30 backdrop-blur-sm border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-yellow-500/[0.01] cursor-pointer select-none"
                >
                  <div className="space-y-4">
                    {/* Top Badge and Date */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-bold tracking-wide uppercase">
                        {article.tabLabel}
                      </span>
                      {article.publishDate && (
                        <div className="flex items-center gap-1 text-zinc-605 font-mono text-[10px]">
                          <Calendar className="w-3 h-3 text-zinc-650" />
                          <span>{article.publishDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Title and Intro */}
                    <div className="space-y-2">
                      <h3 className="text-zinc-200 group-hover:text-yellow-500 font-bold text-base sm:text-lg transition-colors leading-snug line-clamp-2">
                        {cleanTitle}
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                        {article.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Link Button */}
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400 group-hover:text-yellow-500 font-bold tracking-wide pt-4 border-t border-zinc-900/60 mt-6 transition-colors">
                    <span>{isHant ? "繼續閱讀" : "继续阅读"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom Section: Core Navigation Internal Links */}
        <div className="pt-16 border-t border-zinc-900/80 mt-16 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight">
              {isHant ? "OKX / 歐易訪問入口與教程整理" : "OKX / 欧易访问入口与教程整理"}
            </h3>
            <p className="text-zinc-550 text-xs md:text-sm leading-relaxed">
              {isHant 
                ? "本站為第三方資訊指南，整理常見訪問入口、下載指引與使用教程，不提供交易、登錄或資金服務。" 
                : "本站为第三方信息指南，整理常见访问入口、下载指引与使用教程，不提供交易、登录或资金服务。"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Group 1: 注册与登录 */}
            <div className="p-6 rounded-3xl bg-zinc-950/20 border border-zinc-900/60 backdrop-blur-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-900/60">
                  <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500 border border-yellow-500/15">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-zinc-200 font-bold text-sm">
                      {isHant ? "註冊與登錄教程" : "注册与登录教程"}
                    </h4>
                    <p className="text-zinc-500 text-[10px]">
                      {isHant ? "第三方資料整理" : "第三方资料整理"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { route: "zhuce", label: isHant ? "註冊流程指引" : "注册流程指引" },
                    { route: "denglu", label: isHant ? "安全登錄入口" : "安全登录入口" },
                    { route: "guanwang", label: isHant ? "訪問入口整理" : "访问入口整理" },
                  ].map((item) => (
                    <Link
                      key={item.route}
                      href={`${prefix}/${item.route}/`}
                      className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/20 border border-zinc-950 hover:border-zinc-800 hover:bg-zinc-900/40 text-zinc-400 hover:text-yellow-500 transition-all duration-300"
                    >
                      <span className="text-xs font-semibold">{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Group 2: 客户端下载指引 */}
            <div className="p-6 rounded-3xl bg-zinc-950/20 border border-zinc-900/60 backdrop-blur-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-900/60">
                  <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500 border border-yellow-500/15">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-zinc-200 font-bold text-sm">
                      {isHant ? "全平台客戶端下載指引" : "全平台客户端下载指引"}
                    </h4>
                    <p className="text-zinc-550 text-[10px]">
                      {isHant ? "防攔截原生 APK 及蘋果下載" : "防拦截原生 APK 及苹果下载"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { route: "app", label: isHant ? "手機 APP 下載大廳" : "手机 APP 下载大厅" },
                    { route: "anzhuangbao", label: isHant ? "安卓 APK 安裝包" : "安卓 APK 安装包" },
                    { route: "pingguo", label: isHant ? "蘋果 iOS 海外安裝指南" : "苹果 iOS 海外安装指南" },
                    { route: "anzhuo", label: isHant ? "安卓原生版下載" : "安卓原生版下载" },
                    { route: "diannao", label: isHant ? "電腦桌面客戶端 (Win/Mac)" : "电脑桌面客户端 (Win/Mac)" },
                  ].map((item) => (
                    <Link
                      key={item.route}
                      href={`${prefix}/${item.route}/`}
                      className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/20 border border-zinc-950 hover:border-zinc-800 hover:bg-zinc-900/40 text-zinc-400 hover:text-yellow-500 transition-all duration-300"
                    >
                      <span className="text-xs font-semibold">{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Group 3: 平台服务与备用通道 */}
            <div className="p-6 rounded-3xl bg-zinc-950/20 border border-zinc-900/60 backdrop-blur-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-900/60">
                  <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500 border border-yellow-500/15">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-zinc-200 font-bold text-sm">
                      {isHant ? "服務說明與網頁通道" : "服务说明与网页通道"}
                    </h4>
                    <p className="text-zinc-550 text-[10px]">
                      {isHant ? "網頁在線版及多語言指南" : "网页在线版及多语言指南"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { route: "xiazai", label: isHant ? "多端下載中心" : "多端下载中心" },
                    { route: "wangye", label: isHant ? "網頁在線交易版" : "网页在线交易版" },
                    { route: "zhongwen", label: isHant ? "中文界面及法幣設置" : "中文界面及法币设置" },
                  ].map((item) => (
                    <Link
                      key={item.route}
                      href={`${prefix}/${item.route}/`}
                      className="group flex items-center justify-between p-3 rounded-xl bg-zinc-900/20 border border-zinc-950 hover:border-zinc-800 hover:bg-zinc-900/40 text-zinc-400 hover:text-yellow-500 transition-all duration-300"
                    >
                      <span className="text-xs font-semibold">{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
