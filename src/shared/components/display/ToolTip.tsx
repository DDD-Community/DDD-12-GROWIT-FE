interface ToolTipProps {
  text: string;
  className?: string;
}

export const ToolTip = ({ text, className = '' }: ToolTipProps) => {
  return (
    <div className={`absolute ${className}`}>
      <div className="relative py-2 px-3 bg-label-normal rounded-xl text-semibold text-xs whitespace-nowrap">
        {text}
        {/* 꼬리 */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[8px] border-t-label-normal" />
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
