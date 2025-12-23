'use client';

import { useState } from 'react';
import Button from '@/shared/components/input/Button';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { GetRoadMap } from '@/feature/goal/getRoadMap/component';
import { useGoalSelector } from '@/model/goal/context';
import { EarthIcon, MoveIcon } from './icons';

/**
 * @deprecated - 로드맵 기능은 hold
 */
const GoalRoadMapDesktop = () => {
  const { currentGoal } = useGoalSelector();

  if (!currentGoal) {
    return null;
  }

  return (
    <aside className="hidden md:block w-full p-6">
      <article>
        <h2 className="heading-1-bold flex gap-2 text-primary-normal pb-4">
          <EarthIcon />
          로드맵
        </h2>
        <GetRoadMap beforeAfter={{ asIs: '', toBe: '' }} plans={[]} />
      </article>
    </aside>
  );
};

/**
 * @deprecated - 로드맵 기능은 hold
 */
const GoalRoadMapMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentGoal } = useGoalSelector();

  if (!currentGoal) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between bg-label-button-alternative p-4 heading-2-bold text-label-normal border border-line-normal rounded-lg"
      >
        <span className="flex items-center gap-4">
          <EarthIcon />
          RoadMap
        </span>
        <MoveIcon />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-120 md:hidden">
          <div className="fixed inset-0 z-130 flex flex-col items-center justify-center gap-2 md:relative md:z-auto">
            <FlexBox className="w-[335px] justify-end">
              <Button
                layout="icon-only"
                size={'xl'}
                variant="tertiary"
                className="bg-label-button-neutral"
                onClick={() => setIsOpen(false)}
                icon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 5L5 15M5 5L15 15"
                      stroke="#F7F7F8"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
            </FlexBox>
            <GetRoadMap beforeAfter={{ asIs: '', toBe: '' }} plans={[]} />
          </div>
        </div>
      )}
    </>
  );
};

export const GoalRoadMap = {
  Desktop: GoalRoadMapDesktop,
  Mobile: GoalRoadMapMobile,
};
