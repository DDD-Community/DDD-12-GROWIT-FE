'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Badge from '@/shared/components/display/Badge';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { Goal, GoalCategoryEnum } from '@/shared/type/goal';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';

export const PlanetItem = ({ goal }: { goal: Goal }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { trackButtonClick } = useGTMActions();

  const handlePlanetClick = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.GOAL_CLICK,
      buttonName: GTM_BUTTON_NAME.PLANET,
    });
    setIsTooltipOpen(true);
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
    }
    tooltipTimerRef.current = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
      }
    };
  }, []);

  const getGoalStatus = (goal: Goal) => {
    const today = new Date();
    const endDate = new Date(goal.duration.endDate);
    return today > endDate ? '종료' : '진행중';
  };

  const getBadgeProps = (goal: Goal) => {
    const status = getGoalStatus(goal);

    if (status === '종료') {
      return {
        label: '종료',
        color: 'bg-[rgba(112,115,124,0.22)]',
        textColor: 'text-[rgba(194,196,200,0.88)]',
      };
    } else {
      return {
        label: '진행중',
        color: 'bg-[rgba(53,217,66,0.4)]',
        textColor: 'text-[#3AEE49]',
      };
    }
  };

  const badgeProps = getBadgeProps(goal);
  const status = getGoalStatus(goal);

  return (
    <div className="gap-5 w-full h-full flex flex-col justify-center">
      {/* Header */}
      <div className="px-2.5 py-2.5 w-full space-y-3">
        <div className="flex w-full justify-center">
          <Badge
            type="default"
            size="md"
            label={badgeProps.label}
            color={badgeProps.color}
            textColor={badgeProps.textColor}
            className={status === '종료' ? 'px-3 py-1 rounded-2xl' : ''}
          />
        </div>

        <h2 className="heading-2-bold text-label-normal text-center">{goal.name}</h2>
      </div>

      {/* Planet Image */}
      <button
        className="relative cursor-pointer transition-transform w-full flex items-center justify-center"
        onClick={handlePlanetClick}
      >
        <Image
          src={status === '종료' ? goal.planet.image.done : goal.planet.image.progress}
          width={200}
          height={200}
          alt={goal.name}
          className="object-cover"
          priority
        />
        {isTooltipOpen && (
          <ToolTip
            text={
              <p className="text-center">
                목표가 종료되면 <br /> 행성을 수집할 수 있어요
              </p>
            }
            position="top-center"
            tailPosition="top-center"
            className="inset-0"
          />
        )}
      </button>

      <p className="caption-1-medium text-text-secondary text-center">{goal.planet.name}</p>

      {/* duration date */}
      <div className="flex w-full justify-center gap-2.5 px-4 py-2.5">
        <span className="body-1-medium text-label-neutral">
          {goal.duration.startDate}~{goal.duration.endDate}
        </span>
      </div>
    </div>
  );
};
