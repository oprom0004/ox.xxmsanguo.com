"use client";

import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import { BookOpen, ArrowRight } from "lucide-react";

interface RelatedReadingsProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function RelatedReadings({ currentRoute, locale = 'zh' }: RelatedReadingsProps) {
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;

  if (currentRoute === "home") {
    return null;
  }

  const CORE_PILLAR_KEYS = new Set([
    "home", "guanwang", "app", "diannao", "wangye", "zhuce", "denglu",
    "anzhuo", "pingguo", "anzhuangbao", "xinshou-jiaocheng", "zhongwen", "xiazai"
  ]);

  // 获取所有长尾实操文章（排除当前文章与基础功能柱子页）
  const allArticles = Object.values(seoData).filter(item => 
    item.route !== currentRoute && !CORE_PILLAR_KEYS.has(item.route)
  );

  // 1. 语义关键词智能匹配（优先推荐同业务主题文章）
  let matchedArticles = allArticles.filter(item => {
    if (currentRoute.includes("chujin") || currentRoute.includes("c2c") || currentRoute.includes("dongka")) {
      return item.route.includes("chujin") || item.route.includes("c2c") || item.route.includes("dongka") || item.route.includes("tibi");
    }
    if (currentRoute.includes("heyue") || currentRoute.includes("qiangping") || currentRoute.includes("wangge") || currentRoute.includes("matinggele")) {
      return item.route.includes("heyue") || item.route.includes("qiangping") || item.route.includes("wangge") || item.route.includes("matinggele") || item.route.includes("feilv");
    }
    if (currentRoute.includes("pc") || currentRoute.includes("zhuomian") || currentRoute.includes("kanpan") || currentRoute.includes("api")) {
      return item.route.includes("pc") || item.route.includes("zhuomian") || item.route.includes("api") || item.route.includes("dns");
    }
    if (currentRoute.includes("web3") || currentRoute.includes("zhujici") || currentRoute.includes("2fa") || currentRoute.includes("passkey") || currentRoute.includes("fangdiaoyu")) {
      return item.route.includes("web3") || item.route.includes("zhujici") || item.route.includes("2fa") || item.route.includes("passkey") || item.route.includes("fangdiaoyu");
    }
    return false;
  });

  // 2. 若同类不足 4 篇，从其他长尾文章中确定性补充
  if (matchedArticles.length < 4) {
    const remaining = allArticles.filter(item => !matchedArticles.some(m => m.route === item.route));
    matchedArticles = [...matchedArticles, ...remaining];
  }

  // 选取前 4 篇
  const selectedArticles = matchedArticles.slice(0, 4);

  if (selectedArticles.length === 0) {
    return null;
  }

  const prefix = isHant ? "/hant" : "";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-zinc-900/60">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-yellow-500" />
            <h3 className="text-zinc-200 font-bold text-sm md:text-base tracking-wide">
              {isHant ? "推薦相關深度實操" : "推荐相关深度实操"}
            </h3>
          </div>
          <Link
            href={`${prefix}/xinshou-jiaocheng/`}
            className="text-xs text-yellow-500 hover:text-yellow-400 font-semibold flex items-center gap-1 hover:underline"
          >
            <span>{isHant ? "查看全部教程" : "查看全部教程"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedArticles.map((page) => (
            <Link
              key={page.route}
              href={`${prefix}/${page.route}/`}
              className="group flex flex-col justify-between p-5 rounded-2xl bg-zinc-900/20 hover:bg-zinc-900/40 border border-zinc-900/60 hover:border-zinc-800 transition-all duration-300 shadow-sm space-y-3 cursor-pointer select-none"
            >
              <div className="space-y-2">
                <span className="inline-block px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-800 text-[10px] text-yellow-500 font-bold tracking-wide">
                  {page.tabLabel}
                </span>
                <h4 className="text-zinc-300 group-hover:text-yellow-500 font-bold text-xs sm:text-sm line-clamp-2 transition-colors leading-relaxed">
                  {page.title.split("【")[0].trim()}
                </h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">
                  {page.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 group-hover:text-yellow-500 font-bold font-mono pt-1 transition-colors">
                <span>READ MORE</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
