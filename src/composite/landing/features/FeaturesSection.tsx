'use client';

import { GoalSettingSection } from './components/GoalSettingSection';
import { MainHomeSection } from './components/MainHomeSection';
import { RetrospectSection } from './components/RetrospectSection';
import { GoalManagementSection } from './components/GoalManagementSection';
import Image from 'next/image';

const FeaturesSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-black via-black/50 to-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute bottom-0 max-sm:bottom-200 left-0 w-full">
        <Image
          src="/landing/landing-feature-background.png"
          alt="Features Background"
          width={1600}
          height={3000}
          className="w-full h-auto"
        />
        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-black to-transparent"></div>
      </div>
      {/* Content */}
      <div className="relative z-10">
        <GoalSettingSection />
        <MainHomeSection />
        <RetrospectSection />
        <GoalManagementSection />
      </div>
    </div>
  );
};

export { FeaturesSection };
