type ProgressBarProps = {
  percentage: number;
  className?: string;
};

export default function ProgressBar({ percentage, className }: ProgressBarProps) {
  return (
    <div className={`h-[10px] w-full bg-[#2A2B31] rounded-full overflow-visible ${className}`}>
      <div
        className={`relative h-[8px] my-[1px] bg-gradient-to-r rounded-full from-[#39D98A] via-[#0EA5E9] to-[#2A2B31]`}
        style={{ width: `${percentage}%` }}
      >
        <div className={`absolute top-[-4px] right-[-4px] w-[16px] h-[16px] rounded-full bg-white blur-md`} />
      </div>
    </div>
  );
}
