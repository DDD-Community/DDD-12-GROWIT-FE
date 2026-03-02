import { AnimatedStack } from '@/shared/components/layout/AnimatedStack';
import { ROUTES } from '@/shared/constants/routes';

type AdvicePageLayoutProps = {
  children: React.ReactNode;
  stack: React.ReactNode;
};

export default function AdvicePageLayout({ children, stack }: AdvicePageLayoutProps) {
  return (
    <div className="w-full h-[calc(100svh-64px)] flex flex-col bg-normal relative">
      {children}
      <AnimatedStack basePath={ROUTES.ADVICE} excludePaths={[`${ROUTES.ADVICE}/signup`]}>
        {stack}
      </AnimatedStack>
    </div>
  );
}
