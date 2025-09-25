'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useFunnelHeaderState } from './useFunnelHeaderState';

interface FunnelHeaderContextValue {
  isVisible: boolean;
  showHeader: () => void;
  hideHeader: () => void;
}

const FunnelHeaderContext = createContext<FunnelHeaderContextValue | null>(null);

interface FunnelHeaderProviderProps {
  children: ReactNode;
}

export const FunnelHeaderProvider = ({ children }: FunnelHeaderProviderProps) => {
  const { isVisible, showHeader, hideHeader } = useFunnelHeaderState();

  return (
    <FunnelHeaderContext.Provider value={{ isVisible, showHeader, hideHeader }}>
      {children}
    </FunnelHeaderContext.Provider>
  );
};

export const useFunnelHeader = () => {
  const context = useContext(FunnelHeaderContext);
  if (!context) {
    throw new Error('useFunnelHeader must be used within a FunnelHeaderProvider');
  }
  return context;
};
