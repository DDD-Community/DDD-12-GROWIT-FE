interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function CreateGoalLayout({ children }: HomeLayoutProps) {
  return <div className="flex flex-1 max-w-md">{children}</div>;
}
