'use client';

import Image from 'next/image';
import { useState } from 'react';
import StepBox from '@/shared/components/display/StepBox';
import ToolTip from '@/shared/components/display/ToolTip';
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
        className="absolute top-8 right-8 md:right-4 cursor-pointer hover:opacity-80 transition-opacity z-1"
        onMouseEnter={() => handleMouseEnter('earth')}
        onMouseLeave={() => handleMouseLeave('earth')}
        onClick={() => toggleTooltip('earth')}
      >
        <Image src={'/earth-blue.png'} alt="earth" width={96} height={89} />
      </div>
      {tooltipStates.earth && <ToolTip text={beforeAfter.toBe} className="mb-2 absolute top-0 right-12 md:right-8" />}

      <div
        className="absolute bottom-10 right-10 cursor-pointer hover:opacity-80 transition-opacity z-1"
        onMouseEnter={() => handleMouseEnter('rocket')}
        onMouseLeave={() => handleMouseLeave('rocket')}
        onClick={() => toggleTooltip('rocket')}
      >
        <Image src={'/rocket.png'} alt="rocket" width={96} height={89} />
      </div>
      {tooltipStates.rocket && <ToolTip text={beforeAfter.asIs} className="absolute bottom-36 right-14 z-2" />}

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
              className="absolute bottom-[100px] left-[120px] md:bottom-[140px] md:left-[70px]"
              onClick={() => toggleTooltip('week1')}
            />
            {tooltipStates.week1 && (
              <ToolTip
                text={plans.length ? plans[0].content : ''}
                className="absolute bottom-[180px] right-32 md:bottom-[210px] md:right-30 z-2"
              />
            )}
          </div>
          <div onMouseEnter={() => handleMouseEnter('week2')} onMouseLeave={() => handleMouseLeave('week2')}>
            <StepBox
              step={2}
              className="absolute bottom-[200px] left-[65px] md:bottom-[240px] md:left-[30px]"
              onClick={() => toggleTooltip('week2')}
            />
            {tooltipStates.week2 && (
              <ToolTip text={plans[1].content} className="absolute top-[255px] left-10 md:top-[230px] md:left-3 z-2" />
            )}
          </div>
          <div onMouseEnter={() => handleMouseEnter('week3')} onMouseLeave={() => handleMouseLeave('week3')}>
            <StepBox
              step={3}
              className="absolute top-[190px] left-[60px] md:top-[170px] md:left-[35px]"
              onClick={() => toggleTooltip('week3')}
            />
            {tooltipStates.week3 && (
              <ToolTip text={plans[2].content} className="absolute top-[140px] left-4 md:top-[130px] md:-left-2  z-2" />
            )}
          </div>
          <div onMouseEnter={() => handleMouseEnter('week4')} onMouseLeave={() => handleMouseLeave('week4')}>
            <StepBox
              step={4}
              className="absolute top-[90px] left-[120px] md:left-[90px]"
              onClick={() => toggleTooltip('week4')}
            />
            {tooltipStates.week4 && (
              <ToolTip
                text={plans[3].content}
                className="absolute top-[40px] left-[120px] md:top-[50px] md:left-[90px] z-2"
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};
