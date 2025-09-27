'use client';

import { useFormContext } from 'react-hook-form';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { Accordion } from '@/shared/components/layout/Accordion';
import { TextArea } from '@/shared/components/input/TextArea';
import { KPTFormData } from '../hooks';

export const ProblemField = () => {
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
          <p className="heading-2-bold text-label-normal">Problem (아쉬운 점)</p>
        </FlexBox>
      )}
    >
      <div className="pt-4">
        <TextArea
          {...register('problem')}
          value={watch('problem')}
          placeholder="ex. 소비 내역을 기록하지 않아 지출이 늘었다."
          maxLength={200}
          className="min-h-[80px]"
          isError={!!errors.problem}
          errorMessage={errors.problem?.message}
        />
      </div>
    </Accordion>
  );
};
