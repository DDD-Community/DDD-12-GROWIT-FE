'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../input/Button';
import { NAVIGATION_ROUTES, ROUTES, titleStyle } from '@/shared/constants/routes';
import { useState } from 'react';

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

  const sidebarInitalAnimation = {
    opacity: 0,
    x: -16,
    scale: 0.9,
  };

  const sidebarDuringAnimation = {
    opacity: 1,
    x: 0,
    scale: 1,
  };

  const sidebarExitAnimation = {
    opacity: 0,
    x: 0,
    scale: 0.95,
  };

  return (
    <motion.aside
      initial="open"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`max-sm:hidden flex min-h-screen gap-[24px] bg-fill-normal flex-col items-center py-8 px-4 shadow-lg`}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="open-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full flex items-center justify-between pl-2"
          >
            <Link href={'/home'}>
              <Image src="/icon/growit-title-logo.svg" alt="icon of growit" width={100} height={32} />
            </Link>
            <Button
              variant="tertiary"
              layout="icon-only"
              onClick={() => {
                setIsOpen(!isOpen);
                setHover(false);
              }}
              icon={<Image src="/icon/sidebar.svg" alt="control-sidebar" width={24} height={24} />}
              size="sm"
            />
          </motion.div>
        ) : (
          <motion.div
            key="closed-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              <Button
                variant="tertiary"
                layout="icon-only"
                icon={
                  hover ? (
                    <Image src="/icon/sidebar.svg" alt="control-sidebar" width={24} height={24} />
                  ) : (
                    <Image src="/logo-favicon.svg" alt="icon of growit" width={24} height={24} />
                  )
                }
                onClick={() => {
                  if (hover) setIsOpen(true);
                  else router.push('home');
                }}
                size="sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                icon={
                  item.path === '/mypage' ? (
                    <div className="w-full flex items-center gap-2">
                      {active ? (
                        <Image src="/icon/navigation-myprofile-active.svg" alt={item.alt} width={22} height={22} />
                      ) : (
                        <Image src="/icon/navigation-myprofile-inactive.svg" alt={item.alt} width={22} height={22} />
                      )}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span
                            key={`${item.path}-text`}
                            className={`whitespace-nowrap ${active ? titleStyle.active : titleStyle.inActive}`}
                            initial={sidebarInitalAnimation}
                            animate={sidebarDuringAnimation}
                            exit={sidebarExitAnimation}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                          >
                            마이페이지
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="w-full flex items-center gap-2">
                      <Image
                        src={item.icon}
                        alt={item.alt}
                        width={22}
                        height={22}
                        className={active ? 'brightness-0 invert' : ''}
                      />

                      <AnimatePresence>
                        {isOpen && (
                          <motion.span
                            key={`${item.path}-text`}
                            className={`whitespace-nowrap ${active ? titleStyle.active : titleStyle.inActive}`}
                            initial={sidebarInitalAnimation}
                            animate={sidebarDuringAnimation}
                            exit={sidebarExitAnimation}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
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
