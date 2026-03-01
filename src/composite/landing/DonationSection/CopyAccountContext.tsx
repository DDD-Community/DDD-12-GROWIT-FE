'use client';

import { createContext, useContext, useState } from 'react';

type CopyAccountContextType = {
  isCopied: boolean;
  setIsCopied: (value: boolean) => void;
};

export const CopyAccountContext = createContext<CopyAccountContextType | undefined>(undefined);

export const CopyAccountContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);
  return <CopyAccountContext.Provider value={{ isCopied, setIsCopied }}>{children}</CopyAccountContext.Provider>;
};

export const useCopyAccountContext = () => {
  const context = useContext(CopyAccountContext);
  if (!context) {
    throw new Error('useCopyAccountContext must be used within a CopyAccountProvider');
  }
  return context;
};
