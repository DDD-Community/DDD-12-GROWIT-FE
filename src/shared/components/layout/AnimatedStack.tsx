'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Z_INDEX } from '@/shared/lib/z-index';

interface AnimatedStackProps {
  children: React.ReactNode;
  basePath?: string;
  isActive?: boolean;
}

const getVariants = () => ({
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
});

export function AnimatedStack({ children, basePath = '/', isActive }: AnimatedStackProps) {
  const pathname = usePathname();
  const variants = getVariants();

  // isActive가 명시적으로 전달되면 우선 사용, 없으면 basePath 기반으로 판단
  const isStackRoute = isActive !== undefined
    ? isActive
    : pathname !== basePath && pathname.startsWith(basePath);

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
