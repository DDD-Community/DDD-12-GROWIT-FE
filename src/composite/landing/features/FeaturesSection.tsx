'use client';

import { GoalSettingSection } from './components/GoalSettingSection';
import { MainHomeSection } from './components/MainHomeSection';
import { RetrospectSection } from './components/RetrospectSection';
import { GoalManagementSection } from './components/GoalManagementSection';

const FeaturesSection = () => {
  return (
    <>
      <GoalSettingSection />
      <MainHomeSection />
      <RetrospectSection />
      <GoalManagementSection />
    </>
  );
};

export { FeaturesSection };
