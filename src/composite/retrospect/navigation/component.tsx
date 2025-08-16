'use client';

import FlexBox from '@/shared/components/foundation/FlexBox';
import { useState } from 'react';
import { InProgress } from '../inProgress/component';
import { CompletedTasks } from '../done/component';
import { GoalProvider } from '@/model/goal/context';

type ActiveTab = 'inProgress' | 'done';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inProgress');

  return (
    <>
      <h1 className="title-3-bold text-label-normal px-4 py-4 md:p-5">회고</h1>
      <div className="w-full border border-b border-line-normal" />

      <div className="p-5 space-y-5 w-full">
        <FlexBox className="gap-2 w-full">
          <button
            onClick={() => setActiveTab('inProgress')}
            className={`text-label-normal rounded-full body-1-bold ${activeTab === 'inProgress' && 'bg-label-button-neutral outline-2 outline-line-normal'} py-3 px-5 cursor-pointer hover:bg-label-button-hover`}
          >
            진행중인 회고
          </button>
          <button
            onClick={() => setActiveTab('done')}
            className={`text-label-normal rounded-full body-1-bold ${activeTab === 'done' && 'bg-label-button-neutral outline-2 outline-line-normal'} py-3 px-5 cursor-pointer hover:bg-label-button-hover`}
          >
            종료한 목표
          </button>
        </FlexBox>
        <GoalProvider>
          <div className="flex flex-col gap-4 mt-5">{activeTab === 'inProgress' && <InProgress />}</div>
          <div className="flex flex-col gap-4 mt-5">{activeTab === 'done' && <CompletedTasks />}</div>
        </GoalProvider>
      </div>
    </>
  );
};

export default Navigation;
