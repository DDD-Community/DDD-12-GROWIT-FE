import FlexBox from './FlexBox';

interface SkeletonUIProps {
  // 추후에 더 추가 예정
  size: 'sm' | 'lg';
  direction: 'col' | 'row';
  count: number;
  className?: string;
}
const Skeleton = ({ size, direction = 'row', count = 1, className }: SkeletonUIProps) => {
  return (
    <FlexBox direction={direction} className="gap-2">
      {Array.from({ length: count }).map(() => (
        <div
          className={`rounded-lg bg-gray-400 h-[44px] animate-pulse ${size === 'sm' ? 'w-[120px]' : 'w-[335px] md:w-[420px]'} ${className}`}
        />
      ))}
    </FlexBox>
  );
};

export default Skeleton;
