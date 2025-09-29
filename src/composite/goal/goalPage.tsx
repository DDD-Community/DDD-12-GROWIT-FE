'use client';

import { ChevronDownIcon } from 'lucide-react';
import Badge from '@/shared/components/display/Badge';

export function GoalPage() {
  return (
    <div className="relative flex flex-col w-full h-full bg-normal overflow-hidden">
      {/* Background */}
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
              transform: 'translate(-510px, -368px)',
            }}
          />
        </div>
      </div>
      {/* Header */}
      <div className="relative z-10 flex flex-col">
        {/* Header Content */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="w-8" />
          <div className="flex items-center gap-2.5">
            <div className="w-6" />
            <h1 className="heading-1-bold text-label-normal">2025</h1>
            <ChevronDownIcon className="w-6 h-6 text-label-normal" />
          </div>
          <div className="w-8" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 pt-10">
        <div className="flex flex-col items-center gap-12">
          {/* Planet Card */}
          <div className="flex flex-col items-center gap-5">
            {/* Badge and Text */}
            <div className="flex flex-col items-center gap-2.5 px-2.5 py-2.5 w-full">
              <Badge
                type="default"
                size="lg"
                label="진행중"
                color="bg-[rgba(53,217,66,0.4)]"
                textColor="text-[#3AEE49]"
              />
              <h2 className="heading-2-bold text-label-normal text-center">
                '일이삼사오육칠팔구십일이삼사오육칠팔구십'
              </h2>
            </div>

            {/* Planet Image */}
            <div className="relative w-[200px] h-[200px]">
              <div
                className="absolute inset-0 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/planet/planet-green.png)',
                  transform: 'translate(-45.33px, -43.89px)',
                  width: '294.73px',
                  height: '294.73px',
                }}
              />
            </div>

            {/* Date Range */}
            <div className="flex items-center justify-center gap-2.5 px-4 py-2.5">
              <span className="body-1-medium text-label-neutral">25.03.01~25.09.01</span>
            </div>
          </div>

          {/* Dot Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
            <div className="w-2 h-2 rounded-full bg-[#D9D9D9] opacity-20" />
            <div className="w-2 h-2 rounded-full bg-[#D9D9D9] opacity-20" />
            <div className="w-2 h-2 rounded-full bg-[#D9D9D9] opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
