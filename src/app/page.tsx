import { Header } from '@/shared/components/layout';
import { HeaderActions } from '@/composite/landing/headerAction';
import { FirstSection } from '@/composite/landing/first';
import { SecondSection } from '@/composite/landing/second';
import { ThirdSection } from '@/composite/landing/third';
import { FourthSection } from '@/composite/landing/fourth';
import { FifthSection } from '@/composite/landing/fifth';
import { SixthSection } from '@/composite/landing/sixth';
import { SeventhSection } from '@/composite/landing/seventh';
import { EighthSection } from '@/composite/landing/eighth';
import { NinthSection } from '@/composite/landing/ninth';
import { TenthSection } from '@/composite/landing/tenth';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-fulls overflow-x-hidden bg-normal">
      <Header mode="landing" rightSection={<HeaderActions />} />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <SeventhSection />
      <EighthSection />
      <NinthSection />
      <TenthSection />
    </div>
  );
}
