'use client';

import { useCallback, useEffect } from 'react';
import { Icon } from '@/shared/components/foundation/Icons';
import { useCopyAccountContext } from './CopyAccountContext';

export const CopyAccountButton = () => {
  const { isCopied, setIsCopied } = useCopyAccountContext();

  const renderButtonContent = useCallback((copied: boolean) => {
    if (copied) {
      return '계좌 복사 완료!';
    }
    return '팀 아둥바둥 카카오뱅크 3333-35-3209232';
  }, []);

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText('3333-35-3209232');
    setIsCopied(true);
  }, [setIsCopied]);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isCopied, setIsCopied]);

  return (
    <button
      onClick={handleCopyToClipboard}
      className="bg-brand-neon py-2.5 px-4.5 flex items-center gap-x-2 rounded-lg shadow-xs hover:bg-brand-neon/70 focus:outline-none text-text-inverse body-1-bold w-full justify-center"
    >
      {renderButtonContent(isCopied)}
      <Icon name={isCopied ? 'check' : 'clipboard'} className="text-text-inverse size-6 md:size-5" />
    </button>
  );
};
