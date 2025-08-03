'use client';

import { Contribution } from '@/shared/type/Todo';

interface ContributionGridProps {
  contributionList: (Contribution | null)[];
}

const getContributionStyle = (contribution: Contribution | null) => {
  switch (contribution) {
    case 'COMPLETED':
      return {
        className: 'w-[30px] h-[30px] flex items-center justify-center rounded-md bg-accent-violet',
        icon: null,
      };
    case 'IN_PROGRESS':
      return {
        className: 'w-[30px] h-[30px] flex items-center justify-center rounded-md bg-accent-violet/60',
        icon: null,
      };
    case 'NOT_STARTED':
      return {
        className: 'w-[30px] h-[30px] flex items-center justify-center rounded-md bg-accent-violet/40',
        icon: null,
      };
    case 'NONE':
      return {
        className: 'w-[30px] h-[30px] flex items-center justify-center rounded-md bg-gray-800',
        icon: (
          <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.5 1.5L1.5 8.5M1.5 1.5L8.5 8.5"
              stroke="#7D5EF7"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      };
    case null:
    default:
      return {
        className: 'w-[30px] h-[30px] flex items-center justify-center rounded-md bg-gray-600',
        icon: null,
      };
  }
};

const renderContributionItem = (contribution: Contribution | null, index: number) => {
  const { className, icon } = getContributionStyle(contribution);

  return (
    <div key={`contribution-${index}`} className={className}>
      {icon}
    </div>
  );
};

export const ContributionGrid = ({ contributionList }: ContributionGridProps) => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {contributionList.map((item, index) => renderContributionItem(item, index))}
    </div>
  );
};
