import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { StackNavigationContext } from '../components/layout/StackNavigateProvider';

export const useStackNavigate = () => {
  const context = useContext(StackNavigationContext);
  const pathname = usePathname();

  if (!context) {
    throw new Error('useStackNavigate must be used within a StackNavigationWrapper');
  }

  return {
    ...context,
    pathname,
  };
};
