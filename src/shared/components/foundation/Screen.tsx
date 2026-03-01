import { cn } from '@/shared/lib/utils';

export function Screen({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('max-sm:flex-col max-w-md w-full h-full mx-auto bg-bg-default', className)}>{children}</div>
  );
}
