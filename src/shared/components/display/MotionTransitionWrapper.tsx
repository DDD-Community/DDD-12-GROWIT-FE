'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type MotionTransitionWrapperProps = React.PropsWithChildren<{
  className?: string;
  useViewTransition?: boolean;
}>;

type NavigationDirection = 'forward' | 'backward';

export default function MotionTransitionWrapper({
  children,
  className,
  useViewTransition = false,
}: MotionTransitionWrapperProps) {
  const pathname = usePathname();
  const navigationDirectionRef = useRef<NavigationDirection>('forward');
  const prevPathnameRef = useRef<string>(pathname);
  const supportViewTransition = typeof document !== 'undefined' && 'startViewTransition' in document;

  useEffect(() => {
    const handlePopState = () => {
      navigationDirectionRef.current = 'backward';
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (pathname !== prevPathnameRef.current) {
        navigationDirectionRef.current = 'forward';
      }
    };
  }, [pathname]);

  const variants = {
    initial: {
      opacity: 0,
      x: navigationDirectionRef.current === 'forward' ? 100 : -100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: navigationDirectionRef.current === 'forward' ? -100 : 100,
    },
  };

  if (useViewTransition && supportViewTransition) {
    return (
      <div className={className} style={{ viewTransitionName: 'page-transition' }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
