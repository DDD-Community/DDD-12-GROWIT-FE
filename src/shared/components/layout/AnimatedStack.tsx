'use client';

import { useContext } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { StackNavigationContext, AnimationDirection } from './StackNavigateProvider';

interface AnimatedStackProps {
  children: React.ReactNode;
  basePath: string;
}

const getVariants = (direction: AnimationDirection) => ({
  initial: { x: direction === 'right' ? '100%' : '-100%' },
  animate: { x: 0 },
  exit: { x: direction === 'right' ? '-100%' : '100%' },
});

export function AnimatedStack({ children, basePath }: AnimatedStackProps) {
  const pathname = usePathname();
  const { direction } = useContext(StackNavigationContext);
  const variants = getVariants(direction);

  // basePath보다 깊은 경로일 때만 스택 표시
  const isStackRoute = pathname !== basePath && pathname.startsWith(basePath);

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
          className="absolute inset-0 max-w-md w-full h-full mx-auto bg-bg-default z-10"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
