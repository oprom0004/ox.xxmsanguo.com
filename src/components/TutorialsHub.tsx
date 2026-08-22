"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import { Calendar, ArrowRight, BookOpen, Layers } from "lucide-react";

interface TutorialsHubProps {
  locale?: 'zh' | 'hant';
}

const CATEGORY_TABS = [
  { id: "all", zh: "全部已解锁教程", hant: "全部已解鎖教程" },
  { id: "pc", zh: "电脑端与量化", hant: "電腦端與量化" },
  { id: "c2c", zh: "C2C出金防冻", hant: "C2C出金防凍" },
  { id: "trade", zh: "合约与网格风控", hant: "合約與網格風控" },
  { id: "security", zh: "安全验证与2FA", hant: "安全驗證與2FA" },
  { id: "web3", zh: "Web3与链上转账", hant: "Web3與鏈上轉賬" }
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

  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const CORE_PILLAR_KEYS = new Set([
    "home", "guanwang", "app", "diannao", "wangye", "zhuce", "denglu",
    "anzhuo", "pingguo", "anzhuangbao", "xinshou-jiaocheng", "zhongwen", "xiazai"
  ]);

  // 严格只获取已经解锁发布的文章（publishDate <= currentDate）
  const allArticles = useMemo(() => {
    return Object.values(seoData)
      .filter(item => {
        if (CORE_PILLAR_KEYS.has(item.route)) return false;
        if (!item.publishDate || item.publishDate > currentDate) return false;
        return true;
      })
      .sort((a, b) => b.publishDate!.localeCompare(a.publishDate!));
  }, [seoData, currentDate]);

  // 按分类筛选
  const filteredArticles = useMemo(() => {
    if (activeTab === "all") return allArticles;
    if (activeTab === "pc") return allArticles.filter(a => a.route.includes("pc") || a.route.includes("api") || a.route.includes("dns"));
    if (activeTab === "c2c") return allArticles.filter(a => a.route.includes("c2c") || a.route.includes("chujin") || a.route.includes("dongka"));
    if (activeTab === "trade") return allArticles.filter(a => a.route.includes("heyue") || a.route.includes("wangge") || a.route.includes("matinggele") || a.route.includes("feilv"));
    if (activeTab === "security") return allArticles.filter(a => a.route.includes("2fa") || a.route.includes("passkey") || a.route.includes("fangdiaoyu") || a.route.includes("laoyonghu"));
    if (activeTab === "web3") return allArticles.filter(a => a.route.includes("web3") || a.route.includes("zhujici") || a.route.includes("tibi") || a.route.includes("xrp"));
    return allArticles;
  }, [allArticles, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 scroll-mt-20">
      <div className="space-y-10">
        
        {/* Hub Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-900">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-xs text-yellow-500 font-bold font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isHant ? "實操與排錯知識庫" : "实操与排错知识库"}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              {isHant ? "歐意 OKX 深度實操指南" : "欧意 OKX 深度实操指南"}
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              {isHant 
                ? `已發佈 ${allArticles.length} 篇精選深度實操教程，每日定時更新解鎖，涵蓋多屏看盤、C2C出金、合約風控等全流程。`
                : `已发布 ${allArticles.length} 篇精选深度实操教程，每日定时更新解锁，涵盖多屏看盘、C2C出金、合约风控等全流程。 fudge`.replace(' fudge', '')}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-3 rounded-2xl shrink-0">
            <div className="text-right">
              <span className="block text-[11px] text-zinc-500 uppercase font-mono font-bold">Published</span>
              <span className="text-lg font-black text-yellow-500 font-mono">{allArticles.length} 篇已解锁</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
              <Layers className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                  isActive
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                    : "bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {isHant ? tab.hant : tab.zh}
              </button>
            );
          })}
        </div>

        {/* Article Grid */}
        {paginatedArticles.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950/20 border border-zinc-900 rounded-3xl">
            <p className="text-zinc-500 text-sm">
              {isHant ? "暫無已解鎖的教程文章。" : "暂无已解锁的教程文章。"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedArticles.map((page) => (
              <Link
                key={page.route}
                href={`${prefix}/${page.route}/`}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/20 hover:bg-zinc-900/50 border border-zinc-900 hover:border-yellow-500/30 transition-all duration-300 shadow-sm space-y-4 cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-[10px] text-yellow-500 font-bold tracking-wide">
                      {page.tabLabel}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-600" />
                      <span>{page.publishDate}</span>
                    </span>
                  </div>
                  <h3 className="text-zinc-200 group-hover:text-yellow-400 font-bold text-sm leading-snug transition-colors line-clamp-2">
                    {page.title.split("【")[0].trim()}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 font-normal">
                    {page.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-900/80 text-xs font-semibold text-zinc-500 group-hover:text-yellow-400 transition-colors">
                  <span>{isHant ? "閱讀完整實操" : "阅读完整实操"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 transition"
            >
              {isHant ? "上一頁" : "上一页"}
            </button>
            
            <div className="flex items-center gap-1 font-mono text-xs text-zinc-400 px-3">
              <span className="text-yellow-500 font-bold">{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800 transition"
            >
              {isHant ? "下一頁" : "下一页"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
