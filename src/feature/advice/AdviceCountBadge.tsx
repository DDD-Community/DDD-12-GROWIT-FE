type AdviceCountBadgeProps = {
  adviceCount: number;
  maxAdviceCount?: number;
};
export const AdviceCountBadge = ({ adviceCount, maxAdviceCount = 3 }: AdviceCountBadgeProps) => {
  const countTextColor = adviceCount > 0 && adviceCount <= maxAdviceCount ? 'text-brand-neon' : 'text-status-negative';
  return (
    <span
      role="status"
      className="caption-1-regular px-2 py-1 rounded-full flex items-center gap-x-1 bg-fill-normal text-text-primary"
    >
      남은 대화{' '}
      <span className={`${countTextColor}`}>
        {adviceCount}/{maxAdviceCount}
      </span>{' '}
    </span>
  );
};
