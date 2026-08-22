import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEO_KEYWORDS_MAP } from "@/seoData";
import ClientLayout from "@/components/ClientLayout";
import Hero from "@/components/Hero";
import DownloadSection from "@/components/DownloadSection";
import TutorialSection from "@/components/TutorialSection";
import MirrorSection from "@/components/MirrorSection";
import FaqSection from "@/components/FaqSection";
import RelatedReadings from "@/components/RelatedReadings";
import ArticleBody from "@/components/ArticleBody";
import TutorialsHub from "@/components/TutorialsHub";

interface PageProps {
  params: {
    slug: string;
  };
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

export function generateStaticParams() {
  return Object.keys(SEO_KEYWORDS_MAP)
    .filter((key) => key !== "home")
    .map((slug) => ({
      slug,
    }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const pageData = SEO_KEYWORDS_MAP[params.slug];
  if (!pageData) {
    return {};
  }
  return {
    title: pageData.title.replace(" - ox.xxmsanguo.com", " - 欧意OKEX"),
    description: pageData.description,
    keywords: pageData.keywords,
    alternates: {
      canonical: `https://ox.xxmsanguo.com/${params.slug}/`,
    },
  };
}

export default function SubPage({ params }: PageProps) {
  const currentDate = getCurrentDateString();
  const currentRoute = params.slug;
  const pageData = SEO_KEYWORDS_MAP[currentRoute];

  if (!pageData) {
    notFound();
  }

  const faqSchema = pageData.targetedFaq && pageData.targetedFaq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pageData.targetedFaq.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a.replace(/<[^>]*>/g, "")
      }
    }))
  } : null;

  // Render components selectively based on the route to eliminate duplicate content & block repetition
  const renderSections = () => {
    switch (currentRoute) {
      case "xinshou-jiaocheng":
        return (
          <>
            <Hero currentRoute={currentRoute} />
            <TutorialsHub />
          </>
        );
      case "zhuce":
        return (
          <>
            <Hero currentRoute={currentRoute} />
            <TutorialSection currentRoute={currentRoute} />
          </>
        );
      case "zhongwen":
      case "denglu":
      case "wangye":
      case "xiazai":
      case "app":
      case "diannao":
      case "anzhuangbao":
      case "pingguo":
      case "anzhuo":
      case "guanwang":
        return (
          <>
            <Hero currentRoute={currentRoute} />
            <DownloadSection currentRoute={currentRoute} />
          </>
        );
      case "dizhi":
      case "wangzhi":
      case "jiechi":
        return (
          <>
            <Hero currentRoute={currentRoute} />
            <ArticleBody currentRoute={currentRoute} />
            <MirrorSection currentRoute={currentRoute} />
          </>
        );
      default:
        return (
          <>
            <Hero currentRoute={currentRoute} />
            <ArticleBody currentRoute={currentRoute} />
          </>
        );
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": pageData.tabLabel,
            "url": `https://ox.xxmsanguo.com/${currentRoute}/`,
            "description": pageData.description,
          }),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <ClientLayout currentRoute={currentRoute}>
        {renderSections()}
        <FaqSection currentRoute={currentRoute} />
        <RelatedReadings currentRoute={currentRoute} />
      </ClientLayout>
    </>
  );
}
