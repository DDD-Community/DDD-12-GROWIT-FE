import Badge from '@/shared/components/display/Badge';
import { Modal } from '@/shared/components/feedBack/Modal';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Button from '@/shared/components/input/Button';
import Checkbox from '@/shared/components/input/Checkbox';
import { InputField } from '@/shared/components/input/InputField';
import { Controller, useForm } from 'react-hook-form';

interface EarlyBirdModalProps {
  open: boolean;
  onClose: () => void;
  onSuccessSubmit: () => void;
}

interface EarlyBirdModalFormData {
  phoneNumber: string;
  privacyPolicy: boolean;
}

export const EarlyBirdModal = ({ open, onClose, onSuccessSubmit }: EarlyBirdModalProps) => {
  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
      privacyPolicy: false,
    },
  });

  const onSubmitForm = (data: EarlyBirdModalFormData) => {
    onSuccessSubmit();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="얼리버드 신청"
      renderContent={() => (
        <form className="gap-[20px] min-w-[300px] sm:min-w-[350px]" onSubmit={e => e.preventDefault()}>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: '휴대폰 번호를 입력해주세요.',
              pattern: {
                value: /^01[0-9]{8,9}$/,
                message: '휴대폰 번호 형식이 올바르지 않습니다.',
              },
              validate: value => {
                if (value.length !== 11) {
                  return '휴대폰 번호는 11자리여야 합니다.';
                }
                return true;
              },
            }}
            render={({ field, fieldState }) => {
              const hasError = fieldState.error || !field.value;
              const errorMessage = fieldState.error?.message;

              return (
                <InputField
                  label="휴대폰 번호"
                  errorMessage={errorMessage}
                  description={!hasError ? '✓ 올바른 휴대폰 번호입니다' : undefined}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="privacyPolicy"
            control={control}
            rules={{ required: '개인정보 수집 동의에 동의해주세요.' }}
            render={({ field }) => (
              <FlexBox className="items-center gap-3 mt-4">
                <Checkbox checked={field.value} onChange={field.onChange} />
                <FlexBox className="items-center gap-2">
                  <Badge
                    type="default"
                    size="sm"
                    label="필수"
                    color="bg-[rgba(255,99,99,0.16)]"
                    textColor="text-[#FF6363]"
                  />
                  <span className="text-[rgba(194,196,200,0.88)] text-sm font-normal">개인정보 수집 동의</span>
                </FlexBox>
              </FlexBox>
            )}
          />
        </form>
      )}
      renderFooter={() => (
        <Button
          size="xl"
          text="제출"
          type="submit"
          onClick={handleSubmit(onSubmitForm)}
          disabled={!formState.isValid}
        />
      )}
    />
  );
};
