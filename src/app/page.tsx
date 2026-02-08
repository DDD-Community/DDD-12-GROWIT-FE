import dynamic from 'next/dynamic';
import { Header } from '@/shared/components/layout';
import { HeaderActions } from '@/composite/landing/headerAction';
import { IntroSection } from '@/composite/landing/intro';

const QuestioningSection = dynamic(() => import('@/composite/landing/questioning').then(mod => mod.QuestioningSection));
const SuggestionSection = dynamic(() => import('@/composite/landing/suggestion').then(mod => mod.SuggestionSection));
const StoryVideoSection = dynamic(() => import('@/composite/landing/storyVideo').then(mod => mod.StoryVideoSection));
const AddGoalFeatureSection = dynamic(() =>
  import('@/composite/landing/addGoal').then(mod => mod.AddGoalFeatureSection)
);
const ManageTodoFeatureSection = dynamic(() =>
  import('@/composite/landing/manageTodo').then(mod => mod.ManageTodoFeatureSection)
);
const GoalAdviceFeatureSection = dynamic(() =>
  import('@/composite/landing/goalAdvice').then(mod => mod.GoalAdviceFeatureSection)
);
const CollectPlanetFeatureSection = dynamic(() =>
  import('@/composite/landing/collectPlanet').then(mod => mod.CollectPlanetFeatureSection)
);
const FundingDiscountSection = dynamic(() =>
  import('@/composite/landing/fundingDiscount').then(mod => mod.FundingDiscountSection)
);
const LaunchSection = dynamic(() => import('@/composite/landing/launch').then(mod => mod.LaunchSection));
const DonationSection = dynamic(() => import('@/composite/landing/DonationSection').then(mod => mod.default));

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-normal">
      <Header mode="landing" rightSection={<HeaderActions />} />
      <IntroSection />
      <QuestioningSection />
      <SuggestionSection />
      <StoryVideoSection />
      <AddGoalFeatureSection />
      <ManageTodoFeatureSection />
      <GoalAdviceFeatureSection />
      <CollectPlanetFeatureSection />
      <FundingDiscountSection />
      <DonationSection />
      <LaunchSection />
    </div>
  );
}
