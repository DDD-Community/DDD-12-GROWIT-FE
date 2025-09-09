'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '../../input/Button';
import { NAVIGATION_ROUTES, ROUTES } from '@/shared/constants/routes';
import { useState } from 'react';
import { SideNavigationHeader } from './SideNavigationHeader';
import { NavigationItem } from './NavigationItem';

export const SideNaviagation = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [hover, setHover] = useState(false);

  const isActive = (path: string) => {
    if (path === ROUTES.RETROSPECT) return pathname.startsWith(path);
    return pathname === path;
  };

  // 애니메이션 variants
  const sidebarVariants = {
    open: { width: '16rem' },
    closed: { width: '5.5rem' },
  };

  return (
    <motion.aside
      initial="open"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`hidden md:flex min-h-screen gap-[24px] bg-fill-normal flex-col items-center py-8 px-4 shadow-lg`}
    >
      <SideNavigationHeader isOpen={isOpen} hover={hover} setIsOpen={setIsOpen} setHover={setHover} />
      <div className="flex-1 w-full flex flex-col items-center gap-4">
        {NAVIGATION_ROUTES.map(item => {
          const active = isActive(item.path);
          return (
            <motion.div key={item.path} whileTap={{ scale: 0.96 }} className="w-full">
              <Button
                key={item.path}
                variant="tertiary"
                layout="icon-only"
                className={active ? 'bg-surface-assistive w-full' : 'w-full'}
                onClick={() => router.push(item.path)}
                icon={<NavigationItem item={item} isOpen={isOpen} />}
                size={'lg'}
              />
            </motion.div>
          );
        })}
        {children}
      </div>
    </motion.aside>
  );
};
