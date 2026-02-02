type MyPageLayoutProps = {
  children: React.ReactNode;
  panel: React.ReactNode;
};

export default function MyPageLayout({ children, panel }: MyPageLayoutProps) {
  return (
    <div className="flex flex-1 overflow-y-auto mb-16">
      {children}
      {panel}
      <div className="mb-20" />
    </div>
  );
}
