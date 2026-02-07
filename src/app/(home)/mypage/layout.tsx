import { StackNavigateProvider } from '@/shared/components/layout/StackNavigateProvider';
import { AnimatedStack } from '@/shared/components/layout/AnimatedStack';

type MyPageLayoutProps = {
  children: React.ReactNode;
  stack: React.ReactNode;
};

export default function MyPageLayout({ children, stack }: MyPageLayoutProps) {
  return (
    <StackNavigateProvider className="flex flex-col h-full relative overflow-hidden">
      {children}
      <AnimatedStack basePath="/mypage">{stack}</AnimatedStack>
    </StackNavigateProvider>
  );
}
