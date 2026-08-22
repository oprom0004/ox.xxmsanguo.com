"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteConfig, DEFAULT_CONFIG } from "@/types";

interface ConfigContextType {
  config: SiteConfig;
  saveConfig: (newConfig: SiteConfig) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem("ouxpc_site_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
      } catch (e) {
        console.error("加载配置文件失败，恢复默认配置：", e);
      }
    }
  }, []);

  const saveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem("ouxpc_site_config", JSON.stringify(newConfig));
  };

  return (
    <ConfigContext.Provider value={{ config, saveConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}
