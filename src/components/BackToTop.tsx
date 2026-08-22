"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-4 bottom-24 lg:bottom-8 z-40 p-3 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 shadow-lg hover:bg-yellow-500 hover:text-black hover:border-yellow-400 transition-all cursor-pointer select-none"
      aria-label="返回顶部"
      data-cta="false"
    >
      <ArrowUp size={18} />
    </button>
  );
}
