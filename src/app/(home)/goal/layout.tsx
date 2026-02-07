import { AnimatedStack } from '@/shared/components/layout/AnimatedStack';

type GoalPageLayoutProps = {
  children: React.ReactNode;
  stack: React.ReactNode;
};

export default function GoalLayout({ children, stack }: GoalPageLayoutProps) {
  // 바텀 네비게이션 만큼 높이 빼기
  return (
    <>
      <div className="flex flex-col h-[calc(100svh-64px)] relative overflow-hidden">{children}</div>
      <AnimatedStack basePath="/goal">{stack}</AnimatedStack>
    </>
  );
}
