'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useGTMPageView, useGTMUserProperties } from '../../hooks/useGTM';

interface GTMContextType {
  // GTM 관련 메서드들을 추가 가능
}

const GTMContext = createContext<GTMContextType>({});

interface GTMProviderProps {
  children: React.ReactNode;
  userId?: string;
  userProperties?: Record<string, any>;
}

export const GTMProvider: React.FC<GTMProviderProps> = ({ children, userId, userProperties }) => {
  useGTMPageView();
  useGTMUserProperties(userId, userProperties);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('GTM initialized successfully');
    }
  }, []);

  return <GTMContext.Provider value={{}}>{children}</GTMContext.Provider>;
};

export const useGTMContext = () => {
  const context = useContext(GTMContext);
  if (!context) {
    throw new Error('useGTMContext must be used within a GTMProvider');
  }
  return context;
};
