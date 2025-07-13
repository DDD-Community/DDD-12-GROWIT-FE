import localFont from 'next/font/local';

interface StepBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  className?: string;
}

const ramche = localFont({
  src: '../../../../public/fonts/Ramche.woff2',
  display: 'swap',
});

const StepBox = ({ step, className }: StepBoxProps) => {
  return (
    <div
      className={`${ramche.className} w-16 h-16 text-lg flex items-center justify-center border-2 rounded-full border-primary-strong bg-gray-600 shadow-xs text-primary-strong hover:border-accent-violet hover:text-primary-normal hover:bg-accent-violet/30 ${className}`}
    >
      {step}
    </div>
  );
};

export default StepBox;
