import { Header } from '@/shared/components/layout';
import { HeaderActions } from '@/composite/landing/headerAction';
import { IntroSection } from '@/composite/landing/intro';
import { QuestioningSection } from '@/composite/landing/questioning';
import { SuggestionSection } from '@/composite/landing/suggestion';
import { StoryVideoSection } from '@/composite/landing/storyVideo';
import { AddGoalFeatureSection } from '@/composite/landing/addGoal';
import { ManageTodoFeatureSection } from '@/composite/landing/manageTodo';
import { GoalAdviceFeatureSection } from '@/composite/landing/goalAdvice';
import { CollectPlanetFeatureSection } from '@/composite/landing/collectPlanet';
import { FundingDiscountSection } from '@/composite/landing/fundingDiscount';
import { LaunchSection } from '@/composite/landing/launch';

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
      <LaunchSection />
    </div>
  );
}
