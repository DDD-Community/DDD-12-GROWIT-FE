'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Z_INDEX } from '@/shared/lib/z-index';

interface AnimatedStackProps {
  children: React.ReactNode;
  basePath?: string;
  isActive?: boolean;
  excludePaths?: string[];
}

const getVariants = () => ({
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
});

export function AnimatedStack({ children, basePath = '/', isActive, excludePaths = [] }: AnimatedStackProps) {
  const pathname = usePathname();
  const variants = getVariants();

  const normalizePath = (path: string) => (path === '/' ? path : path.replace(/\/+$/, ''));
  const normalizedPathname = normalizePath(pathname);
  const normalizedBasePath = normalizePath(basePath);
  const nestedPathPrefix = normalizedBasePath === '/' ? '/' : `${normalizedBasePath}/`;

  const isExcluded = excludePaths.some(path => normalizedPathname.startsWith(normalizePath(path)));

  // isActive가 명시적으로 전달되면 우선 사용, 없으면 basePath 기반으로 판단
  const isStackRoute = isExcluded
    ? false
    : isActive !== undefined
      ? isActive
      : normalizedPathname !== normalizedBasePath && normalizedPathname.startsWith(nestedPathPrefix);

  return (
    <AnimatePresence mode="wait">
      {isStackRoute && (
        <motion.div
          key={pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`absolute inset-0 max-w-md w-full h-full mx-auto bg-bg-default ${Z_INDEX.SHEET}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
