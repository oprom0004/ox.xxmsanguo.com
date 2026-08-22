import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "隐私说明 - ox.xxmsanguo.com",
  description:
    "ox.xxmsanguo.com 第三方信息指南网站的隐私说明。本站不收集交易所账号密码、验证码、助记词、银行卡或身份证等敏感信息。",
  alternates: {
    canonical: "https://ox.xxmsanguo.com/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0b0e11] text-zinc-300 px-5 py-12">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <Link href="/" className="text-sm text-yellow-500 hover:text-yellow-400">
            返回首页
          </Link>
          <h1 className="text-3xl font-extrabold text-white">隐私说明</h1>
          <p className="text-sm leading-7 text-zinc-400">
            ox.xxmsanguo.com 是面向 OKX / 欧易用户整理访问入口、客户端下载指引和常见教程的第三方信息指南网站。本站不隶属于 OKX 平台，不提供交易、登录、充值、提现、托管或账户服务。
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">我们不收集的信息</h2>
          <p className="leading-7">
            本站不会要求用户输入交易所账号、密码、短信验证码、邮箱验证码、谷歌验证码、助记词、私钥、银行卡号、身份证号码或任何可用于控制账户与资金的敏感信息。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">可能自动记录的信息</h2>
          <p className="leading-7">
            为了网站安全、防滥用、故障排查和基础访问统计，服务器可能自动记录访问时间、IP 地址、浏览器 User-Agent、访问页面、来源页面、设备类型和错误日志等基础访问日志。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">信息用途</h2>
          <p className="leading-7">
            基础访问日志仅用于安全排查、异常访问识别、服务维护和页面体验优化。本站不会出售、出租或交易用户信息，也不会将基础访问日志用于交易所账户登录、资金操作或身份冒用。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">第三方链接</h2>
          <p className="leading-7">
            本站可能提供前往第三方网站或应用商店的链接。用户离开本站后，第三方网站的隐私政策和安全规则将由对应第三方负责。请在任何第三方页面中谨慎核对网址，并避免在不可信页面输入敏感信息。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">联系我们</h2>
          <p className="leading-7">
            如需反馈页面内容、隐私说明或安全问题，可通过网站页脚提供的联系方式与我们联系。
          </p>
        </section>

        <p className="border-t border-zinc-900 pt-6 text-xs text-zinc-500">
          最后更新：2026-05-25
        </p>
      </article>
    </main>
  );
}
