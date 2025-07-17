'use client';

import { Earth } from './icons';
import { GetRoadMap } from '@/feature/goal/getRoadMap/component';
import type { Plan, BeforeAfter } from '@/feature/goal/getRoadMap/type';
import { apiClient } from '@/shared/lib/apiClient';
import { useEffect, useState } from 'react';

export const GoalRoadMap = () => {
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfter>();
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchRoadMap = async () => {
      try {
        const response = await apiClient.get('/mock/goals');
        const data: any = response.data;
        const beforeAfter: BeforeAfter = data.data[0].beforeAfter;
        const plans: Plan[] = data.data[0].plans;
        setBeforeAfter(beforeAfter);
        setPlans(plans);
      } catch (error) {
        console.error('Failed to fetch roadmap:', error);
      }
    };

    fetchRoadMap();
  }, []);

  return (
    <aside className="hidden md:block w-full p-6">
      <article>
        <h2 className="heading-1-bold flex gap-2 text-primary-normal pb-4">
          <Earth />
          로드맵
        </h2>
        {beforeAfter && <GetRoadMap beforeAfter={beforeAfter} plans={plans} />}
      </article>
    </aside>
  );
};
