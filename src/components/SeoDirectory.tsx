"use client";

import Link from "next/link";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import { Sparkles, ArrowRight } from "lucide-react";

interface SeoDirectoryProps {
  locale?: 'zh' | 'hant';
}

export default function SeoDirectory({ locale = 'zh' }: SeoDirectoryProps) {
  const isHant = locale === 'hant';
  const prefix = isHant ? "/hant" : "";
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;

  const CORE_PILLAR_KEYS = new Set([
    "home", "guanwang", "app", "diannao", "wangye", "zhuce", "denglu",
    "anzhuo", "pingguo", "anzhuangbao", "xinshou-jiaocheng", "zhongwen", "xiazai"
  ]);

  // 获取前 24 篇纯正拼音长 Slug 的深度实操文章
  const longTailArticles = Object.values(seoData)
    .filter(item => !CORE_PILLAR_KEYS.has(item.route))
    .slice(0, 24);

  return (
    <section id="directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
      <div className="bg-zinc-950/40 border border-zinc-900/60 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-yellow-500 rounded-full" />
            <h3 className="text-zinc-200 font-bold text-sm md:text-base tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>{isHant ? "深度實操與常見排錯專題" : "深度实操与常见排错专题"}</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {longTailArticles.map((item) => (
            <Link
              key={item.route}
              href={`${prefix}/${item.route}/`}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-zinc-900/40 text-zinc-400 hover:text-yellow-500 hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition duration-200 select-none group"
            >
              <span className="truncate pr-2">{item.title.split("：")[0].split("【")[0]}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 group-hover:bg-yellow-500/20 group-hover:text-yellow-400 transition shrink-0">
                {item.tabLabel}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
