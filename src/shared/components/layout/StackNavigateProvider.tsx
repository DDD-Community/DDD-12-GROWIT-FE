'use client';

import { createContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type AnimationDirection = 'left' | 'right';

export interface StackNavigationContextType {
  push: (path: string) => void;
  pop: () => void;
  replace: (path: string) => void;
}

export const StackNavigationContext = createContext<StackNavigationContextType>({
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

  const push = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const pop = useCallback(() => {
    router.back();
  }, [router]);

  const replace = useCallback(
    (path: string) => {
      router.replace(path);
    },
    [router]
  );

  return (
    <StackNavigationContext.Provider value={{ push, pop, replace }}>
      <div className={className}>{children}</div>
    </StackNavigationContext.Provider>
  );
};
