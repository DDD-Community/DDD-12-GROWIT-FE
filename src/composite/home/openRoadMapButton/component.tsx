'use client';

import { apiClient } from '@/shared/lib/apiClient';
import { DownLoad, Earth } from '../goalRoadMap/icons';
import { GetRoadMap } from '@/feature/goal/getRoadMap/component';
import { BeforeAfter, Plan } from '@/feature/goal/getRoadMap/type';
import { useEffect, useState } from 'react';
import Button from '@/shared/components/input/Button';
import FlexBox from '@/shared/components/foundation/FlexBox';

const OpenRoadMapButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfter>();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchRoadMap = async () => {
      const response = await apiClient.get('/mock/goals');
      const data: any = response.data;
      const beforeAfter: BeforeAfter = data.data[0].beforeAfter;
      const plans: Plan[] = data.data[0].plans;
      setBeforeAfter(beforeAfter);
      setPlans(plans);
    };
    fetchRoadMap();
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between bg-label-button-alternative p-4 heading-2-bold text-label-normal border border-line-normal rounded-lg"
      >
        <span className="flex items-center gap-4">
          <Earth />
          RoadMap
        </span>
        <DownLoad />
      </button>
      {isOpen && plans.length && beforeAfter && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden">
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 md:relative md:z-auto">
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
            <GetRoadMap beforeAfter={beforeAfter} plans={plans} />
          </div>
        </div>
      )}
    </>
  );
};

export default OpenRoadMapButton;
