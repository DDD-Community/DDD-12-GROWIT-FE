import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';
import { Z_INDEX } from '@/shared/lib/z-index';

export default function AdvicePageLoader() {
  return (
    <MotionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: {
          duration: 0.3,
        },
      }}
      className={`w-full h-screen flex items-center justify-center absolute inset-0 ${Z_INDEX.ADVICE_LOADING}`}
    >
      <div className="relative w-full h-full aspect-4/3">
        <div className="w-full h-full bg-[url('/advice/advice-page-loading.jpg')] bg-cover bg-center" />
      </div>
    </MotionWrapper>
  );
}
