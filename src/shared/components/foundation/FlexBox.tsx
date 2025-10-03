import type { HTMLAttributes } from 'react';

interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  direction?: 'row' | 'col';
  children: React.ReactNode;
}

const FlexBox = ({ className, direction = 'row', children, ...props }: FlexBoxProps) => {
  return (
    <div className={`flex ${direction === 'col' ? 'flex-col' : 'flex-row'} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default FlexBox;
