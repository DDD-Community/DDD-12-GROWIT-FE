interface RetrospectLayoutProps {
  children?: React.ReactNode;
}

export default function RetrospectPageLayout({ children }: RetrospectLayoutProps) {
  return <div className="md:p-12 w-3xl mx-auto">{children}</div>;
}
