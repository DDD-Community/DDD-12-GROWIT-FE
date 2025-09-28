interface RetrospectLayoutProps {
  children?: React.ReactNode;
}

export default function RetrospectPageLayout({ children }: RetrospectLayoutProps) {
  return <div className="w-full max-w-3xl mx-auto">{children}</div>;
}
