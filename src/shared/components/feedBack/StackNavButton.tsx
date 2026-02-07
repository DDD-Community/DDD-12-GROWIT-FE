'use client';

import Link from 'next/link';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { RightArrowIcon } from '../foundation/Icons';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';

type StackNavButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  eventName?: GTM_EVENTS;
  buttonName?: GTM_BUTTON_NAME;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type BackButtonProps = {
  className?: string;
  children: React.ReactNode;
  eventName?: GTM_EVENTS;
  buttonName?: GTM_BUTTON_NAME;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function StackNavButton({ href, className, children, eventName, buttonName, ...rest }: StackNavButtonProps) {
  const { trackButtonClick } = useGTMActions();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (eventName && buttonName) {
      trackButtonClick({ eventName, buttonName });
    }
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={cn('rounded-lg', className)} {...rest}>
      {children}
    </Link>
  );
}

/** 스택 네비게이션 뒤로가기 버튼  */
export function StackBackButton({ className, eventName, buttonName, ...rest }: Omit<BackButtonProps, 'children'>) {
  const router = useRouter();
  const { trackButtonClick } = useGTMActions();

  const handleClick = () => {
    if (eventName && buttonName) {
      trackButtonClick({ eventName, buttonName });
    }
    router.back();
  };

  return (
    <button type="button" onClick={handleClick} className={cn('text-text-strong', className)} {...rest}>
      <RightArrowIcon className="rotate-180" />
    </button>
  );
}
