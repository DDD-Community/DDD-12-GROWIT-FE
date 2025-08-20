interface RetrospectLayoutProps {
  children?: React.ReactNode;
}

export default function RetrospectPageLayout({ children }: RetrospectLayoutProps) {
  return <div className="p-4 w-3xl mx-auto">{children}</div>;
}
