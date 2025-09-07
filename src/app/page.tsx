import { Header } from '@/shared/components/layout';
import { HeroSection } from '@/composite/landing/hero';
import { ProblemSection } from '@/composite/landing/problemSection';
import { SolutionSection } from '@/composite/landing/solutionSection';
import { FeaturesSection } from '@/composite/landing/features';
import { FooterSection } from '@/composite/landing/footer';
import { HeaderActions } from '@/composite/landing/headerAction';
import { TestimonialsSection } from '@/composite/landing/testimonials';
import { AboutGrowitSection } from '@/composite/landing/aboutGrowitSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-normal">
      <Header mode="logo" rightSection={<HeaderActions />} />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <AboutGrowitSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}
