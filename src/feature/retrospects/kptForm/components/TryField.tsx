'use client';

import { useFormContext } from 'react-hook-form';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { TextArea } from '@/shared/components/input/TextArea';
import { KPTFormData } from '../hooks';

export const TryField = () => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<KPTFormData>();

  return (
    <Accordion
      defaultOpen={true}
      renderTitle={() => (
        <FlexBox className="flex gap-2">
          <p className="heading-2-bold text-label-normal">Try (다음에 시도하고 싶은 것)</p>
        </FlexBox>
      )}
    >
      <div className="pt-4">
        <TextArea
          {...register('tryNext')}
          value={watch('tryNext')}
          maxLength={200}
          placeholder="ex. 가계부 앱으로 매일 지출을 기록하자."
          className="min-h-[80px]"
          isError={!!errors.tryNext}
          errorMessage={errors.tryNext?.message}
        />
      </div>
    </Accordion>
  );
};
