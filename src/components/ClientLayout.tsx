"use client";

import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import MobileStickyFooter from "./MobileStickyFooter";
import Breadcrumbs from "./Breadcrumbs";

interface ClientLayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  locale?: 'zh' | 'hant';
}

export default function ClientLayout({ children, currentRoute, locale = 'zh' }: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-zinc-300 font-sans selection:bg-yellow-500 selection:text-black antialiased">
      <Header
        currentRoute={currentRoute}
        locale={locale}
      />

      <main>
        <Breadcrumbs currentRoute={currentRoute} locale={locale} />
        {children}
      </main>

      <Footer locale={locale} />

      <BackToTop />
      <MobileStickyFooter>
        <button
          type="button"
          data-cta="true"
          className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-extrabold shadow-lg shadow-amber-500/20 py-3.5 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-white/5 cursor-pointer select-none"
        >
          {locale === 'hant' ? '安全直達訪問通道' : '安全直达访问通道'}
        </button>
      </MobileStickyFooter>
    </div>
  );
}
