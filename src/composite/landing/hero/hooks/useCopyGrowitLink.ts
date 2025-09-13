import { useState } from 'react';
import { urls } from '@/shared/constants/urls';
import { useToast } from '@/shared/components/feedBack/toast';

export function useCopyGrowitLink() {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();

  const copyGrowitLink = async () => {
    await navigator.clipboard.writeText(urls.growit);
    setIsCopied(true);
    showToast('공유 링크를 복사했어요!', 'success');
  };

  return {
    isCopied,
    copyGrowitLink,
  };
}
