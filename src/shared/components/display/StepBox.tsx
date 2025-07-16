import Image from 'next/image';
import localFont from 'next/font/local';
import ToolTip from './ToolTip';

interface StepBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  step?: number;
  showToolTip?: boolean;
  toolTipContent?: string;
  className?: string;
}

const ramche = localFont({
  src: '../../../../public/fonts/Ramche.woff2',
  display: 'swap',
});

export const StepBox = ({ step, showToolTip = false, toolTipContent = '', children, className }: StepBoxProps) => {
  return (
    <div
      className={`${ramche.className} min-w-16 min-h-16 text-lg flex items-center justify-center ${step && 'border-2 rounded-full border-primary-strong bg-gray-600 shadow-xs text-primary-strong hover:border-accent-violet hover:text-primary-normal hover:bg-accent-violet/30'}  ${className}`}
    >
      {step}
      {toolTipContent && showToolTip && (
        <ToolTip text={toolTipContent} className="absolute -top-12 right-1/2 transform translate-1/2 z-2 text-black" />
      )}
      {children}
    </div>
  );
};

interface StartOrGoalBoxProps extends StepBoxProps {
  imgSrc: string;
  alt: string;
  imgWidth: number;
  imgHeight: number;
}
export const StartBox = ({ imgSrc = '', alt = '', imgWidth = 0, imgHeight = 0, ...args }: StartOrGoalBoxProps) => {
  return (
    <StepBox {...args}>
      <Image src={imgSrc} alt={alt} width={imgWidth} height={imgHeight} />
    </StepBox>
  );
};

export const GoalBox = ({ imgSrc = '', alt = '', imgWidth = 0, imgHeight = 0, ...args }: StartOrGoalBoxProps) => {
  return (
    <StepBox {...args}>
      <Image src={imgSrc} alt={alt} width={imgWidth} height={imgHeight} />
    </StepBox>
  );
};
