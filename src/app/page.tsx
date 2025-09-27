import { Header } from '@/shared/components/layout';
import { HeroSection } from '@/composite/landing/hero';
import { ProblemSection } from '@/composite/landing/problemSection';
import { SolutionSection } from '@/composite/landing/solutionSection';
import { FeaturesSection } from '@/composite/landing/features';
import { FooterSection } from '@/composite/landing/footer';
import { HeaderActions } from '@/composite/landing/headerAction';
import { TestimonialsSection } from '@/composite/landing/testimonials';
import { AboutGrowitSection } from '@/composite/landing/aboutGrowitSection';
import { TumblbugEventSection } from '@/composite/landing/tumblbugEvent';
import { TumblbugBanner } from '@/composite/landing/banner';

export default function LandingPage() {
  return (
    <div className="min-h-screen min-w-screen bg-normal">
      <Header isLanding mode="logo" banner={<TumblbugBanner />} rightSection={<HeaderActions />} />
      <hr className="h-[50px] border-none" />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <AboutGrowitSection />
      <FeaturesSection />
      <TestimonialsSection />
      <TumblbugEventSection />
      <FooterSection />
    </div>
  );
}
