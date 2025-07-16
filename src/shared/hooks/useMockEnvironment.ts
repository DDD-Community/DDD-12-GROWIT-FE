'use client';

import { useState, useEffect } from 'react';

export function useMockEnvironment() {
  const [isMockEnvironment, setIsMockEnvironment] = useState(false);

  useEffect(() => {
    // Mock 환경 감지 로직
    const checkMockEnvironment = () => {
      // 1. 개발 환경인지 확인
      const isDevelopment = process.env.NODE_ENV === 'development';

      // 2. MSW가 활성화되어 있는지 확인 (선택적)
      const hasMSW = typeof window !== 'undefined' && (window as any).__MSW_ENABLED__ === true;

      // 3. Mock API URL을 사용하고 있는지 확인
      const isUsingMockAPI =
        (typeof window !== 'undefined' && window.location.href.includes('mock')) ||
        localStorage.getItem('useMockAPI') === 'true';

      setIsMockEnvironment(isDevelopment || hasMSW || isUsingMockAPI);
    };

    checkMockEnvironment();
  }, []);

  return isMockEnvironment;
}
