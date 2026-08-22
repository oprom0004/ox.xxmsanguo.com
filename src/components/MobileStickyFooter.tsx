"use client";

import { ReactNode, useEffect, useState } from "react";

type MobileStickyFooterProps = {
  children: ReactNode;
};

export default function MobileStickyFooter({ children }: MobileStickyFooterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 px-4 pt-2 pb-[calc(12px+env(safe-area-inset-bottom))] lg:hidden pointer-events-none transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className={`max-w-md mx-auto ${isVisible ? "pointer-events-auto" : ""}`}>
        {children}
      </div>
    </div>
  );
}
