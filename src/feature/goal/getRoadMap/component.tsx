'use client';

import { useState } from 'react';
import { StartBox, StepBox, GoalBox } from '@/shared/components/display/StepBox';
import type { Plan, BeforeAfter } from './type';

interface GetRoadMapProps {
  beforeAfter: BeforeAfter;
  plans: Plan[];
}
export const GetRoadMap = ({ beforeAfter, plans }: GetRoadMapProps) => {
  const [tooltipStates, setTooltipStates] = useState({
    earth: false,
    rocket: false,
    week1: false,
    week2: false,
    week3: false,
    week4: false,
  });

  const handleMouseEnter = (key: keyof typeof tooltipStates) => {
    setTooltipStates(prev => ({ ...prev, [key]: true }));
  };

  const handleMouseLeave = (key: keyof typeof tooltipStates) => {
    setTooltipStates(prev => ({ ...prev, [key]: false }));
  };

  const toggleTooltip = (key: keyof typeof tooltipStates) => {
    setTooltipStates(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="relative overflow-r-hidden bg-[url('/road-map-bg.png')] w-[335px] md:w-[278px] h-[570px] bg-cover bg-no-repeat rounded-xl border border-line-normal md:border-none">
      <div
        onMouseEnter={() => handleMouseEnter('earth')}
        onMouseLeave={() => handleMouseLeave('earth')}
        onClick={() => toggleTooltip('earth')}
      >
        <StartBox
          showToolTip={tooltipStates.earth}
          toolTipContent={beforeAfter.toBe}
          imgSrc="/earth-blue.png"
          alt="earth"
          imgWidth={96}
          imgHeight={89}
          className="absolute top-8 right-8 md:right-4 cursor-pointer hover:opacity-80 transition-opacity z-1"
        />
      </div>

      <div
        onMouseEnter={() => handleMouseEnter('rocket')}
        onMouseLeave={() => handleMouseLeave('rocket')}
        onClick={() => toggleTooltip('rocket')}
      >
        <GoalBox
          showToolTip={tooltipStates.rocket}
          toolTipContent={beforeAfter.asIs}
          imgSrc="/rocket.png"
          alt="rocket"
          imgWidth={96}
          imgHeight={89}
          className="absolute bottom-10 right-10 cursor-pointer hover:opacity-80 transition-opacity z-1"
        />
      </div>

      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 60 300" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M48,45 Q-15,100 -10,150 Q-15,200 48,255"
          stroke="white"
          fill="none"
          strokeWidth="1"
          strokeDasharray="3,8"
          strokeLinecap="round"
        />
      </svg>

      {plans.length && (
        <>
          <div
            onMouseEnter={() => handleMouseEnter('week1')}
            onMouseLeave={() => handleMouseLeave('week1')}
            onClick={() => toggleTooltip('week1')}
          >
            <StepBox
              step={1}
              showToolTip={tooltipStates.week1}
              toolTipContent={plans[2].content}
              className="absolute bottom-[100px] left-[120px] md:bottom-[140px] md:left-[70px]"
              onClick={() => toggleTooltip('week1')}
            />
          </div>
          <div onMouseEnter={() => handleMouseEnter('week2')} onMouseLeave={() => handleMouseLeave('week2')}>
            <StepBox
              step={2}
              showToolTip={tooltipStates.week2}
              toolTipContent={plans[1].content}
              className="absolute bottom-[200px] left-[65px] md:bottom-[240px] md:left-[30px]"
              onClick={() => toggleTooltip('week2')}
            />
          </div>
          <div onMouseEnter={() => handleMouseEnter('week3')} onMouseLeave={() => handleMouseLeave('week3')}>
            <StepBox
              step={3}
              showToolTip={tooltipStates.week3}
              toolTipContent={plans[2].content}
              className="absolute top-[190px] left-[60px] md:top-[170px] md:left-[35px]"
              onClick={() => toggleTooltip('week3')}
            />
          </div>
          <div onMouseEnter={() => handleMouseEnter('week4')} onMouseLeave={() => handleMouseLeave('week4')}>
            <StepBox
              step={4}
              showToolTip={tooltipStates.week4}
              toolTipContent={plans[3].content}
              className="absolute top-[90px] left-[120px] md:left-[90px]"
              onClick={() => toggleTooltip('week4')}
            />
          </div>
        </>
      )}
    </section>
  );
};
