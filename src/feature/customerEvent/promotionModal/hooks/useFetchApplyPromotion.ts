import { useState } from 'react';
import { postPromotionModal } from '../api/api';

interface UseFetchApplyPromotionProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useFetchApplyPromotion({ onSuccess, onError }: UseFetchApplyPromotionProps = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const applyPromoCode = async (code: string) => {
    setIsLoading(true);

    try {
      const result = await postPromotionModal({ code });
      onSuccess?.();
      return result;
    } catch (error) {
      onError?.();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    applyPromoCode,
  };
}
