"use client";

import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import { BookOpen } from "lucide-react";

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

  // Define categories of routes
  const categories = {
    download: ["huawei", "xiaomi", "oppovivo", "appleid", "anzhuangbao", "app", "anzhuo", "pingguo", "xiazai", "diannao"],
    network: ["yanzhengma", "diqu", "wangluo", "authenticator", "jiechi", "dizhi", "wangzhi", "zenmelian", "vpn", "denglu"],
    guides: ["c2c", "dongjie", "kyc", "web3", "kefu", "fangpian", "fanyong", "gendan", "okb", "zhuce", "zhongwen", "guanwang", "wangye", "yaoqingsong", "zainali", "jiaoyirumen", "zhanghaozhuce"]
  };

  // Find the category of the current route
  let currentCategoryKey: 'download' | 'network' | 'guides' = 'guides';
  if (categories.download.includes(currentRoute)) {
    currentCategoryKey = 'download';
  } else if (categories.network.includes(currentRoute)) {
    currentCategoryKey = 'network';
  }

  // Get all routes in the same category except currentRoute
  let candidates = categories[currentCategoryKey].filter(slug => slug !== currentRoute);

  // If there are less than 4, borrow from other categories
  if (candidates.length < 4) {
    const allRoutes = [...categories.download, ...categories.network, ...categories.guides];
    const rest = allRoutes.filter(slug => slug !== currentRoute && !candidates.includes(slug));
    candidates = [...candidates, ...rest];
  }

  // Pick exactly 4 candidates deterministically using currentRoute length to avoid hydration mismatches
  const startIndex = currentRoute.length % (candidates.length - 3);
  const selectedSlugs = candidates.slice(startIndex, startIndex + 4);

  const prefix = isHant ? "/hant" : "";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-t border-zinc-900/60">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-yellow-500" />
          <h3 className="text-zinc-200 font-bold text-sm md:text-base tracking-wide">
            {isHant ? "推薦專題閱讀" : "推荐专题阅读"}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedSlugs.map((slug) => {
            const page = seoData[slug];
            if (!page) return null;
            return (
              <Link
                key={slug}
                href={`${prefix}/${slug}/`}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-zinc-900/20 hover:bg-zinc-900/40 border border-zinc-900/60 hover:border-zinc-800 transition-all duration-300 shadow-sm space-y-3 cursor-pointer select-none"
              >
                <div className="space-y-2">
                  <span className="inline-block px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-800 text-[9px] text-zinc-500 font-bold tracking-wide uppercase">
                    {page.tabLabel}
                  </span>
                  <h4 className="text-zinc-300 group-hover:text-yellow-500 font-bold text-xs sm:text-sm line-clamp-2 transition-colors leading-relaxed">
                    {page.title.split("|")[0].trim()}
                  </h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">
                    {page.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-650 group-hover:text-yellow-500 font-bold font-mono pt-1 transition-colors">
                  <span>READ MORE</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
