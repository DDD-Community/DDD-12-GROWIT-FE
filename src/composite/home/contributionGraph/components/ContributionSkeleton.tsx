'use client';

export const ContributionSkeleton = () => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 28 }, (_, index) => (
        <div key={`loading-${index}`} className="w-[30px] h-[30px] bg-gray-700 rounded-md animate-pulse" />
      ))}
    </div>
  );
};
