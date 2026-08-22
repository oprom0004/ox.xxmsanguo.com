import { Metadata } from "next";
import { SEO_KEYWORDS_MAP_HANT } from "@/seoData.hant";
import ClientLayout from "@/components/ClientLayout";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import FaqSection from "@/components/FaqSection";
import SeoDirectory from "@/components/SeoDirectory";
import DownloadSection from "@/components/DownloadSection";
import MirrorSection from "@/components/MirrorSection";
import RecentUpdates from "@/components/RecentUpdates";

export function generateMetadata(): Metadata {
  const pageData = SEO_KEYWORDS_MAP_HANT.home;
  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    alternates: {
      canonical: "https://ox.xxmsanguo.com/hant/",
    },
  };
}

export default function HomePageHant() {
  const currentRoute = "home";
  const pageData = SEO_KEYWORDS_MAP_HANT[currentRoute];

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": pageData.tabLabel,
            "url": "https://ox.xxmsanguo.com/hant/",
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
      <ClientLayout currentRoute={currentRoute} locale="hant">
        <Hero currentRoute={currentRoute} locale="hant" />
        <MirrorSection currentRoute={currentRoute} locale="hant" />
        <DownloadSection currentRoute={currentRoute} locale="hant" />
        <RecentUpdates locale="hant" />
        <FeaturesSection currentRoute={currentRoute} locale="hant" />
        <FaqSection currentRoute={currentRoute} locale="hant" />
        <SeoDirectory locale="hant" />
      </ClientLayout>
    </>
  );
}
