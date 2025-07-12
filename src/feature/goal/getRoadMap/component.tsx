'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import StepBox from '@/shared/components/display/StepBox';
import { apiClient } from '@/shared/lib/apiClient';
import ToolTip from '@/shared/components/display/ToolTip';
import type { Plan, BeforeAfter } from './type';

export const GetRoadMap = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [asIs, setAsIs] = useState('');
  const [toBe, setToBe] = useState('');

  const [tooltipStates, setTooltipStates] = useState({
    earth: false,
    rocket: false,
    week1: false,
    week2: false,
    week3: false,
    week4: false,
  });

  const handleMouseEnter = (key: keyof typeof tooltipStates) => {
    console.log(key);
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

  const initRoadMap = (beforeAfter: BeforeAfter, plans: Plan[]) => {
    setAsIs(beforeAfter.asIs);
    setToBe(beforeAfter.toBe);
    setPlans(plans);
  };
  useEffect(() => {
    const fetchGoals = async () => {
      const response = await apiClient.get('mock/goals');
      const data: any = response.data;
      const beforeAfter: BeforeAfter = data.data[0].beforeAfter;
      const plans: Plan[] = data.data[0].plans;
      initRoadMap(beforeAfter, plans);
    };
    fetchGoals();
  }, []);

  return (
    <section className="relative">
      <Image src={'/road-map-bg.png'} alt="road-map" width={278} height={570} />
      <div
        className="absolute top-12 right-16 cursor-pointer hover:opacity-80 transition-opacity z-1"
        onMouseEnter={() => handleMouseEnter('earth')}
        onMouseLeave={() => handleMouseLeave('earth')}
        onClick={() => toggleTooltip('earth')}
      >
        <Image src={'/earth-blue.png'} alt="earth" width={96} height={89} />
      </div>
      {tooltipStates.earth && <ToolTip text={toBe} className="absolute top-8 right-1/4 z-2" />}

      <div
        className="absolute bottom-12 right-16 cursor-pointer hover:opacity-80 transition-opacity z-1"
        onMouseEnter={() => handleMouseEnter('rocket')}
        onMouseLeave={() => handleMouseLeave('rocket')}
        onClick={() => toggleTooltip('rocket')}
      >
        <Image src={'/rocket.png'} alt="earth" width={96} height={89} />
      </div>
      {tooltipStates.rocket && <ToolTip text={asIs} className="absolute bottom-36 right-1/4 z-2" />}

      <svg className="absolute top-8 w-[470px] h-[500px]" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
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
            <StepBox step={1} className="absolute bottom-32 right-40" />
            {tooltipStates.week1 && (
              <ToolTip text={plans.length ? plans[0].content : ''} className="absolute bottom-1/3 right-34 z-2" />
            )}
          </div>
          <div
            onMouseEnter={() => handleMouseEnter('week2')}
            onMouseLeave={() => handleMouseLeave('week2')}
            onClick={() => toggleTooltip('week2')}
          >
            <StepBox step={2} className="absolute top-1/2 left-6" />
            {tooltipStates.week2 && <ToolTip text={plans[1].content} className="absolute bottom-1/2 left-1 z-2" />}
          </div>
          <div
            onMouseEnter={() => handleMouseEnter('week3')}
            onMouseLeave={() => handleMouseLeave('week3')}
            onClick={() => toggleTooltip('week3')}
          >
            <StepBox step={3} className="absolute top-1/3 left-6" />
            {tooltipStates.week3 && <ToolTip text={plans[2].content} className="absolute top-40 -left-5 z-2" />}
          </div>
          <div
            onMouseEnter={() => handleMouseEnter('week4')}
            onMouseLeave={() => handleMouseLeave('week4')}
            onClick={() => toggleTooltip('week4')}
          >
            <StepBox step={4} className="absolute top-1/5 left-1/4" />
            {tooltipStates.week4 && <ToolTip text={plans[3].content} className="absolute top-1/7 left-1/4 z-2" />}
          </div>
        </>
      )}
    </section>
  );
};
