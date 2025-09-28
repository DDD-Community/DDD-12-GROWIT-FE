'use client';

import { useState, useCallback } from 'react';

export const useFunnelHeaderState = () => {
  const [isVisible, setIsVisible] = useState(true);

  const showHeader = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideHeader = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    showHeader,
    hideHeader,
  };
};
