export default function GoalLayout({ children }: { children: React.ReactNode }) {
  // 바텀 네비게이션 만큼 높이 빼기
  return <div className="flex flex-1 flex-col h-[calc(100svh-64px)]">{children}</div>;
}
