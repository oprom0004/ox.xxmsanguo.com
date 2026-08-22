"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";

interface BreadcrumbsProps {
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function Breadcrumbs({ currentRoute, locale = 'zh' }: BreadcrumbsProps) {
  const isHant = locale === 'hant';
  const seoData = isHant ? SEO_KEYWORDS_MAP_HANT : SEO_KEYWORDS_MAP;
  const pageData = seoData[currentRoute];

  if (!pageData || currentRoute === "home") {
    return null;
  }

  const prefix = isHant ? "/hant" : "";
  const homeLabel = isHant ? "首頁" : "首页";
  const homeUrl = isHant ? "https://ox.xxmsanguo.com/hant/" : "https://ox.xxmsanguo.com/";
  const pageUrl = isHant 
    ? `https://ox.xxmsanguo.com/hant/${currentRoute}/` 
    : `https://ox.xxmsanguo.com/${currentRoute}/`;

  const coreRoutes = [
    "zhuce",
    "denglu",
    "app",
    "diannao",
    "anzhuangbao",
    "pingguo",
    "wangye",
    "anzhuo",
    "guanwang",
    "zhongwen",
    "xiazai"
  ];
  const isArticle = !coreRoutes.includes(currentRoute);

  const directoryLabel = "教程中心";
  const directoryUrl = isHant ? "https://ox.xxmsanguo.com/hant/#directory" : "https://ox.xxmsanguo.com/#directory";

  // JSON-LD Breadcrumb List
  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": homeLabel,
      "item": homeUrl
    }
  ];

  if (isArticle) {
    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": directoryLabel,
      "item": directoryUrl
    });
    itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": pageData.tabLabel,
      "item": pageUrl
    });
  } else {
    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": pageData.tabLabel,
      "item": pageUrl
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <nav 
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2"
      >
        <ol className="flex items-center space-x-2 text-xs text-zinc-500 font-medium">
          <li className="flex items-center">
            <Link 
              href={`${prefix}/`}
              className="flex items-center gap-1 hover:text-yellow-500 transition-colors duration-150 select-none group"
            >
              <Home className="w-3.5 h-3.5 group-hover:scale-105 transition-transform" />
              <span>{homeLabel}</span>
            </Link>
          </li>
          
          <li className="flex items-center">
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700 select-none" />
          </li>

          {isArticle && (
            <>
              <li className="flex items-center">
                <Link 
                  href={`${prefix}/#directory`}
                  className="hover:text-yellow-500 transition-colors duration-150 select-none"
                >
                  <span>{directoryLabel}</span>
                </Link>
              </li>
              
              <li className="flex items-center">
                <ChevronRight className="w-3.5 h-3.5 text-zinc-700 select-none" />
              </li>
            </>
          )}
          
          <li className="flex items-center">
            <span className="text-zinc-400 font-semibold truncate select-none">
              {pageData.tabLabel}
            </span>
          </li>
        </ol>
      </nav>
    </>
  );
}
