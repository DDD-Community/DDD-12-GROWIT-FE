'use client';

import { ComponentType } from 'react';

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
  <button
    type="button"
    onClick={onClick}
    className={`relative flex items-center justify-center gap-3 px-5 py-3 shrink-0 transition-colors ${
      active ? 'text-[#FCFCFC]' : 'text-[#A1A1A1]'
    }`}
    aria-pressed={active}
  >
    {active && (
      <span
        aria-hidden="true"
        className="absolute inset-y-0 -left-1 -right-1 rounded-3xl bg-[#404040] shadow-[0px_2px_8px_rgba(0,0,0,0.06)]"
      />
    )}
    <Icon className="relative w-5 h-5" />
    {active && (
      <span className="relative text-[14px] font-medium leading-[1.43] text-[#FCFCFC] whitespace-nowrap">
        {label}
      </span>
    )}
  </button>
);
