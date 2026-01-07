export default function AdvicePageLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-[calc(100svh-64px)] flex flex-col bg-normal">{children}</div>;
}
