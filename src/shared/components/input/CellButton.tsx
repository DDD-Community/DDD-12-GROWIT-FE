import { ButtonHTMLAttributes } from 'react';

interface CellButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  renderLeftSide: () => React.ReactNode;
  renderRightSide: () => React.ReactNode;
  className?: string;
}

export const CellButton = ({ renderLeftSide, renderRightSide, className, ...props }: CellButtonProps) => {
  return (
    <button
      className="w-full bg-fill-primary rounded-xl py-4 px-5 flex items-center justify-between ${className}"
      {...props}
    >
      {renderLeftSide()}
      {renderRightSide()}
    </button>
  );
};
