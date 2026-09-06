'use client';

import { ComponentType } from 'react';
import { motion } from 'motion/react';

interface NavTabButtonProps {
  Icon: ComponentType<{ className?: string; filled?: boolean }>;
  label: string;
  active: boolean;
  onClick: () => void;
}

/**
 * BottomNavigation 탭 버튼 (Figma 196:1710/1717/1723)
 *
 * - label은 접근성 이름으로만 제공
 * - 활성 상태는 아이콘의 색상과 내부 채움으로 표시
 */
export const NavTabButton = ({ Icon, label, active, onClick }: NavTabButtonProps) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileTap={{ scale: 0.94 }}
    className={`relative flex w-full min-w-0 items-center justify-center px-1 py-3 transition-colors duration-200 ${
      active ? 'text-[#FCFCFC]' : 'text-[#A1A1A1]'
    }`}
    aria-pressed={active}
    aria-label={label}
  >
    <motion.span
      className="relative grid size-5 shrink-0 place-items-center"
      animate={{ scale: active ? 1.08 : 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    >
      <Icon className="block size-5 place-self-center" filled={active} />
    </motion.span>
  </motion.button>
);
