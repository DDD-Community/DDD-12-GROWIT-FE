import { Header } from '@/shared/components/layout';
import { HeroSection } from '@/composite/landing/hero';
import { FeaturesSection } from '@/composite/landing/features';
import { FooterSection } from '@/composite/landing/footer';
import { HeaderActions } from '@/composite/landing/headerAction';
import { HowItWorksSection } from '@/composite/landing/howItWorks';
import { TestimonialsSection } from '@/composite/landing/testimonials';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-normal">
      <Header mode="logo" rightSection={<HeaderActions />} />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}
