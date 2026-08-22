"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import { Calendar, ArrowRight, BookOpen, Layers, Sparkles, Clock, CheckCircle2 } from "lucide-react";

interface TutorialsHubProps {
  locale?: 'zh' | 'hant';
}

const CATEGORY_TABS = [
  { id: "all", zh: "全部已解锁实操", hant: "全部已解鎖實操" },
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

// 获取场景主题色
function getCardTheme(route: string) {
  if (route.includes("pc") || route.includes("api") || route.includes("dns")) {
    return { badge: "bg-blue-500/10 border-blue-500/30 text-blue-400", hover: "hover:border-blue-500/40" };
  }
  if (route.includes("c2c") || route.includes("chujin") || route.includes("dongka")) {
    return { badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400", hover: "hover:border-emerald-500/40" };
  }
  if (route.includes("heyue") || route.includes("wangge") || route.includes("matinggele") || route.includes("feilv")) {
    return { badge: "bg-amber-500/10 border-amber-500/30 text-amber-400", hover: "hover:border-amber-500/40" };
  }
  if (route.includes("web3") || route.includes("zhujici") || route.includes("tibi") || route.includes("xrp")) {
    return { badge: "bg-purple-500/10 border-purple-500/30 text-purple-400", hover: "hover:border-purple-500/40" };
  }
  return { badge: "bg-rose-500/10 border-rose-500/30 text-rose-400", hover: "hover:border-rose-500/40" };
}

export default function TutorialsHub({ locale = 'zh' }: TutorialsHubProps) {
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;
  const prefix = isHant ? "/hant" : "";
  const currentDate = getCurrentDateString();

  const [activeTab, setActiveTab] = useState("all");

  const CORE_PILLAR_KEYS = new Set([
    "home", "guanwang", "app", "diannao", "wangye", "zhuce", "denglu",
    "anzhuo", "pingguo", "anzhuangbao", "xinshou-jiaocheng", "zhongwen", "xiazai"
  ]);

  // 严格获取所有已解锁文章（publishDate <= currentDate），按发布时间从新到旧（降序）全量排列
  const allUnlockedArticles = useMemo(() => {
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
    if (activeTab === "all") return allUnlockedArticles;
    if (activeTab === "pc") return allUnlockedArticles.filter(a => a.route.includes("pc") || a.route.includes("api") || a.route.includes("dns"));
    if (activeTab === "c2c") return allUnlockedArticles.filter(a => a.route.includes("c2c") || a.route.includes("chujin") || a.route.includes("dongka"));
    if (activeTab === "trade") return allUnlockedArticles.filter(a => a.route.includes("heyue") || a.route.includes("wangge") || a.route.includes("matinggele") || a.route.includes("feilv"));
    if (activeTab === "security") return allUnlockedArticles.filter(a => a.route.includes("2fa") || a.route.includes("passkey") || a.route.includes("fangdiaoyu") || a.route.includes("laoyonghu"));
    if (activeTab === "web3") return allUnlockedArticles.filter(a => a.route.includes("web3") || a.route.includes("zhujici") || a.route.includes("tibi") || a.route.includes("xrp"));
    return allUnlockedArticles;
  }, [allUnlockedArticles, activeTab]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 scroll-mt-20">
      <div className="space-y-10">
        
        {/* Hub Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-900">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/25 text-xs text-blue-400 font-bold font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isHant ? "正版實操與排錯知識庫" : "标准实操与排错知识库"}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              {isHant ? "歐意 OKX 全功能深度實操指南" : "欧意 OKX 全功能深度实操指南"}
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              {isHant 
                ? `已解鎖上線 ${allUnlockedArticles.length} 篇原創實操教程，按最新發佈時間排列，涵蓋多屏看盤、C2C安全出金、合約風控防爆倉、Web3多鏈防盜等全流程指引。`
                : `已解锁上线 ${allUnlockedArticles.length} 篇原创实操教程，按最新发布时间排列，涵盖多屏看盘、C2C安全出金、合约风控防爆仓、Web3多链防盗等全流程指引。 fudge`.replace(' fudge', '')}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-3 rounded-2xl shrink-0">
            <div className="text-right">
              <span className="block text-[11px] text-zinc-500 uppercase font-mono font-bold">Total Unlocked</span>
              <span className="text-lg font-black text-blue-400 font-mono">{filteredArticles.length} 篇已按最新排列</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
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
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                  isActive
                    ? "bg-blue-600 text-black shadow-lg shadow-yellow-500/20"
                    : "bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {isHant ? tab.hant : tab.zh}
              </button>
            );
          })}
        </div>

        {/* 全量平铺展现所有已解锁文章（从新到旧） */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-zinc-950/20 border border-zinc-900 rounded-3xl">
            <p className="text-zinc-500 text-sm">
              {isHant ? "暫無已解鎖的教程文章。" : "暂无已解锁的教程文章。"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((page) => {
              const cardTheme = getCardTheme(page.route);
              return (
                <Link
                  key={page.route}
                  href={`${prefix}/${page.route}/`}
                  className={`group flex flex-col justify-between p-6 rounded-2xl bg-zinc-900/30 hover:bg-zinc-900/70 border border-zinc-900 ${cardTheme.hover} transition-all duration-300 shadow-sm space-y-4 cursor-pointer`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold tracking-wide font-mono ${cardTheme.badge}`}>
                        {page.tabLabel}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        <span>{page.publishDate}</span>
                      </span>
                    </div>
                    <h3 className="text-zinc-100 group-hover:text-blue-400 font-bold text-sm leading-snug transition-colors line-clamp-2">
                      {page.title.split("【")[0].trim()}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 font-normal">
                      {page.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-900/80 text-xs font-semibold text-zinc-500 group-hover:text-blue-400 transition-colors">
                    <span className="flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>{isHant ? "完整實操步驟" : "完整实操步骤"}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
