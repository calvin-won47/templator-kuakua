import React, { createContext, useContext } from 'react';

type AppConfig = any;

declare global {
  interface Window {
    APP_CONFIG: AppConfig;
  }
}

const ConfigContext = createContext<AppConfig | null>(null);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config = typeof window !== 'undefined' ? window.APP_CONFIG : null;
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === null) {
    throw new Error('useConfig 必须在 ConfigProvider 内部使用');
  }
  return context as AppConfig;
};