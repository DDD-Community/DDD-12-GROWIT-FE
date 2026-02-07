'use client';

import { createContext, useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type AnimationDirection = 'left' | 'right';

export interface StackNavigationContextType {
  direction: AnimationDirection;
  push: (path: string) => void;
  pop: () => void;
  replace: (path: string) => void;
}

export const StackNavigationContext = createContext<StackNavigationContextType>({
  direction: 'right',
  push: () => {},
  pop: () => {},
  replace: () => {},
});

interface StackNavigationProviderProps {
  children: React.ReactNode;
  className?: string;
}

export const StackNavigateProvider = ({ children, className }: StackNavigationProviderProps) => {
  const router = useRouter();
  const [direction, setDirection] = useState<AnimationDirection>('right');

  const push = useCallback(
    (path: string) => {
      setDirection('right');
      router.push(path);
    },
    [router]
  );

  const pop = useCallback(() => {
    setDirection('left');
    router.back();
  }, [router]);

  const replace = useCallback(
    (path: string) => {
      setDirection('right');
      router.replace(path);
    },
    [router]
  );

  // 브라우저 뒤로가기/앞으로가기 감지
  useEffect(() => {
    const handlePopState = () => {
      setDirection('left');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <StackNavigationContext.Provider value={{ direction, push, pop, replace }}>
      <div className={className}>{children}</div>
    </StackNavigationContext.Provider>
  );
};
