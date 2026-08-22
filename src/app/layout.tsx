import "./globals.css";
import { ConfigProvider } from "@/context/ConfigContext";
import { GatewayProvider } from "@/features/DownloadGateway/GatewayContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0b0e11] text-zinc-300 antialiased">
        <ConfigProvider>
          <GatewayProvider>
            {children}
          </GatewayProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
