'use client';

import { RoadMap } from '@/shared/components/display/RoadMap';
import { useGoalSelector } from '@/model/goal/context';
import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import { EntireRetrospect } from '@/feature/retrospects/entireRetrospect/component';
import { useEffect, useState } from 'react';
import { getWeeklyRetrospect, WeeklyRetrospectResponse } from './api';

export const InProgress = () => {
  const dummyDuration = {
    startDate: '2023/7/1',
    endDate: '2025/8/31',
  };

  // const { goalList } = useGoalSelector();
  // const goalId = goalList.length > 0 ? goalList[0].id : null;

  // const [weeklyRetrospects, setWeeklyRetrospects] = useState<WeeklyRetrospectResponse[]>([]);

  // useEffect(() => {
  //   const fetchWeeklyRetrospect = async () => {
  //     if (goalId) {
  //       try {
  //         const data = await getWeeklyRetrospect(goalId);
  //         setWeeklyRetrospects(data);
  //         console.log(data);
  //       } catch (error) {
  //         console.error('Error fetching weekly retrospect:', error);
  //       }
  //     }
  //   };

  //   fetchWeeklyRetrospect();
  // }, [goalList]);

  return (
    <>
      <RoadMap currentStep={1} totalSteps={4} duration={dummyDuration} />
      <EntireRetrospect />
      <WeeklyRetrospect />
    </>
  );
};
