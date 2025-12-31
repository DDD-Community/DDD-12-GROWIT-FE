'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { Z_INDEX } from '@/shared/lib/z-index';

type FloatingButtonSize = 'sm' | 'md' | 'lg';

interface FloatingButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  size?: FloatingButtonSize;
  icon?: React.ReactNode;
}

const sizeClasses: Record<FloatingButtonSize, string> = {
  sm: 'w-12 h-12',
  md: 'w-[60px] h-[60px]',
  lg: 'w-16 h-16',
};

const iconSizeClasses: Record<FloatingButtonSize, string> = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FloatingButton = ({
  size = 'md',
  icon,
  onClick,
  disabled = false,
  className,
  'aria-label': ariaLabel = '추가',
  ...props
}: FloatingButtonProps) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'fixed bottom-24 right-[max(1.5rem,calc(50vw-200px))]',
        Z_INDEX.FAB,
        'rounded-full bg-brand-neon text-static-black',
        'flex items-center justify-center',
        'shadow-lg hover:shadow-xl',
        'transition-shadow duration-200',
        'focus:outline-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {icon || <PlusIcon className={iconSizeClasses[size]} />}
    </motion.button>
  );
};

export default FloatingButton;
