'use client';

import { PromotionModal } from '@/feature/customerEvent/promotionModal';
import { useRouter } from 'next/navigation';

export default function PromotionPage() {
  const router = useRouter();
  return <PromotionModal open={true} onSuccessSubmit={() => router.push('/home')} />;
}
