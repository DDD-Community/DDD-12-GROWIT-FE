import { Modal } from '@/shared/components/feedBack/Modal';
import Button from '@/shared/components/input/Button';
import { InputField } from '@/shared/components/input/InputField';
import { Controller, useForm } from 'react-hook-form';
import { useFetchApplyPromotion } from './hooks/useFetchApplyPromotion';
import { useToast } from '@/shared/components/feedBack/toast';
import { Info } from 'lucide-react';

interface PromotionModalProps {
  open: boolean;
  onClose?: () => void;
  onSuccessSubmit: () => void;
}

interface PromotionModalFormData {
  code: string;
}

export const PromotionModal = ({ open, onClose, onSuccessSubmit }: PromotionModalProps) => {
  const { showToast } = useToast();
  const { isLoading, applyPromoCode } = useFetchApplyPromotion({
    onSuccess: () => {
      onSuccessSubmit();
      showToast('프로모션 코드가 적용되었습니다.', 'success');
      onClose?.();
      reset();
    },
    onError: () => {
      showToast('프로모션 코드 적용에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  });

  const onSubmitForm = async (data: PromotionModalFormData) => {
    await applyPromoCode(data.code);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="min-w-[350px]"
      title="프로모션 코드"
      renderContent={() => (
        <form className="min-w-[300px]" onSubmit={e => e.preventDefault()}>
          <Controller
            name="code"
            control={control}
            rules={{
              validate: value => {
                if (value.length < 6) return false;
                return true;
              },
            }}
            render={({ field, fieldState }) => {
              const hasError = fieldState.invalid;
              return (
                <InputField
                  label=""
                  className="flex w-full"
                  placeholder="프로모션 코드를 입력해주세요"
                  isError={hasError}
                  errorMessage={fieldState.error?.message}
                  {...field}
                />
              );
            }}
          />

          <div className="flex items-start gap-2 bg-[rgba(46,47,51,0.88)] rounded-lg mt-2">
            <Info className="w-4 h-4 text-[rgba(174,176,182,0.61)] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[rgba(174,176,182,0.61)] whitespace-pre-line">
              {`현재는 베타 서비스 기간으로 프로모션 코드를 가진\n사용자만 이용할 수 있습니다.`}
            </p>
          </div>
        </form>
      )}
      renderFooter={() => (
        <Button
          size="xl"
          type="submit"
          text={isLoading ? '로딩중...' : '그로잇 시작하기'}
          onClick={handleSubmit(onSubmitForm)}
          disabled={!formState.isValid || isLoading}
          status={isLoading ? 'loading' : 'idle'}
          className="w-full"
        />
      )}
    />
  );
};
