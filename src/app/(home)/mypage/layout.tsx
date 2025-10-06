export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 overflow-y-auto mb-16">
      {children}
      <div className="mb-20" />
    </div>
  );
}
