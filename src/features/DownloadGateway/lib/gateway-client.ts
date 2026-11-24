import { GATEWAY_CONFIG } from '../config/gateway.config';
import type { GatewayConfig } from '../config/fallback-data';

export type { GatewayConfig };

async function fetchWithTimeout(url: string, timeoutMs: number = 3000): Promise<any> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store',
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Fetch download links configuration from the Gateway API.
 * 多个节点并发竞速（Promise.any），并在 3 秒内超时截断，绝不卡顿。
 */
export async function fetchGatewayConfig(): Promise<GatewayConfig> {
    const { endpoints } = GATEWAY_CONFIG.gateway;
    const validEndpoints = (endpoints || []).filter(Boolean);

    return Promise.any(validEndpoints.map(async url => {
        const rawData = await fetchWithTimeout(url);
        const config = window.location.hostname.includes('oyweb') ? (rawData.oyweb || rawData) : rawData;
        if (!config?.android?.china || !config?.web?.china) throw new Error('Missing recommended route');
        return config;
    }));
}
