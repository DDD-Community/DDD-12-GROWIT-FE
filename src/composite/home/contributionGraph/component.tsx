'use client';

import { useState } from 'react';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Rocket } from './icons';
import { DarkToolTip } from '@/shared/components/display/ToolTip';
import { Contribution } from '@/shared/type/Todo';
import { useFetchContributionList } from './hooks';
import { useGoalSelector } from '@/shared/hooks';

export const ContributionGraph = () => {
  const { selectedGoal } = useGoalSelector();
  const { contributionList, isLoading } = useFetchContributionList(selectedGoal?.id || '');
  const [tooltipState, setTooltipState] = useState(false);

  const handleMouseEnter = () => {
    setTooltipState(true);
  };

  const handleMouseLeave = () => {
    setTooltipState(false);
  };

  const toggleTooltip = () => {
    setTooltipState(!tooltipState);
  };

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

  const getContributionDescription = (contribution: Contribution) => {
    switch (contribution) {
      case 'COMPLETED':
        return '투두 모두 완료';
      case 'IN_PROGRESS':
        return '완료 투두 1개 이상, 미완료 투두 1개 이상';
      case 'NOT_STARTED':
        return '투두 1개 이상, 완료 투두 없음';
      case 'NONE':
        return '등록된 투두 없음';
      default:
        return '등록된 투두 없음';
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

  if (isLoading) {
    return (
      <article className="w-full p-6 border border-line-normal rounded-lg md:border-none relative">
        <h2 className="heading-1-bold flex items-center gap-2 text-primary-normal pb-4">
          <Rocket />
          진척도
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }, (_, index) => (
            <div key={`loading-${index}`} className="w-[30px] h-[30px] bg-gray-700 rounded-md animate-pulse" />
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className="w-full p-6 border border-line-normal rounded-lg md:border-none relative">
      <h2 className="heading-1-bold flex items-center gap-2 text-primary-normal pb-4">
        <Rocket />
        진척도
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {contributionList.map((item, index) => renderContributionItem(item, index))}
      </div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={toggleTooltip}>
        <FlexBox className="gap-2 text-label-neutral my-4 relative">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_811_9591)">
              <path
                d="M8.00065 10.6667V8.00004M8.00065 5.33337H8.00732M14.6673 8.00004C14.6673 11.6819 11.6826 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8.00004C1.33398 4.31814 4.31875 1.33337 8.00065 1.33337C11.6826 1.33337 14.6673 4.31814 14.6673 8.00004Z"
                stroke="#C2C4C8"
                strokeOpacity="0.88"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_811_9591">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          진척도 단계
        </FlexBox>
      </div>
      {tooltipState && (
        <DarkToolTip
          children={
            <div className="flex flex-col gap-2">
              <FlexBox className="gap-2">
                <div className="w-4 h-4 rounded-sm bg-accent-violet/40" />
                {getContributionDescription('NOT_STARTED')}
              </FlexBox>
              <FlexBox className="gap-2">
                <div className="w-4 h-4 rounded-sm bg-accent-violet/60" />
                {getContributionDescription('IN_PROGRESS')}
              </FlexBox>
              <FlexBox className="gap-2">
                <div className="w-4 h-4 rounded-sm bg-accent-violet" />
                {getContributionDescription('COMPLETED')}
              </FlexBox>
              <FlexBox className="gap-2">
                <div className="w-4 h-4 rounded-sm flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.5 1.5L1.5 8.5M1.5 1.5L8.5 8.5"
                      stroke="#7D5EF7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {getContributionDescription('NONE')}
              </FlexBox>
            </div>
          }
        />
      )}
    </article>
  );
};
