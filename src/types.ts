export interface SiteConfig {
  invitationCode: string;
  referralUrl: string;
  androidApkUrl: string;
  googlePlayUrl: string;
  iosAppStoreUrl: string;
  windowsDownloadUrl: string;
  macIntelDownloadUrl: string;
  macM1DownloadUrl: string;
  officialMirrorUrl: string;
  registerHelpContact: string;
  announcement: string;
}

export const DEFAULT_CONFIG: SiteConfig = {
  invitationCode: "ACE528829",
  referralUrl: "https://www.okx.com/join/ACE528829",
  androidApkUrl: "https://static.okx.com/upgradeapp/okx-android.apk",
  googlePlayUrl: "https://play.google.com/store/apps/details?id=com.okinc.okex.gp",
  iosAppStoreUrl: "https://apps.apple.com/us/app/okx-buy-bitcoin-btc-crypto/id1437251942",
  windowsDownloadUrl: "https://static.okx.com/upgradeapp/OKX-setup.exe",
  macIntelDownloadUrl: "https://static.okx.com/upgradeapp/OKX-mac-Intel.dmg",
  macM1DownloadUrl: "https://static.okx.com/upgradeapp/OKX-mac-Apple-Silicon.dmg",
  officialMirrorUrl: "https://ox.xxmsanguo.com",
  registerHelpContact: "https://t.me/ouxcex",
  announcement: "提示：本站仅整理访问入口与使用教程，不处理登录、交易或资金操作。",
};

export interface MirrorItem {
  name: string;
  url: string;
  speed: string;
  status: "fast" | "normal" | "slow";
}

export interface SeoPageData {
  route: string;
  tabLabel: string;
  title: string;
  description: string;
  keywords: string;
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  customIntroTitle: string;
  customIntroBody: string;
  detailedSteps: {
    step: number;
    title: string;
    desc: string;
  }[];
  targetedFaq: {
    q: string;
    a: string;
  }[];
  publishDate?: string;
}
