"use client";

import Link from "next/link";

interface SeoDirectoryProps {
  locale?: 'zh' | 'hant';
}

export default function SeoDirectory({ locale = 'zh' }: SeoDirectoryProps) {
  const isHant = locale === 'hant';
  const prefix = isHant ? "/hant" : "";

  const directoryLinks = [
    { slug: "huawei", zh: "华为手机下载", hant: "華為手機下載" },
    { slug: "xiaomi", zh: "小米手机安装", hant: "小米手機安裝" },
    { slug: "oppovivo", zh: "OPPO/VIVO安装", hant: "OPPO/VIVO安裝" },
    { slug: "appleid", zh: "苹果海外ID", hant: "蘋果海外ID" },
    { slug: "yanzhengma", zh: "验证码报错", hant: "驗證碼報錯" },
    { slug: "diqu", zh: "地区不支持", hant: "地區不支持" },
    { slug: "wangluo", zh: "网络异常", hant: "網絡異常" },
    { slug: "authenticator", zh: "谷歌验证器重置", hant: "谷歌驗證器重置" },
    { slug: "c2c", zh: "新手买币教程", hant: "新手買幣教程" },
    { slug: "dongjie", zh: "出金防冻卡", hant: "出金防凍卡" },
    { slug: "kyc", zh: "实名认证安全", hant: "實名認證安全" },
    { slug: "web3", zh: "Web3钱包使用", hant: "Web3錢包使用" },
    { slug: "kefu", zh: "联系平台客服", hant: "聯繫平台客服" },
    { slug: "fangpian", zh: "防骗防假包", hant: "防騙防假包" },
    { slug: "fanyong", zh: "手续费返佣", hant: "手續費返佣" },
    { slug: "gendan", zh: "合约跟单交易", hant: "合約跟單交易" },
    { slug: "okb", zh: "平台币 OKB", hant: "平台幣 OKB" },
    { slug: "jiechi", zh: "网站被解析异常", hant: "網站被解析异常" },
    { slug: "wangzhi", zh: "最新平台网址", hant: "最新平台網址" },
    { slug: "lianjie", zh: "平台注册链接", hant: "平台註冊鏈接" },
    { slug: "dizhi", zh: "最新登录地址", hant: "最新登錄地址" },
    { slug: "zenmelian", zh: "APP怎么连接", hant: "APP怎麼連接" },
    { slug: "vpn", zh: "全球网络配置", hant: "全球網絡配置" },
    { slug: "xinshou", zh: "新手入门指南", hant: "新手入門指南" },
    { slug: "yaoqingsong", zh: "专属邀请码福利", hant: "專屬邀請碼福利" },
    { slug: "zainali", zh: "平台入口在哪里", hant: "平台入口在哪裡" },
    { slug: "jiaoyirumen", zh: "新手买币交易", hant: "新手買幣交易" },
    { slug: "zhanghaozhuce", zh: "安全账号注册", hant: "安全帳號註冊" }
  ];

  return (
    <section id="directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
      <div className="bg-zinc-950/40 border border-zinc-900/60 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 bg-yellow-500 rounded-full" />
          <h3 className="text-zinc-200 font-bold text-sm md:text-base tracking-wide">
            {isHant ? "常見問題與專題指引" : "常见问题与专题指引"}
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          {directoryLinks.map((link) => (
            <Link
              key={link.slug}
              href={`${prefix}/${link.slug}/`}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-zinc-900/40 text-zinc-400 hover:text-yellow-500 hover:border-yellow-500/20 hover:bg-yellow-500/[0.02] transition duration-200 select-none"
            >
              <span>{isHant ? link.hant : link.zh}</span>
              <span className="text-[10px] opacity-0 group-hover:opacity-100 transition duration-150 font-mono">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
