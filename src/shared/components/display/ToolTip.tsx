type ToolTipPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface ToolTipProps {
  text: string;
  className?: string;
  position?: ToolTipPosition;
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
    default:
      return 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-8 border-b-label-normal border-x-8 border-x-transparent';
  }
};

export const ToolTip = ({ text, className = '', position = 'bottom-center' }: ToolTipProps) => {
  return (
    <div className={`absolute ${getPositionClasses(position)} ${className}`}>
      <div className="relative py-2 px-3 bg-white rounded-xl text-semibold text-xs whitespace-nowrap text-black">
        {text}
        {/* 꼬리 */}
        <div className={`absolute ${getTailPositionClasses(position)} w-0 h-0`} />
      </div>
    </div>
  );
};

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
