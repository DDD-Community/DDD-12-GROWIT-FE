'use client';

import { ComponentType } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface NavTabButtonProps {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}

/**
 * BottomNavigation 탭 버튼 (Figma 196:1710/1717/1723)
 *
 * - tab inner: gap-3, px-5 py-3
 * - active background: 절대 layer, inset-y-0 -left-1 -right-1 (좌우 4px 확장),
 *   bg-#404040, rounded-3xl(24px), shadow-tab
 * - active label: 14px Medium #FCFCFC
 * - icon: 20x20, color/inherit
 */
export const NavTabButton = ({ Icon, label, active, onClick }: NavTabButtonProps) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileTap={{ scale: 0.94 }}
    className={`relative flex w-full min-w-0 items-center justify-center px-1 py-3 transition-colors duration-200 ${
      active ? 'text-text-strong' : 'text-category-muted'
    }`}
    aria-pressed={active}
  >
    {active && (
      <motion.span
        layoutId="bottom-navigation-active-pill"
        aria-hidden="true"
        className="absolute inset-y-0 -left-1 -right-1 rounded-3xl bg-category-tab-inactive shadow-sm"
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      />
    )}
    <motion.span
      className="relative grid size-5 shrink-0 place-items-center"
      animate={{ scale: active ? 1.08 : 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    >
      <Icon className="block size-5 place-self-center" />
    </motion.span>
    <AnimatePresence initial={false}>
      {active && (
        <motion.span
          key="active-label"
          initial={{ width: 0, marginLeft: 0, opacity: 0, x: -4 }}
          animate={{ width: 'auto', marginLeft: 12, opacity: 1, x: 0 }}
          exit={{ width: 0, marginLeft: 0, opacity: 0, x: -4 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative overflow-hidden whitespace-nowrap text-[14px] font-medium leading-[1.43] text-text-strong"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);
