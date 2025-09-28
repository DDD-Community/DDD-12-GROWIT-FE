'use client';

import { useFormContext } from 'react-hook-form';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { TextArea } from '@/shared/components/input/TextArea';
import { KPTFormData } from '../hooks';

export const KeepField = () => {
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
          <p className="heading-2-bold text-label-normal">Keep (잘한 점)</p>
        </FlexBox>
      )}
    >
      <div className="pt-4">
        <TextArea
          {...register('keep')}
          value={watch('keep')}
          placeholder="ex. 매달 일정 금액을 저축했다."
          maxLength={200}
          className="min-h-[80px]"
          isError={!!errors.keep}
          errorMessage={errors.keep?.message}
        />
      </div>
    </Accordion>
  );
};
