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
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-yellow-500/10 cursor-pointer select-none"
        >
          {locale === 'hant' ? '查看訪問入口' : '查看访问入口'}
        </button>
      </MobileStickyFooter>
    </div>
  );
}
