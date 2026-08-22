/**
 * Local Fallback Data
 * 
 * 当所有 Worker 节点都无法访问时，将使用此处的配置作为兜底。
 */

export interface GatewayConfig {
    channel_id?: string;
    android: {
        china: string;
        global: string;
        china_label?: string;
        global_label?: string;
    };
    web: {
        china: string;
        global: string;
        china_label?: string;
        global_label?: string;
    };
}

export const FALLBACK_DATA: GatewayConfig = {
    channel_id: 'ACE528829',
    android: {
        china: 'https://static.okx.com/upgradeapp/okx-android.apk',
        global: 'https://static.okx.com/upgradeapp/okx-android.apk',
        china_label: '安卓下载（推荐线路）',
        global_label: '安卓下载（国际线路）'
    },
    web: {
        china: 'https://www.okx.com/join/ACE528829',
        global: 'https://www.okx.com/join/ACE528829',
        china_label: '查看访问入口（推荐线路）',
        global_label: '查看访问入口（国际线路）'
    }
};
