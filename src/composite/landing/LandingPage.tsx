import HeroSection from './hero/HeroSection';
import FeaturesSection from './features/FeaturesSection';
import HowItWorksSection from './howItWorks/HowItWorksSection';
import TestimonialsSection from './testimonials/TestimonialsSection';
import FooterSection from './footer/FooterSection';
import HeaderActions from '@/composite/landing/headerAction/HeaderActions';
import { Header } from '@/shared/components/layout';

const LandingPage = () => {
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
};

export default LandingPage;
