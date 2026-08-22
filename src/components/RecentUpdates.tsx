import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import { Calendar, ArrowRight, Sparkles, BookOpen } from "lucide-react";

interface RecentUpdatesProps {
  locale?: 'zh' | 'hant';
}

function getCurrentDateString() {
  const now = new Date();
  const utc8Time = now.getTime() + (now.getTimezoneOffset() * 60000) + (3600000 * 8);
  const dateObj = new Date(utc8Time);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function RecentUpdates({ locale = 'zh' }: RecentUpdatesProps) {
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;
  const prefix = isHant ? "/hant" : "";
  const currentDate = getCurrentDateString();

  // Get all scheduled articles (those with publishDate) that are published
  const activeArticles = Object.values(seoData)
    .filter(item => item.publishDate && item.publishDate <= currentDate)
    .sort((a, b) => b.publishDate!.localeCompare(a.publishDate!));

  // Cap at 6 articles for clean homepage layout
  const displayedArticles = activeArticles.slice(0, 6);

  if (displayedArticles.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 scroll-mt-20">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-xs text-yellow-500 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHant ? "最新發佈 / 量化指南" : "最新发布 / 量化指南"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100 tracking-tight leading-none">
              {isHant ? "近期更新專欄" : "近期更新专栏"}
            </h2>
            <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed">
              {isHant 
                ? "精選最新 OKX 安全使用技巧、系統防攔截下載教程與 Web3 錢包實操指南。" 
                : "精选最新 OKX 安全使用技巧、系统防拦截下载教程与 Web3 钱包实操指南。"}
            </p>
          </div>

          <Link
            href={`${prefix}/xinshou-jiaocheng/`}
            className="inline-flex items-center gap-1 text-xs text-yellow-500 hover:text-yellow-400 font-bold shrink-0 pb-1 hover:underline transition-all duration-200"
          >
            <span>{isHant ? "查看全部教程" : "查看全部教程"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article) => {
            // Clean up title (remove OKX suffixes for homepage display)
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
                    <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500 font-bold tracking-wide uppercase">
                      {article.tabLabel}
                    </span>
                    <div className="flex items-center gap-1 text-zinc-600 font-mono text-[10px]">
                      <Calendar className="w-3 h-3 text-zinc-650" />
                      <span>{article.publishDate}</span>
                    </div>
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
      </div>
    </section>
  );
}
