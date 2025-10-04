import React from 'react';
import { useState, useEffect, memo } from 'react';

type ToolTipPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left';

interface ToolTipProps {
  text: string;
  className?: string;
  position?: ToolTipPosition;
  autoHide?: boolean;
  autoHideDelay?: number; // 밀리초 단위
}

const getPositionClasses = (position: ToolTipPosition) => {
  switch (position) {
    case 'top-left':
      return 'bottom-full left-0 mb-2';
    case 'top-center':
      return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    case 'top-right':
      return 'bottom-full right-0 mb-2';
    case 'bottom-left':
      return 'top-full left-0 mt-2';
    case 'bottom-center':
      return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
    case 'bottom-right':
      return 'top-full right-0 mt-2';
    case 'left':
      return 'top-2/3 right-full -translate-y-1/2 mr-1';
    default:
      return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
  }
};

const getTailPositionClasses = (position: ToolTipPosition) => {
  switch (position) {
    case 'top-left':
      return 'bottom-0 left-4 translate-y-full border-t-8 border-t-label-normal border-x-8 border-x-transparent';
    case 'top-center':
      return 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-8 border-t-label-normal border-x-8 border-x-transparent';
    case 'top-right':
      return 'bottom-0 right-4 translate-y-full border-t-8 border-t-label-normal border-x-8 border-x-transparent';
    case 'bottom-left':
      return 'top-0 left-4 -translate-y-full border-b-8 border-b-label-normal border-x-8 border-x-transparent';
    case 'bottom-center':
      return 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-8 border-b-label-normal border-x-8 border-x-transparent';
    case 'bottom-right':
      return 'top-0 right-4 -translate-y-full border-b-8 border-b-label-normal border-x-8 border-x-transparent';
    case 'left':
      return 'top-1/2 left-full -translate-y-1/2 border-l-6 border-l-label-normal border-y-6 border-y-transparent';
    default:
      return 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-8 border-b-label-normal border-x-8 border-x-transparent';
  }
};

export const ToolTip = React.memo(
  ({ text, className = '', position = 'bottom-center', autoHide = false, autoHideDelay = 2500 }: ToolTipProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      if (autoHide) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, autoHideDelay);

        return () => clearTimeout(timer);
      }
    }, [autoHide, autoHideDelay]);

    if (!isVisible) {
      return null;
    }

    return (
      <div className={`absolute z-10 ${getPositionClasses(position)} ${className}`}>
        <div className="relative py-2 px-3 bg-white rounded-xl caption-1-bold whitespace-nowrap text-black shadow-sm">
          {text}
          {/* 꼬리 */}
          {/* <div className={`absolute ${getTailPositionClasses(position)} w-0 h-0`} /> */}
        </div>
      </div>
    );
  }
);

interface DarkToolTip {
  children: React.ReactNode;
  className?: string;
}
export const DarkToolTip = ({ children, className = '' }: DarkToolTip) => {
  return (
    <div className={`absolute ${className} text-label-neutral caption-1-medium`}>
      <div className="relative py-2 px-3 bg-elevated-assistive rounded-xl whitespace-nowrap">{children}</div>
    </div>
  );
};
