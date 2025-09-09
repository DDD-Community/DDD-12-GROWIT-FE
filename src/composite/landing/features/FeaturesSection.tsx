'use client';

import { GoalSettingSection } from './components/GoalSettingSection';
import { MainHomeSection } from './components/MainHomeSection';
import { RetrospectSection } from './components/RetrospectSection';
import { GoalManagementSection } from './components/GoalManagementSection';

const FeaturesSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0">{/* Background Image */}</div>

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
