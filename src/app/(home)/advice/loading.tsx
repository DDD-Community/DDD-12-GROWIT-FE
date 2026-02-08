import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';

export default function AdvicePageLoader() {
  return (
    <MotionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: {
          duration: 0.5,
          delay: 1.75,
        },
      }}
      className="w-full h-screen flex items-center justify-center"
    >
      <div className="relative w-full h-full aspect-4/3">
        <div className="w-full h-full bg-[url('/advice/advice-page-loading.jpg')] bg-cover bg-center absolute inset-0 z-999" />
      </div>
    </MotionWrapper>
  );
}
