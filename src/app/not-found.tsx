import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Download, UserPlus, LogIn, Compass, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
    title: '404 - 页面未找到 / 頁面未找到',
    description: '您访问的网页或节点不存在，请通过下方平台安全导航通道返回主站。',
    robots: {
        index: false,
        follow: true, // 允许搜索引擎蜘蛛追踪页面上的内链，对全站爬取和权重流转极其有利
    },
};

export default function NotFound() {
    return (
        <div className="relative grid min-h-screen place-items-center bg-[#0b0e11] px-6 py-24 sm:py-32 lg:px-8 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="text-center max-w-2xl relative z-10">
                {/* Visual Icon with Premium Alert State */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 animate-pulse mb-6">
                    <ShieldAlert className="h-8 w-8" />
                </div>

                <p className="text-sm font-semibold tracking-wide text-amber-500 uppercase">404 Error / 404 錯誤</p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
                    页面未找到 / 頁面未找到
                </h1>
                <p className="mt-4 text-sm sm:text-base leading-7 text-zinc-400 font-sans max-w-lg mx-auto">
                    抱歉，您访问的网址或节点不存在，可能已被移除或进行了合规性调整。
                    <br />
                    請使用下方平台安全導航通道，以確保您的資金與賬號安全。
                </p>

                {/* Structured Links Grid: Spiders can follow these to crawl base and hant paths, and users get immediate navigation */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
                    
                    {/* Simplified Chinese Quick Links */}
                    <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-md hover:border-amber-500/30 transition-all duration-300">
                        <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5" />
                            <span>简体中文安全导航</span>
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium group transition-colors duration-150">
                                    <Home className="w-4 h-4 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                                    <span>返回网站首页</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/xiazai/" className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium group transition-colors duration-150">
                                    <Download className="w-4 h-4 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                                    <span>客户端高速下载</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/zhuce/" className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium group transition-colors duration-150">
                                    <UserPlus className="w-4 h-4 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                                    <span>新手安全注册</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/denglu/" className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium group transition-colors duration-150">
                                    <LogIn className="w-4 h-4 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                                    <span>安全登录入口</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Traditional Chinese Quick Links */}
                    <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-md hover:border-amber-500/30 transition-all duration-300">
                        <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5" />
                            <span>繁體中文安全導航</span>
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/hant/" className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium group transition-colors duration-150">
                                    <Home className="w-4 h-4 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                                    <span>返回網站首頁</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/hant/xiazai/" className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium group transition-colors duration-150">
                                    <Download className="w-4 h-4 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                                    <span>客戶端高速下載</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/hant/zhuce/" className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium group transition-colors duration-150">
                                    <UserPlus className="w-4 h-4 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                                    <span>新手安全註冊</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/hant/denglu/" className="flex items-center gap-2 text-zinc-300 hover:text-white font-medium group transition-colors duration-150">
                                    <LogIn className="w-4 h-4 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                                    <span>安全登錄入口</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Sub-footer Brand Indicator */}
                <p className="mt-12 text-xs text-zinc-600 tracking-wider uppercase font-mono">
                    Official Secure Access Gateway &bull; ox.xxmsanguo.com
                </p>
            </div>
        </div>
    );
}
