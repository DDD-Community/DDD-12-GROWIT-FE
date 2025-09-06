import HeroSection from './hero/HeroSection';
import FeaturesSection from './features/FeaturesSection';
import HowItWorksSection from './howItWorks/HowItWorksSection';
import TestimonialsSection from './testimonials/TestimonialsSection';
import FooterSection from './footer/FooterSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-normal">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;