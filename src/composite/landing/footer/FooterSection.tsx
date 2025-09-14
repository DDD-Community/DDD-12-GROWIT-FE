'use client';

import Image from 'next/image';
import Button from '@/shared/components/input/Button';
import { useRouter } from 'next/navigation';
import FooterLinks from './components/FooterLinks';
import Section from '@/shared/components/layout/Section';

const FooterSection = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image for entire footer */}
      <div className="absolute inset-0">
        <Image src="/landing/landing-background.png" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
      </div>

      {/* Main CTA Section */}
      <Section>
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              목표 달성을 위한
              <br />
              <span className="text-[#35D942]">우주 여행 함께 떠나볼래?</span>
            </h2>
          </div>

          <div className="inline-flex">
            <Button size="xl" onClick={handleGetStarted} text="성장 여정 시작하기" />
          </div>
        </div>
      </Section>

      {/* Footer links and info */}
      <footer className="relative z-10">
        <FooterLinks />
      </footer>
    </div>
  );
};

export { FooterSection };
