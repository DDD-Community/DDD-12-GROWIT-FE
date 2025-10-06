'use client';

import { PlanetSelector } from '@/composite/goal/planetSelector';
import { GoalProvider } from '@/model/goal/context';

export default function GoalPageRoute() {
  return (
    <div className="relative w-full h-full bg-normal overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {/* Gradient Background */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 5%, rgba(42, 73, 114, 1) 100%)',
            boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.14)',
            backdropFilter: 'blur(80px)',
          }}
        />

        {/* Mask Group */}
        <div className="absolute inset-0 w-full h-full opacity-[0.08]">
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
            }}
          />

          {/* Background Image */}
          <div
            className="absolute w-[1623.81px] h-[1195.3px]"
            style={{
              backgroundImage: 'url(/image/goal-background-282330.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'translate(0px, -600px)',
            }}
          />
        </div>
      </div>

      {/* Header */}
      {/* TODO: 이후에 연도선택 기능 추가할 것 */}
      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="w-8" />
          <div className="flex items-center gap-2.5">
            <h1 className="heading-1-bold text-label-normal">2025</h1>
            {/* <ChevronDownIcon className="w-6 h-6 text-label-normal" /> */}
          </div>
          <div className="w-8" />
        </div>
      </div>

      <GoalProvider goalListOption={{ year: 2025 }}>
        <PlanetSelector />
      </GoalProvider>
    </div>
  );
}
