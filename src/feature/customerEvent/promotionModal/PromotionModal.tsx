import { Modal } from '@/shared/components/feedBack/Modal';
import Button from '@/shared/components/input/Button';
import { InputField } from '@/shared/components/input/InputField';
import { Controller, useForm } from 'react-hook-form';
import { useFetchApplyPromotion } from './hooks/useFetchApplyPromotion';
import { useToast } from '@/shared/components/feedBack/toast';
import { Info, AlertCircle } from 'lucide-react';

interface PromotionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccessSubmit: () => void;
}

interface PromotionModalFormData {
  code: string;
}

export const PromotionModal = ({ open, onClose, onSuccessSubmit }: PromotionModalProps) => {
  const { showToast } = useToast();
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });

  const { isLoading, applyPromoCode } = useFetchApplyPromotion({
    onSuccess: () => {
      onSuccessSubmit();
      showToast('프로모션 코드가 적용되었습니다.', 'success');
      onClose();
      reset();
    },
    onError: () => {
      showToast('프로모션 코드 적용에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const onSubmitForm = async (data: PromotionModalFormData) => {
    await applyPromoCode(data.code);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="프로모션 코드"
      renderContent={() => (
        <div className="gap-[20px] min-w-[300px] sm:min-w-[350px]">
          <div className="flex flex-col gap-3">
            <Controller
              name="code"
              control={control}
              rules={{
                minLength: 6,
              }}
              render={({ field, fieldState }) => {
                const hasError = fieldState.invalid;
                return (
                  <div className="flex flex-col gap-1.5">
                    <InputField
                      label="프로모션 코드"
                      placeholder="프로모션 코드를 입력해주세요"
                      isError={hasError}
                      errorMessage={fieldState.error?.message}
                      {...field}
                    />
                    {hasError && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-[#FF6363]" />
                        <span className="text-xs text-[#FF6363]">프로모션 코드는 6자리 이상이어야 합니다.</span>
                      </div>
                    )}
                  </div>
                );
              }}
            />

            <div className="flex items-start gap-2 p-3 bg-[rgba(46,47,51,0.88)] rounded-lg border border-[rgba(112,115,124,0.32)]">
              <Info className="w-4 h-4 text-[rgba(174,176,182,0.61)] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[rgba(174,176,182,0.61)] leading-relaxed">
                현재는 베타 서비스 기간으로 프로모션 코드를 가진 사용자만 이용할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
      renderFooter={() => (
        <Button
          size="xl"
          type="submit"
          text={isLoading ? '적용 중...' : '그로잇 시작하기'}
          onClick={handleSubmit(onSubmitForm)}
          disabled={!formState.isValid || isLoading}
          status={isLoading ? 'loading' : 'idle'}
          className="w-full"
        />
      )}
    />
  );
};
