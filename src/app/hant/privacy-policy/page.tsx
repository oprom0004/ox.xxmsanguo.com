import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "隱私說明 - ox.xxmsanguo.com",
  description:
    "ox.xxmsanguo.com 第三方資訊指南網站的隱私說明。本站不收集交易所帳號密碼、驗證碼、助記詞、銀行卡或身分證等敏感信息。",
  alternates: {
    canonical: "https://ox.xxmsanguo.com/hant/privacy-policy/",
  },
};

export default function HantPrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0b0e11] text-zinc-300 px-5 py-12">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <Link href="/hant/" className="text-sm text-yellow-500 hover:text-yellow-400">
            返回首頁
          </Link>
          <h1 className="text-3xl font-extrabold text-white">隱私說明</h1>
          <p className="text-sm leading-7 text-zinc-400">
            ox.xxmsanguo.com 是面向 OKX / 歐易用戶整理訪問入口、客戶端下載指引和常見教程的第三方資訊指南網站。本站不隸屬於 OKX 平台，不提供交易、登錄、充值、提現、託管或帳戶服務。
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">我們不收集的信息</h2>
          <p className="leading-7">
            本站不會要求用戶輸入交易所帳號、密碼、短信驗證碼、郵箱驗證碼、谷歌驗證碼、助記詞、私鑰、銀行卡號、身分證號碼或任何可用於控制帳戶與資金的敏感信息。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">可能自動記錄的信息</h2>
          <p className="leading-7">
            為了網站安全、防濫用、故障排查和基礎訪問統計，服務器可能自動記錄訪問時間、IP 地址、瀏覽器 User-Agent、訪問頁面、來源頁面、設備類型和錯誤日誌等基礎訪問日誌。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">信息用途</h2>
          <p className="leading-7">
            基礎訪問日誌僅用於安全排查、異常訪問識別、服務維護和頁面體驗優化。本站不會出售、出租或交易用戶信息，也不會將基礎訪問日誌用於交易所帳戶登錄、資金操作或身分冒用。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">第三方連結</h2>
          <p className="leading-7">
            本站可能提供前往第三方網站或應用商店的連結。用戶離開本站後，第三方網站的隱私政策和安全規則將由對應第三方負責。請在任何第三方頁面中謹慎核對網址，並避免在不可信頁面輸入敏感信息。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">聯繫我們</h2>
          <p className="leading-7">
            如需反饋頁面內容、隱私說明或安全問題，可通過網站頁腳提供的聯繫方式與我們聯繫。
          </p>
        </section>

        <p className="border-t border-zinc-900 pt-6 text-xs text-zinc-500">
          最後更新：2026-05-25
        </p>
      </article>
    </main>
  );
}
