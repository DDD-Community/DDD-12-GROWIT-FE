'use client';

import Link from 'next/link';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { useStackNavigate } from '@/shared/hooks/useStackNavigate';

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
  const { push } = useStackNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (eventName && buttonName) {
      trackButtonClick({ eventName, buttonName });
    }
    push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function StackBackButton({ className, children, eventName, buttonName, ...rest }: BackButtonProps) {
  const { trackButtonClick } = useGTMActions();
  const { pop } = useStackNavigate();

  const handleClick = () => {
    if (eventName && buttonName) {
      trackButtonClick({ eventName, buttonName });
    }
    pop();
  };

  return (
    <button type="button" onClick={handleClick} className={className} {...rest}>
      {children}
    </button>
  );
}
