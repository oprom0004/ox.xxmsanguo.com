/**
 * Worker Domain Configuration
 * 
 * 专门用于配置 Cloudflare Worker 的访问地址。
 */

export const WORKER_DOMAINS = [
    'https://ooo.clickwar.app/return.json', // 自定义专属域名 (首选)
    'https://cfgreturn.pages.dev/return.json' // Pages 静态源 (备用)
];
