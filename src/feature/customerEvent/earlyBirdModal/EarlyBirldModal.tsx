import { Modal } from '@/shared/components/feedBack/Modal';
import Checkbox from '@/shared/components/input/Checkbox';
import { InputField } from '@/shared/components/input/InputField';
import { useForm } from 'react-hook-form';

interface EarlyBirdModalProps {
  open: boolean;
  onClose: () => void;
  onSuccessSubmit: () => void;
}

export const EarlyBirdModal = ({ open, onClose, onSuccessSubmit }: EarlyBirdModalProps) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="얼리버드 신청"
      renderContent={() => (
        <form onSubmit={handleSubmit(onSuccessSubmit)}>
          <InputField
            label="휴대폰 번호"
            {...register('phoneNumber', {
              required: { value: true, message: '휴대폰 번호를 입력해주세요.' },
              pattern: {
                value: /^01[0-9]{8,9}$/,
                message: '휴대폰 번호 형식이 올바르지 않습니다.',
              },
            })}
          />
          <Checkbox
            {...register('privacyPolicy', {
              required: { value: true, message: '개인정보 수집 동의에 동의해주세요.' },
            })}
          />
        </form>
      )}
    />
  );
};
