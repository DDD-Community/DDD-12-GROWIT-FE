'use client';

import { HTMLMotionProps, motion } from 'motion/react';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  type?: keyof typeof motion;
}

export const MotionWrapper = ({ ref, children, type, ...props }: MotionWrapperProps) => {
  if (type && motion[type]) {
    const MotionComponent = motion[type] as any;
    return (
      <MotionComponent {...props} ref={ref}>
        {children}
      </MotionComponent>
    );
  }

  return (
    <motion.div {...props} ref={ref}>
      {children}
    </motion.div>
  );
};
