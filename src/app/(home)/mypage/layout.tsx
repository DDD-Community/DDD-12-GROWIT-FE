import { AnimatedStack } from '@/shared/components/layout/AnimatedStack';

type MyPageLayoutProps = {
  children: React.ReactNode;
  stack: React.ReactNode;
};

export default function MyPageLayout({ children, stack }: MyPageLayoutProps) {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {children}
      <AnimatedStack basePath="/mypage">{stack}</AnimatedStack>
    </div>
  );
}
