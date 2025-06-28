import Button from './Button';

interface ProgressBarProps {
  percent: number;
  onComplete: () => void;
  isComplete: boolean;
}

export default function ProgressBar({ percent, onComplete, isComplete }: ProgressBarProps) {
  return (
    <div className="w-full flex items-center gap-4 mt-8">
      <div className="flex-1 h-2 bg-[#232325] rounded-full overflow-hidden">
        <div className="h-full bg-primary-normal transition-all duration-300" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-white font-bold w-16 text-right">{percent}%</span>
      <Button
        size="ml"
        text="목표 작성 완료"
        onClick={onComplete}
        disabled={!isComplete}
        className={isComplete ? '' : 'opacity-50 cursor-not-allowed'}
      />
    </div>
  );
}
